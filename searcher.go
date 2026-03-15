// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package cs

import (
	"bytes"
	"context"
	"iter"
	"regexp/syntax"
	"slices"

	"sgrankin.dev/cs/codesearch/index"
	"sgrankin.dev/cs/codesearch/regexp"
)

type indexSearcher struct {
	// ix contains only the files for a repo at a single version.
	ix      *index.Index
	repo    string
	version string
}

func newIndexSearcher(ix *index.Index, repo, version string) *indexSearcher {
	return &indexSearcher{ix, repo, version}
}

// Data retrieves the data blob for the file at the given repo, version, and path.
func (b *indexSearcher) Data(path string) string {
	if b == nil {
		return ""
	}
	return string(b.ix.DataAtName(path))
}

// Paths lists the paths with the given repo, version, and path prefix
func (b *indexSearcher) Paths(prefix string) []File {
	if b == nil {
		return nil
	}
	var res []File
	for _, name := range b.ix.Names([]byte(prefix)) {
		res = append(res, File{
			Tree:    string(b.repo),
			Version: string(b.version),
			Path:    string(name),
		})
	}
	return res
}

func (b *indexSearcher) SearchFileNames(
	ctx context.Context,
	re *regexp.Regexp, ff fileFilter,
	maxMatches int,
) []FileResult {
	res := []FileResult{}
	for _, fileid := range b.ix.PostingQuery(&index.Query{Op: index.QAll}) {
		if ctx.Err() != nil {
			return nil // Cancelled!
		}
		path := b.ix.NameBytes(fileid)
		if !ff.Accept(path) {
			continue
		}
		m := regexp.Match(re, path)
		if m == regexp.NilRange || m.Start == m.End {
			continue
		}
		res = append(res, FileResult{
			File: File{
				Tree:    string(b.repo),
				Version: string(b.version),
				Path:    string(path),
			},
			Bounds: Bounds{Left: m.Start, Right: m.End},
		})
		if len(res) >= maxMatches {
			break
		}
	}
	return res
}

// SearchFiles will search the index for files matching the regexp.
// It yields functions that perform the search on individual files, and result any matches found.
func (b *indexSearcher) SearchFiles(
	ctx context.Context,
	re *regexp.Regexp, ff fileFilter,
	contextLines, maxMatches int,
) iter.Seq[func() *SearchResult] {
	return func(yield func(func() *SearchResult) bool) {
		postings := b.ix.PostingQuery(index.RegexpQuery(re.Syn()))
		for i := range postings {
			if ctx.Err() != nil {
				return // Cancelled!
			}
			name := b.ix.NameBytes(postings[i])
			if !ff.Accept(name) {
				continue
			}
			if !yield(func() *SearchResult {
				re := re.Clone()
				blob := b.ix.Data(postings[i])
				lines := searchBlob(re, blob, contextLines, maxMatches)
				if len(lines) == 0 {
					return nil
				}
				return &SearchResult{
					File:  File{Tree: b.repo, Version: b.version, Path: string(name)},
					Lines: lines,
				}
			}) {
				return
			}
		}
	}
}

