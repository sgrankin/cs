// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Syntax highlighting via highlight.js (regex-based).
// Used for both file view and search snippets.
// Re-exports from snippet-highlight.ts which has the hljs setup.

import {highlightSnippet, detectSnippetLanguage} from './snippet-highlight.ts';

/** Detect language from file path. Returns empty string if unknown. */
export const detectLanguage = detectSnippetLanguage;

/**
 * Highlight source code and return an array of HTML strings, one per line.
 * Returns null if the language is unknown or highlighting fails.
 */
export async function highlightLines(filePath: string, content: string): Promise<string[] | null> {
  return highlightSnippet(filePath, content);
}
