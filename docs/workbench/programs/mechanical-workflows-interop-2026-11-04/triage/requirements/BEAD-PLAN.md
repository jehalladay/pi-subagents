# BEAD PLAN — Pi <-> MechanicalWorkflows interop (planning labels, no fabricated wb- ids)

Generated 2026-11-06T06:05Z. Pins: doc@7c80c34346c2 (program docs) | pi@b27829e6dfa7 (environment) | mw@f7c0a9431d6c (environment).

Rules (binding on filing):
- Labels `B-<group>` are planning labels. Real `wb-` bead IDs are issued by `bd` at filing time and are **never invented here** (EAT-R086: a missing real bead ID forbids creating a wb receipt).
- One bead = one independently landable cut: it builds green at its own commit through the workbench machine, carries its own tests, docs and receipt, and does not require a sibling bead in the same cut.
- Never weaken or delete an existing safety test to fit code. Where an existing characterization test conflicts with a required contract (B-preserve), obtain an explicit specification ruling first; the ruling is part of the cut receipt.
- MW-owned rows are tracked with the MW owner and are **not** Pi beads; Pi beads may depend on their delivery via the named gates.

User directive (relayed 2026-11-06): "start merging your work into the master branch." Disposition: work lands on pi-subagents `master` only through the workbench machine landing lane; the first landing is the B-docs cut (EAT-R004). The directive supplies direction, not machine consent: admission and current repository authorizations are resolved at landing time, and this plan performs no commit, merge, push or filing itself.

## Landing order (topological; Pi beads)

