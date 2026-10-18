/**
 * wb-0kg.8 (VC-7/W16 residual): live local-detached adverse cancellation journey receipt.
 *
 * Real detached hosts (the compiled dist entrypoint, real sockets, exactly-once effect markers on disk) are driven
 * through the PRODUCTION workflow_control wiring (createWorkflowControlTool, wb-cra) and the landed wb-0kg.6 adapter
 * (executeDetachedControl), with the src/index.ts local-detached executor leg replicated verbatim around a counted
 * connect seam (the replica is pinned against drift by test/workbench-detached-control-live-receipt.test.ts). The
 * projection is harness-owned and seeded only from REAL native data: the launch receipt plus a live inspect snapshot
 * through the landed pure reader (projectDetachedReading/applyDetachedReading). Receipts stay phase-honest: the
 * acknowledged phase echoes the host's own accepted answer, the result carries terminalConfirmed=false verbatim, and
 * the real cancelled terminal is read only from a later inspect snapshot, never minted from the reply.
 *
 * The strict booted-tool reading is declared UNREALISED citing wb-79k.3 (HELD): nothing in src ingests detached
 * readings into the live projection, so the booted workflow_control denies local-detached targets cross-scope.
 *
 * Runs ONLY from its own forge command (vitest.detached-control-live.config.ts); excluded from the default gate.
 * Honest unavailability: a missing dist, a non-Linux/setuid operator or an over-budget scratch base fails naming the
 * cause, never skips. Hosts leave only by the shutdown verb; this file never signals a process.
 */
import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterAll, describe, expect, it } from "vitest";
import {
  buildDetachedControlLiveReceipt,
  reachedTerminal,
  STRICT_BOOTED_CITATION,
} from "../qa/workbench/detached-control-live-receipt.mjs";
import { faultProviderSource } from "../qa/workbench/local-detached-faults-receipt.mjs";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { type ControlExecutionSummary, type ControlExecutor, createWorkflowControlTool, type WorkflowControlDeps } from "../src/workbench/control-tool.js";
import { executeDetachedControl } from "../src/workbench/detached-control.js";
import { applyDetachedReading, projectDetachedReading } from "../src/workbench/detached-observer.js";
import {
  connectDetachedWorkflow,
  type DetachedLaunchRequest,
  type DetachedReceipt,
  launchDetachedWorkflow,
  localOperator,
} from "../src/workbench/hosts/local-detached.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import type { WorkflowTask } from "../src/workflow/task.js";
import { chooseScratchBase, scratchBaseBudget } from "./helpers/fixture-roots.js";
import { installScratchLeakGuard, removeScratch, trackScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

// ---------- Prerequisites: honest unavailability fails naming the cause, never a skip ----------
const operator = localOperator();
const REPO = realpathSync(process.cwd());
const DIST_HOST = join(REPO, "dist", "workbench", "hosts", "local-detached.js");
if (!existsSync(DIST_HOST) || realpathSync(DIST_HOST) !== DIST_HOST) {
  throw new Error(`Detached control live tier requires the compiled distribution at ${DIST_HOST}; run npm run build first (honest unavailability, not a skip).`);
}
const uid = operator.uid;
/** Deepest socket layout past the base: the scratch root, then the host's per-launch tmpdir socket directory. */
const SOCKET_SUFFIX = `/wb-dcl-XXXXXX/pw-${uid}-XXXXXX/${"0".repeat(16)}.sock`;
const scratchBase = chooseScratchBase(process.env, scratchBaseBudget(SOCKET_SUFFIX));
const scratch = trackScratch(realpathSync(mkdtempSync(join(scratchBase.path, "wb-dcl-"))));
const savedTmpdir = process.env.TMPDIR;
// The host's own tmpdir socket fallback must stay under the short base (wb-70b R1); restored in afterAll.
process.env.TMPDIR = scratch;
const hostsRoot = join(scratch, "hosts");
// Markers live BESIDE the workspace, not inside it: the host pins the whole provider tree of cwd, and a marker
// landing inside it between one launch's pin and another's walk would be an identity conflict, not a measurement.
const markers = join(scratch, "markers");
const workspace = join(scratch, "workspace");
for (const dir of [hostsRoot, markers, workspace]) mkdirSync(dir, { mode: 0o700 });

const nowIso = (): string => new Date().toISOString();
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
const sha256Of = (path: string): string => createHash("sha256").update(readFileSync(path)).digest("hex");
const asRecord = (value: unknown): Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : {};

async function until<T>(read: () => Promise<T>, done: (value: T) => boolean, bound = 10_000): Promise<{ value: T; ok: boolean; ms: number }> {
  const start = Date.now();
  let value = await read();
  while (!done(value) && Date.now() - start < bound) {
    await sleep(25);
    value = await read();
  }
  return { value, ok: done(value), ms: Date.now() - start };
}

// ---------- Fixtures: the wb-0kg.1 provider (one exactly-once marker, then an abortable hold) ----------
const EFFECT = "local.effect";
const HOLD_MS = 15_000;
function writeFixture(name: string, text: string): string {
  const path = join(workspace, name);
  writeFileSync(path, text, { mode: 0o600 });
  return path;
}
const providerPath = writeFixture("effect-hold-provider.mjs", faultProviderSource({ capabilityId: EFFECT, markerDirectory: markers, crashAfterEffect: false, holdMs: HOLD_MS }));
const scriptPath = writeFixture(
  "effect-workflow.js",
  `export const meta={name:"detached-control-live",description:"controlled live-control fixture"};\nreturn await node(${JSON.stringify(EFFECT)},args);`,
);
const markerCount = (id: string): number => readdirSync(markers).filter((name) => name.startsWith(`${id}.`)).length;
function allMarkerCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const name of readdirSync(markers)) {
    const id = name.slice(0, name.lastIndexOf("."));
    counts[id] = (counts[id] ?? 0) + 1;
  }
  return counts;
}

