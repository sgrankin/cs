// Copyright 2011 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package index

import (
	"os"
	"testing"
	"unsafe"

	"github.com/google/go-cmp/cmp"
)

var postFiles = map[string]string{
	"file0": "",
	"file1": "Google Code Search",
	"file2": "Google Code Project Hosting",
	"file3": "Google Web Search",
}

func TestTrivialPosting(t *testing.T) {
	ix := openTestIndex(t, nil, postFiles)
	if l := ix.PostingList(tri('S', 'e', 'a')); !equalList(l, []uint32{1, 3}) {
		t.Errorf("PostingList(Sea) = %v, want [1 3]", l)
	}
	if l := ix.PostingList(tri('G', 'o', 'o')); !equalList(l, []uint32{1, 2, 3}) {
		t.Errorf("PostingList(Goo) = %v, want [1 2 3]", l)
	}
	if l := ix.PostingAnd(ix.PostingList(tri('S', 'e', 'a')), tri('G', 'o', 'o')); !equalList(l, []uint32{1, 3}) {
		t.Errorf("PostingList(Sea&Goo) = %v, want [1 3]", l)
	}
	if l := ix.PostingAnd(ix.PostingList(tri('G', 'o', 'o')), tri('S', 'e', 'a')); !equalList(l, []uint32{1, 3}) {
		t.Errorf("PostingList(Goo&Sea) = %v, want [1 3]", l)
	}
	if l := ix.PostingOr(ix.PostingList(tri('S', 'e', 'a')), tri('G', 'o', 'o')); !equalList(l, []uint32{1, 2, 3}) {
		t.Errorf("PostingList(Sea|Goo) = %v, want [1 2 3]", l)
	}
	if l := ix.PostingOr(ix.PostingList(tri('G', 'o', 'o')), tri('S', 'e', 'a')); !equalList(l, []uint32{1, 2, 3}) {
		t.Errorf("PostingList(Goo|Sea) = %v, want [1 2 3]", l)
	}
}

func TestOpenAndClose(t *testing.T) {
	out := createTestIndexFile(t, []string{"/src/"}, postFiles)

	ix := Open(out)
	if ix.Path != out {
		t.Errorf("Path = %q, want %q", ix.Path, out)
	}
	if ix.FileInfo == nil {
		t.Error("FileInfo is nil")
	}
	if err := ix.Close(); err != nil {
		t.Errorf("Close() returned error: %v", err)
	}
}

func TestPaths(t *testing.T) {
	paths := []string{"/src/", "/usr/local/"}
	ix := openTestIndex(t, paths, postFiles)

	got := ix.Paths()
	if diff := cmp.Diff(paths, got); diff != "" {
		t.Errorf("Paths() mismatch (-want +got):\n%s", diff)
	}
}

func TestNameAndData(t *testing.T) {
	files := map[string]string{
		"alpha": "hello",
		"beta":  "world",
		"gamma": "test data",
	}
	ix := openTestIndex(t, nil, files)

	// Names are sorted, so alpha=0, beta=1, gamma=2
	wantNames := []string{"alpha", "beta", "gamma"}
	for i, want := range wantNames {
		got := ix.Name(uint32(i))
		if got != want {
			t.Errorf("Name(%d) = %q, want %q", i, got, want)
		}
		gotBytes := ix.NameBytes(uint32(i))
		if string(gotBytes) != want {
			t.Errorf("NameBytes(%d) = %q, want %q", i, string(gotBytes), want)
		}
	}

	// Check Data retrieval
	wantData := map[string]string{
		"alpha": "hello",
		"beta":  "world",
		"gamma": "test data",
	}
	for i, name := range wantNames {
		data := ix.Data(uint32(i))
		if string(data) != wantData[name] {
			t.Errorf("Data(%d) = %q, want %q", i, string(data), wantData[name])
		}
	}
}

