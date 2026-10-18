/**
 * W19 / WB-022 slice 4 of 4 (wb-ksz.6): a child that dies never takes the host.
 *
 * Spec lines pinned (docs/workbench/08 "Lifetimes": "Embedded Pi-hosted script:
 * Pi host and worker own local interpreter; process loss terminates its JS
 * stack."; docs/workbench/14 "Test classes" D: "process kill at every
 * side-effect boundary"; docs/workbench/12 "Worktree and concurrency safety":
 * "Cancellation/cleanup must not delete a shared child workspace without
 * ownership."; owner boundary, wb-ksz 16:19Z: "(4) child crash never takes the
 * host").
 *
 * VECTOR HONESTY. At the cut base there is no src-free REAL crash vector: the
 * sandbox binds neither process nor timers (worker-source.ts), and a worker's
 * resourceLimits are not settable from a test without a src seam. Death is
 * therefore INJECTED: node:worker_threads is mocked so that a script carrying
 * the FAKE marker gets a scripted stand-in Worker that emits "error" and/or
 * "exit" exactly as a dead thread would. Every other script gets the REAL
 * Worker, so the concurrent control run below is a genuine run. Nothing here
 * presents the injection as a real crash; the real-crash rows are it.todo.
 *
 * MOCK BOUND (owner ruling 16:43Z): mocked-Worker crash handling is the runtime's
 * settle path under an injected thread death, NOT a sandbox property. The
 * real-child proof rides wb-ksz slice 3.
 *
 * LISTENER TRUTH (measured, wb-ksz.6 respin): after settlement the dead
 * Worker still has its 1 "message", 1 "error" and 1 "exit" listener attached
 * (runtime.ts never removes them). They are attached-but-inert: each is
 * neutralised only by the settled guards. "Holds no live listeners" is
 * therefore FALSE at trunk and is not claimed; K4 and K5 pin the inertness of
 * each listener type instead. Removing the listeners is a src change and does
 * not belong in this test-only slice.
 *
 * DETACHED CRASH ROWS ARE CITED, NOT TESTED (owner ruling 06:1xZ, route b).
 * The detached host's crash rows live in their own landed files and are
 * never re-tested, edited or text-asserted here. Cited by title, with the
 * bead whose commit introduced each row (verified by git log -S at the cut):
 *   - test/workbench-detached-faults-receipt.test.ts, introduced by 2dfa1f9
 *     (wb-0kg.1): "writes exactly one marker before the kill and nothing after
 *     it"; "flags a marker count of 2 under one invocation id as
 *     duplicate-effect"; "drives real signals and cleans every host and the
 *     workspace in finally".
 *   - test/workbench-local-detached-effects.test.ts, introduced by 56275ad
 *     (wb-6hb.1, NOT wb-0kg.1): "refuses a write whose first attempt lost its
 *     answer instead of retrying it".
 * A citation is not an assertion: this file makes no claim that those rows
 * still exist or run; their own files are the evidence. Whether they still ran,
 * passed and asserted in the gate is judged OUTSIDE this file, in REPORT MODE
 * over the gate's own vitest JSON report, by
 * test/workbench-child-crash-faults.census.ts (the census gate step). The census
 * executes nothing and text-matches nothing: the u62 judge reads and parses each
 * pinned file to locate its case (AST, never a string match), refuses a report
 * older than any file it reads, and judges the gate report's rows.
 *
 * Test-only. No src, qa or docs edit.
 */
import { EventEmitter } from "node:events";
import type * as WorkerThreads from "node:worker_threads";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { runWorkflow, type WorkflowHost, type WorkflowNodeRequest, type WorkflowRunResult, type WorkflowSpawnResult } from "../src/workflow/runtime.js";

const FAKE_MARKER = "fake-worker-injected-death";
const HEAD = 'export const meta = { name: "child-crash", description: "injected worker death" };\n';
/** The literal of the worker "exit" listener inside runWorkflow (src/workflow/runtime.ts). */
const EXITED_BEFORE_COMPLETING = "Workflow worker exited before completing.";

