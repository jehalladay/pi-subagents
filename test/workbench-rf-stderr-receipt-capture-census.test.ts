/**
 * wb-jwc.7 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7, program-triage-2026-10-17), the rf stderr receipt-capture census: the
 * until-then leg of a gated requirement, and the standing negative guard on the noncommitted preview it names.
 * Statement: STATEMENT below, the export description's STATEMENT line verbatim (the export title truncates it). Acceptance:
 * ACCEPTANCE below, the description's three ACCEPTANCE items verbatim. A1 holds both to the export.
 *
 * MEASURED (read-only, by the cutting seat ws-06, run g10-work-s123, 2026-10-28, at base bb96515).
 * Pi: src launches rf at one site, nativeReactiveFiberRender's spawn("rf", renderArgv(...)) in
 * src/workbench/providers/reactivefiber.ts. Both input arms' argv end --no-commit --no-input --json and both rf descriptors
 * register effectClass read, so no committing rf invocation path exists; wb-x32 (W10 provider/interop, the R5 gate) is open.
 * The launch's stderr listener reads chunk.length only. Its custody block (stop() through the 60 s deadline timer) and its
 * stderr listener are byte-identical to the lines the acceptance names at 9df9a03 (providers/reactivefiber.ts:88-98 and
 * :107-110; sha256 c6179224ccc14e25 and 3cb22ed8c20977cf over the 11 and the 4 lines). The runtime journals nativeRefs for a
 * live non-read node only from its settled output (src/workflow/runtime.ts: nativeRefOf(nativeEvidence(...)) on the ok row);
 * a node that throws is journaled ok false with none.
 * rf: the installed rf 0.1.845 (rf --json --version: 80 leaves, operation.show and context.show served_reachable), driven in a
 * scratch workspace. A committing context render (no --no-commit) wrote one stderr line before its first stdout byte at default
 * verbosity, `render_id=rfr_<26> transaction_id=rft_<26>`: key=value text, not JSON, and no operation_id. Under -v every log
 * line carries the operation id as a `[rfo_<26>]` prefix, from the first line (about 1 s before the commit). The --no-commit
 * preview wrote nothing on stderr. `rf operation show <rfo_>` read {state committed, render_id, transaction_id, commit_seq, ...}
 * and `rf context show <rfr_>` read the committed receipt carrying operation_id. So the rf side of the gate artifact (a
 * resolvable receipt id) is met on this host, in that shape, and the Pi side (a committing rf capability) is not.
 *
 * CASES. One test per pin, titled by the clause it answers; each pin measures a witness held to WITNESS, and the closing case
 * holds the reached record to ROWS. A pin is UNTIL-THEN (its witness changes when Pi gains a committing rf path, and its failure
 * names the acceptance as owed) or STANDING (it holds today and must keep holding).
 *  capture (ACCEPTANCE[0]). C1 UNTIL-THEN: src's rf launch sites (an AST read: a spawn/exec-family call whose program is "rf",
 *    spelled or same-file const-bound) are the preview's one, and both input arms' recorded argv carry --no-commit: no
 *    committing invocation exists to drive. C2 UNTIL-THEN: the acceptance's own scenario run through Pi's one rf launch,
 *    journaled as a committing (write-class) node by a test host: a stand-in rf writes the receipt line on stderr (the
 *    acceptance's JSON form and the two measured rf 0.1.845 forms) before any stdout byte, then exceeds the deadline; the run
 *    fails transport and neither of its two journal rows carries a nativeRef or any rf id. The same readers find the stdout
 *    envelope's reference on a settled run (the live control): today a journaled rf reference comes only from stdout, after
 *    settlement. C3 UNTIL-THEN: when the deadline SIGTERM lands, the journal holds the dispatched row alone, with no rf id:
 *    nothing is captured before the kill sequence.
 *  reconcile (ACCEPTANCE[1]). R1 UNTIL-THEN: the resume of that killed journal refuses uncertain-effect naming the producer and
 *    no rf id (none was captured), and RECONCILE_EVIDENCE_READS.reactivefiber offers the preview alone, no operation-id read.
 *    R2 STANDING: across the killed run and its resume the stand-in records exactly one spawn and the host one node call, and
 *    the resume replays and reconciles nothing.
 *  preview-guard (ACCEPTANCE[2]). G1 STANDING: the clause's own line ranges (88-98, 107-110) give the custody block's and the
 *    stderr listener's lengths; both are located in today's src by their first line and equal the 9df9a03 text byte for byte;
 *    the custody sits in nativeReactiveFiberRender, which nativeReactiveFiberPreview delegates to; and for each kill the
 *    statement names (deadline/overflow, escalating after the statement's "SIGTERM-SIGKILL(500 ms)") the preview's custody runs
 *    under fake timers against a stand-in that ignores SIGTERM: no SIGTERM before the trigger, SIGTERM at it, alive 1 ms before
 *    the escalation, closed at it, and the typed transport error. G2 STANDING: the listener reads chunk.length only, the
 *    preview reading under all three receipt forms on stderr is exactly {contract, source, workspaceRoot} carrying the stdout
 *    ids alone, and neither kill's error names an rf id.
 * T2: each reader whose today value is empty or a single site finds its plant in planted inputs, so a hollowed reader reds.
 * A1 the outside anchors: the export's STATEMENT line and ACCEPTANCE list are this file's, each row's pins are exactly its
 * export item's clauses (cut mechanically at ", then ", ", and " and a spaced dash), the SURFACES line is this file's, and
 * G1's ranges, escalation and kills come from the export's own text.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, WITNESS's keys are exactly the pins, and
 * every reading of READINGS is pinned exactly once (a pin swapped onto another pin's reading reds).
 * NOT CLAIMED: C2, C3, R1 and R2 drive Pi's noncommitted launch under a test host's write class because Pi has no committing
 * one; they show what the runtime journals today, not how a future committing provider spells its argv or its capture. The
 * AST readers see a launch whose program is a literal or a same-file const string, not one routed through another binding.
 * OWED (by the cut that builds the committing render, once wb-x32 resolves to one): the acceptance itself. The measured rf
 * 0.1.845 shape bears on it: the default-verbosity receipt line carries render_id and transaction_id, not operation_id, so a
 * capture either reads the -v `[rfo_...]` prefix or reconciles the rfr_ id through rf context show. That cut lands red here
 * first: C1 (a committing launch), C2 and C3 (a captured reference), R1 (an id named, or an operation-id read added).
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch as the only PATH entry, run by this
 * process's node; src and the tracker export are only read.
 */
import { chmodSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { delimiter, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it, vi } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { nativeReactiveFiberPreview, nativeReactiveFiberRender, type ReactiveFiberRenderSelector } from "../src/workbench/providers/reactivefiber.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { runWorkflow, type WorkflowHost, type WorkflowRunResult } from "../src/workflow/runtime.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-jwc.7";
const EXPORT = ".beads/issues.jsonl";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const RUNTIME = "src/workflow/runtime.ts";
const TITLE_ID = "[RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7]";
const DASH = "\u2014";
/** The bead's statement: the export description's STATEMENT line after its label, verbatim (A1). */
const STATEMENT = `The committing rf invocation path shall capture and journal the stderr receipt line's operation_id before any deadline/overflow kill, and shall never SIGKILL a committing render without a subsequent operation-id reconcile; the no-commit preview's stderr discard and SIGTERM-SIGKILL(500 ms) custody remain byte-unchanged. Gate artifact: a committing rf capability in Pi (wb-x32, the R5 gate) plus a resolvable receipt id ${DASH} rf operation show (FOC-06-c/rfc-mq7k6.15) or context history/show carrying operation_id (FOC-06-e/rfc-mq7k6.26); the producer's stderr receipt line itself is already on rf main at the pin (STORE-TXN-A27, FOC/BEADS-2026-10-16.md:100@8a8b83e4d).`;
/** The bead's acceptance: the export description's three ACCEPTANCE items, verbatim (A1). */
const ACCEPTANCE: readonly string[] = [
  "A unit test drives the committing invocation with a fake child writing the JSON receipt line on stderr before any stdout byte, then exceeding the deadline: asserts the journal row carries nativeRefs [{provider: reactivefiber, type: operation, id: rfo_...}] parsed from that line, and that capture precedes the kill sequence.",
  `After a deadline kill with a captured id, the follow-up is an operation-id reconcile (or a typed uncertain-effect naming the id) ${DASH} asserted: no silent retry, no second spawn.`,
  `Negative guard: nativeReactiveFiberPreview (providers/reactivefiber.ts:88-98,107-110@9df9a03) is unchanged for the preview leaf ${DASH} stderr still only counted, no receipt parsing added to the read-only path.`,
];
/** The surfaces the export's SURFACES line names (A1). */
const SURFACES = "src/workbench/providers/reactivefiber.ts:88-98,107-110@9df9a03, src/workflow/runtime.ts:1581-1585@9df9a03";

/** An acceptance item's clauses: the item cut at ", then ", ", and " and the spaced dash, mechanically. */
function clausesOf(item: string): string[] {
  return item.split(new RegExp(`, then |, and | ${DASH} `));
}
function clauseOf(item: string | undefined, index: number): string {
  const clause = item === undefined ? undefined : clausesOf(item)[index];
  if (clause === undefined) throw new Error(`acceptance clause ${index} is absent`);
  return clause;
}
/** The line ranges a clause cites for the provider (`providers/reactivefiber.ts:88-98,107-110@...`), as [first, last] pairs. */
function rangesOf(clause: string): Array<readonly [number, number]> {
  const cited = /providers\/reactivefiber\.ts:([0-9,-]+)@/.exec(clause)?.[1] ?? "";
  return cited
    .split(",")
    .map((range) => range.split("-").map(Number))
    .filter((pair): pair is [number, number] => pair.length === 2 && pair.every(Number.isSafeInteger))
    .map(([first, last]) => [first, last] as const);
}
/** The kills the statement names (`before any deadline/overflow kill`). */
function killKindsOf(statement: string): string[] {
  return (/before any ([a-z]+(?:\/[a-z]+)*) kill/.exec(statement)?.[1] ?? "").split("/").filter((kind) => kind !== "");
}
/** The escalation the statement names (`SIGTERM-SIGKILL(500 ms)`), in ms. */
function escalationOf(statement: string): number {
  return Number(/SIGTERM-SIGKILL\(([0-9]+) ms\)/.exec(statement)?.[1] ?? Number.NaN);
}

/** The custody block (stop() through the deadline timer) at 9df9a03, providers/reactivefiber.ts:88-98, verbatim. */
const CUSTODY_AT_PIN: readonly string[] = [
  '  const stop=(reason:"deadline"|"stdout"|"stderr"|null)=>{',
  "    if(reason!==null && stopReason===null) stopReason=reason;",
  "    if(settled||child.exitCode!==null||child.signalCode!==null) return;",
  '    child.kill("SIGTERM");',
  "    escalation??=setTimeout(()=>{",
  '      if(child.exitCode===null&&child.signalCode===null) child.kill("SIGKILL");',
  "    },500);",
  "  };",
  "  const onAbort=()=>stop(null);",
  '  signal?.addEventListener("abort",onAbort,{once:true});',
  '  const timer=setTimeout(()=>stop("deadline"),60_000);',
];
/** The stderr listener at 9df9a03, providers/reactivefiber.ts:107-110, verbatim. */
const STDERR_AT_PIN: readonly string[] = [
  '      child.stderr.on("data",(chunk:Buffer)=>{',
  "        stderrBytes+=chunk.length;",
  '        if(stderrBytes>MAX_BYTES) stop("stderr");',
  "      });",
];
/** The preview's execution deadline (the custody block's timer, measured), in ms. */
const DEADLINE_MS = 60_000;
const ESCALATION_MS = escalationOf(STATEMENT);
/** More stderr than the preview's 256 KiB bound, so the overflow kill fires. */
const OVERFLOW_BYTES = 300_000;
/** The real-time bound on any wait for the stand-in (it runs under real time while the provider's timers are fake). */
const WAIT_MS = 30_000;
/** How long a check for an absent signal waits in real time before reading the stand-in's marker. */
const QUIET_MS = 250;
const realSetTimeout = globalThis.setTimeout;
const realClearTimeout = globalThis.clearTimeout;

/** An obviously fake rf id of the kind given, padded to the 26 characters rf mints. */
function rfId(kind: "rfo" | "rfr" | "rft" | "rfw", word: string): string {
  return `${kind}_${word.padEnd(26, "0")}`;
}
const STDERR_OPERATION = rfId("rfo", "stderrreceipt");
const STDERR_RENDER = rfId("rfr", "stderrreceipt");
const STDERR_TRANSACTION = rfId("rft", "stderrreceipt");
const STDOUT_OPERATION = rfId("rfo", "stdoutenvelope");
const WORKSPACE_ID = rfId("rfw", "scratchworkspace");
/** A committing render's stderr receipt line, in each form: the acceptance's JSON line, then rf 0.1.845's default and -v forms. */
const RECEIPT_LINES: readonly string[] = [
  JSON.stringify({ operation_id: STDERR_OPERATION, render_id: STDERR_RENDER, transaction_id: STDERR_TRANSACTION }),
  `render_id=${STDERR_RENDER} transaction_id=${STDERR_TRANSACTION}`,
  `[${STDERR_OPERATION}] INFO invocation command=context.render`,
];
/** Every rf id a text spells, sorted and unique. */
function rfIdsIn(text: string): string[] {
  return [...new Set(text.match(/rf[a-z]_[0-9a-z]{22,32}/g) ?? [])].sort();
}

type Arm = "legacy" | "view";
const SELECTORS: Readonly<Record<Arm, ReactiveFiberRenderSelector>> = {
  legacy: { model: "model", task: "task" },
  view: { view: "view", taskId: "wb-task", model: "model" },
};
/** The arms whose recorded argv carries no --no-commit: a committing invocation. */
function committingArms(argvs: Readonly<Partial<Record<Arm, readonly string[]>>>): string[] {
  return Object.entries(argvs)
    .filter(([, argv]) => argv !== undefined && !argv.includes("--no-commit"))
    .map(([arm]) => arm)
    .sort();
}

/* ------------------------------------------------------------------ *
 * src readers (TypeScript AST)
 * ------------------------------------------------------------------ */

interface SourceText {
  readonly path: string;
  readonly text: string;
}
function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? sourceFiles(join(dir, entry.name))
      : entry.isFile() && entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts")
        ? [join(dir, entry.name)]
        : [],
  );
}
function srcTree(): SourceText[] {
  return sourceFiles(join(REPO, "src"))
    .map((file) => ({ path: relative(REPO, file).split("\\").join("/"), text: readFileSync(file, "utf8") }))
    .sort((a, b) => a.path.localeCompare(b.path));
}
function visit(node: ts.Node, visitor: (node: ts.Node) => void): void {
  visitor(node);
  ts.forEachChild(node, (child) => visit(child, visitor));
}
function parsed(file: SourceText): ts.SourceFile {
  return ts.createSourceFile(file.path, file.text, ts.ScriptTarget.Latest, true);
}
/** The process launchers a child of rf would come from. */
const LAUNCHERS: ReadonlySet<string> = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "fork", "exec", "execSync"]);
const SHELL_LAUNCHERS: ReadonlySet<string> = new Set(["exec", "execSync"]);
const LISTENS: ReadonlySet<string> = new Set(["on", "once", "addListener", "prependListener", "prependOnceListener"]);
/** Every same-file `const NAME = "text"` binding. */
function constStrings(source: ts.SourceFile): Map<string, string> {
  const found = new Map<string, string>();
  visit(source, (node) => {
    if (!ts.isVariableDeclarationList(node) || (node.flags & ts.NodeFlags.Const) === 0) return;
    for (const declaration of node.declarations) {
      const value = declaration.initializer;
      if (ts.isIdentifier(declaration.name) && value !== undefined && (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)))
        found.set(declaration.name.text, value.text);
    }
  });
  return found;
}
function stringOf(expression: ts.Expression | undefined, consts: ReadonlyMap<string, string>): string | undefined {
  if (expression === undefined) return undefined;
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
  return ts.isIdentifier(expression) ? consts.get(expression.text) : undefined;
}
function calleeName(expression: ts.Expression): string | undefined {
  if (ts.isIdentifier(expression)) return expression.text;
  return ts.isPropertyAccessExpression(expression) ? expression.name.text : undefined;
}
function launchesRf(call: ts.CallExpression, consts: ReadonlyMap<string, string>): boolean {
  const name = calleeName(call.expression);
  if (name === undefined || !LAUNCHERS.has(name)) return false;
  const program = stringOf(call.arguments[0], consts);
  if (program === undefined) return false;
  return SHELL_LAUNCHERS.has(name) ? /^rf(?:\s|$)/.test(program) : program === "rf";
}
/** The declaration a node sits in: the nearest function or method declaration, else the module-level binding of a function. */
function declarationOf(node: ts.Node): { readonly name: string; readonly body: ts.Node } {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if ((ts.isFunctionDeclaration(at) || ts.isMethodDeclaration(at)) && at.name !== undefined && ts.isIdentifier(at.name))
      return { name: at.name.text, body: at };
    if (
      (ts.isArrowFunction(at) || ts.isFunctionExpression(at)) &&
      ts.isVariableDeclaration(at.parent) &&
      ts.isIdentifier(at.parent.name) &&
      ts.isVariableStatement(at.parent.parent.parent) &&
      ts.isSourceFile(at.parent.parent.parent.parent)
    )
      return { name: at.parent.name.text, body: at };
  }
  return { name: "<module>", body: node.getSourceFile() };
}
/** Every rf launch in the files, as `path:declaration`, one entry per launch. */
function launchSites(files: readonly SourceText[]): string[] {
  return files.flatMap((file) => {
    const source = parsed(file);
    const consts = constStrings(source);
    const sites: string[] = [];
    visit(source, (node) => {
      if (ts.isCallExpression(node) && launchesRf(node, consts)) sites.push(`${file.path}:${declarationOf(node).name}`);
    });
    return sites;
  });
}
/**
 * What the declarations that launch rf read of a child's stderr: for a data listener, each use of its chunk parameter
 * (`chunk.length`, or the bare name when the chunk itself is handed on); for any other stderr use, `stderr.<member>` or the
 * bare `stderr`. Sorted and unique.
 */
