# 04 — Pi verification and release program (mandatory)
No command or gate was executed in authoring this plan. Every positive needs a falsifier; every negative must demonstrate zero effect where appropriate. Persist logs under a new source-pinned QA receipt directory, not by rewriting older provenance.

## Tier ladder
V0: exact file/line/commit inspection (not runtime proof).
V1: focused unit/property/mutation tests for canonical input, authority, source, lease, observation and recovery.
V2: actual independent npm-packed Mechanical host installed in fresh consumer; digest+runtime-file checks; no Pi claimed.
V3: actual registered workflow_execute(function) with deterministic four callbacks and workflow_observe, no native provider claim.
V4: same registered route and installed real Claude SDK + native Forge full gate, committed Git candidate tree and manifest proof; no fake green.
V5: process interruption, reattach/reconcile and resource/performance trial; maintain no-duplicate-effect invariant.
V6: optional detached/Furnace/HX/RF and fleet configurations, separately evidenced.

## High-value falsifier matrix
| Test | Inject | Required |
| --- | --- | --- |
| G01 | nominal Forge PASS missing gate_passed | no strict native verification |
| G02 | matching commit but missing candidate tree evidence | strict result indeterminate unless documented independent native tree proof |
| G03 | gate definition/environment evidence missing or contradicted | no strict promotion |
| G04 | writer edits then restores bytes before lost ack | no blind retry from clean HEAD |
| G05 | ignored/untracked/non-worktree side effect, lost ack | preserve uncertainty; retry denied without comprehensive native absence |
| G06 | worker alive after launcher reply | second same-root invocation rejected; lease retained |
| G07 | two separate Pi processes same canonical root | exactly one live writer, including restart case |
| G08 | differing free-form Beads notes, identical typed input | identical admitted and dispatched canonical input, no note read |
| G09 | installed JS mutation after tarball extraction | refuse before trusted import |
| G10 | forged grant, root, profile or principal in tool request | no additional authority or side effect |
| G11 | kill after commit or gate dispatch, acknowledgment lost | native reconciliation, no automatic duplicate |
| G12 | HEAD/source tree changes after native PASS | record historical proof but no current-source promotion |
| P13 | principal or grant revoked during install | final-boundary refusal, zero writer calls |
| P14 | source clean/manifest changes during wait | refuse, retain source mismatch reason |
| P15 | cross-scope native ref/observer replay | zero cross-principal events, no control leak |
| P16 | duplicate/late event after terminal | idempotent projection, no new effect |
| P17 | response truncates long native identity | no non-addressable ref; invocation remains observable |
| P18 | executor crash with open writer fence | unknown + retained fence, no second effect |

## Four domain outcomes
Verified_candidate: passed producer gate on matching candidate commit/tree with valid native gate-definition and required execution evidence. Verification_failed: measured native FAIL for same committed candidate, not mere SDK transport error. Needs_evidence: incomplete discovery, writer/gate must not be reached. Indeterminate: unknown source/effects/provider result; never converted to failed or eligible for blind retry. Assert each remains separately inspectable in Pi UI, tool replies, CLI output and journal.

## Safety/performance matrix
- Input/permission denial: 0 Mechanical callbacks, 0 SDK sessions, 0 Forge gate requests, 0 workspace writes.
- After-dispatch cancellation: exact session/operation refs if known, explicit uncertain effect, no rollback claim.
- Host/process kill at each stage: source state and intent durable after restart; no false settlement; PID fenced.
- Host resource trials: 1, 4, 16 concurrent *different-root* invocations; separate same-root negative. Collect p50/p95 cold/warm startup, queue, JSON serialization, event growth, memory, FD, child count, token/cost, Forge operation count; do not invent SLAs. Compare to existing Pi script regression under comparable conditions.
- Privacy: redact model-visible summaries and filenames under existing scope rules; durable records keep necessary machine evidence with operator access controls.

## Concrete agent QA sequence
1. Check both current branch SHAs/clean Git and pinned artifact manifests; ensure no unmerged implementation work overwrites newer files.
2. Run package focused tests for P01–P07 and negative mutants, capturing exact command, exit status and fixtures.
3. Build Pi extension and independent Mechanical packed host; run fresh external install in a temporary directory. Distinguish Node versions and SDK identity.
4. Invoke the actual registered Pi tool and inspect the same invocation via workflow_observe and workflow_reconcile (V3).
5. Run opt-in native Claude/Git/Forge end-to-end in disposable clean Git package workspace. Capture source candidate SHA/tree, forge manifest sha, Forge operation id + original envelope/gate-def/environment proof; don't simulate PASS (V4).
6. Kill and restart hosts with native sessions outstanding; complete reconciliation/lease tests and record uncertainty without retry (V5).
7. Run local full Forge gate for each relevant package and the final merged tree. There is no GitHub CI requirement.
8. Validate operator docs/skills/example transcripts against the actual built CLI. Update W11 only for claims whose tiers were achieved.

## Release vetoes
- Any unsupported function can be invoked; any raw caller field can become authority; or no exact grant.
- Returned launch handle frees a still-active writer; second process can write same canonical root.
- Normalized input digest differs from payload reaching Mechanical.
- Missing Forge proof becomes verified_candidate, or recorded historical pass is miscredited to a changed tree.
- Unknown effect automatically retries; missing evidence resolves to failure or success.
- Registration test bypasses Pi tool, or native test uses fake SDK/Forge; missing L4/L5 but marked shipped.
- Skill/README/feature matrix advertises deployment without receipts; existing script/subagent regressions fail.

## Release receipt format
JSON fields: {schema, generatedAt, pi:{branch,sha,dirty},mechanical:{branch,sha,dirty}, nodeVersion, sdkIdentities, packages:[{name,sha256,runtimeManifestSha256}], tier, gates:[{command,exitCode,forgeOperationId}], fixtures:[{id,positive,mutant,observed}], native:{invocationId,claudeSessionId,baseCommit,baseTree,candidateCommit,candidateTree,forgeOperationId,gateDefinitionSha256,environmentBinding}, effects:{intentId,leaseGeneration,disposition,reconciliation}, residualUnknowns, docsAndSkillRefs}. Null stays null; never fabricate native IDs.
