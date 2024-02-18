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
	"sgrankin.dev/cs/livegrep/server/middleware"
)

var (
	listenAddr   = flag.String("listen", "127.0.0.1:8910", "The address to listen on.")
	reloadPeriod = flag.Duration("reload-interval", 30*time.Second, "How often to poll the index files to reload on update.")
	config       = flag.String("config", "config.yaml", "The config file.")
	indexPath    = cs.FlagVar[cs.StringSet]("index", cs.StringSet{}, "The path to the index file(s).")
)

func main() {
	log.SetFlags(log.Lshortfile | log.Lmicroseconds)
	log.SetOutput(os.Stdout)
	flag.Parse()

	cfg := cs.Config{
		Serve: cs.ServeConfig{
			Listen: *listenAddr,

			DefaultMaxMatches:     500,
			IndexReloadPollPeriod: *reloadPeriod,
		},
	}

	for path := range *indexPath {
		cfg.Indexes = append(cfg.Indexes, cs.IndexConfig{Path: path})
	}

	if *config != "" {
		data, err := os.ReadFile(*config)
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

	var handler http.Handler = server.New(cfg)
	if cfg.Serve.ReverseProxy {
		handler = middleware.UnwrapProxyHeaders(handler)
	}
	http.DefaultServeMux.Handle("/", handler)

	log.Printf("Listening on %s.", cfg.Serve.Listen)
	log.Fatal(http.ListenAndServe(cfg.Serve.Listen, nil))
}
