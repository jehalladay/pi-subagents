# Furnace and Claude SDK integration observations — 2026-10-15

## Producer identities and scope

- Furnace executable: 0.1.0, rev `e2294c9f00b3`, binary sha256 beginning `ddf8da52`.
- Furnace SDK: `@furnace/sdk` 0.1.0 from `PrimaryInstallation/src/Furnace/sdk/typescript`, source checkout HEAD `b53db8a2fba7`; built `dist/` from that checkout did **not** pass `npm run build`.
- Claude Agent SDK: `@anthropic-ai/claude-agent-sdk` 0.3.300, installed locally without changing package manifests.
- Forge: executable 0.2.1 rev `0deb972720ce`, public `@forge/sdk` 0.1.0.
- Subject: trusted scratch package under `/tmp/mw-live-pkg` with a full Python gate. No Library import.

## Furnace Run: failure, recovery and success

A real Beads formula (`mw-gate`) created Run `frn-run-mw-live-pkg-wisp-9wh`.
The first Attempt `frn-atm-mw-live-pkg-wisp-cti-1` exited 1 on
`ContractUnavailableError` BEFORE the executor callback. The generated SDK module
recorded model digest `e5995480…`, its manifest said `b044cbe9…`, and source model
regeneration produced `2cf7c539…`. The Run parked in `needs_attention` at exit 5.
The second Attempt failed likewise after a recovery ladder (`run resume`, `work retry`).
These are native failures, not a Forge FAIL.

A local, ignored **build-output-only** reconciliation copied generated contract files
from a clean scratch projection of the current Smithy model into the SDK's ignored
`contract/` and `dist/contract/` directories. This was a diagnostic workaround,
not a fix to the Furnace source. SDK TypeScript compilation remains red with missing
exports and stale test types; this SDK copy cannot be released as-is.
After another `run resume` then `work retry`, Attempt
`frn-atm-mw-live-pkg-wisp-cti-3` succeeded. Its native
`ExecutionResult.success` carried source commit `03a0fa58…`, tree `60e9ebc9…`
and Forge operation `op-05196cc11ed547529f48f578b82b1b43`.
`run resume --continue` returned `completed`, with one of one work items closed.
The native status was success; the process-host exit was 0; these are distinct
from the Forge gate result linked by operation id.

Evidence: `evidence/2026-10-15-furnace-initial-attention.json`,
`evidence/2026-10-15-furnace-retry.json`,
`evidence/2026-10-15-furnace-completed.json`,
`evidence/2026-10-15-furnace-attempts.json`, and
`evidence/2026-10-15-furnace-executor-result.json`.

## Claude SDK: partial only

An actual SDK child process ran in `/tmp/mw-live-pkg-j8b`. Two full
`--live-develop` invocations refused with `AGENT_COMMIT_NOT_ESTABLISHED` (no changed
HEAD); a direct invocation hit `maxTurns=8` after writing a source module plus tests.
The resulting files were untracked and were manually inspected and reconciled.
A generated test violated Ruff's `RUF001` Unicode rule, so the first complete
Forge gate failed. The corrected test then passed `forge build --require-complete`.
A human-managed commit `e6e7e9f` followed, and the separate live gate produced
native PASS `op-c3e27828b8984573a2da4d3e4f117be5`.
That is **not** a completed `--live-develop` run and does not graduate MW-064/MW-069.
The application's refusal after no agent commit is correctly fail-closed.

Evidence: `evidence/2026-10-15-agent-edits-manually-verified.json`.

## Open work

- Repair or adapt to Furnace's source/model/SDK contract drift with a green SDK build before treating its executor as release-grade.
- Drive the provider to a committed clean candidate in `--live-develop` without manual reconciliation, then repeat the native Forge gate.
- Exercise real ambiguity/transport failure, cancelled attempts and fail/unknown Furnace mappings. Unit controls alone do not establish those live claims.

## Complete single-writer vertical cut after tool-permission diagnosis

A direct SDK message trace on a prior attempt showed that the agent composed
`git switch && printf > file && git add && git commit` in **one** Bash call.
`permissionMode: dontAsk` correctly denied this compound command because the
application allowlist named only individual `Bash(git status *)`,
`Bash(git add *)`, and `Bash(git commit *)` tools. The SDK still returned a
terminal `subtype: success` containing the sentence "I couldn’t complete the
task". The application correctly refused the unchanged HEAD, rather than
turning the terminal text into a verified result.

A red-first prompt control now requires Write/Edit for files and *separate*
Git Bash tool calls, without broadening allowed tools or trying to bypass the
permission system. A fresh trusted clone then ran the complete public SDK
`--live-develop --allow-writes` journey with a small bounded file task:

| Native observation | Value |
| --- | --- |
| Agent SDK version | `@anthropic-ai/claude-agent-sdk` 0.3.300 |
| Session ID | `a40f3d8a-0a0e-4d27-b3d4-930329ebfd0b` |
| Committed changed candidate | `aedc62aa51065510ae77ca1bc3b66ca16cc1801c` |
| Forge operation | `op-f74368f48f7a4e29b703c1ca184af0d2` |
| Workflow kind | `verified_candidate` |
| Forge native gate | `passed` (full gate on the candidate) |
| CLI exit | `0` |
| Clean Git tree after gate | yes |

Evidence: `evidence/2026-10-15-live-claude-forge-verified.json` contains the
unflattened native gate response and typed development outcome. The session
created only `AGENT_PROBE.txt`, a bounded proof of the real integration route.
It does not establish that an agent can implement and verify a substantial
production task or that HyperUnix and ReactiveFiber are integrated.
