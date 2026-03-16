// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import '../components/breadcrumbs.ts';
import '../components/dir-listing.ts';
import '../components/code-viewer.ts';

/**
 * Parse the view path (repo@version/+/filepath) into its components.
 * Returns {repo, version, filePath} or null if the path can't be parsed.
 */
function parsePath(path: string): {repo: string; version: string; filePath: string} | null {
  const plusIdx = path.indexOf('/+/');
  if (plusIdx === -1) return null;
  const before = path.slice(0, plusIdx);
  const filePath = path.slice(plusIdx + 3);
  const atIdx = before.lastIndexOf('@');
  if (atIdx === -1) return null;
  return {
    repo: before.slice(0, atIdx),
    version: before.slice(atIdx + 1),
    filePath,
  };
}

/**
 * Construct an external URL template for viewing a file at its source.
 * Currently supports GitHub repos (repo starts with "github.com/").
 * Returns empty string for unsupported hosts.
 */
function externalUrlTemplate(repo: string, version: string, filePath: string): string {
  const ghPrefix = 'github.com/';
  if (repo.startsWith(ghPrefix)) {
    const ghPath = repo.slice(ghPrefix.length);
    return `https://github.com/${ghPath}/blob/${version}/${filePath}#L{lno}`;
  }
  return '';
}

/**
 * File view: fetches from /raw/ and renders file content or directory listing.
 */
@customElement('cs-file-view')
export class FileView extends LitElement {
  /** Path from the route: repo@version/+/filepath */
  @property() path = '';

  @state() private content: string | null = null;
  @state() private dirEntries: string[] | null = null;
  @state() private readmeContent: string | null = null;
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
    this.readmeContent = null;

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
        // Look for a README in the directory entries.
        this.fetchReadme(rawPath);
      } else {
        this.content = await resp.text();
      }
    } catch (e) {
      this.error = e instanceof Error ? e.message : String(e);
    }
    this.loading = false;
  }

  private static readonly README_RE = /^readme\.(md|markdown|mdown|mkdn|txt|rst|org|adoc|asc)$/i;

  private async fetchReadme(dirRawPath: string) {
    if (!this.dirEntries) return;
    const readme = this.dirEntries.find(e => FileView.README_RE.test(e));
    if (!readme) return;
    try {
      const basePath = dirRawPath.endsWith('/') ? dirRawPath : dirRawPath + '/';
      const resp = await fetch(basePath + readme);
      if (resp.ok) {
        this.readmeContent = await resp.text();
      }
    } catch {
      // Ignore — README is optional.
    }
  }

  render() {
    const parsed = parsePath(this.path);
    const repo = parsed?.repo ?? '';
    const version = parsed?.version ?? '';
    const extUrl = parsed ? externalUrlTemplate(parsed.repo, parsed.version, parsed.filePath) : '';

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
          ${this.readmeContent ? html`
            <div class="readme">
              <pre>${this.readmeContent}</pre>
            </div>
          ` : ''}
        ` : ''}

        ${this.content !== null ? html`
          <cs-code-viewer
            .content=${this.content}
            .repo=${repo}
            .version=${version}
            .externalUrl=${extUrl}
          ></cs-code-viewer>
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
    .readme {
      margin-top: 16px;
      padding: 12px;
      border-top: 1px solid var(--color-border-default);
    }
    .readme pre {
      white-space: pre-wrap;
      font-family: 'Menlo', 'Consolas', monospace;
      font-size: 12px;
      line-height: 1.5;
      margin: 0;
    }
  `;
}
