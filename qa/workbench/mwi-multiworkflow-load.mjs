/**
 * wb-r5q2 [MWI-telemetry] (slice PI-7): the named load journey of EAT-R079, its fixture leg. EAT-R079 of the
 * mechanical-workflows-interop-2026-11-04 program's triage/requirements/ATOMIC-REQUIREMENTS.md at pi-subagents master
 * 0b25e14e084a5b1d612e780bc12a927b3a80dd62 reads: "Pi MUST measure host load using simultaneous real invocations." Acceptance:
 * "Named load journey records peak concurrent queries/processes/Forge ops, queue wait, memory, bytes and dropped events with
 * exact versions/ref; includes floods and queued cancels plus baseline script comparison." Mutant: "Replace measured
 * multi-workflow counters with one-workflow semaphore limits."
 *
 * The invocations are real `runWorkflow` runs (each its own worker thread and script realm) sharing one HostAdmission; the
 * host they dispatch to is a fixture that counts what it is handed. That is the fixture leg only: the PI-MULTIWORKFLOW-LOAD
 * gate's producer leg (real Claude SDK queries, real host child processes, real native Forge operations) is not run here, so a
 * "query", a "process" and a "Forge operation" below are what the fixture host counts as such, exactly as
 * test/workbench-mechanical-host-admission.test.ts counts them (src/workflow/admission.ts dispatchPools).
 *
 * The runtime is an argument: test/workbench-mechanical-telemetry.test.ts hands in the TypeScript sources, and
 * qa/workbench/mwi-multiworkflow-load-bench.mjs hands in the compiled build (run `npm run build` first):
 *
 *   node qa/workbench/mwi-multiworkflow-load-bench.mjs [--samples N]
 *
 * What the record's fields hold is what that test pins (case ids R079-*); a reading it does not pin is NOT CLAIMED.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

export const JOURNEY = "PI-MULTIWORKFLOW-LOAD fixture leg";
/**
 * The shared budget every run of a phase dispatches under (one HostAdmission per phase). childProcesses is 5 so the two SDK
 * queries and the LOAD_RUNS nodes (each holding its child slot while it waits for the one Forge slot) all fit: a smaller
 * value could leave every child slot held by nodes queued on Forge, so no agent could be dispatched while the valve is shut.
 */
export const LIMITS = Object.freeze({ sdkQueries: 2, childProcesses: 5, forgeOperations: 1, queueDeadlineMs: 30_000 });
/** Each run's own agent limit (RunWorkflowOptions.concurrency): the one-workflow semaphore limit. */
export const RUN_CONCURRENCY = 1;
/** Simultaneous runs in the load phase; the baseline phase runs the same script alone. */
export const LOAD_RUNS = 3;
/** Log rows each run emits before it dispatches: the progress flood. */
export const FLOOD_ROWS = 200;
/** Each run's retained-progress bound (RunWorkflowOptions.telemetry.progressBytes). */
export const PROGRESS_BYTES = 4096;

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * The script every run executes: FLOOD_ROWS log rows, then two agents and one forge.gate.status node in parallel.
 * @param {string} tag letters and digits only
 * @returns {string}
 */
export function journeyScript(tag) {
  if (!/^[a-z0-9]+$/.test(tag)) throw new TypeError(`journey tag must be lower-case letters and digits, got ${tag}`);
  return [
    `export const meta = { name: "load-${tag}", description: "multi-workflow load journey" };`,
    `for (let i = 0; i < ${FLOOD_ROWS}; i++) log("${tag} flood " + i + " " + "x".repeat(40));`,
    `return await parallel([() => agent("${tag}-a"), () => agent("${tag}-b"), () => node("forge.gate.status", {}, { label: "${tag}-gate" })]);`,
  ].join("\n");
}

/**
 * Polls `predicate` on the monotonic clock; throws when it does not hold within `timeoutMs`.
 * @param {() => boolean} predicate
 * @param {string} what
 * @param {number} [timeoutMs]
 */
async function until(predicate, what, timeoutMs = 20_000) {
  const deadline = performance.now() + timeoutMs;
  while (!predicate()) {
    if (performance.now() > deadline) throw new Error(`load journey: ${what} did not happen within ${timeoutMs} ms`);
    await new Promise((done) => setTimeout(done, 5));
  }
}

