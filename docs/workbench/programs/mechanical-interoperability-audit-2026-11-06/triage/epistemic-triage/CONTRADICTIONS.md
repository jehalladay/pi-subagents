# CONTRADICTIONS — merged contradiction sets (Phases 6-8 roll-up), mechanical-interoperability-audit-2026-11-06

Roll-up investigator, 2026-11-07. Pins: ARTIFACT = ENVIRONMENT `pi@d7666a76f561` (docs-only commit on the program-stated baseline 278c8f79: `git diff --name-only 278c8f79 d7666a76` lists ten `.md` files, so every `src/`/`test/` citation is byte-identical at both); `mw@97e18068f399` (program-stated MW baseline; 1f29daa7 and f7c0a943 verified ancestors); `mw-tip@6e15a4245d3f` (origin/main at triage start: two docs-only commits past the pin, 2ea69445 and 6e15a424). Nothing was run: every warrant is a static read, a `git` history read or a committed receipt.

Claim ids are the merged-ledger ids of `CLAIMS.jsonl`. Part-02 rows (docs 02 and 03) were re-keyed +300 to resolve the Phase-1 id collision; where a part-02 id appears it is written with its original id in parentheses, e.g. `C1606 (orig C1262)`. Group ids (`KG01-nn`, `KG02-Nnn`, `K-g03-nn`) are the per-group sets this file merges.

Census: 17 sets. No set is left CONTESTED on a factual proposition. Two sets (K101, K102) are CONTESTED between norms of one authorial lineage and need an owner ruling or a wording repair; one set (K103) is an unreconciled omission (unmapped label vocabularies, dropped external gates); the remaining fourteen are reconciled by scope, version, semantic or source splits, each leaving a wording repair (`REMEDIATION.md`) or a standing defeater carried on the rows. Claim-level `CONTESTED` = 0; `REFUTED` = 2 (C1305, C1345, sets K116/K115).

| Set | Short title | Status | Rows (REMEDIATION) |
|---|---|---|---|
| K101 | README:22 prerequisites vs the BEAD-PLAN graph the program orders reused | CONTESTED (norm vs norm) | M112, M113 |
| K102 | "Never remove or weaken a safety test" vs B-preserve "no false-clean" and the committed lossy test | CONTESTED within the Nov-6 text; reconcilable via BEAD-PLAN rule 8 | M116 |
| K103 | MW-R1..R7 labels, "Mechanical-owned" header, dropped external gates vs Nov-4 mw-* tracks / wb-1zn2 | UNRECONCILED omission | M113, M114, M115 |
| K104 | doc 03:19 alias ban vs hosting.md:17 "host modes", MW SKILL:26, shipped MW result-side `mode` | reconciled (semantic split); consistency defect | M117 |
| K105 | Companion MW program cited at a baseline where it does not exist | reconciled (version split); pin/baseline defect | M109, M110, M115 |
| K106 | Execution-axis value set silently revised vs Nov-4 C0562 | reconciled (version split); fidelity defect | M111 |
| K107 | "Update stale user-facing current guidance" vs feature-matrix.md:112 still false at the pin | unmet norm at the pin | M118, M107 |
| K108 | "overlooked existing collective-event.ts" vs the dates | reconciled (temporal split) | M104 |
| K109 | "CORRECTED, not open P0" vs the superseded Pi row's P1 | reconciled (source split) | M103 |
| K110 | Pin-relative absence claims vs unlanded machine branches | standing temporal/scope defeater (not a contradiction at the pins) | none (scope_restrictions on 47 rows) |
| K111 | "Mid-session cancel ... remain to implement" vs the recorded mid-gate Forge cancel | reconciled (semantic split) | M105 |
| K112 | "no-duplicate effects remain to implement" vs the Git-source idempotency fingerprint | reconciled (scope split) | M106 |
| K113 | Ledger "develop/developLive options" vs the component the signal was added to | reconciled (extraction defect) | M120 (ledger only) |
| K114 | Cancel-race norms vs the unreproduced hypothesis; F10 apparatus exists | reconciled (design target vs sequencing) | none |
| K115 | "No GitHub CI" (04:35) vs committed ci.yml and "no new GitHub CI" (README:28, SKILL:30) | resolved (scope split); C1345 REFUTED | M101 |
| K116 | "All rows below are proposed work, not already delivered" vs two closed beads with landed receipts | resolved (narrowing); C1305 REFUTED | M102 |
| K117 | Program baselines vs the Nov-4 pins carried by the bead descriptions | pin inconsistency (owner re-pin owed) | M119 |

---

## K101 — README:22 "Critical before an effectful run" vs the BEAD-PLAN graph the program orders reused

