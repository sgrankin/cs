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

/** Context lines derived from URL params (default: 3). */
export const contextLines: Signal.Computed<number> = computed(() => {
  const v = currentRoute.get().params.get('context');
  if (v !== null) {
    const n = parseInt(v, 10);
    if (!isNaN(n) && n >= 0) return n;
  }
  return 3; // Default context lines, matches server default.
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

// Whether the current search is filename-only (no code query, just path: filters).
const isFilenameOnly = signal(false);

/**
 * File results limited to 10 for non-filename-only searches,
 * matching the old templ limitedFileResults behavior.
 */
export const limitedFileResults: Signal.Computed<FileMatchEvent[]> = computed(() => {
  const files = fileResults.get();
  if (isFilenameOnly.get()) return files;
  return files.length <= 10 ? files : files.slice(0, 10);
});

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
    isFilenameOnly.set(false);
    return;
  }

  // Build search params from URL state.
  const route = currentRoute.get();
  const params = new URLSearchParams(route.params);

  // Detect filename-only search: if the main line is empty after parsing.
  const parsed = parseQuery(text);
  isFilenameOnly.set(parsed.line === '');

  searchLoading.set(true);
  searchError.set(null);
  searchResults.set([]);
  fileResults.set([]);
  facets.set(null);
  searchDone.set(null);

  // Collect results in local arrays, then set signals once at the end.
  // Per-event signal updates cause render thrashing with large result sets.
  const collectedResults: ResultEvent[] = [];
  const collectedFiles: FileMatchEvent[] = [];
  let collectedFacets: FacetsEvent | null = null;

  try {
    await searchStream(params, {
      onResult(event) {
        collectedResults.push(event);
      },
      onFile(event) {
        collectedFiles.push(event);
      },
      onFacets(event) {
        collectedFacets = event;
      },
      onDone(event) {
        // Flush all collected results to signals at once.
        searchResults.set(collectedResults);
        fileResults.set(collectedFiles);
        facets.set(collectedFacets);
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
 * First keystroke after idle -> pushState (creates back-button target).
 * Subsequent keystrokes within debounce -> replaceState (update in place).
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

  // Update page title.
  const title = rawText ? `${rawText} · code search` : 'code search';
  document.title = title;

  // Update URL immediately (replaceState during typing, pushState for new queries).
  const search = params.toString();
  const url = '/search' + (search ? '?' + search : '');
  if (isNewQuery && lastPushedQuery !== '') {
    history.pushState(null, title, url);
    lastPushedQuery = rawText;
  } else {
    history.replaceState(null, title, url);
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

// Auto-execute search on initial load if URL has a query.
{
  const q = queryText.get();
  if (q) {
    document.title = `${q} · code search`;
    executeSearch();
  }
}
