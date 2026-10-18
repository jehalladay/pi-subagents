/**
 * wb-a2g.12 R10/R11: the offline REAL-SDK-transport falsifiers behind the live claude interrupt tier
 * (test/workbench-claude-control-live.test.ts). No credential and no network: the REAL createClaudeWorkflowHost retains
 * the REAL Claude Agent SDK Query over its ProcessTransport (the host's documented query seam only pins the stub
 * executable, the abort-ack-grace pattern), against a child process this file controls, and the landed adapter
 * (executeClaudeControl) is driven over the host's own retained seam. What these rows measure is the offline half of the
 * live tier's two UNVERIFIED questions, and the live rows cite these measurements as their prior expectation:
 *
 * R10: a CLI that answers the interrupt control_request with an empty success response makes Query.interrupt() resolve
 *      undefined (the adapter acknowledges with the no-receipt marker); a CLI answering with a still_queued list makes it
 *      resolve the interrupt_receipt_v1 shape (the adapter acknowledges with the counted reference).
 * R11: a CLI that leaves right after system/init closes the Query; an interrupt() issued afterwards rejects with the SDK's
 *      fixed "Query closed before response received" text (the adapter parks uncertain, seam-failure, query-closed).
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { query as sdkQuery } from "@anthropic-ai/claude-agent-sdk";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CLAUDE_INTERRUPT_NO_RECEIPT, type ClaudeControlExecution, type ClaudeInterruptSeam, executeClaudeControl } from "../src/workbench/claude-control.js";
import { type ClaudeCallIdentity, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { type ControlDecision, decideControl } from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import type { WorkflowSpawnRequest, WorkflowSpawnResult } from "../src/workflow/runtime.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

/** The session id the stub reports on system/init: a fixed fake, never a real session. */
const STUB_SESSION = "11111111-2222-4333-8444-555555555555";
const STUB_SURVIVOR = "00000000-0000-4000-8000-000000000001";
/** The SDK's own fixed text when the query closed before the CLI answered a control request (claude-control.ts QUERY_CLOSED). */
const QUERY_CLOSED = "Query closed before response received";

/**
 * Stub Claude Code executable: answers every control request (initialize included) with a success response, emits one
 * system/init frame, then idles or leaves. STUB_INTERRUPT_ANSWER selects the interrupt answer: "empty" (older CLI, no
 * still_queued field) or "receipt" (interrupt_receipt_v1 with one survivor). STUB_EXIT_AFTER_INIT=1 leaves right after init.
 */
const STUB = `
import { createInterface } from "node:readline";
const answer = process.env.STUB_INTERRUPT_ANSWER === "receipt" ? { still_queued: [${JSON.stringify(STUB_SURVIVOR)}] } : {};
const exitAfterInit = process.env.STUB_EXIT_AFTER_INIT === "1";
const send = (message) => process.stdout.write(JSON.stringify(message) + "\\n");
let initSent = false;
createInterface({ input: process.stdin }).on("line", (line) => {
  let message;
  try { message = JSON.parse(line); } catch { return; }
  if (message.type === "control_request") {
    const response = message.request && message.request.subtype === "interrupt" ? answer : {};
    send({ type: "control_response", response: { subtype: "success", request_id: message.request_id, response } });
  }
  if (!initSent) {
    initSent = true;
    send({ type: "system", subtype: "init", session_id: ${JSON.stringify(STUB_SESSION)}, model: "stub", cwd: process.cwd(), tools: [], mcp_servers: [], permissionMode: "dontAsk", apiKeySource: "none", slash_commands: [], output_style: "default", uuid: "11111111-2222-4333-8444-555555555556" });
    if (exitAfterInit) setTimeout(() => process.exit(0), 20);
  }
});
process.stdin.on("end", () => process.exit(0));
setInterval(() => {}, 1000);
`;

const CALL: ClaudeCallIdentity = { agentId: "wf-agent-0", index: 0, label: "wf-agent-0" };
const request: WorkflowSpawnRequest = { agentId: CALL.agentId, index: CALL.index, prompt: "p", label: CALL.label, agentType: "general-purpose" };
const INVOCATION = "inv-faults-1";
const SCOPE: ObservationScope = { workspace: "/tmp/wb-a2g12-faults-scope", principal: "operator" };
const SESSION: NativeRef = { provider: "claude-agent-sdk", type: "session", id: STUB_SESSION };
const AT = "2026-10-17T06:00:00Z";
const nowIso = (): string => new Date().toISOString();

