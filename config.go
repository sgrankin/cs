package cs

import (
	"html/template"
)

type Config struct {
	Index IndexConfig `json:"index"`
	Serve ServeConfig `json:"serve"`
}

type IndexConfig struct {
	Name string `json:"name"` // The name of this grouping of repos.  Defaults to path basename.
	Path string `json:"path"` // A directory holding all of the indexes and git data.

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
	Forks    bool   `json:"forks"`  // Include archived or forked repos.
	Reject   string `json:"reject"` // Regexp, if not empty, to filter out repos from the index.
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
	} `json:"templates"`
}
