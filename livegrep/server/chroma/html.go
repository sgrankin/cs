// Copyright (C) 2017 Alec Thomas
// Copyright (C) 2024 Sergey Grankin
// SPDX-License-Identifier: MIT

package chroma

import (
	"fmt"
	"html"
	"io"
	"maps"
	"slices"
	"strconv"
	"strings"

	"github.com/alecthomas/chroma/v2"
)

// New HTML formatter.
func NewHTMLFormatter() *Formatter {
	f := &Formatter{
		BaseLineNumber:      1,
		Prefix:              "chroma",
		LineNumbers:         true,
		LineNumbersInTable:  true,
		LineNumbersIDPrefix: "L",
		LinkableLineNumbers: true,
	}
	return f
}

// Formatter that generates HTML.
type Formatter struct {
	TabWidth            int
	Prefix              string
	LineNumbers         bool
	LineNumbersInTable  bool
	LinkableLineNumbers bool
	LineNumbersIDPrefix string
	BaseLineNumber      int
}

func (f *Formatter) Format(w io.Writer, iterator chroma.Iterator) (err error) {
	return f.writeHTML(w, iterator.Tokens())
}

// We deliberately don't use html/template here because it is two orders of magnitude slower (benchmarked).
//
// OTOH we need to be super careful about correct escaping...
func (f *Formatter) writeHTML(w io.Writer, tokens []chroma.Token) (err error) {
	// precompute CSS strings for standard classes
	inlineCSS := map[chroma.TokenType]string{}
	for tt := range chroma.StandardTypes {
		inlineCSS[tt] = attrsForVar("--" + f.class(tt) + "-").String()
	}

	write := func(format string, a ...any) {
		if err != nil {
			return
		}
		if len(a) > 0 {
			_, err = fmt.Fprintf(w, format, a...)
		} else {
			_, err = fmt.Fprint(w, format)
		}
	}

	wrapInTable := f.LineNumbers && f.LineNumbersInTable

	lines := chroma.SplitTokensIntoLines(tokens)
	lineDigits := len(strconv.Itoa(f.BaseLineNumber + len(lines) - 1))

	if wrapInTable {
		// List line numbers in its own <td>
		write("<div%s%s>", f.classAttr(0), f.styleAttr(chroma.Background))
		write("<table%s><tr>", f.classAttr(chroma.LineTable))
		write("<td%s>", f.classAttr(chroma.LineTableTD))
		write("<pre%s>", f.classAttr(chroma.PreWrapper))
		for index := range lines {
			line := f.BaseLineNumber + index
			write("<span%s%s>%s</span>",
				f.classAttr(chroma.LineNumbersTable),
				f.lineIDAttribute(line),
				f.lineTitleWithLinkIfNeeded(lineDigits, line))
		}
		write("</pre>")
		write("</td>")
		write(`<td%s style="width:100%%">`, f.classAttr(chroma.LineTableTD))
	}

	write("<pre%s><code>", f.classAttr(chroma.PreWrapper))

	for index, tokens := range lines {
		// 1-based line number.
		line := f.BaseLineNumber + index

		// Start of Line
		write(`<span%s>`, f.classAttr(chroma.Line)) // TODO: this is fixed... should just hardcode it
		// Line number
		if f.LineNumbers && !wrapInTable {
			write("<span%s%s>%s</span>", f.classAttr(chroma.LineNumbers),
				f.lineIDAttribute(line),
				f.lineTitleWithLinkIfNeeded(lineDigits, line))
		}

		write(`<span%s>`, f.classAttr(chroma.CodeLine))
		for _, token := range tokens {
			html := html.EscapeString(token.String())
			if f.class(token.Type) != "" {
				attr := inlineCSS[token.Type]
				if attr != "" {
					html = fmt.Sprintf(`<span style="%s">%s</span>`, attr, html)
				}
			}
			write(html)
		}

		write(`</span>`) // End of CodeLine
		write(`</span>`) // End of Line
	}
	write("</code></pre>")

	if wrapInTable {
		write("</td></tr></table>")
		write("</div>")
	}

	return nil
}

