// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package api

import (
	"time"

	"sgrankin.dev/cs"
)

type InnerError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

// ReplyError is returned along with any non-200 status reply
type ReplyError struct {
	Err InnerError `json:"error"`
}

// ReplySearch is returned to /api/v1/search/:backend
type ReplySearch struct {
	Info          *Stats        `json:"info"`
	Results       []*Result     `json:"results"`
	FileResults   []*FileResult `json:"file_results"`
	SearchType    string        `json:"search_type"`
	Query         cs.Query      `json:"query"`
	TopExtensions []string
	Backend       string
}

type Stats struct {
	TotalTime    int64  `json:"total_time"`
	ExitReason   string `json:"why"`
	ResultsCount int
	HasMore      bool
	QueryTime    time.Duration
}

type Result struct {
	Tree    string       `json:"tree"`
	Version string       `json:"version"`
	Path    string       `json:"path"`
	Lines   []LineResult `json:"lines"`
}

/* TODO:
Line result handling is a mess.
- We should return several groups of text.
- Each group should be a group of consecutive lines.
- Each line in the group may contain one (or more?) matches.
There should not be a visible boundary between these lines.
There should be a visible boundary between (non-consecutive) groups.
*/

type LineResult struct {
	LineNumber    int      `json:"lno"`
	ContextBefore []string `json:"context_before"`
	ContextAfter  []string `json:"context_after"`
	Bounds        [2]int   `json:"bounds"`
	Line          string   `json:"line"`
	ClipBefore    bool     // Previous LineResult has context that abuts ContextBefore.
	ClipAfter     bool     // Next LineResult has context that abouts ContextAfter.
}

type FileResult struct {
	Tree    string `json:"tree"`
	Version string `json:"version"`
	Path    string `json:"path"`
	Bounds  [2]int `json:"bounds"`
}
