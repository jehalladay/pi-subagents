# the by-design A2 seam red reaches a lander as a bare toStrictEqual diff that names neither tsx-action-reference-roster.json nor the landing-393 same-commit re-measure duty

**From:** flywheel seat (Pi-Subagents Orchestration Engineer, a8ddce77) — the orchestrator seat whose machine gated and folded landing 393; the landing records quoted below were written by that machine, and this agent re-read them rather than re-running anything
**Date:** 2026-10-25 (window read: 2026-10-24T07:45Z-2026-10-25T07:45Z; written ~08:30Z, revised ~08:55Z after a two-lens verifier pass — every count below re-derived at revision time)
**`pi-subagents` revision:** trunk `origin/workbench/implementation-program` at `b887fa2e9f581f9a6b1e9d47cb723029aae353ae` after `git fetch -q origin` — the same sha the dispatch pinned as the installed-tool revision (string-equal), so installed pin and read sha coincide; every source byte below was read with `git show b887fa2e9f581f9a6b1e9d47cb723029aae353ae:<path>` or `git grep ... b887fa2e9f581f9a6b1e9d47cb723029aae353ae`; the rig clone's checked-out HEAD is `188ae59`, 550 commits behind the pin (`git rev-list --count HEAD..b887fa2e`; 556 behind trunk at revision time), with `git status --porcelain` showing 3 untracked `new-feedback/` drafts (this file and two sibling lanes') and 0 tracked modifications. Re-checked at revision time (~08:51Z): trunk has moved to `dc8e816` (6 commits past the pin, through landings 396 `wb-nbp3` and 397 `wb-zoq7`); `git log b887fa2e..origin/workbench/implementation-program -- test/workbench-tsx-action-reference-census.test.ts test/fixtures/tsx-action-reference-roster.json` is empty, so every line cited at `b887fa2e` holds at trunk and the pin still string-equals the installed-tool pin
**Machine evidence revision:** `machines/flywheel/ledger/metrics.jsonl` and `machines/flywheel/BOUNDARY.md` read 2026-10-25 ~08:20Z (read-only); machine-repo commit `a2e8f8caa30ce9880f94faf06ff259a2f82c9bc6` (2026-10-25T07:11:02Z) read with `git -C machines/flywheel show --stat`
**Method:** read the landing-393 fold record (`BOUNDARY.md:7551` = ledger row M:19326 = `ledger/metrics.jsonl` line 19326, plus its correction row M:19346); parsed the landing-order registry at machine commit `a2e8f8caa` (`git -C machines/flywheel show a2e8f8caa:state/landing-order-registry.json`, `python3 -I`; 195 entries at that commit — the working tree holds 196 since `d1bbc3b`, landing 395 F7, 2026-10-25T08:25:48Z); read the census, the roster fixture and the bead export at the pinned sha with `git show` and `git grep`, with arming controls on every absence probe; counted landing-gate rows over the ledger window filtered on each row's `utc` key (2026-10-24T07:45:00Z <= utc < 2026-10-25T07:45:00Z = rows M:15679-19383), with the BOUNDARY-stamped sub-span M:15680-19326 as a cross-check. No test was run and no `src` mutation was made (docs-only seat); the A2 red this file describes has therefore never been rendered, and that bound is carried in Findings 2 and 3.
**Scope:** feedback about the repo's own test/gate surface — specifically the failure output of `test/workbench-tsx-action-reference-census.test.ts` row A2 — not about the census's measurement logic (praised below), not about the landing-393 cut, and not about the product gap tracked in bead `wb-913h` (adjacent, different claim; see "What I did not establish").
**Prior art:** `git ls-tree -r --name-only origin/workbench/implementation-program -- new-feedback/` lists 15 entries (14 files + README); the unmerged branches `origin/machine/flywheel/feedback-2026-10-22` and `-23` add 3 more. A keyword pass (`action-reference|roster|seam|a2|census|actionab`) over all 18 matches 6 names: five are the census-timing/config family this directory already carries (the three 2026-10-21 files and the 2026-10-23/-24 docs09 CORROBORATIONs), and the sixth, branch-only `2026-10-22-the-census-judge-resolves-a-case-function-only-as-a-literal-or-a-same-file-named-function-so-a-factory-call-registration-reds-2-landed-report-mode-readers-body-unresolved.md`, is the one adjacent file — a different claim (judge case-function resolution, not red self-description). No listed file states this claim.
**Delivery:** pending — a one-file commit on `machine/flywheel/feedback-2026-10-25`, cut from a detached worktree of the ref, which the program owner lands; per this directory's README the commit body will disclose the docs-only gate waiver (docs-only, per operator standing direction). At write time this draft sits uncommitted in the rig clone.

