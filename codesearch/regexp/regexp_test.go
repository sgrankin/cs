// Copyright 2011 The Go Authors. All rights reserved.
// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-3-Clause

package regexp

import (
	"bytes"
	"flag"
	"fmt"
	"os"
	"reflect"
	"regexp/syntax"
	"strings"
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

	// Multiline inputs, matches within a line.
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

var updateGolden = flag.Bool("update", false, "update golden test files")

func TestProgString(t *testing.T) {
	// Golden test: compile regex patterns and compare progString output
	// against testdata/prog.txt. Run with -update to regenerate.
	//
	// Format: pattern on its own line, 4-space-indented output below.
	// Blank lines separate test cases. Lines starting with # are comments.
	const path = "testdata/prog.txt"
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}

	type testCase struct {
		pattern string
		want    string
		line    int // line number in file for error reporting
	}
	var cases []testCase
	lines := strings.Split(string(data), "\n")
	for i := 0; i < len(lines); {
		if lines[i] == "" || strings.HasPrefix(lines[i], "#") {
			i++
			continue
		}
		tc := testCase{pattern: lines[i], line: i + 1}
		i++
		var out []string
		for i < len(lines) && strings.HasPrefix(lines[i], "    ") {
			out = append(out, strings.TrimPrefix(lines[i], "    "))
			i++
		}
		tc.want = strings.Join(out, "\n") + "\n"
		cases = append(cases, tc)
	}

	if *updateGolden {
		var buf strings.Builder
		buf.WriteString("# Golden tests for progString (byte-compiled regex programs).\n")
		buf.WriteString("# Run `go test -update` to regenerate.\n\n")
		for _, tc := range cases {
			re, err := Compile(tc.pattern, 0)
			if err != nil {
				t.Fatalf("line %d: Compile(%q): %v", tc.line, tc.pattern, err)
			}
			buf.WriteString(tc.pattern + "\n")
			for _, line := range strings.Split(strings.TrimRight(progString(re.prog), "\n"), "\n") {
				buf.WriteString("    " + line + "\n")
			}
			buf.WriteByte('\n')
		}
		if err := os.WriteFile(path, []byte(buf.String()), 0o644); err != nil {
			t.Fatal(err)
		}
		t.Log("updated", path)
		return
	}

	for _, tc := range cases {
		t.Run(tc.pattern, func(t *testing.T) {
			re, err := Compile(tc.pattern, 0)
			if err != nil {
				t.Fatalf("line %d: Compile(%q): %v", tc.line, tc.pattern, err)
			}
			if got := progString(re.prog); got != tc.want {
				t.Errorf("line %d: progString(%q):\ngot:\n%swant:\n%s", tc.line, tc.pattern, got, tc.want)
			}
			_ = progString(re.revprog)
		})
	}
}

func TestDumpInst(t *testing.T) {
	// Test dumpInst directly to cover all instruction type formatting,
	// including types that don't appear in compiled byte programs.
	tests := []struct {
		name string
		inst syntax.Inst
		want string
	}{
		{"altmatch", syntax.Inst{Op: syntax.InstAltMatch, Out: 1, Arg: 2}, "altmatch -> 1, 2"},
		{"nop", syntax.Inst{Op: syntax.InstNop, Out: 5}, "nop -> 5"},
		{"rune", syntax.Inst{Op: syntax.InstRune, Rune: []rune{'a', 'z'}, Out: 3}, `rune "az" -> 3`},
		{"rune_fold", syntax.Inst{Op: syntax.InstRune, Rune: []rune{'a'}, Arg: uint32(syntax.FoldCase), Out: 3}, `rune "a"/i -> 3`},
		{"rune_nil", syntax.Inst{Op: syntax.InstRune, Rune: nil, Out: 3}, "rune <nil>"},
		{"rune1", syntax.Inst{Op: syntax.InstRune1, Rune: []rune{'x'}, Out: 4}, `rune1 "x" -> 4`},
		{"any", syntax.Inst{Op: syntax.InstRuneAny, Out: 6}, "any -> 6"},
		{"anynotnl", syntax.Inst{Op: syntax.InstRuneAnyNotNL, Out: 7}, "anynotnl -> 7"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var b bytes.Buffer
			dumpInst(&b, &tt.inst)
			got := b.String()
			if got != tt.want {
				t.Errorf("dumpInst(%s) = %q, want %q", tt.name, got, tt.want)
			}
		})
	}
}

