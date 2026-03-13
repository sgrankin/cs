package cs

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"testing/fstest"
	"time"

	"github.com/go-git/go-git/v5"
	gitplumb "github.com/go-git/go-git/v5/plumbing"
	gitobj "github.com/go-git/go-git/v5/plumbing/object"
	"github.com/google/go-github/v72/github"
)

// initTestRepo creates a non-bare git repo in a temp dir with the given files
// committed. It returns the repo and the commit hash.
func initTestRepo(t *testing.T, files map[string]string) (*git.Repository, string, gitplumb.Hash) {
	t.Helper()
	dir := t.TempDir()
	repo, err := git.PlainInit(dir, false)
	if err != nil {
		t.Fatalf("PlainInit: %v", err)
	}
	wt, err := repo.Worktree()
	if err != nil {
		t.Fatalf("Worktree: %v", err)
	}
	for name, content := range files {
		path := filepath.Join(dir, filepath.FromSlash(name))
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
	hash, err := wt.Commit("test commit", &git.CommitOptions{
		Author: &gitobj.Signature{
			Name:  "Test",
			Email: "test@test.com",
			When:  time.Unix(1000000000, 0),
		},
	})
	if err != nil {
		t.Fatalf("Commit: %v", err)
	}
	return repo, dir, hash
}

// getTree returns the root tree of the given commit hash.
func getTree(t *testing.T, repo *git.Repository, hash gitplumb.Hash) *gitobj.Tree {
	t.Helper()
	commit, err := repo.CommitObject(hash)
	if err != nil {
		t.Fatalf("CommitObject: %v", err)
	}
	tree, err := commit.Tree()
	if err != nil {
		t.Fatalf("Tree: %v", err)
	}
	return tree
}

// --- gitTreeFS tests ---

func TestGitTreeFS(t *testing.T) {
	files := map[string]string{
		"file.go":       "package main\n",
		"dir/nested.go": "package dir\n",
		"dir/other.go":  "package dir\n// other\n",
	}
	repo, _, hash := initTestRepo(t, files)
	tree := getTree(t, repo, hash)
	fsys := gitTreeFS{tree}

	t.Run("OpenDot", func(t *testing.T) {
		f, err := fsys.Open(".")
		if err != nil {
			t.Fatalf("Open(\".\") error: %v", err)
		}
		defer f.Close()
		info, err := f.Stat()
		if err != nil {
			t.Fatalf("Stat error: %v", err)
		}
		if !info.IsDir() {
			t.Error("Open(\".\") should return a directory")
		}
		dir, ok := f.(fs.ReadDirFile)
		if !ok {
			t.Fatal("Open(\".\") should implement ReadDirFile")
		}
		entries, err := dir.ReadDir(-1)
		if err != nil {
			t.Fatalf("ReadDir(-1) error: %v", err)
		}
		if len(entries) == 0 {
			t.Error("ReadDir(-1) returned no entries")
		}
	})

	t.Run("OpenFile", func(t *testing.T) {
		f, err := fsys.Open("file.go")
		if err != nil {
			t.Fatalf("Open(\"file.go\") error: %v", err)
		}
		defer f.Close()
		data, err := io.ReadAll(f)
		if err != nil {
			t.Fatalf("ReadAll error: %v", err)
		}
		if string(data) != "package main\n" {
			t.Errorf("content = %q, want %q", data, "package main\n")
		}
	})

	t.Run("OpenNestedFile", func(t *testing.T) {
		f, err := fsys.Open("dir/nested.go")
		if err != nil {
			t.Fatalf("Open(\"dir/nested.go\") error: %v", err)
		}
		defer f.Close()
		data, err := io.ReadAll(f)
		if err != nil {
			t.Fatalf("ReadAll error: %v", err)
		}
		if string(data) != "package dir\n" {
			t.Errorf("content = %q, want %q", data, "package dir\n")
		}
	})

	t.Run("OpenNonexistent", func(t *testing.T) {
		_, err := fsys.Open("nonexistent")
		if err == nil {
			t.Fatal("expected error for nonexistent file")
		}
		var pathErr *fs.PathError
		if !errors.As(err, &pathErr) {
			t.Fatalf("expected PathError, got %T: %v", err, err)
		}
		if !errors.Is(pathErr.Err, fs.ErrNotExist) {
			t.Errorf("expected fs.ErrNotExist, got %v", pathErr.Err)
		}
	})

	t.Run("OpenDir", func(t *testing.T) {
		f, err := fsys.Open("dir")
		if err != nil {
			t.Fatalf("Open(\"dir\") error: %v", err)
		}
		defer f.Close()
		info, err := f.Stat()
		if err != nil {
			t.Fatalf("Stat error: %v", err)
		}
		if !info.IsDir() {
			t.Error("Open(\"dir\") should return a directory")
		}
	})

	t.Run("TestFS", func(t *testing.T) {
		// Go's built-in fs.FS conformance test.
		if err := fstest.TestFS(fsys, "file.go", "dir/nested.go", "dir/other.go"); err != nil {
			t.Fatalf("fstest.TestFS: %v", err)
		}
	})
}

func TestGitFileInfo(t *testing.T) {
	tests := []struct {
		name     string
		info     gitFileInfo
		wantName string
		wantSize int64
		wantDir  bool
		wantMode fs.FileMode
	}{
		{
			name:     "file",
			info:     gitFileInfo{name: "main.go", size: 42},
			wantName: "main.go",
			wantSize: 42,
			wantDir:  false,
			wantMode: 0o444,
		},
		{
			name:     "directory",
			info:     gitFileInfo{name: "src", isDir: true},
			wantName: "src",
			wantSize: 0,
			wantDir:  true,
			wantMode: fs.ModeDir | 0o555,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if tt.info.Name() != tt.wantName {
				t.Errorf("Name() = %q, want %q", tt.info.Name(), tt.wantName)
			}
			if tt.info.Size() != tt.wantSize {
				t.Errorf("Size() = %d, want %d", tt.info.Size(), tt.wantSize)
			}
			if tt.info.IsDir() != tt.wantDir {
				t.Errorf("IsDir() = %v, want %v", tt.info.IsDir(), tt.wantDir)
			}
			if tt.info.Mode() != tt.wantMode {
				t.Errorf("Mode() = %v, want %v", tt.info.Mode(), tt.wantMode)
			}
			if !tt.info.ModTime().IsZero() {
				t.Errorf("ModTime() should be zero, got %v", tt.info.ModTime())
			}
			if tt.info.Sys() != nil {
				t.Errorf("Sys() should be nil, got %v", tt.info.Sys())
			}
		})
	}
}

