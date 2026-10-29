/**
 * wb-jwc.7 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7, program-triage-2026-10-17), the rf stderr receipt-capture census: the
 * until-then leg of a gated requirement, and the standing negative guard on the noncommitted preview it names.
 * Statement: STATEMENT below, the export description's STATEMENT line verbatim (the export title truncates it). Acceptance:
 * ACCEPTANCE below, the description's three ACCEPTANCE items verbatim. A1 holds both to the export.
 * Cut #2, the respin after gate refusal #1: U1 widened C1 from the launch-site list and the census-driven default argv to src's
 * committing-ness itself (the launch inventory, each rf launch's argv, builder and options, its declaration and every reference
 * to it, the rf registrations); U2 widened G2 from <x>.stderr property reads to every reference to the launch's binding and, at
 * run time, every listener on the launched child's stderr. Every claim below is stated at its readers' grain, and each known
 * unread mode is a NAMED RESIDUAL with a pinned quiet row.
 *
 * MEASURED (read-only, by the cutting seat ws-06: run g10-work-s123 on 2026-10-28 at base bb96515; src re-read by run
 * g10-work-s133 on 2026-10-29 at trunk b3d410f).
 * Pi: src makes five child_process launch calls: three execFileSync("git", ...) in src/index.ts, the detached host's
 * spawn(process.execPath, ...) in src/workbench/hosts/local-detached.ts, and one rf launch, nativeReactiveFiberRender's
 * `const child=spawn("rf",argv,{stdio:["ignore","pipe","pipe"],env:...})` in src/workbench/providers/reactivefiber.ts. Its argv
 * is `const argv=renderArgv(selector,workspaceRoot)`, used once; renderArgv's one return lists --no-commit as a literal element;
 * nativeReactiveFiberRender(selector, workspaceRoot, signal) is referenced only by nativeReactiveFiberPreview and the native
 * registration's invoke, each calling it with three arguments; both reactivefiber descriptors src writes are effectClass read.
 * wb-x32 (W10 provider/interop, the R5 gate) is open, so no committing rf invocation path exists. The launch's stderr carries one
 * data listener, which reads chunk.length only. Its custody block (stop() through the 60 s deadline timer) and its stderr
 * listener are byte-identical to the lines the acceptance names at 9df9a03 (providers/reactivefiber.ts:88-98 and :107-110;
 * sha256 c6179224ccc14e25 and 3cb22ed8c20977cf over the 11 and the 4 lines). The runtime journals nativeRefs for a live non-read
 * node only from its settled output (src/workflow/runtime.ts: nativeRefOf(nativeEvidence(...)) on the ok row); a node that throws
 * is journaled ok false with none.
 * rf (measured by run g10-work-s123; cut #2 re-read only `rf --json --version`: 0.1.845, 80 leaves, operation.show,
 * context.show and context.history served_reachable): driven in a scratch workspace, a committing context render (no
 * --no-commit) wrote one stderr line before its first stdout byte at default verbosity, `render_id=rfr_<26> transaction_id=rft_<26>`:
 * key=value text, not JSON, and no operation_id. Under -v every log line carries the operation id as a `[rfo_<26>]` prefix, from
 * the first line (about 1 s before the commit). The --no-commit preview wrote nothing on stderr. `rf operation show <rfo_>` read
 * {state committed, render_id, transaction_id, commit_seq, ...} and `rf context show <rfr_>` read the committed receipt carrying
 * operation_id. So the rf side of the gate artifact (a resolvable receipt id) is met on this host, in that shape, and the Pi side
 * (a committing rf capability) is not.
 *
 * CASES. One test per pin, titled by the clause it answers, by the scenario its reading drives (C2, C3, R1, R2) and by the
 * residuals that bound it; each pin measures a witness held to WITNESS, and the closing case holds the reached record to ROWS.
 * A pin is UNTIL-THEN (its witness moves when src gains a committing rf invocation by a route its readers name, and its failure
 * names the acceptance as owed) or STANDING (it holds today and must keep holding).
 *  capture (ACCEPTANCE[0]). C1 UNTIL-THEN, read from src and at run time. The src readers parse (TypeScript AST) every script
 *    file under src (.ts, .mts, .cts, .js, .mjs, .cjs; declaration files excluded) and, as a module of its own, the text of every
 *    src string or template that calls require( or getBuiltinModule( (today only the workflow worker's inlined source, which
 *    the host evaluates with new Worker(..., { eval: true })).
 *    (a) rf launches: a launch call (spawn, spawnSync, execFile, execFileSync, exec, execSync or fork, by name, through an
 *    import, destructuring or const alias, or as a member under any receiver, by name or literal key; or process.execve) whose
 *    command words include rf - the words of its first argument (a string, a template's literal text, a same-file const, either
 *    side of ?? / || / ?:, a + join; read as a shell line with each path reduced to its base name) and of each literal element of
 *    an array second argument: exactly the preview's one. (b) The launch inventory: every launch call by name or alias, through
 *    a child_process module binding (a namespace or default import, or a binding to a call loading child_process - require,
 *    import(), getBuiltinModule - or such a call itself) or process.execve, as launcher:program with the program its first
 *    command word, or <opaque text> when that is not literal: exactly the five above, so a new launch of any program by those
 *    routes is a new member. (c) Per rf launch, its argv: the argument resolved through a const in the launch's declaration to
 *    its builder, that const's use count, whether every return of the builder lists --no-commit as a literal element (not
 *    inside a spread or a conditional), or for exec and execSync whether the command's words list it, and the launch's options
 *    text; plus the builder's source lines. (d) Per rf launch, its declaration's parameters and every src reference to that
 *    declaration by its name (an identifier or a literal key: a call with its arity, a value, an import, an export). (e) Every
 *    object literal src writes whose id resolves - read as (a) reads a command: a string, a template's literal text, a same-file
 *    const, a + join, either side of ?: / ?? / || - to a reactivefiber.* name, as id:effectClass, its effectClass resolved the
 *    same way. (f) At run time, both input arms' argv as the stand-in recorded them carry --no-commit.
 *    C2 UNTIL-THEN: the acceptance's own scenario run through Pi's one rf launch, journaled as a committing (write-class) node by a
 *    test host: a stand-in rf writes the receipt line on stderr (the acceptance's JSON form and the two measured rf 0.1.845 forms)
 *    before any stdout byte, then exceeds the deadline; the run fails transport and neither of its two journal rows carries a
 *    nativeRef or any rf id. The same readers find the stdout envelope's reference on a settled run (the live control): today a
 *    journaled rf reference comes only from stdout, after settlement. C3 UNTIL-THEN: the receipt lines' bytes reached the launched
 *    child's stderr pipe before the deadline was advanced (its bytesRead), and when the deadline SIGTERM lands the journal holds
 *    the dispatched row alone, with no rf id: nothing is captured before the kill sequence.
 *  reconcile (ACCEPTANCE[1]). R1 UNTIL-THEN: the resume of that killed journal refuses uncertain-effect naming the producer and
 *    no rf id (none was captured), and RECONCILE_EVIDENCE_READS.reactivefiber offers the preview alone, no operation-id read.
 *    R2 STANDING: across that killed run and its resume (the write-class test host) the stand-in records exactly one spawn and
 *    the host one node call, and the resume replays and reconciles nothing.
 *  preview-guard (ACCEPTANCE[2]). G1 STANDING: the clause's own line ranges (88-98, 107-110) give the custody block's and the
 *    stderr listener's lengths; both are located in today's src by the TypeScript AST inside nativeReactiveFiberRender (the
 *    statements from `const stop` through `const timer`; every `<x>.stderr.<listen>("data", ...)` statement) and equal the
 *    9df9a03 text byte for byte; the custody sits in nativeReactiveFiberRender, which nativeReactiveFiberPreview delegates to;
 *    and for each kill the statement names (deadline/overflow, escalating after the statement's "SIGTERM-SIGKILL(500 ms)") the
 *    preview's custody runs under fake timers against a stand-in that ignores SIGTERM: no SIGTERM before the trigger, SIGTERM at
 *    it, alive 1 ms before the escalation, closed at it, and the typed transport error. G2 STANDING, read two ways. Static (every
 *    rf launch C1 (a) finds): the launch is bound to a const, its stdio option is ["ignore","pipe","pipe"], and every reference
 *    to that binding inside its declaration is one of the pinned uses, the stderr data listener reading its chunk parameter for
 *    .length only; any other reference (a destructuring, child.stdio, an element access, a hand-off to a helper, a second
 *    listener, another stream member) is a new use. Run time (both input arms, the legacy one through the preview leaf): the
 *    ChildProcess the "child_process" diagnostics channel publishes for the launch, read while the stand-in hangs after its
 *    receipt lines reached the pipe (stderr bytesRead equals their byte length): one data listener and no readable listener on
 *    its stderr, no encoding set, no own function property on the stream, and that listener's chunk parameter read for .length
 *    only (parsed from the listener's own source as it runs); after the abort the error is the typed cancel and no process
 *    warning names an rf id. Sinks: the preview reading under all three receipt forms on stderr (their bytes read) is exactly
 *    {contract, source, workspaceRoot} carrying the stdout ids alone, and neither kill's error names an rf id.
 * T0: the readings are live (the stand-in is the only PATH entry, src holds the surfaces, the worker's embedded source is in the
 * read set, the stimulus is every receipt line). T2 and T3: each reader finds its plants (static controls; planted children with
 * a second listener, an encoding and an own push; a process warning naming an id), so a hollowed reader reds. RESIDUALS: each
 * named residual's quiet row reads quiet. A1 the outside anchors: the export's
 * STATEMENT line and ACCEPTANCE list are this file's, each row's pins are exactly its export item's clauses (cut mechanically at
 * ", then ", ", and " and a spaced dash), the SURFACES line is this file's, and G1's ranges, escalation and kills come from the
 * export's own text. FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, WITNESS's keys are exactly
 * the pins, every reading of READINGS is pinned exactly once (a pin swapped onto another pin's reading reds), and RESIDUALS pins
 * `${id}:${pin}`.
 * RESIDUALS (named, each with a pinned quiet row; a newly found escape of the same kind is a residual-list addition):
 *  R-OPAQUE-LAUNCHER (C1): a launch function reached other than as C1 (a) and (b) read it - through a parameter, Reflect.apply,
 *    call/apply/bind, a computed key, a module that re-exports it under another name, or as a member of a receiver that is no
 *    child_process binding (a namespace import of a re-exporting module) with a program that is not literal - is no launch to
 *    C1, so a committing rf invocation made that way moves no C1 field (quiet row: such plants read no rf launch and no
 *    inventory member).
 *  R-OPAQUE-REGISTRATION (C1): a descriptor whose id resolves to no text (a parameter, an import, a shorthand property, a string
 *    built at run time) or to no reactivefiber.* name is no registration to C1 (e); a committing launch behind it is still read
 *    by (a)-(d) (quiet row: a write-class descriptor with a parameter id, a shorthand id and an rf.* id reads no registration).
 *  R-EVALUATED-SOURCE (C1): source text assembled at run time and evaluated (new Function, eval, vm, a Worker with eval), or an
 *    embedded string that neither calls require( nor getBuiltinModule(, is no module to the src readers (quiet row: a launch
 *    joined from parts and handed to new Function reads no embedded module, no rf launch and no inventory member).
 *  R-NON-PROCESS (C1): an rf invocation that is no child process (a socket or HTTP request, an in-process library; Pi vendors no
 *    rf library and rf publishes no TS SDK) is not read (quiet row: a fetch-driven committing render reads nothing).
 *  R-STREAM-INTERNALS (G2): a read wired below the stderr stream's listener surface with no reference to the launch's binding - a
 *    patched prototype the stream or its chunks inherit from (a Readable or Socket push or emit, a Buffer or typed-array
 *    accessor such as length, which the counting listener itself reads), or a hook placed in the stream's prototype chain (for
 *    instance by a "child_process" diagnostics-channel subscriber) - is invisible to both legs (quiet row: a prototype-chain
 *    push hook beside a pure counting listener captures all three stderr ids while the static and run-time readings stay clean).
 * SCOPE AND NOT CLAIMED: the src readers read src only (today every src file is .ts; a committing path in a module outside src,
 * such as the detached host's operator-loaded local provider, is not read), and the rf child's environment allowlist is
 * pinned by test/workbench-env-scrub-census.test.ts, not here. C2, C3, R1 and R2 drive Pi's noncommitted launch under a test
 * host's write class because Pi has no committing one; they show what the runtime journals today, not how a future committing
 * provider spells its argv or its capture, and R2 drives the write class only. G1 byte-pins the two blocks the clause's ranges
 * name; lines outside them (the finally block's timer clearing, the close handler) are read only through the two kill sequences.
 * OWED (by the cut that builds the committing render, once wb-x32 resolves to one): the acceptance itself. The measured rf
 * 0.1.845 shape bears on it: the default-verbosity receipt line carries render_id and transaction_id, not operation_id, so a
 * capture either reads the -v `[rfo_...]` prefix or reconciles the rfr_ id through rf context show. Such a cut reds C1 when its
 * launch is one C1's readers name (a new rf launch or inventory member, a changed argv, builder, options, declaration, reference
 * or registration), C2 or C3 when it journals a captured reference, and R1 when the resume names an id or the reconcile reads gain
 * an operation-id read; a committing path built only through a named residual route moves none of them.
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch as the only PATH entry, run by this
 * process's node; src and the tracker export are only read.
 */
