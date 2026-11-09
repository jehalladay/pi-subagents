# 01 — Pi host source audit, corrected findings and joint function protocol

**Scope and evidence:** static default-branch inspection, Pi `8e2fedeb` / MW `62a10b59`. A source file or recorded test receipt does not prove the complete default-branch gate or a native cross-repository run today. Re-pin and inspect active branches before changing code.

## 1. Evidence inventory: what's built versus what's joined

| Existing source | Source-level capability | Boundary still missing |
| --- | --- | --- |
| `src/workbench/execute.ts`, `execute-tool.ts` | admission and tool-reply envelope, script and two other definition kinds in schema, host-bound grants, logical invocation refs | actual registered `function` dispatch is explicitly refused as `unsupported-definition-kind` |
| `src/index.ts` launchers | registered embedded/detached **script** workflows, two Claude detached grant producers, workflow tools registration | Mechanical function launcher/installed host binding; function-specific grant/lease wiring |
| `src/workbench/mechanical-descriptor.ts` | descriptor/digest/allowlist read/load decisions with fixture tests | independently packed Mechanical rig consumer and production function route |
| `src/workbench/function-authority.ts` | final-boundary exact action-grant/principal/session checks; multiple adversarial tests | `FUNCTION_ACTION_CONTRACT` explicitly unadopted (MW-CONTRACT), and not on production route |
| `src/workbench/source-admission.ts` | Git source basis, canonical root, host attestation, lease, remeasurement and no-write refusals | called nowhere from registered `workflow_execute(function)` |
| `src/worktree.ts` | typed preservation-failed, worktree retained on tested git preservation errors | full crash/power-loss/reattach and integration with Mechanical writer identity |
| `src/workbench/claude-host.ts` | true SDK workflow agent backend, pre-/post-`beforeDispatch` abort checks | full per-agent skip/joint Mechanical cancellation and durable effect recovery |
| `src/workbench/hosts/local-detached.ts` | reviewed script launcher and native provider grant preflight, local socket and receipt, script liveness | running a Mechanical function as first-class detached unit, not via an unsafe script wrapper |
| `src/workflow/{journal,runtime,reconcile}.ts` | effect classification, read replay basis and operator reconciliation for script workflows | persisted Mechanical writer/gate intent and native reconciliation across process restarts |
| `src/workbench/{observation,observe-tool,control-tool}.ts` | bounded provider observation, statuses, controls and references | correct Mechanical original four-domain result, phase and native source/gate projection |
| `src/workbench/collective-event.ts` | read-only Mechanical collective event projection exists | not a callable Mechanical development host |
| `qa/workbench/mwi-release.mjs`, feature matrix W11 | release/readiness checks and historical evidence labels | complete joined Pi→Mechanical native acceptance, after final gated candidate |

### Corrections to older audits and remaining risks

1. **Worktree P0 corrected for tested forms:** `cleanupWorktree` now keeps changed source when preservation commit/add/status/branch fails and returns `WorktreePreservationFailedResult`; retain proof with byte-level fault injections. New crash or process-death recovery remains unproved. Do not reimplement obsolete destructive behavior as a current defect.
2. **Detached Claude grants corrected in two producers:** `src/index.ts` builds effective `claude:invoke` and exact `claude:tool:<name>` rights for both registered detached paths, and `test/workbench-detached-grants.test.ts` drives their real preflight with fixtures. It does not itself prove live Claude or Mechanical-function execution.
3. **Startup cancellation improved:** `claude-host.ts` rechecks run abort after an awaited `beforeDispatch`; controller identity is allocated after that barrier. Per-agent skip/race, post-effect cancellation and host death need their own targeted tests, not a blanket source assertion.
4. **Mechanical descriptor repaired:** its committed bare schema references now match the local loader. Pi's descriptor test uses a vendored file fixture and is not a packed-host end-to-end witness. The existing `status: descriptor-only` field is a fact, not a remote availability claim.
5. **Function authorization is partially coded but inert:** effective action grant grammar currently accepts namespace:permission, not a three-colon example. `FUNCTION_ACTION_CONTRACT` is unadopted; no production function action is authorize-able until joint binding and registered dispatch.
6. **Source identity stronger than older audit:** Pi has `source-admission` and Mechanical has invocation-identity/cancel/uncertainty modules. Their existence does not prove cross-host replay or a durable writer lease recovery protocol.
7. **W11 and live evidence:** recorded October real Mechanical Claude/Forge/Furnace journeys and November Pi native probes remain at their historical producer pins. No inspected source executes a registered Pi→Mechanical function; do not claim global never-ran outside inspected stores.

