# CONTRADICTIONS — mechanical-native-interoperability-2026-11-09 (Pi-subagents)

Pins: program docs Pi `b085c34e` (`docs/programs/mechanical-native-interoperability-2026-11-09/*.md`, quoted as `pi-README`, `pi-01`, `pi-02`, `pi-03`); MW sibling docs `7f3809fd` (`docs/programs/pi-native-interoperability-2026-11-09/*.md`, quoted as `mw-README`, `mw-01`, `mw-02`, `mw-03`); Pi environment pin `8e2fedeb`; MW environment pin `62a10b59`. Every quote below is verbatim at those pins. Each set names the better-warranted side; "better-warranted" is decided from primary evidence re-read at the pin, never by preferring the Pi side, the later text, or the more conservative reading.

Three classes: **INTERNAL** (two places in the Pi program disagree), **CROSS-PROGRAM** (Pi program vs MW sibling program), **VS-EVIDENCE** (program text vs the pinned source, tests, git history or the program's own evidence footer).

---

## K001 — The joint live receipt `MW-PI-NATIVE-LIVE` has no producer-side definition (CROSS-PROGRAM)

Claims: C205 (REFUTED), C203 (NON-EPISTEMIC proposal), C166 (REFUTED)
Status: C205 REFUTED within the searched surface

### Pi side
pi-02:93 — "**Gate:** joined `PI-GIT-CENSUS-LIVE` and `MW-PI-NATIVE-LIVE` receipts. If credentials/binaries unavailable record blocked, not an imitation pass."

### MW side
mw-02:84 — "**Exit:** joint `PI-FUNCTION-REGISTERED` then `PI-GIT-CENSUS-LIVE` receipts with Pi invocation, candidate commit/tree, installed SDK versions, original Mechanical outcome, Forge operation and proof, no phantom IDs. M06 alone is not release completion; enter verification tail."

### Evidence
- `grep -o -E '\b(PI|MW)-[A-Z][A-Z0-9-]+\b'` over all eight docs: `MW-PI-NATIVE-LIVE` occurs only at pi-02:93. `git grep MW-PI-NATIVE-LIVE` at MW 62a10b59, MW 7f3809fd and Pi 8e2fedeb: 0 hits; at Pi b085c34e only the audited doc itself (lens-contradict row 0; lens-mw-side row 20).
- Detection model: fixed-string and case-insensitive substring grep ('NATIVE-LIVE', 'native.live') over the complete eight-doc program text and the full MW env-pin worktree excluding node_modules/.git.

### Better-warranted side
MW. The producer defines its own exit receipts; the Pi gate joins a label nobody emits. The shared label both sides already agree on is `PI-GIT-CENSUS-LIVE`.

### What would settle it
A P00/M00 ruling adopting one receipt-label set; until then pi-02:93 should name MW M06's actual exit receipts or mark `MW-PI-NATIVE-LIVE` as proposed.

---

## K002 — M05/M06 are not "the producer-side live native journey" (CROSS-PROGRAM)

Claims: C166 (REFUTED), C203, C163 (NON-EPISTEMIC)

### Pi side (as the P07 heading reads)
pi-02:89 — "### P07 — First genuine cross-repository live journey (P0; P04–P06 + Mechanical M05/M06)" — atomized by the audit as "MW defines M05 and M06 as the producer-side live native journey (real Claude/Git/Forge evidence) on which P07 depends".

### MW side
mw-02:77 (M05 Exit) — "Local installed-consumer is **L2**, not native provider proof." mw-02:75 — "run `develop()` with fixture-safe services". mw-02:79-84 (M06) — "First joint registered Pi→Mechanical→Claude/Git/Forge journey (P0; M05 and Pi registered dispatch): invoke the actual Pi `workflow_execute` tool with `kind:function` ...".

### Better-warranted side
MW: M05 is fixture-safe L2 conformance with no native provider; M06 is the JOINT registered journey that itself depends on Pi dispatch — the same event as P07, not an upstream input to it. Narrower supported proposition: P07 depends on M05 and joins M06.

### What would settle it
Nothing further: the definition sites (mw-02 M05/M06) are complete and unambiguous. Repair is SPLIT_CLAIM on pi-02:89's dependency gloss.

---

## K003 — `@mechanical/development-rig/host` does not exist at either MW pin (CROSS-PROGRAM + VS-EVIDENCE)

Claims: C239 (REFUTED), C230, C236 (NON-EPISTEMIC), C030 (ESTABLISHED), C169 (ESTABLISHED)

### Pi side
pi-03:44 — "For V2 specifically import a fresh independently packed `@mechanical/development-rig/host` and `@mechanical/workflows-development` from temp consumer outside both repos; record SHA of package bytes and manifest, and assert real export callable."

### MW side and evidence
mw-01:16 — "Rig `package.json` exposes CLI bin and packs dist/README, but has **no stable explicit `exports` host subpath**; Pi cannot consume a stable application host by contract today."
mw-01:82 — "Proposed facade: a stable typed `@mechanical/development-rig/host` subpath (final spelling chosen jointly after package test) ..."
mw-62a10b59 `apps/development-rig/package.json`: `exports` absent, `main` absent, `bin` = `mechanical-development-rig`; no `src/host.ts`; unchanged at 7f3809fd (lens-contradict row 2; lens-mw-side rows 7-8).

### Better-warranted side
MW + evidence. The subpath is M01's planned deliverable with an unsettled spelling; pi-03:44 hard-codes it as a present import target.

### What would settle it
M01 landing with the ratified spelling (`MW-INSTALLED-HOST` exit). Repair: ADD_TEMPORAL_QUALIFIER on pi-03:44.

---

## K004 — "three-colon" / "three-part spelling" vs the grammar's own three-segment `claude:tool:<name>` (INTERNAL + VS-EVIDENCE; shared wording across both programs)

Claims: C039 (ESTABLISHED after arbitration), C093 (SUPPORTED after arbitration), C085 (ESTABLISHED), C118 (NON-EPISTEMIC)

### Side A — the doc sentences
pi-README:31 — "An exact action grant must use Pi's currently representable one-colon namespace syntax, e.g. proposed `mechanical:develop-write` rather than the previously unrepresentable three-part spelling."
pi-01:28 — "effective action grant grammar currently accepts namespace:permission, not a three-colon example."
mw-02:35 — "... no three-colon permission."

### Side B — the adjacent correction and the source
pi-01:25 — "`src/index.ts` builds effective `claude:invoke` and exact `claude:tool:<name>` rights for both registered detached paths".
pi-8e2fedeb `src/workbench/function-authority.ts:215` `const GRANT = /^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/;` (one colon); `:222` `HOST_GRANT = /^(?:[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*|claude:tool:[A-Za-z][A-Za-z0-9_-]{0,63})$/;` with `:218-219` "A Claude tool right is known permission data here and is never an action grant"; `test/workbench-function-authority.test.ts:241-242` "The program's own example spelling ..., which has two colons. const PROPOSED_EXAMPLE = \"mechanical:develop:write\";".

### Reconciliation
- Scope split: for ACTION grants the one-colon statement is exact and the earlier example is refused (ESTABLISHED). For the HOST grant grammar, a three-segment form (`claude:tool:<name>`) is accepted as permission data, so the unqualified "three-part spelling is unrepresentable" is false as a statement about Pi's whole grant syntax.
- Counting: the refused example has TWO colons (three segments); "three-colon" is a miscount shared by pi-01:28 and mw-02:35 (SAME_ORIGIN wording defect, not a disagreement about the grammar).

### Better-warranted side
The source. Substance of both sentences holds for action grants; wording needs NARROW_SCOPE (scope to action grants) and a count fix ("two-colon (three-segment) example `mechanical:develop:write`").

---

## K005 — Packet ordering: Pi's DAG disagrees with itself and with MW's DAG (INTERNAL + CROSS-PROGRAM)

Claims: C164 (CONTESTED), C163, C165 (NON-EPISTEMIC / SUPPORTED)

### Pi, line 35
pi-02:35 — "P02/P03 and producer M01–M04 can work concurrently; P04 needs their ratified exact API."

### Pi, line 51 (same document)
pi-02:51 — "### P02 — Actual producer descriptor and installed package admission (P0; P00 + Mechanical M01)"

### MW
mw-02:12-24 draws `M05 installed consumer | Pi P01–P06 registered function | v M06 joint native acceptance`: every Pi packet P01–P06 is placed after M05, which itself requires M01–M04 (mw-02:72 "M05 — Installed Pi-consumer conformance (P0; M01–M04)"). Pi needs M05 only at P07 (pi-02:89).

### Reconciliation attempts
- Scope split: P03 and M01–M04 touch disjoint repos and can proceed concurrently (SUPPORTED); P02's installed-host leg waits on M01 (Pi's own heading); P04 needs the ratified API.
- Version split: none — both DAGs are at their doc commits.
- Semantic split: Pi's P02 exit `PI-MECHANICAL-ARTIFACT` (L2) and MW's M05 describe overlapping work under different owners and labels (lens-mw-side row 26).

