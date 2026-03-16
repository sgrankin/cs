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
    const got = {
        repo: el.renderRoot.querySelector('.repo')?.textContent,
        filename: el.renderRoot.querySelector('.filename')?.textContent,
    };
    eq(got, {repo: "myrepo:", filename: "main.go"});
}

export async function testResultGroupRendersLines(t: T) {
    const el = await render(html`
        <cs-result-group .result=${sampleResult}></cs-result-group>
    `) as ResultGroup;
    const matchLines = el.renderRoot.querySelectorAll('match-line');
    // Verify line hrefs and CSS classes.
    const got = Array.from(matchLines).map(l => ({
        href: l.getAttribute('href'),
        matchHit: l.classList.contains('match-hit'),
        context: l.classList.contains('context'),
    }));
    eq(got, [
        {href: "/view/myrepo/abc123/+/src/main.go#L5", matchHit: false, context: true},
        {href: "/view/myrepo/abc123/+/src/main.go#L6", matchHit: true, context: false},
        {href: "/view/myrepo/abc123/+/src/main.go#L7", matchHit: false, context: true},
    ]);
}

export async function testResultGroupSplitsGroups(t: T) {
    const el = await render(html`
        <cs-result-group .result=${multiGroupResult}></cs-result-group>
    `) as ResultGroup;
    // Two groups separated by null -> two .match divs.
    const matchDivs = el.renderRoot.querySelectorAll('.match');
    eq(matchDivs.length, 2, "should have 2 match groups (separated by null)");
    // Extract hrefs per group.
    const got = Array.from(matchDivs).map(div =>
        Array.from(div.querySelectorAll('match-line')).map(l => l.getAttribute('href'))
    );
    eq(got, [
        ["/view/myrepo/abc123/+/src/main.go#L5", "/view/myrepo/abc123/+/src/main.go#L6"],
        ["/view/myrepo/abc123/+/src/main.go#L20", "/view/myrepo/abc123/+/src/main.go#L21"],
    ]);
}

export async function testResultGroupNoContext(t: T) {
    const el = await render(html`
        <cs-result-group .result=${sampleResult} no-context></cs-result-group>
    `) as ResultGroup;
    eq({hasAttr: el.hasAttribute('no-context'), prop: el.noContext},
       {hasAttr: true, prop: true});
    // Lines should still be in the DOM (CSS hides context lines, not JS).
    // Context lines should have the 'context' class (which CSS hides via :host([no-context]) .context).
    const matchLines = el.renderRoot.querySelectorAll('match-line');
    const got = Array.from(matchLines).map(l => ({
        context: l.classList.contains('context'),
        matchHit: l.classList.contains('match-hit'),
    }));
    eq(got, [
        {context: true, matchHit: false},
        {context: false, matchHit: true},
        {context: true, matchHit: false},
    ]);
}

export async function testResultGroupVersionTruncated(t: T) {
    const el = await render(html`
        <cs-result-group .result=${sampleResult}></cs-result-group>
    `) as ResultGroup;
    const version = el.renderRoot.querySelector('.version');
    // abc123 is 6 chars, should show full
    eq(version?.textContent, "abc123:", "short version shown");
}
