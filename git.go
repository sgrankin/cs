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
	"strings"

	"github.com/go-git/go-git/v5"
	gitconf "github.com/go-git/go-git/v5/config"
	gitplumb "github.com/go-git/go-git/v5/plumbing"
	gitobj "github.com/go-git/go-git/v5/plumbing/object"
	gittrans "github.com/go-git/go-git/v5/plumbing/transport"
	"github.com/google/go-github/v57/github"
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

func GCRefs(repo *git.Repository, keep []string) error {
	log.Println("pruning unused refs")
	want := map[string]bool{}
	for _, ref := range keep {
		want[ref] = true
	}
	refs, err := repo.References()
	if err != nil {
		return fmt.Errorf("resolving references: %w", err)
	}
	defer refs.Close()
	var toRemove []gitplumb.ReferenceName
	if err := refs.ForEach(func(r *gitplumb.Reference) error {
		if r.Type() != gitplumb.HashReference {
			return nil
		}
		if !want[r.Name().String()] {
			toRemove = append(toRemove, r.Name())
		}
		return nil
	}); err != nil {
		return err
	}
	for _, r := range toRemove {
		log.Printf("removing ref %s", r.Short())
		if err := repo.Storer.RemoveReference(r); err != nil {
			return fmt.Errorf("removing %v: %w", r, err)
		}
	}
	return nil
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
func (f gitRepoFile) Size() int { return int(f.f.Size) }

func (f gitRepoFile) FileMode() fs.FileMode {
	// Ignoring err.  Submodules will return a zero mode.
	m, _ := f.f.Mode.ToOSFileMode()
	return m
}
