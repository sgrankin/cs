package main

import (
	"encoding/json"
	_ "expvar"
	"flag"
	"log"
	"net/http"
	_ "net/http/pprof"
	"os"

	"sgrankin.dev/cs/livegrep/server"
	"sgrankin.dev/cs/livegrep/server/config"
	"sgrankin.dev/cs/livegrep/server/middleware"
)

var (
	serveAddr   = flag.String("listen", "127.0.0.1:8910", "The address to listen on")
	backendAddr = flag.String("connect", "localhost:9999", "The address to connect to")
	indexConfig = flag.String("index-config", "", "Codesearch index config file; provide to enable repo browsing")
	reload      = flag.Bool("reload", false, "Reload template files on every request")
	_           = flag.Bool("logtostderr", false, "[DEPRECATED] compatibility with glog")
)

func main() {
	flag.Parse()

	cfg := &config.Config{
		Listen: *serveAddr,
		Reload: *reload,
		Backends: []config.Backend{
			{Id: "", Addr: *backendAddr},
		},
	}

	if *indexConfig != "" {
		data, err := os.ReadFile(*indexConfig)
		if err != nil {
			log.Fatalf(err.Error())
		}

		if err = json.Unmarshal(data, &cfg.IndexConfig); err != nil {
			log.Fatalf("reading %s: %s", flag.Arg(0), err.Error())
		}
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