## Summary, with numbers

Landing 393 (bead `wb-bhq5`, fold-done M:19326, 2026-10-25T07:15:36Z) refresh-appended the machine's landing-order registry entry for this census to class `READER-ALL + SRC-PINNING` — new 0-based idx 194 of the 195 entries at machine commit `a2e8f8caa` (+13 lines to `state/landing-order-registry.json`; 196 entries since `d1bbc3b`, landing 395 F7, 2026-10-25T08:25:48Z), superseding idx 116 (`READER-ALL`, addedAtLanding 297) — and bound a forward contact verbatim: a later cut that adds, moves or renames a capability registration or registrar anywhere in `src` reds A2 **by design** and must re-measure the roster's A2 seam witness **in the same commit**. The seam-only red that contact predicts reaches a lander as `expect(witness).toStrictEqual(rosterWitness(pin))` — census line 1642 at `b887fa2e`, no message argument, under an `it` titled with the bare pin id `A2` — so the failure output carries neither `test/fixtures/tsx-action-reference-roster.json` nor the re-measure duty. The duty sentence exists verbatim in exactly 1 tracked path at the sha (`.beads/issues.jsonl`, 2 lines: 138 and 233, bead-note prose) and in 0 of the census's 1667 lines (`same commit` and `renames`: 0 hits each; arming control `roster holds no pin` hits line 361). Of the 3 registry entries whose class carries SRC-PINNING (0-based idx 7, 165, 194), only idx 194's reason states the same-commit duty, so this census is where the pattern now bites first. The cost is predicted, not yet realized: 0 of 61 landing-gate rows in the window (M:15679-19383 by `utc`, 3705 rows, 10 of 61 with non-empty `reds[]`) name this census in `reds[]`, and whole-ledger its only red rows are its own two cut lanes. The cheapest fix is one message argument on one `expect`, with an in-file precedent one line above.

## Finding 1 — landing 393 bound a SRC-PINNING forward contact that makes a future A2 red by-design and owes a same-commit roster re-measure — **CONFIRMED**

The fold record (`BOUNDARY.md:7551`, byte-identical duty text in `ledger/metrics.jsonl` line 19326 — `grep -c` of the forward-contact sentence on that line prints 1) carries the F2 duty, quoted re-wrapped from one ledger line, with trims marked:

```
- F2 LOW FOLD DUTY: refresh landing-order registry entry 117 in place (census
test/workbench-tsx-action-reference-census.test.ts, roster test/fixtures/tsx-action-reference-roster.json,
addedAtLanding 297; its reason still describes only the landing-297 shape): the class gains SRC-PINNING, and
the reason names the new pinned surfaces - A2's src registration seam (every CapabilityRegistry construction,
register-member reference and registrar reference across src, by module and enclosing function; 2/12/14 at the
probe) and the detached host's NATIVE_CAPABILITIES table and registryFor case statements, resolved through its
import bindings with the four native registrars run on fresh registries - plus the forward contact: a later cut
that adds, moves or renames a capability registration or registrar anywhere in src reds A2 by design and must
re-measure the roster's A2 seam witness in the same commit. [...]
```

The same row's `registryEntry` field records the execution, quoted mid-field with the leading trim marked: `[...] new idx 194, class READER-ALL + SRC-PINNING (canonical token asserted against state/registry-class-vocabulary.json), refreshedAtLanding 393, supersedes {census, addedAtLanding 297} [...] registry 194 -> 195; commit a2e8f8caa30ce9880f94faf06ff259a2f82c9bc6`. Re-derived from the registry at the machine commit (`git -C machines/flywheel show a2e8f8caa:state/landing-order-registry.json`, parsed with `python3 -I`):

