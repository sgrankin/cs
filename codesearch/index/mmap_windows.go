// Copyright 2011 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package index

import (
	"log"
	"os"
	"syscall"
	"unsafe"
)

func mmapFileInner(f *os.File, size int) (*mmapData, error) {
	h, err := syscall.CreateFileMapping(syscall.Handle(f.Fd()), nil, syscall.PAGE_READONLY, uint32(size>>32), uint32(size), nil)
	if err != nil {
		log.Fatalf("CreateFileMapping %s: %v", f.Name(), err)
	}

	addr, err := syscall.MapViewOfFile(h, syscall.FILE_MAP_READ, 0, 0, 0)
	if err != nil {
		log.Fatalf("MapViewOfFile %s: %v", f.Name(), err)
	}
	data := (*[1 << 30]byte)(unsafe.Pointer(addr))
	return mmapData{f, data[:size], data}
}

func munmap(b []byte) error {
	return syscall.UnmapViewOfFile(uintptr(unsafe.Pointer(&b[0])))
}
