// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./result-stats.ts";
import type {ResultStats} from "./result-stats.ts";

export async function testResultStatsBasic(t: T) {
    const el = await render(html`
        <cs-result-stats .total=${42} .timeMs=${15}></cs-result-stats>
    `) as ResultStats;
    const count = el.renderRoot.querySelector('#numresults');
    eq(count!.textContent, "42", "count text");
    const time = el.renderRoot.querySelector('#searchtime');
    eq(time!.textContent, "15ms", "time text");
    // Full text includes "matches" between count and time.
    const area = el.renderRoot.querySelector('#countarea')!;
    eq(area.textContent!.replace(/\s+/g, ' ').trim(), "42 matches in 15ms", "full stats text");
}

export async function testResultStatsTruncated(t: T) {
    const el = await render(html`
        <cs-result-stats .total=${500} .timeMs=${10} .truncated=${true}></cs-result-stats>
    `) as ResultStats;
    const count = el.renderRoot.querySelector('#numresults');
    eq(count!.textContent, "500+", "truncated count shows plus");
    const area = el.renderRoot.querySelector('#countarea')!;
    eq(area.textContent!.replace(/\s+/g, ' ').trim(), "500+ matches in 10ms", "full truncated text");
}

export async function testResultStatsLoading(t: T) {
    const el = await render(html`
        <cs-result-stats .loading=${true}></cs-result-stats>
    `) as ResultStats;
    const area = el.renderRoot.querySelector('#countarea');
    eq(area!.textContent, "Searching...", "loading state shows exact text");
}

export async function testResultStatsZero(t: T) {
    const el = await render(html`
        <cs-result-stats .total=${0} .timeMs=${1}></cs-result-stats>
    `) as ResultStats;
    const count = el.renderRoot.querySelector('#numresults');
    eq(count!.textContent, "0", "zero count");
    const area = el.renderRoot.querySelector('#countarea')!;
    eq(area.textContent!.replace(/\s+/g, ' ').trim(), "0 matches in 1ms", "full zero stats text");
}