// ---------- Counted connect seam (the executor's factory AND the harness's own handles) ----------
type DetachedHandle = ReturnType<typeof connectDetachedWorkflow>;
const verbCounts = { connect: 0, inspect: 0, execute: 0, cancel: 0, shutdown: 0 };
const teardownVerbCounts = { shutdown: 0, inspect: 0 };
let seamPhase: "journey" | "teardown" = "journey";
interface SeamEcho {
  invocationId: string;
  verb: "cancel" | "shutdown";
  answer: unknown;
}
const seamEchoes: SeamEcho[] = [];
function countedConnect(invocationId: string): DetachedHandle {
  verbCounts.connect += 1;
  const handle = connectDetachedWorkflow(hostsRoot, invocationId);
  return {
    inspect: () => {
      if (seamPhase === "teardown") teardownVerbCounts.inspect += 1;
      else verbCounts.inspect += 1;
      return handle.inspect();
    },
    execute: () => {
      verbCounts.execute += 1;
      return handle.execute();
    },
    cancel: async (reason: string) => {
      verbCounts.cancel += 1;
      const answer = await handle.cancel(reason);
      seamEchoes.push({ invocationId, verb: "cancel", answer });
      return answer;
    },
    shutdown: async (reason: string) => {
      if (seamPhase === "teardown") teardownVerbCounts.shutdown += 1;
      else verbCounts.shutdown += 1;
      const answer = await handle.shutdown(reason);
      seamEchoes.push({ invocationId, verb: "shutdown", answer });
      return answer;
    },
  };
}
const seamSnapshot = () => ({ connect: verbCounts.connect, cancel: verbCounts.cancel, shutdown: verbCounts.shutdown });
const lastEcho = (invocationId: string, verb: SeamEcho["verb"]): Record<string, unknown> =>
  asRecord(seamEchoes.filter((echo) => echo.invocationId === invocationId && echo.verb === verb).pop()?.answer);

// ---------- Hosts: launches, receipts, handles, task stubs ----------
const receipts = new Map<string, DetachedReceipt>();
const handles = new Map<string, DetachedHandle>();
const launched: string[] = [];
const stopped = new Set<string>();
const tasks = new Map<string, WorkflowTask>();

function launchRequest(invocationId: string, extra: Partial<DetachedLaunchRequest> = {}): DetachedLaunchRequest {
  return {
    directory: hostsRoot,
    invocationId,
    scriptPath,
    cwd: workspace,
    input: { token: "control-live" },
    trustedScript: true,
    backend: "deterministic",
    providers: [],
    grants: ["fixture:effect"],
    // Deliberate, receipt-recorded deviation from the Pi tool's ["inspect","execute"] launch pin: without the
    // cancel and shutdown permissions the host gate would refuse the very verbs under measurement.
    permissions: ["inspect", "execute", "cancel", "shutdown"],
    localProvider: { kind: "trusted-local", version: "1.0.0", capabilities: [EFFECT], modulePath: providerPath, digest: `sha256:${sha256Of(providerPath)}` },
    sourceFiles: [scriptPath, providerPath],
    ...extra,
  };
}
async function launch(invocationId: string, extra: Partial<DetachedLaunchRequest> = {}): Promise<DetachedReceipt> {
  const receipt = await launchDetachedWorkflow(launchRequest(invocationId, extra));
  receipts.set(invocationId, receipt);
  handles.set(invocationId, countedConnect(invocationId));
  tasks.set(invocationId, { id: invocationId } as unknown as WorkflowTask);
  launched.push(invocationId);
  return receipt;
}
function handleOf(id: string): DetachedHandle {
  const handle = handles.get(id);
  if (!handle) throw new Error(`no handle for ${id}`);
  return handle;
}
const hostInstanceOf = (id: string): string => receipts.get(id)?.hostInstanceId ?? "missing";
async function auditLengthOf(id: string): Promise<number> {
  const snapshot = await handleOf(id).inspect();
  return Array.isArray(snapshot.controlAudit) ? snapshot.controlAudit.length : -1;
}
async function liveOthersAuditEntries(exclude: string): Promise<number> {
  let total = 0;
  for (const other of launched) {
    if (other === exclude || stopped.has(other)) continue;
    total += await auditLengthOf(other);
  }
  return total;
}

