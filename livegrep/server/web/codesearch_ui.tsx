/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

// Bootstrap depends on a global jQuery existing.
// Imports are resolved at file load... so set the global jquery in a separate module.
import "./globals.ts";

import "bootstrap-select";
import "bootstrap-select/dist/css/bootstrap-select.css";
import "./bootstrap/css/bootstrap.css";
import "./bootstrap/js/bootstrap";

import "./codesearch.css";

import jQuery from "jquery";
import {signal} from "@preact/signals";
import {createDraft, Draft, finishDraft, immerable, produce} from "immer";
import {Fragment, h, JSX, render} from "preact";
import {createPortal} from "preact/compat";
import {useEffect, useState} from "preact/hooks";

import {Codesearch} from "./codesearch.ts";
import {init as _init, updateOptions, updateSelected} from "./repo_selector.ts";
import * as api from "./api.ts";

type FilePath = {
    backend: string;
    tree: string;
    version: string;
    path: string;
};

// LineMatch describes the match for a single line in some file, including context.
type LineMatch = {
    line: string;
    lno: number;
    bounds: number[];
    context_before: string[];
    context_after: string[];
};

type MatchResult = FilePath & {
    lines: LineMatch[];
};

// ClippedLineMatch is a LineMatch with limits on how much context will be displayed.
type ClippedLineMatch = LineMatch & {
    clip_before: number | undefined;
    clip_after: number | undefined;
};

// FileGroup holds all the matches for a file.
class FileGroup {
    path: FilePath;
    matched: ClippedLineMatch[] = [];

    constructor(m: MatchResult) {
        this.path = {...m};
        this.matched = [...m.lines] as ClippedLineMatch[];
    }

    viewURL(lno?: number) {
        return viewURL(this.path.backend, this.path.tree, this.path.version, this.path.path, lno);
    }

    /** Prepare the matches for rendering by clipping the context of matches to avoid duplicate
     *  lines being displayed in the search results.
     *
     * This function operates under these assumptions:
     * - The matches are all for the same file
     * - Two matches cannot have the same line number
     */
    processContextOverlaps() {
        if (!this.matched || this.matched.length < 2) {
            return; // We don"t have overlaps unless we have at least two things
        }

        // NOTE: The logic below requires matches to be sorted by line number.
        this.matched.sort((a, b) => a.lno - b.lno);

        for (var i = 1, len = this.matched.length; i < len; i++) {
            let previous = this.matched[i - 1];
            let current = this.matched[i];
            let lastLineOfPrevContext = previous.lno + previous.context_after.length;
            let firstLineOfThisContext = current.lno - current.context_before.length;
            let numIntersectingLines = lastLineOfPrevContext - firstLineOfThisContext + 1;
            if (numIntersectingLines >= 0) {
                // The matches are intersecting or share a boundary.
                // Try to split the context between the previous match and this one.
                // Uneven splits should leave the latter element with the larger piece.

                // split_at will be the first line number grouped with the latter element.
                let splitAt = Math.ceil((previous.lno + current.lno) / 2.0);
                if (splitAt < firstLineOfThisContext) {
                    splitAt = firstLineOfThisContext;
                } else if (lastLineOfPrevContext + 1 < splitAt) {
                    splitAt = lastLineOfPrevContext + 1;
                }

                var clipForPrevious = lastLineOfPrevContext - (splitAt - 1);
                var clipForCurrent = splitAt - firstLineOfThisContext;
                previous.clip_after = clipForPrevious;
                current.clip_before = clipForCurrent;
            } else {
                previous.clip_after = undefined;
                current.clip_before = undefined;
            }
        }
    }
}

/** A set of matches that are automatically grouped by path. */
class SearchResultSet {
    groups: FileGroup[] = [];

    addMatch(match: MatchResult) {
        this.groups.push(new FileGroup(match));
    }

    numMatches() {
        return this.groups.reduce((sum, g) => sum + g.matched.length, 0);
    }
}

type FileMatchResult = FilePath & {
    bounds: number[];
};

/**
 * A FileMatch represents a single filename match in the code base.
 *
 * This model wraps the JSON response from the Codesearch backend for an individual match.
 *
 * XXX almost identical to Match
 */