function stderrUses(files: readonly SourceText[]): string[] {
  const uses = new Set<string>();
  for (const file of files) {
    const source = parsed(file);
    const consts = constStrings(source);
    const scopes = new Set<ts.Node>();
    visit(source, (node) => {
      if (ts.isCallExpression(node) && launchesRf(node, consts)) scopes.add(declarationOf(node).body);
    });
    for (const scope of scopes)
      visit(scope, (node) => {
        if (!ts.isPropertyAccessExpression(node) || node.name.text !== "stderr") return;
        const member = node.parent;
        if (!ts.isPropertyAccessExpression(member) || member.expression !== node) {
          uses.add("stderr");
          return;
        }
        const call = member.parent;
        const listener =
          ts.isCallExpression(call) && call.expression === member && LISTENS.has(member.name.text) && stringOf(call.arguments[0], consts) === "data"
            ? call.arguments[1]
            : undefined;
        if (listener === undefined || !(ts.isArrowFunction(listener) || ts.isFunctionExpression(listener))) {
          uses.add(`stderr.${member.name.text}`);
          return;
        }
        const chunk = listener.parameters[0]?.name;
        if (chunk === undefined || !ts.isIdentifier(chunk)) {
          uses.add("stderr data listener without a named chunk");
          return;
        }
        visit(listener.body, (inner) => {
          if (!ts.isIdentifier(inner) || inner.text !== chunk.text) return;
          const parent = inner.parent;
          if (ts.isPropertyAccessExpression(parent) && parent.name === inner) return;
          uses.add(ts.isPropertyAccessExpression(parent) && parent.expression === inner ? `${chunk.text}.${parent.name.text}` : chunk.text);
        });
      });
  }
  return [...uses].sort();
}
/** The declaration holding the custody's SIGKILL escalation (a `const stop` arrow calling kill("SIGKILL")), per provider file. */
function custodyHolders(file: SourceText): string[] {
  const holders: string[] = [];
  visit(parsed(file), (node) => {
    if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name) || node.name.text !== "stop" || node.initializer === undefined) return;
    let escalates = false;
    visit(node.initializer, (inner) => {
      if (ts.isCallExpression(inner) && calleeName(inner.expression) === "kill" && stringOf(inner.arguments[0], new Map()) === "SIGKILL") escalates = true;
    });
    if (escalates) holders.push(declarationOf(node).name);
  });
  return holders;
}
/** The functions a declaration of the file calls, by name. */
function callsOf(file: SourceText, declaration: string): string[] {
  const calls: string[] = [];
  visit(parsed(file), (node) => {
    if (!ts.isFunctionDeclaration(node) || node.name?.text !== declaration || node.body === undefined) return;
    visit(node.body, (inner) => {
      if (ts.isCallExpression(inner)) {
        const name = calleeName(inner.expression);
        if (name !== undefined) calls.push(name);
      }
    });
  });
  return calls;
}
/** The block a first line opens in the file's lines, `length` lines long; none when the first line is not found. */
function blockAt(text: string, first: string, length: number): string[] {
  const lines = text.split("\n");
  const at = lines.indexOf(first);
  return at < 0 ? [] : lines.slice(at, at + length);
}

