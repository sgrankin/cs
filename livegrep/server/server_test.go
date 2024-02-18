// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"testing"

	"sgrankin.dev/cs"
)

func TestTemplatesLoad(t *testing.T) {
	srv := server{config: cs.ServeConfig{}}
	srv.loadTemplates()
}
