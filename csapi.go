package cs

import (
	"context"
	"time"
)

type SearchIndex interface {
	// User visible name of the index
	Name() string

	// Info returns the metadata about the index.
	// Background data updates may cause this info to update.
	Info() IndexInfo

	// Paths returns the list of file paths in this index.
	Paths(tree, version, pathPrefix string) []File

	// Data returns the full data for the file at the path.
	// If the path is not found in this index, data returned will be empty.
	Data(tree, version, path string) string

	// Search returns search results.
	// Errors will be returned if the query is invalid.
	// The context may be used to cancel the search.
	Search(ctx context.Context, q Query) (*CodeSearchResult, error)
}

type Query struct {
	Line string // Freeform regexp

	// File & Repo inclusion/exclusion regexps:
	File, NotFile                []string
	Repo, NotRepo, Tags, NotTags string

	RepoFilter []string // Additional exact-match repository filter

	FoldCase     bool // Ignore case when searching.
	MaxMatches   int  // Max matches to return.  Must be set.
	FilenameOnly bool // Search for `Line` only in file names.
	ContextLines int  // Results have the N lines before and after matched line.
}

type IndexInfo struct {
	IndexTime time.Time
	Trees     []Tree
}

type Tree struct {
	Name, Version string
}
type File struct {
	Tree, Version, Path string
}
type Bounds struct {
	Left, Right int
}
type SearchResult struct {
	File  File
	Lines []LineResult
}
type LineResult struct {
	LineNumber                  int
	Line                        string
	Bounds                      Bounds
	ContextBefore, ContextAfter []string
}

type FileResult struct {
	File   File
	Bounds Bounds
}

type ExitReason string

func (v ExitReason) String() string { return string(v) }

const (
	ExitReasonNone       = "NONE"
	ExitReasonTimeout    = "TIMEOUT"
	ExitReasonMatchLimit = "MATCH_LIMIT"
)

type SearchStats struct {
	RE2Time, GitTime, SortTime, IndexTime, AnalyzeTime, TotalTime int64

	ExitReason ExitReason
}

type CodeSearchResult struct {
	Stats       SearchStats
	Results     []SearchResult
	FileResults []FileResult

	// unique index identity that served this request
	IndexName string
	IndexTime int
}
