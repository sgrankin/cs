// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./result-group.ts";
import type {ResultGroup} from "./result-group.ts";
import type {ResultEvent} from "../api.ts";

const sampleResult: ResultEvent = {
    type: 'result',
    path: 'myrepo/abc123/+/src/main.go',
    lines: [
        [5, '// context line'],
        [6, 'func main() {', [[5, 9]]],
        [7, '}'],
    ],
};

const multiGroupResult: ResultEvent = {
    type: 'result',
    path: 'myrepo/abc123/+/src/main.go',
    lines: [
        [5, 'first match', [[0, 5]]],
        [6, 'context'],
        null,
        [20, 'second match', [[0, 6]]],
        [21, 'more context'],
    ],
};

export async function testResultGroupRendersHeader(t: T) {
    const el = await render(html`
        <cs-result-group .result=${sampleResult}></cs-result-group>
    `) as ResultGroup;
    const header = el.renderRoot.querySelector('.header');
    eq(header !== null, true, "has header");
    const link = el.renderRoot.querySelector('.result-path') as HTMLAnchorElement;
    eq(link !== null, true, "has result path link");
    eq(link.href.includes('/view/myrepo/abc123/+/src/main.go'), true, "link href");
}

export async function testResultGroupRendersPath(t: T) {
    const el = await render(html`
        <cs-result-group .result=${sampleResult}></cs-result-group>
    `) as ResultGroup;
    const repo = el.renderRoot.querySelector('.repo');
    eq(repo?.textContent, "myrepo:", "repo");
    const filename = el.renderRoot.querySelector('.filename');
    eq(filename?.textContent, "main.go", "filename");
}

export async function testResultGroupRendersLines(t: T) {
    const el = await render(html`
        <cs-result-group .result=${sampleResult}></cs-result-group>
    `) as ResultGroup;
    const matchLines = el.renderRoot.querySelectorAll('match-line');
    eq(matchLines.length, 3, "should render 3 lines");
}

export async function testResultGroupSplitsGroups(t: T) {
    const el = await render(html`
        <cs-result-group .result=${multiGroupResult}></cs-result-group>
    `) as ResultGroup;
    // Two groups separated by null → two .match divs
    const matchDivs = el.renderRoot.querySelectorAll('.match');
    eq(matchDivs.length, 2, "should have 2 match groups (separated by null)");
}

export async function testResultGroupNoContext(t: T) {
    const el = await render(html`
        <cs-result-group .result=${sampleResult} no-context></cs-result-group>
    `) as ResultGroup;
    eq(el.hasAttribute('no-context'), true, "has no-context attribute");
}

export async function testResultGroupVersionTruncated(t: T) {
    const el = await render(html`
        <cs-result-group .result=${sampleResult}></cs-result-group>
    `) as ResultGroup;
    const version = el.renderRoot.querySelector('.version');
    // abc123 is 6 chars, should show full
    eq(version?.textContent, "abc123:", "short version shown");
}
