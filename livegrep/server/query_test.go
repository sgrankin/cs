package server

import (
	"encoding/json"
	"reflect"
	"testing"
)

func TestParseQuery(t *testing.T) {
	cases := []struct {
		in    string
		out   Query
		regex bool
	}{
		// regex parse mode
		{
			"hello",
			Query{Line: "hello", FoldCase: true},
			true,
		},
		{
			"a b c",
			Query{Line: "a b c", FoldCase: true},
			true,
		},
		{
			"line file:.rb",
			Query{
				Line:     "line",
				File:     []string{".rb"},
				FoldCase: true,
			},
			true,
		},
		{
			" a  ",
			Query{Line: "a", FoldCase: true},
			true,
		},
		{
			"( a  )",
			Query{Line: "( a  )", FoldCase: true},
			true,
		},
		{
			"Aa",
			Query{Line: "Aa", FoldCase: false},
			true,
		},
		{
			"case:abc",
			Query{Line: "abc", FoldCase: false},
			true,
		},
		{
			"case:abc file:^kernel/",
			Query{Line: "abc", FoldCase: false, File: []string{"^kernel/"}},
			true,
		},
		{
			"case:abc file:( )",
			Query{Line: "abc", FoldCase: false, File: []string{"( )"}},
			true,
		},
		{
			"(  () (   ",
			Query{Line: "(  () (", FoldCase: true},
			true,
		},
		{
			`a file:\(`,
			Query{Line: "a", File: []string{`\(`}, FoldCase: true},
			true,
		},
		{
			`a file:(\()`,
			Query{Line: "a", File: []string{`(\()`}, FoldCase: true},
			true,
		},
		{
			`(`,
			Query{Line: "(", FoldCase: true},
			true,
		},
		{
			`(file:)`,
			Query{Line: "(file:)", FoldCase: true},
			true,
		},
		{
			`re tags:kind:function`,
			Query{Line: "re", FoldCase: true, Tags: "kind:function"},
			true,
		},
		{
			`-file:Godep re`,
			Query{Line: "re", NotFile: []string{"Godep"}, FoldCase: true},
			true,
		},
		{
			`-file:. -repo:Godep re`,
			Query{Line: "re", NotFile: []string{"."}, NotRepo: "Godep", FoldCase: true},
			true,
		},
		{
			`-tags:kind:class re`,
			Query{Line: "re", NotTags: "kind:class", FoldCase: true},
			true,
		},
		{
			`case:foo:`,
			Query{Line: "foo:", FoldCase: false},
			true,
		},
		{
			`lit:.`,
			Query{Line: `\.`, FoldCase: false},
			true,
		},
		{
			`std::string`,
			Query{Line: `std::string`, FoldCase: true},
			true,
		},
		{
			`a max_matches:100`,
			Query{Line: "a", FoldCase: true, MaxMatches: 100},
			true,
		},
		{
			`a max_matches:`,
			Query{Line: "a", FoldCase: true},
			true,
		},
		{
			`file:hello`,
			Query{Line: "hello", File: []string{"hello"}, FoldCase: true, FilenameOnly: true},
			true,
		},
		{
			`file:HELLO`,
			Query{Line: "HELLO", File: []string{"HELLO"}, FoldCase: false, FilenameOnly: true},
			true,
		},
		{
			`lit:a( file:b`,
			Query{Line: `a\(`, File: []string{"b"}, FoldCase: false},
			true,
		},
		{
			`lit:a(b file:c`,
			Query{Line: `a\(b`, File: []string{"c"}, FoldCase: false},
			true,
		},
		{
			`[(] file:\.c`,
			Query{Line: `[(]`, File: []string{"\\.c"}, FoldCase: true},
			true,
		},
		{
			`[ ] file:\.c`,
			Query{Line: `[ ]`, File: []string{"\\.c"}, FoldCase: true},
			true,
		},
		{
			`[ \]] file:\.c`,
			Query{Line: `[ \]]`, File: []string{"\\.c"}, FoldCase: true},
			true,
		},

		// literal parse mode
		{
			"a( file:b",
			Query{Line: `a\(`, File: []string{"b"}, FoldCase: true},
			false,
		},
		{
			"a (file:b",
			Query{Line: `a \(file:b`, FoldCase: true},
			false,
		},
		{
			"(file:a b",
			Query{Line: `\(file:a b`, FoldCase: true},
			false,
		},
		{
			"(file:a) b",
			Query{Line: `\(file:a\) b`, FoldCase: true},
			false,
		},
		{
			"(file:a repo:b",
			Query{Line: `\(file:a repo:b`, FoldCase: true},
			false,
		},
		{
			"(file:a) repo:b",
			Query{Line: `\(file:a\)`, Repo: "b", FoldCase: true},
			false,
		},
		{
			"(file:a) (repo:b)",
			Query{Line: `\(file:a\) \(repo:b\)`, FoldCase: true},
			false,
		},
		{
			"file:a( b",
			Query{Line: `b`, File: []string{`a\(`}, FoldCase: true},
			false,
		},
		{
			`file:a file:b path:c path:\.rb$ zoo`,
			Query{Line: "zoo", File: []string{"a", "b", "c", `\.rb$`}, FoldCase: true},
			true,
		},
		{
			`-file:a -path:b -file:c -path:\.rb$ zoo`,
			Query{Line: "zoo", NotFile: []string{"a", "c", "b", `\.rb$`}, FoldCase: true},
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
