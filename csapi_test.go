package cs

import "testing"

func TestFileLess(t *testing.T) {
	tests := []struct {
		name string
		a, b File
		want bool
	}{
		{
			name: "less by tree",
			a:    File{Tree: "a", Version: "1", Path: "x"},
			b:    File{Tree: "b", Version: "1", Path: "x"},
			want: true,
		},
		{
			name: "greater by tree",
			a:    File{Tree: "b", Version: "1", Path: "x"},
			b:    File{Tree: "a", Version: "1", Path: "x"},
			want: false,
		},
		{
			name: "same tree less by path",
			a:    File{Tree: "r", Version: "1", Path: "a.go"},
			b:    File{Tree: "r", Version: "1", Path: "b.go"},
			want: true,
		},
		{
			name: "same tree greater by path",
			a:    File{Tree: "r", Version: "1", Path: "b.go"},
			b:    File{Tree: "r", Version: "1", Path: "a.go"},
			want: false,
		},
		{
			name: "same tree and path less by version",
			a:    File{Tree: "r", Version: "1", Path: "f"},
			b:    File{Tree: "r", Version: "2", Path: "f"},
			want: true,
		},
		{
			name: "same tree and path greater by version",
			a:    File{Tree: "r", Version: "2", Path: "f"},
			b:    File{Tree: "r", Version: "1", Path: "f"},
			want: false,
		},
		{
			name: "equal",
			a:    File{Tree: "r", Version: "1", Path: "f"},
			b:    File{Tree: "r", Version: "1", Path: "f"},
			want: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := tt.a.Less(tt.b); got != tt.want {
				t.Errorf("File%+v.Less(File%+v) = %v, want %v", tt.a, tt.b, got, tt.want)
			}
		})
	}
}

func TestExitReasonString(t *testing.T) {
	tests := []struct {
		reason ExitReason
		want   string
	}{
		{ExitReasonNone, "NONE"},
		{ExitReasonTimeout, "TIMEOUT"},
		{ExitReasonMatchLimit, "MATCH_LIMIT"},
		{ExitReason("CUSTOM"), "CUSTOM"},
	}
	for _, tt := range tests {
		t.Run(tt.want, func(t *testing.T) {
			if got := tt.reason.String(); got != tt.want {
				t.Errorf("ExitReason(%q).String() = %q, want %q", string(tt.reason), got, tt.want)
			}
		})
	}
}
