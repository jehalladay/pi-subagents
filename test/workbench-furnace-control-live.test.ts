/**
 * wb-752.7 (VC-4/W16 residual): live external Furnace adverse cancellation journey receipt.
 *
 * A real Furnace Run is started externally by the tier launcher (qa/workbench/live-furnace-vc4-launch.mjs: a disposable
 * /tmp/pi-external-furnace-realbd.* workspace with its own bd store and the throwaway vc4-external formula, never this
 * repository and never the owner's store). The journey attaches by Run ID through the landed read-only path
 * (nativeFurnaceRunInspect), observes it through FurnaceObserver, and stops it through the workflow_control tool built by
 * its production constructor with a furnace executor that mirrors the host's leg in src/index.ts line for line, the one
 * difference being a counting wrapper around the production-constructed client and a tee of the adapter's typed execution.
 * Receipts stay phase-honest: requested, acknowledged and result are distinct, the acknowledged phase echoes Furnace's own
 * run_stop envelope and the result only its stopped record; the Run is read back independently and recorded, never inferred.
 *
 * STRICT-READING LIMIT (named, never papered over): the BOOTED extension cannot admit the fixture Run today. Its observer
 * scope is the Pi session's cwd (src/index.ts observerScope) while the Run node's scope is the fixture root, and its
 * furnace_observe tool refreshes projectionSnapshot only, never the Run->Attempt ownership topology, so decideControl would
 * deny cross-scope or no-confirmed-ownership. The journey therefore runs the registered tool's own constructor over a
 * harness-owned projection fed only from a real FurnaceObserver reading's native-confirmed topology, and the receipt records
 * the strict booted-tool reading as UNREALISED.
 *
 * Runs ONLY from its own forge command (vitest.furnace-control-live.config.ts); excluded from the default gate. An absent
 * furnace or bd is honest unavailability: every row fails naming it and the receipt says not realised; nothing skips. No
 * furnace environment probe, no capability probe, no start outside the launcher (and one harness-local sibling start, declared in the
 * receipt), and every Furnace client is bound to a fixture root.
 */
