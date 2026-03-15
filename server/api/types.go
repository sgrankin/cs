// Copyright 2011-2013 Nelson Elhage
// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package api

import (
	"bytes"
	"encoding/json"
	"fmt"
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
	Info        *Stats        `json:"info"`
	Results     []*Result     `json:"results"`
	FileResults []*FileResult `json:"file_results"`
	SearchType  string        `json:"search_type"`
	Query       cs.Query      `json:"query"`
	Facets      []*Facet      `json:"facets"`
}

type Facet struct {
	Key    string       `json:"key"`
	Values []FacetValue `json:"values"`
}
type FacetValue struct {
	Value string `json:"value"`
	Count int    `json:"count"`
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

// --- JSONL event types for /api/search ---

// ResultLine is a single source line in search results.
type ResultLine struct {
	Number int      // 1-based line number
	Text   string   // line content
	Bounds [][2]int // match bounds within Text; nil for context lines
}

// LineGroup is a contiguous block of consecutive lines.
type LineGroup []ResultLine

// CompactLines is a sequence of line groups for JSONL serialization.
// In JSON, groups are separated by null values in a flat array.
// Each line is [lno, text] or [lno, text, [[start,end],...]] for matches.
type CompactLines []LineGroup

func (cl CompactLines) MarshalJSON() ([]byte, error) {
	var buf bytes.Buffer
	buf.WriteByte('[')
	written := false // whether any element has been written
	for gi, group := range cl {
		if gi > 0 && written {
			buf.WriteString(",null")
		}
		for _, line := range group {
			if written {
				buf.WriteByte(',')
			}
			written = true
			buf.WriteByte('[')
			fmt.Fprintf(&buf, "%d,", line.Number)
			textJSON, _ := json.Marshal(line.Text)
			buf.Write(textJSON)
			if len(line.Bounds) > 0 {
				buf.WriteString(",[")
				for bi, b := range line.Bounds {
					if bi > 0 {
						buf.WriteByte(',')
					}
					fmt.Fprintf(&buf, "[%d,%d]", b[0], b[1])
				}
				buf.WriteByte(']')
			}
			buf.WriteByte(']')
		}
	}
	buf.WriteByte(']')
	return buf.Bytes(), nil
}

func (cl *CompactLines) UnmarshalJSON(data []byte) error {
	var raw []json.RawMessage
	if err := json.Unmarshal(data, &raw); err != nil {
		return err
	}
	var current LineGroup
	for _, elem := range raw {
		if string(elem) == "null" {
			if len(current) > 0 {
				*cl = append(*cl, current)
				current = nil
			}
			continue
		}
		var arr []json.RawMessage
		if err := json.Unmarshal(elem, &arr); err != nil {
			return err
		}
		if len(arr) < 2 {
			return fmt.Errorf("line array must have at least 2 elements, got %d", len(arr))
		}
		var line ResultLine
		if err := json.Unmarshal(arr[0], &line.Number); err != nil {
			return err
		}
		if err := json.Unmarshal(arr[1], &line.Text); err != nil {
			return err
		}
		if len(arr) > 2 {
			if err := json.Unmarshal(arr[2], &line.Bounds); err != nil {
				return err
			}
		}
		current = append(current, line)
	}
	if len(current) > 0 {
		*cl = append(*cl, current)
	}
	return nil
}

// SearchResultEvent is a per-file code match result (JSONL type "result").
type SearchResultEvent struct {
	Type  string       `json:"type"`
	Path  string       `json:"path"`
	Lines CompactLines `json:"lines"`
}

// FileMatchEvent is a filename match result (JSONL type "file").
type FileMatchEvent struct {
	Type  string `json:"type"`
	Path  string `json:"path"`
	Match [2]int `json:"match"`
}

// FacetBucket is a single facet value with its count.
type FacetBucket struct {
	Value string `json:"v"`
	Count int    `json:"c"`
}

// FacetsEvent contains facet buckets (JSONL type "facets").
type FacetsEvent struct {
	Type string        `json:"type"`
	Ext  []FacetBucket `json:"ext,omitempty"`
	Repo []FacetBucket `json:"repo,omitempty"`
	Path []FacetBucket `json:"path,omitempty"`
}

// DoneEvent signals the end of search results (JSONL type "done").
type DoneEvent struct {
	Type      string `json:"type"`
	TimeMs    int64  `json:"time_ms"`
	Total     int    `json:"total"`
	Truncated bool   `json:"truncated"`
}
