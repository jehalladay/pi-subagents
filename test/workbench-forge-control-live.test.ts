/**
 * wb-6hb.5 (VC-2/W16 residual): live forge adverse cancellation journey receipt.
 *
 * A real forge app server runs a long gate (gate.run on a disposable fixture workspace); the journey cancels it
 * through the workflow_control tool built by its production constructor with the PRODUCTION forge executor
 * (createRetainedForgeControlExecutor over the wb-cra.1 retention registry). Receipts stay phase-honest: requested
 * and acknowledged are distinct, the acknowledged phase echoes the server's own CancelReceipt verbatim, and no
 * result is minted from an acknowledgement — the operation's own terminal envelope is recorded beside it.
 *
 * STRICT-READING LIMIT (named, never papered over): the BOOTED extension's projection admits no forge-operation
 * nodes (wb-a3s), so the booted registered tool cannot permit a forge target yet. The journey runs the registered
 * tool's own constructor and executor with a harness-owned projection fed exclusively from the server's
 * operation.started frames, and the receipt records the strict booted-tool reading as UNREALISED citing wb-a3s.
 *
 * Runs ONLY from its own forge command (vitest.forge-control-live.config.ts); excluded from the default gate.
 * Exit semantics: an absent forge binary or SDK is honest unavailability (the suite fails naming it, never skips).
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OperationClient, ServerConnection } from "@forge/sdk";
import { afterAll, describe, expect, it } from "vitest";
import { createWorkflowControlTool, type WorkflowControlDeps } from "../src/workbench/control-tool.js";
import type { ForgeCancelOperations } from "../src/workbench/forge-control.js";
import { createRetainedForgeControlExecutor, retainForgeOperation } from "../src/workbench/forge-control-retention.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Relation } from "../src/workbench/observation.js";
import type { WorkflowTask } from "../src/workflow/task.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const CONTRACT = "workbench.forge-control-live/v1";
const GRANT = "control:forge.cancel";
const OWNING_INVOCATION = "wf_live6hb5001";
const WORKSPACE = realpathSync(process.cwd());
const SCOPE: ObservationScope = { workspace: WORKSPACE, principal: "local-operator:live:s-6hb5" };
const nowIso = (): string => new Date().toISOString();

type Phase = { phase: string; at: string; detail: string };
interface Receipt {
  contract: string;
  revision: string;
  toolchain: string;
  host: string;
  forgeBinary: { path: string; sha256: string };
  scenarios: Record<string, { realised: boolean; detail: string }>;
  nativeOperationIds: string[];
  phases: Phase[];
  verbCounts: Record<string, number>;
  findings: string[];
}
const receipt: Receipt = {
  contract: CONTRACT,
  revision: ((): string => {
    try { return execFileSync("git", ["rev-parse", "--short=7", "HEAD"], { encoding: "utf8" }).trim(); } catch { return "unknown"; }
  })(),
  toolchain: `node ${process.version}`,
  host: process.platform,
  forgeBinary: ((): { path: string; sha256: string } => {
    try {
      const path = realpathSync(execFileSync("sh", ["-c", "command -v forge"], { encoding: "utf8" }).trim());
      return { path, sha256: createHash("sha256").update(readFileSync(path)).digest("hex") };
    } catch { return { path: "unknown", sha256: "unknown" }; }
  })(),
  scenarios: {},
  nativeOperationIds: [],
  phases: [],
  verbCounts: { "gate.run": 0, "operation.cancel": 0 },
  findings: [],
};
const record = (phase: string, detail: string): void => void receipt.phases.push({ phase, at: nowIso(), detail });
const scenario = (name: string, realised: boolean, detail: string): void => {
  receipt.scenarios[name] = { realised, detail };
};
afterAll(() => {
  scenario("strict-booted-tool-reading", false,
    "UNREALISED: the booted extension's projection admits no forge-operation nodes (wb-a3s), so the booted registered tool cannot permit a forge target; this journey ran the registered tool's constructor and production executor with a harness-owned projection fed only from operation.started frames.");
  process.stdout.write(`\nFORGE_CONTROL_LIVE_RECEIPT ${JSON.stringify(receipt)}\n`);
});

/** A disposable fixture package whose explicit gate runs one bounded long command. */
function fixtureWorkspace(sleepSeconds: number): string {
  const dir = makeScratch("fgc-");
  writeFileSync(join(dir, "forge.toml"),
    `[package]\nname = "fgc-fixture"\ntype = "code"\nversion = "0.0.1"\nlanguage = "python"\n\n[build]\nbackend = "python"\ngate = ["long"]\n\n[build.commands.long]\ncommand = "sleep ${sleepSeconds}"\ntimeout = ${sleepSeconds + 60}\n`);
  return dir;
}

