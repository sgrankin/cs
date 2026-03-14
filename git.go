// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package cs

import (
	"context"
	"errors"
	"fmt"
	"io"
	"io/fs"
	"log"
	"net/url"
	"os"
	"path"
	"regexp"
	"strings"
	"time"

	"github.com/go-git/go-git/v5"
	gitconf "github.com/go-git/go-git/v5/config"
	gitplumb "github.com/go-git/go-git/v5/plumbing"
	gitobj "github.com/go-git/go-git/v5/plumbing/object"
	gittrans "github.com/go-git/go-git/v5/plumbing/transport"
	"github.com/google/go-github/v72/github"
)

func openGitRepo(gitPath string) (*git.Repository, error) {
	if gitPath == "" {
		return nil, fmt.Errorf("gitPath is empty")
	}
	repo, err := git.PlainOpen(gitPath)
	if err != nil && errors.Is(err, git.ErrRepositoryNotExists) {
		repo, err = git.PlainInit(gitPath, true)
	}
	return repo, err
}

func ResolveFetchSpecs(client *github.Client, specs []GitHubSourceConfig, auth *url.Userinfo) ([]RepoConfig, error) {
	ctx := context.Background()
	urlWithAuth := func(u string) string {
		ur, err := url.Parse(u)
		if err != nil {
			log.Panicf("could not parse URL: %q", u)
		}
		ur.User = auth
		return ur.String()
	}
	var result []RepoConfig
	appendRepo := func(spec GitHubSourceConfig, repo *github.Repository) {
		ref := "HEAD"
		if spec.Ref != "" {
			ref = spec.Ref
		}
		if (*repo.Name)[0] == '.' {
			return // Hidden repo, and technically an invalid refspec.  Ignore.
		}
		if (repo.Archived != nil && *repo.Archived && !spec.Archived) ||
			(repo.Fork != nil && *repo.Fork && !spec.Forks) {
			return
		}
		if spec.Reject != "" {
			match, err := regexp.MatchString(spec.Reject, *repo.FullName)
			if err != nil {
				log.Panicf("Failure loading regexp %q: %v", spec.Reject, err)
			}
			if match {
				return
			}
		}
		result = append(result, RepoConfig{
			Name:      "github.com/" + *repo.FullName,
			RemoteURL: urlWithAuth(*repo.CloneURL),
			RemoteRef: ref,
		})
	}
	for _, spec := range specs {
		log.Printf("Resolving GitHub spec %+v", spec)
		switch {
		case spec.Org != "":
			for page := 1; page != 0; {
				repos, response, err := client.Repositories.
					ListByOrg(ctx, spec.Org, &github.RepositoryListByOrgOptions{
						ListOptions: github.ListOptions{PerPage: 100, Page: page},
					})
				if err != nil {
					return nil, err
				}
				for _, repo := range repos {
					appendRepo(spec, repo)
				}
				page = response.NextPage
			}
		case spec.User != "":
			for page := 1; page != 0; {
				repos, response, err := client.Repositories.
					ListByUser(ctx, spec.User, &github.RepositoryListByUserOptions{
						ListOptions: github.ListOptions{PerPage: 100, Page: page},
					})
				if err != nil {
					return nil, err
				}
				for _, repo := range repos {
					appendRepo(spec, repo)
				}
				page = response.NextPage
			}
		case spec.Repo != "":
			owner, repoName, found := strings.Cut(spec.Repo, "/")
			if !found {
				return nil, fmt.Errorf("expected owner/repo in %q", spec.Repo)
			}
			repo, _, err := client.Repositories.Get(ctx, owner, repoName)
			if err != nil {
				return nil, err
			}
			appendRepo(spec, repo)
		}
	}
	return result, nil
}

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

