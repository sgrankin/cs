// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"html/template"
	"log"
	"net/http"
)

var spaTemplate = template.Must(template.New("spa").Parse(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{.Title}}</title>
<link rel="search" type="application/opensearchdescription+xml" title="codesearch" href="/opensearch.xml">
</head>
<body>
<cs-app></cs-app>
<script type="module" src="/static/app.js"></script>
</body>
</html>
`))

type spaData struct {
	Title string
}

// ServeSPA serves the SPA HTML shell for the new frontend.
func (s *server) ServeSPA(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Cache-Control", "no-cache")
	data := spaData{Title: "code search"}
	if err := spaTemplate.Execute(w, data); err != nil {
		log.Printf("spa template error: %v", err)
	}
}
