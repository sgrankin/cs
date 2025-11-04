// Copyright 2024 Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package main

import (
	"flag"
	"log"
	"os"

	"github.com/goccy/go-yaml"

	"sgrankin.dev/cs"
)

var (
	config = cs.FlagVar[cs.EnvString]("config", "config.yaml",
		"The config file.")

	githubToken = cs.FlagVar[cs.EnvString]("github-token", "${GITHUB_TOKEN}",
		"GitHub token for private repo access.")
)

func main() {
	log.SetFlags(log.Lshortfile | log.Lmicroseconds)
	log.SetOutput(os.Stderr)
	flag.Parse()

	cfg := cs.Config{}
	if *config != "" {
		data, err := os.ReadFile(config.Get())
		if err != nil {
			log.Fatal(err)
		}
		if err = yaml.Unmarshal(data, &cfg); err != nil {
			log.Fatalf("reading %s: %v", flag.Arg(0), err.Error())
		}
	}
	if cfg.Index.Path == "" {
		log.Fatal("An Index is required")
	}

	if err := cs.BuildSearchIndex(cfg.Index, githubToken.Get()); err != nil {
		log.Fatalf("Error building %q: %v", cfg.Index.Name, err)
	}
}
