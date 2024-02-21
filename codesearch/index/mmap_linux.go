// Copyright 2011 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package index

import (
	"os"
	"syscall"
)

func mmapFileInner(f *os.File, n int) (*mmapData, error) {
	data, err := syscall.Mmap(int(f.Fd()), 0, (n+4095)&^4095, syscall.PROT_READ, syscall.MAP_SHARED)
	if err != nil {
		return nil, err
	}
	return &mmapData{f, data[:n], data}, nil
}

func munmap(b []byte) error {
	return syscall.Munmap(b)
}
