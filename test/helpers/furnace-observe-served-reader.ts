/**
 * wb-g20x: the furnace_observe SERVED reader. test/workbench-furnace-observe-served-census.test.ts judges what it reads (this
 * header is the reading of record; the census's CASES name the pins of each reading).
 *
 * WHAT PI SERVES. pi's extension loader keeps an extension's tools in a Map keyed by tool.name and sets it on every registerTool
 * call (node_modules/@earendil-works/pi-coding-agent/dist/core/extensions/loader.js, registerTool:
 * `extension.tools.set(tool.name, {` then `definition: tool,`). So the tool pi serves under a name is the last tool handed to
 * registerTool under that name, whatever source spelling produced the name and whatever wrapped registerTool or defineTool on
 * the way. The boot harness (test/helpers/boot-extension.ts makePi) keys its tools Map the same way (`tools.set(t.name, t)`). This
 * reader reads the served tool there, at run time. It reads no source text of a registration: sourceAnchors (below) is the
 * census's outside anchor, never a reading of what is served.
 *
 * AN OBJECT, in every reading below, is a value whose typeof is "object" and which is neither null nor an array (isFields): an
 * array, a function, null and every primitive are not objects here, whatever properties they hold.
 *
 * THE READINGS, exactly:
 * - recordRegistrations(pi): installed on a harness pi before the extension factory runs, it puts a recorder in front of
 *   pi.registerTool. For each value it is handed, in the order handed, the recorder reads the value's `name` once, as a
 *   property read of that value does (pi's loader reads `tool.name`): an object's, an array's or a function's name property,
 *   own or inherited, a primitive's through its wrapper, and undefined for null and undefined. It appends that name and hands
 *   the value on to the registerTool it replaced, returning what that returns. A registerTool installed later over it that
 *   calls it (a wrapper of it bound to the pi, J0) reaches the harness through it, so the recorder reads what that wrapper
 *   hands on.
 * - judgeRegistrations(received, name): no finding when exactly one received entry is === name, else the one finding
 *   `<name> received <n> times`.
 * - judgeReply(result, text): no finding when result is an object whose keys are exactly content and details, whose details is
 *   undefined, and whose content is an array (Array.isArray) of exactly one element, that element an object whose keys are
 *   exactly text and type, whose type is === "text" and whose text is === text: what textResult(text) in src/index.ts returns.
 *   The keys of a value are its own enumerable string keys, sorted and comma-joined, so their order of definition does not
 *   matter and an inherited, a non-enumerable or a symbol-keyed property is not a key; details, content, type and text are
 *   property reads. === is strict, so a String wrapper or an array of the expected text or type differs. Otherwise its
 *   findings, in this order: `result: not an object` (alone), `result keys: <keys>`, `details: defined`, then one of
 *   `content: not an array`, `content: <n> items` and `item: not an object` (each ending the reading), then `item keys:
 *   <keys>`, `item type: <JSON>` and `item text: <JSON>`, <JSON> being JSON.stringify of the value read.
 * - isServedTool(value): whether value is an object whose execute, a property read (own or inherited), is a function.
 * - bootServed(grants, factory): the pinned boot, in this order: hermeticDir writes the settings { workflowsEnabled: true,
 *   workbench: { workflowAgentBackend: "claude", capabilityGrants: grants } } to <the sandbox>/.pi/subagents.json; makePi;
 *   recordRegistrations on the harness pi; the extension factory called with the harness pi (src/index.ts's default export,
 *   or the planted factory B0 hands in its place); and the session_start handler it registered awaited with ({}, the context
 *   ctx({ cwd: <the sandbox> })). So the recorder reads every registration the factory and session_start make, in order.
 *   serves(name) is isServedTool of the harness tools Map's entry under the name. call(params) runs the served furnace_observe
 *   execute as execute("census", params, undefined, undefined, that context) and returns what it resolves to; it throws, so
 *   the calling case reds, when the entry under furnace_observe is not isServedTool (a tool that is not an object here is
 *   refused, never served).
 * - installFakeFurnace(): a scratch directory (test/helpers/scratch.ts) holding an executable `furnace` script, put first on
 *   PATH until restore(). For each invocation the script takes the first pair of adjacent arguments that names an answer of
 *   the answers file play() wrote ("run status", "attempt list"), writes that answer's stdout and stderr and exits with its
 *   exit code (0 when absent); an invocation that names no answer exits 2 with nothing on stdout. firstOnPath(command) is the
 *   first PATH entry holding an entry of that name that access(2) reports executable (X_OK).
 * - scenario(id, runId, workspace): the three pinned Runs, as @furnace/sdk 0.1.0 reads the CLI's documents. "complete": a
 *   run_status document with no unreadable record and an attempt_list document with no Attempt. "partial": the same Run with
 *   one unreadable record (an INCOMPLETE fact of the observer). "failing": run status exits 1 with a run_not_found error
 *   envelope on stderr. The Run's furnace_version holds INVISIBLE (U+202E), so the reading carries a text the sanitizer
 *   changes.
 * - ownObserver(fake, workspace, runId): the census's own FurnaceObserver, built with its own client (new Furnace with the
 *   fake's absolute path, the workspace as cwd and timeoutMs 10_000) and LIMITS, over the scope { workspace, principal:
 *   "census" }.
 * - atFixedDate(read): runs read with Date faked at FIXED_NOW (vitest fake timers for Date only) and restores the real timers
 *   after, so two readings of one Run carry the same capturedAt, observedAt and lastConfirmedAt.
 * - sourceAnchors(text): A1's anchor reading of src/index.ts. A key reads K when it is an identifier or a string literal (not
 *   computed and not shorthand) whose text, as TypeScript cooks it (an escape decoded, in an identifier as in a quoted key), is
 *   K. It counts the object literals holding a property assignment whose key reads `name` and whose initializer is itself a
 *   string literal whose cooked text is === "furnace_observe": a template literal, an initializer under parentheses, as,
 *   satisfies, a type assertion or a non-null assertion, and a computed value (an identifier, a concatenation, a call) are
 *   not read. Of those literals it takes the first in source order (where they nest, the outer), and in the initializer of
 *   that literal's first property assignment whose key reads `execute` (a method or a computed execute is not read) it lists,
 *   nested functions included, the calls whose callee is the identifier textResult itself (cooked; an optional call is one,
 *   while a callee under parentheses, a member, `new` and a tagged template are not), in the source order of their starts (a
 *   call in another's arguments comes after it), each by its first argument: a string literal as { kind: "literal", text: <its
 *   cooked text> }, a call whose callee is an identifier as { kind: "call", text: <that identifier, cooked> }, and anything
 *   else as { kind: "other", text: <its source text, "" when absent> }. A0 pins each of these readings; it is an anchor of the
 *   census's rows on trunk, not a reading of what pi serves.
 */