func TestGitDirEntry(t *testing.T) {
	tests := []struct {
		name     string
		entry    gitDirEntry
		wantName string
		wantDir  bool
		wantType fs.FileMode
	}{
		{
			name:     "file entry",
			entry:    gitDirEntry{name: "main.go", mode: 0o644},
			wantName: "main.go",
			wantDir:  false,
			wantType: 0,
		},
		{
			name:     "dir entry",
			entry:    gitDirEntry{name: "src", mode: fs.ModeDir | 0o755},
			wantName: "src",
			wantDir:  true,
			wantType: fs.ModeDir,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if tt.entry.Name() != tt.wantName {
				t.Errorf("Name() = %q, want %q", tt.entry.Name(), tt.wantName)
			}
			if tt.entry.IsDir() != tt.wantDir {
				t.Errorf("IsDir() = %v, want %v", tt.entry.IsDir(), tt.wantDir)
			}
			if tt.entry.Type() != tt.wantType {
				t.Errorf("Type() = %v, want %v", tt.entry.Type(), tt.wantType)
			}
			info, err := tt.entry.Info()
			if err != nil {
				t.Fatalf("Info() error: %v", err)
			}
			if info.Name() != tt.wantName {
				t.Errorf("Info().Name() = %q, want %q", info.Name(), tt.wantName)
			}
			if info.IsDir() != tt.wantDir {
				t.Errorf("Info().IsDir() = %v, want %v", info.IsDir(), tt.wantDir)
			}
		})
	}
}

// --- gitRepo tests ---

