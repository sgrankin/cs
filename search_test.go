package cs

import (
	"context"
	"encoding/json"
	"flag"
	"os"
	"path/filepath"
	"slices"
	"strconv"
	"strings"
	"testing"
	"testing/fstest"

	"golang.org/x/tools/txtar"
)

var update = flag.Bool("update", false, "update golden test files")

// TestSearchGolden runs data-driven search tests from testdata/search/*.txtar.
//
// Each txtar file has a comment section (config + golden JSON separated by a blank line)
// and file entries that become the source files to index.
//
// Config keys (one per line in the comment header):
//
//	q=hello                  Query.Line
//	max_matches=100          Query.MaxMatches (default: 100)
//	fold_case=true           Query.FoldCase
//	filename_only=true       Query.FilenameOnly
//	file=\.go$               Query.File (repeatable)
//	not_file=_test\.go$      Query.NotFile (repeatable)
//	repo=alpha               Query.Repo
//	not_repo=beta            Query.NotRepo
//	repo_filter=alpha,gamma  Query.RepoFilter (comma-separated)
//	context_lines=3          Query.ContextLines
//	tree=repo                tree name (default: "repo")
//	name=test                index name (default: "test")
//	want_error=true          expect Search to return error (no golden JSON)
//	stats_only=true          compare only Stats (for non-deterministic match-limit tests)
//
// For multi-tree tests, use tree=alpha,beta and prefix file entries with
// the tree name: "alpha/file.txt". The runner splits on the first "/" to
// determine which tree each file belongs to.
//
// Run with -update to regenerate golden output.
func TestSearchGolden(t *testing.T) {
	entries, err := filepath.Glob("testdata/search/*.txtar")
	if err != nil {
		t.Fatal(err)
	}
	if len(entries) == 0 {
		t.Fatal("no test files found in testdata/search/")
	}
	for _, path := range entries {
		name := strings.TrimSuffix(filepath.Base(path), ".txtar")
		t.Run(name, func(t *testing.T) {
			ar, err := txtar.ParseFile(path)
			if err != nil {
				t.Fatal(err)
			}

			cfg, wantJSON := parseSearchTest(string(ar.Comment))

			// Determine tree names.
			treeName := "repo"
			if v, ok := cfg["tree"]; ok {
				treeName = v
			}
			treeNames := strings.Split(treeName, ",")
			multiTree := len(treeNames) > 1

			// Build file trees from txtar file entries.
			trees := map[string]map[string]string{}
			for _, tn := range treeNames {
				trees[tn] = map[string]string{}
			}
			for _, f := range ar.Files {
				if multiTree {
					tn, relPath, ok := strings.Cut(f.Name, "/")
					if !ok {
						t.Fatalf("multi-tree file %q missing tree prefix", f.Name)
					}
					if _, exists := trees[tn]; !exists {
						t.Fatalf("file %q references unknown tree %q", f.Name, tn)
					}
					trees[tn][relPath] = string(f.Data)
				} else {
					trees[treeNames[0]][f.Name] = string(f.Data)
				}
			}

			// Build index.
			indexName := "test"
			if v, ok := cfg["name"]; ok {
				indexName = v
			}
			si := buildTestSearchIndex(t, indexName, trees)

			// Build query.
			q := Query{
				Line:       cfg["q"],
				MaxMatches: 100,
			}
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
			if vals, ok := cfg["file"]; ok {
				q.File = strings.Split(vals, "\x00")
			}
			if vals, ok := cfg["not_file"]; ok {
				q.NotFile = strings.Split(vals, "\x00")
			}
			if v, ok := cfg["repo"]; ok {
				q.Repo = v
			}
			if v, ok := cfg["not_repo"]; ok {
				q.NotRepo = v
			}
			if v, ok := cfg["repo_filter"]; ok {
				q.RepoFilter = strings.Split(v, ",")
			}

			// Run search.
			result, err := si.Search(context.Background(), q)

			if cfg["want_error"] == "true" {
				if err == nil {
					t.Fatal("expected error, got nil")
				}
				return
			}
			if err != nil {
				t.Fatalf("Search: %v", err)
			}

			// Normalize non-deterministic fields.
			result.IndexName = ""
			result.IndexTime = 0
			result.Stats.TotalTime = 0

			// For stats_only tests, clear non-deterministic result fields.
			statsOnly := cfg["stats_only"] == "true"
			if statsOnly {
				result.Results = nil
				result.FileResults = nil
				result.Facets = nil
			}

			gotBytes, err := json.MarshalIndent(result, "", "  ")
			if err != nil {
				t.Fatal(err)
			}
			got := string(gotBytes) + "\n"

			if *update {
				updateGoldenTxtar(t, path, ar, got)
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

// parseSearchTest splits the txtar comment at the first blank line.
// Everything before is config (# comments and key=value lines).
// Everything after is golden JSON.
// The "file" and "not_file" keys are repeatable: multiple values are joined with \x00.
func parseSearchTest(content string) (config map[string]string, goldenJSON string) {
	config = map[string]string{}
	header, body, _ := strings.Cut(content, "\n\n")
	for _, line := range strings.Split(header, "\n") {
		trimmed := strings.TrimSpace(line)
		if trimmed == "" || strings.HasPrefix(trimmed, "#") {
			continue
		}
		if k, v, ok := strings.Cut(trimmed, "="); ok {
			// Support repeatable keys by joining with NUL.
			if k == "file" || k == "not_file" {
				if existing, exists := config[k]; exists {
					config[k] = existing + "\x00" + v
				} else {
					config[k] = v
				}
			} else {
				config[k] = v
			}
		}
	}
	goldenJSON = strings.TrimRight(body, "\n ") + "\n"
	if goldenJSON == "\n" {
		goldenJSON = ""
	}
	return
}

// updateGoldenTxtar rewrites the txtar file, keeping the config header and file entries,
// and replacing the golden JSON.
func updateGoldenTxtar(t *testing.T, path string, ar *txtar.Archive, gotJSON string) {
	t.Helper()
	comment := string(ar.Comment)
	header, _, _ := strings.Cut(comment, "\n\n")
	header = strings.TrimRight(header, "\n")
	ar.Comment = []byte(header + "\n\n" + gotJSON)
	if err := os.WriteFile(path, txtar.Format(ar), 0o644); err != nil {
		t.Fatal(err)
	}
	t.Logf("updated %s", path)
}

// buildTestSearchIndex builds a searchIndex from in-memory file trees.
// trees maps treeName -> {filePath -> content}.
func buildTestSearchIndex(t *testing.T, name string, trees map[string]map[string]string) *searchIndex {
	t.Helper()
	dir := t.TempDir()

	var metas []treeMeta
	for treeName, files := range trees {
		fsys := fstest.MapFS{}
		for path, content := range files {
			fsys[path] = &fstest.MapFile{Data: []byte(content)}
		}
		indexRelPath := filepath.Join("indexes", treeName+".csindex")
		indexFullPath := filepath.Join(dir, indexRelPath)
		if err := os.MkdirAll(filepath.Dir(indexFullPath), 0o777); err != nil {
			t.Fatal(err)
		}
		if err := BuildIndexFromFS(indexFullPath, fsys); err != nil {
			t.Fatalf("BuildIndexFromFS for tree %q: %v", treeName, err)
		}
		metas = append(metas, treeMeta{
			Name:      treeName,
			Version:   "v-" + treeName,
			IndexPath: indexRelPath,
		})
	}
	// Sort metas for determinism since map iteration is random.
	slices.SortFunc(metas, func(a, b treeMeta) int { return strings.Compare(a.Name, b.Name) })

	if err := writeIndexMeta(dir, metas); err != nil {
		t.Fatalf("writeIndexMeta: %v", err)
	}

	cfg := IndexConfig{
		Name: name,
		Path: dir,
	}
	return NewSearchIndex(cfg)
}
