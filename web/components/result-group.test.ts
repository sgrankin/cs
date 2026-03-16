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
    const link = el.renderRoot.querySelector('.result-path') as HTMLAnchorElement;
    eq(link.getAttribute('href'), "/view/myrepo/abc123/+/src/main.go", "link href");
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
    // Verify line numbers and text attributes.
    eq(matchLines[0].getAttribute('href'), "/view/myrepo/abc123/+/src/main.go#L5", "line 1 href");
    eq(matchLines[1].getAttribute('href'), "/view/myrepo/abc123/+/src/main.go#L6", "line 2 href");
    eq(matchLines[2].getAttribute('href'), "/view/myrepo/abc123/+/src/main.go#L7", "line 3 href");
    // Line with match bounds should have match-hit class.
    eq(matchLines[1].classList.contains('match-hit'), true, "line 6 is match-hit");
    eq(matchLines[0].classList.contains('context'), true, "line 5 is context");
    eq(matchLines[2].classList.contains('context'), true, "line 7 is context");
}

export async function testResultGroupSplitsGroups(t: T) {
    const el = await render(html`
        <cs-result-group .result=${multiGroupResult}></cs-result-group>
    `) as ResultGroup;
    // Two groups separated by null -> two .match divs.
    const matchDivs = el.renderRoot.querySelectorAll('.match');
    eq(matchDivs.length, 2, "should have 2 match groups (separated by null)");
    // First group has 2 lines, second group has 2 lines.
    const group1Lines = matchDivs[0].querySelectorAll('match-line');
    eq(group1Lines.length, 2, "first group has 2 lines");
    eq(group1Lines[0].getAttribute('href'), "/view/myrepo/abc123/+/src/main.go#L5", "first group line 1 href");
    eq(group1Lines[1].getAttribute('href'), "/view/myrepo/abc123/+/src/main.go#L6", "first group line 2 href");
    const group2Lines = matchDivs[1].querySelectorAll('match-line');
    eq(group2Lines.length, 2, "second group has 2 lines");
    eq(group2Lines[0].getAttribute('href'), "/view/myrepo/abc123/+/src/main.go#L20", "second group line 1 href");
    eq(group2Lines[1].getAttribute('href'), "/view/myrepo/abc123/+/src/main.go#L21", "second group line 2 href");
}

export async function testResultGroupNoContext(t: T) {
    const el = await render(html`
        <cs-result-group .result=${sampleResult} no-context></cs-result-group>
    `) as ResultGroup;
    eq(el.hasAttribute('no-context'), true, "has no-context attribute");
    // Should still render lines.
    const matchLines = el.renderRoot.querySelectorAll('match-line');
    eq(matchLines.length, 3, "lines still rendered even with no-context");
}

export async function testResultGroupVersionTruncated(t: T) {
    const el = await render(html`
        <cs-result-group .result=${sampleResult}></cs-result-group>
    `) as ResultGroup;
    const version = el.renderRoot.querySelector('.version');
    // abc123 is 6 chars, should show full
    eq(version?.textContent, "abc123:", "short version shown");
}