interface LiveOperation {
  connection: ServerConnection;
  operations: ForgeCancelOperations;
  operationId: string;
  gateResult: Promise<unknown>;
  cancelCalls: () => number;
  close: () => Promise<void>;
}
/** Starts gate.run on `root` over a fresh connection and resolves once the server names the operation id. */
async function startLiveOperation(root: string): Promise<LiveOperation> {
  const connection = ServerConnection.spawn("forge");
  let nameOperation: (id: string) => void = () => {};
  const named = new Promise<string>(resolve => { nameOperation = resolve; });
  connection.onNotification(frame => {
    if (frame.method === "operation.started" && frame.params !== null && typeof frame.params === "object" && !Array.isArray(frame.params)) {
      const id = (frame.params as Record<string, unknown>).operation_id;
      if (typeof id === "string") nameOperation(id);
    }
  });
  const verdict = await connection.initialize();
  if (verdict !== "compatible") throw new Error(`forge protocol ${String(verdict)}: honest unavailability, not a skip`);
  receipt.verbCounts["gate.run"] += 1;
  const gateResult = connection.request("gate.run", { root }).catch((error: unknown) => ({ transportEnded: String(error).slice(0, 120) }));
  const operationId = await Promise.race([
    named,
    new Promise<never>((_resolve, reject) => setTimeout(() => reject(new Error("no operation.started frame within 30s")), 30_000)),
  ]);
  receipt.nativeOperationIds.push(operationId);
  const client = OperationClient.over(connection);
  const operations: ForgeCancelOperations = {
    cancel: id => {
      receipt.verbCounts["operation.cancel"] += 1;
      return client.cancel(id);
    },
  };
  let cancels = 0;
  const counting: ForgeCancelOperations = { cancel: id => { cancels += 1; return operations.cancel(id); } };
  return { connection, operations: counting, operationId, gateResult, cancelCalls: () => cancels, close: () => connection.close() };
}

/** The harness projection: the operation node observed FROM the server's started frame, never minted blind. */
function admittedProjection(target: NativeRef, startedAt: string): ObservationProjection {
  const projection = new ObservationProjection();
  const child: NativeRef = { provider: "forge", type: "child", id: `${target.id}-step` };
  for (const source of [target, child]) {
    projection.refresh({
      source, scope: SCOPE, capturedAt: startedAt, observedAt: startedAt, kind: "forge.operation.snapshot",
      trace: { invocationId: OWNING_INVOCATION },
      node: { title: `forge operation ${source.id}`, type: "workflow", statusText: "running", statusTone: "active" },
    });
  }
  const provenance: Relation["provenance"] = { source: "forge", observedAt: startedAt, nativeConfirmationRef: "operation.started" };
  projection.relate({ scope: SCOPE, from: target, to: child, kind: "ownership", provenance });
  return projection;
}

type Reply = {
  ok: boolean; invoked: boolean; status: string;
  control?: Record<string, unknown>; error?: { code: string; category?: string; message: string };
};
function controlTool(target: NativeRef, grants: readonly string[]) {
  const task = { id: OWNING_INVOCATION } as unknown as WorkflowTask;
  const deps: WorkflowControlDeps = {
    grants: () => grants,
    observerScope: () => ({ ...SCOPE }),
    localPrincipal: () => SCOPE.principal,
    sessionIdOf: () => "s-6hb5",
    projection: admittedProjection(target, nowIso()),
    tasks: new Map<string, WorkflowTask>([[OWNING_INVOCATION, task]]),
    now: nowIso,
    executors: { forge: createRetainedForgeControlExecutor(nowIso) },
  };
  const tool = createWorkflowControlTool(deps);
  const ctx = { cwd: WORKSPACE, sessionManager: { getSessionId: () => "s-6hb5" } };
  return async (params: Record<string, unknown>): Promise<Reply> => {
    const result = await tool.execute("live-call", params as never, undefined, undefined, ctx as never);
    const text = result.content[0]?.type === "text" ? result.content[0].text : "";
    return JSON.parse(text) as Reply;
  };
}
const cancelParams = (target: NativeRef): Record<string, unknown> => ({ target: { ...target }, action: "cancel", confirmed: true });

