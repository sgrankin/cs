package cs

import (
	"context"
	"encoding/json"
	"errors"
	"io/fs"
	"log"
	"maps"
	"os"
	"path/filepath"
	"regexp/syntax"
	"runtime"
	"sort"
	"strings"
	"time"

	"golang.org/x/sync/errgroup"

	"sgrankin.dev/cs/codesearch/index"
	"sgrankin.dev/cs/codesearch/regexp"
)

type Version = string

/*
A search index is a directory that contains everything needed to build, update, and search several git repositories.

Layout:

	/meta.json
		Contains the repository names, versions, and the relative paths to the search index for searching them.
	/indexes/{sha1}.csindex
		The index for the given sha1 hash.  The hash is lowercased git hash of the commit.
	/git/
		The (bare) git repository with refs corresponding to repo/tree names names.
*/
type searchIndex struct {
	cfg   IndexConfig
	meta  indexMeta
	trees map[string]struct {
		*indexSearcher
		Version string
	}
}

func NewSearchIndex(cfg IndexConfig) *searchIndex {
	if cfg.Name == "" {
		cfg.Name = filepath.Base(cfg.Path)
	}
	if err := os.MkdirAll(cfg.Path, 0o777); err != nil {
		log.Panicf("creating %q: %v", cfg.Path, err)
	}

	si := &searchIndex{
		cfg: cfg,
		trees: map[string]struct {
			*indexSearcher
			Version string
		}{},
	}
	meta, err := readIndexMeta(cfg.Path)
	if err != nil {
		log.Panic(err)
	}
	si.meta = *meta
	for _, tree := range meta.Trees {
		si.trees[tree.Name] = struct {
			*indexSearcher
			Version string
		}{
			indexSearcher: newIndexSearcher(index.Open(filepath.Join(cfg.Path, tree.IndexPath)), tree.Name, tree.Version),
			Version:       tree.Version,
		}
	}
	return si
}

func (si *searchIndex) Reload() {
	meta, err := readIndexMeta(si.cfg.Path)
	if err != nil || meta.ModTime.Equal(si.meta.ModTime) {
		return
	}
	log.Printf("Reloading index %s at %s (%v -> %v)", si.cfg.Name, si.cfg.Path, meta.ModTime, si.meta.ModTime)
	*si = *NewSearchIndex(si.cfg)
}

func (si *searchIndex) Name() string { return si.cfg.Name }

// Info implements SearchIndex.
func (si *searchIndex) Info() IndexInfo {
	info := IndexInfo{
		IndexTime: si.meta.ModTime,
	}
	for name, t := range si.trees {
		info.Trees = append(info.Trees, Tree{
			Name:    name,
			Version: t.Version,
		})
	}
	return info
}

// Paths implements SearchIndex.
func (si *searchIndex) Paths(tree string, version string, pathPrefix string) []File {
	return si.trees[tree].Paths(pathPrefix)
}

// Data implements SearchIndex.
func (si *searchIndex) Data(tree string, version string, path string) string {
	return si.trees[tree].Data(path)
}

// Search implements SearchIndex.
func (si *searchIndex) Search(ctx context.Context, q Query) (*CodeSearchResult, error) {
	// Use the query repo filters to scope down to the searchers that should handle the query.
	// Then fan out the query to all searchers,
	// - limiting parallelism
	// - canceling the search once we have sufficient results.

	repoFilter, err := newRegexpFilter(q.Repo, q.NotRepo)
	if err != nil {
		return nil, err
	}
	var fixedRepoFilter *setFilter
	if q.RepoFilter != nil {
		fixedRepoFilter = newSetFilter(q.RepoFilter)
	}
	var searchers []*indexSearcher
	for name, t := range si.trees {
		if fixedRepoFilter.Accept([]byte(name)) && repoFilter.Accept([]byte(name)) {
			searchers = append(searchers, t.indexSearcher)
		}
	}

	pat := q.Line

	var flags syntax.Flags
	if q.FoldCase {
		flags |= syntax.FoldCase
	}
	re, err := regexp.Compile(pat, flags)
	if err != nil {
		return nil, err
	}

	fileFilter, err := newRegexpFilter(strings.Join(q.File, "|"), strings.Join(q.NotFile, "|"))
	if err != nil {
		return nil, err
	}

	fileSearchChan := make(chan []FileResult)
	ctxFileSearch, cancelFileSearch := context.WithCancel(ctx)
	go func(ctx context.Context) {
		defer close(fileSearchChan)
		wg, ctx := errgroup.WithContext(ctx)
		wg.SetLimit(runtime.GOMAXPROCS(0))
		for _, searcher := range searchers {
			wg.Go(func() error {
				r := searcher.SearchFileNames(ctx, re.Clone(), fileFilter.Clone(), q.MaxMatches)
				if len(r) > 0 {
					select {
					case fileSearchChan <- r:
					case <-ctx.Done():
					}
				}
				return nil
			})
		}
		wg.Wait()
	}(ctxFileSearch)

	var exitReason ExitReason = ExitReasonNone
	var searchResults []SearchResult
	if !q.FilenameOnly {
		searchChan := make(chan SearchResult)
		ctxSearch, cancelSearch := context.WithCancel(ctx)
		go func(ctx context.Context) {
			defer close(searchChan)
			wg, ctx := errgroup.WithContext(ctx)
			wg.SetLimit(runtime.GOMAXPROCS(0))
			for _, searcher := range searchers {
				searcher.SearchFiles(ctx, re.Clone(), fileFilter.Clone(), q.ContextLines, q.MaxMatches, func(f func() *SearchResult) {
					wg.Go(func() error {
						result := f()
						if result != nil {
							select {
							case searchChan <- *result:
							case <-ctx.Done():
							}
						}
						return nil
					})
				})
			}
			wg.Wait()
		}(ctxSearch)

		nMatches := 0
		for r := range searchChan {
			searchResults = append(searchResults, r)
			nMatches += len(r.Lines)
			if nMatches > q.MaxMatches {
				exitReason = ExitReasonMatchLimit
				break
			}
		}
		cancelSearch()
		sort.Slice(searchResults, func(i, j int) bool { return searchResults[i].File.Less(searchResults[j].File) })
	}

	fileResults := []FileResult{}
	for r := range fileSearchChan {
		fileResults = append(fileResults, r...)
		if len(fileResults) > q.MaxMatches {
			if q.FilenameOnly {
				exitReason = ExitReasonMatchLimit
			}
			break
		}
	}
	cancelFileSearch()
	sort.Slice(fileResults, func(i, j int) bool { return fileResults[i].File.Less(fileResults[j].File) })

	return &CodeSearchResult{
		Stats:       SearchStats{ExitReason: exitReason},
		Results:     searchResults,
		FileResults: fileResults,
	}, nil
}

