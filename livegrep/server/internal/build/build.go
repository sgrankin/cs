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

var buildOpts = api.BuildOptions{
	EntryPoints: []string{"web/app.ts", "web/app.css"},
	Outdir:      "static",
	Bundle:      true,
	Write:       true,

	Target: api.ES2015,

	Sourcemap:         api.SourceMapLinked,
	MinifyWhitespace:  true,
	MinifyIdentifiers: true,
	MinifySyntax:      true,

	Color:    api.ColorAlways,
	LogLevel: api.LogLevelInfo,
	Metafile: true,
}

func main() {
	log.SetFlags(log.Lshortfile)
	watch := flag.Bool("watch", false, "Watch and rebuild")
	analyze := flag.Bool("analyze", false, "Analyze build results")
	flag.Parse()

	if *watch {
		ctx, err := api.Context(buildOpts)
		if err != nil {
			log.Fatal(err)
		}
		defer ctx.Dispose()
		if err := ctx.Watch(api.WatchOptions{}); err != nil {
			log.Fatal(err)
		}
		select {} // Wait forever.
	}

	res := api.Build(buildOpts)
	if len(res.Errors) > 0 {
		os.Exit(1)
	}
	if *analyze {
		fmt.Print(api.AnalyzeMetafile(res.Metafile, api.AnalyzeMetafileOptions{
			Color: true,
		}))
	}
}
