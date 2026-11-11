# 16 — GraphPolicy bead selection: shadow and canary work selection in the rig

**Status 2026-10-21: a bounded, witnessed vertical slice.** The development rig's `--select-bead` command is a
host-owned work-selection step that may consult the real GraphPolicyCLI binary (`gp`) for advice over a legal
support the host enumerates first. Beads keeps readiness (`bd ready`) and claims (`bd update --claim`); the host
keeps the resolution rule and every fallback; `gp` only scores and draws. Nothing here is an orchestrator, no
GraphPolicy numerics are copied into this repository, and no learned score can override a claim, a dependency,
a resource limit or a verifier. This page records what runs, what it writes, what was witnessed and what is not
established. The design program it serves is [graph-policy-coordination-2026-10-18](programs/graph-policy-coordination-2026-10-18.md).

## Authority boundary

| Decision | Owner | Mechanism |
| --- | --- | --- |
| Which beads are ready | Beads | one native `bd --readonly --directory <store> ready --json --limit 0`; the exact bytes are digested (`readyDigest`) |
| Which ready beads are legal candidates (pre-sampling support) | host | `legalSupport`: status `open` ∩ optional `--support` allowlist ∩ optional `--types`, in native ready order |
| Observation | host adapter | `buildBeadSnapshot` projects the ready list into a GraphDataIR snapshot (`graphpolicy.data.v1`) |
| Scores and one draw with its log probability | GraphPolicyCLI | `gp sample --program --theta --checkpoint --graph --candidates --seed --port --temperature --journal --json` |
| Resolution | host | off/shadow → deterministic baseline; canary → gp's choice iff inside the support, else baseline with a named reason |
| Effect | Beads | `claimBeadsWork` (`bd update --claim`, then authoritative `show`) only with `--claim` |
| Outcome credit | Beads → gp journal | `--gp-reconcile` reads `bd show` and appends the resolved scalar only for a closed or released bead, as `gp feedback add --supersedes <pending root entry>` (reason `evidence-revised`), never a second root, then one `gp journal append --kind effect-outcome-reference` joined to the recorded host-admission digest |

## Command surface (`apps/development-rig/src/select-bead-cli.ts`)

```
node apps/development-rig/dist/cli.js --select-bead --beads-directory <store>
  [--gp-mode off|shadow|canary] [--gp-config FILE] [--gp-entry <GraphPolicyCLI>/ts/dist/main.js] [--records DIR]
  [--support id,id,...] [--types task,bug] [--seed N] [--claim]
node apps/development-rig/dist/cli.js --gp-reconcile --beads-directory <store> --records DIR --gp-config FILE --gp-entry FILE
```

`MW_GP_MODE`, `MW_GP_CONFIG`, `MW_GP_ENTRY` and `MW_GP_RECORDS` are the environment fallbacks; flags win. The mode
defaults to `off`. Outside `off` the config, the gp entry and a records directory are required (`GP_CONFIG_REQUIRED`,
`GP_ENTRY_REQUIRED`, `GP_RECORDS_REQUIRED`); an unknown mode is `GP_MODE_INVALID`. Exit 0: a bead was resolved (and
claimed when asked); 1: the claim was refused or uncertain (`BEADS_CLAIM_*`); 3: no legal candidate; 2: a refusal
(stderr `{status:"refused", reason}`), including `BEADS_QUERY_UNESTABLISHED` when `bd ready` fails.

The config (`mw.graph-policy-config.v1`, `apps/development-rig/graph-policy/bead-scorer-v1/config.json`) names the
program, theta, the `graphpolicy.checkpoint.c1` digest gp must re-derive from theta, the schema document, the
output port, the candidate type, the softmax temperature and the wall-clock bound; relative paths resolve against the
config directory and the exact program/theta bytes are digested into the receipt (`loadGpConfig`).

## Modes and fallback vocabulary

- `off`: no gp process; the baseline (`priority-then-oldest-then-id`) is resolved and, with `--records`, recorded.
- `shadow`: gp draws over the host support and its advice is recorded; the baseline is still what the host resolves.
- `canary`: gp's drawn bead is resolved when it lies in the support; otherwise the baseline is resolved as
  `host-fallback` with the reason. Reasons are closed: `GP_ABSENT` (entry cannot be spawned), `GP_TIMEOUT`,
  `GP_REFUSED` (gp exited nonzero; its own error code is carried verbatim, e.g. `GP_E_INVALID_CANDIDATE`),
  `GP_RESPONSE_MALFORMED`, `GP_SUPPORT_EMPTY` (gp is never consulted) and `GP_CHOICE_OUTSIDE_SUPPORT`.
