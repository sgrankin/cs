// Copyright 2011-2013 Nelson Elhage
// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"embed"
)

//go:generate bun install
//go:generate bun run ../web/build.mjs
//go:embed static
var staticFS embed.FS
