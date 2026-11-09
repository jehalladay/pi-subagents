/**
 * wb-r5q2 [MWI-telemetry] (slice PI-7): red-first acceptance for a byte bound on the progress a run retains, the stage records
 * a run reports on the monotonic clock, and the fixture leg of the multi-workflow load journey. Requirements EAT-R077..EAT-R079
 * of docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents
 * master 0b25e14e084a5b1d612e780bc12a927b3a80dd62 (lines 1438-1470, the telemetry group; the triage tree is a master-only archive), quoted:
 *
 * - EAT-R077 "Pi MUST bound retained progress and provider-output bytes." Acceptance: "Flood progress and provider logs past
 *   configured byte cap; retained memory/output accounting stays within declared bound and honest dropped-event count equals
 *   dropped inputs." Mutant: "Retain every event but truncate only rendered text."
 * - EAT-R078 "Pi MUST record monotonic stage timing joined to native IDs." Acceptance: "Inject wall-clock rollback during
 *   admission/load/SDK/gate stages; monotonic durations remain nonnegative and each measured provider stage retains its own
 *   bytes and native ID." Mutant: "Use Date.now deltas or invent native IDs from array index."
 * - EAT-R079 "Pi MUST measure host load using simultaneous real invocations." Acceptance: "Named load journey records peak
 *   concurrent queries/processes/Forge ops, queue wait, memory, bytes and dropped events with exact versions/ref; includes
 *   floods and queued cancels plus baseline script comparison." Mutant: "Replace measured multi-workflow counters with
 *   one-workflow semaphore limits."
 *
 * The wall-clock rollback is injected with vi.useFakeTimers({ toFake: ["Date"] }): Date is frozen and each host call below moves
 * it back 60 s while it holds on the real clock, so a Date.now delta across that call is about -60000 ms. performance.now()
 * is not faked. Every case states its own time budget (the third argument of it).
 *
 * What a "provider" is here: the fixture host each case builds. A real Claude SDK session, a real gate process and a real
 * native Forge operation are the PI-MULTIWORKFLOW-LOAD gate's producer leg, which this suite does not run.
 *
 * NOT CLAIMED by this suite: memory the caller's onProgress consumer retains; memory the script realm retains (agent answers
 * the script keeps); the runtime's other per-run state (labels, open launches); a stage for a call replayed from the resume
 * journal; the bytes of a node stage whose answer fails output validation; a stage of an agent re-dispatched after a pause or
 * a retry; any clock other than performance.now(); the producer leg of PI-MULTIWORKFLOW-LOAD; the durationMs of a progress
 * row no case names (a replayed agent's or node's row, an acknowledged or an uncertain node's row, and a row written before
 * its host call, such as an admission refusal or an agent skipped before dispatch); which whole number a row's durationMs
 * holds, the nearest one or the one below or above the measure (a case that names a row pins a whole number of
 * milliseconds and, where it names the timed host call, one no less than that call's whole milliseconds); for an agent's
 * admission stage, an index read from the run's running count of agents when the stage ends rather than from the call itself
 * (only R078-GATE-INDEX, R078-NODE-INDEX, R078-ADMISSION-NODE, R078-ADMISSION-INDEX, R078-ADMISSION-REFUSED, R078-END-ORDER,
 * R078-GATE-REFUSED and R078-NODE-DISPATCH count a later call before a stage ends, for the sdk, gate, node, node admission
 * and load stages); where within its acquire call a lease's waitedMs starts and stops, past the two bounds
 * R078-ADMISSION-ROLLBACK and R078-ADMISSION-NODE pin on an admission stage (a queued request's no shorter than the
 * holder's hold from the moment it queued, every lease's no longer than its acquire call).
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  FLOOD_ROWS,
  JOURNEY,
  LIMITS,
  LOAD_RUNS,
  PROGRESS_BYTES,
  RUN_CONCURRENCY,
  runLoadJourney,
} from "../qa/workbench/mwi-multiworkflow-load.mjs";
import { HostAdmission, type HostAdmissionLease, type HostAdmissionPool, type HostAdmissionRequest } from "../src/workflow/admission.js";
import type { WorkflowAgentEntry, WorkflowEntry, WorkflowNodeEntry } from "../src/workflow/progress.js";
import {
  type RunWorkflowOptions,
  runWorkflow,
  type WorkflowHost,
  type WorkflowRunResult,
  WorkflowRuntimeError,
} from "../src/workflow/runtime.js";
import { ByteBoundedLog, type RetentionCounts, WORKFLOW_STAGES, type WorkflowStageRecord } from "../src/workflow/telemetry.js";

const HEAD = 'export const meta = { name: "telemetry", description: "telemetry probes" };\n';
const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

/** The test's own measure of an entry, independent of the module's: UTF-8 bytes of its JSON text. */
const bytesOf = (value: unknown): number => Buffer.byteLength(JSON.stringify(value), "utf8");
const total = (entries: readonly WorkflowEntry[]): number => entries.reduce((sum, entry) => sum + bytesOf(entry), 0);
/** The counts an honest bounded log reports for what onProgress received and what the result retained. */
function honest(received: readonly WorkflowEntry[], retained: readonly WorkflowEntry[], limitBytes: number): RetentionCounts {
  return {
    limitBytes,
    offeredEvents: received.length,
    offeredBytes: total(received),
    heldEvents: retained.length,
    heldBytes: total(retained),
    droppedEvents: received.length - retained.length,
    droppedBytes: total(received) - total(retained),
  };
}

const agentRows = (entries: readonly WorkflowEntry[]): WorkflowAgentEntry[] =>
  entries.filter((entry): entry is WorkflowAgentEntry => entry.type === "workflow_agent");
const nodeRows = (entries: readonly WorkflowEntry[]): WorkflowNodeEntry[] =>
  entries.filter((entry): entry is WorkflowNodeEntry => entry.type === "workflow_node");
const logMessages = (entries: readonly WorkflowEntry[]): string[] =>
  entries.flatMap(entry => (entry.type === "workflow_log" ? [entry.message] : []));

/** Start a run of `body`; `received` collects every entry onProgress is handed. */
function run(body: string, options: Omit<RunWorkflowOptions, "script" | "onProgress">, received: WorkflowEntry[] = []): Promise<WorkflowRunResult> {
  return runWorkflow({ script: HEAD + body, ...options, onProgress: entries => { received.push(...entries); } });
}

/** A host whose agents answer at once with their prompt. */
function answeringHost(): WorkflowHost {
  return { async spawnAgent(request) { return { ok: true, text: request.prompt }; }, abortAgent() {} };
}

/** 400 log rows, each holding two-byte and three-byte UTF-8 characters, so an entry's UTF-8 bytes exceed its UTF-16 length. */
const FLOOD = 'for (let i = 0; i < 400; i++) log("flood-\u00e9-\u2713-" + i + "-" + "x".repeat(60));\nreturn "done";';

afterEach(() => {
  vi.useRealTimers();
});

/** Freezes Date at a fixed instant; performance.now() keeps running. */
function freezeWallClock(): void {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-11-07T12:00:00.000Z"));
}
/** Moves the frozen wall clock back 60 s and holds `holdMs` on the real clock; returns the monotonic window it spent. */
async function rolledHold(holdMs = 30): Promise<number> {
  const startedAt = performance.now();
  vi.setSystemTime(Date.now() - 60_000);
  await sleep(holdMs);
  return performance.now() - startedAt;
}

/** A collector for onStage, and the telemetry option that feeds it under a bound wide enough to drop nothing here. */
function stageProbe(): { records: WorkflowStageRecord[]; telemetry: NonNullable<RunWorkflowOptions["telemetry"]> } {
  const records: WorkflowStageRecord[] = [];
  return { records, telemetry: { progressBytes: 1 << 20, onStage: record => { records.push(record); } } };
}

/**
 * A HostAdmission that admits exactly as HostAdmission does and keeps, for each lease it grants, the pools the lease holds and
 * the lease's own waitedMs beside the caller's view of the acquire call on the monotonic clock: when it was asked, when its
 * request queued (when it had to) and when it answered. The wait admission.ts measured is read beside the admission stage the
 * run reports (R078-ADMISSION-ROLLBACK, R078-ADMISSION-NODE, R078-ADMISSION-INDEX), and the pools and the queueing tell one
 * lease from another. The lease's clock starts after the call is asked and before its request queues, and stops before the
 * call answers, so a waitedMs is never shorter than the time from the queueing to the admission and never longer than the
 * call.
 */
class LeaseLog extends HostAdmission {
  readonly granted: {
    readonly pools: readonly HostAdmissionPool[];
    readonly askedAt: number;
    readonly queuedAt: number | undefined;
    readonly answeredAt: number;
    readonly waitedMs: number;
  }[] = [];

  override async acquire(requested: readonly HostAdmissionPool[], request: HostAdmissionRequest = {}): Promise<HostAdmissionLease> {
    const queuedAt: number[] = [];
    const askedAt = performance.now();
    const lease = await super.acquire(requested, {
      ...request,
      onQueued: wait => {
        queuedAt.push(performance.now());
        request.onQueued?.(wait);
      },
    });
    this.granted.push({ pools: lease.pools, askedAt, queuedAt: queuedAt[0], answeredAt: performance.now(), waitedMs: lease.waitedMs });
    return lease;
  }
}

