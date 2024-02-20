package cs

import (
	"io"
	"io/fs"
	"log"
	"maps"
	"os"
	"sort"
	"strings"

	"github.com/go-git/go-git/v5"

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

type indexBuilder struct {
	ix       *index.Index
	versions map[string]Version
}

// ix is used to determine what the current versions are.
func newIndexBuilder(
	ix *index.Index,
	git *git.Repository,
) *indexBuilder {
	b := &indexBuilder{
		ix:       ix,
		versions: map[string]Version{},
	}
	for _, p := range ix.Paths() {
		repo, version, _ := strings.Cut(p, "@")
		b.versions[repo] = version
	}
	return b
}

// Build creates a new index in place of the old one if it needs to be updated.
//
// Returns nil if no updates are needed.
// To check if updates are needed, repos are compared by version to what's currently in the index
// The new index is placed where the existing index resides, but the actual Index is not closed
// and can continue to be used until the new index is swapped in.
func (b *indexBuilder) Build(repos []Repo) *index.Index {
	newVersions := map[string]Version{}
	for _, repo := range repos {
		newVersions[repo.Name()] = repo.Version()
	}
	if maps.Equal(b.versions, newVersions) {
		return nil
	}
	ix := b.rebuildIndex(repos)
	if ix != nil {
		b.ix = ix
	}
	return ix
}

func (b *indexBuilder) rebuildIndex(repos []Repo) *index.Index {
	log.Printf("Rebuilding index %q", b.ix.Path)
	tempIndexPath := b.ix.Path + "~"
	ix := index.Create(tempIndexPath)

	var paths []string
	pathToRepo := map[string]Repo{}
	for _, repo := range repos {
		path := repo.Name() + "@" + repo.Version()
		paths = append(paths, path)
		pathToRepo[path] = repo
	}
	sort.Strings(paths)
	ix.AddPaths(paths)
	for _, path := range paths {
		repo := pathToRepo[path]
		prefix := path + "/+/"
		if err := repo.Files(func(rf RepoFile) error {
			r := rf.Reader()
			defer r.Close()
			ix.Add(prefix+rf.Path(), r)
			return nil
		}); err != nil {
			log.Printf("Failed to build a new index: %v", err)
			ix.Close()
			return nil
		}
	}
	ix.Flush()
	ix.Close()

	os.Rename(tempIndexPath, b.ix.Path)
	return index.Open(b.ix.Path)
}
