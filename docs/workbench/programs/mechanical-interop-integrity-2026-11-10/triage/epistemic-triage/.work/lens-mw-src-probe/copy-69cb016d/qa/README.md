# QA and integration journeys

The initial executable tests are in `packages/development/test` and `apps/development-rig/test` and are reached by `npm test` and the root Forge gate. These are **fixture/contract tests**, not live product-conformance tests.

Future real integration journeys belong under this directory and must report:
- producer versions + artifact/subject basis;
- native Forge/Furnace/HX/RF/agent operation IDs;
- exact claims established and unestablished;
- injected failure and negative-control witness;
- measured overhead, including poll/process startup where applicable.

Required target paths include `qa/integration`, `qa/recovery`, `qa/adversarial`, and `qa/performance`; do not create empty test folders or report their absence as passed journeys. `qa/adversarial/forge-gate-faults.ts` is the live fault-injection driver (run it only against a clean disposable Forge package) and its recorded evidence is checked by the root `evidence` step. See [QA specification](../docs/08-qa-and-conformance.md).

The Python usage proof is `qa/integration/python-consumer/test_workflow.py` and is reached by the root Forge `python-consumer` gate step. The installed Forge Python SDK external probe is `qa/integration/python-consumer/forge_sdk_probe.py`; its native gate result can exit 3 when App Server source basis is absent even when the native gate reports PASS. Run it under an installed `forge_sdk` interpreter against a clean committed Forge package and supply the exact expected commit.

The GraphPolicy host adapter journey is `qa/integration/graph-policy-host.integration.test.ts` (driver `graph-policy-host.journey.ts`, record `qa/integration/evidence/2026-10-20-graph-policy-host-journey.json`). The root Forge `evidence` step names it, so every full gate reaches it. Every verdict about GP behavior there is FIXTURE grade (no GraphPolicyCLI exists; the clients are in-process doubles) and the record carries `certified: false`. Regenerate the record with `node qa/integration/graph-policy-host.journey.ts --write` after a deliberate change to the host source.
