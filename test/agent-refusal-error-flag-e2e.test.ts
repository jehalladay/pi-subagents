/**
 * agent-refusal-error-flag-e2e.test.ts — EAT-R311 (wb-wkqp, DX P01; audited
 * claim C009): every top-level Agent, steer_subagent and get_subagent_result
 * reply that reports a refusal or a failed run carries pi's tool-result error
 * flag.
 *
 * The flag is read where pi RECORDED it — `isError` on each tool-result message
 * of the session (pi-agent-core's agent loop keeps `result.isError === true`) —
 * through the real loader, the real extension, real runAgent and real child
 * sessions on a scripted faux model. That is the registered-tool oracle the
 * requirement names (tier V3), not the handler's own return value. Every run
 * pins `live: false`: the scenarios are scripted refusals and provider errors
 * that no live model produces on request.
 *
 *   R  refusals, each flagged;
 *   F  failed runs, each flagged (the background launch beside them is not);
 *   G  golden spawn / steer / result replies stay unflagged — the positive
 *      control a cure that flags everything fails — beside the two refusals
 *      that need a live record to reach;
 *   A  the nested variants of the same three tools, which already flagged
 *      theirs, agree with the top-level ones class by class.
 *
 * Each scripted turn makes exactly one tool call, so a session's tool results
 * line up with its steps one to one, and every row checks the reply's text as
 * well as its flag: a misaligned script fails instead of passing vacuously.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { type Context, fauxAssistantMessage, fauxToolCall, type ToolResultMessage, type UserMessage } from "@earendil-works/pi-ai";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { registerAgents } from "../src/agent-types.js";
import { loadCustomAgents } from "../src/custom-agents.js";
import { agentCall, type FauxReply, type PrintModeRun, runPrintMode } from "./helpers/print-mode-runner.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

// Each block drives one whole real session (pi loader + extension import +
// child sessions) in its beforeAll, under full-suite CPU contention.
vi.setConfig({ testTimeout: 60_000, hookTimeout: 120_000 });

/** Not matched by pi's transient-error patterns, so no auto-retry: each failure is deterministic. */
const FATAL = "invalid request: provider rejected the prompt";
/** An agent id no run allocates. */
const GHOST = "deadbeef-0000-000";

interface Reply {
  tool: string;
  isError: boolean;
  text: string;
}

function isToolResult(message: { role: string }): message is ToolResultMessage {
  return message.role === "toolResult";
}

/** Every tool result in a history, in order, with the error flag pi recorded on it. */
function repliesIn(messages: ReadonlyArray<{ role: string }>): Reply[] {
  return messages.filter(isToolResult).map((message) => ({
    tool: message.toolName,
    isError: message.isError,
    text: message.content.map((block) => (block.type === "text" ? block.text : "")).join(""),
  }));
}

function isUserMessage(message: { role: string }): message is UserMessage {
  return message.role === "user";
}

/** The task a session was started with — the stable way to tell faux sessions apart. */
function taskOf(context: Context): string {
  const content = context.messages.find(isUserMessage)?.content ?? "";
  return typeof content === "string" ? content : content.map((block) => (block.type === "text" ? block.text : "")).join("");
}

type Step = FauxReply | ((context: Context) => FauxReply | Promise<FauxReply>);

/** One scripted step per assistant turn of THIS session, then `final` for every later turn. */
function play(context: Context, steps: readonly Step[], final: Step): FauxReply | Promise<FauxReply> {
  const turn = context.messages.filter((message) => message.role === "assistant").length;
  const step = steps[turn] ?? final;
  return typeof step === "function" ? step(context) : step;
}

/** The id a background launch in this session printed (`Agent ID: <id>`): the latest by default. */
function launchedId(context: Context, which: "first" | "latest" = "latest"): string {
  const launches = repliesIn(context.messages).filter((reply) => /Agent ID: \S+/.test(reply.text));
  const launch = which === "first" ? launches[0] : launches.at(-1);
  const id = launch ? /Agent ID: (\S+)/.exec(launch.text)?.[1] : undefined;
  if (!id) throw new Error("no background launch reply in this session yet");
  return id;
}

/** A provider error with no content: the child's run ends in status "error". */
const providerError = (): FauxReply => fauxAssistantMessage([], { stopReason: "error", errorMessage: FATAL });

