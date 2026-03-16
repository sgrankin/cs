// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./search-input.ts";
import type {SearchInput} from "./search-input.ts";

export async function testSearchInputRendersInput(t: T) {
    const el = await render(html`<cs-search-input></cs-search-input>`) as SearchInput;
    const input = el.renderRoot.querySelector('#searchbox') as HTMLInputElement;
    eq(input.type, "search", "input type");
    eq(input.autocomplete, "off", "autocomplete off");
}

export async function testSearchInputShowsValue(t: T) {
    const el = await render(html`<cs-search-input .value=${"hello"}></cs-search-input>`) as SearchInput;
    const input = el.renderRoot.querySelector('#searchbox') as HTMLInputElement;
    eq(input.value, "hello", "input value");
}

export async function testSearchInputShowsError(t: T) {
    const el = await render(html`<cs-search-input .error=${"bad regex"}></cs-search-input>`) as SearchInput;
    const errorEl = el.renderRoot.querySelector('#errortext');
    eq(errorEl!.textContent, "bad regex", "error text");
}

export async function testSearchInputNoErrorWhenEmpty(t: T) {
    const el = await render(html`<cs-search-input></cs-search-input>`) as SearchInput;
    const errorEl = el.renderRoot.querySelector('#errortext');
    eq(errorEl, null, "no error element when error is empty");
}

export async function testSearchInputHasLabel(t: T) {
    const el = await render(html`<cs-search-input></cs-search-input>`) as SearchInput;
    const label = el.renderRoot.querySelector('.prefix-label');
    eq(label!.textContent, "Query:", "label text");
}

export async function testSearchInputAppendQuery(t: T) {
    const el = await render(html`<cs-search-input .value=${"hello"}></cs-search-input>`) as SearchInput;

    let fired = false;
    let detail: any = null;
    el.addEventListener('search-input', ((e: CustomEvent) => {
        fired = true;
        detail = e.detail;
    }) as EventListener);

    el.appendQuery(" world");

    eq(fired, true, "search-input event fired");
    eq(detail.value, "hello world", "appended value");
}
