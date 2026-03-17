// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Application state layer.
// Signals derived from URL (sole source of truth) + API responses.

import {signal, computed, type Signal} from '@lit-labs/signals';
import {currentRoute} from './router.ts';
import type {SearchOptions} from './query.ts';
import {searchStream, type ResultEvent, type FileMatchEvent, type FacetsEvent, type DoneEvent} from './api.ts';
import {SearchController, type SearchEffect} from './search-controller.ts';
import {SearchExecutor, type SearchUpdate} from './search-executor.ts';

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

  const executor = new SearchExecutor();
  applySearchUpdate(executor.start());

  const flushInterval = setInterval(() => {
    const update = executor.flush();
    if (update) applySearchUpdate(update);
  }, 100);

  try {
    await searchStream(params, {
      onResult(event) { executor.onResult(event); },
      onFile(event) { executor.onFile(event); },
      onFacets(event) { applySearchUpdate(executor.onFacets(event)); },
      onDone(event) {
        clearInterval(flushInterval);
        applySearchUpdate(executor.onDone(event));
      },
    }, abort.signal);
  } catch (e) {
    clearInterval(flushInterval);
    if (!abort.signal.aborted) {
      applySearchUpdate(executor.onError(e instanceof Error ? e.message : String(e)));
    }
  }
}

/** Apply a partial search state update to signals. */
function applySearchUpdate(update: SearchUpdate): void {
  if ('results' in update) searchResults.set(update.results!);
  if ('files' in update) fileResults.set(update.files!);
  if ('facets' in update) facets.set(update.facets!);
  if ('done' in update) searchDone.set(update.done!);
  if ('loading' in update) searchLoading.set(update.loading!);
  if ('error' in update) searchError.set(update.error!);
}

// --- Search controller and debounce wiring ---

const controller = new SearchController();
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

/** Trigger a search with debounce. No URL/title updates until debounce fires. */
export function triggerSearch(
  rawText: string,
  options: SearchOptions = {},
  facetParams: Record<string, string[]> = {},
): void {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    applyEffects(controller.commit(rawText, options, facetParams));
  }, 200);
}

/** Execute search immediately (Enter key). Cancels pending debounce. */
export function immediateSearch(
  rawText: string,
  options: SearchOptions = {},
  facetParams: Record<string, string[]> = {},
): void {
  if (debounceTimer) { clearTimeout(debounceTimer); debounceTimer = null; }
  applyEffects(controller.commit(rawText, options, facetParams));
}

/** Execute search if the current URL has a query. Called on initial load. */
export function initFromUrl(): void {
  const q = queryText.get();
  if (q) {
    applyEffects(controller.commit(q));
  }
}
initFromUrl();

// Re-execute search on back/forward navigation.
window.addEventListener('popstate', () => {
  const route = currentRoute.get();
  const q = route.params.get('q') ?? '';
  applyEffects(controller.popstate(q, route.params));
});

function applyEffects(effects: SearchEffect[]): void {
  for (const effect of effects) {
    switch (effect.type) {
      case 'pushUrl':
        history.pushState(null, effect.title, effect.url);
        document.title = effect.title;
        currentRoute.set({name: 'search', params: new URLSearchParams(new URL(effect.url, location.origin).search)});
        break;
      case 'replaceUrl':
        history.replaceState(null, effect.title, effect.url);
        document.title = effect.title;
        currentRoute.set({name: 'search', params: new URLSearchParams(new URL(effect.url, location.origin).search)});
        break;
      case 'search':
        executeSearch();
        break;
      case 'clearResults':
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);
        break;
    }
  }
}
