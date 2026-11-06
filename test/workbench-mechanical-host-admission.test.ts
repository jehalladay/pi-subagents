/**
 * wb-ny54 [MWI-limits] (slice PI-7): red-first acceptance for positive host resource limits and the host admission budget
 * shared by simultaneous workflow runs. Requirements EAT-R073..EAT-R076 of
 * docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents
 * master 0b25e14e084a5b1d612e780bc12a927b3a80dd62 (the triage tree is a master-only archive). Each describe block quotes the
 * statement and acceptance it pins and names the adversarial mutant that must turn it red:
 *
 * - EAT-R073 "Pi MUST reject nonpositive or noninteger concurrency settings." Acceptance: "Call programmatic runtime concurrency
 *   with 0, negative, fraction, NaN and Infinity; assert immediate typed rejection rather than hanging; 1 and default clamped
 *   concurrency pass." Mutant: "Pass zero into Semaphore constructor."
 * - EAT-R074 "Pi MUST enforce shared admission caps across simultaneous invocations." Acceptance: "Start concurrent Pi workflows
 *   under a configured cap; measured owned SDK queries, host child processes and native Forge operations never exceed their
 *   separately configured limits." Mutant: "Allocate independent cap pools per workflow."
 * - EAT-R075 "Pi MUST expose a bounded admission wait reason." Acceptance: "Saturate a cap; queued request reports cap reason and
 *   measurable wait; exceeding configured queue deadline yields typed refusal rather than silent fanout." Mutant: "Dispatch extra
 *   children while reporting queued."
 * - EAT-R076 "Pi MUST remove a cancelled queued invocation before dispatch." Acceptance: "Queue behind saturated cap, cancel,
 *   release capacity; cancelled invocation dispatch count remains zero and slot accounting returns to baseline." Mutant: "Leave
 *   cancelled waiter in runnable queue."
 *
 * "Measured" here is the test host's own count of what it was handed: every agent dispatch is an owned SDK query and a host
 * child, every node dispatch a host child, and a forge.* node dispatch also a native Forge operation (src/workflow/admission.ts,
 * dispatchPools). Real operating-system process counts and a live multi-workflow load journey are the B-telemetry bead's
 * PI-MULTIWORKFLOW-LOAD gate and are not read here.
 */
import { afterEach, describe, expect, it } from "vitest";
import {
  dispatchPools,
  HOST_ADMISSION_MAX_DEADLINE_MS,
  HOST_ADMISSION_POOLS,
  HostAdmission,
  HostAdmissionError,
  type HostAdmissionLimits,
  type HostAdmissionPool,
  type HostAdmissionWait,
} from "../src/workflow/admission.js";
import type { WorkflowAgentEntry, WorkflowEntry, WorkflowNodeEntry } from "../src/workflow/progress.js";
import {
  type RunWorkflowOptions,
  runWorkflow,
  type WorkflowAdmissionWait,
  type WorkflowControl,
  type WorkflowHost,
  type WorkflowRunResult,
  WorkflowRuntimeError,
  workflowConcurrency,
} from "../src/workflow/runtime.js";

const HEAD = 'export const meta = { name: "limits", description: "host admission probes" };\n';

const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

/** Polls `predicate` every 5ms; false once `timeoutMs` passes without it holding. */
async function until(predicate: () => boolean, timeoutMs = 8_000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (!predicate()) {
    if (Date.now() > deadline) return false;
    await sleep(5);
  }
  return true;
}

/** What the test host was handed, live and at its peak, across every run sharing it. */
interface Meter {
  agents: number;
  peakAgents: number;
  processes: number;
  peakProcesses: number;
  forge: number;
  peakForge: number;
  /** Agent prompts in dispatch order. */
  readonly spawned: string[];
  /** Node labels in dispatch order. */
  readonly nodes: string[];
}

interface MeteredHost {
  readonly host: WorkflowHost;
  readonly meter: Meter;
  /** Lets every held and every later dispatch finish, each after a short hold. */
  open(): void;
}

/** Every valve a case built, opened after it so a failed case leaves no run parked behind a closed one. */
const valves: (() => void)[] = [];
afterEach(() => {
  for (const open of valves.splice(0)) open();
});

