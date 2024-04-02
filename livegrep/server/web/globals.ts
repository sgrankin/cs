/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

// For compatibility with (our) bootstrap, we need this globally...
import jquery from "jquery";
globalThis.jQuery = jquery;

declare global {
	var scriptData: {
		backend_repos: {};
		default_search_repos: string[];
		link_configs: {
			match_regexp: string;
			label: string;
			url_template: string;
			target: string;
		}[];
	};
}
