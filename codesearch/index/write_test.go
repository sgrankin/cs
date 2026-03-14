// Copyright 2011 The Go Authors. All rights reserved.
// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-3-Clause

package index

import (
	"os"
	"sort"
	"strings"
	"testing"

	"github.com/google/go-cmp/cmp"
)

var trivialFiles = map[string]string{
	"afile4":   "\ndabc\n",
	"f0":       "\n\n",
	"file1":    "\na\n",
	"file3":    "\nabc\n",
	"file5":    "\nxyzw\n",
	"thefile2": "\nab\n",
}

var trivialIndex = join(
	// header
	"csearch index 2\n",

	// list of paths
	"\x00",

	// list of names
	"afile4\x00",
	"f0\x00",
	"file1\x00",
	"file3\x00",
	"file5\x00",
	"thefile2\x00",
	"\x00",

	// list of posting lists
	"\na\n", fileList(2), // file1
	"\nab", fileList(3, 5), // file3, thefile2
	"\nda", fileList(0), // afile4
	"\nxy", fileList(4), // file5
	"ab\n", fileList(5), // thefile2
	"abc", fileList(0, 3), // afile4, file3
	"bc\n", fileList(0, 3), // afile4, file3
	"dab", fileList(0), // afile4
	"xyz", fileList(4), // file5
	"yzw", fileList(4), // file5
	"zw\n", fileList(4), // file5
	"\xff\xff\xff", fileList(),

	// Blobs
	"\ndabc\n",
	"\n\n",
	"\na\n",
	"\nabc\n",
	"\nxyzw\n",
	"\nab\n",

	// name index
	u32(0),
	u32(6+1),
	u32(6+1+2+1),
	u32(6+1+2+1+5+1),
	u32(6+1+2+1+5+1+5+1),
	u32(6+1+2+1+5+1+5+1+5+1),
	u32(6+1+2+1+5+1+5+1+5+1+8+1),

	// posting list index,
	"\na\n", u32(1), u32(0),
	"\nab", u32(2), u32(5),
	"\nda", u32(1), u32(5+6),
	"\nxy", u32(1), u32(5+6+5),
	"ab\n", u32(1), u32(5+6+5+5),
	"abc", u32(2), u32(5+6+5+5+5),
	"bc\n", u32(2), u32(5+6+5+5+5+6),
	"dab", u32(1), u32(5+6+5+5+5+6+6),
	"xyz", u32(1), u32(5+6+5+5+5+6+6+5),
	"yzw", u32(1), u32(5+6+5+5+5+6+6+5+5),
	"zw\n", u32(1), u32(5+6+5+5+5+6+6+5+5+5),
	"\xff\xff\xff", u32(0), u32(5+6+5+5+5+6+6+5+5+5+5),

	// Blob index
	u32(0), u32(6),
	u32(0+6), u32(2),
	u32(0+6+2), u32(3),
	u32(0+6+2+3), u32(5),
	u32(0+6+2+3+5), u32(6),
	u32(0+6+2+3+5+6), u32(4),

	// trailer
	u32(16), u32(1),
	u32(16+1), u32(38),
	u32(16+1+38), u32(62),
	u32(16+1+38+62), u32(26),
	u32(16+1+38+62+26), u32(28),
	u32(16+1+38+62+26+28), u32(132),
	u32(16+1+38+62+26+28+132), u32(48),

	u32(351), u32(56), // TODO

	"\ncsearch trailr\n",
)

func join(s ...string) string {
	return strings.Join(s, "")
}

func u32(x uint32) string {
	var buf [4]byte
	buf[0] = byte(x >> 24)
	buf[1] = byte(x >> 16)
	buf[2] = byte(x >> 8)
	buf[3] = byte(x)
	return string(buf[:])
}

