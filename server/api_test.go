// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"slices"
	"strings"
	"testing"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/server/api"
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

func TestExtractQueryNewParams(t *testing.T) {
	tests := []struct {
		name     string
		url      string
		wantCtx  int
		wantMax  int
		wantExt  []string
		wantPfx  []string
		wantRepo []string
	}{
		{
			name:    "context param",
			url:     "/api/search?q=hello&context=5",
			wantCtx: 5,
		},
		{
			name:    "max param",
			url:     "/api/search?q=hello&max=100",
			wantMax: 100,
		},
		{
			name:    "f.ext facet",
			url:     "/api/search?q=hello&f.ext=.go&f.ext=.py",
			wantExt: []string{".go", ".py"},
		},
		{
			name:    "f.path facet",
			url:     "/api/search?q=hello&f.path=src/&f.path=lib/",
			wantPfx: []string{"src/", "lib/"},
		},
		{
			name:     "f.repo facet",
			url:      "/api/search?q=hello&f.repo=org/alpha&f.repo=org/beta",
			wantRepo: []string{"org/alpha", "org/beta"},
		},
		{
			name: "invalid context ignored",
			url:  "/api/search?q=hello&context=-1",
		},
		{
			name: "invalid max ignored",
			url:  "/api/search?q=hello&max=0",
		},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			r := httptest.NewRequest("GET", tc.url, nil)
			q, err := extractQuery(r)
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if tc.wantCtx != 0 && q.ContextLines != tc.wantCtx {
				t.Errorf("ContextLines = %d, want %d", q.ContextLines, tc.wantCtx)
			}
			if tc.wantMax != 0 && q.MaxMatches != tc.wantMax {
				t.Errorf("MaxMatches = %d, want %d", q.MaxMatches, tc.wantMax)
			}
			if !slices.Equal(q.FacetExtensions, tc.wantExt) {
				t.Errorf("FacetExtensions = %v, want %v", q.FacetExtensions, tc.wantExt)
			}
			if !slices.Equal(q.FacetPaths, tc.wantPfx) {
				t.Errorf("FacetPaths = %v, want %v", q.FacetPaths, tc.wantPfx)
			}
			if !slices.Equal(q.FacetRepos, tc.wantRepo) {
				t.Errorf("FacetRepos = %v, want %v", q.FacetRepos, tc.wantRepo)
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

func TestSearchForRequestMaxMatchesEnforced(t *testing.T) {
	// manymatches.txtar has 25 files each with "match_here".
	// With MaxMatches=5, we should get at most ~5 matching lines, not all 25.
	idx := newTestIndex(t, testTree{"myrepo", "v1", "manymatches.txtar"})
	cfg := cs.ServeConfig{DefaultMaxMatches: 50}
	srv := New(cfg, idx, StaticFS())

	reply, err := srv.searchForRequest(context.Background(), cs.Query{Line: "match_here", MaxMatches: 5})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if reply == nil {
		t.Fatal("expected non-nil reply")
	}
	if !reply.Info.HasMore {
		t.Error("expected HasMore=true when match limit is reached")
	}
	totalLines := 0
	for _, r := range reply.Results {
		totalLines += len(r.Lines)
	}
	// Should have stopped around MaxMatches, not collected all 25.
	if totalLines > 10 {
		t.Errorf("expected at most ~10 matching lines (MaxMatches=5 + one repo batch), got %d", totalLines)
	}
}

func TestAPISearchMaxMatchesEnforced(t *testing.T) {
	idx := newTestIndex(t, testTree{"myrepo", "v1", "manymatches.txtar"})
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/api/search?q=match_here&max=5", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	lines := nonEmptyLines(w.Body.String())
	resultCount := 0
	for _, line := range lines {
		if strings.HasPrefix(line, `{"type":"result"`) {
			resultCount++
		}
	}
	// With max=5, should have far fewer than 25 result events.
	if resultCount > 10 {
		t.Errorf("expected at most ~10 result events with max=5, got %d", resultCount)
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

func TestMergeLineResults(t *testing.T) {
	tests := []struct {
		name    string
		results []cs.LineResult
		want    string // JSON of CompactLines
	}{
		{
			name:    "empty",
			results: nil,
			want:    "[]",
		},
		{
			name: "single match no context",
			results: []cs.LineResult{
				{LineNumber: 5, Line: "target", Bounds: cs.Bounds{Left: 0, Right: 6}},
			},
			want: `[[5,"target",[[0,6]]]]`,
		},
		{
			name: "single match with context",
			results: []cs.LineResult{
				{
					LineNumber:    5,
					Line:          "target",
					Bounds:        cs.Bounds{Left: 0, Right: 6},
					ContextBefore: []string{"line three", "line four"},
					ContextAfter:  []string{"line six", "line seven"},
				},
			},
			want: `[[3,"line three"],[4,"line four"],[5,"target",[[0,6]]],[6,"line six"],[7,"line seven"]]`,
		},
		{
			name: "overlapping context merged into single group",
			results: []cs.LineResult{
				{
					LineNumber:    5,
					Line:          "target alpha",
					Bounds:        cs.Bounds{Left: 0, Right: 6},
					ContextBefore: []string{"line three", "line four"},
					ContextAfter:  []string{"line six", "line seven"},
				},
				{
					LineNumber:    8,
					Line:          "target beta",
					Bounds:        cs.Bounds{Left: 0, Right: 6},
					ContextBefore: []string{"line six", "line seven"},
					ContextAfter:  []string{"line nine", "line ten"},
				},
			},
			// Lines 3-10: merged into one contiguous group
			want: `[[3,"line three"],[4,"line four"],[5,"target alpha",[[0,6]]],[6,"line six"],[7,"line seven"],[8,"target beta",[[0,6]]],[9,"line nine"],[10,"line ten"]]`,
		},
		{
			name: "non-overlapping creates two groups",
			results: []cs.LineResult{
				{
					LineNumber:    5,
					Line:          "target alpha",
					Bounds:        cs.Bounds{Left: 0, Right: 6},
					ContextBefore: []string{"line four"},
					ContextAfter:  []string{"line six"},
				},
				{
					LineNumber:    20,
					Line:          "target beta",
					Bounds:        cs.Bounds{Left: 0, Right: 6},
					ContextBefore: []string{"line nineteen"},
					ContextAfter:  []string{"line twenty one"},
				},
			},
			want: `[[4,"line four"],[5,"target alpha",[[0,6]]],[6,"line six"],null,[19,"line nineteen"],[20,"target beta",[[0,6]]],[21,"line twenty one"]]`,
		},
		{
			name: "adjacent matches (no gap)",
			results: []cs.LineResult{
				{LineNumber: 5, Line: "alpha", Bounds: cs.Bounds{Left: 0, Right: 5}},
				{LineNumber: 6, Line: "beta", Bounds: cs.Bounds{Left: 0, Right: 4}},
			},
			want: `[[5,"alpha",[[0,5]]],[6,"beta",[[0,4]]]]`,
		},
		{
			name: "context line overlaps with match line",
			results: []cs.LineResult{
				{
					LineNumber:   5,
					Line:         "alpha",
					Bounds:       cs.Bounds{Left: 0, Right: 5},
					ContextAfter: []string{"shared line"},
				},
				{
					LineNumber:    6,
					Line:          "shared line",
					Bounds:        cs.Bounds{Left: 0, Right: 6},
					ContextBefore: []string{"alpha"},
				},
			},
			// Line 6 appears as context of result[0] and as match of result[1].
			// The match bounds should be preserved.
			want: `[[5,"alpha",[[0,5]]],[6,"shared line",[[0,6]]]]`,
		},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			groups := mergeLineResults(tc.results)
			got, err := json.Marshal(api.CompactLines(groups))
			if err != nil {
				t.Fatal(err)
			}
			if string(got) != tc.want {
				t.Errorf("mergeLineResults:\n  got  %s\n  want %s", got, tc.want)
			}
		})
	}
}
