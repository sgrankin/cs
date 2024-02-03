// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"
	"slices"
	"strings"

	"github.com/evanw/esbuild/pkg/api"
)

func buildOpts(debug bool) api.BuildOptions {
	opts := api.BuildOptions{
		EntryPoints: []string{
			"web/app.css",
			"web/codesearch/codesearch_ui.tsx",
			"web/fileview/fileview.ts",
		},
		Outdir: "static",
		Bundle: true,
		Write:  true,

		Target: api.ES2022,

		Sourcemap:         api.SourceMapLinked,
		MinifyWhitespace:  !debug,
		MinifyIdentifiers: !debug,
		MinifySyntax:      !debug,
		LegalComments:     api.LegalCommentsLinked,

		Color:    api.ColorAlways,
		LogLevel: api.LogLevelInfo,
		Metafile: true,

		Plugins: []api.Plugin{
			prismPlugin,
		},
	}
	if debug {
		opts.LogLevel = api.LogLevelDebug
	}
	return opts
}

func main() {
	log.SetFlags(log.Lshortfile)
	watch := flag.Bool("watch", false, "Watch and rebuild")
	analyze := flag.Bool("analyze", false, "Analyze build results")
	debug := flag.Bool("debug", false, "Debug mode (no minification, etc).")
	flag.Parse()

	opts := buildOpts(*debug)

	if *watch {
		ctx, err := api.Context(opts)
		if err != nil {
			log.Fatal(err)
		}
		defer ctx.Dispose()
		if err := ctx.Watch(api.WatchOptions{}); err != nil {
			log.Fatal(err)
		}
		select {} // Wait forever.
	}

	res := api.Build(opts)
	if len(res.Errors) > 0 {
		os.Exit(1)
	}
	if *analyze {
		fmt.Print(api.AnalyzeMetafile(res.Metafile, api.AnalyzeMetafileOptions{
			Color: true,
		}))
	}
}

type prismPluginData struct {
	ResolveDir string
}

// prismPlugin will turn a single "!prismjs" import a lits of imports of _all_ of the known prismjs languages.
// This is wanted because we're using esbuild to bundle & minify and want to avoid dynamic imports.
// However prismJS doesn't have a single importable module with all of the languges in a form that esbuild can process at build time.
var prismPlugin = api.Plugin{
	Name: "prism",
	Setup: func(build api.PluginBuild) {
		// Intercept import paths called "!prismjs" so esbuild doesn't attempt to map them to a file system location.
		// Tag them with the "prism-ns" namespace to reserve them for this plugin.
		build.OnResolve(api.OnResolveOptions{Filter: `!prismjs`},
			func(args api.OnResolveArgs) (api.OnResolveResult, error) {
				// Find the components using normal resolution mechanisms.
				result := build.Resolve("prismjs/components.json", api.ResolveOptions{
					ResolveDir: args.ResolveDir,
					Kind:       api.ResolveJSImportStatement,
				})
				if len(result.Errors) > 0 {
					return api.OnResolveResult{Errors: result.Errors}, nil
				}

				return api.OnResolveResult{
					Path:      result.Path,
					Namespace: "prism-components",
					PluginData: &prismPluginData{
						ResolveDir: args.ResolveDir,
					},
				}, nil
			})

		// Load paths tagged with the "prism-ns" namespace and behave as if they point to a JSON file containing the environment variables.
		build.OnLoad(api.OnLoadOptions{Filter: `.*`, Namespace: "prism-components"},
			func(args api.OnLoadArgs) (api.OnLoadResult, error) {
				// Read the components json & extract alll the known language names.
				data, err := os.ReadFile(args.Path)
				if err != nil {
					return api.OnLoadResult{}, err
				}
				var components struct {
					Languages map[string]struct {
						Path    string          `json:"path"`
						Require json.RawMessage `json:"require"`
					} `json:"languages"`
				}
				if err := json.Unmarshal(data, &components); err != nil {
					return api.OnLoadResult{}, err
				}

				// The "meta" language has the import path template.
				path := "components/prism-{id}"
				if meta, found := components.Languages["meta"]; found {
					path = meta.Path
					delete(components.Languages, "meta")
				}
				// Topological sort of the languages so that requirements are emitted first.
				seen := map[string]bool{}
				langQueue := []string{}
				for lang := range components.Languages {
					langQueue = append(langQueue, lang)
				}
				// Stable sort so that the generated files don't keep changing.
				slices.Sort(langQueue)

				var langs []string
				var emit func(string)
				emit = func(lang string) {
					if seen[lang] {
						return
					}
					seen[lang] = true
					rawReq := components.Languages[lang].Require
					if rawReq != nil {
						var reqs []string
						if err := json.Unmarshal(rawReq, &reqs); err != nil {
							var req string
							if err := json.Unmarshal(rawReq, &req); err != nil {
								log.Fatalf("Can't parse reqs: %q", rawReq)
							}
							reqs = append(reqs, req)
						}
						for _, req := range reqs {
							emit(req)
						}
					}
					langs = append(langs, lang)
				}
				for _, lang := range langQueue {
					emit(lang)
				}
				contents := `
					import Prism from "prismjs/components/prism-core.js";
					globalThis.Prism = Prism;
					export default Prism;`
				for _, lang := range langs {
					contents += fmt.Sprintf("import %q\n", "prismjs/"+strings.ReplaceAll(path, "{id}", lang))
				}

				return api.OnLoadResult{
					Contents:   &contents,
					ResolveDir: args.PluginData.(*prismPluginData).ResolveDir,
				}, nil
			})
	},
}
