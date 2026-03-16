// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import type {FacetBucket, FacetsEvent} from '../api.ts';

/**
 * Displays facet buckets as pill buttons, grouped by dimension.
 *
 * Each dimension (Extension, Repository, Path) is a flex-nowrap group.
 * The groups themselves flex-wrap, so an entire dimension moves to the
 * next line rather than individual pills wrapping mid-group.
 *
 * Clicking a pill toggles it; fires `facet-toggle` with {key, value}.
 * Buckets are sorted by count descending.
 */
@customElement('cs-facet-panel')
export class FacetPanel extends LitElement {
  @property({type: Object}) facets: FacetsEvent | null = null;
  /** Currently active facet values, keyed by param name (e.g. 'f.ext'). */
  @property({type: Object}) selected: Record<string, Set<string>> = {};

  render() {
    if (!this.facets) return nothing;
    const sections = [
      {label: 'Extension', key: 'f.ext', buckets: this.facets.ext},
      {label: 'Repository', key: 'f.repo', buckets: this.facets.repo},
      {label: 'Path', key: 'f.path', buckets: this.facets.path},
    ].filter(s => s.buckets && s.buckets.length > 0);

    if (sections.length === 0) return nothing;

    return html`
      <div class="panel">
        ${sections.map(s => this.renderSection(s.label, s.key, s.buckets!))}
      </div>
    `;
  }

  private renderSection(label: string, key: string, buckets: FacetBucket[]) {
    const active = this.selected[key] ?? new Set();
    // Sort by count descending, then alphabetically for ties.
    const sorted = [...buckets].sort((a, b) => b.c - a.c || a.v.localeCompare(b.v));
    return html`
      <div class="section">
        <span class="section-label">${label}</span>
        ${sorted.slice(0, 10).map(b => html`
          <button
            class=${active.has(b.v) ? 'pill active' : 'pill'}
            @click=${() => this.toggle(key, b.v)}
          >${b.v} <span class="count">${b.c}</span></button>
        `)}
      </div>
    `;
  }

  private toggle(key: string, value: string) {
    this.dispatchEvent(new CustomEvent('facet-toggle', {
      detail: {key, value},
      bubbles: true,
      composed: true,
    }));
  }

  static styles = css`
    :host {
      display: block;
    }

    .panel {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 16px;
      padding: 4px 0;
    }

    /* Each section is a nowrap group — wraps as a unit, not per-pill. */
    .section {
      display: flex;
      flex-wrap: nowrap;
      gap: 4px;
      align-items: center;
    }

    .section-label {
      font-size: 11px;
      color: var(--color-foreground-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    .pill {
      font-size: 12px;
      padding: 1px 8px;
      border: 1px solid var(--color-border-default);
      border-radius: 12px;
      background: var(--color-background);
      color: var(--color-foreground);
      cursor: pointer;
      white-space: nowrap;
      line-height: 1.5;
    }

    .pill:hover {
      background: var(--color-background-hover);
    }

    .pill.active {
      background: var(--color-foreground-accent);
      color: var(--color-background);
      border-color: var(--color-foreground-accent);
    }

    .count {
      color: var(--color-foreground-muted);
      font-size: 10px;
    }

    .pill.active .count {
      color: inherit;
    }
  `;
}
