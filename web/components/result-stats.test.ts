// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./result-stats.ts";
import type {ResultStats} from "./result-stats.ts";

export async function testResultStatsRendering(t: T) {
    const cases = [
        {name: "basic", total: 42, timeMs: 15, truncated: false, loading: false,
            wantFull: "42 matches in 15ms", wantCount: "42"},
        {name: "truncated", total: 500, timeMs: 10, truncated: true, loading: false,
            wantFull: "500+ matches in 10ms", wantCount: "500+"},
        {name: "loading", total: 0, timeMs: 0, truncated: false, loading: true,
            wantFull: "Searching..."},
        {name: "zero", total: 0, timeMs: 1, truncated: false, loading: false,
            wantFull: "0 matches in 1ms", wantCount: "0"},
    ];
    for (const c of cases) {
        t.run(c.name, async () => {
            const el = await render(html`
                <cs-result-stats .total=${c.total} .timeMs=${c.timeMs}
                    .truncated=${c.truncated} .loading=${c.loading}></cs-result-stats>
            `) as ResultStats;
            const full = el.renderRoot.querySelector('#countarea')!.textContent!.replace(/\s+/g, ' ').trim();
            eq(full, c.wantFull);
            if (c.wantCount) {
                eq(el.renderRoot.querySelector('#numresults')!.textContent, c.wantCount);
            }
        });
    }
}
