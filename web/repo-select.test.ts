// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./repo-select.ts";
import type {RepoSelect, RepoGroup} from "./repo-select.ts";

const GROUPED: RepoGroup[] = [
    {label: "github.com/org/", repos: ["github.com/org/alpha", "github.com/org/beta", "github.com/org/gamma"]},
    {label: "github.com/other/", repos: ["github.com/other/delta"]},
];

function triggerButton(el: RepoSelect): HTMLButtonElement {
    return el.shadowRoot!.querySelector(".trigger")!;
}

function dropdownEl(el: RepoSelect): HTMLElement | null {
    return el.shadowRoot!.querySelector(".dropdown");
}

function optionLabels(el: RepoSelect): HTMLLabelElement[] {
    return [...el.shadowRoot!.querySelectorAll<HTMLLabelElement>(".option")];
}

function groupHeaders(el: RepoSelect): HTMLElement[] {
    return [...el.shadowRoot!.querySelectorAll<HTMLElement>(".group-header")];
}

function buttonText(el: RepoSelect): string {
    return triggerButton(el).textContent!.trim().replace(/\s+/g, " ");
}

function checkedValues(el: RepoSelect): string[] {
    return optionLabels(el)
        .filter(l => l.querySelector("input")!.checked)
        .map(l => l.textContent!.trim());
}

async function click(target: HTMLElement) {
    target.click();
    await new Promise((r) => setTimeout(r, 0));
    const host = target.getRootNode() instanceof ShadowRoot ? (target.getRootNode() as ShadowRoot).host : target;
    if ("updateComplete" in host) await (host as any).updateComplete;
}

async function search(el: RepoSelect, query: string) {
    const input = el.shadowRoot!.querySelector<HTMLInputElement>(".search-input")!;
    input.value = query;
    input.dispatchEvent(new Event("input"));
    await (el as any).updateComplete;
}

async function mkGrouped(): Promise<RepoSelect> {
    return (await render(html`
        <repo-select .groups=${GROUPED}></repo-select>
    `)) as RepoSelect;
}

async function mkFlat(n: number): Promise<RepoSelect> {
    const groups: RepoGroup[] = [{
        label: "",
        repos: Array.from({length: n}, (_, i) => String.fromCharCode(97 + i)),
    }];
    return (await render(html`
        <repo-select .groups=${groups}></repo-select>
    `)) as RepoSelect;
}

export async function testRepoSelectButtonText(t: T) {
    t.run("none selected", async () => {
        const el = await mkGrouped();
        eq(buttonText(el), "(all repositories) ▾");
    });
    t.run("one selected", async () => {
        const el = await mkGrouped();
        await click(triggerButton(el));
        optionLabels(el)[0].querySelector("input")!.click();
        await (el as any).updateComplete;
        eq(buttonText(el), "alpha ▾");
    });
    t.run("count when > 4", async () => {
        const el = await mkFlat(5);
        await click(triggerButton(el));
        // Select all 5
        const selectAllBtn = el.shadowRoot!.querySelector<HTMLButtonElement>(".actions button")!;
        await click(selectAllBtn);
        eq(buttonText(el), "(5 repositories) ▾");
    });
}

export async function testRepoSelectSearch(t: T) {
    const cases = [
        {name: "by label", query: "alp", wantLabels: ["alpha"]},
        {name: "by full path", query: "other", wantLabels: ["delta"]},
        {name: "no match", query: "zzz", wantLabels: [] as string[]},
        {name: "empty query shows all", query: "", wantLabels: ["alpha", "beta", "gamma", "delta"]},
    ];
    for (const c of cases) {
        t.run(c.name, async () => {
            const el = await mkGrouped();
            await click(triggerButton(el));
            await search(el, c.query);
            const labels = optionLabels(el).map((l) => l.textContent!.trim());
            eq(labels, c.wantLabels, c.name);
        });
    }
}

export async function testRepoSelectDropdown(t: T) {
    t.run("closed by default", async () => {
        const el = await mkGrouped();
        eq(dropdownEl(el), null);
    });

    t.run("click opens", async () => {
        const el = await mkGrouped();
        await click(triggerButton(el));
        eq(dropdownEl(el)!.tagName, "DIV", "dropdown is open");
    });

    t.run("click again closes", async () => {
        const el = await mkGrouped();
        await click(triggerButton(el));
        await click(triggerButton(el));
        eq(dropdownEl(el), null);
    });

    t.run("outside click closes", async () => {
        const el = await mkGrouped();
        await click(triggerButton(el));
        document.body.click();
        await (el as any).updateComplete;
        eq(dropdownEl(el), null);
    });

    t.run("shows grouped options", async () => {
        const el = await mkGrouped();
        await click(triggerButton(el));
        const headers = groupHeaders(el).map((h) => h.textContent!.trim());
        eq(headers, ["github.com/org/", "github.com/other/"]);
        const labels = optionLabels(el).map((l) => l.textContent!.trim());
        eq(labels, ["alpha", "beta", "gamma", "delta"]);
    });
}

export async function testRepoSelectInteractions(t: T) {
    t.run("toggle option updates selectedRepos", async () => {
        const el = await mkGrouped();
        await click(triggerButton(el));
        optionLabels(el)[0].querySelector("input")!.click();
        await (el as any).updateComplete;
        eq(el.selectedRepos, ["github.com/org/alpha"]);
    });

    t.run("select all / deselect all", async () => {
        const el = await mkGrouped();
        await click(triggerButton(el));
        const [selectAll, deselectAll] = el.shadowRoot!.querySelectorAll<HTMLButtonElement>(".actions button");

        await click(selectAll);
        eq(checkedValues(el), ["alpha", "beta", "gamma", "delta"], "all selected");

        await click(deselectAll);
        eq(checkedValues(el), [], "all deselected");
    });

    t.run("group header toggles group", async () => {
        const el = await mkGrouped();
        await click(triggerButton(el));

        // Click first group header — selects org group only.
        await click(groupHeaders(el)[0]);
        eq(checkedValues(el), ["alpha", "beta", "gamma"], "org group selected");

        // Click again — deselects org group.
        await click(groupHeaders(el)[0]);
        eq(checkedValues(el), [], "org group deselected");
    });

    t.run("dispatches change event", async () => {
        const el = await mkGrouped();
        let changeCount = 0;
        el.addEventListener("change", () => changeCount++);
        await click(triggerButton(el));
        optionLabels(el)[0].querySelector("input")!.click();
        await (el as any).updateComplete;
        eq(changeCount, 1);
    });
}
