// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Pure state machine for search history and URL management.
// No DOM, no timers, no signals — just inputs and effects.

import {buildSearchParams, type SearchOptions} from './query.ts';

export type SearchEffect =
  | {type: 'pushUrl'; url: string; title: string}
  | {type: 'replaceUrl'; url: string; title: string}
  | {type: 'search'; params: URLSearchParams}
  | {type: 'clearResults'};

export class SearchController {
  lastCommittedUrl = '';

  /**
   * Commit a search: update URL/history and execute.
   * Called when debounce fires, Enter is pressed, or options/facets change.
   */
  commit(
    query: string,
    options: SearchOptions = {},
    facetParams: Record<string, string[]> = {},
  ): SearchEffect[] {
    const params = buildSearchParams(query, options, facetParams);
    const title = query ? `${query} · code search` : 'code search';
    const url = searchUrl(params);

    if (!query) {
      this.lastCommittedUrl = '';
      // Clear facets from URL when query is empty.
      const cleanUrl = searchUrl(new URLSearchParams());
      return [
        {type: 'replaceUrl', url: cleanUrl, title},
        {type: 'clearResults'},
      ];
    }

    const effects: SearchEffect[] = [];

    // Push a new history entry if the URL changed (query, options, or facets).
    // First search from empty page uses replaceState (nothing to go back to).
    if (url !== this.lastCommittedUrl && this.lastCommittedUrl !== '') {
      effects.push({type: 'pushUrl', url, title});
    } else {
      effects.push({type: 'replaceUrl', url, title});
    }

    effects.push({type: 'search', params});
    this.lastCommittedUrl = url;
    return effects;
  }

  /**
   * Handle browser back/forward.
   * Syncs internal state so the next commit gets correct push/replace behavior.
   */
  popstate(query: string, params: URLSearchParams): SearchEffect[] {
    this.lastCommittedUrl = searchUrl(params);
    const title = query ? `${query} · code search` : 'code search';
    // Title needs updating; URL is already set by the browser.
    const effects: SearchEffect[] = [{type: 'replaceUrl', url: searchUrl(params), title}];
    if (query) {
      effects.push({type: 'search', params});
    } else {
      effects.push({type: 'clearResults'});
    }
    return effects;
  }
}

function searchUrl(params: URLSearchParams): string {
  const search = params.toString();
  return '/search' + (search ? '?' + search : '');
}
