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
	config = cs.FlagVar[cs.EnvString]("config", "config.yaml",
		"The config file.")
	indexPath = flag.String("index", "",
		"The path to the index file(s).  Allows serving an index without a config.")
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
	if indexPath != nil {
		cfg.Index = cs.IndexConfig{Path: *indexPath}
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
	if cfg.Index.Path == "" {
		log.Fatal("An index is required")
	}

	index := cs.NewSearchIndex(cfg.Index)
	srv := server.New(cfg.Serve, index)
	go func() {
		ticker := time.NewTicker(10 * time.Second)
		for range ticker.C {
			index.Reload()
		}
	}()

	if *listenAddr != "" {
		go func() {
			log.Printf("Listening on %s.", *listenAddr)
			log.Fatal(http.ListenAndServe(*listenAddr, srv))
		}()
	}

	select {} // And now we wait...
}
