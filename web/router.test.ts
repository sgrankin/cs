// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {matchRoute, currentRoute, navigate, updateSearchParams} from "./router.ts";

export function testMatchRoute(t: T) {
    const cases: {path: string; search?: string; name: string; routePath?: string}[] = [
        {path: "/", name: "search"},
        {path: "/search", name: "search"},
        {path: "/search", search: "q=hello", name: "search"},
        {path: "/view/repo/ver/+/file.go", name: "view", routePath: "repo/ver/+/file.go"},
        {path: "/view/repo/ver/+/dir/", name: "view", routePath: "repo/ver/+/dir/"},
        {path: "/about", name: "about"},
        {path: "/nonexistent", name: "not-found"},
        {path: "/search/extra", name: "not-found"},
    ];
    for (const c of cases) {
        t.run(c.path, () => {
            const route = matchRoute(c.path, c.search);
            eq(route.name, c.name, "name");
            if (c.routePath !== undefined) {
                eq(route.path, c.routePath, "path");
            }
            if (c.search) {
                eq(route.params.get("q"), "hello", "params");
            }
        });
    }
}

export function testNavigateReplace(t: T) {
    const prev = currentRoute.get();
    const origPathname = window.location.pathname;
    const origSearch = window.location.search;
    try {
        navigate("/search?q=replace-test", true);
        eq(currentRoute.get().name, "search");
        eq(currentRoute.get().params.get("q"), "replace-test");
    } finally {
        history.replaceState(null, '', origPathname + origSearch);
        currentRoute.set(prev);
    }
}

export function testUpdateSearchParams(t: T) {
    const prev = currentRoute.get();
    const origPathname = window.location.pathname;
    const origSearch = window.location.search;
    try {
        updateSearchParams(new URLSearchParams("q=params-test"), true);
        eq(currentRoute.get().params.get("q"), "params-test");
    } finally {
        history.replaceState(null, '', origPathname + origSearch);
        currentRoute.set(prev);
    }
}

export async function testPopstateUpdatesRoute(t: T) {
    const prev = currentRoute.get();
    const origPathname = window.location.pathname;
    const origSearch = window.location.search;
    try {
        // Navigate to a known state so we have a history entry.
        navigate("/search?q=poptest");
        eq(currentRoute.get().name, "search");
        eq(currentRoute.get().params.get("q"), "poptest");

        // Navigate to another state.
        navigate("/about");
        eq(currentRoute.get().name, "about");

        // Simulate browser back by going back and dispatching popstate.
        history.back();
        // history.back() is async; wait a tick, then fire popstate.
        await new Promise(r => setTimeout(r, 50));

        // The popstate listener in router.ts should have updated currentRoute.
        const route = currentRoute.get();
        eq(route.name, "search");
        eq(route.params.get("q"), "poptest");
    } finally {
        // Restore original state.
        history.replaceState(null, '', origPathname + origSearch);
        currentRoute.set(prev);
    }
}
