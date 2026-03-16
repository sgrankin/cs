// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./dir-listing.ts";
import type {DirListing} from "./dir-listing.ts";

export async function testDirListingRendersEntries(t: T) {
    const el = await render(html`
        <cs-dir-listing
            .entries=${["main.go", "sub/", "README.md"]}
            basePath="/view/repo@v/+/dir/"
        ></cs-dir-listing>
    `) as DirListing;
    const links = el.renderRoot.querySelectorAll('a');
    // Sorted: sub/ (dir first), then files alphabetically by localeCompare.
    const got = Array.from(links).map(a => ({text: a.textContent, href: a.getAttribute('href')}));
    eq(got, [
        {text: "sub/", href: "/view/repo@v/+/dir/sub/"},
        {text: "main.go", href: "/view/repo@v/+/dir/main.go"},
        {text: "README.md", href: "/view/repo@v/+/dir/README.md"},
    ]);
}

export async function testDirListingSortsDirsFirst(t: T) {
    const el = await render(html`
        <cs-dir-listing
            .entries=${["z_file.go", "a_dir/", "b_file.go"]}
            basePath="/base/"
        ></cs-dir-listing>
    `) as DirListing;
    const links = Array.from(el.renderRoot.querySelectorAll('a'));
    // Directories first, then files.
    const got = links.map(a => ({
        text: a.textContent,
        isDir: a.classList.contains('dir'),
        isFile: a.classList.contains('file'),
    }));
    eq(got, [
        {text: "a_dir/", isDir: true, isFile: false},
        {text: "b_file.go", isDir: false, isFile: true},
        {text: "z_file.go", isDir: false, isFile: true},
    ]);
}

export async function testDirListingLinksUseBasePath(t: T) {
    const el = await render(html`
        <cs-dir-listing
            .entries=${["file.go"]}
            basePath="/view/repo@v/+/"
        ></cs-dir-listing>
    `) as DirListing;
    const link = el.renderRoot.querySelector('a') as HTMLAnchorElement;
    eq(link.getAttribute('href'), "/view/repo@v/+/file.go", "href uses basePath");
}

export async function testDirListingEmpty(t: T) {
    const el = await render(html`
        <cs-dir-listing .entries=${[]} basePath="/base/"></cs-dir-listing>
    `) as DirListing;
    const links = el.renderRoot.querySelectorAll('a');
    eq(links.length, 0, "no entries");
}
