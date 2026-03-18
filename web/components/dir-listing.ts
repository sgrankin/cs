// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/** Renders a directory listing as a simple list of entries. */
@customElement('cs-dir-listing')
export class DirListing extends LitElement {
  /** Entry names. Directories have trailing slashes. */
  @property({type: Array}) entries: string[] = [];
  /** Base path for constructing links (e.g. /view/repo/ver/+/dir/) */
  @property() basePath = '';

  render() {
    // Sort: directories first, then files, alphabetically.
    const sorted = [...this.entries].sort((a, b) => {
      const aDir = a.endsWith('/');
      const bDir = b.endsWith('/');
      if (aDir !== bDir) return aDir ? -1 : 1;
      return a.localeCompare(b);
    });

    return html`
      <div class="listing">
        ${sorted.map(entry => {
          const isDir = entry.endsWith('/');
          const href = this.basePath + entry;
          return html`
            <a class=${isDir ? 'dir' : 'file'} href=${href}>${entry}</a>
          `;
        })}
      </div>
    `;
  }

  static styles = css`
    .listing {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-family: var(--font-mono);
      font-size: 13px;
    }
    a {
      color: var(--color-foreground-accent);
      text-decoration: none;
      padding: 2px 4px;
    }
    a:hover {
      background: var(--color-background-hover);
      text-decoration: underline;
    }
    .dir {
      font-weight: bold;
    }
  `;
}
