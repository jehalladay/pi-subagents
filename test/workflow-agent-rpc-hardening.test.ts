/**
 * wb-3l9 (W19 RPC/host boundary): crafted agent RPC frames at the host's worker
 * `message` listener.
 *
 * Measured by the wb-ksz.5 gate (cmd_d9d8fb0cb7b5): an agent frame with a
 * missing, null or non-string `prompt` threw inside `handleAgent` and escaped
 * `void handleAgent(...)` as an UNHANDLED REJECTION. Nothing in src registers an
 * `unhandledRejection` handler, Node's default is `--unhandled-rejections=throw`,
 * and src/agent-manager.ts records that an uncaughtException kills pi — so a
 * VM escape to the worker port (the census threat model) could take the host
 * down with one frame. `handleNode` already treats its payload as an untrusted
 * protocol frame and answers a typed refusal; `handleAgent` must do the same,
 * and the dispatch itself must never let a rejection reach the process.
 *
 * Harness: the worker transport is a RECORDING FAKE. It stores the host's
 * listeners, records every frame the host posts back, and decides nothing —
 * every verdict below is produced by the REAL runtime handlers (handleAgent,
 * handleNode, handleLoadWorkflow) running against frames this test crafts. That
 * is the recording-fake-child shape granted by name on wb-ksz.3; it is granted
 * by name here for wb-3l9 (owner test). The worker is the fake, never the
 * subject under test.
 */
import { afterEach, describe, expect, it, vi } from "vitest";

/** A frame the host posted to the worker port — the shape `respond()` sends. */
interface HostFrame {
  type: string;
  callId?: number;
  ok?: boolean;
  error?: string;
  fatal?: boolean;
  capabilityError?: { name: string; category: string; message: string };
}

const transport = await vi.hoisted(async () => {
  const { EventEmitter } = await import("node:events");
  /** Recording fake transport: no behaviour of its own, only memory. */
  class RecordingWorker extends EventEmitter {
    readonly sent: HostFrame[] = [];
    postMessage(frame: HostFrame): void {
      this.sent.push(frame);
    }
    terminate(): Promise<number> {
      return Promise.resolve(0);
    }
  }
  const workers: RecordingWorker[] = [];
  return { RecordingWorker, workers };
});

vi.mock("node:worker_threads", async importOriginal => {
  const actual = await importOriginal<typeof import("node:worker_threads")>();
  class Worker extends transport.RecordingWorker {
    constructor() {
      super();
      transport.workers.push(this);
    }
  }
  return { ...actual, Worker: Worker as unknown as typeof actual.Worker };
});

import { runWorkflow, type WorkflowHost, type WorkflowRunResult } from "../src/workflow/runtime.js";

const HEAD = 'export const meta={name:"rpc-hardening",description:"crafted agent frames"};\n';
const MALFORMED_AGENT = "Malformed workflow agent RPC payload.";

/**
 * Collect unhandled rejections for the duration of a block — the shape
 * test/abortable.test.ts uses. Vitest installs its own handler, so `process.on`
 * alone would not observe them; the originals are restored afterwards.
 */
async function withUnhandledRejectionSpy(fn: () => Promise<void>): Promise<unknown[]> {
  const seen: unknown[] = [];
  const prior = process.listeners("unhandledRejection");
  process.removeAllListeners("unhandledRejection");
  const capture = (reason: unknown) => {
    seen.push(reason);
  };
  process.on("unhandledRejection", capture);
  try {
    await fn();
    // Unhandled rejections are reported on a later macrotask, not a microtask.
    await new Promise(resolve => setTimeout(resolve, 20));
  } finally {
    process.off("unhandledRejection", capture);
    for (const listener of prior) process.on("unhandledRejection", listener as never);
  }
  return seen;
}

interface OpenRun {
  run: Promise<WorkflowRunResult>;
  worker: InstanceType<typeof transport.RecordingWorker>;
  spawnAgent: ReturnType<typeof vi.fn>;
}

/** Start a run against the fake transport and hand back the worker the host bound. */
async function openRun(extend?: (host: WorkflowHost) => void): Promise<OpenRun> {
  const before = transport.workers.length;
  const spawnAgent = vi.fn(async () => ({ ok: true, text: "" }));
  const host: WorkflowHost = { spawnAgent, abortAgent: () => {} };
  extend?.(host);
  const run = runWorkflow({ script: `${HEAD}return 1;`, host });
  await vi.waitFor(() => expect(transport.workers.length).toBe(before + 1));
  const worker = transport.workers[before];
  if (worker === undefined) throw new Error("the host bound no worker");
  return { run, worker, spawnAgent };
}

const responseFor = (worker: OpenRun["worker"], callId: number): HostFrame | undefined =>
  worker.sent.find(frame => frame.type === "response" && frame.callId === callId);

