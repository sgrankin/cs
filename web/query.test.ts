// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {parseQuery, buildSearchParams, rebuildQueryText, type QueryParts} from "./query.ts";

export function testParseQueryBasic(t: T) {
    const cases: {input: string; line: string; ops?: Record<string, string[]>}[] = [
        {input: "hello", line: "hello"},
        {input: "a b c", line: "a b c"},
        {input: " a  ", line: "a"},
        {input: "Aa", line: "Aa"},
        {input: "std::string", line: "std::string"},
        {input: "(", line: "("},
        {input: "( a  )", line: "( a  )"},
        {input: "(  () (   ", line: "(  () ("},
        {input: "(file:)", line: "(file:)"},
    ];
    for (const c of cases) {
        t.run(JSON.stringify(c.input), () => {
            const result = parseQuery(c.input);
            eq(result.line, c.line, "line");
            if (c.ops) {
                eq(result.operators, c.ops, "operators");
            }
        });
    }
}

export function testParseQueryOperators(t: T) {
    const cases: {input: string; line: string; ops: Record<string, string[]>}[] = [
        {
            input: "line file:.rb",
            line: "line",
            ops: {file: [".rb"]},
        },
        {
            input: "case:abc",
            line: "",
            ops: {case: ["abc"]},
        },
        {
            input: "case:abc file:^kernel/",
            line: "",
            ops: {case: ["abc"], file: ["^kernel/"]},
        },
        {
            input: "-file:Godep re",
            line: "re",
            ops: {"-file": ["Godep"]},
        },
        {
            input: "-file:. -repo:Godep re",
            line: "re",
            ops: {"-file": ["."], "-repo": ["Godep"]},
        },
        {
            input: "re tags:kind:function",
            line: "re",
            ops: {tags: ["kind:function"]},
        },
        {
            input: "case:foo:",
            line: "",
            ops: {case: ["foo:"]},
        },
        {
            input: "lit:.",
            line: "",
            ops: {lit: ["."]},
        },
        {
            input: "a max_matches:100",
            line: "a",
            ops: {max_matches: ["100"]},
        },
        {
            input: "file:hello",
            line: "",
            ops: {file: ["hello"]},
        },
        {
            input: `a file:\\(`,
            line: "a",
            ops: {file: [`\\(`]},
        },
        {
            input: `a file:(\\()`,
            line: "a",
            ops: {file: [`(\\()`]},
        },
        {
            input: "case:abc file:( )",
            line: "",
            ops: {case: ["abc"], file: ["( )"]},
        },
        {
            input: `file:a file:b path:c path:\\.rb$ zoo`,
            line: "zoo",
            ops: {file: ["a", "b"], path: ["c", `\\.rb$`]},
        },
        {
            input: `-file:a -path:b -file:c -path:\\.rb$ zoo`,
            line: "zoo",
            ops: {"-file": ["a", "c"], "-path": ["b", `\\.rb$`]},
        },
    ];
    for (const c of cases) {
        t.run(JSON.stringify(c.input), () => {
            const result = parseQuery(c.input);
            eq(result.line, c.line, "line");
            eq(result.operators, c.ops, "operators");
        });
    }
}

export function testParseQueryBrackets(t: T) {
    const cases: {input: string; line: string}[] = [
        {input: "[(] file:\\.c", line: "[(]"},
        {input: "[ ] file:\\.c", line: "[ ]"},
        {input: "[ \\]] file:\\.c", line: "[ \\]]"},
    ];
    for (const c of cases) {
        t.run(JSON.stringify(c.input), () => {
            const result = parseQuery(c.input);
            eq(result.line, c.line, "line");
        });
    }
}

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

    t.run("empty query", () => {
        const params = buildSearchParams("");
        eq(params.get("q"), null);
    });
}

export function testRebuildQueryText(t: T) {
    t.run("line only", () => {
        eq(rebuildQueryText({line: "hello", operators: {}}), "hello");
    });

    t.run("with operators", () => {
        const text = rebuildQueryText({
            line: "search term",
            operators: {file: [".go"]}
        });
        eq(text, "search term file:.go");
    });

    t.run("round trip", () => {
        const input = "hello file:.rb -repo:vendor";
        const parts = parseQuery(input);
        const rebuilt = rebuildQueryText(parts);
        // Re-parse to verify equivalence (order may differ).
        const reparsed = parseQuery(rebuilt);
        eq(reparsed.line, parts.line, "line preserved");
        eq(reparsed.operators, parts.operators, "operators preserved");
    });
}
