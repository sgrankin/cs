package cs

import (
	"flag"
	"os"
	"path"
	"strings"
)

// EnvString is a flag.Value that expands environment variables when fetched.
type EnvString string

func (s *EnvString) Set(val string) error {
	*s = EnvString(val)
	return nil
}
func (s *EnvString) Get() string {
	return os.ExpandEnv(string(*s))
}
func (s *EnvString) String() string { return (string)(*s) }

// StringSet is a flag.Value that holds many strings.
type StringSet map[string]bool

func (s *StringSet) Set(val string) error {
	val = path.Clean(val)
	(*s)[val] = true
	return nil
}
func (s *StringSet) String() string {
	var paths []string
	for p := range *s {
		paths = append(paths, p)
	}
	return strings.Join(paths, ",")
}

// FlagVar is equivalent to flag.Var, but handles allocation of the named type.
func FlagVar[T any, PT interface {
	flag.Value
	*T
}](name string, value T, usage string) PT {
	pv := (PT)(&value)
	flag.Var(pv, name, usage)
	return pv
}

// FlagFunc is equivalent to flag.Func, but handles allocation of the named type and passing it to the func.
func FlagFunc[T any, PT interface{ *T }](name string, value T, f func(PT, string) error, usage string) PT {
	pv := (PT)(&value)
	flag.Func(name, usage, func(s string) error { return f(pv, s) })
	return pv
}