func fileList(list ...uint32) string {
	var buf []byte

	last := ^uint32(0)
	for _, x := range list {
		delta := x - last
		for delta >= 0x80 {
			buf = append(buf, byte(delta)|0x80)
			delta >>= 7
		}
		buf = append(buf, byte(delta))
		last = x
	}
	buf = append(buf, 0)
	return string(buf)
}

func buildFlushIndex(out string, paths []string, doFlush bool, fileData map[string]string) {
	ix := Create(out)
	ix.AddPaths(paths)
	var files []string
	for name := range fileData {
		files = append(files, name)
	}
	sort.Strings(files)
	for _, name := range files {
		ix.Add(name, strings.NewReader(fileData[name]))
	}
	if doFlush {
		ix.flushPost()
	}
	ix.Flush()
}

func buildIndex(name string, paths []string, fileData map[string]string) {
	buildFlushIndex(name, paths, false, fileData)
}

func testTrivialWrite(t *testing.T, doFlush bool) {
	f, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(f.Name())
	out := f.Name()
	f.Close()
	buildFlushIndex(out, nil, doFlush, trivialFiles)

	data, err := os.ReadFile(out)
	if err != nil {
		t.Fatalf("reading _test/index.triv: %v", err)
	}
	want := []byte(trivialIndex)
	if diff := cmp.Diff(want, data); diff != "" {
		t.Errorf("wrong index: (-want+got)\n%s", diff)
	}
}

func TestTrivialWrite(t *testing.T) {
	testTrivialWrite(t, false)
}

func TestTrivialWriteDisk(t *testing.T) {
	testTrivialWrite(t, true)
}

func TestHeap(t *testing.T) {
	h := &postHeap{}
	es := []postEntry{7, 4, 3, 2, 4}
	for _, e := range es {
		h.addMem([]postEntry{e})
	}
	if len(h.ch) != len(es) {
		t.Fatalf("wrong heap size: %d, want %d", len(h.ch), len(es))
	}
	for a, b := h.next(), h.next(); b.trigram() != (1<<24 - 1); a, b = b, h.next() {
		if a > b {
			t.Fatalf("%d should <= %d", a, b)
		}
	}
}

func TestAddFileNonexistent(t *testing.T) {
	f, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(f.Name())
	out := f.Name()
	f.Close()

	ix := Create(out)
	// AddFile with a non-existent file should not panic, just log.
	ix.AddFile("/nonexistent/path/to/file.txt")
	ix.Flush()
}

func TestAddFileReal(t *testing.T) {
	// Create a real file and add it using AddFile.
	content := "hello world test"
	tmpFile, err := os.CreateTemp("", "index-addfile-*")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(tmpFile.Name())
	if _, err := tmpFile.WriteString(content); err != nil {
		t.Fatal(err)
	}
	tmpFile.Close()

	idxFile, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(idxFile.Name())
	idxFile.Close()

	ix := Create(idxFile.Name())
	ix.AddFile(tmpFile.Name())
	ix.Flush()

	idx := Open(idxFile.Name())
	defer idx.Close()

	got := idx.Name(0)
	if got != tmpFile.Name() {
		t.Errorf("Name(0) = %q, want %q", got, tmpFile.Name())
	}
	data := idx.Data(0)
	if string(data) != content {
		t.Errorf("Data(0) = %q, want %q", string(data), content)
	}
}

func TestAddSkippedFiles(t *testing.T) {
	tests := []struct {
		name    string
		content string
	}{
		{"invalid UTF-8", "ab\xfe\xfe"},
		{"long line", strings.Repeat("a", maxLineLen+10)},
		{"too many trigrams", manyTrigramsContent()},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			f, err := os.CreateTemp("", "index-test")
			if err != nil {
				t.Fatal(err)
			}
			defer os.Remove(f.Name())
			f.Close()

			ix := Create(f.Name())
			ix.Add("testfile", strings.NewReader(tt.content))
			ix.Flush()

			idx := Open(f.Name())
			defer idx.Close()

			if idx.numName != 0 {
				t.Errorf("numName = %d, want 0 (file should be skipped)", idx.numName)
			}
		})
	}
}

