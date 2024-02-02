/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

import jQuery from "jquery";
import h from "hyperscript";
import { View, Model, Collection } from "backbone";
import { getJSON, set } from "js-cookie";
import { isEqual, clone, keys } from "underscore";

import { Codesearch } from "./codesearch.ts";
import { init as _init, updateSelected, updateOptions } from "./repo_selector.ts";

var last_url_update = 0;

var KeyCodes = {
	SLASH_OR_QUESTION_MARK: 191,
};

function getSelectedText() {
	return window.getSelection ? window.getSelection().toString() : null;
}

function vercmp(a, b) {
	var re = /^([0-9]*)([^0-9]*)(.*)$/;
	var abits, bbits;
	var anum, bnum;
	while (a.length && b.length) {
		abits = re.exec(a);
		bbits = re.exec(b);
		if ((abits[1] === "") != (bbits[1] === "")) {
			return abits[1] ? -1 : 1;
		}
		if (abits[1] !== "") {
			anum = parseInt(abits[1]);
			bnum = parseInt(bbits[1]);
			if (anum !== bnum) return anum - bnum;
		}

		if (abits[2] !== bbits[2]) {
			return abits[2] < bbits[2] ? -1 : 1;
		}

		a = abits[3];
		b = bbits[3];
	}

	return a.length - b.length;
}

function shorten(ref) {
	var match = /^refs\/(tags|branches)\/(.*)/.exec(ref);
	if (match) return match[2];
	match = /^([0-9a-f]{8})[0-9a-f]+$/.exec(ref);
	if (match) return match[1];
	// If reference is origin/foo, assume that foo is
	// the branch name.
	match = /^origin\/(.*)/.exec(ref);
	if (match) {
		return match[1];
	}
	return ref;
}

function url(backend, tree, version, path, lno) {
	path = path.replace(/^\/+/, ""); // Trim any leading slashes
	// Tree/version/path separation is via : as tree may have slashes in it...
	// TODO: should we just URL encode it?
	var url = "/view/" + backend + "/" + encodeURIComponent(tree) + "/" + version + "/" + path;
	if (lno !== undefined) {
		url += "#L" + lno;
	}
	return url;
}

function externalUrl(url, tree, version, path, lno) {
	if (lno === undefined) {
		lno = 1;
	}

	// If {path} already has a slash in front of it, trim extra leading
	// slashes from `path` to avoid a double-slash in the URL.
	if (url.indexOf("/{path}") !== -1) {
		path = path.replace(/^\/+/, "");
	}

	// the order of these replacements is used to minimize conflicts
	url = url.replace(/{lno}/g, lno);
	url = url.replace(/{version}/g, shorten(version));
	url = url.replace(/{name}/g, tree);
	url = url.replace(/{basename}/g, tree.split("/")[1]); // E.g. "foo" in "username/foo"
	url = url.replace(/{path}/g, path);
	return url;
}

function renderLinkConfigs(linkConfigs, tree, version, path, lno) {
	linkConfigs = linkConfigs.filter(function (linkConfig) {
		return (
			!linkConfig.whitelist_pattern ||
			linkConfig.whitelist_pattern.test(encodeURIComponent(tree) + "/" + version + "/" + path)
		);
	});

	var links = linkConfigs.map(function (linkConfig) {
		return (
			<a
				className="file-action-link"
				href={externalUrl(linkConfig.url_template, tree, version, path, lno)}
				target={linkConfig.target}
			>
				{linkConfig.label}
			</a>
		);
	});
	let out = [];
	for (var i = 0; i < links.length; i++) {
		if (i > 0) {
			out.push(<span className="file-action-link-separator">\u00B7</span>);
		}
		out.push(links[i]);
	}
	return out;
}

class MatchView extends View {
	constructor(options) {
		super({
			...options,
			tagName: "div",
		});
		this.model.on("change", this.render, this);
	}

