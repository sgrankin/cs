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
	if err := run(*configPath, *gitPath, gitHubToken); err != nil {
		log.Fatal(err)
	}

}
func run(configPath, gitPath, gitHubToken string) error {
	ctx := context.Background()

	cfg, err := os.ReadFile(configPath)
	if err != nil {
		return err
	}
	var config Config
	if err := yaml.Unmarshal(cfg, &config); err != nil {
		return err
	}

	// TODO: create localRepo if it's not there...
	localRepo, err := git.PlainOpen(gitPath)
	if err != nil {
		log.Fatal(err)
	}

	var auth gittransport.AuthMethod
	client := github.NewClient(nil)
	if gitHubToken != "" {
		client = client.WithAuthToken(gitHubToken)
		auth = &githttp.BasicAuth{Username: "git", Password: gitHubToken}
	}

	for _, spec := range config.Specs {
		if spec.GitHub != nil {
			gh := spec.GitHub
			switch {
			case gh.Org != "":
				for page := 1; ; page++ {
					repos, response, err := client.Repositories.ListByOrg(ctx, gh.Org, &github.RepositoryListByOrgOptions{
						ListOptions: github.ListOptions{PerPage: 100, Page: page}})
					if err != nil {
						return err
					}
					log.Printf("%s page %d next page %d", gh.Org, page, response.NextPage)
					for _, repo := range repos {
						if (repo.Archived != nil && *repo.Archived && !gh.Archived) ||
							(repo.Fork != nil && *repo.Fork && !gh.Forks) {
							continue
						}
						ref := gh.Ref
						if ref == "" {
							ref = "HEAD"
						}
						log.Printf("fetching %q:%q", *repo.FullName, ref)
						if err := fetchRepo(localRepo, *repo.CloneURL, auth, ref, "refs/github.com/"+*repo.FullName); err != nil {
							return err
						}
					}
					if response.NextPage == 0 {
						break
					}
				}
			case gh.User != "":
				for page := 1; ; page++ {
					repos, response, err := client.Repositories.ListByUser(ctx, gh.User, &github.RepositoryListByUserOptions{
						ListOptions: github.ListOptions{PerPage: 100, Page: page}})
					if err != nil {
						return err
					}
					log.Printf("%s page %d next page %d", gh.User, page, response.NextPage)
					for _, repo := range repos {
						if (repo.Archived != nil && *repo.Archived && !gh.Archived) ||
							(repo.Fork != nil && *repo.Fork && !gh.Forks) {
							continue
						}
						ref := gh.Ref
						if ref == "" {
							ref = "HEAD"
						}
						log.Printf("fetching %q:%q", *repo.FullName, ref)
						if err := fetchRepo(localRepo, *repo.CloneURL, auth, ref, "refs/github.com/"+*repo.FullName); err != nil {
							return err
						}
					}
					if response.NextPage == 0 {
						break
					}
				}
			case gh.Repo != "":
				owner, repoName, found := strings.Cut(gh.Repo, "/")
				if !found {
					return fmt.Errorf("expected owner/repo in %q", gh.Repo)
				}
				repo, _, err := client.Repositories.Get(ctx, owner, repoName)
				if err != nil {
					return err
				}
				if (repo.Archived != nil && *repo.Archived && !gh.Archived) ||
					(repo.Fork != nil && *repo.Fork && !gh.Forks) {
					continue
				}
				ref := gh.Ref
				if ref == "" {
					ref = "HEAD"
				}
				log.Printf("fetching %q:%q", *repo.FullName, ref)
				if err := fetchRepo(localRepo, *repo.CloneURL, auth, ref, "refs/github.com/"+*repo.FullName); err != nil {
					return err
				}
			}

		}
	}

	return nil
}

func fetchRepo(localRepo *git.Repository, cloneURL string, auth gittransport.AuthMethod, fromRef, toRef string) error {
	spec := "+" + fromRef + ":" + toRef
	err := git.NewRemote(localRepo.Storer, &gitconf.RemoteConfig{
		URLs: []string{cloneURL},
	}).Fetch(&git.FetchOptions{
		Auth:     auth,
		RefSpecs: []gitconf.RefSpec{gitconf.RefSpec(spec)},
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
