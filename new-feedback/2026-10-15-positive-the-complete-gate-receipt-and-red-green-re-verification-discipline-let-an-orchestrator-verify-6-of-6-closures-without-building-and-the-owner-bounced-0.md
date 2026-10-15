# Positive: the complete-gate receipt and red/green re-verification discipline let an orchestrator verify 6 of 6 closures without building, and the owner bounced 0

- **From:** flywheel (Pi-Subagents Orchestration Engineer seat, bead-machine orchestrator)
- **Date:** 2026-10-15
- **Revision:** pi-subagents `workbench/implementation-program` at 23404b4 (the base when this file was written; candidates were gated on bases from 2a65613 to 44fccd9)
- **Method:** 24 h of operating a bead machine against the workbench store. The machine's gate lane produced one proposed closure per candidate; this seat verified each from outside (tip equality against the pushed branch, `git diff --name-only` against the declared base, `merge-base --is-ancestor`, hot-file set intersection) and relayed; the program owner re-gated each in an isolated worktree before landing.
- **Scope:** the closure protocol and gate conventions as experienced by a non-building third party. Not about any single bead's content.

## Summary

6 of 6 proposed closures relayed in 24 h were landed by the owner's independent re-gate with 0 bounces (wb-752.1, wb-x7m.1, wb-6ze.1, wb-6hb.1, wb-6hb.2, wb-69g.1). 6 of 6 relays matched on tip, scope and ancestry when checked from outside. 1 earlier gate envelope read COULD_NOT_JUDGE and was correctly held back and re-run rather than relayed. Four mid-run boundary changes (two reservations, two releases, four base advances) bound into running work with 0 restarts after the third generation, because the protocol put the live authority in files workers read at task start.

## Finding 1 (CONFIRMED, positive): a closure that carries its own gate record can be audited by someone who never ran it

- Every proposed closure carried: the complete-gate spelling (`FORGE_JSON=1 forge build --require-complete --no-replay --json`), its command id, the verdict qualifiers, step counts and test tallies, `gatedCommit` and `gatedTree`, the base sha, the red command with its failure count and cause, the green command with its pass count, mutation-sweep counts where run, the file scope with line deltas, and the sanitizer-routing read. The gate runner additionally re-verified red by restoring the base blobs and re-running the suite, and re-verified green, before signing.
- That record let this seat check tip, scope, ancestry, hot-file intersection and the owner-named review expectation (for wb-6hb.1, the replay-basis admission at the runtime admission gate) from a plain clone, with no build. Protect: keep red and green as recorded commands with counts, not as prose claims; keep `gatedCommit` and `gatedTree` in every closure.

## Finding 2 (CONFIRMED, positive): base skew was declared, not hidden

- Candidates gated before the package-smoke falsifier moved from v1 to v2 said so ("base predates the wb-x7m.1 v2 falsifier, which trunk applies on landing"), and candidates gated before the gate order changed to build-before-test declared their provisioning (`npm ci` plus a prebuilt `dist` for the detached test). The owner's merge gate then exercised each against the current tip. Two landings were explicitly reported as "composition clean" against behaviour that landed after the candidate's base.

## Finding 3 (CONFIRMED, positive): live-read authority absorbed boundary churn without restarts

- The first two generations were stopped and relaunched when the boundary changed mid-run, because a running workflow's prompts cannot be patched. The third generation made a boundary file and each bead's store notes the authority, read at task start; after that, 2 reservations, 2 releases and 4 base advances in one morning bound into dispatch with 0 restarts.

## Not established

- Whether the protocol holds under a bounce; 0 of 6 bounced, so the retry path is unexercised.
- Cost of the owner's re-gate; only the machine's gates are in this seat's ledgers.

## Gate note

Docs-only change; the owning repository's gates were waived for this commit under the standing docs-only feedback direction, disclosed here and in the commit body.
