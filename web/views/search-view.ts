// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, nothing} from 'lit';
import {customElement} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {SignalWatcher} from '@lit-labs/signals';
import {
  queryText, searchResults, limitedFileResults,
  facets, searchDone, searchLoading, searchError, triggerSearch,
  contextLines,
} from '../state.ts';
import type {SearchOptions} from '../query.ts';

// Import child components.
import '../components/search-input.ts';
import '../components/search-options.ts';
import '../components/result-group.ts';
import '../components/result-stats.ts';
import '../components.ts';
import './search-help.ts';

/**
 * Search view: orchestrates search input, options, results, facets.
 * Reads state from signals and dispatches search via triggerSearch().
 * Uses light DOM so codesearch.css styles apply.
 */
@customElement('cs-search-view')
export class SearchView extends SignalWatcher(LitElement) {
  createRenderRoot() { return this; }

  private currentOptions: SearchOptions = {};
  private currentFacets: Record<string, string[]> = {};

  render() {
    const text = queryText.get();
    const results = searchResults.get();
    const files = limitedFileResults.get();
    const done = searchDone.get();
    const loading = searchLoading.get();
    const error = searchError.get();
    const facetData = facets.get();
    const ctxLines = contextLines.get();

    const hasResults = done || loading;

    return html`
      <div id="searcharea">
        <form
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          @submit=${(e: Event) => e.preventDefault()}
        >
          <cs-search-input
            .value=${text}
            .error=${error ?? ''}
            @search-input=${this.onSearchInput}
          ></cs-search-input>
          <cs-search-options
            .options=${this.currentOptions}
            @options-change=${this.onOptionsChange}
          ></cs-search-options>
        </form>
      </div>
      <div id="resultbox">
        ${hasResults ? html`
          <div id="resultarea">
            <cs-result-stats
              .total=${done?.total ?? 0}
              .timeMs=${done?.time_ms ?? 0}
              .truncated=${done?.truncated ?? false}
              .loading=${loading}
            ></cs-result-stats>
            <div
              id="results"
              tabindex="-1"
              style="outline: none"
              class=${classMap({'no-context': ctxLines <= 0})}
            >
              <div id="file-extensions">
                ${facetData?.ext && facetData.ext.length > 0 ? html`
                  Narrow to:
                  ${facetData.ext.slice(0, 5).map(b => html`
                    <button type="button" @click=${() => this.addExtFilter(b.v)}>
                      ${b.v}
                    </button>
                  `)}
                ` : nothing}
              </div>
              <div id="path-results">
                ${files.map(f => {
                  const {repo, version, filePath} = splitFilePath(f.path);
                  return html`
                    <filename-match
                      text=${filePath}
                      start=${f.match[0]}
                      end=${f.match[1]}
                      repo=${repo}
                      version=${version.slice(0, 6)}
                      href="/view/${f.path}"
                    ></filename-match>
                  `;
                })}
              </div>
              <div id="code-results">
                ${results.map(r => html`
                  <cs-result-group .result=${r}></cs-result-group>
                `)}
              </div>
            </div>
          </div>
        ` : html`
          <cs-search-help></cs-search-help>
        `}
      </div>
      <footer id="header">
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `;
  }

  private addExtFilter(ext: string) {
    const input = document.getElementById('searchbox') as HTMLInputElement | null;
    if (!input) return;
    // Add file filter to query text.
    input.value = `file:${ext} ${input.value}`;
    // Fire a search-input event to trigger search.
    this.onSearchInput(new CustomEvent('search-input', {
      detail: {value: input.value},
    }));
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
}

/** Split a JSONL result path (repo/version/+/filepath) into components. */
function splitFilePath(path: string): {repo: string; version: string; filePath: string} {
  const plusIdx = path.indexOf('/+/');
  if (plusIdx === -1) return {repo: path, version: '', filePath: ''};
  const before = path.slice(0, plusIdx);
  const filePath = path.slice(plusIdx + 3);
  const slashIdx = before.indexOf('/');
  if (slashIdx === -1) return {repo: before, version: '', filePath};
  return {
    repo: before.slice(0, slashIdx),
    version: before.slice(slashIdx + 1),
    filePath,
  };
}
