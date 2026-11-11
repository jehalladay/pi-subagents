/**
 * wb-69g.4: the host's string-prompt Claude query keeps its stream-json stdin open for the whole run, and an interrupt() through
 * the seam the host retains is written to that same stdin mid-turn - measured against the vendored Claude Agent SDK
 * (@anthropic-ai/claude-agent-sdk, installed at 0.3.300) over a stub CLI this file writes.
 *
 * The bead's premise read the SDK's doc comment on Query (sdk.d.ts: its control requests "are only supported when streaming
 * input/output is used") against the host's string prompt (src/workbench/claude-host.ts, query({ prompt, options })). What this
 * file measures is the vendored implementation under that prompt. Each case drives a fresh query; the stub appends its argv, every
 * stdin line it reads, every frame it emits and its stdin EOF, in order, to a timeline file the case reads back. Pinned reader set:
 *  SPC1 the host's string-prompt query under the installed SDK 0.3.300: the CLI argv carries --input-format stream-json and --output-format stream-json, no argv entry carries the prompt, and the prompt arrives as exactly one stdin user message, after the initialize control request.
 *  SPC2 the host's string-prompt query: interrupt() through the seam the host hands to onQueryLive, issued at the turn's first assistant frame, reaches the CLI as an interrupt control request on that stdin after the user message and before EOF, and resolves undefined on the CLI's empty success answer.
 *  SPC3 the host's string-prompt query: that stdin stays open until the run's own result - the CLI sees exactly one EOF, after it emitted the result, and the host settles the run from that result (its error text, not skipped) and fires onQueryDone once.
 *  SPC4 the vendored SDK alone, a one-message AsyncIterable prompt with no bidirectional needs: the CLI sees EOF after the user message with no result emitted, and an interrupt() issued at the first assistant frame rejects and never reaches the CLI.
 * Falsifiers: SPC1 reds if the vendored SDK stops passing --input-format stream-json or carries the string prompt on argv; SPC2 reds
 * if the host stops handing the seam to onQueryLive or its query's stdin is ended before the turn's first assistant frame; SPC3 reds if
 * the host's query ends its stdin before the result (the SPC4 prompt form planted in the host); SPC4 reds if the vendored SDK keeps a
 * one-message iterable's stdin open until its run ends.
 *
 * NOT CLAIMED: whether the CLI stops a turn on an interrupt is NOT CLAIMED by this file (the live tier,
 * test/workbench-claude-control-live.test.ts, drives a real CLI). The workflow_control tool path is NOT CLAIMED by this file. SDK
 * versions other than the vendored 0.3.300 are NOT CLAIMED by this file. Queries with bidirectional needs (SDK MCP servers, hooks,
 * canUseTool), resume queries and an interrupt issued after the run's result are NOT CLAIMED by this file. A streaming-input host
 * that keeps its iterable open until the result is NOT CLAIMED by this file, either way.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { type SDKUserMessage, query as sdkQuery } from "@anthropic-ai/claude-agent-sdk";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { ClaudeInterruptSeam } from "../src/workbench/claude-control.js";
import { type ClaudeCallIdentity, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import type { WorkflowSpawnRequest, WorkflowSpawnResult } from "../src/workflow/runtime.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

/** The session id the stub reports: a fixed fake, never a real session. */
const STUB_SESSION = "22222222-3333-4444-8555-666666666666";
/** The prompt every case sends: a distinctive token, so argv and stdin can be searched for it. */
const PROMPT = "string-prompt-token-5e1d";
/** The one error the stub's result frame carries; the host's settled error text echoes it. */
const RESULT_ERROR = "stub ended the turn on its interrupt";
/** The bound on one query: past it the case aborts the run, so a red reads as a failed assertion, never a hung suite. */
const RUN_BOUND_MS = 15_000;

/**
 * Stub Claude Code executable. It appends {event:"argv"} first, then one entry per stdin line ({event:"line"}: the type, a control
 * request's subtype, a user message's first text), per frame it emits ({event:"emit"}) and {event:"eof"} when stdin ends. It answers
 * every control request with an empty success response, emits system/init after the first line, an assistant frame after a user
 * message and, after answering an interrupt, a result frame carrying RESULT_ERROR; on stdin EOF it flushes stdout and exits 0.
 */