/** A host that holds each dispatch until `open()` and counts it the whole time it is held. */
function meteredHost(): MeteredHost {
  const meter: Meter = { agents: 0, peakAgents: 0, processes: 0, peakProcesses: 0, forge: 0, peakForge: 0, spawned: [], nodes: [] };
  let opened = false;
  const parked = new Set<() => void>();
  const hold = async (): Promise<void> => {
    if (!opened) await new Promise<void>(resolve => parked.add(resolve));
    await sleep(5);
  };
  const host: WorkflowHost = {
    async spawnAgent(request) {
      meter.spawned.push(request.prompt);
      meter.agents++;
      meter.processes++;
      meter.peakAgents = Math.max(meter.peakAgents, meter.agents);
      meter.peakProcesses = Math.max(meter.peakProcesses, meter.processes);
      try {
        await hold();
        return { ok: true, text: request.prompt };
      } finally {
        meter.agents--;
        meter.processes--;
      }
    },
    abortAgent() {},
    async callNode(request) {
      const forge = request.capabilityId.startsWith("forge.");
      meter.nodes.push(request.label);
      meter.processes++;
      if (forge) meter.forge++;
      meter.peakProcesses = Math.max(meter.peakProcesses, meter.processes);
      meter.peakForge = Math.max(meter.peakForge, meter.forge);
      try {
        await hold();
        return { ok: true };
      } finally {
        meter.processes--;
        if (forge) meter.forge--;
      }
    },
    describeNodeEffect: () => "read",
  };
  const open = (): void => {
    opened = true;
    for (const resolve of parked) resolve();
    parked.clear();
  };
  valves.push(open);
  return { host, meter, open };
}

const LIMITS: HostAdmissionLimits = { sdkQueries: 64, childProcesses: 64, forgeOperations: 64, queueDeadlineMs: 30_000 };
const budgetOf = (limits: Partial<HostAdmissionLimits>): HostAdmission => new HostAdmission({ ...LIMITS, ...limits });
/** One host admission limit set to `value`, the others left at LIMITS. */
function withLimit(field: keyof HostAdmissionLimits, value: number): Partial<HostAdmissionLimits> {
  const limits: { -readonly [K in keyof HostAdmissionLimits]?: number } = {};
  limits[field] = value;
  return limits;
}
type RunCap = "agentCap" | "itemCap" | "nestedCap";
/** One run cap set to `value`. */
function withCap(cap: RunCap, value: number): Pick<RunWorkflowOptions, RunCap> {
  const caps: Pick<RunWorkflowOptions, RunCap> = {};
  caps[cap] = value;
  return caps;
}
/** Wide enough that a run's own semaphore never holds an agent back in the shared-budget cases. */
const WIDE = 8;

/** Start a run of `body`; `progress` collects every entry it emits. */
function start(body: string, options: Omit<RunWorkflowOptions, "script">, progress: WorkflowEntry[] = []): Promise<WorkflowRunResult> {
  return runWorkflow({ script: HEAD + body, ...options, onProgress: entries => { progress.push(...entries); } });
}

const agentRows = (progress: readonly WorkflowEntry[]): WorkflowAgentEntry[] =>
  progress.filter((entry): entry is WorkflowAgentEntry => entry.type === "workflow_agent");
const nodeRows = (progress: readonly WorkflowEntry[]): WorkflowNodeEntry[] =>
  progress.filter((entry): entry is WorkflowNodeEntry => entry.type === "workflow_node");
/**
 * Distinct agent calls that have reached the host side at all: a row exists from arrival, before any slot. Keyed by label,
 * which every case makes unique across its runs (positions restart at 0 in each run).
 */
const arrived = (progress: readonly WorkflowEntry[]): number => new Set(agentRows(progress).map(row => row.label)).size;
const arrivedNodes = (progress: readonly WorkflowEntry[]): number => new Set(nodeRows(progress).map(row => row.label)).size;
/** Generous for a case that starts several worker threads on a loaded host; the waits inside are event-driven. */
const RUNS_TIMEOUT_MS = 30_000;

/** A `width`-agent fan-out for run `tag`, prompts `<tag>-<i>`. */
const agentFanOut = (tag: string, width = 3): string =>
  `return await parallel([${Array.from({ length: width }, (_, i) => `() => agent("${tag}-${i}")`).join(", ")}]);`;

type Settled = { readonly outcome: "resolved"; readonly result: WorkflowRunResult } | { readonly outcome: "rejected"; readonly error: unknown } | { readonly outcome: "hung" };

/** Settle a run, or report it hung after `ms` and abort it, so no worker outlives the case. */
async function settleOrHang(begin: (signal: AbortSignal) => Promise<WorkflowRunResult>, ms = 1500): Promise<Settled> {
  const controller = new AbortController();
  const run = begin(controller.signal).then(
    (result): Settled => ({ outcome: "resolved", result }),
    (error: unknown): Settled => ({ outcome: "rejected", error }),
  );
  const timer = sleep(ms).then((): Settled => ({ outcome: "hung" }));
  const first = await Promise.race([run, timer]);
  if (first.outcome === "hung") {
    controller.abort();
    await run;
  }
  return first;
}

