# 03 — Proposed executable Pi function-host contract

**Not shipped.** Align this protocol with [Mechanical's companion host contract](https://github.com/jehalladay/MechanicalWorkflows/blob/main/docs/programs/pi-workbench-interoperability-audit-2026-11-06/02-host-contract.md) through one joint design/negative-consumer gate. Ordinary Mechanical function semantics remain unchanged.

## Topology

~~~text
Pi workflow_execute: function definition
 -> immutable definition digest, local principal, grants and workspace
 -> allowlisted host binder and Mechanical committed descriptor
 -> independently verified SHA-256 npm tarball, installed trusted host
 -> application-owned callbacks: discover -> compileContext -> implement -> verify
 -> isolated Git single writer + native Claude Agent SDK + native Forge
 -> invocation journal (intent, dispatch, settle, uncertain)
 -> workflow_observe / workflow_control / workflow_reconcile / inspector
Future: detached and Furnace-native Run/Attempt, never a cloned scheduler.
~~~

**Separating the disputed selector:** Pi's existing `hostMode` means `embedded|detached` transport. The proposed **host-owned** `evidenceProfile` is `git-census-v1|hx-task-scope-v1`. A separate **host-owned** `contextProfile` is `plain-v1|rf-committed-v1`. Neither is a model-supplied claim of completeness or authority. Do not ship generic “profile” or “mode” aliases without both-repository ABI approval.

Pi `DefinitionRef` source digest and Mechanical **tarball digest** are independent: the first pins the saved definition, the second pins exact npm artifact bytes. Mechanical descriptor remains `mechanical.development.develop.v1` / `mechanical-workflows/entrypoint/v1`; an optional host envelope is proposed as `mechanical.pi-host/v1`, separate from Pi's existing `workbench.tool-reply/v1`.

## Admission contract

1. Admit `function` only for an allowlisted installed descriptor and exact saved source digest, not an arbitrary module path/string or shell command. Preserve current script semantics; leave furnace-formula separate.
2. At the final dispatch, re-read **host-bound** `workbench:execute`, exact Mechanical read/write action grant (literal spelling jointly approved), optional `workbench:detach` and Claude tool permissions. Validate principal, session, workspace canonical realpath, source authorization and positive resource caps. JSON arguments and model policies carry no authority.
3. Validate schema, id, package/export, exact bare schema refs and artifact bytes **before importing JS**. Mechanical's transient installer is trusted in-process code, not a sandbox; an untrusted artifact is refused.
4. Materialize one clean isolated source checkout and capture base commit/tree, Git status, gate-manifest digest, effective task, skill/system instructions, model/tool configuration, provider/SDK versions and installed artifact. Recheck currentness after async discovery and before writes/gate credit.
5. Bind the four Mechanical callbacks in application host closures. First profile: Git tracked-file census + plain task context, bounded Claude SDK writer, native Forge gate bound to changed candidate commit/tree. No fake HyperUnix semantic completeness or RF render ID.
6. Persist intent **before** every external effect, native session/operation/ref once known, and final settlement separately. A lost dispatch response is uncertain. Do not duplicate a write, claim, Forge operation or Furnace Attempt without producer-native reconciliation and operator authorization.
7. Return a logical Pi invocation ref immediately (`completion: not-asserted`); observe eventual settlement through Pi. Do not hold a short `node()` operation hostage to a long development session.

## Result axes, not one success Boolean

- **Launch:** accepted, launched, refused.
- **Execution:** queued, running, settled, failed, unknown.
- **Domain outcome:** exactly Mechanical's `verified_candidate`, `verification_failed`, `needs_evidence`, `indeterminate`, or no domain answer.
- **Gate:** independently witnessed native Forge result with operation ID, candidate commit/tree and selection completeness.
- **Effects:** not-started, started, settled, uncertain.
- **Freshness:** current, stale, unknown; original native refs retained.
- **Furnace:** its own Run/Work/Attempt statuses only, if that optional host owns them.

A fulfilled Promise bearing `verification_failed` is not a verified task. A successful transport or an exit 0 is not a Forge PASS. A noncommitted Pi RF preview is not Mechanical's committed context. A policy score is not permission to claim/close Beads.

## Lifecycle

Before `beforeDispatch`, store pending per-agent abort state; after the async barrier, cancellation must prevent an SDK query. Distinguish per-agent skip, whole workflow cancel and externally owned Furnace stop. After dispatch, abort is a **request**, never rollback; delayed SDK success and a dirty worktree remain observable and recoverable. Replay cached read/agent results only under complete measured basis, and never replay a write on an uncertain effect. Host-wide limits bound all invocations independently of per-workflow semaphores.

## Later profiles

`hx-task-scope-v1` requires terminal producer task-scope, revision/query digest, complete coverage and absence authorization. The 2026-11-06 probe lacks that, so unsupported at its pin; first Git-census remains usable. `rf-committed-v1` requires task/revision-bound nonempty render ID, output digest, graph revision and verified model budget. Pure coordination evaluation can use a separate read-only export/permission and produces only an advisory decision.
