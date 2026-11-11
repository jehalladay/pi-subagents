/**
 * wb-0ls3 cut #1, EAT-R441 criterion 2 only (the MII P04+ packet "Registered dispatch: route, effect-axis, refusal
 * envelope"; its description asks for one criterion per cut, with the EAT id in every receipt): the `completion` member
 * of each reply the registered workflow_execute gives to this file's function-definition requests, and the text the
 * workflow_execute reply builders write.
 *
 * Requirement: docs/workbench/programs/mechanical-interop-integrity-2026-11-10/requirements/ATOMIC-REQUIREMENTS.md on
 * pi-subagents master 53ac7f35, EAT-R441 ("Keep the launch reply launch-only"). Criterion 2, verbatim (CRITERION_2 below,
 * and the receipt's "- CRITERION 2 " line): "`completion` equals `"not-asserted"` on every function launch reply
 * including refusals; a census over the reply builders finds no `completed`, `succeeded`, `verified` or `SUCCESS` token
 * emitted from the launch path." Criterion 4, verbatim: "Mutant: emitting `completion: "completed"` after a successful
 * launch turns criterion 2 red." That mutant is this cut's red; docs/workbench/receipts/wb-0ls3.md records the battery.
 *
 * ORACLE-REG (the same document's "Execution and evidence conventions"): the workflow_execute tool object as src/index.ts
 * registers it (pi.registerTool(createWorkflowExecuteTool(...))), driven through its execute member. The C1 rows boot the
 * real extension under the claude workbench backend with test/helpers/boot-extension.ts and take the tool from that
 * registration, never from createWorkflowExecuteTool. A row's host grants are the sandbox settings file's
 * workbench.capabilityGrants, written before the row's call (the tool reads them from host context on every call).
 *
 * CLAIMED, each by its rows only:
 *   C1 REFUSAL_ROWS F1-F10: the row's kind "function" request, sent to the registered workflow_execute under the row's
 *      host grants, is answered with one text part that parses as one JSON object whose contract is
 *      "workbench.tool-reply/v1", tool "workflow_execute", status "refused", ok false, invoked false, completion
 *      "not-asserted", error.code the row's code and no invocationId member, and scanText finds none of TOKENS in it.
 *   C2 BUILDER_ROWS B1-B4 (V1: the pure builder, not ORACLE-REG): buildWorkflowExecuteReply over decideExecute's decision
 *      for the reviewed embedded function request (admitted under workbench:execute, refused under no grant) and the
 *      row's launch outcome returns the row's status with completion "not-asserted", and scanText finds none of TOKENS
 *      in its JSON text.
 *   C3 BUILDER_MODULES: every string literal, template text, and object, type or class member name that
 *      src/workbench/execute-tool.ts, src/workbench/execute.ts and src/workbench/tool-replies.ts write, as writtenTexts
 *      reads them through the TypeScript parser, holds none of TOKENS (scanText), and each module yields its LIVENESS
 *      texts.
 *   C4 the two scanners: scanText reports each of TOKENS in any letter case as a whole word and nothing inside a longer
 *      word; censusFindings (writtenTexts, then scanText) reports each token CONTROL_SOURCE writes in a string literal, a
 *      template, an object member, a type member and a class field, and nothing from its comment or its variable names.
 *   C5 the judged set and the records: REFUSAL_ROWS, BUILDER_ROWS, BUILDER_MODULES, TOKENS and CRITERION_2 equal their
 *      frozen literals and the receipt's lines; every test of this file is ROSTER's, registered once and in order, in run
 *      mode and not inverted (read by the judged-set case before any other case runs, and again by the records case);
 *      each case before the records case reached its end with its REACHED_SHAPE count, and each row's measured witness
 *      (MEASURED) equals the one expectedWitnesses writes from the rows.
 * NOT CLAIMED by this file: a successful function launch reply through the registered tool (none exists at this cut's
 *   base: after admission execute-tool.ts refuses every definition kind but script); script and furnace-formula
 *   definitions; requests, grant sets, host modes and launch outcomes other than the rows'; unknown-permission-data
 *   through the registered tool (the settings file refuses a grant list it cannot read); a listed token inside a longer
 *   word (unverified, successful); text a reply builder composes at run time or takes from a module outside
 *   BUILDER_MODULES, except on the replies of C1 and C2; any success glyph or word outside TOKENS; EAT-R441 criteria 1, 3
 *   and 4 as acceptance rows of their own; EAT-R412, R419, R426, R461 and R465. The packet remainder stays owed.
 * NAMED RESIDUALS: none.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import ts from "typescript";
import { afterAll, beforeAll, beforeEach, describe, expect, it, type RunnerTask } from "vitest";
import subagentsExtension from "../src/index.js";
import { buildWorkflowExecuteReply, decideExecute, type LaunchOutcome } from "../src/workbench/execute.js";
import { ctx, type Hermetic, hermeticDir, makePi } from "./helpers/boot-extension.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const RECEIPT = "docs/workbench/receipts/wb-0ls3.md";

/** EAT-R441 criterion 2, verbatim from the requirement file; the receipt's "- CRITERION 2 " line holds the same text. */
const CRITERION_2 =
  '`completion` equals `"not-asserted"` on every function launch reply including refusals; a census over the reply builders finds no `completed`, `succeeded`, `verified` or `SUCCESS` token emitted from the launch path.';