class FileMatch {
    m: FileMatchResult;

    constructor(m: FileMatchResult) {
        this.m = m;
    }

    viewURL() {
        return viewURL(this.m.backend, this.m.tree, this.m.version, this.m.path);
    }
}

function viewURL(
    backend: string,
    tree: string,
    version: string,
    path: string,
    lno?: number | undefined,
) {
    path = path.replace(/^\/+/, ""); // Trim any leading slashes
    // Tree/version/path separation is via : as tree may have slashes in it...
    // TODO: should we just URL encode it?
    var url = "/view/" + backend + "/" + tree + "@" + version + "/+/" + path;
    if (lno !== undefined) {
        url += "#L" + lno;
    }
    return url;
}

function shorten(ref: string) {
    var match = /^refs\/(tags|branches)\/(.*)/.exec(ref);
    if (match) {
        return match[2];
    }
    match = /^([0-9a-f]{8})[0-9a-f]+$/.exec(ref);
    if (match) return match[1];
    // If reference is origin/foo, assume that foo is
    // the branch name.
    match = /^origin\/(.*)/.exec(ref);
    if (match) {
        return match[1];
    }
    return ref;
}

type Query = {
    q: string;
    fold_case: boolean;
    regex: boolean;
    backend: string;
    repo: string[];
};

type QueryState = Query & {
    id: number;
};

class SearchState {
    [immerable] = true;
    readonly matches = new SearchResultSet();
    readonly fileMatches: FileMatch[] = [];
    readonly facets: (api.Facet & { backend: string })[] = [];

    // searchMap holds all the pending search queries.
    // The query info is used for display when the search completes.
    // Any searches preceeding the currently displayedSearch are removed.
    readonly searchMap: Record<number, Query> = {};
    readonly lastSearch: number = 0;
    readonly displayedSearch: number = 0;

    readonly context: boolean = true;
    readonly error: string | undefined;
    readonly time: number | undefined;
    readonly why: string | undefined;
    readonly filenameOnly: boolean | undefined;

    viewURL() {
        var current = this.searchMap[this.displayedSearch];
        if (!current) {
            return "/search";
        }

        var base = "/search";
        if (current.backend) {
            base += "/" + current.backend;
        } else if (CodesearchUI.input_backend) {
            base += "/" + CodesearchUI.input_backend.val();
        }

        var query = {};
        if (current.q !== "") {
            query = {...current, context: this.context};
        }

        var qs = jQuery.param(query);
        return base + (qs ? "?" + qs : "");
    }

    title() {
        var current = this.searchMap[this.displayedSearch];
        if (!current || !current.q) {
            return "code search";
        }
        return current.q + " ⋅ search";
    }

    static reset(draft: Draft<SearchState>) {
        draft.error = undefined;
        draft.time = undefined;
        draft.why = undefined;
        draft.filenameOnly = undefined;
        draft.matches = new SearchResultSet();
        draft.fileMatches = [];
        draft.facets = [];
        for (let k in draft.searchMap) {
            if (parseInt(k) < (draft.displayedSearch ?? 0)) {
                delete draft.searchMap[k];
            }
        }
    }

    OnSetContext(context: boolean): SearchState {
        return produce(this, (next) => {
            next.context = context;
        });
    }

    OnNewSearch(search: Query): [SearchState, QueryState | undefined] {
        var cur = this.searchMap[this.displayedSearch];
        if (
            cur &&
            cur.q === search.q &&
            cur.fold_case === search.fold_case &&
            cur.regex === search.regex &&
            cur.backend === search.backend &&
            cur.repo.length == search.repo.length &&
            cur.repo.every((v, i) => v == search.repo[i])
        ) {
            // No change; return current search.
            return [this, undefined];
        }
        const next = createDraft(this);
        var id = ++next.lastSearch;
        next.searchMap[id] = search;
        if (!search.q.length) {
            next.displayedSearch = id;
            SearchState.reset(next);
            return [finishDraft(next), undefined];
        }
        return [finishDraft(next), {id, ...search}];
    }

