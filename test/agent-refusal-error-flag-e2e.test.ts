/**
 * agent-refusal-error-flag-e2e.test.ts — EAT-R311 (wb-wkqp, DX P01; audited
 * claim C009), read in a real pi session. The pinned reader set, by case id:
 *
 *   R01-R09, F01, F03-F05, G04, G06, T01 — 16 top-level Agent, steer_subagent
 *     and get_subagent_result replies reporting a refusal or a failed run, each
 *     recorded with pi's tool-result error flag (isError:true);
 *   F02, G01, G02, G03, G05, G07 — 6 success replies, each recorded unflagged;
 *   A01-A09 — 9 reply classes whose top-level and nested replies record the
 *     same flag;
 *   C01-C02 — the failed foreground spawn (F01's result) and the failed
 *     foreground resume (F05's result): each recorded result keeps its status
 *     "error" details, and the registered Agent tool's own renderer, read off
 *     the live session, draws it as the error card.
 *
 * The flag is read where pi RECORDED it — `isError` on each tool-result message
 * of the session (pi-agent-core's agent loop keeps `result.isError === true`) —
 * through the real loader, the real extension, real runAgent and real child
 * sessions on a scripted faux model (tier V3), not the handler's own return
 * value. Every run pins `live: false`: the scenarios are scripted refusals and
 * provider errors that no live model produces on request.
 *
 * NOT CLAIMED (scope sentences; each bounds what this census reads):
 *   - The flag on the two "Failed to resume agent" replies (background and
 *     foreground resume) is NOT CLAIMED by this census: no case reaches them.
 *   - The flag on stopped and aborted (max-turns) run replies is NOT CLAIMED by
 *     this census.
 *   - Every other success reply of these tools (a steer queued before the
 *     child's session exists, get_subagent_result of a running agent, the
 *     "Scheduled ..." reply, a resume that completed) is NOT CLAIMED by this
 *     census.
 *   - Top-level and nested agreement for any class outside A01-A09 is NOT
 *     CLAIMED by this census.
 *   - Reply wording beyond the pattern each row pins is NOT CLAIMED by this
 *     census.
 *   - The rendered card of any result other than C01-C02's is NOT CLAIMED by
 *     this census.
 *   - Every other tool's replies, and EAT-R312..R316 and EAT-R320, are NOT
 *     CLAIMED by this census.
 *   - The 6 success rows and the A01-A09 agreement rows have no anchor outside
 *     this file: removing one of them from every literal here (table row,
 *     script step, frozen entry and header count) is NOT CLAIMED to red this
 *     census.
 *   - Where in src/index.ts each counted errorResult call sits, and what its
 *     result does after the call (a flag overridden afterwards, or a path no
 *     input reaches), are NOT CLAIMED by the source anchors: they count call
 *     expressions in the parse, and each flagged row here pins its own
 *     recorded reply.
 *
 * Each scripted turn makes exactly one tool call, so a session's tool results
 * line up with its steps one to one, and every row checks the reply's text as
 * well as its flag: a misaligned script fails instead of passing vacuously. The
 * frozen shape at the end pins the header counts, every judged row, the
 * registered cases (vitest's task tree: each in run mode and run before it), and
 * anchors outside this file, read from the TypeScript parse of src/index.ts
 * rather than its text, so a comment or a string that mentions errorResult(
 * never counts (the same case first checks the reader on a probe source that
 * names errorResult 7 times, once in a real call): exactly 21 call expressions
 * whose callee is the identifier errorResult, as many as the 16
 * flagged rows here, D01-D03 of test/agent-refusal-error-flag.test.ts and the
 * two NOT CLAIMED resume sites; no other occurrence of that identifier but the
 * helper's own top-level declaration (no alias, shadow or second binding);
 * exactly 2 of the calls with a message that begins "Failed to resume agent",
 * as many as those two resume sites; and exactly 2 with a message that carries
 * "Agent failed: ", as many as the C rows.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { type Context, fauxAssistantMessage, fauxToolCall, type ToolResultMessage, type UserMessage } from "@earendil-works/pi-ai";
import ts from "typescript";
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
/** A command the T block's project extension registers; pi's session refuses to queue its text as a steer. */
const PROBE_COMMAND = "r311probe";

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

/** A plain-text theme, so a rendered card reads as the text the operator sees. */
const PLAIN_THEME = {
  fg: (_color: string, text: string) => text,
  bold: (text: string) => text,
};

