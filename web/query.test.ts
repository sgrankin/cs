// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {buildSearchParams} from "./query.ts";

export function testBuildSearchParams(t: T) {
    const cases = [
        {name: "basic", query: "hello", opts: {} as any, facets: {} as any,
            check: (p: URLSearchParams) => { eq(p.get("q"), "hello"); eq(p.get("literal"), null); eq(p.get("fold_case"), null); }},
        {name: "literal", query: "hello.world", opts: {literal: true}, facets: {},
            check: (p: URLSearchParams) => { eq(p.get("q"), "hello.world"); eq(p.get("literal"), "true"); }},
        {name: "case sensitive", query: "Hello", opts: {caseSensitive: true}, facets: {},
            check: (p: URLSearchParams) => { eq(p.get("q"), "Hello"); eq(p.get("fold_case"), "false"); }},
        {name: "with facets", query: "hello", opts: {}, facets: {"f.ext": [".go", ".py"], "f.repo": ["org/foo"]},
            check: (p: URLSearchParams) => { eq(p.getAll("f.ext"), [".go", ".py"]); eq(p.getAll("f.repo"), ["org/foo"]); }},
        {name: "with repos", query: "hello", opts: {repos: ["org/foo", "org/bar"]}, facets: {},
            check: (p: URLSearchParams) => { eq(p.getAll("repo"), ["org/foo", "org/bar"]); }},
        {name: "empty repos omitted", query: "hello", opts: {repos: []}, facets: {},
            check: (p: URLSearchParams) => { eq(p.getAll("repo"), []); }},
        {name: "empty query", query: "", opts: {}, facets: {},
            check: (p: URLSearchParams) => { eq(p.get("q"), null); }},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            const params = buildSearchParams(c.query, c.opts, c.facets);
            c.check(params);
        });
    }
}
