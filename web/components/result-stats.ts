// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/** Displays search result count and timing. */
@customElement('cs-result-stats')
export class ResultStats extends LitElement {
  @property({type: Number}) total = 0;
  @property({type: Number}) timeMs = 0;
  @property({type: Boolean}) truncated = false;
  @property({type: Boolean}) loading = false;

  render() {
    if (this.loading) {
      return html`<div class="stats">Searching...</div>`;
    }
    const countText = this.truncated
      ? `${this.total}+ results`
      : `${this.total} result${this.total !== 1 ? 's' : ''}`;
    return html`<div class="stats">${countText} in ${this.timeMs}ms</div>`;
  }

  static styles = css`
    .stats {
      font-size: 12px;
      color: var(--color-foreground-muted);
      padding: 4px 0;
    }
  `;
}
