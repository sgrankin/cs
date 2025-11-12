// Copyright 2011 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Package regexp implements regular expression search tuned for
// use in grep-like programs.
package regexp

import (
	"log"
	"regexp/syntax"
	"slices"
)

func bug() {
	panic("codesearch/regexp: internal error")
}

// Regexp is the representation of a compiled regular expression.
// A Regexp is NOT SAFE for concurrent use by multiple goroutines.
type Regexp struct {
	expr string // original expression

	syn     *syntax.Regexp
	prog    *syntax.Prog
	matcher matcher

	revsyn     *syntax.Regexp
	revprog    *syntax.Prog
	revmatcher matcher
}

// String returns the source text used to compile the regular expression.
func (re *Regexp) String() string { return re.expr }

func (re *Regexp) Syn() *syntax.Regexp { return re.syn }

// Compile parses a regular expression and returns, if successful,
// a Regexp object that can be used to match against lines of text.
func Compile(expr string, flags syntax.Flags) (*Regexp, error) {
	syn, err := syntax.Parse(expr, syntax.PerlX|syntax.UnicodeGroups|flags)
	if err != nil {
		return nil, err
	}
	sre := syn.Simplify()
	prog, err := syntax.Compile(sre)
	if err != nil {
		return nil, err
	}
	if err := toByteProg(prog, false); err != nil {
		return nil, err
	}

	revsyn := reverse(sre)
	revprog, err := syntax.Compile(revsyn)
	if err != nil {
		return nil, err
	}
	if err := toByteProg(revprog, true); err != nil {
		return nil, err
	}

	r := &Regexp{
		expr:    expr,
		syn:     syn,
		prog:    prog,
		revsyn:  revsyn,
		revprog: revprog,
	}
	if err := r.matcher.init(prog); err != nil {
		return nil, err
	}
	if err := r.revmatcher.init(revprog); err != nil {
		return nil, err
	}

	return r, nil
}

func (re *Regexp) Clone() *Regexp {
	if re == nil {
		return nil
	}
	r := Regexp{
		expr:    re.expr,
		syn:     re.syn,
		prog:    re.prog,
		revsyn:  re.revsyn,
		revprog: re.revprog,
	}
	if err := r.matcher.init(r.prog); err != nil {
		return nil
	}
	if err := r.revmatcher.init(r.revprog); err != nil {
		return nil
	}
	return &r
}

type Range struct{ Start, End int }

var NilRange = Range{-1, -1}

func (r Range) Add(x int) Range {
	if r == NilRange {
		return r
	}
	return Range{r.Start + x, r.End + x}
}

func Match[T ~[]byte | ~string](r *Regexp, s T) Range {
	end := match(&r.matcher, s)
	if end < 0 {
		return NilRange
	}
	var d *dstate
	// For reverse matching, we need the correct set of flags for word boundary matching:
	left := -1
	right := -1
	if end > 0 {
		left = int(s[end-1])
	}
	if len(s) > end {
		right = int(s[end])
	}
	switch {
	case left == -1 && right == -1:
		d = r.revmatcher.start
	case isWordByte(left) == isWordByte(right):
		d = r.revmatcher.startNoWord
	case isWordByte(left) != isWordByte(right):
		d = r.revmatcher.startWord
	}
	start := revmatch(&r.revmatcher, s[:end], d)
	if start < 0 {
		log.Panicf("Reverse regex failed: \ns=%q\ns=%x\nend=%d start=%d\nsyn=%q\nsynprog=%s\nrevsyn=%q\nrevprog=%s",
			s, s, end, start,
			r.syn.String(),
			r.matcher.prog.String(),
			r.revsyn.String(),
			r.revmatcher.prog.String())
	}
	return Range{start, end}
}

func reverse(syn *syntax.Regexp) *syntax.Regexp {
	if syn == nil {
		return nil
	}
	rsyn := *syn
	rsyn.Sub = slices.Clone(syn.Sub)
	rsyn.Rune = slices.Clone(syn.Rune)
	switch rsyn.Op {
	case syntax.OpConcat:
		slices.Reverse(rsyn.Sub)
		slices.Reverse(rsyn.Sub0[:])
	case syntax.OpLiteral:
		slices.Reverse(rsyn.Rune)
		slices.Reverse(rsyn.Rune0[:])
	case syntax.OpBeginLine:
		rsyn.Op = syntax.OpEndLine
	case syntax.OpEndLine:
		rsyn.Op = syntax.OpBeginLine
	case syntax.OpBeginText:
		rsyn.Op = syntax.OpEndText
	case syntax.OpEndText:
		rsyn.Op = syntax.OpBeginText
	}
	for i, sub := range rsyn.Sub {
		rsyn.Sub[i] = reverse(sub)
	}
	for i, sub := range rsyn.Sub0 {
		rsyn.Sub0[i] = reverse(sub)
	}
	return &rsyn
}
