// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"encoding/json"
	"reflect"
	"testing"

	"sgrankin.dev/cs"
)

func TestParseQuery(t *testing.T) {
	cases := []struct {
		in    string
		out   cs.Query
		regex bool
	}{
		// regex parse mode
		{
			"hello",
			cs.Query{Line: "hello", FoldCase: true},
			true,
		},
		{
			"a b c",
			cs.Query{Line: "a b c", FoldCase: true},
			true,
		},
		{
			"line file:.rb",
			cs.Query{
				Line:     "line",
				File:     []string{".rb"},
				FoldCase: true,
			},
			true,
		},
		{
			" a  ",
			cs.Query{Line: "a", FoldCase: true},
			true,
		},
		{
			"( a  )",
			cs.Query{Line: "( a  )", FoldCase: true},
			true,
		},
		{
			"Aa",
			cs.Query{Line: "Aa", FoldCase: false},
			true,
		},
		{
			"case:abc",
			cs.Query{Line: "abc", FoldCase: false},
			true,
		},
		{
			"case:abc file:^kernel/",
			cs.Query{Line: "abc", FoldCase: false, File: []string{"^kernel/"}},
			true,
		},
		{
			"case:abc file:( )",
			cs.Query{Line: "abc", FoldCase: false, File: []string{"( )"}},
			true,
		},
		{
			"(  () (   ",
			cs.Query{Line: "(  () (", FoldCase: true},
			true,
		},
		{
			`a file:\(`,
			cs.Query{Line: "a", File: []string{`\(`}, FoldCase: true},
			true,
		},
		{
			`a file:(\()`,
			cs.Query{Line: "a", File: []string{`(\()`}, FoldCase: true},
			true,
		},
		{
			`(`,
			cs.Query{Line: "(", FoldCase: true},
			true,
		},
		{
			`(file:)`,
			cs.Query{Line: "(file:)", FoldCase: true},
			true,
		},
		{
			`re tags:kind:function`,
			cs.Query{Line: "re", FoldCase: true, Tags: "kind:function"},
			true,
		},
		{
			`-file:Godep re`,
			cs.Query{Line: "re", NotFile: []string{"Godep"}, FoldCase: true},
			true,
		},
		{
			`-file:. -repo:Godep re`,
			cs.Query{Line: "re", NotFile: []string{"."}, NotRepo: "Godep", FoldCase: true},
			true,
		},
		{
			`-tags:kind:class re`,
			cs.Query{Line: "re", NotTags: "kind:class", FoldCase: true},
			true,
		},
		{
			`case:foo:`,
			cs.Query{Line: "foo:", FoldCase: false},
			true,
		},
		{
			`lit:.`,
			cs.Query{Line: `\.`, FoldCase: false},
			true,
		},
		{
			`std::string`,
			cs.Query{Line: `std::string`, FoldCase: true},
			true,
		},
		{
			`a max_matches:100`,
			cs.Query{Line: "a", FoldCase: true, MaxMatches: 100},
			true,
		},
		{
			`a max_matches:`,
			cs.Query{Line: "a", FoldCase: true},
			true,
		},
		{
			`file:hello`,
			cs.Query{Line: "hello", File: []string{"hello"}, FoldCase: true, FilenameOnly: true},
			true,
		},
		{
			`file:HELLO`,
			cs.Query{Line: "HELLO", File: []string{"HELLO"}, FoldCase: false, FilenameOnly: true},
			true,
		},
		{
			`lit:a( file:b`,
			cs.Query{Line: `a\(`, File: []string{"b"}, FoldCase: false},
			true,
		},
		{
			`lit:a(b file:c`,
			cs.Query{Line: `a\(b`, File: []string{"c"}, FoldCase: false},
			true,
		},
		{
			`[(] file:\.c`,
			cs.Query{Line: `[(]`, File: []string{"\\.c"}, FoldCase: true},
			true,
		},
		{
			`[ ] file:\.c`,
			cs.Query{Line: `[ ]`, File: []string{"\\.c"}, FoldCase: true},
			true,
		},
		{
			`[ \]] file:\.c`,
			cs.Query{Line: `[ \]]`, File: []string{"\\.c"}, FoldCase: true},
			true,
		},

		// literal parse mode
		{
			"a( file:b",
			cs.Query{Line: `a\(`, File: []string{"b"}, FoldCase: true},
			false,
		},
		{
			"a (file:b",
			cs.Query{Line: `a \(file:b`, FoldCase: true},
			false,
		},
		{
			"(file:a b",
			cs.Query{Line: `\(file:a b`, FoldCase: true},
			false,
		},
		{
			"(file:a) b",
			cs.Query{Line: `\(file:a\) b`, FoldCase: true},
			false,
		},
		{
			"(file:a repo:b",
			cs.Query{Line: `\(file:a repo:b`, FoldCase: true},
			false,
		},
		{
			"(file:a) repo:b",
			cs.Query{Line: `\(file:a\)`, Repo: "b", FoldCase: true},
			false,
		},
		{
			"(file:a) (repo:b)",
			cs.Query{Line: `\(file:a\) \(repo:b\)`, FoldCase: true},
			false,
		},
		{
			"file:a( b",
			cs.Query{Line: `b`, File: []string{`a\(`}, FoldCase: true},
			false,
		},
		{
			`file:a file:b path:c path:\.rb$ zoo`,
			cs.Query{Line: "zoo", File: []string{"a", "b", "c", `\.rb$`}, FoldCase: true},
			true,
		},
		{
			`-file:a -path:b -file:c -path:\.rb$ zoo`,
			cs.Query{Line: "zoo", NotFile: []string{"a", "c", "b", `\.rb$`}, FoldCase: true},
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