/** The slice of a registered tool definition this census calls: its result renderer. */
interface CardRenderer {
  renderResult(
    result: { content: ToolResultMessage["content"]; details: unknown },
    options: { expanded: boolean; isPartial: boolean },
    theme: typeof PLAIN_THEME,
    context: { isError: boolean },
  ): { render(width: number): string[] };
}

function isCardRenderer(value: unknown): value is CardRenderer {
  return typeof value === "object" && value !== null && "renderResult" in value && typeof value.renderResult === "function";
}

/** The collapsed row the live session's own Agent renderer draws for a recorded result. */
function cardOf(run: PrintModeRun | undefined, message: ToolResultMessage): string {
  const tool: unknown = run?.parentSession.getToolDefinition("Agent");
  if (!isCardRenderer(tool)) throw new Error("the live session registers no Agent renderer");
  return tool
    .renderResult({ content: message.content, details: message.details }, { expanded: false, isPartial: false }, PLAIN_THEME, { isError: message.isError })
    .render(120)
    .join("\n");
}

/** The status fields a recorded result's details carry (undefined when it has none). */
function statusOf(details: unknown): { status: unknown; error: unknown } {
  if (typeof details !== "object" || details === null) return { status: undefined, error: undefined };
  return { status: "status" in details ? details.status : undefined, error: "error" in details ? details.error : undefined };
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

interface CardRow {
  id: string;
  /** Index of the F block's scripted step whose recorded result is drawn. */
  step: number;
  label: string;
  tool: string;
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

const ALIGNED = "the session holds exactly one tool result per judged row";
const STEER_ALIGNED = "the session holds the held launch, one tool result per judged row and the closing result read";
const AGREE_ALIGNED = "both levels ran every judged class (one tool result per row, same tools in the same order)";
const FLAG_CASE = "%s %s: the recorded reply carries isError:%s";
const CARD_CASE = "%s %s: the recorded result keeps its status error details and the live Agent renderer draws the error card";
const AGREE_CASE = "%s %s: top-level and nested both record isError:%s";

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

// The F block's two flagged failed runs that carry the Agent tool's own status
// details: each recorded result, drawn by the live session's Agent renderer.
const CARDS: CardRow[] = [
  { id: "C01", step: 0, label: "failed foreground spawn (F01's result)", tool: "Agent" },
  { id: "C02", step: 4, label: "failed foreground resume (F05's result)", tool: "Agent" },
];

const GOLDEN: Row[] = [
  { id: "G01", step: 0, label: "foreground spawn that completed", tool: "Agent", text: /^Agent completed in [\s\S]*CHILD_HELLO/, flagged: false },
  { id: "G02", step: 1, label: "background launch", tool: "Agent", text: /^Agent started in background\./, flagged: false },
  { id: "G03", step: 2, label: "steer_subagent of a running agent", tool: "steer_subagent", text: /^Steering message sent to agent /, flagged: false },
  // The two refusals that need a live record to reach: the background-resume
  // refusal (the C029 wording, pinned in full here) and a resume of an agent
  // still queued, which has no session yet.
  {
    id: "G04",
    step: 3,
    label: "background resume of a still-running agent (refused)",
    tool: "Agent",
    text: /^Agent "[^"]+" is still running — it can only be resumed once its current run finishes\.\nUse steer_subagent to send it a message mid-run, or get_subagent_result to wait for it\.$/,
    flagged: true,
  },
  { id: "G05", step: 4, label: "background launch queued behind the concurrency limit", tool: "Agent", text: /^Agent queued in background\./, flagged: false },
  { id: "G06", step: 5, label: "foreground resume of a queued agent (no session yet, refused)", tool: "Agent", text: /^Agent "[^"]+" has no active session to resume\./, flagged: true },
  { id: "G07", step: 6, label: "get_subagent_result of the completed run", tool: "get_subagent_result", text: /Status: completed[\s\S]*CHILD_DONE/, flagged: false },
];

// A steer that reaches the running child's session and is refused there: pi's
// AgentSession will not queue the text of a registered extension command.
const STEER_REFUSALS: Row[] = [
  {
    id: "T01",
    step: 1,
    label: "steer_subagent of a running agent whose session refuses to queue the steer (an extension command)",
    tool: "steer_subagent",
    text: /^Failed to steer agent: Extension command "\/r311probe" cannot be queued\./,
    flagged: true,
  },
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

/** D01-D03 of test/agent-refusal-error-flag.test.ts: the flagged refusals a live session never reaches. */
const DIRECT_CENSUS_FLAGGED = 3;
/** The two "Failed to resume agent" errorResult sites, NOT CLAIMED above. */
const NOT_CLAIMED_SITES = 2;
/** How both of those sites' messages begin (the background and the foreground resume). */
const RESUME_FAILURE = "Failed to resume agent ";
/** The text of each errorResult message that reports a failed Agent run (the C rows' sites). */
const FAILED_RUN = "Agent failed: ";
/** The reader's label for the one errorResult identifier that is not a call: the helper's own declaration. */
const HELPER_DECLARATION = "the top-level function declaration";

/**
 * The errorResult identifiers of a TypeScript source, read from its parse
 * rather than its text, so a comment or a string that mentions errorResult(
 * never counts. `calls` holds each call expression whose callee is the
 * identifier errorResult, in source order, with its first argument's literal
 * text (a string, or a template's literal parts with every substitution
 * dropped; "" for any other expression); `others` labels every other
 * occurrence of the identifier by the syntax node it sits in.
 */
function errorResultIdentifiers(source: string): { calls: Array<{ message: string }>; others: string[] } {
  const file = ts.createSourceFile("index.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const calls: Array<{ message: string }> = [];
  const others: string[] = [];
  const literalText = (node: ts.Expression | undefined): string => {
    if (node === undefined) return "";
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isTemplateExpression(node)) return [node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join("");
    return "";
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && node.text === "errorResult") {
      const parent = node.parent;
      if (ts.isCallExpression(parent) && parent.expression === node) calls.push({ message: literalText(parent.arguments[0]) });
      else others.push(ts.isFunctionDeclaration(parent) && parent.name === node && parent.parent === file ? HELPER_DECLARATION : ts.SyntaxKind[parent.kind]);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { calls, others };
}

/**
 * A probe source the reader must read as ONE errorResult call beside the
 * helper's declaration: the commented-out call (the shape of the gate's
 * G-S13X/G-S14X members), the line and block comments, the JSDoc link and the
 * strings all name errorResult( without calling it.
 */
const READER_PROBE = [
  "/** Flags the reply: {@link errorResult} is textResult plus isError. */",
  "function errorResult(msg: string) {",
  "  return msg;",
  "}",
  '// return errorResult("commented out");',
  '/* errorResult("block comment") */',
  "const quoted = 'errorResult(string)';",
  "const templated = `errorResult(template)`;",
  'export const real = errorResult("real");',
].join("\n");

describe("EAT-R311 in a real pi session: 16 top-level Agent, steer_subagent and get_subagent_result refusal and failed-run replies record isError:true, 6 success replies record isError:false, 9 reply classes record the same flag at the top level and in the nested tools, and 2 failed foreground runs keep their status error details and render the live Agent tool's error card", () => {
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

    it(ALIGNED, () => {
      expect(replies.map((reply) => reply.tool)).toEqual(REFUSALS.map((row) => row.tool));
    });

    it.each(cases(REFUSALS))(FLAG_CASE, (_id, _label, _flagged, row) => {
      expectRow(replies, row);
    });
  });

  describe("F: failed runs (child sessions ending in a provider error) and the error cards their records render", () => {
    let run: PrintModeRun | undefined;
    let records: ToolResultMessage[] = [];
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
      records = run.parentSession.messages.filter(isToolResult);
      replies = repliesIn(run.parentSession.messages);
    });

    afterAll(async () => {
      await run?.dispose();
    });

    it(ALIGNED, () => {
      expect(replies.map((reply) => reply.tool)).toEqual(FAILURES.map((row) => row.tool));
    });

    it.each(cases(FAILURES))(FLAG_CASE, (_id, _label, _flagged, row) => {
      expectRow(replies, row);
    });

    it.each(CARDS.map((row): [string, string, CardRow] => [row.id, row.label, row]))(CARD_CASE, (_id, _label, row) => {
      const record = records[row.step];
      expect(record, `${row.id} step ${row.step} (${row.label}) produced no tool result`).toBeDefined();
      expect({ tool: record.toolName, isError: record.isError }).toEqual({ tool: row.tool, isError: true });
      // The Agent tool's own details reach pi's record: the status the card is drawn from.
      expect(statusOf(record.details)).toEqual({ status: "error", error: FATAL });
      const card = cardOf(run, record);
      expect(card).toContain(`Error: ${FATAL}`);
      // The text fallback would show the reply itself, headline and all.
      expect(card).not.toContain("Agent failed:");
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

    it(ALIGNED, () => {
      expect(replies.map((reply) => reply.tool)).toEqual(GOLDEN.map((row) => row.tool));
    });

    it.each(cases(GOLDEN))(FLAG_CASE, (_id, _label, _flagged, row) => {
      expectRow(replies, row);
    });
  });

  describe("T: a steer the running child's session refuses to queue (an extension command)", () => {
    let run: PrintModeRun | undefined;
    let cwd: string | undefined;
    let replies: Reply[] = [];

    beforeAll(async () => {
      // A project extension registers one command; the parent and the child
      // load it, and pi's AgentSession refuses to queue that command's text as a
      // steer, so steer_subagent's own steer call throws. The child holds its
      // answer until the steer was refused, so the record is running throughout.
      cwd = projectDir("r311-steer-", {});
      mkdirSync(join(cwd, ".pi", "extensions"), { recursive: true });
      writeFileSync(
        join(cwd, ".pi", "extensions", `${PROBE_COMMAND}.ts`),
        `export default function (pi) {\n  pi.registerCommand("${PROBE_COMMAND}", { description: "EAT-R311 steer refusal probe", handler: async () => {} });\n}\n`,
      );
      let release: () => void = () => {};
      const released = new Promise<void>((resolve) => { release = resolve; });
      let started: () => void = () => {};
      const childStarted = new Promise<void>((resolve) => { started = resolve; });

      const steps: Step[] = [
        agentCall({ description: "held background", prompt: "Hold until the steer is refused.", run_in_background: true }),
        async (context) => {
          await childStarted;
          return fauxToolCall("steer_subagent", { agent_id: launchedId(context), message: `/${PROBE_COMMAND}` });
        },
        (context) => {
          release();
          return fauxToolCall("get_subagent_result", { agent_id: launchedId(context), wait: true });
        },
      ];
      run = await runPrintMode({
        prompt: "Run the steer refusal check.",
        cwd,
        live: false,
        maxModelCalls: 16,
        respond: async (context) => {
          if (taskOf(context).includes("Run the steer refusal check.")) return play(context, steps, "PARENT_DONE");
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

    it(STEER_ALIGNED, () => {
      expect(replies.map((reply) => reply.tool)).toEqual(["Agent", ...STEER_REFUSALS.map((row) => row.tool), "get_subagent_result"]);
      // The scaffold around the judged row: the held launch and the read after release.
      expect(replies[0]?.text).toMatch(/^Agent started in background\./);
      expect(replies[2]?.text).toMatch(/Status: completed[\s\S]*CHILD_DONE/);
    });

    it.each(cases(STEER_REFUSALS))(FLAG_CASE, (_id, _label, _flagged, row) => {
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

    it(AGREE_ALIGNED, () => {
      expect(top.slice(0, AGREEMENT.length).map((reply) => reply.tool)).toEqual(AGREEMENT.map((row) => row.tool));
      expect(nested.map((reply) => reply.tool)).toEqual(AGREEMENT.map((row) => row.tool));
      // The parent's last call ran the orchestrator itself, which finished cleanly.
      expect(top[AGREEMENT.length]).toMatchObject({ tool: "Agent", isError: false, text: expect.stringMatching(/ORCH_DONE/) });
    });

    it.each(cases(AGREEMENT))(AGREE_CASE, (_id, _label, _flagged, row) => {
      expect(top[row.step]?.text).toMatch(row.top);
      expect(nested[row.step]?.text).toMatch(row.nested);
      expect({ top: top[row.step]?.isError, nested: nested[row.step]?.isError }).toEqual({ top: row.flagged, nested: row.flagged });
    });
  });
});

// Frozen shape, registered beside the census block rather than inside it, so
// a skipped block still reaches it: the header names the judged set and its
// counts are the tables'; every judged row is listed; the registered cases are
// exactly the tables' (vitest's task tree), each in run mode, not inverted, and
// run before this case; and src/index.ts — outside this file, read from its
// TypeScript parse — holds one errorResult call expression per flagged row
// here, per flagged row of the direct census and per NOT CLAIMED resume site,
// no other errorResult identifier but the helper's declaration, two calls with
// the resume-failure message, and one "Agent failed:" call per C row.
// Removing, renaming, re-flagging or skipping a row, or hollowing the header,
// reds here. Skipping this case itself, or deleting one of its own assertions
// (the probe check included), is NOT CLAIMED by this census.
it("frozen shape: the header, every judged row, the registered cases and the source anchor", ({ task }) => {
  const header = task.file.tasks.find((entry) => entry.type === "suite")?.name ?? "";
  expect(header).toBe("EAT-R311 in a real pi session: 16 top-level Agent, steer_subagent and get_subagent_result refusal and failed-run replies record isError:true, 6 success replies record isError:false, 9 reply classes record the same flag at the top level and in the nested tools, and 2 failed foreground runs keep their status error details and render the live Agent tool's error card");
  const topLevel = [...REFUSALS, ...FAILURES, ...GOLDEN, ...STEER_REFUSALS];
  const counts = /: (\d+) top-level .* record isError:true, (\d+) success replies record isError:false, (\d+) reply classes .*, and (\d+) failed foreground runs /.exec(header)?.slice(1).map(Number);
  expect(counts).toEqual([topLevel.filter((row) => row.flagged).length, topLevel.filter((row) => !row.flagged).length, AGREEMENT.length, CARDS.length]);
  const shape = (rows: Array<{ id: string; step: number; tool: string; label: string; flagged?: boolean }>) =>
    rows.map((row) => `${row.id}:${row.step}:${row.tool}:${row.flagged ?? "card"}:${row.label}`);
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
  expect(shape(CARDS)).toEqual([
    "C01:0:Agent:card:failed foreground spawn (F01's result)",
    "C02:4:Agent:card:failed foreground resume (F05's result)",
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
  expect(shape(STEER_REFUSALS)).toEqual([
    "T01:1:steer_subagent:true:steer_subagent of a running agent whose session refuses to queue the steer (an extension command)",
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

  // The registered cases, read from vitest's task tree: exactly the tables',
  // in order, each in run mode, not inverted, and run before this case.
  const flagCase = (row: Row) => `${row.id} ${row.label}: the recorded reply carries isError:${row.flagged}`;
  const roster = [
    ALIGNED, ...REFUSALS.map(flagCase),
    ALIGNED, ...FAILURES.map(flagCase), ...CARDS.map((row) => CARD_CASE.replace("%s", row.id).replace("%s", row.label)),
    ALIGNED, ...GOLDEN.map(flagCase),
    STEER_ALIGNED, ...STEER_REFUSALS.map(flagCase),
    AGREE_ALIGNED, ...AGREEMENT.map((row) => `${row.id} ${row.label}: top-level and nested both record isError:${row.flagged}`),
    task.name,
  ];
  const walked: Array<{ name: string; mode: string; fails: boolean; state: string | undefined; self: boolean }> = [];
  const walk = (tasks: typeof task.file.tasks): void => {
    for (const child of tasks) {
      if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
      else if (child.type === "suite") walk(child.tasks);
    }
  };
  walk(task.file.tasks);
  expect(walked.map((entry) => entry.name)).toEqual(roster);
  const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
  expect(
    walked.filter((entry) => !entry.self && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map((entry) => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${entry.state ?? "no result"}`),
    "every other case is in run mode, not inverted, and ran before this one",
  ).toEqual([]);

  // The anchors outside this file, read from the TypeScript parse of
  // src/index.ts. The reader first, on a probe source that names errorResult 7
  // times (a JSDoc link, the helper's declaration, a commented-out call, a block
  // comment, a string, a template and one real call): it reads the one call and
  // the declaration, nothing else.
  expect(READER_PROBE.match(/\berrorResult\b/g), "errorResult mentions in the probe source").toHaveLength(7);
  expect(errorResultIdentifiers(READER_PROBE)).toEqual({ calls: [{ message: "real" }], others: [HELPER_DECLARATION] });
  const { calls, others } = errorResultIdentifiers(readFileSync(fileURLToPath(new URL("../src/index.ts", import.meta.url)), "utf8"));
  expect(calls, "errorResult calls: one per flagged row here, per flagged row of the direct census and per NOT CLAIMED resume site").toHaveLength(
    topLevel.filter((row) => row.flagged).length + DIRECT_CENSUS_FLAGGED + NOT_CLAIMED_SITES,
  );
  expect(others, "the only errorResult identifier that is not a call is the helper's declaration").toEqual([HELPER_DECLARATION]);
  expect(
    calls.filter((call) => call.message.startsWith(RESUME_FAILURE)),
    "the NOT CLAIMED resume sites",
  ).toHaveLength(NOT_CLAIMED_SITES);
  // The C rows' anchor: each errorResult call that reports a failed Agent run
  // (the foreground spawn and the foreground resume, the two that hand the
  // renderer their run's details) is drawn by one C row.
  expect(
    calls.filter((call) => call.message.includes(FAILED_RUN)),
    "the failed-run sites",
  ).toHaveLength(CARDS.length);
});
