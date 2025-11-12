// Copyright 2011 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package regexp

import (
	"fmt"
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
	// Adapted from go/src/pkg/regexp/find_test.go.
	{`a+`, "abc\ndef\nghi\n", []Range{{0, 1}}},
	{``, ``, []Range{{0, 0}}},
	{`^abcdefg`, "abcdefg", []Range{{0, 7}}},
	{`a+`, "baaab", []Range{{1, 2}, {2, 3}, {3, 4}}},
	{"abcd..", "abcdef", []Range{{0, 6}}},
	{`a`, "a", []Range{{0, 1}}},
	{`x`, "y", nil},
	{`b`, "abc", []Range{{1, 2}}},
	{`.`, "a", []Range{{0, 1}}},
	{`.*`, "abcdef", []Range{{0, 0}}},
	{`^`, "abcde", []Range{{0, 0}}},
	{`$`, "abcde", []Range{{5, 5}}},
	{`^abcd$`, "abcd", []Range{{0, 4}}},
	{`^bcd'`, "abcdef", nil},
	{`^abcd$`, "abcde", nil},
	{`a+`, "baaab", []Range{{1, 2}, {2, 3}, {3, 4}}},
	{`a*`, "baaab", []Range{{0, 0}}},
	{`[a-z]+`, "abcd", []Range{{0, 1}, {1, 2}, {2, 3}, {3, 4}}},
	{`[^a-z]+`, "ab1234cd", []Range{{2, 3}, {3, 4}, {4, 5}, {5, 6}}},
	{`[a\-\]z]+`, "az]-bcz", []Range{{0, 1}, {1, 2}, {2, 3}, {3, 4}, {6, 7}}},
	{`[^\n]+`, "abcd\n", []Range{{0, 1}, {1, 2}, {2, 3}, {3, 4}}},
	{`[日本語]+`, "日本語日本語", []Range{{0, 3}, {3, 6}, {6, 9}, {9, 12}, {12, 15}, {15, 18}}},
	{`日本語+`, "日本語", []Range{{0, 9}}},
	{`日本語+`, "日本語語語語", []Range{{0, 9}}},
	{`()`, "", []Range{{0, 0}}},
	{`(a)`, "a", []Range{{0, 1}}},
	{`(.)(.)`, "日a", []Range{{0, 4}}},
	{`(.*)`, "", []Range{{0, 0}}},
	{`(.*)`, "abcd", []Range{{0, 0}}},
	{`(..)(..)`, "abcd", []Range{{0, 4}}},
	{`(([^xyz]*)(d))`, "abcd", []Range{{3, 4}}},
	{`((a|b|c)*(d))`, "abcd", []Range{{3, 4}}},
	{`(((a|b|c)*)(d))`, "abcd", []Range{{3, 4}}},
	{`\a\f\r\t\v`, "\a\f\r\t\v", []Range{{0, 5}}},
	{`[\a\f\n\r\t\v]+`, "\a\f\r\t\v", rangesUpTo(5)},

	{`a*(|(b))c*`, "aacc", []Range{{0, 0}}},
	{`(.*).*`, "ab", []Range{{0, 0}}},
	{`[.]`, ".", []Range{{0, 1}}},
	{`/$`, "/abc/", []Range{{4, 5}}},
	{`/$`, "/abc", nil},

	// multiple matches
	{`.`, "abc", []Range{{0, 1}, {1, 2}, {2, 3}}},
	{`(.)`, "abc", []Range{{0, 1}, {1, 2}, {2, 3}}},
	{`.(.)`, "abcd", []Range{{0, 2}, {2, 4}}},
	{`ab*`, "abbaab", []Range{{0, 1}, {3, 4}, {4, 5}}},
	{`a(b*)`, "abbaab", []Range{{0, 1}, {3, 4}, {4, 5}}},

	// fixed bugs
	{`ab$`, "cab", []Range{{1, 3}}},
	{`axxb$`, "axxcb", nil},
	{`data`, "daXY data", []Range{{5, 9}}},
	{`da(.)a$`, "daXY data", []Range{{5, 9}}},
	{`zx+`, "zzx", []Range{{1, 3}}},
	{`ab$`, "abcab", []Range{{3, 5}}},
	{`(aa)*$`, "a", []Range{{1, 1}}},
	{`(?:.|(?:.a))`, "", nil},
	{`(?:A(?:A|a))`, "Aa", []Range{{0, 2}}},
	{`(?:A|(?:A|a))`, "a", []Range{{0, 1}}},
	{`(a){0}`, "", []Range{{0, 0}}},
	{`(?-s)(?:(?:^).)`, "\n", nil},
	{`(?s)(?:(?:^).)`, "\n", []Range{{0, 1}}},
	{`(?:(?:^).)`, "\n", nil},
	{`\b`, "x", []Range{{0, 0}}},
	{`\b`, "xx", []Range{{0, 0}}},
	{`\b`, "x y", []Range{{0, 0}}},
	{`\b`, "xx yy", []Range{{0, 0}}},
	{`\B`, "x", nil},
	{`\B`, "xx", []Range{{1, 1}}},
	{`\B`, "x y", nil},
	{`\B`, "xx yy", []Range{{1, 1}}},
	{`(?im)^[abc]+$`, "abcABC", []Range{{0, 6}}},
	{`(?im)^[α]+$`, "αΑ", []Range{{0, 4}}},
	{`[Aa]BC`, "abc", nil},
	{`[Aa]bc`, "abc", []Range{{0, 3}}},

	// RE2 tests
	{`[^\S\s]`, "abcd", nil},
	{`[^\S[:space:]]`, "abcd", nil},
	{`[^\D\d]`, "abcd", nil},
	{`[^\D[:digit:]]`, "abcd", nil},
	{`(?i)\W`, "x", nil},
	{`(?i)\W`, "k", nil},
	{`(?i)\W`, "s", nil},

	// can backslash-escape any punctuation
	{
		`\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\{\|\}\~`,
		`!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`,
		[]Range{{0, 31}},
	},
	{
		`[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\{\|\}\~]+`,
		`!"#$%&'()*+,-./:;<=>?@[\]^_{|}~`,
		rangesUpTo(31),
	},
	{"\\`", "`", []Range{{0, 1}}},
	{"[\\`]+", "`", []Range{{0, 1}}},

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

	// Currently the matches are always non-greedy.
	// This is fine for the grep case -- we only care about the first match on a line and then we skip the rest anyway.
	// If longest matches are wanted in the future, see the discussion at [regexp3] and example at [dfa.cc].
	// Roughly, what will be needed:
	// - Marks inside the NFA queue, added whenever the initial .* matches, to prioritize earlier matches.
	// - Discarding everything post the first mark after a match is found.
	//   - Note that this won't be the first mark if earlier states are still matching!
	//   - Special handling if the program has an anchor at the end -- it's not matched till EOF.
	// - Probably a Matched flag to record that we have a match.
	// - (And no more Start being added once we are in this mode).
	// - A dead state (empty queue & matched?) to terminate the search.
	// - Tracking lastmatch position (and updating to the latest one as more are found).
	// [regexp3]: https://swtch.com/~rsc/regexp/regexp3.html
	// [dfa.cc]: https://github.com/google/re2/blob/main/re2/dfa.cc#L624
	{`x`, "banana xxx phone", []Range{{7, 8}, {8, 9}, {9, 10}}},
	{`xx?`, "banana xxx phone", []Range{{7, 8}, {8, 9}, {9, 10}}},
	{`x+`, "banana xxx phone", []Range{{7, 8}, {8, 9}, {9, 10}}},

	// Match spanning newline:
	{`x.*x`, "hello x world\nbanana x phone", nil},
	{`(?s)x.*x`, "hello x world\nbanana x phone", []Range{{6, 22}}},
	{`(?s)xy.*xy`, "hello xy world\n\n\nbanana xy phone", []Range{{6, 26}}},

	{`x.*x`, "axöxb", []Range{{1, 5}}},

	{`(x+x+)+y`, "xxxxxxxxxxx", nil}, // Catastrophic backtracking example
}