| # | Bead | Slice | Reqs | Depends on | External | Gate | Landable now? |
|---|---|---|---|---|---|---|---|
| 1 | B-preserve | PI-0 | EAT-R001..EAT-R003 (3) | — | — | — | yes — Pi-local repair; premise verified at pin (worktree.ts outer catch) |
| 2 | B-docs | PI-0 | EAT-R004, EAT-R094..EAT-R143 (51) | — | — | — | yes — docs-only cut applying the 50 REMEDIATION corrections + landing program/triage |
| 3 | B-unknowns | PI-0 | EAT-R080, EAT-R081 (2) | — | — | EVIDENCE-CENSUS | yes — evidence cuts; external receipt stores stay unread without authorization (records searched-scope absence or UNDETERMINED) |
| 4 | B-release | PI-7 | EAT-R082..EAT-R087 (6) | — | — | — | yes — receipt/status validators; applies to every other bead from its first cut |
| 5 | B-contract-choice | PI-0 | EAT-R005, EAT-R006 (2) | — | MW-CONTRACT | — | no — blocked on MW-CONTRACT adoption of one selector/ABI (KU10 unresolved) |
| 6 | B-descriptor | PI-0 | EAT-R007..EAT-R011 (5) | — | MW-CONTRACT, MW-PACKAGE | MW-INSTALLED-CONSUMER | partial — fixture guardrails land now; installed-consumer leg gated MW-INSTALLED-CONSUMER |
| 7 | B-source | PI-1 | EAT-R022..EAT-R027 (6) | — | — | — | yes — Pi-local admission guards |
| 8 | B-authority | PI-1 | EAT-R028..EAT-R031 (4) | — | MW-CONTRACT | — | partial — enforcement seams land now; exact action grammar blocked on MW-CONTRACT |
| 9 | B-detached-grants | PI-6 | EAT-R012..EAT-R014 (3) | — | — | PI-DETACHED-GRANTS | yes — Pi-local repair of both registered producers (grants:[] verified at pin) |
| 10 | B-replay | PI-4 | EAT-R017..EAT-R021 (5) | — | — | — | yes — Pi-local fingerprint extension (omissions verified at pin claude-host.ts) |
| 11 | B-cancel-repro | PI-4 | EAT-R015, EAT-R016 (2) | — | — | — | yes — bounded experiment cut; may land with pending status and no production fix |
| 12 | B-limits | PI-7 | EAT-R073..EAT-R076 (4) | — | — | — | yes — Pi-local validation and caps (Semaphore zero verified at pin) |
| 13 | B-dispatch | PI-1 | EAT-R032..EAT-R035 (4) | B-contract-choice, B-descriptor, B-source, B-authority | MW-HOST | PI-FUNCTION-REGISTERED | no — needs installed MW-HOST facade; gated PI-FUNCTION-REGISTERED |
| 14 | B-outcomes | PI-3 | EAT-R036..EAT-R040 (5) | B-dispatch | — | — | yes — projection/serialization seams against host outcome fixtures |
| 15 | B-effects | PI-4 | EAT-R041..EAT-R044 (4) | B-dispatch | — | — | yes — Pi-local durable intent/journal seams |
| 16 | B-controls | PI-4 | EAT-R045..EAT-R050 (6) | B-effects | MW-CANCEL | PI-CANCEL-RECOVERY | partial — Pi wiring and fixtures land now; live cancel leg gated PI-CANCEL-RECOVERY (MW-CANCEL) |
| 17 | B-observe | PI-4 | EAT-R051, EAT-R052 (2) | B-outcomes, B-effects | — | — | yes — Pi-local reopen/freshness seams |
| 18 | B-telemetry | PI-7 | EAT-R077..EAT-R079 (3) | B-limits | — | PI-MULTIWORKFLOW-LOAD | yes — local instrumentation; load journey is the PI-MULTIWORKFLOW-LOAD closure cut |
| 19 | B-git-census | PI-3 | EAT-R053..EAT-R056 (4) | B-preserve, B-dispatch, B-outcomes, B-effects | MW-HOST, MW-CANCEL | PI-GIT-CENSUS-LIVE | no — live evidence cut; gated PI-GIT-CENSUS-LIVE after dispatch lands |
| 20 | B-hx-evidence | PI-5 | EAT-R057 (1) | — | HX-PRODUCER | HX-TASK-SCOPE-PROBE | yes — probe cut records capability or a named blocker (HX-TASK-SCOPE-PROBE) |
| 21 | B-hx-admit | PI-5 | EAT-R058, EAT-R059 (2) | B-dispatch, B-hx-evidence | MW-NATIVE | PI-HX-RF-LIVE | partial — fixture guardrails land now; live witness gated PI-HX-RF-LIVE (MW-NATIVE) |
| 22 | B-rf-admit | PI-5 | EAT-R060..EAT-R063 (4) | B-dispatch | MW-NATIVE | PI-HX-RF-LIVE | partial — fixture guardrails land now; live witness EAT-R063 gated PI-HX-RF-LIVE (MW-NATIVE) |
| 23 | B-detached-function | PI-6 | EAT-R064..EAT-R067 (4) | B-dispatch, B-detached-grants, B-effects, B-observe | MW-HOST, MW-CANCEL | PI-DETACHED-FUNCTION-LIVE | no — depends on detached-grants + dispatch; gated PI-DETACHED-FUNCTION-LIVE |
| 24 | B-furnace-function | PI-6 | EAT-R068..EAT-R070 (3) | B-dispatch, B-effects, B-observe | MW-FURNACE | PI-FURNACE-FUNCTION-LIVE | no — optional host mode; gated PI-FURNACE-FUNCTION-LIVE (MW-FURNACE); unsupported producer API is a named blocker, never a Pi facsimile |
| 25 | B-coordination | PI-7 | EAT-R071, EAT-R072 (2) | B-descriptor, B-authority | MW-COORDINATION | PI-COORDINATION-INSTALLED | no — gated PI-COORDINATION-INSTALLED (MW-COORDINATION) |

## Bead details

### B-preserve — P0 preserve edited worktrees when Git preservation fails

- Slice PI-0; requirements: EAT-R001, EAT-R002, EAT-R003.
- Landability: yes — Pi-local repair; premise verified at pin (worktree.ts outer catch).
- Note: First bead. Source-established risk, no runtime loss observed. Existing false-clean characterization assertions conflict with the requested contract: obtain explicit approval to correct those specifications before changing them; never weaken or delete a safety test to fit code.

### B-docs — Land corrected program and audited triage through the workbench machine

- Slice PI-0; requirements: EAT-R004, EAT-R094, EAT-R095, EAT-R096, EAT-R097, EAT-R098, EAT-R099, EAT-R100, EAT-R101, EAT-R102, EAT-R103, EAT-R104, EAT-R105, EAT-R106, EAT-R107, EAT-R108, EAT-R109, EAT-R110, EAT-R111, EAT-R112, EAT-R113, EAT-R114, EAT-R115, EAT-R116, EAT-R117, EAT-R118, EAT-R119, EAT-R120, EAT-R121, EAT-R122, EAT-R123, EAT-R124, EAT-R125, EAT-R126, EAT-R127, EAT-R128, EAT-R129, EAT-R130, EAT-R131, EAT-R132, EAT-R133, EAT-R134, EAT-R135, EAT-R136, EAT-R137, EAT-R138, EAT-R139, EAT-R140, EAT-R141, EAT-R142, EAT-R143.
- Landability: yes — docs-only cut applying the 50 REMEDIATION corrections + landing program/triage.
- Note: Docs-only cut; no source or test edits. Program already exists at the Pi pin: land corrections plus the triage, not a duplicate program. This plan performs no commit, merge, push or filing. Delivery must use the live machine rules and real user authority, not this plan as consent.

