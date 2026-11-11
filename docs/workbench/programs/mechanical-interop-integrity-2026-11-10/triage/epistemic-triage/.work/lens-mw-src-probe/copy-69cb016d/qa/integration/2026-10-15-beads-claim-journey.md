# Claimed Beads work through a bounded native development cut

A disposable clean Forge package under `/tmp/mw-claimed-live-target` was
initialized with a native Beads store. A real ready issue was created for a
one-file probe. The rig's `--live-develop --bead ... --claim-bead --allow-writes`
read native `bd ready`/`show`, made one atomic claim, read it back as
`in_progress` assigned to the invoking Beads actor, and rechecked Git basis
before starting the agent. The real Claude Agent SDK then committed only the
specified file. Native Forge verified that exact candidate and the CLI exited
successfully. The rig **did not close** Beads work. A separate acceptance
inspection of the file and gate was followed by an explicit `bd close`; the
issue ended `closed` only then.

| Native reference | Observed value |
| --- | --- |
| Beads issue | `mw-claimed-live-target-eqi` |
| Agent session | `e98a2571-5cbb-4672-98b7-2babc4c0e8aa` |
| Candidate commit | `84f5482bd3f8f0982a0893074b04eed3f4bdc463` |
| Forge operation | `op-0be5ecb41adf4e5fb0af6213b65a452b` |
| Workflow outcome | `verified_candidate` |
| Beads after CLI | `in_progress`, assigned to the caller |
| Beads after separate acceptance close | `closed` |

The raw local agent and native Forge result is
`evidence/2026-10-15-beads-claim-agent-forge-verified.json`. This is one
bounded local journey. It does not prove lost-ack behavior under process death,
remote Beads reconciliation, review/repair, or substantial task acceptance.
