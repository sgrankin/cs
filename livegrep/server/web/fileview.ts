/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

import jQuery from "jquery";
import "./codesearch.css";
import "./fileview.css";
import {FileViewData} from "./api.ts";

function getSelectedText() {
    return window.getSelection()?.toString() || "";
}

function scrollToRange(range: { start: number; end: number; }, elementContainer: JQuery) {
    // - If we have a single line, scroll the viewport so that the element is
    // at 1/3 of the viewport.
    // - If we have a range, try and center the range in the viewport
    // - If the range is to high to fit in the viewport, fallback to the single
    //   element scenario for the first line
    let viewport = jQuery(window);
    let viewportHeight = viewport.height() || 0;

    let scrollOffset = Math.floor(viewportHeight / 3.0);

    let firstLineElement = elementContainer.find("#L" + range.start);
    if (!firstLineElement.length) {
        // We were given a scroll offset to a line number that doesn't exist in the page, bail
        return;
    }
    if (range.start != range.end) {
        // We have a range, try and center the entire range.
        // If it's too high for the viewport, fallback to revealing the first element.
        let lastLineElement = elementContainer.find("#L" + range.end);
        let rangeHeight =
            lastLineElement.offset().top + lastLineElement.height() - firstLineElement.offset().top;
        if (rangeHeight <= viewportHeight) {
            // Range fits in viewport, center it
            scrollOffset = 0.5 * (viewportHeight - rangeHeight);
        } else {
            scrollOffset = firstLineElement.height() / 2; // Stick to (almost) the top of the viewport
        }
    }

    viewport.scrollTop(firstLineElement.offset().top - scrollOffset);
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
        // We have a match on the regex expression
        let startLine = parseInt(parseMatch[1], 10);
        let endLine = parseInt(parseMatch[2], 10);
        if (isNaN(endLine) || endLine < startLine) {
            endLine = startLine;
        }
        return {
            start: startLine,
            end: endLine,
        };
    }

    return null;
}

function addHighlightClassesForRange(range: { start: number; end: number; }, root: JQuery) {
    let idSelectors: string[] = [];
    for (let lineNumber = range.start; lineNumber <= range.end; lineNumber++) {
        idSelectors.push("#L" + lineNumber);
    }
    root.find(idSelectors.join(",")).addClass("highlighted");
}

function expandRangeToElement(element: JQuery) {
    let range = parseHashForLineRange(document.location.hash);
    if (range) {
        let elementLine = parseInt(element.attr("id").replace("L", ""), 10);
        if (elementLine < range.start) {
            range.end = range.start;
            range.start = elementLine;
        } else {
            range.end = elementLine;
        }
        setHash("#L" + range.start + "-" + range.end);
    }
}

