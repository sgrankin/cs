/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

// TODO: this should be an instance of a singleton... probably?
export namespace Codesearch {
	interface Delegate {
		on_connect: () => void;
		match: (id: number, result: any) => void;
		file_match: (id: number, result: any) => void;
		search_done: (arg0: any, arg1: number, arg2: any, arg3: any) => void;
		error: (arg0: any, arg1: string) => void;
	}

	let delegate: Delegate;
	let next_search: SearchOpts | null;
	let in_flight: SearchOpts | null;

	export function connect(del: Delegate | undefined) {
		if (del !== undefined) delegate = del;
		if (delegate.on_connect) setTimeout(delegate.on_connect, 0);
	}

	type SearchOpts = {
		id: number;
		q: string;
		fold_case: boolean;
		regex: boolean;
		repo: string;
		backend?: string;
	};

	export function new_search(opts: SearchOpts) {
		next_search = opts;
		if (in_flight == null) dispatch();
	}
	async function dispatch() {
		if (!next_search) return;
		in_flight = next_search;
		next_search = null;

		var opts = in_flight;

		var url = "/api/v1/search/";
		if ("backend" in opts) {
			url = url + opts.backend;
		}
		const start = Date.now();
		try {
			let data = await jQuery.ajax({
				method: "POST",
				url: url,
				data: {
					q: opts.q,
					fold_case: opts.fold_case,
					regex: opts.regex,
					repo: opts.repo,
				},
				dataType: "json",
			});
			const elapsed = Date.now() - start;
			data.results.forEach((r) => {
				delegate.match(opts.id, r);
			});
			data.file_results.forEach((r) => {
				delegate.file_match(opts.id, r);
			});
			delegate.search_done(opts.id, elapsed, data.search_type, data.info.why);
		} catch (err) {
			let xhr = err as JQuery.jqXHR;
			console.log(xhr);
			if (xhr.status >= 400 && xhr.status < 500) {
				delegate.error(opts.id, xhr.responseJSON.error.message);
			} else {
				var message = "Cannot connect to server";
				if (xhr.status) {
					message = "Bad response " + xhr.status + " from server";
				}
				delegate.error(opts.id, message);
				console.log("server error", xhr.status, xhr.responseText);
			}
		} finally {
			in_flight = null;
			dispatch();
		}
	}
}