let dir = "";
let stubPath = "";
beforeAll(() => {
  dir = makeScratch("wb-a2g12-faults-");
  stubPath = join(dir, "stub-claude.mjs");
  writeFileSync(stubPath, STUB);
});
afterAll(() => {
  removeScratch(dir);
});

type Answer = { kind: "resolved"; value: unknown } | { kind: "rejected"; message: string };
async function settle(promise: Promise<unknown>): Promise<Answer> {
  try {
    return { kind: "resolved", value: await promise };
  } catch (error) {
    return { kind: "rejected", message: error instanceof Error ? error.message : String(error) };
  }
}

interface Run {
  seam: ClaudeInterruptSeam | undefined;
  result: WorkflowSpawnResult;
  /** The answer of an interrupt() issued at init time, when `interruptAtInit` asked for one. */
  atInit: Answer | undefined;
  done: number;
}
/** One stub-backed query through the real host: the retained seam, the init-time interrupt answer and the host's result. */
async function run(env: Record<string, string>, interruptAtInit: boolean): Promise<Run> {
  const controller = new AbortController();
  let seam: ClaudeInterruptSeam | undefined;
  let atInit: Answer | undefined;
  let pending: Promise<void> | undefined;
  let done = 0;
  const host = createClaudeWorkflowHost({
    cwd: dir,
    signal: controller.signal,
    settingSources: [],
    query: ({ prompt, options }) => sdkQuery({ prompt, options: { ...options, pathToClaudeCodeExecutable: stubPath, env: { ...process.env, ...env } } }),
    onQueryLive: (_call, live) => {
      seam = live;
    },
    onQueryDone: () => {
      done += 1;
    },
    onMessage: message => {
      if (message.type === "system" && message.subtype === "init" && interruptAtInit && pending === undefined && seam !== undefined) {
        pending = settle(seam.interrupt()).then(answer => {
          atInit = answer;
          controller.abort();
        });
      }
    },
  });
  const result = await host.spawnAgent(request);
  await pending;
  return { seam, result, atInit, done };
}

/** A permit for an interrupt of the stub session, minted by the core over a projection seeded the hermetic way (W13-G). */
function permit(invocationId: string): ControlDecision {
  const projection = new ObservationProjection();
  projection.refresh({ source: SESSION, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: "claude-agent-sdk.session.snapshot", node: { title: "stub session", type: "agent", statusText: "observed-running", statusTone: "active" } });
  projection.relate({ scope: SCOPE, from: SESSION, to: { provider: "claude-agent-sdk", type: "agent-call", id: `${INVOCATION}:0` }, kind: "ownership", provenance: { source: "claude-agent-sdk", observedAt: AT, nativeConfirmationRef: STUB_SESSION } });
  const decision = decideControl({
    scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: ["control:claude-agent-sdk.interrupt"], target: { ...SESSION }, action: "interrupt",
    params: { confirmed: true }, invocationId, requestedAt: nowIso(),
  }, { projection, now: nowIso });
  if (decision.decision !== "permitted") throw new Error(`expected a permit, got ${JSON.stringify(decision)}`);
  return decision;
}
const execute = (decision: ControlDecision, seam: ClaudeInterruptSeam): Promise<ClaudeControlExecution> =>
  executeClaudeControl(decision, { seam, call: { invocationId: INVOCATION, index: 0, sessionId: STUB_SESSION }, now: nowIso, timeoutMs: 10_000 });

