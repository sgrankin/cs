package cs

import (
	"context"
	"encoding/json"
	"os"
	"path/filepath"
	"slices"
	"sort"
	"testing"
	"testing/fstest"
	"time"

	"sgrankin.dev/cs/codesearch/index"
	"sgrankin.dev/cs/codesearch/regexp"
)

// newTestSearchIndex builds a searchIndex from in-memory file trees.
// Delegates to buildTestSearchIndex in search_test.go.
func newTestSearchIndex(t *testing.T, name string, trees map[string]map[string]string) *searchIndex {
	t.Helper()
	return buildTestSearchIndex(t, name, trees)
}

func TestSearchIndexName(t *testing.T) {
	si := newTestSearchIndex(t, "myindex", map[string]map[string]string{
		"repo1": {"hello.go": "package main\n"},
	})
	if got := si.Name(); got != "myindex" {
		t.Errorf("Name() = %q, want %q", got, "myindex")
	}
}

func TestSearchIndexNameDefaultsToBasePath(t *testing.T) {
	// When Name is empty, it defaults to filepath.Base(cfg.Path).
	dir := t.TempDir()
	// Write empty meta so NewSearchIndex can proceed.
	if err := writeIndexMeta(dir, nil); err != nil {
		t.Fatal(err)
	}
	cfg := IndexConfig{Path: dir}
	si := NewSearchIndex(cfg)
	want := filepath.Base(dir)
	if got := si.Name(); got != want {
		t.Errorf("Name() = %q, want %q", got, want)
	}
}

func TestSearchIndexInfo(t *testing.T) {
	si := newTestSearchIndex(t, "test", map[string]map[string]string{
		"alpha": {"a.txt": "alpha content"},
		"beta":  {"b.txt": "beta content"},
	})
	info := si.Info()
	if len(info.Trees) != 2 {
		t.Fatalf("Info().Trees has %d entries, want 2", len(info.Trees))
	}
	// Sort for deterministic comparison.
	sort.Slice(info.Trees, func(i, j int) bool { return info.Trees[i].Name < info.Trees[j].Name })

	if info.Trees[0].Name != "alpha" || info.Trees[0].Version != "v-alpha" {
		t.Errorf("Trees[0] = %+v, want {Name:alpha, Version:v-alpha}", info.Trees[0])
	}
	if info.Trees[1].Name != "beta" || info.Trees[1].Version != "v-beta" {
		t.Errorf("Trees[1] = %+v, want {Name:beta, Version:v-beta}", info.Trees[1])
	}
	if info.IndexTime.IsZero() {
		t.Error("IndexTime should not be zero")
	}
}

func TestSearchIndexPaths(t *testing.T) {
	si := newTestSearchIndex(t, "test", map[string]map[string]string{
		"repo": {
			"src/main.go": "package main\n",
			"src/util.go": "package main\n",
			"doc/readme":  "readme\n",
			"LICENSE":     "MIT\n",
		},
	})

	tests := []struct {
		name      string
		prefix    string
		wantPaths []string
	}{
		{
			name:      "prefix filters to src",
			prefix:    "src/",
			wantPaths: []string{"src/main.go", "src/util.go"},
		},
		{
			name:      "prefix filters to doc",
			prefix:    "doc/",
			wantPaths: []string{"doc/readme"},
		},
		{
			name:      "single char prefix",
			prefix:    "L",
			wantPaths: []string{"LICENSE"},
		},
		{
			name:      "prefix no match",
			prefix:    "nonexistent/",
			wantPaths: nil,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			files := si.Paths("repo", "v-repo", tt.prefix)
			var gotPaths []string
			for _, f := range files {
				gotPaths = append(gotPaths, f.Path)
			}
			sort.Strings(gotPaths)
			sort.Strings(tt.wantPaths)
			if !slices.Equal(gotPaths, tt.wantPaths) {
				t.Errorf("Paths(%q) paths = %v, want %v", tt.prefix, gotPaths, tt.wantPaths)
			}
			// Verify tree and version are set correctly.
			for _, f := range files {
				if f.Tree != "repo" {
					t.Errorf("file.Tree = %q, want %q", f.Tree, "repo")
				}
				if f.Version != "v-repo" {
					t.Errorf("file.Version = %q, want %q", f.Version, "v-repo")
				}
			}
		})
	}
}

