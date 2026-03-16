// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// window.find is non-standard but supported in all browsers.
declare global {
  interface Window {
    find(string: string, caseSensitive?: boolean, backwards?: boolean): boolean;
  }
}

import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

/**
 * Displays file content with line numbers and line selection.
 *
 * Supports URL hash line selection (#L5, #L5-L10).
 * Click a line number to select; shift+click to extend range.
 *
 * Keyboard shortcuts (active when this component is connected):
 *   / — navigate to /search (or search selected text)
 *   ? — toggle help modal (fires 'toggle-help')
 *   v — open external source URL (GitHub) with current line/range
 *   n — find next match (window.find forward)
 *   p — find previous match (window.find backward)
 *   Enter — search selected text in new tab
 *   Escape — fire 'close-help'
 */
@customElement('cs-code-viewer')
export class CodeViewer extends LitElement {
  @property() content = '';
  @property() basePath = '';
  /** Repository name, e.g. "github.com/user/repo". */
  @property() repo = '';
  /** Commit or version string. */
  @property() version = '';
  /**
   * External URL template with {lno} placeholder for line number/range.
   * For GitHub repos, constructed automatically from repo/version if not set.
   */
  @property() externalUrl = '';
  @state() private selectedStart = -1;
  @state() private selectedEnd = -1;
  @state() private hasSelection = false;

  connectedCallback() {
    super.connectedCallback();
    this.parseHash();
    window.addEventListener('hashchange', this.onHashChange);
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('selectionchange', this.onSelectionChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.onHashChange);
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('selectionchange', this.onSelectionChange);
  }

  private onHashChange = () => {
    this.parseHash();
    this.scrollToSelection();
  };

  private onSelectionChange = () => {
    this.hasSelection = (window.getSelection()?.toString() || '').length > 0;
  };

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

  /** Scroll the selected line(s) into view after render. */
  private scrollToSelection() {
    if (this.selectedStart < 0) return;
    // Wait for Lit to render, then scroll.
    this.updateComplete.then(() => {
      const firstLine = this.renderRoot.querySelector(`#L${this.selectedStart}`) as HTMLElement | null;
      if (!firstLine) return;

      const viewportHeight = window.innerHeight;
      let scrollOffset = Math.floor(viewportHeight / 3.0);

      if (this.selectedStart !== this.selectedEnd) {
        const lastLine = this.renderRoot.querySelector(`#L${this.selectedEnd}`) as HTMLElement | null;
        if (lastLine) {
          const firstRect = firstLine.getBoundingClientRect();
          const lastRect = lastLine.getBoundingClientRect();
          const rangeHeight = lastRect.top + lastRect.height - firstRect.top;
          if (rangeHeight <= viewportHeight) {
            // Center the range in the viewport.
            scrollOffset = 0.5 * (viewportHeight - rangeHeight);
          } else {
            // Range is taller than viewport; put first line near top.
            scrollOffset = firstLine.offsetHeight / 2;
          }
        }
      }

      const firstRect = firstLine.getBoundingClientRect();
      window.scrollTo(0, firstRect.top + window.scrollY - scrollOffset);
    });
  }

  protected firstUpdated() {
    // Scroll to the initially selected line on first render.
    this.scrollToSelection();
  }

  /** Build the resolved external URL for the current line selection. */
  private resolvedExternalUrl(): string {
    const template = this.externalUrl;
    if (!template) return '';
    const lno = this.lineNumberString();
    return template.replace('{lno}', lno);
  }

  /** Format the current line selection as a string for URL substitution. */
  private lineNumberString(): string {
    if (this.selectedStart < 0) return '1';
    if (this.selectedStart === this.selectedEnd) return String(this.selectedStart);
    return `${this.selectedStart}-L${this.selectedEnd}`;
  }

  private getSelectedText(): string {
    return window.getSelection()?.toString() || '';
  }

  private onKeyDown = (e: KeyboardEvent) => {
    // Don't handle keys when user is typing in an input.
    if ((e.target as HTMLElement).matches('input,textarea')) return;
    // Don't handle keys with modifiers.
    if (e.altKey || e.ctrlKey || e.metaKey) return;

    if (this.processKey(e.key)) {
      e.preventDefault();
    }
  };

  private processKey(key: string): boolean {
    switch (key) {
      case 'Enter': {
        const text = this.getSelectedText();
        if (text) {
          window.open(`/search?q=${encodeURIComponent(text)}`);
        }
        return true;
      }
      case '/': {
        this.dispatchEvent(new CustomEvent('close-help', {bubbles: true, composed: true}));
        const text = this.getSelectedText();
        window.location.href = `/search${text ? '?q=' + encodeURIComponent(text) : ''}`;
        return true;
      }
      case '?': {
        this.dispatchEvent(new CustomEvent('toggle-help', {bubbles: true, composed: true}));
        return true;
      }
      case 'Escape': {
        this.dispatchEvent(new CustomEvent('close-help', {bubbles: true, composed: true}));
        return true;
      }
      case 'v': {
        const url = this.resolvedExternalUrl();
        if (url) {
          window.location.href = url;
        }
        return true;
      }
      case 'n':
      case 'p': {
        const text = this.getSelectedText();
        if (text) {
          window.find(text, /*caseSensitive=*/ false, /*backwards=*/ key === 'p');
        }
        return true;
      }
    }
    return false;
  }

  render() {
    const lines = this.content.split('\n');
    // Remove trailing empty line from final newline.
    if (lines.length > 0 && lines[lines.length - 1] === '') {
      lines.pop();
    }

    return html`
      ${this.hasSelection ? html`
        <div class="selection-hint">
          <kbd>/</kbd> search · <kbd>n</kbd> next · <kbd>p</kbd> prev · <kbd>Enter</kbd> new tab
        </div>
      ` : ''}
      <div class="viewer">
        ${lines.map((text, i) => {
          const lno = i + 1;
          const selected = lno >= this.selectedStart && lno <= this.selectedEnd;
          return html`
            <div class="line ${selected ? 'selected' : ''}" id="L${lno}">
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
      history.replaceState(null, '', `#L${start}-L${end}`);
    } else {
      this.selectedStart = lno;
      this.selectedEnd = lno;
    }
  }

  static styles = css`
    .selection-hint {
      font-size: 11px;
      color: var(--color-foreground-subtle);
      padding: 4px 8px;
      border-bottom: 1px solid var(--color-border);
    }
    .selection-hint kbd {
      font-family: inherit;
      font-size: 10px;
      padding: 1px 4px;
      border: 1px solid var(--color-border);
      border-radius: 3px;
      background: var(--color-background-secondary, rgba(128, 128, 128, 0.1));
    }
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