// ---------- Harness-owned projection, seeded only from REAL native data ----------
const projection = new ObservationProjection();
const OWNER = operator.id;
const SCOPE = { workspace, principal: OWNER };
async function seedProjection(id: string): Promise<void> {
  const receipt = receipts.get(id);
  if (!receipt) throw new Error(`no launch receipt for ${id}`);
  const snapshot = await handleOf(id).inspect();
  const reading = projectDetachedReading({ receipt, snapshot, scope: { ...SCOPE }, operator, observedAt: nowIso() });
  const applied = applyDetachedReading(projection, reading);
  if (reading.relations.length !== 1 || applied.related !== 1) {
    throw new Error(`projection seeding for ${id} stated no ownership edge (source ${snapshot.source}, observation ${snapshot.observation})`);
  }
}
const targetOf = (id: string): { provider: string; type: string; id: string } => ({ provider: "local-detached", type: "invocation", id });

// ---------- The production tool over the replica of the src/index.ts local-detached executor leg ----------
// replica-drift census: this block is byte-pinned by test/workbench-detached-control-live-receipt.test.ts against
// src/index.ts, adapted ONLY by the three named substitutions (hosts root for the agent dir, countedConnect for
// workbenchNative().connectDetachedWorkflow, nowIso for controlNow).
const detachedExecutor: ControlExecutor = async (_decision, request): Promise<ControlExecutionSummary> => {
  const execution = await executeDetachedControl({
    request, deps: { projection }, connect: invocationId => countedConnect(invocationId), now: nowIso,
  });
  // The adapter decides from the same host-bound request; its own denial or refusal surfaces as the typed error it is.
  if (execution.status === "denied") {
    throw Object.assign(new CapabilityError(execution.decision.category, execution.decision.reason), { code: execution.decision.policy });
  }
  if (execution.status === "refused") {
    throw Object.assign(new CapabilityError(execution.refusal.category, `Detached control refused (${execution.refusal.category}).`), { code: "detached-refused" });
  }
  return { receipt: execution.receipt, status: execution.status };
};

const FULL_GRANTS = ["observe:local-detached.invocation", "control:local-detached.cancel", "control:local-detached.shutdown"] as const;
let grantsList: string[] = [...FULL_GRANTS];
let grantsReadCount = 0;
const principals = new WeakMap<object, string>();
function piContext(principal: string): ExtensionContext {
  const context = { cwd: workspace, sessionManager: { getSessionId: () => "s-dcl8" } };
  principals.set(context, principal);
  return context as unknown as ExtensionContext;
}
const ownerContext = piContext(OWNER);
const strangerContext = piContext("local-operator:someone-else:s-dcl8");
const principalOf = (context: ExtensionContext): string => principals.get(context as unknown as object) ?? OWNER;
const deps: WorkflowControlDeps = {
  grants: () => {
    grantsReadCount += 1;
    return [...grantsList];
  },
  observerScope: (context) => ({ workspace, principal: principalOf(context) }),
  localPrincipal: (context) => principalOf(context),
  sessionIdOf: () => "s-dcl8",
  projection,
  tasks,
  now: nowIso,
  executors: { "local-detached": detachedExecutor },
};
const tool = createWorkflowControlTool(deps);
interface Reply {
  ok: boolean;
  invoked: boolean;
  status: string;
  completion?: string;
  control?: Record<string, unknown>;
  error?: { code: string; category?: string; message: string };
}
async function call(context: ExtensionContext, params: Record<string, unknown>, invocation: string): Promise<Reply> {
  const result = await tool.execute(invocation, params as never, undefined, undefined, context as never);
  const first = result.content[0];
  const text = first !== undefined && first.type === "text" ? first.text : "";
  return JSON.parse(text) as Reply;
}

// ---------- Reader process (AC1): a real observing "Pi" that attaches, inspects and exits ----------
// DOLLAR keeps the generated reader's template placeholder out of a plain string (the git-stamp precedent).
const DOLLAR = "$";
const readerPath = join(scratch, "reader.mjs");
writeFileSync(
  readerPath,
  [
    `import * as host from ${JSON.stringify(pathToFileURL(DIST_HOST).href)};`,
    "const [root, id] = process.argv.slice(2);",
    "const client = host.connectDetachedWorkflow(root, id);",
    "const calls = { observerCancelCalls: 0, observerShutdownCalls: 0 };",
    "const seam = { inspect: () => client.inspect(), cancel: reason => { calls.observerCancelCalls += 1; return client.cancel(reason); }, shutdown: reason => { calls.observerShutdownCalls += 1; return client.shutdown(reason); } };",
    "const first = await seam.inspect();",
    "const second = await seam.inspect();",
    "const attached = first.observation !== 'unknown' && second.observation !== 'unknown';",
    `process.stdout.write(\`${DOLLAR}{JSON.stringify({ attached, observation: second.observation, ...calls })}\\n\`, () => process.exit(0));`,
    "",
  ].join("\n"),
  { mode: 0o600 },
);
interface ReaderReport {
  attached?: boolean;
  observation?: string;
  observerCancelCalls?: number;
  observerShutdownCalls?: number;
}
function readerProcess(id: string): Promise<{ code: number | null; signal: NodeJS.Signals | null; report: ReaderReport }> {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [readerPath, hostsRoot, id], { stdio: ["ignore", "pipe", "pipe"] });
    let out = "";
    child.stdout.on("data", (chunk) => {
      out += String(chunk);
    });
    child.once("exit", (code, signal) => {
      let report: ReaderReport = {};
      try {
        report = JSON.parse(out.trim().split("\n").pop() ?? "{}") as ReaderReport;
      } catch {
        report = {};
      }
      resolve({ code, signal, report });
    });
  });
}

