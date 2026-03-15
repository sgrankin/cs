// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/** Path navigation breadcrumbs for file/directory views. */
@customElement('cs-breadcrumbs')
export class Breadcrumbs extends LitElement {
  /** Full path: repo/version/+/file/path */
  @property() path = '';

  render() {
    const plusIdx = this.path.indexOf('/+/');
    if (plusIdx === -1) return html`<span>${this.path}</span>`;

    const before = this.path.slice(0, plusIdx);
    const filePath = this.path.slice(plusIdx + 3);
    const parts = filePath.split('/').filter(p => p.length > 0);

    return html`
      <nav class="breadcrumbs">
        <a href="/view/${before}/+/">${before}</a>
        ${parts.map((part, i) => {
          const partial = parts.slice(0, i + 1).join('/');
          const href = `/view/${before}/+/${partial}${i < parts.length - 1 ? '/' : ''}`;
          return html`<span class="sep">/</span><a href=${href}>${part}</a>`;
        })}
      </nav>
    `;
  }

  static styles = css`
    .breadcrumbs {
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 13px;
    }
    a {
      color: var(--color-foreground-accent);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .sep {
      color: var(--color-foreground-muted);
      margin: 0 2px;
    }
  `;
}
