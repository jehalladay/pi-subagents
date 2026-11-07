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

## 2026-11-07 cut #3, the respin of refusal #2 (the frozen claim words in the enumerate form; the rendered-view words pinned)

Seat ws-06 of run g10-work-s233 cut this respin on trunk fd90f9d3a9c7e9c1a7bab2690885cddc4424c9f9 (landing 1014), merged into the branch over cut #2 (8f5ccac12119ecd817de1771efb7432c02f06487), which PREP F refused as refusal #2. Rulings R-B641 and R-B654 froze the claim words of the validator and its test at a second-stage cap (rule 19(c)), so this cut takes the enumerate-the-resolvable form for them. The rendered-view words are at rung 1 of their own guard.

What changed:

- The validator's code is unchanged. Its doc comments now claim only the forms the test pins, and they name those forms. The header has a THE PINNED SET paragraph, a THE SEAMS paragraph and a THE GATE ENVELOPE paragraph, and its rendered-view, CLI and NOT CLAIMED paragraphs list the pinned forms. A RESIDUALS section names three escape families, and the test holds that section to its own residual table.
- U1, the envelope predicates. PREDICATE_FORMS pins the one passing value of each of the four predicates, and it pins every listed form as refused: the field left out, null, the empty string, another word, another case, a padded value, a longer word, a one-element array and a value of another type. This kills GP1 to GP4.
- U2, the seam spellings. The test pins seams with a digit, with underscores, in one and in two subdirectories and with an inner dot, and declared tiers with a digit or a leading digit. It pins each character that may sit just before or just after a test path, and it pins a path with nothing between test/ and its suffix. This kills GP5 to GP8. A forge run tier spelled with another character is the residual R-TIER-TRUNCATED.
- U3, the CLI revisions and the witness words. The test pins `--commit` and `--head` written as HEAD or as a 12-hex abbreviation, `--base HEAD~1`, and an unknown revision for `--head` or `--commit`. It pins each EAT-R085 finding a live or closed claim can carry beside W11 turned landed-gated, an EAT-R083 or EAT-R086 finding alone, and one clean claim beside a refused one. This kills GP9, GP10 and GP13.
- U4, the absence and pointer words. The test pins the absence words' boundaries on both sides and each separator between binding and host, in the singular and the plural. It pins design-only, partial, an unknown status, a status in another case and a block without a status line, each with undisclosed absent pointers. This kills GP11, GP12 and GP14. Other spellings of an absence statement are the residual R-ABSENCE-OTHER-WORDS.
- U5, the rendered view. The test pins both hard line breaks, a blockquote, a nested blockquote and a lazy continuation, links (inline, with a title, with a code-span text, and full, collapsed and shortcut references) and an autolink, both in renderedText and as a stale W11 absence statement. This kills GN1 to GN3. A reference whose definition lies outside the W11 section is the residual R-REFDEF-OUTSIDE.
- A one-edit discovery battery over the module's code lines ran 650 mutants against cut #2, and 133 survived. They sat in the release-block field readers, the forge.toml readers, the W11 heading and table readers, the rendered view, the receipt scope, the pointer rules and the CLI. Under this cut 85 of them are killed by new rows. 46 are equivalent, each with its reason in the delivery note, and 2 differ only on a form the header names NOT CLAIMED (a path removed from the index but kept in the working tree).

This entry narrows the claim lines of the two entries above. Where they say "a gate envelope passes only when", the claim is the pinned forms of THE GATE ENVELOPE in the validator's header and the test's PREDICATE_FORMS. Where they name seams, revisions or markup, the claim is the forms the header's paragraphs name. Any other form is NOT CLAIMED.

What this entry does not claim:

- No slice is live, and no Mechanical invocation exists. The validator calls no Mechanical code.
- A form that the header and the test rows do not name is NOT CLAIMED. The three residuals are named families with pinned quiet rows, not claims.
- The project skill and the program docs are still absent at this base (both land with wb-12x1), so this cut updates neither, and its release block names both as blockers.