const STUB = `
import { appendFileSync } from "node:fs";
import { createInterface } from "node:readline";
const timeline = process.env.STUB_TIMELINE;
const record = (entry) => appendFileSync(timeline, JSON.stringify(entry) + "\\n");
const write = (message) => process.stdout.write(JSON.stringify(message) + "\\n");
const emit = (label, message) => { record({ event: "emit", type: label }); write(message); };
const session = ${JSON.stringify(STUB_SESSION)};
record({ event: "argv", args: process.argv.slice(2) });
let initSent = false;
const lines = createInterface({ input: process.stdin });
lines.on("line", (line) => {
  let message;
  try { message = JSON.parse(line); } catch { return; }
  if (message.type === "control_request") {
    const subtype = message.request ? message.request.subtype : undefined;
    record({ event: "line", type: "control_request", subtype });
    write({ type: "control_response", response: { subtype: "success", request_id: message.request_id, response: {} } });
    if (subtype === "interrupt") {
      emit("result", { type: "result", subtype: "error_during_execution", is_error: true, duration_ms: 1, duration_api_ms: 0, num_turns: 1, session_id: session, total_cost_usd: 0, usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 }, modelUsage: {}, permission_denials: [], errors: [${JSON.stringify(RESULT_ERROR)}], uuid: "22222222-3333-4444-8555-666666666669" });
    }
  } else {
    const content = message.message && Array.isArray(message.message.content) ? message.message.content : [];
    const text = content.find((block) => block && block.type === "text");
    record({ event: "line", type: message.type, text: text ? text.text : null });
    if (message.type === "user") {
      emit("assistant", { type: "assistant", session_id: session, parent_tool_use_id: null, uuid: "22222222-3333-4444-8555-666666666668", message: { id: "msg_stub", type: "message", role: "assistant", model: "stub", content: [{ type: "text", text: "stub turn started" }], stop_reason: null, stop_sequence: null, usage: { input_tokens: 0, output_tokens: 0 } } });
    }
  }
  if (!initSent) {
    initSent = true;
    emit("system/init", { type: "system", subtype: "init", session_id: session, model: "stub", cwd: process.cwd(), tools: [], mcp_servers: [], permissionMode: "dontAsk", apiKeySource: "none", slash_commands: [], output_style: "default", uuid: "22222222-3333-4444-8555-666666666667" });
  }
});
lines.on("close", () => {
  record({ event: "eof" });
  process.stdout.write("", () => process.exit(0));
});
setInterval(() => {}, 1000);
`;

/** The installed SDK's own package.json (its exports map does not export ./package.json, so it is read by path). */
const SDK_PACKAGE = fileURLToPath(new URL("../node_modules/@anthropic-ai/claude-agent-sdk/package.json", import.meta.url));

const CALL: ClaudeCallIdentity = { agentId: "wf-agent-0", index: 0, label: "wf-agent-0" };
const REQUEST: WorkflowSpawnRequest = { agentId: CALL.agentId, index: CALL.index, prompt: PROMPT, label: CALL.label, agentType: "general-purpose" };

interface TimelineEntry {
  readonly event: "argv" | "line" | "emit" | "eof";
  readonly args?: readonly string[];
  readonly type?: string;
  readonly subtype?: string;
  readonly text?: string | null;
}
type Answer = { kind: "resolved"; value: unknown } | { kind: "rejected"; message: string };

let dir = "";
let stubPath = "";
let runs = 0;
beforeAll(() => {
  dir = makeScratch("wb-69g4-channel-");
  stubPath = join(dir, "stub-claude.mjs");
  writeFileSync(stubPath, STUB);
});
afterAll(() => {
  removeScratch(dir);
});

async function settle(promise: Promise<unknown>): Promise<Answer> {
  try {
    return { kind: "resolved", value: await promise };
  } catch (error) {
    return { kind: "rejected", message: error instanceof Error ? error.message : String(error) };
  }
}

