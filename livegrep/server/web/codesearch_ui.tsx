/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */

// Bootstrap depends on a global jQuery existing.
// Imports are resolved at file load... so set the global jquery in a separate module.
import "./globals.ts";

import "bootstrap-select";
import "bootstrap-select/dist/css/bootstrap-select.css";
import "./bootstrap/css/bootstrap.css";
import "./bootstrap/js/bootstrap";

import "./codesearch.css";

import "htmx.org/dist/htmx";
import jQuery from "jquery";
import {getJSON, set} from "js-cookie";

import {init as _init, updateOptions, updateSelected} from "./repo_selector.ts";

type Query = {
    q: string;
    fold_case: boolean;
    regex: boolean;
    backend: string;
    repo: string[];
};

function handleKey(event: KeyboardEvent) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
    }
    var which = event.key;
    if (which == "/" || which == "?") {
        var t = getSelectedText();
        if (!t) return;
        event.preventDefault();
        if (CodesearchUI.input_regex.is(":checked")) {
            t = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // from mozilla docs
        }

        // Make sure that the search results the user is looking at, in
        // which they"ve selected text, get persisted in their browser
        // history so that they can come back to them.
        // last_url_update = 0;

        CodesearchUI.input.val(t);
        // CodesearchUI.NewSearch();
    }
}

function getSelectedText() {
    return window.getSelection ? window.getSelection()?.toString() : null;
}

// var url = model.viewURL();
// if (browser_url !== url) {
//     // If the user is typing quickly, just keep replacing the current URL.
//     // But after they"ve paused, enroll the URL they paused at into their browser history.
//     var now = Date.now();
//     var two_seconds = 2000;
//     if (last_url[0] === "") {
//         // If this.last_url is null, that means this is the initial navigation.
//         // We should never pushState here, otherwise the user will need to
//         // backspace twice to go back to the previous page.
//         history.replaceState(null, "", url);
//     } else if (now - last_url[1] > two_seconds) {
//         history.pushState(null, "", url);
//     } else {
//         history.replaceState(null, "", url);
//     }
//     set_last_url([url, now]);

// TODO: this should be an instance of a singleton... maybe?
namespace CodesearchUI {
    export let backend_repos = {};
    export let defaultSearchRepos;
    export let linkConfigs;
    export let input, input_backend, input_regex;
    let input_repos, inputs_case, input_context;

    export function onload() {
        if (input) return;

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
        initQuery();
        updateRepoOptions();

        input.focus();
        if (input_backend) input_backend.change(selectBackend);

        input_regex.change(function () {
            setPref("regex", input_regex.prop("checked"));
        });
        input_repos.change(function () {
            setPref("repos", input_repos.val());
        });
        input_context.change(function () {
            setPref("context", input_context.prop("checked"));
        });

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
        window.onpopstate = (event) => {
            var parms = parseQueryParams();
            initQueryFromParams(parms);
        };
    }

    // Initialize query from URL or user's saved preferences.
    function initQuery() {
        var parms = parseQueryParams();

        var hasParms = false;
        for (var p in parms) {
            hasParms = true;
            break;
        }

        if (hasParms) {
            initQueryFromParams(parms);
        } else {
            initControlsFromPrefs();
        }
    }

    function initQueryFromParams(parms) {
        var q: string[] = [];
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

    function initControlsFromPrefs() {
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
        if (prefs["backend"] !== undefined && input_backend) {
            input_backend.val(prefs["backend"]);
        }
    }

    function setPref(key: string, value: any) {
        // Load from the cookie again every time in case some other pref has been
        // changed out from under us.
        var prefs = getJSON("prefs");
        if (!prefs) {
            prefs = {};
        }
        prefs[key] = value;
        set("prefs", prefs, {expires: 36500});
    }

    function parseQueryParams() {
        var urlParams = {};
        var e,
            a = /\+/g,
            r = /([^&=]+)=?([^&]*)/g,
            d = (s) => decodeURIComponent(s.replace(a, " ")),
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

    function selectBackend() {
        if (!input_backend) return;
        updateRepoOptions();
    }

    function updateRepoOptions() {
        if (!input_backend) return;
        var backend = input_backend.val();
        setPref("backend", backend);
        updateOptions(backend_repos[backend]);
    }
}

function init(initData) {
    CodesearchUI.backend_repos = initData.backend_repos;
    CodesearchUI.linkConfigs = (initData.link_configs || []).map(function (link_config) {
        if (link_config.match_regexp) {
            link_config.match_regexp = new RegExp(link_config.match_regexp);
        }
        return link_config;
    });
    CodesearchUI.onload();
}

jQuery(() => {
    init(JSON.parse(document.getElementById("data").text));
});