Claims: C1427 (README:22, NON-EPISTEMIC); C1304, C1316 (04:3 "Reuse its dependency graph and original labels", 04:16 first joint live row); C1552 (orig C1252, 02:33 "use the existing bead groups"); C1340 (04:35 refresh branches)
Status: **CONTESTED** — two normative orderings inside one artifact lineage (from K-g03-01, lens-negative[20])

### Evidence for C1427's ordering
- `pi@d7666a76f561` README.md L22: "**Critical before an effectful run:** Pi dirty-worktree cleanup may discard changes after preservation failure; registered detached Claude grant construction contradicts the host validator; per-agent skip during asynchronous startup may be missed; and replay does not yet bind source/skills/provider revisions."
- 04:7-10 place B-detached-grants and B-source/B-replay in "P1" rows above the "First joint live" row (Stage column reads as sequencing).

### Evidence for the BEAD-PLAN ordering
- `pi@d7666a76f561` triage/requirements/BEAD-PLAN.md L35: "| 19 | B-git-census | PI-3 | EAT-R053..EAT-R056 (4) | B-preserve, B-dispatch, B-outcomes, B-effects | MW-HOST, MW-CANCEL | PI-GIT-CENSUS-LIVE | no — live evidence cut; gated PI-GIT-CENSUS-LIVE after dispatch lands |"
- BEAD-PLAN.md L165: "Note: PI-3 is embedded-first. Detached repair and native HX certification are not false blockers. Cancellation experiment must be dispositioned ..."
- BEAD-PLAN.md L26: row 10 B-replay has no dependant.
- `pi@d7666a76f561` 04-implementation-program.md L3: "Reuse its dependency graph and original labels."

### Reconciliation attempts
- scope split: read "effectful run" as "any run including detached mode" — README does not say so, and the embedded-first live cut is itself effectful (Claude writer + Forge).
- version split: none; both texts are in one commit.
- semantic split: "Critical" as priority, not as a blocker — plausible, but 04's Stage column ("P1" above "First joint live") reads as sequencing.

### What would settle it
An owner ruling recorded on wb-p3i2 (B-git-census) naming its blockers, or the README:22 / Stage-table wording of M112/M113 carrying BEAD-PLAN's Depends-on column.

## K102 — "Never remove or weaken a safety test" vs B-preserve's "no false-clean" and the committed lossy characterization test

Claims: C1344 (04:35); C1306, C1333, C1358 (04:7, 04:28, 05:11); C1621 (orig C1321, 03:47 "dirty worktree remain observable and recoverable"); C1542 (orig C1242); C1133, C1135 (01:22)
Status: **CONTESTED** within the Nov-6 text; reconcilable by the Nov-4 BEAD-PLAN rule 8 the program incorporates by reference (from K-g03-02, KG02-N06, lens-negative[9])

### Evidence for the collision
- `pi@d7666a76f561` src/worktree.ts L176-180: `} catch { // Best effort cleanup on error  try { await removeWorktree(pi, cwd, worktree.path); } catch { /* ignore */ }  return { hasChanges: false }; }`
- `pi@d7666a76f561` test/worktree.test.ts L432, L445-446: `it("reports no changes when the preservation commit fails", ...)` ... `expect(result.hasChanges).toBe(false); expect(result.branch).toBeUndefined();`
- 04-implementation-program.md L35: "Never remove or weaken a safety test to make a gate green." (no carve-out)
- 04-implementation-program.md L7: acceptance "bytes retained, no false-clean"; 03-function-host-contract.md L47: "delayed SDK success and a dirty worktree remain observable and recoverable."

### Evidence for the reconciliation
- BEAD-PLAN.md L8: "Never weaken or delete an existing safety test to fit code. Where an existing characterization test conflicts with a required contract (B-preserve), obtain an explicit specification ruling first; the ruling is part of the cut receipt."
- Nov-4 REMEDIATION.md M008 already narrowed "the existing worktree tests exercise this outcome" to "they lock the lossy behaviour in rather than guard against it".

### Reconciliation attempts
- semantic split: a characterization test of a defect is not a "safety test" — plausible, but 04:35 gives no criterion.
- procedural: BEAD-PLAN rule 8 requires a specification ruling before the test changes. Reconciles if wb-5ik5 carries that ruling (the program nowhere names the conflicting test; grep for `worktree.test` over the eight artifact files returns 0 hits).

### What would settle it
The specification ruling for B-preserve in the wb-5ik5 cut receipt (the BEAD-PLAN mechanism), or the one-clause carve-out of M116 on 04:35.

## K103 — MW-R1..R7 track labels, "Mechanical-owned" header and dropped external gates vs the Nov-4 mw-* tracks / tracker bead wb-1zn2 / the MW-R3 dependency of "native cancel"