    OnSearchError(search: number, error: string): SearchState {
        if (search === this.lastSearch) {
            return produce(this, (next) => {
                next.displayedSearch = search;
                next.error = error;
            });
        }
        return this;
    }

    OnSearchDone(searchID: number, reply: api.ReplySearch): SearchState {
        if (searchID < this.displayedSearch) {
            return this;
        }
        return produce(this, (next) => {
            if (next.displayedSearch < searchID) {
                next.displayedSearch = searchID;
                SearchState.reset(next);
            }
            const backend = next.searchMap[searchID].backend;
            for (const fm of reply.file_results) {
                next.fileMatches.push(new FileMatch({...fm, backend}));
            }
            for (const m of reply.results) {
                next.matches.addMatch({...m, backend});
            }
            for (const f of reply.facets) {
                next.facets.push({...f, backend})
            }
            next.time = reply.info?.total_time;
            next.why = reply.info?.why;
            next.filenameOnly = reply.query.FilenameOnly;
        });
    }
}

function MatchView({path, match}: { path: FilePath; match: ClippedLineMatch }) {
    const _renderLno = (n: number, isMatch: boolean): JSX.Element => {
        var lnoStr = n.toString() + (isMatch ? ":" : "-");
        var classes = ["lno-link"];
        if (isMatch) classes.push("matchlno");
        return (
            <a
                class={classes.join(" ")}
                href={viewURL(path.backend, path.tree, path.version, path.path, n)}
            >
                <span class="lno" aria-label={lnoStr}>
                    {lnoStr}
                </span>
            </a>
        );
    };

    let ctxBefore: JSX.Element[] = [];
    var linesBefore = Math.max(0, match.context_before.length - (match.clip_before || 0));
    for (let i = 0; i < linesBefore; i++) {
        ctxBefore.unshift(
            _renderLno(match.lno - i - 1, false),
            <span>{match.context_before[i]}</span>,
            <span/>,
        );
    }
    let ctxAfter: JSX.Element[] = [];
    var linesAfter = Math.max(0, match.context_after.length - (match.clip_after || 0));
    for (let i = 0; i < linesAfter; i++) {
        ctxAfter.push(
            _renderLno(match.lno + i + 1, false),
            <span>{match.context_after[i]}</span>,
            <span/>,
        );
    }
    var line = match.line;
    var bounds = match.bounds;
    var pieces = [
        line.substring(0, bounds[0]),
        line.substring(bounds[0], bounds[1]),
        line.substring(bounds[1]),
    ];

    var classes = ["match"];
    if (match.clip_before !== undefined) classes.push("clip-before");
    if (match.clip_after !== undefined) classes.push("clip-after");

    var links = renderLinkConfigs(
        CodesearchUI.linkConfigs.filter((c: { url_template: string }) =>
            c.url_template.includes("{lno}"),
        ),
        path.tree,
        path.version,
        path.path,
        match.lno,
    );

    return (
        <div class={classes.join(" ")}>
            <div class="contents">
                {ctxBefore}
                {_renderLno(match.lno, true)}
                <span class="matchline">
                    {pieces[0]}
                    <span class="matchstr">{pieces[1]}</span>
                    {pieces[2]}
                </span>
                <span class="matchlinks">{links}</span>
                {ctxAfter}
            </div>
        </div>
    );
}

function renderLinkConfigs(
    linkConfigs: api.LinkConfig[],
    tree: string,
    version: string,
    path: string,
    lno?: number | undefined,
): JSX.Element[] {
    linkConfigs = linkConfigs.filter(function (linkConfig) {
        return (
            !linkConfig.match_regexp || linkConfig.match_regexp.test(tree + "@" + version + "/+/" + path)
        );
    });

    var links = linkConfigs.map(function (linkConfig) {
        return (
            <a
                class="file-action-link"
                href={externalURL(linkConfig.url_template, tree, version, path, lno)}
                target={linkConfig.target}
            >
                {linkConfig.label}
            </a>
        );
    });
    let out: JSX.Element[] = [];
    for (let i = 0; i < links.length; i++) {
        if (i > 0) {
            out.push(<span class="file-action-link-separator">\u00B7</span>);
        }
        out.push(links[i]);
    }
    return out;
}

