// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"bytes"
	"errors"
	"fmt"
	"regexp"
	"slices"
	"strconv"
	"strings"
	"unicode/utf8"

	"google.golang.org/protobuf/proto"
)

var pieceRE = regexp.MustCompile(`\[|\(|(?:^([a-zA-Z0-9-_]+):|\\.)| `)

var knownTags = map[string]bool{
	"file":        true,
	"-file":       true,
	"path":        true,
	"-path":       true,
	"repo":        true,
	"-repo":       true,
	"case":        true,
	"lit":         true,
	"max_matches": true,
}

func parseQueryString(q string, regex bool) map[string][]string {
	q = strings.TrimSpace(q)

	ops := map[string][]string{}
	key := ""
	term := ""
	globalRegex := regex
	inRegex := globalRegex
	justGotSpace := true
	for {
		m := pieceRE.FindStringSubmatchIndex(q)
		if m == nil {
			term += q
			ops[key] = append(ops[key], term)
			break
		}

		term += q[:m[0]]
		match := q[m[0]:m[1]]
		q = q[m[1]:]

		justGotSpace = justGotSpace && m[0] == 0

		if match == " " {
			// A space: Ends the operator, if we're in one.
			if key == "" {
				term += " "
			} else {
				ops[key] = append(ops[key], term)
				key = ""
				term = ""
				inRegex = globalRegex
			}
		} else if match == "(" || match == "[" {
			if !inRegex && !justGotSpace {
				term += match
			} else {
				// A parenthesis or a bracket. Consume
				// until the end of a balanced set.
				p := 1
				i := 0
				esc := false
				var w bytes.Buffer
				var open, close rune
				switch match {
				case "(":
					open, close = '(', ')'
				case "[":
					open, close = '[', ']'
				}

				for i < len(q) {
					// We decode runes ourselves instead
					// of using range because exiting the
					// loop with i = len(q) makes the edge
					// cases simpler.
					r, l := utf8.DecodeRuneInString(q[i:])
					i += l
					switch {
					case esc:
						esc = false
					case r == '\\':
						esc = true
					case r == open:
						p++
					case r == close:
						p--
					}
					w.WriteRune(r)
					if p == 0 {
						break
					}
				}
				term += match + w.String()
				q = q[i:]
			}
		} else if match[0] == '\\' {
			term += match
		} else {
			// An operator. The key is in match group 1
			newKey := match[m[2]-m[0] : m[3]-m[0]]
			if key == "" && knownTags[newKey] {
				if strings.TrimSpace(term) != "" {
					ops[key] = append(ops[key], term)
				}
				term = ""
				key = newKey
			} else {
				term += match
			}
			if key == "lit" {
				inRegex = false
			}
		}
		justGotSpace = (match == " ")
	}
	return ops
}

// expandQueryParams scans the query text for special keywords and updates the rest of the query attributes accordingly.
func expandQueryParams(query *Query) error {
	globalRegex := query.Regex
	ops := parseQueryString(query.Line, query.Regex)

	// This is a special case to provide a better error message,
	// since the main search term is represented by the "" op.
	if len(ops[""]) > 1 {
		return fmt.Errorf("main search term must be contiguous")
	}

	// Handle synonyms
	query.SelectFiles = slices.Concat(query.SelectFiles, ops["file"], ops["path"])
	query.RejectFiles = slices.Concat(query.RejectFiles, ops["-file"], ops["-path"])

	query.SelectRepos = slices.Concat(query.SelectRepos, ops["repo"])
	query.RejectRepos = slices.Concat(query.SelectRepos, ops["-repo"])

	var bits []string
	for _, k := range []string{"", "case", "lit"} {
		if _, ok := ops[k]; !ok {
			continue
		}
		bit := strings.TrimSpace(ops[k][0])
		if k == "lit" || !globalRegex {
			bit = regexp.QuoteMeta(bit)
		}
		if len(bit) != 0 {
			bits = append(bits, bit)
		}
	}

	if len(bits) > 1 {
		return fmt.Errorf("you cannot provide multiple of case:, lit:, and a bare regex")
	}

	if len(bits) > 0 {
		query.Line = bits[0]
	}

	if !globalRegex {
		quoteSlice := func(xs []string) {
			for i, x := range xs {
				xs[i] = regexp.QuoteMeta(x)
			}
		}
		quoteSlice(query.SelectFiles)
		quoteSlice(query.RejectFiles)
		quoteSlice(query.SelectRepos)
		quoteSlice(query.RejectRepos)
	}

	if len(query.Line) == 0 && len(query.SelectFiles) != 0 {
		// setting Line for a FilenameOnly search is a slight hack.
		// it has compatibility with older backend code that expects a
		// single filename regex, but a newer backend will use it to
		// determine which match is highlighted.
		query.Line = query.SelectFiles[0]
		query.OnlyFilename = true
	}

	if _, ok := ops["case"]; ok {
		query.FoldCase = proto.Bool(true)
	} else if _, ok := ops["lit"]; ok {
		query.FoldCase = proto.Bool(true)
	} else if query.FoldCase == nil {
		query.FoldCase = proto.Bool(!strings.ContainsAny(query.Line, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
	}
	if v, ok := ops["max_matches"]; ok && v[0] != "" {
		v := v[0]
		i, err := strconv.Atoi(v)
		if err == nil {
			query.MaxMatches = int32(i)
		} else {
			return errors.New("value given to max_matches: must be a valid integer")
		}
	}
	return nil
}
