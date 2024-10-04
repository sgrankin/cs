package server

import (
	"cmp"
	"context"
	"fmt"
	"log"
	"maps"
	"net/http"
	"path"
	"slices"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server/api"
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

type searchPageData struct {
	Backend    string
	Backends   []cs.SearchIndex
	SampleRepo string
	SearchData *searchData
	SearchErr  error
	// TODO: For the view, we need:
	// - Count of results (as we can't calculate it in the template -- SearchData returns trees...
	// - we must aggregate the lines in each result file group
	// - should just have a list of lines content & attributes (lno, matched?)
}

type searchData struct {
	*api.ReplySearch
	Query       cs.Query
	ResultCount int
	Extensions  []string // Popular extensions to filter results by.
}

func (s *server) ServeSearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	backendName := r.PathValue("backend")
	scriptData, backends, sampleRepo := s.makeSearchScriptData()
	searchData, searchErr := s.searchData(ctx, r)

	// Need:
	// - search results (if any)
	// - search stats
	// - an error message (if one)
	s.renderPage(w, "index.html", &page{
		Title:         "code search",
		JSPath:        "codesearch_ui",
		CSSPath:       "codesearch_ui",
		ScriptData:    scriptData,
		IncludeHeader: true,
		Data: &searchPageData{
			Backend:    backendName,
			Backends:   backends,
			SampleRepo: sampleRepo,
			SearchData: searchData,
			SearchErr:  searchErr,
		},
	})
}

func (s *server) searchData(ctx context.Context, r *http.Request) (*searchData, error) {
	backendName := r.PathValue("backend")
	var backend cs.SearchIndex
	if backendName != "" {
		backend = s.bk[backendName]
		if backend == nil {
			return nil, fmt.Errorf("unknown backend: %s", backendName)
		}
	} else {
		// Pick a backend, any backend...
		for _, backend = range s.bk {
			break
		}
	}

	q, _, err := extractQuery(r)
	if err != nil {
		return nil, err
	}

	if q.Line == "" {
		// Nothing to do:
		return nil, nil
	}

	if q.MaxMatches == 0 {
		q.MaxMatches = s.config.DefaultMaxMatches
	}
	if q.ContextLines == 0 {
		q.ContextLines = 3
	}

	searchResult, err := s.doSearch(ctx, backend, &q)
	if err != nil {
		return nil, err
	}

	log.Printf("responding success results=%d why=%s stats=%s",
		len(searchResult.Results),
		searchResult.Info.ExitReason,
		asJSON{searchResult.Info})
	count := len(searchResult.FileResults)
	if !q.FilenameOnly {
		count = 0
		for _, r := range searchResult.Results {
			count += len(r.Lines)
		}
	}

	extensions := map[string]int{}
	for _, f := range searchResult.Results {
		extensions[path.Ext(f.Path)] += 1
	}
	delete(extensions, "")
	topExtensions := slices.SortedFunc(maps.Keys(extensions), func(s1 string, s2 string) int {
		return cmp.Or(
			cmp.Compare(extensions[s2], extensions[s1]),
			cmp.Compare(s1, s2),
		)
	})
	if len(topExtensions) > 5 {
		topExtensions = topExtensions[:5]
	}

	return &searchData{
		ReplySearch: searchResult,
		Query:       q,
		ResultCount: count,
		Extensions:  topExtensions,
	}, nil
}
