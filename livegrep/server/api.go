// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server/api"
)

func replyJSON(w http.ResponseWriter, status int, obj interface{}) {
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
		if fc[0] == "false" {
			query.FoldCase = false
		} else if fc[0] == "true" {
			query.FoldCase = true
		} else {
			query.FoldCase = strings.IndexAny(query.Line, "ABCDEFGHIJKLMNOPQRSTUVWXYZ") == -1
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
	var search *cs.CodeSearchResult
	var err error

	start := time.Now()

	ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	search, err = backend.Search(ctx, *q)
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

	reply.Info = &api.Stats{
		RE2Time:     search.Stats.RE2Time,
		GitTime:     search.Stats.GitTime,
		SortTime:    search.Stats.SortTime,
		IndexTime:   search.Stats.IndexTime,
		AnalyzeTime: search.Stats.AnalyzeTime,
		TotalTime:   int64(time.Since(start) / time.Millisecond),
		ExitReason:  search.Stats.ExitReason.String(),
	}
	return reply, nil
}

func (s *server) ServeAPISearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	backendName := r.PathValue("backend")
	var backend cs.SearchIndex
	if backendName != "" {
		backend = s.bk[backendName]
		if backend == nil {
			writeError(w, 400, "bad_backend",
				fmt.Sprintf("Unknown backend: %s", backendName))
			return
		}
	} else {
		for _, backend = range s.bk {
			break
		}
	}

	q, is_regex, err := extractQuery(r)
	if err != nil {
		writeError(w, 400, "bad_query", err.Error())
		return
	}

	if q.Line == "" {
		kind := "string"
		if is_regex {
			kind = "regex"
		}
		msg := fmt.Sprintf("You must specify a %s to match", kind)
		writeError(w, 400, "bad_query", msg)
		return
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
		writeQueryError(w, err)
		return
	}

	// TODO: send an event span
	// e := s.honey.NewEvent()
	// reqid, ok := reqid.FromContext(ctx)
	// if ok {
	// 	e.AddField("request_id", reqid)
	// }
	// e.AddField("backend", backend.Id)
	// e.AddField("query_line", q.Line)
	// e.AddField("query_file", q.File)
	// e.AddField("query_repo", q.Repo)
	// e.AddField("query_foldcase", q.FoldCase)
	// e.AddField("query_not_file", q.NotFile)
	// e.AddField("query_not_repo", q.NotRepo)
	// e.AddField("max_matches", q.MaxMatches)

	// e.AddField("result_count", len(reply.Results))
	// e.AddField("re2_time", reply.Info.RE2Time)
	// e.AddField("git_time", reply.Info.GitTime)
	// e.AddField("sort_time", reply.Info.SortTime)
	// e.AddField("index_time", reply.Info.IndexTime)
	// e.AddField("analyze_time", reply.Info.AnalyzeTime)

	// e.AddField("exit_reason", reply.Info.ExitReason)
	// e.Send()

	log.Printf("responding success results=%d why=%s stats=%s",
		len(reply.Results),
		reply.Info.ExitReason,
		asJSON{reply.Info})

	replyJSON(w, 200, reply)
}
