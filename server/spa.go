// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"path"
	"slices"
	"sort"
)

var spaTemplate = template.Must(template.New("spa").Parse(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{.Title}}</title>
<link rel="stylesheet" href="/static/app.css">
<link rel="search" type="application/opensearchdescription+xml" title="codesearch" href="/opensearch.xml">
<link rel="icon" href="/static/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png">
</head>
<body>
<script>window.__CS_INIT = {{.InitJSON}};</script>
<cs-app></cs-app>
<script type="module" src="/static/app.js"></script>
{{if .DevMode}}
<script>
(function() {
	var version = null;
	var reconnectDelay = 100;
	function connect() {
		var es = new EventSource("/debug/livereload");
		es.onmessage = function(e) {
			if (version === null) {
				version = e.data;
				reconnectDelay = 100;
			} else if (e.data !== version) {
				location.reload();
			}
		};
		es.onerror = function() {
			es.close();
			setTimeout(function() {
				reconnectDelay = Math.min(reconnectDelay * 2, 5000);
				connect();
			}, reconnectDelay);
		};
	}
	connect();
})();
</script>
{{end}}
</body>
</html>
`))

type spaData struct {
	Title   string
	DevMode bool
	// InitJSON is a template.JS value embedded as window.__CS_INIT.
	InitJSON template.JS
}

// repoGroup is a group label + sorted list of repo names for the repo selector.
type repoGroup struct {
	Label string   `json:"label"`
	Repos []string `json:"repos"`
}

// ServeSPA serves the SPA HTML shell for the new frontend.
func (s *server) ServeSPA(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", "no-cache")

	// Build repo list grouped by directory prefix (matching old templ groupRepos).
	info := s.bk.Info()
	groups := map[string][]string{}
	for _, tree := range info.Trees {
		dir := path.Dir(tree.Name) + "/"
		groups[dir] = append(groups[dir], tree.Name)
	}
	keys := slices.Sorted(func(yield func(string) bool) {
		for k := range groups {
			if !yield(k) {
				return
			}
		}
	})
	var repoGroups []repoGroup
	for _, k := range keys {
		repos := groups[k]
		sort.Strings(repos)
		repoGroups = append(repoGroups, repoGroup{Label: k, Repos: repos})
	}

	initData := map[string]any{
		"repos": repoGroups,
	}
	initJSON, _ := json.Marshal(initData)

	data := spaData{
		Title:    "code search",
		DevMode:  s.devMode,
		InitJSON: template.JS(initJSON),
	}
	if err := spaTemplate.Execute(w, data); err != nil {
		log.Printf("spa template error: %v", err)
	}
}
