/*
Csfetch synchronizes a number of git repositories into a local repository.
*/
package main

import (
	"context"
	"errors"
	"flag"
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
	"gopkg.in/yaml.v3"
)

var (
	gitPath    = flag.String("git", "data", "The path to the git repo")
	configPath = flag.String("config", "config.yaml", "The path to the config file specifying what to sync")
	prune      = flag.Bool("prune", true, "Remove any refs that are not synced by this tool")
)

type Config struct {
	Specs []struct {
		GitHub *struct {
			Org, User, Repo string // Pick one.
			Ref             string // Defaults to HEAD.
			Archived, Forks bool
		}
	}
}

func main() {
	log.SetFlags(log.Lshortfile)
	flag.Parse()
	gitHubToken := os.Getenv("GITHUB_TOKEN")
	if err := run(*configPath, *gitPath, gitHubToken, *prune); err != nil {
		log.Fatal(err)
	}

}
func run(configPath, gitPath, gitHubToken string, prune bool) error {
	ctx := context.Background()

	cfg, err := os.ReadFile(configPath)
	if err != nil {
		return err
	}
	var config Config
	if err := yaml.Unmarshal(cfg, &config); err != nil {
		return err
	}

	repo, err := git.PlainOpen(gitPath)
	if err != nil && errors.Is(err, git.ErrRepositoryNotExists) {
		repo, err = git.PlainInit(gitPath, true)
	}
	if err != nil {
		return err
	}

	toFetch, err := resolveSpecs(ctx, config, gitHubToken)
	if err != nil {
		return err
	}
	for _, spec := range toFetch {
		if err := fetchRepo(ctx, repo, spec); err != nil {
			return err
		}
	}

	if prune {
		log.Println("pruning refs")
		want := map[string]bool{}
		for _, spec := range toFetch {
			want[spec.Dst] = true
		}
		refs, err := repo.References()
		if err != nil {
			return err
		}
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
		refs.Close()
		for _, r := range toRemove {
			log.Printf("removing ref %s", r.Short())
			if err := repo.Storer.RemoveReference(r); err != nil {
				return err
			}
		}
	}

	return nil
}

func resolveSpecs(ctx context.Context, config Config, gitHubToken string) ([]fetchSpec, error) {
	var auth gittransport.AuthMethod
	client := github.NewClient(nil)
	if gitHubToken != "" {
		client = client.WithAuthToken(gitHubToken)
		auth = &githttp.BasicAuth{Username: "git", Password: gitHubToken}
	}
	var toFetch []fetchSpec
	for _, spec := range config.Specs {
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
						toFetch = append(toFetch, fetchSpec{
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
						toFetch = append(toFetch, fetchSpec{
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
				toFetch = append(toFetch, fetchSpec{
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

type fetchSpec struct {
	URL      string
	Auth     gittransport.AuthMethod
	Src, Dst string
}

func fetchRepo(ctx context.Context, localRepo *git.Repository, spec fetchSpec) error {
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
