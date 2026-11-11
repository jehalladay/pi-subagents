# 04 — Developer/agent handoff, examples and decision rules

Use the project's `.agents/skills/mechanical-pi-host/SKILL.md` and the paired Pi skill. Both repos may change independently; verify the current installed refs before work.

## Read before coding

- `AGENTS.md`, `docs/README.md`, `docs/11-decisions-and-non-goals.md`, `docs/05-deployable-entrypoints.md`, `docs/06-sdk-integration-and-hosts.md`.
- `contracts/entrypoints/development.v1.json` and exact `contracts/schemas/*` paths.
- `packages/development/src/{develop,contracts}.ts`, `apps/development-rig/src/{entrypoint-host,installed-host,live-development,live-evidence,claude-implement,hx-scope,rf-context,live-gate}.ts`.
- Pi W11 feature matrix and `src/workbench/{execute-tool,native-modules}.ts`, `src/index.ts`, `hosts/local-detached.ts`, related test and feedback files.
- Installed Forge/Furnace/HX/RF/Claude API surfaces, versions and authoritative Beads state. Do not guess from a past receipt alone.

## Developer workflow

1. Write down exact baseline SHA, target artifact and smallest externally observable behavior.
2. Create the failing real consumer test: checked-in descriptor + `npm pack` + `invokeInstalledDevelopment` + actual callback fixture. Measure the negative before changing source.
3. Repair only the owning code/contract. Run positive, mutation negative, source/basis mismatch and effect uncertainty tests. Keep `develop()` provider-neutral.
4. Extend to real service bundle in isolated source workspace only after explicit write opt-in. Use the normal Mechanical functions and true public provider contracts; avoid shell orchestration when a stable native SDK exists.
5. Verify with Forge root/member gate, capture command ID and actual producer references. Do not claim status if a gate was not run. Update documentation, current-state ledger and skill in the same implementation cut.
6. Hand off with the input/output contract version, exact package digest, how to reproduce both pass and failure, observed native IDs, cancellation/recovery semantics and unresolved blockers.

## Minimal usage — already implemented ordinary function

```ts
import { develop } from "@mechanical/workflows-development";

const outcome = await develop(
  { discover, compileContext, implement, verify }, // host-supplied callbacks
  { task: "Fix parser", workspaceId: authorizedRoot, baseRevision: pinnedGitCommit },
);
```

This example is actual source API but callbacks must be provided by a trusted application host; it is **not** an executable Pi Workbench function launch as of the audit baseline.

## Proposed Pi invocation — NOT currently runnable

```ts
// Design sketch only, not an existing tool contract accepted by the registered Pi tool.
workflow_execute({
  definitionRef: { kind: "function", id: "mechanical.development.develop.v1",
    schemaVersion: "mechanical-workflows/entrypoint/v1", artifactDigest: pinnedTarballDigest },
  input: { task: "Fix parser", workspaceId: authorizedRoot, baseRevision: pinnedGitCommit },
  hostMode: "embedded",
});
```

Implement the host before adding a runnable quickstart. Replace this design-only illustration with a measured, copy/paste-executable example only after PI/MW-3 acceptance.

## Case classification

| If | Then |
| --- | --- |
| Git census complete, no task HX proof | run only explicit Git-census profile; never assert HX task completeness |
| HX returns partial/unknown or unpinned revision | `needs_evidence` / no implementation |
| RF returns ephemeral preview | presentation read only, not committed context |
| Agent created no changed clean candidate | no verified_candidate; preserve uncertain/dirty work |
| Forge ran but lost response | uncertain; consult native operation before retry |
| Function returned `verification_failed` | completed function, failed domain verification |
| Furnace Run status is success | only Furnace callback status, not general correctness |
| Policy emits a proposal | no native action without an independently authorized resolver |

## Handoff record

```text
baseline SHA + target blob/SDK versions:
entrypoint ID + artifact SHA + schema contract:
real consumer positive/negative evidence:
callback source/effect authority:
candidate Git basis and native producer IDs:
cancellation and ambiguous effect handling:
Forge commands and exact observed results:
skills, user docs, current state and receipts updated:
limitations, upstream owner/blocker and next bead:
```
