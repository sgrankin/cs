// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package cs

import (
	"context"
	"encoding/json"
	"errors"
	"io/fs"
	"log"
	"maps"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"regexp/syntax"
	"runtime"
	"sort"
	"strings"
	"sync"
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

	regexFileFilter, err := newRegexpFilter(strings.Join(q.File, "|"), strings.Join(q.NotFile, "|"))
	if err != nil {
		return nil, err
	}
	fileFilter := newCompositeFilter(
		regexFileFilter,
		newExtensionFilter(q.FacetExtensions),
		newPathPrefixFilter(q.FacetPaths),
	)

	// Sort searchers by repo name for deterministic output ordering.
	sort.Slice(searchers, func(i, j int) bool {
		return searchers[i].repo < searchers[j].repo
	})

	// Per-repo result channels: all repos search concurrently, results drained in sorted order.
	const chanBuffer = 64
	type repoSearch struct {
		searcher *indexSearcher
		results  chan SearchResult
		files    chan []FileResult
	}
	repos := make([]repoSearch, len(searchers))
	ctxSearch, cancelSearch := context.WithCancel(ctx)

	sem := make(chan struct{}, runtime.GOMAXPROCS(0)) // shared parallelism limiter

	for i, s := range searchers {
		repos[i] = repoSearch{
			searcher: s,
			results:  make(chan SearchResult, chanBuffer),
			files:    make(chan []FileResult, 1),
		}
		rs := &repos[i]

		// Launch file name search.
		go func() {
			defer close(rs.files)
			r := rs.searcher.SearchFileNames(ctxSearch, re.Clone(), fileFilter.Clone(), q.MaxMatches)
			if len(r) > 0 {
				select {
				case rs.files <- r:
				case <-ctxSearch.Done():
				}
			}
		}()

		// Launch content search with per-file parallelism via shared semaphore.
		if !q.FilenameOnly {
			go func() {
				defer close(rs.results)
				var wg sync.WaitGroup
				for f := range rs.searcher.SearchFiles(ctxSearch, re.Clone(), fileFilter.Clone(), q.ContextLines, q.MaxMatches) {
					sem <- struct{}{} // acquire
					wg.Add(1)
					go func() {
						defer func() { <-sem; wg.Done() }()
						result := f()
						if result != nil {
							select {
							case rs.results <- *result:
							case <-ctxSearch.Done():
							}
						}
					}()
				}
				wg.Wait()
			}()
		} else {
			close(rs.results)
		}
	}

	// Drain results in repo-sorted order for deterministic output.
	exitReason := ExitReasonNone
	searchResults := []SearchResult{}
	fileResults := []FileResult{}
	facets := map[string]map[string]int{}
	incFacet := func(key, val string) {
		if val == "" {
			return
		}
		if facets[key] == nil {
			facets[key] = map[string]int{}
		}
		facets[key][val] += 1
	}

	nMatches := 0
	limitHit := false
	for i := range repos {
		// Drain code results for this repo, sort by path within repo.
		var repoResults []SearchResult
		for r := range repos[i].results {
			repoResults = append(repoResults, r)
			incFacet("repo", r.File.Tree)
			incFacet("ext", path.Ext(r.File.Path))
			incFacet("path", pathFacetValue(r.File.Path, q.FacetPaths))
			nMatches += len(r.Lines)
			if nMatches > q.MaxMatches {
				limitHit = true
				break
			}
		}
		// Tree and Version are constant within a repo's results; Path alone determines order.
		sort.Slice(repoResults, func(a, b int) bool {
			return repoResults[a].File.Path < repoResults[b].File.Path
		})
		searchResults = append(searchResults, repoResults...)

		// Drain file results for this repo.
		if !limitHit {
			for r := range repos[i].files {
				fileResults = append(fileResults, r...)
			}
			if q.FilenameOnly {
				nMatches = len(fileResults)
				limitHit = nMatches > q.MaxMatches
			}
		}

		if limitHit {
			exitReason = ExitReasonMatchLimit
			cancelSearch()
			// Drain all remaining channels to unblock goroutines.
			for j := i; j < len(repos); j++ {
				for range repos[j].results {
				}
				for range repos[j].files {
				}
			}
			break
		}
	}
	cancelSearch()

	facetResults := []Facet{}
	for key, values := range facets {
		fv := []FacetValue{}
		for val, count := range values {
			fv = append(fv, FacetValue{val, count})
		}
		sort.Slice(fv, func(i, j int) bool {
			return fv[i].Count > fv[j].Count ||
				fv[i].Count == fv[j].Count && fv[i].Value < fv[j].Value
		})
		facetResults = append(facetResults, Facet{key, fv})
	}
	sort.Slice(facetResults, func(i, j int) bool { return facetResults[i].Key < facetResults[j].Key })

	return &CodeSearchResult{
		Stats:       SearchStats{ExitReason: exitReason},
		Results:     searchResults,
		FileResults: fileResults,
		Facets:      facetResults,
	}, nil
}

// pathFacetValue returns the directory prefix to use as a path facet for the
// given file path. When active path filters exist, it returns the next directory
// level below the deepest matching filter. Otherwise it returns the first
// directory component.
//
// Examples (no active filters): "src/main.go" → "src/"
// With filter "src/":           "src/clj/core.clj" → "src/clj/"
// With filter "src/clj/":       "src/clj/core.clj" → "" (file, not dir)
func pathFacetValue(filePath string, activePaths []string) string {
	// Find the deepest active prefix that matches this file.
	prefix := ""
	for _, p := range activePaths {
		if strings.HasPrefix(filePath, p) && len(p) > len(prefix) {
			prefix = p
		}
	}

	// Find the next "/" after the prefix to get one level deeper.
	rest := filePath[len(prefix):]
	idx := strings.Index(rest, "/")
	if idx < 0 {
		return "" // File at this level, not a subdirectory.
	}
	return filePath[:len(prefix)+idx+1]
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
		fsys, err := repo.FS()
		if err != nil {
			return err
		}
		if err := BuildIndexFromFS(indexPath, fsys); err != nil {
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

	// GC the repo... otherwise the growth is unbounded.
	log.Printf("Running git gc in %q", gitPath)
	cmd := exec.Command("git", "gc", "-q")
	cmd.Dir = gitPath
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		return err
	}
	return nil
}
