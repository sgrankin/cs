/*
Csfetch synchronizes a number of git repositories into a local repository.
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
	"sgrankin.dev/cs/internal"
)

var (
	githubToken = flag.String("github-token", "", "GitHub token to auth with to tthe API.")
	configPath  = flag.String("config", "config.yaml", "The path to the config file specifying what to sync")
	prune       = flag.Bool("prune", true, "Remove any refs that are not synced by this tool")
)

func main() {
	log.SetFlags(log.Lshortfile)
	log.SetOutput(os.Stdout)
	flag.Parse()

	if err := run(*configPath, *githubToken, *prune); err != nil {
		log.Fatal(err)
	}
}

func run(configPath, gitHubToken string, prune bool) error {
	ctx := context.Background()

	cfg, err := os.ReadFile(configPath)
	if err != nil {
		return fmt.Errorf("reading config at %q: %w", configPath, err)
	}
	var config cs.Config
	if err := yaml.Unmarshal(cfg, &config); err != nil {
		return fmt.Errorf("unmarshalling config: %w", err)
	}

	for _, index := range config.Indexes {
		gitPath := index.Fetch.GitPath
		repo, err := internal.OpenGitRepo(gitPath)
		if err != nil {
			return fmt.Errorf("opening git repo at %q: %w", gitPath, err)
		}

		toFetch, err := internal.ResolveFetchSpecs(ctx, index.Fetch.Specs, gitHubToken)
		if err != nil {
			return fmt.Errorf("resolving specs: %w", err)
		}

		if err := internal.FetchToGitRepo(ctx, repo, toFetch); err != nil {
			return fmt.Errorf("fetching: %w", err)
		}
		if prune {
			if err := internal.GCRefs(repo, toFetch); err != nil {
				return fmt.Errorf("pruning: %w", err)
			}
		}
	}
	return nil
}