import { accessSync, chmodSync, constants, realpathSync, writeFileSync } from "node:fs";
import { delimiter, join } from "node:path";
import { Furnace } from "@furnace/sdk";
import ts from "typescript";
import { vi } from "vitest";
import subagentsExtension from "../../src/index.js";
import { FurnaceObserver } from "../../src/workbench/furnace-observer.js";
import { ctx, hermeticDir, makePi } from "./boot-extension.js";
import { makeScratch, removeScratch } from "./scratch.js";

/** The tool name this reader serves. */
export const SERVED_NAME = "furnace_observe";
/** The two literal refusals the census expects, verbatim. */
export const REFUSALS = { grant: "Permission denied: furnace:inspect grant required.", identity: "Invalid native Furnace Run identity." } as const;
/** The instant atFixedDate fakes Date at. */
export const FIXED_NOW = "2026-01-02T03:04:05.000Z";
/** U+202E (RIGHT-TO-LEFT OVERRIDE), which the shared sanitizer removes; built from its code point (standing rule 5). */
export const INVISIBLE = String.fromCodePoint(0x202e);
/** The census observer's limits; the census claims nothing about the limits src/index.ts hands its own observer. */
export const LIMITS = { maxPolls: 1, intervalMs: 1000, maxElapsedMs: 30_000, attemptLimit: 20, logBytes: 512, callTimeoutMs: 10_000 } as const;

