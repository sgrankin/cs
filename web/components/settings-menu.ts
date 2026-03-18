// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

// Floating settings dropdown menu with theme toggle.

import {LitElement, html, css, svg} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import ChevronDown from 'lucide/dist/esm/icons/chevron-down';
import Sun from 'lucide/dist/esm/icons/sun';
import Moon from 'lucide/dist/esm/icons/moon';
import Monitor from 'lucide/dist/esm/icons/monitor';

type Theme = 'auto' | 'light' | 'dark';

/** Render a Lucide icon (array of [tag, attrs] pairs) as SVG. */
function icon(data: [string, Record<string, string>][], size = 16) {
  return svg`<svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    ${data.map(([tag, attrs]) => {
      const a = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
      return svg`${html`<span style="display:none"></span>`}${svgEl(tag, attrs)}`;
    })}
  </svg>`;
}

/** Create an SVG element from tag name and attributes. */
function svgEl(tag: string, attrs: Record<string, string>) {
  switch (tag) {
    case 'circle': return svg`<circle cx=${attrs.cx} cy=${attrs.cy} r=${attrs.r}/>`;
    case 'path': return svg`<path d=${attrs.d}/>`;
    case 'line': return svg`<line x1=${attrs.x1} y1=${attrs.y1} x2=${attrs.x2} y2=${attrs.y2}/>`;
    case 'polyline': return svg`<polyline points=${attrs.points}/>`;
    case 'rect': return svg`<rect x=${attrs.x} y=${attrs.y} width=${attrs.width} height=${attrs.height} rx=${attrs.rx || '0'}/>`;
    default: return svg``;
  }
}

function getStoredTheme(): Theme {
  return (localStorage.getItem('theme') as Theme) || 'auto';
}

function applyTheme(theme: Theme) {
  localStorage.setItem('theme', theme);
  const root = document.documentElement;
  // light-dark() CSS function uses color-scheme to pick values.
  // 'light dark' = auto (follows OS), 'light' or 'dark' = forced.
  root.style.colorScheme = theme === 'auto' ? 'light dark' : theme;
}

// Apply stored theme on load.
applyTheme(getStoredTheme());

@customElement('cs-settings-menu')
export class SettingsMenu extends LitElement {
  @state() private open = false;
  @state() private theme: Theme = getStoredTheme();

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.onOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.onOutsideClick);
  }

  private onOutsideClick = (e: Event) => {
    if (!this.open) return;
    if (!e.composedPath().includes(this)) {
      this.open = false;
    }
  };

  private setTheme(t: Theme) {
    this.theme = t;
    applyTheme(t);
  }

  render() {
    return html`
      <button class="trigger" @click=${() => { this.open = !this.open; }}
        aria-label="Settings" title="Settings">
        ${icon(ChevronDown, 12)}
      </button>
      ${this.open ? html`
        <div class="menu">
          <div class="menu-item">
            <span class="menu-label">Theme</span>
            <div class="theme-toggle">
              <button class=${this.theme === 'light' ? 'active' : ''}
                @click=${() => this.setTheme('light')} title="Light">
                ${icon(Sun, 14)}
              </button>
              <button class=${this.theme === 'auto' ? 'active' : ''}
                @click=${() => this.setTheme('auto')} title="System">
                ${icon(Monitor, 14)}
              </button>
              <button class=${this.theme === 'dark' ? 'active' : ''}
                @click=${() => this.setTheme('dark')} title="Dark">
                ${icon(Moon, 14)}
              </button>
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }

  static styles = css`
    :host {
      position: fixed;
      top: 8px;
      right: 8px;
      z-index: 1000;
      font-size: 12px;
    }

    .trigger {
      background: var(--color-background-subtle);
      border: 1px solid var(--color-border-default);
      color: var(--color-foreground-muted);
      cursor: pointer;
      padding: 2px 3px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      opacity: 0.3;
      transition: opacity 0.15s;
    }
    .trigger:hover {
      opacity: 1;
      background: var(--color-background-hover);
    }

    .menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 4px;
      background: var(--color-background-subtle);
      border: 1px solid var(--color-border-default);
      border-radius: 6px;
      box-shadow: 0 2px 8px var(--color-shadow);
      min-width: 160px;
      padding: 4px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 8px;
      gap: 8px;
    }

    .menu-label {
      color: var(--color-foreground-muted);
    }

    .theme-toggle {
      display: flex;
      gap: 2px;
      background: var(--color-background);
      border: 1px solid var(--color-border-default);
      border-radius: 4px;
      padding: 2px;
    }

    .theme-toggle button {
      background: none;
      border: none;
      color: var(--color-foreground-muted);
      cursor: pointer;
      padding: 3px 6px;
      border-radius: 3px;
      display: flex;
      align-items: center;
    }
    .theme-toggle button:hover {
      background: var(--color-background-hover);
    }
    .theme-toggle button.active {
      background: var(--color-foreground-accent);
      color: var(--color-background);
    }
  `;
}