func TestDataAtName(t *testing.T) {
	files := map[string]string{
		"alpha": "hello",
		"beta":  "world",
		"gamma": "test data",
	}
	ix := openTestIndex(t, nil, files)

	// Found
	got := ix.DataAtName("beta")
	if string(got) != "world" {
		t.Errorf("DataAtName(beta) = %q, want %q", string(got), "world")
	}

	// Not found
	got = ix.DataAtName("nonexistent")
	if got != nil {
		t.Errorf("DataAtName(nonexistent) = %v, want nil", got)
	}
}

func TestNames(t *testing.T) {
	files := map[string]string{
		"src/a.go":    "package a",
		"src/b.go":    "package b",
		"src/c.go":    "package c",
		"test/d.go":   "package d",
		"test/e.go":   "package e",
		"vendor/f.go": "package f",
	}
	ix := openTestIndex(t, nil, files)

	tests := []struct {
		name   string
		prefix string
		want   []string
	}{
		{
			name:   "prefix matches multiple",
			prefix: "src/",
			want:   []string{"src/a.go", "src/b.go", "src/c.go"},
		},
		{
			name:   "prefix matches one",
			prefix: "vendor/",
			want:   []string{"vendor/f.go"},
		},
		{
			name:   "prefix matches none",
			prefix: "missing/",
			want:   nil,
		},
		{
			name:   "empty prefix",
			prefix: "",
			want:   nil,
		},
		{
			name:   "prefix beyond all names",
			prefix: "zzz",
			want:   nil,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := ix.Names([]byte(tt.prefix))
			var gotStrings []string
			for _, b := range got {
				gotStrings = append(gotStrings, string(b))
			}
			if diff := cmp.Diff(tt.want, gotStrings); diff != "" {
				t.Errorf("Names(%q) mismatch (-want +got):\n%s", tt.prefix, diff)
			}
		})
	}
}

func TestNamesHighBytePrefix(t *testing.T) {
	// Test the edge case where prefix bytes are all 0xff, so incrementing
	// would overflow and we need to use end = ix.numName.
	files := map[string]string{
		"\xff\xff\x01": "data1",
		"\xff\xff\x02": "data2",
	}
	ix := openTestIndex(t, nil, files)

	got := ix.Names([]byte{0xff, 0xff})
	if len(got) != 2 {
		t.Errorf("Names(\\xff\\xff) returned %d results, want 2", len(got))
	}
}

func TestFindListNotFound(t *testing.T) {
	ix := openTestIndex(t, nil, map[string]string{
		"file1": "hello world",
	})

	// Look for a trigram that doesn't exist in the index.
	count, offset := ix.findList(tri('Z', 'Z', 'Z'))
	if count != 0 || offset != 0 {
		t.Errorf("findList(ZZZ) = (%d, %d), want (0, 0)", count, offset)
	}

	// PostingList for a missing trigram should return empty.
	l := ix.PostingList(tri('Z', 'Z', 'Z'))
	if len(l) != 0 {
		t.Errorf("PostingList(ZZZ) = %v, want []", l)
	}
}

func TestDumpPosting(t *testing.T) {
	ix := openTestIndex(t, nil, map[string]string{
		"file1": "hello",
	})

	// dumpPosting just logs output; ensure it doesn't panic.
	ix.dumpPosting()
}

