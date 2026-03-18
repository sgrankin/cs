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

func newTestServer(index cs.SearchIndex) *server {
	cfg := cs.ServeConfig{DefaultMaxMatches: 50}
	return New(cfg, index, StaticFS())
}

func TestNew(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)
	if srv == nil {
		t.Fatal("New returned nil")
	}
	if srv.Handler == nil {
		t.Fatal("New did not set Handler")
	}
	if srv.bk != idx {
		t.Error("New did not set backend")
	}
}

func TestServeRoot(t *testing.T) {
	srv := newTestServer(simpleIndex(t))
	req := httptest.NewRequest("GET", "/", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusSeeOther {
		t.Errorf("GET / status = %d, want %d", resp.StatusCode, http.StatusSeeOther)
	}
	loc := resp.Header.Get("Location")
	if loc != "/search" {
		t.Errorf("GET / Location = %q, want /search", loc)
	}
}

func TestServeHealthcheck(t *testing.T) {
	srv := newTestServer(simpleIndex(t))
	req := httptest.NewRequest("GET", "/debug/healthcheck", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("GET /debug/healthcheck status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
	body := w.Body.String()
	if !strings.Contains(body, "ok") {
		t.Errorf("GET /debug/healthcheck body = %q, want containing 'ok'", body)
	}
}

func TestServeOpensearch(t *testing.T) {
	srv := newTestServer(simpleIndex(t))
	req := httptest.NewRequest("GET", "/opensearch.xml", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("GET /opensearch.xml status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
	ct := resp.Header.Get("Content-Type")
	if ct != "application/xml" {
		t.Errorf("GET /opensearch.xml Content-Type = %q, want application/xml", ct)
	}
	body := w.Body.String()
	if !strings.Contains(body, "OpenSearchDescription") {
		t.Errorf("GET /opensearch.xml body should contain OpenSearchDescription, got %q", body)
	}
}

func TestServeSPA(t *testing.T) {
	srv := newTestServer(simpleIndex(t))

	tests := []struct {
		path string
	}{
		{"/search"},
		{"/view/repo/ver/+/file.go"},
		{"/about"},
	}
	for _, tc := range tests {
		t.Run(tc.path, func(t *testing.T) {
			req := httptest.NewRequest("GET", tc.path, nil)
			w := httptest.NewRecorder()
			srv.ServeHTTP(w, req)

			resp := w.Result()
			if resp.StatusCode != http.StatusOK {
				t.Errorf("GET %s status = %d, want %d", tc.path, resp.StatusCode, http.StatusOK)
			}
			body := w.Body.String()
			if !strings.Contains(body, "<cs-app>") {
				t.Errorf("GET %s body should contain <cs-app>, got: %s", tc.path, body[:100])
			}
			if !strings.Contains(body, "app.js") {
				t.Errorf("GET %s body should reference app.js", tc.path)
			}
		})
	}
}
