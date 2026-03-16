# Frontend Rewrite Plan

## Context

The app currently uses server-rendered HTML (templ + HTMX) with Lit web components for interactivity. jQuery and bootstrap-select have been removed; esbuild and dev tooling are in place. The goal is a client-rendered SPA: Lit components consuming a JSON streaming API, with client-side routing, query parsing, and syntax highlighting.

The existing `api/types.go` TODO (line 57) already calls for contiguous line ranges, and `searchview.go:75` has a TODO for streaming search. This rewrite addresses both.

---

## Phase 0: API & Backend

Build new endpoints alongside existing HTML routes. Zero frontend impact. Includes backend changes for ordered streaming.

**Status**: Complete. All endpoints, query params, facet filters, and ordered streaming implemented. Remaining for later phases: embedded init data in HTML shell (Phase 1 dependency).

### `GET /api/search` — JSONL streaming search

The only API endpoint. Returns `application/x-ndjson` — one JSON object per line, streamed via `fetch()` + `ReadableStream`.

**Request params** — two orthogonal filter types:

| Param | Type | Notes |
|-------|------|-------|
| `q` | string | Line regex. Client handles literal wrapping (`\Q...\E`) and case folding (`(?i)`) |
| `file`, `-file` | string, repeatable | File path regex (OR'd within) |
| `repo`, `-repo` | string, repeatable | Repo name regex (OR'd within) |
| `f.ext` | string, repeatable | Facet: file extension exact match (OR'd) |
| `f.repo` | string, repeatable | Facet: repo name exact match (OR'd, fast set lookup) |
| `f.path` | string, repeatable | Facet: path prefix exact match (OR'd) |
| `context` | int | Context lines, default 3 |
| `max` | int | Max matches, server default if omitted |

Operators (regex) and facets (exact) AND together. Multiple values within a param OR together.

**Response** — JSONL (one JSON object per `\n`-delimited line):

```jsonl
{"type":"result","path":"org/foo/abc123/+/src/main.go","lines":[[7,"// context"],[8,"func main() {",[[0,4]]],[9,"}"],[10,"  return"],null,[25,"func other() {",[[0,4]]]]}
{"type":"file","path":"org/foo/abc123/+/main.go","match":[0,4]}
{"type":"facets","ext":[{"v":".go","c":12}],"repo":[{"v":"org/foo","c":8}],"path":[{"v":"src/","c":15}]}
{"type":"done","time_ms":15,"total":42,"truncated":false}
```

- `result`: per-file code matches. `lines` is compact arrays: `[lno, text]` or `[lno, text, [[start,end],...]]` for match bounds. `null` separates non-contiguous line groups.
- `file`: filename matches.
- `facets`: top-N buckets per dimension. Keys match `f.*` request params (round-trip symmetric). May be sent incrementally as repos complete.
- `done`: timing, total count, truncation flag.
- `path` is the full linkable path (`repo/version/+/filepath`). Client splits on `/+/` for display.

**Caching**: `Cache-Control: max-age=30` — browser HTTP cache handles backspace-and-retype (same URL = instant cache hit). Cached responses return as complete blobs (faster than re-streaming). Streaming only matters for fresh requests.

### `GET /raw/{tree}/{version}/+/{path...}` — raw file content & directory listings

- No trailing slash: raw file bytes (`application/octet-stream`).
- Trailing slash: directory listing — JSON array of child names, dirs have trailing slashes.
- `Cache-Control: immutable, max-age=31536000` (git hash in path = immutable content).

### Embedded init data in HTML shell

Repo list (names only, for dropdown), plus:
- If URL has `q=`: initial search results (same shape as JSONL events, but inline JSON array).
- If URL is `/view/...`: initial file content or directory listing.
- Avoids round-trip on page load. Client reads from `window.__CS_INIT` on first load, fetches for subsequent interactions. State layer unifies both sources into the same signals.

### Facets — decision deferred

Plan on having facets. Precision vs speed tradeoff to be decided during implementation:
- Option A: Facets from returned results only. Accurate but incomplete when truncated.
- Option B: Continue searching past result limit — verify regex but skip context extraction. Accurate, more expensive. Separate FacetLimit.
- Option C: Trigram-only scan. Fast but inaccurate for low-selectivity regexes (e.g. `[a-z]{3}`).
- Could combine: results up to MaxMatches (with context), then facet-only scanning up to FacetLimit.
- `truncated` flag in `done` event tells client when facets are incomplete.

### Backend: ordered streaming

Refactor `csbackend.go:Search` for deterministic, streamable results:
- All repos search concurrently, each writing to its own bounded channel.
- Emitter drains channels in sorted repo-name order (fully drain repo A, then B, etc.).
- Searching is decoupled from emitting: while streaming repo A, repos B-Z search and buffer.
- Head-of-line only affects output ordering, not search parallelism.
- Memory bounded by (buffer size × num repos).
- MaxMatches cutoff is deterministic. Fixes PLAN.md "stabilize search output" bug.
- Result display ordering: alphabetical by repo+path. Revisit when repo groups are implemented — group ordering could serve as a coarse sort key.

### Backend: line range merging

Replace `ContextBefore`/`ContextAfter`/`ClipBefore`/`ClipAfter` with contiguous line ranges. Refactor overlap dedup logic from `server/api.go:160-187` into a merge function producing `[]LineRange`. Each range is a sequence of consecutive lines, some with match bounds.

### Files

| Status | Action | File | Notes |
|--------|--------|------|-------|
| Done | Create | `server/jsonapi.go` | `/api/search` handler, JSONL encoding |
| Done | Create | `server/jsonapi_test.go` | Tests for JSONL handler (structure, overlap, caching) |
| Done | Modify | `server/api/types.go` | Add JSONL event types, line range types; keep old types |
| Done | Create | `server/api/types_test.go` | CompactLines marshal/unmarshal round-trip tests |
| Done | Modify | `server/routes.go` | Register `/api/search`, `/raw/` routes |
| Done | Modify | `server/api.go` | `mergeLineResults`, `applyQueryDefaults` |
| Done | Create | `server/raw.go` | `/raw/` handler (file content + directory listings) |
| Done | Create | `server/raw_test.go` | Tests for raw handler |
| Done | Modify | `codesearch/index/read.go` | Fix `Names()` for empty prefix (root dir listing) |
| Done | Modify | `csbackend.go` | Ordered streaming: per-repo channels, sorted drain |

### Implementation notes

- `extractQuery` handles all params: `q`, `repo`, `fold_case`, `literal`, `context`, `max`, `f.repo`, `f.ext`, `f.path`.
- Search uses per-repo channels drained in sorted order. All repos search concurrently with shared parallelism semaphore. Within each repo, results sorted by file path.
- Search is currently batch-then-serialize per repo (not truly streaming to client). True HTTP streaming can be added by writing JSONL events as each repo drains.
- `SearchIndex.Data()` returns `""` for both missing files and empty files — document this limitation or change the interface later.

### Verify
- [x] `go test ./...` — all tests pass, existing tests unchanged
- [x] `curl /api/search?q=hello` returns valid JSONL
- [x] `curl /raw/repo/ver/+/file.go` returns file bytes with immutable cache headers
- [x] `curl /raw/repo/ver/+/dir/` returns JSON directory listing
- [x] Existing templ frontend still works unchanged

---

## Phase 1: Client Infrastructure

**Status**: Complete. All infrastructure modules implemented with tests and 100% coverage.

Routing, state, API client, query parser, SPA shell. No visible UI yet — just the skeleton.

### Query parsing

Client-side query parsing is core — facets modify query operators, so the client must understand query structure. A query builder in `web/query.ts`:
- Parses raw text into operators (`file:`, `-file:`, `repo:`, `-repo:`) and the main regex term. Non-operator text must be contiguous (single regex expression).
- Combines with toggle state (case, literal) → structured API params.
- Pure function: `(rawText, {case, literal}) → {q, file, repo, ...}`.
- Operators extracted from query text go as `file=`, `repo=` etc. Facet clicks go as `f.ext=`, `f.repo=`. Both sent independently.

### URL & history management

- URL is sole source of truth; `@lit-labs/signals` for reactive state, bidirectional sync with URL params.
- First keystroke after idle → `pushState` (creates back-button target). Subsequent keystrokes within debounce → `replaceState` (update in place). Back button always returns to previous stable query.
- Debounce ~100ms. `AbortController` cancels in-flight requests on new input.

### SPA shell

Go handler serves minimal HTML page that loads `app.js`. Embeds init data. Uses Go `html/template` (not templ). Wired up in Phase 1 so Phase 2 components can run against a real server immediately.

### Files

| Status | Action | File | Notes |
|--------|--------|------|-------|
| Done | Create | `web/query.ts` | Query parser + builder: raw text + options → API params |
| Done | Create | `web/query.test.ts` | 30 test cases ported from Go parser for parity |
| Done | Create | `web/api.ts` | `fetch`-based JSONL streaming client with AbortController |
| Done | Create | `web/api.test.ts` | JSONL parsing, chunking, compact lines format |
| Done | Create | `web/router.ts` | Regex-based routing, exports current-route signal |
| Done | Create | `web/router.test.ts` | URL → route matching |
| Done | Create | `web/state.ts` | Signals for search state, debounced search trigger |
| Done | Create | `web/app.ts` | `<cs-app>` shell: router dispatch → placeholder views |
| Done | Create | `server/spa.go` | SPA shell handler (Go `html/template`) at `/new/{path...}` |
| Done | Modify | `web/build.mjs` | Add `app.ts` entry point |

### Design notes
- Three routes: `/search`, `/view/{path...}`, `/about`
- `fetch()` + `ReadableStream` for JSONL streaming (not EventSource)
- SPA served at `/new/` prefix during parallel serving period
- `state.test.ts` deferred — state integrates with DOM/fetch, better tested via integration

### Verify
- [x] `bun run test` — 77 tests pass, 100% coverage on all new modules
- [ ] Dev server: `go tool goreman start`, verify SPA shell loads at `/new/`

---

## Phase 2: Search View

**Status**: Complete. All search components implemented and wired to state/API layer.

Build the search UI as Lit components consuming the JSONL API. One component at a time, tested in isolation, then integrated.

### Component tree

```
<cs-app>
  <cs-search-view>
    <cs-search-input>       query box with debounce + regex error
    <cs-search-options>     case/literal toggles (rewrite q via (?i), \Q..\E)
    <cs-repo-select>        pre-filter, maps to f.repo facet
    <cs-result-stats>       "42 results in 15ms"
    <cs-facet-panel>        multi-dimensional (ext, repo, path), additive, OR within
    <cs-file-results>       filename matches (reuses <filename-match>)
    <cs-code-results>       virtualized list of file match groups
      <cs-result-group>     one file's matches (header + ranges)
        <cs-match-range>    contiguous lines with match highlights
    <cs-search-help>        shown when no query
```

### Execution order

1. `<cs-search-input>` + `<cs-search-options>` — input controls, testable without results
2. `<cs-result-group>` + `<cs-match-range>` — render single file matches from test data
3. `<cs-result-stats>` — trivial
4. `<cs-facet-panel>` — multi-dimensional, additive selection, OR within dimension
5. `<cs-search-view>` — wires everything together
6. Integration: connect to live API, adjust

### Files

| Action | File | Notes |
|--------|------|-------|
| Create | `web/views/search-view.ts` | Orchestrates form + results |
| Create | `web/views/search-help.ts` | Help text (port from `search.templ` Help()) |
| Create | `web/components/search-input.ts` | Debounced input |
| Create | `web/components/search-options.ts` | Case/literal toggles → query rewrites |
| Create | `web/components/result-group.ts` | File header + match ranges |
| Create | `web/components/match-range.ts` | Contiguous lines with highlights |
| Create | `web/components/facet-panel.ts` | Multi-dimensional facets, additive selection |
| Create | `web/components/result-stats.ts` | Count + timing |
| Modify | `web/repo-select.ts` | Read repos from init data signal, maps to `f.repo`, remove HTMX dependency |
| Keep | `web/components.ts` | `<match-str>`, `<filename-match>`, `<match-line>` reused as-is |

### Reuse
- `<match-str>`, `<filename-match>`, `<match-line>` — already pure Lit, no changes
- `<repo-select>` — evolve: read from init data signal, remove HTMX trigger. Pre-filter role maps to `f.repo` facet. May merge into facet panel or stay as separate dropdown — decide during implementation.

### Search-as-you-type flow

1. User types → 100ms debounce → query builder produces API params
2. First keystroke: `pushState`; subsequent: `replaceState`
3. `fetch()` streams JSONL with AbortController (cancels previous)
4. JSONL events incrementally update results, facets, stats signals
5. `<cs-search-view>` re-renders reactively
6. `@lit-labs/virtualizer` lazy-renders only visible result groups

### Verify
- `bun run test` — component tests + golden snapshots
- Dev server: `go tool goreman start`
- Playwright MCP: visual verification of search flow

---

## Phase 3: File View

**Status**: Complete (plain text). Components built without syntax highlighting. Tree-sitter WASM deferred.

Build file view components without syntax highlighting first. Add tree-sitter WASM as a separate step after the plain-text view works.

### Component tree

```
<cs-file-view>
  <cs-breadcrumbs>          path navigation
  <cs-dir-listing>          directory entries (if dir)
  <cs-code-viewer>          file content with line numbers + line selection
  <cs-help-modal>           keyboard shortcuts overlay
```

Keep file view and search snippet components separate — different contexts (full document vs snippet), different highlighting needs.

### Files

| Action | File | Notes |
|--------|------|-------|
| Create | `web/views/file-view.ts` | Fetches from `/raw/`, renders content or listing |
| Create | `web/components/code-viewer.ts` | Line numbers + code + line selection (plain text first) |
| Create | `web/components/dir-listing.ts` | Directory entries |
| Create | `web/components/breadcrumbs.ts` | Path navigation links |
| Create | `web/components/help-modal.ts` | Keyboard shortcut overlay |
| Create | `web/highlight.ts` | Tree-sitter WASM: grammar loading, highlighting, caching (separate step) |

### Port from existing `fileview.ts`
- Line range highlighting via URL hash (#L1-L5)
- Shift+click range expansion
- Keyboard shortcuts: `/` search, `?` help, `v` external link, `n/p` find next/prev

### Tree-sitter strategy (separate step)
- Render plain text immediately; highlight async as grammar loads
- Load grammars on demand by file extension (~50-200KB WASM each)
- CSS variables for token colors, matching existing `--color-syntax-*`
- Prototype early to derisk — can arborium highlight a Go file in <200ms? Do WASM grammars work in shadow DOM?
- Fallback: keep server-side chroma behind `/raw/` with a query param

### Verify
- `bun run test` — component tests
- Playwright MCP: navigate to file view, verify line selection, keyboard shortcuts, directory navigation

---

## Phase 4: Cleanup & Polish

**Status**: In progress. SPA serves all routes. Shadow DOM migration done. Facet pills done. Feature parity gaps identified.

Each item is independent — one at a time, each a separate commit. No big batch.

### Completed
- [x] SPA serves `/search`, `/view/`, `/about` (replaces old handlers)
- [x] Shadow DOM migration — all components use Lit best practices
- [x] Shared styles module (`web/shared-styles.ts`)
- [x] Facet pill panel with extension + repo filters via `f.ext`/`f.repo` params
- [x] MaxMatches enforcement fixed
- [x] Embedded init data (`window.__CS_INIT` with repo list)

### Feature parity gaps (see `specs/feature-parity.md` for full comparison)

**Search page:**
- [ ] Page title updates with query ("query · code search") — #23
- [ ] Path/directory prefix facet in backend — #21
- [ ] Facet re-filtering: clicking a facet removes other options (known UX issue, defer)

**File view:**
- [ ] Syntax highlighting (tree-sitter WASM or server-side fallback) — #29
- [ ] Keyboard shortcuts (/, ?, v, n/p, Enter, Escape) — #24
- [ ] External source links (GitHub URL generation) — #25
- [ ] Help modal overlay — #26
- [ ] Text selection actions (search selected, next/prev match) — #27
- [ ] README detection in directory listings — #28
- [ ] Scroll-to-line behavior (1/3 viewport positioning)

**Other:**
- [ ] About page content — #30
- [ ] Component responsibility refactoring — #19

### Remove old frontend (after parity achieved)
- Delete: `web/codesearch_ui.tsx`, `web/fileview.ts`, `web/codesearch_ui.test.ts`
- Delete: `server/views/` (all templ files), `server/searchview.go`
- Delete: `server/chroma/`, `server/gencss/`, `web/syntax-light.css`, `web/syntax-dark.css`
- Remove deps: `htmx.org` from package.json, `chroma` and `templ` from go.mod

### Future polish (post-parity)
- PWA manifest (`manifest.json`: app name, icons, `display: standalone`). No service worker.
- Code splitting: lazy-load file view, tree-sitter grammars
- Theme adjustment (softer/less-bright, system7/win2k-ish)
- Accessibility: ARIA roles on custom components

---

## Architecture Decisions (made during implementation)

- **Shadow DOM** for all Lit components (Lit best practice). Shared styles via `web/shared-styles.ts`.
- **Light DOM** only for `createRenderRoot` — removed; not used anymore.
- **JSONL streaming** (not SSE) — simpler, works with `fetch()` + `ReadableStream`.
- **Batch signal updates** — results collected during stream, set once on done event. Avoids render thrashing.
- **Ordered streaming** — per-repo channels drained in sorted order. Deterministic output.
- **esbuild tree-shaking** — side-effect imports of Lit components get dropped. Must re-export (`export {Class} from '...'`).
- **Facets use URL params** (`f.ext`, `f.repo`, `f.path`) not query text munging.

## Risk Areas

1. **Tree-sitter WASM** (highest risk) — new territory. Prototype early. Fallback: keep server-side chroma.

2. **Virtual scrolling** — `@lit-labs/virtualizer` with variable-height result groups. Test with 500+ groups.

3. **Query parser parity** — TS parser must handle the same operator syntax as `server/query.go`. Test cases ported from Go for parity.

## Testing

- Custom test harness (Playwright + V8 coverage). `@web/test-runner` was tried and rejected.
- Build and test one component at a time, then integrate.
- Playwright MCP for visual verification during development.
- Every feature needs at least one test case.
