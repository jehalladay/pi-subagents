# MW-BM: Composable resident workflows and real Pi function consumers

**Status:** PROPOSED package-local program (2026-11-07). Implementation agents start HERE within the current repository; this program contains its own evidence, architecture, work packages, skill requirements and verification. Library is not a dependency.

## Goal
Extend the existing Mechanical workflows/development-rig as ordinary callable compositions, with host-owned evidence and supervision ports, to become the first real native function consumer of Pi Workbench; do not turn Mechanical into another scheduler.

## Field and source findings (historical, not current pass/fail)
1. Camshaft deployed 16-slot resident generations, 299 cycle/notice results per complete generation, and independent completed notice/journal/heartbeat checks. One 15/16 heartbeat leg correctly degraded retirement despite other green legs.
2. Mechanical ordinary develop(services,request) is available with trusted committed artifact/descriptor tests. Pi's registered workflow_execute has historically launched scripts, not native Mechanical functions.
3. Existing MW developer-rig GP Policy Seat source journey is possible but has zero host-verified training reward; ReactiveFiberCLI projection mapping and committed render ID eligibility are separate gaps.
4. Cross-repo code landing must distinguish GitHub mirror from authoritative hub, exact-head re-review after restack, publisher lock, candidate tree, Forge gate verdict and closure. A cancel request is not rollback.
5. RF redacted projections can retain predictable task_digest/task_blob_digest: projectForUntrustedSurface and assertRedactedProjection exist and must remain on exported handoffs.

## Authority boundaries
- MW owns function composition and typed domain outcomes; host owns worker, authorization, claims, publication and durable Run/Attempt.
- Pi Workbench owns registered function hosting; tests of direct develop() cannot prove Pi's registered tool path.
- RF/GP/HX/Furnace/Forge are ports or externally measured authorities, never mandatory orchestrator dependencies.

## Program structure
- [01-ARCHITECTURE.md](01-ARCHITECTURE.md) — local interfaces, states and invariants.
- [02-WORK-PACKAGES.md](02-WORK-PACKAGES.md) — actionable, test-first work and prerequisites.
- [03-AGENT-SKILL-AND-ACCEPTANCE.md](03-AGENT-SKILL-AND-ACCEPTANCE.md) — all harvested use cases and acceptance matrix.

## Where to work
- `skills/mechanical-workflows-rf/SKILL.md and bead-machine-field-idioms.md`
- `apps/development-rig/ and src/`
- `docs/programs/pi-workbench-interoperability-audit-2026-11-06`
- `docs/06-sdk-integration-and-hosts.md`
- `AGENTS.md and docs/README.md`

## Non-goals
- No new workflow scheduler, no mandatory Pi or Forge dependency inside Mechanical core.
- No claim of Pi native function completion until registered exact route passes.

No GitHub CI or PRs; work against current branch head, do not force-push another agent's landings. Create actual local Beads issue IDs (the IDs below are program IDs, not issued work). Keep optional dependencies federated and skills/docs at parity with executable commands. Historical evidence retains its original measurement window.
