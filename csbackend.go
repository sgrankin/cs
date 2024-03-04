package cs

import (
	"errors"
	"fmt"
	"io"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/go-git/go-git/v5"
	gitconf "github.com/go-git/go-git/v5/config"
	gitplumb "github.com/go-git/go-git/v5/plumbing"
	gitobj "github.com/go-git/go-git/v5/plumbing/object"
	gittrans "github.com/go-git/go-git/v5/plumbing/transport"

	"sgrankin.dev/cs/codesearch/index"
)

type Version = string

type searchIndex struct {
	*indexSearcher
	*indexBuilder
	*repoSyncer
	name string
	done chan bool
}

func NewSearchIndex(cfg IndexConfig, pollInterval time.Duration, githubToken string) *searchIndex {
	if cfg.Name == "" {
		cfg.Name = filepath.Base(cfg.Path)
	}
	if err := os.MkdirAll(cfg.Path, 0777); err != nil {
		log.Panicf("creating %q: %v", cfg.Path, err)
	}

	indexName := filepath.Join(cfg.Path, "csindex")
	if _, err := os.Stat(indexName); err != nil {
		// Create an empty index as a placeholder.
		index.Create(indexName).Flush()
	}
	ix := index.Open(indexName)

	gitPath := filepath.Join(cfg.Path, "git")
	// Open the repo to make sure it's valid... but then don't use it.
	// Background changes (e.g. from maintenance) may cause go-git repos to become non-functional,
	// so we reopen the repo every time we index.
	_, err := openGitRepo(gitPath)
	if err != nil {
		log.Panicf("could not open git repo: %v", err)
	}

	searcher := newIndexSearcher(ix)
	builder := newIndexBuilder(ix)
	syncer := newRepoSyncer(gitPath, githubToken, cfg.Repos, cfg.RepoSources)

	done := make(chan bool, 1)
	si := &searchIndex{searcher, builder, syncer, cfg.Name, done}

	go si.refreshLoop(pollInterval)
	return si
}

func (si *searchIndex) refreshLoop(pollInterval time.Duration) {
	ticker := time.NewTicker(pollInterval)
	defer ticker.Stop()
	si.refresh()
	for {
		select {
		case <-si.done:
			return
		case <-ticker.C:
			si.refresh()
		}
	}
}

func (si *searchIndex) refresh() {
	log.Printf("Refreshing local repositories for %q", si.name)
	repos, err := si.repoSyncer.Refresh()
	if err != nil {
		log.Printf("Repo sync failed: %v", err)
		return
	}
	log.Printf("Maybe rebuilding index for %q", si.name)
	if ix := si.indexBuilder.Build(repos); ix != nil {
		log.Printf("Updating index %q", si.name)
		ix = si.indexSearcher.swapIndex(ix)
		if err := ix.Close(); err != nil {
			log.Printf("Error closing old index: %v", err)
		}
	}
}

func (si *searchIndex) Name() string { return si.name }
func (si *searchIndex) Close()       { si.done <- true }

type gitRepo struct {
	repo      *git.Repository
	remoteURL string
	remoteRef string
	localRef  string
}

func (r *gitRepo) Name() string { return r.localRef }

func (r *gitRepo) Version() Version {
	ref := r.ref()
	if ref == nil {
		return ""
	}
	return ref.Hash().String()
}

func (r *gitRepo) Files(yield func(RepoFile) error) error {
	ref := r.ref()
	if ref == nil {
		// A missing ref has no files.
		// This is not an error as this is also the case when the repo is simply empty.
		return nil
	}
	commit, err := r.repo.CommitObject(ref.Hash())
	if err != nil {
		return fmt.Errorf("commit not found: %v", err)
	}
	tree, err := commit.Tree()
	if err != nil {
		return fmt.Errorf("tree not found: %v", err)
	}
	return tree.Files().ForEach(func(f *gitobj.File) error {
		return yield(gitRepoFile{f})
	})
}

func (r *gitRepo) Refresh() (Version, error) {
	spec := gitconf.RefSpec("+" + r.remoteRef + ":refs/" + r.localRef)
	log.Printf("fetching %q -> %q", r.Name(), spec)
	err := git.NewRemote(r.repo.Storer, &gitconf.RemoteConfig{
		URLs: []string{r.remoteURL},
	}).Fetch(&git.FetchOptions{
		RefSpecs: []gitconf.RefSpec{spec},
		Depth:    1,
		Progress: os.Stdout,
	})
	switch {
	case err == nil:
	case errors.Is(err, git.NoErrAlreadyUpToDate):
	case errors.Is(err, gittrans.ErrEmptyRemoteRepository):
	default:
		return "", fmt.Errorf("fetching: %v", err)
	}
	return r.Version(), nil
}

func (r *gitRepo) ref() *gitplumb.Reference {
	ref, err := r.repo.Reference(gitplumb.ReferenceName("refs/"+r.localRef), true)
	if err != nil {
		log.Printf("Missing reference %q in git repo %v: %v", r.localRef, r.repo, err)
		return nil
	}
	return ref
}

type gitRepoFile struct{ f *gitobj.File }

func (f gitRepoFile) Path() string { return f.f.Name }
func (f gitRepoFile) Reader() io.ReadCloser {
	r, _ := f.f.Blob.Reader()
	return r
}
func (f gitRepoFile) Size() int { return f.Size() }

func (f gitRepoFile) FileMode() fs.FileMode {
	// Ignoring err.  Submodules will return a zero mode.
	m, _ := f.f.Mode.ToOSFileMode()
	return m
}
