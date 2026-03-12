# Google Go Style Guide — Condensed Reference

Source: https://google.github.io/styleguide/go/
Normative: guide, decisions. Non-normative (encouraged): best-practices.

---

## Core Principles (priority order)

1. **Clarity** — readers understand not only *what* code does but *why*. "Achieved with effective naming, helpful commentary, and efficient code organization."
2. **Simplicity** — "simple code is easy to read from top to bottom" and "does not assume that you already know what it is doing." It's easy to add complexity; hard to remove it.
3. **Concision** — "repetitive code especially obscures the differences between each nearly-identical section," forcing visual comparison.
4. **Maintainability** — "code is edited many more times than it is written." Important details must not hide where they're easy to overlook.
5. **Consistency** — within a package is most important. "Code should look and behave like surrounding code." When other principles tie, consistency breaks the tie.

When principles conflict, apply in this order. Apply new practices going forward; don't retroactively refactor for style alone.

---

## Formatting

Uniformity eliminates stylistic debate — `gofmt` settles mechanical formatting the same way it settles brace placement.

- All source files must conform to `gofmt` output.
- No fixed line length limit. "Breaking function arguments precedes a change in indentation...it is difficult to break the line in a way that does not make subsequent lines look like part of the function body." Refactor long lines rather than splitting mechanically.
- Never break a line so the remainder aligns with an indented block — prevents "visual ambiguity about which indented code block" the wrapped line belongs to.
- Function signatures stay on one line; extract locals instead of breaking lines.
- Multi-line composite literals: trailing comma, closing brace on its own line aligned with opening indentation.

---

## Naming

### General
- `MixedCaps` or `mixedCaps` — never underscores. Underscores are reserved for generated code and test function names.
- Name length proportional to scope size. "Extraneous information" in tight scopes adds noise; clarity is needed in larger ones where context is absent.
- Omit type from names — "the compiler always knows the type of a variable, and in most cases it is also clear to the reader what type a variable is by how it is used."
- Don't repeat package name in exports — at the call site, package and receiver are already visible. `yamlconfig.Parse` not `yamlconfig.ParseYAMLConfig`.

### Packages
- Lowercase, single unbroken word. Avoid `util`, `common`, `helper` — "uninformative names make the code harder to read, and if used too broadly they are liable to cause needless import conflicts."

### Constants
- `MixedCaps`. "Name by role, not value" — prevents meaningless definitions like `const Twelve = 12`.

### Initialisms
- Consistent case: `XMLAPI`, `IOS`. Preserve standard prose form when possible (`gRPC`, `iOS`).

### Receivers
- One or two letters, abbreviate the type name, consistent across all methods. Brevity reduces repetition — the receiver appears on every method.

### Getters
- Omit `Get` prefix. "Prefer starting the name with the noun directly."

### Shadowing
- Be careful in nested scopes — "after the inner block, code may mistakenly reference the outer variable believing it was updated." Never shadow standard-library package names — renders the package's functions inaccessible in that scope.

---

## Comments & Documentation

- All exported names require doc comments — "doc comments appear in Godoc and are surfaced by IDEs."
- Begin with the name being documented; complete sentences. Comments explain *why*; code explains *what*.
- Package comments immediately above `package` clause, no blank line.
- Named result parameters: use when (a) multiple same-type returns, (b) caller must act on a specific result, (c) values must change in deferred closures. "Clarity is always more important than saving a few lines." Avoid naked returns in medium-to-large functions.
- Runnable examples in `*_test.go` — "easier to test" than static documentation, reducing staleness.
- Signal-boosting comments: annotate non-obvious conditions (`// if NO error`) where logic could easily be misread.

---

## Imports

Grouping "makes it easy to scan" and maintains consistency.

- Order: stdlib, then project-internal, then other/vendored. Blank line between groups.
- Rename only to avoid collisions — "try to be consistent by always using the same local name."
- Never `import .` — "it makes it harder to tell where the functionality is coming from."
- Blank imports only in `main` or tests — "constraining side-effect imports to the main package helps control dependencies."

---

## Errors

### Structure
- Return `error` as the last result. Return the interface, not a concrete type — a concrete `nil` pointer "wrapped into an interface becomes a non-nil value."
- Give errors structure "when callers need to interrogate the error programmatically rather than performing string matching."
- Avoid in-band error signals — "failing to check for an in-band error value can lead to bugs and can attribute errors to the wrong function."

### Error strings
- Lowercase, no trailing punctuation — "error strings usually appear within other context before being printed."

### Wrapping
- `fmt.Errorf("context: %w", err)` with `%w` at the end — "allows callers to programmatically inspect the error chain."
- `%v` instead of `%w` when crossing system boundaries or when the original error's structure is irrelevant.
- Don't duplicate information already present in the wrapped error.

