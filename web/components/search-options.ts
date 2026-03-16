// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {SearchOptions} from '../query.ts';
import {tooltipStyles, labelStyles} from '../shared-styles.ts';

/**
 * Case sensitivity and literal mode controls.
 *
 * Fires `options-change` custom event when toggles change.
 */
@customElement('cs-search-options')
export class SearchOptionsComponent extends LitElement {
  @property({type: Object}) options: SearchOptions = {};
  @property({type: Array}) repos: {label: string; repos: string[]}[] = [];

  render() {
    const foldCase = this.options.caseSensitive ? 'false' : 'auto';
    return html`
      <div class="search-options">
        <div class="search-option">
          <span class="label">Case:</span>
          <input
            type="radio"
            name="fold_case"
            value="false"
            id="case-match"
            tabindex="3"
            .checked=${foldCase === 'false'}
            @change=${() => this.setCase('false')}
          />
          <label for="case-match">match</label>
          <input
            type="radio"
            name="fold_case"
            value="auto"
            id="case-auto"
            tabindex="4"
            .checked=${foldCase === 'auto'}
            @change=${() => this.setCase('auto')}
          />
          <label for="case-auto">auto</label>
          [<span class="tooltip-target">?<div class="tooltip">Case-sensitive if the query contains capital letters</div></span>]
          <input
            type="radio"
            name="fold_case"
            value="true"
            id="case-ignore"
            tabindex="5"
            .checked=${foldCase === 'true'}
            @change=${() => this.setCase('true')}
          />
          <label for="case-ignore">ignore</label>
        </div>
        <div class="search-option">
          <span class="label">Literal:</span>
          <input
            type="checkbox"
            name="literal"
            id="literal"
            tabindex="6"
            .checked=${this.options.literal ?? false}
            @change=${this.toggleLiteral}
          />
        </div>
        <div class="search-option">
          <span class="label">Repo:</span>
          <repo-select>
            <select name="repo" id="repos" multiple>
              ${this.renderRepoOptions()}
            </select>
          </repo-select>
        </div>
      </div>
    `;
  }

  private renderRepoOptions() {
    if (!this.repos.length) return '';
    return this.repos.map(group => html`
      <optgroup label=${group.label}>
        ${group.repos.map(repo => {
          const base = repo.split('/').pop() ?? repo;
          return html`<option value=${repo} data-tokens=${repo}>${base}</option>`;
        })}
      </optgroup>
    `);
  }

  private setCase(value: string) {
    const caseSensitive = value === 'false';
    this.options = {...this.options, caseSensitive};
    this.fireChange();
  }

  private toggleLiteral() {
    this.options = {...this.options, literal: !this.options.literal};
    this.fireChange();
  }

  private fireChange() {
    this.dispatchEvent(new CustomEvent('options-change', {
      detail: this.options,
      bubbles: true,
      composed: true,
    }));
  }

  static styles = [
    tooltipStyles,
    labelStyles,
    css`
      :host {
        display: block;
      }

      .search-options {
        margin: 0;
        font-size: 12px;
        line-height: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: end;
        align-items: center;
        gap: 10pt;
      }

      .search-option {
        white-space: nowrap;
      }
    `,
  ];
}
