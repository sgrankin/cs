// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

/**
 * Displays file content with line numbers and line selection.
 *
 * Supports URL hash line selection (#L5, #L5-L10).
 * Click a line number to select; shift+click to extend range.
 */
@customElement('cs-code-viewer')
export class CodeViewer extends LitElement {
  @property() content = '';
  @property() basePath = '';
  @state() private selectedStart = -1;
  @state() private selectedEnd = -1;

  connectedCallback() {
    super.connectedCallback();
    this.parseHash();
    window.addEventListener('hashchange', this.onHashChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.onHashChange);
  }

  private onHashChange = () => this.parseHash();

  private parseHash() {
    const hash = window.location.hash;
    const m = hash.match(/^#L(\d+)(?:-L?(\d+))?$/);
    if (m) {
      this.selectedStart = parseInt(m[1], 10);
      this.selectedEnd = m[2] ? parseInt(m[2], 10) : this.selectedStart;
    } else {
      this.selectedStart = -1;
      this.selectedEnd = -1;
    }
  }

  render() {
    const lines = this.content.split('\n');
    // Remove trailing empty line from final newline.
    if (lines.length > 0 && lines[lines.length - 1] === '') {
      lines.pop();
    }

    return html`
      <div class="viewer">
        ${lines.map((text, i) => {
          const lno = i + 1;
          const selected = lno >= this.selectedStart && lno <= this.selectedEnd;
          return html`
            <div class="line ${selected ? 'selected' : ''}">
              <a class="lno" href="#L${lno}" @click=${(e: MouseEvent) => this.onLineClick(e, lno)}>${lno}</a>
              <span class="code">${text}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  private onLineClick(e: MouseEvent, lno: number) {
    if (e.shiftKey && this.selectedStart > 0) {
      e.preventDefault();
      const start = Math.min(this.selectedStart, lno);
      const end = Math.max(this.selectedStart, lno);
      this.selectedStart = start;
      this.selectedEnd = end;
      window.location.hash = `#L${start}-L${end}`;
    } else {
      this.selectedStart = lno;
      this.selectedEnd = lno;
    }
  }

  static styles = css`
    .viewer {
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      line-height: 1.5;
      overflow-x: auto;
    }
    .line {
      display: grid;
      grid-template-columns: 4em 1fr;
      white-space: pre;
    }
    .line.selected {
      background: var(--color-background-matchstr);
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
  `;
}
