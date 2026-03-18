// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {detectSnippetLanguage, highlightSnippet} from "./snippet-highlight.ts";
import hljs from 'highlight.js/lib/core';

export function testDetectSnippetLanguage(t: T) {
    const cases = [
        // Extension-based detection.
        {name: ".go extension", path: "src/main.go", want: "go"},
        {name: ".ts extension", path: "web/app.ts", want: "typescript"},
        {name: ".py extension", path: "lib/util.py", want: "python"},
        // Special filename matching (NAME_TO_LANG).
        {name: "Makefile", path: "build/Makefile", want: "makefile"},
        {name: "Dockerfile", path: "deploy/Dockerfile", want: "dockerfile"},
        {name: ".bashrc", path: "home/.bashrc", want: "bash"},
        {name: ".zshrc", path: "home/.zshrc", want: "bash"},
        {name: ".profile", path: "home/.profile", want: "bash"},
        // Unknown file — returns empty string.
        {name: "no extension", path: "src/README", want: ""},
        {name: "unknown extension", path: "src/data.xyz", want: ""},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            eq(detectSnippetLanguage(c.path), c.want);
        });
    }
}

export function testHighlightSnippet(t: T) {
    const cases = [
        {name: "known language returns lines", path: "main.go", text: "package main\nfunc main() {}",
            wantNull: false, wantLength: 2},
        {name: "unknown language returns null", path: "data.xyz", text: "hello world",
            wantNull: true, wantLength: 0},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            const result = highlightSnippet(c.path, c.text);
            if (c.wantNull) {
                eq(result, null);
            } else {
                eq(result !== null, true, "result is not null");
                eq(result!.length, c.wantLength);
            }
        });
    }
}

export function testHighlightSnippetCatchBlock(t: T) {
    // Exercise the catch block by monkey-patching hljs.highlight to throw.
    const orig = hljs.highlight;
    try {
        (hljs as any).highlight = () => { throw new Error("simulated hljs error"); };
        const result = highlightSnippet("test.go", "package main");
        eq(result, null, "returns null on hljs error");
    } finally {
        (hljs as any).highlight = orig;
    }
}
