/**
 * furnace-hosted-retry-journeys.ts: the wb-0kg.4 (VC-7/W18-D) journeys -- Furnace Work retry while child Run
 * establishment is uncertain -- over the landed wb-zmd adapter's per-Attempt embedded bridge.
 *
 * ONE definition, two drivers: test/workbench-furnace-hosted-retry-fault.test.ts asserts these observations in the
 * default gate (the src adapter through vitest) and qa/workbench/furnace-hosted-retry-fault.mjs records them in the
 * FIXTURE-tier receipt (the BUILT dist adapter). The adapter class and CapabilityError are injected, so nothing here
 * imports src at runtime. Node loads this file through its built-in type stripping, so it stays ERASABLE TypeScript:
 * no enums, no namespaces, no parameter properties, and every type-only import says `import type`.
 *
 * Every retry is the scripted operator path (a NEW Attempt on a NEW bridge connection); nothing here asks Furnace or
 * the adapter to retry. The injected `runs.start` client runs the script in-process: no Furnace binary, no Furnace
 * verb, no furnace doctor, no capability probe.
 */
import { mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { connect, type Socket } from "node:net";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline";
import type { FurnaceOptions } from "@furnace/sdk";
import type { CapabilityError } from "../../src/workbench/capability-registry.js";
import type { FurnaceHostedClient, FurnaceHostedExecutor, FurnaceSdk, HostedReceipt, HostedWorkflow } from "../../src/workbench/hosts/furnace-hosted.js";

export type Line = Record<string, unknown>;

export interface RetryFaultEnv {
  /** The adapter class: src through vitest in the default gate, the BUILT dist copy in the receipt runner. */
  readonly Executor: typeof FurnaceHostedExecutor;
  readonly CapabilityError: typeof CapabilityError;
  /** The SDK: the SHIPPED vendored package in both drivers (SHIPPED_FURNACE_SDK; no copy since wb-zby.2); shippedSdkRecord() records its digests. */
  readonly sdk: FurnaceSdk;
  /** chooseScratchBase(...).path: every journey runs with TMPDIR set to a fresh private directory under it. */
  readonly scratchBase: string;
}

/** The receipt's record of the SDK both drivers drive: the SHIPPED vendored package as installed (wb-zby.2). */
export interface ShippedSdkRecord {
  readonly copy: "shipped";
  /** contract/manifest.json's smithy_model_digest, or "<none>" when the manifest states none. */
  readonly manifestDigest: string;
  /** The generated validators' SMITHY_MODEL_DIGEST (their provenance module), or "<none>" when it states none. */
  readonly provenanceDigest: string;
}

/** The generated provenance module's exported model digest. */
const PROVENANCE_DIGEST = /\bSMITHY_MODEL_DIGEST = "(sha256:[0-9a-f]{64})"/;

/** One file of the installed @furnace/sdk package (the vendored tarball as npm installed it), by package-relative path. */
function readInstalledSdkFile(path: string): string {
  return readFileSync(join(dirname(createRequire(import.meta.url).resolve("@furnace/sdk/package.json")), path), "utf8");
}

/**
 * Read an @furnace/sdk package's two model digests, each from its own file: contract/manifest.json's
 * smithy_model_digest and the generated validators' provenance SMITHY_MODEL_DIGEST, which agree since wb-zby
 * re-vendored the SDK. `read` defaults to the installed package (a test hands it an in-memory drifted package).
 * Read-only: nothing is copied or rewritten. The receipt judge realises a measurement only on copy "shipped" with two
 * well-formed, EQUAL digests, so a digest stated nowhere ("<none>") or a drifted pair is a recorded "not realised",
 * never a pass.
 */
export function shippedSdkRecord(read: (path: string) => string = readInstalledSdkFile): ShippedSdkRecord {
  const manifest: unknown = JSON.parse(read("contract/manifest.json"));
  const stated = typeof manifest === "object" && manifest !== null && "smithy_model_digest" in manifest ? manifest.smithy_model_digest : undefined;
  const provenance = PROVENANCE_DIGEST.exec(read("dist/contract/furnace-executor-contract/provenance.js"))?.[1];
  return { copy: "shipped", manifestDigest: typeof stated === "string" ? stated : "<none>", provenanceDigest: provenance ?? "<none>" };
}

/**
 * The host's Unix socket lands at <base>/pf04-XXXXXX/furnace-embedded-XXXXXX/host.sock, 46 bytes past the base, and
 * the hosts here hold socket paths to 103 bytes (the local-detached bound, wb-71q), so the base stays at or under
 * 40 BYTES.
 */
export const SCRATCH_BASE_MAX_BYTES = 40;
/** The recorded fallback only: never chosen while XDG_RUNTIME_DIR is usable (owner F5 ruling, 22:15Z). */
export const SCRATCH_FALLBACK_BASE = "/tmp";
export type ScratchSource = "xdg-runtime-dir" | "tmp-fallback";
export interface ScratchBase {
  readonly path: string;
  readonly source: ScratchSource;
  /** Why XDG_RUNTIME_DIR was not usable; present exactly when source is tmp-fallback. */
  readonly reason?: string;
}

function isDirectory(path: string): boolean {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
}

/** The host rule: XDG_RUNTIME_DIR first, /tmp only as the recorded fallback (with its reason), never first. */
export function chooseScratchBase(env: Readonly<Record<string, string | undefined>>, directory: (path: string) => boolean = isDirectory): ScratchBase {
  const fallback = (reason: string): ScratchBase => ({ path: SCRATCH_FALLBACK_BASE, source: "tmp-fallback", reason });
  const runtime = env.XDG_RUNTIME_DIR;
  if (runtime === undefined || runtime === "") return fallback("XDG_RUNTIME_DIR is unset");
  if (!runtime.startsWith("/")) return fallback("XDG_RUNTIME_DIR is not an absolute path");
  if (Buffer.byteLength(runtime) > SCRATCH_BASE_MAX_BYTES) return fallback(`XDG_RUNTIME_DIR is longer than ${SCRATCH_BASE_MAX_BYTES} bytes`);
  if (!directory(runtime)) return fallback("XDG_RUNTIME_DIR is not a directory");
  return { path: runtime, source: "xdg-runtime-dir" };
}

/** Run with TMPDIR pointing at a fresh private scratch directory under base (the host's socket lives there). */
async function withScratch<T>(base: string, run: () => Promise<T>): Promise<T> {
  const scratch = mkdtempSync(join(base, "pf04-"));
  const previous = process.env.TMPDIR;
  process.env.TMPDIR = scratch;
  try {
    return await run();
  } finally {
    if (previous === undefined) delete process.env.TMPDIR;
    else process.env.TMPDIR = previous;
    rmSync(scratch, { recursive: true, force: true });
  }
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

async function eventually(done: () => boolean, timeoutMs = 4000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (!done()) {
    if (Date.now() > deadline) return false;
    await sleep(5);
  }
  return true;
}

/** One scripted driver connection to the host's bridge socket: what Furnace's extension driver would be. */
class Bridge {
  readonly lines: Line[] = [];
  readonly socket: Socket;
  constructor(socket: Socket) {
    this.socket = socket;
    // A late error after the driver dropped its side is expected; outcomes are read from lines and the adapter receipt.
    socket.on("error", () => undefined);
    createInterface({ input: socket }).on("line", (raw) => this.lines.push(JSON.parse(raw) as Line));
  }
  static async open(socketPath: string): Promise<Bridge> {
    const socket = connect(socketPath);
    await new Promise<void>((resolve, reject) => {
      socket.once("connect", resolve);
      socket.once("error", reject);
    });
    return new Bridge(socket);
  }
  send(line: Line): void {
    this.socket.write(`${JSON.stringify(line)}\n`);
  }
  /** Write one line and drop the connection as soon as it is flushed, before any reply can be read. */
  sendThenDrop(line: Line): Promise<void> {
    return new Promise((resolve) => {
      this.socket.write(`${JSON.stringify(line)}\n`, () => {
        this.socket.destroy();
        resolve();
      });
    });
  }
  async until(match: (line: Line) => boolean, timeoutMs = 4000): Promise<Line> {
    const deadline = Date.now() + timeoutMs;
    for (;;) {
      const found = this.lines.find(match);
      if (found) return found;
      if (Date.now() > deadline) throw new Error(`bridge saw no matching line: ${JSON.stringify(this.lines)}`);
      await sleep(5);
    }
  }
  end(): void {
    this.socket.destroy();
  }
}

const context = (attemptId: string, ordinal: number) => ({
  context_version: 1,
  run: { furnace_run_id: "frn-run-fake", beads_run_id: "bd-run-fake", formula: "fixture" },
  work: { beads_work_id: "bd-work-retry", title: "fixture step", description: null, acceptance_criteria: null },
  attempt: { attempt_id: attemptId, ordinal, deadline: null },
  workspace: { root: "/tmp/fixture" },
});
const hello = async (bridge: Bridge): Promise<Line> => {
  bridge.send({ op: "hello", request_id: "h", input: { supported_protocol_versions: [1] } });
  return bridge.until((line) => line.op === "hello");
};
const executeLine = (executionId: string, attemptId: string, ordinal: number): Line => ({
  op: "execute",
  protocol_version: 1,
  request_id: `e-${executionId}`,
  input: { execution_id: executionId, executor: "pi-hosted", context: context(attemptId, ordinal) },
});
const execute = (bridge: Bridge, executionId: string, attemptId: string, ordinal: number): void => bridge.send(executeLine(executionId, attemptId, ordinal));
interface BridgeEvent {
  readonly execution_id?: string;
  readonly kind?: string;
  readonly payload?: { readonly result?: { readonly status: string } };
}
const eventOf = (line: Line): BridgeEvent => (line.event ?? {}) as BridgeEvent;
const terminalOf = (bridge: Bridge, executionId: string): Promise<Line> => bridge.until((line) => eventOf(line).execution_id === executionId && eventOf(line).kind === "terminal");
const statusOf = (terminal: Line): string | null => eventOf(terminal).payload?.result?.status ?? null;

/** Open one Attempt connection, send execute, and wait until the workflow is running (started event). */
async function beginAttempt(socketPath: string, attemptId: string, ordinal: number): Promise<Bridge> {
  const bridge = await Bridge.open(socketPath);
  await hello(bridge);
  execute(bridge, `ex-${attemptId}`, attemptId, ordinal);
  await bridge.until((line) => eventOf(line).kind === "started");
  return bridge;
}

const socketOf = (options: FurnaceOptions): string => {
  const text = readFileSync(options.config ?? "", "utf8");
  const args = /args = \[("[^"]*"), ("[^"]*")\]/.exec(text);
  if (!args?.[2]) throw new Error(`no bridge socket in config:\n${text}`);
  return JSON.parse(args[2]) as string;
};

/** The adapter under the injected client: `runs.start` runs the scripted operator path against the host's socket. */
function harness(env: RetryFaultEnv, workflow: HostedWorkflow, script: (socketPath: string) => Promise<void>, cancelGraceMs = 200): FurnaceHostedExecutor {
  const createClient = (options: FurnaceOptions): FurnaceHostedClient => ({
    runs: {
      async start() {
        await script(socketOf(options));
        return { record: { run_id: "frn-run-fake", beads_run_id: "bd-run-fake" }, requestId: "req-fake" };
      },
    },
  });
  return new env.Executor({ executor: "pi-hosted", workflow, sdk: env.sdk, createClient, cancelGraceMs });
}

/** The adapter receipt and the establishment markers just after start returned, and again after executor.close(). */
export interface Settled {
  readonly beforeClose: HostedReceipt;
  readonly markersBeforeClose: readonly string[];
  readonly afterClose: HostedReceipt;
  readonly markersAfterClose: readonly string[];
}
async function startThenClose(executor: FurnaceHostedExecutor, markers: readonly string[]): Promise<Settled> {
  const before = await executor.start({ formula: "fixture" }).then(
    () => ({ receipt: executor.receipt(), markers: [...markers] }),
    async (error: unknown) => {
      await executor.close();
      throw error;
    },
  );
  await executor.close();
  return { beforeClose: before.receipt, markersBeforeClose: before.markers, afterClose: executor.receipt(), markersAfterClose: [...markers] };
}

/** Records each Attempt's establishment marker; the FIRST Attempt then parks until its signal aborts, the retry succeeds. */
function parkFirstAttempt(markers: string[]): HostedWorkflow {
  return async ({ identity, signal }) => {
    markers.push(identity.attemptId);
    if (identity.ordinal === 1) {
      if (!signal.aborted) await new Promise<void>((resolve) => signal.addEventListener("abort", () => resolve(), { once: true }));
      return { status: "indeterminate", summary: "establishment not acknowledged" };
    }
    return { status: "success", summary: "retried attempt done" };
  };
}

export interface LostConnectionRetry extends Settled {
  readonly armed: boolean;
  readonly droppedAfterStarted: boolean;
  readonly retriedWireStatus: string | null;
}
/** The driver connection is lost after the started event; the operator retries as a NEW Attempt on a NEW connection. */
export async function lostConnectionRetry(env: RetryFaultEnv): Promise<LostConnectionRetry> {
  return withScratch(env.scratchBase, async () => {
    const markers: string[] = [];
    const seen: { dropped: boolean; retried: string | null } = { dropped: false, retried: null };
    const executor = harness(env, parkFirstAttempt(markers), async (socketPath) => {
      const first = await beginAttempt(socketPath, "frn-atm-r1", 1);
      first.end(); // establishment acknowledgment never arrives: the driver connection is lost
      seen.dropped = true;
      await sleep(30);
      // Operator-confirmed destructive work retry: a NEW Attempt on a NEW connection.
      const second = await Bridge.open(socketPath);
      await hello(second);
      execute(second, "ex-frn-atm-r2", "frn-atm-r2", 2);
      seen.retried = statusOf(await terminalOf(second, "ex-frn-atm-r2"));
      second.end();
    });
    const settled = await startThenClose(executor, markers);
    return { armed: seen.dropped && seen.retried !== null, droppedAfterStarted: seen.dropped, retriedWireStatus: seen.retried, ...settled };
  });
}

export interface ExplicitUncertainRetry extends Settled {
  readonly armed: boolean;
  readonly wireStatuses: readonly string[];
}
/** The first Attempt's workflow reports an uncertain effect; the operator retries as a NEW Attempt on a NEW connection. */
export async function explicitUncertainRetry(env: RetryFaultEnv): Promise<ExplicitUncertainRetry> {
  return withScratch(env.scratchBase, async () => {
    const markers: string[] = [];
    const workflow: HostedWorkflow = async ({ identity }) => {
      markers.push(identity.attemptId);
      if (identity.ordinal === 1) throw new env.CapabilityError("uncertain-effect", "run establishment may have happened");
      return { status: "success" };
    };
    const wireStatuses: string[] = [];
    const executor = harness(env, workflow, async (socketPath) => {
      for (const [index, attemptId] of ["frn-atm-u1", "frn-atm-u2"].entries()) {
        const bridge = await Bridge.open(socketPath);
        await hello(bridge);
        execute(bridge, `ex-${attemptId}`, attemptId, index + 1);
        wireStatuses.push(statusOf(await terminalOf(bridge, `ex-${attemptId}`)) ?? "none");
        bridge.end();
      }
    });
    const settled = await startThenClose(executor, markers);
    return { armed: wireStatuses.length === 2, wireStatuses, ...settled };
  });
}

export interface SameAttemptReexecution {
  readonly armed: boolean;
  readonly wireStatuses: readonly string[];
  readonly beforeClose: HostedReceipt;
  readonly afterClose: HostedReceipt;
}
/** A Furnace-style re-execution of the SAME Attempt id: the adapter must record it as a violation, never accept it as a retry. */
export async function sameAttemptReexecution(env: RetryFaultEnv): Promise<SameAttemptReexecution> {
  return withScratch(env.scratchBase, async () => {
    const workflow: HostedWorkflow = async () => ({ status: "success" });
    const wireStatuses: string[] = [];
    const executor = harness(env, workflow, async (socketPath) => {
      for (const executionId of ["ex-a", "ex-b"]) {
        const bridge = await Bridge.open(socketPath);
        await hello(bridge);
        execute(bridge, executionId, "frn-atm-same", 1);
        wireStatuses.push(statusOf(await terminalOf(bridge, executionId)) ?? "none");
        bridge.end();
      }
    });
    const { beforeClose, afterClose } = await startThenClose(executor, []);
    return { armed: wireStatuses.length === 2, wireStatuses, beforeClose, afterClose };
  });
}

export interface ObserverNoControl {
  readonly armed: boolean;
  readonly cancelRequestId: string;
  readonly observeRequestId: string;
  readonly cancelReply: Line | null;
  readonly observeReply: Line | null;
  readonly aborted: boolean | null;
  readonly ownerWireStatus: string | null;
  readonly beforeClose: HostedReceipt;
  readonly afterClose: HostedReceipt;
}
const OBSERVER_CANCEL_REQUEST = "oc";
const OBSERVER_OBSERVE_REQUEST = "oo";
/** A second connection without ownership cancels and observes the owner's running execution. */
export async function observerNoControl(env: RetryFaultEnv): Promise<ObserverNoControl> {
  return withScratch(env.scratchBase, async () => {
    const seen: { aborted: boolean | null; cancelReply: Line | null; observeReply: Line | null; owner: string | null } = { aborted: null, cancelReply: null, observeReply: null, owner: null };
    const workflow: HostedWorkflow = async ({ signal }) => {
      await sleep(120);
      seen.aborted = signal.aborted;
      return { status: "success" };
    };
    const executor = harness(env, workflow, async (socketPath) => {
      const owner = await beginAttempt(socketPath, "frn-atm-o1", 1);
      const observer = await Bridge.open(socketPath);
      await hello(observer);
      observer.send({ op: "cancel", protocol_version: 1, request_id: OBSERVER_CANCEL_REQUEST, input: { execution_id: "ex-frn-atm-o1", reason: "operator_stop" } });
      seen.cancelReply = await observer.until((line) => line.op === "cancel");
      observer.send({ op: "observe", protocol_version: 1, request_id: OBSERVER_OBSERVE_REQUEST, input: { execution_id: "ex-frn-atm-o1" } });
      seen.observeReply = await observer.until((line) => line.op === "observe");
      observer.end();
      seen.owner = statusOf(await terminalOf(owner, "ex-frn-atm-o1"));
      owner.end();
    });
    const { beforeClose, afterClose } = await startThenClose(executor, []);
    return {
      armed: seen.cancelReply !== null && seen.observeReply !== null && seen.owner !== null && seen.aborted !== null,
      cancelRequestId: OBSERVER_CANCEL_REQUEST,
      observeRequestId: OBSERVER_OBSERVE_REQUEST,
      cancelReply: seen.cancelReply,
      observeReply: seen.observeReply,
      aborted: seen.aborted,
      ownerWireStatus: seen.owner,
      beforeClose,
      afterClose,
    };
  });
}

export interface DropBeforeAdmissionReply extends Settled {
  readonly armed: boolean;
  readonly droppedBeforeReply: boolean;
  readonly admissionReplySeen: boolean;
  readonly firstReachedHost: boolean;
  readonly retriedWireStatus: string | null;
}
/**
 * The spec's literal fault point, between Attempt start and establishment acknowledgment: the execute line is
 * flushed and the connection is gone before the admission reply can be read; the operator then retries as a NEW
 * Attempt on a NEW connection.
 */
export async function dropBeforeAdmissionReply(env: RetryFaultEnv): Promise<DropBeforeAdmissionReply> {
  return withScratch(env.scratchBase, async () => {
    const markers: string[] = [];
    const seen: { dropped: boolean; replySeen: boolean; reached: boolean; retried: string | null } = { dropped: false, replySeen: false, reached: false, retried: null };
    const executor = harness(env, parkFirstAttempt(markers), async (socketPath) => {
      const first = await Bridge.open(socketPath);
      await hello(first);
      await first.sendThenDrop(executeLine("ex-frn-atm-d1", "frn-atm-d1", 1));
      seen.dropped = true;
      seen.replySeen = first.lines.some((line) => line.op === "execute" || line.event !== undefined);
      seen.reached = await eventually(() => markers.includes("frn-atm-d1"));
      // Operator-confirmed destructive work retry: a NEW Attempt on a NEW connection.
      const second = await Bridge.open(socketPath);
      await hello(second);
      execute(second, "ex-frn-atm-d2", "frn-atm-d2", 2);
      seen.retried = statusOf(await terminalOf(second, "ex-frn-atm-d2"));
      second.end();
    });
    const settled = await startThenClose(executor, markers);
    return {
      armed: seen.dropped && !seen.replySeen && seen.reached && seen.retried !== null,
      droppedBeforeReply: seen.dropped,
      admissionReplySeen: seen.replySeen,
      firstReachedHost: seen.reached,
      retriedWireStatus: seen.retried,
      ...settled,
    };
  });
}

/** The grace the dangling-timer measurement runs under: long enough that a leaked grace timer is still alive when it is counted. */
export const SETTLED_CLOSE_GRACE_MS = 5000;
const activeTimeouts = (): number => process.getActiveResourcesInfo().filter((name) => name === "Timeout").length;
/**
 * wb-nl8.1: the refed-Timeout count once two consecutive samples quietMs apart agree. A transient shorter than quietMs
 * (the vitest runner's 100 ms task-update throttle is the named class) cannot sit in two consecutive samples, so it is
 * never counted; the two timers the census rows exist for live SETTLED_CLOSE_GRACE_MS. The sleep is itself a Timeout
 * and is gone once awaited. The deadline only bounds the wait: the row's assertion stays the sole judge, so the poll
 * never throws and never seeks a value.
 */
async function quiescentTimeouts(quietMs = 150, deadlineMs = 1500): Promise<number> {
  const deadline = Date.now() + deadlineMs;
  let last = activeTimeouts();
  while (Date.now() < deadline) {
    await sleep(quietMs);
    const next = activeTimeouts();
    if (next === last) return next;
    last = next;
  }
  return last;
}
/** The three Attempts that settle success before close(); the sensitivity control parks a fourth until close() aborts it. */
const SETTLED_ATTEMPT_IDS = ["frn-atm-t1", "frn-atm-t2", "frn-atm-t3"] as const;
export const SETTLED_CLOSE_CONTROL_ATTEMPT = "frn-atm-t4";

export interface SettledCloseTimers {
  readonly armed: boolean;
  readonly settledAttempts: number;
  readonly timeoutsBeforeClose: number;
  readonly timeoutsAfterClose: number;
  readonly afterClose: HostedReceipt;
  /** Churn knob receipts (wb-nl8.1): the churn that actually armed, so a no-op knob cannot pass a churn row trivially. All false/0 on the roster rows. */
  readonly churn: SettledCloseChurnReceipt;
}
/** settledCloseTimers plus the sensitivity control's own fact (wb-19q member 18, wb-21k F2). */
export interface SettledCloseTimersControl extends SettledCloseTimers {
  /** True once close()'s abort of the parked control Attempt armed the control timer; the timer is cleared after the after-close count. */
  readonly controlTimerArmed: boolean;
  /** wb-nl8.1: true when the control timer had already EXPIRED (armed >= SETTLED_CLOSE_GRACE_MS before the after-close census): a close() that dragged past the grace names itself here instead of reading as a bare delta. */
  readonly controlTimerExpiredBeforeCensus: boolean;
}

/**
 * wb-nl8.1 churn knobs (OFF by default; the roster rows run with none): deterministic, injected stand-ins for the
 * load pollution the instant-sample form of this measurement could not exclude, never anything awaited from a
 * neighbour. Each knob arms a REFED timer of the same class as the vitest runner's 100 ms task-update throttle (the
 * only refed un-unref'd ambient timer found in the runner path).
 */
export interface SettledCloseChurn {
  /** Arms a refed ambient timer of this TTL immediately before the before-close census (the masking direction: it expires inside the close window). */
  readonly ambientBeforeMs?: number;
  /** Arms a refed ambient timer of this TTL after the before-close census and before close() (the +1 direction: a transient alive at the after-close census). */
  readonly ambientAtCloseMs?: number;
  /** Holds the parked control Attempt's settlement this many ms after close()'s abort armed its timer, stretching settleOpenAttempts past the ambient's TTL. */
  readonly controlSettleDelayMs?: number;
}
/** What the body actually did for a SettledCloseChurn request. */
export interface SettledCloseChurnReceipt {
  readonly ambientArmed: boolean;
  readonly controlSettleDelayedMs: number;
}

/** ONE measurement body for the roster-side row and its sensitivity control, so the two cannot drift apart. */
async function measureSettledCloseTimers(env: RetryFaultEnv, parkControlAttempt: boolean, churn: SettledCloseChurn = {}): Promise<SettledCloseTimersControl> {
  return withScratch(env.scratchBase, async () => {
    const control: { timer: ReturnType<typeof setTimeout> | undefined; armed: boolean; armedAt: number } = { timer: undefined, armed: false, armedAt: 0 };
    const churnReceipt: { ambientArmed: boolean; controlSettleDelayedMs: number } = { ambientArmed: false, controlSettleDelayedMs: 0 };
    const workflow: HostedWorkflow = async ({ identity, signal }) => {
      if (identity.attemptId !== SETTLED_CLOSE_CONTROL_ATTEMPT) return { status: "success" };
      // wb-19q member 18 (wb-21k F2): the control Attempt parks until close() aborts it and arms its own
      // SETTLED_CLOSE_GRACE_MS timer INSIDE that abort, so a count taken before close() cannot see the timer.
      await new Promise<void>((resolve) => {
        const arm = (): void => {
          control.timer = setTimeout(() => undefined, SETTLED_CLOSE_GRACE_MS);
          control.armed = true;
          control.armedAt = Date.now();
          resolve();
        };
        if (signal.aborted) arm();
        else signal.addEventListener("abort", arm, { once: true });
      });
      // wb-nl8.1 churn knob: hold the settlement after the arm, stretching close()'s settleOpenAttempts window. The
      // receipt is the MEASURED hold (re-slept until the clock agrees, since a timer may fire a tick early), never the knob echoed.
      if (churn.controlSettleDelayMs !== undefined) {
        const held = Date.now();
        await sleep(churn.controlSettleDelayMs);
        while (Date.now() - held < churn.controlSettleDelayMs) await sleep(1);
        churnReceipt.controlSettleDelayedMs = Date.now() - held;
      }
      return { status: "indeterminate", summary: "control attempt parked until host close" };
    };
    const executor = harness(
      env,
      workflow,
      async (socketPath) => {
        for (const [index, attemptId] of SETTLED_ATTEMPT_IDS.entries()) {
          const bridge = await beginAttempt(socketPath, attemptId, index + 1);
          await terminalOf(bridge, `ex-${attemptId}`);
          bridge.end();
        }
        if (parkControlAttempt) {
          // started, then the driver side is gone: the Attempt stays pending until close() aborts it (as in lostConnectionRetry)
          const parked = await beginAttempt(socketPath, SETTLED_CLOSE_CONTROL_ATTEMPT, SETTLED_ATTEMPT_IDS.length + 1);
          parked.end();
        }
      },
      SETTLED_CLOSE_GRACE_MS,
    );
    await executor.start({ formula: "fixture" });
    const settledAttempts = executor.receipt().attempts.filter((attempt) => attempt.terminal === "success").length;
    // wb-nl8.1 churn knob: an ambient refed timer armed at the before-census's shoulder (the masking direction).
    const ambient: Array<ReturnType<typeof setTimeout>> = [];
    if (churn.ambientBeforeMs !== undefined) {
      ambient.push(setTimeout(() => undefined, churn.ambientBeforeMs));
      churnReceipt.ambientArmed = true;
    }
    // wb-nl8.1: both censuses are QUIESCENT samples (the count once it has been quiet for 150 ms), not instants: a
    // refed transient alive at one instant and gone inside the close window masked the control timer (member 18 read
    // 0), and one born inside the window read +1 on the settled row. The sample's definition changes; no assertion does.
    const timeoutsBeforeClose = await quiescentTimeouts();
    // wb-nl8.1 churn knob: an ambient refed timer armed inside the close window (the +1 direction).
    if (churn.ambientAtCloseMs !== undefined) {
      ambient.push(setTimeout(() => undefined, churn.ambientAtCloseMs));
      churnReceipt.ambientArmed = true;
    }
    await executor.close();
    const timeoutsAfterClose = await quiescentTimeouts();
    for (const timer of ambient) clearTimeout(timer);
    if (control.timer !== undefined) clearTimeout(control.timer);
    return {
      armed: settledAttempts === SETTLED_ATTEMPT_IDS.length && control.armed === parkControlAttempt,
      settledAttempts,
      timeoutsBeforeClose,
      timeoutsAfterClose,
      controlTimerArmed: control.armed,
      controlTimerExpiredBeforeCensus: control.armed && Date.now() - control.armedAt >= SETTLED_CLOSE_GRACE_MS,
      churn: churnReceipt,
      afterClose: executor.receipt(),
    };
  });
}

/**
 * wb-21k: three Attempts settle success, then executor.close() aborts the host's closing signal. A grace timer or
 * cancel listener left armed on a settled Attempt would arm one SETTLED_CLOSE_GRACE_MS timer per Attempt there. This is
 * a measurement beside the receipt roster, not a sixth roster journey: the receipt shape stays the five journeys.
 */
export async function settledCloseTimers(env: RetryFaultEnv): Promise<SettledCloseTimers> {
  return measureSettledCloseTimers(env, false);
}

/**
 * wb-19q member 18 (wb-21k F2): the same measurement with a fourth Attempt parked until close() aborts it; that abort
 * arms one SETTLED_CLOSE_GRACE_MS timer, so the after-close count must exceed the before-close count by at least one.
 * A measurement whose after-close count is taken before close(), or that never counts, reads a delta of 0 here.
 */
export async function settledCloseTimersSensitivity(env: RetryFaultEnv): Promise<SettledCloseTimersControl> {
  return measureSettledCloseTimers(env, true);
}

/**
 * wb-nl8.1 churn row R1: the member-18 measurement with a 100 ms refed ambient timer armed at the before-census's
 * shoulder (the vitest runner throttle's class) and the control Attempt's settlement held 150 ms past its arm, so
 * the ambient expires INSIDE the close window. Instant samples read BEFORE = base + 1 (ambient) and AFTER = base + 1
 * (control), a delta of 0 with the control timer provably armed: the field red "expected 0 to be greater than or
 * equal to 1" on an unloaded host. The hardened (quiescent) samples exclude the 100 ms transient and read delta 1.
 */
export async function settledCloseTimersSensitivityUnderChurn(env: RetryFaultEnv): Promise<SettledCloseTimersControl> {
  return measureSettledCloseTimers(env, true, { ambientBeforeMs: 100, controlSettleDelayMs: 150 });
}

/**
 * wb-nl8.1 churn row R2: the settled measurement with a 100 ms refed ambient timer armed inside the close window.
 * Instant samples count it at the after-census, a delta of +1 with every Attempt settled: the mirrored field red
 * "expected 1 to be less than or equal to 0" on an unloaded host. The hardened samples exclude it and read delta 0.
 */
export async function settledCloseTimersUnderChurn(env: RetryFaultEnv): Promise<SettledCloseTimers> {
  return measureSettledCloseTimers(env, false, { ambientAtCloseMs: 100 });
}

/** The receipt roster's runners, in roster order (pinned against qa RETRY_FAULT_JOURNEYS by the default-gate tier). */
export const RETRY_FAULT_JOURNEY_RUNNERS = Object.freeze({
  lostConnectionRetry,
  explicitUncertainRetry,
  sameAttemptReexecution,
  observerNoControl,
  dropBeforeAdmissionReply,
});
