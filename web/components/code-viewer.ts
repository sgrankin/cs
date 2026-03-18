// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// window.find is non-standard but supported in all browsers.
declare global {
  interface Window {
    find(string: string, caseSensitive?: boolean, backwards?: boolean): boolean;
  }
}

import {LitElement, html, css, unsafeCSS} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {highlightLines} from '../highlight.ts';
import hljsThemeCSS from '../hljs-theme.css.txt';

// --- Pure functions (functional core, testable without DOM) ---

/** Navigate to a URL. Extracted for test stubbing (window.location.href is not stubbable). */
export const effects = {
  navigate(url: string) { window.location.href = url; },
};

/** Action returned by keyAction — pure description of what to do. */
export type ViewerAction =
  | {type: 'navigate'; url: string}
  | {type: 'open-tab'; url: string}
  | {type: 'find'; text: string; backwards: boolean}
  | {type: 'toggle-help'}
  | {type: 'close-help'};

/** Pure keyboard handler: returns an action for a key, or null if unhandled. */
export function keyAction(key: string, selectedText: string, externalUrl: string): ViewerAction | null {
  switch (key) {
    case 'Enter':
      if (selectedText) return {type: 'open-tab', url: `/search?q=${encodeURIComponent(selectedText)}`};
      return {type: 'close-help'};  // Enter with no selection is a no-op, but we consume it.
    case '/':
      return {type: 'navigate', url: `/search${selectedText ? '?q=' + encodeURIComponent(selectedText) : ''}`};
    case '?':
      return {type: 'toggle-help'};
    case 'Escape':
      return {type: 'close-help'};
    case 'v':
      if (externalUrl) return {type: 'navigate', url: externalUrl};
      return {type: 'close-help'};  // Consume key even without URL.
    case 'n':
      if (selectedText) return {type: 'find', text: selectedText, backwards: false};
      return {type: 'close-help'};
    case 'p':
      if (selectedText) return {type: 'find', text: selectedText, backwards: true};
      return {type: 'close-help'};
  }
  return null;
}

/**
 * Compute the scroll offset for bringing selected lines into view.
 * For a single line: place it 1/3 from the top.
 * For a range that fits: center it. For a range taller than viewport: show top.
 */
export function computeScrollOffset(viewportHeight: number, isRange: boolean, rangeHeight: number, lineHeight: number): number {
  if (!isRange) return Math.floor(viewportHeight / 3.0);
  if (rangeHeight <= 0) return Math.floor(viewportHeight / 3.0);
  if (rangeHeight <= viewportHeight) return 0.5 * (viewportHeight - rangeHeight);
  return lineHeight / 2;
}

/** Format a line selection as a string for URL substitution. */
export function formatLineNumber(start: number, end: number): string {
  if (start < 0) return '1';
  if (start === end) return String(start);
  return `${start}-L${end}`;
}

/** Resolve an external URL template by substituting {lno} with the line selection. */
export function resolveExternalUrl(template: string, start: number, end: number): string {
  if (!template) return '';
  return template.replace('{lno}', formatLineNumber(start, end));
}

/** Parse a URL hash fragment into a line range. Returns [-1, -1] if invalid. */
export function parseLineHash(hash: string): [number, number] {
  const m = hash.match(/^#L(\d+)(?:-L?(\d+))?$/);
  if (!m) return [-1, -1];
  const start = parseInt(m[1], 10);
  const end = m[2] ? parseInt(m[2], 10) : start;
  return [start, end];
}

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
  /** File path for language detection (e.g. "src/main.go"). */
  @property() filePath = '';
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
  @state() private highlightedLines: string[] | null = null;

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('content') || changed.has('filePath')) {
      this.highlightedLines = null;
      if (this.content && this.filePath) {
        highlightLines(this.filePath, this.content).then(lines => {
          if (lines) {
            this.highlightedLines = lines;
          }
        });
      }
    }
  }

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
    const [start, end] = parseLineHash(window.location.hash);
    this.selectedStart = start;
    this.selectedEnd = end;
  }

  /** Scroll the selected line(s) into view after render. */
  private scrollToSelection() {
    if (this.selectedStart < 0) return;
    this.updateComplete.then(() => {
      const firstLine = this.renderRoot.querySelector(`#L${this.selectedStart}`) as HTMLElement | null;
      if (!firstLine) return;

      const isRange = this.selectedStart !== this.selectedEnd;
      let rangeHeight = 0;
      if (isRange) {
        const lastLine = this.renderRoot.querySelector(`#L${this.selectedEnd}`) as HTMLElement | null;
        if (lastLine) {
          const firstRect = firstLine.getBoundingClientRect();
          const lastRect = lastLine.getBoundingClientRect();
          rangeHeight = lastRect.top + lastRect.height - firstRect.top;
        }
      }

      const scrollOffset = computeScrollOffset(window.innerHeight, isRange, rangeHeight, firstLine.offsetHeight);
      const firstRect = firstLine.getBoundingClientRect();
      window.scrollTo(0, firstRect.top + window.scrollY - scrollOffset);
    });
  }

  protected firstUpdated() {
    // Scroll to the initially selected line on first render.
    this.scrollToSelection();
  }

  /** Build the resolved external URL for the current line selection. */
  resolvedExternalUrl(): string {
    return resolveExternalUrl(this.externalUrl, this.selectedStart, this.selectedEnd);
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
    const action = keyAction(key, this.getSelectedText(), this.resolvedExternalUrl());
    if (!action) return false;
    switch (action.type) {
      case 'navigate':
        effects.navigate(action.url);
        break;
      case 'open-tab':
        window.open(action.url);
        break;
      case 'find':
        window.find(action.text, false, action.backwards);
        break;
      case 'toggle-help':
        this.dispatchEvent(new CustomEvent('toggle-help', {bubbles: true, composed: true}));
        break;
      case 'close-help':
        this.dispatchEvent(new CustomEvent('close-help', {bubbles: true, composed: true}));
        break;
    }
    return true;
  }

  render() {
    const lines = this.content.split('\n');
    // Remove trailing empty line from final newline.
    if (lines.length > 0 && lines[lines.length - 1] === '') {
      lines.pop();
    }

    const hl = this.highlightedLines;

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
              <span class="code">${hl && hl[i] ? unsafeHTML(hl[i]) : text}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  private onLineClick(e: MouseEvent, lno: number) {
    // Always prevent default to stop the browser from following the <a href="#L...">
    // link. Without this, the hash-only navigation bubbles out of shadow DOM and
    // can be misinterpreted as a route change (e.g. "/#L5" matches the search page).
    e.preventDefault();
    if (e.shiftKey && this.selectedStart > 0) {
      const start = Math.min(this.selectedStart, lno);
      const end = Math.max(this.selectedStart, lno);
      this.selectedStart = start;
      this.selectedEnd = end;
      history.replaceState(null, '', `#L${start}-L${end}`);
    } else {
      this.selectedStart = lno;
      this.selectedEnd = lno;
      history.replaceState(null, '', `#L${lno}`);
    }
  }

  static styles = [unsafeCSS(hljsThemeCSS), css`
    .selection-hint {
      font-size: 11px;
      color: var(--color-foreground-subtle);
      padding: 4px 8px;
      border-bottom: 1px solid var(--color-border-default);
    }
    .selection-hint kbd {
      font-family: inherit;
      font-size: 10px;
      padding: 1px 4px;
      border: 1px solid var(--color-border-default);
      border-radius: 3px;
      background: var(--color-background-subtle);
    }
    .viewer {
      font-family: var(--font-mono);
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
  `];
}
