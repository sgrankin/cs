// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {splitResultPath, type ResultEvent, type ResultLine} from '../api.ts';
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
 * Uses light DOM matching the old templ structure:
 *   .file-group > .header > .header-path > a.result-path
 *   .match > .contents > <match-line> elements
 */
@customElement('cs-result-group')
export class ResultGroup extends LitElement {
  @property({type: Object}) result!: ResultEvent;

  createRenderRoot() { return this; }

  render() {
    const {repo, version, filePath} = splitResultPath(this.result.path);
    const viewHref = `/view/${this.result.path}`;
    const groups = this.splitGroups(this.result.lines);
    const shortVersion = version.length > 6 ? version.slice(0, 6) : version;
    const dir = pathDir(filePath);
    const base = pathBase(filePath);

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
                  const start = isMatch && bounds ? bounds[0][0] : undefined;
                  const end = isMatch && bounds ? bounds[0][1] : undefined;
                  return html`
                    <match-line
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
}
