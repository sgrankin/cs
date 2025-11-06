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

func (s *server) makeSearchScriptData() (*api.SearchScriptData, cs.SearchIndex, string) {
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

	script_data := &api.SearchScriptData{Repos: trees}
	return script_data, bk, sampleRepo
}

func (s *server) ServeSearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Vary", "HX-Request")
	scriptData, backend, sampleRepo := s.makeSearchScriptData()
	result, resultErr := s.searchForRequest(ctx, r)
	title := "code search"
	if result != nil {
		title = fmt.Sprintf("%s · %s", result.Query.Line, title)
	}

	if r.Header.Get(http.CanonicalHeaderKey("HX-Request")) == "true" {
		// TODO: actually streaming search -- serve results as they are found.
		w.Header().Add("Content-Type", "text/event-stream")
		writeData(ctx, w, views.Title(title))
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
	} else {
		views.Index(
			views.Page{
				Title:         title,
				JSPath:        meta.EntrypointMap["web/codesearch_ui.tsx"].JS,
				CSSPath:       meta.EntrypointMap["web/codesearch_ui.tsx"].CSS,
				ScriptData:    scriptData,
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
