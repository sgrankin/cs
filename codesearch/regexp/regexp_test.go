// Copyright 2011 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package regexp

import (
	"reflect"
	"testing"

	"github.com/google/go-cmp/cmp"
)

var nstateTests = []struct {
	q       []uint32
	partial rune
}{
	{[]uint32{1, 2, 3}, 1},
	{[]uint32{1}, 1},
	{[]uint32{}, 0},
	{[]uint32{1, 2, 8}, 0x10FFF},
}

func TestNstateEnc(t *testing.T) {
	var n1, n2 nstate
	n1.q.Init(10)
	n2.q.Init(10)
	for _, tt := range nstateTests {
		n1.q.Reset()
		n1.partial = tt.partial
		for _, id := range tt.q {
			n1.q.Add(id)
		}
		enc := n1.enc()
		n2.dec(enc)
		if n2.partial != n1.partial || !reflect.DeepEqual(n1.q.Dense(), n2.q.Dense()) {
			t.Errorf("%v.enc.dec = %v", &n1, &n2)
		}
	}
}

var matchTests = []struct {
	re string
	s  string
	m  []Range
}{
	// // Adapted from go/src/pkg/regexp/find_test.go.
	// {`a+`, "abc\ndef\nghi\n", []int{1}},
	// {``, ``, []int{1}},
	// {`^abcdefg`, "abcdefg", []int{1}},
	// {`a+`, "baaab", []int{1}},
	// {"abcd..", "abcdef", []int{1}},
	// {`a`, "a", []int{1}},
	// {`x`, "y", nil},
	// {`b`, "abc", []int{1}},
	// {`.`, "a", []int{1}},
	// {`.*`, "abcdef", []int{1}},
	// {`^`, "abcde", []int{1}},
	// {`$`, "abcde", []int{1}},
	// {`^abcd$`, "abcd", []int{1}},
	// {`^bcd'`, "abcdef", nil},
	// {`^abcd$`, "abcde", nil},
	// {`a+`, "baaab", []int{1}},
	// {`a*`, "baaab", []int{1}},
	// {`[a-z]+`, "abcd", []int{1}},
	// {`[^a-z]+`, "ab1234cd", []int{1}},
	// {`[a\-\]z]+`, "az]-bcz", []int{1}},
	// {`[^\n]+`, "abcd\n", []int{1}},
	// {`[日本語]+`, "日本語日本語", []int{1}},
	// {`日本語+`, "日本語", []int{1}},
	// {`日本語+`, "日本語語語語", []int{1}},
	// {`()`, "", []int{1}},
	// {`(a)`, "a", []int{1}},
	// {`(.)(.)`, "日a", []int{1}},
	// {`(.*)`, "", []int{1}},
	// {`(.*)`, "abcd", []int{1}},
	// {`(..)(..)`, "abcd", []int{1}},
	// {`(([^xyz]*)(d))`, "abcd", []int{1}},
	// {`((a|b|c)*(d))`, "abcd", []int{1}},
	// {`(((a|b|c)*)(d))`, "abcd", []int{1}},
	// {`\a\f\r\t\v`, "\a\f\r\t\v", []int{1}},
	// {`[\a\f\n\r\t\v]+`, "\a\f\r\t\v", []int{1}},

	// {`a*(|(b))c*`, "aacc", []int{1}},
	// {`(.*).*`, "ab", []int{1}},
	// {`[.]`, ".", []int{1}},
	// {`/$`, "/abc/", []int{1}},
	// {`/$`, "/abc", nil},

	// // multiple matches
	// {`.`, "abc", []int{1}},
	// {`(.)`, "abc", []int{1}},
	// {`.(.)`, "abcd", []int{1}},
	// {`ab*`, "abbaab", []int{1}},
	// {`a(b*)`, "abbaab", []int{1}},

	// // fixed bugs
	// {`ab$`, "cab", []int{1}},
	// {`axxb$`, "axxcb", nil},
	// {`data`, "daXY data", []int{1}},
	// {`da(.)a$`, "daXY data", []int{1}},
	// {`zx+`, "zzx", []int{1}},
	// {`ab$`, "abcab", []int{1}},
	// {`(aa)*$`, "a", []int{1}},
	// {`(?:.|(?:.a))`, "", nil},
	// {`(?:A(?:A|a))`, "Aa", []int{1}},
	// {`(?:A|(?:A|a))`, "a", []int{1}},
	// {`(a){0}`, "", []int{1}},
	// //	{`(?-s)(?:(?:^).)`, "\n", nil},
	// //	{`(?s)(?:(?:^).)`, "\n", []int{1}},
	// //	{`(?:(?:^).)`, "\n", nil},
	// {`\b`, "x", []int{1}},
	// {`\b`, "xx", []int{1}},
	// {`\b`, "x y", []int{1}},
	// {`\b`, "xx yy", []int{1}},
	// {`\B`, "x", nil},
	// {`\B`, "xx", []int{1}},
	// {`\B`, "x y", nil},
	// {`\B`, "xx yy", []int{1}},
	// {`(?im)^[abc]+$`, "abcABC", []int{1}},
	// {`(?im)^[α]+$`, "αΑ", []int{1}},
	// {`[Aa]BC`, "abc", nil},
	// {`[Aa]bc`, "abc", []int{1}},

	// // RE2 tests
	// {`[^\S\s]`, "abcd", nil},
	// {`[^\S[:space:]]`, "abcd", nil},
	// {`[^\D\d]`, "abcd", nil},
	// {`[^\D[:digit:]]`, "abcd", nil},
	// {`(?i)\W`, "x", nil},
	// {`(?i)\W`, "k", nil},
	// {`(?i)\W`, "s", nil},

	// // can backslash-escape any punctuation
	// {
	// 	`\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\{\|\}\~`,
	// 	`!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`,
	// 	[]int{1},
	// },
	// {
	// 	`[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\{\|\}\~]+`,
	// 	`!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`,
	// 	[]int{1},
	// },
	// {"\\`", "`", []int{1}},
	// {"[\\`]+", "`", []int{1}},

	// // long set of matches (longer than startSize)
	// {
	// 	".",
	// 	"qwertyuiopasdfghjklzxcvbnm1234567890",
	// 	[]int{1},
	// },

	// Multiline inputs, matches wthin a line.
	{`x`, "a", nil},
	{`x`, "x", []Range{{0, 1}}},
	{`x`, "xo", []Range{{0, 1}}},
	{`x`, "ox", []Range{{1, 2}}},
	{`x`, "oox", []Range{{2, 3}}},
	{`x`, "x\nx", []Range{{0, 1}, {2, 3}}},
	{`x`, "hello x world", []Range{{6, 7}}},
	{`x`, "banana x phone", []Range{{7, 8}}},
	{`x`, "hello x world\nbanana x phone", []Range{{6, 7}, {21, 22}}},
	{`xxx`, "banana xxx phone", []Range{{7, 10}}},
	{`xyz`, "banana xyz phone", []Range{{7, 10}}},
	{`[ax][by][cz]`, "banana axyzb phone", []Range{{8, 11}}},
	{`xxx$`, "banana xxx", []Range{{7, 10}}},
}

func TestMatch(t *testing.T) {
	for _, tt := range matchTests {
		re, err := Compile(tt.re, 0)
		if err != nil {
			t.Errorf("Compile(%#q): %v", tt.re, err)
			continue
		}
		lines := grep(re, []byte(tt.s))
		if diff := cmp.Diff(tt.m, lines); diff != "" {
			t.Errorf("grep(%#q, %q) result differs (-want+got):\n%v", tt.re, tt.s, diff)
		}
	}
}

func grep(re *Regexp, b []byte) []Range {
	var m []Range
	// lineno := 1
	offset := 0
	for {
		r := Match(re, b)
		if r == nil {
			break
		}
		m = append(m, *r.Add(offset))
		offset += r.End
		b = b[r.End:]
		if len(b) == 0 {
			break
		}
	}
	return m
}
