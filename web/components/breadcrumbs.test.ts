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
    const links = el.renderRoot.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    eq(links.length, 3, "3 breadcrumb links");
    eq(links[0].textContent, "myrepo@abc123", "first link is repo");
    eq(links[0].getAttribute('href'), "/view/myrepo@abc123/+/", "repo link href");
    eq(links[1].textContent, "src", "second link is dir");
    eq(links[1].getAttribute('href'), "/view/myrepo@abc123/+/src/", "dir link has trailing slash");
    eq(links[2].textContent, "main.go", "third link is file");
    eq(links[2].getAttribute('href'), "/view/myrepo@abc123/+/src/main.go", "file link no trailing slash");
}

export async function testBreadcrumbsNoSeparator(t: T) {
    const el = await render(html`
        <cs-breadcrumbs path="repo@v/+/file.go"></cs-breadcrumbs>
    `) as Breadcrumbs;
    const links = el.renderRoot.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    eq(links.length, 2, "2 breadcrumb links");
    eq(links[0].textContent, "repo@v", "first link is repo");
    eq(links[1].textContent, "file.go", "second link is file");
}

export async function testBreadcrumbsNoPlus(t: T) {
    const el = await render(html`
        <cs-breadcrumbs path="noplushere"></cs-breadcrumbs>
    `) as Breadcrumbs;
    // Without /+/, should just show the path as text.
    const text = el.renderRoot.textContent ?? '';
    eq(text.includes("noplushere"), true, "shows raw path");
}
