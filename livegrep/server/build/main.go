package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/evanw/esbuild/pkg/api"
)

const (
	outDir = "static"
)

func main() {
	log.SetFlags(log.Lshortfile)
	watch := flag.Bool("watch", false, "Watch and rebuild.")
	analyze := flag.Bool("analyze", false, "Analyze build results.")
	debug := flag.Bool("debug", false, "Debug mode (no minification, etc).")
	flag.Parse()

	opts := buildOpts(*debug)
	opts.Plugins = append(opts.Plugins, api.Plugin{
		Name: "Buildah",
		Setup: func(pb api.PluginBuild) {
			pb.OnStart(func() (api.OnStartResult, error) {
				var out api.OnStartResult
				return out, nil
			})
			pb.OnEnd(func(res *api.BuildResult) (api.OnEndResult, error) {
				var out api.OnEndResult
				if *analyze {
					fmt.Print(api.AnalyzeMetafile(res.Metafile, api.AnalyzeMetafileOptions{
						Color: true,
					}))
				}
				return out, nil
			})
		},
	})

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
}

type EntryPoint struct {
	JS, CSS string
}

type Meta struct {
	BuildOutputs  []string
	EntrypointMap map[string]EntryPoint
}

func buildOpts(debug bool) api.BuildOptions {
	opts := api.BuildOptions{
		EntryPoints: []string{
			"web/codesearch_ui.tsx",
			"web/fileview.ts",
		},
		Outdir:   outDir,
		Bundle:   true,
		Write:    true,
		Format:   api.FormatESModule,
		Platform: api.PlatformBrowser,
		Loader: map[string]api.Loader{
			".eot":   api.LoaderDataURL,
			".svg":   api.LoaderDataURL,
			".ttf":   api.LoaderDataURL,
			".woff":  api.LoaderDataURL,
			".woff2": api.LoaderDataURL,
		},

		Target: api.ES2024,

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
