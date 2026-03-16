// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {prefixedInputStyles} from '../shared-styles.ts';

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
  @property() error = '';

  private timer: ReturnType<typeof setTimeout> | null = null;

  render() {
    return html`
      <div class="search-inputs">
        <div class="prefixed-input filter-code">
          <label class="prefix-label" for="searchbox">Query:</label>
          <input
            name="q"
            type="search"
            incremental
            id="searchbox"
            tabindex="1"
            autofocus
            .value=${this.value}
            @input=${this.onInput}
            @keydown=${this.onKeydown}
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
          />
        </div>
        <div id="regex-error">
          ${this.error ? html`<span id="errortext">${this.error}</span>` : nothing}
        </div>
      </div>
    `;
  }

  private onInput() {
    if (this.timer) clearTimeout(this.timer);
    const input = this.renderRoot.querySelector('#searchbox') as HTMLInputElement;
    this.timer = setTimeout(() => {
      this.timer = null;
      this.dispatchEvent(new CustomEvent('search-input', {
        detail: {value: input.value},
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
      const input = this.renderRoot.querySelector('#searchbox') as HTMLInputElement;
      this.dispatchEvent(new CustomEvent('search-input', {
        detail: {value: input.value},
        bubbles: true,
        composed: true,
      }));
    }
  }

  /** Append text to the search query and trigger a search. */
  appendQuery(text: string) {
    const input = this.renderRoot.querySelector('#searchbox') as HTMLInputElement;
    if (!input) return;
    input.value += text;
    this.dispatchEvent(new CustomEvent('search-input', {
      detail: {value: input.value},
      bubbles: true,
      composed: true,
    }));
  }

  /** Focus the input. */
  focus() {
    (this.renderRoot.querySelector('#searchbox') as HTMLInputElement)?.focus();
  }

  static styles = [
    prefixedInputStyles,
    css`
      :host {
        display: block;
      }

      #searchbox {
        font-size: 16px;
      }

      #regex-error {
        padding-top: 3px;
      }

      #errortext {
        color: var(--color-foreground-error);
        font-size: 14px;
      }
    `,
  ];
}
