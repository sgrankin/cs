// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {SearchExecutor} from "./search-executor.ts";
import type {ResultEvent, FileMatchEvent, FacetsEvent, DoneEvent} from "./api.ts";

const mkResult = (path: string): ResultEvent => ({type: 'result', path, lines: []});
const mkFile = (path: string): FileMatchEvent => ({type: 'file', path, match: [0, 3]});
const mkFacets = (): FacetsEvent => ({type: 'facets', ext: [{v: '.go', c: 5}]});
const mkDone = (): DoneEvent => ({type: 'done', time_ms: 42, total: 1, truncated: false});

export function testSearchExecutorStart(t: T) {
    t.run("sets loading, does not clear results", () => {
        const e = new SearchExecutor();
        const update = e.start();
        eq(update, {loading: true, error: null, done: null});
        // No results/files/facets keys — old values preserved.
        eq('results' in update, false);
        eq('files' in update, false);
        eq('facets' in update, false);
    });
}

export function testSearchExecutorFlush(t: T) {
    t.run("returns null when not dirty", () => {
        const e = new SearchExecutor();
        e.start();
        eq(e.flush(), null);
    });

    t.run("returns accumulated results when dirty", () => {
        const e = new SearchExecutor();
        e.start();
        e.onResult(mkResult("a"));
        e.onFile(mkFile("b"));
        const update = e.flush()!;
        eq(update.results!.length, 1);
        eq(update.files!.length, 1);
    });

    t.run("first flush clears facets", () => {
        const e = new SearchExecutor();
        e.start();
        e.onResult(mkResult("a"));
        const first = e.flush()!;
        eq(first.facets, null, "first flush clears facets");

        e.onResult(mkResult("b"));
        const second = e.flush()!;
        eq('facets' in second, false, "subsequent flushes don't touch facets");
    });

    t.run("not dirty after flush", () => {
        const e = new SearchExecutor();
        e.start();
        e.onResult(mkResult("a"));
        e.flush();
        eq(e.flush(), null, "second flush returns null");
    });

    t.run("accumulates across flushes", () => {
        const e = new SearchExecutor();
        e.start();
        e.onResult(mkResult("a"));
        e.flush();
        e.onResult(mkResult("b"));
        const update = e.flush()!;
        eq(update.results!.length, 2, "both results present");
    });
}

export function testSearchExecutorDone(t: T) {
    t.run("returns final state", () => {
        const e = new SearchExecutor();
        e.start();
        e.onResult(mkResult("a"));
        e.onFile(mkFile("b"));
        const update = e.onDone(mkDone());
        eq(update, {
            results: [mkResult("a")],
            files: [mkFile("b")],
            done: mkDone(),
            loading: false,
        });
    });
}

export function testSearchExecutorFacets(t: T) {
    t.run("applied immediately", () => {
        const e = new SearchExecutor();
        e.start();
        const update = e.onFacets(mkFacets());
        eq(update, {facets: mkFacets()});
    });
}

export function testSearchExecutorError(t: T) {
    t.run("sets error and stops loading", () => {
        const e = new SearchExecutor();
        e.start();
        const update = e.onError("network failure");
        eq(update, {error: "network failure", loading: false});
    });
}