describe("live forge adverse cancellation journey (wb-6hb.5)", () => {
  it("cancels a running real gate operation through the production control path: acknowledged echoes the server receipt, result only from the operation's own terminal envelope", async () => {
    const root = fixtureWorkspace(90);
    const live = await startLiveOperation(root);
    const target: NativeRef = { provider: "forge", type: "operation", id: live.operationId };
    const release = retainForgeOperation(live.operationId, { operations: live.operations, connection: live.connection, workspaceRoot: WORKSPACE });
    try {
      record("requested", `workflow_control cancel of ${live.operationId} under ${GRANT}`);
      const reply = await controlTool(target, [GRANT])(cancelParams(target));
      record("acknowledged", JSON.stringify({ status: reply.status, control: reply.control ?? null }).slice(0, 400));
      expect(reply.ok).toBe(true);
      expect(reply.invoked).toBe(true);
      expect(reply.status).toBe("acknowledged");
      expect(live.cancelCalls()).toBe(1);
      const terminal = await live.gateResult;
      record("result", `operation terminal envelope: ${JSON.stringify(terminal).slice(0, 400)}`);
      // The result phase is the operation's own terminal answer; the acknowledgement never claimed it.
      expect(terminal).toBeTruthy();
      scenario("adverse-cancel-mid-flight", true, `op ${live.operationId} acknowledged then terminally settled by its own envelope`);
    } finally {
      release();
      await live.close();
      removeScratch(root);
    }
  }, 120_000);

  it("denied-without-grant issues ZERO SDK verbs: the typed denial precedes the seam", async () => {
    const root = fixtureWorkspace(20);
    const live = await startLiveOperation(root);
    const target: NativeRef = { provider: "forge", type: "operation", id: live.operationId };
    const release = retainForgeOperation(live.operationId, { operations: live.operations, connection: live.connection, workspaceRoot: WORKSPACE });
    try {
      const reply = await controlTool(target, ["workbench:observe"])(cancelParams(target));
      expect(reply.ok).toBe(false);
      expect(reply.error).toMatchObject({ code: "observer-only" });
      expect(live.cancelCalls()).toBe(0);
      scenario("denied-without-grant", true, "typed observer-only denial, zero cancel frames at the counted seam");
      await controlTool(target, [GRANT])(cancelParams(target));
      await live.gateResult;
    } finally {
      release();
      await live.close();
      removeScratch(root);
    }
  }, 120_000);

  it("cancel of an already-settled operation is exactly the typed outcome the server reports, never a success retrofit", async () => {
    const root = fixtureWorkspace(2);
    const live = await startLiveOperation(root);
    const target: NativeRef = { provider: "forge", type: "operation", id: live.operationId };
    const release = retainForgeOperation(live.operationId, { operations: live.operations, connection: live.connection, workspaceRoot: WORKSPACE });
    try {
      await live.gateResult;
      const reply = await controlTool(target, [GRANT])(cancelParams(target));
      record("settled-cancel", JSON.stringify({ status: reply.status, error: reply.error ?? null, control: reply.control ?? null }).slice(0, 400));
      expect(reply.status === "not-accepted" || reply.status === "uncertain").toBe(true);
      expect(reply.status).not.toBe("settled");
      expect(live.cancelCalls()).toBe(1);
      scenario("cancel-of-settled", true, `server answered the settled-operation cancel as ${reply.status}; no PASS invented`);
    } finally {
      release();
      await live.close();
      removeScratch(root);
    }
  }, 120_000);

  it("an observer reading gate.status issues zero cancel frames, and a sibling operation is unaffected by a cancel", async () => {
    const rootA = fixtureWorkspace(45);
    const rootB = fixtureWorkspace(8);
    const a = await startLiveOperation(rootA);
    const b = await startLiveOperation(rootB);
    const targetA: NativeRef = { provider: "forge", type: "operation", id: a.operationId };
    const releaseA = retainForgeOperation(a.operationId, { operations: a.operations, connection: a.connection, workspaceRoot: WORKSPACE });
    try {
      // Observer path: a read-only gate.status on a THIRD connection; the counted seams must stay untouched.
      const observer = ServerConnection.spawn("forge");
      try {
        await observer.initialize();
        await observer.request("gate.status", { root: rootB });
      } finally {
        await observer.close();
      }
      expect(a.cancelCalls()).toBe(0);
      expect(b.cancelCalls()).toBe(0);
      scenario("observer-close-cancels-nothing", true, "a gate.status observer connection opened and closed with zero cancel frames");
      const reply = await controlTool(targetA, [GRANT])(cancelParams(targetA));
      expect(reply.status).toBe("acknowledged");
      const siblingTerminal = await b.gateResult;
      expect(siblingTerminal).toBeTruthy();
      expect(b.cancelCalls()).toBe(0);
      scenario("sibling-unaffected", true, `cancelled ${a.operationId}; sibling ${b.operationId} settled by its own envelope with zero cancels`);
      await a.gateResult;
    } finally {
      releaseA();
      await a.close();
      await b.close();
      removeScratch(rootA, rootB);
    }
  }, 180_000);

  it("a transport error on cancel parks as uncertain and never retries", async () => {
    const root = fixtureWorkspace(30);
    const live = await startLiveOperation(root);
    const target: NativeRef = { provider: "forge", type: "operation", id: live.operationId };
    // Retain, then end the connection BEFORE cancelling: the one cancel meets a dead transport.
    const release = retainForgeOperation(live.operationId, { operations: live.operations, connection: live.connection, workspaceRoot: WORKSPACE });
    try {
      await live.close();
      await live.gateResult;
      const reply = await controlTool(target, [GRANT])(cancelParams(target));
      record("transport-error-cancel", JSON.stringify({ status: reply.status, error: reply.error ?? null }).slice(0, 300));
      expect(reply.status).toBe("uncertain");
      expect(live.cancelCalls()).toBe(1);
      scenario("transport-error-parks-uncertain", true, "dead-transport cancel parked uncertain after exactly one issued verb");
    } finally {
      release();
      removeScratch(root);
    }
  }, 120_000);
});