func TestPostingQuery(t *testing.T) {
	ix := openTestIndex(t, nil, map[string]string{
		"file0": "aaa bbb ccc",
		"file1": "aaa ddd eee",
		"file2": "bbb ccc fff",
	})

	t.Run("QNone", func(t *testing.T) {
		q := &Query{Op: QNone}
		got := ix.PostingQuery(q)
		if len(got) != 0 {
			t.Errorf("PostingQuery(QNone) = %v, want nil", got)
		}
	})

	t.Run("QAll", func(t *testing.T) {
		q := &Query{Op: QAll}
		got := ix.PostingQuery(q)
		want := []uint32{0, 1, 2}
		if !equalList(got, want) {
			t.Errorf("PostingQuery(QAll) = %v, want %v", got, want)
		}
	})

	t.Run("QAnd with trigrams", func(t *testing.T) {
		q := &Query{
			Op:      QAnd,
			Trigram: []string{"aaa", "bbb"},
		}
		got := ix.PostingQuery(q)
		want := []uint32{0} // only file0 has both "aaa" and "bbb"
		if !equalList(got, want) {
			t.Errorf("PostingQuery(QAnd aaa+bbb) = %v, want %v", got, want)
		}
	})

	t.Run("QAnd with no matching trigram", func(t *testing.T) {
		q := &Query{
			Op:      QAnd,
			Trigram: []string{"zzz"},
		}
		got := ix.PostingQuery(q)
		if len(got) != 0 {
			t.Errorf("PostingQuery(QAnd zzz) = %v, want nil", got)
		}
	})

	t.Run("QOr with trigrams", func(t *testing.T) {
		q := &Query{
			Op:      QOr,
			Trigram: []string{"ddd", "fff"},
		}
		got := ix.PostingQuery(q)
		want := []uint32{1, 2} // file1 has "ddd", file2 has "fff"
		if !equalList(got, want) {
			t.Errorf("PostingQuery(QOr ddd+fff) = %v, want %v", got, want)
		}
	})

	t.Run("QAnd with sub-queries", func(t *testing.T) {
		q := &Query{
			Op: QAnd,
			Sub: []*Query{
				{Op: QAnd, Trigram: []string{"aaa"}},
				{Op: QAnd, Trigram: []string{"bbb"}},
			},
		}
		got := ix.PostingQuery(q)
		want := []uint32{0}
		if !equalList(got, want) {
			t.Errorf("PostingQuery(QAnd sub) = %v, want %v", got, want)
		}
	})

	t.Run("QAnd sub-query with empty result", func(t *testing.T) {
		q := &Query{
			Op: QAnd,
			Sub: []*Query{
				{Op: QAnd, Trigram: []string{"zzz"}}, // no match
			},
		}
		got := ix.PostingQuery(q)
		if len(got) != 0 {
			t.Errorf("PostingQuery(QAnd sub no match) = %v, want nil", got)
		}
	})

	t.Run("QOr with sub-queries", func(t *testing.T) {
		q := &Query{
			Op: QOr,
			Sub: []*Query{
				{Op: QAnd, Trigram: []string{"ddd"}},
				{Op: QAnd, Trigram: []string{"fff"}},
			},
		}
		got := ix.PostingQuery(q)
		want := []uint32{1, 2}
		if !equalList(got, want) {
			t.Errorf("PostingQuery(QOr sub) = %v, want %v", got, want)
		}
	})

	t.Run("QAll with restrict", func(t *testing.T) {
		restrict := []uint32{0, 2}
		q := &Query{Op: QAll}
		got := ix.postingQuery(q, restrict)
		if !equalList(got, restrict) {
			t.Errorf("postingQuery(QAll, restrict) = %v, want %v", got, restrict)
		}
	})
}

func TestMergeOr(t *testing.T) {
	tests := []struct {
		name string
		l1   []uint32
		l2   []uint32
		want []uint32
	}{
		{"both nil", nil, nil, nil},
		{"l1 nil", nil, []uint32{1, 2}, []uint32{1, 2}},
		{"l2 nil", []uint32{1, 2}, nil, []uint32{1, 2}},
		{"no overlap", []uint32{1, 3}, []uint32{2, 4}, []uint32{1, 2, 3, 4}},
		{"overlap", []uint32{1, 2, 3}, []uint32{2, 3, 4}, []uint32{1, 2, 3, 4}},
		{"identical", []uint32{1, 2}, []uint32{1, 2}, []uint32{1, 2}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := mergeOr(tt.l1, tt.l2)
			if diff := cmp.Diff(tt.want, got); diff != "" {
				t.Errorf("mergeOr() mismatch (-want +got):\n%s", diff)
			}
		})
	}
}

