package index

import (
	"errors"
	"log"
	"os"
	"runtime"
)

// An mmapData is mmap'ed read-only data from a file.
type mmapData struct {
	f   *os.File
	d   []byte
	raw []byte
}

// mmap maps the given file into memory.
func mmap(file string) *mmapData {
	f, err := os.Open(file)
	if err != nil {
		log.Panic(err)
	}
	return mmapFile(f)
}

func mmapFile(f *os.File) *mmapData {
	st, err := f.Stat()
	if err != nil {
		log.Panic(err)
	}
	size := st.Size()
	if int64(int(size+4095)) != size+4095 {
		log.Panicf("%s: too large for mmap", f.Name())
	}
	n := int(size)
	if n == 0 {
		return &mmapData{f, nil, nil}
	}

	data, err := mmapFileInner(f, n)
	if err != nil {
		log.Panicf("mmap %s: %v", f.Name(), err)
	}
	runtime.SetFinalizer(data, func(data *mmapData) { data.Close() })
	return data
}

func (m *mmapData) Close() error {
	err := errors.Join(
		munmap(m.raw),
		m.f.Close())
	runtime.SetFinalizer(m, nil)
	return err
}
