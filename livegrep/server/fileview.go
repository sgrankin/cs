// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"bytes"
	"context"
	"fmt"
	"net/http"
	"path"
	"regexp"
	"sort"
	"strings"

	"github.com/a-h/templ"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/livegrep/server/api"
	"sgrankin.dev/cs/livegrep/server/chroma"
	"sgrankin.dev/cs/livegrep/server/views"
)

// Grabbed from the extensions GitHub supports here - https://github.com/github/markup
var supportedReadmeRegex = buildReadmeRegex([]string{
	"markdown", "mdown", "mkdn", "md", "textile", "rdoc", "org", "creole", "mediawiki", "wiki",
	"rst", "asciidoc", "adoc", "asc", "pod",
})

func (s *server) ServeFile(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	path := r.PathValue("path")
	repoName, path, _ := strings.Cut(path, "@")
	commit, path, _ := strings.Cut(path, "/+/")

	fileData, err := buildFileData(s.bk, repoName, commit, path)
	if err != nil {
		http.Error(w, "Error reading file: "+err.Error(), 500)
		return
	}
	url, domain := externalURL(repoName, commit, path)
	fileData.ExternalDomain = domain
	script_data := &api.FileViewData{
		RepoName:   repoName,
		URLPattern: url,
		FilePath:   path,
		Commit:     commit,
	}
	views.FileView(views.Page{
		Title:         fileData.PathSegments[len(fileData.PathSegments)-1].Name,
		JSPath:        meta.EntrypointMap["web/fileview.ts"].JS,
		CSSPath:       meta.EntrypointMap["web/fileview.ts"].CSS,
		ScriptData:    script_data,
		IncludeHeader: false,
	}, *fileData).Render(r.Context(), w)
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

type DirListingSort []views.DirectoryListEntry

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

func viewPath(repo, commit string, name ...string) string {
	return path.Join("/view/", repo+"@"+commit+"/+/"+path.Join(name...))
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

func buildFileData(backend cs.SearchIndex, repoName, commit, path string) (*views.FileViewerContext, error) {
	files := backend.Paths(repoName, commit, path)
	if len(files) == 0 {
		return nil, fmt.Errorf("not found: %q", path)
	}
	var fileContent *views.SourceFileContent
	var dirContent *views.DirectoryContent
	if len(files) == 1 && files[0].Path == path {
		// This is a blob.
		fileContent = mkFileContent(backend, files[0])
	} else {
		dirContent = mkDirContent(backend, files, repoName, commit, path)
	}
	segments := mkPathSegments(backend, repoName, commit, path)
	return &views.FileViewerContext{
		Backend:      backend.Name(),
		PathSegments: segments,
		RepoName:     repoName,
		RepoURL:      viewPath(backend.Name(), repoName, commit),
		Commit:       commit,
		DirContent:   dirContent,
		FileContent:  fileContent,
	}, nil
}

func mkPathSegments(backend cs.SearchIndex, repoName, commit, p string) []views.BreadCrumbEntry {
	splits := strings.Split(p, "/")
	segments := make([]views.BreadCrumbEntry, len(splits))
	for i, name := range splits {
		parentPath := path.Clean(strings.Join(splits[0:i], "/"))
		slash := "/"
		if i == len(splits)-1 {
			slash = ""
		}
		segments[i] = views.BreadCrumbEntry{
			Name: name,
			Path: viewPath(repoName, commit, parentPath, name) + slash,
		}
	}
	return segments
}

func mkFileContent(backend cs.SearchIndex, file cs.File) *views.SourceFileContent {
	content := backend.Data(file.Tree, file.Version, file.Path)
	return &views.SourceFileContent{
		FormattedContent: templ.Raw(chroma.FormatHTML(path.Base(file.Path), content)),
	}
}

func mkDirContent(backend cs.SearchIndex, files []cs.File, repoName, commit, pathPrefix string) *views.DirectoryContent {
	// This is a directory listing.
	if pathPrefix != "" && !strings.HasSuffix(pathPrefix, "/") {
		pathPrefix += "/"
	}
	dirEntries := make([]views.DirectoryListEntry, 0, len(files))
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
		viewURL := viewPath(repoName, commit, pathPrefix, base)
		if isdir {
			viewURL += "/"
		}

		de := views.DirectoryListEntry{
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

	var readmeContent *views.SourceFileContent
	if readmePath != "" {
		readmeContent = mkFileContent(backend, cs.File{Tree: repoName, Version: commit, Path: readmePath})
	}
	return &views.DirectoryContent{
		Entries:       dirEntries,
		ReadmeContent: readmeContent,
	}
}
