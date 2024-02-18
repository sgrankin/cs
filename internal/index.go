package internal

import (
	"fmt"
	"log"
	"sort"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
	"github.com/go-git/go-git/v5/plumbing/object"

	"sgrankin.dev/cs/codesearch/index"
)

func ListRefs(repo *git.Repository) []string {
	ri, err := repo.References()
	if err != nil {
		log.Panicf("listing refs: %v", err)
	}
	defer ri.Close()
	var refs []string
	ri.ForEach(func(r *plumbing.Reference) error {
		if r.Type() == plumbing.HashReference {
			refs = append(refs, r.Name().Short())
		}
		return nil
	})
	return refs
}

func IndexRefs(ix *index.IndexWriter, repo *git.Repository, refs []string) error {
	paths := []string{}
	pathToRef := map[string]*plumbing.Reference{}
	for _, refName := range refs {
		// Translate paths to absolute paths so that we can generate the file list in sorted order.
		ref, err := repo.Reference(plumbing.ReferenceName("refs/"+refName), true)
		if err != nil {
			return fmt.Errorf("fetching %q: %w", refName, err)
		}
		path := refName + "@" + ref.Hash().String()
		paths = append(paths, path)
		pathToRef[path] = ref
	}

	sort.Strings(paths)
	ix.AddPaths(paths)

	for _, path := range paths {
		if err := IndexRef(ix, repo, pathToRef[path], path+"/+/"); err != nil {
			return fmt.Errorf("indexing %q: %w", path, err)
		}
	}
	return nil
}

// IndexRef adds the referenced tree in the repo to the index.
func IndexRef(ix *index.IndexWriter, repo *git.Repository, ref *plumbing.Reference, prefix string) error {
	commit, err := repo.CommitObject(ref.Hash())
	if err != nil {
		return err
	}
	tree, err := commit.Tree()
	if err != nil {
		return err
	}
	return tree.Files().ForEach(func(f *object.File) error {
		r, err := f.Blob.Reader()
		if err != nil {
			return err
		}
		// Encode the repo & revision into the file name.
		// The repo is used for search filtering, etc.
		ix.Add(prefix+f.Name, r)
		r.Close()
		return nil
	})
}