function nextTimelinePath(): string {
  runs += 1;
  const path = join(dir, `timeline-${runs}.jsonl`);
  writeFileSync(path, "");
  return path;
}

function readTimeline(path: string): TimelineEntry[] {
  return readFileSync(path, "utf8").split("\n").filter(line => line.length > 0).map(line => JSON.parse(line) as TimelineEntry);
}

/** One label per timeline entry: "argv", "line:<type>[:<subtype>]", "emit:<type>" or "eof". */
function labels(timeline: readonly TimelineEntry[]): string[] {
  return timeline.map(entry => {
    if (entry.event === "line") return entry.subtype === undefined ? `line:${entry.type}` : `line:${entry.type}:${entry.subtype}`;
    if (entry.event === "emit") return `emit:${entry.type}`;
    return entry.event;
  });
}

/** The value that follows `flag` in argv, or undefined when the flag is absent or last. */
function flagValue(argv: readonly string[], flag: string): string | undefined {
  const at = argv.indexOf(flag);
  return at < 0 ? undefined : argv[at + 1];
}

interface HostRun {
  readonly timeline: TimelineEntry[];
  readonly seamRetained: boolean;
  readonly interrupt: Answer | undefined;
  readonly result: WorkflowSpawnResult;
  readonly done: number;
}

/**
 * One query through the REAL createClaudeWorkflowHost and the REAL SDK, the host's query seam pinning only the stub executable and
 * its timeline (the abort-ack-grace pattern). At the turn's first assistant frame the case interrupts through the seam the host
 * handed to onQueryLive; with no seam it aborts the run, so the run always ends.
 */
async function hostRun(): Promise<HostRun> {
  const timelinePath = nextTimelinePath();
  const controller = new AbortController();
  const bound = setTimeout(() => controller.abort(), RUN_BOUND_MS);
  let seam: ClaudeInterruptSeam | undefined;
  let pending: Promise<void> | undefined;
  let interrupt: Answer | undefined;
  let done = 0;
  const host = createClaudeWorkflowHost({
    cwd: dir,
    signal: controller.signal,
    settingSources: [],
    query: ({ prompt, options }) => sdkQuery({ prompt, options: { ...options, pathToClaudeCodeExecutable: stubPath, env: { ...process.env, STUB_TIMELINE: timelinePath } } }),
    onQueryLive: (_call, live) => {
      seam = live;
    },
    onQueryDone: () => {
      done += 1;
    },
    onMessage: message => {
      if (message.type !== "assistant" || pending !== undefined) return;
      if (seam === undefined) {
        controller.abort();
        pending = Promise.resolve();
        return;
      }
      pending = settle(seam.interrupt()).then(answer => {
        interrupt = answer;
      });
    },
  });
  try {
    const result = await host.spawnAgent(REQUEST);
    await pending;
    return { timeline: readTimeline(timelinePath), seamRetained: seam !== undefined, interrupt, result, done };
  } finally {
    clearTimeout(bound);
  }
}

async function* oneMessage(text: string): AsyncGenerator<SDKUserMessage> {
  yield { type: "user", message: { role: "user", content: [{ type: "text", text }] }, parent_tool_use_id: null, session_id: "" };
}

interface IterableRun {
  readonly timeline: TimelineEntry[];
  readonly interrupt: Answer | undefined;
}

/** One query straight through the vendored SDK with a one-message AsyncIterable prompt and no bidirectional needs. */
async function iterableRun(): Promise<IterableRun> {
  const timelinePath = nextTimelinePath();
  const abortController = new AbortController();
  const bound = setTimeout(() => abortController.abort(), RUN_BOUND_MS);
  const live = sdkQuery({
    prompt: oneMessage(PROMPT),
    options: { cwd: dir, settingSources: [], abortController, pathToClaudeCodeExecutable: stubPath, env: { ...process.env, STUB_TIMELINE: timelinePath } },
  });
  let pending: Promise<void> | undefined;
  let interrupt: Answer | undefined;
  try {
    for await (const message of live) {
      if (message.type === "assistant" && pending === undefined) {
        pending = settle(live.interrupt()).then(answer => {
          interrupt = answer;
        });
      }
    }
  } catch {
    // The stub leaves without a result once its stdin ends; how the SDK reports that exit is not this file's subject.
  } finally {
    clearTimeout(bound);
  }
  await pending;
  return { timeline: readTimeline(timelinePath), interrupt };
}

