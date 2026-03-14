#!/usr/bin/env node
//
// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause
// Browser test runner for Lit components.
//
// Finds all *.test.ts files, bundles them with esbuild, serves the bundle
// from a temp directory, and runs it in headless Chromium via Playwright.
// Test results are read from console output (see harness.ts for the protocol).
//
// Usage:
//   bun run test                           # run all *.test.ts
//   bun run test web                       # run tests in one directory
//   bun run test:coverage                  # run with per-file line coverage
//
// Requires Playwright browsers: npx playwright install chromium
//
import * as esbuild from "esbuild";
import {createServer} from "node:http";
import {mkdtempSync, readFileSync, writeFileSync, readdirSync} from "node:fs";
import {join, dirname, resolve, relative} from "node:path";
import {tmpdir} from "node:os";
import {fileURLToPath} from "node:url";
import {chromium} from "playwright";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const wantCoverage = process.argv.includes("--coverage");

// Parse directory filters from args. No filters = search everything.
const dirs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const searchDirs = dirs.length > 0 ? dirs : ["."];

// Recursively find *.test.ts files, skipping node_modules and testing/.
function findTests(dir, root) {
    let results = [];
    for (const entry of readdirSync(join(root, dir), {withFileTypes: true})) {
        if (entry.name === "node_modules" || entry.name === "testing") continue;
        const rel = join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(findTests(rel, root));
        } else if (entry.name.endsWith(".test.ts")) {
            results.push(rel);
        }
    }
    return results;
}

const entryPoints = searchDirs.flatMap((d) => findTests(d, rootDir));
if (entryPoints.length === 0) {
    console.log("No test files found.");
    process.exit(0);
}

// --- Step 1: Generate an entry point that imports all test modules and calls runAll.
// This is the equivalent of Go's generated TestMain — the test files just export
// functions, and the runner wires them together.
const outdir = mkdtempSync(join(tmpdir(), "cs-web-test-"));
const bundlePath = join(outdir, "test-bundle.js");
const entryPath = join(outdir, "entry.ts");

const imports = entryPoints.map((e, i) => `import * as _${i} from "${join(rootDir, e)}";`);
const entrySource = [
    ...imports,
    `import {runAll} from "${join(rootDir, "testing/harness.ts")}";`,
    `runAll([${entryPoints.map((_, i) => `_${i}`).join(", ")}]);`,
].join("\n");
writeFileSync(entryPath, entrySource);

// Bundle the generated entry point (which pulls in all test files and harness).
await esbuild.build({
    entryPoints: [entryPath],
    bundle: true,
    outfile: bundlePath,
    format: "esm",
    platform: "browser",
    target: "es2024",
    tsconfig: join(rootDir, "tsconfig.json"),
    sourcemap: wantCoverage ? "inline" : false,
    loader: {".txt": "text"},
    logLevel: "warning",
});

writeFileSync(join(outdir, "index.html"),
    `<!DOCTYPE html><html><body><script type="module" src="test-bundle.js"></script></body></html>`);

// --- Step 2: Start a local HTTP server to serve the bundle.
// Browsers can't load ES modules from file:// URLs, so we need an HTTP server.
const server = createServer((req, res) => {
    const file = req.url === "/" ? "/index.html" : req.url;
    try {
        const content = readFileSync(join(outdir, file));
        const ext = file.split(".").pop();
        const types = {html: "text/html", js: "application/javascript"};
        res.writeHead(200, {"Content-Type": types[ext] || "application/octet-stream"});
        res.end(content);
    } catch {
        res.writeHead(404);
        res.end("not found");
    }
});

await new Promise((resolve) => server.listen(0, resolve));
const port = server.address().port;

// --- Step 3: Open headless Chromium and run the tests.
// The test harness (harness.ts) logs results as "PASS  name" / "FAIL  name: msg"
// and a final "PASS" or "FAIL" line. We parse console output to track results.
const browser = await chromium.launch({headless: true});
const page = await browser.newPage();

if (wantCoverage) {
    await page.coverage.startJSCoverage({reportAnonymousScripts: true});
}

let passed = 0;
let failed = 0;
let done = false;

page.on("console", (msg) => {
    const text = msg.text();
    console.log(text);
    if (text.startsWith("PASS  ")) passed++;
    if (text.startsWith("FAIL  ")) failed++;
    if (text === "PASS" || text === "FAIL") done = true;
});

page.on("pageerror", (err) => {
    console.error("Page error:", err.message);
    failed++;
    done = true;
});

await page.goto(`http://localhost:${port}/`);

// Poll until the harness prints the final PASS/FAIL summary.
while (!done) {
    await new Promise((r) => setTimeout(r, 50));
}

