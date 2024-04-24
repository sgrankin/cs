package cs

import (
	"fmt"
	"net/url"

	"github.com/google/go-github/v57/github"
)

type repoSyncer struct {
	gitPath        string
	github         *github.Client
	githubUserInfo *url.Userinfo

	repos   []RepoConfig
	sources RepoSourceConfig
}

func newRepoSyncer(
	gitPath string,
	githubToken string,
	repos []RepoConfig,
	sources RepoSourceConfig,
) *repoSyncer {
	s := &repoSyncer{
		gitPath: gitPath,
		github:  github.NewClient(nil),
		repos:   repos,
		sources: sources,
	}
	if githubToken != "" {
		s.github = s.github.WithAuthToken(githubToken)
		s.githubUserInfo = url.UserPassword("git", githubToken)
	}
	return s
}

func (s *repoSyncer) Refresh() ([]Repo, error) {
	repos := s.repos
	ghRepos, err := ResolveFetchSpecs(s.github, s.sources.GitHub, s.githubUserInfo)
	if err != nil {
		return nil, err
	}
	repos = append(repos, ghRepos...)

	git, err := openGitRepo(s.gitPath)
	if err != nil {
		return nil, fmt.Errorf("opening git repo %q: %w", s.gitPath, err)
	}
	var res []Repo
	for _, rc := range repos {
		res = append(res, &gitRepo{
			repo:      git,
			remoteURL: rc.RemoteURL,
			remoteRef: rc.RemoteRef,
			localRef:  rc.Name,
		})
	}
	// We could parallelize this... but go-git storage isn't thread safe.
	for _, repo := range res {
		if _, err := repo.Refresh(); err != nil {
			return nil, err
		}
	}
	return res, nil
}