func TestVerbose(t *testing.T) {
	tests := []struct {
		name  string
		paths []string
		file  string
		data  string
	}{
		{"add", nil, "verbosefile", "hello world"},
		{"flush with paths", []string{"/test/"}, "file1", "hello"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			f, err := os.CreateTemp("", "index-test")
			if err != nil {
				t.Fatal(err)
			}
			defer os.Remove(f.Name())
			out := f.Name()
			f.Close()

			ix := Create(out)
			ix.Verbose = true
			ix.AddPaths(tt.paths)
			ix.Add(tt.file, strings.NewReader(tt.data))
			ix.Flush()

			idx := Open(out)
			defer idx.Close()

			if idx.numName != 1 {
				t.Errorf("numName = %d, want 1", idx.numName)
			}
		})
	}
}

func TestWriteUvarintSizes(t *testing.T) {
	// Exercise writeUvarint with values in different size ranges.
	// We do this indirectly by creating an index with enough files to produce
	// large delta values in the posting lists.
	f, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(f.Name())
	out := f.Name()
	f.Close()

	files := make(map[string]string)
	// Create many files, some with "xyz" content and some without.
	// This creates large delta gaps in the posting lists.
	for i := range 300 {
		name := strings.Repeat("a", 5) + string(rune('A'+i%26)) + string(rune('A'+i/26))
		if i%100 == 0 {
			files[name] = "xyz content"
		} else {
			files[name] = "unique content " + name
		}
	}
	buildIndex(out, nil, files)

	idx := Open(out)
	defer idx.Close()

	// Just verify it opens and can be queried.
	l := idx.PostingList(tri('x', 'y', 'z'))
	if len(l) == 0 {
		t.Error("PostingList(xyz) returned empty, want non-empty")
	}
}

func TestBufWriterLargeWrite(t *testing.T) {
	// Test the bufWriter paths for writes larger than the buffer capacity.
	f, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(f.Name())
	out := f.Name()
	f.Close()

	// Create an index with a file whose content exceeds the bufWriter capacity (256KB).
	largeContent := strings.Repeat("abcdefghij\n", 30000) // ~330KB
	files := map[string]string{
		"largefile": largeContent,
	}
	buildIndex(out, nil, files)

	idx := Open(out)
	defer idx.Close()

	data := idx.Data(0)
	if string(data) != largeContent {
		t.Errorf("Data(0) length = %d, want %d", len(data), len(largeContent))
	}
}

func TestBufWriterLargeString(t *testing.T) {
	// Test the writeString path for strings larger than the buffer capacity.
	f, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(f.Name())
	out := f.Name()
	f.Close()

	// Create an index with many paths (long strings in the path list).
	largePath := "/" + strings.Repeat("x", 300000) + "/"
	files := map[string]string{
		"file1": "content",
	}
	buildIndex(out, []string{largePath}, files)

	idx := Open(out)
	defer idx.Close()

	paths := idx.Paths()
	if len(paths) != 1 || paths[0] != largePath {
		t.Errorf("Paths() = %v, want [%s]", paths, largePath)
	}
}

func TestBufWriterFlushPaths(t *testing.T) {
	// Exercise writeTrigram, writeUint32, writeUvarint flush paths
	// by creating an index with enough data to fill buffers.
	f, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(f.Name())
	out := f.Name()
	f.Close()

	// Many files with varied content to generate many posting list entries.
	files := make(map[string]string)
	for i := range 500 {
		name := "file" + string(rune('A'+i%26)) + string(rune('a'+i/26%26)) + string(rune('0'+i/676%10))
		files[name] = "content " + name + " data"
	}
	buildIndex(out, nil, files)

	idx := Open(out)
	defer idx.Close()

	if idx.numName != 500 {
		t.Errorf("numName = %d, want 500", idx.numName)
	}
}

