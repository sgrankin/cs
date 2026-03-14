// Copyright 2011 The Go Authors. All rights reserved.
// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-3-Clause

package index

import (
	"os"
	"testing"

	"github.com/google/go-cmp/cmp"
)

var mergePaths1 = []string{
	"/a",
	"/b",
	"/c",
}

var mergePaths2 = []string{
	"/b",
	"/cc",
}

var mergeFiles1 = map[string]string{
	"/a/x":  "hello world",
	"/a/y":  "goodbye world",
	"/b/xx": "now is the time",
	"/b/xy": "for all good men",
	"/c/ab": "give me all the potatoes",
	"/c/de": "or give me death now",
}

var mergeFiles2 = map[string]string{
	"/b/www": "world wide indeed",
	"/b/xx":  "no, not now",
	"/b/yy":  "first potatoes, now liberty?",
	"/cc":    "come to the aid of his potatoes",
}

// mergeIndexes builds two indexes, merges them, and returns the merged index.
func mergeIndexes(t *testing.T, paths1 []string, files1 map[string]string, paths2 []string, files2 map[string]string) *Index {
	t.Helper()
	var temps [3]string
	for i := range temps {
		f, err := os.CreateTemp("", "index-test")
		if err != nil {
			t.Fatal(err)
		}
		temps[i] = f.Name()
		f.Close()
		t.Cleanup(func() { os.Remove(temps[i]) })
	}
	buildIndex(temps[0], paths1, files1)
	buildIndex(temps[1], paths2, files2)
	Merge(temps[2], temps[0], temps[1])
	ix := Open(temps[2])
	t.Cleanup(func() { ix.Close() })
	return ix
}

func TestMerge(t *testing.T) {
	out1 := createTestIndexFile(t, mergePaths1, mergeFiles1)
	out2 := createTestIndexFile(t, mergePaths2, mergeFiles2)

	f3, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	f3.Close()
	out3 := f3.Name()
	t.Cleanup(func() { os.Remove(out3) })

	Merge(out3, out1, out2)

	ix1 := Open(out1)
	ix2 := Open(out2)
	ix3 := Open(out3)
	defer ix1.Close()
	defer ix2.Close()
	defer ix3.Close()

	nameof := func(ix *Index) string {
		switch ix {
		case ix1:
			return "ix1"
		case ix2:
			return "ix2"
		case ix3:
			return "ix3"
		}
		return "???"
	}

	checkFiles := func(ix *Index, l ...string) {
		for i, s := range l {
			if n := ix.Name(uint32(i)); n != s {
				t.Errorf("%s: Name(%d) = %s, want %s", nameof(ix), i, n, s)
			}
		}
	}

	checkFiles(ix1, "/a/x", "/a/y", "/b/xx", "/b/xy", "/c/ab", "/c/de")
	checkFiles(ix2, "/b/www", "/b/xx", "/b/yy", "/cc")
	checkFiles(ix3, "/a/x", "/a/y", "/b/www", "/b/xx", "/b/yy", "/c/ab", "/c/de", "/cc")

	check := func(ix *Index, trig string, l ...uint32) {
		l1 := ix.PostingList(tri(trig[0], trig[1], trig[2]))
		if !equalList(l1, l) {
			t.Errorf("PostingList(%s, %s) = %v, want %v", nameof(ix), trig, l1, l)
		}
	}

	check(ix1, "wor", 0, 1)
	check(ix1, "now", 2, 5)
	check(ix1, "all", 3, 4)

	check(ix2, "now", 1, 2)

	check(ix3, "all", 5)
	check(ix3, "wor", 0, 1, 2)
	check(ix3, "now", 3, 4, 6)
	check(ix3, "pot", 4, 5, 7)
}

