/**
 * schedule-e2e.test.ts — End-to-end integration test for the scheduler.
 *
 * Unlike `schedule.test.ts` (which uses vi.useFakeTimers), this exercises
 * the full real-timer firing path: real `setTimeout` triggers `executeJob`,
 * a faithful `AgentManager` mock (promise resolves with the right semantics)
 * runs through to `finalize`, and the on-disk `ScheduleStore` reflects the
 * outcome. Catches integration bugs that fake-timer microtask scheduling
 * can hide.
 *
 * Uses short timings (hundreds of ms) so the test stays fast.
 */

import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SubagentScheduler } from "../src/schedule.js";
import { ScheduleStore } from "../src/schedule-store.js";

type FakeRecord = { status: string; promise: Promise<string>; resolve: () => void };

/**
 * Faithful AgentManager mock: spawn returns an id, getRecord returns a
 * record whose promise can be resolved at test time, status is mutable so
 * the test can assert success vs error inference.
 */
function makeFaithfulManager(initialStatus = "completed") {
  const records = new Map<string, FakeRecord>();
  return {
    records,
    initialStatus,
    spawn: vi.fn(function (this: any) {
      const id = "agent-" + Math.random().toString(36).slice(2, 10);
      let resolve!: () => void;
      const promise = new Promise<string>(r => { resolve = () => r(""); });
      records.set(id, { status: initialStatus, promise, resolve });
      // Auto-resolve on next tick — mimics a fast-finishing real agent.
      queueMicrotask(() => records.get(id)?.resolve());
      return id;
    }),
    awaitStartup: vi.fn(async () => {}),
    getRecord: vi.fn(function (this: any, id: string) {
      return records.get(id);
    }),
  } as any;
}

function makePi() {
  return { events: { emit: vi.fn() } } as any;
}

function makeCtx() {
  return {
    cwd: "/tmp",
    modelRegistry: { find: vi.fn(), getAll: () => [], getAvailable: () => [] },
    sessionManager: { getSessionId: () => "sess-e2e" },
  } as any;
}

/**
 * Lead time of the one-shot rows' schedule time, measured from a `Date.now()`
 * taken AFTER the scheduler and manager are set up (wb-irx, vko row 435 F1).
 *
 * `SubagentScheduler.detectSchedule` refuses a one-shot ISO time that is
 * `<= Date.now()` at validation ("Scheduled time ... is in the past."), so any
 * wall-clock stall between computing the time and `addJob`'s validation
 * consumes this margin. src/schedule.ts has no clock seam (it reads
 * `Date.now()` directly), so the cure is a margin that outweighs the stall:
 * the original 100ms lost to a >100ms stall under cap-8 suite contention
 * (cmd_07d7b33b9643, 1 of 3+ runs). Measured addJob validation latency over
 * 2500 calls (500 x 5 runs) with 96 CPU burners on top of 8 vitest workers:
 * p50 0ms, p99 <= 11ms, max 29ms. 500ms is ~17x that max and 5x the stall that
 * actually broke the row; the cost is ~400ms of real wait per one-shot row.
 */
const ONE_SHOT_MARGIN_MS = 500;

/** A schedule time ONE_SHOT_MARGIN_MS ahead of the current wall clock. */
function oneShotIso(): string {
  return new Date(Date.now() + ONE_SHOT_MARGIN_MS).toISOString();
}

/** Synchronously stall the event loop — a deterministic stand-in for CPU contention. */
function stall(ms: number): void {
  const end = Date.now() + ms;
  while (Date.now() < end) { /* spin */ }
}

/** Wait for a predicate, polling at 5ms intervals, with a deadline. */
async function waitFor(predicate: () => boolean, timeoutMs = ONE_SHOT_MARGIN_MS + 2000): Promise<void> {
  const start = Date.now();
  while (!predicate()) {
    if (Date.now() - start > timeoutMs) {
      throw new Error(`waitFor timed out after ${timeoutMs}ms`);
    }
    await new Promise(r => setTimeout(r, 5));
  }
}

