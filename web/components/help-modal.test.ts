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
    const overlay = el.renderRoot.querySelector('.overlay');
    eq(overlay!.tagName, "DIV", "overlay is a div");
    const heading = el.renderRoot.querySelector('h3');
    eq(heading!.textContent, "Keyboard shortcuts", "modal heading");
}

export async function testHelpModalShowsShortcuts(t: T) {
    const el = await render(html`<cs-help-modal open></cs-help-modal>`) as HelpModal;
    const rows = el.renderRoot.querySelectorAll('tr');
    eq(rows.length, 7, "7 keyboard shortcuts");
    // Verify each shortcut key and description.
    const kbds = Array.from(el.renderRoot.querySelectorAll('kbd')).map(k => k.textContent);
    eq(kbds[0], "/", "first shortcut key");
    eq(kbds[1], "?", "second shortcut key");
    eq(kbds[2], "v", "third shortcut key");
    eq(kbds[3], "n", "fourth shortcut key");
    eq(kbds[4], "p", "fifth shortcut key");
    eq(kbds[5], "Enter", "sixth shortcut key");
    eq(kbds[6], "Esc", "seventh shortcut key");
    // Verify descriptions.
    const descs = Array.from(rows).map(r => r.querySelectorAll('td')[1].textContent);
    eq(descs[0], "New search (or search selected text)", "/ description");
    eq(descs[6], "Close this help", "Esc description");
}

export async function testHelpModalFiresCloseEvent(t: T) {
    const el = await render(html`<cs-help-modal open></cs-help-modal>`) as HelpModal;
    let closed = false;
    el.addEventListener('close-help', () => { closed = true; });
    // Click the overlay to close.
    const overlay = el.renderRoot.querySelector('.overlay') as HTMLElement;
    overlay.click();
    eq(closed, true, "close-help event fired");
    eq(el.open, false, "open set to false");
}
