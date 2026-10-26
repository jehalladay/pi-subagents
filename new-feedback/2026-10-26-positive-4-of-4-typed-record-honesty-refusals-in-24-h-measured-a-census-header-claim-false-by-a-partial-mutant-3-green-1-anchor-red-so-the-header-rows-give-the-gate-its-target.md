# positive - 4 of 4 typed record-honesty refusals in 24 h measured a census-header claim false by a partial mutant - 3 green, 1 anchor-red - so the header rows give the gate its target

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77)
**Date:** 2026-10-26 (ledger window 2026-10-25T07:45:00Z to 2026-10-26T07:30:00Z inclusive; stamp 2026-10-26T07:30Z)
**`pi-subagents` revision:** installed pin `workbench/implementation-program@fced7bfda63e6975d331fd4f31ff4463b2c9136e`. At drafting time `git fetch -q origin` (rc 0) left `origin/workbench/implementation-program` at that same sha (`git rev-parse origin/workbench/implementation-program` prints `fced7bfda63e6975d331fd4f31ff4463b2c9136e`), so the pin and the fetched ref coincide and every source byte below was read with `git show`, `git grep` or `git ls-tree` at `fced7bfd`, never from the rig clone's checked-out HEAD `188ae590` (`git rev-list --count HEAD..origin/workbench/implementation-program` = 753). All 4 refusals this file rests on carry `base` `fced7bfd`. Test harness at the pin: vitest 4.1.10 (`package-lock.json:5281-5282`, `"node_modules/vitest": {` / `"version": "4.1.10"`; the clone's `./node_modules/.bin/vitest --version` prints `vitest/4.1.10 linux-x64 node-v24.20.0`); `package.json:3` `"version": "0.20.0"`. The gate harness string on the window's 90 `gate-pass` rows: 58 carry `forge 0.2.1 (rev 1aba570e31dc` (57 with the closing parenthesis, 1 truncated by the row's own summary), 7 carry `forge 0.2.1 (rev 40c9ca729f7e)`, 25 carry no `forge <version> (rev ...)` string; the 4 refusals below ran no forge verb at all.
**Method:** read-only parse of the machine ledger `machines/flywheel/ledger/metrics.jsonl` (22,524 lines at read time, 32,799,499 bytes) and `machines/flywheel/ledger/outbox.jsonl` (1,042 lines) with a bounded python pass that places each row by its `utc` field inside the window above; `M:n` and `O:n` below are 1-based line numbers in those two files. Source reads at `fced7bfd` and at the four refused cut commits, which exist in the rig clone's object store (`git cat-file -t` prints `commit` for each). No test, mutant or gate ran in this lane: every red/green count quoted is the gate's own, copied from its row.
**Scope:** feedback about `pi-subagents`' census convention as a tool surface - the header claim rows of `test/*census*.ts` (READINGS, NOT CLAIMED, NAMED RESIDUAL, FOLLOW-UP, RECORD HONESTY, the row letters) and the rule `test/helpers/census.ts` states for them - as the target the flywheel's record-honesty gate measures. Not about the workbench beads and not about the four refused cuts' substance. The partial mutants (G16, G07-G10, G18, ET1-ET3, ST1-ST4, the A3/C1 members) and standing rule 6 are the machine's instrument, not the object of the praise; where Finding 2 and the last positive cite the refusal rows' decision point and cost, they record "the experience of driving it from an automated orchestrator" that this directory's README asks for (`new-feedback/README.md:5`), and the thing praised stays the repo-side convention that gives the instrument a claim to measure. Positives only; no defect file from this lane on this theme.
**Prior art:** none on this theme. Checked `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` (18 entries, README.md included) with `grep -i -E 'honest|census-header|header-claim|falsifier|mutant|record|refus|over-claim|overclaim'`: 3 filename hits, none on record honesty - `2026-10-17-positive-the-scratch-helper-rule-and-its-gate-refusals-removed-the-raw-mkdtemp-class-from-new-cuts-in-3-refusals-with-the-trunk-cleanup-bead-in-flight.md` (a different refusal class), `2026-10-18-a-mutant-battery-of-the-scratch-helper-ran-against-the-real-tmpdir-and-removed-every-child-of-the-shared-session-root-42-to-0-in-two-minutes-while-a-sibling-complete-gate-truncated.md` (a mutant battery as a hazard), `2026-10-20-the-rule-16-frozen-shape-assertion-lives-only-in-the-machine-standing-rules-and-the-byte-frozen-traceability-md-so-10-of-13-gate-refusals-in-24-h-cite-it-and-no-contributor-doc-shows-the-literal.md` (the frozen-shape refusal class and its doc gap; its Finding 3 "the refusals are correct and the mutants are real" is the nearest sibling in spirit). Body grep at the ref (`git grep -l -i -F -e 'record honesty' origin/workbench/implementation-program -- new-feedback/`, and the same for `record-honesty`, `NOT CLAIMED`, `standing rule 6`, `G16`, `over-claim`) prints nothing; `falsifier` hits only `2026-10-15-positive-the-complete-gate-receipt-and-red-green-re-verification-discipline-let-an-orchestrator-verify-6-of-6-closures-without-building-and-the-owner-bounced-0.md` (the package-smoke falsifier), `NAMED RESIDUAL` only `2026-10-25-positive-the-detached-timing-guard-derives-its-9-member-judged-set-from-the-test-directory-and-the-config-exclude-list-and-pins-the-marked-twins-so-an-empty-derivation-reds.md` (a positive about a different guard). The instrument is armed: the same `git grep -l -i -F -e 'record honesty'` over `test/` at `fced7bfd` hits 5 files.
**Delivery:** this file is to travel as a docs-only commit (one file under `new-feedback/`) on branch `machine/flywheel/feedback-2026-10-26`, cut from a detached worktree of `origin/workbench/implementation-program`, for the program owner to land; this repository's protected branches are never pushed to by feedback writers. Gate waiver, disclosed per this directory's README: no build, typecheck, test or complete gate is to run for that commit, because it adds one markdown file and touches no source; `git config core.hooksPath` is unset in the rig clone and the pin carries no `.githooks` or `.gitmessage` (`git ls-tree --name-only fced7bfd -- .gitmessage .githooks` prints nothing), so no hook is bound to refuse it.

