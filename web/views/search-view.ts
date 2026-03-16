// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher} from '@lit-labs/signals';
import {
  queryText, searchResults, limitedFileResults,
  facets, searchDone, searchLoading, searchError, triggerSearch,
  contextLines,
} from '../state.ts';
import type {SearchOptions} from '../query.ts';
import {splitResultPath} from '../api.ts';
import {linkStyles, labelStyles} from '../shared-styles.ts';

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
  private activeFacets: Record<string, Set<string>> = {};

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
          <div class="query-hint">
            Special terms:
            <code>path:</code>
            <code>-path:</code>
            <code>repo:</code>
            <code>-repo:</code>
            <code>max_matches:</code>
          </div>
          <cs-search-options
            .options=${this.currentOptions}
            .repos=${this.getRepos()}
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
            <cs-facet-panel
              .facets=${facetData}
              .selected=${this.activeFacets}
              @facet-toggle=${this.onFacetToggle}
            ></cs-facet-panel>
            <div
              id="results"
              tabindex="-1"
            >
              <div id="path-results">
                ${files.map(f => {
                  const {repo, version, filePath} = splitResultPath(f.path);
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
                  <cs-result-group .result=${r} ?no-context=${ctxLines <= 0}></cs-result-group>
                `)}
              </div>
            </div>
          </div>
        ` : html`
          <cs-search-help></cs-search-help>
        `}
      </div>
    `;
  }

  private onFacetToggle(e: CustomEvent<{key: string; value: string}>) {
    const {key, value} = e.detail;
    const current = this.activeFacets[key] ?? new Set();
    const updated = new Set(current);
    if (updated.has(value)) {
      updated.delete(value);
    } else {
      updated.add(value);
    }
    this.activeFacets = {...this.activeFacets, [key]: updated};
    this.reSearch();
  }

  private onSearchInput(e: CustomEvent<{value: string}>) {
    triggerSearch(e.detail.value, this.currentOptions, this.facetParams());
  }

  private onOptionsChange(e: CustomEvent<SearchOptions>) {
    this.currentOptions = e.detail;
    this.reSearch();
  }

  private reSearch() {
    const text = queryText.get();
    if (text) {
      triggerSearch(text, this.currentOptions, this.facetParams());
    }
  }

  /** Read repo groups from server-embedded init data. */
  private getRepos(): {label: string; repos: string[]}[] {
    return (window as any).__CS_INIT?.repos ?? [];
  }

  /** Convert active facet Sets to string[] record for triggerSearch. */
  private facetParams(): Record<string, string[]> {
    const params: Record<string, string[]> = {};
    for (const [key, values] of Object.entries(this.activeFacets)) {
      if (values.size > 0) {
        params[key] = [...values];
      }
    }
    return params;
  }

  static styles = [
    linkStyles,
    labelStyles,
    css`
      :host {
        display: block;
        line-height: normal;
        font-size: 13px;
      }

      #searcharea {
        width: 100%;
        max-width: 1200px;
        margin-top: 30px;
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        padding: 20px;
        background: var(--color-background);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        box-sizing: border-box;
      }

      #searcharea > div {
        flex: 1 1 auto;
      }

      #resultbox {
        padding: 1em 3em;
        width: 100%;
        box-sizing: border-box;
      }

      #results {
        margin-top: 10px;
        outline: none;
        /* despite 'tabindex' that lets it receive keystrokes */
      }

      #path-results {
        margin-bottom: 15px;
      }

      .query-hint {
        padding-top: 5px;
        font-size: 11px;
        font-style: italic;
        color: var(--color-foreground-subtle);
      }

      .query-hint code {
        border: 1px solid var(--color-border-subtle);
        border-radius: 3px;
        background: var(--color-background-subtle);
        font-style: normal;
        margin: 0px 1px;
        padding: 1px 3px;
      }

    `,
  ];
}

