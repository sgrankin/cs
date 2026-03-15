// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

/**
 * Search input with debounced input events.
 *
 * Fires `search-input` custom event after debounce period.
 * The event detail contains the current input value.
 */
@customElement('cs-search-input')
export class SearchInput extends LitElement {
  @property() value = '';
  @property({type: Number}) debounce = 100;
  @property() placeholder = 'Search code...';
  @property() error = '';

  @query('input') private input!: HTMLInputElement;

  private timer: ReturnType<typeof setTimeout> | null = null;

  render() {
    return html`
      <div class="search-box">
        <input
          type="text"
          .value=${this.value}
          placeholder=${this.placeholder}
          @input=${this.onInput}
          @keydown=${this.onKeydown}
          autocomplete="off"
          spellcheck="false"
        />
        ${this.error ? html`<div class="error">${this.error}</div>` : ''}
      </div>
    `;
  }

  private onInput() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.timer = null;
      this.dispatchEvent(new CustomEvent('search-input', {
        detail: {value: this.input.value},
        bubbles: true,
        composed: true,
      }));
    }, this.debounce);
  }

  private onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      // Immediate search on Enter.
      if (this.timer) clearTimeout(this.timer);
      this.timer = null;
      this.dispatchEvent(new CustomEvent('search-input', {
        detail: {value: this.input.value},
        bubbles: true,
        composed: true,
      }));
    }
  }

  /** Focus the input. */
  focus() {
    this.input?.focus();
  }

  static styles = css`
    .search-box {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    input {
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 14px;
      padding: 8px 12px;
      border: 1px solid var(--color-border-default);
      border-radius: 4px;
      background: var(--color-background);
      color: var(--color-foreground);
      width: 100%;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: var(--color-foreground-accent);
      box-shadow: 0 0 0 1px var(--color-foreground-accent);
    }
    .error {
      color: var(--color-foreground-error);
      font-size: 12px;
    }
  `;
}
