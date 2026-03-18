// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./components.ts";
import type {MatchStr} from "./components.ts";

export async function testMatchStrWithBounds(t: T) {
    const el = await render(html`<match-str text="hello world" start=${6} end=${11}></match-str>`) as MatchStr;
    const span = el.renderRoot.querySelector('.matchstr');
    eq(span !== null, true, "matchstr span exists");
    eq(span!.textContent, "world");
}

export async function testMatchStrWithoutBounds(t: T) {
    const el = await render(html`<match-str text="hello world"></match-str>`) as MatchStr;
    // Without start/end props, the else branch renders just the text.
    const span = el.renderRoot.querySelector('.matchstr');
    eq(span, null, "no matchstr span");
    // The rendered content should just be the text.
    const text = el.renderRoot.textContent;
    eq(text, "hello world");
}
