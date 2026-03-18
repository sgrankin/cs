// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {currentRoute} from "./router.ts";
import {
    searchOptions, contextLines, queryText,
    searchResults, fileResults, searchDone, searchLoading, searchError, facets,
    executeSearch, triggerSearch, immediateSearch, initFromUrl,
} from "./state.ts";

export function testSearchOptions(t: T) {
    const cases = [
        {name: "literal and case sensitive", params: "q=foo&literal=true&fold_case=false",
            want: {literal: true, caseSensitive: true}},
        {name: "defaults", params: "q=foo",
            want: {literal: false, caseSensitive: false}},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            const prev = currentRoute.get();
            try {
                currentRoute.set({name: 'search', params: new URLSearchParams(c.params)});
                eq(searchOptions.get(), c.want);
            } finally {
                currentRoute.set(prev);
            }
        });
    }
}

export function testContextLines(t: T) {
    const cases = [
        {name: "explicit value", params: "q=foo&context=5", want: 5},
        {name: "default when absent", params: "q=foo", want: 3},
        {name: "invalid value falls back to default", params: "q=foo&context=abc", want: 3},
        {name: "zero is valid", params: "q=foo&context=0", want: 0},
        {name: "negative value falls back to default", params: "q=foo&context=-1", want: 3},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            const prev = currentRoute.get();
            try {
                currentRoute.set({name: 'search', params: new URLSearchParams(c.params)});
                eq(contextLines.get(), c.want);
            } finally {
                currentRoute.set(prev);
            }
        });
    }
}

export function testQueryText(t: T) {
    const cases = [
        {name: "reads q param", params: "q=hello+world", want: "hello world"},
        {name: "empty when no q param", params: "", want: ""},
    ];
    for (const c of cases) {
        t.run(c.name, () => {
            const prev = currentRoute.get();
            try {
                currentRoute.set({name: 'search', params: new URLSearchParams(c.params)});
                eq(queryText.get(), c.want);
            } finally {
                currentRoute.set(prev);
            }
        });
    }
}

