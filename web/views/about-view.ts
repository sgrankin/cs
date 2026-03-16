// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {linkStyles} from '../shared-styles.ts';

@customElement('cs-about-view')
export class AboutView extends LitElement {
  render() {
    return html`
      <div class="about">
        <p>
          cs is a port of the <a href="https://github.com/livegrep/livegrep">livegrep</a> web UI onto a
          backend powered by Russ Cox's <a href="https://github.com/google/codesearch">codesearch</a> code.
        </p>
        <p>
          The livegrep project was an experiment in scaling real-time regex search, inspired in part by the
          death of <a href="http://google.com/codesearch">Google Codesearch</a>. Livegrep is written and
          run by <a href="https://nelhage.com/">Nelson Elhage</a> and is
          <a href="https://github.com/livegrep/livegrep">open source</a>.
        </p>
      </div>
    `;
  }

  static styles = [
    linkStyles,
    css`
      :host {
        display: block;
      }
      .about {
        max-width: 600px;
        margin: 2em auto;
        line-height: 1.6;
      }
    `,
  ];
}
