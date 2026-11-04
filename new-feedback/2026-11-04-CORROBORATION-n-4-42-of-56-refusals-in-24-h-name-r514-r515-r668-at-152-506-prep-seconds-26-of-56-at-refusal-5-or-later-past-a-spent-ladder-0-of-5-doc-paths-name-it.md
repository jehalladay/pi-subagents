# CORROBORATION, n=4: 42 of 56 refusals in 24 h name R514/R515/R668 at 152,506 prep-seconds, 26 of 56 fell at refusal #5 or later past a spent ladder, and 0 of 5 contributor-doc paths name the class at a14c87f82e

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as the corroborated file, a later cycle: the window 2026-11-03T07:55Z..2026-11-04T07:55Z against its 2026-10-31T07:55Z..2026-11-01T07:55Z (the thread's earlier windows: 2026-10-28T07:56Z..2026-10-29T07:35Z and 2026-10-25T07:45Z..2026-10-26T07:30Z); a fresh parse of a ledger that grew from 44,097 to 54,991 lines in between; 56 refusal rows against its 77, the 2026-10-29 file's 86 and the 2026-10-26 file's 8. A later window with the same instrument, not a re-run of the same rows.
**Date:** 2026-11-04 (ledger window: rows whose `utc` is at or after 2026-11-03T07:55:00Z and before 2026-11-04T07:55:00Z; stamp 2026-11-04T07:54Z)
**`pi-subagents` revision:** installed tool = trunk `origin/workbench/implementation-program` at `a14c87f82e88b56a26c5c53d2f990a4fdc3bcb20` after `git fetch -q origin` (rc 0) at launch — the landing-925 ledger close (`ledger: close wb-cl20 (landing 925, merge 8a69b896)`, committer 2026-11-04T07:51:27Z). Every `path:line` below was read with `git show`, `git grep` or `git ls-tree` at that sha; nothing was read from the rig clone's checked-out HEAD `188ae5901612`, which sits 3,419 commits behind the ref (`git rev-list --count HEAD..origin/workbench/implementation-program`) with 19 untracked earlier drafts under `new-feedback/`. The program ships no binary of its own (the `~/.local/bin/pi` on this host is the pi harness, not this package), so the trunk sha is the installed-tool pin. Host instruments: git 2.50.1, python3 run with `-I`. The corroborated file was at `aa9ea0d8c8b1262f4800365fdaf2615df2826c3b` (2026-11-01T07:53:31Z); the thread's earlier files were at `9fdd6d9b23485d9067c92d20df320f491182df91` (2026-10-29) and `fced7bfda63e6975d331fd4f31ff4463b2c9136e` (2026-10-26).
**Method:** read-only `python3 -I` pass over `machines/flywheel/ledger/metrics.jsonl` (54,991 lines at read time; 3,954 rows with `utc` inside the window, M:50976 at 2026-11-03T07:55:38Z .. M:54929 at 2026-11-04T07:54:51Z; `M:n` is the 1-based line number); the window predicate is `lo <= utc < hi` on the row's `utc` string. A second read-only pass after a numbers-and-convention review of the draft, at 55,044 lines, re-derived the same 3,954 window rows and the same 56 refusal rows; the field labels and counts it corrected are stated in place. `git grep`, `git show`, `git ls-tree`, `git diff --stat` and `git cat-file` at `a14c87f82e`, at `aa9ea0d8c8b1` and at the cut commit `479ea249cac7`. The machine's `state/claim-form.md` (17 lines), `state/standing-rules.md` (33 lines, mtime 2026-11-04 07:51) and `state/next-gate-addendum.md` (310 lines) read-only. `outbox.jsonl` was not read; every `O:n` below is copied from a ruling row that cites it. No test, gate or mutant ran in this lane: every red/green count quoted is the gate's own, copied from a row.
**Scope:** feedback about `pi-subagents`' census convention as a tool surface — the header claim rows of `test/*census*.ts` that the flywheel's PREP F record-honesty step measures (the class the refusals name as R514/R515/R668, "claims wider than pins", rule 16 LEG 2) — about the typed `unmet` tokens the gate seats now write for that class, and about whether anything a cutter reads in-repo names it. The machine's rule-19 ladder and its 22(d) post-ladder dispositions are named to size the cost; they are the orchestrator's (mine), not this repository's, and no disposition is owed here for them. Not about the refused beads' substance. Tokens that trunk's doc-walking censuses read this directory for (the program abbreviation the wb-021.3 export census judges, the bead export's path, the merge-claim wording the wb-2wiv.2 public-port census judges, and the file names of those censuses) are written in bracketed descriptive form, per the 2026-11-02 and 2026-11-03 precedent; the ledger rows cited carry the literal strings.
**Corroborates:** [`2026-11-01-CORROBORATION-n-3-74-of-77-refusals-in-24-h-name-r514-r515-r668-at-192-198-prep-seconds-19-exits-and-28-caps-froze-the-class-and-0-of-5-contributor-doc-paths-name-it.md`](2026-11-01-CORROBORATION-n-3-74-of-77-refusals-in-24-h-name-r514-r515-r668-at-192-198-prep-seconds-19-exits-and-28-caps-froze-the-class-and-0-of-5-contributor-doc-paths-name-it.md) — verdict **STILL-TRUE** at `a14c87f82e`; independent hit 4 (hit 1: `2026-10-26-positive-4-of-4-typed-record-honesty-refusals-in-24-h-measured-a-census-header-claim-false-by-a-partial-mutant-3-green-1-anchor-red-so-the-header-rows-give-the-gate-its-target.md` at `fced7bfd`; hit 2: `2026-10-29-CORROBORATION-70-of-86-gate-refusals-in-24-h-name-r515-r668-and-2-beads-ruled-structural-at-refusals-4-and-7-so-a-header-claim-drifts-wider-than-its-reader-across-respins.md` at `9fdd6d9b`; hit 3: the corroborated file at `aa9ea0d8`). All three earlier files are on trunk at the pin: `git log --diff-filter=A --format='%h %cI' origin/workbench/implementation-program -- new-feedback/<each>` prints `fb01e5c455 2026-10-26T08:55:02Z`, `1f22bc0bf2 2026-10-29T10:00:36Z` and `aabfb754a6 2026-11-01T09:20:56Z`; the corroborated file's sentence that the first two were unlanded is no longer true, which is a landing, not a correction.
**Prior art:** at the fetched ref, `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 41 entries (40 files + README.md). The filename grep `refus|needsruling|rung|ladder|wider|pins|g206|respin|claim|token|unmet|r514|r515|r668|post-ladder|doc-path` hits 10 of 40, the three thread files among them; the rest are the 2026-10-17 scratch-helper positive, the 2026-10-20 rule-16 frozen-shape file, the 2026-10-25 timing-guard positive, the three census-row files dated 2026-10-28 (one) and 2026-10-30 (two) and the 2026-11-03 sibling-conflict file, none of which states a refusal-share, a ladder count or a token count for this window. The body grep `git grep -il -E 'U1-LOW|unmet token|machine-readable token|typed unmet|post-ladder|POST-LADDER' origin/workbench/implementation-program -- new-feedback/` hits 1 file, the 2026-11-03 sibling-conflict file, whose line 55 quotes one `unmet` token of a KNOWN-DIRTY refusal (a different class); with `machine-readable` alone the grep also reaches `2026-10-22-the-census-judge-resolves-a-case-function-only-as-a-literal-or-a-same-file-named-function-so-a-factory-call-registration-reds-2-landed-report-mode-readers-body-unresolved.md:101`, which already calls `unmet[0]` "the machine-readable twin of U1" — so the `unmet` field is prior art; the three-field grammar and its share are what Finding 5 adds. The ref listing, not `ls`, is the index: this working tree is 3,419 commits behind it.
**Delivery:** branch `machine/flywheel/feedback-2026-11-04`, cut from a detached worktree of the fetched trunk, for the program owner to land; trunk is neither checked out nor pushed from the main clone (live gate and land worktrees share its object store); the gate waiver (docs-only, no gate run) is disclosed in the commit body, as `new-feedback/README.md` asks.

## Why a second file rather than an edit

The three earlier files carry their own windows, revisions (`fced7bfd`, `9fdd6d9b`, `aa9ea0d8`) and methods; none is edited. A separate file keeps the four windows separable, which is what makes n=4 mean anything — folding this window's 56 rows into the 2026-11-01 file would turn two measurements into one and destroy the independence the count claims. It also keeps the append-only rule this directory's README states, and spares every writer the merge conflict a shared file imposes under concurrent filing.

## What this adds

- **A new measurement:** the class now persists past a spent rule-19 ladder. In the corroborated window the refusal ordinal topped out at #5 (1 of 77 rows); here 26 of 56 rows are refusal #5 or later (10 at #5, 7 at #6, 5 at #7, 2 at #8, 2 at #9; 76,118 prep-seconds on 16 beads), and 25 of the window's 99 `ruling-bound` rows are 22(d) `POST-LADDER DISPOSITION` rulings (21 of the 25 say the ladder is spent — R-B416, R-B432, R-B448 and R-B474 do not use the word; 24 of 25 say the bead stays open and store-pickable — R-B416 does not; 13 of 25 name R514, R515 or R668, and 9 name neither the identifiers nor `wider`: R-B444, R-B448, R-B452, R-B474, R-B482, R-B489, R-B493, R-B497, R-B504) — against 3 second-stage caps, 6 structural exits and 4 dependency inversions by the opening-phrase count the corroborated file used (its window: 28, 19 and 9). One refusal (wb-dixg #2, M:54785) opened three new claim sets at once, each ruled a first failure (R-B509). The re-check of the docs gap at a fourth revision rides in the verdict table; the typed-token measurement is Finding 5 and the positives list.

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| 74 of 77 refusals name R514/R515/R668 in `reason`; 192,198 prep-seconds; 58 of 77 are re-cuts; 28 caps, 19 exits, 9 inversions in 24 h | the corroborated file, Findings 1 and 3 |
| The mechanism: a header claim wider than its reader, written as prose; cures under build are machine-side | `2026-10-29-CORROBORATION-70-of-86-gate-refusals-in-24-h-name-r515-r668-and-2-beads-ruled-structural-at-refusals-4-and-7-so-a-header-claim-drifts-wider-than-its-reader-across-respins.md`, Findings 1, 3 and 4 |
| 4 of 4 typed record-honesty refusals measured a census-header claim false by a partial mutant; the header rows give the gate its target | `2026-10-26-positive-4-of-4-typed-record-honesty-refusals-in-24-h-measured-a-census-header-claim-false-by-a-partial-mutant-3-green-1-anchor-red-so-the-header-rows-give-the-gate-its-target.md` |
| No contributor doc states the convention; fix 1 = one paragraph in `docs/workbench/14-qa-and-benchmarks.md` under "Truth labels and release gates" | the 2026-10-26 file, fix 1; STILL-OPEN at `9fdd6d9b` (2026-10-29 file, Finding 5) and at `aa9ea0d8` (the corroborated file, Finding 4) |
| Product-side request: a co-located claimed-set block that a helper asserts against the roster | the 2026-10-29 file, Finding 6; re-checked STILL-TRUE in the corroborated file's Finding 5 |
| The `unmet` field carries a machine-readable twin of each U-item | `2026-10-22-the-census-judge-resolves-a-case-function-only-as-a-literal-or-a-same-file-named-function-so-a-factory-call-registration-reds-2-landed-report-mode-readers-body-unresolved.md:101` |
| A gate rule that lives only in the machine's standing rules and a byte-frozen doc (rule 16's frozen-shape leg), cited by 10 of 13 refusals, no contributor doc showing the literal | `2026-10-20-the-rule-16-frozen-shape-assertion-lives-only-in-the-machine-standing-rules-and-the-byte-frozen-traceability-md-so-10-of-13-gate-refusals-in-24-h-cite-it-and-no-contributor-doc-shows-the-literal.md` |
| One `unmet` token quoted for a KNOWN-DIRTY (sibling-conflict) refusal, a different class | `2026-11-03-CORROBORATION-n-3-sibling-census-cuts-conflicted-at-3-of-48-landings-in-24-h-the-census-file-region-a-header-comment-in-3-of-3-3-known-dirty-refusals-3-landing-loop-stops.md`, line 55 |

## Summary, with numbers

In the 24 h window the metrics ledger holds 3,954 rows placeable by `utc` (M:50976..M:54929), among them 56 `gate-refused` rows (first M:51063 at 2026-11-03T08:33:17Z, last M:54886 at 2026-11-04T07:38:43Z; 36 distinct beads) and 99 `ruling-bound` rows (R-B414 at M:51048 .. R-B512 at M:54897; 98 carry a `label`, and M:54754, landing 924's rc-8 remainder, carries none — a machine-ledger matter, not this repository's). The class is named in 42 of 56 `reason` fields and in 42 of 56 `unmet` arrays (8 rows name it in `reason` only, 8 in `unmet` only; the union over `reason`, `unmet` and `unmetFull` is 52 of 56), and 54 of 56 reasons say `LEG 2` — the share on `reason` fell from 74 of 77 because 8 rows name the identifiers in their `unmet` tokens but not in `reason`: 2 carry the terse 166-character form ending `Rule 16 LEG 2 is not met.` (M:52866 and M:54785, both wb-dixg) and 6 carry 750..1,577-character reasons that cite `rule 16 LEG 2` without the identifiers (M:51502, M:53136, M:53640, M:53951, M:54151, M:54648; four of the six open `Substance refusal at PREP F: rule 16 LEG 2 is not met on ...`). 55 of 56 were refused at `PREP F` (the exception, M:53762 wb-rdlh.4, at `PREP B IDENTIFY` as a re-cut trigger). `prepSeconds` is numeric on 56 of 56: sum 152,506 s (42.4 seat-hours), median 2,555.5 s, range 376..4,814 s. `gateSeconds` is 0 on 46 of 56 (`synthesized` true on 46, false on 7, absent on 3); 10 rows ran a complete gate before refusing, 4,367 gate-seconds in all (291..788 s). `needsRuling` is true on 48 of 56. By refusal ordinal: #1 10, #2 9, #3 4, #4 7, #5 10, #6 7, #7 5, #8 2, #9 2 — 46 of 56 are re-cuts carrying 128,763 of the 152,506 s, and 26 of 56 are #5 or later (76,118 s, 16 beads), where the corroborated window had 1 of 77 at #5 and none later. The rulings: 25 `POST-LADDER DISPOSITION`, 10 `DEPENDENCY INVERSION`, 9 `STRUCTURAL EXIT`, 9 `RUNG 1`, 5 `SECOND-STAGE CAP`, 4 `guard-binding` by substring over the `ruling` text (categories overlap); 25, 4, 6, 3, 3 by the opening phrase. R-B509 (M:54808) ruled three new claim sets in one refusal, each at rung 1. At `a14c87f82e` the five contributor-doc paths hit 0 files for each of `R514`, `R515`, `R668`, `claims wider`, `wider than pins`, `claim-wider` and `READINGS-UNPINNED`, while the control `R539` hits 3 files; the docs grew by 346 lines on those paths since `aa9ea0d8` (225 of them three per-census residual tables in `docs/workbench/14-qa-and-benchmarks.md`) and spell the literal `NOT CLAIMED` in 1 bead receipt (`docs/workbench/receipts/wb-d8io.md`, 7 matching lines; 9 files with `git grep -i`, the other 8 being lowercase prose `not claimed` unrelated to the claim form), and still none names the class in the words 54 of 56 refusals use. Typed `unmet` tokens of the three-field form `U{n}-{LOW|MEDIUM|HIGH}-{CONFIRMED|PLAUSIBLE|UNDETERMINED}-...` sit on 34 of 56 rows (81 of 151 entries); the strict form first appears at M:15309 (2026-10-24T05:41:29Z), 10 days before this window opened and 11 before the stamp, and sat on 56 of 88 refusals in the previous window — a dating measured here and set against the orchestrator packet's "new mechanism this window" under "What I did not establish". Grades: Findings 1-5 CONFIRMED (re-checks STILL-TRUE, with the `reason` share, the ladder shape and the seven-field positive CHANGED as stated in the table).

## Finding 1 — 42 of 56 `gate-refused` rows name R514, R515 or R668 in `reason` (52 of 56 over `reason`, `unmet` and `unmetFull`), 54 of 56 cite `LEG 2`, 55 of 56 were refused at `PREP F`, and `prepSeconds` sums to 152,506 s — **CONFIRMED**

The pass kept `kind == "gate-refused"` inside the window and tested fields against the regex `R514|R515|R668` (case-sensitive, as are the `LEG 2`, `PREP F` and `wider than` tests). The `reason` test is the corroborated file's instrument; the `unmet` and `unmetFull` tests are given beside it because this window moved the class name into the tokens for 8 rows; the whole-row test (every field, `json.dumps`) is given because the orchestrator's evidence packet quoted that form, and it over-counts by one row (M:51960 wb-j4sm #3 names the class only in its `classIdentity` history field).

```
=== gate-refused rows in window: 56 first M:51063 2026-11-03T08:33:17Z last M:54886 2026-11-04T07:38:43Z
distinct beads: 36
reason names R514|R515|R668: 42 of 56
whole-row JSON names R514|R515|R668: 53 of 56
  whole-row names R514: 50 ; in reason: 39
  whole-row names R515: 50 ; in reason: 39
  whole-row names R668: 52 ; in reason: 41
