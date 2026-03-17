// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import {parsePath, externalUrlTemplate, isDirectoryPath, rawUrl} from "./file-view.ts";
import "./file-view.ts";
import type {FileView} from "./file-view.ts";

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

// Helper to wait for fetch + Lit render cycles.
async function settled(el: FileView): Promise<void> {
    await new Promise(r => setTimeout(r, 0));
    await (el as any).updateComplete;
    await new Promise(r => setTimeout(r, 0));
    await (el as any).updateComplete;
}

export async function testFileViewRendersFileContent(t: T) {
    const origFetch = globalThis.fetch;
    try {
        globalThis.fetch = (async (url: string) => {
            return new Response("package main\n\nfunc main() {}\n", {
                headers: {"Content-Type": "text/plain"},
            });
        }) as any;

        const el = await render(html`<cs-file-view .path=${"github.com/org/repo@abc123/+/main.go"}></cs-file-view>`) as FileView;
        await settled(el);

        // Should render a code viewer with the file content.
        const codeViewer = el.renderRoot.querySelector('cs-code-viewer');
        eq(codeViewer !== null, true, "code viewer rendered");
        // Should render breadcrumbs.
        const breadcrumbs = el.renderRoot.querySelector('cs-breadcrumbs');
        eq(breadcrumbs !== null, true, "breadcrumbs rendered");
        // Should not show error or loading.
        eq(el.renderRoot.querySelector('.error'), null, "no error");
    } finally {
        globalThis.fetch = origFetch;
    }
}

export async function testFileViewRendersDirectoryListing(t: T) {
    const origFetch = globalThis.fetch;
    try {
        globalThis.fetch = (async (url: string) => {
            return new Response(JSON.stringify(["main.go", "util.go", "README.md"]), {
                headers: {"Content-Type": "application/json"},
            });
        }) as any;

        const el = await render(html`<cs-file-view .path=${"repo@v/+/src/"}></cs-file-view>`) as FileView;
        await settled(el);

        const dirListing = el.renderRoot.querySelector('cs-dir-listing');
        eq(dirListing !== null, true, "dir listing rendered");
    } finally {
        globalThis.fetch = origFetch;
    }
}

export async function testFileViewRendersDirectoryWithReadme(t: T) {
    const origFetch = globalThis.fetch;
    try {
        let fetchCount = 0;
        globalThis.fetch = (async (url: string) => {
            fetchCount++;
            if (fetchCount === 1) {
                // Directory listing.
                return new Response(JSON.stringify(["main.go", "README.md"]), {
                    headers: {"Content-Type": "application/json"},
                });
            }
            // README content.
            return new Response("# Hello World\nThis is a README.", {
                headers: {"Content-Type": "text/plain"},
            });
        }) as any;

        const el = await render(html`<cs-file-view .path=${"repo@v/+/src/"}></cs-file-view>`) as FileView;
        await settled(el);
        // Extra settle for the README fetch.
        await settled(el);

        const dirListing = el.renderRoot.querySelector('cs-dir-listing');
        eq(dirListing !== null, true, "dir listing rendered");
        const readme = el.renderRoot.querySelector('.readme');
        eq(readme !== null, true, "readme section rendered");
        eq(readme!.querySelector('pre')!.textContent, "# Hello World\nThis is a README.");
    } finally {
        globalThis.fetch = origFetch;
    }
}

export async function testFileViewRendersError(t: T) {
    const origFetch = globalThis.fetch;
    try {
        globalThis.fetch = (async () => new Response("not found", {status: 404})) as any;

        const el = await render(html`<cs-file-view .path=${"repo@v/+/missing.go"}></cs-file-view>`) as FileView;
        await settled(el);

        const error = el.renderRoot.querySelector('.error');
        eq(error !== null, true, "error shown");
        eq(error!.textContent!.includes("404"), true, "error includes status");
    } finally {
        globalThis.fetch = origFetch;
    }
}

export async function testFileViewRendersNetworkError(t: T) {
    const origFetch = globalThis.fetch;
    try {
        globalThis.fetch = (async () => { throw new Error("network failure"); }) as any;

        const el = await render(html`<cs-file-view .path=${"repo@v/+/file.go"}></cs-file-view>`) as FileView;
        await settled(el);

        const error = el.renderRoot.querySelector('.error');
        eq(error !== null, true, "error shown");
        eq(error!.textContent!.includes("network failure"), true, "error includes message");
    } finally {
        globalThis.fetch = origFetch;
    }
}

