// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

/**
 * Pure Lit web components for code search UI.
 * No side effects — safe to import in tests.
 */

import {LitElement, html, css, unsafeCSS} from "lit";
import {classMap} from "lit/directives/class-map.js";
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import {customElement, property} from "lit/decorators.js";
import arbThemeCSS from './arborium-theme-all.css.txt';

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
    /** Pre-highlighted HTML for this line (from arborium). */
    @property() highlightedHTML?: string;

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
                    : this.highlightedHTML
                      ? unsafeHTML(this.highlightedHTML)
                      : this.text}</span
            >`;
    }
    static styles = [unsafeCSS(arbThemeCSS), css`
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
    `];
}
