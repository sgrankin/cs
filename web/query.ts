// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Search query param building.
// The server handles query parsing; the client just passes the raw text.

/** Options for building search params. */
export interface SearchOptions {
  caseSensitive?: boolean;
  literal?: boolean;
  repos?: string[];
}

/**
 * Build URLSearchParams for the /api/search endpoint.
 *
 * Takes raw query text + UI toggle state, produces structured params.
 * The raw text is sent as `q` (with operators embedded) so the server
 * can parse it. Case/literal toggles are sent as separate params.
 */
export function buildSearchParams(
  rawText: string,
  options: SearchOptions = {},
  facets: Record<string, string[]> = {},
): URLSearchParams {
  const params = new URLSearchParams();

  if (rawText.trim()) {
    params.set('q', rawText.trim());
  }

  if (options.literal) {
    params.set('literal', 'true');
  }
  if (options.caseSensitive) {
    params.set('fold_case', 'false');
  }
  if (options.repos?.length) {
    for (const r of options.repos) {
      params.append('repo', r);
    }
  }

  // Append facet filters.
  for (const [key, values] of Object.entries(facets)) {
    for (const v of values) {
      params.append(key, v);
    }
  }

  return params;
}
