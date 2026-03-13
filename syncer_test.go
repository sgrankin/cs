package cs

import (
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/go-git/go-git/v5"
	gitobj "github.com/go-git/go-git/v5/plumbing/object"
	"github.com/google/go-github/v72/github"
)

// initBareRemote creates a non-bare git repo with one file, returning its path.
// Uses initTestRepo from git_test.go.
func initBareRemote(t *testing.T) string {
	t.Helper()
	_, dir, _ := initTestRepo(t, map[string]string{"hello.txt": "hello\n"})
	return dir
}

// addCommitToRemote adds files and commits to an existing non-bare git repo.
func addCommitToRemote(t *testing.T, remoteDir string, files map[string]string) {
	t.Helper()
	repo, err := git.PlainOpen(remoteDir)
	if err != nil {
		t.Fatalf("PlainOpen(%q): %v", remoteDir, err)
	}
	wt, err := repo.Worktree()
	if err != nil {
		t.Fatalf("Worktree: %v", err)
	}
	for name, content := range files {
		path := filepath.Join(remoteDir, filepath.FromSlash(name))
		if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
			t.Fatalf("MkdirAll: %v", err)
		}
		if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
			t.Fatalf("WriteFile: %v", err)
		}
		if _, err := wt.Add(name); err != nil {
			t.Fatalf("Add(%q): %v", name, err)
		}
	}
	_, err = wt.Commit("add files", &git.CommitOptions{
		Author: &gitobj.Signature{
			Name:  "Test",
			Email: "test@test.com",
			When:  time.Unix(1000000001, 0),
		},
	})
	if err != nil {
		t.Fatalf("Commit: %v", err)
	}
}

func TestNewRepoSyncer(t *testing.T) {
	t.Run("with token sets auth userinfo", func(t *testing.T) {
		s := newRepoSyncer("/tmp/git", "mytoken", nil, RepoSourceConfig{})
		if s.githubUserInfo == nil {
			t.Fatal("githubUserInfo should not be nil when token is set")
		}
		if s.githubUserInfo.Username() != "git" {
			t.Errorf("username = %q, want %q", s.githubUserInfo.Username(), "git")
		}
		pw, ok := s.githubUserInfo.Password()
		if !ok || pw != "mytoken" {
			t.Errorf("password = %q (ok=%v), want %q", pw, ok, "mytoken")
		}
	})

	t.Run("without token has nil auth", func(t *testing.T) {
		s := newRepoSyncer("/tmp/git", "", nil, RepoSourceConfig{})
		if s.githubUserInfo != nil {
			t.Errorf("githubUserInfo = %v, want nil", s.githubUserInfo)
		}
	})

	t.Run("stores fields", func(t *testing.T) {
		repos := []RepoConfig{{Name: "r1", RemoteURL: "https://example.com/r1"}}
		sources := RepoSourceConfig{GitHub: []GitHubSourceConfig{{Org: "myorg"}}}
		s := newRepoSyncer("/some/path", "", repos, sources)
		if s.gitPath != "/some/path" {
			t.Errorf("gitPath = %q, want %q", s.gitPath, "/some/path")
		}
		if len(s.repos) != 1 || s.repos[0].Name != "r1" {
			t.Errorf("repos = %v, want one repo named r1", s.repos)
		}
		if len(s.sources.GitHub) != 1 || s.sources.GitHub[0].Org != "myorg" {
			t.Errorf("sources = %v, want one GitHub source for myorg", s.sources)
		}
	})
}

