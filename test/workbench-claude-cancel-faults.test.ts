/**
 * VC-1 / W02-B: the offline cancellation fault-injection tier (wb-a2g.2).
 *
 * The REAL createClaudeWorkflowHost is driven through its documented fixture
 * query seam, and the REAL runWorkflow wherever the runtime is the subject, at
 * each Claude boundary docs/workbench/14 § "Fault-injection locations" names:
 * before and after the SDK session id is first received, during tool
 * execution, and after output streamed but before the final result. Around
 * those sit the late abort that races the result, a pre-aborted host signal,
 * per-agent isolation, host-signal fan-out, the runtime's killed path, and the
 * requested / acknowledged / terminal split docs/workbench/08 insists on
 * ("Cancellation request != accepted cancellation != terminal cancellation").
 *
 * The SDK module is never mocked; there is no Pi AgentManager, no network,
 * no credential and no timer: every wait is on an event the code under test
 * emits, and every cancellation is matched against its exact literal. This is
 * the offline complement of the credential-held live tier wb-a2g.1; it proves
 * fixture behaviour at the seam, never native SDK teardown or rollback.
 */
import { tmpdir } from "node:os";
import { afterEach, describe, expect, it } from "vitest";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import type { WorkflowAgentEntry, WorkflowEntry } from "../src/workflow/progress.js";
import { runWorkflow, type WorkflowHost, type WorkflowSpawnRequest, type WorkflowSpawnResult } from "../src/workflow/runtime.js";
import {
  type AbortPolicy,
  FakeClaudeSdk,
  type FakeClaudeSdkOptions,
  sdkAssistantText,
  sdkAssistantToolUse,
  sdkInit,
  sdkResultSuccess,
  sdkSuccess,
  sdkTextDelta,
} from "./helpers/claude-sdk-stream.js";

/** claude-host.ts: every path that reports an SDK query the host stopped. */
const CANCELLED = "Claude SDK query was cancelled.";
/** runtime.ts onAbort, and the host's refusal to start under an aborted signal. */
const WORKFLOW_ABORTED = "Workflow aborted.";
/** claude-host.ts: a stream that closed without a result while nobody asked it to stop. */
const NO_RESULT = "Claude SDK stream ended without a result message.";

const HEAD = 'export const meta = { name: "cancel-faults", description: "offline cancellation fault injection" };\n';
const CWD = tmpdir();

const fakes: FakeClaudeSdk[] = [];
const runSignals: AbortController[] = [];
afterEach(() => {
  // Nothing a failed case left open may outlive it: close every fixture stream
  // and stop every run (aborting a finished run is a no-op).
  for (const fake of fakes.splice(0)) fake.release();
  for (const run of runSignals.splice(0)) run.abort();
});

function fakeSdk(options?: FakeClaudeSdkOptions): FakeClaudeSdk {
  const fake = new FakeClaudeSdk(options);
  fakes.push(fake);
  return fake;
}

function runSignal(): AbortController {
  const controller = new AbortController();
  runSignals.push(controller);
  return controller;
}

function spawn(agentId: string, index: number): WorkflowSpawnRequest {
  return { agentId, index, prompt: `prompt for ${agentId}`, label: agentId, agentType: "general-purpose" };
}

/** Resolves once `check` holds, re-tested on every `notify()`: event-driven, never a timer. */
function conditions() {
  const waiting: Array<{ check: () => boolean; resolve: () => void }> = [];
  return {
    notify(): void {
      for (const entry of [...waiting]) {
        if (!entry.check()) continue;
        waiting.splice(waiting.indexOf(entry), 1);
        entry.resolve();
      }
    },
    until(check: () => boolean): Promise<void> {
      if (check()) return Promise.resolve();
      return new Promise<void>(resolve => {
        waiting.push({ check, resolve });
      });
    },
  };
}

function agentRows(log: readonly WorkflowEntry[], index: number): WorkflowAgentEntry[] {
  return log.filter((entry): entry is WorkflowAgentEntry => entry.type === "workflow_agent" && entry.index === index);
}

