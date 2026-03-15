// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher} from '@lit-labs/signals';
import {
  queryText, searchResults, fileResults,
  facets, searchDone, searchLoading, searchError, triggerSearch,
} from '../state.ts';
import type {SearchOptions} from '../query.ts';

// Import child components.
import '../components/search-input.ts';
import '../components/search-options.ts';
import '../components/result-group.ts';
import '../components/result-stats.ts';
import '../components/facet-panel.ts';
import '../components.ts';
import './search-help.ts';

/**
 * Search view: orchestrates search input, options, results, facets.
 * Reads state from signals and dispatches search via triggerSearch().
 */
@customElement('cs-search-view')
export class SearchView extends SignalWatcher(LitElement) {
  private currentOptions: SearchOptions = {};
  private currentFacets: Record<string, string[]> = {};

  render() {
    const text = queryText.get();
    const results = searchResults.get();
    const files = fileResults.get();
    const done = searchDone.get();
    const loading = searchLoading.get();
    const error = searchError.get();
    const facetData = facets.get();

    return html`
      <div class="search-view">
        <div class="controls">
          <cs-search-input
            .value=${text}
            .error=${error ?? ''}
            @search-input=${this.onSearchInput}
          ></cs-search-input>
          <cs-search-options
            .caseSensitive=${this.currentOptions.caseSensitive ?? false}
            .literal=${this.currentOptions.literal ?? false}
            @options-change=${this.onOptionsChange}
          ></cs-search-options>
        </div>

        ${!text ? html`<cs-search-help></cs-search-help>` : ''}

        ${done || loading ? html`
          <cs-result-stats
            .total=${done?.total ?? 0}
            .timeMs=${done?.time_ms ?? 0}
            .truncated=${done?.truncated ?? false}
            .loading=${loading}
          ></cs-result-stats>
        ` : ''}

        ${facetData ? html`
          <cs-facet-panel
            .facets=${facetData}
            .selected=${this.currentFacets}
            @facet-select=${this.onFacetSelect}
          ></cs-facet-panel>
        ` : ''}

        ${files.length > 0 ? html`
          <div class="file-results">
            ${files.map(f => html`
              <filename-match
                text=${f.path}
                href="/view/${f.path}"
                start=${f.match[0]}
                end=${f.match[1]}
              ></filename-match>
            `)}
          </div>
        ` : ''}

        ${results.length > 0 ? html`
          <div class="code-results">
            ${results.map(r => html`
              <cs-result-group .result=${r}></cs-result-group>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }

  private onSearchInput(e: CustomEvent<{value: string}>) {
    triggerSearch(e.detail.value, this.currentOptions, this.currentFacets);
  }

  private onOptionsChange(e: CustomEvent<SearchOptions>) {
    this.currentOptions = e.detail;
    const text = queryText.get();
    if (text) {
      triggerSearch(text, this.currentOptions, this.currentFacets);
    }
  }

  private onFacetSelect(e: CustomEvent<{key: string; value: string}>) {
    const {key, value} = e.detail;
    const current = this.currentFacets[key] ?? [];
    const idx = current.indexOf(value);
    if (idx >= 0) {
      // Deselect: remove value.
      this.currentFacets = {
        ...this.currentFacets,
        [key]: current.filter(v => v !== value),
      };
    } else {
      // Select: add value.
      this.currentFacets = {
        ...this.currentFacets,
        [key]: [...current, value],
      };
    }
    const text = queryText.get();
    if (text) {
      triggerSearch(text, this.currentOptions, this.currentFacets);
    }
  }

  static styles = css`
    .search-view {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px;
    }
    .controls {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    cs-search-input {
      flex: 1;
    }
    .file-results {
      margin-bottom: 12px;
    }
    .code-results {
      display: flex;
      flex-direction: column;
    }
  `;
}
