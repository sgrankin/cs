// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"html/template"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/handlers"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server/views"
)

type server struct {
	http.Handler

	config cs.ServeConfig
	bk     cs.SearchIndex

	Templates map[string]*template.Template
}

func New(cfg cs.ServeConfig, index cs.SearchIndex) *server {
	srv := &server{
		config: cfg,
		bk:     index,
	}

	mux := http.NewServeMux()
	addRoutes(mux, srv)

	var h http.Handler = mux
	h = handlers.CompressHandler(h)
	h = withTimeout(h)
	h = withRequestID(h)
	h = handlers.RecoveryHandler(
		handlers.PrintRecoveryStack(true),
		handlers.RecoveryLogger(log.Default()),
	)(h)

	srv.Handler = h
	return srv
}

func (s *server) ServeRoot(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/search", http.StatusSeeOther)
}

func (s *server) ServeAbout(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	views.About(views.Page{
		Title:         "about",
		IncludeHeader: true,
		CSSPath:       meta.EntrypointMap["web/codesearch_ui.tsx"].CSS,
	}).Render(r.Context(), w)
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
