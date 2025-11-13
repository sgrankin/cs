package cs

import (
	"flag"
	"os"
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

// FlagVar is equivalent to flag.Var, but handles allocation of the named type.
func FlagVar[T any, PT interface {
	flag.Value
	*T
}](name string, value T, usage string) PT {
	pv := (PT)(&value)
	flag.Var(pv, name, usage)
	return pv
}
