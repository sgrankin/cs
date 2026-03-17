// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import {toggleFacet, parseFacetParams, facetSetsToParams} from "./search-view.ts";
import "./search-view.ts";
import type {SearchView} from "./search-view.ts";
import {currentRoute} from "../router.ts";
import {
    searchResults, fileResults, facets, searchDone, searchLoading, searchError,
    immediateSearch,
} from "../state.ts";
import type {ResultEvent, DoneEvent, FacetsEvent} from "../api.ts";

export function testToggleFacet(t: T) {
    const cases: {name: string; active: Record<string, Set<string>>; key: string; value: string; want: Record<string, string[]>}[] = [
        {name: "add extension", active: {}, key: "f.ext", value: ".go",
            want: {"f.ext": [".go"]}},
        {name: "remove extension", active: {"f.ext": new Set([".go", ".py"])}, key: "f.ext", value: ".go",
            want: {"f.ext": [".py"]}},
        {name: "path replaces", active: {"f.path": new Set(["src/"])}, key: "f.path", value: "src/clj/",
            want: {"f.path": ["src/clj/"]}},
        {name: "path toggle off", active: {"f.path": new Set(["src/"])}, key: "f.path", value: "src/",
            want: {"f.path": []}},
        {name: "preserves other keys", active: {"f.ext": new Set([".go"]), "f.repo": new Set(["org/foo"])}, key: "f.ext", value: ".py",
            want: {"f.ext": [".go", ".py"], "f.repo": ["org/foo"]}},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            const result = toggleFacet(c.active, c.key, c.value);
            for (const [key, wantArr] of Object.entries(c.want)) {
                eq([...result[key]].sort(), wantArr.sort());
            }
        });
    }
}

export function testParseFacetParams(t: T) {
    const cases = [
        {name: "parses all facet keys", input: "f.ext=.go&f.ext=.py&f.repo=org/foo&f.path=src/",
            want: {"f.ext": [".go", ".py"], "f.repo": ["org/foo"], "f.path": ["src/"]}},
        {name: "empty params", input: "", want: {}},
        {name: "ignores non-facet params", input: "q=hello&context=3", want: {}},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            const result = parseFacetParams(new URLSearchParams(c.input));
            const got: Record<string, string[]> = {};
            for (const [key, set] of Object.entries(result)) {
                got[key] = [...set!].sort();
            }
            const want: Record<string, string[]> = {};
            for (const [key, arr] of Object.entries(c.want)) {
                want[key] = [...arr].sort();
            }
            eq(got, want);
        });
    }
}

export function testFacetSetsToParams(t: T) {
    const cases = [
        {name: "converts sets to arrays",
            input: {"f.ext": new Set([".go", ".py"]), "f.repo": new Set(["org/foo"])},
            want: {"f.ext": [".go", ".py"], "f.repo": ["org/foo"]}},
        {name: "skips empty sets",
            input: {"f.ext": new Set<string>(), "f.repo": new Set(["org/foo"])},
            want: {"f.repo": ["org/foo"]}},
        {name: "empty input",
            input: {} as Record<string, Set<string>>,
            want: {} as Record<string, string[]>},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            const result = facetSetsToParams(c.input);
            // Sort arrays for comparison stability.
            const got: Record<string, string[]> = {};
            for (const [k, v] of Object.entries(result)) {
                got[k] = [...v].sort();
            }
            const want: Record<string, string[]> = {};
            for (const [k, v] of Object.entries(c.want)) {
                want[k] = [...v].sort();
            }
            eq(got, want);
        });
    }
}

// Helper to wait for Lit render cycles.
async function settled(el: SearchView): Promise<void> {
    await new Promise(r => setTimeout(r, 0));
    await (el as any).updateComplete;
    await new Promise(r => setTimeout(r, 0));
    await (el as any).updateComplete;
}