// --- Step 4: Coverage report (optional).
// Uses V8's built-in code coverage (byte-level), then maps back to original
// source files and lines via the inline source map that esbuild generated.
if (wantCoverage) {
    const coverage = await page.coverage.stopJSCoverage();
    for (const entry of coverage) {
        if (!entry.url.includes("test-bundle.js")) continue;
        const source = entry.source || "";

        // Build a bitmap of which bytes in the bundle were executed.
        const covered = new Uint8Array(source.length);
        for (const fn of entry.functions) {
            for (const range of fn.ranges) {
                for (let i = range.startOffset; i < range.endOffset && i < source.length; i++) {
                    covered[i] = 1;
                }
            }
        }

        // Extract the inline source map.
        const mapMatch = source.match(/\/\/# sourceMappingURL=data:application\/json;base64,(.+)$/m);
        if (!mapMatch) break;
        const map = JSON.parse(Buffer.from(mapMatch[1], "base64").toString());

        // Resolve source paths relative to the project root for clean output.
        const resolvedSources = map.sources.map((s) => relative(rootDir, resolve(outdir, s)));

        // Decode source map VLQ mappings to map bundle byte offsets → original file:line.
        const mappings = decodeSourceMap(map);

        // Accumulate per-file line coverage.
        const fileCoverage = new Map(); // file → {covered: Set<line>, total: Set<line>}
        for (const m of mappings) {
            const file = resolvedSources[m.sourceIndex];
            // Skip non-source files (node_modules, test harness, test files themselves).
            if (!file || file.includes("node_modules") || file.includes("testing/") || file.includes(".test.") || file.includes("testdata/") || file.startsWith("..")) continue;
            if (!fileCoverage.has(file)) fileCoverage.set(file, {covered: new Set(), total: new Set()});
            const fc = fileCoverage.get(file);
            fc.total.add(m.sourceLine);
            if (covered[m.genOffset]) fc.covered.add(m.sourceLine);
        }

        console.log("\n--- Coverage ---");
        for (const [file, fc] of fileCoverage) {
            const pct = fc.total.size > 0 ? ((fc.covered.size / fc.total.size) * 100).toFixed(1) : "100.0";
            const uncovered = [...fc.total].filter((l) => !fc.covered.has(l)).sort((a, b) => a - b);
            console.log(`${file}: ${pct}% (${fc.covered.size}/${fc.total.size} lines)`);
            if (uncovered.length > 0) console.log(`  uncovered lines: ${formatRanges(uncovered)}`);
        }
    }
}

await browser.close();
server.close();
process.exit(failed > 0 ? 1 : 0);

// --- Source map decoding ---
// Parses VLQ-encoded source map mappings to produce a list of
// {sourceIndex, sourceLine, genOffset} entries that map bundle byte positions
// back to original source file lines.

function decodeSourceMap(map) {
    const result = [];
    let sourceIndex = 0, sourceLine = 0, sourceCol = 0;
    // Build a line-start offset table for the generated bundle so we can
    // convert (line, col) positions to byte offsets.
    const bundleSource = readFileSync(bundlePath, "utf-8");
    const lineOffsets = [0];
    for (let i = 0; i < bundleSource.length; i++) {
        if (bundleSource[i] === "\n") lineOffsets.push(i + 1);
    }
    const lines = map.mappings.split(";");
    for (let genLine = 0; genLine < lines.length; genLine++) {
        if (!lines[genLine]) continue;
        let genCol = 0;
        for (const segment of lines[genLine].split(",")) {
            const decoded = decodeVLQ(segment);
            if (decoded.length < 4) continue; // segments with <4 fields have no source mapping
            genCol += decoded[0];
            sourceIndex += decoded[1];
            sourceLine += decoded[2];
            sourceCol += decoded[3];
            const offset = (lineOffsets[genLine] || 0) + genCol;
            result.push({sourceIndex, sourceLine: sourceLine + 1, genOffset: offset});
        }
    }
    return result;
}

// Decode a base64-VLQ encoded string into an array of signed integers.
// See https://sourcemaps.info/spec.html for the encoding.
function decodeVLQ(str) {
    const result = [];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let shift = 0, value = 0;
    for (const ch of str) {
        const digit = chars.indexOf(ch);
        value += (digit & 31) << shift;
        if (digit & 32) { shift += 5; }
        else { result.push(value & 1 ? -(value >> 1) : value >> 1); value = 0; shift = 0; }
    }
    return result;
}

// Format an array of line numbers into compact ranges: [1,2,3,5,7,8] → "1-3, 5, 7-8"
function formatRanges(lines) {
    const ranges = [];
    let start = lines[0], end = lines[0];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i] === end + 1) { end = lines[i]; }
        else { ranges.push(start === end ? `${start}` : `${start}-${end}`); start = end = lines[i]; }
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);
    return ranges.join(", ");
}
