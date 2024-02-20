package cs

import (
	"bytes"
	"context"
	"regexp/syntax"
	"runtime"
	"strings"
	"sync"
	"sync/atomic"

	"sgrankin.dev/cs/codesearch/index"
	"sgrankin.dev/cs/codesearch/regexp"
)

type indexSearcher struct {
	ix *index.Index
	mu sync.RWMutex
}

func newIndexSearcher(ix *index.Index) *indexSearcher {
	return &indexSearcher{ix: ix}
}

func (b *indexSearcher) swapIndex(ix *index.Index) *index.Index {
	b.mu.Lock()
	defer b.mu.Unlock()
	ix, b.ix = b.ix, ix
	return ix
}

func (b *indexSearcher) Info() IndexInfo {
	b.mu.RLock()
	defer b.mu.RUnlock()
	res := IndexInfo{
		IndexTime: b.ix.FileInfo.ModTime(),
	}

	for _, p := range b.ix.Paths() {
		repo, version, _ := strings.Cut(p, "@")
		res.Trees = append(res.Trees, Tree{Name: repo, Version: version})
	}
	return res
}

func (b *indexSearcher) Data(repo, version, path string) string {
	b.mu.RLock()
	defer b.mu.RUnlock()
	return string(b.ix.DataAtName(repo + "@" + version + "/+/" + path))
}

func (b *indexSearcher) Paths(repo, version, prefix string) []File {
	b.mu.RLock()
	defer b.mu.RUnlock()
	var res []File
	for _, name := range b.ix.Names([]byte(repo + "@" + version + "/+/" + prefix)) {
		repo, version, path := splitname(name)
		res = append(res, File{
			Tree:    string(repo),
			Version: string(version),
			Path:    string(path),
		})
	}
	return res
}

// Search will execute the query using up to GOMAXPROCS threads.
func (b *indexSearcher) Search(ctx context.Context, req Query) (*CodeSearchResult, error) {
	b.mu.RLock()
	defer b.mu.RUnlock()

	pat := req.Line

	var flags syntax.Flags
	if req.FoldCase {
		flags |= syntax.FoldCase
	}
	re, err := regexp.Compile(pat, flags)
	if err != nil {
		return nil, err
	}

	repoFilter, err := newRegexpFilter(req.Repo, req.NotRepo)
	if err != nil {
		return nil, err
	}
	var fixedRepoFilter *setFilter
	if req.RepoFilter != nil {
		fixedRepoFilter = newSetFilter(req.RepoFilter)
	}
	fileFilter, err := newRegexpFilter(strings.Join(req.File, "|"), strings.Join(req.NotFile, "|"))
	if err != nil {
		return nil, err
	}

	syn, err := syntax.Parse(pat, syntax.PerlX|flags)
	if err != nil {
		return nil, err
	}

	// Find filename matches.
	fresults := make(chan []FileResult, 1)
	defer close(fresults)
	go func(re *regexp.Regexp, repoFilter, fileFilter *regexpFilter) {
		res := []FileResult{}
		for _, fileid := range b.ix.PostingQuery(&index.Query{Op: index.QAll}) {
			postName := b.ix.NameBytes(fileid)
			repo, version, path := splitname(postName)
			if !fixedRepoFilter.Accept(repo) || !repoFilter.Accept(repo) || !fileFilter.Accept(path) {
				continue
			}
			m := regexp.Match(re, path)
			if m == nil {
				continue
			}
			res = append(res, FileResult{
				File: File{
					Tree:    string(repo),
					Version: string(version),
					Path:    string(path),
				},
				Bounds: Bounds{Left: m.Start, Right: m.End},
			})
			if len(res) >= req.MaxMatches {
				break
			}
		}
		fresults <- res
	}(re.Clone(), repoFilter.Clone(), fileFilter.Clone())

	csResult := CodeSearchResult{
		Stats: SearchStats{
			ExitReason: ExitReasonNone,
		},
	}

	if !req.FilenameOnly {
		q := index.RegexpQuery(syn)
		post := b.ix.PostingQuery(q)

		results := make([]SearchResult, 0, min(req.MaxMatches, len(post)))
		ctx, cancel := context.WithCancel(ctx)
		defer cancel()

		var idx atomic.Int64 // Each worker will claim a posting atomically.
		idx.Store(-1)

		numWorkers := min(runtime.GOMAXPROCS(0), len(post))
		perFileResults := make(chan []SearchResult, numWorkers)
		var wg sync.WaitGroup
		for range numWorkers {
			wg.Add(1)
			go func(re *regexp.Regexp, repoFilter *regexpFilter, fileFilter *regexpFilter) {
				defer wg.Done()
				for ctx.Err() == nil { // Cancelled?
					i := idx.Add(1)
					if int(i) >= len(post) {
						return // No more work.
					}
					postName := b.ix.NameBytes(post[i])
					repo, version, name := splitname(postName)
					if !fixedRepoFilter.Accept(repo) || !repoFilter.Accept(repo) || !fileFilter.Accept(name) {
						continue
					}
					blob := b.ix.Data(post[i])
					results := searchBlob(re, blob, repo, version, name, req.ContextLines, req.MaxMatches)
					if len(results) == 0 {
						continue
					}
					select {
					case perFileResults <- results:
					case <-ctx.Done():
						return // Cancelled
					}
				}
			}(re.Clone(), repoFilter.Clone(), fileFilter.Clone())
		}
		go func() {
			// When all workers are done (either due to running out of files or cancellation) we're done searching.
			wg.Wait()
			close(perFileResults)
		}()

		for perFileResults := range perFileResults {
			results = append(results, perFileResults...)
			if len(results) >= req.MaxMatches {
				cancel()
				break
			}
		}
		if len(results) >= req.MaxMatches {
			csResult.Stats.ExitReason = ExitReasonMatchLimit
			results = results[:req.MaxMatches]
		}
		csResult.Results = results
	}

	fileResults := <-fresults
	if len(fileResults) >= req.MaxMatches {
		fileResults = fileResults[:req.MaxMatches]
		csResult.Stats.ExitReason = ExitReasonMatchLimit
	}
	csResult.FileResults = fileResults
	return &csResult, nil
}

