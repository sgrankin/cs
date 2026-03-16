// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {buildSearchParams} from "./query.ts";

export function testBuildSearchParams(t: T) {
    t.run("basic", () => {
        const params = buildSearchParams("hello");
        eq(params.get("q"), "hello");
        eq(params.get("literal"), null);
        eq(params.get("fold_case"), null);
    });

    t.run("literal", () => {
        const params = buildSearchParams("hello.world", {literal: true});
        eq(params.get("q"), "hello.world");
        eq(params.get("literal"), "true");
    });

    t.run("case sensitive", () => {
        const params = buildSearchParams("Hello", {caseSensitive: true});
        eq(params.get("q"), "Hello");
        eq(params.get("fold_case"), "false");
    });

    t.run("with facets", () => {
        const params = buildSearchParams("hello", {}, {
            "f.ext": [".go", ".py"],
            "f.repo": ["org/foo"],
        });
        eq(params.getAll("f.ext"), [".go", ".py"]);
        eq(params.getAll("f.repo"), ["org/foo"]);
    });

    t.run("with repos", () => {
        const params = buildSearchParams("hello", {repos: ["org/foo", "org/bar"]});
        eq(params.getAll("repo"), ["org/foo", "org/bar"]);
    });

    t.run("empty repos omitted", () => {
        const params = buildSearchParams("hello", {repos: []});
        eq(params.getAll("repo"), []);
    });

    t.run("empty query", () => {
        const params = buildSearchParams("");
        eq(params.get("q"), null);
    });
}