/** The four tokens criterion 2 lists, in its order. */
const TOKENS = ["completed", "succeeded", "verified", "SUCCESS"] as const;
/** The modules that write a workflow_execute reply: the tool shell, the pure admission and reply builder, and the tool-reply contract. */
const BUILDER_MODULES = ["src/workbench/execute-tool.ts", "src/workbench/execute.ts", "src/workbench/tool-replies.ts"] as const;
/** Texts each module must yield, so the census is shown to read the module it judges. */
const LIVENESS: Readonly<Record<(typeof BUILDER_MODULES)[number], readonly string[]>> = {
  "src/workbench/execute-tool.ts": ["not-asserted", "completion", "workflow_execute"],
  "src/workbench/execute.ts": ["not-asserted", "completion", "workbench.execute/v1"],
  "src/workbench/tool-replies.ts": ["workbench.tool-reply/v1"],
};

/** Each whole-word occurrence of a listed token in `text`, in any letter case, as the token's listed spelling, in TOKENS order. */
function scanText(text: string): string[] {
  return TOKENS.flatMap(token => [...text.matchAll(new RegExp(`(?<![A-Za-z])${token}(?![A-Za-z])`, "gi"))].map(() => token));
}
/** Every string literal, template text and object, type or class member name a TypeScript source writes, in source order. */
function writtenTexts(fileName: string, sourceText: string): string[] {
  const source = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const texts: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      texts.push(node.text);
    } else if ((ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node) || ts.isPropertySignature(node) || ts.isPropertyDeclaration(node)) && ts.isIdentifier(node.name)) {
      texts.push(node.name.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return texts;
}
/** The census over one source: each written text that holds a listed token, with the token. */
function censusFindings(fileName: string, sourceText: string): string[] {
  return writtenTexts(fileName, sourceText).flatMap(text => scanText(text).map(token => `${JSON.stringify(text)} ${token}`));
}

/** The reviewed embedded function the MII program names (mechanical.development.develop.v1 under its pinned entrypoint schema). */
const REVIEWED = Object.freeze({
  kind: "function",
  id: "mechanical.development.develop.v1",
  schemaVersion: "mechanical-workflows/entrypoint/v1",
  artifactDigest: `sha256:${"ab".repeat(32)}`,
} as const);
const EXECUTE = "workbench:execute";
const DETACH = "workbench:detach";
/** A workflow_execute request for the reviewed function, with request members and definitionRef members replaced or added. */
function request(over: Readonly<Record<string, unknown>> = {}, definition: Readonly<Record<string, unknown>> = {}): Readonly<Record<string, unknown>> {
  return { definitionRef: { ...REVIEWED, ...definition }, input: { task: "t" }, hostMode: "embedded", ...over };
}

interface RefusalRow {
  readonly id: string;
  readonly label: string;
  readonly grants: readonly string[];
  readonly params: Readonly<Record<string, unknown>>;
  readonly code: string;
}
/** C1: the function-definition requests the registered tool refuses at this base, each under its host grants. */
const REFUSAL_ROWS: readonly RefusalRow[] = [
  { id: "F1", label: "the reviewed function mechanical.development.develop.v1 (hostMode embedded) under [workbench:execute]", grants: [EXECUTE], params: request(), code: "unsupported-definition-kind" },
  { id: "F2", label: "the reviewed function (hostMode detached) under [workbench:execute, workbench:detach]", grants: [EXECUTE, DETACH], params: request({ hostMode: "detached" }), code: "unsupported-definition-kind" },
  { id: "F3", label: "the reviewed function (hostMode detached) under [workbench:execute]", grants: [EXECUTE], params: request({ hostMode: "detached" }), code: "missing-detach-grant" },
  { id: "F4", label: "the reviewed function (hostMode embedded) under no grant", grants: [], params: request(), code: "missing-execute-grant" },
  {
    id: "F5",
    label: "the reviewed function (hostMode embedded) with a JSON policy naming workbench:execute, under [workbench:design]",
    grants: ["workbench:design"],
    params: request({ policy: { grants: [EXECUTE], actionGrant: "fixture-fn:develop-write" } }),
    code: "missing-execute-grant",
  },
  { id: "F6", label: "an arbitrary function id fixture.arbitrary.fn (hostMode embedded) under [workbench:execute]", grants: [EXECUTE], params: request({}, { id: "fixture.arbitrary.fn" }), code: "unsupported-definition-kind" },
  { id: "F7", label: "the reviewed function with artifactDigest main under [workbench:execute]", grants: [EXECUTE], params: request({}, { artifactDigest: "main" }), code: "non-digest-definition" },
  { id: "F8", label: "the reviewed function with hostMode remote under [workbench:execute]", grants: [EXECUTE], params: request({ hostMode: "remote" }), code: "unknown-host-mode" },
  { id: "F9", label: "the reviewed function with the JSON policy allow (a string) under [workbench:execute]", grants: [EXECUTE], params: request({ policy: "allow" }), code: "malformed-policy" },
  { id: "F10", label: "the reviewed function with an extra definitionRef member entry under [workbench:execute]", grants: [EXECUTE], params: request({}, { entry: "develop" }), code: "malformed-request" },
];

interface BuilderRow {
  readonly id: string;
  readonly label: string;
  readonly grants: readonly string[];
  readonly decision: "admitted" | "refused";
  readonly outcome: LaunchOutcome | undefined;
  readonly status: string;
}
/** C2: the pure builder over the reviewed embedded function request, admitted or refused, and each launch outcome kind. */
const BUILDER_ROWS: readonly BuilderRow[] = [
  { id: "B1", label: "the reviewed function admitted under [workbench:execute] and the outcome accepted", grants: [EXECUTE], decision: "admitted", outcome: { status: "accepted" }, status: "accepted" },
  {
    id: "B2",
    label: "the reviewed function admitted under [workbench:execute] and the outcome launched with one native reference",
    grants: [EXECUTE],
    decision: "admitted",
    outcome: { status: "launched", nativeRefs: [{ provider: "pi-workflow", type: "task", id: "wf_0ls3launched" }] },
    status: "launched",
  },
  { id: "B3", label: "the reviewed function admitted under [workbench:execute] and the outcome refused with a reason", grants: [EXECUTE], decision: "admitted", outcome: { status: "refused", reason: "launcher refused" }, status: "refused" },
  { id: "B4", label: "the reviewed function refused under no grant, with no outcome", grants: [], decision: "refused", outcome: undefined, status: "refused" },
];

/** RULE 16 frozen shape of the judged rows, AC1-style: each row's id and expected code or status, in order. */
const REFUSAL_SHAPE = [
  "F1:unsupported-definition-kind",
  "F2:unsupported-definition-kind",
  "F3:missing-detach-grant",
  "F4:missing-execute-grant",
  "F5:missing-execute-grant",
  "F6:unsupported-definition-kind",
  "F7:non-digest-definition",
  "F8:unknown-host-mode",
  "F9:malformed-policy",
  "F10:malformed-request",
] as const;
const BUILDER_SHAPE = ["B1:accepted", "B2:launched", "B3:refused", "B4:refused"] as const;
/** A row as the receipt's "- REFUSAL_ROW " and "- BUILDER_ROW " lines hold it: its id, then its request and expectation as JSON. */
const refusalRowText = (row: RefusalRow): string => `${row.id} ${JSON.stringify({ grants: row.grants, params: row.params, code: row.code })}`;
const builderRowText = (row: BuilderRow): string => `${row.id} ${JSON.stringify({ grants: row.grants, decision: row.decision, outcome: row.outcome ?? null, status: row.status })}`;

/** The control source of C4: each listed token written once in each form the census reads, and in forms it never reads. */
const CONTROL_SOURCE = [
  'const literal = "completed";',
  `const template = \`launch \${literal} succeeded\`;`,
  "const member = { verified: true, SUCCESS: 1 };",
  "interface Shape { readonly Completed?: boolean }",
  "class Field { succeeded = false; }",
  "// completed succeeded verified SUCCESS",
  "const completedCount = 1; const verified = completedCount; void member; void template; void Field;",
].join("\n");

interface ToolResult {
  readonly content: ReadonlyArray<{ readonly type: string; readonly text?: string }>;
}
interface RegisteredTool {
  execute(toolCallId: string, params: Readonly<Record<string, unknown>>, signal: undefined, onUpdate: undefined, context: ExtensionContext): Promise<ToolResult>;
}
interface Booted {
  readonly sandbox: Hermetic;
  readonly tool: RegisteredTool;
  readonly context: ExtensionContext;
}
const settingsFor = (grants: readonly string[]) => ({ workbench: { workflowAgentBackend: "claude", capabilityGrants: [...grants] } });
/** Boots the real extension under the claude workbench backend and takes workflow_execute from its registration. */
async function bootRegistered(): Promise<Booted> {
  const sandbox = hermeticDir({ settings: settingsFor([]) });
  try {
    const booted = makePi();
    subagentsExtension(booted.pi);
    const context: ExtensionContext = ctx({ cwd: sandbox.dir });
    await booted.lifecycle.get("session_start")?.({}, context);
    const tool: RegisteredTool | undefined = booted.tools.get("workflow_execute");
    if (tool === undefined) throw new Error("workflow_execute is not registered under the claude workbench backend");
    return { sandbox, tool, context };
  } catch (error) {
    sandbox.restore();
    throw error;
  }
}
function recordOf(value: unknown, what: string): Readonly<Record<string, unknown>> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error(`${what} is not a JSON object: ${JSON.stringify(value)}`);
  return value as Readonly<Record<string, unknown>>;
}

