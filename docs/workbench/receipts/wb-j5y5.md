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

## 2026-11-06 cut #2, the respin of refusal #1 (claim words held to their pins; docs read in the rendered view)

Seat ws-02 of run g10-work-s230 cut this respin on trunk 600a253c37568338ff24e4ab187803b14f35e051 (landing 1011), merged into the branch over cut #1 (9c3cd8350ac4611997983cd2c7dafc4d639588a6), which PREP F refused as refusal #1. The respin cures the refusal's five unmet items U1 to U5 and carries its findings F1, F2 and F4.

What changed:

- U1, the CLI and candidate-keying words. The CLI finds host modules at any depth under `src/workbench/hosts/` through Git: in the working tree, the tracked files and the untracked files that the ignore rules keep; at a committed head, every blob `git ls-tree -r` lists. A module names MechanicalWorkflows when its text holds the word mechanical in any case. `--commit` must name the cut's head commit, so it needs `--head`. Pinned rows: a working-tree, a committed and a tracked host module under a no-binding-host W11 row (exit 1, w11-absence-stale); a nested module and a lower-case `@mechanical/` import; an ignored file, which is no host module; each flag given twice (exit 2); a candidate that is not the head, or has no head (exit 2); the CLI run from a subdirectory; and a live claim judged without a candidate beside W11 landed-gated (refused, with closure reasons noEnvelope and unkeyed).
- U2, the receipt-scope and block-reading words. A cut's added release blocks are the blocks of a changed per-bead receipt that the receipt did not hold at the cut base, text for text. An appended, an inserted and an edited block are all judged, and a base block is not judged again. Pinned rows: those shapes and a second copy of a base block; the info strings `mwi-releases`, `mwi-release extra`, `mwi-release-v2`, `xmwi-release`, `MWI-RELEASE` and `Mwi-Release` (no block); a tilde fence and a padded info string (read); blocks nested in a blockquote, a nested blockquote and both list kinds (not read); and blank lines inside a block.
- U3, the pointer-naming and W11-section words. Pinned rows: each of the three pointers unnamed on the docs line; each pointer absent at base and head, under a partial and a live claim; a level-3 subsection inside W11; a level-1 heading that ends W11; and the no-binding-host statement in its hyphenated, upper-case, emphasised and `&nbsp;` spellings.
- U4, the envelope-predicate and seam words. The envelope judge also requires `data.invocation.path` to be `.`. A forge run tier is a real seam only when `forge.toml` declares it, as a `[build]` gate leg or a `[build.commands.<tier>]` table. Pinned rows: envelopes without data or without steps; an absent, null or array invocation; a string `only` or `skip`; a missing `only`, `skip` or `path`; the path `src`; seven malformed command ids and a non-string one; a census-file seam and a `./`-prefixed seam; a declared and an undeclared forge tier; and a `0 passed` rerun.
- U5, the g8 docs-section floors. Every docs rule now reads marked's rendered view (`renderedText`, `markdownSection`). The W11 section is found by its heading's rendered text. The matrix must hold exactly one W11 heading in that same view (w11-heading-not-unique). Raw HTML inside W11 is refused (w11-html), and so is a status outside the matrix's legend (w11-status-unknown). A row turns landed-gated per Feature cell. The plants P1 to P5 of the refusal are test rows, and the real-tree rows read the rendered view with heading uniqueness, so a duplicate W11 section at the end of the file (TP1) and the validator sentence wrapped in an HTML comment (TP2) both go red.
- F1: the Forge line below states the ritual's tree and the module's scope exclusions. It also corrects cut #1's Forge line above: cut #1's ritual ran on trunk 814dcdd plus that cut, before trunk b98329095b was merged, and its lint and typing steps did not read `qa/workbench/mwi-release.mjs`. F2: the feature matrix's Not claimed W11 line is dated and points at the W11 row, and the real-tree rows hold its no-binding-host statement to `src/workbench/hosts/`. F4: the unkeyed closure reason is pinned.

What this entry does not claim:

- No slice is live, and no Mechanical invocation exists. The validator calls no Mechanical code.
- A gate envelope's selection accounting, replay or warm-memo state is NOT CLAIMED. The judge reads the invocation's only, skip and path and each required leg's step status.
- Rendering by any engine other than marked is NOT CLAIMED, and so is a forge run tier declared other than as a `[build]` gate leg or a `[build.commands.<tier>]` table.
- The project skill and the program docs are still absent at this base (both land with wb-12x1), so this cut updates neither, and its release block names both as blockers.

