// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package main

import (
	_ "expvar"
	"flag"
	"log"
	"net/http"
	_ "net/http/pprof"
	"os"
	"time"

	"github.com/goccy/go-yaml"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server"
)

var (
	listenAddr = flag.String("listen", "127.0.0.1:8910",
		"The address to listen on.")
	pollInterval = flag.Duration("poll-interval", 10*time.Minute,
		"How often to poll git repos for updates.")
	config = cs.FlagVar[cs.EnvString]("config", "config.yaml",
		"The config file.")
	indexPath = cs.FlagVar[cs.StringSet]("index", cs.StringSet{},
		"The path to the index file(s).")
	githubToken = cs.FlagVar[cs.EnvString]("github-token", "${GITHUB_TOKEN}",
		"GitHub token for private repo access.")
)

func main() {
	log.SetFlags(log.Lshortfile | log.Lmicroseconds)
	log.SetOutput(os.Stderr)
	flag.Parse()

	cfg := cs.Config{
		Serve: cs.ServeConfig{
			DefaultMaxMatches: 500,
		},
	}
	for path := range *indexPath {
		cfg.Indexes = append(cfg.Indexes, cs.IndexConfig{Path: path})
	}

	if *config != "" {
		data, err := os.ReadFile(config.Get())
		if err != nil {
			log.Fatal(err)
		}
		if err = yaml.Unmarshal(data, &cfg); err != nil {
			log.Fatalf("reading %s: %v", flag.Arg(0), err.Error())
		}
	}
	if len(cfg.Indexes) == 0 {
		log.Fatal("At least one Index is required")
	}

	var indexes []cs.SearchIndex
	for _, icfg := range cfg.Indexes {
		indexes = append(indexes, cs.NewSearchIndex(icfg, *pollInterval, githubToken.Get()))
	}

	var handler http.Handler = server.New(cfg.Serve, indexes)
	http.DefaultServeMux.Handle("/", handler)

	log.Printf("Listening on %s.", *listenAddr)
	log.Fatal(http.ListenAndServe(*listenAddr, nil))
}
