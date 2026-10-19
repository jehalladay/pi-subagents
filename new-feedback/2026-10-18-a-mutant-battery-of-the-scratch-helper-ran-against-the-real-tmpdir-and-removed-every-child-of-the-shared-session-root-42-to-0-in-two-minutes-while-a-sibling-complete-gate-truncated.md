# A mutant battery of the scratch helper ran against the real TMPDIR and removed every child of the shared session root, 42 to 0 in two minutes, while a sibling complete gate truncated, so the scratch-helper rule covered cuts but not the harnesses that test sweepers

**From:** Pi-Subagents Orchestration Engineer, seat flywheel (bead-machine orchestrator, 3 lanes, gate seats under Furnace supervision)
**Date:** 2026-10-18
**pi-subagents revision:** `07cc484` (`workbench/implementation-program` trunk at fold time); the wb-gbu branch in flight on seat ws-01, not landed, so the defect lives in a candidate's test harness, not on trunk
**Method:** flywheel ledger row 6326 (`kind: machine-defect`, self-disclosed by seat ws-01 at 07:52:35Z, quoted below); `ls -la /tmp/pi-subagents-27639525` at 08:03Z; the two wb-feo complete-gate envelopes (`cmd_e83f3ad4e2e1` 07:51:21Z, re-run 08:07Z); the owner's addendum landed as ledger hop `07cc484`
**Scope:** the gap between the scratch-helper rule (cuts use the helper, never raw `mkdtemp`) and test harnesses that exercise the helper's sweep against the real root; a re-check of `2026-10-17-positive-the-scratch-helper-rule-and-its-gate-refusals-removed-the-raw-mkdtemp-class-from-new-cuts-in-3-refusals-with-the-trunk-cleanup-bead-in-flight.md`. Not the host's inode exhaustion (a third producer; recorded in the machine's BOUNDARY).

## Summary

While cutting wb-gbu (the scratch self-sweep and janitor), seat ws-01 ran a mutant battery of the
scratch helper with the host's real `TMPDIR`. Mutant M4 is the exit sweep with its owned-key filter
removed; three vitest forks ran it through `test/scratch-helper.test.ts`,
`test/scratch-janitor.test.ts` and `test/scratch-killed-run.test.ts`, and each fork's exit sweep
removed every child of the shared session root `/tmp/pi-subagents-27639525`: 42 children at
07:48Z, 0 at 07:51Z. A complete gate of another bead (wb-feo) was running on the same host and its
test step terminated at 270,294 ms two minutes later. The seat disclosed the defect itself, with
counts, in a typed ledger row within three minutes. The 10-17 positive file praised the
scratch-helper rule for closing the raw-`mkdtemp` class in cuts; this file records that the rule
did not reach the harnesses that test the sweeper, and that the owner has since bound the cure as a
requirement on the bead (ledger hop `07cc484`). Re-check verdict on the 10-17 file: CHANGED (the
positive holds for cuts; the class has a second door).

## Finding 1 — CONFIRMED: the shared root was emptied by a test run

Ledger row 6326, quoted (first 900 bytes as read):

```
{"kind":"machine-defect","bead":"wb-gbu","seat":"ws-01","detail":"SELF-DISCLOSED (ws-01, wb-gbu, run g7-work-s2): one mutant run of this bead's scratch helper deleted every child of the SHARED session scratch root /tmp/pi-subagents-27639525. Measured: 42 children at 07:48Z (7 older than 24 h, among them \"tmp\" 68 h and \"workplace-jehallad-pi-gates-owner-syh\" 27 h, plus five flywheel-worktree-keyed trees 25-26 h; 35 fresher), 0 children at 07:51Z. Cause: mutant M4 (the exit sweep with its owned-key filter removed, so it removes every session tree under the root) ran test/scratch-helper.test.ts, test/scratch-janitor.test.ts and test/scratch-killed-run.test.ts with the host's real TMPDIR, and each of the 3 vitest forks' exit sweeps (07:49:56.5Z-07:49:58Z) removed all of the real root's children. The cured helper does not do this: its exit sweep removes only trees keyed by its own pr
```

At 08:03Z the root held one child again, the wb-gbu worktree's own tree.

## Finding 2 — PLAUSIBLE: a sibling gate lost its run to the sweep

The wb-feo complete gate (`cmd_e83f3ad4e2e1`, gate seat on another lane) had passed lint, typing
and build and was 4.5 minutes into its test step when the sweeps ran; the step terminated at
270,294 ms and the envelope (07:51:21Z) read `COULD_NOT_JUDGE` / `FORGE_VERDICT_RUN_TRUNCATED`
with no filesystem-fault text. The same gate re-run at 08:07Z passed 7 of 7 with the test step at
124,426 ms. The host also exhausted `/tmp` inodes in the same window (a third producer's leak),
so the envelope alone cannot apportion the cause; the timing fits both. The machine treated the
run as a machine fault, not the bead's red.

## Finding 3 — CONFIRMED: the rule's reach ended at cuts

The 10-17 positive counted 3 gate refusals that removed raw `mkdtemp` from new cuts. The gate's
check reads the candidate's test and source files for raw scratch calls; it does not ask how a
harness that *tests* the sweeper confines the sweeper. A mutant whose whole point is "remove the
filter" is the one input that a real root cannot survive. The owner's addendum (hop `07cc484`,
ledger-only): every sweep/janitor test and mutant battery runs against a private per-test TMPDIR
root, never the real session root, with a red-first isolation row (a sentinel planted outside the
private root survives every mutant, M4 included); the owned-key filter is necessary but not
sufficient.

## Fixes, cheapest first

1. The bound requirement above, verified at the gate (the gate seat checks that the harness pins
   `TMPDIR` before any sweep test runs and that the sentinel row exists and is red-first).
2. A vitest setup file for the whole `test/` tree that sets `process.env.TMPDIR` (and `TMP`,
   `TEMP`) to a per-worker private directory before any test module loads, so no suite can reach the
   real root even if a future harness forgets.
3. The janitor refusing to remove any tree whose key is not in its own manifest, with the refusal
   counted in the census row, so a filter-less mutant is caught by the product and not only by the
   test.

## Positives worth protecting

- **Self-disclosure as a typed row.** The seat wrote `kind: machine-defect` with the exact counts,
  times, cause and the cured behaviour three minutes after the event, before anyone asked. The
  orchestrator and the owner both acted from that row. Keep the row kind, keep the habit.
- **The 10-17 positive still holds for cuts:** 0 raw-`mkdtemp` cuts reached a gate in this window.
- **The owner bound the cure as a bead requirement within 20 minutes** and relayed it as a
  ledger-only hop, so the rule travels with the bead instead of living in a chat.

## What was not established

- Which of the 35 fresher children belonged to live processes at 07:49Z (the wb-feo gate's
  vitest scratch among them is inferred from timing, not from a path).
- Whether the production janitor on the wb-gbu branch at the time of filing already carries the
  manifest refusal in fix 3.

## Prior art

`new-feedback/` at `07cc484` holds 3 files; the 10-17 scratch-helper positive is re-checked here.
No file names a test harness or a mutant battery.
