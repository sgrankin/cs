// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {splitResultPath, type ResultEvent, type ResultLine} from '../api.ts';
import './match-range.ts';

/**
 * Renders one file's search results: header (file path) + contiguous line groups.
 * Groups are separated by a thin divider.
 */
@customElement('cs-result-group')
export class ResultGroup extends LitElement {
  @property({type: Object}) result!: ResultEvent;

  render() {
    const {repo, version, filePath} = splitResultPath(this.result.path);
    const viewHref = `/view/${this.result.path}`;
    const groups = this.splitGroups(this.result.lines);

    return html`
      <div class="result-group">
        <div class="header">
          <a class="path" href=${viewHref}>
            <span class="repo">${repo}:</span><span class="version">${version}:</span>${filePath}
          </a>
        </div>
        ${groups.map((group, i) => html`
          ${i > 0 ? html`<div class="separator"></div>` : ''}
          <cs-match-range .lines=${group} baseHref=${viewHref}></cs-match-range>
        `)}
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

  static styles = css`
    .result-group {
      border: 1px solid var(--color-border-default);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .header {
      padding: 4px 8px;
      background: var(--color-background-subtle);
      border-bottom: 1px solid var(--color-border-default);
    }
    .path {
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      text-decoration: none;
      color: var(--color-foreground-accent);
    }
    .path:hover {
      text-decoration: underline;
    }
    .repo, .version {
      color: var(--color-foreground-muted);
    }
    .separator {
      border-top: 1px dashed var(--color-border-default);
      margin: 0 8px;
    }
  `;
}
