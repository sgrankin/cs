package cs

import (
	"fmt"
	"io"
	"io/fs"
	"log"

	"sgrankin.dev/cs/codesearch/index"
)

type RepoFile interface {
	Path() string
	Size() int
	FileMode() fs.FileMode
	Reader() io.ReadCloser
}

type Repo interface {
	// Name is the unique ref name this Repo tracks in the underlying repository.
	Name() string

	// For git, Version yields the SHA1 of the commit.
	Version() Version

	// Files yields all of the files in the tree at the current Version.
	// For git, Refresh may be called concurrently, unless it deletes underlying objects.
	Files(yield func(RepoFile) error) error

	// Refresh fetches the remote and updates the local tracking ref.
	Refresh() (Version, error)
}

type indexBuilder struct{}

// BuildIndex creates a new index at `path` with the given `repos`.
func BuildIndex(path string, repos []Repo) error {
	log.Printf("Building index at %q", path)
	wix := index.Create(path)
	for _, repo := range repos {
		if err := repo.Files(func(rf RepoFile) error {
			r := rf.Reader()
			defer r.Close()
			wix.Add(rf.Path(), r)
			return nil
		}); err != nil {
			wix.Close()
			return fmt.Errorf("failed building index: %w", err)
		}
	}
	wix.Flush()
	wix.Close()
	return nil
}
