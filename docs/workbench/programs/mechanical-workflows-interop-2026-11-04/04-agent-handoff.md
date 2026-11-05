# 04 — Agent instructions for implementation and review

Use `.agents/skills/pi-mechanical-interop/SKILL.md` and the matching Mechanical repo skill. Each cut is independently owned and must bring code, tests, the relevant user-facing docs, a truthful status update and real gate receipts. Preserve the distinction between this program (design) and already-verified code.

## First read

1. Fetch both repos and capture exact default branch SHAs, blob SHAs of affected files, installed SDK versions and any unlanded local/agent work. Never audit just the old Pi `master` baseline without checking Workbench code; `master` now contains the former implementation branch.
2. Read the complete target module and `AGENTS.md`, W11 feature row, Mechanical `docs/04`, `docs/05`, `contracts/entrypoints/development.v1.json`, `entrypoint-host.ts`, `installed-host.ts`, `develop.ts` and `contracts.ts`.
3. Inspect Pi `new-feedback/`, outstanding owner/flywheel branches, Beads ready/blocked status from its authoritative workspace; distinguish producer receipts from docs claims. Do not mine the ledger as a source of synthetic live evidence.
4. Build one failing test at the **real consumer seam** before modifying production. Report the failing command and first relevant assertion; fix, rerun positive and mutant, run Forge gate, update the matching docs/skill and receipt.

## Code ownership map

- Pi owns `src/workbench/execute-tool.ts`, `execute.ts`, `native-modules.ts`, `src/index.ts`, `hosts/mechanical-functions.ts` (proposed), observation projection, live control and UI.
- Mechanical owns the canonical descriptor and schema, packaged `develop` export, `apps/development-rig` application binding and source-scope services, `packages/development` policies. Do not introduce a Pi import into its provider-neutral packages.
- Furnace stays runtime authority; do not implement new automatic retries, a global workflow graph, or a durable journal for Furnace Attempts. Forge stays build/gate authority. Beads stays readiness authority.
- No use of Forge/Furnace as dependencies of each other; only the application composition root may call each for its independent job. No Library dependency.

## Handoff contract for each change

```text
baseline sha / source paths:
specific behavior to change:
owner repo and producer authority:
supported API/version confirmed by installed code:
one negative reproducer and one positive journey:
observed code vs planned code:
permissions, effects, cancellation and retention:
native evidence/identity and no-false-PASS predicate:
timing/resource budget and control behavior:
Forge commands run and exact outcomes:
docs, skill, source map, feature matrix and receipt updates:
remaining blockers and next safe independent cut:
```

### Not acceptable

- A README that calls a future invocation runnable or hides its missing grant/host implementation.
- A test that creates a hand-written descriptor rather than loading the descriptor Pi will read.
- An unconditional `node()` call that blocks for the entire long-lived Mechanical development task.
- A fake Forge PASS or a native ID constructed from a Pi-only execution index.
- A successful `git status` interpreted as a preservation guarantee after failed commit.
- A model answer reused across changed source/instructions on the basis of equal prompt alone.
- A claimed real integration based only on fixture, test count or previously measured independent component journeys.
