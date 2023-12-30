// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"encoding/json"
	"reflect"
	"testing"

	"sgrankin.dev/cs/csapi"
)

func TestParseQuery(t *testing.T) {
	cases := []struct {
		in    string
		out   csapi.Query
		regex bool
	}{
		// regex parse mode
		{
			"hello",
			csapi.Query{Line: "hello", FoldCase: true},
			true,
		},
		{
			"a b c",
			csapi.Query{Line: "a b c", FoldCase: true},
			true,
		},
		{
			"line file:.rb",
			csapi.Query{
				Line:     "line",
				File:     []string{".rb"},
				FoldCase: true,
			},
			true,
		},
		{
			" a  ",
			csapi.Query{Line: "a", FoldCase: true},
			true,
		},
		{
			"( a  )",
			csapi.Query{Line: "( a  )", FoldCase: true},
			true,
		},
		{
			"Aa",
			csapi.Query{Line: "Aa", FoldCase: false},
			true,
		},
		{
			"case:abc",
			csapi.Query{Line: "abc", FoldCase: false},
			true,
		},
		{
			"case:abc file:^kernel/",
			csapi.Query{Line: "abc", FoldCase: false, File: []string{"^kernel/"}},
			true,
		},
		{
			"case:abc file:( )",
			csapi.Query{Line: "abc", FoldCase: false, File: []string{"( )"}},
			true,
		},
		{
			"(  () (   ",
			csapi.Query{Line: "(  () (", FoldCase: true},
			true,
		},
		{
			`a file:\(`,
			csapi.Query{Line: "a", File: []string{`\(`}, FoldCase: true},
			true,
		},
		{
			`a file:(\()`,
			csapi.Query{Line: "a", File: []string{`(\()`}, FoldCase: true},
			true,
		},
		{
			`(`,
			csapi.Query{Line: "(", FoldCase: true},
			true,
		},
		{
			`(file:)`,
			csapi.Query{Line: "(file:)", FoldCase: true},
			true,
		},
		{
			`re tags:kind:function`,
			csapi.Query{Line: "re", FoldCase: true, Tags: "kind:function"},
			true,
		},
		{
			`-file:Godep re`,
			csapi.Query{Line: "re", NotFile: []string{"Godep"}, FoldCase: true},
			true,
		},
		{
			`-file:. -repo:Godep re`,
			csapi.Query{Line: "re", NotFile: []string{"."}, NotRepo: "Godep", FoldCase: true},
			true,
		},
		{
			`-tags:kind:class re`,
			csapi.Query{Line: "re", NotTags: "kind:class", FoldCase: true},
			true,
		},
		{
			`case:foo:`,
			csapi.Query{Line: "foo:", FoldCase: false},
			true,
		},
		{
			`lit:.`,
			csapi.Query{Line: `\.`, FoldCase: false},
			true,
		},
		{
			`std::string`,
			csapi.Query{Line: `std::string`, FoldCase: true},
			true,
		},
		{
			`a max_matches:100`,
			csapi.Query{Line: "a", FoldCase: true, MaxMatches: 100},
			true,
		},
		{
			`a max_matches:`,
			csapi.Query{Line: "a", FoldCase: true},
			true,
		},
		{
			`file:hello`,
			csapi.Query{Line: "hello", File: []string{"hello"}, FoldCase: true, FilenameOnly: true},
			true,
		},
		{
			`file:HELLO`,
			csapi.Query{Line: "HELLO", File: []string{"HELLO"}, FoldCase: false, FilenameOnly: true},
			true,
		},
		{
			`lit:a( file:b`,
			csapi.Query{Line: `a\(`, File: []string{"b"}, FoldCase: false},
			true,
		},
		{
			`lit:a(b file:c`,
			csapi.Query{Line: `a\(b`, File: []string{"c"}, FoldCase: false},
			true,
		},
		{
			`[(] file:\.c`,
			csapi.Query{Line: `[(]`, File: []string{"\\.c"}, FoldCase: true},
			true,
		},
		{
			`[ ] file:\.c`,
			csapi.Query{Line: `[ ]`, File: []string{"\\.c"}, FoldCase: true},
			true,
		},
		{
			`[ \]] file:\.c`,
			csapi.Query{Line: `[ \]]`, File: []string{"\\.c"}, FoldCase: true},
			true,
		},

		// literal parse mode
		{
			"a( file:b",
			csapi.Query{Line: `a\(`, File: []string{"b"}, FoldCase: true},
			false,
		},
		{
			"a (file:b",
			csapi.Query{Line: `a \(file:b`, FoldCase: true},
			false,
		},
		{
			"(file:a b",
			csapi.Query{Line: `\(file:a b`, FoldCase: true},
			false,
		},
		{
			"(file:a) b",
			csapi.Query{Line: `\(file:a\) b`, FoldCase: true},
			false,
		},
		{
			"(file:a repo:b",
			csapi.Query{Line: `\(file:a repo:b`, FoldCase: true},
			false,
		},
		{
			"(file:a) repo:b",
			csapi.Query{Line: `\(file:a\)`, Repo: "b", FoldCase: true},
			false,
		},
		{
			"(file:a) (repo:b)",
			csapi.Query{Line: `\(file:a\) \(repo:b\)`, FoldCase: true},
			false,
		},
		{
			"file:a( b",
			csapi.Query{Line: `b`, File: []string{`a\(`}, FoldCase: true},
			false,
		},
		{
			`file:a file:b path:c path:\.rb$ zoo`,
			csapi.Query{Line: "zoo", File: []string{"a", "b", "c", `\.rb$`}, FoldCase: true},
			true,
		},
		{
			`-file:a -path:b -file:c -path:\.rb$ zoo`,
			csapi.Query{Line: "zoo", NotFile: []string{"a", "c", "b", `\.rb$`}, FoldCase: true},
			true,
		},
	}

	for _, tc := range cases {
		parsed, err := ParseQuery(tc.in, tc.regex)
		if !reflect.DeepEqual(tc.out, parsed) {
			got, _ := json.MarshalIndent(parsed, "", "  ")
			want, _ := json.MarshalIndent(tc.out, "", "  ")
			t.Errorf("error parsing %q: expected:\n%s\ngot:\n%s",
				tc.in, want, got)
		}
		if err != nil {
			t.Errorf("parse(%v) error=%v", tc.in, err)
		}
	}
}

func TestParseQueryError(t *testing.T) {
	cases := []struct {
		in string
	}{
		{"case:a b"},
		{"lit:a b"},
		{"case:a lit:b"},
		{"a max_matches:a"},
		{"a file:b c"},
		{"a file:((abc()())()) c"},
		{"a repo:b repo:c"},
		{"a -repo:b -repo:c"},
	}

	for _, tc := range cases {
		parsed, err := ParseQuery(tc.in, true)
		if err == nil {
			t.Errorf("expected an error parsing (%v), got %#v", tc.in, parsed)
		}
	}
}