```
total entries: 195
entries with SRC-PINNING in class: 3 at 0-based idx: [7, 165, 194]
--- 0-based idx 116
    census = "test/workbench-tsx-action-reference-census.test.ts"
    class = "READER-ALL"
    addedAtLanding = 297
--- 0-based idx 194
    census = "test/workbench-tsx-action-reference-census.test.ts"
    class = "READER-ALL + SRC-PINNING"
    addedAtLanding = 393   refreshedAtLanding = 393
    supersedes = {"census": "test/workbench-tsx-action-reference-census.test.ts", "addedAtLanding": 297}
    forward-contact sentence present verbatim: True
```

(Append-only since: the working tree gained 0-based idx 195 — `test/workbench-detached-timing-guard.test.ts`, `READER-ALL`, addedAtLanding 395 — at machine commit `d1bbc3b`, 2026-10-25T08:25:48Z, the landing-395 F7 duty, so it now holds 196 entries; every idx quoted here is unchanged.) The two other SRC-PINNING-class entries do not carry this duty: idx 7 (census field `test/workbench-security-acceptance.test.ts (W19/docs-12 security acceptance census)`, class `DOCS+SRC-PINNING`, no reason key) and idx 165 (`test/workbench-rf-evaluator-artifact-context-census.test.ts`, `READER-ALL + SRC-PINNING`, addedAtLanding 353) — `same commit` appears in neither (idx 7 carries no reason key at all; idx 165's reason lacks the phrase) and in idx 194's reason only. The machine commit:

```
$ git -C machines/flywheel show --stat --format='%H%n%cI%n%s' a2e8f8caa30ce9880f94faf06ff259a2f82c9bc6
a2e8f8caa30ce9880f94faf06ff259a2f82c9bc6
2026-10-25T07:11:02Z
F2 fold duty landing 393: tsx-action-reference R755 refresh-append (idx 194, class READER-ALL + SRC-PINNING,
refreshedAtLanding 393, supersedes 297 at 0-based idx 116; R771 token asserted, R769 parity)

 state/landing-order-registry.json | 13 +++++++++++++
 1 file changed, 13 insertions(+)
```

(M:19346 is a fold-done-correction on M:19326 about a typed receipt-key mismatch, `duties.registry` absent on the row; it does not touch the duty text quoted here.)

## Finding 2 — the predicted red's whole self-description is a message-less toStrictEqual diff under the bare pin id, and nothing it prints names the roster file or the duty — **CONFIRMED** for the source bytes (line 1642 carries no message argument; `same commit`, `renames` and the roster path are absent from every string the A2 title chain or assertion can print), **PLAUSIBLE** for the rendered output (no A2 red was rendered)

`test/workbench-tsx-action-reference-census.test.ts:1635-1645` at `b887fa2e9f581f9a6b1e9d47cb723029aae353ae`:

```ts
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
```

A seam move trips line 1642, the `expect` with no message argument; the `it` title is the bare pin id, so the failing test's title chain is `wb-if7q.4 TSX action-reference census (TSX-NATIVE-INTERFACES-AND-PORTABLE-TSX-R4, absent-today and armed legs)` (describe, line 1576) then `A (trigger, absent today) If Pi ever hosts or relays TSX action references: (a) absence pin: ...` (the row describe; label asserted equal to the roster's by the judged-set case) then `A2`. A2's own case body (lines 1232-1240) carries five message-bearing expects — e.g. line 1236, `the detached cases together register the in-process entries` — that fail before line 1642 when an added registration is not mirrored in the detached host, so the message-less line-1642 path is the seam-only change: a move or rename, or an add mirrored in both hosts. `rosterWitness` (lines 359-363) returns the roster's witness object and its own miss path is also path-less:

```ts
function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
```

The roster path is named only outside anything an A2 failure prints: the header comment (line 87, "are held to the out-of-file roster (test/fixtures/tsx-action-reference-roster.json)"), `const ROSTER_FILE` (line 149, its one other use the `readRoster` call at line 318), and the judged-set `it` title (line 1577, "the out-of-file roster"). Absence probes on the census blob extracted with `git show` to a temp file, armed first:

```
$ grep -n "roster holds no pin" <census blob>        # arming control, expect a hit
361:  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
$ grep -n "same commit" <census blob>; echo rc=$?
rc=1
$ grep -n "renames" <census blob>; echo rc=$?
rc=1
```

Repo-wide at the sha, the forward-contact sentence verbatim lives in exactly one tracked path — the bead export, as fold-duty prose inside two bead rows (`wb-913h` at line 138, `wb-bhq5` at line 233) — and the fragment probe agrees:

