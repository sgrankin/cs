// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Lazy-loading syntax highlighting via highlight.js.
// The hljs module (~105KB) is loaded on first use via dynamic import.

type SnippetModule = typeof import('./snippet-highlight.ts');

let mod: SnippetModule | null = null;
let loading: Promise<SnippetModule> | null = null;

async function load(): Promise<SnippetModule> {
  if (mod) return mod;
  if (!loading) {
    loading = import('./snippet-highlight.ts').then(m => { mod = m; return m; });
  }
  return loading;
}

// Start loading immediately on import — don't wait for first highlight call.
// By the time search results arrive (~200ms debounce + network), hljs is usually ready.
load();

/**
 * Highlight source code and return an array of HTML strings, one per line.
 * Lazy-loads highlight.js on first call. Returns null if language unknown.
 */
export async function highlightLines(filePath: string, content: string): Promise<string[] | null> {
  const m = await load();
  return m.highlightSnippet(filePath, content);
}

