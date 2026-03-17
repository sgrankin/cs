// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Integration test: imports the full app to surface coverage for all components.

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./app.ts";
import type {CsApp} from "./app.ts";
import {currentRoute} from "./router.ts";

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

export async function testAppRendersRoutes(t: T) {
    const cases = [
        {name: "about view", route: {name: 'about', params: new URLSearchParams()} as any,
            selector: 'cs-about-view', wantExists: true},
        {name: "not found", route: {name: 'not-found', params: new URLSearchParams()},
            selector: '.placeholder', wantExists: true, wantText: "Not found"},
        {name: "file view", route: {name: 'view', path: 'repo/file.go', params: new URLSearchParams()},
            selector: 'cs-file-view', wantExists: true},
    ];
    for (const c of cases) {
        t.run(c.name, async () => {
            currentRoute.set(c.route);
            try {
                const el = await render(html`<cs-app></cs-app>`) as CsApp;
                const found = el.renderRoot.querySelector(c.selector);
                eq(found !== null, c.wantExists);
                if (c.wantText) eq(found!.textContent, c.wantText);
            } finally {
                currentRoute.set({name: 'search', params: new URLSearchParams()});
            }
        });
    }
}