describe("EAT-R077: a run given telemetry.progressBytes retains at most that many bytes of progress entries and counts every entry it drops", () => {
  it("R077-LOG-BOUND: a 100-byte ByteBoundedLog keeps the newest items that fit, drops an item larger than the bound without evicting, and counts each drop in items and bytes", () => {
    const log = new ByteBoundedLog<string>(100, item => item.length);
    expect(log.offer("a".repeat(40))).toBe(true);
    expect(log.offer("b".repeat(40))).toBe(true);
    expect(log.offer("c".repeat(40))).toBe(true);
    expect(log.entries()).toEqual(["b".repeat(40), "c".repeat(40)]);
    expect(log.counts()).toEqual({ limitBytes: 100, offeredEvents: 3, offeredBytes: 120, heldEvents: 2, heldBytes: 80, droppedEvents: 1, droppedBytes: 40 });
    expect(log.offer("d".repeat(101))).toBe(false);
    expect(log.entries()).toEqual(["b".repeat(40), "c".repeat(40)]);
    expect(log.offer("e".repeat(100))).toBe(true);
    expect(log.entries()).toEqual(["e".repeat(100)]);
    expect(log.counts()).toEqual({ limitBytes: 100, offeredEvents: 5, offeredBytes: 321, heldEvents: 1, heldBytes: 100, droppedEvents: 4, droppedBytes: 221 });
    expect(log.offer("")).toBe(true);
    expect(log.entries()).toEqual(["e".repeat(100), ""]);
  }, 5_000);

  it.each([0, -1, 0.5, Number.NaN, Number.POSITIVE_INFINITY, 2 ** 53])("R077-LOG-LIMIT: a ByteBoundedLog bound of %s is refused with a RangeError", limit => {
    expect(() => new ByteBoundedLog<string>(limit, item => item.length)).toThrow(RangeError);
  }, 5_000);

  it("R077-LOG-LIMIT: ByteBoundedLog bounds of 1 and Number.MAX_SAFE_INTEGER are accepted", () => {
    expect(new ByteBoundedLog<string>(1, item => item.length).counts().limitBytes).toBe(1);
    expect(new ByteBoundedLog<string>(Number.MAX_SAFE_INTEGER, item => item.length).counts().limitBytes).toBe(Number.MAX_SAFE_INTEGER);
  }, 5_000);

  it("R077-PROGRESS-FLOOD: a run flooded with 400 log rows under a 2048-byte bound retains, unchanged, the newest entries that fit, and its report counts every entry onProgress was handed", async () => {
    const received: WorkflowEntry[] = [];
    const result = await run(FLOOD, { host: answeringHost(), telemetry: { progressBytes: 2048 } }, received);
    expect(result.status).toBe("completed");
    expect(logMessages(received)).toHaveLength(400);
    expect(total(received)).toBeGreaterThan(received.reduce((sum, entry) => sum + JSON.stringify(entry).length, 0));
    const retained = result.progress;
    expect(retained.length).toBeGreaterThan(0);
    expect(retained.length).toBeLessThan(received.length);
    expect(total(retained)).toBeLessThanOrEqual(2048);
    expect(retained).toEqual(received.slice(received.length - retained.length));
    expect(result.telemetry?.progress).toEqual(honest(received, retained, 2048));
  }, 30_000);

  it("R077-PROVIDER-FLOOD: three gates that fail with 20000-byte outputs under an 8192-byte bound leave no retained entry holding that output, and their bytes are counted dropped", async () => {
    const received: WorkflowEntry[] = [];
    const output = "E".repeat(20_000);
    const host: WorkflowHost = {
      async spawnAgent(request) { return { ok: true, text: `built ${request.prompt}` }; },
      abortAgent() {},
      async runGate() { return { ok: false, output }; },
    };
    const result = await run('return await parallel([0, 1, 2].map(i => () => agent("gated-" + i, { gate: "npm test" })));', { host, telemetry: { progressBytes: 8192 } }, received);
    expect(result.status).toBe("completed");
    expect(agentRows(received).filter(row => row.state === "error" && row.error === output)).toHaveLength(3);
    expect(total(result.progress)).toBeLessThanOrEqual(8192);
    expect(agentRows(result.progress).some(row => row.error === output)).toBe(false);
    expect(result.telemetry?.progress.droppedBytes).toBeGreaterThanOrEqual(3 * 20_000);
    expect(result.telemetry?.progress).toEqual(honest(received, result.progress, 8192));
  }, 30_000);

  it("R077-OVERSIZED: a log row larger than a 1024-byte bound on its own is dropped and evicts none of the entries before it", async () => {
    const received: WorkflowEntry[] = [];
    const result = await run('log("small-1"); log("small-2"); log("L".repeat(5000)); log("small-3");\nreturn 1;', { host: answeringHost(), telemetry: { progressBytes: 1024 } }, received);
    expect(result.status).toBe("completed");
    expect(received.some(entry => bytesOf(entry) > 1024)).toBe(true);
    expect(logMessages(result.progress)).toEqual(["small-1", "small-2", "small-3"]);
    expect(result.telemetry?.progress.droppedEvents).toBe(1);
    expect(result.telemetry?.progress).toEqual(honest(received, result.progress, 1024));
  }, 30_000);

  it("R077-UNSET: without telemetry the same 400-row flood is retained whole and the result carries no telemetry report", async () => {
    const received: WorkflowEntry[] = [];
    const result = await run(FLOOD, { host: answeringHost() }, received);
    expect(result.status).toBe("completed");
    expect(result.progress).toEqual(received);
    expect("telemetry" in result).toBe(false);
  }, 30_000);

  it.each([0, -1, 0.5, Number.NaN, Number.POSITIVE_INFINITY, 2 ** 53])("R077-INVALID: a telemetry.progressBytes of %s makes runWorkflow reject with a WorkflowRuntimeError and dispatches nothing", async progressBytes => {
    const spawned: string[] = [];
    const host: WorkflowHost = { async spawnAgent(request) { spawned.push(request.prompt); return { ok: true, text: "x" }; }, abortAgent() {} };
    const outcome = run('return await agent("never");', { host, telemetry: { progressBytes } });
    await expect(outcome).rejects.toThrow(WorkflowRuntimeError);
    await expect(outcome).rejects.toThrow("Workflow telemetry.progressBytes must be a positive integer.");
    expect(spawned).toEqual([]);
  }, 10_000);

  it("R077-INVALID: a telemetry.progressBytes of Number.MAX_SAFE_INTEGER is accepted and drops nothing", async () => {
    const received: WorkflowEntry[] = [];
    const result = await run(FLOOD, { host: answeringHost(), telemetry: { progressBytes: Number.MAX_SAFE_INTEGER } }, received);
    expect(result.status).toBe("completed");
    expect(result.progress).toEqual(received);
    expect(result.telemetry?.progress).toEqual(honest(received, received, Number.MAX_SAFE_INTEGER));
  }, 30_000);
});

