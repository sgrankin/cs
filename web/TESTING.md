# Frontend Testing Guide

## Test Framework

Custom harness (`testing/harness.ts`) + Playwright runner (`testing/web-runner.mjs`).
Tests are exported `async function test*(t: T)` from `*.test.ts` files.

## Assertion Style

**Compare full structures, not individual fields.**

Bad — per-field assertions:
```typescript
eq(links[0].textContent, "search", "first link text");
eq(links[0].getAttribute('href'), "/", "first link href");
eq(links[1].textContent, "about", "second link text");
eq(links[1].getAttribute('href'), "/about", "second link href");
```

Good — extract data, compare structure:
```typescript
const got = Array.from(links).map(a => ({
    text: a.textContent,
    href: a.getAttribute('href'),
}));
eq(got, [
    {text: "search", href: "/"},
    {text: "about", href: "/about"},
    {text: "source", href: "https://github.com/sgrankin/cs"},
]);
```

One `eq()` call. If anything is wrong, the deep-equality diff shows exactly what changed.

**Why:** Same reasoning as Go's table-driven tests with `reflect.DeepEqual` — the test captures *what* the output should be, not *how* to check it field by field. Fewer assertions, clearer diffs, less test code.

## What to Test

- **Rendered content**: extract text, hrefs, classes into plain objects and compare against expected structures.
- **Events**: verify the event fires with the correct `detail` object.
- **State changes**: set properties, await `updateComplete`, verify rendered output changed.
- **Edge cases**: empty input, missing props, error states.

## What NOT to Do

- Don't check just element count (`eq(links.length, 3)`) — a component could render 3 wrong links.
- Don't check just existence (`eq(el !== null, true)`) — tells you nothing about correctness.
- Don't use `startsWith`/`includes` when you can check exact values.
- Don't access private methods via `(el as any).privateMethod()` unless there's no behavioral alternative.
- Don't test navigation side effects (`window.location.href = ...`) in unit tests — those need Playwright.

## Test File Location

Tests live next to their component: `web/components/foo.ts` → `web/components/foo.test.ts`.

## Running Tests

```bash
bun run test   # requires sandbox bypass for Chromium
```

Coverage uses V8 block-level tracking (`range.count`) — methods that are imported but never called show as uncovered.
