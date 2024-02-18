package cs

import (
	"html/template"
	"time"
)

type Config struct {
	Indexes []IndexConfig `json:"indexes"`
	Serve   ServeConfig   `json:"serve"`
}

type FetchConfig struct {
	GitPath string      `json:"git_path"` // Location of the git repository to fetch into.
	Specs   []FetchSpec `json:"specs"`
}

type FetchSpec struct {
	GitHub *struct {
		Org, User, Repo string // Pick one.
		Ref             string // Defaults to HEAD.
		Archived, Forks bool   // Include archived or forked repos.
	}
}

type ServeConfig struct {
	Listen string `json:"listen"` // The address to listen on, as HOST:PORT.

	// TODO: move page customizations into a sub struct.
	Feedback struct {
		MailTo string `json:"mailto"` // The mailto address for the "feedback" url.
	} `json:"feedback"`

	ReverseProxy bool `json:"reverse_proxy"` // Should we respect X-Real-Ip, X-Real-Proto, and X-Forwarded-Host?

	IndexReloadPollPeriod time.Duration // How often to check index files for updates.
	HeaderHTML            template.HTML `json:"header_html"` // HTML injected into layout template for site-specific customizations.
	FooterHTML            template.HTML `json:"footer_html"` // HTML injected into layout template just before </body> for site-specific customization.

	DefaultMaxMatches  int          `json:"default_max_matches"`
	DefaultSearchRepos []string     `json:"default_search_repos"`
	LinkConfigs        []LinkConfig `json:"file_links"` // Add extra links to files.

	FileExtToLang map[string]string `json:"file_ext_to_lang"` // Additional file extensions to highlight in the built-in fileview.

	// Regular expression to match the first line of a file to determine its
	// language.  This is used to override the language detection for files that
	// don't have a recognized extension.
	FileFirstLineRegexToLang map[string]string `json:"file_first_line_regex_to_lang"`
}

type IndexConfig struct {
	Path  string      `json:"path"`  // Path to the index.
	Fetch FetchConfig `json:"fetch"` // Git repositories to fetch into it.
}

type LinkConfig struct {
	MatchRegexp string `json:"match_regexp"` // Filename match that enables this link.
	Label       string `json:"label"`        // Link label.
	UrlTemplate string `json:"url_template"` // URL template with {placeholders}: name, basename, version, path, lno.
	Target      string `json:"target"`       // <a> tag target attribute.
}
