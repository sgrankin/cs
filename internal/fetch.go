package internal

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/go-git/go-git/v5"
	gitconf "github.com/go-git/go-git/v5/config"
	gitplumbing "github.com/go-git/go-git/v5/plumbing"
	gittransport "github.com/go-git/go-git/v5/plumbing/transport"
	githttp "github.com/go-git/go-git/v5/plumbing/transport/http"
	"github.com/google/go-github/v57/github"

	"sgrankin.dev/cs"
)

func OpenGitRepo(gitPath string) (*git.Repository, error) {
	if gitPath == "" {
		return nil, fmt.Errorf("gitPath is empty")
	}
	repo, err := git.PlainOpen(gitPath)
	if err != nil && errors.Is(err, git.ErrRepositoryNotExists) {
		repo, err = git.PlainInit(gitPath, true)
	}
	return repo, err
}

func FetchToGitRepo(ctx context.Context, repo *git.Repository, toFetch []fetchTask) error {
	for _, spec := range toFetch {
		if err := fetchRepo(ctx, repo, spec); err != nil {
			return fmt.Errorf("fetching %q: %w", spec.URL, err)
		}
	}

	return nil
}

func GCRefs(repo *git.Repository, toFetch []fetchTask) error {
	log.Println("pruning unused refs")
	want := map[string]bool{}
	for _, spec := range toFetch {
		want[spec.Dst] = true
	}
	refs, err := repo.References()
	if err != nil {
		return fmt.Errorf("resolving references: %w", err)
	}
	defer refs.Close()
	var toRemove []gitplumbing.ReferenceName
	if err := refs.ForEach(func(r *gitplumbing.Reference) error {
		if r.Type() != gitplumbing.HashReference {
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

func ResolveFetchSpecs(ctx context.Context, specs []cs.FetchSpec, gitHubToken string) ([]fetchTask, error) {
	var auth gittransport.AuthMethod
	client := github.NewClient(nil)
	if gitHubToken != "" {
		client = client.WithAuthToken(gitHubToken)
		auth = &githttp.BasicAuth{Username: "git", Password: gitHubToken}
	}
	var toFetch []fetchTask
	for _, spec := range specs {
		if spec.GitHub != nil {
			gh := spec.GitHub
			ref := "HEAD"
			if gh.Ref != "" {
				ref = gh.Ref
			}
			switch {
			case gh.Org != "":
				for page := 1; ; page++ {
					repos, response, err := client.
						Repositories.
						ListByOrg(ctx, gh.Org, &github.RepositoryListByOrgOptions{
							ListOptions: github.ListOptions{PerPage: 100, Page: page}})
					if err != nil {
						return nil, err
					}
					for _, repo := range repos {
						if (repo.Archived != nil && *repo.Archived && !gh.Archived) ||
							(repo.Fork != nil && *repo.Fork && !gh.Forks) {
							continue
						}
						toFetch = append(toFetch, fetchTask{
							URL:  *repo.CloneURL,
							Auth: auth,
							Src:  ref,
							Dst:  "refs/github.com/" + *repo.FullName,
						})
					}
					if response.NextPage == 0 {
						break
					}
				}
			case gh.User != "":
				for page := 1; ; page++ {
					repos, response, err := client.
						Repositories.
						ListByUser(ctx, gh.User, &github.RepositoryListByUserOptions{
							ListOptions: github.ListOptions{PerPage: 100, Page: page}})
					if err != nil {
						return nil, err
					}
					for _, repo := range repos {
						if (repo.Archived != nil && *repo.Archived && !gh.Archived) ||
							(repo.Fork != nil && *repo.Fork && !gh.Forks) {
							continue
						}
						toFetch = append(toFetch, fetchTask{
							URL:  *repo.CloneURL,
							Auth: auth,
							Src:  ref,
							Dst:  "refs/github.com/" + *repo.FullName,
						})
					}
					if response.NextPage == 0 {
						break
					}
				}
			case gh.Repo != "":
				owner, repoName, found := strings.Cut(gh.Repo, "/")
				if !found {
					return nil, fmt.Errorf("expected owner/repo in %q", gh.Repo)
				}
				repo, _, err := client.Repositories.Get(ctx, owner, repoName)
				if err != nil {
					return nil, err
				}
				if (repo.Archived != nil && *repo.Archived && !gh.Archived) ||
					(repo.Fork != nil && *repo.Fork && !gh.Forks) {
					continue
				}
				toFetch = append(toFetch, fetchTask{
					URL:  *repo.CloneURL,
					Auth: auth,
					Src:  ref,
					Dst:  "refs/github.com/" + *repo.FullName,
				})
			}
		}
	}
	return toFetch, nil
}

type fetchTask struct {
	URL      string
	Auth     gittransport.AuthMethod
	Src, Dst string
}

func fetchRepo(ctx context.Context, localRepo *git.Repository, spec fetchTask) error {
	refSpec := "+" + spec.Src + ":" + spec.Dst
	log.Printf("fetching %s %s", spec.URL, refSpec)
	err := git.
		NewRemote(localRepo.Storer, &gitconf.RemoteConfig{
			URLs: []string{spec.URL}}).
		FetchContext(ctx, &git.FetchOptions{
			Auth:     spec.Auth,
			RefSpecs: []gitconf.RefSpec{gitconf.RefSpec(refSpec)},
			Depth:    1,
			Progress: os.Stdout,
		})
	switch {
	case err == nil:
	case errors.Is(err, git.NoErrAlreadyUpToDate):
	case errors.Is(err, gittransport.ErrEmptyRemoteRepository):
	default:
		return fmt.Errorf("fetch: %v", err)
	}
	return nil
}