func TestGitRepoOpenGitRepo(t *testing.T) {
	t.Run("creates bare repo for nonexistent path", func(t *testing.T) {
		dir := filepath.Join(t.TempDir(), "newrepo.git")
		repo, err := openGitRepo(dir)
		if err != nil {
			t.Fatalf("openGitRepo error: %v", err)
		}
		if repo == nil {
			t.Fatal("openGitRepo returned nil repo")
		}
		// Verify it's a bare repo by checking it can be opened again.
		repo2, err := openGitRepo(dir)
		if err != nil {
			t.Fatalf("second openGitRepo error: %v", err)
		}
		if repo2 == nil {
			t.Fatal("second openGitRepo returned nil repo")
		}
	})

	t.Run("opens existing repo", func(t *testing.T) {
		dir := t.TempDir()
		_, err := git.PlainInit(dir, true)
		if err != nil {
			t.Fatalf("PlainInit: %v", err)
		}
		repo, err := openGitRepo(dir)
		if err != nil {
			t.Fatalf("openGitRepo error: %v", err)
		}
		if repo == nil {
			t.Fatal("openGitRepo returned nil repo")
		}
	})

	t.Run("empty path returns error", func(t *testing.T) {
		_, err := openGitRepo("")
		if err == nil {
			t.Fatal("expected error for empty path")
		}
	})
}

func TestGitRepoVersion(t *testing.T) {
	t.Run("returns commit SHA for repo with ref", func(t *testing.T) {
		repo, _, hash := initTestRepo(t, map[string]string{"f.txt": "content\n"})
		localRef := "test/ref"
		// Create a ref matching the gitRepo.localRef format.
		err := repo.Storer.SetReference(
			gitplumb.NewHashReference(gitplumb.ReferenceName("refs/"+localRef), hash))
		if err != nil {
			t.Fatalf("SetReference: %v", err)
		}
		gr := &gitRepo{repo: repo, localRef: localRef}
		v := gr.Version()
		if v == "" {
			t.Fatal("Version() returned empty string")
		}
		if v != hash.String() {
			t.Errorf("Version() = %q, want %q", v, hash.String())
		}
	})

	t.Run("returns empty for repo with no ref", func(t *testing.T) {
		dir := t.TempDir()
		repo, err := git.PlainInit(dir, true)
		if err != nil {
			t.Fatalf("PlainInit: %v", err)
		}
		gr := &gitRepo{repo: repo, localRef: "nonexistent/ref"}
		if v := gr.Version(); v != "" {
			t.Errorf("Version() = %q, want empty", v)
		}
	})
}

func TestGitRepoFS(t *testing.T) {
	t.Run("returns fs.FS that can read files", func(t *testing.T) {
		repo, _, hash := initTestRepo(t, map[string]string{
			"hello.txt": "hello world\n",
		})
		localRef := "test/fsref"
		err := repo.Storer.SetReference(
			gitplumb.NewHashReference(gitplumb.ReferenceName("refs/"+localRef), hash))
		if err != nil {
			t.Fatalf("SetReference: %v", err)
		}
		gr := &gitRepo{repo: repo, localRef: localRef}
		fsys, err := gr.FS()
		if err != nil {
			t.Fatalf("FS() error: %v", err)
		}
		data, err := fs.ReadFile(fsys, "hello.txt")
		if err != nil {
			t.Fatalf("ReadFile error: %v", err)
		}
		if string(data) != "hello world\n" {
			t.Errorf("content = %q, want %q", data, "hello world\n")
		}
	})

	t.Run("returns emptyFS when ref is missing", func(t *testing.T) {
		dir := t.TempDir()
		repo, err := git.PlainInit(dir, true)
		if err != nil {
			t.Fatalf("PlainInit: %v", err)
		}
		gr := &gitRepo{repo: repo, localRef: "nonexistent/ref"}
		fsys, err := gr.FS()
		if err != nil {
			t.Fatalf("FS() error: %v", err)
		}
		if _, ok := fsys.(emptyFS); !ok {
			t.Errorf("expected emptyFS, got %T", fsys)
		}
	})
}

