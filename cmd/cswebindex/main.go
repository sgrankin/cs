/*
cswebindex updates the indexes for csweb based on the configuration.

First it updates the local Git copy of all the specified repositories.
Then it creates new temporary indexes from the fetched trees.
The new indexes are then moved into place.
csweb will detect the updates and reload as needed.
*/
package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/goccy/go-yaml"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/codesearch/index"
	"sgrankin.dev/cs/internal"
)

var (
	githubToken = cs.FlagVar[cs.EnvString]("github-token", "${GITHUB_TOKEN}", "GitHub token to auth with to the API.")
	configPath  = cs.FlagVar[cs.EnvString]("config", "config.yaml", "The path to the config file specifying what to sync.")
)

func main() {
	log.SetFlags(log.Lshortfile)
	log.SetOutput(os.Stdout)
	flag.Parse()

	if err := run(configPath.Get(), githubToken.Get()); err != nil {
		log.Fatal(err)
	}
}

func run(configPath, gitHubToken string) error {
	ctx := context.Background()

	cfg, err := os.ReadFile(configPath)
	if err != nil {
		return fmt.Errorf("reading config at %q: %w", configPath, err)
	}
	var config cs.Config
	if err := yaml.Unmarshal(cfg, &config); err != nil {
		return fmt.Errorf("unmarshalling config: %w", err)
	}

	for _, ixConfig := range config.Indexes {
		gitPath := ixConfig.Fetch.GitPath
		repo, err := internal.OpenGitRepo(gitPath)
		if err != nil {
			return fmt.Errorf("opening git repo at %q: %w", gitPath, err)
		}

		toFetch, err := internal.ResolveFetchSpecs(ctx, ixConfig.Fetch.Specs, gitHubToken)
		if err != nil {
			return fmt.Errorf("resolving specs: %w", err)
		}
		if err := internal.FetchToGitRepo(ctx, repo, toFetch); err != nil {
			return fmt.Errorf("fetching: %w", err)
		}
		if err := internal.GCRefs(repo, toFetch); err != nil {
			return fmt.Errorf("pruning: %w", err)
		}

		master := ixConfig.Path
		temp := master + "~"
		ix := index.Create(temp)

		refs := internal.ListRefs(repo)
		if err := internal.IndexRefs(ix, repo, refs); err != nil {
			return fmt.Errorf("indexing: %w", err)
		}
		ix.Flush()
		os.Rename(temp, master)
	}
	return nil
}