describe("Claude host at the SDK boundary, through the fixture query seam", () => {
  it("F1 cancel before the init message: skipped with no session id, and the stream saw its controller abort", async () => {
    const sdk = fakeSdk({ policy: "reject" });
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });
    const settled = host.spawnAgent(spawn("wf-agent-0", 0));
    const call = await sdk.call(0);
    // The query has started and is waiting for its first message: no session id exists yet.
    await call.parked(0);

    host.abortAgent("wf-agent-0");
    const result = await settled;

    expect(result).toMatchObject({ ok: false, skipped: true, error: CANCELLED });
    expect(result).not.toHaveProperty("sessionId");
    expect(result).not.toHaveProperty("text");
    expect(call.delivered).toEqual([]);
    expect(call.abortEvents).toBe(1);
    expect(call.abortedAtClose).toBe(true);
  });

  it("F2 cancel during tool execution: the cancelled result keeps the session id init reported", async () => {
    const sdk = fakeSdk({ policy: "reject" });
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });
    const settled = host.spawnAgent(spawn("wf-agent-0", 0));
    const call = await sdk.call(0);
    call.push(sdkInit("sdk-f2"), sdkAssistantToolUse("sdk-f2", "toolu_f2", "Read", { file_path: "/tmp/f2.txt" }));
    // The tool call has been handed over; its user tool_result never arrives.
    await call.parked(2);

    host.abortAgent("wf-agent-0");
    const result = await settled;

    expect(result).toMatchObject({ ok: false, skipped: true, error: CANCELLED, sessionId: "sdk-f2" });
    expect(result).not.toHaveProperty("text");
    expect(call.delivered.map(message => message.type)).toEqual(["system", "assistant"]);
    expect(call.abortEvents).toBe(1);
    expect(call.abortedAtClose).toBe(true);
  });

  describe("F3 cancel after streamed assistant text, before the result message", () => {
    const streamedText = (sessionId: string) => [
      sdkInit(sessionId),
      sdkTextDelta(sessionId, "Partial "),
      sdkTextDelta(sessionId, "answer"),
      sdkAssistantText(sessionId, "Partial answer"),
    ];

    it("F3 the SDK ends the stream on abort: cancelled, never the missing-result failure", async () => {
      const sdk = fakeSdk({ policy: "end" });
      const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });
      const settled = host.spawnAgent(spawn("wf-agent-0", 0));
      const call = await sdk.call(0);
      call.push(...streamedText("sdk-f3"));
      await call.parked(4);

      host.abortAgent("wf-agent-0");
      const result = await settled;

      expect(result).toMatchObject({ ok: false, skipped: true, error: CANCELLED, sessionId: "sdk-f3" });
      expect(result.error).not.toBe(NO_RESULT);
      expect(result).not.toHaveProperty("text");
      expect(call.delivered.map(message => message.type)).toEqual(["system", "stream_event", "stream_event", "assistant"]);
      expect(call.abortEvents).toBe(1);
      expect(call.abortedAtClose).toBe(true);
    });

    it("F3 control: the identical stream ending with no abort is the missing-result failure, not a cancellation", async () => {
      const sdk = fakeSdk({ policy: "end" });
      const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });
      const settled = host.spawnAgent(spawn("wf-agent-0", 0));
      const call = await sdk.call(0);
      call.push(...streamedText("sdk-f3"));
      await call.parked(4);

      call.end();
      const result = await settled;

      expect(result).toMatchObject({ ok: false, error: NO_RESULT, sessionId: "sdk-f3" });
      expect(result).not.toHaveProperty("skipped");
      expect(result).not.toHaveProperty("text");
      expect(call.abortEvents).toBe(0);
      expect(call.abortedAtClose).toBe(false);
    });
  });

  it("F4 late abort: a result the SDK delivers after the abort is still cancelled, and the session is not resumable", async () => {
    const sdk = fakeSdk({ policy: "ignore" });
    const lookups: string[] = [];
    const host = createClaudeWorkflowHost({
      cwd: CWD,
      query: sdk.query,
      getSession: async sessionId => {
        lookups.push(sessionId);
        return undefined;
      },
    });
    const settled = host.spawnAgent(spawn("wf-agent-0", 0));
    const call = await sdk.call(0);
    call.push(sdkInit("sdk-f4"), sdkAssistantText("sdk-f4", "Done."));
    await call.parked(2);

    // The request lands on the SDK's controller, but this SDK finishes its turn anyway.
    host.abortAgent("wf-agent-0");
    expect(call.controller.signal.aborted).toBe(true);
    call.push(sdkResultSuccess("sdk-f4", "Done."));
    call.end();
    const result = await settled;

    expect(result.ok).toBe(false);
    expect(result).toMatchObject({ skipped: true, error: CANCELLED, sessionId: "sdk-f4", tokens: 7, outputTokens: 3 });
    expect(result).not.toHaveProperty("text");
    expect(call.delivered.map(message => message.type)).toEqual(["system", "assistant", "result"]);
    expect(call.abortEvents).toBe(1);
    expect(call.abortedAtClose).toBe(true);

    // Never recorded as a completed session, so a later resume takes the unknown-session refusal.
    const resumed = await host.resumeAgent?.("wf-agent-0", "continue");
    expect(resumed).toEqual({ ok: false, error: "Cannot resume unknown Claude SDK session for wf-agent-0." });
    expect(lookups).toEqual([]);
    expect(sdk.calls).toHaveLength(1);
  });

  it("F5 a pre-aborted host signal makes zero query() calls and settles skipped", async () => {
    // Were the query ever made, it would complete: only the host's own check can refuse it.
    const sdk = fakeSdk({
      script: call => {
        call.push(...sdkSuccess("sdk-f5", "this query must never run"));
        call.end();
      },
    });
    const settledResults: WorkflowSpawnResult[] = [];
    const host = createClaudeWorkflowHost({
      cwd: CWD,
      signal: AbortSignal.abort(),
      query: sdk.query,
      onSettled: result => {
        settledResults.push(result);
      },
    });

    const result = await host.spawnAgent(spawn("wf-agent-0", 0));

    expect(result).toEqual({ ok: false, skipped: true, error: WORKFLOW_ABORTED });
    expect(sdk.calls).toHaveLength(0);
    expect(settledResults).toEqual([result]);
  });

  it("F6 per-agent isolation: abortAgent stops only its own controller; repeats and unknown ids are no-ops", async () => {
    const sdk = fakeSdk({ policy: "reject" });
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });
    const first = host.spawnAgent(spawn("wf-agent-0", 0));
    const second = host.spawnAgent(spawn("wf-agent-1", 1));
    const [zero, one] = await Promise.all([sdk.call(0), sdk.call(1)]);
    expect([zero.prompt, one.prompt]).toEqual(["prompt for wf-agent-0", "prompt for wf-agent-1"]);
    zero.push(sdkInit("sdk-f6-0"));
    one.push(sdkInit("sdk-f6-1"));
    await Promise.all([zero.parked(1), one.parked(1)]);

    // One owned invocation, one controller.
    expect(zero.controller).not.toBe(one.controller);
    expect(zero.controller.signal).not.toBe(one.controller.signal);

    host.abortAgent("wf-agent-0");
    expect(zero.controller.signal.aborted).toBe(true);
    expect(one.controller.signal.aborted).toBe(false);
    expect(() => host.abortAgent("wf-agent-0")).not.toThrow();
    expect(await first).toMatchObject({ ok: false, skipped: true, error: CANCELLED, sessionId: "sdk-f6-0" });

    // A repeat after the agent settled, and an id the host never handed out.
    expect(() => host.abortAgent("wf-agent-0")).not.toThrow();
    expect(() => host.abortAgent("wf-agent-404")).not.toThrow();
    expect(zero.abortEvents).toBe(1);
    expect(one.abortEvents).toBe(0);
    expect(one.controller.signal.aborted).toBe(false);

    one.push(sdkAssistantText("sdk-f6-1", "agent one finished"), sdkResultSuccess("sdk-f6-1", "agent one finished"));
    one.end();
    expect(await second).toMatchObject({ ok: true, text: "agent one finished", sessionId: "sdk-f6-1" });
    expect(one.abortEvents).toBe(0);
    expect(one.abortedAtClose).toBe(false);
  });

  it("F7 a host-signal abort fans out to every owned agent's controller exactly once", async () => {
    const hostSignal = new AbortController();
    const sdk = fakeSdk({ policy: "reject" });
    const host = createClaudeWorkflowHost({ cwd: CWD, signal: hostSignal.signal, query: sdk.query });
    const first = host.spawnAgent(spawn("wf-agent-0", 0));
    const second = host.spawnAgent(spawn("wf-agent-1", 1));
    const calls = await Promise.all([sdk.call(0), sdk.call(1)]);
    calls[0].push(sdkInit("sdk-f7-0"));
    calls[1].push(sdkInit("sdk-f7-1"));
    await Promise.all(calls.map(call => call.parked(1)));

    // No abortAgent() here: the host's own listener on its signal is the only route.
    hostSignal.abort();
    expect(calls.map(call => call.controller.signal.aborted)).toEqual([true, true]);

    expect(await first).toMatchObject({ ok: false, skipped: true, error: CANCELLED, sessionId: "sdk-f7-0" });
    expect(await second).toMatchObject({ ok: false, skipped: true, error: CANCELLED, sessionId: "sdk-f7-1" });
    expect(calls.map(call => call.abortEvents)).toEqual([1, 1]);
    expect(calls.map(call => call.abortedAtClose)).toEqual([true, true]);
  });

  it("F7 a host-signal abort after every agent settled fires no per-agent controller", async () => {
    const hostSignal = new AbortController();
    const sdk = fakeSdk({
      script: call => {
        call.push(...sdkSuccess(`sdk-f7b-${call.index}`, `answer ${call.index}`));
        call.end();
      },
    });
    const host = createClaudeWorkflowHost({ cwd: CWD, signal: hostSignal.signal, query: sdk.query });
    const results = await Promise.all([host.spawnAgent(spawn("wf-agent-0", 0)), host.spawnAgent(spawn("wf-agent-1", 1))]);
    expect(results).toMatchObject([
      { ok: true, text: "answer 0", sessionId: "sdk-f7b-0" },
      { ok: true, text: "answer 1", sessionId: "sdk-f7b-1" },
    ]);

    hostSignal.abort();

    expect(sdk.calls.map(call => call.controller.signal.aborted)).toEqual([false, false]);
    expect(sdk.calls.map(call => call.abortEvents)).toEqual([0, 0]);
  });
});

