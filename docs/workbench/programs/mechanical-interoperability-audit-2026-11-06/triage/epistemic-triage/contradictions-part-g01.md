# Contradiction sets — group g01 (doc 01: system-audit findings, topology, corrections)

Investigator g01, 2026-11-07. Pins: ARTIFACT/ENV pi@d7666a76f561 (a single docs-only commit on the program-stated Pi baseline 278c8f79: `git diff --name-only 278c8f79 d7666a76` lists ten docs/.agents files, so every src/ and test/ citation is byte-identical at both); MW mw@97e18068f399 (1f29daa7, f7c0a943 and 0c78e253 verified ancestors); MW tip mw-tip@6e15a4245d3f (two docs-only commits past the pin). Nothing was run: all warrants are static reads, `git` history and committed receipts.

Corpus defect carried forward (not an artifact contradiction): claim ids C1201-C1257 name different propositions in claims-part-01 and claims-part-02. Every g01 row carries `part: "01"` and `id_collides_with_other_part`; colliding g01 dossiers are written as `dossiers/<Cid>.g01.md` (g02 used `.g02.md`), and every relation row carries `id_namespace`. Bare ids in lens output over these ranges are ambiguous until the integrator re-keys one side.

Status summary of the sets below: no set is left CONTESTED. Six are reconciled by a scope, version or semantic split and leave a wording repair; one (KG01-03) is a standing temporal defeater that every pin-relative absence/present-tense claim in doc 01 must carry.

## KG01-01 — "CORRECTED, not open P0" names a priority the superseded Pi row never carried

Claims: C1204 (supersedes C0199); touches C1200, C1203 (both ESTABLISHED, unaffected)
Status: reconciled by source split; C1204 graded NON-EPISTEMIC with `supersedes_faithful: false`, `overclaims: true`

### Evidence for the artifact wording
- pi@d7666a76f561 01-current-system-audit.md L36: "**CORRECTED, not open P0 — Descriptor drift.** Mechanical commit `1f29daa7` repaired schema refs ..."
- mw@97e18068f399 docs/programs/pi-workbench-interop-2026-11-04/01-audit-and-status.md L20: "### MW-P0 — Committed descriptor cannot pass its implemented host predicate" (the only P0 label for this item in either lineage)

### Evidence against the attribution
- pi@d7666a76f561 mechanical-workflows-interop-2026-11-04/01-audit-and-evidence.md L29: "### P1: checked-in Mechanical descriptor conflicts with its own loader"
- pi@d7666a76f561 triage/epistemic-triage/CLAIMS.jsonl C0199 [NON-EPISTEMIC]: "The descriptor/loader conflict is priority P1." (the row C1204 supersedes)
- The claims-part-01 proposition for C1204 adds "(or P1)", which the artifact does not say.

### Reconciliation attempts
- source split: the "P0" is the MW Nov-4 companion's MW-P0; the Pi Nov-4 program and its ledger said P1. Both are closed by 1f29daa7 (C1200/C1203 ESTABLISHED). Reconciles; the substance "CORRECTED" is faithful, the priority attribution is not.
- semantic: read "not open P0" as a present-status statement ("this is not an open P0 item") - true, but then it says nothing about the superseded row and the rhetorical contrast still implies a prior P0.

### What would settle it
Wording repair only: "CORRECTED (Pi Nov-4 P1 / MW Nov-4 MW-P0)". No evidence is missing.

## KG01-02 — "overlooked existing collective-event.ts" vs the dates: the W11 sentence predates the file

Claims: C1244 (supersedes C0161, C0436; depends on C1129, C1243); C1245 (norm) inherits
Status: reconciled by temporal split; C1244 graded SUPPORTED for the "stale at the pin" reading, `overclaims: true` for the authorial "overlooked" reading

### Evidence for the artifact wording (present-tense reading)
- pi@d7666a76f561 docs/workbench/feature-matrix.md L112: "No binding-host code or tests exist: grep -ril mechanical over src/ and test/ matches only an incidental word ... no src/workbench module, no test file." - false at the pin
- pi@d7666a76f561 src/workbench/collective-event.ts L2-3 exists; test/workbench-collective-event.test.ts exists; `grep -rli mechanical src/` returns collective-event.ts

