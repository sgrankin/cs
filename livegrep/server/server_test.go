// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"regexp"
	"testing"

	"sgrankin.dev/cs/livegrep/server/config"
)

func assertRepoPath(t *testing.T,
	repoRegex *regexp.Regexp,
	url string,
	expectedRepo string,
	expectedPath string,
	expectedErr error,
) {
	actualRepo, actualPath, err := getRepoPathFromURL(repoRegex, url)
	if err != expectedErr {
		t.Errorf("error expectation mismatch when parsing url, got %v, expected %v", err.Error(), expectedErr)
	}

	if actualRepo != expectedRepo {
		t.Errorf("repo expectation mismatch when parsing url, got %v, expected %v", actualRepo, expectedRepo)
	}

	if actualPath != expectedPath {
		t.Errorf("repo expectation mismatch when parsing url, got %v, expected %v", actualPath, expectedPath)
	}
}

func TestRepoRegexParsing(t *testing.T) {
	repoNames := []string{"test-repo", "test-org/test-repo", "test-repo-2", "foobar"}

	repoRegex, err := buildRepoRegex(repoNames)
	if err != nil {
		t.Errorf("unexpected error building repo regex (%v)", err.Error())
	}

	assertRepoPath(t, repoRegex, "/view/test-repo/path/to/foobar.css", "test-repo", "path/to/foobar.css", nil)
	assertRepoPath(t, repoRegex, "/view/test-org/test-repo/path/to/foobar.css", "test-org/test-repo", "path/to/foobar.css", nil)
	assertRepoPath(t, repoRegex, "/view/test-repo-2/path/to/foobar.css", "test-repo-2", "path/to/foobar.css", nil)
	assertRepoPath(t, repoRegex, "/view/foobar/path/to/foobar.css", "foobar", "path/to/foobar.css", nil)
	assertRepoPath(t, repoRegex, "/view/not-exist/path/to/foobar.css", "", "", serveUrlParseError)
	assertRepoPath(t, repoRegex, "/not/even/a/url/not-exist/path/to/foobar.css", "", "", serveUrlParseError)
}

func TestTemplatesLoad(t *testing.T) {
	srv := server{config: &config.Config{}}
	srv.loadTemplates()
}
