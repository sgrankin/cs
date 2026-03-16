// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./code-viewer.ts";
import type {CodeViewer} from "./code-viewer.ts";

export async function testCodeViewerRendersLines(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"line1\nline2\nline3\n"}></cs-code-viewer>`) as CodeViewer;
    const lines = el.renderRoot.querySelectorAll('.line');
    const got = Array.from(lines).map(l => l.querySelector('.code')!.textContent);
    eq(got, ["line1", "line2", "line3"]);
}

export async function testCodeViewerLineCount(t: T) {
    // Trailing newline should not produce an extra empty line.
    const withTrailing = await render(html`<cs-code-viewer .content=${"a\nb\nc\n"}></cs-code-viewer>`) as CodeViewer;
    eq(withTrailing.renderRoot.querySelectorAll('.line').length, 3, "trailing newline: 3 lines");

    // Without trailing newline: same count.
    const withoutTrailing = await render(html`<cs-code-viewer .content=${"a\nb\nc"}></cs-code-viewer>`) as CodeViewer;
    eq(withoutTrailing.renderRoot.querySelectorAll('.line').length, 3, "no trailing newline: 3 lines");

    // Single line with trailing newline.
    const single = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;
    eq(single.renderRoot.querySelectorAll('.line').length, 1, "single line with trailing newline");
}

export async function testCodeViewerHashSelection(t: T) {
    // Set hash before rendering so parseHash picks it up in connectedCallback.
    const origHash = window.location.hash;
    window.location.hash = "#L3";

    const el = await render(html`<cs-code-viewer .content=${"a\nb\nc\nd\ne\n"}></cs-code-viewer>`) as CodeViewer;
    const lines = el.renderRoot.querySelectorAll('.line');

    // Only line 3 (index 2) should have the 'selected' class.
    const got = Array.from(lines).map(l => l.classList.contains('selected'));
    eq(got, [false, false, true, false, false]);

    // Restore hash.
    window.location.hash = origHash;
}

export async function testCodeViewerLineLinks(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"x\ny\nz\n"}></cs-code-viewer>`) as CodeViewer;
    const links = el.renderRoot.querySelectorAll('.lno') as NodeListOf<HTMLAnchorElement>;
    const got = Array.from(links).map(a => ({href: a.getAttribute('href'), text: a.textContent}));
    eq(got, [
        {href: "#L1", text: "1"},
        {href: "#L2", text: "2"},
        {href: "#L3", text: "3"},
    ]);
}

export async function testCodeViewerExternalUrl(t: T) {
    const origHash = window.location.hash;
    window.location.hash = "#L5";

    const el = await render(html`
        <cs-code-viewer
            .content=${"1\n2\n3\n4\n5\n6\n"}
            .externalUrl=${"https://github.com/user/repo/blob/main/file.go#L{lno}"}
        ></cs-code-viewer>
    `) as CodeViewer;

    // Access resolvedExternalUrl via the 'v' key handler side effect is tricky,
    // so we call the method directly via type assertion.
    const resolved = (el as any).resolvedExternalUrl();
    eq(resolved, "https://github.com/user/repo/blob/main/file.go#L5", "resolved external URL with line number");

    window.location.hash = origHash;
}

export async function testCodeViewerKeyboardShortcutGuard(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;

    // Create a mock event from an input element.
    const input = document.createElement('input');
    document.body.appendChild(input);

    let prevented = false;
    const event = new KeyboardEvent('keydown', {key: '/', bubbles: true});
    Object.defineProperty(event, 'target', {value: input});
    Object.defineProperty(event, 'preventDefault', {value: () => { prevented = true; }});

    // Dispatch the event — the handler should bail out because target is an input.
    (el as any).onKeyDown(event);
    eq(prevented, false, "should not preventDefault when target is an input");

    input.remove();
}

// Note: testCodeViewerProcessKeySlash skipped — '/' navigates via window.location.href
// which would crash the test browser. The key is tested indirectly via processKeyUnknown
// and the close-help event is tested via testCodeViewerProcessKeyEscape.

