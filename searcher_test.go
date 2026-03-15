// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package cs

import (
	"regexp/syntax"
	"slices"
	"testing"

	"sgrankin.dev/cs/codesearch/regexp"
)

func TestCountNL(t *testing.T) {
	tests := []struct {
		name string
		b    []byte
		want int
	}{
		{"empty", []byte{}, 0},
		{"no newlines", []byte("hello"), 0},
		{"one newline", []byte("hello\n"), 1},
		{"two newlines", []byte("a\nb\n"), 2},
		{"only newlines", []byte("\n\n\n"), 3},
		{"newline in middle", []byte("a\nb"), 1},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := countNL(tt.b); got != tt.want {
				t.Errorf("countNL(%q) = %d, want %d", tt.b, got, tt.want)
			}
		})
	}
}

func TestFirstLines(t *testing.T) {
	tests := []struct {
		name string
		b    []byte
		n    int
		want []string
	}{
		{"empty slice", []byte{}, 1, nil},
		{"zero lines", []byte("abc"), 0, nil},
		{"negative n", []byte("abc"), -1, nil},
		{"one line no trailing newline", []byte("\nabc"), 1, []string{"abc"}},
		{"one line with trailing newline", []byte("\nabc\n"), 1, []string{"abc"}},
		{"two lines request one", []byte("\nabc\ndef"), 1, []string{"abc"}},
		{"two lines request two", []byte("\nabc\ndef"), 2, []string{"abc", "def"}},
		{"two lines request more", []byte("\nabc\ndef"), 5, []string{"abc", "def"}},
		{"starts without newline", []byte("abc\ndef"), 2, []string{"abc", "def"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := firstLines(tt.b, tt.n)
			if !slices.Equal(got, tt.want) {
				t.Errorf("firstLines(%q, %d) = %q, want %q", tt.b, tt.n, got, tt.want)
			}
		})
	}
}

func TestLastLines(t *testing.T) {
	tests := []struct {
		name string
		b    []byte
		n    int
		want []string
	}{
		{"empty slice", []byte{}, 1, nil},
		{"zero lines", []byte("abc"), 0, nil},
		{"negative n", []byte("abc"), -1, nil},
		{"one line no leading newline", []byte("abc\n"), 1, []string{"abc"}},
		{"one line with leading newline", []byte("abc\n"), 1, []string{"abc"}},
		{"two lines request one", []byte("abc\ndef\n"), 1, []string{"def"}},
		{"two lines request two", []byte("abc\ndef\n"), 2, []string{"abc", "def"}},
		{"two lines request more", []byte("abc\ndef\n"), 5, []string{"abc", "def"}},
		{"ends without newline", []byte("abc\ndef"), 2, []string{"abc", "def"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := lastLines(tt.b, tt.n)
			if !slices.Equal(got, tt.want) {
				t.Errorf("lastLines(%q, %d) = %q, want %q", tt.b, tt.n, got, tt.want)
			}
		})
	}
}

