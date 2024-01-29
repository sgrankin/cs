package csbackend

import (
	"bytes"
	"context"
	"flag"
	"regexp/syntax"
	"runtime"
	"strings"
	"sync"
	"sync/atomic"

	"sgrankin.dev/cs/codesearch/index"
	"sgrankin.dev/cs/codesearch/regexp"
	"sgrankin.dev/cs/csapi"
)

type CSBackend struct {
	ix *index.Index
}

var (
	dataPath  = flag.String("data", "data/data.db", "The path to the blob data DB")
	indexPath = flag.String("index", "data/csindex", "The path to the index file")
)

func New() *CSBackend {
	ix := index.Open(*indexPath)
	return &CSBackend{ix}
}

var _ csapi.CodeSearch = (*CSBackend)(nil)

// Info implements csapi.CodeSearch.
func (*CSBackend) Info(context.Context) (*csapi.ServerInfo, error) {
	return &csapi.ServerInfo{}, nil
}

// Search implements csapi.CodeSearch.
func (b *CSBackend) Search(ctx context.Context, req csapi.Query) (*csapi.CodeSearchResult, error) {
	pat := req.Line

	var flags syntax.Flags
	if req.FoldCase {
		flags |= syntax.FoldCase
	}
	re, err := regexp.Compile(pat, flags)
	if err != nil {
		return nil, err
	}

	treeFilter, err := newRegexpFilter(req.Repo, req.NotRepo)
	if err != nil {
		return nil, err
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
	fresults := make(chan []csapi.FileResult, 1)
	defer close(fresults)
	go func(re *regexp.Regexp, treeFilter, fileFilter *regexpFilter) {
		res := []csapi.FileResult{}
		for _, fileid := range b.ix.PostingQuery(&index.Query{Op: index.QAll}) {
			postName := b.ix.NameBytes(fileid)
			tree, version, name := splitname(postName)
			if !treeFilter.Accept(tree) || !fileFilter.Accept(name) {
				continue
			}
			m := regexp.Match(re, name)
			if m == nil {
				continue
			}
			res = append(res, csapi.FileResult{
				Tree:    string(tree),
				Version: string(version),
				Path:    string(name),
				Bounds:  csapi.Bounds{Left: m.Start, Right: m.End},
			})
			if len(res) >= req.MaxMatches {
				break
			}
		}
		fresults <- res
	}(re.Clone(), treeFilter.Clone(), fileFilter.Clone())

	csResult := csapi.CodeSearchResult{
		Stats: csapi.SearchStats{
			ExitReason: csapi.ExitReasonNone,
		},
	}

	if !req.FilenameOnly {
		q := index.RegexpQuery(syn)
		post := b.ix.PostingQuery(q)

		results := make([]csapi.SearchResult, 0, min(req.MaxMatches, len(post)))
		ctx, cancel := context.WithCancel(ctx)
		defer cancel()

		var idx atomic.Int64 // Each worker will claim a posting atomically.
		idx.Store(-1)

		numWorkers := min(runtime.GOMAXPROCS(0), len(post))
		perFileResults := make(chan []csapi.SearchResult, numWorkers)
		var wg sync.WaitGroup
		for range numWorkers {
			wg.Add(1)
			go func(re *regexp.Regexp, treeFilter, fileFilter *regexpFilter) {
				defer wg.Done()
				for ctx.Err() == nil { // Cancelled?
					i := idx.Add(1)
					if int(i) >= len(post) {
						return // No more work.
					}
					postName := b.ix.NameBytes(post[i])
					tree, version, name := splitname(postName)
					if !treeFilter.Accept(tree) || !fileFilter.Accept(name) {
						continue
					}
					blob := b.ix.Data(post[i])
					results := searchFile(re, blob, tree, version, name, req.ContextLines, req.MaxMatches)
					if len(results) == 0 {
						continue
					}
					select {
					case perFileResults <- results:
					case <-ctx.Done():
						return // Cancelled
					}
				}
			}(re.Clone(), treeFilter.Clone(), fileFilter.Clone())
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
			csResult.Stats.ExitReason = csapi.ExitReasonMatchLimit
			results = results[:req.MaxMatches]
		}
		csResult.Results = results
	}

	fileResults := <-fresults
	if len(fileResults) >= req.MaxMatches {
		fileResults = fileResults[:req.MaxMatches]
		csResult.Stats.ExitReason = csapi.ExitReasonMatchLimit
	}
	csResult.FileResults = fileResults
	return &csResult, nil
}

func searchFile(re *regexp.Regexp, blob, tree, version, name []byte, contextLines, maxMatches int) []csapi.SearchResult {
	var results []csapi.SearchResult
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
		results = append(results, csapi.SearchResult{
			Tree:    string(tree),
			Version: string(version),
			Path:    string(name),

			LineNumber: lineNum,
			Line:       string(blob[lineStart:lineEnd]),
			Bounds:     csapi.Bounds{Left: m.Start - lineStart, Right: m.End - lineStart},

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

func cut(b []byte, c byte) (prefix, rest []byte) {
	i := bytes.IndexByte(b, c)
	if i < 0 {
		return b, nil
	}
	return b[:i], b[i+1:]
}

func splitname(b []byte) (tree, version, name []byte) {
	tree, b = cut(b, ':')
	version, b = cut(b, ':')
	name, b = cut(b, ':')
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
	return (f.acceptRe == nil || regexp.Match(f.acceptRe, s) != nil) &&
		(f.rejectRe == nil || regexp.Match(f.rejectRe, s) == nil)
}

func (f *regexpFilter) Clone() *regexpFilter {
	return &regexpFilter{
		f.acceptRe.Clone(),
		f.rejectRe.Clone(),
	}
}
