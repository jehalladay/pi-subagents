/**
 * wb-0kg.4 (VC-7/W18-D): Furnace Work retry while Run establishment is uncertain,
 * over the per-Attempt embedded bridge of the landed wb-zmd adapter. Test-only: the
 * adapter source is untouched.
 *
 * Spec lines pinned (docs/workbench/14-qa-and-benchmarks.md#fault-injection-locations):
 *   "Parent Furnace Work retry while child Run establishment is uncertain."
 * wb-zmd constraint set: "one bridge host session per Attempt"; receipts state
 *   "no crash durability ... per-Attempt identity".
 * BOUNDARY (07:30Z): "executor docs now state per-Attempt park-not-retry -- never
 *   reintroduce a Furnace-owned-retry premise": every retry here originates from the
 *   operator path (the scripted driver), never from Furnace or the adapter itself.
 *
 * Uses a repaired COPY of the vendored SDK (the shipped digest drift is a separate
 * owner-reserved packaging bead). No live tier, no furnace doctor, no capability probe.
 */
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { connect, type Socket } from "node:net";
import { dirname, join } from "node:path";
import { createInterface } from "node:readline";
import type { FurnaceOptions } from "@furnace/sdk";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { type FurnaceHostedClient, FurnaceHostedExecutor, type HostedWorkflow } from "../src/workbench/hosts/furnace-hosted.js";
import { loadRepairedFurnaceSdk, type RepairedSdk } from "./helpers/furnace-sdk-repaired.js";

type Line = Record<string, unknown>;
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

