/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

import $ from "jquery";

// TODO: this should be an instance of a singleton... probably?
export namespace Codesearch {
	let delegate;
	let next_search;
	let in_flight;

	export function connect(del) {
		if (del !== undefined)
			delegate = del;
		if (delegate.on_connect)
			setTimeout(delegate.on_connect, 0)
	}

	export function new_search(opts) {
		next_search = opts;
		if (in_flight == null)
			dispatch()
	}
	function dispatch() {
		if (!next_search)
			return;
		in_flight = next_search;
		next_search = null;

		var opts = in_flight;

		var url = "/api/v1/search/";
		if ('backend' in opts) {
			url = url + opts.backend;
		}
		var q = {
			q: opts.q,
			fold_case: opts.fold_case,
			regex: opts.regex,
			repo: opts.repo
		};

		var xhr = $.ajax({
			method: 'POST',
			url: url,
			data: q,
			dataType: "json",
		});
		var start = new Date();
		xhr.done(function (data) {
			var elapsed = new Date() - start;
			data.results.forEach(function (r) {
				delegate.match(opts.id, r);
			});
			data.file_results.forEach(function (r) {
				delegate.file_match(opts.id, r);
			});
			delegate.search_done(opts.id, elapsed, data.search_type, data.info.why);
		});
		xhr.fail(function (data) {
			window._err = data;
			if (data.status >= 400 && data.status < 500) {
				var err = JSON.parse(data.responseText);
				delegate.error(opts.id, err.error.message);
			} else {
				var message = "Cannot connect to server";
				if (data.status) {
					message = "Bad response " + data.status + " from server";
				}
				delegate.error(opts.id, message);
				console.log("server error", data.status, data.responseText);
			}
		});
		xhr.always(function () {
			in_flight = null;
			setTimeout(dispatch, 0);
		});
	}
}