	render() {
		var div = this._render();
		this.setElement(div);
		return this;
	}
	_renderLno(n: number, isMatch: boolean) {
		var lnoStr = n.toString() + (isMatch ? ":" : "-");
		var classes = ["lno-link"];
		if (isMatch) classes.push("matchlno");
		return (
			<a className={classes.join(" ")} href={this.model.url(n)}>
				<span className="lno" aria-label={lnoStr}>
					{lnoStr}
				</span>
			</a>
		);
	}
	_render() {
		var i;
		var ctx_before = [],
			ctx_after = [];
		var lno = this.model.get("lno");
		var ctxBefore = this.model.get("context_before"),
			clip_before = this.model.get("clip_before");
		var ctxAfter = this.model.get("context_after"),
			clip_after = this.model.get("clip_after");

		var lines_to_display_before = Math.max(0, ctxBefore.length - (clip_before || 0));
		for (i = 0; i < lines_to_display_before; i++) {
			ctx_before.unshift(
				this._renderLno(lno - i - 1, false),
				<span>{this.model.get("context_before")[i]}</span>,
				<span />,
			);
		}
		var lines_to_display_after = Math.max(0, ctxAfter.length - (clip_after || 0));
		for (i = 0; i < lines_to_display_after; i++) {
			ctx_after.push(
				this._renderLno(lno + i + 1, false),
				<span>{this.model.get("context_after")[i]}</span>,
				<span />,
			);
		}
		var line = this.model.get("line");
		var bounds = this.model.get("bounds");
		var pieces = [
			line.substring(0, bounds[0]),
			line.substring(bounds[0], bounds[1]),
			line.substring(bounds[1]),
		];

		var classes = ["match"];
		if (clip_before !== undefined) classes.push("clip-before");
		if (clip_after !== undefined) classes.push("clip-after");

		var links = renderLinkConfigs(
			CodesearchUI.linkConfigs.filter(function (linkConfig) {
				return linkConfig.url_template.includes("{lno}");
			}),
			this.model.get("tree"),
			this.model.get("version"),
			this.model.get("path"),
			lno,
		);

		return (
			<div className={classes.join(" ")}>
				<div className="contents">
					{ctx_before}
					{this._renderLno(lno, true)}
					<span className="matchline">
						{pieces[0]}
						<span className="matchstr">{pieces[1]}</span>
						{pieces[2]}
					</span>
					<span className="matchlinks">{links}</span>
					{ctx_after}
				</div>
			</div>
		);
	}
}

/**
 * A Match represents a single match in the code base.
 *
 * This model wraps the JSON response from the Codesearch backend for an individual match.
 */
class Match extends Model {
	path_info() {
		var tree = this.get("tree");
		var version = this.get("version");
		var path = this.get("path");
		var backend = this.get("backend");
		return {
			backend: backend,
			id: tree + ":" + version + ":" + path,
			tree: tree,
			version: version,
			path: path,
		};
	}

	url(lno) {
		if (lno === undefined) {
			lno = this.get("lno");
		}
		return url(this.get("backend"), this.get("tree"), this.get("version"), this.get("path"), lno);
	}
}

/** A set of Matches at a single path. */
class FileGroup extends Model {
	id;
	path_info;
	matches: Match[] = [];

	constructor(path_info) {
		super();
		// The id attribute is used by collections to fetch models
		this.id = path_info.id;
		this.path_info = path_info;
	}

	add_match(match: Match) {
		this.matches.push(match);
	}