/* ------------------------------------------------------------------ *
 * The stand-in rf and the scenarios it drives
 * ------------------------------------------------------------------ */

type Mode = "settle" | "hang" | "overflow";
/** A preview envelope the provider admits, for the given workspace root; its rf ids are STDOUT_OPERATION and WORKSPACE_ID. */
function envelopeFor(root: string): Record<string, JsonValue> {
  return {
    schema: "reactive-fiber.cli/v1",
    ok: true,
    command: "context.render",
    operation_id: STDOUT_OPERATION,
    workspace: { id: WORKSPACE_ID, root },
    transaction_id: null,
    result: {
      ephemeral: true,
      render_id: null,
      output: { text: "context" },
      provenance: { graph_revision_id: `sha256:${"a".repeat(64)}` },
      budget: { formula_terms: { context_window: 1000000, output_reserve: 8192, occupied_tokens: 0, overhead: 0, safety_margin: 2048, available_context_tokens: 989760 } },
      diagnostics_summary: { errors: 0, warnings: 0, has_errors: false, has_warnings: false },
      work: { source_capture_count: 0, fiber_signal_count: 0, component_render_count: 0, lens_resolution_count: 0, necessity_eval_count: 0, storage_write_count: 0 },
    },
    diagnostics: [],
  };
}
interface StandIn {
  /** The scratch directory: the only PATH entry, and the workspace root the scenarios pass. */
  readonly dir: string;
  /** Every recorded spawn's argv, in order. */
  spawns(): string[][];
  /** The pid of the latest spawn once it wrote its receipt lines (and, in overflow mode, its overflow). */
  pid(): number | undefined;
  /** Whether the stand-in has received SIGTERM (it ignores it). */
  termed(): boolean;
}
/**
 * A stand-in rf, run by this process's node: it records its argv, ignores SIGTERM (marking it), writes RECEIPT_LINES on
 * stderr before any stdout byte, then settles with the envelope, hangs, or overflows stderr and hangs.
 */
function standIn(mode: Mode): StandIn {
  const dir = makeScratch("rf-receipt-capture-");
  const log = join(dir, "spawns.jsonl");
  const ready = join(dir, "ready");
  const term = join(dir, "term");
  const body = [
    'const fs = require("node:fs");',
    `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
    `process.on("SIGTERM", () => fs.writeFileSync(${JSON.stringify(term)}, "term"));`,
    `process.stderr.write(${JSON.stringify(RECEIPT_LINES.map((line) => `${line}\n`).join(""))});`,
    mode === "overflow" ? `process.stderr.write("x".repeat(${OVERFLOW_BYTES}));` : "",
    `fs.writeFileSync(${JSON.stringify(ready)}, String(process.pid));`,
    mode === "settle" ? `process.stdout.write(${JSON.stringify(JSON.stringify(envelopeFor(dir)))});` : "setInterval(() => {}, 1000);",
  ].join("\n");
  writeFileSync(join(dir, "rf"), `#!${process.execPath}\n${body}\n`);
  chmodSync(join(dir, "rf"), 0o700);
  return {
    dir,
    spawns: () =>
      existsSync(log)
        ? readFileSync(log, "utf8")
            .split("\n")
            .filter((line) => line !== "")
            .map((line): string[] => {
              const argv: unknown = JSON.parse(line);
              return Array.isArray(argv) ? argv.map(String) : [];
            })
        : [],
    pid: () => (existsSync(ready) ? Number(readFileSync(ready, "utf8")) : undefined),
    termed: () => existsSync(term),
  };
}
const oldPath = process.env.PATH;
/** Run a scenario with the stand-in as the only PATH entry; restore PATH and real timers, reap the stand-in, remove scratch. */
async function withStandIn<T>(mode: Mode, scenario: (rf: StandIn) => Promise<T>): Promise<T> {
  const rf = standIn(mode);
  process.env.PATH = rf.dir;
  try {
    return await scenario(rf);
  } finally {
    vi.useRealTimers();
    process.env.PATH = oldPath;
    const pid = rf.pid();
    if (pid !== undefined && alive(pid)) process.kill(pid, "SIGKILL");
    removeScratch(rf.dir);
  }
}
function alive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => realSetTimeout(resolve, ms));
}
/** Wait in real time until the check holds or WAIT_MS passes; whether it held. */
async function until(check: () => boolean): Promise<boolean> {
  const end = performance.now() + WAIT_MS;
  while (!check()) {
    if (performance.now() > end) return false;
    await sleep(10);
  }
  return true;
}
type Outcome<T> = { readonly state: "fulfilled"; readonly value: T } | { readonly state: "rejected"; readonly reason: unknown } | { readonly state: "open" };
/** How a promise settles within WAIT_MS of real time, or that it stayed open. */
async function settleOf<T>(promise: Promise<T>): Promise<Outcome<T>> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const open = new Promise<Outcome<T>>((resolve) => {
    timer = realSetTimeout(() => resolve({ state: "open" }), WAIT_MS);
  });
  try {
    return await Promise.race([
      promise.then(
        (value): Outcome<T> => ({ state: "fulfilled", value }),
        (reason: unknown): Outcome<T> => ({ state: "rejected", reason }),
      ),
      open,
    ]);
  } finally {
    if (timer !== undefined) realClearTimeout(timer);
  }
}
/** A settled provider call as `category: message`, or the state it ended in. */
function outcomeText(outcome: Outcome<unknown>): string {
  if (outcome.state !== "rejected") return outcome.state;
  const reason = outcome.reason;
  const category = typeof reason === "object" && reason !== null && "category" in reason ? String(reason.category) : "untyped";
  return `${category}: ${reason instanceof Error ? reason.message : String(reason)}`;
}
function fakeTimers(): void {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
}

