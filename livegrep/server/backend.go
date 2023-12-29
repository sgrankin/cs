package server

import (
	"context"
	"net/url"
	"sync"
	"time"

	"google.golang.org/grpc"
)

type Tree struct {
	Name    string
	Version string
	Url     string
}

type ServerInfo struct {
	Name  string
	Trees []struct {
		Name, Version string
		Metadata      struct {
			URLPattern, Remote, Github string

			Labels string
		}
	}
	HasTags   bool
	IndexTime int64
}

type CodeSearch interface {
	Info(context.Context) (*ServerInfo, error)
	Search(context.Context, Query) (*CodeSearchResult, error)
}

type I struct {
	Name  string
	Trees []Tree
	sync.Mutex
	IndexTime time.Time
}

type Backend struct {
	Id         string
	Addr       string
	I          *I
	Codesearch CodeSearch
}

func NewBackend(id string, addr string, extraOpts ...grpc.DialOption) (*Backend, error) {
	dialOpts := []grpc.DialOption{grpc.WithInsecure()}
	dialOpts = append(dialOpts, extraOpts...)
	bk := &Backend{
		Id:         id,
		Addr:       addr,
		I:          &I{Name: id},
		Codesearch: nil, // TODO XXX
	}
	return bk, nil
}

func (bk *Backend) Start() {
	if bk.I == nil {
		bk.I = &I{Name: bk.Id}
	}
}

func (bk *Backend) refresh(info *ServerInfo) {
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