class Bridge {
  readonly lines: Line[] = [];
  private constructor(readonly socket: Socket) {
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
const execute = (bridge: Bridge, executionId: string, attemptId: string, ordinal: number): void =>
  bridge.send({ op: "execute", protocol_version: 1, request_id: `e-${executionId}`, input: { execution_id: executionId, executor: "pi-hosted", context: context(attemptId, ordinal) } });
const eventOf = (line: Line): { execution_id?: string; kind?: string; payload?: { result?: { status: string } } } => (line.event ?? {}) as { execution_id?: string; kind?: string; payload?: { result?: { status: string } } };
const terminalOf = (bridge: Bridge, executionId: string): Promise<Line> => bridge.until((line) => eventOf(line).execution_id === executionId && eventOf(line).kind === "terminal");
const statusOf = (terminal: Line): string | undefined => eventOf(terminal).payload?.result?.status;

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

function harness(workflow: HostedWorkflow, repaired: RepairedSdk, script: (socketPath: string) => Promise<void>): FurnaceHostedExecutor {
  const createClient = (options: FurnaceOptions): FurnaceHostedClient => ({
    runs: {
      async start() {
        await script(socketOf(options));
        return { record: { run_id: "frn-run-fake", beads_run_id: "bd-run-fake" }, requestId: "req-fake" };
      },
    },
  });
  return new FurnaceHostedExecutor({ executor: "pi-hosted", workflow, sdk: repaired.sdk, createClient, cancelGraceMs: 200 });
}

/** The unix socket path limit is ~103 bytes (wb-71q): keep the host scratch base short. */
function shortScratchBase(): string {
  const runtime = process.env.XDG_RUNTIME_DIR;
  return runtime !== undefined && runtime.length <= 40 ? runtime : "/tmp";
}

let repaired: RepairedSdk;
let scratch: string;
const previousTmp = process.env.TMPDIR;
beforeAll(async () => {
  repaired = await loadRepairedFurnaceSdk();
});
afterAll(() => {
  rmSync(dirname(repaired.root), { recursive: true, force: true });
});
beforeEach(() => {
  scratch = mkdtempSync(join(shortScratchBase(), "pf04-"));
  process.env.TMPDIR = scratch;
});
afterEach(() => {
  if (previousTmp === undefined) delete process.env.TMPDIR;
  else process.env.TMPDIR = previousTmp;
  rmSync(scratch, { recursive: true, force: true });
});

describe("Furnace Work retry while Run establishment is uncertain (wb-0kg.4)", () => {
  it("an operator retry after an uncertain first Attempt opens a FRESH bridge session; the first Attempt stays parked and is never merged or upgraded", async () => {
    const markers: string[] = [];
    const workflow: HostedWorkflow = async ({ identity, signal }) => {
      markers.push(identity.attemptId);
      if (identity.ordinal === 1) {
        await new Promise<void>((resolve) => signal.addEventListener("abort", () => resolve(), { once: true }));
        return { status: "indeterminate", summary: "establishment not acknowledged" };
      }
      return { status: "success", summary: "retried attempt done" };
    };
    let retriedTerminal: Line | undefined;
    const executor = harness(workflow, repaired, async (socketPath) => {
      const first = await beginAttempt(socketPath, "frn-atm-r1", 1);
      first.end(); // establishment acknowledgment never arrives: the driver connection is lost
      await sleep(30);
      // Operator-confirmed destructive work retry: a NEW Attempt on a NEW connection.
      const second = await Bridge.open(socketPath);
      await hello(second);
      execute(second, "ex-frn-atm-r2", "frn-atm-r2", 2);
      retriedTerminal = await terminalOf(second, "ex-frn-atm-r2");
      second.end();
    });
    await executor.start({ formula: "fixture" });
    expect(statusOf(retriedTerminal as Line)).toBe("success");
    const receipt = executor.receipt();
    const [first, second] = receipt.attempts;
    expect(receipt.attempts).toHaveLength(2);
    expect(first?.attemptId).toBe("frn-atm-r1");
    expect(second?.attemptId).toBe("frn-atm-r2");
    // (1) fresh per-Attempt bridge session, never reused
    expect(first?.sessionInstanceId).not.toBe(second?.sessionInstanceId);
    // (3) the uncertain first Attempt is neither success nor upgraded by the retry's result
    expect(first?.terminal).toBe("pending");
    expect(second?.terminal).toBe("success");
    expect(first?.summary).toBeUndefined();
    expect(receipt.identityViolations).toEqual([]);
    // (2) establishment markers exactly once per Attempt
    expect(markers.filter((m) => m === "frn-atm-r1")).toHaveLength(1);
    expect(markers.filter((m) => m === "frn-atm-r2")).toHaveLength(1);
    // The uncertain Attempt resolves only on host close, and then as indeterminate, never success.
    await executor.close();
    const closed = executor.receipt().attempts[0];
    expect(closed?.cancel).toMatchObject({ requested: true, reason: "host_closed" });
    expect(closed?.terminal).toBe("indeterminate");
    expect(closed?.terminal).not.toBe("success");
  });

  it("an explicitly uncertain first Attempt parks as indeterminate and the retry gets a distinct session without changing it", async () => {
    const workflow: HostedWorkflow = async ({ identity }) => {
      if (identity.ordinal === 1) throw new CapabilityError("uncertain-effect", "run establishment may have happened");
      return { status: "success" };
    };
    const terminals: string[] = [];
    const executor = harness(workflow, repaired, async (socketPath) => {
      for (const [index, attemptId] of ["frn-atm-u1", "frn-atm-u2"].entries()) {
        const bridge = await Bridge.open(socketPath);
        await hello(bridge);
        execute(bridge, `ex-${attemptId}`, attemptId, index + 1);
        terminals.push(statusOf(await terminalOf(bridge, `ex-${attemptId}`)) ?? "none");
        bridge.end();
      }
    });
    await executor.start({ formula: "fixture" });
    expect(terminals).toEqual(["indeterminate", "success"]);
    const [first, second] = executor.receipt().attempts;
    expect(first).toMatchObject({ attemptId: "frn-atm-u1", terminal: "indeterminate" });
    expect(second).toMatchObject({ attemptId: "frn-atm-u2", terminal: "success" });
    expect(first?.sessionInstanceId).not.toBe(second?.sessionInstanceId);
    expect(executor.receipt().identityViolations).toEqual([]);
    await executor.close();
  });

  it("a Furnace-style re-execution of the SAME Attempt id is recorded as an identity violation, not accepted as the operator retry", async () => {
    const workflow: HostedWorkflow = async () => ({ status: "success" });
    const executor = harness(workflow, repaired, async (socketPath) => {
      for (const executionId of ["ex-a", "ex-b"]) {
        const bridge = await Bridge.open(socketPath);
        await hello(bridge);
        execute(bridge, executionId, "frn-atm-same", 1);
        await terminalOf(bridge, executionId);
        bridge.end();
      }
    });
    await executor.start({ formula: "fixture" });
    const receipt = executor.receipt();
    expect(receipt.limits.retry).toBe("furnace-parks-never-retries");
    expect(receipt.identityViolations.some((v) => /frn-atm-same executed 2 times/.test(v))).toBe(true);
    await executor.close();
  });

  it("an observer connection sees no control: its cancel for another session's execution is unknown_execution and the workflow is never aborted", async () => {
    let aborted = false;
    const workflow: HostedWorkflow = async ({ signal }) => {
      await sleep(120);
      aborted = signal.aborted;
      return { status: "success" };
    };
    let cancelReply: Line | undefined;
    let observeReply: Line | undefined;
    const executor = harness(workflow, repaired, async (socketPath) => {
      const owner = await beginAttempt(socketPath, "frn-atm-o1", 1);
      const observer = await Bridge.open(socketPath);
      await hello(observer);
      observer.send({ op: "cancel", protocol_version: 1, request_id: "oc", input: { execution_id: "ex-frn-atm-o1", reason: "operator_stop" } });
      cancelReply = await observer.until((line) => line.op === "cancel");
      observer.send({ op: "observe", protocol_version: 1, request_id: "oo", input: { execution_id: "ex-frn-atm-o1" } });
      observeReply = await observer.until((line) => line.op === "observe");
      observer.end();
      await terminalOf(owner, "ex-frn-atm-o1");
      owner.end();
    });
    await executor.start({ formula: "fixture" });
    expect(JSON.stringify(cancelReply)).toContain("unknown_execution");
    expect(JSON.stringify(observeReply)).not.toContain('"status":"success"');
    expect(aborted).toBe(false);
    const attempt = executor.receipt().attempts[0];
    expect(attempt).toMatchObject({ terminal: "success", cancel: { requested: false } });
    await executor.close();
  });
});
