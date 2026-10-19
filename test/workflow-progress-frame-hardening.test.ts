/**
 * wb-zin (W19, wb-3l9 sibling; wb-ksz.5 gate F2): crafted non-call frames at
 * the host's worker `message` listener.
 *
 * Measured by the wb-ksz.5 gate (3/3 on trunk): a crafted `progress` frame
 * throws SYNCHRONOUSLY out of the listener — the progress case passes
 * `message.entries` straight to emit (progress.push + onProgress) with no
 * shape check, so a frame whose entries is undefined, a non-array, or an
 * array with a throwing length/iterator escapes as an uncaughtException,
 * the class src/agent-manager.ts records as killing pi. The same audit
 * covers `complete` (JSON.parse of a crafted resultJson throws in-listener)
 * and `error` (a non-string message must not flow into the run result).
 *
 * Contract: a malformed progress frame is DROPPED (progress is
 * fire-and-forget — there is no callId to answer); a malformed complete
 * frame fails the RUN with a typed message; nothing thrown ever leaves the
 * listener. wb-3l9 guarded the agent dispatch; this closes the other cases.
 *
 * Harness: the worker transport is the same RECORDING FAKE granted by name
 * under the wb-ksz.3 shape (stores listeners, records posts, decides
 * nothing); every verdict comes from the REAL listener.
 */
import { describe, expect, it, vi } from "vitest";

const transport = await vi.hoisted(async () => {
  const { EventEmitter } = await import("node:events");
  class RecordingWorker extends EventEmitter {
    postMessage(): void {}
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

import { runWorkflow, type WorkflowRunResult } from "../src/workflow/runtime.js";

const HEAD = 'export const meta={name:"frame-hardening",description:"crafted non-call frames"};\n';

interface OpenRun {
  run: Promise<WorkflowRunResult>;
  worker: InstanceType<typeof transport.RecordingWorker>;
  seen: unknown[][];
}

async function openRun(): Promise<OpenRun> {
  const before = transport.workers.length;
  const seen: unknown[][] = [];
  const run = runWorkflow({
    script: `${HEAD}return 1;`,
    host: { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {} },
    onProgress: entries => {
      seen.push([...entries]);
    },
  });
  await vi.waitFor(() => expect(transport.workers.length).toBe(before + 1));
  const worker = transport.workers[before];
  if (worker === undefined) throw new Error("the host bound no worker");
  return { run, worker, seen };
}

async function settle(open: OpenRun): Promise<WorkflowRunResult> {
  open.worker.emit("message", { type: "complete", resultJson: "1" });
  return await open.run;
}

/** The wb-ksz.5 gate's three measured frames, plus the hostile-array shapes. */
const MALFORMED_PROGRESS: Array<[name: string, entries: unknown]> = [
  ["absent entries", undefined],
  ["null entries", null],
  ["a non-array entries", { length: 1 }],
  ["an array whose entry is not an object", ["x"]],
  ["an array entry missing the type discriminant", [{ index: 0 }]],
];

describe("crafted non-call frames at the host boundary (wb-zin)", () => {
  it.each(MALFORMED_PROGRESS)(
    "drops a progress frame carrying %s: nothing thrown, one bounded diagnostic, run completes",
    async (_name, entries) => {
      const open = await openRun();
      expect(() => open.worker.emit("message", { type: "progress", entries })).not.toThrow();
      const result = await settle(open);
      expect(result.status).toBe("completed");
      // The crafted payload never surfaces; the drop is recorded as exactly one
      // fixed-text log entry (no echo of attacker-controlled bytes).
      expect(result.progress).toEqual([{ type: "workflow_log", message: "Dropped a malformed workflow progress frame from the worker." }]);
      expect(open.seen).toEqual([result.progress]);
    },
  );

  it("records the drop diagnostic once per run, however many malformed frames arrive", async () => {
    const open = await openRun();
    for (let i = 0; i < 25; i++) open.worker.emit("message", { type: "progress", entries: null });
    const result = await settle(open);
    expect(result.status).toBe("completed");
    expect(result.progress).toHaveLength(1);
  });

  it("still delivers a well-formed progress frame (no false drop)", async () => {
    const open = await openRun();
    const entry = { type: "workflow_log", message: "hello from the worker" };
    expect(() => open.worker.emit("message", { type: "progress", entries: [entry] })).not.toThrow();
    const result = await settle(open);
    expect(result.status).toBe("completed");
    expect(open.seen).toEqual([[entry]]);
    expect(result.progress).toEqual([entry]);
  });

  it("fails the run with a typed message, never a throw, on a complete frame whose resultJson is malformed", async () => {
    const open = await openRun();
    expect(() => open.worker.emit("message", { type: "complete", resultJson: "{" })).not.toThrow();
    const result = await open.run;
    expect(result.status).toBe("failed");
    expect(result.error).toMatch(/result/i);
  });

  it("coerces a crafted non-string error frame into a string run error", async () => {
    const open = await openRun();
    expect(() => open.worker.emit("message", { type: "error", message: { evil: true } })).not.toThrow();
    const result = await open.run;
    expect(result.status).toBe("failed");
    expect(typeof result.error).toBe("string");
  });
});
