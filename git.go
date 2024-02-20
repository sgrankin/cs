package cs

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/url"
	"strings"

	"github.com/go-git/go-git/v5"
	gitplumb "github.com/go-git/go-git/v5/plumbing"
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

func ListRefs(repo *git.Repository) []string {
	ri, err := repo.References()
	if err != nil {
		log.Panicf("listing refs: %v", err)
	}
	defer ri.Close()
	var refs []string
	ri.ForEach(func(r *gitplumb.Reference) error {
		if r.Type() == gitplumb.HashReference {
			refs = append(refs, r.Name().Short())
		}
		return nil
	})
	return refs
}