func TestGitRepoRefresh(t *testing.T) {
	_, remoteDir, remoteHash := initTestRepo(t, map[string]string{"test.txt": "remote content\n"})

	// Create a bare "local" repo.
	localDir := filepath.Join(t.TempDir(), "local.git")
	localRepo, err := git.PlainInit(localDir, true)
	if err != nil {
		t.Fatalf("PlainInit local: %v", err)
	}

	gr := &gitRepo{
		repo:      localRepo,
		remoteURL: remoteDir,
		remoteRef: "refs/heads/master",
		localRef:  "fetched/master",
	}

	// Before refresh, version should be empty.
	if v := gr.Version(); v != "" {
		t.Fatalf("Version before Refresh = %q, want empty", v)
	}

	// Refresh should fetch the commit.
	v, err := gr.Refresh()
	if err != nil {
		t.Fatalf("Refresh error: %v", err)
	}
	if v == "" {
		t.Fatal("Version after Refresh is empty")
	}
	if v != remoteHash.String() {
		t.Errorf("Version after Refresh = %q, want %q", v, remoteHash.String())
	}

	// A second refresh should succeed (already up to date).
	v2, err := gr.Refresh()
	if err != nil {
		t.Fatalf("second Refresh error: %v", err)
	}
	if v2 != v {
		t.Errorf("second Refresh version = %q, want %q", v2, v)
	}
}

func TestGitRepoName(t *testing.T) {
	gr := &gitRepo{localRef: "my/local/ref"}
	if got := gr.Name(); got != "my/local/ref" {
		t.Errorf("Name() = %q, want %q", got, "my/local/ref")
	}
}

// --- emptyFS tests ---

func TestEmptyFS(t *testing.T) {
	fsys := emptyFS{}

	t.Run("OpenDot", func(t *testing.T) {
		f, err := fsys.Open(".")
		if err != nil {
			t.Fatalf("Open(\".\") error: %v", err)
		}
		defer f.Close()
		info, err := f.Stat()
		if err != nil {
			t.Fatalf("Stat error: %v", err)
		}
		if !info.IsDir() {
			t.Error("expected directory")
		}
		dir, ok := f.(fs.ReadDirFile)
		if !ok {
			t.Fatal("expected ReadDirFile")
		}
		entries, err := dir.ReadDir(-1)
		if err != nil {
			t.Fatalf("ReadDir(-1) error: %v", err)
		}
		if entries != nil {
			t.Errorf("ReadDir(-1) entries = %v, want nil", entries)
		}
	})

	t.Run("OpenAnything", func(t *testing.T) {
		_, err := fsys.Open("anything")
		if err == nil {
			t.Fatal("expected error")
		}
		if !errors.Is(err, fs.ErrNotExist) {
			t.Errorf("expected fs.ErrNotExist, got %v", err)
		}
	})

	t.Run("ReadDirBatched", func(t *testing.T) {
		f, err := fsys.Open(".")
		if err != nil {
			t.Fatalf("Open error: %v", err)
		}
		defer f.Close()
		dir := f.(fs.ReadDirFile)
		entries, err := dir.ReadDir(1)
		if entries != nil {
			t.Errorf("ReadDir(1) entries = %v, want nil", entries)
		}
		if err != io.EOF {
			t.Errorf("ReadDir(1) err = %v, want io.EOF", err)
		}
	})

	t.Run("Read", func(t *testing.T) {
		f, err := fsys.Open(".")
		if err != nil {
			t.Fatalf("Open error: %v", err)
		}
		defer f.Close()
		buf := make([]byte, 10)
		n, err := f.Read(buf)
		if n != 0 {
			t.Errorf("Read n = %d, want 0", n)
		}
		if err != io.EOF {
			t.Errorf("Read err = %v, want io.EOF", err)
		}
	})
}

func TestGitDirRead(t *testing.T) {
	files := map[string]string{"f.txt": "content\n"}
	repo, _, hash := initTestRepo(t, files)
	tree := getTree(t, repo, hash)
	fsys := gitTreeFS{tree}

	f, err := fsys.Open(".")
	if err != nil {
		t.Fatalf("Open error: %v", err)
	}
	defer f.Close()
	buf := make([]byte, 10)
	_, err = f.Read(buf)
	if err == nil {
		t.Fatal("expected error reading a directory")
	}
	var pathErr *fs.PathError
	if !errors.As(err, &pathErr) {
		t.Fatalf("expected PathError, got %T: %v", err, err)
	}
}

// --- ResolveFetchSpecs tests ---