describe("SubagentScheduler — end-to-end with real timers", () => {
  let tmp: string;
  let store: ScheduleStore;
  let scheduler: SubagentScheduler;

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "schedule-e2e-"));
    store = new ScheduleStore(join(tmp, "schedules.json"));
    scheduler = new SubagentScheduler();
  });

  afterEach(() => {
    scheduler.stop();
    rmSync(tmp, { recursive: true, force: true });
  });

  it("one-shot job: real setTimeout fires, agent runs, store reflects success", async () => {
    const manager = makeFaithfulManager("completed");
    const pi = makePi();
    scheduler.start(pi, makeCtx(), manager, store);

    // Fire ~100ms in the future. detectSchedule normalizes "+100ms" — but our
    // parser only accepts s/m/h/d, so use a near-future ISO timestamp instead.
    const future = oneShotIso();
    const job = scheduler.addJob({
      name: "e2e-once",
      description: "test",
      schedule: future,
      subagent_type: "general-purpose",
      prompt: "hello",
    });
    expect(job.scheduleType).toBe("once");

    // Wait for the spawn to occur (real timer fires) and the finalize promise
    // chain to settle. Polling, no fake timers.
    await waitFor(() => manager.spawn.mock.calls.length === 1);
    await waitFor(() => scheduler.list().find(j => j.id === job.id)?.lastStatus === "success");

    const final = scheduler.list().find(j => j.id === job.id)!;
    expect(final.lastStatus).toBe("success");
    expect(final.runCount).toBe(1);
    expect(final.enabled).toBe(false);  // one-shot auto-disabled
    expect(final.lastRun).toBeDefined();
  });

  it("one-shot job that errors: store records lastStatus error (regression — bug #1)", async () => {
    const manager = makeFaithfulManager("error");  // Agent terminates with error status
    const pi = makePi();
    scheduler.start(pi, makeCtx(), manager, store);

    const future = oneShotIso();
    const job = scheduler.addJob({
      name: "e2e-fail",
      description: "test",
      schedule: future,
      subagent_type: "general-purpose",
      prompt: "fail",
    });

    await waitFor(() => manager.spawn.mock.calls.length === 1);
    await waitFor(() => scheduler.list().find(j => j.id === job.id)?.lastStatus !== "running");

    expect(scheduler.list().find(j => j.id === job.id)?.lastStatus).toBe("error");
    expect(scheduler.list().find(j => j.id === job.id)?.runCount).toBe(1);
  });

  it("interval job: fires repeatedly, runCount grows", async () => {
    const manager = makeFaithfulManager("completed");
    const pi = makePi();
    scheduler.start(pi, makeCtx(), manager, store);

    // 100ms interval — wait for ~3 fires
    const job = scheduler.addJob({
      name: "e2e-interval",
      description: "test",
      schedule: "100s",  // Will be too long; override below.
      subagent_type: "general-purpose",
      prompt: "tick",
    });
    // Replace with a literal 100ms interval — easier than crafting a parseable shorthand for ms.
    // (parseInterval doesn't accept "ms"; we patch the persisted job and re-arm.)
    scheduler.updateJob(job.id, { intervalMs: 100, schedule: "100ms" });

    await waitFor(() => manager.spawn.mock.calls.length >= 3, 2000);

    const final = scheduler.list().find(j => j.id === job.id)!;
    expect(final.runCount).toBeGreaterThanOrEqual(3);
    expect(final.lastStatus).toBe("success");
    expect(final.enabled).toBe(true);  // intervals don't auto-disable

    scheduler.removeJob(job.id);
  });

  it("persistence: schedules survive re-instantiating the store on the same file", async () => {
    const manager = makeFaithfulManager("completed");
    const pi = makePi();
    scheduler.start(pi, makeCtx(), manager, store);

    const future = new Date(Date.now() + 60_000).toISOString();  // far enough not to fire
    const job = scheduler.addJob({
      name: "persistent",
      description: "x",
      schedule: future,
      subagent_type: "general-purpose",
      prompt: "x",
    });

    // Tear down the live scheduler; re-load from disk
    scheduler.stop();
    const reloadedStore = new ScheduleStore(join(tmp, "schedules.json"));
    expect(reloadedStore.list()).toHaveLength(1);
    expect(reloadedStore.list()[0].id).toBe(job.id);
    expect(reloadedStore.list()[0].name).toBe("persistent");
  });

  it("on-disk file shape: version=1 plus jobs array", async () => {
    const manager = makeFaithfulManager("completed");
    const pi = makePi();
    scheduler.start(pi, makeCtx(), manager, store);

    scheduler.addJob({
      name: "shape-test",
      description: "x",
      schedule: "1h",
      subagent_type: "general-purpose",
      prompt: "x",
    });

    const onDisk = JSON.parse(readFileSync(join(tmp, "schedules.json"), "utf-8"));
    expect(onDisk.version).toBe(1);
    expect(onDisk.jobs).toHaveLength(1);
    expect(onDisk.jobs[0]).toMatchObject({
      name: "shape-test",
      schedule: "1h",
      scheduleType: "interval",
      enabled: true,
      runCount: 0,
    });
  });

  it("subagents:scheduled events fire across the lifecycle", async () => {
    const manager = makeFaithfulManager("completed");
    const pi = makePi();
    scheduler.start(pi, makeCtx(), manager, store);

    const future = oneShotIso();
    const job = scheduler.addJob({
      name: "events", description: "x", schedule: future,
      subagent_type: "general-purpose", prompt: "x",
    });

    await waitFor(() => manager.spawn.mock.calls.length === 1);

    const eventTypes = pi.events.emit.mock.calls
      .filter((c: any[]) => c[0] === "subagents:scheduled")
      .map((c: any[]) => c[1].type);

    expect(eventTypes).toContain("added");
    expect(eventTypes).toContain("fired");

    scheduler.removeJob(job.id);
    const after = pi.events.emit.mock.calls
      .filter((c: any[]) => c[0] === "subagents:scheduled")
      .map((c: any[]) => c[1].type);
    expect(after).toContain("removed");
  });

  it("one-shot job survives a pre-validation stall wider than the old 100ms margin (wb-irx R1)", async () => {
    const manager = makeFaithfulManager("completed");
    const pi = makePi();
    scheduler.start(pi, makeCtx(), manager, store);

    // Deterministic contention: compute the schedule time, then lose 250ms
    // (> the original 100ms margin, < ONE_SHOT_MARGIN_MS) before addJob
    // validates it. With a 100ms margin this throws "is in the past".
    const future = oneShotIso();
    stall(250);
    const job = scheduler.addJob({
      name: "e2e-stalled",
      description: "test",
      schedule: future,
      subagent_type: "general-purpose",
      prompt: "hello",
    });
    expect(job.scheduleType).toBe("once");

    await waitFor(() => manager.spawn.mock.calls.length === 1);
    await waitFor(() => scheduler.list().find(j => j.id === job.id)?.lastStatus === "success");
    expect(scheduler.list().find(j => j.id === job.id)?.runCount).toBe(1);
  });

  it("control: a genuinely past schedule time is still refused and nothing is created (wb-irx R2)", () => {
    const manager = makeFaithfulManager("completed");
    scheduler.start(makePi(), makeCtx(), manager, store);

    for (const offsetMs of [-1, -1000, -ONE_SHOT_MARGIN_MS]) {
      const past = new Date(Date.now() + offsetMs).toISOString();
      expect(() => scheduler.addJob({
        name: `e2e-past${offsetMs}`,
        description: "test",
        schedule: past,
        subagent_type: "general-purpose",
        prompt: "never",
      })).toThrow(/is in the past/);
    }
    expect(scheduler.list()).toHaveLength(0);
    expect(manager.spawn).not.toHaveBeenCalled();
  });
});
