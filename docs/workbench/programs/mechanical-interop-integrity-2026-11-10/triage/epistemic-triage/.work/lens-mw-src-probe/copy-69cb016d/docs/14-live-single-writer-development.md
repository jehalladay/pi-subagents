# 14 — First real single-writer development workflow (Claude Agent SDK + Forge)

**A bounded live execution was witnessed on 2026-10-15; broader task quality remains unverified.** This slice is deliberately narrower than the eventual full ecosystem integration. It uses *ordinary functions* from `@mechanical/workflows-development`, Git for a tracked-file census, a **plain task context** (not ReactiveFiber), the public Claude Agent SDK for implementation, and the public Forge App Server SDK for full verification. No Library clone, Beads task scheduler, HyperUnix coverage claim, RF rendering, or homegrown workflow runtime.

## Supported journey

From a Forge package checked out in a **trusted, clean Git worktree**:
1. Caller opts into potentially mutating source files via `--allow-writes`.
2. `developLive` verifies an existing `forge.toml`, clean Git HEAD/tree, nonempty task.
3. `git ls-files -z` enumerates tracked files. The `coverage: complete` statement is **only** complete for the Git tracked-file census; it is not a claim of task-relevant scope completeness. The implementation agent may read other files directly as required.
4. A plain task context contains the task, base Git commit, absolute workspace root and at most 400 tracked path names. `context: plain-task-context` is always stated.
5. One Claude Agent SDK session is invoked, given read/edit/write and narrow `git status/add/commit` tool permissions. It is instructed to implement the task and commit a change. This is single-writer application discipline, **not** a security sandbox.
6. Caller checks the Git worktree is clean, HEAD **and the HEAD tree** differ from the base, and `forge.toml` bytes are unchanged. A model terminal success alone does not establish a code change. This first cut refuses gate-manifest changes rather than attempting to review/reclassify a changed verification policy.
7. The caller executes the existing native Forge full gate via the public App Server SDK. The gate's Git committed basis must match the agent-produced candidate and the native Forge verdict must be established.
8. Return a typed `DevelopmentOutcome` with the agent SDK's session ID/turns/cost where supplied, native Forge observation, source IDs and explicit mode/discovery/context labels.

## Command

```sh
# Prerequisites: Node >=22.18, built MechanicalWorkflows npm workspaces,
# compatible built public @forge/sdk and @anthropic-ai/claude-agent-sdk
# installed locally in apps/development-rig, SDK authentication set up by host.
npm run build
node apps/development-rig/dist/cli.js --live-develop \
  --workspace /absolute/path/to/clean/trusted/forge/package \
  --task "Implement the parser optimization" \
  --allow-writes \
  --forge-bin forge

# Optional: --model <provider-supported model name>
```

The CLI does not create, select or install a model; it uses the selected provider's SDK and existing authentication configuration. In Bedrock-backed environments, configure Claude Agent SDK/Claude Code authentication through its supported Bedrock credential mechanism; the app neither stores AWS keys nor serializes credentials into workflow data.

The rig CLI exits 0 for established matching native Forge PASS, 1 for established native Forge FAIL, 3 for valid but inconclusive results, and 2 for invalid inputs/setup/exceptions. If an agent request fails *after* changing files, **inspect/reconcile the worktree**; rerunning the same task is not an idempotent replay. Do not automatically retry after ambiguous model or Forge transport failures.

## TypeScript library entry

```ts
import { developLive } from "./apps/development-rig/dist/live-development.js";

const result = await developLive("/repo/package", "Refactor parser", {
  model: "provider-supported-model",
  forgeExecutable: "forge",
});
```

`developLive` is the application composition root and depends on optional provider SDKs. The independently published `@mechanical/workflows-development` core package still depends on **no** agent or build SDK and exports `develop(services,request)`.

## Evidence and limits

- The agent result contains `session_id` (required), `num_turns`, `total_cost_usd` when supported. Its summary is **not** proof of implementation or verification.
- `git rev-parse HEAD`, HEAD tree, porcelain cleanliness and `git ls-files -z` provide limited git-based candidate identity. A clean worktree **does not** prove no changes to ignored files, environment, external services or global state. A Git before/after check does not prevent unobserved ABA or adversarial concurrent mutation. The host should run on trusted isolated workspaces.
- Native Forge gate output is returned under `forge.native`. A correct Forge status cannot be inferred from a successful SDK call alone. The application explicitly checks native gate evidence.
- Developer code runs from the host with its own OS permissions. `allowedTools` and `dontAsk` limit agent-tool approval according to the provider but are **not** an OS sandbox or a substitute for a trusted isolated worktree.
- No structured task-based HX query, RF context necessity/budget, multi-agent review/repair, Beads formula readiness, or durable Furnace supervision of the whole development function exists yet.
- The whole `developLive` function ran under a real Furnace Run through the process driver on 2026-10-15 (`frn-run-mwdv-wisp-5yb`, `qa/integration/2026-10-15-furnace-process-host.md`): Furnace supervised one Attempt and read one exit bit; the typed outcome lives in the executor receipt. That is Furnace durability of the Run/Attempt record, not continuation of the JavaScript stack (MW-042), and not the `@furnace/sdk` extension host, which stays unreleased.