## 2. Non-negotiable authority and package topology

- **Pi owns:** registered definition admission, operator/principal/session and effective grants, artifact trust decision, global host queue/resource caps, invocation identity, placement, observable phase/control requests and operator recovery UI.
- **Mechanical application host owns:** constructing all four authorized `DevelopmentServices` closures and preserving source/effect/result truth; **Mechanical core stays independent of Pi**.
- **Claude Agent SDK owns:** model/tool session and its real session ID. Pi's Claude host or the Mechanical rig may use the native SDK through their application edge; do not fabricate a Pi subagent handle for an internal Mechanical SDK session unless independently registered.
- **Forge owns:** source-targeted gate, full selection, native verdict/operation; **Furnace owns:** durable Run/Work/Attempt/retry/stop if explicitly hosting; **Beads owns:** ready/claim/close; **HX owns:** query scope and coverage; **RF owns:** committed renders and provenance. GP/MicroPolicy/coordination output is advisory until separately authorized.

Do not create a generic registry that imports arbitrary user-named JS, call the Mechanical CLI as `node()` for the first-class host, add a scheduler inside Pi, or claim the VM/temporary npm install is a security sandbox. All imported code is explicitly reviewed and pinned; authorization is still needed for every effect.

## 3. Joint versioned contract and vocabulary

The producer and consumer must ratify one `mechanical.pi-host/v1` contract. **Proposed, not shipped:**

~~~ts
interface RegisteredMechanicalDefinitionV1 {
  kind: "function";
  id: "mechanical.development.develop.v1";
  schemaVersion: "mechanical-workflows/entrypoint/v1";
  artifactDigest: string; // Pi's saved-definition digest, NOT npm tarball hash
}
interface MechanicalArtifactBindingV1 {
  contract: "mechanical.pi-host/v1";
  descriptorId: "mechanical.development.develop.v1";
  descriptorSha256: string;
  tarballSha256: string; // exact packed @mechanical/workflows-development bytes
  hostPackage: "@mechanical/development-rig";
  hostExportVersion: "v1";
  evidenceProfile: "git-census-v1" | "hx-task-scope-v1";
  contextProfile: "plain-v1" | "rf-committed-v1";
  workspaceRealpath: string; // bound by host; not caller-controlled authority
  baseCommit: string;
  baseTree: string;
  forgeManifestSha256: string;
}
~~~

**Two hashes are different:** `DefinitionRef.artifactDigest` pins saved definition source; the Mechanical tarball SHA-256 pins executable package bytes. Descriptor bytes, input/output schemas, host package version and runtime closure are independent axes. Do not substitute one for another or use a package version string as exact byte identity.

**Three selectors are different:** existing Pi `hostMode` embedded/detached selects placement. Host-chosen `evidenceProfile` begins with a limited Git census, later certified HX. Host-chosen `contextProfile` begins with plain context, later committed RF. Model input must never set either profile to claim authority. No ambiguous generic `profile` or `mode` alias in public API.

**Grant ruling:** retain `workbench:execute`; detached additionally `workbench:detach`. Agree one exact Mechanical function-action right representable through `workbench.capabilityGrants` and local detached transport, e.g. proposed `mechanical:develop-write`. Never broaden to wildcard namespace or silently treat a read grant as write. Claude invokes and tool permissions remain independent. No permission from input JSON or SDK output.

## 4. Registered launch protocol and sequencing

1. Receive one `workflow_execute` request. Validate `DefinitionRef` kind/id/schema/source digest with existing pure `decideExecute`; refuse unrecognized `function` identities and `furnace-formula` without changing the `script` route.
2. Retrieve a **reviewed installed Mechanical producer descriptor and artifact** under host configuration. Read actual committed descriptor and exact packaged artifact digest; validate closed manifest and allowlist, canonical schema references, source root, package/export, no path traversal or symlink escape, and required host API version **before importing executable JS**.
3. Re-read effective principal/session and host-held grants at final dispatch. Pass through `dispatchFunctionWithAuthority` only with an adopted exact action contract; use `admitSourceWrite` for canonical authorized workspace, clean Git/Forge identity and writer lease. Prevent source/permissions TOCTOU after any awaited operation. The caller cannot bring its own closure, module or grant.
4. Persist logical invocation and effect intent; begin one asynchronous hosted Mechanical function. Return native references and `completion: not-asserted` promptly as current registered script tools do. Do not block Pi tool calls for an unbounded SDK journey.
5. Bind host-selected `git-census-v1` and `plain-v1` to the independently installed Mechanical rig, which constructs actual four callbacks; one bounded native Claude SDK implementation; exact native Forge gate on changed committed candidate.
6. Persist phase changes and native agent/session, source commit/tree and Forge operation IDs as observed. A lost acknowledgment after a possible effect is **uncertain**; reject automatic repeat, allow read-only native reconciliation and require new explicit authorization for any resumed write.
7. Project original Mechanical `DevelopmentOutcome` into `workflow_observe` and inspector without collapsing to Pi transport status. Include source freshness, actual candidate, gate completeness, effect disposition, observer cursor/gaps and original native refs. Control invokes request cancellation/stop, never claims rollback.

