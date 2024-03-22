/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

// Bootstrap depends on a global jQuery existing.
// Imports are resolved at file load... so set the global jquery in a separate module.
import "../globals";

import "bootstrap-select";
import "bootstrap-select/dist/css/bootstrap-select.css";
import "../bootstrap/css/bootstrap.css";
import "../bootstrap/js/bootstrap";

import "../codesearch/codesearch.css";

import jQuery from "jquery";
import { signal } from "@preact/signals";
import { Draft, createDraft, finishDraft, immerable, produce } from "immer";
import { getJSON, set } from "js-cookie";
import { Fragment, JSX, h, render } from "preact";
import { createPortal } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { isEqual } from "underscore";

import { Codesearch } from "./codesearch";
import { init as _init, updateOptions, updateSelected } from "./repo_selector";

var KeyCodes = {
	SLASH_OR_QUESTION_MARK: 191,
};

function getSelectedText() {
	return window.getSelection ? window.getSelection()?.toString() : null;
}

function shorten(ref) {
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

function viewUrl(backend, tree, version, path, lno?) {
	path = path.replace(/^\/+/, ""); // Trim any leading slashes
	// Tree/version/path separation is via : as tree may have slashes in it...
	// TODO: should we just URL encode it?
	var url = "/view/" + backend + "/" + tree + "@" + version + "/+/" + path;
	if (lno !== undefined) {
		url += "#L" + lno;
	}
	return url;
}

function externalUrl(url, tree, version, path, lno) {
	if (lno === undefined) {
		lno = 1;
	}

	// If {path} already has a slash in front of it, trim extra leading
	// slashes from `path` to avoid a double-slash in the URL.
	if (url.indexOf("/{path}") !== -1) {
		path = path.replace(/^\/+/, "");
	}

	// the order of these replacements is used to minimize conflicts
	url = url.replace(/{lno}/g, lno);
	url = url.replace(/{version}/g, shorten(version));
	url = url.replace(/{name}/g, tree);
	url = url.replace(/{basename}/g, tree.split("/")[1]); // E.g. "foo" in "username/foo"
	url = url.replace(/{path}/g, path);
	return url;
}

function renderLinkConfigs(linkConfigs, tree, version, path, lno?): JSX.Element[] {
	linkConfigs = linkConfigs.filter(function (linkConfig) {
		return !linkConfig.match_regexp || linkConfig.match_regexp.test(tree + "@" + version + "/+/" + path);
	});

	var links = linkConfigs.map(function (linkConfig) {
		return (
			<a
				className="file-action-link"
				href={externalUrl(linkConfig.url_template, tree, version, path, lno)}
				target={linkConfig.target}
			>
				{linkConfig.label}
			</a>
		);
	});
	let out: JSX.Element[] = [];
	for (var i = 0; i < links.length; i++) {
		if (i > 0) {
			out.push(<span className="file-action-link-separator">\u00B7</span>);
		}
		out.push(links[i]);
	}
	return out;
}

function MatchView({ path, match }: { path: PathInfo; match: ClippedLineMatch }) {
	// this.model.on("change", this.render, this);

	const _renderLno = (n: number, isMatch: boolean): JSX.Element => {
		var lnoStr = n.toString() + (isMatch ? ":" : "-");
		var classes = ["lno-link"];
		if (isMatch) classes.push("matchlno");
		return (
			<a
				className={classes.join(" ")}
				href={viewUrl(path.backend, path.tree, path.version, path.path, n)}
			>
				<span className="lno" aria-label={lnoStr}>
					{lnoStr}
				</span>
			</a>
		);
	};

	let i: number;
	let ctx_before: JSX.Element[] = [];
	let ctx_after: JSX.Element[] = [];
	let lno = match.lno;
	let ctxBefore = match.context_before;
	let clip_before = match.clip_before;
	let ctxAfter = match.context_after;
	let clip_after = match.clip_after;

	var lines_to_display_before = Math.max(0, ctxBefore.length - (clip_before || 0));
	for (i = 0; i < lines_to_display_before; i++) {
		ctx_before.unshift(_renderLno(lno - i - 1, false), <span>{match.context_before[i]}</span>, <span />);
	}
	var lines_to_display_after = Math.max(0, ctxAfter.length - (clip_after || 0));
	for (i = 0; i < lines_to_display_after; i++) {
		ctx_after.push(_renderLno(lno + i + 1, false), <span>{match.context_after[i]}</span>, <span />);
	}
	var line = match.line;
	var bounds = match.bounds;
	var pieces = [
		line.substring(0, bounds[0]),
		line.substring(bounds[0], bounds[1]),
		line.substring(bounds[1]),
	];

	var classes = ["match"];
	if (clip_before !== undefined) classes.push("clip-before");
	if (clip_after !== undefined) classes.push("clip-after");

	var links = renderLinkConfigs(
		CodesearchUI.linkConfigs.filter((c) => c.url_template.includes("{lno}")),
		path.tree,
		path.version,
		path.path,
		lno,
	);

	return (
		<div className={classes.join(" ")}>
			<div className="contents">
				{ctx_before}
				{_renderLno(lno, true)}
				<span className="matchline">
					{pieces[0]}
					<span className="matchstr">{pieces[1]}</span>
					{pieces[2]}
				</span>
				<span className="matchlinks">{links}</span>
				{ctx_after}
			</div>
		</div>
	);
}

type PathInfo = {
	tree: string;
	version: string;
	path: string;
	backend: string;
};

type LineMatch = {
	line: string;
	lno: number;
	bounds: number[];
	context_before: string[];
	context_after: string[];
};

type MatchResult = PathInfo & {
	lines: LineMatch[];
};

type ClippedLineMatch = LineMatch & {
	clip_after: number | undefined;
	clip_before: number | undefined;
};

/** A set of Matches at a single path. */
class FileGroup {
	id: string; // The id attribute is used by collections to fetch models
	info: PathInfo;
	matched: ClippedLineMatch[] = [];

	constructor(m: MatchResult) {
		this.info = { ...m };
		this.matched = m.lines;
	}

	viewUrl(lno?: number) {
		return viewUrl(this.info.backend, this.info.tree, this.info.version, this.info.path, lno);
	}

	// add_match(match: Match) {
	// 	this.matched.push(match);
	// }

	/** Prepare the matches for rendering by clipping the context of matches to avoid duplicate
	 *  lines being displayed in the search results.
	 *
	 * This function operates under these assumptions:
	 * - The matches are all for the same file
	 * - Two matches cannot have the same line number
	 */
	process_context_overlaps() {
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

	add_match(match: MatchResult) {
		this.groups.push(new FileGroup(match));
	}

	num_matches() {
		return this.groups.reduce((sum, g) => sum + g.matched.length, 0);
	}
}

type FileMatchResult = PathInfo & {
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

	viewUrl() {
		return viewUrl(this.m.backend, this.m.tree, this.m.version, this.m.path);
	}
}

function FileMatchView({ match }: { match: FileMatch }) {
	var path_info = match.m;
	var pieces = [
		path_info.path.substring(0, path_info.bounds[0]),
		path_info.path.substring(path_info.bounds[0], path_info.bounds[1]),
		path_info.path.substring(path_info.bounds[1]),
	];

	return (
		<div class="filename-match">
			<a className="label header result-path" href={match.viewUrl()}>
				<span className="repo">{path_info.tree}:</span>
				<span className="version">{shorten(path_info.version)}:</span>
				{pieces[0]}
				<span className="matchstr">{pieces[1]}</span>
				{pieces[2]}
			</a>
		</div>
	);
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
	readonly search_map: Record<number, Query> = {};
	readonly search_results = new SearchResultSet();
	readonly file_search_results: FileMatch[] = [];

	readonly search_id = 0;
	readonly displaying: number = 0;

	readonly context: boolean = true;
	readonly error: string | undefined;
	readonly search_type: string = "";
	readonly time: number | undefined;
	readonly why: string | undefined;

	viewUrl() {
		var current = this.search_map[this.displaying];
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
			query = { ...current, context: this.context };
		}

		var qs = jQuery.param(query);
		return base + (qs ? "?" + qs : "");
	}

	title() {
		var current = this.search_map[this.displaying];
		if (!current || !current.q) {
			return "code search";
		}
		return current.q + " ⋅ search";
	}

	static reset(draft: Draft<SearchState>) {
		draft.error = undefined;
		draft.time = undefined;
		draft.why = undefined;
		draft.search_results = new SearchResultSet();
		draft.file_search_results = [];
		for (let k in draft.search_map) {
			if (parseInt(k) < (draft.displaying ?? 0)) {
				delete draft.search_map[k];
			}
		}
	}

	on_set_context(context: boolean): SearchState {
		return produce(this, (next) => {
			next.context = context;
		});
	}

	handle_query(search: Query): [SearchState, QueryState | undefined] {
		var cur = this.search_map[this.displaying];
		if (
			cur &&
			cur.q === search.q &&
			cur.fold_case === search.fold_case &&
			cur.regex === search.regex &&
			cur.backend === search.backend &&
			isEqual(cur.repo, search.repo)
		) {
			return [this, undefined];
		}
		const next = createDraft(this);
		var id = ++next.search_id;
		next.search_map[id] = search;
		if (!search.q.length) {
			next.displaying = id;
			SearchState.reset(next);
			return [finishDraft(next), undefined];
		}
		return [finishDraft(next), { id, ...search }];
	}

	handle_error(search: number, error: string): SearchState {
		if (search === this.search_id) {
			return produce(this, (next) => {
				next.displaying = search;
				next.error = error;
			});
		}
		return this;
	}

	handle_done(
		search: number,
		file_matches: FileMatchResult[],
		matches: MatchResult[],
		{ time, search_type, why }: { time: number; search_type: string; why: string },
	): SearchState {
		if (search < this.displaying) {
			return this;
		}
		return produce(this, (next) => {
			if (next.displaying < search) {
				next.displaying = search;
				SearchState.reset(next);
			}
			const backend = next.search_map[search].backend;
			for (const fm of file_matches) {
				next.file_search_results.push(new FileMatch({ ...fm, backend }));
			}
			for (const m of matches) {
				next.search_results.add_match({ ...m, backend });
			}
			next.time = time;
			next.search_type = search_type;
			next.why = why;
		});
	}
}

function FileGroupView({ group }: { group: FileGroup }) {
	const { tree, version, path } = group.info;

	let basename = path;
	let dirname = "";
	let indexOfLastPathSep = path.lastIndexOf("/");
	if (indexOfLastPathSep !== -1) {
		basename = path.substring(indexOfLastPathSep + 1, path.length);
		dirname = path.substring(0, indexOfLastPathSep + 1);
	}

	return (
		<div className="file-group">
			<div className="header">
				<span className="header-path">
					<a className="result-path" href={group.viewUrl()}>
						<span className="repo">{tree}:</span>
						<span className="version">{shorten(version)}:</span>
						{dirname}
						<span className="filename">{basename}</span>
					</a>
					<div className="header-links">
						{renderLinkConfigs(CodesearchUI.linkConfigs, tree, version, path)}
					</div>
				</span>
			</div>
			{group.matched.map((match) => MatchView({ path: group.info, match }))}
		</div>
	);
}

function MatchesView({ model }: { model: SearchState }) {
	// Collate which file extensions (.py, .go, etc) are most common.
	// countExtension() is called for file_search_results and search_results
	var extension_map: Record<string, number> = {};
	var countExtension = (path) => {
		var r = /[^\/](\.[a-z.]{1,6})$/i;
		var match = path.match(r);
		if (match) {
			var ext = match[1];
			extension_map[ext] = extension_map[ext] ? extension_map[ext] + 1 : 1;
		}
	};

	var count = 0;
	let pathResults: JSX.Element[] = [];
	for (const match of model.file_search_results) {
		if (model.search_type == "filename_only" || count < 10) {
			pathResults.push(FileMatchView({ match }));
		}
		countExtension(match.m.path);
		count += 1;
	}

	let nodes = [<div className="path-results">{pathResults}</div>];

	for (const id in model.search_results.groups) {
		const group = model.search_results.groups[id];
		group.process_context_overlaps();
		nodes.push(FileGroupView({ group }));
		countExtension(group.info.path);
	}

	var id = model.search_id;
	var query = model.search_map[id].q;
	var already_file_limited = /\bfile:/.test(query);
	if (!already_file_limited) {
		nodes.unshift(..._render_extension_buttons(extension_map));
	}
	return (
		<div tabIndex={-1} style={{ outline: "none" }} onKeyDown={_handleKey}>
			{nodes}
		</div>
	);
}

function _render_extension_buttons(extension_map: Record<string, number>) {
	// Display a series of buttons for the most common file extensions
	// among the current search results, that each narrow the search to
	// files matching that extension.
	var extension_array: [number, string][] = [];
	for (let ext in extension_map) {
		extension_array.push([extension_map[ext], ext]);
	}
	if (extension_array.length < 2) {
		return [];
	}
	extension_array.sort((a, b) => b[0] - a[0]);

	var popular: string[] = [];
	var end = Math.min(extension_array.length, 5);
	for (var i = 0; i < end; i++) {
		popular.push(extension_array[i][1]);
	}
	popular.sort();

	return [
		<div className="file-extensions">
			Narrow to:
			{popular.map((ex) => (
				<button className="file-extension" onClick={_limitExtension}>
					{ex}
				</button>
			))}
		</div>,
	];
}

function _limitExtension(e: MouseEvent) {
	var ext = e.target.textContent;
	var q = CodesearchUI.input.val();
	if (CodesearchUI.input_regex.is(":checked")) q = "file:\\" + ext + "$ " + q;
	else q = "file:" + ext + " " + q;
	CodesearchUI.input.val(q);
	CodesearchUI.newsearch();
}

function _handleKey(event: KeyboardEvent) {
	if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
		return;
	}
	var which = event.which;
	if (which === KeyCodes.SLASH_OR_QUESTION_MARK) {
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
		CodesearchUI.newsearch();
	}
}

