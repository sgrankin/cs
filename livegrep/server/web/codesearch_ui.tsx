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

import * as api from "./api.ts";

htmx.config.transitions = false;
// Reload on history navigation so that the repo selector is reinits (it's mangled on HTMX processing).
htmx.config.historyReload = true;

type Query = {
    q: string;
    fold_case: boolean;
    regex: boolean;
    backend: string;
    repo: string[];
};

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
        htmx.trigger("#searchbox", "input");
    }
}

@customElement("match-str")
export class MatchStr extends LitElement {
    @property() text: string;
    @property({type: Number}) start: number;
    @property({type: Number}) end: number;
    render() {
        if (this.start != undefined && this.end != undefined) {
            return html`${this.text.substring(0, this.start)}<span class="matchstr"
                    >${this.text.substring(this.start, this.end)}</span
                >${this.text.substring(this.end)}`;
        } else {
            return html`${this.text}`;
        }
    }
    static styles = css`
        .matchstr {
            background: var(--color-background-matchstr);
            color: var(--color-foreground-matchstr);
            font-weight: bold;
        }
    `;
}

@customElement("filename-match")
export class FilenameMatch extends LitElement {
    @property() text: string;
    @property() href: string;
    @property({type: Number}) start: number;
    @property({type: Number}) end: number;
    @property() repo: string;
    @property() version: string;
    render() {
        return html`<div class="filename-match">
            <a class="label header result-path" href="${this.href}">
                <span class="repo">${this.repo}:</span><span class="version">${this.version}:</span
                ><match-str text="${this.text}" start=${this.start} end=${this.end}></match-str>
            </a>
        </div>`;
    }
    static styles = css`
        .label {
            font-weight: bold;
        }
        .result-path .repo,
        .result-path .version {
            color: var(--color-foreground-muted);
        }
        .result-path {
            color: var(--color-foreground-muted);
            font-family: "Menlo", "Consolas", "Monaco", monospace;
            font-size: 12px;
            font-weight: normal;
        }

        .result-path .filename {
            font-weight: bold;
        }
        a {
            text-decoration: none;
            color: var(--color-foreground-accent);
        }

        a:hover {
            text-decoration: underline;
            color: var(--color-foreground-accent);
        }
    `;
}

@customElement("match-line")
export class MatchLine extends LitElement {
    @property({type: Number}) lineNo: number;
    @property() text: string;
    @property() href: string;
    @property({type: Number}) start?: number;
    @property({type: Number}) end?: number;

    render() {
        let isMatch = this.start != undefined && this.end != undefined;
        return html`<a class=${classMap({"lno-link": true, matchlno: isMatch})} href="${this.href}"
                ><span class="lno">${this.lineNo}</span></a
            >
            <span class=${classMap({matchline: isMatch})}
                >${isMatch
                    ? html`<match-str
                          text="${this.text}"
                          start=${this.start}
                          end=${this.end}
                      ></match-str>`
                    : this.text}</span
            >`;
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
    initRepoSelector();
});

function initRepoSelector() {
    let repos = jQuery("#repos");
    repos.on("refreshed.bs.select", () => {
        let headers = jQuery(this).parent().find(".dropdown-header");
        headers.css("cursor", "pointer");
        headers.on("click", (event) => {
            event.stopPropagation();
            let optgroup = jQuery('#repos optgroup[label="' + jQuery(this).text() + '"]');
            let allSelected = !optgroup.children("option:not(:selected)").length;
            optgroup.children().prop("selected", !allSelected);
            repos.selectpicker("refresh").trigger("input");
        });
    });
    jQuery(window).on("keyup", ".bootstrap-select .bs-searchbox input", (event) => {
        if (event.key == "Enter") {
            jQuery(this).val("");
            repos.selectpicker("refresh");
        }
    });
    jQuery(window).on("keyup", (keyevent) => {
        if (keyevent.key == "Tab" && jQuery(".bootstrap-select button:focus").length) {
            repos.selectpicker("toggle");
            jQuery(".bootstrap-select .bs-searchbox input").trigger("focus");
        }
    });
}
