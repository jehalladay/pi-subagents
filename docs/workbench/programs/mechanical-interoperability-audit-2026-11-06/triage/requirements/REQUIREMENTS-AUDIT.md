# REQUIREMENTS AUDIT — DELTA (EAT-R144..EAT-R200) — Phase 10 step 9, adversarial delta-requirements audit

Written 2026-11-07T07:07Z (stamp from `date -u`). Verdict: **PASS_WITH_FIXES** — 25 fixes (F01-F25) applied in place to the delta set, regenerated from one source (`build/reqs-dump.json` -> `gen_d.py` -> `emit.py`); ids EAT-R144..EAT-R200 unchanged, no row added, removed or renumbered. Pre-audit copies of the four deliverables and the two generator dumps are under `build/pre-audit/` (sha256 pre/post below).

Pins (unchanged from the generators): doc pin = env pin pi d7666a76f5618dff61140dff20dde6ea64967814; mw 97e18068f3996d9a3faf242c089691b049ed04ac (program-stated baseline); mw origin/main tip at triage start 6e15a4245d3f (two docs-only commits past the pin: 2ea69445, 6e15a424; read with `git log 97e18068..6e15a4245d3f`, never fetched). Nothing was run against the pins beyond read-only `git show/log/ls-tree/branch -r` and file reads; the checks below are Python reads over the audit's own output files. Every acceptance criterion in the delta remains **not run**.

Inputs audited: `ATOMIC-REQUIREMENTS-DELTA.md`, `CLAIM-REQUIREMENT-MAP.jsonl`, `TDD-MATRIX-DELTA.md`, `BEAD-AMENDMENT-PLAN.md` (all generated 2026-11-07T06:38Z) against `../epistemic-triage/CLAIMS.jsonl` (459 rows), `../epistemic-triage/REMEDIATION.md` (M101-M123) and the Nov-4 set at the Pi pin (`docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/`: ATOMIC-REQUIREMENTS.md EAT-R001..R143, BEAD-PLAN.md 25 groups, epistemic-triage/CLAIMS.jsonl 490 rows C0101..C0464 ids, REMEDIATION.md 50 rows).

| Deliverable | sha256 pre (06:38Z) | sha256 post (07:06Z) | Rows |
|---|---|---|---|
| ATOMIC-REQUIREMENTS-DELTA.md | fdabe5ab72758c04… | 85b1cae04570bef5… | 57 requirements, 27 sections changed, 30 byte-identical; Delta index and Not-owed table byte-identical |
| CLAIM-REQUIREMENT-MAP.jsonl | c2babdebed5db855… | f1aae8d00b1b93ff… | 57 map rows + meta + coverage |
| TDD-MATRIX-DELTA.md | f4ff827877673b86… | daa569086b0bfc34… | 57 rows, one per requirement |
| BEAD-AMENDMENT-PLAN.md | fc5e6a1508af8a98… | 339b3ef0ac1aa399… | 19 beads touched (16 + 3 cross-reference-only beads added: wb-upad, wb-5a7k, wb-mwsy) |

## 1. Checks run and results

Each check names what was compared. "ok" means the predicate held on every row after the fixes; a defect found is cited by fix id (section 2).

