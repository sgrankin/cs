// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import {formatLineNumber, resolveExternalUrl, parseLineHash, keyAction, computeScrollOffset} from "./code-viewer.ts";
import type {CodeViewer} from "./code-viewer.ts";

// --- Pure function tests (no DOM needed) ---

export function testKeyAction(t: T) {
    t.run("/ navigates to search", () => {
        eq(keyAction("/", "", ""), {type: "navigate", url: "/search"});
    });
    t.run("/ with selected text includes query", () => {
        eq(keyAction("/", "foo bar", ""), {type: "navigate", url: "/search?q=foo%20bar"});
    });
    t.run("? toggles help", () => {
        eq(keyAction("?", "", ""), {type: "toggle-help"});
    });
    t.run("Escape closes help", () => {
        eq(keyAction("Escape", "", ""), {type: "close-help"});
    });
    t.run("Enter with text opens tab", () => {
        eq(keyAction("Enter", "hello", ""), {type: "open-tab", url: "/search?q=hello"});
    });
    t.run("Enter without text is close-help", () => {
        eq(keyAction("Enter", "", ""), {type: "close-help"});
    });
    t.run("v navigates to external URL", () => {
        eq(keyAction("v", "", "https://github.com/foo"), {type: "navigate", url: "https://github.com/foo"});
    });
    t.run("v without URL is close-help", () => {
        eq(keyAction("v", "", ""), {type: "close-help"});
    });
    t.run("n finds next", () => {
        eq(keyAction("n", "hello", ""), {type: "find", text: "hello", backwards: false});
    });
    t.run("p finds previous", () => {
        eq(keyAction("p", "hello", ""), {type: "find", text: "hello", backwards: true});
    });
    t.run("unknown key returns null", () => {
        eq(keyAction("x", "", ""), null);
    });
}

export function testComputeScrollOffset(t: T) {
    t.run("single line: 1/3 from top", () => {
        eq(computeScrollOffset(900, false, 0, 20), 300);
    });
    t.run("range fits: centered", () => {
        // viewport 900, range 200 → offset (900-200)/2 = 350
        eq(computeScrollOffset(900, true, 200, 20), 350);
    });
    t.run("range taller than viewport: half line height", () => {
        eq(computeScrollOffset(900, true, 1200, 20), 10);
    });
    t.run("range with zero height: default", () => {
        eq(computeScrollOffset(900, true, 0, 20), 300);
    });
}

export function testFormatLineNumber(t: T) {
    eq(formatLineNumber(-1, -1), "1", "no selection");
    eq(formatLineNumber(5, 5), "5", "single line");
    eq(formatLineNumber(5, 10), "5-L10", "range");
}

export function testResolveExternalUrl(t: T) {
    eq(resolveExternalUrl("", 5, 5), "", "empty template");
    eq(resolveExternalUrl("https://github.com/x/y/blob/main/f.go#L{lno}", 5, 5),
       "https://github.com/x/y/blob/main/f.go#L5", "single line");
    eq(resolveExternalUrl("https://github.com/x/y/blob/main/f.go#L{lno}", 5, 10),
       "https://github.com/x/y/blob/main/f.go#L5-L10", "range");
    eq(resolveExternalUrl("https://github.com/x/y/blob/main/f.go#L{lno}", -1, -1),
       "https://github.com/x/y/blob/main/f.go#L1", "no selection defaults to 1");
}

export function testParseLineHash(t: T) {
    eq(parseLineHash("#L5"), [5, 5], "single line");
    eq(parseLineHash("#L5-L10"), [5, 10], "range with L prefix");
    eq(parseLineHash("#L5-10"), [5, 10], "range without L prefix");
    eq(parseLineHash(""), [-1, -1], "empty");
    eq(parseLineHash("#foo"), [-1, -1], "invalid");
    eq(parseLineHash("#L0"), [0, 0], "line zero");
}

// --- Component rendering tests ---

export async function testCodeViewerRendersLines(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"line1\nline2\nline3\n"}></cs-code-viewer>`) as CodeViewer;
    const got = Array.from(el.renderRoot.querySelectorAll('.line'))
        .map(l => l.querySelector('.code')!.textContent);
    eq(got, ["line1", "line2", "line3"]);
}

export async function testCodeViewerLineCount(t: T) {
    const count = async (content: string) => {
        const el = await render(html`<cs-code-viewer .content=${content}></cs-code-viewer>`) as CodeViewer;
        return el.renderRoot.querySelectorAll('.line').length;
    };
    eq(await count("a\nb\nc\n"), 3, "trailing newline: 3 lines");
    eq(await count("a\nb\nc"), 3, "no trailing newline: 3 lines");
    eq(await count("hello\n"), 1, "single line");
}

export async function testCodeViewerHashSelection(t: T) {
    const origHash = window.location.hash;
    try {
        // Use replaceState to set hash synchronously before element connects.
        history.replaceState(null, '', '#L3');
        const el = await render(html`<cs-code-viewer .content=${"a\nb\nc\nd\ne\n"}></cs-code-viewer>`) as CodeViewer;
        const got = Array.from(el.renderRoot.querySelectorAll('.line'))
            .map(l => l.classList.contains('selected'));
        eq(got, [false, false, true, false, false]);
    } finally {
        history.replaceState(null, '', origHash || ' ');
    }
}

export async function testCodeViewerLineLinks(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"x\ny\nz\n"}></cs-code-viewer>`) as CodeViewer;
    const got = Array.from(el.renderRoot.querySelectorAll('.lno') as NodeListOf<HTMLAnchorElement>)
        .map(a => ({href: a.getAttribute('href'), text: a.textContent}));
    eq(got, [
        {href: "#L1", text: "1"},
        {href: "#L2", text: "2"},
        {href: "#L3", text: "3"},
    ]);
}

