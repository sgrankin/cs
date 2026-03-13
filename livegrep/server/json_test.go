package server

import "testing"

func TestAsJSONString(t *testing.T) {
	tests := []struct {
		name string
		v    any
		want string
	}{
		{"string", "hello", `"hello"`},
		{"int", 42, `42`},
		{"map", map[string]int{"a": 1}, `{"a":1}`},
		{"nil", nil, `null`},
		{"slice", []int{1, 2, 3}, `[1,2,3]`},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := asJSON{tc.v}.String()
			if got != tc.want {
				t.Errorf("asJSON{%v}.String() = %q, want %q", tc.v, got, tc.want)
			}
		})
	}
}

func TestAsJSONPanicsOnUnmarshalable(t *testing.T) {
	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic for unmarshalable value")
		}
	}()
	// Channels cannot be marshaled to JSON.
	got := asJSON{make(chan int)}.String()
	t.Errorf("expected panic, got %q", got)
}
