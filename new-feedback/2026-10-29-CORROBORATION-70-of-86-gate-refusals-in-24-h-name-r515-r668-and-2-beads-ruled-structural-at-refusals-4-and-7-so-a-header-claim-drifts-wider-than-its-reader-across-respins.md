# CORROBORATION, n=2: 70 of 86 gate refusals in 24 h name R515/R668 and 2 beads ruled structural at refusals 4 and 7, so a header claim drifts wider than its reader across respins

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as the corroborated file, a later cycle: the window 2026-10-28T07:56Z..2026-10-29T07:35Z against its 2026-10-25T07:45Z..2026-10-26T07:30Z, a fresh parse of a ledger that grew from 22,524 to 33,362 lines in between, and 86 refusal rows against its 8. A later window with the same instrument, not a re-run of the same rows.
**Date:** 2026-10-29 (ledger window 2026-10-28T07:56:00Z <= `utc` < 2026-10-29T07:35:00Z; stamp 2026-10-29T07:35Z)
**`pi-subagents` revision:** source read at `origin/workbench/implementation-program` = `9fdd6d9b23485d9067c92d20df320f491182df91` after `git fetch -q origin` (rc 0, about 2026-10-29T08:15Z); the tip commit is dated 2026-10-29T08:08:26Z, `ledger: close wb-km7q.1 (landing 669, merge 3e63d8b3)`. The orchestrator's scout read `e3022a1390d5d7c69e8a928a360ce099776f91bf`, an ancestor (`git merge-base --is-ancestor e3022a1 9fdd6d9b` rc 0); `git diff --stat e3022a1 9fdd6d9b` names 4 files (`.beads/interactions.jsonl`, `.beads/issues.jsonl`, `test/fixtures/fo-controller-arbitration-roster.json` +775, `test/workbench-fo-controller-arbitration-census.test.ts` +1047), none of them a path cited below, so every `path:line` here holds at both shas. The corroborated file's pin `fced7bfda63e6975d331fd4f31ff4463b2c9136e` is also an ancestor (rc 0). Every refusal row carries its own `base`, the trunk tip it was gated against (the two structural-exit cuts below carry `b3d410fd128754699069e37514b421cf153510b5`), and its `commit`, the cut under test for that row (non-empty on 86 of 86 in-window refusal rows, as is `base`; the `gatedTree` / `gatedCommit` keys exist on all 86 but are empty strings on 85 of 86, populated only on M:30499, wb-4ap.16). Nothing was read from this clone's checked-out HEAD `188ae590` (`git rev-list --count HEAD..origin/workbench/implementation-program` = 1,518).
**`vitest` revision:** 4.1.10 — `package-lock.json:5281-5282` at `9fdd6d9b` reads `"node_modules/vitest": {` / `"version": "4.1.10"`; the clone's installed `./node_modules/.bin/vitest --version` prints `vitest/4.1.10 linux-x64 node-v24.20.0`.
**`node` revision:** v24.20.0 (`node --version`).
**Method:** read-only `python3 -I` pass over `machines/flywheel/ledger/metrics.jsonl` (33,362 lines at read time; 4,384 rows whose `utc` falls inside the window, M:28908..M:33291) and `machines/flywheel/ledger/outbox.jsonl` (1,302 lines; 145 in-window rows, O:1155..O:1299); `M:n` and `O:n` below are 1-based line numbers in those two files. Rulings are quoted from the `ruling` field of `ruling-bound` rows and from `machines/flywheel/BOUNDARY.md:10078` and `:10085`. Source reads with `git show`, `git grep`, `git ls-tree` and `git diff --stat` at `9fdd6d9b`, at `fced7bfd`, and at the two cut commits the refusal rows name. `scratch/fw-g1018/design/judge.json` and `critic.json` read-only. No test, mutant, gate or furnace verb ran in this lane; every red/green count below is the gate's, copied from the rows. A second pass at fix time (metrics.jsonl 33,460 lines, outbox.jsonl 1,303 at that read) found the same in-window rows at the same line numbers (M:28908..M:33291, O:1155..O:1299) and reproduced every in-window figure below; the lines it added to the Evidence section are marked "fix-time pass".
**Scope:** feedback about `pi-subagents`' census convention as a tool surface — the header claim rows of `test/*census*.ts` (READINGS, NOT CLAIMED, NAMED RESIDUAL, THE PINNED SET, the DISPATCH and STAND-IN labels) that the flywheel's record-honesty gate measures — and what 24 h of refusals say about how those rows behave across respins. Not about the refused beads' substance. The machine's own cures (g10.18 K2, a seat-prompt claim form, and K3, a pre-delivery self-falsifier) are named only to separate them from the product-side ask; they are not this repository's to fix.
**Corroborates:** [`2026-10-26-positive-4-of-4-typed-record-honesty-refusals-in-24-h-measured-a-census-header-claim-false-by-a-partial-mutant-3-green-1-anchor-red-so-the-header-rows-give-the-gate-its-target.md`](2026-10-26-positive-4-of-4-typed-record-honesty-refusals-in-24-h-measured-a-census-header-claim-false-by-a-partial-mutant-3-green-1-anchor-red-so-the-header-rows-give-the-gate-its-target.md) — verdict **STILL-TRUE** at `9fdd6d9b` (the corroborated file was at `fced7bfd`); independent hit 2: same seat, a later window, 86 refusal rows against 8.
**Where that file lives:** it has not landed on trunk at `9fdd6d9b` (its name is absent from the 18-entry `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/`); it travels on branch `origin/machine/flywheel/feedback-2026-10-26`, commit `fb01e5c455409110d4f6fed80dd95dab5eeb7387` (branch tip `68552907`). This clone's `new-feedback/` holds an untracked copy whose blob, `git hash-object` = `78d2601dc0781c9f89a3a187c41f1b6dbdb526b1`, equals the blob that commit carries for the same path; that copy is what resolved the reference above for lint. A detached worktree of trunk will not hold it until the owner lands that branch or the committer cherry-picks `fb01e5c4` first.
**Prior art:** `git fetch -q origin` (rc 0); `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` = 18 entries; `grep -i -E 'record|honest|R515|R668|claim|header|refus|census|roster|respin|structural'` over those names = 8 hits, none on the record-honesty class. Body greps `git grep -l -i -F -e KEYWORD origin/workbench/implementation-program -- new-feedback/`, with KEYWORD each of `record honesty`, `R515`, `R668`, `over-claim` and `claim wider`, print 0 files each. The theme's only prior file is the corroborated one, unlanded. Adjacent and cited, not restated: the 2026-10-20 file on the rule-16 literal that lives only in the machine, and the 2026-10-28 file on report-mode census consequents (the other census failure class of this window).
**Delivery:** docs-only, one file under `new-feedback/`, on branch `machine/flywheel/feedback-2026-10-29` cut from a detached worktree of `origin/workbench/implementation-program`, for the program owner to land; this repository's protected branches are never pushed to by feedback writers. Recipe for the committer, because the `Corroborates:` target is not on trunk ("Where that file lives" below): in the detached worktree run `git cherry-pick fb01e5c455409110d4f6fed80dd95dab5eeb7387` first (the corroborated file's commit), then add this file by name; without that cherry-pick the link dangles in the worktree and `feedback-lint.py --strict` reports CORRECTS there, and the owner must land `feedback-2026-10-26` before this branch. The strict lint rc 0 reported for this file was measured in the main clone, where the untracked copy exists. Gate waiver, disclosed per this directory's README: no build, typecheck, test or gate ran for this commit.

