# CORROBORATION, n=3: export readers grew to 175 of 585 at `d7988bc0a4`, and the landing-969 census is the third landed census (landings 797, 846, 969) to derive a judged member set by parsing a seat's typed unmet token out of bead notes on a severity+grade literal — here `U1-MEDIUM-CONFIRMED` in 401,010 characters of carrier notes, a grammar that 0 of 5 rig doc paths and 0 of 3 machine seat-files write down

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the same seat as the corroborated file, a later cycle: the window 2026-11-04T07:54Z..2026-11-05T07:52Z against its 2026-11-01T07:55Z..2026-11-02T07:55Z and the thread root's 2026-10-26T07:30Z..2026-10-27T08:00Z. A later window re-running the corroborated file's Finding 1 instrument, plus a source read it did not make: the text of a census that landed inside this window.
**Date:** 2026-11-05 (ledger window: rows whose `utc` is at or after 2026-11-04T07:54:00Z and before 2026-11-05T07:52:00Z = M:54923 at 2026-11-04T07:54:05Z .. M:58274 at 2026-11-05T07:51:30Z, 3,352 rows at this read; the dispatch packet, computed minutes earlier on the live file, read 3,353 rows to M:58275; stamp 2026-11-05T07:52Z)
**`pi-subagents` revision:** installed tool = trunk `origin/workbench/implementation-program`, read at `d7988bc0a4d6cf6e48fa1be2e62c2833ead3420f` (committer 2026-11-05T06:27:18Z, `ledger: close wb-m14y (landing 971, merge 5104e2de)`), the launch-time fetch-fresh pin. At draft time, after `git fetch -q origin` (rc 0), the ref stands at `094bf2a14c6367b1b729fc2f8fcc4ad11e35454e` (2026-11-05T08:04:55Z, `ledger: close wb-sp4w (landing 972, merge 74afb2d3)`); `git merge-base --is-ancestor d7988bc0a4 094bf2a14c` exits 0, and `git diff --stat` between the two shas over the two landing-969 files prints nothing, so every census path:line below holds at both. Every path:line was read with `git show`, `git grep` or `git ls-tree` at a named sha; nothing was read from the rig clone's checked-out HEAD `188ae59016`, which sits 3,899 commits behind that draft-time ref (`git rev-list --count 188ae59016..094bf2a14c`). At the fix-time re-read the ref had moved to `4ab3af53b75e2333165a4608c2ece5c9ec0bd939` (2026-11-05T08:27:54Z, `ledger: close wb-u6ho (landing 973, merge 9f7fb04c)`), 15 commits (2 first-parent) past `094bf2a14c` and 3,914 past HEAD; `git merge-base --is-ancestor d7988bc0a4 4ab3af53b7` exits 0 and the same two-file `git diff --stat` is empty against it, so every census path:line below holds at all three shas. The clone's `git status --porcelain | wc -l` = 22 at that read: untracked earlier drafts under this directory, plus this file. The program ships no binary of its own, so the trunk sha is the installed-tool pin. Host instruments: git 2.50.1, python3 run with `-I`. The corroborated file measured at `5779ecaf116178b603edd10e40655bd3acf7c2a5`; the thread root at `46ab74f5cc678e565fdc4d851f99e10d1f649309`.
**Machine evidence revision:** `machines/flywheel/ledger/metrics.jsonl`, 58,383 lines at read time (`M:n` is the 1-based line number), read read-only with `python3 -I`; `machines/flywheel/state/landing-order-registry.json` (523 entries; `idx n` is the 0-based position in `entries[]`); `machines/flywheel/state/claim-form.md` (17 lines), `state/standing-rules.md` (33 lines) and `state/next-gate-addendum.md` (310 lines) read with `grep -c`. `outbox.jsonl` was not read; no `O:n` row is cited here.
**Method:** read-only re-derivation in my rig clone after `git fetch -q origin`: the corroborated file's Finding 1 instrument re-run verbatim at four shas; `git show` line reads of the landing-969 census at the pin; `git log --first-parent --diff-filter=A`, `git log -S` and `git show --stat` for the landing and anchor dating; one `python3 -I` pass over the ledger window plus one whole-ledger pass for the token-grade census. No test, gate, bd command or mutant ran in this lane; every red/green count quoted is the gate's own, copied from a row.
**Scope:** feedback about pi-subagents' census convention as a tool surface — what a landed census binds itself to when its judged member set is parsed out of a machine seat's note text at test time. The seats' token-writing practice and the rulings are the orchestrator's (mine) and stay in the machine ledger; they are cited here as producer evidence for what the census depends on. Not about the carried beads' substance. Tokens that trunk's doc-walking censuses read this directory for (census test-file names, the program abbreviation, the bead-export path) are written in bracketed descriptive form in prose per the 2026-11-02/2026-11-03/2026-11-04 precedent; the literal strings appear only inside fenced blocks and in inline code spans that quote rows, paths and commands (three prose lines: the Finding 1 ledger-delta quote, the Finding 4 export-stat sentence and the Evidence paragraph; an `awk` over this file's non-fenced lines finds no other). The four doc-census trip classes the verification pass names were re-checked with `grep -c -i` over this file: 0 lines each (their words are kept out of this file so that check stays 0).
**Corroborates:** [`2026-11-02-CORROBORATION-export-readers-grew-83-of-475-to-141-of-545-in-6-days-a-landed-census-reads-the-installed-tree-and-41-of-41-sweeps-say-unflagged-red-none.md`](2026-11-02-CORROBORATION-export-readers-grew-83-of-475-to-141-of-545-in-6-days-a-landed-census-reads-the-installed-tree-and-41-of-41-sweeps-say-unflagged-red-none.md) — verdict **STILL-TRUE** at `d7988bc0a4` for its Finding 1, the only claim of it re-checked (table below); independent hit 3 on the export-reader thread. Hit 1 is the thread root, `2026-10-27-the-wb-tz4r-8-census-reads-the-bead-export-in-the-gate-so-one-unpinned-bead-note-redded-landing-467-at-32-min-vs-13-5-clean-n-2-with-412-and-83-of-475-trunk-tests-read-it.md`, added to trunk at `63a2e77ae6`; hit 2 is the corroborated file, added at `7625e50153` and landed by the owner's merge `01deac5464` (2026-11-02T10:22:52Z). The same seat each time, at different windows and revisions.
**Prior art:** at the fetched ref, `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 41 entries (40 files + README.md). The filename grep `token|unmet|custody|notes|grammar|parse|u1` hits 0 of 40; `export|reader|census` hits 23 of 40 — the census-convention thread, none of whose names states a census parsing seat tokens out of notes. The body grep `custody-readers|carrierMembers|carrierVerdictBlock|U1-MEDIUM-CONFIRMED-"|source: "notes"|notes-sourced|parses the typed token|token grammar` hits 0 files at the ref; a wider case-insensitive form reaches 1 file, the 2026-10-26 typed-record-honesty positive, whose line 47 quotes refusal-row tokens from the ledger — the gate's own rows, not a census parsing them. Cross-cite on the unlanded `origin/machine/flywheel/feedback-2026-11-04` branch: the n=4 refusal corroboration's Finding 5 measures the same grammar on 34 of 56 refusal rows of its window and grades it seat practice with no written spec; this file shows a landed census now pinning that unwritten grammar from the product side.
**Delivery:** branch `machine/flywheel/feedback-2026-11-05`, cut from a detached worktree of the fetched trunk, for the program owner to land; trunk is neither checked out nor pushed from the main clone (live gate and land worktrees share its object store); the gate waiver (docs-only, no gate run) is disclosed in the commit body as this directory's README and the standing operator direction require. This lane drafts the file only; the commit and push happen in the orchestrator's delivery step.

## Why a second file rather than an edit

The corroborated file carries its own window, revision and method, and it is already on trunk (`7625e50153`, landed by `01deac5464`); it is not edited. A separate file keeps the three dated samples of the growth curve separable, which is what makes n=3 mean anything — folding this window's count into that file would turn a curve back into one undated number. It also keeps this directory's append-only rule and spares every writer the merge conflict a shared file imposes under concurrent filing.

## What this adds

- **A mechanism new to this thread's coverage (not to trunk):** the corroborated file measured that landed censuses read the [bead export] at test time; landing 969, inside this window, landed a census whose judged member set is **derived from** that read. The [wb-tz2.24 custody-readers census] locates a gate seat's verdict block inside the carrier bead's 401,010 characters of notes, anchors on the literal `\nU1: U1-MEDIUM-CONFIRMED-`, regex-parses the surviving members out of the seat's typed unmet token, and holds them `toStrictEqual` to its pinned rows — the test contract reaches into the seats' token spelling, a grammar that 0 of 5 rig doc paths and 0 of 3 machine seat-files write down (Findings 2-4). At the pin it is the third landed census to parse a judged set from a seat's typed token in notes on a severity+grade literal — n=3 on the mechanism: the [edc demand-channel reader census] (landing 797, merge `03642e9a77`, 2026-11-01T17:59:08Z; already on trunk at the corroborated file's pin `5779ecaf11`), the [cac authorization-input census] (landing 846, merge `399421c610`, 2026-11-03T01:17:46Z) and this one (landing 969; Finding 5) — which turns a one-off into a class. The re-run of the corroborated instrument (175 of 585, Finding 5) and the realized gate cost (Finding 6) ride as findings, not as the corroborating addition.

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| Landed censuses read the [bead export] at test time; the reader-count instrument; one landed census also reads the installed tree | the corroborated file, Findings 1-3 |
| The thread root: the wb-tz4r.8 census read the export in the gate, and one unpinned foreign bead note redded landing 467 (32 min vs 13.5 clean) | the thread-root file, named in the Corroborates line (hit 1) |
| Refusal rows carry typed `unmet` tokens; 4 of 4 typed record-honesty refusals measured a census header claim false by a partial mutant | `2026-10-26-positive-4-of-4-typed-record-honesty-refusals-in-24-h-measured-a-census-header-claim-false-by-a-partial-mutant-3-green-1-anchor-red-so-the-header-rows-give-the-gate-its-target.md`, line 47 |
| The token grammar measured on refusal rows (34 of 56 in its window) and graded seat practice, not a written spec | the 2026-11-04 n=4 corroboration, Finding 5, on the unlanded branch `origin/machine/flywheel/feedback-2026-11-04` |

## Summary, with numbers

Landing 969 (merge `4b1f528204`, 2026-11-05T05:35:26Z, inside the window; fold-done M:58106 at 06:21:51Z) added 2 files, 7,993 inserted lines: the [wb-tz2.24 custody-readers census] (6,758 lines; 59 `it(` lines and 34 `describe(` lines by `grep -cE '^\s*(it|describe)\('`) and the [custody-readers census helper] (1,235 lines). The census reads the [bead export] (`:448`) and four bead records — its own bead (`:449`), its parent bead (`:450`), a child bead (`:451`) and the carrier `wb-tz2.24` (`:452`). Its carrier member roster is parsed from the carrier's notes: `carrierVerdictBlock()` (`:815-823`) finds the gate seat's verdict heading, `carrierMembers()` (`:825-841`) anchors on the literal `\nU1: U1-MEDIUM-CONFIRMED-` (`:826`) and regex-parses the member rows (`:830`); it is 1 of 18 notes-reading functions in the file (8 block locators, 10 member parsers), 16 of whose code lines carry a hard-coded grade word: 7 string anchors (`:685`, `:687`, `:703`, `:736`, `:799`, `:826`, `:845` — all 7 hard-code the severity too, and `:736` hard-codes `U3-LOW-PLAUSIBLE`), 3 parser regexes (`:869`, `:896`, `:928`) and 6 filters at `:6329`, `:6333`, `:6337`, `:6341`, `:6345`, `:6349` that all hard-code `CONFIRMED` — the fold-block filter (`:6329`, `/^U[12]-MEDIUM-CONFIRMED-/`) hard-codes `MEDIUM` as well, and the other five wildcard severity with `[A-Z]+`; `:6383-6404` holds the parse `toStrictEqual` to pinned survivor rows, so an empty parse reds (fail-closed). 32 of the file's 40 `source:`-tagged requirement rows read `source: "notes"` (8 read `source: "description"`); 24 of the 32 begin `U<n>-` and 22 carry the full typed severity+grade form; five assertion sites (`:5887`, `:6115`, `:6132`, `:6233`, `:6315`) require each row verbatim inside the live record or its verdict blocks. At the pin the carrier record is status `closed` with 401,010 note characters, 9 `GATE VERDICT wb-tz2.24 (` blocks and 5 anchor occurrences. The grammar is written nowhere a cutter or seat reads: 0 of 5 rig doc paths carry a typed token (armed control: `census` hits 63 files on the same paths); the whole pinned tree outside `test/` and the export carries the form in 1 file (a 2026-10-26 feedback file in this directory); the machine's three seat-facing files hit 0 over 360 lines (armed control: `unmet|\bU1\b|census` hits 5 / 9 / 28 lines on the same three files), and the machine's `generations/`, `bin/`, `STANDARDS.md`, `AGENTS.md` and `CLAUDE.md` carry 0 lines of it — they spell only the F-bullet form `- F<n> <SEVERITY> <TAG>:`. The field varies in both dimensions the parser hard-codes: this window's `gate-refused` rows (62 at this read; 48 `needsRuling` true) carry 102 typed tokens — severity LOW 68 / MEDIUM 28 / HIGH 6; grade CONFIRMED 101 / PLAUSIBLE 1 (M:55925) — and the whole ledger carries 11 non-CONFIRMED typed tokens (10 PLAUSIBLE, 1 UNDETERMINED), the first at M:35156 (2026-10-29T21:46:09Z). The corroborated instrument re-run: 83 of 475 at `46ab74f5` → 141 of 545 at `5779ecaf11` → 171 of 579 at `a14c87f82e` → 175 of 585 at `d7988bc0a4` (29.9% of the test tree reads the export). 15 files under `test/` carry a typed token (13 test files + 2 roster fixtures); 13 of 13 of those test files read the export; exactly 1 of them — this census — carries the fixed string `U1: U1-MEDIUM-CONFIRMED-`, which occurs in 2 blobs of the whole pinned tree (the export and the census), and 2 sibling censuses parse a judged set from notes on the same words in other spellings (`startsWith("| U1-MEDIUM-CONFIRMED-...")` in the [cac authorization-input census] `:1458`/`:1469`; `firstLine(parent, "U1-MEDIUM-CONFIRMED-...")` in the [edc demand-channel reader census] `:1453-1454`), so the mechanism is n=3 on trunk at the pin. Realized cost on the carrier in-window: three `gate-refused` rows ran the census file at 2,592..2,688 generated cases with the helper replaced by the prior cut's blob (4 failed on each replaced-helper leg), and one leg on M:57310 replaced the export blob under the same census text and read 6 failed | 2682 passed (2688). Grades: Findings 1-3 and 5-6 CONFIRMED; Finding 4 CONFIRMED as an armed absence, with the forward red — a later note or grammar change redding the landed census at a later landing — PLAUSIBLE.

## Finding 1 — landing 969 landed the census and its helper inside this window (7,993 inserted lines), and the landing's rc-8 remainder registered it as a reader-named census with three typed reads — **CONFIRMED**

```
$ git log --first-parent --diff-filter=A --format='%h %cI %s' d7988bc0a4 -- test/workbench-hyperunix-custody-readers-census.test.ts
4b1f528204 2026-11-05T05:35:26Z landing 969: wb-tz2.24 (machine/flywheel/wb-tz2.24 tip d961e138f onto trunk 98494c7b1; land-prep gate of record under standing rule 22)
$ git show --stat --format='%h %s' 4b1f528204826262ffdc648255e9f2c4b0c65b17 | grep -E 'hyperunix-custody|files changed'
 test/helpers/hyperunix-custody-readers.ts          | 1235 ++++
 ...kbench-hyperunix-custody-readers-census.test.ts | 6758 ++++++++++++++++++++
 2 files changed, 7993 insertions(+)
```

Ledger: M:58106 (`fold-done`, bead `wb-tz2.24`, 2026-11-05T06:21:51Z) carries `"landing":969,"merge":"4b1f528204826262ffdc648255e9f2c4b0c65b17"`. M:58147 (`landing-post-result`, 06:30:52Z): its `reason` field (436 characters; `json.loads` of ledger line 58147) reads, verbatim and whole:

```
landing 969 (wb-tz2.24 cut d961e138) rc-8 remainder EXECUTED by hand under R-B580 (M:58072, commit eb7fded): F3 PLAIN ADD of the hyperunix custody-readers census entry idx 520 (READER-NAMED, roster null, three typed reads), registry 520 -> 521 (pre fdc92cba8c419d6e post 2841e5f342f83721). Re-entry 1 rc 0: R776 receipt-check ok; 'post-fold: sweep f67b666 vs 98494c7' clean; 'record: fold-done wb-tz2.24 M:58106 B:14897 commit 40fcdb6'.
```

The registry entry at idx 520 names the census and types its three reads (`python3 -I` read of `entries[520]`; the registry holds 523 entries; the entry's keys are exactly `addedAtLanding, addedUtc, census, class, reads, readsAddedUtc, readsNote, reason, roster` — it has no `file` or `landed` key):

```
idx 520 addedAtLanding: 969 | addedUtc: 2026-11-05T06:12:20Z | class: READER-NAMED | roster: null
idx 520 census: test/workbench-hyperunix-custody-readers-census.test.ts
idx 520 reads: ['test/helpers/hyperunix-custody-readers.ts', 'test/workbench-provider-lifecycle.test.ts', '.beads/issues.jsonl']
```

M:58163 (`gate-pass`, bead `wb-9h7s`, 06:36:27Z) names the same trunk delta from the next gate seat's side, verbatim: `The delta from 98494c7b is M .beads/interactions.jsonl, M .beads/issues.jsonl, and two added files, test/helpers/hyperunix-custody-readers.ts and test/workbench-hyperunix-custody-readers-census.test.ts.` In all, 26 window rows name the census — by kind: delivered 5, gate-refused 4, green 4, red 3, collect-ready 3, gate-pass 2, landing-gate 1, landable 1, ruling-bound 1, fold-done 1, blocked 1; by bead: wb-tz2.24 20, wb-pyel.5 2, wb-ldqu 1, wb-zdwo 1, wb-9h7s 1, wb-tz2.20 1.

## Finding 2 — the judged member set is parsed out of the carrier's notes on a severity+grade literal, and an empty parse fails closed — **CONFIRMED**

All quotes are `git show` reads at `d7988bc0a4`; the census file is 6,758 lines. The reader and the record:

```
:448  const EXPORT = ".beads/issues.jsonl";
:449  const BEAD = "wb-tz2.16";
:450  const PARENT = "wb-tz2.11";
:451  const CHILD = "wb-tz2.20";
:452  const CARRIER = "wb-tz2.24";
:463    const text = readFileSync(join(ROOT, path), "utf8");
:476  function exportRecord(id: string): ExportRecord {
:479    const needle = `"id":"${id}"`;
:480    const entry = read(EXPORT)
:481      .split("\n")
:482      .filter(line => line.includes(needle))
```

The parse (`:374` imports `readFileSync` from `node:fs`):

```
:815  function carrierVerdictBlock(refusal: number): string {
:816    const notes = exportRecord(CARRIER).notes;
:817    const heading = `GATE VERDICT ${CARRIER} (`;
:825  function carrierMembers(block: string): (FoldedMember & { readonly subForm: string })[] {
:826    const start = block.indexOf("\nU1: U1-MEDIUM-CONFIRMED-");
:827    if (start < 0) return [];
:830    return [...span.matchAll(/(GP3-[A-Z]+(?:-[A-Z0-9]+)+) \((L\d{3}), ([^()]*)\): '.*?'; witness (tampers|tamperlines) '(.*?)' => (\[[^\]]*\]) vs /g)].map(match => {
```

The same words anchor the sibling parsers in the file — two as template strings a `-F` grep for the `U1: U1-` literal cannot see, three as a severity-wildcarded regex:

```
:685    const start = block.indexOf(item === "U1" ? "\n- U1-MEDIUM-CONFIRMED" : "\n- U2-LOW-CONFIRMED");
:736    const heads = ["\n- U1-MEDIUM-CONFIRMED", "\n- U2-LOW-CONFIRMED", "\n- U3-LOW-PLAUSIBLE"];
:799    const start = block.indexOf(`\n${item}-MEDIUM-CONFIRMED-`);
:845      const start = block.indexOf(`\n${item}: ${item}-MEDIUM-CONFIRMED-`);
:869      const item = /^(U\d+): U\d+-[A-Z]+-CONFIRMED-/.exec(span)?.[1] ?? /^- (F\d+) /.exec(span)?.[1];
```

`carrierMembers()` is 1 of 18 functions in the file that locate a verdict or fold block in a bead's notes or parse members out of one (`grep -n -E '^function '` at the pin, then each body read for `exportRecord(...).notes` or a block argument): 8 block locators (`verdictBlock` `:494`, `ownVerdictBlock` `:660`, `finalVerdictBlock` `:668`, `childVerdictBlock` `:676`, `childVerdictBlock2` `:692`, `childVerdictBlock3` `:725`, `foldBlock` `:790`, `carrierVerdictBlock` `:815`) and 10 member parsers (`childMembers` `:684`, `childItemSpan` `:702`, `childMembers2` `:710`, `childMembers3` `:735`, `foldMembers` `:798`, `carrierMembers` `:825`, `carrierMembers2` `:843`, `carrierMembers3` `:867`, `carrierMembers4` `:894`, `carrierMembers5` `:926`). Outside the pinned data rows, 16 code lines carry a hard-coded grade word (`grep -n -E '(LOW|MEDIUM|HIGH|\[A-Z\]\+)-(CONFIRMED|PLAUSIBLE|UNDETERMINED)'` over the file, minus the `key:`/`text:` rows): 7 string anchors — `:685` (`"\n- U1-MEDIUM-CONFIRMED"` / `"\n- U2-LOW-CONFIRMED"`), `:687`, `:703`, `:736` (whose third head is `"\n- U3-LOW-PLAUSIBLE"`, so the coupling is to the seat's grade word as written, not to `CONFIRMED` alone), `:799` and `:845` (template strings) and `:826`, all 7 hard-coding the severity too; 3 parser regexes `/^(U\d+): U\d+-[A-Z]+-CONFIRMED-/` at `:869`, `:896`, `:928`; and 6 filters at `:6329`, `:6333`, `:6337`, `:6341`, `:6345`, `:6349` that keep verdict lines on the literal `CONFIRMED` — the fold-block filter `:6329` (`/^U[12]-MEDIUM-CONFIRMED-/`) hard-codes `MEDIUM` as well, and the other five (`/^U\d+: U\d+-[A-Z]+-CONFIRMED-.*\. MEMBERS/` in three end-of-sentence spellings, on the verdict blocks of refusals #1..#5) wildcard severity with `[A-Z]+`. The parse is held to pinned rows at `:6383-6404`:

```
:6383      const listed = carrierMembers(carrierVerdictBlock(1));
:6388      expect({
:6389        members: listed.map(member => `U1 ${member.id} ${member.line} (${member.subForm})`),
:6396      }).toStrictEqual({
:6397        members: CARRIER_SURVIVORS_1.map(row => `${row.item} ${row.id} ${row.line} (${row.subForm})`),
```

so a missing anchor returns `[]` at `:827` and the empty parse reds against the non-empty pinned roster — fail-closed (protected in the positives). Beside those 18 functions, a structural notes-parse sits inline in a test at `:6239-6246`, filtering the child bead's fold note by `/^U[12]-FINAL-CUT-/`. The parsed-from record at the pin (a `python3 -I` read of the carrier's line in the export blob): status `closed`, notes 401,010 characters, 9 `GATE VERDICT wb-tz2.24 (` blocks, 5 `\nU1: U1-MEDIUM-CONFIRMED-` occurrences. The anchor entered the bead branch with cut #2:

```
$ git log -S'U1: U1-MEDIUM-CONFIRMED-' --format='%h %cI %s' d7988bc0a4 -- test/workbench-hyperunix-custody-readers-census.test.ts | tail -1
2383094255 2026-11-03T23:22:23Z test(workbench): wb-tz2.24 cut #2 - pin the eight refusal #1 L021 parameter-default members by their PREP-archive witnesses, narrow L021 to its pinned pages, and read NOT CLAIMED words as governed by their own predicate (refusal #1 U1, F1)
```

## Finding 3 — 32 of the file's 40 tagged requirement rows are note text, 22 of them typed tokens, each required verbatim inside the live record at every run — **CONFIRMED**

The row type and two of the typed rows (the carrier requirement table begins at `:3324`):

```
:1068  interface Requirement {
:1069    readonly key: string;
:1070    readonly source: "description" | "notes";
:1071    readonly text: string;
:1072  }
:3330    { key: "wb-tz2.24 R-B424 U1", source: "notes", text: "U1-MEDIUM-CONFIRMED-R514-R515-R668-RULE-16-LEG-2-FINAL-CUT-4-UNNARROWED-ARGUMENT-POSITION-WORDS-4-FAIL-OPEN-GATE-HOLLOWINGS-SURVIVE-0of2518-L022-L023-L024-L031" },
:3331    { key: "wb-tz2.24 R-B424 U2", source: "notes", text: "U2-MEDIUM-CONFIRMED-R514-R515-R668-RULE-16-LEG-2-FINAL-CUT-4-UNNARROWED-ELEMENT-POSITION-WORDS-2-FAIL-OPEN-GATE-HOLLOWINGS-SURVIVE-0of2518-L019-L020" },
```

Counts over the file at the pin: `grep -c 'source: "notes"'` = 32, `grep -c 'source: "description"'` = 8; 24 of the 32 begin `U<n>-` and 22 match `U<n>-(LOW|MEDIUM|HIGH)-`. The assertion shape, at `:5885-5887` and repeated for the other requirement tables at `:6115`, `:6132`, `:6233` and `:6315`:

```
:5885      it("every requirement line this census answers occurs verbatim in the export", () => {
:5886        const sources: Record<string, string> = { description: exportRecord(BEAD).description, notes: exportRecord(BEAD).notes };
:5887        expect(REQUIREMENTS.filter(requirement => !(sources[requirement.source] ?? "").includes(requirement.text)).map(requirement => requirement.key)).toStrictEqual([]);
```

So 22 seat-typed token strings are load-bearing test inputs: the census reds if any of them stops appearing verbatim in the record it reads at run time.

## Finding 4 — the token grammar is written nowhere a cutter or seat reads, while the field varies in both dimensions the parser hard-codes — **CONFIRMED** (an armed absence); that a later note or grammar change reds the landed census at a later landing — **PLAUSIBLE**

```
$ git grep -l -E 'U[0-9]+-(LOW|MEDIUM|HIGH)-(CONFIRMED|PLAUSIBLE|UNDETERMINED)-' d7988bc0a4 -- docs AGENTS.md README.md CONTRIBUTING.md qa | wc -l
0
$ git grep -il 'census' d7988bc0a4 -- docs AGENTS.md README.md CONTRIBUTING.md qa | wc -l
63
$ grep -c -E 'U1-(LOW|MEDIUM|HIGH)-|token per claim|typed unmet|unmet token' state/claim-form.md state/standing-rules.md state/next-gate-addendum.md
state/claim-form.md:0
state/standing-rules.md:0
state/next-gate-addendum.md:0
$ grep -c -i -E 'unmet|\bU1\b|census' state/claim-form.md state/standing-rules.md state/next-gate-addendum.md
state/claim-form.md:5
state/standing-rules.md:9
state/next-gate-addendum.md:28
$ grep -r -n -E 'U[0-9]+-(LOW|MEDIUM|HIGH)-(CONFIRMED|PLAUSIBLE|UNDETERMINED)-' generations bin STANDARDS.md AGENTS.md CLAUDE.md | wc -l
0
$ grep -r -n -o -E '\- F<n> <SEVERITY> <TAG>:' generations bin STANDARDS.md AGENTS.md CLAUDE.md
generations/g10-gate.js:141:- F<n> <SEVERITY> <TAG>:
bin/fold-duties.sh:473:- F<n> <SEVERITY> <TAG>:
$ git grep -l -E 'U[0-9]+-(LOW|MEDIUM|HIGH)-(CONFIRMED|PLAUSIBLE|UNDETERMINED)-' d7988bc0a4 -- . ':!test' ':!.beads'
d7988bc0a4...:new-feedback/2026-10-26-positive-4-of-4-typed-record-honesty-refusals-in-24-h-measured-a-census-header-claim-false-by-a-partial-mutant-3-green-1-anchor-red-so-the-header-rows-give-the-gate-its-target.md
```

(the second command is the armed control on the same five rig paths; the third and fourth run in the machine root, read-only, over 360 lines in all, the fourth being the armed control on the same three files — 5 / 9 / 28 lines; the fifth and sixth sweep the machine's `generations/`, `bin/`, `STANDARDS.md`, `AGENTS.md` and `CLAUDE.md`: 0 lines carry the U-token form, and the only written claim grammar there is the F-bullet form at `generations/g10-gate.js:141` — the same line spells the ledger flag as `--unmet "a,b,c"` — and `bin/fold-duties.sh:473`; the seventh widens the rig control to the whole pinned tree outside `test/` and the export: 1 file, the 2026-10-26 feedback file in this directory that quotes refusal-row tokens, so 17 blobs in the whole tree carry the form — 15 under `test/`, the export and that file). The variance the ledger records, from the window pass (`^U\d+-(LOW|MEDIUM|HIGH)-(CONFIRMED|PLAUSIBLE|UNDETERMINED)-` per `unmet` entry on `gate-refused` rows):

```
typed severity: {'MEDIUM': 28, 'LOW': 68, 'HIGH': 6}  typed grade: {'CONFIRMED': 101, 'PLAUSIBLE': 1}  total typed: 102
whole-ledger non-CONFIRMED typed tokens: 11   (10 PLAUSIBLE, 1 UNDETERMINED; first M:35156 2026-10-29T21:46:09Z)
in-window non-CONFIRMED: M:55925 2026-11-04T14:38:53Z wb-dixg refusal #3, token U2-LOW-PLAUSIBLE-R668-DELIVERED-CONTRADICTION-RULE16-LEG2-...
```

The parser at `:826` accepts one severity of the three the seats write and one grade word of the three, as do the other 6 string anchors (Finding 2); the 3 parser regexes and 5 of the 6 `:6329-6349` filters wildcard severity but hard-code `CONFIRMED`, and the sixth (`:6329`) hard-codes both. The carrier's own five anchor lines are all `MEDIUM-CONFIRMED` today, so the landed census is green — the coupling, not a present red, is the finding. What was not exercised (why the forward claim is PLAUSIBLE, not CONFIRMED): no census run against a record whose carrier `U1:` line is re-spelled; the artifact that would settle it is one run of the landed census against an export whose carrier line carries a different severity or grade word, or a notes rewrite on the carrier bead (the machine's own note tooling replaces the whole field on `--notes`). What is already on the record: the export the census parses is rewritten by landing-close commits — the pin commit itself carries `.beads/issues.jsonl | 19 ++++++++++---------` and the draft-time tip `094bf2a14c` carries `| 33 +++++++++++++++++----------------` — and M:57310 holds a gate leg that swapped the export blob under the same census text and read `Result: 6 failed | 2682 passed (2688)` (Finding 6), so export-blob sensitivity is the gate's own prior measurement, on a pre-landing cut; the landed-tree case is the unexercised one.

## Finding 5 — the corroborated instrument re-run: 175 of 585 test files read the export, 13 of 13 typed-token test files among them; exactly 1 carries the `U1: U1-MEDIUM-CONFIRMED-` anchor string and 2 siblings parse on the same words in other spellings (n=3 on the mechanism) — **CONFIRMED**

The corroborated file's Finding 1 instrument, re-run verbatim at four shas (readers = `git grep -l 'issues\.jsonl' <sha> -- 'test/*.test.ts' 'test/*.census.ts' | wc -l`; total = `git ls-tree -r --name-only <sha> -- test/ | grep -cE '\.(test|census)\.ts$'`):

```
46ab74f5cc678e565fdc4d851f99e10d1f649309 readers=83  total=475   (the thread root's published pair, reproduced)
5779ecaf116178b603edd10e40655bd3acf7c2a5 readers=141 total=545   (the corroborated file's published pair, reproduced)
a14c87f82e88b56a26c5c53d2f990a4fdc3bcb20 readers=171 total=579   (the 2026-11-04 launch pin)
d7988bc0a4d6cf6e48fa1be2e62c2833ead3420f readers=175 total=585   (this pin; 29.9%)
```

The first two rows reproduce the published counts exactly, which validates the re-run; this is the name-grep instrument alone — the corroborated file's two bounding checks were not re-run here (last section). Typed-token files under `test/` at the pin (`git grep -l -E 'U[0-9]+-(LOW|MEDIUM|HIGH)-(CONFIRMED|PLAUSIBLE|UNDETERMINED)-' d7988bc0a4 -- test/`; 11 files at `a14c87f82e`, 15 here):

```
test/fixtures/edc-static-reach-readers-roster.json
test/fixtures/fiber-host-publication-readers-roster.json
test/workbench-cac-authorization-input-census.test.ts
test/workbench-edc-demand-channel-reader-census.test.ts
test/workbench-edc-static-reach-readers-census.test.ts
test/workbench-fiber-host-publication-readers-census.test.ts
test/workbench-furnace-cac-citation-status-readers-census.test.ts
test/workbench-hyperunix-custody-readers-census.test.ts
test/workbench-observation-members-census.test.ts
test/workbench-rc-query-evidence-readers-census.test.ts
test/workbench-rf-session-lifecycle-reach-census.test.ts
test/workbench-rf-tsx-registrar-readers-census.test.ts
test/workbench-rl-coverage-witness-census.test.ts
test/workbench-sealed-reference-scan-coverage-census.test.ts
test/workbench-tsx-activity-boundary-readers-census.test.ts
```

`comm -12` of the 13 test files against the 175 export readers = 13 of 13. The fixed anchor string is unique to this census:

```
$ git grep -l -F 'U1: U1-MEDIUM-CONFIRMED-' d7988bc0a4
d7988bc0a4...:.beads/issues.jsonl
d7988bc0a4...:test/workbench-hyperunix-custody-readers-census.test.ts
```

2 blobs in the whole pinned tree carry that fixed string: the record and this census. The mechanism is not unique to it, though — two sibling typed-token censuses parse a judged set out of a seat's notes on the same severity+grade words in other spellings, both on trunk before landing 969 (`git log --first-parent --diff-filter=A` at `d7988bc0a4`; lines by `git show <sha>:<path> | sed -n`):

```
test/workbench-edc-demand-channel-reader-census.test.ts — landing 797, merge 03642e9a77 2026-11-01T17:59:08Z (the same parse at the corroborated file's pin 5779ecaf11, :985-991)
:1452      const parent = exportRow(PARENT).notes;
:1453      const u1 = firstLine(parent, "U1-MEDIUM-CONFIRMED-R-B122-R515-R668-B1-COMMENTS-CORE-NOT-EXACT");
:1454      const u2 = firstLine(parent, "U2-MEDIUM-CONFIRMED-R-B122-RULE16-LEG2-LIVE-QUIET");
:1457      expect([...idsIn(u1, /\b[ab]\d\d\b/g)].sort(), "row U holds exactly the members refusal #5's U1 line names").toEqual(Object.keys(LINE_PLANTS).sort());
test/workbench-cac-authorization-input-census.test.ts — landing 846, merge 399421c610 2026-11-03T01:17:46Z
:1456  function refusal5Witnesses(notes: string = beadNotes(BEAD)): string[] {
:1458    const at = lines.findIndex(line => line.startsWith("| U1-MEDIUM-CONFIRMED-R514-R515-R668-PROVENANCE-BINDING-KINDS-UNPINNED."));
:1460    if (at === -1 || end === -1) throw new Error(`${EXPORT_FILE}'s ${BEAD} notes carry no refusal #5 UNMET record`);
:1469    const at = lines.findIndex(line => line.startsWith("| U1-MEDIUM-CONFIRMED-R514-R515-R668-PROVENANCE-BINDING-DEPTH-FORMS-UNPINNED:"));
:1470    const end = lines.findIndex((line, index) => at !== -1 && index > at && line.startsWith("| U2-LOW-CONFIRMED-R514-R515-R668-PROVENANCE-VARIABLE-DECLARATION-FORMS-UNPINNED:"));
```

So at the pin 3 of the 13 typed-token test files parse a judged set from notes on a seat's token: the edc census pins whole tokens as line prefixes and holds the ids parsed off the `U1` line `toEqual` its plant keys; the cac census pins whole tokens as `startsWith` prefixes and throws when the block is absent; this census anchors on the severity+grade words alone and regex-parses the members. The other 10 typed-token test files were not read end to end (bound stated in the last section).

## Finding 6 — realized gate cost on the carrier in-window: three refusals each ran the census at 2,592..2,688 generated cases with replaced-blob legs, then the cut passed and landed — **CONFIRMED** as recorded

The three `gate-refused` rows, all bead `wb-tz2.24`, all `gateSeconds` 0 (the runs below are PREP-step legs, not complete gates), quoted from the rows around each `Result:` fragment:

```
M:55480 2026-11-04T11:51:09Z refusal #3 on cut #3, prepSeconds 2738
  "... with test/helpers/hyperunix-custody-readers.ts replaced by the cut #2 blob from 2383094255 (sha256_16 2222e7655f6e9c2c). Result: 4 failed | 2588 passed (2592)"
  (the unreplaced legs on the same row read "Result: 0 failed | 2592 passed (2592)")
M:56345 2026-11-04T17:49:47Z refusal #4 on cut #4, prepSeconds 2066
  "... replaced by the cut #3 blob from 4f4c6093 (sha256_16 c7e283b773407a15). Result: 4 failed | 2633 passed (2637)"
M:57310 2026-11-05T00:32:28Z refusal #5 on cut #5, prepSeconds 1944
  "... replaced by the cut #4 blob from e5629417 (sha256_16 412326db9d6a4324). Result: 4 failed | 2684 passed (2688)"
  and on the same row: "G-a2, the delivery's exact RED-1 form: the same cut #4 helper, with .beads/issues.jsonl replaced by the 641cc041 blob (the seat's trunk at RED-1). Result: 6 failed | 2682 passed (2688)"
```

The census file declares 59 `it(` lines at the pin; the 2,592..2,688 totals are its generated cases, growing cut to cut. `prepSeconds` over the three refusals sums to 6,748 s (1.9 seat-hours) — the carrier's three in-window refusals, not the window's 62-row refusal total. The pass and landing chain: M:57960 (`gate-pass`, 05:34:34Z, `"branch":"machine/flywheel/wb-tz2.24","commit":"d961e138f4984dd5c3e785541483bb25f377b410"`), M:58006/M:58007 (`landing-gate`/`landable`, 05:57:24Z), then Finding 1's fold.

## Evidence

The window pass (`python3 -I`, read-only; printed lines quoted verbatim):

```
ledger lines at read: 58383
window rows: 3352 first (54923, '2026-11-04T07:54:05Z') last (58274, '2026-11-05T07:51:30Z')
gate-refused in window: 62
needsRuling true: 48
typed severity: {'MEDIUM': 28, 'LOW': 68, 'HIGH': 6} typed grade: {'CONFIRMED': 101, 'PLAUSIBLE': 1} total typed: 102
whole-ledger non-CONFIRMED typed tokens: 11
  M:35156 2026-10-29T21:46:09Z U3-LOW-PLAUSIBLE-RECORD-HONESTY-R514-R515-SENTENCES-CRLF-PAIR-UNPINNED
  M:35832 2026-10-30T02:03:44Z U4-LOW-UNDETERMINED-NOTE-CONTACT-COUNT
  M:37350 2026-10-30T11:22:06Z U3-LOW-PLAUSIBLE-RECORD-HONESTY-R514-R515-CLOSED-SET-COMPLEMENTS-UNPINNED
  M:40593 2026-10-31T08:59:58Z U3-LOW-PLAUSIBLE-R514-R515-R668-R739-RB139-RULE16-LEG2-DEFAULT-IMPORT-BESIDE-NAMED-OR-NAME
  M:45234 2026-11-01T16:47:40Z U4-LOW-PLAUSIBLE-RECORD-HONESTY-R514-R515-LAYOUT-GENERIC-LEADS-WIDER-THAN-THEIR-EXAMPLES
  M:45560 2026-11-01T19:43:08Z U4-LOW-PLAUSIBLE-R514-R515-R-B206-HM2-FAMILY-TOP-LEVEL-QUOTE-THIRD-BLOCK-CHILD-UNPINNED-GP
  M:46323 2026-11-02T02:10:23Z U3-LOW-PLAUSIBLE-WORDS-LOWER-TO-UPPER-BREAK-UNPINNED
  M:48678 2026-11-02T16:09:59Z U2-LOW-PLAUSIBLE-RECORD-HONESTY-R514-R515-TIER-OPTIONS-EVERY-COMBINATION-WIDER-THAN-PINS
  M:48735 2026-11-02T16:33:29Z U2-LOW-PLAUSIBLE-R514-R515-R668-TAGGED-TEMPLATE-ARGUMENTS-SRC-FUNCTION-TAG-FORM-ARROW-AND-
  M:50189 2026-11-03T03:02:08Z U3-LOW-PLAUSIBLE-R514-R515-R668-RULE-16-LEG-2-CUT-3-NARROWED-WORDS-READINGS-7-L061-L062-SP
  M:55925 2026-11-04T14:38:53Z U2-LOW-PLAUSIBLE-R668-DELIVERED-CONTRADICTION-RULE16-LEG2-R-TYPE-TEMPLATE-WORDS-FALSE-AS-W
hyperunix-custody rows in window: 26
  by kind: Counter({'delivered': 5, 'gate-refused': 4, 'green': 4, 'red': 3, 'collect-ready': 3, 'gate-pass': 2, 'landing-gate': 1, 'landable': 1, 'ruling-bound': 1, 'fold-done': 1, 'blocked': 1})
  by bead: Counter({'wb-tz2.24': 20, 'wb-pyel.5': 2, 'wb-ldqu': 1, 'wb-zdwo': 1, 'wb-9h7s': 1, 'wb-tz2.20': 1})
```

Rig reads: `git fetch -q origin` rc 0; `git rev-parse origin/workbench/implementation-program` = `094bf2a14c...` at draft time and `4ab3af53b7...` at the fix-time re-read (metadata block); the Finding 2 parser census is `grep -n -E '^function '` plus the grade-literal grep quoted there, both over `git show d7988bc0a4:<census path>`; the Finding 5 sibling reads are `git show <sha>:<path> | sed -n` at `d7988bc0a4` and `5779ecaf11` with `git log --first-parent --diff-filter=A` for the landing commits; `git log -1 --format='%H %cI %s' d7988bc0a4...` = the pin line in the metadata block; `git diff --stat d7988bc0a4 094bf2a14c --` over the census and helper prints nothing; `git show --stat --format='%h %cI %s' 094bf2a14c | grep issues` = `.beads/issues.jsonl | 33 +++++++++++++++++----------------`. Census text reads: `git show d7988bc0a4:test/workbench-hyperunix-custody-readers-census.test.ts` piped to `wc -l` (6758), `sed -n`, and `grep -c` for the counts in Findings 2-3. The export-record stats: `git show d7988bc0a4:.beads/issues.jsonl | grep -F '"id":"wb-tz2.24"'` piped to a `python3 -I` field reader (status, `len(notes)`, two `str.count` calls). The anchor-uniqueness check and the four-sha instrument rows are quoted in Finding 5 with their commands. Machine reads are listed in the metadata block; the registry read is quoted in Finding 1.

## Re-check verdicts on the corroborated file

| Claim in the corroborated file | Verdict at `d7988bc0a4` |
|---|---|
| Finding 1: 83 of 475 grew to 141 of 545; the same 141 under the tighter bound; stable at three read shas | **STILL-TRUE** and larger: 175 of 585 (29.9%), with its published pairs reproduced exactly at both earlier shas; the tighter bound not re-run (last section) |
| Finding 2: 59 of 507 top-level test files name the installed-tree directory, 31 touch or judge it | **UNDETERMINED** this cycle — not re-run; artifact: the same greps at `d7988bc0a4` |
| Finding 3: the landing-810 census reads the installed tree at test time, 1 of 11 window census files | **UNDETERMINED** — that census was not re-read this cycle |
| Finding 4: no contributor doc states that a landed census may read the installed tree or the export at test time | **UNDETERMINED** as stated (its needles not re-run); the adjacent absence measured here — the token grammar — is Finding 4 of this file, and machine-side the landing registry now types reads per census (idx 520, Finding 1), which is custody, not a contributor doc |
| Finding 5: a re-vendor or a lock bump moves what a landed census reads (PLAUSIBLE) | **UNDETERMINED** — not exercised; this file adds the sibling mechanism (the note text a census parses) as its own PLAUSIBLE in Finding 4 |
| Finding 6: realized cost none in its window; 41 of 41 fold-done sweeps read `unflagged_red=none` | **UNDETERMINED** this cycle — the window's fold sweeps were not censused here; the landing-969 remainder (M:58147) is registry-duty work, not an unflagged red |

## Recommendations, additive to the corroborated file's list

1. **Anchor the parsers on the token's structure, not its grades.** `carrierMembers()` returns `[]` unless the carrier's `U1:` line spells both `MEDIUM` and `CONFIRMED` (`:826`); the seats write three severities (68/28/6 in this window alone) and, 11 times in the ledger so far, non-CONFIRMED grades. An anchor of the shape `"\nU1: U"` plus `/^U\d+-[A-Z]+-[A-Z]+-/` — the structural prefix the 2026-11-04 file measured on 56 of 56 refusal rows of its window — survives a re-grade; the severity+grade literal does not. Not a one-line change: 16 sites in this census alone (the 7 string anchors `:685`, `:687`, `:703`, `:736`, `:799`, `:826`, `:845`, the 3 parser regexes `:869`, `:896`, `:928` and the 6 filters `:6329-6349`, Finding 2), plus the sibling sites in the [cac authorization-input census] (`:1458`, `:1469`, `:1470`) and the [edc demand-channel reader census] (`:1453-1454`) — the wildcarding that 5 of the 6 filters already apply to severity, applied to the grade word everywhere.
2. **Pin the parsed members in a roster fixture and demote the live parse to a cross-check.** The registry row for this census reads `roster: null` (Finding 1) while sibling reader censuses ship roster fixtures (2 of the 15 typed-token files under `test/` are exactly that). The pinned half already exists (`CARRIER_SURVIVORS_1`); deriving the judged set from the fixture and asserting that the notes still contain each pinned row as a substring — the shape `:5887` already uses for requirement rows — keeps the record-honesty check while removing the regex coupling to 401,010 characters of prose.
3. **Write the token grammar down where tests can cite it.** 0 of 5 rig doc paths, 0 of 3 machine seat-files and 0 lines of the machine's generations, scripts and standards spell the `U{n}-{severity}-{grade}-` form (Finding 4; the F-bullet form is spelled at `generations/g10-gate.js:141`). One contributor-doc paragraph naming the form would give the 3 parsing censuses and the 12 other typed-token files under `test/` (10 tests + 2 fixtures) a citable source; the machine-side copy of that paragraph is the orchestrator's duty (mine), not this repository's.

## Positives worth protecting

- **The empty parse fails closed.** `:827` returns `[]` and `:6383-6404` holds the parse `toStrictEqual` to a non-empty pinned roster, so a vanished anchor is a red, not a silently empty judged set. A refactor that filtered empty parses out of the assertion would convert custody loss into green.
- **The census anchors the gate's own verdict, so a later cut cannot drop a refused member silently.** The replaced-helper legs show that loop working three times on one bead inside 24 h: each refusal row re-ran the census with the prior cut's helper blob and redded it (`4 failed` on each leg, Finding 6) — the record-honesty convention the 2026-10-26 positive praised, now exercised by a landed census rather than only by the gate.
- **Requirement rows are quoted verbatim and asserted as substrings of the live record** (`:5887` and its four siblings): the bead's acceptance text cannot drift from what the test says it says without a red, and the 22 typed-token rows extend that holding to the seats' own verdict words.
- **The read surface is registry-typed.** The landing's rc-8 remainder filed the census as READER-NAMED with its three reads listed by path (idx 520, Finding 1) — custody of the custodian, queryable without reading the test.
- **The carrier landed without an owner hold.** Three refusals, then `gate-pass` M:57960 and the landing-969 fold inside the same window, with `gateSeconds` 0 on all three refusal rows: the refusal fast path spent prep legs, not complete gates.

## What I did not establish

- The forward red (Finding 4's PLAUSIBLE): no run of the landed census against a record whose carrier `U1:` line is re-spelled; the settling artifact is named there.
- "Exactly 1" is scoped to the fixed string `U1: U1-MEDIUM-CONFIRMED-`: the `-F` grep cannot see template-string anchors (this census's own `:799` and `:845` are invisible to it) or other spellings, which is how the two sibling parses in Finding 5 were missed by the first draft and found on re-read. The 10 typed-token test files not read here (13 minus the three in Finding 5) were not read end to end for differently-anchored parses; the wider instrument `git grep -c -E 'MEDIUM-CONFIRMED-' d7988bc0a4 -- test/` reaches 12 of the 15 typed-token files (26 lines in this census; the 3 it misses carry typed tokens in other severity+grade spellings), and it still cannot tell a parse anchor from a pinned data row without reading the file.
- The 18-function / 16-line parser census (Finding 2) is a grep census: `^function ` heads whose bodies read `exportRecord(...).notes` or take a block, plus the grade-literal grep minus `key:`/`text:` rows — and its first pass counted 15, missing `childVerdictBlock2`, `childVerdictBlock3` and `foldBlock` until a `notes.indexOf` grep caught them. An arrow-function parser, or an anchor split across lines, would still escape it; I read the 18 function heads and the 16 lines, not all 6,758 lines.
- The corroborated file's two bounding checks (non-comment line plus a file-read call) were not re-run on the 175; the count is the name-grep instrument, whose 83/475 and 141/545 rows reproduce its published values exactly.
- The dispatch packet's refusal lead (56 rows / 48 `needsRuling`) against this read's 62 / 48: the packet marks its inline refusal numbers as the prior run's leads, and the prior window's file carries exactly 56/48, so 62 is this window's count under the Date line's predicate; beyond kind, bead, `needsRuling` and `unmet`, the 62 rows were not read — only the carrier's three are quoted.
- Whether the gate's replaced-blob legs run the whole census file or a selected subset: the quoted legs name the census file with its case totals (2,592..2,688); the rows were read as fragments around each `Result:`, not parsed whole.
- Whether the owner's doc-walking censuses read this file green: no test ran in this lane; the guarded tokens are in bracketed form in prose per the 2026-11-02/11-03/11-04 precedent, with the literals confined to fenced blocks and inline code spans (Scope line), and the owner's pre-landing run is the instrument.