function externalURL(url: string, tree: string, version: string, path: string, lno: number | undefined) {
    if (lno === undefined) {
        lno = 1;
    }

    // If {path} already has a slash in front of it, trim extra leading
    // slashes from `path` to avoid a double-slash in the URL.
    if (url.indexOf("/{path}") !== -1) {
        path = path.replace(/^\/+/, "");
    }

    // the order of these replacements is used to minimize conflicts
    url = url.replace(/{lno}/g, lno.toString());
    url = url.replace(/{version}/g, shorten(version));
    url = url.replace(/{name}/g, tree);
    url = url.replace(/{basename}/g, tree.split("/")[1]); // E.g. "foo" in "username/foo"
    url = url.replace(/{path}/g, path);
    return url;
}

function FileMatchView({match}: { match: FileMatch }) {
    var path_info = match.m;
    var pieces = [
        path_info.path.substring(0, path_info.bounds[0]),
        path_info.path.substring(path_info.bounds[0], path_info.bounds[1]),
        path_info.path.substring(path_info.bounds[1]),
    ];

    return (
        <div class="filename-match">
            <a class="label header result-path" href={match.viewURL()}>
                <span class="repo">{path_info.tree}:</span>
                <span class="version">{shorten(path_info.version)}:</span>
                {pieces[0]}
                <span class="matchstr">{pieces[1]}</span>
                {pieces[2]}
            </a>
        </div>
    );
}

function FileGroupView({group}: { group: FileGroup }) {
    const {tree, version, path} = group.path;

    let basename = path;
    let dirname = "";
    let indexOfLastPathSep = path.lastIndexOf("/");
    if (indexOfLastPathSep !== -1) {
        basename = path.substring(indexOfLastPathSep + 1, path.length);
        dirname = path.substring(0, indexOfLastPathSep + 1);
    }

    return (
        <div class="file-group">
            <div class="header">
                <span class="header-path">
                    <a class="result-path" href={group.viewURL()}>
                        <span class="repo">{tree}:</span>
                        <span class="version">{shorten(version)}:</span>
                        {dirname}
                        <span class="filename">{basename}</span>
                    </a>
                    <div class="header-links">
                        {renderLinkConfigs(CodesearchUI.linkConfigs, tree, version, path)}
                    </div>
                </span>
            </div>
            {group.matched.map((match) => MatchView({path: group.path, match}))}
        </div>
    );
}

function MatchesView({model}: { model: SearchState }) {
    let count = 0;
    let pathResults: JSX.Element[] = [];
    for (const match of model.fileMatches) {
        if (model.filenameOnly || count < 10) {
            pathResults.push(FileMatchView({match}));
        }
        count += 1;
    }

    let nodes = [<div class="path-results">{pathResults}</div>];

    for (const id in model.matches.groups) {
        const group = model.matches.groups[id];
        group.processContextOverlaps();
        nodes.push(FileGroupView({group}));
    }

    var id = model.lastSearch;
    var query = model.searchMap[id].q;
    var already_file_limited = /\bfile:/.test(query);
    if (!already_file_limited) {
        nodes.unshift(
            ExtensionButtons(
                model.facets.find((f) => f.key == "ext")?.values.map((f) => [f.value, f.count])))
    }
    let classes = "";
    if (!model.context) {
        classes = "no-context";
    }
    return (
        <div
            class={classes}
            id="results"
            tabIndex={-1}
            style={{outline: "none"}}
            onKeyDown={handleKey}
        >
            {nodes}
        </div>
    );
}

function ExtensionButtons(extensions: [string, number][]) {
    // Display a series of buttons for the most common file extensions
    // among the current search results, that each narrow the search to
    // files matching that extension.
    if (extensions.length < 2) return <></>;
    let popular = extensions.toSorted((a, b) => b[1] - a[1]).slice(0, 5)

    return <div class="file-extensions">
        Narrow to:
        {popular.map(([ext, count]) => (
            <button class="file-extension" onClick={limitToExtension} data-ext={ext}>
                {ext} ({count})
            </button>
        ))}
    </div>;
}