## Why a second file rather than an edit

The corroborated file is my own seat's, from a window three days earlier, and it stays unedited: it pins `fced7bfd`, 8 refusal rows and a method; this file pins `9fdd6d9b`, 86 rows and a re-run of the same instrument on a ledger that has grown by 10,838 lines since. Folding the two would make n=2 unreadable (which window said what) and would re-open a file that the feedback branch already carries under its own commit. A separate file also keeps the directory's EDIT-GUARD rule honest and spares the owner a conflict when both branches land.

## What this adds

- **A realized cost:** the corroborated file praised the header claim rows because "the header rows give the gate its target". This window is where that target's cost landed. The claim rows are now the dominant refusal class (70 of 86 gate refusals in 24 h name R515/R668, Finding 1); respins re-fail on the same class through new members instead of converging (25 of 52 refused beads were refused twice or more, any class; 19 of the 25 carry 2+ refusals matching `R515|R668` on the outbox `unmet` + `summary` + `refusalClass` fields; wb-0lf.2 four times in the window, wb-021.5 seven times over its life, Finding 3); two beads were ruled STRUCTURAL under rule 19(c)/(d): R-B66 at refusal #4 bound cut #5 and set the exit as the consequence of a fifth class-(a) refusal, R-B67 at refusal #7 executed the R-B60 (5) STRUCTURAL EXIT (child wb-021.7 filed, cut #8 as the fail-closed core), and neither bead had left the respin loop at the window's end; and R-B66 names the mechanism in the convention's own words, "a CLAIM wider than its reader", R-B67 rules out "the widen-the-reader shape" and R-B60 binds "NARROW THE CLAIM, NEVER WIDEN THE READER" (Finding 4). The cost is measurable in product terms: a 222-line and a 329-line header comment block carried the sentences measured false (Evidence), and the bound cure is a narrowing of prose at four sites that have to agree (Finding 6).

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| The header claim rows give the gate its target: 4 of 4 typed record-honesty refusals at `fced7bfd` measured a header sentence false by a partial mutant, 3 green and 1 anchor-red | [`2026-10-26-positive-4-of-4-typed-record-honesty-refusals-in-24-h-measured-a-census-header-claim-false-by-a-partial-mutant-3-green-1-anchor-red-so-the-header-rows-give-the-gate-its-target.md`](2026-10-26-positive-4-of-4-typed-record-honesty-refusals-in-24-h-measured-a-census-header-claim-false-by-a-partial-mutant-3-green-1-anchor-red-so-the-header-rows-give-the-gate-its-target.md) |
| No contributor doc states the convention; the armed grep over `test/` shows the instrument works | the same file, fix #1 (re-checked STILL-TRUE in Finding 5) |
| A gate rule that lives only in the machine's standing rules and a byte-frozen doc, cited by 10 of 13 refusals, with no contributor doc showing the literal | `2026-10-20-the-rule-16-frozen-shape-assertion-lives-only-in-the-machine-standing-rules-and-the-byte-frozen-traceability-md-so-10-of-13-gate-refusals-in-24-h-cite-it-and-no-contributor-doc-shows-the-literal.md` |
| The other census failure class of this window: a report-mode census consequent turning one timeout into a REAL RED (loop stops R-B48 at landing 627 and R-B57 at landing 650 are that class; they are judge reds, not gate refusals, so they sit outside every count here) | `2026-10-28-report-mode-census-rows-turn-one-pi-streaming-5000-ms-timeout-into-2-real-assertion-census-reds-so-landing-587-was-refused-pre-leg-at-76-min-vs-17-for-neighbours-n-2-in-24-h.md` |

## Summary, with numbers

In the 24 h window the metrics ledger holds 4,384 rows placeable by `utc` (M:28908..M:33291): 86 `gate-refused`, 58 `gate-pass`, 58 `gate-held`, 58 `landing-gate`, 58 `fold-done` (landings 611..668, 58 distinct `landing` values; 56 `landingKind` test, 2 src), 28 `ruling-bound`, 7 `machine-defect`. The outbox holds 145 in-window rows (O:1155..O:1299): 86 `gate-refused`, 58 `proposed-closure`, 1 `gate-could-not-judge`. 70 of the 86 outbox refusal rows match the regex `R515|R668` over their `unmet`, `summary` and `refusalClass` fields; 74 of 86 when `record.honesty` (case-insensitive) joins the regex. The metrics twins of the same 86 rows carry no `summary` on 76 of them, so the same regex reads 60 of 86 on `unmet` + `refusalClass` and 68 of 86 once the free-text `reason` is included, 69 of 86 with `unmetVerbatim` as well (Finding 1). 71 of 86 refusal rows sit on family beads (an id with a dot), 15 on root beads; 52 distinct beads were refused (42 family, 10 root). `refusalNumber` is present on 74 rows: #1 39, #2 23, #3 7, #4 2, #5 1, #6 1, #7 1; the other 12 carry `refusalOrdinal` (nine 1, two 2, one 3). `gateSeconds` is an int on 86 of 86 refusal rows: median 525 s, 0-1,688 s, the 9 zeros being the 9 `refusalFastPath` rows (median 558 s, 250-1,688 s on the other 77); `prepSeconds` is present on 81 of 86: median 2,243 s, 760-3,663 s (Finding 1). The gate was busiest refusing between 15:24Z and 21:24Z: 55 `gate-refused` against 12 `proposed-closure` (O:1189..O:1256), then 20 against 11 from 21:27Z to 03:22Z (O:1257..O:1287). 25 of the 52 refused beads were refused twice or more (any class; 19 of the 25 carry 2+ refusals matching `R515|R668` on the outbox `unmet` + `summary` + `refusalClass` fields, 24 carry 1+, and wb-021.5's #5 and #6 are counted under their own `class A` label, not the regex); 20 of 52 passed a later in-window gate, 13 of the 25 among them. wb-0lf.2 was refused 4 times (M:30747, M:31507, M:32618, M:33001) and ruled STRUCTURAL at R-B66 (M:33010), which bound cut #5 and made the exit conditional on a fifth class-(a) refusal; wb-021.5 was refused 3 times in the window (#5 M:31006, #6 M:31704, #7 M:33046; 7 `gate-refused` rows over its life) and R-B67 (M:33052) executed the structural exit and filed child bead wb-021.7 (Finding 3). R-B66 names the surviving defect "a CLAIM wider than its reader"; R-B67 names it "over-claimed the stand-in set in the header" and rules "no respin 7 in the widen-the-reader shape"; R-B60 (M:31709) binds "NARROW THE CLAIM, NEVER WIDEN THE READER" (Finding 4). The corroborated file's fix 1 stays open at `9fdd6d9b`: `git grep -l -i -F -e 'record honesty'` over `docs/ AGENTS.md README.md` prints 0 files while the same grep over `test/` prints 7 (5 at `fced7bfd`); the claim vocabulary grew in `test/` (NOT CLAIMED 31 to 70 files, census files carrying any header token 58 of 134 to 97 of 170), and its three refused beads landed on 2026-10-27 at landings 521, 527 and 532, each after one later gate pass (Finding 5). Nothing in `test/helpers/census.ts` (6,231 lines) can read a header claim: 0 exported symbols carry `claim` in their name, the 7 mentions are comment lines, and the structured halves of a cut are `CasePin` (`:293-308`) and the roster fixture (127 `test/fixtures/*-roster.json` at `9fdd6d9b`, 97 at `fced7bfd`) (Finding 6, a request). Grades: Findings 1-5 CONFIRMED (Finding 4 as quoted), Finding 6 a request without a truth grade; the per-refusal gate-seat cost stays UNDETERMINED.

