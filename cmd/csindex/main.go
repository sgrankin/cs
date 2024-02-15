// Copyright 2011 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"sort"
	"strings"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
	"github.com/go-git/go-git/v5/plumbing/object"

	"sgrankin.dev/cs/codesearch/index"
	"sgrankin.dev/cs/internal/flagutil"
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
	indexPath = flag.String("index", "data/csindex", "The path to the index file")
	gitPath   = flag.String("git", "data", "The path to the git repo")
	refNames  = flagutil.Var[flagutil.StringSet]("ref", flagutil.StringSet{}, "The refs to index.  May be suffixed with ':' followed by alternative prefix to use in the index.  Index all refs if not specified.")

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

	paths := []string{}
	pathToRef := map[string]*plumbing.Reference{}

	refs := []string{}
	for ref := range *refNames {
		refs = append(refs, ref)
	}
	if len(refs) == 0 {
		ri, err := repo.References()
		if err != nil {
			log.Fatal(err)
		}
		ri.ForEach(func(r *plumbing.Reference) error {
			if r.Type() != plumbing.HashReference {
				return nil
			}
			refs = append(refs, r.Name().Short())
			return nil
		})
		ri.Close()
	}

	for _, refName := range refs {
		refName, path, _ := strings.Cut(refName, ":")
		if path == "" {
			path = refName
		}

		// Translate paths to absolute paths so that we can generate the file list in sorted order.
		ref, err := repo.Reference(plumbing.ReferenceName("refs/"+refName), true)
		if err != nil {
			log.Fatalf("fetching %q: %v", refName, err)
		}
		path += "@" + ref.Hash().String()
		paths = append(paths, path)
		pathToRef[path] = ref
	}

	sort.Strings(paths)
	ix.AddPaths(paths)
	for _, path := range paths {
		if err := indexRef(ix, repo, pathToRef[path], path+"/+/"); err != nil {
			log.Fatal(err)
		}
	}
	ix.Flush()

	// log.Printf("merge %s %s", master, file)
	// index.Merge(file+"~", master, file)
	// os.Remove(file)
	os.Rename(temp, master)
	return
}

// indexRef adds the referenced tree in the repo to the index.
func indexRef(ix *index.IndexWriter, repo *git.Repository, ref *plumbing.Reference, prefix string) error {
	commit, err := repo.CommitObject(ref.Hash())
	if err != nil {
		return err
	}
	tree, err := commit.Tree()
	if err != nil {
		return err
	}
	return tree.Files().ForEach(func(f *object.File) error {
		r, err := f.Blob.Reader()
		if err != nil {
			return err
		}
		// Encode the repo & revision into the file name.
		// The repo is used for search filtering, etc.
		ix.Add(prefix+f.Name, r)
		r.Close()
		return nil
	})
}
