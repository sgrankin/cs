package csbackend

import (
	"bufio"
	"context"
	"flag"
	"log"
	"regexp"
	"regexp/syntax"
	"strings"

	"github.com/go-git/go-git/v5/plumbing"

	"sgrankin.dev/cs/blobstore"
	"sgrankin.dev/cs/codesearch/index"
	"sgrankin.dev/cs/csapi"
)

type CSBackend struct {
	ix    *index.Index
	blobs *blobstore.BlobStore
}

var (
	dataPath  = flag.String("data", "data/data.db", "The path to the blob data DB")
	indexPath = flag.String("index", "data/csindex", "The path to the index file")
)

func New() *CSBackend {
	ix := index.Open(*indexPath)
	blobs, err := blobstore.Open(*dataPath)
	if err != nil {
		log.Fatal(err)
	}
	return &CSBackend{ix, blobs}
}

// Info implements csapi.CodeSearch.
func (*CSBackend) Info(context.Context) (*csapi.ServerInfo, error) {
	return &csapi.ServerInfo{}, nil
}

// Search implements csapi.CodeSearch.
func (b *CSBackend) Search(ctx context.Context, req csapi.Query) (*csapi.CodeSearchResult, error) {
	pat := "(?m)" + req.Line
	if req.FoldCase {
		pat = "(?i)" + pat
	}
	re, err := regexp.Compile(pat)
	if err != nil {
		log.Panic(err)
	}
	var fre *regexp.Regexp
	if len(req.File) > 0 {
		fre, err = regexp.Compile(strings.Join(req.File, "|"))
		if err != nil {
			log.Panic(err)
		}
	}
	var nfre *regexp.Regexp
	if len(req.NotFile) > 0 {
		nfre, err = regexp.Compile(strings.Join(req.NotFile, "|"))
		if err != nil {
			log.Panic(err)
		}
	}
	syn, err := syntax.Parse(pat, syntax.PerlX)
	if err != nil {
		log.Panic(err)
	}

	q := index.RegexpQuery(syn)
	log.Printf("query: %s\n", q) // XXX

	// Find filename matches:
	fresults := []csapi.FileResult{}
	for _, fileid := range b.ix.PostingQuery(&index.Query{Op: index.QAll}) {
		postName := b.ix.Name(fileid)
		names := strings.SplitN(postName, ":", 4)
		name := names[2]
		if fre != nil && !fre.MatchString(name) {
			continue
		}
		if nfre != nil && nfre.MatchString(name) {
			continue
		}
		loc := re.FindStringIndex(name)
		if loc == nil {
			continue
		}
		fresults = append(fresults, csapi.FileResult{
			Tree:    names[0],
			Version: names[1],
			Path:    name,
			Bounds:  csapi.Bounds{Left: loc[0], Right: loc[1]},
		})
		if len(fresults) >= int(req.MaxMatches) {
			break
		}
	}

	// if *bruteFlag {
	// 	post = ix.PostingQuery(&index.Query{Op: index.QAll})
	// } else {
	post := b.ix.PostingQuery(q)
	log.Printf("post query identified %d possible files\n", len(post)) // XXX

	if fre != nil || nfre != nil {
		fnames := make([]uint32, 0, len(post))
		for _, fileid := range post {
			postName := b.ix.Name(fileid)
			names := strings.SplitN(postName, ":", 4)
			name := names[2]
			if fre != nil && !fre.MatchString(name) {
				continue
			}
			if nfre != nil && nfre.MatchString(name) {
				continue
			}
			fnames = append(fnames, fileid)
		}

		log.Printf("filename regexp matched %d files\n", len(fnames)) // XXX
		post = fnames
	}

	results := []csapi.SearchResult{}
	for _, fileid := range post {
		postName := b.ix.Name(fileid)
		names := strings.SplitN(postName, ":", 4)
		name := names[2]
		log.Printf("scanning %q", postName)
		hash := plumbing.NewHash(names[3])
		blob, err := b.blobs.Open(hash[:])
		if err != nil {
			log.Panic(err)
		}

		// TODO: we may be able to be a bit more efficient by using
		// FindAllIndex with large chunks (similar to the codesearch grep?) and counting lines ourselves.
		// Probably mangle the input RE to include a .*$ so that we know how far to skip after a match (we only care about one match per line).
		// We can also extract literals from the regex and search the file for them first to see if they actually match.. though perhaps regexp already implements that optimization.
		scanner := bufio.NewScanner(blob)
		lnum := 0
		for scanner.Scan() {
			lnum++
			line := scanner.Text()
			loc := re.FindStringIndex(line)
			if loc == nil {
				continue
			}
			results = append(results,
				csapi.SearchResult{
					Path:       name,
					LineNumber: lnum,
					Line:       line,
					Bounds:     csapi.Bounds{Left: loc[0], Right: loc[1]},
				})
			if int(req.MaxMatches) > 0 && len(results) >= int(req.MaxMatches) {
				break
			}
			if err := scanner.Err(); err != nil {
				log.Panic("reading file:", err)
			}
		}
		blob.Close()
		if int(req.MaxMatches) > 0 && len(results) >= int(req.MaxMatches) {
			break
		}
	}

	return &csapi.CodeSearchResult{
		Results:     results,
		FileResults: fresults,
	}, nil
}

var _ csapi.CodeSearch = (*CSBackend)(nil)
