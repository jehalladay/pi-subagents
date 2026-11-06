# Contradiction sets — claim group g02 (02-host-architecture-and-protocol.md)

Pins: doc@7c80c34346c2 (program doc), pi@b27829e6dfa7, mw@f7c0a9431d6c; program baselines pi f67b6665 / mw 0c78e253.
Claim ids below are **part-02-scoped**: claims-part-01.jsonl reuses C0201-C0279 for different propositions (lens finding, confirmed by python set intersection), so any cross-part consumer must key rows by (file, id). Nothing was executed for this group (not run); every verdict is a static read at the pins.

## KG02-01 — Descriptor schema paths: doc present tense vs mw pin (fixed since)

Claims: C0230 (also stales the problem statements of C0231, C0235)
Status: REFUTED at the pin; TRUE at the program baseline (temporal split)

### Evidence for the doc reading (baseline)
- mw@0c78e253 (git show inside the mw pin) `contracts/entrypoints/development.v1.json:8-9`: `"inputSchema": "../schemas/development-request.v1.schema.json", "outputSchema": "../schemas/development-outcome.v1.schema.json",`

### Evidence against it (pin)
- mw@f7c0a9431d6c `contracts/entrypoints/development.v1.json:8-9`: `"inputSchema": "development-request.v1.schema.json", "outputSchema": "development-outcome.v1.schema.json",`
- fix commit: `1f29daa7 2026-11-05T08:49:21Z fix(contracts): repair development entrypoint descriptor schema refs and consume the committed file in host tests (MechanicalWorkflows-14zrz)` — landed after the Pi program commit (7c80c343, 2026-11-04) and before the pin.

### Reconciliation attempts
- temporal split: RESOLVES — the doc observed the baseline accurately; the pin moved under it. Not a true two-sided contest.
- consequence for proposals: C0231's "adopt one canonical schema-ref grammar" is partly realized upstream (bare basenames, exact-equality transform); C0235's corpus-file test exists at the mw pin (`entrypoint-descriptor-file.test.ts`). Residual scope: a formal grammar spec and Pi-side consumption.

### What would settle it
Settled at the pin: the committed JSON and the host check now match byte-for-byte. The doc at 7c80c343 remains stale; an insert-annotation (owner-deferred) is the minimal repair.

## KG02-02 — "Pi consumes the canonical exported descriptor without hardcoded tests" vs both pins

