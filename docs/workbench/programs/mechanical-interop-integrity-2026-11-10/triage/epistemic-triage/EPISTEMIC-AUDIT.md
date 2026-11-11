# EPISTEMIC-AUDIT - mechanical-interop-integrity-2026-11-10 (MII), graded 2026-11-11

## 1. Pinned substrate

- Artifact (document pin): Pi-subagents docs/programs/mechanical-interop-integrity-2026-11-10/{README,01..05}.md at origin/master 3fc0ead1e99f854365fd4226f582eaf4f19f8858 (deposit 91d8fa8c + link fix); 6 files, 41,393 bytes; triage copies docs/pi-*.md sha256-identical.
- Companion (context, same authoring lineage): MechanicalWorkflows docs/programs/pi-host-integrity-2026-11-10/ at main 6476372f (copies docs/mw-*.md).
- Environment pins (what the claims describe and were tested against): Pi master 0fb9067262532289104417d2b7f2f25704563a75 (worktree pins/pi-0fb90672); Mechanical main 69cb016dd293a17bcc893f2baf410a51c226f4c9 (worktree pins/mw-69cb016d).
- Drift recorded: Pi 0fb90672 -> 3fc0ead1 changes the six program files and .agents/skills/pi-mechanical-interop/SKILL.md only (src/test/qa/package.json/forge.toml unchanged). MW 69cb016d -> 1be2b8dc (two test titles, one mapping row) -> 6476372f (companion docs + skill) -> 0ffdc844 (one more test-title/mapping edit): no path under apps/*/src, packages/*/src, contracts/, qa/ or any package.json changed, so every Mechanical source verdict transfers. Pi trunk workbench/implementation-program = ce180d82 is the code of 0fb90672; the program documents, the November 9 program, README.md, AGENTS.md and the rewritten skill are master-only.
- Audit run: read-only on both repositories; executions only on scratch copies under epistemic-triage/.work (git archive + lock-pinned toolchain); outputs written under epistemic-triage/ (this tree) with durable destination per MANIFEST.md.
- Inputs consolidated: 230 claims (claims-*.jsonl), 245 lens rows in six lenses, 217 Phase 5 audit rows; 13 rows (C001-C006, C026, C031-C035, C086) had no Phase 5 row and were graded at consolidation from the lens rows plus a consolidation re-verification record (E465).

## 2. Claim inventory

| Status | All rows | Material rows |
|---|---|---|
| ESTABLISHED | 82 | 81 |
| SUPPORTED | 13 | 13 |
| PLAUSIBLE | 1 | 1 |
| UNSUPPORTED | 4 | 4 |
| CONTESTED | 0 | 0 |
| REFUTED | 6 | 6 |
| UNDETERMINED | 0 | 0 |
| NON-EPISTEMIC | 124 | 43 |
| total | 230 | 148 |

| Kind | rows | statuses |
|---|---|---|
| OBSERVATION | 84 | {"ESTABLISHED": 74, "UNSUPPORTED": 1, "SUPPORTED": 5, "REFUTED": 4} |
| SOURCE_REPORT | 5 | {"REFUTED": 1, "ESTABLISHED": 4} |
| INFERENCE | 10 | {"REFUTED": 1, "ESTABLISHED": 3, "SUPPORTED": 4, "UNSUPPORTED": 2} |
| HYPOTHESIS | 6 | {"SUPPORTED": 4, "PLAUSIBLE": 1, "ESTABLISHED": 1} |
| DEFINITION | 5 | {"NON-EPISTEMIC": 5} |
| NORMATIVE | 68 | {"NON-EPISTEMIC": 68} |
| PROPOSAL | 52 | {"NON-EPISTEMIC": 51, "UNSUPPORTED": 1} |

