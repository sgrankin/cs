// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package api

import "sgrankin.dev/cs"

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
	Info        *Stats        `json:"info"`
	Results     []*Result     `json:"results"`
	FileResults []*FileResult `json:"file_results"`
	SearchType  string        `json:"search_type"`
	Query       cs.Query      `json:"query"`
}

type Stats struct {
	TotalTime  int64  `json:"total_time"`
	ExitReason string `json:"why"`
}

type Result struct {
	Tree    string       `json:"tree"`
	Version string       `json:"version"`
	Path    string       `json:"path"`
	Lines   []LineResult `json:"lines"`
}

type LineResult struct {
	LineNumber    int      `json:"lno"`
	ContextBefore []string `json:"context_before"`
	ContextAfter  []string `json:"context_after"`
	Bounds        [2]int   `json:"bounds"`
	Line          string   `json:"line"`
}

type FileResult struct {
	Tree    string `json:"tree"`
	Version string `json:"version"`
	Path    string `json:"path"`
	Bounds  [2]int `json:"bounds"`
}

type SearchScriptData struct {
	BackendRepos map[string][]string `json:"backend_repos"`
	LinkConfigs  []cs.LinkConfig     `json:"link_configs"`
}

type FileViewData struct {
	RepoName   string `json:"repo_name"`
	URLPattern string `json:"url_pattern"`
	FilePath   string `json:"file_path"`
	Commit     string `json:"commit"`
}
