# Performance and friction observations — 2026-10-15

## Measurement scope

These are three **individual native Forge operations** from the same scratch
package on one host, not cold/warm matched experiments. Each row is an
independent outcome, with no percentile claim. Timings are taken verbatim
from `forge_result.data.intervals`; controller/child may overlap in the
underlying producer's accounting and must **not** be summed here. The
`launch.ms` field is Forge's process-start-procfs observation, not an
additional wall-time component.

| Case | Native operation | Native outcome | elapsed.ms | launch.ms | launch source | child.ms | controller.ms |
| --- | --- | --- | ---: | ---: | --- | ---: | ---: |
| clean full gate | `op-2d1ab467653d4b34a3c9f4a68193ae0c` | PASS | 4620 | 1542 | process-start-procfs | 1941 | 2679 |
| committed red test | `op-29e737dde4d3497ca3bac6ebafd2140b` | FAIL | 1003 | 1545 | process-start-procfs | 177 | 826 |
| bounded agent candidate | `op-f74368f48f7a4e29b703c1ca184af0d2` | PASS | 6262 | 1557 | process-start-procfs | 4353 | 1909 |

The bounded Claude Agent SDK result reported seven turns and USD 0.1199434
of model cost for the single-file task. Those are provider-reported values,
not a wall-clock/tokens estimator. Full SDK startup, SDK glue, provider turn
latencies and budget accounting beyond these fields were **not measured**.

The root Forge integration gate later measured 6229 ms elapsed, 5335 ms child,
894 ms controller, 2003 ms process launch. It executed four declared steps;
`data.selection_accounting.counts.declared=4`, `executed=4`, `selected=4`,
`unknown=0`. One root gate is not a warm/cold benchmark.

## Measured friction and attribution

- The first `--live-verify` returned indeterminate even though Forge's native
  gate passed: App Server omitted the inline `gated_commit`; an in-root run
  record lookup restored the pin. Feedback delivered to Forge at
  `cb2909fef5a2`.
- The Furnace TypeScript SDK build could not pass at fetched upstream HEAD,
  and its generated model digests disagreed. The first two native Attempts
  failed before the callback; a local ignored build-output reconciliation
  permitted a third Attempt. Feedback delivered to Furnace at
  `1692d381fde2`. No extra elapsed cost estimate is claimed.
- The Forge TypeScript package backend defaulted to `pnpm pack`, absent as
  an active tool in this npm workspace (`FORGE_TOOLCHAIN_MISSING`, exit 69).
  Both member manifests now declare `npm pack --ignore-scripts` and
  `forge package` succeeds on both. The host did not measure cold/warm
  package setup overhead.
- The Claude SDK initially composed a compound shell tool call outside the
  narrow allowed-tools set and got a `dontAsk` denial. Separate permitted
  Write/Edit and Git calls fixed the bounded one-file journey without
  widening tool permissions.

## Evidence and missing denominator

Native envelopes: `integration/evidence/2026-10-15-live-verify-pass.json`,
`integration/evidence/2026-10-15-live-verify-fail.json`, and
`integration/evidence/2026-10-15-live-claude-forge-verified.json`. The
report cannot establish a performance regression or improvement: it has
no pinned comparable cold/warm pair, no cache reuse study, no HX/RF stage
cost sample, no measured Furnace polling count, and no process-launch
census across the full workflow. MW-056 stays TARGET until those exist.

## Additional bounded RF-mode observation

The native Forge gate for the RF task-context candidate (`op-82587a2e298944beb2c26d39ebf3738c`) reported elapsed 6271 ms, child 4363 ms, controller 1908 ms, and launch 1561 ms. These are all native observations in `integration/evidence/2026-10-15-live-rf-claude-forge-verified.json`. The root Forge `evidence` step now checks those native interval fields and the prior PASS/FAIL evidence files. It does **not** subtract launch from elapsed or sum overlapping stage windows. A matched cold/warm series, HX/RF process startup and Furnace polling measurement remain unmeasured.

## Matched consecutive full-gate observations

Two consecutive, unnarrowed root `forge build` invocations on the same
committed source `c1fd3f98564b956cf18dff2f194eade45b28386a` each
selected and executed all six declared steps, had zero unknown steps,
reported `gate_verdict=PASS`, and did **not** use Forge step replay.
Native elapsed observations were 13043 and 13078 ms; process-launch
observations 1563 and 1556 ms; child intervals 12015 and 12047 ms;
controller intervals 1028 and 1031 ms. These are two successive runs, not
cold-versus-warm: the environment and dependency caches were not reset
between them, and no cold baseline was captured. Source, gate selection and
native evidence are recorded in `integration/evidence/2026-10-15-root-full-gate-run-a.json`
and `...run-b.json`.

This sample supports repeatability at one source basis only. It cannot
quantify cache benefit, full workflow SDK glue or Furnace polling.

## Fresh-clone cold gate and warm rerun

A fresh `git clone --no-hardlinks` of commit `627a7e3dcfdfab2fa6b984e40db96203ae3d906a`
into an empty directory, with no `.forge/` state and no provider SDKs,
installed its declared dependencies offline (`npm ci --offline`, 393 ms) and
passed the full six-step root gate cold, then again warm on the same tree:

