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

	"connectrpc.com/connect"

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

func (s *server) ServeAPISearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

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
	reply.Query = q

	// TODO: send an event span

	log.Printf("responding success results=%d why=%s stats=%s",
		len(reply.Results),
		reply.Info.ExitReason,
		asJSON{reply.Info})

	replyJSON(w, 200, reply)
}

func (s *server) Search(ctx context.Context, query *connect.Request[Query]) (*connect.Response[SearchResponse], error) {
	q := query.Msg
	backendName := q.Index
	var backend cs.SearchIndex
	if backendName != "" {
		backend = s.bk[backendName]
		if backend == nil {
			return nil, connect.NewError(connect.CodeInvalidArgument, fmt.Errorf("unknown backend: %s", backendName))
		}
	} else {
		for _, backend = range s.bk {
			break // Pick a random one.
		}
	}

	if err := expandQueryParams(q); err != nil {
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	if q.Line == "" {
		return nil, connect.NewError(connect.CodeInvalidArgument, fmt.Errorf("match string not specified"))
	}

	if q.MaxMatches == 0 {
		q.MaxMatches = int32(s.config.DefaultMaxMatches)
	}
	if q.ContextLines == 0 {
		q.ContextLines = 3
	}

	reply, err := s.doSearch(ctx, backend, q)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}
	reply.Query = q

	// TODO: send an event span

	log.Printf("responding success results=%d why=%s stats=%s",
		len(reply.Results),
		reply.Info.ExitReason,
		asJSON{reply.Info})

	replyJSON(w, 200, reply)
	res := connect.NewResponse(&SearchResponse{
		Query:       nil,
		Info:        nil,
		Matches:     nil,
		FileMatches: nil,
	})
	return res, nil
}

func (s *server) doSearch(ctx context.Context, backend cs.SearchIndex, q *Query) (*SearchResponse, error) {
	start := time.Now()

	res, err := backend.Search(ctx, cs.Query{
		Line:         q.Line,
		File:         q.SelectFiles,
		NotFile:      q.RejectFiles,
		Repo:         q.SelectRepos,
		NotRepo:      q.RejectRepos,
		RepoFilter:   q.OnlyRepos,
		FoldCase:     q.GetFoldCase(),
		MaxMatches:   int(q.MaxMatches),
		FilenameOnly: q.OnlyFilename,
		ContextLines: int(q.ContextLines),
	})
	if err != nil {
		log.Printf("error talking to backend err=%s", err)
		return nil, err
	}

	out := &SearchResponse{
		Query: q,
		Info: &SearchInfo{
			TotalTime:  res.Stats.TotalTime,
			ExitReason: res.Stats.ExitReason.String(),
		},
	}

	for _, r := range res.Results {
		lines := []LineMatch{}
		for _, r := range r.Lines {
			// TODO: simply skip the context lines if they're not larger than the previous line number...
			// XXX you are here XXX...

			lines = append(lines, LineMatch{
				LineNumber:    int32(int(r.LineNumber)),
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

	for _, r := range res.FileResults {
		reply.FileResults = append(reply.FileResults, &api.FileResult{
			Tree:    r.File.Tree,
			Version: r.File.Version,
			Path:    r.File.Path,
			Bounds:  [2]int{int(r.Bounds.Left), int(r.Bounds.Right)},
		})
	}

	return reply, nil
}