import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { accessSync, chmodSync, closeSync, constants, existsSync, openSync, readdirSync, readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { hostname, release } from "node:os";
import { delimiter, join, relative } from "node:path";
import { type AttemptDto, Furnace, type RunStatusDto } from "@furnace/sdk";
import { afterAll, describe, expect, it } from "vitest";
import { type ControlExecutionSummary, type ControlExecutor, createWorkflowControlTool, type WorkflowControlDeps } from "../src/workbench/control-tool.js";
import { executeFurnaceControl, type FurnaceControlClient, type FurnaceControlExecution } from "../src/workbench/furnace-control.js";
import { FurnaceObserver, type FurnaceObserverClient, type FurnaceObserverLimits, type FurnaceReading } from "../src/workbench/furnace-observer.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { nativeFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import type { WorkflowTask } from "../src/workflow/task.js";
import {
  type Attach,
  BINARY_IDENTITY_SOURCE,
  buildReceipt,
  CONTRACT,
  type ControllerExit,
  capped,
  classifyArgv,
  FIXTURE_ROOT_PATTERN,
  type FixtureFacts,
  FORMULA,
  type FurnaceIdentity,
  fixtureRefusal,
  GRANT,
  type Journey,
  LAUNCHER,
  LAUNCHER_RECORD,
  type LauncherRecord,
  launcherRecordOf,
  type PhaseFields,
  progressOf,
  type Receipt,
  type ReceiptEvidence,
  RUN_ID_PATTERN,
  type RunSummary,
  SCENARIOS,
  type Sibling,
  TEXT_CAP,
  truthLabelOf,
  type UnrealisedStep,
  type VerbCounts,
} from "./helpers/furnace-control-live-receipt.js";
import { installScratchLeakGuard, makeScratch, removeScratch, trackScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const REPO = realpathSync(process.cwd());
const ORIGINAL_PATH = process.env.PATH ?? "";
/** Read before the scrub below removes every FURNACE_* variable from the environment the furnace children inherit. */
const RECEIPT_PATH = process.env.FURNACE_CONTROL_LIVE_RECEIPT;
const SCRUBBED = /^(?:BEADS|BD|FURNACE)_/;
for (const name of Object.keys(process.env)) if (SCRUBBED.test(name)) delete process.env[name];
const SESSION_ID = "s-7527";
const PRINCIPAL = `local-operator:${process.getuid?.() ?? 0}:${SESSION_ID}`;
const OWNING_INVOCATION = "wf_live7527000001";
const FORGE_COMMAND = "./node_modules/.bin/vitest run --config vitest.furnace-control-live.config.ts";
const MARKER = "FURNACE_CONTROL_LIVE_RECEIPT";
const CALL_TIMEOUT_MS = 10_000;
const LIMITS: FurnaceObserverLimits = { maxPolls: 2, intervalMs: 500, maxElapsedMs: 30_000, attemptLimit: 20, logBytes: 512, callTimeoutMs: CALL_TIMEOUT_MS };
const ENDED = new Set(["completed", "stopped", "failed", "needs_attention"]);
const SOURCES = [
  "test/workbench-furnace-control-live.test.ts", "test/helpers/furnace-control-live-receipt.ts", "vitest.furnace-control-live.config.ts", "vitest.config.ts", "forge.toml",
  "qa/workbench/live-furnace-vc4-launch.mjs", "src/index.ts", "src/workbench/control-tool.ts", "src/workbench/control.ts", "src/workbench/control-reply.ts",
  "src/workbench/furnace-control.ts", "src/workbench/furnace-observer.ts", "src/workbench/observation.ts", "src/workbench/providers/furnace.ts", "src/workbench/redaction.ts",
];
const nowIso = (): string => new Date().toISOString();
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
const sha256 = (bytes: Buffer | string): string => createHash("sha256").update(bytes).digest("hex");
const isDirectory = (path: string): boolean => { try { return statSync(path).isDirectory(); } catch { return false; } };
const isFile = (path: string): boolean => { try { return statSync(path).isFile(); } catch { return false; } };

/** The executable PATH names, found by looking, never by running anything (no furnace process before the attach). */
function executableOnPath(name: string, pathVariable: string): string | null {
  for (const directory of pathVariable.split(delimiter)) {
    if (!directory) continue;
    const candidate = join(directory, name);
    try {
      accessSync(candidate, constants.X_OK);
      if (isFile(candidate)) return realpathSync(candidate);
    } catch {
      // not here; keep looking
    }
  }
  return null;
}
const REAL_FURNACE = executableOnPath("furnace", ORIGINAL_PATH);
const REAL_BD = executableOnPath("bd", ORIGINAL_PATH);
const preflightFailure: string | null = REAL_FURNACE === null
  ? "furnace-control live tier requires an executable `furnace` on PATH: honest unavailability, not a skip"
  : REAL_BD === null ? "furnace-control live tier requires an executable `bd` on PATH: honest unavailability, not a skip" : null;

/** A furnace stand-in first on PATH: it appends its argv (tab-separated, after a marker) to the log, then becomes the real binary. */
const shimDir = makeScratch("fcl-shim-");
const ARGV_LOG = join(shimDir, "furnace-argv.log");
function installShim(directory: string, real: string, log: string): void {
  if ([directory, real, log].some(path => path.includes("'"))) throw new Error("a shim path holds a quote");
  const shim = join(directory, "furnace");
  writeFileSync(shim, `#!/bin/sh\nprintf 'argv' >> '${log}'\nprintf '\\t%s' "$@" >> '${log}'\nprintf '\\n' >> '${log}'\nexec '${real}' "$@"\n`);
  chmodSync(shim, 0o755);
  writeFileSync(log, "");
  process.env.PATH = `${directory}${delimiter}${ORIGINAL_PATH}`;
}
if (REAL_FURNACE !== null) installShim(shimDir, REAL_FURNACE, ARGV_LOG);
const argvRows = (): string[][] => {
  if (!existsSync(ARGV_LOG)) return [];
  return readFileSync(ARGV_LOG, "utf8").split("\n").filter(line => line.startsWith("argv")).map(line => line.split("\t").slice(1));
};

function git(args: readonly string[]): string | undefined {
  const run = spawnSync("git", ["-C", REPO, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  return run.status === 0 && typeof run.stdout === "string" ? run.stdout : undefined;
}
/** The qa/workbench/git-stamp.mjs rule: a stamp describes REPO only when it is the repository toplevel with a valid HEAD. */
function gitStamp(): { head: string | null; porcelain: string | null } {
  const top = git(["rev-parse", "--show-toplevel"]);
  let same = false;
  try { same = top !== undefined && realpathSync(top.trim()) === REPO; } catch { same = false; }
  if (!same) return { head: null, porcelain: null };
  const head = (git(["rev-parse", "HEAD"]) ?? "").trim();
  if (!/^[0-9a-f]{7,64}$/.test(head)) return { head: null, porcelain: null };
  return { head, porcelain: git(["status", "--porcelain"]) ?? null };
}
const STAMP = gitStamp();
const treeState = (): string => `${git(["status", "--porcelain"]) ?? "unreadable"}${git(["rev-parse", "HEAD"]) ?? "unreadable"}`;
const TREE_AT_START = treeState();
const versionOf = (pkg: string): string => {
  try { return String((JSON.parse(readFileSync(join(REPO, "node_modules", pkg, "package.json"), "utf8")) as { version?: unknown }).version ?? "unknown"); } catch { return "unknown"; }
};

const evidence: ReceiptEvidence = {
  utc: "",
  command: `forge run furnace-control-live (${FORGE_COMMAND})`,
  revision: STAMP.head ?? "unknown",
  dirty: STAMP.head === null || STAMP.porcelain === null ? null : STAMP.porcelain.trim().length > 0,
  sources: Object.fromEntries(SOURCES.map(path => { try { return [path, sha256(readFileSync(join(REPO, path)))]; } catch { return [path, "unreadable"]; } })),
  toolchain: { node: process.version, vitest: versionOf("vitest"), sdk: `@furnace/sdk@${versionOf("@furnace/sdk")}`, furnace: null },
  host: { platform: process.platform, arch: process.arch, release: release(), hostname: hostname(), pid: process.pid },
  grants: { permitted: [GRANT], denied: [] },
  journeys: [],
  scenarios: {},
  phases: [],
  nativeReferences: { runIds: [], attemptIds: [], beadsRunIds: [], furnaceRequestIds: [], controlRequestIds: [], nativeAckRefs: [], nativeResultRefs: [], ownershipConfirmationRefs: [] },
  verbCounts: { seam: { "runs.stop": 0, "runs.pause": 0, "runs.resume": 0, "attempts.stop": 0 }, reads: { "runs.status": 0, "attempts.list": 0, "logs.read": 0 }, processArgv: { rows: [], total: 0, verbs: [], controlCapable: [], readOnly: 0 } },
  replies: [],
  runRecords: [],
  unrealised: [],
};
evidence.scenarios[SCENARIOS.strictBooted] = {
  realised: false,
  detail: "UNREALISED: the booted extension's observer scope is the Pi session cwd and its furnace_observe tool never ingests the Run->Attempt ownership topology, so the booted registered tool cannot permit a fixture Run target; this journey ran the registered tool's constructor over a harness-owned projection fed only from a real FurnaceObserver reading.",
};
if (preflightFailure !== null) evidence.unrealised.push({ step: "furnace-unavailable", diagnostic: preflightFailure });

const noted = (list: string[], ...values: Array<string | undefined>): void => { for (const value of values) if (value !== undefined && value !== "" && !list.includes(value)) list.push(value); };
/** One phase of one journey: capped text for the eye, typed fields for the assessor, recorded together (wb-6hb.12). */
function record(scenario: string, fields: PhaseFields, text: string): void {
  evidence.phases.push({ scenario, phase: fields.phase, at: nowIso(), text: text.slice(0, TEXT_CAP), fields });
}
const scenario = (name: string, realised: boolean, detail: string): void => { evidence.scenarios[name] = { realised, detail }; };
function unrealised(step: UnrealisedStep, diagnostic: string): Error {
  evidence.unrealised.push({ step, diagnostic });
  return new Error(`${step}: ${diagnostic}`);
}

interface Counts { seam: VerbCounts["seam"]; reads: VerbCounts["reads"]; seamTargets: string[]; methods: string[] }
const freshCounts = (): Counts => ({ seam: { "runs.stop": 0, "runs.pause": 0, "runs.resume": 0, "attempts.stop": 0 }, reads: { "runs.status": 0, "attempts.list": 0, "logs.read": 0 }, seamTargets: [], methods: [] });
const seamTotal = (counts: Counts): number => counts.seam["runs.stop"] + counts.seam["runs.pause"] + counts.seam["runs.resume"] + counts.seam["attempts.stop"];
const countsByRoot = new Map<string, Counts>();
type CountedClient = FurnaceControlClient & FurnaceObserverClient;
/** The counting wrapper around a production-constructed client: the control seam and the observer reads, never a replacement. */
function counted(real: Furnace, counts: Counts): CountedClient {
  return {
    runs: {
      pause: (id, call) => { counts.seam["runs.pause"] += 1; counts.seamTargets.push(id); counts.methods.push("runs.pause"); return real.runs.pause(id, call); },
      stop: (id, call) => { counts.seam["runs.stop"] += 1; counts.seamTargets.push(id); counts.methods.push("runs.stop"); return real.runs.stop(id, call); },
      resume: (id, request, call) => { counts.seam["runs.resume"] += 1; counts.seamTargets.push(id); counts.methods.push("runs.resume"); return real.runs.resume(id, request, call); },
      get: id => ({ status: call => { counts.reads["runs.status"] += 1; counts.methods.push("runs.status"); return real.runs.get(id).status(call); } }),
    },
    attempts: {
      stop: (id, call) => { counts.seam["attempts.stop"] += 1; counts.seamTargets.push(id); counts.methods.push("attempts.stop"); return real.attempts.stop(id, call); },
      list: (id, request, call) => { counts.reads["attempts.list"] += 1; counts.methods.push("attempts.list"); return real.attempts.list(id, request, call); },
    },
    logs: { read: (id, request, call) => { counts.reads["logs.read"] += 1; counts.methods.push("logs.read"); return real.logs.read(id, request, call); } },
  };
}
function countedFor(workspace: string, real: Furnace): CountedClient {
  const counts = countsByRoot.get(workspace);
  if (counts === undefined) throw new Error(`no journey is bound to ${workspace}`);
  return counted(real, counts);
}

/** The adapter's typed executions, keyed by the core's request id: what the production reply (receipt + status) never carries. */
const executions = new Map<string, FurnaceControlExecution>();
const controlNow = (): string => new Date().toISOString();
/** The furnace leg of src/index.ts controlExecutors, mirrored line for line (text-pinned offline): counted client, teed execution. */
const furnaceExecutor: ControlExecutor = async (decision, request, signal): Promise<ControlExecutionSummary> => {
  const client = countedFor(request.scope.workspace, new Furnace({ binary: "furnace", cwd: request.scope.workspace, timeoutMs: 10_000 }));
  const execution = await executeFurnaceControl(decision, {
    client, workspaceRoot: request.scope.workspace, now: controlNow, timeoutMs: 10_000, ...(signal !== undefined ? { signal } : {}),
  });
  executions.set(execution.requested.requestId, execution);
  return { receipt: execution.receipt, status: execution.status };
};
/** The same leg with a 1 ms wait bound: the one verb is issued, its answer is not awaited to the end (row L6). */
const ambiguousExecutor: ControlExecutor = async (decision, request, signal): Promise<ControlExecutionSummary> => {
  const client = countedFor(request.scope.workspace, new Furnace({ binary: "furnace", cwd: request.scope.workspace, timeoutMs: 1 }));
  const execution = await executeFurnaceControl(decision, {
    client, workspaceRoot: request.scope.workspace, now: controlNow, timeoutMs: 1, ...(signal !== undefined ? { signal } : {}),
  });
  executions.set(execution.requested.requestId, execution);
  return { receipt: execution.receipt, status: execution.status };
};

interface Reply {
  ok: boolean;
  invoked: boolean;
  status: string;
  completion?: string;
  control?: {
    phase?: string;
    requested?: { requestId?: string; grant?: string; policy?: string; ownershipConfirmationRef?: string; decidedAt?: string; target?: NativeRef };
    acknowledged?: { acknowledgedAt?: string; nativeAckRef?: string };
    result?: { outcome?: string; nativeResultRef?: string; settledAt?: string };
  };
  error?: { code: string; category?: string; message: string };
}
interface Live {
  scenario: string;
  root: string;
  runId: string;
  attemptId: string;
  holdSeconds: number;
  launcher: LauncherRecord;
  controllerPid: number | null;
  real: Furnace;
  counts: Counts;
  client: CountedClient;
  projection: ObservationProjection;
  journey: Journey;
  sibling?: Sibling;
}
const scopeOf = (root: string): ObservationScope => ({ workspace: root, principal: PRINCIPAL });
const targetOf = (live: Live): NativeRef => ({ provider: "furnace", type: "run", id: live.runId, scope: live.root });
const stopParams = (live: Live, confirmed = true): Record<string, unknown> => ({ target: targetOf(live), action: "stop", ...(confirmed ? { confirmed: true } : {}) });

function fixtureFactsOf(root: string, runId: string): FixtureFacts {
  let realRoot: string | null = null;
  try { realRoot = realpathSync(root); } catch { realRoot = null; }
  const facts: FixtureFacts = { root, realRoot, runId, repoRoot: REPO, beadsStore: false, runRecord: false, launcher: null };
  if (realRoot === null || !FIXTURE_ROOT_PATTERN.test(realRoot) || !RUN_ID_PATTERN.test(runId)) return facts;
  facts.beadsStore = isDirectory(join(realRoot, ".beads", "embeddeddolt"));
  facts.runRecord = isFile(join(realRoot, ".furnace", "runs", runId, "run.json"));
  try { facts.launcher = launcherRecordOf(JSON.parse(readFileSync(join(realRoot, LAUNCHER_RECORD), "utf8"))); } catch { facts.launcher = null; }
  return facts;
}

/** The launcher starts exactly one Run in a fresh disposable workspace; PATH is handed back un-shimmed so its own verbs never enter the harness log. */
function launchFixture(name: string, holdSeconds: number): Live {
  if (preflightFailure !== null) throw new Error(preflightFailure);
  const run = spawnSync(process.execPath, [join(REPO, LAUNCHER)], {
    env: { ...process.env, PATH: ORIGINAL_PATH, VC4_HOLD_SECONDS: String(holdSeconds) }, encoding: "utf8", timeout: 150_000,
  });
  const line = run.stdout.trim().split("\n").filter(candidate => candidate.startsWith("{")).at(-1) ?? "";
  let printed: unknown;
  try { printed = JSON.parse(line); } catch { printed = undefined; }
  const launcher = launcherRecordOf(printed);
  if (run.status !== 0 || launcher === null) {
    const failed = printed !== null && typeof printed === "object" ? (printed as { error?: unknown; root?: unknown }) : {};
    const root = typeof failed.root === "string" ? failed.root : null;
    if (root !== null && FIXTURE_ROOT_PATTERN.test(root)) trackScratch(root);
    scenario(name, false, `launcher exit ${String(run.status)}: ${String(failed.error ?? run.stderr).slice(0, TEXT_CAP)} fields: none`);
    throw unrealised("launcher-failed", `${LAUNCHER} exit ${String(run.status)} for ${name}: ${String(failed.error ?? run.stderr.trim())}${root ? ` (workspace ${root} left in place, tracked for removal)` : ""}`);
  }
  trackScratch(launcher.root);
  const facts = fixtureFactsOf(launcher.root, launcher.runId);
  const refusal = fixtureRefusal(facts);
  const realRoot = facts.realRoot ?? launcher.root;
  const journey: Journey = {
    scenario: name,
    fixture: { ...facts, realRoot, pattern: FIXTURE_ROOT_PATTERN.source, formula: FORMULA, holdSeconds },
    scope: { workspace: realRoot, principal: PRINCIPAL, sessionId: SESSION_ID, owningInvocation: OWNING_INVOCATION },
    attach: null,
    cleanup: null,
  };
  evidence.journeys.push(journey);
  if (refusal !== null) {
    scenario(name, false, `fixture refused: ${refusal}`);
    throw unrealised("fixture-root-refused", `${name}: ${refusal}`);
  }
  const counts = freshCounts();
  countsByRoot.set(realRoot, counts);
  const real = new Furnace({ binary: "furnace", cwd: realRoot, timeoutMs: CALL_TIMEOUT_MS });
  noted(evidence.nativeReferences.runIds, launcher.runId);
  noted(evidence.nativeReferences.attemptIds, launcher.attemptId);
  return { scenario: name, root: realRoot, runId: launcher.runId, attemptId: launcher.attemptId, holdSeconds, launcher, controllerPid: launcher.controllerPid, real, counts, client: counted(real, counts), projection: new ObservationProjection(), journey };
}

interface InspectEnvelope {
  contract: string;
  workspaceRoot: string;
  version: FurnaceIdentity;
  source: { kind: string; requestId: string; exit: { code: number | null }; data: { run_id: string; beads_run_id: string; workspace: string; formula?: string; state: string; state_since: string; creating_request_id?: string } };
}
function envelopeOf(value: unknown): InspectEnvelope {
  const record = value as Partial<InspectEnvelope> | null;
  const version = record?.version as Partial<FurnaceIdentity> | undefined;
  const source = record?.source;
  const data = source?.data;
  if (record === null || typeof record !== "object" || typeof record.contract !== "string" || typeof record.workspaceRoot !== "string" || version === undefined || source === undefined || data === undefined) {
    throw new Error("the inspect envelope is not nativeFurnaceRunInspect's shape");
  }
  if (typeof version.furnace_version !== "string" || typeof version.protocol_version !== "number" || typeof version.supported_state_schema !== "number" || typeof version.binary_revision !== "string" || typeof version.beads_probe_dir !== "string") {
    throw new Error("the inspect envelope's version block is not a VersionDto");
  }
  if (typeof source.kind !== "string" || typeof source.requestId !== "string" || typeof data.run_id !== "string" || typeof data.workspace !== "string" || typeof data.state !== "string" || typeof data.state_since !== "string" || typeof data.beads_run_id !== "string") {
    throw new Error("the inspect envelope's Run record cannot be safely read");
  }
  return {
    contract: record.contract, workspaceRoot: record.workspaceRoot,
    version: {
      source: BINARY_IDENTITY_SOURCE, furnace_version: version.furnace_version, protocol_version: version.protocol_version, supported_state_schema: version.supported_state_schema,
      binary_revision: version.binary_revision, beads_probe_dir: version.beads_probe_dir,
      ...(typeof version.binary_path === "string" ? { binary_path: version.binary_path } : {}),
      ...(typeof version.binary_digest === "string" ? { binary_digest: version.binary_digest } : {}),
      ...(typeof version.beads_version === "string" ? { beads_version: version.beads_version } : {}),
    },
    source: { kind: source.kind, requestId: source.requestId, exit: { code: typeof source.exit?.code === "number" ? source.exit.code : null }, data: { ...data } },
  };
}

const refKey = (ref: NativeRef): string => `${ref.provider}:${ref.type}:${ref.id}`;
/** The binary identity fields of a version block; beads_probe_dir is the fixture root of that journey, so it differs per journey by design. */
const sameBinary = ({ beads_probe_dir: _probeDir, ...identity }: FurnaceIdentity): Omit<FurnaceIdentity, "beads_probe_dir"> => identity;
/** Attach by Run ID through the landed path, observe once through the counted client, and feed the harness projection from the native-confirmed topology. */
async function attach(live: Live): Promise<FurnaceReading> {
  let envelope: InspectEnvelope;
  try {
    envelope = envelopeOf(await nativeFurnaceRunInspect(live.root, live.runId));
  } catch (error) {
    scenario(live.scenario, false, `attach failed: ${error instanceof Error ? error.message : String(error)}`);
    throw unrealised("attach-failed", `${live.scenario}: ${error instanceof Error ? error.message : String(error)}`);
  }
  expect(envelope.contract).toBe("furnace.run.inspect/v1");
  expect(envelope.source.kind).toBe("run_inspect");
  expect(envelope.source.data.run_id).toBe(live.runId);
  expect(realpathSync(envelope.source.data.workspace)).toBe(live.root);
  expect(envelope.version.beads_probe_dir).toBe(live.root);
  if (evidence.toolchain.furnace === null) evidence.toolchain.furnace = envelope.version;
  else expect(sameBinary(envelope.version)).toEqual(sameBinary(evidence.toolchain.furnace));
  const observer = new FurnaceObserver(live.client, { workspaceRoot: live.root, runId: live.runId, scope: scopeOf(live.root), limits: LIMITS });
  const reading = await observer.snapshot();
  observer.close();
  expect(reading.source.ownership).toBe("external");
  expect(reading.source.workspaceRoot).toBe(live.root);
  const topology = observer.projectionTopology(reading);
  for (const snapshot of topology.snapshots) expect(live.projection.refresh(snapshot)).toBe("applied");
  for (const relation of topology.relations) live.projection.relate(relation);
  const attached: Attach = {
    via: "nativeFurnaceRunInspect", contract: envelope.contract, kind: envelope.source.kind, requestId: envelope.source.requestId,
    run: {
      runId: envelope.source.data.run_id, beadsRunId: envelope.source.data.beads_run_id, workspace: realpathSync(envelope.source.data.workspace), state: envelope.source.data.state, stateSince: envelope.source.data.state_since,
      ...(envelope.source.data.formula !== undefined ? { formula: envelope.source.data.formula } : {}),
      ...(envelope.source.data.creating_request_id !== undefined ? { creatingRequestId: envelope.source.data.creating_request_id } : {}),
    },
    observation: { contract: reading.contract, requestIds: { ...reading.source.requestIds, logs: [...reading.source.requestIds.logs] }, attemptIds: reading.attempts.items.map(item => item.id), completeness: reading.completeness, controllerLive: reading.run.controllerLive },
    projection: {
      nodes: topology.snapshots.map(snapshot => refKey(snapshot.source)),
      ownershipEdges: topology.relations.map(relation => ({ from: refKey(relation.from), to: refKey(relation.to), nativeConfirmationRef: relation.provenance.nativeConfirmationRef ?? "" })),
    },
  };
  live.journey.attach = attached;
  expect(attached.run.creatingRequestId).toBe(live.launcher.requestId);
  noted(evidence.nativeReferences.beadsRunIds, attached.run.beadsRunId);
  noted(evidence.nativeReferences.furnaceRequestIds, envelope.source.requestId, reading.source.requestIds.status, reading.source.requestIds.attempts, ...reading.source.requestIds.logs);
  noted(evidence.nativeReferences.attemptIds, ...attached.observation.attemptIds);
  noted(evidence.nativeReferences.ownershipConfirmationRefs, ...attached.projection.ownershipEdges.map(edge => edge.nativeConfirmationRef));
  return reading;
}

interface Read { status: RunStatusDto; attempts: AttemptDto[]; summary: RunSummary }
/** One independent read, outside the observer and the tool: the actual output the receipt records. */
async function readRun(real: Furnace, runId: string): Promise<Read> {
  const status = await real.runs.get(runId).status({ timeoutMs: CALL_TIMEOUT_MS });
  const attempts = await real.attempts.list(runId, { limit: 20 }, { timeoutMs: CALL_TIMEOUT_MS });
  const items = attempts.data.attempts;
  const live = status.data.controller?.live;
  return {
    status: status.data, attempts: items,
    summary: {
      state: status.data.state, stateSince: status.data.state_since, updatedAt: status.data.updated_at,
      controllerLive: typeof live === "boolean" ? live : null, controllerSessionId: status.data.controller?.controller_session_id ?? null,
      attemptIds: items.map(item => item.attempt_id), cancelledAttemptIds: items.filter(item => item.outcome === "cancelled").map(item => item.attempt_id),
      attemptStates: Object.fromEntries(items.map(item => [item.attempt_id, item.state])),
    },
  };
}

/** The registered tool by its production constructor, over the journey's harness-owned projection and host-bound scope. */
function controlTool(live: Live, grants: readonly string[], executor: ControlExecutor = furnaceExecutor): (params: Record<string, unknown>) => Promise<{ raw: string; reply: Reply }> {
  const task = { id: OWNING_INVOCATION } as unknown as WorkflowTask;
  const deps: WorkflowControlDeps = {
    grants: () => grants,
    observerScope: () => scopeOf(live.root),
    localPrincipal: () => PRINCIPAL,
    sessionIdOf: () => SESSION_ID,
    projection: live.projection,
    tasks: new Map<string, WorkflowTask>([[OWNING_INVOCATION, task]]),
    now: controlNow,
    executors: { furnace: executor },
  };
  const tool = createWorkflowControlTool(deps);
  const ctx = { cwd: live.root, sessionManager: { getSessionId: () => SESSION_ID } };
  return async (params: Record<string, unknown>) => {
    const result = await tool.execute("live-call", params as never, undefined, undefined, ctx as never);
    const raw = result.content[0]?.type === "text" ? result.content[0].text : "";
    return { raw, reply: JSON.parse(raw) as Reply };
  };
}

/** sha256 of every regular file under .beads and .furnace of the root, keyed by relative path. */
function hashStores(root: string): Record<string, string> {
  const files: Record<string, string> = {};
  const walk = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) files[relative(root, path)] = sha256(readFileSync(path));
    }
  };
  for (const store of [".beads", ".furnace"]) if (isDirectory(join(root, store))) walk(join(root, store));
  return files;
}
const storesEqual = (before: Record<string, string>, after: Record<string, string>): boolean => {
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  return [...keys].every(key => before[key] === after[key]);
};

const alive = (pid: number): boolean => {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
};
/** The controller is the launcher's detached child (its own process group): wait for it to leave; a signal is the recorded last resort. */
async function awaitControllerExit(pid: number | null, boundMs: number): Promise<ControllerExit> {
  if (pid === null) return "unknown";
  const deadline = Date.now() + boundMs;
  while (Date.now() < deadline) {
    if (!alive(pid)) return "observed";
    await sleep(500);
  }
  try { process.kill(-pid, "SIGTERM"); } catch { /* already gone */ }
  const grace = Date.now() + 10_000;
  while (Date.now() < grace) {
    if (!alive(pid)) return "forced-kill";
    await sleep(250);
  }
  try { process.kill(-pid, "SIGKILL"); } catch { /* already gone */ }
  await sleep(500);
  return alive(pid) ? "unknown" : "forced-kill";
}
/** Every journey ends here: the controller leaves (the drained Attempt ends), the disposable root is removed, and both are recorded. */
async function cleanup(live: Live): Promise<void> {
  const bound = (live.holdSeconds + 60) * 1000;
  const controllerExit = await awaitControllerExit(live.controllerPid, bound);
  const siblingControllerExit = live.sibling !== undefined ? await awaitControllerExit(live.sibling.controllerPid, bound) : undefined;
  const tail = (name: string): string => { try { return capped(readFileSync(join(live.root, "launcher", name), "utf8").trim()); } catch { return "unreadable"; } };
  const controllerOutput = { stdout: tail("controller.stdout"), stderr: tail("controller.stderr") };
  removeScratch(live.root);
  live.journey.cleanup = { root: live.root, controllerPid: live.controllerPid, controllerExit, removed: !existsSync(live.root), controllerOutput, ...(siblingControllerExit !== undefined ? { siblingControllerExit } : {}) };
}

/** A second Run in the SAME store, started detached by the harness exactly as the launcher starts the first (locks are per Run). */
async function startSibling(live: Live): Promise<Sibling> {
  const requestId = `vc4-sibling-${process.pid}-${Date.now().toString(36)}`;
  const side = join(live.root, "launcher");
  const stdout = openSync(join(side, "sibling.stdout"), "w");
  const stderr = openSync(join(side, "sibling.stderr"), "w");
  const controller = spawn("furnace", ["-C", live.root, "run", "start", FORMULA, "--executor-program", join(side, "hold.sh"), "--request-id", requestId, "--json"], {
    cwd: live.root, env: process.env, detached: true, stdio: ["ignore", stdout, stderr],
  });
  controller.unref();
  closeSync(stdout);
  closeSync(stderr);
  let runId: string | undefined;
  let running: AttemptDto | undefined;
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline && running === undefined) {
    await sleep(500);
    if (runId === undefined) {
      const listed = await live.real.runs.list({ creatingRequestId: requestId }, { timeoutMs: CALL_TIMEOUT_MS }).catch(() => undefined);
      runId = listed?.data.runs[0]?.run_id;
      if (runId === undefined) continue;
    }
    const status = await live.real.runs.get(runId).status({ timeoutMs: CALL_TIMEOUT_MS }).catch(() => undefined);
    if (status === undefined) continue;
    const candidate = status.data.active.find(attempt => attempt.state === "running");
    if (candidate !== undefined && status.data.controller?.live === true) running = candidate;
    else if (ENDED.has(status.data.state)) throw new Error(`sibling Run ${runId} reached ${status.data.state} before an Attempt was seen running`);
  }
  if (runId === undefined || running === undefined) throw new Error("the sibling Run showed no running Attempt under a live controller within 60s");
  const sibling: Sibling = { runId, requestId, controllerPid: controller.pid ?? null, launchedBy: "harness-detached-spawn", attemptId: running.attempt_id };
  live.sibling = sibling;
  live.journey.fixture.sibling = sibling;
  noted(evidence.nativeReferences.runIds, runId);
  noted(evidence.nativeReferences.attemptIds, running.attempt_id);
  return sibling;
}

