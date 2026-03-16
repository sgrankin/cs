// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// SPA shell: routes to view components based on current URL.

import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher} from '@lit-labs/signals';
import {currentRoute} from './router.ts';
import {linkStyles} from './shared-styles.ts';

// Import global styles.
import './codesearch.css';

// Import view components.
import './views/search-view.ts';
import './views/file-view.ts';
import './views/about-view.ts';


/**
 * Top-level application shell.
 * Reads the current route signal and renders the appropriate view.
 */
@customElement('cs-app')
export class CsApp extends SignalWatcher(LitElement) {
  render() {
    const route = currentRoute.get();
    return html`
      <main>${this.renderView(route)}</main>
      <footer>
        <ul>
          <li><a href="/">search</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="https://github.com/sgrankin/cs">source</a></li>
        </ul>
      </footer>
    `;
  }

  private renderView(route: import('./router.ts').Route) {
    switch (route.name) {
      case 'search':
        return html`<cs-search-view></cs-search-view>`;
      case 'view':
        return html`<cs-file-view .path=${route.path ?? ''}></cs-file-view>`;
      case 'about':
        return html`<cs-about-view></cs-about-view>`;
      default:
        return html`<div class="placeholder">Not found</div>`;
    }
  }

  static styles = [
    linkStyles,
    css`
      :host {
        display: block;
      }

      footer {
        font-size: 12px;
        color: var(--color-foreground-subtle);
        margin: 1em auto;
        width: 40em;
        text-align: center;
      }

      footer ul {
        padding: 0;
      }

      footer li {
        display: inline;
      }

      footer li::before {
        content: "\\2219";
        color: var(--color-foreground-subtle);
        text-decoration: none;
        margin: 5px;
      }

      footer li:first-child::before {
        content: "";
      }
    `,
  ];
}