import { ChildProcess, spawn } from "node:child_process";
import { subscribe, unsubscribe } from "node:diagnostics_channel";
import { chmodSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { Socket } from "node:net";
import { delimiter, dirname, join, relative } from "node:path";
import type { Readable } from "node:stream";
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
/** The rf launch's argv builder as measured at trunk b3d410f (providers/reactivefiber.ts:111-116), verbatim (C1 (c)). */
const ARGV_BUILDER_TODAY: readonly string[] = [
  "function renderArgv(selector:ReactiveFiberRenderSelector,workspaceRoot:string):string[] {",
  '  const select="view" in selector',
  '    ? ["--view",selector.view,"--task-id",selector.taskId,...(selector.model===undefined?[]:["--model",selector.model])]',
  '    : ["--model",selector.model,"--task",selector.task];',
  '  return ["--workspace",workspaceRoot,"context","render",...select,"--no-commit","--no-input","--json"];',
  "}",
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
/** The stderr bytes the stand-in writes before anything else: every receipt line, newline-terminated. */
const RECEIPT_TEXT = RECEIPT_LINES.map((line) => `${line}\n`).join("");
const RECEIPT_BYTES = Buffer.byteLength(RECEIPT_TEXT);
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
/** Every script file under a directory (.ts, .mts, .cts, .js, .mjs, .cjs), declaration files excluded. */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? sourceFiles(join(dir, entry.name))
      : entry.isFile() && /\.[mc]?[jt]s$/.test(entry.name) && !/\.d\.[mc]?ts$/.test(entry.name)
        ? [join(dir, entry.name)]
        : [],
  );
}
function srcTree(): SourceText[] {
  const files = sourceFiles(join(REPO, "src"))
    .map((file) => ({ path: relative(REPO, file).split("\\").join("/"), text: readFileSync(file, "utf8") }))
    .sort((a, b) => a.path.localeCompare(b.path));
  return [...files, ...files.flatMap(embeddedSources)];
}
function visit(node: ts.Node, visitor: (node: ts.Node) => void): void {
  visitor(node);
  ts.forEachChild(node, (child) => visit(child, visitor));
}
function parsed(file: SourceText): ts.SourceFile {
  return ts.createSourceFile(file.path, file.text, ts.ScriptTarget.Latest, true);
}
/**
 * Source text a src module carries inside a string or template that calls require( or getBuiltinModule( (the workflow worker's
 * inlined CommonJS source, which the host evaluates with new Worker(..., { eval: true })), read as a module of its own: a
 * template's substitutions read as `undefined`.
 */
function embeddedSources(file: SourceText): SourceText[] {
  const source = parsed(file);
  const found: SourceText[] = [];
  visit(source, (node) => {
    const text = ts.isStringLiteralLike(node)
      ? node.text
      : ts.isTemplateExpression(node)
        ? [node.head.text, ...node.templateSpans.map((span) => `undefined${span.literal.text}`)].join("")
        : undefined;
    if (text !== undefined && /\brequire\(|\bgetBuiltinModule\(/.test(text))
      found.push({ path: `${file.path}#embedded@${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`, text });
  });
  return found;
}
/** An expression without its parentheses, `as`, `satisfies`, `!`, type assertions and `await`. */
function unwrapped(node: ts.Expression): ts.Expression {
  let at = node;
  while (
    ts.isParenthesizedExpression(at) ||
    ts.isAsExpression(at) ||
    ts.isSatisfiesExpression(at) ||
    ts.isNonNullExpression(at) ||
    ts.isTypeAssertionExpression(at) ||
    ts.isAwaitExpression(at)
  )
    at = at.expression;
  return at;
}
function literalText(node: ts.Node | undefined): string | undefined {
  return node !== undefined && ts.isStringLiteralLike(node) ? node.text : undefined;
}
/** The process launchers a child of rf would come from (process.execve is read apart, by its receiver). */
const LAUNCHERS: ReadonlySet<string> = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "fork", "exec", "execSync"]);
const SHELL_LAUNCHERS: ReadonlySet<string> = new Set(["exec", "execSync"]);
const LISTENS: ReadonlySet<string> = new Set(["on", "once", "addListener", "prependListener", "prependOnceListener"]);
const CHILD_PROCESS: ReadonlySet<string> = new Set(["child_process", "node:child_process"]);

