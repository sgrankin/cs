// Copyright 2011 The Go Authors. All rights reserved.
// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-3-Clause

package index

import (
	"os"
	"slices"
	"testing"
)

func tri(x, y, z byte) uint32 {
	return uint32(x)<<16 | uint32(y)<<8 | uint32(z)
}

func equalList(x, y []uint32) bool {
	return slices.Equal(x, y)
}

// openTestIndex builds an index and returns the opened Index.
// Registers cleanup for the temp file and index close.
func openTestIndex(t *testing.T, paths []string, files map[string]string) *Index {
	t.Helper()
	out := createTestIndexFile(t, paths, files)
	ix := Open(out)
	t.Cleanup(func() { ix.Close() })
	return ix
}

// createTestIndexFile builds an index and returns the file path.
// Registers cleanup for the temp file. The caller is responsible for
// opening and closing the index.
func createTestIndexFile(t *testing.T, paths []string, files map[string]string) string {
	t.Helper()
	f, err := os.CreateTemp("", "index-test")
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { os.Remove(f.Name()) })
	f.Close()
	buildIndex(f.Name(), paths, files)
	return f.Name()
}
