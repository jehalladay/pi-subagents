# MechanicalWorkflows — qualification plan

1. Pin the installed RFCLI `result.provenance`, `MECHANICAL_RF_BINARY`, workspace and actor. A missing binary stays explicitly unavailable; do not silently simulate a real render.
2. Capture one real context render, explain and replay, and carry only the render ID/evidence handle through a workflow worker handoff.
3. Inject a lost effect reply after a durable transaction; verify the workflow does not run a second effect blindly. Keep separate receipt identities for native Forge, Beads and Furnace.
4. Run an optional agent + RF context + native Forge development journey with a clean Git candidate and a failing-case control. A test fixture never proves a real external SDK run.
5. Compare token cost, tool calls, wrong retries and useful work with and without context-specific skill; diagnose lock timeout as workload pressure, not a generic currentness conflict.
6. Update `docs/06-sdk-integration-and-hosts.md`, `docs/10-current-state-and-gaps.md`, runnable examples and `skills/mechanical-workflows-rf/SKILL.md` in each implementation packet. Run the existing local gate; no GitHub CI.

**Status:** proposed tests and architecture only; no live test result is asserted.