### Better-warranted side
Neither as drawn: both are proposals and they are incompatible as one joint schedule; Pi's internal inconsistency resolves against L35 (L51 is the explicit prerequisite). Row stays CONTESTED.

### What would settle it
A single joint DAG ruled in P00/M00 (one owner for the installed-consumer conformance step; M06 ≡ P07 as one event).

---

## K006 — `PI-FUNCTION-REGISTERED` names two different evidence levels (CROSS-PROGRAM)

Claims: C192, C203 (NON-EPISTEMIC), C205 (REFUTED), C223 (NON-EPISTEMIC)

### Pi
pi-02:72 — "**Gate:** `PI-FUNCTION-REGISTERED` is a real registered-path controlled test, not a stub typed helper; still not native real Claude/Forge until P07." (P04; pi-03 V3 "injected finite callbacks").

### MW
mw-02:84 — "**Exit:** joint `PI-FUNCTION-REGISTERED` then `PI-GIT-CENSUS-LIVE` receipts with Pi invocation, candidate commit/tree, installed SDK versions, original Mechanical outcome, Forge operation and proof" (M06, the joint NATIVE journey; L4-class).

### Better-warranted side
Neither (both normative). A joint ledger joining receipts by name would carry one gate name at two evidence levels; a receipt named `PI-FUNCTION-REGISTERED` could be read as native proof by one side and fixture-level by the other.

