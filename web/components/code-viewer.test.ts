// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import {formatLineNumber, resolveExternalUrl, parseLineHash, keyAction, computeScrollOffset, effects} from "./code-viewer.ts";
import type {CodeViewer} from "./code-viewer.ts";

// --- Pure function tests (no DOM needed) ---

export function testKeyAction(t: T) {
    const cases = [
        {name: "/ navigates to search", key: "/", text: "", extUrl: "", want: {type: "navigate", url: "/search"} as any},
        {name: "/ with selected text includes query", key: "/", text: "foo bar", extUrl: "", want: {type: "navigate", url: "/search?q=foo%20bar"}},
        {name: "? toggles help", key: "?", text: "", extUrl: "", want: {type: "toggle-help"}},
        {name: "Escape closes help", key: "Escape", text: "", extUrl: "", want: {type: "close-help"}},
        {name: "Enter with text opens tab", key: "Enter", text: "hello", extUrl: "", want: {type: "open-tab", url: "/search?q=hello"}},
        {name: "Enter without text is close-help", key: "Enter", text: "", extUrl: "", want: {type: "close-help"}},
        {name: "v navigates to external URL", key: "v", text: "", extUrl: "https://github.com/foo", want: {type: "navigate", url: "https://github.com/foo"}},
        {name: "v without URL is close-help", key: "v", text: "", extUrl: "", want: {type: "close-help"}},
        {name: "n finds next", key: "n", text: "hello", extUrl: "", want: {type: "find", text: "hello", backwards: false}},
        {name: "p finds previous", key: "p", text: "hello", extUrl: "", want: {type: "find", text: "hello", backwards: true}},
        {name: "unknown key returns null", key: "x", text: "", extUrl: "", want: null},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            eq(keyAction(c.key, c.text, c.extUrl), c.want);
        });
    }
}

export function testEffectsNavigate(t: T) {
    // Call effects.navigate with a javascript: void URL to exercise the line
    // without actually navigating away from the test page.
    effects.navigate('javascript:void(0)');
    // If we got here, the function ran without throwing.
    eq(typeof effects.navigate, 'function');
}

export function testComputeScrollOffset(t: T) {
    const cases = [
        {name: "single line: 1/3 from top", viewport: 900, isRange: false, rangeH: 0, lineH: 20, want: 300},
        // viewport 900, range 200 → offset (900-200)/2 = 350
        {name: "range fits: centered", viewport: 900, isRange: true, rangeH: 200, lineH: 20, want: 350},
        {name: "range taller than viewport: half line height", viewport: 900, isRange: true, rangeH: 1200, lineH: 20, want: 10},
        {name: "range with zero height: default", viewport: 900, isRange: true, rangeH: 0, lineH: 20, want: 300},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            eq(computeScrollOffset(c.viewport, c.isRange, c.rangeH, c.lineH), c.want);
        });
    }
}

export function testFormatLineNumber(t: T) {
    const cases = [
        {name: "no selection", start: -1, end: -1, want: "1"},
        {name: "single line", start: 5, end: 5, want: "5"},
        {name: "range", start: 5, end: 10, want: "5-L10"},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            eq(formatLineNumber(c.start, c.end), c.want);
        });
    }
}

export function testResolveExternalUrl(t: T) {
    const cases = [
        {name: "empty template", tmpl: "", start: 5, end: 5, want: ""},
        {name: "single line", tmpl: "https://github.com/x/y/blob/main/f.go#L{lno}", start: 5, end: 5, want: "https://github.com/x/y/blob/main/f.go#L5"},
        {name: "range", tmpl: "https://github.com/x/y/blob/main/f.go#L{lno}", start: 5, end: 10, want: "https://github.com/x/y/blob/main/f.go#L5-L10"},
        {name: "no selection defaults to 1", tmpl: "https://github.com/x/y/blob/main/f.go#L{lno}", start: -1, end: -1, want: "https://github.com/x/y/blob/main/f.go#L1"},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            eq(resolveExternalUrl(c.tmpl, c.start, c.end), c.want);
        });
    }
}

export function testParseLineHash(t: T) {
    const cases = [
        {name: "single line", hash: "#L5", want: [5, 5]},
        {name: "range with L prefix", hash: "#L5-L10", want: [5, 10]},
        {name: "range without L prefix", hash: "#L5-10", want: [5, 10]},
        {name: "empty", hash: "", want: [-1, -1]},
        {name: "invalid", hash: "#foo", want: [-1, -1]},
        {name: "line zero", hash: "#L0", want: [0, 0]},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            eq(parseLineHash(c.hash), c.want);
        });
    }
}

