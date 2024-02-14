// Copyright 2011 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"path"
	"sort"
	"strings"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
	"github.com/go-git/go-git/v5/plumbing/object"

	"sgrankin.dev/cs/codesearch/index"
)

var usageMessage = `usage: cindex [-list] [-reset] [path...]

Cindex prepares the trigram index for use by csearch.  The index is the
file named by $CSEARCHINDEX, or else $HOME/.csearchindex.

The simplest invocation is

	cindex path...

which adds the file or directory tree named by each path to the index.
For example:

	cindex $HOME/src /usr/include

or, equivalently:

	cindex $HOME/src
	cindex /usr/include

If cindex is invoked with no paths, it reindexes the paths that have
already been added, in case the files have changed.  Thus, 'cindex' by
itself is a useful command to run in a nightly cron job.

The -list flag causes cindex to list the paths it has indexed and exit.

By default cindex adds the named paths to the index but preserves
information about other paths that might already be indexed
(the ones printed by cindex -list).  The -reset flag causes cindex to
delete the existing index before indexing the new paths.
With no path arguments, cindex -reset removes the index.
`

func usage() {
	fmt.Fprintf(os.Stderr, usageMessage)
	os.Exit(2)
}

var (
	gitPath   = flag.String("git", "data", "The path to the git repo")
	indexPath = flag.String("index", "data/csindex", "The path to the index file")
)

type repoConfig struct {
	Path      string   `json:"path"`
	Name      string   `json:"name"`
	Revisions []string `json:"revisions"`
}

func main() {
	log.SetFlags(log.Lshortfile)
	flag.Usage = usage
	flag.Parse()

	cfg := []repoConfig{{
		Name:      "torvalds/linux",
		Revisions: []string{"HEAD"},
	}}

	repo, err := git.PlainOpen(*gitPath)
	if err != nil {
		log.Fatal(err)
	}

	// Translate paths to absolute paths so that we can generate the file list in sorted order.
	paths := []string{}
	for _, repoc := range cfg {
		for _, rev := range repoc.Revisions {
			rref, err := repo.Reference(plumbing.NewBranchReferenceName(path.Join(repoc.Name, rev)), true)
			if err != nil {
				log.Fatal(repoc, rev, err)
			}
			paths = append(paths, repoc.Name+":"+rref.Hash().String())
		}
	}
	sort.Strings(paths)

	master := *indexPath // index.File()
	file := master + "~"

	ix := index.Create(file)
	// ix.Verbose = true
	ix.AddPaths(paths)

	for _, repoRev := range paths {
		repoRevSplit := strings.SplitN(repoRev, ":", 2)
		commit, err := repo.CommitObject(plumbing.NewHash(repoRevSplit[1]))
		if err != nil {
			log.Fatal(err)
		}
		tree, err := commit.Tree()
		if err != nil {
			log.Fatal(err)
		}
		if err := tree.Files().ForEach(func(f *object.File) error {
			// TODO: should symlinks be special?
			r, err := f.Blob.Reader()
			if err != nil {
				log.Fatal(err)
			}
			// Encode the repo & revision into the file name.
			// The repo is used for search filtering, etc.
			path := repoRev + ":" + f.Name
			ix.Add(path, r)
			r.Close()

			return nil
		}); err != nil {
			log.Fatal(err)
		}
	}
	log.Printf("flush index")
	ix.Flush()

	// log.Printf("merge %s %s", master, file)
	// index.Merge(file+"~", master, file)
	// os.Remove(file)
	os.Rename(file, master)
	log.Printf("done")
	return
}