/** A scripted stand-in for a worker thread: records what the host does to it. */
class FakeWorker extends EventEmitter {
  readonly posted: unknown[] = [];
  terminateCalls = 0;
  constructor(readonly options: { workerData?: { body?: string } }) {
    super();
  }
  postMessage(message: unknown): void {
    this.posted.push(message);
  }
  terminate(): Promise<number> {
    this.terminateCalls++;
    // A real terminate() ends in ONE "exit" event; the settled run ignores it.
    if (this.terminateCalls === 1) queueMicrotask(() => this.emit("exit", 1));
    return Promise.resolve(1);
  }
}

const fakeWorkers: FakeWorker[] = [];

vi.mock("node:worker_threads", async importOriginal => {
  const actual = await importOriginal<typeof WorkerThreads>();
  return {
    ...actual,
    Worker: function RoutedWorker(source: string, options: { workerData?: { body?: string } }) {
      const body = options.workerData?.body;
      if (typeof body === "string" && body.includes(FAKE_MARKER)) {
        const fake = new FakeWorker(options);
        fakeWorkers.push(fake);
        return fake;
      }
      return new actual.Worker(source, options as ConstructorParameters<typeof actual.Worker>[1]);
    },
  };
});

/** Resolves once `check` holds, re-tested on every `notify()`: event-driven, never a timer. */
function conditions() {
  const waiting: Array<{ check: () => boolean; resolve: () => void }> = [];
  return {
    notify(): void {
      for (const entry of [...waiting]) {
        if (!entry.check()) continue;
        waiting.splice(waiting.indexOf(entry), 1);
        entry.resolve();
      }
    },
    until(check: () => boolean): Promise<void> {
      if (check()) return Promise.resolve();
      return new Promise<void>(resolve => {
        waiting.push({ check, resolve });
      });
    },
  };
}

const hostFaults: string[] = [];
const onUncaught = (error: unknown) => hostFaults.push(`uncaughtException: ${String(error)}`);
const onUnhandled = (reason: unknown) => hostFaults.push(`unhandledRejection: ${String(reason)}`);
beforeEach(() => {
  hostFaults.length = 0;
  fakeWorkers.length = 0;
  process.on("uncaughtException", onUncaught);
  process.on("unhandledRejection", onUnhandled);
});
afterEach(() => {
  process.off("uncaughtException", onUncaught);
  process.off("unhandledRejection", onUnhandled);
});

/** One macrotask turn: lets any late rejection surface before the recorders are read. */
function flush(): Promise<void> {
  return new Promise<void>(resolve => setImmediate(resolve));
}

interface Scenario {
  readonly fake: FakeWorker;
  readonly spawnedPrompts: () => string[];
  readonly aborts: string[];
  readonly nodeCalls: Array<{ callId: number; signal: AbortSignal }>;
  readonly outcomeA: Promise<WorkflowRunResult>;
  readonly outcomeB: Promise<WorkflowRunResult>;
  /** Lets the host answer a still-pending spawn, as a late host would. */
  answer(prompt: string, result: WorkflowSpawnResult): void;
}

/**
 * Run B (REAL worker, same host) is in flight first. Run A (injected worker)
 * then starts two agents and one node() call and is left waiting on all three.
 * Runtime agent ids are per run, so B's wf-agent-0 and wf-agent-1 collide with
 * A's; B's third agent (wf-agent-2) is the id only B owns, so an abort set shared
 * across runs shows up as that id.
 */
