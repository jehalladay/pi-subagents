# EPISTEMIC-AUDIT — mechanical-interoperability-audit-2026-11-06 (the Pi <-> MechanicalWorkflows RECONCILIATION program)

Roll-up of Phases 6-8 (merge, cross-group propagation, deliverables), 2026-11-07. Four claim parts, three investigator groups, five lenses, three contradiction parts and 343 dossiers were merged; nothing was run against the subjects (static reads and read-only `git`/`grep`/`ls` probes only). Counts below are descriptive; there is no scalar confidence score.

## 1. Pinned substrate

- **ARTIFACT (document pin) = ENVIRONMENT pin (Pi):** pi-subagents `d7666a76f5618dff61140dff20dde6ea64967814` — `docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/{README,01,02,03,04,05}.md`, `docs/workbench/mechanical-function-hosting.md`, `.agents/skills/pi-mechanical-interop/SKILL.md`. d7666a76 is the direct child of the program-stated Pi baseline 278c8f79 (`rev-list --count` = 1) and changes ten `.md` files only (+282/-25), so every `src/`, `test/`, `qa/` and manifest citation is byte-identical at the baseline and at the pin. Two of the ten changed files lie outside the audited set: `docs/workbench/README.md` (+4: "Reconciled ... supersedes the November 4 program for current-state findings") and the Nov-4 program README (Status line "NEW" -> "HISTORICAL DESIGN PROGRAM"); neither touches the Nov-4 triage ledger.
- **ENVIRONMENT pin (MW):** MechanicalWorkflows `97e18068f3996d9a3faf242c089691b049ed04ac` (the program's stated baseline; 1f29daa7 and f7c0a943 verified ancestors). **Drift:** origin/main at triage start = `6e15a4245d3f`, two commits past the pin — 2ea69445 "docs(interop): reconcile Pi function host audit, feedback and delivery program" (2026-11-06 17:45:07 -0800) and 6e15a424 "docs(interop): normalize markdown code formatting and current-state link" (17:45:57 -0800); `git diff --name-only 97e18068 6e15a4245d3f` lists ten files, all `.md` (`.agents/skills/mechanical-pi-host/SKILL.md`, `AGENTS.md`, `apps/development-rig/README.md`, `docs/10-current-state-and-gaps.md`, `docs/README.md`, five companion-program files). No MW code, contract, test or manifest moved, so every MW code grade holds at the tip; the drift matters for exactly one thing (§11).
- **PRIOR AUDIT (provenance only):** Nov-4 triage ledger at the pin (490 claims C0101-C0599, REMEDIATION M001-M050, EAT-R001-R143, BEAD-PLAN 25 groups). 328 prior ids are superseded by 312 new rows over 621 `supersedes` links on the claim rows (626 `SUPERSEDES` relation rows, the groups having recorded a few prior links the extractors did not); no prior id or grade was changed. 162 prior ids are not linked by any new row (Nov-4 propositions the new program drops, absorbs or no longer restates; computable from `RELATIONS.jsonl` as the C0xxx ids with no incoming `SUPERSEDES`).
- **Corpus defect resolved here:** the Phase-1 claim-id space was not unique (76 ids reused across claims-part-01/02 and 02/03). The merged ledger re-keys every part-02 id +300 (C1201..C1331 -> C1501..C1631), carries `original_id`/`part`/`claim_file`/`dossier` on every row, re-keys g02's relation rows and re-resolves all 99 lens rows (two citations resolved by content with a note). Dossier files keep their names.
- **Beads the program binds to** (not re-pinned by the program, §4 defect 12): epic wb-1a3t with 27 group beads; wb-muip and wb-f3wd closed 2026-11-06 with landed receipts; wb-9v02 in_progress; wb-1zn2 deferred.

## 2. Claim inventory

| Status | Rows | Material | Part 01 (doc 01) | Part 02 (docs 02+03) | Part 03 (docs 04+05) | Part 04 (README+hosting+SKILL) |
|---|---|---|---|---|---|---|
| ESTABLISHED | 183 | 113 | 84 | 39 | 3 | 57 |
| SUPPORTED | 38 | 21 | 19 | 11 | 2 | 6 |
| PLAUSIBLE | 0 | 0 | 0 | 0 | 0 | 0 |
| UNSUPPORTED | 0 | 0 | 0 | 0 | 0 | 0 |
| CONTESTED (claim-level) | 0 | 0 | 0 | 0 | 0 | 0 |
| REFUTED | 2 | 2 | 0 | 0 | 2 | 0 |
| UNDETERMINED (claim-level) | 0 | 0 | 0 | 0 | 0 | 0 |
| NON-EPISTEMIC | 236 | 207 | 20 | 78 | 80 | 58 |
| **Total** | **459** | **343** | 123 | 128 | 87 | 121 |

By kind: OBSERVATION 144 (125 ESTABLISHED, 17 SUPPORTED, 1 REFUTED, 1 NON-EPISTEMIC label), SOURCE_REPORT 44 (37/7), INFERENCE 28 (18/10), FORMAL_DERIVATION 2 (ESTABLISHED), HYPOTHESIS 4 (all SUPPORTED — the cancel race, never promoted), DEFINITION 31 (29 NON-EPISTEMIC, 1 ESTABLISHED, 1 REFUTED), NORMATIVE 170, PROPOSAL 36.

Overclaims (`overclaims=true`): **10** — C1204, C1214, C1217, C1244 (doc 01); C1537, C1550, C1628 (docs 02/03; C1628 flipped by the roll-up, §7); C1305, C1345 (doc 04); C1406 (README). Supersession fidelity: `supersedes_faithful` true 314, **false 3** (C1204 P0 attribution; C1606 silent execution-axis revision; C1345 regresses Nov-4 M047), no prior 142. Rows with a named missing artifact: 21 (§10). Rows carrying a propagated scope restriction: 88 (§7). Rows with counterevidence: 32.

Deliverables: `CLAIMS.jsonl` 459, `EVIDENCE.jsonl` 626, `RELATIONS.jsonl` 1458 (630 prior-link, 102 cross-group), `LENSES.jsonl` 99, `CONTRADICTIONS.md` 17 sets, `REMEDIATION.md` 23 rows, `SOURCE-MAP.md`, 343 dossiers (one per material row).

## 3. What the reconciliation got right (ESTABLISHED at the pins; code- or receipt-witnessed outside the authorial lineage)

1. **Descriptor repair, temporally exact** (F05, 13 rows): `contracts/entrypoints/development.v1.json` at 97e18068 carries the bare schema filenames `entrypoint-host.ts:89` compares against; 1f29daa7 (2026-11-05) is the repairing commit and an ancestor of the pin; the pre-image at 0c78e253 carried `../schemas/` refs. "True at an earlier baseline, false at these pins" is faithful to the Nov-4 REFUTED/ESTABLISHED split (C0189/C0190/C0193-C0196/C0305/C0336/C0437).
2. **Dual cancel correction** (F06, 11 rows): f7c0a943 added `signal?: AbortSignal` to the rig's AgentOptions; it is consumed only by `assertNotCancelledBeforeDispatch` and "is not forwarded to the SDK" — so "no signal exists" and "active cancellation exists" are both wrong, exactly as doc 02:23 says; faithful to the Nov-4 split reading of C0229.
3. **Worktree P0 kept at its code-true strength** (F01, 11 rows): the single outer catch in `cleanupWorktree` force-removes and returns `hasChanges:false`; the loss is conditional on the failed-preservation path (C1542), the `isolation:"worktree"` escape is refused by the Claude host, and the program demands a byte-preservation test before any writer use (C1135).
4. **Detached grant contradiction, valid derivation** (F02): both registered launchers pass `grants: []` (index.ts 2628, 2881 — exactly two call sites) while `local-detached.ts:430/442` require `claude:invoke` / `claude:tool:*` for a Claude backend; C1154/C1424 are valid static derivations, scoped to Claude-backend requests.
5. **Cancel race kept a hypothesis everywhere** (F03): 01:28, 02:26, 04:9, README:22 "may be missed", SKILL:14 "hypothesized"; the structural window is code-witnessed (controller registered only after the awaited beforeDispatch; `abortAgent` aborts a registered controller only); no surface promotes it (lens-logic[3], lens-negative[7]).
6. **Replay-basis gaps by enumeration** (F04): the single `replayBasis` literal lists [cwd, model, permissionMode, settingSources, tools, roles, grants, principal] — no Git base, skill bytes, provider version or effect reference; the `WorkflowHost.replayBasis` doc comment overstates ("provider manifest") what the Claude host records.
7. **Producer evidence incorporated at its own scope** (F07, F08): every HX-probe figure (exit 3 / exit 0 / exit 4, verdict `task-scope-unsupported` at hx 0.1.0, Git-census "not blocked") and every census figure (205 entries / 56 files / 0 witnesses / four stores unread / global UNDETERMINED) appears verbatim in committed machine-seat receipts; the universal historical absence is carried as UNDETERMINED (C1256, C1493), never universalized.
8. **De-escalations that do not overcorrect** (F10, F17): `collective-event.ts` exists (so unqualified "no Mechanical code" is refuted, C1539) while the absence of any invocation host survives (F09, 17 rows, registered tool refuses non-script kinds); `node()` dispatches through `CapabilityRegistry.invoke`, so recasting the Nov-4 anti-shell sentence as normative is right (C1540/C1541).
9. **Feedback counts resolve verbatim** (doc 02 table): 42/56 refusals and 152,506 prep-seconds (2026-11-04), 175/585 export readers (2026-11-05), 3/48 census-conflict landings (2026-11-03), 398 s median npm-ci (2026-10-20), 2/9 enumerators with one EISDIR — each to a dated `new-feedback/` file; one row ("Multiple October reports") carries no counts.
10. **Fidelity to the prior ledger**: CLAIMS.jsonl 490 rows, KU10 CONTESTED, C0321/C0368 UNDETERMINED, C03114 PLAUSIBLE, C0446 SUPPORTED — read correctly; no prior id renamed, no grade overwritten (C1554 norm met by d7666a76: the diff touches no ledger file).
11. **MW packaged consumer** (F11): `apps/development-rig/package.json` declares a `bin` and no `exports`/`main`/`types`; "no stable host API export" is exact (deep `dist/` paths remain importable — the absence is of a declared API).
12. **L0 discipline**: doc 05 grades the program itself L0 ("design documentation only"); the commit shape (docs-only) corroborates "nothing executed" (C1388, C1428 SUPPORTED — uncommitted runs are unobservable from a pin).

## 4. What the reconciliation overclaims or gets wrong — material findings with final status and permitted wording

Numbered defects; the permitted wording is the `permitted_wording` field of the row; the repair is the REMEDIATION row.

1. **C1345 (04:35 "No GitHub CI; use Forge.") — REFUTED as an observation; regresses Nov-4 M047.** pi-subagents carries `.github/workflows/ci.yml` running lint/typecheck/test on master pushes and PRs. Permitted: "The program adds no GitHub CI; Pi's pre-existing ci.yml is out of the program's gate scope." README:28 and SKILL:30 already say "no new GitHub CI". C1346 "use Forge" stands on AGENTS.md:167. (M101)
2. **C1305 (04:3 "All rows below are proposed work, not already delivered.") — REFUTED as a universal.** wb-muip (B-unknowns) and wb-f3wd (B-hx-evidence) are closed beads with receipts landed before d7666a76 and cited by the program itself. Permitted: "No Stage-table deliverable other than the two landed evidence cuts (wb-muip, wb-f3wd) has landed at d7666a76." (M102)
3. **C1204 (01:36 "CORRECTED, not open P0") — NON-EPISTEMIC, overclaims, unfaithful to C0199.** The Pi lineage rated the descriptor conflict P1; "P0" is the MW companion's MW-P0. Permitted: "the program rates; the P0 attribution needs a source qualifier". (M103)
4. **C1244 (01:42 "overlooked existing collective-event.ts") — SUPPORTED, overclaims.** The W11 sentence (2026-10-15) predates the file (2026-10-28): stale, not overlooked. (M104)
5. **C1214 (01:38 "Mid-session cancel ... remain to implement") — SUPPORTED, overclaims.** True of the Claude SDK session; MW already reads a mid-gate `FORGE_OPERATION_CANCELLED` (docs/10:141). (M105)
6. **C1217 (01:38 "no-duplicate effects remain to implement") — SUPPORTED, overclaims.** No host-level guarantee for develop() effects (grep re-run: no exactly-once/at-most-once layer), but a Git-source publication idempotency fingerprint exists. (M106)
7. **C1537 (02:24 "read-only Mechanical event integration") — SUPPORTED, overclaims.** The module exists and is observation-only, but nothing under `src/` imports it: a boundary module, not an operational integration. (M107)
8. **C1550 (02:29 "established task-scope unsupported at the probed producer version") — SUPPORTED, overclaims.** The receipt bounds itself to the `find` verb and the roster; the named-query route is NOT CLAIMED. Restatements in docs 01/03, hosting.md and SKILL are report-form and stay ESTABLISHED. (M108)
9. **C1406 (README:5 companion program "on main") — ESTABLISHED at mw-tip only, overclaims; C1562 alignment norm presupposes it.** The companion directory is absent at the program's own stated MW baseline 97e18068 and was created by 2ea69445 seven minutes before the Pi commit; both links are unpinned moving refs. The companion is the same authorial lineage. (M109, M110; baseline re-pin deferred to the owner)
10. **C1606 (03:36 execution axis {queued, running, settled, failed, unknown}) — NON-EPISTEMIC, unfaithful to C0562.** The Nov-4 set {running, completed, failed, cancelled, unknown} was revised without a note although README:5 promises not to rewrite silently; `cancelled` left the axis while 03:47 distinguishes three cancel kinds. (M111)
11. **C1628 (03:51 "first Git-census remains usable") — SUPPORTED, overclaims (roll-up flip).** The probe establishes only "not blocked"; "usable" from a Pi-hosted launch is unwitnessed (the program is L0; Nov-4 C0443 was flagged the same way). SKILL:16 "still a valid limited first vertical" is the proposal form (C1488). (M123)
12. **Pin inconsistency with the ledger-in-repo (C1552, C1301, C1494; K117).** The beads the program orders reused carry the Nov-4 pins (epic wb-1a3t: pi b27829e6 / mw f7c0a943); "Re-pin before implementation" never names the bead descriptions. (M119, deferred to wb-cbt4)
13. **Two CONTESTED normative sets inside one lineage (K101, K102)** and one unreconciled omission (K103): README:22 reads as four blockers of any effectful run while the reused BEAD-PLAN makes B-git-census depend on B-preserve/B-dispatch/B-outcomes/B-effects only; 04:35 "never weaken a safety test" lacks the BEAD-PLAN rule-8 carve-out the B-preserve fix needs; MW-R1..R7 labels (defined only at mw-tip) are unmapped to the mw-*/EAT-R088-R093 tracks that wb-1zn2 gates on, and the Stage rows dropped the External/Gate column, so "native cancel"/"stop during edit" (04:15, 05:15) presuppose an MW delivery the table does not sequence. (M112-M116)
14. **Vocabulary inconsistency (K104):** doc 03:19 bans generic "profile"/"mode" aliases; hosting.md:17 in the same commit calls HX/RF/detached/Furnace "host modes", the MW companion skill at the pin says "Git-census mode ... native profile", and MW ships a result-side `LiveDevelopmentResult.mode` literal. (M117)
15. **Unmet own norm (K107):** 02:33 orders stale user-facing guidance updated; feature-matrix.md:112 (routed to by SKILL:8) is still false at the pin and d7666a76 does not touch it. (M118, deferred to wb-12x1)
16. **Understatements and decays (not overclaims):** "after commit or branch failure" names a subset of the catch's trigger set (C1133, C1423, C1477; M121); "Agents are actively landing" is a present-progressive claim verifiable only up to the pin (C1339; M122); the ledger proposition for C1210 says "develop/developLive" where the signal lives on the rig's options only (extraction defect; M120).

No ESTABLISHED current-state finding of the program was overturned at the pins. Both REFUTED rows are program-internal sentences (a regressed remediation and a universal quantifier), not reconciliation errors about the Nov-4 findings.

## 5. Contradiction sets

17 sets in `CONTRADICTIONS.md` (K101-K117): 2 CONTESTED between norms of one lineage (K101 README:22 ordering vs BEAD-PLAN; K102 safety-test norm vs B-preserve acceptance), 1 unreconciled omission (K103 MW-R labels / dropped gates), 9 reconciled by scope/version/semantic/source split with a wording repair (K104-K109, K111-K113), 2 resolved with a REFUTED row (K115, K116), 1 standing temporal defeater (K110 unlanded branches), 1 reconciled nuance (K114 cancel-race apparatus), 1 pin inconsistency (K117 bead pins). Claim-level CONTESTED = 0 (the Nov-4 precedent: norms in a contested set stay NON-EPISTEMIC; the set carries the status). The Nov-4 KU10 (`profile` vs `mode`) is closed by the new program's separated selectors as a proposal (C1546, C1498, C1499) — closed as a design choice, not as a measured fact.

## 6. Provenance and source independence

- The Pi program, hosting guide, SKILL and the MW companion program are one authorial lineage (one author; d7666a76 paired with 2ea69445/6e15a424). 155 evidence records are L1 text; they anchor claims and carry proposals, nothing more.
- 174 of 183 ESTABLISHED and 36 of 38 SUPPORTED rows have at least one witness outside L1 (Pi/MW code, tests, manifests and CI config 198 records, probes 75, producer receipts and feedback 56, repo docs/beads 16); the remainder are source reports whose subject is the Nov-4 triage or a repository document. No ESTABLISHED current-state row rests on L1 alone.
- 157 of 236 NON-EPISTEMIC rows have code- or producer-witnessed presuppositions; 79 (doc 03 axes, doc 04 acceptances, doc 05 journeys, SKILL steps) rest on L1/L2 text and carry proposal force only. The proposed ABI tokens (`mechanical.pi-host/v1`, `evidenceProfile`, `contextProfile`, `git-census-v1`, `rf-committed-v1`) occur in no code, test or third-party artifact at either pin (lens-provenance[11]).
- The Nov-4 ledger (L2) is an independent investigator lineage and is used only to judge fidelity; the Nov-4 program docs are the same author as L1.
- The producer receipts (wb-f3wd, wb-muip) are machine-seat evidence with their own detection models; every restatement stays inside them.
- Provenance defeaters are recorded on 60 `SAME_ORIGIN_AS` relations (21 restatement families) and on the 13 mw-tip companion records. See `SOURCE-MAP.md`.

## 7. Propagation results (Phase 6, across groups)

- **Status harmony across the 21 restatement families:** no family needed a status change. Where a family mixes ESTABLISHED and SUPPORTED rows (F03, F04, F06, F07, F10, F11, F13, F16, F19, F20), the weaker rows carry a weaker artifact wording, a prospective or unreproduced half, or an `overclaims` flag, all recorded on the row; the three groups graded the same current-state propositions at the same strength (e.g. worktree P0: 11/11 ESTABLISHED across g01/g02/g03; descriptor repair 13/13; grants 11/11).
- **One flag change by the roll-up:** C1628 `overclaims` false -> true (03:51 "remains usable"; lens-logic NARROWS; Nov-4 C0443 precedent). No status changed; no `verdict_history` entry is owed (statuses are unchanged; the flip is recorded in `rollup_adjustments`).
- **Scope restrictions propagated to 88 rows:** (a) K110 — 47 pin-relative absence/present-tense rows in F01/F02/F04/F09 across docs 01/02/README/hosting/SKILL carry "tracked tree at pi d7666a76 / mw 97e18068; unlanded machine branches (wb-5ik5, wb-413a, wb-ocie, wb-ny54, wb-s8rm) excluded; re-grade owed at the post-landing tip"; (b) K105 — every row citing the MW companion (C1406, C1465, C1562, C1311, C1322-C1328, C1498, C1499, C1376, C1546, C1572-C1576) carries "companion exists at mw-tip 6e15a4245d3f only; same lineage, not corroboration"; (c) the 13 F07 rows carry the hx 0.1.0 / find-verb / roster bound; (d) the 8 F08 rows carry the searched-stores bound (MW repo unread); (b) covers 20 rows.
- **Broken derivations recomputed, not propagated as falsity:** C1345 REFUTED -> C1346 ("use Forge") keeps NON-EPISTEMIC on AGENTS.md:167; C1305 REFUTED -> C1321 ("every cut must satisfy ...") read as continuing obligations. Six ESTABLISHED rows depend on a SUPPORTED premise (C1127, C1218, C1539, C1551, C1556, C1626) and each has an independent warrant path recorded in its rationale (grep witness, entailment from ESTABLISHED siblings, or verbatim receipt text), so none was downgraded.
- **Hypothesis containment:** the four HYPOTHESIS rows (C1162, C1543, C1425, C1482) and the norms motivated by them (C1164, C1617, C1618, C1308, C1309) stay SUPPORTED / NON-EPISTEMIC; 04:9 "code fix not claimed from hypothesis alone" is the program's own containment and holds.
- **Upgrade discipline checked:** the only upgrade of a prior grade — C03114 PLAUSIBLE ("installed HX may not support live native task-scope evidence") -> C1224/C1454/C1487 ESTABLISHED — is authorized by an evidence delta (the wb-f3wd producer probe), scoped to hx 0.1.0 / find. C0321 and C0368 (UNDETERMINED) stay UNDETERMINED in the new program's own words (C1254, C1549).
- **Evidence completeness:** four g01 rows cited no witness (C1112, C1128, C1180, C1242) and C1217's support had moved to counterevidence; the roll-up added verbatim pin re-reads (runtime.ts:49/919, coordination README:3, execute-tool.ts:17/113, furnace-hosted.ts:9, the idempotency grep). Every ESTABLISHED/SUPPORTED/REFUTED row now has at least one non-self support record.

## 8. Linguistic-strength transformations found

| Transformation | Rows | Status / repair |
|---|---|---|
| not blocked -> "remains usable" / "valid first vertical" | C1628, C1488 | SUPPORTED overclaims / proposal; M123 |
| stale -> "overlooked" | C1244 | SUPPORTED overclaims; M104 |
| P1 (Pi) / MW-P0 (MW) -> "not open P0" | C1204 | NON-EPISTEMIC unfaithful; M103 |
| boundary module -> "integration" | C1537 | SUPPORTED overclaims; M107 |
| find-verb / roster at hx 0.1.0 -> "established ... at the probed producer version" | C1550 | SUPPORTED overclaims; M108 |
| Claude-session cancel absent -> "Mid-session cancel ... remain to implement" | C1214 | SUPPORTED overclaims; M105 |
| one effect type carries a fingerprint -> "no-duplicate effects remain to implement" | C1217 | SUPPORTED overclaims; M106 |
| exists at tip -> "is at ... /tree/main/" (unpinned; absent at the stated baseline) | C1406, C1562 | ESTABLISHED (tip) overclaims; M109, M110 |
| "no new GitHub CI" (README, SKILL, M047) -> "No GitHub CI" (04:35) | C1345 | REFUTED; M101 |
| two landed cuts -> "All rows ... not already delivered" | C1305 | REFUTED; M102 |
| {running, completed, failed, cancelled, unknown} -> {queued, running, settled, failed, unknown} unmarked | C1606 | unfaithful; M111 |
| "Mechanical-owned" tracks vs companion owner column "Both"/producer | C1322-C1328 | NON-EPISTEMIC; M115 |
| "host modes" for evidence/context profiles vs doc 03 selector separation | C1458, C1576 | NON-EPISTEMIC; M117 |
| any failed preservation step -> "after commit or branch failure" (understatement) | C1133, C1423, C1477 | ESTABLISHED; M121 |
| cadence up to the pin -> "are actively landing" | C1339 | SUPPORTED; M122 |
| rig AgentOptions -> "develop/developLive options" (ledger extraction) | C1210 | ESTABLISHED; M120 ledger-only |

Checked and clean: the central absence (01:46) keeps "no located joined witness in those stores, not a proven universal historical absence"; every HX restatement keeps "at hx 0.1.0"; every cancel-race surface keeps "may"/"hypothesis"; doc 05 keeps the program at L0; "source presence is not a witnessed pass" is applied to every code citation (lens-negative[19] NO_DEFECT_FOUND).

## 9. Remediation summary

23 rows in `REMEDIATION.md` (M101-M123): NARROW_SCOPE 7, ADD_MISSING_PREMISE 6, ADD_TEMPORAL_QUALIFIER 5, SURFACE_DISAGREEMENT 3, ADD_SOURCE 1, DOWNGRADE_MODALITY 1. Coverage: forward — every `Claims` id is a ledger row; inverse — REFUTED (C1305, C1345) ∪ UNSUPPORTED (none) ∪ CONTESTED (none) ∪ overclaims (10) minus the `Claims` column = ∅. Six rows carry a `deferred:` clause (M109 baseline re-pin, M111 cancelled-execution placement, M112 wb-p3i2 ruling alternative, M115 MW-owner confirmation of the label map, M118 feature-matrix outside program docs, M119 bead-description re-pin) naming the owner. Tracker column names existing beads (wb-12x1 docs, wb-cbt4, wb-w8fk, wb-1zn2, wb-p3i2, wb-5ik5, wb-9a1o); no bead is filed by this roll-up.

## 10. UNDETERMINED and open questions — the artifact that would settle each

No claim is UNDETERMINED at the claim level: the program states its unknowns as scoped absences or hypotheses, and the groups graded them as such. The open evidence gaps (`missing_to_settle` on 21 rows) are:

| Question | Rows | Settling artifact (named by the rows) |
|---|---|---|
| Universal historical absence of a Pi -> Mechanical joined witness (prior C0321, carried UNDETERMINED) | C1255, C1548, C1493 | the authorized bounded external-store census the wb-muip receipt names (MW repository, shared artifact store, Claude session journals, workbench machine ledger; EAT-R080 conditions) — not run |
| Does a per-agent skip during a parked beforeDispatch let an SDK query through? | C1114, C1162, C1543, C1617 (+ C1425, C1482) | F10-style test with `host.abortAgent(agentId)` during a parked beforeDispatch asserting zero `sdk.calls` and a skipped settlement (wb-9v02, in_progress) |
| Does the worktree catch actually lose bytes (not only report false-clean)? | C1133 | injected-failure test asserting bytes before/after (wb-5ik5 cuts on the unlanded branch; not inspected, not run) |
| Does the registered detached Claude path refuse at runtime? | C1154 | runtime witness / end-to-end test of the registered path (wb-wupg) |
| Is task scope unsupported on routes the probe did not claim? | C1550, C1627 | probe of a workspace-defined named query carrying a task scope at the same hx 0.1.0 binary |
| Can Forge exit 0 with gate FAIL on other argv? (prior C0368) | C1549 | a Forge contract statement or transcript beyond the two probed argv (Forge not pinned here) |
| Is the Git-census profile usable from a Pi-hosted launch? | C1628 (C1488) | the PI-GIT-CENSUS-LIVE join (wb-p3i2) |
| What must "dirty-write reconciliation" and the no-duplicate guarantee cover? | C1215, C1217 | an MW statement of the reconciliation contract; the effect-class definition (wb-mwsy) |
| What must the packaged MW host surface export; what is the grant literal? | C1197, C1588 | the jointly adopted ABI / grant literal (wb-w8fk, B-contract-choice) |
| Forge selection-completeness fields | C1609 | a Forge contract pin |
| Is anything installed outside the tracked trees? | C1557 | inspection of the installed environment |
| Did the author review the four Nov-4 files; where are the "scratch and negative-control" positives? | C1503, C1524 | author session transcript; the dated feedback file(s) |
| Is Pi's replay identity "complete" for hosted functions? | C1176 | a joint Pi/MW replay-basis specification (makes "complete" testable) |
| Do the findings hold after wb-5ik5 / wb-413a / wb-ocie land? (K110) | 47 rows | Phase 11 re-grade at the post-landing master tip |

## 11. Drift since the pins

- **Pi:** baseline 278c8f79 -> pin d7666a76: the program commit itself, docs-only (ten `.md` files). Unlanded machine/flywheel branches (40 ahead of d7666a76; 8 touch MWI files: wb-5ik5 worktree fix e76448ea, wb-413a replay rebinding 2f0fedd3, wb-ocie descriptor boundary, wb-ny54/wb-s8rm admission tests) already change the cited files; none registers a host. Not inspected for correctness or pass.
- **MW:** pin 97e18068 -> origin/main 6e15a4245d3f: 2ea69445 + 6e15a424 (2026-11-06 17:45 -0800), docs-only (companion program directory created; companion SKILL, AGENTS.md, rig README, docs/10, docs/README edited). Material in one place only: the companion program the Pi README and doc 03 cite exists at the tip and not at the stated baseline (K105), so MW-R0..R8 labels, the companion `02-host-contract.md` tokens and the "current Mechanical companion skill" are tip-only facts. No MW code, contract, test or manifest changed; every MW code grade holds at the tip.
- **Beads:** the epic and group beads carry the Nov-4 pins (K117).

## 12. RECONCILIATION VERDICT — does this program faithfully correct the Nov-4 audit?

**Faithful in substance for current-state findings; defective in bounded, repairable places; not yet consistent with its own pins.**

- *Faithful:* every current-state correction of the Nov-4 program is code- or receipt-witnessed outside the authorial lineage and matches the Nov-4 ledger's own final grades (descriptor repair as a temporal split; cancel as a pre-dispatch-only signal; `collective-event.ts` existence; `node()` as normative; W11 staleness; wb-muip/wb-f3wd evidence at receipt scope). 314 of the 317 rows carrying a fidelity judgment are faithful (312 rows name a prior target; C1345 is judged unfaithful against M047 without a prior-id link); no C0xxx id or grade was renamed or overwritten; UNDETERMINED (C0321, C0368) stays UNDETERMINED; the one upgrade (C03114 -> ESTABLISHED) is authorized by a producer probe. The program's own epistemic discipline (L0 self-grade, "source presence is not a pass", hypothesis wording, scoped absence) is applied consistently across all eight surfaces.
- *Defects (all with exact repairs):* three unfaithful supersessions (P0 attribution C1204; silent execution-axis revision C1606; 04:35 regressing M047 C1345); two REFUTED program sentences (C1345, C1305); seven further overclaims (C1214, C1217, C1244, C1537, C1550, C1406, C1628); two CONTESTED normative sets and one unreconciled omission that the reused BEAD-PLAN already resolves but the Nov-6 text does not restate (K101-K103); one vocabulary inconsistency (K104); one unmet own norm (K107).
- *Not yet consistent with its own pins:* the README pairs MW baseline 97e18068 with a companion program that baseline does not contain (K105), and the beads it binds work to carry the Nov-4 pins (K117). Both are owner decisions (re-pin), named as `deferred:` in REMEDIATION.
- *What the program adds beyond the Nov-4 audit is proposal:* the doc 03 ABI (separated `hostMode`/`evidenceProfile`/`contextProfile`), the doc 04 stage table and the doc 05 journeys agree only with the same author's MW companion; no code, test or third artifact witnesses adoption. These 79 anchor-only NON-EPISTEMIC rows carry proposal force and must enter Phase 10 as NORMATIVE_DECISION / RISK_CONTROL requirements, never as empirical premises.

## 13. Audit limits

- Static only: no Claude/Forge/Furnace/HX/RF call, no `npm pack`, no vitest or Forge gate, no live Pi -> Mechanical run; "not run" is stated on every row.
- Forge, HyperUnix, ReactiveFiber and Furnace are not pinned in this triage; producer facts come from committed receipts (one producer version each) and source comments.
- Unlanded branches were listed by ref and subject only; the installed environment was not inspected; the MW repository was not searched for a Pi-launch receipt.
- The corpus-level id collision was repaired by the roll-up (re-key +300); two lens citations were resolved by content, with notes; g01 rows received template `permitted_wording` from the investigators' `permitted_strength` (origin recorded on each row).
- Phase 9 (audit-the-audit gate) and Phase 10 (EAT-R144+ delta requirements, bead amendments) were not part of this roll-up; `EVIDENCE.jsonl` and the `support[]`/`anchor[]`/`counterevidence[]` shape were produced so the gate can run.
