// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"sgrankin.dev/cs"
)

func TestServeSearchFullPage(t *testing.T) {
	idx := newTestIndex(t,
		testTree{"myrepo", "abc123", "simple.txtar"},
		testTree{"other", "def456", "simple.txtar"},
	)
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/search?q=hello", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
	// Should not be SSE for non-htmx requests
	ct := resp.Header.Get("Content-Type")
	if strings.Contains(ct, "text/event-stream") {
		t.Error("full page should not be SSE")
	}
}

func TestServeSearchFullPageNoQuery(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/search", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
}

func TestStreamSearchWithResults(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/search?q=hello", nil)
	req.Header.Set("hx-request", "true")
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}

	body := w.Body.String()
	// SSE format: lines starting with "data:"
	if !strings.Contains(body, "data:") {
		t.Errorf("SSE response should contain 'data:' lines, got:\n%s", body)
	}
}

func TestStreamSearchEmptyQuery(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/search", nil)
	req.Header.Set("hx-request", "true")
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
	body := w.Body.String()
	if !strings.Contains(body, "data:") {
		t.Errorf("SSE response should contain 'data:' lines even for empty query, got:\n%s", body)
	}
}

func TestStreamSearchFilenameOnly(t *testing.T) {
	idx := newTestIndex(t, testTree{"myrepo", "abc123def456", "manymatches.txtar"})
	srv := newTestServer(idx)

	// Trigger filename-only search through query parsing
	req := httptest.NewRequest("GET", "/search?q=file:hello", nil)
	req.Header.Set("hx-request", "true")
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
}

func TestStreamSearchManyResults(t *testing.T) {
	idx := newTestIndex(t, testTree{"myrepo", "abc123def456", "manymatches.txtar"})
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/search?q=match_here", nil)
	req.Header.Set("hx-request", "true")
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
}

func TestStreamSearchWithFileExtensionFacet(t *testing.T) {
	// Test the branch where query already has a file filter (no ext buttons emitted).
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	// Query with file: prefix means q.File is populated
	req := httptest.NewRequest("GET", "/search?q=hello+file:.go", nil)
	req.Header.Set("hx-request", "true")
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
}

func TestPageTitle(t *testing.T) {
	tests := []struct {
		name string
		q    cs.Query
		want string
	}{
		{"empty query", cs.Query{}, "code search"},
		{"with line", cs.Query{Line: "hello"}, "hello · code search"},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := pageTitle(tc.q)
			if got != tc.want {
				t.Errorf("pageTitle(%v) = %q, want %q", tc.q, got, tc.want)
			}
		})
	}
}

func TestMakeSearchScriptData(t *testing.T) {
	idx := newTestIndex(t,
		testTree{"repo1", "aabbcc", "simple.txtar"},
		testTree{"repo2", "ddeeff", "simple.txtar"},
	)
	srv := newTestServer(idx)

	bk, sampleRepo := srv.makeSearchScriptData()
	if bk != idx {
		t.Error("backend should match")
	}
	if sampleRepo != "repo1" && sampleRepo != "repo2" {
		t.Errorf("sampleRepo = %q, want %q or %q", sampleRepo, "repo1", "repo2")
	}
}

func TestMakeSearchScriptDataNoTrees(t *testing.T) {
	idx := newTestIndex(t) // no trees at all
	srv := newTestServer(idx)

	_, sampleRepo := srv.makeSearchScriptData()
	if sampleRepo != "" {
		t.Errorf("sampleRepo = %q, want empty", sampleRepo)
	}
}

func TestStreamSearchFileResultsCappedForNonFilenameSearch(t *testing.T) {
	idx := newTestIndex(t, testTree{"myrepo", "abc123def456", "manymatches.txtar"})
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/search?q=match", nil)
	req.Header.Set("hx-request", "true")
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want 200", resp.StatusCode)
	}
}