## Finding 1 — 70 of 86 gate refusals in the window name R515 or R668 in the outbox rows' unmet, summary or refusalClass text; the metrics twins read 68 of 86 with the reason text and 60 of 86 without it — CONFIRMED

The count is a regex over JSON-dumped fields, and its value moves with the field scope, so each figure carries its scope:

| population (86 `gate-refused` rows, in-window) | fields read | `R515\|R668` | `R515\|R668\|record.honesty` (case-insensitive) |
|---|---|---|---|
| outbox.jsonl O:1155..O:1299 | `unmet`, `summary`, `refusalClass` | **70 of 86** | 74 of 86 |
| outbox.jsonl, same rows | plus `reason` | 70 of 86 | 74 of 86 |
| metrics.jsonl M:28908..M:33291 | `unmet`, `refusalClass` (+ `summary` on the 10 rows that carry it) | 60 of 86 | — |
| metrics.jsonl, same rows | plus `reason` | 68 of 86 | 70 of 86 |
| metrics.jsonl, same rows | `reason`, `unmet`, `unmetVerbatim`, `refusalClass` (`summary` excluded; the same 69 with it) | 69 of 86 | 70 of 86 (71 of 86 with `summary`) |

The typed `refusalClass` field is present on 19 of the 86 metrics rows and names R515/R668 or record honesty on 14 of those 19; the pattern `record.honesty`, case-insensitive (it matches `record honesty` and `record-honesty`), hits `reason`, `unmet`, `unmetVerbatim` or `refusalClass` on 62 of 86, and the literal two-word spelling `record honesty` alone, case-insensitive over the same four fields, on 59 of 86. The 16 outbox rows outside the `R515|R668` match include three title over-claim refusals (O:1185 wb-3jun, O:1204 wb-tz2.11, O:1206 wb-tz2.12 "U1 RECORD HONESTY, T3 carry scope (title floor; HIGH)"), wb-021.5's refusals #5 and #6 (O:1224, O:1263; "class A" verbatim in both `refusalClass` fields; O:1224's reason reads "a newly discovered escape is a residual-list addition unless it contradicts a pinned claim; this one contradicts the pinned DISPATCH label" and O:1263's "the escapes contradict pinned claims" — the same over-claim shape under the bead's own class label, which the regex does not match), two landing-merge reds (O:1228, O:1242), one rule-16 each-liveness refusal (O:1198) and one R739 TERMINAL-form refusal (O:1213); I read the first 110 characters of each reason and did not classify them further.

Where the refusals fall: `refusedAtStage` names PREP F on 60 of 86 metrics rows (24 carry no stage field, 1 says BIND, 1 says prep). `gateSeconds`, the field the corroborated file's 464-908 s was read from, is an int on 86 of 86 rows: median 525 s, minimum 0, maximum 1,688 s; the 9 zeros are exactly the 9 `refusalFastPath` rows named below, and on the other 77 rows the median is 558 s, 250-1,688 s. `prepSeconds` is present on 81 of 86 rows: median 2,243 s, minimum 760 s, maximum 3,663 s (`wallSeconds` is 0 on 85 of 86 refusal rows, so it is not the duration of a refusal). 9 of the 86 rows carry `refusalFastPath` 1 and `synthesized` true, all from 2026-10-29T00:32:28Z (M:32584) to 06:47:15Z (M:33194) — the g10.17 K2 PREP-refusal fast path; only M:33046's reason spells out what the two fields mean ("synthesized GATE record, K2 refusal fast path, no GATE agent ran"), the other 8 carry the fields without that sentence. wb-0lf.2 #3 (M:32618) and #4 (M:33001) and wb-021.5 #7 (M:33046) are among the 9. The sub-windows: 15:24:00Z-21:24:59Z 55 `gate-refused`, 12 `proposed-closure`, 1 `gate-could-not-judge` (O:1189..O:1256); 21:27:00Z-03:22:59Z 20 and 11 (O:1257..O:1287).

## Finding 2 — the orchestrator's own typed count agrees in direction and places the defect upstream of the gate — CONFIRMED as quoted

M:31031 (`machine-defect`, 2026-10-28T18:13:44Z), label verbatim: "work-lane deliveries refused at the gate at ~47% today (29 of 62 verdicts since 09:22Z), almost all the R515/R668 census over-claim class". Its detail: "refused 30 vs passes 32 since 09:22Z; families {'wb-tz2': 6, 'wb-0lf': 5, 'wb-jwc': 3, 'wb-4ap': 2, 'wb-e66': 2, 'wb-obyu': 1, 'wb-1no5': 1, 'wb-3jun': 1}; classes {'R515/R668 record-honesty over-claim': 19, 'other': 6, 'title over-claim': 1, 'U1 each-liveness / unfrozen table': 4}; ... respin>=2: 3. Each PREP-F refusal spends 60-80 min of gate-seat time (the design's gate-cycle scout) and returns the bead to the store queue for a respin that costs a work seat's full cycle again ... The refusals are substantive (the gate's falsifier/mutant probes find census header claims that the test does not pin; R514-class non-equivalent plants survive), so the gate is doing its job; the defect is upstream: the work seat ... delivers census tests without running the same falsifier probe before delivery, and the ritual-check Attempt (lint + typing) never exercises claims." The "60-80 min" is that row's estimate, not a field I could re-derive; the `prepSeconds` distribution in Finding 1 is what the rows carry, and it measures the PREP stage only.