func TestSearchIndexData(t *testing.T) {
	si := newTestSearchIndex(t, "test", map[string]map[string]string{
		"repo": {
			"hello.txt": "hello world\n",
			"empty.txt": "",
		},
	})

	tests := []struct {
		name string
		path string
		want string
	}{
		{"existing file", "hello.txt", "hello world\n"},
		{"empty file", "empty.txt", ""},
		{"nonexistent file", "nope.txt", ""},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := si.Data("repo", "v-repo", tt.path)
			if got != tt.want {
				t.Errorf("Data(%q) = %q, want %q", tt.path, got, tt.want)
			}
		})
	}
}

func TestSearchIndexSearchContextCancellation(t *testing.T) {
	si := newTestSearchIndex(t, "test", map[string]map[string]string{
		"repo": {"file.txt": "hello world\n"},
	})

	ctx, cancel := context.WithCancel(context.Background())
	cancel() // Cancel immediately.

	result, err := si.Search(ctx, Query{
		Line:       "hello",
		MaxMatches: 100,
	})
	if err != nil {
		t.Fatalf("Search with cancelled context should not error, got: %v", err)
	}
	// Liveness test: search must not hang or panic when context is already cancelled.
	// Result contents are timing-dependent.
	_ = result
}

func TestReadWriteIndexMeta(t *testing.T) {
	dir := t.TempDir()
	trees := []treeMeta{
		{Name: "alpha", Version: "v1", IndexPath: "indexes/alpha.csindex"},
		{Name: "beta", Version: "v2", IndexPath: "indexes/beta.csindex"},
	}
	if err := writeIndexMeta(dir, trees); err != nil {
		t.Fatalf("writeIndexMeta: %v", err)
	}

	meta, err := readIndexMeta(dir)
	if err != nil {
		t.Fatalf("readIndexMeta: %v", err)
	}

	if len(meta.Trees) != 2 {
		t.Fatalf("got %d trees, want 2", len(meta.Trees))
	}
	// Sort for deterministic comparison.
	sort.Slice(meta.Trees, func(i, j int) bool { return meta.Trees[i].Name < meta.Trees[j].Name })
	if meta.Trees[0] != trees[0] {
		t.Errorf("Trees[0] = %+v, want %+v", meta.Trees[0], trees[0])
	}
	if meta.Trees[1] != trees[1] {
		t.Errorf("Trees[1] = %+v, want %+v", meta.Trees[1], trees[1])
	}
	if meta.ModTime.IsZero() {
		t.Error("ModTime should be set from file stat")
	}
}

func TestReadIndexMetaNotExist(t *testing.T) {
	dir := t.TempDir()
	// No meta.json exists yet.
	meta, err := readIndexMeta(dir)
	if err != nil {
		t.Fatalf("readIndexMeta on missing file: %v", err)
	}
	if len(meta.Trees) != 0 {
		t.Errorf("expected 0 trees, got %d", len(meta.Trees))
	}
	if !meta.ModTime.IsZero() {
		t.Errorf("expected zero ModTime for missing meta, got %v", meta.ModTime)
	}
}

func TestReadIndexMetaInvalidJSON(t *testing.T) {
	dir := t.TempDir()
	if err := os.WriteFile(filepath.Join(dir, "meta.json"), []byte("not json{{{"), 0o644); err != nil {
		t.Fatal(err)
	}
	_, err := readIndexMeta(dir)
	if err == nil {
		t.Error("expected error for invalid JSON, got nil")
	}
}

func TestWriteIndexMetaRoundTrip(t *testing.T) {
	dir := t.TempDir()
	trees := []treeMeta{
		{Name: "repo1", Version: "abc123", IndexPath: "indexes/abc123.csindex"},
	}
	if err := writeIndexMeta(dir, trees); err != nil {
		t.Fatal(err)
	}

	// Read the raw file to verify JSON structure.
	data, err := os.ReadFile(filepath.Join(dir, "meta.json"))
	if err != nil {
		t.Fatal(err)
	}
	var decoded []treeMeta
	if err := json.Unmarshal(data, &decoded); err != nil {
		t.Fatalf("meta.json is not valid JSON: %v", err)
	}
	if len(decoded) != 1 || decoded[0].Name != "repo1" {
		t.Errorf("unexpected decoded content: %+v", decoded)
	}
}

