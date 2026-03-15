// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestServeRaw(t *testing.T) {
	idx := simpleIndex(t) // tree=myrepo, version=abc123
	srv := newTestServer(idx)

	tests := []struct {
		name       string
		path       string
		wantStatus int
		wantType   string
		wantBody   string // substring check; empty = skip
	}{
		{
			name:       "file content",
			path:       "/raw/myrepo/abc123/+/main.go",
			wantStatus: http.StatusOK,
			wantType:   "application/octet-stream",
			wantBody:   "func hello()",
		},
		{
			name:       "root dir listing",
			path:       "/raw/myrepo/abc123/+/",
			wantStatus: http.StatusOK,
			wantType:   "application/json",
		},
		{
			name:       "subdir listing",
			path:       "/raw/myrepo/abc123/+/sub/",
			wantStatus: http.StatusOK,
			wantType:   "application/json",
		},
		{
			name:       "missing /+/ separator",
			path:       "/raw/myrepo/abc123/main.go",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:       "missing version",
			path:       "/raw/myrepo/+/main.go",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:       "file not found",
			path:       "/raw/myrepo/abc123/+/nonexistent.go",
			wantStatus: http.StatusNotFound,
		},
		{
			name:       "dir not found",
			path:       "/raw/myrepo/abc123/+/nonexistent/",
			wantStatus: http.StatusNotFound,
		},
		{
			name:       "wrong repo",
			path:       "/raw/wrongrepo/abc123/+/main.go",
			wantStatus: http.StatusNotFound,
		},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			req := httptest.NewRequest("GET", tc.path, nil)
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
			if tc.wantBody != "" && !strings.Contains(w.Body.String(), tc.wantBody) {
				t.Errorf("body should contain %q, got: %s", tc.wantBody, w.Body.String())
			}
		})
	}
}

func TestServeRawCacheHeaders(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/raw/myrepo/abc123/+/main.go", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	cc := w.Result().Header.Get("Cache-Control")
	if !strings.Contains(cc, "immutable") {
		t.Errorf("Cache-Control = %q, want containing 'immutable'", cc)
	}
	if !strings.Contains(cc, "max-age=31536000") {
		t.Errorf("Cache-Control = %q, want containing 'max-age=31536000'", cc)
	}
}

func TestServeRawDirContent(t *testing.T) {
	idx := simpleIndex(t) // has: main.go, util.go, sub/deep.go, sub/other.go, README.md
	srv := newTestServer(idx)

	// Root listing should have files and subdirectories.
	req := httptest.NewRequest("GET", "/raw/myrepo/abc123/+/", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	var entries []string
	if err := json.Unmarshal(w.Body.Bytes(), &entries); err != nil {
		t.Fatalf("failed to parse dir listing: %v; body: %s", err, w.Body.String())
	}

	// Check for expected entries.
	entrySet := map[string]bool{}
	for _, e := range entries {
		entrySet[e] = true
	}
	for _, want := range []string{"main.go", "util.go", "README.md", "sub/"} {
		if !entrySet[want] {
			t.Errorf("root listing missing %q; got %v", want, entries)
		}
	}

	// Sub-directory listing.
	req = httptest.NewRequest("GET", "/raw/myrepo/abc123/+/sub/", nil)
	w = httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	entries = nil
	if err := json.Unmarshal(w.Body.Bytes(), &entries); err != nil {
		t.Fatalf("failed to parse sub dir listing: %v; body: %s", err, w.Body.String())
	}
	entrySet = map[string]bool{}
	for _, e := range entries {
		entrySet[e] = true
	}
	for _, want := range []string{"deep.go", "other.go"} {
		if !entrySet[want] {
			t.Errorf("sub listing missing %q; got %v", want, entries)
		}
	}
}