## Summary, with numbers

In the 24 h window the ledger holds 3,093 rows placeable by `utc` (first M:19384 at 2026-10-25T07:46:50Z, last M:22476 at 2026-10-26T07:25:40Z), among them 8 `gate-refused` rows. 4 of the 8 carry the typed `refusalClass` `record-honesty (standing rule 6; the R515 wb-ksz.6 class)` - M:21871 (wb-kku9.5, 00:24:59Z), M:21988 (wb-jh2f cut #1, 01:30:53Z), M:22125 (wb-52pt, 03:01:38Z), M:22418 (wb-jh2f cut #2, 06:27:57Z) - and each of the 4 names a sentence in the cut's census header plus the partial-mutant reading that contradicts it. On 3 of 4 the census stayed green under mutants the header said would red: `0 failed | 46 passed` on the two wb-jh2f cuts (G16 with G07-G10/G18, then ET1-ET3/ST1-ST4) and `20 of 20` under the A3/C1 members on wb-52pt. On 1 of 4 (wb-kku9.5, M:21871 / O:1013) the direction inverts: the header claims a later pin passes the pin anchor once an outside record names it, and G16 read the anchor red - O:1013 `unmetDetail[0]`: "G16 adds a new pin M10 ... and adds a docs07 frozen binding line naming M10 under the identical title. The anchor case reds: 1 failed | 31 passed (32)." The 4 cuts touched exactly 2 files each, the census test and its roster fixture, and the quoted sentences sit in the census header comment block at the cut commits (Finding 4). The convention being measured is the repo's own at `fced7bfd`: 58 of the 134 census files (28 `test/*.census.ts` + 106 `test/*census*.test.ts`) carry at least one of the four header tokens (NOT CLAIMED 31 files, FOLLOW-UP 19, READINGS 15, NAMED RESIDUAL 9), `test/helpers/census.ts:89` states the rule ("what the roster does NOT cover, so no census may claim it"), and 5 census files already name "record honesty" in their headers. In one refusal (O:1037) the gate calls the implementation correct ("The live reading equals parse5 6.0.1 on every rendered probe") and refuses the record anyway - the convention separates "code right" from "record honest". The counts are CONFIRMED from the rows and the bytes; the causal claim (that moving claims out of the header would leave the gate nothing to refuse) is PLAUSIBLE, not exercised. One ask: the convention lives in `test/helpers/census.ts` and 58 census headers but in no contributor doc at the pin (`git grep -l -i -F -e 'record honesty' fced7bfd -- docs/ AGENTS.md README.md` prints 0 files against 5 under `test/`).

## Finding 1 - 4 of 8 gate refusals in the window carry the typed record-honesty class, and every one names a census-header claim and the mutant count that measured it false - CONFIRMED

**What it did.** The gate's PREP F step read each cut's census header as a set of claims and ran partial mutants against the census to measure them. Where a mutant's measured reading contradicted the reading the header sentence predicted - green where the header said red on 3, red where the header said a later pin passes on 1 - the gate refused the record, at PREP, before any forge verb. The 4 typed rows, by their `reason` and `unmet` fields (verbatim; each row also carries `verdictClass` `RESPIN`, `base` `fced7bfd`, `refusalClass` `record-honesty (standing rule 6; the R515 wb-ksz.6 class)`):

M:21871 / O:1013, wb-kku9.5, seat gate-prep-32, cut `52686a3e`, gateSeconds 464:

```
"reason":"record-honesty RESPIN (substance, record-shaped). The delivered census header and the delivery note both claim that a later pin passes the pin anchor once an outside record (a docs07 binding) names it. Gate falsifier G16 measures this FALSE: 1 failed | 31 passed (32), with unseenPairedRemovals = all 8 docs07-bound pins. Every other check and every measured count reproduces the seat's."
"unmet":["U1-RECORD-HONESTY-census-header-PIN-ANCHOR-later-pin-claim-measured-false-by-G16-1-failed-31-passed-32","U1b-RECORD-HONESTY-delivery-note-CURE-TRUNK-CONTACTS-later-pin-sentences-never-measured-misguide-wb-4tdn"]
```

M:21988 / O:1018, wb-jh2f cut #1, seat gate-prep-11, cut `14ffa637`, gateSeconds 520:

```
"reason":"RESPIN, record-honesty (substance, record-shaped; standing rule 6, the R515 wb-ksz.6 class, same shape as today's wb-kku9.5 refusal O:1013). The new row M text in the census header says MR4 pins an end tag bounded by 'a space' one by one. No pin holds that form: gate falsifier G16 leaves the census at 46/46 on the cut. The header's FOLLOW-UP paragraph and the delivery note also say the READINGS sentences on a tag's attributes and end tag now 'hold as written'. Gate partial mutants G16, G07-G10 and G18 show that is false: each changes the reading of an input those sentences describe and leaves the cut at 0 failed | 46 passed. This is the F1 class re-failing through new members (rule 19(d) member level: a normal respin with a class-level guard). Every other check reproduced the seat's counts: GH1-GH6b red-first, RED-1, the CT-BATTERY v2 line, the quiet-row silencings, the pin flips, the roster shape and the titles."
"unmet":["U1-RECORD-HONESTY-census-header-row-M-MR4-claims-a-space-bounded-end-tag-pinned-one-by-one-measured-false-by-G16-0-failed-46-passed-46","U1b-RECORD-HONESTY-header-FOLLOW-UP-and-delivery-note-READINGS-hold-as-written-measured-false-by-G16-G07-G08-G09-G10-G18"]
```

M:22125 / O:1024, wb-52pt, seat gate-prep-38, cut `c98cda97`, gateSeconds 590 (O:1024 also carries `"metricsRow":"M:22125"`):

```
"reason":"record-honesty RESPIN at PREP F (standing rule 6, HONEST DATA). Two census header claims, measured false by non-equivalent gate falsifiers: row A ('so a scan that reads less than each file's whole text, or walks less than the whole tree, reds') and the NOT CLAIMED clause ('the plants prove that A3's and C1's scans read whole texts at every depth and judge them'). The delivery note's 'F1 ... cured' class claim is also false as measured. Precedents: row 515 wb-ksz.6 R515, row 514 wb-8bi, row 403 wb-2t2 U3, and wb-kku9.5 cut #1 U1 (O:1013, this run). No complete gate ran (T1 plus the refused-check clause)."
"unmet":["U1-RECORD-HONESTY-census-header-row-A-whole-text-whole-tree-claim-measured-false-by-7-A3-members-20-of-20-cut-and-landed","U1b-RECORD-HONESTY-census-header-NOT-CLAIMED-whole-texts-at-every-depth-clause-measured-false-by-A3-7-and-C1-8-members-20-of-20","U1c-RECORD-HONESTY-delivery-note-F1-cured-class-claim-false-as-measured-true-at-named-member-level"]
```

M:22418 / O:1037, wb-jh2f cut #2, seat gate-prep-21, cut `bbf4457a`, gateSeconds 908 (the JSON string's escaped quotes are shown decoded):

```
"reason":"RESPIN, record honesty (standing rule 6), the class-level same-unmet re-failure under the rule 19(d) guard bound at refusal #1. Cut #2 makes three claims. Census header READINGS :48-49: 'a start or end tag ... and its attributes to the first ">" outside a quoted value'. RESPIN 1 of wb-jh2f :264-267, new in cut #2: 'so a tag reads to the first ">" outside a quoted value in every state ... The READINGS clauses on a tag's name, its attributes and its end tag ... claim exactly the members row M lists for MR4'. The delivery note CORRECTION: '... and each such member reds MR4 under its partial mutant'. MR4 pins attribute reading only through ordinary start tags. Gate partial mutants ET1, ET2 and ET3 (end tags read to their first ">") and ST1, ST2, ST3 and ST4 (RCDATA, raw-text and block-level start tags read to their first ">") each read 0 failed | 46 passed on landed, cut #1 and cut #2. The live reading equals parse5 6.0.1 on every rendered probe, so the gap is pin coverage plus the claims made about it. Non-equivalent mutants survive, so no ownerOption is offered; the cure is seat-side."
"unmet":["U1-RECORD-HONESTY-end-tag-attributes-claimed-read-to-the-first-gt-outside-a-quoted-value-unpinned-measured-false-by-ET1-ET2-ET3-0-failed-46-of-46","U2-RECORD-HONESTY-RCDATA-raw-text-and-block-start-tag-attributes-claimed-unpinned-measured-false-by-ST1-ST2-ST3-ST4-0-failed-46-of-46"]
```

**Measured.** 8 `gate-refused` rows in the window; 4 of 8 carry the typed class above, and all 4 carry `base` `fced7bfd`. The other 4 carry `refusalClass` absent (the field is not present): M:19427 (wb-dqhl, 2026-10-25T08:01:25Z, base `aa6d65d3`, gateSeconds 1620) names the words in its free text - `verdictClass` `RESPIN: positive-protection U1 member-level regression + record honesty; gate timing note stands` - with `unmet` `U1-MEDIUM-CONFIRMED-lost-landed-N9-N10-N11-null-withUnits-coverage`, `U2-MEDIUM-CONFIRMED-no-weakening-title-and-note-overclaim`; M:20013 (wb-dqhl, 11:44:18Z, loop cap, positive-protection), M:20258 (wb-3l7x, 13:06:17Z, an A2 test-strength regression) and M:20938 (wb-7iyv, 17:04:23Z, R754 positive-protection) are other classes. So the "4 of 4" in the title is 4 of 4 typed record-honesty rows, inside 8 refusals, inside 3,093 window rows; it is not 4 of 8 refusals being record-honesty by text (that count is 5 of 8 if M:19427's free text is read). 3 of 4 typed rows name the header site in `unmet` (PIN-ANCHOR; row M / MR4 and the FOLLOW-UP paragraph; row A and the NOT CLAIMED clause); M:22418 names it in `reason` (`READINGS :48-49`, `:264-267`) while its `unmet` names the claim content (end-tag and RCDATA/raw-text/block start-tag attributes). All 4 rows' `unmet` names the mutant result (`G16-1-failed-31-passed-32`; `G16-0-failed-46-passed-46`; `7-A3-members-20-of-20`; `ET1-ET2-ET3-0-failed-46-of-46`). The outbox twins carry the same `refusalClass`, `base` and `gateSeconds` and each points back at its metrics row: O:1013 `"metricsRow":"M:21871"`, O:1018 `"metricsRow":"M:21988"`, O:1024 `"metricsRow":"M:22125"`, O:1037 `"metricsRow":"M:22418"` (utc 00:25:23Z, 01:31:09Z, 03:01:48Z, 06:28:19Z).

**Why it must survive a refactor.** A census header that states, per row, what its pins cover and what they do NOT cover is a set of claims a partial mutant can measure. Each of the 4 refusals rests on exactly such a sentence: a "later pin passes once an outside record names it" clause, a row-M "bounded by 'a space' one by one" clause, a row-A "a scan that reads less than each file's whole text ... reds" clause, a READINGS "to the first ">" outside a quoted value" clause. Collapse those per-row sentences into summary prose ("the census pins tag reading"), or move them into a receipt or bead note the gate does not read beside the roster, and the same mutants leave the census green on the 3 surviving-mutant refusals (46/46, 46/46, 20 of 20) with no sentence to hold against it; on the 4th, G16's red (1 failed of 32) goes back to being an ordinary mutant kill - it measured an over-claim only because the header sentence said a later pin passes the anchor.

**Scope of this praise.** One 24 h window, 4 typed refusals on 3 beads, header rows only. The mutants are the gate's (its own throwaway harness: O:1018 names `/var/tmp/fwg.nzaGaK/tools/gp11_mut.py`, O:1037 `/var/tmp/fwg.Bgf7l1/tools/gp21_mut.py`), not repo artifacts, and I re-ran none of them.

## Finding 2 - the class refuses a record, not an implementation: the gate called the live reading correct in O:1037 and refused anyway, at PREP F, before any forge or furnace verb, in 464-908 s - CONFIRMED

**What it did.** All 4 refusals ended at PREP F. Their `envelopeSummary` fields begin `NOT RUN:` - 3 of 4 with `NOT RUN: no complete gate envelope exists for this record.` (O:1013, O:1018, O:1024) and O:1037 with `NOT RUN: wb-jh2f cut #2 has no complete gate envelope.` O:1013 in full to the first clause boundary:

```
"envelopeSummary":"NOT RUN: no complete gate envelope exists for this record. PREP status is refused (record-honesty RESPIN, U1 + U1b) and PREP ended before H, so GATE ran no furnace doctor, no forge verify, no complete gate of record (rule 20: FORGE_JSON=1 forge build --require-complete --no-replay --keep-going --json), no Furnace Run or Attempt, no gate-slot verb and no gate-judge (T1 plus the not-ready clause). ..."
```

O:1037 separates the implementation from the record in one sentence (quoted in Finding 1): `The live reading equals parse5 6.0.1 on every rendered probe, so the gap is pin coverage plus the claims made about it. Non-equivalent mutants survive, so no ownerOption is offered; the cure is seat-side.` The same row's `green` field reads `Census alone on probe 8011689243a285e7186f78bf0dcb9ba8014f98a8 (tree c9dcbca3): 46/46 passed, rc 0, 9 s, JSON reporter (load1 about 133). K00 controls inside every mutant set read 46/46 on landed, cut #1 and cut #2.` - the census was green and the implementation agreed with the reference parser, and the refusal stands on the header's claims alone.

**Measured.** `gateSeconds` 464 / 520 / 590 / 908 on the 4 rows (sum 2,482 s, 41.4 min, across 4 refusals); `wallSeconds` 0, `vitestCap` 0, `commandId` and `traceId` empty, `furnaceDisposition` `none: no furnace doctor, no supervised Run or Attempt, no furnace-fallback row, no post-attempt row, no post-Attempt controller exit 5 (no gate ran)` on each. Compare the untyped refusal M:19427, which ran a complete gate (its `envelopeSummary`'s first 230 characters: `cmd_f48fd2d874ac (trace 582941bf243546faa71fd9a8ae52f93b, op op-c832dcd56da74a81a3bffc3f18bec5a4, session sess_eaa7945bbf0c), forge 0.2.1 rev 40c9ca729f7e. Command: FORGE_JSON=1 forge build --require-complete --no-replay --keep-go`; gateSeconds 1620).

**Why it must survive a refactor.** The record-honesty class is cheap because it needs no complete gate: the census and the mutants alone decide it. That depends on the header claims being readable as claims by a program that has only the census file and its roster - a header written as narrative, or claims that live only in the delivery note, pushes the same judgement past H into the 1,620 s class or loses it.

**Scope of this praise.** 4 rows; the 464-908 s is the whole PREP, not the mutant legs alone (the rows do not break it down, and I did not time anything).

## Finding 3 - the header claim rows are the repo's own convention at fced7bfd: 58 of 134 census files carry the vocabulary, test/helpers/census.ts states the rule, and 5 census files already name record honesty - CONFIRMED

**What it did.** The claims the gate measured are a convention the repository carries in its test tree, not a form the machine imposed. At `fced7bfd`:

```
$ git ls-tree --name-only fced7bfd -- test/ | grep -c '\.census\.ts$'
28
$ git ls-tree --name-only fced7bfd -- test/ | grep -c 'census.*\.test\.ts$'
106
$ for kw in 'NOT CLAIMED' 'READINGS' 'FOLLOW-UP' 'NAMED RESIDUAL' 'RECORD HONESTY'; do printf '%-16s ' "$kw"; git grep -l -F -e "$kw" fced7bfd -- 'test/*.census.ts' 'test/*census*.test.ts' | wc -l; done
NOT CLAIMED      31
READINGS         15
FOLLOW-UP        19
NAMED RESIDUAL   9
RECORD HONESTY   1
$ git grep -l -E 'NOT CLAIMED|READINGS|FOLLOW-UP|NAMED RESIDUAL' fced7bfd -- 'test/*.census.ts' 'test/*census*.test.ts' | wc -l
58
$ git grep -n -i -F -e 'record honesty' fced7bfd -- 'test/*.census.ts' 'test/*census*.test.ts'
test/workbench-docs09-readers-relationships.census.ts:31: * - RECORD HONESTY (gate cmd_e7d15ee63790 U1): each unpinned reason is checked against SLOT_ROUTING: it names the base
test/workbench-docs09-readers-relationships.census.ts:985:describe("wb-752.15 record honesty: each unpinned half names who holds its pin flip, dated by the base sha (gate cmd_e7d15ee63790 U1)", () => {
test/workbench-docs20-contract.census.ts:25: * Record honesty (this file supersedes the 10029f7 / dbbf8ae cuts, whose bare-text scanner and executing collect-only child
test/workbench-evidence-ui-census.census.ts:49: * Record honesty (corrections to the refused dac18fd/89c9ac2 deliveries this file supersedes, neither of which landed):
test/workbench-rendering-pipeline.census.ts:40: * Bullet 7's no-force-directed-in-render half (respin U2, record honesty): the closed producer wb-6ze.32 maps "Graph
test/workbench-tool-exposure-census.census.ts:33: * Record honesty (corrections to the c663b9a/cccd388 deliveries this file supersedes, neither of which landed): those
```

The rule, in the shared helper's header, `test/helpers/census.ts` (6,231 lines) at `fced7bfd`, lines 87-90 and 98-100:

```
 *   ROSTER_JUSTIFICATION table names, per roster row, the falsifier rows that would fabricate green through it and go
 *   red instead. A shape outside that set is refused only as far as the guards of the roster rows reach.
 *   NAMED RESIDUALS - what the roster does NOT cover, so no census may claim it; each MEASURED (a probe ran the shape on
 *   these bytes) or UNMEASURED (named, never run):
...
 *     respin-4 header claimed R1 closed because "integrity and the hook walk read the whole relative import closure";
 *     the gate-3 r4 battery measured that false (P2: a relative helper that never touches vitest places fails on
 *     Object.prototype, read as no fails in report mode). The inherited-option class is closed by the census guard
```

The program doc that asks for the shape, `docs/workbench/14-qa-and-benchmarks.md:121` (section `## Truth labels and release gates`, :119): `Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.` The convention has history on trunk: commit `868b4c4` (2026-10-18T18:50:51Z, an ancestor of `fced7bfd`: `git merge-base --is-ancestor 868b4c4 fced7bfd` rc 0) is titled `test(census): wb-752.15 respin 1 - docs/09 census record honesty: RA5/b names producer wb-4ap.13, unpinned claims dated by base sha 1a36ece`.

**Measured.** 58 of 134 census files carry at least one of the four upper-case header tokens (per-token file counts above sum to 74 because files carry more than one); 5 of 134 name "record honesty" case-insensitively, on 6 lines; `census.ts:89` is the one-line rule; `docs/workbench/14:121` the one-line program requirement.

**Why it must survive a refactor.** The helper header at `census.ts:98-99` records the convention's own origin story - a header claim measured false by a battery - so a refactor of `test/helpers/census.ts` that trims the header to an API description deletes the only in-repo statement of why a census header is a set of measurable claims. A lint or formatter pass that strips upper-case tokens from comment blocks, or a census template that drops the NOT CLAIMED / NAMED RESIDUAL rows as boilerplate, removes the rows the gate reads.

**Scope of this praise.** File-level grep counts at one sha over the two census globs; I did not read the 58 headers to check that every token is used as a claim row rather than as prose, and the 5 "record honesty" files were counted, not read beyond the lines shown.

## Finding 4 - the measured sentences sit in the census header comment block of each cut, and each cut touched exactly its census file and its roster fixture - CONFIRMED

**What it did.** The four refused commits are in the rig clone's object store, so the sentences the gate quotes can be read from bytes rather than from the rows. `git diff --stat fced7bfd..<cut>`, last lines:

```
52686a3e (wb-kku9.5, 2026-10-25T22:27:25Z):  test/fixtures/observation-class-roster.json | 75 +; test/workbench-observation-class-census.test.ts | 173 +-  -> 2 files changed, 237 insertions(+), 11 deletions(-)
14ffa637 (wb-jh2f #1, 2026-10-25T23:34:49Z): test/fixtures/hx-sio-design-status-roster.json | 153 +; test/workbench-hx-sio-design-status-census.test.ts | 108 +-  -> 2 files changed, 246 insertions(+), 15 deletions(-)
c98cda97 (wb-52pt, 2026-10-26T00:48:31Z):    test/fixtures/fiber-debug-identity-roster.json | 62 +-; test/workbench-fiber-debug-identity-census.test.ts | 189 +-  -> 2 files changed, 184 insertions(+), 67 deletions(-)
bbf4457a (wb-jh2f #2, 2026-10-26T03:46:19Z): test/fixtures/hx-sio-design-status-roster.json | 1239 +-; test/workbench-hx-sio-design-status-census.test.ts | 591 +-  -> 2 files changed, 1724 insertions(+), 106 deletions(-)
```

The sentences, at the cut commits (`git show <cut>:<path> | sed -n` / `grep -n`):

`52686a3e:test/workbench-observation-class-census.test.ts:52-53` (the O:1013 "later pin" claim):

```
 * later pin passes once an outside record names it (a docs07 binding); a pin no outside record names reds. No pin is added: the
 * frozen shape and the docs07 bindings are unchanged.
```

`14ffa637:test/workbench-hx-sio-design-status-census.test.ts:151` (row M, the O:1018 "bounded by 'a space'" claim) and `:240-241` (the FOLLOW-UP "hold as written" claim):

```
 *    and raw-text elements and their end tag, one reading for both (closingTag), bounded by white space (a space, a tab, a line feed, a
...
 *   line feed, a form feed, a carriage return (on an HTML page) and "/", so the gate's partial mutants GH1-GH6b each red MR4 and the
 *   READINGS sentences on a tag's attributes and its end tag hold as written. Q2: R4 extends from names to claim words (F2's invisibles in
```

`bbf4457a:test/workbench-hx-sio-design-status-census.test.ts:48-49` and `:264-267` (the two O:1037 claims):

```
 *   the first ">" ("</>" alone drops); a start or end tag renders nothing from its "<" through its name (any characters up to white space,
 *   "/" or ">") and its attributes to the first ">" outside a quoted value (tagEnd; a tag the input ends inside drops, with the rest); the
...
 *   too. Beyond the guard's members MR4 pins tagEnd's whole transition table and each element's text (row M), so a tag reads to the first
 *   ">" outside a quoted value in every state on every character class the table names, each transition told from every target that
 *   reads otherwise. The READINGS clauses on a tag's name, its attributes and its end tag, and on an RCDATA, raw-text or plaintext
 *   element's text, claim exactly the members row M lists for MR4.
```

`c98cda97:test/workbench-fiber-debug-identity-census.test.ts:41` (row A) and `:77` (the second half of the NOT CLAIMED clause O:1024 quotes):

```
 *    scan that reads less than each file's whole text, or walks less than the whole tree, reds.
...
 * C1's scans read whole texts at every depth and judge them, not that they read the repository the way they read the plants; a case
```

The landed twin of the hx-sio census at `fced7bfd` already carries the vocabulary the cuts extended: `test/workbench-hx-sio-design-status-census.test.ts:28` ` * READINGS (class-level guard bound by refusal #2, rule 19(d): every docs-reading leg of this census judges what a reader sees; in the` and `:155` ` * rows M (MR1-MR4, MU) - and nothing beyond it: every known departure of a leg from what a reader sees is a NAMED RESIDUAL with a pinned`.

**Measured.** 4 of 4 cuts: 2 files each, census plus roster; 4 of 4 quoted sentences found at the line numbers the rows name or at the lines shown, in the header comment block (every quoted line begins ` *`).

**Why it must survive a refactor.** The claims are co-located with the pins they describe and with the roster fixture, so one `git show` of two paths gives a reader - or a gate - the claim and the thing claimed about. Splitting the header into a separate `.md` beside the test, or generating it from the roster, breaks the co-location the refusals read through (`READINGS :48-49`, `:264-267` are line references into the census file itself).

**Scope of this praise.** Bytes at four commits that were refused and did not land; the trunk at `fced7bfd` was read only for the hx-sio landed header and the counts in Finding 3.

## Finding 5 - the mechanism a refactor would break: a header claim that names its member or pin gives a partial mutant something to measure; without it the same mutant readings leave the gate nothing to refuse - PLAUSIBLE

Consistent with all 4 rows (each refusal is a sentence plus a mutant reading that contradicts it - 3 surviving mutants, 1 red where the sentence claimed a pass; O:1037 says the implementation is right and refuses on the sentence) and not refuted by anything in the window, but no counterfactual ran: I did not strip a header's claim rows and re-run G16, ET1-ET3 or the A3/C1 members to show the gate goes quiet. The falsifiers themselves are the machine's PREP-F mutants and standing rule 6 is the machine's (`machines/flywheel/state/standing-rules.md:8`: `6. HONEST DATA: label unverified items; red counts are measured, never estimated; a skipped step is reported as skipped.`), so the repo convention is the target and the machine the instrument; what would remain of the class if the convention went is the state not exercised.

## Evidence

| row | utc | bead / seat | cut | base | refusalClass | gateSeconds | header site named in `unmet` (M:22418: in `reason`) | mutant result named |
|---|---|---|---|---|---|---|---|---|
| M:21871 / O:1013 | 2026-10-26T00:24:59Z / 00:25:23Z | wb-kku9.5 / gate-prep-32 | `52686a3e` | `fced7bfd` | record-honesty (standing rule 6; the R515 wb-ksz.6 class) | 464 | census-header PIN-ANCHOR later-pin claim | G16 1 failed / 31 passed (32) |
| M:21988 / O:1018 | 2026-10-26T01:30:53Z / 01:31:09Z | wb-jh2f / gate-prep-11 | `14ffa637` | `fced7bfd` | same | 520 | census-header row M (MR4); header FOLLOW-UP + delivery-note READINGS | G16 0 failed / 46 passed; G16, G07-G10, G18 |
| M:22125 / O:1024 | 2026-10-26T03:01:38Z / 03:01:48Z | wb-52pt / gate-prep-38 | `c98cda97` | `fced7bfd` | same | 590 | census-header row A; census-header NOT CLAIMED clause | 7 A3 members 20 of 20; A3 7 + C1 8 members 20 of 20 |
| M:22418 / O:1037 | 2026-10-26T06:27:57Z / 06:28:19Z | wb-jh2f / gate-prep-21 | `bbf4457a` | `fced7bfd` | same | 908 | READINGS :48-49; RESPIN 1 :264-267 | ET1-ET3 0 failed / 46 of 46; ST1-ST4 0 failed / 46 of 46 |
| M:19427 | 2026-10-25T08:01:25Z | wb-dqhl / gate-prep-23 | - | `aa6d65d3` | (absent; free text `+ record honesty`) | 1620 | - | - |
| M:20013, M:20258, M:20938 | 11:44:18Z, 13:06:17Z, 17:04:23Z | wb-dqhl, wb-3l7x, wb-7iyv | - | - | (absent; other classes) | 1426, 577, 732 | - | - |

Window scope of the ledger pass: 3,093 rows with `utc` in [2026-10-25T07:45:00Z, 2026-10-26T07:30:00Z]; top kinds `gate-stage` 295, `daemon-liveness` 249, `host-sample` 230, `ritual-check` 163, `gate-slot-acquired` 141, `gate-slot-released` 139, `mp-outcome` 128, `green` 104, `serial-leg` 103, `prep-done` 100, `red` 99, `worktree-removed` 98, `gate-start` 97, `collect-ready` / `delivered` / `gate-enqueued` 93 each, `gate-pass` 90, `gate-held` 90, `claim` 88, `gate-refused` 8, `landing-gate` 46 (46 of 46 `furnaceMode` `supervised`). 37 rows in the whole file carry neither `utc` nor `ts` (`delivered` 30, `blocked` 2, `red` 2, `gap` 1, `claimed` 1, `claim-skipped` 1) and cannot be placed by stamp; the 42 `ts`-keyed rows are all 2026-10-15 groom rows, 0 in the window. The orchestrator's evidence packet for this window counted 3,118 rows, 92 `gate-pass` and 91 `gate-held`; this file quotes its own utc-bounded parse and does not reconcile the two.

## Suggested fixes, cheapest first

1. **One paragraph in `docs/workbench/14-qa-and-benchmarks.md` under `## Truth labels and release gates` (:119-121)** naming the census header's claim rows (READINGS, NOT CLAIMED, NAMED RESIDUAL, FOLLOW-UP, RECORD HONESTY, the per-row letters) as sentences a gate measures with partial mutants, and the `census.ts:89` rule "what the roster does NOT cover, so no census may claim it". At `fced7bfd`, `git grep -l -i -F -e 'record honesty' fced7bfd -- docs/ AGENTS.md README.md` prints 0 files (armed: the same grep over `test/` prints 5), and no file under `docs/` carries the four upper-case tokens: `git grep -l -E 'NOT CLAIMED|NAMED RESIDUAL|READINGS|FOLLOW-UP' fced7bfd -- docs/` prints nothing (rc 1), the 47 files under `docs/workbench/receipts/` included; across the whole tree at the pin those tokens live in 73 files under `test/` and otherwise only in `.beads/interactions.jsonl`, `.beads/issues.jsonl` and `src/workbench/redaction.ts`. `docs/` has the idea only as lowercase prose - the same four-token grep with `-i` hits 37 files under `docs/` (28 under `docs/workbench/receipts/`, 9 others), e.g. `docs/workbench/03-architecture-and-ownership.md:82` `Named residuals, each pinned by a quiet row that the census keeps silent: ...`. The convention is a contract 58 files keep and no contributor doc states - the gap class the 2026-10-20 rule-16 file named for the frozen-shape literal.
2. **Keep the claim rows in the census file beside the roster fixture** - a refactor note, no code change: receipts (`docs/workbench/receipts/<bead>.md`) and bead notes are not what the refusals' line references (`READINGS :48-49`, `:264-267`) point into.
3. Nothing further; this file exists so the convention is not one header-trim or template-cleanup away from being lost quietly.

## Positives worth protecting

- **Per-row claim sentences in the census header, each naming the member or pin it rests on** - 4 of 4 typed refusals in the window measured exactly such a sentence (Finding 1), and the sentences are in the census header comment block of each cut at the line numbers the rows name (Finding 4). Summary prose in their place leaves the same mutants with nothing to hold against.
- **The NOT CLAIMED / NAMED RESIDUAL rows (`census.ts:89-90`; 31 and 9 files at `fced7bfd`)** - the negative space a census declares is what lets a gate distinguish an over-claim from an uncovered shape; O:1024 refused on a NOT CLAIMED clause as readily as on a positive row.
- **Co-location of claim, pins and roster: 2 files per cut, line references into the census file itself** - `git show` of two paths gives the gate the claim and the thing claimed about (Finding 4).
- **The helper header's own record of a false header claim (`census.ts:98-100`)** - the convention carries its origin story in-repo; a header trim deletes it.
- **A refusal that praises the implementation and refuses the record (O:1037)** - "The live reading equals parse5 6.0.1 on every rendered probe ... the cure is seat-side" is the behaviour that keeps "code right" and "record honest" as two axes; the decision needs no complete gate (Finding 2), which is why it costs 464-908 s and not 1,620.

## What I did not establish

- **No mutant ran in this lane.** Every red/green count (`1 failed | 31 passed (32)`, `0 failed | 46 passed`, `20 of 20`, `46/46`) is the gate's, copied from the rows; the gate's harness scripts are named as `/var/tmp/fwg.*/tools/gp11_mut.py` and `gp21_mut.py` in O:1018 and O:1037 and I did not look for them or re-run them. A re-run at `fced7bfd` of the named mutants on the four cut commits is the artifact that would upgrade Finding 1's mutant counts from "quoted" to "reproduced".
- **The counterfactual (Finding 5) did not run.** No header had its claim rows removed and its mutants re-run; the artifact is that run.
- **What became of the four cuts after the window.** The machine branches `origin/machine/flywheel/wb-kku9.5` (`8c72fc3`), `origin/machine/flywheel/wb-jh2f` (`e124005`) and `origin/machine/flywheel/wb-52pt` (`81a6474`) have moved past the refused commits, so later cuts exist; whether any passed its gate or landed was not read (the artifact: `gate-pass` / `landing-gate` rows for those beads after 2026-10-26T07:30Z).
- **Whether the 58 headers use the tokens as claim rows throughout.** The counts are file-level greps; I read the hx-sio landed header lines quoted in Finding 4 and the 6 "record honesty" lines, not the other headers.
- **The ledger packet's counts.** The orchestrator's packet counted 3,118 rows, 92 `gate-pass`, 91 `gate-held` for the same window; my utc-bounded parse counts 3,093 / 90 / 90, and 37 rows in the file carry no stamp. The refusal counts (8 / 4) agree between the two; I did not reconcile the rest.
- **The forge harness revision on the window's passes.** 58 of 90 `gate-pass` rows carry `forge 0.2.1 (rev 1aba570e31dc`, 7 `rev 40c9ca729f7e`, 25 no harness string, by a regex over each row's JSON text; the refusals ran no forge verb, so no harness revision attaches to them.
- **M:19427's refusal text** beyond the fields shown; its free-text "record honesty" is counted as untyped and not read.

## Grades

| claim | grade |
|---|---|
| 4 of 8 window refusals carry the typed record-honesty class, all at base `fced7bfd`, each naming a header site and a mutant result (Finding 1) | CONFIRMED |
| The class decides at PREP F with no forge/furnace verb, in 464-908 s, and O:1037 refuses a record while calling the implementation correct (Finding 2) | CONFIRMED |
| The header claim rows are the repo's convention at `fced7bfd`: 58 of 134 census files, `census.ts:89`, 5 files naming record honesty, commit `868b4c4` (Finding 3) | CONFIRMED |
| The measured sentences sit in the census header comment block at the cut commits, 2 files per cut (Finding 4) | CONFIRMED |
| Removing the per-row claims would leave the gate nothing to refuse (Finding 5) | PLAUSIBLE |
| No contributor doc at `fced7bfd` states the convention (fix 1) | CONFIRMED, with the armed control shown |
