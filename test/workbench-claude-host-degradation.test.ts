/**
 * VC-1 / W02-E (wb-a2g.11): first-cut isolation and gate degradation for the
 * Claude workbench host, pinned to the one outcome each path measurably has.
 *
 * docs/workbench/04-claude-agent-sdk-executor.md § "Isolation and gates":
 *   "New host must either implement equivalent safe workspace materialization
 *   using supported Forge/Git surfaces or return unsupported; no quiet downgrade
 *   to nonisolated execution. Gates should be run through Forge where supported,
 *   preserving native verdict/evidence and basis. Do not turn a test-command
 *   exit code into fictitious Forge PASS."
 * docs/workbench/17-packaging-and-operations.md § "Error and degradation policy":
 *   "Unsupported worktree isolation -> refuse isolated operation."
 * docs/workbench/08-lifecycle-and-recovery.md § "Adversarial test matrix":
 *   "no duplicate effects, no invented PASS"
 * src/workflow/tool-description.ts, the promise users read:
 *   "Worktree isolation and gate refuse in this first cut rather than silently
 *   downgrading or pretending a test ran."
 *
 * Measured outcomes (one per path; the other documented-legal alternative fails
 * the suite until a change replaces this pin on purpose):
 *  - isolation: the Claude host's own typed refusal (claude-host.ts:134-135),
 *    per agent and before any SDK query; never a skip, a throw, a session or a
 *    downgrade to the shared cwd, and siblings keep running.
 *  - gate: the typed first-cut refusal at the runtime's host-capability check
 *    (runtime.ts:904-908), which fires because the Claude host exposes no
 *    `runGate`. The applyGate fallback (runtime.ts:615) needs that method, so
 *    for this host it is unreachable: the gate command never executes, no
 *    verdict exists to invent, and the refused agent is never even queued.
 *
 * The REAL createClaudeWorkflowHost runs behind its documented fixture query
 * seam and the REAL runWorkflow drives it. The SDK module is never mocked, no
 * process is spawned and nothing touches the network. The gate spy is the
 * command itself: anything that executed it would append a line to a scratch
 * file this suite owns and removes.
 */
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { createClaudeObserver } from "../src/workbench/claude-transcript.js";
import { sanitizeWorkbenchText, stripUnsafeText } from "../src/workbench/redaction.js";
import type { ClaudeNativeObservation, WorkflowAgentEntry, WorkflowEntry } from "../src/workflow/progress.js";
import { runWorkflow, type WorkflowSpawnRequest, type WorkflowSpawnResult } from "../src/workflow/runtime.js";
import { fullWorkflowToolDescription } from "../src/workflow/tool-description.js";
import { FakeClaudeSdk, sdkSuccess } from "./helpers/claude-sdk-stream.js";

/** claude-host.ts:134-135, verbatim: the host's typed first-cut isolation refusal. */
const ISOLATION_REFUSAL = "Claude SDK worktree isolation is unavailable; refusing to run in the shared cwd.";
/** runtime.ts:904-908, verbatim: the first-cut gate refusal for a host with no runGate. */
const GATE_REFUSAL = "This workflow host cannot run gate commands.";
/** claude-host.ts:281: a child the host never started has no session to continue. */
const NO_SESSION = "Cannot resume unknown Claude SDK session for wf-agent-0.";
/** tool-description.ts: the sentence this suite holds the Claude backend to. */
const FIRST_CUT_PROMISE =
  "Worktree isolation and gate refuse in this first cut rather than silently downgrading or pretending a test ran.";

const HEAD = 'export const meta = { name: "claude-host-degradation", description: "first-cut isolation and gate degradation" };\n';
const CWD = tmpdir();

const fakes: FakeClaudeSdk[] = [];
const scratchRoots: string[] = [];
afterEach(() => {
  // Nothing a failed case left open may outlive it: close every fixture stream
  // and remove every scratch directory this suite created.
  for (const fake of fakes.splice(0)) fake.release();
  for (const root of scratchRoots.splice(0)) rmSync(root, { recursive: true, force: true });
});