## 5. Invocation and observation envelope

Use a bounded, versioned data envelope. Keep fields separate:

~~~ts
type MechanicalDomain =
  | "verified_candidate" | "verification_failed"
  | "needs_evidence" | "indeterminate";

interface MechanicalObservationV1 {
  invocationId: string;
  definition: { id: string; digest: string };
  admission: "accepted" | "refused";
  execution: "queued" | "running" | "settled" | "failed" | "unknown";
  phase: "admit" | "discover" | "context" | "agent"
    | "commit" | "gate" | "settle" | "recover";
  domainOutcome?: MechanicalDomain; // entire original payload retained separately
  candidate?: { baseCommit: string; commit: string; tree: string };
  forge?: { operationId: string; status: string; verdict: string; completeness: string };
  effect: "not-started" | "started" | "settled" | "uncertain";
  freshness: "current" | "stale" | "unknown";
  nativeRefs: readonly unknown[]; // typed provider-qualified refs in real code
  observation: { cursor?: string; gap: boolean; stale: boolean };
}
~~~

This is **illustrative**. Prefer existing Pi `NativeRef`, tool-reply, observation and journal contracts with a minimally additive versioned schema; do not publish duplicate incompatible representations. Avoid putting secrets, full logs or unbounded model output into model-visible tool replies. Stop/respond to controls under Pi's actual host authorization, not just possession of invocation ID.

**Interpretation tests:** transport `ok:true` may contain Mechanical `verification_failed` or `needs_evidence`; Forge status `success` alone lacks native PASS; a previously verified candidate on moved HEAD is historically verified but not presently fresh; a stopped writer may still leave committed source.

## 6. Isolation, replay, cancellation and recovery

- Workspace isolation must survive monorepo subdirectory scoping. Only one authorized writer for an exact canonical root; reject/queue collision with clear bounded backpressure. A failed git commit/branch preservation does not erase tracked or untracked bytes; preserve a path and, where available, a ref.
- Source basis includes git commit+tree, gate manifest, descriptor+artifact bytes, effective instructions/skills, model/tools/provider and SDK settings, and authorization identity. A missing axis blocks cached replay; changed context cannot reuse an agent result simply because the task string matches.
- Journal effect intent before dispatch, native operation after acknowledgment, and outcome upon confirmed settlement. On restart read the journal, inspect native sources, and preserve unknown without a new effect.
- Distinguish workflow-wide abort, per-agent skip and Mechanical host cancellation. Test pre-dispatch zero writes, mid-edit preserving dirty source, gate dispatched/no reply, late SDK completion, double cancel, reconnect after host death.
- Furnace reattach is **optional** and uses the real Furnace Run/Work/Attempt; Pi is an observer/operator, not a mirrored Run controller.

## 7. Integration alternatives rejected

- **Expose Mechanical via `node()` or script VM:** loses registered function-specific authority and lifecycle.
- **Import unpinned TS source:** bypasses installed ABI and release artifact proof.
- **Pretend a read-only `collective-event` adapter is function hosting:** different surface.
- **Add a generic dynamic module registry:** inappropriate for explicitly reviewed provider code.
- **Require full HX/RF as a blocker:** not necessary for Git/plain first release.
- **Treat every settled workflow as success:** loses Mechanical original failure/evidence state.
- **Use an opaque success boolean for all operator controls:** hides uncertainty and creates dangerous retry decisions.

## 8. Known gaps and independent confirmation

The existing `workbench/implementation-program` branch and `master` had diverged at the audit; the registered function refusal exists on both inspected variants. Recheck before edits and never force overwrite another agent's work. Current evidence is L0 plus historical tests/producer receipts at their own pins. No fresh installed Pi→Mechanical run, complete default Forge gate, cross-process crash or performance trial was conducted for this audit. Deliver from [Pi work packets](02-IMPLEMENTATION-PACKAGES.md) and prove release against [verification](03-VERIFICATION-AND-RELEASE.md).
