// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {SearchController, type SearchEffect} from "./search-controller.ts";

function effectTypes(effects: SearchEffect[]): string[] {
    return effects.map(e => e.type);
}

function urlOf(effects: SearchEffect[]): string | undefined {
    for (const e of effects) {
        if (e.type === 'pushUrl' || e.type === 'replaceUrl') return e.url;
    }
    return undefined;
}

function titleOf(effects: SearchEffect[]): string | undefined {
    for (const e of effects) {
        if (e.type === 'pushUrl' || e.type === 'replaceUrl') return e.title;
    }
    return undefined;
}

export function testSearchControllerCommit(t: T) {
    const cases: {name: string; setup: (c: SearchController) => void; query: string; opts: Record<string, any>; facets: Record<string, string[]>; wantTypes?: string[]; wantUrl?: string; wantTitle?: string}[] = [
        {name: "first search from empty uses replaceUrl",
            setup: (_c: SearchController) => {},
            query: "hello", opts: {}, facets: {},
            wantTypes: ["replaceUrl", "search"], wantUrl: "/search?q=hello", wantTitle: "hello · code search"},
        {name: "new query after previous search uses pushUrl",
            setup: (c: SearchController) => { c.commit("hello"); },
            query: "world", opts: {}, facets: {},
            wantTypes: ["pushUrl", "search"], wantUrl: "/search?q=world"},
        {name: "same query repeated uses replaceUrl",
            setup: (c: SearchController) => { c.commit("hello"); },
            query: "hello", opts: {}, facets: {},
            wantTypes: ["replaceUrl", "search"]},
        {name: "empty query clears results",
            setup: (c: SearchController) => { c.commit("hello"); },
            query: "", opts: {}, facets: {},
            wantTypes: ["replaceUrl", "clearResults"], wantUrl: "/search"},
        {name: "empty query clears facets from URL",
            setup: (c: SearchController) => { c.commit("hello", {}, {"f.ext": [".go"]}); },
            query: "", opts: {}, facets: {"f.ext": [".go"]},
            wantUrl: "/search"},
        {name: "empty query resets state",
            setup: (c: SearchController) => { c.commit("hello"); c.commit(""); },
            // Next search should replaceUrl (no previous to go back to).
            query: "world", opts: {}, facets: {},
            wantTypes: ["replaceUrl", "search"]},
        {name: "title for empty query",
            setup: (_c: SearchController) => {},
            query: "", opts: {}, facets: {},
            wantTitle: "code search"},
        {name: "options and facets are included in URL",
            setup: (_c: SearchController) => {},
            query: "hello", opts: {caseSensitive: true}, facets: {"f.ext": [".go"]},
            wantUrl: "/search?q=hello&fold_case=false&f.ext=.go"},
        {name: "changing options with same query pushes",
            setup: (c: SearchController) => { c.commit("hello"); },
            query: "hello", opts: {caseSensitive: true}, facets: {},
            wantTypes: ["pushUrl", "search"], wantUrl: "/search?q=hello&fold_case=false"},
        {name: "changing facets with same query pushes",
            setup: (c: SearchController) => { c.commit("hello"); },
            query: "hello", opts: {}, facets: {"f.ext": [".go"]},
            wantTypes: ["pushUrl", "search"]},
        {name: "same query and options repeated uses replaceUrl",
            setup: (c: SearchController) => { c.commit("hello", {caseSensitive: true}); },
            query: "hello", opts: {caseSensitive: true}, facets: {},
            wantTypes: ["replaceUrl", "search"]},
    ];
    for (const tc of cases) {
        t.run(tc.name, () => {
            const c = new SearchController();
            tc.setup(c);
            const effects = c.commit(tc.query, tc.opts, tc.facets);
            if (tc.wantTypes) eq(effectTypes(effects), tc.wantTypes);
            if (tc.wantUrl) eq(urlOf(effects), tc.wantUrl);
            if (tc.wantTitle) eq(titleOf(effects), tc.wantTitle);
        });
    }
}

export function testSearchControllerPopstate(t: T) {
    const cases = [
        {name: "syncs state so next commit pushes",
            setup: (c: SearchController) => {
                c.commit("hello");
                c.popstate("world", new URLSearchParams("q=world"));
            },
            // Now if user types something new, it should push (not replace).
            action: (c: SearchController) => c.commit("new"),
            wantTypes: ["pushUrl", "search"]},
        {name: "popstate with query triggers search",
            setup: (_c: SearchController) => {},
            action: (c: SearchController) => c.popstate("hello", new URLSearchParams("q=hello")),
            wantTypes: ["replaceUrl", "search"]},
        {name: "popstate with empty query clears results",
            setup: (c: SearchController) => { c.commit("hello"); },
            action: (c: SearchController) => c.popstate("", new URLSearchParams()),
            wantTypes: ["replaceUrl", "clearResults"]},
        {name: "popstate then same query uses replaceUrl",
            setup: (c: SearchController) => { c.popstate("hello", new URLSearchParams("q=hello")); },
            action: (c: SearchController) => c.commit("hello"),
            wantTypes: ["replaceUrl", "search"]},
    ];
    for (const tc of cases) {
        t.run(tc.name, () => {
            const c = new SearchController();
            tc.setup(c);
            const effects = tc.action(c);
            eq(effectTypes(effects), tc.wantTypes);
        });
    }
}