describe("workflow runtime abort path, against a spy host", () => {
  it("F8 a killed run aborts exactly its in-flight agents, spawns nothing after, and leaves a concurrent run on the same host untouched", async () => {
    let seq = 0;
    const waits = conditions();
    const spawned: Array<{ seq: number; request: WorkflowSpawnRequest; settle(result: WorkflowSpawnResult): void }> = [];
    const aborts: Array<{ seq: number; agentId: string }> = [];
    // A pure recorder: abortAgent only notes the call, and every answer is the
    // test's to give, so what reaches each run is decided here, not by a model.
    const host: WorkflowHost = {
      spawnAgent(request) {
        return new Promise<WorkflowSpawnResult>(resolve => {
          spawned.push({ seq: ++seq, request, settle: resolve });
          if (request.prompt === "a-fast") resolve({ ok: true, text: "a-fast:ok" });
          waits.notify();
        });
      },
      abortAgent(agentId) {
        aborts.push({ seq: ++seq, agentId });
        waits.notify();
      },
    };
    const prompts = () => spawned.map(entry => entry.request.prompt);
    const settle = (prompt: string, result: WorkflowSpawnResult) => {
      const entry = spawned.find(candidate => candidate.request.prompt === prompt);
      if (entry === undefined) throw new Error(`${prompt} was never spawned`);
      entry.settle(result);
    };

    // Run A, two slots: a-fast settles at once, a-slow-1 and a-slow-2 are then in
    // flight, and a-queued waits behind them for a slot that never comes.
    const runA = runSignal();
    const progressA: WorkflowEntry[] = [];
    const outcomeA = runWorkflow({
      script: `${HEAD}return await parallel([() => agent("a-fast"), () => agent("a-slow-1"), () => agent("a-slow-2"), () => agent("a-queued")]);`,
      host,
      signal: runA.signal,
      concurrency: 2,
      onProgress: entries => {
        progressA.push(...entries);
        waits.notify();
      },
    });
    // Run B shares the host with its own signal and stays in flight across A's
    // abort. Runtime agent ids are per run, so B's b-0 is also "wf-agent-0",
    // the id A had settled before the abort: an abort aimed outside A's own
    // in-flight set would show up as that id.
    const runB = runSignal();
    const outcomeB = runWorkflow({
      script: `${HEAD}return await parallel([() => agent("b-0"), () => agent("b-1")]);`,
      host,
      signal: runB.signal,
      concurrency: 2,
    });

    await waits.until(
      () =>
        ["a-slow-1", "a-slow-2", "b-0", "b-1"].every(prompt => prompts().includes(prompt)) &&
        agentRows(progressA, 0).some(entry => entry.state === "done") &&
        agentRows(progressA, 3).length > 0,
    );
    expect(spawned.filter(entry => entry.request.prompt.startsWith("a-slow")).map(entry => entry.request.agentId)).toEqual([
      "wf-agent-1",
      "wf-agent-2",
    ]);
    expect(aborts).toEqual([]);

    const abortRequestedAt = ++seq;
    runA.abort();
    const killed = await outcomeA;

    expect(killed.status).toBe("killed");
    expect(killed.error).toBe(WORKFLOW_ABORTED);
    expect(killed.value).toBeUndefined();
    expect(aborts.map(entry => entry.agentId).sort()).toEqual(["wf-agent-1", "wf-agent-2"]);

    // The host answers late: one acknowledged cancellation, and one misbehaving
    // success that arrives after the run is already over.
    settle("a-slow-1", { ok: false, skipped: true, error: CANCELLED });
    settle("a-slow-2", { ok: true, text: "a-slow-2:late" });
    settle("b-0", { ok: true, text: "b-0:ok" });
    settle("b-1", { ok: true, text: "b-1:ok" });
    const completed = await outcomeB;

    expect(completed.status).toBe("completed");
    expect(completed.value).toEqual(["b-0:ok", "b-1:ok"]);
    expect(completed.error).toBeUndefined();
    expect([0, 1].map(index => agentRows(completed.progress, index).some(entry => entry.state === "done"))).toEqual([true, true]);

    // Exactly once per agent in flight at the abort; never the agent that had
    // already settled; nothing from B, which was never aborted.
    expect(aborts.map(entry => entry.agentId).sort()).toEqual(["wf-agent-1", "wf-agent-2"]);
    expect(aborts.every(entry => entry.seq > abortRequestedAt)).toBe(true);

    // No spawn follows the abort: a-queued was scheduled but never started.
    const spawnedByA = spawned.filter(entry => entry.request.prompt.startsWith("a-"));
    expect(spawnedByA.map(entry => entry.request.prompt)).toEqual(["a-fast", "a-slow-1", "a-slow-2"]);
    expect(spawnedByA.every(entry => entry.seq < abortRequestedAt)).toBe(true);
    expect(killed.agentCount).toBe(4);
    expect(agentRows(progressA, 3).length).toBeGreaterThan(0);
    expect(agentRows(progressA, 3).every(entry => entry.startedAt === undefined)).toBe(true);

    // Progress never calls a cancelled agent done, not even after the late answers.
    expect(agentRows(progressA, 0).some(entry => entry.state === "done")).toBe(true);
    for (const log of [progressA, killed.progress]) {
      for (const index of [1, 2]) expect(agentRows(log, index).filter(entry => entry.state === "done")).toEqual([]);
    }
  });
});

