#!/usr/bin/env node
// Frontend build script. Replaces livegrep/server/build/main.go.
// Usage: bun run build [--watch] [--analyze] [--debug]
import * as esbuild from "esbuild";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const args = new Set(process.argv.slice(2));
const debug = args.has("--debug") || process.env.DEBUG === "1";
const watch = args.has("--watch");
const analyze = args.has("--analyze");

const opts = {
    entryPoints: [
        join(dir, "web/codesearch_ui.tsx"),
        join(dir, "web/fileview.ts"),
    ],
    outdir: join(dir, "static"),
    bundle: true,
    write: true,
    format: "esm",
    platform: "browser",
    loader: {
        ".eot": "dataurl",
        ".svg": "dataurl",
        ".ttf": "dataurl",
        ".woff": "dataurl",
        ".woff2": "dataurl",
    },
    target: "es2024",
    sourcemap: "linked",
    minifyWhitespace: !debug,
    minifyIdentifiers: !debug,
    minifySyntax: !debug,
    legalComments: "linked",
    color: true,
    logLevel: debug ? "debug" : "info",
    metafile: true,
    tsconfig: join(dir, "../../tsconfig.json"),
};

if (watch) {
    const ctx = await esbuild.context(opts);
    await ctx.watch();
    console.log("Watching for changes...");
    await new Promise(() => {});
} else {
    const result = await esbuild.build(opts);
    if (analyze) {
        console.log(await esbuild.analyzeMetafile(result.metafile, {color: true}));
    }
    if (result.errors.length > 0) {
        process.exit(1);
    }
}