```
$ git grep -n "reds A2 by design" b887fa2e9f581f9a6b1e9d47cb723029aae353ae -- . | cut -d: -f2,3
.beads/issues.jsonl:138
.beads/issues.jsonl:233
$ git grep -l -F "a later cut that adds, moves or renames a capability registration or registrar anywhere in
  src reds A2 by design and must re-measure the roster's A2 seam witness in the same commit" <sha> -- . | cut -d: -f2
.beads/issues.jsonl
```

(control for the repo-wide instrument: `git grep -n "held to the out-of-file roster" <sha> -- .` returns hits in 55 files at the sha — this census at :87, 53 sibling test files with one hit line each, and `.beads/issues.jsonl` with 15 hit lines; `same commit` over the roster fixture: 0 hits.) So a lander whose cut legitimately moved a registration gets a witness diff plus a title chain, and the instruction that tells them this red is by-design and what to update sits in a machine-side registry, a BOUNDARY row, and bead prose — three places a vitest failure does not point to.

## Finding 3 — the diff localizes which src seam moved but not where to record the re-measure; the realized lander cost is 0 so far — **CONFIRMED** for the bytes, **UNDETERMINED** for the realized cost

The half that works: A2's witness pins the seam by module and enclosing function, so the diff names the moved site. From the roster fixture at the sha (29,799 bytes, parsed with `python3 -I`):

```
A2 witness keys (sorted): ['controls', 'detachedCases', 'detachedEntries', 'entries', 'family', 'pin', 'seam', 'tools']
A2 seam keys: ['constructions', 'references', 'registrations']
A2 seam.constructions: ["src/index.ts:registryFor", "src/workbench/hosts/local-detached.ts:registryFor"]
```

A lander therefore sees WHICH construction/reference/registration changed — and nothing that says the cure is "re-measure the roster's A2 seam witness in the same commit" rather than "my change broke the census". The missing half is exactly the duty sentence of Finding 1.

The realized cost so far is zero, measured two ways. Window-scoped — rows filtered on their `utc` key (whole-ledger `utc` coverage: Postscript), 2026-10-24T07:45:00Z <= utc < 2026-10-25T07:45:00Z:

```
window by utc: rows M:15679-19383 | 3705 rows | 0 lack utc
landing-gate rows: 61 | non-empty reds: 10 | census in reds: 0
cross-check, BOUNDARY-stamped sub-span M:15680-19326: 3647 rows | landing-gate 60 | non-empty reds 10 | census in reds 0
the one landing-gate row outside the sub-span: M:19361 wb-maza landing 395 at 2026-10-25T07:30:42Z, reds []
```

The `utc` window reproduces the dispatch packet's 61 landing-gate count exactly.

Whole-ledger (re-run at revision time, 19542 rows), every red/landing-gate/gate-refused row that mentions the census at all:

```
M:12337 kind=red bead=wb-if7q.4 | census-in-reds=False   (the census's own filing lane, landing 297)
M:16337 kind=red bead=wb-bhq5  | census-in-reds=False   (the landing-393 cut's own lane)
M:19272 kind=landing-gate bead=wb-bhq5 | census-in-reds=False   (landing 393's own landing gate)
M:19427 kind=gate-refused bead=wb-dqhl | census-in-reds=False
```

None is a forward-contact event (a later cut moving a `src` registration). The UNDETERMINED artifact: the first landing-gate row or gate-judge report carrying this census in `reds[]` after a `src` registration change — or a deliberate `src`-mutation probe, which this docs-only seat did not run.

## Evidence

All load-bearing bytes are quoted in the findings above; sources, in one list: `machines/flywheel/BOUNDARY.md:7551` (located with `grep -n 'fold-done \[M:19326'`); `machines/flywheel/ledger/metrics.jsonl` lines 19326, 19346, 19361, and the M:12337/16337/19272/19427 rows; `machines/flywheel/state/landing-order-registry.json` at machine commit `a2e8f8caa` (`git -C machines/flywheel show a2e8f8caa:state/landing-order-registry.json`, 195 entries; 196 since `d1bbc3b`, landing 395 F7, 2026-10-25T08:25:48Z); machine commit `a2e8f8caa30ce9880f94faf06ff259a2f82c9bc6`; and, at `b887fa2e9f581f9a6b1e9d47cb723029aae353ae`, `test/workbench-tsx-action-reference-census.test.ts` lines 87, 149, 318, 359-363, 1576-1580, 1635-1645 (1667 lines total), `test/fixtures/tsx-action-reference-roster.json` (29,799 bytes), and `.beads/issues.jsonl` lines 138 (`wb-913h`) and 233 (`wb-bhq5`).

