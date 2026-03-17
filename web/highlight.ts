// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Syntax highlighting via arborium (tree-sitter WASM).
// Loads grammars on demand from CDN. Returns highlighted HTML per line.

import {highlight, setConfig} from '@arborium/arborium';

// Map file extensions to arborium language identifiers.
const EXT_TO_LANG: Record<string, string> = {
  '.go': 'go', '.py': 'python', '.rs': 'rust',
  '.ts': 'typescript', '.tsx': 'tsx', '.js': 'javascript', '.jsx': 'jsx',
  '.c': 'c', '.h': 'c', '.cc': 'cpp', '.cpp': 'cpp', '.hpp': 'cpp',
  '.java': 'java', '.rb': 'ruby', '.sh': 'bash', '.bash': 'bash',
  '.zsh': 'bash', '.fish': 'fish',
  '.clj': 'clojure', '.cljs': 'clojure', '.cljc': 'clojure',
  '.yaml': 'yaml', '.yml': 'yaml', '.json': 'json', '.toml': 'toml',
  '.md': 'markdown', '.html': 'html', '.css': 'css', '.scss': 'scss',
  '.sql': 'sql', '.lua': 'lua', '.zig': 'zig', '.swift': 'swift',
  '.kt': 'kotlin', '.scala': 'scala', '.r': 'r',
  '.el': 'elisp', '.ex': 'elixir', '.erl': 'erlang',
  '.hs': 'haskell', '.ml': 'ocaml', '.fs': 'fsharp',
  '.proto': 'protobuf', '.tf': 'hcl',
  '.dockerfile': 'dockerfile', '.makefile': 'make',
  '.xml': 'xml', '.svg': 'xml',
};

// Special filenames.
const NAME_TO_LANG: Record<string, string> = {
  'Makefile': 'make', 'makefile': 'make', 'GNUmakefile': 'make',
  'Dockerfile': 'dockerfile',
  'CMakeLists.txt': 'cmake',
  '.gitignore': 'gitignore',
  '.bashrc': 'bash', '.zshrc': 'bash', '.profile': 'bash',
};

/** Detect language from file path. Returns empty string if unknown. */
export function detectLanguage(filePath: string): string {
  const name = filePath.split('/').pop() ?? '';
  if (NAME_TO_LANG[name]) return NAME_TO_LANG[name];
  const dotIdx = name.lastIndexOf('.');
  if (dotIdx >= 0) {
    const ext = name.slice(dotIdx).toLowerCase();
    if (EXT_TO_LANG[ext]) return EXT_TO_LANG[ext];
  }
  return '';
}

// Configure arborium to suppress debug logging.
setConfig({logger: {debug: () => {}, warn: console.warn, error: console.error}});

/**
 * Highlight source code and return an array of HTML strings, one per line.
 * Returns null if the language is unknown or highlighting fails.
 * Grammars are loaded on demand from CDN (cached after first load).
 */
export async function highlightLines(filePath: string, content: string): Promise<string[] | null> {
  const lang = detectLanguage(filePath);
  if (!lang) return null;

  try {
    const html = await highlight(lang, content);
    // arborium returns a single HTML string. Split by newlines to get per-line HTML.
    // The output preserves line structure from the input.
    return html.split('\n');
  } catch {
    return null;
  }
}
