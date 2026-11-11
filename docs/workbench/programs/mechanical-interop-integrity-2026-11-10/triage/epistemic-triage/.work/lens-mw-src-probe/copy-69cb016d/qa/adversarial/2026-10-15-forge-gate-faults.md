# Live Forge gate fault injection (2026-10-15)

`qa/adversarial/forge-gate-faults.ts` ran against a clean disposable Forge
Python package at commit `ce0657cb7437fb25f66b2dbf3449fdbeae55a83b` with the
installed `forge 0.2.1`. Raw observations are in
`evidence/2026-10-15-forge-gate-faults.json`; `forge-gate-faults.test.ts`
checks them in the root Forge `evidence` step.

| Fault | What happened | Workflow reading |
| --- | --- | --- |
| Double start: two controllers dispatched `gate.run` for the same root at once | Both completed, operations `op-2f662785…` and `op-6184cc8d…`, both PASS at `ce0657c…`, tree clean | Two independent native verifications; neither was attributed to the other |
| Controller death: the dispatching Node process was SIGKILLed 2.5 s into the gate | No result was printed; one extra Forge process remained for about 2 s and then settled; tree clean | Lost terminal response: the caller has **no** observation; the native gate still ran. Nothing recorded a PASS |
| Stale workspace: a tracked file was appended 1.5 s into the gate | `indeterminate`, reason `WORKSPACE_NOT_CLEAN_AFTER_GATE`, operation `op-e63178f1…` retained | A native verdict for a changed tree is not a candidate verdict |
| Recovery: a fresh gate on the restored clean tree | PASS, operation `op-84f0cd3f…`, tree clean | No stale lock or state blocked the next controller |

What remains unmeasured for MW-049: a lost **acknowledgement** before
dispatch (the transport failing between request and the server's receipt),
explicit cancellation of a running gate, and constrained-resource nested
waiting. The killed controller's orphaned native gate was observed, not
reconciled: a later controller cannot tell from this host alone whether that
orphan completed, which is why the host never reuses an operation it did not
observe to the end.

## Constrained-resource nested waiting (added later on 2026-10-15)

Two concurrent root gates on the same clean scratch commit ran under
`FORGE_MAX_PARALLEL_JOBS=1` with `FORGE_SLOTS_WAIT=1`. Forge admitted one and
held the other at the host slot: the first reported
`data.intervals.queued = {ms: 0, observed: true}`, the second
`{ms: 5205, observed: true}`, matching the first's elapsed 5052 ms. Both then
passed at the same commit; the wait was measured before launch and not counted
against any step timeout, exactly as the manifest reference documents.
Evidence: `evidence/2026-10-15-slot-wait-queued.json` and
`evidence/2026-10-15-slot-wait-immediate.json`, checked in the root
`evidence` step. With this, every MW-049 fault class has a live witness:
double start, lost terminal (killed controller), stale workspace,
cancellation, lost acknowledgement, and constrained-resource nested waiting.