```mwi-release
contract: workbench.mwi-release/v1
program: mechanical-workflows-interop-2026-11-04
bead: wb-j5y5
slice: PI-7
slice status: partial
requirements: EAT-R082, EAT-R083, EAT-R084, EAT-R085, EAT-R086, EAT-R087
real infrastructure gate: none
baseline sha / source paths: fd90f9d3a9c7e9c1a7bab2690885cddc4424c9f9; qa/workbench/mwi-release.mjs (doc comments only), test/workbench-mwi-release.test.ts, docs/workbench/receipts/wb-j5y5.md
specific behavior to change: cure refusal #2 of cut #2: state the validator's claim words as exactly the forms its test pins (the enumerate form of rule 19(c) for the words frozen at R-B641), pin each refusal #2 member and each non-equivalent one-edit survivor red-first, and name the escape families the validator is quiet on as residuals with quiet rows and live twins; no judge changes behavior
owner repo and producer authority: Pi (pi-subagents); the validator reads forge's build result envelope (result-envelope/v1), forge.toml, the in-tree bead export and Git, and calls no producer
supported API/version confirmed by installed code: marked 18.0.11 (its Lexer, which qa/workbench/receipts-index.mjs also uses) and git 2.50.1; no producer API is called
one negative reproducer and one positive journey: negative: each of refusal #2's 17 members and each of the 85 killed survivors of a one-edit discovery battery on cut #2 is refused by at least one row of the cut #3 test; positive: the control receipt, the control envelope and the slice cut pass, and node qa/workbench/mwi-release.mjs --base fd90f9d3a9c7e9c1a7bab2690885cddc4424c9f9 over this cut's working tree exits 0 with no finding, judging the three release blocks of this receipt, closure open without an envelope
observed code vs planned code: observed: the validator and its tests; planned: none in this cut
permissions, effects, cancellation and retention: none: the judges are pure; the CLI reads Git and files and writes only stdout and stderr
native evidence/identity and no-false-PASS predicate: the pinned forms of THE GATE ENVELOPE in qa/workbench/mwi-release.mjs's header and the test's PREDICATE_FORMS: status success, data.gate_verdict PASS, data.gate_passed true and one passed step per [build] gate leg each pass, and every listed other form is refused; with data.gated_commit the candidate, data.invocation present with empty only and skip lists and path ., and ids.command_id cmd_ and twelve lower-case hex digits
timing/resource budget and control behavior: not run: no timing claim; every vitest run here is capped with VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8
Forge commands run and exact outcomes: the lint and typing steps ran under the seat's ritual of record, whose Furnace run and attempt ids (or its typed fallback) are on the delivery note's ritual line and on the ledger's ritual-check row for run g10-work-s233, over the seat worktree tree that holds every delivered byte of this cut (trunk fd90f9d merged into cut #2, plus the cut #3 bytes, uncommitted); that clean claim excludes qa/workbench/mwi-release.mjs, which biome's files.includes (src/**/*.ts, test/**/*.ts) leaves unlinted and tsconfig.test.json's checkJs false leaves untype-checked, in the ritual and in the complete gate alike; a one-off tsc 6.0.3 --ignoreConfig --allowJs --checkJs --strict --types node run over the module reads 0 errors; the complete gate (forge build --require-complete --no-replay --keep-going --json) is not run by this seat, because the machine gate lane runs it on the collected commit
docs, skill, source map, feature matrix and receipt updates: docs/workbench/receipts/wb-j5y5.md (this entry); docs/workbench/feature-matrix.md is unchanged by this cut (the W11 row of cut #1 and the Not claimed W11 line of cut #2 stand, and the docs mutants of cut #2 still anchor on them)
remaining blockers and next safe independent cut: .agents/skills/pi-mechanical-interop/SKILL.md and docs/workbench/programs/mechanical-workflows-interop-2026-11-04/ are absent at base fd90f9d (both land with wb-12x1), so this cut updates neither; the next safe independent cut is any program bead's first cut, with a release block in its receipt
red command: VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-mwi-release.test.ts
red result: 83 failed | 374 passed (457), the cut #3 test against the cut #3 module with refusal #2's 17 members applied together (GP5 to GP7 and GP11 to GP12 as one composite edit each); the cut #2 test against the same module reads 0 failed | 198 passed | 9 skipped (207), the real-tree rows filtered out
first failing assertion: expected [ 'red-not-seam' ] to deeply equal []
positive rerun: VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-mwi-release.test.ts -> 457 passed (457)
mutant EAT-R082: let a claim with an EAT-R085 finding other than a closing-gate one witness W11 (refusal #2 member GP13) -> 8 failed | 449 passed (457); drop a blockquote's lines from the rendered view (GN2) -> 5 failed | 452 passed (457); require the blockers line of a partial claim only (GP14) -> 6 failed | 451 passed (457)
mutant EAT-R083: drop the digits from the seam path class (GP5) -> 5 failed | 452 passed (457); drop the digits from the forge run tier class (GP8) -> 3 failed | 454 passed (457)
mutant EAT-R084: pass every envelope status but failure (GP1) -> 14 failed | 443 passed (457); accept a required leg's step without a status (GP4) -> 1 failed | 456 passed (457)
mutant EAT-R085: drop the digits from a gate name's first part (A013) -> 1 failed | 456 passed (457); drop the start anchor of the full-sha pattern (A003) -> 4 failed | 453 passed (457)
mutant EAT-R086: swap the duplicate and malformed line rules (A108) -> 1 failed | 456 passed (457); parse a whitespace-only bead export line as JSON (A243) -> 1 failed | 456 passed (457)
mutant EAT-R087: judge an added path that holds the receipts directory anywhere as a receipt (A487) -> 1 failed | 456 passed (457); refuse an index added under any directory named docs (A483) -> 1 failed | 456 passed (457)
```

