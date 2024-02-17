// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package main

import (
	"encoding/json"
	_ "expvar"
	"flag"
	"log"
	"net/http"
	_ "net/http/pprof"
	"os"
	"time"

	"sgrankin.dev/cs/internal/flagutil"
	"sgrankin.dev/cs/livegrep/server"
	"sgrankin.dev/cs/livegrep/server/config"
	"sgrankin.dev/cs/livegrep/server/middleware"
)

var (
	listenAddr   = flag.String("listen", "127.0.0.1:8910", "The address to listen on")
	indexPath    = flagutil.Var[flagutil.StringSet]("index", flagutil.StringSet{}, "The path to the index file")
	reloadPeriod = flag.Duration("reload-interval", 30*time.Second, "How often to poll the index files to reload on update.")
)

func main() {
	log.SetFlags(log.Lshortfile | log.Lmicroseconds)
	log.SetOutput(os.Stdout)
	flag.Parse()

	cfg := &config.Config{
		Listen: *listenAddr,

		DefaultMaxMatches:     500,
		IndexReloadPollPeriod: *reloadPeriod,
	}
	if len(*indexPath) == 0 {
		log.Fatal("At least one -index is required")
	}

	for path := range *indexPath {
		cfg.IndexConfig = append(cfg.IndexConfig, config.IndexConfig{Path: path})
	}

	if len(flag.Args()) != 0 {
		data, err := os.ReadFile(flag.Arg(0))
		if err != nil {
			log.Fatalf(err.Error())
		}

		if err = json.Unmarshal(data, &cfg); err != nil {
			log.Fatalf("reading %s: %s", flag.Arg(0), err.Error())
		}
	}

	var handler http.Handler = server.New(cfg)
	if cfg.ReverseProxy {
		handler = middleware.UnwrapProxyHeaders(handler)
	}

	http.DefaultServeMux.Handle("/", handler)

	log.Printf("Listening on %s.", cfg.Listen)
	log.Fatal(http.ListenAndServe(cfg.Listen, nil))
}
