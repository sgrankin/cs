package cs

import (
	"context"
	"fmt"
	"io/fs"
	"log"
	"net/url"
	"path"
	"strings"

	"github.com/google/go-github/v57/github"

	gg "github.com/sgrankin/git2go"
)

func openGitRepo(gitPath string) (*gg.Repository, error) {
	if gitPath == "" {
		return nil, fmt.Errorf("gitPath is empty")
	}
	repo, err := gg.OpenRepository(gitPath)
	if gg.IsErrorCode(err, gg.ErrorCodeNotFound) {
		repo, err = gg.InitRepository(gitPath, true)
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
						ListOptions: github.ListOptions{PerPage: 100, Page: page}})
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
						ListOptions: github.ListOptions{PerPage: 100, Page: page}})
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
	repo      *gg.Repository
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
	return ref.Target().String()
}

func (r *gitRepo) Files(yield func(RepoFile) error) error {
	ref := r.ref()
	if ref == nil {
		// A missing ref has no files.
		// This is not an error as this is also the case when the repo is simply empty.
		return nil
	}
	commit, err := r.repo.LookupCommit(ref.Target())
	if err != nil {
		return fmt.Errorf("commit not found: %v", err)
	}
	tree, err := commit.Tree()
	if err != nil {
		return fmt.Errorf("tree not found: %v", err)
	}
	return tree.Walk(func(s string, te *gg.TreeEntry) error {
		if te.Type == gg.ObjectBlob {
			return yield(gitRepoFile{r.repo, s, te})
		}
		return nil
	})
}

func (r *gitRepo) Refresh() (Version, error) {
	spec := "+" + r.remoteRef + ":refs/" + r.localRef
	log.Printf("fetching %q -> %q", r.Name(), spec)
	remote, err := r.repo.Remotes.CreateAnonymous(r.remoteURL)
	if err != nil {
		return "", err
	}
	err = remote.Fetch([]string{spec}, &gg.FetchOptions{DownloadTags: gg.DownloadTagsNone}, "")
	switch {
	case err == nil:
	default:
		return "", fmt.Errorf("fetching: %v", err)
	}
	return r.Version(), nil
}

func (r *gitRepo) ref() *gg.Reference {
	ref, err := r.repo.References.Lookup("refs/" + r.localRef)
	if err != nil {
		log.Printf("Missing reference %q in git repo %v: %v", r.localRef, r.repo.Path(), err)
		return nil
	}
	return ref
}

type gitRepoFile struct {
	repo *gg.Repository
	root string
	blob *gg.TreeEntry
}

func (f gitRepoFile) Path() string { return path.Join(f.root, f.blob.Name) }
func (f gitRepoFile) Contents() ([]byte, error) {
	blob, err := f.repo.LookupBlob(f.blob.Id)
	if err != nil {
		return nil, err
	}
	return blob.Contents(), nil
}

func (f gitRepoFile) FileMode() fs.FileMode {
	// Ignoring err.  Submodules will return a zero mode.
	return fs.FileMode(f.blob.Filemode)
}