func TestMatch(t *testing.T) {
	for _, tt := range matchTests {
		re, err := Compile(tt.re, 0)
		if err != nil {
			t.Errorf("Compile(%#q): %v", tt.re, err)
			continue
		}
		lines := grep(re, tt.s)
		if diff := cmp.Diff(tt.m, lines); diff != "" {
			t.Errorf("grep(%#q, %q) result differs (-want+got):\n%v", tt.re, tt.s, diff)
		}
	}
}

var matchBenches = []struct {
	re string
	s  string
}{
	{`x`, "a"},
	{`da(.)a$`, "daXY data"},
	{`\bbanana (phone|pants)\b`, "x y z banana tree banana phone banana pants"},
	{`(x+x+)+y`, "xxxxxxxxxxx"},
	{`(?i)\\W`, "s"},
	{`[Aa]BC`, "abc"},
	{`(?:.|(?:.a))`, ""},
}

func BenchmarkMatch(b *testing.B) {
	for i, tt := range matchBenches {
		b.Run(fmt.Sprintf("%04d·%q·%q", i, tt.re, tt.s), func(b *testing.B) {
			b.ReportAllocs()
			re, err := Compile(tt.re, 0)
			if err != nil {
				b.Errorf("Compile(%#q): %v", tt.re, err)
				return
			}
			for b.Loop() {
				Match(re, tt.s)
			}
		})
	}
}

func grep(re *Regexp, s string) []Range {
	var m []Range
	offset := 0
	for {
		r := Match(re, s)
		if r == NilRange {
			break
		}
		m = append(m, r.Add(offset))
		if r.Start == r.End {
			break // Zero-width match; record it once and be done.
		}
		offset += r.End
		s = s[r.End:]
		if len(s) == 0 {
			break
		}
	}
	return m
}

// rangesUpTo returns one-character ranges from {0, 1} up to {n-1, n} in order.
func rangesUpTo(n int) []Range {
	var ret []Range
	for i := range n {
		ret = append(ret, Range{i, i + 1})
	}
	return ret
}