func TestPostingWithRestrict(t *testing.T) {
	ix := openTestIndex(t, nil, map[string]string{
		"file0": "Google Code Search",
		"file1": "Google Code Project Hosting",
		"file2": "Google Web Search",
	})

	// "Goo" appears in all three files (0, 1, 2).
	// Restrict to only files 0 and 2.
	restrict := []uint32{0, 2}
	got := ix.postingList(tri('G', 'o', 'o'), restrict)
	want := []uint32{0, 2}
	if !equalList(got, want) {
		t.Errorf("postingList(Goo, restrict) = %v, want %v", got, want)
	}

	// postingAnd with restrict
	list := ix.postingList(tri('S', 'e', 'a'), restrict) // "Sea" in file0, file2
	got = ix.postingAnd(list, tri('G', 'o', 'o'), restrict)
	if !equalList(got, want) {
		t.Errorf("postingAnd(Sea, Goo, restrict) = %v, want %v", got, want)
	}

	// postingOr with restrict
	got = ix.postingOr([]uint32{}, tri('G', 'o', 'o'), restrict)
	if !equalList(got, want) {
		t.Errorf("postingOr([], Goo, restrict) = %v, want %v", got, want)
	}
}

func TestPostReaderRestrictExhausted(t *testing.T) {
	// Tests the path where restrict list is exhausted during iteration.
	ix := openTestIndex(t, nil, map[string]string{
		"afile": "xyzxyz",
		"bfile": "xyzxyz",
		"cfile": "xyzxyz",
	})

	// Restrict to file 0 only; files 1 and 2 also have "xyz" but are excluded.
	got := ix.postingList(tri('x', 'y', 'z'), []uint32{0})
	want := []uint32{0}
	if !equalList(got, want) {
		t.Errorf("postingList(xyz, [0]) = %v, want %v", got, want)
	}
}

func TestNamesStartEnd(t *testing.T) {
	// Test Names where start == end (prefix exists but no names match range).
	ix := openTestIndex(t, nil, map[string]string{
		"aaa": "content",
		"bbb": "content",
		"ccc": "content",
	})

	// Prefix "bb" should match "bbb"
	got := ix.Names([]byte("bb"))
	if len(got) != 1 || string(got[0]) != "bbb" {
		t.Errorf("Names(bb) = %v, want [bbb]", got)
	}

	// Prefix "bd" is between "bbb" and "ccc" - no matches
	got = ix.Names([]byte("bd"))
	if len(got) != 0 {
		t.Errorf("Names(bd) = %v, want []", got)
	}
}

func TestFindListExact(t *testing.T) {
	// Test finding a trigram that exists at the end of the posting index
	// vs one that's larger than all indexed trigrams.
	ix := openTestIndex(t, nil, map[string]string{
		"file1": "abc",
	})

	// "abc" trigram should be found.
	count, _ := ix.findList(tri('a', 'b', 'c'))
	if count == 0 {
		t.Error("findList(abc) returned count 0, want non-zero")
	}

	// A trigram past all entries should return (0, 0).
	count, offset := ix.findList(tri(0xfe, 0xfe, 0xfe))
	if count != 0 || offset != 0 {
		t.Errorf("findList(0xfefefe) = (%d, %d), want (0, 0)", count, offset)
	}
}

func TestQAndSubWithFirstNilList(t *testing.T) {
	// When QAnd has no trigrams but has sub-queries, the first sub-query
	// gets restrict=nil which means list starts nil.
	ix := openTestIndex(t, nil, map[string]string{
		"file0": "aaa bbb",
		"file1": "aaa ccc",
		"file2": "bbb ccc",
	})

	// QAnd with only sub-queries, no trigrams.
	// First sub has list=nil (restrict), second narrows it.
	q := &Query{
		Op: QAnd,
		Sub: []*Query{
			{Op: QAnd, Trigram: []string{"aaa"}}, // files 0,1
			{Op: QAnd, Trigram: []string{"bbb"}}, // files 0,2
		},
	}
	got := ix.PostingQuery(q)
	want := []uint32{0} // intersection
	if !equalList(got, want) {
		t.Errorf("PostingQuery = %v, want %v", got, want)
	}
}

