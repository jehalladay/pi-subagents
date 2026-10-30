# positive: 16 of 30 census files carry both control cases and falsifier rows at a520cbd, and 23 of the window's 28 rule-19 rulings quote a control, twin, plant or falsifier reading

**From:** flywheel bead-machine orchestrator (Pi-Subagents) — the flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77); the rulings quoted are this seat's own machine record, read back from the ledger, and the census titles are the product's, read at the pinned revision.
**Date:** 2026-10-30 (operation window 2026-10-29T07:22Z <= utc <= 2026-10-30T07:40Z for every ledger count; the source counts are a snapshot at one commit)
**`pi-subagents` revision:** every quoted `path:line` and every count read at `a520cbdcf9b679fba36f07ddedf7afe3a0816b79`, landing 692's gated commit of record (tree `72cc800636a3a55a1ba00f2adaa3be47b0852200`; hop `242b275853ec69f101dd835cefff8ea0a47ca768` = `git rev-parse origin/workbench/implementation-program` at the fetch, 2026-10-30T07:01:12Z); the 30 `test/*.census.ts` files are the same set at both shas (`git ls-tree -r --name-only` count 30 at each). Rig working tree: HEAD 188ae59 on `workbench/implementation-program`, 1700 commits behind 242b275; `git status --porcelain | wc -l` = 11, so dirty — all 11 untracked `new-feedback/*.md` leftovers of earlier delivery lanes, 0 tracked modifications; this file was drafted and committed in a detached worktree cut from 242b275.
**Installed binary:** none for this repo — `package.json` at a520cbd (`@tintinweb/pi-subagents` 0.20.0) declares no `bin` field; nothing here rests on a running command.
**Method:** `git grep -l` / `git grep -c` over `test/*.census.ts` at a520cbd, in two forms each (word-bounded `-i -w` and plain substring `-i`), plus `git grep -n` on `it(` titles; `git show` for every quoted title; a `python3 -I` pass over the `ruling-bound` rows of `machines/flywheel/ledger/metrics.jsonl` (M:n = line n; 36,803 lines at my read, append-only) whose `utc` falls in the window, matched with `rule[- ]?19` (case-insensitive) and then `\b(controls?|twins?|plants?|planted|falsifiers?)\b` (case-insensitive) over the `ruling` text. Nothing was re-run; no plant was replayed.
**Scope:** feedback about pi-subagents' census design — the control + falsifier convention inside the `test/*.census.ts` files — positives only; the two defect files from the same window are the sibling 2026-10-30 CORROBORATION on the collection-error route and the sibling 2026-10-30 liveness-probe finding in this directory. The rulings belong to the flywheel machine's record (`git ls-tree origin/workbench/implementation-program -- machines bin` prints 0 entries) and are quoted here only as readers of the censuses' output.
**Prior art:** none on the convention itself: the 30 names in `new-feedback/` (18 at the trunk ref 242b275 by `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/`, plus 12 only on the `origin/machine/flywheel/feedback-*` branches) carry neither `control` nor `falsifier` nor `twin`; body grep `git grep -l -i -E 'control.*falsifier|falsifier.*control' <ref> -- new-feedback/` = 0 files at the trunk ref and 1 on `origin/machine/flywheel/feedback-2026-10-29` (the 2026-10-29 R515/R668 refusals CORROBORATION, whose claim is header-claim drift across respins, not this pairing — its one hit line is quoted in the Postscript). Adjacent: the 2026-10-26 record-honesty positive (a census-header claim measured false by a partial mutant, 3 green and 1 anchor red) praises the same evidence discipline at the header; this file is about the in-file control + falsifier pairing the header rows sit on.

Kept honest — these are wins observed in one 24 h window and one source snapshot, each with the measurement that shows it, not platitudes. They are the reason a rule-19 refusal in this machine can be ruled from the gate's own output, and each names the refactor that would plausibly lose it.

## 1. A control case sits beside the falsifier rows in every census file that has a control at all, and the control's title says what a sibling red means

**What it did.** The censuses mutate an input (a doc section, a table row, a pinned title, a registry key) and assert the census reds; beside those falsifier rows they keep an unmutated case that must stay green, and the control's title carries the attribution rule in words:

```
$ git show a520cbdcf9b679fba36f07ddedf7afe3a0816b79:test/workbench-docs09-readers-relationships.census.ts | sed -n '933p'
  it("control: the unmutated copy is ok, so every red below is the mutation and not the harness", () => {
$ git show a520cbd...:test/workbench-docs20-contract.census.ts | sed -n '659p'
  it("the untouched table matches every literal (the falsifiers below start from a green table)", () => {
$ git show a520cbd...:test/workbench-docs10-deception-defenses.census.ts | sed -n '590p'
  it("docs/14: the falsifier sentence dropped or hidden in an HTML comment is red, naming docs/14", () => {
$ git show a520cbd...:test/workbench-acceptance-journeys.census.ts | sed -n '1310p'
  it("QYS1 C1 control: the same receipt text with the id visible in a list item IS admitted", () => {
$ git show a520cbd...:test/workbench-w21-survivor-pins.census.ts | sed -n '60p'
  it("docs-floor class: the re-expressed docs pin and its D1/D2/D3/D9/D10 falsifier rows are each collected once, passed and asserting", () => {
```