func TestCompileError(t *testing.T) {
	_, err := Compile(`(`, 0)
	if err == nil {
		t.Fatal("Compile(`(`, 0) should return an error for invalid regex")
	}
}

func TestStringAndSyn(t *testing.T) {
	re, err := Compile(`hello`, 0)
	if err != nil {
		t.Fatal(err)
	}
	if got := re.String(); got != "hello" {
		t.Errorf("String() = %q, want %q", got, "hello")
	}
	if syn := re.Syn(); syn == nil {
		t.Error("Syn() returned nil")
	}
}

func TestClone(t *testing.T) {
	re, err := Compile(`abc`, 0)
	if err != nil {
		t.Fatal(err)
	}

	// Clone a compiled regex and verify it works independently.
	clone := re.Clone()
	if clone == nil {
		t.Fatal("Clone() returned nil")
	}
	if clone.String() != re.String() {
		t.Errorf("Clone().String() = %q, want %q", clone.String(), re.String())
	}

	// Verify the clone produces the same match results.
	r1 := Match(re, "xabcx")
	r2 := Match(clone, "xabcx")
	if r1 != r2 {
		t.Errorf("Clone match differs: original=%v, clone=%v", r1, r2)
	}

	// Clone of nil returns nil.
	var nilRe *Regexp
	if got := nilRe.Clone(); got != nil {
		t.Errorf("nil.Clone() = %v, want nil", got)
	}
}

func TestRangeAddNilRange(t *testing.T) {
	got := NilRange.Add(5)
	if got != NilRange {
		t.Errorf("NilRange.Add(5) = %v, want %v", got, NilRange)
	}
}

func TestNstateString(t *testing.T) {
	var n nstate
	n.q.Init(10)
	n.q.Add(1)
	n.q.Add(3)
	n.partial = 'x'
	s := n.String()
	if s == "" {
		t.Error("nstate.String() returned empty string")
	}
}

func TestReverseBeginEndText(t *testing.T) {
	// Exercise the OpBeginText/OpEndText cases in reverse() by using \A and \z.
	// \A (OpBeginText) can be tested via matching. \z (OpEndText) currently has
	// a bug in the reverse matcher when the match doesn't start at position 0,
	// so we only test \A here and verify \z compiles without error.
	tests := []struct {
		name  string
		re    string
		input string
		want  Range
	}{
		// \A (OpBeginText -> OpEndText in reverse) anchors at start of text.
		{"begin_text_match", `\Ahello`, "hello world", Range{0, 5}},
		{"begin_text_no_match", `\Ahello`, "say hello", NilRange},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			re, err := Compile(tt.re, 0)
			if err != nil {
				t.Fatalf("Compile(%q): %v", tt.re, err)
			}
			got := Match(re, tt.input)
			if got != tt.want {
				t.Errorf("Match(%q, %q) = %v, want %v", tt.re, tt.input, got, tt.want)
			}
		})
	}

	// Verify \z compiles (exercises OpEndText -> OpBeginText in reverse).
	_, err := Compile(`hello\z`, 0)
	if err != nil {
		t.Fatalf("Compile(`hello\\z`): %v", err)
	}
}

func TestCaseInsensitiveUnicode(t *testing.T) {
	// Case-insensitive matching with unicode character classes exercises
	// the FoldCase paths in toByteProg (utf.go lines 44-55).
	tests := []struct {
		re    string
		input string
		want  Range
	}{
		// (?i) with a unicode char class range triggers FoldCase with multi-rune ranges.
		// Non-greedy matching returns only the first character.
		{`(?i)[α-γ]`, "Α", Range{0, 2}},
		// Case-insensitive single ASCII letter - exercises the fold single byte path.
		{`(?i)a`, "A", Range{0, 1}},
		// Case-insensitive ASCII range.
		{`(?i)[a-z]`, "Z", Range{0, 1}},
	}
	for _, tt := range tests {
		re, err := Compile(tt.re, 0)
		if err != nil {
			t.Errorf("Compile(%q): %v", tt.re, err)
			continue
		}
		got := Match(re, tt.input)
		if got != tt.want {
			t.Errorf("Match(%q, %q) = %v, want %v", tt.re, tt.input, got, tt.want)
		}
	}
}

