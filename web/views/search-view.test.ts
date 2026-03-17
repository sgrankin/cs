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
    t.run("add extension", () => {
        const result = toggleFacet({}, "f.ext", ".go");
        eq([...result["f.ext"]], [".go"]);
    });
    t.run("remove extension", () => {
        const active = {"f.ext": new Set([".go", ".py"])};
        const result = toggleFacet(active, "f.ext", ".go");
        eq([...result["f.ext"]], [".py"]);
    });
    t.run("path replaces", () => {
        const active = {"f.path": new Set(["src/"])};
        const result = toggleFacet(active, "f.path", "src/clj/");
        eq([...result["f.path"]], ["src/clj/"]);
    });
    t.run("path toggle off", () => {
        const active = {"f.path": new Set(["src/"])};
        const result = toggleFacet(active, "f.path", "src/");
        eq([...result["f.path"]], []);
    });
    t.run("preserves other keys", () => {
        const active = {"f.ext": new Set([".go"]), "f.repo": new Set(["org/foo"])};
        const result = toggleFacet(active, "f.ext", ".py");
        eq([...result["f.ext"]].sort(), [".go", ".py"]);
        eq([...result["f.repo"]], ["org/foo"]);
    });
}

export function testParseFacetParams(t: T) {
    t.run("parses all facet keys", () => {
        const params = new URLSearchParams("f.ext=.go&f.ext=.py&f.repo=org/foo&f.path=src/");
        const result = parseFacetParams(params);
        eq([...result["f.ext"]!].sort(), [".go", ".py"]);
        eq([...result["f.repo"]!], ["org/foo"]);
        eq([...result["f.path"]!], ["src/"]);
    });
    t.run("empty params", () => {
        const result = parseFacetParams(new URLSearchParams());
        eq(result, {});
    });
    t.run("ignores non-facet params", () => {
        const result = parseFacetParams(new URLSearchParams("q=hello&context=3"));
        eq(result, {});
    });
}

export function testFacetSetsToParams(t: T) {
    t.run("converts sets to arrays", () => {
        const result = facetSetsToParams({"f.ext": new Set([".go", ".py"]), "f.repo": new Set(["org/foo"])});
        eq(result["f.ext"]!.sort(), [".go", ".py"]);
        eq(result["f.repo"], ["org/foo"]);
    });
    t.run("skips empty sets", () => {
        const result = facetSetsToParams({"f.ext": new Set(), "f.repo": new Set(["org/foo"])});
        eq("f.ext" in result, false);
        eq(result["f.repo"], ["org/foo"]);
    });
    t.run("empty input", () => {
        eq(facetSetsToParams({}), {});
    });
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
