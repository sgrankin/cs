package server

import (
	"context"
	"log"
	"net/http"
	"time"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server/reqid"
)

func addRoutes(mux *http.ServeMux, srv *server) {
	// TODO? pass dependencies explicitly instead of just `srv`
	mux.Handle("GET /", ctxHandlerFunc(srv.ServeRoot))
	mux.Handle("GET /about", ctxHandlerFunc(srv.ServeAbout))
	mux.Handle("GET /debug/healthcheck", http.HandlerFunc(srv.ServeHealthcheck))
	mux.Handle("GET /debug/stats", ctxHandlerFunc(srv.ServeStats))
	mux.Handle("GET /opensearch.xml", ctxHandlerFunc(srv.ServeOpensearch))
	mux.Handle("GET /search", ctxHandlerFunc(srv.ServeSearch))
	mux.Handle("GET /search/{backend}", ctxHandlerFunc(srv.ServeSearch))
	mux.Handle("GET /static/", cs.EmbedFSServer(staticFS))
	mux.Handle("GET /view/{backend}/{path...}", ctxHandlerFunc(srv.ServeFile))
	mux.Handle("POST /api/v1/search/{backend}", ctxHandlerFunc(srv.ServeAPISearch)) // Parameters are in form format.
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

func withRequestID(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := reqid.NewContext(r.Context(), reqid.New())
		log.Printf("http request: remote=%q method=%q url=%q",
			r.RemoteAddr, r.Method, r.URL)
		r = r.WithContext(ctx)
		h.ServeHTTP(w, r)
	})
}
