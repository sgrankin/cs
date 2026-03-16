// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {labelStyles} from '../shared-styles.ts';

/**
 * Displays search result count and timing.
 */
@customElement('cs-result-stats')
export class ResultStats extends LitElement {
  @property({type: Number}) total = 0;
  @property({type: Number}) timeMs = 0;
  @property({type: Boolean}) truncated = false;
  @property({type: Boolean}) loading = false;

  render() {
    if (this.loading) {
      return html`<div id="countarea">Searching...</div>`;
    }
    const countText = this.truncated ? `${this.total}+` : `${this.total}`;
    return html`
      <div id="countarea">
        <span id="numresults">${countText}</span> matches
        <span id="searchtimebox">
          <span class="label">in </span>
          <span id="searchtime">${this.timeMs}ms</span>
        </span>
      </div>
    `;
  }

  static styles = [
    labelStyles,
    css`
      :host {
        display: block;
      }

      #countarea {
        text-align: right;
      }
    `,
  ];
}
