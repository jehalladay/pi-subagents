# wb-a3s.1: sanitizer corpus gains a DIRECT-CALLER row for the forge_gate_run catch, driven through a hoisted @forge/sdk fake that rejects initialize with the probe text

## 2026-10-17 receipt: the forge_gate_run catch joins the corpus SITES (branch machine/flywheel/wb-a3s.1, seat ws-02, run g6-work-s1)

- Base: trunk `39aa5ae`. Scope: test-only, zero `src/` diff; the catch in `src/index.ts` keeps its one helper call (`sanitizeWorkbenchText`, text layout).
- Row: `test/workbench-sanitizer-corpus.test.ts` SITES gains "src/index.ts forge_gate_run catch (DIRECT-CALLER, the forge connection error text)". The corpus file declares the `vi.mock("@forge/sdk")` (a mock is registered per test file) over a `vi.hoisted` seam; `ServerConnection.spawn().initialize()` rejects with `new Error(probe.raw)`. The driver `test/helpers/forge-gate-catch.ts` boots the real extension once with grants `["forge:run"]` in a scratch workspace, calls the registered `forge_gate_run` on a target inside it, and returns the reply text; `expectClean` runs over the corpus and the acceptance set like every other row. A non-vacuity row pins that a plain refusal comes back as the reply, so a seam that never reaches the catch cannot pass.
- Display paths added: none. The row exercises the existing catch, which routes through `sanitizeWorkbenchText` (text layout).
- Red, measured by a throwaway mutant of the catch that returned the raw message (reverted before commit): `-t "forge_gate_run catch"` on the corpus file `102 failed | 4 passed | 3417 skipped (3523)`.
- Green: the whole corpus file `3524 passed (3524)`; `forge run lint` and `forge run typing` exit 0; `typecheck:test` reports the same 49 pre-existing errors as the base, none in these files.
- Era statement: wb-era's source-hygiene grep ran over my files and returned nothing (`git grep -lP` over src test qa, rc 1).