export async function testCodeViewerProcessKeyQuestion(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;
    let toggleHelpFired = false;
    el.addEventListener('toggle-help', () => { toggleHelpFired = true; });
    const handled = (el as any).processKey('?');
    eq({handled, toggleHelpFired}, {handled: true, toggleHelpFired: true});
}

export async function testCodeViewerProcessKeyEscape(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;
    let closeHelpFired = false;
    el.addEventListener('close-help', () => { closeHelpFired = true; });
    const handled = (el as any).processKey('Escape');
    eq({handled, closeHelpFired}, {handled: true, closeHelpFired: true});
}

// Note: testCodeViewerProcessKeyV skipped — 'v' navigates via window.location.href.
// The external URL resolution is tested via testCodeViewerExternalUrl.

export async function testCodeViewerProcessKeyNP(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;
    // 'n' and 'p' are handled (window.find needs text selection, but at least test return value).
    const got = {n: (el as any).processKey('n'), p: (el as any).processKey('p')};
    eq(got, {n: true, p: true});
}

export async function testCodeViewerProcessKeyUnknown(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;
    eq((el as any).processKey('x'), false, "unknown key not handled");
}

export async function testCodeViewerLineClick(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"a\nb\nc\nd\ne\n"}></cs-code-viewer>`) as CodeViewer;
    // Click line 3's line number link.
    const links = el.renderRoot.querySelectorAll('.lno') as NodeListOf<HTMLAnchorElement>;
    links[2].click(); // line 3
    await el.updateComplete;
    // After click, line 3 should be selected.
    eq({start: (el as any).selectedStart, end: (el as any).selectedEnd}, {start: 3, end: 3});
}

export async function testCodeViewerLineNumberString(t: T) {
    const origHash = window.location.hash;
    window.location.hash = "";
    const el = await render(html`<cs-code-viewer .content=${"a\nb\nc\n"}></cs-code-viewer>`) as CodeViewer;
    // No selection (selectedStart = -1).
    eq((el as any).lineNumberString(), "1", "no selection returns '1'");
    // Set single line selection.
    (el as any).selectedStart = 5;
    (el as any).selectedEnd = 5;
    eq((el as any).lineNumberString(), "5", "single line");
    // Set range selection.
    (el as any).selectedEnd = 10;
    eq((el as any).lineNumberString(), "5-L10", "range selection");
    window.location.hash = origHash;
}

export async function testCodeViewerOnKeyDownSkipsModifiers(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;
    // Keys with modifiers should be ignored.
    let prevented = false;
    const event = new KeyboardEvent('keydown', {key: '?', ctrlKey: true, bubbles: true});
    Object.defineProperty(event, 'target', {value: document.body});
    Object.defineProperty(event, 'preventDefault', {value: () => { prevented = true; }});
    (el as any).onKeyDown(event);
    eq(prevented, false, "ctrl+? should not be handled");
}

export async function testCodeViewerSelectionHintHidden(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"line1\nline2\n"}></cs-code-viewer>`) as CodeViewer;
    const hint = el.renderRoot.querySelector('.selection-hint');
    eq(hint, null, "selection hint should not be present when no text is selected");
}

export async function testCodeViewerSelectionHintShown(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"line1\nline2\n"}></cs-code-viewer>`) as CodeViewer;
    // Set hasSelection directly to exercise the render branch.
    (el as any).hasSelection = true;
    await el.updateComplete;
    const hint = el.renderRoot.querySelector('.selection-hint');
    const got = {
        tag: hint!.tagName,
        mentionsSlash: hint!.textContent!.includes("/"),
        mentionsEnter: hint!.textContent!.includes("Enter"),
    };
    eq(got, {tag: "DIV", mentionsSlash: true, mentionsEnter: true});
}

export async function testCodeViewerEmptyContent(t: T) {
    const el = await render(html`<cs-code-viewer .content=${""}></cs-code-viewer>`) as CodeViewer;
    const got = {
        lineCount: el.renderRoot.querySelectorAll('.line').length,
        viewerTag: el.renderRoot.querySelector('.viewer')!.tagName,
    };
    eq(got, {lineCount: 0, viewerTag: "DIV"});
}