export async function testSearchViewRendersHelp(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        // Stub fetch to prevent any actual search calls.
        globalThis.fetch = (async () => new Response("", {status: 200})) as any;

        // Set route with no query so help is shown.
        currentRoute.set({name: 'search', params: new URLSearchParams()});
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);

        const el = await render(html`<cs-search-view></cs-search-view>`) as SearchView;
        await settled(el);

        // With no query and no results, help should be shown.
        const help = el.renderRoot.querySelector('cs-search-help');
        eq(help !== null, true, "search help shown");

        // Should not show result area.
        const resultArea = el.renderRoot.querySelector('#resultarea');
        eq(resultArea, null, "no result area");
    } finally {
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testSearchViewRendersResults(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        globalThis.fetch = (async () => new Response("", {status: 200})) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams("q=hello")});

        // Set signal state as if a search has completed.
        const testResult: ResultEvent = {
            type: 'result',
            path: 'repo/v/+/file.go',
            lines: [[1, "hello world", [[0, 5]]]],
        };
        const testDone: DoneEvent = {
            type: 'done',
            time_ms: 10,
            total: 1,
            truncated: false,
        };

        searchResults.set([testResult]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(testDone);
        searchLoading.set(false);
        searchError.set(null);

        const el = await render(html`<cs-search-view></cs-search-view>`) as SearchView;
        await settled(el);

        // Should show result area.
        const resultArea = el.renderRoot.querySelector('#resultarea');
        eq(resultArea !== null, true, "result area shown");

        // Should show result stats.
        const stats = el.renderRoot.querySelector('cs-result-stats');
        eq(stats !== null, true, "result stats shown");

        // Should not show help.
        const help = el.renderRoot.querySelector('cs-search-help');
        eq(help, null, "no help when results shown");
    } finally {
        // Reset signals.
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testSearchViewRendersLoading(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        globalThis.fetch = (async () => new Response("", {status: 200})) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams("q=hello")});
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(true);
        searchError.set(null);

        const el = await render(html`<cs-search-view></cs-search-view>`) as SearchView;
        await settled(el);

        // Loading state shows result area (hasResults = done || loading).
        const resultArea = el.renderRoot.querySelector('#resultarea');
        eq(resultArea !== null, true, "result area shown during loading");

        const stats = el.renderRoot.querySelector('cs-result-stats');
        eq(stats !== null, true, "stats shown during loading");
    } finally {
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testSearchViewRendersFileMatches(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        globalThis.fetch = (async () => new Response("", {status: 200})) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams("q=file")});
        searchResults.set([]);
        fileResults.set([{type: 'file', path: 'repo/v/+/file.go', match: [0, 4]}]);
        facets.set(null);
        searchDone.set({type: 'done', time_ms: 5, total: 1, truncated: false});
        searchLoading.set(false);
        searchError.set(null);

        const el = await render(html`<cs-search-view></cs-search-view>`) as SearchView;
        await settled(el);

        const fileMatch = el.renderRoot.querySelector('filename-match');
        eq(fileMatch !== null, true, "filename match rendered");
    } finally {
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testSearchViewFacetToggle(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        globalThis.fetch = (async () => new Response('{"type":"done","time_ms":1,"total":0,"truncated":false}\n')) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams("q=hello")});
        searchResults.set([]);
        fileResults.set([]);
        const testFacets: FacetsEvent = {type: 'facets', ext: [{v: '.go', c: 10}, {v: '.py', c: 5}]};
        facets.set(testFacets);
        searchDone.set({type: 'done', time_ms: 5, total: 15, truncated: false});
        searchLoading.set(false);
        searchError.set(null);

        const el = await render(html`<cs-search-view></cs-search-view>`) as SearchView;
        await settled(el);

        // Dispatch facet-toggle event.
        const facetPanel = el.renderRoot.querySelector('cs-facet-panel');
        eq(facetPanel !== null, true, "facet panel exists");
        facetPanel!.dispatchEvent(new CustomEvent('facet-toggle', {
            detail: {key: 'f.ext', value: '.go'},
            bubbles: true,
            composed: true,
        }));

        // Wait for effects.
        await new Promise(r => setTimeout(r, 50));

        // The route should now include the facet param.
        eq(currentRoute.get().params.getAll('f.ext').includes('.go'), true, "facet applied to URL");
    } finally {
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testSearchViewSearchInput(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        globalThis.fetch = (async () => new Response('{"type":"done","time_ms":1,"total":0,"truncated":false}\n')) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams()});
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);

        const el = await render(html`<cs-search-view></cs-search-view>`) as SearchView;
        await settled(el);

        const input = el.renderRoot.querySelector('cs-search-input');
        eq(input !== null, true, "search input exists");

        // Dispatch search-submit event (like pressing Enter).
        input!.dispatchEvent(new CustomEvent('search-submit', {
            detail: {value: 'test query'},
            bubbles: true,
            composed: true,
        }));

        await new Promise(r => setTimeout(r, 50));

        // Route should have the query.
        eq(currentRoute.get().params.get('q'), "test query");
    } finally {
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testSearchViewOptionsChange(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        globalThis.fetch = (async () => new Response('{"type":"done","time_ms":1,"total":0,"truncated":false}\n')) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams("q=hello")});
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set({type: 'done', time_ms: 1, total: 0, truncated: false});
        searchLoading.set(false);
        searchError.set(null);

        const el = await render(html`<cs-search-view></cs-search-view>`) as SearchView;
        await settled(el);

        const options = el.renderRoot.querySelector('cs-search-options');
        eq(options !== null, true, "search options exists");

        // Dispatch options change.
        options!.dispatchEvent(new CustomEvent('options-change', {
            detail: {literal: true},
            bubbles: true,
            composed: true,
        }));

        await new Promise(r => setTimeout(r, 50));

        // Route should include literal param.
        eq(currentRoute.get().params.get('literal'), "true");
    } finally {
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testSearchViewSearchInputDebounce(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        globalThis.fetch = (async () => new Response('{"type":"done","time_ms":1,"total":0,"truncated":false}\n')) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams()});
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);

        const el = await render(html`<cs-search-view></cs-search-view>`) as SearchView;
        await settled(el);

        const input = el.renderRoot.querySelector('cs-search-input');

        // Dispatch search-input event (debounced).
        input!.dispatchEvent(new CustomEvent('search-input', {
            detail: {value: 'debounced query'},
            bubbles: true,
            composed: true,
        }));

        // Wait for debounce to fire.
        await new Promise(r => setTimeout(r, 300));

        // Route should eventually have the query.
        eq(currentRoute.get().params.get('q'), "debounced query");
    } finally {
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}