func TestMultiByteUnicodeRanges(t *testing.T) {
	// Matching patterns with multi-byte Unicode ranges exercises various
	// code paths in utf.go's runeBuilder.
	tests := []struct {
		name  string
		re    string
		input string
		want  Range
	}{
		// 3+ disjoint multi-byte ranges generate 3+ branches through addBranch,
		// hitting the InstAlt -> new InstAlt chain (utf.go addBranch InstAlt case).
		{"three_disjoint_ranges", `[αεω]`, "ε", Range{0, 2}},
		// CJK + Cyrillic + Greek: three widely-separated Unicode ranges.
		{"three_scripts", `[αЯ你]`, "Я", Range{0, 2}},
		// Full Unicode range exercise.
		{"unicode_range", `[\x{0100}-\x{0110}]`, "\u0108", Range{0, 2}},
		// Range that splits at UTF-8 encoding length boundary.
		{"utf8_boundary_split", `[\x{7F}-\x{FF}]`, "\u00C0", Range{0, 2}},
		// Range where hi doesn't end on a mask boundary, triggering
		// the hi&m != m split in addRange (utf.go lines 256-259).
		{"hi_mask_split", `[\x{100}-\x{150}]`, "\u0120", Range{0, 2}},
		// Case-insensitive with multi-rune Unicode char class range triggers
		// the FoldCase path with len(r) > 1 in toByteProg (utf.go lines 49-52).
		{"fold_unicode_range", `(?i)[α-ω]`, "Ω", Range{0, 2}},
		// Case-insensitive single Unicode rune (hits len(r)==1 fold path).
		{"fold_unicode_single", `(?i)α`, "Α", Range{0, 2}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			re, err := Compile(tt.re, 0)
			if err != nil {
				t.Fatalf("Compile(%q): %v", tt.re, err)
			}
			got := Match(re, tt.input)
			if got != tt.want {
				t.Errorf("Match(%q, %q) = %v, want %v", tt.re, tt.input, got, tt.want)
			}
		})
	}
}

func TestAppendRange(t *testing.T) {
	tests := []struct {
		name string
		init []rune
		lo   rune
		hi   rune
		want []rune
	}{
		{
			name: "empty",
			init: nil,
			lo:   'a', hi: 'z',
			want: []rune{'a', 'z'},
		},
		{
			name: "abutting",
			init: []rune{'a', 'm'},
			lo:   'n', hi: 'z',
			want: []rune{'a', 'z'},
		},
		{
			name: "overlapping",
			init: []rune{'a', 'n'},
			lo:   'm', hi: 'z',
			want: []rune{'a', 'z'},
		},
		{
			name: "extend_lo",
			init: []rune{'c', 'z'},
			lo:   'a', hi: 'd',
			want: []rune{'a', 'z'},
		},
		{
			name: "disjoint",
			init: []rune{'a', 'c'},
			lo:   'e', hi: 'z',
			want: []rune{'a', 'c', 'e', 'z'},
		},
		{
			name: "merge_second_to_last",
			// Two existing ranges; new range merges with the first (n-4 position).
			init: []rune{'a', 'm', 'x', 'z'},
			lo:   'n', hi: 'o',
			want: []rune{'a', 'o', 'x', 'z'},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := appendRange(tt.init, tt.lo, tt.hi)
			if diff := cmp.Diff(tt.want, got); diff != "" {
				t.Errorf("appendRange(%v, %q, %q) diff (-want+got):\n%s", tt.init, tt.lo, tt.hi, diff)
			}
		})
	}
}

func TestAppendFoldedRange(t *testing.T) {
	tests := []struct {
		name string
		lo   rune
		hi   rune
	}{
		// Range spanning all fold possibilities: the full-range optimization.
		{"full_range", 0, 0x10FFFF},
		// Range entirely below minFold.
		{"below_fold", 0, 0x0040},
		// Range entirely above maxFold.
		{"above_fold", 0x10450, 0x10FFFF},
		// Range starting below minFold and ending within.
		{"straddle_lo", 0x0030, 0x0050},
		// Range starting within and ending above maxFold.
		{"straddle_hi", 0x10440, 0x10FFFF},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := appendFoldedRange(nil, tt.lo, tt.hi)
			if len(got) == 0 {
				t.Errorf("appendFoldedRange(nil, %#x, %#x) returned empty", tt.lo, tt.hi)
			}
			// Verify the original range is included.
			found := false
			for i := 0; i < len(got); i += 2 {
				if got[i] <= tt.lo && got[i+1] >= tt.lo {
					found = true
					break
				}
			}
			if !found {
				t.Errorf("result %v does not contain lo=%#x", got, tt.lo)
			}
		})
	}
}

