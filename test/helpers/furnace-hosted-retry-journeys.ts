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
import { connect, type Socket } from "node:net";
import { join } from "node:path";
import { createInterface } from "node:readline";
import type { FurnaceOptions } from "@furnace/sdk";
import type { CapabilityError } from "../../src/workbench/capability-registry.js";
import type { FurnaceHostedClient, FurnaceHostedExecutor, FurnaceSdk, HostedReceipt, HostedWorkflow } from "../../src/workbench/hosts/furnace-hosted.js";

export type Line = Record<string, unknown>;

export interface RetryFaultEnv {
  /** The adapter class: src through vitest in the default gate, the BUILT dist copy in the receipt runner. */
  readonly Executor: typeof FurnaceHostedExecutor;
  readonly CapabilityError: typeof CapabilityError;
  /** The REPAIRED SDK copy (qa/workbench/furnace-hosted-repaired-sdk.mjs); the shipped 0.1.0 refuses every context decode. */
  readonly sdk: FurnaceSdk;
  /** chooseScratchBase(...).path: every journey runs with TMPDIR set to a fresh private directory under it. */
  readonly scratchBase: string;
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
function harness(env: RetryFaultEnv, workflow: HostedWorkflow, script: (socketPath: string) => Promise<void>): FurnaceHostedExecutor {
  const createClient = (options: FurnaceOptions): FurnaceHostedClient => ({
    runs: {
      async start() {
        await script(socketOf(options));
        return { record: { run_id: "frn-run-fake", beads_run_id: "bd-run-fake" }, requestId: "req-fake" };
      },
    },
  });
  return new env.Executor({ executor: "pi-hosted", workflow, sdk: env.sdk, createClient, cancelGraceMs: 200 });
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

/** The receipt roster's runners, in roster order (pinned against qa RETRY_FAULT_JOURNEYS by the default-gate tier). */
export const RETRY_FAULT_JOURNEY_RUNNERS = Object.freeze({
  lostConnectionRetry,
  explicitUncertainRetry,
  sameAttemptReexecution,
  observerNoControl,
  dropBeforeAdmissionReply,
});