type treeMeta struct {
	Name      string
	Version   string
	IndexPath string
}

type indexMeta struct {
	ModTime time.Time
	Trees   []treeMeta
}

func readIndexMeta(indexPath string) (*indexMeta, error) {
	path := filepath.Join(indexPath, "meta.json")
	f, err := os.Open(path)
	if errors.Is(err, fs.ErrNotExist) {
		// If the index is new, the meta doesn't exist, but this is a well formed empty index.
		return &indexMeta{}, nil
	} else if err != nil {
		return nil, err
	}
	defer f.Close()
	stat, err := f.Stat()
	if err != nil {
		return nil, err
	}
	meta := indexMeta{ModTime: stat.ModTime()}
	return &meta, json.NewDecoder(f).Decode(&meta.Trees)
}

func writeIndexMeta(indexPath string, trees []treeMeta) error {
	path := filepath.Join(indexPath, "meta.json")
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer f.Close()
	return json.NewEncoder(f).Encode(trees)
}

var _ SearchIndex = (*searchIndex)(nil)

func BuildSearchIndex(cfg IndexConfig, githubToken string) error {
	if cfg.Name == "" {
		cfg.Name = filepath.Base(cfg.Path)
	}
	if err := os.MkdirAll(cfg.Path, 0o777); err != nil {
		log.Panicf("creating %q: %v", cfg.Path, err)
	}

	gitPath := filepath.Join(cfg.Path, "git")
	repoSyncer := newRepoSyncer(gitPath, githubToken, cfg.Repos, cfg.RepoSources)
	repos, err := repoSyncer.Refresh()
	if err != nil {
		log.Printf("Repo sync failed: %v", err)
		return nil
	}
	repoMap := map[string]string{}
	for _, r := range repos {
		if r.Version() != "" {
			repoMap[r.Name()] = r.Version()
		}
	}

	meta, err := readIndexMeta(cfg.Path)
	if err != nil {
		return err
	}
	unusedIndexes := map[string]bool{}
	metaMap := map[string]string{}
	for _, t := range meta.Trees {
		metaMap[t.Name] = t.Version
		unusedIndexes[t.IndexPath] = true
	}
	if maps.Equal(repoMap, metaMap) {
		return nil // Nothing to do.
	}

	wg := errgroup.Group{}
	wg.SetLimit(1)
	wg.SetLimit(runtime.GOMAXPROCS(0))

	metaTrees := []treeMeta{}
	for _, repo := range repos {
		if repo.Version() == "" {
			continue
		}
		indexPath := filepath.Join("indexes", repo.Version())
		metaTrees = append(metaTrees, treeMeta{
			Name:      repo.Name(),
			Version:   repo.Version(),
			IndexPath: indexPath,
		})
		if metaMap[repo.Name()] == repo.Version() {
			delete(unusedIndexes, indexPath)
			continue // Already up to date.
		}

		indexPath = filepath.Join(cfg.Path, indexPath)
		log.Printf("Building index for %s %s at %s", repo.Name(), repo.Version(), indexPath)
		os.MkdirAll(filepath.Dir(indexPath), 0o777)
		if err := BuildIndex(indexPath, []Repo{repo}); err != nil {
			return err
		}
	}
	if err := wg.Wait(); err != nil {
		return err
	}
	if err := writeIndexMeta(cfg.Path, metaTrees); err != nil {
		return err
	}
	// Now clean up the old indexes.
	for path := range unusedIndexes {
		if err := os.Remove(filepath.Join(cfg.Path, path)); err != nil {
			return err
		}
	}
	return nil
}