Claims: C1322-C1328 (04:22 MW-R1..R7, NON-EPISTEMIC); C1304 (04:3); C1315 (04:15 "native cancel"), C1362 (05:15 "stop during edit"), C1319, C1367
Status: **UNRECONCILED omission** (label vocabularies unmapped; External/Gate columns absent from the Stage rows) — not a factual contradiction (from K-g03-03, lens-negative[21])

### Evidence
- `pi@d7666a76f561` 04-implementation-program.md L22: "MW-R1 installed rig host export; MW-R2 callback bundle; MW-R3 active cancellation/replay/effect control; MW-R4 joint native journey; MW-R5 native HX/RF; MW-R6 Furnace; MW-R7 coordination."
- `mw-tip@6e15a4245d3f` docs/programs/pi-workbench-interoperability-audit-2026-11-06/03-delivery-program.md L7-15 defines MW-R0..MW-R8; owner column "Both" for MW-R4, "HX/RF native producer" for MW-R5, "Furnace native SDK + Pi detached host" for MW-R6.
- `mw@97e18068f399` `git ls-tree --name-only 97e18068 docs/programs/`: no companion directory — the labels resolve only at tip.
- BEAD-PLAN.md L230-235: Nov-4 tracks mw-contract/mw-host/mw-cancel/mw-native/mw-furnace/mw-coordination (EAT-R088..R093); `.beads/issues.jsonl` wb-1zn2: "close only when every named gate (MW-CONTRACT, MW-HOST, MW-CANCEL, MW-NATIVE, MW-FURNACE, MW-COORDINATION) is delivered".
- 04:15 and 05:15 require "native cancel" / "stop during edit", which `apps/development-rig/src/claude-implement.ts` L37-41 says the rig does not implement ("an abort during a running session is not handled by this slice"); BEAD-PLAN row 16 gates that leg on MW-CANCEL; the Stage row carries no gate.

### Reconciliation attempts
- A plausible map exists (MW-R1≈mw-host, MW-R3≈mw-cancel, MW-R5≈mw-native, MW-R6≈mw-furnace, MW-R7≈mw-coordination; mw-contract ≈ the joint ABI ruling inside MW-R1; MW-R2/R4/R8 new) but is written nowhere in the Pi artifact.
- "**Mechanical-owned** tracks" vs the companion's "Both"/producer owners for R4-R6: a scope overstatement, not a factual contradiction.

### What would settle it
A label map (MW-Rn ↔ mw-* / EAT-R088..R093) in 04:22 or on wb-1zn2 (M115, candidate map, MW-owner confirmation deferred), and restored External/Gate cells on the Stage rows that depend on MW deliveries (M113, M114).

## K104 — doc 03:19 bans generic "profile"/"mode" aliases while the same commit's hosting guide, the MW companion skill and shipped MW code use the words

Claims: C1576 (orig C1276, 03:19); C1545 (orig C1245, 02:27 "Neither is a deployed ABI"); C1555 (orig C1255); C1458 (hosting.md:17); C1498, C1499 (SKILL:23)
Status: reconciled by **semantic split** (request-side ABI selector vs prose / result-side literal); artifact consistency defect owed to wb-12x1 / wb-w8fk (from KG02-N02, K-g03-04, lens-logic[9], lens-negative[16])

### Evidence for the ban
- `pi@d7666a76f561` 03-function-host-contract.md L19: "Do not ship generic “profile” or “mode” aliases without both-repository ABI approval."
- Nov-4 CONTRADICTIONS.md L22: "| KU10 | `profile` (Pi doc) vs `mode` (MW doc) | KG02-03 | CONTESTED (two NON-EPISTEMIC proposals disagree) | pin: neither token shipped |"

### Evidence of generic words still live
- `pi@d7666a76f561` docs/workbench/mechanical-function-hosting.md L17: "Native HX, committed RF, detached and Furnace host modes are separately gated after the first Git-census/plain vertical."
- `mw@97e18068f399` .agents/skills/mechanical-pi-host/SKILL.md L26: "6. Use Git-census mode first with explicit label; require real task-scope HX and committed RF evidence to graduate to native profile."
- `mw@97e18068f399` apps/development-rig/src/live-development.ts L19-22: `export interface LiveDevelopmentResult { readonly mode: "live-claude-forge"; readonly discovery: "git-tracked-files"; readonly context: "plain-task-context" | "reactive-fiber";` (present identically at the Nov-4 MW baseline 0c78e253)

### Reconciliation attempts
- semantic split: the ban targets request-side selector names; hosting.md:17 and MW SKILL:26 are prose, and the MW `mode` member is a result-side literal, not a selector with the KU10 value set. Reconciles — but the prose surfaces are exactly the "stale user-facing current guidance" C1555 orders updated, and the MW tip SKILL (6e15a424) is where to check whether the wording moved.
- the request-side absence claim (C1545) stands; the result-side `mode` field must be named when the alias ban is implemented.

