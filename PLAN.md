# Planned Work

## Bugs

- [ ] Stabilize search output in lexical order (block on long-pole)
- [ ] Add spinner for slow initial search (paging-in feels like a hang)
- [ ] Run git GC periodically
- [ ] Clicking filter buttons should always set history (vs debouncing search-as-you-type)
- [ ] Thin line separator should only separate non-consecutive lines when context is off; otherwise only thick separator between sequences

## Search & Indexing

- [ ] Support other repo sources beyond GitHub (+ corresponding external link formats)
- [ ] Webhook-triggered repo updates (avoid waiting for poll reindex)
- [ ] Add benchmarking code for index & search
- [ ] Add index & search CLI tools for manual usage
- [ ] Port 64-bit index changes from upstream codesearch

## Frontend Rewrite

Goal: low-dependency PWA replacing the current Lit+HTMX+jQuery+Bootstrap stack.

### Drop
- HTMX, jQuery, Bootstrap, bootstrap-select, templ (for frontend pages)
- Server-side syntax highlighting (chroma) — move to client

### Keep / Add
- **Lit** web components + `@lit-labs/signals` for reactivity
- **`@lit-labs/virtualizer`** for large result lists and repo selector
- **arborium** (tree-sitter WASM) for client-side syntax highlighting
  - Progressive enhancement: render plain text immediately, highlight async as grammars load
  - Enables highlighting in search result snippets (not just file view)
- **esbuild** for bundling
- **PWA**: service worker for static asset caching + app shell

### Architecture

**Server**: JSON API + static file serving. Initial HTML shell via Go `html/template` (not templ).

**API** (new, clean):
- `GET /api/search` — SSE stream of result batches (JSON)
- `GET /api/file` — file content (plain text)
- `GET /api/paths` — directory listing
- `GET /api/repos` — available repos + metadata
- Redesign result format: return contiguous line ranges (not per-match with overlapping context). Server deduplicates and merges context before sending.

**Client-side query parsing**:
- Client parses structured operators (`repo:`, `path:`, `file:`, `ext:`, case/literal toggles)
- Client sends structured query to API: `{line: "regex", repo: [...], path: [...], ...}`
- Server always receives clean structured queries with regexes
- Keeps the "simple text box with power syntax" UX

**State**:
- URL is source of truth for all search state
- `@lit-labs/signals` for reactive state, bidirectional sync with URL params
- Defaults: regex on, smart case. No saved preferences.

**Search-as-you-type**:
- Client-side debouncing (~100ms)
- AbortController cancels in-flight requests on new input
- Server uses context cancellation to stop work immediately
- SSE streaming: results appear incrementally as they arrive

**Pages** (client-side routing, no framework — `URLPattern` or simple matcher):
- Search view: query input, facet sidebar, streaming results
- File view: breadcrumbs, syntax-highlighted code, line selection
- About

**Keyboard shortcuts**: focus search, navigate results, open file, etc. Keyboard-first UX.

**Accessibility**: ARIA roles on custom components (facets, result navigation, dropdowns).

**Theme**: Light theme default (system7/win2k-ish, low contrast, easy on astigmatism). Dark theme via `prefers-color-scheme`, find one that's similarly not terrible. Syntax theme follows app theme.

**Code splitting**: esbuild, two entry points (search view, file view) sharing common Lit code.

**SSE resilience**: Show partial results + "incomplete" indicator on disconnect. Next keystroke retries anyway.

**OpenSearch**: Keep `opensearch.xml` for browser address bar integration.

### Key Components

**Result list**:
- Virtualized for large result sets
- Contiguous line ranges with match highlighting
- Facet sidebar that modifies query

**Facets**:
- Server returns facet counts for: repo, org, path prefix, file extension
- Top N values with counts per facet
- Click to add filter to query, shift-click to exclude
- Facet keys map to query operators (`repo:`, `org:`, `path:`, `ext:`)
- Repo/org facets can replace the dedicated repo multi-select — faceted navigation
  is more discoverable and composes better with other filters

### Suggested Build Order
1. API types & endpoints (the contract)
2. Search view (query input, streaming results, facets)
3. File view (breadcrumbs, code display, line selection)
4. Polish (themes, PWA, code splitting, keyboard shortcuts)

## Features

- [ ] Repo groups: per-user named filter shortcuts (e.g. "Go repos", "Project X")
  - Stored in localStorage, applied as query filters, shareable via URL
- [ ] Per-user repo access control: restrict visible repos based on user identity
  - Identity from HTTP header (auth proxy), config maps users/groups to repo sets

## Tooling

- [ ] Factor out shared Claude Code skills for Go style and Go testing (including coverage script)
  - Reusable across projects (cs, mk, etc.) — move to ~/.claude/skills/

## Build & Infra

- [ ] Compress static assets at build time (not runtime)
- [ ] Precalculate hashes for etags
- [ ] Remove unused API abstraction layer
- [ ] Simplify logger (avoid double-logging timestamps)
- [ ] Consider using go-getter for repo syncing
- [ ] Metrics/observability