func TestSearchBlob(t *testing.T) {
	compile := func(t *testing.T, pattern string) *regexp.Regexp {
		t.Helper()
		re, err := regexp.Compile(pattern, syntax.Perl)
		if err != nil {
			t.Fatalf("regexp.Compile(%q) failed: %v", pattern, err)
		}
		return re
	}

	tests := []struct {
		name          string
		pattern       string
		blob          string
		contextLines  int
		maxMatches    int
		wantCount     int
		wantLine      string   // expected first match line content
		wantLineNum   int      // expected first match line number
		wantBounds    *Bounds  // expected first match bounds (nil means don't check)
		wantCtxBefore []string // expected first match ContextBefore (nil means don't check)
		wantCtxAfter  []string // expected first match ContextAfter (nil means don't check)
	}{
		{
			name:        "simple match",
			pattern:     "hello",
			blob:        "hello world",
			maxMatches:  10,
			wantCount:   1,
			wantLine:    "hello world",
			wantLineNum: 1,
		},
		{
			name:       "no match",
			pattern:    "xyz",
			blob:       "hello world",
			maxMatches: 10,
			wantCount:  0,
		},
		{
			name:        "multiple matches",
			pattern:     "line",
			blob:        "line one\nline two\nline three",
			maxMatches:  10,
			wantCount:   3,
			wantLine:    "line one",
			wantLineNum: 1,
		},
		{
			name:        "max matches limits results",
			pattern:     "line",
			blob:        "line one\nline two\nline three",
			maxMatches:  2,
			wantCount:   2,
			wantLine:    "line one",
			wantLineNum: 1,
		},
		{
			name:         "context lines",
			pattern:      "target",
			blob:         "before1\nbefore2\ntarget line\nafter1\nafter2",
			contextLines: 2,
			maxMatches:   10,
			wantCount:    1,
			wantLine:     "target line",
			wantLineNum:  3,
		},
		{
			name:        "match on last line without trailing newline",
			pattern:     "end",
			blob:        "start\nend",
			maxMatches:  10,
			wantCount:   1,
			wantLine:    "end",
			wantLineNum: 2,
		},
		{
			name:        "match on line with trailing newline",
			pattern:     "middle",
			blob:        "first\nmiddle\nlast",
			maxMatches:  10,
			wantCount:   1,
			wantLine:    "middle",
			wantLineNum: 2,
		},
		{
			name:        "bounds",
			pattern:     "world",
			blob:        "hello world",
			maxMatches:  10,
			wantCount:   1,
			wantLine:    "hello world",
			wantLineNum: 1,
			wantBounds:  &Bounds{Left: 6, Right: 11},
		},
		{
			name:          "context before and after",
			pattern:       "target",
			blob:          "ctx1\nctx2\ntarget\nafter1\nafter2",
			contextLines:  2,
			maxMatches:    10,
			wantCount:     1,
			wantLine:      "target",
			wantLineNum:   3,
			wantCtxBefore: []string{"ctx1", "ctx2"},
			wantCtxAfter:  []string{"after1", "after2"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			re := compile(t, tt.pattern)
			results := searchBlob(re, []byte(tt.blob), tt.contextLines, tt.maxMatches)
			if len(results) != tt.wantCount {
				t.Fatalf("searchBlob returned %d results, want %d", len(results), tt.wantCount)
			}
			if tt.wantCount == 0 {
				return
			}
			r := results[0]
			if r.Line != tt.wantLine {
				t.Errorf("first result Line = %q, want %q", r.Line, tt.wantLine)
			}
			if r.LineNumber != tt.wantLineNum {
				t.Errorf("first result LineNumber = %d, want %d", r.LineNumber, tt.wantLineNum)
			}
			if tt.wantBounds != nil {
				if r.Bounds != *tt.wantBounds {
					t.Errorf("Bounds = %+v, want %+v", r.Bounds, *tt.wantBounds)
				}
			}
			if tt.wantCtxBefore != nil {
				if !slices.Equal(r.ContextBefore, tt.wantCtxBefore) {
					t.Errorf("ContextBefore = %q, want %q", r.ContextBefore, tt.wantCtxBefore)
				}
			}
			if tt.wantCtxAfter != nil {
				if !slices.Equal(r.ContextAfter, tt.wantCtxAfter) {
					t.Errorf("ContextAfter = %q, want %q", r.ContextAfter, tt.wantCtxAfter)
				}
			}
		})
	}
}

func TestRegexpFilter(t *testing.T) {
	type check struct {
		input string
		want  bool
	}
	tests := []struct {
		name    string
		accept  string
		reject  string
		wantErr bool
		checks  []check
	}{
		{
			name:   "accept-all filter for empty patterns",
			accept: "",
			reject: "",
			checks: []check{{"anything", true}},
		},
		{
			name:   "accept only",
			accept: `\.go$`,
			checks: []check{
				{"main.go", true},
				{"main.py", false},
			},
		},
		{
			name:   "reject only",
			reject: `_test\.go$`,
			checks: []check{
				{"main.go", true},
				{"main_test.go", false},
			},
		},
		{
			name:   "accept and reject",
			accept: `\.go$`,
			reject: `_test\.go$`,
			checks: []check{
				{"main.go", true},
				{"main_test.go", false},
				{"main.py", false},
			},
		},
		{
			name:    "invalid accept",
			accept:  "[invalid",
			wantErr: true,
		},
		{
			name:    "invalid reject",
			reject:  "[invalid",
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			f, err := newRegexpFilter(tt.accept, tt.reject)
			if tt.wantErr {
				if err == nil {
					t.Fatal("expected error, got nil")
				}
				return
			}
			if err != nil {
				t.Fatalf("newRegexpFilter returned error: %v", err)
			}
			for _, c := range tt.checks {
				if got := f.Accept([]byte(c.input)); got != c.want {
					t.Errorf("Accept(%q) = %v, want %v", c.input, got, c.want)
				}
			}
		})
	}

	t.Run("clone returns different pointer", func(t *testing.T) {
		f, err := newRegexpFilter(`\.go$`, `_test\.go$`)
		if err != nil {
			t.Fatal(err)
		}
		c := f.Clone()
		if c == f {
			t.Error("Clone should return a different pointer")
		}
		if !c.Accept([]byte("main.go")) {
			t.Error("clone should accept main.go")
		}
		if c.Accept([]byte("main_test.go")) {
			t.Error("clone should reject main_test.go")
		}
	})

	t.Run("clone nil", func(t *testing.T) {
		var f *regexpFilter
		c := f.Clone()
		if c != nil {
			t.Error("Clone of nil should return nil")
		}
	})
}