// makeRepo creates a *github.Repository with the given fields.
func makeRepo(fullName, cloneURL string, archived, fork bool) *github.Repository {
	parts := strings.SplitN(fullName, "/", 2)
	name := parts[len(parts)-1]
	return &github.Repository{
		Name:     &name,
		FullName: &fullName,
		CloneURL: &cloneURL,
		Archived: &archived,
		Fork:     &fork,
	}
}

// newFakeGitHubServer creates an httptest.Server that responds to go-github API
// requests for org repos, user repos, and single repos.
func newFakeGitHubServer(t *testing.T, repos []*github.Repository) *httptest.Server {
	t.Helper()
	mux := http.NewServeMux()

	// Build lookup maps.
	orgRepos := map[string][]*github.Repository{}
	userRepos := map[string][]*github.Repository{}
	singleRepos := map[string]*github.Repository{}
	for _, r := range repos {
		fullName := r.GetFullName()
		parts := strings.SplitN(fullName, "/", 2)
		owner := parts[0]
		// We use the same repos for both org and user listings;
		// the test specifies which via the GitHubSourceConfig.
		orgRepos[owner] = append(orgRepos[owner], r)
		userRepos[owner] = append(userRepos[owner], r)
		singleRepos[fullName] = r
	}

	writeJSON := func(w http.ResponseWriter, r *http.Request, v any) {
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(v); err != nil {
			t.Errorf("encoding JSON: %v", err)
		}
	}

	// Paginated list handler. go-github sends ?page=N&per_page=M.
	paginatedList := func(w http.ResponseWriter, r *http.Request, all []*github.Repository) {
		page := 1
		perPage := 100
		if v := r.URL.Query().Get("page"); v != "" {
			fmt.Sscanf(v, "%d", &page)
		}
		if v := r.URL.Query().Get("per_page"); v != "" {
			fmt.Sscanf(v, "%d", &perPage)
		}
		start := (page - 1) * perPage
		if start > len(all) {
			start = len(all)
		}
		end := start + perPage
		if end > len(all) {
			end = len(all)
		}
		result := all[start:end]
		if end < len(all) {
			// Set Link header for next page. go-github parses this.
			nextURL := fmt.Sprintf("<%s?page=%d&per_page=%d>; rel=\"next\"",
				"http://"+r.Host+r.URL.Path, page+1, perPage)
			w.Header().Set("Link", nextURL)
		}
		writeJSON(w, r, result)
	}

	// /orgs/{org}/repos
	mux.HandleFunc("GET /orgs/{org}/repos", func(w http.ResponseWriter, r *http.Request) {
		org := r.PathValue("org")
		repos, ok := orgRepos[org]
		if !ok {
			http.Error(w, `{"message":"Not Found"}`, http.StatusNotFound)
			return
		}
		paginatedList(w, r, repos)
	})

	// /users/{user}/repos
	mux.HandleFunc("GET /users/{user}/repos", func(w http.ResponseWriter, r *http.Request) {
		user := r.PathValue("user")
		repos, ok := userRepos[user]
		if !ok {
			http.Error(w, `{"message":"Not Found"}`, http.StatusNotFound)
			return
		}
		paginatedList(w, r, repos)
	})

	// /repos/{owner}/{repo}
	mux.HandleFunc("GET /repos/{owner}/{repo}", func(w http.ResponseWriter, r *http.Request) {
		key := r.PathValue("owner") + "/" + r.PathValue("repo")
		repo, ok := singleRepos[key]
		if !ok {
			http.Error(w, `{"message":"Not Found"}`, http.StatusNotFound)
			return
		}
		writeJSON(w, r, repo)
	})

	server := httptest.NewServer(mux)
	t.Cleanup(server.Close)
	return server
}

// newTestGitHubClient returns a github.Client that talks to the given server.
func newTestGitHubClient(t *testing.T, server *httptest.Server) *github.Client {
	t.Helper()
	client := github.NewClient(nil)
	serverURL, err := url.Parse(server.URL + "/")
	if err != nil {
		t.Fatalf("parsing server URL: %v", err)
	}
	client.BaseURL = serverURL
	return client
}

