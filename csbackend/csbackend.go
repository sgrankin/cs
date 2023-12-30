package csbackend

import (
	"bufio"
	"context"
	"io"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/google/codesearch/index"
	"github.com/google/codesearch/regexp"

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
	g := regexp.Grep{
		Stderr: os.Stderr,
		N:      true, // Print line numbers
		Regexp: re,
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

	q := index.RegexpQuery(re.Syntax)
	log.Printf("query: %s\n", q) // XXX

	ix := index.Open(index.File())
	ix.Verbose = true // XXX

	// Find filename matches:
	fresults := []csapi.FileResult{}
	for _, fileid := range ix.PostingQuery(&index.Query{Op: index.QAll}) {
		name := ix.Name(fileid)
		if re.MatchString(name, true, true) < 0 {
			continue
		}
		if fre != nil && fre.MatchString(name, true, true) < 0 {
			continue
		}
		if nfre != nil && nfre.MatchString(name, true, true) >= 0 {
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

	reader, writer := io.Pipe()
	g.Stdout = writer

	go func() {
		for _, fileid := range post {
			name := ix.Name(fileid)
			g.File(name)
		}
		writer.Close()
	}()
	results := []csapi.SearchResult{}
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := strings.SplitN(scanner.Text(), ":", 3)
		lnum, err := strconv.Atoi(line[1])
		if err != nil {
			log.Panic(err)
		}
		results = append(results,
			csapi.SearchResult{
				Path:       line[0],
				LineNumber: lnum,
				Line:       line[2],
			})
		if int(req.MaxMatches) > 0 && len(results) >= int(req.MaxMatches) {
			break
		}

		if err := scanner.Err(); err != nil {
			log.Panic("reading grep result:", err)
		}
	}
	reader.Close()

	return &csapi.CodeSearchResult{
		Results:     results,
		FileResults: fresults,
	}, nil
}

var _ csapi.CodeSearch = (*CSBackend)(nil)

func New() *CSBackend { return nil }
