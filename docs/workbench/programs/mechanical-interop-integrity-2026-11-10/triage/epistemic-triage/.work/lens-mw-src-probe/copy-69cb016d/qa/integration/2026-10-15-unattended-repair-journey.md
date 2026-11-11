# Unattended rejected-review → repair → approval → Forge PASS journey

One fresh journey ran without manual intervention on a disposable copy of
the scratch Forge Python package, after the reviewer switched to structured
JSON output and both agent prompts authorized committing on the current
branch.

| Stage | Native identity | Result |
| --- | --- | --- |
| Original candidate | Git `735d480298a311b56b1db067eeb8208b059ed6e1` (`double` returned `value * 3`; test expects `double(2) == 4`) | committed, clean |
| Original review | Claude Agent SDK review session `3c61c3ca-9d7c-4e79-8f20-3decb58edd37` | **rejected** |
| Repair agent | Claude Agent SDK session `d0bcf2d4-1987-4973-9812-27dcf30cb4b5` | one commit `ce0657cb7437fb25f66b2dbf3449fdbeae55a83b`, parent `735d480…`, one source file changed |
| Re-review | review session `7a2d4014-d724-45a1-a3c7-af78d446ca91` | **approved** for `ce0657c…` |
| Forge gate | operation `op-c7a1b8c989d74ed08b6adf61f4bbb99d` | PASS at `ce0657c…`, clean tree |
| Library outcome | `repairRejectedCandidate` | `repaired_candidate` |

Evidence: `evidence/2026-10-15-unattended-repair-journey.json`. The root
Forge `evidence` step checks that the repair parent is the rejected commit,
that the approval and the gate name the repaired commit, and that the
rejection, repair and approval come from three distinct sessions.

## What this establishes

The opt-in repair host can take a genuinely rejected clean candidate through
one agent repair effect, a separate structured read-only review, and a
native Forge gate without a human reconciling the tree. The repaired commit
changed only the source module named in the task.

## What this does not establish

- The task was trivial and the package is a scratch fixture; this is one
  journey, not a success rate.
- The review verdicts are model observations bound to a session id; only the
  Forge operation is verification, and it verifies the scratch package's own
  gate.
- An earlier identical attempt stopped at `REVIEW_MODEL_UNDECIDED` before the
  verdict rules were tightened; a second earlier journey needed a manual
  reconciliation step (see `2026-10-15-rejected-review-repair.md`).
- No Beads claim, Furnace Run, HX scope or RF context was part of this run.
