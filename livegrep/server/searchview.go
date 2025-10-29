package server

import (
	"context"
	"fmt"
	"net/http"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server/api"
	"sgrankin.dev/cs/livegrep/server/views"
)

func (s *server) makeSearchScriptData() (script_data *api.SearchScriptData, backends []cs.SearchIndex, sampleRepo string) {
	backends = []cs.SearchIndex{}
	repos := map[string][]string{}
	sampleRepo = ""
	for _, bkId := range s.bkOrder {
		bk := s.bk[bkId]
		backends = append(backends, bk)
		info := bk.Info()
		trees := []string{}
		for _, tree := range info.Trees {
			if sampleRepo == "" {
				sampleRepo = tree.Name
			}
			trees = append(trees, tree.Name)
		}
		repos[bk.Name()] = trees
	}

	script_data = &api.SearchScriptData{
		BackendRepos: repos,
		LinkConfigs:  s.config.Templates.Links,
	}
	return script_data, backends, sampleRepo
}

func (s *server) ServeSearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	backend := r.PathValue("backend")
	scriptData, backends, sampleRepo := s.makeSearchScriptData()
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
			Backends:        backends,
			SampleRepo:      sampleRepo,
			SearchResult:    result,
			SearchResultErr: resultErr,
		},
	).Render(r.Context(), w)
}