func TestQOrWithSubAndTrigrams(t *testing.T) {
	ix := openTestIndex(t, nil, map[string]string{
		"file0": "aaa bbb",
		"file1": "ccc ddd",
		"file2": "eee fff",
	})

	// QOr with both trigrams and sub-queries
	q := &Query{
		Op:      QOr,
		Trigram: []string{"aaa"},
		Sub: []*Query{
			{Op: QAnd, Trigram: []string{"ccc"}},
		},
	}
	got := ix.PostingQuery(q)
	want := []uint32{0, 1}
	if !equalList(got, want) {
		t.Errorf("PostingQuery = %v, want %v", got, want)
	}
}

func TestQOrMultipleTrigrams(t *testing.T) {
	ix := openTestIndex(t, nil, map[string]string{
		"file0": "aaa bbb",
		"file1": "ccc ddd",
		"file2": "eee fff",
	})

	// QOr with multiple trigrams exercises postingOr path on 2nd+ trigram
	q := &Query{
		Op:      QOr,
		Trigram: []string{"aaa", "ccc"},
	}
	got := ix.PostingQuery(q)
	want := []uint32{0, 1}
	if !equalList(got, want) {
		t.Errorf("PostingQuery(QOr aaa|ccc) = %v, want %v", got, want)
	}
}

func TestStr(t *testing.T) {
	// Test the str method by using an index with paths.
	ix := openTestIndex(t, []string{"/test/path/"}, map[string]string{
		"file1": "content",
	})

	// Paths() internally uses pathData and asStringbytes, exercising both.
	paths := ix.Paths()
	if len(paths) != 1 || paths[0] != "/test/path/" {
		t.Errorf("Paths() = %v, want [/test/path/]", paths)
	}
}

func TestOpenCorruptIndex(t *testing.T) {
	// Open with data too small for a valid index triggers corrupt().
	tmpFile, err := os.CreateTemp("", "index-corrupt-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(tmpFile.Name())
	tmpFile.Write([]byte("tiny"))
	tmpFile.Close()

	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic from Open with corrupt data, got none")
		}
	}()
	Open(tmpFile.Name())
}

func TestOpenBadTrailerMagic(t *testing.T) {
	// File large enough but with wrong trailer magic.
	tmpFile, err := os.CreateTemp("", "index-badmagic-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(tmpFile.Name())
	// Write enough bytes to pass the size check but with wrong magic.
	data := make([]byte, 100)
	tmpFile.Write(data)
	tmpFile.Close()

	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic from Open with bad trailer magic")
		}
	}()
	Open(tmpFile.Name())
}

func TestOpenBadSegmentLength(t *testing.T) {
	// Build a valid index, then corrupt the segment length field.
	out := createTestIndexFile(t, nil, map[string]string{"a": "hello"})

	data, err := os.ReadFile(out)
	if err != nil {
		t.Fatal(err)
	}

	// The trailer has: segOffset(4) + segLength(4) + trailerMagic(16)
	// segLength is at offset len(data) - 16 - 4
	segLenOff := len(data) - len(trailerMagic) - 4
	// Set segLength to something != 7*8 = 56
	data[segLenOff] = 0
	data[segLenOff+1] = 0
	data[segLenOff+2] = 0
	data[segLenOff+3] = 99

	if err := os.WriteFile(out, data, 0o600); err != nil {
		t.Fatal(err)
	}

	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic from Open with bad segment length")
		}
	}()
	Open(out)
}

