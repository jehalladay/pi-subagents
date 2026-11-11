# MechanicalWorkflows — RFCLI context adoption and feedback convergence

**Design baseline:** `main@0c78e2530cbf5737a8bbb763475385a2f0f760cc` (November 2026). No runtime changes in this commit.

## Existing boundary
MechanicalWorkflows composes ordinary functions and optional agent, Forge, Furnace and Beads adapters; it does not own those authorities. The current RF integration uses the opt-in `MECHANICAL_RF_BINARY`, and missing native RF is reported as `RF_UNAVAILABLE_UNDER_HERMETIC`, not an installed success.

## Work packages
- **MW-X01 — Typed RF context handoff.** Carry explicit workspace, actor, render, model and CLI provenance between workers; preserve structured failure and text projection, avoiding large raw JSON.
- **MW-X02 — Receipt-safe action continuation.** Separate a transport failure from a domain refusal and a committed-but-unacknowledged mutation. Consult the originating receipt before retry.
- **MW-X03 — Agent context sufficiency.** Use context history and explain to choose a minimal relevant render for a bead; protect predictable task labels from redacted digest disclosure.
- **MW-X04 — Workload regulation.** Observe reader latency, lock holds, useful commit throughput and retries without building a second RF scheduler.
- **MW-X05 — Adoption journeys.** Ship runnable optional installed RF + agent + Beads + native Forge journey and a dependency-unavailable negative-control path.

## Boundaries
No mandatory ReactiveFiberCLI dependency for the ordinary workflow packages; no Forge or Furnace dependency in RFCLI. Do not conflate a Forge gate PASS, Furnace Run completion, Beads closure, RF render success and a tool transport acknowledgment. Follow [qualification](01-QUALIFICATION.md) and [skill](../../../skills/mechanical-workflows-rf/SKILL.md). Upstream program: https://github.com/jehalladay/ReactiveFiberCLI/tree/main/docs/programs/rfcli-system-feedback-convergence-2026-11-04
