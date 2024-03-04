// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"bytes"
	"context"
	"fmt"
	"net/http"
	"os/exec"
	"path"
	"path/filepath"
	"regexp"
	"sort"
	"strings"

	"sgrankin.dev/cs"
)

// Mapping from known file extensions to filetype hinting.
var filenameToLangMap map[string]string = map[string]string{
	"BUILD":       "python",
	"BUILD.bazel": "python",
	"WORKSPACE":   "python",
}

var extToLangMap map[string]string = map[string]string{
	".adoc":        "AsciiDoc",
	".asc":         "AsciiDoc",
	".asciidoc":    "AsciiDoc",
	".AppleScript": "applescript",
	".bzl":         "python",
	".c":           "c",
	".coffee":      "coffeescript",
	".cpp":         "cpp",
	".css":         "css",
	".ex":          "elixir",
	".exs":         "elixir",
	".erl":         "erlang",
	".go":          "go",
	".h":           "cpp",
	".hs":          "haskell",
	".html":        "markup",
	".java":        "java",
	".js":          "javascript",
	".json":        "json",
	".jsx":         "jsx",
	".m":           "objectivec",
	".markdown":    "markdown",
	".md":          "markdown",
	".mdown":       "markdown",
	".mkdn":        "markdown",
	".mediawiki":   "markdown",
	".nix":         "nix",
	".php":         "php",
	".pl":          "perl",
	".proto":       "go",
	".py":          "python",
	".pyst":        "python",
	".rb":          "ruby",
	".rdoc":        "markdown",
	".rs":          "rust",
	".scala":       "scala",
	".scpt":        "applescript",
	".scss":        "scss",
	".sh":          "bash",
	".sky":         "python",
	".sql":         "sql",
	".swift":       "swift",
	".textile":     "markdown",
	".ts":          "typescript",
	".tsx":         "tsx",
	".wiki":        "markdown",
	".xml":         "markup",
	".yaml":        "yaml",
	".yml":         "yaml",
}

var fileFirstLineToLangMap map[*regexp.Regexp]string = map[*regexp.Regexp]string{
	regexp.MustCompile(`^#!.*\bpython[23]?\b`): "python",
	regexp.MustCompile(`^#!.*\bbash\b`):        "bash",
	regexp.MustCompile(`^#!.*\bsh\b`):          "bash",
	regexp.MustCompile(`^#!.*\bruby\b`):        "ruby",
	regexp.MustCompile(`^#!.*\bperl\b`):        "perl",
}

// Grabbed from the extensions GitHub supports here - https://github.com/github/markup
var supportedReadmeExtensions = []string{
	"markdown", "mdown", "mkdn", "md", "textile", "rdoc", "org", "creole", "mediawiki", "wiki",
	"rst", "asciidoc", "adoc", "asc", "pod",
}

var supportedReadmeRegex = buildReadmeRegex(supportedReadmeExtensions)

func (s *server) ServeFile(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	if len(s.repos) == 0 {
		http.Error(w, "File browsing not enabled", 404)
		return
	}

	backend := r.PathValue("backend")
	path := r.PathValue("path")
	repoName, path, _ := strings.Cut(path, "@")
	commit, path, _ := strings.Cut(path, "/+/")

	fileData, err := buildFileData(s.bk[backend], repoName, commit, path)
	if err != nil {
		http.Error(w, "Error reading file: "+err.Error(), 500)
		return
	}
	url, domain := externalURL(repoName, commit, path)
	fileData.ExternalDomain = domain
	script_data := &struct {
		RepoName   string `json:"repo_name"`
		URLPattern string `json:"url_pattern"`
		FilePath   string `json:"file_path"`
		Commit     string `json:"commit"`
	}{
		RepoName:   repoName,
		URLPattern: url,
		FilePath:   path,
		Commit:     commit,
	}

	s.renderPage(w, "fileview.html", &page{
		Title:         fileData.PathSegments[len(fileData.PathSegments)-1].Name,
		JSPath:        "fileview/fileview",
		CSSPath:       "fileview/fileview",
		ScriptData:    script_data,
		IncludeHeader: false,
		Data:          fileData,
	})
}

