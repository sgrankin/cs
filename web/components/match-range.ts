// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {ResultLine} from '../api.ts';

/**
 * Renders a contiguous range of source lines with match highlights.
 * Each line is [lno, text] or [lno, text, [[start,end],...]] for matches.
 */
@customElement('cs-match-range')
export class MatchRange extends LitElement {
  @property({type: Array}) lines: ResultLine[] = [];
  @property() baseHref = '';

  render() {
    return html`${this.lines.map(line => this.renderLine(line))}`;
  }

  private renderLine(line: ResultLine) {
    const lno = line[0];
    const text = line[1];
    const bounds = line.length > 2 ? line[2] : undefined;
    const isMatch = bounds !== undefined && bounds.length > 0;
    const href = this.baseHref ? `${this.baseHref}#L${lno}` : `#L${lno}`;

    return html`
      <div class="line ${isMatch ? 'match' : ''}">
        <a class="lno" href=${href}>${lno}</a>
        <span class="code">${isMatch ? this.highlightText(text, bounds!) : text}</span>
      </div>
    `;
  }

  private highlightText(text: string, bounds: [number, number][]) {
    const parts: unknown[] = [];
    let pos = 0;
    for (const [start, end] of bounds) {
      if (start > pos) parts.push(text.slice(pos, start));
      parts.push(html`<span class="hl">${text.slice(start, end)}</span>`);
      pos = end;
    }
    if (pos < text.length) parts.push(text.slice(pos));
    return parts;
  }

  static styles = css`
    :host {
      display: block;
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      line-height: 1.5;
    }
    .line {
      display: grid;
      grid-template-columns: 4em 1fr;
      white-space: pre;
    }
    .line.match {
      background: var(--color-background-subtle);
    }
    .lno {
      color: var(--color-foreground-subtle);
      text-align: right;
      padding-right: 1em;
      text-decoration: none;
      user-select: none;
    }
    .lno:hover {
      text-decoration: underline;
    }
    .hl {
      background: var(--color-background-matchstr);
      color: var(--color-foreground-matchstr);
      font-weight: bold;
    }
  `;
}
