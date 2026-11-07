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
 * a retry; any clock other than performance.now(); the producer leg of PI-MULTIWORKFLOW-LOAD.
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
import { HostAdmission } from "../src/workflow/admission.js";
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
  it("R078-SDK-ROLLBACK: an agent whose host call rolls the wall clock back 60 s reports an sdk stage no shorter than that call on the monotonic clock, and its done row's durationMs is not negative", async () => {
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
    expect(done?.durationMs).toBeGreaterThanOrEqual(Math.floor(windows[0] ?? Number.POSITIVE_INFINITY));
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

  it("R078-NODE-ROLLBACK: a forge.gate.status node whose host call rolls the wall clock back 60 s reports a node stage no shorter than that call, joined to the operation id of its answer, and its done row's durationMs is not negative", async () => {
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
    expect(done?.durationMs).toBeGreaterThanOrEqual(Math.floor(windows[0] ?? Number.POSITIVE_INFINITY));
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

  it("R078-ADMISSION-ROLLBACK: an agent queued on a one-query host budget while the holder rolls the wall clock back 60 s reports an admission stage of its monotonic wait, at least 30 ms, with 0 bytes", async () => {
    freezeWallClock();
    const { records, telemetry } = stageProbe();
    const received: WorkflowEntry[] = [];
    const hostAdmission = new HostAdmission({ sdkQueries: 1, childProcesses: 8, forgeOperations: 8, queueDeadlineMs: 30_000 });
    const host: WorkflowHost = {
      async spawnAgent(request) {
        if (request.prompt === "holder") await rolledHold(80);
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

  it("R078-NODE-NOT-DISPATCHED: a non-read node refused because its dispatched journal row could not be written reports no node stage, and its error row's durationMs is not negative though the wall clock rolled back 60 s at the refused write", async () => {
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