func externalURL(repo, commit, path string) (url, name string) {
	// URLPattern may have these replaceable tags:
	// - {name}: repo name
	// - {version}: the commit
	// - {path}: file path in repo
	// - {lno}: the line number
	if repo, found := strings.CutPrefix(repo, "github.com/"); found {
		return "https://github.com/" + repo + "/blob/" + commit + "/" + path + "#L{lno}", "GitHub"
	}
	return "", ""
}

type breadCrumbEntry struct {
	Name string
	Path string
}

type directoryListEntry struct {
	Name          string
	Path          string
	IsDir         bool
	SymlinkTarget string
}

type fileViewerContext struct {
	Backend        string
	PathSegments   []breadCrumbEntry
	RepoName       string
	RepoURL        string
	Commit         string
	DirContent     *directoryContent
	FileContent    *sourceFileContent
	ExternalDomain string
	Headlink       string
}

type sourceFileContent struct {
	Content   string
	LineCount int
	Language  string
}

type directoryContent struct {
	Entries       []directoryListEntry
	ReadmeContent *sourceFileContent
}

type DirListingSort []directoryListEntry

func (s DirListingSort) Len() int {
	return len(s)
}

func (s DirListingSort) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}

func (s DirListingSort) Less(i, j int) bool {
	if s[i].IsDir != s[j].IsDir {
		return s[i].IsDir
	}
	return s[i].Name < s[j].Name
}

func gitCommitHash(ref string, repoPath string) (string, error) {
	out, err := exec.Command(
		"git", "-C", repoPath, "rev-parse", ref,
	).Output()
	if err != nil {
		return "", err
	}
	return string(out), nil
}

func gitObjectType(obj string, repoPath string) (string, error) {
	out, err := exec.Command("git", "-C", repoPath, "cat-file", "-t", obj).Output()
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(out)), nil
}

func gitCatBlob(obj string, repoPath string) (string, error) {
	out, err := exec.Command("git", "-C", repoPath, "cat-file", "blob", obj).Output()
	if err != nil {
		return "", err
	}
	return string(out), nil
}

type gitTreeEntry struct {
	Mode       string
	ObjectType string
	ObjectId   string
	ObjectName string
}

func gitParseTreeEntry(line string) gitTreeEntry {
	dataAndPath := strings.SplitN(line, "\t", 2)
	dataFields := strings.Split(dataAndPath[0], " ")
	return gitTreeEntry{
		Mode:       dataFields[0],
		ObjectType: dataFields[1],
		ObjectId:   dataFields[2],
		ObjectName: dataAndPath[1],
	}
}

func gitListDir(obj string, repoPath string) ([]gitTreeEntry, error) {
	out, err := exec.Command("git", "-C", repoPath, "cat-file", "-p", obj).Output()
	if err != nil {
		return nil, err
	}

	lines := strings.Split(string(out), "\n")
	lines = lines[:len(lines)-1]
	result := make([]gitTreeEntry, len(lines))
	for i, line := range lines {
		result[i] = gitParseTreeEntry(line)
	}
	return result, nil
}

func viewPath(backend, repo, commit string, name ...string) string {
	return path.Join("/view/", backend, repo+"@"+commit+"/+/"+path.Join(name...))
}

func buildReadmeRegex(supportedReadmeExtensions []string) *regexp.Regexp {
	// Sort in descending order of length so most specific match is selected by regex engine
	sort.Slice(supportedReadmeExtensions, func(i, j int) bool {
		return len(supportedReadmeExtensions[i]) >= len(supportedReadmeExtensions[j])
	})

	// Build regex of form "README.(ext1|ext2)" README case insensitive
	var buf bytes.Buffer
	for i, ext := range supportedReadmeExtensions {
		buf.WriteString(regexp.QuoteMeta(ext))
		if i < len(supportedReadmeExtensions)-1 {
			buf.WriteString("|")
		}
	}
	repoRegexAlt := buf.String()
	repoFileRegex := regexp.MustCompile(fmt.Sprintf("((?i)readme)\\.(%s)", repoRegexAlt))

	return repoFileRegex
}

