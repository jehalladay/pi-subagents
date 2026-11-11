# Live cancellation and lost-dispatch faults (2026-10-15)

`qa/adversarial/forge-gate-cancel.ts` drove the installed `forge 0.2.1`
app server through the public `@forge/sdk` on the clean scratch package at
`ce0657cb7437fb25f66b2dbf3449fdbeae55a83b`. Evidence:
`evidence/2026-10-15-forge-gate-cancel.json`, checked by
`forge-gate-cancel.test.ts` in the root Forge `evidence` step.

| Fault | What happened | Workflow reading |
| --- | --- | --- |
| Cancel a running gate one second after its `operation.started` frame (`op-bf91d39d…`) | The cancel receipt said `CANCEL_REQUESTED` / `ACCEPTED` / `cancellationEstablished:false`; the operation's own terminal then said `status:error`, `terminal_disposition: cancelled-established`, `cancellation.establishment: CANCELLED_CONFIRMED` | The host read `indeterminate`. At the time it reported `FORGE_RESULT_UNREADABLE` with no operation id, because the cancelled answer is a bare result envelope without the `operation_id`, `terminal_fact` and `forge_result` fields a completed answer carries. The classifier now reads such a terminal as `FORGE_OPERATION_CANCELLED` and keeps `data.operation_id`; it still never reads a verdict from it |
| Close the owned transport 50 ms after dispatch | The started frame had already arrived; `close()` sent SIGTERM to the owned server; the request rejected with `TransportClosed` / `FORGE_TRANSPORT_CLOSED`; the operation-log count did not change; tree clean | The host's ordinary path reports `FORGE_DISPATCH_OUTCOME_UNKNOWN`. Nothing native remained to reconcile, and nothing was recorded as a PASS |
| Recovery gate | PASS, `op-b2a197aa…`, tree clean | No stale state blocked the next controller |

Together with `2026-10-15-forge-gate-faults.md` this covers double start,
lost terminal response, stale workspace, lost acknowledgement and
cancellation for MW-049. Constrained-resource nested waiting remains
unmeasured. The cancel receipt is deliberately not treated as evidence of
cancellation; only the operation's terminal is.

## Upstream fix verified (2026-10-15, later the same day)

Forge fixed the bare cancelled answer about three hours after the feedback was filed: commit `669cae5e75` carries `operation_id`, `terminal_fact` and `forge_result` on a peer-cancelled answer beside the kept flat envelope. Verified A/B through the public SDK: a venv build of source `aef8dcb30a94` answers with all three keys (`terminal_fact` reads the disposition `cancelled-established`, a fourth value beside completed/failed/partial-indeterminate), while the installed `0deb972720ce` still answers the bare envelope, so this package's recorded shapes stay accurate for the installed binary. The classifier handles both: establishment is read from `data.cancellation.establishment` and the operation id falls back to `data.operation_id`. Evidence: `evidence/2026-10-15-forge-cancel-fix-recheck.json`; re-check filed as a Forge corroboration. The host's installed forge was not changed.
