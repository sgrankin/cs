package server

import (
	"context"
	"net/http"

	"sgrankin.dev/cs"
)

type searchScriptData struct {
	BackendRepos map[string][]string `json:"backend_repos"`
	LinkConfigs  []cs.LinkConfig     `json:"link_configs"`
}

func (s *server) makeSearchScriptData() (script_data *searchScriptData, backends []cs.SearchIndex, sampleRepo string) {
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

	script_data = &searchScriptData{repos, s.config.Templates.Links}
	return script_data, backends, sampleRepo
}

func (s *server) ServeSearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	backend := r.PathValue("backend")
	scriptData, backends, sampleRepo := s.makeSearchScriptData()

	s.renderPage(w, "index.html", &page{
		Title:         "code search",
		JSPath:        entrypointMeta["web/codesearch_ui.tsx"].JS,
		CSSPath:       entrypointMeta["web/codesearch_ui.tsx"].CSS,
		ScriptData:    scriptData,
		IncludeHeader: true,
		Data: struct {
			Backend    string
			Backends   []cs.SearchIndex
			SampleRepo string
		}{
			Backend:    backend,
			Backends:   backends,
			SampleRepo: sampleRepo,
		},
	})
}
