// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * Search input with debounced input events.
 *
 * Fires `search-input` custom event after debounce period.
 * The event detail contains the current input value.
 *
 * Renders light DOM matching the old templ structure:
 *   .search-inputs > .prefixed-input.filter-code > label + input#searchbox
 */
@customElement('cs-search-input')
export class SearchInput extends LitElement {
  @property() value = '';
  @property({type: Number}) debounce = 100;
  @property() error = '';

  createRenderRoot() { return this; }

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
        <div class="query-hint">
          Special terms:
          <code>path:</code>
          <code>-path:</code>
          <code>repo:</code>
          <code>-repo:</code>
          <code>max_matches:</code>
        </div>
      </div>
    `;
  }

  private onInput() {
    if (this.timer) clearTimeout(this.timer);
    const input = this.querySelector('#searchbox') as HTMLInputElement;
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
      const input = this.querySelector('#searchbox') as HTMLInputElement;
      this.dispatchEvent(new CustomEvent('search-input', {
        detail: {value: input.value},
        bubbles: true,
        composed: true,
      }));
    }
  }

  /** Focus the input. */
  focus() {
    (this.querySelector('#searchbox') as HTMLInputElement)?.focus();
  }
}
