// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"net/http"
	"net/http/httptest"
	"slices"
	"testing"

	"sgrankin.dev/cs"
)

func TestExtractQuery(t *testing.T) {
	tests := []struct {
		name       string
		url        string
		wantLine   string
		wantRepo   string
		wantFilter []string
		wantFold   bool
		wantErr    bool
	}{
		{
			name:     "simple query",
			url:      "/search?q=hello",
			wantLine: "hello",
			wantFold: true,
		},
		{
			name:     "query with literal mode",
			url:      "/search?q=hello.world&literal=true",
			wantLine: `hello\.world`,
			wantFold: true,
		},
		{
			name:     "literal=false treated as regex",
			url:      "/search?q=hello&literal=false",
			wantLine: "hello",
			wantFold: true,
		},
		{
			name:     "empty query",
			url:      "/search",
			wantLine: "",
		},
		{
			name:       "repo multiselect",
			url:        "/search?q=hello&repo=foo&repo=bar",
			wantLine:   "hello",
			wantFilter: []string{"foo", "bar"},
			wantFold:   true,
		},
		{
			name:     "repo in query overrides multiselect",
			url:      "/search?q=hello+repo:myrepo&repo=foo",
			wantLine: "hello",
			wantRepo: "myrepo",
			wantFold: true,
		},
		{
			name:     "fold_case true",
			url:      "/search?q=hello&fold_case=true",
			wantLine: "hello",
			wantFold: true,
		},
		{
			name:     "fold_case false",
			url:      "/search?q=hello&fold_case=false",
			wantLine: "hello",
			wantFold: false,
		},
		{
			name:     "fold_case auto (lowercase)",
			url:      "/search?q=hello&fold_case=auto",
			wantLine: "hello",
			wantFold: true,
		},
		{
			name:     "fold_case auto (uppercase present)",
			url:      "/search?q=Hello&fold_case=auto",
			wantLine: "Hello",
			wantFold: false,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			r := httptest.NewRequest("GET", tc.url, nil)
			q, err := extractQuery(r)
			if tc.wantErr && err == nil {
				t.Fatal("expected error, got nil")
			}
			if !tc.wantErr && err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if q.Line != tc.wantLine {
				t.Errorf("Line = %q, want %q", q.Line, tc.wantLine)
			}
			if q.Repo != tc.wantRepo {
				t.Errorf("Repo = %q, want %q", q.Repo, tc.wantRepo)
			}
			if !slices.Equal(q.RepoFilter, tc.wantFilter) {
				t.Errorf("RepoFilter = %v, want %v", q.RepoFilter, tc.wantFilter)
			}
			if q.FoldCase != tc.wantFold {
				t.Errorf("FoldCase = %v, want %v", q.FoldCase, tc.wantFold)
			}
		})
	}
}

func TestDoSearchError(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)
	q := cs.Query{Line: "[", MaxMatches: 10}
	_, err := srv.doSearch(context.Background(), &q)
	if err == nil {
		t.Fatal("expected error for invalid regex, got nil")
	}
}

func TestSearchForRequestError(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	_, err := srv.searchForRequest(context.Background(), cs.Query{Line: "["})
	if err == nil {
		t.Error("expected error for invalid regex, got nil")
	}
}

// HasMore is tested as a Go test because the specific results under MaxMatches
// are non-deterministic (parallel search with early termination).
func TestSearchForRequestHasMore(t *testing.T) {
	idx := newTestIndex(t, testTree{"myrepo", "v1", "manymatches.txtar"})
	cfg := cs.ServeConfig{DefaultMaxMatches: 50}
	srv := New(cfg, idx, StaticFS())

	reply, err := srv.searchForRequest(context.Background(), cs.Query{Line: "match_here", MaxMatches: 2})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if reply == nil {
		t.Fatal("expected non-nil reply")
	}
	if !reply.Info.HasMore {
		t.Error("expected HasMore=true when match limit is reached")
	}
}

func TestExtractQueryParseFormError(t *testing.T) {
	r := httptest.NewRequest("GET", "/search?q=%zz", nil)
	_, err := extractQuery(r)
	if err == nil {
		t.Error("expected error from malformed query string, got nil")
	}
}

func TestExtractQueryViaHTTP(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/search?q=test&fold_case=auto", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
}
