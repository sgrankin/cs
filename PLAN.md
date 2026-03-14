# Planned Work

## Bugs

- [ ] Stabilize search output in lexical order — addressed by frontend rewrite (ordered streaming)
- [ ] Run git GC periodically
- [ ] Clicking filter buttons should always set history — addressed by frontend rewrite (pushState/replaceState policy)
- [ ] Thin line separator should only separate non-consecutive lines when context is off — addressed by frontend rewrite (contiguous line ranges with null separators)

## Search & Indexing

- [ ] Move context overlap dedup into search engine — addressed by frontend rewrite (line range merging)
- [ ] Support other repo sources beyond GitHub (+ corresponding external link formats)
- [ ] Webhook-triggered repo updates (avoid waiting for poll reindex)
- [ ] Add benchmarking code for index & search
- [ ] Add index & search CLI tools for manual usage
- [ ] Port 64-bit index changes from upstream codesearch
- [ ] Add intersection (`&`) and complement (`~`) operators to `codesearch/regexp` DFA engine
  - Theoretically grounded: Brzozowski 1964 derivatives, RE# (Varatalu et al., POPL 2025) shows input-linear matching with these operators
  - DFA intersection via product construction (pair states, intersect transitions); complement by swapping accept/non-accept states
  - Enables: file/repo filters compiled into the search regex as a single DFA walk instead of separate passes; negative filters via complement; better trigram selectivity from combined patterns
  - RE# also supports restricted lookarounds (normalizable to `(?<=B)E(?=A)`, no nesting) via complement rewriting (`(?!S)` → `(?=~(S_*)\z)`). Useful for context-aware matching (e.g. "match only inside function bodies"). Bounded lookarounds mid-pattern rewritten using intersection.
  - Limitation: requires POSIX (leftmost-longest) semantics, not PCRE (leftmost-greedy). Intersection under backtracking semantics has unclear intended behavior.
  - Reference: `/Users/sgrankin/Downloads/3704837.pdf`
- [ ] Positional trigram index
  - Current index stores file IDs per trigram; adding byte offsets enables position-aware matching
  - For fixed-width patterns (no variable-length quantifiers like `*`, `+`, `?`, `{n,m}` where n≠m), trigrams have known offsets from match start → intersect posting lists with offset constraints → exact match locations without regex scanning
  - Covers literals (`bananan`), character classes (`bana[nN]a`), fixed repetitions (`bana[pn]{3}a`) — any pattern where every trigram position is deterministic
  - Example: `bana[nN]an` → trigrams `ban`, `ana` at fixed offsets. Intersect with offset constraints = match positions. Just read surrounding lines for context.
  - Eliminates the full-file regex scan for the common case (most real searches are literals or simple patterns). Line retrieval from known positions is much faster.
  - Similar to Zoekt's (Google code search) positional trigram approach
  - grep.app corroborates: fixed-width patterns like `bana[pn]{3}a` are fast, while `.`-heavy patterns hit scan limits
  - Tradeoff: larger index (positions per trigram vs just file IDs). Acceptable for curated indexes.
- [ ] Search time/complexity budget
  - When trigram selectivity is poor (e.g. `.` in pattern → huge posting list), cap search work by time rather than just match count
  - Return partial results with `truncated: true` flag; user sees results immediately and can refine
  - Different from MaxMatches (caps successful matches) — time budget caps *work* (useful when scanning many non-matching files)
  - Could detect upfront via posting list size estimate, or use a shorter `context.WithTimeout`
  - grep.app exhibits this: regex `banana.n` returns 10 results with `partial: true` vs 553 for literal `bananan` — their scan hits a time/complexity limit

## Frontend Rewrite

Detailed plan in [`specs/frontend-rewrite.md`](specs/frontend-rewrite.md).

Summary: Lit SPA consuming JSONL streaming API, client-side routing + query parsing, tree-sitter WASM syntax highlighting. Phases: API & Backend → Client Infrastructure → Search View → File View → Cleanup & Polish.

Key decisions:
- JSONL streaming (not SSE) via `fetch()` + `ReadableStream`
- Two orthogonal filter types: operators (regex, from query text) and facets (exact, from sidebar clicks). Round-trip symmetric with server response.
- `/raw/` endpoint for immutable file content + directory listings
- Embedded init data in HTML shell (repos, initial results) — no separate `/api/repos`
- Ordered streaming via per-repo channels drained in sorted order (fixes "stabilize search output" bug)
- Drop templ entirely; Go `html/template` for the SPA shell
- PWA manifest only (no service worker)

## Features

- [ ] Repo groups: per-user named filter shortcuts (e.g. "Go repos", "Project X")
  - Stored in localStorage, applied as query filters, shareable via URL
- [ ] Per-user repo access control: restrict visible repos based on user identity
  - Identity from HTTP header (auth proxy), config maps users/groups to repo sets

## Frontend Testing

- Custom test harness (Playwright + V8 coverage) — `@web/test-runner` was tried and rejected as unnecessary overhead
- Plain assertions, hand-written fixture helper
- Per component: rendering, interactions, events, reactive updates
- **Playwright MCP** for interactive visual evaluation during development

## CLI & Integration Testing

- **`rsc.io/script`** (`scripttest`) for `cmd/csbuild` and `cmd/csweb` tests
  - txtar-based scripts: set up files/config, run commands, check outputs
  - Good fit for the full pipeline: config → build index → search → verify results
  - Not for library packages (index, regexp) — those are pure Go unit tests

## Root Package Integration Tests

Remaining uncovered code needs integration-level testing:

- [ ] `git.go` — `gitTreeFS` (fs.FS over go-git Tree), `gitRepo` (FS, Refresh, Version), `openGitRepo`
  - Use real git repos in temp dirs (`git.PlainInit` + commit test files)
  - Test `gitTreeFS` with `fs.WalkDir`, `testing/fstest.TestFS`
  - Test `Refresh` with a local bare remote
- [ ] `git.go` — `ResolveFetchSpecs` (GitHub API calls)
  - Fake GitHub API: `httptest.NewServer` returning canned JSON for org/user/repo listing
  - Test filtering: archived, forks, reject regexp, hidden repos
- [ ] `syncer.go` — `repoSyncer.Refresh` orchestrates git fetch + repo creation
  - Combines real git repos with fake GitHub API
- [ ] `csbackend.go` — `BuildSearchIndex` (full pipeline: sync repos, build indexes, write meta, GC)
  - Needs both real git and fake GitHub; or test with `Repo` interface fakes
  - Consider `scripttest` (txtar scripts) for the full pipeline

## Test Data

- **Integration tests**: Pre-built small index from hand-crafted fixtures in `testdata/`
  - A few files in a few languages, known content, deterministic search results
  - Fast, stable, checked into repo
- **End-to-end / performance**: Real diverse index via `config.yaml` (`data/`)
  - Currently: clojure/clojure + torvalds/linux
  - Exercises real-world code paths, catches performance issues
  - Not checked in — built locally via `go run ./cmd/csweb -rebuild-interval=30m`

## Tooling

- [ ] Factor out shared Claude Code skills for Go style and Go testing (including coverage script)
  - Reusable across projects (cs, mk, etc.) — move to ~/.claude/skills/

## Build & Infra

- [ ] Compress static assets at build time (not runtime)
- [ ] Precalculate hashes for etags
- [ ] Remove unused API abstraction layer
- [ ] Simplify logger (avoid double-logging timestamps)
- [ ] Consider using go-getter for repo syncing
- [ ] OpenTelemetry: tracing and metrics (especially for search performance)
- [ ] Metrics/observability
