// Copyright 2011-2013 Nelson Elhage
// SPDX-License-Identifier: BSD-2-Clause

package server

import (
	"net/url"
	"sync"
	"time"

	"sgrankin.dev/cs/csapi"
	"sgrankin.dev/cs/csbackend"
)

type Tree struct {
	Name    string
	Version string
	Url     string
}

type I struct {
	Name  string
	Trees []Tree
	sync.Mutex
	IndexTime time.Time
}

type Backend struct {
	Id         string
	I          *I
	Codesearch csapi.CodeSearch
}

func NewBackend(id string) (*Backend, error) {
	bk := &Backend{
		Id:         id,
		I:          &I{Name: id},
		Codesearch: csbackend.New(), // TODO XXX
	}
	return bk, nil
}

func (bk *Backend) Start() {
	if bk.I == nil {
		bk.I = &I{Name: bk.Id}
	}
}

func (bk *Backend) refresh(info *csapi.ServerInfo) {
	bk.I.Lock()
	defer bk.I.Unlock()

	if info.Name != "" {
		bk.I.Name = info.Name
	}
	bk.I.IndexTime = time.Unix(info.IndexTime, 0)
	if len(info.Trees) > 0 {
		bk.I.Trees = nil
		for _, r := range info.Trees {
			pattern := r.Metadata.URLPattern
			if v := r.Metadata.Github; v != "" {
				value := v
				base := ""
				_, err := url.ParseRequestURI(value)
				if err != nil {
					base = "https://github.com/" + value
				} else {
					base = value
				}
				pattern = base + "/blob/{version}/{path}#L{lno}"
			}
			bk.I.Trees = append(bk.I.Trees,
				Tree{r.Name, r.Version, pattern})
		}
	}
}
