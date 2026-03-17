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
    const labels = Array.from(el.renderRoot.querySelectorAll('.section-label')).map(l => l.textContent);
    eq(labels, ["Extension", "Repository"]);
}

export async function testFacetPanelSortsByCount(t: T) {
    const el = await render(html`
        <cs-facet-panel .facets=${sampleFacets}></cs-facet-panel>
    `) as FacetPanel;
    const pills = Array.from(el.renderRoot.querySelectorAll('.section:first-child .pill'));
    // Should be sorted by count descending: .go 12, .py 5, .rs 3.
    const got = pills.map(p => ({
        ext: p.textContent!.trim().split(/\s+/)[0],
        count: p.querySelector('.count')!.textContent,
    }));
    eq(got, [
        {ext: ".go", count: "12"},
        {ext: ".py", count: "5"},
        {ext: ".rs", count: "3"},
    ]);
}

export async function testFacetPanelShowsActivePill(t: T) {
    const selected = {'f.ext': new Set(['.py'])};
    const el = await render(html`
        <cs-facet-panel .facets=${sampleFacets} .selected=${selected}></cs-facet-panel>
    `) as FacetPanel;
    const got = Array.from(el.renderRoot.querySelectorAll('.pill.active'))
        .map(p => p.textContent!.trim().split(/\s+/)[0]);
    eq(got, [".py"]);
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

    eq(detail, {key: "f.ext", value: ".go"});
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

export async function testFacetPanelShowsStalePill(t: T) {
    // Select .rs but provide facets that don't include .rs — it should render as stale.
    const facets: FacetsEvent = {
        type: 'facets',
        ext: [{v: '.go', c: 10}, {v: '.py', c: 5}],
    };
    const selected = {'f.ext': new Set(['.rs'])};
    const el = await render(html`
        <cs-facet-panel .facets=${facets} .selected=${selected}></cs-facet-panel>
    `) as FacetPanel;

    const stalePills = Array.from(el.renderRoot.querySelectorAll('.pill.stale'));
    const got = stalePills.map(p => ({text: p.textContent!.trim(), classes: [...p.classList].sort()}));
    eq(got, [{text: ".rs", classes: ["pill", "stale"]}]);
}