interface KillReading {
  /** The custody's observable steps, from the trigger to the typed error. */
  readonly sequence: readonly string[];
  /** The rf ids the typed error's text spells. */
  readonly errorIds: readonly string[];
}
/**
 * The preview's custody under one kill, against a hanging stand-in that ignores SIGTERM, with the provider's timers fake: a
 * deadline kill advances to the deadline; an overflow kill is triggered by the stand-in's stderr, at fake time 0.
 */
async function killReading(kind: string): Promise<KillReading> {
  if (kind !== "deadline" && kind !== "overflow") return { sequence: [`no scenario for the ${kind} kill`], errorIds: [] };
  return withStandIn(kind === "deadline" ? "hang" : "overflow", async (rf) => {
    fakeTimers();
    const reading = nativeReactiveFiberPreview("model", "task", rf.dir);
    const sequence: string[] = [];
    let at = 0;
    if (kind === "deadline") {
      if (!(await until(() => rf.pid() !== undefined))) return { sequence: ["the stand-in never started"], errorIds: [] };
      vi.advanceTimersByTime(DEADLINE_MS - 1);
      await sleep(QUIET_MS);
      sequence.push(rf.termed() ? `SIGTERM before ${DEADLINE_MS} ms` : `no SIGTERM at ${DEADLINE_MS - 1} ms`);
      vi.advanceTimersByTime(1);
      at = DEADLINE_MS;
    }
    sequence.push((await until(rf.termed)) ? `SIGTERM at ${at} ms` : `no SIGTERM at ${at} ms`);
    const pid = rf.pid();
    vi.advanceTimersByTime(ESCALATION_MS - 1);
    await sleep(QUIET_MS);
    sequence.push(pid !== undefined && alive(pid) ? `alive at ${at + ESCALATION_MS - 1} ms` : `gone by ${at + ESCALATION_MS - 1} ms`);
    vi.advanceTimersByTime(1);
    const outcome = await settleOf(reading);
    sequence.push(outcome.state === "open" ? `open at ${at + ESCALATION_MS} ms` : `closed at ${at + ESCALATION_MS} ms`);
    const text = outcomeText(outcome);
    sequence.push(text);
    return { sequence, errorIds: rfIdsIn(text) };
  });
}
const kills = new Map<string, Promise<KillReading>>();
function killOf(kind: string): Promise<KillReading> {
  const known = kills.get(kind);
  if (known !== undefined) return known;
  const fresh = killReading(kind);
  kills.set(kind, fresh);
  return fresh;
}

const SCRIPT_HEAD = 'export const meta = { name: "rf-receipt-capture", description: "the committing rf scenario, through the one rf launch" };\n';
const SCRIPT = `${SCRIPT_HEAD}return await node("reactivefiber.render.preview", { model: "model", task: "task" });`;
/** A test host that journals Pi's one rf launch as a committing (write-class) node: Pi registers no committing rf capability. */
function committingHost(root: string, calls: { count: number }): WorkflowHost {
  return {
    async spawnAgent() {
      return { ok: false, error: "this census runs no agents" };
    },
    abortAgent() {},
    async callNode(request) {
      calls.count += 1;
      return nativeReactiveFiberRender(SELECTORS.legacy, root, request.signal);
    },
    describeNodeEffect: () => "write",
  };
}
/** The node rows of a journal, each as `dispatched|settled ok=<ok> effect=<class> refs=<count>`. */
function rowShapes(rows: readonly WorkflowJournalEntry[]): string[] {
  return rows
    .filter((row) => row.kind === "node")
    .map((row) => `${row.dispatched === true ? "dispatched" : "settled"} ok=${String(row.ok)} effect=${row.effectClass ?? "none"} refs=${row.nativeRefs?.length ?? 0}`);
}
/** Every nativeRef a journal's rows carry, as `provider/type/id`. */
function journalRefs(rows: readonly WorkflowJournalEntry[]): string[] {
  return rows.flatMap((row) => (row.nativeRefs ?? []).map((ref) => `${ref.provider}/${ref.type}/${ref.id}`));
}
function copyRows(rows: readonly WorkflowJournalEntry[]): WorkflowJournalEntry[] {
  return rows.map((row) => structuredClone(row));
}
interface KilledRun {
  readonly run: Outcome<WorkflowRunResult>;
  /** The journal when the deadline SIGTERM landed. */
  readonly atSigterm: readonly WorkflowJournalEntry[];
  readonly rows: readonly WorkflowJournalEntry[];
  readonly resume: WorkflowRunResult;
  readonly spawns: number;
  readonly nodeCalls: number;
}
/** The acceptance's scenario through the runtime: receipt lines on stderr, then the deadline; then a resume of that journal. */
function killedRunReading(): Promise<KilledRun> {
  return withStandIn("hang", async (rf) => {
    const rows: WorkflowJournalEntry[] = [];
    const calls = { count: 0 };
    const host = committingHost(rf.dir, calls);
    fakeTimers();
    const pending = runWorkflow({ script: SCRIPT, host, journal: { entries: rows, append: (row: WorkflowJournalEntry) => rows.push(row) } });
    const started = await until(() => rf.pid() !== undefined);
    vi.advanceTimersByTime(DEADLINE_MS);
    const termed = started && (await until(rf.termed));
    const atSigterm = termed ? copyRows(rows) : [];
    vi.advanceTimersByTime(ESCALATION_MS);
    const run = await settleOf(pending);
    vi.useRealTimers();
    const resume = await runWorkflow({ script: SCRIPT, host, journal: { entries: copyRows(rows) } });
    return { run, atSigterm, rows: copyRows(rows), resume, spawns: rf.spawns().length, nodeCalls: calls.count };
  });
}
let killed: Promise<KilledRun> | undefined;
function killedRun(): Promise<KilledRun> {
  killed ??= killedRunReading();
  return killed;
}
/** The live control: the same scenario settling with the envelope on stdout; the journal it writes. */
function settledRows(): Promise<WorkflowJournalEntry[]> {
  return withStandIn("settle", async (rf) => {
    const rows: WorkflowJournalEntry[] = [];
    const result = await runWorkflow({ script: SCRIPT, host: committingHost(rf.dir, { count: 0 }), journal: { entries: rows, append: (row: WorkflowJournalEntry) => rows.push(row) } });
    return result.status === "completed" ? copyRows(rows) : [];
  });
}
function runText(outcome: Outcome<WorkflowRunResult>): string {
  if (outcome.state !== "fulfilled") return outcome.state;
  const result = outcome.value;
  return `${result.status} ${result.capabilityError?.category ?? "untyped"}: ${result.error ?? ""}`;
}
/** The preview reading for one arm under the receipt lines on stderr, and the argv the stand-in recorded for it. */
function previewOf(arm: Arm): Promise<{ readonly reading: JsonValue | undefined; readonly argv: readonly string[] | undefined }> {
  return withStandIn("settle", async (rf) => {
    const outcome = await settleOf(nativeReactiveFiberRender(SELECTORS[arm], rf.dir));
    return { reading: outcome.state === "fulfilled" ? outcome.value : undefined, argv: rf.spawns()[0] };
  });
}
const previews = new Map<Arm, ReturnType<typeof previewOf>>();
function previewReading(arm: Arm): ReturnType<typeof previewOf> {
  const known = previews.get(arm);
  if (known !== undefined) return known;
  const fresh = previewOf(arm);
  previews.set(arm, fresh);
  return fresh;
}

