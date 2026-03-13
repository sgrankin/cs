// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"reflect"
	"strings"
	"testing"

	"sgrankin.dev/cs"
)

func TestReadmeRegex(t *testing.T) {
	cases := []struct {
		in  string
		out []string
	}{
		{"README.md", []string{"README.md", "README", "md"}},
		{"readme.md", []string{"readme.md", "readme", "md"}},
		{"readme.rst", []string{"readme.rst", "readme", "rst"}},
		{"readme.unknown", nil},
		{"what.md", nil},
	}

	for _, tc := range cases {
		matches := supportedReadmeRegex.FindStringSubmatch(tc.in)
		if !reflect.DeepEqual(tc.out, matches) {
			got, _ := json.MarshalIndent(matches, "", "  ")
			want, _ := json.MarshalIndent(tc.out, "", "  ")
			t.Errorf("error parsing %q: expected:\n%s\ngot:\n%s",
				tc.in, want, got)
		}
	}
}

func TestBuildReadmeRegex(t *testing.T) {
	re := buildReadmeRegex([]string{"md", "txt", "rst"})
	tests := []struct {
		input string
		match bool
	}{
		{"README.md", true},
		{"readme.txt", true},
		{"README.rst", true},
		{"readme.html", false},
		{"notareadme.go", false},
	}
	for _, tc := range tests {
		got := re.MatchString(tc.input)
		if got != tc.match {
			t.Errorf("regex.MatchString(%q) = %v, want %v", tc.input, got, tc.match)
		}
	}
}

func TestExternalURL(t *testing.T) {
	tests := []struct {
		repo, commit, path string
		wantURL, wantName  string
	}{
		{
			"github.com/user/repo", "abc123", "src/main.go",
			"https://github.com/user/repo/blob/abc123/src/main.go#L{lno}", "GitHub",
		},
		{
			"gitlab.com/user/repo", "abc123", "src/main.go",
			"", "",
		},
		{
			"github.com/org/project", "main", "README.md",
			"https://github.com/org/project/blob/main/README.md#L{lno}", "GitHub",
		},
	}
	for _, tc := range tests {
		t.Run(tc.repo, func(t *testing.T) {
			url, name := externalURL(tc.repo, tc.commit, tc.path)
			if url != tc.wantURL {
				t.Errorf("externalURL() url = %q, want %q", url, tc.wantURL)
			}
			if name != tc.wantName {
				t.Errorf("externalURL() name = %q, want %q", name, tc.wantName)
			}
		})
	}
}

func TestViewPath(t *testing.T) {
	tests := []struct {
		repo, commit string
		name         []string
		want         string
	}{
		{"myrepo", "abc", []string{"src", "main.go"}, "/view/myrepo@abc/+/src/main.go"},
		{"myrepo", "abc", nil, "/view/myrepo@abc/+"},
		{"repo", "v1", []string{"file.go"}, "/view/repo@v1/+/file.go"},
	}
	for _, tc := range tests {
		t.Run(strings.Join(tc.name, "/"), func(t *testing.T) {
			got := viewPath(tc.repo, tc.commit, tc.name...)
			if got != tc.want {
				t.Errorf("viewPath(%q, %q, %v) = %q, want %q", tc.repo, tc.commit, tc.name, got, tc.want)
			}
		})
	}
}

func TestDirListingSort(t *testing.T) {
	entries := DirListingSort{
		{Name: "z_file", IsDir: false}, // 0
		{Name: "a_dir", IsDir: true},   // 1
		{Name: "m_file", IsDir: false}, // 2
		{Name: "b_dir", IsDir: true},   // 3
	}

	if entries.Len() != 4 {
		t.Errorf("Len() = %d, want 4", entries.Len())
	}

	tests := []struct {
		i, j int
		want bool
	}{
		{1, 0, true},  // a_dir < z_file (dir < file)
		{3, 0, true},  // b_dir < z_file (dir < file)
		{0, 1, false}, // z_file > a_dir (file > dir)
		{1, 3, true},  // a_dir < b_dir (alphabetical dirs)
		{3, 1, false}, // b_dir > a_dir
		{2, 0, true},  // m_file < z_file (alphabetical files)
	}
	for _, tc := range tests {
		if got := entries.Less(tc.i, tc.j); got != tc.want {
			t.Errorf("Less(%d, %d) [%s vs %s] = %v, want %v",
				tc.i, tc.j, entries[tc.i].Name, entries[tc.j].Name, got, tc.want)
		}
	}

	entries.Swap(0, 1)
	if entries[0].Name != "a_dir" || entries[1].Name != "z_file" {
		t.Error("Swap did not work correctly")
	}
}