## Suggested fixes, cheapest first

1. **A message argument on the witness compare (census line 1642)** — `ROSTER_FILE` is already in scope (line 149), and the line above (1640, `` expect(impl, `no case for ${pin}`) ``) is in-file precedent for the message-argument shape, as are the five message-bearing expects in A2's own case body (lines 1232-1240). The property wanted: a failing pin names the roster file, and A2's failure also names the by-design/same-commit re-measure duty. One line; it does not fix the generic problem for other censuses.
2. **Carry the forward contact in the census header** — the header (lines 84-97) already documents A2's anchors in detail, but no cut could have carried the duty: lines 92-96, the A2 anchor text, were written by the landing-393 cut itself (`git blame -L 92,96 b887fa2e` → `a4e3741a`, 2026-10-24T13:33:06Z, the `wb-bhq5` cut, an ancestor of the landing-393 merge `f357b83a`; lines 84-91 and 97 are `55b8ba3d`, the landing-297 cut), while the forward contact was bound at fold time (M:19326, 2026-10-25T07:15:36Z), about 18 h after the cut — so a follow-up cut is the vehicle. Adding the duty sentence there gives a lander who opens the file the whole instruction. Docs-only; helps no one who reads just the red.
3. **A shared failure-message helper for roster-held censuses** — the header phrase "held to the out-of-file roster" appears in 54 test files at the sha (`git grep -l`, one hit line each), so if their witness compares share this message-less pattern (not audited here), one helper that appends roster path + registry duty to every witness mismatch buys the property fleet-wide. Costs a helper and adoption; audit the 53 siblings first.

## Positives worth protecting

- **The witness already localizes the moved seam.** A2's seam witness pins sites by `module:function` (`seam.constructions` quoted in Finding 3), so the diff names which registration moved. A refactor that collapsed witnesses to counts or hashes would lose the half of red-actionability that works today.
- **The message-argument house style already exists one line above the gap** (line 1640), so fix 1 has an in-file pattern to follow rather than a new convention to invent.
- **The 180_000 ms it-budget on these pins** (line 1638) keeps this census out of the 5000 ms timing-red class this directory's 2026-10-20/21/23/24 files document; worth keeping under any timeout refactor.

## What I did not establish

- **No A2 red was rendered.** That requires a `src` mutation probe, out of scope for a docs-only seat; the actual vitest reporter output (diff formatting, truncation behaviour on an 8-key witness) was not observed. Artifacts that would settle it: a `src`-mutation run, or the first real landing-gate A2 red.
- **Whether the land-prep gate-judge layer would decorate an A2 red with a pointer.** The judge attaches known-settled register matches to timing reds; A2 has no such register row, and no judge report containing an A2 red exists. Artifact: such a report.
- **Whether any real lander was delayed** — 0 occurrences in the measured window (Finding 3), so the cost is predicted, not realized.
- **The 53 sibling roster-held censuses' expect sites** were not audited for the same message-less pattern; the 54-file count is a grep over header phrasing only.
- **`wb-913h` (issues.jsonl:138) is adjacent, not this finding**: it tracks a product gap in A2's coverage (private providers-map writes escaping A2). This file is about the red's self-description; please do not dedupe one into the other.

## Postscript

Ledger rows carry a `utc` timestamp key. An earlier draft of this file claimed they do not, from a key listing truncated after `run`: row 19326's full sorted key set runs `acceptanceSetShas` through `run` (the 20 keys that draft listed as the whole set) plus the alphabetical tail `shape`, `sweep`, `utc` — 23 keys; its `utc` = `2026-10-25T07:15:36Z`. Re-measured at revision time (19542 ledger rows): 19463 of 19542 carry `utc`; the 79 without are delivered 30, groom-family 31, bead-created 9, blocked 2, red 2, misc 5 — none a landing-gate row. Window scoping is one filter on `utc`, which is how Finding 3's counts are derived.
