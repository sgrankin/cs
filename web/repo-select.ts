// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

/**
 * <repo-select> — a multi-select dropdown for repository filtering.
 *
 * Accepts repo data via the `groups` property. Renders a searchable,
 * grouped checkbox dropdown. Fires "change" with selected repo values.
 *
 * Usage:
 *   <repo-select .groups=${[{label: "github.com/org/", repos: ["github.com/org/repo"]}]}></repo-select>
 */

import {LitElement, html, css, nothing} from "lit";
import {customElement, property, state} from "lit/decorators.js";

/** Input format: matches server-side repoGroup. */
export interface RepoGroup {
    label: string;
    repos: string[];
}

interface OptionItem {
    value: string;
    label: string;
    group: string;
    selected: boolean;
}

interface OptionGroupView {
    label: string;
    options: OptionItem[];
}

@customElement("repo-select")
export class RepoSelect extends LitElement {
    @property({type: Array}) groups: RepoGroup[] = [];
    @state() private _open = false;
    @state() private _search = "";
    @state() private _selected = new Set<string>();

    private get _options(): OptionItem[] {
        return this.groups.flatMap(g =>
            g.repos.map(repo => ({
                value: repo,
                label: repo.split("/").pop() ?? repo,
                group: g.label,
                selected: this._selected.has(repo),
            })),
        );
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener("click", this._onOutsideClick);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener("click", this._onOutsideClick);
    }

    /** The currently selected repo values. */
    get selectedRepos(): string[] {
        return [...this._selected];
    }

    private get _buttonText(): string {
        const count = this._selected.size;
        if (count === 0) return "(all repositories)";
        if (count <= 4) {
            const options = this._options.filter(o => o.selected);
            return options.map(o => o.label).join(", ");
        }
        return `(${count} repositories)`;
    }

    private get _filteredGroups(): OptionGroupView[] {
        const search = this._search.toLowerCase();
        const groups = new Map<string, OptionItem[]>();
        for (const opt of this._options) {
            if (search && !opt.value.toLowerCase().includes(search) && !opt.label.toLowerCase().includes(search))
                continue;
            if (!groups.has(opt.group)) groups.set(opt.group, []);
            groups.get(opt.group)!.push(opt);
        }
        return [...groups.entries()].map(([label, options]) => ({label, options}));
    }

    private _onOutsideClick = (e: Event) => {
        if (!this._open) return;
        // Use composedPath to correctly detect clicks inside nested shadow DOMs.
        if (!e.composedPath().includes(this)) {
            this._open = false;
        }
    };

    private _toggleOpen() {
        this._open = !this._open;
        if (this._open) {
            this.updateComplete.then(() => {
                this.shadowRoot?.querySelector<HTMLInputElement>(".search-input")?.focus();
            });
        }
    }

    private _toggleOption(value: string) {
        const updated = new Set(this._selected);
        if (updated.has(value)) {
            updated.delete(value);
        } else {
            updated.add(value);
        }
        this._selected = updated;
        this._fireChange();
    }

    private _selectAll() {
        this._selected = new Set(this._options.map(o => o.value));
        this._fireChange();
    }

    private _deselectAll() {
        this._selected = new Set();
        this._fireChange();
    }

    private _toggleGroup(label: string) {
        const groupValues = this._options.filter(o => o.group === label).map(o => o.value);
        const allSelected = groupValues.every(v => this._selected.has(v));
        const updated = new Set(this._selected);
        for (const v of groupValues) {
            if (allSelected) {
                updated.delete(v);
            } else {
                updated.add(v);
            }
        }
        this._selected = updated;
        this._fireChange();
    }

    private _fireChange() {
        this.dispatchEvent(new Event("change", {bubbles: true}));
    }

    private _onSearchInput(e: Event) {
        this._search = (e.target as HTMLInputElement).value;
    }

