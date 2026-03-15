// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// URL-based router using signals.
// The URL is the sole source of truth; route signal is derived from it.

import {signal, type Signal} from '@lit-labs/signals';

/** Route names for the application. */
export type RouteName = 'search' | 'view' | 'about' | 'not-found';

/** A matched route with extracted parameters. */
export interface Route {
  name: RouteName;
  /** For view route: the full path after /view/ */
  path?: string;
  /** The current URL search params. */
  params: URLSearchParams;
}

/** Route definitions. Order matters — first match wins. */
const ROUTES: {pattern: RegExp; name: RouteName}[] = [
  {pattern: /^\/(search)?$/, name: 'search'},
  {pattern: /^\/view\/(.+)/, name: 'view'},
  {pattern: /^\/about$/, name: 'about'},
];

/** Resolve a URL pathname to a Route. */
export function matchRoute(pathname: string, search: string = ''): Route {
  for (const {pattern, name} of ROUTES) {
    const m = pattern.exec(pathname);
    if (m) {
      return {
        name,
        path: m[1],
        params: new URLSearchParams(search),
      };
    }
  }
  return {name: 'not-found', params: new URLSearchParams(search)};
}

/** Current route signal, updated on navigation. */
export const currentRoute: Signal.State<Route> = signal(
  matchRoute(window.location.pathname, window.location.search),
);

/** Navigate to a new URL, updating the route signal. */
export function navigate(url: string, replace = false): void {
  const parsed = new URL(url, window.location.origin);
  if (replace) {
    history.replaceState(null, '', parsed.href);
  } else {
    history.pushState(null, '', parsed.href);
  }
  currentRoute.set(matchRoute(parsed.pathname, parsed.search));
}

/** Update just the search params, preserving the current path. */
export function updateSearchParams(params: URLSearchParams, replace = false): void {
  const search = params.toString();
  const url = window.location.pathname + (search ? '?' + search : '');
  navigate(url, replace);
}

// Handle browser back/forward.
window.addEventListener('popstate', () => {
  currentRoute.set(matchRoute(window.location.pathname, window.location.search));
});