/**
 * A fixture host that holds every dispatch until open(), then for holdMs more, counting it the whole time it is held: each
 * agent dispatch is one SDK query and one child process, each node dispatch one child process, and a forge. node also one
 * Forge operation.
 * @param {number} holdMs
 */
function meteredHost(holdMs) {
  const meter = { sdk: 0, peakSdk: 0, processes: 0, peakProcesses: 0, forge: 0, peakForge: 0, /** @type {string[]} */ dispatched: [] };
  let opened = false;
  /** @type {Set<() => void>} */
  const parked = new Set();
  const hold = async () => {
    if (!opened) await new Promise((done) => parked.add(() => done(undefined)));
    await new Promise((done) => setTimeout(done, holdMs));
  };
  const host = {
    /** @param {{ prompt: string }} request */
    async spawnAgent(request) {
      meter.dispatched.push(request.prompt);
      meter.sdk++;
      meter.processes++;
      meter.peakSdk = Math.max(meter.peakSdk, meter.sdk);
      meter.peakProcesses = Math.max(meter.peakProcesses, meter.processes);
      try {
        await hold();
        return { ok: true, text: `${request.prompt} done` };
      } finally {
        meter.sdk--;
        meter.processes--;
      }
    },
    abortAgent() {},
    /** @param {{ capabilityId: string, label: string }} request */
    async callNode(request) {
      const forge = request.capabilityId.startsWith("forge.");
      meter.dispatched.push(request.label);
      meter.processes++;
      if (forge) meter.forge++;
      meter.peakProcesses = Math.max(meter.peakProcesses, meter.processes);
      meter.peakForge = Math.max(meter.peakForge, meter.forge);
      try {
        await hold();
        return { contract: "forge.gate.status/v1", source: { status: "passed" } };
      } finally {
        meter.processes--;
        if (forge) meter.forge--;
      }
    },
    describeNodeEffect: () => "read",
  };
  const open = () => {
    opened = true;
    for (const release of parked) release();
    parked.clear();
  };
  return { host, meter, open };
}

/** The exact versions and source ref the journey ran at: node, the package, and the repository's HEAD commit. */
export function journeyVersions() {
  const pkg = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
  /** @type {string} */
  let ref = "unavailable";
  /** @type {boolean | "unavailable"} */
  let dirty = "unavailable";
  try {
    ref = execFileSync("git", ["rev-parse", "HEAD"], { cwd: REPO, encoding: "utf8" }).trim();
    dirty = execFileSync("git", ["status", "--porcelain"], { cwd: REPO, encoding: "utf8" }).trim() !== "";
  } catch {
    // Not a Git checkout: the ref stays "unavailable", never a guessed value.
  }
  return { node: process.version, package: `${pkg.name}@${pkg.version}`, ref, dirty };
}

/**
 * @param {readonly number[]} values
 */
function waitSummary(values) {
  return { leases: values.length, maxMs: values.length === 0 ? 0 : Math.max(...values), totalMs: values.reduce((sum, value) => sum + value, 0) };
}

/**
 * One phase: `runs` simultaneous runs of journeyScript sharing one HostAdmission over LIMITS, the fixture host's valve held
 * until the shared SDK pool is full; with `cancel`, one more run is aborted while its first agent is queued on the budget
 * before the valve opens.
 * @param {{ runWorkflow: Function, HostAdmission: new (limits: typeof LIMITS) => any }} impl
 * @param {{ runs: number, holdMs: number, cancel: boolean }} plan
 */