### 1.1 Laundering of UNSUPPORTED / REFUTED / UNDETERMINED premises
- Merged ledger status census: ESTABLISHED 183, SUPPORTED 38, NON-EPISTEMIC 236, REFUTED 2 (C1305, C1345); UNSUPPORTED/UNDETERMINED/CONTESTED/PLAUSIBLE 0 at the claim level (the CONTESTED sets K101/K102 and the unreconciled K103 are set-level and are carried by EAT-R145/R159/R188/R189/R190-R193/R173).
- All 237 claim citations in the delta (`Claims:` lines and `epistemic_basis`) match the ledger status and `overclaims` flag exactly (0 mismatches, before and after the fixes).
- The two REFUTED claims appear only in EAT-R178 (M101) and EAT-R179 (M102): REPRESENTATION rows with LINGUISTIC_INTEGRITY authority that repair the refuted sentence. No positive requirement assumes either. ok.
- Overclaiming claims (C1204, C1214, C1217, C1244, C1305, C1345, C1406, C1537, C1550, C1628) are cited only by wording-repair rows (EAT-R180-R186, R200) or by EVIDENCE_ACQUISITION rows that acquire the missing artifact (EAT-R163 for C1550; EAT-R176 for C1214/C1217) or as a named condition (EAT-R151: C1406 "ESTABLISHED at mw-tip only"). No rationale states an overclaiming wording as fact. ok.
- SUPPORTED hypotheses (C1162, C1543, C1425, C1482 — the skip-before-controller race) compile only to RISK_CONTROL (EAT-R160) and the rationale names them as unreproduced; the Nov-4 UNDETERMINED C0368 and C0321 stay UNDETERMINED and are listed as not owed with their EAT-R080/R081 gates. ok.
- Nov-4 propositions are linked by `Supersedes` only (137 prior ids, all resolve in the Nov-4 ledger; none re-graded or renamed). ok.
- One scope-travel defect found and fixed: EAT-R162 dropped the ledger's own defeater on C1173 ("'Pi's replay key' must be read as the Claude host's") and asserted that the generic `WorkflowHost.replayBasis` comment "names 'provider manifest' while the literal records none". At the pin `src/workbench/hosts/local-detached.ts:681-686` binds `manifest` and `localProvider.version/digest` into its `identityDigest`, so the universal reading is false. Fixed (F11); the ledger itself needs no change (its defeater and E1007 counterevidence already record this).

### 1.2 Duplication of EAT-R001..R143 rows (quoted both ways; duplicates to "not owed")
Every delta row was read against the Nov-4 rows it `Refines`. No row is a verbatim duplicate; six rows carried a duplicated clause and were narrowed so that the clause is cited as the Nov-4 row's acceptance and not re-owed:

| Delta row | Duplicated clause (delta, pre-fix) | Nov-4 acceptance it restated | Fix |
|---|---|---|---|
| EAT-R149 | "MUST refuse a request carrying a generic `profile` or `mode` key (alone or beside the triple)" | EAT-R005: "reject the other spelling and requests containing both"; mutant "Accept both profile and mode silently" | F05: row narrowed to the request/result split and the MW-stated disposition of `LiveDevelopmentResult.mode` |
| EAT-R150 | mutant "Validate only `contract` and ignore unknown keys; the unknown-field refusal fails" | EAT-R006: "mutate version, unknown field and wrong definition kind; assert typed refusal" | F06: mutant moved to the cross-contract borrowing negative; conditions cite EAT-R006 |
| EAT-R160 | the experiment and the `reproduced`/`unresolved` grading ("Given the F10 apparatus with `host.abortAgent` … the disposition record states `reproduced` if …") | EAT-R015: "Park the actual host beforeDispatch; issue runtime skip; release; retain sdk call count and settlement … Record observed violation or failed reproduction"; conditions "No fixed claim until measured failure then repair" | F09: row scoped to the repair shape of the existing seam (03:47), conditional on the EAT-R015 record |
| EAT-R161 | "with the rule that an unmeasurable dimension blocks replay" | EAT-R020: "Mark one dependency unmeasurable; assert a stale coding or verification result is not replayed" | F10: clause cited as EAT-R020, not re-owed |
| EAT-R167 | "`docs/workbench/TRACEABILITY.md` MUST be byte-unchanged" / "asserts TRACEABILITY.md's blob is unchanged" | EAT-R087: "Compare immutable path blob … TRACEABILITY unchanged and no new shared index" | F12: clause cited as EAT-R087, not re-owed |
| EAT-R175 | "bound to … four callbacks … preserving all four outcome arms"; acceptance "each of the four outcome variants round-trips" | EAT-R089: "bind owned discover/compileContext/implement/verify, preserve all outcomes" | F15: row narrowed to the MW-R2 additions (order, no-write on wrong basis, symlink rule, Git-census first profile) |