### What would settle it
A joint ABI ruling (wb-w8fk) naming the selectors and stating what happens to the MW result-side `mode` member; the hosting.md/SKILL wording pass of M117.

## K105 — Companion MW program cited at a baseline where it does not exist (unpinned moving-ref links)

Claims: C1406 (README:5, ESTABLISHED at mw-tip only, overclaims); C1562 (orig C1262, 03:3 alignment norm); C1465 (SKILL:8 companion skill); C1311, C1322-C1328 (04:11, 04:22); C1498, C1499 (SKILL:23); C1376 (05:34)
Status: reconciled by **version split** (true at mw-tip 6e15a424, false at the stated baseline 97e18068); recorded as a pin/baseline defect of the artifact (from KG02-N01, lens-provenance[7], lens-scope[3], lens-logic[7], lens-negative[15])

### Evidence for the presupposition (companion exists)
- `mw-tip@6e15a4245d3f` docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md L3: "**Proposal only; do not treat names or types below as shipped APIs.** This adopts one vocabulary to resolve the November 4 Pi `profile` versus Mechanical `mode` proposal conflict (KU10);"
- mw-tip commit: "2ea69445 2026-11-06 17:45:07 -0800 docs(interop): reconcile Pi function host audit, feedback and delivery program" (seven minutes before the Pi program commit, same author)

### Evidence against (at the program's own stated baseline)
- `pi@d7666a76f561` README.md L3: "Baseline: Pi `master` at `278c8f79a3a1d078cfcfbd5b6661a8d321c5a505`; MechanicalWorkflows `main` at `97e18068f3996d9a3faf242c089691b049ed04ac`. Re-pin before implementation."
- `mw@97e18068f399` `git ls-tree --name-only 97e18068 docs/programs/` lists eight entries and no `pi-workbench-interoperability-audit-2026-11-06` (re-read by the roll-up: present at `6e15a4245d3f`, absent at `97e18068`).
- `pi@d7666a76f561` 03-function-host-contract.md L3 and README.md L5 link `.../blob/main/...` and `.../tree/main/...` (moving refs, no pin).

### Reconciliation attempts
- version split: true at mw-tip, false at the stated baseline. Reconciles.
- provenance: the companion is the same authorial lineage (paired `docs(interop)` commits), so even at the tip it is a counterpart to align with, not independent adoption or corroboration.

### What would settle it
A re-pinned README MW baseline naming 6e15a4245d3f (or later) — an owner decision (M109, deferred) — and pinned links in README:5 / 03:3 (M109, M110); for adoption, a conformance test or signed acceptance from both repositories (wb-w8fk / wb-0gbh).

## K106 — Execution-axis value set silently revised against the Nov-4 proposal

Claims: C1606 (orig C1306, 03:36) vs prior C0562 (Nov-4 02-host-architecture-and-protocol.md L62)
Status: reconciled by **version split** (two proposals two days apart, same author; the later supersedes); **fidelity defect** — the reconciliation program does not mark the change (from KG02-N03)

### Evidence for C1606
- `pi@d7666a76f561` 03-function-host-contract.md L36: "- **Execution:** queued, running, settled, failed, unknown."

### Evidence for C0562
- Nov-4 CLAIMS.jsonl C0562 proposition: "The observation terminal is reported separately with executionStatus in {running, completed, failed, cancelled, unknown}, domainOutcome in {verified_candidate, verification_failed, needs_evidence, indeterminate} or absent, plus freshness, coverage, and producer/native references."

### Reconciliation attempts
- version split: both NON-EPISTEMIC proposals; the later one supersedes. Reconciles as a design choice.
- fidelity: README L5 states the program "reconciles, rather than silently rewrites" the Nov-4 design; here a value set changed ("completed"/"cancelled" out, "queued"/"settled" in) with no note, and "cancelled" leaves the execution axis while 03:47 (C1619, orig C1319) requires distinguishing three cancel kinds. `supersedes_faithful=false` records the silence, not a misquotation.

### What would settle it
One sentence in doc 03 (M111) naming the Nov-4 enumeration and the reason, and stating where a cancelled execution is represented (owner decision; wb-9a1o acceptance).

## K107 — "Update stale user-facing current guidance" vs feature-matrix.md:112 still false at the pin

Claims: C1555 (orig C1255, 02:33); C1539, C1537 (orig C1239, C1237, 02:24); C1245 (01:42 norm); C1389, C1343, C1460 (W11 "planned")
Status: not a factual contradiction; an **unmet norm at the artifact pin** (remediation target wb-12x1) (from KG02-N04, lens-scope[9], lens-negative[4])