/** A project dir with `.pi/subagents.json` and optional agent files, allocated through the scratch helper. */
function projectDir(prefix: string, settings: Record<string, unknown>, agents: Record<string, string> = {}): string {
  const cwd = makeScratch(prefix);
  mkdirSync(join(cwd, ".pi", "agents"), { recursive: true });
  writeFileSync(join(cwd, ".pi", "subagents.json"), JSON.stringify(settings));
  for (const [name, body] of Object.entries(agents)) writeFileSync(join(cwd, ".pi", "agents", `${name}.md`), body);
  return cwd;
}

interface Row {
  id: string;
  /** Index of the scripted step, and so of the session's tool result. */
  step: number;
  label: string;
  tool: string;
  text: RegExp;
  flagged: boolean;
}

interface AgreementRow {
  id: string;
  step: number;
  label: string;
  tool: string;
  top: RegExp;
  nested: RegExp;
  flagged: boolean;
}

/** `%s`-titled cases: vitest truncates `$field` interpolations, which would clip the case titles. */
function cases<T extends { id: string; label: string; flagged: boolean }>(rows: T[]): Array<[string, string, string, T]> {
  return rows.map((row) => [row.id, row.label, String(row.flagged), row]);
}

function expectRow(replies: Reply[], row: Row): void {
  const reply = replies[row.step];
  expect(reply, `${row.id} step ${row.step} (${row.label}) produced no tool result`).toBeDefined();
  expect({ tool: reply.tool, text: reply.text }).toEqual({ tool: row.tool, text: expect.stringMatching(row.text) });
  expect(reply.isError, `${row.id} ${row.label}: isError`).toBe(row.flagged);
}

const REFUSALS: Row[] = [
  { id: "R01", step: 0, label: "unknown agent type under strict dispatch", tool: "Agent", text: /^Unknown or disabled agent type: "code-reviewer"/, flagged: true },
  { id: "R02", step: 1, label: "model not found", tool: "Agent", text: /^Model not found: "gpt-9000-nope"/, flagged: true },
  { id: "R03", step: 2, label: "agent not found (Agent resume)", tool: "Agent", text: /^Agent not found: "deadbeef-0000-000"/, flagged: true },
  { id: "R04", step: 3, label: "agent not found (steer_subagent)", tool: "steer_subagent", text: /^Agent not found: "deadbeef-0000-000"/, flagged: true },
  { id: "R05", step: 4, label: "agent not found (get_subagent_result)", tool: "get_subagent_result", text: /^Agent not found: "deadbeef-0000-000"/, flagged: true },
  { id: "R06", step: 5, label: "schedule combined with resume", tool: "Agent", text: /^Cannot combine `schedule` with `resume`/, flagged: true },
  { id: "R07", step: 6, label: "schedule combined with inherit_context", tool: "Agent", text: /^Cannot combine `schedule` with `inherit_context`/, flagged: true },
  { id: "R08", step: 7, label: "schedule combined with run_in_background: false", tool: "Agent", text: /^Cannot combine `schedule` with `run_in_background: false`/, flagged: true },
  { id: "R09", step: 8, label: "a schedule the live scheduler cannot parse", tool: "Agent", text: /^Invalid schedule "whenever it suits"\./, flagged: true },
];

const FAILURES: Row[] = [
  { id: "F01", step: 0, label: "foreground spawn whose run failed", tool: "Agent", text: /^Agent failed: invalid request: provider rejected the prompt/, flagged: true },
  { id: "F02", step: 1, label: "background launch (the launch itself succeeded)", tool: "Agent", text: /^Agent started in background\./, flagged: false },
  { id: "F03", step: 2, label: "get_subagent_result of the failed background run", tool: "get_subagent_result", text: /Status: error[\s\S]*Error: invalid request: provider rejected the prompt/, flagged: true },
  { id: "F04", step: 3, label: "steer_subagent of a run that already failed", tool: "steer_subagent", text: /is not running \(status: error\)\. Cannot steer a non-running agent\./, flagged: true },
  { id: "F05", step: 4, label: "foreground resume whose run failed", tool: "Agent", text: /^Agent failed: invalid request: provider rejected the prompt/, flagged: true },
];

