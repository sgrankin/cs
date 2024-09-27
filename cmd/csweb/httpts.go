// Copyright (c) 2024 David Crawshaw
// SPDX-License-Identifier: BSD-3-Clause

package main

import (
	"context"
	"crypto/tls"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"

	"tailscale.com/client/tailscale"
	"tailscale.com/tsnet"
)

// HTTPTSServer is a drop-in for http.Server that serves a Handler on a tailnet.
type HTTPTSServer struct {
	Handler http.Handler

	ts      *tsnet.Server
	httpsrv *http.Server
	lc      *tailscale.LocalClient

	ctx       context.Context
	ctxCancel func()
}

func (s *HTTPTSServer) mkhttpsrv() {
	if s.httpsrv != nil {
		return
	}
	s.ctx, s.ctxCancel = context.WithCancel(context.Background())
	s.httpsrv = &http.Server{
		Handler: s.Handler,
	}
}

// Serve serves :443 and a :80 redirect on a tailnet.
func (s *HTTPTSServer) Serve(tsHostname string) error {
	s.mkhttpsrv()
	confDir, err := os.UserConfigDir()
	if err != nil {
		return fmt.Errorf("httpts: %w", err)
	}

	s.ts = &tsnet.Server{
		Dir:      filepath.Join(confDir, "httpts-"+tsHostname),
		Hostname: tsHostname,
	}
	defer s.ts.Close()

	// Call Up explicitly with a context that is canceled on Shutdown
	// so we don't get stuck in ListenTLS on Shutdown.
	if _, err := s.ts.Up(s.ctx); err != nil {
		return fmt.Errorf("httpts: %w", err)
	}

	lc, err := s.ts.LocalClient()
	if err != nil {
		return fmt.Errorf("httpts: %w", err)
	}
	s.lc = lc
	status, err := lc.Status(context.Background())
	if err != nil {
		return fmt.Errorf("httpts: %w", err)
	} else {
		log.Printf("Running: https://%s/\n", strings.TrimSuffix(status.Self.DNSName, "."))
	}

	ln, err := s.ts.Listen("tcp", ":443")
	if err != nil {
		return fmt.Errorf("httpts: %w", err)
	}
	ln = tls.NewListener(ln, &tls.Config{
		GetCertificate: lc.GetCertificate,
		NextProtos:     []string{"h2", "http/1.1"}, // Enable HTTP/2.
	})

	ln80, err := s.ts.Listen("tcp", ":80")
	if err != nil {
		return fmt.Errorf("httpts: %w", err)
	}
	srv80 := &http.Server{Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		target := (&url.URL{Scheme: "https",
			Host:     strings.TrimSuffix(status.Self.DNSName, "."),
			Path:     r.URL.Path,
			RawQuery: r.URL.RawQuery}).String()
		http.Redirect(w, r, target, http.StatusPermanentRedirect)
	})}
	go func() {
		err := srv80.Serve(ln80)
		if errors.Is(err, http.ErrServerClosed) {
			return
		}
		log.Panicf("Serving on :80 failed: %v", err)
	}()

	s.httpsrv.RegisterOnShutdown(func() {
		ctx, cancel := context.WithCancel(context.Background())
		cancel() // shut down immediately
		srv80.Shutdown(ctx)
	})
	err = s.httpsrv.Serve(ln)
	s.lc = nil
	return err
}

// Shutdown shuts down the HTTP server and Tailscale client.
func (s *HTTPTSServer) Shutdown(ctx context.Context) error {
	s.ctxCancel()

	err := s.httpsrv.Shutdown(ctx)
	err2 := s.ts.Close()
	if err == nil {
		err = err2
	}
	return err
}
