/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

// For compatibility with (our) bootstrap, we need this globally...
import jquery from "jquery";
globalThis.jQuery = jquery;

// For compatibility with html.js...
import _ from "underscore";
globalThis._ = _;
