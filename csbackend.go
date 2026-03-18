// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package cs

import (
	"context"
	"encoding/json"
	"errors"
	"io/fs"
	"iter"
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
	"sync/atomic"
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
	// Then fan out the query to all searchers via a priority work queue:
	// - "search file" tasks are high priority (actual regex work)
	// - "expand repo" tasks are low priority (advance iterator to find next candidate file)
	// This avoids deadlocks from the old channel+semaphore approach while keeping
	// results deterministically ordered by repo name then file path.

	repoFilter, err := newRegexpFilter(q.Repo, q.NotRepo)
	if err != nil {
		return nil, err
	}
	selectorFilter := newSetFilter(q.RepoFilter)
	facetRepoFilter := newSetFilter(q.FacetRepos)
	var searchers []*indexSearcher
	for name, t := range si.trees {
		if selectorFilter.Accept([]byte(name)) && facetRepoFilter.Accept([]byte(name)) && repoFilter.Accept([]byte(name)) {
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

	ctxSearch, cancelSearch := context.WithCancel(ctx)
	defer cancelSearch()

	// Per-repo state: results collected into mutex-protected slices.
	type repoWork struct {
		searcher    *indexSearcher
		mu          sync.Mutex
		results     []SearchResult
		fileResults []FileResult
	}
	repos := make([]repoWork, len(searchers))
	for i, s := range searchers {
		repos[i].searcher = s
	}

	// File name searches run as simple goroutines (lightweight, no priority needed).
	var namesWg sync.WaitGroup
	for i := range repos {
		rs := &repos[i]
		namesWg.Add(1)
		go func() {
			defer namesWg.Done()
			r := rs.searcher.SearchFileNames(ctxSearch, re.Clone(), fileFilter.Clone(), q.MaxMatches)
			rs.mu.Lock()
			rs.fileResults = r
			rs.mu.Unlock()
		}()
	}

	// Content search uses a two-level priority work queue.
	// High priority: file content search (CPU-bound DFA regex).
	// Low priority: expand repo iterator (find next candidate file).
	// Workers prefer search over expand, so CPU stays productive.
	// Results go into per-repo slices (no channels, no blocking, no deadlock).

	// stops holds iter.Pull stop functions; called after all workers have finished
	// (via taskWg/workerWg.Wait) so no next() calls are in flight.
	var stops []func()
	defer func() {
		for _, stop := range stops {
			stop()
		}
	}()

	if !q.FilenameOnly {
		wq := newSearchQueue()
		var taskWg sync.WaitGroup

		// matchCount is an approximate global match counter used to cancel the
		// search context early when we've found enough results. It races with the
		// concurrent workers so the count is imprecise — the drain loop (below)
		// re-checks the exact limit when assembling the final result in repo order.
		var matchCount atomic.Int64

		for i := range repos {
			rs := &repos[i]
			next, stop := iter.Pull(rs.searcher.SearchFiles(
				ctxSearch, re.Clone(), fileFilter.Clone(), q.ContextLines, q.MaxMatches))
			stops = append(stops, stop)

			// expandRepo pulls one candidate file from the iterator, enqueues a
			// high-priority search task for it, then re-enqueues itself at low priority.
			// Each repo has at most one expand task in flight, so next() is never
			// called concurrently.
			var expandRepo func()
			expandRepo = func() {
				defer taskWg.Done()
				if ctxSearch.Err() != nil {
					return
				}
				f, ok := next()
				if !ok {
					return // iterator exhausted
				}
				// Enqueue the file content search (high priority).
				taskWg.Add(1)
				wq.pushHigh(func() {
					defer taskWg.Done()
					if ctxSearch.Err() != nil {
						return
					}
					result := f()
					if result != nil {
						rs.mu.Lock()
						rs.results = append(rs.results, *result)
						rs.mu.Unlock()
						if matchCount.Add(int64(len(result.Lines))) > int64(q.MaxMatches) {
							cancelSearch()
						}
					}
				})
				// Re-enqueue self to expand the next candidate (low priority).
				// taskWg.Add must precede pushLow to prevent taskWg.Wait from
				// completing before the re-enqueued task runs.
				taskWg.Add(1)
				wq.pushLow(expandRepo)
			}
			taskWg.Add(1)
			wq.pushLow(expandRepo)
		}

		// Start workers (same count as GOMAXPROCS to match CPU parallelism).
		numWorkers := runtime.GOMAXPROCS(0)
		var workerWg sync.WaitGroup
		for range numWorkers {
			workerWg.Add(1)
			go func() {
				defer workerWg.Done()
				for {
					task, ok := wq.pop()
					if !ok {
						return
					}
					task()
				}
			}()
		}

		taskWg.Wait()
		wq.close()
		workerWg.Wait()
	}

	namesWg.Wait()

	// Assemble results in sorted repo order.
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
		facets[key][val]++
	}

	nMatches := 0
	limitHit := false
	for i := range repos {
		rs := &repos[i]
		// Sort results within repo by path.
		sort.Slice(rs.results, func(a, b int) bool {
			return rs.results[a].File.Path < rs.results[b].File.Path
		})

		for _, r := range rs.results {
			incFacet("repo", r.File.Tree)
			incFacet("ext", path.Ext(r.File.Path))
			incFacet("path", pathFacetValue(r.File.Path, q.FacetPaths))
			nMatches += len(r.Lines)
			searchResults = append(searchResults, r)
			if nMatches > q.MaxMatches {
				limitHit = true
				break
			}
		}

		fileResults = append(fileResults, rs.fileResults...)
		if q.FilenameOnly {
			nMatches = len(fileResults)
			if nMatches > q.MaxMatches {
				limitHit = true
			}
		}

		if limitHit {
			exitReason = ExitReasonMatchLimit
			break
		}
	}

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

// searchQueue is a two-level priority work queue. High-priority tasks (file
// content searches) are always dequeued before low-priority tasks (repo
// iterator expansion). Workers block in pop() until work is available or
// the queue is closed.
type searchQueue struct {
	mu     sync.Mutex
	cond   *sync.Cond
	high   []func()
	low    []func()
	closed bool
}

func newSearchQueue() *searchQueue {
	q := &searchQueue{}
	q.cond = sync.NewCond(&q.mu)
	return q
}

func (q *searchQueue) pushHigh(fn func()) {
	q.mu.Lock()
	q.high = append(q.high, fn)
	q.mu.Unlock()
	q.cond.Signal()
}

func (q *searchQueue) pushLow(fn func()) {
	q.mu.Lock()
	q.low = append(q.low, fn)
	q.mu.Unlock()
	q.cond.Signal()
}

// pop returns the next task, preferring high-priority. Blocks if both queues are
// empty. Returns (nil, false) only when both queues are empty and the queue is closed.
func (q *searchQueue) pop() (func(), bool) {
	q.mu.Lock()
	defer q.mu.Unlock()
	for len(q.high) == 0 && len(q.low) == 0 && !q.closed {
		q.cond.Wait()
	}
	if len(q.high) > 0 {
		fn := q.high[0]
		q.high = q.high[1:]
		return fn, true
	}
	if len(q.low) > 0 {
		fn := q.low[0]
		q.low = q.low[1:]
		return fn, true
	}
	return nil, false
}

func (q *searchQueue) close() {
	q.mu.Lock()
	q.closed = true
	q.mu.Unlock()
	q.cond.Broadcast()
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
