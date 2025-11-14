# cs -- codesearch

This tool is a port of the [livegrep] web UI onto a backend powered by rsc's [codesearch] tool.

[livegrep]: https://github.com/livegrep/livegrep
[codesearch]: https://github.com/google/codesearch

## But why?

Livegrep is great: you get fast (almost realtime) search results over all off your company's codebase using regexes.
The interface is simple, dense, and gets out of your way.

Alas, the backend indexing code has gotter rather large,
somewhat hard to follow if you're (like me) trying to figure out how to do a few surgical fixes.
The build is also somewhat hard to update (if e.g. you want to upgrade Go :)) due to Bazel & various rules being a few versions behind.

CS keeps the livegrep Go+JS front end, but uses it so wrap a modified version of codesearch.

### Notable differences with livegrep.

- Backend is only Go. Easyer to update.
- Codesearch-based index that stores all of the blobs for fast access.
- Smaller indexes, leading to faster (initial?) searches due to lower memory requirement.
- GitHub sync & indexing built into the server process: only one always-on process to manage.

### Updates to codesearch.

Storing blobs:
Codesearch works by creating an tri-gram index over the inputs.
At search time, the index is used to locate the files to search, but then a regex search is run over the files themselves.
This proved slower than necessary: when opening the files, syscalls showed up as a bottleneck.
Even when using some other interface, e.g. pulling blobs from packed git files, or a sqlite DB, syscalls continued being in the way.
CS modifies the index format to store the indexed blobs as well.
At search time, they are mmap'd into memory the DFA-based regex run over them.

Return matched range:
Codesearch implements grep by using the DFA-based regex to find a match,
then finding the line boundaries, and writing out the whole line.
It has no need of tracking where in the line the match is.
CS updates the regex code to stop at the end of the match (instead of the end of the line),
reverses the regex, and runs it backward to find the beginning of the match.

### Updates to livegrep's UI.

- Various tracking integrations have been removed (google analytics, sentry).
- Code updated to typescript--mostly to enable auto completion and some error detection,
  but also to strategically annotate some types to help with changes.
- All libraries updated as much as is relevant.
- Code highlighting library replaced.
- All libraries are bundled and served as a blob of JS relevant for the page.
  No more external CDN necessary. Esbuild is the bundler, run via `go generate`.

## Usage

- `go install sgrankin.dev/cs/cmd/csweb@latest`
- Create a config file (see below).
- Run using your favorite init system. `~/go/bin/csweb -listen=localhost:8910 -config=config.yaml -rebuild-interval=30m`
- Set the `GITHUB_TOKEN` environment variable to a valid GitHub token to increase API rate limit & see private repos.

### Config

```
index:  # Multiple indexes are possible if you want to keep things separate.
  path: /var/lib/codesearch  # Path to a directory with permissions.
  reposources:  # Sources of git repos.
    github:  # Only github is implemented.
      - org: "golang"  # All repos from an org.
      - user: "me"  # All repos from a user.
      - repo: "golang/go"  # A single repo.
```

See [config.go](config.go) for other fields, including how to specify raw repos and all of the livegrep UI options.

### Index directory

There are a few things in the index directory. You will need to allocate enough space for:

- The actual index.
- A temp copy of the index that's built on reindex.
- A git repository that _all_ of the remote repos are fetched into during indexing.
  The fetch is incremental, but the repo is never GC'd due to limits in [go-git].
  You may want to run `go maintenance` on this repo.

## Hacking

### Building

- `go generate ./...` when updating web assets.
- `go run ./cmd/csweb` to run locally.

### Wishlist (maybe?)

- Trigger repo updates on webhook push (so that you don't have to wait for a poll reindex).
- Incremental updates where just the updated repo is rebuilt.
  Codesearch supports an index merge, so it would be easy to cache an index per repo and then merge them all whenever a component is updated.
  This was a motivation for replacing the backend... but practice, CS is faster than livegerp indexing, so this no longer seems necessary.
- Cleanup: simplify the logger used to not double log time, etc.
- Metrics, maybe, so than you know when something broke.
