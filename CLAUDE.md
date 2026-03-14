# CS — CodeSearch

Full-text code search tool: livegrep-inspired UI on a modified codesearch backend. Single Go binary syncs GitHub repos, builds trigram indexes, and serves a search UI.

## Tech Stack

- **Backend**: Go, templ (HTML templates), chroma (syntax highlighting), go-git, go-github
- **Frontend**: TypeScript + Lit web components, HTMX, Bootstrap, jQuery, esbuild
- **Build**: `go generate ./...` (runs bun install, templ generate, esbuild via `web/build.mjs`)

## Key Directories

- `codesearch/` — Modified Google codesearch: trigram index, DFA regex engine, mmap'd blob storage
- `server/` — HTTP server, routes, API, templ views, embedded static assets
- `web/` — Frontend TypeScript/CSS source, esbuild config
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
- Frontend source: `web/*.ts` and `*.tsx`
- Node deps managed via bun (`bun.lock`)

## Go Style

Follow the Google Go Style Guide — see `doc/go-style.md` for a condensed reference.

Key points: clarity over cleverness, minimal dependencies, errors returned not panicked (this is a server), `gofmt`, no assertion libraries in tests.

## Pre-commit Checklist

All must pass before committing:

```bash
go tool goimports -w .     # format and fix imports
go test ./...              # all tests must pass
go vet ./...               # must be clean
go tool staticcheck ./...  # must be clean (pinned in go.mod)
go tool govulncheck ./...  # no known vulnerabilities (pinned in go.mod)
bun run test               # frontend component tests (requires sandbox bypass)
```

Address any gopls diagnostics (type errors, unused imports, etc.) visible in changed files.

## Test Style

**Table-driven by default.** If there are 2+ cases for the same function, use a test table with `t.Run`. Don't write separate `TestFooBasic`, `TestFooEdge`, `TestFooError` functions when a single `TestFoo` with a `[]struct{ name string; ... }` table covers them. This is the first thing to reach for, not an optimization.

**Data-driven over hand-written assertions.** Prefer txtar/golden file patterns over hand-checking individual fields:
- **Golden JSON tests** (`testdata/search/*.txt` or `*.txtar`): config + expected output separated by blank line. Run with `-update` to regenerate. See `server/search_test.go` and `search_test.go` for the pattern.
- **txtar for test fixtures** (`testdata/index/*.txtar`): source files for building real indexes. Prefer real implementations over fakes/mocks.
- When the input data controls the output shape, use real implementations. When you need precise output control that real implementations can't provide (e.g., non-deterministic concurrent results), use structural assertions in Go tests.

**Reduce structural duplication.** If multiple tests share setup (create server, make request, check status), extract the common pattern into the table struct or a helper. The test table should capture what varies; the runner captures what's shared.

**Fakes over mocks.** Use data-driven fakes (like `fs.MapFS`, real search indexes from txtar) instead of function-field mocks. If a test needs a `SearchIndex`, build a real one from test data — don't stub individual methods.

## Test Coverage

Target: **100% statement coverage.** New/changed code must have 100% coverage. Existing gaps will be closed over time.

Check uncovered lines:
```bash
go test -coverprofile=cover.out ./...; awk -f .claude/scripts/cover-uncovered.awk cover.out
```

Output is one line per file with uncovered line ranges (e.g. `api.go: 54-58,90-92`). Should produce no output.

Frontend coverage:
```bash
bun run test:coverage      # V8 coverage → per-file line report
```

## Frontend Testing

Tests live in `web/*.test.ts`. No test frameworks — just plain functions:

- **Test harness** (`testing/harness.ts`): runs exported `test*` functions, reports pass/fail per test. `eq(got, want)` for value comparison.
- **Runner** (`testing/web-runner.mjs`): esbuild bundles tests, Playwright opens in headless Chromium, reads console output.
- **Components** to test go in `web/components.ts` (pure Lit, no side effects). Components that depend on jQuery/htmx stay in `web/codesearch_ui.tsx`.
- Run via `bun run test` (requires sandbox bypass for Chromium).

## Code Review

Before finalizing a change, run `/simplify` then `/review` (code-reviewer agent). Focus on things mechanical checks can't catch: correctness, test quality, design issues, subtle bugs. Don't duplicate the pre-commit checklist.
