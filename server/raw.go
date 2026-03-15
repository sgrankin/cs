// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
)

// ServeRaw handles GET /raw/{path...}, serving raw file content or directory listings.
//
// Path format: {tree}/{version}/+/{filepath...}
//   - File (no trailing slash): raw bytes, application/octet-stream, immutable cache
//   - Directory (trailing slash): JSON array of child entry names (dirs have trailing slashes)
func (s *server) ServeRaw(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	rawPath := r.PathValue("path")

	// Split on /+/ to separate tree/version from filepath.
	before, filePath, ok := strings.Cut(rawPath, "/+/")
	if !ok {
		http.Error(w, "path must contain /+/ separator", http.StatusBadRequest)
		return
	}
	tree, version, ok := strings.Cut(before, "/")
	if !ok || tree == "" || version == "" {
		http.Error(w, "path must start with {tree}/{version}/+/", http.StatusBadRequest)
		return
	}

	w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")

	if strings.HasSuffix(rawPath, "/") || filePath == "" {
		// Directory listing.
		s.serveRawDir(w, tree, version, filePath)
		return
	}

	// File content.
	s.serveRawFile(w, tree, version, filePath)
}

func (s *server) serveRawFile(w http.ResponseWriter, tree, version, filePath string) {
	data := s.bk.Data(tree, version, filePath)
	if data == "" {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/octet-stream")
	w.Write([]byte(data))
}

func (s *server) serveRawDir(w http.ResponseWriter, tree, version, pathPrefix string) {
	files := s.bk.Paths(tree, version, pathPrefix)
	if len(files) == 0 {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}

	// Collect immediate children (one level deep).
	seen := map[string]bool{}
	var entries []string
	for _, f := range files {
		rel, ok := strings.CutPrefix(f.Path, pathPrefix)
		if !ok {
			continue
		}
		base, _, isDir := strings.Cut(rel, "/")
		name := base
		if isDir {
			name += "/"
		}
		if seen[name] {
			continue
		}
		seen[name] = true
		entries = append(entries, name)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(entries)
}
