// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"sgrankin.dev/cs/csapi"
	"sgrankin.dev/cs/csbackend"
)

type Backend struct {
	csapi.CodeSearch
	ID string
}

// TODO: why separate backend and CodeSearch?  Why double cache name, etc?
func NewBackend(id, path string) (*Backend, error) {
	bk := &Backend{
		CodeSearch: csbackend.New(path),
		ID:         id,
	}
	return bk, nil
}
