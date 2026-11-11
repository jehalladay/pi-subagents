# GraphPolicy bead selection: live shadow and canary runs (2026-10-21)

`node apps/development-rig/dist/cli.js --select-bead` ran against the live MechanicalWorkflows Beads store
(`bd ready --json --limit 0`, 58–62 ready beads during the window) with GraphPolicyCLI `b68b777`
(`node <GraphPolicyCLI>/ts/dist/main.js`, dist rebuilt 06:57Z) and the committed `bead-scorer-v1` program/theta
(`graphpolicy.program.c1:170a6b39…`, `graphpolicy.checkpoint.c1:44b30bb1…`). Host load1 was 190–300 from the
sixteen-agent pool throughout.

| Stage | Native identity | Result |
| --- | --- | --- |
| Shadow draw, seed 7 | decision `sel:…` in `evidence/2026-10-21-gp-shadow-selection.json`; gp journal entry in the run's records dir | 58 ready / 58 support; gp drew `MechanicalWorkflows-hxfm` (log p −4.283); host resolved baseline `MechanicalWorkflows-6il`; receipt validates; completeness `depends_on coverage=7/15 partial`; gp 331 ms, run 2.0 s |
| Shadow overhead, seeds 11–20 | `evidence/2026-10-21-gp-shadow-overhead.jsonl` | 9/10 advised (gp p50 476 ms, p95 590 ms, p99 592 ms; wall p50 6606 ms, p95 28906 ms); seed 18 refused `BEADS_QUERY_UNESTABLISHED` (bd exited nonzero) |
| Canary draw with claim, seed 20261021 | `evidence/2026-10-21-gp-canary-selection.json`, journal `evidence/2026-10-21-gp-canary-journal.jsonl` (entries `dfad3ddf…` sampled-decision, `3ea6d8dc…` feedback) | support = `{93bl, 40a1, pa8u, u54e, rzih}` (the GPC mission beads, host allowlist); gp drew `MechanicalWorkflows-93bl` (p 0.371, log p −0.9925); resolved `graph-policy`; `bd update --claim` by actor `camshaft-coordinator` confirmed `in_progress`; pending source-verified feedback appended |

## What this establishes

A real machine step built a GraphDataIR snapshot from Beads' authoritative ready list, the real `gp` binary
evaluated the committed program and checkpoint and returned one draw with its exact behavior log probability, the
host admitted that draw through its own legal support, executed it through the existing native claim, and wrote a
validated `mw.decision-receipt.v1` sidecar plus a gp-journal feedback record whose status is `pending` until Beads
reports the bead closed or released. Fallback and refusal paths (`GP_REFUSED`, `BEADS_QUERY_UNESTABLISHED`) were
exercised live, not only in tests.

## What this does not establish

No improvement over the baseline (θ₀ is hand-set; one canary decision is not an experiment), no trained or promoted
checkpoint, no credit for shadow draws, no effect on the pool's own bead choice, and no claim about `gp` latency
beyond this host under this load. The canary record's `feedback.entry` is blank (a parsing defect fixed in the same
commit; the journal holds the digest).
