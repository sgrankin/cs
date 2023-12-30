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
	"regexp"
	"sort"
	texttemplate "text/template"
	"time"

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
	repos       map[string]config.RepoConfig
	inner       http.Handler
	Templates   map[string]*template.Template
	OpenSearch  *texttemplate.Template
	AssetHashes map[string]string
	Layout      *template.Template

	serveFilePathRegex *regexp.Regexp
}

func (s *server) loadTemplates() {
	s.Templates = make(map[string]*template.Template)
	err := LoadTemplates(s.Templates)
	if err != nil {
		panic(fmt.Sprintf("loading templates: %v", err))
	}

	p := "templates/opensearch.xml"
	s.OpenSearch = texttemplate.Must(texttemplate.ParseFS(templatesFS, p))

	s.AssetHashes = make(map[string]string)
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
	InternalViewRepos  map[string]config.RepoConfig `json:"internal_view_repos"`
	DefaultSearchRepos []string                     `json:"default_search_repos"`
	LinkConfigs        []config.LinkConfig          `json:"link_configs"`
}

func (s *server) makeSearchScriptData() (script_data *searchScriptData, backends []*Backend, sampleRepo string) {
	urls := make(map[string]map[string]string, len(s.bk))
	backends = make([]*Backend, 0, len(s.bk))
	sampleRepo = ""
	for _, bkId := range s.bkOrder {
		bk := s.bk[bkId]
		backends = append(backends, bk)
		bk.I.Lock()
		m := make(map[string]string, len(bk.I.Trees))
		urls[bk.Id] = m
		for _, r := range bk.I.Trees {
			if sampleRepo == "" {
				sampleRepo = r.Name
			}
			m[r.Name] = r.Url
		}
		bk.I.Unlock()
	}

	script_data = &searchScriptData{urls, s.repos, s.config.DefaultSearchRepos, s.config.LinkConfigs}

	return script_data, backends, sampleRepo
}

// Serve the page initialization data that is usually injected into the index.html go text template.
// This is useful in a custom frontend to initialize a repo list, links to GitHub, etc.
func (s *server) ServeRepoInfo(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	script_data, _, _ := s.makeSearchScriptData()
	replyJSON(ctx, w, 200, script_data)
}