func TestSliceCorrupt(t *testing.T) {
	// Test slice with out-of-bounds access.
	ix := openTestIndex(t, nil, map[string]string{"a": "hello"})

	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic from slice with out-of-bounds access")
		}
	}()
	// Request a slice that extends beyond the data.
	ix.slice(uint32(len(ix.data.d)-1), 10)
}

func TestSliceNegativeN(t *testing.T) {
	// Test slice with n < 0 (returns from offset to end).
	ix := openTestIndex(t, nil, map[string]string{"a": "hello"})

	// n < 0 should return data from offset to end.
	result := ix.slice(0, -1)
	if len(result) != len(ix.data.d) {
		t.Errorf("slice(0, -1) returned %d bytes, want %d", len(result), len(ix.data.d))
	}
}

func TestUvarint(t *testing.T) {
	// Test uvarint method by reading from the name index segment,
	// which contains uint32 values we can verify.
	ix := openTestIndex(t, nil, map[string]string{"a": "hello", "b": "world"})

	// The name index segment contains file offsets as uint32s.
	// The first entry should be 0 (offset of first name).
	// Read it as a uvarint — since it's big-endian uint32, uvarint won't
	// interpret it correctly, but we just need to exercise the method
	// without panicking and get a non-error result.

	// Use nameIndex directly — first 4 bytes encode offset 0.
	// Instead, find a varint in the posting data.
	// The posting data has format: trigram(3) + varint deltas + 0 terminator.
	// We need the absolute offset within ix.data.d.
	_, listOffset := ix.findList(tri('h', 'e', 'l'))

	// postData is a sub-slice of data.d. Compute its offset.
	postDataOff := uint32(uintptr(unsafe.Pointer(&ix.postData[0])) - uintptr(unsafe.Pointer(&ix.data.d[0])))

	// The varint delta starts at postData offset + listOffset + 3 (skip trigram bytes).
	val := ix.uvarint(postDataOff + listOffset + 3)
	// First delta for file 0 is 1 (stored as fileid+1).
	if val != 1 {
		t.Errorf("uvarint() = %d, want 1", val)
	}
}

func TestStrMethod(t *testing.T) {
	// Test the str method (currently dead code but still part of the package).
	ix := openTestIndex(t, []string{"/test/"}, map[string]string{"a": "hello"})

	// The magic string "csearch index 2\n" starts at offset 0.
	// After magic (16 bytes), path data starts.
	// Path data contains "/test/\x00\x00".
	// Find the offset to the path data.
	got := ix.str(16) // Should read "/test/" from the path data section.
	if string(got) != "/test/" {
		t.Errorf("str(16) = %q, want %q", string(got), "/test/")
	}
}

func TestAsStringbytesCorrupt(t *testing.T) {
	// asStringbytes panics when no NUL byte is found.
	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic from asStringbytes with no NUL byte")
		}
	}()
	asStringbytes([]byte("no null terminator"))
}

func TestFindListPastEnd(t *testing.T) {
	// Build an empty index (no files, only the sentinel posting).
	// Any findList call should hit the i >= numPost path.
	ix := openTestIndex(t, nil, map[string]string{"f": ""})

	// With no file content, there are no real trigrams in the posting index
	// (only the sentinel at 0xFFFFFF). numPost includes the sentinel, but
	// sort.Search may still go past it if the searched trigram is > sentinel.
	// Actually, test with an empty index that has numPost=0.
	// An empty file produces no trigrams, so the only posting entry is the sentinel.
	// findList for any trigram: sort.Search finds the sentinel (count=0).
	count, offset := ix.findList(tri('a', 'b', 'c'))
	if count != 0 || offset != 0 {
		t.Errorf("findList(abc) = (%d, %d), want (0, 0)", count, offset)
	}
}

func TestFindListEmptyIndex(t *testing.T) {
	// Build an index with zero files to get numPost=0, causing findList to
	// immediately return (0, 0) at the i >= numPost check.
	ix := openTestIndex(t, nil, map[string]string{})

	count, offset := ix.findList(tri('a', 'b', 'c'))
	if count != 0 || offset != 0 {
		t.Errorf("findList(abc) on empty index = (%d, %d), want (0, 0)", count, offset)
	}
}

