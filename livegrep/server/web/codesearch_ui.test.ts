import {T, eq, render, renderHTML, serialize, parseSnapshots} from "@testing/harness";
import "./components.ts";
import {html} from "lit";

// @ts-ignore: esbuild text loader
import snapshotData from "./testdata/components.txt";

export async function testComponentSnapshots(t: T) {
    for (const c of parseSnapshots(snapshotData)) {
        t.run(c.name, async () => {
            const el = await renderHTML(c.input);
            eq(serialize(el), c.want, c.name);
        });
    }
}

export async function testMatchStrNoHighlight(t: T) {
    const el = await render(html`<match-str .text=${"hello world"}></match-str>`);
    eq(el.shadowRoot!.textContent, "hello world");
    eq(el.shadowRoot!.querySelector(".matchstr"), null, "no highlight without bounds");
}
