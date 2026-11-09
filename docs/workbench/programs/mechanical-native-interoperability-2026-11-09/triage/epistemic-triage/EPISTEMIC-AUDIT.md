# EPISTEMIC-AUDIT — mechanical-native-interoperability-2026-11-09 (Pi-subagents)

Consolidated 2026-11-09 (Phase 6). Ledger: `CLAIMS.jsonl` (289 rows), `RELATIONS.jsonl` (487 edges), `CONTRADICTIONS.md` (31 sets K001–K031), `SOURCE-MAP.md`, `REMEDIATION.md` (39 rows M001–M039), `dossiers/` (10), `ARBITRATION-2026-11-09.md` (8 ruled rows), `evidence/run-8e2fedeb/` (audit-side build+test logs). Every verdict carries `graded <status> at pin pi-8e2fedeb/mw-62a10b59 2026-11-09` in its `verdict_history`.

## 1. Pinned substrate

- **Artifact (document pin):** the four program docs at Pi master `b085c34ed01cb71ce0d600ac98ade7ee18e832f0` — `docs/programs/mechanical-native-interoperability-2026-11-09/{README,01-AUDIT-AND-PROTOCOL,02-IMPLEMENTATION-PACKAGES,03-VERIFICATION-AND-RELEASE}.md`, byte-identical to the deposited copies (sha256 prefixes 10c0c7d9fe95, 04daed2d2e6a, 4d9f748a12ca, 5495723c3d03).
- **Environment pins (what claims describe, where they were judged):** Pi `8e2fedeb8e3ce7d94c2d3724a6ef7e2c5eb02164` (the program's own stated baseline); MW `62a10b5924ccb10db428999cb148fa23f732e4fe`.
- **Context:** MW sibling program at MW main `7f3809fd8d6f20d22b9b4b81b6dfdb917bcc3c73`; Pi doc-commit tree `b085c34e` used for drift notes only.
- **Audit-side execution:** one scratch build + two selected vitest runs of the 8e2fedeb source (evidence/run-8e2fedeb: build rc=0; 9 files/1620 tests and 9 files/130 tests, all passed; Node v24.20.0). This is the audit's evidence, never the program's.

## 2. Claim inventory

289 atomic claims (196 material). By status:

| Status | Rows | Material |
|---|---|---|
| ESTABLISHED | 132 | 132 |
| SUPPORTED | 46 | 46 |
| NON-EPISTEMIC | 93 | 0 |
| REFUTED | 13 | 13 |
| UNSUPPORTED | 3 | 3 |
| CONTESTED | 1 | 1 |
| UNDETERMINED | 1 | 1 |

By kind: OBSERVATION 160 (118 ESTABLISHED / 30 SUPPORTED / 10 REFUTED / 2 UNSUPPORTED), NORMATIVE 72 (all NON-EPISTEMIC), SOURCE_REPORT 17 (6/6/3 + 1 UNDETERMINED + 1 UNSUPPORTED), INFERENCE 17 (7 ESTABLISHED / 9 SUPPORTED / 1 CONTESTED), PROPOSAL 17, DEFINITION 4, HYPOTHESIS 1 (SUPPORTED), FORMAL_DERIVATION 1 (ESTABLISHED — the Node 24 intersection).

By document: pi-README 49 (2 defects), pi-01 100 (4 defects), pi-02 70 (8 defects), pi-03 70 (4 defects).

Grading sources: 206 rows from the five Wave-3 audits (60 double-audited; 8 conflicts arbitrated from primary evidence — `ARBITRATION-2026-11-09.md`); 14 material rows graded from named lens rows or consolidator probes re-run at the pins; 69 non-material NORMATIVE/PROPOSAL/DEFINITION rows carried as NON-EPISTEMIC from the atomizer with lens annotations where contradictions touch them.

## 3. Highest-impact defects

1. **C205 REFUTED — P07's gate joins a receipt nobody defines.** pi-02:93 requires "joined `PI-GIT-CENSUS-LIVE` and `MW-PI-NATIVE-LIVE` receipts"; `MW-PI-NATIVE-LIVE` occurs nowhere in the four MW docs or either repo at any audited pin except that line. MW M06 exits with `PI-FUNCTION-REGISTERED` then `PI-GIT-CENSUS-LIVE` (mw-02:84). An implementer would gate on a receipt that is never emitted. (K001; M013.)
2. **C166 REFUTED — P07's dependency misreads M05/M06.** M05 is fixture-safe installed-consumer conformance ("**L2**, not native provider proof", mw-02:77); M06 is the joint registered journey, i.e. the same event as P07, not producer-side input. (K002; M008.)
3. **C164 CONTESTED — the two programs' DAGs cannot both hold.** pi-02:35 declares P02 concurrent with M01-M04 while pi-02:51 gates P02 on M01, and MW's graph orders M05 before every Pi packet. Bead dependency edges cannot be filed from the artifact as written; P00/M00 must rule one joint DAG. (K005; M007.)
4. **C204/C218/C275 REFUTED — the profile vocabulary does not exist in code.** `git-census-v1`, `plain-v1`, `rf-committed-v1`, `evidenceProfile`, `contextProfile` have zero code witnesses at either MW pin (the only code-adjacent hits are test comments saying NOT enabled); the rig's committed selectors are `discovery`/`context`/`contextMode` with different literals. Three doc generations (11-06 docs → MW skill → both 11-09 programs) are one SAME_ORIGIN lineage. (K019; M012/M014/M018.)
5. **C239 REFUTED — V2 imports a package subpath that does not exist.** `@mechanical/development-rig/host` is absent at 62a10b59 and 7f3809fd (rig `exports` is null); MW says even the spelling is "chosen jointly after package test" (mw-01:82). (K003; M017.)
6. **C089/C071 REFUTED — the "untested" framing hides a witnessed defect.** Targeted tests for per-agent skip/race and late cancellation exist; the real open item is wb-9v02 (a skip/retry during a parked `beforeDispatch` is lost — witnessed, pending), which must be repaired before any effectful function dispatch; host death of the SDK child is the genuinely untested member (UNDETERMINED). (K015; M006/M004.)
7. **C028 UNSUPPORTED — "packed local host" overstates the producer artifact.** What is packed and digest-pinned is the library tarball; the rig host is npm-packable but unexported and unpinned — which is exactly why M01/P02 exist. (K020; M002.)
8. **C075/C201/C176/C180 REFUTED (cell ambiguity and audit glosses).** Unqualified readings of pi-01's boundary cells deny reconciliation that exists (reconcile.ts's four-producer map) and a preservation result that does carry a path (not bytes); two REFUTED rows (C180 "only one producer", C201 "single scheduling authority") are defects of the audit's own atomization, repaired in the ledger. (K016/K017/K018; M005/M009/M010/M011.)
9. **C063 UNSUPPORTED — "(MW-CONTRACT)" is Pi's own blocker label,** and mw-01:24 restates Pi's source (same origin); the unadopted fact itself (C062) is ESTABLISHED. (K021; M003.)
10. **Receipt/vocabulary joins (NON-EPISTEMIC but blocking):** `PI-FUNCTION-REGISTERED` names a V3 fixture gate in Pi and the L4 native exit in MW (K006); the two receipt skeletons share no join key and four distinct program identifiers are in play (K009); the V/L evidence ladders invert at tier 3 and Pi's own text uses undefined L-tiers (K010; C147 arbitrated SUPPORTED). All routed to the P00/M00 ruling (M021/M025/M026).