describe("EAT-R078: each stage a run reports is timed on the monotonic clock and carries its own bytes and its provider's own id", () => {
  it("R078-SDK-ROLLBACK: an agent whose host call rolls the wall clock back 60 s reports an sdk stage no shorter than that call on the monotonic clock, and its done row's durationMs is a whole number of milliseconds, not negative", async () => {
    freezeWallClock();
    const windows: number[] = [];
    const received: WorkflowEntry[] = [];
    const { records, telemetry } = stageProbe();
    const host: WorkflowHost = {
      async spawnAgent() { windows.push(await rolledHold()); return { ok: true, text: "answer", sessionId: "sdk-session-rolled" }; },
      abortAgent() {},
    };
    const result = await run('return await agent("rolled");', { host, telemetry }, received);
    expect(result.status).toBe("completed");
    const sdk = records.filter(record => record.stage === "sdk");
    expect(sdk).toHaveLength(1);
    expect(sdk[0]).toEqual({ stage: "sdk", kind: "agent", index: 0, durationMs: sdk[0]?.durationMs, bytes: 6, nativeId: "sdk-session-rolled" });
    expect(sdk[0]?.durationMs).toBeGreaterThanOrEqual(windows[0] ?? Number.POSITIVE_INFINITY);
    expect(sdk[0]?.durationMs).toBeLessThan(60_000);
    const done = agentRows(received).find(row => row.state === "done");
    expect(Number.isInteger(done?.durationMs)).toBe(true);
    expect(done?.durationMs).toBeGreaterThanOrEqual(Math.floor(windows[0] ?? Number.POSITIVE_INFINITY));
  }, 30_000);

  it("R078-SDK-FAILED-ROLLBACK: an agent whose host call rolls the wall clock back 60 s and answers not ok writes one error row, whose durationMs is a whole number of milliseconds no less than that call's whole milliseconds", async () => {
    freezeWallClock();
    const windows: number[] = [];
    const received: WorkflowEntry[] = [];
    const host: WorkflowHost = {
      async spawnAgent() { windows.push(await rolledHold()); return { ok: false, error: "provider refused" }; },
      abortAgent() {},
    };
    const result = await run('return await agent("refused");', { host }, received);
    expect(result.status).toBe("completed");
    expect(result.value).toBeNull();
    const failed = agentRows(received).filter(row => row.state === "error");
    expect(failed.map(row => row.error)).toEqual(["provider refused"]);
    expect(Number.isInteger(failed[0]?.durationMs)).toBe(true);
    expect(failed[0]?.durationMs).toBeGreaterThanOrEqual(Math.floor(windows[0] ?? Number.POSITIVE_INFINITY));
  }, 30_000);

  it("R078-GATE-ROLLBACK: a gate the runtime runs through host.runGate while the wall clock rolls back 60 s reports a gate stage no shorter than that call, with its output's UTF-8 bytes and no native id", async () => {
    freezeWallClock();
    const windows: number[] = [];
    const { records, telemetry } = stageProbe();
    const output = "gate ok ✓";
    const host: WorkflowHost = {
      async spawnAgent() { return { ok: true, text: "built" }; },
      abortAgent() {},
      async runGate() { windows.push(await rolledHold()); return { ok: true, output }; },
    };
    const result = await run('return await agent("gated", { gate: "npm test" });', { host, telemetry });
    expect(result.status).toBe("completed");
    const gate = records.filter(record => record.stage === "gate");
    expect(gate).toHaveLength(1);
    expect(gate[0]).toEqual({ stage: "gate", kind: "agent", index: 0, durationMs: gate[0]?.durationMs, bytes: Buffer.byteLength(output, "utf8") });
    expect("nativeId" in (gate[0] ?? {})).toBe(false);
    expect(gate[0]?.durationMs).toBeGreaterThanOrEqual(windows[0] ?? Number.POSITIVE_INFINITY);
    expect(gate[0]?.durationMs).toBeLessThan(60_000);
  }, 30_000);

  it("R078-GATE-INDEX: two gated agents whose host calls are in flight at once each report one sdk stage and one gate stage at their own position, carrying the UTF-8 bytes of their own answer and of their own gate output", async () => {
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const outputs = new Map<string, string>();
    const answers = new Map<string, string>();
    let inFlight = 0;
    let peakInFlight = 0;
    let bothIn: () => void = () => {};
    const together = new Promise<void>(resolve => { bothIn = resolve; });
    const host: WorkflowHost = {
      async spawnAgent(request) {
        inFlight++;
        peakInFlight = Math.max(peakInFlight, inFlight);
        if (inFlight === 2) bothIn();
        let fallback: ReturnType<typeof setTimeout> | undefined;
        await Promise.race([together, new Promise<void>(resolve => { fallback = setTimeout(resolve, 5_000); })]);
        clearTimeout(fallback);
        inFlight--;
        const text = `built ${request.prompt}`;
        answers.set(request.agentId, text);
        return { ok: true, text };
      },
      abortAgent() {},
      async runGate(_command, gateOptions) {
        const output = `gate ok ${"\u2713".repeat(outputs.size + 1)}`;
        outputs.set(gateOptions.agentId, output);
        return { ok: true, output };
      },
    };
    const result = await run('return await parallel([() => agent("gated-a", { gate: "npm test" }), () => agent("gated-bb", { gate: "npm test" })]);', { host, concurrency: 2, telemetry }, received);
    expect(result.status).toBe("completed");
    expect(peakInFlight).toBe(2);
    const done = agentRows(received).filter(row => row.state === "done").sort((a, b) => a.index - b.index);
    expect(done.map(row => row.index)).toEqual([0, 1]);
    expect(new Set(done.map(row => Buffer.byteLength(outputs.get(row.agentId ?? "") ?? "", "utf8"))).size).toBe(2);
    const answerBytes = (row: WorkflowAgentEntry): number => Buffer.byteLength(answers.get(row.agentId ?? "") ?? "", "utf8");
    expect(done.map(answerBytes)).toEqual([Buffer.byteLength("built gated-a", "utf8"), Buffer.byteLength("built gated-bb", "utf8")]);
    const sdk = records.filter(record => record.stage === "sdk").sort((a, b) => a.index - b.index);
    expect(sdk).toEqual(done.map((row, at) => ({ stage: "sdk", kind: "agent", index: row.index, durationMs: sdk[at]?.durationMs, bytes: answerBytes(row) })));
    const gate = records.filter(record => record.stage === "gate").sort((a, b) => a.index - b.index);
    expect(gate).toEqual(done.map((row, at) => ({ stage: "gate", kind: "agent", index: row.index, durationMs: gate[at]?.durationMs, bytes: Buffer.byteLength(outputs.get(row.agentId ?? "") ?? "", "utf8") })));
  }, 30_000);

  it("R078-NODE-ROLLBACK: a forge.gate.status node whose host call rolls the wall clock back 60 s reports a node stage no shorter than that call, joined to the operation id of its answer, and its done row's durationMs is a whole number of milliseconds, not negative", async () => {
    freezeWallClock();
    const windows: number[] = [];
    const received: WorkflowEntry[] = [];
    const { records, telemetry } = stageProbe();
    const operation = `op-${"a1".repeat(16)}`;
    const answer = { contract: "forge.gate.status/v1", source: { operation_id: operation, status: "passed" } };
    const host: WorkflowHost = {
      async spawnAgent() { return { ok: true, text: "unused" }; },
      abortAgent() {},
      async callNode() { windows.push(await rolledHold()); return answer; },
      describeNodeEffect: () => "read",
    };
    const result = await run('return await node("forge.gate.status", {}, { label: "gate-status" });', { host, telemetry }, received);
    expect(result.status).toBe("completed");
    const node = records.filter(record => record.stage === "node");
    expect(node).toHaveLength(1);
    expect(node[0]).toEqual({ stage: "node", kind: "node", index: 0, durationMs: node[0]?.durationMs, bytes: bytesOf(answer), nativeId: operation });
    expect(node[0]?.durationMs).toBeGreaterThanOrEqual(windows[0] ?? Number.POSITIVE_INFINITY);
    expect(node[0]?.durationMs).toBeLessThan(60_000);
    const done = nodeRows(received).find(row => row.state === "done");
    expect(Number.isInteger(done?.durationMs)).toBe(true);
    expect(done?.durationMs).toBeGreaterThanOrEqual(Math.floor(windows[0] ?? Number.POSITIVE_INFINITY));
  }, 30_000);

  it("R078-NODE-REJECTED-ROLLBACK: a node whose host call rolls the wall clock back 60 s and then rejects writes one error row, whose durationMs is a whole number of milliseconds no less than that call's whole milliseconds", async () => {
    freezeWallClock();
    const windows: number[] = [];
    const received: WorkflowEntry[] = [];
    const host: WorkflowHost = {
      async spawnAgent() { return { ok: true, text: "unused" }; },
      abortAgent() {},
      async callNode() { windows.push(await rolledHold()); throw new Error("transport down"); },
      describeNodeEffect: () => "read",
    };
    const result = await run('try { await node("hyperunix.find", {}, { label: "down" }); } catch { return "rejected"; }\nreturn "answered";', { host }, received);
    expect(result.status).toBe("completed");
    expect(result.value).toBe("rejected");
    const failed = nodeRows(received).filter(row => row.state === "error");
    expect(failed.map(row => row.error)).toEqual(["transport down"]);
    expect(Number.isInteger(failed[0]?.durationMs)).toBe(true);
    expect(failed[0]?.durationMs).toBeGreaterThanOrEqual(Math.floor(windows[0] ?? Number.POSITIVE_INFINITY));
  }, 30_000);

  it("R078-NODE-INDEX: two forge.gate.status nodes whose host calls are in flight at once each report one node stage at their own position, joined to the operation id of their own answer", async () => {
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const operations: Readonly<Record<string, string>> = { first: `op-${"b2".repeat(16)}`, second: `op-${"c3".repeat(16)}` };
    let inFlight = 0;
    let peakInFlight = 0;
    let bothIn: () => void = () => {};
    const together = new Promise<void>(resolve => { bothIn = resolve; });
    const host: WorkflowHost = {
      async spawnAgent() { return { ok: true, text: "unused" }; },
      abortAgent() {},
      async callNode(request) {
        inFlight++;
        peakInFlight = Math.max(peakInFlight, inFlight);
        if (inFlight === 2) bothIn();
        let fallback: ReturnType<typeof setTimeout> | undefined;
        await Promise.race([together, new Promise<void>(resolve => { fallback = setTimeout(resolve, 5_000); })]);
        clearTimeout(fallback);
        inFlight--;
        return { contract: "forge.gate.status/v1", source: { operation_id: operations[request.label], status: "passed" } };
      },
      describeNodeEffect: () => "read",
    };
    const result = await run('return await parallel([() => node("forge.gate.status", {}, { label: "first" }), () => node("forge.gate.status", {}, { label: "second" })]);', { host, telemetry }, received);
    expect(result.status).toBe("completed");
    expect(peakInFlight).toBe(2);
    const done = nodeRows(received).filter(row => row.state === "done").sort((a, b) => a.index - b.index);
    expect(done.map(row => [row.index, row.label])).toEqual([[0, "first"], [1, "second"]]);
    const node = records.filter(record => record.stage === "node").sort((a, b) => a.index - b.index);
    expect(node).toEqual(done.map((row, at) => {
      const answer = { contract: "forge.gate.status/v1", source: { operation_id: operations[row.label], status: "passed" } };
      return { stage: "node", kind: "node", index: row.index, durationMs: node[at]?.durationMs, bytes: bytesOf(answer), nativeId: operations[row.label] };
    }));
  }, 30_000);

  it("R078-LOAD-ROLLBACK: a nested workflow() whose host.loadWorkflow rolls the wall clock back 60 s reports a load stage no shorter than that call with the loaded script's UTF-8 bytes; a refused load reports its message's bytes and a thrown one the thrown message's, each with no native id", async () => {
    freezeWallClock();
    const windows: number[] = [];
    const { records, telemetry } = stageProbe();
    const child = 'export const meta = { name: "child", description: "nested \u00e9" };\nreturn 7;';
    const refusal = "No saved workflow named \u201cmissing\u201d.";
    const host: WorkflowHost = {
      async spawnAgent() { return { ok: true, text: "unused" }; },
      abortAgent() {},
      async loadWorkflow(ref) {
        if (ref.name === "missing") return { ok: false, message: refusal };
        if (ref.name === "broken") throw new Error("loader crashed \u2717");
        windows.push(await rolledHold());
        return { ok: true, script: child };
      },
    };
    const body = [
      'const value = await workflow("child");',
      'let missing = "loaded"; try { await workflow("missing"); } catch { missing = "refused"; }',
      'let broken = "loaded"; try { await workflow("broken"); } catch { broken = "refused"; }',
      "return [value, missing, broken];",
    ].join("\n");
    const result = await run(body, { host, telemetry });
    expect(result.status).toBe("completed");
    expect(result.value).toEqual([7, "refused", "refused"]);
    const load = records.filter(record => record.stage === "load");
    expect(load).toEqual([
      { stage: "load", kind: "workflow", index: 0, durationMs: load[0]?.durationMs, bytes: Buffer.byteLength(child, "utf8") },
      { stage: "load", kind: "workflow", index: 1, durationMs: load[1]?.durationMs, bytes: Buffer.byteLength(refusal, "utf8") },
      { stage: "load", kind: "workflow", index: 2, durationMs: load[2]?.durationMs, bytes: Buffer.byteLength("loader crashed \u2717", "utf8") },
    ]);
    for (const record of load) expect("nativeId" in record).toBe(false);
    expect(load[0]?.durationMs).toBeGreaterThanOrEqual(windows[0] ?? Number.POSITIVE_INFINITY);
    expect(load[0]?.durationMs).toBeLessThan(60_000);
  }, 30_000);

  it("R078-ADMISSION-ROLLBACK: an agent queued on a one-query host budget while the holder rolls the wall clock back 60 s reports an admission stage of its monotonic wait, at least 30 ms, with 0 bytes: its own lease's waitedMs, no shorter than the holder's hold from the moment it queued; the two agents' admission stages are the two leases' waitedMs, each at its own agent's position and no longer than its acquire call", async () => {
    freezeWallClock();
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const hostAdmission = new LeaseLog({ sdkQueries: 1, childProcesses: 8, forgeOperations: 8, queueDeadlineMs: 30_000 });
    const heldUntil: number[] = [];
    const host: WorkflowHost = {
      async spawnAgent(request) {
        if (request.prompt === "holder") {
          await rolledHold(80);
          heldUntil.push(performance.now());
        }
        return { ok: true, text: request.prompt };
      },
      abortAgent() {},
    };
    const result = await run('return await parallel([() => agent("holder"), () => agent("queued")]);', { host, hostAdmission, concurrency: 2, telemetry }, received);
    expect(result.status).toBe("completed");
    const indexOf = (prompt: string): number | undefined => agentRows(received).find(row => row.promptPreview === prompt)?.index;
    const admission = records.filter(record => record.stage === "admission");
    expect(admission.map(record => record.kind)).toEqual(["agent", "agent"]);
    for (const record of admission) expect(record.durationMs).toBeGreaterThanOrEqual(0);
    const queued = admission.find(record => record.index === indexOf("queued"));
    expect(queued).toEqual({ stage: "admission", kind: "agent", index: indexOf("queued"), durationMs: queued?.durationMs, bytes: 0 });
    expect(queued?.durationMs).toBeGreaterThanOrEqual(30);
    expect(queued?.durationMs).toBeLessThan(60_000);
    // The waits admission.ts measured: one lease waited (the queued agent's) and its stage is that lease's own waitedMs; the two
    // stages together are the two leases' waits. The holder's lease goes back only once its host call has answered, so the
    // queued wait spans the holder's hold from the moment the agent queued (at least 30 ms of it), and no lease's wait is
    // longer than the acquire call that granted it.
    const waited = hostAdmission.granted.filter(lease => lease.queuedAt !== undefined);
    expect(waited).toHaveLength(1);
    expect(hostAdmission.granted).toHaveLength(2);
    expect(queued?.durationMs).toBe(waited[0]?.waitedMs);
    expect(admission.map(record => record.durationMs).sort((a, b) => a - b)).toEqual(hostAdmission.granted.map(lease => lease.waitedMs).sort((a, b) => a - b));
    const heldAfterQueued = (heldUntil[0] ?? Number.POSITIVE_INFINITY) - (waited[0]?.queuedAt ?? Number.NEGATIVE_INFINITY);
    expect(heldAfterQueued).toBeGreaterThanOrEqual(30);
    expect(queued?.durationMs).toBeGreaterThanOrEqual(heldAfterQueued);
    for (const lease of hostAdmission.granted) expect(lease.waitedMs).toBeLessThanOrEqual(lease.answeredAt - lease.askedAt);
    // Each agent's stage at its own position (wb-lzta): the agents sit at their call order's positions, the holder's stage is
    // the one lease that never queued and the queued agent's (pinned above) the one that did; the holder's wait is the shorter,
    // so a stage reported at the other agent's position, or at a position no agent holds, reads red.
    expect([indexOf("holder"), indexOf("queued")]).toEqual([0, 1]);
    const unqueued = hostAdmission.granted.filter(lease => lease.queuedAt === undefined);
    expect(unqueued).toHaveLength(1);
    expect(unqueued[0]?.waitedMs).toBeLessThan(waited[0]?.waitedMs ?? Number.NEGATIVE_INFINITY);
    const holder = admission.find(record => record.index === indexOf("holder"));
    expect(holder).toEqual({ stage: "admission", kind: "agent", index: indexOf("holder"), durationMs: unqueued[0]?.waitedMs, bytes: 0 });
  }, 30_000);

  it("R078-ADMISSION-NODE: a forge.gate.status node queued on a one-operation Forge budget while the holder node rolls the wall clock back 60 s, and a later node is dispatched, reports an admission stage of kind node at its own position, of its monotonic wait, at least 30 ms, with 0 bytes: its own lease's waitedMs, no shorter than the holder's hold from the moment it queued; the three nodes' admission stages are the three leases' waitedMs, each at its own node's position and no longer than its acquire call", async () => {
    freezeWallClock();
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const hostAdmission = new LeaseLog({ sdkQueries: 8, childProcesses: 8, forgeOperations: 1, queueDeadlineMs: 30_000 });
    const heldUntil: number[] = [];
    const host: WorkflowHost = {
      async spawnAgent() { return { ok: true, text: "unused" }; },
      abortAgent() {},
      async callNode(request) {
        if (request.label === "holder") {
          await rolledHold(80);
          heldUntil.push(performance.now());
        }
        return { contract: "forge.gate.status/v1", source: { status: "passed" } };
      },
      describeNodeEffect: () => "read",
    };
    const body = 'return await parallel([() => node("forge.gate.status", {}, { label: "holder" }), () => node("forge.gate.status", {}, { label: "queued" }), () => node("hyperunix.find", {}, { label: "later" })]);';
    const result = await run(body, { host, hostAdmission, telemetry }, received);
    expect(result.status).toBe("completed");
    const indexOf = (label: string): number | undefined => nodeRows(received).find(row => row.label === label)?.index;
    expect([indexOf("holder"), indexOf("queued"), indexOf("later")]).toEqual([0, 1, 2]);
    const admission = records.filter(record => record.stage === "admission");
    expect(admission.map(record => record.kind)).toEqual(["node", "node", "node"]);
    expect(admission.map(record => record.index).sort((a, b) => a - b)).toEqual([0, 1, 2]);
    for (const record of admission) {
      expect(record.durationMs).toBeGreaterThanOrEqual(0);
      expect(record.bytes).toBe(0);
    }
    const queued = admission.find(record => record.index === indexOf("queued"));
    expect(queued).toEqual({ stage: "admission", kind: "node", index: indexOf("queued"), durationMs: queued?.durationMs, bytes: 0 });
    expect(queued?.durationMs).toBeGreaterThanOrEqual(30);
    expect(queued?.durationMs).toBeLessThan(60_000);
    // The waits admission.ts measured: one lease waited (the queued node's; the later hyperunix.find node takes no
    // forge-operations slot) and its stage is that lease's own waitedMs; the three stages together are the three leases' waits.
    // The queued wait spans the holder's hold from the moment the node queued (at least 30 ms of it), and no lease's wait is
    // longer than the acquire call that granted it.
    const waited = hostAdmission.granted.filter(lease => lease.queuedAt !== undefined);
    expect(waited).toHaveLength(1);
    expect(hostAdmission.granted).toHaveLength(3);
    expect(queued?.durationMs).toBe(waited[0]?.waitedMs);
    expect(admission.map(record => record.durationMs).sort((a, b) => a - b)).toEqual(hostAdmission.granted.map(lease => lease.waitedMs).sort((a, b) => a - b));
    const heldAfterQueued = (heldUntil[0] ?? Number.POSITIVE_INFINITY) - (waited[0]?.queuedAt ?? Number.NEGATIVE_INFINITY);
    expect(heldAfterQueued).toBeGreaterThanOrEqual(30);
    expect(queued?.durationMs).toBeGreaterThanOrEqual(heldAfterQueued);
    for (const lease of hostAdmission.granted) expect(lease.waitedMs).toBeLessThanOrEqual(lease.answeredAt - lease.askedAt);
    // Each node's stage at its own position (wb-lzta): the holder's stage is the one forge-operations lease that never queued,
    // the later node's the one lease without a forge-operations slot, and the queued node's (pinned above) the one that queued.
    // The holder's and the later node's leases both had room at once, so their two waits can be equal, and then no record
    // tells their stages apart; R078-ADMISSION-INDEX holds three waits apart by construction.
    const holderLeases = hostAdmission.granted.filter(lease => lease.queuedAt === undefined && lease.pools.includes("forge-operations"));
    const laterLeases = hostAdmission.granted.filter(lease => !lease.pools.includes("forge-operations"));
    expect(holderLeases).toHaveLength(1);
    expect(laterLeases).toHaveLength(1);
    const stageOf = (label: string): WorkflowStageRecord | undefined => admission.find(record => record.index === indexOf(label));
    expect(stageOf("holder")).toEqual({ stage: "admission", kind: "node", index: indexOf("holder"), durationMs: holderLeases[0]?.waitedMs, bytes: 0 });
    expect(stageOf("later")).toEqual({ stage: "admission", kind: "node", index: indexOf("later"), durationMs: laterLeases[0]?.waitedMs, bytes: 0 });
  }, 30_000);

  it("R078-ADMISSION-INDEX: three nodes admitted in turn on a one-process host budget, two forge.gate.status nodes with a hyperunix.find node between them, whose leases' waits are at least 30 ms apart, each report one admission stage of kind node at their own position, carrying their own lease's waitedMs and 0 bytes", async () => {
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const hostAdmission = new LeaseLog({ sdkQueries: 8, childProcesses: 1, forgeOperations: 8, queueDeadlineMs: 30_000 });
    // How many leases the budget had granted when each node's host call began. The one process slot admits one node at a
    // time, so the last lease granted then is the calling node's own; the first two nodes admitted each hold the slot 60 ms,
    // so each lease waits about 60 ms longer than the lease granted before it.
    const leasesAtCall = new Map<string, number>();
    const host: WorkflowHost = {
      async spawnAgent() { return { ok: true, text: "unused" }; },
      abortAgent() {},
      async callNode(request) {
        leasesAtCall.set(request.label, hostAdmission.granted.length);
        if (leasesAtCall.size < 3) await sleep(60);
        return { contract: "forge.gate.status/v1", source: { status: "passed" } };
      },
      describeNodeEffect: () => "read",
    };
    const body = 'return await parallel([() => node("forge.gate.status", {}, { label: "first" }), () => node("hyperunix.find", {}, { label: "second" }), () => node("forge.gate.status", {}, { label: "third" })]);';
    const result = await run(body, { host, hostAdmission, telemetry }, received);
    expect(result.status).toBe("completed");
    const labels = ["first", "second", "third"];
    const indexOf = (label: string): number | undefined => nodeRows(received).find(row => row.label === label)?.index;
    expect(labels.map(indexOf)).toEqual([0, 1, 2]);
    expect(hostAdmission.granted).toHaveLength(3);
    expect([...leasesAtCall.values()].sort((a, b) => a - b)).toEqual([1, 2, 3]);
    const waitOf = (label: string): number | undefined => hostAdmission.granted[(leasesAtCall.get(label) ?? 0) - 1]?.waitedMs;
    const waits = hostAdmission.granted.map(lease => lease.waitedMs).sort((a, b) => a - b);
    expect((waits[1] ?? Number.NEGATIVE_INFINITY) - (waits[0] ?? Number.POSITIVE_INFINITY)).toBeGreaterThanOrEqual(30);
    expect((waits[2] ?? Number.NEGATIVE_INFINITY) - (waits[1] ?? Number.POSITIVE_INFINITY)).toBeGreaterThanOrEqual(30);
    const admission = records.filter(record => record.stage === "admission").sort((a, b) => a.index - b.index);
    expect(admission).toEqual(labels.map(label => ({ stage: "admission", kind: "node", index: indexOf(label), durationMs: waitOf(label), bytes: 0 })));
  }, 30_000);

  it("R078-KIND-INDEX: a run that calls a forge.gate.status node, a gated agent and a nested workflow() in turn, twice over, reports its stage records, by stage, kind and position, as exactly the agents' admission, sdk and gate stages of kind agent at positions 0 and 1, the nodes' admission and node stages of kind node at 0 and 1 and the loads' stages of kind workflow at 0 and 1: each kind's positions count that kind's calls only", async () => {
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const hostAdmission = new HostAdmission({ sdkQueries: 8, childProcesses: 8, forgeOperations: 8, queueDeadlineMs: 30_000 });
    const child = 'export const meta = { name: "child", description: "nested" };\nreturn 1;';
    const host: WorkflowHost = {
      async spawnAgent(request) { return { ok: true, text: request.prompt }; },
      abortAgent() {},
      async runGate() { return { ok: true, output: "gate ok" }; },
      async callNode() { return { contract: "forge.gate.status/v1", source: { status: "passed" } }; },
      describeNodeEffect: () => "read",
      async loadWorkflow() { return { ok: true, script: child }; },
    };
    const body = [
      'await node("forge.gate.status", {}, { label: "n-0" });',
      'await agent("a-0", { gate: "npm test" });',
      'await workflow("child");',
      'await node("forge.gate.status", {}, { label: "n-1" });',
      'await agent("a-1", { gate: "npm test" });',
      'await workflow("child");',
      'return "done";',
    ].join("\n");
    const result = await run(body, { host, hostAdmission, telemetry }, received);
    expect(result.status).toBe("completed");
    expect(agentRows(received).filter(row => row.state === "done").map(row => [row.promptPreview, row.index])).toEqual([["a-0", 0], ["a-1", 1]]);
    expect(nodeRows(received).filter(row => row.state === "done").map(row => [row.label, row.index])).toEqual([["n-0", 0], ["n-1", 1]]);
    // Every call but the first follows a call of another kind, so a position that adds another kind's calls to its own reads
    // red here. The kinds' counts stay equal at every call, so a position that takes the larger of its own count and another
    // kind's reads green here; R078-KIND-UNEQUAL holds the counts apart and reads it red (wb-rzbv).
    expect(records.map(record => `${record.stage}:${record.kind}:${record.index}`).sort()).toEqual([
      "admission:agent:0", "admission:agent:1", "admission:node:0", "admission:node:1", "gate:agent:0", "gate:agent:1",
      "load:workflow:0", "load:workflow:1", "node:node:0", "node:node:1", "sdk:agent:0", "sdk:agent:1",
    ]);
  }, 30_000);

  it("R078-KIND-UNEQUAL: two runs whose kinds' call counts differ report each kind's stages at that kind's own positions: three forge.gate.status nodes, then two gated agents, then a nested workflow() report the nodes' admission and node stages at 0, 1 and 2, the agents' admission, sdk and gate stages at 0 and 1 and the load's stage at 0; three nested workflow() loads, then two gated agents, then a node report the loads' stages at 0, 1 and 2, the agents' stages at 0 and 1 and the node's admission and node stages at 0", async () => {
    const child = 'export const meta = { name: "child", description: "nested" };\nreturn 1;';
    const host: WorkflowHost = {
      async spawnAgent(request) { return { ok: true, text: request.prompt }; },
      abortAgent() {},
      async runGate() { return { ok: true, output: "gate ok" }; },
      async callNode() { return { contract: "forge.gate.status/v1", source: { status: "passed" } }; },
      describeNodeEffect: () => "read",
      async loadWorkflow() { return { ok: true, script: child }; },
    };
    /** One run of `calls` in turn under a roomy host budget: its status, the done rows' positions and the records' keys. */
    const runCalls = async (calls: readonly string[]) => {
      const { records, telemetry } = stageProbe();
      const received: WorkflowEntry[] = [];
      const hostAdmission = new HostAdmission({ sdkQueries: 8, childProcesses: 8, forgeOperations: 8, queueDeadlineMs: 30_000 });
      const result = await run([...calls, 'return "done";'].join("\n"), { host, hostAdmission, telemetry }, received);
      return {
        status: result.status,
        agents: agentRows(received).filter(row => row.state === "done").map(row => [row.promptPreview, row.index]),
        nodes: nodeRows(received).filter(row => row.state === "done").map(row => [row.label, row.index]),
        keys: records.map(record => `${record.stage}:${record.kind}:${record.index}`).sort(),
      };
    };
    const nodeCall = (label: string): string => `await node("forge.gate.status", {}, { label: "${label}" });`;
    const agentCall = (prompt: string): string => `await agent("${prompt}", { gate: "npm test" });`;
    const loadCall = 'await workflow("child");';
    // Each kind's calls come as one block and the blocks in turn, so when a later block's kind calls, an earlier block's kind
    // has already counted 2 or 3 calls while the calling kind's own count is 0 or 1: a position that takes the larger of its
    // own count and another kind's, or another kind's count in its place, reads red. The two runs put the blocks in opposite
    // orders, so every kind's stages come after each other kind's calls in one of them.
    const nodesFirst = await runCalls([nodeCall("n-0"), nodeCall("n-1"), nodeCall("n-2"), agentCall("a-0"), agentCall("a-1"), loadCall]);
    expect(nodesFirst.status).toBe("completed");
    expect(nodesFirst.nodes).toEqual([["n-0", 0], ["n-1", 1], ["n-2", 2]]);
    expect(nodesFirst.agents).toEqual([["a-0", 0], ["a-1", 1]]);
    expect(nodesFirst.keys).toEqual([
      "admission:agent:0", "admission:agent:1", "admission:node:0", "admission:node:1", "admission:node:2", "gate:agent:0",
      "gate:agent:1", "load:workflow:0", "node:node:0", "node:node:1", "node:node:2", "sdk:agent:0", "sdk:agent:1",
    ]);
    const loadsFirst = await runCalls([loadCall, loadCall, loadCall, agentCall("a-0"), agentCall("a-1"), nodeCall("n-0")]);
    expect(loadsFirst.status).toBe("completed");
    expect(loadsFirst.agents).toEqual([["a-0", 0], ["a-1", 1]]);
    expect(loadsFirst.nodes).toEqual([["n-0", 0]]);
    expect(loadsFirst.keys).toEqual([
      "admission:agent:0", "admission:agent:1", "admission:node:0", "gate:agent:0", "gate:agent:1", "load:workflow:0",
      "load:workflow:1", "load:workflow:2", "node:node:0", "sdk:agent:0", "sdk:agent:1",
    ]);
  }, 30_000);

  it("R078-ADMISSION-REFUSED: on a one-query host budget, an agent refused at its 40 ms queue deadline while the holder agent holds the query keeps its call's position 1 and reports no admission or sdk stage, so the agent called after it reports its admission and sdk stages at position 2: each admission stage its own lease's waitedMs with 0 bytes and each sdk stage its own answer's bytes, at its own agent's position", async () => {
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const hostAdmission = new LeaseLog({ sdkQueries: 1, childProcesses: 8, forgeOperations: 8, queueDeadlineMs: 40 });
    // The holder keeps the one query until the queued agent's refusal row is out (5 s at most), so the refusal never races the
    // holder's release; the third agent is called once the holder has answered and its lease is back, and is admitted at once.
    let refusalOut: () => void = () => {};
    const refused = new Promise<void>(resolve => { refusalOut = resolve; });
    const host: WorkflowHost = {
      async spawnAgent(request) {
        if (request.prompt === "holder") {
          let fallback: ReturnType<typeof setTimeout> | undefined;
          await Promise.race([refused, new Promise<void>(resolve => { fallback = setTimeout(resolve, 5_000); })]);
          clearTimeout(fallback);
        }
        return { ok: true, text: request.prompt };
      },
      abortAgent() {},
    };
    const body = [
      'const held = agent("holder");',
      'let second = "admitted"; try { await agent("refused"); } catch { second = "refused"; }',
      "await held;",
      'return [second, await agent("third")];',
    ].join("\n");
    const result = await runWorkflow({
      script: HEAD + body,
      host,
      hostAdmission,
      concurrency: 2,
      telemetry,
      onProgress: entries => {
        received.push(...entries);
        if (agentRows(entries).some(row => row.state === "error")) refusalOut();
      },
    });
    expect(result.status).toBe("completed");
    expect(result.value).toEqual(["refused", "third"]);
    const settledRows = agentRows(received).filter(row => row.state === "done" || row.state === "error").sort((a, b) => a.index - b.index);
    expect(settledRows.map(row => [row.promptPreview, row.state, row.index])).toEqual([["holder", "done", 0], ["refused", "error", 1], ["third", "done", 2]]);
    expect(settledRows[1]?.error).toMatch(/queue deadline passed/);
    // The refused wait ended without a lease: two leases in all, granted in turn to the holder and to the third agent, and
    // neither queued.
    expect(hostAdmission.granted).toHaveLength(2);
    expect(hostAdmission.granted.filter(lease => lease.queuedAt !== undefined)).toHaveLength(0);
    const admission = records.filter(record => record.stage === "admission").sort((a, b) => a.index - b.index);
    expect(admission).toEqual([
      { stage: "admission", kind: "agent", index: 0, durationMs: hostAdmission.granted[0]?.waitedMs, bytes: 0 },
      { stage: "admission", kind: "agent", index: 2, durationMs: hostAdmission.granted[1]?.waitedMs, bytes: 0 },
    ]);
    const sdk = records.filter(record => record.stage === "sdk").sort((a, b) => a.index - b.index);
    expect(sdk).toEqual([
      { stage: "sdk", kind: "agent", index: 0, durationMs: sdk[0]?.durationMs, bytes: Buffer.byteLength("holder", "utf8") },
      { stage: "sdk", kind: "agent", index: 2, durationMs: sdk[1]?.durationMs, bytes: Buffer.byteLength("third", "utf8") },
    ]);
  }, 30_000);

  it("R078-END-ORDER: two gated agents, two forge.gate.status nodes and two nested workflow() loads, each pair called at once and its first call held until the second call's stage of that kind has ended, report each sdk, gate, node and load stage at its own call's position, carrying its own call's bytes and, where the stage has one, its own call's native id, while each pair's stages end second call first", async () => {
    const received: WorkflowEntry[] = [];
    const records: WorkflowStageRecord[] = [];
    const ended = new Map<WorkflowStageRecord["stage"], () => void>();
    const telemetry: NonNullable<RunWorkflowOptions["telemetry"]> = {
      progressBytes: 1 << 20,
      onStage: record => {
        records.push(record);
        ended.get(record.stage)?.();
      },
    };
    /** Holds a pair's first call until a stage of `stage` has ended (the second call's, as the first's cannot), 5 s at most. */
    const afterOtherEnded = async (stage: WorkflowStageRecord["stage"]): Promise<void> => {
      if (records.some(record => record.stage === stage)) return;
      let fallback: ReturnType<typeof setTimeout> | undefined;
      await Promise.race([
        new Promise<void>(resolve => { ended.set(stage, resolve); }),
        new Promise<void>(resolve => { fallback = setTimeout(resolve, 5_000); }),
      ]);
      clearTimeout(fallback);
    };
    const utf8 = (text: string): number => Buffer.byteLength(text, "utf8");
    const texts: Readonly<Record<string, string>> = { first: "first answer \u00e9", second: "2" };
    const gateOutputs: Readonly<Record<string, string>> = { first: "gate ok \u2713\u2713", second: "gate ok" };
    const operations: Readonly<Record<string, string>> = { first: `op-${"d4".repeat(16)}`, second: `op-${"e5".repeat(16)}` };
    const scripts: Readonly<Record<string, string>> = {
      first: 'export const meta = { name: "first", description: "nested \u00e9" };\nreturn "first";',
      second: 'export const meta = { name: "second", description: "nested" };\nreturn "second";',
    };
    const promptOf = new Map<string, string>();
    const host: WorkflowHost = {
      async spawnAgent(request) {
        promptOf.set(request.agentId, request.prompt);
        if (request.prompt === "first") await afterOtherEnded("sdk");
        return { ok: true, text: texts[request.prompt] ?? "", sessionId: `sdk-session-${request.prompt}` };
      },
      abortAgent() {},
      async runGate(_command, gateOptions) {
        const prompt = promptOf.get(gateOptions.agentId) ?? "";
        if (prompt === "first") await afterOtherEnded("gate");
        return { ok: true, output: gateOutputs[prompt] ?? "" };
      },
      async callNode(request) {
        if (request.label === "first") await afterOtherEnded("node");
        return { contract: "forge.gate.status/v1", source: { operation_id: operations[request.label], status: "passed" } };
      },
      describeNodeEffect: () => "read",
      async loadWorkflow(ref) {
        if (ref.name === "first") await afterOtherEnded("load");
        return { ok: true, script: scripts[ref.name ?? ""] ?? "" };
      },
    };
    const body = [
      'await parallel([() => agent("first", { gate: "npm test" }), () => agent("second", { gate: "npm test" })]);',
      'await parallel([() => node("forge.gate.status", {}, { label: "first" }), () => node("forge.gate.status", {}, { label: "second" })]);',
      'return await parallel([() => workflow("first"), () => workflow("second")]);',
    ].join("\n");
    const result = await run(body, { host, concurrency: 2, telemetry }, received);
    expect(result.status).toBe("completed");
    expect(result.value).toEqual(["first", "second"]);
    // Positions in call order: each pair's first call at 0 and its second at 1.
    const byIndex = <T extends { readonly index: number }>(rows: readonly T[]): T[] => [...rows].sort((a, b) => a.index - b.index);
    expect(byIndex(agentRows(received).filter(row => row.state === "done")).map(row => [row.promptPreview, row.index])).toEqual([["first", 0], ["second", 1]]);
    expect(byIndex(nodeRows(received).filter(row => row.state === "done")).map(row => [row.label, row.index])).toEqual([["first", 0], ["second", 1]]);
    // The stages ended second call first: in the order they were reported, each pair's records carry the second call's
    // bytes or native id first.
    const reported = (stage: WorkflowStageRecord["stage"]): WorkflowStageRecord[] => records.filter(record => record.stage === stage);
    expect(reported("sdk").map(record => record.nativeId)).toEqual(["sdk-session-second", "sdk-session-first"]);
    expect(reported("gate").map(record => record.bytes)).toEqual([utf8("gate ok"), utf8("gate ok \u2713\u2713")]);
    expect(reported("node").map(record => record.nativeId)).toEqual([operations.second, operations.first]);
    expect(reported("load").map(record => record.bytes)).toEqual([utf8(scripts.second ?? ""), utf8(scripts.first ?? "")]);
    // Each stage sits at its own call's position with its own call's bytes and native id; there is no admission stage, as
    // the run has no host budget, so these eight records are all the run reported.
    expect(records).toHaveLength(8);
    const sdk = byIndex(reported("sdk"));
    expect(sdk).toEqual(["first", "second"].map((prompt, at) => (
      { stage: "sdk", kind: "agent", index: at, durationMs: sdk[at]?.durationMs, bytes: utf8(texts[prompt] ?? ""), nativeId: `sdk-session-${prompt}` }
    )));
    const gate = byIndex(reported("gate"));
    expect(gate).toEqual(["first", "second"].map((prompt, at) => (
      { stage: "gate", kind: "agent", index: at, durationMs: gate[at]?.durationMs, bytes: utf8(gateOutputs[prompt] ?? "") }
    )));
    const node = byIndex(reported("node"));
    expect(node).toEqual(["first", "second"].map((label, at) => {
      const answer = { contract: "forge.gate.status/v1", source: { operation_id: operations[label], status: "passed" } };
      return { stage: "node", kind: "node", index: at, durationMs: node[at]?.durationMs, bytes: bytesOf(answer), nativeId: operations[label] };
    }));
    const load = byIndex(reported("load"));
    expect(load).toEqual(["first", "second"].map((name, at) => (
      { stage: "load", kind: "workflow", index: at, durationMs: load[at]?.durationMs, bytes: utf8(scripts[name] ?? "") }
    )));
  }, 30_000);

  it("R078-GATE-REFUSED: on a one-query host budget, three gated agents called in order, the second refused at its 40 ms queue deadline while the holder agent holds the query, so only the holder and the third reach host.spawnAgent and host.runGate: the refused agent reports no gate stage, and the holder's and the third agent's gate stages sit at their own calls' positions 0 and 2, not at their dispatches' 0 and 1, each carrying the UTF-8 bytes of its own gate output", async () => {
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const hostAdmission = new HostAdmission({ sdkQueries: 1, childProcesses: 8, forgeOperations: 8, queueDeadlineMs: 40 });
    // R078-ADMISSION-REFUSED's run with every agent gated (wb-zrzn): the holder keeps the one query until the refused agent's
    // error row is out (5 s at most), and the third agent is called once the holder has settled. Two of the three calls are
    // dispatched, so a gate stage numbered by the dispatches (the spawns, or the gates, in the order they ran) instead of by
    // the calls reads 1 for the third agent here.
    let refusalOut: () => void = () => {};
    const refused = new Promise<void>(resolve => { refusalOut = resolve; });
    const promptOf = new Map<string, string>();
    const spawned: string[] = [];
    const gated: string[] = [];
    const gateOutputs = new Map([["holder", "gate ok \u2713"], ["third", "gate ok \u2713\u2713\u2713"]]);
    const host: WorkflowHost = {
      async spawnAgent(request) {
        spawned.push(request.prompt);
        promptOf.set(request.agentId, request.prompt);
        if (request.prompt === "holder") {
          let fallback: ReturnType<typeof setTimeout> | undefined;
          await Promise.race([refused, new Promise<void>(resolve => { fallback = setTimeout(resolve, 5_000); })]);
          clearTimeout(fallback);
        }
        return { ok: true, text: request.prompt };
      },
      abortAgent() {},
      async runGate(_command, gateOptions) {
        const prompt = promptOf.get(gateOptions.agentId) ?? "";
        gated.push(prompt);
        return { ok: true, output: gateOutputs.get(prompt) ?? "" };
      },
    };
    const body = [
      'const held = agent("holder", { gate: "npm test" });',
      'let second = "admitted"; try { await agent("refused", { gate: "npm test" }); } catch { second = "refused"; }',
      "await held;",
      'return [second, await agent("third", { gate: "npm test" })];',
    ].join("\n");
    const result = await runWorkflow({
      script: HEAD + body,
      host,
      hostAdmission,
      concurrency: 2,
      telemetry,
      onProgress: entries => {
        received.push(...entries);
        if (agentRows(entries).some(row => row.state === "error")) refusalOut();
      },
    });
    expect(result.status).toBe("completed");
    expect(result.value).toEqual(["refused", "third"]);
    const settledRows = agentRows(received).filter(row => row.state === "done" || row.state === "error").sort((a, b) => a.index - b.index);
    expect(settledRows.map(row => [row.promptPreview, row.state, row.index])).toEqual([["holder", "done", 0], ["refused", "error", 1], ["third", "done", 2]]);
    expect(settledRows[1]?.error).toMatch(/queue deadline passed/);
    // Two dispatches, in turn: the refused agent reached neither host.spawnAgent nor host.runGate.
    expect(spawned).toEqual(["holder", "third"]);
    expect(gated).toEqual(["holder", "third"]);
    const utf8 = (text: string): number => Buffer.byteLength(text, "utf8");
    const gate = records.filter(record => record.stage === "gate").sort((a, b) => a.index - b.index);
    expect(gate).toEqual([
      { stage: "gate", kind: "agent", index: 0, durationMs: gate[0]?.durationMs, bytes: utf8(gateOutputs.get("holder") ?? "") },
      { stage: "gate", kind: "agent", index: 2, durationMs: gate[1]?.durationMs, bytes: utf8(gateOutputs.get("third") ?? "") },
    ]);
  }, 30_000);

  it("R078-NODE-DISPATCH: on a one-operation Forge budget, a holder and a queued forge.gate.status node and a later hyperunix.find node, called in that order at once, reach host.callNode with the queued node last: each reports its node stage at its own call's position, 0, 1 and 2, not at its dispatch's, carrying the bytes and the native id of its own answer", async () => {
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const hostAdmission = new HostAdmission({ sdkQueries: 8, childProcesses: 8, forgeOperations: 1, queueDeadlineMs: 30_000 });
    // R078-ADMISSION-NODE's shape with its node stages pinned (wb-zrzn): the holder keeps the one Forge operation until the
    // later hyperunix.find node, which takes no forge-operations slot, has reached host.callNode (5 s at most), so the queued
    // node is the last of the three dispatched. A node stage numbered by the dispatches (the host calls in the order they were
    // made) instead of by the calls reads 2 for the queued node here.
    let laterIn: () => void = () => {};
    const laterCalled = new Promise<void>(resolve => { laterIn = resolve; });
    const dispatched: string[] = [];
    const ids: Readonly<Record<string, string>> = { holder: `op-${"f6".repeat(16)}`, queued: `op-${"a7".repeat(16)}`, later: `hx-exec-${"b8".repeat(8)}` };
    const answerOf = (label: string): Record<string, unknown> => (label === "later"
      ? { contract: "hyperunix.find/v1", source: { representation: "hyperunix.result/1", execution_id: ids.later, execution_status: { kind: "completed" }, matches: ["src/a.ts"] } }
      : { contract: "forge.gate.status/v1", source: { operation_id: ids[label], status: "passed" } });
    const host: WorkflowHost = {
      async spawnAgent() { return { ok: true, text: "unused" }; },
      abortAgent() {},
      async callNode(request) {
        dispatched.push(request.label);
        if (request.label === "later") laterIn();
        if (request.label === "holder") {
          let fallback: ReturnType<typeof setTimeout> | undefined;
          await Promise.race([laterCalled, new Promise<void>(resolve => { fallback = setTimeout(resolve, 5_000); })]);
          clearTimeout(fallback);
        }
        return answerOf(request.label);
      },
      describeNodeEffect: () => "read",
    };
    const body = 'return await parallel([() => node("forge.gate.status", {}, { label: "holder" }), () => node("forge.gate.status", {}, { label: "queued" }), () => node("hyperunix.find", {}, { label: "later" })]);';
    const result = await run(body, { host, hostAdmission, telemetry }, received);
    expect(result.status).toBe("completed");
    const labels = ["holder", "queued", "later"];
    const indexOf = (label: string): number | undefined => nodeRows(received).find(row => row.label === label)?.index;
    expect(labels.map(indexOf)).toEqual([0, 1, 2]);
    // Three dispatches, the queued node's last: it reached host.callNode after the later node, called after it.
    expect(dispatched).toHaveLength(3);
    expect(dispatched.slice(0, 2).sort()).toEqual(["holder", "later"]);
    expect(dispatched[2]).toBe("queued");
    const node = records.filter(record => record.stage === "node").sort((a, b) => a.index - b.index);
    expect(node).toEqual(labels.map((label, at) => (
      { stage: "node", kind: "node", index: at, durationMs: node[at]?.durationMs, bytes: bytesOf(answerOf(label)), nativeId: ids[label] }
    )));
  }, 30_000);

  it("R078-NATIVE-IDS: three agents report sdk stages carrying each one's own answer bytes and its own session id, and the agent whose host reports no session carries none", async () => {
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const sessions: Readonly<Record<string, string | undefined>> = { "n-0": "sdk-session-zeta", "n-1": undefined, "n-2": "sdk-session-alpha" };
    const texts: Readonly<Record<string, string>> = { "n-0": "é".repeat(3), "n-1": "abc", "n-2": "ü".repeat(5) };
    const host: WorkflowHost = {
      async spawnAgent(request) {
        const sessionId = sessions[request.prompt];
        return { ok: true, text: texts[request.prompt] ?? "", ...(sessionId !== undefined ? { sessionId } : {}) };
      },
      abortAgent() {},
    };
    const result = await run('return await parallel([() => agent("n-0"), () => agent("n-1"), () => agent("n-2")]);', { host, concurrency: 3, telemetry }, received);
    expect(result.status).toBe("completed");
    const indexOf = (prompt: string): number | undefined => agentRows(received).find(row => row.promptPreview === prompt)?.index;
    const sdkAt = (prompt: string): WorkflowStageRecord | undefined => records.find(record => record.stage === "sdk" && record.index === indexOf(prompt));
    expect(records.filter(record => record.stage === "sdk")).toHaveLength(3);
    expect(sdkAt("n-0")).toEqual({ stage: "sdk", kind: "agent", index: indexOf("n-0"), durationMs: sdkAt("n-0")?.durationMs, bytes: 6, nativeId: "sdk-session-zeta" });
    expect(sdkAt("n-1")).toEqual({ stage: "sdk", kind: "agent", index: indexOf("n-1"), durationMs: sdkAt("n-1")?.durationMs, bytes: 3 });
    expect("nativeId" in (sdkAt("n-1") ?? {})).toBe(false);
    expect(sdkAt("n-2")).toEqual({ stage: "sdk", kind: "agent", index: indexOf("n-2"), durationMs: sdkAt("n-2")?.durationMs, bytes: 10, nativeId: "sdk-session-alpha" });
  }, 30_000);

  it("R078-FAILED-SDK: a failed answer reports its error's UTF-8 bytes and its session id, and a host call that throws reports the thrown message's bytes and no native id", async () => {
    const { records, telemetry } = stageProbe();
    const refusal = "provider refused ✗";
    const host: WorkflowHost = {
      async spawnAgent(request) {
        if (request.prompt === "thrown") throw new Error("spawn exploded");
        return { ok: false, error: refusal, sessionId: "sdk-session-failed" };
      },
      abortAgent() {},
    };
    const result = await run('const a = await agent("refused");\nconst b = await agent("thrown");\nreturn [a, b];', { host, telemetry });
    expect(result.status).toBe("completed");
    expect(result.value).toEqual([null, null]);
    const sdk = records.filter(record => record.stage === "sdk");
    expect(sdk).toEqual([
      { stage: "sdk", kind: "agent", index: 0, durationMs: sdk[0]?.durationMs, bytes: Buffer.byteLength(refusal, "utf8"), nativeId: "sdk-session-failed" },
      { stage: "sdk", kind: "agent", index: 1, durationMs: sdk[1]?.durationMs, bytes: Buffer.byteLength("spawn exploded", "utf8") },
    ]);
    expect("nativeId" in (sdk[1] ?? {})).toBe(false);
  }, 30_000);

  it("R078-NODE-NO-NATIVE: a hyperunix.find node whose answer carries no native evidence reports a node stage with its answer's bytes and no native id, and a node whose host call rejects reports the rejection message's bytes and no native id", async () => {
    const { records, telemetry } = stageProbe();
    const host: WorkflowHost = {
      async spawnAgent() { return { ok: true, text: "unused" }; },
      abortAgent() {},
      async callNode(request) {
        if (request.label === "down") throw new Error("transport down \u2717");
        return { ok: true };
      },
      describeNodeEffect: () => "read",
    };
    const body = 'const found = await node("hyperunix.find", {}, { label: "find" });\nlet down = "answered"; try { await node("hyperunix.find", {}, { label: "down" }); } catch { down = "rejected"; }\nreturn [found, down];';
    const result = await run(body, { host, telemetry });
    expect(result.status).toBe("completed");
    expect(result.value).toEqual([{ ok: true }, "rejected"]);
    expect(records).toEqual([
      { stage: "node", kind: "node", index: 0, durationMs: records[0]?.durationMs, bytes: bytesOf({ ok: true }) },
      { stage: "node", kind: "node", index: 1, durationMs: records[1]?.durationMs, bytes: Buffer.byteLength("transport down \u2717", "utf8") },
    ]);
    for (const record of records) expect("nativeId" in record).toBe(false);
  }, 30_000);

  it("R078-NODE-NOT-DISPATCHED: a non-read node refused because its dispatched journal row could not be written reports no node stage, and its error row's durationMs is a whole number of milliseconds, not negative though the wall clock rolled back 60 s at the refused write", async () => {
    freezeWallClock();
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const calls: string[] = [];
    const host: WorkflowHost = {
      async spawnAgent() { return { ok: true, text: "unused" }; },
      abortAgent() {},
      async callNode(request) { calls.push(request.label); return { ok: true }; },
      describeNodeEffect: () => "write",
    };
    const journal = { append: () => { vi.setSystemTime(Date.now() - 60_000); return false; } };
    const result = await run('try { await node("effect.write", {}, { label: "w" }); } catch { return "refused"; }\nreturn "dispatched";', { host, telemetry, journal }, received);
    expect(result.status).toBe("completed");
    expect(result.value).toBe("refused");
    expect(calls).toEqual([]);
    expect(records.filter(record => record.stage === "node")).toEqual([]);
    const refused = nodeRows(received).find(row => row.state === "error");
    expect(refused?.error).toContain("was not dispatched: its dispatched journal row could not be written");
    expect(Number.isInteger(refused?.durationMs)).toBe(true);
    expect(refused?.durationMs).toBeGreaterThanOrEqual(0);
  }, 30_000);

  it("R078-GATE-THROWS: a host.runGate call that throws reports no gate stage, and the agent's sdk stage stays the one record for its host call", async () => {
    const { records, telemetry } = stageProbe();
    const host: WorkflowHost = {
      async spawnAgent() { return { ok: true, text: "built" }; },
      abortAgent() {},
      async runGate() { throw new Error("gate crashed"); },
    };
    const result = await run('return await agent("gated", { gate: "npm test" });', { host, telemetry });
    expect(result.status).toBe("completed");
    expect(result.value).toBeNull();
    expect(records).toEqual([{ stage: "sdk", kind: "agent", index: 0, durationMs: records[0]?.durationMs, bytes: 5 }]);
  }, 30_000);

  it("R078-STAGE-NAMES: WORKFLOW_STAGES lists the five stage names, admission, load, sdk, gate and node", () => {
    expect(WORKFLOW_STAGES).toEqual(["admission", "load", "sdk", "gate", "node"]);
  }, 5_000);

  it("R078-THROWING-REPORT: an onStage reporter that throws on every record leaves the run's value and status as they are without telemetry, and is called for every stage", async () => {
    const calls: WorkflowStageRecord[] = [];
    const body = 'const a = await agent("one");\nconst b = await agent("two");\nreturn [a, b];';
    const plain = await run(body, { host: answeringHost() });
    const throwing = await run(body, { host: answeringHost(), telemetry: { progressBytes: 1 << 20, onStage: record => { calls.push(record); throw new Error("reporter broke"); } } });
    expect(throwing.status).toBe(plain.status);
    expect(throwing.value).toEqual(plain.value);
    expect(throwing.value).toEqual(["one", "two"]);
    expect(calls.map(record => `${record.stage}:${record.index}`)).toEqual(["sdk:0", "sdk:1"]);
  }, 30_000);
});