## Real integration acceptance

Require a real installed Claude Agent SDK client, a clean workspace, an actual changed commit, a real installed Forge App Server gate run and its native operation ID, commit/tree/basis evidence, and confirmation that the user-requested code change meets acceptance criteria. The local tests inject mock agents and scripted Forge connections into **real temporary Git repos** and are not a substitute for a real agent/Forge integration run.

Additional targets: live HyperUnix scope query preserving complete/incomplete coverage; real RF render only when upstream surface works; structured review, repair, and explicit candidate integration; first native Furnace-hosted *development* journey with replay-safe side effects; optional isolated Forge child workspaces after shipped.

## Provider integration observation (2026-10-15)

The installed `@anthropic-ai/claude-agent-sdk` (0.3.300) produced `slugify.py` and `test_slugify.py` in a trusted isolated scratch Forge package. The first two `--live-develop` invocations refused with `AGENT_COMMIT_NOT_ESTABLISHED`, with no source change, and a direct SDK invocation exhausted `maxTurns=8` after editing but before committing. Forge then refused the generated test with `RUF001` for Unicode in the test data. After manual test correction, `forge build --require-complete` passed, the changes were committed manually, and a separate native `--live-verify` passed (`op-c3e27828b8984573a2da4d3e4f117be5`). **These earlier attempts did not satisfy MW-064/MW-069**: this provider path did not produce a clean committed candidate at the time. A later bounded live cut below did pass. The source changes and Forge PASS establish the manual reconciliation, not end-to-end agent automation. Evidence: [Furnace and agent integration report](../qa/integration/2026-10-15-furnace-and-agent.md).

## Full route witnessed (2026-10-15)

After tracing `dontAsk` tool denials for a compound Git Bash invocation and
instructing the agent to use separate Write/Edit and Git Bash calls, a real
public Claude Agent SDK run committed changed candidate
`aedc62aa51065510ae77ca1bc3b66ca16cc1801c`. The full native Forge
`gate.run` on that commit PASSED at operation
`op-f74368f48f7a4e29b703c1ca184af0d2`, producing
`verified_candidate` and CLI exit 0. The bounded task created a single
`AGENT_PROBE.txt`; broader task quality, code review/repair, HX and RF remain
unproven. Both earlier failed attempts and this pass are recorded in the
[QA integration report](../qa/integration/2026-10-15-furnace-and-agent.md).

## Opt-in RF context mode (2026-10-15)

`--context-mode rf --model claude-opus-5` selects a native ReactiveFiber render instead of plain context. The selected Forge package must already contain an initialized RF workspace with an active task-provider component; the CLI does not auto-initialize or mutate its RF definitions. `renderTaskContext` passes both task and Git source revision to `rf context render --strict --json`, and refuses a missing render id, wrong model/budget, placeholder content, or output not echoing the task and revision before any agent edits. The existing default `--context-mode plain` is unchanged. The RF opt-in path is unit-tested and produced a real task-grounded render in a locally initialized test workspace, and a bounded full RF-mode agent/Forge journey was witnessed on a disposable package (`qa/integration/2026-10-15-native-hx-rf-observations.md`). It is not a replacement for the pending HX task scope; portable component provisioning and substantial task quality remain open. The runnable CLI forwards the landed RF knobs under `--context-mode rf` only: `--rf-actor` (rfActor), `--rf-session` (rfSessionId), `--rf-history-limit` (rfHistoryLimit, decimal integer 1..500, else `INVALID_RF_HISTORY_LIMIT`) and `--render-idempotency-key` (renderIdempotencyKey, so a host retrying the whole journey replays rather than re-commits); any of them under plain context is refused as `RF_OPTION_REQUIRES_RF_MODE` before Beads, Git or the agent is touched.

## RF provisioning for a trusted clean package (2026-10-15)

The optional `provisionRfTaskContext(root)` helper uses only the installed public `rf init`, `component create/add/activate`, and `graph validate` commands. It requires a clean committed Git package and a Git-ignored `.reactive-fiber/` path before the first effect, refuses an existing RF workspace rather than overwriting it, changes only the task-provider starter component from placeholder content to `${provider:task}`, and rechecks the Git basis afterwards. A shell-level test initialized a fresh scratch package and observed a strict native task/source render. This prepares `--context-mode rf` without committing RF state or claiming a durable agent run; it does not set up HyperUnix.