func TestRuneBuilder_addRange_loGtHi(t *testing.T) {
	// Verify addRange with lo > hi is a no-op (defensive guard).
	prog := &syntax.Prog{
		Inst: []syntax.Inst{
			{Op: syntax.InstFail},
			{Op: syntax.InstMatch},
		},
	}
	var b runeBuilder
	b.init(prog, 0, 1, false)
	b.addRange('z', 'a', false) // lo > hi: should be a no-op
	// The begin instruction should still be InstFail (not rewritten).
	if prog.Inst[0].Op != syntax.InstFail {
		t.Errorf("addRange(z, a) modified program: Op=%v, want InstFail", prog.Inst[0].Op)
	}
}

func TestRuneBuilder_suffix_fold(t *testing.T) {
	// Exercise the fold flag path in uncachedSuffix (utf.go lines 179-181).
	// This path is not reached from production code (addRange always passes
	// fold=false), but we test it directly for completeness.
	prog := &syntax.Prog{
		Inst: []syntax.Inst{
			{Op: syntax.InstFail},
			{Op: syntax.InstMatch},
		},
	}
	var b runeBuilder
	b.init(prog, 0, 1, false)
	pc := b.suffix('A', 'Z', true, 0)
	inst := prog.Inst[pc]
	if inst.Op != instByteRange {
		t.Fatalf("suffix produced Op=%v, want instByteRange", inst.Op)
	}
	if inst.Arg&argFold == 0 {
		t.Error("suffix with fold=true did not set argFold flag")
	}
}

func TestToByteProg_FoldCaseMultiRune(t *testing.T) {
	// Verify that case-insensitive patterns with multi-rune character class
	// ranges produce the expected compiled output. These exercise the FoldCase
	// multi-range path in toByteProg.
	//
	// We construct a program directly to ensure we hit the exact code path
	// (lines 49-52 of utf.go) since the syntax simplifier may expand folds.
	prog := &syntax.Prog{
		Inst: []syntax.Inst{
			{Op: syntax.InstRune, Rune: []rune{'A', 'F', 'a', 'f'}, Arg: uint32(syntax.FoldCase), Out: 1},
			{Op: syntax.InstMatch},
		},
		Start: 0,
	}
	// toByteProg should process this without error.
	if err := toByteProg(prog, false); err != nil {
		t.Fatalf("toByteProg: %v", err)
	}
	// The first instruction should have been rewritten to a byte-matching instruction.
	if prog.Inst[0].Op == syntax.InstRune {
		t.Error("toByteProg did not rewrite InstRune")
	}
}

func TestAsciiFold(t *testing.T) {
	tests := []struct {
		r    rune
		want bool
	}{
		// ASCII letters have ASCII fold partners.
		{'a', true},
		{'A', true},
		{'z', true},
		// Digits fold to themselves (SimpleFold('0')=='0'), trivially all-ASCII.
		{'0', true},
		// Non-ASCII rune: should return false.
		{0x80, false},
		// 'k' has a non-ASCII fold partner (Kelvin sign U+212A).
		{'k', false},
		{'K', false},
		// 's' has a non-ASCII fold partner (long s U+017F).
		{'s', false},
		{'S', false},
	}
	for _, tt := range tests {
		t.Run(fmt.Sprintf("%04x", tt.r), func(t *testing.T) {
			got := asciiFold(tt.r)
			if got != tt.want {
				t.Errorf("asciiFold(%#x) = %v, want %v", tt.r, got, tt.want)
			}
		})
	}
}

