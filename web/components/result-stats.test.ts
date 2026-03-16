// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render, serialize} from "@testing/harness";
import {html} from "lit";
import "./result-stats.ts";
import type {ResultStats} from "./result-stats.ts";

export async function testResultStatsBasic(t: T) {
    const el = await render(html`
        <cs-result-stats .total=${42} .timeMs=${15}></cs-result-stats>
    `) as ResultStats;
    const text = el.renderRoot.textContent ?? '';
    eq(text.includes("42"), true, "should show count");
    eq(text.includes("matches"), true, "should show 'matches'");
    eq(text.includes("15ms"), true, "should show time");
}

export async function testResultStatsTruncated(t: T) {
    const el = await render(html`
        <cs-result-stats .total=${500} .timeMs=${10} .truncated=${true}></cs-result-stats>
    `) as ResultStats;
    const text = el.renderRoot.textContent ?? '';
    eq(text.includes("500+"), true, "truncated should show +");
}

export async function testResultStatsLoading(t: T) {
    const el = await render(html`
        <cs-result-stats .loading=${true}></cs-result-stats>
    `) as ResultStats;
    const text = el.renderRoot.textContent ?? '';
    eq(text.includes("Searching"), true, "loading state");
}

export async function testResultStatsZero(t: T) {
    const el = await render(html`
        <cs-result-stats .total=${0} .timeMs=${1}></cs-result-stats>
    `) as ResultStats;
    const text = el.renderRoot.textContent ?? '';
    eq(text.includes("0"), true, "zero results");
    eq(text.includes("matches"), true, "still shows 'matches'");
}
