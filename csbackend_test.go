// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package cs

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"slices"
	"sort"
	"sync"
	"testing"
	"testing/fstest"
	"time"

	"github.com/go-git/go-git/v5"
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

// TestSearchOrderingManyRepos creates many repos with many matching files and
// verifies that results are deterministically ordered: sorted by repo name,
// then by file path within each repo. This exercises the priority work queue
// under concurrent load — the old channel+semaphore approach would deadlock here.
func TestSearchOrderingManyRepos(t *testing.T) {
	// Build 10 repos, each with 20 files containing "target".
	trees := map[string]map[string]string{}
	repoNames := []string{"zulu", "alpha", "november", "echo", "hotel", "bravo", "mike", "delta", "golf", "foxtrot"}
	for _, repo := range repoNames {
		files := map[string]string{}
		for j := range 20 {
			name := fmt.Sprintf("file%03d.txt", j)
			files[name] = fmt.Sprintf("line with target %s-%d\n", repo, j)
		}
		trees[repo] = files
	}
	si := newTestSearchIndex(t, "ordering", trees)

	result, err := si.Search(context.Background(), Query{
		Line:       "target",
		MaxMatches: 1000,
	})
	if err != nil {
		t.Fatalf("Search: %v", err)
	}

	// Extract (tree, path) pairs and compare against expected ordering.
	type tp struct{ Tree, Path string }
	var got []tp
	for _, r := range result.Results {
		got = append(got, tp{r.File.Tree, r.File.Path})
	}

	sort.Strings(repoNames)
	var want []tp
	for _, repo := range repoNames {
		for j := range 20 {
			want = append(want, tp{repo, fmt.Sprintf("file%03d.txt", j)})
		}
	}

	if !slices.Equal(got, want) {
		t.Errorf("result ordering mismatch:\ngot  (len %d): %v\nwant (len %d): %v", len(got), got[:min(5, len(got))], len(want), want[:5])
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
	for f := range searcher.SearchFiles(context.Background(), re, acceptAllFilter{}, 0, 100) {
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

func TestSearchQueuePriority(t *testing.T) {
	q := newSearchQueue()
	var order []string
	var mu sync.Mutex
	record := func(s string) { mu.Lock(); order = append(order, s); mu.Unlock() }

	// Push low, then high — high should execute first.
	q.pushLow(func() { record("low1") })
	q.pushLow(func() { record("low2") })
	q.pushHigh(func() { record("high1") })
	q.pushHigh(func() { record("high2") })

	// Drain all 4 tasks on a single goroutine (deterministic).
	for range 4 {
		fn, ok := q.pop()
		if !ok {
			t.Fatal("unexpected closed queue")
		}
		fn()
	}

	want := []string{"high1", "high2", "low1", "low2"}
	if !slices.Equal(order, want) {
		t.Errorf("execution order = %v, want %v", order, want)
	}

	// Close and verify pop returns false.
	q.close()
	_, ok := q.pop()
	if ok {
		t.Error("pop after close should return false")
	}
}

func TestSearchQueueCloseUnblocks(t *testing.T) {
	q := newSearchQueue()

	// Start a worker blocked on empty queue; close should unblock it.
	done := make(chan struct{})
	go func() {
		defer close(done)
		for {
			_, ok := q.pop()
			if !ok {
				return
			}
		}
	}()

	q.close()
	select {
	case <-done:
	case <-time.After(time.Second):
		t.Error("worker did not unblock after close")
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

func TestPathFacetValue(t *testing.T) {
	tests := []struct {
		name   string
		path   string
		active []string
		want   string
	}{
		{"top-level dir", "src/main.go", nil, "src/"},
		{"nested file no filter", "a/b/c.go", nil, "a/"},
		{"root file", "main.go", nil, ""},
		{"one level deeper", "src/clj/core.clj", []string{"src/"}, "src/clj/"},
		{"two levels deeper", "src/clj/core/main.clj", []string{"src/", "src/clj/"}, "src/clj/core/"},
		{"file at filter level", "src/main.go", []string{"src/"}, ""},
		{"deepest filter wins", "a/b/c/d.go", []string{"a/", "a/b/"}, "a/b/c/"},
		{"non-matching filter ignored", "lib/util.go", []string{"src/"}, "lib/"},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := pathFacetValue(tc.path, tc.active)
			if got != tc.want {
				t.Errorf("pathFacetValue(%q, %v) = %q, want %q", tc.path, tc.active, got, tc.want)
			}
		})
	}
}

func TestBuildSearchIndex(t *testing.T) {
	t.Run("fresh build", func(t *testing.T) {
		remoteDir := initBareRemote(t) // has hello.txt with "hello\n"
		indexDir := filepath.Join(t.TempDir(), "index")

		cfg := IndexConfig{
			Name: "test-index",
			Path: indexDir,
			Repos: []RepoConfig{{
				Name:      "test/repo",
				RemoteURL: remoteDir,
				RemoteRef: "refs/heads/master",
			}},
		}

		if err := BuildSearchIndex(cfg, ""); err != nil {
			t.Fatalf("BuildSearchIndex: %v", err)
		}

		// Verify NewSearchIndex can load the result.
		si := NewSearchIndex(cfg)
		info := si.Info()
		if len(info.Trees) != 1 {
			t.Fatalf("expected 1 tree, got %d", len(info.Trees))
		}
		if info.Trees[0].Name != "test/repo" {
			t.Errorf("tree name = %q, want %q", info.Trees[0].Name, "test/repo")
		}

		// Verify search finds content from the repo.
		result, err := si.Search(context.Background(), Query{
			Line:       "hello",
			MaxMatches: 100,
		})
		if err != nil {
			t.Fatalf("Search: %v", err)
		}
		if len(result.Results) == 0 {
			t.Error("expected search results for 'hello', got none")
		}
	})

	t.Run("no-op when unchanged", func(t *testing.T) {
		remoteDir := initBareRemote(t)
		indexDir := filepath.Join(t.TempDir(), "index")

		cfg := IndexConfig{
			Name: "test-index",
			Path: indexDir,
			Repos: []RepoConfig{{
				Name:      "test/repo",
				RemoteURL: remoteDir,
				RemoteRef: "refs/heads/master",
			}},
		}

		if err := BuildSearchIndex(cfg, ""); err != nil {
			t.Fatalf("first BuildSearchIndex: %v", err)
		}

		// Record index files after first build.
		indexesDir := filepath.Join(indexDir, "indexes")
		entries1, err := os.ReadDir(indexesDir)
		if err != nil {
			t.Fatalf("ReadDir indexes: %v", err)
		}

		// Second call should detect no changes and return early.
		if err := BuildSearchIndex(cfg, ""); err != nil {
			t.Fatalf("second BuildSearchIndex: %v", err)
		}

		// Verify index files are unchanged (same count, same names).
		entries2, err := os.ReadDir(indexesDir)
		if err != nil {
			t.Fatalf("ReadDir indexes after second build: %v", err)
		}
		if len(entries1) != len(entries2) {
			t.Fatalf("index file count changed: %d -> %d", len(entries1), len(entries2))
		}
		for i := range entries1 {
			if entries1[i].Name() != entries2[i].Name() {
				t.Errorf("index file changed: %q -> %q", entries1[i].Name(), entries2[i].Name())
			}
		}
	})

	t.Run("updates changed repo and cleans old indexes", func(t *testing.T) {
		remoteDir := initBareRemote(t) // has hello.txt
		indexDir := filepath.Join(t.TempDir(), "index")

		cfg := IndexConfig{
			Name: "test-index",
			Path: indexDir,
			Repos: []RepoConfig{{
				Name:      "test/repo",
				RemoteURL: remoteDir,
				RemoteRef: "refs/heads/master",
			}},
		}

		// First build.
		if err := BuildSearchIndex(cfg, ""); err != nil {
			t.Fatalf("first BuildSearchIndex: %v", err)
		}

		// Record the initial index files.
		indexesDir := filepath.Join(indexDir, "indexes")
		oldEntries, err := os.ReadDir(indexesDir)
		if err != nil {
			t.Fatalf("ReadDir indexes: %v", err)
		}
		if len(oldEntries) != 1 {
			t.Fatalf("expected 1 index file after first build, got %d", len(oldEntries))
		}
		oldIndexName := oldEntries[0].Name()

		// Record the first version.
		si1 := NewSearchIndex(cfg)
		info1 := si1.Info()
		version1 := info1.Trees[0].Version

		// Add a new commit to the remote.
		addCommitToRemote(t, remoteDir, map[string]string{
			"newfile.txt": "new content here\n",
		})

		// Second build should detect the change and rebuild.
		if err := BuildSearchIndex(cfg, ""); err != nil {
			t.Fatalf("second BuildSearchIndex: %v", err)
		}

		// Load the updated index and verify the version changed.
		si2 := NewSearchIndex(cfg)
		info2 := si2.Info()
		if len(info2.Trees) != 1 {
			t.Fatalf("expected 1 tree after rebuild, got %d", len(info2.Trees))
		}
		version2 := info2.Trees[0].Version
		if version1 == version2 {
			t.Error("version should have changed after adding a commit")
		}

		// Verify the new content is searchable.
		result, err := si2.Search(context.Background(), Query{
			Line:       "new content",
			MaxMatches: 100,
		})
		if err != nil {
			t.Fatalf("Search: %v", err)
		}
		if len(result.Results) == 0 {
			t.Error("expected search results for 'new content', got none")
		}

		// Verify old index file was cleaned up and only the new one remains.
		newEntries, err := os.ReadDir(indexesDir)
		if err != nil {
			t.Fatalf("ReadDir indexes after rebuild: %v", err)
		}
		if len(newEntries) != 1 {
			t.Fatalf("expected 1 index file after rebuild, got %d", len(newEntries))
		}
		newIndexName := newEntries[0].Name()
		if oldIndexName == newIndexName {
			t.Error("index file name should have changed after rebuild")
		}
	})

	t.Run("empty version skipped", func(t *testing.T) {
		// Create an empty bare repo (no commits).
		emptyDir := filepath.Join(t.TempDir(), "empty-remote")
		if _, err := git.PlainInit(emptyDir, false); err != nil {
			t.Fatalf("PlainInit: %v", err)
		}

		indexDir := filepath.Join(t.TempDir(), "index")
		cfg := IndexConfig{
			Name: "test-index",
			Path: indexDir,
			Repos: []RepoConfig{{
				Name:      "test/empty-repo",
				RemoteURL: emptyDir,
				RemoteRef: "refs/heads/master",
			}},
		}

		// Should not error.
		if err := BuildSearchIndex(cfg, ""); err != nil {
			t.Fatalf("BuildSearchIndex with empty repo: %v", err)
		}

		// Verify meta.json exists but has no trees (empty version repos are skipped).
		meta, err := readIndexMeta(indexDir)
		if err != nil {
			t.Fatalf("readIndexMeta: %v", err)
		}
		if len(meta.Trees) != 0 {
			t.Errorf("expected 0 trees for empty repo, got %d", len(meta.Trees))
		}

		// Verify no index files were created.
		indexesDir := filepath.Join(indexDir, "indexes")
		entries, err := os.ReadDir(indexesDir)
		if err != nil && !errors.Is(err, fs.ErrNotExist) {
			t.Fatalf("ReadDir indexes: %v", err)
		}
		if len(entries) > 0 {
			t.Errorf("expected no index files, got %d", len(entries))
		}
	})
}