By document: pi-README.md: ESTABLISHED 24, NON-EPISTEMIC 4, REFUTED 4, SUPPORTED 2, UNSUPPORTED 1; pi-01-AUDIT-AND-INVARIANTS.md: ESTABLISHED 23, NON-EPISTEMIC 21, PLAUSIBLE 1, SUPPORTED 5; pi-02-PROTOCOL-AND-RUNTIME.md: ESTABLISHED 18, NON-EPISTEMIC 29, REFUTED 1, SUPPORTED 2; pi-03-IMPLEMENTATION-PACKETS.md: ESTABLISHED 7, NON-EPISTEMIC 31, REFUTED 1, SUPPORTED 3, UNSUPPORTED 3; pi-04-ADVERSARIAL-VERIFICATION.md: ESTABLISHED 1, NON-EPISTEMIC 30; pi-05-OPERATIONS-AND-HANDOFF.md: ESTABLISHED 9, NON-EPISTEMIC 9, SUPPORTED 1.

Counts are descriptive. The 124 NON-EPISTEMIC rows are the program's D1-D12 severity items, invariants I1-I10, packets P00-P12, falsifiers G01-G12/P13-P18 and handoffs: they are graded for consistency and for the status of their embedded empirical premises (`embedded_premise_flags` on each row), not for truth.

## 3. Highest-impact defects

- **C005 REFUTED** - 'self-contained' fails: eight D-numbers, four L-tiers, 'strict' and MW-CONTRACT are defined only outside the six files; P04/P08 block on Mechanical H-work. Narrower true form: self-contained for Pi-owned work, Mechanical items by label.
- **C032 REFUTED** - 'D8/D10/D11/D12 are shared or Mechanical-owned as described in this corpus' - described only in the companion's mw-01 (none marked shared); D6 has two owners with different content; D7's label differs between programs.
- **C035 / C138 REFUTED** - 'No GitHub CI' is false for Pi (.github/workflows/ci.yml triggers on master; node 22 vs engines >=24); the repository had already narrowed this sentence (M047/EAT-R140), so the deposit regresses an existing remediation. Three of C035's five presuppositions hold; the Furnace 'profile' has no witness.
- **C029 REFUTED** - 'attached or explicitly admitted same-machine execution' names a placement Pi does not have (EXECUTE_HOST_MODES = embedded, detached) and widens the first release beyond pi-02 L5 / pi-05 L41 (embedded first, detached deferred to P11).
- **C095 REFUTED** - 'raw JSON budgets using current workbench rules': the 64 KiB / 4096-byte budgets apply to canonicalized, notes-stripped function values; a function input whose notes alone exceed 64 KiB is admitted (probe P3-oversize-note).
- **C006 UNSUPPORTED** - 'its completed source changes must not be undone' has no Pi src/ referent for the November 9 program; the seams the README protects were landed by the November 4 program (wb-201v, wb-s8rm, wb-ocie, wb-0gbh, wb-5ik5) and MW 1f29daa7.
- **C142 / C163 / C140 UNSUPPORTED** - cross-repository dependencies keyed by H01/H02/H03 labels that denote different work in pi-05, mw-README and mw-03; the graph node 'P04 composed admission' and the section 'P04 reviewed installed host consumer' describe different work.
- **Landed census regression (C220, C226)** - test/workbench-mwi-docs-remediation-census.test.ts is red on master (4 failures at 0fb90672, 8 at 3fc0ead1; trunk green) because the 2026-11-09 skill rewrite and the MII deposit moved frozen wb-12x1 rows; neither commit ran the landing gate (C036/C181 self-reports are consequential).
- **Strict-native attainability (C026, C175, C185)** - execution_environment.pinned is false in all 148 occurrences across committed MW evidence and true only in synthetic test fixtures: whether V4/P08 can ever yield a strict-native PASS in the first-release topology is UNDETERMINED; the release definition may be unsatisfiable rather than failed.
- **Ratification gate is a constant (C050, C107)** - FUNCTION_ACTION_CONTRACT is unadopted and read by nothing in production; adoptFunctionActions has no caller, and any caller can mint an adopted contract (probe P7), so "ONLY after MW-CONTRACT ratification" is not mechanically enforced and MW-CONTRACT names nothing in the Mechanical tree.
- **Observe premise narrower than written (C030)** - workflow_observe resolves an embedded launch in the same process/session only; a detached launch registers no task although the execute reply tells the model to observe it; nothing survives an extension restart.
- **Effect-intent lookup does not exist as an export (C173, arbitrated)** - effect-intent.ts/effect-reconciliation.ts are module-level only (ERR_PACKAGE_PATH_NOT_EXPORTED from an installed consumer), carry no Pi invocation id and have no caller; P07 depends on MW H02/H07 plus an export.