### B-unknowns — Acquire missing producer evidence without upgrading audit claims

- Slice PI-0; requirements: EAT-R080, EAT-R081.
- Landability: yes — evidence cuts; external receipt stores stay unread without authorization (records searched-scope absence or UNDETERMINED).
- Closure gate: EVIDENCE-CENSUS — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).

### B-release — Require test-first machine cuts and evidence-backed slice status

- Slice PI-7; requirements: EAT-R082, EAT-R083, EAT-R084, EAT-R085, EAT-R086, EAT-R087.
- Landability: yes — receipt/status validators; applies to every other bead from its first cut.
- Note: Cross-cut closure obligations apply to every bead from its first cut; this group defines receipt/schema enforcement, not permission to defer docs until the end.

### B-contract-choice — Adopt the Pi side of one versioned cross-repository invocation contract

- Slice PI-0; requirements: EAT-R005, EAT-R006.
- Landability: no — blocked on MW-CONTRACT adoption of one selector/ABI (KU10 unresolved).
- External producer dependencies: MW-CONTRACT (MW/HX-owned; see MW-owned tracks).
- Note: Do not decide profile versus mode by counting same-author documents. Both remain proposals; implementation blocked on a jointly adopted producer contract.

### B-descriptor — Validate the actual published descriptor and artifact at the Pi boundary

- Slice PI-0; requirements: EAT-R007, EAT-R008, EAT-R009, EAT-R010, EAT-R011.
- Landability: partial — fixture guardrails land now; installed-consumer leg gated MW-INSTALLED-CONSUMER.
- External producer dependencies: MW-CONTRACT, MW-PACKAGE (MW/HX-owned; see MW-owned tracks).
- Closure gate: MW-INSTALLED-CONSUMER — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).

### B-source — Admit writes only against host-owned immutable source identity

- Slice PI-1; requirements: EAT-R022, EAT-R023, EAT-R024, EAT-R025, EAT-R026, EAT-R027.
- Landability: yes — Pi-local admission guards.

### B-authority — Enforce exact function authority at the final dispatch boundary

- Slice PI-1; requirements: EAT-R028, EAT-R029, EAT-R030, EAT-R031.
- Landability: partial — enforcement seams land now; exact action grammar blocked on MW-CONTRACT.
- External producer dependencies: MW-CONTRACT (MW/HX-owned; see MW-owned tracks).

### B-detached-grants — Repair both registered detached Claude grant producers

- Slice PI-6; requirements: EAT-R012, EAT-R013, EAT-R014.
- Landability: yes — Pi-local repair of both registered producers (grants:[] verified at pin).
- Closure gate: PI-DETACHED-GRANTS — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).
- Note: Independent of embedded function launch; preserve local-detached validators. workflow_detached defaults deterministic even though tool registration is Claude-config gated: only its explicitly selected Claude backend has this defect.

### B-replay — Bind agent replay identity to measured source and effective dependencies

- Slice PI-4; requirements: EAT-R017, EAT-R018, EAT-R019, EAT-R020, EAT-R021.
- Landability: yes — Pi-local fingerprint extension (omissions verified at pin claude-host.ts).

### B-cancel-repro — Reproduce parked per-agent skip and retry before choosing a repair

- Slice PI-4; requirements: EAT-R015, EAT-R016.
- Landability: yes — bounded experiment cut; may land with pending status and no production fix.
- Note: Evidence-first bead may land a bounded experiment and pending status without a production fix. A witnessed red authorizes a separate repair proposal; it must not close PI-4.

### B-limits — Validate positive host resource limits without a second scheduler

- Slice PI-7; requirements: EAT-R073, EAT-R074, EAT-R075, EAT-R076.
- Landability: yes — Pi-local validation and caps (Semaphore zero verified at pin).

### B-dispatch — Launch authorized embedded functions through the registered Pi tool

