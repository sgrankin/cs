// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {toggleFacet, parseFacetParams, facetSetsToParams} from "./search-view.ts";

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