type Fields = Record<string, unknown>;
const isFields = (value: unknown): value is Fields => typeof value === "object" && value !== null && !Array.isArray(value);
const keysOf = (value: Fields): string => Object.keys(value).sort().join(",");

/** The registerTool slot of a harness pi. */
export interface RegisterSlot {
  registerTool: (tool: unknown) => unknown;
}
/** Puts a recorder in front of pi.registerTool; the returned list grows with the name of every value handed to it. */
export function recordRegistrations(pi: RegisterSlot): readonly unknown[] {
  const received: unknown[] = [];
  const handOn = pi.registerTool;
  pi.registerTool = (tool: unknown): unknown => {
    received.push(tool === null || tool === undefined ? undefined : Reflect.get(Object(tool), "name"));
    return handOn(tool);
  };
  return received;
}

/** No finding when exactly one received entry is the name. */
export function judgeRegistrations(received: readonly unknown[], name: string): string[] {
  const count = received.filter(entry => entry === name).length;
  return count === 1 ? [] : [`${name} received ${count} times`];
}

/** No finding when the result reads as textResult(text): the header's own-enumerable-key reading, nothing wider. */
export function judgeReply(result: unknown, text: string): string[] {
  if (!isFields(result)) return ["result: not an object"];
  const findings: string[] = [];
  if (keysOf(result) !== "content,details") findings.push(`result keys: ${keysOf(result)}`);
  if (result.details !== undefined) findings.push("details: defined");
  const content = result.content;
  if (!Array.isArray(content)) return [...findings, "content: not an array"];
  if (content.length !== 1) return [...findings, `content: ${content.length} items`];
  const item: unknown = content[0];
  if (!isFields(item)) return [...findings, "item: not an object"];
  if (keysOf(item) !== "text,type") findings.push(`item keys: ${keysOf(item)}`);
  if (item.type !== "text") findings.push(`item type: ${JSON.stringify(item.type)}`);
  if (item.text !== text) findings.push(`item text: ${JSON.stringify(item.text)}`);
  return findings;
}

/** A served tool as the reader calls it. */
export interface ServedTool {
  execute: (id: string, params: Readonly<Fields>, signal: undefined, onUpdate: undefined, context: unknown) => Promise<unknown>;
}
/** Whether value is an object (isFields) whose execute, a property read, is a function (see the header). */
export const isServedTool = (value: unknown): value is ServedTool => isFields(value) && typeof value.execute === "function";
const isHandler = (value: unknown): value is (event: unknown, context: unknown) => unknown => typeof value === "function";

/** The two harness slots a planted extension factory uses (B0). */
export interface PlantedPi {
  registerTool(tool: unknown): unknown;
  on(event: string, handler: (event: unknown, context: { readonly cwd: string }) => unknown): unknown;
}
/** An extension factory B0 plants in place of src/index.ts's default export, to read bootServed's own order. */
export type PlantedFactory = (pi: PlantedPi) => void;

