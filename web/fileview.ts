/**
 * Copyright 2011-2013 Nelson Elhage
 * Copyright Sergey Grankin
 * SPDX-License-Identifier: BSD-2-Clause
 */

// window.find is non-standard but supported in all browsers.
declare global {
    interface Window {
        find(string: string, caseSensitive?: boolean, backwards?: boolean): boolean;
    }
}

import "./codesearch.css";
import "./fileview.css";

function getSelectedText() {
    return window.getSelection()?.toString() || "";
}

function scrollToRange(range: {start: number; end: number}, container: Element) {
    // - If we have a single line, scroll so the element is at 1/3 of the viewport.
    // - If we have a range, try and center the range in the viewport.
    // - If the range is too tall for the viewport, fall back to the single-line behavior.
    let viewportHeight = window.innerHeight;
    let scrollOffset = Math.floor(viewportHeight / 3.0);

    let firstLine = container.querySelector("#L" + range.start) as HTMLElement | null;
    if (!firstLine) return;
    let firstRect = firstLine.getBoundingClientRect();

    if (range.start != range.end) {
        let lastLine = container.querySelector("#L" + range.end) as HTMLElement | null;
        if (lastLine) {
            let lastRect = lastLine.getBoundingClientRect();
            let rangeHeight = lastRect.top + lastRect.height - firstRect.top;
            if (rangeHeight <= viewportHeight) {
                scrollOffset = 0.5 * (viewportHeight - rangeHeight);
            } else {
                scrollOffset = firstRect.height / 2; // Stick to (almost) the top
            }
        }
    }

    window.scrollTo(0, firstRect.top + window.scrollY - scrollOffset);
}

function setHash(hash: string) {
    if (history.replaceState) {
        history.replaceState(null, "", hash);
    } else {
        location.hash = hash;
    }
}