- There is no `adaptive` mode: the only learning loop that exists is the feedback path below.

## Records

Every run with `--records DIR` writes `DIR/selections/<decisionId>.json` (the full `mw.bead-selection.v1` record) and
appends one `mw.decision-experience.v1` row to `DIR/experience.jsonl`; gp appends its own `graphpolicy.journal.v1`
entries to `DIR/gp-journal.jsonl` (`sampled-decision` per draw, `feedback` per credit). The selection embeds the
`mw.decision-receipt.v1` sidecar (`packages/coordination/schema/decision-receipt.v1.schema.json`), validated before it
is written (`GP_RECEIPT_INVALID` otherwise):

- `gp.graphHash` is the sha256 of the snapshot bytes handed to gp (gp reports the same value as `graph_digest`);
  `gp.programHash` and `gp.checkpointHash` are the sha256 of the exact program and theta bytes; `gp.snapshotHash` is
  the sha256 of the native ready bytes. gp's own `graphpolicy.program.c1` / `graphpolicy.checkpoint.c1` identities are
  carried verbatim in `advice.identities` and `advice.gp`.
- `support` is the pre-sampling legal support; `actions.proposed` is gp's draw (or the baseline when gp gave no
  advice), `actions.admitted` the resolved bead, `actions.executed` the literal `unknown` (the claim is reported in
  the surrounding record, not fabricated into the receipt).
- `logProb` is the exact binary32 log probability gp recorded for a gp-resolved choice; a deterministic host
  resolution carries `0` (probability one under its own rule). No propensity is invented for a shadow draw that was
  never executed: the experience row's `propensity` is the receipt's value and the gp draw is kept separately.
- `feedback.status` is `pending` only when a gp-drawn bead was actually claimed and a pending feedback record was
  appended to gp's journal; otherwise `unknown`.
- The host's admission of every journaled gp draw is written back into gp's own journal through
  `gp journal append --kind host-admission --record @FILE --journal FILE` (GraphPolicyCLI main `a173f611`, commit
  `34be43b8fca6`, IMPL-10211, GPR-1173; ratification status at that sha: pending triage ratification). The
  record body is the doc-09 host-admission record `{kind: "host-admission", decisionDigest: ENTRY, status, host}` with
  `host` the provenance link, and gp admits it through its library writer `admitDecision` (the ruling gpc-1ly.6.18/Q12
  keeps that writer off any other CLI verb). The route is capability-gated: the host reads `capabilities.commands` from the
  envelope of the very draw it admits, and only a gp whose list contains `journal append` is spawned for the write. When
  the verb is absent the host spawns nothing and records the admission as failed with `GP_UNSUPPORTED` (`verb absent from
  capabilities.commands`); `GP_REFUSED` keeps its meaning of a spawned gp exiting nonzero, with gp's own error code carried
  verbatim. `admitted` when the host resolved the draw (canary), `denied` when it kept the baseline (shadow, or a canary
  fallback for an out-of-support draw). The result is reported as `admission` beside `claim`/`feedback`; a failure is
  recorded once and never retried, and no local substitute for gp's journal exists. The earlier branch verb
  `gp admission add` (proposal branch `coordinator/admission-add` on github.com/jehalladay/GraphPolicyCLI, never on
  GraphPolicyCLI main) is retired as a host route (seat ruling 2026-10-21 12:34Z on MechanicalWorkflows-u54e): the branch stays
  GraphPolicyCLI's proposal artifact and is no longer a dependency of this host. If GraphPolicyCLI rejects GPR-1173 the host
  returns to refuse-only (`GP_UNSUPPORTED`) and the branch verb does not come back; re-stamp the ratification status here when
  GraphPolicyCLI ratifies or rejects it. The canary decision above was admitted afterwards by hand with the branch verb
  (`qa/integration/evidence/2026-10-21-gp-canary-admission.json`, admission digest `ff6bc37f…`, journal length 3:
  sampled-decision, feedback, host-admission — `…-gp-canary-journal-admitted.jsonl`); that evidence predates this route and
  stays as history.
