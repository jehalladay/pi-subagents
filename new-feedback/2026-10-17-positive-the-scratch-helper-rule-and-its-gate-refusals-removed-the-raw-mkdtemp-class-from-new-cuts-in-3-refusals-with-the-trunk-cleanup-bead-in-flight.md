# Positive: the scratch-helper rule and its gate refusals removed the raw-mkdtemp class from new cuts in 3 refusals, with the trunk cleanup bead in flight

- **From:** flywheel (Pi-Subagents Orchestration Engineer seat, bead-machine orchestrator)
- **Date:** 2026-10-17
- **Revision:** pi-subagents `workbench/implementation-program` at 76b597e (window end); `master` at 38034a0.
- **Method:** machine gate records since the rule landed (owner program rule 2026-10-15T16:08Z; reading settled 2026-10-17T04:25:33Z on verdict row 402): refusal rows 402, 405 and 408, the standing-rules text seats receive, and the cleanup bead's dispatch record (wb-e37, run g5-work-r48, in flight at filing time).
- **Scope:** the workbench program's test-scratch convention (compose `test/helpers/scratch.ts` or `test/helpers/non-repo-scratch.ts`; raw `mkdtempSync`/`tmpdir` under `test/` or `qa/` refused at gate) as an operating experience. Not about any single bead.

## Summary

A convention plus an enforcement point closed a defect class within two days. The rule (every new test scratch allocation composes the guarded helpers with the leak guard installed) entered the standing seat rules on 2026-10-15; gates refused exactly 3 candidate cuts for raw allocations (verdict rows 402, 405, 408); the refused beads respun onto the helpers and passed; and since row 408 no new cut in this machine's records has carried a raw allocation. The residue — raw sites already landed on trunk — was carved into one bead (wb-e37, six named sites plus the qa leg), explicitly excluded from every other cut's scope ("trunk-landed raw sites belong to wb-e37, never to your cut"), and dispatched in this window.

## Finding 1 (CONFIRMED, positive): rule + gate refusal + named-residue bead is a complete migration shape

- The three parts matter together: the rule tells seats what to write, the gate refusal makes violations cheap to catch (statement-level, before landing), and the residue bead stops every other cut from "helpfully" migrating trunk sites out of scope. 3 refusals, 0 recurrences after row 408, 1 cleanup bead: that is the whole cost ledger.
- The settled reading on row 402 ("raw-mkdtemp shapes landed earlier are a MISS, not a precedent") is the piece worth protecting hardest: it prevents landed counterexamples from dissolving the rule.

## Positives worth protecting

- The leak guard installed at module scope in the helper (`installScratchLeakGuard`): refusals cited it as the behavioral teeth, not just a naming convention.
- The scope carve-out sentence in the standing rules naming wb-e37: single-owner residue migration with no scope creep in 24 h of 16-lane concurrency.
- `nonRepoScratch` as the sanctioned escape hatch for fixtures that must live outside any repository: having a named exception kept seats from inventing their own.

## What was not established

- wb-e37 had not delivered at filing time; whether the six trunk sites migrate cleanly is the one open leg.
- No claim about scratch behavior outside `test/` and `qa/`; the rule and this file cover those trees only.

## Delivery

Docs-only commit on branch `machine/flywheel/feedback-2026-10-17` for the program owner to land, per this directory's README (feedback writers do not push protected branches). No build or test gate ran for this file; gate waiver disclosed per standing operator direction.
