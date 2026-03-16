// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./search-options.ts";
import type {SearchOptionsComponent} from "./search-options.ts";

export async function testSearchOptionsRendersCaseRadios(t: T) {
    const el = await render(html`<cs-search-options></cs-search-options>`) as SearchOptionsComponent;
    const radios = el.renderRoot.querySelectorAll('input[name="fold_case"]') as NodeListOf<HTMLInputElement>;
    // Verify radio values: match, auto, ignore. Default: auto is checked.
    const got = Array.from(radios).map(r => ({id: r.id, value: r.value, checked: r.checked}));
    eq(got, [
        {id: "case-match", value: "false", checked: false},
        {id: "case-auto", value: "auto", checked: true},
        {id: "case-ignore", value: "true", checked: false},
    ]);
}

export async function testSearchOptionsRendersLiteralCheckbox(t: T) {
    const el = await render(html`<cs-search-options></cs-search-options>`) as SearchOptionsComponent;
    const literal = el.renderRoot.querySelector('#literal') as HTMLInputElement;
    eq({type: literal.type, checked: literal.checked}, {type: "checkbox", checked: false});
}

export async function testSearchOptionsRendersRepoSelector(t: T) {
    const repos = [
        {label: "github.com/org/", repos: ["github.com/org/repo1", "github.com/org/repo2"]},
    ];
    const el = await render(html`
        <cs-search-options .repos=${repos}></cs-search-options>
    `) as SearchOptionsComponent;
    const repoSelect = el.renderRoot.querySelector('repo-select') as any;
    eq(repoSelect!.tagName.toLowerCase(), "repo-select");
    eq(repoSelect.groups, repos, "groups property passed through");
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