- Before every journaled draw the host appends the observation gp samples over with
  `gp journal append --kind observation --record @FILE --journal FILE`: the doc-09 record `{kind: "observation",
  schemaDigest, snapshotDigest, provenance}` where `schemaDigest` is the bead graph schema digest and `snapshotDigest` the
  digest over the exact `snapshot.json` bytes handed to `gp sample` (both bare 64-hex digits) and `provenance` the
  `{adapter, revision, scope, ref}` link (`ref` is `mw:bead-snapshot/<snapshotDigest>`). This is the entry
  `gp experience materialize` joins each decision to (`GP_EXPERIENCE_JOIN_SOURCE_UNBOUND` without it). The draw runs with
  `--store DIR --store-receipt` (`DIR` is `<records>/gp-store`), so gp writes the decision receipt write-once where
  `gp train` reads it (`GP_TRAIN_RECEIPT_MISSING` without it); a draw whose envelope lacks `result.receipt_store.blob`
  is `GP_RESPONSE_MALFORMED`. The snapshot's `observation.revision_order` `{attested_by, ordinal, covers}` carries the
  host's attestation (ordinal: the count of experience rows already recorded in `--records`, plus one; `covers`: every
  revision the snapshot carries), which `gp train` needs to order observations (`GP_TRAIN_OBSERVATION_ORDER_UNVERIFIABLE`
  without it). The host refuses the draw instead of sampling blind: an observation gp does not journal is advice reason
  `GP_OBSERVATION_MISSING` (gp is never asked to sample; canary falls back to the baseline) and a journaled draw with no
  store directory is `GP_STORE_REQUIRED`. The append is not capability-gated because the capability list arrives with the
  draw that follows it; it is recorded once and never retried. Effect-outcome and feedback supersession remain
  MechanicalWorkflows-xhi2z.2 and .3.

## Observation (`apps/development-rig/src/graph-policy-snapshot.ts`)

Entities are the ready beads (`kind: bead`) with six scalar slots — `priority`, `dependency_count`,
`dependent_count`, `age_days` (from `created_at` and the host's read instant, never a clock read inside the
projection), `is_task`, `comment_count` — each `known` or the explicit `unknown`; a value Beads did not report is
never written as 0. Relations are `depends_on` edges (roles `dependent`/`prerequisite`, feature `blocks`) kept only
when both ends are in the ready set; `observation.completeness.depends_on` declares the kept/total coverage and
`complete: false` when edges were dropped. `observation.revisions[0]` is `bd-ready:<readyDigest>`;
`observation.scope` is `beads://<store>#ready`. The candidate set `beads` is exactly the host support in support
order. The schema document gp reads (`schema.json`) is pinned to the TypeScript constant and its digest by
`test/graph-policy-snapshot.test.ts`; a support member outside the ready set is `GP_SUPPORT_OUTSIDE_SNAPSHOT`.

## Program and checkpoint (`apps/development-rig/graph-policy/bead-scorer-v1/`)

`program.json` (`graphpolicy.function.v1`, id `mw-bead-scorer-v1`, program identity
`graphpolicy.program.c1:170a6b39…`) reads the six slots with missingness masks, applies one dense+ReLU layer, one
`depends_on` message-passing round (gather → message → reduce → update) and scores the `beads` candidate set on the
`beadScore` port. `theta.json` is a hand-set, interpretable θ₀: pass-through hidden units and final weights
−0.6·priority −0.15·dependency_count +0.5·dependent_count +0.05·age_days +0.3·is_task; the message weights are zero,
so the graph structure is present but unlearned. Its checkpoint identity
(`graphpolicy.checkpoint.c1:44b30bb1…`) was derived by gp itself (`gp inspect checkpoint` over the
`graphpolicy.checkpoint.v1` cells document) and gp refuses any theta that does not re-derive it
(`GP_CLI_CHECKPOINT_MISMATCH`).

## Witnessed runs (2026-10-21, live MechanicalWorkflows store, pool load1 ≈ 190–300)

