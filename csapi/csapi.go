package csapi

import (
	"context"
)

type CodeSearch interface {
	Info(context.Context) (*ServerInfo, error)
	Search(context.Context, Query) (*CodeSearchResult, error)
	Data(tree, version, path string) string
	Paths(tree, version, pathPrefix string) []File
}

type Query struct {
	Line                         string
	File, NotFile                []string
	Repo, NotRepo, Tags, NotTags string
	FoldCase                     bool

	MaxMatches   int
	FilenameOnly bool
	ContextLines int
}

type ServerInfo struct {
	Name  string
	Trees []struct {
		Name, Version string
		Metadata      struct {
			URLPattern, Remote, Github string

			Labels string
		}
	}
	HasTags   bool
	IndexTime int64
}

type Bounds struct {
	Left, Right int
}

type File struct {
	Tree, Version, Path string
}

type SearchResult struct {
	File                        File
	LineNumber                  int
	ContextBefore, ContextAfter []string
	Bounds                      Bounds
	Line                        string
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
