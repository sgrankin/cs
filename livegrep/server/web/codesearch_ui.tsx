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

import htmx from "./3rdparty/htmx.esm.js";
import jQuery from "jquery";
import {LitElement, html, css} from "lit";
import {classMap} from "lit/directives/class-map.js";
import {customElement, property} from "lit/decorators.js";

import {init as _init, updateOptions, updateSelected} from "./repo_selector.ts";
import * as api from "./api.ts";

type Query = {
    q: string;
    fold_case: boolean;
    regex: boolean;
    backend: string;
    repo: string[];
};

function handleKey(event: KeyboardEvent) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
    }
    let which = event.key;
    if (which == "/" || which == "?") {
        let t = getSelectedText();
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
        // CodesearchUI.NewSearch();
    }
}

function getSelectedText() {
    return window.getSelection ? window.getSelection()?.toString() : null;
}

// TODO: this should be an instance of a singleton... maybe?
namespace CodesearchUI {
    export let repos: string[];
    export let input: JQuery<HTMLInputElement>;
    export let input_backend: JQuery<HTMLSelectElement> | null;
    export let input_regex: JQuery<HTMLInputElement>;
    let input_repos: JQuery<HTMLSelectElement>;
    let inputs_case: JQuery<HTMLInputElement>;
    let input_context: JQuery<HTMLInputElement>;

    export function onload() {
        if (input) return;

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
        updateOptions(repos);

        input.trigger("focus");

        input_regex.on("change", () => setPref("regex", input_regex.prop("checked")));
        input_repos.on("change", () => setPref("repos", input_repos.val()));
        input_context.on("change", () => setPref("context", input_context.prop("checked")));

        jQuery(".query-hint code").on("click", function (e) {
            let ext = e.target.textContent;
            if (!ext) return;
            let q = input.val() as string;
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
            let parms = parseQueryParams();
            initQueryFromParams(parms);
        };
    }

    // Initialize query from URL or user's saved preferences.
    function initQuery() {
        let parms = parseQueryParams();

        let hasParms = false;
        for (let _ in parms) {
            hasParms = true;
            break;
        }

        if (hasParms) {
            initQueryFromParams(parms);
        } else {
            initControlsFromPrefs();
        }
    }

    function initQueryFromParams(parms: Map<string, string[]>) {
        let q: string[] = [];
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

        let backend: string | null = null;
        if (parms["backend"]) backend = parms["backend"];

        let m = new RegExp("/search/([^/]+)/?").exec(window.location.pathname);
        if (m) backend = m[1];

        if (backend && input_backend) {
            let old_backend = input_backend.val() as string;
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

        let repos: string[] = [];
        if (parms["repo"]) repos = repos.concat(parms["repo"]);
        if (parms["repo[]"]) repos = repos.concat(parms["repo[]"]);
        updateSelected(repos);
    }

    function initControlsFromPrefs() {
        let prefs = JSON.parse(localStorage.getItem("prefs") || "{}");
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
        let prefs = JSON.parse(localStorage.getItem("prefs") || "{}");
        if (!prefs) {
            prefs = {};
        }
        prefs[key] = value;
        localStorage.setItem("prefs", JSON.stringify(prefs));
    }

    function parseQueryParams(): Map<string, string[]> {
        let urlParams = new Map();
        let e: string[] | null,
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
}

function init(initData: api.SearchScriptData) {
    CodesearchUI.repos = initData.repos;
    CodesearchUI.onload();
}

@customElement("filter-button")
export class SearchFilterButton extends LitElement {
    @property() text: string;
    @property() rawFilter: string;
    @property() regexFilter: string;

    render() {
        return html`
            <button type="button" class="file-extension" @click="${this._apply}">
                ${this.text}
            </button>
        `;
    }
    private _apply(e: Event) {
        let input = htmx.find("#searchbox") as HTMLInputElement;
        input.value =
            (jQuery("#regex").is(":checked") ? this.regexFilter : this.rawFilter) +
            " " +
            input.value;
        htmx.trigger("#searchbox", "search");
    }
}

@customElement("match-line")
export class MatchLine extends LitElement {
    @property({type: Number}) lineNo: number;
    @property() line: string;
    @property() href: string;
    @property({type: Number}) start?: number;
    @property({type: Number}) end?: number;

    render() {
        let isMatch = this.start != undefined && this.end != undefined;
        var matchLine = html`${this.line}`;
        if (isMatch) {
            matchLine = html`${this.line.substring(0, this.start)}<span class="matchstr"
                    >${this.line.substring(this.start!, this.end)}</span
                >${this.line.substring(this.end!)}`;
        }
        return html`<a
                class="${classMap({"lno-link": true, matchlno: isMatch})}"
                href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class="${classMap({matchline: isMatch})}">${matchLine}</span>`;
    }
    static styles = css`
        :host {
            display: grid;
            grid-template-columns: 4em auto;
        }
        .lno-link {
            color: var(--color-foreground-subtle);
            padding-right: 1em;
            text-align: right;
            text-decoration: none;
        }
        .lno-link:hover {
            text-decoration: underline;
        }
        .matchlno {
            font-weight: bold;
            display: inline;
        }
        .matchline {
            display: inline;
        }
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    let text = (htmx.find("#data") as HTMLScriptElement).text;
    let data = JSON.parse(text) as api.SearchScriptData;
    init(data);
});
