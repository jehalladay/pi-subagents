# CORROBORATION, n=4: a landed census that reads the bead export inside the gate reds trunk on a later note — the skip-cache census makes any note naming a family a mention row, quotes included, so trunk red twice in 24 h and 5 held gates burned 16,648 gate-seconds

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, job id `a8ddce77` — the seat's `~/.claude/jobs/<id>` directory named in the ledger's `brief-file` fields) — the same seat as the corroborated file, a later cycle (five days and landings 479..772 later: its pin `46ab74f5cc67` is the landing-478 hop, `ledger: close wb-3l7x (landing 478, merge 9415907f)`, and its own hits were landings 412 and 467); the machine this seat drives wrote every ledger and outbox row quoted below, and this agent re-read them read-only.
**Date:** 2026-11-01 (filing window 2026-10-31T07:55Z..2026-11-01T07:55Z; both reds, both cures and all five holds fall inside it; every count re-derived 08:05Z-08:50Z)
**`pi-subagents` revision:** installed tool = trunk `origin/workbench/implementation-program` at `aa9ea0d8c8b1262f4800365fdaf2615df2826c3b`, the landing-772 hop (`ledger: close wb-u6bv (landing 772, merge 655cbf02)`, committer date 2026-11-01T07:53:31Z), the trunk at the window close 07:55Z: `git fetch -q origin` rc 0, then `git merge-base --is-ancestor aa9ea0d8c8b1 origin/workbench/implementation-program` rc 0. The fetched tip at the read was `24e81e7ea2a6` (landings 773..774, 08:02:52Z); the census `test/workbench-tsx-skip-cache-deferral-census.test.ts` is blob `43bdf6d1400e9b326a09090476f8a66f869247f8` at both, and every `:line` below is read from that blob (`git show aa9ea0d8c8b1:<path>`, `git show 43bdf6d1`). The gates observed the behaviour at gateBase `f63d38962c19` (census blob `089a02d38c10`, export blob `3f7c1f5d3dda`) and the landing-755 PREP at `727ca9677d93` (census `43bdf6d1`, export `65e8daf79a11`). The rig clone's checked-out HEAD is `188ae59016`, 2,130 commits behind the ref (`git rev-list --count HEAD..origin/workbench/implementation-program`), dirty 13 (`git status --porcelain | wc -l`; live gate and land worktrees share its object store), never checked out or pushed from here; delivery on `machine/flywheel/feedback-2026-11-01` from a detached worktree. The corroborated file was at `46ab74f5cc67`.
**Machine evidence revision:** `machines/flywheel/ledger/metrics.jsonl` 44,098 lines at the read (M:n = 1-based line n), `machines/flywheel/ledger/outbox.jsonl` 1,643 lines (O:n = line n), `machines/flywheel/state/standing-rules.md` at machine commit `a8dcbaa1` (2026-11-01T00:33:26Z), all read-only; Library field reports at Library commit `abe3e47978e1` (on `origin/main`, committer date 2026-11-01T03:25:46Z, `merge-base --is-ancestor` rc 0 — not the seat's Library clone's checked-out HEAD; both reports re-read from the commit itself via `git show abe3e47978e1:<path>`): `bead_machines/raw/flywheel-g10.21-design-20261101T0239Z/critic.md` and `bead_machines/raw/flywheel-ops-window-20261101T0323Z/NOTES.md`.
**Method:** read-only re-derivation plus one file-alone probe. `git show`, `git ls-tree`, `git diff`, `git log` and `git grep` at the pin and at the five revisions named; `sed -n` and `python3 -I json` over the ledger and the outbox (every sum re-derived from the rows' own `gateSeconds` and `utc` fields); `python3 -I json` over the `.beads/issues.jsonl` exports at `f63d3896` (1,097 rows), `727ca967` (1,102) and `7f28422` (1,104) with a Python `re` port of the census's `SKIP_SOURCE`, `ANCHOR_SOURCE`, `ADR_SOURCE` and `DEFERRAL_SOURCE`; `cat` of the two Library reports and of the standing rules. Probe: a detached worktree of this clone at the pin (`/tmp/fw-fb-c1-probe-a8ddce77-20261101`, `node_modules` linked from the rig clone, removed afterwards) ran the census file-alone as a control, then with this draft present, then with a planted file (Postscript). No `bd` command, no gate run, no write outside `new-feedback/` and `/tmp`.
**Scope:** feedback about pi-subagents' gate surface — the landed census `test/workbench-tsx-skip-cache-deferral-census.test.ts` (bead wb-csbt.1) reading the tracked store export `.beads/issues.jsonl` inside the gate: the mention-row rule of its acceptance (c) and the absence of a quotation carve-out there. Not about the posture it guards (ADR-0032 keeps both families deferred, and this file claims no TSX surface), not about the five held cuts (each innocent by the BIND rows' byte-identity checks), and not about the machine's rulings, which live in the machine ledger.
**Corroborates:** [`2026-10-27-the-wb-tz4r-8-census-reads-the-bead-export-in-the-gate-so-one-unpinned-bead-note-redded-landing-467-at-32-min-vs-13-5-clean-n-2-with-412-and-83-of-475-trunk-tests-read-it.md`](2026-10-27-the-wb-tz4r-8-census-reads-the-bead-export-in-the-gate-so-one-unpinned-bead-note-redded-landing-467-at-32-min-vs-13-5-clean-n-2-with-412-and-83-of-475-trunk-tests-read-it.md) — verdict **STILL-TRUE** at `aa9ea0d8c8b1` for the class it states (a landed census reads the store export inside the gate, so a later actor's note is a gate input); independent hits 3 and 4 (landings 754 and 755), on a second census with a different admission rule. That file sits on `origin/machine/flywheel/feedback-2026-10-27` (commit `63a2e77ae667d1292ef9d68d30449cd04143152a`, 2026-10-27T09:58:55Z) and not on trunk at the pin (`git merge-base --is-ancestor origin/machine/flywheel/feedback-2026-10-27 origin/workbench/implementation-program` rc 1); the working-tree copy this link resolves to is byte-identical to that commit's blob (`git show <ref>:<path> | cmp - <path>` silent).
**Prior art:** at the fetched ref, `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 18 entries (README + 17 files, latest 2026-10-25); the filename grep `census|mention|contagion|quot|skip|trunk-red|gatebase|held|note` hits the five docs09 and census-timing files only; body greps `git grep -il -E '<kw>' origin/workbench/implementation-program -- new-feedback/` read 0 hits for `contagion`, `mention row`, `trunk-red|trunk red`, `rule 26`, `wb-021.7` and `R-B209|R-B225`; `skip-cache-deferral` hits one file, `2026-10-25-the-7e9a1eb-detached-timing-cure-leaves-the-census-tier-on-the-vitest-5000-ms-default-...md` (:61 and :130, a timeout-marker table naming the file), and `GATEBASE` hits one, `2026-10-25-positive-the-detached-timing-guard-...md`, through its lowercase `gateBase` field (:12, :107). Across the 14 unlanded `origin/machine/flywheel/feedback-*` branches, 17 files sit beyond trunk (`git ls-tree` per branch, union); the corroborated file is the class parent, and the 2026-10-27 CORROBORATION on pass-held wb-c61s (two census cuts conflicting at landing) is adjacent and not re-argued here.

## Why a second file rather than an edit

The corroborated file is a commit on a branch the program owner lands, and this directory is append-only; an edit would rewrite that commit, fold two observations five days apart into one, and destroy the independence that lets n=4 mean anything. The first two hits were measured on the wb-tz4r.8 census with a marker-plus-pin admission rule, these two on the wb-csbt.1 census with a wording-plus-edge rule, and the shared root — the gate reads the export as the previous landing closed it — shows only when the two files stand side by side.

## What this adds

- **A new mechanism:** on a second store-reading census, the quotation of another row's family phrase inside a diagnosis note is itself a mention. The census carries a citation carve-out for row B program names (R-CITATION, `:65-66`, `:116-118`) and none for row C mentions; its mention test (`mentionRows`, `:829-830`) is a family-regex match over every text field of an anchored row, notes and comments included (`MENTION_FIELDS`, `:234`), with no sentence, marker or quotation logic. So the BIND note that diagnosed the landing-754 red became the landing-755 red (R-B225, M:42869, calls it "a meta-contagion: diagnosing the census in a bead note trips the census"), the KNOWN re-measure that cured 754 was stale at its own hop, and the class cost five GATEBASE-TRUNK-RED could-not-judge holds inside this 24 h window: 16,648 gate-seconds, plus 6,345 lock-held seconds after the could-not-judge emission (each hold row's `utc` to its `gate-lock-released` row's `utc`; the holders' own claim stamps in the release rows M:42822-M:43020 put the full lock holds higher, e.g. wb-tz2.18 21:09:15Z..00:08:54Z = 10,779 s). The arc ended with a store-side echo sentence, a related edge, an export hop and a standing rule, the census bytes unchanged.

## Already filed — this corroborates, it does not restate

| Axis | Where |
|---|---|
| a landed census reads `.beads/issues.jsonl` inside the gate's `test` step, and every landing's hop rewrites that file, so any actor's note written between hops is a gate input (Findings 1-2 there) | the corroborated file |
| realized hits 1 and 2: landings 412 and 467, each cured by an export-only ledger hop (Findings 3-4 there) | the corroborated file |
| the admitting form lives only in the census source and the cured export rows, and `AGENTS.md:191/:248` call the export passive (Finding 7 there) | the corroborated file |
| fix #1 there (let the finding name its own cure) and fix #3 (foreign-row findings as a named residual, an owner decision) — endorsed and re-weighted below | the corroborated file, fixes #1 and #3 |
| two queued census cuts of different beads conflicting at landing (this window: wb-0x41 vs wb-0lf.8 at landing 757, R-B227 M:43027) | `2026-10-27-CORROBORATION-pass-held-wb-c61s-3-way-conflicted-with-landing-469-s-cut-of-the-same-census-and-roster-and-was-respun-3-of-21-overlapping-queued-pairs-conflict-tip-to-tip.md`, same class, not re-argued |

## Finding 1 — a mention row is any anchored export row whose text, notes and comments included, matches a family regex; the only citation carve-out belongs to row B — **CONFIRMED**

The header states the rule and its consequence in its own words at blob `43bdf6d1`:

```
$ git show 43bdf6d1 | sed -n '70,73p'
 *   A MENTION ROW is an anchored row other than the gate that names a family in any text field (notes and comment texts
 *   included). C1: a mention row carries a sentence naming ADR-0032 beside a DEFERRAL word (defer and its inflections, gated);
 *   C2: a mention row holds a related edge (RELATED_TYPES) to the gate and no blocks edge either way, and no row of the store
 *   holds a blocks edge to the gate.
$ git show 43bdf6d1 | sed -n '129,136p'
 * ledger hop that drops the bead's delivery line or its family edge reds A1. C reads
 * every text field of every anchored row, notes and comments included, and KNOWN pins its exceptions exactly, so the store's
 * evolution moves the reading in either direction at the ledger hop that exports a change: a note or comment added later to
 * an anchored row can admit a known row (an ADR-0032 sentence with a deferral word takes it out of C1, as wb-csbt.2's
 * delivery note did at hop edccd80) or add a finding (a note naming a family on an anchored row, or a family and the TSX
 * side on any row, makes that row a mention row: C1 reads it unless the row carries the wording, C2 until it holds a related
 * edge to the gate); a bead filed later whose row names a family and the TSX side carries the ADR-0032 wording and a related
 * edge to the gate, or C1 and C2 red at the ledger hop that exports it. Either way that hop re-measures KNOWN in the same
```

The code does what the header says, and nothing more. `MENTION_FIELDS` adds `notes` and `comments` to the four judged fields (`:233-234`); `anchoredRow` tests the anchor over those six fields (`:791`); `mentionRows` keeps every anchored row other than the gate in which `familiesIn` (`:578-582`, one `RegExp(source, "i").test(value)` per family) matches any of the six fields (`:829-830`); `carriesWording` then looks for one sentence carrying `ADR` beside `DEFERRAL` in any field (`:832`), and `edgeFindings` for a related edge to the gate (`:846`):

```
$ git show 43bdf6d1 | sed -n '233,234p;791p;828,832p;846p'
const JUDGED_FIELDS: readonly string[] = ["title", "description", "design", "acceptance_criteria"];
const MENTION_FIELDS: readonly string[] = [...JUDGED_FIELDS, "notes", "comments"];
const anchoredRow = (row: BeadRecord): boolean => MENTION_FIELDS.some(field => ANCHOR.test(fieldOf(row, field)));
/** An anchored row other than the gate that names a family in any text field. */
const mentionRows = (rows: readonly BeadRecord[], gate: string): BeadRecord[] =>
  rows.filter(row => row.id !== gate && anchoredRow(row) && MENTION_FIELDS.some(field => familiesIn(fieldOf(row, field)).length > 0));
/** C1: does some sentence of some text field name ADR-0032 beside a deferral word? */
const carriesWording = (row: BeadRecord): boolean => MENTION_FIELDS.some(field => sentencesOf(fieldOf(row, field), true).some(piece => ADR.test(piece.text) && DEFERRAL.test(piece.text)));
    if (!row.edges.some(edge => edge.dependsOn === gate && RELATED_TYPES.includes(edge.type))) found.push(`${row.id} no-related-edge`);
```

Armed control for the negative ("no quotation carve-out for mention rows"): `git show 43bdf6d1 | grep -n -i -E 'quot|citation|verbatim'` prints 32 lines, and every one is elsewhere — header prose at `:7`, `:16`, `:65-66`, `:82`, `:92`, `:95`, `:97-98`, `:116-117` and `:138`; the R-CITATION residual id and its quiet rows at `:272`, `:298` and `:615` (row B's rule that a program name attached to an identifier or a path is a citation, not a summary); the roster's `quote` and `citation` fields at `:405`, `:413-414`, `:463`, `:495-496`; the B1/B2 controls at `:1234`, `:1249`, `:1261`; and D1 plus the outside anchor reading the filing's quote at `:1322-1331` and `:1432-1435`. None sits in the C readers (`:826-850`). The marker admission of `:56-60` (`hasMarker`, `:584`; `grep -c MARKER` over the blob prints 9) belongs to the sentence judgement of rows A and B; `mentionRows` and `carriesWording` never call it. A Python `re` port of `SKIP_SOURCE` (`:183`) over the quoted two-word phrase and over two controls:

```
$ python3 -I -c '...'   # the SKIP_SOURCE port from :183; each label carries a marker word so that this file stays admitted
port over 'skips the subtree' (deferred family, not a claim) -> 'skips the subtree'
port over 'the census reds' (deferred family, not a claim) -> None
port over 'skip-cache census' (deferred family, not a claim) -> None
```

## Finding 2 — realized twice in the window on this census: landing 754 through a gate-respin filing's note (R-B209) and landing 755 through the BIND note that diagnosed 754 and quoted that filing (R-B225); the 754 cure was stale at its own hop — **CONFIRMED**

Landing 754 (wb-yswd), ruling R-B209, M:42115, 2026-10-31T18:56:07Z, quoted from the reproduction through the CURE clause (the VEHICLE and LANDING ORDER clauses that follow are elided):

> BARE-TRUNK REPRODUCTION: the suite reds identically on the bare trunk f63d3896 with NO cut (3 failed | 6 passed (9), probe worktree /tmp/fw-probe-754) - the cut is INNOCENT (its two touched files are disjoint from the red file; three-way empty). ROOT: the R794/R796 landed-census class - wb-km7q.11's gate-respin store rows joined the census's mention scan (measured: C1 gains 'wb-km7q.11 no-deferral-wording', C2 gains 'wb-km7q.11 no-related-edge') while KNOWN still pins the landing-304 measure; the census's own header says a further finding reds and the disposition 'is the owner's ruling, not this census's'. CURE (per the landing-328 precedent 461d6859, the wb-csbt.1 KNOWN re-measure shape): owner cut ce9a216f203ddbe26d72113a4d10c4bfeebc19a6 on branch owner/wb-csbt.1-known-remeasure-v1 (two files: the census's KNOWN arrays + header KNOWN FINDINGS sentences, and the out-of-file roster's known + C1/C2 witness findings - reported, never admitted), suite 9 passed (9) on the edited tree, era grep clean both files.

The cure cut relative to the red trunk, and the census change it carried:

```
$ git diff --stat f63d3896 ce9a216f
 test/fixtures/tsx-skip-cache-deferral-roster.json     |  4 ++++
 test/workbench-tsx-skip-cache-deferral-census.test.ts | 14 ++++++++------
 2 files changed, 12 insertions(+), 6 deletions(-)
$ git diff --stat 089a02d3 43bdf6d1
 089a02d3 => 43bdf6d1 | 14 ++++++++------
 1 file changed, 8 insertions(+), 6 deletions(-)
$ git diff 089a02d3 43bdf6d1 | grep '^[-+]  C[12]:'
-  C1: ["wb-km7q.6 no-deferral-wording"],
-  C2: ["wb-csbt.2 no-related-edge", "wb-km7q.6 no-related-edge"],
+  C1: ["wb-km7q.11 no-deferral-wording", "wb-km7q.6 no-deferral-wording"],
+  C2: ["wb-csbt.2 no-related-edge", "wb-km7q.11 no-related-edge", "wb-km7q.6 no-related-edge"],
```

The wb-km7q.11 row that joined the scan matched `SKIP_SOURCE` in its `notes` field at the `f63d3896` export (port: 2 matches, both the same two-word verb phrase as below; a deferred family, not a claim), so hit 3 came through a note too.

Landing 755 (the k=3 batch B755-757), ruling R-B225, M:42869, quoted with two elisions marked in brackets (the elided words are the needle itself; the probe output below carries them inside admitted sentences):

> The ONE new mention row is wb-021.7: its 175 KB note (updated 18:33Z, a seat's BIND diagnosis of the f63d389 trunk red) QUOTES wb-km7q.11's skip-family phrase ([the quoted phrase, elided here]) while explaining why wb-km7q.11 became a mention row - SKIP_SOURCE (:183) matches [the two-word verb phrase, elided here], so the quoting bead became a mention row itself (a meta-contagion: diagnosing the census in a bead note trips the census). Landing 754's hop 727ca967 exported that note; the 754 cure (KNOWN re-measured at f63d389's export) was already stale at its own hop.

and its readings: "C1 reads [wb-021.7 no-deferral-wording, wb-km7q.11, wb-km7q.6] vs KNOWN [wb-km7q.11, wb-km7q.6]; C2 reads [wb-021.7 no-related-edge, wb-csbt.2, wb-km7q.11, wb-km7q.6] vs KNOWN [wb-csbt.2, wb-km7q.11, wb-km7q.6]; records fails as the consequent." The row itself, read from the two exports with the port (labels carry a marker word so that this file stays admitted; offsets are character offsets):

```
$ for rev in 727ca967 7f28422; do git show $rev:.beads/issues.jsonl | python3 -I /tmp/fw-fb-c1-rowprobe.py $rev; done
727ca967 wb-021.7 notes=175389 bytes updated_at=2026-10-31T18:33:37Z
727ca967 edges=[('wb-021.5', 'blocks'), ('wb-021', 'parent-child')]
727ca967 SKIP_SOURCE port match, a deferred family phrase (not a claim): 'skips the subtree' at offset 168044 of 175383
727ca967 anchor matches=13 distinct=['reactivefiber', 'rf', 'tsx']
727ca967 sentences with ADR-0032 beside a deferral word (C1 wording): 0
7f28422 wb-021.7 notes=175772 bytes updated_at=2026-11-01T00:31:04Z
7f28422 edges=[('wb-csbt.1', 'related'), ('wb-021.5', 'blocks'), ('wb-021', 'parent-child')]
7f28422 SKIP_SOURCE port match, a deferred family phrase (not a claim): 'skips the subtree' at offset 168044 of 175766
7f28422 SKIP_SOURCE port match, a deferred family phrase (not a claim): 'component-subtree skipping' at offset 175477 of 175766
7f28422 anchor matches=17 distinct=['adr-0032', 'reactivefiber', 'rf', 'tsx']
7f28422 sentences with ADR-0032 beside a deferral word (C1 wording): 1
7f28422   'census echo discipline): ADR-0032 keeps component-subtree skipping and assembly/serialization caching DEFERRED (gated: ADR-0032 update via packet TSX-PF-03);'
```

Stale at its own hop, by the revisions' own stamps: the wb-021.7 note was updated 2026-10-31T18:33:37Z; the cure cut `ce9a216f` was committed 18:55:23Z against the export the red trunk carried (`git ls-tree ce9a216f -- .beads/issues.jsonl` prints blob `3f7c1f5d`, the same blob as at `f63d3896`), so its KNOWN re-measure never saw the note; the landing-754 hop `727ca967` (2026-11-01T00:03:41Z) exported it (blob `65e8daf7`), and the next PREP read the three reds R-B225 lists (`:1452` C1, `:1452` C2, `:1462` records at the cured blob; `:1450`/`:1450`/`:1460` at the red one).

## Finding 3 — 5 of the 8 all-time GATEBASE-TRUNK-RED could-not-judge holds fall in this window, 16,648 of 24,420 gate-seconds, and 2 of the 5 were emitted after the cure was already on trunk — **CONFIRMED**

Rows with `kind` `gate-could-not-judge` and `reason` `GATEBASE-TRUNK-RED` in the 1,643-line outbox (22 rows mention the token; the other 14 are `gate-refused` and `proposed-closure` rows citing the class), each paired with its `gate-lock-released` row:

| outbox row | bead | emitted (`utc`) | `gateBase` | `liveTrunkAtEmit` | `gateSeconds` | released | held after emit |
|---|---|---|---|---|---|---|---|
| O:909 | wb-hzwr | 2026-10-25T02:55:19Z | fc8ba8f7 | 24e0d5b7 | 2921 | before this window | — |
| O:1409 | wb-thq3 | 2026-10-30T10:31:33Z | c85be84c | f6c428a0 | 2428 | before this window | — |
| O:1412 | wb-5omz | 2026-10-30T10:43:37Z | c85be84c | 750a4c2a | 2423 | before this window | — |
| O:1591 | wb-tz2.18 | 2026-10-31T22:47:57Z | f63d3896 | f63d3896 | 3314 | M:42822, 2026-11-01T00:08:54Z | 4857 s |
| O:1597 | wb-0x41 | 2026-10-31T23:59:11Z | f63d3896 | f63d3896 | 4296 | M:42823, 00:08:54Z | 583 s |
| O:1598 | wb-ia9d | 2026-11-01T00:00:47Z | f63d3896 | f63d3896 | 3944 | M:42824, 00:08:54Z | 487 s |
| O:1600 | wb-psx0 | 2026-11-01T00:20:02Z | f63d3896 | 727ca967, `cureOnTrunk: true` | 2441 | M:42848, 00:22:09Z | 127 s |
| O:1603 | wb-2mv7 | 2026-11-01T01:12:01Z | f63d3896 | 644e70d4, `cureOnTrunk: true` | 2653 | M:43020, 01:16:52Z | 291 s |

In-window sum 3314 + 4296 + 3944 + 2441 + 2653 = 16,648 gate-seconds (5 complete gates that could not judge); all-time 24,420 s over 8 holds; held after emit 4857 + 583 + 487 + 127 + 291 = 6,345 s, each from the hold row's `utc` to its `gate-lock-released` row's `utc` — the post-emission hold only, an under-count of the full lock holds, whose claim stamps sit in the release rows (M:42822: wb-tz2.18's holder from 21:09:15Z to the 00:08:54Z release, 10,779 s). The three earlier holds were other censuses (O:909 `test/workbench-ri-decision-seed-claim-census.test.ts`, the corroborated file's census; O:1409 and O:1412 `test/workbench-rf-federation-parity-premise.test.ts:584`), so the class spans at least three store-reading tests. O:1591 itself states the innocence check every hold repeats, verbatim: "The red census blob 089a02d3 is byte-identical at probe, trunk f63d3896, cut base 3b8bb881 and tip 91846ed3. The bead export it scans (.beads/issues.jsonl, blob 3f7c1f5d) is byte-identical to gateBase f63d3896. The one-file test cut changes only test/workbench-hyperunix-evidence-tier-standing.test.ts and touches neither, and that file is green (11 tests) in both runs." R-B219 (M:42572, restating it) compresses this to "are byte-identical at probe, trunk f63d3896, cut base and tip; the one-file cut touches neither and its own suite is green (11 tests, both runs)", and R-B219 clause (3) explains why the five locks were held rather than released: "a release before the cure lands would burn a gate seat on the same inherited reds". The design pack's critic re-derived the same rows (`critic.md:22-25`, Library `abe3e47978e1`):

> GATEBASE-TRUNK-RED could-not-judge holds all-time (outbox): O:909 2921 s, O:1409 2428 s, O:1412 2423 s, O:1591 3314 s, O:1597 4296 s, O:1598 3944 s, O:1600 2441 s = 7 holds, 21,767 s (the judge's figure holds); four most recent 13,995 s. NEW since the judge: M:43020 (01:16:52Z) releases an 8th hold (wb-2mv7, O:1603) under R-B219(3) — its gate STARTED on f63d3896 before the cure's fold (M:42817 00:08:04Z). Holds on gates already past PREP when the cure lands keep arriving AFTER the cure.

and `critic.md:21`, over the pack window 2026-10-30T22:22:00Z..2026-10-31T22:56:02Z: "gate-pass n=34: gateSeconds median 1715 s, sum 66,651 s; wallSeconds median 772.5 s; gateBase f63d3896 on 0/34" — no complete gate passed on the red trunk.

## Finding 4 — the second cure changed no census byte: an echo sentence, a related edge and an export hop touching `.beads/` only, then a standing rule — **CONFIRMED**

R-B225 (M:42869), the cure clauses, with two elisions marked (`[...]` drops the ruling's clauses (4) and (5); the bracketed note drops the two family names):

> CURE per the census's own header (:76-77: 'a bead filed later whose row names a family ... carries the ADR-0032 wording and a related edge to the gate, or C1 and C2 red at the ledger hop that exports it'), the R-B117/R-B119 form: (1) the conforming sentence appended to wb-021.7's note - 'ADR-0032 keeps component-subtree skipping and assembly/serialization caching DEFERRED (gated: ADR-0032 update via packet TSX-PF-03); this bead only quotes the family wording while diagnosing a census red and claims no TSX surface.' - which satisfies C1 (ADR-0032 beside a deferral word); (2) a related edge wb-021.7 -> wb-csbt.1 (the gate row: the one row whose title carries the gating clause; bd dep add wb-021.7 wb-csbt.1 --type related, the dep verb bound by THIS row) which satisfies C2; (3) a store export (bd export -o .beads/issues.jsonl, the land-chain HOP form :1045) committed on trunk as an EXPORT HOP in the R-B119 shape (ledger: refresh .beads export; touches only .beads/issues.jsonl + interactions.jsonl), pushed fast-forward after the census reads 9 passed (9) in the hop worktree; [...] NOT taken: another KNOWN re-measure owner cut (a treadmill: every later family mention would red again). PREVENTION: standing rule 26 (TSX family echo discipline) appended to state/standing-rules.md in this ruling's commit - every bead text that names [the two families, elided here], including a QUOTE of another bead's family phrase, carries the conforming sentence and a related edge to wb-csbt.1; the g10.21 design input adds a collect-time echo lint for this family beside the rule-25 lint (the trunk-red memo item).

(The ruling cites the header sentence at `:76-77`; at blob `43bdf6d1` that sentence sits at `:135-136`, quoted under Finding 1.) The hop and the constancy of the census:

```
$ git show --stat --format='%h %cI %s' 7f28422
7f28422ccf 2026-11-01T00:32:20Z ledger: refresh .beads export - R-B225 conforming ADR-0032 echo + related edge (wb-021.7) so the tsx skip/cache deferral census reads the wording and edge on trunk
 .beads/interactions.jsonl | 1 +
 .beads/issues.jsonl       | 8 +++++---
 2 files changed, 6 insertions(+), 3 deletions(-)
$ for rev in f63d3896 ce9a216f 727ca967 7f28422 644e70d4 aa9ea0d8c8b1 24e81e7ea2a6; do git ls-tree $rev -- test/workbench-tsx-skip-cache-deferral-census.test.ts .beads/issues.jsonl; done   # census blob, then export blob
f63d3896      089a02d3  3f7c1f5d
ce9a216f      43bdf6d1  3f7c1f5d
727ca967      43bdf6d1  65e8daf7
7f28422       43bdf6d1  46101b0c
644e70d4      43bdf6d1  fec54310
aa9ea0d8c8b1  43bdf6d1  997cbd4f
24e81e7ea2a6  43bdf6d1  1ecdbde2
```

The standing rule, machine side (`machines/flywheel/state/standing-rules.md:32-33`, commit `a8dcbaa1`, 2026-11-01T00:33:26Z, subject "standing rule 26: TSX skip/cache family echo discipline (R-B225 M:42869) - the conforming ADR-0032 sentence + a related edge to wb-csbt.1 on every bead text naming the families, quotes included"): its heading reads "## 26. TSX skip/cache family echo discipline (R-B225 class, 2026-11-01)"; its first sentence requires, of any bead text that names either deferred family, the conforming sentence quoted above in the same note and a related edge to wb-csbt.1 (that sentence is described here, not quoted — see the Postscript); and it spells the mechanism: "QUOTING another bead's family phrase while diagnosing counts as naming it (wb-021.7 became a mention row by quoting wb-km7q.11's note, R-B225 M:42869)." The ops-window report (`NOTES.md:7`) closes the arc: "The class recurred once more at the landing-755 PREP through a BIND note on wb-021.7 that QUOTED the skip-family phrase (meta-contagion): R-B225 (M:42869) cured it with the ADR-0032 echo sentence + a related edge + the R-B119-shape export hop 7f28422 (hop-fold M:42880) and bound STANDING RULE 26 (commit a8dcbaa1)."

## Evidence

| artifact | where | what it carries |
|---|---|---|
| census source | `test/workbench-tsx-skip-cache-deferral-census.test.ts` blob `43bdf6d1` (at `ce9a216f`, `727ca967`, `7f28422`, `644e70d4`, `aa9ea0d8c8b1`, `24e81e7ea2a6`); red blob `089a02d3` at `f63d3896` | `:70-73`, `:129-136` header; `:233-234` fields; `:578-582` `familiesIn`; `:584` `hasMarker`; `:791` anchor; `:829-830` mention rows; `:832` wording; `:846` edge; `:1266-1304` C1/C2 cases; `:1462` records |
| ledger rows | `machines/flywheel/ledger/metrics.jsonl` M:42115 (R-B209), M:42572 (R-B219), M:42869 (R-B225); releases M:42822, M:42823, M:42824, M:42848, M:43020 | rulings and release rows quoted above |
| outbox rows | `machines/flywheel/ledger/outbox.jsonl` O:909, O:1409, O:1412, O:1591, O:1597, O:1598, O:1600, O:1603 | `reason`, `gateSeconds`, `utc`, `gateBase`, `liveTrunkAtEmit`, `cureOnTrunk` |
| exports | `.beads/issues.jsonl` blobs `3f7c1f5d` (f63d3896, ce9a216f), `65e8daf7` (727ca967), `46101b0c` (7f28422) | the wb-021.7 row before and after the cure; the wb-km7q.11 row |
| commits | `f63d3896` 2026-10-31T18:07:22Z; `ce9a216f` 18:55:23Z; `727ca967` 2026-11-01T00:03:41Z; `7f28422` 00:32:20Z; `644e70d4` 00:59:13Z; `aa9ea0d8c8b1` 07:53:31Z; `24e81e7ea2a6` 08:02:52Z | `git log -1 --format='%h %cI %s'` |
| Library reports | `bead_machines/raw/flywheel-g10.21-design-20261101T0239Z/critic.md:19-25`; `bead_machines/raw/flywheel-ops-window-20261101T0323Z/NOTES.md:7` at `abe3e47978e1` | the critic's hold census; the window narrative |
| standing rule | `machines/flywheel/state/standing-rules.md:32-33` at machine commit `a8dcbaa1` | rule 26 |
| probe script | `/tmp/fw-fb-c1-rowprobe.py` (volatile; its regexes are the four sources named in Method, ported to Python `re`) | the row readings quoted under Finding 2 |

## Re-check verdicts on the corroborated file

| Claim in the corroborated file | Verdict at `aa9ea0d8c8b1` |
|---|---|
| F1 — the gate's default `test` step runs the wb-tz4r.8 census and its pin A3 asserts over every export row | **UNDETERMINED** — not re-read this cycle (artifact: that census at the pin) |
| F2 — every landing's HOP commit rewrites `.beads/issues.jsonl`, so each gate reads the store as the previous landing closed it | **STILL-TRUE** — six hops read, six distinct export blobs (`3f7c1f5d`, `65e8daf7`, `46101b0c`, `fec54310`, `997cbd4f`, `1ecdbde2`); and now a seat's BIND note, written between the 753 hop and the 754 cure, was the gate input that red 755 |
| F3 — landing 467 ran REAL RED on an untouched test, cured by one appended paragraph in a ledger hop | **UNDETERMINED** — historical rows not re-read; the same cure shape recurred here (an appended sentence, an edge, an export hop) |
| F4 — n=2: landing 412 held on the same pin two days earlier | **UNDETERMINED** — not re-read; hits 3 and 4 above raise the class count to n=4 |
| F5 — 83 of 475 trunk test files name `issues.jsonl` on a code line and carry a file-read call | **STILL-TRUE in kind, larger** — 129 of 533 `.test.ts`/`.census.ts` files under `test/` name `issues.jsonl` at the pin by a name-anywhere `git grep`, a looser instrument than the original's, so the two counts are not directly comparable |
| F6 — each of the other 7 `unpinned` censuses hard-asserts over foreign export rows (PLAUSIBLE there) | **UNDETERMINED** for those seven; and a census outside that family (KNOWN-pinned mention rows, C1 `:1274`, C2 `:1300`) hard-asserts over foreign rows the same way |
| F7 — the admitting form lives only in the census source and cured rows; the agent-facing doc calls the export passive | **STILL-TRUE** for this census — a `git grep -l` at the pin for the echo sentence's opening words, `ADR-0032 keeps component-subtree skipping` (the deferred posture, not a claim), prints `.beads/issues.jsonl` only, 0 files under `docs/` or root `*.md` (armed: `git grep -c -F "component-subtree skipping" aa9ea0d8c8b1 -- test/workbench-tsx-skip-cache-deferral-census.test.ts` prints 5; the full echo opening itself hits 0 files outside `.beads/issues.jsonl`, the census file included); `AGENTS.md:191` and `:248` still read "`.beads/issues.jsonl` is a passive export"; the form now also lives in machine standing rule 26, outside this repo |
| F8 — a docs-surface sibling at landing 401 | **UNDETERMINED** — not re-read |

## Recommendations, additive to the corroborated file's list

1. **Let the C1 and C2 reds name their cure** (the corroborated file's fix #1, re-weighted by this window's price). The assertion messages at `:1274` and `:1300` read "mention rows without an ADR-0032 sentence carrying a deferral word, exactly the measured KNOWN set" and "mention rows without a related edge to the gate or with a blocks edge, exactly the measured KNOWN set"; both PREP reds and all five holds printed only those. Appending the conforming sentence and the `bd dep add <bead> wb-csbt.1 --type related` verb to the message would let a lander cure from the reporter block. A string change.
2. **A quotation carve-out for mention detection in `notes` and `comments`.** Treat a family match that sits inside a quotation (straight or curly quotes, backticks) as a citation, with planted controls in the shape the census already uses for R-CITATION (the quoted phrase alone — not a mention row; the same words unquoted — a mention row), or blank quoted spans before `familiesIn` runs over the two free-text fields. The header rule of `:131-136` stays; only quotes stop counting, which is what the meta-contagion needs.
3. **An echo lint at collect time** — producer side (R-B225 names it for the g10.21 design), not a pi-subagents change; named so the consumer knows the producer can absorb part of the cost.
4. **Owner decision:** make foreign-row findings a named residual (the corroborated file's fix #3), or read the export at the cut's merge-base rather than the live hop. The same question as before, now with 16,648 gate-seconds of could-not-judge in one window attached.

## What worked well

- **Innocence by byte identity, in the hold's own row.** O:1591 names the red blob and the export blob in its own sentences — "The red census blob 089a02d3 is byte-identical at probe, trunk f63d3896, cut base 3b8bb881 and tip 91846ed3", "The bead export it scans (.beads/issues.jsonl, blob 3f7c1f5d) is byte-identical to gateBase f63d3896" — and states that the cut touches neither; the gate kept the entry queued (`entryHeld: true`, `lockHeld: true`) and wrote no reopen, no respin and no bead note (R-B219 clause (2)). A refactor that folds could-not-judge into a refusal would have respun five innocent cuts.
- **The census header documents the mechanism in its own words** (`:129-136`), and KNOWN pins its exceptions exactly, so a store drift reds loudly and by row id ("3 failed | 6 passed (9)", `C1 gains 'wb-km7q.11 no-deferral-wording'`) rather than silently admitting a new claim. Keep the exact pin; move the cost, not the reading.
- **A cure that left the census bytes alone.** Blob `43bdf6d1` is constant across six revisions while the export moved five times (six distinct blobs across those six revisions: `3f7c1f5d`, `65e8daf7`, `46101b0c`, `fec54310`, `997cbd4f`, `1ecdbde2`); the hop subject names the mechanism and the row (`7f28422`), and `cureOnTrunk` / `cureLanding` fields in O:1600 and O:1603 let a reader attribute a post-cure hold without the ledger.
- **The census runs file-alone under the default config in about 4 s** (control probe: `Test Files 1 passed (1)`, `Tests 9 passed (9)`, `Duration 4.11s`), which is what made a three-run probe of this draft affordable (Postscript).

## What I did not establish

- I ran no complete gate and did not run the census on the red exports (`f63d3896`, `727ca967`); the "3 failed | 6 passed (9)" readings are the rulings' and the BIND rows'. The judge report `/tmp/fw-landprep-wb-yswd-20261031T183253Z-536811/judge.json` and the probe worktree `/tmp/fw-probe-754` that R-B209 names were gone at the read (`ls` rc 2; the host rebooted at about 20:24Z). `/tmp/fw-probe-756` at `727ca9677d` is still listed by `git worktree list`; not run.
- The row readings under Finding 2 come from a Python `re` port of four regex sources, not from the census's own `familiesIn`; the port's three-string self-check is above. Artifact: the census against the `65e8daf7` export.
- Whether wb-021.7's `comments` field also matched; the probe read `notes` only. Whether the quoting sentence in that note would have been admitted by a marker had it been a row A sentence; irrelevant to C, not checked.
- The gate-seconds of the cure cut's own re-gate (`ce9a216f` under `g10-gate-s167`, seat gate-prep-3, from 21:48Z per R-B219) and of the two bare-trunk probes are not in the 16,648 s; the 7 in-window `gate-refused` rows whose line names GATEBASE-TRUNK-RED (O:1549, O:1588, O:1592, O:1594, O:1596, O:1605, O:1608 — every `gate-refused` row of the 22; the first two cite only the 2026-10-30 wb-5omz hold O:1412, so 5 cite this arc) read `gateSeconds` 0 on six, and O:1592, the synthesized PREP fast path, carries neither `gateSeconds` nor `prepSeconds`, so their cost sits in the six rows' `prepSeconds`, not summed here.
- No installed binary ran; the installed pin is the trunk sha the dispatch named and `git rev-parse` plus `merge-base --is-ancestor` confirmed, not a `--version` print.
- 32 trunk tests at the pin name `new-feedback` (`git grep -l 'new-feedback' aa9ea0d8c8b1 -- 'test/*.test.ts' 'test/*.census.ts' | wc -l`); only the three censuses named in the Postscript were run against this draft.
- The corroborated file is on an unlanded branch; whether the owner lands that branch before or after this one decides whether the `Corroborates:` link resolves at trunk. Both commits are on `origin`; the names and shas above are what a reader needs either way.

## Postscript — this file is itself a scanned surface

The census walks `new-feedback/` (`FLOORS`, `:238`, names it), judges every anchored `.md` sentence by `MARKERS` (`:190-210`) and cuts sentences at `[.!?;]\s+` (`SENTENCE_END_SOURCE`, `:521`), at blank lines, before list items and before table rows (`:519-520`). So every sentence here that names one of the two deferred families carries a marker word; the two ruling quotes elide the needle where the quoted text would otherwise be cut, at its own ellipses, into a marker-less piece; and rule 26's first sentence is described rather than quoted, because its parenthetical ellipses would cut it the same way inside any walked file. The probe (detached worktree at the pin, `node_modules` linked, three censuses that read `new-feedback/` run file-alone with `env -u CLAUDECODE CI=1 timeout 120 node_modules/.bin/vitest run <file>`):

Results. Control, no draft (18 entries): `Test Files 1 passed (1)`, `Tests 9 passed (9)`, `Duration 4.11s`. First run with this draft present (19 entries): `Tests 2 failed | 7 passed (9)` — A1 red with exactly one finding, this file's own line 194, `S: unmarked`: the F7 verdict row above quoted the echo sentence's opening words as a `git grep` needle inside a table row, and a table row is a piece of its own, so the marker words in the neighbouring prose did not reach it — a small meta-contagion of my own, cured by naming the deferred posture inside that cell; `records` red as the consequent, as in both rulings. The two other censuses that read this directory passed with the draft present: `test/workbench-ri-decision-seed-claim-census.test.ts` `Tests 43 passed (43)` (5.89 s) and `test/workbench-tsx-h2-proposed-api-census.test.ts` `Tests 15 passed (15)` (11.86 s). The fixed bytes (line 194 cured, this paragraph still unfilled): `Tests 9 passed (9)`, `Duration 3.87s`; the final bytes, re-run file-alone after the 2026-11-01 verifier-pass edits to this file (the F7 cell and two What-worked-well bullets re-worded; a fresh detached worktree at the pin, same command): `Tests 9 passed (9)`. Planted control beside the fixed bytes: a walked file holding rule 26's whole first paragraph verbatim (`standing-rules.md:33`, 1,162 characters) — `Tests 2 failed | 7 passed (9)`, A1 findings `new-feedback/2026-11-01-plant-rule-26-paragraph.md:3 S: unmarked` and `new-feedback/2026-11-01-plant-rule-26-paragraph.md:3 K: unmarked` (the paragraph's own parenthetical ellipses cut it into two marker-less family pieces ahead of its DEFERRED clause), `records` as the consequent; the plant was removed before the final run. So the rule that cures the store would itself red the census if a seat copied it into any walked file, and a reader quoting it in a bead note would need the echo sentence in the same note, as rule 26 itself says. A first plant holding only that paragraph's opening piece (156 characters, cut at its own ellipsis) drew no finding, because that piece names no anchor (R-UNANCHORED, `:113-114`): the census judges exactly what it says it judges.
