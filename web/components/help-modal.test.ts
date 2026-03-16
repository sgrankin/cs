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
    eq(overlay !== null, true, "overlay when open");
    const modal = el.renderRoot.querySelector('.modal');
    eq(modal !== null, true, "modal content visible");
}

export async function testHelpModalShowsShortcuts(t: T) {
    const el = await render(html`<cs-help-modal open></cs-help-modal>`) as HelpModal;
    const rows = el.renderRoot.querySelectorAll('tr');
    eq(rows.length, 7, "7 keyboard shortcuts");
    const kbds = el.renderRoot.querySelectorAll('kbd');
    eq(kbds.length >= 7, true, "at least 7 kbd elements");
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
