// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"bytes"
	"context"
	"fmt"
	"html/template"
	"net/http"
	"os/exec"
	"path"
	"regexp"
	"sort"
	"strings"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server/chroma"
)

// Grabbed from the extensions GitHub supports here - https://github.com/github/markup
var supportedReadmeRegex = buildReadmeRegex([]string{
	"markdown", "mdown", "mkdn", "md", "textile", "rdoc", "org", "creole", "mediawiki", "wiki",
	"rst", "asciidoc", "adoc", "asc", "pod",
})

func (s *server) ServeFile(ctx context.Context, w http.ResponseWriter, r *http.Request) {
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
		JSPath:        meta.EntrypointMap["web/fileview.ts"].JS,
		CSSPath:       meta.EntrypointMap["web/fileview.ts"].CSS,
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
	FormattedContent template.HTML
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

func buildFileData(backend cs.SearchIndex, repoName, commit, path string) (*fileViewerContext, error) {
	files := backend.Paths(repoName, commit, path)
	if len(files) == 0 {
		return nil, fmt.Errorf("not found: %q", path)
	}
	var fileContent *sourceFileContent
	var dirContent *directoryContent
	if len(files) == 1 && files[0].Path == path {
		// This is a blob.
		fileContent = mkFileContent(backend, files[0])
	} else {
		dirContent = mkDirContent(backend, files, repoName, commit, path)
	}
	segments := mkPathSegments(backend, repoName, commit, path)
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

func mkPathSegments(backend cs.SearchIndex, repoName, commit, p string) []breadCrumbEntry {
	splits := strings.Split(p, "/")
	segments := make([]breadCrumbEntry, len(splits))
	for i, name := range splits {
		parentPath := path.Clean(strings.Join(splits[0:i], "/"))
		slash := "/"
		if i == len(splits)-1 {
			slash = ""
		}
		segments[i] = breadCrumbEntry{
			Name: name,
			Path: viewPath(backend.Name(), repoName, commit, parentPath, name) + slash,
		}
	}
	return segments
}

func mkFileContent(backend cs.SearchIndex, file cs.File) *sourceFileContent {
	content := backend.Data(file.Tree, file.Version, file.Path)
	return &sourceFileContent{
		FormattedContent: chroma.FormatHTML(path.Base(file.Path), content),
	}
}

func mkDirContent(backend cs.SearchIndex, files []cs.File, repoName, commit, pathPrefix string) *directoryContent {
	// This is a directory listing.
	if pathPrefix != "" && !strings.HasSuffix(pathPrefix, "/") {
		pathPrefix += "/"
	}
	dirEntries := make([]directoryListEntry, 0, len(files))
	var readmePath string
	for _, p := range files {
		relPath, found := strings.CutPrefix(p.Path, pathPrefix)
		if !found {
			continue
		}
		base, _, isdir := strings.Cut(relPath, "/")
		if len(dirEntries) > 0 && dirEntries[len(dirEntries)-1].Name == base {
			// Subdirectory, and already handled.
			continue
		}
		viewURL := viewPath(backend.Name(), repoName, commit, pathPrefix, base)
		if isdir {
			viewURL += "/"
		}

		de := directoryListEntry{
			Name:  base,
			Path:  viewURL,
			IsDir: isdir,
		}
		dirEntries = append(dirEntries, de)

		// Git supports case-sensitive files, so README.md & readme.md in the same tree is possible
		// so in this case we just grab the first matching file
		if readmePath != "" {
			continue
		}

		parts := supportedReadmeRegex.FindStringSubmatch(de.Name)
		if len(parts) != 3 {
			continue
		}
		readmePath = p.Path + parts[0]
	}

	sort.Sort(DirListingSort(dirEntries))

	var readmeContent *sourceFileContent
	if readmePath != "" {
		readmeContent = mkFileContent(backend, cs.File{repoName, commit, readmePath})
	}
	return &directoryContent{
		Entries:       dirEntries,
		ReadmeContent: readmeContent,
	}
}