func languageFromFirstLine(line string) string {
	for regex, lang := range fileFirstLineToLangMap {
		if regex.MatchString(line) {
			return lang
		}
	}
	return ""
}

func buildFileData(backend cs.SearchIndex, repoName, commit, backendPrefix string) (*fileViewerContext, error) {
	paths := backend.Paths(repoName, commit, backendPrefix)
	if len(paths) == 0 {
		return nil, fmt.Errorf("not found: %q", backendPrefix)
	}
	var fileContent *sourceFileContent
	var dirContent *directoryContent
	if len(paths) == 1 && paths[0].Path == backendPrefix {
		// This is a blob.
		content := backend.Data(paths[0].Tree, paths[0].Version, paths[0].Path)
		language := filenameToLangMap[filepath.Base(backendPrefix)]
		if language == "" {
			language = extToLangMap[filepath.Ext(backendPrefix)]
		}
		if language == "" {
			firstLine, _, found := strings.Cut(string(content), "\n")
			if found {
				language = languageFromFirstLine(firstLine)
			}
		}
		fileContent = &sourceFileContent{
			Content:   content,
			LineCount: strings.Count(string(content), "\n"),
			Language:  language,
		}
	} else {
		// This is a directory listing.
		if backendPrefix != "" && !strings.HasSuffix(backendPrefix, "/") {
			backendPrefix += "/"
		}
		dirEntries := make([]directoryListEntry, 0, len(paths))
		var readmePath, readmeLang string
		for _, p := range paths {
			relPath, found := strings.CutPrefix(p.Path, backendPrefix)
			if !found {
				continue
			}
			base, _, isdir := strings.Cut(relPath, "/")
			if len(dirEntries) > 0 && dirEntries[len(dirEntries)-1].Name == base {
				// Subdirectory, and already handled.
				continue
			}
			viewURL := viewPath(backend.Name(), repoName, commit, backendPrefix, base)
			if isdir {
				viewURL += "/"
			}

			de := directoryListEntry{
				Name:  base,
				Path:  viewURL,
				IsDir: isdir,
			}
			dirEntries = append(dirEntries, de)

			// Git supports case sensitive files, so README.md & readme.md in the same tree is possible
			// so in this case we just grab the first matching file
			if readmePath != "" {
				continue
			}

			parts := supportedReadmeRegex.FindStringSubmatch(de.Name)
			if len(parts) != 3 {
				continue
			}
			readmePath = p.Path + parts[0]
			readmeLang = parts[2]
		}

		sort.Sort(DirListingSort(dirEntries))

		var readmeContent *sourceFileContent
		if readmePath != "" {
			content := backend.Data(repoName, commit, readmePath)
			readmeContent = &sourceFileContent{
				Content:   content,
				LineCount: strings.Count(content, "\n"),
				Language:  extToLangMap["."+readmeLang],
			}
		}
		dirContent = &directoryContent{
			Entries:       dirEntries,
			ReadmeContent: readmeContent,
		}
	}

	pathSplits := strings.Split(backendPrefix, "/")
	segments := make([]breadCrumbEntry, len(pathSplits))
	for i, name := range pathSplits {
		parentPath := path.Clean(strings.Join(pathSplits[0:i], "/"))
		slash := "/"
		if i == len(pathSplits)-1 {
			slash = ""
		}
		segments[i] = breadCrumbEntry{
			Name: name,
			Path: viewPath(backend.Name(), repoName, commit, parentPath, name) + slash,
		}
	}

	return &fileViewerContext{
		Backend:      backend.Name(),
		PathSegments: segments,
		RepoName:     repoName,
		RepoURL:      viewPath(backend.Name(), repoName, commit),
		Commit:       commit,
		DirContent:   dirContent,
		FileContent:  fileContent,
	}, nil
}
