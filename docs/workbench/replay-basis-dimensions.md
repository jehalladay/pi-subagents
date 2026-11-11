# Replay basis dimensions: Pi's half of the joint replay-basis specification

Program mechanical-interoperability-audit-2026-11-06, slice PI-4, requirement EAT-R161 as
`docs/workbench/programs/mechanical-interoperability-audit-2026-11-06/triage/requirements/ATOMIC-REQUIREMENTS-DELTA.md`
writes it at pi-subagents master `b8cd53aa` (bead wb-413a, its amendment of 2026-11-07T07:06Z). This page is the
Pi-side dimension list the requirement's conditions ask Pi to publish first. It is not a complete replay basis: MW's
app-local half is owed on wb-1zn2 (the two rows owned by MW below), and the requirement claims completeness only once
that half is attached there.

The requirement's words this page answers, verbatim:

- Statement: "Before any cut claims a complete replay basis for Pi-hosted Mechanical functions, Pi and MW MUST publish one joint replay-basis specification enumerating every bound dimension (source commit/tree and dirty-file digest; skill/system-instruction bytes; effective provider/SDK versions and settings; gate-manifest digest; effect references; and the existing cwd, model, permissionMode, settings, tools, roles, grants, principal) (the rule that an unmeasurable dimension blocks replay is EAT-R020 and is not re-owed); Pi's fingerprint tests MUST reference the specification's dimension list."
- Conditions: "Pi publishes the Pi-side dimension list first (landable with wb-413a); 'complete' is claimed only once MW's app-local half (prompt/config digest, Forge-manifest digest; EAT-R176 clause (c), MW-R3) is attached on wb-1zn2; the unlanded wb-413a branch 2f0fedd3 already rebinds the basis and was not inspected or run (K110)."

## Dimensions

One row for each dimension the statement names, and one for the prompt/config digest of the conditions' MW half. The
basis key is the option of the Claude host (`ClaudeWorkflowHostOptions`, src/workbench/claude-host.ts) whose handed
value the host's replay basis holds, and the rows the Claude host's basis holds run in the basis's own order.
test/workbench-replay-basis-dimensions.test.ts reads this table (its RB-SPEC rows).

| Dimension | Basis key | In the Claude host's basis | Measurement source | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| cwd | `cwd` | yes | the host option `cwd` | Pi | recorded |
| model | `model` | yes | the host option `model` | Pi | recorded |
| permissionMode | `permissionMode` | yes | the host option `permissionMode` | Pi | recorded |
| settings | `settingSources` | yes | the host option `settingSources` | Pi | recorded |
| tools | `tools` | yes | the host option `tools` | Pi | recorded |
| roles | `roles` | yes | the host option `roles` | Pi | recorded |
| grants | `grants` | yes | the host option `grants` | Pi | recorded |
| principal | `principal` | yes | the host option `principal` | Pi | recorded |
| source commit/tree and dirty-file digest | `replayDependencies.source` | yes | `sourceDependency` (src/workbench/replay-dependencies.ts), handed in as the host option `replayDependencies.source` | Pi | recorded |
| skill/system-instruction bytes | `replayDependencies.instructions` | yes | `instructionDependency` (src/workbench/replay-dependencies.ts), handed in as the host option `replayDependencies.instructions` | Pi | recorded |
| effective provider/SDK versions and settings | `replayDependencies.provider` | yes | `providerDependency` (src/workbench/replay-dependencies.ts), handed in as the host option `replayDependencies.provider` | Pi | recorded |
| effect references | none | no | none at this cut | Pi | deferred 2026-11-07: which effects a reference names waits on the effect-class list MW publishes with MW-R3 (EAT-R176 clause (a)), and EAT-R176 reads "Pi's effects bead (wb-mwsy) MAY land its Pi-local seams against a provisional effect-class list"; until then the Claude host's basis holds no effect reference |
| gate-manifest digest | none | no | MW's app-local Forge-manifest digest (EAT-R176 clause (c)) | MW | owed on wb-1zn2 (EAT-R176 clause (c), MW-R3) |
| prompt/config digest | none | no | MW's app-local prompt/config digest (EAT-R176 clause (c)) | MW | owed on wb-1zn2 (EAT-R176 clause (c), MW-R3) |

The three `replayDependencies` rows are in the basis only when the embedding host hands replay dependencies; built
without them, the Claude host's basis holds the first eight rows' keys alone.

NOT CLAIMED by this page: the detached host's basis (createDetachedWorkflowHost; the `WorkflowHost.replayBasis` comment
of src/workflow/runtime.ts names its dimensions); how each reading is measured
(test/workbench-replay-dependency-readers.test.ts and test/workbench-replay-dependencies-wiring.test.ts); and a complete
joint basis.