Rows checked and kept as material refinements (not duplicates): EAT-R144 (six git legs vs EAT-R002's three), EAT-R145 (makes EAT-R001's ruling condition executable), EAT-R146 (new guard; no Nov-4 row touches `isolation:"worktree"`), EAT-R148 (triple vs EAT-R005's single selector), EAT-R151-R158, R163-R166, R168-R174, R177 (each adds an obligation absent from the Nov-4 acceptance; EAT-R163 is the unexecuted named-query leg of EAT-R057 after wb-f3wd closed with that leg NOT CLAIMED). EAT-R195 overlaps EAT-R082's clause "stale no-Mechanical-code assertion is removed" and now says so (F19: executes it once in the docs cut; `Refines` gains EAT-R082). The 27 not-owed rows were re-read: each `Covered by` id exists and its acceptance covers the item; no not-owed item hides an owed obligation (every claim with a named `missing_to_settle` artifact is either cited by a delta row or listed as not owed: 0 uncovered).

### 1.3 Amendments that would weaken an existing bead's acceptance
- Every BEAD-AMENDMENT-PLAN note is a NOTE-APPEND ("SCOPE REFINEMENT: this bead additionally owns …"; "Nov-4 requirements already on this bead stay as filed"). No note lowers an acceptance. ok.
- EAT-R171 (merged-tree key) would have relaxed EAT-R084's "receipt for another commit refuses close" through its "rebased-equal-tree case passes" clause. Fixed (F13): the exact gated commit stays the key, the tree id is an additional check, and an equal-tree landing passes only with the gated commit and the fold lineage recorded.
- EAT-R176 would have added an MW external dependency (effect-class list) to wb-mwsy, whose Nov-4 plan row (15) carries no external gate. Fixed (F16): a provisional Pi list may land, replaced when MW-R3 publishes; wb-mwsy gets a cross-reference note.
- EAT-R160's "only a reproduced record MAY authorize a repair" would have read as gating the 03:47 lifecycle norm for the new function host; fixed (F09): that path is owed unconditionally under EAT-R045.
- EAT-R159's over-blocking warning does not weaken wb-p3i2: at the pin its `blocks` dependencies are exactly wb-5ik5, wb-mwsy, wb-4bxo, wb-9a1o (= BEAD-PLAN row 19); recorded (F25).
- EAT-R146 does not weaken EAT-R003 or wb-s8rm (no Nov-4 row plans to use `isolation:"worktree"`; B-source's isolated checkout is Pi-materialized).

### 1.4 New beads an existing group covers
New beads: 0 (before and after). Every row dispositions to an existing group bead or rides wb-1zn2. ok.

### 1.5 wb- ids
26 distinct wb- ids appear across the four files; every one exists in `.beads/issues.jsonl` at the Pi pin (wb-04s and wb-4ap appear only inside quoted artifact text). Group-to-bead map matches the rules' map exactly; "blocked by" statements in the Delta index match the pin's `blocks` relations (wb-w8fk<-wb-1zn2; wb-9a1o<-wb-4bxo; wb-r5q2<-wb-ny54; wb-4bxo<-wb-ocie, wb-201v, wb-w8fk, wb-s8rm; wb-pxvv<-wb-4bxo, wb-f3wd[closed]). ok.

### 1.6 Executability of acceptance criteria
Defects found and fixed:
- EAT-R147: "47 row ids" had no derivation; now derived (CLAIMS.jsonl rows carrying K110; list in section 4) and the duty split into its two legs (F01).
- EAT-R188 (M111): the acceptance asserted the landed doc contains the literal placeholder `deferred:<owner states the axis …>`; now asserts the executable form (prior set named, completed->settled mapping, open decision named with its bead) and the absence of any `deferred:<` token in the landed file (F18).
- EAT-R186, R189, R192, R196 (M109/M112/M115/M119): acceptances asserted the `deferred:` clause as landed doc text although the plan's own rule says the docs cut applies only the wording part; now each asserts the wording part, records the clause in the receipt/owner bead, and asserts the token is absent from the landed file (F17).
- EAT-R195 (M118): the statement said "replace … with the REMEDIATION M118 repair text", but that cell is a deferral note, not replacement wording; now an executable two-part obligation (02:L33 insertion; feature-matrix.md:112 replacement with the suggested note; status word `planned` unchanged) (F19).
- EAT-R196 (M119): "Re-pin before implementation." exists only at README:3, not at 02:33 or 04:3; the latter two are now insertions (F17).
- EAT-R198 (M121): the replacement targets were not verbatim: README:22 reads "after preservation failure" (already the whole trigger set — no replacement owed) and SKILL:14 reads "after commit/branch preservation failure"; targets corrected to 01:22 and SKILL:14 with the verbatim text (F21).
- EAT-R192 (M115): the target sentence at 04:22 is "**Mechanical-owned tracks:** companion `MW-R1` …", not "**Mechanical-owned** tracks: MW-R1 …"; target corrected (F22); the EAT-R173 evidence quote fixed likewise (F23).
- EAT-R197 (M120): required the M120 wording "as its proposition/permitted_wording"; rewriting a graded row's proposition is re-atomization (skill Phase 11 rule 1); now `permitted_wording` only, with the predicate the current merged-ledger row already partly satisfies (F20).
- EAT-R172: statement said "description MUST carry" while the write is a note-append; now "bead record (description plus appended notes)" (F14).
- EAT-R148: cross-reference "refused later by EAT-R062 / EAT-R060" corrected — EAT-R060 is the preview-substitution guard, EAT-R062 is the profile gate (F04).
- EAT-R145: the validator must resolve the cited ruling id, not count an entry; the unlanded e76448ea subject already cites "owner specification ruling M:61188" (commit message only, K110) (F02).
All other acceptances are assertions a test, census, validator or receipt check can encode; MW-owned rows (EAT-R173-R177) are checkable at the tracker/producer and are not Pi gates.

### 1.7 MW-core implementation smuggled into a Pi bead
- EAT-R149 had the Pi ruling "state keep-as-result-literal, rename, or remove" for an MW-owned field; now Pi records the MW owner's stated disposition or marks it pending on wb-1zn2 (F05).
- EAT-R161 asked wb-413a (Pi) for a "joint" specification; now Pi lands its half first and the MW half is clause (c) of EAT-R176 on the tracker (F10/F16).
- EAT-R153 binds Pi-side walkers only (the Git-census `discover` walker is MW-R2); EAT-R175 binds MW's walker on the MW row. ok.
- No Pi row imports, modifies or tests MW core/rig code; every MW deliverable rides wb-1zn2 (rule 21 clause 1). ok.

### 1.8 TDD rows
57 requirements, 57 TDD-MATRIX-DELTA rows, 57 CLAIM-REQUIREMENT-MAP rows, 57 Delta-index ids: set-equal, no duplicates, EAT-R144..EAT-R200 contiguous. Every row has Red, Mutant, Level, Tiers, Gate; every `A*` names its gate (MW-INSTALLED-CONSUMER, PI-FUNCTION-REGISTERED, PI-GIT-CENSUS-LIVE, HX-TASK-SCOPE-PROBE, PI-MULTIWORKFLOW-LOAD, PI-CANCEL-RECOVERY — all defined in the Nov-4 BEAD-PLAN/TDD-MATRIX). Presentation nit, not fixed: the emitter marks every L2-L5 tier of a gated row `A*`, so EAT-R151's L4 unit leg (fixture tarball) shows `A*(MW-INSTALLED-CONSUMER)` although it can run without the producer; the matrix footer's `·` rule covers it. The two escaped pipes (`\|`) in the EAT-R155 and EAT-R191 rows render correctly.

### 1.9 Skill checklist (requirement-compilation.md "Requirements audit" 1-9)
1. Traceability: every row names claim ids (237 citations, all resolve) or an explicit NORMATIVE_DECISION; 137 prior ids linked. ok.
2. Statuses/scope/time preserved in rationales: ok after F11 (scope) and F21 (README:22 wording state).
3. No REFUTED/UNSUPPORTED laundering: ok (1.1).
4. Every operationally material unknown is a gate: EAT-R147 (K110 re-grade), R158 (Forge pin), R161/R176(c) (joint replay spec), R163 (named-query probe), R151 (adoption gate); 0 claims with a named missing artifact left uncovered. ok.
5. Mandatory-on-uncertain rows name RISK_CONTROL (EAT-R146, R153, R154, R160, R168, R169) or EVIDENCE_ACQUISITION; none presents the premise as fact. ok.
6. Atomic + executable: ok after 1.6.
7. Every requirement in the TDD matrix: ok (1.8).
8. Design-choice rows are NORMATIVE_DESIGN/NORMATIVE_DECISION (EAT-R148, R150, R157, R159 and the 18 NORMATIVE_DECISION rows), not discoveries. ok.
9. Implementation-relevant remediations covered: M101-M123 -> EAT-R178-R200 one-to-one; K101/K102/K103/K106/K110/K117 each carried by a row with its `deferred:` owner decision explicit. ok.

## 2. Fixes applied (ids stable; all in `build/reqs-dump.json` via `build/audit_fix.py`, then regenerated)

| Fix | Row(s) | Class | What changed |
|---|---|---|---|
| F01 | EAT-R147 | executability / landing | "47 rows" derived from K110-carrying CLAIMS.jsonl rows (section 4); duty split into a docs-validator leg (cut #2) and a later READJUDICATION leg; wb-12x1 not closed while the re-grade leg is open unless re-homed by note |
| F02 | EAT-R145 | evidence / executability | conditions + `git log` evidence: e76448ea cites "owner specification ruling M:61188" and a red at worktree.test.ts:432; validator must resolve the cited ruling id |
| F03 | EAT-R144 | scope | e76448ea's red list names commit/status/branch/branch-exhaustion legs only (message, not inspected): `add -A` / `rev-parse HEAD` legs remain owed |
| F04 | EAT-R148 | cross-reference | EAT-R062 is the profile gate; EAT-R060 is preview substitution |
| F05 | EAT-R149 | partial duplicate / MW ownership | alias refusal cited as EAT-R005 (not re-owed); row owes the request/result split and records the MW-stated disposition of `LiveDevelopmentResult.mode` (title, statement, acceptance, mutant, conditions) |
| F06 | EAT-R150 | partial duplicate | mutant moved to cross-contract borrowing; unknown-field/version refusals cited as EAT-R006 |
| F07 | EAT-R156 | cross-reference | `also_amend` wb-upad (freshness axis = EAT-R052) |
| F08 | EAT-R157 | cross-reference | `also_amend` wb-5a7k (cancel semantics = EAT-R045-R047) |
| F09 | EAT-R160 | partial duplicate / scope / weakening | scoped to the existing claude-host seam; experiment and grading cited as EAT-R015/R016; new function-host path owed under EAT-R045; 03:47 evidence added |
| F10 | EAT-R161 | partial duplicate / MW ownership | unmeasurable-dimension rule cited as EAT-R020; Pi half lands first, MW half = EAT-R176(c) |
| F11 | EAT-R162 | scope (C1173 defeater) | comment is host-generic; detached host binds a manifest (local-detached.ts:681-686); census compares per host; `settings`/`principal` omission added; two evidence rows added |
| F12 | EAT-R167 | duplicate clause | TRACEABILITY immutability cited as EAT-R087 |
| F13 | EAT-R171 | weakening | EAT-R084's commit key retained; equal-tree pass needs gated commit + fold lineage |
| F14 | EAT-R172 | executability | description vs appended notes |
| F15 | EAT-R175 | partial duplicate | four callbacks + four arms cited as EAT-R089; row owes order, no-write on wrong basis, symlink rule, Git-census first profile |
| F16 | EAT-R176 | weakening / MW half / cross-reference | wb-mwsy provisional-then-producer rule (no new gate on wb-mwsy); clause (c) MW replay-basis half; `also_amend` wb-mwsy |
| F17 | EAT-R186, R189, R192, R196 | executability (`deferred:`) | landed text = wording part; `deferred:` clause to receipt/owner bead; token-absent predicate; EAT-R196's 02:33/04:3 legs are insertions |
| F18 | EAT-R188 | executability (M111 placeholder) | executable form of the open decision; no literal placeholder in the landed file |
| F19 | EAT-R195 | executability / overlap | two-part executable statement; `Refines` += EAT-R082; status word `planned` unchanged |
| F20 | EAT-R197 | ledger discipline | `permitted_wording` only; proposition never rewritten |
| F21 | EAT-R198 | executability (verbatim targets) | targets 01:22 and SKILL:14; README:22 already complete (no replacement); three evidence rows added |
| F22 | EAT-R192 | executability (verbatim target) | 04:22 sentence quoted verbatim |
| F23 | EAT-R173 | evidence fidelity | bold placement in the 04:22 quote |
| F24 | EAT-R177 | evidence fidelity | mw-tip line 32 -> 33 |
| F25 | EAT-R159 | evidence | pin `blocks` rows for wb-p3i2 recorded as the executable default reading |

Generator edits (own output files only): `gen_d.py` wb-12x1 note (22 wording repairs + M120 ledger-only + M121 README leg no-op + `deferred:` placement; EAT-R147 two legs), `emit.py` landing-order item 1 and an "Audited" header line on each deliverable. `gen_d.py` recomputes its stamp at run time (07:06Z); no stamp was hand-typed.

## 3. Findings not fixable here (flags to other owners) and blockers

These are outside this step's write scope (REMEDIATION.md and the ledger are Phase 8/6 deliverables and immutable after handoff; owner decisions are not the auditor's) and are recorded so nothing is silently dropped:

1. **REMEDIATION M121 README:22 leg is a no-op at the pin.** README:22 reads "after preservation failure" (whole trigger set); the row's `Existing wording` cell ("after commit or branch failure / after preservation (commit/branch) failure") matches neither README:22 nor SKILL:14 ("after commit/branch preservation failure") verbatim. Owed: a `REMEDIATION-ADDENDUM-2026-11-07.md` row correcting the cell (Phase-8 owner). The requirement (EAT-R198) is already executable without it.
2. **REMEDIATION M115 `Existing wording` is not verbatim** ("**Mechanical-owned** tracks: MW-R1 …" vs the pin's "**Mechanical-owned tracks:** companion `MW-R1` …"). Same addendum. EAT-R192 carries the verbatim target.
3. **REMEDIATION M111's repair cell embeds a `deferred:<…>` placeholder inside proposed doc text.** The skill places `deferred:` in the Repair cell as a reason + owner, not as landed wording; EAT-R188 now carries the executable form. The Phase-8 owner may want the cell split (wording part / deferred clause) for the landing seat.
4. **Owner decisions still deferred (not defects):** M109 MW baseline advance (wb-cbt4), M111 cancelled-execution axis (wb-9a1o; EAT-R157 keeps it representable), M112 wb-p3i2 blockers (default = the pin's bead graph), M115 MW-R label map confirmation (wb-1zn2), M119 bead-description re-pin (wb-cbt4; EAT-R172). They block closure of the rows that carry them, not this audit.
5. **Unlanded machine branches not inspected (K110):** wb-5ik5 e76448ea (whose message cites ruling M:61188 and a red at worktree.test.ts:432), wb-413a 2f0fedd3, wb-ocie. EAT-R144-R147, R161-R162 are asserted against the landed cut, not these branches; the EAT-R147 re-grade is the settling artifact.
6. **Ledger observation (no re-grade requested):** C1173/C1174 are scoped "Pi's replay key" with a defeater naming the detached host; the delta had dropped that scope once (EAT-R162, fixed). No ledger change is owed; a future Phase 11 pass should keep the per-host scope.

Blockers for the StructuredOutput: items 1-3 (REMEDIATION addendum owed by the Phase-8 owner) and item 4 (owner decisions). None blocks landing the docs cut #2 or filing the amendments.

## 4. K110 rows (the 47 EAT-R147 re-grade targets, derived from CLAIMS.jsonl at 05:51Z)

C1111, C1114, C1116, C1119, C1120, C1122, C1130, C1131, C1132, C1133, C1136, C1137, C1141, C1143, C1144, C1147, C1150, C1151, C1152, C1153, C1154, C1155, C1170, C1171, C1172, C1173, C1174, C1176, C1181, C1182, C1419, C1423, C1424, C1426, C1434, C1441, C1468, C1469, C1470, C1477, C1478, C1480, C1481, C1538, C1542, C1557, C1561.

Derivation: rows whose `contradiction_sets` or `scope_restrictions` carry `K110`. A re-grade record that lists a different set must say which rows gained or lost the K110 restriction and why.

## 5. Residual risks and what was not run

- No test, validator, census or probe named in any acceptance was executed; "red at the pin" statements (EAT-R162, R147 mutant) are static readings.
- The evidence-quote check compared the first 70 normalized characters of 130 file-backed quotes with the pinned files (128 exact; 2 are ellipsis-marked elisions of one line of `docs/workbench/receipts/wb-f3wd.md:12`, E1130, verified by hand); 13 probe-style citations (`git log …`, `.beads/issues.jsonl:<row>`) were verified by hand (e76448ea subject; wb-muip/wb-f3wd `closed_at`; wb-1a3t and wb-p3i2 rows).
- The audit did not re-grade any claim and did not touch `../epistemic-triage/`.
- Durable home per MANIFEST.md: this directory is purgeable scratch; the deliverables land through the docs cut (wb-12x1) and the s3 artifact copy.