func (r *gitRepo) FS() (fs.FS, error) {
	ref := r.ref()
	if ref == nil {
		// A missing ref has no files.
		// This is not an error as this is also the case when the repo is simply empty.
		return emptyFS{}, nil
	}
	commit, err := r.repo.CommitObject(ref.Hash())
	if err != nil {
		return nil, fmt.Errorf("commit not found: %v", err)
	}
	tree, err := commit.Tree()
	if err != nil {
		return nil, fmt.Errorf("tree not found: %v", err)
	}
	return gitTreeFS{tree}, nil
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

// gitTreeFS implements fs.FS over a go-git Tree.
type gitTreeFS struct{ tree *gitobj.Tree }

func (g gitTreeFS) Open(name string) (fs.File, error) {
	if !fs.ValidPath(name) {
		return nil, &fs.PathError{Op: "open", Path: name, Err: fs.ErrInvalid}
	}
	if name == "." {
		return &gitDir{tree: g.tree, name: "."}, nil
	}
	// Try as file first.
	f, err := g.tree.File(name)
	if err == nil {
		r, err := f.Blob.Reader()
		if err != nil {
			return nil, err
		}
		return &gitFile{name: name, size: f.Size, r: r}, nil
	}
	// Try as directory.
	t, err := g.tree.Tree(name)
	if err != nil {
		return nil, &fs.PathError{Op: "open", Path: name, Err: fs.ErrNotExist}
	}
	return &gitDir{tree: t, name: name}, nil
}

type gitFile struct {
	name string
	size int64
	r    io.ReadCloser
}

func (f *gitFile) Stat() (fs.FileInfo, error) {
	return gitFileInfo{name: path.Base(f.name), size: f.size}, nil
}
func (f *gitFile) Read(b []byte) (int, error) { return f.r.Read(b) }
func (f *gitFile) Close() error               { return f.r.Close() }

type gitDir struct {
	tree *gitobj.Tree
	name string
	pos  int // position in Entries for ReadDir
}

func (d *gitDir) Stat() (fs.FileInfo, error) {
	return gitFileInfo{name: path.Base(d.name), isDir: true}, nil
}
func (d *gitDir) Read([]byte) (int, error) {
	return 0, &fs.PathError{Op: "read", Path: d.name, Err: errors.New("is a directory")}
}
func (d *gitDir) Close() error { return nil }

func (d *gitDir) ReadDir(n int) ([]fs.DirEntry, error) {
	entries := d.tree.Entries
	if d.pos >= len(entries) {
		if n <= 0 {
			return nil, nil
		}
		return nil, io.EOF
	}
	readAll := n <= 0
	if readAll || d.pos+n > len(entries) {
		n = len(entries) - d.pos
	}
	result := make([]fs.DirEntry, n)
	for i := range n {
		e := entries[d.pos+i]
		mode, _ := e.Mode.ToOSFileMode()
		var size int64
		if !mode.IsDir() {
			if f, err := d.tree.TreeEntryFile(&e); err == nil {
				size = f.Size
			}
		}
		result[i] = gitDirEntry{name: e.Name, mode: mode, size: size}
	}
	d.pos += n
	// fs.ReadDirFile contract: EOF is only returned for batched reads (n > 0).
	// When n <= 0 (read all), callers expect nil on success.
	if d.pos >= len(entries) && !readAll {
		return result, io.EOF
	}
	return result, nil
}

type gitFileInfo struct {
	name  string
	size  int64
	isDir bool
}

func (i gitFileInfo) Name() string { return i.name }
func (i gitFileInfo) Size() int64  { return i.size }
func (i gitFileInfo) Mode() fs.FileMode {
	if i.isDir {
		return fs.ModeDir | 0o555
	}
	return 0o444
}
func (i gitFileInfo) ModTime() (t time.Time) { return }
func (i gitFileInfo) IsDir() bool            { return i.isDir }
func (i gitFileInfo) Sys() any               { return nil }

type gitDirEntry struct {
	name string
	mode fs.FileMode
	size int64
}

func (e gitDirEntry) Name() string      { return e.name }
func (e gitDirEntry) IsDir() bool       { return e.mode.IsDir() }
func (e gitDirEntry) Type() fs.FileMode { return e.mode.Type() }
func (e gitDirEntry) Info() (fs.FileInfo, error) {
	return gitFileInfo{name: e.name, size: e.size, isDir: e.IsDir()}, nil
}

// emptyFS is an fs.FS with no files.
type emptyFS struct{}

func (emptyFS) Open(name string) (fs.File, error) {
	if name == "." {
		return &emptyDir{}, nil
	}
	return nil, &fs.PathError{Op: "open", Path: name, Err: fs.ErrNotExist}
}

type emptyDir struct{}

func (emptyDir) Stat() (fs.FileInfo, error) { return gitFileInfo{name: ".", isDir: true}, nil }
func (emptyDir) Read([]byte) (int, error)   { return 0, io.EOF }
func (emptyDir) Close() error               { return nil }
func (emptyDir) ReadDir(n int) ([]fs.DirEntry, error) {
	if n > 0 {
		return nil, io.EOF
	}
	return nil, nil
}
