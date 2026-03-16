// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./help-modal.ts";
import type {HelpModal} from "./help-modal.ts";

export async function testHelpModalClosedByDefault(t: T) {
    const el = await render(html`<cs-help-modal></cs-help-modal>`) as HelpModal;
    const overlay = el.renderRoot.querySelector('.overlay');
    eq(overlay, null, "no overlay when closed");
}

export async function testHelpModalOpens(t: T) {
    const el = await render(html`<cs-help-modal open></cs-help-modal>`) as HelpModal;
    const got = {
        overlayTag: el.renderRoot.querySelector('.overlay')!.tagName,
        heading: el.renderRoot.querySelector('h3')!.textContent,
    };
    eq(got, {overlayTag: "DIV", heading: "Keyboard shortcuts"});
}

export async function testHelpModalShowsShortcuts(t: T) {
    const el = await render(html`<cs-help-modal open></cs-help-modal>`) as HelpModal;
    const rows = el.renderRoot.querySelectorAll('tr');
    // Verify each shortcut key and description.
    const got = Array.from(rows).map(r => ({
        key: r.querySelector('kbd')!.textContent,
        desc: r.querySelectorAll('td')[1].textContent,
    }));
    eq(got, [
        {key: "/", desc: "New search (or search selected text)"},
        {key: "?", desc: "Toggle this help"},
        {key: "v", desc: "View at external source (GitHub)"},
        {key: "n", desc: "Next match (with text selected)"},
        {key: "p", desc: "Previous match (with text selected)"},
        {key: "Enter", desc: "Search selected text in new tab"},
        {key: "Esc", desc: "Close this help"},
    ]);
}

export async function testHelpModalFiresCloseEvent(t: T) {
    const el = await render(html`<cs-help-modal open></cs-help-modal>`) as HelpModal;
    let closed = false;
    el.addEventListener('close-help', () => { closed = true; });
    // Click the overlay to close.
    const overlay = el.renderRoot.querySelector('.overlay') as HTMLElement;
    overlay.click();
    eq({closed, open: el.open}, {closed: true, open: false});
}