## 4. Contradiction sets

37 sets in CONTRADICTIONS.md. Empirical CONTESTED premises: D6 ownership/content between the two ledgers (K004; C031/C032), the H01/H02 label referent (K002; C142/C163). Decision conflicts needing an owner ruling before any bead is keyed by the label: first-release placement (README L24 vs pi-02 L5 vs pi-05 L41), severity of D4/D10/D11/MW-I10/MW-I12 (Pi blocking vs MW P1/P2), the D7 label, lease authority vs fence enforcement (Pi vs MW Q18/Q20), the exclusivity scope (all writers vs Mechanical function invocations), refusal vocabulary (two spellings; two pi-05 codes without a pi-02 category), the V/L tier map, the Forge envelope fields behind G02/H01, the replay term (event vs effect), and three H-label numberings. Resolved on inspection: the two adjacent MW baselines (K018) and the Forge-envelope hedge (K023).

## 5. Provenance / source-independence findings

- The Pi program and the Mechanical companion are one authoring lineage (same author, six minutes apart); their mutual agreement is consistency, not corroboration (SOURCE-MAP L1/L2). Where they disagree, the disagreement is a decision conflict of one author, recorded in CONTRADICTIONS.md.
- The MII baseline restates the MNI-2026-11-09 ledger over unchanged source (eleven Pi modules blob-identical between 8e2fedeb and 0fb90672); the MNI statuses transfer as the same evidence re-read, and every present-tense baseline row was re-established on the primary files and, where behaviour was claimed, on executed probes (SOURCE-MAP L3-L6).
- Vocabulary inherited from MNI and from the November 4 program without its definitions: D-numbers, P/H labels (colliding numberings), L-tiers, MW-CONTRACT, W11, the census-narrowed sentences (SOURCE-MAP "Vocabulary inheritance").
- Phantom-receipt and nonexistent-subpath lessons from MNI: not reproduced here - the host subpath exists and is importable (C019, C073, C214), the receipts cited exist, and the profile labels now have code witnesses (C028, C093); the surviving MNI-class defects are label-only vocabulary (profiles bind no behaviour), boundary-cell conjunction inflation (C005, C032, C035 are conjunctions with one failing conjunct each) and conflicting DAGs/labels across the two programs (C139, C141, C142, C163, C221).

## 6. Propagation

- Dependency hyperedges: valid joint warrants for C011 (C008+C009+C010), C033 (direct evidence independent of its REFUTED label premise C032), C048, C113, C118, C132; broken derivations for C005 (premises C006 UNSUPPORTED, C032 REFUTED; conclusion REFUTED by direct token census, not by the broken premise) and C163 (premise C142 UNSUPPORTED; conclusion UNSUPPORTED).
- Caps checked for every row with dependencies (`propagation` field). Three rows exceed their weakest dependency on an independent warrant path, recorded on the row: C022 (absence warranted by C008/C009, not by C021), C033 (source + probes, not by C032), C159 (mechanism by source, not by C145). No status was changed by propagation.
- Normative rows (124) carry their embedded premises' statuses in `embedded_premise_flags`: 46 rows carry at least one REFUTED/UNSUPPORTED/CONTESTED/UNDETERMINED premise flag from a lens (UNSUPPORTED 27, REFUTED 20, CONTESTED 12, UNDETERMINED 12 flags in all; for example C026/C175/C185 strict-PASS attainability UNDETERMINED, C031 D6 ownership CONTESTED, C116/C154/C156 "existing script helper behaviour" has no referent). Requirement force is a separate dimension: a mandatory guardrail may still be derived from them under RISK_CONTROL or NORMATIVE_DECISION authority, never by upgrading the premise.

## 7. Linguistic-strength mismatches

18 rows carry a `wording_mismatch` (artifact wording stronger than its warrant, or indicative sentences in a normative row carrying flagged premises):

