package cs

import (
	"bytes"
	"fmt"
	"io"
	"io/fs"
	"log"
	"strings"

	"github.com/gogs/git-module"
)

func openGitRepo(gitPath string) (*git.Repository, error) {
	if gitPath == "" {
		return nil, fmt.Errorf("gitPath is empty")
	}
	// Init doesn't fail if run repeatedly,
	// and Open doesn't actually check there's a git repo,
	// so always init.
	err := git.Init(gitPath, git.InitOptions{Bare: true})
	if err != nil {
		return nil, err
	}
	return git.Open(gitPath)
}

// func GCRefs(repo *git.Repository, keep []string) error {
// 	log.Println("pruning unused refs")
// 	want := map[string]bool{}
// 	for _, ref := range keep {
// 		want[ref] = true
// 	}
// 	refs, err := repo.References()
// 	if err != nil {
// 		return fmt.Errorf("resolving references: %w", err)
// 	}
// 	defer refs.Close()
// 	var toRemove []gitplumb.ReferenceName
// 	if err := refs.ForEach(func(r *gitplumb.Reference) error {
// 		if r.Type() != gitplumb.HashReference {
// 			return nil
// 		}
// 		if !want[r.Name().String()] {
// 			toRemove = append(toRemove, r.Name())
// 		}
// 		return nil
// 	}); err != nil {
// 		return err
// 	}
// 	for _, r := range toRemove {
// 		log.Printf("removing ref %s", r.Short())
// 		if err := repo.Storer.RemoveReference(r); err != nil {
// 			return fmt.Errorf("removing %v: %w", r, err)
// 		}
// 	}
// 	return nil
// }

type gitRepo struct {
	repo      *git.Repository
	remoteURL string
	remoteRef string
	localRef  string
}

func (r *gitRepo) Name() string     { return r.localRef }
func (r *gitRepo) Version() Version { return r.ref() }

func (r *gitRepo) Files(yield func(RepoFile) error) error {
	ref := r.ref()
	if ref == "" {
		// A missing ref has no files.
		// This is not an error as this is also the case when the repo is simply empty.
		return nil
	}
	tree, err := r.repo.LsTree(ref)
	if err != nil {
		return fmt.Errorf("commit not found: %v", err)
	}
	// XXX this only lists the top directory? wtf...
	entries, err := tree.Entries()
	if err != nil {
		return fmt.Errorf("tree not found: %v", err)
	}
	for _, entr := range entries {
		if !entr.IsBlob() {
			continue
		}
		if err := yield(gitRepoFile{entr.Blob()}); err != nil {
			return err
		}
	}
	return nil
}

func (r *gitRepo) Refresh() (Version, error) {
	spec := "+" + r.remoteRef + ":refs/" + r.localRef
	log.Printf("fetching %q -> %q", r.Name(), spec)
	err := r.repo.Fetch(git.FetchOptions{CommandOptions: git.CommandOptions{Args: []string{
		"--depth=1", "--update-shallow", "--no-tags",
		"--negotiation-tip=refs/" + r.localRef + "*", // Glob to ignore the ref being missing.
		r.remoteURL, spec,
	}}})
	switch {
	case err == nil:
		return r.Version(), nil
	case
		strings.Contains(err.Error(), "exit status 128") && strings.Contains(err.Error(), "fatal: couldn't find remote ref"):
		// Empty repo, probably.  Ignore.
		log.Printf("ignoring git error: %v", err)
		return "", nil
	default:
		return "", fmt.Errorf("fetching: %v", err)
	}
}

func (r *gitRepo) ref() string {
	commit, err := r.repo.ShowRefVerify("refs/" + r.localRef)
	if err != nil {
		log.Printf("Missing reference %q in git repo %v: %v", r.localRef, r.repo, err)
		return ""
	}
	return commit
}

type gitRepoFile struct{ f *git.Blob }

func (f gitRepoFile) Path() string { return f.f.Name() }
func (f gitRepoFile) Reader() (io.Reader, error) {
	bs, err := f.f.Bytes()
	if err != nil {
		return nil, err
	}
	return bytes.NewBuffer(bs), nil
}
func (f gitRepoFile) Size() int { return f.Size() }

func (f gitRepoFile) FileMode() fs.FileMode {
	// Ignoring err.  Submodules will return a zero mode.
	return fs.FileMode(f.f.Mode())
}
