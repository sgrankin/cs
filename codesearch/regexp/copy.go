// Copyright 2011 The Go Authors.  All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Copied from Go's regexp/syntax.

package regexp

import (
	"bytes"
	"fmt"
	"regexp/syntax"
	"strconv"
	"unicode"
)

// appendRange returns the result of appending the range lo-hi to the class r.
func appendRange(r []rune, lo, hi rune) []rune {
	// Expand last range or next to last range if it overlaps or abuts.
	// Checking two ranges helps when appending case-folded
	// alphabets, so that one range can be expanding A-Z and the
	// other expanding a-z.
	n := len(r)
	for i := 2; i <= 4; i += 2 { // twice, using i=2, i=4
		if n >= i {
			rlo, rhi := r[n-i], r[n-i+1]
			if lo <= rhi+1 && rlo <= hi+1 {
				if lo < rlo {
					r[n-i] = lo
				}
				if hi > rhi {
					r[n-i+1] = hi
				}
				return r
			}
		}
	}

	return append(r, lo, hi)
}

const (
	// minimum and maximum runes involved in folding.
	// checked during test.
	minFold = 0x0041
	maxFold = 0x1044f
)

// appendFoldedRange returns the result of appending the range lo-hi
// and its case folding-equivalent runes to the class r.
func appendFoldedRange(r []rune, lo, hi rune) []rune {
	// Optimizations.
	if lo <= minFold && hi >= maxFold {
		// Range is full: folding can't add more.
		return appendRange(r, lo, hi)
	}
	if hi < minFold || lo > maxFold {
		// Range is outside folding possibilities.
		return appendRange(r, lo, hi)
	}
	if lo < minFold {
		// [lo, minFold-1] needs no folding.
		r = appendRange(r, lo, minFold-1)
		lo = minFold
	}
	if hi > maxFold {
		// [maxFold+1, hi] needs no folding.
		r = appendRange(r, maxFold+1, hi)
		hi = maxFold
	}

	// Brute force.  Depend on appendRange to coalesce ranges on the fly.
	for c := lo; c <= hi; c++ {
		r = appendRange(r, c, c)
		f := unicode.SimpleFold(c)
		for f != c {
			r = appendRange(r, f, f)
			f = unicode.SimpleFold(f)
		}
	}
	return r
}

// progString returns a human-readable dump of the compiled program,
// including the custom instByteRange instructions added by toByteProg.
func progString(p *syntax.Prog) string {
	var b bytes.Buffer
	dumpProg(&b, p)
	return b.String()
}

func dumpProg(b *bytes.Buffer, p *syntax.Prog) {
	for j := range p.Inst {
		i := &p.Inst[j]
		pc := strconv.Itoa(j)
		if len(pc) < 3 {
			b.WriteString("   "[len(pc):])
		}
		if j == p.Start {
			pc += "*"
		}
		b.WriteString(pc)
		b.WriteByte('\t')
		dumpInst(b, i)
		b.WriteByte('\n')
	}
}

func dumpInst(b *bytes.Buffer, i *syntax.Inst) {
	switch i.Op {
	case syntax.InstAlt:
		fmt.Fprintf(b, "alt -> %d, %d", i.Out, i.Arg)
	case syntax.InstAltMatch:
		fmt.Fprintf(b, "altmatch -> %d, %d", i.Out, i.Arg)
	case syntax.InstCapture:
		fmt.Fprintf(b, "cap %d -> %d", i.Arg, i.Out)
	case syntax.InstEmptyWidth:
		fmt.Fprintf(b, "empty %d -> %d", i.Arg, i.Out)
	case syntax.InstMatch:
		b.WriteString("match")
	case syntax.InstFail:
		b.WriteString("fail")
	case syntax.InstNop:
		fmt.Fprintf(b, "nop -> %d", i.Out)
	case instByteRange:
		fmt.Fprintf(b, "byte %02x-%02x", (i.Arg>>8)&0xFF, i.Arg&0xFF)
		if i.Arg&argFold != 0 {
			b.WriteString("/i")
		}
		fmt.Fprintf(b, " -> %d", i.Out)
	// Should not happen after toByteProg, but useful for debugging.
	case syntax.InstRune:
		if i.Rune == nil {
			b.WriteString("rune <nil>")
			return
		}
		fmt.Fprintf(b, "rune %s", strconv.QuoteToASCII(string(i.Rune)))
		if syntax.Flags(i.Arg)&syntax.FoldCase != 0 {
			b.WriteString("/i")
		}
		fmt.Fprintf(b, " -> %d", i.Out)
	case syntax.InstRune1:
		fmt.Fprintf(b, "rune1 %s -> %d", strconv.QuoteToASCII(string(i.Rune)), i.Out)
	case syntax.InstRuneAny:
		fmt.Fprintf(b, "any -> %d", i.Out)
	case syntax.InstRuneAnyNotNL:
		fmt.Fprintf(b, "anynotnl -> %d", i.Out)
	}
}
