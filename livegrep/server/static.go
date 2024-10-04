// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"embed"
	"encoding/json"
	"log"
)

//go:generate npm i --no-audit --no-fund
//go:generate go run ./gencss -style=vs -out=./web/syntax-light.css
//go:generate go run ./gencss -style=xcode-dark -out=./web/syntax-dark.css
//go:generate go run ./build $DEBUG
//go:embed static
var staticFS embed.FS

//go:embed static/meta.json
var entrypointMetaJSON []byte
var entrypointMeta EntrypointMetaFile

func init() {
	if err := json.Unmarshal(entrypointMetaJSON, &entrypointMeta); err != nil {
		log.Panic(err)
	}
	log.Print(entrypointMeta)
}