## 4. Contradiction sets

31 sets in `CONTRADICTIONS.md`: K001–K011 cross-program or internal (receipt labels, M05/M06, host subpath, grant-spelling miscount, DAG order, PI-FUNCTION-REGISTERED levels, binding shapes, lease owner, receipt skeletons, V/L ladders, non-veto registry item), K012 the evidence-footer cap, K013 P2/M2 token collision, K014–K023 program-vs-evidence (abort-history, skip tests, reconciliation cell, preservation result, scheduler gloss, profile ids, packed host, MW-CONTRACT, observe-tool.ts citation, mutation targets), K024 drift (pure-coordination boundary landed before the doc commit), K025–K027 history-doc and MW-side wrinkles, K028 a recorded near-miss, K029 tarball hash axes, K030 observation-envelope axes (soft), K031 the Node/mise toolchain caveat. Each set quotes both sides verbatim and names the better-warranted side; none was averaged away.

## 5. Provenance and source independence

See `SOURCE-MAP.md`. 150 rows read the Pi env pin, 60 the MW env pin, 61 history docs/git objects, 16 git topology; 8 rows rest on the audit-side scratch run. Nine SAME_ORIGIN lineages are recorded; the largest: the whole `mechanical.pi-host/v1` + profile vocabulary is one 11-06-rooted lineage re-proposed by both 11-09 programs (so the two programs "agreeing" on it is not corroboration), and mw-01's sentences about Pi source are restatements, not independent MW-side witnesses. Genuine multi-lineage corroborations: the registered `function` refusal (Pi code + Pi tests + MW skill + MW sibling doc), and the three historical fixes (git objects + tests + audit-side run). Rows whose recorded evidence is documentary only: C147, C164, C166, C207, C221 — none asserts runtime behaviour.

