// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

/** Help text displayed when no query is entered. */
@customElement('cs-search-help')
export class SearchHelp extends LitElement {
  render() {
    return html`
      <div class="help">
        <h3>Search syntax</h3>
        <dl>
          <dt>Regular expression</dt>
          <dd>Type a regex to search code. Use <code>Aa</code> for case-sensitive, <code>.*</code> for literal.</dd>

          <dt><code>file:<em>path</em></code></dt>
          <dd>Filter by file path regex. Example: <code>file:_test\\.go$</code></dd>

          <dt><code>-file:<em>path</em></code></dt>
          <dd>Exclude files matching path regex.</dd>

          <dt><code>repo:<em>name</em></code></dt>
          <dd>Filter by repository name regex.</dd>

          <dt><code>lit:<em>text</em></code></dt>
          <dd>Search for literal text (no regex interpretation).</dd>

          <dt><code>case:<em>text</em></code></dt>
          <dd>Case-sensitive search.</dd>
        </dl>
      </div>
    `;
  }

  static styles = css`
    .help {
      max-width: 600px;
      color: var(--color-foreground-muted);
      font-size: 13px;
      line-height: 1.6;
    }
    h3 {
      margin: 0 0 12px;
      color: var(--color-foreground);
    }
    dl {
      margin: 0;
    }
    dt {
      font-weight: bold;
      margin-top: 8px;
    }
    dd {
      margin: 2px 0 0 16px;
    }
    code {
      font-family: 'Menlo', 'Consolas', monospace;
      background: var(--color-background-subtle);
      padding: 1px 4px;
      border-radius: 2px;
      font-size: 12px;
    }
    em {
      font-style: italic;
      color: var(--color-foreground-subtle);
    }
  `;
}
