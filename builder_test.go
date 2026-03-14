// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package cs

import (
	"errors"
	"io/fs"
	"path/filepath"
	"testing"
	"testing/fstest"
	"time"

	"sgrankin.dev/cs/codesearch/index"
)

func TestBuildIndexFromFS(t *testing.T) {
	files := map[string]string{
		"hello.go":    "package main\n\nfunc main() {}\n",
		"lib/util.go": "package lib\n\nfunc Util() {}\n",
		"README":      "This is a readme.\n",
	}

	fsys := fstest.MapFS{}
	for name, content := range files {
		fsys[name] = &fstest.MapFile{Data: []byte(content)}
	}

	dir := t.TempDir()
	ixPath := filepath.Join(dir, "test.idx")

	if err := BuildIndexFromFS(ixPath, fsys); err != nil {
		t.Fatalf("BuildIndexFromFS failed: %v", err)
	}

	// Verify the index can be opened and contains the expected files.
	ix := index.Open(ixPath)
	for name, wantContent := range files {
		data := ix.DataAtName(name)
		if string(data) != wantContent {
			t.Errorf("DataAtName(%q) = %q, want %q", name, data, wantContent)
		}
	}
}

func TestBuildIndexFromFSEmpty(t *testing.T) {
	fsys := fstest.MapFS{}
	dir := t.TempDir()
	ixPath := filepath.Join(dir, "empty.idx")

	if err := BuildIndexFromFS(ixPath, fsys); err != nil {
		t.Fatalf("BuildIndexFromFS failed on empty FS: %v", err)
	}

	ix := index.Open(ixPath)
	names := ix.Names(nil)
	if len(names) != 0 {
		t.Errorf("expected 0 names, got %d", len(names))
	}
}

func TestBuildIndexFromFSWithSubdirectories(t *testing.T) {
	fsys := fstest.MapFS{
		"a/b/c.txt": {Data: []byte("deeply nested\n")},
		"top.txt":   {Data: []byte("top level\n")},
	}

	dir := t.TempDir()
	ixPath := filepath.Join(dir, "nested.idx")

	if err := BuildIndexFromFS(ixPath, fsys); err != nil {
		t.Fatalf("BuildIndexFromFS failed: %v", err)
	}

	ix := index.Open(ixPath)
	data := ix.DataAtName("a/b/c.txt")
	if string(data) != "deeply nested\n" {
		t.Errorf("DataAtName(a/b/c.txt) = %q, want %q", data, "deeply nested\n")
	}
}

// errorFS wraps an fs.FS and injects an error when opening a specific file.
type errorFS struct {
	fs.FS
	failOn string
}

func (e *errorFS) Open(name string) (fs.File, error) {
	if name == e.failOn {
		return nil, errors.New("injected open error")
	}
	return e.FS.Open(name)
}

func TestBuildIndexFromFSOpenError(t *testing.T) {
	base := fstest.MapFS{
		"good.txt": {Data: []byte("good content\n")},
		"bad.txt":  {Data: []byte("bad content\n")},
	}
	fsys := &errorFS{FS: base, failOn: "bad.txt"}

	dir := t.TempDir()
	ixPath := filepath.Join(dir, "err.idx")

	err := BuildIndexFromFS(ixPath, fsys)
	if err == nil {
		t.Fatal("expected error when file Open fails, got nil")
	}
}

// errorDirFS wraps an fs.FS and injects an error when reading a specific directory.
type errorDirFS struct {
	fs.FS
	failDir string
}

func (e *errorDirFS) Open(name string) (fs.File, error) {
	if name == e.failDir {
		return &errorDir{name: e.failDir}, nil
	}
	return e.FS.Open(name)
}

type errorDir struct{ name string }

func (d *errorDir) Stat() (fs.FileInfo, error) {
	return &dirInfo{name: d.name}, nil
}
func (d *errorDir) Read([]byte) (int, error) { return 0, errors.New("not a file") }
func (d *errorDir) Close() error             { return nil }
func (d *errorDir) ReadDir(int) ([]fs.DirEntry, error) {
	return nil, errors.New("injected readdir error")
}

type dirInfo struct{ name string }

func (d *dirInfo) Name() string           { return d.name }
func (d *dirInfo) Size() int64            { return 0 }
func (d *dirInfo) Mode() fs.FileMode      { return fs.ModeDir | 0o755 }
func (d *dirInfo) IsDir() bool            { return true }
func (d *dirInfo) Sys() any               { return nil }
func (d *dirInfo) ModTime() (t time.Time) { return }

func TestBuildIndexFromFSWalkError(t *testing.T) {
	base := fstest.MapFS{
		"subdir/file.txt": {Data: []byte("content\n")},
	}
	fsys := &errorDirFS{FS: base, failDir: "subdir"}

	dir := t.TempDir()
	ixPath := filepath.Join(dir, "walkerr.idx")

	err := BuildIndexFromFS(ixPath, fsys)
	if err == nil {
		t.Fatal("expected error from WalkDir failure, got nil")
	}
}
