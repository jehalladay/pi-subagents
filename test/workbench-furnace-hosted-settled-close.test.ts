/**
 * wb-21k (W18-D follow-up, wb-0kg.4 gate F1): an Attempt that already settled must not report a
 * cancel after executor.close(). Adapter src only; the landed wb-0kg.4 tier asserts only the
 * uncertain Attempt's host_closed cancel and stays green across the fix.
 *
 * Spec lines pinned (wb-21k bead, owner wording):
 *   "drop the listener at settle, OR record cancel only for unsettled Attempts ... terminal states unchanged"
 *   "red-first = a settled success Attempt reporting requested:true after close"
 * Mechanism (gate-measured): execute() attached noteCancel to AbortSignal.any([furnace, closing])
 * and never removed it when the Attempt settled, so close() aborting `closing` stamped
 * cancel {requested:true, reason:"host_closed"} onto every already-settled Attempt.
 */
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { connect, type Socket } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";
import type { FurnaceOptions } from "@furnace/sdk";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  type FurnaceHostedClient,
  FurnaceHostedExecutor,
  type FurnaceHostedOptions,
  type HostedOutcome,
  type HostedWorkflow,
} from "../src/workbench/hosts/furnace-hosted.js";
import { loadRepairedFurnaceSdk } from "./helpers/furnace-sdk-repaired.js";

type Line = Record<string, unknown>;
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** The driver side of one bridge connection, as Furnace's extension driver speaks it. */
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
  work: { beads_work_id: "bd-work-1", title: "fixture step", description: null, acceptance_criteria: null },
  attempt: { attempt_id: attemptId, ordinal, deadline: null },
  workspace: { root: "/tmp/fixture" },
});
const kindOf = (line: Line): string | undefined => (line.event as { kind?: string } | undefined)?.kind;

/** Opens one Attempt's own connection and returns after the workflow has started. */
async function openAttempt(socketPath: string, attemptId: string, ordinal: number): Promise<Bridge> {
  const bridge = await Bridge.open(socketPath);
  bridge.send({ op: "hello", request_id: "h", input: { supported_protocol_versions: [1] } });
  await bridge.until((line) => line.op === "hello");
  bridge.send({ op: "execute", protocol_version: 1, request_id: `e-${attemptId}`, input: { execution_id: `ex-${attemptId}`, executor: "pi-hosted", context: context(attemptId, ordinal) } });
  await bridge.until((line) => line.op === "execute");
  await bridge.until((line) => kindOf(line) === "started");
  return bridge;
}
const terminalOf = (bridge: Bridge, attemptId: string): Promise<Line> =>
  bridge.until((line) => (line.event as { execution_id?: string } | undefined)?.execution_id === `ex-${attemptId}` && kindOf(line) === "terminal");

const socketOf = (options: FurnaceOptions): string => {
  const text = readFileSync(options.config ?? "", "utf8");
  const args = /args = \[("[^"]*"), ("[^"]*")\]/.exec(text);
  if (!args?.[2]) throw new Error(`no bridge socket in config:\n${text}`);
  return JSON.parse(args[2]) as string;
};

function executorFor(sdk: FurnaceHostedOptions["sdk"], workflow: HostedWorkflow, script: (socketPath: string) => Promise<void>): FurnaceHostedExecutor {
  const createClient = (options: FurnaceOptions): FurnaceHostedClient => ({
    runs: {
      async start() {
        await script(socketOf(options));
        return { record: { run_id: "frn-run-fake", beads_run_id: "bd-run-fake" }, requestId: "req-fake" };
      },
    },
  });
  return new FurnaceHostedExecutor({ executor: "pi-hosted", workflow, sdk, createClient });
}

let repaired: Awaited<ReturnType<typeof loadRepairedFurnaceSdk>>;
let scratch: string;
const previousTmp = process.env.TMPDIR;
beforeAll(async () => {
  repaired = await loadRepairedFurnaceSdk();
});
beforeEach(() => {
  scratch = mkdtempSync(join(tmpdir(), "pi-furnace-settled-close-"));
  process.env.TMPDIR = scratch;
});
afterEach(() => {
  if (previousTmp === undefined) delete process.env.TMPDIR;
  else process.env.TMPDIR = previousTmp;
  rmSync(scratch, { recursive: true, force: true });
});

