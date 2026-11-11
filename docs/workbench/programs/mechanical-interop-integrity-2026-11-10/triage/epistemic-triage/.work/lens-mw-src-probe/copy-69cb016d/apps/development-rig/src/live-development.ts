/**
 * First real single-writer development composition.
 * Git tracked-file census + explicitly plain context + selected Claude agent SDK
 * + native Forge gate. HX and RF integration remain separate pending work.
 */
import { develop, type DevelopmentOutcome, type CompiledContext, type ReviewResult } from "@mechanical/workflows-development";
import { runClaudeReview } from "./claude-review.js";
import { renderTaskContext, type RfContext, type RenderHandoff } from "./rf-context.js";
import { execFile } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";
import { buildInvocationIdentity, hashSkillFiles, InvocationReplayRefusedError, missingHostAxes, settingsSha256, type HostIdentityInput, type InvocationIdentity } from "./invocation-identity.js";
import { packageRoot, cleanGitBasis, verifyExistingCandidate, type ConnectForge, type GateObservation } from "./live-gate.js";
import { runClaudeImplementation, assertNotCancelledBeforeDispatch, CANCELLED_BEFORE_DISPATCH, type AgentRun, type AgentImplementation, type AgentOptions } from "./claude-implement.js";

import { attachEffectRefs, openEffectIntent, settleEffectIntent, type EffectIntentRecord, type EffectIntentStore } from "./effect-intent.js";
import { describePostDispatchAbort, sessionIdOf, DevelopmentAbortedAfterDispatchError } from "./post-dispatch-abort.js";
import { describeLostAcknowledgement, showsWriterSideEffect, DevelopmentLostAcknowledgementError } from "./effect-reconciliation.js";
import { assertKnownProgressStage, STAGE_MAP, type ProgramStage, type ProgressCallback, type ProgressDisposition, type ProgressEvent } from "./progress-stages.js";

const execFileAsync = promisify(execFile);

async function gitText(root: string, ...args: string[]): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["-C", root, ...args], { encoding: "utf8", maxBuffer: 8 * 1024 * 1024, timeout: 30_000 });
    return stdout;
  } catch { return null; }
}

export interface LiveDevelopmentResult {
  readonly mode: "live-claude-forge";
  readonly discovery: "git-tracked-files";
  readonly context: "plain-task-context" | "reactive-fiber";
  readonly contextEvidence?: {readonly system:string;readonly kind:string;readonly id:string};
  /**
   * What a second worker receives from an RF render: the render id (the evidence handle's id) and the rf session id,
   * never the rendered text. A receiving step resolves it through resolveRenderHandoff (rf context show) and re-runs
   * the grounding checks; reused says whether the render came from rf context history rather than a fresh commit.
   */
  readonly contextHandoff?: RenderHandoff & {readonly evidence:{readonly system:string;readonly kind:string;readonly id:string};readonly source?:"reused"|"rendered"};
  readonly review?: ReviewResult;
  readonly workflow: DevelopmentOutcome;
  readonly agent: AgentImplementation | null;
  readonly forge: GateObservation | null;
  /**
   * SHA-256 (lowercase hex) of the forge.toml bytes pinned at preflight, the same bytes the
   * GATE_DEFINITION_CHANGED check compares. App-local replay identity, not cross-host authority.
   */
  readonly gateManifestSha256: string;
  /**
   * Invocation effect-identity (EAT-R048): source basis, installed SDK, settings digest, prompt digest, gate manifest
   * digest and host-named skill digests with one identity digest. App-local replay evidence, not cross-host authority.
   * Absent when the agent runner reported no replay identity: the host never fabricates one.
   */
  readonly invocation?: InvocationIdentity;
  /** The effect-intent record as last persisted (EAT-R013); present only when the host supplied an effectIntent store. */
  readonly effectIntent?: EffectIntentRecord;
}
export interface LiveDevelopmentOptions extends AgentOptions {
  /**
   * Cross-host identity axes the host states (EAT-R012): principal/session, Pi invocation id, descriptor and tarball
   * digests, context and evidence profiles, optionally gate parameters. Workspace realpath and the task digest are
   * observed here and cannot be overridden. An axis the host omits is recorded missing and disallows replay.
   */
  readonly hostIdentity?: HostIdentityInput;
  /** A replay request: refuses with InvocationReplayRefusedError, before any dispatch, when a host axis is missing. */
  readonly requireReplay?: boolean;
  /**
   * Durable store for the effect-intent record (EAT-R013). When present, exactly one intent is persisted before the writer
   * dispatches (a failed write refuses with EFFECT_INTENT_NOT_RECORDED and no dispatch), the native session, candidate
   * commit/tree and Forge operation id are attached as observed, and the record settles only against the committed tree
   * and the gate definition hash. Absent: no record, behavior unchanged.
   */
  readonly effectIntent?: EffectIntentStore;
  /**
   * Structured progress observer (EAT-R015): called once per stage in the documented order (discovery, context, sdk_startup,
   * first_edit, commit, gate_dispatch, settlement), each event carrying the stage, the rig receipt stage it maps to, the current
   * effect disposition and the latest native refs. Observer only: a callback that throws or rejects changes nothing.
   */
  readonly onProgress?: ProgressCallback;
  /** Intent id for the record; minted per developLive call when absent. */
  readonly effectIntentId?: string;
  /** Repo-relative instruction files whose bytes enter the invocation identity, in this order; default none. Read before any dispatch. */
  readonly skillFiles?: readonly string[];
  readonly forgeExecutable?: string;
  readonly contextMode?: "plain" | "rf";
  readonly renderContext?: typeof renderTaskContext;
  /** rf --idempotency-key for the RF render: a host retrying the whole journey passes the same key so rf replays rather than re-commits. Minted per developLive call when absent. */
  readonly renderIdempotencyKey?: string;
  /** rf session id (rfs_) the handoff carries: the RF route consults rf context history for it before rendering. Absent: no lookup. */
  readonly rfSessionId?: string;
  /** Explicit rf context history --limit for that lookup (1..500, default 50). */
  readonly rfHistoryLimit?: number;
  /** Explicit RF actor forwarded to the render as --actor (distinct from the Beads actor). */
  readonly rfActor?: string;
  /** Explicit review; absence leaves existing agent -> Forge behavior unchanged. */
  readonly reviewer?: typeof runClaudeReview;
  /** Injection seam for tests; defaults to real @forge/sdk. */
  readonly connectForge?: ConnectForge;
  /** Injection seam for tests; defaults to real Claude Agent SDK. */
  readonly agent?: AgentRun;
}