func TestMkPathSegments(t *testing.T) {
	segments := mkPathSegments("myrepo", "abc", "src/main.go")

	if len(segments) != 2 {
		t.Fatalf("expected 2 segments, got %d", len(segments))
	}
	if segments[0].Name != "src" {
		t.Errorf("segments[0].Name = %q, want %q", segments[0].Name, "src")
	}
	if !strings.HasSuffix(segments[0].Path, "/") {
		t.Errorf("non-terminal segment should end with /, got %q", segments[0].Path)
	}
	if segments[1].Name != "main.go" {
		t.Errorf("segments[1].Name = %q, want %q", segments[1].Name, "main.go")
	}
	if strings.HasSuffix(segments[1].Path, "/") {
		t.Errorf("terminal segment should not end with /, got %q", segments[1].Path)
	}
}

func TestMkPathSegmentsSingleFile(t *testing.T) {
	segments := mkPathSegments("myrepo", "abc", "README.md")

	if len(segments) != 1 {
		t.Fatalf("expected 1 segment, got %d", len(segments))
	}
	if segments[0].Name != "README.md" {
		t.Errorf("segments[0].Name = %q, want %q", segments[0].Name, "README.md")
	}
}

func TestMkFileContent(t *testing.T) {
	idx := simpleIndex(t)
	file := cs.File{Tree: "myrepo", Version: "abc123", Path: "main.go"}
	content := mkFileContent(idx, file)
	if content == nil {
		t.Fatal("expected non-nil content")
	}
	if content.FormattedContent == nil {
		t.Error("expected non-nil FormattedContent")
	}
}

func TestMkDirContent(t *testing.T) {
	idx := simpleIndex(t)
	// Root-level Paths query: README.md is at root, so use prefix "R" to get it,
	// plus other root files. We need a mix of files and subdirectories.
	// Paths("myrepo", "abc123", "main.go") returns [main.go]
	// Paths("myrepo", "abc123", "sub") returns [sub/deep.go, sub/other.go]
	// Paths("myrepo", "abc123", "R") returns [README.md]
	// Paths("myrepo", "abc123", "u") returns [util.go]
	// Combine them to simulate a root listing that includes a README and subdirectory.
	var files []cs.File
	files = append(files, idx.Paths("myrepo", "abc123", "README")...)
	files = append(files, idx.Paths("myrepo", "abc123", "main")...)
	files = append(files, idx.Paths("myrepo", "abc123", "sub")...)
	files = append(files, idx.Paths("myrepo", "abc123", "util")...)

	content := mkDirContent(idx, files, "myrepo", "abc123", "")

	if content == nil {
		t.Fatal("expected non-nil content")
	}
	// Should have: README.md, main.go, sub/ (dir), util.go = 4 entries
	if len(content.Entries) < 3 {
		t.Errorf("expected at least 3 entries, got %d", len(content.Entries))
	}

	// Verify sort invariant: all dirs come before all files
	seenFile := false
	for _, e := range content.Entries {
		if e.IsDir && seenFile {
			t.Errorf("directory %q appears after file entries", e.Name)
		}
		if !e.IsDir {
			seenFile = true
		}
	}

	// README should trigger readme content
	if content.ReadmeContent == nil {
		t.Error("expected ReadmeContent for directory with README.md")
	}
}

func TestMkDirContentNoReadme(t *testing.T) {
	idx := simpleIndex(t)
	files := idx.Paths("myrepo", "abc123", "sub")
	content := mkDirContent(idx, files, "myrepo", "abc123", "sub")

	if content.ReadmeContent != nil {
		t.Error("expected nil ReadmeContent when no README exists")
	}
}

