/**
 * wb-9btr ([DX P03] of the pi-system-dx-triage-2026-11-11 program, which lives on origin/master at 0a5ac3a3 and not in this
 * trunk's tree; its requirement rows are in that program's req-r-lx shard): EAT-R323 (a syntactically invalid definition is
 * refused at launch) and EAT-R322 criteria 2 and 3. Cut #2 cures refusal #1's U1, U2 and U3, and cut #3 cures refusal #2's U1 and
 * U2 (docs/workbench/receipts/wb-9btr.md).
 * The criterion lines these cases pin, quoted:
 *   EAT-R323 (1) "workflow_execute refuses the broken definition synchronously with typed code `definition-syntax-invalid`
 *                carrying the line (no ok:true, no background run created)."
 *   EAT-R323 (2) "SubagentWorkflow refuses the same definition synchronously (parity with its meta-error path),
 *                launchedInBackground:false."
 *   EAT-R323 (3) "the check compiles without executing user code (vm.Script construct only; probe asserts zero script side
 *                effects at admission)."
 *   EAT-R322 (2) "ReferenceErrors on require/process/fetch/setTimeout/import append the no-Node-APIs hint, and the node()
 *                no-registry message names `workbench.workflowAgentBackend: "claude"`."
 *   EAT-R322 (3) "workflow_validate's SCRIPT_SYNTAX diagnostic carries the same line/column."
 *
 * Claims, each over exactly the cases it names. THE CLAIMS BLOCK is every line after this paragraph's last line, up to the next
 * blank comment line; R0 holds that block line for line, the registered cases and the src comments to the rows of ROWS:
 * workflow_execute refuses each SYNTAX_CASES shape, saved as a meta-valid script definition, in both hostModes with error code definition-syntax-invalid and the shape's line and column, launching nothing; the registered tool refuses the line-6 shape the same way and persists or notifies nothing (R323-E1, R323-E2).
 * SubagentWorkflow refuses each SYNTAX_CASES shape before scheduling: the reply names the shape's line and column and carries no task id, and no run script or notification follows (R323-W1).
 * The SubagentWorkflow reply, the workflow_execute reason and the describer show the R323-D1 fixture only in the shared sanitizer's display form: its ESC sequence, right-to-left override and zero-width space do not survive, and its Bearer-shaped fake value reads [REDACTED] (R323-D1).
 * The launch check compiles a body with the worker's own wrapper line, prelude, filename and lineOffset, locates each SYNTAX_CASES shape at its line and column, agrees with the worker on the two shapes run through it, and never runs the body (R323-S1, R323-S2, R323-S3).
 * For each SYNTAX_CASES shape, the designer's SCRIPT_SYNTAX diagnostic and the workflow_validate reply item that buildWorkflowValidateReply makes from it carry the shape's line and column, and for the line-6 shape the registered workflow_validate and workflow_execute name the same location (R322-V1, R322-V2).
 * A ReferenceError on require, process, fetch or setTimeout, a dynamic import and an import statement end with the no-Node-APIs hint; a ReferenceError on undefinedThing, a TypeError and a thrown Error quoting "require is not defined" do not; and node() on a host without a capability registry names workbench.workflowAgentBackend: "claude" (R322-H1, R322-H2, R322-H3).
 *
 * THE CENSUS, R0: registered last, at file scope, outside the describe that holds the twelve pinned cases. R0 reads the cases from
 * vitest's collected task tree (task.file.tasks), never from this file's text. It finds itself by task identity as the last
 * registered test, and every other registered test must be exactly one pinned case (by its title's leading case id), in run mode,
 * not inverted, and run (pass or fail) before R0. A pinned case given a skip option, skipped at run time through its test context,
 * wrapped in a comment, deleted (a title spelled inside a string registers nothing), inverted with the fails option, or held in a
 * describe that is skipped (by its skip option or by skipIf(true)) therefore reds R0. R0 also holds the frozen shape of ROWS (rule
 * 16); the claims block to the row sentences, line for line and in order, so a line added to the block, dropped from it or changed
 * in it reds R0 whatever the line ends with; the header lines that end in a case citation and a period to the row sentences as
 * well; the case ids the header names outside the claims block to the five the REACHED sentence below names, in its order; each
 * sentence to its pins; and the src comments of the seven touched modules to exactly the pinned set (the anchor outside this
 * file's literals). The file-end judge (afterAll) reds unless R0 ran to its last statement, so R0 skipped at collection or at run
 * time, inverted with a hollow body, returning before its end marker or deleted reds the file whenever another case of it runs.
 * Run this file whole: R0 judges the run of every case, so a run filtered by name reds R0 or the file-end judge by design.
 * SYNTAX_CASES (rule 16 frozen shape and each-liveness): R0 holds the table's six shapes (each id with its line:column and pastEnd) to
 * a frozen literal and to the receipt's one rendered SYNTAX_CASES list item (docs/workbench/receipts/wb-9btr.md, the anchor outside
 * this file). R0 reads the receipt through marked's lexer, the reading of test/workbench-receipts-convention.test.ts: the receipt
 * must lex with no html token anywhere (block, inline or nested), since raw HTML, a comment included, can hide a line from the
 * rendered page while the raw text still holds it, and exactly one of its list items may begin "SYNTAX_CASES ". R0 also
 * holds REACHED: R323-S1, R323-E1, R323-W1 and R322-V2 each record every shape, in table order, and R323-S3 its two, after the last
 * assertion each makes for that shape.
 * THE RUN PIN, test/workflow-script-syntax-refusal.census.ts (census tier): it reads the gate's own test report and reds unless the
 * report records this file once, passed, with exactly its 13 titles under their describe paths, each passed. That covers the one
 * mode no case here can see: every registration of this file skipped at collection, when vitest runs no case and no hook of it. R0
 * holds the run pin's bytes (sha256), so the run pin is never edited or deleted alone.
 *
 * Scope sentences (no residual, no follow-up):
 * What a case asserts is NOT CLAIMED by the census: a case hollowed while it still registers, runs and passes stays green there (the delivery note's mutant battery measures the bodies).
 * A SYNTAX_CASES row's source text is NOT CLAIMED by the census: R0 freezes each row's id, line:column and pastEnd, so a source rewritten to another mistake that keeps all three and V8's message stays green; the ids describe the sources as written.
 * Header prose outside the claims block that names no case id is NOT CLAIMED by the census: outside that block R0 reads only the lines that end in a case citation and a period, and the case ids named.
 * A retry option on a case is NOT CLAIMED by this census.
 * The run pin reads only the default test tier's report in the complete gate's census step; a targeted run of this file, and an edit that takes the run pin out of the census tier together with a skip of every registration here, are NOT CLAIMED by this file.
 * EAT-R322 criterion 1 (a workflow.js location on every runtime error text) is NOT CLAIMED by this file.
 * The other launch paths (workflow_detached's launch action, the --subagents-workflow-file flag, a nested workflow() child, a resume) are NOT CLAIMED by this file.
 * The NODE_API_GLOBALS names beyond require, process, fetch and setTimeout, the compile check's import.meta hint, workflow_execute on a source whose meta does not extract, and the designer's SCRIPT_SYNTAX message display are NOT CLAIMED by this file (the receipt describes them under What changed).
 * EAT-R321, EAT-R324, EAT-R325, EAT-R326 and EAT-R327 are NOT CLAIMED by this file.
 */
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { Lexer, type Token, type Tokens } from "marked";
import { afterAll, afterEach, describe, expect, it, type RunnerTask, vi } from "vitest";
import subagentsExtension from "../src/index.js";
import { sessionTaskDir } from "../src/output-file.js";
import { validateWorkflowSource, type WorkflowSource } from "../src/workbench/designer.js";
import { EXECUTE_GRANT } from "../src/workbench/execute.js";
import { createWorkflowExecuteTool, DETACH_GRANT, type WorkflowExecuteDeps } from "../src/workbench/execute-tool.js";
import { WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../src/workbench/identity.js";
import type { NativeRef } from "../src/workbench/observation.js";
import { buildWorkflowValidateReply, VALIDATE_REPLY_GRANT } from "../src/workbench/validate-reply.js";
import { describeWorkflowSyntaxFault, extractMeta, NO_NODE_API_HINT, workflowSyntaxFault } from "../src/workflow/meta.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";
import { WORKER_SOURCE, workflowProgramText } from "../src/workflow/worker-source.js";
import { ctx, hermeticDir, makePi } from "./helpers/boot-extension.js";

const SELF = readFileSync(fileURLToPath(import.meta.url), "utf8");
const HEADER = SELF.slice(0, SELF.indexOf("\nimport "));
/** The one header line that ends with this opens THE CLAIMS BLOCK. */
const CLAIMS_ANCHOR = " to the rows of ROWS:";
/**
 * THE CLAIMS BLOCK as a slice of the header (refusal #2, U1): the comment lines after the one line that ends CLAIMS_ANCHOR, up to
 * the next blank comment line, each with its " * " prefix removed; outside holds every other header line. A missing or repeated
 * anchor, or no blank line after it, reads as one refusal line and an empty outside, so the block never reads as empty and passes.
 */
function claimsBlock(lines: readonly string[]): { readonly block: readonly string[]; readonly outside: readonly string[] } {
  const anchors = lines.flatMap((line, index) => (line.endsWith(CLAIMS_ANCHOR) ? [index] : []));
  if (anchors.length !== 1) return { block: [`the header holds ${anchors.length} lines ending "${CLAIMS_ANCHOR}", not one`], outside: [] };
  const end = lines.findIndex((line, index) => index > anchors[0] && line === " *");
  if (end === -1) return { block: ["no blank comment line closes the claims block"], outside: [] };
  return { block: lines.slice(anchors[0] + 1, end).map(line => line.replace(/^ \* /, "")), outside: [...lines.slice(0, anchors[0] + 1), ...lines.slice(end)] };
}

/** The repository root: R0 reads the src modules whose comments cite these cases. */
const ROOT = fileURLToPath(new URL("..", import.meta.url));
interface CensusRow {
  readonly id: string;
  readonly sentence: string;
  readonly pins: readonly string[];
}
/** The census rows: each claim sentence of the header, verbatim, and the cases it pins. R0 holds the header, this file's case titles and the src citations to them. */
const ROWS: readonly CensusRow[] = [
  {
    id: "EAT-R323(1)",
    sentence: "workflow_execute refuses each SYNTAX_CASES shape, saved as a meta-valid script definition, in both hostModes with error code definition-syntax-invalid and the shape's line and column, launching nothing; the registered tool refuses the line-6 shape the same way and persists or notifies nothing (R323-E1, R323-E2).",
    pins: ["R323-E1", "R323-E2"],
  },
  {
    id: "EAT-R323(2)",
    sentence: "SubagentWorkflow refuses each SYNTAX_CASES shape before scheduling: the reply names the shape's line and column and carries no task id, and no run script or notification follows (R323-W1).",
    pins: ["R323-W1"],
  },
  {
    id: "display",
    sentence: "The SubagentWorkflow reply, the workflow_execute reason and the describer show the R323-D1 fixture only in the shared sanitizer's display form: its ESC sequence, right-to-left override and zero-width space do not survive, and its Bearer-shaped fake value reads [REDACTED] (R323-D1).",
    pins: ["R323-D1"],
  },
  {
    id: "EAT-R323(3)",
    sentence: "The launch check compiles a body with the worker's own wrapper line, prelude, filename and lineOffset, locates each SYNTAX_CASES shape at its line and column, agrees with the worker on the two shapes run through it, and never runs the body (R323-S1, R323-S2, R323-S3).",
    pins: ["R323-S1", "R323-S2", "R323-S3"],
  },
  {
    id: "EAT-R322(3)",
    sentence: "For each SYNTAX_CASES shape, the designer's SCRIPT_SYNTAX diagnostic and the workflow_validate reply item that buildWorkflowValidateReply makes from it carry the shape's line and column, and for the line-6 shape the registered workflow_validate and workflow_execute name the same location (R322-V1, R322-V2).",
    pins: ["R322-V1", "R322-V2"],
  },
  {
    id: "EAT-R322(2)",
    sentence: 'A ReferenceError on require, process, fetch or setTimeout, a dynamic import and an import statement end with the no-Node-APIs hint; a ReferenceError on undefinedThing, a TypeError and a thrown Error quoting "require is not defined" do not; and node() on a host without a capability registry names workbench.workflowAgentBackend: "claude" (R322-H1, R322-H2, R322-H3).',
    pins: ["R322-H1", "R322-H2", "R322-H3"],
  },
];
/** The src modules whose comments cite the cases that pin them: the census's anchor outside its own literals. */
const CITING_SRC: readonly string[] = [
  "src/workflow/meta.ts",
  "src/workflow/worker-source.ts",
  "src/workflow/runtime.ts",
  "src/workbench/execute-tool.ts",
  "src/workbench/designer.ts",
  "src/workbench/validate-reply.ts",
  "src/index.ts",
];
/** A case id as the header, the titles and the src comments spell it. */
const CASE_ID = /\bR32[23]-[A-Z]\d\b/g;

const META = 'export const meta = { name: "broken", description: "does not compile on line 6" };';
/** Line 6 is the faulty line: V8 stops at the `;` of `(a + b;`, column 17. */
const BROKEN = [META, "const a = 1;", "const b = 2;", "const c = 3;", "const d = 4;", "const e = (a + b;", "return e;", ""].join("\n");
const VALID = 'export const meta = { name: "valid", description: "adds one" };\nreturn { sum: ((args && args.n) || 0) + 1 };\n';
/** The location both launch tools and workflow_validate name for BROKEN. */
const BROKEN_AT = { line: 6, column: 17 };

/** The runnable body of a script, as the launch tools hand it to the check: its meta keyword blanked, every offset kept. */
const body = (source: string): string => extractMeta(source).body;
const script = (...lines: string[]): string => [META, ...lines].join("\n");
const TAB = String.fromCodePoint(0x09);
const ESC = String.fromCodePoint(0x1b);
const RLO = String.fromCodePoint(0x202e);
const ZWSP = String.fromCodePoint(0x200b);
/** Obviously fake (rule 3): a Bearer-shaped value the shared sanitizer must show as [REDACTED]. */
const FAKE = "wb9btr-obviously-fake-credential-value";

interface SyntaxCase {
  readonly id: string;
  readonly source: string;
  readonly message: string;
  readonly line: number;
  readonly column: number;
  readonly pastEnd?: true;
}
/** The script-runtime probe's syntax mistakes (probes/execute/script-runtime.probe.test.ts), plus the prelude and end-of-script shapes. */
const SYNTAX_CASES: readonly SyntaxCase[] = [
  { id: "missing paren on line 6", source: BROKEN, message: "Unexpected token ';'", line: 6, column: 17 },
  { id: "TS annotation on line 4", source: script("const a = 1;", "const b = 2;", "const files: string[] = [];", "return a + b;"), message: "Missing initializer in const declaration", line: 4, column: 7 },
  { id: "import statement on line 2", source: script('import fs from "node:fs";', "return 1;"), message: `Cannot use import statement outside a module ${NO_NODE_API_HINT}`, line: 2, column: 1 },
  { id: "Date redeclared over the prelude", source: script("const Date = 1;", "return 1;"), message: "Identifier 'Date' has already been declared", line: 2, column: 7 },
  { id: "tab-indented line 3", source: script("const ok = 1;", `${TAB}${TAB}const x = (1;`), message: "Unexpected token ';'", line: 3, column: 15 },
  { id: "block left open", source: script("if (args) {", "return 1;"), message: "Unexpected token ')'", line: 4, column: 2, pastEnd: true },
];
/** The cases whose claim covers every SYNTAX_CASES shape (R323-S3 runs two of the shapes through the worker). */
const EACH_SHAPE_CASES: readonly string[] = ["R323-S1", "R323-E1", "R323-W1", "R322-V2"];
/** Each-liveness over SYNTAX_CASES: `${caseId}:${shape id}`, pushed by a case after its last assertion for that shape; R0 holds it. */
const REACHED: string[] = [];
const reachedBy = (caseId: string): string[] => REACHED.filter(entry => entry.startsWith(`${caseId}:`)).map(entry => entry.slice(caseId.length + 1));
/** A shape as R0 freezes it and the receipt lists it: id@line:column, with +pastEnd for the end-of-script shape. */
const shapeOf = (c: SyntaxCase): string => `${c.id}@${c.line}:${c.column}${c.pastEnd ? "+pastEnd" : ""}`;
const RECEIPT = "docs/workbench/receipts/wb-9btr.md";
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isListItem = (token: Token): token is Tokens.ListItem => token.type === "list_item";
/** Every token of a lexed page, block, inline and nested, list items included (the walk of htmlTokens in test/workbench-receipts-convention.test.ts). */
function lexed(tokens: readonly Token[]): Token[] {
  const found: Token[] = [];
  for (const token of tokens) {
    found.push(token);
    if (isList(token)) for (const item of token.items) found.push(item, ...lexed(item.tokens));
    else if ("tokens" in token && Array.isArray(token.tokens)) found.push(...lexed(token.tokens));
  }
  return found;
}
/**
 * SYNTAX_CASES's anchor outside this file, read as the page renders (refusal #2, U2): the receipt lexed by marked with no html token
 * anywhere, then its one list item that begins "SYNTAX_CASES ", each shape spelled `<id>` <line>:<column>, then pastEnd where it applies.
 */
function receiptShapes(): string[] {
  const tokens = lexed(new Lexer({ gfm: true }).lex(readFileSync(join(ROOT, RECEIPT), "utf8")));
  const html = tokens.filter(token => token.type === "html");
  if (html.length > 0) return [`${RECEIPT} holds ${html.length} html token(s), which can hide a line from the rendered page: ${JSON.stringify(html[0].raw.slice(0, 80))}`];
  const items = tokens.filter(isListItem).filter(item => item.text.startsWith("SYNTAX_CASES "));
  if (items.length !== 1) return [`${RECEIPT} renders ${items.length} SYNTAX_CASES list items, not one`];
  return [...items[0].text.matchAll(/`([^`]+)` (\d+):(\d+)( pastEnd)?/g)].map(match => `${match[1]}@${match[2]}:${match[3]}${match[4] ? "+pastEnd" : ""}`);
}
/** The census-tier run pin, this file's anchor for a skip of every registration here at once; R0 holds its bytes. */
const RUN_PIN = "test/workflow-script-syntax-refusal.census.ts";
const RUN_PIN_SHA256 = "c933e0fc1c91ca2ff89c52bfb82e0754bbcafab8285b4a35982f586941684e92";
/** R0's last statement records it here, and the file-end judge holds it. */
const CENSUS_END: string[] = [];

/** A test as vitest's collected task tree holds it; self marks R0. */
interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every test of a collected task tree, in registration order (the walk of test/workbench-h2-identity-reuse-census.test.ts). */
function registered(tasks: readonly RunnerTask[], self: RunnerTask): Registered[] {
  const walked: Registered[] = [];
  for (const child of tasks) {
    if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === self });
    else if (child.type === "suite") walked.push(...registered(child.tasks, self));
  }
  return walked;
}
/** In run mode, not inverted, and run (pass or fail) before R0 reads it. */
const ranInRunMode = (entry: Registered): boolean => entry.mode === "run" && !entry.fails && (entry.state === "pass" || entry.state === "fail");
const modeLine = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${entry.state ?? "no result"}`;

/** A stub host for runWorkflow: no agent is ever wanted by these scripts, and none offers node(). */
function stubHost(): WorkflowHost {
  return {
    async spawnAgent(request) {
      return { ok: true, text: `ok:${request.label}`, outputTokens: 1 };
    },
    abortAgent() {},
    async resumeAgent() {
      return { ok: true, text: "resumed", outputTokens: 1 };
    },
    async runGate() {
      return { ok: true, output: "" };
    },
    loadWorkflow() {
      return { ok: false, message: "no saved workflows here" };
    },
  };
}

type ExecuteReply = Record<string, unknown> & {
  ok: boolean;
  status: string;
  error?: { code: string; message: string; line?: number; column?: number };
  nativeRefs: NativeRef[];
};

let sandbox: ReturnType<typeof hermeticDir> | undefined;
afterEach(() => {
  sandbox?.restore();
  sandbox = undefined;
  vi.restoreAllMocks();
});

/** Boots the REAL extension in Workbench mode with every grant the two launch tools and the designer need. */
async function boot(files: Record<string, string>) {
  sandbox = hermeticDir({
    settings: { workflowsEnabled: true, workbench: { workflowAgentBackend: "claude", capabilityGrants: ["workbench:design", "workbench:observe", EXECUTE_GRANT, DETACH_GRANT, "claude:invoke"] } },
  });
  const cwd = sandbox.dir;
  for (const [rel, content] of Object.entries(files)) {
    const path = join(cwd, rel);
    mkdirSync(join(path, ".."), { recursive: true });
    writeFileSync(path, content);
  }
  const booted = makePi();
  subagentsExtension(booted.pi);
  const context = ctx({ cwd });
  await booted.lifecycle.get("session_start")?.({}, context);
  const call = async (tool: string, params: Record<string, unknown>) => {
    const result = await booted.tools.get(tool).execute(`call-${tool}`, params, undefined, undefined, context);
    const text: string = result.content[0]?.type === "text" ? result.content[0].text : "";
    return { text, details: result.details as { taskId?: string } | undefined };
  };
  const catalogDefinition = async (name: string): Promise<Record<string, string>> => {
    const { text } = await call("workflow_catalog", {});
    const entries = (JSON.parse(text) as { entries: { name: string; definition: Record<string, string> }[] }).entries;
    const found = entries.find(entry => entry.name === name);
    if (found === undefined) throw new Error(`catalog lists no ${name}`);
    return found.definition;
  };
  /** The run scripts this session persisted: every launch writes <runId>.workflow.js before it is scheduled. */
  const persisted = (): string[] => readdirSync(sessionTaskDir(cwd, "s1")).filter(name => name.endsWith(".workflow.js"));
  const notifications = (): number => booted.pi.sendMessage.mock.calls.length;
  return { booted, call, catalogDefinition, persisted, notifications };
}
const settle = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
/** Waits for a notification or the deadline, whichever comes first. */
async function notifiedWithin(read: () => number, before: number, ms: number): Promise<boolean> {
  for (let waited = 0; waited < ms; waited += 25) {
    if (read() > before) return true;
    await settle(25);
  }
  return read() > before;
}

/** workflow_execute over injected launchers: the shell's own checks, nothing booted. */
function executeHarness(source: string) {
  const digest = `sha256:${"ab".repeat(32)}`;
  const saved: WorkflowSource = Object.freeze({
    definition: Object.freeze({ kind: "script" as const, id: "/ws/.pi/workflows/broken.js", schemaVersion: WORKFLOW_SCRIPT_SCHEMA_VERSION, artifactDigest: digest }),
    sourceRef: "/ws/.pi/workflows/broken.js",
    source,
  });
  const launchEmbedded = vi.fn(async (_ctx: ExtensionContext, launch: { invocationId: string }): Promise<readonly NativeRef[]> => [{ provider: "pi-workflow", type: "task", id: launch.invocationId }]);
  const launchDetached = vi.fn(async (_ctx: ExtensionContext, launch: { invocationId: string }): Promise<readonly NativeRef[]> => [{ provider: "local-detached", type: "invocation", id: launch.invocationId }]);
  const deps: WorkflowExecuteDeps = {
    grants: () => [EXECUTE_GRANT, DETACH_GRANT],
    observerScope: () => ({ workspace: "/ws", principal: "local-operator:1000:s1" }),
    localPrincipal: () => "local-operator:1000:s1",
    sessionIdOf: () => "s1",
    mintInvocationId: () => "wf_abcdef123456",
    resolveSource: () => saved,
    launchEmbedded,
    launchDetached,
  };
  const tool = createWorkflowExecuteTool(deps);
  const run = async (hostMode: string): Promise<ExecuteReply> => {
    const result = await tool.execute("call-1", { definitionRef: saved.definition, input: {}, hostMode } as never, undefined, undefined, { cwd: "/ws" } as never);
    const text = result.content[0]?.type === "text" ? result.content[0].text : "";
    return JSON.parse(text) as ExecuteReply;
  };
  return { run, launchEmbedded, launchDetached };
}

describe("wb-9btr EAT-R323 + EAT-R322 (2)(3): a script that does not compile is refused at launch, located, and hinted", () => {
  it("R323-S1 the check locates each probed syntax mistake at the author's line and column and names it in the workflow.js:<line>:<column> form", () => {
    for (const c of SYNTAX_CASES) {
      const fault = workflowSyntaxFault(body(c.source));
      expect(fault, c.id).toEqual({ message: c.message, line: c.line, column: c.column, ...(c.pastEnd ? { pastEnd: true } : {}) });
      if (fault === undefined) continue;
      const described = describeWorkflowSyntaxFault(fault);
      expect(described.startsWith(`workflow.js:${c.line}:${c.column}`), c.id).toBe(true);
      expect(described.endsWith(`: ${c.message}`), c.id).toBe(true);
      expect(described.includes("past the last line"), c.id).toBe(c.pastEnd === true);
      REACHED.push(`R323-S1:${c.id}`);
    }
    expect(workflowSyntaxFault(body(VALID)), "a script that compiles has no fault").toBeUndefined();
    expect(workflowSyntaxFault(body(script("const ok = 1;", "return ok;"))), "a second compiling script has no fault").toBeUndefined();
  });

  it("R323-S2 the check never runs the body: a host-global write and an endless loop stay unexecuted", () => {
    const marker = "__wb9btrSyntaxCheckRan";
    const host = globalThis as Record<string, unknown>;
    expect(host[marker]).toBeUndefined();
    expect(workflowSyntaxFault(body(script(`globalThis.${marker} = true;`, "while (true) {}", "return 1;")))).toBeUndefined();
    expect(host[marker], "a compile-only check leaves the host realm untouched").toBeUndefined();
    expect(workflowSyntaxFault(body(script(`globalThis.${marker} = true;`, "const e = (1;")))?.line).toBe(3);
    expect(host[marker]).toBeUndefined();
  });

  it("R323-S3 the check compiles the program the worker compiles: the same wrapper line, prelude and offset, and the same verdicts", async () => {
    const sample = body(BROKEN);
    expect(workflowProgramText(sample).endsWith(`\n${sample}\n})()`)).toBe(true);
    expect(WORKER_SOURCE, "the worker builds its program from the same pieces").toContain('new vm.Script("(async () => {" + PRELUDE + "\\n" + workerData.body + "\\n})()", {');
    expect(WORKER_SOURCE).toContain('filename: "workflow.js"');
    expect(WORKER_SOURCE).toContain("lineOffset: -1");
    expect(workflowProgramText(sample).startsWith("(async () => {const Date = (function () {")).toBe(true);
    for (const c of SYNTAX_CASES.filter(row => row.id === "Date redeclared over the prelude" || row.id === "missing paren on line 6")) {
      const run = await runWorkflow({ script: c.source, host: stubHost() });
      expect(run.status, c.id).toBe("failed");
      expect(run.error, `${c.id}: the worker refuses with the message the check reports`).toBe(workflowSyntaxFault(body(c.source))?.message);
      REACHED.push(`R323-S3:${c.id}`);
    }
    const compiled = await runWorkflow({ script: VALID, args: { n: 1 }, host: stubHost() });
    expect(compiled.status).toBe("completed");
    expect(compiled.value).toEqual({ sum: 2 });
  });

  it("R323-E1 workflow_execute refuses with definition-syntax-invalid and the location in both hostModes; neither launcher runs, and a compiling definition still launches", async () => {
    for (const c of SYNTAX_CASES) {
      const shape = executeHarness(c.source);
      for (const hostMode of ["embedded", "detached"]) {
        const reply = await shape.run(hostMode);
        expect(reply, `${c.id}, ${hostMode}`).toMatchObject({ ok: false, status: "refused", nativeRefs: [] });
        expect(reply.error, `${c.id}, ${hostMode}`).toMatchObject({ code: "definition-syntax-invalid", line: c.line, column: c.column });
        expect(reply.error?.message, `${c.id}, ${hostMode}`).toContain(`workflow.js:${c.line}:${c.column}`);
      }
      expect(shape.launchEmbedded, c.id).not.toHaveBeenCalled();
      expect(shape.launchDetached, c.id).not.toHaveBeenCalled();
      REACHED.push(`R323-E1:${c.id}`);
    }
    const broken = executeHarness(BROKEN);
    for (const hostMode of ["embedded", "detached"]) {
      const reply = await broken.run(hostMode);
      expect(reply, hostMode).toMatchObject({ ok: false, invoked: false, status: "refused", completion: "not-asserted", nativeRefs: [] });
      expect(reply.error, hostMode).toMatchObject({ code: "definition-syntax-invalid", line: BROKEN_AT.line, column: BROKEN_AT.column });
      expect(reply.error?.message, hostMode).toContain("workflow.js:6:17: Unexpected token ';'");
      expect(reply, hostMode).not.toHaveProperty("invocationId");
    }
    expect(broken.launchEmbedded).not.toHaveBeenCalled();
    expect(broken.launchDetached).not.toHaveBeenCalled();
    const valid = executeHarness(VALID);
    const launched = await valid.run("embedded");
    expect(launched).toMatchObject({ ok: true, status: "launched" });
    expect(launched).not.toHaveProperty("error");
    expect(valid.launchEmbedded).toHaveBeenCalledTimes(1);
  });

  it("R323-E2 the registered workflow_execute refuses the saved broken definition synchronously: no run is persisted or notified", async () => {
    const h = await boot({ ".pi/workflows/broken.js": BROKEN, ".pi/workflows/valid.js": VALID });
    const before = h.notifications();
    const refused = JSON.parse((await h.call("workflow_execute", { definitionRef: await h.catalogDefinition("broken"), input: {}, hostMode: "embedded" })).text) as ExecuteReply;
    expect(refused).toMatchObject({ ok: false, status: "refused" });
    expect(refused.error).toMatchObject({ code: "definition-syntax-invalid", line: BROKEN_AT.line, column: BROKEN_AT.column });
    expect(h.persisted(), "no run script was written for a refused launch").toEqual([]);
    expect(await notifiedWithin(h.notifications, before, 1000), "no background run reports back").toBe(false);
    const launched = JSON.parse((await h.call("workflow_execute", { definitionRef: await h.catalogDefinition("valid"), input: { n: 1 }, hostMode: "embedded" })).text) as ExecuteReply;
    expect(launched).toMatchObject({ ok: true, status: "launched" });
    expect(h.persisted(), "the compiling definition is persisted and scheduled").toHaveLength(1);
    expect(await notifiedWithin(h.notifications, before, 30_000), "the compiling definition's run reports back").toBe(true);
  }, 90_000);

  it("R323-W1 the registered SubagentWorkflow refuses the broken script with its location before scheduling, and a compiling script still starts", async () => {
    const h = await boot({});
    const before = h.notifications();
    for (const c of SYNTAX_CASES) {
      const shape = await h.call("SubagentWorkflow", { script: c.source });
      expect(shape.details?.taskId, c.id).toBeUndefined();
      expect(shape.text, c.id).toContain(`workflow.js:${c.line}:${c.column}`);
      REACHED.push(`R323-W1:${c.id}`);
    }
    const refused = await h.call("SubagentWorkflow", { script: BROKEN });
    expect(refused.details?.taskId, "launchedInBackground:false").toBeUndefined();
    expect(refused.text).toContain("workflow.js:6:17: Unexpected token ';'");
    expect(refused.text).not.toContain("started in the background");
    expect(h.persisted(), "no run script was written for a refused launch").toEqual([]);
    expect(await notifiedWithin(h.notifications, before, 1000), "no background run reports back").toBe(false);
    const started = await h.call("SubagentWorkflow", { script: VALID });
    expect(started.details?.taskId).toMatch(/^wf_/);
    expect(started.text).toContain("started in the background");
  }, 90_000);

  it("R323-D1 both refusal texts carry the author's meta name and V8's message only through the shared sanitizer's display form", async () => {
    const hostile = [`export const meta = { name: "${ESC}[31mred${ESC}[0m ${RLO}evil${ZWSP}name", description: "d" };`, `const r = /(?<a>x)(?<a>y) Bearer ${FAKE}/;`, "return r;"].join("\n");
    const fault = workflowSyntaxFault(body(hostile));
    expect(fault).toMatchObject({ line: 2, column: 11 });
    expect(fault?.message, "the fault itself is V8's raw message; display is the describer's and the tools' job").toContain(FAKE);
    const described = fault === undefined ? "" : describeWorkflowSyntaxFault(fault);
    const executed = (await executeHarness(hostile).run("embedded")).error?.message ?? "";
    const h = await boot({});
    const refused = (await h.call("SubagentWorkflow", { script: hostile })).text;
    expect(refused).toContain("red evilname");
    for (const [where, text] of [["describeWorkflowSyntaxFault", described], ["workflow_execute error.message", executed], ["SubagentWorkflow reply", refused]] as const) {
      expect(text, where).toContain("workflow.js:2:11: Invalid regular expression");
      expect(text, where).toContain("(?<a>x)(?<a>y) [REDACTED]");
      for (const unit of [ESC, RLO, ZWSP, FAKE]) expect(text.includes(unit), `${where} shows ${JSON.stringify(unit)}`).toBe(false);
    }
  }, 90_000);

  it("R322-V1 the registered workflow_validate locates the broken saved source where workflow_execute's refusal does", async () => {
    const h = await boot({ ".pi/workflows/broken.js": BROKEN });
    const validated = JSON.parse((await h.call("workflow_validate", { name: "broken" })).text) as { status: string; errors: { code: string; line?: number; column?: number }[] };
    expect(validated.status).toBe("invalid");
    const syntax = validated.errors.find(item => item.code === "SCRIPT_SYNTAX");
    expect(syntax).toMatchObject({ line: BROKEN_AT.line, column: BROKEN_AT.column });
    const refused = JSON.parse((await h.call("workflow_execute", { definitionRef: await h.catalogDefinition("broken"), input: {}, hostMode: "embedded" })).text) as ExecuteReply;
    expect({ line: refused.error?.line, column: refused.error?.column }).toEqual({ line: syntax?.line, column: syntax?.column });
  }, 90_000);

  it("R322-V2 for every syntax case, the designer's SCRIPT_SYNTAX diagnostic carries the check's line, column and message, and the workflow_validate reply item buildWorkflowValidateReply makes from it carries the line and column", () => {
    for (const c of SYNTAX_CASES) {
      const artifactDigest = `sha256:${createHash("sha256").update(c.source, "utf8").digest("hex")}`;
      const saved: WorkflowSource = { definition: { kind: "script", id: "/ws/case.js", schemaVersion: WORKFLOW_SCRIPT_SCHEMA_VERSION, artifactDigest }, sourceRef: "/ws/case.js", source: c.source };
      const diagnostic = validateWorkflowSource(saved).diagnostics.find(item => item.code === "SCRIPT_SYNTAX");
      expect(diagnostic, c.id).toMatchObject({ line: c.line, column: c.column, message: c.message });
      const { reply } = buildWorkflowValidateReply({ request: { sourceRef: saved.sourceRef, digest: artifactDigest }, source: saved, grants: [VALIDATE_REPLY_GRANT] });
      expect(reply.status, `${c.id}: the reply`).toBe("invalid");
      const errors = reply.status === "refused" ? [] : reply.errors;
      expect(errors.find(item => item.code === "SCRIPT_SYNTAX"), `${c.id}: the reply item`).toMatchObject({ scope: "diagnostic", line: c.line, column: c.column });
      REACHED.push(`R322-V2:${c.id}`);
    }
  });

  it("R322-H1 a ReferenceError on require, process, fetch or setTimeout, a dynamic import and an import statement end with the no-Node-APIs hint", async () => {
    const mistakes: readonly [string, string][] = [
      ["require", 'const fs = require("fs");'],
      ["process", "return process.env.HOME;"],
      ["fetch", 'await fetch("https://example.invalid/");'],
      ["setTimeout", "await new Promise(resolve => setTimeout(resolve, 10));"],
      ["dynamic import", 'await import("node:fs");'],
      ["import statement", 'import fs from "node:fs";'],
    ];
    for (const [what, line] of mistakes) {
      const run = await runWorkflow({ script: script(line, "return 1;"), host: stubHost() });
      expect(run.status, what).toBe("failed");
      expect(run.error?.endsWith(` ${NO_NODE_API_HINT}`), `${what}: ${run.error}`).toBe(true);
    }
    expect(NO_NODE_API_HINT).toMatch(/require.*import.*process.*fetch.*timers/);
  });

  it("R322-H2 a ReferenceError on another name, a TypeError and a thrown Error quoting the Node wording carry no hint", async () => {
    const quiet: readonly [string, string][] = [
      ["undefinedThing", "return 1 + undefinedThing;"],
      ["TypeError", "return args.items.map(x => x);"],
      ["thrown text", 'throw new Error("require is not defined");'],
    ];
    for (const [what, line] of quiet) {
      const run = await runWorkflow({ script: script(line), host: stubHost() });
      expect(run.status, what).toBe("failed");
      expect(run.error, what).not.toContain(NO_NODE_API_HINT);
    }
  });

  it("R322-H3 node() on a host without a capability registry names workbench.workflowAgentBackend: \"claude\"", async () => {
    const run = await runWorkflow({ script: script('return await node("forge.gate.status", { target: "/x" });'), host: stubHost() });
    expect(run.status).toBe("failed");
    expect(run.error).toContain("This workflow host has no capability registry.");
    expect(run.error).toContain('workbench.workflowAgentBackend: "claude"');
  });
});

// R0 sits at file scope, registered last and outside the describe, so a skip that reaches every pinned case still leaves R0 to read it.
it("R0 census over ROWS, registered last at file scope: the header's claims block is exactly the row sentences, each row pins its cases, the src comments cite exactly that set, every other test vitest registered here is one pinned case that ran before R0 in run mode and not inverted, SYNTAX_CASES holds the six shapes the receipt's rendered SYNTAX_CASES item lists and every each-shape case reached them, and the run pin's bytes are held", ({ task }) => {
  expect(ROWS.map(row => `${row.id}:${row.pins.length}`), "frozen shape (rule 16)").toEqual(["EAT-R323(1):2", "EAT-R323(2):1", "display:1", "EAT-R323(3):3", "EAT-R322(3):2", "EAT-R322(2):3"]);
  // THE CLAIMS BLOCK, slice-equal (refusal #2, U1): a line added to it, dropped from it or changed in it reds here, whatever it ends with.
  const header = claimsBlock(HEADER.split("\n"));
  expect(header.block, "the claims block (the header lines after the one ending 'to the rows of ROWS:', up to the next blank comment line) is exactly the row sentences, line for line, in order").toEqual(ROWS.map(row => row.sentence));
  const claimLines = HEADER.split("\n").map(line => line.replace(/^ \* /, "")).filter(line => /\((?:R32[23]-[A-Z]\d, )*R32[23]-[A-Z]\d\)\.$/.test(line));
  expect(claimLines, "the header lines that end in a case citation and a period are exactly the row sentences, in order").toEqual(ROWS.map(row => row.sentence));
  expect(header.outside.flatMap(line => line.match(CASE_ID) ?? []), "outside the claims block the header names only the REACHED sentence's case ids, in its order").toEqual([...EACH_SHAPE_CASES, "R323-S3"]);
  for (const row of ROWS) expect(/\(([^()]+)\)\.$/.exec(row.sentence)?.[1].split(", "), `${row.id}'s sentence cites exactly its pins`).toEqual([...row.pins]);
  const pinned = ROWS.flatMap(row => row.pins).sort();
  const cited = new Set(CITING_SRC.flatMap(path => readFileSync(join(ROOT, path), "utf8").match(CASE_ID) ?? []));
  expect([...cited].sort(), "the src comments cite exactly the pinned cases, so a case taken out of every literal here still reds").toEqual(pinned);
  // The registered cases, read from vitest's collected task tree, never from this file's text (refusal #1, U1).
  const walked = registered(task.file.tasks, task);
  expect(walked.findIndex(entry => entry.self), "R0 finds itself by task identity, registered last").toBe(walked.length - 1);
  const others = walked.filter(entry => !entry.self);
  expect(others.map(entry => /^(R32[23]-[A-Z]\d) /.exec(entry.name)?.[1] ?? `not a pinned case: ${entry.name}`).sort(), "every other registered test is one pinned case, and each pinned case is registered exactly once").toEqual(pinned);
  expect(others.filter(entry => !ranInRunMode(entry)).map(modeLine), "every pinned case is in run mode, not inverted, and ran before R0").toEqual([]);
  // SYNTAX_CASES: the frozen shape and the receipt's line (refusal #1, U2), then each-liveness over the table.
  const shapes = SYNTAX_CASES.map(shapeOf);
  expect(shapes, "SYNTAX_CASES's frozen shape (rule 16): six shapes, each id with its line:column, the last past the end").toEqual(["missing paren on line 6@6:17", "TS annotation on line 4@4:7", "import statement on line 2@2:1", "Date redeclared over the prelude@2:7", "tab-indented line 3@3:15", "block left open@4:2+pastEnd"]);
  expect(receiptShapes(), "the receipt, lexed with no html token, renders one SYNTAX_CASES list item, and it lists exactly these shapes, the table's anchor outside this file").toEqual(shapes);
  const ids = SYNTAX_CASES.map(c => c.id);
  expect(Object.fromEntries(EACH_SHAPE_CASES.map(id => [id, reachedBy(id)])), "each case claiming every SYNTAX_CASES shape reached every one, in table order, after its last assertion for it").toEqual(Object.fromEntries(EACH_SHAPE_CASES.map(id => [id, ids])));
  expect(reachedBy("R323-S3"), "R323-S3 reached the two shapes it runs through the worker").toEqual(["missing paren on line 6", "Date redeclared over the prelude"]);
  expect(createHash("sha256").update(readFileSync(join(ROOT, RUN_PIN))).digest("hex"), "the run pin's bytes, so it is never edited or deleted alone").toBe(RUN_PIN_SHA256);
  CENSUS_END.push("R0");
});

// The file-end judge: R0 ran to its last statement.
afterAll(() => {
  expect(CENSUS_END, "R0 ran to its last statement (a red R0 reds here too; R0 skipped at collection or at run time, inverted with a hollow body, returning before its end marker or deleted reds only here)").toEqual(["R0"]);
});
