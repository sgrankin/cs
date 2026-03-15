// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {FacetBucket, FacetsEvent} from '../api.ts';

/**
 * Displays facet buckets (extension, repo, path) with clickable filters.
 *
 * Clicking a facet value fires `facet-select` with the dimension and value.
 * Multiple values within a dimension OR together; dimensions AND together.
 */
@customElement('cs-facet-panel')
export class FacetPanel extends LitElement {
  @property({type: Object}) facets: FacetsEvent | null = null;
  /** Currently selected facet values, keyed by param name (e.g. 'f.ext'). */
  @property({type: Object}) selected: Record<string, string[]> = {};

  render() {
    if (!this.facets) return '';
    const sections = [
      {label: 'Extension', key: 'f.ext', buckets: this.facets.ext},
      {label: 'Repository', key: 'f.repo', buckets: this.facets.repo},
      {label: 'Path', key: 'f.path', buckets: this.facets.path},
    ].filter(s => s.buckets && s.buckets.length > 0);

    if (sections.length === 0) return '';

    return html`
      <div class="facet-panel">
        ${sections.map(s => this.renderSection(s.label, s.key, s.buckets!))}
      </div>
    `;
  }

  private renderSection(label: string, key: string, buckets: FacetBucket[]) {
    const selectedSet = new Set(this.selected[key] ?? []);
    return html`
      <div class="section">
        <div class="section-label">${label}</div>
        ${buckets.slice(0, 10).map(b => html`
          <button
            class=${selectedSet.has(b.v) ? 'active' : ''}
            @click=${() => this.onSelect(key, b.v)}
          >${b.v} <span class="count">${b.c}</span></button>
        `)}
      </div>
    `;
  }

  private onSelect(key: string, value: string) {
    this.dispatchEvent(new CustomEvent('facet-select', {
      detail: {key, value},
      bubbles: true,
      composed: true,
    }));
  }

  static styles = css`
    .facet-panel {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      padding: 4px 0;
    }
    .section {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      align-items: center;
    }
    .section-label {
      font-size: 11px;
      color: var(--color-foreground-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    button {
      font-size: 12px;
      padding: 2px 8px;
      border: 1px solid var(--color-border-default);
      border-radius: 12px;
      background: var(--color-background);
      color: var(--color-foreground);
      cursor: pointer;
    }
    button:hover {
      background: var(--color-background-hover);
    }
    button.active {
      background: var(--color-foreground-accent);
      color: var(--color-background);
      border-color: var(--color-foreground-accent);
    }
    .count {
      color: var(--color-foreground-muted);
      font-size: 10px;
    }
    button.active .count {
      color: inherit;
    }
  `;
}
