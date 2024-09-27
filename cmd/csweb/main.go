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

	"github.com/crawshaw/httpts"
	"github.com/goccy/go-yaml"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server"
)

var (
	listenAddr = flag.String("listen", "127.0.0.1:8910",
		"The address to listen on.")
	config = cs.FlagVar[cs.EnvString]("config", "config.yaml",
		"The config file.")
	indexPath = cs.FlagVar[cs.StringSet]("index", cs.StringSet{},
		"The path to the index file(s).  Allows serving an index without a config.")

	tailscaleHost = flag.String("tailscale-host", "",
		"Create a tailscale service and listen on it.  Uses HTTPS.")
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
		indexes = append(indexes, cs.NewSearchIndex(icfg))
	}

	srv := server.New(cfg.Serve, indexes)
	go func() {
		ticker := time.NewTicker(10 * time.Second)
		for range ticker.C {
			for _, index := range indexes {
				index.Reload()
			}
		}
	}()

	if *listenAddr != "" {
		go func() {
			log.Printf("Listening on %s.", *listenAddr)
			log.Fatal(http.ListenAndServe(*listenAddr, srv))
		}()
	}

	if *tailscaleHost != "" {
		s := httpts.Server{Handler: srv}
		go func() {
			log.Fatal(s.Serve(*tailscaleHost))
		}()
	}
	select {} // And now we wait...
}