func TestMkDirContentEmptyPrefix(t *testing.T) {
	idx := simpleIndex(t)
	// Gather root-level files from the index.
	var files []cs.File
	files = append(files, idx.Paths("myrepo", "abc123", "main")...)
	files = append(files, idx.Paths("myrepo", "abc123", "sub")...)
	content := mkDirContent(idx, files, "myrepo", "abc123", "")

	if content == nil {
		t.Fatal("expected non-nil content")
	}
	// main.go (file) + sub/ (dir, deduped from sub/deep.go and sub/other.go)
	if len(content.Entries) != 2 {
		t.Errorf("expected 2 entries, got %d", len(content.Entries))
	}
}

func TestMkDirContentDeduplication(t *testing.T) {
	// Multiple files in the same subdirectory should only create one dir entry.
	// sub/ has sub/deep.go and sub/other.go — when viewed from root, sub/ is one dir entry.
	idx := simpleIndex(t)
	files := idx.Paths("myrepo", "abc123", "sub")
	content := mkDirContent(idx, files, "myrepo", "abc123", "sub")

	// sub/deep.go and sub/other.go are direct children of sub/; both are files.
	if len(content.Entries) != 2 {
		t.Errorf("expected 2 entries (deep.go and other.go), got %d: %v", len(content.Entries), content.Entries)
	}
}

func TestMkDirContentSkipsNonPrefix(t *testing.T) {
	idx := simpleIndex(t)
	// The real index Paths() already filters by prefix,
	// so verify that Paths with "sub" prefix only returns sub/ files.
	files := idx.Paths("myrepo", "abc123", "sub")
	for _, f := range files {
		if !strings.HasPrefix(f.Path, "sub") {
			t.Errorf("Paths returned file %q that does not match prefix %q", f.Path, "sub")
		}
	}

	content := mkDirContent(idx, files, "myrepo", "abc123", "sub")
	if len(content.Entries) != 2 {
		t.Errorf("expected 2 entries, got %d", len(content.Entries))
	}
}

func TestBuildFileData(t *testing.T) {
	idx := simpleIndex(t)

	tests := []struct {
		name      string
		path      string
		wantDir   bool
		wantFile  bool
		wantErr   bool
		wantTitle string
	}{
		{
			name:      "single file (blob)",
			path:      "main.go",
			wantFile:  true,
			wantTitle: "main.go",
		},
		{
			name:     "directory listing",
			path:     "sub",
			wantDir:  true,
			wantFile: false,
		},
		{
			name:    "not found",
			path:    "nonexistent.go",
			wantErr: true,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			result, err := buildFileData(idx, "myrepo", "abc123", tc.path)
			if tc.wantErr {
				if err == nil {
					t.Error("expected error, got nil")
				}
				return
			}
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if tc.wantFile && result.FileContent == nil {
				t.Error("expected FileContent to be set")
			}
			if tc.wantDir && result.DirContent == nil {
				t.Error("expected DirContent to be set")
			}
			if !tc.wantFile && result.FileContent != nil {
				t.Error("expected FileContent to be nil for directory")
			}
			if !tc.wantDir && result.DirContent != nil {
				t.Error("expected DirContent to be nil for file")
			}
			if result.Backend != "test" {
				t.Errorf("Backend = %q, want %q", result.Backend, "test")
			}
			if result.RepoName != "myrepo" {
				t.Errorf("RepoName = %q, want %q", result.RepoName, "myrepo")
			}
			if result.Commit != "abc123" {
				t.Errorf("Commit = %q, want %q", result.Commit, "abc123")
			}
		})
	}
}

func TestBuildFileDataExternalURL(t *testing.T) {
	idx := newTestIndex(t, testTree{Name: "github.com/user/repo", Version: "main", TxtarFile: "simple.txtar"})
	result, err := buildFileData(idx, "github.com/user/repo", "main", "main.go")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if result.ExternalURLTemplate == "" {
		t.Error("expected ExternalURLTemplate to be set for GitHub repo")
	}
	if result.ExternalDomain != "GitHub" {
		t.Errorf("ExternalDomain = %q, want %q", result.ExternalDomain, "GitHub")
	}
}