describe("wb-69g.4 the host's string-prompt query keeps its stream-json stdin open, and the retained interrupt rides it", () => {
  it("SPC1 under the installed SDK 0.3.300 the CLI argv carries --input-format stream-json and --output-format stream-json, no argv entry carries the prompt, and the prompt arrives as exactly one stdin user message after the initialize control request", async () => {
    expect((JSON.parse(readFileSync(SDK_PACKAGE, "utf8")) as { version?: unknown }).version).toBe("0.3.300");
    const run = await hostRun();
    const argv = run.timeline[0]?.event === "argv" ? (run.timeline[0].args ?? []) : [];
    expect(flagValue(argv, "--input-format")).toBe("stream-json");
    expect(flagValue(argv, "--output-format")).toBe("stream-json");
    expect(argv.some(arg => arg.includes(PROMPT))).toBe(false);
    const users = run.timeline.filter(entry => entry.event === "line" && entry.type === "user");
    expect(users.map(entry => entry.text)).toEqual([PROMPT]);
    const order = labels(run.timeline);
    expect(order.indexOf("line:control_request:initialize")).toBeGreaterThan(-1);
    expect(order.indexOf("line:user")).toBeGreaterThan(order.indexOf("line:control_request:initialize"));
  }, 30_000);

  it("SPC2 interrupt() through the seam the host hands to onQueryLive, issued at the turn's first assistant frame, reaches the CLI as an interrupt control request after the user message and before EOF, and resolves undefined on the CLI's empty success answer", async () => {
    const run = await hostRun();
    expect(run.seamRetained).toBe(true);
    expect(run.interrupt).toEqual({ kind: "resolved", value: undefined });
    const order = labels(run.timeline);
    const user = order.indexOf("line:user");
    const assistant = order.indexOf("emit:assistant");
    const interrupt = order.indexOf("line:control_request:interrupt");
    expect(user).toBeGreaterThan(-1);
    expect(assistant).toBeGreaterThan(user);
    expect(interrupt).toBeGreaterThan(assistant);
    expect(order.filter(label => label === "line:control_request:interrupt")).toHaveLength(1);
    expect(order.indexOf("eof")).toBeGreaterThan(interrupt);
  }, 30_000);

  it("SPC3 that stdin stays open until the run's own result: the CLI sees exactly one EOF, after it emitted the result, and the host settles the run from that result and fires onQueryDone once", async () => {
    const run = await hostRun();
    const order = labels(run.timeline);
    const result = order.indexOf("emit:result");
    expect(result).toBeGreaterThan(order.indexOf("line:user"));
    expect(order.filter(label => label === "eof")).toHaveLength(1);
    expect(order.indexOf("eof")).toBeGreaterThan(result);
    expect(run.result).toEqual({ ok: false, error: RESULT_ERROR, sessionId: STUB_SESSION });
    expect(run.done).toBe(1);
  }, 30_000);

  it("SPC4 the vendored SDK alone, a one-message AsyncIterable prompt with no bidirectional needs: the CLI sees EOF after the user message with no result emitted, and an interrupt() issued at the first assistant frame rejects and never reaches the CLI", async () => {
    const run = await iterableRun();
    const order = labels(run.timeline);
    expect(order.filter(label => label === "line:user")).toHaveLength(1);
    expect(order.indexOf("eof")).toBeGreaterThan(order.indexOf("line:user"));
    expect(order).not.toContain("emit:result");
    expect(order).not.toContain("line:control_request:interrupt");
    expect(run.interrupt?.kind).toBe("rejected");
  }, 30_000);
});