### Evidence
- `pi@d7666a76f561` docs/workbench/feature-matrix.md L112: "No binding-host code or tests exist: grep -ril mechanical over src/ and test/ matches only an incidental word ('cheap mechanical stages') in src/workflow/tool-description.ts; no src/workbench module, no test file." (re-read by the roll-up; also "Beads wb-04s (W11) status=blocked and wb-w12 (VC-3 epic) status=blocked; no other W11 beads", false since epic wb-1a3t and the MWI beads were filed)
- `pi@d7666a76f561` `grep -rli mechanical src/` -> src/workbench/collective-event.ts, src/workflow/tool-description.ts; collective-event.ts added by f65860e1 (2026-10-28); test/ holds workbench-collective-event, mechanical-evidence-census, mw-intent-host-census and hx-task-scope-probe tests.
- `pi@d7666a76f561` `git show --stat d7666a76` lists 10 files; feature-matrix.md is not among them.
- `pi@d7666a76f561` 02-feedback-and-epistemics.md L33: "Update stale user-facing current guidance in this program and the skill; the dated prior audit remains provenance, not normative present state."
- Nov-4 C0457 (NON-EPISTEMIC): "Update docs, status matrix and this skill in the same code cut" — the status-matrix clause is not restated by C1555.

### Reconciliation attempts
- scope split: C1555's own scope is "this program and the skill"; feature-matrix.md is outside it. But SKILL.md L8 directs readers to "W11 in docs/workbench/feature-matrix.md", so the stale sentence is user-facing current guidance by the program's own routing. The status word `planned` itself remains correct (C1389, C1343).

### What would settle it
A commit amending feature-matrix.md:112 (M118, deferred to wb-12x1) and hosting.md:17 (M117), or an explicit statement that W11's matrix row is historical.

## K108 — "overlooked existing collective-event.ts" vs the dates: the W11 sentence predates the file

Claims: C1244 (01:42, SUPPORTED, overclaims; supersedes C0161, C0436); C1245 (norm) inherits; C1129
Status: reconciled by **temporal split** — "stale at the pin" is SUPPORTED; the authorial "overlooked" reading is not (from KG01-02)

### Evidence for the present-tense reading
- `pi@d7666a76f561` docs/workbench/feature-matrix.md L112 (above) — false at the pin: src/workbench/collective-event.ts L2-3 exists; test/workbench-collective-event.test.ts exists; `grep -rli mechanical src/` returns collective-event.ts.

### Evidence against the authorial reading
- `git blame -L 112,112 docs/workbench/feature-matrix.md` -> 10a67e73 2026-10-15; `git log --diff-filter=A -- src/workbench/collective-event.ts` -> f65860e1 2026-10-28; `git log -3 -- docs/workbench/feature-matrix.md` -> last change 2beb771a 2026-10-27 (never revisited after the file landed).
- The Nov-4 ledger already graded the sentence "stale at the pin" (C0163, C0182 permitted wordings).

### Reconciliation attempts
- temporal split: true when written (2026-10-15), stale since 2026-10-28, still published at d7666a76. Reconciles under "stale", not "overlooked".
- process observation: d7666a76 states the norm "Avoid old blanket absence language" (C1245) and leaves feature-matrix.md:112 unamended.

### What would settle it
Wording repair M104 plus the docs bead wb-12x1 amending feature-matrix.md:112 (M118).

## K109 — "CORRECTED, not open P0" names a priority the superseded Pi row never carried

Claims: C1204 (01:36, NON-EPISTEMIC, `supersedes_faithful=false`, overclaims; supersedes C0199); touches C1200, C1203 (ESTABLISHED, unaffected)
Status: reconciled by **source split** (from KG01-01)

### Evidence for the artifact wording
- `pi@d7666a76f561` 01-current-system-audit.md L36: "**CORRECTED, not open P0 — Descriptor drift.** Mechanical commit `1f29daa7` repaired schema refs ..."
- `mw@97e18068f399` docs/programs/pi-workbench-interop-2026-11-04/01-audit-and-status.md L20: "### MW-P0 — Committed descriptor cannot pass its implemented host predicate" (the only P0 label for this item in either lineage)

### Evidence against the attribution
- `pi@d7666a76f561` mechanical-workflows-interop-2026-11-04/01-audit-and-evidence.md L29: "### P1: checked-in Mechanical descriptor conflicts with its own loader"
- `pi@d7666a76f561` triage/epistemic-triage/CLAIMS.jsonl C0199 [NON-EPISTEMIC]: "The descriptor/loader conflict is priority P1."
- The claims-part-01 proposition for C1204 adds "(or P1)", which the artifact does not say (extraction note on the row).

### Reconciliation attempts
- source split: the "P0" is the MW Nov-4 companion's MW-P0; the Pi Nov-4 program and its ledger said P1. Both are closed by 1f29daa7 (C1200/C1203 ESTABLISHED). The substance "CORRECTED" is faithful; the priority attribution is not.
- semantic: "not open P0" as a present-status statement is true but says nothing about the superseded row, and the rhetorical contrast still implies a prior P0.

