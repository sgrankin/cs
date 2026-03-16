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
    t.run("first search from empty uses replaceUrl", () => {
        const c = new SearchController();
        const effects = c.commit("hello");
        eq(effectTypes(effects), ["replaceUrl", "search"]);
        eq(urlOf(effects), "/search?q=hello");
        eq(titleOf(effects), "hello · code search");
    });

    t.run("new query after previous search uses pushUrl", () => {
        const c = new SearchController();
        c.commit("hello");
        const effects = c.commit("world");
        eq(effectTypes(effects), ["pushUrl", "search"]);
        eq(urlOf(effects), "/search?q=world");
    });

    t.run("same query repeated uses replaceUrl", () => {
        const c = new SearchController();
        c.commit("hello");
        const effects = c.commit("hello");
        eq(effectTypes(effects), ["replaceUrl", "search"]);
    });

    t.run("empty query clears results", () => {
        const c = new SearchController();
        c.commit("hello");
        const effects = c.commit("");
        eq(effectTypes(effects), ["replaceUrl", "clearResults"]);
        eq(urlOf(effects), "/search");
    });

    t.run("empty query clears facets from URL", () => {
        const c = new SearchController();
        c.commit("hello", {}, {"f.ext": [".go"]});
        const effects = c.commit("", {}, {"f.ext": [".go"]});
        eq(urlOf(effects), "/search");
    });

    t.run("empty query resets state", () => {
        const c = new SearchController();
        c.commit("hello");
        c.commit("");
        // Next search should replaceUrl (no previous to go back to).
        const effects = c.commit("world");
        eq(effectTypes(effects), ["replaceUrl", "search"]);
    });

    t.run("title for empty query", () => {
        const c = new SearchController();
        const effects = c.commit("");
        eq(titleOf(effects), "code search");
    });

    t.run("options and facets are included in URL", () => {
        const c = new SearchController();
        const effects = c.commit("hello", {caseSensitive: true}, {"f.ext": [".go"]});
        eq(urlOf(effects), "/search?q=hello&fold_case=false&f.ext=.go");
    });

    t.run("changing options with same query pushes", () => {
        const c = new SearchController();
        c.commit("hello");
        const effects = c.commit("hello", {caseSensitive: true});
        eq(effectTypes(effects), ["pushUrl", "search"]);
        eq(urlOf(effects), "/search?q=hello&fold_case=false");
    });

    t.run("changing facets with same query pushes", () => {
        const c = new SearchController();
        c.commit("hello");
        const effects = c.commit("hello", {}, {"f.ext": [".go"]});
        eq(effectTypes(effects), ["pushUrl", "search"]);
    });

    t.run("same query and options repeated uses replaceUrl", () => {
        const c = new SearchController();
        c.commit("hello", {caseSensitive: true});
        const effects = c.commit("hello", {caseSensitive: true});
        eq(effectTypes(effects), ["replaceUrl", "search"]);
    });
}

export function testSearchControllerPopstate(t: T) {
    t.run("syncs state so next commit pushes", () => {
        const c = new SearchController();
        c.commit("hello");
        c.popstate("world", new URLSearchParams("q=world"));
        // Now if user types something new, it should push (not replace).
        const effects = c.commit("new");
        eq(effectTypes(effects), ["pushUrl", "search"]);
    });

    t.run("popstate with query triggers search", () => {
        const c = new SearchController();
        const effects = c.popstate("hello", new URLSearchParams("q=hello"));
        eq(effectTypes(effects), ["replaceUrl", "search"]);
    });

    t.run("popstate with empty query clears results", () => {
        const c = new SearchController();
        c.commit("hello");
        const effects = c.popstate("", new URLSearchParams());
        eq(effectTypes(effects), ["replaceUrl", "clearResults"]);
    });

    t.run("popstate then same query uses replaceUrl", () => {
        const c = new SearchController();
        c.popstate("hello", new URLSearchParams("q=hello"));
        const effects = c.commit("hello");
        eq(effectTypes(effects), ["replaceUrl", "search"]);
    });
}
