# 02 — Pi-owned protocol, canonical admission, execution, leases and observation
**Proposed v1 protocol, not existing implementation.** Jointly version with Mechanical; exact producer-side binding is mechanical.pi-host/v1 and reviewed descriptor mechanical.development.develop.v1.

## 1. Two request surfaces
**Model-facing workflow_execute:** definitionRef {kind:"function", id:"mechanical.development.develop.v1", schemaVersion:<exact reviewed version>, artifactDigest:<sha256>}, input {task, workspaceId, baseRevision} only if those inputs are host-constrained to authorized values, hostMode:"embedded" for first cut, optional request policy {allowWrites:true}. The selected artifact path, write root, permissions, principal, invocation id, fingerprints, profile and execution backend MUST NOT be inferred from caller assertions. The host may expose a narrower task-only request and inject workspace/basis.
**Host-held executable plan:** logical invocation id, canonical request bytes/digest, exact definition/descriptor/package/runtime-manifest digests, pinning source {workspaceRealpath, HEAD commit, HEAD tree, forge.toml sha256}, explicit mechanical:develop-write and workbench:execute, effective principal and session, profile pair git-census-v1/plain-v1, effect budget and durable lease token. All entries are checked before invoking Mechanical.

## 2. Canonical input resolution
1. Decide schema, definition and raw JSON budgets using current workbench rules.
2. For function only, call withoutBeadsNotes on a defensive copy. Canonicalize/serialize to a *single admitted payload*; reject cycles, accessors in authority-bearing members, huge/deep inputs and prototype ambiguities; preserve typed relevant fields exactly.
3. Validate producer DevelopmentRequest shape (nonempty task, workspaceId, baseRevision; closed members). Bind workspaceId and baseRevision to host-measured workspace; refuse inconsistent caller values rather than overriding silently.
4. Compute and retain inputDigest from exact canonical admitted payload; make that payload immutable and dispatch it. The dispatched callback must never see raw params.input. Add a test that poisons a note getter and checks it is neither read nor forwarded.
5. Bound model-visible reply bytes/redaction independently; never truncate authority/evidence stored in durable host records. Keep returned definition and native reference identities addressable.

## 3. Ordered admission transaction
A0 resolve the saved reviewed definition and descriptor with Pi allowlist; check both digests against immutable source and approved artifact location.
A1 create invocation intent id, capture host-only scope {principal,sessionId,authorizedRoot}, grants and budgets; refuse unknown authority data.
A2 admit function action grant via adoptFunctionActions([{definitionId:"mechanical.development.develop.v1",actionGrant:"mechanical:develop-write"}]) ONLY after MW-CONTRACT ratification and exact installed host tests. Require workbench:execute AND action grant; detached additionally workbench:detach when enabled.
A3 resolve canonical Git worktree, HEAD/tree/clean status and forge manifest; validate no publication effect. Bind Mechanical host source to these values; reject independently supplied source authority.
A4 acquire durable one-writer ownership keyed by canonical root; persist generation and invocation. Admission wait / installation may be asynchronous; grant and source checks are repeated *after* them.
A5 verify exact installed runtime manifest and native provider availability; perform a final combined authority/source/fencing check just before the first possible side effect. Do not perform long async work between last check and effect handoff without a second check.
A6 journal effect intent durably and send only a constrained reviewed execution plan to Mechanical. Return launch reference without claiming success/completion.

**Atomicity caveat:** Git, permission store, lease store, runtime import and external SDK are not one ACID transaction. Use explicit fencing + final-boundary revalidation + durable intent; document the remaining window and have the provider reject a stale fence where possible. Never describe independent helper calls as globally atomic.

## 4. Lease semantics
Lease = {rootRealpath, invocationId, generation, ownerId, acquiredAt, state, heartbeat/fencing metadata}. state: reserved -> active -> uncertain/recovering -> settled/released. The "accepted"/"launched" event is NOT a release transition.
- First release: a documented, durable single-machine lock/journal and cross-process exclusivity, not the existing process-local WriterLeases alone. For distributed fleet use a coordinator with monotonic fencing generations; tests must falsify stale-worker writes.
- A timeout is not proof of safe release. On lost heartbeat or kill, quarantine/fence until evidence justifies release or operator intervention resolves it.
- Simultaneous functions to different roots may proceed under resource caps. Two aliases resolving to one realpath must conflict.
- Release on verified complete/known no-write terminal only after all effects have stopped; retain lock on after-dispatch unknown. Prompt/script worktrees remain unaffected.

## 5. Invocation state versus producer state
Journal immutable events: admitted, lease_acquired, effect_intent_persisted, dispatch_requested, native_session_observed, first_edit, candidate_committed, forge_dispatched, forge_observed, effect_settled, release_fenced, release_complete. Each event references one invocation and source pin, has monotonic local sequence, native ref and evidence strength; replay is idempotent by event id. Native events are append-only facts, projection can be rebuilt.
State: admitted -> reserved -> dispatched -> observing -> completed_known OR outcome_unknown -> reconciling -> completed_known OR operator_action_required. Cancellation requested is separate from cancellation established. Control carries target native identity and exact scope, and never relabels an unknown effect as rolled back.
Domain result remains one of verified_candidate / verification_failed / needs_evidence / indeterminate, unmodified. Add observed assurance: strict-native, legacy-weak, unknown; effect: no-effect, dispatched-uncertain, occurred, settled. Avoid a single synthetic "success" boolean.

## 6. Observation and provenance
workflow_execute reply remains tool-reply/v1 with invoked/launch-only semantics. workflow_observe(scope,invocationId) must correlate: Pi invocation; package + descriptor digest; source commit/tree; Mechanical domain outcome and provider stage; Claude session; Forge operation/native receipt; environment/gate-definition completeness; last known effect disposition; freshness, source-cursor gap and dropped-event count. Native refs use provider/type/id/scope; never fake names for absent IDs. Control/reconcile cannot manufacture missing producer references.
Preserve bounded model reply while durable journal retains complete internally authorized evidence. Structured producer progress callback is data only; do not let callback exceptions change outcome or trigger a duplicate effect.

## 7. Typed refusal/recovery map
Reject with stable categories: definition-unreviewed; descriptor-mismatch; artifact-mismatch; installed-content-mismatch; runtime-unavailable; permission-unknown; grant-revoked; principal-changed; source-changed; workspace-dirty; writer-held; capacity-exhausted; intent-persist-failed; dispatch-outcome-unknown; post-dispatch-aborted; native-gate-unestablished; recovery-not-authorized.
Before possible side effects: no launch and safe refusal. After possible side effects: publish uncertain with native ids and frozen lease. Recovery asks producer-native sources for affirmative occurrence/non-occurrence proof; a clean HEAD alone is not universal non-occurrence evidence. No auto re-invoke on unknown.

## 8. Interfaces across repos
Pi consumes only @mechanical/development-rig/host and exact pinned tarballs; Mechanical receives trusted host binding + constrained four service callbacks and a cancellation/progress channel. Pi does not import Mechanical private src files, or reimplement developer logic. Mechanical core never imports Pi.
ABI handshake: descriptor id/schema, host version, export names, write grant grammar, input/output closed JSON, progress/event vocabulary, result semantics, native refs, evidence profile, runtime manifest, disposition, cancellation, retry law. Both test the same versioned fixture vectors. Old v1 descriptors without mandatory new assurances remain descriptor-only or legacy-weak; never silently promote.
