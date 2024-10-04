// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"embed"
	"fmt"
	"html/template"
	"io/fs"
	"log"
	"maps"
	"path"
	"path/filepath"
	"strings"

	"github.com/Masterminds/sprig"
)

//go:embed templates
var templatesFS embed.FS

func linkTag(nonce template.HTMLAttr, rel string, s string, m map[string]string) template.HTML {
	hash := m[strings.TrimPrefix(s, "/")]
	href := s + "?v=" + hash
	integrity := "sha256-" + hash
	return template.HTML(fmt.Sprintf(
		`<link%s rel="%s" href="%s" integrity="%s" />`,
		nonce, rel, href, integrity,
	))
}

func scriptTag(nonce template.HTMLAttr, s string, m map[string]string) template.HTML {
	hash := m[strings.TrimPrefix(s, "/")]
	href := s + "?v=" + hash
	integrity := "sha256-" + hash
	return template.HTML(fmt.Sprintf(
		`<script%s src="%s" integrity="%s" type="module"></script>`,
		nonce, href, integrity,
	))
}

func viewURL(backend, tree, version, p string, lno int) string {
	p = path.Clean(p)
	url := fmt.Sprintf("/view/%s/%s@%s/+/%s", backend, tree, version, p)
	if lno >= 0 {
		url += fmt.Sprintf("#L%d", lno)
	}
	return url
}

func templateFns() map[string]interface{} {
	return map[string]interface{}{
		"loop":      func(n int) []struct{} { return make([]struct{}, n) },
		"toLineNum": func(n int) int { return n + 1 },
		"linkTag":   linkTag,
		"scriptTag": scriptTag,
		"viewURL":   viewURL,
		//"min":       func(xs ...int) int { return slices.Min(xs) },
	}
}

func LoadTemplates(templates map[string]*template.Template) error {
	pattern := "templates/common/*.html"
	fns := sprig.FuncMap()
	delete(fns, "slice") // Sprig slice can't handle strings :shrug:
	maps.Copy(fns, templateFns())
	common := template.Must(template.
		New("").
		Funcs(fns).
		ParseFS(templatesFS, pattern))

	pattern = "templates/*.html"
	paths, err := fs.Glob(templatesFS, pattern)
	if err != nil {
		return err
	}
	for _, path := range paths {
		t := template.Must(common.Clone())
		log.Printf("loading %s", path)
		t = template.Must(t.ParseFS(templatesFS, path))
		templates[filepath.Base(path)] = t
	}
	return nil
}
