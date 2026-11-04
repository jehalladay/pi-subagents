# The R636 phase-2 landing law landed 22 of 22 landings 262-283 (8 h 06 min) with 22 of 22 landed merge trees byte-identical to the gated tree, 5 of 5 R633 spot pairs agreeing with 0 asymmetry holds, and the PASS-KEEPS-ENTRY lock released at the fold 22 of 22 times

**From:** flywheel (Pi-Subagents Orchestration Engineer) — the seat that ran the machine side of these landings (land-prep gates, gate-judge, folds) and re-derived the identity claim below from the rig clone after the fact
**Date:** 2026-10-23
**`pi-subagents` revision:** rig checkout HEAD `188ae59`; trunk `origin/workbench/implementation-program` at `9357bf4` (landing 285 hop, 2026-10-23T08:05:21Z) in the detached worktree this file was written in; the 22 landings' merge commits, hops and gated trees are pinned per landing in section 1 and all 22 are ancestors of `9357bf4`
**Method:** for each of landings 262-283, read the fold section in the machine's `BOUNDARY.md:5559-5760` (merge sha, hop sha, gate cmd), the `landing-gate` row in `ledger/metrics.jsonl` (`gatedTree`, `mergeTree`, `base`, `tip`, `cmd`, `verdict`, `note`) and, where a red path ran, the kept gate-judge report (`fixtures/landprep-redpath/fw-judge-<bead>.<utc>.try1.json`: `identity`, `holds`, `realReds`, `needsRuling`); then re-derived `git -C rig rev-parse <merge>^{tree}`, `git rev-parse <hop>^`, `git log -1 --format=%P <merge>` for all 22 and compared them to the ledger; counted `gate-lock-released` and `gate-dequeued` rows per bead; read R633/R636 as recorded in `BOUNDARY.md:4732-4733`, `:4750-4751` and `ledger/evolution/g11-land-prep/DESIGN-g11-landprep.md:51-74`. All paths relative to the machine root `OrchestrationEngineer/machines/flywheel/`; the window is 2026-10-22T08:00Z-2026-10-23T08:00Z.
**Scope:** positives about the pi-subagents landing protocol (R636 phase 2, R633 matching, PASS-KEEPS-ENTRY custody) as operated from the flywheel seat on 22 test-only landings; defects from the same window and the same landings are in the sibling file `2026-10-23-CORROBORATION-docs09-census-787-red-at-8-of-22-landings-262-283-...md`.

Kept honest — these are wins observed in one night's landings, each with the measurement that shows it, not platitudes. They are the reason the program's trunk could take 22 landings from a machine gate in 8 h 06 min with the owner pushing each one, and each names the refactor that would plausibly lose it.

## 1. Every one of the 22 landed merge commits carries the exact tree the gate of record gated — **CONFIRMED** (re-derived)

**What it did.** R636 protocol (BOUNDARY.md:4751): "machine land-prep on the exact merge (tip onto the live hop) in the slot pool; owner verifies tree identity + telemetry, pushes, closes, hops". Machine leg: each gate-judge report's `identity` block, landing 263 verbatim:

```
"tip": "9b47aeaf78c9564c1f8ec4f5092b76ecc13e298d", "tipTree": "742492ad7053620fd0b117323aba2d0a0e8a88d6", "tipTreeMatchesArg": true, "tipTreeMatchesEnvelope": true, "hop": "98acfafb39b456fc940947004a59e27743d32604", "mergeBase": "98acfafb39b456fc940947004a59e27743d32604", "resolved": true, "errors": [], "plumbing": ["rev-parse", "merge-base", "cat-file -e"], "cutTip": "85261fc09cf544d43badff685760b26d1a450209", "cutHop": "98acfafb39b456fc940947004a59e27743d32604"
```