**Measured.** At a520cbd, over the 30 `test/*.census.ts` files:

```
$ git grep -l -i -w control a520cbd -- 'test/*.census.ts' | wc -l          # 16 files  (143 lines by git grep -c, summed)
$ git grep -l -i -w falsifier a520cbd -- 'test/*.census.ts' | wc -l        # 23 files  (162 lines)
$ comm -12 <(…-w control… | sort) <(…-w falsifier… | sort) | wc -l          # 16 — every file with a control also carries falsifiers
$ git grep -l -i -w -E 'twins?' a520cbd -- 'test/*.census.ts' | wc -l      # 6 files   (17 lines)
$ git grep -l -i -w -E 'plants?|planted' a520cbd -- 'test/*.census.ts' | wc -l   # 0 files — "plant" is the machine's word, not the repo's
```

Substring forms (no `-w`): `control` 19 files / 187 lines, `falsifier` 23 files / 259 lines, both 19 — the three extra `control` files come from substrings such as the pinned filename `control-admission` and "bidi control code point", which is why the word-bounded 16 is the figure in the title. Title-level forms (`git grep -n -i -E '^\s*it(\.each|\.for)?\(\s*["\x60].*control'` and the same for `falsifier`): `control` in 23 `it(` titles across 8 files, `falsifier` in 22 titles across 9 files, both words in titles of 4 files (docs07-provider-rules, docs10-deception-defenses, fault-injection-census, subsystem-matrix).

**Why it must survive a refactor.** A red falsifier row proves the census can see the mutation only if the unmutated twin is green in the same run; drop the control (or let a "simplification" fold it into the falsifier `it.each`) and every red below it becomes ambiguous between the mutation and the harness — exactly the ambiguity the docs09:933 title was written to foreclose. Equally, a refactor that keeps the controls but renames them to terse ids (`C1`, `ctrl`) loses the sentence a reader of a `FAIL` block needs; the judge and the orchestrator read titles, not source.

**Scope of this praise.** Word greps, not a parse of each file's structure; the pairing was read in the five quoted files, not in all 16; 14 of the 30 census files carry no word `control` at all, and I did not establish whether they need one (some judge a frozen report with no mutation step).

## 2. The window's rule-19 rulings quote a measured plant/control/falsifier reading, which is what lets a refusal be checked by someone who was not there

**What it did.** When a cut fails the same class a second or third time, the machine's rule-19 ruling binds the next form or exits; in this window those rulings cite the census's own plant/control readings as pairs of numbers, verbatim from the ledger (`metrics.jsonl`, M:n = line n):

```
R-B110 (M:36244, 2026-10-30T04:49:46Z): "... class-instance array and 4294967295-property members pass 0|54 with red twins ..."
R-B104 (M:35840, 2026-10-30T02:05:34Z): "... (0 findings on plants; the delivered census reds 14|17 on the real repacked tree) ..."
R-B109 (M:36142, 2026-10-30T04:11:48Z): "... plants G20s142-F1/F2/F3 in mintEvidenceReceipt read 0|23 with kill control F1c 4|19 ..."
R-B71  (M:33551, 2026-10-29T10:45:40Z): "... one checkable item per resolvable R514 surface, each with its executable falsifier bound at the gate ..."
```

**Measured.** 44 `ruling-bound` rows carry a `utc` inside the window (first M:33432 2026-10-29T08:52:38Z, last M:36467 2026-10-30T06:22:51Z; labels R-B70 through R-B113). 28 of the 44 match `rule[- ]?19` (case-insensitive) in their `ruling` text. 23 of those 28 name a control, twin, plant or falsifier by the word-bounded regex above — the plain substring regex `control|twin|plant|falsifier` gives the same 23. By word: `falsifier(s)` in 15 rulings (R-B71, 73, 75, 76, 78, 79, 81, 82, 83, 84, 85, 88, 103, 106, 108), `plant(s)/planted` in 7 (R-B76, 84, 104, 106, 109, 111, 113), `control(s)` in 5 (R-B99, 103, 105, 109, 112), `twin(s)` in 2 (R-B110, 111). The 5 rule-19 rulings that name none of the four words: R-B74 (M:33709), R-B80 (M:34245), R-B92 (M:34853), R-B93 (M:35006), R-B100 (M:35547). Disclosure: the task brief for this window said "11 rule-19 rulings", and an earlier draft count said 18 of 28; neither figure reproduced under the stated regexes, so the figures here are 28 and 23 with the regexes given.