const refusalTitle = (row: RefusalRow): string => `C1 ${row.id}: the registered workflow_execute answers ${row.label} as refused ${row.code}, completion not-asserted, no listed token`;
const builderTitle = (row: BuilderRow): string => `C2 ${row.id}: buildWorkflowExecuteReply over ${row.label} returns status ${row.status}, completion not-asserted, no listed token`;
const JUDGED_ID = "C5a";
const JUDGED_TITLE = "C5 the judged set: REFUSAL_ROWS, BUILDER_ROWS, BUILDER_MODULES, TOKENS and CRITERION_2 equal their frozen literals and the receipt's lines";
const CENSUS_ID = "C3";
const CENSUS_TITLE = "C3 BUILDER_MODULES: no string literal, template text or member name execute-tool.ts, execute.ts or tool-replies.ts writes holds a listed token, and each yields its LIVENESS texts";
const SCAN_CONTROL_ID = "C4a";
const SCAN_CONTROL_TITLE = "C4 scanText: each listed token is reported in any letter case as a whole word, and not inside a longer word";
const CENSUS_CONTROL_ID = "C4b";
const CENSUS_CONTROL_TITLE = "C4 censusFindings: each token CONTROL_SOURCE writes in a string literal, template, object member, type member or class field is reported, and nothing from its comment or variable names";
const RECORDS_ID = "C5b";
const RECORDS_TITLE = "C5 the records: every test of this file is ROSTER's, registered once in order, in run mode, not inverted, and every case before this one reached its end with its pinned count";

