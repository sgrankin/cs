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
	indexPath = cs.FlagVar[cs.StringSet]("index", cs.StringSet{},
		"The path to the index file(s).  Allows serving an index without a config.")

	githubToken = cs.FlagVar[cs.EnvString]("github-token", "${GITHUB_TOKEN}",
		"GitHub token for private repo access.")
)

func main() {
	log.SetFlags(log.Lshortfile | log.Lmicroseconds)
	log.SetOutput(os.Stderr)
	flag.Parse()

	cfg := cs.Config{}
	for path := range *indexPath {
		cfg.Indexes = append(cfg.Indexes, cs.IndexConfig{Path: path})
	}

	if *config != "" {
		data, err := os.ReadFile(config.Get())
		if err != nil {
			log.Fatal(err)
		}
		if err = yaml.Unmarshal(data, &cfg); err != nil {
			log.Fatalf("reading %s: %v", flag.Arg(0), err.Error())
		}
	}
	if len(cfg.Indexes) == 0 {
		log.Fatal("At least one Index is required")
	}

	for _, icfg := range cfg.Indexes {
		if err := cs.BuildSearchIndex(icfg, githubToken.Get()); err != nil {
			log.Fatalf("Error building %q: %v", icfg.Path, err)
		}
	}
}
