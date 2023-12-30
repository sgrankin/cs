package csbackend

import (
	"bytes"
	"context"
	"flag"
	"log"
	"regexp/syntax"
	"strings"

	"sgrankin.dev/cs/codesearch/index"
	"sgrankin.dev/cs/codesearch/regexp"
	"sgrankin.dev/cs/csapi"
)

type CSBackend struct {
	ix *index.Index
}

var (
	dataPath  = flag.String("data", "data/data.db", "The path to the blob data DB")
	indexPath = flag.String("index", "data/csindex", "The path to the index file")
)

func New() *CSBackend {
	ix := index.Open(*indexPath)
	return &CSBackend{ix}
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
		tree, rest, _ := strings.Cut(postName, ":")
		version, rest, _ := strings.Cut(rest, ":")
		name, rest, _ := strings.Cut(rest, ":")
		if fre != nil && fre.MatchString(name, true, true) < 0 {
			continue
		}
		if nfre != nil && nfre.MatchString(name, true, true) < 0 {
			continue
		}
		// end is the end of the match or the nl after it (which one?)... we don't have the bounds (yet?)
		end := re.MatchString(name, true, true) // XXX
		if end < 0 {
			continue
		}
		// loc := re.FindStringIndex(name)
		// if loc == nil {
		// 	continue
		// }
		fresults = append(fresults, csapi.FileResult{
			Tree:    tree,
			Version: version,
			Path:    name,
			// Bounds:  csapi.Bounds{Left: loc[0], Right: loc[1]},
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
			// TODO: This is just silly...
			_, rest, _ := strings.Cut(postName, ":")
			_, rest, _ = strings.Cut(rest, ":")
			name, _, _ := strings.Cut(rest, ":")
			if fre != nil && fre.MatchString(name, true, true) < 0 {
				continue
			}
			if nfre != nil && nfre.MatchString(name, true, true) >= 0 {
				continue
			}
			fnames = append(fnames, fileid)
		}

		log.Printf("filename regexp matched %d files\n", len(fnames)) // XXX
		post = fnames
	}

	// TOOD: consider a query cache based on _cost_ (time), per file.

	results := []csapi.SearchResult{}
posts:
	for _, fileid := range post {
		blob := b.ix.Data(fileid)

		// TODO: move name check to _after_ we found out if this file matches
		postName := b.ix.Name(fileid)
		// TODO: This is just silly...
		_, rest, _ := strings.Cut(postName, ":")
		_, rest, _ = strings.Cut(rest, ":")
		name, _, _ := strings.Cut(rest, ":")
		// log.Printf("scanning %q", postName)
		// begin := time.Now()

		end := re.Match(blob, true, true) // XXX
		for end >= 0 {
			// TODO: we may be able to be a bit more efficient by using
			// FindAllIndex with large chunks (similar to the codesearch grep?) and counting lines ourselves.
			// Probably mangle the input RE to include a .*$ so that we know how far to skip after a match (we only care about one match per line).
			// We can also extract literals from the regex and search the file for them first to see if they actually match.. though perhaps regexp already implements that optimization.
			start := bytes.LastIndexByte(blob[:end], '\n') + 1
			results = append(results,
				csapi.SearchResult{
					Path: name,
					// LineNumber: line,
					Line: string(blob[start:end]),
					// Bounds:     csapi.Bounds{Left: match[0] - lineStart, Right: match[1] - lineStart},
				})
			if int(req.MaxMatches) > 0 && len(results) >= int(req.MaxMatches) {
				break posts
			}
			chunkEnd := re.Match(blob[end+1:], false, true)
			if chunkEnd < 0 {
				break
			}
			end = chunkEnd + end + 1 // XXX

			// matches := re.FindAllIndex(blob, -1)
			// if matches == nil {
			// 	continue posts
			// }

			// // Now for each match, we need to find the newline boundaries (and line number) to generate the result.
			// line := 1
			// lineStart := 0
			// lineEnd := bytes.IndexByte(blob, '\n')
			// if lineEnd < 0 {
			// 	lineEnd = len(blob)
			// }
			// lastMatchLine := -1
			// for _, match := range matches {
			// 	// Seek to the line that has the match.
			// 	for match[0] > lineEnd {
			// 		lineStart = lineEnd + 1
			// 		line++
			// 		lineEnd = bytes.IndexByte(blob[lineStart:], '\n')
			// 		if lineEnd < 0 {
			// 			lineEnd = len(blob)
			// 		} else {
			// 			lineEnd += lineStart
			// 		}
			// 	}
			// 	// Only emit one match per line.
			// 	if lastMatchLine == line {
			// 		continue
			// 	}
			// 	lastMatchLine = line
			// 	results = append(results,
			// 		csapi.SearchResult{
			// 			Path:       name,
			// 			LineNumber: line,
			// 			Line:       string(blob[lineStart:lineEnd]),
			// 			Bounds:     csapi.Bounds{Left: match[0] - lineStart, Right: match[1] - lineStart},
			// 		})
			// 	if int(req.MaxMatches) > 0 && len(results) >= int(req.MaxMatches) {
			// 		break posts
			// 	}
			// }

			// end := time.Now()
			// log.Printf("\t%d µsec\t%d matches", end.Sub(begin).Microseconds(), nmatch)
		}
		if int(req.MaxMatches) > 0 && len(results) >= int(req.MaxMatches) {
			break posts
		}
	}

	return &csapi.CodeSearchResult{
		Results:     results,
		FileResults: fresults,
	}, nil
}

var _ csapi.CodeSearch = (*CSBackend)(nil)
