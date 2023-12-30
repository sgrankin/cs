// Bootstrap depends on a jquery.
// Imports are resolved at file load... so set the global jquery in a separate module.
import "./globals.js"

import "bootstrap";
import "bootstrap-select";

pages = {
  codesearch: require("./codesearch/codesearch_ui.js"),
  fileview: require("./fileview/fileview.js"),
};

$(function () {
  if (window.page) {
    pages[window.page].init(window.scriptData);
  }
});