function init(initData: FileViewData) {
    let root = jQuery(".file-content");
    let lineNumberContainer = root.find(".line-numbers");
    let helpScreen = jQuery(".help-screen");

    function doSearch(query: string, newTab = false) {
        let url = "/search" + (query
            ? "?q=" + encodeURIComponent(query) + "&repo=" + encodeURIComponent(initData.repo_name)
            : "");

        if (newTab)
            window.open(url);
        else
            window.location.href = url;

    }

    function showHelp() {
        helpScreen
            .removeClass("hidden")
            .children()
            .on("click", function (event) {
                // Prevent clicks inside the element to reach the document
                event.stopImmediatePropagation();
                return true;
            });

        jQuery(document).on("click", hideHelp);
    }

    function hideHelp() {
        helpScreen.addClass("hidden").children().off("click");
        jQuery(document).off("click", hideHelp);
        return true;
    }

    function handleHashChange(scrollElementIntoView = true) {
        // Clear current highlights
        lineNumberContainer.find(".highlighted").removeClass("highlighted");

        // Highlight the current range from the hash, if any
        let range = parseHashForLineRange(document.location.hash);
        if (range) {
            addHighlightClassesForRange(range, lineNumberContainer);
            if (scrollElementIntoView) {
                scrollToRange(range, root);
            }
        }

        // Update the external-browse link
        jQuery("#external-link").attr("href", getExternalLink(range));
    }

    function getLineNumber(range: { start: number; end: number; } | null) {
        if (range == null) {
            // Default to first line if no lines are selected.
            return "1";
        } else if (range.start == range.end) {
            return range.start;
        } else {
            // We blindly assume that the external viewer supports linking to a
            // range of lines. Github doesn't support this, but highlights the
            // first line given, which is close enough.
            return range.start + "-" + range.end;
        }
    }

    function getExternalLink(range: { start: number; end: number; } | null) {
        let lno = getLineNumber(range);

        let repoName = initData.repo_name;
        let filePath = initData.file_path;
        let url = initData.url_pattern;

        // If url not found, warn user and fail gracefully
        if (!url) {
            // deal with both undefined and empty string
            console.error(
                "The index file you provided does not provide repositories[x].metadata.url_pattern. External links to file sources will not work. See the README for more information on file viewing.",
            );
            return;
        }

        // If {path} already has a slash in front of it, trim extra leading
        // slashes from `pathInRepo` to avoid a double-slash in the URL.
        if (url.indexOf("/{path}") !== -1) {
            filePath = filePath.replace(/^\/+/, "");
        }

        // XXX code copied
        url = url.replace("{lno}", lno.toString());
        url = url.replace("{version}", initData.commit);
        url = url.replace("{name}", repoName);
        url = url.replace("{path}", filePath);
        return url;
    }

    function processKeyEvent(key: string) {
        switch (key) {
            case "Enter": {
                // Perform a new search with the selected text, if any
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
                // Avoid swallowing the important escape key event unless we're sure we want to
                if (helpScreen.hasClass("hidden")) {
                    return false;
                }
                hideHelp();
                jQuery("#query").trigger("blur");
                return true;
            }
            case "v": {
                // Visually highlight the external link to indicate what happened
                let link = jQuery("#external-link");
                link.trigger("focus");
                window.location.href = link.attr("href") as string;
                return true;
            }
            case "n":
            case "p": {
                let selectedText = getSelectedText();
                if (selectedText) {
                    window.find(selectedText, /*case-sensitive:*/false, /*previous:*/key == "p");
                }
                return true;
            }
        }
        return false;
    }

    function initializeActionButtons(root: JQuery) {
        // Map out action name to function call, and automate the details of actually hooking up the event handling.
        let ACTION_MAP = {
            search: doSearch,
            help: showHelp,
        };

        for (let actionName in ACTION_MAP) {
            root.on(
                "click auxclick",
                '[data-action-name="' + actionName + '"]',
                // We can't use the action mapped handler directly here since the iterator (`actioName`)
                // will keep changing in the closure of the inline function.
                // Generating a click handler on the fly removes the dependency on closure which
                // makes this work as one would expect. #justjsthings.
                (function (handler) {
                    return function (event) {
                        event.preventDefault();
                        event.stopImmediatePropagation(); // Prevent immediately closing modals etc.
                        handler();
                    };
                })(ACTION_MAP[actionName]),
            );
        }
    }

    let showSelectionReminder = function () {
        jQuery(".without-selection").hide();
        jQuery(".with-selection").show();
    };

    let hideSelectionReminder = function () {
        jQuery(".without-selection").show();
        jQuery(".with-selection").hide();
    };

    function initializePage() {
        // Initial range detection for when the page is loaded
        handleHashChange();

        // Allow shift clicking links to expand the highlight range
        lineNumberContainer.on("click", "a", function (event) {
            event.preventDefault();
            if (event.shiftKey) {
                expandRangeToElement(jQuery(event.target));
            } else {
                setHash(jQuery(event.target).attr("href"));
            }
            handleHashChange(false);
        });

        jQuery(window).on("hashchange", function (event) {
            event.preventDefault();
            // The url was updated with a new range
            handleHashChange();
        });

        jQuery(document).on("keydown", event => {
            // Filter out key events when the user has focused an input field.
            if (jQuery(event.target).is("input,textarea")) return;
            // Filter out key if a modifier is pressed.
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (processKeyEvent(event.key)) event.preventDefault();
        });

        jQuery(document).on("mouseup", function () {
            let selectedText = getSelectedText();
            if (selectedText) {
                showSelectionReminder();
            } else {
                hideSelectionReminder();
            }
        });

        initializeActionButtons(jQuery(".header .header-actions"));
    }

    // The native browser handling of hashes in the location is to scroll
    // to the element that has a name matching the id. We want to prevent
    // this since we want to take control over scrolling ourselves, and the
    // most reliable way to do this is to hide the elements until the page
    // has loaded. We also need defer our own scroll handling since we can't
    // access the geometry of the DOM elements until they are visible.
    setTimeout(function () {
        lineNumberContainer.css({display: "block"});
        initializePage();
    }, 1);
}

jQuery(() => {
    init(new FileViewData((document.getElementById("data") as HTMLScriptElement).text));
});
