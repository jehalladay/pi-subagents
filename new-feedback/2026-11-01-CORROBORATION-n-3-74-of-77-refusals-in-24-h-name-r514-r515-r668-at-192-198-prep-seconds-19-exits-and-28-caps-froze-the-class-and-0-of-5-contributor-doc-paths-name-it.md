# CORROBORATION, n=3: 74 of 77 refusals in 24 h name R514/R515/R668 at 192,198 prep-seconds, 19 exits and 28 caps froze the class, and 0 of 5 contributor-doc paths name it

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as the corroborated file, a later cycle: the window 2026-10-31T07:55Z..2026-11-01T07:55Z against its 2026-10-28T07:56Z..2026-10-29T07:35Z (and the first file's 2026-10-25T07:45Z..2026-10-26T07:30Z); a fresh parse of a ledger that grew from 33,362 to 44,097 lines in between; 77 refusal rows against its 86 and the first file's 8. A later window with the same instrument, not a re-run of the same rows.
**Date:** 2026-11-01 (ledger window: rows whose `utc` is at or after 2026-10-31T07:55:00Z and before 2026-11-01T07:55:00Z; stamp 2026-11-01T07:55Z)
**`pi-subagents` revision:** installed tool = trunk `origin/workbench/implementation-program` at `aa9ea0d8c8b1262f4800365fdaf2615df2826c3b` at 07:55Z, the landing-772 hop (`ledger: close wb-u6bv (landing 772, merge 655cbf02)`, committed 2026-11-01T07:53:31Z). After `git fetch -q origin` (rc 0) the fetched ref stands at `24e81e7ea2a6593871cdb05fcceb87054c9a80ea` (2026-11-01T08:02:52Z, landings 773..774); `git merge-base --is-ancestor aa9ea0d8c8b1 origin/workbench/implementation-program` exits 0, and `git diff --stat aa9ea0d8c8b1 origin/workbench/implementation-program -- new-feedback/ docs AGENTS.md CONTRIBUTING.md README.md qa` prints nothing, so every `path:line` below holds at both shas. The corroborated file was at `9fdd6d9b23485d9067c92d20df320f491182df91` (2026-10-29T08:08:26Z; 608 commits before the pin); the file it corroborates was at `fced7bfda63e6975d331fd4f31ff4463b2c9136e` (2026-10-25T21:21:19Z). The rig clone's checked-out HEAD `188ae5901612` sits 2,130 commits behind the fetched ref with 13 dirty paths; nothing was read from it, and trunk was neither checked out nor pushed from the main clone (live gate and land worktrees share its object store). Delivery: branch `machine/flywheel/feedback-2026-11-01`, cut from a detached worktree of the fetched trunk, for the program owner to land; the gate waiver (docs-only, no gate run) is disclosed in the commit body.
**Method:** read-only `python3 -I` pass over `machines/flywheel/ledger/metrics.jsonl` (44,097 lines at read time; 3,573 rows with `utc` inside the window, M:40475..M:44047; `M:n` is the 1-based line number); `git grep`, `git show` and `git ls-tree` at `aa9ea0d8c8b1` and at the fetched `origin/workbench/implementation-program` `24e81e7ea2a6`; the Library field reports read with `git show origin/main:bead_machines/raw/...` at Library `abe3e47978e19764e5d09b958cac7650c0dd229f`; the machine's `state/standing-rules.md`, `state/claim-form.md`, `state/dispatch/` and `BOUNDARY.md` read-only. No test, gate or mutant ran in this lane: every red/green count quoted is the gate's own, copied from a row.
**Scope:** feedback about `pi-subagents`' census convention as a tool surface and about the repository's contributor documentation for it — the header claim rows of `test/*census*.ts` that the flywheel's PREP F record-honesty step measures (the class the refusals name as R514/R515/R668, "claims wider than pins", rule 16 LEG 2) and whether anything a cutter reads in-repo names that class. The machine's rule-19 ladder and its claim-form cure are named only to size the cost and to separate the machine-side fixes from the product-side ask; they are the orchestrator's (mine), not this repository's. Not about the refused beads' substance.
**Corroborates:** [`2026-10-29-CORROBORATION-70-of-86-gate-refusals-in-24-h-name-r515-r668-and-2-beads-ruled-structural-at-refusals-4-and-7-so-a-header-claim-drifts-wider-than-its-reader-across-respins.md`](2026-10-29-CORROBORATION-70-of-86-gate-refusals-in-24-h-name-r515-r668-and-2-beads-ruled-structural-at-refusals-4-and-7-so-a-header-claim-drifts-wider-than-its-reader-across-respins.md) — verdict **STILL-TRUE** at `aa9ea0d8c8b1`; independent hit 3 (hit 1: `2026-10-26-positive-4-of-4-typed-record-honesty-refusals-in-24-h-measured-a-census-header-claim-false-by-a-partial-mutant-3-green-1-anchor-red-so-the-header-rows-give-the-gate-its-target.md` at `fced7bfd`; hit 2: the corroborated file at `9fdd6d9b`). Both earlier files are unlanded on trunk and travel on `origin/machine/flywheel/feedback-2026-10-26` and `origin/machine/flywheel/feedback-2026-10-29`.
**Prior art:** at the fetched trunk ref, `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 18 entries (17 files + README.md); the body grep `git grep -n -i -E 'R514|R515|R668' origin/workbench/implementation-program -- new-feedback/` exits 1 (0 hits) and `wider than pins|claim-wider|claims wider` hits 0 files; the filename grep `r514|r515|r668|refus|prep|wider|pin|claim|rule-1|standing|contributor|doc` hits 5 of 17 on generic words, among them the shape precedent `2026-10-20-the-rule-16-frozen-shape-assertion-lives-only-in-the-machine-standing-rules-and-the-byte-frozen-traceability-md-so-10-of-13-gate-refusals-in-24-h-cite-it-and-no-contributor-doc-shows-the-literal.md` (cited, not restated). Over the union of the 14 `origin/machine/flywheel/feedback-*` branch listings (35 unique paths) the body grep for the same tokens (`git grep -l -i -E 'R514|R515|R668' <branch> -- new-feedback/`, unioned over the 14 branches; the same 7 under a case-sensitive grep) hits 7 of the 35 paths: the two files above plus five that name the class in passing — `2026-10-29-CORROBORATION-n-2-docs14-report-mode-rows-turned-a-60000-ms-tool-reply-bench-timeout-into-a-census-red-at-landings-627-and-650-despite-the-explicit-per-it-budget.md`, `2026-10-29-CORROBORATION-n-58-landings-611-668-landed-58-of-58-merge-trees-identical-to-the-gated-tree-35-of-them-in-13-octopus-batches-of-2-to-4-members-and-2-of-them-src-landings.md` (its lines 10 and 12 name `the R515/R668 refusal class`), `2026-10-30-census-liveness-probes-red-as-real-assertions-that-name-no-primary-when-a-pinned-file-fails-refusing-landings-685-and-692-pre-leg-on-adversarial-matrix-666-and-w21-survivor-pins-78.md`, `2026-10-30-positive-16-of-30-census-files-carry-both-control-cases-and-falsifier-rows-at-a520cbd-and-23-of-the-window-s-28-rule-19-rulings-quote-a-control-twin-plant-or-falsifier-reading.md` and `2026-10-31-istypenode-guarded-readers-skip-value-position-instantiation-expressions-under-ts-6-0-3-11-wb-021-2-plants-quiet-8-of-9-landed-guard-sites-lack-the-scratch-census-carve-out.md`. This working tree is 2,130 commits behind the ref (`git rev-list --count HEAD..origin/workbench/implementation-program`), so the ref listing, not `ls`, is the index. The orchestrator's scout for this run proposed the finding as a new gap file because it read only the trunk ref and the 2026-10-31 branch; the 2026-10-26 and 2026-10-29 branch files make it a corroboration.

## Why a second file rather than an edit

The two earlier files carry their own windows, revisions (`fced7bfd`, `9fdd6d9b`) and methods, and each travels on its own delivery branch; neither is edited. A separate file keeps the three windows separable, which is what makes n=3 mean anything — folding this window's 77 rows into the 2026-10-29 file would turn three measurements into one and destroy the independence the count claims. It also keeps the append-only rule this directory's README states, and spares every writer the merge conflict a shared file imposes under concurrent filing.

## What this adds

- **A new measurement:** a third window at larger share and with the cost summed. 74 of 77 `gate-refused` rows in 24 h name R514, R515 or R668 in their `reason` field (the corroborated file: 70 of 86 on the outbox fields, 68 of 86 on `reason`; the first file: 4 of 8); `prepSeconds` sums to 192,198 s = 53.4 seat-hours over the 77 rows (the corroborated file gave a median, 2,243 s on 81 of 86, not a sum); 58 of the 77 refusals are refusal #2 or later and carry 148,948 s of the 192,198; and the rule-19 ladder that the corroborated file saw at "2 beads ruled structural" bound 28 SECOND-STAGE CAPs, 19 STRUCTURAL EXITs and 9 DEPENDENCY INVERSIONs in the same 24 h (79 `ruling-bound` rows, classified by opening phrase). The re-check of the docs gap at a third revision, with a wider needle set, rides in the verdict table below.

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| 70 of 86 refusals name R515/R668; respins re-fail through new members; the mechanism is a header claim wider than its reader, written as prose | the corroborated file, Findings 1, 3 and 4 |
| 4 of 4 typed record-honesty refusals measured a census-header claim false by a partial mutant; the header rows give the gate its target | `2026-10-26-positive-4-of-4-typed-record-honesty-refusals-in-24-h-measured-a-census-header-claim-false-by-a-partial-mutant-3-green-1-anchor-red-so-the-header-rows-give-the-gate-its-target.md` |
| No contributor doc states the convention; fix 1 = one paragraph in `docs/workbench/14-qa-and-benchmarks.md` under "Truth labels and release gates" | the 2026-10-26 file, fix 1; re-checked STILL-OPEN at `9fdd6d9b` in the corroborated file's Finding 5 |
| Product-side request: a co-located claimed-set block that a helper asserts against the roster, with three acceptance criteria | the corroborated file, Finding 6 |
| A gate rule that lives only in the machine's standing rules and a byte-frozen doc (rule 16, the frozen-shape leg), cited by 10 of 13 refusals, no contributor doc showing the literal | `2026-10-20-the-rule-16-frozen-shape-assertion-lives-only-in-the-machine-standing-rules-and-the-byte-frozen-traceability-md-so-10-of-13-gate-refusals-in-24-h-cite-it-and-no-contributor-doc-shows-the-literal.md` (at trunk) |
| 16 of 30 census files carry control cases and falsifier rows; 23 of 28 rule-19 rulings quote a control, twin plant or falsifier | `2026-10-30-positive-16-of-30-census-files-carry-both-control-cases-and-falsifier-rows-at-a520cbd-and-23-of-the-window-s-28-rule-19-rulings-quote-a-control-twin-plant-or-falsifier-reading.md` |
| This window's other two rig findings (a landed census whose store-wide mention scan reds trunk on a quoting bind note; sibling cuts of one census file conflicting at landing) | the two sibling 2026-11-01 drafts of this run, `2026-11-01-CORROBORATION-n-4-the-skip-cache-census-makes-any-note-naming-a-family-a-mention-row-quotes-included-so-trunk-red-twice-in-24-h-and-5-held-gates-burned-16-648-gate-seconds.md` and `2026-11-01-CORROBORATION-sibling-census-cuts-conflict-at-landing-in-5-pairs-in-24-h-wb-0x41-vs-landed-wb-0lf-8-at-9-regions-and-a-union-of-the-texts-still-fails-the-pinned-tallies.md`, unlanded |

## Summary, with numbers

In the 24 h window the metrics ledger holds 3,573 rows placeable by `utc` (M:40475..M:44047), among them 77 `gate-refused` rows (first M:40484 at 2026-10-31T08:01:05Z, last M:44021 at 2026-11-01T07:49:26Z; 49 distinct beads) and 79 `ruling-bound` rows (R-B168 at M:40479 .. R-B246 at M:43972). 74 of the 77 refusal reasons name R514, R515 or R668; 74 of 77 also say `LEG 2` (the class is judged as the second leg of standing rule 16); 47 of 77 carry the words `wider than`. 76 of 77 were refused at a PREP F stage (the exception, M:43393 wb-kym4, at PREP IDENTIFY as a re-cut trigger); 76 of 77 carry `gateSeconds` 0 with `synthesized` true (the refusal fast path; the exception, M:43823 wb-km7q.11 at PREP F, ran 612 gate-seconds). `prepSeconds` is present on 77 of 77: sum 192,198 s (53.4 seat-hours), median 2,403 s, range 696..5,070 s. By refusal ordinal: #1 19 rows (17 name the class), #2 27, #3 21, #4 9, #5 1 — 58 of 77 are respins re-failing, at 148,948 s. 45 refusals fell before 21:16Z and 32 after it (the post-reboot dispatch boundary; R-B214 at M:42344 puts the host reboot at `~2026-10-31T20:24Z`). The design pack's critic, over a different, overlapping window, reads `85/85` at PREP F and `211,550 s = 58.8 seat-hours`. The rule-19 ladder bound 28 caps, 19 structural exits (19 distinct beads; the post-reboot field report states of its 7 that every exit child was filed first) and 9 dependency inversions; 28 of 28 caps, 19 of 19 exits and 7 of 9 inversions name the class. At `aa9ea0d8c8b1` the five contributor-doc paths (`docs/`, `AGENTS.md`, `CONTRIBUTING.md`, `README.md`, `qa/`) hit 0 lines for each of `R514`, `R515`, `R668`, `claims wider`, `wider than pins`, `claim-wider` and `READINGS-UNPINNED`, while the control `R539` hits 3 files on the same pathspec; the identifiers live in-repo only in 3 landed test files (two as respin history in header comments; `test/workbench-acceptance-journeys.census.ts` carries R668 as the name of its F1-F5 forms, in comments and in code) and in the two `.beads` export files (`issues.jsonl` 263 matching lines, `interactions.jsonl` 4). Grades: Findings 1, 3, 4 and 5 CONFIRMED (re-checks STILL-TRUE), Finding 2 CONFIRMED as quoted. The machine-side claim-form flip (R-B174) and its NO-COHORT readback (R-B200) are quoted as context after Finding 5, not graded as a finding of this repository: their effect on the class is UNDETERMINED (artifact named there) and no disposition is owed here.

## Finding 1 — 74 of 77 gate-refused rows in the window name R514, R515 or R668 in `reason`, 76 of 77 at a PREP F stage and 76 of 77 with `gateSeconds` 0, and `prepSeconds` sums to 192,198 s — **CONFIRMED**

The pass placed every row by `utc`, kept `kind == "gate-refused"`, and tested the `reason` field against the regex `R514|R515|R668` (case-sensitive, as are the `PREP F` and `LEG 2` tests; all three count the same under `-i`); the whole-row test (every field, `json.dumps`) is given beside it because the orchestrator's evidence packet quoted that form. The `class words in reason` line is the one test in the block that matches case-insensitively (substring, both sides lower-cased); the same pass case-sensitively gives `rule 16` 68, `frozen` 21 and `record honesty` 22, and the other five counts (`wider than` 47, `claims-wider` 4, `claim-wider` 4, `READINGS-UNPINNED` 3, `record-honesty` 4) are identical in both modes.

```
=== gate-refused rows in window: 77 lines 40484 .. 44021
reason names R514|R515|R668: 74 of 77
whole row JSON names R514|R515|R668: 75 of 77
reason contains 'PREP F': 76 of 77
refusedAtStage: {'PREP F': 70, 'PREP F (synthesized GATE record; no gate ran)': 4, 'PREP F (substance: rule 16 LEG 2) plus PREP D6 (cut-caused landing-merge red)': 1, 'PREP F custody re-check (synthesized GATE record; no gate ran)': 1, 'PREP IDENTIFY (A KNOWN-RED RULE by reference; B R539 (i) conflict)': 1}
prepSeconds numeric on 77 of 77 sum 192198 median 2403 min 696 max 5070 hours 53.4
gateSeconds values: [(0, 76), (612, 1)]
synthesized: Counter({True: 76, False: 1})
distinct beads: 49
refusalNumber dist: [(1, 19), (2, 27), (3, 21), (4, 9), (5, 1)]
needsRuling: Counter({True: 56, False: 21})
unmetIds nonempty: 48 of 77
class words in reason: {'wider than': 47, 'rule 16': 74, 'frozen': 23, 'record honesty': 29, 'claims-wider': 4, 'claim-wider': 4, 'READINGS-UNPINNED': 3, 'record-honesty': 4}
refused pre-reboot (07:55..21:16): 45 post (21:16..07:55): 32
refusal #1 rows: 19 naming family in reason: 17
refusal #2+ rows: 58 naming family: 57 prepSeconds sum: 148948
reason mentions 'LEG 2': 74 of 77
```

The three rows whose `reason` does not name the identifiers, each quoted to its first 300 characters of the raw `reason` string: one is the same class under its floor wording, two are re-cut triggers rather than substance refusals. M:43393's `reason` carries a `\n\n` paragraph break after `needsRuling is false.` (the other two carry no newline); it is preserved below as the blank line inside that row, so the excerpt is byte-verbatim.

```
 M:42157 wb-pyel.9 | Substance RESPIN at PREP F, plus a D landing-merge red. This is refusal #1 on cut #1: tip bee8c260 on base 379a9457, respin 0, gateBase f63d3896, probe 979e5836 (tree d24ad502), needsRuling false. (U1, HIGH) Rule 16 LEG 2 is not met. The R-B123/R-B161 floor ('no claim word survives without a falsifi
 M:43044 wb-0x41 | KNOWN-DIRTY (re-cut trigger, R539 (i) / standing rule 15) at the PREP F custody re-check: refusal #3 for wb-0x41, the first on the frozen ENUMERATE-THE-RESOLVABLE cut #3 (tip 3fdd490b on base 379a9457, respin 0; gateBase 7f28422c, probe 5e72e3b4; synthesized GATE record, no gate ran; needsRuling fal
 M:43393 wb-kym4 | KNOWN-RED-BY-REFERENCE + KNOWN-DIRTY (a re-cut trigger, standing rule 15 / R539 (i)) at PREP IDENTIFY. This is refusal #1 on cut #1 (tip 3c4ca90a on base 74f8aa74, respin 0). It is routine, so needsRuling is false.

The queue entry carries knownRedAtLanding '750'. That is a hand flag set at the land
```

Two refusal reasons from the 74, a first cut and a second, quoted to their first 420 characters (the `|` characters are the gate's own):

```
M:41612 wb-b9ot 2026-10-31T15:29:41Z refusal#1 prepSeconds=2631 gateSeconds=0 stage=PREP F
Substance RESPIN at PREP F: rule 16 LEG 2 is not met (R514/R515/R668: claims wider than pins). U1: the F3 lead is not closed - S1 (a test-config alias to a call-through shim), S2 (a setup-file vi.mock call-through) and S3 (a src/node_modules shadow of the provider's own import) each keep the delivered census at 0 failed|11 passed while T2's title (:1352) and header :44-52 claim the installed copy. U2: five tsc- and b
M:41910 wb-tz2.17 2026-10-31T17:27:35Z refusal#2 prepSeconds=2263 gateSeconds=0 stage=PREP F
Substance RESPIN at PREP F: rule 16 LEG 2 is not met. Record honesty (standing rule 6) fails because the cut claims more than it pins (R514/R515; R668): 27 of 27 new gate-authored one-edit hollowings of test/helpers/hyperunix-successor-gate-readers.ts keep the census at 0 failed | 405 passed (405) on probe e991fc33 (tree 4a506a1f) - U1 19 scope x sub-form members ('in every scope', 'read in the suite', the package-mo
```

Where the three identifiers come from, on the machine side (read-only; `machines/flywheel/BOUNDARY.md`): R514 is the orchestrator's row 514 of 2026-10-17T23:57:40Z (`BOUNDARY.md:2534`, "wb-8bi RESPIN ... header over-claims"), R515 is row 515 of 2026-10-18T00:11:50Z (`:2542`, "wb-ksz.6 RESPIN (haiku, statement-level, comment-only)"; the string `ORCH-REC-R515` first appears at `:2544`, `Bound verbatim as ORCH-REC-R515 on wb-ksz.6 (readback 1)`), and R668 is the 2026-10-21T15:50:13Z binding recorded inside the wb-h8f.15 landing-222 sequence (`:5009` RULING R667, `LAND = landing 222`; `:5011` LANDING 222 LAND-PREP; `:5013` the binding; `:5015` `## FOLD landing 222 (wb-h8f.15)`). The `:5013` line itself names no bead; it reads in part `R668 binding: the stale PASS cmd_f5cf1c21ca88 does NOT land as-is (R667(3)). At fold 222 the orchestrator flags rebaseNeeded and reopens for the MANDATORY RE-CUT: merge the landing-222 hop INTO the branch, preserve both import edits, rerun the census. ALL F1-F5 bind into this same re-cut`, and the bead that re-cut is named in-repo by `test/workbench-acceptance-journeys.census.ts:1397` at the pin (`// R668 (wb-qys1 respin 1): the gate-prep-10 LEG-2 survivors F1-F5 bind into this re-cut.`), whose fold is `BOUNDARY.md:5071` (`## FOLD landing 229 (wb-qys1) (2026-10-21T20:08:11Z, orchestrator via bin/fold.sh)`). `BOUNDARY.md` mentions them on 132, 210 and 170 lines respectively. The leg the reasons cite is standing rule 16's second leg: `state/standing-rules.md:18` reads, in part, `as LEG 2; PASS requires both legs`; the rule text itself names none of R514, R515 or R668 (`grep -n -E 'R514|R515|R668' state/standing-rules.md` prints nothing over its 33 lines). The orchestrator's evidence packet for this run quoted 75 of 77 and 77 of 77; those are the whole-row and the stage counts (75 of 77 whole-row above; 76 of 77 `PREP F` in `reason`, with M:43393 at PREP IDENTIFY the exception). The field each number rests on is stated here so a reader can pick.

## Finding 2 — the design pack's critic counted the same class over an overlapping window: 85 of 85 at PREP F, 211,550 s = 58.8 seat-hours, 61% of that window's seat-hours — **CONFIRMED** as quoted

`bead_machines/raw/flywheel-g10.21-design-20261101T0239Z/critic.md` at Library `abe3e479`, lines 19-20 and 220, verbatim (its window is 2026-10-30T22:22:00Z..2026-10-31T22:56:02Z, which overlaps this file's by about 15 h, so the two counts are not additive):

```
- gate-refused n=85: 85/85 reason names 'PREP F'; 85/85 mention R514|R515|R668; gateSeconds 0 on 85/85 (synthesized fast path);
  prepSeconds sum 211,550 s = 58.8 seat-hours, median 2402 s.
```

```
1. Refused-PREP seat-hours: 85/85 refusals at PREP F, 211,550 s = 58.8 h of the window's 96.1 seat-hours (61%). Inherited to g10.20
```

The critic's median (2,402 s) and this window's (2,403 s) agree to one second on different row sets, which is what a stable per-refusal PREP cost looks like: roughly 40 minutes of a gate seat per refused cut, before any complete gate runs.

## Finding 3 — the rule-19 ladder bound 28 second-stage caps, 19 structural exits and 9 dependency inversions in 24 h, and 54 of those 56 rulings name the class — **CONFIRMED**

Classification by the opening phrase (first 90 characters) of each `ruling-bound` row's `ruling` field, over the 79 rows in the window; a looser test (the phrase anywhere in the text) over-counts because an exit ruling recites the cap that preceded it, so the opening-phrase count is the one quoted:

```
--- by opening phrase (first 90 chars): {'SECOND-STAGE CAP': 28, 'DEPENDENCY INVERSION': 9, 'OTHER': 23, 'STRUCTURAL EXIT': 19}
--- post-reboot (utc >= 2026-10-31T21:16:00Z): {'OTHER': 8, 'SECOND-STAGE CAP': 11, 'DEPENDENCY INVERSION': 4, 'STRUCTURAL EXIT': 9}
--- of which naming R514|R515|R668 anywhere in the ruling text: {'SECOND-STAGE CAP': 28, 'DEPENDENCY INVERSION': 7, 'STRUCTURAL EXIT': 19, 'OTHER': 3}
--- beads with STRUCTURAL EXIT by opening phrase: ['wb-021.7', 'wb-2wiv.4', 'wb-40zp', 'wb-5333', 'wb-8avz', 'wb-b4lg', 'wb-eu94', 'wb-iug2', 'wb-jwc.10', 'wb-jwc.8', 'wb-jwc.9', 'wb-nnm7', 'wb-psx0', 'wb-ro24', 'wb-tz2.16', 'wb-tz2.17', 'wb-ulnv', 'wb-vf3r', 'wb-vgri']
```

Two cap rulings, quoted to their opening clause (the truncation is mine, marked):

```
M:40748 R-B181 2026-10-31T09:44:21Z bead=wb-0x41 :: Rule-19 SECOND-STAGE CAP bound for wb-0x41's R514/R515 READINGS-UNPINNED class (claims wider than their pins; R668 - a delivered contradiction never lands) at its second failure (refusal #2 on cut #2 4dbecde313346486324c3cb405d89a0ecc429df6, M:40742, O:1534, lane g10-gate-s157 per the row's run field, needsRuling true; refusal #1 was M:38914 on cut #1 85147eb445ce, needsRuling false, with the class-level guard disclo[...]
M:43722 R-B238 2026-11-01T05:36:42Z bead=wb-b9ot :: Rule-19 SECOND-STAGE CAP bound for wb-b9ot's R514/R515 claim-wider-than-pins class THE SAME VIEW (T2's title :1352 and header :44-52 claim the installed copy of the hyperunix SDK while gate-authored environment members substitute this file's binding; R668) at its second failure (refusal #2 on cut #2 00b292aa618854364e21fb22d45432c06cf77fd4 on base f63d3896, gateBase 54c3f36f, probe 95f4ad6a, M:43717, O:1626, run g10-[...]
```

The ladder is standing rule 19 (`state/standing-rules.md:21`, in part): `(c) a loop-cap check: the SECOND same-unmet frozen-shape re-failure of one bead freezes its shape, and the THIRD cut is authored in the enumerate-the-resolvable form (rule 14 shape)`. The post-reboot field report `bead_machines/raw/flywheel-ops-window-20261101T0323Z/NOTES.md:10` (Library `abe3e479`) states the class reading the exits share, verbatim: `uniform across R-B211/R-B213/R-B228/R-B229/R-B230/R-B233: a census header's blanket "a form no page plants is not claimed" does not narrow specific claim WORDS that name the defeated sub-form (R-B93, R668) - the gate's counter-reading was declined each time.` and, of the exits, `Every exit child was filed FIRST via bd create (family beads with --parent).` The corroborated file counted this ladder at 2 beads ruled structural (at refusals 4 and 7); this window alone holds 19 exits on 19 beads. The ladder is the machine's, so its correctness is not this repository's question; its size is the realized cost of the class the repository's convention leaves unstated.

## Finding 4 — at `aa9ea0d8c8b1` the five contributor-doc paths name none of R514, R515, R668, `claims wider`, `wider than pins`, `claim-wider` or `READINGS-UNPINNED`, while the control `R539` hits 3 files; the identifiers live in-repo only in 3 landed test files and in the two `.beads` export files — **CONFIRMED** (re-check verdict **STILL-TRUE** against the 2026-10-26 fix 1 and the corroborated file's Finding 5, now at a third revision and with a wider needle set)

```
$ for pat in 'R514' 'R515' 'R668' 'claims wider' 'wider than pins' 'claim-wider' 'READINGS-UNPINNED' 'src-pinning'; do printf '%s -> ' "$pat"; git grep -in -e "$pat" aa9ea0d8c8b1 -- docs AGENTS.md CONTRIBUTING.md README.md qa | wc -l; done
R514 -> 0
R515 -> 0
R668 -> 0
claims wider -> 0
wider than pins -> 0
claim-wider -> 0
READINGS-UNPINNED -> 0
src-pinning -> 0
$ git grep -in -E 'R514|R515|R668|claims wider|wider than pins' aa9ea0d8c8b1 -- docs AGENTS.md CONTRIBUTING.md README.md qa; echo "rc=$?"
rc=1
$ git grep -in -e 'R539' aa9ea0d8c8b1 -- docs AGENTS.md CONTRIBUTING.md README.md qa; echo "rc=$?"
aa9ea0d8c8b1:docs/workbench/receipts/wb-752.9.md:25:- Receipt rule (R539): docs/workbench/receipts/wb-752.9.md ADDED (first line "# wb-752.9: " followed by the 474-character bead title, byte-equal to the bead record); INDEX.md untouched (retired at landing 140 - never create or edit it).
aa9ea0d8c8b1:docs/workbench/receipts/wb-973.10.md:14:## 2026-10-18 receipt: R539 re-cut onto trunk 077e034, landed-first on both observer files (machine seat ws-01, run g7-work-s5, sonnet tier)
aa9ea0d8c8b1:docs/workbench/receipts/wb-h8f.6.md:19:- Receipt rule (R539): docs/workbench/receipts/wb-h8f.6.md ADDED (first line "# wb-h8f.6: " followed by the 456-character bead title, byte-equal to the bead record); INDEX.md untouched (retired at landing 140 - never create or edit it).
[... 3 more matching lines, trimmed here: wb-973.10.md:16, wb-973.10.md:22, wb-h8f.6.md:36 ...]
rc=0
```

(The `R539` control prints 6 matching lines in those 3 files — `wb-752.9.md:25`; `wb-973.10.md:14`, `:16`, `:22`; `wb-h8f.6.md:19`, `:36`; the block shows the first line of each file and marks the trim.) All five paths exist at the pin (`git cat-file -e aa9ea0d8c8b1:docs`, `:AGENTS.md`, `:CONTRIBUTING.md`, `:README.md`, `:qa` each exit 0; `CLAUDE.md` is absent). The corroborated file's own needle re-run at the pin: `git grep -l -i -F -e 'record honesty' aa9ea0d8c8b1 -- docs/ AGENTS.md README.md CONTRIBUTING.md qa` prints 0 files and the same grep over `test/` prints 8 (it printed 7 at `9fdd6d9b`). `LEG 2`, the leg name 74 of 77 reasons carry, hits 1 contributor-doc file — `docs/workbench/receipts/wb-91yt.md:40`, a bead receipt describing landed rows, not guidance — against 18 files under `test/` (`git grep -l -F -e 'LEG 2' aa9ea0d8c8b1 -- test/ | wc -l`; with `-i` it is 19, the extra file being `test/workbench-evidence-wiring.test.ts`, and the contributor-doc count stays 1 under either flag).

Where the identifiers do occur in the tree at `aa9ea0d8c8b1`: `git grep -il -E 'R514|R515|R668' aa9ea0d8c8b1` lists 5 paths — `.beads/interactions.jsonl`, `.beads/issues.jsonl` (263 matching lines), `test/workbench-acceptance-journeys.census.ts` (74 matching lines, 13 of them comment lines and 61 code — R668 is the name of that census's F1-F5 withdrawal-citation forms: the header comment `:36`-`:52`, the doc comments `:392`-`:474`, and the `:1397`-`:1517` block whose `R668_ID`, `R668_CLAIM` and sibling constants and whose `QYS1 R668 F1`..`QYS1 R668 F5` test titles carry it in code), `test/workbench-hx-recipe-serving-census.test.ts` (`:170`, `:201`, `:235`, all comment lines) and `test/workbench-rf-replay-history-census.test.ts` (`:142`, `:1423`, both comment lines); 0 of the 52 receipts under `docs/workbench/receipts/` name them. In the latter two files the occurrences are respin history in header comments, for example `test/workbench-hx-recipe-serving-census.test.ts:169-174`:

```
 * RESPIN, wb-psx0 CUT #2 (refusal #1 of cut #1 349b251b at PREP F, bound 2026-10-30 by gate-prep-18 of g10-gate-s144:
 * rule 16 LEG 2 and record honesty, the R514/R515 claim-wider-than-pins class under R739, 13 non-equivalent gate
 * members of the tag grammar surviving cut #1 at 0 failed | 35 passed; each unmet item is cured where named, by both
 * cure forms: (a) one G1 readmeControls control per surviving form, killed by its member, the gate's twins taken as
 * in-memory pages, and (b) the claim sentences narrowed to the pinned forms; no landed or cut #1 row, pin, plant,
 * control, witness entry or vocabulary entry is removed):
```

The doc the 2026-10-26 fix 1 named still carries its heading and nothing under it about claim rows: `docs/workbench/14-qa-and-benchmarks.md:119` is `## Truth labels and release gates` and `:121` still carries the sentence `Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.`; `git diff --stat 9fdd6d9b aa9ea0d8c8b1 -- docs/workbench/14-qa-and-benchmarks.md` prints nothing. The contributor docs did move between the corroborated revision and the pin — `git diff --stat 9fdd6d9b aa9ea0d8c8b1 -- docs AGENTS.md CONTRIBUTING.md README.md qa` ends `3 files changed, 121 insertions(+)` (`docs/workbench/07-native-integrations.md` +2, `docs/workbench/18-decisions-and-risks.md` +2, `docs/workbench/receipts/wb-d8io.md` +117), and 18 files with 856 insertions since `fced7bfd` — so the gap survived 608 commits of doc churn, not a frozen tree.

What a machine seat gets instead, read-only on the machine side: the refusal note on its bead (the `reason` text above, which names the identifiers), the rulings, and since 2026-10-31T08:45:44Z the claim form — `state/claim-form.md` (17 lines; `:7` reads in part `Give the census a title that names that pinned set (the files, cases and observable behavior), not an empty or wider reader category.`), whose text the K2 flip pastes into work-lane dispatch args (`grep -l -F 'Pinned reader set' state/dispatch/*.json` lists 10 of the 364 `.json` files there; the directory holds 573 entries). None of that reaches an author who is not a machine seat. The absence is CONFIRMED with the control armed; that the absence causes refusals is not claimed here — 77 of 77 refused cuts were machine seats' cuts, and those seats receive the refusal text.

## Finding 5 — the corroborated file's product-side request (a claimed-set block plus one helper assertion) is still unmet at `aa9ea0d8c8b1`: `test/helpers/census.ts` exports no claim symbol while the vocabulary it would bind grew from 70 to 88 census files — **CONFIRMED** (re-check verdict **STILL-TRUE**)

```
$ git show aa9ea0d8c8b1:test/helpers/census.ts | grep -n -E '^export .*[Cc]laim'; echo "rc=$?"
rc=1
$ git show aa9ea0d8c8b1:test/helpers/census.ts | grep -c -E '^export '
56
$ git show aa9ea0d8c8b1:test/helpers/census.ts | wc -l
6231
$ git grep -l -F 'NOT CLAIMED' aa9ea0d8c8b1 -- test/ | wc -l
88
$ git ls-tree -r --name-only aa9ea0d8c8b1 -- test/fixtures | grep -c -- '-roster.json'
137
```

The corroborated file measured the same probe at `9fdd6d9b`: rc 1 with the `^export` control listing the helper's exports, 70 `NOT CLAIMED` files, 127 roster fixtures. The helper's `claim` mentions are still comment lines (`:8`, `:22`, `:28`, `:89`, `:98`, `:152`, `:4679` per `git grep -n -i -E 'claim|NOT CLAIMED|READINGS|record honesty' aa9ea0d8c8b1 -- test/helpers/census.ts`). The request's acceptance criterion 2 ("0 edits to the 70 NOT CLAIMED files") now reads 88 files; the claim set is still free prose re-written on every cut, and 58 of 77 refusals in this window were re-writes of it.

## Machine-side context, no disposition owed by this repository: the claim-form flip R-B174 (08:45:44Z) and its NO-COHORT readback R-B200 (16:36:52Z)

This is not a finding of this repository — the cure and its readback are the orchestrator's — and it is kept here only because it is the number a product-side fix is measured against. The corroborated file's Finding 4 placed the cures on the machine side ("g10.18 K2, a seat-prompt claim form"). In this window the flip happened and was read back; `ruling-bound` M:41815 (R-B200) quotes the tool JSON, reproduced here from the row (one line, trimmed after `respinEnqueues`):

```
{"tool":"knob-readback","knob":"g10.18-K2-claim-form","window":{"since":"2026-10-31T09:50:00Z","until":"2026-10-31T16:34:58Z","seconds":24298},"rows":1031,"metrics":{"cohortN":0,"refusalShare":null},"rate":{"cohort":"claimForm=1 first cuts","n":0,"r515r668Refusals":0,"passes":0,"refusalShare":null,"untyped":0,"unjoined":0,"comparison":{"n":13,"r515r668Refusals":10,"passes":3,"refusalShare":0.769,"untyped":0}},"baseline":{"cut1":"cut-1 refusals 7 / cut-1 passes 3 (typed rows)","respins":"respins 27 of 34 typed refusals","r515r668":"R515|R668 on 38 of 42 refusals","respinEnqueues":"respin enqueues 50 of 89"}
```

So the comparison cohort (first cuts not authored under the form) ran 10 R515/R668 refusals against 3 passes (refusalShare 0.769, n=13) while the form's own cohort was empty at readback time. The JSON is quoted verbatim from the row; whether first cuts authored under the form fail the class less often is UNDETERMINED — no row in this window establishes it, and the artifact that settles it is the next `knob-readback` row with `cohortN` of at least 1. The rate is quoted because it is the number a product-side fix would have to beat.

## Evidence

The window pass (python, `-I`, read-only; the window predicate is `lo <= utc < hi` on the row's `utc` string):

```
window rows 3573 first line 40475 last line 44047
    77 gate-refused
    79 ruling-bound
    34 gate-pass
    34 gate-held
    35 landing-gate
    34 fold-done
=== ruling-bound rows in window: 79 lines 40479 .. 43972 labels R-B168 .. R-B246
```

Rig reads: `git fetch -q origin` rc 0; `git rev-parse --short=12 origin/workbench/implementation-program` = `24e81e7ea2a6`; `git log -1 --format='%H %cI %s' aa9ea0d8c8b1` = `aa9ea0d8c8b1262f4800365fdaf2615df2826c3b 2026-11-01T07:53:31Z ledger: close wb-u6bv (landing 772, merge 655cbf02)`; `git merge-base --is-ancestor aa9ea0d8c8b1 origin/workbench/implementation-program` rc 0; `git status --porcelain | wc -l` = 13 in the main clone (not read from); `git rev-list --count HEAD..origin/workbench/implementation-program` = 2130. Library reads: `git -C Library rev-parse origin/main` = `abe3e47978e19764e5d09b958cac7650c0dd229f` (2026-11-01T03:25:46Z); `critic.md` 319 lines, `NOTES.md` 28 lines, both fetched by `git show` from that ref. Machine reads (read-only): `BOUNDARY.md` 5,005,570 bytes; `state/standing-rules.md` 33 lines; `state/claim-form.md` 17 lines; `state/dispatch/` 573 entries, 364 of them `.json`; 0 of the 364 name R514 or R515 (`grep -l -E 'R514|R515' state/dispatch/*.json | wc -l` = 0) and 10 of the 364 carry the claim form's `Pinned reader set` heading.

## Re-check verdicts on the corroborated file

| Claim in the corroborated file | Verdict at `aa9ea0d8c8b1` |
|---|---|
| Finding 1: 70 of 86 refusals name R515/R668 on the outbox `unmet`/`summary`/`refusalClass` fields; 68 of 86 on the metrics `reason` | **STILL-TRUE**, at a larger share on `reason`: 74 of 77 (R514 now joins the pair in 47 of the 77 reasons as `wider than`). The outbox form is **UNDETERMINED** this cycle: `outbox.jsonl` was not re-read (artifact: `machines/flywheel/ledger/outbox.jsonl`, rows O:1526..O:1640 by the `O:` references in the rulings). |
| Finding 2: the orchestrator's typed count agrees in direction and places the defect upstream of the gate | **STILL-TRUE** as quoted: the design critic's `85/85` at PREP F (Finding 2 here), gateSeconds 0 on 76 of 77 rows (no complete gate ran before the refusal) |
| Finding 3: respins re-fail; 25 of 52 refused beads refused twice or more; two beads ruled STRUCTURAL at refusals 4 and 7 | **STILL-TRUE, and larger**: 58 of 77 refusals are refusal #2 or later, 31 are #3 or later; 19 structural exits and 9 dependency inversions bound in 24 h (Finding 3 here) |
| Finding 4: the mechanism is a claim wider than its reader, written as header prose; the cures under build are machine-side | **STILL-TRUE** as quoted (R-B181, R-B238, the two reasons in Finding 1); the machine-side cure flipped live (R-B174) and read back NO-COHORT (R-B200, the machine-side context section here) |
| Finding 5: the 2026-10-26 fix 1 is STILL-OPEN with the armed control; the vocabulary grew; its three refused beads landed | **STILL-TRUE** for the gap (0 contributor-doc hits for `record honesty` against 8 `test/` files; 0 for the seven identifier needles against the `R539` control, Finding 4 here); vocabulary growth re-measured (`NOT CLAIMED` 70 to 88 files, rosters 127 to 137); the three beads' landings **UNDETERMINED** (not re-checked; artifact: the `fold-done` rows for the three beads the corroborated file's Finding 5 names) |
| Finding 6: request for a claimed-set block plus a helper assertion; the absence at `path:line`, armed | **STILL-TRUE** (Finding 5 here: `^export .*[Cc]laim` rc 1 against 56 export lines) |

## Recommendations, additive to the corroborated file's list

1. **Re-weight the 2026-10-26 fix 1 and give the paragraph the machine's own tokens.** The one paragraph under `docs/workbench/14-qa-and-benchmarks.md:119` should name the class the way 74 of 77 refusal reasons do — `R514/R515/R668`, `claims wider than pins`, `rule 16 LEG 2`, `record honesty (standing rule 6)` — because those are the strings a refused author pastes into `git grep`, and today that grep lands only on three sibling census files (two respin-history comments and, in `test/workbench-acceptance-journeys.census.ts`, R668 as a form name) and the two `.beads` export files (Finding 4). The rule-16 file asked for the same shape for the frozen-shape leg; one paragraph can carry both legs.
2. **One sentence in `AGENTS.md`, in the `Fork-specific Pi Workflow Workbench architecture` bullet list (`:158-169` at the pin), pointing at that paragraph for any `test/*census*.ts` cut.** `AGENTS.md` already says `Every claim checkable — from the diff, or from a command you actually ran` (`:79`); the census claim rows are the case where "checkable" has a measured instrument, and the file every session loads is the cheapest promotion step.
3. **Cite a landed cure rather than writing new prose.** `test/workbench-hx-recipe-serving-census.test.ts:169-174` is an in-repo example of both cure forms (`one G1 readmeControls control per surviving form` and `the claim sentences narrowed to the pinned forms`); the paragraph can point at it.
4. **Keep the corroborated file's Finding 6 (the helper) ranked above the docs fix.** Prose reaches first cuts; 58 of the 77 refusals here are re-cuts that had already read a refusal note naming the class and still re-widened the claim through a new member. A helper that reds the census file-alone when a header claim names a member outside the pinned set is the only fix in either list that reaches every cut.
5. **Machine-side, not this repository's:** the claim form is live and its readback owes a cohort (the machine-side context section); until `cohortN` is at least 1 no one can say whether prose guidance moves the 0.769 comparison rate at all. That number is the bar a product-side fix is measured against.

## Positives worth protecting

- **Every refusal row is typed and self-describing.** 77 of 77 carry `refusedAtStage`, `refusalNumber`, `cutNumber`, `prepSeconds`, `gateSeconds`, `synthesized` and `needsRuling`; 48 of 77 carry a non-empty `unmetIds`. A 24 h census of the class is one read-only pass with no joins. A schema change that renames or drops those fields breaks every file in this thread.
- **The refusal fast path spends no complete-gate compute on a refused cut.** 76 of 77 rows are `synthesized` with `gateSeconds` 0; the one row that ran a gate (M:43823, 612 s) is the exception that shows the default. The 192,198 s cost is PREP time; without the fast path it would carry the gate's median on top.
- **Landed censuses record their own respin history in the header comment.** `test/workbench-hx-recipe-serving-census.test.ts:169-174` and `test/workbench-rf-replay-history-census.test.ts:142` are the two header comments that name the class and record a cure — the first shows both cure forms; the second reads across `:142`-`:143` `cut #3, the enumerate-the-resolvable cut of the R514/R515` / `class frozen under rule 19(c), cures that gate's second-refusal U1-U3 and F4 and pins its F5 members`, the rule-19(c) third cut. The third test file naming the identifiers, `test/workbench-acceptance-journeys.census.ts`, uses R668 as the name of its F1-F5 forms, not as a cure record (Finding 4). A refactor that strips census header comments removes the one in-repo trail a cutter can grep.
- **The ladder closes loops instead of spinning them.** 19 structural exits in 24 h, and the post-reboot field report states of its 7 that `Every exit child was filed FIRST via bd create` (`NOTES.md:10`), and a third cut frozen to the enumerate-the-resolvable form after the second same-class failure (rule 19(c)); the class is expensive, not unbounded.
- **The machine-side claim form is one tracked text.** `state/claim-form.md` is pasted, not paraphrased, into dispatch args (10 of 364 `.json` dispatch-args files carry its heading); if it is ever promoted into the repository, promoting the same bytes keeps the gate's reading and the author's text aligned.

## What I did not establish

- The outbox form of Finding 1 (the corroborated file's primary count) — `outbox.jsonl` was not re-read this cycle; the 74 of 77 here is the metrics `reason` field.
- Whether first cuts authored under the live claim form fail the class less often: `cohortN` was 0 at the R-B200 readback (the machine-side context section); no A/B exists in this window. Artifact: the next `knob-readback` row with a non-empty cohort.
- The 23 `ruling-bound` rows classified OTHER (fleet rulings, landing reviews, the reboot sweep) were not read beyond their opening phrase; 3 of them name the class (R-B210 among them) and none is a rule-19 step.
- The design critic's 85 of 85 and 211,550 s are quoted, not re-derived; its window overlaps this one by about 15 h and the two sums are not additive.
- Whether any author who is not a machine seat cut a census in the window — none was observed; all 77 refused cuts came from machine seats, which receive the refusal text that names the class. The docs gap is therefore CONFIRMED as an absence, not as a cause of these 77 refusals.
- Whether the test files' comments naming the class are read by cutting seats, and whether an in-repo paragraph would move the refusal share — no instrument exists for either.
- The orchestrator packet's figures (75 of 77, 77 of 77, 8 exits / 10 caps / 4 inversions post-reboot) rest on other fields and filters than the ones stated here (whole-row JSON; stage; an unstated ruling filter); each of mine names its field, and both sets are in this file so a reader can choose.
- No test, gate or mutant ran in this lane; every red/green count is copied from a row the gate wrote.
