// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Regex-based syntax highlighting for search snippets.
// Uses highlight.js which works on fragments without full file context.

import hljs from 'highlight.js/lib/core';

// Register languages we care about. Each import is ~2-5KB.
import go from 'highlight.js/lib/languages/go';
import python from 'highlight.js/lib/languages/python';
import rust from 'highlight.js/lib/languages/rust';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';
import ruby from 'highlight.js/lib/languages/ruby';
import bash from 'highlight.js/lib/languages/bash';
import clojure from 'highlight.js/lib/languages/clojure';
import yaml from 'highlight.js/lib/languages/yaml';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import sql from 'highlight.js/lib/languages/sql';
import makefile from 'highlight.js/lib/languages/makefile';
import markdown from 'highlight.js/lib/languages/markdown';
import diff from 'highlight.js/lib/languages/diff';
import lua from 'highlight.js/lib/languages/lua';
import kotlin from 'highlight.js/lib/languages/kotlin';
import scala from 'highlight.js/lib/languages/scala';
import swift from 'highlight.js/lib/languages/swift';
import shell from 'highlight.js/lib/languages/shell';
import properties from 'highlight.js/lib/languages/properties';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import protobuf from 'highlight.js/lib/languages/protobuf';
import haskell from 'highlight.js/lib/languages/haskell';
import elixir from 'highlight.js/lib/languages/elixir';
import erlang from 'highlight.js/lib/languages/erlang';

// Register languages. Some have type mismatches with hljs core types.
const langs: [string, any][] = [
  ['go', go], ['python', python], ['rust', rust],
  ['typescript', typescript], ['javascript', javascript],
  ['c', c], ['cpp', cpp], ['java', java], ['ruby', ruby],
  ['bash', bash], ['clojure', clojure],
  ['yaml', yaml], ['json', json], ['xml', xml], ['css', css],
  ['sql', sql], ['makefile', makefile], ['markdown', markdown],
  ['diff', diff], ['lua', lua],
  ['kotlin', kotlin], ['scala', scala], ['swift', swift],
  ['shell', shell], ['properties', properties],
  ['dockerfile', dockerfile], ['protobuf', protobuf],
  ['haskell', haskell], ['elixir', elixir], ['erlang', erlang],
];
for (const [name, lang] of langs) hljs.registerLanguage(name, lang);

// Extension to hljs language name.
const EXT_TO_LANG: Record<string, string> = {
  '.go': 'go', '.py': 'python', '.rs': 'rust',
  '.ts': 'typescript', '.tsx': 'typescript', '.js': 'javascript', '.jsx': 'javascript',
  '.c': 'c', '.h': 'c', '.cc': 'cpp', '.cpp': 'cpp', '.hpp': 'cpp',
  '.java': 'java', '.rb': 'ruby', '.sh': 'bash', '.bash': 'bash', '.zsh': 'bash',
  '.clj': 'clojure', '.cljs': 'clojure', '.cljc': 'clojure',
  '.yaml': 'yaml', '.yml': 'yaml', '.json': 'json', '.toml': 'properties',
  '.md': 'markdown', '.html': 'xml', '.xml': 'xml', '.svg': 'xml',
  '.css': 'css', '.scss': 'css', '.sql': 'sql',
  '.lua': 'lua', '.kt': 'kotlin', '.scala': 'scala', '.swift': 'swift',
  '.dockerfile': 'dockerfile', '.proto': 'protobuf',
  '.hs': 'haskell', '.ex': 'elixir', '.erl': 'erlang',
  '.mk': 'makefile', '.diff': 'diff', '.patch': 'diff',
};

const NAME_TO_LANG: Record<string, string> = {
  'Makefile': 'makefile', 'makefile': 'makefile', 'GNUmakefile': 'makefile',
  'Dockerfile': 'dockerfile',
  '.bashrc': 'bash', '.zshrc': 'bash', '.profile': 'bash',
};

/** Detect hljs language from file path. Returns empty string if unknown. */
export function detectSnippetLanguage(filePath: string): string {
  const name = filePath.split('/').pop() ?? '';
  if (NAME_TO_LANG[name]) return NAME_TO_LANG[name];
  const dotIdx = name.lastIndexOf('.');
  if (dotIdx >= 0) {
    const ext = name.slice(dotIdx).toLowerCase();
    if (EXT_TO_LANG[ext]) return EXT_TO_LANG[ext];
  }
  return '';
}

/**
 * Highlight a code snippet, returning an array of HTML strings per line.
 * Returns null if the language is unknown. Synchronous (no WASM loading).
 */
export function highlightSnippet(filePath: string, text: string): string[] | null {
  const lang = detectSnippetLanguage(filePath);
  if (!lang) return null;
  try {
    const result = hljs.highlight(text, {language: lang, ignoreIllegals: true});
    return result.value.split('\n');
  } catch {
    return null;
  }
}