- Slice PI-1; requirements: EAT-R032, EAT-R033, EAT-R034, EAT-R035.
- Landability: no — needs installed MW-HOST facade; gated PI-FUNCTION-REGISTERED.
- Ordering dependencies (landed-before, not same-cut): B-contract-choice, B-descriptor, B-source, B-authority.
- External producer dependencies: MW-HOST (MW/HX-owned; see MW-owned tracks).
- Closure gate: PI-FUNCTION-REGISTERED — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).

### B-outcomes — Preserve Mechanical domain outcomes and native evidence independently

- Slice PI-3; requirements: EAT-R036, EAT-R037, EAT-R038, EAT-R039, EAT-R040.
- Landability: yes — projection/serialization seams against host outcome fixtures.
- Ordering dependencies (landed-before, not same-cut): B-dispatch.

### B-effects — Persist effect intent and preserve ambiguous outcomes across restart

- Slice PI-4; requirements: EAT-R041, EAT-R042, EAT-R043, EAT-R044.
- Landability: yes — Pi-local durable intent/journal seams.
- Ordering dependencies (landed-before, not same-cut): B-dispatch.

### B-controls — Target Pi controls exactly and retain cancellation uncertainty

- Slice PI-4; requirements: EAT-R045, EAT-R046, EAT-R047, EAT-R048, EAT-R049, EAT-R050.
- Landability: partial — Pi wiring and fixtures land now; live cancel leg gated PI-CANCEL-RECOVERY (MW-CANCEL).
- Ordering dependencies (landed-before, not same-cut): B-effects.
- External producer dependencies: MW-CANCEL (MW/HX-owned; see MW-owned tracks).
- Closure gate: PI-CANCEL-RECOVERY — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).

### B-observe — Reopen native invocation observations with honest freshness

- Slice PI-4; requirements: EAT-R051, EAT-R052.
- Landability: yes — Pi-local reopen/freshness seams.
- Ordering dependencies (landed-before, not same-cut): B-outcomes, B-effects.

### B-telemetry — Bound progress output and measure cross-invocation resource behavior

- Slice PI-7; requirements: EAT-R077, EAT-R078, EAT-R079.
- Landability: yes — local instrumentation; load journey is the PI-MULTIWORKFLOW-LOAD closure cut.
- Ordering dependencies (landed-before, not same-cut): B-limits.
- Closure gate: PI-MULTIWORKFLOW-LOAD — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).

### B-git-census — Compose the installed Git-census host in an isolated Pi-owned invocation

- Slice PI-3; requirements: EAT-R053, EAT-R054, EAT-R055, EAT-R056.
- Landability: no — live evidence cut; gated PI-GIT-CENSUS-LIVE after dispatch lands.
- Ordering dependencies (landed-before, not same-cut): B-preserve, B-dispatch, B-outcomes, B-effects.
- External producer dependencies: MW-HOST, MW-CANCEL (MW/HX-owned; see MW-owned tracks).
- Closure gate: PI-GIT-CENSUS-LIVE — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).
- Note: PI-3 is embedded-first. Detached repair and native HX certification are not false blockers. Cancellation experiment must be dispositioned and any demonstrated authorization hole repaired before live closure.

### B-hx-evidence — Measure installed HX task-scope capability before certifying it

- Slice PI-5; requirements: EAT-R057.
- Landability: yes — probe cut records capability or a named blocker (HX-TASK-SCOPE-PROBE).
- External producer dependencies: HX-PRODUCER (MW/HX-owned; see MW-owned tracks).
- Closure gate: HX-TASK-SCOPE-PROBE — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).

### B-hx-admit — Admit certified HX scope only from producer-backed task witnesses

- Slice PI-5; requirements: EAT-R058, EAT-R059.
- Landability: partial — fixture guardrails land now; live witness gated PI-HX-RF-LIVE (MW-NATIVE).
- Ordering dependencies (landed-before, not same-cut): B-dispatch, B-hx-evidence.
- External producer dependencies: MW-NATIVE (MW/HX-owned; see MW-owned tracks).
- Closure gate: PI-HX-RF-LIVE — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).

### B-rf-admit — Keep RF preview separate from committed context in Pi invocation

- Slice PI-5; requirements: EAT-R060, EAT-R061, EAT-R062, EAT-R063.
- Landability: partial — fixture guardrails land now; live witness EAT-R063 gated PI-HX-RF-LIVE (MW-NATIVE).
- Ordering dependencies (landed-before, not same-cut): B-dispatch.
- External producer dependencies: MW-NATIVE (MW/HX-owned; see MW-owned tracks).
- Closure gate: PI-HX-RF-LIVE — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).

