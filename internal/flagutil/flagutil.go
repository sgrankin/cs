package flagutil

import (
	"flag"
	"path"
	"strings"
)

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

func Var[T any, PT interface {
	flag.Value
	*T
}](name string, value T, usage string) PT {
	v := value
	pv := (PT)(&v)
	flag.Var(pv, name, usage)
	return pv
}