/** Every call completes at once with an answer naming its own prompt, so order never matters. */
function answeringSdk(): FakeClaudeSdk {
  const fake = new FakeClaudeSdk({
    script: call => {
      call.push(...sdkSuccess(`sdk-${call.index}`, `done: ${call.prompt}`));
      call.end();
    },
  });
  fakes.push(fake);
  return fake;
}

function scratch(): string {
  const root = mkdtempSync(join(tmpdir(), "wb-a2g11-"));
  scratchRoots.push(root);
  return root;
}

/** A gate command whose every execution appends one line to a log: the spy is the command itself. */
function spyGate(): { command: string; runs(): number } {
  const log = join(scratch(), "gate-runs.log");
  return {
    command: `echo gate-ran >> ${log}`,
    runs: () => (existsSync(log) ? readFileSync(log, "utf8").split("\n").filter(line => line === "gate-ran").length : 0),
  };
}

function spawn(index: number, prompt: string): WorkflowSpawnRequest {
  return { agentId: `wf-agent-${index}`, index, prompt, label: `agent-${index}`, agentType: "general-purpose" };
}

function agentRows(progress: readonly WorkflowEntry[], index?: number): WorkflowAgentEntry[] {
  return progress.filter(
    (entry): entry is WorkflowAgentEntry => entry.type === "workflow_agent" && (index === undefined || entry.index === index),
  );
}

/** Strip, redact, strip: the deletion-first composition this suite pins as a fixed point (the 16:03Z deletion-before-redaction class that wb-952 replaces with one helper); trunk's tool-output path itself is redact-then-strip. */
const twoPass = (text: string): string => sanitizeWorkbenchText(stripUnsafeText(text));

describe("the promise this suite pins", () => {
  it("P0 the workflow tool still promises users the first-cut refusals the cases below measure", () => {
    expect(fullWorkflowToolDescription).toContain(FIRST_CUT_PROMISE);
  });
});

