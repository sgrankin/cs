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
    // Full text includes "matches" between count and time.
    const got = {
        count: el.renderRoot.querySelector('#numresults')!.textContent,
        time: el.renderRoot.querySelector('#searchtime')!.textContent,
        full: el.renderRoot.querySelector('#countarea')!.textContent!.replace(/\s+/g, ' ').trim(),
    };
    eq(got, {count: "42", time: "15ms", full: "42 matches in 15ms"});
}

export async function testResultStatsTruncated(t: T) {
    const el = await render(html`
        <cs-result-stats .total=${500} .timeMs=${10} .truncated=${true}></cs-result-stats>
    `) as ResultStats;
    const got = {
        count: el.renderRoot.querySelector('#numresults')!.textContent,
        full: el.renderRoot.querySelector('#countarea')!.textContent!.replace(/\s+/g, ' ').trim(),
    };
    eq(got, {count: "500+", full: "500+ matches in 10ms"});
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
    const got = {
        count: el.renderRoot.querySelector('#numresults')!.textContent,
        full: el.renderRoot.querySelector('#countarea')!.textContent!.replace(/\s+/g, ' ').trim(),
    };
    eq(got, {count: "0", full: "0 matches in 1ms"});
}
