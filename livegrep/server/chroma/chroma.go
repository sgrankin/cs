package chroma

import (
	"fmt"
	"html"
	"html/template"
	"io"
	"log"
	"path"
	"strings"

	"github.com/alecthomas/chroma/v2"
	"github.com/alecthomas/chroma/v2/lexers"
	"github.com/alecthomas/chroma/v2/styles"
)

var HTMLFormatter = NewHTMLFormatter()

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

func FormatHTML(fileName, content string) template.HTML {
	lex := Lexer(path.Base(fileName), content)
	toks, err := lex.Tokenise(nil, content)
	if err != nil {
		log.Printf("Lexer failed tokenizing: %v", err)
		return template.HTML(
			fmt.Sprintf(`<pre><code id="source-code">%s</code></pre>`,
				html.EscapeString(content)))
	}

	buf := &strings.Builder{}
	HTMLFormatter.Format(buf, toks)
	return template.HTML(buf.String())
}

func WriteCSS(w io.Writer, styleName string) error {
	return HTMLFormatter.WriteCSS(w, styles.Get(styleName))
}