### Handling
- Handle immediately; never discard with `_` without comment — explicit handling "makes a deliberate choice."
- Don't log errors you return — "giving the caller control helps avoid logspam."
- Indent the error path: "this improves the readability of the code by enabling the reader to find the normal path quickly."

### Panics
- "A stack trace will not help the reader" in typical error scenarios — return `error` instead.
- Internal panics that never cross package boundaries are acceptable; the package must have a matching `recover`.
- `MustXYZ`: only at startup — "must signals that the program halts on failure."

---

## Package & API Design

### Interfaces
- Define in the *consuming* package — "new methods can be added to implementations without requiring extensive refactoring." Premature interfaces "result in unnecessary API verbosity."
- Return concrete types. Define only when used.

### Functions & Signatures
- Prefer synchronous — "synchronous functions keep goroutines localized within a call." It's "harder (sometimes impossible) to remove unnecessary concurrency at the caller side."
- "As more parameters are added, the role of individual parameters becomes less clear, and adjacent parameters of the same type become easier to confuse."
- **Option structs**: struct literals are "self-documenting and harder to swap" than positional arguments. Structs grow without breaking call sites; zero values are defaults.
- **Variadic options**: "options take no space when unneeded; can share options, write helpers, accumulate them." Use when most callers need no configuration.
- Don't pass pointers to save bytes for strings/interfaces — pointer passing adds "unnecessary coupling" and signals mutability.

### Receiver type
- "Correctness wins over speed or simplicity." Mutation requires pointer; `sync.Mutex` types cannot be safely copied. When uncertain, default to pointer.
- Be consistent per type.

### Generics
- "Many applications work just as well without the added complexity." Use only when business requirements justify.

### Type aliases
- `type T1 T2` for new types; `type T1 = T2` only for package migration — aliases are "rare; their primary use is to aid migrating packages."

---

## Concurrency

"Leaving goroutines in-flight when they are no longer needed can cause subtle and hard-to-diagnose problems."

- Document whether operations are safe for concurrent use. Don't document that read-only operations are safe — readers assume this.
- Make goroutine exit conditions explicit. Use context, WaitGroups, or channels.
- Specify channel direction — "the compiler catches simple errors" and direction "conveys a measure of ownership."

---

## Common Patterns

### Contexts
- First parameter, named `ctx`. Never a struct field — "contexts represent the lifetime of a single call, not of an object."
- "Go programs pass contexts explicitly along the entire function call chain" — don't create custom context types.
- Don't document that context cancellation interrupts functions — "this fact does not need to be restated."

### Copying
- Don't copy structs with `sync.Mutex` or pointer fields — "can hide unexpected aliasing and similar bugs."

### Switch
- No `break` at end — "unlike in C and Java, switch clauses in Go automatically break." Explicit break is dead code.

### Nil slices
- "For most purposes, there is no functional difference between nil and the empty slice." Prefer `var s []T` (nil).

### Formatting
- Use `%q` for strings — "`%q` stands out clearly" whereas empty string in `%v` "can be very hard to notice."
- `if result == "foo"` not `if "foo" == result`.
- Use `any` over `interface{}` — "equivalent and easily interchangeable," cleaner to read.

---

## Flags & Logging

- Flag names: `snake_case`. Flag variables: `camelCase`.
- Define flags only in `main` — "general-purpose packages should be configured using Go APIs, not by punching through to the command-line interface."
- Propagate initialization errors to `main`; use `log.Fatal` with "human-readable, actionable messages."

---

## Testing

### Failure messages
- `YourFunc(%v) = %v, want %v` — helps diagnosis "without reading the test's source." Got before want.
- Compare full structs with `cmp.Diff` — avoids errors from "hand-coded field-by-field comparison."

### Structure
- Table-driven when multiple cases share validation. Omit zero-value fields — named fields "improve readability and prevent confusion from positional parameters."
- Keep validation in the test function — "failure messages and the test logic are clear."
- Call setup functions explicitly — "tight scoping clarifies dependencies."

### Helpers
- `t.Helper()` in helpers — fixes line numbers in failure output.
- `t.Fatal` when subsequent steps are meaningless; `t.Error` to keep going — "a developer fixing the failing test doesn't have to re-run the test after fixing each bug to find the next bug."
- Never `t.Fatal` from a non-test goroutine — violates the `testing` package contract.

### Stability
- Compare semantically stable data — formatted output "may change; the test may break if the json package changes how it serializes the bytes."

### Assertions
- Don't create assertion libraries — they "tend to either stop the test early or omit relevant information."

---

## Variable Declarations

- `:=` for non-zero initializations — idiomatic, concise.
- `var x T` for zero values — "conveys intent: an empty value ready for later use."
- Preallocate only when size is known — "wasteful overallocation can waste memory or even harm performance." Benchmark first.
- Specify channel direction where possible — compiler catches errors and direction conveys ownership.