func (f *Formatter) lineIDAttribute(line int) string {
	if !f.LinkableLineNumbers {
		return ""
	}
	return fmt.Sprintf(" id=\"%s\"", f.lineID(line))
}

func (f *Formatter) lineTitleWithLinkIfNeeded(lineDigits, line int) string {
	title := fmt.Sprintf("%*d", lineDigits, line)
	if !f.LinkableLineNumbers {
		return title
	}
	return fmt.Sprintf("<a%s href=\"#%s\">%s</a>", f.classAttr(chroma.LineLink), f.lineID(line), title)
}

func (f *Formatter) lineID(line int) string {
	return fmt.Sprintf("%s%d", f.LineNumbersIDPrefix, line)
}

// class returns the prefixed CSS class for the token type.
func (f *Formatter) class(t chroma.TokenType) string {
	for t != 0 {
		if cls, ok := chroma.StandardTypes[t]; ok {
			if cls != "" {
				return f.Prefix + "-" + cls
			}
			return ""
		}
		t = t.Parent()
	}
	if cls := chroma.StandardTypes[t]; cls != "" {
		return f.Prefix + "-" + cls
	}
	return f.Prefix
}

// classAttr returns the HTML class attribute snippet for the given token types.
func (f *Formatter) classAttr(tt ...chroma.TokenType) string {
	var classes []string
	for _, t := range tt {
		cls := f.class(t)
		if cls == "" {
			continue
		}
		classes = append(classes, cls)
	}
	if len(classes) == 0 {
		return ""
	}
	return fmt.Sprintf(` class="%s"`, strings.Join(classes, " "))
}

// styleAttr returns the HTML style attribute snippet for the given token types.
//
// The style references the relevant attributes via prefixed vars.
func (f *Formatter) styleAttr(tt chroma.TokenType) string {
	if f.class(tt) != "" {
		attr := attrsForVar("--" + f.class(tt) + "-").String()
		if attr != "" {
			return fmt.Sprintf(` style="%s"`, attr)
		}
	}
	return ""
}

// tabWidthStyle returns the CSS attributes defining tab size.
func (f *Formatter) tabWidthStyle() map[string]string {
	val := fmt.Sprintf("%d", f.TabWidth)
	return map[string]string{
		"-moz-tab-size": val,
		"-o-tab-size":   val,
		"tab-size":      val,
	}
}

// WriteCSS writes CSS style definitions (without any surrounding HTML).
func (f *Formatter) WriteCSS(w io.Writer, style *chroma.Style) (err error) {
	write := func(tok chroma.TokenType, comment, selector string, style CSSAttrs) {
		if err != nil {
			return
		}
		_, err = fmt.Fprintf(w, "/* %s%s */ %s { %s }\n",
			tok, comment, selector, style)
	}
	css := f.styleToCSS(style)

	// Special-case PreWrapper as it is the ".chroma" class.
	write(chroma.PreWrapper, "", "."+f.class(chroma.PreWrapper), css[chroma.PreWrapper])

	// Special-case code column of table to expand width.
	write(chroma.LineTableTD, "",
		"."+f.class(chroma.LineTableTD)+":last-child",
		map[string]string{"width": "100%"})

	// Special-case line number highlighting when targeted.
	for _, tt := range []chroma.TokenType{chroma.LineNumbers, chroma.LineNumbersTable} {
		write(tt, " targeted by URL anchor",
			"."+f.class(tt)+":target",
			attrsForVar("--"+f.class(chroma.LineHighlight)+"-"))
	}
	tts := slices.Collect(maps.Keys(css))
	slices.Sort(tts)
	for _, tt := range tts {
		switch tt {
		case chroma.PreWrapper:
			continue
		}
		attrs := css[tt]
		if len(attrs) == 0 {
			continue
		}
		write(tt, "", "."+f.class(tt), attrs)
	}
	return err
}