### What would settle it
One receipt vocabulary with the evidence level encoded (e.g. `-V3` vs `-L4`) ruled before P04/M06.

---

## K007 — Two incompatible `mechanical.pi-host/v1` binding shapes (CROSS-PROGRAM)

Claims: C112, C110, C036, C108, C167, C114 (all NON-EPISTEMIC proposals)

### Pi
pi-01:52-65 — `interface MechanicalArtifactBindingV1 { contract: "mechanical.pi-host/v1"; descriptorId; descriptorSha256; tarballSha256 /* exact packed @mechanical/workflows-development bytes */; hostPackage: "@mechanical/development-rig"; hostExportVersion: "v1"; evidenceProfile; contextProfile; workspaceRealpath; baseCommit; baseTree; forgeManifestSha256 }` (flat).

### MW
mw-01:54-77 — `interface MechanicalHostBindingV1 { contract: "mechanical.pi-host/v1"; descriptorId; artifact { package: "@mechanical/workflows-development"; export: "develop"; sha256; descriptorSha256 }; source { workspaceRealpath; baseCommit; baseTree; forgeManifestSha256 }; invocationId; evidenceProfile; contextProfile; intent { task; writer; allowedEffects } ... }` (nested; adds invocationId and intent).

### Agreements (positive control, lens-mw-side row 28)
contract name, `descriptorId: "mechanical.development.develop.v1"`, both profile enums, the four source axes, hostMode as Pi transport, the grant candidate `mechanical:develop-write` and its unadopted status.

### Better-warranted side
Neither; both are explicitly "requires joint adoption" (pi-01:43, mw-01). As written no single `mechanical.pi-host/v1` shape exists that an implementer of either side could code against and pass the other side's conformance. Also note (K009/C114): both bindings pin only the LIBRARY bytes while the RIG is identified by name plus the version string `hostExportVersion: "v1"`, which pi-01:68 itself forbids as exact identity.

### What would settle it
The P00/M00 ABI ruling: one struct name, nesting, field set, and a decision on a rig-bytes hash axis.

---

## K008 — Who owns the single-writer lease (CROSS-PROGRAM; term instability on "Host")

Claims: C033, C101, C102, C123 (NON-EPISTEMIC)

### Pi
pi-01:13 (source-admission row) — "Git source basis, canonical root, host attestation, lease, remeasurement and no-write refusals"; pi-01:78 (step 3) — "use `admitSourceWrite` for canonical authorized workspace, clean Git/Forge identity and writer lease"; pi-02:63 (P03 Preserve) — "attestation, lease and post-await remeasurement". Source: `src/workbench/source-admission.ts:46` "One WriterLeases registry binds the ...".

### MW
mw-01:44 (§2) — "Mechanical application host: trusted callback construction, exact installed artifact, provider SDK edges, Git source lease/candidate, effect recording, native Forge adapter."; mw-01:91 (step 4) — "Acquire a writer lease, ...". mw-README:46 uses "Host" for the Pi/consumer side ("Host owns principal, workspace, grants, admission and invocation lifetime") while mw-01 §4's "Host" is the Mechanical application host.

### Better-warranted side
Neither (both normative). The one-writer tests (pi-03 A12, mw-03 C22) need a single adjudicated lease owner or a two-level lease with explicit precedence.

---

## K009 — Receipt skeletons the "joint gate must join" do not join (CROSS-PROGRAM)

Claims: C278, C219 (NON-EPISTEMIC)

### Pi
pi-03:145-176 — `program: pi-mechanical-native-interop-2026-11-09 / phase: P07|P08|P09|P10 / evidence_level: V0|...|V6`, two tarball hashes (`mechanical_rig_tarball_sha256`, `mechanical_library_tarball_sha256`), `execution_status / effect_disposition / freshness`. pi-03:142 — "Each package must emit per-cut receipts, and the joint gate must join them".

### MW
mw-03:145-156 — `program: mechanical-pi-native-interop-2026-11-09 / packet: M06-or-M07-or-M08-or-M09 / evidence_tier: L0|...|L6`, one `mechanical_tarball_sha256`, no freshness or execution-state field.

