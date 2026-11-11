# MechanicalWorkflows contributor instructions

Read `docs/README.md` and `docs/11-decisions-and-non-goals.md` before changing architecture.

- The fundamental abstraction is an ordinary TypeScript/Python function accepting dependencies and input. No mandatory workflow definition, node registry, DSL, scheduler, generic task queue, or global operation state.
- Use Forge for build/test/package operations. Do not add GitHub CI. When Forge lacks a capability, file measured feedback to Forge and retain an honest incomplete finding.
- Do not import or require Library at build, runtime, test, or deployment. Historical patterns can be ported with explicit provenance only.
- Preserve Forge/Beads/Furnace/HX/RF/agent SDK native semantics. Never conflate tool-call transport success, domain success, and Furnace executor success.
- No universal `asTools` method or Claude-specific imports in provider-neutral code. Claude/Pi/Codex/OpenAI adapters belong at the provider edge.
- A host adapter translates. Furnace retains Run/Work/Attempt, supervision, admission, retries and reconciliation; Beads retains readiness; Forge retains gates and source basis.
- The rig additionally has optional real Claude Agent SDK single-writer development code, with a required CLI write opt-in and clean committed Git candidate. Git census and plain context are NOT HyperUnix/ReactiveFiber. Bounded real Claude/Git/Forge, RF and Furnace SDK journeys are recorded from 2026-10-15; none witnesses Pi-to-Mechanical function hosting. Inspect their native receipts before making a current claim. Never claim a real PASS, idempotent Furnace `ensure`, child workspaces, agent execution, or completed RF rendering based on fixtures or design documentation.
- Prefer small, independently installable packages. Do not introduce extra package abstractions or shell wrappers until a verified consumer justifies them.
- Document requirements in flat, falsifiable form. Add negative-control tests for claims of safety or correctness.
- Every diagnostic code literal a product function can emit ships with a test that names it, or with a justified row in the `DEFENSIVE_GUARDS` registry of `qa/integration/mw-coverage-audit.ts`; the root `evidence` step fails on a new unpinned code and on a guard row whose literal left the source or gained a test.
- Current code exports native TypeScript functions and narrow local dependency ports; the remote entrypoint descriptor is **documentation/schema only**, not a running remote execution engine.
- Code aesthetics, organization and the build gate follow [docs/15](docs/15-code-standards-and-build-system.md); `npm run structure` enforces the mechanical subset (`scripts/check-standards.ts`).

## Pi Workbench function-host integration (2026-11-04)

Read [the cross-repository audit/design program](docs/programs/pi-workbench-interop-2026-11-04/README.md) and `.agents/skills/mechanical-pi-host/SKILL.md` for MechanicalWorkflows called by Pi. The existing installed package host is not already wired into Pi: its committed descriptor mismatch was repaired in `1f29daa7`, Pi currently refuses `function` definitions, and the live application callbacks have no cross-repository host binding. Keep the committed-descriptor/packed-artifact tests and prove an independently installed Pi consumer before claiming readiness; keep Git-census, native HX task coverage and RF preview/committed provenance distinct. Update this skill, docs/05/06/10, tests and native receipts in the same code cut. No GitHub CI and no Library dependency.

## Updated Pi function-host program (2026-11-06)

Read [the reconciled audit, feedback qualification, host contract and delivery plan](docs/programs/pi-workbench-interoperability-audit-2026-11-06/README.md) and the updated `.agents/skills/mechanical-pi-host/SKILL.md`. The 2026-11-04 program is historical; do not reassert its refuted descriptor defect or its pre-November-5 cancellation absence as present tense. Preserve source, gate, domain and transport identities. Do not mark interop shipped until a registered Pi function invocation and native producer receipts exist.

## Package-local bead-machine field-convergence program

For bead-machine topology, workflow hosting, evidence correctness or skill-harvest implementation tasks, start at [this repository's own design program](docs/programs/bead-machine-field-convergence-2026-11-07/README.md) (proposed 2026-11-07). The program contains this package's audit baseline, architecture, numbered work packages, source paths and agent-skill acceptance; agents do not need to locate a Forge- or Library-hosted cross-repo document to begin. Inspect actual installed source and run the appropriate local gate before asserting implementation or adoption.

## Current native Pi interoperability implementation program (2026-11-09)

For Mechanical ordinary-function hosting in Pi, begin at [the complete local implementation and verification program](docs/programs/pi-native-interoperability-2026-11-09/README.md), then read its three guides and `.agents/skills/mechanical-pi-host/SKILL.md`. Earlier 2026-11-04/06 audits are dated history. Current descriptor/packed loader and typed abort/uncertainty exist; the independently installed rig-host export `@mechanical/development-rig/host` now exists (L2); the missing delivery is the application-owned service bundle plus native registered Pi function dispatch, observation and joined acceptance. Do not reclassify Pi's repaired worktree/grant paths as unimplemented. The M07–M09 adverse, crash, load and release tail is mandatory for W11 graduation; no runtime feature is delivered by this documentation change.
