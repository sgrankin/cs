import {
  __toESM,
  require_jquery
} from "./chunk-2YGUWXKK.js";

// web/fileview.ts
var import_jquery = __toESM(require_jquery());
function getSelectedText() {
  return window.getSelection()?.toString() || "";
}
function scrollToRange(range, elementContainer) {
  let viewport = (0, import_jquery.default)(window);
  let viewportHeight = viewport.height() || 0;
  let scrollOffset = Math.floor(viewportHeight / 3);
  let firstLineElement = elementContainer.find("#L" + range.start);
  if (!firstLineElement.length) {
    return;
  }
  if (range.start != range.end) {
    let lastLineElement = elementContainer.find("#L" + range.end);
    let rangeHeight = lastLineElement.offset().top + lastLineElement.height() - firstLineElement.offset().top;
    if (rangeHeight <= viewportHeight) {
      scrollOffset = 0.5 * (viewportHeight - rangeHeight);
    } else {
      scrollOffset = firstLineElement.height() / 2;
    }
  }
  viewport.scrollTop(firstLineElement.offset().top - scrollOffset);
}
function setHash(hash) {
  if (history.replaceState) {
    history.replaceState(null, "", hash);
  } else {
    location.hash = hash;
  }
}
function parseHashForLineRange(hashString) {
  let parseMatch = hashString.match(/#L(\d+)(?:-L?(\d+))?/);
  if (parseMatch && parseMatch.length === 3) {
    let startLine = parseInt(parseMatch[1], 10);
    let endLine = parseInt(parseMatch[2], 10);
    if (isNaN(endLine) || endLine < startLine) {
      endLine = startLine;
    }
    return {
      start: startLine,
      end: endLine
    };
  }
  return null;
}
function addHighlightClassesForRange(range, root) {
  let idSelectors = [];
  for (let lineNumber = range.start; lineNumber <= range.end; lineNumber++) {
    idSelectors.push("#L" + lineNumber);
  }
  root.find(idSelectors.join(",")).addClass("highlighted");
}
function expandRangeToElement(element) {
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
function init(initData) {
  let root = (0, import_jquery.default)(".file-content");
  let lineNumberContainer = root.find(".line-numbers");
  let helpScreen = (0, import_jquery.default)(".help-screen");
  function doSearch(query, newTab = false) {
    let url = "/search" + (query ? "?q=" + encodeURIComponent(query) + "&repo=" + encodeURIComponent(initData.repo_name) : "");
    if (newTab)
      window.open(url);
    else
      window.location.href = url;
  }
  function showHelp() {
    helpScreen.removeClass("hidden").children().on("click", function(event) {
      event.stopImmediatePropagation();
      return true;
    });
    (0, import_jquery.default)(document).on("click", hideHelp);
  }
  function hideHelp() {
    helpScreen.addClass("hidden").children().off("click");
    (0, import_jquery.default)(document).off("click", hideHelp);
    return true;
  }
  function handleHashChange(scrollElementIntoView = true) {
    lineNumberContainer.find(".highlighted").removeClass("highlighted");
    let range = parseHashForLineRange(document.location.hash);
    if (range) {
      addHighlightClassesForRange(range, lineNumberContainer);
      if (scrollElementIntoView) {
        scrollToRange(range, root);
      }
    }
    (0, import_jquery.default)("#external-link").attr("href", getExternalLink(range));
  }
  function getLineNumber(range) {
    if (range == null) {
      return "1";
    } else if (range.start == range.end) {
      return range.start;
    } else {
      return range.start + "-" + range.end;
    }
  }
  function getExternalLink(range) {
    let lno = getLineNumber(range);
    let repoName = initData.repo_name;
    let filePath = initData.file_path;
    let url = initData.url_pattern;
    if (!url) {
      console.error(
        "The index file you provided does not provide repositories[x].metadata.url_pattern. External links to file sources will not work. See the README for more information on file viewing."
      );
      return;
    }
    if (url.indexOf("/{path}") !== -1) {
      filePath = filePath.replace(/^\/+/, "");
    }
    url = url.replace("{lno}", lno.toString());
    url = url.replace("{version}", initData.commit);
    url = url.replace("{name}", repoName);
    url = url.replace("{path}", filePath);
    return url;
  }
  function processKeyEvent(key) {
    switch (key) {
      case "Enter": {
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
        if (helpScreen.hasClass("hidden")) {
          return false;
        }
        hideHelp();
        (0, import_jquery.default)("#query").trigger("blur");
        return true;
      }
      case "v": {
        let link = (0, import_jquery.default)("#external-link");
        link.trigger("focus");
        window.location.href = link.attr("href");
        return true;
      }
      case "n":
      case "p": {
        let selectedText = getSelectedText();
        if (selectedText) {
          window.find(
            selectedText,
            /*case-sensitive:*/
            false,
            /*previous:*/
            key == "p"
          );
        }
        return true;
      }
    }
    return false;
  }
  function initializeActionButtons(root2) {
    let ACTION_MAP = {
      search: doSearch,
      help: showHelp
    };
    for (let actionName in ACTION_MAP) {
      root2.on(
        "click auxclick",
        '[data-action-name="' + actionName + '"]',
        // We can't use the action mapped handler directly here since the iterator (`actioName`)
        // will keep changing in the closure of the inline function.
        // Generating a click handler on the fly removes the dependency on closure which
        // makes this work as one would expect. #justjsthings.
        /* @__PURE__ */ (function(handler) {
          return function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            handler();
          };
        })(ACTION_MAP[actionName])
      );
    }
  }
  let showSelectionReminder = function() {
    (0, import_jquery.default)(".without-selection").hide();
    (0, import_jquery.default)(".with-selection").show();
  };
  let hideSelectionReminder = function() {
    (0, import_jquery.default)(".without-selection").show();
    (0, import_jquery.default)(".with-selection").hide();
  };
  function initializePage() {
    handleHashChange();
    lineNumberContainer.on("click", "a", function(event) {
      event.preventDefault();
      if (event.shiftKey) {
        expandRangeToElement((0, import_jquery.default)(event.target));
      } else {
        setHash((0, import_jquery.default)(event.target).attr("href"));
      }
      handleHashChange(false);
    });
    (0, import_jquery.default)(window).on("hashchange", function(event) {
      event.preventDefault();
      handleHashChange();
    });
    (0, import_jquery.default)(document).on("keydown", (event) => {
      if ((0, import_jquery.default)(event.target).is("input,textarea")) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (processKeyEvent(event.key)) event.preventDefault();
    });
    (0, import_jquery.default)(document).on("mouseup", function() {
      let selectedText = getSelectedText();
      if (selectedText) {
        showSelectionReminder();
      } else {
        hideSelectionReminder();
      }
    });
    initializeActionButtons((0, import_jquery.default)(".header .header-actions"));
  }
  setTimeout(function() {
    lineNumberContainer.css({ display: "block" });
    initializePage();
  }, 1);
}
(0, import_jquery.default)(() => {
  init(JSON.parse(document.getElementById("data").text));
});
//# sourceMappingURL=fileview-EO77ZDR3.js.map