	/** Prepare the matches for rendering by clipping the context of matches to avoid duplicate
	 *  lines being displayed in the search results.
	 *
	 * This function operates under these assumptions:
	 * - The matches are all for the same file
	 * - Two matches cannot have the same line number
	 */
	process_context_overlaps() {
		if (!this.matches || this.matches.length < 2) {
			return; // We don"t have overlaps unless we have at least two things
		}

		// NOTE: The logic below requires matches to be sorted by line number.
		this.matches.sort((a, b) => a.get("lno") - b.get("lno"));

		for (var i = 1, len = this.matches.length; i < len; i++) {
			var previous_match = this.matches[i - 1],
				this_match = this.matches[i];
			var last_line_of_prev_context =
				previous_match.get("lno") + previous_match.get("context_after").length;
			var first_line_of_this_context =
				this_match.get("lno") - this_match.get("context_before").length;
			var num_intersecting_lines = last_line_of_prev_context - first_line_of_this_context + 1;
			if (num_intersecting_lines >= 0) {
				// The matches are intersecting or share a boundary.
				// Try to split the context between the previous match and this one.
				// Uneven splits should leave the latter element with the larger piece.

				// split_at will be the first line number grouped with the latter element.
				var split_at = parseInt(
					Math.ceil((previous_match.get("lno") + this_match.get("lno")) / 2.0),
					10,
				);
				if (split_at < first_line_of_this_context) {
					split_at = first_line_of_this_context;
				} else if (last_line_of_prev_context + 1 < split_at) {
					split_at = last_line_of_prev_context + 1;
				}

				var clip_for_previous = last_line_of_prev_context - (split_at - 1);
				var clip_for_this = split_at - first_line_of_this_context;
				previous_match.set("clip_after", clip_for_previous);
				this_match.set("clip_before", clip_for_this);
			} else {
				previous_match.unset("clip_after");
				this_match.unset("clip_before");
			}
		}
	}
}

/** A set of matches that are automatically grouped by path. */
class SearchResultSet extends Collection {
	add_match(match: Match) {
		var path_info = match.path_info();
		var file_group = this.get(path_info.id);
		if (!file_group) {
			file_group = new FileGroup(path_info);
			this.add(file_group);
		}
		file_group.add_match(match);
	}

	num_matches() {
		return this.reduce(function (memo, file_group) {
			return memo + file_group.matches.length;
		}, 0);
	}
}

/**
 * A FileMatch represents a single filename match in the code base.
 *
 * This model wraps the JSON response from the Codesearch backend for an individual match.
 *
 * XXX almost identical to Match
 */
class FileMatch extends Model {
	path_info() {
		var tree = this.get("tree");
		var version = this.get("version");
		var path = this.get("path");
		let backend = this.get("backend");
		return {
			backend: backend,
			id: tree + ":" + version + ":" + path,
			tree: tree,
			version: version,
			path: path,
			bounds: this.get("bounds"),
		};
	}

	url() {
		return url(this.get("backend"), this.get("tree"), this.get("version"), this.get("path"));
	}
}

class FileMatchView extends View {
	constructor(options) {
		super({
			...options,
			tagName: "div",
		});
	}

	render() {
		var path_info = this.model.path_info();
		var pieces = [
			path_info.path.substring(0, path_info.bounds[0]),
			path_info.path.substring(path_info.bounds[0], path_info.bounds[1]),
			path_info.path.substring(path_info.bounds[1]),
		];

		var el = this.$el;
		el.empty();
		el.addClass("filename-match");
		el.append(
			<a className="label header result-path" href={this.model.url()}>
				<span className="repo">{path_info.tree}:</span>
				<span className="version">{shorten(path_info.version)}:</span>
				{pieces[0]}
				<span className="matchstr">{pieces[1]}</span>
				{pieces[2]}
			</a>,
		);
		return this;
	}
}

class SearchState extends Model {
	search_map = {};
	search_results = new SearchResultSet();
	file_search_results = new Collection();
	search_id = 0;

	defaults() {
		return {
			context: true,
			displaying: null,
			error: null,
			search_type: "",
			time: null,
			why: null,
		};
	}

	constructor(opts) {
		super(opts);
		this.on("change:displaying", this.new_search, this);
	}

	new_search() {
		this.set({
			error: null,
			time: null,
			why: null,
		});
		this.search_results.reset();
		this.file_search_results.reset();
		for (var k in this.search_map) {
			if (parseInt(k) < this.get("displaying")) delete this.search_map[k];
		}
	}

	next_id() {
		return ++this.search_id;
	}

	dispatch(search) {
		var cur = this.search_map[this.get("displaying")];
		if (
			cur &&
			cur.q === search.q &&
			cur.fold_case === search.fold_case &&
			cur.regex === search.regex &&
			cur.backend === search.backend &&
			isEqual(cur.repo, search.repo)
		) {
			return false;
		}
		var id = this.next_id();
		search.id = id;
		this.search_map[id] = {
			q: search.q,
			fold_case: search.fold_case,
			regex: search.regex,
			backend: search.backend,
			repo: search.repo,
		};
		if (!search.q.length) {
			this.set("displaying", id);
			return false;
		}
		return true;
	}

