/**
 * wb-qg19 ([DX P07] EAT-R346..R348): the Furnace observe -> control path through the REGISTERED tools.
 *
 * PINNED READER SET (each case by this file and its case id, its assertion target, and the independent falsifier that reds it).
 * The booted rows (B*) boot the real extension (src/index.ts default export) through test/helpers/boot-extension.ts with the
 * claude backend and drive the served furnace_observe and workflow_control executes; the only injected boundary is the
 * process one: a fake `furnace` CLI first on PATH (written here into a test/helpers/scratch.ts directory) that answers each
 * command the vendored @furnace/sdk client spawns with a canned document and logs the command it was handed. The
 * constructor rows (C*) drive createWorkflowControlTool, the constructor src/index.ts registers, with the production adapter
 * executeFurnaceControl in a leg written as src/index.ts writes its furnace leg, over a projection seeded here, for the
 * refusals the booted tool cannot reach (named below).
 * - B1 (EAT-R346 c1): before any observe the booted workflow_control denies a Run stop cross-scope; after one furnace_observe
 *   of a Run with one Attempt it denies an Attempt stop no-confirmed-ownership (the Attempt node is in the booted projection)
 *   and permits the Run stop on the Run -> Attempt ownership edge the Attempt page confirmed (the requested receipt's
 *   ownershipConfirmationRef is that page's request id). Falsifier: furnace_observe refreshing the Run snapshot only (the
 *   trunk ce180d82 body) denies the Run stop no-confirmed-ownership and the Attempt stop cross-scope.
 * - B2 (EAT-R346 c2): the permitted Run stop sends exactly one `run stop` for the Run under the decision's request id, with no
 *   projection seeding; an observer-only grant set and a foreign target scope are denied and send zero stop commands.
 *   Falsifier: the same topology drop (no permit, zero stop commands on the authorized path).
 * - B3 (EAT-R346 c3, the fixture leg): furnace_observe alone sends only the three read commands (run status, attempt list,
 *   logs) and no control command. Falsifier: any control word in the fake's command log.
 * - B4 (EAT-R347 c1, the booted leg): a Run stop whose signal is aborted before the call reaches the model as error code
 *   aborted-before-issue (category transport) and sends zero stop commands. Falsifier: FurnaceControlRefusal without its own
 *   code (the trunk class) collapses it to executor-refused.
 * - B5 (EAT-R348 c1 and c2): a Run stop the fake answers with a run_not_found failure, a foreign Run id, a non-terminal state
 *   or another request id reaches the model with status uncertain and reply.control.uncertainty.reason exactly seam-failure,
 *   no-target-echo, no-terminal-echo and unattributable-answer, the failure label {command_error, run_not_found} for the first
 *   and the native echo (kind, request id, id, state) for the other three, never a result phase, never a result block,
 *   completionBasis not-established, and one stop command each. Falsifier: the leg forwarding {receipt, status} only (trunk).
 * - B6 (EAT-R348 c1): a Run stop aborted after the verb was issued reads wait-aborted, and one the fake never answers inside
 *   the leg's 10 s bound reads wait-timeout, each with status uncertain and no result phase. Falsifier: as B5.
 * - B7 (EAT-R348 c2, the contrast): a Run stop the fake answers stopped with a native instant settles: status settled, result
 *   phase, the echo kept and no uncertainty member. Falsifier: an uncertainty member on a settled reply, or a settled reply
 *   relabeled uncertain.
 * - B8 (EAT-R346 c1, two Attempts; wb-qg19 refusal #1 U2): after one furnace_observe of a Run whose Attempt page returns two
 *   Attempts, each of the two is a node of the booted projection that owns nothing: both Attempt stops are denied
 *   no-confirmed-ownership, never cross-scope. Falsifier: a refresh loop handed less than the topology's whole snapshot list
 *   (the gate's member G1, topology.snapshots.slice(0, 2)) leaves the second Attempt unobserved, so its stop is denied
 *   cross-scope.
 * - B9 (EAT-R346 beside the trunk reply; wb-qg19 refusal #1 U1): for each of two readings whose topology cannot be taken, an
 *   Attempt page whose request id is the empty string (the vendored SDK accepts any string request id, and the observer
 *   cannot confirm Run ownership from it) and an Attempt id of 308 code units (past the projection's 256-unit id bound),
 *   furnace_observe still replies with the sanitized reading (its contract furnace.external-observation/v1 and its Run id),
 *   the Run is a node of the booted projection that owns nothing (a Run stop is denied no-confirmed-ownership, never
 *   cross-scope) and no stop command is sent. Falsifier: the topology and both loops inside the data reply's try with no
 *   fallback (cut #1 883d4339) answer both readings with the catch reply instead of the reading.
 * - B10 (the same reply, zero-width readings): an Attempt page whose request id carries a zero-width space, and an Attempt
 *   whose id carries one, still get the sanitized reading as the reply, with no zero-width unit left in its text.
 *   Falsifier: a reply that is not the reading passed through sanitizeWorkbenchJsonText (an unsanitized JSON.stringify
 *   keeps the unit; the catch reply carries no contract).
 * - C1 (EAT-R347 c1, the constructor leg): unsupported-verb, invalid-target, foreign-workspace, permit-consumed and
 *   aborted-before-issue each reach the reply as their own exact error code with the adapter's category, and none sends a
 *   native call beyond the first issue of the consumed permit. Falsifier: the trunk class (executor-refused for all five).
 * - C2 (EAT-R347 c2): an invalid target whose id carries caller text, a credential-shaped fake and a stack-shaped frame reaches
 *   the reply as exactly invalid-target, the code holds none of that text and the message is the adapter's fixed text; every
 *   member of the exported closed vocabulary FURNACE_CONTROL_REFUSAL_CODES is its refusal's own code, the list this file
 *   expects is that vocabulary, and a refusal outside it carries no own code, so the tool reports executor-refused.
 *   Falsifier: a code copied from caller text, or a vocabulary drift between src and this file.
 * - C3 (EAT-R348, the bound): an adapter summary whose echo and uncertainty strings are hostile and oversized keeps the whole
 *   reply within 8192 bytes, each echo string within 128 and each uncertainty label within 64 code units, with the fake
 *   credential redacted and no unsafe unit left. Falsifier: an unbounded or unsanitized fold of the adapter readings.
 * - C4 (EAT-R347's boundary; wb-qg19 refusal #1 U3): the own-code reading covers an adapter refusal only when the adapter
 *   sets the code. The claude-agent-sdk leg as src/index.ts writes it, over a seam bound to another session, and the
 *   production forge leg (createRetainedForgeControlExecutor) over a retained operation, answer their typed refusals
 *   (ClaudeControlRefusal foreign-session, ForgeControlRefusal unsupported-verb) with no own code, so the reply's code is
 *   executor-refused for both: those two adapters do not set the own code this file's Furnace refusal sets. Falsifier: an
 *   own code on either refusal class (that leg's code then reaches the reply, and this row and the furnace-control.ts
 *   comment move together).
 *
 * NOT CLAIMED (scope sentences; no residual semantics, no follow-up bead): the V6 legs of EAT-R346 and EAT-R348 (a real
 * Furnace Run and Attempt, native runs.get, the native store byte oracle, control-live uncertain receipt rows) are NOT CLAIMED
 * by this file - it runs no real furnace. Through the booted tool, unsupported-verb, invalid-target, foreign-workspace and
 * permit-consumed are NOT CLAIMED by this file's booted rows: the core admits only `stop` for furnace, an Attempt node has no
 * outgoing ownership edge, furnace_observe admits only frn-run-* Run ids observed in the session workspace and every call
 * mints a fresh permit, so the booted tool reaches none of them (C1 pins them through the constructor). Whether a refusal
 * reports invoked false (EAT-R335) and the furnace_observe reply dialect (EAT-R349, wb-752.13) are NOT CLAIMED by this file:
 * B9 and B10 read only that the reply is the sanitized reading (its contract, its Run id and, for B10, no zero-width unit),
 * and the reply to any reading those rows and B1-B8 do not observe is NOT CLAIMED by this file. A Run whose Attempt page
 * returns more than two Attempts is NOT CLAIMED by this file's booted rows (the census
 * test/workbench-furnace-world-model-preservation-census.test.ts S1 pins the two loops' statements whole).
 * receipt-refused and the live tier's mirror executor (test/workbench-furnace-control-live.test.ts) are NOT CLAIMED by this file.
 */
