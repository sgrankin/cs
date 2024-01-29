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

	var fre *regexp.Regexp
	if len(req.File) > 0 {
		fre, err = regexp.Compile(strings.Join(req.File, "|"), syntax.FoldCase)
		if err != nil {
			return nil, err
		}
	}
	var nfre *regexp.Regexp
	if len(req.NotFile) > 0 {
		nfre, err = regexp.Compile(strings.Join(req.NotFile, "|"), syntax.FoldCase)
		if err != nil {
			return nil, err
		}
	}
	syn, err := syntax.Parse(pat, syntax.PerlX|flags)
	if err != nil {
		return nil, err
	}

	// Find filename matches.
	fresults := make(chan []csapi.FileResult, 1)
	defer close(fresults)
	go func(re, fre, nfre *regexp.Regexp) {
		res := []csapi.FileResult{}
		for _, fileid := range b.ix.PostingQuery(&index.Query{Op: index.QAll}) {
			postName := b.ix.NameBytes(fileid)
			tree, version, name := splitname(postName)
			if fre != nil && regexp.Match(fre, name) == nil {
				continue
			}
			if nfre != nil && regexp.Match(nfre, name) != nil {
				continue
			}
			rng := regexp.Match(re, name)
			if rng == nil {
				continue
			}
			res = append(res, csapi.FileResult{
				Tree:    string(tree),
				Version: string(version),
				Path:    string(name),
				Bounds:  csapi.Bounds{Left: rng.Start, Right: rng.End},
			})
			if len(res) >= int(req.MaxMatches) {
				break
			}
		}
		fresults <- res
	}(re.Clone(), fre.Clone(), nfre.Clone())

	csResult := csapi.CodeSearchResult{
		Stats: csapi.SearchStats{
			ExitReason: csapi.ExitReasonNone,
		},
	}
	if !req.FilenameOnly {
		q := index.RegexpQuery(syn)
		post := b.ix.PostingQuery(q)
		if fre != nil || nfre != nil {
			// Pre-filter the files based on name regex.
			fnames := make([]uint32, 0, len(post))
			for _, fileid := range post {
				postName := b.ix.NameBytes(fileid)
				_, _, name := splitname(postName)
				if fre != nil && regexp.Match(fre, name) == nil {
					continue
				}
				if nfre != nil && regexp.Match(nfre, name) != nil {
					continue
				}
				fnames = append(fnames, fileid)
			}
			post = fnames
		}

		results := make([]csapi.SearchResult, 0, req.MaxMatches)

		ctx, cancel := context.WithCancel(ctx)
		defer cancel()

		var idx atomic.Int64 // Each worker will claim a posting atomically.
		idx.Store(-1)

		numWorkers := min(runtime.GOMAXPROCS(0), len(post))
		perFileResults := make(chan []csapi.SearchResult, numWorkers)
		var wg sync.WaitGroup
		for range numWorkers {
			wg.Add(1)
			go func(re *regexp.Regexp) {
				defer wg.Done()
				for ctx.Err() == nil { // Not cancelled?
					i := idx.Add(1)
					if int(i) >= len(post) {
						return // No more work.
					}
					results := searchFile(b.ix, post[i], re, int(req.ContextLines), int(req.MaxMatches))
					if len(results) == 0 {
						continue
					}
					select {
					case perFileResults <- results:
					case <-ctx.Done():
						return // Cancelled
					}
				}
			}(re.Clone())
		}
		go func() {
			// When all workers are done (either due to running out of files or cancellation) we're done searching.
			wg.Wait()
			close(perFileResults)
		}()

		for perFileResults := range perFileResults {
			results = append(results, perFileResults...)
			if len(results) >= int(req.MaxMatches) {
				cancel()
				break
			}
		}
		if len(results) >= int(req.MaxMatches) {
			csResult.Stats.ExitReason = csapi.ExitReasonMatchLimit
			results = results[:req.MaxMatches]
		}
		csResult.Results = results
	}

	fileResults := <-fresults
	if len(fileResults) >= int(req.MaxMatches) {
		fileResults = fileResults[:req.MaxMatches]
		csResult.Stats.ExitReason = csapi.ExitReasonMatchLimit
	}
	csResult.FileResults = fileResults
	return &csResult, nil
}

func searchFile(ix *index.Index, fileid uint32, re *regexp.Regexp, contextLines int, maxMatches int) []csapi.SearchResult {
	var results []csapi.SearchResult
	blob := ix.Data(fileid)
	rng := regexp.Match(re, blob)
	if rng == nil {
		return nil
	}

	// We delay extracting the file details until we have a match.
	postName := ix.NameBytes(fileid)
	tree, version, name := splitname(postName)
	lineNum := 1
	lineNumUntil := 0

	for rng != nil {
		lineStart := bytes.LastIndexByte(blob[:rng.End], '\n') + 1
		if lineStart < 0 {
			// Clamp start to beginning of file.
			lineStart = 0
		}
		lineEnd := len(blob)
		if rng.End < len(blob) {
			lineEnd = bytes.IndexByte(blob[rng.End:], '\n')
			// Clamp end to beginning of file.
			if lineEnd < 0 {
				lineEnd = len(blob)
			} else {
				lineEnd += rng.End
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
			Bounds:     csapi.Bounds{Left: rng.Start - lineStart, Right: rng.End - lineStart},

			ContextBefore: lastLines(blob[:lineStart], contextLines),
			ContextAfter:  firstLines(blob[lineEnd:], contextLines),
		})
		if lineEnd >= len(blob) {
			break
		}
		if len(results) >= maxMatches {
			break
		}
		rng = regexp.Match(re, blob[lineEnd+1:]).Add(lineEnd + 1)
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

var _ csapi.CodeSearch = (*CSBackend)(nil)