const GOLDEN: Row[] = [
  { id: "G01", step: 0, label: "foreground spawn that completed", tool: "Agent", text: /^Agent completed in [\s\S]*CHILD_HELLO/, flagged: false },
  { id: "G02", step: 1, label: "background launch", tool: "Agent", text: /^Agent started in background\./, flagged: false },
  { id: "G03", step: 2, label: "steer_subagent of a running agent", tool: "steer_subagent", text: /^Steering message sent to agent /, flagged: false },
  // The two refusals that need a live record to reach: the background-resume
  // refusal (C029 wording, kept byte-identical) and a resume of an agent still
  // queued, which has no session yet.
  { id: "G04", step: 3, label: "background resume of a still-running agent (refused)", tool: "Agent", text: /is still running — it can only be resumed once its current run finishes\./, flagged: true },
  { id: "G05", step: 4, label: "background launch queued behind the concurrency limit", tool: "Agent", text: /^Agent queued in background\./, flagged: false },
  { id: "G06", step: 5, label: "foreground resume of a queued agent (no session yet, refused)", tool: "Agent", text: /^Agent "[^"]+" has no active session to resume\./, flagged: true },
  { id: "G07", step: 6, label: "get_subagent_result of the completed run", tool: "get_subagent_result", text: /Status: completed[\s\S]*CHILD_DONE/, flagged: false },
];

// One row per class; the same step index drives the parent's top-level call and
// the orchestrator child's nested call of that class.
const AGREEMENT: AgreementRow[] = [
  { id: "A01", step: 0, label: "unknown agent type", tool: "Agent", top: /^Unknown or disabled agent type: "no-such-type"/, nested: /^Unknown or disabled nested agent type: "no-such-type"/, flagged: true },
  { id: "A02", step: 1, label: "model not found", tool: "Agent", top: /^Model not found: "gpt-9000-nope"/, nested: /^Model not found: "gpt-9000-nope"/, flagged: true },
  { id: "A03", step: 2, label: "agent not found (Agent resume)", tool: "Agent", top: /^Agent not found: "deadbeef-0000-000"/, nested: /^Nested agent not found or not owned by this parent: "deadbeef-0000-000"/, flagged: true },
  { id: "A04", step: 3, label: "agent not found (get_subagent_result)", tool: "get_subagent_result", top: /^Agent not found: "deadbeef-0000-000"/, nested: /^Nested agent not found or not owned by this parent: "deadbeef-0000-000"/, flagged: true },
  { id: "A05", step: 4, label: "agent not found (steer_subagent)", tool: "steer_subagent", top: /^Agent not found: "deadbeef-0000-000"/, nested: /^Running nested agent not found or not owned by this parent: "deadbeef-0000-000"/, flagged: true },
  { id: "A06", step: 5, label: "failed run (foreground Agent)", tool: "Agent", top: /^Agent failed: invalid request: provider rejected the prompt/, nested: /^Agent failed: invalid request: provider rejected the prompt/, flagged: true },
  { id: "A07", step: 6, label: "background launch (unflagged at both levels)", tool: "Agent", top: /^Agent started in background\./, nested: /^Nested agent started in background\. Agent ID: /, flagged: false },
  { id: "A08", step: 7, label: "failed run (get_subagent_result of a failed background run)", tool: "get_subagent_result", top: /Status: error[\s\S]*Error: invalid request: provider rejected the prompt/, nested: /^Agent failed: invalid request: provider rejected the prompt/, flagged: true },
  { id: "A09", step: 8, label: "steer refused (agent not running)", tool: "steer_subagent", top: /is not running \(status: error\)/, nested: /^Running nested agent not found or not owned by this parent: /, flagged: true },
];