import { chmodSync, existsSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { delimiter, join } from "node:path";
import type { CallOptions } from "@furnace/sdk";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import subagentsExtension from "../src/index.js";
import { executeClaudeControl } from "../src/workbench/claude-control.js";
import type { ControlDecision, NativeControlRequest } from "../src/workbench/control.js";
import { type ControlExecutionSummary, type ControlExecutor, createWorkflowControlTool } from "../src/workbench/control-tool.js";
import { createRetainedForgeControlExecutor, releaseForgeOperation, retainForgeOperation } from "../src/workbench/forge-control-retention.js";
import {
  executeFurnaceControl,
  FURNACE_CONTROL_REFUSAL_CODES,
  type FurnaceControlClient,
  FurnaceControlRefusal,
  type FurnaceControlRefusalCode,
} from "../src/workbench/furnace-control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import type { WorkflowTask } from "../src/workflow/task.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";
import { makeScratch, removeScratch } from "./helpers/scratch.js";

const RUN = "frn-run-qg19fx";
const ATTEMPT = "frn-atm-qg19fx1";
const ATTEMPT_2 = "frn-atm-qg19fx2";
/** An Attempt id of 308 code units: past the projection's 256-unit id bound (src/workbench/observation.ts assertRef). */
const LONG_ATTEMPT = `frn-atm-${"a".repeat(300)}`;
const ZWSP = String.fromCodePoint(0x200b);
/** The reading's contract (src/workbench/furnace-observer.ts FURNACE_EXTERNAL_OBSERVATION_CONTRACT). */
const CONTRACT = "furnace.external-observation/v1";
const ATTEMPTS_REQUEST = "pi-qg19-attempts";
const GRANTS = ["furnace:inspect", "control:furnace.stop"] as const;
const PLACEHOLDER = "__REQUEST_ID__";
const BOOTED_MS = 60_000;
const TIMEOUT_ROW_MS = 90_000;
/** The fixed adapter texts the replies carry (src/workbench/furnace-control.ts). */
const INVALID_TARGET_TEXT = "Furnace control target is not a native Furnace identifier.";
/** The closed refusal vocabulary this file expects; C2 holds it equal to the exported one. */
const CODES: readonly FurnaceControlRefusalCode[] = [
  "denied-decision", "unvetted-decision", "permit-consumed", "unsupported-verb", "invalid-target", "invalid-deps", "foreign-workspace", "aborted-before-issue",
];

interface Reply {
  ok: boolean;
  invoked: boolean;
  status: string;
  completion?: string;
  control?: {
    phase?: string;
    completionBasis?: string;
    requested?: { requestId?: string; ownershipConfirmationRef?: string };
    result?: unknown;
    uncertainty?: { reason?: string; failure?: { kind?: string; code?: string } };
    echo?: { kind?: string; requestId?: string; id?: string; state?: string };
  };
  error?: { code: string; category?: string; message?: string };
}
type Echo = NonNullable<NonNullable<Reply["control"]>["echo"]>;
interface ServedTool {
  execute(id: string, params: Record<string, unknown>, signal: AbortSignal | undefined, onUpdate: undefined, context: unknown): Promise<unknown>;
}
const isServedTool = (value: unknown): value is ServedTool => typeof value === "object" && value !== null && typeof Reflect.get(value, "execute") === "function";
const isHandler = (value: unknown): value is (event: unknown, context: unknown) => unknown => typeof value === "function";
function textOf(result: unknown): string {
  const content: unknown = typeof result === "object" && result !== null ? Reflect.get(result, "content") : undefined;
  const first: unknown = Array.isArray(content) ? content[0] : undefined;
  const text: unknown = typeof first === "object" && first !== null ? Reflect.get(first, "text") : undefined;
  if (typeof text !== "string") throw new Error("the tool result carries no text item");
  return text;
}
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
/** A furnace_observe reply read as a reading: its contract and Run id, or the reply text itself when it is not one. */
function readingOf(text: string): unknown {
  try {
    const parsed: unknown = JSON.parse(text);
    const source: unknown = typeof parsed === "object" && parsed !== null ? Reflect.get(parsed, "source") : undefined;
    return [
      typeof parsed === "object" && parsed !== null ? Reflect.get(parsed, "contract") : undefined,
      typeof source === "object" && source !== null ? Reflect.get(source, "runId") : undefined,
    ];
  } catch {
    return `NOT A READING: ${text.slice(0, 160)}`;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// The fake furnace CLI: the one injected boundary of the booted rows.

/** One canned answer to one command, keyed by its words after the global flags ("run status", "attempt list", "logs", "run stop"). */
interface FakeAnswer {
  readonly stdout?: string;
  readonly stderr?: string;
  readonly exit?: number;
  /** Answer only after this many milliseconds (the process stays alive until then). */
  readonly delayMs?: number;
}
type FakeAnswers = Readonly<Record<string, FakeAnswer>>;
interface FakeCall {
  readonly key: string;
  readonly requestId: string | null;
  readonly runId: string | null;
  readonly done?: boolean;
}
interface FakeFurnace {
  readonly binary: string;
  play(answers: FakeAnswers): void;
  calls(): FakeCall[];
  restore(): void;
}
const fakeSource = (node: string): string =>
  [
    `#!${node}`,
    '"use strict";',
    "// wb-qg19 fake furnace: canned documents from answers.json beside this file; never a real Furnace.",
    'const fs = require("node:fs");',
    'const path = require("node:path");',
    "const argv = process.argv.slice(2);",
    'const valued = new Set(["-C", "--state-dir", "--config", "--request-id"]);',
    "let requestId = null;",
    "const words = [];",
    "for (let i = 0; i < argv.length; i++) {",
    "  if (valued.has(argv[i])) { if (argv[i] === \"--request-id\") requestId = argv[i + 1] === undefined ? null : argv[i + 1]; i++; continue; }",
    "  words.push(argv[i]);",
    "}",
    'const key = words[0] === "logs" ? "logs" : words[0] + " " + words[1];',
    'const runId = words[0] === "logs" ? (words[1] === undefined ? null : words[1]) : (words[2] === undefined ? null : words[2]);',
    'const log = path.join(__dirname, "calls.jsonl");',
    'fs.appendFileSync(log, JSON.stringify({ key, requestId, runId }) + "\\n");',
    'const answers = JSON.parse(fs.readFileSync(path.join(__dirname, "answers.json"), "utf8"));',
    "const answer = Object.hasOwn(answers, key) ? answers[key] : undefined;",
    'if (answer === undefined) { process.stderr.write("wb-qg19 fake furnace: no answer for this command\\n"); process.exit(2); }',
    'const fill = text => text.split("__REQUEST_ID__").join(requestId === null ? "" : requestId);',
    "const finish = () => {",
    '  if (typeof answer.stdout === "string") process.stdout.write(fill(answer.stdout));',
    '  if (typeof answer.stderr === "string") process.stderr.write(fill(answer.stderr));',
    '  fs.appendFileSync(log, JSON.stringify({ key, requestId, runId, done: true }) + "\\n");',
    '  process.exitCode = typeof answer.exit === "number" ? answer.exit : 0;',
    "};",
    'if (typeof answer.delayMs === "number") setTimeout(finish, answer.delayMs); else finish();',
    "",
  ].join("\n");
function installFakeFurnace(): FakeFurnace {
  const dir = makeScratch("pi-qg19-furnace-");
  const binary = join(dir, "furnace");
  writeFileSync(binary, fakeSource(process.execPath));
  chmodSync(binary, 0o755);
  writeFileSync(join(dir, "answers.json"), "{}");
  const previous = process.env.PATH;
  process.env.PATH = previous === undefined ? dir : `${dir}${delimiter}${previous}`;
  const log = join(dir, "calls.jsonl");
  return {
    binary,
    play: answers => writeFileSync(join(dir, "answers.json"), JSON.stringify(answers)),
    calls: () => existsSync(log) ? readFileSync(log, "utf8").split("\n").filter(line => line !== "").map(line => JSON.parse(line) as FakeCall) : [],
    restore: () => {
      if (previous === undefined) delete process.env.PATH;
      else process.env.PATH = previous;
      removeScratch(dir);
    },
  };
}
/** The first PATH entry holding an executable named command, joined with it. */
function firstOnPath(command: string): string | undefined {
  for (const entry of (process.env.PATH ?? "").split(delimiter)) {
    if (entry === "") continue;
    const candidate = join(entry, command);
    if (existsSync(candidate)) return candidate;
  }
  return undefined;
}
const envelope = (kind: string, requestId: string, data: Record<string, unknown>): string => `${JSON.stringify({ protocol_version: 1, ok: true, request_id: requestId, kind, data })}\n`;
const failed = (kind: string, code: string): string =>
  `${JSON.stringify({ protocol_version: 1, ok: false, request_id: PLACEHOLDER, kind, error: { code, message: "HYPOTHETICAL fixture refusal", retryable: false } })}\n`;
/** One running Attempt row of the Run; the first keeps the one-Attempt fixture's work id. */
const attemptRow = (id: string, ordinal: number): Record<string, unknown> => ({
  attempt_id: id, run_id: RUN, work_id: ordinal === 1 ? "wk-qg19" : `wk-qg19-${ordinal}`, ordinal, executor: "noop", state: "running",
  created_at: "2026-01-01T00:00:00Z", started_at: "2026-01-01T00:00:01Z",
});
/**
 * One active Run in the booted workspace with its running Attempts (one by default) and an empty stdout tail of the last;
 * `attemptsRequest` is the Attempt page's own request id.
 */
function observedRun(workspace: string, attempts: readonly string[] = [ATTEMPT], attemptsRequest = ATTEMPTS_REQUEST): Record<string, FakeAnswer> {
  const last = attempts.at(-1) ?? ATTEMPT;
  return {
    "run status": {
      stdout: envelope("run_status", "pi-qg19-status", {
        run_id: RUN, beads_run_id: "bd-qg19", workspace, state: "active", mode: "ephemeral_wisp", furnace_version: "0.1.0",
        state_since: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z", active: [], failed: [], attention: [], unreadable: [],
        corrupt_events: [], conflicts: [], failed_total: 0, corrupt_events_total: 0,
      }),
    },
    "attempt list": {
      stdout: envelope("attempt_list", attemptsRequest, {
        run_id: RUN, beads_run_id: "bd-qg19", unreadable: [], returned: attempts.length, complete: true, next_cursor: null,
        attempts: attempts.map((id, index) => attemptRow(id, index + 1)),
      }),
    },
    logs: { stdout: envelope("logs_read", "pi-qg19-logs", { run_id: RUN, attempt_id: last, stream: "stdout", lines: [], returned: 0, complete: true, lossy: false, next_cursor: null }) },
  };
}
const stopAnswer = (data: Record<string, unknown>, requestId = PLACEHOLDER, delayMs?: number): FakeAnswer => ({
  stdout: envelope("run_stop", requestId, data), ...(delayMs !== undefined ? { delayMs } : {}),
});
const STOPPED = { run_id: RUN, state: "stopped", state_since: "2026-01-01T00:00:05Z" };
const stopsOf = (fake: FakeFurnace): FakeCall[] => fake.calls().filter(call => call.key === "run stop" && call.done !== true);

// ---------------------------------------------------------------------------------------------------------------------
// The booted extension.

interface Booted {
  readonly workspace: string;
  observe(): Promise<string>;
  control(params: Record<string, unknown>, options?: { id?: string; signal?: AbortSignal }): Promise<Reply>;
  restore(): void;
}
async function boot(grants: readonly string[]): Promise<Booted> {
  const sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...grants] } } });
  try {
    const booted = makePi();
    subagentsExtension(booted.pi);
    const context: unknown = ctx({ cwd: sandbox.dir });
    const start: unknown = booted.lifecycle.get("session_start");
    if (!isHandler(start)) throw new Error("the extension registered no session_start handler");
    await start({}, context);
    const served = (name: string): ServedTool => {
      const tool: unknown = booted.tools.get(name);
      if (!isServedTool(tool)) throw new Error(`the booted extension serves no ${name} execute`);
      return tool;
    };
    return {
      workspace: realpathSync(sandbox.dir),
      observe: async () => textOf(await served("furnace_observe").execute("qg19-observe", { runId: RUN }, undefined, undefined, context)),
      control: async (params, options = {}) =>
        JSON.parse(textOf(await served("workflow_control").execute(options.id ?? "qg19-control", params, options.signal, undefined, context))) as Reply,
      restore: () => sandbox.restore(),
    };
  } catch (error) {
    sandbox.restore();
    throw error;
  }
}
const stopOf = (workspace: string, type = "run", id = RUN, scope: string = workspace): Record<string, unknown> => ({
  target: { provider: "furnace", type, id, scope }, action: "stop", confirmed: true,
});