### B-detached-function — Reattach independently authorized detached function invocations

- Slice PI-6; requirements: EAT-R064, EAT-R065, EAT-R066, EAT-R067.
- Landability: no — depends on detached-grants + dispatch; gated PI-DETACHED-FUNCTION-LIVE.
- Ordering dependencies (landed-before, not same-cut): B-dispatch, B-detached-grants, B-effects, B-observe.
- External producer dependencies: MW-HOST, MW-CANCEL (MW/HX-owned; see MW-owned tracks).
- Closure gate: PI-DETACHED-FUNCTION-LIVE — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).

### B-furnace-function — Project one Furnace-owned function attempt without duplicating runtime authority

- Slice PI-6; requirements: EAT-R068, EAT-R069, EAT-R070.
- Landability: no — optional host mode; gated PI-FURNACE-FUNCTION-LIVE (MW-FURNACE); unsupported producer API is a named blocker, never a Pi facsimile.
- Ordering dependencies (landed-before, not same-cut): B-dispatch, B-effects, B-observe.
- External producer dependencies: MW-FURNACE (MW/HX-owned; see MW-owned tracks).
- Closure gate: PI-FURNACE-FUNCTION-LIVE — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).
- Note: Optional host mode; an unsupported producer API is a named blocker, not a fabricated Pi facsimile.

### B-coordination — Invoke one pinned pure coordination export without effect authority

- Slice PI-7; requirements: EAT-R071, EAT-R072.
- Landability: no — gated PI-COORDINATION-INSTALLED (MW-COORDINATION).
- Ordering dependencies (landed-before, not same-cut): B-descriptor, B-authority.
- External producer dependencies: MW-COORDINATION (MW/HX-owned; see MW-owned tracks).
- Closure gate: PI-COORDINATION-INSTALLED — the slice is not claimed live/closed until this gate's live legs are witnessed (EAT-R085).

## Explicit deferrals (nothing silently dropped)

| Item | Why deferred | Where tracked |
|---|---|---|
| MW-side docs staleness: `mw@f7c0a9431d6c` `README.md:47` still states the descriptor/loader mismatch in the present tense while `.agents/skills/mechanical-pi-host/SKILL.md:14` and `contracts/README.md:13` record the repair | MW-owned artifact; outside the Pi docs cut and outside every Pi bead above | REMEDIATION.md "Not repaired here"; hand to the MW owner with the mw-contract track |
| C0399 regrade (ESTABLISHED -> SUPPORTED by cross-group propagation) | Wording is a topic list without a time claim; no doc edit owed | CLAIMS.patch.jsonl; no requirement needed |
| Bounded census of external producer receipt stores (C0321) | External stores are not read in this phase; requires explicit authorization for the store paths/date range | EAT-R080 conditions; EVIDENCE-CENSUS gate |
| Producer-side Forge transport evidence for C0368 (exit-0 failed-gate pairing) | Needs Forge source/contract pin or a native transcript; not obtainable from these pins | EAT-R081; FORGE-TRANSPORT-CENSUS subgate (guardrail EAT-R039 stays mandatory regardless) |
| HX product pin for the installed-capability probe (C03114) | No HX product pin is available in this audit; probe must pin the installed version it measures | EAT-R057; HX-TASK-SCOPE-PROBE gate |
| W11 feature-matrix detection sentence (false at pin) | NOT deferred — covered: removed by the same-cut status obligation | EAT-R082 (release) |

## MW-owned external tracks (requirements, not Pi beads)

| Req | Track | Slice | Deliverable |
|---|---|---|---|
| EAT-R088 | mw-contract | PI-0 | MW MUST publish the adopted versioned invocation ABI |
| EAT-R089 | mw-host | PI-2 | MW MUST publish an independently consumable application host facade |
| EAT-R090 | mw-cancel | PI-3 | MW MUST honor host cancellation through the in-flight SDK and runner |
| EAT-R091 | mw-native | PI-5 | MW MUST publish producer-backed native source and committed context services |
| EAT-R092 | mw-furnace | PI-6 | MW MUST expose the application callback for native Furnace hosting |
| EAT-R093 | mw-coordination | PI-7 | MW MUST publish one explicit pure coordination host contract |

These are filed with the MW owner (existing MW bead IDs are not invented here); each Pi gate above names which delivery it waits on. Pi never implements MW core/rig deliverables (EAT-R035 census guards the import boundary).