```mwi-release
contract: workbench.mwi-release/v1
program: mechanical-workflows-interop-2026-11-04
bead: wb-j5y5
slice: PI-7
slice status: partial
requirements: EAT-R082, EAT-R083, EAT-R084, EAT-R085, EAT-R086, EAT-R087
real infrastructure gate: none
baseline sha / source paths: 600a253c37568338ff24e4ab187803b14f35e051; qa/workbench/mwi-release.mjs, test/workbench-mwi-release.test.ts, docs/workbench/feature-matrix.md (Not claimed W11 line), docs/workbench/receipts/wb-j5y5.md
specific behavior to change: cure refusal #1 of cut #1: hold the validator's claim words to pinned behavior, read docs in marked's rendered view with heading uniqueness, find host modules at any depth through Git, and require a declared forge run tier, an invocation path of . and a candidate equal to the cut head
owner repo and producer authority: Pi (pi-subagents); the validator reads forge's build result envelope (result-envelope/v1), forge.toml, the in-tree bead export and Git, and calls no producer
supported API/version confirmed by installed code: marked 18.0.11 (its Lexer, which qa/workbench/receipts-index.mjs also uses) and git 2.50.1; no producer API is called
one negative reproducer and one positive journey: negative: the refusal's witnesses W1 to W44 and plants P0 to P5c, TP1 and TP2 are test rows, and each of 114 one-edit mutants of the module and the feature matrix is refused by at least one row; positive: the control receipt, the control envelope and the slice cut pass, and node qa/workbench/mwi-release.mjs --base 600a253c37568338ff24e4ab187803b14f35e051 over this cut's working tree exits 0 with no finding, judging both release blocks of this receipt, closure open without an envelope
observed code vs planned code: observed: the validator and its tests; planned: none in this cut
permissions, effects, cancellation and retention: none: the judges are pure; the CLI reads Git and files and writes only stdout
native evidence/identity and no-false-PASS predicate: a gate envelope passes only when it is a forge build result-envelope/v1 envelope with a data record, data.gated_commit is the candidate, its status is success, gate_verdict is PASS, gate_passed is true, every [build] gate leg has a passed step, data.invocation is present with empty only and skip lists and path ., and ids.command_id is cmd_ and twelve lower-case hex digits
timing/resource budget and control behavior: not run: no timing claim; every vitest run here is capped with VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8
Forge commands run and exact outcomes: the lint and typing steps ran as one supervised ritual-check Attempt of Furnace, whose run and attempt ids are on the delivery note's ritual line and the ledger's ritual-check row for run g10-work-s230, over the seat worktree tree that holds every delivered byte of this cut (trunk 600a253 merged into cut #1, plus the cut #2 bytes, uncommitted); that clean claim excludes qa/workbench/mwi-release.mjs, which biome's files.includes (src/**/*.ts, test/**/*.ts) leaves unlinted and tsconfig.test.json's checkJs false leaves untype-checked, in the ritual and in the complete gate alike; a one-off tsc 6.0.3 --ignoreConfig --checkJs --strict --types node run over the module reads 0 errors (cut #1's TS2322 at RECEIPT_ITEMS is cured); the complete gate (forge build --require-complete --no-replay --keep-going --json) is not run by this seat, because the machine gate lane runs it on the collected commit
docs, skill, source map, feature matrix and receipt updates: docs/workbench/feature-matrix.md Not claimed W11 line (dated, pointing at the W11 row); docs/workbench/receipts/wb-j5y5.md
remaining blockers and next safe independent cut: .agents/skills/pi-mechanical-interop/SKILL.md and docs/workbench/programs/mechanical-workflows-interop-2026-11-04/ are absent at base 600a253 (both land with wb-12x1), so this cut updates neither; the next safe independent cut is any program bead's first cut, with a release block in its receipt
red command: VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-mwi-release.test.ts
red result: 48 failed | 159 passed (207), the cut #2 test against the cut #1 module (sha256 b1f483523ff4b119...) on the merged tree
first failing assertion: expected [] to deeply equal [ 'seam-missing' ]
positive rerun: VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-mwi-release.test.ts -> 207 passed (207)
mutant EAT-R082: accept a W11 status turned landed-gated without a witnessed live gate -> 17 failed | 181 passed | 9 skipped (207), the real-tree rows filtered out; end the W11 section at a level-3 heading -> 2 failed | 205 passed (207); drop the one-W11-heading rule -> 1 failed | 206 passed (207); read the W11 cells raw instead of rendered -> 9 failed | 198 passed (207); restore the retired detection sentence in the W11 row -> 1 failed | 206 passed (207); add a duplicate W11 section at the end of the matrix -> 4 failed | 203 passed (207); wrap the W11 row's validator sentence in an HTML comment -> 3 failed | 204 passed (207)
mutant EAT-R083: accept a red result that reports no failure -> 1 failed | 197 passed | 9 skipped (207), the real-tree rows filtered out; accept a positive rerun of another seam -> 2 failed | 196 passed | 9 skipped (207); drop the forge run tier seams -> 2 failed | 205 passed (207); accept an undeclared forge run tier -> 2 failed | 205 passed (207); judge only the release blocks of added receipts -> 4 failed | 203 passed (207)
mutant EAT-R084: accept an old commit's gate -> 2 failed | 196 passed | 9 skipped (207), the real-tree rows filtered out; accept an exit echo or a CI record -> 1 failed | 197 passed | 9 skipped (207); accept an envelope without an invocation -> 1 failed | 206 passed (207); accept any string as the command id -> 7 failed | 200 passed (207); accept a gate run at another path -> 1 failed | 206 passed (207); accept a leg listed twice -> 1 failed | 206 passed (207)
mutant EAT-R085: silently accept a skipped live producer tier -> 1 failed | 197 passed | 9 skipped (207), the real-tree rows filtered out; let a claim judged without a candidate witness W11 -> 1 failed | 206 passed (207); let a claim with an EAT-R085 finding witness W11 -> 1 failed | 206 passed (207)
mutant EAT-R086: accept a fabricated wb identifier -> 1 failed | 197 passed | 9 skipped (207), the real-tree rows filtered out; accept an omitted not-run label -> 12 failed | 186 passed | 9 skipped (207); read a fence whose info string only starts with mwi-release -> 3 failed | 204 passed (207); read a block nested in a blockquote -> 1 failed | 206 passed (207)
mutant EAT-R087: accept a global status row appended to TRACEABILITY -> 2 failed | 196 passed | 9 skipped (207), the real-tree rows filtered out; refuse a new index only under the receipts -> 1 failed | 206 passed (207); refuse a new index only under docs/workbench/ -> 1 failed | 206 passed (207)
```
