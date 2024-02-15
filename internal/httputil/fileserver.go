package httputil

import (
	"crypto/sha256"
	"embed"
	"encoding/base64"
	"io"
	"io/fs"
	"net/http"
	"path/filepath"
	"strings"
	"sync"
)

// EmbedFileServer creates an HTTP static file server on the OS.
//
// The main distinction from http.FileServerFS is that it calculates and caches hashes for the underlying file system.
// An embed.FS is required since it can be assumed immutable and fixed, so hashes are cached indefinitely.
func EmbedFileServer(root embed.FS) http.Handler {
	fs := &embedFS{FS: root}
	h := http.FileServerFS(fs)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		name := r.URL.Path
		f, err := fs.Open(name)
		if err == nil {
			if ff, ok := f.(hashedEmbedFile); ok {
				w.Header().Set("Etag", `"`+ff.ContentHash()+`"`)
			}
			f.Close()
		}
		h.ServeHTTP(w, r)
	})
}

type embedFS struct {
	embed.FS
	hashes sync.Map
}

func (fs *embedFS) Open(name string) (fs.File, error) {
	name = filepath.Clean(name)
	if name == "/" {
		name = "."
	} else {
		name = strings.TrimPrefix(name, "/")
	}
	f, err := fs.FS.Open(name)
	if err != nil {
		return nil, err
	}
	if ff, ok := f.(io.ReadSeeker); ok {
		// This is a file.  We can wrap it with something that tracks a hash.
		hash, found := fs.hashes.Load(name)
		if !found {
			h := sha256.New()
			if _, err := io.Copy(h, ff); err != nil {
				return nil, err
			}
			hash = base64.RawURLEncoding.EncodeToString(h.Sum(nil))
			fs.hashes.Store(name, hash)
			ff.Seek(0, io.SeekStart)
		}
		f = &hashedFile{f.(embedFile), hash.(string)}
	}
	return f, nil
}

type embedFile interface {
	fs.File
	io.Seeker // http.File will test for this.
	io.ReaderAt
}
type hashedEmbedFile interface {
	embedFile
	ContentHash() string
}

type hashedFile struct {
	embedFile
	hash string
}

func (f *hashedFile) ContentHash() string {
	return f.hash
}
