// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html, TemplateResult} from "lit";
import "./repo-select.ts";
import type {RepoSelect} from "./repo-select.ts";

function selectEl(el: RepoSelect): HTMLSelectElement {
    return el.querySelector("select")!;
}

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

// mkGrouped creates a repo-select with two groups (org: alpha/beta/gamma, other: delta).
async function mkGrouped(opts?: {selected?: string[]}): Promise<RepoSelect> {
    const selected = new Set(opts?.selected ?? []);
    return (await render(html`
        <repo-select>
            <select name="repo" multiple>
                <optgroup label="github.com/org/">
                    <option value="github.com/org/alpha" ?selected=${selected.has("alpha")}>alpha</option>
                    <option value="github.com/org/beta" ?selected=${selected.has("beta")}>beta</option>
                    <option value="github.com/org/gamma" ?selected=${selected.has("gamma")}>gamma</option>
                </optgroup>
                <optgroup label="github.com/other/">
                    <option value="github.com/other/delta" ?selected=${selected.has("delta")}>delta</option>
                </optgroup>
            </select>
        </repo-select>
    `)) as RepoSelect;
}

// mkFlat creates a repo-select with ungrouped options.
async function mkFlat(n: number, allSelected = false): Promise<RepoSelect> {
    const options: TemplateResult[] = [];
    for (let i = 0; i < n; i++) {
        const name = String.fromCharCode(97 + i); // a, b, c, ...
        options.push(html`<option value=${name} ?selected=${allSelected}>${name}</option>`);
    }
    return (await render(html`
        <repo-select>
            <select name="repo" multiple>${options}</select>
        </repo-select>
    `)) as RepoSelect;
}

export async function testRepoSelectButtonText(t: T) {
    const cases = [
        {name: "none selected", selected: [] as string[], want: "(all repositories) ▾"},
        {name: "one selected", selected: ["alpha"], want: "alpha ▾"},
        {name: "two selected", selected: ["alpha", "beta"], want: "alpha, beta ▾"},
        {name: "four selected", selected: ["alpha", "beta", "gamma", "delta"], want: "alpha, beta, gamma, delta ▾"},
    ];
    for (const c of cases) {
        t.run(c.name, async () => {
            const el = await mkGrouped({selected: c.selected});
            eq(buttonText(el), c.want);
        });
    }
    t.run("count when > 4", async () => {
        const el = await mkFlat(5, true);
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
        eq(dropdownEl(el) !== null, true);
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
        eq(optionLabels(el).length, 4);
    });
}

export async function testRepoSelectInteractions(t: T) {
    t.run("toggle option updates hidden select", async () => {
        const el = await mkGrouped();
        await click(triggerButton(el));
        optionLabels(el)[0].querySelector("input")!.click();
        await (el as any).updateComplete;
        const sel = selectEl(el);
        eq(sel.options[0].selected, true, "toggled option selected");
        eq(sel.options[1].selected, false, "other option unchanged");
    });

    t.run("select all / deselect all", async () => {
        const el = await mkGrouped();
        await click(triggerButton(el));
        const [selectAll, deselectAll] = el.shadowRoot!.querySelectorAll<HTMLButtonElement>(".actions button");
        const sel = selectEl(el);

        await click(selectAll);
        const afterSelect = [...sel.options].map((o) => o.selected);
        eq(afterSelect, [true, true, true, true], "all selected");

        await click(deselectAll);
        const afterDeselect = [...sel.options].map((o) => o.selected);
        eq(afterDeselect, [false, false, false, false], "all deselected");
    });

    t.run("group header toggles group", async () => {
        const el = await mkGrouped();
        await click(triggerButton(el));
        const sel = selectEl(el);

        // Click first group header — selects org group only.
        await click(groupHeaders(el)[0]);
        eq([...sel.options].map((o) => o.selected), [true, true, true, false], "org group selected");

        // Click again — deselects org group.
        await click(groupHeaders(el)[0]);
        eq([...sel.options].map((o) => o.selected), [false, false, false, false], "org group deselected");
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
