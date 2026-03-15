// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {matchRoute} from "./router.ts";

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
