/**
 * Live tier for the Furnace-hosted adapter (wb-zmd). NOT part of the default gate:
 * run it with `forge run furnace-hosted-live`.
 *
 * Every Run lives in a disposable /tmp workspace with its own bd store and its own
 * Furnace state directory, in the default wisp mode, with fixture formulas only.
 * Nothing here calls `furnace doctor`, starts a capability probe, uses
 * --persistent, or touches this repository's .beads or .furnace. The bridge runs
 * on the SHIPPED vendored SDK (wb-zby re-packaged it from a Furnace revision whose
 * manifest and generated provenance digests agree); no repaired copy exists any more.
 *
 * wb-3hc (VC-7 / W18-D follow-up, owner Q1(c)) adds the LIVE retry rows: RETRY (the operator's `attempt stop` of an
 * Attempt whose child Run establishment is never acknowledged, then the operator's `work retry`), PARK (an indeterminate
 * first Attempt Furnace parks, then the operator's `work retry`) and RECEIPT (both bound into one LIVE receipt,
 * contract workbench.furnace-hosted-retry-live/v1, printed producer-side on the committed revision). Each runs in this
 * file's disposable /tmp workspace with its own Furnace state directory; never the owner bead store, the rig or a
 * candidate worktree.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { connect } from "node:net";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { type AttemptDto, argv, clientOperations, type EventsListDto, type ExecutorApp, type FurnaceOptions } from "@furnace/sdk";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { type FurnaceHostedClient, FurnaceHostedExecutor, type FurnaceSdk, type HostedOutcome, type HostedWorkflow, SHIPPED_FURNACE_SDK } from "../src/workbench/hosts/furnace-hosted.js";
import {
  assessRetryLive,
  type BridgeReading,
  buildRetryLiveReceipt,
  type FurnaceAttemptRecord,
  type FurnaceEventRecord,
  type FurnaceReading,
  type OperatorRetryObservation,
  RETRY_LIVE_LINE_MARKER,
  type UncertainParkObservation,
} from "./helpers/furnace-hosted-retry-live-receipt.js";
import { installScratchLeakGuard } from "./helpers/scratch.js";

installScratchLeakGuard();

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
const REPO = process.cwd();
const mainTreeState = (): string => `${execFileSync("git", ["-C", REPO, "status", "--porcelain=v1"], { encoding: "utf8" })}${execFileSync("git", ["-C", REPO, "rev-parse", "HEAD"], { encoding: "utf8" })}`;

// ---- wb-3hc (VC-7 / W18-D follow-up): the LIVE retry receipt's measurement helpers ----------------------------------
// The live retry rows below hand plain records to test/helpers/furnace-hosted-retry-live-receipt.ts (pure, judged
// offline by test/workbench-furnace-hosted-retry-live-receipt.test.ts). Every Furnace verb they issue carries this
// file's disposable /tmp workspace (`-C`) and a row-own state directory; the operator path is the shipped SDK's
// Attempts.stop and Work.retry (argv.d.ts attemptStop / workRetry).
const liveObserved: { operatorRetry: OperatorRetryObservation | null; uncertainPark: UncertainParkObservation | null } = { operatorRetry: null, uncertainPark: null };
type FurnaceClient = InstanceType<FurnaceSdk["Furnace"]>;
interface BridgeFrame {
  readonly session: string;
  readonly dir: "in" | "out";
  readonly at: number;
  readonly line: string;
}
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const textOrNull = (value: unknown): string | null => (typeof value === "string" ? value : null);
function lineOf(raw: string): Record<string, unknown> | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
/** An error's typed code (or kind), never its message, which can carry scratch paths. */
const codeOf = (error: unknown): string => (isRecord(error) && typeof error.code === "string" ? error.code : isRecord(error) && typeof error.kind === "string" ? error.kind : "unknown");
/** An error's message with every absolute path cut to its last segment. */
const messageOf = (error: unknown): string => String(isRecord(error) ? error.message : error).replace(/\/(?:[^\s/'"]+\/)+([^\s/'"]+)/g, "$1");

/** The SHIPPED SDK with its ResidentSession tapped: every frame a session reads or writes is recorded and none is changed. */
function tappedSdk(frames: BridgeFrame[]): FurnaceSdk {
  class TappedSession extends SHIPPED_FURNACE_SDK.ResidentSession {
    constructor(app: ExecutorApp, served: readonly string[], write?: (line: string) => void, instanceId?: string) {
      const owner = { session: "" };
      super(
        app,
        served,
        write === undefined
          ? undefined
          : (line: string) => {
              frames.push({ session: owner.session, dir: "out", at: Date.now(), line });
              write(line);
            },
        instanceId,
      );
      owner.session = this.instanceId;
    }
    override handle(raw: string): Promise<void> {
      frames.push({ session: this.instanceId, dir: "in", at: Date.now(), line: raw });
      return super.handle(raw);
    }
  }
  return { ...SHIPPED_FURNACE_SDK, ResidentSession: TappedSession };
}

/** The owner sessions' own Observe answers (correlated to the request that asked) and terminal frames; `skip` names the observer's session. */
function bridgeReadings(frames: readonly BridgeFrame[], skip: ReadonlySet<string>): BridgeReading[] {
  const asked = new Map<string, string>();
  const readings: BridgeReading[] = [];
  for (const frame of frames) {
    if (skip.has(frame.session)) continue;
    const line = lineOf(frame.line);
    if (line === null) continue;
    if (frame.dir === "in") {
      if (line.op === "observe" && typeof line.request_id === "string" && isRecord(line.input) && typeof line.input.execution_id === "string") asked.set(`${frame.session} ${line.request_id}`, line.input.execution_id);
      continue;
    }
    const at = new Date(frame.at).toISOString();
    if (line.op === "observe" && typeof line.request_id === "string" && isRecord(line.output) && typeof line.output.status === "string") {
      const executionId = asked.get(`${frame.session} ${line.request_id}`);
      if (executionId !== undefined) readings.push({ session: frame.session, executionId, kind: "observe", status: line.output.status, at });
    } else if (isRecord(line.event) && line.event.kind === "terminal" && typeof line.event.execution_id === "string") {
      const payload = line.event.payload;
      const status = isRecord(payload) && isRecord(payload.result) && typeof payload.result.status === "string" ? payload.result.status : "unreadable";
      readings.push({ session: frame.session, executionId: line.event.execution_id, kind: "terminal", status, at });
    }
  }
  return readings;
}

function attemptRecord(row: AttemptDto): FurnaceAttemptRecord {
  const identity = row.executor_identity;
  return {
    attemptId: row.attempt_id,
    ordinal: row.ordinal,
    workId: row.work_id,
    state: row.state,
    outcome: row.outcome ?? null,
    controllerSessionId: row.controller_session_id,
    identity: identity ? { hostInstanceId: identity.host_instance_id, receipt: identity.receipt, executionId: identity.execution_id } : null,
    cancel: row.cancel ? { reason: row.cancel.reason, requestedAt: row.cancel.requested_at, terminalObservedAt: row.cancel.terminal_observed_at ?? null } : null,
    finishedAt: row.finished_at ?? null,
  };
}

function eventRecord(row: EventsListDto["events"][number]): FurnaceEventRecord {
  return {
    sequence: typeof row.sequence === "number" ? row.sequence : -1,
    type: textOrNull(row.type) ?? "",
    attemptId: textOrNull(row.attempt_id),
    controllerSessionId: textOrNull(row.controller_session_id) ?? "",
    requestId: textOrNull(row.request_id) ?? "",
    source: textOrNull(row.source),
    cause: textOrNull(row.cause),
    timestamp: textOrNull(row.timestamp) ?? "",
  };
}

/** Furnace's own record of one Run: run status, every Attempt as `attempt inspect` holds it, and the whole event history. */
async function furnaceRecordsOf(client: FurnaceClient, runId: string) {
  const status = await client.runs.status(runId, { timeoutMs: 30_000 });
  const listed = await client.attempts.list(runId, {}, { timeoutMs: 30_000 });
  const attempts: FurnaceAttemptRecord[] = [];
  for (const row of listed.data.attempts) attempts.push(attemptRecord((await client.attempts.inspect(row.attempt_id, { timeoutMs: 30_000 })).data));
  const events: FurnaceEventRecord[] = [];
  let complete = false;
  let after: string | null = null;
  for (let page = 0; page < 20 && !complete; page++) {
    const listedEvents = await client.events.list(runId, after === null ? {} : { after }, { timeoutMs: 30_000 });
    for (const row of listedEvents.data.events) events.push(eventRecord(row));
    complete = listedEvents.data.complete;
    after = listedEvents.data.next_cursor;
    if (after === null) break;
  }
  return { runState: status.data.state, attention: status.data.attention.map((row) => row.attempt_id), attempts, events, eventsComplete: complete };
}

/** The bridge socket a hosted Run's config names (the host's own `host.sock`). */
function socketOf(config: string | undefined): string {
  const socket = config === undefined ? undefined : /"([^"]+\/host\.sock)"/.exec(readFileSync(config, "utf8"))?.[1];
  if (socket === undefined) throw new Error("the hosted Run's config names no bridge socket");
  return socket;
}

const OBSERVER_CANCEL = "observer-cancel";
const OBSERVER_OBSERVE = "observer-observe";
/** A non-owner's own bridge connection: Hello, then Cancel and Observe for an execution another session admitted. */
async function strangerReplies(socketPath: string, executionId: string, receipt: string): Promise<{ session: string; cancelReply: Record<string, unknown> | null; observeReply: Record<string, unknown> | null }> {
  const socket = connect(socketPath);
  socket.on("error", () => undefined);
  const lines: Record<string, unknown>[] = [];
  createInterface({ input: socket }).on("line", (raw) => {
    const line = lineOf(raw);
    if (line !== null) lines.push(line);
  });
  await new Promise<void>((resolve, reject) => {
    socket.once("connect", () => resolve());
    socket.once("error", reject);
  });
  const reply = async (op: string, requestId: string): Promise<Record<string, unknown> | null> => {
    for (let i = 0; i < 400; i++) {
      const found = lines.find((line) => line.op === op && line.request_id === requestId);
      if (found !== undefined) return found;
      await sleep(25);
    }
    return null;
  };
  try {
    socket.write(`${JSON.stringify({ input: { supported_protocol_versions: [1] }, op: "hello", request_id: "observer-hello" })}\n`);
    const hello = await reply("hello", "observer-hello");
    const host = isRecord(hello?.output) && isRecord(hello.output.host) ? hello.output.host : undefined;
    const session = typeof host?.instance_id === "string" ? host.instance_id : "";
    socket.write(`${JSON.stringify({ input: { execution_id: executionId, reason: "operator_stop" }, op: "cancel", protocol_version: 1, request_id: OBSERVER_CANCEL })}\n`);
    const cancelReply = await reply("cancel", OBSERVER_CANCEL);
    socket.write(`${JSON.stringify({ input: { execution_id: executionId, receipt }, op: "observe", protocol_version: 1, request_id: OBSERVER_OBSERVE })}\n`);
    const observeReply = await reply("observe", OBSERVER_OBSERVE);
    return { session, cancelReply, observeReply };
  } finally {
    socket.end();
  }
}

function requireBinary(name: string): void {
  const probe = spawnSync(name, ["--version"], { encoding: "utf8" });
  if (probe.status !== 0) {
    process.stderr.write(`furnace-hosted live tier requires \`${name}\` on PATH (exit 2).\n`);
    process.exit(2);
  }
}

function disposableWorkspace(): string {
  const root = realpathSync(mkdtempSync("/tmp/pi-furnace-hosted."));
  try {
    seedWorkspace(root);
  } catch (error) {
    rmSync(root, { recursive: true, force: true });
    throw error;
  }
  return root;
}

function seedWorkspace(root: string): void {
  execFileSync("git", ["init", "-q", root]);
  execFileSync("bd", ["init", "--quiet"], { cwd: root, env: { ...process.env, BD_NON_INTERACTIVE: "1" }, stdio: "pipe" });
  mkdirSync(join(root, ".beads/formulas"), { recursive: true });
  const steps = (ids: string[]): string => ids.map((id, index) => `[[steps]]\nid = "${id}"\ntitle = "fixture ${id}"\ndescription = "Fixture step ${id}."\n${index > 0 ? `needs = ["${ids[index - 1]}"]\n` : ""}`).join("\n");
  writeFileSync(join(root, ".beads/formulas/hosted-pair.formula.toml"), `formula = "hosted-pair"\ntype = "workflow"\nversion = 1\n\n${steps(["first", "second"])}`);
  writeFileSync(join(root, ".beads/formulas/hosted-single.formula.toml"), `formula = "hosted-single"\ntype = "workflow"\nversion = 1\n\n${steps(["only"])}`);
}

let workspace: string;
beforeAll(async () => {
  requireBinary("furnace");
  requireBinary("bd");
  workspace = disposableWorkspace();
  expect(workspace).toMatch(/^\/tmp\/pi-furnace-hosted\.[^/]+$/);
});

afterAll(() => {
  if (workspace && /^\/tmp\/pi-furnace-hosted\.[^/]+$/.test(workspace)) rmSync(workspace, { recursive: true, force: true });
});

describe("Furnace-hosted adapter over the real bridge (disposable /tmp workspace, wisp mode)", () => {
  it("serves a Run's sequential Attempts on one kept bridge session, receipts each by its own admission receipt, and agrees with Furnace's persisted executor_identity", async () => {
    const before = mainTreeState();
    const ran: string[] = [];
    const workflow: HostedWorkflow = async ({ identity }) => {
      ran.push(identity.attemptId);
      return { status: "success", summary: `fixture ${identity.ordinal}` };
    };
    const furnace = { binary: "furnace", cwd: workspace, stateDir: join(workspace, ".furnace-hosted-state"), timeoutMs: 60_000 };
    const executor = new FurnaceHostedExecutor({ executor: "pi-hosted", workflow, sdk: SHIPPED_FURNACE_SDK, furnace, startTimeoutMs: 120_000 });
    try {
      const started = await executor.start({ formula: "hosted-pair" });
      const client = new SHIPPED_FURNACE_SDK.Furnace(furnace);
      const status = await client.runs.get(started.runId).status({ timeoutMs: 30_000 });
      const attempts = await client.attempts.list(started.runId, {}, { timeoutMs: 30_000 });
      const receipt = executor.receipt();
      const identityOf = new Map<string, unknown>();
      for (const row of receipt.attempts) identityOf.set(row.attemptId, (await client.attempts.inspect(row.attemptId, { timeoutMs: 30_000 })).data.executor_identity);
      process.stdout.write(`\nHOSTED-RECEIPT-PAIR ${JSON.stringify({ run: receipt.run, runState: status.data.state, furnaceAttempts: attempts.data.attempts.map((a) => [a.attempt_id, a.ordinal, a.state, a.outcome]), receipt: receipt.attempts.map((a) => [a.attemptId, a.ordinal, a.sessionInstanceId, a.executionId, a.admissionReceipt, a.terminal]), sessions: receipt.sessions, executorIdentity: receipt.attempts.map((a) => identityOf.get(a.attemptId)) })}\n`);
      expect(status.data.state).toBe("completed");
      expect(attempts.data.attempts).toHaveLength(2);
      expect(attempts.data.attempts.map((a) => a.state)).toEqual(["succeeded", "succeeded"]);
      // Furnace lists Attempts by Work then ordinal; the adapter receipts them in admission order. Compare as sets.
      const identities = (rows: Array<[string, number]>): Array<[string, number]> => rows.sort((a, b) => a[0].localeCompare(b[0]));
      expect(identities(receipt.attempts.map((a) => [a.attemptId, a.ordinal]))).toEqual(identities(attempts.data.attempts.map((a) => [a.attempt_id, a.ordinal])));
      expect(ran).toEqual(receipt.attempts.map((a) => a.attemptId));
      expect(new Set(receipt.attempts.map((a) => a.admissionReceipt)).size).toBe(2);
      // One kept connection serves a Run's sequential Attempts (executor-platform.md §6; measured on furnace 0.1.0
      // 9970621d87e0, receipts/wb-zby.1.md). A driver that stops keeping the connection reds this row — the intended falsifier.
      const sessions = new Set(receipt.attempts.map((a) => a.sessionInstanceId));
      expect(sessions.size).toBe(1);
      const [s] = sessions;
      expect(receipt.sessions).toEqual([{ sessionInstanceId: s, admissionReceipts: receipt.attempts.map((a) => a.admissionReceipt) }]);
      for (const [i, row] of receipt.attempts.entries()) {
        // The SDK mints receipts as <instance_id>/<process token>/<n> (ResidentSession.mintReceipt, @furnace/sdk at Furnace 9970621d8).
        expect(row.admissionReceipt).toMatch(new RegExp(`^${s}/[0-9a-f]{16}/${i + 1}$`));
        expect(identityOf.get(row.attemptId)).toMatchObject({ host_instance_id: row.sessionInstanceId, receipt: row.admissionReceipt, execution_id: row.executionId });
      }
      expect(receipt.attempts.every((a) => a.terminal === "success")).toBe(true);
      expect(receipt.identityViolations).toEqual([]);
    } finally {
      await executor.close();
    }
    expect(mainTreeState()).toBe(before);
  });

  it("cancels cooperatively on an operator Attempt stop: the workflow halts and no effect follows the abort", async () => {
    const before = mainTreeState();
    const effects: number[] = [];
    let abortedAtEffects = -1;
    const workflow: HostedWorkflow = async ({ signal }) => {
      for (let step = 1; step <= 2000; step++) {
        if (signal.aborted) {
          abortedAtEffects = effects.length;
          return { status: "cancelled", summary: `stopped before step ${step}` } satisfies HostedOutcome;
        }
        effects.push(step);
        await sleep(25);
      }
      return { status: "success" };
    };
    const furnace = { binary: "furnace", cwd: workspace, stateDir: join(workspace, ".furnace-hosted-state-cancel"), timeoutMs: 60_000 };
    const executor = new FurnaceHostedExecutor({ executor: "pi-hosted-cancel", workflow, sdk: SHIPPED_FURNACE_SDK, furnace, startTimeoutMs: 120_000, cancelGraceMs: 10_000 });
    try {
      const starting = executor.start({ formula: "hosted-single" });
      const client = new SHIPPED_FURNACE_SDK.Furnace(furnace);
      let attemptId: string | undefined;
      for (let i = 0; i < 400 && attemptId === undefined; i++) {
        attemptId = executor.receipt().attempts[0]?.attemptId;
        if (attemptId === undefined) await sleep(50);
      }
      expect(attemptId).toBeDefined();
      await sleep(300);
      const stop = await client.attempts.stop(attemptId as string, { timeoutMs: 30_000 });
      const started = await starting;
      const receipt = executor.receipt();
      const attempt = receipt.attempts[0];
      const frozen = effects.length;
      await sleep(500);
      const inspected = await client.attempts.inspect(attemptId as string, { timeoutMs: 30_000 });
      process.stdout.write(`\nHOSTED-RECEIPT-CANCEL ${JSON.stringify({ run: receipt.run, stopKind: stop.kind, attemptState: inspected.data.state, attemptOutcome: inspected.data.outcome, receipt: attempt, sessions: receipt.sessions, effectsAtAbort: abortedAtEffects, effectsAfter: effects.length })}\n`);
      expect(started.runId).toBe(receipt.run?.runId);
      expect(attempt).toMatchObject({ terminal: "cancelled", cancel: { requested: true }, unsettledAfterCancel: false });
      expect(attempt?.cancel.reason).toMatch(/operator_stop/);
      expect(abortedAtEffects).toBeGreaterThan(0);
      expect(effects.length).toBe(frozen);
      expect(frozen).toBe(abortedAtEffects);
      expect(inspected.data.state).toBe("cancelled");
    } finally {
      await executor.close();
    }
    expect(mainTreeState()).toBe(before);
  });

  // wb-3hc: the operator's `attempt stop` and `work retry` against a real Run whose first Attempt never acknowledges
  // its child Run's establishment. Measured, never asserted in advance: whether the retry runs in the kept bridge
  // session or a new one (the receipt's measured.retrySession).
  it("RETRY: an operator work retry after the uncertain Attempt's stop establishes exactly once per Attempt, originates only from the operator, and the bridge's Observe answers agree with Furnace's records", async () => {
    const before = mainTreeState();
    const frames: BridgeFrame[] = [];
    const markers: string[] = [];
    let config: string | undefined;
    let firstSignal: AbortSignal | undefined;
    const workflow: HostedWorkflow = async ({ identity, signal }) => {
      markers.push(identity.attemptId);
      if (identity.ordinal !== 1) return { status: "success", summary: "operator retry" };
      firstSignal = signal;
      // The child Run's establishment is never acknowledged: the Attempt waits for the operator, bounded.
      await Promise.race([new Promise<void>((resolve) => signal.addEventListener("abort", () => resolve(), { once: true })), sleep(60_000)]);
      // Keep running briefly after the stop, so Furnace's cancel wait reads the session's Observe answers.
      await sleep(800);
      return { status: "cancelled", summary: "child Run establishment not acknowledged" } satisfies HostedOutcome;
    };
    const furnace = { binary: "furnace", cwd: workspace, stateDir: join(workspace, ".furnace-hosted-state-retry"), timeoutMs: 60_000 };
    const createClient = (options: FurnaceOptions): FurnaceHostedClient => {
      config = options.config;
      const client = new SHIPPED_FURNACE_SDK.Furnace(options);
      return { runs: { start: (request, call) => client.runs.start(request, call) } };
    };
    const executor = new FurnaceHostedExecutor({ executor: "pi-hosted-retry", workflow, sdk: tappedSdk(frames), furnace, createClient, startTimeoutMs: 120_000, cancelGraceMs: 10_000 });
    const read = new SHIPPED_FURNACE_SDK.Furnace(furnace);
    const readings: FurnaceReading[] = [];
    const readAsObserver = async (runId: string): Promise<void> => {
      const listed = await read.attempts.list(runId, {}, { timeoutMs: 30_000 });
      const at = new Date().toISOString();
      for (const row of listed.data.attempts) readings.push({ at, attemptId: row.attempt_id, state: row.state, cancelRequested: row.cancel !== undefined });
    };
    let observation: OperatorRetryObservation | undefined;
    try {
      const starting = executor.start({ formula: "hosted-single" }).then(
        () => ({ resolved: true, error: null }),
        (error: unknown) => ({ resolved: false, error: messageOf(error) }),
      );
      let first = executor.receipt().attempts[0];
      for (let i = 0; i < 400 && first === undefined; i++) {
        await sleep(50);
        first = executor.receipt().attempts[0];
      }
      if (first === undefined) throw new Error("the first Attempt was never admitted");
      await sleep(300);
      await readAsObserver(first.runId);
      await readAsObserver(first.runId);
      const stranger = await strangerReplies(socketOf(config), first.executionId, first.admissionReceipt);
      await sleep(300);
      const ownerAbortedBeforeStop = firstSignal?.aborted === true;
      const stop = await read.attempts.stop(first.attemptId, { timeoutMs: 30_000 });
      const start = await starting;
      await readAsObserver(first.runId);
      // The operator path, argv.d.ts workRetry: `work retry <work> --run <run> --json`, with the Run's own config.
      const retryArgv = argv.workRetry(first.workId, { runId: first.runId }, {});
      const operator = new SHIPPED_FURNACE_SDK.Furnace({ ...furnace, config });
      let retry: OperatorRetryObservation["retry"];
      try {
        const replied = await operator.work.retry(first.workId, { runId: first.runId }, { timeoutMs: 90_000 });
        retry = { kind: replied.kind, ok: true, code: null, argv: retryArgv };
      } catch (error) {
        retry = { kind: null, ok: false, code: codeOf(error), argv: retryArgv };
      }
      await readAsObserver(first.runId);
      const records = await furnaceRecordsOf(read, first.runId);
      observation = {
        start,
        stop: { kind: stop.kind, requestId: stop.requestId },
        retry,
        receipt: executor.receipt(),
        receiptAfterClose: null,
        markers: [...markers],
        runStateAfterRetry: records.runState,
        furnaceAttempts: records.attempts,
        events: records.events,
        eventsComplete: records.eventsComplete,
        bridge: bridgeReadings(frames, new Set([stranger.session])),
        observer: { cancelRequestId: OBSERVER_CANCEL, observeRequestId: OBSERVER_OBSERVE, cancelReply: stranger.cancelReply, observeReply: stranger.observeReply, ownerAbortedBeforeStop, readings },
      };
    } finally {
      await executor.close();
    }
    if (observation === undefined) throw new Error("the operator-retry scenario was not observed");
    liveObserved.operatorRetry = { ...observation, receiptAfterClose: executor.receipt() };
    const assessed = assessRetryLive({ operatorRetry: liveObserved.operatorRetry, uncertainPark: null });
    process.stdout.write(`\nHOSTED-RECEIPT-RETRY ${JSON.stringify({ measured: assessed.measured, findings: assessed.findings, unrealised: assessed.unrealised })}\n`);
    expect(assessed.unrealised.map((gap) => gap.step)).toEqual(["uncertain-park"]);
    expect(assessed.findings).toEqual([]);
    expect(argv.workRetry("w", { runId: "r" }, {})).toEqual(["work", "retry", "w", "--run", "r", "--json"]);
    expect(clientOperations.find((operation) => operation.builder === "workRetry")).toMatchObject({ operation: "Work.retry", kind: "work_retry" });
    expect(mainTreeState()).toBe(before);
  });

  // wb-3hc: the first Attempt settles indeterminate, so Furnace parks it; then the operator tries `work retry`. The row
  // asserts Furnace's own records of the park; the adapter's report of the parked start (parked-start-misreported,
  // operator-retry-unreachable: wb-3hc finding F1) is recorded in the receipt and deliberately not asserted here.
  it("PARK: an indeterminate first Attempt is parked by Furnace (needs_reconciliation, Run needs_attention) and never retried by anyone; the adapter's report of the parked start is recorded, not asserted", async () => {
    const before = mainTreeState();
    const frames: BridgeFrame[] = [];
    const markers: string[] = [];
    let config: string | undefined;
    const workflow: HostedWorkflow = async ({ identity }) => {
      markers.push(identity.attemptId);
      if (identity.ordinal !== 1) return { status: "success", summary: "operator retry" };
      return { status: "indeterminate", summary: "child Run establishment not acknowledged" };
    };
    const furnace = { binary: "furnace", cwd: workspace, stateDir: join(workspace, ".furnace-hosted-state-park"), timeoutMs: 60_000 };
    const createClient = (options: FurnaceOptions): FurnaceHostedClient => {
      config = options.config;
      const client = new SHIPPED_FURNACE_SDK.Furnace(options);
      return { runs: { start: (request, call) => client.runs.start(request, call) } };
    };
    const executor = new FurnaceHostedExecutor({ executor: "pi-hosted-park", workflow, sdk: tappedSdk(frames), furnace, createClient, startTimeoutMs: 120_000 });
    const read = new SHIPPED_FURNACE_SDK.Furnace(furnace);
    let observation: UncertainParkObservation | undefined;
    try {
      let start: UncertainParkObservation["start"];
      try {
        await executor.start({ formula: "hosted-single" });
        start = { resolved: true, error: null, category: null };
      } catch (error) {
        start = { resolved: false, error: messageOf(error), category: isRecord(error) && typeof error.category === "string" ? error.category : null };
      }
      const receipt = executor.receipt();
      // This row's own state directory holds exactly the Run its start created, whatever the adapter reported.
      const runs = await read.runs.list({}, { timeoutMs: 30_000 });
      const runId = runs.data.runs.length === 1 ? (runs.data.runs[0]?.run_id ?? null) : null;
      const records = runId === null ? null : await furnaceRecordsOf(read, runId);
      const parkedMarkers = [...markers];
      const parkedBridge = bridgeReadings(frames, new Set());
      const workId = receipt.attempts[0]?.workId;
      let retry: UncertainParkObservation["retry"] = { attempted: false, ok: false, code: null, kind: null };
      let attemptsAfterRetry: number | null = null;
      if (runId !== null && workId !== undefined) {
        const operator = new SHIPPED_FURNACE_SDK.Furnace({ ...furnace, config });
        try {
          const replied = await operator.work.retry(workId, { runId }, { timeoutMs: 90_000 });
          retry = { attempted: true, ok: true, code: null, kind: replied.kind };
        } catch (error) {
          retry = { attempted: true, ok: false, code: codeOf(error), kind: null };
        }
        attemptsAfterRetry = (await read.attempts.list(runId, {}, { timeoutMs: 30_000 })).data.attempts.length;
      }
      observation = {
        start,
        receipt,
        markers: parkedMarkers,
        runId,
        runState: records?.runState ?? null,
        attention: records?.attention ?? [],
        furnaceAttempts: records?.attempts ?? [],
        events: records?.events ?? [],
        eventsComplete: records?.eventsComplete ?? false,
        bridge: parkedBridge,
        retry,
        attemptsAfterRetry,
      };
    } finally {
      await executor.close();
    }
    if (observation === undefined) throw new Error("the uncertain-park scenario was not observed");
    liveObserved.uncertainPark = observation;
    const assessed = assessRetryLive({ operatorRetry: null, uncertainPark: observation });
    process.stdout.write(`\nHOSTED-RECEIPT-PARK ${JSON.stringify({ measured: assessed.measured, findings: assessed.findings, unrealised: assessed.unrealised })}\n`);
    expect(assessed.unrealised.map((gap) => gap.step)).toEqual(["operator-retry"]);
    const adapterReport = new Set(["parked-start-misreported", "operator-retry-unreachable"]);
    expect(assessed.findings.filter((finding) => !adapterReport.has(finding.rule))).toEqual([]);
    expect(mainTreeState()).toBe(before);
  });

  it("RECEIPT: binds both measured scenarios into one LIVE receipt on the committed revision and prints it producer-side", async () => {
    const read = new SHIPPED_FURNACE_SDK.Furnace({ binary: "furnace", cwd: workspace, timeoutMs: 60_000 });
    const version = (await read.version({ timeoutMs: 30_000 })).data;
    const bd = version.beads_version ?? execFileSync("bd", ["version"], { cwd: workspace, encoding: "utf8" }).trim();
    const sdk = JSON.parse(readFileSync(join(REPO, "node_modules/@furnace/sdk/package.json"), "utf8")) as { version?: unknown };
    const revision = execFileSync("git", ["-C", REPO, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
    const dirty = execFileSync("git", ["-C", REPO, "status", "--porcelain=v1"], { encoding: "utf8" }).trim() !== "";
    const receipt = buildRetryLiveReceipt({
      utc: new Date().toISOString(),
      revision,
      dirty,
      node: process.version,
      furnace: { version: version.furnace_version, protocolVersion: version.protocol_version, binaryRevision: version.binary_revision, binaryDigest: version.binary_digest ?? "unrecorded" },
      bd,
      sdk: typeof sdk.version === "string" ? sdk.version : "unrecorded",
      observed: liveObserved,
    });
    process.stdout.write(`\n${RETRY_LIVE_LINE_MARKER} ${JSON.stringify(receipt)}\n`);
    expect(receipt.tier).toBe("live");
    expect(receipt.revision).toBe(revision);
    expect(receipt.realised).toBe(true);
  });
});
