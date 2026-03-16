// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./facet-panel.ts";
import type {FacetPanel} from "./facet-panel.ts";
import type {FacetsEvent} from "../api.ts";

const sampleFacets: FacetsEvent = {
    type: 'facets',
    ext: [
        {v: '.go', c: 12},
        {v: '.py', c: 5},
        {v: '.rs', c: 3},
    ],
    repo: [
        {v: 'github.com/torvalds/linux', c: 100},
        {v: 'github.com/clojure/clojure', c: 8},
    ],
};

export async function testFacetPanelRendersEmpty(t: T) {
    const el = await render(html`<cs-facet-panel></cs-facet-panel>`) as FacetPanel;
    // No facets → nothing rendered
    const panel = el.renderRoot.querySelector('.panel');
    eq(panel, null, "no panel when no facets");
}

export async function testFacetPanelRendersSections(t: T) {
    const el = await render(html`
        <cs-facet-panel .facets=${sampleFacets}></cs-facet-panel>
    `) as FacetPanel;
    const sections = el.renderRoot.querySelectorAll('.section');
    eq(sections.length, 2, "should have Extension and Repository sections");
    const labels = Array.from(el.renderRoot.querySelectorAll('.section-label')).map(l => l.textContent);
    eq(labels[0], "Extension", "first section label");
    eq(labels[1], "Repository", "second section label");
}

export async function testFacetPanelSortsByCount(t: T) {
    const el = await render(html`
        <cs-facet-panel .facets=${sampleFacets}></cs-facet-panel>
    `) as FacetPanel;
    const pills = Array.from(el.renderRoot.querySelectorAll('.section:first-child .pill'));
    // Should be sorted: .go 12, .py 5, .rs 3
    eq(pills[0].textContent?.trim().startsWith('.go'), true, "first pill is .go (highest count)");
    eq(pills[2].textContent?.trim().startsWith('.rs'), true, "last pill is .rs (lowest count)");
}

export async function testFacetPanelShowsActivePill(t: T) {
    const selected = {'f.ext': new Set(['.py'])};
    const el = await render(html`
        <cs-facet-panel .facets=${sampleFacets} .selected=${selected}></cs-facet-panel>
    `) as FacetPanel;
    const activePills = el.renderRoot.querySelectorAll('.pill.active');
    eq(activePills.length, 1, "one active pill");
    eq(activePills[0].textContent?.trim().startsWith('.py'), true, ".py is active");
}

export async function testFacetPanelFiresToggle(t: T) {
    const el = await render(html`
        <cs-facet-panel .facets=${sampleFacets}></cs-facet-panel>
    `) as FacetPanel;

    let detail: any = null;
    el.addEventListener('facet-toggle', ((e: CustomEvent) => {
        detail = e.detail;
    }) as EventListener);

    const firstPill = el.renderRoot.querySelector('.pill') as HTMLButtonElement;
    firstPill.click();

    eq(detail !== null, true, "facet-toggle event fired");
    eq(detail.key, "f.ext", "key is f.ext");
    eq(detail.value, ".go", "value is .go (first by count)");
}

export async function testFacetPanelLimitsTo10(t: T) {
    const manyExt: FacetsEvent = {
        type: 'facets',
        ext: Array.from({length: 15}, (_, i) => ({v: `.ext${i}`, c: 15 - i})),
    };
    const el = await render(html`
        <cs-facet-panel .facets=${manyExt}></cs-facet-panel>
    `) as FacetPanel;
    const pills = el.renderRoot.querySelectorAll('.pill');
    eq(pills.length, 10, "limited to 10 pills per section");
}
