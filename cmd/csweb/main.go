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
	"path"
	"strings"

	"sgrankin.dev/cs/livegrep/server"
	"sgrankin.dev/cs/livegrep/server/config"
	"sgrankin.dev/cs/livegrep/server/middleware"
)

var (
	listenAddr = flag.String("listen", "127.0.0.1:8910", "The address to listen on")
	indexPath  = flagVar[pathList]("index", pathList{}, "The path to the index file")
)

func main() {
	log.SetFlags(log.Lshortfile | log.Lmicroseconds)
	flag.Parse()

	cfg := &config.Config{
		Listen:            *listenAddr,
		DefaultMaxMatches: 500,
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

	handler, err := server.New(cfg)
	if err != nil {
		panic(err.Error())
	}

	if cfg.ReverseProxy {
		handler = middleware.UnwrapProxyHeaders(handler)
	}

	http.DefaultServeMux.Handle("/", handler)

	log.Printf("Listening on %s.", cfg.Listen)
	log.Fatal(http.ListenAndServe(cfg.Listen, nil))
}

type pathList map[string]bool

func (s *pathList) Set(val string) error {
	val = path.Clean(val)
	(*s)[val] = true
	return nil
}
func (s *pathList) String() string {
	var paths []string
	for p := range *s {
		paths = append(paths, p)
	}
	return strings.Join(paths, ",")
}

func flagVar[T any, PT interface {
	flag.Value
	*T
}](name string, value T, usage string) PT {
	v := value
	pv := (PT)(&v)
	flag.Var(pv, name, usage)
	return pv
}