/* ------------------------------------------------------------------ *
 * The judged rows
 * ------------------------------------------------------------------ */

type PinId = "C1" | "C2" | "C3" | "R1" | "R2" | "G1" | "G2";
type ReadingId = "launches" | "killed-journal" | "journal-at-sigterm" | "resume" | "spawns" | "custody" | "stderr-discard";
/** Every reading a pin measures, by id; FROZEN SHAPE holds each to exactly one pin. */
const READINGS: Readonly<Record<ReadingId, () => Promise<unknown>>> = {
  launches: async () => {
    const argvs: Partial<Record<Arm, readonly string[]>> = {};
    for (const arm of ["legacy", "view"] as const) argvs[arm] = (await previewReading(arm)).argv;
    return {
      launchSites: launchSites(srcTree()),
      recordedArms: Object.entries(argvs)
        .filter(([, argv]) => argv !== undefined)
        .map(([arm]) => arm),
      committingArms: committingArms(argvs),
    };
  },
  "killed-journal": async () => {
    const reading = await killedRun();
    return {
      run: runText(reading.run),
      rows: rowShapes(reading.rows),
      journalRefs: journalRefs(reading.rows),
      journalRfIds: rfIdsIn(JSON.stringify(reading.rows)),
      settledRefs: journalRefs(await settledRows()),
    };
  },
  "journal-at-sigterm": async () => {
    const reading = await killedRun();
    return { atSigterm: rowShapes(reading.atSigterm), rfIdsAtSigterm: rfIdsIn(JSON.stringify(reading.atSigterm)) };
  },
  resume: async () => {
    const { resume } = await killedRun();
    const message = resume.capabilityError?.message ?? resume.error ?? "";
    return {
      resume: `${resume.status} ${resume.capabilityError?.category ?? "untyped"}`,
      producer: /\(producer "([^"]+)"\)/.exec(message)?.[1] ?? "none",
      namedRfIds: rfIdsIn(message),
      reconcileReads: [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])],
    };
  },
  spawns: async () => {
    const reading = await killedRun();
    return {
      spawns: reading.spawns,
      nodeCalls: reading.nodeCalls,
      resumeReplayed: reading.resume.replayedNodeCount,
      resumeReconciled: reading.resume.reconciledNodeCount,
    };
  },
  custody: async () => {
    const provider = { path: PROVIDER, text: readFileSync(join(REPO, PROVIDER), "utf8") };
    const ranges = rangesOf(clauseOf(ACCEPTANCE[2], 0));
    const lengthOf = (range: readonly [number, number] | undefined): number => (range === undefined ? 0 : range[1] - range[0] + 1);
    const sequences: Record<string, readonly string[]> = {};
    for (const kind of killKindsOf(STATEMENT)) sequences[kind] = (await killOf(kind)).sequence;
    return {
      ranges: ranges.map(([first, last]) => `${first}-${last}`),
      custody: blockAt(provider.text, CUSTODY_AT_PIN[0] ?? "", lengthOf(ranges[0])),
      stderrListener: blockAt(provider.text, STDERR_AT_PIN[0] ?? "", lengthOf(ranges[1])),
      custodyHolders: custodyHolders(provider),
      previewCalls: callsOf(provider, "nativeReactiveFiberPreview"),
      kills: sequences,
    };
  },
  "stderr-discard": async () => {
    const { reading } = await previewReading("legacy");
    const errorIds: string[] = [];
    for (const kind of killKindsOf(STATEMENT)) errorIds.push(...(await killOf(kind)).errorIds);
    return {
      stderrUses: stderrUses(srcTree()),
      readingKeys: reading !== null && typeof reading === "object" && !Array.isArray(reading) ? Object.keys(reading).sort() : [],
      readingIds: rfIdsIn(JSON.stringify(reading ?? null)),
      errorIds,
    };
  },
};
interface Pin {
  readonly id: PinId;
  /** The acceptance clause the pin answers (A1 holds each row's clauses to its export item). */
  readonly clause: string;
  /** UNTIL-THEN pins move when Pi gains a committing rf path; STANDING pins hold today and must keep holding. */
  readonly kind: "until-then" | "standing";
  readonly reading: ReadingId;
}
interface Row {
  readonly id: "capture" | "reconcile" | "preview-guard";
  readonly acceptance: 0 | 1 | 2;
  readonly pins: readonly Pin[];
}
const ROWS: readonly Row[] = [
  {
    id: "capture",
    acceptance: 0,
    pins: [
      { id: "C1", clause: clauseOf(ACCEPTANCE[0], 0), kind: "until-then", reading: "launches" },
      { id: "C2", clause: clauseOf(ACCEPTANCE[0], 1), kind: "until-then", reading: "killed-journal" },
      { id: "C3", clause: clauseOf(ACCEPTANCE[0], 2), kind: "until-then", reading: "journal-at-sigterm" },
    ],
  },
  {
    id: "reconcile",
    acceptance: 1,
    pins: [
      { id: "R1", clause: clauseOf(ACCEPTANCE[1], 0), kind: "until-then", reading: "resume" },
      { id: "R2", clause: clauseOf(ACCEPTANCE[1], 1), kind: "standing", reading: "spawns" },
    ],
  },
  {
    id: "preview-guard",
    acceptance: 2,
    pins: [
      { id: "G1", clause: clauseOf(ACCEPTANCE[2], 0), kind: "standing", reading: "custody" },
      { id: "G2", clause: clauseOf(ACCEPTANCE[2], 1), kind: "standing", reading: "stderr-discard" },
    ],
  },
];
const PINS = ROWS.flatMap((row) => row.pins.map((pin) => ({ ...pin, row: row.id, acceptance: row.acceptance })));