/** One pinned boot of the real extension (or of B0's planted factory) through the harness. */
export interface ServedBoot {
  /** The names recordRegistrations read, in the order handed. */
  readonly received: readonly unknown[];
  /** The sandbox the boot runs in, as realpath reads it. */
  readonly workspace: string;
  /** isServedTool of the harness's tools Map entry under the name. */
  serves(name: string): boolean;
  /** The served furnace_observe execute's resolution for these params. */
  call(params: Readonly<Fields>): Promise<unknown>;
  restore(): void;
}
/** The pinned boot (see the header). */
export async function bootServed(grants: readonly string[], factory?: PlantedFactory): Promise<ServedBoot> {
  const sandbox = hermeticDir({ settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: [...grants] } } });
  try {
    const booted = makePi();
    const received = recordRegistrations(booted.pi);
    const extension: PlantedFactory | typeof subagentsExtension = factory ?? subagentsExtension;
    extension(booted.pi);
    const context: unknown = ctx({ cwd: sandbox.dir });
    const start: unknown = booted.lifecycle.get("session_start");
    if (!isHandler(start)) throw new Error("the extension registered no session_start handler");
    await start({}, context);
    const tools: ReadonlyMap<string, unknown> = booted.tools;
    const served = (name: string): ServedTool | undefined => {
      const tool = tools.get(name);
      return isServedTool(tool) ? tool : undefined;
    };
    return {
      received,
      workspace: realpathSync(sandbox.dir),
      serves: name => served(name) !== undefined,
      call: async params => {
        const tool = served(SERVED_NAME);
        if (tool === undefined) throw new Error(`the harness serves no ${SERVED_NAME} execute`);
        return tool.execute("census", params, undefined, undefined, context);
      },
      restore: () => sandbox.restore(),
    };
  } catch (error) {
    sandbox.restore();
    throw error;
  }
}

/** One answer of the fake furnace to one command. */
export interface FakeAnswer {
  readonly stdout?: string;
  readonly stderr?: string;
  readonly exit?: number;
}
/** The fake furnace's answers, keyed by the command's two words ("run status", "attempt list"). */
export type FakeAnswers = Readonly<Record<string, FakeAnswer>>;
/** The census's fake furnace, first on PATH until restore(). */
export interface FakeFurnace {
  readonly binary: string;
  play(answers: FakeAnswers): void;
  restore(): void;
}
const fakeSource = (node: string): string =>
  [
    `#!${node}`,
    '"use strict";',
    "// wb-g20x census fake furnace: answers from answers.json beside this file; never a real Furnace.",
    'const fs = require("node:fs");',
    'const path = require("node:path");',
    "const argv = process.argv.slice(2);",
    'const answers = JSON.parse(fs.readFileSync(path.join(__dirname, "answers.json"), "utf8"));',
    "let answer;",
    "for (let i = 0; i + 1 < argv.length && answer === undefined; i++) {",
    '  const key = argv[i] + " " + argv[i + 1];',
    "  if (Object.hasOwn(answers, key)) answer = answers[key];",
    "}",
    'if (answer === undefined) { process.stderr.write("census fake furnace: no answer for this command\\n"); process.exit(2); }',
    'if (typeof answer.stdout === "string") process.stdout.write(answer.stdout);',
    'if (typeof answer.stderr === "string") process.stderr.write(answer.stderr);',
    'process.exitCode = typeof answer.exit === "number" ? answer.exit : 0;',
    "",
  ].join("\n");
/** Installs the fake furnace (see the header). */
export function installFakeFurnace(): FakeFurnace {
  const dir = makeScratch("furnace-observe-served-");
  const binary = join(dir, "furnace");
  writeFileSync(binary, fakeSource(process.execPath));
  chmodSync(binary, 0o755);
  writeFileSync(join(dir, "answers.json"), "{}");
  const previous = process.env.PATH;
  process.env.PATH = previous === undefined ? dir : `${dir}${delimiter}${previous}`;
  return {
    binary,
    play: answers => writeFileSync(join(dir, "answers.json"), JSON.stringify(answers)),
    restore: () => {
      if (previous === undefined) delete process.env.PATH;
      else process.env.PATH = previous;
      removeScratch(dir);
    },
  };
}
/** The first PATH entry holding an executable file named command, joined with it; undefined when none does. */
export function firstOnPath(command: string): string | undefined {
  for (const entry of (process.env.PATH ?? "").split(delimiter)) {
    if (entry === "") continue;
    const candidate = join(entry, command);
    try {
      accessSync(candidate, constants.X_OK);
      return candidate;
    } catch {}
  }
  return undefined;
}

