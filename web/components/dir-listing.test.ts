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
    eq(links.length, 3, "should render 3 entries");
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
    eq(links[0].classList.contains('dir'), true, "first is dir");
    eq(links[0].textContent, "a_dir/", "dir sorted alphabetically");
    eq(links[1].classList.contains('file'), true, "second is file");
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