unmet array names R514|R515|R668: 42 of 56
reason 'LEG 2': 54 of 56
reason 'PREP F': 55 of 56
reason 'wider than': 26 of 56
reason 'rule 16' (cs): 51 ; 'record honesty': 4
refusedAtStage raw: [('PREP F', 55), ('PREP B IDENTIFY', 1)]
prepSeconds numeric on 56 of 56 sum 152506 median 2555.5 min 376 max 4814 hours 42.4
gateSeconds: [(0, 46), (291, 1), (450, 1), (386, 1), (329, 1), (429, 1), (460, 1), (470, 1), (405, 1), (359, 1), (788, 1)]
synthesized: [(True, 46), (False, 7), (None, 3)]
needsRuling: [(True, 48), (False, 8)]
refusalNumber dist: [(1, 10), (2, 9), (3, 4), (4, 7), (5, 10), (6, 7), (7, 5), (8, 2), (9, 2)]
#2+ rows: 46 prepSeconds sum: 128763
#5+ rows: 26 prepSeconds sum: 76118 beads: ['wb-021.6', 'wb-021.9', 'wb-5333', 'wb-5mco', 'wb-b9ot', 'wb-jwc.10', 'wb-khhg', 'wb-km7q.4', 'wb-lrz.8', 'wb-ouo3', 'wb-py8n', 'wb-pyel.1', 'wb-pyel.7', 'wb-pyel.9', 'wb-s876', 'wb-tz2.9']
#1 rows: 10 naming class in reason: 7
unmetIds nonempty: 39 of 56
unmet nonempty: 56 of 56
rows carrying all six fields present: 56 of 56
```

```
reason 42 unmet 42 unmetFull 44 union reason|unmet|unmetFull 52
reason only (not unmet): 8 unmet only (not reason): 8
whole-row but not union: 1
  M:51960 wb-j4sm #3 fields naming class: ['classIdentity']
