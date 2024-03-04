package cs

import (
	"context"
	"fmt"
	"log"
	"net/url"
	"strings"

	"github.com/google/go-github/v57/github"
)

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
			// Hidden repo.  Don't index -- these are usually website junk.
			return
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