## Optional read-only reviewer (2026-10-15)

`runClaudeReview(root, candidateRevision, task)` binds to a clean committed Git HEAD, runs one provider-specific Claude Agent SDK session with only Read/Glob/Grep and narrowly scoped Git status/show tools, and requires a structured result naming the same candidate before returning approved or rejected. Any source mutation during review refuses the result. This review is an observation with a provider session id, not a Forge gate verdict, and `--review` now opts into it before Forge verification. Rejected or wrong-basis reviews stop without a gate; there is still no automatic repair or blind agent retry.

## Read-only reviewer recovery (2026-10-15)

When a reviewer returns unknown after an agent commits, the full CLI exits 3 and never calls Forge. A separately run review of that exact clean candidate may establish a new approval; `verifyReviewedCandidate()` then validates its native review session and candidate identity before running a single native Forge gate. This recovery does **not** repeat the agent or convert its earlier unknown result into a PASS. A bounded real journey and refs are in [review recovery QA](../qa/integration/2026-10-15-review-recovery.md).

## Structured review reports and unknown-verdict diagnostics (2026-10-15)

`runClaudeReview()` now requests the Claude Agent SDK's `outputFormat` JSON
schema (`candidateRevision`, `verdict`, `rationale`) and reads the terminal
`structured_output` before falling back to the result text. The text fallback
accepts plain JSON or exactly one fenced JSON block. Every `unknown` verdict
carries a `reason` (`REVIEW_TERMINAL_MISSING`, `REVIEW_TERMINAL_ERROR:<subtype>`,
`REVIEW_RESULT_NOT_JSON`, `REVIEW_REPORT_BASIS_MISMATCH`, `REVIEW_REPORT_INVALID`,
`REVIEW_MODEL_UNDECIDED`) and no evidence ref, so an operator can tell a budget
exhaustion from a model that declined to decide. The reason is a diagnostic; it
never substitutes for a session-bound approval, and the receipt surfaces it on
the review stage. Earlier real reviews that returned `unknown` predate this
change and were recorded without a reason.

Both agent prompts (develop and repair) now say explicitly to commit on the
current branch and never create or switch branches. A real repair agent had
refused to commit on `main` and asked for branch permission; the host treated
that correctly as `REPAIR_SOURCE_CHANGE_NOT_ESTABLISHED`.

A first unattended journey under these rules completed on a scratch package: rejected review, one repair commit, a separate approval and a native Forge PASS (`qa/integration/2026-10-15-unattended-repair-journey.md`). One earlier attempt stopped at `REVIEW_MODEL_UNDECIDED`.

## Isolated-worktree candidate planning and selection (2026-10-15)

`selectAndVerifyCandidate(root, task, options)` plans up to eight candidates,
each produced by its own agent session in a host-created Git worktree on a
host-created branch from the same clean base; the main checkout is never
written. A candidate is excluded, with a reason, when its agent fails, leaves
the worktree dirty, commits nothing, commits off the base, or changes
`forge.toml`. The library `reviewCandidate()` policy then drives one
structured read-only chooser (`chooseWithClaude`, whose JSON schema
constrains `chosenRevision` to the planned commits and whose answer is
re-checked), a read-only review in the chosen candidate's worktree, and one
native Forge gate at that worktree whose gated commit must equal the chosen
revision. Worktrees are removed afterwards; candidate branches stay so every
planned commit remains referenced. This is Git isolation, not Forge
Workspace Families; the chooser and reviewer verdicts are model observations
and only the Forge operation is verification. Negative controls cover a
dirty base, uncommitted or dirty candidates, a chooser naming a revision
outside the plan, and an undecided chooser.

The rig CLI exposes the same host as `--live-select --allow-writes --workspace <pkg> --task <text> [--candidates N] [--model M] [--forge-bin F]` (`apps/development-rig/src/live-select-cli.ts`): exit 0 for `reviewed_candidate`, 1 for `review_rejected` / `verification_failed`, 3 otherwise, with the full `SelectionReport` on stdout. A two-candidate CLI run on a scratch package (103 s, exit 0, chooser session distinct from both agent sessions, Forge PASS at the chosen commit, main checkout untouched) is recorded in `qa/integration/2026-10-15-candidate-selection.md`.

With `--integrate`, a reviewed candidate is followed by an explicit integration check: the base must still equal the planned basis, the chosen commit must fast-forward onto it, and it is gated a second time in a fresh worktree; `SelectionReport.integration` carries `baseUnchanged`, `fastForward`, `reverification` and `verified`, and the CLI exits 0 only when `verified` is true. The host never moves the base ref. Isolation is git worktrees, not Forge workspace families, which remain unshipped upstream (request filed 2026-10-15). Witness: `qa/integration/2026-10-15-candidate-selection.md` (two PASS operations on one chosen commit, base untouched).
