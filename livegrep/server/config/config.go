// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package config

import (
	"html/template"
)

type Config struct {
	Feedback struct {
		// The mailto address for the "feedback" url.
		MailTo string `json:"mailto"`
	} `json:"feedback"`

	// Should we respect X-Real-Ip, X-Real-Proto, and X-Forwarded-Host?
	ReverseProxy bool `json:"reverse_proxy"`

	// The address to listen on, as HOST:PORT.
	Listen string `json:"listen"`

	// HTML injected into layout template
	// for site-specific customizations
	HeaderHTML template.HTML `json:"header_html"`

	// HTML injected into layout template
	// just before </body> for site-specific customization
	FooterHTML template.HTML `json:"footer_html"`

	DefaultMaxMatches int `json:"default_max_matches"`

	// Same json config structure that the backend uses when building indexes;
	// used here for repository browsing.
	IndexConfig []IndexConfig `json:"index_config"`

	DefaultSearchRepos []string `json:"default_search_repos"`

	LinkConfigs []LinkConfig `json:"file_links"`

	// Additional file extensions to highlight with PrismJS in the built-in fileview
	FileExtToLang map[string]string `json:"file_ext_to_lang"`

	// Regular expression to match the first line of a file to determine its
	// language.  This is used to override the language detection for files that
	// don't have a recognized extension.
	FileFirstLineRegexToLang map[string]string `json:"file_first_line_regex_to_lang"`
}

type IndexConfig struct {
	Path string `json:"path"`
}

type LinkConfig struct {
	Label            string `json:"label"`
	UrlTemplate      string `json:"url_template"`
	WhitelistPattern string `json:"whitelist_pattern"`
	Target           string `json:"target"`
}