Owner leg: the fold line, landing 263 (BOUNDARY.md:5565): "Chain verified by ancestry from the rig clone: merge b4a9310 (85261fc onto 98acfaf; test, 2 paths) + ledger hop df64ad0 = trunk tip; owner gate of record cmd_6018e1dfaa73". Third leg, mine, 2026-10-23 from the rig clone — the landed merge's tree against the ledger's `gatedTree`, the hop's parent against the merge, the ledger's `base` against the previous landing's hop, the merge's parents against the ledger's `tip` and the fold's `onto`:

```
L262 wb-o4h0.1 fold=2026-10-22T23:44:46Z merge=c745208 tree==gated:True (ffe77b83 vs ffe77b83) cmd==ledger:True base==prevHop:True hop^==merge:True tip/onto parents ok:True onto=e8850da
L263 wb-a9l2.8 fold=2026-10-23T00:20:13Z merge=b4a9310 tree==gated:True (742492ad vs 742492ad) cmd==ledger:True base==prevHop:True hop^==merge:True tip/onto parents ok:True onto=98acfaf
L268 wb-o4h0.6 fold=2026-10-23T01:25:56Z merge=f626b39 tree==gated:True (f8f255ed vs f8f255ed) cmd==ledger:True base==prevHop:True hop^==merge:True tip/onto parents ok:True onto=e877d48
L273 wb-o4h0.5 fold=2026-10-23T03:34:46Z merge=1eb4335 tree==gated:True (7b4d03df vs 7b4d03df) cmd==ledger:True base==prevHop:True hop^==merge:True tip/onto parents ok:True onto=2a26385
L278 wb-pfxo.2 fold=2026-10-23T06:07:08Z merge=03869e0 tree==gated:True (c2690dbb vs c2690dbb) cmd==ledger:True base==prevHop:True hop^==merge:True tip/onto parents ok:True onto=fc1534f
L283 wb-pfxo.7 fold=2026-10-23T07:43:38Z merge=799527a tree==gated:True (60e28fdb vs 60e28fdb) cmd==ledger:True base==prevHop:True hop^==merge:True tip/onto parents ok:True onto=6653728
SUMMARY 262-284: tree==gated 23 cmd==ledger 23 base==prevHop 23 hop^==merge 23 parents ok 23
```

(Six of the 23 lines shown; the summary line counts all of them, landing 284 included.) The full per-landing pin: 262 wb-o4h0.1 `c745208`/`ffe77b83`, 263 wb-a9l2.8 `b4a9310`/`742492ad`, 264 wb-a9l2.7 `7177d28`/`a6d6dc8d`, 265 wb-o4h0.3 `5a7b2e7`/`9817df57`, 266 wb-1xvp.3 `48aad06`/`b103ab91`, 267 wb-1xvp.2 `dd3c61c`/`48e0120c`, 268 wb-o4h0.6 `f626b39`/`f8f255ed`, 269 wb-tnz5.1 `4f4ed27`/`ddb392ac`, 270 wb-o4h0.7 `05bd20c`/`3e2f66ab`, 271 wb-o4h0.4 `5a2599c`/`a6bd91bb`, 272 wb-tnz5.2 `fce7571`/`9971f4f4`, 273 wb-o4h0.5 `1eb4335`/`7b4d03df`, 274 wb-tnz5.3 `f985725`/`274918e4`, 275 wb-tnz5.4 `539fb3d`/`8dbd81e4`, 276 wb-tnz5.5 `cbe652d`/`7b9b3839`, 277 wb-pfxo.3 `925b1cb`/`fdc49e4e`, 278 wb-pfxo.2 `03869e0`/`c2690dbb`, 279 wb-pfxo.4 `2a006cd`/`d681796f`, 280 wb-pfxo.1 `ff2f4fd`/`a85ccf35`, 281 wb-pfxo.5 `87fb9fc`/`aa71e196`, 282 wb-pfxo.6 `55cd0f4`/`65cbafdc`, 283 wb-pfxo.7 `799527a`/`60e28fdb` (merge sha / gated tree, 7-8 hex each; the ledger rows hold the 40-hex forms).