func TestLogSkipMessages(t *testing.T) {
	// Test with LogSkip enabled to cover the log.Printf branches.
	f, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(f.Name())
	out := f.Name()
	f.Close()

	ix := Create(out)
	ix.LogSkip = true

	// Invalid UTF-8
	ix.Add("badutf8", strings.NewReader("ab\xfe\xfe"))

	// Long line
	ix.Add("longline", strings.NewReader(strings.Repeat("a", maxLineLen+10)))

	// Too many trigrams: use 3-byte combos with frequent newlines to stay under maxLineLen.
	ix.Add("manytrigrams", strings.NewReader(manyTrigramsContent()))

	ix.Flush()
}

func manyTrigramsContent() string {
	var b strings.Builder
	const alpha = "abcdefghijklmnopqrstuvwxyz{}"
	n := 0
	for i := range len(alpha) {
		for j := range len(alpha) {
			for k := range len(alpha) {
				b.WriteByte(alpha[i])
				b.WriteByte(alpha[j])
				b.WriteByte(alpha[k])
				n += 3
				if n > 1000 {
					b.WriteByte('\n')
					n = 0
				}
			}
		}
	}
	return b.String()
}

func TestPostHeapMultiEntry(t *testing.T) {
	// Test postHeap with chunks that have multiple entries.
	h := &postHeap{}
	h.addMem([]postEntry{
		makePostEntry(1, 0),
		makePostEntry(1, 1),
		makePostEntry(2, 0),
	})
	h.addMem([]postEntry{
		makePostEntry(1, 2),
		makePostEntry(3, 0),
	})

	var results []postEntry
	for {
		e := h.next()
		if e.trigram() == 1<<24-1 {
			break
		}
		results = append(results, e)
	}

	if len(results) != 5 {
		t.Errorf("got %d results, want 5", len(results))
	}

	// Verify sorted order.
	for i := 1; i < len(results); i++ {
		if results[i] < results[i-1] {
			t.Errorf("results not sorted: %v", results)
			break
		}
	}
}

func TestPostHeapEmpty(t *testing.T) {
	h := &postHeap{}
	if !h.empty() {
		t.Error("empty() = false on new heap")
	}
	h.addMem([]postEntry{makePostEntry(1, 0)})
	if h.empty() {
		t.Error("empty() = true after addMem")
	}
}

func TestPostHeapAddEmptySlice(t *testing.T) {
	h := &postHeap{}
	h.addMem([]postEntry{})
	if !h.empty() {
		t.Error("empty() = false after adding empty slice")
	}
}

func TestSiftUpDown(t *testing.T) {
	// Exercise siftUp and siftDown with multiple elements.
	h := &postHeap{}
	entries := []postEntry{
		makePostEntry(10, 0),
		makePostEntry(5, 0),
		makePostEntry(15, 0),
		makePostEntry(3, 0),
		makePostEntry(7, 0),
		makePostEntry(12, 0),
		makePostEntry(20, 0),
	}
	for _, e := range entries {
		h.addMem([]postEntry{e})
	}

	// Extract all and verify sorted order.
	var prev postEntry
	for !h.empty() {
		e := h.next()
		if e.trigram() == 1<<24-1 {
			break
		}
		if prev != 0 && e < prev {
			t.Errorf("not sorted: %v after %v", e, prev)
		}
		prev = e
	}
}

func TestPostEntryMethods(t *testing.T) {
	e := makePostEntry(0x123456, 0xABCDEF)
	if got := e.trigram(); got != 0x123456 {
		t.Errorf("trigram() = %#x, want %#x", got, 0x123456)
	}
	if got := e.fileid(); got != 0xABCDEF {
		t.Errorf("fileid() = %#x, want %#x", got, 0xABCDEF)
	}
}

