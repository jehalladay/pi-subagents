# Pi-subagents — Mechanical function interoperability integrity program
**Status: DESIGN ONLY, not implemented or released.** **Date:** 2026-11-10. **Owner:** Pi Workbench. **Default branch:** master.
**Inspected Pi revision:** 0fb9067262532289104417d2b7f2f25704563a75. **Paired Mechanical snapshot:** 69cb016dd293a17bcc893f2baf410a51c226f4c9, with an additional main commit observed while authoring; re-pin both before implementation.
**Companion Mechanical program:** https://github.com/jehalladay/MechanicalWorkflows/tree/main/docs/programs/pi-host-integrity-2026-11-10

## Purpose
Deliver one first-class, versioned, independently installed MechanicalWorkflows function through Pi's *registered* workflow_execute(kind=function) route, with exact input identity, end-to-end authority, long-lived exclusive workspace ownership, observable domain outcomes, durable uncertainty and no false Forge verification. This is the next, self-contained design revision. The November 9 program at docs/programs/mechanical-native-interoperability-2026-11-09 remains historical requirements provenance; its completed source changes must not be undone.

## Read in order
1. [01 — source evidence, audit disposition and invariants](01-AUDIT-AND-INVARIANTS.md)
2. [02 — protocol, owned execution and state model](02-PROTOCOL-AND-RUNTIME.md)
3. [03 — executable implementation packets](03-IMPLEMENTATION-PACKETS.md)
4. [04 — falsification, native verification and release](04-ADVERSARIAL-VERIFICATION.md)
5. [05 — agent/operator LX, docs, handoffs and adoption](05-OPERATIONS-AND-HANDOFF.md)

## Observed baseline, not a promise of execution
- src/workbench/execute-tool.ts registers one executable tool; its non-script branch returns unsupported-definition-kind. src/index.ts wires script launchers only. The model schema advertising function and furnace-formula is NOT execution support.
- src/workbench/mechanical-descriptor.ts has a pinned descriptor/allowlist loader; src/workbench/function-authority.ts can adopt and recheck exact grants but its exported default FUNCTION_ACTION_CONTRACT remains unadopted; src/workbench/source-admission.ts confines Git worktrees and carries a process-local WriterLeases map.
- Pi has script, Claude, detached-host, observation/control/reconcile and worktree-preservation primitives. Do not reclassify those as missing or as joined Mechanical execution.
- Mechanical has ordinary develop(services,request), a shipped @mechanical/development-rig/host subpath and L2 external installed-host fixtures, plus standalone native Git/Claude/Forge execution. Those proofs do NOT run through registered Pi.
- No live joined Claude/Git/Forge Pi receipt, no joined crash restart proof, no compatible distributed lease proof. Design authorship is not implementation.

## Release definition
First supported vertical: host-reviewed mechanical.development.develop.v1, attached or explicitly admitted same-machine execution, one clean isolated Git worktree, git-census-v1/plain-v1, four Mechanical callbacks, real Claude Agent SDK candidate commit, strict native Forge gate, and workflow_observe of the SAME logical invocation and original domain result. No script alias, model-provided action grant, ambient workspace write, generic function import, invented verification, or automatic uncertain-effect retry.

## Severity and ownership
Pi owns: P0 canonical admitted input vs dispatched input (D3); P0 invocation-scoped writer ownership (D5); P0 composed authority/routing (D6/D9); real observation, journal, controls, lifetime and load. Mechanical owns: P0 strict Forge proof (D1/D7), P0 negative-effect semantics (D2), packed executable closure (D4), native service binding and provider receipts. D8/D10/D11/D12 are shared or Mechanical-owned as described in this corpus. A P0 here is a blocker for this target release, not a claim of a current exploitable Pi function route.

## Operating constraints
No GitHub CI. Use focused local tests, complete Forge gate where available, exact source pins and machine-readable producer receipts. Preserve independent Forge and Furnace, never couple Mechanical core to Pi, never require Library for execution, and keep optional HX/RF/Furnace profiles outside the first Git/plain release. Use actual Beads identity if available; packet IDs in this program are *planning labels*, not fabricated bead IDs. Documentation, skill, examples and agent LX updates are part of closure, not an afterthought.
