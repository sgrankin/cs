// Bootstrap depends on a jquery.
// Imports are resolved at file load... so set the global jquery in a separate module.
import "./globals.js"

import "bootstrap";
import "bootstrap-select";

import * as fileview from "./fileview/fileview";
import * as codesearch from "./codesearch/codesearch_ui.js";

pages = {
  codesearch,
  fileview,
};

$(function () {
  if (window.page) {
    pages[window.page].init(window.scriptData);
  }
});
