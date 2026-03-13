// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"errors"
	"log"
	"net/http"
	"strings"
	"time"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server/api"
)

func extractQuery(r *http.Request) (cs.Query, error) {
	var query cs.Query

	if err := r.ParseForm(); err != nil {
		return query, err
	}

	params := r.Form
	var err error

	regex := true
	if param, ok := params["literal"]; ok && param[0] != "false" {
		regex = false
	}

	if q, ok := params["q"]; ok {
		query, err = ParseQuery(q[0], regex)
	}

	// Repo multiselect, but only if "repo:" is not in the query.
	if len(query.Repo) == 0 {
		if repos, ok := params["repo"]; ok {
			query.RepoFilter = repos
		}
	}

	if fc, ok := params["fold_case"]; ok {
		switch fc[0] {
		case "false":
			query.FoldCase = false
		case "true":
			query.FoldCase = true
		default:
			query.FoldCase = !strings.ContainsAny(query.Line, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")
		}
	}

	return query, err
}

var ErrTimedOut = errors.New("timed out talking to backend")

func (s *server) doSearch(ctx context.Context, q *cs.Query) (*api.ReplySearch, error) {
	backend := s.bk
	start := time.Now()

	ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	search, err := backend.Search(ctx, *q)
	if err != nil {
		log.Printf("error talking to backend err=%s", err)
		return nil, err
	}

	reply := &api.ReplySearch{
		Results:     make([]*api.Result, 0),
		FileResults: make([]*api.FileResult, 0),
		SearchType:  "normal",
	}

	if q.FilenameOnly {
		reply.SearchType = "filename_only"
	}

	for _, r := range search.Results {
		lines := []api.LineResult{}
		for _, r := range r.Lines {
			lines = append(lines, api.LineResult{
				LineNumber:    int(r.LineNumber),
				ContextBefore: r.ContextBefore,
				ContextAfter:  r.ContextAfter,
				Bounds:        [2]int{int(r.Bounds.Left), int(r.Bounds.Right)},
				Line:          r.Line,
			})
		}
		reply.Results = append(reply.Results, &api.Result{
			Tree:    r.File.Tree,
			Version: r.File.Version,
			Path:    r.File.Path,
			Lines:   lines,
		})
	}

	for _, r := range search.FileResults {
		reply.FileResults = append(reply.FileResults, &api.FileResult{
			Tree:    r.File.Tree,
			Version: r.File.Version,
			Path:    r.File.Path,
			Bounds:  [2]int{int(r.Bounds.Left), int(r.Bounds.Right)},
		})
	}

	for _, f := range search.Facets {
		facet := &api.Facet{Key: f.Key}
		for _, v := range f.Values {
			facet.Values = append(facet.Values, api.FacetValue{
				Value: v.Value,
				Count: v.Count,
			})
		}
		reply.Facets = append(reply.Facets, facet)
	}

	reply.Info = &api.Stats{
		TotalTime:  int64(time.Since(start) / time.Millisecond),
		ExitReason: search.Stats.ExitReason.String(),
	}
	return reply, nil
}

func (s *server) searchForRequest(ctx context.Context, q cs.Query) (*api.ReplySearch, error) {
	if q.Line == "" {
		return nil, nil
	}

	if q.MaxMatches == 0 {
		q.MaxMatches = s.config.DefaultMaxMatches
	}
	if q.ContextLines == 0 {
		q.ContextLines = 3
	}

	reply, err := s.doSearch(ctx, &q)
	if err != nil {
		log.Printf("error in search err=%s", err)
		return nil, err
	}
	reply.Query = q
	reply.Info.QueryTime = time.Duration(reply.Info.TotalTime * int64(time.Millisecond))

	// Count results:
	reply.Info.HasMore = reply.Info.ExitReason != string(cs.ExitReasonNone)
	if q.FilenameOnly {
		reply.Info.ResultsCount = len(reply.FileResults)
	} else {
		for _, r := range reply.Results {
			reply.Info.ResultsCount += len(r.Lines)
		}
	}

	// Remove overlapping context lines:
	for _, r := range reply.Results {
		for i := 1; i < len(r.Lines); i++ {
			left := &r.Lines[i-1]
			right := &r.Lines[i]
			leftLastLine := left.LineNumber + len(left.ContextAfter)
			rightFirstline := right.LineNumber - len(right.ContextBefore)
			overlap := leftLastLine - rightFirstline + 1
			if overlap < 0 {
				continue
			}
			// The matches are intersecting or share a boundary.
			// Try to split the context between the previous match and this one.
			// Uneven splits should leave the latter element with the larger piece.

			splitAt := (left.LineNumber + right.LineNumber + 1) / 2
			if splitAt < rightFirstline {
				splitAt = rightFirstline
			} else if splitAt > leftLastLine+1 {
				splitAt = leftLastLine + 1
			}

			left.ContextAfter = left.ContextAfter[:splitAt-(left.LineNumber+1)]
			right.ContextBefore = right.ContextBefore[len(right.ContextBefore)-(right.LineNumber-splitAt):]
			left.ClipAfter = true
			right.ClipBefore = true
		}
	}

	log.Printf("responding success results=%d why=%s stats=%s",
		len(reply.Results),
		reply.Info.ExitReason,
		asJSON{reply.Info})

	return reply, nil
}