func TestResolveFetchSpecs(t *testing.T) {
	tests := []struct {
		name       string
		repos      []*github.Repository
		specs      []GitHubSourceConfig
		auth       *url.Userinfo
		wantNames  []string // expected RepoConfig.Name values
		wantErr    bool
		wantRef    string // if set, check first result's RemoteRef
		wantNoAuth bool   // if true, check first result's RemoteURL has no userinfo
	}{
		{
			name: "org listing",
			repos: []*github.Repository{
				makeRepo("myorg/repo1", "https://github.com/myorg/repo1.git", false, false),
				makeRepo("myorg/repo2", "https://github.com/myorg/repo2.git", false, false),
			},
			specs:     []GitHubSourceConfig{{Org: "myorg"}},
			wantNames: []string{"github.com/myorg/repo1", "github.com/myorg/repo2"},
		},
		{
			name: "user listing",
			repos: []*github.Repository{
				makeRepo("someuser/proj", "https://github.com/someuser/proj.git", false, false),
			},
			specs:     []GitHubSourceConfig{{User: "someuser"}},
			wantNames: []string{"github.com/someuser/proj"},
		},
		{
			name: "single repo",
			repos: []*github.Repository{
				makeRepo("owner/specific", "https://github.com/owner/specific.git", false, false),
			},
			specs:     []GitHubSourceConfig{{Repo: "owner/specific"}},
			wantNames: []string{"github.com/owner/specific"},
		},
		{
			name: "archived filtering",
			repos: []*github.Repository{
				makeRepo("org/active", "https://github.com/org/active.git", false, false),
				makeRepo("org/old", "https://github.com/org/old.git", true, false),
			},
			specs:     []GitHubSourceConfig{{Org: "org", Archived: false}},
			wantNames: []string{"github.com/org/active"},
		},
		{
			name: "archived included",
			repos: []*github.Repository{
				makeRepo("org/active", "https://github.com/org/active.git", false, false),
				makeRepo("org/old", "https://github.com/org/old.git", true, false),
			},
			specs:     []GitHubSourceConfig{{Org: "org", Archived: true}},
			wantNames: []string{"github.com/org/active", "github.com/org/old"},
		},
		{
			name: "fork filtering",
			repos: []*github.Repository{
				makeRepo("org/original", "https://github.com/org/original.git", false, false),
				makeRepo("org/forked", "https://github.com/org/forked.git", false, true),
			},
			specs:     []GitHubSourceConfig{{Org: "org", Forks: false}},
			wantNames: []string{"github.com/org/original"},
		},
		{
			name: "forks included",
			repos: []*github.Repository{
				makeRepo("org/original", "https://github.com/org/original.git", false, false),
				makeRepo("org/forked", "https://github.com/org/forked.git", false, true),
			},
			specs:     []GitHubSourceConfig{{Org: "org", Forks: true}},
			wantNames: []string{"github.com/org/original", "github.com/org/forked"},
		},
		{
			name: "reject regex",
			repos: []*github.Repository{
				makeRepo("org/public-api", "https://github.com/org/public-api.git", false, false),
				makeRepo("org/internal-tool", "https://github.com/org/internal-tool.git", false, false),
				makeRepo("org/internal-lib", "https://github.com/org/internal-lib.git", false, false),
			},
			specs:     []GitHubSourceConfig{{Org: "org", Reject: "internal"}},
			wantNames: []string{"github.com/org/public-api"},
		},
		{
			name: "hidden repo skipped",
			repos: []*github.Repository{
				makeRepo("org/visible", "https://github.com/org/visible.git", false, false),
				makeRepo("org/.hidden", "https://github.com/org/.hidden.git", false, false),
			},
			specs:     []GitHubSourceConfig{{Org: "org"}},
			wantNames: []string{"github.com/org/visible"},
		},
		{
			name: "auth URL injection",
			repos: []*github.Repository{
				makeRepo("org/repo", "https://github.com/org/repo.git", false, false),
			},
			specs:     []GitHubSourceConfig{{Org: "org"}},
			auth:      url.UserPassword("git", "tok123"),
			wantNames: []string{"github.com/org/repo"},
		},
		{
			name: "custom ref",
			repos: []*github.Repository{
				makeRepo("owner/repo", "https://github.com/owner/repo.git", false, false),
			},
			specs:     []GitHubSourceConfig{{Repo: "owner/repo", Ref: "main"}},
			wantNames: []string{"github.com/owner/repo"},
			wantRef:   "main",
		},
		{
			name: "default ref is HEAD",
			repos: []*github.Repository{
				makeRepo("owner/repo", "https://github.com/owner/repo.git", false, false),
			},
			specs:      []GitHubSourceConfig{{Repo: "owner/repo"}},
			wantNames:  []string{"github.com/owner/repo"},
			wantRef:    "HEAD",
			wantNoAuth: true,
		},
		{
			name:    "error from API",
			repos:   nil, // no repos registered
			specs:   []GitHubSourceConfig{{Org: "nonexistent"}},
			wantErr: true,
		},
		{
			name:    "invalid repo spec format",
			repos:   nil,
			specs:   []GitHubSourceConfig{{Repo: "noslash"}},
			wantErr: true,
		},
		{
			name:    "single repo not found",
			repos:   nil,
			specs:   []GitHubSourceConfig{{Repo: "owner/missing"}},
			wantErr: true,
		},
		{
			name:    "user listing error",
			repos:   nil,
			specs:   []GitHubSourceConfig{{User: "nonexistent"}},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			server := newFakeGitHubServer(t, tt.repos)
			client := newTestGitHubClient(t, server)

			got, err := ResolveFetchSpecs(client, tt.specs, tt.auth)
			if tt.wantErr {
				if err == nil {
					t.Fatal("expected error, got nil")
				}
				return
			}
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}

			gotNames := make([]string, len(got))
			for i, rc := range got {
				gotNames[i] = rc.Name
			}

			if len(gotNames) != len(tt.wantNames) {
				t.Fatalf("got %d repos %v, want %d repos %v", len(gotNames), gotNames, len(tt.wantNames), tt.wantNames)
			}
			for i, want := range tt.wantNames {
				if gotNames[i] != want {
					t.Errorf("repo[%d].Name = %q, want %q", i, gotNames[i], want)
				}
			}
			if tt.wantRef != "" && got[0].RemoteRef != tt.wantRef {
				t.Errorf("RemoteRef = %q, want %q", got[0].RemoteRef, tt.wantRef)
			}
			if tt.wantNoAuth {
				u, err := url.Parse(got[0].RemoteURL)
				if err != nil {
					t.Fatalf("parsing RemoteURL: %v", err)
				}
				if u.User != nil {
					t.Errorf("RemoteURL has unexpected userinfo: %v", u.User)
				}
			}
			if tt.auth != nil && len(got) > 0 {
				u, err := url.Parse(got[0].RemoteURL)
				if err != nil {
					t.Fatalf("parsing RemoteURL: %v", err)
				}
				if u.User == nil {
					t.Fatal("RemoteURL has no userinfo")
				}
				if u.User.Username() != tt.auth.Username() {
					t.Errorf("RemoteURL username = %q, want %q", u.User.Username(), tt.auth.Username())
				}
				wantPw, _ := tt.auth.Password()
				gotPw, ok := u.User.Password()
				if !ok || gotPw != wantPw {
					t.Errorf("RemoteURL password = %q (ok=%v), want %q", gotPw, ok, wantPw)
				}
			}
		})
	}

	// Pagination needs its own setup (150 repos).
	t.Run("pagination", func(t *testing.T) {
		var repos []*github.Repository
		var wantNames []string
		for i := range 150 {
			name := fmt.Sprintf("bigorg/repo%03d", i)
			cloneURL := fmt.Sprintf("https://github.com/%s.git", name)
			repos = append(repos, makeRepo(name, cloneURL, false, false))
			wantNames = append(wantNames, "github.com/"+name)
		}

		server := newFakeGitHubServer(t, repos)
		client := newTestGitHubClient(t, server)

		got, err := ResolveFetchSpecs(client, []GitHubSourceConfig{{Org: "bigorg"}}, nil)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if len(got) != 150 {
			t.Fatalf("got %d repos, want 150", len(got))
		}
		if got[0].Name != wantNames[0] {
			t.Errorf("first repo = %q, want %q", got[0].Name, wantNames[0])
		}
		if got[149].Name != wantNames[149] {
			t.Errorf("last repo = %q, want %q", got[149].Name, wantNames[149])
		}
	})
}
