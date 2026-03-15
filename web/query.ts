// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Client-side query parser.
// Parses raw search text into operators and a main search term,
// then builds URL search params for the /api/search endpoint.

/** Known operator prefixes recognized in query text. */
const OPERATORS = new Set([
  'file', '-file', 'path', '-path',
  'repo', '-repo',
  'tags', '-tags',
  'case', 'lit',
  'max_matches',
]);

/** Parsed query structure. */
export interface QueryParts {
  /** Main search term (everything not inside an operator). */
  line: string;
  /** Operator values extracted from the text. */
  operators: Record<string, string[]>;
}

/**
 * Parse raw query text into operators and a main search term.
 * Matches the server-side ParseQuery logic in server/query.go.
 *
 * Operators are `key:value` where key is a known operator name.
 * Values end at the next unescaped space (unless inside balanced parens/brackets).
 * The main search term is everything else (must be contiguous).
 */
export function parseQuery(text: string): QueryParts {
  const operators: Record<string, string[]> = {};
  let line = '';
  let currentKey = '';
  let term = '';
  let q = text.trim();

  // Regex matching: operator prefix, open bracket/paren, escape, or space.
  const pieceRE = /\[|\(|(?:^([a-zA-Z0-9\-_]+):|\\.)| /;

  let justGotSpace = true;

  while (q.length > 0) {
    const m = pieceRE.exec(q);
    if (m === null) {
      term += q;
      break;
    }

    term += q.slice(0, m.index);
    const match = m[0];
    q = q.slice(m.index + match.length);

    justGotSpace = justGotSpace && m.index === 0;

    if (match === ' ') {
      if (currentKey === '') {
        term += ' ';
      } else {
        pushOp(operators, currentKey, term);
        currentKey = '';
        term = '';
      }
    } else if (match === '(' || match === '[') {
      const close = match === '(' ? ')' : ']';
      // Consume until balanced close.
      let depth = 1;
      let i = 0;
      let esc = false;
      let buf = '';
      while (i < q.length && depth > 0) {
        const ch = q[i];
        i++;
        if (esc) {
          esc = false;
        } else if (ch === '\\') {
          esc = true;
        } else if (ch === match) {
          depth++;
        } else if (ch === close) {
          depth--;
        }
        buf += ch;
      }
      term += match + buf;
      q = q.slice(i);
    } else if (match.startsWith('\\')) {
      term += match;
    } else {
      // Operator: match group 1 is the key.
      const newKey = m[1];
      if (currentKey === '' && newKey && OPERATORS.has(newKey)) {
        if (term.trim() !== '') {
          pushOp(operators, currentKey, term);
        }
        term = '';
        currentKey = newKey;
      } else {
        term += match;
      }
    }
    justGotSpace = match === ' ';
  }

  // Final term.
  pushOp(operators, currentKey, term);

  // The '' key holds the main search term parts.
  const lineParts = operators[''] || [];
  delete operators[''];
  line = lineParts.join(' ').trim();

  return { line, operators };
}

function pushOp(ops: Record<string, string[]>, key: string, value: string): void {
  if (!ops[key]) ops[key] = [];
  ops[key].push(value);
}

/** Options for building search params. */
export interface SearchOptions {
  caseSensitive?: boolean;
  literal?: boolean;
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

  // Append facet filters.
  for (const [key, values] of Object.entries(facets)) {
    for (const v of values) {
      params.append(key, v);
    }
  }

  return params;
}

/**
 * Rebuild query text from parsed parts.
 * Useful for programmatically modifying the query (e.g., adding a file filter).
 */
export function rebuildQueryText(parts: QueryParts): string {
  const pieces: string[] = [];
  if (parts.line) {
    pieces.push(parts.line);
  }
  for (const [key, values] of Object.entries(parts.operators)) {
    for (const value of values) {
      pieces.push(`${key}:${value}`);
    }
  }
  return pieces.join(' ');
}