/** What the test itself observes of one journey phase, through the runWorkflow it hands the journey (one phase per budget). */
interface PhaseObservation {
  sdk: number;
  peakSdk: number;
  processes: number;
  peakProcesses: number;
  forge: number;
  peakForge: number;
  readonly dispatched: string[];
  queuedReports: number;
  readonly admissionWaits: number[];
  readonly results: WorkflowRunResult[];
}

/**
 * A runWorkflow for the journey that wraps each run's host, onAdmissionWait and onStage to count, independently of the
 * journey's own fixture meter, what each phase dispatched, how many waits were reported and how long each admission lease
 * waited, and keeps each run's result. Phases are told apart by their HostAdmission, in first-seen order.
 */
function observedRunWorkflow(): { runWorkflow: typeof runWorkflow; phases: PhaseObservation[] } {
  const byBudget = new Map<unknown, PhaseObservation>();
  const phases: PhaseObservation[] = [];
  const observed = (options: RunWorkflowOptions): Promise<WorkflowRunResult> => {
    let phase = byBudget.get(options.hostAdmission);
    if (phase === undefined) {
      phase = { sdk: 0, peakSdk: 0, processes: 0, peakProcesses: 0, forge: 0, peakForge: 0, dispatched: [], queuedReports: 0, admissionWaits: [], results: [] };
      byBudget.set(options.hostAdmission, phase);
      phases.push(phase);
    }
    const seen = phase;
    const inner = options.host;
    const host: WorkflowHost = {
      ...inner,
      abortAgent: agentId => inner.abortAgent(agentId),
      async spawnAgent(request) {
        seen.dispatched.push(request.prompt);
        seen.sdk++;
        seen.processes++;
        seen.peakSdk = Math.max(seen.peakSdk, seen.sdk);
        seen.peakProcesses = Math.max(seen.peakProcesses, seen.processes);
        try {
          return await inner.spawnAgent(request);
        } finally {
          seen.sdk--;
          seen.processes--;
        }
      },
      async callNode(request) {
        const forge = request.capabilityId.startsWith("forge.");
        seen.dispatched.push(request.label);
        seen.processes++;
        if (forge) seen.forge++;
        seen.peakProcesses = Math.max(seen.peakProcesses, seen.processes);
        seen.peakForge = Math.max(seen.peakForge, seen.forge);
        try {
          return await inner.callNode?.(request);
        } finally {
          seen.processes--;
          if (forge) seen.forge--;
        }
      },
    };
    const telemetry = options.telemetry;
    return runWorkflow({
      ...options,
      host,
      onAdmissionWait: wait => { seen.queuedReports++; options.onAdmissionWait?.(wait); },
      ...(telemetry !== undefined ? { telemetry: { ...telemetry, onStage: record => {
        if (record.stage === "admission") seen.admissionWaits.push(record.durationMs);
        telemetry.onStage?.(record);
      } } } : {}),
    }).then(result => { seen.results.push(result); return result; });
  };
  return { runWorkflow: observed as typeof runWorkflow, phases };
}