/** Every test of this file, in registration order. */
const ROSTER = [
  "C5 the judged set: REFUSAL_ROWS, BUILDER_ROWS, BUILDER_MODULES, TOKENS and CRITERION_2 equal their frozen literals and the receipt's lines",
  "C1 F1: the registered workflow_execute answers the reviewed function mechanical.development.develop.v1 (hostMode embedded) under [workbench:execute] as refused unsupported-definition-kind, completion not-asserted, no listed token",
  "C1 F2: the registered workflow_execute answers the reviewed function (hostMode detached) under [workbench:execute, workbench:detach] as refused unsupported-definition-kind, completion not-asserted, no listed token",
  "C1 F3: the registered workflow_execute answers the reviewed function (hostMode detached) under [workbench:execute] as refused missing-detach-grant, completion not-asserted, no listed token",
  "C1 F4: the registered workflow_execute answers the reviewed function (hostMode embedded) under no grant as refused missing-execute-grant, completion not-asserted, no listed token",
  "C1 F5: the registered workflow_execute answers the reviewed function (hostMode embedded) with a JSON policy naming workbench:execute, under [workbench:design] as refused missing-execute-grant, completion not-asserted, no listed token",
  "C1 F6: the registered workflow_execute answers an arbitrary function id fixture.arbitrary.fn (hostMode embedded) under [workbench:execute] as refused unsupported-definition-kind, completion not-asserted, no listed token",
  "C1 F7: the registered workflow_execute answers the reviewed function with artifactDigest main under [workbench:execute] as refused non-digest-definition, completion not-asserted, no listed token",
  "C1 F8: the registered workflow_execute answers the reviewed function with hostMode remote under [workbench:execute] as refused unknown-host-mode, completion not-asserted, no listed token",
  "C1 F9: the registered workflow_execute answers the reviewed function with the JSON policy allow (a string) under [workbench:execute] as refused malformed-policy, completion not-asserted, no listed token",
  "C1 F10: the registered workflow_execute answers the reviewed function with an extra definitionRef member entry under [workbench:execute] as refused malformed-request, completion not-asserted, no listed token",
  "C2 B1: buildWorkflowExecuteReply over the reviewed function admitted under [workbench:execute] and the outcome accepted returns status accepted, completion not-asserted, no listed token",
  "C2 B2: buildWorkflowExecuteReply over the reviewed function admitted under [workbench:execute] and the outcome launched with one native reference returns status launched, completion not-asserted, no listed token",
  "C2 B3: buildWorkflowExecuteReply over the reviewed function admitted under [workbench:execute] and the outcome refused with a reason returns status refused, completion not-asserted, no listed token",
  "C2 B4: buildWorkflowExecuteReply over the reviewed function refused under no grant, with no outcome returns status refused, completion not-asserted, no listed token",
  "C3 BUILDER_MODULES: no string literal, template text or member name execute-tool.ts, execute.ts or tool-replies.ts writes holds a listed token, and each yields its LIVENESS texts",
  "C4 scanText: each listed token is reported in any letter case as a whole word, and not inside a longer word",
  "C4 censusFindings: each token CONTROL_SOURCE writes in a string literal, template, object member, type member or class field is reported, and nothing from its comment or variable names",
  "C5 the records: every test of this file is ROSTER's, registered once in order, in run mode, not inverted, and every case before this one reached its end with its pinned count",
] as const;
/** THE RECORD each case before the records case leaves, as `${id}:${assertions}` (vitest's tally of the case's assertions), in run order. */
const REACHED_SHAPE = [
  "C5a:10",
  "F1:10",
  "F2:10",
  "F3:10",
  "F4:10",
  "F5:10",
  "F6:10",
  "F7:10",
  "F8:10",
  "F9:10",
  "F10:10",
  "B1:4",
  "B2:4",
  "B3:4",
  "B4:4",
  "C3:10",
  "C4a:12",
  "C4b:1",
] as const;
const RECORDS_END = "C5b:6";