func TestSetFilter(t *testing.T) {
	t.Run("nil accepts everything", func(t *testing.T) {
		var f *setFilter
		if !f.Accept([]byte("anything")) {
			t.Error("nil setFilter should accept anything")
		}
	})

	t.Run("matches members", func(t *testing.T) {
		f := newSetFilter([]string{"alpha", "beta", "gamma"})
		tests := []struct {
			input string
			want  bool
		}{
			{"alpha", true},
			{"beta", true},
			{"gamma", true},
			{"delta", false},
			{"", false},
		}
		for _, tt := range tests {
			t.Run(tt.input, func(t *testing.T) {
				if got := f.Accept([]byte(tt.input)); got != tt.want {
					t.Errorf("Accept(%q) = %v, want %v", tt.input, got, tt.want)
				}
			})
		}
	})

	t.Run("empty rejects everything", func(t *testing.T) {
		f := newSetFilter(nil)
		if f.Accept([]byte("anything")) {
			t.Error("empty setFilter should reject everything")
		}
	})
}

func TestExtensionFilter(t *testing.T) {
	tests := []struct {
		name       string
		extensions []string
		input      string
		want       bool
	}{
		{"matches .go", []string{".go"}, "src/main.go", true},
		{"matches .py", []string{".go", ".py"}, "script.py", true},
		{"no match", []string{".go"}, "readme.md", false},
		{"no extension", []string{".go"}, "Makefile", false},
		{"dotfile", []string{".gitignore"}, ".gitignore", true},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			f := newExtensionFilter(tc.extensions)
			if got := f.Accept([]byte(tc.input)); got != tc.want {
				t.Errorf("Accept(%q) = %v, want %v", tc.input, got, tc.want)
			}
		})
	}

	t.Run("nil for empty", func(t *testing.T) {
		f := newExtensionFilter(nil)
		if f != nil {
			t.Error("expected nil for empty extensions")
		}
	})
}

func TestPathPrefixFilter(t *testing.T) {
	tests := []struct {
		name     string
		prefixes []string
		input    string
		want     bool
	}{
		{"matches prefix", []string{"src/"}, "src/main.go", true},
		{"matches one of many", []string{"src/", "lib/"}, "lib/util.go", true},
		{"no match", []string{"src/"}, "test/main.go", false},
		{"exact match", []string{"README.md"}, "README.md", true},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			f := newPathPrefixFilter(tc.prefixes)
			if got := f.Accept([]byte(tc.input)); got != tc.want {
				t.Errorf("Accept(%q) = %v, want %v", tc.input, got, tc.want)
			}
		})
	}

	t.Run("nil for empty", func(t *testing.T) {
		f := newPathPrefixFilter(nil)
		if f != nil {
			t.Error("expected nil for empty prefixes")
		}
	})
}

func TestCompositeFilter(t *testing.T) {
	ext := newExtensionFilter([]string{".go"})
	pfx := newPathPrefixFilter([]string{"src/"})
	both := newCompositeFilter(ext, pfx)

	tests := []struct {
		name  string
		input string
		want  bool
	}{
		{"matches both", "src/main.go", true},
		{"extension only", "test/main.go", false},
		{"prefix only", "src/readme.md", false},
		{"neither", "test/readme.md", false},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			if got := both.Accept([]byte(tc.input)); got != tc.want {
				t.Errorf("Accept(%q) = %v, want %v", tc.input, got, tc.want)
			}
		})
	}

	t.Run("all nil returns accept-all", func(t *testing.T) {
		f := newCompositeFilter(nil, nil)
		if !f.Accept([]byte("anything")) {
			t.Error("all-nil composite should accept anything")
		}
	})

	t.Run("single non-nil unwraps", func(t *testing.T) {
		f := newCompositeFilter(nil, ext, nil)
		if _, ok := f.(*extensionFilter); !ok {
			t.Errorf("single non-nil should unwrap, got %T", f)
		}
	})
}