| Run | Evidence | Result |
| --- | --- | --- |
| shadow, seed 7, 58 ready / 58 support | `qa/integration/evidence/2026-10-21-gp-shadow-selection.json` | gp drew `MechanicalWorkflows-hxfm` (log p = −4.283, 57 near-equal scores at T=1); host resolved the baseline `MechanicalWorkflows-6il`; receipt valid; 7/15 `depends_on` edges kept (partial, declared); gp 331 ms inside a 2.0 s run |
| shadow overhead, seeds 11–20 | `qa/integration/evidence/2026-10-21-gp-shadow-overhead.jsonl` | 9 of 10 runs advised: gp p50 476 ms, p95 590 ms, p99 592 ms; whole-run wall p50 6.6 s, p95 28.9 s, dominated by `bd ready` under pool contention; seed 18 refused with `BEADS_QUERY_UNESTABLISHED` (bd exited nonzero under the 30 s bound) — recorded, not retried |
| canary with `--claim`, support = the five GPC mission beads | `qa/integration/evidence/2026-10-21-gp-canary-selection.json`, `…-gp-canary-journal.jsonl` | gp drew `MechanicalWorkflows-93bl` (p = 0.371, log p = −0.9925) over `{93bl, 40a1, pa8u, u54e, rzih}`; host resolved `graph-policy`; native claim succeeded (`in_progress`, actor `camshaft-coordinator`); gp journal holds the `sampled-decision` entry and one `pending` source-verified feedback record (length 2, chain intact per `gp inspect journal`) |

`gp` ran as `node <GraphPolicyCLI>/ts/dist/main.js` at GraphPolicyCLI `b68b777` (dist rebuilt 2026-10-21 06:57Z).
The canary record's `feedback.entry` is empty because the first build read a wrong key from gp's
`feedback add` result; the journal carries the real feedback digest (`3ea6d8dc…`) and the parser now reads
`feedback_digest` (pinned by `test/graph-policy-cli.test.ts`).

## Learning loop status

Delayed credit exists as a path, not as training: a gp-drawn, claimed bead carries a `pending` feedback record;
`--gp-reconcile` resolves it from Beads' authoritative state (`closed` → scalar 1, `open` and unassigned → scalar 0,
otherwise still pending) through `gp feedback add` with label class `source-verified`. Witnessed 2026-10-21 08:22Z:
the canary's bead `MechanicalWorkflows-93bl` was closed when slice 1 landed, one native `bd show` reported
`closed`, and `--gp-reconcile` appended the resolved record (scalar `3f800000` = 1.0, entry `003ba082…`) to the same
gp journal, now four entries long — sampled-decision, pending feedback, host-admission, resolved feedback — with the
chain intact (`qa/integration/evidence/2026-10-21-gp-reconcile.json`, `…-gp-canary-journal-resolved.jsonl`). One
credited decision is a witness of the loop, not a training set. Since `MechanicalWorkflows-xhi2z.2` the resolved value is a correction, not a second root: `--gp-reconcile` reads the pending root entry that selection stored in `selections/<decisionId>.json`, calls `gp feedback add --supersedes <that entry>` with `reason: evidence-revised` and the same label class and evidence shape, and records `{status, scalar, entry, supersedes, admission, effectOutcome}` in `feedback-state.json`; a pending decision whose record holds no stored root entry is reported as `GP_FEEDBACK_ROOT_MISSING` and nothing is appended. Since `MechanicalWorkflows-xhi2z.3` each resolved decision also gets exactly one `gp journal append --kind effect-outcome-reference` record `{admissionDigest, outcome, effect}` (closed becomes `succeeded`, released becomes `failed`, pending writes none) whose `admissionDigest` is the `admission.digest` that selection stored; a decision whose record holds no admission digest is reported as `GP_ADMISSION_DIGEST_MISSING` and nothing is appended, and a refused effect append is disclosed in the result as `effectOutcome.failed` and not retried. No checkpoint has been trained, promoted or compared
on outcomes; θ₀ is hand-set; shadow draws are not credited (they were not executed).
The replay-and-search experiment, the reconcile witness and the GraphPolicyCLI admission-write extension are open
beads `MechanicalWorkflows-40a1`, `-rzih` and `-u54e`.

## Replay experiment (2026-10-21): what the machine actually chose, scored through gp

