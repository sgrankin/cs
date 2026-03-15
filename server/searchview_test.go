// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"testing"

	"sgrankin.dev/cs"
)

func TestPageTitle(t *testing.T) {
	tests := []struct {
		name string
		q    cs.Query
		want string
	}{
		{"empty query", cs.Query{}, "code search"},
		{"with line", cs.Query{Line: "hello"}, "hello · code search"},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := pageTitle(tc.q)
			if got != tc.want {
				t.Errorf("pageTitle(%v) = %q, want %q", tc.q, got, tc.want)
			}
		})
	}
}

func TestMakeSearchScriptData(t *testing.T) {
	idx := newTestIndex(t,
		testTree{"repo1", "aabbcc", "simple.txtar"},
		testTree{"repo2", "ddeeff", "simple.txtar"},
	)
	srv := newTestServer(idx)

	bk, sampleRepo := srv.makeSearchScriptData()
	if bk != idx {
		t.Error("backend should match")
	}
	if sampleRepo != "repo1" && sampleRepo != "repo2" {
		t.Errorf("sampleRepo = %q, want %q or %q", sampleRepo, "repo1", "repo2")
	}
}

func TestMakeSearchScriptDataNoTrees(t *testing.T) {
	idx := newTestIndex(t) // no trees at all
	srv := newTestServer(idx)

	_, sampleRepo := srv.makeSearchScriptData()
	if sampleRepo != "" {
		t.Errorf("sampleRepo = %q, want empty", sampleRepo)
	}
}
