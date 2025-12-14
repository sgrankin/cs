package server

import (
	"bytes"
	"context"
	"fmt"
	"net/http"
	"slices"
	"strings"

	"github.com/a-h/templ"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server/api"
	"sgrankin.dev/cs/livegrep/server/views"
)

func (s *server) makeSearchScriptData() (cs.SearchIndex, string) {
	sampleRepo := ""
	bk := s.bk
	info := bk.Info()
	trees := []string{}
	for _, tree := range info.Trees {
		if sampleRepo == "" {
			sampleRepo = tree.Name
		}
		trees = append(trees, tree.Name)
	}

	return bk, sampleRepo
}

func pageTitle(r *api.ReplySearch) string {
	title := "code search"
	if r != nil {
		title = fmt.Sprintf("%s · %s", r.Query.Line, title)
	}
	return title
}

func (s *server) ServeSearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	w.Header().Add("vary", "hx-request")
	if r.Header.Get("hx-request") == "true" {
		s.streamSearch(ctx, w, r)
		return
	}

	w.Header().Add("cache-control", "max-age=0")
	backend, sampleRepo := s.makeSearchScriptData()
	result, resultErr := s.searchForRequest(ctx, r)

	views.Index(
		views.Page{
			Title:         pageTitle(result),
			JSPath:        "static/codesearch_ui.js",
			CSSPath:       "static/codesearch_ui.css",
			IncludeHeader: true,
		},
		views.IndexPageData{
			Backend:         backend,
			SampleRepo:      sampleRepo,
			SearchResult:    result,
			SearchResultErr: resultErr,
		},
		r.Form,
	).Render(r.Context(), w)
}

func (s *server) streamSearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	w.Header().Add("cache-control", "no-store")
	result, resultErr := s.searchForRequest(ctx, r)
	// TODO: actually streaming search -- serve results as they are found.
	w.Header().Add("Content-Type", "text/event-stream")
	writeData(ctx, w, views.Title(pageTitle(result)))
	writeData(ctx, w, views.Partial("#regex-error", "outerHTML", views.RegexError(resultErr)))
	if result == nil {
		writeData(ctx, w, views.Partial("#resultbox", "innerHTML", views.Help()))
		return

	}
	writeData(ctx, w, views.Partial("#resultbox", "innerHTML", views.ResultArea()))
	writeData(ctx, w, views.Partial("#countarea", "innerHTML", views.CountView(result)))
	if len(result.Query.File) == 0 {
		for _, f := range result.Facets {
			if f.Key == "ext" {
				writeData(ctx, w, views.Partial("#file-extensions", "innerHTML", views.ExtensionsButtons(f)))
			}
		}
	}
	files := result.FileResults
	if !result.Query.FilenameOnly && len(files) > 10 {
		files = files[:10]
	}
	filenames := []templ.Component{}
	for _, r := range files {
		filenames = append(filenames, views.FilenameMatch(r))
	}
	writeData(ctx, w, views.Partial("#path-results", "innerHTML", templ.Join(filenames...)))
	for chunk := range slices.Chunk(result.Results, 10) {
		matches := []templ.Component{}
		for _, r := range chunk {
			matches = append(matches, views.FileContentMatch(r))
		}
		writeData(ctx, w, views.Partial("#code-results", "append", templ.Join(matches...)))

	}
	return
}

func writeData(ctx context.Context, w http.ResponseWriter, fragment templ.Component) {
	buf := bytes.Buffer{}
	fragment.Render(ctx, &buf)
	for line := range strings.Lines(buf.String()) {
		fmt.Fprintln(w, "data:", line)
	}
	fmt.Fprintln(w)
	http.NewResponseController(w).Flush()
}
