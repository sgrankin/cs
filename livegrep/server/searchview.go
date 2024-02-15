package server

import (
	"context"
	"net/http"

	"sgrankin.dev/cs/livegrep/server/config"
)

type searchScriptData struct {
	BackendRepos       map[string][]string `json:"backend_repos"`
	DefaultSearchRepos []string            `json:"default_search_repos"`
	LinkConfigs        []config.LinkConfig `json:"link_configs"`
}

func (s *server) makeSearchScriptData() (script_data *searchScriptData, backends []*Backend, sampleRepo string) {
	backends = []*Backend{}
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
		repos[bk.ID] = trees
	}

	script_data = &searchScriptData{repos, s.repos, s.config.LinkConfigs}
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
