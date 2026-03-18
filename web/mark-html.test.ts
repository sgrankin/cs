// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {markInHTML} from "./mark-html.ts";

export function testMarkInHTML(t: T) {
    const cases = [
        {name: "plain text", html: "hello world", start: 6, end: 11,
            want: 'hello <mark class="matchstr">world</mark>'},
        {name: "across span", html: '<span class="kw">static</span> const', start: 0, end: 6,
            want: '<span class="kw"><mark class="matchstr">static</mark></span> const'},
        {name: "mid-span", html: '<span class="s">hello world</span>', start: 6, end: 11,
            want: '<span class="s">hello <mark class="matchstr">world</mark></span>'},
        {name: "spanning tags", html: '<span class="a">abc</span><span class="b">def</span>', start: 2, end: 5,
            want: '<span class="a">ab<mark class="matchstr">c</span><span class="b">de</mark>f</span>'},
        {name: "entity", html: 'a &amp; b', start: 0, end: 5,
            want: '<mark class="matchstr">a &amp; b</mark>'},
        {name: "no match region", html: "hello", start: 0, end: 0,
            want: "hello"},
        {name: "at end", html: "hello", start: 3, end: 5,
            want: 'hel<mark class="matchstr">lo</mark>'},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            eq(markInHTML(c.html, c.start, c.end), c.want);
        });
    }
}
