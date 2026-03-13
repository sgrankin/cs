package cs

import (
	"fmt"
	"io/fs"

	"sgrankin.dev/cs/codesearch/index"
)

// Repo represents a version-controlled repository that can be indexed.
type Repo interface {
	// Name is the unique ref name this Repo tracks in the underlying repository.
	Name() string

	// For git, Version yields the SHA1 of the commit.
	Version() Version

	// FS returns a filesystem view of the repo at the current Version.
	FS() (fs.FS, error)

	// Refresh fetches the remote and updates the local tracking ref.
	Refresh() (Version, error)
}

// BuildIndexFromFS creates a search index at indexPath from all regular files in fsys.
func BuildIndexFromFS(indexPath string, fsys fs.FS) error {
	wix := index.Create(indexPath)
	err := fs.WalkDir(fsys, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return err
		}
		f, err := fsys.Open(path)
		if err != nil {
			return err
		}
		defer f.Close()
		wix.Add(path, f)
		return nil
	})
	if err != nil {
		wix.Close()
		return fmt.Errorf("building index: %w", err)
	}
	wix.Flush()
	wix.Close()
	return nil
}
