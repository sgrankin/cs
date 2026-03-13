package cs

import (
	"embed"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

//go:embed testdata/embed
var testEmbedFS embed.FS

func TestEmbedFSServer(t *testing.T) {
	srv := httptest.NewServer(EmbedFSServer(testEmbedFS))
	defer srv.Close()

	tests := []struct {
		name, path string
		wantStatus int
		wantBody   string // empty means don't check
		wantEtag   bool   // expect non-empty Etag header
	}{
		{
			name:       "serves file",
			path:       "/testdata/embed/hello.txt",
			wantStatus: 200,
			wantBody:   "hello world\n",
			wantEtag:   true,
		},
		{
			name:       "404 for nonexistent file",
			path:       "/testdata/embed/nonexistent.txt",
			wantStatus: 404,
		},
		{
			name:       "directory listing",
			path:       "/testdata/embed/",
			wantStatus: 200,
		},
		{
			name:       "root",
			path:       "/",
			wantStatus: 200,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp, err := http.Get(srv.URL + tt.path)
			if err != nil {
				t.Fatalf("GET %s failed: %v", tt.path, err)
			}
			defer resp.Body.Close()
			if resp.StatusCode != tt.wantStatus {
				t.Fatalf("status = %d, want %d", resp.StatusCode, tt.wantStatus)
			}
			if tt.wantBody != "" {
				body, _ := io.ReadAll(resp.Body)
				if string(body) != tt.wantBody {
					t.Errorf("body = %q, want %q", body, tt.wantBody)
				}
			}
			etag := resp.Header.Get("Etag")
			if tt.wantEtag && etag == "" {
				t.Error("expected Etag header to be set")
			}
			if !tt.wantEtag && etag != "" {
				t.Errorf("expected no Etag header, got %q", etag)
			}
		})
	}

	// Etag consistency: two requests to the same file should return the same Etag.
	t.Run("etag consistency", func(t *testing.T) {
		path := srv.URL + "/testdata/embed/hello.txt"
		resp1, err := http.Get(path)
		if err != nil {
			t.Fatal(err)
		}
		resp1.Body.Close()
		etag1 := resp1.Header.Get("Etag")
		if etag1 == "" {
			t.Fatal("expected Etag header on first request")
		}

		resp2, err := http.Get(path)
		if err != nil {
			t.Fatal(err)
		}
		resp2.Body.Close()
		if resp2.Header.Get("Etag") != etag1 {
			t.Errorf("Etag changed between requests: %q vs %q", etag1, resp2.Header.Get("Etag"))
		}
	})
}
