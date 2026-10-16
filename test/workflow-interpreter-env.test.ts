/**
 * wb-ksz implementation (W19/WB-022, owner): the embedded workflow interpreter
 * Worker is constructed with an EMPTY environment. Nothing is its allowlist —
 * the script realm runs no subprocess, opens no file and resolves no proxy, so
 * a VM escape to the worker thread finds no credential in process.env.
 *
 * Measured before the fix (src/workflow/runtime.ts ~837): `new Worker(...)`
 * passed no `env` option, so Node's documented default handed the worker a
 * copy of process.env, credentials included.
 *
 * Harness: the worker transport is a RECORDING FAKE that stores the
 * constructor options and the host's listeners and decides nothing (the
 * recording-fake-child shape granted by name on wb-ksz.3, granted here by name
 * for the owner's seam pin). Names only in every assertion: no value of the
 * environment is ever printed.
 */
import { describe, expect, it, vi } from "vitest";

interface WorkerOptionsSeen {
  env?: unknown;
  eval?: boolean;
}

const transport = await vi.hoisted(async () => {
  const { EventEmitter } = await import("node:events");
  class RecordingWorker extends EventEmitter {
    readonly options: WorkerOptionsSeen;
    constructor(options: WorkerOptionsSeen) {
      super();
      this.options = options;
    }
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
    constructor(_source: string, options: WorkerOptionsSeen) {
      super(options);
      transport.workers.push(this);
    }
  }
  return { ...actual, Worker: Worker as unknown as typeof actual.Worker };
});

import { runWorkflow } from "../src/workflow/runtime.js";

const CANARY = "W19_CANARY_ANTHROPIC_API_KEY";

describe("embedded interpreter environment (wb-ksz, W19)", () => {
  it("constructs the interpreter Worker with an explicit, empty env: no key of process.env reaches it", async () => {
    const previous = process.env[CANARY];
    process.env[CANARY] = "W19_NOT_A_REAL_CREDENTIAL";
    try {
      const run = runWorkflow({
        script: 'export const meta={name:"env-seam",description:"owner seam pin"};\nreturn 1;',
        host: { spawnAgent: async () => ({ ok: true, text: "" }), abortAgent: () => {} },
      });
      await vi.waitFor(() => expect(transport.workers.length).toBe(1));
      const worker = transport.workers[0];
      if (worker === undefined) throw new Error("no worker constructed");
      const env = worker.options.env;
      expect(env, "the Worker was constructed without an env option").toBeDefined();
      expect(typeof env).toBe("object");
      expect(env).not.toBeNull();
      const names = Object.keys(env as object);
      expect(names, `environment keys reached the interpreter: ${names.join(", ")}`).toEqual([]);
      expect(names).not.toContain(CANARY);
      worker.emit("message", { type: "complete", resultJson: "1" });
      const result = await run;
      expect(result.status).toBe("completed");
    } finally {
      if (previous === undefined) delete process.env[CANARY];
      else process.env[CANARY] = previous;
    }
  });
});
