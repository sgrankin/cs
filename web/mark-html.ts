// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

/**
 * Insert a <mark> wrapper into an HTML string at plain-text character offsets.
 * Handles splitting across HTML tags correctly.
 *
 * Example:
 *   markInHTML('<span class="kw">static</span> const x', 7, 12)
 *   → '<span class="kw">static</span> <mark>const</mark> x'
 */
export function markInHTML(html: string, start: number, end: number, markClass = 'matchstr'): string {
  if (start >= end) return html;
  let textPos = 0;
  let result = '';
  let inTag = false;
  let markOpened = false;

  for (let i = 0; i < html.length; i++) {
    const ch = html[i];

    if (ch === '<') {
      inTag = true;
      result += ch;
      continue;
    }
    if (ch === '>') {
      inTag = false;
      result += ch;
      continue;
    }
    if (inTag) {
      result += ch;
      continue;
    }

    // Handle HTML entities (e.g. &amp; &lt; &gt; &quot;)
    let entity = '';
    if (ch === '&') {
      let j = i;
      while (j < html.length && html[j] !== ';' && j - i < 10) j++;
      if (j < html.length && html[j] === ';') {
        entity = html.slice(i, j + 1);
        i = j; // skip past entity
      }
    }

    // We're at a text character position.
    if (textPos === start && !markOpened) {
      result += `<mark class="${markClass}">`;
      markOpened = true;
    }

    result += entity || ch;
    textPos++;

    if (textPos === end && markOpened) {
      result += '</mark>';
      markOpened = false;
    }
  }

  // Close mark if it wasn't closed (match extends past end of text).
  if (markOpened) {
    result += '</mark>';
  }

  return result;
}