async function trackedFiles(root: string): Promise<readonly string[]> {
  const { stdout } = await execFileAsync("git", ["-C", root, "ls-files", "-z"], {
    encoding: "utf8", maxBuffer: 8 * 1024 * 1024, timeout: 30_000,
  });
  return stdout.split("\0").filter(Boolean);
}

/**
 * Caller must opt in to writes through the CLI. This application function itself
 * is not a durable transaction: interrupted agent writes require manual reconciliation.
 * A host abort observed after the first provider side effect refuses with
 * DevelopmentAbortedAfterDispatchError (typed uncertainty: Git ref, worktree, session,
 * Forge operation, no rollback claimed, no further side effect). A lost acknowledgement WITHOUT an abort
 * (the writer threw after an observable side effect, or the gate request was dispatched and its response
 * never arrived) refuses with DevelopmentLostAcknowledgementError (EAT-R045): the same native fields, zero
 * automatic retry; reconcileUncertainEffect decides whether a re-dispatch is permitted.
 */
export async function developLive(
  rootInput: string,
  task: string,
  options: LiveDevelopmentOptions = {},
): Promise<LiveDevelopmentResult> {
  const root = packageRoot(rootInput);
  // No provider initialization or agent side effects before input and basis preflight.
  if (!task.trim()) throw new Error("MISSING_TASK: task must be nonempty");
  assertNotCancelledBeforeDispatch(options.signal);
  const initial = await cleanGitBasis(root);
  const originalGateManifest = readFileSync(join(root, "forge.toml"));
  const gateManifestSha256 = createHash("sha256").update(originalGateManifest).digest("hex");
  // Instruction files are hashed at the clean basis, before any dispatch: later agent edits cannot change the record.
  const skills = hashSkillFiles(root, options.skillFiles ?? []);
  const revision = initial.commit;
  // Cross-host axes: observed ones win, the gate parameters default to what this flow sends, the rest come from the host or stay missing.
  const hostAxes: HostIdentityInput = {
    ...options.hostIdentity,
    workspaceRealpath: realpathSync(root),
    taskSha256: createHash("sha256").update(task, "utf8").digest("hex"),
    gateParameters: options.hostIdentity?.gateParameters ?? { method: "gate.run", require_complete: true, forgeExecutable: options.forgeExecutable ?? "forge" },
  };
  if (options.requireReplay) {
    const missing = missingHostAxes(hostAxes);
    if (missing.length > 0) throw new InvocationReplayRefusedError(missing);
  }
  let invocation: InvocationIdentity | undefined;
  let agent: AgentImplementation | null = null;
  let forge: GateObservation | null = null;
  let contextEvidence: RfContext["evidence"] | undefined;
  let contextHandoff: LiveDevelopmentResult["contextHandoff"];
  let review: ReviewResult | undefined;
  const runner = options.agent ?? runClaudeImplementation;
  const renderKey = options.renderIdempotencyKey ?? randomUUID();
  // Facts the typed post-dispatch uncertainty needs; a mutable record because the steps below run in closures.
  let intent: EffectIntentRecord | null = null;
  const persistIntent = async (next: EffectIntentRecord): Promise<void> => { await options.effectIntent!.write(next); intent = next; };
  // After the writer dispatched, a failed record update must surface by name: the effect exists even though its record lags.
  const updateIntent = async (next: EffectIntentRecord): Promise<void> => {
    try { await persistIntent(next); }
    catch (error) {
      throw new Error("EFFECT_INTENT_UPDATE_FAILED: the effect-intent record could not be updated after the writer dispatched; it still reads uncertain (" +
        (error instanceof Error ? error.message : String(error)) + ")");
    }
  };
  const progress = {candidate: null as {commit: string; tree: string} | null, sessionId: null as string | null, agentReturned: false, abortSeenAtAgentReturn: false, forgeDispatched: false, forgeOperationId: null as string | null};
  const aborted = (): boolean => options.signal?.aborted === true;
  // EAT-R015: one emission point; the stage literal must belong to the committed vocabulary (a test scans these call sites).
  let firstEditEmitted = false;
  const emitProgress = (stage: ProgramStage, disposition: ProgressDisposition, observedVia?: ProgressEvent["observedVia"]): void => {
    assertKnownProgressStage(stage);
    if (!options.onProgress) return;
    const event: ProgressEvent = {
      stage, rigStage: STAGE_MAP[stage], disposition,
      refs: {
        baseCommit: revision, contextRenderId: contextHandoff?.renderId ?? null, agentSessionId: progress.sessionId,
        candidateCommit: progress.candidate?.commit ?? null, candidateTree: progress.candidate?.tree ?? null, forgeOperationId: progress.forgeOperationId,
      },
      ...(observedVia ? { observedVia } : {}),
    };
    try { void Promise.resolve(options.onProgress(event)).catch(() => undefined); }
    catch { /* observer only: a progress callback never decides the run */ }
  };
  // Read-only inspection of what the abort left behind; it never cleans, resets or retries.
  const abortedAfterDispatch = (thrown: unknown): Promise<DevelopmentAbortedAfterDispatchError> => describePostDispatchAbort({
    worktree: root, baseCommit: revision, sessionId: sessionIdOf(thrown) ?? progress.sessionId,
    forgeOperationId: progress.forgeOperationId, forgeDispatched: progress.forgeDispatched, agentReturned: progress.agentReturned,
    abortSeenAtAgentReturn: progress.abortSeenAtAgentReturn,
  }, gitText);
  // A lost acknowledgement without abort: read-only, never retries; the same native fields as the abort uncertainty.
  const lostAck = (effect: "writer" | "gate", thrown: unknown): Promise<DevelopmentLostAcknowledgementError> => describeLostAcknowledgement(effect, {
    worktree: root, baseCommit: revision, sessionId: sessionIdOf(thrown) ?? progress.sessionId,
    forgeOperationId: progress.forgeOperationId, forgeDispatched: progress.forgeDispatched,
  }, gitText);
  const isPreDispatchRefusal = (error: unknown): boolean =>
    error instanceof Error && error.message === CANCELLED_BEFORE_DISPATCH;

  const workflow = await develop({
    discover: async request => {
      const before = await cleanGitBasis(root);
      if (before.commit !== revision || before.tree !== initial.tree) {
        throw new Error("SOURCE_BASIS_CHANGED_BEFORE_DISCOVERY");
      }
      const files = await trackedFiles(root);
      emitProgress("discovery", "none");
      return {
        basis: { workspaceId: request.workspaceId, revision },
        // Complete only for Git's tracked-file census, not task-specific semantic relevance.
        coverage: "complete",
        files,
        evidence: { system: "git", kind: "tracked-file-census", id: revision },
      };
    },
    compileContext: async (scope, request): Promise<CompiledContext> => {
      if (options.contextMode === "rf") {
        if (!options.model) throw new Error("RF_MODEL_REQUIRED: --model is required for RF context");
        const render = options.renderContext ?? renderTaskContext;
        const result: RfContext = await render(root, request.task, revision, options.model, undefined, {
          idempotencyKey: renderKey,
          ...(options.rfActor === undefined ? {} : { actor: options.rfActor }),
          ...(options.rfSessionId === undefined ? {} : { sessionId: options.rfSessionId }),
          ...(options.rfHistoryLimit === undefined ? {} : { historyLimit: options.rfHistoryLimit }),
        });
        if (result.basis.workspaceId !== root || result.basis.revision !== revision ||
            result.evidence?.system !== "reactive-fiber" || result.evidence.kind !== "render" || !result.evidence.id ||
            !result.text.includes(request.task) || !result.text.includes(revision) ||
            !result.rfWorkspaceId.startsWith("rfw_") || !result.actor ||
            (options.rfActor !== undefined && result.actor !== options.rfActor)) {
          throw new Error("RF_CONTEXT_UNESTABLISHED: rendered context and source basis did not agree");
        }
        contextEvidence=result.evidence;
        contextHandoff = {
          renderId: result.evidence.id,
          ...(result.sessionId === undefined ? {} : { sessionId: result.sessionId }),
          evidence: result.evidence,
          ...(result.source === undefined ? {} : { source: result.source }),
        };
        emitProgress("context", "none");
        return result;
      }
      const plainContext: CompiledContext = {
        basis: scope.basis,
        text: [
          "Plain task context (NOT a ReactiveFiber render).",
          "Requested task: " + request.task,
          "Git base commit: " + revision,
          "Repository root: " + root,
          "Tracked file census (first 400):",
          ...scope.files.slice(0, 400),
        ].join("\n"),
        evidence: { system: "mechanical-workflows", kind: "plain-context", id: revision },
      };
      emitProgress("context", "none");
      return plainContext;
    },
    implement: async (context, scope) => {
      // Re-read the Git basis at the last barrier before writer dispatch (after discovery and context
      // compilation, EAT-R033): a commit that landed in between refuses with zero SDK queries and zero writes.
      const beforeWriter = await cleanGitBasis(root);
      if (beforeWriter.commit !== revision || beforeWriter.tree !== initial.tree) {
        throw new Error("SOURCE_BASIS_CHANGED_BEFORE_WRITER");
      }
      // Re-check cancellation last: the final point before the agent runner.
      assertNotCancelledBeforeDispatch(options.signal);
      // Exactly one intent record exists, durably, before the writer's first side effect (EAT-R013).
      if (options.effectIntent) {
        try {
          await persistIntent(openEffectIntent({
            intentId: options.effectIntentId ?? randomUUID(), workspace: hostAxes.workspaceRealpath as string, taskSha256: hostAxes.taskSha256 as string,
            base: { commit: initial.commit, tree: initial.tree }, gateDefinitionSha256: gateManifestSha256,
          }));
        } catch (error) {
          throw new Error("EFFECT_INTENT_NOT_RECORDED: no intent record was persisted, so the writer was not dispatched (" + (error instanceof Error ? error.message : String(error)) + ")");
        }
      }
      let completedAgent: AgentImplementation;
      emitProgress("sdk_startup", "uncertain");
      try { completedAgent = await runner(root, [
        "Implement the following task in this one explicitly assigned Git workspace.",
        context.text,
        "Use the Write or Edit tool to change source files. Do not create files with shell redirection.",
        "You must produce and commit a coherent code change. Stage with git add, then commit with git commit.",
        "Run git status, git add, and git commit as separate Bash tool calls (no &&, pipes, redirects, subshells, or extra commands).",
        "Do not combine Git commands. Do not use git switch or create a branch; this host already assigned an isolated workspace.",
        "Commit directly on the current branch. Do not create or switch branches.",
        "Do not modify files outside the workspace. Do not attempt publication.",
        "Do not claim verification; the host will run Forge after your committed change.",
      ].join("\n\n"), {
        ...options,
        // A caller-supplied onFirstEdit is chained after the host event, never replaced; it observes and cannot fail the run.
        onFirstEdit: () => {
          if (!firstEditEmitted) { firstEditEmitted = true; emitProgress("first_edit", "uncertain", "agent-stream"); }
          try { void Promise.resolve(options.onFirstEdit?.()).catch(() => undefined); } catch { /* observer only: a thrown or rejected caller hook never decides the run */ }
        },
      }); }
      catch (error) {
        // An agent that observed the abort mid-run: dispatch had begun, so report uncertainty, not a rollback.
        if (aborted() && !isPreDispatchRefusal(error) && !(error instanceof DevelopmentAbortedAfterDispatchError)) throw await abortedAfterDispatch(error);
        // No abort: an agent that threw AFTER an observable side effect lost its acknowledgement. One that left no trace keeps its own refusal.
        if (!aborted() && !isPreDispatchRefusal(error) && !(error instanceof DevelopmentAbortedAfterDispatchError) && !(error instanceof DevelopmentLostAcknowledgementError)) {
          const lost = await lostAck("writer", error);
          if (showsWriterSideEffect(lost.uncertainty)) throw lost;
        }
        throw error;
      }
      agent = completedAgent;
      progress.agentReturned = true;
      // Ordering fact for agentIgnoredAbort: was the signal already aborted when the agent handed control back?
      progress.abortSeenAtAgentReturn = aborted();
      progress.sessionId = sessionIdOf(completedAgent);
      // Attach the native session as soon as the host holds it, before any further check can throw.
      if (intent && progress.sessionId) await updateIntent(attachEffectRefs(intent, { agentSessionId: progress.sessionId }));
      if (completedAgent.replay) {
        const replay = completedAgent.replay;
        invocation = buildInvocationIdentity({
          source: { commit: initial.commit, tree: initial.tree }, sdk: replay.sdk ?? null,
          promptSha256: replay.promptSha256, settingsSha256: replay.settingsSha256 ?? settingsSha256(replay.configuration),
          gateManifestSha256, skills, host: hostAxes,
        });
      }
      // The agent ran to completion although an abort was requested: report what exists, gate nothing.
      if (aborted()) throw await abortedAfterDispatch(null);
      // The candidate's evidence names the agent session; a blank id would attribute the
      // commit and the later Forge gate to nobody. The default runClaudeImplementation
      // already refuses blank sessions, so this guards the injected AgentRun seam.
      if (typeof completedAgent.sessionId !== "string" || completedAgent.sessionId.trim().length === 0) {
        throw new Error("AGENT_SESSION_UNIDENTIFIED: the agent result carries no nonblank session id");
      }
      const after = await cleanGitBasis(root);
      if (!originalGateManifest.equals(readFileSync(join(root, "forge.toml")))) {
        throw new Error("GATE_DEFINITION_CHANGED: first-cut development flow refuses a changed Forge manifest");
      }
      if (after.commit === revision) {
        throw new Error("AGENT_COMMIT_NOT_ESTABLISHED: the agent made no committed change");
      }
      if (after.tree === initial.tree) {
        throw new Error("AGENT_SOURCE_CHANGE_NOT_ESTABLISHED: committed candidate has no source-tree change");
      }
      // The committed source change proves an edit happened; when the stream never reported one the host says it saw it in Git.
      if (!firstEditEmitted) { firstEditEmitted = true; emitProgress("first_edit", "uncertain", "host-git-diff"); }
      progress.candidate = { commit: after.commit, tree: after.tree };
      if (intent) await updateIntent(attachEffectRefs(intent, { candidate: progress.candidate }));
      emitProgress("commit", "uncertain");
      // Abort between the agent's commit and the Forge dispatch: the commit exists, ungated.
      if (aborted()) throw await abortedAfterDispatch(null);
      return {
        parentBasis: scope.basis,
        basis: { workspaceId: root, revision: after.commit },
        evidence: { system: "claude-agent-sdk", kind: "session", id: completedAgent.sessionId },
      };
    },
    verify: async candidate => {
      if (aborted()) throw await abortedAfterDispatch(null);
      if (options.reviewer) {
        let observed: ReviewResult;
        try { observed = await options.reviewer(root, candidate.basis.revision, task, options); }
        catch (error) {
          if (aborted() && !(error instanceof DevelopmentAbortedAfterDispatchError)) throw await abortedAfterDispatch(error);
          throw error;
        }
        review = observed;
        if (observed.basis.workspaceId !== root || observed.basis.revision !== candidate.basis.revision ||
            observed.verdict !== "approved" || observed.evidence?.system !== "claude-agent-sdk" ||
            observed.evidence.kind !== "review-session" || !observed.evidence.id) {
          return {basis:candidate.basis,verdict:"unknown",diagnostic:observed.verdict==="rejected"?"REVIEW_REJECTED":"REVIEW_NOT_ESTABLISHED"};
        }
      }
      // No Forge dispatch once an abort is requested; after a dispatch no second one is ever made.
      if (aborted()) throw await abortedAfterDispatch(null);
      progress.forgeDispatched = true;
      emitProgress("gate_dispatch", "uncertain");
      try { forge = await verifyExistingCandidate(root, options.forgeExecutable ?? "forge", options.connectForge); }
      catch (error) {
        if (aborted() && !(error instanceof DevelopmentAbortedAfterDispatchError)) throw await abortedAfterDispatch(error);
        throw error;
      }
      progress.forgeOperationId = forge.operationId ?? null;
      if (intent && progress.forgeOperationId) await updateIntent(attachEffectRefs(intent, { forgeOperationId: progress.forgeOperationId }));
      // The gate request was issued and its response never arrived (no abort): typed uncertainty, no second dispatch.
      if (forge.kind === "indeterminate" && forge.reason === "FORGE_DISPATCH_OUTCOME_UNKNOWN" && !aborted()) throw await lostAck("gate", null);
      // Do not misattribute a gate of another commit to this candidate.
      const matchesCandidate = forge.basis.commit === candidate.basis.revision;
      return {
        basis: { workspaceId: root, revision: candidate.basis.revision },
        verdict: !matchesCandidate ? "unknown" : forge.kind === "passed" ? "passed" : forge.kind === "failed" ? "failed" : "unknown",
        ...(forge.operationId ? {
          evidence: { system: "forge", kind: "operation", id: forge.operationId },
        } : {}),
        diagnostic: matchesCandidate ? forge.reason : "VERIFICATION_SUBJECT_CHANGED",
      };
    },
  }, { task, workspaceId: root, baseRevision: revision }).catch(async (error: unknown) => {
    // Whatever refs the host observed before the failure are kept on the record, best effort; the original error wins.
    const held = intent as EffectIntentRecord | null;
    if (held) {
      try {
        await persistIntent(attachEffectRefs(held, {
          agentSessionId: progress.sessionId, candidate: progress.candidate, forgeOperationId: progress.forgeOperationId,
        }));
      } catch { /* the record keeps its last durable state, which reads uncertain */ }
    }
    throw error;
  });
  // Settle against the committed tree and the gate definition hash, never the gate status alone (EAT-R013).
  const heldIntent = intent as EffectIntentRecord | null;
  if (heldIntent) {
    const gate = forge as GateObservation | null;
    const candidate = progress.candidate;
    const matches = gate !== null && candidate !== null && gate.basis.commit === candidate.commit;
    await updateIntent(settleEffectIntent(heldIntent, {
      verdict: matches && gate.kind === "passed" ? "passed" : matches && gate.kind === "failed" ? "failed" : "unknown",
      verifiedTree: matches ? gate.basis.tree : null, gateDefinitionSha256: gateManifestSha256, forgeOperationId: gate?.operationId ?? null,
    }));
  }
  // Abort raised while the gate ran or before the reply: the observation is preserved by id, never silently credited.
  if (aborted() && progress.agentReturned) throw await abortedAfterDispatch(null);
  {
    const gate = forge as GateObservation | null;
    const candidate = progress.candidate;
    const answered = gate !== null && candidate !== null && gate.basis.commit === candidate.commit && (gate.kind === "passed" || gate.kind === "failed");
    emitProgress("settlement", answered ? "settled" : "uncertain");
  }
  const finalWorkflow = workflow.kind === "indeterminate" && workflow.reason === "VERIFICATION_UNKNOWN" &&
    options.reviewer && forge === null
    ? {kind:"indeterminate" as const,reason:review?.verdict === "rejected" ? "REVIEW_REJECTED" : "REVIEW_NOT_ESTABLISHED"}
    : workflow;
  return {
    mode: "live-claude-forge",
    discovery: "git-tracked-files",
    context: options.contextMode === "rf" ? "reactive-fiber" : "plain-task-context",
    ...(contextEvidence ? {contextEvidence} : {}),
    ...(contextHandoff ? {contextHandoff} : {}),
    ...(review ? {review} : {}),
    workflow:finalWorkflow, agent, forge, gateManifestSha256,
    ...(invocation ? {invocation} : {}),
    ...(intent ? {effectIntent: intent as EffectIntentRecord} : {}),
  };
}
