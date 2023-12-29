package server

import "embed"

//go:generate npm ci --no-audit --no-fund
//go:generate go run ./internal/build
//go:embed static
var staticFS embed.FS