describe("worktree isolation: refused per agent with the typed diagnostic, never downgraded to the shared cwd (AC1, AC2)", () => {
  it("I1 host boundary: settles ok:false with exactly the typed diagnostic, zero SDK queries, no resolved session, one settle", async () => {
    const sdk = answeringSdk();
    const resolved: unknown[] = [];
    const settled: WorkflowSpawnResult[] = [];
    const host = createClaudeWorkflowHost({
      cwd: CWD,
      query: sdk.query,
      onSettled: result => {
        settled.push(result);
      },
    });

    const outcome = host.spawnAgent({
      ...spawn(0, "edit the parser"),
      isolation: "worktree",
      onResolved: info => {
        resolved.push(info);
      },
    });

    // Resolves, never rejects, to exactly the refusal: no skip, no text, no
    // session, no usage, no gate verdict and no worktree cwd ride along.
    await expect(outcome).resolves.toEqual({ ok: false, error: ISOLATION_REFUSAL });
    expect(sdk.calls).toEqual([]);
    expect(resolved).toEqual([]);
    expect(settled).toEqual([{ ok: false, error: ISOLATION_REFUSAL }]);
  });

  it("I2 native observation: the refusal is recorded as a failed settle with no message and no session, never succeeded or cancelled", async () => {
    const sdk = answeringSdk();
    const snapshots: Array<{ agentId: string; snapshot: ClaudeNativeObservation }> = [];
    const observer = createClaudeObserver((call, snapshot) => {
      snapshots.push({ agentId: call.agentId, snapshot });
    });
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query, onMessage: observer.onMessage, onSettled: observer.onSettled });

    await host.spawnAgent({ ...spawn(0, "edit the parser"), isolation: "worktree" });

    expect(snapshots).toHaveLength(1);
    expect(snapshots[0]).toMatchObject({ agentId: "wf-agent-0", snapshot: { terminal: "failed", observedMessages: 0 } });
    // The observer's `sessionId ??= result.sessionId` leaves an undefined-valued
    // key behind; the claim that matters is that no session value exists.
    expect(snapshots[0]?.snapshot.sessionId).toBeUndefined();
    expect(sdk.calls).toEqual([]);
  });

  it("I3 never nonisolated by continuation: the refused child has no session, so resume refuses at the host and in the runtime without a query", async () => {
    const sdk = answeringSdk();
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });

    await host.spawnAgent({ ...spawn(0, "edit the parser"), isolation: "worktree" });
    const resumed = await host.resumeAgent?.("wf-agent-0", "carry on in the shared cwd");
    const run = await runWorkflow({
      script: `${HEAD}const first = await agent("edit the parser", { label: "isolated", isolation: "worktree" });
let next;
try { next = await agent("carry on in the shared cwd", { resume: "isolated" }); } catch (error) { next = "refused: " + error.message; }
return [first, next];`,
      host,
    });

    expect(resumed).toEqual({ ok: false, error: NO_SESSION });
    expect(run.status).toBe("completed");
    expect(run.value).toEqual([null, expect.stringContaining('no agent has completed under the label "isolated"')]);
    expect(sdk.calls).toEqual([]);
  });

  it("I4 through the real runtime: agent() returns null and its row ends in error with the diagnostic (never done, skipped or sessioned); the run completes", async () => {
    const sdk = answeringSdk();
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });

    const result = await runWorkflow({
      script: `${HEAD}return await agent("edit the parser", { label: "isolated", isolation: "worktree" });`,
      host,
    });

    expect(result.status).toBe("completed");
    expect(result.value).toBeNull();
    expect(sdk.calls).toEqual([]);
    const rows = agentRows(result.progress, 0);
    expect(rows.map(row => row.state)).not.toContain("done");
    const last = rows.at(-1);
    expect(last).toMatchObject({ state: "error", error: ISOLATION_REFUSAL, isolation: "worktree", label: "isolated" });
    expect(last).not.toHaveProperty("skipped");
    expect(last).not.toHaveProperty("sessionId");
    expect(last).not.toHaveProperty("resultPreview");
  });

  it("I5 no mass refusal: un-isolated siblings in the same run still run and answer in the shared cwd, sequentially and under parallel()", async () => {
    const sdk = answeringSdk();
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });

    const result = await runWorkflow({
      script: `${HEAD}const first = await agent("edit A", { label: "isolated", isolation: "worktree" });
const second = await agent("edit B", { label: "after" });
const fanned = await parallel([
  () => agent("edit C", { label: "fan-isolated", isolation: "worktree" }),
  () => agent("edit D", { label: "fan-plain-1" }),
  () => agent("edit E", { label: "fan-plain-2" }),
]);
return { first, second, fanned };`,
      host,
    });

    expect(result.status).toBe("completed");
    expect(result.value).toEqual({ first: null, second: "done: edit B", fanned: [null, "done: edit D", "done: edit E"] });
    // Exactly the three un-isolated prompts reached the SDK, each in the shared
    // cwd; neither isolated prompt reached it in any form.
    expect(sdk.calls.map(call => call.prompt).sort()).toEqual(["edit B", "edit D", "edit E"]);
    for (const call of sdk.calls) expect(call.options.cwd).toBe(CWD);
    const refused = agentRows(result.progress).filter(row => row.error === ISOLATION_REFUSAL);
    expect(new Set(refused.map(row => row.label))).toEqual(new Set(["isolated", "fan-isolated"]));
  });

  it("I6 typed and sanitizer-clean: hostile cwd, prompt, label, role and model never leak into the refusal, a fixed point of the shared sanitizers", async () => {
    const hostileCwd = join(scratch(), "api_key=sk-ant-PLANTEDcwd\u001b[31m\u202E");
    mkdirSync(hostileCwd);
    const sdk = answeringSdk();
    const host = createClaudeWorkflowHost({ cwd: hostileCwd, model: "token=PLANTEDmodel", query: sdk.query });
    const prompt = "password=PLANTEDprompt \u001b]0;title\u0007";
    const label = "Bearer PLANTEDlabel\u2066";

    const direct = await host.spawnAgent({ agentId: "wf-agent-0", index: 0, prompt, label, agentType: "Bearer PLANTEDrole", isolation: "worktree" });
    const run = await runWorkflow({
      script: `${HEAD}return await agent(args.prompt, { label: args.label, isolation: "worktree" });`,
      args: { prompt, label },
      host,
    });
    const row = agentRows(run.progress, 0).at(-1);

    expect(direct).toEqual({ ok: false, error: ISOLATION_REFUSAL });
    expect(row?.error).toBe(ISOLATION_REFUSAL);
    for (const text of [direct.error ?? "", row?.error ?? ""]) {
      expect(twoPass(text)).toBe(text);
      for (const planted of ["PLANTED", "sk-ant-", "\u001b", "\u0007", "\u202E", "\u2066", hostileCwd]) expect(text).not.toContain(planted);
    }
    expect(sdk.calls).toEqual([]);
  });
});

