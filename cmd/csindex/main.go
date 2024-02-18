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

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/codesearch/index"
	"sgrankin.dev/cs/internal"
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
	gitPath = flag.String("git", "data",
		"The path to the git repo")
	indexPath = flag.String("index", "data/csindex",
		"The path to the index file")
	refNames = cs.FlagVar[cs.StringSet]("ref", cs.StringSet{},
		"The refs to index.  Index all refs if not specified.")

	verbose = flag.Bool("verbose", false, "Verbose indexing")
)

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

	var refs []string
	for ref := range *refNames {
		refs = append(refs, ref)
	}
	if len(refs) == 0 {
		refs = internal.ListRefs(repo)
	}
	if err := internal.IndexRefs(ix, repo, refs); err != nil {
		log.Fatal(err)
	}
	ix.Flush()
	os.Rename(temp, master)
	return
}