func TestSearchIndexReload(t *testing.T) {
	dir := t.TempDir()

	// Build initial index with one tree.
	fsys1 := fstest.MapFS{
		"file.txt": {Data: []byte("initial content\n")},
	}
	indexPath1 := filepath.Join("indexes", "v1.csindex")
	if err := os.MkdirAll(filepath.Join(dir, "indexes"), 0o777); err != nil {
		t.Fatal(err)
	}
	if err := BuildIndexFromFS(filepath.Join(dir, indexPath1), fsys1); err != nil {
		t.Fatal(err)
	}
	if err := writeIndexMeta(dir, []treeMeta{
		{Name: "repo", Version: "v1", IndexPath: indexPath1},
	}); err != nil {
		t.Fatal(err)
	}

	cfg := IndexConfig{Name: "reloadtest", Path: dir}
	si := NewSearchIndex(cfg)

	info := si.Info()
	if len(info.Trees) != 1 || info.Trees[0].Version != "v1" {
		t.Fatalf("initial info: %+v", info)
	}

	// Reload with same meta should be a no-op.
	si.Reload()
	info = si.Info()
	if len(info.Trees) != 1 || info.Trees[0].Version != "v1" {
		t.Fatalf("after no-op reload: %+v", info)
	}

	// Wait a moment so the file modification time differs.
	time.Sleep(50 * time.Millisecond)

	// Build a new index and update meta.
	fsys2 := fstest.MapFS{
		"file.txt": {Data: []byte("updated content\n")},
		"new.txt":  {Data: []byte("brand new\n")},
	}
	indexPath2 := filepath.Join("indexes", "v2.csindex")
	if err := BuildIndexFromFS(filepath.Join(dir, indexPath2), fsys2); err != nil {
		t.Fatal(err)
	}
	if err := writeIndexMeta(dir, []treeMeta{
		{Name: "repo", Version: "v2", IndexPath: indexPath2},
	}); err != nil {
		t.Fatal(err)
	}

	si.Reload()
	info = si.Info()
	if len(info.Trees) != 1 {
		t.Fatalf("after reload: expected 1 tree, got %d", len(info.Trees))
	}
	if info.Trees[0].Version != "v2" {
		t.Errorf("after reload: version = %q, want %q", info.Trees[0].Version, "v2")
	}

	// Verify the new data is accessible.
	data := si.Data("repo", "v2", "new.txt")
	if data != "brand new\n" {
		t.Errorf("Data after reload = %q, want %q", data, "brand new\n")
	}
}

func TestIndexSearcherNilPaths(t *testing.T) {
	var s *indexSearcher
	paths := s.Paths("anything")
	if paths != nil {
		t.Errorf("nil indexSearcher.Paths() = %v, want nil", paths)
	}
}

func TestIndexSearcherNilData(t *testing.T) {
	var s *indexSearcher
	data := s.Data("anything")
	if data != "" {
		t.Errorf("nil indexSearcher.Data() = %q, want empty", data)
	}
}

func TestIndexSearcherSearchFilesEarlyBreak(t *testing.T) {
	// Directly test that SearchFiles iter handles consumer breaking early.
	dir := t.TempDir()
	fsys := fstest.MapFS{
		"a.txt": {Data: []byte("match line\n")},
		"b.txt": {Data: []byte("match line\n")},
		"c.txt": {Data: []byte("match line\n")},
	}
	indexPath := filepath.Join(dir, "test.csindex")
	if err := BuildIndexFromFS(indexPath, fsys); err != nil {
		t.Fatal(err)
	}
	ix := index.Open(indexPath)
	searcher := newIndexSearcher(ix, "testrepo", "v1")

	re, err := regexp.Compile("match", 0)
	if err != nil {
		t.Fatal(err)
	}

	// Consume only the first result, then break.
	count := 0
	for f := range searcher.SearchFiles(context.Background(), re, nil, 0, 100) {
		result := f()
		if result != nil {
			count++
		}
		if count >= 1 {
			break
		}
	}
	if count < 1 {
		t.Error("expected at least 1 result before break")
	}
}

func TestSearchIndexInfoEmptyIndex(t *testing.T) {
	dir := t.TempDir()
	cfg := IndexConfig{Name: "empty", Path: dir}
	si := NewSearchIndex(cfg)
	info := si.Info()
	if len(info.Trees) != 0 {
		t.Errorf("empty index should have 0 trees, got %d", len(info.Trees))
	}
}
