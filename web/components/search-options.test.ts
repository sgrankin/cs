// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./search-options.ts";
import type {SearchOptionsComponent} from "./search-options.ts";

export async function testSearchOptionsRendersCaseRadios(t: T) {
    const el = await render(html`<cs-search-options></cs-search-options>`) as SearchOptionsComponent;
    const radios = el.renderRoot.querySelectorAll('input[name="fold_case"]') as NodeListOf<HTMLInputElement>;
    eq(radios.length, 3, "should have 3 case radio buttons");
    // Verify radio values: match, auto, ignore.
    eq(radios[0].id, "case-match", "first radio id");
    eq(radios[0].value, "false", "match radio value");
    eq(radios[1].id, "case-auto", "second radio id");
    eq(radios[1].value, "auto", "auto radio value");
    eq(radios[2].id, "case-ignore", "third radio id");
    eq(radios[2].value, "true", "ignore radio value");
    // Default: auto is checked
    eq(radios[1].checked, true, "auto should be default");
}

export async function testSearchOptionsRendersLiteralCheckbox(t: T) {
    const el = await render(html`<cs-search-options></cs-search-options>`) as SearchOptionsComponent;
    const literal = el.renderRoot.querySelector('#literal') as HTMLInputElement;
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
    eq(repoSelect!.tagName.toLowerCase(), "repo-select", "should have repo-select");
    const options = el.renderRoot.querySelectorAll('option');
    eq(options.length, 2, "should have 2 repo options");
    eq(options[0].value, "github.com/org/repo1", "first option value");
    eq(options[0].textContent, "repo1", "first option text");
    eq(options[1].value, "github.com/org/repo2", "second option value");
    eq(options[1].textContent, "repo2", "second option text");
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

    eq(detail.caseSensitive, true, "should be case-sensitive");
}

export async function testSearchOptionsCaseSensitiveProp(t: T) {
    const el = await render(html`
        <cs-search-options .options=${{caseSensitive: true}}></cs-search-options>
    `) as SearchOptionsComponent;
    const matchRadio = el.renderRoot.querySelector('#case-match') as HTMLInputElement;
    eq(matchRadio.checked, true, "match radio should be checked when caseSensitive=true");
}
