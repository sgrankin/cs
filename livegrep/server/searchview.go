package server

import (
	"context"
	"fmt"
	"net/http"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server/api"
	"sgrankin.dev/cs/livegrep/server/views"
)

func (s *server) makeSearchScriptData() (script_data *api.SearchScriptData, backend cs.SearchIndex, sampleRepo string) {
	sampleRepo = ""
	bk := s.bk
	info := bk.Info()
	trees := []string{}
	for _, tree := range info.Trees {
		if sampleRepo == "" {
			sampleRepo = tree.Name
		}
		trees = append(trees, tree.Name)
	}

	script_data = &api.SearchScriptData{Repos: trees}
	return script_data, bk, sampleRepo
}

func (s *server) ServeSearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	scriptData, backend, sampleRepo := s.makeSearchScriptData()
	result, resultErr := s.searchForRequest(ctx, r)
	title := "code search"
	if result != nil {
		title = fmt.Sprintf("%s · %s", result.Query.Line, title)
	}
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
	).Render(r.Context(), w)
}