## 2026-11-07 cut #4, the respin of refusal #3 (the rendered-view words in the enumerate form; the field-value, TRACEABILITY and W11 reader words held to pin lists)

Seat ws-09 of run g10-work-s235 cut this respin on trunk 71b4a59fb4f9124f776a4378bce79b5aa027b8e6 (landing 1016), merged into the branch over cut #3 (7478d96306527af2e0c906efef525806707585b0), which PREP F refused as refusal #3, and merged trunk d758d3513bb03a45aec541bfefd58aa34e440de5 (landing 1018) into the branch before handoff. Refusal #3 asks for the structural exit of the claim words frozen at R-B641 to a child bead (its F13 (1)); this cut does not restate those words and leaves them as cut #3 wrote them. The rendered-view words are at their second-stage cap, so this cut takes the enumerate-the-resolvable form for them, and the three U6 word sets are at rung 1 of their own guards.

What changed:

- The validator's code is unchanged; only its doc comments change. The module header gains a THE PIN LISTS paragraph and, before RESIDUALS, a PIN LISTS section of 168 pin lines in six lists (RV and RH for the rendered view, FV and FG for the release block's field values, TR for TRACEABILITY, WR for the W11 heading, table and HTML readers). Each pin line is one case of the test, by id: the reader it calls, its input or pinned form, and the result. The test runs every case and holds the header's pin lines to its own rows, so a pin line and its case cannot drift apart.
- U5, the rendered-view words, at their second-stage cap (the enumerate-the-resolvable form of rule 19(c)). THE RENDERED VIEW paragraph now claims exactly the RV and RH pin lines, and a markdown input those lines do not hold is NOT CLAIMED. The function docs of decodeReferences, inlineText, tableCells, blockLines and renderedText refer their readings to those lines. The twelve members GR1, GR2, GR3, GR4, GR6, GR7, GR9, GR13, GR15, GR17, GR24 and GR26 are each refused by at least one row, and so are the PLAUSIBLE GR5 and GR28. A reference whose definition lies outside the W11 section stays the residual R-REFDEF-OUTSIDE.
- U6 (a), the field-value words of the release block. The first field bullet names the lines and refers the values of contract, program, slice, slice status, real infrastructure gate, gate tier and gate result to the FV and FG pin lines. GQ3 and GQ16 are refused.
- U6 (b), the immutable-path words. IMMUTABLE_PATHS refers judgeCut's traceability-changed reading to the TR pin lines. GQ85 is refused.
- U6 (c), the W11 heading, table and HTML reader words of walkTokens, headingTexts, w11Rows, w11Html, the w11-status-unknown bullet and judgeCut's heading-uniqueness clause. Each refers its readings to the RH or WR pin lines. GR20, GR21, GQ64, GQ66, GQ67 and GQ88 are refused.
- The test's real-tree row now expects four release blocks in this receipt, one per cut entry.

