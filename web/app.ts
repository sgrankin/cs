// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// SPA shell: routes to view components based on current URL.

import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher} from '@lit-labs/signals';
import {currentRoute} from './router.ts';

// Import global styles.
import './codesearch.css';

// Import view components.
import './views/search-view.ts';
import './views/file-view.ts';

// Re-export to prevent esbuild tree-shaking (side-effect: registers custom element).
export {RepoSelect} from './repo-select.ts';

/**
 * Top-level application shell.
 * Reads the current route signal and renders the appropriate view.
 * Uses light DOM so global CSS applies.
 */
@customElement('cs-app')
export class CsApp extends SignalWatcher(LitElement) {
  createRenderRoot() { return this; }

  render() {
    const route = currentRoute.get();
    switch (route.name) {
      case 'search':
        return html`<cs-search-view></cs-search-view>`;
      case 'view':
        return html`<cs-file-view .path=${route.path ?? ''}></cs-file-view>`;
      case 'about':
        return html`<div class="placeholder">About</div>`;
      default:
        return html`<div class="placeholder">Not found</div>`;
    }
  }
}
