# 02 — Proposed narrow host ABI and source/effect protocol

**Proposal only; do not treat names or types below as shipped APIs.** This adopts one vocabulary to resolve the November 4 Pi `profile` versus Mechanical `mode` proposal conflict (KU10); explicit joint producer/consumer approval and a conformance test are the adoption gate.

## Contract placement and vocabulary

- `hostMode`: Pi-owned transport/lifecycle choice, already `embedded | detached`; optional Furnace supervision is a later separate transport.
- `evidenceProfile`: **host-owned** binding choice, initially `git-census-v1`, later `hx-task-scope-v1`. The user/model cannot use this to assert coverage or obtain permission. This intentionally replaces the two unimplemented competing generic `profile`/`mode` names; do not add either as a public alias.
- `contextProfile`: separately `plain-v1` or `rf-committed-v1`; Pi observational RF preview has no such value.
- Descriptor of record remains `mechanical.development.develop.v1` / `mechanical-workflows/entrypoint/v1`, with `development-request.v1.schema.json` and `development-outcome.v1.schema.json` as bare schema filenames. `status: descriptor-only` is historical metadata, **not** a claim of remote availability.

The proposed local adapter exports an explicit `invokeMechanicalDevelopmentV1` function from a stable rig host subpath (e.g., `@mechanical/development-rig/host`, only after an independently installed consumer proves it). Core `develop` keeps its signature and all four callbacks. Neither Pi nor Mechanical has a new generic registry of arbitrary module exports.

```ts
// PROPOSED application-host-only input; not the core DevelopmentRequest.
interface DevelopmentHostBindingV1 {
  contract: "mechanical.pi-host/v1";
  descriptorId: "mechanical.development.develop.v1";
  artifact: { digest: `sha256:${string}`; package: "@mechanical/workflows-development"; export: "develop" };
  evidenceProfile: "git-census-v1" | "hx-task-scope-v1";
  contextProfile: "plain-v1" | "rf-committed-v1";
  source: { workspaceRealpath: string; baseCommit: string; baseTree: string; forgeManifestSha256: string };
  invocationId: string; // Pi host identity, not a provider operation ID
}
```

## Admission order (failure means zero function import or external effect)

1. Validate exact schema/descriptor/allowed package/export/ABI and source paths without traversal or symlink escape.
2. Read and hash the packed artifact bytes and verify the manifest's digest *before* importing trusted JavaScript. Validate its installed identity. Do not treat a temp npm install as an untrusted sandbox.
3. Check Pi principal, session, workspace canonical realpath, invocation lifetime, `workbench:execute`, exact function-write grant (new proposed namespace to be jointly adopted) and detached grant where applicable. No rights from JSON arguments or model policy.
4. Materialize one clean workspace owned by the function invocation. Capture base commit/tree, dirty status, gate digest, exact task and relevant skill/instruction/provider/SDK/settings digests. Unknown dependencies block replay, not necessarily a fresh authorized run.
5. Construct `DevelopmentServices` from host-owned narrow closures. For initial evidence profile: `discover` is Git-tracked-file census only; `compileContext` explicitly plain; `implement` uses one bounded native Claude SDK session with scoped write tools; `verify` requires a matching candidate and native Forge operation verdict.
6. Persist intent before each external effect and native references after dispatch. Re-check source/currentness before the first edit and before gate credit. A stale basis is a refusal/uncertain state, not automatic resubmission.

## Result and evidence layers

Return a structured host event with **separate axes**: `launchStatus` (accepted/launched/refused), `executionStatus` (queued/running/settled/failed/unknown), `domainOutcome` (four Mechanical arms or absent), `gate` (native Forge verdict and operation ID when producer-backed), `candidate` (commit/tree and verification basis when established), `effectDisposition` (not-started/started/settled/uncertain), `freshness` (current/stale/unknown), and `nativeRefs`. UI must not collapse a verified-looking fixture into a native result, or `needs_evidence` into task failure.

**Never** retry a writer, claim or gate after a lost acknowledgement until native-source reconciliation proves whether the previous effect occurred. Cancellation is a request: before dispatch it can prevent starting; after dispatch it cannot assert rollback. Preserve dirty workspace bytes and candidate refs on errors, including git commit or branch-creation failures.

## Boundary-specific obligations

- Pi owns function registration, admissibility and operator observation, not Beads readiness, Forge gate definitions, HX query semantics, RF render provenance, or Furnace retry policy.
- Mechanical owns explicit callback binding, application-level Git and source checks, outcome validation and installed consumer compatibility. No imports from Pi in core.
- HX `hx-task-scope-v1` is disallowed until the producer supplies terminal task-scoped, revision-bound, query-digest-complete coverage and licensed absence; partial/unknown yields `needs_evidence` before writer.
- RF `rf-committed-v1` requires a real committed render ID and model/provenance checks at exact source basis. The Pi preview is read-only evidence only.
- Furnace-hosted mode maps true native Run/Work/Attempt identity and remains optional; no mirrored scheduler or local pretend `ensure`.
- Pure coordination evaluation is separately allowlisted with a read-only grant. Returned decisions are proposals until an authorized external resolver performs effects.
