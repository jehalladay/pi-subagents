# MANIFEST — epistemic-adversarial-triage of mechanical-native-interoperability-2026-11-09
Pinned: 2026-11-09T18:47:49Z

## Artifact under audit (document pins)
- PRIMARY: Pi-subagents docs/programs/mechanical-native-interoperability-2026-11-09/{README,01-AUDIT-AND-PROTOCOL,02-IMPLEMENTATION-PACKAGES,03-VERIFICATION-AND-RELEASE}.md
  at origin/master b085c34ed01cb71ce0d600ac98ade7ee18e832f0 (continuity-13 merge, deposited <= 2026-11-09).
  Sizes: 6679 + 15324 + 17283 + 19219 bytes.
- SIBLING (context for joint claims; obligations out of scope except where they bind Pi):
  MechanicalWorkflows docs/programs/pi-native-interoperability-2026-11-09/{README,01-AUDIT-AND-CONTRACT,02-IMPLEMENTATION-PACKAGES,03-VERIFICATION-AND-RELEASE}.md
  at origin/main 7f3809fd8d6f20d22b9b4b81b6dfdb917bcc3c73. Sizes: 7069 + 13654 + 15964 + 18447 bytes.

## Environment pins (what the claims describe)
- Pi master 8e2fedeb8e3ce7d94c2d3724a6ef7e2c5eb02164 (the program's own stated baseline; worktree pins/pi-8e2fedeb).
- Mechanical main 62a10b5924ccb10db428999cb148fa23f732e4fe (stated baseline; worktree pins/mw-62a10b59).
- NOTE the program doc commit (b085c34e) is 12 landings ahead of its stated Pi baseline (8e2fedeb = through L1066; b085c34e = through L1078): claims are judged at the STATED baseline, drift to b085c34e recorded per-claim when material.
- Live trunk workbench/implementation-program continues to move (bead machines running); it is NOT an audit target.

## Question the artifact purports to answer
How to make a reviewed Mechanical develop(services,request) function invocable through Pi's registered workflow_execute (kind:function) with digest-pinned host, native observation, and a mandatory verification/release tail — superseding stale present-tense claims of the 2026-11-04/06 programs without deleting requirement history.

## Prior analyses (provenance, not fresh evidence)
- docs/workbench/programs/mechanical-workflows-interop-2026-11-04/ (EAT-R set, triage, 25 groups; store epic wb-1a3t).
- mechanical-interoperability-audit-2026-11-06/ (delta EAT-R144+).
- bead-machine-field-convergence-2026-11-07/ (9-repo program; NOT yet triaged for Pi — out of this audit's scope, noted as adjacent).
- docs/workbench/feature-matrix.md W11; docs/workbench/mechanical-function-hosting.md; .agents/skills/pi-mechanical-interop/SKILL.md.

## Durable location + purge rule
- Working dir: this scratch tree (purged by host cleaner; NOT durable).
- DURABLE: committed into Pi-subagents repo under docs/workbench/programs/mechanical-native-interoperability-2026-11-09/{epistemic-triage,requirements}/ on a workbench docs branch, pushed to origin (delivery = the push). Beads in the ledger-in-repo store are the implementation handoff.

## Known unavailable evidence
- No build/gate run at the doc commit (the program itself states "no current build, full Forge gate, provider launch, installed end-to-end function run or benchmark performed").
- MW rig host API stability claims rest on MW-side artifacts only.