const NONPOSITIVE_OR_NONINTEGER: ReadonlyArray<readonly [string, number]> = [
  ["zero", 0],
  ["negative", -1],
  ["fraction", 0.5],
  ["NaN", Number.NaN],
  ["Infinity", Number.POSITIVE_INFINITY],
];

describe("EAT-R073 nonpositive or noninteger concurrency settings are refused at the call, never hung on", () => {
  it.each(NONPOSITIVE_OR_NONINTEGER)("R073-CONCURRENCY-%s: runWorkflow rejects concurrency %s, typed and immediately, before any dispatch", async (_name, value) => {
    const { host, meter, open } = meteredHost();
    // Open: a dispatched agent finishes, so only a zero-permit semaphore can hang the run.
    open();
    const settled = await settleOrHang(signal => start(agentFanOut("r073"), { host, signal, concurrency: value }));
    expect(settled.outcome).toBe("rejected");
    if (settled.outcome !== "rejected") return;
    expect(settled.error).toBeInstanceOf(WorkflowRuntimeError);
    expect(String(settled.error)).toContain("concurrency must be a positive integer");
    expect(meter.spawned).toEqual([]);
  }, RUNS_TIMEOUT_MS);

  it.each(["agentCap", "itemCap", "nestedCap"] as const satisfies readonly RunCap[])("R073-CAPS-%s: every nonpositive or noninteger value is refused the same way", async cap => {
    const { host, meter, open } = meteredHost();
    open();
    const outcomes: string[] = [];
    for (const [, value] of NONPOSITIVE_OR_NONINTEGER) {
      const settled = await settleOrHang(signal => start(agentFanOut("caps", 1), { host, signal, ...withCap(cap, value) }));
      outcomes.push(settled.outcome === "rejected" && settled.error instanceof WorkflowRuntimeError && String(settled.error).includes(`${cap} must be a positive integer`) ? "typed" : settled.outcome);
    }
    expect(outcomes).toEqual(["typed", "typed", "typed", "typed", "typed"]);
    expect(meter.spawned).toEqual([]);
  }, RUNS_TIMEOUT_MS);

  it("R073-ONE: concurrency 1 completes and never runs two agents at once", async () => {
    const { host, meter, open } = meteredHost();
    open();
    const result = await start(agentFanOut("one"), { host, concurrency: 1 });
    expect(result.status).toBe("completed");
    expect(result.value).toEqual(["one-0", "one-1", "one-2"]);
    expect(meter.peakAgents).toBe(1);
  }, RUNS_TIMEOUT_MS);

  it("R073-DEFAULT: the default concurrency is the clamped [1, 16] value and a run with it completes", async () => {
    expect([workflowConcurrency(0), workflowConcurrency(1), workflowConcurrency(2), workflowConcurrency(18), workflowConcurrency(64)]).toEqual([1, 1, 1, 16, 16]);
    const fallback = workflowConcurrency();
    expect(Number.isSafeInteger(fallback) && fallback >= 1 && fallback <= 16).toBe(true);
    const { host, meter, open } = meteredHost();
    open();
    const result = await start(agentFanOut("default"), { host });
    expect(result.status).toBe("completed");
    expect(meter.spawned.sort()).toEqual(["default-0", "default-1", "default-2"]);
  }, RUNS_TIMEOUT_MS);

  it.each([...HOST_ADMISSION_POOLS.map(pool => [pool] as const), ["queue-deadline"] as const])("R073-LIMITS-%s: a host admission limit refuses every nonpositive or noninteger value, typed", which => {
    const field: keyof HostAdmissionLimits =
      which === "sdk-queries" ? "sdkQueries" : which === "child-processes" ? "childProcesses" : which === "forge-operations" ? "forgeOperations" : "queueDeadlineMs";
    const refusals = NONPOSITIVE_OR_NONINTEGER.map(([, value]) => {
      try {
        budgetOf(withLimit(field, value));
        return "constructed";
      } catch (error) {
        return error instanceof HostAdmissionError && error.code === "invalid-limit" && error.message.includes(field) ? "typed" : String(error);
      }
    });
    expect(refusals).toEqual(["typed", "typed", "typed", "typed", "typed"]);
    expect(budgetOf(withLimit(field, 1)).snapshot().queueDeadlineMs).toBe(field === "queueDeadlineMs" ? 1 : LIMITS.queueDeadlineMs);
  });

  it("R073-DEADLINE-CEILING: the queue deadline stops at setTimeout's ceiling, which a longer deadline would silently undercut", () => {
    expect(budgetOf({ queueDeadlineMs: HOST_ADMISSION_MAX_DEADLINE_MS }).snapshot().queueDeadlineMs).toBe(2_147_483_647);
    expect(() => budgetOf({ queueDeadlineMs: HOST_ADMISSION_MAX_DEADLINE_MS + 1 })).toThrow(HostAdmissionError);
  });

  it("R073-SNAPSHOT: a constructed budget reports each separately configured limit, at rest", () => {
    const pools = budgetOf({ sdkQueries: 2, childProcesses: 3, forgeOperations: 1, queueDeadlineMs: 250 }).snapshot();
    expect(pools.queueDeadlineMs).toBe(250);
    expect(HOST_ADMISSION_POOLS.map(pool => [pool, pools.pools[pool].limit, pools.pools[pool].inFlight, pools.pools[pool].queued])).toEqual([
      ["sdk-queries", 2, 0, 0],
      ["child-processes", 3, 0, 0],
      ["forge-operations", 1, 0, 0],
    ]);
  });
});