/** Each pin's measured witness today (measured at base bb96515 by the cutting seat; the header's MEASURED). */
const WITNESS: Readonly<Record<PinId, unknown>> = {
  C1: {
    launchSites: [`${PROVIDER}:nativeReactiveFiberRender`],
    recordedArms: ["legacy", "view"],
    committingArms: [],
  },
  C2: {
    run: "failed transport: RF preview exceeded the execution deadline.",
    rows: ["dispatched ok=false effect=write refs=0", "settled ok=false effect=write refs=0"],
    journalRefs: [],
    journalRfIds: [],
    settledRefs: [`reactivefiber/operation/${STDOUT_OPERATION}`],
  },
  C3: {
    atSigterm: ["dispatched ok=false effect=write refs=0"],
    rfIdsAtSigterm: [],
  },
  R1: {
    resume: "failed uncertain-effect",
    producer: "reactivefiber",
    namedRfIds: [],
    reconcileReads: ["reactivefiber.render.preview"],
  },
  R2: {
    spawns: 1,
    nodeCalls: 1,
    resumeReplayed: 0,
    resumeReconciled: 0,
  },
  G1: {
    ranges: ["88-98", "107-110"],
    custody: [...CUSTODY_AT_PIN],
    stderrListener: [...STDERR_AT_PIN],
    custodyHolders: ["nativeReactiveFiberRender"],
    previewCalls: ["nativeReactiveFiberRender"],
    kills: {
      deadline: [
        "no SIGTERM at 59999 ms",
        "SIGTERM at 60000 ms",
        "alive at 60499 ms",
        "closed at 60500 ms",
        "transport: RF preview exceeded the execution deadline.",
      ],
      overflow: ["SIGTERM at 0 ms", "alive at 499 ms", "closed at 500 ms", "transport: RF preview exceeded the bounded stderr output size."],
    },
  },
  G2: {
    stderrUses: ["chunk.length"],
    readingKeys: ["contract", "source", "workspaceRoot"],
    readingIds: [STDOUT_OPERATION, WORKSPACE_ID],
    errorIds: [],
  },
};

function owed(pin: (typeof PINS)[number]): string {
  return pin.kind === "until-then"
    ? `UNTIL-THEN (${BEAD} ${pin.id}): Pi's rf invocation path moved on the clause "${pin.clause}". If Pi now has a committing rf capability (wb-x32 resolved to a committing render), the acceptance is owed on landing: ${ACCEPTANCE[pin.acceptance]} If it does not, re-measure the witness and say so.`
    : `STANDING (${BEAD} ${pin.id}): the clause "${pin.clause}" no longer holds. The statement keeps it: ${STATEMENT}`;
}