async function startScenario(): Promise<Scenario> {
  const waits = conditions();
  const spawned: Array<{ prompt: string; settle(result: WorkflowSpawnResult): void }> = [];
  const aborts: string[] = [];
  const nodeCalls: Scenario["nodeCalls"] = [];
  const host: WorkflowHost = {
    spawnAgent(request) {
      return new Promise<WorkflowSpawnResult>(resolve => {
        spawned.push({ prompt: request.prompt, settle: resolve });
        waits.notify();
      });
    },
    abortAgent(agentId) {
      aborts.push(agentId);
    },
    callNode(request: WorkflowNodeRequest) {
      nodeCalls.push({ callId: request.callId, signal: request.signal });
      waits.notify();
      return new Promise<unknown>(() => {});
    },
    describeNodeEffect: () => "write",
  };
  const prompts = () => spawned.map(entry => entry.prompt);

  const outcomeB = runWorkflow({ script: `${HEAD}return await parallel([() => agent("b-0"), () => agent("b-1"), () => agent("b-2")]);`, host, concurrency: 3 });
  await waits.until(() => ["b-0", "b-1", "b-2"].every(prompt => prompts().includes(prompt)));

  const outcomeA = runWorkflow({ script: `${HEAD}// ${FAKE_MARKER}\nreturn null;`, host, concurrency: 2 });
  expect(fakeWorkers).toHaveLength(1);
  const fake = fakeWorkers[0] as FakeWorker;
  fake.emit("message", { type: "call", callId: 1, method: "agent", payload: { prompt: "a-0" } });
  fake.emit("message", { type: "call", callId: 2, method: "agent", payload: { prompt: "a-1" } });
  fake.emit("message", { type: "call", callId: 3, method: "node", payload: { capabilityId: "forge.write", input: {}, label: "open-node" } });
  await waits.until(() => prompts().includes("a-0") && prompts().includes("a-1") && nodeCalls.length === 1);
  expect(aborts).toEqual([]);

  return {
    fake,
    spawnedPrompts: prompts,
    aborts,
    nodeCalls,
    outcomeA,
    outcomeB,
    answer(prompt, result) {
      spawned.find(entry => entry.prompt === prompt)?.settle(result);
    },
  };
}

/** The assertions every injected death shares: C1 (one typed failure), C2, C3, C4. */
async function expectOnlyRunAFailed(scenario: Scenario, error: string): Promise<void> {
  const failed = await scenario.outcomeA;
  // C1: this run, typed, once. Never completed, never the abort path's "killed".
  expect(failed.status).toBe("failed");
  expect(failed.error).toBe(error);
  expect(failed.value).toBeUndefined();
  expect(failed.agentCount).toBe(2);
  // C3: exactly one abort per agent run A had in flight; wf-agent-2 belongs to
  // run B alone and must never appear (the shared-abort-set mutant adds it).
  expect(scenario.aborts.slice().sort()).toEqual(["wf-agent-0", "wf-agent-1"]);
  // C3: the open node() call was cancelled once and never re-issued.
  expect(scenario.nodeCalls).toHaveLength(1);
  expect(scenario.nodeCalls[0]?.signal.aborted).toBe(true);
  // C4: terminate was requested exactly once (finish ran once).
  expect(scenario.fake.terminateCalls).toBe(1);

  // C2: the concurrent run on the SAME host is untouched and completes with its own value.
  for (const index of [0, 1, 2]) scenario.answer(`b-${index}`, { ok: true, text: `b-${index}:ok` });
  const completed = await scenario.outcomeB;
  expect(completed.status).toBe("completed");
  expect(completed.value).toEqual(["b-0:ok", "b-1:ok", "b-2:ok"]);
  expect(completed.error).toBeUndefined();
  expect([0, 1, 2].map(index => completed.progress.some(entry => entry.type === "workflow_agent" && entry.index === index && entry.state === "done"))).toEqual([true, true, true]);
  expect(scenario.aborts.slice().sort()).toEqual(["wf-agent-0", "wf-agent-1"]);

  await flush();
  // C2: the host saw no uncaught error and no unhandled rejection.
  expect(hostFaults).toEqual([]);
}