func searchBlob(re *regexp.Regexp, blob []byte, contextLines, maxMatches int) []LineResult {
	var results []LineResult
	lineNum := 1
	lineNumUntil := 0

	m := regexp.Match(re, blob)
	for m != regexp.NilRange && m.Start != m.End {
		lineStart := max(bytes.LastIndexByte(blob[:m.End], '\n')+1, 0)
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
		results = append(results, LineResult{
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

func firstLines(b []byte, n int) []string {
	var res []string
	if n <= 0 || len(b) == 0 {
		return res
	}
	if b[0] == '\n' {
		// We start looking at a newline boundary, so skip it.
		b = b[1:]
	}

	for len(b) > 0 && len(res) < n {
		i := bytes.IndexByte(b, '\n')
		if i < 0 {
			res = append(res, string(b))
			break
		}
		res = append(res, string(b[:i]))
		b = b[i+1:]
	}
	return res
}

func lastLines(b []byte, n int) []string {
	var res []string
	if n <= 0 || len(b) == 0 {
		return res
	}
	if b[len(b)-1] == '\n' {
		// We start looking at a newline boundary, so skip it.
		b = b[:len(b)-1]
	}

	for len(b) > 0 && len(res) < n {
		i := bytes.LastIndexByte(b, '\n')
		if i < 0 {
			res = append(res, string(b))
			break
		}
		res = append(res, string(b[i+1:]))
		b = b[:i]
	}
	slices.Reverse(res)
	return res
}

// RegexpFilter creates a filter function based on the given regexp.
// Either or both accept or reject parameters can be empty, in which case they're not used.
// If both are empty, the returned function always returns true.
// fileFilter is the interface for filename acceptance checks.
type fileFilter interface {
	Accept(s []byte) bool
	Clone() fileFilter
}

// compositeFilter ANDs multiple fileFilters together.
type compositeFilter struct {
	filters []fileFilter
}

func newCompositeFilter(filters ...fileFilter) fileFilter {
	var nonNil []fileFilter
	for _, f := range filters {
		if f != nil {
			nonNil = append(nonNil, f)
		}
	}
	if len(nonNil) == 0 {
		return acceptAllFilter{}
	}
	if len(nonNil) == 1 {
		return nonNil[0]
	}
	return &compositeFilter{nonNil}
}

// acceptAllFilter accepts all filenames (no-op filter).
type acceptAllFilter struct{}

func (acceptAllFilter) Accept([]byte) bool  { return true }
func (f acceptAllFilter) Clone() fileFilter { return f }

func (f *compositeFilter) Accept(s []byte) bool {
	for _, ff := range f.filters {
		if !ff.Accept(s) {
			return false
		}
	}
	return true
}

func (f *compositeFilter) Clone() fileFilter {
	cloned := make([]fileFilter, len(f.filters))
	for i, ff := range f.filters {
		cloned[i] = ff.Clone()
	}
	return &compositeFilter{cloned}
}

// extensionFilter accepts files whose extension matches one of the accepted values.
type extensionFilter struct {
	accept map[string]bool
}

func newExtensionFilter(extensions []string) fileFilter {
	if len(extensions) == 0 {
		return nil
	}
	m := make(map[string]bool, len(extensions))
	for _, ext := range extensions {
		m[ext] = true
	}
	return &extensionFilter{m}
}

func (f *extensionFilter) Accept(s []byte) bool {
	// Find the last dot in the filename.
	name := string(s)
	for i := len(name) - 1; i >= 0; i-- {
		if name[i] == '.' {
			return f.accept[name[i:]]
		}
		if name[i] == '/' {
			break
		}
	}
	return false // no extension
}

func (f *extensionFilter) Clone() fileFilter { return f } // immutable

// pathPrefixFilter accepts files whose path starts with one of the accepted prefixes.
type pathPrefixFilter struct {
	prefixes []string
}

func newPathPrefixFilter(prefixes []string) fileFilter {
	if len(prefixes) == 0 {
		return nil
	}
	return &pathPrefixFilter{prefixes: prefixes}
}

func (f *pathPrefixFilter) Accept(s []byte) bool {
	name := string(s)
	for _, prefix := range f.prefixes {
		if len(name) >= len(prefix) && name[:len(prefix)] == prefix {
			return true
		}
	}
	return false
}

func (f *pathPrefixFilter) Clone() fileFilter { return f } // immutable

type regexpFilter struct {
	acceptRe *regexp.Regexp
	rejectRe *regexp.Regexp
}

func newRegexpFilter(accept, reject string) (fileFilter, error) {
	if accept == "" && reject == "" {
		return acceptAllFilter{}, nil
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
	return (f.acceptRe == nil || regexp.Match(f.acceptRe, s) != regexp.NilRange) &&
		(f.rejectRe == nil || regexp.Match(f.rejectRe, s) == regexp.NilRange)
}

func (f *regexpFilter) Clone() fileFilter {
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
