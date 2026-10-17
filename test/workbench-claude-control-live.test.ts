/**
 * wb-a2g.12 (VC-1/W16 residual): live claude interrupt adverse cancellation journey receipt.
 *
 * Real Claude Agent SDK sessions (the vendored SDK over the deployed gateway, run by the compiled host in disposable /tmp
 * scratch workspaces, never this repository and never the operator's default project store) are interrupted MID-STREAM
 * through the workflow_control tool built by its production constructor, with the src/index.ts claude executor leg and its
 * retention hooks mirrored line for line (text-pinned by test/workbench-claude-control-live-receipt.test.ts). The seam is
 * the host's real one: createClaudeWorkflowHost retains the real SDK Query and exposes its own interrupt() through
 * onQueryLive; this file never substitutes the SDK. Three disclosed substitutions, and only those: the retained seam is
 * wrapped by a counter (one method, the production ClaudeInterruptSeam shape), the adapter's typed execution is teed by
 * request id after the leg's call, and the recorder reads every SDK message before the verbatim init-binding body.
 *
 * Receipts stay phase-honest: requested, acknowledged and result are distinct; the acknowledged phase echoes the SDK's own
 * interrupt answer (receipt or none) as the adapter recorded it; the result exists only because THIS harness settles the
 * teed execution from the observer's report of the interrupted call's own terminal (src never calls settleClaudeInterrupt),
 * disclosed as resultDrivenBy "harness-tee". The measured terminal shape is recorded raw, never asserted.
 *
 * OWNERSHIP SEEDING (owner ruling R1, disclosed): the booted projection never receives an ownership edge FROM a claude
 * session, so this harness-owned projection, fed only by the mirrored production emitter, relates session -> agent-call
 * ownership with provenance source claude-agent-sdk and nativeConfirmationRef = the SDK's own system/init session_id, and
 * the receipt says so (ownership.seededBy "harness"). STRICT-READING LIMIT: the booted registered tool's claude leg is
 * unreachable today (wb-69g.4 BLOCKED, wb-hqa wiring gap); the receipt records that reading as UNREALISED, never fakes it.
 *
 * Runs ONLY from its own forge command (vitest.claude-control-live.config.ts); excluded from the default gate. A failed
 * credential preflight is honest unavailability: the receipt is typed UNREALISED (credentials-unavailable) and every row
 * fails naming it; nothing skips, nothing retries, no credential value is ever read, logged or persisted.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import { hostname, release } from "node:os";
import { join } from "node:path";
import { getSessionInfo, type SDKMessage } from "@anthropic-ai/claude-agent-sdk";
import { afterAll, describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  CLAUDE_CONTROL_RECONCILE,
  CLAUDE_INTERRUPT_OUTCOMES,
  type ClaudeControlExecution,
  executeClaudeControl,
  settleClaudeInterrupt,
} from "../src/workbench/claude-control.js";
import { type ClaudeCallIdentity, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { createClaudeObserver } from "../src/workbench/claude-transcript.js";
import { type ControlExecutionSummary, type ControlExecutor, createWorkflowControlTool, type WorkflowControlDeps } from "../src/workbench/control-tool.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Presentation } from "../src/workbench/observation.js";
import { sanitizeWorkbenchText, stripUnsafeText } from "../src/workbench/redaction.js";
import type { ClaudeNativeObservation } from "../src/workflow/progress.js";
import { runWorkflow, type WorkflowHost, type WorkflowRunResult, type WorkflowSpawnResult } from "../src/workflow/runtime.js";
import type { WorkflowTask } from "../src/workflow/task.js";
import {
  buildReceipt,
  CONTRACT,
  GRANT,
  type InterruptEcho,
  NON_CLAIMS,
  OWNERSHIP_SOURCE,
  type PhaseFields,
  type Receipt,
  type ReceiptEvidence,
  SCENARIOS,
  STRICT_BOOTED_CITATIONS,
  TEXT_CAP,
  truthLabelOf,
  type UnrealisedStep,
} from "./helpers/claude-control-live-receipt.js";
import { installScratchLeakGuard, makeScratch, removeScratch, trackScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const REPO = realpathSync(process.cwd());
/** Read before the scrub below removes the agent-session variables the SDK children must not inherit (the a2g.1 standing rule). */
const RECEIPT_PATH = process.env.CLAUDE_CONTROL_LIVE_RECEIPT;
const SCRUBBED = /^CLAUDE_CODE_|^CLAUDECODE$|^CLAUDE_PID$|^CLAUDE_JOB_DIR$/;
for (const name of Object.keys(process.env)) if (SCRUBBED.test(name)) delete process.env[name];
/** The requested model alias; the served model is read from an assistant frame only. */
const MODEL = process.env.CLAUDE_CONTROL_LIVE_MODEL ?? "claude-opus-5-5";
const SESSION_ID = "s-a2g12";
const PRINCIPAL = `local-operator:${process.getuid?.() ?? 0}:${SESSION_ID}`;
const STRANGER = `local-operator:someone-else:${SESSION_ID}`;
const OBSERVE = "workbench:observe";
const FORGE_COMMAND = "./node_modules/.bin/vitest run --config vitest.claude-control-live.config.ts";
/** Disclosed bounds: every wait below runs under one of these, and nothing is retried. */
const INIT_WATCHDOG_MS = 90_000;
const RUN_CEILING_MS = 120_000;
const ACK_WAIT_BOUND_MS = 20_000;
const SESSION_LOOKUP_BOUND_MS = 3_000;
const SETTLE_WAIT_BOUND_MS = 30_000;
const CONSTANTS = { INIT_WATCHDOG_MS, RUN_CEILING_MS, ACK_WAIT_BOUND_MS, SESSION_LOOKUP_BOUND_MS, SETTLE_WAIT_BOUND_MS, TEXT_CAP, retries: 0 };
const SOURCES = [
  "test/workbench-claude-control-live.test.ts", "test/helpers/claude-control-live-receipt.ts", "test/workbench-claude-control-live-receipt.test.ts", "vitest.claude-control-live.config.ts",
  "vitest.config.ts", "forge.toml", "src/index.ts", "src/workbench/control.ts", "src/workbench/control-tool.ts", "src/workbench/control-reply.ts", "src/workbench/claude-control.ts",
  "src/workbench/claude-host.ts", "src/workbench/claude-transcript.ts", "src/workbench/observation.ts", "src/workbench/redaction.ts",
];
const ESSAY = (topic: string): string => `Write an extensive, flowing essay of about 600 words on ${topic}. Do not use any tools. Do not stop early.`;
const SINGLE_WORD = "Reply with the single word OK. Do not use any tools.";
const essayScript = (name: string, topic: string): string =>
  `export const meta={name:${JSON.stringify(name)},description:"one long agent for the interrupt measurement"};\nconst result=await agent(${JSON.stringify(ESSAY(topic))});\nreturn result===null?"agent-null":"done";`;
const singleScript = (name: string): string =>
  `export const meta={name:${JSON.stringify(name)},description:"single short agent"};\nconst result=await agent(${JSON.stringify(SINGLE_WORD)});\nif(result===null) throw new Error("agent returned null");\nreturn result;`;
const fanoutScript = (name: string, topicA: string, topicB: string): string =>
  `export const meta={name:${JSON.stringify(name)},description:"two long agents in one parallel"};\nreturn await parallel([()=>agent(${JSON.stringify(ESSAY(topicA))}),()=>agent(${JSON.stringify(ESSAY(topicB))})]);`;

const nowIso = (): string => new Date().toISOString();
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
const sha256 = (bytes: Buffer | string): string => createHash("sha256").update(bytes).digest("hex");
/** Untrusted producer text bound for the receipt: the one shared helper's label layout, bounded. */
const label = (value: unknown, max = 160): string => sanitizeWorkbenchText(typeof value === "string" ? value : value === undefined ? "" : String(value), max, "label");