**Measured.** 22 of 22 landings: landed merge tree == gated tree; `base` == previous landing's hop (the gate ran on the exact merge onto the live hop, with no gap in the chain from 262 to 283; 262's base `e8850da` equals landing 261's ledger hop in that fold's line); hop's parent == the merge; fold cmd == ledger landing-gate cmd; `mergeTree` == `gatedTree` in the ledger row; `tipTreeMatchesArg` and `tipTreeMatchesEnvelope` true and `hop` == `mergeBase` in all 15 red-path judge reports. 0 tree-identity mismatches; the R636 auto-revert clause (DESIGN-g11-landprep.md:74: "ANY tree-identity mismatch reverts to phase 1 for the next 3 landings + a defect row") did not fire once — 0 mentions of AUTO-REVERT or a phase-1 revert in BOUNDARY.md after line 5559.

**Why it must survive a refactor.** Anything that gates a probe tree instead of the exact merge — gating the tip alone, "rebase then gate" with the push on a different base, or a fold that stops recording merge and hop shas — breaks the equality that makes "zero false merges" a measurement rather than a belief. So does making `data.gated_tree` optional in the gate envelope (`gatedTreeRef: "data.gated_tree"` is what the judge's identity check reads). The check costs one `rev-parse` per landing; it was re-run here in under a minute for 23 landings.

**Scope of this praise.** 22 landings, all test-only ("test, 2 paths" in every fold line), one host, one trunk; no src-touching landing sat in this set, so the law's behaviour on one was not exercised here.

## 2. Five of five R633 spot pairs agreed, with the asymmetry guard armed and never tripped — **CONFIRMED**

**What it did.** R633 (BOUNDARY.md:4732-4733): "phase-2 matching = tree identity + same decision class [...] verdict-form equality not required (census echoes are load noise under R573); asymmetry guard - a real-assertion red on either side the other lacks = NOT matching, landing HOLDs, g11 defect row". R636 safeguard (b) (DESIGN-g11-landprep.md:74): "SPOT CHECK - every 5th landing [...] the owner also runs the full phase-1 owner gate on the pushed merge out of band and compares R633-style". Spots in this set: 263, 268, 273, 278, 283. The ledger's landing-gate notes and the folds:

```
L263 note: "landing 263 = SPOT (owner spot pair complete pre-release: probe c129cddd, R633 AGREES vs cmd_5f0f6e9c5468); land-prep try 1 clean red path"
L268 note: "landing 268 = SPOT (owner pair complete pre-release: probe f15d3efe, R633 AGREES vs cmd_34e4ec42870b); try 1 red path, owner-ruled R705(a)"
L273 note: "landing 273 = SPOT (owner pair complete pre-release: probe 8d3ab821, R633 AGREES vs cmd_62930ae0ee99); land-prep try 1"
L278 fold (BOUNDARY.md:5710): "278 SPOT: pfxo.2 clean PASS; spot pair R633 AGREES"
L283 note: "landing 283 = SPOT (owner pair complete pre-release: probe 744c37d7 fully green, R633 AGREEMENT vs cmd_7bfcfbc403af); land-prep try 1"
```

**Measured.** 5 of 5 spot pairs AGREE. 0 HOLDs: `"holds": []` and `"realReds": []` in all 15 red-path judge reports (the other 7 landings had no red path). 0 g11 defect rows for a landing — the 2 `machine-defect` rows in the window (M:10814 wb-91yt, M:11091 wb-ouo3) are gate-prep bind-stage failures on complete gates, not landings. At 263, 273 and 283 the two legs differed in verdict form (machine: one timing red each — `docs09:787`, `inspector:58`, `inspector:58` — serial-cleared; owner probe at 283 "fully green") and agreed in decision class, which is the case R633 excludes from the matching bar by design.

**Why it must survive a refactor.** A refactor that demanded verdict-form equality would have held 3 of these 5 spots for load noise; one that dropped the asymmetry guard would make the comparison theatre. Keep both halves — identity plus decision class as the bar, real-assertion asymmetry as the only trip — and keep writing the probe tree and the compared cmd into the landing-gate note, which is the only place the pairing is recorded per landing.

**Scope of this praise.** 5 spots; I did not re-verify the owner probe trees (c129cddd, f15d3efe, 8d3ab821, 744c37d7) against the gated trees myself; the 278 pair's probe sha is not in the ledger row, only the fold line's verdict.

## 3. PASS-KEEPS-ENTRY custody held 22 of 22 times: lock and queue entry released only at the fold — **CONFIRMED**

**What it did.** The rule as bound (BOUNDARY.md:1788): "GATE LOCK HELD until landing (gate-2 followed the PASS-keeps-entry rule; orchestrator releases entry + lock at landing)"; (BOUNDARY.md:1807): "PASS-KEEPS-ENTRY: entry queued + lock HELD until the owner landing." Every fold line in 262-283 ends the same way, landing 283 (BOUNDARY.md:5757): "Lock wb-pfxo.7 RELEASED, entry DEQUEUED (commit 457ccaf1dabfb1845f3e627608d4d241e0a5e437, PASS-WITH-TIMING-NOTE). Landed-note appended."

**Measured.** 22 of 22 fold lines carry "RELEASED, entry DEQUEUED" (`sed -n '5559,5760p' BOUNDARY.md | grep -c 'RELEASED, entry DEQUEUED'` → 22). 22 of 22 `gate-lock-released` ledger rows are stamped within 1 s of their fold and 51 s-6 min 55 s after their landing gate (e.g. wb-pfxo.7: landing-gate 07:42:35Z, lock released 07:43:38Z, fold 07:43:38Z; wb-tnz5.4: 03:57:11Z, 03:58:02Z, 03:58:02Z; wb-o4h0.1: 23:37:52Z, 23:44:47Z, 23:44:46Z). 0 releases before a landing gate. Two beads (wb-1xvp.2, wb-1xvp.3) also carry an earlier `gate-dequeued` row (2026-10-22T20:41:21Z, 20:53:03Z) from a prior cut refused at the complete gate (`"verdict": "refused", "refusalNumber": "1", "reopened": true`) — a different queue cycle that ended in a re-cut, not a custody break on the landed entry.

**Why it must survive a refactor.** An "early dequeue on PASS" optimisation returns to the shape the rule replaced (BOUNDARY.md:1780 records the "Early-dequeue restoration + PASS-keeps-entry" bind). Holding lock and entry through the fold is what lets the fold's "Register blob check vs the landing" and the dequeue read the same entry the gate judged, and what keeps a second gate lane from claiming a bead whose landing is still in flight.

**Scope of this praise.** Lock and dequeue timing read from the ledger kinds `gate-lock-released` and `gate-dequeued` only; the lock files themselves were not read.

## 4. The red path stayed mechanical: 13 of 15 red-path landings landed with no ruling, and the two that needed one landed under a standing delegation — **CONFIRMED**

**What it did.** Verdict mix over the 22: 7 `pass`, 15 `pass-with-timing-note`. In the 15 red-path judge reports, `"needsRuling": false` on 13 (route `R-T7(5) register`); `true` on 2 — landing 268 (sanitizer-corpus:1162, an unregistered row, route `R609 serial-leg`, ruled R705(a); the same ruling bound R705(b) as a standing delegation: BOUNDARY.md:5603 "R705(b) standing delegation bound (R609 serial clears routine-local under 6 conditions, land-prep only)") and landing 279 (BOUNDARY.md:5719: "RULED LANDABLE under R705(b) FIRST APPLICATION (candidate 55, all six conditions verified): 2 register HITs + 1 R609 clear").

**Measured.** 22 landings from the first land-prep gate (2026-10-22T23:37:52Z, landing 262) to the last fold (2026-10-23T07:43:38Z, landing 283): 8 h 06 min; 22 of the 42 landings folded inside the 24 h window (243-284, 2026-10-22T08:47:41Z-2026-10-23T07:56:18Z). All 22 reds in the 15 kept judge reports (16 on the two chronic rows, 6 on four other rows) carried the strict marker (`strictMarker: true`) with `assertionErrors: 0`; all 20 serial legs those reports record ran green on try 1 (the 21st land-prep leg of the set, schedule-e2e at landing 262's second try, has only its ledger row — 12204 ms, 8 tests — because the report kept is the third try's). Landing 262 needed 3 land-prep tries: try 1 a harness abort, try 2 a no-marker schedule-e2e:240 red that did not recur in try 3, both disclosed in the landing-gate row's note and in BOUNDARY.md:5557 ("tries 1-2 disclosed in row note").

**Why it must survive a refactor.** The mechanical route depends on three typed facts per red — strict marker, 0 real assertions, blob-pinned register match — and on the typed `serial-leg` row per file; collapsing any of them into free text in the verdict would push every timing red back to a human ruling, which at 15 of 22 landings is the pipe's bottleneck the R636 evidence named ("T1 showed the owner gate is the pipe's bottleneck", DESIGN-g11-landprep.md:72).

**Scope of this praise.** One night, two chronic rows dominating the red path; the law was not exercised against a real-assertion red in this set (0 occurred), so its HOLD branch is unmeasured here.

## Where a positive was the reason a defect was findable

The gate-judge reports' per-leg `ms`, `load1` and `testsRun` fields and per-red `line`, `marker` and `register.matches` are what made the sibling file's "8 of 22 / 8 of 22 / 421,684 ms" counts possible without a transcript: `2026-10-23-CORROBORATION-docs09-census-787-red-at-8-of-22-landings-262-283-and-inspector-58-at-8-of-22-each-costing-one-13823-52080-ms-serial-leg-while-the-60000-ms-it-options-cure-stays-unapplied.md`.

## What I am NOT claiming

- That the law holds for src-touching landings: none sat in 262-283.
- That "zero divergent reds" means identical verdicts: 3 of the 5 spots differed in verdict form and matched in decision class, which is R633's bar.
- That the 22 landings took a day: the set spans 8 h 06 min; the 42 in-window landings span 23 h 09 min and only 262-283 were tabulated.
- That these positives close the sibling corroboration's finding: the same 22 landings paid 421,684 ms of serial legs on two rows the law absorbed but did not remove.
- That the owner's spot probes were verified by me; I quote the notes that record them.

## Asks

- Document the two-leg tree-identity law (exact merge onto the live hop; `gatedTree` == landed merge tree, checked on both sides) and PASS-KEEPS-ENTRY in a contributor-facing doc in this repository: at `9357bf4`, `git grep -il 'R636\|R633\|PASS-KEEPS-ENTRY\|tree identity' HEAD -- docs/ AGENTS.md README.md` returns 0 files (`land-prep` appears in 2: `docs/workbench/feature-matrix.md` and a receipt), so today the law lives only under the machine root. A guarantee this file measured at 22 of 22 should be a contract, not luck.

## Grades

Grade each claim: CONFIRMED (provable from cited source or quoted output), PLAUSIBLE (consistent, not refuted, runtime state not exercised), UNDETERMINED (name the missing artifact).

- Win 1 — **CONFIRMED**: re-derived from the rig clone against the ledger and the folds (23 of 23 equalities, 262-284).
- Win 2 — **CONFIRMED** for the 5 agreements and 0 holds (ledger notes, fold lines, 15 judge reports); the owner probe trees themselves **UNDETERMINED** (the probe envelopes were not read).
- Win 3 — **CONFIRMED**: 22 fold lines and 22 `gate-lock-released` rows.
- Win 4 — **CONFIRMED** for the counts; the HOLD branch **UNDETERMINED** (no real-assertion red occurred in the set).
