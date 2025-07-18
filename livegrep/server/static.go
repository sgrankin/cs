// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"embed"
	"encoding/json"
	"log"
)

//go:generate bun install
//go:generate go run ./gencss -style=vs -out=./web/syntax-light.css
//go:generate go run ./gencss -style=xcode-dark -out=./web/syntax-dark.css
//go:generate go run ./build $DEBUG
//go:embed static
var staticFS embed.FS

//go:embed static/meta.json
var metaJSON []byte
var meta Meta

func init() {
	if err := json.Unmarshal(metaJSON, &meta); err != nil {
		log.Panic(err)
	}
}
