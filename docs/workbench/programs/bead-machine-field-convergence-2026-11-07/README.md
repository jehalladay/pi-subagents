# PI-BM: Registered Mechanical function hosting and crash-resilient agent sessions

**Status:** PROPOSED package-local program (2026-11-07). Implementation agents start HERE within the current repository; this program contains its own evidence, architecture, work packages, skill requirements and verification. Library is not a dependency.

## Goal
Ship first-class, auditable MechanicalWorkflows function invocation through the registered Pi Workbench tool path, while preserving working script workflows, native Claude handling, and safe recovery after agent/process death.

## Field and source findings (historical, not current pass/fail)
1. Current registered workflow_execute supports script mode; function invocation has not been established on the exact registered path, despite helper-level Mechanical source and tests.
2. Previous audit found cleanupWorktree can force-remove changed work after failed commit preservation and return false-clean; this is a P0 authoring-custody defect.
3. Detached Claude launches may pass empty grants despite native claude:invoke validation; preserve host authorization and effective grants for every invocation.
4. Flywheel repeatedly exposed host-level Git index/provenance custody hazards under concurrent agent commits. A session-bound orchestrator's death did not mean published effects or Beads work had rolled back.
5. Camshaft shows 16 resident slots and independently checked completion notices; no new Pi global scheduler is required.

## Authority boundaries
- Pi is host and session/transport boundary, not Beads ownership, Forge gate policy or Mechanical function composition.
- Mechanical owns ordinary develop function and descriptor, app owns closures and task effect. Native Claude API grants are resolved by host, not arbitrary request JSON.
- Cancel stops or requests cancellation but cannot roll back Git/Beads/source effects; unknown writer state must be preserved.

## Program structure
- [01-ARCHITECTURE.md](01-ARCHITECTURE.md) — local interfaces, states and invariants.
- [02-WORK-PACKAGES.md](02-WORK-PACKAGES.md) — actionable, test-first work and prerequisites.
- [03-AGENT-SKILL-AND-ACCEPTANCE.md](03-AGENT-SKILL-AND-ACCEPTANCE.md) — all harvested use cases and acceptance matrix.

## Where to work
- `.agents/skills/pi-mechanical-interop/SKILL.md and bead-machine-field-idioms.md`
- `docs/workbench/mechanical-function-hosting.md`
- `docs/workbench/programs/mechanical-interoperability-audit-2026-11-06`
- `docs/workbench/feature-matrix.md (W11)`
- `src/ Workbench registered tool and git/worktree cleanup functions`

## Non-goals
- No untrusted JavaScript import specified in user request without preflight.
- No mandatory Library runtime, new scheduler, or misstatement of native function completeness.

No GitHub CI or PRs; work against current branch head, do not force-push another agent's landings. Create actual local Beads issue IDs (the IDs below are program IDs, not issued work). Keep optional dependencies federated and skills/docs at parity with executable commands. Historical evidence retains its original measurement window.
