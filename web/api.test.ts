// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq} from "@testing/harness";
import {readJSONLines, searchStream, splitResultPath, type SearchEvent, type SearchCallbacks, type ResultEvent, type FileMatchEvent, type FacetsEvent, type DoneEvent} from "./api.ts";

function makeStream(text: string): ReadableStream<Uint8Array> {
    const encoder = new TextEncoder();
    return new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(text));
            controller.close();
        },
    });
}

function makeChunkedStream(chunks: string[]): ReadableStream<Uint8Array> {
    const encoder = new TextEncoder();
    return new ReadableStream({
        start(controller) {
            for (const chunk of chunks) {
                controller.enqueue(encoder.encode(chunk));
            }
            controller.close();
        },
    });
}

export async function testReadJSONLines(t: T) {
    t.run("single line", async () => {
        const events: SearchEvent[] = [];
        await readJSONLines<SearchEvent>(
            makeStream('{"type":"done","time_ms":5,"total":0,"truncated":false}\n'),
            (e) => events.push(e),
        );
        eq(events.length, 1);
        eq(events[0].type, "done");
        eq((events[0] as DoneEvent).time_ms, 5);
    });

    t.run("multiple lines", async () => {
        const events: SearchEvent[] = [];
        const jsonl = [
            '{"type":"result","path":"repo/v/+/file.go","lines":[[1,"hello",[[0,5]]]]}',
            '{"type":"facets","ext":[{"v":".go","c":1}]}',
            '{"type":"done","time_ms":10,"total":1,"truncated":false}',
        ].join('\n') + '\n';
        await readJSONLines<SearchEvent>(makeStream(jsonl), (e) => events.push(e));
        eq(events.length, 3);
        eq(events[0].type, "result");
        eq(events[1].type, "facets");
        eq(events[2].type, "done");
    });

    t.run("chunked across line boundary", async () => {
        const events: SearchEvent[] = [];
        await readJSONLines<SearchEvent>(
            makeChunkedStream([
                '{"type":"do',
                'ne","time_ms":1,"total":0,"truncated":false}\n',
            ]),
            (e) => events.push(e),
        );
        eq(events.length, 1);
        eq(events[0].type, "done");
    });

    t.run("empty lines skipped", async () => {
        const events: SearchEvent[] = [];
        await readJSONLines<SearchEvent>(
            makeStream('\n\n{"type":"done","time_ms":0,"total":0,"truncated":false}\n\n'),
            (e) => events.push(e),
        );
        eq(events.length, 1);
    });

    t.run("remaining data without trailing newline", async () => {
        const events: SearchEvent[] = [];
        // No trailing newline — exercises the "remaining data" branch.
        await readJSONLines<SearchEvent>(
            makeStream('{"type":"done","time_ms":0,"total":0,"truncated":false}'),
            (e) => events.push(e),
        );
        eq(events.length, 1);
        eq(events[0].type, "done");
    });

    t.run("result with compact lines format", async () => {
        const events: SearchEvent[] = [];
        const line = '{"type":"result","path":"r/v/+/f.go","lines":[[1,"ctx"],[2,"match",[[0,5]]],null,[10,"other",[[0,5]]]]}\n';
        await readJSONLines<SearchEvent>(makeStream(line), (e) => events.push(e));
        eq(events.length, 1);
        const r = events[0] as ResultEvent;
        eq(r.lines.length, 4);
        eq(r.lines[0], [1, "ctx"]);
        eq(r.lines[1], [2, "match", [[0, 5]]]);
        eq(r.lines[2], null);
        eq(r.lines[3], [10, "other", [[0, 5]]]);
    });
}

export async function testSearchStream(t: T) {
    const origFetch = globalThis.fetch;
    try {
        t.run("dispatches all event types", async () => {
            const jsonl = [
                '{"type":"result","path":"repo/v/+/file.go","lines":[[1,"hello",[[0,5]]]]}',
                '{"type":"file","path":"repo/v/+/file.go","match":[0,4]}',
                '{"type":"facets","ext":[{"v":".go","c":1}]}',
                '{"type":"done","time_ms":10,"total":1,"truncated":false}',
            ].join('\n') + '\n';

            globalThis.fetch = (async () => new Response(jsonl)) as any;

            const results: ResultEvent[] = [];
            const files: FileMatchEvent[] = [];
            const facetsList: FacetsEvent[] = [];
            const doneList: DoneEvent[] = [];

            await searchStream(new URLSearchParams({q: "hello"}), {
                onResult: (e) => results.push(e),
                onFile: (e) => files.push(e),
                onFacets: (e) => facetsList.push(e),
                onDone: (e) => doneList.push(e),
            });

            eq(results.length, 1);
            eq(results[0].type, "result");
            eq(files.length, 1);
            eq(files[0].type, "file");
            eq(facetsList.length, 1);
            eq(facetsList[0].ext, [{"v": ".go", "c": 1}]);
            eq(doneList.length, 1);
            eq(doneList[0].time_ms, 10);
        });

        t.run("throws on HTTP error", async () => {
            globalThis.fetch = (async () => new Response("server error", {status: 500, statusText: "Internal Server Error"})) as any;

            let caught: Error | null = null;
            try {
                await searchStream(new URLSearchParams({q: "x"}), {});
            } catch (e) {
                caught = e as Error;
            }
            eq(caught !== null, true);
            eq(caught!.message.includes("500"), true, "error includes status code");
        });

        t.run("throws on missing body", async () => {
            // Create a response-like object with ok:true but body:null.
            globalThis.fetch = (async () => ({ok: true, body: null, headers: new Headers(), text: async () => ""})) as any;

            let caught: Error | null = null;
            try {
                await searchStream(new URLSearchParams({q: "x"}), {});
            } catch (e) {
                caught = e as Error;
            }
            eq(caught !== null, true);
            eq(caught!.message, "response has no body");
        });
    } finally {
        globalThis.fetch = origFetch;
    }
}

export function testSplitResultPath(t: T) {
    const cases: {path: string; repo: string; version: string; filePath: string}[] = [
        {path: "myrepo/abc123/+/src/main.go", repo: "myrepo", version: "abc123", filePath: "src/main.go"},
        {path: "org/foo/abc123/+/file.go", repo: "org/foo", version: "abc123", filePath: "file.go"},
        {path: "repo/v/+/", repo: "repo", version: "v", filePath: ""},
        {path: "noslash", repo: "noslash", version: "", filePath: ""},
        {path: "repo/+/file.go", repo: "repo", version: "", filePath: "file.go"},
    ];
    for (const c of cases) {
        t.run(c.path, () => {
            const result = splitResultPath(c.path);
            eq(result.repo, c.repo, "repo");
            eq(result.version, c.version, "version");
            eq(result.filePath, c.filePath, "filePath");
        });
    }
}