describe("EAT-R311 in a real pi session: 15 top-level Agent, steer_subagent and get_subagent_result refusal and failed-run replies record isError:true, 6 success replies record isError:false, and 9 reply classes record the same flag at the top level and in the nested tools", () => {
  describe("R: refusals (strict dispatch, model, unknown id, schedule conflicts)", () => {
    let run: PrintModeRun | undefined;
    let cwd: string | undefined;
    let replies: Reply[] = [];

    beforeAll(async () => {
      // Strict dispatch: an unknown type is refused instead of falling back.
      cwd = projectDir("r311-refusals-", { fallbackSubagent: "none" });
      const steps: Step[] = [
        agentCall({ subagent_type: "code-reviewer", description: "unknown type", prompt: "x", run_in_background: false }),
        agentCall({ description: "bad model", prompt: "x", model: "gpt-9000-nope" }),
        agentCall({ description: "bad resume", prompt: "x", resume: GHOST }),
        fauxToolCall("steer_subagent", { agent_id: GHOST, message: "hi" }),
        fauxToolCall("get_subagent_result", { agent_id: GHOST }),
        agentCall({ description: "schedule and resume", prompt: "x", schedule: "5m", resume: GHOST }),
        agentCall({ description: "schedule and inherit", prompt: "x", schedule: "5m", inherit_context: true }),
        agentCall({ description: "schedule in foreground", prompt: "x", schedule: "5m", run_in_background: false }),
        agentCall({ description: "schedule nobody can parse", prompt: "x", schedule: "whenever it suits" }),
      ];
      run = await runPrintMode({
        prompt: "Run the refusal checks.",
        cwd,
        live: false,
        maxModelCalls: 32,
        respond: (context) => play(context, steps, "PARENT_DONE"),
      });
      replies = repliesIn(run.parentSession.messages);
    });

    afterAll(async () => {
      await run?.dispose();
      removeScratch(cwd);
    });

    it("the session holds exactly one tool result per judged row", () => {
      expect(replies.map((reply) => reply.tool)).toEqual(REFUSALS.map((row) => row.tool));
    });

    it.each(cases(REFUSALS))("%s %s: the recorded reply carries isError:%s", (_id, _label, _flagged, row) => {
      expectRow(replies, row);
    });
  });

  describe("F: failed runs (child sessions ending in a provider error)", () => {
    let run: PrintModeRun | undefined;
    let replies: Reply[] = [];

    beforeAll(async () => {
      const steps: Step[] = [
        agentCall({ description: "doomed foreground", prompt: "Do work.", run_in_background: false }),
        agentCall({ description: "doomed background", prompt: "Do work.", run_in_background: true }),
        (context) => fauxToolCall("get_subagent_result", { agent_id: launchedId(context), wait: true }),
        (context) => fauxToolCall("steer_subagent", { agent_id: launchedId(context), message: "hi" }),
        (context) => agentCall({ description: "resume doomed", prompt: "Try again.", resume: launchedId(context), run_in_background: false }),
      ];
      run = await runPrintMode({
        prompt: "Run the failure checks.",
        live: false,
        maxModelCalls: 32,
        respond: (context) => (taskOf(context).includes("Run the failure checks.") ? play(context, steps, "PARENT_DONE") : providerError()),
      });
      replies = repliesIn(run.parentSession.messages);
    });

    afterAll(async () => {
      await run?.dispose();
    });

    it("the session holds exactly one tool result per judged row", () => {
      expect(replies.map((reply) => reply.tool)).toEqual(FAILURES.map((row) => row.tool));
    });

    it.each(cases(FAILURES))("%s %s: the recorded reply carries isError:%s", (_id, _label, _flagged, row) => {
      expectRow(replies, row);
    });
  });

  describe("G: golden spawn, steer and result replies (positive control) and the two live-record resume refusals", () => {
    let run: PrintModeRun | undefined;
    let cwd: string | undefined;
    let replies: Reply[] = [];

    beforeAll(async () => {
      // The background child holds its first answer until the parent has steered
      // it and been refused both resumes, so each runs against a live record — no
      // timing. One concurrent agent keeps the second launch queued behind it.
      cwd = projectDir("r311-golden-", { maxConcurrent: 1 });
      let release: () => void = () => {};
      const released = new Promise<void>((resolve) => { release = resolve; });
      let started: () => void = () => {};
      const childStarted = new Promise<void>((resolve) => { started = resolve; });

      const steps: Step[] = [
        agentCall({ description: "golden foreground", prompt: "Say hello.", run_in_background: false }),
        agentCall({ description: "golden background", prompt: "Hold until released.", run_in_background: true }),
        async (context) => {
          await childStarted;
          return fauxToolCall("steer_subagent", { agent_id: launchedId(context), message: "Keep going." });
        },
        (context) => agentCall({ description: "resume live", prompt: "More.", resume: launchedId(context), run_in_background: true }),
        agentCall({ description: "queued background", prompt: "Queue behind the held one.", run_in_background: true }),
        (context) => agentCall({ description: "resume queued", prompt: "More.", resume: launchedId(context), run_in_background: false }),
        (context) => {
          release();
          return fauxToolCall("get_subagent_result", { agent_id: launchedId(context, "first"), wait: true });
        },
      ];
      run = await runPrintMode({
        prompt: "Run the golden checks.",
        cwd,
        live: false,
        maxModelCalls: 32,
        respond: async (context) => {
          const task = taskOf(context);
          if (task.includes("Run the golden checks.")) return play(context, steps, "PARENT_DONE");
          if (task.includes("Say hello.")) return "CHILD_HELLO";
          if (task.includes("Queue behind the held one.")) return "CHILD_QUEUED_DONE";
          started();
          await released;
          return "CHILD_DONE";
        },
      });
      replies = repliesIn(run.parentSession.messages);
    });

    afterAll(async () => {
      await run?.dispose();
      removeScratch(cwd);
    });

    it("the session holds exactly one tool result per judged row", () => {
      expect(replies.map((reply) => reply.tool)).toEqual(GOLDEN.map((row) => row.tool));
    });

    it.each(cases(GOLDEN))("%s %s: the recorded reply carries isError:%s", (_id, _label, _flagged, row) => {
      expectRow(replies, row);
    });
  });

  describe("A: top-level and nested variants agree on the flag per reply class", () => {
    let run: PrintModeRun | undefined;
    let cwd: string | undefined;
    let top: Reply[] = [];
    let nested: Reply[] = [];

    /** The same nine calls, at either level. */
    const checks = (): Step[] => [
      fauxToolCall("Agent", { subagent_type: "no-such-type", description: "unknown type", prompt: "x", run_in_background: false }),
      fauxToolCall("Agent", { subagent_type: "worker", description: "bad model", prompt: "x", model: "gpt-9000-nope" }),
      fauxToolCall("Agent", { subagent_type: "worker", description: "bad resume", prompt: "x", resume: GHOST }),
      fauxToolCall("get_subagent_result", { agent_id: GHOST }),
      fauxToolCall("steer_subagent", { agent_id: GHOST, message: "hi" }),
      fauxToolCall("Agent", { subagent_type: "worker", description: "doomed foreground", prompt: "Do the leaf work.", run_in_background: false }),
      fauxToolCall("Agent", { subagent_type: "worker", description: "doomed background", prompt: "Do the leaf work.", run_in_background: true }),
      (context) => fauxToolCall("get_subagent_result", { agent_id: launchedId(context), wait: true }),
      (context) => fauxToolCall("steer_subagent", { agent_id: launchedId(context), message: "hi" }),
    ];

    beforeAll(async () => {
      cwd = projectDir("r311-agreement-", { fallbackSubagent: "none" }, {
        // Opts into nesting for the one type the checks spawn.
        orchestrator: "---\ndescription: Nested-check orchestrator\ntools: read\nextensions: false\nallowed_subagents: worker\n---\nDelegate the checks.\n",
        worker: "---\ndescription: Leaf worker\ntools: read\nextensions: false\n---\nDo the work.\n",
      });
      const parentSteps: Step[] = [
        ...checks(),
        agentCall({ subagent_type: "orchestrator", description: "nested checks", prompt: "Run the nested checks.", run_in_background: false }),
      ];
      const orchestratorSteps = checks();
      run = await runPrintMode({
        prompt: "Run the agreement checks.",
        cwd,
        live: false,
        maxModelCalls: 64,
        beforeRun: () => { registerAgents(loadCustomAgents(cwd ?? "")); },
        respond: (context) => {
          const task = taskOf(context);
          if (task.includes("Run the agreement checks.")) return play(context, parentSteps, "PARENT_DONE");
          if (task.includes("Run the nested checks.")) {
            return play(context, orchestratorSteps, (final) => {
              nested = repliesIn(final.messages);
              return "ORCH_DONE";
            });
          }
          return providerError();
        },
      });
      top = repliesIn(run.parentSession.messages);
    });

    afterAll(async () => {
      await run?.dispose();
      removeScratch(cwd);
    });

    it("both levels ran every judged class (one tool result per row, same tools in the same order)", () => {
      expect(top.slice(0, AGREEMENT.length).map((reply) => reply.tool)).toEqual(AGREEMENT.map((row) => row.tool));
      expect(nested.map((reply) => reply.tool)).toEqual(AGREEMENT.map((row) => row.tool));
      // The parent's last call ran the orchestrator itself, which finished cleanly.
      expect(top[AGREEMENT.length]).toMatchObject({ tool: "Agent", isError: false, text: expect.stringMatching(/ORCH_DONE/) });
    });

    it.each(cases(AGREEMENT))("%s %s: top-level and nested both record isError:%s", (_id, _label, _flagged, row) => {
      expect(top[row.step]?.text).toMatch(row.top);
      expect(nested[row.step]?.text).toMatch(row.nested);
      expect({ top: top[row.step]?.isError, nested: nested[row.step]?.isError }).toEqual({ top: row.flagged, nested: row.flagged });
    });
  });

  // Frozen shape: the header names the judged set, and its counts are the tables'.
  // Removing, renaming or re-flagging a row, or hollowing the header, reds here.
  it("frozen shape: the header and every judged row", ({ task }) => {
    const header = task.suite?.name ?? "";
    expect(header).toBe("EAT-R311 in a real pi session: 15 top-level Agent, steer_subagent and get_subagent_result refusal and failed-run replies record isError:true, 6 success replies record isError:false, and 9 reply classes record the same flag at the top level and in the nested tools");
    const topLevel = [...REFUSALS, ...FAILURES, ...GOLDEN];
    const counts = /: (\d+) top-level .* record isError:true, (\d+) success replies record isError:false, and (\d+) reply classes /.exec(header)?.slice(1).map(Number);
    expect(counts).toEqual([topLevel.filter((row) => row.flagged).length, topLevel.filter((row) => !row.flagged).length, AGREEMENT.length]);
    const shape = (rows: Array<{ id: string; step: number; tool: string; flagged: boolean; label: string }>) =>
      rows.map((row) => `${row.id}:${row.step}:${row.tool}:${row.flagged}:${row.label}`);
    expect(shape(REFUSALS)).toEqual([
      "R01:0:Agent:true:unknown agent type under strict dispatch",
      "R02:1:Agent:true:model not found",
      "R03:2:Agent:true:agent not found (Agent resume)",
      "R04:3:steer_subagent:true:agent not found (steer_subagent)",
      "R05:4:get_subagent_result:true:agent not found (get_subagent_result)",
      "R06:5:Agent:true:schedule combined with resume",
      "R07:6:Agent:true:schedule combined with inherit_context",
      "R08:7:Agent:true:schedule combined with run_in_background: false",
      "R09:8:Agent:true:a schedule the live scheduler cannot parse",
    ]);
    expect(shape(FAILURES)).toEqual([
      "F01:0:Agent:true:foreground spawn whose run failed",
      "F02:1:Agent:false:background launch (the launch itself succeeded)",
      "F03:2:get_subagent_result:true:get_subagent_result of the failed background run",
      "F04:3:steer_subagent:true:steer_subagent of a run that already failed",
      "F05:4:Agent:true:foreground resume whose run failed",
    ]);
    expect(shape(GOLDEN)).toEqual([
      "G01:0:Agent:false:foreground spawn that completed",
      "G02:1:Agent:false:background launch",
      "G03:2:steer_subagent:false:steer_subagent of a running agent",
      "G04:3:Agent:true:background resume of a still-running agent (refused)",
      "G05:4:Agent:false:background launch queued behind the concurrency limit",
      "G06:5:Agent:true:foreground resume of a queued agent (no session yet, refused)",
      "G07:6:get_subagent_result:false:get_subagent_result of the completed run",
    ]);
    expect(shape(AGREEMENT)).toEqual([
      "A01:0:Agent:true:unknown agent type",
      "A02:1:Agent:true:model not found",
      "A03:2:Agent:true:agent not found (Agent resume)",
      "A04:3:get_subagent_result:true:agent not found (get_subagent_result)",
      "A05:4:steer_subagent:true:agent not found (steer_subagent)",
      "A06:5:Agent:true:failed run (foreground Agent)",
      "A07:6:Agent:false:background launch (unflagged at both levels)",
      "A08:7:get_subagent_result:true:failed run (get_subagent_result of a failed background run)",
      "A09:8:steer_subagent:true:steer refused (agent not running)",
    ]);
  });
});
