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

## UI / Frontend

- [ ] Facet filtering: top N values with `Value (count)`, click to add to query, shift-click to exclude
- [ ] Parse text filters (e.g. `repo:foo`, `ext:go`) as structured facet/filters
- [ ] Frontend rewrite (see below)

## Frontend Rewrite

Current stack: Lit web components + HTMX + jQuery + Bootstrap (inherited from livegrep).

Considerations for a rewrite:
- Preferences as defaults: regex on, smart case. No saved prefs.
- URLs encode all search state (filters, repo group defaults)
- HTMX-first approach vs full client-side framework
- Server-side pre-rendering at build time (e.g. goja)
- Signals for reactivity / global state
- Debouncing for search-as-you-type with proper history management

## Build & Infra

- [ ] Compress static assets at build time (not runtime)
- [ ] Precalculate hashes for etags
- [ ] Remove unused API abstraction layer
- [ ] Simplify logger (avoid double-logging timestamps)
- [ ] Consider using go-getter for repo syncing
- [ ] Metrics/observability