`--gp-replay --history FILE --gp-config F --gp-entry E --out DIR [--split ISO] [--thetas K] [--seed N] [--scale S]`
(`apps/development-rig/src/graph-policy-replay-cli.ts`) rebuilds every real past work-selection decision from an
exported Beads history (`bd list --all --json --limit 0`, 680 issues): each `started_at` is one claim, and the
candidates at that instant are the beads created, unclaimed, unclosed and unblocked then, with features as of the
instant (dependency counts from edge creation times, age from creation; comment counts stay unknown). Contexts are
split by time (train before `--split`, test from it on) and every arm is scored on every context through ONE
`gp rpc --stdio` session (`graph-policy-rpc.ts`: hello, `compile` for the program identity, one `evaluate` per
context and arm). Arms: θ₀, sixteen single-unit probes (±one final-layer cell, everything else θ₀), K seeded Gaussian
perturbations of θ₀, and the host's deterministic rules as baselines. Metrics are top-1 hit (ties share credit),
mean reciprocal rank and, for probabilistic arms, the mean log-softmax of the chosen bead over gp's scores. The best
arm is selected on the TRAIN split only by mean log-likelihood; the test split is reported, never used for selection.
The run writes `report.json`, `best-theta.json` and the best theta's `graphpolicy.checkpoint.v1` document bound to
gp's compiled program identity; promotion is a separate explicit act.

Witnessed 2026-10-21 (`qa/integration/evidence/2026-10-21-gp-replay-report.json`, split 2026-10-20T00:00Z, 60
perturbations at scale 3, seed 2; 567 contexts = 395 train / 172 test; mean support 22 train / 95 test; 43,659 gp
evaluations in 231 s wall, 89 s gp-reported, ≈5 ms per evaluation end to end):

| Arm | train top-1 / MRR | test top-1 / MRR | note |
| --- | --- | --- | --- |
| baseline newest-first | 0.626 / 0.700 | 0.215 / 0.324 | the pool and the human claim what was just created |
| probe `theta-unit3-` (score = −age through gp) | 0.607 / 0.675 | 0.214 / 0.319 | reproduces the recency rule through the whole GraphDataIR → gp path (ages rounded to 10⁻³ days) |
| probe `theta-unit0+` (score = +priority number) | 0.570 / 0.622 | 0.001 / 0.029 | a train-period artifact the temporal split exposes |
| selected `theta-seed2032` (best train log-likelihood −1.58) | 0.492 / 0.630 | 0.048 / 0.209 | test log-likelihood −4.02 vs θ₀ −12.86 and uniform −4.52 |
| θ₀ (the live hand-set theta) | 0.013 / 0.181 | 0.000 / 0.020 | anti-correlated with what was actually chosen |
| baseline uniform | 0.145 / 0.243 | 0.011 / 0.022 | expected random |

What this establishes: the gp program expresses the dominant historical rule exactly (the recency probe tracks the
newest-first baseline within 0.02 top-1 on both splits), the temporal split catches a spurious train-only winner,
and a seeded random search through the real `gp` improves imitation log-likelihood over θ₀ three-fold while selecting
on train alone. What it does not establish: any arm better than the trivial newest-first rule on held-out data, so
nothing was promoted into the live config. The selected candidate was identified by gp
(`gp inspect checkpoint` → `graphpolicy.checkpoint.c1:a5cb1d3a…`), re-evaluated under that identity, and promoted
only to the alias `bead-scorer-replay-candidate` in the experiment's own alias store
(`qa/integration/evidence/2026-10-21-gp-replay-promotion.json`; `gp promote … --expected-active none`, revision 1).
Imitating historical choice is not the mission's reward: it is the Phase-B supervised baseline that the verified-outcome
credit path above will have to beat.

## Hazards observed

- Beads under pool contention: `bd ready --json --limit 0` took 4–30 s and failed once in eleven runs; `bd show`
  took 44 s once. The host therefore reads the ready list once and never fans out per-bead `show` calls at decision
  time; reconcile does one `show` per pending decision.
- gp appends its journal under the records directory, which must exist before the first draw (the first live run
  abstained with `GP_CLI_INTERNAL` until the host created it).
- gp's `--version` line does not enumerate the implemented verbs; a stale M0a `dist` refuses `sample` with exit 2,
  which the host records as `GP_REFUSED` and falls back.

## Not established

No learned improvement over the baseline, no experiment on concurrency, routing, retry or verification allocation,
no Furnace or pool integration, no training. The canary influenced one real decision (which mission bead this
coordinator claimed next) through the host's legal boundary with a receipt; that is the whole claim.