/** One module's bindings the readers resolve through. */
interface Scan {
  readonly file: SourceText;
  readonly source: ts.SourceFile;
  /** Every const binding's initializer, by name (any scope: a shadowing binding can only over-report). */
  readonly consts: ReadonlyMap<string, ts.Expression>;
  /** Local names for a launcher: an import or destructuring that renames one, or a const bound to one. */
  readonly aliases: ReadonlyMap<string, string>;
  /** Local names bound to the child_process module: a namespace or default import, or a const bound to a loading call. */
  readonly modules: ReadonlySet<string>;
}
/** A call that loads child_process: any call whose first argument is a child_process specifier (require, import(), getBuiltinModule). */
function loadsChildProcess(node: ts.Expression): boolean {
  const at = unwrapped(node);
  const specifier = ts.isCallExpression(at) ? literalText(at.arguments[0]) : undefined;
  return specifier !== undefined && CHILD_PROCESS.has(specifier);
}
/** A property name's text: an identifier, a string or numeric literal, or a computed literal key. */
function propertyText(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isPrivateIdentifier(name)) return name.text;
  return ts.isComputedPropertyName(name) ? literalText(unwrapped(name.expression)) : undefined;
}
/** The property assignment an object literal makes to a name, as its initializer. */
function propertyOf(object: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  const match = object.properties.find((member) => ts.isPropertyAssignment(member) && propertyText(member.name) === name);
  return match !== undefined && ts.isPropertyAssignment(match) ? match.initializer : undefined;
}
function memberName(node: ts.Expression): string | undefined {
  const at = unwrapped(node);
  if (ts.isIdentifier(at)) return at.text;
  if (ts.isPropertyAccessExpression(at)) return at.name.text;
  if (ts.isElementAccessExpression(at)) return literalText(at.argumentExpression);
  return undefined;
}
function scanOf(file: SourceText): Scan {
  const source = parsed(file);
  const consts = new Map<string, ts.Expression>();
  const aliases = new Map<string, string>();
  const modules = new Set<string>();
  visit(source, (node) => {
    if (ts.isVariableDeclarationList(node) && (node.flags & ts.NodeFlags.Const) !== 0)
      for (const declaration of node.declarations)
        if (ts.isIdentifier(declaration.name) && declaration.initializer !== undefined) consts.set(declaration.name.text, declaration.initializer);
    if ((ts.isImportSpecifier(node) || ts.isBindingElement(node)) && ts.isIdentifier(node.name)) {
      const imported = node.propertyName ?? node.name;
      if ((ts.isIdentifier(imported) || ts.isStringLiteral(imported)) && LAUNCHERS.has(imported.text)) aliases.set(node.name.text, imported.text);
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
      const bound = memberName(node.initializer);
      if (bound !== undefined && LAUNCHERS.has(bound) && bound !== node.name.text) aliases.set(node.name.text, bound);
      if (loadsChildProcess(node.initializer)) modules.add(node.name.text);
    }
    if (ts.isImportDeclaration(node) && CHILD_PROCESS.has(literalText(node.moduleSpecifier) ?? "")) {
      const clause = node.importClause;
      if (clause?.name !== undefined) modules.add(clause.name.text);
      if (clause?.namedBindings !== undefined && ts.isNamespaceImport(clause.namedBindings)) modules.add(clause.namedBindings.name.text);
    }
  });
  return { file, source, consts, aliases, modules };
}
/** A command line's words: split on whitespace, quotes and shell operators, each path reduced to its base name (.exe/.cmd dropped). */
function commandWords(command: string | undefined): string[] {
  return (command ?? "")
    .split(/[\s"'`;&|()<>]+/)
    .filter(Boolean)
    .map((word) => (word.split(/[\\/]/).pop() ?? word).replace(/\.(?:exe|cmd)$/i, ""));
}
/** The literal text an expression spells: a string, a template's literal parts, a same-file const, either side of ?? / || / ?: or a + join. */
function commandText(node: ts.Expression | undefined, scan: Scan, depth = 0): string | undefined {
  if (node === undefined || depth > 8) return undefined;
  const at = unwrapped(node);
  const literal = literalText(at);
  if (literal !== undefined) return literal;
  if (ts.isTemplateExpression(at)) return [at.head.text, ...at.templateSpans.map((span) => `${commandText(span.expression, scan, depth + 1) ?? " "}${span.literal.text}`)].join("");
  if (ts.isIdentifier(at)) return commandText(scan.consts.get(at.text), scan, depth + 1);
  const joined = (parts: readonly (string | undefined)[], separator: string): string | undefined =>
    parts.every((part) => part === undefined) ? undefined : parts.map((part) => part ?? " ").join(separator);
  if (ts.isConditionalExpression(at)) return joined([commandText(at.whenTrue, scan, depth + 1), commandText(at.whenFalse, scan, depth + 1)], " ");
  if (ts.isBinaryExpression(at)) {
    const operator = at.operatorToken.kind;
    if (operator === ts.SyntaxKind.QuestionQuestionToken || operator === ts.SyntaxKind.BarBarToken)
      return joined([commandText(at.left, scan, depth + 1), commandText(at.right, scan, depth + 1)], " ");
    if (operator === ts.SyntaxKind.PlusToken) return joined([commandText(at.left, scan, depth + 1), commandText(at.right, scan, depth + 1)], "");
  }
  return undefined;
}
/** The declaration a node sits in: the nearest function or method declaration, else the module-level binding of a function. */
function declarationOf(node: ts.Node): { readonly name: string; readonly body: ts.Node; readonly nameNode: ts.Node | undefined } {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if ((ts.isFunctionDeclaration(at) || ts.isMethodDeclaration(at)) && at.name !== undefined && ts.isIdentifier(at.name))
      return { name: at.name.text, body: at, nameNode: at.name };
    if (
      (ts.isArrowFunction(at) || ts.isFunctionExpression(at)) &&
      ts.isVariableDeclaration(at.parent) &&
      ts.isIdentifier(at.parent.name) &&
      ts.isVariableStatement(at.parent.parent.parent) &&
      ts.isSourceFile(at.parent.parent.parent.parent)
    )
      return { name: at.parent.name.text, body: at, nameNode: at.parent.name };
  }
  return { name: "<module>", body: node.getSourceFile(), nameNode: undefined };
}
interface Launch {
  readonly scan: Scan;
  readonly call: ts.CallExpression;
  readonly launcher: string;
  /** How the launcher was reached: by name or alias, through a child_process binding, process.execve, or a member of another receiver. */
  readonly route: "name" | "module" | "process" | "member";
  readonly declaration: string;
  readonly words: readonly string[];
  readonly site: string;
}
function launchesIn(scan: Scan): Launch[] {
  const launches: Launch[] = [];
  visit(scan.source, (node) => {
    if (!ts.isCallExpression(node)) return;
    const callee = unwrapped(node.expression);
    let launcher: string | undefined;
    let route: Launch["route"] = "member";
    if (ts.isIdentifier(callee)) {
      launcher = scan.aliases.get(callee.text) ?? callee.text;
      route = "name";
    } else if (ts.isPropertyAccessExpression(callee) || ts.isElementAccessExpression(callee)) {
      launcher = memberName(callee);
      const receiver = unwrapped(callee.expression);
      if (launcher === "execve" && ts.isIdentifier(receiver) && receiver.text === "process") route = "process";
      else if ((ts.isIdentifier(receiver) && scan.modules.has(receiver.text)) || loadsChildProcess(receiver)) route = "module";
    }
    if (launcher === undefined || !(LAUNCHERS.has(launcher) || route === "process")) return;
    const argv = node.arguments[1] === undefined ? undefined : unwrapped(node.arguments[1]);
    const elements = argv !== undefined && ts.isArrayLiteralExpression(argv) ? argv.elements.map((element) => (ts.isSpreadElement(element) ? undefined : commandText(element, scan))) : [];
    const words = [commandText(node.arguments[0], scan), ...elements].flatMap(commandWords);
    const declaration = declarationOf(node).name;
    launches.push({ scan, call: node, launcher, route, declaration, words, site: `${scan.file.path}:${declaration}:${launcher}` });
  });
  return launches;
}
function rfLaunchesIn(files: readonly SourceText[]): Launch[] {
  return files.flatMap((file) => launchesIn(scanOf(file)).filter((launch) => launch.words.includes("rf")));
}
/** C1 (a): every rf launch, as `path:declaration:launcher`, one entry per launch. */
function launchSites(files: readonly SourceText[]): string[] {
  return rfLaunchesIn(files).map((launch) => launch.site);
}
/** C1 (b): every launch reached by name, alias, a child_process binding or process.execve, as `launcher:program`, sorted. */
function launchInventory(files: readonly SourceText[]): string[] {
  return files
    .flatMap((file) => launchesIn(scanOf(file)))
    .filter((launch) => launch.route !== "member")
    .map((launch) => {
      const program = commandWords(commandText(launch.call.arguments[0], launch.scan))[0];
      return `${launch.launcher}:${program ?? `<opaque ${launch.call.arguments[0]?.getText(launch.scan.source) ?? "no argument"}>`}`;
    })
    .sort();
}
/** The const a declaration body binds to the name, and that name's other references in the body. */
function constIn(body: ts.Node, name: string): { readonly initializer: ts.Expression | undefined; readonly uses: number } {
  let initializer: ts.Expression | undefined;
  let uses = 0;
  visit(body, (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name) initializer = node.initializer;
    else if (ts.isIdentifier(node) && node.text === name && !(ts.isVariableDeclaration(node.parent) && node.parent.name === node)) uses += 1;
  });
  return { initializer, uses };
}
/** A same-file function declaration's return expressions (nested functions excluded). */
function returnsOf(scan: Scan, name: string): { readonly declaration: ts.FunctionDeclaration | undefined; readonly returns: ts.Expression[] } {
  let declaration: ts.FunctionDeclaration | undefined;
  visit(scan.source, (node) => {
    if (declaration === undefined && ts.isFunctionDeclaration(node) && node.name?.text === name) declaration = node;
  });
  const returns: ts.Expression[] = [];
  const walk = (node: ts.Node): void => {
    if (ts.isReturnStatement(node) && node.expression !== undefined) returns.push(node.expression);
    if (!ts.isFunctionLike(node)) ts.forEachChild(node, walk);
  };
  if (declaration?.body !== undefined) ts.forEachChild(declaration.body, walk);
  return { declaration, returns };
}
/** Whether --no-commit is a literal element of every array: unconditional, conditional (spread or nested), absent, or unresolved. */
function noCommitOf(arrays: readonly ts.Expression[] | undefined): string {
  if (arrays === undefined || arrays.length === 0 || arrays.some((array) => !ts.isArrayLiteralExpression(unwrapped(array)))) return "unresolved";
  const direct = (array: ts.Expression): boolean => {
    const at = unwrapped(array);
    return ts.isArrayLiteralExpression(at) && at.elements.some((element) => literalText(element) === "--no-commit");
  };
  if (arrays.every(direct)) return "unconditional";
  return arrays.some((array) => array.getText().includes('"--no-commit"')) ? "conditional" : "absent";
}
/** C1 (c): per rf launch, how its argv is built and whether it lists --no-commit, plus its options text. */
function argvReadings(files: readonly SourceText[]): string[] {
  return rfLaunchesIn(files).map((launch) => {
    const options = `options=${launch.call.arguments[2]?.getText(launch.scan.source) ?? "none"}`;
    if (SHELL_LAUNCHERS.has(launch.launcher))
      return `${launch.site} command --no-commit=${commandWords(commandText(launch.call.arguments[0], launch.scan)).includes("--no-commit") ? "unconditional" : "absent"} ${options}`;
    const argv = launch.call.arguments[1] === undefined ? undefined : unwrapped(launch.call.arguments[1]);
    if (argv === undefined) return `${launch.site} argv=none ${options}`;
    if (ts.isArrayLiteralExpression(argv)) return `${launch.site} argv=<inline> --no-commit=${noCommitOf([argv])} ${options}`;
    if (!ts.isIdentifier(argv)) return `${launch.site} argv=<${argv.getText(launch.scan.source)}> --no-commit=unresolved ${options}`;
    const bound = constIn(declarationOf(launch.call).body, argv.text);
    const initializer = bound.initializer === undefined ? undefined : unwrapped(bound.initializer);
    const builder = initializer !== undefined && ts.isCallExpression(initializer) && ts.isIdentifier(initializer.expression) ? returnsOf(launch.scan, initializer.expression.text) : undefined;
    const arrays = initializer !== undefined && ts.isArrayLiteralExpression(initializer) ? [initializer] : builder?.declaration !== undefined ? builder.returns : undefined;
    return `${launch.site} argv=${initializer?.getText(launch.scan.source) ?? "<unbound>"} uses=${bound.uses} returns=${arrays?.length ?? 0} --no-commit=${noCommitOf(arrays)} ${options}`;
  });
}
/** C1 (c): per rf launch, the source lines of its argv builder (the same-file function its argv const calls). */
function argvBuilders(files: readonly SourceText[]): string[][] {
  return rfLaunchesIn(files).map((launch) => {
    const argv = launch.call.arguments[1] === undefined ? undefined : unwrapped(launch.call.arguments[1]);
    const bound = argv !== undefined && ts.isIdentifier(argv) ? constIn(declarationOf(launch.call).body, argv.text).initializer : undefined;
    const initializer = bound === undefined ? undefined : unwrapped(bound);
    const name = initializer !== undefined && ts.isCallExpression(initializer) && ts.isIdentifier(initializer.expression) ? initializer.expression.text : undefined;
    const declaration = name === undefined ? undefined : returnsOf(launch.scan, name).declaration;
    if (declaration === undefined) return [];
    const first = launch.scan.source.getLineAndCharacterOfPosition(declaration.getStart(launch.scan.source)).line;
    const last = launch.scan.source.getLineAndCharacterOfPosition(declaration.getEnd()).line;
    return launch.scan.file.text.split("\n").slice(first, last + 1);
  });
}
/** C1 (d): per rf launch, its declaration with its parameters, and every src reference to it by name (an identifier or a literal key). */
function launchingDeclarations(files: readonly SourceText[]): Array<{ readonly declaration: string; readonly references: readonly string[] }> {
  return rfLaunchesIn(files).map((launch) => {
    const owner = declarationOf(launch.call);
    const parameters =
      ts.isFunctionDeclaration(owner.body) || ts.isMethodDeclaration(owner.body) || ts.isArrowFunction(owner.body) || ts.isFunctionExpression(owner.body)
        ? owner.body.parameters.map((parameter) => parameter.name.getText(launch.scan.source))
        : [];
    const references: string[] = [];
    for (const file of files) {
      const source = file.path === launch.scan.file.path ? launch.scan.source : parsed(file);
      visit(source, (node) => {
        const keyed = ts.isStringLiteralLike(node) && node.text === owner.name && ts.isElementAccessExpression(node.parent) && node.parent.argumentExpression === node;
        if (!keyed && (!ts.isIdentifier(node) || node.text !== owner.name || node === owner.nameNode)) return;
        const parent = node.parent;
        if (ts.isImportSpecifier(parent) || ts.isImportClause(parent)) references.push(`${file.path}:import`);
        else if (ts.isExportSpecifier(parent)) references.push(`${file.path}:export`);
        else {
          const callee = keyed || (ts.isPropertyAccessExpression(parent) && parent.name === node) ? parent : node;
          const call = callee.parent;
          references.push(
            ts.isCallExpression(call) && call.expression === callee ? `${file.path}:${declarationOf(node).name}:call(${call.arguments.length})` : `${file.path}:${declarationOf(node).name}:value`,
          );
        }
      });
    }
    return { declaration: `${launch.scan.file.path}:${owner.name}(${parameters.join(",")})`, references: references.sort() };
  });
}
/** C1 (e): every object literal src writes whose id resolves (as commandText reads text) to a reactivefiber.* name, as `path:id:effectClass`. */
function rfRegistrations(files: readonly SourceText[]): string[] {
  const found: string[] = [];
  for (const file of files) {
    const scan = scanOf(file);
    visit(scan.source, (node) => {
      if (!ts.isObjectLiteralExpression(node)) return;
      const id = commandText(propertyOf(node, "id"), scan);
      if (id === undefined || !id.startsWith("reactivefiber.")) return;
      const effect = propertyOf(node, "effectClass");
      found.push(`${file.path}:${id}:${commandText(effect, scan) ?? `<${effect?.getText(scan.source) ?? "none"}>`}`);
    });
  }
  return found.sort();
}
/** A listener's chunk parameter uses (`chunk => chunk.length`), plus `this` / `arguments` in a non-arrow listener. */
function chunkUsesOf(listener: ts.ArrowFunction | ts.FunctionExpression): string {
  const chunk = listener.parameters[0]?.name;
  if (chunk === undefined || !ts.isIdentifier(chunk)) return "<no named chunk>";
  const uses = new Set<string>();
  if (listener.parameters.length > 1) uses.add(`+${listener.parameters.length - 1} parameters`);
  visit(listener.body, (inner) => {
    if (!ts.isArrowFunction(listener) && (inner.kind === ts.SyntaxKind.ThisKeyword || (ts.isIdentifier(inner) && inner.text === "arguments"))) uses.add(inner.getText());
    if (!ts.isIdentifier(inner) || inner.text !== chunk.text) return;
    const parent = inner.parent;
    if (ts.isPropertyAccessExpression(parent) && parent.name === inner) return;
    uses.add(ts.isPropertyAccessExpression(parent) && parent.expression === inner ? `${chunk.text}.${parent.name.text}` : chunk.text);
  });
  return `${chunk.text} => ${[...uses].sort().join(", ")}`;
}
function listenerUses(listener: ts.Expression | undefined, source: ts.SourceFile): string {
  if (listener === undefined) return "<no listener>";
  const at = unwrapped(listener);
  return ts.isArrowFunction(at) || ts.isFunctionExpression(at) ? chunkUsesOf(at) : `<not inline: ${at.getText(source)}>`;
}
/** One reference to the launch's binding, classified: a member read or call, a stream listener, or a bare use (`child (Kind)`). */
function childUse(reference: ts.Identifier, source: ts.SourceFile): string {
  const name = reference.text;
  const parent = reference.parent;
  if (ts.isElementAccessExpression(parent) && parent.expression === reference) return `${name}[${parent.argumentExpression.getText(source)}]`;
  if (!ts.isPropertyAccessExpression(parent) || parent.expression !== reference) return `${name} (${ts.SyntaxKind[parent.kind]})`;
  const member = parent.name.text;
  const label = `${name}.${member}`;
  const next = parent.parent;
  const callArg = (call: ts.CallExpression): string => {
    const first = call.arguments[0];
    return first === undefined ? "" : (literalText(first) !== undefined ? JSON.stringify(literalText(first)) : "<expr>");
  };
  if (member !== "stdout" && member !== "stderr") return ts.isCallExpression(next) && next.expression === parent ? `${label}(${callArg(next)})` : label;
  if (!ts.isPropertyAccessExpression(next) || next.expression !== parent) return `${label} (${ts.SyntaxKind[next.kind]})`;
  const method = next.name.text;
  const call = next.parent;
  if (!ts.isCallExpression(call) || call.expression !== next || !LISTENS.has(method)) return `${label}.${method}`;
  const event = callArg(call);
  return member === "stderr" && event === '"data"' ? `${label}.${method}("data", ${listenerUses(call.arguments[1], source)})` : `${label}.${method}(${event})`;
}
/** G2 static: per rf launch, its binding, its stdio option and every reference to the binding inside its declaration. Sorted, unique. */
function childUses(files: readonly SourceText[]): string[] {
  const uses = new Set<string>();
  for (const launch of rfLaunchesIn(files)) {
    let holder: ts.Node = launch.call.parent;
    while (ts.isParenthesizedExpression(holder) || ts.isAsExpression(holder) || ts.isNonNullExpression(holder) || ts.isSatisfiesExpression(holder)) holder = holder.parent;
    const options = launch.call.arguments[2] === undefined ? undefined : unwrapped(launch.call.arguments[2]);
    const stdio = options !== undefined && ts.isObjectLiteralExpression(options) ? propertyOf(options, "stdio") : undefined;
    uses.add(`stdio ${stdio?.getText(launch.scan.source) ?? "<unread>"}`);
    if (!ts.isVariableDeclaration(holder) || !ts.isIdentifier(holder.name)) {
      uses.add(`unbound ${launch.launcher}(...) (${ts.SyntaxKind[holder.kind]})`);
      continue;
    }
    const binding = holder.name;
    const kind = (holder.parent.flags & ts.NodeFlags.Const) !== 0 ? "const" : "let";
    uses.add(`${kind} ${binding.text} = ${launch.launcher}(...)`);
    visit(declarationOf(launch.call).body, (node) => {
      if (ts.isIdentifier(node) && node.text === binding.text && node !== binding) uses.add(childUse(node, launch.scan.source));
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
      if (ts.isCallExpression(inner) && memberName(inner.expression) === "kill" && literalText(inner.arguments[0]) === "SIGKILL") escalates = true;
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
        const name = memberName(inner.expression);
        if (name !== undefined) calls.push(name);
      }
    });
  });
  return calls;
}
/** The full source lines a node spans. */
function linesOf(file: SourceText, source: ts.SourceFile, first: ts.Node, last: ts.Node): string[] {
  const start = source.getLineAndCharacterOfPosition(first.getStart(source)).line;
  const end = source.getLineAndCharacterOfPosition(last.getEnd()).line;
  return file.text.split("\n").slice(start, end + 1);
}
function functionNamed(source: ts.SourceFile, name: string): ts.FunctionDeclaration | undefined {
  let found: ts.FunctionDeclaration | undefined;
  visit(source, (node) => {
    if (found === undefined && ts.isFunctionDeclaration(node) && node.name?.text === name) found = node;
  });
  return found;
}
/** G1: the custody block located by AST in nativeReactiveFiberRender: the statements from `const stop` through `const timer`. */
function custodyBlock(file: SourceText): string[] {
  const source = parsed(file);
  const statements = functionNamed(source, "nativeReactiveFiberRender")?.body?.statements ?? [];
  const declares = (statement: ts.Statement, name: string): boolean =>
    ts.isVariableStatement(statement) && statement.declarationList.declarations.some((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === name);
  const start = statements.findIndex((statement) => declares(statement, "stop"));
  const end = statements.findIndex((statement) => declares(statement, "timer"));
  const first = statements[start];
  const last = statements[end];
  return first === undefined || last === undefined || end < start ? [] : linesOf(file, source, first, last);
}
/** G1: every `<x>.stderr.<listen>("data", ...)` statement in nativeReactiveFiberRender, located by AST, as its lines. */
function stderrListenerBlocks(file: SourceText): string[][] {
  const source = parsed(file);
  const owner = functionNamed(source, "nativeReactiveFiberRender");
  const blocks: string[][] = [];
  if (owner?.body === undefined) return blocks;
  visit(owner.body, (node) => {
    if (!ts.isExpressionStatement(node) || !ts.isCallExpression(node.expression)) return;
    const callee = node.expression.expression;
    if (
      ts.isPropertyAccessExpression(callee) &&
      LISTENS.has(callee.name.text) &&
      ts.isPropertyAccessExpression(callee.expression) &&
      callee.expression.name.text === "stderr" &&
      literalText(node.expression.arguments[0]) === "data"
    )
      blocks.push(linesOf(file, source, node, node));
  });
  return blocks;
}

/* ------------------------------------------------------------------ *
 * The stand-in rf, the launched children and the scenarios they drive
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
 * A stand-in rf, run by this process's node: it records its argv, ignores SIGTERM (marking it), writes RECEIPT_TEXT on stderr
 * before any stdout byte, then settles with the envelope, hangs, or overflows stderr and hangs.
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
    `process.stderr.write(${JSON.stringify(RECEIPT_TEXT)});`,
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
/** Run a scenario while the "child_process" diagnostics channel records every ChildProcess this process creates. */
async function withChildren<T>(scenario: (children: readonly ChildProcess[]) => Promise<T>): Promise<T> {
  const children: ChildProcess[] = [];
  const onChild = (message: unknown): void => {
    if (typeof message === "object" && message !== null && "process" in message && message.process instanceof ChildProcess) children.push(message.process);
  };
  subscribe("child_process", onChild);
  try {
    return await scenario(children);
  } finally {
    unsubscribe("child_process", onChild);
  }
}
const oldPath = process.env.PATH;
/** Run a scenario with the stand-in as the only PATH entry; restore PATH and real timers, reap the stand-in, remove scratch. */
async function withStandIn<T>(mode: Mode, scenario: (rf: StandIn, children: readonly ChildProcess[]) => Promise<T>): Promise<T> {
  const rf = standIn(mode);
  process.env.PATH = rf.dir;
  try {
    return await withChildren((children) => scenario(rf, children));
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
/** The bytes a launched child's stderr pipe has delivered to this process (-1 when it has no piped stderr). */
function bytesReadOf(child: ChildProcess | undefined): number {
  return child?.stderr instanceof Socket ? child.stderr.bytesRead : -1;
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

/** A listener's chunk uses read from the listener's own source as it runs (parsed, so formatting and instrumentation do not matter). */
function runtimeListenerUses(text: string): string {
  const source = ts.createSourceFile("listener.ts", `(${text});`, ts.ScriptTarget.Latest, true);
  const statement = source.statements[0];
  const expression = statement !== undefined && ts.isExpressionStatement(statement) ? unwrapped(statement.expression) : undefined;
  return expression !== undefined && (ts.isArrowFunction(expression) || ts.isFunctionExpression(expression)) ? chunkUsesOf(expression) : "<unparsed listener>";
}
interface StreamReading {
  /** How many ChildProcess objects the channel published. */
  readonly launched: number;
  readonly stderrBytesRead: number;
  readonly dataListeners: number;
  readonly readableListeners: number;
  readonly encoding: string | null;
  /** Own properties of the stderr stream whose value is a function (a per-instance override). */
  readonly ownFunctions: readonly string[];
  /** Each data listener's chunk uses, from its running source. */
  readonly listeners: readonly string[];
}
/** G2 run time: the first published child's stderr stream as it stands now. */
function streamReading(children: readonly ChildProcess[]): StreamReading {
  const stderr = children[0]?.stderr ?? null;
  return {
    launched: children.length,
    stderrBytesRead: bytesReadOf(children[0]),
    dataListeners: stderr?.listenerCount("data") ?? -1,
    readableListeners: stderr?.listenerCount("readable") ?? -1,
    encoding: stderr?.readableEncoding ?? null,
    ownFunctions:
      stderr === null ? [] : Object.getOwnPropertyNames(stderr).filter((key) => typeof Object.getOwnPropertyDescriptor(stderr, key)?.value === "function").sort(),
    listeners: stderr === null ? [] : stderr.listeners("data").map((listener) => runtimeListenerUses(Function.prototype.toString.call(listener))),
  };
}
/** Run a scenario while every process warning is recorded (`name: message`); the rf ids those warnings name. */
async function warningIdsDuring<T>(scenario: () => Promise<T>): Promise<{ readonly value: T; readonly warningIds: readonly string[] }> {
  const warnings: string[] = [];
  const onWarning = (warning: Error): void => {
    warnings.push(`${warning.name}: ${warning.message}`);
  };
  process.on("warning", onWarning);
  try {
    const value = await scenario();
    await sleep(QUIET_MS);
    return { value, warningIds: rfIdsIn(warnings.join("\n")) };
  } finally {
    process.off("warning", onWarning);
  }
}
/** G2 run time: one arm's launch read while the stand-in hangs after its receipt lines reached the pipe, then aborted. */
function listenersOf(arm: Arm): Promise<StreamReading & { readonly outcome: string; readonly warningIds: readonly string[] }> {
  return withStandIn("hang", async (rf, children) => {
    const abort = new AbortController();
    const { value, warningIds } = await warningIdsDuring(async () => {
      const pending = settleOf(arm === "legacy" ? nativeReactiveFiberPreview("model", "task", rf.dir, abort.signal) : nativeReactiveFiberRender(SELECTORS.view, rf.dir, abort.signal));
      await until(() => bytesReadOf(children[0]) >= RECEIPT_BYTES);
      await sleep(QUIET_MS);
      const reading = streamReading(children);
      abort.abort();
      return { ...reading, outcome: outcomeText(await pending) };
    });
    return { ...value, warningIds };
  });
}
const listenerReadings = new Map<Arm, ReturnType<typeof listenersOf>>();
function listenerReading(arm: Arm): ReturnType<typeof listenersOf> {
  const known = listenerReadings.get(arm);
  if (known !== undefined) return known;
  const fresh = listenersOf(arm);
  listenerReadings.set(arm, fresh);
  return fresh;
}
/** A planted child (node run directly, never through the provider) writing `text` on stderr and hanging, its stderr prepared by `prepare`. */
function plantedStream(text: string, prepare: (stderr: Readable) => () => unknown): Promise<{ readonly stream: StreamReading; readonly seen: unknown }> {
  return withChildren(async (children) => {
    const child = spawn(process.execPath, ["-e", `process.stderr.write(${JSON.stringify(text)}); setInterval(() => {}, 1000);`], { stdio: ["ignore", "pipe", "pipe"] });
    try {
      const seen = child.stderr === null ? () => "no stderr" : prepare(child.stderr);
      await until(() => bytesReadOf(children[0]) >= Buffer.byteLength(text));
      await sleep(QUIET_MS);
      return { stream: streamReading(children), seen: seen() };
    } finally {
      child.kill("SIGKILL");
      await until(() => child.exitCode !== null || child.signalCode !== null);
    }
  });
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
  /** The bytes the launched child's stderr pipe had delivered when the deadline was advanced. */
  readonly stderrBytesBeforeKill: number;
  /** The journal when the deadline SIGTERM landed. */
  readonly atSigterm: readonly WorkflowJournalEntry[];
  readonly rows: readonly WorkflowJournalEntry[];
  readonly resume: WorkflowRunResult;
  readonly spawns: number;
  readonly nodeCalls: number;
}
/** The acceptance's scenario through the runtime: receipt lines on stderr, then the deadline; then a resume of that journal. */
function killedRunReading(): Promise<KilledRun> {
  return withStandIn("hang", async (rf, children) => {
    const rows: WorkflowJournalEntry[] = [];
    const calls = { count: 0 };
    const host = committingHost(rf.dir, calls);
    fakeTimers();
    const pending = runWorkflow({ script: SCRIPT, host, journal: { entries: rows, append: (row: WorkflowJournalEntry) => rows.push(row) } });
    const started = await until(() => rf.pid() !== undefined);
    if (started) await until(() => bytesReadOf(children[0]) >= RECEIPT_BYTES);
    const stderrBytesBeforeKill = bytesReadOf(children[0]);
    vi.advanceTimersByTime(DEADLINE_MS);
    const termed = started && (await until(rf.termed));
    const atSigterm = termed ? copyRows(rows) : [];
    vi.advanceTimersByTime(ESCALATION_MS);
    const run = await settleOf(pending);
    vi.useRealTimers();
    const resume = await runWorkflow({ script: SCRIPT, host, journal: { entries: copyRows(rows) } });
    return { run, stderrBytesBeforeKill, atSigterm, rows: copyRows(rows), resume, spawns: rf.spawns().length, nodeCalls: calls.count };
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
/** The preview reading for one arm under the receipt lines on stderr, the argv the stand-in recorded, and the stderr bytes read. */
function previewOf(arm: Arm): Promise<{ readonly reading: JsonValue | undefined; readonly argv: readonly string[] | undefined; readonly stderrBytes: number }> {
  return withStandIn("settle", async (rf, children) => {
    const outcome = await settleOf(nativeReactiveFiberRender(SELECTORS[arm], rf.dir));
    return { reading: outcome.state === "fulfilled" ? outcome.value : undefined, argv: rf.spawns()[0], stderrBytes: bytesReadOf(children[0]) };
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
    const files = srcTree();
    const argvs: Partial<Record<Arm, readonly string[]>> = {};
    for (const arm of ["legacy", "view"] as const) argvs[arm] = (await previewReading(arm)).argv;
    return {
      launchSites: launchSites(files),
      launchInventory: launchInventory(files),
      argv: argvReadings(files),
      argvBuilders: argvBuilders(files),
      declarations: launchingDeclarations(files),
      registrations: rfRegistrations(files),
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
    return { stderrBytesBeforeKill: reading.stderrBytesBeforeKill, atSigterm: rowShapes(reading.atSigterm), rfIdsAtSigterm: rfIdsIn(JSON.stringify(reading.atSigterm)) };
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
    const sequences: Record<string, readonly string[]> = {};
    for (const kind of killKindsOf(STATEMENT)) sequences[kind] = (await killOf(kind)).sequence;
    return {
      ranges: rangesOf(clauseOf(ACCEPTANCE[2], 0)).map(([first, last]) => `${first}-${last}`),
      custody: custodyBlock(provider),
      stderrListeners: stderrListenerBlocks(provider),
      custodyHolders: custodyHolders(provider),
      previewCalls: callsOf(provider, "nativeReactiveFiberPreview"),
      kills: sequences,
    };
  },
  "stderr-discard": async () => {
    const preview = await previewReading("legacy");
    const reading = preview.reading;
    const errorIds: string[] = [];
    for (const kind of killKindsOf(STATEMENT)) errorIds.push(...(await killOf(kind)).errorIds);
    return {
      childUses: childUses(srcTree()),
      listeners: { legacy: await listenerReading("legacy"), view: await listenerReading("view") },
      readingStderrBytes: preview.stderrBytes,
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
  /** UNTIL-THEN pins move when src gains a committing rf invocation its readers name; STANDING pins hold today and must keep holding. */
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

/** A G2 run-time reading of one arm today: one counting listener on a stderr that delivered the receipt bytes, then the typed cancel. */
const CLEAN_LISTENERS = {
  launched: 1,
  stderrBytesRead: RECEIPT_BYTES,
  dataListeners: 1,
  readableListeners: 0,
  encoding: null,
  ownFunctions: [],
  listeners: ["chunk => chunk.length"],
  outcome: "transport: RF preview cancelled.",
  warningIds: [],
};
/** Each pin's measured witness today (measured by the cutting seat; the header's MEASURED). */
const WITNESS: Readonly<Record<PinId, unknown>> = {
  C1: {
    launchSites: [`${PROVIDER}:nativeReactiveFiberRender:spawn`],
    launchInventory: ["execFileSync:git", "execFileSync:git", "execFileSync:git", "spawn:<opaque process.execPath>", "spawn:rf"],
    argv: [
      `${PROVIDER}:nativeReactiveFiberRender:spawn argv=renderArgv(selector,workspaceRoot) uses=1 returns=1 --no-commit=unconditional options={stdio:["ignore","pipe","pipe"],env:scrubbedEnvironment(process.env,RF_CHILD_ENV_ALLOWLIST)}`,
    ],
    argvBuilders: [[...ARGV_BUILDER_TODAY]],
    declarations: [
      {
        declaration: `${PROVIDER}:nativeReactiveFiberRender(selector,workspaceRoot,signal)`,
        references: [`${PROVIDER}:nativeReactiveFiberPreview:call(3)`, `${PROVIDER}:registerNativeReactiveFiberRender:call(3)`],
      },
    ],
    registrations: [`${PROVIDER}:reactivefiber.render.preview:read`, `${PROVIDER}:reactivefiber.render.preview:read`],
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
    stderrBytesBeforeKill: RECEIPT_BYTES,
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
    stderrListeners: [[...STDERR_AT_PIN]],
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
    childUses: [
      "child.exitCode",
      'child.kill("SIGKILL")',
      'child.kill("SIGTERM")',
      'child.once("close")',
      'child.once("error")',
      "child.signalCode",
      'child.stderr.on("data", chunk => chunk.length)',
      'child.stdout.on("data")',
      "const child = spawn(...)",
      'stdio ["ignore","pipe","pipe"]',
    ],
    listeners: { legacy: CLEAN_LISTENERS, view: CLEAN_LISTENERS },
    readingStderrBytes: RECEIPT_BYTES,
    readingKeys: ["contract", "source", "workspaceRoot"],
    readingIds: [STDOUT_OPERATION, WORKSPACE_ID],
    errorIds: [],
  },
};

/* ------------------------------------------------------------------ *
 * Named residuals, each with a pinned quiet row
 * ------------------------------------------------------------------ */

/** A planted module for the src readers. */
function plant(path: string, lines: readonly string[]): SourceText {
  return { path, text: lines.join("\n") };
}
interface Residual {
  readonly id: "R-OPAQUE-LAUNCHER" | "R-OPAQUE-REGISTRATION" | "R-EVALUATED-SOURCE" | "R-NON-PROCESS" | "R-STREAM-INTERNALS";
  /** The pin whose claim the residual bounds (its title names it). */
  readonly pin: PinId;
  /** The quiet row: the escape planted and read by the pin's own readers. */
  readonly quiet: () => Promise<unknown>;
  /** What the readers report on the plant: nothing, or the clean reading, so the escape stays uncaught. */
  readonly reads: unknown;
}
const RESIDUALS: readonly Residual[] = [
  {
    id: "R-OPAQUE-LAUNCHER",
    pin: "C1",
    quiet: async () => {
      const files = [
        plant("opaque-launcher.ts", [
          'import * as cp from "node:child_process";',
          'import { start } from "./reexport.js";',
          'export function viaParameter(run: (program: string, argv: string[]) => void): void { run("rf", ["context", "render", "--json"]); }',
          'export function viaReflect(): void { Reflect.apply(cp.spawn, undefined, ["rf", ["context", "render", "--json"]]); }',
          'export function viaBind(): void { cp.spawn.bind(undefined)("rf", ["context", "render", "--json"]); }',
          'export function viaComputed(key: "spawn"): void { cp[key]("rf", ["context", "render", "--json"]); }',
          'export function viaReexport(): void { start("rf", ["context", "render", "--json"]); }',
          'import * as helpers from "./helpers.js";',
          'export function viaNamespace(bin: string): void { helpers.spawn(bin, ["context", "render", "--json"]); }',
        ]),
        plant("reexport.ts", ['export { spawn as start } from "node:child_process";']),
      ];
      return { launchSites: launchSites(files), launchInventory: launchInventory(files) };
    },
    reads: { launchSites: [], launchInventory: [] },
  },
  {
    id: "R-OPAQUE-REGISTRATION",
    pin: "C1",
    quiet: async () => {
      const files = [
        plant("opaque-registration.ts", [
          "export function viaParameter(registry: { register(entry: unknown): void }, id: string, effectClass: string): void {",
          '  registry.register({ descriptor: { id, effectClass: "write" } });',
          "  registry.register({ descriptor: { id: id, effectClass } });",
          '  registry.register({ descriptor: { id: "rf.render.commit", effectClass: "write" } });',
          "}",
        ]),
      ];
      return { registrations: rfRegistrations(files) };
    },
    reads: { registrations: [] },
  },
  {
    id: "R-EVALUATED-SOURCE",
    pin: "C1",
    quiet: async () => {
      const files = [
        plant("evaluated-source.ts", [
          'const PARTS = ["const cp = req", "uire(\\"node:child_", "process\\");", "cp.spawn(\\"rf\\", [\\"context\\", \\"render\\", \\"--json\\"]);"];',
          'export function viaEvaluator(): void { new Function(PARTS.join(""))(); }',
        ]),
      ];
      return { embedded: files.flatMap(embeddedSources).map((file) => file.path), launchSites: launchSites(files), launchInventory: launchInventory(files) };
    },
    reads: { embedded: [], launchSites: [], launchInventory: [] },
  },
  {
    id: "R-NON-PROCESS",
    pin: "C1",
    quiet: async () => {
      const files = [
        plant("non-process.ts", [
          "export async function viaServer(root: string): Promise<Response> {",
          '  return fetch("http://127.0.0.1:7777/rf/context/render", { method: "POST", body: JSON.stringify({ root, commit: true }) });',
          "}",
        ]),
      ];
      return { launchSites: launchSites(files), launchInventory: launchInventory(files), registrations: rfRegistrations(files) };
    },
    reads: { launchSites: [], launchInventory: [], registrations: [] },
  },
  {
    id: "R-STREAM-INTERNALS",
    pin: "G2",
    quiet: async () => {
      const files = [
        plant("stream-internals.ts", [
          'import { spawn } from "node:child_process";',
          'import { Readable } from "node:stream";',
          'let captured = "";',
          "const push = Readable.prototype.push;",
          "Readable.prototype.push = function (chunk: unknown, encoding?: BufferEncoding): boolean { captured += String(chunk); return push.call(this, chunk, encoding); };",
          "export function preview(): void {",
          "  let bytes = 0;",
          '  const child = spawn("rf", ["context", "render", "--no-commit"], { stdio: ["ignore", "pipe", "pipe"] });',
          '  child.stderr.on("data", (chunk: Buffer) => { bytes += chunk.length; });',
          "}",
        ]),
      ];
      const planted = await plantedStream(RECEIPT_TEXT, (stderr) => {
        let captured = "";
        let bytes = 0;
        const base: Readable = Object.getPrototypeOf(stderr);
        const hook = Object.create(base, {
          push: {
            value(this: Readable, chunk: unknown, encoding?: BufferEncoding): boolean {
              if (chunk !== null) captured += String(chunk);
              return base.push.call(this, chunk, encoding);
            },
          },
        });
        Object.setPrototypeOf(stderr, hook);
        stderr.on("data", (chunk: Buffer) => {
          bytes += chunk.length;
        });
        return () => ({ bytes, hookCaptured: rfIdsIn(captured) });
      });
      return { childUses: childUses(files), stream: planted.stream, seen: planted.seen };
    },
    reads: {
      childUses: ['child.stderr.on("data", chunk => chunk.length)', "const child = spawn(...)", 'stdio ["ignore", "pipe", "pipe"]'],
      stream: { launched: 1, stderrBytesRead: RECEIPT_BYTES, dataListeners: 1, readableListeners: 0, encoding: null, ownFunctions: [], listeners: ["chunk => chunk.length"] },
      seen: { bytes: RECEIPT_BYTES, hookCaptured: [STDERR_OPERATION, STDERR_RENDER, STDERR_TRANSACTION] },
    },
  },
];
function residualsOf(pin: PinId): string[] {
  return RESIDUALS.filter((residual) => residual.pin === pin).map((residual) => residual.id);
}
/** The scenario a pin's reading drives, when it drives one: the acceptance's own, through Pi's noncommitted launch. */
function scenarioOf(pin: (typeof PINS)[number]): string | undefined {
  return ["killed-journal", "journal-at-sigterm", "resume", "spawns"].includes(pin.reading) ? "scenario: a deadline kill under a write-class test host" : undefined;
}
function titleOf(pin: (typeof PINS)[number]): string {
  const residuals = residualsOf(pin.id);
  const scenario = scenarioOf(pin);
  return `${pin.id} (${pin.row}, ${pin.kind}${scenario === undefined ? "" : `; ${scenario}`}${residuals.length > 0 ? `; residuals ${residuals.join(", ")}` : ""}): ${pin.clause}`;
}
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
/** A template command with an interpolation, spelled without a template placeholder in this file's own strings. */
const TEMPLATE_COMMAND = ["  exec(`rf --workspace ", "$", "{root} context render --json`);"].join("");
/** A descriptor whose id is a template with an interpolation, spelled the same way. */
const TEMPLATE_ID = ['register({ id: `reactivefiber.render.', "$", '{kind}`, effectClass: "write" });'].join("");

describe("wb-jwc.7 rf stderr receipt-capture census (until Pi has a committing rf capability)", () => {
  it("T0: the readings are live: the stand-in is the only PATH entry and runs on this node, src holds the surfaces and the worker's embedded source, the receipt lines spell the stderr ids", async () => {
    const files = srcTree();
    expect(files.map((file) => file.path)).toEqual(expect.arrayContaining([PROVIDER, RUNTIME]));
    expect(
      files.filter((file) => /^src\/workflow\/worker-source\.ts#embedded@[0-9]+$/.test(file.path)),
      "the workflow worker's inlined source is read as an embedded module",
    ).toHaveLength(1);
    const probe = await withStandIn("settle", async (rf) => ({
      path: process.env.PATH?.split(delimiter) ?? [],
      dir: rf.dir,
      shebang: readFileSync(join(rf.dir, "rf"), "utf8").split("\n")[0],
    }));
    expect(probe.path, "the stand-in directory is the only PATH entry").toStrictEqual([probe.dir]);
    expect(probe.shebang, "the stand-in runs on this process's node").toBe(`#!${process.execPath}`);
    expect(STDERR_OPERATION, "the stderr receipt id has the shape the provider admits for an operation id").toMatch(/^rfo_[0-9a-z]{22,32}$/);
    expect(rfIdsIn(RECEIPT_LINES.join("\n")), "the receipt lines spell the three stderr ids").toStrictEqual([STDERR_OPERATION, STDERR_RENDER, STDERR_TRANSACTION]);
    expect(RECEIPT_BYTES, "the stderr stimulus is every receipt line, newline-terminated").toBe(Buffer.byteLength(`${RECEIPT_LINES.join("\n")}\n`));
  }, 120_000);

  for (const pin of PINS)
    it(titleOf(pin), async () => {
      expect(await READINGS[pin.reading](), owed(pin)).toStrictEqual(WITNESS[pin.id]);
      reached.push(pin.id);
    }, 180_000);

  it("T2: each src reader finds its plants (launch routes, the inventory, argv, declarations, registrations, child uses)", () => {
    const sites = (lines: readonly string[]): number => launchSites([plant("control.ts", lines)]).length;
    expect({
      literal: sites(['spawn("rf", ["context", "render"]);']),
      constBound: sites(['const RF = "rf";', 'execFileSync(RF, ["--json"]);']),
      envFallback: sites(['const RF_BIN = process.env.PI_RF_BIN ?? "rf";', "spawn(RF_BIN, []);"]),
      templateCommand: sites([TEMPLATE_COMMAND]),
      shellString: sites(['execSync("rf --version");']),
      chained: sites(['exec("cd /tmp && rf --version");']),
      pathQualified: sites(['spawn("/usr/local/bin/rf", []);']),
      shellArgv: sites(['spawn("sh", ["-c", "rf --version"]);']),
      importAlias: sites(['import { spawn as launch } from "node:child_process";', 'launch("rf", []);']),
      keyed: sites(['import * as cp from "node:child_process";', 'cp["execFileSync"]("rf", []);']),
      required: sites(['const { spawn: run } = require("node:child_process");', 'run("rf", []);']),
      execve: sites(['process.execve("/usr/bin/rf", ["rf"]);']),
      otherProgram: sites(['execSync("forge run lint --json");']),
      regexExec: sites(["/rf/.exec(text);"]),
    }).toStrictEqual({
      literal: 1,
      constBound: 1,
      envFallback: 1,
      templateCommand: 1,
      shellString: 1,
      chained: 1,
      pathQualified: 1,
      shellArgv: 1,
      importAlias: 1,
      keyed: 1,
      required: 1,
      execve: 1,
      otherProgram: 0,
      regexExec: 0,
    });
    const inventory = (lines: readonly string[]): string[] => launchInventory([plant("control.ts", lines)]);
    expect(inventory(['import { spawn } from "node:child_process";', "spawn(process.env.RF_BIN as string, []);"])).toStrictEqual(["spawn:<opaque process.env.RF_BIN as string>"]);
    expect(inventory(['import { RF_PROGRAM } from "./bin.js";', "spawn(RF_PROGRAM, []);"])).toStrictEqual(["spawn:<opaque RF_PROGRAM>"]);
    expect(inventory(['spawn("sh", ["-c", command]);'])).toStrictEqual(["spawn:sh"]);
    expect(inventory(['import * as cp from "node:child_process";', "cp.fork(entry);"])).toStrictEqual(["fork:<opaque entry>"]);
    expect(inventory(['const cp = await import("node:child_process");', "cp.spawn(bin, []);"])).toStrictEqual(["spawn:<opaque bin>"]);
    expect(inventory(['process.getBuiltinModule("node:child_process").execFile(bin, []);'])).toStrictEqual(["execFile:<opaque bin>"]);
    expect(inventory(["manager.spawn(pi, ctx);"])).toStrictEqual([]);
    const argvOf = (lines: readonly string[]): string[] => argvReadings([plant("control.ts", lines)]);
    const builder = (returned: string): string[] => [`function argvOf(commit = false): string[] { return ${returned}; }`, "export function launch(): void {", "  const argv = argvOf();", '  spawn("rf", argv);', "}"];
    expect(argvOf(builder('["context", "render", "--no-commit"]'))).toStrictEqual(["control.ts:launch:spawn argv=argvOf() uses=1 returns=1 --no-commit=unconditional options=none"]);
    expect(argvOf(builder('["context", "render", ...(commit ? [] : ["--no-commit"])]'))).toStrictEqual(["control.ts:launch:spawn argv=argvOf() uses=1 returns=1 --no-commit=conditional options=none"]);
    expect(argvOf(builder('["context", "render"]'))).toStrictEqual(["control.ts:launch:spawn argv=argvOf() uses=1 returns=1 --no-commit=absent options=none"]);
    expect(argvOf(["export function launch(): void {", '  const argv = ["context", "render", "--no-commit"];', "  argv.pop();", '  spawn("rf", argv, { stdio: "ignore" });', "}"])).toStrictEqual([
      'control.ts:launch:spawn argv=["context", "render", "--no-commit"] uses=2 returns=1 --no-commit=unconditional options={ stdio: "ignore" }',
    ]);
    expect(argvOf([TEMPLATE_COMMAND])).toStrictEqual(["control.ts:<module>:exec command --no-commit=absent options=none"]);
    expect(argvBuilders([plant("control.ts", builder('["context", "render", "--no-commit"]'))])).toStrictEqual([[builder('["context", "render", "--no-commit"]')[0]]]);
    const declared = launchingDeclarations([
      plant("control.ts", ["export function render(root: string, commit = false): void {", '  spawn("rf", ["--workspace", root, ...(commit ? [] : ["--no-commit"])]);', "}"]),
      plant("caller.ts", ['import { render } from "./control.js";', 'export function commit(): void { render("/w", true); }', "export const handle = render;"]),
    ]);
    expect(declared).toStrictEqual([{ declaration: "control.ts:render(root,commit)", references: ["caller.ts:<module>:value", "caller.ts:commit:call(2)", "caller.ts:import"] }]);
    expect(rfRegistrations([plant("control.ts", ['registry.register({ descriptor: { id: "reactivefiber.render.commit", effectClass: "write" } });', 'register({ id: "forge.run", effectClass: "write" });'])])).toStrictEqual([
      "control.ts:reactivefiber.render.commit:write",
    ]);
    const uses = childUses([
      plant("control.ts", [
        "export function preview(): void {",
        '  const child = spawn("rf", ["context", "render"], { stdio: ["ignore", "pipe", "pipe"] });',
        "  const { stderr: receipts } = child;",
        '  child.stdio[2]?.on("data", (chunk: Buffer) => chunk.toString());',
        '  child["stderr"].on("data", (chunk: Buffer) => chunk.length);',
        "  watch(child);",
        '  child.stderr.on("data", (chunk: Buffer) => { void chunk.length; parse(chunk); });',
        '  child.stderr.on("data", function (chunk: Buffer) { void chunk.length; void arguments[0]; });',
        '  child.stderr.setEncoding("utf8");',
        '  child.stderr.on("readable", () => {});',
        "}",
      ]),
    ]);
    expect(uses).toStrictEqual([
      "child (CallExpression)",
      "child (VariableDeclaration)",
      'child.stderr.on("data", chunk => arguments, chunk.length)',
      'child.stderr.on("data", chunk => chunk, chunk.length)',
      'child.stderr.on("readable")',
      "child.stderr.setEncoding",
      "child.stdio",
      'child["stderr"]',
      "const child = spawn(...)",
      'stdio ["ignore", "pipe", "pipe"]',
    ]);
    expect(childUses([plant("control.ts", ['export const render = (): void => { spawn("rf", []).stderr?.on("data", parse); };'])])).toStrictEqual([
      "stdio <unread>",
      "unbound spawn(...) (PropertyAccessExpression)",
    ]);
    const tree = makeScratch("rf-receipt-capture-src-");
    try {
      for (const name of ["a.ts", "b.mts", "c.cjs", "d.d.ts", "e.d.mts", "f.json"]) writeFileSync(join(tree, name), "");
      expect(
        sourceFiles(tree)
          .map((file) => relative(tree, file))
          .sort(),
        "every script file is read; declaration files and data are not",
      ).toStrictEqual(["a.ts", "b.mts", "c.cjs"]);
    } finally {
      removeScratch(tree);
    }
    const embedded = plant("worker.ts", ["export const SOURCE = `", 'const cp = require("node:child_process");', 'cp.spawn("rf", ["context", "render"]);', "`;"]);
    expect(embeddedSources(embedded).map((file) => file.path), "a string that calls require reads as an embedded module").toStrictEqual(["worker.ts#embedded@1"]);
    expect(launchSites(embeddedSources(embedded)), "a launch inside embedded source is a launch").toStrictEqual(["worker.ts#embedded@1:<module>:spawn"]);
    expect(
      launchingDeclarations([
        plant("control.ts", ["export function render(root: string): void {", '  spawn("rf", ["--workspace", root, "--no-commit"]);', "}"]),
        plant("keyed.ts", ['import * as provider from "./control.js";', 'export function commit(): void { provider["render"]("/w", true); }']),
      ]),
    ).toStrictEqual([{ declaration: "control.ts:render(root)", references: ["keyed.ts:commit:call(2)"] }]);
    expect(rfRegistrations([plant("control.ts", ['register({ "id": "reactivefiber.render.commit", ["effectClass"]: "write" });'])])).toStrictEqual(["control.ts:reactivefiber.render.commit:write"]);
    expect(
      rfRegistrations([
        plant("control.ts", [
          'const PREVIEW_ID = "reactivefiber.render.preview";',
          'const WRITE = "write";',
          "register({ id: PREVIEW_ID, effectClass: WRITE });",
          'register({ id: "reactivefiber." + "render.commit", effectClass: "wr" + "ite" });',
          TEMPLATE_ID,
        ]),
      ]),
      "ids and effect classes read through consts, joins and templates",
    ).toStrictEqual(["control.ts:reactivefiber.render. :write", "control.ts:reactivefiber.render.commit:write", "control.ts:reactivefiber.render.preview:write"]);
    const changed = { path: PROVIDER, text: readFileSync(join(REPO, PROVIDER), "utf8").replace("},500);", "},5000);") };
    expect(custodyBlock(changed), "a changed escalation reads as a changed block").not.toStrictEqual([...CUSTODY_AT_PIN]);
    const decoy = {
      path: PROVIDER,
      text: readFileSync(join(REPO, PROVIDER), "utf8")
        .replace("    if(reason!==null && stopReason===null) stopReason=reason;", "    if(reason!==null&&stopReason===null) stopReason=reason;")
        .replace("export async function nativeReactiveFiberPreview(", `/*\n${CUSTODY_AT_PIN.join("\n")}\n*/\nexport async function nativeReactiveFiberPreview(`),
    };
    expect(custodyBlock(decoy), "a commented decoy of the pinned text is never the located block").not.toStrictEqual([...CUSTODY_AT_PIN]);
    expect(rangesOf("providers/reactivefiber.ts:1-2,5-9@x")).toStrictEqual([
      [1, 2],
      [5, 9],
    ]);
    expect(killKindsOf("capture before any deadline/overflow/abort kill")).toStrictEqual(["deadline", "overflow", "abort"]);
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
  });

  it("T3: the run-time readers find their plants (a second listener, an encoding, an own push, the bytes delivered, a warning naming an id)", async () => {
    const planted = await plantedStream(`${RECEIPT_TEXT}${RECEIPT_TEXT}`, (stderr) => {
      let text = "";
      let bytes = 0;
      stderr.setEncoding("utf8");
      stderr.on("data", (chunk: string) => {
        bytes += chunk.length;
      });
      stderr.on("data", (chunk: string) => {
        text += chunk.toString();
      });
      Object.defineProperty(stderr, "push", { value: stderr.push.bind(stderr), configurable: true, writable: true });
      return () => ({ bytes, ids: rfIdsIn(text) });
    });
    expect(planted).toStrictEqual({
      stream: {
        launched: 1,
        stderrBytesRead: 2 * RECEIPT_BYTES,
        dataListeners: 2,
        readableListeners: 0,
        encoding: "utf8",
        ownFunctions: ["push"],
        listeners: ["chunk => chunk.length", "chunk => chunk.toString"],
      },
      seen: { bytes: 2 * RECEIPT_BYTES, ids: [STDERR_OPERATION, STDERR_RENDER, STDERR_TRANSACTION] },
    });
    expect(runtimeListenerUses("function (chunk) { void chunk.length; return this; }")).toBe("chunk => chunk.length, this");
    const warned = await warningIdsDuring(async () => {
      process.emitWarning(STDERR_OPERATION, "Receipt");
      return "emitted";
    });
    expect(warned, "the warning sink reads an rf id a process warning names").toStrictEqual({ value: "emitted", warningIds: [STDERR_OPERATION] });
  }, 120_000);

  it("RESIDUALS: each named residual's quiet row reads quiet (the escape planted, the pin's readers blind to it)", async () => {
    for (const residual of RESIDUALS) expect(await residual.quiet(), residual.id).toStrictEqual(residual.reads);
  }, 120_000);

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

  it("FROZEN SHAPE (standing rule 16): ROWS' ids and pin counts, WITNESS keyed by exactly the pins, every reading pinned exactly once, the residuals and their pins", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toStrictEqual(["capture:3", "reconcile:2", "preview-guard:2"]);
    expect(Object.keys(WITNESS)).toStrictEqual(PINS.map((pin) => pin.id));
    expect(PINS.map((pin) => pin.reading)).toStrictEqual(Object.keys(READINGS));
    expect(RESIDUALS.map((residual) => `${residual.id}:${residual.pin}`)).toStrictEqual([
      "R-OPAQUE-LAUNCHER:C1",
      "R-OPAQUE-REGISTRATION:C1",
      "R-EVALUATED-SOURCE:C1",
      "R-NON-PROCESS:C1",
      "R-STREAM-INTERNALS:G2",
    ]);
  });

  it("closing: every pin's witness compare ran and held, in ROWS order", () => {
    expect(reached, "a pin whose compare did not run or did not hold").toStrictEqual(PINS.map((pin) => pin.id));
  });
});
