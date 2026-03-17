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

export async function testAppRendersAboutView(t: T) {
    currentRoute.set({name: 'about', params: new URLSearchParams()});
    const el = await render(html`<cs-app></cs-app>`) as CsApp;
    const aboutView = el.renderRoot.querySelector('cs-about-view');
    eq(aboutView !== null, true, "about view rendered");
    // Reset route.
    currentRoute.set({name: 'search', params: new URLSearchParams()});
}

export async function testAppRendersNotFound(t: T) {
    currentRoute.set({name: 'not-found', params: new URLSearchParams()});
    const el = await render(html`<cs-app></cs-app>`) as CsApp;
    const placeholder = el.renderRoot.querySelector('.placeholder');
    eq(placeholder!.textContent, "Not found");
    // Reset route.
    currentRoute.set({name: 'search', params: new URLSearchParams()});
}

export async function testAppRendersFileView(t: T) {
    currentRoute.set({name: 'view', path: 'repo/file.go', params: new URLSearchParams()});
    const el = await render(html`<cs-app></cs-app>`) as CsApp;
    const fileView = el.renderRoot.querySelector('cs-file-view');
    eq(fileView !== null, true, "file view rendered");
    // Reset route.
    currentRoute.set({name: 'search', params: new URLSearchParams()});
}
