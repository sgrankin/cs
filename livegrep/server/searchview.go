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
	script_data, backends, sampleRepo := s.makeSearchScriptData()

	s.renderPage(w, "index.html", &page{
		Title:         "code search",
		JSPath:        "codesearch/codesearch_ui",
		CSSPath:       "codesearch/codesearch_ui",
		ScriptData:    script_data,
		IncludeHeader: true,
		Data: struct {
			Backends   []cs.SearchIndex
			SampleRepo string
		}{
			Backends:   backends,
			SampleRepo: sampleRepo,
		},
	})
}