describe(`EAT-R079: the named load journey (${JOURNEY}) runs ${LOAD_RUNS} simultaneous real runWorkflow invocations against a counting fixture host and records what it measured`, () => {
  it("R079-JOURNEY: the journey's record equals what the test observes independently, peaks above the one-workflow limit and within the shared budget, queue waits, floods with dropped counts and a queued cancel that dispatched nothing, beside a one-run baseline, with memory and exact versions and ref", async () => {
    const { runWorkflow: observed, phases } = observedRunWorkflow();
    const record = await runLoadJourney({ runWorkflow: observed, HostAdmission });
    expect(record.journey).toBe(JOURNEY);
    expect(phases).toHaveLength(2);
    const [baselineSeen, loadSeen] = phases;
    if (baselineSeen === undefined || loadSeen === undefined) throw new Error("the journey ran fewer than two phases");
    // Exact versions and ref.
    const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as { name: string; version: string };
    expect(record.versions.node).toBe(process.version);
    expect(record.versions.package).toBe(`${pkg.name}@${pkg.version}`);
    expect(record.versions.ref).toBe(execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim());
    expect(record.versions.ref).toMatch(/^[0-9a-f]{40}$/);
    expect(record.versions.dirty).toBe(execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" }).trim() !== "");
    for (const [phase, seen, runs] of [[record.baseline, baselineSeen, 1], [record.load, loadSeen, LOAD_RUNS + 1]] as const) {
      // Every counter the record carries is the one the test observed of the same phase.
      expect(phase.peaks).toEqual({ sdkQueries: seen.peakSdk, childProcesses: seen.peakProcesses, forgeOperations: seen.peakForge });
      expect(phase.queueWait).toEqual({
        leases: seen.admissionWaits.length,
        maxMs: seen.admissionWaits.length === 0 ? 0 : Math.max(...seen.admissionWaits),
        totalMs: seen.admissionWaits.reduce((sum, value) => sum + value, 0),
        queuedReports: seen.queuedReports,
      });
      expect(seen.results).toHaveLength(runs);
      expect(phase.slotsAtRest).toBe(true);
      for (const value of Object.values(phase.memory)) {
        expect(Number.isSafeInteger(value)).toBe(true);
        expect(value).toBeGreaterThan(0);
      }
      expect(phase.wallMs).toBeGreaterThan(0);
    }
    // Floods: the record's progress sums are the completed runs' own telemetry reports, and each run dropped past its bound.
    const completed = (seen: PhaseObservation) => seen.results.filter(result => result.status === "completed");
    for (const [phase, seen] of [[record.baseline, baselineSeen], [record.load, loadSeen]] as const) {
      const reports = completed(seen).map(result => result.telemetry?.progress);
      expect(reports).toHaveLength(phase.runs);
      const sum = (key: keyof RetentionCounts) => reports.reduce((total, report) => total + (report?.[key] ?? 0), 0);
      expect(phase.progress).toEqual({
        offeredEvents: sum("offeredEvents"), heldEvents: sum("heldEvents"), droppedEvents: sum("droppedEvents"),
        offeredBytes: sum("offeredBytes"), heldBytes: sum("heldBytes"), droppedBytes: sum("droppedBytes"),
        maxHeldBytes: Math.max(0, ...reports.map(report => report?.heldBytes ?? 0)),
      });
      for (const report of reports) {
        expect(report?.droppedEvents).toBeGreaterThan(0);
        expect(report?.heldBytes).toBeLessThanOrEqual(PROGRESS_BYTES);
        expect(report?.offeredEvents).toBeGreaterThanOrEqual(FLOOD_ROWS);
      }
    }
    // Baseline: the same script alone, bounded by its own one-workflow limit.
    expect(record.baseline.runs).toBe(1);
    expect(record.baseline.statuses).toEqual(["completed"]);
    expect(record.baseline.peaks.sdkQueries).toBe(RUN_CONCURRENCY);
    expect("cancel" in record.baseline).toBe(false);
    // Load: the observed peak across simultaneous runs is the shared limit, above the one-workflow limit.
    expect(record.load.runs).toBe(LOAD_RUNS);
    expect(record.load.statuses).toEqual(Array.from({ length: LOAD_RUNS }, () => "completed"));
    expect(record.load.peaks.sdkQueries).toBe(LIMITS.sdkQueries);
    expect(record.load.peaks.sdkQueries).toBeGreaterThan(RUN_CONCURRENCY);
    expect(record.comparison).toEqual({ oneWorkflowLimit: RUN_CONCURRENCY, sharedSdkLimit: LIMITS.sdkQueries, baselinePeakSdk: RUN_CONCURRENCY, loadPeakSdk: LIMITS.sdkQueries });
    expect(record.load.peaks.childProcesses).toBeLessThanOrEqual(record.load.admissionPeaks.childProcesses);
    expect(record.load.admissionPeaks.childProcesses).toBeLessThanOrEqual(LIMITS.childProcesses);
    expect(record.load.admissionPeaks.sdkQueries).toBe(LIMITS.sdkQueries);
    expect(record.load.admissionPeaks.forgeOperations).toBe(LIMITS.forgeOperations);
    expect(record.load.peaks.forgeOperations).toBe(LIMITS.forgeOperations);
    expect(record.load.queueWait.queuedReports).toBeGreaterThan(0);
    expect(record.load.queueWait.maxMs).toBeGreaterThan(0);
    // The queued cancel: aborted while its agent was queued; nothing of it was dispatched, as the test observed.
    const cancelDispatched = loadSeen.dispatched.filter(name => name.startsWith("cancel-")).length;
    expect(cancelDispatched).toBe(0);
    expect(loadSeen.dispatched.filter(name => /^r[0-9]+-/.test(name))).toHaveLength(LOAD_RUNS * 3);
    expect(record.load.cancel).toEqual({ status: "killed", queuedReports: record.load.cancel?.queuedReports, dispatched: cancelDispatched });
    expect(record.load.cancel?.queuedReports).toBeGreaterThan(0);
    expect(loadSeen.results.filter(result => result.status === "killed")).toHaveLength(1);
    expect(record.load.cancelledWhileQueued).toBeGreaterThan(0);
  }, 120_000);
});