function ResultView({ model }: { model: SearchState }) {
	const [last_url, set_last_url] = useState(["", 0] as [string, number]);
	var browser_url = window.location.pathname + window.location.search;

	// Update history if needed.
	useEffect(() => {
		if (model.error) {
			return;
		}

		var url = model.viewUrl();
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

	// Update visibilities of various containers based on the results.
	useEffect(() => {
		jQuery("#regex-error").toggle(!!model.error);
		if (model.error) {
			return;
		}
		document.title = model.title();
		if (!model.displaying || !model.search_map[model.displaying]?.q) {
			// No results -- show help.
			jQuery("#resultarea").hide();
			jQuery("#helparea").show();
			return;
		}

		jQuery("#results").toggleClass("no-context", !model.context);
		// jQuery("#results").show();
		jQuery("#resultarea").show();
		jQuery("#helparea").hide();

		if (model.time) {
			jQuery("#searchtimebox").show();
			jQuery("#searchtime").text(model.time + " ms");
		} else {
			jQuery("#searchtimebox").hide();
		}

		var num_results = "";
		if (model.search_type == "filename_only") {
			num_results += model.file_search_results.length;
		} else {
			num_results += model.search_results.num_matches();
		}
		if (model.why !== "NONE") {
			num_results = num_results + "+";
		}
		jQuery("#numresults").text(num_results);
	}, [model]);

	if (model.error) {
		return <>{createPortal(<span id="errortext">{model.error}</span>, jQuery("#regex-error")[0])}</>;
	}

	if (!model.displaying || !model.search_map[model.displaying]?.q) {
		return <></>;
	}

	return <>{MatchesView({ model: model })}</>;
}

// TODO: this should be an instance of a singleton... maybe?
namespace CodesearchUI {
	export let backend_repos = {};
	export let defaultSearchRepos;
	export let linkConfigs;
	let state = signal(new SearchState());
	export let input, input_backend, input_regex;
	let input_repos, inputs_case, input_context;
	let timer;

	export function onload() {
		if (input) return;

		const App = () => {
			return ResultView({ model: state.value });
		};
		render(<App />, jQuery("#results")[0]);

		input = jQuery("#searchbox");
		input_repos = jQuery("#repos");
		input_backend = jQuery("#backend");
		if (input_backend.length == 0) input_backend = null;
		inputs_case = jQuery("input[name=fold_case]");
		input_regex = jQuery("input[name=regex]");
		input_context = jQuery("input[name=context]");

		if (inputs_case.filter(":checked").length == 0) {
			inputs_case.filter("[value=auto]").attr("checked", true);
		}

		_init();
		update_repo_options();

		init_query();

		input.keydown(keypress);
		input.bind("paste", keypress);
		input.focus();
		if (input_backend) input_backend.change(select_backend);

		inputs_case.change(keypress);
		input_regex.change(keypress);
		input_repos.change(keypress);
		input_context.change(toggle_context);

		input_regex.change(function () {
			set_pref("regex", input_regex.prop("checked"));
		});
		input_repos.change(function () {
			set_pref("repos", input_repos.val());
		});
		input_context.change(function () {
			set_pref("context", input_context.prop("checked"));
		});

		toggle_context();

		Codesearch.connect(CodesearchUI);
		jQuery(".query-hint code").click(function (e) {
			var ext = e.target.textContent;
			var q = input.val();
			if (
				!q.includes(ext) &&
				((ext.indexOf("-") == 0 && !q.includes(ext.substring(1))) ||
					(ext.indexOf("-") != 0 && !q.includes("-" + ext.substring)))
			) {
				q = q + " " + ext;
			}
			input.val(q);
			input.focus();
		});

		// Update the search when the user hits Forward or Back.
		window.onpopstate = (event) => {
			var parms = parse_query_params();
			init_query_from_parms(parms);
			newsearch();
		};
	}

	function toggle_context() {
		state.value = state.value.on_set_context(input_context.prop("checked"));
	}

	// Initialize query from URL or user's saved preferences.
	function init_query() {
		var parms = parse_query_params();

		var hasParms = false;
		for (var p in parms) {
			hasParms = true;
			break;
		}

		if (hasParms) {
			init_query_from_parms(parms);
		} else {
			init_controls_from_prefs();
		}

		setTimeout(keypress, 0);
	}

	function init_query_from_parms(parms) {
		var q: string[] = [];
		if (parms.q) q.push(parms.q[0]);
		if (parms.file) q.push("file:" + parms.file[0]);
		input.val(q.join(" "));

		if (parms.fold_case) {
			inputs_case.filter("[value=" + parms.fold_case[0] + "]").attr("checked", true);
		}

		if (parms.regex) {
			input_regex.prop("checked", parms.regex[0] === "true");
		}

		if (parms.context) {
			input_context.prop("checked", parms.context[0] === "true");
		}

		var backend = null;
		if (parms.backend) backend = parms.backend;
		var m;
		if ((m = new RegExp("/search/([^/]+)/?").exec(window.location.pathname))) {
			backend = m[1];
		}
		if (backend && input_backend) {
			var old_backend = input_backend.val();
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

		var repos = [];
		if (parms.repo) repos = repos.concat(parms.repo);
		if (parms["repo[]"]) repos = repos.concat(parms["repo[]"]);
		updateSelected(repos);
	}

	function init_controls_from_prefs() {
		var prefs = getJSON("prefs");
		if (!prefs) {
			prefs = {};
		}
		if (prefs["regex"] !== undefined) {
			input_regex.prop("checked", prefs["regex"]);
		}
		if (prefs["repos"] !== undefined) {
			updateSelected(prefs["repos"]);
		} else if (defaultSearchRepos !== undefined) {
			updateSelected(defaultSearchRepos);
		}
		if (prefs["context"] !== undefined) {
			input_context.prop("checked", prefs["context"]);
		}
	}

	function set_pref(key: string, value: any) {
		// Load from the cookie again every time in case some other pref has been
		// changed out from under us.
		var prefs = getJSON("prefs");
		if (!prefs) {
			prefs = {};
		}
		prefs[key] = value;
		set("prefs", prefs, { expires: 36500 });
	}

	function parse_query_params() {
		var urlParams = {};
		var e,
			a = /\+/g,
			r = /([^&=]+)=?([^&]*)/g,
			d = (s) => decodeURIComponent(s.replace(a, " ")),
			q = window.location.search.substring(1);

		while ((e = r.exec(q))) {
			if (urlParams[d(e[1])]) {
				urlParams[d(e[1])].push(d(e[2]));
			} else {
				urlParams[d(e[1])] = [d(e[2])];
			}
		}
		return urlParams;
	}

	export function on_connect() {
		newsearch();
	}

	function select_backend() {
		if (!input_backend) return;
		update_repo_options();
		keypress();
	}

	function update_repo_options() {
		if (!input_backend) return;
		var backend = input_backend.val();
		updateOptions(backend_repos[backend]);
	}

	function keypress() {
		clear_timer();
		timer = setTimeout(newsearch, 100);
	}

	export function newsearch() {
		clear_timer();
		let search: Query = {
			q: input.val(),
			fold_case: inputs_case.filter(":checked").val(),
			regex: input_regex.is(":checked"),
			repo: input_repos.val(),
		};

		if (input_backend) {
			search.backend = input_backend.val();
		}
		const [next, qs] = state.value.handle_query(search);
		if (qs) {
			Codesearch.new_search(qs);
		}
		state.value = next;
	}

	function clear_timer() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}

	export function error(search, error) {
		state.value = state.value.handle_error(search, error);
	}

	export function search_done(search, file_matches, matches, meta: { time; search_type; why }) {
		state.value = state.value.handle_done(search, file_matches, matches, meta);
	}
}

function init(initData) {
	CodesearchUI.backend_repos = initData.backend_repos;
	CodesearchUI.defaultSearchRepos = initData.default_search_repos;
	CodesearchUI.linkConfigs = (initData.link_configs || []).map(function (link_config) {
		if (link_config.match_regexp) {
			link_config.match_regexp = new RegExp(link_config.match_regexp);
		}
		return link_config;
	});
	CodesearchUI.onload();
}

jQuery(() => {
	init(window.scriptData);
});
