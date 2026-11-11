# Live Forge gate integration journey — 2026-10-15

First witnessed execution of the development rig's real Forge App Server gate path
(`--live-verify`, MW-058..MW-061). Fixture evidence played no part: every claim below is
backed by a native Forge operation recorded in `evidence/`.

## Producers and versions

| Producer | Identity |
| --- | --- |
| forge executable | 0.2.1, rev `0deb972720ce`, built 2026-10-14 (variant python-reference) |
| @forge/sdk | 0.1.0, built dist from `PrimaryInstallation/src/Forge/sdk/typescript` |
| Node | shell v24.20.0; package pin 22.23.2 via mise |
| Subject package | `/tmp/mw-live-pkg`, standalone python Forge package, full gate (lint, typing, test, coverage, wheel), `preset = "full"` |
| Rig | this repository, the commit introducing this report |

## Journeys executed

| Journey | Subject basis | Native operation | Rig verdict | Exit |
| --- | --- | --- | --- | --- |
| First PASS attempt (pre-fix) | `7add61ab` | `op-5ca890b7e0cc462d99d1f2e515326475` | `indeterminate` / `FORGE_GATED_COMMIT_MISSING_OR_MISMATCHED` | 3 |
| PASS (post-fix) | `03a0fa58` | `op-2d1ab467653d4b34a3c9f4a68193ae0c` | `passed` / `FORGE_GATE_PASS` | 0 |
| Dirty workspace | n/a (refused pre-SDK) | none | refused `WORKSPACE_NOT_CLEAN` | 2 |
| Native FAIL (committed red test) | red clone HEAD | `op-29e737dde4d3497ca3bac6ebafd2140b` | `failed` / `FORGE_GATE_FAIL` | 1 |

Native windows: PASS 2026-10-15T01:48:14.011029+00:00 .. 2026-10-15T01:48:18.632011+00:00; FAIL 2026-10-15T01:48:20.824631+00:00 .. 2026-10-15T01:48:21.828160+00:00.
FAIL shape observed: `forge_result.status=error`, `data.gate_verdict=FAIL`, `envelope.disposition=FAILED`.
PASS shape observed: `status=success`, `gate_verdict=PASS`, `disposition=SUCCEEDED`, `terminal_fact=completed`,
`data.verification.complete=true` over all five declared units.

## Upstream finding (filed to Forge)

The app-server `gate.run` result returns `envelope.gated_commit` and `envelope.gated_tree`
as **null** (and `data.gated_commit`/`data.gated_tree` null), while the CLI `forge build`
envelope on the same package populates them. The commit is natively carried only by the
envelope-named run record (`envelope.evidence_ref`, a file under the package's
`.forge/state/runs/`, field `revision`) and the tree by `data.source_tree`. The rig's
first run therefore correctly refused to attribute the PASS (row one above). The
classifier was then extended, test-first, to accept the documented native carriers with
strict precedence and an in-root containment check on `evidence_ref`
(`apps/development-rig/src/live-gate.ts`, `resolveCandidatePin`). Negative controls:
record/commit disagreement, tree disagreement, record outside the package root, missing
record — all remain `indeterminate` (`apps/development-rig/test/live-gate.test.ts`).

## Claims established

- MW-058: real gate path separate from fixture, witnessed end-to-end.
- MW-059: clean committed basis enforced before (dirty refusal, exit 2) and after
  (unchanged commit/tree re-check) the gate.
- MW-060: native status, gate verdict, disposition, candidate pin and terminal fact all
  agree before PASS is claimed; disagreement demonstrated live (first run) and refused.
- Native FAIL maps to a domain failure (exit 1), distinct from transport failure.

## Claims NOT established

- MW-061 (ambiguous dispatch / lost response): no transport failure occurred live; only
  unit-level evidence exists.
- MW-063: Furnace-hosted execution — see the Furnace section below when present.
- Cache/replay verdict distinctions, incremental selection, `--require-complete`
  refusal shapes: not exercised.
- No performance baseline beyond the native windows above.

## Evidence files

- `evidence/2026-10-15-live-verify-first-indeterminate.json`
- `evidence/2026-10-15-live-verify-pass.json`
- `evidence/2026-10-15-live-verify-fail.json`
