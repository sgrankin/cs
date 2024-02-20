package cs

import (
	"net/url"

	"github.com/go-git/go-git/v5"
	"github.com/google/go-github/v57/github"
)

type repoSyncer struct {
	git            *git.Repository
	github         *github.Client
	githubUserInfo *url.Userinfo

	repos   []RepoConfig
	sources RepoSourceConfig
}

func newRepoSyncer(
	git *git.Repository,
	githubToken string,
	repos []RepoConfig,
	sources RepoSourceConfig,
) *repoSyncer {
	s := &repoSyncer{
		git:     git,
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
	var res []Repo
	for _, rc := range repos {
		res = append(res, &gitRepo{
			repo:      s.git,
			remoteURL: rc.RemoteURL,
			remoteRef: rc.RemoteRef,
			localRef:  rc.Name,
		})
	}
	for _, repo := range res {
		if _, err := repo.Refresh(); err != nil {
			return nil, err
		}
	}
	return res, nil
}
