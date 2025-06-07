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

	"github.com/quic-go/quic-go/http3"
	"tailscale.com/client/local"
	"tailscale.com/tsnet"
)

// HTTPTSServer is a drop-in for http.Server that serves a Handler on a tailnet.
type HTTPTSServer struct {
	Handler http.Handler

	ts      *tsnet.Server
	httpsrv *http.Server
	lc      *local.Client

	ctx       context.Context
	ctxCancel func()
}

// Serve serves :443 and a :80 redirect on a tailnet.
func (s *HTTPTSServer) Serve(tsHostname string) error {
	s.ctx, s.ctxCancel = context.WithCancel(context.Background())
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

	pc, err := s.ts.ListenPacket("udp", status.TailscaleIPs[0].String()+":443")
	if err != nil {
		return fmt.Errorf("httpts: %w", err)
	}
	h3srv := http3.Server{
		Handler:   s.Handler,
		TLSConfig: &tls.Config{GetCertificate: lc.GetCertificate},
	}
	go func() {
		err := h3srv.Serve(pc)
		if errors.Is(err, http.ErrServerClosed) {
			return
		}
		log.Panicf("Serving h3 on :443 failed: %v", err)
	}()

	ln, err := s.ts.Listen("tcp", ":443")
	if err != nil {
		return fmt.Errorf("httpts: %w", err)
	}
	ln = tls.NewListener(ln, &tls.Config{
		GetCertificate: lc.GetCertificate,
		NextProtos:     []string{"h2", "http/1.1"}, // Enable HTTP/2.
	})
	s.httpsrv = &http.Server{
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if err := h3srv.SetQUICHeaders(w.Header()); err != nil {
				log.Panicf("Could not set Alt-Svc: %v", err)
			}
			r.Header.Set("Strict-Transport-Security", "max-age=31536000")
			s.Handler.ServeHTTP(w, r)
		}),
	}

	ln80, err := s.ts.Listen("tcp", ":80")
	if err != nil {
		return fmt.Errorf("httpts: %w", err)
	}
	srv80 := &http.Server{Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		target := (&url.URL{
			Scheme:   "https",
			Host:     strings.TrimSuffix(status.Self.DNSName, "."),
			Path:     r.URL.Path,
			RawQuery: r.URL.RawQuery,
		}).String()
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
		h3srv.Close()
	})
	err = s.httpsrv.Serve(ln)
	s.lc = nil
	return err
}

// Shutdown shuts down the HTTP server and Tailscale client.
func (s *HTTPTSServer) Shutdown(ctx context.Context) error {
	s.ctxCancel()

	return errors.Join(
		s.httpsrv.Shutdown(ctx),
		s.ts.Close())
}
