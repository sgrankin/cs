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
    const main = el.renderRoot.querySelector('main');
    eq(main!.tagName, "MAIN", "app renders main element");
    const footer = el.renderRoot.querySelector('footer');
    eq(footer!.tagName, "FOOTER", "app renders footer element");
}

export async function testAppHasFooter(t: T) {
    const el = await render(html`<cs-app></cs-app>`) as CsApp;
    const footer = el.renderRoot.querySelector('footer');
    const links = footer!.querySelectorAll('a');
    eq(links.length, 3, "footer has 3 links");
    eq(links[0].textContent, "search", "first link is search");
    eq(links[0].getAttribute('href'), "/", "search link href");
    eq(links[1].textContent, "about", "second link is about");
    eq(links[1].getAttribute('href'), "/about", "about link href");
    eq(links[2].textContent, "source", "third link is source");
    eq(links[2].getAttribute('href'), "https://github.com/sgrankin/cs", "source link href");
}
