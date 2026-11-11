# Genuine rejected review and repair attempt

A separate read-only Claude Agent SDK reviewer rejected a deliberately
incorrect committed Python candidate, `8729e5785e7c07b19265b91d8cc90c03decef6c7`, whose
`add_one` returned `value - 1` against a task requiring `value + 1`.
The rejection was attributable to native review session
`43faca47-bd38-4e6b-bd8d-8097f6b750e2` on that exact clean commit.

The opt-in one-shot repair host ran a real agent but refused with
`REPAIR_SOURCE_CHANGE_NOT_ESTABLISHED`: the agent returned without a new
commit. A separate diagnostic agent call changed only the source file but
reported that branch policy blocked committing, leaving a dirty tree. The
host never re-reviewed or gated either incomplete effect. The source edit
was inspected manually, the scratch test acquired a missing return type,
and a full native Forge gate passed lint, typing, test, coverage and wheel.
Only **then** were those two scratch changes manually committed as
`eca779884c01d896f556143536cb30e21e5f284d`. A new read-only model
review of that clean repaired candidate returned `unknown`, not approval.

This establishes a genuine original rejection and a real source repair
attempt, with correct fail-closed boundaries. It does **not** establish an
automated reviewed repair, nor does the manually measured Forge PASS replace
the missing second review. No repair agent was retried after uncertain edits.
The full review/repair work package remains open.

## Chain completed with a separate structured review and one Forge gate

After the reviewer began requesting the Agent SDK's structured JSON output,
a new read-only review of the manually reconciled repaired commit
`eca779884c01d896f556143536cb30e21e5f284d` returned **approved** in review
session `c9c6a8f3-2b60-4705-ba29-4d8eb97f75d9`, distinct from the rejecting
session `43faca47-bd38-4e6b-bd8d-8097f6b750e2` on its parent `8729e578…`.
`verifyReviewedCandidate()` accepted that approval and ran exactly one native
Forge gate, operation `op-adb7b750d0254422811bb656f0652394`, which reported
PASS on a clean tree at the same commit.

Evidence: `evidence/2026-10-15-repair-chain-rejection.json`,
`evidence/2026-10-15-repair-chain-agent-edit.json`,
`evidence/2026-10-15-repair-chain-approval.json`,
`evidence/2026-10-15-repair-chain-admission.json`. The root Forge `evidence`
step checks that the rejection and approval come from different sessions,
that the approval names the repaired commit and not the rejected one, and
that the Forge operation was gated at that exact commit.

What this establishes: a real rejection, a real repair edit by the agent,
a real approval of the repaired commit by a separate session, and a native
Forge PASS bound to that commit. What it does **not** establish: an
unattended repair. The agent refused to commit on `main` (it asked for
branch permission), so the commit and the test's return annotation were
applied by hand after a full gate. Both agent prompts now authorize
committing on the current branch; a fresh unattended attempt is recorded
separately only if it completes.
