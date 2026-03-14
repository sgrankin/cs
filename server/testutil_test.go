// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"testing"

	"golang.org/x/tools/txtar"

	"sgrankin.dev/cs"
)

// indexMeta is the JSON structure for meta.json, matching the unexported treeMeta in csbackend.go.
type indexMeta struct {
	Name, Version, IndexPath string
}

// testTree describes one tree (repo) to index from a txtar file.
type testTree struct {
	Name      string // repo name (e.g. "myrepo", "github.com/user/repo")
	Version   string // version string (e.g. "abc123")
	TxtarFile string // path relative to testdata/index/
}

// newTestIndex builds a real SearchIndex from txtar testdata files.
// Each testTree becomes a separate tree in the index.
func newTestIndex(t testing.TB, trees ...testTree) cs.SearchIndex {
	t.Helper()
	dir := t.TempDir()
	var metas []indexMeta
	for i, tree := range trees {
		ar, err := txtar.ParseFile(filepath.Join("testdata", "index", tree.TxtarFile))
		if err != nil {
			t.Fatal(err)
		}
		arFS, err := txtar.FS(ar)
		if err != nil {
			t.Fatal(err)
		}
		ixRel := filepath.Join("indexes", fmt.Sprintf("%d-%s", i, tree.Version))
		if err := os.MkdirAll(filepath.Join(dir, "indexes"), 0o777); err != nil {
			t.Fatal(err)
		}
		if err := cs.BuildIndexFromFS(filepath.Join(dir, ixRel), arFS); err != nil {
			t.Fatal(err)
		}
		metas = append(metas, indexMeta{tree.Name, tree.Version, ixRel})
	}
	f, err := os.Create(filepath.Join(dir, "meta.json"))
	if err != nil {
		t.Fatal(err)
	}
	if err := json.NewEncoder(f).Encode(metas); err != nil {
		t.Fatal(err)
	}
	f.Close()
	return cs.NewSearchIndex(cs.IndexConfig{Path: dir, Name: "test"})
}

func simpleIndex(t testing.TB) cs.SearchIndex {
	t.Helper()
	return newTestIndex(t, testTree{"myrepo", "abc123", "simple.txtar"})
}