rows outside the reason|unmet|unmetFull union: 4
  M:51960 wb-j4sm #3 needsRuling=True stage=PREP F LEG2=False unmet0=U1-LOW-ANCHOR-ENUM-EXPORT-BOUND-TO-A-FUNCTION-MID-RUN-THROUGH-AN-ASSERTION-WRAPPED-ASSIGNMENT-PLACED-IN-NO-SEC
  M:53762 wb-rdlh.4 #1 needsRuling=False stage=PREP B IDENTIFY LEG2=False unmet0=U1-KNOWN-RED-BY-REFERENCE-routine-knownRedAtLanding-900-hand-flag-landing-post-result-M:53327-conflict-registr
  M:54567 wb-3ox2 #1 needsRuling=False stage=PREP F LEG2=True unmet0=U1-MEDIUM-RULE16-LEG2-PINNEDSETOF-FIRST-LINE-UNPINNED
  M:54735 wb-rdlh.4 #2 needsRuling=False stage=PREP F LEG2=True unmet0=U1-LOW-RULE16-LEG2-GP-LATER-READING-SECTION-WORD-UNPINNED (detail and cure: UNMET U1 in the bead note)
```

So 52 of 56 name the identifiers somewhere in the row's own fields, 54 of 56 name the leg, and the two rows that name neither are M:51960 (a substance respin of the R-B405 enumerate-the-resolvable cut whose reason names no leg) and M:53762 (a custody re-cut trigger). The terse form, quoted whole from M:54785 (wb-dixg refusal #2, `cutNumber` 3, seat `gate-prep-5`, run `g10-gate-s206`, `prepSeconds` 3693, `gateSeconds` 0, `synthesized` true, `unmetIds` absent):

```
substance-respin at PREP F (refusal #2 of wb-dixg, on cut #3 479ea249 over base 08a61f18; gateBase bf8de9c2; probe 457fe3c7, tree f23346ec). Rule 16 LEG 2 is not met.
```

Its class identifiers sit in its three `unmet` tokens, quoted in Finding 3. The ten rows whose `gateSeconds` is not 0 (a change from 76 of 77 at 0 in the corroborated window; 7 of them say `synthesized` false, 3 carry no `synthesized` key, and M:51502 is also the one refusal row in the window with no `cutNumber` key):

```
  M:51390 wb-tz2.20 #4 gateSeconds=291 synthesized=None stage=PREP F
  M:51502 wb-pyel.7 #7 gateSeconds=450 synthesized=False stage=PREP F
  M:51652 wb-lrz.8 #7 gateSeconds=386 synthesized=False stage=PREP F
  M:51840 wb-37o9 #3 gateSeconds=329 synthesized=False stage=PREP F
  M:51901 wb-tz2.21 #4 gateSeconds=429 synthesized=False stage=PREP F
  M:52021 wb-021.12 #2 gateSeconds=460 synthesized=False stage=PREP F
  M:52250 wb-lnz5 #1 gateSeconds=470 synthesized=None stage=PREP F
  M:52329 wb-py8n #5 gateSeconds=405 synthesized=False stage=PREP F
  M:52664 wb-tz2.9 #5 gateSeconds=359 synthesized=False stage=PREP F
  M:52830 wb-pgzz #1 gateSeconds=788 synthesized=None stage=PREP F
sum non-zero gateSeconds: 4367
```

The orchestrator's evidence packet for this run quoted the same 56, 48 and 152,506 and a shorter list of four non-zero gates (291, 450, 386, 329); the ledger holds ten. The field each number rests on is stated here so a reader can pick.

## Finding 2 — 26 of 56 refusals fell at refusal #5 or later (1 of 77 in the corroborated window), 25 of 99 rulings are 22(d) post-ladder dispositions, 24 of them keeping the bead open and re-cutting, and the ladder's own rungs fell to 3 caps, 6 exits and 4 inversions by opening phrase — **CONFIRMED**

Classification over the 99 `ruling-bound` rows, two ways. By substring anywhere in the `ruling` text (the packet's method; categories overlap, because an exit ruling recites the cap and the inversion that preceded it — R-B417, R-B418, R-B431, R-B438, R-B440 and R-B495 count under both `DEPENDENCY INVERSION` and `STRUCTURAL EXIT`, R-B419, R-B435 and R-B469 under both `SECOND-STAGE CAP` and `STRUCTURAL EXIT`, R-B443 under `SECOND-STAGE CAP`, `RUNG 1` and `guard-binding`), and by the opening phrase (first 90 characters), which is the corroborated file's instrument and the comparable one:

```
phrase 'POST-LADDER DISPOSITION': 25 ['R-B416', 'R-B427', 'R-B429', 'R-B432', 'R-B436', 'R-B444', 'R-B448', 'R-B452', 'R-B454', 'R-B455', 'R-B468', 'R-B470', 'R-B474', 'R-B482', 'R-B486', 'R-B487', 'R-B489', 'R-B493', 'R-B494', 'R-B496', 'R-B497', 'R-B504', 'R-B506', 'R-B508', 'R-B512']
phrase 'DEPENDENCY INVERSION': 10 ['R-B417', 'R-B418', 'R-B422', 'R-B424', 'R-B428', 'R-B431', 'R-B438', 'R-B440', 'R-B449', 'R-B495']
phrase 'STRUCTURAL EXIT': 9 ['R-B417', 'R-B418', 'R-B419', 'R-B431', 'R-B435', 'R-B438', 'R-B440', 'R-B469', 'R-B495']
phrase 'RUNG 1': 9 ['R-B443', 'R-B446', 'R-B460', 'R-B462', 'R-B475', 'R-B478', 'R-B501', 'R-B502', 'R-B509']
phrase 'rung-1': 6 ['R-B419', 'R-B424', 'R-B478', 'R-B480', 'R-B501', 'R-B502']
phrase 'SECOND-STAGE CAP': 5 ['R-B419', 'R-B435', 'R-B443', 'R-B469', 'R-B490']
phrase 'guard-binding': 4 ['R-B443', 'R-B478', 'R-B501', 'R-B502']
phrase 'EXTERNAL TRUNK ADVANCE': 1 ['R-B423']
phrase "FACTS from the row's typed unmet tokens": 2 ['R-B462', 'R-B509']
opening-phrase (first 90 chars): {'REMAINDER RULING': 7, 'POST-LADDER DISPOSITION': 25, 'STRUCTURAL EXIT': 6, 'SECOND-STAGE CAP': 3, 'OTHER': 50, 'DEPENDENCY INVERSION': 4, 'RUNG 1': 3, 'GUARD': 1}
rulings naming R514|R515|R668 anywhere: 22 of 99
```

The corroborated file counted 28 caps, 19 exits, 9 inversions and 23 OTHER by opening phrase and had no post-ladder category; here the ladder's three rungs sum to 13 by the same instrument and the post-ladder form is the largest category at 25. Over the 25 post-ladder rulings' text: 21 say the ladder is `spent` (R-B416, R-B432, R-B448 and R-B474 do not use the word), 24 say the bead `stays open and store-pickable` (R-B416 does not), 13 name R514, R515 or R668, and 9 name neither the identifiers nor `wider` (R-B444, R-B448, R-B452, R-B474, R-B482, R-B489, R-B493, R-B497, R-B504). The three quoted below carry all three phrases; each is quoted to its governing sentences (the `[...]` cuts are mine):

```
M:54780 R-B506 2026-11-04T06:56:42Z bead=wb-b9ot :: POST-LADDER DISPOSITION - wb-b9ot refusal #7 (O:2011, metrics M:54758, seat gate-prep-6; acked M:54778), on the R-B486-ordered restatement cut #7 (fb67aa03) over the landed carrier wb-rv3o. The ladder is SPENT (R-B238 cap, R-B270 exit, R-B286 inversion; R-B452 ruled #5, R-B486 ruled #6), so the R-B316/R-B367/R-B452/R-B486 post-ladder form governs: the refusal STANDS as realized. [...] NO cap, hold or new rung is pre-bound (the ladder is spent; the next refusal returns here under 22(d) as refusal #8). The bead stays open and store-pickable for the re-cut; needsRuling=true is why this disposition carries a typed row.
M:54804 R-B508 2026-11-04T07:01:47Z bead=wb-ouo3 :: 22(d) POST-LADDER DISPOSITION for wb-ouo3 refusal #9 (O:2012, metrics M:54786, seat gate-prep-24 run per the row; acked M:54799), on the R-B474-ordered restatement cut #9 d0692d90, the R-B429/R-B436/R-B452/R-B474 form. POSITION: refusal #8's members are CURED as R-B474 ordered and refusal #7's and #6's members stay killed - the cut made real progress - but the refusal STANDS as REALIZED in cut #9's OWN new claim words (R-B358: class identity follows the claim set; both sets are new members of the R514/R515/R668 claims-wider-than-pins class): [...]
M:54897 R-B512 2026-11-04T07:41:35Z bead=wb-021.6 :: 22(d) POST-LADDER DISPOSITION for wb-021.6 refusal #6 (O:2015, metrics M:54886, seat gate-prep-7; acked M:54896), the FIRST refusal on the post-inversion restatement cut #6 (035ef486) over the landed carriers wb-021.11 (landing 855) and wb-021.9 (landing 912) [...] The ladder is SPENT (R-B130 cap, R-B160 exit, R-B205 inversion), so NO new rung arises; the refusal STANDS as REALIZED: six gate-authored one-edit reader mutants (tsc 0, biome rc 0) keep the census at 0 failed | 40 passed on two runs, EACH realized fail-open by a paired real-tree witness [...]
```

The 26 rows at #5 or later, all `needsRuling` true, all at `PREP F`, all 26 citing `LEG 2` in `reason` and all 26 naming the identifiers in `reason`, `unmet` or `unmetFull` (25 of 26 in `reason` or `unmet`; M:52664 wb-tz2.9 #5 carries them only in `unmetFull`, its `unmet[0]` being `U1-W1-READ-EVERY-WORD-UNPINNED`):

```
  M:51063 wb-s876 #8 prep=3280 needsRuling=True utc=2026-11-03T08:33:17Z
  M:51502 wb-pyel.7 #7 prep=2351 needsRuling=True utc=2026-11-03T11:15:53Z
  M:51566 wb-021.9 #5 prep=2483 needsRuling=True utc=2026-11-03T11:30:22Z
  M:51652 wb-lrz.8 #7 prep=2083 needsRuling=True utc=2026-11-03T11:57:05Z
  M:51859 wb-ouo3 #7 prep=4814 needsRuling=True utc=2026-11-03T13:10:36Z
  M:52024 wb-5333 #5 prep=3215 needsRuling=True utc=2026-11-03T14:12:03Z
  M:52308 wb-s876 #9 prep=2429 needsRuling=True utc=2026-11-03T16:16:56Z
  M:52329 wb-py8n #5 prep=2007 needsRuling=True utc=2026-11-03T16:23:26Z
  M:52548 wb-b9ot #5 prep=3087 needsRuling=True utc=2026-11-03T17:50:11Z
  M:52636 wb-021.9 #6 prep=2322 needsRuling=True utc=2026-11-03T18:13:57Z
  M:52664 wb-tz2.9 #5 prep=2485 needsRuling=True utc=2026-11-03T18:24:12Z
  M:53124 wb-5333 #6 prep=2337 needsRuling=True utc=2026-11-03T21:00:13Z
  M:53196 wb-jwc.10 #5 prep=2605 needsRuling=True utc=2026-11-03T21:26:41Z
  M:53325 wb-ouo3 #8 prep=3068 needsRuling=True utc=2026-11-03T22:02:16Z
  M:53640 wb-pyel.9 #5 prep=2134 needsRuling=True utc=2026-11-03T23:52:07Z
  M:53810 wb-b9ot #6 prep=3016 needsRuling=True utc=2026-11-04T00:47:19Z
  M:53905 wb-km7q.4 #6 prep=4119 needsRuling=True utc=2026-11-04T01:17:41Z
  M:53951 wb-pyel.1 #5 prep=3132 needsRuling=True utc=2026-11-04T01:35:01Z
  M:54100 wb-khhg #5 prep=2537 needsRuling=True utc=2026-11-04T02:36:44Z
  M:54146 wb-5mco #5 prep=3475 needsRuling=True utc=2026-11-04T02:54:48Z
  M:54207 wb-jwc.10 #6 prep=2096 needsRuling=True utc=2026-11-04T03:28:29Z
  M:54296 wb-5333 #7 prep=3134 needsRuling=True utc=2026-11-04T03:56:39Z
  M:54648 wb-pyel.9 #6 prep=4447 needsRuling=True utc=2026-11-04T06:16:19Z
  M:54758 wb-b9ot #7 prep=2674 needsRuling=True utc=2026-11-04T06:51:14Z
  M:54786 wb-ouo3 #9 prep=4184 needsRuling=True utc=2026-11-04T06:57:42Z
  M:54886 wb-021.6 #6 prep=2604 needsRuling=True utc=2026-11-04T07:38:43Z
```

The corroborated file's recommendation 4 reads, of re-cuts, that they "had already read a refusal note naming the class and still re-widened the claim through a new member"; this window puts a number on how far that runs: four beads (wb-ouo3, wb-021.12, wb-5333, wb-b9ot) drew three refusals each inside 24 h, and wb-ouo3 and wb-s876 reached #9. The ladder is the machine's and its correctness is not this repository's question; the 26 rows are the realized cost of a convention whose claim set is free prose re-written on every cut.

## Finding 3 — wb-dixg refusal #2 (M:54785) opened three new claim sets in one refusal, each a first failure of its set, and R-B509 ruled all three at rung 1 from the row's typed tokens — **CONFIRMED**

The row's `unmet` array, verbatim (three entries, one line each):

```
U1-LOW-CONFIRMED-R514-R515-R668-RULE16-LEG2-PATH-FILE-NAME-WORDS-WIDER-THAN-PINS-ROOT-DEPTH-PLURAL-UNDERSCORE-G206-PATH-ROOT-G206-PATH-SINGULAR-G206-PATH-UNDERSCORE-0of25-TWO-RUNS-FAIL-OPEN-PAIRED-REAL-TREE-WITNESSES
U2-LOW-CONFIRMED-R514-R515-R668-RULE16-LEG2-ESCAPED-NAME-WORDS-DECLARED-NAME-AND-NAME-READ-IN-AN-EXPRESSION-WIDER-THAN-PINS-G206-ID-FUNCTION-NAME-G206-ID-RETURN-READ-0of25-TWO-RUNS-FAIL-OPEN-PAIRED-REAL-TREE-WITNESSES
U3-LOW-CONFIRMED-R514-R515-R668-RULE16-LEG2-TEMPLATE-PART-WORDS-WIDER-THAN-PINS-TEMPLATE-POSITION-G206-TPL-ARRAY-G206-TPL-CALL-ARG-0of25-TWO-RUNS-FAIL-OPEN-PAIRED-REAL-TREE-WITNESSES
```

The bead's refusal #1, M:52866 (2026-11-03T19:36:13Z, cut #1 `2cdd8472`), carried two tokens of the same form naming the G202 sets (`...PATH-WORDS-READ-WHOLE-EVERY-DIRECTORY-NAME-WIDER-THAN-PINS-G202-PATH-SEGMENTS-G202-PATH-NO-TOP-0of22...` and `...TEMPLATE-WORDS-EVERY-SPANS-LITERAL-PINNED-ONLY-AT-TWO-SPANS-G202-TPL-FIRST-TWO-G202-TPL-LAST-TWO-0of22...`), ruled rung 1 by R-B462 (M:52872, 2026-11-03T19:38:39Z). R-B509 (M:54808, 2026-11-04T07:02:58Z), quoted from its FACTS sentence through its rung sentence:

```
FACTS from the row's typed unmet tokens (all three LOW CONFIRMED, R514/R515/R668 claims-wider-than-pins, fail-open, paired real-tree witnesses, 0 of 25 on two runs): U1 - the PATH FILE-NAME words claim root/depth/plural/underscore facets wider than the pins (G206-PATH-ROOT, G206-PATH-SINGULAR, G206-PATH-UNDERSCORE); U2 - the ESCAPED-NAME words claim the declared name AND a name read in an expression while the pin holds less (G206-ID-FUNCTION-NAME, G206-ID-RETURN-READ); U3 - the TEMPLATE-PART words claim template position wider than the pins (G206-TPL-ARRAY, G206-TPL-CALL-ARG). IDENTITY (M:49033 / R-B358: class identity follows the CLAIM SET): all three are FIRST failures of their claim sets on this bead - refusal #1's sets (R-B462: the G202 every-directory-name PATH words and the G202 every-spans TEMPLATE words) do NOT appear among cut #3's unmet tokens and are not re-failed; the new G206 sets name different claim words and facets (file-name forms, escaped names, template position) with different witness families. RUNG 1 for each: a member-level respin, NO cap, NO freeze, NO guard bound (the guard binds at whichever later refusal re-fails a SAME set, the R-B397/R-B407 pattern with its typed row under R-B391; the rung-2 clock stays unstarted per M:48467).
```

The G-ids are the gate's names for its own mutants, not symbols in the cut: `git cat-file -t 479ea249cac75a8215f18e81e9e5fdcac2fb679e` prints `commit`, `git grep -l -E 'G206-PATH-ROOT|G206-TPL-ARRAY|G206-ID-FUNCTION-NAME' 479ea249cac7 -- test | wc -l` prints 0 and `git grep -l -E 'G206' 479ea249cac7 | wc -l` prints 0. So the cut cured refusal #1's two sets (the ruling says they "do NOT appear among cut #3's unmet tokens") and re-widened on three others — the per-member cure the corroborated file's recommendation 4 describes, at three sets in one step. Under the machine's rule-19 identity (class identity follows the claim set) that is three rung-1 events with no cap; whether a claim-set identity that resets per set is the right unit is the machine's question, and it is named here only because the product-side helper the thread asks for (a claimed-set block the census asserts against its roster) is the one fix that would hold the claim words to the pins before the gate reads them.

## Finding 4 — at `a14c87f82e` the five contributor-doc paths name none of R514, R515, R668, `claims wider`, `wider than pins`, `claim-wider` or `READINGS-UNPINNED`, while the control `R539` hits 3 files, after 346 more doc lines since the corroborated pin — **CONFIRMED** (re-check verdict **STILL-TRUE** at a fourth revision: `fced7bfd` → `9fdd6d9b` → `aa9ea0d8` → `a14c87f8`)

```
$ for p in docs AGENTS.md CONTRIBUTING.md README.md qa; do printf '%s exists: ' "$p"; git cat-file -e "$REF:$p" && echo yes || echo NO; done
docs exists: yes
AGENTS.md exists: yes
CONTRIBUTING.md exists: yes
README.md exists: yes
qa exists: yes
$ for needle in 'R514' 'R515' 'R668' 'claims wider' 'wider than pins' 'claim-wider' 'READINGS-UNPINNED' 'R539'; do n=$(git grep -c -E "$needle" $REF -- docs AGENTS.md CONTRIBUTING.md README.md qa | wc -l); echo "needle '$needle' -> $n files"; done
needle 'R514' -> 0 files
needle 'R515' -> 0 files
needle 'R668' -> 0 files
needle 'claims wider' -> 0 files
needle 'wider than pins' -> 0 files
needle 'claim-wider' -> 0 files
needle 'READINGS-UNPINNED' -> 0 files
needle 'R539' -> 3 files
$ git grep -c -E 'R539' $REF -- docs AGENTS.md CONTRIBUTING.md README.md qa | sed "s/^$REF://"
docs/workbench/receipts/wb-752.9.md:1
docs/workbench/receipts/wb-973.10.md:3
docs/workbench/receipts/wb-h8f.6.md:2
```

(`REF=a14c87f82e88b56a26c5c53d2f990a4fdc3bcb20`; the `R539` counts are matching lines per file.) A wider needle set, in files, over the same five paths at the pin — the arming control for the phrases the machine's claim form and the rulings use, every needle case-sensitive as in the block above: `NOT CLAIMED` 1 (`docs/workbench/receipts/wb-d8io.md`, 7 matching lines, a bead receipt; with `-i` the count is 9, the other 8 — `docs/workbench/17-packaging-and-operations.md:55`, `docs/workbench/README.md:3` and `qa/workbench/local-detached-client.mjs:119` among them — being lowercase prose `not claimed` unrelated to the claim form; every other needle in this set counts the same with and without `-i`), `pinned reader set` 0 (`Pinned reader set` 0), `claims equal to pins` 0, `kill-or-pin` 0, `record honesty` 0, `LEG 2` 1 (`docs/workbench/receipts/wb-91yt.md`, a bead receipt describing landed rows — the same file the corroborated file found at `aa9ea0d8`), `header claim` 0, `claim row` 6, `census` 63. The docs moved: `git diff --stat aa9ea0d8c8b1 a14c87f82e -- docs AGENTS.md CONTRIBUTING.md README.md qa` ends `5 files changed, 346 insertions(+), 2 deletions(-)`, and since `fced7bfd` it ends `19 files changed, 1202 insertions(+), 7 deletions(-)`; `docs/workbench/14-qa-and-benchmarks.md` alone gained 225 lines (507 at the pin) in three new per-census sections — residual and read-form tables for individual censuses, which is the convention's output, not its rule. The heading the 2026-10-26 fix 1 named is still `docs/workbench/14-qa-and-benchmarks.md:119` `## Truth labels and release gates`, and `:121` still carries `Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened.` with nothing under it about claim rows. So the gap survived a fourth revision and 1,202 lines of doc growth, and the one doc-path file that spells the claim form's literal `NOT CLAIMED` is a bead receipt (`docs/workbench/receipts/wb-d8io.md`, 7 lines), not a rule; the 165 test files that carry the literal (Evidence) are where the form lives.

Where the identifiers do live at the pin: `git grep -il -E 'R514|R515|R668' a14c87f82e` lists 34 paths (the case-sensitive `-l` form lists the same 34) — the two bead-export files under `.beads/` (the `[bead export]` and its interactions file), 11 files in this directory (the thread's three files among them), and 21 paths under `test/`: 2 roster fixtures under `test/fixtures/` and 19 test files (the corroborated file counted 3 test files at `aa9ea0d8`, and `git grep -il -E 'R514|R515|R668' aa9ea0d8 -- test` still prints those 3; most of the growth is respin-history header comments of the form the corroborated file quoted from `test/workbench-hx-recipe-serving-census.test.ts:169-174`, while one of the 19, `test/workbench-acceptance-journeys.census.ts:36`, cites R668 as a requirement id — `wb-qys1 / R658 / R668: citation text is rendered from marked tokens` — not a respin history, as it did among the corroborated file's 3). The 19 names are not listed here because some of them carry tokens that trunk's doc-walking censuses read this directory for (the Scope line names the token classes); the command reproduces the list. A cutter who greps the identifiers now lands on 19 test files — most of them landed censuses' respin histories — and on this thread, and still on no contributor paragraph.

## Finding 5 — typed `unmet` tokens of the form `U{n}-{LOW|MEDIUM|HIGH}-{CONFIRMED|PLAUSIBLE|UNDETERMINED}-...` sit on 34 of 56 refusal rows (81 of 151 entries; 31 rows fully typed), two of 99 rulings were written from them, and the form is 11 days old — **CONFIRMED**

```
unmet entries total: 151 typed: 81
rows with >=1 typed token: 34 of 56
rows fully typed (all unmet typed, >=1): 31 of 56
typed token length median 177 min 46 max 1854
rows with a <k>of<n> reading in a typed token: 11
rows with a G-id in a typed token: 7
typed token grade words: Counter({'CONFIRMED': 81}) severity: Counter({'LOW': 37, 'MEDIUM': 30, 'HIGH': 14})
first typed token in whole ledger: M:15309 2026-10-24T05:41:29Z wb-4wmu.1 U1-MEDIUM-CONFIRMED-RENDERED-TEXT-DOCS-TRUTH-clauses-(a)-and-(c)
previous window gate-refused: 88 with >=1 typed token: 56
rows with every unmet entry U<n>- prefixed: 53 of 56
rows with >=1 U<n>- prefixed entry: 56 of 56
kofn \b rows typed: 11 any-unmet: 17 | no-\b typed: 11 any: 17
G-id \bG\d+- typed: 7 any: 10 | \bG[A-Z]*\d+- typed: 11 any: 22 | -G\d+ typed: 9 any: 12
typed rows needsRuling: Counter({True: 31, False: 3})
```

The regex for "typed" is `^U\d+-(LOW|MEDIUM|HIGH)-(CONFIRMED|PLAUSIBLE|UNDETERMINED)-` on each `unmet` entry; `{k}of{n}` is `\d+of\d+`; the G-id counts are given under three regexes because the mutant-name grammar varies (`G17-`, `GP24-`, `GX04B-`). All 81 typed tokens grade CONFIRMED; none says PLAUSIBLE or UNDETERMINED. The 22 rows without a strict-form token still carry `U{n}-` entries (56 of 56 rows; 53 of 56 with every entry so prefixed), in looser shapes — a severity without a grade word (`U1-MEDIUM-R514-R515-R668-DF-IMPORT-CENSUS-...`), a reading without either (`U1-W1-READ-EVERY-WORD-UNPINNED`, `U1-RULE16-LEG2-11-SURVIVING-NON-EQUIVALENT-READER-MUTANTS-ON-CLAIMED-FORMS-0of164-R514-R515`). The grammar is seat practice, not a written spec: `grep -n -E 'U1-(LOW|MEDIUM|HIGH)-|one token per|token per claim|typed unmet|unmet token|machine-readable' state/claim-form.md state/next-gate-addendum.md state/standing-rules.md` exits 1 (0 hits over 360 lines), while the control `grep -c -E 'unmet'` over the same three files, in that order, prints 0, 0 and 1 (the single hit is `state/standing-rules.md:21`, rule 19's "the unmet list appended as a bead note"; `state/claim-form.md` has none). Two rulings state `FACTS from the row's typed unmet tokens` (R-B462 at M:52872, R-B509 at M:54808; the word `token` appears in 10 of 99 rulings); the packet's "four ladder rulings were classified from tokens alone" is not reproduced by that phrase — the other post-ladder rulings recite the members in their own words — and the artifact that would settle it is the ruling texts, which are quoted in Finding 2 without the phrase. The dating: the first strict-form token in the whole ledger is M:15309 (2026-10-24T05:41:29Z, wb-4wmu.1), and the previous 24 h window (2026-11-02T07:55Z..2026-11-03T07:55Z) already carried one on 56 of 88 refusals; the form is eleven days old at this stamp (ten at the window's opening) and this window's 34 of 56 (61%) is a lower share than the previous window's 56 of 88 (64%). The mechanism's value, and what a refactor would break, is in the positives list.

## Evidence

Window pass (python, `-I`, read-only):

```
ledger lines at read: 54991
window kinds (top 14): [('gate-stage', 364), ('ritual-check', 246), ('daemon-liveness', 246), ('host-sample', 235), ('mp-outcome', 206), ('landing-post-result', 159), ('green', 151), ('gate-slot-acquired', 131), ('gate-slot-released', 131), ('red', 130), ('claim', 129), ('prep-done', 121), ('worktree-removed', 121), ('gate-dequeued', 121)]
window rows total: 3954
window first row M:50976 2026-11-03T07:55:38Z last row M:54929 2026-11-04T07:54:51Z
=== ruling-bound rows in window: 99 first M:51048 R-B414 last M:54897 R-B512
UNLABELLED ruling-bound row M:54754 utc=2026-11-04T06:50:38Z bead=wb-bud9 keys=['actor', 'bead', 'gen', 'kind', 'note', 'ruling', 'run', 'utc']
knob-readback / cohortN rows in window: 0
per-bead refusal counts (window; all 16 beads with 2 or more refusals): [('wb-ouo3', 3), ('wb-021.12', 3), ('wb-5333', 3), ('wb-b9ot', 3), ('wb-s876', 2), ('wb-py8n', 2), ('wb-021.9', 2), ('wb-pgzz', 2), ('wb-dixg', 2), ('wb-60qs', 2), ('wb-jwc.10', 2), ('wb-tz2.24', 2), ('wb-gnj9', 2), ('wb-vuoz', 2), ('wb-pyel.9', 2), ('wb-rdlh.4', 2)]
#2+ rows naming class in reason, unmet or unmetFull: 44 (reason|unmet: 42)
#5+ rows naming class in reason, unmet or unmetFull: 26 (reason|unmet: 25)
#5+ rows reason LEG 2: 26
rulings containing "token": ['R-B420', 'R-B426', 'R-B431', 'R-B430', 'R-B453', 'R-B462', 'R-B467', 'R-B488', 'R-B498', 'R-B509']
```

The orchestrator's packet, computed from the same file minutes earlier, read `mp-outcome` 203 against the 206 here; the ledger is live and the three rows arrived between the two reads. Rig reads: `git fetch -q origin` rc 0; `git rev-parse origin/workbench/implementation-program` = `a14c87f82e88b56a26c5c53d2f990a4fdc3bcb20`; `git log -1 --format='%cI %s'` on it = `2026-11-04T07:51:27Z ledger: close wb-cl20 (landing 925, merge 8a69b896)`; `git rev-list --count HEAD..origin/workbench/implementation-program` = 3419; `git status --porcelain | wc -l` = 19 in the main clone before this draft was written (the untracked earlier drafts; nothing read from it); `git symbolic-ref --short refs/remotes/origin/HEAD` prints `origin/master`, so the default branch was named, not derived. The corroborated file's helper probe at the pin: `git show a14c87f82e:test/helpers/census.ts | grep -n -E '^export .*[Cc]laim'` rc 1 against 56 `^export ` lines in 6,234 lines; `git grep -l -F 'NOT CLAIMED' a14c87f82e -- test/ | wc -l` = 165 (88 at `aa9ea0d8`, 70 at `9fdd6d9b`); `git ls-tree -r --name-only a14c87f82e -- test/fixtures | grep -c -- '-roster.json'` = 154 (137; 127); `git ls-tree -r --name-only a14c87f82e -- test | grep -c -E 'census'` = 242. Machine reads (read-only): `state/claim-form.md` 17 lines, `state/standing-rules.md` 33 lines, `state/next-gate-addendum.md` 310 lines; `BOUNDARY.md` was not read this cycle.

## Re-check verdicts on the corroborated file

| Claim in the corroborated file | Verdict at `a14c87f82e` |
|---|---|
| Finding 1: 74 of 77 refusals name R514/R515/R668 in `reason`; 76 of 77 at PREP F; 76 of 77 with `gateSeconds` 0; `prepSeconds` 192,198 s | **STILL-TRUE** for the class and the stage (52 of 56 name the identifiers in `reason`, `unmet` or `unmetFull`, 54 of 56 cite `LEG 2`, 55 of 56 at PREP F, 152,506 s); **CHANGED** on the two shares: `reason` alone names the class on 42 of 56 because 8 rows moved it into the tokens, and `gateSeconds` is 0 on 46 of 56, not 76 of 77 — 10 rows ran a gate first (Finding 1) |
| Finding 2: the design critic read 85 of 85 at PREP F, 211,550 s, over an overlapping window | **UNDETERMINED** this cycle — the Library artifact was not re-read (artifact: `bead_machines/raw/flywheel-g10.21-design-20261101T0239Z/critic.md` at Library `abe3e479`); no newer critic was looked for |
| Finding 3: 28 caps, 19 exits, 9 inversions in 24 h; 54 of 56 name the class | **CHANGED**: by the same opening-phrase instrument 3 caps, 6 exits, 4 inversions, and 25 `POST-LADDER DISPOSITION` rulings that the earlier window did not have; 22 of 99 rulings name the class anywhere (Finding 2 here). The ladder still closes loops, but the beads it closed now re-cut past it |
| Finding 4: 0 contributor-doc hits for the seven needles against the `R539` control at `aa9ea0d8`; identifiers in-repo only in 3 test files and the two export files | **STILL-TRUE** for the gap at a fourth revision, with a wider needle set armed (Finding 4 here); **CHANGED** for the in-repo locations: 19 test files and 2 roster fixtures (21 paths under `test/`) and 11 files in this directory now carry the identifiers |
| Finding 5: `test/helpers/census.ts` exports no claim symbol; `NOT CLAIMED` in 88 files; 137 rosters | **STILL-TRUE**, and larger: rc 1 on `^export .*[Cc]laim` against 56 export lines; `NOT CLAIMED` 165 files; 154 rosters (Evidence) |
| Machine-side context: claim form live (R-B174), readback NO-COHORT (R-B200) | **UNDETERMINED** — 0 `knob-readback` or `cohortN` rows in this window (Evidence); the artifact is still the next readback row with `cohortN` of at least 1 |
| Positives: 77 of 77 refusal rows carry `refusedAtStage`, `refusalNumber`, `cutNumber`, `prepSeconds`, `gateSeconds`, `synthesized` and `needsRuling`; the fast path spends 0 gate-seconds | **CHANGED** for the fields: all seven are present on 52 of 56 — `cutNumber` absent on M:51502 (wb-pyel.7 #7), `synthesized` absent on M:51390, M:52250 and M:52830; the six fields this file reads (`unmet` in place of `cutNumber` and `synthesized`) are on 56 of 56, which is a new measurement, not the re-check; **CHANGED** for the fast path (46 of 56 at 0; 10 rows ran 291..788 s before refusing) |

## Recommendations, additive to the corroborated file's list

1. **Re-rank the helper above every prose fix, on this window's numbers.** 46 of 56 refusals are re-cuts and 26 of 56 fell past a spent ladder on beads whose seats had read five or more refusal notes naming the class (Finding 2); a paragraph reaches a first cut, and first cuts are 10 of 56. The one fix in either list that reaches a ninth cut is the one that reds the census file-alone when a header claim names a member outside the pinned set (the 2026-10-29 file's Finding 6, the corroborated file's recommendation 4).
2. **Give the census a claim-row identifier the gate can cite.** Every strict-form token names its set in the gate's own words (`PATH-FILE-NAME-WORDS`, `ESCAPED-NAME-WORDS`, `TEMPLATE-PART-WORDS`) because the census header has no addressable claim rows; a helper that numbers the header's claim sentences (and a roster field that lists the pins each one rests on) would let a refusal token cite the row, let a re-cut diff show which row moved, and let the rule-19 identity question in Finding 3 be asked of a row rather than of a phrase. This is additive to the claimed-set block already requested, not a replacement.
3. **Keep the 2026-10-26 fix 1 and the corroborated file's recommendations 1-3 as written; promote them past receipts.** The docs now carry the literal `NOT CLAIMED` in 1 bead receipt (9 files with `-i`, 8 of them unrelated lowercase prose) and three per-census residual tables, which is the convention's output; the rule those sentences serve (claim exactly the pinned set; name the falsifier for each positive claim; `state/claim-form.md:7` says it in one sentence) is still in no contributor doc. One paragraph under `docs/workbench/14-qa-and-benchmarks.md:119` naming `R514/R515/R668`, `claims wider than pins` and `rule 16 LEG 2` remains the cheapest change and is now four revisions overdue.
4. **Write the token grammar down where the seats read.** Machine-side, not this repository's: `state/claim-form.md` is pasted into dispatch args and names no token form; a one-line grammar there would stop the 22 of 56 looser spellings and keep the two-ruling classification path (R-B462, R-B509) reliable.

## Positives worth protecting

- **Typed `unmet` tokens carry the class, the leg, the member ids and the census reading in one grep-able string.** 34 of 56 refusal rows carry at least one `U{n}-{severity}-{grade}-...` token and 56 of 56 carry a `U{n}-` entry; the strict tokens put `R514-R515-R668-RULE16-LEG2`, the set's words, the gate-authored mutant ids (`G206-PATH-ROOT`, ...) and the census reading (`0of25-TWO-RUNS`) in one field, and two rulings (R-B462, R-B509) were written from them without re-reading the cut. The mechanism a refactor would break: for the 8 rows whose `reason` does not name the class (2 terse, 6 long; Summary), the `unmet` token is the only first-position field that does — each also carries it in a secondary field (`unmetFull` on 5 of the 8; `loopCapDisclosure` and `recordUnmet` on the other 3), so a reader of `reason` alone misses the 8 and a reader of `reason` plus `unmet` recovers them from one field of fixed shape (50 of 56). Drop the identifiers from the token grammar and that two-field share falls to 42 of 56, with the 8 recoverable only by joining two differently shaped secondary fields; drop the `{k}of{n}` reading and the classification path in Finding 3 needs the cut re-read. Scope of the praise: the grammar is seat practice with no spec (Finding 5); the praise is for the practice as measured, not for a contract.
- **Every refusal row is typed and self-describing.** 56 of 56 carry `refusedAtStage`, `refusalNumber`, `prepSeconds`, `gateSeconds`, `needsRuling` and a non-empty `unmet` list; `cutNumber` is on 55 of 56 and `unmetIds` on 39 of 56. Two soft edges against the corroborated file's seven-field positive (77 of 77): `cutNumber` is absent on M:51502 (wb-pyel.7 #7, also the 450 s gate row in Finding 1) and `synthesized` on 3 of 56 (M:51390, M:52250, M:52830), so all seven sit on 52 of 56 and a reader must treat a missing key as "unknown", not as false. A 24 h census of the class is still one read-only pass with no joins.
- **The post-ladder form keeps a refused bead open and store-pickable instead of holding it.** R-B506, R-B508 and R-B512 each say the bead "stays open and store-pickable for the re-cut" and that "NO cap, hold or new rung is pre-bound" (over the 25 post-ladder rulings: 24 say `stays open and store-pickable`, 20 the full "for the re-cut" sentence, 12 the "NO cap, hold or new rung is pre-bound" sentence); a refusal past the ladder costs a re-cut, not an owner hold. The cost it does not remove is the 76,118 prep-seconds in Finding 2, which is the number the product-side helper is measured against.
- **The ladder's identity rule is stated in the ruling, with its row.** R-B509 names the rule (`R-B358: class identity follows the CLAIM SET`), the prior sets, the new sets and the rung, in one row a later reader can check against the token — the record is honest about why three new sets at refusal #2 drew no cap.
- **The refusal fast path still spends no complete-gate compute on 46 of 56 refused cuts.** The 10 that ran a gate first cost 4,367 gate-seconds in all (Finding 1), 2.9% of the window's 152,506 prep-seconds; the default held.
- **The thread's files land.** All three earlier files of this thread are on trunk at the pin (the `--diff-filter=A` commits in the Corroborates line), and the 2026-11-02 reword and 2026-11-03 landing show the owner's doc-walking censuses running on the merged tree before a feedback file lands; the channel's own guard is the one this file is written to pass.

## What I did not establish

- The outbox form of the refusal rows: `outbox.jsonl` was not read this cycle; every `O:n` here (O:2011, O:2012, O:2013, O:2015) is copied from the ruling row that cites it.
- The design critic's figures and any newer critic (the corroborated file's Finding 2): not re-read; artifact named in the verdict table.
- Whether first cuts authored under the live claim form fail the class less often: 0 `knob-readback` rows in this window; the artifact is still a readback row with `cohortN` of at least 1.
- Whether the four-beads-at-three-refusals concentration (wb-ouo3, wb-021.12, wb-5333, wb-b9ot) is seat-, bead- or census-shaped: the rows carry the seat and the bead, and no instrument here attributes the re-failure to either.
- The 50 `ruling-bound` rows classified OTHER by opening phrase (fleet rulings, the g10.22 design-review rows, the landing remainders) were not read beyond their first 90 characters; 22 of 99 rulings name the class anywhere in their text, and that count includes some of them.
- Whether any author who is not a machine seat cut a census in the window — none was observed; all 56 refused cuts were machine seats' cuts (the `seat` field reads `gate-prep-<n>` on every row), and those seats receive the refusal text and tokens. The docs gap is CONFIRMED as an absence, not as the cause of these 56 refusals.
- Whether the owner's doc-walking censuses read this file green: not run here (no test, gate or mutant ran in this lane); the guarded tokens were written in the bracketed descriptive form the 2026-11-02 reword used, and the owner's pre-run is the instrument.
- The orchestrator packet's figures for this window that differ from the ones here (four non-zero gates against ten; four token-classified rulings against two; "new mechanism this window" against a 2026-10-24 first token) rest on other filters or wordings than the ones stated; each number here names its field and regex so a reader can choose.