### Evidence
Four distinct program identifiers exist (the two receipt `program` keys and the two directory names `mechanical-native-interoperability-2026-11-09` / `pi-native-interoperability-2026-11-09`); most field names differ (`pi_saved_definition_digest` vs `pi_definition_digest`, `native_claude_session_id` vs `claude_session_id`, `native_forge_verdict` vs `native_gate_verdict`); no join key is specified (lens-contradict row 8; lens-mw-side row 24).

### Better-warranted side
Neither (both "suggested" skeletons). SURFACE_DISAGREEMENT: one receipt schema, or a declared join key plus field map.

---

## K010 — Two evidence ladders (V vs L) with a semantic inversion at tier 3 (CROSS-PROGRAM + INTERNAL vocabulary)

Claims: C223 (NON-EPISTEMIC), C147 (SUPPORTED after arbitration), C181, C192 (NON-EPISTEMIC)

### Pi defines V, uses L
pi-03:9-15 defines V0–V6; V3 (pi-03:12) = "actual registered `workflow_execute(kind:function)`, tested with injected finite callbacks" (must-not-claim: native proof). Yet pi-01:134 "Current evidence is L0 plus historical tests/producer receipts at their own pins.", pi-02:57 "`PI-MECHANICAL-ARTIFACT` L2", pi-02:71 "L2 integration" use L-tiers that no Pi document defines (regex `\bL[0-9]\b` over pi-*.md: usages only).

### MW defines L
mw-03:9-15 defines L0–L6; L3 (mw-03:12) = "native producer: actual SDK session/operation, exact versions, native Git commit/tree and Forge complete gate envelope" (does-not-prove: registered Pi dispatch).

### Reconciliation
V2≈L2, V4≈L4, V5≈L5, V6≈L6 align; V3 (registered, not native) and L3 (native, not registered) are disjoint. A Pi per-cut receipt (`evidence_level: V*`) cannot express Pi's own L-graded packet exits without an unstated map.

