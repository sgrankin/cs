// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"cmp"
	"context"
	"encoding/json"
	"flag"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"testing"

	"sgrankin.dev/cs"
)

var update = flag.Bool("update", false, "update golden test files")

// TestSearchGolden runs data-driven search tests from testdata/search/*.txt.
//
// Each file has a config section and a golden output section separated by a blank line.
// In the config section:
//   - Lines starting with # are ignored
//   - key=value lines configure the test (see below)
//
// Config keys:
//
//	txtar=simple.txtar         source files to index (from testdata/index/)
//	tree=myrepo                tree name (default: myrepo)
//	version=v1                 version string (default: v1)
//	q=hello                    Query.Line
//	max_matches=10             Query.MaxMatches
//	context_lines=3            Query.ContextLines
//	fold_case=true             Query.FoldCase
//	filename_only=true         Query.FilenameOnly
//	default_max_matches=50     ServeConfig.DefaultMaxMatches
//
// Run with -update to regenerate golden output.
func TestSearchGolden(t *testing.T) {
	entries, err := filepath.Glob("testdata/search/*.txt")
	if err != nil {
		t.Fatal(err)
	}
	if len(entries) == 0 {
		t.Fatal("no test files found in testdata/search/")
	}
	for _, path := range entries {
		name := strings.TrimSuffix(filepath.Base(path), ".txt")
		t.Run(name, func(t *testing.T) {
			data, err := os.ReadFile(path)
			if err != nil {
				t.Fatal(err)
			}
			cfg, wantJSON := parseSearchTest(string(data))

			// Build index.
			txtarFile := cfg["txtar"]
			if txtarFile == "" {
				t.Fatal("missing txtar= in test config")
			}
			tree := cmp.Or(cfg["tree"], "myrepo")
			version := cmp.Or(cfg["version"], "v1")
			idx := newTestIndex(t, testTree{tree, version, txtarFile})

			// Build server config.
			serveCfg := cs.ServeConfig{DefaultMaxMatches: 50}
			if v, ok := cfg["default_max_matches"]; ok {
				serveCfg.DefaultMaxMatches, _ = strconv.Atoi(v)
			}
			srv := New(serveCfg, idx, StaticFS())

			// Build query.
			q := cs.Query{Line: cfg["q"]}
			if v, ok := cfg["max_matches"]; ok {
				q.MaxMatches, _ = strconv.Atoi(v)
			}
			if v, ok := cfg["context_lines"]; ok {
				q.ContextLines, _ = strconv.Atoi(v)
			}
			if cfg["fold_case"] == "true" {
				q.FoldCase = true
			}
			if cfg["filename_only"] == "true" {
				q.FilenameOnly = true
			}

			// Run search.
			reply, err := srv.searchForRequest(context.Background(), q)
			if err != nil {
				t.Fatalf("search error: %v", err)
			}

			// Normalize non-deterministic fields.
			if reply != nil && reply.Info != nil {
				reply.Info.TotalTime = 0
				reply.Info.QueryTime = 0
			}

			gotBytes, err := json.MarshalIndent(reply, "", "  ")
			if err != nil {
				t.Fatal(err)
			}
			got := string(gotBytes) + "\n"

			if *update {
				updateSearchGolden(t, path, string(data), got)
				return
			}

			if wantJSON == "" {
				t.Fatal("no golden output in test file; run with -update to generate")
			}
			if got != wantJSON {
				t.Errorf("output mismatch.\nGot:\n%s\nWant:\n%s", got, wantJSON)
			}
		})
	}
}

// parseSearchTest splits a test file at the first blank line.
// Everything before is config (# comments and key=value lines).
// Everything after is golden JSON.
func parseSearchTest(content string) (config map[string]string, goldenJSON string) {
	config = map[string]string{}
	header, body, _ := strings.Cut(content, "\n\n")
	for _, line := range strings.Split(header, "\n") {
		trimmed := strings.TrimSpace(line)
		if trimmed == "" || strings.HasPrefix(trimmed, "#") {
			continue
		}
		if k, v, ok := strings.Cut(trimmed, "="); ok {
			config[k] = v
		}
	}
	goldenJSON = strings.TrimRight(body, "\n ") + "\n"
	if goldenJSON == "\n" {
		goldenJSON = ""
	}
	return
}

// updateSearchGolden rewrites the file, keeping the header and replacing the golden JSON.
func updateSearchGolden(t *testing.T, path, content, gotJSON string) {
	t.Helper()
	header, _, _ := strings.Cut(content, "\n\n")
	header = strings.TrimRight(header, "\n")
	out := header + "\n\n" + gotJSON
	if err := os.WriteFile(path, []byte(out), 0o644); err != nil {
		t.Fatal(err)
	}
	t.Logf("updated %s", path)
}