describe("wb-21k: close() after an Attempt settled leaves that Attempt's cancel record alone", () => {
  it("a settled success Attempt reports cancel requested:false after executor.close() (red-first: it reported requested:true/host_closed)", async () => {
    const workflow: HostedWorkflow = async () => ({ status: "success", summary: "done" });
    const executor = executorFor(repaired.sdk, workflow, async (socketPath) => {
      const bridge = await openAttempt(socketPath, "frn-atm-ok", 1);
      await terminalOf(bridge, "frn-atm-ok");
      bridge.end();
    });
    await executor.start({ formula: "fixture" });
    expect(executor.receipt().attempts[0]).toMatchObject({ terminal: "success", cancel: { requested: false } });
    await executor.close();
    const attempt = executor.receipt().attempts[0];
    expect(attempt).toMatchObject({ terminal: "success", cancel: { requested: false }, unsettledAfterCancel: false });
    expect(attempt?.cancel).toEqual({ requested: false });
  });

  it("a settled failure Attempt keeps cancel requested:false after close and its terminal state is unchanged", async () => {
    const workflow: HostedWorkflow = async () => {
      throw new Error("step blew up");
    };
    const executor = executorFor(repaired.sdk, workflow, async (socketPath) => {
      const bridge = await openAttempt(socketPath, "frn-atm-fail", 1);
      await terminalOf(bridge, "frn-atm-fail");
      bridge.end();
    });
    await executor.start({ formula: "fixture" });
    await executor.close();
    expect(executor.receipt().attempts[0]).toMatchObject({ terminal: "failure", summary: "step blew up" });
    expect(executor.receipt().attempts[0]?.cancel).toEqual({ requested: false });
  });

  it("control: an Attempt cancelled by the operator before it settled keeps that reason after close", async () => {
    const workflow: HostedWorkflow = ({ signal }) => new Promise<HostedOutcome>((resolve) => signal.addEventListener("abort", () => resolve({ status: "cancelled", summary: "stopped" }), { once: true }));
    const executor = executorFor(repaired.sdk, workflow, async (socketPath) => {
      const bridge = await openAttempt(socketPath, "frn-atm-stop", 1);
      bridge.send({ op: "cancel", protocol_version: 1, request_id: "c", input: { execution_id: "ex-frn-atm-stop", reason: "operator_stop" } });
      await terminalOf(bridge, "frn-atm-stop");
      bridge.end();
    });
    await executor.start({ formula: "fixture" });
    await executor.close();
    expect(executor.receipt().attempts[0]).toMatchObject({ terminal: "cancelled", cancel: { requested: true, reason: "operator_stop" } });
  });

  it("control: beside a settled Attempt, an Attempt still unsettled at close() records host_closed and is cancelled", async () => {
    const workflow: HostedWorkflow = ({ identity, signal }) =>
      identity.attemptId === "frn-atm-hung"
        ? new Promise<HostedOutcome>((resolve) => signal.addEventListener("abort", () => resolve({ status: "cancelled", summary: "closed" }), { once: true }))
        : Promise.resolve<HostedOutcome>({ status: "success", summary: "done" });
    let hung: Bridge | undefined;
    const executor = executorFor(repaired.sdk, workflow, async (socketPath) => {
      const settled = await openAttempt(socketPath, "frn-atm-settled", 1);
      await terminalOf(settled, "frn-atm-settled");
      settled.end();
      hung = await openAttempt(socketPath, "frn-atm-hung", 2);
    });
    await executor.start({ formula: "fixture" });
    const closing = executor.close();
    await hung?.until((line) => kindOf(line) === "terminal");
    hung?.end();
    await closing;
    const [settled, open] = executor.receipt().attempts;
    expect(settled).toMatchObject({ attemptId: "frn-atm-settled", terminal: "success" });
    expect(settled?.cancel).toEqual({ requested: false });
    expect(open).toMatchObject({ attemptId: "frn-atm-hung", terminal: "cancelled", cancel: { requested: true, reason: "host_closed" } });
    expect(executor.receipt().identityViolations).toEqual([]);
  });
});