/** Issues the one permitted stop through the tool and asserts the settled journey; returns what the rows record. */
async function stopThroughTool(live: Live, before: Read): Promise<{ raw: string; reply: Reply; execution: FurnaceControlExecution; after: Read; requestId: string }> {
  const seamBefore = live.counts.seam["runs.stop"];
  const argvBefore = argvRows().length;
  const { raw, reply } = await controlTool(live, [GRANT])(stopParams(live));
  evidence.replies.push({ scenario: live.scenario, raw });
  expect(reply.ok).toBe(true);
  expect(reply.invoked).toBe(true);
  expect(reply.status).toBe("settled");
  expect(reply.completion).toBe("not-asserted");
  expect(reply.control?.phase).toBe("result");
  expect(reply.control?.result?.outcome).toBe("completed");
  const requestId = reply.control?.requested?.requestId ?? "";
  expect(requestId).toMatch(/^ctl_[0-9a-f]{32}$/);
  const execution = executions.get(requestId);
  if (execution === undefined) throw new Error(`no teed execution for ${requestId}`);
  expect(execution.status).toBe("settled");
  expect(execution.verb).toBe("run stop");
  expect(execution.acknowledged?.nativeAckRef).toBe(`run_stop:${requestId}`);
  expect(reply.control?.acknowledged?.nativeAckRef).toBe(`run_stop:${requestId}`);
  expect(execution.result?.nativeResultRef).toMatch(new RegExp(`^furnace-run:${live.runId}:stopped@`));
  expect(reply.control?.result?.nativeResultRef).toBe(execution.result?.nativeResultRef);
  expect(execution.echo).toEqual({ kind: "run_stop", requestId, id: live.runId, state: "stopped" });
  const after = await readRun(live.real, live.runId);
  expect(after.summary.state).toBe("stopped");
  expect(execution.result?.nativeResultRef).toBe(`furnace-run:${live.runId}:stopped@${after.summary.stateSince}`);
  // run stop drains: the in-flight Attempt is still listed running under the stopped Run.
  expect(after.status.active.some(attempt => attempt.state === "running")).toBe(true);
  expect(live.counts.seam["runs.stop"] - seamBefore).toBe(1);
  expect(seamTotal(live.counts) - seamBefore).toBe(1);
  expect(classifyArgv(argvRows().slice(argvBefore)).controlCapable).toEqual(["run stop"]);
  const requested = execution.requested;
  record(live.scenario, {
    phase: "requested", requestId, grant: requested.grant, policy: requested.policy, ownershipConfirmationRef: requested.ownershipConfirmationRef, target: { ...requested.target }, decidedAt: requested.decidedAt,
    runStateBefore: before.summary.state, controllerLiveBefore: before.summary.controllerLive === true ? "yes" : before.summary.controllerLive === false ? "no" : "unknown",
  }, `workflow_control stop of ${live.runId} under ${GRANT}; Run read ${before.summary.state} under a ${before.summary.controllerLive === true ? "live" : "non-live"} controller before the stop`);
  record(live.scenario, {
    phase: "acknowledged", status: execution.status, requestId, nativeAckRef: execution.acknowledged?.nativeAckRef ?? "", acknowledgedAt: execution.acknowledged?.acknowledgedAt ?? "", echo: { ...execution.echo },
  }, `Furnace's run_stop envelope echoed ${requestId}: ${JSON.stringify(execution.echo)}`);
  record(live.scenario, {
    phase: "result", requestId, targetId: live.runId, outcome: execution.result?.outcome ?? "", nativeResultRef: execution.result?.nativeResultRef ?? "", settledAt: execution.result?.settledAt ?? "",
    stateSince: after.summary.stateSince, seamCalls: live.counts.seam["runs.stop"] - seamBefore, nativeStateAfter: after.summary.state, nativeStateSinceAfter: after.summary.stateSince, echo: { ...execution.echo },
  }, `independent run status read ${after.summary.state} since ${after.summary.stateSince}; reply ${JSON.stringify({ status: reply.status, control: reply.control ?? null })}`);
  evidence.runRecords.push({ scenario: live.scenario, before: before.summary, after: after.summary });
  noted(evidence.nativeReferences.controlRequestIds, requestId);
  noted(evidence.nativeReferences.nativeAckRefs, execution.acknowledged?.nativeAckRef);
  noted(evidence.nativeReferences.nativeResultRefs, execution.result?.nativeResultRef);
  return { raw, reply, execution, after, requestId };
}

