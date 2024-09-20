package chroma

import (
	"path"

	"github.com/alecthomas/chroma/v2"
	"github.com/alecthomas/chroma/v2/formatters/html"
	"github.com/alecthomas/chroma/v2/lexers"
)

var HTMLFormatter = html.New(
	// PERF: Classes are extremely slow laying out large files with lots of spans
	// (e.g. clojure core.clj).  Inline styles are immediate, but don't support
	// dark mode (unless client hints become standard).
	// => https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-Prefers-Color-Scheme
	html.WithClasses(true),
	html.WithLineNumbers(true),
	html.LineNumbersInTable(true),
	html.WithLinkableLineNumbers(true, "L"),
	// TODO: pass the query into the file viewer and highlight the matched lines?
	// html.HighlightLines(...)
)

func Lexer(name, content string) chroma.Lexer {
	lex := lexers.Match(path.Base(name))
	if lex == nil {
		lex = lexers.Analyse(content)
	}
	if lex == nil {
		lex = lexers.Fallback
	}
	lex = chroma.Coalesce(lex) // Compact neighboring runs.
	return lex
}