### Evidence against the authorial reading
- `git blame -L 112,112 docs/workbench/feature-matrix.md` -> 10a67e73 2026-10-15
- `git log --diff-filter=A -- src/workbench/collective-event.ts` -> f65860e1 2026-10-28
- `git log -3 -- docs/workbench/feature-matrix.md` -> last change 2beb771a 2026-10-27 (never revisited after the file landed)
- The Nov-4 ledger already graded the sentence "stale at the pin" (C0163, C0182 permitted wordings)

### Reconciliation attempts
- temporal split: true when written (2026-10-15), stale since 2026-10-28, still published at d7666a76. Reconciles under "stale", not "overlooked".
- process observation: d7666a76 states the norm "Avoid old blanket absence language" (C1245) and leaves feature-matrix.md:112 unamended (`git diff --name-only 278c8f79 d7666a76` has no feature-matrix.md).

### What would settle it
Wording repair ("is stale: predates collective-event.ts") plus the docs bead wb-12x1 amending feature-matrix.md:112.

## KG01-03 — Pin-relative absence and "currently" claims vs unlanded machine branches that already change the cited files

Claims: C1122, C1131, C1132, C1133, C1136 (worktree); C1171, C1172, C1173, C1176 (replay); C1144, C1147, C1181, C1182 (no host/projection/adapter); C1214-C1217 by analogy on the MW side (no MW branch survey was done - MW tip drift is docs-only)
Status: not a contradiction at the pins (every claim is graded at the tracked master tree d7666a76 as the method sentence declares); recorded as a standing TEMPORAL/SCOPE defeater that travels with each row

### Evidence for the claims (at the pin)
- Each row's dossier: worktree.ts L177-181 catch, claude-host.ts L166-175 replayBasis, hosts/ listing, mechanical grep - all as the artifact states.
- pi@d7666a76f561 01-current-system-audit.md L3: "unlanded machine branches and external journals were not enumerated" (C1104, ESTABLISHED: the bound is declared)

