# Feature Parity: Old Frontend vs New SPA

Retro-spec of the old templ/HTMX frontend features, compared against the new Lit SPA.
Keep this up to date as gaps are closed.

## Search Page

### Search Input & Query
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Query box with debounce (100ms) | HTMX hx-trigger delay:100ms | triggerSearch debounce | Done |
| Autofocus on load | autofocus attribute | autofocus attribute | Done |
| Autocomplete/spellcheck disabled | HTML attributes | HTML attributes | Done |
| Incremental search attribute | incremental on input | Not needed (JS debounce) | Done |
| Regex error display | #regex-error out-of-band | error prop on search-input | Done |

### Search Options
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Case: match/auto/ignore radios | fold_case param | fold_case param | Done |
| Literal checkbox | literal param | literal param | Done |
| Repository multi-select dropdown | repo-select wrapping select | repo-select from __CS_INIT | Done |
| Query syntax hint (path:, -path:, ...) | .query-hint div | Inside cs-search-input | Done |

### Results Display
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Result count ("N matches" / "N+ matches") | #numresults + HasMore | cs-result-stats | Done |
| Query timing ("in Nms") | #searchtime | cs-result-stats | Done |
| Count right-aligned | #countarea text-align:right | Shadow DOM styles | Done |
| Extension filter buttons | filter-button (top 5) | cs-facet-panel pills | Done |
| Extension filter uses facet params | Munged query text | f.ext URL param | Done |
| Repository facet pills | Not in old UI | cs-facet-panel | New feature |
| Path/directory facet pills | Not in old UI | Planned | Gap (#21) |
| Filename results (limited to 10) | limitedFileResults | limitedFileResults signal | Done |
| File group headers (repo:ver:dir/file) | .file-group .header | cs-result-group | Done |
| Match highlighting (yellow bg) | match-str component | match-str component | Done |
| Context lines (configurable) | ContextLines param | context URL param | Done |
| Context overlap dedup | ClipBefore/ClipAfter | mergeLineResults groups | Done |
| No-context mode (context=0) | .no-context CSS class | no-context attribute | Done |
| Progressive SSE rendering (chunks of 10) | SSE data: events | Batch on done (not streaming) | Different |

### Page Chrome
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Page title updates with query | "query · code search" | "query · code search" | Done |
| Footer (search/about/source links) | footer#header | Shadow DOM footer | Done |
| Feedback mailto link (configurable) | Templates.Feedback.MailTo | Not implemented | Gap (minor) |
| Custom header/footer HTML (config) | Templates.HeaderHTML/FooterHTML | Not implemented | Gap (minor) |
| OpenSearch XML | /opensearch.xml | /opensearch.xml (server) | Done |
| Favicon | favicon.ico + PNGs | favicon links in SPA shell | Done |

### Browser Integration
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| URL is source of truth | HTMX hx-push-url | Router signals + pushState | Done |
| Back/forward navigation | HTMX + SSE history hack | popstate handler | Done |
| History entries show query | SSE first-message history | pushState (no title) | Gap (#23) |
| Safari bfcache workaround | pageshow + reload | Not implemented | Gap (minor) |
| Browser HTTP cache (backspace) | Cache-Control: max-age=30 | Cache-Control: max-age=30 | Done |

### Search-as-you-type Flow
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Debounce input (100ms) | HTMX delay:100ms | setTimeout 100ms | Done |
| Cancel in-flight on new input | HTMX hx-sync:queue last | AbortController | Done |
| Auto-search on page load with q= | HTMX load trigger | executeSearch on init | Done |

## File View Page

### Navigation
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Breadcrumb path navigation | fileHeader template | cs-breadcrumbs | Done |
| Each segment clickable | viewPath links | href links | Done |

### File Content
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Syntax highlighting | Server-side chroma | Plain text only | Gap (#29) |
| Line numbers | Chroma-generated | cs-code-viewer | Done |
| Line selection via hash (#L5) | fileview.ts hash parsing | cs-code-viewer hash parsing | Done |
| Line range selection (#L5-L10) | fileview.ts | cs-code-viewer | Done |
| Shift+click range expansion | fileview.ts | cs-code-viewer | Done |
| Scroll to selected line (1/3 viewport) | fileview.ts scrollBehavior | Not implemented | Gap |
| External source link (GitHub) | data-href-template + v key | Not implemented | Gap (#25) |

### Keyboard Shortcuts
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| `/` — new search | fileview.ts | Not implemented | Gap (#24) |
| `?` — help modal | fileview.ts | Not implemented | Gap (#24, #26) |
| `v` — view at external source | fileview.ts | Not implemented | Gap (#24, #25) |
| `n` — next match (window.find) | fileview.ts | Not implemented | Gap (#24) |
| `p` — previous match | fileview.ts | Not implemented | Gap (#24) |
| `Enter` — search selected in new tab | fileview.ts | Not implemented | Gap (#24) |
| `Escape` — close help | fileview.ts | Not implemented | Gap (#24, #26) |

### Text Selection
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Detect text selection | fileview.ts selectionchange | Not implemented | Gap (#27) |
| Show contextual actions | .with-selection header | Not implemented | Gap (#27) |
| Search selected text | / key with selection | Not implemented | Gap (#27) |

### Directory Listing
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Sorted entries (dirs first) | DirListingSort | cs-dir-listing sort | Done |
| Directory entries with trailing / | viewURL + "/" | Entry names from /raw/ | Done |
| README detection + rendering | supportedReadmeRegex | Not implemented | Gap (#28) |
| Symlink display | Not fully implemented | Not implemented | N/A |

### Help Modal
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Modal overlay | u-modal-overlay classes | Not implemented | Gap (#26) |
| Keyboard shortcut list | helpModal template | Not implemented | Gap (#26) |
| Dismiss on outside click | fileview.ts | Not implemented | Gap (#26) |

## About Page
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Content about livegrep/codesearch | about.templ | Placeholder text | Gap (#30) |

## Performance
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Progressive rendering (SSE chunks) | 10 results per event | Batch all on done | Different approach |
| Request cancellation | HTMX queue:last | AbortController | Done |
| Immutable file caching (/raw/) | max-age=31536000 | max-age=31536000 | Done |
| HTTP compression | Middleware | Middleware | Done |
| Transitions disabled | htmx.config.transitions | N/A (no transitions) | Done |

## Theme & Styling
| Feature | Old | New | Status |
|---------|-----|-----|--------|
| Light theme (default) | CSS custom properties | CSS custom properties | Done |
| Dark theme (prefers-color-scheme) | @media dark | @media dark | Done |
| Syntax highlighting colors | --color-syntax-* | Not used yet (no highlighting) | Gap (#29) |