describe("wb-qg19 the booted Furnace observe -> control path (EAT-R346..R348)", () => {
  let fake: FakeFurnace;
  let booted: Booted | undefined;
  beforeEach(() => {
    fake = installFakeFurnace();
    // Rule 8: no furnace verb ever reaches a real Furnace from this file.
    expect(firstOnPath("furnace"), "the fake furnace is first on PATH").toBe(fake.binary);
  });
  afterEach(() => {
    booted?.restore();
    booted = undefined;
    fake.restore();
  });

  it("B1 furnace_observe applies the Run, its Attempt and the Attempt page's Run -> Attempt ownership edge to the booted projection", async () => {
    booted = await boot(GRANTS);
    const before = await booted.control(stopOf(booted.workspace));
    expect(before.error?.code, "an unobserved Run is no target").toBe("cross-scope");
    fake.play(observedRun(booted.workspace));
    await booted.observe();
    const attempt = await booted.control(stopOf(booted.workspace, "attempt", ATTEMPT), { id: "qg19-attempt" });
    expect(attempt.error?.code, "the Attempt node is in the booted projection and owns nothing").toBe("no-confirmed-ownership");
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED) });
    const run = await booted.control(stopOf(booted.workspace));
    expect(run.error, "the Run stop is permitted").toBeUndefined();
    expect(run).toMatchObject({ ok: true, invoked: true });
    expect(run.control?.requested?.ownershipConfirmationRef, "on the edge the Attempt page confirmed").toBe(ATTEMPTS_REQUEST);
  }, BOOTED_MS);

  it("B2 an authorized Run stop sends exactly one stop with no projection seeding; an observer-only grant and a foreign scope send none", async () => {
    booted = await boot(GRANTS);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED) });
    await booted.observe();
    const foreign = await booted.control(stopOf(booted.workspace, "run", RUN, "/qg19-foreign-workspace"));
    expect(foreign.error?.code, "a foreign target scope is no target").toBe("cross-scope");
    expect(stopsOf(fake), "and sends no stop command").toStrictEqual([]);
    const permitted = await booted.control(stopOf(booted.workspace));
    expect(permitted.error).toBeUndefined();
    expect(stopsOf(fake).map(call => [call.runId, call.requestId]), "one stop for the Run under the decision's request id").toStrictEqual([
      [RUN, permitted.control?.requested?.requestId],
    ]);
    booted.restore();
    booted = await boot(["furnace:inspect"]);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED) });
    await booted.observe();
    const observerOnly = await booted.control(stopOf(booted.workspace), { id: "qg19-observer-only" });
    expect(observerOnly.error?.code, "an observer-only grant set never controls").toBe("observer-only");
    expect(stopsOf(fake), "and sends no further stop command").toHaveLength(1);
  }, BOOTED_MS);

  it("B3 furnace_observe alone sends only the three read commands and no control command", async () => {
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace));
    await booted.observe();
    await booted.observe();
    expect(fake.calls().filter(call => call.done !== true).map(call => call.key), "two observes, three reads each").toStrictEqual([
      "run status", "attempt list", "logs", "run status", "attempt list", "logs",
    ]);
  }, BOOTED_MS);

  it("B4 a stop cancelled before the verb is issued reaches the model as aborted-before-issue and sends no stop", async () => {
    booted = await boot(GRANTS);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED) });
    await booted.observe();
    const cancelled = new AbortController();
    cancelled.abort();
    const reply = await booted.control(stopOf(booted.workspace), { signal: cancelled.signal });
    expect(reply.ok).toBe(false);
    expect(reply.error).toMatchObject({ code: "aborted-before-issue", category: "transport", message: "Furnace control was cancelled before the native verb was issued." });
    expect(stopsOf(fake)).toStrictEqual([]);
  }, BOOTED_MS);

  const UNCERTAIN: ReadonlyArray<{ readonly reason: string; readonly answer: (requestId: string) => FakeAnswer; readonly echo?: (requestId: string) => Echo; readonly failure?: { kind: string; code: string } }> = [
    { reason: "seam-failure", answer: () => ({ exit: 1, stderr: failed("run_stop", "run_not_found") }), failure: { kind: "command_error", code: "run_not_found" } },
    { reason: "no-target-echo", answer: () => stopAnswer({ ...STOPPED, run_id: "frn-run-qg19other" }), echo: requestId => ({ kind: "run_stop", requestId, id: "frn-run-qg19other", state: "stopped" }) },
    { reason: "no-terminal-echo", answer: () => stopAnswer({ ...STOPPED, state: "active" }), echo: requestId => ({ kind: "run_stop", requestId, id: RUN, state: "active" }) },
    {
      reason: "unattributable-answer",
      answer: () => stopAnswer(STOPPED, "ctl_00000000000000000000000000000000"),
      echo: () => ({ kind: "run_stop", requestId: "ctl_00000000000000000000000000000000", id: RUN, state: "stopped" }),
    },
  ];
  it.each(UNCERTAIN)("B5 an uncertain stop keeps its exact reason $reason under reply.control and is never a result", async row => {
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace));
    await booted.observe();
    fake.play({ ...observedRun(booted.workspace), "run stop": row.answer(PLACEHOLDER) });
    const reply = await booted.control(stopOf(booted.workspace));
    const requestId = reply.control?.requested?.requestId ?? "";
    expect(requestId).toMatch(/^ctl_[0-9a-f]{32}$/);
    expect(reply).toMatchObject({ invoked: true, status: "uncertain", completion: "not-asserted" });
    expect(reply.control?.uncertainty, "the adapter's own bounded reason and failure label").toStrictEqual({ reason: row.reason, ...(row.failure !== undefined ? { failure: row.failure } : {}) });
    expect(reply.control?.echo, "the native echo as the adapter bounded it").toStrictEqual(row.echo?.(requestId));
    expect([reply.control?.phase, reply.control?.result, reply.control?.completionBasis], "never a result").toStrictEqual([
      row.reason === "seam-failure" || row.reason === "unattributable-answer" ? "requested" : "acknowledged", undefined, "not-established",
    ]);
    expect(stopsOf(fake), "one native call, never re-issued").toHaveLength(1);
  }, BOOTED_MS);

  it("B6 a stop aborted after its verb was issued reads wait-aborted, never a result", async () => {
    booted = await boot(GRANTS);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED, PLACEHOLDER, 2_000) });
    await booted.observe();
    const waiting = new AbortController();
    const pending = booted.control(stopOf(booted.workspace), { signal: waiting.signal });
    for (let waited = 0; stopsOf(fake).length === 0 && waited < 20_000; waited += 25) await sleep(25);
    expect(stopsOf(fake), "the verb was issued before the abort").toHaveLength(1);
    waiting.abort();
    const reply = await pending;
    expect(reply).toMatchObject({ invoked: true, status: "uncertain", completion: "not-asserted" });
    expect(reply.control?.uncertainty).toStrictEqual({ reason: "wait-aborted" });
    expect([reply.control?.phase, reply.control?.result]).toStrictEqual(["requested", undefined]);
    // The late answer is discarded; the fake still finishes before the scratch directory goes.
    for (let waited = 0; !fake.calls().some(call => call.key === "run stop" && call.done === true) && waited < 20_000; waited += 25) await sleep(25);
  }, BOOTED_MS);

  it("B6 a stop the producer never answers inside the leg's bound reads wait-timeout, never a result", async () => {
    booted = await boot(GRANTS);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED, PLACEHOLDER, 25_000) });
    await booted.observe();
    const reply = await booted.control(stopOf(booted.workspace));
    expect(reply).toMatchObject({ invoked: true, status: "uncertain", completion: "not-asserted" });
    expect(reply.control?.uncertainty).toStrictEqual({ reason: "wait-timeout" });
    expect([reply.control?.phase, reply.control?.result]).toStrictEqual(["requested", undefined]);
    expect(stopsOf(fake)).toHaveLength(1);
  }, TIMEOUT_ROW_MS);

  it("B7 a stop answered stopped with a native instant settles with its echo and carries no uncertainty", async () => {
    booted = await boot(GRANTS);
    fake.play({ ...observedRun(booted.workspace), "run stop": stopAnswer(STOPPED) });
    await booted.observe();
    const reply = await booted.control(stopOf(booted.workspace));
    const requestId = reply.control?.requested?.requestId;
    expect(reply).toMatchObject({ ok: true, invoked: true, status: "settled", completion: "not-asserted" });
    expect([reply.control?.phase, reply.control?.completionBasis, reply.control?.uncertainty]).toStrictEqual(["result", "producer-reported", undefined]);
    expect(reply.control?.echo).toStrictEqual({ kind: "run_stop", requestId, id: RUN, state: "stopped" });
  }, BOOTED_MS);

  it("B8 after one furnace_observe of a Run with two Attempts, each returned Attempt is a node of the booted projection", async () => {
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace, [ATTEMPT, ATTEMPT_2]));
    expect(readingOf(await booted.observe()), "the reply is the reading").toStrictEqual([CONTRACT, RUN]);
    const first = await booted.control(stopOf(booted.workspace, "attempt", ATTEMPT), { id: "qg19-attempt-1" });
    const second = await booted.control(stopOf(booted.workspace, "attempt", ATTEMPT_2), { id: "qg19-attempt-2" });
    expect([first.error?.code, second.error?.code], "each Attempt is a node that owns nothing").toStrictEqual(["no-confirmed-ownership", "no-confirmed-ownership"]);
    expect(stopsOf(fake), "and no stop command is sent").toStrictEqual([]);
  }, BOOTED_MS);

  const UNTAKEN: ReadonlyArray<{ readonly row: string; readonly attempts: readonly string[]; readonly attemptsRequest: string }> = [
    { row: "an Attempt page whose request id is empty", attempts: [ATTEMPT], attemptsRequest: "" },
    { row: "an Attempt id of 308 code units", attempts: [LONG_ATTEMPT], attemptsRequest: ATTEMPTS_REQUEST },
  ];
  it.each(UNTAKEN)("B9 $row: furnace_observe still replies with the reading and the Run is observed", async ({ attempts, attemptsRequest }) => {
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace, attempts, attemptsRequest));
    expect(readingOf(await booted.observe()), "the reply is the sanitized reading").toStrictEqual([CONTRACT, RUN]);
    const run = await booted.control(stopOf(booted.workspace));
    expect(run.error?.code, "the Run is a node of the booted projection that owns nothing").toBe("no-confirmed-ownership");
    expect(stopsOf(fake), "and no stop command is sent").toStrictEqual([]);
  }, BOOTED_MS);

  const ZERO_WIDTH: ReadonlyArray<{ readonly row: string; readonly attempts: readonly string[]; readonly attemptsRequest: string }> = [
    { row: "an Attempt page request id", attempts: [ATTEMPT], attemptsRequest: `pi-qg19${ZWSP}attempts` },
    { row: "an Attempt id", attempts: [`frn-atm-qg19${ZWSP}fx1`], attemptsRequest: ATTEMPTS_REQUEST },
  ];
  it.each(ZERO_WIDTH)("B10 $row carrying a zero-width space: the reply is still the sanitized reading", async ({ attempts, attemptsRequest }) => {
    booted = await boot(GRANTS);
    fake.play(observedRun(booted.workspace, attempts, attemptsRequest));
    const reply = await booted.observe();
    expect(readingOf(reply), "the reply is the sanitized reading").toStrictEqual([CONTRACT, RUN]);
    expect(reply.includes(ZWSP), "with no zero-width unit left").toBe(false);
  }, BOOTED_MS);
});