async function measurePhase(impl, plan) {
  const budget = new impl.HostAdmission(LIMITS);
  const { host, meter, open } = meteredHost(plan.holdMs);
  /** @type {Array<{ stage: string, durationMs: number, bytes: number }>} */
  const stages = [];
  /** Every admission-wait report of the phase, the cancelled run's included. */
  let queuedReports = 0;
  const telemetry = { progressBytes: PROGRESS_BYTES, onStage: (/** @type {any} */ record) => { stages.push(record); } };
  const memoryBefore = process.memoryUsage();
  const startedAt = performance.now();
  const runs = [];
  for (let i = 0; i < plan.runs; i++) {
    runs.push(impl.runWorkflow({ script: journeyScript(`r${i}`), host, hostAdmission: budget, concurrency: RUN_CONCURRENCY, telemetry, onAdmissionWait: () => { queuedReports++; } }));
  }
  await until(() => meter.sdk === Math.min(LIMITS.sdkQueries, plan.runs * RUN_CONCURRENCY), "saturating the shared SDK pool");
  /** @type {undefined | { status: string, queuedReports: number, dispatched: number }} */
  let cancel;
  if (plan.cancel) {
    const controller = new AbortController();
    let cancelReports = 0;
    let agentQueued = false;
    const cancelRun = impl.runWorkflow({
      script: journeyScript("cancel"), host, hostAdmission: budget, concurrency: RUN_CONCURRENCY, signal: controller.signal, telemetry,
      onAdmissionWait: (/** @type {any} */ wait) => {
        queuedReports++;
        cancelReports++;
        if (wait.kind === "agent") agentQueued = true;
      },
    });
    await until(() => agentQueued, "queueing the cancelled run's agent");
    controller.abort();
    const settled = await cancelRun;
    cancel = { status: settled.status, queuedReports: cancelReports, dispatched: meter.dispatched.filter((name) => name.startsWith("cancel-")).length };
  }
  open();
  const results = await Promise.all(runs);
  const wallMs = performance.now() - startedAt;
  const memoryAfter = process.memoryUsage();
  const snapshot = budget.snapshot();
  const counts = results.map((result) => result.telemetry?.progress);
  const sum = (/** @type {string} */ key) => counts.reduce((total, count) => total + (count?.[key] ?? 0), 0);
  const pools = /** @type {Record<string, any>} */ (snapshot.pools);
  return {
    runs: plan.runs,
    statuses: results.map((result) => result.status),
    peaks: { sdkQueries: meter.peakSdk, childProcesses: meter.peakProcesses, forgeOperations: meter.peakForge },
    admissionPeaks: { sdkQueries: pools["sdk-queries"].peakInFlight, childProcesses: pools["child-processes"].peakInFlight, forgeOperations: pools["forge-operations"].peakInFlight },
    queueWait: { ...waitSummary(stages.filter((record) => record.stage === "admission").map((record) => record.durationMs)), queuedReports },
    progress: {
      offeredEvents: sum("offeredEvents"),
      heldEvents: sum("heldEvents"),
      droppedEvents: sum("droppedEvents"),
      offeredBytes: sum("offeredBytes"),
      heldBytes: sum("heldBytes"),
      droppedBytes: sum("droppedBytes"),
      maxHeldBytes: Math.max(0, ...counts.map((count) => count?.heldBytes ?? 0)),
    },
    memory: { heapUsedBefore: memoryBefore.heapUsed, heapUsedAfter: memoryAfter.heapUsed, rssAfter: memoryAfter.rss },
    slotsAtRest: Object.values(pools).every((pool) => pool.inFlight === 0 && pool.queued === 0),
    cancelledWhileQueued: Object.values(pools).reduce((total, pool) => total + pool.cancelledWhileQueued, 0),
    ...(cancel !== undefined ? { cancel } : {}),
    wallMs,
  };
}

/**
 * The journey: a baseline phase (the script alone, one run) and a load phase (LOAD_RUNS simultaneous runs and one queued
 * cancel), each on its own budget over LIMITS and its own fixture host.
 * @param {{ runWorkflow: Function, HostAdmission: new (limits: typeof LIMITS) => any }} impl
 * @param {{ holdMs?: number }} [options]
 */
export async function runLoadJourney(impl, options = {}) {
  const holdMs = options.holdMs ?? 20;
  const versions = journeyVersions();
  const baseline = await measurePhase(impl, { runs: 1, holdMs, cancel: false });
  const load = await measurePhase(impl, { runs: LOAD_RUNS, holdMs, cancel: true });
  return {
    journey: JOURNEY,
    versions,
    limits: { ...LIMITS, runConcurrency: RUN_CONCURRENCY, progressBytes: PROGRESS_BYTES, floodRows: FLOOD_ROWS, holdMs },
    baseline,
    load,
    comparison: {
      oneWorkflowLimit: RUN_CONCURRENCY,
      sharedSdkLimit: LIMITS.sdkQueries,
      baselinePeakSdk: baseline.peaks.sdkQueries,
      loadPeakSdk: load.peaks.sdkQueries,
    },
  };
}
