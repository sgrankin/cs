/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

// Bootstrap depends on a jquery.
// Imports are resolved at file load... so set the global jquery in a separate module.
import "./globals.ts"

import "bootstrap";
import "bootstrap-select";

import * as fileview from "./fileview/fileview";
import * as codesearch from "./codesearch/codesearch_ui.ts";

const pages = {
	codesearch,
	fileview,
};

$(function () {
	if (window.page) {
		pages[window.page].init(window.scriptData);
	}
});