| Claim | Status | Artifact wording | Permitted wording |
|---|---|---|---|
| C005 | REFUTED | This is the next, self-contained design revision. | The program is the next design revision after the November 9 program and its five linked documents exist at the document pin 3fc0ead1 (master-only); it is not self-contained: D1, D2, D4, D7, D8, D10,  |
| C006 | UNSUPPORTED | its completed source changes must not be undone | The November 9 program exists at docs/programs/mechanical-native-interoperability-2026-11-09 on master at 0fb90672; the 'completed source changes' the sentence protects have no Pi src/ referent: the o |
| C029 | REFUTED | attached or explicitly admitted same-machine execution | Pi at 0fb90672 has two execution placements: embedded (inside the calling session) and the explicitly admitted same-machine detached host; 'attached' names no Pi placement. The first-release placement |
| C032 | REFUTED | D8/D10/D11/D12 are shared or Mechanical-owned as described in this corpus. | The D-numbers are not described in the Pi corpus: D1, D2, D4, D7, D8, D10, D11 and D12 occur only as labels on README line 27 and are described only in the companion's 01-AUDIT-AND-PROOF.md ledger, wh |
| C035 | REFUTED | Preserve independent Forge and Furnace, never couple Mechanical core to Pi, never require Library for execution, and keep optional HX/RF/Fur | Of the five presupposed current-state facts, three hold at 69cb016d: Forge and Furnace are independent on the Mechanical side (Furnace lives in four opt-in modules absent from the develop/host path),  |
| C058 | NON-EPISTEMIC | The exact reviewed definition ID, schema, descriptor digest, tarball digest, runtime file manifest digest and validated input bytes identify | The target MUST bind exact reviewed execution bytes across every executable package in the closure; current single-library digest binding is not whole-host closure proof. |
| C063 | NON-EPISTEMIC | accepted/launched != completed; Mechanical verified_candidate is a domain claim requiring validated native evidence, not merely an SDK respo | Launch is not completion. Target strict-native assurance requires validated producer proof separately from the unchanged domain outcome; a current verified_candidate alone does not establish that assu |
| C092 | NON-EPISTEMIC | All entries are checked before invoking Mechanical. | Propose a Pi-owned plan with separate identities for all executing artifacts and trusted live authority access at the final provider boundary. |
| C095 | REFUTED | Decide schema, definition and raw JSON budgets using current workbench rules. | At the Pi pin, request/definition keys are closed and the 64 KiB input / 4096-byte policy budgets apply to canonicalized, notes-stripped function values, not raw caller JSON. |
| C101 | NON-EPISTEMIC | Add a test that poisons a note getter and checks it is neither read nor forwarded. | Add a composed/registered-route test proving the poisoned note is neither read nor present at the callback, preserving existing green admission tests. |
| C122 | NON-EPISTEMIC | replay is idempotent by event id. Native events are append-only facts, projection can be rebuilt. | Propose an idempotent durable function-event journal extending or explicitly replacing existing script/task storage; early events carry native refs only when actually observed. |
| C138 | REFUTED | No GitHub CI or invented passing gates. | Do not add or rely on GitHub CI for this program; Pi already has ci.yml, and no run is claimed here. |
| C140 | UNSUPPORTED | P04 composed admission | P04 covers installed-host review; admission composition remains to be explicitly assigned. |
| C157 | NON-EPISTEMIC | launch resolves while writer sleeps, second root alias refused; distinct roots allowed; crash/restart leaves uncertain lease; failed pre-dis | The new red tests target long-lived, cross-process function invocations, not the already-green in-memory seam. |
| C163 | UNSUPPORTED | Reviewed installed host consumer (P0; MW H01/H02) | P04 requires the specific MW installed closure, closed binding and authorized composed host, with identifiers ratified in P00/H00. |
| C174 | NON-EPISTEMIC | no unknown effect is replayed just because Pi restarted, and writer lease stays fenced until justified | Specify idempotent event projection replay separately from forbidden automatic effect/writer replay; align Pi and Mechanical intent identifiers and recovery authority. |
| C203 | NON-EPISTEMIC | no non-addressable ref; invocation remains observable | Retain a host invocation address while omitting clipped native refs; represent unknown native identity as null with separate uncertainty, never the string uncertain. |
| C227 | NON-EPISTEMIC | H01: @mechanical/development-rig/host accepts validated mechanical.pi-host/v1 binding and exact immutable package/runtime manifest; reject m | Mechanical must supply these blocking handoffs; they are not implemented through the allowed host subpath at 69cb016d. Pi consumes ratified producer-owned APIs and proof, not copied internals. |

