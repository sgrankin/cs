// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestServeAPISearch(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	tests := []struct {
		name       string
		url        string
		wantStatus int
		wantType   string
		// wantLines are JSONL event type prefixes to check ordering.
		// Each entry is a prefix that the corresponding line must start with.
		wantLines []string
	}{
		{
			name:       "empty query returns done only",
			url:        "/api/search",
			wantStatus: http.StatusOK,
			wantType:   "application/x-ndjson",
			wantLines:  []string{`{"type":"done"`},
		},
		{
			name:       "basic search returns results",
			url:        "/api/search?q=hello",
			wantStatus: http.StatusOK,
			wantType:   "application/x-ndjson",
			wantLines: []string{
				`{"type":"result"`,
				`{"type":"facets"`,
				`{"type":"done"`,
			},
		},
		{
			name:       "filename only search returns file events",
			url:        "/api/search?q=file:main",
			wantStatus: http.StatusOK,
			wantType:   "application/x-ndjson",
			wantLines: []string{
				`{"type":"file"`,
			},
		},
		{
			name:       "bad regex returns error",
			url:        "/api/search?q=[",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:       "bad query string returns error",
			url:        "/api/search?q=%zz",
			wantStatus: http.StatusBadRequest,
		},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			req := httptest.NewRequest("GET", tc.url, nil)
			w := httptest.NewRecorder()
			srv.ServeHTTP(w, req)

			resp := w.Result()
			if resp.StatusCode != tc.wantStatus {
				t.Fatalf("status = %d, want %d; body: %s", resp.StatusCode, tc.wantStatus, w.Body.String())
			}
			if tc.wantType != "" {
				ct := resp.Header.Get("Content-Type")
				if !strings.HasPrefix(ct, tc.wantType) {
					t.Errorf("Content-Type = %q, want prefix %q", ct, tc.wantType)
				}
			}
			if tc.wantLines != nil {
				lines := nonEmptyLines(w.Body.String())
				if len(lines) < len(tc.wantLines) {
					t.Fatalf("got %d lines, want at least %d:\n%s", len(lines), len(tc.wantLines), w.Body.String())
				}
				for i, prefix := range tc.wantLines {
					if !strings.HasPrefix(lines[i], prefix) {
						t.Errorf("line %d: got %q, want prefix %q", i, lines[i], prefix)
					}
				}
			}
		})
	}
}

func TestServeAPISearchCacheHeaders(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/api/search?q=hello", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	cc := w.Result().Header.Get("Cache-Control")
	if cc != "max-age=30" {
		t.Errorf("Cache-Control = %q, want %q", cc, "max-age=30")
	}
}

func TestServeAPISearchResultFormat(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/api/search?q=hello&context=3", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	lines := nonEmptyLines(w.Body.String())
	// First line should be a result event with the expected path format.
	if len(lines) == 0 {
		t.Fatal("no output")
	}

	// Check that result path follows the repo/version/+/path format.
	first := lines[0]
	if !strings.Contains(first, `"path":"myrepo/`) {
		t.Errorf("result path should contain repo name: %s", first)
	}
	if !strings.Contains(first, "/+/") {
		t.Errorf("result path should contain /+/ separator: %s", first)
	}

	// Check that lines contain compact format [lno, text, ...].
	if !strings.Contains(first, `"lines":[[`) {
		t.Errorf("result should contain compact lines format: %s", first)
	}

	// Last line should be done event.
	last := lines[len(lines)-1]
	if !strings.HasPrefix(last, `{"type":"done"`) {
		t.Errorf("last line should be done event: %s", last)
	}
	if !strings.Contains(last, `"total":`) {
		t.Errorf("done event should contain total: %s", last)
	}
}

func TestServeAPISearchOverlapMerge(t *testing.T) {
	// Use the overlap test data: matches at lines 5, 8, 18.
	// With context=3, lines 5 and 8 overlap. Should merge into one group.
	idx := newTestIndex(t, testTree{"r", "v", "overlap.txtar"})
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/api/search?q=target&context=3", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	lines := nonEmptyLines(w.Body.String())
	if len(lines) == 0 {
		t.Fatal("no output")
	}

	// The result for overlap.go should have merged context.
	// Lines 5 and 8 with context=3 overlap → single group lines 2-11.
	// Line 18 with context=3 → separate group lines 15-21.
	// So we expect null separator in the lines array.
	first := lines[0]
	if !strings.Contains(first, "null") {
		t.Errorf("overlapping matches should produce null separator between groups: %s", first)
	}
}

func nonEmptyLines(s string) []string {
	var result []string
	for _, line := range strings.Split(s, "\n") {
		if line = strings.TrimSpace(line); line != "" {
			result = append(result, line)
		}
	}
	return result
}
