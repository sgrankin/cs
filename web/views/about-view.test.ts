// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./about-view.ts";
import type {AboutView} from "./about-view.ts";

export async function testAboutViewRenders(t: T) {
    const el = await render(html`<cs-about-view></cs-about-view>`) as AboutView;
    const about = el.renderRoot.querySelector('.about');
    eq(about !== null, true, "about container rendered");

    // Verify the links in the about page.
    const links = Array.from(el.renderRoot.querySelectorAll('a')).map(a => ({
        text: a.textContent,
        href: a.getAttribute('href'),
    }));
    eq(links, [
        {text: "livegrep", href: "https://github.com/livegrep/livegrep"},
        {text: "codesearch", href: "https://github.com/google/codesearch"},
        {text: "Google Codesearch", href: "http://google.com/codesearch"},
        {text: "Nelson Elhage", href: "https://nelhage.com/"},
        {text: "open source", href: "https://github.com/livegrep/livegrep"},
    ]);
}
