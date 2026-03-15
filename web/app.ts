// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// SPA shell: routes to view components based on current URL.

import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher} from '@lit-labs/signals';
import {currentRoute} from './router.ts';

// Import global styles.
import './codesearch.css';

// Import view components.
import './views/search-view.ts';

/**
 * Top-level application shell.
 * Reads the current route signal and renders the appropriate view.
 */
@customElement('cs-app')
export class CsApp extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    const route = currentRoute.get();
    switch (route.name) {
      case 'search':
        return html`<cs-search-view></cs-search-view>`;
      case 'view':
        return html`<div class="placeholder">File view: ${route.path} (Phase 3)</div>`;
      case 'about':
        return html`<div class="placeholder">About (Phase 4)</div>`;
      default:
        return html`<div class="placeholder">Not found</div>`;
    }
  }
}
