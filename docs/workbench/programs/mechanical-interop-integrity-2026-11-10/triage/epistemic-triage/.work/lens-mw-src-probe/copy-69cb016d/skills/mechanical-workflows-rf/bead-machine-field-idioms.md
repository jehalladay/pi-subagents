# MechanicalWorkflows resident pools and Pi function-host usage

Companion to SKILL.md. It adds observed workflows and explicit gaps; do not treat it as proof of new registered function hosting.

### Machine patterns
- Camshaft is a 16-slot resident workflow pool. One generation produces 298 cycle-agent results plus one closeout notice. Retirement checks report cycles, workflow notice and journal census independently; run195 had 299/299 notice and journal but only 15/16 done-heartbeats, so record DEGRADED rather than erasing the bad leg.
- The orchestrator owns launch, monitoring and resource admission, not MechanicalWorkflows as an additional task scheduler. Run overlapping generations within host resources, and gate new work against live rather than nominal capacity.
- Cross-repository candidate integration may require a single hub-authoritative remote (GitHub can be a delayed mirror), an owner-granted bounded landing lock pause, fresh review after a base moves, exact SHA/source tree and source-pinned Forge evidence. Do not call a previous PASS sufficient for a rebased different tree.
- RF context is optional; distinguish a committed render ID from Pi preview and sanitize redacted projections using projectForUntrustedSurface and assertRedactedProjection to strip task_digest/task_blob_digest.
- A native Mechanical develop(services, request) call exists. However the Pi registered workflow_execute function dispatch was not demonstrated as of the Nov 7 interoperability audit; a direct call or script launch is not joint acceptance.
- A cancel request does not rollback a committed code/effect. Preserve the effective prompt, skill, config, candidate tree, gate and receipt identities across replay.

### Acceptance
One true registered Pi -> Mechanical function E2E with an installed artifact, source revision, real producer, explicit permissions, attempted effect and independent gate outcome. Include negative cases: no grant, invalid descriptor, failure before import, lost reply, dirty cleanup, abort during execution and stale replay. Do not invent an auto-promoter.
Evidence: Library BM-FC-01 SKILL-HARVEST W-01..W-05, raw camshaft-20261107T0354Z, pi-subagents docs/workbench/programs/mechanical-interoperability-audit-2026-11-06 and MechanicalWorkflows interop program.