func TestRepoSyncerRefresh(t *testing.T) {
	t.Run("direct repos only", func(t *testing.T) {
		remoteDir := initBareRemote(t)
		gitPath := filepath.Join(t.TempDir(), "git")

		repos := []RepoConfig{
			{
				Name:      "test/repo",
				RemoteURL: remoteDir,
				RemoteRef: "refs/heads/master",
			},
		}
		s := newRepoSyncer(gitPath, "", repos, RepoSourceConfig{})
		got, err := s.Refresh()
		if err != nil {
			t.Fatalf("Refresh error: %v", err)
		}
		if len(got) != 1 {
			t.Fatalf("got %d repos, want 1", len(got))
		}
		if got[0].Name() != "test/repo" {
			t.Errorf("Name = %q, want %q", got[0].Name(), "test/repo")
		}
		if got[0].Version() == "" {
			t.Error("Version should not be empty after Refresh")
		}
	})

	t.Run("github specs resolved", func(t *testing.T) {
		remoteDir := initBareRemote(t)

		ghRepos := []*github.Repository{
			makeRepo("testorg/myrepo", remoteDir, false, false),
		}
		server := newFakeGitHubServer(t, ghRepos)
		gitPath := filepath.Join(t.TempDir(), "git")

		sources := RepoSourceConfig{
			GitHub: []GitHubSourceConfig{{Org: "testorg"}},
		}
		s := newRepoSyncer(gitPath, "", nil, sources)

		// Point the syncer's github client at our fake server.
		s.github = newTestGitHubClient(t, server)

		got, err := s.Refresh()
		if err != nil {
			t.Fatalf("Refresh error: %v", err)
		}
		if len(got) != 1 {
			t.Fatalf("got %d repos, want 1", len(got))
		}
		if got[0].Name() != "github.com/testorg/myrepo" {
			t.Errorf("Name = %q, want %q", got[0].Name(), "github.com/testorg/myrepo")
		}
		if got[0].Version() == "" {
			t.Error("Version should not be empty after Refresh")
		}
	})

	t.Run("direct and github repos combined", func(t *testing.T) {
		remoteDir := initBareRemote(t)

		ghRepos := []*github.Repository{
			makeRepo("org/ghrepo", remoteDir, false, false),
		}
		server := newFakeGitHubServer(t, ghRepos)
		gitPath := filepath.Join(t.TempDir(), "git")

		directRepos := []RepoConfig{
			{
				Name:      "direct/repo",
				RemoteURL: remoteDir,
				RemoteRef: "refs/heads/master",
			},
		}
		sources := RepoSourceConfig{
			GitHub: []GitHubSourceConfig{{Org: "org"}},
		}
		s := newRepoSyncer(gitPath, "", directRepos, sources)
		s.github = newTestGitHubClient(t, server)

		got, err := s.Refresh()
		if err != nil {
			t.Fatalf("Refresh error: %v", err)
		}
		if len(got) != 2 {
			t.Fatalf("got %d repos, want 2", len(got))
		}
		if got[0].Name() != "direct/repo" {
			t.Errorf("got[0].Name = %q, want %q", got[0].Name(), "direct/repo")
		}
		if got[1].Name() != "github.com/org/ghrepo" {
			t.Errorf("got[1].Name = %q, want %q", got[1].Name(), "github.com/org/ghrepo")
		}
	})

	t.Run("github resolve error propagates", func(t *testing.T) {
		server := newFakeGitHubServer(t, nil) // empty, will 404
		gitPath := filepath.Join(t.TempDir(), "git")

		sources := RepoSourceConfig{
			GitHub: []GitHubSourceConfig{{Org: "nonexistent"}},
		}
		s := newRepoSyncer(gitPath, "", nil, sources)
		s.github = newTestGitHubClient(t, server)

		_, err := s.Refresh()
		if err == nil {
			t.Fatal("expected error from Refresh, got nil")
		}
	})

	t.Run("empty config returns no repos", func(t *testing.T) {
		gitPath := filepath.Join(t.TempDir(), "git")
		s := newRepoSyncer(gitPath, "", nil, RepoSourceConfig{})
		got, err := s.Refresh()
		if err != nil {
			t.Fatalf("Refresh error: %v", err)
		}
		if len(got) != 0 {
			t.Errorf("got %d repos, want 0", len(got))
		}
	})

	t.Run("openGitRepo error propagates", func(t *testing.T) {
		// Empty gitPath triggers openGitRepo error.
		s := newRepoSyncer("", "", []RepoConfig{{Name: "x"}}, RepoSourceConfig{})
		_, err := s.Refresh()
		if err == nil {
			t.Fatal("expected error from Refresh with empty gitPath")
		}
	})

	t.Run("fetch error propagates", func(t *testing.T) {
		gitPath := filepath.Join(t.TempDir(), "git")
		repos := []RepoConfig{
			{
				Name:      "bad/remote",
				RemoteURL: "file:///nonexistent/path",
				RemoteRef: "refs/heads/main",
			},
		}
		s := newRepoSyncer(gitPath, "", repos, RepoSourceConfig{})
		_, err := s.Refresh()
		if err == nil {
			t.Fatal("expected error from Refresh with bad remote")
		}
	})
}