**Why it must survive a refactor.** The `0|54 with red twins` / `0|23 with kill control F1c 4|19` pairs are the checkable core of a ruling: a plant count with its control count beside it. They exist in the ruling only because the censuses emit them — a census that reported "mutants: ok" without the control's count would leave the ruling with a judgment call. Keep the paired counts in the census output text.

**Scope of this praise.** I did not replay any plant; the counts inside the rulings are the rulings' own and are quoted, not verified. "Mechanically checkable" here means the ruling text names a measured pair, not that I re-measured it.

## 3. The w21 docs-floor pin list is itself a control plus five falsifiers, and reading them together is what made landing 692's carrier obvious in one block

**What it did.** `test/workbench-w21-survivor-pins.census.ts:38-45` pins the docs pin (the control) and the D1/D2/D3/D9/D10 falsifier rows on the same file; at landing 692 all six read `collection-error` in one assertion text, six lines naming the same file and the same `Hook timed out in 240000ms.` marker (gate.json `diagnostics[1].message` L104-L115), so the carrier — one file, one hook — was legible from the census step alone.

**Measured.** 6 of 6 pins on `test/workbench-cap-saturation-receipt.test.ts` red together with the same `why`; 0 other census rows named that file.

**Why it must survive a refactor.** Spreading the control and its falsifiers over separate files, or judging them in separate `it` cases, would turn one six-line block into six unrelated reds.

**Scope of this praise.** One landing; the defect side of the same block (the liveness probe beside it) is the sibling finding filed today, and this praise is not a reason to close it.

## Where a positive was the reason a defect was findable

Item 3 is the instance: because the control and the falsifiers red together with one `why`, the sibling CORROBORATION could name the collection-error route as a mechanism rather than infer it, and the liveness probe's bare `expected 'collection-error' to be 'absent'` stood out as the one red in the block that named nothing.

## What I am NOT claiming

- That every census file carries a control — 14 of 30 carry no word `control`; whether each of them needs one is not established.
- That the pairing is enforced by any gate, helper or lint — **UNDETERMINED**; the artifact is a grep of `test/helpers/census.ts` and `gate/forge.toml` at a520cbd for a control requirement, which I did not run.
- That the plant/control counts quoted inside the rulings are correct — they are the rulings' text.
- That the machine's word `plant` should enter the repo; the repo's words are `control`, `falsifier` and `twin`, and this file uses them.
- That these positives bear on the open defects in the two sibling files.

## Asks

None beyond the usual: a single sentence stating the control + falsifier convention where census authors read (the `test/helpers/census.ts` header or `docs/`) would turn an observed habit into a contract. The words are already in use under `docs/` at a520cbd — `git grep -l -i -w control a520cbd -- docs/` = 50 files and `git grep -l -i falsifier a520cbd -- docs/` = 19 files, the lines with both words being receipts and a feature-matrix row (`docs/workbench/receipts/wb-a2g.12.md:23`, `docs/workbench/feature-matrix.md:210`) — but whether any of them states the pairing as a convention rather than reporting one bead's falsifiers is **UNDETERMINED** (artifact: reading those 19 files, not done).

## Grades

| Claim | Grade |
|---|---|
| Item 1 counts at a520cbd (16 / 23 / 16 word-bounded; 19 / 23 / 19 substring; title forms 8 / 9 / 4) | **CONFIRMED** |
| Item 1, "every file with a control also carries falsifiers" (16 of 16) | **CONFIRMED** (word grep) |
| Item 1, the pairing as the censuses' attribution mechanism | **PLAUSIBLE** (five files read; the other eleven by word presence only) |
| Item 2 counts (44 in-window ruling-bound rows, 28 rule-19, 23 naming a word) | **CONFIRMED** (regexes stated) |
| Item 2, the quoted plant/control figures inside the rulings | **UNDETERMINED** as to correctness (quoted, not replayed) |
| Item 3 (6 of 6 pins red together at landing 692) | **CONFIRMED** |
| The convention is enforced by a gate or helper | **UNDETERMINED** (artifact named above) |

## Postscript

The one body-grep hit for `control.*falsifier|falsifier.*control` on the feedback-2026-10-29 branch is the 2026-10-29 R515/R668 refusals CORROBORATION, at its line 84 — a "What exists today" paragraph on `test/helpers/census.ts` structures (`CasePin`, the resolvable-construct roster) in which both words occur; its claim is about header claims drifting wider than their readers across respins, not about the in-file pairing, so this file is not a corroboration of it.