### Evidence that the world has moved past the pin
- pin clone `git branch -r`: 1137 remote refs; 40 machine/flywheel/* branches ahead of d7666a76; 8 touch MWI-relevant files
- `git log HEAD..origin/machine/flywheel/wb-5ik5`: "e76448ea 2026-11-06 fix(worktree): wb-5ik5 keep the edited worktree when Git preservation fails and answer with the typed preservation-failed result (EAT-R001..", plus cuts #2/#3 dated 2026-11-06/07
- `git log HEAD..origin/machine/flywheel/wb-413a`: "2f0fedd3 2026-11-06 feat(workbench): wb-413a bind Claude agent replay to measured source, instruction and provider readings; an unknown reading replays nothing"
- `git diff --name-only HEAD...origin/machine/flywheel/wb-ocie`: src/workbench/mechanical-descriptor.ts, test/workbench-mechanical-descriptor.test.ts (a descriptor boundary, still not a host)
- wb-ny54 / wb-s8rm branches add admission tests (test/workbench-mechanical-host-admission.test.ts, test/workbench-mechanical-source-admission.test.ts); no branch registers a host

### Reconciliation attempts
- scope split: the artifact's own method sentence confines every finding to the tracked default-branch trees; the claims file's `time_version` pins them. Reconciles. The lost scope would be an audit finding only if a downstream document dropped "at the pin" - none in doc 01 does, but README:22 "Critical before an effectful run" and SKILL:14-15 use bare present tense and must be read with the same bound.
- version split for the future: a re-grade at a later master tip is owed once wb-5ik5/wb-413a/wb-ocie land; their content was NOT inspected for correctness or pass here (not run).

### What would settle it
Re-grade of the affected rows at the post-landing master tip; until then the permitted wording for every affected row is "at pi d7666a76 (tracked tree)".

## KG01-04 — "Mid-session cancel ... remain to implement" vs a recorded mid-gate Forge cancel

Claims: C1214 (SUPPORTED, `overclaims: true`); C1218 (ESTABLISHED, unaffected)
Status: reconciled by semantic split

### Evidence for the claim
- mw@97e18068f399 apps/development-rig/src/claude-implement.ts L37-41: "It is not forwarded to the SDK and an abort during a running session is not handled by this slice."
- the agentQuery options literal (L91-99, used at L114) carries no signal or controller; `grep -rn 'abortController|AbortController' apps/development-rig/src` -> 0

### Evidence against the unqualified wording
- mw@97e18068f399 docs/10-current-state-and-gaps.md L141: "A mid-gate cancel through the public Forge SDK was accepted and established by the operation's own terminal; the host now reads it as `FORGE_OPERATION_CANCELLED` with the operation id and never as a verdict." (2026-10-15)

### Reconciliation attempts
- semantic split: host-initiated cancellation of the running Claude SDK implement session (absent) vs reading a producer-side cancellation of a Forge operation (present at the gate leg). Reconciles.

### What would settle it
Wording repair: "mid-session cancel of the running Claude SDK session".

## KG01-05 — "no-duplicate effects remain to implement" vs an existing idempotency fingerprint

Claims: C1217 (SUPPORTED, `overclaims: true`)
Status: reconciled by scope split

### Evidence for the claim
- no general effect-dedup layer for develop() effects: `grep -rn -i 'exactly.once|at.most.once|idempotency' apps/development-rig/src` finds only the publication module below and an RF refusal-code roster (rf-workload.ts L37)

### Evidence against the blanket wording
- mw@97e18068f399 apps/development-rig/src/git-source-publication.ts L43, L74-75: "readonly idempotencyKey:string; ... if(candidate.idempotencyKey!==publicationSemanticKey(...)) return \"IDEMPOTENCY_FINGERPRINT_INVALID\";"

### Reconciliation attempts
- scope split: a per-effect-type idempotency fingerprint exists for Git-source publication; no host-level guarantee covers develop() effects generally. Reconciles.

### What would settle it
A definition of the effect classes the guarantee must cover (doc 03 effects cut, wb-mwsy); then the absence becomes testable rather than lexical.

## KG01-06 — Ledger proposition "develop/developLive options" vs the component the signal was added to

Claims: C1210 (ESTABLISHED for the artifact wording; the claims-part-01 proposition overreaches)
Status: reconciled by narrowing; an extraction defect, not an artifact defect

### Evidence
- mw@97e18068f399 `git show f7c0a943 --stat`: files apps/development-rig/src/claude-implement.ts, live-development.ts, two rig tests, docs/06 - no packages/development path
- mw@97e18068f399 `grep -rn 'signal|AbortSignal' packages/development/src/*.ts` -> 0 hits
- mw@97e18068f399 apps/development-rig/src/live-development.ts L34: "export interface LiveDevelopmentOptions extends AgentOptions {"

### Reconciliation attempts
- narrowing: the signal lives on the rig's AgentOptions (inherited by LiveDevelopmentOptions, i.e. developLive/runClaudeImplementation); the library's develop(services, request) has none. The artifact sentence names only the commit and the option, so it is exact.

### What would settle it
Fix the claims-part-01 proposition to drop "develop".

## KG01-07 — "requires a parked barrier and query-count reproduction" vs an existing parked-barrier test

Claims: C1162 (SUPPORTED hypothesis), C1164 (norm)
Status: not a contradiction; recorded as a nuance that lowers the cost of the owed experiment

### Evidence
- pi@d7666a76f561 test/workbench-claude-cancel-faults.test.ts L535-553: F10 parks beforeDispatch, aborts the RUN signal, releases, asserts `sdk.calls` has length 0
- every `host.abortAgent(...)` call in that file occurs after a session/init exists (L105, 125, 151, 198, 258-266); none during a parked beforeDispatch
- pi@d7666a76f561 src/workflow/runtime.ts L1215/L1223: `live.started = true` precedes `await host.spawnAgent(...)`, so a skip during the await does call abortAgent (L879), which is a no-op without a controller or session (claude-host.ts L341-344)

### Reconciliation attempts
- semantic split: the apparatus the norm asks for exists for the run-wide signal (F10); the per-agent variant is what is missing. The hypothesis stays SUPPORTED by code reading and unreproduced at runtime.

### What would settle it
F10 with `host.abortAgent("wf-agent-1")` in place of `run.abort()`, asserting zero SDK calls (wb-9v02).
