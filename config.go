package cs

import (
	"html/template"
)

type Config struct {
	Indexes []IndexConfig `json:"indexes"`
	Serve   ServeConfig   `json:"serve"`
}

type IndexConfig struct {
	Name string `json:"name"` // Optional, defaults to path base.
	Path string `json:"path"` // Path to the index.  A directory fully owned by the index.

	Repos       []RepoConfig     `json:"repos"`       // Repositories to fetch.
	RepoSources RepoSourceConfig `json:"reposources"` // Sources that expand into more repos.
}

type RepoConfig struct {
	Name      string // Optional, defaults to base path of URL.  Must be unique.
	RemoteURL string // Remote URL.
	RemoteRef string // Remote reference / branch / etc.
}

type RepoSourceConfig struct {
	GitHub []GitHubSourceConfig `json:"github"`
}

type GitHubSourceConfig struct {
	// One and only one of org, user, or repo must be set.
	Org  string `json:"org"`
	User string `json:"user"`
	Repo string `json:"repo"`

	Ref      string `json:"ref"` // Defaults to HEAD.
	Archived bool   `json:"archived"`
	Forks    bool   `json:"forks"` // Include archived or forked repos.
}

type ServeConfig struct {
	DefaultMaxMatches int `json:"default_max_matches"`

	Templates struct {
		// TODO: move page customizations into a sub struct.
		Feedback struct {
			MailTo string `json:"mailto"` // The mailto address for the "feedback" url.
		} `json:"feedback"`

		HeaderHTML template.HTML `json:"header_html"` // HTML injected into layout template for site-specific customizations.
		FooterHTML template.HTML `json:"footer_html"` // HTML injected into layout template just before </body> for site-specific customization.

		Links []LinkConfig `json:"file_links"` // Add extra links to files.
	} `json:"templates"`

	Languages struct {
		FileExtToLang map[string]string `json:"file_ext_to_lang"` // Additional file extensions to highlight in the built-in fileview.

		// Regular expression to match the first line of a file to determine its
		// language.  This is used to override the language detection for files that
		// don't have a recognized extension.
		FileFirstLineRegexToLang map[string]string `json:"file_first_line_regex_to_lang"`
	} `json:"languages"`
}

type LinkConfig struct {
	MatchRegexp string `json:"match_regexp"` // Filename match that enables this link.
	Label       string `json:"label"`        // Link label.
	UrlTemplate string `json:"url_template"` // URL template with {placeholders}: name, basename, version, path, lno.
	Target      string `json:"target"`       // <a> tag target attribute.
}