| Run | gate | elapsed ms | launch ms | child ms | controller ms | test step ms | replay |
| --- | --- | --- | --- | --- | --- | --- | --- |
| cold (fresh clone, no `.forge/`) | PASS | 13421 | 1524 | 12439 | 982 | 9762 | none |
| warm (same clone, second run) | PASS | 13414 | 1547 | 12417 | 997 | 9781 | none |

Native envelopes: `integration/evidence/2026-10-15-fresh-clone-cold.json`
and `integration/evidence/2026-10-15-fresh-clone-warm.json`. The warm run
reused nothing Forge could measure (`replay.any_replayed=false`, no
`reuse` record), so for this gate the cost is the TypeScript build and test
step itself, not Forge state. An earlier attempt at this measurement was
invalid: the local clone failed on a cross-device hardlink and both runs
silently hit the working copy. A second attempt failed its gate because two
tests read an untracked tarball; that defect is fixed and this pair follows
the fix. SDK glue, polling and process census remain unmeasured.

## SDK glue and queue observations from the fault drivers

From the recorded adversarial evidence on the scratch package: the Forge App
Server's `operation.started` notification arrived 50 ms after the SDK
`gate.run` dispatch (`evidence/2026-10-15-forge-gate-cancel.json`,
`startedAfterMs`), which bounds the request-to-admission SDK glue for that
run. Under a one-job host cap the queued gate's slot wait was measured
natively as `data.intervals.queued.ms = 5205` against the running gate's
5052 ms elapsed (`adversarial/evidence/2026-10-15-slot-wait-*.json`). These
are single observations, not distributions. Furnace polling remains
unmeasured (blocked on the Furnace SDK build), and no cross-run process
census beyond the fault drivers' pgrep counts was taken.

## Gate process census (single sampled run)

One scratch-package gate was sampled every 250 ms for processes whose argv
names the installed forge interpreter (`uv/tools/forge`). Baseline before and
after the run was 3 (concurrent forge sessions on this host); during the
4678 ms PASS the count rose to at most 5, a peak of 2 processes above
baseline for this gate (controller plus one step child in flight). Evidence:
`integration/evidence/2026-10-15-gate-process-census.json`. One run, one
host, baseline not isolated; an earlier attempt was discarded because its
matcher also counted this workspace's own `ForgeWorkspaces` paths.

## Ten-run interval distribution on one scratch commit

Ten consecutive root gates on the clean scratch package at `ce0657c…`, same
host, no cache reset, all PASS:

| interval | min ms | median ms | max ms |
| --- | --- | --- | --- |
| elapsed | 4628 | 4683.5 | 4769 |
| launch (procfs) | 1528 | 1541.5 | 1666 |
| child | 1947 | 1969 | 1995 |
| controller | 2681 | 2713 | 2774 |

Evidence: `integration/evidence/2026-10-15-gate-interval-distribution.json`.
The spread is 141 ms on elapsed across ten runs (3% of the median), so a
single observation on this package is representative at that scale. The
values are the native per-run intervals; no arithmetic is performed across
overlapping phases. This is one package on one host and does not generalize
to the root MechanicalWorkflows gate (about 13 s, dominated by its TypeScript
build and test step).

### SDK glue: dispatch to `operation.started`, five samples

Same scratch package, one fresh `ServerConnection.spawn("forge")` per sample,
`initialize()` then one `gate.run`; the first `operation.started` notification
stamps the glue interval:

| interval | min ms | median ms | max ms |
| --- | --- | --- | --- |
| dispatch → `operation.started` | 28 | 28 | 33 |
| spawn + `initialize` | 1531 | 1581 | 1640 |

All five gates PASS with distinct operation ids (recorded under `sdkGlue` in
the distribution evidence file). The glue interval is below 1% of the gate's
elapsed interval; the spawn-plus-initialize cost is the App Server start and is
paid once per connection, which is why the rig keeps one connection per gate
rather than one per request.

## Furnace supervision intervals under the process host (four real Runs)

Measured from Furnace's own timestamps (run `created_at` / `state_since`, attempt
`created_at` / `started_at` / `finished_at`) for the four process-host Runs in
`integration/evidence/2026-10-15-furnace-process-host.json`, `execution.poll_interval`
at its 2 s default:

| interval | min ms | max ms | what it contains |
| --- | --- | --- | --- |
| run created → Attempt created | 1559 | 1601 | formula instantiation in Beads, the first readiness poll (`bd mol current`) and the claim |
| Attempt created → executor started | 1 | 1 | process spawn hand-off |
| executor exit → Run final state | 100 | 645 | exit observed, Work closed on exit 0 (the two 600 ms-class rows are the closes), Run state written |

Attempt durations are the executors' own (gate 8548 ms including the SDK's
spawn+initialize, FAIL 2187 ms, misconfigured binary 80 ms, full `developLive`
34 340 ms) and are not Furnace overhead. Evidence:
`integration/evidence/2026-10-15-furnace-supervision-intervals.json`. This is the
"polling" axis of MW-056 measured natively; SDK-driven polling stays out of reach
until `@furnace/sdk` builds (fvh), and these rows are one host and one Beads store.