Claims: C0234 (premise of C0233)
Status: REFUTED (repo misattribution + the premise's own target repo repaired)

### Evidence for C0234 as atomized
- doc@7c80c34346c2 `.../02-host-architecture-and-protocol.md:48`: "Pi consumes the canonical exported descriptor without hardcoded tests that substitute a hand-authored object." (implies such Pi tests exist today)

### Evidence against
- pi@b27829e6dfa7: grep for `EntrypointDescriptor|development.v1.json|mechanical.development.develop` over `src/` and `test/` -> one hit, a census **prose fixture** (`test/workbench-docs07-provider-rules.census.ts:262`), no descriptor object or test.
- mw@f7c0a9431d6c `apps/development-rig/test/entrypoint-host.test.ts:12` / `installed-host.test.ts:29` / `entrypoint-descriptor-file.test.ts:16`: the formerly hand-authored descriptor tests were **MechanicalWorkflows'** and now `readFileSync` the committed JSON (1f29daa7).

### Reconciliation attempts
- semantic split: PARTIAL — read as a pure prescription for future Pi behavior, the sentence asserts nothing false; the atomized existence premise fails under every reading.
- repo split: the defect the sentence gestures at existed in MW at baseline, not in Pi; it is repaired at the mw pin.

### What would settle it
Settled: the detector (grep, both trees) plus the MW test diff. Rival prescriptive reading preserved in the C0234 dossier.

## KG02-03 — `profile` (Pi doc) vs `mode` (MW doc) for the same proposed selector

Claims: C0222 (Pi side); MW counterpart lives in the g-MW claim group
Status: CONTESTED between the two program documents (both NON-EPISTEMIC proposals; neither shipped)

### Evidence for `profile`
- doc@7c80c34346c2 `.../02-host-architecture-and-protocol.md:40`: `profile: "git-census" | "native-task-scope";`

### Evidence for `mode`
- mw@f7c0a9431d6c `docs/programs/pi-workbench-interop-2026-11-04/02-binding-and-packaging-contract.md:25`: `mode: "git-census" | "native-task-scope";`

### Reconciliation attempts
- same value set, same author, same evening (one lineage): a naming divergence inside one program, not independent designs. Broader shape divergence noted: FunctionLaunch{definitionRef,input,hostMode,profile,policy} vs BoundInvocation{entrypointId,artifactDigest,request,scope,mode,effectAuthorization}.
- neither token exists in any shipped .ts at either pin (`git-census` greps to prose only), so no code is contradicted.

### What would settle it
A single contract spec (one field name) adopted by both repos before implementation; tracker: program owner.

## KG02-04 — "installed verified descriptor" vs descriptor's own status

Claims: C0221
Status: SUPPORTED with overclaim (semantic split resolves most of it)

### Evidence for
- mw@f7c0a9431d6c `contracts/entrypoints/development.v1.json:3`: `"id": "mechanical.development.develop.v1",`; `apps/development-rig/src/entrypoint-host.ts:32`: `const NAME = "mechanical.development.develop.v1";`; install-path test digests a real packed tarball (`entrypoint-descriptor-file.test.ts:42`).

### Evidence against the "installed" qualifier
- mw@f7c0a9431d6c `contracts/entrypoints/development.v1.json:16-17`: `"status": "descriptor-only", "note": "No remote host loader or generic invocation transport is implemented. Artifact binding belongs to the deployment host."`

### Reconciliation attempts
- semantic split: "installed verified" as *install-flow-verified in tests* holds; as *a standing installed artifact* it does not. The narrower committed+digest-checked proposition is ESTABLISHED.

### What would settle it
An actual install receipt (artifact digest + install location) at a future pin.

## KG02-05 — "empty-grants refusal" label vs pin mechanism

Claims: C0286 (label inherited by C0287's fix wording)
Status: ESTABLISHED defect, semantically narrowed label (not a two-sided contest)

### Evidence for the defect
- pi@b27829e6dfa7 `src/index.ts:2627-2628`: registered detached launch sends `grants: []` with backend `"claude"` whenever `workflowAgentBackend === "claude"` (2623) — the only setting under which the tools register at all (2640); second site `src/index.ts:2881`.
- pi@b27829e6dfa7 `src/workbench/hosts/local-detached.ts:430`: `if (request.backend === "claude" && !grants.includes("claude:invoke")) throw ...`

### Evidence narrowing the label
- pi@b27829e6dfa7 `src/workbench/hosts/local-detached.ts:427`: the generic validator **accepts** an empty array; the refusal fires on the missing `claude:invoke` grant, not on emptiness.

### Reconciliation attempts
- semantic split: RESOLVES — "empty-grants refusal" is the symptom name; the mechanism is missing grant wiring on the caller side. Fix lands in the caller's grants, not in empty-list handling. Static derivation only; the path was not executed (not run), and no test drives the registered path end-to-end (part-01 finding).

### What would settle it
A fixture run of the registered `workflow_execute`/`workflow_detached` path under `workflowAgentBackend: "claude"` reproducing the line-430 throw.

## Infrastructure note (not a doc contradiction)

Claim-id collision: claims-part-01.jsonl and claims-part-02.jsonl both assign C0201-C0279 (79 ids) to different propositions. All files of this group (status-part-g02.jsonl, relations-part-g02.jsonl, dossiers/*.g02.md) are part-02-scoped; dossier filenames carry the `.g02.md` suffix so they cannot clobber or be clobbered by a sibling group's dossiers for the colliding ids. Renumbering before whole-graph assembly is recommended.
