// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {parsePath, externalUrlTemplate, isDirectoryPath, rawUrl} from "./file-view.ts";

export function testParsePath(t: T) {
    t.run("@ separator", () => {
        eq(parsePath("myrepo@abc123/+/src/main.go"), {
            repo: "myrepo", version: "abc123", filePath: "src/main.go",
        });
    });
    t.run("@ separator directory", () => {
        eq(parsePath("myrepo@abc123/+/src/"), {
            repo: "myrepo", version: "abc123", filePath: "src/",
        });
    });
    t.run("slash separator from search results", () => {
        eq(parsePath("github.com/org/repo/abc123/+/file.go"), {
            repo: "github.com/org/repo", version: "abc123", filePath: "file.go",
        });
    });
    t.run("no /+/ falls back", () => {
        eq(parsePath("noplushere"), {
            repo: "noplushere", version: "", filePath: "",
        });
    });
    t.run("multi-segment repo with @", () => {
        eq(parsePath("github.com/torvalds/linux@deadbeef/+/Makefile"), {
            repo: "github.com/torvalds/linux", version: "deadbeef", filePath: "Makefile",
        });
    });
}

export function testExternalUrlTemplate(t: T) {
    t.run("github repo", () => {
        eq(
            externalUrlTemplate("github.com/org/repo", "abc123", "src/main.go"),
            "https://github.com/org/repo/blob/abc123/src/main.go#L{lno}",
        );
    });
    t.run("non-github returns empty", () => {
        eq(externalUrlTemplate("gitlab.com/org/repo", "v1", "f.go"), "");
    });
    t.run("empty repo returns empty", () => {
        eq(externalUrlTemplate("", "v1", "f.go"), "");
    });
}

export function testIsDirectoryPath(t: T) {
    t.run("trailing slash", () => eq(isDirectoryPath("repo@v/+/src/"), true));
    t.run("ends with /+/", () => eq(isDirectoryPath("repo@v/+/"), true));
    t.run("no /+/ at all", () => eq(isDirectoryPath("repo@v"), true));
    t.run("file path", () => eq(isDirectoryPath("repo@v/+/src/main.go"), false));
}

export function testRawUrl(t: T) {
    t.run("file", () => eq(rawUrl("repo@v/+/src/main.go", false), "/raw/repo@v/+/src/main.go"));
    t.run("dir with trailing slash", () => eq(rawUrl("repo@v/+/src/", true), "/raw/repo@v/+/src/"));
    t.run("dir without trailing slash", () => eq(rawUrl("repo@v/+/src", true), "/raw/repo@v/+/src/"));
    t.run("root dir", () => eq(rawUrl("repo@v/+/", true), "/raw/repo@v/+/"));
}