func TestValidUTF8(t *testing.T) {
	tests := []struct {
		name string
		c1   uint32
		c2   uint32
		want bool
	}{
		// c1 < 0x80: ASCII byte
		{"ascii-ascii", 0x41, 0x42, true},
		{"ascii-continuation", 0x41, 0x80, false},
		{"ascii-multibyte-start", 0x41, 0xc0, true},
		{"ascii-too-high", 0x41, 0xf8, false},
		// c1 in [0x80, 0xc0): continuation byte
		{"cont-ascii", 0x80, 0x41, true},
		{"cont-cont", 0x80, 0x80, true},
		{"cont-multibyte-start", 0x80, 0xc0, true},
		{"cont-too-high", 0x80, 0xf8, false},
		// c1 in [0xc0, 0xf8): first of multi-byte
		{"multi-cont", 0xc0, 0x80, true},
		{"multi-ascii", 0xc0, 0x41, false},
		{"multi-multi", 0xc0, 0xc0, false},
		// c1 >= 0xf8: invalid
		{"invalid-high-c1", 0xf8, 0x80, false},
		{"invalid-higher-c1", 0xff, 0x00, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := validUTF8(tt.c1, tt.c2)
			if got != tt.want {
				t.Errorf("validUTF8(%#x, %#x) = %v, want %v", tt.c1, tt.c2, got, tt.want)
			}
		})
	}
}

func TestAddReaderError(t *testing.T) {
	// Test Add with a reader that returns a non-EOF error.
	f, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(f.Name())
	f.Close()

	ix := Create(f.Name())
	ix.Add("errfile", &errReader{err: os.ErrClosed, after: 5})
	ix.Flush()

	idx := Open(f.Name())
	defer idx.Close()

	// The file should be skipped due to the read error.
	if idx.numName != 0 {
		t.Errorf("numName = %d, want 0 (reader error should skip file)", idx.numName)
	}
}

// errReader returns some bytes then an error.
type errReader struct {
	err   error
	after int
	n     int
}

func (r *errReader) Read(p []byte) (int, error) {
	if r.n >= r.after {
		return 0, r.err
	}
	// Return one 'a' byte at a time.
	p[0] = 'a'
	r.n++
	return 1, nil
}

