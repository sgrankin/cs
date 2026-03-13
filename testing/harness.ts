// Minimal browser test harness, inspired by Go's testing package.
//
// Test files export functions named test* that receive a T.
// The runner generates an entry point that passes all test modules to runAll.
//
// Usage:
//   import {T, eq, render, parseSnapshots, serialize} from "@testing/harness";
//   export async function testFoo(t: T) { ... }

import {html, render as litRender} from "lit";

// T is the test context, like Go's testing.T.
export class T {
    name: string;
    failed = false;
    _children: {name: string; fn: () => Promise<void>}[] = [];

    constructor(name: string) {
        this.name = name;
    }

    // run registers a subtest, like t.Run in Go.
    run(name: string, fn: () => void | Promise<void>) {
        this._children.push({name, fn: async () => { await fn(); }});
    }
}

// eq checks deep equality via JSON serialization and throws on mismatch.
export function eq(got: unknown, want: unknown, msg?: string) {
    const g = typeof got === "string" ? got : JSON.stringify(got, null, 2);
    const w = typeof want === "string" ? want : JSON.stringify(want, null, 2);
    if (g !== w) {
        const prefix = msg ? msg + ": " : "";
        throw new Error(`${prefix}\ngot:\n${g}\nwant:\n${w}`);
    }
}

// render inserts a Lit html template into the DOM and waits for the component to update.
export async function render(template: ReturnType<typeof html>): Promise<HTMLElement> {
    const container = document.createElement("div");
    document.body.appendChild(container);
    litRender(template, container);
    await new Promise((r) => setTimeout(r, 0));
    const el = container.firstElementChild as HTMLElement;
    if ("updateComplete" in el) await (el as any).updateComplete;
    return el;
}

// renderHTML parses an HTML string, appends to the DOM, and waits for custom elements to render.
export async function renderHTML(input: string): Promise<HTMLElement> {
    const container = document.createElement("div");
    container.innerHTML = input.trim();
    document.body.appendChild(container);
    const el = container.firstElementChild as HTMLElement;
    // Wait for custom element to upgrade and render.
    await customElements.whenDefined(el.localName).catch(() => {});
    await new Promise((r) => setTimeout(r, 0));
    if ("updateComplete" in el) await (el as any).updateComplete;
    // Also wait for any nested custom elements.
    for (const nested of el.shadowRoot?.querySelectorAll("*") || []) {
        if (nested.localName.includes("-")) {
            await customElements.whenDefined(nested.localName).catch(() => {});
            if ("updateComplete" in nested) await (nested as any).updateComplete;
        }
    }
    return el;
}

// serialize converts a custom element's shadow DOM into a normalized string,
// skipping <style> tags and normalizing whitespace.
export function serialize(el: HTMLElement): string {
    if (!el.shadowRoot) return el.outerHTML;
    return serializeNodes(el.shadowRoot.childNodes).trim();
}

function serializeNodes(nodes: NodeListOf<ChildNode>): string {
    let out = "";
    for (const node of nodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            out += node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            if (el.tagName === "STYLE") continue;
            out += "<" + el.tagName.toLowerCase();
            // Sort attributes for determinism.
            const attrs = [...el.attributes].sort((a, b) => a.name.localeCompare(b.name));
            for (const attr of attrs) {
                let val = attr.value;
                // Normalize class attributes: collapse whitespace, sort, drop empty.
                if (attr.name === "class") {
                    val = val.split(/\s+/).filter(Boolean).sort().join(" ");
                    if (!val) continue;
                }
                out += ` ${attr.name}="${val}"`;
            }
            if (el.shadowRoot) {
                // Custom element with shadow DOM: serialize its shadow content.
                out += ">";
                out += serializeNodes(el.shadowRoot.childNodes);
                out += `</${el.tagName.toLowerCase()}>`;
            } else if (el.childNodes.length > 0) {
                out += ">";
                out += serializeNodes(el.childNodes);
                out += `</${el.tagName.toLowerCase()}>`;
            } else {
                out += " />";
            }
        }
    }
    return out;
}

// parseSnapshots parses a txtar-like string into test cases.
// Format: sections separated by "-- name --" headers.
// Within each section, blank line separates input (HTML) from expected output.
export function parseSnapshots(data: string): {name: string; input: string; want: string}[] {
    const cases: {name: string; input: string; want: string}[] = [];
    const sections = data.split(/^-- (.+) --$/m);
    // sections[0] is preamble (before first header), then alternating [name, content].
    for (let i = 1; i < sections.length; i += 2) {
        const name = sections[i].trim();
        const content = sections[i + 1];
        const [input, ...rest] = content.split("\n\n");
        const want = rest.join("\n\n").trim();
        cases.push({name, input: input.trim(), want});
    }
    return cases;
}

// runAll finds all test* exports in the given modules, creates a T for each,
// runs the function, then runs any subtests registered via t.run.
export async function runAll(modules: Record<string, unknown>[]) {
    let passed = 0;
    let failed = 0;
    const totalStart = performance.now();

    for (const mod of modules) {
        for (const [name, fn] of Object.entries(mod)) {
            if (!name.startsWith("test") || typeof fn !== "function") continue;

            const t = new T(name);
            let topErr: Error | null = null;
            try {
                await fn(t);
            } catch (e) {
                topErr = e instanceof Error ? e : new Error(String(e));
            }

            if (t._children.length === 0) {
                const dur = fmtMs(performance.now() - totalStart);
                if (topErr) {
                    console.log(`FAIL  ${name} (${dur}): ${topErr.message}`);
                    failed++;
                } else {
                    console.log(`PASS  ${name} (${dur})`);
                    passed++;
                }
                document.body.innerHTML = "";
            } else {
                if (topErr) {
                    console.log(`FAIL  ${name}: ${topErr.message}`);
                    failed++;
                }
                for (const child of t._children) {
                    const fullName = `${name}/${child.name}`;
                    const childStart = performance.now();
                    try {
                        await child.fn();
                        console.log(`PASS  ${fullName} (${fmtMs(performance.now() - childStart)})`);
                        passed++;
                    } catch (e) {
                        const msg = e instanceof Error ? e.message : String(e);
                        console.log(`FAIL  ${fullName} (${fmtMs(performance.now() - childStart)}): ${msg}`);
                        failed++;
                    }
                    document.body.innerHTML = "";
                }
            }
        }
    }

    const totalDur = ((performance.now() - totalStart) / 1000).toFixed(3);
    if (failed > 0) {
        console.log(`\n${passed} passed, ${failed} failed (${totalDur}s)`);
        console.log("FAIL");
    } else {
        console.log(`\n${passed} passed (${totalDur}s)`);
        console.log("PASS");
    }
}

function fmtMs(ms: number): string {
    return ms < 1 ? "<1ms" : Math.round(ms) + "ms";
}
