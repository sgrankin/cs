/**
 * Copyright 2011-2013 Nelson Elhage
 * SPDX-License-Identifier: BSD-2-Clause
 */
import jQuery from "jquery";

// TODO: this should be an instance of a singleton... probably?
export namespace Codesearch {
    interface Delegate {
        OnConnect: () => void;
        SearchDone: (id: number, reply: any) => void;
        SearchFailed: (arg0: any, arg1: string) => void;
    }

    let delegate: Delegate;
    let next_search: SearchOpts | null;
    let in_flight: SearchOpts | null;

    export function Connect(del: Delegate | undefined) {
        if (del !== undefined) delegate = del;
        if (delegate.OnConnect) setTimeout(delegate.OnConnect, 0);
    }

    type SearchOpts = {
        id: number;
        q: string;
        fold_case: boolean;
        regex: boolean;
        repo: string[];
        backend: string;
    };

    export function NewSearch(opts: SearchOpts) {
        next_search = opts;
        if (in_flight == null) dispatch();
    }

    async function dispatch() {
        if (!next_search) return;
        in_flight = next_search;
        next_search = null;

        var opts = in_flight;

        var url = "/api/v1/search/" + opts.backend;
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
            delegate.SearchDone(opts.id, data);
        } catch (err) {
            let xhr = err as jQuery.jqXHR;
            console.log(xhr);
            if (xhr.status >= 400 && xhr.status < 500) {
                delegate.SearchFailed(opts.id, xhr.responseJSON.error.message);
            } else {
                var message = "Cannot connect to server";
                if (xhr.status) {
                    message = "Bad response " + xhr.status + " from server";
                }
                delegate.SearchFailed(opts.id, message);
                console.log("server error", xhr.status, xhr.responseText);
            }
        } finally {
            in_flight = null;
            dispatch();
        }
    }
}
