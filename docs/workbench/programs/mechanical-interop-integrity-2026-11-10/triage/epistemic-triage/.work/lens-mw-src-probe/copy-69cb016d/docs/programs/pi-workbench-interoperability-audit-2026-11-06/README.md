# MechanicalWorkflows × Pi Workbench — reconciled interoperability program (2026-11-06)

**Status:** new design/audit program, not an implemented Pi integration or a new live acceptance receipt.
**Audit pins:** MechanicalWorkflows `main` `97e18068f3996d9a3faf242c089691b049ed04ac`; pi-subagents `master` `278c8f79a3a1d078cfcfbd5b6661a8d321c5a505`. Re-pin before implementing.
**Scope:** this repository's ordinary development function, installed host, application callbacks, native producer bindings and supporting coordination functions. The Pi-side companion lives at `pi-subagents/docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/`.

Read [01 source audit](01-current-audit.md), [02 executable host contract](02-host-contract.md), [03 staged implementation](03-delivery-program.md), [04 verification/feedback](04-qa-feedback.md) and `.agents/skills/mechanical-pi-host/SKILL.md`. Continue to consult the [November 4 program](../pi-workbench-interop-2026-11-04/README.md) for its original design and the paired Pi epistemic triage for its claim and requirement history; **do not copy its superseded present-tense claims**.

## Decision

Keep `@mechanical/workflows-development` an ordinary, provider-neutral function taking `DevelopmentServices` and `DevelopmentRequest`. Expose a **trusted local application-host facade** from the existing rig only when required by a real installed Pi consumer. Do not move SDKs into the core, introduce a mandatory workflow language/registry, or turn Mechanical into the orchestrator. The first cross-repo run uses named `git-census-v1` evidence and plain context, then Claude Agent SDK and native Forge. Certified HX and committed RF are separate enhancement gates.

## Current grade

The committed development descriptor is **repaired** and consumed by a packed-tarball test. The rig has a real single-writer Claude/Git/Forge journey documented from 2026-10-15. Cancellation currently stops only before SDK dispatch, not a running agent. Pi still refuses `function` in its registered execute tool; **the cross-repository live path is not proven**.

No tests, Forge build, npm pack, SDK executions, feedback reproductions or live cross-repository calls were run in the preparation of this 2026-11-06 program. Source inspection and previously committed receipts are distinguished in the following files.

## Invariants

- A function return, transport exit, Forge gate result and Furnace Attempt result are distinct.
- No task-scoped HX completeness from a Git file census, no committed RF provenance from Pi `--no-commit` preview.
- Clean pinned Git base and candidate, recoverable dirty state, no blind replay of uncertain effects.
- Host authorization and SDK access are capabilities supplied by the application, never reconstructed from a workflow string.
- No Forge↔Furnace dependency, no Library dependency, no GitHub CI; Forge remains the build/evidence gate.
