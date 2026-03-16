// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./breadcrumbs.ts";
import type {Breadcrumbs} from "./breadcrumbs.ts";

export async function testBreadcrumbsRenders(t: T) {
    const el = await render(html`
        <cs-breadcrumbs path="myrepo@abc123/+/src/main.go"></cs-breadcrumbs>
    `) as Breadcrumbs;
    const links = el.renderRoot.querySelectorAll('a');
    // Repo link + "src" + "main.go" = 3 links.
    eq(links.length, 3, "has 3 breadcrumb links");
}

export async function testBreadcrumbsNoSeparator(t: T) {
    const el = await render(html`
        <cs-breadcrumbs path="repo@v/+/file.go"></cs-breadcrumbs>
    `) as Breadcrumbs;
    const links = el.renderRoot.querySelectorAll('a');
    // Repo link + "file.go" = 2 links.
    eq(links.length, 2, "has 2 breadcrumb links");
    const lastLink = links[links.length - 1];
    eq(lastLink.textContent, "file.go", "last link is filename");
}

export async function testBreadcrumbsNoPlus(t: T) {
    const el = await render(html`
        <cs-breadcrumbs path="noplushere"></cs-breadcrumbs>
    `) as Breadcrumbs;
    // Without /+/, should just show the path as text.
    const text = el.renderRoot.textContent ?? '';
    eq(text.includes("noplushere"), true, "shows raw path");
}
