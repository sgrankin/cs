/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

// Bootstrap depends on a global jQuery existing.
// Imports are resolved at file load... so set the global jquery in a separate module.
import "./globals.ts";

import "bootstrap-select";
import "bootstrap-select/dist/css/bootstrap-select.css";
import "./bootstrap/css/bootstrap.css";
import "./bootstrap/js/bootstrap";

import "./codesearch.css";

import htmx from "htmx.org";
import jQuery from "jquery";
import {LitElement, html} from "lit";
import {customElement, property} from "lit/decorators.js";

// Re-export pure components from components.ts.
export {MatchStr, FilenameMatch, MatchLine} from "./components.ts";

htmx.config.transitions = false;
// Reload on history navigation so that the repo selector is reinits (it's mangled on HTMX processing).
htmx.config.historyReload = true;

@customElement("filter-button")
export class SearchFilterButton extends LitElement {
    @property() text: string;
    @property() rawFilter: string;
    @property() regexFilter: string;

    render() {
        return html`
            <button type="button" class="file-extension" @click="${this._apply}">
                ${this.text}
            </button>
        `;
    }
    private _apply(e: Event) {
        let input = htmx.find("#searchbox") as HTMLInputElement;
        input.value =
            (jQuery("#regex").is(":checked") ? this.regexFilter : this.rawFilter) +
            " " +
            input.value;
        htmx.trigger("#searchbox", "input");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initRepoSelector();
});

function initRepoSelector() {
    let repos = jQuery("#repos");
    repos.on("refreshed.bs.select", () => {
        let headers = jQuery(this).parent().find(".dropdown-header");
        headers.css("cursor", "pointer");
        headers.on("click", (event) => {
            event.stopPropagation();
            let optgroup = jQuery('#repos optgroup[label="' + jQuery(this).text() + '"]');
            let allSelected = !optgroup.children("option:not(:selected)").length;
            optgroup.children().prop("selected", !allSelected);
            repos.selectpicker("refresh").trigger("input");
        });
    });
    jQuery(window).on("keyup", ".bootstrap-select .bs-searchbox input", (event) => {
        if (event.key == "Enter") {
            jQuery(this).val("");
            repos.selectpicker("refresh");
        }
    });
    jQuery(window).on("keyup", (keyevent) => {
        if (keyevent.key == "Tab" && jQuery(".bootstrap-select button:focus").length) {
            repos.selectpicker("toggle");
            jQuery(".bootstrap-select .bs-searchbox input").trigger("focus");
        }
    });
}

// ============================================================================
// SSE History Management Hack
// ============================================================================
// Problem: htmx 4.0 creates a browser history entry for every Server-Sent Event message,
// which can result in hundreds of history entries for a single search (one per result).
// This breaks the back button behavior and clutters browser history.
//
// Solution: Use htmx's event system to selectively prevent history updates:
// - Allow history update for the FIRST SSE message (creates proper navigation entry)
// - Block history updates for all subsequent SSE messages (prevents spam)
// - Allow normal history updates for all non-SSE HTTP requests
//
// This maintains proper navigation behavior while fixing the SSE history spam issue.

const sseStreamsNeedingHistory = new WeakSet();

// Mark SSE streams as needing a history update when they start
document.addEventListener("htmx:before:sse:stream", (event) => {
    sseStreamsNeedingHistory.add(event.target);
});

// Remove history flag after the first SSE message is processed
document.addEventListener("htmx:after:sse:message", (event) => {
    sseStreamsNeedingHistory.delete(event.target);
});

// Selectively prevent history updates for SSE messages
document.addEventListener("htmx:before:history:update", (event) => {
    const detail = event.detail;
    const isSSEResponse = detail.response?.headers?.get?.("Content-Type")?.includes("text/event-stream");
    
    if (isSSEResponse) {
        // Allow history update only for the first message of an SSE stream
        if (sseStreamsNeedingHistory.has(detail.sourceElement)) {
            return; // Allow this history update (first message)
        } else {
            // Block subsequent SSE messages from creating history entries
            event.preventDefault();
            return false;
        }
    }
    // Allow all non-SSE history updates
});

// ============================================================================
// Safari History Hack
// ============================================================================
// After a few queries that call history.pushState, navigating to e.g. a file and then returning back causes
// Safari (not chrome), after the page is rendered from bfcache, to reload (re-verify?) the page in the background,
// but using the wrong query string! (most likely the one the page was originally loaded with)
// The result is merged in, but just the form contents -- so the query box will be set to incorrect filters.
// Instead, if we see a pageshow event that's persisted, we know we just got reloaded from the bfcache,
// so issue a reload which will preempt whatever it is Safari does.  Unfortunately it slows down navigation in Chrome.
window.addEventListener("pageshow", (event) => {
    if (event.persisted) location.reload();
});