### What would settle it
Wording repair only (M103). No evidence is missing.

## K110 — Pin-relative absence and "currently" claims vs unlanded machine branches that already change the cited files

Claims: the 47 members of families F01 (worktree), F02 (detached grants), F04 (replay basis), F09 (no Mechanical host) across docs 01/02/README/hosting/SKILL (e.g. C1122, C1131-C1137, C1542, C1423, C1477, C1478; C1151-C1155, C1424, C1480, C1481; C1171-C1176, C1426; C1144, C1147, C1181, C1182, C1538, C1557, C1434, C1441, C1470); the MW-side analogues C1214-C1217 by analogy (no MW branch survey was done; MW tip drift is docs-only)
Status: **not a contradiction at the pins** (every claim is graded at the tracked default-branch tree d7666a76 as the method sentence declares); recorded as a standing TEMPORAL/SCOPE defeater that travels with each row (`scope_restrictions` on these 47 rows; 88 rows carry a restriction of any kind) (from KG01-03)

### Evidence for the claims (at the pin)
- Each row's dossier: worktree.ts L177-181 catch, claude-host.ts L166-175 replayBasis, hosts/ listing, mechanical grep — as the artifact states.
- `pi@d7666a76f561` 01-current-system-audit.md L3: "unlanded machine branches and external journals were not enumerated" (C1104, ESTABLISHED: the bound is declared)