Recurring promotions: documented -> implemented (H01/H02 indicative verbs in a blocking-dependency list, C227; "existing script helper behaviour", C154); some -> all (universal P03 Done "ANY stale axis", C162; "no route to an effect", C133/C134); historical -> current ("standalone native Git/Claude/Forge execution" rests on 2026-10-15 receipts, C021); label -> capability ("git-census-v1/plain-v1" validated labels, no selectable profile, C028); not found -> absent without a stated detection surface (C023-C025 bullets, cured by the M050 form).

## 8. Remediation summary

REMEDIATION.md has 239 rows over 202 claims: ADD_MISSING_PREMISE 108, NARROW_SCOPE 57, SPLIT_CLAIM 25, ADD_SOURCE 13, SURFACE_DISAGREEMENT 13, ADD_TEMPORAL_QUALIFIER 8, DOWNGRADE_MODALITY 8, PRESERVE_AS_UNDETERMINED 3, REPLACE_SOURCE 2, MARK_AS_HYPOTHESIS 2. Every row is an insert annotation with the pin advance deferred to the owner (Pi Workbench). Inverse coverage: all REFUTED/UNSUPPORTED rows (C005, C006, C029, C032, C035, C095, C138, C140, C142, C163) have rows. Two EMPIRICAL_REPAIR candidates are routed to the owner (census regression; producer red tests).

## 9. Unresolved / UNDETERMINED questions and what would settle them

- Strict-native Forge PASS attainability in the first-release topology (C026/C175/C185 premise): one native gate.run envelope from the installed Forge on a clean committed disposable package with execution_environment.pinned true and native commit/tree/gate definition, or a joint decision that strict v1 does not require the environment pin.
- Joined receipts beyond the two repositories (C023-C025 global reading): a census of the stores the standing census declares unread (OrchestrationEngineer ledger, home-directory Forge ledgers); the two-repository absence stands.
- Whether GitHub Actions ran the master deposits and what it reported (C035 facet v): a run record; none in the tree.
- The intended referent of "its completed source changes" (C006): an author file/bead list.
- Author activity behind the self-reports (C036, C181): no committed artifact can settle it; they stay SOURCE_REPORTs.
- Mechanical-side provenance of any Pi "November 9" source change (C006 facet ii, MW half): no Mechanical commit names a Pi November 9 bead; MW 1f29daa7 predates both programs.

## 10. What the program may claim (permitted wording, consolidated)