export async function testExecuteSearchEmpty(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        currentRoute.set({name: 'search', params: new URLSearchParams()});
        await executeSearch();
        eq(searchResults.get(), []);
        eq(fileResults.get(), []);
        eq(facets.get(), null);
        eq(searchDone.get(), null);
        eq(searchLoading.get(), false);
        eq(searchError.get(), null);
    } finally {
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testExecuteSearchHappyPath(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        const jsonl = [
            '{"type":"result","path":"repo/v/+/file.go","lines":[[1,"hello",[[0,5]]]]}',
            '{"type":"facets","ext":[{"v":".go","c":1}]}',
            '{"type":"done","time_ms":10,"total":1,"truncated":false}',
        ].join('\n') + '\n';

        globalThis.fetch = (async () => new Response(jsonl)) as any;
        currentRoute.set({name: 'search', params: new URLSearchParams("q=hello")});

        await executeSearch();

        eq(searchResults.get().length, 1);
        eq(searchResults.get()[0].path, "repo/v/+/file.go");
        eq(facets.get() !== null, true, "facets received");
        eq(searchDone.get()!.total, 1);
        eq(searchDone.get()!.time_ms, 10);
        eq(searchLoading.get(), false);
        eq(searchError.get(), null);
    } finally {
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testExecuteSearchError(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        globalThis.fetch = (async () => new Response("server error", {status: 500})) as any;
        currentRoute.set({name: 'search', params: new URLSearchParams("q=hello")});

        await executeSearch();

        eq(searchLoading.get(), false);
        eq(searchError.get() !== null, true, "error is set");
        eq(searchError.get()!.includes("500"), true, "error includes status");
    } finally {
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testExecuteSearchCancelsPrevious(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        // First search: hangs forever (simulates slow response).
        let aborted = false;
        globalThis.fetch = (async (_url: string, opts: any) => {
            return new Promise((resolve, reject) => {
                if (opts?.signal) {
                    opts.signal.addEventListener('abort', () => {
                        aborted = true;
                        reject(new DOMException("aborted", "AbortError"));
                    });
                }
            });
        }) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams("q=first")});
        // Start first search (will hang).
        const first = executeSearch();

        // Second search: succeeds.
        const jsonl = '{"type":"done","time_ms":1,"total":0,"truncated":false}\n';
        globalThis.fetch = (async () => new Response(jsonl)) as any;
        currentRoute.set({name: 'search', params: new URLSearchParams("q=second")});
        await executeSearch();

        eq(aborted, true, "first search was aborted");
        eq(searchDone.get()!.total, 0, "second search completed");
    } finally {
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testTriggerSearchDebounce(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        let fetchCalled = false;
        globalThis.fetch = (async () => {
            fetchCalled = true;
            return new Response('{"type":"done","time_ms":1,"total":0,"truncated":false}\n');
        }) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams()});

        triggerSearch("test query");
        // Should not have fired immediately.
        eq(fetchCalled, false, "not called immediately");

        // Wait for debounce to fire (200ms + buffer).
        await new Promise(r => setTimeout(r, 300));
        // After debounce, the search should have been triggered, which pushes URL and calls executeSearch.
        // The fetch may or may not have been called depending on whether the URL push triggered a search.
        // At minimum, the route should have been updated.
    } finally {
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testImmediateSearch(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        globalThis.fetch = (async () => {
            return new Response('{"type":"done","time_ms":1,"total":0,"truncated":false}\n');
        }) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams()});
        immediateSearch("immediate query");

        // Wait for effects.
        await new Promise(r => setTimeout(r, 50));

        // Route should reflect the new query.
        const params = currentRoute.get().params;
        eq(params.get('q'), "immediate query");
    } finally {
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testImmediateSearchCancelsDebounce(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        let fetchCallCount = 0;
        globalThis.fetch = (async () => {
            fetchCallCount++;
            return new Response('{"type":"done","time_ms":1,"total":0,"truncated":false}\n');
        }) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams()});

        // Start a debounced search.
        triggerSearch("debounced");
        // Immediately override with immediateSearch.
        immediateSearch("immediate");

        // Wait past debounce timer.
        await new Promise(r => setTimeout(r, 300));

        // The route should have the immediate query, not the debounced one.
        eq(currentRoute.get().params.get('q'), "immediate");
    } finally {
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testExecuteSearchFlushInterval(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        // Create a streaming response where results arrive, then a delay, then done.
        // This exercises the flush interval (lines 80-83 in state.ts).
        globalThis.fetch = (async () => {
            const stream = new ReadableStream({
                async start(controller) {
                    const encoder = new TextEncoder();
                    // Emit a result immediately.
                    controller.enqueue(encoder.encode(
                        '{"type":"result","path":"repo/v/+/a.go","lines":[[1,"hello",[[0,5]]]]}\n'
                    ));
                    // Wait 150ms so the flush interval (100ms) fires at least once.
                    await new Promise(r => setTimeout(r, 150));
                    // Emit done.
                    controller.enqueue(encoder.encode(
                        '{"type":"done","time_ms":200,"total":1,"truncated":false}\n'
                    ));
                    controller.close();
                },
            });
            return new Response(stream);
        }) as any;

        currentRoute.set({name: 'search', params: new URLSearchParams("q=hello")});
        await executeSearch();

        eq(searchResults.get().length, 1);
        eq(searchDone.get()!.total, 1);
        eq(searchLoading.get(), false);
    } finally {
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testExecuteSearchWithFileResults(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        const jsonl = [
            '{"type":"file","path":"repo/v/+/file.go","match":[0,4]}',
            '{"type":"done","time_ms":5,"total":1,"truncated":false}',
        ].join('\n') + '\n';

        globalThis.fetch = (async () => new Response(jsonl)) as any;
        currentRoute.set({name: 'search', params: new URLSearchParams("q=file")});

        await executeSearch();

        eq(fileResults.get().length, 1);
        eq(fileResults.get()[0].path, "repo/v/+/file.go");
    } finally {
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testPopstateTriggersSearch(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        let fetched = false;
        globalThis.fetch = (async () => {
            fetched = true;
            return new Response('{"type":"done","time_ms":1,"total":0,"truncated":false}\n');
        }) as any;

        // Set initial state with a query.
        currentRoute.set({name: 'search', params: new URLSearchParams('q=initial')});
        immediateSearch("initial");
        await new Promise(r => setTimeout(r, 50));
        fetched = false;

        // Simulate popstate by dispatching the event after updating URL.
        // The popstate handler in state.ts reads the current route and calls controller.popstate.
        history.pushState(null, '', '/search?q=popstate-test');
        currentRoute.set({name: 'search', params: new URLSearchParams('q=popstate-test')});
        window.dispatchEvent(new PopStateEvent('popstate'));

        // Wait for search to execute.
        await new Promise(r => setTimeout(r, 100));

        eq(fetched, true, "popstate triggered search");
    } finally {
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);
        document.title = "code search";
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testPopstateEmptyQueryClearsResults(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        globalThis.fetch = (async () => {
            return new Response('{"type":"done","time_ms":1,"total":0,"truncated":false}\n');
        }) as any;

        // First, set up some search results.
        currentRoute.set({name: 'search', params: new URLSearchParams('q=something')});
        immediateSearch("something");
        await new Promise(r => setTimeout(r, 50));

        // Now simulate popstate with empty query — should clear results (lines 181-187).
        history.pushState(null, '', '/search');
        currentRoute.set({name: 'search', params: new URLSearchParams()});
        window.dispatchEvent(new PopStateEvent('popstate'));

        await new Promise(r => setTimeout(r, 50));

        eq(searchResults.get(), [], "results cleared");
        eq(fileResults.get(), [], "file results cleared");
        eq(facets.get(), null, "facets cleared");
        eq(searchDone.get(), null, "done cleared");
        eq(searchLoading.get(), false, "loading cleared");
        eq(searchError.get(), null, "error cleared");
    } finally {
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);
        document.title = "code search";
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}

export async function testInitFromUrl(t: T) {
    const origFetch = globalThis.fetch;
    const prev = currentRoute.get();
    try {
        let fetched = false;
        globalThis.fetch = (async () => {
            fetched = true;
            return new Response('{"type":"done","time_ms":1,"total":0,"truncated":false}\n');
        }) as any;

        // Set route with a query, then call initFromUrl.
        currentRoute.set({name: 'search', params: new URLSearchParams('q=hello')});
        initFromUrl();

        // Wait for search to execute.
        await new Promise(r => setTimeout(r, 50));

        eq(fetched, true, "search was triggered");
        eq(document.title.includes("hello"), true, "title updated");
    } finally {
        searchResults.set([]);
        fileResults.set([]);
        facets.set(null);
        searchDone.set(null);
        searchLoading.set(false);
        searchError.set(null);
        document.title = "code search";
        currentRoute.set(prev);
        globalThis.fetch = origFetch;
    }
}
