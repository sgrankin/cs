package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/evanw/esbuild/pkg/api"
)

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
	if err := writeMeta(res.Metafile); err != nil {
		log.Fatalf("Failed writing metafile: %v", err)
	}

	if *analyze {
		fmt.Print(api.AnalyzeMetafile(res.Metafile, api.AnalyzeMetafileOptions{
			Color: true,
		}))
	}
}

type EntrypointMeta struct {
	JS, CSS string
}

type EntrypointMetaFile map[string]EntrypointMeta

func writeMeta(esMetafile string) error {
	var metafile struct {
		Outputs map[string]struct {
			EntryPoint string `json:"entryPoint"`
			CSSBundle  string `json:"cssBundle"`
		} `json:"outputs"`
	}
	if err := json.Unmarshal([]byte(esMetafile), &metafile); err != nil {
		return err
	}

	entryMap := EntrypointMetaFile{}
	for path, out := range metafile.Outputs {
		if len(out.EntryPoint) > 0 {
			entryMap[out.EntryPoint] = EntrypointMeta{
				JS:  path,
				CSS: out.CSSBundle,
			}
		}
	}
	data, err := json.Marshal(entryMap)
	if err != nil {
		return err
	}
	return os.WriteFile("static/meta.json", data, 0o666)
}

func buildOpts(debug bool) api.BuildOptions {
	opts := api.BuildOptions{
		EntryPoints: []string{
			"web/codesearch_ui.tsx",
			"web/fileview.ts",
		},
		EntryNames: "[dir]/[name]-[hash]",
		Outdir:     "static",
		Bundle:     true,
		Write:      true,
		Format:     api.FormatESModule,
		Platform:   api.PlatformBrowser,
		Splitting:  true,
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
