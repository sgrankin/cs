// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"expvar"
	"net/http"
	"net/http/pprof"
	"time"

	"github.com/CAFxX/httpcompression"
)

func addRoutes(mux *http.ServeMux, srv *server) {
	// TODO? pass dependencies explicitly instead of just `srv`
	mux.Handle("GET /{$}", ctxHandlerFunc(srv.ServeRoot))
	mux.Handle("GET /about", ctxHandlerFunc(srv.ServeAbout))
	mux.Handle("GET /opensearch.xml", ctxHandlerFunc(srv.ServeOpensearch))
	mux.Handle("GET /search", ctxHandlerFunc(srv.ServeSearch))
	mux.Handle("GET /static/", http.StripPrefix("/static/", http.FileServerFS(srv.staticFS)))
	mux.Handle("GET /view/{path...}", ctxHandlerFunc(srv.ServeFile))

	if srv.devMode {
		mux.Handle("GET /debug/livereload", http.HandlerFunc(serveLivereload))
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

// serveLivereload holds an SSE connection open. When the server restarts,
// the connection drops and the client-side script reloads the page.
func serveLivereload(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.WriteHeader(http.StatusOK)
	http.NewResponseController(w).Flush()
	<-r.Context().Done()
}

var withCompression func(http.Handler) http.Handler

func init() {
	withCompression, _ = httpcompression.DefaultAdapter(httpcompression.MinSize(0))
}
