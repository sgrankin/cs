// Copyright 2011 The Go Authors. All rights reserved.
// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-3-Clause

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
