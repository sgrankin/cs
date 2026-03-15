// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package api

import (
	"encoding/json"
	"testing"
)

func TestCompactLinesMarshalJSON(t *testing.T) {
	tests := []struct {
		name string
		cl   CompactLines
		want string
	}{
		{
			name: "empty",
			cl:   nil,
			want: "[]",
		},
		{
			name: "single context line",
			cl:   CompactLines{{ResultLine{Number: 7, Text: "// context"}}},
			want: `[[7,"// context"]]`,
		},
		{
			name: "match line with bounds",
			cl:   CompactLines{{ResultLine{Number: 8, Text: "func main() {", Bounds: [][2]int{{0, 4}}}}},
			want: `[[8,"func main() {",[[0,4]]]]`,
		},
		{
			name: "multiple bounds on one line",
			cl:   CompactLines{{ResultLine{Number: 1, Text: "aa bb aa", Bounds: [][2]int{{0, 2}, {6, 8}}}}},
			want: `[[1,"aa bb aa",[[0,2],[6,8]]]]`,
		},
		{
			name: "two groups with null separator",
			cl: CompactLines{
				{
					ResultLine{Number: 7, Text: "// context"},
					ResultLine{Number: 8, Text: "func main() {", Bounds: [][2]int{{0, 4}}},
					ResultLine{Number: 9, Text: "}"},
				},
				{
					ResultLine{Number: 25, Text: "func other() {", Bounds: [][2]int{{0, 4}}},
				},
			},
			want: `[[7,"// context"],[8,"func main() {",[[0,4]]],[9,"}"],null,[25,"func other() {",[[0,4]]]]`,
		},
		{
			name: "text with special chars",
			cl:   CompactLines{{ResultLine{Number: 1, Text: `he said "hello" & <bye>`}}},
			want: `[[1,"he said \"hello\" \u0026 \u003cbye\u003e"]]`,
		},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got, err := json.Marshal(tc.cl)
			if err != nil {
				t.Fatal(err)
			}
			if string(got) != tc.want {
				t.Errorf("MarshalJSON:\n  got  %s\n  want %s", got, tc.want)
			}
		})
	}
}

func TestCompactLinesRoundTrip(t *testing.T) {
	tests := []struct {
		name string
		cl   CompactLines
	}{
		{
			name: "single group",
			cl: CompactLines{{
				ResultLine{Number: 7, Text: "// context"},
				ResultLine{Number: 8, Text: "func main() {", Bounds: [][2]int{{0, 4}}},
			}},
		},
		{
			name: "two groups",
			cl: CompactLines{
				{
					ResultLine{Number: 1, Text: "a"},
					ResultLine{Number: 2, Text: "b", Bounds: [][2]int{{0, 1}}},
				},
				{
					ResultLine{Number: 10, Text: "c", Bounds: [][2]int{{0, 1}}},
				},
			},
		},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			data, err := json.Marshal(tc.cl)
			if err != nil {
				t.Fatal(err)
			}
			var got CompactLines
			if err := json.Unmarshal(data, &got); err != nil {
				t.Fatalf("Unmarshal(%s): %v", data, err)
			}
			gotData, _ := json.Marshal(got)
			if string(gotData) != string(data) {
				t.Errorf("round-trip mismatch:\n  original:    %s\n  round-trip:  %s", data, gotData)
			}
		})
	}
}

func TestSearchResultEventJSON(t *testing.T) {
	e := SearchResultEvent{
		Type: "result",
		Path: "org/foo/abc123/+/src/main.go",
		Lines: CompactLines{
			{
				ResultLine{Number: 7, Text: "// context"},
				ResultLine{Number: 8, Text: "func main() {", Bounds: [][2]int{{0, 4}}},
				ResultLine{Number: 9, Text: "}"},
			},
			{
				ResultLine{Number: 25, Text: "func other() {", Bounds: [][2]int{{0, 4}}},
			},
		},
	}
	got, err := json.Marshal(e)
	if err != nil {
		t.Fatal(err)
	}
	want := `{"type":"result","path":"org/foo/abc123/+/src/main.go","lines":[[7,"// context"],[8,"func main() {",[[0,4]]],[9,"}"],null,[25,"func other() {",[[0,4]]]]}`
	if string(got) != want {
		t.Errorf("SearchResultEvent JSON:\n  got  %s\n  want %s", got, want)
	}
}

func TestDoneEventJSON(t *testing.T) {
	e := DoneEvent{Type: "done", TimeMs: 15, Total: 42, Truncated: false}
	got, err := json.Marshal(e)
	if err != nil {
		t.Fatal(err)
	}
	want := `{"type":"done","time_ms":15,"total":42,"truncated":false}`
	if string(got) != want {
		t.Errorf("DoneEvent JSON:\n  got  %s\n  want %s", got, want)
	}
}

func TestCompactLinesUnmarshalErrors(t *testing.T) {
	tests := []struct {
		name  string
		input string
	}{
		{"not array", `"hello"`},
		{"bad element", `[123]`},
		{"too few fields", `[[1]]`},
		{"bad line number", `[["x","text"]]`},
		{"bad text", `[[1, 123]]`},
		{"bad bounds", `[[1,"text","notarray"]]`},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			var cl CompactLines
			if err := json.Unmarshal([]byte(tc.input), &cl); err == nil {
				t.Errorf("expected error for %s, got nil", tc.input)
			}
		})
	}
}

func TestFacetsEventJSON(t *testing.T) {
	e := FacetsEvent{
		Type: "facets",
		Ext:  []FacetBucket{{Value: ".go", Count: 12}},
		Repo: []FacetBucket{{Value: "org/foo", Count: 8}},
	}
	got, err := json.Marshal(e)
	if err != nil {
		t.Fatal(err)
	}
	want := `{"type":"facets","ext":[{"v":".go","c":12}],"repo":[{"v":"org/foo","c":8}]}`
	if string(got) != want {
		t.Errorf("FacetsEvent JSON:\n  got  %s\n  want %s", got, want)
	}
}