- C001: At Pi 0fb90672 and Mechanical 69cb016d the program is design documents only: no registered workflow_execute(kind=function) route launches a Mechanical function, no Pi release metadata (CHANGELOG.md, package.json 0.20.0, feature-matrix W11 'planned', mechanical-function-hosting.md 'not shipped') carries one, and none of the identifiers the two programs introduce has a witness in Mechanical code, tests, contracts or receipts (highest committed evidence tier L2, no git tag) - an absence over the committed state of both clones, not over uncommitted work.
- C002: 0fb9067262532289104417d2b7f2f25704563a75 is the continuity-18 merge commit on Pi's default branch master (origin/HEAD -> origin/master); its code equals the gated trunk tip ce180d82 (git diff over src/test/qa/package.json/forge.toml is empty), while the program documents, the November 9 program, README.md, AGENTS.md and the rewritten skill are master-only.
- C003: 69cb016d is a commit on Mechanical main; when the Pi program was committed main held exactly one further commit, 1be2b8dc (two test titles in host-services.test.ts and one 04-IDENTIFIER-MAPPING.md row, no source), which is the companion program's stated Mechanical baseline; the companion program directory exists on main from 6476372f; the two 'paired' headers therefore name adjacent Mechanical revisions whose delta touches no source, contract, manifest or receipt path. At audit time main had moved to 0ffdc844 (three commits past the snapshot).
- C011: at 0fb90672 no request of kind function or furnace-formula can execute through the registered tool in any host mode; the schema's advertisement is not execution support.
- C017: Pi has the seven named primitives as code at the pin, with the stated lifetime/scope limits and the known Claude-host cancellation defect; the baseline list omits the landed observation-only mechanical-coordination boundary, which must also not be reclassified as missing.
- C023: no joined live Claude/Git/Forge receipt exists in the committed stores of either repository at the pins, and none could have been produced through the registered route at any ancestor revision; absence beyond the two repositories is undetermined (M050 wording form).
- C033: At MW 69cb016d the producer has the three gaps the README labels: live-gate.ts:205-208 classifies a frame as passed unless gate_passed === false and live-development.ts:387 credits that on a commit match while :414 feeds settlement the locally measured tree and cached manifest hash (D1/D7); effect-reconciliation.ts:98 returns not-occurred with retryPermitted (:79) for HEAD-at-base with clean status, missing ignored-path effects (D2); installed-host.ts:49-51 re-hashes the tarball, not the installed dist files, before the trusted import (D4). Read at source and reproduced by scratch probes at the pin (PROBE/out/defect-probe.jsonl), not yet by committed red tests; unchanged at 1be2b8dc and 0ffdc844.
- C087: At MW 69cb016d, proposed mechanical.pi-host/v1 has the listed JSON shape and pure validation helpers; the current invokeDevelopmentHost call does not require that binding and joint ratification is not established.
- C088: Both pins share a reviewed descriptor ID for the descriptor-only pure library entrypoint; this is not yet an allowlisted composed rig-host export.
- C100: The existing launcher structure retains raw params.input while function admission hashes a judged copy; this is a latent integration hazard, not an observed function-route dispatch at 0fb90672.
- C117: WriterLeases is registry-instance-local memory and admitSourceWrite releases it when its dispatch promise settles; no cross-process or restart persistence follows.
- C212: At 0fb90672, source registers these tools when the validated backend/native-load conditions hold; function is advertised but not launched. No joined Mechanical route is present.

And may not claim, as written: that the corpus is self-contained (C005); that D8/D10/D11/D12 are described in it (C032); that there is no GitHub CI (C035, C138); that an "attached" placement exists or is in the first release (C029); that current workbench rules budget raw JSON (C095); that the November 9 program landed the protected source changes (C006); that P04 depends on "MW H01/H02" without a shared label table (C142, C163); that the strict-native first release is attainable (UNDETERMINED premise); that MW-CONTRACT ratification is enforced by the code (C050/C107 caveat).

## 11. Audit limits

- Verdicts are scoped to the environment pins; Pi trunk (L1089+) and MW main (0ffdc844+) continue to move; re-pin before implementation as the program itself demands (C034).
- Executions ran on scratch copies with node v22.23.2/v24.20.0 on linux x86_64; no Forge gate was run by this audit; the installed Forge was not probed (mw-src#28).
- Absence claims are graded over the stated surfaces only (committed trees of the two clones, tracked text, static import census); uncommitted work, other clones and dynamic code assembly are blind spots named on the rows.
- The 13 README rows without a Phase 5 audit row were graded at consolidation from the lens rows plus spot re-verification (E465); they did not receive a separate Wave 2 rival-synthesis pass beyond what the lenses recorded.
- Evidence records point at the Phase 3/5 lens and audit rows under epistemic-triage/.work and at the pin worktrees under pins/; both must travel with the tree (or the pins be rebuilt from the SHAs) for the `artifact` paths to resolve after the host cleaner purges scratch. Each record carries the full probe text in `summary`, so the content survives either way.
- No numeric confidence is reported anywhere; counts by status are descriptive.
- verdict_history entries use the workflow-specified form "graded <status> at pin pi-0fb90672/mw-69cb016d 2026-11-11"; the two arbitration entries use the skill grammar `arbitration-20261111:<STATUS>@<pin>` so the conditional ARBITRATION deliverable trigger is machine-detectable.