function limitToExtension(e: MouseEvent) {
    var ext = jQuery(e.target as HTMLElement).data("ext");
    var q = CodesearchUI.input.val();
    if (CodesearchUI.input_regex.is(":checked")) q = "file:\\" + ext + "$ " + q;
    else q = "file:" + ext + " " + q;
    CodesearchUI.input.val(q);
    CodesearchUI.NewSearch();
}

function handleKey(event: KeyboardEvent) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
    }
    var which = event.key;
    if (which == "/" || which == "?") {
        var t = getSelectedText();
        if (!t) return;
        event.preventDefault();
        if (CodesearchUI.input_regex.is(":checked")) {
            t = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // from mozilla docs
        }

        // Make sure that the search results the user is looking at, in
        // which they"ve selected text, get persisted in their browser
        // history so that they can come back to them.
        // last_url_update = 0;

        CodesearchUI.input.val(t);
        CodesearchUI.NewSearch();
    }
}

function getSelectedText() {
    return window.getSelection ? window.getSelection()?.toString() : null;
}

function ResultView({model}: { model: SearchState }) {
    const [last_url, set_last_url] = useState(["", 0] as [string, number]);
    var browser_url = window.location.pathname + window.location.search;

    // Update title and history if needed.
    useEffect(() => {
        if (model.error) {
            return;
        }

        document.title = model.title();

        var url = model.viewURL();
        if (browser_url !== url) {
            // If the user is typing quickly, just keep replacing the current URL.
            // But after they"ve paused, enroll the URL they paused at into their browser history.
            var now = Date.now();
            var two_seconds = 2000;
            if (last_url[0] === "") {
                // If this.last_url is null, that means this is the initial navigation.
                // We should never pushState here, otherwise the user will need to
                // backspace twice to go back to the previous page.
                history.replaceState(null, "", url);
            } else if (now - last_url[1] > two_seconds) {
                history.pushState(null, "", url);
            } else {
                history.replaceState(null, "", url);
            }
            set_last_url([url, now]);
        }
    }, [model, browser_url, last_url]);

    if (model.error) {
        return createPortal(ErrorView(model.error), jQuery("#regex-error")[0]);
    }

    if (!model.displayedSearch || !model.searchMap[model.displayedSearch]?.q) {
        return <div id="helparea">{HelpView()}</div>;
    }

    return (
        <div id="resultarea">
            <div id="countarea">{CountView({model: model})}</div>
            {MatchesView({model: model})}
        </div>
    );
}

function CountView({model}: { model: SearchState }) {
    var num_results = "";
    if (model.filenameOnly) {
        num_results += model.fileMatches.length;
    } else {
        num_results += model.matches.numMatches();
    }
    if (model.why !== "NONE") {
        num_results = num_results + "+";
    }

    let time = model.time ? (
        <span id="searchtimebox">
            <span class="label"> in </span>
            <span id="searchtime">{model.time + " ms"}</span>
        </span>
    ) : (
        <></>
    );

    return (
        <>
            <span id="numresults">{num_results}</span> matches
            {time}
        </>
    );
}

function HelpView() {
    // TODO: help used to use a real repo in the `repo:` examples.
    // Restore that by using some repo from the current backend for this view.
    return (
        <>
            <div class="helpsection">
                <h5>Special query terms</h5>
            </div>
            <table>
                <tr>
                    <td>
                        <code>path:</code>
                    </td>
                    <td>Only include results from matching files.</td>
                    <td>
                        <a href="/search?q=hello+path:test">example</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <code>-path:</code>
                    </td>
                    <td>Exclude results from matching files.</td>
                    <td>
                        <a href="/search?q=hello+-path:test">example</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <code>repo:</code>
                    </td>
                    <td>Only include results from matching repositories.</td>
                    <td>
                        <a href="/search?q=hello+repo:example">example</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <code>-repo:</code>
                    </td>
                    <td>Exclude results from matching repositories.</td>
                    <td>
                        <a href="/search?q=hello+-repo:example">example</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <code>max_matches:</code>
                    </td>
                    <td>Adjust the limit on number of matching lines returned.</td>
                    <td>
                        <a href="/search?q=hello+max_matches:5">example</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <code>
                            (<em>special-term</em>:)
                        </code>
                    </td>
                    <td>
                        Escape one of the above terms by wrapping it in parentheses (with regex enabled).
                    </td>
                    <td>
                        <a href="/search?q=(file:)&regex=true">example</a>
                    </td>
                </tr>
            </table>
            <div class="helpsection">
                <h5>Regular Expressions</h5>
            </div>
            <p>
                See <a href="https://github.com/google/re2/wiki/Syntax">the RE2 documentation</a> for a
                complete listing of supported regex syntax.
            </p>
        </>
    );
}

