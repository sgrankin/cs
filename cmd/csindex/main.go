// Copyright 2011 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"flag"
	"fmt"
	"log"
	"os"

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

var (
	gitPath   = flag.String("git", "data", "The path to the git repo")
	indexPath = flag.String("index", "data/csindex", "The path to the index file")
	repoName  = flag.String("repo-name", "github.com/torvalds/linux", "The name of the repo encoded in the index,  for disambiguation and remote URLs.")
	refName   = flag.String("refname", "torvalds/linux/HEAD", "The git ref to index")

	verbose = flag.Bool("verbose", false, "Verbose indexing")
)

type repoConfig struct {
	Path      string   `json:"path"`
	Name      string   `json:"name"`
	Revisions []string `json:"revisions"`
}

func usage() {
	fmt.Fprintf(os.Stderr, usageMessage)
	os.Exit(2)
}

func main() {
	log.SetFlags(log.Lshortfile)
	flag.Usage = usage
	flag.Parse()

	repo, err := git.PlainOpen(*gitPath)
	if err != nil {
		log.Fatal(err)
	}

	master := *indexPath
	temp := master + "~"
	ix := index.Create(temp)
	ix.Verbose = *verbose

	// Translate paths to absolute paths so that we can generate the file list in sorted order.
	rref, err := repo.Reference(plumbing.NewBranchReferenceName(*refName), true)
	if err != nil {
		log.Fatal(*refName, err)
	}
	prefix := *repoName + "@" + rref.Hash().String()
	ix.AddPaths([]string{prefix})

	commit, err := repo.CommitObject(rref.Hash())
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
		ix.Add(prefix+"/+/"+f.Name, r)
		r.Close()

		return nil
	}); err != nil {
		log.Fatal(err)
	}
	ix.Flush()

	// log.Printf("merge %s %s", master, file)
	// index.Merge(file+"~", master, file)
	// os.Remove(file)
	os.Rename(temp, master)
	return
}
