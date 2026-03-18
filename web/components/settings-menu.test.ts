// Copyright Sergey Grankin
// SPDX-License-Identifier: BSD-2-Clause

import {T, eq, render} from "@testing/harness";
import {html} from "lit";
import "./settings-menu.ts";
import type {SettingsMenu} from "./settings-menu.ts";

export async function testSettingsMenuRenders(t: T) {
    const origTheme = localStorage.getItem('theme');
    try {
        const el = await render(html`<cs-settings-menu></cs-settings-menu>`) as SettingsMenu;
        const trigger = el.renderRoot.querySelector('.trigger') as HTMLButtonElement;
        eq(trigger !== null, true, "trigger button exists");
        eq(trigger.getAttribute('aria-label'), "Settings");
        // Menu should not be visible initially.
        eq(el.renderRoot.querySelector('.menu'), null, "menu not open initially");
    } finally {
        if (origTheme !== null) localStorage.setItem('theme', origTheme);
        else localStorage.removeItem('theme');
    }
}

export async function testSettingsMenuOpens(t: T) {
    const origTheme = localStorage.getItem('theme');
    try {
        const el = await render(html`<cs-settings-menu></cs-settings-menu>`) as SettingsMenu;
        const trigger = el.renderRoot.querySelector('.trigger') as HTMLButtonElement;

        // Click trigger to open.
        trigger.click();
        await (el as any).updateComplete;

        const menu = el.renderRoot.querySelector('.menu');
        eq(menu !== null, true, "menu is open after click");

        // Verify menu content.
        const label = menu!.querySelector('.menu-label');
        eq(label!.textContent, "Theme");

        const buttons = menu!.querySelectorAll('.theme-toggle button');
        eq(buttons.length, 3, "three theme buttons");

        const titles = Array.from(buttons).map(b => b.getAttribute('title'));
        eq(titles, ["Light", "System", "Dark"]);
    } finally {
        if (origTheme !== null) localStorage.setItem('theme', origTheme);
        else localStorage.removeItem('theme');
    }
}

export async function testSettingsMenuThemeToggle(t: T) {
    const origTheme = localStorage.getItem('theme');
    const origColorScheme = document.documentElement.style.colorScheme;
    try {
        const el = await render(html`<cs-settings-menu></cs-settings-menu>`) as SettingsMenu;
        const trigger = el.renderRoot.querySelector('.trigger') as HTMLButtonElement;

        // Open menu.
        trigger.click();
        await (el as any).updateComplete;

        const menu = el.renderRoot.querySelector('.menu')!;
        const buttons = menu.querySelectorAll('.theme-toggle button') as NodeListOf<HTMLButtonElement>;

        // Click "Light".
        buttons[0].click();
        await (el as any).updateComplete;
        eq(document.documentElement.style.colorScheme, "light");
        eq(localStorage.getItem('theme'), "light");

        // Click "Dark".
        buttons[2].click();
        await (el as any).updateComplete;
        eq(document.documentElement.style.colorScheme, "dark");
        eq(localStorage.getItem('theme'), "dark");

        // Click "System" (auto).
        buttons[1].click();
        await (el as any).updateComplete;
        eq(document.documentElement.style.colorScheme, "light dark");
        eq(localStorage.getItem('theme'), "auto");
    } finally {
        if (origTheme !== null) localStorage.setItem('theme', origTheme);
        else localStorage.removeItem('theme');
        document.documentElement.style.colorScheme = origColorScheme;
    }
}

export async function testSettingsMenuOutsideClick(t: T) {
    const origTheme = localStorage.getItem('theme');
    try {
        const el = await render(html`<cs-settings-menu></cs-settings-menu>`) as SettingsMenu;
        const trigger = el.renderRoot.querySelector('.trigger') as HTMLButtonElement;

        // Open menu.
        trigger.click();
        await (el as any).updateComplete;
        eq(el.renderRoot.querySelector('.menu') !== null, true, "menu is open");

        // Click outside (on document body).
        document.body.click();
        await (el as any).updateComplete;
        eq(el.renderRoot.querySelector('.menu'), null, "menu closed after outside click");
    } finally {
        if (origTheme !== null) localStorage.setItem('theme', origTheme);
        else localStorage.removeItem('theme');
    }
}

export async function testSettingsMenuToggleClose(t: T) {
    const origTheme = localStorage.getItem('theme');
    try {
        const el = await render(html`<cs-settings-menu></cs-settings-menu>`) as SettingsMenu;
        const trigger = el.renderRoot.querySelector('.trigger') as HTMLButtonElement;

        // Open menu.
        trigger.click();
        await (el as any).updateComplete;
        eq(el.renderRoot.querySelector('.menu') !== null, true, "menu is open");

        // Click trigger again to close.
        trigger.click();
        await (el as any).updateComplete;
        eq(el.renderRoot.querySelector('.menu'), null, "menu closed after second trigger click");
    } finally {
        if (origTheme !== null) localStorage.setItem('theme', origTheme);
        else localStorage.removeItem('theme');
    }
}