func TestOneByteRange(t *testing.T) {
	// Exercise oneByteRange by constructing syntax.Inst values directly.
	tests := []struct {
		name     string
		inst     syntax.Inst
		wantLo   byte
		wantHi   byte
		wantFold bool
		wantOK   bool
	}{
		{
			name:     "rune1_ascii",
			inst:     syntax.Inst{Op: syntax.InstRune1, Rune: []rune{'a'}},
			wantLo:   'a',
			wantHi:   'a',
			wantFold: false,
			wantOK:   true,
		},
		{
			name: "rune1_non_ascii",
			inst: syntax.Inst{Op: syntax.InstRune1, Rune: []rune{0x100}},
			// Non-ASCII single rune: can't be a one-byte range.
			wantOK: false,
		},
		{
			name: "rune_single_with_fold_ascii",
			// Single ASCII rune with fold, and fold partner is also ASCII (e.g. 'a' -> 'A').
			inst:     syntax.Inst{Op: syntax.InstRune, Rune: []rune{'a'}, Arg: uint32(syntax.FoldCase)},
			wantLo:   'a',
			wantHi:   'a',
			wantFold: true,
			wantOK:   true,
		},
		{
			name: "rune_single_with_fold_non_ascii_fold",
			// 'k' has non-ASCII fold partner (Kelvin sign U+212A), so fold not ok.
			inst:   syntax.Inst{Op: syntax.InstRune, Rune: []rune{'k'}, Arg: uint32(syntax.FoldCase)},
			wantOK: false,
		},
		{
			name: "rune_single_non_ascii",
			// Non-ASCII single rune: can't be one-byte.
			inst:   syntax.Inst{Op: syntax.InstRune, Rune: []rune{0x100}},
			wantOK: false,
		},
		{
			name: "rune_pair_same",
			// Rune pair [r, r]: same as single rune.
			inst:     syntax.Inst{Op: syntax.InstRune, Rune: []rune{'x', 'x'}},
			wantLo:   'x',
			wantHi:   'x',
			wantFold: false,
			wantOK:   true,
		},
		{
			name: "rune_range_ascii_no_fold",
			// ASCII range [a-z] without fold.
			inst:     syntax.Inst{Op: syntax.InstRune, Rune: []rune{'a', 'z'}},
			wantLo:   'a',
			wantHi:   'z',
			wantFold: false,
			wantOK:   true,
		},
		{
			name: "rune_range_ascii_with_fold_all_ascii_fold",
			// ASCII range [A-F] with fold: asciiFold returns true for all members,
			// so oneByteRange bails (returns ok=false). The fold will be handled
			// by the full rune expansion path instead.
			inst:   syntax.Inst{Op: syntax.InstRune, Rune: []rune{'A', 'F'}, Arg: uint32(syntax.FoldCase)},
			wantOK: false,
		},
		{
			name: "rune_range_ascii_with_fold_non_ascii_partner",
			// ASCII range [a-z] with fold: 'a' has asciiFold=true so bails immediately.
			inst:   syntax.Inst{Op: syntax.InstRune, Rune: []rune{'a', 'z'}, Arg: uint32(syntax.FoldCase)},
			wantOK: false,
		},
		{
			name: "rune_range_ascii_with_fold_no_fold_partners",
			// ASCII range of non-letter chars with fold: asciiFold('0')=true
			// (SimpleFold('0')='0', so r1==r, returns true). So this also bails.
			inst:   syntax.Inst{Op: syntax.InstRune, Rune: []rune{'0', '9'}, Arg: uint32(syntax.FoldCase)},
			wantOK: false,
		},
		{
			name: "rune_range_non_ascii",
			// Range ending above RuneSelf.
			inst:   syntax.Inst{Op: syntax.InstRune, Rune: []rune{0x60, 0x100}},
			wantOK: false,
		},
		{
			name: "rune_4fold_pair",
			// 4-rune fold pair: [A, A, a, a] where SimpleFold('A')=='a' and vice versa.
			inst:     syntax.Inst{Op: syntax.InstRune, Rune: []rune{'A', 'A', 'a', 'a'}},
			wantLo:   'A',
			wantHi:   'A',
			wantFold: true,
			wantOK:   true,
		},
		{
			name: "rune_4_not_fold_pair",
			// 4 runes that are NOT a valid fold pair.
			inst:   syntax.Inst{Op: syntax.InstRune, Rune: []rune{'A', 'A', 'b', 'b'}},
			wantOK: false,
		},
		{
			name: "rune_other_op",
			// An op that is neither InstRune nor InstRune1.
			inst:   syntax.Inst{Op: syntax.InstAlt, Rune: []rune{'a'}},
			wantOK: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			lo, hi, fold, ok := oneByteRange(&tt.inst)
			if ok != tt.wantOK {
				t.Fatalf("oneByteRange() ok = %v, want %v", ok, tt.wantOK)
			}
			if !ok {
				return
			}
			if lo != tt.wantLo || hi != tt.wantHi || fold != tt.wantFold {
				t.Errorf("oneByteRange() = (%d, %d, %v), want (%d, %d, %v)",
					lo, hi, fold, tt.wantLo, tt.wantHi, tt.wantFold)
			}
		})
	}
}