## 6. Propagation

18 rows carry explicit propagation notes. Distinctions preserved: **conclusion-refuted** (C089, C180, C205, C218 — their own evidence refutes them, premises aside); **derivation-broken but proposal intact** (C163, C203, and the NORMATIVE consumers C226/C230/C236/C272 whose presupposed premises failed — the norms stand as plans once re-qualified); **independently-supported despite a failed premise** (C047, C030, C034, C041, C179 — each re-warranted by direct evidence, statuses unchanged). No downstream claim was silently capped; C031 and C094 were checked for inheriting more than their premises allow (C031 arbitrated ESTABLISHED because its inference is deductive from the refusal; C094 inherits C093's substance, which survived arbitration).

## 7. Linguistic-strength mismatches

Recurring unsafe promotions found and repaired in `permittedWording` (artifact fixes deferred as annotation inserts): *documented → implemented* (C204/C218/C239/C275: proposed ABI vocabulary and subpath read as existing); *capability → exercised* (C238 "packable" vs packed; C260 "runnable" in form only); *tested → correct at the doc commit* (K012: body present-tense "tested/drives/proof" capped by the program's own footer — pass-claims rest on the audit-side run, not the program's); *conjunction inflation* (C026, C071, C075, C089: one false conjunct in an otherwise true cell); *miscount* ("three-colon" for a two-colon example, K004); *gloss inflation by the audit itself* (C180 "only one producer", C201 "single scheduling authority", C063 "corroborated from the MW side" — ledger-repaired, artifact innocent).

## 8. Remediation summary

39 rows (M001–M039): 11 NARROW_SCOPE, 6 SPLIT_CLAIM, 6 SURFACE_DISAGREEMENT, 6 ADD_TEMPORAL_QUALIFIER, 2 ADD_MISSING_PREMISE, 2 ADD_SOURCE, 2 DOWNGRADE_MODALITY, 1 each REPLACE_SOURCE / MARK_AS_HYPOTHESIS / REMOVE_CLAIM / PRESERVE_AS_UNDETERMINED. The artifact is a hash-pinned program doc: 33 repairs are annotation inserts whose `Repair` cell reads `deferred: pin advance awaits owner (pi-subagents owner)`; 5 are applied in the ledger because the defect is the audit's own atomization; 1 preserves C221 as UNDETERMINED. Inverse coverage check passes: every REFUTED/UNSUPPORTED/CONTESTED row appears in the `Claims` column (set difference empty).

## 9. Unresolved / UNDETERMINED and what would settle each

- **C221** (author's "no commands were executed"): an authoring transcript or shell history for the 06:24Z–08:42Z doc-commit window.
- **C089's host-death member:** a test or receipt that kills the SDK child mid-query and asserts the settled result/journal state.
- **Quality-word absences** (C068 "full" crash/power-loss handling; C030 "stable" as a quality property): an explicit rubric; held at hedged wording, not promoted.
- **wb-9v02** (per-agent skip/retry lost at the parked barrier): the repair receipt; until then the defect is pending by Pi's own receipt.
- **All P00/M00 decisions** (joint DAG, binding shape, receipt vocabulary and skeleton join key, lease owner, V↔L map, rig-bytes hash axis, host-subpath spelling): one joint ruling each; these are the program's own planned gates, not audit inventions.

## 10. Drift summary (8e2fedeb → b085c34e; MW 62a10b59 → 7f3809fd)

The doc commit is 64 commits (~12 h) ahead of the stated Pi baseline; MW main moved 12 commits (docs/scripts only). Full-tree diff at Pi: exactly 25 paths; **none of the doc-01-cited source files changed** — every §1-row verdict carries unchanged to b085c34e. Material drift: (a) `src/workbench/mechanical-coordination.ts` landed (observation-only pure-coordination boundary, wb-0gbh, imported by no production module) — partially pre-satisfying README's P4 item (K024) and making "no src consumer at all" of mechanical-descriptor.ts false at b085c34e while the function-route absences all hold; (b) the descriptor test grew +383 lines (R008 digest-grammar rows against the unchanged module); (c) the program deposit itself rewrote SKILL.md and mechanical-function-hosting.md to the corrected statements (self-fulfilling part of its reconciliation promise); (d) MW 7f3809fd corrected its stale root-README descriptor sentence; the rig package and all profile-identifier absences are unchanged. The refusal line `execute-tool.ts:218` is byte-identical at 8e2fedeb, the branch tip 524c2258 and b085c34e.

## 11. What the program may claim as written vs what needed narrowing

**As written (warranted at the pins):** the registered `workflow_execute` route refuses `kind:function` before any resolve/launch on both inspected variants; the function-authority/source-admission/descriptor seams exist, are adversarially tested, and are reachable from no production route; `FUNCTION_ACTION_CONTRACT` is unadopted and blocked on MW-CONTRACT; the three historical fixes (worktree preservation, both detached producers' grants, run-abort recheck) are real, fixed and regression-tested; MW exports the four-service `develop(services, request)` with four outcome kinds and a committed descriptor whose schema refs are repaired; the W11 feature stays planned/blocked with no joined native acceptance in the searched stores; the Node-24 intersection; the evidence footer itself.

**Needed narrowing (now bounded in the ledger, inserts deferred to the owner):** "packed local host" → in-repo loader over a pinned library tarball; "with original bytes/path" → path to retained bytes; boundary cells → Mechanical-qualified; "three-part/three-colon spelling" → the two-colon example, action grants only; P07's dependency/gate → M05 is L2, the live receipt pair is MW's, `MW-PI-NATIVE-LIVE` is unratified; profile identifiers and `/host` subpath → proposed, future-tense; mutation targets → component checks until a function path composes them; "L0" → V0 with a published V↔L map; the non-veto list minus the rejected registry item; present-tense "tested/drives/proof" → static reading plus historical receipts (the program ran nothing; the audit's own run is separate evidence).

## 12. Audit limits

No live Forge/Claude/Furnace run, no MW build, no npm pack, and no registered function dispatch were executed (the route refuses by design). The audit-side vitest run covered 18 selected files, not the full gate, under CI=1 on one host. Absence claims are bounded by the detection models recorded per row (grep/symbol/import surfaces; package-manifest parses); surfaces outside them (e.g. unexported runtime behaviour, other deployments) are not covered. MW rig host API stability claims rest on MW-side artifacts only. Counts above are descriptive; no aggregate confidence score is produced. The live trunk continued to move during the audit and is not an audit target; verdicts hold at the named pins only.
