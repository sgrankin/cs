// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"expvar"
	"fmt"
	"io/fs"
	"net/http"
	"net/http/pprof"
	"time"

	"github.com/CAFxX/httpcompression"
)

func addRoutes(mux *http.ServeMux, srv *server) {
	// TODO? pass dependencies explicitly instead of just `srv`
	mux.Handle("GET /{$}", ctxHandlerFunc(srv.ServeRoot))
	mux.Handle("GET /about", ctxHandlerFunc(srv.ServeSPA))
	mux.Handle("GET /opensearch.xml", ctxHandlerFunc(srv.ServeOpensearch))
	mux.Handle("GET /search", ctxHandlerFunc(srv.ServeSPA))
	mux.Handle("GET /api/search", ctxHandlerFunc(srv.ServeAPISearch))
	mux.Handle("GET /raw/{path...}", ctxHandlerFunc(srv.ServeRaw))
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServerFS(srv.staticFS)))
	mux.Handle("GET /view/{path...}", ctxHandlerFunc(srv.ServeSPA))

	if srv.devMode {
		mux.Handle("GET /debug/livereload", livereloadHandler(srv.staticFS))
	}
	mux.Handle("GET /debug/healthcheck", http.HandlerFunc(srv.ServeHealthcheck))
	mux.Handle("GET /debug/vars", expvar.Handler())
	mux.HandleFunc("GET /debug/pprof/", pprof.Index)
	mux.HandleFunc("GET /debug/pprof/cmdline", pprof.Cmdline)
	mux.HandleFunc("GET /debug/pprof/profile", pprof.Profile)
	mux.HandleFunc("GET /debug/pprof/symbol", pprof.Symbol)
	mux.HandleFunc("GET /debug/pprof/trace", pprof.Trace)
}

// Handler is an http.HandlerFunc with an additional Context param.
type ctxHandlerFunc func(c context.Context, w http.ResponseWriter, r *http.Request)

func (h ctxHandlerFunc) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h(r.Context(), w, r)
}

const RequestTimeout = 30 * time.Second

func withTimeout(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), RequestTimeout)
		defer cancel()
		r = r.WithContext(ctx)
		h.ServeHTTP(w, r)
	})
}

// livereloadHandler returns an SSE handler that sends a version string
// derived from static file modification times. The client stores the
// version and reloads when it changes (server restart or asset rebuild).
//
// The handler works within the normal request timeout — the client
// reconnects after each disconnect and compares versions.
func livereloadHandler(assets fs.FS) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.WriteHeader(http.StatusOK)
		rc := http.NewResponseController(w)

		version := staticVersion(assets)
		fmt.Fprintf(w, "data: %s\n\n", version)
		rc.Flush()

		// Poll for changes until the request times out or client disconnects.
		ticker := time.NewTicker(1 * time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-r.Context().Done():
				return
			case <-ticker.C:
				if v := staticVersion(assets); v != version {
					version = v
					fmt.Fprintf(w, "data: %s\n\n", version)
					rc.Flush()
				}
			}
		}
	}
}

// staticVersion computes a version string from the modification times
// of files in the static FS. Changes when any file is rebuilt.
func staticVersion(assets fs.FS) string {
	var maxTime time.Time
	fs.WalkDir(assets, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return nil
		}
		info, err := d.Info()
		if err != nil {
			return nil
		}
		if info.ModTime().After(maxTime) {
			maxTime = info.ModTime()
		}
		return nil
	})
	return fmt.Sprintf("%d", maxTime.UnixNano())
}

var withCompression func(http.Handler) http.Handler

func init() {
	withCompression, _ = httpcompression.DefaultAdapter(httpcompression.MinSize(0))
}
