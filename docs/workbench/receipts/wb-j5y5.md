# wb-j5y5: [MWI-release] Require test-first machine cuts and evidence-backed slice status

## 2026-11-06 release validator for the MechanicalWorkflows interop program (slice PI-7, explicitly partial)

Seat ws-05 of run g10-work-s228 cut this on trunk 814dcdd01bec171673ff17d085296276a140e15b and merged trunk b98329095bfd03d4f9f58291ecaad39a0a252076 (landing 1006) into the branch before handoff. The program is mechanical-workflows-interop-2026-11-04 (epic wb-1a3t). This cut serves requirements EAT-R082 to EAT-R087 of the program's triage/requirements/ATOMIC-REQUIREMENTS.md at rig master 0b25e14e084a5b1d612e780bc12a927b3a80dd62, which is a master-only archive.

What landed:

- `qa/workbench/mwi-release.mjs` is the release validator. It holds pure judges for four things: the release block of a per-bead receipt (EAT-R083, EAT-R085, EAT-R086), the forge build gate envelope (EAT-R084), the same-cut W11, skill and program-docs pointers with the W11 rules (EAT-R082), and the cut's immutable and added paths (EAT-R087). Its CLI judges a Git cut: `node qa/workbench/mwi-release.mjs --base <rev> [--head <rev>] [--commit <rev>] [--gate-envelope <path>]`.
- `test/workbench-mwi-release.test.ts` has one describe block per requirement. Each block feeds the requirement's adversarial mutant to the judges as an input they must refuse. Two more blocks run the CLI over a scratch Git repository and judge the real tree.
- `test/fixtures/h2-close-condition-roster.json` extends one frozen witness. The H2 close-condition census's Q6 quiet row (R-STORE) lists every executable file that names the bead export, and the validator now reads that export, read-only, for its real-bead check. The witness gains `qa/workbench/mwi-release.mjs` and the census assertion stays exact.
- The W11 row of `docs/workbench/feature-matrix.md` no longer carries the stale detection sentence. A dated re-measurement replaces it, and the row states that the program has no live slice. W11 stays planned.

What this receipt does not claim:

- No slice is live, and no Mechanical invocation exists. The validator calls no Mechanical code.
- This cut does NOT CLAIM that every program bead's receipt carries the release block. The test judges each receipt that carries one, and receipts cut before this contract carry none.
- The project skill and the program docs are absent at this base, and both land with wb-12x1. This cut therefore updates neither. Its release block names both as blockers, which is the form the validator requires of a partial claim.

```mwi-release
contract: workbench.mwi-release/v1
program: mechanical-workflows-interop-2026-11-04
bead: wb-j5y5
slice: PI-7
slice status: partial
requirements: EAT-R082, EAT-R083, EAT-R084, EAT-R085, EAT-R086, EAT-R087
real infrastructure gate: none
baseline sha / source paths: 814dcdd01bec171673ff17d085296276a140e15b; qa/workbench/mwi-release.mjs, test/workbench-mwi-release.test.ts, test/fixtures/h2-close-condition-roster.json (Q6 witness), docs/workbench/feature-matrix.md (W11 row), docs/workbench/receipts/wb-j5y5.md
specific behavior to change: add a release validator for program cuts; before this cut nothing judged a slice claim, a bead receipt, a gate envelope or a cut's TRACEABILITY and receipt paths
owner repo and producer authority: Pi (pi-subagents); the validator reads forge's build result envelope (result-envelope/v1) and the in-tree bead export, and calls no producer
supported API/version confirmed by installed code: marked, the lexer qa/workbench/receipts-index.mjs already uses, and git 2.50.1; no producer API is called
one negative reproducer and one positive journey: negative: each of the six adversarial mutants is a refused input; positive: the control receipt, the control envelope and a slice cut that updates W11, the skill and the program docs all pass, and the CLI closes a committed scratch cut only on an envelope keyed to its commit
observed code vs planned code: observed: the validator and its tests; planned: none in this cut
permissions, effects, cancellation and retention: none: the judges are pure; the CLI reads Git and files and writes only stdout
native evidence/identity and no-false-PASS predicate: a gate envelope passes only when its gated_commit equals the candidate, its status is success, gate_verdict is PASS, gate_passed is true, every [build] gate leg passed, nothing was narrowed and a cmd_ command id is present
timing/resource budget and control behavior: not run: no timing claim; every vitest run here is capped with VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8
Forge commands run and exact outcomes: the lint and typing steps ran under the supervised ritual-check Attempt frn-atm-fw-wisp-bfs8ea-1 of Furnace Run frn-run-fw-wisp-pjo0vn (Attempt exit 0) on the delivered bytes, forge envelopes cmd_073caa869123 (lint) and cmd_540f1f07c1d4 (typing), both status success; an earlier ritual, Attempt frn-atm-fw-wisp-voy1dx-1 of Run frn-run-fw-wisp-b4vbfh (exit 0, cmd_b89f767e3b84 and cmd_811ff4d9ab77), ran before the CLI flag rename; the complete gate (forge build --require-complete --no-replay --keep-going --json) is not run by this seat, because the machine gate lane runs it on the collected commit
docs, skill, source map, feature matrix and receipt updates: docs/workbench/feature-matrix.md W11 row (stale detection sentence replaced; status stays planned); docs/workbench/receipts/wb-j5y5.md
remaining blockers and next safe independent cut: .agents/skills/pi-mechanical-interop/SKILL.md and docs/workbench/programs/mechanical-workflows-interop-2026-11-04/ are absent at base 814dcdd (both land with wb-12x1), so this cut updates neither; the next safe independent cut is any program bead's first cut, with this block in its receipt
red command: VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-mwi-release.test.ts
red result: 89 failed | 14 passed (103), against an accept-everything stub of qa/workbench/mwi-release.mjs (real constants and block parser, judges that return no finding)
first failing assertion: expected [] to deeply equal [ 'field-duplicate', 'line-malformed' ]
positive rerun: VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-mwi-release.test.ts -> 103 passed (103)
mutant EAT-R082: accept a W11 status turned landed-gated without a witnessed live gate -> 1 failed | 97 passed | 5 skipped (103), the real-tree rows filtered out; restore the retired detection sentence in the W11 row -> 1 failed | 102 passed (103); set the W11 row landed-gated from source existence alone -> 1 failed | 102 passed (103)
mutant EAT-R083: accept a red result that reports no failure -> 1 failed | 97 passed | 5 skipped (103); accept a positive rerun of another seam -> 1 failed | 97 passed | 5 skipped (103)
mutant EAT-R084: accept an old commit's gate -> 2 failed | 96 passed | 5 skipped (103); accept an exit echo or a CI record -> 1 failed | 97 passed | 5 skipped (103)
mutant EAT-R085: silently accept a skipped live producer tier -> 1 failed | 97 passed | 5 skipped (103)
mutant EAT-R086: accept a fabricated wb identifier -> 1 failed | 97 passed | 5 skipped (103); accept an omitted not-run label -> 12 failed | 86 passed | 5 skipped (103)
mutant EAT-R087: accept a global status row appended to TRACEABILITY -> 2 failed | 96 passed | 5 skipped (103)
```
