// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"cmp"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"maps"
	"net/http"
	"path"
	"slices"
	"strings"
	"time"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server/api"
)

func replyJSON(w http.ResponseWriter, status int, obj any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	enc := json.NewEncoder(w)
	if err := enc.Encode(obj); err != nil {
		log.Printf("writing http response, data=%s err=%q",
			asJSON{obj},
			err.Error())
	}
}

func writeError(w http.ResponseWriter, status int, code, message string) {
	log.Printf("error status=%d code=%s message=%q",
		status, code, message)
	replyJSON(w, status, &api.ReplyError{Err: api.InnerError{Code: code, Message: message}})
}

func writeQueryError(w http.ResponseWriter, err error) {
	// TODO: is this an invalid argument?
	writeError(w, 400, "query", err.Error())
	// writeError(ctx, w, 500, "internal_error",
	// 	fmt.Sprintf("Talking to backend: %s", err.Error()))
}

func extractQuery(r *http.Request) (cs.Query, bool, error) {
	var query cs.Query

	if err := r.ParseForm(); err != nil {
		return query, false, err
	}

	params := r.Form
	var err error

	regex := true
	if re, ok := params["regex"]; ok && re[0] == "false" {
		regex = false
	}

	if q, ok := params["q"]; ok {
		query, err = ParseQuery(q[0], regex)
	}

	// Repo multiselect, but only if "repo:" is not in the query.
	if len(query.Repo) == 0 {
		if repos, ok := params["repo[]"]; ok {
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

	return query, regex, err
}

var ErrTimedOut = errors.New("timed out talking to backend")

func stringSlice(ss []string) []string {
	if ss != nil {
		return ss
	}
	return []string{}
}

func (s *server) doSearch(ctx context.Context, backend cs.SearchIndex, q *cs.Query) (*api.ReplySearch, error) {
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
				ContextBefore: stringSlice(r.ContextBefore),
				ContextAfter:  stringSlice(r.ContextAfter),
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

func (s *server) ServeAPISearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	reply, err := s.searchForRequest(ctx, r)
	if err != nil {
		writeError(w, http.StatusBadRequest, "bad_query", err.Error())
		return
	}
	replyJSON(w, 200, reply)
}

func (s *server) searchForRequest(ctx context.Context, r *http.Request) (*api.ReplySearch, error) {
	backendName := r.PathValue("backend")
	var backend cs.SearchIndex
	if backendName != "" {
		backend = s.bk[backendName]
		if backend == nil {
			return nil, fmt.Errorf("unknown backend: %s", backendName)
		}
	} else {
		for _, backend = range s.bk {
			break
		}
	}

	q, isRegex, err := extractQuery(r)
	if err != nil {
		return nil, err
	}

	if q.Line == "" {
		kind := "string"
		if isRegex {
			kind = "regex"
		}
		return nil, fmt.Errorf("you must specify a %s to match", kind)
	}

	if q.MaxMatches == 0 {
		q.MaxMatches = s.config.DefaultMaxMatches
	}
	if q.ContextLines == 0 {
		q.ContextLines = 3
	}

	reply, err := s.doSearch(ctx, backend, &q)
	if err != nil {
		log.Printf("error in search err=%s", err)
		return nil, err
	}
	reply.Query = q
	reply.Info.QueryTime = time.Duration(reply.Info.TotalTime * int64(time.Millisecond))
	reply.Info.HasMore = reply.Info.ExitReason != "NONE"
	if q.FilenameOnly {
		reply.Info.ResultsCount = len(reply.FileResults)
	} else {
		for _, r := range reply.Results {
			reply.Info.ResultsCount += len(r.Lines)
		}
	}
	extensionsCount := map[string]int{}
	for _, r := range reply.Results {
		extensionsCount[path.Ext(r.Path)] += len(r.Lines)
	}
	extensions := slices.Collect(maps.Keys(extensionsCount))
	extensions = slices.DeleteFunc(extensions, func(e string) bool {
		return e == "" || extensionsCount[e] < 2
	})
	slices.SortFunc(extensions, func(e1, e2 string) int {
		return cmp.Or(
			-cmp.Compare(extensionsCount[e1], extensionsCount[e2]),
			cmp.Compare(e1, e2),
		)
	})
	reply.TopExtensions = extensions
	reply.Backend = backendName
	log.Printf("responding success results=%d why=%s stats=%s",
		len(reply.Results),
		reply.Info.ExitReason,
		asJSON{reply.Info})

	return reply, nil
}
