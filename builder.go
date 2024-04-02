package cs

import (
	"fmt"
	"io"
	"io/fs"
	"log"
	"maps"
	"os"
	"sort"
	"strings"

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

func newIndexBuilder() *indexBuilder {
	return &indexBuilder{}
}

// build creates a new index at `path` with the given `repos`.
func (b *indexBuilder) build(path string, repos []Repo) error {
	log.Printf("Building index at %q", path)
	wix := index.Create(path)
	var paths []string
	pathToRepo := map[string]Repo{}
	for _, repo := range repos {
		path := repo.Name() + "@" + repo.Version()
		paths = append(paths, path)
		pathToRepo[path] = repo
	}
	sort.Strings(paths)
	wix.AddPaths(paths)
	for _, path := range paths {
		repo := pathToRepo[path]
		prefix := path + "/+/"
		if err := repo.Files(func(rf RepoFile) error {
			r := rf.Reader()
			defer r.Close()
			wix.Add(prefix+rf.Path(), r)
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

// rebuildIfNeeded creates a new index in place of the old one if it needs to be updated.
//
// The `paths` are used to check if updates are needed, returning nil if not.
//
// To check if updates are needed, repos are compared by version to what's currently in the index
// The new index is placed where the existing index resides, but the actual Index is not closed
// and can continue to be used until the new index is swapped in.
func (b *indexBuilder) rebuildIfNeeded(ix *index.Index, repos []Repo) *index.Index {
	versions := map[string]Version{}
	for _, p := range ix.Paths() {
		repo, version, _ := strings.Cut(p, "@")
		versions[repo] = version
	}
	newVersions := map[string]Version{}
	for _, repo := range repos {
		newVersions[repo.Name()] = repo.Version()
	}
	if maps.Equal(versions, newVersions) {
		return nil
	}
	return b.rebuild(ix, repos)
}

func (b *indexBuilder) rebuild(ix *index.Index, repos []Repo) *index.Index {
	log.Printf("Rebuilding index %q", ix.Path)
	tempIndexPath := ix.Path + "~"
	if err := b.build(tempIndexPath, repos); err != nil {
		log.Printf("Rebuild failed: %v", err)
		return nil
	}
	os.Rename(tempIndexPath, ix.Path)
	return index.Open(ix.Path)
}
