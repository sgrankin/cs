package csapi

import (
	"context"
	"fmt"
)

type CodeSearch interface {
	Info(context.Context) (*ServerInfo, error)
	Search(context.Context, Query) (*CodeSearchResult, error)
}

type Query struct {
	Line                         string
	File, NotFile                []string
	Repo, NotRepo, Tags, NotTags string
	FoldCase                     bool

	MaxMatches   int32
	FilenameOnly bool
	ContextLines int64
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

type SearchResult struct {
	Tree, Version, Path         string
	LineNumber                  int
	ContextBefore, ContextAfter []string
	Bounds                      Bounds
	Line                        string
}

type FileResult struct {
	Tree, Version, Path string
	Bounds              Bounds
}

type ExitReason int

func (v ExitReason) String() string { return fmt.Sprintf("%d", v) }

const (
	ExitReasonNone = iota
	ExitReasonTimeout
	ExitReasonMatchLimit
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
