// Copyright 2011-2013 Nelson Elhage
// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"io"
	"io/fs"
	"log"
	"net/http"

	"github.com/gorilla/handlers"

	"sgrankin.dev/cs"
)

type server struct {
	http.Handler

	config   cs.ServeConfig
	bk       cs.SearchIndex
	staticFS fs.FS
	devMode  bool
}

// Option configures a server.
type Option func(*server)

// WithDevMode enables development features: live reload on server restart.
func WithDevMode() Option {
	return func(s *server) { s.devMode = true }
}

func New(cfg cs.ServeConfig, index cs.SearchIndex, staticFS fs.FS, opts ...Option) *server {
	srv := &server{
		config:   cfg,
		bk:       index,
		staticFS: staticFS,
	}
	for _, o := range opts {
		o(srv)
	}

	mux := http.NewServeMux()
	addRoutes(mux, srv)

	var h http.Handler = mux
	h = withCompression(h)
	h = withTimeout(h)
	h = handlers.RecoveryHandler(
		handlers.PrintRecoveryStack(true),
		handlers.RecoveryLogger(log.Default()),
	)(h)

	srv.Handler = h
	return srv
}

// StaticFS returns the embedded static filesystem, for use as the default.
func StaticFS() fs.FS {
	sub, _ := fs.Sub(staticFS, "static")
	return sub
}

func (s *server) ServeRoot(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/search", http.StatusSeeOther)
}

func (s *server) ServeHealthcheck(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "ok\n")
}

var openSearchTemplate = `
	<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
		<ShortName>codesearch</ShortName>
  		<Description>Interactively search source code using regular expressions, with results as-you-type.</Description>
		<InputEncoding>UTF-8</InputEncoding>
		<OutputEncoding>UTF-8</OutputEncoding>
		<AdultContent>false</AdultContent>
		<Language>en-us</Language>
		<Query role="example" searchTerms="printf\(" />
		<Url type="text/html" template="/search/?q={searchTerms}" />
	</OpenSearchDescription>`

func (s *server) ServeOpensearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/xml")
	w.Write([]byte(openSearchTemplate))
}