func TestMergeNamesAndData(t *testing.T) {
	tests := []struct {
		name      string
		paths1    []string
		files1    map[string]string
		paths2    []string
		files2    map[string]string
		wantNames []string
		wantData  map[string]string // name -> content
	}{
		{
			name:   "data preserved",
			paths1: []string{"/a"}, files1: map[string]string{"/a/x": "hello world", "/a/y": "goodbye world"},
			paths2: []string{"/b"}, files2: map[string]string{"/b/z": "new content here"},
			wantNames: []string{"/a/x", "/a/y", "/b/z"},
			wantData:  map[string]string{"/a/x": "hello world", "/a/y": "goodbye world", "/b/z": "new content here"},
		},
		{
			name:   "no overlap",
			paths1: []string{"/a"}, files1: map[string]string{"/a/x": "alpha content", "/a/y": "beta content"},
			paths2: []string{"/b"}, files2: map[string]string{"/b/z": "gamma content", "/b/w": "delta content"},
			wantNames: []string{"/a/x", "/a/y", "/b/w", "/b/z"},
			wantData:  map[string]string{"/a/x": "alpha content", "/a/y": "beta content", "/b/w": "delta content", "/b/z": "gamma content"},
		},
		{
			name:   "remaining ix1 names after ix2 exhausted",
			paths1: []string{"/a", "/b", "/z"}, files1: map[string]string{"/a/file1": "aaa content", "/b/file2": "bbb content", "/z/file3": "zzz content"},
			paths2: []string{"/b"}, files2: map[string]string{"/b/file4": "bbb new content"},
			wantNames: []string{"/a/file1", "/b/file4", "/z/file3"},
			wantData:  map[string]string{"/a/file1": "aaa content", "/b/file4": "bbb new content", "/z/file3": "zzz content"},
		},
		{
			name:   "duplicate paths - src2 takes precedence",
			paths1: []string{"/a"}, files1: map[string]string{"/a/file1": "old content aaa"},
			paths2: []string{"/a"}, files2: map[string]string{"/a/file1": "new content bbb"},
			wantNames: []string{"/a/file1"},
			wantData:  map[string]string{"/a/file1": "new content bbb"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ix := mergeIndexes(t, tt.paths1, tt.files1, tt.paths2, tt.files2)

			// Check names.
			gotNames := make([]string, ix.numName)
			for i := range ix.numName {
				gotNames[i] = ix.Name(uint32(i))
			}
			if diff := cmp.Diff(tt.wantNames, gotNames); diff != "" {
				t.Errorf("names mismatch (-want +got):\n%s", diff)
			}

			// Check data.
			for i := range ix.numName {
				name := ix.Name(uint32(i))
				got := string(ix.Data(uint32(i)))
				want := tt.wantData[name]
				if got != want {
					t.Errorf("Data(%q) = %q, want %q", name, got, want)
				}
			}
		})
	}
}

func TestMergeTrigramOnlyInSrc1(t *testing.T) {
	ix := mergeIndexes(t,
		[]string{"/a"}, map[string]string{"/a/f1": "unique_xyz_content"},
		[]string{"/b"}, map[string]string{"/b/f2": "different_abc_stuff"},
	)

	// "xyz" should only be in file from src1.
	l := ix.PostingList(tri('x', 'y', 'z'))
	if len(l) != 1 {
		t.Errorf("PostingList(xyz) = %v, want 1 entry", l)
	}

	// "abc" should only be in file from src2.
	l = ix.PostingList(tri('a', 'b', 'c'))
	if len(l) != 1 {
		t.Errorf("PostingList(abc) = %v, want 1 entry", l)
	}
}

func TestMergePostDataWriterEndTrigramEmpty(t *testing.T) {
	// Test the endTrigram path where count == 0 (no file IDs written).
	w := postDataWriter{}
	f, err := os.CreateTemp("", "index-test-out")
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { os.Remove(f.Name()) })
	f.Close()

	out := bufCreate(f.Name())
	defer out.Close()
	w.init(out)

	// Start a trigram but don't write any file IDs, then end it.
	w.trigram(tri('a', 'b', 'c'))
	w.endTrigram() // count == 0, should be a no-op
}
