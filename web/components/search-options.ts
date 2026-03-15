// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * Case sensitivity and literal mode toggle buttons.
 *
 * Fires `options-change` custom event when toggles change.
 */
@customElement('cs-search-options')
export class SearchOptions extends LitElement {
  @property({type: Boolean}) caseSensitive = false;
  @property({type: Boolean}) literal = false;

  render() {
    return html`
      <div class="options">
        <button
          class=${this.caseSensitive ? 'active' : ''}
          @click=${this.toggleCase}
          title="Case sensitive search"
        >Aa</button>
        <button
          class=${this.literal ? 'active' : ''}
          @click=${this.toggleLiteral}
          title="Literal (non-regex) search"
        >.*</button>
      </div>
    `;
  }

  private toggleCase() {
    this.caseSensitive = !this.caseSensitive;
    this.fireChange();
  }

  private toggleLiteral() {
    this.literal = !this.literal;
    this.fireChange();
  }

  private fireChange() {
    this.dispatchEvent(new CustomEvent('options-change', {
      detail: {caseSensitive: this.caseSensitive, literal: this.literal},
      bubbles: true,
      composed: true,
    }));
  }

  static styles = css`
    .options {
      display: flex;
      gap: 4px;
    }
    button {
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      padding: 4px 8px;
      border: 1px solid var(--color-border-default);
      border-radius: 4px;
      background: var(--color-background);
      color: var(--color-foreground-muted);
      cursor: pointer;
    }
    button:hover {
      background: var(--color-background-hover);
    }
    button.active {
      background: var(--color-foreground-accent);
      color: var(--color-background);
      border-color: var(--color-foreground-accent);
    }
  `;
}
