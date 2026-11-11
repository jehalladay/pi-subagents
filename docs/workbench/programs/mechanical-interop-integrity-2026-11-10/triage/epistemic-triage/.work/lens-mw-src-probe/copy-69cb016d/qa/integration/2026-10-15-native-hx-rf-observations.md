# HyperUnix and ReactiveFiber observations — 2026-10-15

This is integration reconnaissance, **not** a delivered task-scope/context
adapter. Both tools ran through installed public interfaces; neither was
promoted to a complete workflow stage based on a partial/placeholder result.

## HyperUnix TypeScript SDK

The built `@hyperunix/sdk` 0.1.0 under
`PrimaryInstallation/src/HyperUnix-CLI/sdk/typescript` opened the installed
`/home/jehallad/.local/bin/hx` against the committed scratch package.
A typed `find({kind:'hx.fs/regular-file',root:'src'})` returned native exit 3,
11 proof-graph claim rows, four coverage observations in `opportunistic`
mode (`No_change_exclusion`) and a structured
`HX-COVERAGE-INCOMPLETE` diagnostic reporting six answer rows. The proof
rows must not be counted as answer files. This result cannot establish
complete source discovery and must never be coerced to an empty successful
scope. The current `developLive` correctly retains its explicitly labeled
Git tracked-file census until a task-scoped HX query with complete coverage
and subject basis is demonstrated. MW-018 remains TARGET.

The initial SDK probe passed a bare `binary:'hx'` and was refused with
`SDK_BINARY_NOT_FOUND` because an explicit constructor value is resolved as a
path relative to cwd. Supplying the installed absolute binary path succeeded.
This is documented selection behavior, not a tool defect.

## ReactiveFiberCLI

Installed `rf 0.1.583` initialized a local JSONL workspace and a declarative
demo component, then committed render
`rfr_cn67c4t2inql3zk6sjsq6wfau4` with output digest
`sha256:d5ffb8a8a5329764c8e19e4a150254799af2259082467ed4bda687cb448a3094`.
`rf context show` read the same render in a new invocation. The output was
only `demo.banner has no content yet.\n`, 32 bytes. The render's budget
identified `claude-opus-5`, a one-million-token context window and available
context value 989760. The output does not incorporate task-relevant code,
so no RF context compiler was wired into `developLive` and MW-019 remains
TARGET. `.reactive-fiber/` remains git-ignored; the initialized store and
placeholder definition are local experiment data, not product source.

## Next falsifiers

A task-scoped HyperUnix query must prove complete coverage at a pinned
candidate basis, or return needs-evidence without invoking the implementer.
A task-grounded RF render must return source-derived content plus a persisted
render id and model/budget evidence; blank or placeholder content must fail
closed. Integration tests must exercise both paths through the public SDKs
before statuses can be advanced.

## Opt-in RF → agent → Forge vertical cut

A disposable clean Forge Python package was initialized with `rf init --backend jsonl`, and its locally ignored `demo.banner` component body was changed to `${provider:task}`, added and activated. The rig's `--live-develop --context-mode rf --model claude-opus-5 --allow-writes` then produced a committed RF render containing the task and base Git revision, handed that text to the real Claude Agent SDK, obtained clean candidate `df2199e74f7ea368c0e4bd9d282996ae36732fee`, and verified it through native Forge operation `op-82587a2e298944beb2c26d39ebf3738c` (`status=success`, `gate_verdict=PASS`, `disposition=SUCCEEDED`, CLI exit 0). The agent session was `6003f868-df93-47c3-88df-8be7bcb9e098`. Raw unflattened native evidence lives at `evidence/2026-10-15-live-rf-claude-forge-verified.json`. This establishes a bounded RF-mode vertical cut, not a full HX-scoped workflow, a portable RF component installation, or release-quality agent task performance. The RF state/definition used in the disposable package stayed ignored; no credential or secret was placed in source.
