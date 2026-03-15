// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Application state layer.
// Signals derived from URL (sole source of truth) + API responses.

import {signal, computed, type Signal} from '@lit-labs/signals';
import {currentRoute} from './router.ts';
import {buildSearchParams, parseQuery, type SearchOptions} from './query.ts';
import {searchStream, type ResultEvent, type FileMatchEvent, type FacetsEvent, type DoneEvent} from './api.ts';

// --- Search state ---

/** Raw query text from the URL q param. */
export const queryText: Signal.Computed<string> = computed(() => {
  return currentRoute.get().params.get('q') ?? '';
});

/** Search options derived from URL params. */
export const searchOptions: Signal.Computed<SearchOptions> = computed(() => {
  const params = currentRoute.get().params;
  return {
    literal: params.get('literal') === 'true',
    caseSensitive: params.get('fold_case') === 'false',
  };
});

/** Parsed query structure (operators + main term). */
export const queryParts = computed(() => parseQuery(queryText.get()));

// --- Search results state ---

export const searchResults = signal<ResultEvent[]>([]);
export const fileResults = signal<FileMatchEvent[]>([]);
export const facets = signal<FacetsEvent | null>(null);
export const searchDone = signal<DoneEvent | null>(null);
export const searchLoading = signal(false);
export const searchError = signal<string | null>(null);

// --- Search execution ---

let currentAbort: AbortController | null = null;

/** Execute a search based on current URL params. Cancels any in-flight search. */
export async function executeSearch(): Promise<void> {
  // Cancel previous search.
  if (currentAbort) {
    currentAbort.abort();
  }
  const abort = new AbortController();
  currentAbort = abort;

  const text = queryText.get();
  if (!text) {
    searchResults.set([]);
    fileResults.set([]);
    facets.set(null);
    searchDone.set(null);
    searchLoading.set(false);
    searchError.set(null);
    return;
  }

  // Build search params from URL state.
  const route = currentRoute.get();
  const params = new URLSearchParams(route.params);

  searchLoading.set(true);
  searchError.set(null);
  searchResults.set([]);
  fileResults.set([]);
  facets.set(null);
  searchDone.set(null);

  try {
    await searchStream(params, {
      onResult(event) {
        searchResults.set([...searchResults.get(), event]);
      },
      onFile(event) {
        fileResults.set([...fileResults.get(), event]);
      },
      onFacets(event) {
        facets.set(event);
      },
      onDone(event) {
        searchDone.set(event);
        searchLoading.set(false);
      },
      onError(error) {
        if (!abort.signal.aborted) {
          searchError.set(error.message);
          searchLoading.set(false);
        }
      },
    }, abort.signal);
  } catch (e) {
    if (!abort.signal.aborted) {
      searchError.set(e instanceof Error ? e.message : String(e));
      searchLoading.set(false);
    }
  }
}

// --- Debounced search trigger ---

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let lastPushedQuery = '';

/**
 * Trigger a search with debounce and URL history management.
 *
 * First keystroke after idle → pushState (creates back-button target).
 * Subsequent keystrokes within debounce → replaceState (update in place).
 */
export function triggerSearch(
  rawText: string,
  options: SearchOptions = {},
  facetParams: Record<string, string[]> = {},
): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  const params = buildSearchParams(rawText, options, facetParams);
  const isNewQuery = rawText !== lastPushedQuery;

  // Update URL immediately (replaceState during typing, pushState for new queries).
  const search = params.toString();
  const url = '/search' + (search ? '?' + search : '');
  if (isNewQuery && lastPushedQuery !== '') {
    history.pushState(null, '', url);
    lastPushedQuery = rawText;
  } else {
    history.replaceState(null, '', url);
    if (lastPushedQuery === '') lastPushedQuery = rawText;
  }

  // Update route signal to trigger re-renders.
  currentRoute.set({
    name: 'search',
    params,
  });

  // Debounce the actual search execution.
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    executeSearch();
  }, 100);
}