describe("requested < acknowledged < terminal, measured rather than assumed", () => {
  type PhaseVerdict = "ordered" | "unacknowledged" | "acknowledged-after-terminal" | "settled-before-request" | "not-a-cancellation";
  interface Settlement {
    at: number;
    result: WorkflowSpawnResult;
  }
  interface PhaseMarks {
    requestedAt: number;
    terminalAt: number;
    settled: ReadonlyMap<string, Settlement>;
  }

  /** Classifies one agent from what was observed, never from what ought to have happened. */
  function phaseVerdict(marks: PhaseMarks, agentId: string): PhaseVerdict {
    const settlement = marks.settled.get(agentId);
    if (settlement === undefined) return "unacknowledged";
    if (settlement.at < marks.requestedAt) return "settled-before-request";
    if (settlement.result.ok || settlement.result.skipped !== true) return "not-a-cancellation";
    return settlement.at < marks.terminalAt ? "ordered" : "acknowledged-after-terminal";
  }

  /**
   * Two Claude agents under the real runtime, both past init, then one abort of
   * the run's signal — which, as in src/index.ts, is also the host's signal.
   * `policies[i]` decides how agent i's SDK stream answers that abort.
   */
  async function cancelledRun(policies: readonly [AbortPolicy, AbortPolicy]) {
    let clock = 0;
    const tick = () => ++clock;
    const waits = conditions();
    const settled = new Map<string, Settlement>();
    const sdk = fakeSdk({ clock: tick });
    const run = runSignal();
    const host = createClaudeWorkflowHost({
      cwd: CWD,
      signal: run.signal,
      query: sdk.query,
      onSettled: (result, call) => {
        settled.set(call.agentId, { at: tick(), result });
        waits.notify();
      },
    });
    const outcome = runWorkflow({
      script: `${HEAD}return await parallel([() => agent("one"), () => agent("two")]);`,
      host,
      signal: run.signal,
      concurrency: 2,
    });
    const calls = await Promise.all([sdk.call(0), sdk.call(1)]);
    expect(calls.map(call => call.prompt)).toEqual(["one", "two"]);
    for (const [index, call] of calls.entries()) {
      call.policy = policies[index];
      call.push(sdkInit(`sdk-f9-${index}`));
    }
    await Promise.all(calls.map(call => call.parked(1)));

    const requestedAt = tick();
    run.abort();
    const result = await outcome;
    const terminalAt = tick();
    return { calls, settled, waits, result, marks: { requestedAt, terminalAt, settled } };
  }

  it("F9 three distinct ordered marks per cancelled agent: abort call < onSettled skipped < runWorkflow resolved", async () => {
    const { calls, settled, result, marks } = await cancelledRun(["reject", "reject"]);

    expect(result.status).toBe("killed");
    expect(result.error).toBe(WORKFLOW_ABORTED);
    expect(["wf-agent-0", "wf-agent-1"].map(agentId => phaseVerdict(marks, agentId))).toEqual(["ordered", "ordered"]);
    for (const [index, agentId] of ["wf-agent-0", "wf-agent-1"].entries()) {
      const acknowledged = settled.get(agentId);
      expect(acknowledged?.result).toMatchObject({ ok: false, skipped: true, error: CANCELLED, sessionId: `sdk-f9-${index}` });
      // The request reached the SDK's own AbortController after the abort call
      // and before the agent acknowledged; the run went terminal after both.
      const reachedSdk = calls[index].abortEventAt ?? Number.NaN;
      const acknowledgedAt = acknowledged?.at ?? Number.NaN;
      expect(marks.requestedAt).toBeLessThan(reachedSdk);
      expect(reachedSdk).toBeLessThan(acknowledgedAt);
      expect(acknowledgedAt).toBeLessThan(marks.terminalAt);
    }
  });

  it("F9 an agent whose onSettled never fires is reported unacknowledged even though the run is terminal", async () => {
    // Agent "two"'s SDK swallows the abort and never answers.
    const { calls, settled, waits, result, marks } = await cancelledRun(["reject", "ignore"]);

    expect(result.status).toBe("killed");
    expect(result.error).toBe(WORKFLOW_ABORTED);
    expect(phaseVerdict(marks, "wf-agent-0")).toBe("ordered");
    expect(phaseVerdict(marks, "wf-agent-1")).toBe("unacknowledged");
    expect(settled.has("wf-agent-1")).toBe(false);
    // Requested and delivered to the SDK, yet never acknowledged: the run's
    // terminal status is not evidence that every child stopped.
    expect(calls[1].abortEvents).toBe(1);
    expect(calls[1].closed).toBe(false);

    // When it does answer, the acknowledgement is classified as late, not back-dated.
    calls[1].end();
    await waits.until(() => settled.has("wf-agent-1"));
    expect(phaseVerdict(marks, "wf-agent-1")).toBe("acknowledged-after-terminal");
    expect(settled.get("wf-agent-1")?.result).toMatchObject({ ok: false, skipped: true, error: CANCELLED, sessionId: "sdk-f9-1" });
  });
});