// styleToCSS creates the CSS class attributes for each token.
//
// Most of the style is actually specified as vars for the zero token type.
func (f *Formatter) styleToCSS(style *chroma.Style) map[chroma.TokenType]map[string]string {
	classes := map[chroma.TokenType]map[string]string{}

	bg := style.Get(chroma.Background)

	for t := range chroma.StandardTypes {
		entry := style.Get(t)
		if t != chroma.Background {
			// Entries shall not duplicate BG-class attributes.
			entry = entry.Sub(bg)
		}
		if entry.IsZero() {
			continue
		}
		classes[0] = mapsMerge(classes[0], styleEntryAttrs(entry, "--"+f.class(t)+"-"))
	}

	classes[chroma.Background] = f.tabWidthStyle()
	classes[chroma.PreWrapper] = mapsMerge(f.tabWidthStyle(), map[string]string{
		// Make PreWrapper a grid to show highlight style with full width.
		"display": "grid",
	})

	classes[chroma.Line] = map[string]string{"display": "flex"}
	lineNumbersStyle := map[string]string{
		"white-space":         "pre",
		"-webkit-user-select": "none",
		"user-select":         "none",
		"margin-right":        "0.4em",
		"padding":             "0 0.4em 0 0.4em",
	}
	classes[chroma.LineNumbers] = lineNumbersStyle
	classes[chroma.LineNumbersTable] = lineNumbersStyle
	classes[chroma.LineTable] = map[string]string{
		"border-spacing": "0",
		"padding":        "0",
		"margin":         "0",
		"border":         "0",
	}
	classes[chroma.LineTableTD] = map[string]string{
		"vertical-align": "top",
		"padding":        "0",
		"margin":         "0",
		"border":         "0",
	}
	classes[chroma.LineLink] = map[string]string{
		"outline":         "none",
		"text-decoration": "none",
		"color":           "inherit",
	}
	return classes
}

// mapsMerge copies all the given maps into a new map.
func mapsMerge[M ~map[K]V, K comparable, V any](ms ...M) M {
	res := make(M)
	for _, m := range ms {
		maps.Copy(res, m)
	}
	return res
}

type CSSAttrs map[string]string

// String creates a canonical string for the given CSS attributes.
func (attrs CSSAttrs) String() string {
	b := &strings.Builder{}
	for _, k := range slices.Sorted(maps.Keys(attrs)) {
		b.WriteString(k + ": " + attrs[k] + "; ")
	}
	return strings.TrimSpace(b.String())
}

// styleEntryAttrs creates the CSS attributes for the given entry.
//
// The namePrefix modifies the attribute names and can be used to create custom attrs.
func styleEntryAttrs(e chroma.StyleEntry, namePrefix string) CSSAttrs {
	v := map[string]string{}
	if e.Colour.IsSet() {
		v[namePrefix+"color"] = e.Colour.String()
	}
	if e.Background.IsSet() {
		v[namePrefix+"background-color"] = e.Background.String()
	}
	if e.Bold == chroma.Yes {
		v[namePrefix+"font-weight"] = "bold"
	}
	if e.Italic == chroma.Yes {
		v[namePrefix+"font-style"] = "italic"
	}
	if e.Underline == chroma.Yes {
		v[namePrefix+"text-decoration"] = "underline"
	}
	return v
}

// attrsForVar returns (non-prefixed) style attrs referencing the (prefixed) attrs via a var.
func attrsForVar(varPrefix string) CSSAttrs {
	return map[string]string{
		"color":            "var(" + varPrefix + "color)",
		"background-color": "var(" + varPrefix + "background-color)",
		"font-weight":      "var(" + varPrefix + "font-weight)",
		"font-style":       "var(" + varPrefix + "font-style)",
		"text-decoration":  "var(" + varPrefix + "text-decoration)",
	}
}
