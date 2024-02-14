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
	"net/http"
	"path/filepath"
	"regexp"
	texttemplate "text/template"
	"time"

	"github.com/gorilla/handlers"

	"sgrankin.dev/cs/livegrep/server/config"
	"sgrankin.dev/cs/livegrep/server/log"
	"sgrankin.dev/cs/livegrep/server/reqid"
)

var serveUrlParseError = fmt.Errorf("failed to parse repo and path from URL")

type page struct {
	Title         string
	ScriptName    string
	ScriptData    interface{}
	IncludeHeader bool
	Data          interface{}
	Config        *config.Config
	AssetHashes   map[string]string
	Nonce         template.HTMLAttr // either `` or ` nonce="..."`
}

type server struct {
	config      *config.Config
	bk          map[string]*Backend
	bkOrder     []string
	repos       []string
	inner       http.Handler
	Templates   map[string]*template.Template
	OpenSearch  *texttemplate.Template
	AssetHashes map[string]string
	Layout      *template.Template
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

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.inner.ServeHTTP(w, r)
}

func (s *server) ServeRoot(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/search", 303)
}

type searchScriptData struct {
	RepoUrls           map[string]map[string]string `json:"repo_urls"`
	DefaultSearchRepos []string                     `json:"default_search_repos"`
	LinkConfigs        []config.LinkConfig          `json:"link_configs"`
}

func (s *server) makeSearchScriptData() (script_data *searchScriptData, backends []*Backend, sampleRepo string) {
	urls := map[string]map[string]string{}
	backends = []*Backend{}
	sampleRepo = ""
	for _, bkId := range s.bkOrder {
		bk := s.bk[bkId]
		backends = append(backends, bk)
		info := bk.Info()
		m := map[string]string{}
		urls[bk.ID] = m
		for _, tree := range info.Trees {
			if sampleRepo == "" {
				sampleRepo = tree.Name
			}
			// TODO: make this conditional? What is this even used for?
			// XXX ARGH! Only the *keys* are used to get the repo names... See codesearch_ui.tsx
			url := "https://github.com/{name}/blob/{version}/{path}#L{lno}"
			m[tree.Name] = url
		}
	}

	script_data = &searchScriptData{urls, s.repos, s.config.LinkConfigs}

	return script_data, backends, sampleRepo
}

func (s *server) ServeSearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	script_data, backends, sampleRepo := s.makeSearchScriptData()

	s.renderPage(ctx, w, r, "index.html", &page{
		Title:         "code search",
		ScriptName:    "codesearch/codesearch_ui",
		ScriptData:    script_data,
		IncludeHeader: true,
		Data: struct {
			Backends   []*Backend
			SampleRepo string
		}{
			Backends:   backends,
			SampleRepo: sampleRepo,
		},
	})
}

func (s *server) ServeAbout(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	s.renderPage(ctx, w, r, "about.html", &page{
		Title:         "about",
		IncludeHeader: true,
	})
}

func (s *server) ServeHealthcheck(w http.ResponseWriter, r *http.Request) {
	// All backends must have (at some point) reported an index age for us to
	// report as healthy.
	// TODO: report as unhealthy if a backend goes down after we've spoken to
	// it.
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
	replyJSON(ctx, w, 200, &stats{
		IndexAge: int64(maxBkAge / time.Second),
	})
}

func (s *server) requestProtocol(r *http.Request) string {
	if s.config.ReverseProxy {
		if proto := r.Header.Get("X-Real-Proto"); len(proto) > 0 {
			return proto
		}
	}
	if r.TLS != nil {
		return "https"
	}
	return "http"
}

func (s *server) ServeOpensearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	data := &struct {
		BackendName, BaseURL string
	}{
		BaseURL: s.requestProtocol(r) + "://" + r.Host + "/",
	}

	for _, bk := range s.bk {
		data.BackendName = bk.ID
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

func (s *server) renderPage(ctx context.Context, w http.ResponseWriter, r *http.Request, templateName string, pageData *page) {
	t, ok := s.Templates[templateName]
	if !ok {
		http.Error(w, fmt.Sprintf("Error: no template named %v", templateName), http.StatusInternalServerError)
		log.Printf(ctx, "Error: no template named %v", templateName)
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

type handler func(c context.Context, w http.ResponseWriter, r *http.Request)

const RequestTimeout = 30 * time.Second

func (h handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, RequestTimeout)
	defer cancel()
	ctx = reqid.NewContext(ctx, reqid.New())
	log.Printf(ctx, "http request: remote=%q method=%q url=%q",
		r.RemoteAddr, r.Method, r.URL)
	h(ctx, w, r)
}

func (s *server) Handler(f func(c context.Context, w http.ResponseWriter, r *http.Request)) http.Handler {
	return handler(f)
}

func New(cfg *config.Config) (http.Handler, error) {
	srv := &server{
		config: cfg,
		bk:     map[string]*Backend{},
	}
	srv.loadTemplates()

	for _, icfg := range cfg.IndexConfig {
		be, err := NewBackend(filepath.Base(icfg.Path), icfg.Path)
		if err != nil {
			return nil, err
		}
		srv.bk[be.ID] = be
		srv.bkOrder = append(srv.bkOrder, be.ID)
		info := be.Info()
		for _, t := range info.Trees {
			srv.repos = append(srv.repos, t.Name)
		}
	}

	for ext, lang := range srv.config.FileExtToLang {
		extToLangMap[ext] = lang
	}

	for regexStr, lang := range srv.config.FileFirstLineRegexToLang {
		regex, err := regexp.Compile(regexStr)
		if err != nil {
			return nil, err
		}
		fileFirstLineToLangMap[regex] = lang
	}

	mux := http.NewServeMux()
	mux.Handle("GET /", srv.Handler(srv.ServeRoot))
	mux.Handle("GET /about", srv.Handler(srv.ServeAbout))
	mux.Handle("GET /debug/healthcheck", http.HandlerFunc(srv.ServeHealthcheck))
	mux.Handle("GET /debug/stats", srv.Handler(srv.ServeStats))
	mux.Handle("GET /opensearch.xml", srv.Handler(srv.ServeOpensearch))
	mux.Handle("GET /search", srv.Handler(srv.ServeSearch))
	mux.Handle("GET /search/{backend}", srv.Handler(srv.ServeSearch))
	mux.Handle("GET /static/", http.FileServerFS(staticFS))
	mux.Handle("GET /view/{backend}/{repo}/{commit}/{path...}", srv.Handler(srv.ServeFile))
	mux.Handle("POST /api/v1/search/{backend}", srv.Handler(srv.ServeAPISearch)) // Parameters are in form format.

	srv.inner = handlers.CompressHandler(mux)
	return srv, nil
}
