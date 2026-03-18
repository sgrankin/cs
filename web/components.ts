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
import {linkStyles, resultPathStyles, labelStyles} from './shared-styles.ts';
import hljsThemeCSS from './hljs-theme.css.txt';

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
            background: var(--color-background-mark);
            color: inherit;
            box-shadow: 0 0 0 1px var(--color-border-mark);
            border-radius: 2px;
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
    static styles = [linkStyles, resultPathStyles, labelStyles];
}

@customElement("match-line")
export class MatchLine extends LitElement {
    @property({type: Number}) lineNo: number;
    @property() text: string;
    @property() href: string;
    @property({type: Number}) start?: number;
    @property({type: Number}) end?: number;
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
    static styles = [unsafeCSS(hljsThemeCSS), css`
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
        mark.matchstr {
            background: var(--color-background-mark);
            color: inherit;
            box-shadow: 0 0 0 1px var(--color-border-mark);
            border-radius: 2px;
            font-weight: bold;
        }
    `];
}