### Better-warranted side
MW's ladder is at least defined where used; Pi's text mixes both. Not a factual conflict; a vocabulary defect (C147's substance unaffected).

### What would settle it
One ladder, or an explicit V↔L map published in pi-03 (tier 3 cannot be identified).

---

## K011 — "general-purpose orchestration registry" is both rejected and later-enableable (INTERNAL + CROSS-PROGRAM)

Claims: C288, C106, C141 (NON-EPISTEMIC)

### Pi §H
pi-03:186 — "**Explicit non-vetoes for first Git/plain v1:** HX task-scoped complete coverage, RF committed contextual model, remote host fleet, general-purpose orchestration registry, pure coordination/GP policy execution and Furnace Run/Attempt. Enable each only under separately witnessed native provider gates."

### Pi §2 / §7 and MW
pi-01:39 — "Do not create a generic registry that imports arbitrary user-named JS ..."; pi-01:127 — "**Add a generic dynamic module registry:** inappropriate for explicitly reviewed provider code."; mw-README:9 — "Do not make this library a scheduler, provider SDK wrapper, workflow DSL, agent fleet controller, generic tool registry or durable-state store."

### Better-warranted side
§2/§7 and MW (three statements, two programs, all architectural). Five of the six non-veto items map to planned optional packets (P11/P12, M10–M12); the registry maps to no packet anywhere. Repair: REMOVE_CLAIM (the registry item) or NARROW_SCOPE "not a veto, and not a planned feature either".

---

## K012 — Evidence footer vs present-tense "tested/drives/proof" body claims (VS-EVIDENCE-FOOTER)

Claims: C049 (NON-EPISTEMIC footer), C022, C025, C083 (SUPPORTED/ESTABLISHED), C179, C261, C262, C281 (ESTABLISHED on audit-side runs)

### Footer
pi-README:47 — "**Evidence status of this program:** documentation/source audit; no current build, full Forge gate, provider launch, installed end-to-end function run or benchmark performed for the doc commit." pi-03:3 — "No commands in this plan were executed to author it."

### Body
pi-README:23 — "Pi worktree cleanup now preserves changed bytes with a typed failure result for tested preservation failures; ... Keep their regression tests"; pi-01:25 — "`test/workbench-detached-grants.test.ts` drives their real preflight with fixtures"; pi-01:24 — "retain proof with byte-level fault injections".

### Reconciliation
The footer wins for the program's own warrant: for the doc commit no test was executed by the authors, so body "tested/drives/proof" claims are warranted as static source + test-file reading plus historical receipts (cap SUPPORTED for pass-claims; existence claims stay ESTABLISHED). Separately, the AUDIT ran the named suites in a scratch copy of 8e2fedeb (evidence/run-8e2fedeb/vitest-c179-c261.log: 9 files, 1620 tests passed; vitest-c262.log: 9 files, 130 tests passed; build.log rc=0). That run is audit-side evidence for C179/C261/C262/C281 and must not be attributed to the program; it covers selected suites only, not the full gate.

### Better-warranted side
Footer (for the program's claims); audit run (for the ledger's pass-statements, scoped to the selected suites).

---

## K013 — Token collision: P2/M2 as a mandatory stage and as a priority class (INTERNAL linguistic)

Claims: C040, C163 (NON-EPISTEMIC)

pi-README:37 — "**P2 observation/recovery:** native refs, four-arm outcomes and distinct status axes..." (a mandatory delivery stage) vs pi-02:112 — "### P11 — Detached function and Furnace-owned native Attempt (P2)" ("(P2)" = optional priority class) while the stage's own packets carry "(P0; ...)". Mirrored in MW (mw-README:38 "Registered joint lane (M2)" vs mw-02:14 packet "M02").

Better-warranted side: decodable (stages P0–P4 vs packets P00–P12 vs parenthetical priorities), no semantic conflict survives decoding; a misread hazard for implementers mapping README stages onto packet priorities. LINGUISTIC_INTEGRITY only.

---

## K014 — "do not relabel these historical defects as still absent" vs what the earlier programs actually said about run-abort (VS-EVIDENCE, history docs)

Claims: C026 (REFUTED on its abort conjunct), C022–C024 (unaffected), C287

### Program
pi-README:23 — "... the Claude host rechecks run abort after awaited startup. Keep their regression tests; do not relabel these historical defects as still absent." pi-README:13 — "corrections to old P0s".

### History docs at 8e2fedeb
11-04 `03-implementation-and-qa.md:22` — "workflow cancel (already re-checked after the await and covered by fault test F10; keep as a control)"; 11-04 `01-audit-and-evidence.md:37-39` — "### P1: cancellation at the startup boundary ... Potential race, reproduce before claiming fixed" (the per-agent skip); 11-06 `01-current-system-audit.md:28` — "P1 PI-CANCEL ... Workflow-wide abort is rechecked, but abortAgent(agentId) can miss a pending per-agent skip/retry". The worktree item is described open as P0 (11-04 01:21; 11-06 01:22) and the grants item as P1 (11-04 01:35; 11-06 01:26), both fixed at the pin.

### Better-warranted side
History docs. No earlier program document calls the run-abort recheck absent; their still-open item is the per-agent skip race during `beforeDispatch` (now the witnessed pending defect wb-9v02, K015). Narrower two-leg proposition (worktree, grants) is ESTABLISHED.

---

## K015 — "lacks full per-agent skip" / "need their own targeted tests" vs the tests that exist (VS-EVIDENCE)

Claims: C071 (REFUTED), C089 (REFUTED), C088 (ESTABLISHED), C070

### Program
pi-01:15 — "| `src/workbench/claude-host.ts` | ... | full per-agent skip/joint Mechanical cancellation and durable effect recovery |" (boundary column); pi-01:26 — "Per-agent skip/race, post-effect cancellation and host death need their own targeted tests, not a blanket source assertion."

### Source and tests at 8e2fedeb
`src/workflow/runtime.ts:986-994` (skip) → `src/workbench/claude-host.ts:357-360` (abortAgent); runtime skip tests, live-control B6, cancel-fault rows F2/F4/F6–F9; `test/workbench-mwi-cancel-repro.test.ts:1222` describe('EAT-R015 a runtime skip issued while the host's beforeDispatch is parked (wb-9v02)') expecting `{ kind: "observed-violation", breaches: ["sdk-started-after-skip", "not-settled-skipped", "script-received-a-value"] }`; `docs/workbench/receipts/wb-9v02.md:3` "a violation witnessed in all four cells, status pending".

### Reconciliation
- Scope split (holds): "joint Mechanical cancellation" and "durable recovery of Mechanical effects" ARE absent (zero 'mechanical' tokens in claude-host.ts; local-detached.ts:724 states the same boundary) — SUPPORTED. Per-agent skip of Claude agents exists and is tested.
- The honest open item is not "untested" but a witnessed, pending defect: a per-agent skip/retry issued while `beforeDispatch` is parked is lost (wb-9v02). Host death for the Claude host specifically has no test within the searched surface (UNDETERMINED; missing artifact: a test or receipt that kills the SDK child mid-query and asserts the settled/journal state).

### Better-warranted side
Source + tests. The artifact omits wb-9v02, which a function dispatch with effects must repair first.

---

## K016 — "no native reconciliation across process restarts" vs `reconcile.ts` (VS-EVIDENCE; ambiguous cell)

Claims: C075 (REFUTED on the unqualified clause), C074 (ESTABLISHED)

### Program
pi-01:17 — "| `src/workflow/{journal,runtime,reconcile}.ts` | ... | persisted Mechanical writer/gate intent and native reconciliation across process restarts |".

### Source at 8e2fedeb
`src/workflow/reconcile.ts:63-68` `RECONCILE_EVIDENCE_READS = Object.freeze({ furnace: ["furnace.run.inspect"], forge: ["forge.gate.status"], hyperunix: ["hyperunix.find"], reactivefiber: ["reactivefiber.render.preview"] })`; `:52` `RECONCILE_ACK_POLICY` 'exact-grant+same-scope+bound-entry+producer-evidence+operator-attested'; `runtime.ts:906/:1633` resume reconciliation sites.

### Reconciliation
Mechanical-qualified reading ("no persisted MECHANICAL intent and no MECHANICAL entry in the reconciliation map") is ESTABLISHED-absent (closed frozen map with no `mechanical` key). The unqualified reading the atomizer took is refuted: operator-attested native reconciliation across restarts exists for furnace, forge, hyperunix and reactivefiber.

### Better-warranted side
Source. Repair: qualify both clauses with "Mechanical" (annotation insert after the table).

---

## K017 — "WorktreePreservationFailedResult with original bytes/path" and "only one producer" (VS-EVIDENCE)

Claims: C176 (REFUTED), C180 (REFUTED), C067, C085 (ESTABLISHED)

### Program
pi-02:47 — "**Preserve already implemented:** `WorktreePreservationFailedResult` with original bytes/path, both registered detached Claude grant producers, post-`beforeDispatch` run-abort recheck."

### Source and history
`src/worktree.ts:85-91` — the type has `hasChanges`, `preservationFailed`, `path`, `diagnostic`, optional `branch?: undefined`; no bytes member; `:215` returns `{... path: worktree.path, diagnostic }`; `test/worktree.test.ts:491-501` asserts exact bytes retained on disk or in the kept HEAD. `git show 1c3cc1a4 -- src/index.ts:52,:66` removes `grants: []` from BOTH registered detached paths; `git log -S preservationFailed` → e76448ea (2026-11-06); `git log -S wb-a2g.5` → 59da7d84 (2026-10-15).

### Better-warranted side
Source. The result carries the path to retained bytes, not the bytes; before the fix NEITHER producer forwarded grants (the atomizer's "only one producer" gloss is the refuted part). The three fixes are real and historical.

---

## K018 — "single task-scheduling authority" vs Pi's several dispatch/queue authorities (VS-EVIDENCE; atomizer gloss)

Claims: C201 (REFUTED on the gloss), C106, C255 (NON-EPISTEMIC)

### Atomized premise
"Pi already has a workflow journal with replay and a single task-scheduling authority that the function path must not duplicate" (from pi-02:84 "without creating duplicate task scheduling authority").

### Source
`src/schedule.ts:50` `SubagentScheduler` (timer-driven), `src/agent-manager.ts:4-8` two concurrency pools, `src/workflow/admission.ts:12-17` three resource pools, `index.ts:2641/:3462/:3617` `void runWorkflowTask(ctx, task)`; `hosts/furnace-hosted.ts:4-9` "This module adds no scheduler, no retry".

### Better-warranted side
Source. The artifact never asserts "Pi has one scheduler" or "no scheduler"; pi-01:39 and pi-03:92 are norms. Phase-10 trap: a requirement compiled as "verify no scheduler exists in Pi" would be REFUTED at the pin; the defensible normative reading is "the function path must not introduce a Run/Work/Attempt or retry scheduler duplicating Furnace's".

---

## K019 — Profile identifiers "exist at the MW pin" vs code (VS-EVIDENCE; SAME_ORIGIN lineage)

Claims: C204 (REFUTED), C218 (REFUTED), C275 (REFUTED), C116 (NON-EPISTEMIC)

### Program
pi-02:91 — "... `git-census-v1` and `plain-v1`; ..."; pi-02:116 — "`rf-committed-v1` only after real render ID/..."; pi-03:134 — "Which `evidenceProfile` and `contextProfile` actually executed?"

### MW code and docs at 62a10b59 (also 7f3809fd)
`git grep -n -F 'git-census-v1'` over apps/packages/contracts/scripts/qa/skills/.agents/examples → only `.agents/skills/mechanical-pi-host/SKILL.md:24` ("proposed ABI ... needs joint conformance before it is shipped"); `plain-v1`, `evidenceProfile`, `contextProfile` → the same single hit; `rf-committed-v1` → `apps/development-rig/test/rf-context-preview.test.ts:2` "// Test-only ... does not enable rf-committed-v1."; `hx-task-scope-v1` → `test/hx-scope-develop.test.ts:2` "enables neither hx-task-scope-v1 nor ...". The rig's committed selectors are `discovery: "git-tracked-files"`, `context: "plain-task-context" | "reactive-fiber"`, `contextMode?: "plain" | "rf"` (live-development.ts:32-33, :61).

### Better-warranted side
Code. The identifiers are proposed vocabulary (11-06 docs → skill → both 11-09 programs: one lineage) with zero code witnesses; as OBSERVATIONS of existing identifiers they are refuted within the searched surface. Repair: MARK_AS_HYPOTHESIS/PROPOSAL + ADD_TEMPORAL_QUALIFIER ("once the ABI lands these selectors").

---

## K020 — "packed local host" vs what is actually packed and pinned (VS-EVIDENCE)

Claims: C028 (UNSUPPORTED), C030, C041, C185, C238

### Program
pi-README:24 — "packed local host"; pi-README:7 — "independently installed, digest-pinned Mechanical application host".

### MW source at 62a10b59
`apps/development-rig/src/installed-host.ts:1` "Transient local installer/loader for an exact SHA-256-pinned npm tarball"; `:31-38` verifies `@mechanical/workflows-development` identity and `copyDigest !== options.artifactDigest` (the LIBRARY); `apps/development-rig/package.json` exports/main absent; `qa/integration/installed-consumer.sh:10` installs the rig tgz with no digest check; MW's own skill (SKILL.md:14) "does not give Pi a stable callable rig-host export".

### Better-warranted side
Source. What is packed AND digest-pinned is the library tarball; the rig HOST is npm-packable but unexported and unpinned. Narrow proposition: "an in-repo host loader over a SHA-256-pinned packed library tarball". The apparent tension with C041 ("packaging is outstanding P0 work") dissolves once library and host axes are separated.

---

## K021 — "(MW-CONTRACT)" read as the MW document and as independent corroboration (VS-EVIDENCE + SAME_ORIGIN)

Claims: C063 (UNSUPPORTED), C062 (ESTABLISHED)

### Program
pi-01:12 — "`FUNCTION_ACTION_CONTRACT` explicitly unadopted (MW-CONTRACT), and not on production route".

### Source
`src/workbench/function-authority.ts:135` `export const FUNCTION_ACTION_BLOCKER = "MW-CONTRACT";` `:145` `FUNCTION_ACTION_CONTRACT = Object.freeze({ state: "unadopted", blockedOn: FUNCTION_ACTION_BLOCKER })`; 11-04 BEAD-PLAN.md:24/:73 lists MW-CONTRACT as an external producer dependency. mw-01:24 — "`src/workbench/function-authority.ts`: ... `FUNCTION_ACTION_CONTRACT` is unadopted pending joint action grammar; not called by registered function execution." (a sentence about the Pi file).

### Better-warranted side
Source. "(MW-CONTRACT)" is Pi's own blocker label; mw-01:24 concurs by restating Pi's source — same origin, not independent corroboration. The unadopted fact itself is ESTABLISHED (C062); only the independence assertion is unwarranted (this defect lives in the atomization, repaired in the ledger's permitted wording).

---

## K022 — A cited edit surface that does not exist: `src/workbench/observe-tool.ts` (VS-EVIDENCE; citation)

Claims: C076 (SUPPORTED on corrected sources), C077 (ESTABLISHED)

pi-01 §1 row 10 names `src/workbench/observe-tool.ts`; the path does not resolve at 8e2fedeb or b085c34e and never existed in history. The substance (bounded observation, statuses, controls, references) holds through `src/workbench/observation.ts`, `observe-query.ts`, `src/index.ts:2933` (workflow_observe registration) and `control-tool.ts`. Better-warranted side: the tree. Repair: REPLACE_SOURCE (annotation insert after the table); propagate to any requirement that lists observe-tool.ts as an edit surface.

---

## K023 — Mutation targets presuppose a function launch path that does not exist yet (VS-EVIDENCE)

Claims: C227 (UNSUPPORTED), C226 (NON-EPISTEMIC)

pi-03:21 — "Mutation tests remove one check (for example final rights re-read, digest, source change, intent write, gate selection proof or worktree preservation): the relevant assertion must turn red." The named checks exist as discrete component checks (function-authority.ts:364-368 fresh rights read; execute.ts digest; source-admission.ts:499 remeasure; runtime.ts:1839 dispatched marker; worktree.ts:211-215; forge-operation-observer.ts:13-15) but `execute-tool.ts:217-218` still refuses `function` before any of them compose, so no current function-launch path contains them all. Better-warranted side: source. Repair: SPLIT_CLAIM — tag each target current component vs planned function integration.

---

## K024 — README P4 "pure coordination evaluator" is future work, yet a pure-coordination boundary landed before the doc commit (DRIFT, doc commit)

Claims: C040 (NON-EPISTEMIC), C021, C058, C060 (ESTABLISHED, absence holds)

pi-README:39 lists the pure coordination evaluator under P4 optional. `git diff 8e2fedeb..b085c34e --name-status`: `A src/workbench/mechanical-coordination.ts` (419 lines; feat 3658beb9, 2026-11-08 09:02:47Z, wb-0gbh "invoke the one reviewed pure coordination export under a separate read-only grant and return its resolution as an observation, never an effect (EAT-R071, EAT-R072; installed-consumer leg explicitly partial)"), plus its test and three fixture contract files. The module is observation-only, imported by no production src file, and does not touch the registered function refusal. Better-warranted side: the tree at b085c34e. P4 is partially, not wholly, pre-satisfied; repair ADD_TEMPORAL_QUALIFIER on pi-README:39.

---

## K025 — W11 row in the prior feature-matrix carries two trunk ids for one re-measurement (VS-EVIDENCE in a PRIOR doc, not the audited artifact)

Claims: C046, C285, C080 (ESTABLISHED; statuses unaffected)

`docs/workbench/feature-matrix.md:112` "re-measured 2026-11-06 at trunk 814dcdd by wb-j5y5" vs `:217` "re-measured 2026-11-06 at trunk 600a253 by wb-j5y5"; the `:112` rationale "(beads only, no code, nothing in progress)" is contradicted later in the same row (collective-event.ts named; B-telemetry "measured 2026-11-07 at trunk 8ed3a73"). The status cell `planned` (bead status blocked) is consistent and is all the audited claims need. Downstream quoting should cite the status cell, not either trunk id.

---

## K026 — MW root README.md stale at the env pin vs docs/README.md at the same pin (MW-SIDE, corrected at 7f3809fd)

Claims: C027, C097 (ESTABLISHED)

mw-62a10b59 `README.md:50` "The checked-in entrypoint descriptor does not currently match the local loader's schema-ref check" (stale) vs mw-62a10b59 `docs/README.md:48` (repaired) and the repair commit 1f29daa7 (2026-11-05) in the pin's ancestry. Corrected by 9db0a714, present at 7f3809fd ("The committed descriptor and installed local loader are repaired"). Better-warranted side: git objects + docs/README.md. No Pi repair owed.

---

## K027 — "dated November 4" vs BEAD-PLAN generated 2026-11-06 (minor temporal)

Claims: C154 (SUPPORTED), C045 (ESTABLISHED)

BEAD-PLAN.md:3 "Generated 2026-11-06T06:05Z. Pins: doc@7c80c34346c2 | pi@b27829e6dfa7 | mw@f7c0a9431d6c": the plan belongs to the 2026-11-04 program but was generated on 2026-11-06. The 25-group count is exact either way. Repair: ADD_TEMPORAL_QUALIFIER in the ledger wording.

---

## K028 — Near-miss, not a contradiction: "add a scheduler inside Pi" norm vs the `SubagentScheduler` that exists

Claims: C106, C255 (NON-EPISTEMIC)

pi-01:39 "Do not ... add a scheduler inside Pi", pi-03:92 "not a made-up local scheduler", pi-02:113 "Furnace decides scheduling, retries, pause/stop, not Pi" are norms; the artifact never asserts "Pi has no scheduler". Recorded so that Phase 10 does not compile "verify no scheduler exists" (see K018).

---

## K029 — Tarball hash axes: two in Pi's receipt, one in MW's, rig bytes pinned by neither (CROSS-PROGRAM + INTERNAL)

Claims: C114, C112, C278 (NON-EPISTEMIC)

pi-01:56 `tarballSha256: string; // exact packed @mechanical/workflows-development bytes` is the ONLY byte hash in Pi's binding beside `hostPackage`/`hostExportVersion: "v1"` (name + version, no rig bytes), while pi-01:68 says "Do not substitute one for another or use a package version string as exact identity"; pi-03:155-156 names two tarball hashes; mw-03:156 one. Better-warranted side: pi-01:68's own rule — the code that performs trusted loading, SDK and Forge edges is the RIG, so a rig-bytes axis (or an explicit decision not to pin it) is owed. ADD_MISSING_PREMISE for P00/M00.

---

## K030 — Soft: observation envelope axes (Pi's illustrative envelope lacks MW's recovery handle / evidence provenance)

Claims: C131, C129 (NON-EPISTEMIC)

pi-01:93-107 `MechanicalObservationV1 {...}` ("This is **illustrative**", pi-01:110) vs mw-01:97 seven orthogonal axes plus "worktree recovery handle" and "bounded evidence provenance". The seven MW axes map onto Pi fields; the two extras do not. Compatible with "illustrative"; note for P05/P06 design.

---

## K031 — Operational caveat, not a disagreement: MW's mise toolchain pins Node 22.23.2 while the joint matrix is Node 24

Claims: C266, C267 (ESTABLISHED), C268 (NON-EPISTEMIC)

Pi `package.json` engines `>=24`; MW manifests `>=22.18.0 <25` → intersection Node 24.x (both docs state it: pi-03:122, mw-03:123). But mw-62a10b59 `.mise.toml` and `apps/development-rig/.mise.toml` pin `node = "22.23.2"`, outside Pi's range: a Node-24 joint matrix runs MW outside its own toolchain pin. Record beside the matrix (optional ADD_MISSING_PREMISE).