describe("gate: the measured first-cut outcome under the Claude backend is the typed refusal, never a verdict (AC3, AC4)", () => {
  it("G1 structural cause: the Claude host exposes no runGate, with or without a capability registry, so applyGate has nothing to run", () => {
    const hosts = [
      createClaudeWorkflowHost({ cwd: CWD, query: answeringSdk().query }),
      createClaudeWorkflowHost({ cwd: CWD, query: answeringSdk().query, capabilities: new CapabilityRegistry() }),
    ];
    for (const host of hosts) {
      expect("runGate" in host).toBe(false);
      expect(host.runGate).toBeUndefined();
    }
  });

  it("G2 through the real runtime: a gated agent is refused before it is queued, before any SDK query and before the gate command runs", async () => {
    const sdk = answeringSdk();
    const gate = spyGate();
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });

    const result = await runWorkflow({
      script: `${HEAD}return await agent("change the parser", { label: "gated", gate: args.gate });`,
      args: { gate: gate.command },
      host,
    });

    expect(result.status).toBe("failed");
    expect(result.error).toBe(GATE_REFUSAL);
    expect(result.value).toBeUndefined();
    expect(result.agentCount).toBe(0);
    expect(agentRows(result.progress)).toEqual([]);
    expect(sdk.calls).toEqual([]);
    expect(gate.runs()).toBe(0);
  });

  it("G3 isolation and gate together: the gate refusal lands first, so neither is downgraded and nothing runs", async () => {
    const sdk = answeringSdk();
    const gate = spyGate();
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });

    const result = await runWorkflow({
      script: `${HEAD}return await agent("change the parser", { isolation: "worktree", gate: args.gate });`,
      args: { gate: gate.command },
      host,
    });

    expect(result).toMatchObject({ status: "failed", error: GATE_REFUSAL, agentCount: 0 });
    expect(agentRows(result.progress)).toEqual([]);
    expect(sdk.calls).toEqual([]);
    expect(gate.runs()).toBe(0);
  });

  it("G4 a script cannot turn the refusal into a pass: parallel() propagates it rather than folding it into null, and a caught refusal is the typed message", async () => {
    const sdk = answeringSdk();
    const gate = spyGate();
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });

    const fanned = await runWorkflow({
      script: `${HEAD}return await parallel([() => agent("check A", { gate: args.gate }), () => agent("check B", { gate: args.gate })]);`,
      args: { gate: gate.command },
      host,
    });
    const caught = await runWorkflow({
      script: `${HEAD}try { return await agent("check C", { gate: args.gate }); } catch (error) { return "refused: " + error.message; }`,
      args: { gate: gate.command },
      host,
    });

    expect(fanned).toMatchObject({ status: "failed", error: GATE_REFUSAL, agentCount: 0 });
    expect(caught).toMatchObject({ status: "completed", value: `refused: ${GATE_REFUSAL}`, agentCount: 0 });
    expect(sdk.calls).toEqual([]);
    expect(gate.runs()).toBe(0);
  });

  it("G5 a gate offered to the host directly, past the runtime's capability check, never gets a host-side verdict, a worktree cwd or an execution", async () => {
    const sdk = answeringSdk();
    const gate = spyGate();
    const host = createClaudeWorkflowHost({ cwd: CWD, query: sdk.query });

    const result = await host.spawnAgent({ ...spawn(0, "change the parser"), gate: gate.command });

    // The agent executes and the offered gate is ignored (runtime.ts:126-134), so
    // the host never claims to have run the command: a `gate` here is what
    // applyGate would trust instead of running.
    expect(result).not.toHaveProperty("gate");
    expect(result).not.toHaveProperty("cwd");
    expect(gate.runs()).toBe(0);
  });
});
