// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import {parsePath, externalUrlTemplate, isDirectoryPath, rawUrl} from "./file-view.ts";
import "./file-view.ts";
import type {FileView} from "./file-view.ts";

export function testParsePath(t: T) {
    const cases = [
        {name: "@ separator", input: "myrepo@abc123/+/src/main.go", want: {repo: "myrepo", version: "abc123", filePath: "src/main.go"}},
        {name: "@ separator directory", input: "myrepo@abc123/+/src/", want: {repo: "myrepo", version: "abc123", filePath: "src/"}},
        {name: "slash separator from search results", input: "github.com/org/repo/abc123/+/file.go", want: {repo: "github.com/org/repo", version: "abc123", filePath: "file.go"}},
        {name: "no /+/ falls back", input: "noplushere", want: {repo: "noplushere", version: "", filePath: ""}},
        {name: "multi-segment repo with @", input: "github.com/torvalds/linux@deadbeef/+/Makefile", want: {repo: "github.com/torvalds/linux", version: "deadbeef", filePath: "Makefile"}},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            eq(parsePath(c.input), c.want);
        });
    }
}

export function testExternalUrlTemplate(t: T) {
    const cases = [
        {name: "github repo", repo: "github.com/org/repo", ver: "abc123", file: "src/main.go", want: "https://github.com/org/repo/blob/abc123/src/main.go#L{lno}"},
        {name: "non-github returns empty", repo: "gitlab.com/org/repo", ver: "v1", file: "f.go", want: ""},
        {name: "empty repo returns empty", repo: "", ver: "v1", file: "f.go", want: ""},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            eq(externalUrlTemplate(c.repo, c.ver, c.file), c.want);
        });
    }
}

export function testIsDirectoryPath(t: T) {
    const cases = [
        {name: "trailing slash", input: "repo@v/+/src/", want: true},
        {name: "ends with /+/", input: "repo@v/+/", want: true},
        {name: "no /+/ at all", input: "repo@v", want: true},
        {name: "file path", input: "repo@v/+/src/main.go", want: false},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            eq(isDirectoryPath(c.input), c.want);
        });
    }
}

export function testRawUrl(t: T) {
    const cases = [
        {name: "file", path: "repo@v/+/src/main.go", isDir: false, want: "/raw/repo@v/+/src/main.go"},
        {name: "dir with trailing slash", path: "repo@v/+/src/", isDir: true, want: "/raw/repo@v/+/src/"},
        {name: "dir without trailing slash", path: "repo@v/+/src", isDir: true, want: "/raw/repo@v/+/src/"},
        {name: "root dir", path: "repo@v/+/", isDir: true, want: "/raw/repo@v/+/"},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            eq(rawUrl(c.path, c.isDir), c.want);
        });
    }
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