    private _onSearchKeydown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault();
            this._search = "";
        }
        if (e.key === "Escape") {
            this._open = false;
        }
    }

    render() {
        return html`
            <button type="button" class="trigger" @click=${this._toggleOpen}>
                <span class="text">${this._buttonText}</span>
                <span class="caret">&#x25BE;</span>
            </button>
            ${this._open ? this._renderDropdown() : nothing}
        `;
    }

    private _renderDropdown() {
        const groups = this._filteredGroups;
        return html`
            <div class="dropdown">
                <div class="search-box">
                    <input
                        type="search"
                        class="search-input"
                        placeholder="Search..."
                        .value=${this._search}
                        @input=${this._onSearchInput}
                        @keydown=${this._onSearchKeydown}
                    />
                </div>
                <div class="actions">
                    <button type="button" @click=${this._selectAll}>Select All</button>
                    <button type="button" @click=${this._deselectAll}>Deselect All</button>
                </div>
                <div class="options">${groups.map((g) => this._renderGroup(g))}</div>
            </div>
        `;
    }

    private _renderGroup(g: OptionGroupView) {
        if (!g.label) {
            return g.options.map((o) => this._renderOption(o));
        }
        return html`
            <div class="group">
                <div class="group-header" @click=${() => this._toggleGroup(g.label)}>${g.label}</div>
                ${g.options.map((o) => this._renderOption(o))}
            </div>
        `;
    }

    private _renderOption(o: OptionItem) {
        return html`
            <label class="option ${o.selected ? "selected" : ""}">
                <input type="checkbox" .checked=${o.selected} @change=${() => this._toggleOption(o.value)} />
                ${o.label}
            </label>
        `;
    }

    static styles = css`
        :host {
            display: inline-block;
            position: relative;
            font-size: 12px;
        }

        .trigger {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 8px;
            background: var(--color-background-subtle);
            border: 1px solid var(--color-border-default);
            color: var(--color-foreground-muted);
            cursor: pointer;
            font-size: inherit;
            white-space: nowrap;
        }

        .trigger:hover {
            background: var(--color-background-hover);
            color: var(--color-foreground);
        }

        .caret {
            font-size: 10px;
        }

        .dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 1000;
            min-width: 240px;
            max-height: 420px;
            background: var(--color-background-subtle);
            border: 1px solid var(--color-border-default);
            box-shadow: 0 2px 8px var(--color-shadow);
            display: flex;
            flex-direction: column;
        }

        .search-box {
            padding: 4px;
        }

        .search-input {
            width: 100%;
            box-sizing: border-box;
            padding: 4px 6px;
            border: 1px solid var(--color-border-default);
            background: var(--color-background);
            color: var(--color-foreground);
            font-size: inherit;
        }

        .search-input:focus {
            outline: 1px solid var(--color-foreground-accent);
        }

        .actions {
            display: flex;
            gap: 4px;
            padding: 2px 4px;
            border-bottom: 1px solid var(--color-border-default);
        }

        .actions button {
            flex: 1;
            padding: 2px 4px;
            background: var(--color-background);
            border: 1px solid var(--color-border-default);
            color: var(--color-foreground-muted);
            cursor: pointer;
            font-size: inherit;
        }

        .actions button:hover {
            background: var(--color-background-hover);
            color: var(--color-foreground);
        }

        .options {
            overflow-y: auto;
            flex: 1;
        }

        .group-header {
            padding: 4px 8px;
            font-weight: bold;
            color: var(--color-foreground-muted);
            cursor: pointer;
            user-select: none;
        }

        .group-header:hover {
            background: var(--color-background-hover);
        }

        .option {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px 2px 16px;
            cursor: pointer;
            user-select: none;
            color: var(--color-foreground);
        }

        .option:hover {
            background: var(--color-background-hover);
        }

        .option.selected {
            background: var(--color-background-hover);
        }

        .option input[type="checkbox"] {
            margin: 0;
        }
    `;
}
