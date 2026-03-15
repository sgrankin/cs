// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import '../components/breadcrumbs.ts';
import '../components/dir-listing.ts';
import '../components/code-viewer.ts';

/**
 * File view: fetches from /raw/ and renders file content or directory listing.
 */
@customElement('cs-file-view')
export class FileView extends LitElement {
  /** Path from the route: repo/version/+/filepath */
  @property() path = '';

  @state() private content: string | null = null;
  @state() private dirEntries: string[] | null = null;
  @state() private loading = true;
  @state() private error: string | null = null;

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('path')) {
      this.fetchContent();
    }
  }

  private async fetchContent() {
    this.loading = true;
    this.error = null;
    this.content = null;
    this.dirEntries = null;

    const isDir = this.path.endsWith('/') || this.path.endsWith('/+/') || !this.path.includes('/+/');
    const rawPath = `/raw/${this.path}${isDir && !this.path.endsWith('/') ? '/' : ''}`;

    try {
      const resp = await fetch(rawPath);
      if (!resp.ok) {
        this.error = `Not found (${resp.status})`;
        this.loading = false;
        return;
      }
      const ct = resp.headers.get('Content-Type') ?? '';
      if (ct.includes('application/json')) {
        this.dirEntries = await resp.json();
      } else {
        this.content = await resp.text();
      }
    } catch (e) {
      this.error = e instanceof Error ? e.message : String(e);
    }
    this.loading = false;
  }

  render() {
    return html`
      <div class="file-view">
        <cs-breadcrumbs .path=${this.path}></cs-breadcrumbs>

        ${this.loading ? html`<div class="status">Loading...</div>` : ''}
        ${this.error ? html`<div class="status error">${this.error}</div>` : ''}

        ${this.dirEntries ? html`
          <cs-dir-listing
            .entries=${this.dirEntries}
            basePath="/view/${this.path}${this.path.endsWith('/') ? '' : '/'}"
          ></cs-dir-listing>
        ` : ''}

        ${this.content !== null ? html`
          <cs-code-viewer .content=${this.content}></cs-code-viewer>
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    .file-view {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px;
    }
    cs-breadcrumbs {
      display: block;
      margin-bottom: 12px;
    }
    .status {
      color: var(--color-foreground-muted);
      font-size: 13px;
      padding: 8px 0;
    }
    .error {
      color: var(--color-foreground-error);
    }
  `;
}