export async function testCodeViewerExternalUrlMethod(t: T) {
    const origHash = window.location.hash;
    try {
        // Use replaceState to set hash synchronously before element connects.
        history.replaceState(null, '', '#L5');
        const el = await render(html`
            <cs-code-viewer
                .content=${"1\n2\n3\n4\n5\n6\n"}
                .externalUrl=${"https://github.com/user/repo/blob/main/file.go#L{lno}"}
            ></cs-code-viewer>
        `) as CodeViewer;
        eq(el.resolvedExternalUrl(), "https://github.com/user/repo/blob/main/file.go#L5");
    } finally {
        history.replaceState(null, '', origHash || ' ');
    }
}

// --- Keyboard shortcut tests (behavioral: dispatch event, check side effect) ---

export async function testCodeViewerKeyQuestionTogglesHelp(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;
    let toggleFired = false;
    el.addEventListener('toggle-help', () => { toggleFired = true; });
    // Dispatch keydown on document (where the component listens).
    const event = new KeyboardEvent('keydown', {key: '?', bubbles: true});
    Object.defineProperty(event, 'target', {value: document.body});
    document.dispatchEvent(event);
    eq(toggleFired, true, "toggle-help event fired");
}

export async function testCodeViewerKeyEscapeClosesHelp(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;
    let closeFired = false;
    el.addEventListener('close-help', () => { closeFired = true; });
    const event = new KeyboardEvent('keydown', {key: 'Escape', bubbles: true});
    Object.defineProperty(event, 'target', {value: document.body});
    document.dispatchEvent(event);
    eq(closeFired, true, "close-help event fired");
}

// testCodeViewerKeyIgnoredInInput: needs Playwright — can't fake event.target
// in document-level keydown listeners from unit tests.

export async function testCodeViewerKeyIgnoredWithModifier(t: T) {
    await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;
    let prevented = false;
    const event = new KeyboardEvent('keydown', {key: '?', ctrlKey: true, bubbles: true});
    Object.defineProperty(event, 'target', {value: document.body});
    Object.defineProperty(event, 'preventDefault', {value: () => { prevented = true; }});
    document.dispatchEvent(event);
    eq(prevented, false, "ctrl+? not handled");
}

// --- Line click test (behavioral: click, check rendered state) ---

export async function testCodeViewerLineClick(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"a\nb\nc\nd\ne\n"}></cs-code-viewer>`) as CodeViewer;
    const links = el.renderRoot.querySelectorAll('.lno') as NodeListOf<HTMLAnchorElement>;
    links[2].click(); // click line 3
    await el.updateComplete;
    // Line 3 should now be selected (has 'selected' class).
    const got = Array.from(el.renderRoot.querySelectorAll('.line'))
        .map(l => l.classList.contains('selected'));
    eq(got, [false, false, true, false, false]);
}

// --- Selection hint tests ---

export async function testCodeViewerSelectionHintHidden(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"line1\nline2\n"}></cs-code-viewer>`) as CodeViewer;
    eq(el.renderRoot.querySelector('.selection-hint'), null, "no hint without selection");
}

export async function testCodeViewerSelectionHintShown(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"line1\nline2\n"}></cs-code-viewer>`) as CodeViewer;
    // Simulate selection state change.
    (el as any).hasSelection = true; // No behavioral alternative without Playwright.
    await el.updateComplete;
    const hint = el.renderRoot.querySelector('.selection-hint')!;
    eq(hint.textContent!.includes("/"), true, "hint shows / shortcut");
    eq(hint.textContent!.includes("Enter"), true, "hint shows Enter shortcut");
}

// --- Empty content ---

export async function testCodeViewerEmptyContent(t: T) {
    const el = await render(html`<cs-code-viewer .content=${""}></cs-code-viewer>`) as CodeViewer;
    eq(el.renderRoot.querySelectorAll('.line').length, 0, "no lines");
    eq(el.renderRoot.querySelector('.viewer')!.tagName, "DIV", "viewer container exists");
}

export async function testCodeViewerShiftClickRange(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"a\nb\nc\nd\ne\n"}></cs-code-viewer>`) as CodeViewer;
    const links = el.renderRoot.querySelectorAll('.lno') as NodeListOf<HTMLAnchorElement>;

    // Click line 1 to select it.
    links[0].click();
    await el.updateComplete;

    // Shift+click line 3 to extend the range.
    links[2].dispatchEvent(new MouseEvent('click', {shiftKey: true, bubbles: true}));
    await el.updateComplete;

    const got = Array.from(el.renderRoot.querySelectorAll('.line'))
        .map(l => l.classList.contains('selected'));
    eq(got, [true, true, true, false, false]);
}

export async function testCodeViewerOnSelectionChange(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"hello world\n"}></cs-code-viewer>`) as CodeViewer;
    // Initially no selection hint.
    eq(el.renderRoot.querySelector('.selection-hint'), null, "no hint initially");

    // Fire selectionchange to trigger onSelectionChange. Since we can't create a real
    // text selection easily, we verify the event handler path by dispatching the event.
    // The handler checks window.getSelection() which returns empty, so hasSelection stays false.
    document.dispatchEvent(new Event('selectionchange'));
    await el.updateComplete;
    eq(el.renderRoot.querySelector('.selection-hint'), null, "still no hint with empty selection");
}
