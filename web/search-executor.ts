// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Pure state machine for search result accumulation.
// No signals, no timers, no fetch — just inputs and state updates.

import type {ResultEvent, FileMatchEvent, FacetsEvent, DoneEvent} from './api.ts';

/** Partial search state update. Only set fields are applied. */
export interface SearchUpdate {
  results?: ResultEvent[];
  files?: FileMatchEvent[];
  facets?: FacetsEvent | null;
  done?: DoneEvent | null;
  loading?: boolean;
  error?: string | null;
}

/**
 * Manages search result accumulation and flush timing.
 *
 * Key invariant: start() does NOT clear results/files — old results
 * stay visible until the first flush delivers new data.
 */
export class SearchExecutor {
  private results: ResultEvent[] = [];
  private files: FileMatchEvent[] = [];
  private dirty = false;
  private flushed = false;

  /** Begin a new search. Old results are preserved until first flush. */
  start(): SearchUpdate {
    this.results = [];
    this.files = [];
    this.dirty = false;
    this.flushed = false;
    return {loading: true, error: null, done: null};
  }

  /** Accumulate a code result. */
  onResult(event: ResultEvent): void {
    this.results.push(event);
    this.dirty = true;
  }

  /** Accumulate a file result. */
  onFile(event: FileMatchEvent): void {
    this.files.push(event);
    this.dirty = true;
  }

  /** Called on timer tick. Returns update if dirty, null otherwise. */
  flush(): SearchUpdate | null {
    if (!this.dirty) return null;
    this.dirty = false;
    const update: SearchUpdate = {
      results: [...this.results],
      files: [...this.files],
    };
    if (!this.flushed) {
      // First flush: clear stale facets from previous search.
      update.facets = null;
      this.flushed = true;
    }
    return update;
  }

  /** Facets arrived. Applied immediately (not buffered). */
  onFacets(event: FacetsEvent): SearchUpdate {
    return {facets: event};
  }

  /** Stream complete. Final flush with done stats. */
  onDone(event: DoneEvent): SearchUpdate {
    return {
      results: this.results,
      files: this.files,
      done: event,
      loading: false,
    };
  }

  /** Stream error. */
  onError(message: string): SearchUpdate {
    return {error: message, loading: false};
  }
}
