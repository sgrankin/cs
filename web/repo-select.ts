// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

/**
 * <repo-select> — a multi-select dropdown for repository filtering.
 *
 * Wraps a light-DOM <select multiple> and renders a searchable, grouped
 * checkbox dropdown in shadow DOM.  Selection changes are synced back to
 * the hidden <select> which dispatches "change" events for HTMX.
 *
 * Selection state is owned by this component; external mutations to the
 * <select> after upgrade are not observed.
 *
 * Usage (server-rendered):
 *   <repo-select>
 *     <select name="repo" multiple>
 *       <optgroup label="github.com/org/">
 *         <option value="github.com/org/repo" selected>repo</option>
 *       </optgroup>
 *     </select>
 *   </repo-select>
 */

import {LitElement, html, css, nothing} from "lit";
import {customElement, state} from "lit/decorators.js";

interface OptionItem {
    value: string;
    label: string;
    group: string;
    selected: boolean;
}

interface OptionGroup {
    label: string;
    options: OptionItem[];
}

@customElement("repo-select")
export class RepoSelect extends LitElement {
    @state() private _open = false;
    @state() private _search = "";
    @state() private _options: OptionItem[] = [];

    private _select: HTMLSelectElement | null = null;

    connectedCallback() {
        super.connectedCallback();
        this._select = this.querySelector("select");
        if (this._select) {
            this._readOptions();
        }
        document.addEventListener("click", this._onOutsideClick);
        this.addEventListener("focusout", this._onFocusOut);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener("click", this._onOutsideClick);
        this.removeEventListener("focusout", this._onFocusOut);
    }

    private _readOptions() {
        const opts: OptionItem[] = [];
        for (const child of this._select!.children) {
            if (child instanceof HTMLOptGroupElement) {
                for (const opt of child.querySelectorAll("option")) {
                    opts.push({
                        value: opt.value,
                        label: opt.textContent?.trim() || opt.value,
                        group: child.label,
                        selected: opt.selected,
                    });
                }
            } else if (child instanceof HTMLOptionElement) {
                opts.push({
                    value: child.value,
                    label: child.textContent?.trim() || child.value,
                    group: "",
                    selected: child.selected,
                });
            }
        }
        this._options = opts;
    }

    private get _buttonText(): string {
        const selected = this._options.filter((o) => o.selected);
        if (selected.length === 0) return "(all repositories)";
        if (selected.length <= 4) return selected.map((o) => o.label).join(", ");
        return `(${selected.length} repositories)`;
    }

    private get _filteredGroups(): OptionGroup[] {
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
        if (!this.contains(e.target as Node)) {
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

    private _onFocusOut = (e: FocusEvent) => {
        // Close dropdown when focus leaves the component entirely.
        if (this._open && !this.contains(e.relatedTarget as Node)) {
            this._open = false;
        }
    };

    private _toggleOption(value: string) {
        this._options = this._options.map((o) => (o.value === value ? {...o, selected: !o.selected} : o));
        this._syncToSelect();
    }

    private _selectAll() {
        this._options = this._options.map((o) => ({...o, selected: true}));
        this._syncToSelect();
    }

    private _deselectAll() {
        this._options = this._options.map((o) => ({...o, selected: false}));
        this._syncToSelect();
    }

    private _toggleGroup(label: string) {
        const groupOpts = this._options.filter((o) => o.group === label);
        const allSelected = groupOpts.every((o) => o.selected);
        this._options = this._options.map((o) => (o.group === label ? {...o, selected: !allSelected} : o));
        this._syncToSelect();
    }

    private _syncToSelect() {
        if (!this._select) return;
        for (const opt of this._select.options) {
            const item = this._options.find((o) => o.value === opt.value);
            if (item) opt.selected = item.selected;
        }
        this._select.dispatchEvent(new Event("change", {bubbles: true}));
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
            <slot></slot>
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

    private _renderGroup(g: OptionGroup) {
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

        ::slotted(select) {
            display: none !important;
        }
    `;
}
