// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./code-viewer.ts";
import type {CodeViewer} from "./code-viewer.ts";

export async function testCodeViewerRendersLines(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"line1\nline2\nline3\n"}></cs-code-viewer>`) as CodeViewer;
    const lines = el.renderRoot.querySelectorAll('.line');
    eq(lines.length, 3, "should render 3 lines");

    const firstCode = lines[0].querySelector('.code');
    eq(firstCode!.textContent, "line1", "first line content");

    const secondCode = lines[1].querySelector('.code');
    eq(secondCode!.textContent, "line2", "second line content");

    const thirdCode = lines[2].querySelector('.code');
    eq(thirdCode!.textContent, "line3", "third line content");
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

    // Line 3 (index 2) should have the 'selected' class.
    eq(lines[2].classList.contains('selected'), true, "line 3 is selected");
    // Other lines should not be selected.
    eq(lines[0].classList.contains('selected'), false, "line 1 not selected");
    eq(lines[1].classList.contains('selected'), false, "line 2 not selected");
    eq(lines[3].classList.contains('selected'), false, "line 4 not selected");

    // Restore hash.
    window.location.hash = origHash;
}

export async function testCodeViewerLineLinks(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"x\ny\nz\n"}></cs-code-viewer>`) as CodeViewer;
    const links = el.renderRoot.querySelectorAll('.lno') as NodeListOf<HTMLAnchorElement>;
    eq(links.length, 3, "should have 3 line number links");

    eq(links[0].getAttribute('href'), "#L1", "line 1 href");
    eq(links[1].getAttribute('href'), "#L2", "line 2 href");
    eq(links[2].getAttribute('href'), "#L3", "line 3 href");

    // Line numbers are displayed as text.
    eq(links[0].textContent, "1", "line 1 text");
    eq(links[1].textContent, "2", "line 2 text");
    eq(links[2].textContent, "3", "line 3 text");
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
    eq(handled, true, "'?' key is handled");
    eq(toggleHelpFired, true, "toggle-help event fired");
}

export async function testCodeViewerProcessKeyEscape(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;
    let closeHelpFired = false;
    el.addEventListener('close-help', () => { closeHelpFired = true; });
    const handled = (el as any).processKey('Escape');
    eq(handled, true, "Escape key is handled");
    eq(closeHelpFired, true, "close-help event fired on Escape");
}

// Note: testCodeViewerProcessKeyV skipped — 'v' navigates via window.location.href.
// The external URL resolution is tested via testCodeViewerExternalUrl.

export async function testCodeViewerProcessKeyNP(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;
    // 'n' and 'p' are handled (window.find needs text selection, but at least test return value).
    eq((el as any).processKey('n'), true, "'n' key handled");
    eq((el as any).processKey('p'), true, "'p' key handled");
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
    eq((el as any).selectedStart, 3, "selectedStart is 3");
    eq((el as any).selectedEnd, 3, "selectedEnd is 3");
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

export async function testCodeViewerEmptyContent(t: T) {
    const el = await render(html`<cs-code-viewer .content=${""}></cs-code-viewer>`) as CodeViewer;
    const lines = el.renderRoot.querySelectorAll('.line');
    eq(lines.length, 0, "empty content produces no lines");

    // The viewer div should still exist.
    const viewer = el.renderRoot.querySelector('.viewer');
    eq(viewer !== null, true, "viewer container present");
}