	url() {
		var q = {};
		var current = this.search_map[this.get("displaying")];
		if (!current) return "/search";
		var base = "/search";

		if (current.q !== "") {
			q.q = current.q;
			q.fold_case = current.fold_case;
			q.regex = current.regex;
			q.context = this.get("context");
			q.repo = current.repo;
		}

		if (current.backend) {
			base += "/" + current.backend;
		} else if (CodesearchUI.input_backend) {
			base += "/" + CodesearchUI.input_backend.val();
		}
		var qs = jQuery.param(q);
		return base + (qs ? "?" + qs : "");
	}

	title() {
		var current = this.search_map[this.get("displaying")];
		if (!current || !current.q) return "code search";
		return current.q + " ⋅ search";
	}

	handle_error(search, error) {
		if (search === this.search_id) {
			this.set("displaying", search);
			this.set("error", error);
		}
	}

	handle_match(search, match) {
		if (search < this.get("displaying")) return false;
		this.set("displaying", search);
		var m = clone(match);
		m.backend = this.search_map[search].backend;
		this.search_results.add_match(new Match(m));
	}
	handle_file_match(search, file_match) {
		if (search < this.get("displaying")) return false;
		this.set("displaying", search);
		var fm = clone(file_match);
		fm.backend = this.search_map[search].backend;
		this.file_search_results.add(new FileMatch(fm));
	}
	handle_done(search, time, search_type, why) {
		if (search < this.get("displaying")) return false;
		this.set("displaying", search);
		this.set({ time: time, search_type: search_type, why: why });
		this.search_results.trigger("search-complete");
	}
}

class FileGroupView extends View {
	constructor(options) {
		super({
			...options,
			tagName: "div",
		});
	}

	render_header(tree, version, path) {
		var basename, dirname;
		var indexOfLastPathSep = path.lastIndexOf("/");

		if (indexOfLastPathSep !== -1) {
			basename = path.substring(indexOfLastPathSep + 1, path.length);
			dirname = path.substring(0, indexOfLastPathSep + 1);
		} else {
			basename = path; // path doesn"t contain any dir parts, only the basename
			dirname = "";
		}

		var first_match = this.model.matches[0];
		return (
			<div className="header">
				<span className="header-path">
					<a className="result-path" href={first_match.url()}>
						<span className="repo">{tree}:</span>
						<span className="version">{shorten(version)}:</span>
						{dirname}
						<span className="filename">{basename}</span>
					</a>
					<div className="header-links">
						{renderLinkConfigs(
							CodesearchUI.linkConfigs,
							tree,
							version,
							path,
							first_match.get("lno"),
						)}
					</div>
				</span>
			</div>
		);
	}

	render() {
		var matches = this.model.matches;
		var el = this.$el;
		el.empty();
		el.append(
			this.render_header(
				this.model.path_info.tree,
				this.model.path_info.version,
				this.model.path_info.path,
			),
		);
		matches.forEach(function (match) {
			el.append(new MatchView({ model: match }).render().el);
		});
		el.addClass("file-group");
		return this;
	}
}