### Evidence that the world has moved past the pin
- pin clone `git branch -r`: 1137 remote refs; 40 machine/flywheel/* branches ahead of d7666a76; 8 touch MWI-relevant files (g01 probe)
- `git log HEAD..origin/machine/flywheel/wb-5ik5`: "e76448ea 2026-11-06 fix(worktree): wb-5ik5 keep the edited worktree when Git preservation fails and answer with the typed preservation-failed result (EAT-R001..", plus cuts #2/#3 dated 2026-11-06/07
- `git log HEAD..origin/machine/flywheel/wb-413a`: "2f0fedd3 2026-11-06 feat(workbench): wb-413a bind Claude agent replay to measured source, instruction and provider readings; an unknown reading replays nothing"
- `git diff --name-only HEAD...origin/machine/flywheel/wb-ocie`: src/workbench/mechanical-descriptor.ts, test/workbench-mechanical-descriptor.test.ts (a descriptor boundary, still not a host); wb-ny54 / wb-s8rm add admission tests; no branch registers a host

### Reconciliation attempts
- scope split: the artifact's own method sentence confines every finding to the tracked default-branch trees; the rows' `time_version` pins them. Reconciles. README:22 "Critical before an effectful run" and SKILL:14-15 use bare present tense and must be read with the same bound.
- version split for the future: a re-grade at a later master tip is owed once wb-5ik5/wb-413a/wb-ocie land; their content was NOT inspected for correctness or pass here (not run).

### What would settle it
Re-grade of the affected rows at the post-landing master tip (Phase 11 `READJUDICATION-<date>.md`); until then the permitted wording for every affected row is "at pi d7666a76 (tracked tree)".

## K111 — "Mid-session cancel ... remain to implement" vs a recorded mid-gate Forge cancel

Claims: C1214 (01:38, SUPPORTED, overclaims); C1218 (ESTABLISHED, unaffected); C1485 (SKILL:15), C1536 (orig C1236) carry the Claude-session scope
Status: reconciled by **semantic split** (from KG01-04, lens-negative[14])

### Evidence for the claim
- `mw@97e18068f399` apps/development-rig/src/claude-implement.ts L37-41: "It is not forwarded to the SDK and an abort during a running session is not handled by this slice."; the agentQuery options literal (L91-99, used at L114) carries no signal or controller; `grep -rn 'abortController|AbortController' apps/development-rig/src` -> 0

### Evidence against the unqualified wording
- `mw@97e18068f399` docs/10-current-state-and-gaps.md L141: "A mid-gate cancel through the public Forge SDK was accepted and established by the operation's own terminal; the host now reads it as `FORGE_OPERATION_CANCELLED` with the operation id and never as a verdict." (2026-10-15)

### Reconciliation attempts
- semantic split: host-initiated cancellation of the running Claude SDK implement session (absent) vs reading a producer-side cancellation of a Forge operation (present at the gate leg). Reconciles.

### What would settle it
Wording repair M105 ("mid-session cancel of the running Claude SDK session").

## K112 — "no-duplicate effects remain to implement" vs an existing idempotency fingerprint

Claims: C1217 (01:38, SUPPORTED, overclaims)
Status: reconciled by **scope split** (from KG01-05)

### Evidence for the claim
- `mw@97e18068f399` `grep -rn -i -E 'exactly.once|at.most.once|idempoten' apps/development-rig/src packages/development/src` (re-run read-only by the roll-up): hits only in git-source-publication.ts (43, 74-75, 107) and rf-workload.ts:37 (`RF_IDEMPOTENCY_KEY_CONFLICT` refusal roster); no general effect-dedup layer for develop() effects

### Evidence against the blanket wording
- `mw@97e18068f399` apps/development-rig/src/git-source-publication.ts L43, L74-75: "readonly idempotencyKey:string; ... if(candidate.idempotencyKey!==publicationSemanticKey(...)) return \"IDEMPOTENCY_FINGERPRINT_INVALID\";"

### Reconciliation attempts
- scope split: a per-effect-type idempotency fingerprint exists for Git-source publication; no host-level guarantee covers develop() effects generally. Reconciles.

### What would settle it
A definition of the effect classes the guarantee must cover (doc 03 effects cut, wb-mwsy); then the absence becomes testable rather than lexical. Wording repair M106.

## K113 — Ledger proposition "develop/developLive options" vs the component the signal was added to

Claims: C1210 (01:38, ESTABLISHED for the artifact wording; the claims-part-01 proposition overreaches); C1533 (orig C1233, 02:23 "A Mechanical AbortSignal exists" — component-ambiguous)
Status: reconciled by narrowing; an **extraction defect**, not an artifact defect (from KG01-06, lens-fidelity[16])

### Evidence
- `mw@97e18068f399` `git show f7c0a943 --stat`: files apps/development-rig/src/claude-implement.ts, live-development.ts, two rig tests, docs/06 — no packages/development path
- `mw@97e18068f399` `grep -rn 'signal|AbortSignal' packages/development/src/*.ts` -> 0 hits
- `mw@97e18068f399` apps/development-rig/src/live-development.ts L34: "export interface LiveDevelopmentOptions extends AgentOptions {"

### Reconciliation attempts
- narrowing: the signal lives on the rig's AgentOptions (inherited by LiveDevelopmentOptions, i.e. developLive/runClaudeImplementation); the library's develop(services, request) has none. The artifact sentence names only the commit and the option, so it is exact.

### What would settle it
Ledger-only repair M120 (drop "develop" from the proposition); no artifact change.

## K114 — Cancel-race norms stated imperatively while the motivating race is an unreproduced hypothesis; the parked-barrier apparatus already exists for the run-wide signal

Claims: C1162 (01:28 HYPOTHESIS, SUPPORTED), C1164 (norm); C1543 (orig C1243, 02:26); C1617, C1618 (orig C1317, C1318, 03:47 norms); C1308, C1309 (04:9); C1425 (README:22), C1482 (SKILL:14)
Status: reconciled (design target vs sequencing); nuance recorded that lowers the cost of the owed experiment (from KG01-07, KG02-N05, lens-negative[7])

### Evidence
- `pi@d7666a76f561` src/workbench/claude-host.ts L207 (awaits config.beforeDispatch), L215 (re-checks only the workflow-wide signal), L220 (registers the AbortController), L341-344 (abortAgent aborts a registered controller only; pendingLookupAborts handles the resume path only)
- `pi@d7666a76f561` test/workbench-claude-cancel-faults.test.ts L535-553: F10 parks beforeDispatch, aborts the RUN signal, releases, asserts `sdk.calls` has length 0; every `host.abortAgent(...)` call in that file occurs after a session/init exists
- `pi@d7666a76f561` 02-feedback-and-epistemics.md L26: "per-agent `beforeDispatch` late launch is a **hypothesis**, not reproduced by this audit."; 04:9 "code fix not claimed from hypothesis alone"; `.beads/issues.jsonl` wb-9v02 in_progress

### Reconciliation attempts
- semantic split: the apparatus the norm asks for exists for the run-wide signal (F10); the per-agent variant is what is missing. The hypothesis stays SUPPORTED by code reading and unreproduced at runtime; the 03:47 norms are contract targets sequenced behind wb-9v02. Reconciles.

### What would settle it
F10 with `host.abortAgent("wf-agent-1")` in place of `run.abort()`, asserting zero SDK calls and a skipped settlement (wb-9v02).

## K115 — "No GitHub CI" (04:35) vs pi-subagents' committed CI workflow and the same commit's "no new GitHub CI" (README:28, SKILL:30)

Claims: C1345 (04:35, **REFUTED** as an observation, overclaims); C1346 (norm "use Forge", stands independently); C1433, C14115 (narrowed norms); prior C0422/C0394 (Nov-4 M047)
Status: resolved by **scope split** — recorded because 04:35 regresses a Nov-4 remediation (from K-g03-05, lens-negative[5])

### Evidence
- `pi@d7666a76f561` .github/workflows/ci.yml L1-7: "name: CI\n\non:\n  push:\n    branches: [master]\n  pull_request:\n    branches: [master]"; L18-22: "- run: npm ci\n      - run: npm run lint\n      - run: npm run typecheck\n      - run: npm run typecheck:test\n      - run: npm run test" (file re-listed by the roll-up: `.github/workflows/ci.yml` exists at the pin; MW has no `.github` at pin or tip)
- 04-implementation-program.md L35: "No GitHub CI; use Forge."; README.md L28 / SKILL.md L30: "no new GitHub CI"
- Nov-4 REMEDIATION.md M047: "Do not add or rely on GitHub CI for this program (Pi's pre-existing `.github/workflows/ci.yml` is out of scope)"
- `pi@d7666a76f561` AGENTS.md L167: "- Use Forge for project build/test/package integration, do not add GitHub CI, and do not introduce Library as a dependency."

### What would settle it
Rewrite 04:35 to the M047 form (M101). Propagation: C1346's derivation from C1345 is broken; C1346 stands on AGENTS.md:167.

## K116 — "All rows below are proposed work, not already delivered" (04:3) vs two closed beads with landed receipts

Claims: C1305 (04:3, **REFUTED** as a universal, overclaims); C1321 (04:20 "Every cut must satisfy ... B-unknowns/B-hx-evidence")
Status: resolved by **narrowing** — recorded because a reader could re-file delivered evidence cuts (from K-g03-06)

### Evidence
- `pi@d7666a76f561` .beads/issues.jsonl — wb-muip (B-unknowns) status closed, closed_at 2026-11-06T13:10:35Z; wb-f3wd (B-hx-evidence) status closed, closed_at 2026-11-06T18:27:50Z (re-read by the roll-up by JSON parse)
- docs/workbench/receipts/wb-muip.md, wb-f3wd.md — landed 2026-11-06 09:35Z / 12:45Z (git log), before d7666a76 (2026-11-07 01:52Z); cited by the program at 01:40 and 02:28
- 04-implementation-program.md L20 — the "Every cut" row names `B-unknowns`, `B-hx-evidence`

### Rival reading preserved
"Rows" as continuing per-cut obligations rather than bead deliveries; under that reading the sentence is a reading rule and should not say "not already delivered".

### What would settle it
Owner wording excluding the landed evidence cuts (M102).

## K117 — Program baselines (README:3) vs the Nov-4 pins carried by the bead descriptions the program binds work to

Claims: C1552 (orig C1252, 02:33); C1301, C1494 (no fabricated Beads IDs / name exact pins); C1402, C1403 (README:3 baselines)
Status: **not a contradiction**; a pin inconsistency between the program and the ledger-in-repo (owner re-pin owed) (from lens-negative[29], KG02 scope note on C1252)

### Evidence
- `pi@d7666a76f561` .beads/issues.jsonl wb-1a3t description (re-read by the roll-up): "PROGRAM: docs/workbench/programs/mechanical-workflows-interop-2026-11-04 (doc pin 7c80c34346c2; env pins pi b27829e6dfa7 / mw f7c0a9431d6c) | STATEMENT: implement the Pi-side obligations of the interop program per the epistemic triage (490 claims; 143 atomic requirements EAT-R001..R143; ..."
- `pi@d7666a76f561` README.md L3: "Baseline: Pi `master` at `278c8f79...`; MechanicalWorkflows `main` at `97e18068...`. Re-pin before implementation."
- mw f7c0a943 is one commit before 97e18068 (`git log --oneline -6` at the MW pin); pi b27829e6 is older than 278c8f79.

### Reconciliation attempts
- the program orders reuse of the groups (02:33, 04:3) and "Re-pin before implementation" (README:3) but never says the bead descriptions themselves must be re-pinned; a seat reading the bead sees a different MW baseline than the program states.

### What would settle it
A bead-description re-pin under wb-cbt4 (master-recon) and the README:3 sentence of M119.

---

## Appendix — corpus defect (not an artifact contradiction)

The Phase-1 claim-id space was not unique across the four claims-part files: C1201-C1257 named different propositions in claims-part-01 (doc 01) and claims-part-02 (docs 02/03), and C1301-C1331 differed between claims-part-02 and claims-part-03 (doc 04) — 76 duplicated ids (lens-scope[13], lens-logic[15], lens-fidelity[24], lens-negative[1]). The merged ledger resolves it by re-keying every part-02 id +300 (C1201..C1331 -> C1501..C1631); `original_id`, `part` and `claim_file` are carried on every row, relation rows from g02 were re-keyed, and the 99 lens rows were re-resolved id by id (`LENSES.jsonl`; two lens citations were resolved by content with a recorded note). Dossier files keep their original names (`<Cid>.g02.md` for g02 collisions, `<Cid>-part03.md` for part-03 collisions, `<Cid>.g01.md` for g01 collisions) and are pointed to by the `dossier` field.