function git(args: readonly string[]): string | undefined {
  const run = spawnSync("git", ["-C", REPO, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  return run.status === 0 && typeof run.stdout === "string" ? run.stdout : undefined;
}
/** The qa/workbench/git-stamp.mjs rule: a stamp describes REPO only when it is the repository toplevel with a valid HEAD. */
function gitStamp(): { head: string | null; porcelain: string | null } {
  const top = git(["rev-parse", "--show-toplevel"]);
  let same = false;
  try { same = top !== undefined && realpathSync(top.trim()) === REPO; } catch { same = false; }
  if (!same) return { head: null, porcelain: null };
  const head = (git(["rev-parse", "HEAD"]) ?? "").trim();
  if (!/^[0-9a-f]{7,64}$/.test(head)) return { head: null, porcelain: null };
  return { head, porcelain: git(["status", "--porcelain"]) ?? null };
}
const STAMP = gitStamp();
const treeState = (): string => `${git(["status", "--porcelain"]) ?? "unreadable"}${git(["rev-parse", "HEAD"]) ?? "unreadable"}`;
const TREE_AT_START = treeState();
const versionOf = (pkg: string): string => {
  try { return String((JSON.parse(readFileSync(join(REPO, "node_modules", pkg, "package.json"), "utf8")) as { version?: unknown }).version ?? "unknown"); } catch { return "unknown"; }
};

const evidence: ReceiptEvidence = {
  utc: "",
  command: `forge run claude-control-live (${FORGE_COMMAND})`,
  revision: STAMP.head ?? "unknown",
  dirty: STAMP.head === null || STAMP.porcelain === null ? null : STAMP.porcelain.trim().length > 0,
  sources: Object.fromEntries(SOURCES.map(path => { try { return [path, sha256(readFileSync(join(REPO, path)))]; } catch { return [path, "unreadable"]; } })),
  toolchain: { node: process.version, vitest: versionOf("vitest"), sdk: `@anthropic-ai/claude-agent-sdk@${versionOf("@anthropic-ai/claude-agent-sdk")}` },
  host: { platform: process.platform, arch: process.arch, release: release(), hostname: hostname(), pid: process.pid },
  requestedModel: MODEL,
  servedModel: null,
  servedModelSource: null,
  initModel: null,
  constants: CONSTANTS,
  grants: { permitted: [GRANT, OBSERVE], denied: [] },
  scenarios: {},
  phases: [],
  nativeReferences: { sessionIds: [], controlRequestIds: [], nativeAckRefs: [], nativeResultRefs: [], ownershipConfirmationRefs: [] },
  verbCounts: { seam: { interrupt: 0 } },
  replies: [],
  ownership: { seededBy: "harness", source: OWNERSHIP_SOURCE, nativeConfirmationRef: "" },
  strictBooted: {
    realised: false,
    detail: "UNREALISED: the booted extension's projection never receives an ownership edge FROM a claude-agent-sdk session node (src/index.ts ingests claude.stream nodes only "
      + "and never calls projection.relate; projectClaudeTopology has no production caller and its edge is agent-call->session with provenance.source 'pi-workflow'), so the "
      + "booted workflow_control denies every real claude session target no-confirmed-ownership: the wb-69g.8 F1 'declare unreachable, never fake it' case. This tier measured "
      + "the PRODUCTION tool constructor and PRODUCTION adapter over a harness-owned projection seeded from real system/init data with the ownership edge disclosed as "
      + "harness-seeded, and a mirrored replica of the src/index.ts executor leg, text-pinned by the offline census. Citation: wb-69g.4 (BLOCKED) for the string-prompt "
      + "streaming registration gap; wb-hqa (filed) for the wiring gap: the booted projection never gains a session-sourced ownership edge and src never settles a claude interrupt.",
  },
  nonClaims: [...NON_CLAIMS],
  workspaces: [],
  unrealised: [],
};
evidence.scenarios[SCENARIOS.strictBooted] = { realised: false, detail: evidence.strictBooted.detail };

const noted = (list: string[], ...values: Array<string | undefined>): void => { for (const value of values) if (value !== undefined && value !== "" && !list.includes(value)) list.push(value); };
/** One phase of one journey: capped text for the eye, typed fields for the assessor, recorded together (wb-6hb.12). */
function record(scenario: string, fields: PhaseFields, text: string): void {
  evidence.phases.push({ scenario, phase: fields.phase, at: nowIso(), text: text.slice(0, TEXT_CAP), fields });
}
const scenario = (name: string, realised: boolean, detail: string): void => { evidence.scenarios[name] = { realised, detail }; };
function unrealised(step: UnrealisedStep, diagnostic: string): Error {
  evidence.unrealised.push({ step, diagnostic });
  return new Error(`${step}: ${diagnostic}`);
}
let preflightFailure: string | null = null;
function requirePreflight(): void {
  if (preflightFailure !== null) throw new Error(preflightFailure);
}

// ---------- The counted seam (substitution 1), the retention maps and the executor leg mirrored from src/index.ts ----------
const counts = { interrupt: 0 };
/** Interrupts issued through each retained seam wrapper, so a sibling's count is read per query, never inferred. */
const issuedBy = new WeakMap<object, { count: number }>();
/** The production ClaudeInterruptSeam shape around the host's real seam: one method, counted; the only verb that exists. */
function counted(seam: { interrupt(): Promise<unknown> }): { interrupt(): Promise<unknown> } {
  const issued = { count: 0 };
  const wrapper = {
    interrupt: async (): Promise<unknown> => {
      counts.interrupt += 1;
      issued.count += 1;
      return seam.interrupt();
    },
  };
  issuedBy.set(wrapper, issued);
  return wrapper;
}
const issuedThrough = (seam: object | undefined): number => (seam === undefined ? 0 : issuedBy.get(seam)?.count ?? 0);
interface LiveClaudeQuery { readonly invocationId: string; readonly call: ClaudeCallIdentity; readonly seam: { interrupt(): Promise<unknown> }; sessionId?: string }
const liveClaudeQueries = new Map<string, LiveClaudeQuery>();
const liveClaudeSessions = new Map<string, string>();
const liveClaudeKey = (invocationId: string, call: ClaudeCallIdentity): string => `${invocationId}:${call.index}`;
/** The adapter's typed executions, keyed by the core's request id: what the production reply (receipt + status) never carries. */
const executions = new Map<string, ClaudeControlExecution>();
const controlNow = (): string => new Date().toISOString();
/** The claude leg of src/index.ts controlExecutors, mirrored line for line (text-pinned offline); substitution 2 is the tee. */
const claudeExecutor: ControlExecutor = async (decision, request, signal): Promise<ControlExecutionSummary> => {
  const key = liveClaudeSessions.get(request.target.id);
  const live = key !== undefined ? liveClaudeQueries.get(key) : undefined;
  if (live === undefined) {
    throw Object.assign(new CapabilityError("unavailable", "No live Claude SDK query is retained in this process for the target session."), { code: "no-live-query" });
  }
  const execution = await executeClaudeControl(decision, {
    seam: live.seam,
    call: { invocationId: live.invocationId, index: live.call.index, ...(live.sessionId !== undefined ? { sessionId: live.sessionId } : {}) },
    now: controlNow, timeoutMs: 10_000, ...(signal !== undefined ? { signal } : {}),
  });
  executions.set(execution.requested.requestId, execution);
  return { receipt: execution.receipt, status: execution.status };
};
/** The same leg with a 1 ms wait bound: the one verb is issued, its answer is not awaited to the end (row J7). */
const ambiguousExecutor: ControlExecutor = async (decision, request, signal): Promise<ControlExecutionSummary> => {
  const key = liveClaudeSessions.get(request.target.id);
  const live = key !== undefined ? liveClaudeQueries.get(key) : undefined;
  if (live === undefined) {
    throw Object.assign(new CapabilityError("unavailable", "No live Claude SDK query is retained in this process for the target session."), { code: "no-live-query" });
  }
  const execution = await executeClaudeControl(decision, {
    seam: live.seam,
    call: { invocationId: live.invocationId, index: live.call.index, ...(live.sessionId !== undefined ? { sessionId: live.sessionId } : {}) },
    now: controlNow, timeoutMs: 1, ...(signal !== undefined ? { signal } : {}),
  });
  executions.set(execution.requested.requestId, execution);
  return { receipt: execution.receipt, status: execution.status };
};

// ---------- Journeys: one real workflow run each, in its own disposable scratch workspace ----------
interface ResultFrame { subtype: string; isError: boolean | null; stopReason: string | null; terminalReason: string | null }
interface Settled { result: WorkflowSpawnResult; at: string }
interface Journey {
  scenario: string;
  id: string;
  scratch: string;
  scope: ObservationScope;
  task: WorkflowTask;
  controller: AbortController;
  run: Promise<WorkflowRunResult> | undefined;
  outcome: WorkflowRunResult | undefined;
  /** The observer's latest snapshot per call index, and the host clock when a terminal one arrived. */
  snapshots: Map<number, ClaudeNativeObservation>;
  terminalAt: Map<number, string>;
  settled: Map<number, Settled>;
  initAt: Map<number, string>;
  initModel: Map<number, string>;
  assistantModel: Map<number, string>;
  assistantAborted: Map<number, boolean>;
  results: Map<number, ResultFrame>;
  seams: Map<number, object>;
  frames: number;
  seeded: Set<string>;
  emitNumbers: Map<string, number>;
}
const projection = new ObservationProjection();
const tasks = new Map<string, WorkflowTask>();
/** Every ingest the mirrored emitter made, so an event count that grew across a window is attributed to the streams themselves. */
let totalIngests = 0;
let journeyCount = 0;
function newJourney(name: string): Journey {
  journeyCount += 1;
  const scratch = trackScratch(realpathSync(makeScratch("wb-ccl-")));
  const id = `wf_ccl${String(journeyCount).padStart(2, "0")}${process.pid.toString(36)}`;
  const task = { id } as unknown as WorkflowTask;
  tasks.set(id, task);
  evidence.workspaces.push(scratch);
  return {
    scenario: name, id, scratch, scope: { workspace: scratch, principal: PRINCIPAL }, task, controller: new AbortController(), run: undefined, outcome: undefined,
    snapshots: new Map(), terminalAt: new Map(), settled: new Map(), initAt: new Map(), initModel: new Map(), assistantModel: new Map(), assistantAborted: new Map(), results: new Map(),
    seams: new Map(), frames: 0, seeded: new Set(), emitNumbers: new Map(),
  };
}
const sessionRef = (sessionId: string): NativeRef => ({ provider: "claude-agent-sdk", type: "session", id: sessionId });
const interruptParams = (sessionId: string, confirmed = true): Record<string, unknown> => ({ target: sessionRef(sessionId), action: "interrupt", ...(confirmed ? { confirmed: true } : {}) });

/** The production emitter (src/index.ts emitObservation), mirrored: a per-ref sequence and the ingest shape, into the harness projection. */
function emitObservation(journey: Journey, source: NativeRef, presentation: Presentation, kind: string, evidenceRefs?: readonly string[]): void {
  const refKey = JSON.stringify(source);
  const sequence = (journey.emitNumbers.get(refKey) ?? 0) + 1;
  journey.emitNumbers.set(refKey, sequence);
  totalIngests += 1;
  projection.ingest({
    projectionEventId: `${journey.id}:${kind}:${sequence}`,
    source, scope: journey.scope, sourceSequence: sequence, observedAt: new Date().toISOString(), kind,
    node: { presentation },
    trace: { invocationId: journey.id },
    ...(evidenceRefs?.length ? { evidenceRefs: [...evidenceRefs] } : {}),
  });
}
const clamp = (value: string): string => sanitizeWorkbenchText(value, 120, "label") || "unknown";
const reference = (value: string): string => stripUnsafeText(value, " ").substring(0, 120);
/**
 * The production observer callback (src/index.ts), mirrored: the node formation ("Native session id is supplied by the SDK,
 * never derived from a Pi workflow agent id"). Then, AFTER the first mirrored ingest of a session node, the harness relates
 * the ownership edge decideControl requires (owner ruling R1): session -> agent-call, source claude-agent-sdk,
 * nativeConfirmationRef = the system/init session_id. Never after a refresh; never claimed as production-emitted.
 */
function observerFor(journey: Journey) {
  return createClaudeObserver((call, snapshot) => {
    journey.snapshots.set(call.index, snapshot);
    if (snapshot.terminal !== undefined && !journey.terminalAt.has(call.index)) journey.terminalAt.set(call.index, nowIso());
    const live = !snapshot.terminal;
    emitObservation(journey, { provider: snapshot.sessionId ? "claude-agent-sdk" : "pi-workflow",
      type: snapshot.sessionId ? "session" : "agent-call", id: snapshot.sessionId ?? `${journey.id}:${call.index}` },
      { title: clamp(call.label), type: "agent", statusText: snapshot.terminal ?? (live ? "observed-running" : "unknown"),
        statusTone: snapshot.terminal === "succeeded" ? "success" : snapshot.terminal === "failed" ? "failure" : snapshot.terminal ? "unknown" : "active" }, "claude.stream",
      snapshot.lastMessageId ? [`claude-message:${reference(snapshot.lastMessageId)}`] : undefined);
    if (snapshot.sessionId !== undefined && !journey.seeded.has(snapshot.sessionId)) {
      journey.seeded.add(snapshot.sessionId);
      try {
        projection.relate({
          scope: journey.scope, from: sessionRef(snapshot.sessionId), to: { provider: "claude-agent-sdk", type: "agent-call", id: `${journey.id}:${call.index}` }, kind: "ownership",
          provenance: { source: "claude-agent-sdk", observedAt: journey.initAt.get(call.index) ?? nowIso(), nativeConfirmationRef: snapshot.sessionId },
        });
      } catch (error) {
        throw unrealised("projection-seed-refused", `${journey.scenario}: ${label(error instanceof Error ? error.message : String(error))}`);
      }
      noted(evidence.nativeReferences.sessionIds, snapshot.sessionId);
      noted(evidence.nativeReferences.ownershipConfirmationRefs, snapshot.sessionId);
      if (evidence.ownership.nativeConfirmationRef === "") evidence.ownership = { seededBy: "harness", source: OWNERSHIP_SOURCE, nativeConfirmationRef: snapshot.sessionId };
    }
  });
}
/** The recorder (substitution 3 of the onMessage hook): measurement only, before the verbatim init-binding body runs. */
function recordMessage(journey: Journey, message: SDKMessage, call: ClaudeCallIdentity): void {
  journey.frames += 1;
  if (message.type === "system" && message.subtype === "init") {
    journey.initAt.set(call.index, nowIso());
    journey.initModel.set(call.index, message.model);
    const live = liveClaudeQueries.get(liveClaudeKey(journey.id, call));
    if (live !== undefined) journey.seams.set(call.index, live.seam);
  } else if (message.type === "assistant") {
    if (typeof message.message.model === "string" && !journey.assistantModel.has(call.index)) journey.assistantModel.set(call.index, message.message.model);
    if (message.aborted === true) journey.assistantAborted.set(call.index, true);
  } else if (message.type === "result") {
    journey.results.set(call.index, {
      subtype: message.subtype, isError: typeof message.is_error === "boolean" ? message.is_error : null, stopReason: typeof message.stop_reason === "string" ? message.stop_reason : null,
      terminalReason: typeof message.terminal_reason === "string" ? message.terminal_reason : null,
    });
  }
}
/** The host, exactly as src/index.ts configures it for a run, with the mirrored hooks; the seam is the SDK's own (no override). */
function hostFor(journey: Journey): WorkflowHost {
  const task = journey.task;
  const observer = observerFor(journey);
  const bindingOnMessage = (message: SDKMessage, call: ClaudeCallIdentity): void => {
    if (message.type === "system" && message.subtype === "init") {
      const live = liveClaudeQueries.get(liveClaudeKey(task.id, call));
      if (live !== undefined) { live.sessionId = message.session_id; liveClaudeSessions.set(message.session_id, liveClaudeKey(task.id, call)); }
    }
    observer.onMessage(message, call);
  };
  return createClaudeWorkflowHost({
    cwd: journey.scratch,
    signal: journey.controller.signal,
    model: MODEL,
    tools: [],
    settingSources: [],
    permissionMode: "dontAsk",
    onMessage: (message, call) => { recordMessage(journey, message, call); bindingOnMessage(message, call); },
    onSettled: (result, call) => { journey.settled.set(call.index, { result, at: nowIso() }); observer.onSettled(result, call); },
    onQueryLive: (call, seam) => { liveClaudeQueries.set(liveClaudeKey(task.id, call), { invocationId: task.id, call, seam: counted(seam) }); },
    onQueryDone: call => {
      const key = liveClaudeKey(task.id, call);
      const live = liveClaudeQueries.get(key);
      if (live?.sessionId !== undefined && liveClaudeSessions.get(live.sessionId) === key) liveClaudeSessions.delete(live.sessionId);
      liveClaudeQueries.delete(key);
    },
  });
}
/** Starts the run under the ceiling; the abort is the clean stop (adverse runBounded pattern), recorded as teardown, never retried. */
function start(journey: Journey, script: string): void {
  const ceiling = setTimeout(() => journey.controller.abort(), RUN_CEILING_MS);
  journey.run = runWorkflow({ script, host: hostFor(journey), signal: journey.controller.signal, concurrency: 2 })
    .then(outcome => { journey.outcome = outcome; return outcome; })
    .finally(() => clearTimeout(ceiling));
}
async function until<T>(read: () => T, done: (value: T) => boolean, bound: number): Promise<{ value: T; ok: boolean; ms: number }> {
  const started = Date.now();
  let value = read();
  while (!done(value) && Date.now() - started < bound) {
    await sleep(25);
    value = read();
  }
  return { value, ok: done(value), ms: Date.now() - started };
}
interface MidStream { index: number; sessionId: string; assistantCharacters: number; initAt: string }
/** Waits, bounded by the init watchdog, for a retained seam, a bound session id and streamed assistant text on one call. */
async function midStream(journey: Journey, index: number): Promise<MidStream> {
  const read = (): { live: LiveClaudeQuery | undefined; snapshot: ClaudeNativeObservation | undefined } =>
    ({ live: liveClaudeQueries.get(`${journey.id}:${index}`), snapshot: journey.snapshots.get(index) });
  const seam = await until(read, state => state.live !== undefined, INIT_WATCHDOG_MS);
  if (!seam.ok) throw unrealised("no-seam", `${journey.scenario}: onQueryLive never fired for call ${index} within ${INIT_WATCHDOG_MS} ms (${journey.frames} frames seen)`);
  const bound = await until(read, state => state.live?.sessionId !== undefined, INIT_WATCHDOG_MS - seam.ms);
  const sessionId = bound.value.live?.sessionId;
  if (!bound.ok || sessionId === undefined) throw unrealised("no-session-observed", `${journey.scenario}: no system/init session id for call ${index} within ${INIT_WATCHDOG_MS} ms`);
  const streaming = await until(read, state => (state.snapshot?.assistantCharacters ?? 0) > 0 || state.snapshot?.terminal !== undefined, INIT_WATCHDOG_MS - seam.ms - bound.ms);
  const assistantCharacters = streaming.value.snapshot?.assistantCharacters ?? 0;
  if (!streaming.ok || assistantCharacters <= 0 || streaming.value.snapshot?.terminal !== undefined) {
    throw unrealised("not-mid-stream", `${journey.scenario}: call ${index} streamed ${assistantCharacters} assistant characters (terminal ${streaming.value.snapshot?.terminal ?? "none"}) within the watchdog`);
  }
  return { index, sessionId, assistantCharacters, initAt: journey.initAt.get(index) ?? nowIso() };
}
async function awaitRun(journey: Journey): Promise<WorkflowRunResult | undefined> {
  if (journey.run === undefined) return undefined;
  try { return await journey.run; } catch { return journey.outcome; }
}
/** Every journey ends here: the controller aborted (a no-op after a natural end), the run awaited, the scratch removed. */
async function end(journey: Journey): Promise<void> {
  journey.controller.abort();
  await awaitRun(journey);
  removeScratch(journey.scratch);
}

interface Reply {
  ok: boolean;
  invoked: boolean;
  status: string;
  completion?: string;
  control?: {
    status?: string; phase?: string; category?: string; policy?: string; effect?: string; requiredGrant?: string; requiredParams?: Record<string, unknown>; hint?: string; completionBasis?: string;
    requested?: { requestId?: string; grant?: string; policy?: string; ownershipConfirmationRef?: string; decidedAt?: string; target?: NativeRef };
    acknowledged?: { acknowledgedAt?: string; nativeAckRef?: string };
    result?: { outcome?: string; nativeResultRef?: string; settledAt?: string };
  };
  error?: { code: string; category?: string; message: string };
}
/** The registered tool by its production constructor over the harness-owned projection, host-bound scope and per-call grants. */
function controlTool(journey: Journey, grants: () => readonly string[], principal = PRINCIPAL, executor: ControlExecutor = claudeExecutor): (params: Record<string, unknown>) => Promise<{ raw: string; reply: Reply }> {
  const deps: WorkflowControlDeps = {
    grants: () => grants(),
    observerScope: () => ({ workspace: journey.scope.workspace, principal }),
    localPrincipal: () => principal,
    sessionIdOf: () => SESSION_ID,
    projection,
    tasks,
    now: controlNow,
    executors: { "claude-agent-sdk": executor },
  };
  const tool = createWorkflowControlTool(deps);
  const ctx = { cwd: journey.scratch, sessionManager: { getSessionId: () => SESSION_ID } };
  return async (params: Record<string, unknown>) => {
    const result = await tool.execute("live-call", params as never, undefined, undefined, ctx as never);
    const raw = result.content[0]?.type === "text" ? result.content[0].text : "";
    return { raw, reply: JSON.parse(raw) as Reply };
  };
}
const auditLength = (journey: Journey): number => journey.task.controlAudit?.receipts.length ?? 0;

interface Interrupted { requestId: string; execution: ClaudeControlExecution; reply: Reply; raw: string; mid: MidStream; seamBefore: number }
/** Issues the one permitted interrupt through the tool on a provably mid-stream call and asserts the acknowledged journey (A1, A2). */
async function interruptThroughTool(journey: Journey, mid: MidStream, grants: () => readonly string[]): Promise<Interrupted> {
  const seamBefore = counts.interrupt;
  const { raw, reply } = await controlTool(journey, grants)(interruptParams(mid.sessionId));
  evidence.replies.push({ scenario: journey.scenario, raw });
  expect(reply.ok).toBe(true);
  expect(reply.invoked).toBe(true);
  expect(reply.completion).toBe("not-asserted");
  expect(reply.status).toBe("acknowledged");
  expect(reply.control?.phase).toBe("acknowledged");
  expect(reply.control?.completionBasis).toBe("not-established");
  const requestId = reply.control?.requested?.requestId ?? "";
  expect(requestId).toMatch(/^ctl_[0-9a-f]{32}$/);
  expect(reply.control?.requested?.policy).toBe("exact-grant+confirmed-owner+operator-confirmed");
  expect(reply.control?.requested?.grant).toBe(GRANT);
  expect(reply.control?.requested?.ownershipConfirmationRef).toBe(mid.sessionId);
  const execution = executions.get(requestId);
  if (execution === undefined) throw new Error(`no teed execution for ${requestId}`);
  expect(execution.status).toBe("acknowledged");
  expect(execution.verb).toBe("interrupt");
  // The reply ECHOES the adapter's receipt of the SDK's own answer; it never mints one. Whichever answer the SDK gave is recorded.
  expect(reply.control?.acknowledged?.nativeAckRef).toBe(execution.acknowledged?.nativeAckRef);
  expect(counts.interrupt - seamBefore).toBe(1);
  const requested = execution.requested;
  record(journey.scenario, {
    phase: "requested", requestId, grant: requested.grant, policy: requested.policy, ownershipConfirmationRef: requested.ownershipConfirmationRef, target: { ...requested.target }, decidedAt: requested.decidedAt,
    sessionObservedAt: mid.initAt, midStreamBasis: { assistantCharacters: mid.assistantCharacters },
  }, `workflow_control interrupt of ${mid.sessionId} under ${GRANT}; init observed at ${mid.initAt}, ${mid.assistantCharacters} assistant characters streamed before the request`);
  const echo: InterruptEcho = { ...(execution.echo ?? { receipt: "none" }) };
  record(journey.scenario, {
    phase: "acknowledged", status: execution.status, requestId, nativeAckRef: execution.acknowledged?.nativeAckRef ?? "", acknowledgedAt: execution.acknowledged?.acknowledgedAt ?? "", echo,
  }, `the SDK answered interrupt(): ${execution.acknowledged?.nativeAckRef ?? "none"}; echo ${JSON.stringify(echo)}`);
  noted(evidence.nativeReferences.controlRequestIds, requestId);
  noted(evidence.nativeReferences.nativeAckRefs, execution.acknowledged?.nativeAckRef);
  return { requestId, execution, reply, raw, mid, seamBefore };
}
interface Measured { terminal: string; freshness: string; observedAt: string; snapshot: ClaudeNativeObservation; settled: Settled | undefined }
/** Waits, bounded, for the observer's terminal report of a call, and records the raw terminal shape (the bead's stated unknown). */
async function measureTerminal(journey: Journey, index: number, acknowledgedAt: string | undefined): Promise<Measured> {
  const read = (): { snapshot: ClaudeNativeObservation | undefined; at: string | undefined } => ({ snapshot: journey.snapshots.get(index), at: journey.terminalAt.get(index) });
  const waited = await until(read, state => state.snapshot?.terminal !== undefined && state.at !== undefined, SETTLE_WAIT_BOUND_MS);
  const snapshot = waited.value.snapshot;
  const observedAt = waited.value.at;
  if (!waited.ok || snapshot?.terminal === undefined || observedAt === undefined) throw new Error(`${journey.scenario}: call ${index} reported no terminal within ${SETTLE_WAIT_BOUND_MS} ms`);
  const settled = journey.settled.get(index);
  const frame = journey.results.get(index);
  record(journey.scenario, {
    phase: "terminal-measurement", sessionId: snapshot.sessionId ?? "", observerTerminal: snapshot.terminal, freshness: snapshot.freshness,
    resultSubtype: frame?.subtype ?? null, isError: frame?.isError ?? null, stopReason: frame?.stopReason ?? null, terminalReason: frame?.terminalReason ?? null,
    assistantAborted: journey.assistantAborted.get(index) === true,
    hostResult: { ok: settled?.result.ok === true, skipped: settled?.result.skipped === true, errorSanitized: label(settled?.result.error ?? "") },
    observedAt, ackToTerminalMs: acknowledgedAt === undefined ? -1 : Date.parse(observedAt) - Date.parse(acknowledgedAt),
  }, `observer terminal ${snapshot.terminal} (${snapshot.freshness}); result frame ${JSON.stringify(frame ?? null)}; assistant aborted ${String(journey.assistantAborted.get(index) === true)}; host ${JSON.stringify({ ok: settled?.result.ok, skipped: settled?.result.skipped })}`);
  return { terminal: snapshot.terminal, freshness: snapshot.freshness, observedAt, snapshot, settled };
}
/** Settles the teed execution from the observed terminal (the harness tee: the only way a result exists live) and records it. */
function settleFromObservation(journey: Journey, interrupted: Interrupted, measured: Measured): ClaudeControlExecution {
  const { execution, requestId, mid } = interrupted;
  const result = settleClaudeInterrupt(execution, {
    call: { invocationId: journey.id, index: mid.index },
    observation: { provider: "claude-agent-sdk", sessionId: mid.sessionId, freshness: measured.snapshot.freshness, terminal: measured.snapshot.terminal },
    observedAt: measured.observedAt,
  }, { now: controlNow });
  expect(result.status).toBe("settled");
  const expected = measured.freshness === "current" ? CLAUDE_INTERRUPT_OUTCOMES[measured.terminal as keyof typeof CLAUDE_INTERRUPT_OUTCOMES] : "unknown";
  expect(result.result?.outcome).toBe(expected);
  expect(result.result?.nativeResultRef).toBe(`claude-agent-sdk:session:${mid.sessionId}:${measured.terminal}@${measured.observedAt}`);
  record(journey.scenario, {
    phase: "result", requestId, outcome: result.result?.outcome ?? "", nativeResultRef: result.result?.nativeResultRef ?? "", settledAt: result.result?.settledAt ?? "", resultDrivenBy: "harness-tee",
  }, `harness tee settled ${requestId} from the observed terminal ${measured.terminal}: outcome ${result.result?.outcome ?? ""}`);
  noted(evidence.nativeReferences.nativeResultRefs, result.result?.nativeResultRef);
  return result;
}
/** The native session record, read back from the scratch's own SDK project store with measured attempts (live-adverse lookupNativeSession pattern). */
async function sessionRecord(journey: Journey, sessionId: string): Promise<{ found: boolean; attempts: number; ms: number }> {
  const started = Date.now();
  let attempts = 0;
  let found = false;
  do {
    attempts += 1;
    try {
      const info = await getSessionInfo(sessionId, { dir: journey.scratch });
      found = info?.sessionId === sessionId;
    } catch {
      found = false;
    }
    if (!found) await sleep(100);
  } while (!found && Date.now() - started < SESSION_LOOKUP_BOUND_MS);
  return { found, attempts, ms: Date.now() - started };
}

// ---------- Receipt emission (producer-side; the vitest agent reporter drops passing-test console output) ----------
let built: Receipt | undefined;
function receipt(): Receipt {
  evidence.utc = nowIso();
  evidence.verbCounts.seam.interrupt = counts.interrupt;
  built = buildReceipt(evidence);
  return built;
}
afterAll(() => {
  let final: unknown;
  try {
    final = built ?? receipt();
  } catch (error) {
    final = { contract: CONTRACT, realised: false, pass: false, unrealised: evidence.unrealised, diagnostics: [`the receipt could not be built: ${label(error instanceof Error ? error.message : String(error))}`] };
  }
  const line = `CLAUDE_CONTROL_LIVE_RECEIPT ${JSON.stringify(final)}`;
  process.stdout.write(`\n${line}\n`);
  if (RECEIPT_PATH) writeFileSync(RECEIPT_PATH, `${line}\n`);
});

/** Shared across J3-J5: one live essay session serves the denial trio, the observer close and the cross-scope rows. */
let shared: Journey | undefined;
let sharedMid: MidStream | undefined;
let sharedClose: { before: string; after: string; seamCalls: number } | undefined;

describe("live claude interrupt adverse cancellation journey (wb-a2g.12)", () => {
  it("J0 credential preflight: one tool-free single-word turn through the compiled host; the served model is read from an assistant frame, never the init echo", async () => {
    const journey = newJourney(SCENARIOS.preflight);
    try {
      start(journey, singleScript("ccl-preflight"));
      const outcome = await awaitRun(journey);
      const settled = journey.settled.get(0);
      const served = journey.assistantModel.get(0);
      evidence.initModel = journey.initModel.get(0) ?? null;
      const failure = outcome === undefined ? "the run never settled" : outcome.status !== "completed" ? `run ${outcome.status}: ${label(outcome.error ?? "")}` : settled?.result.ok !== true ? `agent ${label(settled?.result.error ?? "no result")}` : served === undefined ? "no assistant frame carried a model" : null;
      if (failure !== null) {
        preflightFailure = `credentials-unavailable: ${failure}`;
        scenario(SCENARIOS.preflight, false, failure);
        throw unrealised("credentials-unavailable", `${failure}; the deployed credential environment was left untouched and no credential value was read`);
      }
      evidence.servedModel = label(served, 120);
      evidence.servedModelSource = "assistant";
      noted(evidence.nativeReferences.sessionIds, settled?.result.sessionId);
      scenario(SCENARIOS.preflight, true, `single-word turn completed; served model ${evidence.servedModel} (assistant frame), init echo ${evidence.initModel ?? "none"}, sdk ${evidence.toolchain.sdk}`);
      expect(journey.snapshots.get(0)?.terminal).toBe("succeeded");
    } finally {
      await end(journey);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 240_000);

  it("J1 adverse interrupt mid-stream: the permitted interrupt reaches the real SDK query after its session id and assistant text were observed; acknowledged echoes the SDK's answer, the result comes only from the observed terminal", async () => {
    requirePreflight();
    const journey = newJourney(SCENARIOS.adverse);
    try {
      start(journey, essayScript("ccl-adverse", "the history of lighthouses"));
      const mid = await midStream(journey, 0);
      const interrupted = await interruptThroughTool(journey, mid, () => [GRANT, OBSERVE]);
      const measured = await measureTerminal(journey, 0, interrupted.execution.acknowledged?.acknowledgedAt);
      const settled = settleFromObservation(journey, interrupted, measured);
      const lookup = await sessionRecord(journey, mid.sessionId);
      expect(lookup.found, `native session record for ${mid.sessionId} after ${lookup.attempts} attempts in ${lookup.ms} ms`).toBe(true);
      const outcome = await awaitRun(journey);
      scenario(SCENARIOS.adverse, true,
        `interrupted ${mid.sessionId} mid-stream (${mid.assistantCharacters} chars): ${interrupted.execution.acknowledged?.nativeAckRef ?? ""} then ${settled.result?.nativeResultRef ?? ""}; `
        + `observer terminal ${measured.terminal}, run ${outcome?.status ?? "unsettled"}, session record found after ${lookup.attempts} attempt(s)`);
    } finally {
      await end(journey);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 240_000);

  it("J2 sibling unaffected: two agents in one parallel(); only session A is interrupted; session B reaches its own succeeded terminal with zero interrupts through its seam", async () => {
    requirePreflight();
    const journey = newJourney(SCENARIOS.sibling);
    try {
      start(journey, fanoutScript("ccl-sibling", "how tidal harbours are engineered", "the development of the marine chronometer"));
      const both = await until(() => [0, 1].map(index => liveClaudeQueries.get(`${journey.id}:${index}`)?.sessionId), ids => ids.every(id => id !== undefined), INIT_WATCHDOG_MS);
      if (!both.ok) throw unrealised("no-session-observed", `${journey.scenario}: both sessions were not bound within ${INIT_WATCHDOG_MS} ms (${JSON.stringify(both.value)})`);
      const mid = await midStream(journey, 0);
      const siblingIndex = 1;
      const siblingSession = liveClaudeQueries.get(`${journey.id}:${siblingIndex}`)?.sessionId ?? journey.snapshots.get(siblingIndex)?.sessionId ?? "";
      expect(siblingSession).not.toBe("");
      expect(siblingSession).not.toBe(mid.sessionId);
      const siblingSeam = journey.seams.get(siblingIndex);
      const interrupted = await interruptThroughTool(journey, mid, () => [GRANT, OBSERVE]);
      const measured = await measureTerminal(journey, 0, interrupted.execution.acknowledged?.acknowledgedAt);
      settleFromObservation(journey, interrupted, measured);
      const siblingTerminal = await until(() => journey.snapshots.get(siblingIndex)?.terminal, terminal => terminal !== undefined, RUN_CEILING_MS);
      const siblingSettled = journey.settled.get(siblingIndex);
      const siblingRecord = await sessionRecord(journey, siblingSession);
      const siblingSeamCalls = issuedThrough(siblingSeam);
      record(journey.scenario, {
        phase: "sibling", siblingSessionId: siblingSession, targetSessionId: mid.sessionId, siblingTerminal: siblingTerminal.value ?? "none", siblingSeamCalls, siblingOk: siblingSettled?.result.ok === true,
      }, `sibling ${siblingSession} read ${siblingTerminal.value ?? "none"} (ok ${String(siblingSettled?.result.ok)}) after ${mid.sessionId} was interrupted; ${siblingSeamCalls} interrupts through its seam; record found ${String(siblingRecord.found)}`);
      expect(siblingTerminal.value).toBe("succeeded");
      expect(siblingSettled?.result.ok).toBe(true);
      expect(siblingSeamCalls).toBe(0);
      expect(siblingRecord.found).toBe(true);
      const outcome = await awaitRun(journey);
      scenario(SCENARIOS.sibling, true, `interrupted ${mid.sessionId}; sibling ${siblingSession} succeeded with zero seam interrupts; run ${outcome?.status ?? "unsettled"}`);
    } finally {
      await end(journey);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 240_000);

  it("J3 denied-without-grant issues ZERO SDK verbs on a live streaming session: observer-only, missing-exact-grant and operator-confirmation precede the seam", async () => {
    requirePreflight();
    shared = newJourney(SCENARIOS.denied);
    const journey = shared;
    start(journey, essayScript("ccl-denied", "the geology of sea caves"));
    sharedMid = await midStream(journey, 0);
    const mid = sharedMid;
    const denials: Array<{ grants: string[]; confirmed: boolean; code: string; category: string }> = [
      { grants: [OBSERVE], confirmed: true, code: "observer-only", category: "authorization" },
      { grants: ["control:forge.cancel"], confirmed: true, code: "missing-exact-grant", category: "authorization" },
      { grants: [GRANT], confirmed: false, code: "operator-confirmation", category: "validation" },
    ];
    for (const denial of denials) {
      const seamBefore = counts.interrupt;
      const auditBefore = auditLength(journey);
      const { raw, reply } = await controlTool(journey, () => denial.grants)(interruptParams(mid.sessionId, denial.confirmed));
      evidence.replies.push({ scenario: journey.scenario, raw });
      evidence.grants.denied.push([...denial.grants]);
      expect(reply.ok).toBe(false);
      expect(reply.invoked).toBe(false);
      expect(reply.status).toBe("refused");
      expect(reply.error).toMatchObject({ code: denial.code, category: denial.category });
      expect(reply.control?.status).toBe("denied");
      expect(reply.control?.effect).toBe("none");
      if (denial.code === "missing-exact-grant") expect(reply.control?.requiredGrant).toBe(GRANT);
      if (denial.code === "operator-confirmation") {
        expect(reply.control?.requiredParams).toEqual({ confirmed: true });
        expect(typeof reply.control?.hint).toBe("string");
      }
      expect(raw).not.toMatch(/[\u0000-\u001f\u007f-\u009f]/);
      const seamCalls = counts.interrupt - seamBefore;
      expect(seamCalls).toBe(0);
      expect(auditLength(journey) - auditBefore).toBe(0);
      record(journey.scenario, { phase: "denied", policy: denial.code, category: denial.category, status: reply.status, invoked: reply.invoked, seamCalls }, `grants ${JSON.stringify(denial.grants)} confirmed ${String(denial.confirmed)}: ${raw}`);
    }
    expect(journey.snapshots.get(0)?.terminal).toBeUndefined();
    scenario(SCENARIOS.denied, true, `three typed denials (observer-only, missing-exact-grant, operator-confirmation) on live ${mid.sessionId}: zero seam interrupts, zero audit growth, session still streaming`);
    expect(treeState()).toBe(TREE_AT_START);
  }, 240_000);

  it("J4 observer close interrupts nothing: projection reads of the streaming session are taken and the view is closed; nodes and edges stay identical, every new event is the stream's own, the seam is untouched and the session reaches its own terminal", async () => {
    requirePreflight();
    const journey = shared;
    const mid = sharedMid;
    if (journey === undefined || mid === undefined) throw unrealised("harness-failure", "J4 has no shared live session from J3");
    const before = projection.stats();
    const ingestsBefore = totalIngests;
    const seamBefore = counts.interrupt;
    let view: { nodes: number; relations: number } | undefined = {
      nodes: projection.query({ scope: journey.scope, ref: sessionRef(mid.sessionId), limit: 1 }).nodes.length,
      relations: projection.relations({ scope: journey.scope, from: projection.query({ scope: journey.scope, ref: sessionRef(mid.sessionId), limit: 1 }).nodes[0]?.key ?? "" }).length,
    };
    expect(view.nodes).toBe(1);
    expect(view.relations).toBe(1);
    // The close: the observer's read handles are dropped; no control traffic exists for a view to issue.
    view = undefined;
    await sleep(300);
    const after = projection.stats();
    const streamIngestsAcross = totalIngests - ingestsBefore;
    const seamCalls = counts.interrupt - seamBefore;
    sharedClose = { before: JSON.stringify(before), after: JSON.stringify(after), seamCalls };
    expect(view).toBeUndefined();
    expect(seamCalls).toBe(0);
    // The watched session streams on: its own claude.stream ingests are the only events allowed to appear across the close.
    expect(after.nodes).toBe(before.nodes);
    expect(after.edges).toBe(before.edges);
    expect(after.events - before.events).toBe(streamIngestsAcross);
    const terminal = await until(() => journey.snapshots.get(0)?.terminal, value => value !== undefined, RUN_CEILING_MS);
    expect(terminal.value, "the watched session must reach its own terminal after the close").toBeDefined();
    const nodesAfter = projection.query({ scope: journey.scope, ref: sessionRef(mid.sessionId), limit: 1 }).nodes.length;
    expect(nodesAfter).toBe(1);
    record(SCENARIOS.observer, {
      phase: "observer-close", projectionStatsBefore: sharedClose.before, projectionStatsAfter: sharedClose.after, streamIngestsAcross, seamCalls, targetTerminalAfter: terminal.value ?? "none",
    }, `two projection reads then close; stats ${sharedClose.before} before and ${sharedClose.after} after (${streamIngestsAcross} events ingested by the streams themselves); ${seamCalls} seam interrupts; the watched session then read ${terminal.value ?? "none"} on its own`);
    scenario(SCENARIOS.observer, true, `observer view closed with zero control verbs; ${mid.sessionId} reached ${terminal.value ?? "none"} on its own (J3's denials interrupted nothing)`);
    expect(treeState()).toBe(TREE_AT_START);
  }, 240_000);

  it("J5 cross-scope denials: a never-observed session id, a stranger principal and another workspace's session are each denied cross-scope with zero seam calls and zero audit growth (no existence oracle)", async () => {
    requirePreflight();
    const journey = shared;
    const mid = sharedMid;
    if (journey === undefined || mid === undefined) throw unrealised("harness-failure", "J5 has no shared live session from J3");
    const other = newJourney(SCENARIOS.crossScope);
    try {
      const rows: Array<{ name: string; tool: (params: Record<string, unknown>) => Promise<{ raw: string; reply: Reply }>; target: string }> = [
        { name: "never-observed session id", tool: controlTool(journey, () => [GRANT, OBSERVE]), target: "00000000-0000-4000-8000-000000000000" },
        { name: "stranger principal", tool: controlTool(journey, () => [GRANT, OBSERVE], STRANGER), target: mid.sessionId },
        { name: "another workspace's live session", tool: controlTool(other, () => [GRANT, OBSERVE]), target: mid.sessionId },
      ];
      for (const row of rows) {
        const seamBefore = counts.interrupt;
        const auditBefore = auditLength(journey);
        const { raw, reply } = await row.tool(interruptParams(row.target));
        evidence.replies.push({ scenario: SCENARIOS.crossScope, raw });
        expect(reply.ok).toBe(false);
        expect(reply.invoked).toBe(false);
        expect(reply.status).toBe("refused");
        expect(reply.error).toMatchObject({ code: "cross-scope", category: "authorization" });
        const seamCalls = counts.interrupt - seamBefore;
        expect(seamCalls).toBe(0);
        expect(auditLength(journey) - auditBefore).toBe(0);
        record(SCENARIOS.crossScope, { phase: "denied", policy: "cross-scope", category: "authorization", status: reply.status, invoked: reply.invoked, seamCalls }, `${row.name}: ${raw}`);
      }
      scenario(SCENARIOS.crossScope, true, "three cross-scope denials (unknown id, stranger principal, foreign workspace scope): zero seam interrupts, zero audit growth");
    } finally {
      removeScratch(other.scratch);
      await end(journey);
      shared = undefined;
      sharedMid = undefined;
    }
    expect(sharedClose).toBeDefined();
    expect(treeState()).toBe(TREE_AT_START);
  }, 240_000);

  it("J6 interrupt of a settled call is a typed outcome: the leg's retention lookup misses (no-live-query, never a retrofit); a deliberately held seam measures interrupt() on the closed query", async () => {
    requirePreflight();
    const journey = newJourney(SCENARIOS.settled);
    try {
      start(journey, singleScript("ccl-settled"));
      const bound = await until(() => liveClaudeQueries.get(`${journey.id}:0`), live => live?.sessionId !== undefined, INIT_WATCHDOG_MS);
      const held = bound.value;
      if (!bound.ok || held?.sessionId === undefined) throw unrealised("no-session-observed", `${journey.scenario}: no session id within ${INIT_WATCHDOG_MS} ms`);
      const sessionId = held.sessionId;
      const outcome = await awaitRun(journey);
      expect(outcome?.status).toBe("completed");
      expect(journey.snapshots.get(0)?.terminal).toBe("succeeded");
      expect(liveClaudeQueries.has(`${journey.id}:0`)).toBe(false);
      expect(liveClaudeSessions.has(sessionId)).toBe(false);
      const seamBefore = counts.interrupt;
      const first = await controlTool(journey, () => [GRANT, OBSERVE])(interruptParams(sessionId));
      evidence.replies.push({ scenario: journey.scenario, raw: first.raw });
      expect(first.reply.ok).toBe(false);
      expect(first.reply.invoked).toBe(true);
      expect(first.reply.status).toBe("refused");
      expect(first.reply.error).toMatchObject({ code: "no-live-query", category: "unavailable" });
      expect(first.reply.control?.phase).toBe("requested");
      expect(first.reply.control?.result).toBeUndefined();
      expect(counts.interrupt - seamBefore).toBe(0);
      // Disclosed harness construct: the retention entry is held past onQueryDone so the adapter reaches interrupt() on the closed query.
      const key = `${journey.id}:0`;
      liveClaudeQueries.set(key, held);
      liveClaudeSessions.set(sessionId, key);
      let second: { raw: string; reply: Reply };
      try {
        second = await controlTool(journey, () => [GRANT, OBSERVE])(interruptParams(sessionId));
      } finally {
        liveClaudeQueries.delete(key);
        liveClaudeSessions.delete(sessionId);
      }
      evidence.replies.push({ scenario: journey.scenario, raw: second.raw });
      const requestId = second.reply.control?.requested?.requestId ?? "";
      const execution = executions.get(requestId);
      if (execution === undefined) throw new Error(`no teed execution for ${requestId}`);
      const seamCalls = counts.interrupt - seamBefore;
      expect(seamCalls).toBe(1);
      expect(second.reply.ok).toBe(true);
      expect(second.reply.invoked).toBe(true);
      const requested = execution.requested;
      record(journey.scenario, {
        phase: "requested", requestId, grant: requested.grant, policy: requested.policy, ownershipConfirmationRef: requested.ownershipConfirmationRef, target: { ...requested.target }, decidedAt: requested.decidedAt,
        sessionObservedAt: journey.initAt.get(0) ?? "", midStreamBasis: { assistantCharacters: journey.snapshots.get(0)?.assistantCharacters ?? 0 },
      }, `workflow_control interrupt of settled ${sessionId} through the held seam (disclosed harness construct)`);
      if (execution.status === "uncertain") {
        expect(second.reply.status).toBe("uncertain");
        expect(execution.reconcileHint).toBe(CLAUDE_CONTROL_RECONCILE);
        record(journey.scenario, {
          phase: "uncertain", requestId, status: execution.status, reason: execution.uncertainty?.reason ?? "", ...(execution.uncertainty?.failure ? { failure: { ...execution.uncertainty.failure } } : {}), seamCalls, retried: seamCalls !== 1,
        }, `interrupt() on the closed query parked ${JSON.stringify(execution.uncertainty)}; reply ${second.raw}`);
      } else {
        expect(execution.status).toBe("acknowledged");
        expect(second.reply.control?.acknowledged?.nativeAckRef).toBe(execution.acknowledged?.nativeAckRef);
        record(journey.scenario, {
          phase: "acknowledged", status: execution.status, requestId, nativeAckRef: execution.acknowledged?.nativeAckRef ?? "", acknowledgedAt: execution.acknowledged?.acknowledgedAt ?? "", echo: { ...(execution.echo ?? { receipt: "none" }) },
        }, `interrupt() on the closed query resolved: ${execution.acknowledged?.nativeAckRef ?? ""}`);
        noted(evidence.nativeReferences.nativeAckRefs, execution.acknowledged?.nativeAckRef);
      }
      noted(evidence.nativeReferences.controlRequestIds, requestId);
      scenario(SCENARIOS.settled, true, `settled ${sessionId}: typed no-live-query refusal (zero verbs); held-seam variant measured ${execution.status} ${JSON.stringify(execution.uncertainty ?? execution.acknowledged?.nativeAckRef)} after one verb`);
    } finally {
      await end(journey);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 240_000);

  it("J7 ambiguous interrupt (seam wait bound of 1 ms) parks uncertain after exactly one verb with the reconcile hint; the call's real terminal is observed, not inferred, and no result is minted", async () => {
    requirePreflight();
    const journey = newJourney(SCENARIOS.ambiguous);
    try {
      start(journey, essayScript("ccl-ambiguous", "the migration of arctic terns"));
      const mid = await midStream(journey, 0);
      const seamBefore = counts.interrupt;
      const { raw, reply } = await controlTool(journey, () => [GRANT, OBSERVE], PRINCIPAL, ambiguousExecutor)(interruptParams(mid.sessionId));
      evidence.replies.push({ scenario: journey.scenario, raw });
      expect(reply.ok).toBe(true);
      expect(reply.invoked).toBe(true);
      expect(reply.status).toBe("uncertain");
      expect(reply.control?.phase).toBe("requested");
      expect(reply.control?.result).toBeUndefined();
      const requestId = reply.control?.requested?.requestId ?? "";
      const execution = executions.get(requestId);
      if (execution === undefined) throw new Error(`no teed execution for ${requestId}`);
      expect(execution.status).toBe("uncertain");
      expect(execution.uncertainty?.reason).toBe("wait-timeout");
      expect(execution.reconcileHint).toBe(CLAUDE_CONTROL_RECONCILE);
      expect(execution.acknowledged).toBeUndefined();
      await sleep(2_000);
      const seamCalls = counts.interrupt - seamBefore;
      expect(seamCalls).toBe(1);
      const measured = await measureTerminal(journey, 0, undefined);
      const requested = execution.requested;
      record(journey.scenario, {
        phase: "requested", requestId, grant: requested.grant, policy: requested.policy, ownershipConfirmationRef: requested.ownershipConfirmationRef, target: { ...requested.target }, decidedAt: requested.decidedAt,
        sessionObservedAt: mid.initAt, midStreamBasis: { assistantCharacters: mid.assistantCharacters },
      }, `workflow_control interrupt of ${mid.sessionId} with a 1 ms wait bound`);
      record(journey.scenario, {
        phase: "uncertain", requestId, status: execution.status, reason: execution.uncertainty?.reason ?? "", seamCalls, retried: seamCalls !== 1,
      }, `parked ${JSON.stringify(execution.uncertainty)}; the call then read ${measured.terminal} on its own; reply ${raw}`);
      noted(evidence.nativeReferences.controlRequestIds, requestId);
      scenario(SCENARIOS.ambiguous, true, `ambiguous interrupt of ${mid.sessionId} parked wait-timeout after one verb; observed terminal ${measured.terminal}; no result minted`);
    } finally {
      await end(journey);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 240_000);

  it("J8 revoked grant: after one permitted interrupt the grant is removed; the next interrupt on a new live session is denied missing-exact-grant with zero seam calls while projection reads keep serving and the minted receipts re-read byte-identical", async () => {
    requirePreflight();
    const first = newJourney(SCENARIOS.revoked);
    const second = newJourney(SCENARIOS.revoked);
    let currentGrants: readonly string[] = [GRANT, OBSERVE];
    const grants = (): readonly string[] => currentGrants;
    try {
      start(first, essayScript("ccl-revoked-first", "the design of breakwaters"));
      const mid = await midStream(first, 0);
      const interrupted = await interruptThroughTool(first, mid, grants);
      const measured = await measureTerminal(first, 0, interrupted.execution.acknowledged?.acknowledgedAt);
      settleFromObservation(first, interrupted, measured);
      const mintedBefore = JSON.stringify(first.task.controlAudit?.receipts ?? []);
      start(second, essayScript("ccl-revoked-second", "the history of harbour pilots"));
      const next = await midStream(second, 0);
      currentGrants = ["control:forge.cancel", OBSERVE];
      const seamBefore = counts.interrupt;
      const { raw, reply } = await controlTool(second, grants)(interruptParams(next.sessionId));
      evidence.replies.push({ scenario: SCENARIOS.revoked, raw });
      evidence.grants.denied.push([...currentGrants]);
      const seamCalls = counts.interrupt - seamBefore;
      const reads = {
        first: projection.query({ scope: first.scope, ref: sessionRef(mid.sessionId), limit: 1 }).nodes.length,
        second: projection.query({ scope: second.scope, ref: sessionRef(next.sessionId), limit: 1 }).nodes.length,
        relations: projection.relations({ scope: second.scope }).length,
      };
      const mintedAfter = JSON.stringify(first.task.controlAudit?.receipts ?? []);
      expect(reply.ok).toBe(false);
      expect(reply.invoked).toBe(false);
      expect(reply.status).toBe("refused");
      expect(reply.error).toMatchObject({ code: "missing-exact-grant", category: "authorization" });
      expect(reply.control?.requiredGrant).toBe(GRANT);
      expect(seamCalls).toBe(0);
      expect(reads).toEqual({ first: 1, second: 1, relations: 1 });
      expect(mintedAfter).toBe(mintedBefore);
      expect(mintedBefore).toContain('"phase":"requested"');
      record(SCENARIOS.revoked, { phase: "denied", policy: "missing-exact-grant", category: "authorization", status: reply.status, invoked: reply.invoked, seamCalls },
        `grant revoked before the second interrupt (${JSON.stringify(currentGrants)}): ${raw}; reads ${JSON.stringify(reads)}; minted receipts unchanged ${String(mintedAfter === mintedBefore)}`);
      scenario(SCENARIOS.revoked, true, `first interrupt of ${mid.sessionId} acknowledged and settled from its observed terminal ${measured.terminal}; revoked grant denied the interrupt of ${next.sessionId} missing-exact-grant with zero seam calls; reads served, receipts re-read byte-identical`);
    } finally {
      await end(second);
      await end(first);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 240_000);

  it("J9 strict booted-tool reading is declared UNREALISED citing wb-69g.4 and wb-hqa; the receipt is built, parses from its marker line and judges the measured journeys", () => {
    expect(evidence.scenarios[SCENARIOS.strictBooted]).toEqual({ realised: false, detail: evidence.strictBooted.detail });
    for (const citation of STRICT_BOOTED_CITATIONS) expect(evidence.strictBooted.detail).toContain(citation);
    requirePreflight();
    const emitted = receipt();
    const parsed = JSON.parse(`CLAUDE_CONTROL_LIVE_RECEIPT ${JSON.stringify(emitted)}`.slice("CLAUDE_CONTROL_LIVE_RECEIPT ".length)) as Receipt;
    expect(parsed.contract).toBe(CONTRACT);
    expect(parsed.evidenceClass).toBe("live");
    expect(parsed.phases.length).toBe(evidence.phases.length);
    for (const [index, phase] of parsed.phases.entries()) {
      expect(phase.fields, `${phase.scenario} ${phase.phase}`).toBeDefined();
      expect(phase.fields.phase).toBe(phase.phase);
      expect(phase.fields).toEqual(evidence.phases[index]?.fields);
      expect(phase.text.length).toBeLessThanOrEqual(TEXT_CAP);
    }
    expect(parsed.phases.map(phase => phase.phase)).toEqual(expect.arrayContaining(["requested", "acknowledged", "result", "terminal-measurement", "denied", "uncertain", "observer-close", "sibling"]));
    expect(parsed.servedModelSource).toBe("assistant");
    expect(parsed.ownership).toEqual({ seededBy: "harness", source: OWNERSHIP_SOURCE, nativeConfirmationRef: evidence.nativeReferences.ownershipConfirmationRefs[0] });
    expect(parsed.nonClaims).toEqual([...NON_CLAIMS]);
    expect(parsed.truthLabel).toBe(truthLabelOf(parsed));
    expect(parsed.truthLabel === "live SDK pass").toBe(parsed.pass);
    expect(parsed.verbCounts.seam.interrupt).toBe(counts.interrupt);
    expect(parsed.revision).toBe(STAMP.head);
    expect(parsed.unrealised).toEqual([]);
    expect(parsed.dirty, `produced from an uncommitted tree: ${STAMP.porcelain?.trim() ?? "status unreadable"}`).toBe(false);
    expect(parsed.findings.map(finding => finding.rule)).toEqual([]);
    expect(parsed.pass).toBe(true);
  });
});
