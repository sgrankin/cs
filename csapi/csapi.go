package csapi

import (
	"context"
	"time"
)

type CodeSearch interface {
	// Info returns the metadata about the index.
	// Background data updates may cause this info to update.
	Info() CodeSearchInfo

	// Paths returns the list of file paths in this index.
	Paths(tree, version, pathPrefix string) []File

	// Data returns the full data for the file at the path.
	// If the path is not found in this index, data returned will be empty.
	Data(tree, version, path string) string

	// Search returns search results.
	// Errors will be returned if the query is invalid.
	// The context may be used to cancel the search.
	Search(context.Context, Query) (*CodeSearchResult, error)
}

type Query struct {
	Line                         string
	File, NotFile                []string
	Repo, NotRepo, Tags, NotTags string

	FoldCase     bool
	MaxMatches   int
	FilenameOnly bool
	ContextLines int
}

type CodeSearchInfo struct {
	IndexTime time.Time
	Trees     []Tree
}

type Tree struct{ Name, Version string }
type File struct{ Tree, Version, Path string }
type Bounds struct{ Left, Right int }

type SearchResult struct {
	File       File
	LineNumber int

	Line   string
	Bounds Bounds

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