/** The three pinned Runs. */
export const SCENARIO_IDS = ["complete", "partial", "failing"] as const;
export type ScenarioId = (typeof SCENARIO_IDS)[number];
/** The pinned Run's fake answers (see the header). */
export function scenario(id: ScenarioId, runId: string, workspace: string): FakeAnswers {
  const envelope = (kind: string, requestId: string, data: Fields): string => JSON.stringify({ protocol_version: 1, ok: true, request_id: requestId, kind, data });
  if (id === "failing") {
    const error = { code: "run_not_found", message: "HYPOTHETICAL: the census Run does not exist", retryable: false };
    return { "run status": { exit: 1, stderr: `${JSON.stringify({ protocol_version: 1, ok: false, request_id: "census-served-error", kind: "run_status", error })}\n` } };
  }
  const unreadable = id === "partial" ? [{ path: "attempts/frn-atm-census-served.json", class: "unreadable", detail: "HYPOTHETICAL unreadable record" }] : [];
  const status = {
    run_id: runId,
    beads_run_id: "bd-census-served",
    workspace,
    state: "active",
    mode: "ephemeral_wisp",
    furnace_version: `0.1.0${INVISIBLE}census`,
    state_since: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    active: [],
    failed: [],
    attention: [],
    unreadable,
    corrupt_events: [],
    conflicts: [],
    failed_total: 0,
    corrupt_events_total: 0,
  };
  const page = { run_id: runId, beads_run_id: "bd-census-served", attempts: [], unreadable: [], returned: 0, complete: true, next_cursor: null };
  return {
    "run status": { stdout: envelope("run_status", "census-served-status", status) },
    "attempt list": { stdout: envelope("attempt_list", "census-served-attempts", page) },
  };
}

/** The census's own observer of a pinned Run (see the header). */
export function ownObserver(fake: FakeFurnace, workspace: string, runId: string): FurnaceObserver {
  const client = new Furnace({ binary: fake.binary, cwd: workspace, timeoutMs: 10_000 });
  return new FurnaceObserver(client, { workspaceRoot: workspace, runId, scope: { workspace, principal: "census" }, limits: { ...LIMITS } });
}

/** Runs read with Date faked at FIXED_NOW, restoring the real timers after. */
export async function atFixedDate<T>(read: () => Promise<T>): Promise<T> {
  vi.useFakeTimers({ toFake: ["Date"], now: new Date(FIXED_NOW) });
  try {
    return await read();
  } finally {
    vi.useRealTimers();
  }
}

/** One textResult call site of the furnace_observe execute, as A1's anchor reads it. */
export interface ReplySite {
  readonly kind: "literal" | "call" | "other";
  readonly text: string;
}
/** A1's anchor reading of a src/index.ts text (see the header). */
export function sourceAnchors(text: string): { readonly literals: number; readonly sites: readonly ReplySite[] } {
  const source = ts.createSourceFile("src/index.ts", text, ts.ScriptTarget.Latest, true);
  const keyed = (property: ts.ObjectLiteralElementLike, key: string): property is ts.PropertyAssignment =>
    ts.isPropertyAssignment(property) && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) && property.name.text === key;
  const literals: ts.ObjectLiteralExpression[] = [];
  const find = (node: ts.Node): void => {
    if (ts.isObjectLiteralExpression(node) && node.properties.some(property => keyed(property, "name") && ts.isStringLiteral(property.initializer) && property.initializer.text === SERVED_NAME)) literals.push(node);
    ts.forEachChild(node, find);
  };
  find(source);
  const execute = literals[0]?.properties.find(property => keyed(property, "execute"));
  const sites: ReplySite[] = [];
  const collect = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "textResult") {
      const argument = node.arguments[0];
      if (argument !== undefined && ts.isStringLiteral(argument)) sites.push({ kind: "literal", text: argument.text });
      else if (argument !== undefined && ts.isCallExpression(argument) && ts.isIdentifier(argument.expression)) sites.push({ kind: "call", text: argument.expression.text });
      else sites.push({ kind: "other", text: argument?.getText(source) ?? "" });
    }
    ts.forEachChild(node, collect);
  };
  if (execute !== undefined && ts.isPropertyAssignment(execute)) collect(execute.initializer);
  return { literals: literals.length, sites };
}
