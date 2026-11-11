# Live two-candidate planning, selection, review and Forge gate

`selectAndVerifyCandidate()` ran once against a disposable copy of the scratch
Forge Python package at clean base `03a0fa58ae891af5af419f0a4d2779e82e9611ed`
with the task of adding a typed `triple()` function and test.

| Stage | Native identity | Result |
| --- | --- | --- |
| Candidate 1 | worktree branch `mw/candidate/03a0fa5-1-f44bac`, agent session `47d2a24c-2e9c-4cfc-8c19-39a8f0a43aa2` | commit `6ffb4ba2f0b3b9112c323a2c90a3f69063592c08`, parent base, 2 files |
| Candidate 2 | worktree branch `mw/candidate/03a0fa5-2-59a0d6`, agent session `0cf0ba05-12d6-41ea-8ed7-56bfef43e1f0` | commit `979913f771f87e7d1dbffe2dac9210e0f0c43c48`, parent base, 2 files |
| Choice | selection session `68627d1e-b5e4-4712-af63-13b517595d3b` (schema constrained to the two commits) | `6ffb4ba…` |
| Review | review session `8bf9e82f-76b9-4fac-8aa2-3ea22d179321`, run in the chosen worktree | approved |
| Forge gate | operation `op-fb06d404717445c0990959b835ec0a7e`, run in the chosen worktree | PASS at `6ffb4ba…` |
| Main checkout | `03a0fa5`, clean, no worktrees left | untouched |

Evidence: `evidence/2026-10-15-candidate-selection-journey.json`; the root
Forge `evidence` step checks that both candidates descend from the base, that
the choice is a planned commit, that review and gate name the chosen commit,
and that the two agents, the chooser and the reviewer are four distinct
sessions.

## What this establishes

Two agent sessions produced isolated committed candidates from one base
without touching the main checkout; one schema-constrained read-only session
chose between them; the chosen commit was reviewed and verified by a native
Forge gate at its own worktree, and the main checkout stayed clean. The
non-chosen commit remains referenced by its branch.

## What this does not establish

- Both candidates were near-identical for this trivial task, so the choice
  did not discriminate much; selection quality is unmeasured.
- Chooser and reviewer verdicts are model observations; the Forge operation
  is the only verification and it verified the scratch package's own gate.
- Git worktrees give filesystem isolation only; this is not Forge Workspace
  Families, and candidate integration into `main` was not performed.
- One run, no cost or latency series, no Beads claim, Furnace Run, HX scope
  or RF context.

## CLI consumer witness (2026-10-15, later the same day)

The selection host is now reachable from the rig CLI as `--live-select --allow-writes --workspace <pkg> --task <text> --candidates N` (`apps/development-rig/src/live-select-cli.ts`). One real run on a fresh clone of the scratch package at `ce0657c`, two candidates, 103 s, exit 0:

| fact | value |
| --- | --- |
| planned candidates | `0522b07` (agent session `7bbbe691-5f53-4728-b37f-f1227955699f`), `b7fff14` (session `42a89f01-d975-44e2-934e-fd17c959abb9`) |
| excluded | none |
| chooser session | `ddbd208d-b0b7-4acc-90ac-54f92205e416` chose `0522b07` |
| review | `approved` (`4cb5f245-b52c-4120-b8e8-9c9b59aa3a84`) |
| Forge gate at the chosen commit | `passed`, `op-9c4583f427c34d84a04e4a2e7d52c2fb` |
| main checkout after | HEAD unchanged, clean; two candidate branches kept, worktrees removed |

Evidence: `evidence/2026-10-15-live-select-cli.json`. This closes WP-B's "actual consumer" clause: planning, selection, review and repair each have a CLI or library consumer with positive and negative decision tests (`packages/development/test/review.test.ts`, `repair.test.ts`; `apps/development-rig/test/candidate-selection.test.ts`, `cli.test.ts`).

## Integration re-verification witness (2026-10-15, `--integrate`)

`--live-select --integrate` adds, after a reviewed candidate, an explicit integration check: the base must still equal the planned basis (`baseUnchanged`), the chosen commit must fast-forward onto it (`fastForward`), and the chosen commit is gated a second time in a fresh worktree the agent never touched (`reverification`). The host still never moves the base ref; moving it is the operator's explicit act, now made safe by a stated, twice-verified fast-forward basis. Isolation is git worktrees: Forge workspace families remain `DESIGN / NOT IMPLEMENTED` at Forge `7f22b8d90211`, and the measured (N + 1)-gate cost was filed to Forge as a capability request.

| fact | value |
| --- | --- |
| base | `ce0657c`, unchanged after selection |
| candidates | `e987421` (session `6cc2a4f5-d2ef-4faf-b5fb-e3096f219b31`), `9e71a4d` (session `0d111f18-c486-4ad1-b052-9149677fa786`) |
| chosen / review | `e987421` / `approved` |
| first gate (agent worktree) | `op-57f13950f4874265aa32406f60a01e65` |
| re-gate (fresh worktree) | `op-980ae7634d144fe69ff195df464930fa`, verdict `passed` |
| integration | baseUnchanged `True`, fastForward `True`, verified `True` |
| wall / exit | 133 s / 0; main checkout clean, worktrees removed, two candidate branches kept |

Evidence: `evidence/2026-10-15-live-select-integrate.json`. Unit controls: a failed re-gate leaves `verified=false` with `INTEGRATION_REVERIFICATION_NOT_PASSED`; a base that moved during selection is `INTEGRATION_BASE_MOVED` with no second gate (`apps/development-rig/test/candidate-selection.test.ts`).
