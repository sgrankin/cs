package main

import (
	"flag"
	"log"
	"os"

	"github.com/alecthomas/chroma/v2/styles"

	"sgrankin.dev/cs/livegrep/server/chroma"
)

func main() {
	log.SetFlags(log.Lshortfile)
	var (
		style = flag.String("style", "vs", "Style to generate")
		out   = flag.String("out", "-", "Out path")
	)
	flag.Parse()
	w := os.Stdout
	if *out != "-" {
		var err error
		w, err = os.Create(*out)
		if err != nil {
			log.Fatalf("Could not open %q: %v", *out, err)
		}
		defer w.Close()
	}
	chroma.HTMLFormatter.WriteCSS(w, styles.Get(*style))
}