class MatchesView extends View {
	constructor(options) {
		super({
			...options,
			tagName: "div",
			events: {
				"click .file-extension": "_limitExtension",
				keydown: "_handleKey",
			},
		});
		this.setElement(jQuery("#results"));
		this.model.search_results.on("search-complete", this.render, this);
		this.model.search_results.on("rerender", this.render, this);
	}
	render() {
		this.$el.empty();

		// Collate which file extensions (.py, .go, etc) are most common.
		// countExtension() is called for file_search_results and search_results
		var extension_map = {};
		var countExtension = function (path) {
			var r = /[^\/](\.[a-z.]{1,6})$/i;
			var match = path.match(r);
			if (match) {
				var ext = match[1];
				extension_map[ext] = extension_map[ext] ? extension_map[ext] + 1 : 1;
			}
		};

		var count = 0;
		let pathResults = [];
		this.model.file_search_results.each(function (file) {
			if (this.model.get("search_type") == "filename_only" || count < 10) {
				var view = new FileMatchView({ model: file });
				pathResults.push(view.render().el);
			}
			countExtension(file.attributes.path);
			count += 1;
		}, this);
		this.$el.append(<div className="path-results">{pathResults}</div>);

		this.model.search_results.each(function (file_group) {
			file_group.process_context_overlaps();
			var view = new FileGroupView({ model: file_group });
			this.$el.append(view.render().el);
			countExtension(file_group.path_info.path);
		}, this);

		var i = this.model.search_id;
		var query = this.model.search_map[i].q;
		var already_file_limited = /\bfile:/.test(query);
		if (!already_file_limited) this._render_extension_buttons(extension_map);

		return this;
	}
	_render_extension_buttons(extension_map) {
		// Display a series of buttons for the most common file extensions
		// among the current search results, that each narrow the search to
		// files matching that extension.
		var extension_array = [];
		for (var ext in extension_map) extension_array.push([extension_map[ext], ext]);

		if (extension_array.length < 2) return;

		extension_array.sort(function (a, b) {
			return b[0] - a[0];
		});

		var popular_extensions = [];
		var end = Math.min(extension_array.length, 5);
		for (var i = 0; i < end; i++) popular_extensions.push(extension_array[i][1]);
		popular_extensions.sort();

		var help = "Narrow to:";
		let fileExtensions = [];
		for (var i = 0; i < popular_extensions.length; i++) {
			fileExtensions.push(<button className="file-extension">{popular_extensions[i]}</button>);
		}
		this.$el.prepend(
			<div className="file-extensions">
				{help}
				{fileExtensions}
			</div>,
		);
	}
	_limitExtension(e) {
		var ext = e.target.textContent;
		var q = CodesearchUI.input.val();
		if (CodesearchUI.input_regex.is(":checked")) q = "file:\\" + ext + "$ " + q;
		else q = "file:" + ext + " " + q;
		CodesearchUI.input.val(q);
		CodesearchUI.newsearch();
	}
	_handleKey(event) {
		if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
		var which = event.which;
		if (which === KeyCodes.SLASH_OR_QUESTION_MARK) {
			var t = getSelectedText();
			if (!t) return;
			event.preventDefault();
			if (CodesearchUI.input_regex.is(":checked")) t = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // from mozilla docs

			// Make sure that the search results the user is looking at, in
			// which they"ve selected text, get persisted in their browser
			// history so that they can come back to them.
			last_url_update = 0;

			CodesearchUI.input.val(t);
			CodesearchUI.newsearch();
		}
	}
}

class ResultView extends View {
	matches_view;
	results;
	errorbox;
	time;
	last_url;
	last_title;

	constructor(opts) {
		super(opts);
		this.setElement(jQuery("#resultarea"));
		this.matches_view = new MatchesView({ model: this.model });
		this.results = this.$("#numresults");
		this.errorbox = jQuery("#regex-error");
		this.time = this.$("#searchtime");
		this.last_url = null;
		this.last_title = null;

		this.model.on("all", this.render, this);
		this.model.search_results.on("all", this.render, this);
	}