The g10.18 design judge counted the same class on a narrower population and field (`scratch/fw-g1018/design/judge.json`): "O:1165-O:1266 has 65 refused, 36 proposed-closure, 1 could-not-judge; 43/65 refused unmet lists name R515/R668; family 42/46 refused vs root singles 8/34 in the same audited population." My re-derivation of O:1165..O:1266 gives the same 65 / 36 / 1 (rows dated 2026-10-28T10:25:06Z to 22:53:25Z). The critic (`critic.json`): "9 of 11 post-baseline refusals (O:1267-O:1284) are cut >= 2" — re-derived: O:1267..O:1284 holds 11 `gate-refused` and 7 `proposed-closure`, and 9 of the 11 carry `cutNumber` >= 2.

## Finding 3 — respins re-fail: 25 of 52 refused beads were refused twice or more (any class; 19 of the 25 with 2+ refusals matching R515|R668 on the outbox unmet + summary + refusalClass fields, 24 with 1+), 13 of the 25 passed later in the window, and two beads were ruled STRUCTURAL under rule 19(c)/(d) at refusals 4 and 7 — CONFIRMED

Per bead, `gate-refused` rows in the window: wb-0lf.2 4; wb-2j3.10, wb-jwc.5, wb-0lf.3, wb-021.5, wb-b9n.1, wb-2wiv.1 and wb-2wiv.2 3 each; 17 more beads 2 each; 27 beads once. 20 of the 52 refused beads passed a later in-window gate (a `gate-pass` row for the bead after its first refusal), 13 of them among the 25 multi-refused. The 25 counts refusals of any class; matching the class regex per bead (outbox `unmet` + `summary` + `refusalClass`, `R515|R668`), 19 of the 25 carry 2 or more matching refusals, 24 carry at least 1, and wb-3ht.2 (2 refusals, O:1249 and O:1275) carries 0. Five multi-refused beads match on exactly one row — wb-lrz.4, wb-tz2.11, wb-jwc.6, wb-b04.1 and wb-021.5, which matches on 1 of its 3 in-window rows (#7, O:1293), its #5 and #6 being typed `class A` (Finding 1).

wb-0lf.2 (`test/workbench-gp-snapshot-export-census.test.ts`, 3 files per cut): refusal #1 M:30747 2026-10-28T17:06:07Z (O:1210), #2 M:31507 21:05:09Z (O:1254; the reason opens "respin (substance, PREP F; cut #2, refusal #2; R515/R668 class): gate-authored falsifiers survive and contradict the census's own claims. Refusal #1's named members are all cured ... But new members of two of its classes survive."), #3 M:32618 2026-10-29T00:51:44Z (O:1281, fast path; "Refusal #2's named members are cured ... But new members survive"), #4 M:33001 05:06:15Z (O:1290, fast path; "the cut cures every member refusal #3 named ... But THE PINNED SET's G1 bullet claims more than G1's reader is proven on"). These are the bead's only 4 `gate-refused` rows in the whole ledger. R-B66 (M:33010, 05:07:58Z; `BOUNDARY.md:10078`) ruled that "rule 19(c)/(d) makes the class STRUCTURAL" and bound the next cut rather than ending the loop — "Bound for CUT #5 (binding on the respin seat, which reads this note before cutting)" — with the exit conditional, verbatim: "(5) STRUCTURAL EXIT: a fifth class-(a) refusal lands the fail-closed core as wb-0lf.2 (PASS-WITH-FINDING route, R624 form consequence) and the orchestrator files the remaining escape spellings as ONE child bead blocked on its landing; a refusal on another class stays an ordinary rule-19 respin." So wb-0lf.2 had not left the respin loop at the window's end. Read once past the window bound, for this sentence only: the ledger then shows a further cut, M:33313 `red` 2026-10-29T07:54:45Z, M:33363 `green` 08:21:32Z, M:33389 `delivered` 08:33:35Z and M:33390 `gate-enqueued` 08:33:35Z, commit `2e68fed71a2f472f22eb92adc55d8416f47d70cc` (those rows carry no `cutNumber` field).

wb-021.5 (`test/workbench-apo-rerender-census.test.ts`, 3 files per cut): refusal #5 M:31006 2026-10-28T18:09:07Z (O:1224), #6 M:31704 22:13:46Z (O:1263), #7 M:33046 2026-10-29T05:23:08Z (O:1293, fast path); the bead's earlier refusals #1-#4 are M:24993, M:26170, M:27039 and M:28833, before the window, 7 `gate-refused` rows in all. R-B60 (M:31709, 22:17:43Z) bound the form for cut #7 and recorded "Six gate passes (about six seat-hours) have bought no convergence." R-B67 (M:33052, 05:26:43Z; `BOUNDARY.md:10085`) executed the exit: "Seven refusals, one class, no convergence; the seat flagged needsRuling for this branch. RULED: no respin 7 in the widen-the-reader shape. (1) The orchestrator FILED the child bead wb-021.7 (blocked-by wb-021.5, parent wb-021, labels orchestrator-exit + rule-19-structural) carrying every escape family named by refusals #6-#7 ... with the rule that each lands with a pinned falsifier per shape." and "(2) CUT #8 of wb-021.5 is the FAIL-CLOSED CORE". This bead too stayed in the loop, with cut #8 ordered; read once past the window bound: M:33403 `delivered` 2026-10-29T08:39:24Z and M:33404 `gate-enqueued` 08:39:25Z, commit `3a6bf0efb619b8f0143b09045f3b0e7f12368316` (no `cutNumber` field on those rows).

## Finding 4 — the mechanism R-B66 names, and R-B60/R-B67 bind against, is a claim wider than its reader, written as header prose; the cures under build are machine-side — CONFIRMED as quoted

R-B66 (M:33010), verbatim: "The surviving members are not reader gaps but a CLAIM wider than its reader: THE PINNED SET's G1 bullet claims two site words 'any case, any run of space, tab, dot, underscore or hyphen between their parts' while G1's reader (sitePaths over siteFindings) is proven only on the spellings the two surviving gate hollowings keep - RH-SEP (space/tab/dot-joined spellings dropped) and RH-CASE (upper-case dropped) survive 34/34, and a real src plant in a dropped spelling reds the unmodified census. Bound for CUT #5 (binding on the respin seat, which reads this note before cutting): (1) NARROW THE CLAIM TO THE READER: the G1 bullet, the header sentence and the DISPATCH label state exactly the separators and case the reader normalises today (underscore and hyphen; the case the reader actually folds), in the enumerate-the-resolvable form".

The refusal it rules on, M:33001, quotes the header it measured: "The header says 'this list is what the census claims, each reading a pinned case' and 'G1 reads two site words ... (... any case, any run of space, tab, dot, underscore or hyphen between their parts), with one reader, sitePaths over siteFindings, proven on each word'. Two gate-authored hollowings survive at 34/34: RH-SEP drops space/tab/dot-joined spellings, and RH-CASE drops upper-case spellings." That sentence is in the cut commit `01289e6c` at `test/workbench-gp-snapshot-export-census.test.ts:157-161`, inside a 222-line comment block that precedes the file's first `import` (Evidence).

R-B67 (M:33052) on the other bead: "re-failed class A through a new member ... and over-claimed the stand-in set in the header (U2: I1/I2 inherited implementations, L1 context-less literal, S1 spread). Seven refusals, one class, no convergence ... RULED: no respin 7 in the widen-the-reader shape." Its words for the mechanism are "over-claimed" and "widen-the-reader"; the literal "wider than its reader" occurs in R-B66 alone. R-B60 (M:31709), which R-B67 executes, had already bound the rule: "NARROW THE CLAIM, NEVER WIDEN THE READER: the census header, the DISPATCH label, the STAND-IN-KINDS/STAND_IN constructor claim and the STAND-IN-RECEIVERS field-by-name claim are rewritten to state exactly the resolvable set the reader implements today, in the enumerate-the-resolvable form of rule 19(c) (a literal roster the test pins)". Four prose sites — header, DISPATCH label, two named claims — had to be rewritten to agree; the cut #7 header runs 329 comment lines before its first `import` and names the DISPATCH, STAND-IN-KINDS and STAND-IN-RECEIVERS labels at `:62`, `:75`, `:88`, `:94`, `:100`, `:111`, `:126-127` (Evidence).

The cures the machine is building are on its own side. `judge.json`: "CONFIRMED authoring/acceptance asymmetry: generations/g10-work.js:143 has zero R515/R668/NOT CLAIMED/falsifier/residual/census claim-form hits; generations/g10-gate.js:66 independently requires title, pin and falsifier honesty." Its K2 is "First-cut narrow census claim form" — "Add an emit-only-when-given work-lane prompt step that enumerates the exact pinned reader set, constrains each header sentence to that set, names every residual/NOT CLAIMED mode and the falsifier for each positive claim" — and K3 "Claim-by-claim pre-delivery self-falsifier with a supervised summary receipt"; the judge grades their outcome "PLAUSIBLE: a passing sibling reused similar prose." Both act on the seat's prompt and the seat's pre-delivery check, not on the census file's shape; the product keeps the convention they aim at.

## Finding 5 — re-check of the corroborated file at 9fdd6d9b: its fix 1 is STILL-OPEN with the armed control, the vocabulary it measured has grown, and its three refused beads landed — CONFIRMED (verdict STILL-TRUE)

Fix 1 asked for one paragraph in `docs/workbench/14-qa-and-benchmarks.md` under `## Truth labels and release gates` (`:119` at `9fdd6d9b`, the heading is still there) naming the header claim rows. At `9fdd6d9b`: `git grep -l -i -F -e 'record honesty' 9fdd6d9b -- docs/ AGENTS.md README.md` prints 0 files; the armed control, the same grep over `test/`, prints 7 (`test/workbench-docs09-readers-relationships.census.ts`, `test/workbench-docs20-contract.census.ts`, `test/workbench-evidence-ui-census.census.ts`, `test/workbench-hx-sio-design-status-census.test.ts`, `test/workbench-rendering-pipeline.census.ts`, `test/workbench-tool-exposure-census.census.ts`, `test/fixtures/fiber-debug-identity-roster.json`; the corroborated file counted 5 at `fced7bfd`). `git grep -l -E 'NOT CLAIMED|NAMED RESIDUAL|READINGS|FOLLOW-UP' 9fdd6d9b -- docs/` prints 0 files. The convention kept spreading in `test/` between the two pins (file counts, `git grep -l -F`): NOT CLAIMED 31 to 70; NAMED RESIDUAL 18 to 26; READINGS 20 to 43; FOLLOW-UP 21 to 31; RECORD HONESTY (upper case) 1 to 1; PINNED SET 0 to 3; CLAIMED SET 0 to 0. Census files carrying at least one of the four header tokens NOT CLAIMED | NAMED RESIDUAL | READINGS | FOLLOW-UP (the set in the docs grep above): 58 of 134 at `fced7bfd` (28 `test/*.census.ts` + 106 `test/*census*.test.ts`; the corroborated file's own figure, reproduced) and 97 of 170 at `9fdd6d9b` (30 + 140); with RECORD HONESTY as the fourth token instead the figures read 50 of 134 and 87 of 170. `test/helpers/census.ts:89` still reads ` *   NAMED RESIDUALS - what the roster does NOT cover, so no census may claim it; each MEASURED (a probe ran the shape on`.

The corroborated file left open "What became of the four cuts". The ledger answers: wb-kku9.5 `gate-pass` M:22321 2026-10-26T05:02:38Z, `landing-gate` M:25590 2026-10-27T12:04:11Z, `fold-done` M:25634 12:14:19Z, landing 521; wb-52pt `gate-pass` M:22453 2026-10-26T07:00:49Z, `fold-done` M:25719 2026-10-27T12:34:13Z, landing 527; wb-jh2f (refused twice, M:21988 and M:22418) `gate-pass` M:22560 2026-10-26T09:24:50Z, `fold-done` M:25785 2026-10-27T12:49:06Z, landing 532. Each of the three beads passed on its next gate after the refusals that file counted.

## Finding 6 — product-side request: the census convention has no bound form for the claim set, so a claim is free prose re-written on every cut; a co-located claimed-set block that a helper asserts against the roster would make "claim wider than reader" a census red before delivery — a request without a truth grade, resting on CONFIRMED facts (the absence at `path:line`, armed)

What exists today at `9fdd6d9b`, `test/helpers/census.ts` (6,231 lines): the pinned-case structure `CasePin` (`:293-308`: `file`, `title`, `suite?`, `tier`, `each?`), the helper's own roster of resolvable constructs `ResolvableConstruct` / `ROSTER` (`:361-372`: `id`, `flow`, `construct`, `guard`), `judge()` (`:5252`) and `docsSection()` (`:5434`); per census, a roster fixture `test/fixtures/NAME-roster.json` (127 at `9fdd6d9b`, 97 at `fced7bfd`). The header claim rows are comment prose: `git show 9fdd6d9b:test/helpers/census.ts | grep -n -E '^export .*[Cc]laim'` prints nothing (rc 1), and the 7 lines that mention `claim` (`:8`, `:22`, `:28`, `:89`, `:98`, `:152`, `:4679`) are all comment lines. That absence is CONFIRMED with its controls armed: the same `^export` pattern without the word lists the helper's exports (`:285`, `:293`, `:361`, `:655`, `:5252`, `:5434` among them), and the case-insensitive `claim` grep finds the 7 comment lines, so both halves of the instrument fire where the answer is known. So no helper can read a header claim and compare it with the reader or the roster it rests on; the gate does that by hand-authored falsifiers, which is what 70 of 86 refusals paid for (median `gateSeconds` 525 s and median `prepSeconds` 2,243 s per refusal row, each field named in Finding 1), and a narrowing ruling has to be executed as prose edits at several sites (R-B60 names four). The request itself carries no truth grade; the cost it rests on is Findings 1 and 3 (CONFIRMED).

The ask, additive and opt-in: a claimed-set block inside the census file (co-located, which the corroborated file's positive 3 requires) that each header claim row references by id, and one helper assertion that the claimed set is a subset of the pinned reader roster (the roster fixture or `ROSTER`). Acceptance criteria a reply can re-probe:

1. A census whose header claim names a spelling or member outside its claimed set reds file-alone under the census config (`vitest.census.config.ts` exists at `9fdd6d9b`), before any gate.
2. 0 edits to the 70 `NOT CLAIMED` files are needed for the helper to exist: `git grep -l -F 'NOT CLAIMED' -- test/ | wc -l` stays 70 after the helper lands.
3. A narrowing such as R-B66's "(1) NARROW THE CLAIM TO THE READER" becomes an edit to one data block that the gate can quote by `path:line`, instead of prose edits to the header, the DISPATCH label and the delivery note.

## Evidence

```
$ cd rig && git fetch -q origin; git rev-parse origin/workbench/implementation-program
9fdd6d9b23485d9067c92d20df320f491182df91
$ git log -1 --format='%H %cI %s' origin/workbench/implementation-program
9fdd6d9b23485d9067c92d20df320f491182df91 2026-10-29T08:08:26Z ledger: close wb-km7q.1 (landing 669, merge 3e63d8b3)
$ git diff --stat e3022a1390d5d7c69e8a928a360ce099776f91bf 9fdd6d9b23485d9067c92d20df320f491182df91 | tail -5
 .beads/interactions.jsonl                          |    2 +
 .beads/issues.jsonl                                |   20 +-
 .../fixtures/fo-controller-arbitration-roster.json |  775 +++++++++++++++
 ...kbench-fo-controller-arbitration-census.test.ts | 1047 ++++++++++++++++++++
 4 files changed, 1835 insertions(+), 9 deletions(-)
$ git show 9fdd6d9b:package-lock.json | grep -n -A1 '"node_modules/vitest": {'
5281:    "node_modules/vitest": {
5282-      "version": "4.1.10",
$ ./node_modules/.bin/vitest --version; node --version
vitest/4.1.10 linux-x64 node-v24.20.0
v24.20.0
```

Ledger pass (`python3 -I`, metrics.jsonl, window `2026-10-28T07:56:00Z <= utc < 2026-10-29T07:35:00Z`), output verbatim; the `R515|R668 hits` and `record.honesty` lines carry the field labels of the fix-time re-run, their numbers unchanged:

```
metrics lines total 33362
in-window rows 4384 M range 28908 .. 33291
  kind gate-refused: 86
  kind gate-pass: 58
  kind gate-held: 58
  kind landing-gate: 58
  kind fold-done: 58
fold-done landing field: n 58 min 611 max 668 distinct 58 kinds {'test': 56, 'src': 2}
R515|R668 hits: unmet+summary+refusalClass = 60 ; +reason = 68 ; reason+unmet+unmetVerbatim+refusalClass = 69 (summary excluded; 69 with it)
family 71 root 15
refusalNumber dist {'1': 39, '2': 23, '3': 7, '4': 2, '5': 1, '6': 1, '7': 1, 'None': 12}
per-bead >=3: [('wb-0lf.2', 4), ('wb-2j3.10', 3), ('wb-jwc.5', 3), ('wb-0lf.3', 3), ('wb-021.5', 3), ('wb-b9n.1', 3), ('wb-2wiv.1', 3), ('wb-2wiv.2', 3)]
distinct beads refused 52 ; beads refused>=2: 25
refused beads that passed later in-window 20
refused>=2 and later passed 13
wallSeconds n 86 median 0 min 0 max 679.394 zeros 85
prepSeconds n 81 median 2243 min 760 max 3663
metrics refusal rows 86 with summary key 10 with refusalClass non-null 19
typed refusalClass naming R515 or R668: 14
record.honesty (i) over reason+unmet+unmetVerbatim+refusalClass: 62 ; literal 'record honesty' (i), same fields: 59
union R515|R668|record.honesty over reason+unmet+unmetVerbatim+refusalClass: 70
wb-0lf.2 in-window refusals [(30747, '2026-10-28T17:06:07Z', 1, 1), (31507, '2026-10-28T21:05:09Z', 2, 2), (32618, '2026-10-29T00:51:44Z', 3, 3), (33001, '2026-10-29T05:06:15Z', 4, 4)] ; all-ledger gate-refused rows 4
wb-021.5 in-window refusals [(31006, '2026-10-28T18:09:07Z', 5, 5), (31704, '2026-10-28T22:13:46Z', 6, 6), (33046, '2026-10-29T05:23:08Z', 7, 7)] ; all-ledger gate-refused rows 7 [(24993, 1), (26170, 2), (27039, 3), (28833, 4), (31006, 5), (31704, 6), (33046, 7)]
R-B60 M: 31709 2026-10-28T22:17:43Z
R-B66 M: 33010 2026-10-29T05:07:58Z
R-B67 M: 33052 2026-10-29T05:26:43Z
M:31031 machine-defect 2026-10-28T18:13:44Z
```

The same pass over outbox.jsonl:

```
outbox lines 1302
in-window 145 O range 1155 .. 1299
kinds {'proposed-closure': 58, 'gate-refused': 86, 'gate-could-not-judge': 1}
verdicts {'pass': 58, 'refused': 74, 'None': 13}
15:24-21:24Z ({'refused': 46, 'pass': 12, 'None': 10}, {'gate-refused': 55, 'proposed-closure': 12, 'gate-could-not-judge': 1}, (1189, 1256))
21:27-03:22Z ({'refused': 18, 'pass': 11, 'None': 2}, {'gate-refused': 20, 'proposed-closure': 11}, (1257, 1287))
O:1165-1266 ({'proposed-closure': 36, 'gate-refused': 65, 'gate-could-not-judge': 1}, ('2026-10-28T10:25:06Z', '2026-10-28T22:53:25Z'))
O:1267-1284 ({'gate-refused': 11, 'proposed-closure': 7}, ('2026-10-28T23:01:42Z', '2026-10-29T01:03:56Z'))
O:1267-1284 refused cutNumber>=2: 9 of 11
outbox refused in-window 86 R515|R668 (unmet+summary+refusalClass) 70 (+reason) 70
outbox refusal rows 86 with summary key 86
outbox union R515|R668|record.honesty over unmet+summary+refusalClass+reason: 74
non-matching outbox refusals: 16
```

Fix-time pass over the same in-window rows (metrics.jsonl 33,460 lines and outbox.jsonl 1,303 at that read; M and O ranges unchanged), output verbatim:

```
metrics lines total 33460 (fix-time pass; in-window rows 4384 M range 28908 .. 33291)
gateSeconds n 86 median 525 min 0 max 1688 zeros 9 (zero rows == refusalFastPath rows: True) ; non-fast-path n 77 median 558 min 250 max 1688
record.honesty (i) over reason+unmet+unmetVerbatim+refusalClass: 62 ; literal 'record honesty' (i), same fields: 59
union R515|R668|record.honesty over reason+unmet+unmetVerbatim+refusalClass: 70 ; with summary: 71
base non-empty 86 of 86 ; commit non-empty 86 of 86 ; gatedTree non-empty 1 of 86 (M:30499) ; gatedCommit non-empty 1 of 86 (M:30499)
outbox lines 1303 (fix-time pass; in-window 145 O range 1155 .. 1299)
multi-refused beads (any class) 25 ; with >=2 R515|R668 matches on unmet+summary+refusalClass 19 ; with >=1 24 ; with 0 ['wb-3ht.2'] ; wb-021.5 matches 1 of 3
```

The two structural-exit cuts, from the `commit` and `base` fields of M:33001 and M:33046:

```
$ git diff --stat b3d410fd128754699069e37514b421cf153510b5 01289e6cf74b5325d87e9cddfec146cc33bec184
 test/fixtures/gp-snapshot-export-roster.json     | 1596 ++++++++++++++++++
 test/helpers/gp-snapshot-export-census.ts        | 1946 ++++++++++++++++++++++
 test/workbench-gp-snapshot-export-census.test.ts |  899 ++++++++++
 3 files changed, 4441 insertions(+)
$ git diff --stat b3d410fd128754699069e37514b421cf153510b5 c17eecc159ecd98a22e3d3f45104a3a0882b319f
 test/fixtures/apo-rerender-roster.json     | 1155 +++++++++
 test/helpers/apo-rerender-census.ts        | 3603 ++++++++++++++++++++++++++++
 test/workbench-apo-rerender-census.test.ts |  946 ++++++++
 3 files changed, 5704 insertions(+)
$ git show 01289e6c:test/workbench-gp-snapshot-export-census.test.ts | grep -n -E 'PINNED SET|any case, any run of'
157: * THE PINNED SET (closed form, refusal #3's CUT #4 FORM in the enumerate-the-resolvable shape: this list is what the census
161: *    any case, any run of space, tab, dot, underscore or hyphen between their parts), with one reader, sitePaths over
$ for f in 01289e6c:test/workbench-gp-snapshot-export-census.test.ts c17eecc1:test/workbench-apo-rerender-census.test.ts; do git show $f | awk '/^import /{print NR-1; exit}'; done
222
329
```

Trunk greps (file counts; `T=9fdd6d9b23485d9067c92d20df320f491182df91`):

```
$ git grep -l -i -F -e 'record honesty' $T -- docs/ AGENTS.md README.md | wc -l
0
$ git grep -l -i -F -e 'record honesty' $T -- test/ | wc -l
7
$ git grep -l -E 'NOT CLAIMED|NAMED RESIDUAL|READINGS|FOLLOW-UP' $T -- docs/ | wc -l
0
$ for kw in 'NOT CLAIMED' 'NAMED RESIDUAL' 'READINGS' 'FOLLOW-UP' 'RECORD HONESTY' 'CLAIMED SET' 'PINNED SET'; do ...; done   # per-token file counts under test/, git grep -l -F; a different set from the four-token census-file count below
NOT CLAIMED: fced7bfd=31 trunk=70
NAMED RESIDUAL: fced7bfd=18 trunk=26
READINGS: fced7bfd=20 trunk=43
FOLLOW-UP: fced7bfd=21 trunk=31
RECORD HONESTY: fced7bfd=1 trunk=1
CLAIMED SET: fced7bfd=0 trunk=0
PINNED SET: fced7bfd=0 trunk=3
$ # census files = test/*.census.ts + test/*census*.test.ts; "header token" = git grep -l -E 'NOT CLAIMED|NAMED RESIDUAL|READINGS|FOLLOW-UP'
fced7bfd: 58 of 134 census files carry a header token (28 .census.ts + 106 census*.test.ts)
9fdd6d9b23485d9067c92d20df320f491182df91: 97 of 170 census files carry a header token (30 .census.ts + 140 census*.test.ts)
$ # the same count with RECORD HONESTY as the fourth token instead of FOLLOW-UP
fced7bfd: 50 of 134 ; 9fdd6d9b: 87 of 170
roster fixtures at trunk: 127
roster fixtures at fced7bfd: 97
$ git show $T:test/helpers/census.ts | grep -n -E '^export .*[Cc]laim'; echo rc=$?
rc=1
$ git show $T:test/helpers/census.ts | grep -n -i -E 'claim' | cut -d: -f1 | tr '\n' ' '
8 22 28 89 98 152 4679
```

## Re-check verdicts on the corroborated file

| Claim in the corroborated file | Verdict at `9fdd6d9b` |
|---|---|
| 4 of 8 window refusals carried the typed record-honesty class at `fced7bfd`, each naming a header site and a mutant result (Finding 1) | **UNDETERMINED** for that window's recount (its 8 rows were re-read only for kind, utc and bead); the class itself **STILL-TRUE** at larger n, 70 of 86 in this window |
| The class decides at PREP F with no forge or furnace verb, in 464-908 s (Finding 2; its field is `gateSeconds` on 4 rows) | **STILL-TRUE** on the stage (60 of 86 rows name PREP F; 24 carry no stage field); **CHANGED** on the range, same field: `gateSeconds` on the 86 refusal rows is median 525 s, 0-1,688 s, and on the 77 non-fast-path rows median 558 s, 250-1,688 s (the 9 zeros are the 9 `refusalFastPath` rows), against 464-908 s on 4 rows at `fced7bfd`; `prepSeconds` (760-3,663 s, median 2,243, 81 rows; PREP now carries the seven-step gate under Furnace supervision) is a separate field this file adds, not the re-check of that claim; **UNDETERMINED** on "no forge verb" (the rows' `furnaceRun` fields were not read) |
| The header claim rows are the repo's convention: 58 of 134 census files, `census.ts:89`, 5 files naming record honesty (Finding 3) | **STILL-TRUE, and grown**: 58 of 134 reproduced at `fced7bfd`; 97 of 170 at `9fdd6d9b`; `census.ts:89` byte-identical; 7 files name record honesty |
| The measured sentences sit in the census header comment block, 2 files per cut (Finding 4) | **STILL-TRUE on the site, CHANGED on the count**: the two structural-exit cuts carry the measured sentences in 222- and 329-line header comment blocks, and each cut touches 3 files (census, roster fixture, a per-census helper under `test/helpers/`) |
| Removing the per-row claims would leave the gate nothing to refuse (Finding 5, PLAUSIBLE) | **UNDETERMINED** — not attempted; the rulings keep the rows and narrow them (R-B60 (1), R-B66 (1)), they never remove them |
| No contributor doc at `fced7bfd` states the convention (fix 1, armed) | **STILL-TRUE** — 0 files in `docs/ AGENTS.md README.md`, 7 in `test/` (armed) |

## Recommendations, additive to the corroborated file's list

1. (cheapest; re-weights its fix 1) The one paragraph under `docs/workbench/14-qa-and-benchmarks.md:119` should carry the rulings' sentence as the contributor rule: "NARROW THE CLAIM, NEVER WIDEN THE READER" (R-B60), with the two forms the rulings accept — enumerate the resolvable set the reader implements today, or name the rest as ONE NAMED RESIDUAL with a pinned quiet row (R-B66 (2)). At `9fdd6d9b` the rule exists only in the machine's rulings and in census header comments.
2. A convention, no code: each header claim row names the roster id (`test/fixtures/<name>-roster.json`) or `ROSTER` row it rests on, so a narrowing ruling has one site to edit and the gate's refusal can quote it by `path:line`.
3. The claimed-set block and helper assertion of Finding 6, opt-in, with its three acceptance criteria.

## Positives worth protecting

- **The refusals are typed and substantive, and they refuse the record while calling the implementation correct** — M:31031: "the gate's falsifier/mutant probes find census header claims that the test does not pin ... so the gate is doing its job; the defect is upstream". 14 of 19 typed `refusalClass` values name R515/R668 or record honesty, and `record.honesty` (case-insensitive; `record honesty` or `record-honesty`) hits the free text of 62 of 86 rows, the two-word literal alone 59; a reader can count the class from the rows.
- **The roster fixture is already the structured half of every cut** — 127 `test/fixtures/*-roster.json` at `9fdd6d9b` (97 at `fced7bfd`); the trunk tip read for this file, landing 669, is itself a census plus roster pair (`fo-controller-arbitration`), and both structural-exit cuts touch census, roster and a per-census helper and nothing else. The ask in Finding 6 adds to that shape; it does not replace it.
- **The rulings state the cure in the convention's own vocabulary** — "the enumerate-the-resolvable form of rule 19(c) (a literal roster the test pins)" (R-B60); "ONE NAMED RESIDUAL ... with a pinned quiet row" (R-B66). The claim rows stay; only their width moves.
- **The structural exit keeps the claim set and the residual set apart** — R-B67 (1)-(2): the child bead wb-021.7 carries "every escape family named by refusals #6-#7 ... with the rule that each lands with a pinned falsifier per shape", and cut #8 "claims exactly the roster of member-reference forms the reader is proven on ... ONE pinned quiet row proves that an unlisted form refuses (so the exclusion is pinned, not prose". R-B66 sets the same exit for wb-0lf.2 as the consequence of a fifth class-(a) refusal; neither bead had left the loop at the window's end (Finding 3).
- **The K2 refusal fast path is visible in the rows** — 9 of 86 refusal rows carry `refusalFastPath` 1 / `synthesized` true, among them wb-0lf.2 #3 and #4 and wb-021.5 #7; M:33046's reason reads "synthesized GATE record, K2 refusal fast path, no GATE agent ran", and R-B66 calls M:33001 "this fast-path refusal row (K2 ON)". Whether the 9 cost less gate time than the other 77 was not measured here (their `prepSeconds` were not compared).

## What I did not establish

- **No mutant or test ran in this lane.** Every red/green figure (34/34, 0/77, 2/77, 30/30) is the gate's, copied from the rows and rulings; a re-run of the named hollowings (RH-SEP, RH-CASE) on `01289e6c` is the artifact that would upgrade them from quoted to reproduced.
- **The class share depends on the field scope.** 70 of 86 is the outbox regex over `unmet` + `summary` + `refusalClass`; the metrics twins read 60, 68 or 69 of 86 depending on whether the free-text `reason` and then `unmetVerbatim` are included. I did not classify the 86 reasons by hand; the 16 non-matching rows were read for their first 110 characters only, and at least three of them (title over-claim, O:1185 / O:1204 / O:1206) and wb-021.5's #5 and #6 are the same over-claim shape under another label.
- **The per-refusal cost.** "60-80 min of gate-seat time" is M:31031's estimate; `gateSeconds` (median 525 s on 86 rows, 0 on the 9 fast-path rows) and `prepSeconds` (median 2,243 s on 81 rows) are two stage fields, and I did not reconstruct wall time per refusal from the Furnace runs the rows name.
- **The counterfactual.** Whether a claimed-set block asserted against the roster would have redded wb-0lf.2 cut #4 or wb-021.5 cut #7 file-alone was not run; R-B66's narrowing instruction, which lists the exact spellings the reader folds, is the closest artifact to that test.
- **The design artifacts' own measurements.** `judge.json` and `critic.json` were quoted, and only their row-range counts (O:1165..O:1266, O:1267..O:1284) were re-derived.
- **Landing 669's census header form** (`test/workbench-fo-controller-arbitration-census.test.ts`, the file trunk gained between the scout's pin and mine) was not read; it is counted in the 97 of 170 only if it carries a header token, and I did not check which.
- **The 2026-10-26 window's 8 rows** were not re-counted; the re-check table marks that row UNDETERMINED.

## Grades

| claim | grade |
|---|---|
| 70 of 86 outbox gate refusals in the window name R515/R668 in `unmet`, `summary` or `refusalClass`; metrics twins 68 of 86 with `reason`, 60 without; 71 of 86 rows on family beads; `refusalNumber` #1 39, #2 23, #3 7, #4 2, #5 1, #6 1, #7 1 over 74 rows (Finding 1) | CONFIRMED |
| The orchestrator's typed count M:31031 agrees in direction ("almost all the R515/R668 census over-claim class"; 19 of 30 refusals typed to the class) and the design judge's 43/65 and the critic's 9 of 11 re-derive on their populations (Finding 2) | CONFIRMED as quoted |
| 25 of 52 refused beads were refused twice or more (any class; 19 of the 25 with 2+ R515|R668 matches, 24 with 1+), 13 of those passed later in-window, wb-0lf.2 was refused 4 times and ruled STRUCTURAL at R-B66, wb-021.5 reached refusal #7 and R-B67 filed child wb-021.7 (Finding 3) | CONFIRMED |
| R-B66 names the mechanism "a CLAIM wider than its reader" in header prose (M:33001's header quote at `01289e6c:test/workbench-gp-snapshot-export-census.test.ts:157-161`); R-B67 names it "over-claimed the stand-in set in the header" and rules out "the widen-the-reader shape"; R-B60 binds "NARROW THE CLAIM, NEVER WIDEN THE READER"; the g10.18 K2/K3 cures are machine-side (Finding 4) | CONFIRMED as quoted |
| Fix 1 of the corroborated file is STILL-OPEN at `9fdd6d9b` (0 docs files, armed 7 in `test/`); the vocabulary grew (NOT CLAIMED 31 to 70 files; 58 of 134 to 97 of 170 census files); its three refused beads landed at 521, 527, 532 (Finding 5) | CONFIRMED, verdict STILL-TRUE |
| A co-located claimed-set block asserted against the roster, with three acceptance criteria (Finding 6) | request — no truth grade; the cost it rests on is Findings 1 and 3 |
| Each PREP-F refusal costs 60-80 min of gate-seat time | UNDETERMINED — M:31031's estimate; `gateSeconds` median 525 s and `prepSeconds` median 2,243 s are stage fields, not wall time |