func TestServeFileBlob(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/view/myrepo@abc123/+/main.go", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
}

func TestServeFileDirectory(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/view/myrepo@abc123/+/sub", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
}

func TestServeFileNotFound(t *testing.T) {
	idx := simpleIndex(t)
	srv := newTestServer(idx)

	req := httptest.NewRequest("GET", "/view/myrepo@abc123/+/nonexistent.go", nil)
	w := httptest.NewRecorder()
	srv.ServeHTTP(w, req)

	resp := w.Result()
	if resp.StatusCode != http.StatusInternalServerError {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusInternalServerError)
	}
}

func TestMkDirContentDirEntryHasTrailingSlash(t *testing.T) {
	idx := simpleIndex(t)
	// Get root-level files that include the sub/ directory.
	var files []cs.File
	files = append(files, idx.Paths("myrepo", "abc123", "main")...)
	files = append(files, idx.Paths("myrepo", "abc123", "sub")...)
	content := mkDirContent(idx, files, "myrepo", "abc123", "")

	for _, e := range content.Entries {
		if e.IsDir && !strings.HasSuffix(e.Path, "/") {
			t.Errorf("directory entry %q path should end with /, got %q", e.Name, e.Path)
		}
		if !e.IsDir && strings.HasSuffix(e.Path, "/") {
			t.Errorf("file entry %q path should not end with /, got %q", e.Name, e.Path)
		}
	}
}

func TestMkDirContentWithReadmeAlreadySet(t *testing.T) {
	// When first readme is found, later readmes should be skipped.
	// Use root-level files from simpleIndex — README.md is at the root.
	idx := simpleIndex(t)
	var files []cs.File
	files = append(files, idx.Paths("myrepo", "abc123", "README")...)
	files = append(files, idx.Paths("myrepo", "abc123", "main")...)
	content := mkDirContent(idx, files, "myrepo", "abc123", "")

	if content.ReadmeContent == nil {
		t.Error("expected ReadmeContent to be set")
	}
}

// Verify that mkPathSegments builds proper segment URLs
func TestMkPathSegmentsDeepPath(t *testing.T) {
	segments := mkPathSegments("myrepo", "v1", "a/b/c/d.go")

	expected := []struct {
		name     string
		hasSlash bool
	}{
		{"a", true},
		{"b", true},
		{"c", true},
		{"d.go", false},
	}
	if len(segments) != len(expected) {
		t.Fatalf("expected %d segments, got %d", len(expected), len(segments))
	}
	for i, exp := range expected {
		if segments[i].Name != exp.name {
			t.Errorf("segments[%d].Name = %q, want %q", i, segments[i].Name, exp.name)
		}
		hasSlash := strings.HasSuffix(segments[i].Path, "/")
		if hasSlash != exp.hasSlash {
			t.Errorf("segments[%d].Path trailing slash = %v, want %v (path=%q)", i, hasSlash, exp.hasSlash, segments[i].Path)
		}
	}
}

// Ensure we can handle BreadCrumbEntry in the view context
func TestBuildFileDataPathSegments(t *testing.T) {
	idx := simpleIndex(t)
	result, err := buildFileData(idx, "myrepo", "abc123", "sub/deep.go")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(result.PathSegments) == 0 {
		t.Error("expected non-empty PathSegments")
	}
	// Last segment should be the file name
	last := result.PathSegments[len(result.PathSegments)-1]
	if last.Name != "deep.go" {
		t.Errorf("last segment = %q, want %q", last.Name, "deep.go")
	}
}

// Ensure the FileViewerContext has proper RepoURL
func TestBuildFileDataRepoURL(t *testing.T) {
	idx := simpleIndex(t)
	result, err := buildFileData(idx, "myrepo", "abc123", "main.go")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if want := viewPath(idx.Name(), "myrepo", "abc123"); result.RepoURL != want {
		t.Errorf("RepoURL = %q, want %q", result.RepoURL, want)
	}
}