func TestBufWriterSmallBuffer(t *testing.T) {
	// Test bufWriter flush paths by creating a writer with a small buffer.
	f, err := os.CreateTemp("", "index-bufwriter-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(f.Name())

	bw := &bufWriter{
		name: f.Name(),
		file: f,
		buf:  make([]byte, 0, 8), // tiny buffer to force flushes
	}

	// writeTrigram: buffer has room for 8 bytes, write 6 bytes first to leave <3 room
	bw.writeUint32(0x12345678) // 4 bytes
	bw.writeByte(0xAA)         // 5 bytes
	bw.writeByte(0xBB)         // 6 bytes - only 2 bytes left, < 3
	bw.writeTrigram(0x010203)  // should flush then write

	// writeUint32: fill to 5 of 8 bytes, leaving <4 room
	bw.writeByte(0xCC)         // 1 byte in buffer
	bw.writeByte(0xDD)         // 2 bytes
	bw.writeByte(0xEE)         // 3 bytes
	bw.writeByte(0xFF)         // 4 bytes
	bw.writeByte(0x11)         // 5 bytes, only 3 left
	bw.writeUint32(0xAABBCCDD) // should flush then write

	// writeUvarint: fill to 4 of 8 bytes, leaving <5 room
	bw.writeByte(0x22)       // 1
	bw.writeByte(0x33)       // 2
	bw.writeByte(0x44)       // 3
	bw.writeByte(0x55)       // 4, only 4 left
	bw.writeUvarint(0x12345) // 3-byte varint, should flush first

	bw.flush()
	bw.Close()

	// Read back the file and verify exact bytes.
	got, err := os.ReadFile(f.Name())
	if err != nil {
		t.Fatal(err)
	}

	// Expected bytes from the writes above:
	//   writeUint32(0x12345678): 12 34 56 78
	//   writeByte(0xAA):         AA
	//   writeByte(0xBB):         BB
	//   writeTrigram(0x010203):  01 02 03
	//   writeByte(0xCC..0x11):   CC DD EE FF 11
	//   writeUint32(0xAABBCCDD): AA BB CC DD
	//   writeByte(0x22..0x55):   22 33 44 55
	//   writeUvarint(0x12345):   C5 C6 04  (little-endian varint)
	want := []byte{
		0x12, 0x34, 0x56, 0x78,
		0xAA,
		0xBB,
		0x01, 0x02, 0x03,
		0xCC, 0xDD, 0xEE, 0xFF, 0x11,
		0xAA, 0xBB, 0xCC, 0xDD,
		0x22, 0x33, 0x44, 0x55,
		0xC5, 0xC6, 0x04,
	}
	if diff := cmp.Diff(want, got); diff != "" {
		t.Errorf("file content mismatch (-want +got):\n%s", diff)
	}
}

func TestWriteUvarintSizeRanges(t *testing.T) {
	// Test each writeUvarint size branch by writing values then reading
	// them back via a round-trip through an index with enough files.
	f, err := os.CreateTemp("", "index-uvarint-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(f.Name())

	bw := &bufWriter{
		name: f.Name(),
		file: f,
		buf:  make([]byte, 0, 256),
	}

	values := []uint32{
		0, 127, // 1 byte
		128, (1 << 14) - 1, // 2 bytes
		1 << 14, (1 << 21) - 1, // 3 bytes
		1 << 21, (1 << 28) - 1, // 4 bytes
		1 << 28, 0xFFFFFFFF, // 5 bytes
	}
	for _, v := range values {
		bw.writeUvarint(v)
	}
	bw.flush()
	bw.Close()

	// Verify file was written (not empty).
	info, err := os.Stat(f.Name())
	if err != nil {
		t.Fatal(err)
	}
	if info.Size() == 0 {
		t.Error("file is empty after writing uvarints")
	}
}

func TestPostHeapStep(t *testing.T) {
	h := &postHeap{}

	ch := &postChunk{
		e: makePostEntry(1, 0),
		m: []postEntry{makePostEntry(2, 0), makePostEntry(3, 0)},
	}

	// Step should advance to the next entry.
	if !h.step(ch) {
		t.Error("step returned false, want true")
	}
	if ch.e != makePostEntry(2, 0) {
		t.Errorf("after step, e = %v, want entry(2,0)", ch.e)
	}

	if !h.step(ch) {
		t.Error("step returned false, want true")
	}
	if ch.e != makePostEntry(3, 0) {
		t.Errorf("after second step, e = %v, want entry(3,0)", ch.e)
	}

	// No more entries.
	if h.step(ch) {
		t.Error("step returned true on empty chunk")
	}
}

func TestPostHeapStepBadSort(t *testing.T) {
	h := &postHeap{}

	// Create a chunk where entries are out of order.
	ch := &postChunk{
		e: makePostEntry(5, 0),
		m: []postEntry{makePostEntry(3, 0)}, // 3 < 5, so old >= ch.e
	}

	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic from step with bad sort order")
		}
	}()
	h.step(ch)
}

func TestFlushPostToTempFile(t *testing.T) {
	// Exercise the flushPost code path by creating enough post entries
	// to trigger a flush.
	f, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.Remove(f.Name())
	out := f.Name()
	f.Close()

	// Use buildFlushIndex with doFlush=true to explicitly flush posts.
	files := map[string]string{
		"a": "hello world",
		"b": "world hello",
	}
	buildFlushIndex(out, nil, true, files)

	idx := Open(out)
	defer idx.Close()

	if idx.numName != 2 {
		t.Errorf("numName = %d, want 2", idx.numName)
	}

	// Verify data can be read back.
	if got := string(idx.Data(0)); got != "hello world" {
		t.Errorf("Data(0) = %q, want %q", got, "hello world")
	}
}