// ---------------------------------------------------------------------------------------------------------------------
// The registered tool's constructor with the production adapter, for what the booted tool cannot reach.

const WS = "/qg19-ws";
const SCOPE: ObservationScope = { workspace: WS, principal: "local-operator:1000:s1" };
const AT = "2026-10-17T08:00:00Z";
const OWNER = "wf_qg19owner01";
const toolCtx = { cwd: WS, sessionManager: { getSessionId: () => "s1" } };
/** A furnace target observed in SCOPE with a furnace-sourced, natively confirmed ownership edge to a child. */
function seeded(targets: readonly NativeRef[]): ObservationProjection {
  const projection = new ObservationProjection();
  for (const target of targets) {
    const child: NativeRef = { provider: "furnace", type: "attempt", id: `frn-atm-${target.type}-child`, scope: WS };
    for (const source of [target, child]) {
      projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `furnace.${source.type}.snapshot`, trace: { invocationId: OWNER },
        node: { title: `furnace ${source.type}`, type: "workflow", statusText: "active", statusTone: "active" } });
    }
    projection.relate({ scope: SCOPE, from: target, to: child, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "pi-qg19-page" } });
  }
  return projection;
}
interface Counted { readonly client: FurnaceControlClient; readonly calls: string[] }
/** A control seam that counts every native call and answers a run stop with the stopped record. */
function counted(): Counted {
  const calls: string[] = [];
  const stop = async (id: string, call?: CallOptions): Promise<unknown> => {
    calls.push(`run stop ${id}`);
    return { kind: "run_stop", requestId: call?.requestId, data: { run_id: id, state: "stopped", state_since: "2026-01-01T00:00:05Z" } };
  };
  const refuse = async (verb: string): Promise<never> => {
    calls.push(verb);
    throw new Error(`wb-qg19: no ${verb} is expected`);
  };
  const client = { runs: { stop, pause: () => refuse("run pause"), resume: () => refuse("run resume") }, attempts: { stop: () => refuse("attempt stop") } };
  return { client: client as unknown as FurnaceControlClient, calls };
}
/** The furnace leg as src/index.ts writes it, over an injected seam; `reuse` re-executes the first decision it was handed. */
function leg(client: FurnaceControlClient, options: { reuse?: boolean } = {}): ControlExecutor {
  let first: ControlDecision | undefined;
  return async (decision: ControlDecision, request: NativeControlRequest, signal?: AbortSignal): Promise<ControlExecutionSummary> => {
    const chosen = options.reuse === true ? first ?? decision : decision;
    first ??= decision;
    const execution = await executeFurnaceControl(chosen, {
      client, workspaceRoot: request.scope.workspace, now: () => new Date().toISOString(), timeoutMs: 10_000, ...(signal !== undefined ? { signal } : {}),
    });
    return { receipt: execution.receipt, status: execution.status, ...(execution.uncertainty !== undefined ? { uncertainty: execution.uncertainty } : {}), ...(execution.echo !== undefined ? { echo: execution.echo } : {}) };
  };
}
function constructed(targets: readonly NativeRef[], executor: ControlExecutor) {
  const tasks = new Map<string, WorkflowTask>([[OWNER, { id: OWNER } as unknown as WorkflowTask]]);
  const tool = createWorkflowControlTool({
    grants: () => ["control:furnace.stop"], observerScope: () => ({ ...SCOPE }), localPrincipal: () => SCOPE.principal, sessionIdOf: () => "s1",
    projection: seeded(targets), tasks, now: () => new Date().toISOString(), executors: { furnace: executor },
  });
  return async (target: NativeRef, options: { id?: string; signal?: AbortSignal } = {}): Promise<{ text: string; reply: Reply }> => {
    const result = await tool.execute(options.id ?? "qg19-call", { target: { ...target }, action: "stop", confirmed: true } as never, options.signal, undefined, toolCtx as never);
    const text = textOf(result);
    return { text, reply: JSON.parse(text) as Reply };
  };
}
const RUN_TARGET: NativeRef = { provider: "furnace", type: "run", id: "frn-run-qg19c", scope: WS };
/** One control call through the registered constructor with one provider's leg wired, over a target that owns one child. */
async function viaLeg(target: NativeRef, action: string, executor: ControlExecutor): Promise<Reply> {
  const projection = new ObservationProjection();
  const child: NativeRef = { provider: target.provider, type: "child", id: `${target.id}-child`, scope: WS };
  for (const source of [target, child]) {
    projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${target.provider}.snapshot`, trace: { invocationId: OWNER },
      node: { title: "qg19", type: "workflow", statusText: "active", statusTone: "active" } });
  }
  projection.relate({ scope: SCOPE, from: target, to: child, kind: "ownership", provenance: { source: target.provider, observedAt: AT, nativeConfirmationRef: "pi-qg19-page" } });
  const tasks = new Map<string, WorkflowTask>([[OWNER, { id: OWNER } as unknown as WorkflowTask]]);
  const tool = createWorkflowControlTool({
    grants: () => [`control:${target.provider}.${action}`], observerScope: () => ({ ...SCOPE }), localPrincipal: () => SCOPE.principal, sessionIdOf: () => "s1",
    projection, tasks, now: () => new Date().toISOString(), executors: { [target.provider]: executor },
  });
  const result = await tool.execute("qg19-leg", { target: { ...target }, action, confirmed: true } as never, undefined, undefined, toolCtx as never);
  return JSON.parse(textOf(result)) as Reply;
}

describe("wb-qg19 the registered control tool's constructor over the production Furnace adapter (EAT-R347, EAT-R348 bound)", () => {
  it("C1 each typed refusal the booted tool cannot reach keeps its own exact code and category, and issues nothing", async () => {
    const work: NativeRef = { provider: "furnace", type: "work", id: "frn-work-qg19", scope: WS };
    const flagged: NativeRef = { provider: "furnace", type: "run", id: "-frn-run-qg19-flag", scope: WS };
    const foreign: NativeRef = { provider: "furnace", type: "run", id: "frn-run-qg19-foreign", scope: "/qg19-elsewhere" };
    const seam = counted();
    const run = constructed([work, flagged, foreign, RUN_TARGET], leg(seam.client));
    const cancelled = new AbortController();
    cancelled.abort();
    const rows = [
      ["unsupported-verb", (await run(work)).reply],
      ["invalid-target", (await run(flagged)).reply],
      ["foreign-workspace", (await run(foreign)).reply],
      ["aborted-before-issue", (await run(RUN_TARGET, { signal: cancelled.signal })).reply],
    ] as const;
    expect(rows.map(([code, reply]) => [code, reply.ok, reply.error?.code, reply.error?.category])).toStrictEqual([
      ["unsupported-verb", false, "unsupported-verb", "validation"],
      ["invalid-target", false, "invalid-target", "validation"],
      ["foreign-workspace", false, "foreign-workspace", "authorization"],
      ["aborted-before-issue", false, "aborted-before-issue", "transport"],
    ]);
    expect(seam.calls, "no refusal issues a native call").toStrictEqual([]);
    const reused = counted();
    const again = constructed([RUN_TARGET], leg(reused.client, { reuse: true }));
    const issued = await again(RUN_TARGET, { id: "qg19-first" });
    const spent = await again(RUN_TARGET, { id: "qg19-second" });
    expect([issued.reply.status, spent.reply.ok, spent.reply.error?.code, spent.reply.error?.category]).toStrictEqual(["settled", false, "permit-consumed", "validation"]);
    expect(reused.calls, "the consumed permit issued its verb once").toStrictEqual([`run stop ${RUN_TARGET.id}`]);
  });

  it("C2 the error code is the closed refusal itself, never caller text or a stack, and the vocabulary is src's", async () => {
    const hostile: NativeRef = { provider: "furnace", type: "run", id: "-x qg19 caller text Bearer FAKE-qg19-token at Object.<anonymous> (/tmp/zz.js:1:1)", scope: WS };
    const seam = counted();
    const { reply } = await constructed([hostile], leg(seam.client))(hostile);
    expect(reply.error).toMatchObject({ code: "invalid-target", category: "validation", message: INVALID_TARGET_TEXT });
    expect(seam.calls).toStrictEqual([]);
    expect(CODES, "this file's vocabulary is the exported one").toStrictEqual([...FURNACE_CONTROL_REFUSAL_CODES]);
    for (const code of CODES) {
      const refusal = new FurnaceControlRefusal("validation", code, "m");
      expect(Object.getOwnPropertyDescriptor(refusal, "code")?.value, `${code} is its own code`).toBe(code);
    }
    const outside = new FurnaceControlRefusal("validation", "caller text at Object.<anonymous>" as FurnaceControlRefusalCode, "m");
    expect(Object.getOwnPropertyDescriptor(outside, "code")?.value, "a refusal outside the vocabulary carries no code").toBeUndefined();
    const generic = constructed([RUN_TARGET], async () => { throw outside; });
    expect((await generic(RUN_TARGET)).reply.error?.code, "so the tool reports the generic refusal").toBe("executor-refused");
  });

  it("C3 hostile, oversized adapter readings are bounded and sanitized inside the reply's byte budget", async () => {
    const secret = "FAKE-qg19-api-token-abcdefghijklmnopqrstuvwx";
    const hostile = `${String.fromCodePoint(0x202e)}api_key=${secret} ${"x".repeat(6_000)}`;
    const executor: ControlExecutor = async decision => {
      if (decision.decision !== "permitted") throw new Error("wb-qg19: a permit is expected");
      return {
        receipt: decision.receipt, status: "uncertain",
        uncertainty: { reason: hostile, failure: { kind: hostile, code: hostile } },
        echo: { kind: hostile, requestId: hostile, id: hostile, state: hostile },
      };
    };
    const { text, reply } = await constructed([RUN_TARGET], executor)(RUN_TARGET);
    expect(Buffer.byteLength(text, "utf8")).toBeLessThanOrEqual(8_192);
    expect(text.includes(secret), "the fake credential is redacted").toBe(false);
    expect(text.includes(String.fromCodePoint(0x202e)), "no unsafe unit is left").toBe(false);
    const echo = reply.control?.echo ?? {};
    const labels = [reply.control?.uncertainty?.reason, reply.control?.uncertainty?.failure?.kind, reply.control?.uncertainty?.failure?.code];
    expect(Object.values(echo).map(value => typeof value === "string" && value.length <= 128), "each echo string within 128").toStrictEqual([true, true, true, true]);
    expect(labels.map(value => typeof value === "string" && value.length <= 64), "each uncertainty label within 64").toStrictEqual([true, true, true]);
  });

  it("C4 the claude-agent-sdk and forge legs' typed refusals carry no own code, so they reach the reply as executor-refused", async () => {
    const session: NativeRef = { provider: "claude-agent-sdk", type: "session", id: "qg19-session", scope: WS };
    const claudeLeg: ControlExecutor = async (decision: ControlDecision, _request: NativeControlRequest, signal?: AbortSignal): Promise<ControlExecutionSummary> => {
      const execution = await executeClaudeControl(decision, {
        seam: { interrupt: async () => undefined }, call: { invocationId: OWNER, index: 0, sessionId: "qg19-other-session" },
        now: () => new Date().toISOString(), timeoutMs: 10_000, ...(signal !== undefined ? { signal } : {}),
      });
      return { receipt: execution.receipt, status: execution.status };
    };
    const claude = await viaLeg(session, "interrupt", claudeLeg);
    const gate: NativeRef = { provider: "forge", type: "gate", id: "qg19-forge-op", scope: WS };
    const cancel = async (): Promise<never> => {
      throw new Error("wb-qg19: no Forge cancel is expected");
    };
    const release = retainForgeOperation(gate.id, { operations: { cancel }, connection: { capabilities: null }, workspaceRoot: WS });
    try {
      const forge = await viaLeg(gate, "cancel", createRetainedForgeControlExecutor(() => new Date().toISOString()));
      expect([claude.ok, claude.error?.code, forge.ok, forge.error?.code], "each typed refusal reaches the reply as the generic code").toStrictEqual([
        false, "executor-refused", false, "executor-refused",
      ]);
    } finally {
      release();
      releaseForgeOperation(gate.id);
    }
  });
});