describe("EAT-R074 one host budget bounds simultaneous invocations, pool by pool", () => {
  it("R074-CHARGES: an agent dispatch is an owned SDK query and a host child; a node dispatch a host child, and a forge.* node a Forge operation too", () => {
    expect(HOST_ADMISSION_POOLS).toEqual(["sdk-queries", "child-processes", "forge-operations"]);
    expect(dispatchPools({ kind: "agent" })).toEqual(["sdk-queries", "child-processes"]);
    expect(dispatchPools({ kind: "node", capabilityId: "forge.gate.status" })).toEqual(["child-processes", "forge-operations"]);
    expect(dispatchPools({ kind: "node", capabilityId: "hyperunix.find" })).toEqual(["child-processes"]);
    expect(dispatchPools({ kind: "node", capabilityId: "forgery.gate.status" })).toEqual(["child-processes"]);
  });

  it("R074-SDK: three runs sharing a budget of 2 owned SDK queries hold exactly 2 agents in flight between them", async () => {
    const budget = budgetOf({ sdkQueries: 2 });
    const { host, meter, open } = meteredHost();
    const progress: WorkflowEntry[] = [];
    const runs = ["a", "b", "c"].map(tag => start(agentFanOut(tag), { host, hostAdmission: budget, concurrency: WIDE }, progress));
    expect(await until(() => arrived(progress) >= 9)).toBe(true);
    await sleep(50);
    expect([meter.agents, budget.snapshot().pools["sdk-queries"].queued]).toEqual([2, 7]);
    open();
    const results = await Promise.all(runs);
    expect(results.map(result => result.status)).toEqual(["completed", "completed", "completed"]);
    expect([meter.peakAgents, meter.spawned.length]).toEqual([2, 9]);
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ limit: 2, inFlight: 0, peakInFlight: 2, queued: 0, admitted: 9 });
  }, RUNS_TIMEOUT_MS);

  it("R074-PROCESSES: agents and nodes of three runs share 3 host child slots", async () => {
    const budget = budgetOf({ childProcesses: 3 });
    const { host, meter, open } = meteredHost();
    const progress: WorkflowEntry[] = [];
    const body = (tag: string) =>
      `return await parallel([() => agent("${tag}-agent"), () => node("hyperunix.find", {}, { label: "${tag}-0" }), () => node("hyperunix.find", {}, { label: "${tag}-1" })]);`;
    const runs = ["a", "b", "c"].map(tag => start(body(tag), { host, hostAdmission: budget, concurrency: WIDE }, progress));
    expect(await until(() => arrived(progress) >= 3 && arrivedNodes(progress) >= 6)).toBe(true);
    await sleep(50);
    expect([meter.processes, budget.snapshot().pools["child-processes"].queued]).toEqual([3, 6]);
    open();
    const results = await Promise.all(runs);
    expect(results.map(result => result.status)).toEqual(["completed", "completed", "completed"]);
    expect([meter.peakProcesses, meter.spawned.length + meter.nodes.length]).toEqual([3, 9]);
    expect(budget.snapshot().pools["child-processes"]).toMatchObject({ inFlight: 0, peakInFlight: 3, queued: 0, admitted: 9 });
  }, RUNS_TIMEOUT_MS);

  it("R074-FORGE: forge.* nodes of three runs share 1 Forge operation slot while other nodes are not charged to it", async () => {
    const budget = budgetOf({ forgeOperations: 1 });
    const { host, meter, open } = meteredHost();
    const progress: WorkflowEntry[] = [];
    const body = (tag: string) =>
      `return await parallel([() => node("forge.gate.status", {}, { label: "${tag}-forge-0" }), () => node("forge.gate.status", {}, { label: "${tag}-forge-1" }), () => node("hyperunix.find", {}, { label: "${tag}-hx" })]);`;
    const runs = ["a", "b", "c"].map(tag => start(body(tag), { host, hostAdmission: budget, concurrency: WIDE }, progress));
    expect(await until(() => arrivedNodes(progress) >= 9)).toBe(true);
    await sleep(50);
    expect([meter.forge, meter.processes, budget.snapshot().pools["forge-operations"].queued]).toEqual([1, 4, 5]);
    open();
    const results = await Promise.all(runs);
    expect(results.map(result => result.status)).toEqual(["completed", "completed", "completed"]);
    expect(meter.peakForge).toBe(1);
    expect(budget.snapshot().pools["forge-operations"]).toMatchObject({ inFlight: 0, peakInFlight: 1, queued: 0, admitted: 6 });
  }, RUNS_TIMEOUT_MS);

  it("R074-SEPARATE: every pool holds its own limit at once under a mixed fan-out of three runs", async () => {
    const budget = budgetOf({ sdkQueries: 2, childProcesses: 3, forgeOperations: 1 });
    const { host, meter, open } = meteredHost();
    const progress: WorkflowEntry[] = [];
    const body = (tag: string) =>
      `return await parallel([() => agent("${tag}-0"), () => agent("${tag}-1"), () => agent("${tag}-2"), () => node("forge.gate.status", {}, { label: "${tag}-forge-0" }), () => node("forge.gate.status", {}, { label: "${tag}-forge-1" }), () => node("hyperunix.find", {}, { label: "${tag}-hx" })]);`;
    const runs = ["a", "b", "c"].map(tag => start(body(tag), { host, hostAdmission: budget, concurrency: WIDE }, progress));
    expect(await until(() => arrived(progress) >= 9 && arrivedNodes(progress) >= 9)).toBe(true);
    await sleep(50);
    expect(meter.agents <= 2 && meter.processes <= 3 && meter.forge <= 1).toBe(true);
    open();
    const results = await Promise.all(runs);
    expect(results.map(result => result.status)).toEqual(["completed", "completed", "completed"]);
    expect([meter.peakAgents <= 2, meter.peakProcesses <= 3, meter.peakForge <= 1]).toEqual([true, true, true]);
    expect([meter.spawned.length, meter.nodes.length]).toEqual([9, 9]);
    const after = budget.snapshot().pools;
    expect(HOST_ADMISSION_POOLS.map(pool => [after[pool].inFlight, after[pool].queued])).toEqual([[0, 0], [0, 0], [0, 0]]);
  }, RUNS_TIMEOUT_MS);

  it("R074-PER-RUN-CONTROL: without a shared budget the same three runs exceed 2 agents in flight, so the meter is live", async () => {
    const { host, meter, open } = meteredHost();
    const progress: WorkflowEntry[] = [];
    const runs = ["a", "b", "c"].map(tag => start(agentFanOut(tag), { host, concurrency: 2 }, progress));
    expect(await until(() => arrived(progress) >= 9)).toBe(true);
    await sleep(50);
    expect(meter.agents).toBe(6);
    open();
    await Promise.all(runs);
    expect(meter.peakAgents).toBe(6);
  }, RUNS_TIMEOUT_MS);

  it("R074-RUN-LIMIT: a run's own concurrency still binds under a wider shared budget", async () => {
    const budget = budgetOf({ sdkQueries: 8 });
    const { host, meter, open } = meteredHost();
    const progress: WorkflowEntry[] = [];
    const run = start(agentFanOut("narrow", 4), { host, hostAdmission: budget, concurrency: 1 }, progress);
    expect(await until(() => arrived(progress) >= 4)).toBe(true);
    await sleep(50);
    // The run's own permit comes first: the shared pool holds a slot only for the one agent the run lets start.
    const sdk = budget.snapshot().pools["sdk-queries"];
    expect([meter.agents, sdk.inFlight, sdk.queued]).toEqual([1, 1, 0]);
    open();
    expect((await run).status).toBe("completed");
    expect([meter.peakAgents, budget.snapshot().pools["sdk-queries"].peakInFlight]).toEqual([1, 1]);
  }, RUNS_TIMEOUT_MS);
});

