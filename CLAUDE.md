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
