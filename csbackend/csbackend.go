package csbackend

import (
	"bufio"
	"context"
	"log"
	"os"
	"regexp"
	"regexp/syntax"
	"strings"

	"sgrankin.dev/cs/codesearch/index"
	"sgrankin.dev/cs/csapi"
)

type CSBackend struct{}

// Info implements csapi.CodeSearch.
func (*CSBackend) Info(context.Context) (*csapi.ServerInfo, error) {
	return &csapi.ServerInfo{}, nil
}

// Search implements csapi.CodeSearch.
func (*CSBackend) Search(ctx context.Context, req csapi.Query) (*csapi.CodeSearchResult, error) {
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

	ix := index.Open(index.File())
	ix.Verbose = true // XXX

	// Find filename matches:
	fresults := []csapi.FileResult{}
	for _, fileid := range ix.PostingQuery(&index.Query{Op: index.QAll}) {
		name := ix.Name(fileid)
		if !re.MatchString(name) {
			continue
		}
		if fre != nil && !fre.MatchString(name) {
			continue
		}
		if nfre != nil && nfre.MatchString(name) {
			continue
		}
		fresults = append(fresults, csapi.FileResult{
			Path: name,
		})
		if len(fresults) >= int(req.MaxMatches) {
			break
		}
	}

	// if *bruteFlag {
	// 	post = ix.PostingQuery(&index.Query{Op: index.QAll})
	// } else {
	post := ix.PostingQuery(q)
	log.Printf("post query identified %d possible files\n", len(post)) // XXX

	if fre != nil || nfre != nil {
		fnames := make([]uint32, 0, len(post))
		for _, fileid := range post {
			name := ix.Name(fileid)
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
		name := ix.Name(fileid)
		f, err := os.Open(name)
		if err != nil {
			log.Panic(err)
		}

		scanner := bufio.NewScanner(f)
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
		f.Close()
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

func New() *CSBackend { return nil }