	render() {
		if (this.model.get("displaying") === null) {
			return;
		}
		if (this.model.get("error")) {
			this.errorbox.find("#errortext").text(this.model.get("error"));
			this.errorbox.show();
		} else {
			this.errorbox.hide();
		}

		var url = this.model.url();
		if (this.last_url !== url) {
			if (history.pushState) {
				var browser_url = window.location.pathname + window.location.search;
				if (browser_url !== url) {
					// If the user is typing quickly, just keep replacing the
					// current URL.  But after they"ve paused, enroll the URL they
					// paused at into their browser history.
					var now = Date.now();
					var two_seconds = 2000;
					if (this.last_url === null) {
						// If this.last_url is null, that means this is the initial
						// navigation. We should never pushState here, otherwise the
						// user will need to backspace twice to go back to the
						// previous page.
						history.replaceState(null, "", url);
					} else if (now - last_url_update > two_seconds) {
						history.pushState(null, "", url);
					} else {
						history.replaceState(null, "", url);
					}
					last_url_update = now;
				}
			}
			this.last_url = url;
		}

		var title = this.model.title();
		if (this.last_title !== title) {
			document.title = title;
			this.last_title = title;
		}

		if (this.model.search_map[this.model.get("displaying")].q === "" || this.model.get("error")) {
			this.$el.hide();
			jQuery("#helparea").show();
			return this;
		}

		jQuery("#results").toggleClass("no-context", !this.model.get("context"));

		this.$el.show();
		jQuery("#helparea").hide();

		if (this.model.get("time")) {
			this.$("#searchtimebox").show();
			var time = this.model.get("time");
			this.time.text(time + " ms");
		} else {
			this.$("#searchtimebox").hide();
		}

		var results;
		if (this.model.get("search_type") == "filename_only") {
			results = "" + this.model.file_search_results.length;
		} else {
			results = "" + this.model.search_results.num_matches();
		}
		if (this.model.get("why") !== "NONE") results = results + "+";
		this.results.text(results);

		return this;
	}
}

// TODO: this should be an instance of a singleton... maybe?
namespace CodesearchUI {
	export let repo_urls = {};
	export let defaultSearchRepos;
	export let linkConfigs;
	let state = new SearchState();
	let view: ResultView;
	export let input, input_backend, input_regex;
	let input_repos, inputs_case, input_context;
	let timer;