/** The bead's own export row (title and description only: later store writes change neither). */
function exportRow(): { title: string; description: string } {
  const rows = readFileSync(join(REPO, EXPORT), "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line): unknown => JSON.parse(line));
  const mine = rows.flatMap((row) =>
    typeof row === "object" &&
    row !== null &&
    "id" in row &&
    row.id === BEAD &&
    "title" in row &&
    typeof row.title === "string" &&
    "description" in row &&
    typeof row.description === "string"
      ? [{ title: row.title, description: row.description }]
      : [],
  );
  expect(mine, "the export holds exactly one row for the bead").toHaveLength(1);
  const [row] = mine;
  if (row === undefined) throw new Error("the export holds no row for the bead");
  return row;
}
/** The value of a labelled line of the export description (`LABEL: value`). */
function exportLine(description: string, label: string): string | undefined {
  return description
    .split("\n")
    .find((line) => line.startsWith(`${label}: `))
    ?.slice(label.length + 2);
}
/** The items of the export's ACCEPTANCE list (a single-quoted list; no item holds a single quote). */
function exportItems(description: string): string[] {
  const list = exportLine(description, "ACCEPTANCE") ?? "";
  return [...list.matchAll(/'([^']*)'/g)].map((match) => match[1] ?? "");
}

const reached: PinId[] = [];

describe("wb-jwc.7 rf stderr receipt-capture census (until Pi has a committing rf capability)", () => {
  it("T0: the readings are live: the stand-in is the only PATH entry and runs on this node, src holds the surfaces, the receipt lines spell the stderr ids", async () => {
    const files = srcTree();
    expect(files.map((file) => file.path)).toEqual(expect.arrayContaining([PROVIDER, RUNTIME]));
    const probe = await withStandIn("settle", async (rf) => ({
      path: process.env.PATH?.split(delimiter) ?? [],
      dir: rf.dir,
      shebang: readFileSync(join(rf.dir, "rf"), "utf8").split("\n")[0],
    }));
    expect(probe.path, "the stand-in directory is the only PATH entry").toStrictEqual([probe.dir]);
    expect(probe.shebang, "the stand-in runs on this process's node").toBe(`#!${process.execPath}`);
    expect(STDERR_OPERATION, "the stderr receipt id has the shape the provider admits for an operation id").toMatch(/^rfo_[0-9a-z]{22,32}$/);
    expect(rfIdsIn(RECEIPT_LINES.join("\n")), "the receipt lines spell the three stderr ids").toStrictEqual([STDERR_OPERATION, STDERR_RENDER, STDERR_TRANSACTION]);
  }, 120_000);

  for (const pin of PINS)
    it(`${pin.id} (${pin.row}, ${pin.kind}): ${pin.clause}`, async () => {
      expect(await READINGS[pin.reading](), owed(pin)).toStrictEqual(WITNESS[pin.id]);
      reached.push(pin.id);
    }, 180_000);

  it("T2: each reader whose today value is empty or a single site finds its plant", () => {
    const planted: SourceText = {
      path: "planted.ts",
      text: [
        'import { exec, execFile, spawn } from "node:child_process";',
        'const RF = "rf";',
        "let captured: string | undefined;",
        "export function commitRender(): void {",
        '  const child = spawn(RF, ["context", "render"]);',
        '  child.stderr.on("data", (line: Buffer) => { captured = /rfo_[0-9a-z]+/.exec(line.toString())?.[0]; });',
        '  child.stderr.once("data", (first: Buffer) => consume(first));',
        '  child.stderr.setEncoding("utf8");',
        "  consume({ input: child.stderr });",
        "}",
        "function other(): void {",
        '  execFile("rf", ["operation", "show"]);',
        '  exec("rf context render --json");',
        '  spawn("forge", []);',
        "}",
        "function consume(_value: unknown): void {}",
      ].join("\n"),
    };
    expect(launchSites([planted])).toStrictEqual(["planted.ts:commitRender", "planted.ts:other", "planted.ts:other"]);
    expect(stderrUses([planted])).toStrictEqual(["first", "line.toString", "stderr", "stderr.setEncoding"]);
    expect(committingArms({ legacy: ["context", "render", "--no-commit"], view: ["context", "render", "--view", "v"] })).toStrictEqual(["view"]);
    const capturedRow: WorkflowJournalEntry = {
      kind: "node",
      index: 0,
      key: "k",
      ok: false,
      capabilityId: "reactivefiber.render.preview",
      effectClass: "write",
      nativeRefs: [{ provider: "reactivefiber", type: "operation", id: STDERR_OPERATION }],
    };
    expect(rowShapes([capturedRow])).toStrictEqual(["settled ok=false effect=write refs=1"]);
    expect(journalRefs([capturedRow])).toStrictEqual([`reactivefiber/operation/${STDERR_OPERATION}`]);
    expect(rfIdsIn(JSON.stringify([capturedRow]))).toStrictEqual([STDERR_OPERATION]);
    expect(rfIdsIn(`exceeded the deadline (${STDERR_RENDER})`)).toStrictEqual([STDERR_RENDER]);
    const changed = { path: PROVIDER, text: readFileSync(join(REPO, PROVIDER), "utf8").replace("},500);", "},5000);") };
    expect(blockAt(changed.text, CUSTODY_AT_PIN[0] ?? "", CUSTODY_AT_PIN.length), "a changed escalation reads as a changed block").not.toStrictEqual([...CUSTODY_AT_PIN]);
    expect(rangesOf("providers/reactivefiber.ts:1-2,5-9@x")).toStrictEqual([
      [1, 2],
      [5, 9],
    ]);
    expect(killKindsOf("capture before any deadline/overflow/abort kill")).toStrictEqual(["deadline", "overflow", "abort"]);
  });

  it("A1: the export's statement, acceptance and surfaces are this file's; each row's pins are its export item's clauses; G1's ranges, escalation and kills come from the export", () => {
    const row = exportRow();
    expect(row.title.startsWith(`${TITLE_ID} `), "the export title carries the requirement id").toBe(true);
    expect(row.title.endsWith("..."), "the export title truncates the statement").toBe(true);
    expect(STATEMENT.startsWith(row.title.slice(TITLE_ID.length + 1, -3)), "the export title is the statement's opening").toBe(true);
    expect(exportLine(row.description, "STATEMENT"), "the description's STATEMENT line is the statement").toBe(STATEMENT);
    const items = exportItems(row.description);
    expect(items, "the description's ACCEPTANCE list is this file's").toStrictEqual([...ACCEPTANCE]);
    expect(
      ROWS.map((judged) => judged.acceptance),
      "ROWS judge each export item once, in order",
    ).toStrictEqual(items.map((_item, index) => index));
    for (const judged of ROWS)
      expect(
        judged.pins.map((pin) => pin.clause),
        `${judged.id}: its pins are its export item's clauses, in order`,
      ).toStrictEqual(clausesOf(items[judged.acceptance] ?? ""));
    expect(exportLine(row.description, "SURFACES"), "the SURFACES line is this file's").toBe(SURFACES);
    for (const surface of SURFACES.split(", ")) expect(existsSync(join(REPO, surface.replace(/:.*$/, ""))), surface).toBe(true);
    const guard = clauseOf(items[2], 0);
    expect(
      rangesOf(guard).map(([first, last]) => last - first + 1),
      "the guard clause's ranges are the custody block's and the stderr listener's lengths",
    ).toStrictEqual([CUSTODY_AT_PIN.length, STDERR_AT_PIN.length]);
    const statement = exportLine(row.description, "STATEMENT") ?? "";
    expect(escalationOf(statement), "the escalation comes from the export's statement").toBe(ESCALATION_MS);
    expect(killKindsOf(statement), "the kills G1 runs are the export statement's").toStrictEqual(["deadline", "overflow"]);
    const witnessed = WITNESS.G1;
    const kills = witnessed !== null && typeof witnessed === "object" && "kills" in witnessed ? witnessed.kills : undefined;
    expect(Object.keys(kills !== null && typeof kills === "object" ? kills : {}), "G1's witnessed kills are the statement's").toStrictEqual(killKindsOf(statement));
  });

  it("FROZEN SHAPE (standing rule 16): ROWS' ids and pin counts, WITNESS keyed by exactly the pins, every reading pinned exactly once", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toStrictEqual(["capture:3", "reconcile:2", "preview-guard:2"]);
    expect(Object.keys(WITNESS)).toStrictEqual(PINS.map((pin) => pin.id));
    expect(PINS.map((pin) => pin.reading)).toStrictEqual(Object.keys(READINGS));
  });

  it("closing: every pin's witness compare ran and held, in ROWS order", () => {
    expect(reached, "a pin whose compare did not run or did not hold").toStrictEqual(PINS.map((pin) => pin.id));
  });
});