let built: Receipt | undefined;
function receipt(): Receipt {
  const rows = argvRows();
  evidence.utc = nowIso();
  evidence.verbCounts.processArgv = { rows, ...classifyArgv(rows) };
  const seam = evidence.verbCounts.seam;
  const reads = evidence.verbCounts.reads;
  for (const key of Object.keys(seam) as Array<keyof VerbCounts["seam"]>) seam[key] = 0;
  for (const key of Object.keys(reads) as Array<keyof VerbCounts["reads"]>) reads[key] = 0;
  for (const counts of countsByRoot.values()) {
    for (const key of Object.keys(seam) as Array<keyof VerbCounts["seam"]>) seam[key] += counts.seam[key];
    for (const key of Object.keys(reads) as Array<keyof VerbCounts["reads"]>) reads[key] += counts.reads[key];
  }
  built = buildReceipt(evidence);
  return built;
}

afterAll(() => {
  const final = built ?? receipt();
  const line = `${MARKER} ${JSON.stringify(final)}`;
  process.stdout.write(`\n${line}\n`);
  process.env.PATH = ORIGINAL_PATH;
  removeScratch(shimDir);
  if (RECEIPT_PATH) writeFileSync(RECEIPT_PATH, `${line}\n`);
});

describe("live furnace adverse cancellation journey (wb-752.7)", () => {
  it("stops a running externally launched Run through the production control path: acknowledged echoes Furnace's own run_stop envelope, result only from the record's stopped state, exactly one seam verb", async () => {
    const live = launchFixture(SCENARIOS.adverse, 45);
    try {
      const reading = await attach(live);
      expect(reading.run.state).toBe("active");
      expect(reading.run.controllerLive).toBe("yes");
      expect(reading.attempts.items.some(item => item.state === "running")).toBe(true);
      const before = await readRun(live.real, live.runId);
      if (before.summary.state !== "active") throw unrealised("run-not-active-at-stop", `${live.scenario}: the Run read ${before.summary.state} before the stop`);
      if (before.summary.controllerLive !== true) throw unrealised("controller-not-live-at-stop", `${live.scenario}: controller live ${String(before.summary.controllerLive)} before the stop`);
      const { execution } = await stopThroughTool(live, before);
      scenario(live.scenario, true, `Run ${live.runId} stopped through workflow_control: ${execution.acknowledged?.nativeAckRef} then ${execution.result?.nativeResultRef}`);
    } finally {
      await cleanup(live);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 180_000);

  it("denied-without-grant issues ZERO SDK verbs: the typed observer-only denial precedes the seam, as do missing-exact-grant and operator-confirmation", async () => {
    const live = launchFixture(SCENARIOS.denied, 30);
    try {
      await attach(live);
      const denials: Array<{ grants: string[]; confirmed: boolean; code: string; category: string }> = [
        { grants: ["workbench:observe"], confirmed: true, code: "observer-only", category: "authorization" },
        { grants: ["control:furnace.pause"], confirmed: true, code: "missing-exact-grant", category: "authorization" },
        { grants: [GRANT], confirmed: false, code: "operator-confirmation", category: "validation" },
      ];
      for (const denial of denials) {
        const seamBefore = seamTotal(live.counts);
        const argvBefore = argvRows().length;
        const { raw, reply } = await controlTool(live, denial.grants)(stopParams(live, denial.confirmed));
        evidence.replies.push({ scenario: live.scenario, raw });
        evidence.grants.denied.push([...denial.grants]);
        expect(reply.ok).toBe(false);
        expect(reply.invoked).toBe(false);
        expect(reply.status).toBe("refused");
        expect(reply.error).toMatchObject({ code: denial.code, category: denial.category });
        expect(raw).not.toMatch(/[\u0000-\u001f\u007f-\u009f]/);
        const seamCalls = seamTotal(live.counts) - seamBefore;
        const processControlVerbs = classifyArgv(argvRows().slice(argvBefore)).controlCapable.length;
        expect(seamCalls).toBe(0);
        expect(processControlVerbs).toBe(0);
        record(live.scenario, { phase: "denied", policy: denial.code, category: denial.category, status: reply.status, invoked: reply.invoked, seamCalls, processControlVerbs }, `grants ${JSON.stringify(denial.grants)} confirmed ${String(denial.confirmed)}: ${raw}`);
      }
      const after = await readRun(live.real, live.runId);
      expect(after.summary.state).toBe("active");
      scenario(live.scenario, true, "three typed denials (observer-only, missing-exact-grant, operator-confirmation), zero seam calls and zero control-capable furnace processes");
    } finally {
      await cleanup(live);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 180_000);

  it("an observer view that polls and closes issues no stop verb, and the Run it watched is unchanged across the close", async () => {
    const live = launchFixture(SCENARIOS.observer, 45);
    try {
      await attach(live);
      const before = await readRun(live.real, live.runId);
      expect(before.summary.state).toBe("active");
      const storesBefore = hashStores(live.root);
      const methodsBefore = live.counts.methods.length;
      const seamBefore = seamTotal(live.counts);
      const argvBefore = argvRows().length;
      const observer = new FurnaceObserver(live.client, { workspaceRoot: live.root, runId: live.runId, scope: scopeOf(live.root), limits: LIMITS });
      const readings: FurnaceReading[] = [];
      for await (const next of observer.observe()) readings.push(next);
      observer.close();
      const closedAt = nowIso();
      const argv = argvRows().slice(argvBefore);
      const observerCalls = live.counts.methods.slice(methodsBefore);
      const controlCalls = seamTotal(live.counts) - seamBefore;
      const after = await readRun(live.real, live.runId);
      const storesAfter = hashStores(live.root);
      const equal = storesEqual(storesBefore, storesAfter);
      expect(readings.filter(reading => reading.freshness === "current").length).toBeGreaterThanOrEqual(2);
      expect(readings.at(-1)?.freshness).toBe("stale");
      expect(controlCalls).toBe(0);
      expect(classifyArgv(argv).controlCapable).toEqual([]);
      expect(observerCalls.every(method => ["runs.status", "attempts.list", "logs.read"].includes(method))).toBe(true);
      expect(after.summary.state).toBe(before.summary.state);
      expect(after.summary.cancelledAttemptIds).toEqual(before.summary.cancelledAttemptIds);
      expect(after.summary.controllerSessionId).toBe(before.summary.controllerSessionId);
      expect(after.summary.controllerLive).toBe(true);
      expect(equal || progressOf(before.summary, after.summary).length > 0).toBe(true);
      record(live.scenario, { phase: "observer-close", observerCalls, controlCalls, argv, runBefore: before.summary, runAfter: after.summary, closedAt, storesEqual: equal },
        `${readings.length} readings then close; ${argv.length} furnace processes, all reads; stores ${equal ? "byte-identical" : "changed"} across the window`);
      evidence.runRecords.push({ scenario: live.scenario, before: before.summary, after: after.summary });
      scenario(live.scenario, true, `observer polled ${readings.length} times and closed with zero control verbs; Run ${live.runId} unchanged`);
    } finally {
      await cleanup(live);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 180_000);

  it("a sibling Run in the same store is unaffected by the stop: no implicit mass cancellation", async () => {
    const live = launchFixture(SCENARIOS.sibling, 45);
    try {
      const sibling = await startSibling(live);
      expect(sibling.runId).not.toBe(live.runId);
      await attach(live);
      const siblingBefore = await readRun(live.real, sibling.runId);
      expect(siblingBefore.summary.state).toBe("active");
      const before = await readRun(live.real, live.runId);
      if (before.summary.state !== "active") throw unrealised("run-not-active-at-stop", `${live.scenario}: the Run read ${before.summary.state} before the stop`);
      if (before.summary.controllerLive !== true) throw unrealised("controller-not-live-at-stop", `${live.scenario}: controller live ${String(before.summary.controllerLive)} before the stop`);
      const argvBefore = argvRows().length;
      await stopThroughTool(live, before);
      const siblingAfter = await readRun(live.real, sibling.runId);
      const listed = (await live.real.runs.list({}, { timeoutMs: CALL_TIMEOUT_MS })).data.runs.map(run => run.run_id);
      const argv = argvRows().slice(argvBefore);
      const argvNamingSibling = argv.filter(row => classifyArgv([row]).controlCapable.length > 0 && row.includes(sibling.runId)).length;
      const siblingSeamCalls = live.counts.seamTargets.filter(id => id === sibling.runId).length;
      expect(siblingAfter.summary.state).toBe("active");
      expect(siblingAfter.summary.controllerLive).toBe(true);
      expect(siblingAfter.status.active.some(attempt => attempt.state === "running")).toBe(true);
      expect(siblingSeamCalls).toBe(0);
      expect(argvNamingSibling).toBe(0);
      expect(argv.filter(row => classifyArgv([row]).controlCapable[0] === "run stop")).toEqual([["-C", live.root, "--request-id", expect.stringMatching(/^ctl_[0-9a-f]{32}$/), "run", "stop", live.runId, "--json"]]);
      expect(listed).toEqual(expect.arrayContaining([live.runId, sibling.runId]));
      record(live.scenario, {
        phase: "sibling", siblingRunId: sibling.runId, targetRunId: live.runId, stateBefore: siblingBefore.summary.state, stateAfter: siblingAfter.summary.state, controllerLiveAfter: siblingAfter.summary.controllerLive,
        attemptStateAfter: siblingAfter.status.active.find(attempt => attempt.state === "running")?.state ?? siblingAfter.summary.attemptStates[sibling.attemptId] ?? "absent", siblingSeamCalls, argvNamingSibling, listed,
      }, `sibling ${sibling.runId} read ${siblingAfter.summary.state} under a live controller after ${live.runId} stopped; run list: ${listed.join(", ")}`);
      evidence.runRecords.push({ scenario: `${live.scenario}:sibling`, before: siblingBefore.summary, after: siblingAfter.summary });
      scenario(live.scenario, true, `stopped ${live.runId}; sibling ${sibling.runId} stayed active under its own live controller with zero verbs naming it`);
    } finally {
      await cleanup(live);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 240_000);

  it("a stop of an already-completed Run parks uncertain with Furnace's own typed refusal after exactly one issued verb, and is never retried", async () => {
    const live = launchFixture(SCENARIOS.completed, 30);
    try {
      let before = await readRun(live.real, live.runId);
      const deadline = Date.now() + 150_000;
      while (Date.now() < deadline && !(before.summary.state === "completed" && before.summary.controllerLive === false)) {
        await sleep(1_000);
        before = await readRun(live.real, live.runId);
      }
      expect(before.summary.state).toBe("completed");
      expect(before.summary.controllerLive).toBe(false);
      const reading = await attach(live);
      expect(reading.run.state).toBe("completed");
      const seamBefore = live.counts.seam["runs.stop"];
      const argvBefore = argvRows().length;
      const { raw, reply } = await controlTool(live, [GRANT])(stopParams(live));
      evidence.replies.push({ scenario: live.scenario, raw });
      expect(reply.ok).toBe(true);
      expect(reply.invoked).toBe(true);
      expect(reply.status).toBe("uncertain");
      expect(reply.control?.phase).toBe("requested");
      const requestId = reply.control?.requested?.requestId ?? "";
      const execution = executions.get(requestId);
      if (execution === undefined) throw new Error(`no teed execution for ${requestId}`);
      expect(execution.status).toBe("uncertain");
      expect(execution.uncertainty).toEqual({ reason: "seam-failure", failure: { kind: "command_error", code: "invalid_state_transition" } });
      expect(execution.acknowledged).toBeUndefined();
      await sleep(2_000);
      const seamCalls = live.counts.seam["runs.stop"] - seamBefore;
      expect(seamCalls).toBe(1);
      expect(classifyArgv(argvRows().slice(argvBefore)).controlCapable).toEqual(["run stop"]);
      const after = await readRun(live.real, live.runId);
      expect(after.summary.state).toBe("completed");
      const requested = execution.requested;
      record(live.scenario, {
        phase: "requested", requestId, grant: requested.grant, policy: requested.policy, ownershipConfirmationRef: requested.ownershipConfirmationRef, target: { ...requested.target }, decidedAt: requested.decidedAt,
        runStateBefore: before.summary.state, controllerLiveBefore: "no",
      }, `workflow_control stop of ${live.runId} after it completed and its controller left`);
      record(live.scenario, {
        phase: "uncertain", requestId, status: execution.status, reason: execution.uncertainty?.reason ?? "", ...(execution.uncertainty?.failure ? { failure: { ...execution.uncertainty.failure } } : {}), seamCalls, retried: seamCalls !== 1, nativeStateAfter: after.summary.state,
      }, `parked ${JSON.stringify(execution.uncertainty)}; reply ${raw}`);
      evidence.runRecords.push({ scenario: live.scenario, before: before.summary, after: after.summary });
      noted(evidence.nativeReferences.controlRequestIds, requestId);
      scenario(live.scenario, true, `Furnace refused the stop of completed ${live.runId} with invalid_state_transition; parked uncertain after one verb`);
    } finally {
      await cleanup(live);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 180_000);

  it("an ambiguous stop (seam wait bound of 1 ms) parks uncertain after one verb; the Run's real state is read, not inferred", async () => {
    const live = launchFixture(SCENARIOS.ambiguous, 30);
    try {
      await attach(live);
      const before = await readRun(live.real, live.runId);
      if (before.summary.state !== "active") throw unrealised("run-not-active-at-stop", `${live.scenario}: the Run read ${before.summary.state} before the stop`);
      if (before.summary.controllerLive !== true) throw unrealised("controller-not-live-at-stop", `${live.scenario}: controller live ${String(before.summary.controllerLive)} before the stop`);
      const seamBefore = live.counts.seam["runs.stop"];
      const argvBefore = argvRows().length;
      const { raw, reply } = await controlTool(live, [GRANT], ambiguousExecutor)(stopParams(live));
      evidence.replies.push({ scenario: live.scenario, raw });
      expect(reply.ok).toBe(true);
      expect(reply.invoked).toBe(true);
      expect(reply.status).toBe("uncertain");
      expect(reply.control?.phase).toBe("requested");
      const requestId = reply.control?.requested?.requestId ?? "";
      const execution = executions.get(requestId);
      if (execution === undefined) throw new Error(`no teed execution for ${requestId}`);
      expect(execution.status).toBe("uncertain");
      const reason = execution.uncertainty?.reason;
      expect(reason === "wait-timeout" || (reason === "seam-failure" && execution.uncertainty?.failure?.kind === "request_timeout")).toBe(true);
      await sleep(2_000);
      const seamCalls = live.counts.seam["runs.stop"] - seamBefore;
      expect(seamCalls).toBe(1);
      expect(classifyArgv(argvRows().slice(argvBefore)).controlCapable).toEqual(["run stop"]);
      const after = await readRun(live.real, live.runId);
      expect(["active", "stopped"]).toContain(after.summary.state);
      const requested = execution.requested;
      record(live.scenario, {
        phase: "requested", requestId, grant: requested.grant, policy: requested.policy, ownershipConfirmationRef: requested.ownershipConfirmationRef, target: { ...requested.target }, decidedAt: requested.decidedAt,
        runStateBefore: before.summary.state, controllerLiveBefore: "yes",
      }, `workflow_control stop of ${live.runId} with a 1 ms wait bound`);
      record(live.scenario, {
        phase: "uncertain", requestId, status: execution.status, reason: reason ?? "", ...(execution.uncertainty?.failure ? { failure: { ...execution.uncertainty.failure } } : {}), seamCalls, retried: seamCalls !== 1, nativeStateAfter: after.summary.state,
      }, `parked ${JSON.stringify(execution.uncertainty)}; the record then read ${after.summary.state}`);
      evidence.runRecords.push({ scenario: live.scenario, before: before.summary, after: after.summary });
      noted(evidence.nativeReferences.controlRequestIds, requestId);
      scenario(live.scenario, true, `ambiguous stop of ${live.runId} parked ${reason} after one verb; the record read ${after.summary.state}`);
    } finally {
      await cleanup(live);
    }
    expect(treeState()).toBe(TREE_AT_START);
  }, 180_000);

  it("receipt shape: the emitted line parses and every phase carries typed fields equal to the rows' observed values; the label is a live pass distinct from fixture passes", () => {
    if (preflightFailure !== null) throw new Error(preflightFailure);
    const emitted = receipt();
    const parsed = JSON.parse(`${MARKER} ${JSON.stringify(emitted)}`.slice(MARKER.length + 1)) as Receipt;
    expect(parsed.contract).toBe(CONTRACT);
    expect(parsed.evidenceClass).toBe("live");
    expect(parsed.phases.length).toBe(evidence.phases.length);
    for (const [index, phase] of parsed.phases.entries()) {
      expect(phase.fields, `${phase.scenario} ${phase.phase}`).toBeDefined();
      expect(phase.fields.phase).toBe(phase.phase);
      expect(phase.fields).toEqual(evidence.phases[index]?.fields);
      expect(phase.text.length).toBeLessThanOrEqual(TEXT_CAP);
    }
    expect(parsed.phases.map(phase => phase.phase)).toEqual(expect.arrayContaining(["requested", "acknowledged", "result", "denied", "uncertain", "observer-close", "sibling"]));
    expect(parsed.toolchain.furnace).toEqual(evidence.journeys[0]?.attach ? evidence.toolchain.furnace : null);
    expect(parsed.toolchain.furnace?.source).toBe(BINARY_IDENTITY_SOURCE);
    expect(parsed.truthLabel).toBe(truthLabelOf(parsed));
    expect(parsed.truthLabel === "live SDK pass").toBe(parsed.pass);
    expect(parsed.verbCounts.seam["runs.stop"]).toBe(4);
    expect(parsed.verbCounts.processArgv.controlCapable.filter(verb => verb === "run stop")).toHaveLength(4);
    expect(parsed.verbCounts.processArgv.controlCapable.filter(verb => verb === "run start")).toHaveLength(1);
    expect(parsed.journeys.every(journey => journey.cleanup?.controllerExit === "observed" && journey.cleanup.removed)).toBe(true);
    expect(parsed.revision).toBe(STAMP.head);
    expect(parsed.unrealised).toEqual([]);
    expect(parsed.dirty, `produced from an uncommitted tree (AC5 asks for the committed tree): ${STAMP.porcelain?.trim() ?? "status unreadable"}`).toBe(false);
    expect(parsed.findings.map(finding => finding.rule)).toEqual([]);
    expect(parsed.pass).toBe(true);
  });
});
