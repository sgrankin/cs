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
    const got = Array.from(links).map(a => ({text: a.textContent, href: a.getAttribute('href')}));
    eq(got, [
        {text: "myrepo@abc123", href: "/view/myrepo@abc123/+/"},
        {text: "src", href: "/view/myrepo@abc123/+/src/"},
        {text: "main.go", href: "/view/myrepo@abc123/+/src/main.go"},
    ]);
}

export async function testBreadcrumbsNoSeparator(t: T) {
    const el = await render(html`
        <cs-breadcrumbs path="repo@v/+/file.go"></cs-breadcrumbs>
    `) as Breadcrumbs;
    const links = el.renderRoot.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
    const got = Array.from(links).map(a => ({text: a.textContent, href: a.getAttribute('href')}));
    eq(got, [
        {text: "repo@v", href: "/view/repo@v/+/"},
        {text: "file.go", href: "/view/repo@v/+/file.go"},
    ]);
}

export async function testBreadcrumbsNoPlus(t: T) {
    const el = await render(html`
        <cs-breadcrumbs path="noplushere"></cs-breadcrumbs>
    `) as Breadcrumbs;
    // Without /+/, should just show the path as text.
    const text = el.renderRoot.textContent ?? '';
    eq(text.includes("noplushere"), true, "shows raw path");
}
