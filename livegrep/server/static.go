// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import "embed"

//go:generate npm i --no-audit --no-fund
//go:generate go run ./gencss -style=vs -out=./web/syntax-light.css
//go:generate go run ./gencss -style=witchhazel -out=./web/syntax-dark.css
//go:generate go run ./build $DEBUG
//go:embed static
var staticFS embed.FS