func searchBlob(re *regexp.Regexp, blob, repo, version, name []byte, contextLines, maxMatches int) []SearchResult {
	var results []SearchResult
	m := regexp.Match(re, blob)
	if m == nil {
		return nil
	}

	lineNum := 1
	lineNumUntil := 0

	for m != nil {
		lineStart := bytes.LastIndexByte(blob[:m.End], '\n') + 1
		if lineStart < 0 {
			// Clamp start to beginning of file.
			lineStart = 0
		}
		lineEnd := len(blob)
		if m.End < len(blob) {
			lineEnd = bytes.IndexByte(blob[m.End:], '\n')
			// Clamp end to beginning of file.
			if lineEnd < 0 {
				lineEnd = len(blob)
			} else {
				lineEnd += m.End
			}
		}
		// How many newlines have we missed?
		lineNum += countNL(blob[lineNumUntil:lineEnd])
		lineNumUntil = lineEnd
		results = append(results, SearchResult{
			File: File{
				Tree:    string(repo),
				Version: string(version),
				Path:    string(name),
			},

			LineNumber: lineNum,
			Line:       string(blob[lineStart:lineEnd]),
			Bounds:     Bounds{Left: m.Start - lineStart, Right: m.End - lineStart},

			ContextBefore: lastLines(blob[:lineStart], contextLines),
			ContextAfter:  firstLines(blob[lineEnd:], contextLines),
		})
		if lineEnd >= len(blob) {
			break
		}
		if len(results) >= maxMatches {
			break
		}
		m = regexp.Match(re, blob[lineEnd+1:]).Add(lineEnd + 1)
	}
	return results
}

func splitname(b []byte) (repo, version, name []byte) {
	repo, b, _ = bytes.Cut(b, []byte("@"))
	version, name, _ = bytes.Cut(b, []byte("/+/"))
	return
}

func countNL(b []byte) int {
	n := 0
	for {
		i := bytes.IndexByte(b, '\n')
		if i < 0 {
			break
		}
		n++
		b = b[i+1:]
	}
	return n
}

func firstLines(b []byte, n int) (res []string) {
	if n <= 0 || len(b) == 0 {
		return
	}
	if b[0] == '\n' {
		// We start looking at a newline boundary, so skip it.
		b = b[1:]
	}

	for len(b) > 0 && len(res) < n {
		i := bytes.IndexByte(b, '\n')
		if i < 0 {
			res = append(res, string(b))
			return
		}
		res = append(res, string(b[:i]))
		b = b[i+1:]
	}
	return
}

func lastLines(b []byte, n int) (res []string) {
	if n <= 0 || len(b) == 0 {
		return
	}
	if b[len(b)-1] == '\n' {
		// We start looking at a newline boundary, so skip it.
		b = b[:len(b)-1]
	}

	for len(b) > 0 && len(res) < n {
		i := bytes.LastIndexByte(b, '\n')
		if i < 0 {
			res = append(res, string(b))
			return
		}
		res = append(res, string(b[i+1:]))
		b = b[:i]
	}
	return
}

// RegexpFilter creates a filter function based on the given regexp.
// Either or both accept or reject parameters can be empty, in which case they're not used.
// If both are empty, the returned function always returns true.
type regexpFilter struct {
	acceptRe *regexp.Regexp
	rejectRe *regexp.Regexp
}

func newRegexpFilter(accept, reject string) (*regexpFilter, error) {
	if accept == "" && reject == "" {
		return nil, nil
	}
	var acceptRe *regexp.Regexp
	var err error
	if accept != "" {
		acceptRe, err = regexp.Compile(accept, syntax.FoldCase)
		if err != nil {
			return nil, err
		}
	}
	var rejectRe *regexp.Regexp
	if reject != "" {
		rejectRe, err = regexp.Compile(reject, syntax.FoldCase)
		if err != nil {
			return nil, err
		}
	}
	return &regexpFilter{acceptRe, rejectRe}, nil
}

func (f *regexpFilter) Accept(s []byte) bool {
	if f == nil {
		return true
	}
	return (f.acceptRe == nil || regexp.Match(f.acceptRe, s) != nil) &&
		(f.rejectRe == nil || regexp.Match(f.rejectRe, s) == nil)
}

func (f *regexpFilter) Clone() *regexpFilter {
	if f == nil {
		return nil
	}
	return &regexpFilter{
		f.acceptRe.Clone(),
		f.rejectRe.Clone(),
	}
}

type setFilter struct {
	accept map[string]bool
}

func newSetFilter(options []string) *setFilter {
	accepted := map[string]bool{}
	for _, v := range options {
		accepted[v] = true
	}
	return &setFilter{accepted}
}

func (f *setFilter) Accept(s []byte) bool {
	if f == nil {
		return true
	}
	return f.accept[string(s)]
}