describe("EAT-R075 a queued dispatch reports the cap it waits on and for how long, and the queue deadline refuses it, typed", () => {
  it("R075-REASON: the queued agent reports sdk-queries at its limit, its wait grows, and no extra child is dispatched meanwhile", async () => {
    const budget = budgetOf({ sdkQueries: 1 });
    const { host, meter, open } = meteredHost();
    const reports: WorkflowAdmissionWait[] = [];
    const first = start('return await agent("A-0");', { host, hostAdmission: budget });
    expect(await until(() => meter.spawned.length === 1)).toBe(true);
    const progress: WorkflowEntry[] = [];
    const second = start('return await agent("B-0");', { host, hostAdmission: budget, onAdmissionWait: wait => { reports.push(wait); } }, progress);
    expect(await until(() => reports.length === 1)).toBe(true);
    expect(reports).toEqual([{ kind: "agent", index: 0, pool: "sdk-queries", limit: 1, inFlight: 1, ahead: 0, waitedMs: 0 }]);
    await sleep(60);
    const waits = budget.waiting();
    expect(waits.map(wait => [wait.pool, wait.limit, wait.inFlight, wait.ahead])).toEqual([["sdk-queries", 1, 1, 0]]);
    expect(waits[0].waitedMs).toBeGreaterThanOrEqual(50);
    expect(meter.spawned).toEqual(["A-0"]);
    open();
    expect([(await first).status, (await second).status]).toEqual(["completed", "completed"]);
    expect(meter.spawned).toEqual(["A-0", "B-0"]);
    const row = agentRows(progress).find(entry => entry.state === "done");
    expect(row !== undefined && row.startedAt !== undefined && row.queuedAt !== undefined && row.startedAt - row.queuedAt >= 50).toBe(true);
  }, RUNS_TIMEOUT_MS);

  it("R075-UNIT-REASON: acquire reports the pool, its limit and load and the queue ahead, and the lease carries the measured wait", async () => {
    const budget = budgetOf({ forgeOperations: 1 });
    const held = await budget.acquire(["forge-operations"]);
    const reports: HostAdmissionWait[] = [];
    const second = budget.acquire(["forge-operations"], { onQueued: wait => { reports.push(wait); } });
    const third = budget.acquire(["forge-operations"], { onQueued: wait => { reports.push(wait); } });
    expect(reports).toEqual([
      { pool: "forge-operations", limit: 1, inFlight: 1, ahead: 0, waitedMs: 0 },
      { pool: "forge-operations", limit: 1, inFlight: 1, ahead: 1, waitedMs: 0 },
    ]);
    await sleep(40);
    held.release();
    const lease = await second;
    expect(lease.pools).toEqual(["forge-operations"]);
    expect(lease.waitedMs).toBeGreaterThanOrEqual(30);
    lease.release();
    (await third).release();
    expect(budget.snapshot().pools["forge-operations"]).toMatchObject({ inFlight: 0, queued: 0, admitted: 3 });
  });

  it("R075-DEADLINE: an agent still queued at the deadline is refused, typed, and never dispatched; the run fails rather than fans out", async () => {
    const budget = budgetOf({ sdkQueries: 1, queueDeadlineMs: 80 });
    const { host, meter, open } = meteredHost();
    const first = start('return await agent("A-0");', { host, hostAdmission: budget });
    expect(await until(() => meter.spawned.length === 1)).toBe(true);
    const progress: WorkflowEntry[] = [];
    const began = Date.now();
    const second = await start('return await agent("B-0");', { host, hostAdmission: budget }, progress);
    expect(Date.now() - began).toBeGreaterThanOrEqual(70);
    expect(second.status).toBe("failed");
    expect(second.error).toContain("Host admission refused");
    expect(second.error).toContain("sdk-queries");
    expect(agentRows(progress).at(-1)).toMatchObject({ state: "error" });
    expect(meter.spawned).toEqual(["A-0"]);
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 1, queued: 0, refused: 1 });
    open();
    expect((await first).status).toBe("completed");
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 0, queued: 0, admitted: 1, refused: 1 });
  }, RUNS_TIMEOUT_MS);

  it("R075-NODE-DEADLINE: a forge.* node still queued at the deadline fails its run with an unavailable diagnostic, never dispatched", async () => {
    const budget = budgetOf({ forgeOperations: 1, queueDeadlineMs: 80 });
    const { host, meter, open } = meteredHost();
    const first = start('return await node("forge.gate.status", {}, { label: "A-forge" });', { host, hostAdmission: budget });
    expect(await until(() => meter.nodes.length === 1)).toBe(true);
    const second = await start('return await node("forge.gate.status", {}, { label: "B-forge" });', { host, hostAdmission: budget });
    expect(second.status).toBe("failed");
    expect(second.capabilityError?.category).toBe("unavailable");
    expect(second.capabilityError?.message).toContain("forge-operations");
    expect(meter.nodes).toEqual(["A-forge"]);
    open();
    expect((await first).status).toBe("completed");
    const pools = budget.snapshot().pools;
    expect([pools["forge-operations"].refused, pools["forge-operations"].inFlight, pools["child-processes"].inFlight]).toEqual([1, 0, 0]);
  }, RUNS_TIMEOUT_MS);

  it("R075-UNIT-DEADLINE: acquire rejects with admission-deadline naming the pool, and the refused request leaves the line", async () => {
    const budget = budgetOf({ sdkQueries: 1, queueDeadlineMs: 40 });
    const held = await budget.acquire(["sdk-queries"]);
    const began = Date.now();
    const refusal = await budget.acquire(["sdk-queries"]).then(() => undefined, (error: unknown) => error);
    expect(Date.now() - began).toBeGreaterThanOrEqual(30);
    expect(refusal).toBeInstanceOf(HostAdmissionError);
    expect(refusal instanceof HostAdmissionError ? [refusal.code, refusal.pool] : []).toEqual(["admission-deadline", "sdk-queries"]);
    expect(budget.waiting()).toEqual([]);
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 1, queued: 0, refused: 1 });
    held.release();
    expect(budget.snapshot().pools["sdk-queries"].inFlight).toBe(0);
  });
});

