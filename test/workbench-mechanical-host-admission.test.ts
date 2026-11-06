/**
 * wb-ny54 [MWI-limits] (slice PI-7): red-first acceptance for positive host resource limits and the host admission budget
 * shared by simultaneous workflow runs. Requirements EAT-R073..EAT-R076 of
 * docs/workbench/programs/mechanical-workflows-interop-2026-11-04/triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents
 * master 0b25e14e084a5b1d612e780bc12a927b3a80dd62 (the triage tree is a master-only archive). The list below quotes each
 * requirement's statement and acceptance and names the adversarial mutant that must turn it red; the describe block named for
 * a requirement holds the cases that pin it:
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
 *
 * Cut #2, the respin after the first gate's refusal, adds cases that pin the claims of the cut's own words the refusal found
 * unpinned, and further claims of those words, each case titled by the behavior it pins; docs/workbench/receipts/wb-ny54.md
 * maps the cases to the refusal items they cure.
 */
import { performance } from "node:perf_hooks";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  dispatchPools,
  HOST_ADMISSION_MAX_DEADLINE_MS,
  HOST_ADMISSION_POOLS,
  HostAdmission,
  HostAdmissionError,
  type HostAdmissionLease,
  type HostAdmissionLimits,
  type HostAdmissionPool,
  type HostAdmissionWait,
} from "../src/workflow/admission.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import type { WorkflowAgentEntry, WorkflowEntry, WorkflowNodeEntry } from "../src/workflow/progress.js";
import { type AcknowledgeRecord, entryDigestOf, type OverrideRecord, RECONCILE_CONTRACT_VERSION } from "../src/workflow/reconcile.js";
import {
  type RunWorkflowOptions,
  runWorkflow,
  WORKFLOW_AGENT_CAP,
  WORKFLOW_ITEM_CAP,
  WORKFLOW_NESTED_CAP,
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

/** The refusal code of a HostAdmissionError; any other outcome as text. */
const codeOf = (error: unknown): string => (error instanceof HostAdmissionError ? error.code : String(error));
/** Milliseconds since `began`, both read on the monotonic clock (performance.now()). */
const since = (began: number): number => performance.now() - began;
/** Settles an admitted request by releasing its lease at once. */
const admittedThenReleased = (lease: HostAdmissionLease): string => {
  lease.release();
  return "admitted";
};
/** Every pool's in-flight count, in HOST_ADMISSION_POOLS order. */
const inFlightOf = (budget: HostAdmission): number[] => HOST_ADMISSION_POOLS.map(pool => budget.snapshot().pools[pool].inFlight);

/**
 * Runs `body` with the wall clock (Date) frozen and every timer real: inside it a wait measured on the wall clock reads 0,
 * while one measured on the monotonic clock still grows.
 */
async function withFrozenWallClock<T>(body: () => Promise<T>): Promise<T> {
  vi.useFakeTimers({ toFake: ["Date"] });
  try {
    return await body();
  } finally {
    vi.useRealTimers();
  }
}

type RunLimit = RunCap | "concurrency";
/** One run limit, the concurrency or a cap, set to `value`. */
function withRunLimit(limit: RunLimit, value: number): Pick<RunWorkflowOptions, RunLimit> {
  const limits: Pick<RunWorkflowOptions, RunLimit> = {};
  limits[limit] = value;
  return limits;
}

/** The pool each host admission pool limit configures. */
const POOL_OF = {
  sdkQueries: "sdk-queries",
  childProcesses: "child-processes",
  forgeOperations: "forge-operations",
} as const satisfies Record<"sdkQueries" | "childProcesses" | "forgeOperations", HostAdmissionPool>;

/** Collects the journal rows a run writes, so a later run can resume from them. */
function recorder(): { readonly entries: WorkflowJournalEntry[]; append(entry: WorkflowJournalEntry): void } {
  const entries: WorkflowJournalEntry[] = [];
  return {
    entries,
    append: entry => {
      entries.push(entry);
    },
  };
}

/** A journal's node rows, one per position (a position's last row wins), as a resume consults them. */
const consultedNodes = (entries: readonly WorkflowJournalEntry[]): WorkflowJournalEntry[] => [
  ...new Map(entries.filter(entry => entry.kind === "node").map(entry => [entry.index, entry])).values(),
];

/** A host whose node capability is an external effect; it counts the provider calls it is handed. */
function effectHost(): { readonly host: WorkflowHost; readonly nodeCalls: unknown[] } {
  const nodeCalls: unknown[] = [];
  const host: WorkflowHost = {
    async spawnAgent(request) {
      return { ok: true, text: `live:${request.prompt}` };
    },
    abortAgent() {},
    async callNode(request) {
      nodeCalls.push(request.input);
      return { answer: "live" };
    },
    describeNodeEffect: () => "external",
  };
  return { host, nodeCalls };
}

/*
 * Operator decision rows in the landed shape of test/workflow-effect-replay.test.ts (its Q2 override case): an
 * effect-absent acknowledgement of a journaled external effect, then an override authorizing one re-run of it.
 */
const RECONCILE_AT = "2026-10-15T09:30:00Z";
const OPERATOR_PRINCIPAL = "local-operator:1:s1";

function reconcileEntryOf(recorded: WorkflowJournalEntry) {
  return {
    index: recorded.index,
    key: recorded.key,
    ok: recorded.ok,
    capabilityId: recorded.capabilityId ?? "",
    effectClass: recorded.effectClass ?? "",
    ...(recorded.basis !== undefined ? { basis: recorded.basis } : {}),
    entryDigest: entryDigestOf(recorded),
  };
}

function acknowledgeRowFor(recorded: WorkflowJournalEntry): WorkflowJournalEntry {
  const record: AcknowledgeRecord = {
    contractVersion: RECONCILE_CONTRACT_VERSION,
    decision: "acknowledge",
    acknowledgementId: `ack_${"1".repeat(32)}`,
    policy: "exact-grant+same-scope+bound-entry+producer-evidence+operator-attested",
    taskId: "wf_resume01",
    entry: reconcileEntryOf(recorded),
    scope: { workspace: "/ws", principal: OPERATOR_PRINCIPAL },
    operator: { principal: OPERATOR_PRINCIPAL, role: "local-operator" },
    grant: "reconcile:furnace.acknowledge",
    recordedAt: RECONCILE_AT,
    reason: "inspected the producer by hand",
    determination: "effect-absent",
    evidenceClass: "operator-asserted",
    evidence: [],
    noEvidenceReason: "producer-unavailable",
    settlement: "none",
  };
  return {
    index: recorded.index, key: recorded.key, ok: true, kind: "acknowledge",
    capabilityId: recorded.capabilityId, effectClass: recorded.effectClass, reconcile: record,
  };
}

function overrideRowFor(recorded: WorkflowJournalEntry): WorkflowJournalEntry {
  const record: OverrideRecord = {
    contractVersion: RECONCILE_CONTRACT_VERSION,
    decision: "override",
    overrideId: `ovr_${"2".repeat(32)}`,
    policy: "exact-grant+same-scope+bound-acknowledgement+operator-confirmed+duplicate-risk-accepted",
    taskId: "wf_resume01",
    entry: reconcileEntryOf(recorded),
    scope: { workspace: "/ws", principal: OPERATOR_PRINCIPAL },
    operator: { principal: OPERATOR_PRINCIPAL, role: "local-operator" },
    grant: "reconcile:furnace.override",
    recordedAt: RECONCILE_AT,
    reason: "the effect never happened; re-run it once",
    acknowledgementId: `ack_${"1".repeat(32)}`,
    duplicateRisk: "possible-duplicate",
    confirmation: { confirmed: true, position: recorded.index, capabilityId: recorded.capabilityId ?? "", acceptDuplicateRisk: true },
  };
  return {
    index: recorded.index, key: recorded.key, ok: true, kind: "override",
    capabilityId: recorded.capabilityId, effectClass: recorded.effectClass, reconcile: record,
  };
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

  it("R073-DEFAULT-IN-FLIGHT: with concurrency unset, a 20-agent fan-out holds exactly min(20, workflowConcurrency()) agents in flight at once", async () => {
    const width = 20;
    const expected = Math.min(width, workflowConcurrency());
    const { host, meter, open } = meteredHost();
    const progress: WorkflowEntry[] = [];
    const run = start(agentFanOut("unset", width), { host }, progress);
    expect(await until(() => arrived(progress) >= width && meter.agents >= expected)).toBe(true);
    await sleep(50);
    expect(meter.agents).toBe(expected);
    open();
    expect((await run).status).toBe("completed");
    expect([meter.peakAgents, meter.spawned.length]).toEqual([expected, width]);
  }, RUNS_TIMEOUT_MS);

  it("R073-DEFAULT-CAPS: with agentCap, itemCap and nestedCap unset, a run fails at agent WORKFLOW_AGENT_CAP + 1, at a parallel() of WORKFLOW_ITEM_CAP + 1 items and at nested workflow() call WORKFLOW_NESTED_CAP + 1, each refusal naming that default", async () => {
    const host: WorkflowHost = {
      async spawnAgent(request) {
        return { ok: true, text: request.prompt };
      },
      abortAgent() {},
      async callNode() {
        return { ok: true };
      },
      loadWorkflow: ref => ({ ok: false, message: `No saved workflow named "${ref.name ?? ""}".` }),
    };
    const agents = await start(`return await parallel(Array.from({ length: ${WORKFLOW_AGENT_CAP + 1} }, (_, i) => () => agent("cap-" + i)));`, { host });
    expect(agents.status).toBe("failed");
    expect(agents.error).toContain(`Workflow exceeded its cap of ${WORKFLOW_AGENT_CAP} agents.`);
    const items = await start(`return await parallel(Array.from({ length: ${WORKFLOW_ITEM_CAP + 1} }, () => () => 1));`, { host });
    expect(items.status).toBe("failed");
    expect(items.error).toContain(`${WORKFLOW_ITEM_CAP + 1} items, over the limit of ${WORKFLOW_ITEM_CAP}.`);
    const nested = await start(
      [
        `for (let i = 0; i <= ${WORKFLOW_NESTED_CAP}; i++) {`,
        '  try { await workflow("absent"); } catch (error) { if (String(error).includes("nested workflow() calls")) throw error; }',
        "}",
        'return "uncapped";',
      ].join("\n"),
      { host },
    );
    expect(nested.status).toBe("failed");
    expect(nested.error).toContain(`Workflow exceeded its cap of ${WORKFLOW_NESTED_CAP} nested workflow() calls.`);
  }, RUNS_TIMEOUT_MS);

  it("R073-SAFE-INTEGER: a host pool limit or a run limit may be any positive safe integer, 2^31 and Number.MAX_SAFE_INTEGER included, and 2^53 is refused, typed, as each of them and as the queue deadline", async () => {
    for (const field of ["sdkQueries", "childProcesses", "forgeOperations"] as const) {
      const limits = [2 ** 31, Number.MAX_SAFE_INTEGER].map(value => budgetOf(withLimit(field, value)).snapshot().pools[POOL_OF[field]].limit);
      expect([field, ...limits]).toEqual([field, 2 ** 31, Number.MAX_SAFE_INTEGER]);
    }
    const hostRefusals = (["sdkQueries", "childProcesses", "forgeOperations", "queueDeadlineMs"] as const).map(field => {
      try {
        budgetOf(withLimit(field, 2 ** 53));
        return `${field}:constructed`;
      } catch (error) {
        return error instanceof HostAdmissionError && error.code === "invalid-limit" && error.message.includes(field) ? `${field}:typed` : `${field}:${String(error)}`;
      }
    });
    expect(hostRefusals).toEqual(["sdkQueries:typed", "childProcesses:typed", "forgeOperations:typed", "queueDeadlineMs:typed"]);
    const { host, meter, open } = meteredHost();
    open();
    const outcomes: string[] = [];
    for (const limit of ["concurrency", "agentCap", "itemCap", "nestedCap"] as const) {
      const accepted = await settleOrHang(signal => start(agentFanOut(`safe-${limit}`, 1), { host, signal, ...withRunLimit(limit, Number.MAX_SAFE_INTEGER) }));
      outcomes.push(`${limit}:${accepted.outcome === "resolved" ? accepted.result.status : accepted.outcome}`);
      const refused = await settleOrHang(signal => start(agentFanOut(`unsafe-${limit}`, 1), { host, signal, ...withRunLimit(limit, 2 ** 53) }));
      const typed = refused.outcome === "rejected" && refused.error instanceof WorkflowRuntimeError && String(refused.error).includes(`${limit} must be a positive integer`);
      outcomes.push(`${limit}:${typed ? "typed" : refused.outcome}`);
    }
    expect(outcomes).toEqual([
      "concurrency:completed", "concurrency:typed",
      "agentCap:completed", "agentCap:typed",
      "itemCap:completed", "itemCap:typed",
      "nestedCap:completed", "nestedCap:typed",
    ]);
    expect(meter.spawned).toEqual(["safe-concurrency-0", "safe-agentCap-0", "safe-itemCap-0", "safe-nestedCap-0"]);
  }, RUNS_TIMEOUT_MS);

  it("R073-SNAPSHOT-COUNTS-ONLY: a snapshot carries counts only: per pool exactly limit, inFlight, peakInFlight, queued, admitted, refused and cancelledWhileQueued, each a number, with a request queued", async () => {
    const budget = budgetOf({ sdkQueries: 1 });
    const held = await budget.acquire(["sdk-queries"]);
    const queued = budget.acquire(["sdk-queries"]);
    const snapshot = budget.snapshot();
    expect(Object.keys(snapshot).sort()).toEqual(["pools", "queueDeadlineMs"]);
    expect(Object.keys(snapshot.pools)).toEqual([...HOST_ADMISSION_POOLS]);
    for (const pool of HOST_ADMISSION_POOLS) {
      const counts = snapshot.pools[pool];
      expect([pool, ...Object.keys(counts).sort()]).toEqual([pool, "admitted", "cancelledWhileQueued", "inFlight", "limit", "peakInFlight", "queued", "refused"]);
      expect([pool, Object.values(counts).every(value => typeof value === "number")]).toEqual([pool, true]);
    }
    expect(snapshot.pools["sdk-queries"]).toEqual({ limit: 1, inFlight: 1, peakInFlight: 1, queued: 1, admitted: 1, refused: 0, cancelledWhileQueued: 0 });
    held.release();
    (await queued).release();
    expect(inFlightOf(budget)).toEqual([0, 0, 0]);
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

  it("R074-NODE-RUN-LIMIT: a run's own node permit, 16 at once, still binds under a wider shared budget: of 17 forge.* nodes the 17th waits on the run and holds no host slot", async () => {
    const budget = budgetOf({});
    const { host, meter, open } = meteredHost();
    const progress: WorkflowEntry[] = [];
    const nodes = Array.from({ length: 17 }, (_, i) => `() => node("forge.gate.status", {}, { label: "wide-${i}" })`);
    const run = start(`return await parallel([${nodes.join(", ")}]);`, { host, hostAdmission: budget }, progress);
    expect(await until(() => arrivedNodes(progress) >= 17 && meter.forge >= 16)).toBe(true);
    await sleep(50);
    const pools = budget.snapshot().pools;
    expect([meter.forge, pools["forge-operations"].inFlight, pools["forge-operations"].queued, pools["child-processes"].inFlight]).toEqual([16, 16, 0, 16]);
    open();
    expect((await run).status).toBe("completed");
    const forge = budget.snapshot().pools["forge-operations"];
    expect([meter.peakForge, forge.peakInFlight, forge.admitted, forge.inFlight]).toEqual([16, 16, 17, 0]);
  }, RUNS_TIMEOUT_MS);

  it("R074-REPLAY-UNCHARGED: a resumed run replays its journaled agent and read node without a host slot: with every pool held full, the replayed prefix completes and no pool admits, queues or refuses anything for it", async () => {
    const script = 'const a = await agent("R-0");\nconst n = await node("hyperunix.find", {}, { label: "R-node" });\nreturn [a, n];';
    const { host, meter, open } = meteredHost();
    open();
    const first = recorder();
    expect((await start(script, { host, journal: first })).status).toBe("completed");
    const budget = budgetOf({ sdkQueries: 1, childProcesses: 1, forgeOperations: 1, queueDeadlineMs: 200 });
    const held = await budget.acquire([...HOST_ADMISSION_POOLS]);
    const resumed = await start(script, { host, hostAdmission: budget, journal: { entries: first.entries } });
    held.release();
    expect([resumed.status, resumed.replayedCount, resumed.replayedNodeCount]).toEqual(["completed", 1, 1]);
    expect([meter.spawned, meter.nodes]).toEqual([["R-0"], ["R-node"]]);
    const pools = budget.snapshot().pools;
    expect(HOST_ADMISSION_POOLS.map(pool => [pools[pool].admitted, pools[pool].queued, pools[pool].refused, pools[pool].inFlight])).toEqual([
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ]);
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

  it("R075-UNIT-WHOLE-WAIT: the queue deadline bounds the whole wait of one request across its pools: admitted late to its first pool, it is refused on its second when the deadline it started with passes, and hands the first back", async () => {
    const deadline = 500;
    const budget = budgetOf({ sdkQueries: 1, childProcesses: 1, queueDeadlineMs: deadline });
    const sdk = await budget.acquire(["sdk-queries"]);
    const child = await budget.acquire(["child-processes"]);
    const began = performance.now();
    const pending = budget.acquire(["sdk-queries", "child-processes"]).then(
      (lease): { refusal: unknown; waited: number } => {
        lease.release();
        return { refusal: undefined, waited: since(began) };
      },
      (error: unknown) => ({ refusal: error, waited: since(began) }),
    );
    await sleep(380);
    sdk.release();
    // Admitted to sdk-queries at about 380 ms, the request now waits on child-processes and holds sdk-queries.
    expect(await until(() => budget.snapshot().pools["child-processes"].queued === 1)).toBe(true);
    expect(budget.snapshot().pools["sdk-queries"].inFlight).toBe(1);
    const { refusal, waited } = await pending;
    expect(refusal instanceof HostAdmissionError ? [refusal.name, refusal.code, refusal.pool] : refusal).toEqual(["HostAdmissionError", "admission-deadline", "child-processes"]);
    expect(waited).toBeGreaterThanOrEqual(deadline - 20);
    // A fresh deadline for the second pool would refuse it at about 380 + 500 ms.
    expect(waited).toBeLessThan(deadline + 200);
    // Refused, it holds nothing: sdk-queries went back, and it left the child-processes line.
    const pools = budget.snapshot().pools;
    expect([pools["sdk-queries"].inFlight, pools["child-processes"].inFlight, pools["child-processes"].queued, pools["child-processes"].refused]).toEqual([0, 1, 0, 1]);
    expect(budget.waiting()).toEqual([]);
    child.release();
    expect(inFlightOf(budget)).toEqual([0, 0, 0]);
  });

  it("R075-UNIT-DEADLINE-BOUND: the longest one request waits is its queue deadline: still queued, it is refused at the deadline and not later", async () => {
    const deadline = 400;
    const budget = budgetOf({ sdkQueries: 1, queueDeadlineMs: deadline });
    const held = await budget.acquire(["sdk-queries"]);
    const began = performance.now();
    const code = await budget.acquire(["sdk-queries"]).then(admittedThenReleased, codeOf);
    const waited = since(began);
    held.release();
    expect(code).toBe("admission-deadline");
    expect(waited).toBeGreaterThanOrEqual(deadline - 20);
    // Twice the deadline would refuse it at about 800 ms.
    expect(waited).toBeLessThan(deadline + 240);
  });

  it("R075-UNIT-ORDER: pools are taken one at a time in HOST_ADMISSION_POOLS order whatever order a request names them in: two requests naming them in opposite orders are both admitted, and a request waiting on its first pool holds none of the later ones", async () => {
    const budget = budgetOf({ sdkQueries: 1, childProcesses: 1, forgeOperations: 1, queueDeadlineMs: 250 });
    const x = budget.acquire(["sdk-queries", "child-processes"]).then(admittedThenReleased, codeOf);
    const y = budget.acquire(["child-processes", "sdk-queries"]).then(admittedThenReleased, codeOf);
    expect([await x, await y]).toEqual(["admitted", "admitted"]);
    const held = await budget.acquire(["sdk-queries"]);
    const z = budget.acquire(["forge-operations", "child-processes", "sdk-queries"]).then(admittedThenReleased, codeOf);
    await sleep(20);
    const waitingOnFirst = budget.snapshot().pools;
    expect([waitingOnFirst["sdk-queries"].queued, waitingOnFirst["child-processes"].inFlight, waitingOnFirst["forge-operations"].inFlight]).toEqual([1, 0, 0]);
    held.release();
    expect(await z).toBe("admitted");
    expect(inFlightOf(budget)).toEqual([0, 0, 0]);
  });

  it("R075-UNIT-DEDUPE: a pool named twice is taken once, and a lease names the pools it holds once each, in HOST_ADMISSION_POOLS order", async () => {
    const budget = budgetOf({ sdkQueries: 1, queueDeadlineMs: 200 });
    const twice = await budget.acquire(["sdk-queries", "sdk-queries"]).then(lease => {
      const held = { pools: [...lease.pools], inFlight: budget.snapshot().pools["sdk-queries"].inFlight };
      lease.release();
      return held;
    }, codeOf);
    expect(twice).toEqual({ pools: ["sdk-queries"], inFlight: 1 });
    const mixed = await budget.acquire(["forge-operations", "child-processes", "sdk-queries", "child-processes"]);
    expect(mixed.pools).toEqual(["sdk-queries", "child-processes", "forge-operations"]);
    mixed.release();
    const pools = budget.snapshot().pools;
    expect(HOST_ADMISSION_POOLS.map(pool => [pools[pool].inFlight, pools[pool].admitted])).toEqual([[0, 2], [0, 1], [0, 1]]);
  });

  it("R075-UNIT-WAITING: waiting() lists every request waiting now, on every pool, under the pool it waits on, with that pool's limit and load and the line ahead of it, in counts and pool names only, and its monotonic wait grows while the wall clock stands still", async () => {
    const budget = budgetOf({ sdkQueries: 1, childProcesses: 1, forgeOperations: 1 });
    const held = await budget.acquire([...HOST_ADMISSION_POOLS]);
    const queued = [
      budget.acquire(["sdk-queries"]),
      budget.acquire(["sdk-queries"]),
      budget.acquire(["sdk-queries"]),
      budget.acquire(["forge-operations"]),
      budget.acquire(["child-processes"]),
    ];
    const [early, later] = await withFrozenWallClock(async () => {
      await sleep(60);
      const first = budget.waiting();
      await sleep(30);
      return [first, budget.waiting()] as const;
    });
    expect(early.map(wait => [wait.pool, wait.limit, wait.inFlight, wait.ahead])).toEqual([
      ["sdk-queries", 1, 1, 0],
      ["sdk-queries", 1, 1, 1],
      ["sdk-queries", 1, 1, 2],
      ["child-processes", 1, 1, 0],
      ["forge-operations", 1, 1, 0],
    ]);
    expect(early.map(wait => Object.keys(wait).sort().join(","))).toEqual(Array(5).fill("ahead,inFlight,limit,pool,waitedMs"));
    expect(early.map(wait => wait.waitedMs >= 50 && wait.waitedMs < 10_000)).toEqual([true, true, true, true, true]);
    expect(later.map((wait, at) => wait.waitedMs > (early[at]?.waitedMs ?? Number.POSITIVE_INFINITY))).toEqual([true, true, true, true, true]);
    held.release();
    for (const pending of queued) (await pending).release();
    // A request admitted to its first pool and waiting on its second is listed under the second only.
    const child = await budget.acquire(["child-processes"]);
    const twoPools = budget.acquire(["sdk-queries", "child-processes"]);
    expect(await until(() => budget.waiting().length === 1)).toBe(true);
    expect(budget.waiting().map(wait => [wait.pool, wait.ahead])).toEqual([["child-processes", 0]]);
    child.release();
    (await twoPools).release();
    expect(inFlightOf(budget)).toEqual([0, 0, 0]);
  });

  it("R075-UNIT-LEASE-WAIT: a lease carries the monotonic milliseconds from its request to its admission, across every pool it waited on, while the wall clock stands still", async () => {
    const budget = budgetOf({ sdkQueries: 1, childProcesses: 1 });
    const { immediate, queued } = await withFrozenWallClock(async () => {
      const now = await budget.acquire(["forge-operations"]);
      const sdk = await budget.acquire(["sdk-queries"]);
      const child = await budget.acquire(["child-processes"]);
      const pending = budget.acquire(["sdk-queries", "child-processes"]);
      await sleep(60);
      sdk.release();
      await sleep(60);
      child.release();
      return { immediate: now, queued: await pending };
    });
    expect(immediate.waitedMs).toBeGreaterThanOrEqual(0);
    expect(immediate.waitedMs).toBeLessThan(50);
    expect(queued.waitedMs).toBeGreaterThanOrEqual(110);
    expect(queued.waitedMs).toBeLessThan(10_000);
    immediate.release();
    queued.release();
    expect(inFlightOf(budget)).toEqual([0, 0, 0]);
  });

  it("R075-UNIT-THROWING-REPORT: a report that throws strands nothing: its request stays in line, is admitted when a slot frees or refused at the queue deadline, and leaves the line either way", async () => {
    const budget = budgetOf({ sdkQueries: 1, queueDeadlineMs: 150 });
    const throwing = {
      onQueued: (): void => {
        throw new Error("report failed");
      },
    };
    const held = await budget.acquire(["sdk-queries"]);
    const admitted = budget.acquire(["sdk-queries"], throwing).then(admittedThenReleased, codeOf);
    await sleep(20);
    expect(budget.snapshot().pools["sdk-queries"].queued).toBe(1);
    held.release();
    expect(await admitted).toBe("admitted");
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 0, queued: 0, refused: 0 });
    const blocker = await budget.acquire(["sdk-queries"]);
    expect(await budget.acquire(["sdk-queries"], throwing).then(admittedThenReleased, codeOf)).toBe("admission-deadline");
    expect(budget.waiting()).toEqual([]);
    blocker.release();
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 0, queued: 0, refused: 1 });
  });

  it("R075-THROWING-WAIT-REPORT: an onAdmissionWait that throws strands no dispatch: the queued agent starts once the slot frees and both runs complete", async () => {
    const budget = budgetOf({ sdkQueries: 1 });
    const { host, meter, open } = meteredHost();
    const first = start('return await agent("A-0");', { host, hostAdmission: budget });
    expect(await until(() => meter.spawned.length === 1)).toBe(true);
    let told = 0;
    const second = start('return await agent("B-0");', {
      host,
      hostAdmission: budget,
      onAdmissionWait: () => {
        told++;
        throw new Error("report failed");
      },
    });
    expect(await until(() => told === 1)).toBe(true);
    open();
    expect([(await first).status, (await second).status]).toEqual(["completed", "completed"]);
    expect(meter.spawned).toEqual(["A-0", "B-0"]);
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 0, queued: 0, admitted: 2 });
  }, RUNS_TIMEOUT_MS);

  it("R075-UNIT-REPORT-PER-POOL: onQueued is told once per pool a request has to queue on, at the moment it queues there, and never for a pool that admits it at once", async () => {
    const budget = budgetOf({ sdkQueries: 1, childProcesses: 1 });
    const reports: HostAdmissionWait[] = [];
    const onQueued = (wait: HostAdmissionWait): void => {
      reports.push(wait);
    };
    const immediate = await budget.acquire(["forge-operations"], { onQueued });
    expect(reports).toEqual([]);
    const sdk = await budget.acquire(["sdk-queries"]);
    const child = await budget.acquire(["child-processes"]);
    const pending = budget.acquire(["sdk-queries", "child-processes"], { onQueued });
    // Told at the call, as it queues on its first pool, and not yet for its second.
    expect(reports.map(wait => wait.pool)).toEqual(["sdk-queries"]);
    sdk.release();
    expect(await until(() => reports.length === 2, 2_000)).toBe(true);
    expect(reports).toEqual([
      { pool: "sdk-queries", limit: 1, inFlight: 1, ahead: 0, waitedMs: 0 },
      { pool: "child-processes", limit: 1, inFlight: 1, ahead: 0, waitedMs: 0 },
    ]);
    expect(budget.snapshot().pools["child-processes"].queued).toBe(1);
    child.release();
    const lease = await pending;
    expect(reports).toHaveLength(2);
    lease.release();
    immediate.release();
    expect(inFlightOf(budget)).toEqual([0, 0, 0]);
  });

  it("R075-WAIT-POSITION: a queued agent's and a queued node's wait reports carry the position their progress rows carry", async () => {
    const { host, meter, open } = meteredHost();
    const agentReports: WorkflowAdmissionWait[] = [];
    const agentProgress: WorkflowEntry[] = [];
    const agents = start('return await parallel([() => agent("p-0", { label: "p-0" }), () => agent("p-1", { label: "p-1" })]);', {
      host,
      hostAdmission: budgetOf({ sdkQueries: 1 }),
      concurrency: WIDE,
      onAdmissionWait: wait => {
        agentReports.push(wait);
      },
    }, agentProgress);
    expect(await until(() => agentReports.length === 1)).toBe(true);
    expect(meter.spawned).toHaveLength(1);
    const queuedAgent = agentRows(agentProgress).find(row => !meter.spawned.includes(row.label));
    expect(queuedAgent?.index).toBe(1);
    expect(agentReports.map(wait => [wait.kind, wait.index])).toEqual([["agent", queuedAgent?.index]]);
    const nodeReports: WorkflowAdmissionWait[] = [];
    const nodeProgress: WorkflowEntry[] = [];
    const nodes = start('return await parallel([() => node("forge.gate.status", {}, { label: "n-0" }), () => node("forge.gate.status", {}, { label: "n-1" })]);', {
      host,
      hostAdmission: budgetOf({ forgeOperations: 1 }),
      onAdmissionWait: wait => {
        nodeReports.push(wait);
      },
    }, nodeProgress);
    expect(await until(() => nodeReports.length === 1)).toBe(true);
    expect(meter.nodes).toHaveLength(1);
    const queuedNode = nodeRows(nodeProgress).find(row => !meter.nodes.includes(row.label));
    expect(queuedNode?.index).toBe(1);
    expect(nodeReports.map(wait => [wait.kind, wait.index])).toEqual([["node", queuedNode?.index]]);
    open();
    expect([(await agents).status, (await nodes).status]).toEqual(["completed", "completed"]);
  }, RUNS_TIMEOUT_MS);

  it("R075-REFUSED-ON-RECORD: an agent refused at the queue deadline goes on record as an attempt that did not settle, and a resume of that journal runs it live", async () => {
    const budget = budgetOf({ sdkQueries: 1, queueDeadlineMs: 80 });
    const held = await budget.acquire(["sdk-queries"]);
    const { host, meter, open } = meteredHost();
    open();
    const refusedRun = recorder();
    const refused = await start('return await agent("B-0");', { host, hostAdmission: budget, journal: refusedRun });
    held.release();
    expect(refused.status).toBe("failed");
    expect(refusedRun.entries.map(entry => [entry.kind, entry.index, entry.ok, entry.text])).toEqual([[undefined, 0, false, undefined]]);
    const resumed = await start('return await agent("B-0");', { host, hostAdmission: budget, journal: { entries: refusedRun.entries } });
    expect([resumed.status, resumed.value, resumed.replayedCount]).toEqual(["completed", "B-0", 0]);
    expect(meter.spawned).toEqual(["B-0"]);
  }, RUNS_TIMEOUT_MS);

  it("R075-NODE-REFUSED-RECORD: a node refused at the queue deadline leaves an error row and puts nothing on record, no dispatched marker included, and a refused override re-run carries the original effect row forward, so a resume still stops at the position", async () => {
    const budget = budgetOf({ forgeOperations: 1, queueDeadlineMs: 80 });
    const held = await budget.acquire(["forge-operations"]);
    const fresh = effectHost();
    const freshJournal = recorder();
    const progress: WorkflowEntry[] = [];
    const refused = await start('return await node("forge.gate.status", {}, { label: "B-forge" });', { host: fresh.host, hostAdmission: budget, journal: freshJournal }, progress);
    held.release();
    expect([refused.status, refused.capabilityError?.category, fresh.nodeCalls.length]).toEqual(["failed", "unavailable", 0]);
    expect(freshJournal.entries).toEqual([]);
    const last = nodeRows(progress).at(-1);
    expect(last?.state).toBe("error");
    expect(last?.error).toContain("Host admission refused");

    const script = 'const v = await node("furnace.run.start", { value: "x" });\nawait agent("after");\nreturn v;';
    const settled = recorder();
    expect((await start(script, { host: effectHost().host, journal: settled })).status).toBe("completed");
    const recorded = consultedNodes(settled.entries)[0];
    if (recorded === undefined) throw new Error("the first run journaled no node row");
    const decided = [...settled.entries, acknowledgeRowFor(recorded), overrideRowFor(recorded)];
    const overrideBudget = budgetOf({ childProcesses: 1, queueDeadlineMs: 60 });
    const holder = await overrideBudget.acquire(["child-processes"]);
    const rerunHost = effectHost();
    const rerun = recorder();
    const overridden = await start(script, { host: rerunHost.host, hostAdmission: overrideBudget, journal: { entries: decided, append: rerun.append } });
    holder.release();
    expect([overridden.status, overridden.capabilityError?.category, rerunHost.nodeCalls.length]).toEqual(["failed", "unavailable", 0]);
    // Nothing ran, so the position keeps exactly the record it had and no decision row is spent.
    expect(rerun.entries).toEqual([recorded]);
    const resumeHost = effectHost();
    const again = await start(script, { host: resumeHost.host, journal: { entries: rerun.entries } });
    expect([again.capabilityError?.category, resumeHost.nodeCalls.length]).toEqual(["uncertain-effect", 0]);
  }, RUNS_TIMEOUT_MS);

  it("R075-NESTED-DEADLINE: an agent whose host starts a run of its own on the same budget while the agent holds the slot sees that run wait for the slot until the queue deadline refuses it", async () => {
    const deadline = 150;
    const budget = budgetOf({ sdkQueries: 1, queueDeadlineMs: deadline });
    const childHost: WorkflowHost = {
      async spawnAgent(request) {
        return { ok: true, text: request.prompt };
      },
      abortAgent() {},
      async callNode() {
        return { ok: true };
      },
    };
    const nestedReports: WorkflowAdmissionWait[] = [];
    const nested: { result?: WorkflowRunResult; waited?: number } = {};
    const parentHost: WorkflowHost = {
      async spawnAgent(request) {
        const began = performance.now();
        const result = await runWorkflow({
          script: `${HEAD}return await agent("child-0");`,
          host: childHost,
          hostAdmission: budget,
          onAdmissionWait: wait => {
            nestedReports.push(wait);
          },
        });
        nested.result = result;
        nested.waited = since(began);
        return { ok: true, text: `${request.prompt}:${result.status}` };
      },
      abortAgent() {},
      async callNode() {
        return { ok: true };
      },
    };
    const parent = await start('return await agent("parent-0");', { host: parentHost, hostAdmission: budget });
    expect([parent.status, parent.value]).toEqual(["completed", "parent-0:failed"]);
    expect(nested.result?.error).toContain("Host admission refused");
    expect(nestedReports).toEqual([{ kind: "agent", index: 0, pool: "sdk-queries", limit: 1, inFlight: 1, ahead: 0, waitedMs: 0 }]);
    expect(nested.waited).toBeGreaterThanOrEqual(deadline - 20);
    expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 0, queued: 0, admitted: 1, refused: 1 });
  }, RUNS_TIMEOUT_MS);
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

  it("R076-NODE-HANDOFF-ABORT: a forge.* node whose slot arrives in the same tick its run is aborted is never dispatched and hands both of its pools back", async () => {
    const budget = budgetOf({ forgeOperations: 1 });
    const held = await budget.acquire(["child-processes", "forge-operations"]);
    const { host, meter } = meteredHost();
    const controller = new AbortController();
    const reports: WorkflowAdmissionWait[] = [];
    const run = start('return await node("forge.gate.status", {}, { label: "B-forge" });', {
      host,
      hostAdmission: budget,
      signal: controller.signal,
      onAdmissionWait: wait => {
        reports.push(wait);
      },
    });
    expect(await until(() => reports.length === 1)).toBe(true);
    expect(reports[0]).toMatchObject({ kind: "node", index: 0, pool: "forge-operations" });
    held.release();
    controller.abort();
    expect((await run).status).toBe("killed");
    await sleep(20);
    expect(meter.nodes).toEqual([]);
    const pools = budget.snapshot().pools;
    // The slot did reach the node (admitted 2, none cancelled in line), and went straight back with its host child.
    expect([pools["forge-operations"].inFlight, pools["child-processes"].inFlight, pools["forge-operations"].admitted, pools["forge-operations"].cancelledWhileQueued]).toEqual([0, 0, 2, 0]);
  }, RUNS_TIMEOUT_MS);

  it.each([
    ["abort", "its run is aborted", "hands its host slots back"],
    ["skip", "it is skipped", "hands its host slots and the run's own permit back, so the run's next agent starts"],
  ] as const)("R076-AGENT-HANDOFF-%s: at concurrency 1, an agent whose host slot arrives in the same tick %s is never dispatched and %s", async (ending, _when, _returned) => {
    const budget = budgetOf({ childProcesses: 1 });
    const held = await budget.acquire(["child-processes"]);
    const { host, meter, open } = meteredHost();
    const controller = new AbortController();
    // The run's WorkflowControl skip, held as a reference: the operator's skip, not a test-framework marker.
    let skipAgent: WorkflowControl["skip"] | undefined;
    const reports: WorkflowAdmissionWait[] = [];
    const run = start('const a = await agent("H-0");\nconst b = await agent("H-1");\nreturn { a, b };', {
      host,
      hostAdmission: budget,
      concurrency: 1,
      signal: controller.signal,
      onControl: given => {
        skipAgent = given.skip;
      },
      onAdmissionWait: wait => {
        reports.push(wait);
      },
    });
    try {
      expect(await until(() => reports.length === 1)).toBe(true);
      // Admitted at once to sdk-queries, its first pool, H-0 waits on host children, its second.
      expect(reports).toEqual([{ kind: "agent", index: 0, pool: "child-processes", limit: 1, inFlight: 1, ahead: 0, waitedMs: 0 }]);
      held.release();
      if (ending === "abort") controller.abort();
      else expect(skipAgent?.(0)).toBe(true);
      if (ending === "skip") {
        // The run's own permit came back with the slots: H-1 starts at concurrency 1.
        expect(await until(() => meter.spawned.length === 1, 3_000)).toBe(true);
        open();
      }
      const result = await run;
      expect(ending === "abort" ? [result.status] : [result.status, result.value]).toEqual(ending === "abort" ? ["killed"] : ["completed", { a: null, b: "H-1" }]);
      await sleep(20);
      expect(meter.spawned).toEqual(ending === "abort" ? [] : ["H-1"]);
      const pools = budget.snapshot().pools;
      expect(HOST_ADMISSION_POOLS.map(pool => pools[pool].inFlight)).toEqual([0, 0, 0]);
      // The slot did reach H-0 (admitted, never cancelled in line) and went straight back.
      expect([pools["child-processes"].admitted, pools["child-processes"].cancelledWhileQueued]).toEqual([ending === "abort" ? 2 : 3, 0]);
    } finally {
      controller.abort();
      open();
    }
  }, RUNS_TIMEOUT_MS);

  it("R076-PAUSE-RUN-PERMIT: at concurrency 1, an agent paused while queued on the host hands its host slots and the run's own permit back when the slots arrive, and takes both again and starts on resume", async () => {
    const budget = budgetOf({ childProcesses: 1 });
    const held = await budget.acquire(["child-processes"]);
    const { host, meter, open } = meteredHost();
    const controller = new AbortController();
    let control: WorkflowControl | undefined;
    const reports: WorkflowAdmissionWait[] = [];
    const run = start('const a = await agent("P-0");\nconst b = await agent("P-1");\nreturn { a, b };', {
      host,
      hostAdmission: budget,
      concurrency: 1,
      signal: controller.signal,
      onControl: given => {
        control = given;
      },
      onAdmissionWait: wait => {
        reports.push(wait);
      },
    });
    try {
      expect(await until(() => reports.length === 1)).toBe(true);
      control?.pause();
      held.release();
      await sleep(50);
      // The slots arrived while P-0 was paused: handed straight back, and nothing was dispatched.
      expect(meter.spawned).toEqual([]);
      expect(inFlightOf(budget)).toEqual([0, 0, 0]);
      control?.resume();
      // At concurrency 1, P-0 starts only if the run's own permit came back with the slots.
      expect(await until(() => meter.spawned.length === 1, 3_000)).toBe(true);
      open();
      const result = await run;
      expect([result.status, result.value]).toEqual(["completed", { a: "P-0", b: "P-1" }]);
      expect(meter.spawned).toEqual(["P-0", "P-1"]);
      expect(inFlightOf(budget)).toEqual([0, 0, 0]);
    } finally {
      controller.abort();
      open();
    }
  }, RUNS_TIMEOUT_MS);

  it("R076-SKIP-RUN-PERMIT: at concurrency 1, an agent skipped while queued on the host hands the run's own permit back, so the run's next agent reaches the host line while the slot is still held", async () => {
    const budget = budgetOf({ sdkQueries: 1 });
    const { host, meter, open } = meteredHost();
    const first = start('return await agent("A-0");', { host, hostAdmission: budget });
    expect(await until(() => meter.spawned.length === 1)).toBe(true);
    const controller = new AbortController();
    let skipAgent: WorkflowControl["skip"] | undefined;
    const reports: WorkflowAdmissionWait[] = [];
    const second = start('const a = await agent("B-0");\nconst b = await agent("B-1");\nreturn { a, b };', {
      host,
      hostAdmission: budget,
      concurrency: 1,
      signal: controller.signal,
      onControl: given => {
        skipAgent = given.skip;
      },
      onAdmissionWait: wait => {
        reports.push(wait);
      },
    });
    try {
      expect(await until(() => reports.length === 1)).toBe(true);
      expect(skipAgent?.(0)).toBe(true);
      // A-0 still holds the slot, so B-1 can be in the host line only if B-0's skip gave the run's permit back.
      expect(await until(() => reports.length === 2, 3_000)).toBe(true);
      expect(reports.map(wait => [wait.kind, wait.index, wait.pool])).toEqual([["agent", 0, "sdk-queries"], ["agent", 1, "sdk-queries"]]);
      open();
      expect((await first).status).toBe("completed");
      const skipped = await second;
      expect([skipped.status, skipped.value]).toEqual(["completed", { a: null, b: "B-1" }]);
      expect(meter.spawned).toEqual(["A-0", "B-1"]);
      expect(budget.snapshot().pools["sdk-queries"]).toMatchObject({ inFlight: 0, queued: 0, cancelledWhileQueued: 1 });
    } finally {
      controller.abort();
      open();
    }
  }, RUNS_TIMEOUT_MS);

  it("R076-RUN-END-EVERY-WAIT: a run that fails while two agents and a node of it are queued on the host takes every one of those waits out of the line by the time it settles, hands back what each had taken, and dispatches none of them", async () => {
    const budget = budgetOf({ sdkQueries: 1, forgeOperations: 1 });
    const sdk = await budget.acquire(["sdk-queries"]);
    const forge = await budget.acquire(["forge-operations"]);
    const { host, meter, open } = meteredHost();
    const reports: WorkflowAdmissionWait[] = [];
    const run = start(
      [
        'const queued = [agent("E-0"), agent("E-1"), node("forge.gate.status", {}, { label: "E-forge" })];',
        "for (const call of queued) call.catch(() => null);",
        'await node("hyperunix.find", {}, { label: "E-gate" });',
        'throw new Error("the script ends while its calls are queued");',
      ].join("\n"),
      {
        host,
        hostAdmission: budget,
        concurrency: WIDE,
        onAdmissionWait: wait => {
          reports.push(wait);
        },
      },
    );
    expect(await until(() => reports.length === 3 && meter.nodes.includes("E-gate"))).toBe(true);
    // E-gate runs on a host child, and E-forge holds one while it waits for the Forge slot.
    expect(budget.snapshot().pools["child-processes"].inFlight).toBe(2);
    open();
    const result = await run;
    // Gone from the line by the time the run has settled, before either holder releases.
    expect(budget.waiting()).toEqual([]);
    expect(result.status).toBe("failed");
    expect(result.error).toContain("the script ends while its calls are queued");
    expect([meter.spawned, meter.nodes]).toEqual([[], ["E-gate"]]);
    const pools = budget.snapshot().pools;
    expect(pools["sdk-queries"]).toMatchObject({ inFlight: 1, queued: 0, admitted: 1, cancelledWhileQueued: 2 });
    expect(pools["forge-operations"]).toMatchObject({ inFlight: 1, queued: 0, admitted: 1, cancelledWhileQueued: 1 });
    expect(pools["child-processes"]).toMatchObject({ inFlight: 0, queued: 0 });
    sdk.release();
    forge.release();
    const after = budget.snapshot().pools;
    expect([after["sdk-queries"].admitted, after["forge-operations"].admitted, ...inFlightOf(budget)]).toEqual([1, 1, 0, 0, 0]);
  }, RUNS_TIMEOUT_MS);

  it("R076-UNIT-MIXED-UNKNOWN: a request naming known pools beside an unknown one is refused, typed, before taking any of them", async () => {
    const budget = budgetOf({});
    const mixed: readonly string[] = ["sdk-queries", "gpu-minutes", "child-processes"];
    const refusal = await budget.acquire(mixed as readonly HostAdmissionPool[]).then(() => undefined, (error: unknown) => error);
    expect(refusal instanceof HostAdmissionError ? refusal.code : refusal).toBe("unknown-pool");
    const pools = budget.snapshot().pools;
    expect(HOST_ADMISSION_POOLS.map(pool => [pools[pool].admitted, pools[pool].inFlight, pools[pool].queued])).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  });
});