	export function onload() {
		if (input) return;

		view = new ResultView({ model: state });

		input = jQuery("#searchbox");
		input_repos = jQuery("#repos");
		input_backend = jQuery("#backend");
		if (input_backend.length == 0) input_backend = null;
		inputs_case = jQuery("input[name=fold_case]");
		input_regex = jQuery("input[name=regex]");
		input_context = jQuery("input[name=context]");

		if (inputs_case.filter(":checked").length == 0) {
			inputs_case.filter("[value=auto]").attr("checked", true);
		}

		_init();
		update_repo_options();

		init_query();

		input.keydown(keypress);
		input.bind("paste", keypress);
		input.focus();
		if (input_backend) input_backend.change(select_backend);

		inputs_case.change(keypress);
		input_regex.change(keypress);
		input_repos.change(keypress);
		input_context.change(toggle_context);

		input_regex.change(function () {
			set_pref("regex", input_regex.prop("checked"));
		});
		input_repos.change(function () {
			set_pref("repos", input_repos.val());
		});
		input_context.change(function () {
			set_pref("context", input_context.prop("checked"));
		});

		toggle_context();

		Codesearch.connect(CodesearchUI);
		jQuery(".query-hint code").click(function (e) {
			var ext = e.target.textContent;
			var q = input.val();
			if (
				!q.includes(ext) &&
				((ext.indexOf("-") == 0 && !q.includes(ext.substring(1))) ||
					(ext.indexOf("-") != 0 && !q.includes("-" + ext.substring)))
			) {
				q = q + " " + ext;
			}
			input.val(q);
			input.focus();
		});

		// Update the search when the user hits Forward or Back.
		window.onpopstate = function (event) {
			var parms = parse_query_params();
			init_query_from_parms(parms);
			newsearch();
		};
	}
	function toggle_context() {
		state.set("context", input_context.prop("checked"));
	}
	// Initialize query from URL or user"s saved preferences
	function init_query() {
		var parms = parse_query_params();

		var hasParms = false;
		for (var p in parms) {
			hasParms = true;
			break;
		}

		if (hasParms) {
			init_query_from_parms(parms);
		} else {
			init_controls_from_prefs();
		}

		setTimeout(keypress, 0);
	}
	function init_query_from_parms(parms) {
		var q = [];
		if (parms.q) q.push(parms.q[0]);
		if (parms.file) q.push("file:" + parms.file[0]);
		input.val(q.join(" "));

		if (parms.fold_case) {
			inputs_case.filter("[value=" + parms.fold_case[0] + "]").attr("checked", true);
		}

		if (parms.regex) {
			input_regex.prop("checked", parms.regex[0] === "true");
		}

		if (parms.context) {
			input_context.prop("checked", parms.context[0] === "true");
		}

		var backend = null;
		if (parms.backend) backend = parms.backend;
		var m;
		if ((m = new RegExp("/search/([^/]+)/?").exec(window.location.pathname))) {
			backend = m[1];
		}
		if (backend && input_backend) {
			var old_backend = input_backend.val();
			input_backend.val(backend);

			// Something (bootstrap-select?) messes with the behaviour of val() on
			// normal select elements, so that trying to set an invalid value sets
			// null, rather than leaving the value unchanged. We manually check and
			// roll back if that happens (e.g. because someone navigated to a URL
			// like "/search/bogus?q=foo").
			if (input_backend.val() === null) {
				input_backend.val(old_backend);
			}
		}

		var repos = [];
		if (parms.repo) repos = repos.concat(parms.repo);
		if (parms["repo[]"]) repos = repos.concat(parms["repo[]"]);
		updateSelected(repos);
	}
	function init_controls_from_prefs() {
		var prefs = getJSON("prefs");
		if (!prefs) {
			prefs = {};
		}
		if (prefs["regex"] !== undefined) {
			input_regex.prop("checked", prefs["regex"]);
		}
		if (prefs["repos"] !== undefined) {
			updateSelected(prefs["repos"]);
		} else if (defaultSearchRepos !== undefined) {
			updateSelected(defaultSearchRepos);
		}
		if (prefs["context"] !== undefined) {
			input_context.prop("checked", prefs["context"]);
		}
	}
	function set_pref(key: string, value: any) {
		// Load from the cookie again every time in case some other pref has been
		// changed out from under us.
		var prefs = getJSON("prefs");
		if (!prefs) {
			prefs = {};
		}
		prefs[key] = value;
		set("prefs", prefs, { expires: 36500 });
	}
	function parse_query_params() {
		var urlParams = {};
		var e,
			a = /\+/g,
			r = /([^&=]+)=?([^&]*)/g,
			d = function (s) {
				return decodeURIComponent(s.replace(a, " "));
			},
			q = window.location.search.substring(1);

		while ((e = r.exec(q))) {
			if (urlParams[d(e[1])]) {
				urlParams[d(e[1])].push(d(e[2]));
			} else {
				urlParams[d(e[1])] = [d(e[2])];
			}
		}
		return urlParams;
	}
	export function on_connect() {
		newsearch();
	}
	function select_backend() {
		if (!input_backend) return;
		update_repo_options();
		keypress();
	}
	function update_repo_options() {
		if (!input_backend) return;
		var backend = input_backend.val();
		updateOptions(keys(repo_urls[backend]));
	}
	function keypress() {
		clear_timer();
		timer = setTimeout(newsearch, 125);
	}
	export function newsearch() {
		clear_timer();
		var search = {
			q: input.val(),
			fold_case: inputs_case.filter(":checked").val(),
			regex: input_regex.is(":checked"),
			repo: input_repos.val(),
		};
		if (input_backend) search.backend = input_backend.val();
		if (state.dispatch(search)) Codesearch.new_search(search);
	}
	function clear_timer() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}
	export function error(search, error) {
		state.handle_error(search, error);
	}
	export function match(search, match) {
		state.handle_match(search, match);
	}
	export function file_match(search, file_match) {
		state.handle_file_match(search, file_match);
	}
	export function search_done(search, time, search_type, why) {
		state.handle_done(search, time, search_type, why);
	}
}

export function init(initData) {
	CodesearchUI.repo_urls = initData.repo_urls;
	CodesearchUI.defaultSearchRepos = initData.default_search_repos;
	CodesearchUI.linkConfigs = (initData.link_configs || []).map(function (link_config) {
		if (link_config.whitelist_pattern) {
			link_config.whitelist_pattern = new RegExp(link_config.whitelist_pattern);
		}
		return link_config;
	});
	CodesearchUI.onload();
}
