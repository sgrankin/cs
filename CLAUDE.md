# CS — CodeSearch

Full-text code search tool: livegrep-inspired UI on a modified codesearch backend. Single Go binary syncs GitHub repos, builds trigram indexes, and serves a search UI.

## Tech Stack

- **Backend**: Go, templ (HTML templates), chroma (syntax highlighting), go-git, go-github
- **Frontend**: TypeScript + Lit web components, HTMX, Bootstrap, jQuery, esbuild
- **Build**: `go generate ./...` (runs bun install, templ generate, esbuild via `livegrep/server/build`)

## Key Directories

- `codesearch/` — Modified Google codesearch: trigram index, DFA regex engine, mmap'd blob storage
- `livegrep/server/` — HTTP server, routes, API, templ views, frontend assets (`web/`)
- `cmd/csweb/` — Main server binary
- `cmd/csbuild/` — Standalone index builder
- Root `.go` files — Config, git sync, index management, search API

## Build & Run

```sh
go generate ./...                    # Rebuild frontend assets + templ
go run ./cmd/csweb -listen=:8910 -config=config.yaml -rebuild-interval=30m
```

## Conventions

- Server-rendered HTML via templ + HTMX for interactivity
- All JS/CSS bundled via esbuild at `go generate` time (no CDN)
- Frontend source: `livegrep/server/web/*.ts` and `*.tsx`
- Node deps managed via bun (`bun.lock`)

## Go Style

Follow the Google Go Style Guide — see `doc/go-style.md` for a condensed reference.

Key points: clarity over cleverness, minimal dependencies, errors returned not panicked (this is a server), `gofmt`, no assertion libraries in tests.

## Pre-commit Checklist

All must pass before committing:

```bash
go test ./...              # all tests must pass
go vet ./...               # must be clean
go tool staticcheck ./...  # must be clean (pinned in go.mod)
go tool govulncheck ./...  # no known vulnerabilities (pinned in go.mod)
```

Address any gopls diagnostics (type errors, unused imports, etc.) visible in changed files.

## Test Coverage

Target: **100% statement coverage.** New/changed code must have 100% coverage. Existing gaps will be closed over time.

Check uncovered lines:
```bash
go test -coverprofile=cover.out ./...; awk -f .claude/scripts/cover-uncovered.awk cover.out
```

Output is one line per file with uncovered line ranges (e.g. `api.go: 54-58,90-92`). Should produce no output.

## Code Review

Before finalizing a change, review the diff with Sonnet. Focus on things mechanical checks can't catch: correctness, test quality, design issues, subtle bugs. Don't duplicate the pre-commit checklist.