// ---------- Receipt accumulation and the committed-tree stamp ----------
type JourneyRecord = Record<string, unknown>;
const journeys: Record<string, JourneyRecord> = {};
const diagnostics: string[] = [];
if (scratchBase.source === "tmp-fallback") diagnostics.push(`scratch base: /tmp is the recorded fallback (${scratchBase.reason ?? "unknown"})`);
let emitted = false;
let liveReceiptJson = "";

function git(args: readonly string[]): string | undefined {
  try {
    return execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8" });
  } catch {
    return undefined;
  }
}
function revisionBlock(): { head: string; dirty: boolean; toplevel: string; committedTree: boolean } {
  const headRaw = (git(["rev-parse", "HEAD"]) ?? "unknown").trim();
  const headKnown = /^[0-9a-f]{7,64}$/.test(headRaw);
  const toplevelRaw = (git(["rev-parse", "--show-toplevel"]) ?? "").trim();
  let toplevelMatches = false;
  try {
    toplevelMatches = toplevelRaw !== "" && realpathSync(toplevelRaw) === REPO;
  } catch {
    toplevelMatches = false;
  }
  const porcelain = git(["status", "--porcelain"]);
  const lines = (porcelain ?? "").split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
  // Worktree provisioning: a node_modules SYMLINK is untracked here because .gitignore's `node_modules/` pattern
  // matches directories only. Exactly that one line is exempted, visibly; every other line keeps the tree dirty.
  const nodeModulesIsLink = ((): boolean => {
    try {
      return lstatSync(join(REPO, "node_modules")).isSymbolicLink();
    } catch {
      return false;
    }
  })();
  const exempt = (line: string): boolean => nodeModulesIsLink && line === "?? node_modules";
  if (lines.some(exempt)) diagnostics.push("revision: untracked node_modules symlink (worktree provisioning) exempted from the dirty computation");
  const dirtyLines = lines.filter((line) => !exempt(line));
  const dirty = porcelain === undefined || dirtyLines.length > 0;
  return { head: headKnown ? headRaw : "unknown", dirty, toplevel: basename(toplevelRaw === "" ? "unknown" : toplevelRaw), committedTree: headKnown && toplevelMatches && !dirty };
}
const distHostBlock = { path: basename(DIST_HOST), realpath: realpathSync(DIST_HOST) === DIST_HOST, sha256: sha256Of(DIST_HOST) };

afterAll(async () => {
  // Backstop only: the teardown row stops every host by the shutdown verb; anything it missed is retried here.
  seamPhase = "teardown";
  for (const id of launched) {
    if (stopped.has(id)) continue;
    try {
      await handleOf(id).shutdown(`detached-control-live afterAll backstop for ${id}`);
      stopped.add(id);
    } catch {
      // transport loss here means the host is already gone or stopping; the teardown row recorded the truth
    }
  }
  if (!emitted) {
    const bail = { contract: "workbench.detached-control-live/v1", realised: false, pass: false, diagnostics: ["the live journey never reached emission; the failing rows above name the cause"], journeyKeys: Object.keys(journeys) };
    process.stdout.write(`\nDETACHED_CONTROL_LIVE_RECEIPT ${JSON.stringify(bail)}\n`);
  }
  if (savedTmpdir === undefined) delete process.env.TMPDIR;
  else process.env.TMPDIR = savedTmpdir;
  removeScratch(scratch);
});

