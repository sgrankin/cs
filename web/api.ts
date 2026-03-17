// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// JSONL streaming client for the /api/search endpoint.

/** A single line in search results: [lno, text] or [lno, text, [[start,end],...]] */
export type ResultLine = [number, string] | [number, string, [number, number][]];

/** Per-file code match result. */
export interface ResultEvent {
  type: 'result';
  path: string;  // repo/version/+/filepath
  lines: (ResultLine | null)[];  // null separates non-contiguous groups
}

/** Filename match result. */
export interface FileMatchEvent {
  type: 'file';
  path: string;
  match: [number, number];
}

/** Facet bucket. */
export interface FacetBucket {
  v: string;
  c: number;
}

/** Facet buckets by dimension. */
export interface FacetsEvent {
  type: 'facets';
  ext?: FacetBucket[];
  repo?: FacetBucket[];
  path?: FacetBucket[];
}

/** End-of-results signal. */
export interface DoneEvent {
  type: 'done';
  time_ms: number;
  total: number;
  truncated: boolean;
}

/** Union of all JSONL event types. */
export type SearchEvent = ResultEvent | FileMatchEvent | FacetsEvent | DoneEvent;

/** Callbacks for streaming search events. */
export interface SearchCallbacks {
  onResult?: (event: ResultEvent) => void;
  onFile?: (event: FileMatchEvent) => void;
  onFacets?: (event: FacetsEvent) => void;
  onDone?: (event: DoneEvent) => void;
}

/**
 * Stream search results from /api/search as JSONL.
 *
 * Parses the response line-by-line and dispatches typed events.
 * Returns when the stream ends or is aborted. Throws on HTTP errors.
 */
export async function searchStream(
  params: URLSearchParams,
  callbacks: SearchCallbacks,
  signal?: AbortSignal,
): Promise<void> {
  const url = '/api/search?' + params.toString();
  const response = await fetch(url, { signal });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`search failed (${response.status}): ${text}`);
  }
  if (!response.body) {
    throw new Error('response has no body');
  }
  await readJSONLines(response.body, (event: SearchEvent) => {
    switch (event.type) {
      case 'result': callbacks.onResult?.(event); break;
      case 'file': callbacks.onFile?.(event); break;
      case 'facets': callbacks.onFacets?.(event); break;
      case 'done': callbacks.onDone?.(event); break;
    }
  });
}

/**
 * Parse a ReadableStream of JSONL into typed events.
 * Each line is a complete JSON object terminated by \n.
 */
export async function readJSONLines<T>(
  stream: ReadableStream<Uint8Array>,
  handler: (event: T) => void,
): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Process complete lines.
      let newlineIdx: number;
      while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, newlineIdx).trim();
        buffer = buffer.slice(newlineIdx + 1);
        if (line.length === 0) continue;
        handler(JSON.parse(line) as T);
      }
    }
    // Process any remaining data.
    buffer += decoder.decode();
    const remaining = buffer.trim();
    if (remaining.length > 0) {
      handler(JSON.parse(remaining) as T);
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Split a result path into its components.
 * Path format: "repo/version/+/filepath"
 */
export function splitResultPath(path: string): { repo: string; version: string; filePath: string } {
  const plusIdx = path.indexOf('/+/');
  if (plusIdx === -1) {
    return { repo: path, version: '', filePath: '' };
  }
  const before = path.slice(0, plusIdx);
  const filePath = path.slice(plusIdx + 3);
  const slashIdx = before.lastIndexOf('/');
  if (slashIdx === -1) {
    return { repo: before, version: '', filePath };
  }
  return {
    repo: before.slice(0, slashIdx),
    version: before.slice(slashIdx + 1),
    filePath,
  };
}
