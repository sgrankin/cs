// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

/**
 * Shared CSS styles for Lit components using shadow DOM.
 *
 * Components that use shadow DOM should import these shared styles
 * to avoid duplicating common CSS rules. CSS custom properties
 * from codesearch.css (--color-*) inherit through shadow boundaries.
 */

import {css} from 'lit';

/** Link styles matching global codesearch.css conventions. */
export const linkStyles = css`
  a {
    text-decoration: none;
    color: var(--color-foreground-accent);
  }
  a:hover {
    text-decoration: underline;
  }
`;

/** Result path styles (repo:version:path). */
export const resultPathStyles = css`
  .result-path {
    color: var(--color-foreground-muted);
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: normal;
  }
  .result-path .repo,
  .result-path .version {
    color: var(--color-foreground-muted);
  }
  .result-path .filename {
    font-weight: bold;
  }
`;

/** Label styles used across components. */
export const labelStyles = css`
  .label {
    font-weight: bold;
  }
`;

/** Tooltip styles for inline help. */
export const tooltipStyles = css`
  .tooltip-target {
    border-bottom: 1px dotted var(--color-foreground-emphasis);
    position: relative;
    cursor: help;
  }
  .tooltip {
    display: none;
    position: absolute;
    top: 20px;
    border: 1px solid var(--color-foreground-emphasis);
    border-radius: 3px;
    padding: 0px 4px;
    background-color: var(--color-background);
  }
  .tooltip-target:hover .tooltip {
    display: block;
  }
`;

/** Prefixed input styles (label appears before the input). */
export const prefixedInputStyles = css`
  .prefixed-input {
    width: calc(100% - 20px);
    position: relative;
  }
  .prefixed-input .prefix-label {
    position: absolute;
    top: 12px;
    color: var(--color-foreground);
    font-size: 12px;
    font-weight: bold;
  }
  .prefixed-input.filter-code .prefix-label {
    top: 14px;
  }
  .prefixed-input input[type="search"] {
    vertical-align: bottom;
    border: none;
    border-bottom: solid 2px var(--color-prefixed-input-border);
    padding: 10px 0 5px 0;
    transition: border 150ms;
    width: 100%;
    text-indent: 50px;
    background-color: transparent;
    color: inherit;
    font: inherit;
  }
  .prefixed-input input[type="search"]:hover {
    outline: none;
    border-color: var(--color-prefixed-input-border-hover);
  }
  .prefixed-input input[type="search"]:focus {
    outline: none;
    border-color: var(--color-prefixed-input-border-focus);
  }
  .prefixed-input input[type="search"]:valid {
    border-color: var(--color-prefixed-input-border-valid);
  }
  .prefixed-input input[type="search"]:valid:hover {
    border-color: var(--color-prefixed-input-border-valid-hover);
  }
  .prefixed-input input[type="search"]:valid:focus {
    border-color: var(--color-prefixed-input-border-valid-focus);
  }
`;