const REACHED: string[] = [];
/** Each row's witness as its case measured it; the records case compares it against the rows a second time. */
const MEASURED: Record<string, Readonly<Record<string, unknown>>> = {};
const SELECTED: string[] = [];
/** A case's end as the record holds it: pushed only after the case's last assertion. */
const endOf = (id: string): string => `${id}:${expect.getState().assertionCalls}`;
interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every test a collected task tree holds, in registration order; self marks the case doing the reading. */
function registeredTests(tasks: readonly RunnerTask[], self?: RunnerTask): Registered[] {
  const walked: Registered[] = [];
  for (const child of tasks) {
    if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === self });
    else if (child.type === "suite") walked.push(...registeredTests(child.tasks, self));
  }
  return walked;
}

/** A registered test's title with its collected mode, "+fails" marking an inverted one. */
const modeLine = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""}`;
/** The witness each row's case must measure, written from the rows a second time. */
function expectedWitnesses(): Record<string, Readonly<Record<string, unknown>>> {
  return Object.fromEntries([
    ...REFUSAL_ROWS.map(row => [row.id, { contract: "workbench.tool-reply/v1", tool: "workflow_execute", status: "refused", ok: false, invoked: false, completion: "not-asserted", invocationId: false, code: row.code, tokens: [] }] as const),
    ...BUILDER_ROWS.map(row => [row.id, { decision: row.decision, status: row.status, completion: "not-asserted", tokens: [] }] as const),
  ]);
}

// The selection, read once from the collected tree before the first case runs (a test-name filter deselects the rest).
beforeEach(({ task }) => {
  if (SELECTED.length === 0) SELECTED.push(...registeredTests(task.file.tasks).filter(entry => entry.mode === "run").map(entry => entry.name));
});
// The file-end judge: a records case selected to run reached its own end, after every other case's, with its pinned count.
afterAll(() => {
  if (!SELECTED.includes(RECORDS_TITLE)) return;
  expect(REACHED, "every case of this file reached its end, the records case last").toEqual([...REACHED_SHAPE, RECORDS_END]);
});

describe("wb-0ls3 EAT-R441 criterion 2: completion on the function route of the registered workflow_execute, and the reply builders' written text", () => {
  it(JUDGED_TITLE, { timeout: 60_000 }, ({ task }) => {
    // The collected cases, read before any other case runs: a records case deleted, renamed, skipped or inverted reds here.
    const collected = registeredTests(task.file.tasks, task);
    expect(collected.map(entry => entry.name), "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER]);
    expect(collected.findIndex(entry => entry.self), "this case finds itself by task identity, registered first").toBe(0);
    expect(collected.filter(entry => entry.mode !== "run" || entry.fails).map(modeLine), "every test is set to run and none is inverted").toEqual([]);
    expect(REFUSAL_ROWS.map(row => `${row.id}:${row.code}`), "REFUSAL_ROWS against its frozen shape").toEqual([...REFUSAL_SHAPE]);
    expect(BUILDER_ROWS.map(row => `${row.id}:${row.status}`), "BUILDER_ROWS against its frozen shape").toEqual([...BUILDER_SHAPE]);
    const lines = readFileSync(join(ROOT, RECEIPT), "utf8").split("\n");
    const held = (prefix: string): string[] => lines.filter(line => line.startsWith(prefix)).map(line => line.slice(prefix.length));
    expect(held("- REFUSAL_ROW "), "REFUSAL_ROWS against the receipt, row by row").toEqual(REFUSAL_ROWS.map(refusalRowText));
    expect(held("- BUILDER_ROW "), "BUILDER_ROWS against the receipt, row by row").toEqual(BUILDER_ROWS.map(builderRowText));
    expect(held("- BUILDER_MODULES "), "BUILDER_MODULES against the receipt").toEqual([BUILDER_MODULES.join(", ")]);
    expect(held("- TOKENS "), "TOKENS against the receipt").toEqual([TOKENS.join(", ")]);
    expect(held("- CRITERION 2 "), "CRITERION_2 against the receipt").toEqual([CRITERION_2]);
    REACHED.push(endOf(JUDGED_ID));
  });

  describe("C1 the function-definition rows through workflow_execute as src/index.ts registers it (ORACLE-REG)", () => {
    let booted: Booted | undefined;
    beforeAll(async () => {
      booted = await bootRegistered();
    }, 180_000);
    afterAll(() => {
      booted?.sandbox.restore();
      booted = undefined;
    });
    for (const row of REFUSAL_ROWS) {
      it(refusalTitle(row), { timeout: 60_000 }, async () => {
        const registered = booted;
        if (registered === undefined) throw new Error("the registered workflow_execute was not booted");
        writeFileSync(join(registered.sandbox.dir, ".pi", "subagents.json"), JSON.stringify(settingsFor(row.grants)));
        const result = await registered.tool.execute(`wb-0ls3-${row.id}`, row.params, undefined, undefined, registered.context);
        expect(result.content.map(part => part.type), "the reply is one text part").toEqual(["text"]);
        const text = result.content[0]?.text ?? "";
        const reply = recordOf(JSON.parse(text), "the reply text");
        expect(reply.contract, "contract").toBe("workbench.tool-reply/v1");
        expect(reply.tool, "tool").toBe("workflow_execute");
        expect(reply.status, "status").toBe("refused");
        expect(reply.ok, "ok").toBe(false);
        expect(reply.invoked, "invoked").toBe(false);
        expect(reply.completion, "completion").toBe("not-asserted");
        expect(Object.hasOwn(reply, "invocationId"), "a refusal names no invocation reference").toBe(false);
        expect(recordOf(reply.error, "the reply error").code, "error.code").toBe(row.code);
        expect(scanText(text), "no listed token in the reply text").toEqual([]);
        MEASURED[row.id] = {
          contract: reply.contract,
          tool: reply.tool,
          status: reply.status,
          ok: reply.ok,
          invoked: reply.invoked,
          completion: reply.completion,
          invocationId: Object.hasOwn(reply, "invocationId"),
          code: recordOf(reply.error, "the reply error").code,
          tokens: scanText(text),
        };
        REACHED.push(endOf(row.id));
      });
    }
  });

  describe("C2 the pure reply builder over the reviewed function's decision and each launch outcome (V1)", () => {
    for (const row of BUILDER_ROWS) {
      it(builderTitle(row), { timeout: 60_000 }, () => {
        const decision = decideExecute({ definitionRef: { ...REVIEWED }, input: { task: "t" }, hostMode: "embedded" }, { grants: row.grants, invocationId: "wf_0ls3builder" });
        expect(decision.decision, "decideExecute's decision").toBe(row.decision);
        const reply = buildWorkflowExecuteReply(decision, row.outcome);
        expect(reply.status, "status").toBe(row.status);
        expect(reply.completion, "completion").toBe("not-asserted");
        expect(scanText(JSON.stringify(reply)), "no listed token in the reply's JSON text").toEqual([]);
        MEASURED[row.id] = { decision: decision.decision, status: reply.status, completion: reply.completion, tokens: scanText(JSON.stringify(reply)) };
        REACHED.push(endOf(row.id));
      });
    }
  });

  it(CENSUS_TITLE, { timeout: 60_000 }, () => {
    for (const path of BUILDER_MODULES) {
      const sourceText = readFileSync(join(ROOT, path), "utf8");
      const texts = writtenTexts(path, sourceText);
      for (const live of LIVENESS[path]) expect(texts, `${path} yields ${JSON.stringify(live)}`).toContain(live);
      expect(censusFindings(path, sourceText), `${path} writes no listed token`).toEqual([]);
    }
    REACHED.push(endOf(CENSUS_ID));
  });

  it(SCAN_CONTROL_TITLE, { timeout: 60_000 }, () => {
    for (const token of TOKENS) {
      expect(scanText(`a ${token} b`), `${token} as a word`).toEqual([token]);
      expect(scanText(`"${token.toLowerCase()}":${token.toUpperCase()}`), `${token} in either letter case`).toEqual([token, token]);
      expect(scanText(`un${token.toLowerCase()}ful ${token}s x${token}`), `${token} inside a longer word`).toEqual([]);
    }
    REACHED.push(endOf(SCAN_CONTROL_ID));
  });

  it(CENSUS_CONTROL_TITLE, { timeout: 60_000 }, () => {
    expect(censusFindings("control.ts", CONTROL_SOURCE), "the control source's written tokens, in source order").toEqual([
      '"completed" completed',
      '" succeeded" succeeded',
      '"verified" verified',
      '"SUCCESS" SUCCESS',
      '"Completed" completed',
      '"succeeded" succeeded',
    ]);
    REACHED.push(endOf(CENSUS_CONTROL_ID));
  });

  it(RECORDS_TITLE, { timeout: 60_000 }, ({ task }) => {
    const walked = registeredTests(task.file.tasks, task);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => `${modeLine(entry)} | ${entry.state ?? "no result"}`),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every case before this one reached its end, in run order, with its pinned assertion count").toEqual([...REACHED_SHAPE]);
    expect(MEASURED, "every row's measured witness, compared against the rows a second time").toStrictEqual(expectedWitnesses());
    REACHED.push(endOf(RECORDS_ID));
  });
});
