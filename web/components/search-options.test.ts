// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./search-options.ts";
import type {SearchOptionsComponent} from "./search-options.ts";

export async function testSearchOptionsRendersCaseRadios(t: T) {
    const el = await render(html`<cs-search-options></cs-search-options>`) as SearchOptionsComponent;
    const radios = el.renderRoot.querySelectorAll('input[name="fold_case"]');
    eq(radios.length, 3, "should have 3 case radio buttons");
    // Default: auto is checked
    const auto = el.renderRoot.querySelector('#case-auto') as HTMLInputElement;
    eq(auto.checked, true, "auto should be default");
}

export async function testSearchOptionsRendersLiteralCheckbox(t: T) {
    const el = await render(html`<cs-search-options></cs-search-options>`) as SearchOptionsComponent;
    const literal = el.renderRoot.querySelector('#literal') as HTMLInputElement;
    eq(literal !== null, true, "should have literal checkbox");
    eq(literal.type, "checkbox", "literal is checkbox");
    eq(literal.checked, false, "literal unchecked by default");
}

export async function testSearchOptionsRendersRepoSelector(t: T) {
    const repos = [
        {label: "github.com/org/", repos: ["github.com/org/repo1", "github.com/org/repo2"]},
    ];
    const el = await render(html`
        <cs-search-options .repos=${repos}></cs-search-options>
    `) as SearchOptionsComponent;
    const repoSelect = el.renderRoot.querySelector('repo-select');
    eq(repoSelect !== null, true, "should have repo-select");
    const options = el.renderRoot.querySelectorAll('option');
    eq(options.length, 2, "should have 2 repo options");
}

export async function testSearchOptionsFiresOptionsChange(t: T) {
    const el = await render(html`<cs-search-options></cs-search-options>`) as SearchOptionsComponent;

    let detail: any = null;
    el.addEventListener('options-change', ((e: CustomEvent) => {
        detail = e.detail;
    }) as EventListener);

    // Click the "match" radio (case-sensitive)
    const matchRadio = el.renderRoot.querySelector('#case-match') as HTMLInputElement;
    matchRadio.click();

    eq(detail !== null, true, "should fire options-change");
    eq(detail.caseSensitive, true, "should be case-sensitive");
}

export async function testSearchOptionsCaseSensitiveProp(t: T) {
    const el = await render(html`
        <cs-search-options .options=${{caseSensitive: true}}></cs-search-options>
    `) as SearchOptionsComponent;
    const matchRadio = el.renderRoot.querySelector('#case-match') as HTMLInputElement;
    eq(matchRadio.checked, true, "match radio should be checked when caseSensitive=true");
}
