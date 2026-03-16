// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Integration test: imports the full app to surface coverage for all components.

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./app.ts";
import type {CsApp} from "./app.ts";

export async function testAppRenders(t: T) {
    const el = await render(html`<cs-app></cs-app>`) as CsApp;
    // Should render with main and footer elements.
    const got = {
        main: el.renderRoot.querySelector('main')!.tagName,
        footer: el.renderRoot.querySelector('footer')!.tagName,
    };
    eq(got, {main: "MAIN", footer: "FOOTER"});
}

export async function testAppHasFooter(t: T) {
    const el = await render(html`<cs-app></cs-app>`) as CsApp;
    const footer = el.renderRoot.querySelector('footer');
    const links = footer!.querySelectorAll('a');
    const got = Array.from(links).map(a => ({text: a.textContent, href: a.getAttribute('href')}));
    eq(got, [
        {text: "search", href: "/"},
        {text: "about", href: "/about"},
        {text: "source", href: "https://github.com/sgrankin/cs"},
    ]);
}
