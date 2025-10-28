package main

import (
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/evanw/esbuild/pkg/api"
	"golang.org/x/exp/slices"
)

const (
	outDir       = "static"
	metafilePath = "static/meta.json"
)

func main() {
	log.SetFlags(log.Lshortfile)
	watch := flag.Bool("watch", false, "Watch and rebuild.")
	analyze := flag.Bool("analyze", false, "Analyze build results.")
	debug := flag.Bool("debug", false, "Debug mode (no minification, etc).")
	clean := flag.Bool("clean", true, "Clean up previous outputs (via meta.json) before building.")
	flag.Parse()

	opts := buildOpts(*debug)
	opts.Plugins = append(opts.Plugins, api.Plugin{
		Name: "Buildah",
		Setup: func(pb api.PluginBuild) {
			pb.OnStart(func() (api.OnStartResult, error) {
				var out api.OnStartResult
				if *clean {
					meta, err := readMeta()
					if err != nil && !errors.Is(err, os.ErrNotExist) {
						return out, fmt.Errorf("ReadMeta failed: %v", err)
					} else if meta != nil {
						for _, fname := range meta.BuildOutputs {
							os.Remove(fname)
						}
					}
				}
				return out, nil
			})
			pb.OnEnd(func(res *api.BuildResult) (api.OnEndResult, error) {
				var out api.OnEndResult
				if err := writeMeta(res.Metafile); err != nil {
					return out, fmt.Errorf("Failed writing metafile: %v", err)
				}

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

	meta := Meta{
		EntrypointMap: map[string]EntryPoint{},
	}
	for path, out := range metafile.Outputs {
		meta.BuildOutputs = append(meta.BuildOutputs, path)
		if len(out.EntryPoint) > 0 {
			meta.EntrypointMap[out.EntryPoint] = EntryPoint{
				JS:  path,
				CSS: out.CSSBundle,
			}
		}
	}
	slices.Sort(meta.BuildOutputs)
	data, err := json.Marshal(meta)
	if err != nil {
		return err
	}
	return os.WriteFile(metafilePath, data, 0o666)
}

func readMeta() (*Meta, error) {
	b, err := os.ReadFile(metafilePath)
	if err != nil {
		return nil, err
	}
	var meta Meta
	if err := json.Unmarshal(b, &meta); err != nil {
		return nil, err
	}
	return &meta, nil
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
