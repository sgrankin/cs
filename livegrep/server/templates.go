// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"embed"
	"fmt"
	"html/template"
	"io/fs"
	"path/filepath"
	"strings"
)

//go:embed templates
var templatesFS embed.FS

func linkTag(rel string, href string) template.HTML {
	return template.HTML(fmt.Sprintf(
		`<link rel="%s" href="%s" >`,
		rel, href,
	))
}

func scriptTag(s string, m map[string]string) template.HTML {
	hash := m[strings.TrimPrefix(s, "/")]
	href := s + "?v=" + hash
	integrity := "sha256-" + hash
	return template.HTML(fmt.Sprintf(
		`<script src="%s" integrity="%s" type="module" defer></script>`,
		href, integrity,
	))
}

func getFuncs() map[string]interface{} {
	return map[string]interface{}{
		"loop":      func(n int) []struct{} { return make([]struct{}, n) },
		"toLineNum": func(n int) int { return n + 1 },
		"linkTag":   linkTag,
		"scriptTag": scriptTag,
	}
}

func LoadTemplates(templates map[string]*template.Template) error {
	pattern := "templates/common/*.html"
	common := template.New("").Funcs(getFuncs())
	common = template.Must(common.ParseFS(templatesFS, pattern))

	pattern = "templates/*.html"
	paths, err := fs.Glob(templatesFS, pattern)
	if err != nil {
		return err
	}
	for _, path := range paths {
		t := template.Must(common.Clone())
		t = template.Must(t.ParseFS(templatesFS, path))
		templates[filepath.Base(path)] = t
	}
	return nil
}