function ErrorView(err: string) {
    return <span id="errortext">{err}</span>;
}

// TODO: this should be an instance of a singleton... maybe?
namespace CodesearchUI {
    export let backend_repos: { [x: string]: any };
    export let linkConfigs: api.LinkConfig[];
    let state = signal(new SearchState());
    export let input: JQuery<HTMLInputElement>;
    export let input_backend: JQuery<HTMLSelectElement> | null;
    export let input_regex: JQuery<HTMLInputElement>;
    let input_repos: JQuery<HTMLSelectElement>;
    let inputs_case: JQuery<HTMLInputElement>;
    let input_context: JQuery<HTMLInputElement>;
    let timer: NodeJS.Timeout | null;

    export function onload() {
        if (input) return;

        const App = () => {
            return ResultView({model: state.value});
        };
        render(<App/>, jQuery("#resultbox")[0]);

        input = jQuery("#searchbox");
        input_repos = jQuery("#repos");
        input_backend = jQuery("#backend");
        if (input_backend.length == 0) input_backend = null;
        inputs_case = jQuery("input[name=fold_case]");
        input_regex = jQuery("input[name=regex]");
        input_context = jQuery("input[name=context]");

        if (inputs_case.filter(":checked").length == 0) {
            inputs_case.filter("[value=auto]").attr("checked", "true");
        }

        _init();
        initQuery();
        updateRepoOptions();

        input.on("keydown", onKeypress);
        input.on("paste", onKeypress);
        input.trigger("focus");
        if (input_backend) input_backend.on("change", selectBackend);

        inputs_case.on("change", onKeypress);
        input_regex.on("change", onKeypress);
        input_repos.on("change", onKeypress);
        input_context.on("change", toggleContext);

        input_regex.on("change", () => setPref("regex", input_regex.prop("checked")));
        input_repos.on("change", () => setPref("repos", input_repos.val()));
        input_context.on("change", () => setPref("context", input_context.prop("checked")));

        toggleContext();

        Codesearch.Connect(CodesearchUI);
        jQuery(".query-hint code").on("click", function (e) {
            var ext = e.target.textContent;
            if (!ext) return;
            var q = input.val() as string;
            if (
                !q.includes(ext) &&
                ((ext.indexOf("-") == 0 && !q.includes(ext.substring(1))) ||
                    (ext.indexOf("-") != 0 && !q.includes("-" + ext.substring)))
            ) {
                q = q + " " + ext;
            }
            input.val(q);
            input.trigger("focus");
        });

        // Update the search when the user hits Forward or Back.
        window.onpopstate = (_event: any) => {
            var parms = parseQueryParams();
            initQueryFromParams(parms);
            NewSearch();
        };
    }

    function toggleContext() {
        state.value = state.value.OnSetContext(input_context.prop("checked"));
    }

    // Initialize query from URL or user's saved preferences.
    function initQuery() {
        var parms = parseQueryParams();

        var hasParms = false;
        for (var _ in parms) {
            hasParms = true;
            break;
        }

        if (hasParms) {
            initQueryFromParams(parms);
        } else {
            initControlsFromPrefs();
        }

        setTimeout(onKeypress, 0);
    }