/** The script "finishes": a run that stayed up settles as completed. */
async function settle(open: OpenRun): Promise<WorkflowRunResult> {
  open.worker.emit("message", { type: "complete", resultJson: "1" });
  return await open.run;
}

/** Every payload shape the wb-ksz.5 gate measured as a host-side throw, plus the frame-level ones. */
const MALFORMED_AGENT_PAYLOADS: Array<[name: string, payload: unknown]> = [
  ["an absent payload", undefined],
  ["a null payload", null],
  ["an array payload", ["prompt"]],
  ["a missing prompt", {}],
  ["a null prompt", { prompt: null }],
  ["a non-string prompt", { prompt: 42 }],
];

afterEach(() => {
  transport.workers.length = 0;
});

describe("crafted agent RPC frames at the host boundary (wb-3l9)", () => {
  it("probes a populated table of malformed payloads", () => {
    expect(MALFORMED_AGENT_PAYLOADS.length).toBe(6);
  });

  it.each(MALFORMED_AGENT_PAYLOADS)(
    "answers an agent frame carrying %s with a typed refusal and keeps the run up",
    async (_name, payload) => {
      const rejections = await withUnhandledRejectionSpy(async () => {
        const open = await openRun();
        open.worker.emit("message", { type: "call", callId: 7, method: "agent", payload });
        await vi.waitFor(() => expect(responseFor(open.worker, 7)).toBeDefined());
        expect(responseFor(open.worker, 7)).toMatchObject({
          ok: false,
          fatal: true,
          error: MALFORMED_AGENT,
          capabilityError: { name: "CapabilityError", category: "validation", message: MALFORMED_AGENT },
        });
        expect(open.spawnAgent).not.toHaveBeenCalled();
        const result = await settle(open);
        expect(result.status).toBe("completed");
        expect(result.agentCount).toBe(0);
      });
      expect(rejections).toEqual([]);
    },
  );

  it("still admits a well-formed frame with every optional field set (no false refusal)", async () => {
    const rejections = await withUnhandledRejectionSpy(async () => {
      const open = await openRun();
      open.worker.emit("message", {
        type: "call",
        callId: 3,
        method: "agent",
        payload: {
          prompt: "say hi",
          label: "greeter",
          model: "claude-haiku-5-5",
          agentType: "general-purpose",
          isolation: "worktree",
          phaseIndex: 0,
          phaseTitle: "Greet",
          effort: "low",
        },
      });
      await vi.waitFor(() => expect(responseFor(open.worker, 3)).toBeDefined());
      expect(responseFor(open.worker, 3)).toMatchObject({ ok: true });
      expect(open.spawnAgent).toHaveBeenCalledTimes(1);
      const result = await settle(open);
      expect(result.status).toBe("completed");
      expect(result.agentCount).toBe(1);
    });
    expect(rejections).toEqual([]);
  });

  it("holds parity: a null payload on the node and workflow methods is refused the same way", async () => {
    const rejections = await withUnhandledRejectionSpy(async () => {
      const open = await openRun();
      open.worker.emit("message", { type: "call", callId: 11, method: "node", payload: null });
      open.worker.emit("message", { type: "call", callId: 12, method: "workflow", payload: null });
      await vi.waitFor(() => {
        expect(responseFor(open.worker, 11)).toBeDefined();
        expect(responseFor(open.worker, 12)).toBeDefined();
      });
      expect(responseFor(open.worker, 11)).toMatchObject({
        ok: false,
        fatal: true,
        capabilityError: { name: "CapabilityError", category: "validation" },
      });
      expect(responseFor(open.worker, 12)).toMatchObject({ ok: false, fatal: true });
      expect(open.spawnAgent).not.toHaveBeenCalled();
      const result = await settle(open);
      expect(result.status).toBe("completed");
    });
    expect(rejections).toEqual([]);
  });

  it("backstops the dispatch: a handler that throws past validation is answered, never rethrown", async () => {
    const rejections = await withUnhandledRejectionSpy(async () => {
      // A host whose optional-capability lookup explodes is a host bug, and it
      // is the one way to make the REAL handler throw after the payload check.
      // The dispatch has to turn that into a typed answer: the alternative is
      // the process-level rejection this bead exists to close.
      const open = await openRun(host => {
        Object.defineProperty(host, "runGate", {
          get() {
            throw new Error("host capability lookup exploded");
          },
        });
      });
      open.worker.emit("message", { type: "call", callId: 5, method: "agent", payload: { prompt: "say hi" } });
      await vi.waitFor(() => expect(responseFor(open.worker, 5)).toBeDefined());
      expect(responseFor(open.worker, 5)).toMatchObject({
        ok: false,
        fatal: true,
        error: "host capability lookup exploded",
        capabilityError: { name: "CapabilityError", category: "transport", message: "host capability lookup exploded" },
      });
      expect(open.spawnAgent).not.toHaveBeenCalled();
      const result = await settle(open);
      expect(result.status).toBe("completed");
    });
    expect(rejections).toEqual([]);
  });
});
