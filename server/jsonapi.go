// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"sgrankin.dev/cs"
	"sgrankin.dev/cs/server/api"
)

// ServeAPISearch handles GET /api/search, returning JSONL streaming results.
func (s *server) ServeAPISearch(ctx context.Context, w http.ResponseWriter, r *http.Request) {
	q, err := extractQuery(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if q.Line == "" {
		// No query — return just a done event with zero results.
		w.Header().Set("Content-Type", "application/x-ndjson")
		w.Header().Set("Cache-Control", "max-age=30")
		writeJSONLine(w, api.DoneEvent{Type: "done"})
		return
	}
	if q.MaxMatches == 0 {
		q.MaxMatches = s.config.DefaultMaxMatches
	}
	if q.ContextLines == 0 {
		q.ContextLines = 3
	}

	start := time.Now()
	searchResult, err := s.bk.Search(ctx, q)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/x-ndjson")
	w.Header().Set("Cache-Control", "max-age=30")

	total := 0

	// Emit file results.
	for _, fr := range searchResult.FileResults {
		writeJSONLine(w, api.FileMatchEvent{
			Type:  "file",
			Path:  fr.File.Tree + "/" + fr.File.Version + "/+/" + fr.File.Path,
			Match: [2]int{fr.Bounds.Left, fr.Bounds.Right},
		})
		total++
	}

	// Emit code results.
	for _, sr := range searchResult.Results {
		groups := mergeLineResults(sr.Lines)
		writeJSONLine(w, api.SearchResultEvent{
			Type:  "result",
			Path:  sr.File.Tree + "/" + sr.File.Version + "/+/" + sr.File.Path,
			Lines: api.CompactLines(groups),
		})
		total += len(sr.Lines)
	}

	// Emit facets.
	emitFacets(w, searchResult.Facets)

	// Emit done.
	writeJSONLine(w, api.DoneEvent{
		Type:      "done",
		TimeMs:    time.Since(start).Milliseconds(),
		Total:     total,
		Truncated: searchResult.Stats.ExitReason != cs.ExitReasonNone,
	})

	log.Printf("api/search results=%d why=%s time=%dms",
		total, searchResult.Stats.ExitReason, time.Since(start).Milliseconds())
}

// emitFacets converts search engine facets to a FacetsEvent and writes it.
func emitFacets(w http.ResponseWriter, facets []cs.Facet) {
	event := api.FacetsEvent{Type: "facets"}
	for _, f := range facets {
		buckets := make([]api.FacetBucket, len(f.Values))
		for i, v := range f.Values {
			buckets[i] = api.FacetBucket{Value: v.Value, Count: v.Count}
		}
		switch f.Key {
		case "ext":
			event.Ext = buckets
		case "repo":
			event.Repo = buckets
		case "path":
			event.Path = buckets
		}
	}
	if len(event.Ext) > 0 || len(event.Repo) > 0 || len(event.Path) > 0 {
		writeJSONLine(w, event)
	}
}

func writeJSONLine(w http.ResponseWriter, v any) {
	data, err := json.Marshal(v)
	if err != nil {
		log.Printf("jsonapi: marshal error: %v", err)
		return
	}
	fmt.Fprintf(w, "%s\n", data)
	if f, ok := w.(http.Flusher); ok {
		f.Flush()
	}
}