describe("EAT-R076 a cancelled queued invocation leaves the line before dispatch and the slots return to baseline", () => {
  it("R076-RUN-CANCEL: a run aborted while its agent is queued dispatches nothing, and capacity released later returns to zero", async () => {
    const budget = budgetOf({ sdkQueries: 1 });
    const { host, meter, open } = meteredHost();
    const first = start('return await agent("A-0");', { host, hostAdmission: budget });
    expect(await until(() => meter.spawned.length === 1)).toBe(true);
    const controller = new AbortController();
    const reports: WorkflowAdmissionWait[] = [];
    const second = start('return await agent("B-0");', { host, hostAdmission: budget, signal: controller.signal, onAdmissionWait: wait => { reports.push(wait); } });
    expect(await until(() => reports.length === 1)).toBe(true);
    controller.abort();
    expect((await second).status).toBe("killed");
    expect(budget.waiting()).toEqual([]);
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 1, queued: 0, cancelledWhileQueued: 1 });
    open();
    expect((await first).status).toBe("completed");
    await sleep(30);
    expect(meter.spawned).toEqual(["A-0"]);
    const pools = budget.snapshot().pools;
    expect(HOST_ADMISSION_POOLS.map(pool => pools[pool].inFlight)).toEqual([0, 0, 0]);
    expect([pools["sdk-queries"].admitted, pools["child-processes"].admitted]).toEqual([1, 1]);
  }, RUNS_TIMEOUT_MS);

  it("R076-SKIP: a skipped agent leaves the host line at once, before any sibling releases, and is never dispatched", async () => {
    const budget = budgetOf({ sdkQueries: 1 });
    const { host, meter, open } = meteredHost();
    const first = start('return await agent("A-0");', { host, hostAdmission: budget });
    expect(await until(() => meter.spawned.length === 1)).toBe(true);
    // The run's WorkflowControl skip, held as a reference: the operator's skip, not a test-framework marker.
    let skipAgent: WorkflowControl["skip"] | undefined;
    const reports: WorkflowAdmissionWait[] = [];
    const second = start('const value = await agent("B-0");\nreturn { value };', {
      host, hostAdmission: budget, onControl: given => { skipAgent = given.skip; }, onAdmissionWait: wait => { reports.push(wait); },
    });
    expect(await until(() => reports.length === 1)).toBe(true);
    expect(skipAgent?.(0)).toBe(true);
    const skipped = await second;
    expect([skipped.status, skipped.value]).toEqual(["completed", { value: null }]);
    expect(budget.waiting()).toEqual([]);
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 1, queued: 0, cancelledWhileQueued: 1 });
    open();
    expect((await first).status).toBe("completed");
    expect(meter.spawned).toEqual(["A-0"]);
    expect(budget.snapshot().pools["sdk-queries"].inFlight).toBe(0);
  }, RUNS_TIMEOUT_MS);

  it("R076-PAUSE: an agent paused while queued on the host hands its slots back when they arrive and starts only on resume", async () => {
    const budget = budgetOf({ sdkQueries: 1 });
    const { host, meter, open } = meteredHost();
    const first = start('return await agent("A-0");', { host, hostAdmission: budget });
    expect(await until(() => meter.spawned.length === 1)).toBe(true);
    let control: WorkflowControl | undefined;
    const reports: WorkflowAdmissionWait[] = [];
    const second = start('return await agent("B-0");', {
      host, hostAdmission: budget, onControl: given => { control = given; }, onAdmissionWait: wait => { reports.push(wait); },
    });
    expect(await until(() => reports.length === 1)).toBe(true);
    control?.pause();
    open();
    expect((await first).status).toBe("completed");
    await sleep(50);
    // The slot arrived while B was paused: handed straight back, and B-0 was not dispatched.
    expect(meter.spawned).toEqual(["A-0"]);
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 0, queued: 0 });
    control?.resume();
    expect((await second).status).toBe("completed");
    expect(meter.spawned).toEqual(["A-0", "B-0"]);
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 0, queued: 0, admitted: 3 });
  }, RUNS_TIMEOUT_MS);

  it("R076-NODE-CANCEL: a run aborted while its forge.* node is queued never dispatches it and both pools return to zero", async () => {
    const budget = budgetOf({ forgeOperations: 1 });
    const { host, meter, open } = meteredHost();
    const first = start('return await node("forge.gate.status", {}, { label: "A-forge" });', { host, hostAdmission: budget });
    expect(await until(() => meter.nodes.length === 1)).toBe(true);
    const controller = new AbortController();
    const reports: WorkflowAdmissionWait[] = [];
    const second = start('return await node("forge.gate.status", {}, { label: "B-forge" });', { host, hostAdmission: budget, signal: controller.signal, onAdmissionWait: wait => { reports.push(wait); } });
    expect(await until(() => reports.length === 1)).toBe(true);
    expect(reports[0]).toMatchObject({ kind: "node", index: 0, pool: "forge-operations" });
    controller.abort();
    expect((await second).status).toBe("killed");
    open();
    expect((await first).status).toBe("completed");
    expect(meter.nodes).toEqual(["A-forge"]);
    const pools = budget.snapshot().pools;
    expect([pools["forge-operations"].inFlight, pools["child-processes"].inFlight, pools["forge-operations"].cancelledWhileQueued]).toEqual([0, 0, 1]);
  }, RUNS_TIMEOUT_MS);

  it("R076-UNIT-PARTIAL: a request cancelled on its second pool hands back the first, so nothing leaks", async () => {
    const budget = budgetOf({ sdkQueries: 1, childProcesses: 1 });
    const child = await budget.acquire(["child-processes"]);
    const controller = new AbortController();
    const pending = budget.acquire(dispatchPools({ kind: "agent" }), { signal: controller.signal });
    expect(await until(() => budget.snapshot().pools["child-processes"].queued === 1)).toBe(true);
    expect(budget.snapshot().pools["sdk-queries"].inFlight).toBe(1);
    controller.abort();
    const refusal = await pending.then(() => undefined, (error: unknown) => error);
    expect(refusal instanceof HostAdmissionError ? [refusal.code, refusal.pool] : []).toEqual(["admission-cancelled", "child-processes"]);
    const pools = budget.snapshot().pools;
    expect([pools["sdk-queries"].inFlight, pools["child-processes"].inFlight, pools["child-processes"].queued, pools["child-processes"].cancelledWhileQueued]).toEqual([0, 1, 0, 1]);
    child.release();
    expect(budget.snapshot().pools["child-processes"].inFlight).toBe(0);
  });

  it("R076-UNIT-RELEASE: release hands the slot to the oldest waiter, and a second release of the same lease is a no-op", async () => {
    const budget = budgetOf({ sdkQueries: 1 });
    const order: string[] = [];
    const held = await budget.acquire(["sdk-queries"]);
    const queued = ["w1", "w2", "w3"].map(name => budget.acquire(["sdk-queries"]).then(lease => { order.push(name); return lease; }));
    held.release();
    held.release();
    const w1 = await queued[0];
    expect([order, budget.snapshot().pools["sdk-queries"].inFlight, budget.snapshot().pools["sdk-queries"].queued]).toEqual([["w1"], 1, 2]);
    w1.release();
    (await queued[1]).release();
    (await queued[2]).release();
    expect(order).toEqual(["w1", "w2", "w3"]);
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 0, queued: 0, admitted: 4 });
  });

  it("R076-UNIT-PRE-ABORTED: an already-cancelled request takes nothing and is never queued", async () => {
    const budget = budgetOf({ sdkQueries: 1 });
    const controller = new AbortController();
    controller.abort();
    const refusal = await budget.acquire(["sdk-queries"], { signal: controller.signal }).then(() => undefined, (error: unknown) => error);
    expect(refusal instanceof HostAdmissionError ? refusal.code : undefined).toBe("admission-cancelled");
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 0, queued: 0, admitted: 0, cancelledWhileQueued: 0 });
  });

  it("R076-UNIT-UNKNOWN: a request naming no pool or an unknown pool is refused, typed, before taking anything", async () => {
    const budget = budgetOf({});
    const codes: (string | undefined)[] = [];
    const probes: ReadonlyArray<readonly string[]> = [[], ["gpu-minutes"]];
    for (const pools of probes) {
      const refusal = await budget.acquire(pools as readonly HostAdmissionPool[]).then(() => undefined, (error: unknown) => error);
      codes.push(refusal instanceof HostAdmissionError ? refusal.code : undefined);
    }
    expect(codes).toEqual(["unknown-pool", "unknown-pool"]);
    expect(HOST_ADMISSION_POOLS.map(pool => budget.snapshot().pools[pool].admitted)).toEqual([0, 0, 0]);
  });
});