describe("live local-detached adverse cancellation journey (wb-0kg.8)", () => {
  it("J-A (AC1): a real observing reader process closes; the running child is not cancelled and its one effect marker stands", async () => {
    const id = "dcl-observer";
    const receipt = await launch(id);
    const handle = handleOf(id);
    const live = await until(
      async () => ({ snapshot: await handle.inspect(), markers: markerCount(id) }),
      (state) => state.snapshot.observation === "observed-running" && state.markers >= 1,
    );
    expect(live.ok, "host O must reach observed-running with its effect marker").toBe(true);
    await seedProjection(id);
    const markersAtClose = markerCount(id);
    const reader = await readerProcess(id);
    await sleep(600);
    const after = await handle.inspect();
    const markersAfterClose = markerCount(id);
    const auditAfterClose = Array.isArray(after.controlAudit) ? after.controlAudit : [];
    const ledger = tasks.get(id)?.controlAudit?.receipts ?? [];
    journeys["observer-close"] = {
      realised: live.ok && reader.code === 0 && reader.report.attached === true,
      detail: `reader process exited ${String(reader.code)} after two inspects; the child kept running`,
      invocationId: id,
      hostPid: receipt.pid,
      readerExit: { code: reader.code, signal: reader.signal },
      readerAttached: reader.report.attached === true,
      markersAtClose,
      markersAfterClose,
      markersFinal: markerCount(id),
      postCloseObservation: after.observation,
      hostControlAuditAfterClose: auditAfterClose,
      readerSeamCancelCalls: reader.report.observerCancelCalls ?? -1,
      readerSeamShutdownCalls: reader.report.observerShutdownCalls ?? -1,
      wiringLedgerCancelEntries: ledger.length,
    };
    expect(reader.code).toBe(0);
    expect(reader.report.attached).toBe(true);
    expect(reader.report.observerCancelCalls).toBe(0);
    expect(reader.report.observerShutdownCalls).toBe(0);
    expect(after.observation).toBe("observed-running");
    expect(after.cancellationRequested).toBe(false);
    expect(auditAfterClose).toEqual([]);
    expect(markersAtClose).toBe(1);
    expect(markersAfterClose).toBe(1);
    expect(ledger).toEqual([]);
  }, 120_000);

  it("J-B (AC2/AC3): non-owner, observer-only and missing-exact-grant cancels are typed denials with zero socket traffic", async () => {
    const id = "dcl-observer";
    const handle = handleOf(id);
    const target = targetOf(id);
    const statsBefore = JSON.stringify(projection.stats());
    async function denialCase(context: ExtensionContext, grants: string[], expectedPolicy: string, expectedGrant?: string): Promise<JourneyRecord> {
      grantsList = grants;
      const before = seamSnapshot();
      const auditBefore = await auditLengthOf(id);
      const reply = await call(context, { target, action: "cancel", confirmed: true }, `live-dcl-${expectedPolicy}`);
      const auditAfter = await auditLengthOf(id);
      const post = await handle.inspect();
      const control = asRecord(reply.control);
      const record: JourneyRecord = {
        realised: true,
        detail: `typed ${expectedPolicy} denial with zero socket traffic`,
        reply: {
          ok: reply.ok,
          invoked: reply.invoked,
          status: reply.status,
          control: {
            status: control.status,
            category: control.category,
            policy: control.policy,
            effect: control.effect,
            reason: control.reason,
            ...(control.requiredGrant !== undefined ? { requiredGrant: control.requiredGrant } : {}),
          },
          error: reply.error ?? { code: "absent", category: "absent", message: "absent" },
        },
        connectCallsDelta: verbCounts.connect - before.connect,
        hostControlAuditLengthDelta: auditAfter - auditBefore,
        seamCancelCalls: verbCounts.cancel - before.cancel,
        seamShutdownCalls: verbCounts.shutdown - before.shutdown,
        projectionMutated: JSON.stringify(projection.stats()) !== statsBefore,
        postDenialObservation: post.observation,
      };
      expect(reply.ok).toBe(false);
      expect(reply.invoked).toBe(false);
      expect(reply.status).toBe("refused");
      expect(reply.error?.code).toBe(expectedPolicy);
      expect(control.status).toBe("denied");
      expect(control.category).toBe("authorization");
      expect(control.policy).toBe(expectedPolicy);
      expect(control.effect).toBe("none");
      if (expectedGrant !== undefined) expect(control.requiredGrant).toBe(expectedGrant);
      expect(verbCounts.connect - before.connect).toBe(0);
      expect(auditAfter - auditBefore).toBe(0);
      expect(verbCounts.cancel - before.cancel).toBe(0);
      expect(verbCounts.shutdown - before.shutdown).toBe(0);
      expect(post.observation).toBe("observed-running");
      return record;
    }
    journeys["non-owner-denial"] = await denialCase(strangerContext, [...FULL_GRANTS], "cross-scope");
    journeys["observer-only-denial"] = await denialCase(ownerContext, ["observe:local-detached.invocation"], "observer-only");
    journeys["missing-grant-denial"] = await denialCase(
      ownerContext,
      ["observe:local-detached.invocation", "control:local-detached.shutdown"],
      "missing-exact-grant",
      "control:local-detached.cancel",
    );
    grantsList = [...FULL_GRANTS];
    expect(JSON.stringify(projection.stats())).toBe(statsBefore);
    expect(markerCount(id)).toBe(1);
  }, 120_000);

  it("J-C (AC2/AC3): the owner cancel through the wired path echoes the host; the cancelled terminal is read only from inspect", async () => {
    const id = "dcl-observer";
    const handle = handleOf(id);
    grantsList = [...FULL_GRANTS];
    const othersBefore = await liveOthersAuditEntries(id);
    const before = seamSnapshot();
    const reply = await call(ownerContext, { target: targetOf(id), action: "cancel", confirmed: true }, "live-dcl-owner-cancel");
    const seamCancelCalls = verbCounts.cancel - before.cancel;
    const connectCallsDelta = verbCounts.connect - before.connect;
    const othersAfter = await liveOthersAuditEntries(id);
    const echo = lastEcho(id, "cancel");
    const first = await handle.inspect();
    const terminalWait = await until(() => handle.inspect(), reachedTerminal);
    const hostTerminal = typeof terminalWait.value.terminal === "string" ? terminalWait.value.terminal : "none";
    const auditEntries = (Array.isArray(terminalWait.value.controlAudit) ? terminalWait.value.controlAudit : []).map((entry) => {
      const row = asRecord(entry);
      return { command: row.command, accepted: row.accepted, ownership: row.ownership, terminalConfirmed: row.terminalConfirmed };
    });
    const ledgerPhases = (tasks.get(id)?.controlAudit?.receipts ?? []).map((receipt) => receipt.phase);
    const control = asRecord(reply.control);
    const requested = asRecord(control.requested);
    const acknowledged = asRecord(control.acknowledged);
    const resultBlock = asRecord(control.result);
    journeys["owner-cancel"] = {
      realised: terminalWait.ok,
      detail: "owner cancel through the wired path; the terminal came only from a later inspect snapshot",
      invocationId: id,
      reply: {
        ok: reply.ok,
        invoked: reply.invoked,
        status: reply.status,
        requested: {
          requestId: requested.requestId,
          policy: requested.policy,
          invocationId: requested.invocationId,
          ownershipConfirmationRef: requested.ownershipConfirmationRef,
          decidedAt: requested.decidedAt,
        },
        acknowledged: { acknowledgedAt: acknowledged.acknowledgedAt, nativeAckRef: acknowledged.nativeAckRef },
        result: { outcome: resultBlock.outcome, nativeResultRef: resultBlock.nativeResultRef, settledAt: resultBlock.settledAt },
        completionBasis: control.completionBasis,
      },
      echo: { accepted: echo.accepted === true, terminalConfirmed: echo.terminalConfirmed === true },
      seamCancelCalls,
      connectCallsDelta,
      cancellationRequestedAtFirstInspect: first.cancellationRequested === true,
      hostTerminal,
      hostTerminalSource: "inspect-snapshot",
      hostControlAudit: auditEntries,
      otherHostsControlAuditEntries: othersAfter - othersBefore,
      wiringLedgerPhases: ledgerPhases,
      markersFinal: markerCount(id),
    };
    expect(reply.ok).toBe(true);
    expect(reply.invoked).toBe(true);
    expect(reply.status).toBe("settled");
    expect(String(requested.requestId)).toMatch(/^ctl_[a-f0-9]{32}$/);
    expect(String(requested.ownershipConfirmationRef)).toMatch(/^local-detached:[a-f0-9]{48}:[0-9]+:local-os:uid:[0-9]+$/);
    expect(acknowledged.nativeAckRef).toBe(`local-detached:${id}:${hostInstanceOf(id)}:cancel:accepted`);
    expect(resultBlock.outcome).toBe("unknown");
    expect(resultBlock.nativeResultRef).toBe(`local-detached:${id}:${hostInstanceOf(id)}:cancel:terminalConfirmed=false`);
    expect(control.completionBasis).toBe("producer-reported");
    expect(echo).toEqual({ accepted: true, terminalConfirmed: false });
    expect(seamCancelCalls).toBe(1);
    expect(connectCallsDelta).toBe(1);
    expect(first.cancellationRequested).toBe(true);
    expect(hostTerminal).toBe("cancelled");
    expect(auditEntries).toEqual([{ command: "cancel", accepted: true, ownership: "owned-local-interpreter-only", terminalConfirmed: false }]);
    expect(ledgerPhases).toEqual(["requested", "result"]);
    expect(othersAfter - othersBefore).toBe(0);
    expect(markerCount(id)).toBe(1);
  }, 120_000);

  it("J-D (AC4): a mid-journey revoked grant denies the next cancel while observation keeps serving and minted receipts stand", async () => {
    const a = "dcl-revoke-a";
    const b = "dcl-revoke-b";
    await launch(a);
    const liveA = await until(async () => ({ snapshot: await handleOf(a).inspect(), markers: markerCount(a) }), (state) => state.snapshot.observation === "observed-running" && state.markers >= 1);
    expect(liveA.ok, "host R1 must reach observed-running with its effect marker").toBe(true);
    await launch(b);
    const liveB = await until(async () => ({ snapshot: await handleOf(b).inspect(), markers: markerCount(b) }), (state) => state.snapshot.observation === "observed-running" && state.markers >= 1);
    expect(liveB.ok, "host R2 must reach observed-running with its effect marker").toBe(true);
    await seedProjection(a);
    await seedProjection(b);
    grantsList = [...FULL_GRANTS];
    const othersBefore = await liveOthersAuditEntries(a);
    const replyA = await call(ownerContext, { target: targetOf(a), action: "cancel", confirmed: true }, "live-dcl-revoke-first");
    const othersAfter = await liveOthersAuditEntries(a);
    const firstInspectA = await handleOf(a).inspect();
    const terminalA = await until(() => handleOf(a).inspect(), reachedTerminal);
    const controlA = asRecord(replyA.control);
    const requestedA = asRecord(controlA.requested);
    const resultA = asRecord(controlA.result);
    const mintedBefore = JSON.stringify(tasks.get(a)?.controlAudit?.receipts ?? []);
    grantsList = ["observe:local-detached.invocation", "control:local-detached.shutdown"];
    const grantsReadsBefore = grantsReadCount;
    const before = seamSnapshot();
    const replyB = await call(ownerContext, { target: targetOf(b), action: "cancel", confirmed: true }, "live-dcl-revoked");
    const connectDelta = verbCounts.connect - before.connect;
    const controlB = asRecord(replyB.control);
    const bInspect = await handleOf(b).inspect();
    const queryServes = projection.query({ scope: { ...SCOPE }, ref: targetOf(b), limit: 1 }).nodes.length === 1;
    const relationsServe = projection.relations({ scope: { ...SCOPE } }).length >= 1;
    const mintedAfter = JSON.stringify(tasks.get(a)?.controlAudit?.receipts ?? []);
    grantsList = [...FULL_GRANTS];
    journeys["revoked-grant"] = {
      realised: liveA.ok && liveB.ok && terminalA.ok,
      detail: "revocation denied the next cancel typed; the already-minted receipts were re-read byte-identical",
      first: {
        invocationId: a,
        requestId: requestedA.requestId,
        outcome: resultA.outcome,
        nativeResultRef: resultA.nativeResultRef,
        hostTerminal: typeof terminalA.value.terminal === "string" ? terminalA.value.terminal : "none",
      },
      revokedReply: {
        ok: replyB.ok,
        invoked: replyB.invoked,
        status: replyB.status,
        policy: controlB.policy,
        category: controlB.category,
        effect: controlB.effect,
        requiredGrant: controlB.requiredGrant,
        reason: controlB.reason,
      },
      connectCallsDeltaAfterRevoke: connectDelta,
      r2ControlAuditLength: Array.isArray(bInspect.controlAudit) ? bInspect.controlAudit.length : -1,
      r2Observation: bInspect.observation,
      r2MarkersFinal: markerCount(b),
      projectionReadsServed: queryServes && relationsServe,
      mintedReceiptsUnchanged: mintedAfter === mintedBefore,
      grantsReadCount,
      otherHostsControlAuditDelta: othersAfter - othersBefore,
    };
    expect(replyA.ok).toBe(true);
    expect(replyA.status).toBe("settled");
    expect(resultA.outcome).toBe("unknown");
    expect(resultA.nativeResultRef).toBe(`local-detached:${a}:${hostInstanceOf(a)}:cancel:terminalConfirmed=false`);
    expect(firstInspectA.cancellationRequested).toBe(true);
    expect(terminalA.value.terminal).toBe("cancelled");
    expect(othersAfter - othersBefore).toBe(0);
    expect(replyB.ok).toBe(false);
    expect(replyB.invoked).toBe(false);
    expect(replyB.status).toBe("refused");
    expect(replyB.error?.code).toBe("missing-exact-grant");
    expect(controlB.policy).toBe("missing-exact-grant");
    expect(controlB.requiredGrant).toBe("control:local-detached.cancel");
    expect(connectDelta).toBe(0);
    expect(bInspect.controlAudit).toEqual([]);
    expect(bInspect.observation).toBe("observed-running");
    expect(markerCount(b)).toBe(1);
    expect(queryServes).toBe(true);
    expect(relationsServe).toBe(true);
    expect(mintedAfter).toBe(mintedBefore);
    expect(grantsReadCount - grantsReadsBefore).toBeGreaterThanOrEqual(1);
    expect(grantsReadCount).toBeGreaterThanOrEqual(2);
  }, 180_000);

  it("J-E (AC5): shutdown surfaces unresolvedEffects typed on a running and an idle host; afterwards only unknown-with-reconcile", async () => {
    const s = "dcl-shutdown-running";
    const i = "dcl-shutdown-idle";
    await launch(s);
    const liveS = await until(async () => ({ snapshot: await handleOf(s).inspect(), markers: markerCount(s) }), (state) => state.snapshot.observation === "observed-running" && state.markers >= 1);
    expect(liveS.ok, "host S must reach observed-running with its effect marker").toBe(true);
    await launch(i, { autoStart: false });
    await seedProjection(s);
    await seedProjection(i);
    grantsList = [...FULL_GRANTS];
    const replyS = await call(ownerContext, { target: targetOf(s), action: "shutdown", confirmed: true }, "live-dcl-shutdown-running");
    const echoS = lastEcho(s, "shutdown");
    const replyI = await call(ownerContext, { target: targetOf(i), action: "shutdown", confirmed: true }, "live-dcl-shutdown-idle");
    const echoI = lastEcho(i, "shutdown");
    stopped.add(s);
    stopped.add(i);
    const resultS = asRecord(asRecord(replyS.control).result);
    const resultI = asRecord(asRecord(replyI.control).result);
    const post = await until(() => handleOf(s).inspect(), (snapshot) => snapshot.source === "local-client-transport", 8000);
    const postIdle = await until(() => handleOf(i).inspect(), (snapshot) => snapshot.source === "local-client-transport", 8000);
    const hint = typeof post.value.reconcileHint === "string" && /never.*retry|do not.*retry/i.test(post.value.reconcileHint);
    const auditEntriesOf = (id: string): number => tasks.get(id)?.controlAudit?.receipts.length ?? -1;
    const eventsAgree = (id: string, nativeResultRef: unknown): boolean => {
      const { events } = projection.events({ scope: { ...SCOPE }, limit: 10, ref: targetOf(id) });
      const kinds = events.map((event) => event.kind);
      const result = events.find((event) => event.kind === "control.result");
      return kinds.includes("control.requested") && kinds.includes("control.result") && (result?.evidenceRefs ?? []).includes(`native-result:${String(nativeResultRef)}`);
    };
    const projectionEventsMatchReply = eventsAgree(s, resultS.nativeResultRef) && eventsAgree(i, resultI.nativeResultRef);
    journeys["shutdown-unresolved"] = {
      realised: liveS.ok && post.ok && postIdle.ok,
      detail: "shutdown reported unresolvedEffects true for the running host and false for the idle host",
      running: {
        invocationId: s,
        echo: { accepted: echoS.accepted === true, unresolvedEffects: echoS.unresolvedEffects === true },
        outcome: resultS.outcome,
        nativeResultRef: resultS.nativeResultRef,
        taskControlAuditEntries: auditEntriesOf(s),
      },
      idle: {
        invocationId: i,
        echo: { accepted: echoI.accepted === true, unresolvedEffects: echoI.unresolvedEffects === true },
        outcome: resultI.outcome,
        nativeResultRef: resultI.nativeResultRef,
        taskControlAuditEntries: auditEntriesOf(i),
      },
      postShutdownInspect: {
        observation: post.value.observation,
        source: post.value.source,
        terminal: typeof post.value.terminal === "string" ? post.value.terminal : "none",
        reconcileHint: hint,
      },
      projectionEventsMatchReply,
    };
    expect(replyS.ok).toBe(true);
    expect(replyS.status).toBe("settled");
    expect(echoS).toEqual({ accepted: true, unresolvedEffects: true });
    expect(resultS.outcome).toBe("unknown");
    expect(resultS.nativeResultRef).toBe(`local-detached:${s}:${hostInstanceOf(s)}:shutdown:unresolvedEffects=true`);
    expect(replyI.ok).toBe(true);
    expect(replyI.status).toBe("settled");
    expect(echoI).toEqual({ accepted: true, unresolvedEffects: false });
    expect(resultI.outcome).toBe("completed");
    expect(resultI.nativeResultRef).toBe(`local-detached:${i}:${hostInstanceOf(i)}:shutdown:unresolvedEffects=false`);
    expect(post.ok).toBe(true);
    expect(postIdle.ok).toBe(true);
    expect(post.value.observation).toBe("unknown");
    expect(post.value.terminal).toBe("unknown");
    expect(hint).toBe(true);
    expect(auditEntriesOf(s)).toBe(2);
    expect(auditEntriesOf(i)).toBe(2);
    expect(projectionEventsMatchReply).toBe(true);
  }, 180_000);

  it("J-F + teardown: the strict booted-tool reading is declared UNREALISED (wb-79k.3); every host leaves by the shutdown verb; the receipt is emitted and clean", async () => {
    journeys["strict-booted-tool"] = {
      realised: false,
      detail:
        "UNREALISED (wb-79k.3 HELD): no src ingestion of detached readings — the src/index.ts projection writers are furnace_observe and the embedded workflow only, so the booted workflow_control denies local-detached targets cross-scope; the Pi launcher additionally pins launch permissions to inspect+execute and reports a host-instance ref where the reader states host-process.",
    };
    expect(String(journeys["strict-booted-tool"].detail)).toContain(STRICT_BOOTED_CITATION);
    seamPhase = "teardown";
    const hostsStopped: string[] = [];
    const leftovers: string[] = [];
    for (const id of launched) {
      if (stopped.has(id)) {
        hostsStopped.push(id);
        continue;
      }
      try {
        await handleOf(id).shutdown(`detached-control-live teardown of ${id}`);
        stopped.add(id);
        hostsStopped.push(id);
      } catch (error) {
        leftovers.push(`${id} shutdown verb failed: ${error instanceof Error ? error.message.slice(0, 120) : "unknown"}`);
      }
    }
    const socketsUnlinked: string[] = [];
    for (const id of launched) {
      const receipt = receipts.get(id);
      if (!receipt) {
        leftovers.push(`${id} has no launch receipt`);
        continue;
      }
      const gone = await until(async () => !existsSync(receipt.socketPath), (state) => state, 6000);
      if (!gone.ok) {
        leftovers.push(`${id} socket still bound: ${basename(receipt.socketPath)}`);
        continue;
      }
      const socketDirectory = dirname(receipt.socketPath);
      if (/^pw-[0-9]+-/.test(basename(socketDirectory)) && existsSync(socketDirectory)) {
        leftovers.push(`${id} per-launch socket directory survived: ${basename(socketDirectory)}`);
        continue;
      }
      socketsUnlinked.push(basename(receipt.socketPath));
    }
    const receipt = buildDetachedControlLiveReceipt({
      utc: nowIso(),
      revision: revisionBlock(),
      node: process.version,
      arch: process.arch,
      platform: process.platform,
      commands: {
        build: "npm run build",
        vitest: "./node_modules/.bin/vitest run --config vitest.detached-control-live.config.ts",
        forge: "forge run detached-control-live",
      },
      distHost: distHostBlock,
      launchProfile: { permissions: ["inspect", "execute", "cancel", "shutdown"], deviatesFromPiTool: true },
      journeys,
      markerCounts: allMarkerCounts(),
      verbCounts: { ...verbCounts, teardown: { ...teardownVerbCounts } },
      teardown: { hostsStopped, socketsUnlinked, leftovers },
      diagnostics,
    });
    emitted = true;
    liveReceiptJson = JSON.stringify(receipt);
    if (process.env.DETACHED_CONTROL_LIVE_RECEIPT) writeFileSync(process.env.DETACHED_CONTROL_LIVE_RECEIPT, `${liveReceiptJson}\n`);
    process.stdout.write(`\nDETACHED_CONTROL_LIVE_RECEIPT ${liveReceiptJson}\n`);
    expect(leftovers).toEqual([]);
    expect(hostsStopped.length).toBe(launched.length);
    expect(receipt.realised).toBe(true);
    expect(receipt.findings).toEqual([]);
    expect(receipt.pass).toBe(true);
  }, 180_000);
});
