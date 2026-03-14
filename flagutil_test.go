// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

package cs

import (
	"flag"
	"testing"
)

func TestEnvStringSet(t *testing.T) {
	var s EnvString
	if err := s.Set("hello"); err != nil {
		t.Fatalf("Set returned error: %v", err)
	}
	if got := s.String(); got != "hello" {
		t.Errorf("String() = %q, want %q", got, "hello")
	}
}

func TestEnvStringGet(t *testing.T) {
	t.Setenv("FLAGUTIL_TEST_VAR", "expanded")
	var s EnvString
	s.Set("prefix-${FLAGUTIL_TEST_VAR}-suffix")
	got := s.Get()
	want := "prefix-expanded-suffix"
	if got != want {
		t.Errorf("Get() = %q, want %q", got, want)
	}
}

func TestEnvStringGetNoEnvVar(t *testing.T) {
	var s EnvString
	s.Set("no-env-here")
	if got := s.Get(); got != "no-env-here" {
		t.Errorf("Get() = %q, want %q", got, "no-env-here")
	}
}

func TestFlagVar(t *testing.T) {
	// Reset the default flag set for testing.
	oldCommandLine := flag.CommandLine
	flag.CommandLine = flag.NewFlagSet("test", flag.ContinueOnError)
	defer func() { flag.CommandLine = oldCommandLine }()

	pv := FlagVar("test-flag", EnvString("default"), "a test flag")
	if pv == nil {
		t.Fatal("FlagVar returned nil")
	}
	if got := pv.String(); got != "default" {
		t.Errorf("initial String() = %q, want %q", got, "default")
	}

	// Parse with a new value.
	if err := flag.CommandLine.Parse([]string{"-test-flag", "new-value"}); err != nil {
		t.Fatalf("Parse returned error: %v", err)
	}
	if got := pv.String(); got != "new-value" {
		t.Errorf("after Parse, String() = %q, want %q", got, "new-value")
	}
}

func TestFlagVarWithEnvExpansion(t *testing.T) {
	t.Setenv("FLAGUTIL_TEST_HOME", "/home/test")
	oldCommandLine := flag.CommandLine
	flag.CommandLine = flag.NewFlagSet("test", flag.ContinueOnError)
	defer func() { flag.CommandLine = oldCommandLine }()

	pv := FlagVar("path", EnvString(""), "path flag")
	flag.CommandLine.Parse([]string{"-path", "$FLAGUTIL_TEST_HOME/data"})
	if got := pv.Get(); got != "/home/test/data" {
		t.Errorf("Get() = %q, want %q", got, "/home/test/data")
	}
}