export async function testFileViewHelpModal(t: T) {
    const origFetch = globalThis.fetch;
    try {
        globalThis.fetch = (async () => new Response("hello\n", {
            headers: {"Content-Type": "text/plain"},
        })) as any;

        const el = await render(html`<cs-file-view .path=${"repo@v/+/file.go"}></cs-file-view>`) as FileView;
        await settled(el);

        // The help modal should exist (closed by default).
        const helpModal = el.renderRoot.querySelector('cs-help-modal');
        eq(helpModal !== null, true, "help modal exists");

        // Dispatch toggle-help from the code viewer.
        const codeViewer = el.renderRoot.querySelector('cs-code-viewer');
        codeViewer!.dispatchEvent(new CustomEvent('toggle-help', {bubbles: true, composed: true}));
        await (el as any).updateComplete;

        // Help modal should now be open.
        const openModal = el.renderRoot.querySelector('cs-help-modal') as any;
        eq(openModal.getAttribute('open') !== null || openModal.open === true, true, "help modal opened");

        // Dispatch close-help.
        codeViewer!.dispatchEvent(new CustomEvent('close-help', {bubbles: true, composed: true}));
        await (el as any).updateComplete;
    } finally {
        globalThis.fetch = origFetch;
    }
}

export async function testFileViewReadmeNotFound(t: T) {
    const origFetch = globalThis.fetch;
    try {
        let fetchCount = 0;
        globalThis.fetch = (async (url: string) => {
            fetchCount++;
            if (fetchCount === 1) {
                // Directory listing with a README.
                return new Response(JSON.stringify(["main.go", "README.md"]), {
                    headers: {"Content-Type": "application/json"},
                });
            }
            // README fetch fails.
            return new Response("not found", {status: 404});
        }) as any;

        const el = await render(html`<cs-file-view .path=${"repo@v/+/src/"}></cs-file-view>`) as FileView;
        await settled(el);
        await settled(el);

        // Dir listing rendered, but no readme section.
        const dirListing = el.renderRoot.querySelector('cs-dir-listing');
        eq(dirListing !== null, true, "dir listing rendered");
        const readme = el.renderRoot.querySelector('.readme');
        eq(readme, null, "no readme section when fetch fails");
    } finally {
        globalThis.fetch = origFetch;
    }
}

export async function testFileViewReadmeFetchError(t: T) {
    const origFetch = globalThis.fetch;
    try {
        let fetchCount = 0;
        globalThis.fetch = (async (url: string) => {
            fetchCount++;
            if (fetchCount === 1) {
                // Directory listing with a README.
                return new Response(JSON.stringify(["main.go", "README.md"]), {
                    headers: {"Content-Type": "application/json"},
                });
            }
            // README fetch throws network error.
            throw new Error("network error");
        }) as any;

        const el = await render(html`<cs-file-view .path=${"repo@v/+/src/"}></cs-file-view>`) as FileView;
        await settled(el);
        await settled(el);

        // Dir listing rendered, no readme (error silently ignored).
        const dirListing = el.renderRoot.querySelector('cs-dir-listing');
        eq(dirListing !== null, true, "dir listing rendered");
        const readme = el.renderRoot.querySelector('.readme');
        eq(readme, null, "no readme section on network error");
    } finally {
        globalThis.fetch = origFetch;
    }
}

export async function testFileViewDirNoReadme(t: T) {
    const origFetch = globalThis.fetch;
    try {
        globalThis.fetch = (async (url: string) => {
            return new Response(JSON.stringify(["main.go", "util.go"]), {
                headers: {"Content-Type": "application/json"},
            });
        }) as any;

        const el = await render(html`<cs-file-view .path=${"repo@v/+/src/"}></cs-file-view>`) as FileView;
        await settled(el);

        // Dir listing rendered, no readme section (no README file in listing).
        const readme = el.renderRoot.querySelector('.readme');
        eq(readme, null, "no readme when dir has no README");
    } finally {
        globalThis.fetch = origFetch;
    }
}
