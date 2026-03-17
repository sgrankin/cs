// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {splitResultPath, type ResultEvent, type ResultLine} from '../api.ts';
import {resultPathStyles, linkStyles} from '../shared-styles.ts';
import {highlightSnippet} from '../snippet-highlight.ts';
import '../components.ts';

// path helpers matching Go's path.Dir and path.Base.
function pathDir(p: string): string {
  const i = p.lastIndexOf('/');
  if (i < 0) return '.';
  return p.slice(0, i);
}
function pathBase(p: string): string {
  const i = p.lastIndexOf('/');
  if (i < 0) return p;
  return p.slice(i + 1);
}

/**
 * Renders one file's search results: header (file path) + line matches.
 */
@customElement('cs-result-group')
export class ResultGroup extends LitElement {
  @property({type: Object}) result!: ResultEvent;
  @property({type: Boolean, reflect: true, attribute: 'no-context'}) noContext = false;

  render() {
    const {repo, version, filePath} = splitResultPath(this.result.path);
    const viewHref = `/view/${this.result.path}`;
    const groups = this.splitGroups(this.result.lines);
    const shortVersion = version.length > 6 ? version.slice(0, 6) : version;
    const dir = pathDir(filePath);
    const base = pathBase(filePath);

    // Highlight all lines as a single block (gives hljs cross-line context).
    const allLines = this.result.lines.filter((l): l is ResultLine => l !== null);
    const text = allLines.map(l => l[1]).join('\n');
    const hlLines = highlightSnippet(filePath, text);
    const hlMap = new Map<number, string>();
    if (hlLines) {
      for (let i = 0; i < allLines.length && i < hlLines.length; i++) {
        hlMap.set(allLines[i][0], hlLines[i]);
      }
    }

    return html`
      <div class="file-group">
        <div class="header">
          <span class="header-path">
            <a class="result-path" href=${viewHref}>
              <span class="repo">${repo}:</span><span class="version">${shortVersion}:</span>${dir}/<span class="filename">${base}</span>
            </a>
          </span>
        </div>
        ${groups.map((group) => {
          return html`
            <div class="match">
              <div class="contents">
                ${group.map(line => {
                  const lno = line[0];
                  const text = line[1];
                  const bounds = line.length > 2 ? line[2] : undefined;
                  const isMatch = bounds !== undefined && bounds.length > 0;
                  const href = `${viewHref}#L${lno}`;
                  const hl = hlMap.get(lno);
                  if (!isMatch && hl) {
                    return html`
                      <match-line
                        class="context"
                        .lineNo=${lno}
                        href=${href}
                        text=${text}
                        .highlightedHTML=${hl}
                      ></match-line>
                    `;
                  }
                  const start = isMatch && bounds ? bounds[0][0] : undefined;
                  const end = isMatch && bounds ? bounds[0][1] : undefined;
                  return html`
                    <match-line
                      class=${isMatch ? 'match-hit' : 'context'}
                      .lineNo=${lno}
                      text=${text}
                      href=${href}
                      .start=${start}
                      .end=${end}
                    ></match-line>
                  `;
                })}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  /** Split the flat lines array (with null separators) into groups. */
  private splitGroups(lines: (ResultLine | null)[]): ResultLine[][] {
    const groups: ResultLine[][] = [];
    let current: ResultLine[] = [];
    for (const line of lines) {
      if (line === null) {
        if (current.length > 0) {
          groups.push(current);
          current = [];
        }
      } else {
        current.push(line);
      }
    }
    if (current.length > 0) groups.push(current);
    return groups;
  }

  static styles = [
    resultPathStyles,
    linkStyles,
    css`
      :host {
        display: block;
      }

      .file-group {
        background: var(--color-file-group-background);
        margin-bottom: 15px;
        border: solid 1px var(--color-border-default);
        border-left: solid 3px var(--color-file-group-accent);
      }

      .file-group .header {
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 3px 5px;
      }

      .header-path {
        flex-grow: 1;
      }

      .match {
        display: block;
        background-color: var(--color-background);
      }

      .match + .match {
        margin-top: 5px;
      }

      .match .contents {
        display: grid;
        grid-template-columns: subgrid;
        white-space: pre-wrap;
        font-family: 'Menlo', 'Consolas', 'Monaco', monospace;
        font-size: 12px;
        padding: 10px 5px;
        color: var(--color-foreground);
        margin: 0;
      }

      .match:hover {
        background-color: var(--color-background-subtle);
      }

      /* No-context mode: hide context lines, show only match lines. */
      :host([no-context]) .match .contents > .context {
        display: none;
      }

      :host([no-context]) .match {
        border-top: none;
        margin-top: 0;
      }

      :host([no-context]) .match .contents {
        padding-top: 0;
        padding-bottom: 0;
      }

      :host([no-context]) .match:first-of-type .contents {
        padding-top: 10px;
      }

      :host([no-context]) .match:last-of-type .contents {
        padding-bottom: 10px;
      }
    `,
  ];
}