    function initQueryFromParams(parms: Map<string, string[]>) {
        var q: string[] = [];
        if (parms["q"]) q.push(parms["q"][0]);
        if (parms["file"]) q.push("file:" + parms["file"][0]);
        input.val(q.join(" "));

        if (parms["fold_case"]) {
            inputs_case.filter("[value=" + parms["fold_case"][0] + "]").attr("checked", "true");
        }

        if (parms["regex"]) {
            input_regex.prop("checked", parms["regex"][0] === "true");
        }

        if (parms["context"]) {
            input_context.prop("checked", parms["context"][0] === "true");
        }

        var backend: string | null = null;
        if (parms["backend"]) backend = parms["backend"];

        var m = new RegExp("/search/([^/]+)/?").exec(window.location.pathname);
        if (m) backend = m[1];

        if (backend && input_backend) {
            var old_backend = input_backend.val() as string;
            input_backend.val(backend);

            // Something (bootstrap-select?) messes with the behaviour of val() on
            // normal select elements, so that trying to set an invalid value sets
            // null, rather than leaving the value unchanged. We manually check and
            // roll back if that happens (e.g. because someone navigated to a URL
            // like "/search/bogus?q=foo").
            if (input_backend.val() === null) {
                input_backend.val(old_backend);
            }
        }

        var repos: string[] = [];
        if (parms["repo"]) repos = repos.concat(parms["repo"]);
        if (parms["repo[]"]) repos = repos.concat(parms["repo[]"]);
        updateSelected(repos);
    }

    function initControlsFromPrefs() {
        var prefs = JSON.parse(localStorage.getItem("prefs") || "{}");
        if (!prefs) {
            prefs = {};
        }
        if (prefs["regex"] !== undefined) {
            input_regex.prop("checked", prefs["regex"]);
        }
        if (prefs["repos"] !== undefined) {
            updateSelected(prefs["repos"]);
        }
        if (prefs["context"] !== undefined) {
            input_context.prop("checked", prefs["context"]);
        }
        if (prefs["backend"] !== undefined && input_backend) {
            input_backend.val(prefs["backend"]);
        }
    }

    function setPref(key: string, value: any) {
        // Load from the cookie again every time in case some other pref has been
        // changed out from under us.
        var prefs = JSON.parse(localStorage.getItem("prefs") || "{}");
        if (!prefs) {
            prefs = {};
        }
        prefs[key] = value;
        localStorage.setItem("prefs", JSON.stringify(prefs))
    }

    function parseQueryParams(): Map<string, string[]> {
        var urlParams = new Map();
        var e: string[] | null,
            a = /\+/g,
            r = /([^&=]+)=?([^&]*)/g,
            d = (s: string) => decodeURIComponent(s.replace(a, " ")),
            q = window.location.search.substring(1);

        while ((e = r.exec(q))) {
            if (urlParams.get(d(e[1]))) {
                urlParams[d(e[1])].push(d(e[2]));
            } else {
                urlParams[d(e[1])] = [d(e[2])];
            }
        }
        return urlParams;
    }

    export function OnConnect() {
        NewSearch();
    }

    function selectBackend() {
        if (!input_backend) return;
        updateRepoOptions();
        onKeypress();
    }

    function updateRepoOptions() {
        if (!input_backend) return;
        var backend = input_backend.val() as string;
        setPref("backend", backend);
        updateOptions(backend_repos[backend]);
    }

    function onKeypress() {
        clearTimer();
        timer = setTimeout(NewSearch, 100);
    }

    export function NewSearch() {
        clearTimer();
        let search: Query = {
            q: input.val() || "",
            fold_case: inputs_case.is(":checked"),
            regex: input_regex.is(":checked"),
            repo: input_repos.val() as string[],
            backend: input_backend?.val() as string,
        };

        const [next, qs] = state.value.OnNewSearch(search);
        if (qs) {
            Codesearch.NewSearch(qs);
        }
        state.value = next;
    }

    function clearTimer() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    export function SearchFailed(search: number, error: string) {
        state.value = state.value.OnSearchError(search, error);
    }

    export function SearchDone(search: number, reply: api.ReplySearch) {
        state.value = state.value.OnSearchDone(search, reply);
    }
}

function init(initData: api.SearchScriptData) {
    CodesearchUI.backend_repos = initData.backend_repos;
    CodesearchUI.linkConfigs = (initData.link_configs || []).map(function (link_config) {
        return link_config;
    });
    CodesearchUI.onload();
}

jQuery(() => {
    init(JSON.parse((document.getElementById("data") as HTMLScriptElement).text) as api.SearchScriptData);
});