describe("claude interrupt seam falsifiers over the real SDK transport (wb-a2g.12 R10/R11)", () => {
  it("R10: an interrupt answered by an empty success response resolves undefined through the host's retained seam; the adapter acknowledges it with the no-receipt marker", async () => {
    const first = await run({ STUB_INTERRUPT_ANSWER: "empty" }, true);
    expect(first.seam).toBeDefined();
    expect(first.atInit).toEqual({ kind: "resolved", value: undefined });
    expect(first.result).toMatchObject({ ok: false, skipped: true });
    expect(first.done).toBe(1);
    // The same answer through the landed adapter, over a fresh live query (each permit issues exactly one interrupt).
    const controller = new AbortController();
    let seam: ClaudeInterruptSeam | undefined;
    let execution: Promise<ClaudeControlExecution> | undefined;
    const host = createClaudeWorkflowHost({
      cwd: dir, signal: controller.signal, settingSources: [],
      query: ({ prompt, options }) => sdkQuery({ prompt, options: { ...options, pathToClaudeCodeExecutable: stubPath, env: { ...process.env, STUB_INTERRUPT_ANSWER: "empty" } } }),
      onQueryLive: (_call, live) => { seam = live; },
      onMessage: message => {
        if (message.type === "system" && message.subtype === "init" && execution === undefined && seam !== undefined) {
          execution = execute(permit("inv-faults-r10-empty"), seam).finally(() => controller.abort());
        }
      },
    });
    await host.spawnAgent(request);
    const settled = await execution;
    expect(settled?.status).toBe("acknowledged");
    expect(settled?.acknowledged?.nativeAckRef).toBe(CLAUDE_INTERRUPT_NO_RECEIPT);
    expect(settled?.echo).toEqual({ receipt: "none" });
  }, 30_000);

  it("R10: an interrupt answered with a still_queued list resolves the interrupt_receipt_v1 shape; the adapter acknowledges it with the counted reference and the survivor id", async () => {
    const measured = await run({ STUB_INTERRUPT_ANSWER: "receipt" }, true);
    expect(measured.atInit).toEqual({ kind: "resolved", value: { still_queued: [STUB_SURVIVOR] } });
    expect(measured.result).toMatchObject({ ok: false, skipped: true });
    const controller = new AbortController();
    let seam: ClaudeInterruptSeam | undefined;
    let execution: Promise<ClaudeControlExecution> | undefined;
    const host = createClaudeWorkflowHost({
      cwd: dir, signal: controller.signal, settingSources: [],
      query: ({ prompt, options }) => sdkQuery({ prompt, options: { ...options, pathToClaudeCodeExecutable: stubPath, env: { ...process.env, STUB_INTERRUPT_ANSWER: "receipt" } } }),
      onQueryLive: (_call, live) => { seam = live; },
      onMessage: message => {
        if (message.type === "system" && message.subtype === "init" && execution === undefined && seam !== undefined) {
          execution = execute(permit("inv-faults-r10-receipt"), seam).finally(() => controller.abort());
        }
      },
    });
    await host.spawnAgent(request);
    const settled = await execution;
    expect(settled?.status).toBe("acknowledged");
    expect(settled?.acknowledged?.nativeAckRef).toBe("claude-agent-sdk:interrupt_receipt_v1:still_queued=1");
    expect(settled?.echo).toEqual({ receipt: "interrupt_receipt_v1", stillQueued: 1, stillQueuedIds: [STUB_SURVIVOR], idsTruncated: false });
  }, 30_000);

  it("R11: an interrupt issued after the CLI left and the query closed rejects with the SDK's fixed query-closed text; the adapter parks it uncertain as seam-failure query-closed after exactly one verb", async () => {
    const closed = await run({ STUB_EXIT_AFTER_INIT: "1" }, false);
    expect(closed.seam).toBeDefined();
    expect(closed.result.ok).toBe(false);
    expect(closed.done).toBe(1);
    const seam = closed.seam;
    if (seam === undefined) throw new Error("the host retained no seam");
    const late = await settle(seam.interrupt());
    expect(late).toEqual({ kind: "rejected", message: QUERY_CLOSED });
    let calls = 0;
    const counted: ClaudeInterruptSeam = { interrupt: () => { calls += 1; return seam.interrupt(); } };
    const execution = await execute(permit("inv-faults-r11"), counted);
    expect(execution.status).toBe("uncertain");
    expect(execution.uncertainty).toEqual({ reason: "seam-failure", failure: { category: "query-closed" } });
    expect(execution.acknowledged).toBeUndefined();
    expect(execution.result).toBeUndefined();
    expect(typeof execution.reconcileHint).toBe("string");
    expect(calls).toBe(1);
  }, 30_000);
});
