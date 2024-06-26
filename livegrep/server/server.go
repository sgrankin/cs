// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"html/template"
	"io"
	"io/fs"
	"log"
	"net/http"
	"regexp"
	texttemplate "text/template"
	"time"

	"github.com/gorilla/handlers"

	"sgrankin.dev/cs"
)

type server struct {
	http.Handler

	config  cs.ServeConfig
	bk      map[string]cs.SearchIndex
	bkOrder []string

	Templates   map[string]*template.Template
	OpenSearch  *texttemplate.Template
	AssetHashes map[string]string
	Layout      *template.Template
}

func New(cfg cs.ServeConfig, indexes []cs.SearchIndex) *server {
	srv := &server{
		config: cfg,
		bk:     map[string]cs.SearchIndex{},
	}
	srv.loadTemplates()

	for _, idx := range indexes {
		srv.bk[idx.Name()] = idx
		srv.bkOrder = append(srv.bkOrder, idx.Name())
	}

	for ext, lang := range srv.config.Languages.FileExtToLang {
		extToLangMap[ext] = lang
	}

	for regexStr, lang := range srv.config.Languages.FileFirstLineRegexToLang {
		regex := regexp.MustCompile(regexStr)
		fileFirstLineToLangMap[regex] = lang
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

func (s *server) loadTemplates() {
	s.Templates = map[string]*template.Template{}
	err := LoadTemplates(s.Templates)
	if err != nil {
		panic(fmt.Sprintf("loading templates: %v", err))
	}

	p := "templates/opensearch.xml"
	s.OpenSearch = texttemplate.Must(texttemplate.ParseFS(templatesFS, p))

	s.AssetHashes = map[string]string{}
	fs.WalkDir(staticFS, "static", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			panic(err) // TODO: log.fatal or something
		}
		if d.IsDir() {
			return nil
		}
		bytes, err := staticFS.ReadFile(path)
		if err != nil {
			panic(err)
		}
		hash := sha256.Sum256(bytes)
		s.AssetHashes[path] = base64.URLEncoding.EncodeToString(hash[:])
		return nil
	})
}

func (s *server) ServeRoot(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/search", http.StatusSeeOther)
}

func (s *server) ServeAbout(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	s.renderPage(w, "about.html", &page{
		Title:         "about",
		IncludeHeader: true,
		CSSPath:       "codesearch/codesearch_ui",
	})
}

func (s *server) ServeHealthcheck(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "ok\n")
}

type stats struct {
	IndexAge int64 `json:"index_age"`
}

func (s *server) ServeStats(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	// For index age, report the age of the stalest backend's index.
	now := time.Now()
	maxBkAge := time.Duration(-1) * time.Second
	for _, bk := range s.bk {
		info := bk.Info()
		if info.IndexTime.IsZero() {
			// backend didn't report index time
			continue
		}
		bkAge := now.Sub(info.IndexTime)
		if bkAge > maxBkAge {
			maxBkAge = bkAge
		}
	}
	replyJSON(w, 200, &stats{
		IndexAge: int64(maxBkAge / time.Second),
	})
}

func (s *server) ServeOpensearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	data := &struct {
		BackendName, BaseURL string
	}{
		BaseURL: r.URL.JoinPath("/").String(),
	}

	for _, bk := range s.bk {
		data.BackendName = bk.Name()
		break
	}

	templateName := "opensearch.xml"
	buf := bytes.Buffer{}
	err := s.OpenSearch.ExecuteTemplate(&buf, templateName, data)
	if err != nil {
		http.Error(w, fmt.Sprintf("error rendering %s: %s", templateName, err), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/xml")
	buf.WriteTo(w)
}

func (s *server) renderPage(w http.ResponseWriter, templateName string, pageData *page) {
	t, ok := s.Templates[templateName]
	if !ok {
		log.Panicf("Error: no template named %v", templateName)
		return
	}

	pageData.Config = s.config
	pageData.AssetHashes = s.AssetHashes

	nonce := "" // custom nonce computation can go here
	if nonce != "" {
		pageData.Nonce = template.HTMLAttr(fmt.Sprintf(` nonce="%s"`, nonce))
	}

	buf := bytes.Buffer{}
	err := t.ExecuteTemplate(&buf, templateName, pageData)
	if err != nil {
		http.Error(w, fmt.Sprintf("error rendering %s: %s", templateName, err), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	buf.WriteTo(w)
}

type Backend struct {
	cs.SearchIndex
	ID string
}

type page struct {
	Title         string
	JSPath        string
	CSSPath       string
	ScriptData    interface{}
	IncludeHeader bool
	Data          interface{}
	Config        cs.ServeConfig
	AssetHashes   map[string]string
	Nonce         template.HTMLAttr // either `` or ` nonce="..."`
}