func (s *server) ServeSearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	script_data, backends, sampleRepo := s.makeSearchScriptData()

	s.renderPage(ctx, w, r, "index.html", &page{
		Title:         "code search",
		ScriptName:    "codesearch",
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

func (s *server) ServeFile(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	repoName, path, err := getRepoPathFromURL(s.serveFilePathRegex, r.PathValue("path"))
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	commit := r.URL.Query().Get("commit")
	if commit == "" {
		commit = "HEAD"
	}

	if len(s.repos) == 0 {
		http.Error(w, "File browsing not enabled", 404)
		return
	}

	repo, ok := s.repos[repoName]
	if !ok {
		http.Error(w, "No such repo", 404)
		return
	}

	data, err := buildFileData(path, repo, commit)
	if err != nil {
		http.Error(w, "Error reading file: "+err.Error(), 500)
		return
	}

	script_data := &struct {
		RepoInfo config.RepoConfig `json:"repo_info"`
		FilePath string            `json:"file_path"`
		Commit   string            `json:"commit"`
	}{repo, path, commit}

	s.renderPage(ctx, w, r, "fileview.html", &page{
		Title:         data.PathSegments[len(data.PathSegments)-1].Name,
		ScriptName:    "fileview",
		ScriptData:    script_data,
		IncludeHeader: false,
		Data:          data,
	})
}

func (s *server) ServeAbout(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	s.renderPage(ctx, w, r, "about.html", &page{
		Title:         "about",
		IncludeHeader: true,
	})
}

func (s *server) ServeHelp(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	// Help is now shown in the main search page when no search has been entered.
	http.Redirect(w, r, "/search", 303)
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
		if bk.I.IndexTime.IsZero() {
			// backend didn't report index time
			continue
		}
		bkAge := now.Sub(bk.I.IndexTime)
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
		if bk.I.Name != "" {
			data.BackendName = bk.I.Name
			break
		}
	}

	templateName := "opensearch.xml"
	w.Header().Set("Content-Type", "application/xml")
	err := s.OpenSearch.ExecuteTemplate(w, templateName, data)
	if err != nil {
		log.Printf(ctx, "Error rendering %s: %s", templateName, err)
		return
	}
}

func (s *server) renderPage(ctx context.Context, w io.Writer, r *http.Request, templateName string, pageData *page) {
	t, ok := s.Templates[templateName]
	if !ok {
		log.Printf(ctx, "Error: no template named %v", templateName)
		return
	}

	pageData.Config = s.config
	pageData.AssetHashes = s.AssetHashes

	nonce := "" // custom nonce computation can go here

	if nonce != "" {
		pageData.Nonce = template.HTMLAttr(fmt.Sprintf(` nonce="%s"`, nonce))
	}

	err := t.ExecuteTemplate(w, templateName, pageData)
	if err != nil {
		log.Printf(ctx, "Error rendering %v: %s", templateName, err)
		return
	}
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
		bk:     make(map[string]*Backend),
		repos:  make(map[string]config.RepoConfig),
	}
	srv.loadTemplates()

	be, e := NewBackend("backend")
	if e != nil {
		return nil, e
	}
	be.Start()
	srv.bk[be.Id] = be
	srv.bkOrder = append(srv.bkOrder, be.Id)

	var repoNames []string
	for _, r := range srv.config.IndexConfig.Repositories {
		srv.repos[r.Name] = r
		repoNames = append(repoNames, r.Name)
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

	serveFilePathRegex, err := buildRepoRegex(repoNames)
	if err != nil {
		return nil, err
	}
	srv.serveFilePathRegex = serveFilePathRegex

	m := http.NewServeMux()
	m.HandleFunc("GET /debug/healthcheck", srv.ServeHealthcheck)
	m.Handle("GET /debug/stats", srv.Handler(srv.ServeStats))
	m.Handle("GET /search/{backend}", srv.Handler(srv.ServeSearch))
	m.Handle("GET /search/", srv.Handler(srv.ServeSearch))
	m.Handle("GET /view/{path...}", srv.Handler(srv.ServeFile))
	m.Handle("GET /about", srv.Handler(srv.ServeAbout))
	m.Handle("GET /help", srv.Handler(srv.ServeHelp))
	m.Handle("GET /opensearch.xml", srv.Handler(srv.ServeOpensearch))
	m.Handle("GET /", srv.Handler(srv.ServeRoot))

	// GET (with query parameters) is for backward compatibility; the UI now
	// uses POST (with form parameters).
	m.Handle("GET /api/v1/search/{backend}", srv.Handler(srv.ServeAPISearch))
	m.Handle("GET /api/v1/search/", srv.Handler(srv.ServeAPISearch))
	m.Handle("POST /api/v1/search/{backend}", srv.Handler(srv.ServeAPISearch))
	m.Handle("POST /api/v1/search/", srv.Handler(srv.ServeAPISearch))
	m.Handle("GET /api/v1/repos", srv.Handler(srv.ServeRepoInfo))

	var h http.Handler = m

	mux := http.NewServeMux()
	mux.Handle("/static/", http.FileServerFS(staticFS))
	mux.Handle("/", h)

	srv.inner = mux
	return srv, nil
}

func buildRepoRegex(repoNames []string) (*regexp.Regexp, error) {
	// Sort in descending order of length so most specific match is selected by regex engine
	sort.Slice(repoNames, func(i, j int) bool {
		return len(repoNames[i]) >= len(repoNames[j])
	})

	// Build regex of form "(repo1|repo2)/(path)"
	var buf bytes.Buffer
	for i, repoName := range repoNames {
		buf.WriteString(regexp.QuoteMeta(repoName))
		if i < len(repoNames)-1 {
			buf.WriteString("|")
		}
	}
	repoRegexAlt := buf.String()
	repoFileRegex, err := regexp.Compile(fmt.Sprintf("(%s)/(.*)", repoRegexAlt))
	if err != nil {
		return nil, fmt.Errorf("failed to create regular expression for URL parsing")
	}

	return repoFileRegex, nil
}

func getRepoPathFromURL(repoRegex *regexp.Regexp, urlPath string) (repo string, path string, err error) {
	matches := repoRegex.FindStringSubmatch(urlPath)
	if len(matches) == 0 {
		return "", "", serveUrlParseError
	}

	return matches[1], matches[2], nil
}