function parseHashForLineRange(hashString: string) {
    let parseMatch = hashString.match(/#L(\d+)(?:-L?(\d+))?/);

    if (parseMatch && parseMatch.length === 3) {
        let startLine = parseInt(parseMatch[1], 10);
        let endLine = parseInt(parseMatch[2], 10);
        if (isNaN(endLine) || endLine < startLine) {
            endLine = startLine;
        }
        return {start: startLine, end: endLine};
    }

    return null;
}

function addHighlightClassesForRange(range: {start: number; end: number}, root: Element) {
    const selectors: string[] = [];
    for (let i = range.start; i <= range.end; i++) selectors.push("#L" + i);
    for (const el of root.querySelectorAll(selectors.join(","))) {
        el.classList.add("highlighted");
    }
}

function expandRangeToElement(element: HTMLElement) {
    let range = parseHashForLineRange(document.location.hash);
    if (range) {
        let elementLine = parseInt(element.id.replace("L", ""), 10);
        if (elementLine < range.start) {
            range.end = range.start;
            range.start = elementLine;
        } else {
            range.end = elementLine;
        }
        setHash("#L" + range.start + "-" + range.end);
    }
}

function init() {
    let root = document.querySelector(".file-content")!;
    let helpScreen = document.querySelector(".help-screen")!;
    if (!root || !helpScreen) return;
    // Note: the CSS and JS expect ".line-numbers" but chroma renders ".chroma-lnlinks".
    // Use both selectors until the chroma class names are aligned.
    let lineNumberContainer = root.querySelector(".line-numbers, .chroma-lnlinks");

    function doSearch(query: string, newTab = false) {
        let url = document.body.getAttribute("data-search-url-template")!.replace("{query}", encodeURIComponent(query));
        if (newTab) window.open(url);
        else window.location.href = url;
    }

    function showHelp() {
        helpScreen.classList.remove("hidden");
        // Prevent clicks inside the help screen from reaching the document dismiss handler.
        for (const child of helpScreen.children) {
            child.addEventListener("click", stopPropagation);
        }
        document.addEventListener("click", hideHelp);
    }

    function hideHelp() {
        helpScreen.classList.add("hidden");
        for (const child of helpScreen.children) {
            child.removeEventListener("click", stopPropagation);
        }
        document.removeEventListener("click", hideHelp);
    }

    function stopPropagation(event: Event) {
        event.stopImmediatePropagation();
    }

    function handleHashChange(scrollElementIntoView = true) {
        if (!lineNumberContainer) return;
        // Clear current highlights.
        for (const el of lineNumberContainer.querySelectorAll(".highlighted")) {
            el.classList.remove("highlighted");
        }

        // Highlight the current range from the hash, if any.
        let range = parseHashForLineRange(document.location.hash);
        if (range) {
            addHighlightClassesForRange(range, lineNumberContainer);
            if (scrollElementIntoView) {
                scrollToRange(range, root);
            }
        }

        // Update the external-browse link.
        let link = document.getElementById("external-link") as HTMLAnchorElement | null;
        if (link) {
            link.href = getExternalLink(link.getAttribute("data-href-template")!, range);
        }
    }

    function getLineNumber(range: {start: number; end: number} | null) {
        if (range == null) {
            // Default to first line if no lines are selected.
            return "1";
        } else if (range.start == range.end) {
            return range.start;
        } else {
            // We blindly assume the external viewer supports linking to a range.
            // GitHub doesn't, but highlights the first line, which is close enough.
            return range.start + "-" + range.end;
        }
    }

    function getExternalLink(url: string | undefined, range: {start: number; end: number} | null) {
        if (!url) {
            console.error(
                "The index file you provided does not provide repositories[x].metadata.url_pattern. External links to file sources will not work. See the README for more information on file viewing.",
            );
            return "#";
        }

        let lno = getLineNumber(range);
        return url.replace("{lno}", lno.toString());
    }

    function processKeyEvent(key: string) {
        switch (key) {
            case "Enter": {
                // Perform a new search with the selected text, if any.
                let selectedText = getSelectedText();
                if (selectedText) {
                    doSearch(selectedText, true);
                }
                return true;
            }
            case "/": {
                hideHelp();
                doSearch(getSelectedText());
                return true;
            }
            case "?": {
                showHelp();
                return true;
            }
            case "Escape": {
                // Don't swallow Escape unless the help screen is visible.
                if (helpScreen.classList.contains("hidden")) {
                    return false;
                }
                hideHelp();
                (document.getElementById("query") as HTMLElement)?.blur();
                return true;
            }
            case "v": {
                // Visually highlight the external link to indicate what happened.
                let link = document.getElementById("external-link") as HTMLAnchorElement | null;
                if (link) {
                    link.focus();
                    window.location.href = link.href;
                }
                return true;
            }
            case "n":
            case "p": {
                let selectedText = getSelectedText();
                if (selectedText) {
                    window.find(selectedText, /*case-sensitive:*/ false, /*previous:*/ key == "p");
                }
                return true;
            }
        }
        return false;
    }

    // Map action names to handlers, and hook up click/auxclick on matching elements.
    function initializeActionButtons(container: Element) {
        let ACTION_MAP: Record<string, () => void> = {
            search: () => doSearch(getSelectedText()),
            help: showHelp,
        };

        for (let actionName in ACTION_MAP) {
            let handler = ACTION_MAP[actionName];
            for (const el of container.querySelectorAll(`[data-action-name="${actionName}"]`)) {
                let listener = (event: Event) => {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    handler();
                };
                el.addEventListener("click", listener);
                el.addEventListener("auxclick", listener);
            }
        }
    }

    function showSelectionReminder() {
        for (const el of document.querySelectorAll(".without-selection")) (el as HTMLElement).style.display = "none";
        for (const el of document.querySelectorAll(".with-selection")) (el as HTMLElement).style.display = "";
    }

    function hideSelectionReminder() {
        for (const el of document.querySelectorAll(".without-selection")) (el as HTMLElement).style.display = "";
        for (const el of document.querySelectorAll(".with-selection")) (el as HTMLElement).style.display = "none";
    }

    function initializePage() {
        // Initial range detection for when the page is loaded.
        handleHashChange();

        // Allow shift-clicking links to expand the highlight range.
        lineNumberContainer?.addEventListener("click", (event) => {
            let target = (event.target as HTMLElement).closest("a");
            if (!target) return;
            event.preventDefault();
            if (event.shiftKey) {
                expandRangeToElement(target);
            } else {
                setHash(target.getAttribute("href")!);
            }
            handleHashChange(false);
        });

        window.addEventListener("hashchange", (event) => {
            event.preventDefault();
            handleHashChange();
        });

        document.addEventListener("keydown", (event) => {
            // Filter out key events when the user has focused an input field.
            if ((event.target as HTMLElement).matches("input,textarea")) return;
            // Filter out key if a modifier is pressed.
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (processKeyEvent(event.key)) event.preventDefault();
        });

        document.addEventListener("mouseup", () => {
            if (getSelectedText()) {
                showSelectionReminder();
            } else {
                hideSelectionReminder();
            }
        });

        initializeActionButtons(document.querySelector(".header .header-actions")!);
    }

    // The native browser handling of hashes in the location is to scroll
    // to the element that has a name matching the id. We want to prevent
    // this since we want to take control over scrolling ourselves, and the
    // most reliable way to do this is to hide the elements until the page
    // has loaded. We also need to defer our own scroll handling since we
    // can't access the geometry of the DOM elements until they are visible.
    setTimeout(() => {
        if (lineNumberContainer) (lineNumberContainer as HTMLElement).style.display = "block";
        initializePage();
    }, 1);
}

document.addEventListener("DOMContentLoaded", init);