What this entry does not claim:

- No slice is live, and no Mechanical invocation exists. The validator calls no Mechanical code.
- For the rendered-view, field-value, TRACEABILITY and W11 reader words, an input that no pin line holds is NOT CLAIMED.
- The claim words frozen at R-B641 (the envelope, seam, CLI, block-reading, W11-section and pointer words of refusal #3 U1 to U4) are not restated by this entry or by this cut.
- The requirements EAT-R165 to EAT-R171 that the 2026-11-07 Phase 10 amendment on the bead adds are not served by this cut. The amendment's own rule defers them until the Nov-6 pins are carried per EAT-R172, which wb-cbt4 owns.
- The project skill and the program docs are still absent at this base (both land with wb-12x1), so this cut updates neither, and its release block names both as blockers.

```mwi-release
contract: workbench.mwi-release/v1
program: mechanical-workflows-interop-2026-11-04
bead: wb-j5y5
slice: PI-7
slice status: partial
requirements: EAT-R082, EAT-R083, EAT-R084, EAT-R085, EAT-R086, EAT-R087
real infrastructure gate: none
baseline sha / source paths: 71b4a59fb4f9124f776a4378bce79b5aa027b8e6; qa/workbench/mwi-release.mjs (doc comments only), test/workbench-mwi-release.test.ts, docs/workbench/receipts/wb-j5y5.md
specific behavior to change: cure refusal #3 of cut #3: state the rendered-view words as exactly the RV and RH pin lines (the enumerate form of rule 19(c) at the U5 cap), hold the field-value, TRACEABILITY and W11 reader words to the FV, FG, TR and WR pin lines, and refuse each U5 and U6 member red-first; no judge changes behavior
owner repo and producer authority: Pi (pi-subagents); the validator reads forge's build result envelope (result-envelope/v1), forge.toml, the in-tree bead export and Git, and calls no producer
supported API/version confirmed by installed code: marked 18.0.11 (its Lexer, which qa/workbench/receipts-index.mjs also uses) and git 2.50.1; no producer API is called
one negative reproducer and one positive journey: negative: each of refusal #3's twelve U5 and nine U6 members, and GR5 and GR28, is refused by at least one row of the cut #4 test; positive: the control receipt, the control envelope and the slice cut pass, and node qa/workbench/mwi-release.mjs --base d758d3513bb03a45aec541bfefd58aa34e440de5 over this cut's working tree exits 0 with no finding, judging the four release blocks of this receipt, closure open without an envelope
observed code vs planned code: observed: the validator and its tests; planned: none in this cut
permissions, effects, cancellation and retention: none: the judges are pure; the CLI reads Git and files and writes only stdout and stderr
native evidence/identity and no-false-PASS predicate: not run: this cut changes no judge, and it restates no gate-envelope predicate
timing/resource budget and control behavior: not run: no timing claim; every vitest run here is capped with VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8
Forge commands run and exact outcomes: the lint and typing steps ran under the seat's ritual of record, whose Furnace run and attempt ids (or its typed fallback) are on the delivery note's ritual line and on the ledger's ritual-check row for run g10-work-s235, over the seat worktree tree that holds every delivered byte of this cut (trunks 71b4a59 and d758d35 merged into cut #3, plus the cut #4 bytes, uncommitted); that clean claim excludes qa/workbench/mwi-release.mjs, which biome's files.includes (src/**/*.ts, test/**/*.ts) leaves unlinted and tsconfig.test.json's checkJs false leaves untype-checked, in the ritual and in the complete gate alike; a one-off tsc 6.0.3 --ignoreConfig --allowJs --checkJs --strict --types node run over the module reads 0 errors; the complete gate (forge build --require-complete --no-replay --keep-going --json) is not run by this seat, because the machine gate lane runs it on the collected commit
docs, skill, source map, feature matrix and receipt updates: docs/workbench/receipts/wb-j5y5.md (this entry); docs/workbench/feature-matrix.md is unchanged by this cut
remaining blockers and next safe independent cut: .agents/skills/pi-mechanical-interop/SKILL.md and docs/workbench/programs/mechanical-workflows-interop-2026-11-04/ are absent at bases 71b4a59 and d758d35 (both land with wb-12x1), so this cut updates neither; the next safe independent cut is any program bead's first cut, with a release block in its receipt
red command: VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-mwi-release.test.ts
red result: 55 failed | 593 passed (648), the cut #4 test against the cut #4 module with refusal #3's twelve U5 and nine U6 members applied together (two runs, equal); the cut #4 test against the cut #3 module reads 11 failed | 637 passed (648), the pin-list header rows only
first failing assertion: AssertionError: expected 'x&#1114111;y' to be 'x' + U+10FFFF + 'y' // Object.is equality (pin RV04, renderedText("x&#1114111;y"), refused under member GR2)
positive rerun: VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-mwi-release.test.ts -> 648 passed (648)
mutant EAT-R082: accept a W11 status turned landed-gated without a witnessed live gate (the requirement's own mutant) -> 42 failed | 606 passed (648); keep a six-digit hexadecimal reference as written (refusal #3 member GR1) -> 4 failed | 644 passed (648); drop list items from the token walk (GR20) -> 7 failed | 641 passed (648); judge the W11 heading's uniqueness only when the matrix changes (GQ88) -> 2 failed | 646 passed (648)
mutant EAT-R083: accept a red result that reports no failure (the requirement's own mutant) -> 3 failed | 645 passed (648)
mutant EAT-R084: accept an old commit's gate (the requirement's own mutant) -> 2 failed | 646 passed (648)
mutant EAT-R085: accept a live claim whose producer gate failed, was skipped or did not run (the requirement's own mutant) -> 8 failed | 640 passed (648); read the gate value None as no gate (GQ16) -> 2 failed | 646 passed (648)
mutant EAT-R086: accept a fabricated wb identifier (the requirement's own mutant) -> 1 failed | 647 passed (648); accept a contract that only begins with workbench.mwi-release/v1 (GQ3) -> 1 failed | 647 passed (648)
mutant EAT-R087: accept a global status row appended to TRACEABILITY (the requirement's own mutant) -> 14 failed | 634 passed (648); accept a TRACEABILITY the cut adds over a base without it (GQ85) -> 1 failed | 647 passed (648)
```

## 2026-11-07 cut #5, the respin of refusal #4 (the W11 table and heading reader words in the enumerate form; the w11-html bullet held to its pins)

Seat ws-06 of run g10-work-s237 cut this respin on trunk 7f54a59e1d579c72f4a574e2a401dbe55079afe7 (landing 1020), merged into the branch over cut #4 (055a5ae882dfbe85a4c8c034703456e3e66cfc5a), which PREP F refused as refusal #4, and merged trunks c27e1cf5284c8f39694603638c739c51a86145f4 (landing 1022) and f0086d50477e1971a2272ebb89c90e6c95cf97db (landing 1023) into the branch before handoff. The W11 table and heading reader words are at their second-stage cap, so this cut takes the enumerate-the-resolvable form for them; the words of the w11-html bullet are at rung 1 of their own guard. Refusal #3 asked for the structural exit of the claim words frozen at R-B641 to a child bead; that exit is not yet typed, and this cut does not restate those words.

What changed:

- The validator's code is unchanged; only its doc comments change. The module header gains a CUT #5 paragraph and 48 pin lines (RV67-RV71, FV41-FV42, TR13-TR16 and WR29-WR65). Each new pin line is one case of the test, and the test holds the header's pin lines to its own rows.
- Refusal #4 U1 and U2, the W11 table and heading reader words, in the enumerate-the-resolvable form. tableCells, w11Rows, w11Statuses, the w11-status-unknown bullet and judgeCut's heading-uniqueness clause each carry their own bound: their readings are claimed exactly as the pin lines they name give them, and an input no such line holds is NOT CLAIMED. The ten U1 members (GP8-R2, GP8-R3, GP8-R7, GP8-T1, GP8-S1, GP8-S2, GP8-S4, GP8-U4, GP8-U6 and GP8-H3) and the six U2 members (GP8-R5, GP8-R6, GP8-T2, GP8-T4, GP8-U1 and GP8-U3) are each refused by at least one row.
- Refusal #4 U3, the w11-html bullet, at rung 1. The bullet and w11Html carry their own bounds, and GP8-X3, GP8-W2, GP8-X4, GP8-X5 and GP8-X6 are each refused.
- Eight of the nine members that refusal #4's record F5 reads as NOT CLAIMED are now pinned and refused: GP8-T3, GP8-B5, GP8-B7, GP8-B10, GP8-I1, GP8-I3, GP8-F1 and GP8-F2. GP8-B9, a strikethrough, stays NOT CLAIMED by name.
- The test's real-tree row now expects five release blocks in this receipt, one per cut entry.

What this entry does not claim:

- No slice is live, and no Mechanical invocation exists. The validator calls no Mechanical code.
- For the rendered-view, field-value, TRACEABILITY and W11 reader words, an input that no pin line holds is NOT CLAIMED.
- The claim words frozen at R-B641 are not restated by this entry or by this cut.
- The requirements EAT-R165 to EAT-R171 that the 2026-11-07 Phase 10 amendment on the bead adds are not served by this cut. The amendment's own rule defers them until the Nov-6 pins are carried per EAT-R172, which wb-cbt4 owns.
- The project skill and the program docs are still absent at this base (both land with wb-12x1), so this cut updates neither, and its release block names both as blockers.

```mwi-release
contract: workbench.mwi-release/v1
program: mechanical-workflows-interop-2026-11-04
bead: wb-j5y5
slice: PI-7
slice status: partial
requirements: EAT-R082, EAT-R083, EAT-R084, EAT-R085, EAT-R086, EAT-R087
real infrastructure gate: none
baseline sha / source paths: 7f54a59e1d579c72f4a574e2a401dbe55079afe7; qa/workbench/mwi-release.mjs (doc comments only), test/workbench-mwi-release.test.ts, docs/workbench/receipts/wb-j5y5.md
specific behavior to change: cure refusal #4 of cut #4: state the W11 table and heading reader words and the w11-html bullet as exactly the pin lines they name (the enumerate form of rule 19(c) at the U6 (c) cap, rung 1 for U6 (d)), and refuse each U1, U2 and U3 member red-first; no judge changes behavior
owner repo and producer authority: Pi (pi-subagents); the validator reads forge's build result envelope (result-envelope/v1), forge.toml, the in-tree bead export and Git, and calls no producer
supported API/version confirmed by installed code: marked 18.0.11 (its Lexer, which qa/workbench/receipts-index.mjs also uses) and git 2.50.1; no producer API is called
one negative reproducer and one positive journey: negative: each of refusal #4's ten U1, six U2 and five U3 members, and eight of its record F5's nine NOT CLAIMED members, is refused by at least one row of the cut #5 test; positive: the control receipt, the control envelope and the slice cut pass, and node qa/workbench/mwi-release.mjs --base 7f54a59e1d579c72f4a574e2a401dbe55079afe7 over this cut's working tree exits 0 with no finding, judging the five release blocks of this receipt, closure open without an envelope
observed code vs planned code: observed: the validator and its tests; planned: none in this cut
permissions, effects, cancellation and retention: none: the judges are pure; the CLI reads Git and files and writes only stdout and stderr
native evidence/identity and no-false-PASS predicate: not run: this cut changes no judge, and it restates no gate-envelope predicate
timing/resource budget and control behavior: not run: no timing claim; every vitest run here is capped with VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8
Forge commands run and exact outcomes: the lint and typing steps ran under the seat's ritual of record, whose Furnace run and attempt ids (or its typed fallback) are on the delivery note's ritual line and on the ledger's ritual-check row for run g10-work-s237, over the seat worktree tree that holds every delivered byte of this cut (trunk 7f54a59 merged into cut #4, plus the cut #5 bytes, uncommitted); that clean claim excludes qa/workbench/mwi-release.mjs, which biome's files.includes (src/**/*.ts, test/**/*.ts) leaves unlinted and tsconfig.test.json's checkJs false leaves untype-checked, in the ritual and in the complete gate alike; a one-off tsc --ignoreConfig --allowJs --checkJs --strict --types node run over the module reads 0 errors; the complete gate (forge build --require-complete --no-replay --keep-going --json) is not run by this seat, because the machine gate lane runs it on the collected commit
docs, skill, source map, feature matrix and receipt updates: docs/workbench/receipts/wb-j5y5.md (this entry); docs/workbench/feature-matrix.md is unchanged by this cut
remaining blockers and next safe independent cut: .agents/skills/pi-mechanical-interop/SKILL.md and docs/workbench/programs/mechanical-workflows-interop-2026-11-04/ are absent at bases 7f54a59, c27e1cf and f0086d5 (both land with wb-12x1), so this cut updates neither; the next safe independent cut is any program bead's first cut, with a release block in its receipt
red command: VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-mwi-release.test.ts
red result: 24 failed | 672 passed (696), the cut #5 test against the cut #5 module with thirteen of refusal #4's members applied together (two runs, equal); the cut #5 test against the cut #4 module reads 5 failed | 691 passed (696), the four pin-list header rows and the receipt row only
first failing assertion: AssertionError: expected 'Feature | Status\na | b\nc | d' to be 'Feature | Status\na | b\nc | d\ne | f' // Object.is equality (pin RV67, renderedText of a table of three body rows, refused under member GP8-T1)
positive rerun: VITEST_MAX_THREADS=8 VITEST_MAX_FORKS=8 ./node_modules/.bin/vitest run test/workbench-mwi-release.test.ts -> 696 passed (696)
mutant EAT-R082: accept a W11 status turned landed-gated without a witnessed live gate (the requirement's own mutant) -> 44 failed | 652 passed (696); read only the first two body rows of a W11 table (refusal #4 member GP8-R2) -> 4 failed | 692 passed (696); judge only the first head row's status (GP8-S1) -> 3 failed | 693 passed (696); skip the heading-uniqueness rule for a matrix the cut adds (GP8-U4) -> 1 failed | 695 passed (696); read <br> and <wbr> as no raw HTML (GP8-X3) -> 2 failed | 694 passed (696)
mutant EAT-R083: accept a red result that reports no failure (the requirement's own mutant) -> 3 failed | 693 passed (696)
mutant EAT-R084: accept an old commit's gate (the requirement's own mutant) -> 2 failed | 694 passed (696)
mutant EAT-R085: accept a live claim whose producer gate failed, was skipped or did not run (the requirement's own mutant) -> 8 failed | 688 passed (696); read the gate value n/a as no gate (GP8-F2) -> 1 failed | 695 passed (696)
mutant EAT-R086: accept a fabricated wb identifier (the requirement's own mutant) -> 1 failed | 695 passed (696); ignore whitespace inside the contract value (GP8-F1) -> 1 failed | 695 passed (696)
mutant EAT-R087: accept a global status row appended to TRACEABILITY (the requirement's own mutant) -> 18 failed | 678 passed (696); read an empty TRACEABILITY as an absent one (GP8-I1) -> 2 failed | 694 passed (696)
```
