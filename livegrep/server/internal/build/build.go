// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/evanw/esbuild/pkg/api"
)

func buildOpts(debug bool) api.BuildOptions {
	opts := api.BuildOptions{
		EntryPoints: []string{
			"web/codesearch/codesearch_ui.tsx",
			"web/fileview/fileview.ts",
		},
		Outdir: "static",
		Bundle: true,
		Write:  true,
		Loader: map[string]api.Loader{
			".eot":   api.LoaderDataURL,
			".svg":   api.LoaderDataURL,
			".ttf":   api.LoaderDataURL,
			".woff":  api.LoaderDataURL,
			".woff2": api.LoaderDataURL,
		},

		Target: api.ES2022,

		Sourcemap:         api.SourceMapLinked,
		MinifyWhitespace:  !debug,
		MinifyIdentifiers: !debug,
		MinifySyntax:      !debug,
		LegalComments:     api.LegalCommentsLinked,

		Color:    api.ColorAlways,
		LogLevel: api.LogLevelInfo,
		Metafile: true,
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