describe("injected worker death (mocked node:worker_threads, NOT a real crash and NOT a sandbox property; the real-child proof rides wb-ksz slice 3)", () => {
  it("K1 'exit' alone settles only its run as the typed exited-before-completing failure", async () => {
    const scenario = await startScenario();
    scenario.fake.emit("exit", 1);
    await expectOnlyRunAFailed(scenario, EXITED_BEFORE_COMPLETING);
  });

  it("K2 'error' then 'exit' settles once, with the error's own message", async () => {
    const scenario = await startScenario();
    scenario.fake.emit("error", new Error("worker blew its heap"));
    scenario.fake.emit("exit", 1);
    await expectOnlyRunAFailed(scenario, "worker blew its heap");
  });

  it("K3 a non-Error 'error' payload is stringified into the same typed failure", async () => {
    const scenario = await startScenario();
    scenario.fake.emit("error", "plain string fault");
    scenario.fake.emit("exit", 1);
    await expectOnlyRunAFailed(scenario, "plain string fault");
  });

  it("K4 frames and answers arriving after death change nothing and reach no one", async () => {
    const scenario = await startScenario();
    scenario.fake.emit("exit", 1);
    const failed = await scenario.outcomeA;
    const spawnsAtDeath = scenario.spawnedPrompts().length;
    const postedAtDeath = scenario.fake.posted.length;
    const progressAtDeath = failed.progress.length;

    // A message delivered after death: a completion, and a brand-new agent call.
    scenario.fake.emit("message", { type: "complete", resultJson: JSON.stringify("too late") });
    scenario.fake.emit("message", { type: "call", callId: 9, method: "agent", payload: { prompt: "a-after-death" } });
    scenario.fake.emit("message", { type: "progress", entries: [{ type: "workflow_log", message: "log-after-death" }] });
    // The host answers A's orphaned children late, success and failure.
    scenario.answer("a-0", { ok: true, text: "a-0:late" });
    scenario.answer("a-1", { ok: false, error: "late failure" });
    await flush();

    expect(failed.status).toBe("failed");
    expect(failed.error).toBe(EXITED_BEFORE_COMPLETING);
    expect(scenario.spawnedPrompts()).toHaveLength(spawnsAtDeath);
    expect(scenario.spawnedPrompts()).not.toContain("a-after-death");
    // C1: the SETTLED run's progress is frozen at death. Late call and progress
    // frames must append nothing (removing the worker 'message' listener's
    // settled guard appends a phantom workflow_agent entry here).
    expect(failed.progress.slice(progressAtDeath)).toEqual([]);
    expect(JSON.stringify(failed.progress)).not.toContain("a-after-death");
    expect(JSON.stringify(failed.progress)).not.toContain("log-after-death");
    // C4: nothing is posted to the dead worker after settlement, and it was told to terminate once.
    expect(scenario.fake.posted).toHaveLength(postedAtDeath);
    expect(scenario.fake.terminateCalls).toBe(1);
    expect(scenario.nodeCalls).toHaveLength(1);

    await expectOnlyRunAFailed(scenario, EXITED_BEFORE_COMPLETING);
  });

  it("K5 a settled run's attached-but-inert error and exit listeners change nothing when fired again", async () => {
    const scenario = await startScenario();
    scenario.fake.emit("exit", 1);
    const failed = await scenario.outcomeA;
    const progressAtDeath = failed.progress.length;
    const abortsAtDeath = scenario.aborts.length;
    // Measured truth: runtime.ts never removes its three listeners, so the dead
    // Worker keeps 1 of each. They are inert only through the settled guards.
    expect([scenario.fake.listenerCount("message"), scenario.fake.listenerCount("error"), scenario.fake.listenerCount("exit")]).toEqual([1, 1, 1]);

    // A second 'error' (with a different message) and a second 'exit' after settlement.
    scenario.fake.emit("error", new Error("error after settlement"));
    scenario.fake.emit("exit", 2);
    await flush();

    expect(failed.status).toBe("failed");
    expect(failed.error).toBe(EXITED_BEFORE_COMPLETING);
    expect(failed.progress).toHaveLength(progressAtDeath);
    expect(scenario.aborts).toHaveLength(abortsAtDeath);
    expect(scenario.fake.terminateCalls).toBe(1);
    expect(scenario.nodeCalls).toHaveLength(1);

    await expectOnlyRunAFailed(scenario, EXITED_BEFORE_COMPLETING);
  });
});

describe("real-crash rows (no src-free vector at the cut base)", () => {
  it.todo("REAL: allocation exhaustion under resourceLimits kills the worker thread and settles only its run (needs a resourceLimits seam: the wb-ksz implementation slice, not yet filed)");
  it.todo("REAL: killing the isolated OS-process child leaves the host and a concurrent run untouched (needs the process-isolated child: the wb-ksz implementation slice, not yet filed)");
});