func TestPostReaderCorruptDelta(t *testing.T) {
	// Test that postReader.next panics on corrupt posting data (zero delta).
	out := createTestIndexFile(t, nil, map[string]string{"a": "hello"})

	// Open once to find the posting data offset and trigram location.
	ix := Open(out)
	count, offset := ix.findList(tri('h', 'e', 'l'))
	if count == 0 {
		ix.Close()
		t.Skip("no posting data for 'hel' trigram")
	}
	// Compute the file offset of postData from the segment table.
	postDataFileOff := uintptr(unsafe.Pointer(&ix.postData[0])) - uintptr(unsafe.Pointer(&ix.data.d[0]))
	ix.Close()

	// Read the file, corrupt the first varint delta to 0 (the terminator value).
	data, err := os.ReadFile(out)
	if err != nil {
		t.Fatal(err)
	}
	corruptOffset := int(postDataFileOff) + int(offset) + 3 // skip trigram bytes
	if corruptOffset >= len(data) {
		t.Fatal("corrupt offset out of range")
	}
	data[corruptOffset] = 0

	if err := os.WriteFile(out, data, 0o600); err != nil {
		t.Fatal(err)
	}

	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic from postReader.next with corrupt delta")
		}
	}()

	ix = Open(out)
	defer ix.Close()
	// This should panic because the delta is 0 but count says there's data.
	ix.PostingList(tri('h', 'e', 'l'))
}

func TestStrCorrupt(t *testing.T) {
	// Test str method when data has no NUL byte after offset.
	out := createTestIndexFile(t, nil, map[string]string{"a": "hello"})

	data, err := os.ReadFile(out)
	if err != nil {
		t.Fatal(err)
	}

	ix := Open(out)
	defer ix.Close()
	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic from str with no NUL byte")
		}
	}()

	// Call str at an offset near the end of the file where there's no NUL byte.
	// The trailer magic is "\ncsearch trailr\n" which has no NUL.
	trailerStart := uint32(len(data) - len(trailerMagic))
	ix.str(trailerStart)
}

func TestPostReaderEndOfListCorrupt(t *testing.T) {
	// Test the end-of-list validation in postReader.next.
	// After reading all entries, the next byte should be 0 (terminating delta).
	// Corrupt this to a non-zero value.
	out := createTestIndexFile(t, nil, map[string]string{"a": "hello world"})

	ix := Open(out)
	count, offset := ix.findList(tri('h', 'e', 'l'))
	if count == 0 {
		ix.Close()
		t.Skip("no posting data for 'hel'")
	}
	postDataFileOff := uintptr(unsafe.Pointer(&ix.postData[0])) - uintptr(unsafe.Pointer(&ix.data.d[0]))
	ix.Close()

	data, err := os.ReadFile(out)
	if err != nil {
		t.Fatal(err)
	}

	// The posting list format is: trigram(3) + varint deltas + 0 terminator.
	// For a single file (fileid 0), delta is 1 (0+1=1), then 0 terminator.
	// Corrupt the terminator (the byte after the varint delta).
	terminatorOff := int(postDataFileOff) + int(offset) + 3 + 1 // skip trigram + 1 varint byte
	if terminatorOff >= len(data) {
		t.Fatal("terminator offset out of range")
	}
	data[terminatorOff] = 0x42

	if err := os.WriteFile(out, data, 0o600); err != nil {
		t.Fatal(err)
	}

	ix = Open(out)
	defer ix.Close()

	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic from postReader.next with corrupt end-of-list")
		}
	}()
	ix.PostingList(tri('h', 'e', 'l'))
}

func TestCorruptFunction(t *testing.T) {
	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic from corrupt()")
		}
	}()
	corrupt()
}