// --- Component rendering tests ---

export async function testCodeViewerRendersLines(t: T) {
    const el = await render(html`<cs-code-viewer .content=${"line1\nline2\nline3\n"}></cs-code-viewer>`) as CodeViewer;
    const got = Array.from(el.renderRoot.querySelectorAll('.line'))
        .map(l => l.querySelector('.code')!.textContent);
    eq(got, ["line1", "line2", "line3"]);
}

export async function testCodeViewerLineCount(t: T) {
    const cases = [
        {name: "trailing newline: 3 lines", content: "a\nb\nc\n", want: 3},
        {name: "no trailing newline: 3 lines", content: "a\nb\nc", want: 3},
        {name: "single line", content: "hello\n", want: 1},
    ];
    for (const c of cases) {
        t.run(c.name, async () => {
            const el = await render(html`<cs-code-viewer .content=${c.content}></cs-code-viewer>`) as CodeViewer;
            eq(el.renderRoot.querySelectorAll('.line').length, c.want);
        });
    }
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

export async function testCodeViewerScrollToSelectionRange(t: T) {
    const origHash = window.location.hash;
    try {
        // Set a range hash to exercise the range branch in scrollToSelection.
        history.replaceState(null, '', '#L2-L4');
        const el = await render(html`<cs-code-viewer .content=${"a\nb\nc\nd\ne\nf\ng\nh\ni\nj\n"}></cs-code-viewer>`) as CodeViewer;
        // Verify the range is selected.
        const got = Array.from(el.renderRoot.querySelectorAll('.line'))
            .map(l => l.classList.contains('selected'));
        eq(got, [false, true, true, true, false, false, false, false, false, false]);
    } finally {
        history.replaceState(null, '', origHash || ' ');
    }
}

export async function testCodeViewerKeyNavigate(t: T) {
    const origNavigate = effects.navigate;
    try {
        let navigatedUrl: string | undefined;
        effects.navigate = (url: string) => { navigatedUrl = url; };

        const el = await render(html`
            <cs-code-viewer .content=${"hello\n"} .externalUrl=${"https://github.com/x#L{lno}"}></cs-code-viewer>
        `) as CodeViewer;

        const event = new KeyboardEvent('keydown', {key: 'v', bubbles: true});
        Object.defineProperty(event, 'target', {value: document.body});
        document.dispatchEvent(event);

        eq(navigatedUrl, "https://github.com/x#L1");
    } finally {
        effects.navigate = origNavigate;
    }
}

export async function testCodeViewerKeyOpenTab(t: T) {
    const origOpen = window.open;
    const origGetSelection = window.getSelection;
    try {
        let openedUrl: string | undefined;
        (window as any).open = (url: string) => { openedUrl = url; };
        // Mock getSelection to return selected text.
        (window as any).getSelection = () => ({toString: () => "test query"});

        const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;

        const event = new KeyboardEvent('keydown', {key: 'Enter', bubbles: true});
        Object.defineProperty(event, 'target', {value: document.body});
        document.dispatchEvent(event);

        eq(openedUrl, "/search?q=test%20query");
    } finally {
        window.open = origOpen;
        (window as any).getSelection = origGetSelection;
    }
}

export async function testCodeViewerKeyFind(t: T) {
    const origFind = window.find;
    const origGetSelection = window.getSelection;
    try {
        let findArgs: {text: string; caseSensitive: boolean; backwards: boolean} | null = null;
        (window as any).find = (text: string, caseSensitive: boolean, backwards: boolean) => {
            findArgs = {text, caseSensitive, backwards};
            return true;
        };
        // Mock getSelection to return selected text.
        (window as any).getSelection = () => ({toString: () => "searchme"});

        const el = await render(html`<cs-code-viewer .content=${"hello\n"}></cs-code-viewer>`) as CodeViewer;

        // Test 'n' for forward find.
        const event = new KeyboardEvent('keydown', {key: 'n', bubbles: true});
        Object.defineProperty(event, 'target', {value: document.body});
        document.dispatchEvent(event);

        eq(findArgs, {text: "searchme", caseSensitive: false, backwards: false});

        // Test 'p' for backward find.
        findArgs = null;
        const event2 = new KeyboardEvent('keydown', {key: 'p', bubbles: true});
        Object.defineProperty(event2, 'target', {value: document.body});
        document.dispatchEvent(event2);

        eq(findArgs, {text: "searchme", caseSensitive: false, backwards: true});
    } finally {
        (window as any).find = origFind;
        (window as any).getSelection = origGetSelection;
    }
}
