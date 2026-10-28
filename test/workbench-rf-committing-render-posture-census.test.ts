/**
 * wb-jwc.5 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R5, program-triage-2026-10-17), the standing leg of a gated requirement:
 * the posture a future committing rf capability must take, pinned while Pi registers none.
 * Statement (the bead's export title, ASCII-quoted up to its own truncation): "Any future committing rf capability shall
 * register with a non-read effectClass, pass a stable --idempotency-key on the render argv, and on any committed or unknown
 * outcome reconcile via rf operation show instead of retrying - never directing or performing a retry after a diagnostic with
 * metadata.committed=true or an authoritative committed receipt (FOC/03:40@8a8b83e4d), and never treating not-found/stdout
 * absence as proof of no c...". Gate (the description, conjoint): rf operation show registered leaf + --idempotency-key on
 * context render + FOC-ADR-03 landed in an installed rf, conjoined with wb-x32 resolving to a committing render.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-28, at base cd8927f; re-run green at bb96515, whose landing 597 touched
 * one other census and .beads only). The installed rf reads 0.1.845 (`rf --json
 * --version`: 80 leaves, context.render and operation.show both served_reachable). `rf context render --help` serves
 * `--idempotency-key KEY` ("the same key with the same request replays the committed receipt ... the same key with a
 * different request is exit 4 RF_IDEMPOTENCY_KEY_CONFLICT, and a key with --no-commit is exit 2"). `rf operation show --help`
 * reads "Read the durable receipt of an invocation from the journal by its rfo_ operation id: committed with the render_id
 * and transaction_id it produced, or exit 3 when no committed render carries the id": the shipped reader answers committed or
 * exit 3, not the five receipt states ACCEPTANCE[2] names, so an exit 3 is exactly the not_found reading that must never
 * conclude effect-absent while an attempt may still commit. The rf conjuncts are therefore met on this host; the gate stays
 * CLOSED on its last conjunct: wb-x32 (W10 provider/interop) is open and has not resolved to a committing render. In Pi at the
 * base, src registers no committing rf capability: its two rf descriptor literals (providers/reactivefiber.ts, the injected
 * and the native registration) are the noncommitted preview, effectClass read, permission reactivefiber:render, contract the
 * carrier naming `context.render --no-commit`; its one rf launch is nativeReactiveFiberRender's spawn of renderArgv, which
 * always ends --no-commit --no-input --json; its only SIGTERM-then-SIGKILL(500 ms) escalation is that function's stop(); no
 * src literal spells an rf operation-show leaf; and RECONCILE_EVIDENCE_READS.reactivefiber names the preview alone. The
 * censuses of wb-a9l2.8 (test/workbench-rf-graph-mutation-census.test.ts, row B: a committing render judged on its
 * effectClass only) and wb-tnz5.5 (test/workbench-rf-federation-pin-changed-census.test.ts, B7/B8: a refused commit) left the
 * committing render's receipt rule (--idempotency-key, rf operation show) and its timeout/kill/unknown outcomes to this bead.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the clause it answers; every pin returns a measured witness held to WITNESS):
 *  A, ACCEPTANCE[0]. The committing-render admission rule (judge): an rf-driving descriptor (a reactivefiber.* id, or a
 *    contract in rf's CLI family) whose contract names context.render without --no-commit is a committing render, and it must
 *    declare a non-read effectClass, name --idempotency-key, name rf operation show and carry a permission no read grant is;
 *    an rf-driving descriptor with no contract cannot be judged and is refused. A1 (effectClass): both real registrations and
 *    every rf-driving descriptor literal in src are noncommitting reads (zero findings), a planted committing literal read by
 *    the same src scanner draws every finding, and the rule refuses a committing render declared read while admitting write,
 *    external and unknown. A2 (--idempotency-key): the rule refuses a committing contract without the flag (prose naming the
 *    key included), and the live preview argv for both input arms carries --no-commit and no key (rf refuses the pair, exit 2).
 *  B, ACCEPTANCE[1], through a test-only committing stand-in (COMMIT_ID: write, reactivefiber:commit, a rule-compliant
 *    contract) whose provider spawns a stand-in rf with a committing argv, --idempotency-key <stable key> and no --no-commit,
 *    and never kills it (a commit may already be durable). B1: for each outcome the clause names (timeout, kill, unknown) the
 *    registry surfaces uncertain-effect ("Reconcile with the producer before retrying") and the stand-in records exactly one
 *    spawn. B2: Pi's runtime, through the Claude host, fails the run uncertain-effect after one spawn, its live retry control
 *    refuses the in-flight node, and a resume of the journal refuses uncertain-effect naming the producer with zero spawns.
 *  C, ACCEPTANCE[2], over the journal of a timed-out committing run. C1 (receipt states): no reader of them exists today - the
 *    reconcile roster offers the preview as the only reactivefiber evidence read, an evidence request naming an operation-show
 *    reader is refused, no src literal spells the leaf (with a positive control), and the rule refuses a committing contract
 *    that does not name rf operation show. C2 (not_found never concludes effect-absent): while the run is active the core
 *    refuses any acknowledgement; once settled, effect-absent citing the not-found read (outcome unavailable) and a returned
 *    preview read is operator-asserted, never producer-confirmed; the override after it is refused until the operator accepts
 *    the possible-duplicate risk; effect-confirmed on the failed read alone is refused.
 *  D, ACCEPTANCE[3], the negative guards. D1: the two preview descriptor literals are byte-stable (digests of their source
 *    text) and both registrations serve the same descriptor. D2: src's one SIGTERM-SIGKILL(500 ms) custody sits in
 *    nativeReactiveFiberRender, whose one spawn runs renderArgv (always --no-commit) and whose only callers are the preview's;
 *    the custody reaps a stand-in that ignores SIGTERM, spawned with --no-commit and no key. D3: hosts/local-detached.ts keeps
 *    NATIVE_GRANTS and NATIVE_CAPABILITIES as read grants and read capabilities, its reactivefiber case registers the preview
 *    alone, and the preview holds exactly NATIVE_GRANTS.reactivefiber. D4: the rule refuses a committing render holding no
 *    permission or only read grants, and the registry refuses the stand-in under the preview grant with zero spawns.
 * ANCHORS (outside this file): the tracker export (.beads/issues.jsonl, the bead's title and description only; later store
 * writes change neither) holds ACCEPTANCE verbatim, and each row's pins are exactly the clauses of its item, split
 * mechanically on "; " and " and "; src (the registrations, the descriptor literals, the custody and NATIVE_GRANTS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal and WITNESS's keys are exactly the pins.
 * NOT CLAIMED: A judges each descriptor's declared contract, not the argv its provider spawns (A2 and D2 read the one live rf
 * launch); the committing provider here is test-only, so its key derivation and its never-kill custody prove nothing about
 * a future provider's (B pins Pi's registry, runtime and resume around it, not the provider).
 * PARKED (owed by the cut that builds the committing render, once wb-x32 resolves to one): that capability's own registration
 * test, a stable key derived from the invocation, its reader of rf operation show (committed or exit 3 on 0.1.845; the five
 * receipt states once rf ships them) wired as RECONCILE_EVIDENCE_READS.reactivefiber evidence, and its write grant. Each
 * lands red here first: A1 (a new rf-driving src literal), C1 (a new evidence read or leaf spelling), D1-D3 (the preview).
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch, the only PATH entry, run by this
 * process's own node; src and the tracker export are only read.
 */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import {
  type CapabilityDescriptor,
  CapabilityError,
  CapabilityRegistry,
  type InvocationContext,
  type JsonValue,
} from "../src/workbench/capability-registry.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { REACTIVE_FIBER_CONTRACT_SOURCE, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { decideReconcile, mintEvidenceReceipt, type ReconcileDecision, type ReconcileDeps, type ReconcileRequest } from "../src/workbench/reconcile-decision.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import type { WorkflowRunStatus } from "../src/workflow/progress.js";
import { type EvidenceReceipt, RECONCILE_EVIDENCE_READS, reconcileGrant } from "../src/workflow/reconcile.js";
import { runWorkflow, type WorkflowControl, type WorkflowHost } from "../src/workflow/runtime.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = process.cwd();
const BEAD = "wb-jwc.5";
const EXPORT = ".beads/issues.jsonl";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const DETACHED = "src/workbench/hosts/local-detached.ts";
const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_GRANT = "reactivefiber:render";
const LEGACY_INPUT: JsonObject = { model: "m", task: "t" };
const VIEW_INPUT: JsonObject = { view: "orders.view", taskId: "t1" };
/** The test-only committing stand-in: a non-read class, a permission of its own and a contract the rule admits. */
const COMMIT_ID = "reactivefiber.render.commit";
const COMMIT_PERMISSION = "reactivefiber:commit";
const COMMIT_CONTRACT = "reactive-fiber.cli/v1 context.render --idempotency-key KEY, outcome by rf operation show OPERATION_ID";
const COMMIT_INPUT = {
  type: "object",
  properties: { model: { type: "string", minLength: 1 }, task: { type: "string", minLength: 1 } },
  required: ["model", "task"],
  additionalProperties: false,
};
const COMMIT_DESCRIPTOR: CapabilityDescriptor = {
  id: COMMIT_ID,
  version: "1.0.0",
  description: "Test-only stand-in for a future committing rf render (wb-jwc.5); src registers none",
  inputSchema: COMMIT_INPUT,
  effectClass: "write",
  permissions: [COMMIT_PERMISSION],
  supportedModes: ["invoke"],
  contractSource: COMMIT_CONTRACT,
};
/** The registry deadline the committing stand-in runs under, and how long the "hold" stand-in outlives it. */
const DEADLINE_MS = 250;
const HOLD_MS = 1500;
/** A committed render envelope (made-up rfo_/rft_/rfr_ ids): what a held stand-in prints after Pi stopped waiting. */
const COMMITTED: JsonObject = {
  schema: "reactive-fiber.cli/v1",
  ok: true,
  command: "context.render",
  operation_id: "rfo_censuscommittedrender0001",
  workspace: null,
  transaction_id: "rft_censuscommittedrender0001",
  result: { render_id: "rfr_censuscommittedrender0001", ephemeral: false },
  diagnostics: [],
};
/** Reconcile fixtures: a fixed clock and one local operator scope (made-up ids). */
const NOW = "2026-10-28T05:00:00Z";
const PRINCIPAL = "local-operator:1:s1";
const TASK_ID = "wf_census-jwc5";
const SESSION = "s1";
const SCRIPT = `export const meta = { name: "committing-render-posture", description: "wb-jwc.5 census probe" };\nreturn await node(${JSON.stringify(COMMIT_ID)}, ${JSON.stringify(LEGACY_INPUT)});`;

/** The bead's acceptance, verbatim from its export description (the ANCHOR test holds the whole list to the export). */
const ACCEPTANCE: readonly string[] = [
  "A registration test beside test/workbench-provider-lifecycle.test.ts asserts the committing descriptor's effectClass != read and its argv carries --idempotency-key <stable key>.",
  "On timeout/kill/unknown outcome the invoke path surfaces CapabilityError(uncertain-effect) and the runtime issues no second invocation (exactly one spawn asserted).",
  "Outcome resolution reads rf operation show receipt states (not_found/in_progress/committed/refused_before_commit/indeterminate, FOC/03:34@8a8b83e4d); not_found while an attempt may be in flight does not conclude effect-absent.",
  "Negative guards: the read-only preview registrations (providers/reactivefiber.ts:68,:142@9df9a03) stay byte-stable; the preview's SIGTERM-SIGKILL(500 ms) custody is never reused for the committing call; NATIVE_GRANTS.reactivefiber stays read-scoped for the preview (hosts/local-detached.ts:337@9df9a03) and the committing capability needs a new write grant.",
];
const OWED = `ARMED (${BEAD}): src now carries an rf-driving descriptor beyond the two preview literals. If it is a committing render, the parked acceptance is owed with it: its own registration test (${ACCEPTANCE[0]}), uncertain-effect with exactly one spawn on timeout, kill and unknown outcomes, outcome resolution through rf operation show that never reads exit 3 / not_found as effect-absent while an attempt may be in flight, and a new write grant.`;

/** The clauses of one acceptance item: split on "; ", then on " and " (mechanical, so the export decides the pin set). */
function clausesOf(item: string): string[] {
  return item.split("; ").flatMap((part) => part.split(" and "));
}
/** A Python list item as the export's ACCEPTANCE list spells it: double quotes exactly when the text holds a single quote. */
function listItem(text: string): string {
  return text.includes("'") && !text.includes('"') ? `"${text}"` : `'${text}'`;
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
  return mine[0];
}
function digest16(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex").slice(0, 16);
}

/* ---------------------------------------------------------------- the committing-render admission rule (row A) */

type Finding = "contract" | "effectClass" | "idempotency-key" | "operation-show" | "write-grant";
interface DescriptorFacts {
  readonly id: string;
  readonly effectClass: string;
  readonly permissions: readonly string[];
  readonly contractSource?: string;
}
interface Judged {
  readonly rf: boolean;
  readonly committing: boolean;
  readonly findings: readonly Finding[];
}
const RF_CONTRACT = /\brf@|reactive-fiber\.cli\//;
const RENDER = /\bcontext[.\s]+render\b/;
const NO_COMMIT = /(?:^|\s)--no-commit(?:\s|,|;|$)/;
const KEY_FLAG = /(?:^|\s)--idempotency-key(?:[\s=,;]|$)/;
const OPERATION_SHOW = /\boperation[.\s]+show\b/;
/** Judge one descriptor: a committing rf render must meet every clause; anything else draws nothing. */
function judge(facts: DescriptorFacts, readGrants: readonly string[]): Judged {
  const rf = facts.id.startsWith("reactivefiber.") || RF_CONTRACT.test(facts.contractSource ?? "");
  if (!rf) return { rf, committing: false, findings: [] };
  const contract = facts.contractSource;
  if (contract === undefined) return { rf, committing: true, findings: ["contract"] };
  const committing = RENDER.test(contract) && !NO_COMMIT.test(contract);
  if (!committing) return { rf, committing, findings: [] };
  const findings: Finding[] = [];
  if (facts.effectClass === "read") findings.push("effectClass");
  if (!KEY_FLAG.test(contract)) findings.push("idempotency-key");
  if (!OPERATION_SHOW.test(contract)) findings.push("operation-show");
  if (facts.permissions.length === 0 || facts.permissions.every((permission) => readGrants.includes(permission))) findings.push("write-grant");
  return { rf, committing, findings };
}
/** A committing render descriptor with one field changed: the rule's constructed cases. */
function committing(changes: Partial<DescriptorFacts>): DescriptorFacts {
  return { id: COMMIT_ID, effectClass: "write", permissions: [COMMIT_PERMISSION], contractSource: COMMIT_CONTRACT, ...changes };
}

/* ---------------------------------------------------------------- src readings (TypeScript AST) */

const parsed = new Map<string, ts.SourceFile>();
function sourceOf(path: string, text?: string): ts.SourceFile {
  const cached = text === undefined ? parsed.get(path) : undefined;
  if (cached !== undefined) return cached;
  const file = ts.createSourceFile(path, text ?? readFileSync(join(REPO, path), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  if (text === undefined) parsed.set(path, file);
  return file;
}
function srcFiles(): string[] {
  const files = readdirSync(join(REPO, "src"), { encoding: "utf8", recursive: true })
    .filter((path) => path.endsWith(".ts"))
    .map((path) => relative(REPO, join(REPO, "src", path)).split("\\").join("/"))
    .sort();
  expect(files.length, "the src walk reads the tree").toBeGreaterThan(100);
  expect(files).toContain(PROVIDER);
  return files;
}
function visit(node: ts.Node, each: (node: ts.Node) => void): void {
  each(node);
  ts.forEachChild(node, (child) => visit(child, each));
}
function unwrap(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isNonNullExpression(current)) {
    current = current.expression;
  }
  return current;
}
function nameOf(name: ts.PropertyName): string | undefined {
  return ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : undefined;
}
/** Module-level and local const bindings to a string literal, by name. */
function constStrings(file: ts.SourceFile): Map<string, string> {
  const bound = new Map<string, string>();
  visit(file, (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
      const value = unwrap(node.initializer);
      if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) bound.set(node.name.text, value.text);
    }
  });
  return bound;
}
function stringValue(node: ts.Expression | undefined, bound: Map<string, string>): string | undefined {
  if (node === undefined) return undefined;
  const value = unwrap(node);
  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) return value.text;
  if (ts.isIdentifier(value)) return bound.get(value.text);
  return undefined;
}
function property(literal: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  for (const member of literal.properties) {
    if (ts.isPropertyAssignment(member) && nameOf(member.name) === name) return member.initializer;
    if (ts.isShorthandPropertyAssignment(member) && member.name.text === name) return member.name;
  }
  return undefined;
}
function enclosingFunction(node: ts.Node): string {
  for (let current = node.parent; current !== undefined; current = current.parent) {
    if (ts.isFunctionDeclaration(current) && current.name !== undefined) return current.name.text;
  }
  return "<module>";
}
function calleeName(call: ts.CallExpression): string | undefined {
  const callee = unwrap(call.expression);
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  return undefined;
}
interface LiteralFacts extends DescriptorFacts {
  readonly file: string;
}
/** Every object literal in a module carrying both an id and an effectClass: a descriptor literal, read through its consts. */
function descriptorLiterals(path: string, text?: string): LiteralFacts[] {
  const file = sourceOf(path, text);
  const bound = constStrings(file);
  const found: LiteralFacts[] = [];
  visit(file, (node) => {
    if (!ts.isObjectLiteralExpression(node)) return;
    const effect = property(node, "effectClass");
    const id = property(node, "id");
    if (effect === undefined || id === undefined) return;
    const permissions = property(node, "permissions");
    const listed = permissions !== undefined && ts.isArrayLiteralExpression(unwrap(permissions))
      ? (unwrap(permissions) as ts.ArrayLiteralExpression).elements.flatMap((element) => {
          const value = stringValue(element, bound);
          return value === undefined ? [] : [value];
        })
      : [];
    const contract = stringValue(property(node, "contractSource"), bound);
    found.push({
      file: path,
      id: stringValue(id, bound) ?? "<unresolved>",
      effectClass: stringValue(effect, bound) ?? "<unresolved>",
      permissions: listed,
      ...(contract === undefined ? {} : { contractSource: contract }),
    });
  });
  return found;
}
/** NATIVE_GRANTS or NATIVE_CAPABILITIES as hosts/local-detached.ts declares it. */
function detachedMap(name: string): Record<string, string> {
  const file = sourceOf(DETACHED);
  const out: Record<string, string> = {};
  let seen = 0;
  visit(file, (node) => {
    if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name) || node.name.text !== name || node.initializer === undefined) return;
    seen++;
    const literal = unwrap(node.initializer);
    if (!ts.isObjectLiteralExpression(literal)) return;
    for (const member of literal.properties) {
      if (!ts.isPropertyAssignment(member)) continue;
      const key = nameOf(member.name);
      const value = stringValue(member.initializer, new Map());
      if (key !== undefined && value !== undefined) out[key] = value;
    }
  });
  expect(seen, `${DETACHED} declares ${name} once`).toBe(1);
  return out;
}
function readGrants(): string[] {
  return Object.values(detachedMap("NATIVE_GRANTS"));
}

/* ---------------------------------------------------------------- the stand-in rf and the committing stand-in */

type Behavior = "hold" | "kill" | "silent" | "commit" | "stubborn";
const STAND_IN: Record<Behavior, string> = {
  hold: `setTimeout(() => { process.stdout.write(${JSON.stringify(JSON.stringify(COMMITTED))}); process.exit(0); }, ${HOLD_MS});`,
  kill: 'process.kill(process.pid, "SIGKILL");',
  silent: "process.exit(0);",
  commit: `process.stdout.write(${JSON.stringify(JSON.stringify(COMMITTED))}); process.exit(0);`,
  stubborn: 'process.on("SIGTERM", () => {}); setInterval(() => {}, 1000);',
};
const scratches: string[] = [];
const oldPath = process.env.PATH;
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
/** A stand-in `rf`, the only PATH entry, run by this process's node: every spawn appends {pid, argv} to the returned log. */
function standInRf(behavior: Behavior): string {
  const folder = makeScratch("rf-committing-posture-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      `#!${process.execPath}`,
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify({ pid: process.pid, argv: process.argv.slice(2) }) + "\\n");`,
      STAND_IN[behavior],
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = folder;
  return log;
}
interface Spawn {
  readonly pid: number;
  readonly argv: readonly string[];
}
function spawnsOf(log: string): Spawn[] {
  if (!existsSync(log)) return [];
  return readFileSync(log, "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line) as Spawn);
}
/** A spawn's argv after `--workspace <root>`, which every Pi rf spawn leads with. */
function tailOf(spawned: Spawn | undefined): string[] {
  expect(spawned?.argv.slice(0, 2)).toStrictEqual(["--workspace", ROOT]);
  return [...(spawned?.argv ?? [])].slice(2);
}
async function until(condition: () => boolean, what: string, boundMs = 10_000): Promise<void> {
  const start = Date.now();
  while (!condition()) {
    if (Date.now() - start > boundMs) throw new Error(`timed out waiting for ${what}`);
    await new Promise((resolve) => setTimeout(resolve, 20));
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
/** The stand-in's stable request key: one key per request, so rf would replay a committed receipt rather than commit twice. */
function idempotencyKey(model: string, task: string): string {
  return `pi-census-${createHash("sha256").update(JSON.stringify([model, task])).digest("hex").slice(0, 16)}`;
}
interface CommitHarness {
  readonly registry: CapabilityRegistry;
  readonly settled: Promise<void>[];
}
/**
 * The test-only committing stand-in under DEADLINE_MS. Its provider spawns rf once with a committing argv and never kills
 * it: when the registry stops waiting the child runs on, as a render whose commit may already be durable must.
 */
function commitHarness(onSpawn?: () => void): CommitHarness {
  const registry = new CapabilityRegistry({ deadlineMs: DEADLINE_MS });
  const settled: Promise<void>[] = [];
  registry.register({
    descriptor: COMMIT_DESCRIPTOR,
    invoke: (input) => {
      const fields = input !== null && typeof input === "object" && !Array.isArray(input) ? input : {};
      const model = String(fields.model);
      const task = String(fields.task);
      const argv = ["--workspace", ROOT, "context", "render", "--model", model, "--task", task, "--idempotency-key", idempotencyKey(model, task), "--no-input", "--json"];
      const call = new Promise<JsonValue>((resolve, reject) => {
        const child = spawn("rf", argv, { stdio: ["ignore", "pipe", "ignore"] });
        onSpawn?.();
        const chunks: Buffer[] = [];
        child.stdout.on("data", (chunk: Buffer) => chunks.push(chunk));
        child.once("error", () => reject(new CapabilityError("transport", "rf could not launch")));
        child.once("close", (code, signal) => {
          if (signal !== null) return reject(new CapabilityError("transport", `rf ended by signal ${signal}`));
          const text = Buffer.concat(chunks).toString("utf8");
          if (text.trim() === "") return reject(new CapabilityError("transport", `rf exited ${String(code)} with no envelope on stdout`));
          try {
            resolve(JSON.parse(text) as JsonValue);
          } catch {
            reject(new CapabilityError("transport", "rf returned malformed JSON"));
          }
        });
      });
      settled.push(call.then(() => undefined, () => undefined));
      return call;
    },
  });
  return { registry, settled };
}
function contextOf(grants: readonly string[], signal: AbortSignal = new AbortController().signal): InvocationContext {
  return { grants: [...grants], signal };
}
interface Refusal {
  readonly category: string;
  readonly message: string;
}
async function refusalFrom(call: Promise<JsonValue>): Promise<Refusal> {
  const caught = await call.then(
    () => undefined,
    (error: unknown) => error,
  );
  if (!(caught instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(caught)}`);
  return { category: caught.category, message: caught.message };
}
const NEVER_QUERY: ClaudeQuery = () => {
  throw new Error("the census script calls node only: the Claude query is never invoked");
};
function claudeHost(registry: CapabilityRegistry, grants: readonly string[]): WorkflowHost {
  return createClaudeWorkflowHost({ cwd: ROOT, query: NEVER_QUERY, capabilities: registry, grants: [...grants] });
}
function nodeRows(entries: readonly WorkflowJournalEntry[]): JsonValue {
  return entries
    .filter((entry) => entry.kind === "node")
    .map((entry) => ({ index: entry.index ?? null, dispatched: entry.dispatched === true, effectClass: entry.effectClass ?? null, ok: entry.ok }));
}
interface TimedOutRun {
  readonly entries: WorkflowJournalEntry[];
  readonly status: string;
  readonly category: string | null;
  readonly retryWhileInFlight: boolean | null;
  readonly spawns: number;
  readonly log: string;
}
/** One run of the committing node through Pi's runtime and Claude host, against a stand-in that outlives the deadline. */
async function timedOutRun(): Promise<TimedOutRun> {
  const log = standInRf("hold");
  let control: WorkflowControl | undefined;
  let retryWhileInFlight: boolean | null = null;
  const harness = commitHarness(() => {
    retryWhileInFlight = control?.retry(0) ?? null;
  });
  const entries: WorkflowJournalEntry[] = [];
  const recorded = await runWorkflow({
    script: SCRIPT,
    host: claudeHost(harness.registry, [COMMIT_PERMISSION]),
    journal: {
      append: (entry) => {
        entries.push(entry);
      },
    },
    onControl: (live) => {
      control = live;
    },
  });
  await Promise.all(harness.settled);
  return {
    entries,
    status: recorded.status,
    category: recorded.capabilityError?.category ?? null,
    retryWhileInFlight,
    spawns: spawnsOf(log).length,
    log,
  };
}

/* ---------------------------------------------------------------- reconcile fixtures (row C) */

const RECONCILE_GRANTS = ["workbench:observe", reconcileGrant("reactivefiber", "acknowledge"), reconcileGrant("reactivefiber", "override")];
function reconcileRequest(action: ReconcileRequest["action"], params: JsonObject, grants: readonly string[] = RECONCILE_GRANTS): ReconcileRequest {
  return {
    action,
    taskId: TASK_ID,
    position: 0,
    grants,
    scope: { workspace: ROOT, principal: PRINCIPAL },
    sessionId: SESSION,
    principal: { id: PRINCIPAL, role: "local-operator" },
    params,
  };
}
function reconcileDeps(entries: readonly WorkflowJournalEntry[], status: WorkflowRunStatus, receipts: readonly EvidenceReceipt[] = []): ReconcileDeps {
  return {
    task: { status, observationScope: { sessionId: SESSION, workspace: ROOT, principal: PRINCIPAL } },
    entries,
    receipts,
    currentEffectClass: (capabilityId) => (capabilityId === PREVIEW_ID ? "read" : capabilityId === COMMIT_ID ? "write" : undefined),
    now: () => NOW,
  };
}
function outcomeOf(decision: ReconcileDecision): JsonObject {
  if (decision.decision === "denied") return { decision: decision.decision, policy: decision.policy };
  return { decision: decision.decision };
}
/** An evidence read of the preview for the committing position: refused (outcome unavailable) or returned. */
function previewReceipt(row: WorkflowJournalEntry, returned: boolean): EvidenceReceipt {
  return mintEvidenceReceipt({
    taskId: TASK_ID,
    position: row.index ?? 0,
    producer: "reactivefiber",
    capabilityId: PREVIEW_ID,
    input: LEGACY_INPUT,
    requestedAt: NOW,
    observedAt: NOW,
    ...(returned ? { result: { contract: "reactivefiber.render.preview/v1", workspaceRoot: ROOT, source: fullShapeRf(ROOT) } } : { failure: "unavailable" as const }),
    recordedNativeRefs: row.nativeRefs ?? [],
  });
}
const SPELLS_OPERATION_SHOW = /\boperation[\s._-]*show\b/i;
/** Every string and template literal of a module that spells an rf operation-show leaf. */
function operationShowSpellings(path: string, text?: string): string[] {
  const found: string[] = [];
  visit(sourceOf(path, text), (node) => {
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && SPELLS_OPERATION_SHOW.test(node.text)) {
      found.push(`${path}:${node.text}`);
    }
  });
  return found;
}

/* ---------------------------------------------------------------- judged rows */

interface Pin {
  readonly id: string;
  readonly clause: string;
  /** Runs the pin's measurements and returns its witness, held to WITNESS[id]. */
  readonly run: () => Promise<unknown>;
}
interface Row {
  readonly id: string;
  readonly acceptance: number;
  readonly pins: readonly Pin[];
}
const [A0, A1] = clausesOf(ACCEPTANCE[0]);
const [B0, B1] = clausesOf(ACCEPTANCE[1]);
const [C0, C1] = clausesOf(ACCEPTANCE[2]);
const [D0, D1, D2, D3] = clausesOf(ACCEPTANCE[3]);

const ROWS: readonly Row[] = [
  {
    id: "A",
    acceptance: 0,
    pins: [
      {
        id: "A1",
        clause: A0,
        run: async () => {
          const grants = readGrants();
          const registered = (register: (registry: CapabilityRegistry) => void) => {
            const registry = new CapabilityRegistry();
            register(registry);
            return registry
              .catalogSnapshot()
              .map(({ descriptor }) => ({ id: descriptor.id, effectClass: descriptor.effectClass, ...judge(descriptor, grants) }))
              .filter((row) => row.rf);
          };
          const native = registered((registry) => registerNativeReactiveFiberRender(registry, ROOT));
          const injected = registered((registry) =>
            registerReactiveFiberRender(registry, () => Promise.reject(new Error("the census never invokes the injected reader")), ROOT),
          );
          const literals = srcFiles().flatMap((path) => descriptorLiterals(path));
          expect(literals.length, "the src scan reads descriptor literals").toBeGreaterThanOrEqual(2);
          const rfLiterals = literals
            .map((literal) => ({ file: literal.file, id: literal.id, effectClass: literal.effectClass, ...judge(literal, grants) }))
            .filter((row) => row.rf);
          const planted = descriptorLiterals(
            "planted.ts",
            'const C = "rf@0.1.845:reactive-fiber.cli/v1 context.render";\nregistry.register({ descriptor: { id: "reactivefiber.render.commit", effectClass: "read", permissions: ["reactivefiber:render"], contractSource: C } });',
          ).map((literal) => judge(literal, grants).findings);
          const constructed = {
            read: judge(committing({ effectClass: "read" }), grants).findings,
            write: judge(committing({ effectClass: "write" }), grants).findings,
            external: judge(committing({ effectClass: "external" }), grants).findings,
            unknown: judge(committing({ effectClass: "unknown" }), grants).findings,
            noContract: judge({ id: COMMIT_ID, effectClass: "write", permissions: [COMMIT_PERMISSION] }, grants).findings,
            stand: judge(COMMIT_DESCRIPTOR, grants).findings,
          };
          expect(native).toStrictEqual([{ id: PREVIEW_ID, effectClass: "read", rf: true, committing: false, findings: [] }]);
          expect(injected).toStrictEqual(native);
          expect(rfLiterals, OWED).toStrictEqual([
            { file: PROVIDER, id: PREVIEW_ID, effectClass: "read", rf: true, committing: false, findings: [] },
            { file: PROVIDER, id: PREVIEW_ID, effectClass: "read", rf: true, committing: false, findings: [] },
          ]);
          expect(planted).toStrictEqual([["effectClass", "idempotency-key", "operation-show", "write-grant"]]);
          expect(constructed.read).toStrictEqual(["effectClass"]);
          return { native, injected, rfLiterals, planted, constructed };
        },
      },
      {
        id: "A2",
        clause: A1,
        run: async () => {
          const grants = readGrants();
          const rule = {
            withoutFlag: judge(committing({ contractSource: "reactive-fiber.cli/v1 context.render, outcome by rf operation show" }), grants).findings,
            proseKey: judge(committing({ contractSource: "reactive-fiber.cli/v1 context.render with an idempotency key, outcome by rf operation show" }), grants).findings,
            withFlag: judge(committing({}), grants).findings,
          };
          const argv: JsonObject = {};
          for (const [arm, input] of [["legacy", LEGACY_INPUT], ["view", VIEW_INPUT]] as const) {
            const log = standInRf("silent");
            const registry = new CapabilityRegistry();
            registerNativeReactiveFiberRender(registry, ROOT);
            const refusal = await refusalFrom(registry.invoke(PREVIEW_ID, input, contextOf([PREVIEW_GRANT])));
            const spawned = spawnsOf(log);
            expect(refusal.category).toBe("transport");
            expect(spawned).toHaveLength(1);
            argv[arm] = tailOf(spawned[0]);
          }
          expect(rule.withoutFlag).toStrictEqual(["idempotency-key"]);
          expect(rule.proseKey).toStrictEqual(["idempotency-key"]);
          for (const tail of Object.values(argv)) {
            expect(tail).toContain("--no-commit");
            expect(tail).not.toContain("--idempotency-key");
          }
          return { rule, argv };
        },
      },
    ],
  },
  {
    id: "B",
    acceptance: 1,
    pins: [
      {
        id: "B1",
        clause: B0,
        run: async () => {
          const outcomes = /^On ([a-z/]+) outcome /.exec(B0)?.[1]?.split("/") ?? [];
          const behaviors: Record<string, Behavior> = { timeout: "hold", kill: "kill", unknown: "silent" };
          expect(outcomes).toStrictEqual(Object.keys(behaviors));
          const measured: JsonObject = {};
          for (const outcome of outcomes) {
            const log = standInRf(behaviors[outcome]);
            const harness = commitHarness();
            const refusal = await refusalFrom(harness.registry.invoke(COMMIT_ID, LEGACY_INPUT, contextOf([COMMIT_PERMISSION])));
            await Promise.all(harness.settled);
            const spawned = spawnsOf(log);
            expect(refusal.category).toBe("uncertain-effect");
            expect(refusal.message.endsWith("Reconcile with the producer before retrying.")).toBe(true);
            expect(spawned).toHaveLength(1);
            measured[outcome] = { ...refusal, spawns: spawned.length, argv: tailOf(spawned[0]) };
          }
          return measured;
        },
      },
      {
        id: "B2",
        clause: B1,
        run: async () => {
          const recorded = await timedOutRun();
          const harness = commitHarness();
          const resumed = await runWorkflow({ script: SCRIPT, host: claudeHost(harness.registry, [COMMIT_PERMISSION]), journal: { entries: recorded.entries } });
          await Promise.all(harness.settled);
          const resumeSpawns = spawnsOf(recorded.log).length - recorded.spawns;
          const error = resumed.error ?? "";
          expect(recorded.status).toBe("failed");
          expect(recorded.category).toBe("uncertain-effect");
          expect(recorded.spawns).toBe(1);
          expect(recorded.retryWhileInFlight).toBe(false);
          expect(resumed.status).toBe("failed");
          expect(resumed.capabilityError?.category).toBe("uncertain-effect");
          expect(resumeSpawns).toBe(0);
          return {
            recorded: { status: recorded.status, category: recorded.category, retryWhileInFlight: recorded.retryWhileInFlight, spawns: recorded.spawns, nodeRows: nodeRows(recorded.entries) },
            resumed: {
              status: resumed.status,
              category: resumed.capabilityError?.category ?? null,
              namesProducer: error.includes('producer "reactivefiber"'),
              namesReconcile: error.includes("workflow_reconcile"),
              replayedNodeCount: resumed.replayedNodeCount,
              reconciledNodeCount: resumed.reconciledNodeCount,
              spawns: resumeSpawns,
            },
          };
        },
      },
    ],
  },
  {
    id: "C",
    acceptance: 2,
    pins: [
      {
        id: "C1",
        clause: C0,
        run: async () => {
          const run = await timedOutRun();
          const inspect = decideReconcile(reconcileRequest("inspect", {}, ["workbench:observe"]), reconcileDeps(run.entries, "failed"));
          const roster = inspect.decision === "inspect"
            ? inspect.roster.positions.map((position) => ({
                position: position.position,
                capabilityId: position.capabilityId,
                effectClass: position.effectClass,
                producer: position.producer,
                state: position.state,
                evidenceReads: [...position.evidenceReads],
              }))
            : [];
          const evidence = (capabilityId: string) =>
            outcomeOf(decideReconcile(reconcileRequest("evidence", { evidence: { capabilityId, input: LEGACY_INPUT } }, ["workbench:observe"]), reconcileDeps(run.entries, "failed")));
          const spellings = srcFiles().flatMap((path) => operationShowSpellings(path));
          const control = operationShowSpellings("control.ts", 'const argv = ["--json"]; const line = "rf operation show rfo_x"; const dotted = `operation.show`;').length;
          const grants = readGrants();
          const result = {
            evidenceReads: [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])],
            roster,
            evidence: { operationShow: evidence("reactivefiber.operation.show"), preview: evidence(PREVIEW_ID) },
            srcSpellings: spellings,
            control,
            rule: {
              withoutReader: judge(committing({ contractSource: "reactive-fiber.cli/v1 context.render --idempotency-key KEY" }), grants).findings,
              withReader: judge(committing({}), grants).findings,
            },
          };
          expect(result.evidenceReads).toStrictEqual([PREVIEW_ID]);
          expect(result.srcSpellings).toStrictEqual([]);
          expect(result.control).toBe(2);
          return result;
        },
      },
      {
        id: "C2",
        clause: C1,
        run: async () => {
          const run = await timedOutRun();
          const rows = run.entries.filter((entry) => entry.kind === "node");
          const row = rows[rows.length - 1];
          expect(row?.index).toBe(0);
          const notFound = previewReceipt(row, false);
          const returned = previewReceipt(row, true);
          const absent = (receiptIds: readonly string[]): JsonObject => ({
            reason: "rf operation show answered exit 3 (no committed render carries the id)",
            determination: "effect-absent",
            receiptIds: [...receiptIds],
          });
          const inFlight = {
            running: outcomeOf(decideReconcile(reconcileRequest("acknowledge", absent([notFound.receiptId])), reconcileDeps(run.entries, "running", [notFound]))),
            paused: outcomeOf(decideReconcile(reconcileRequest("acknowledge", absent([notFound.receiptId])), reconcileDeps(run.entries, "paused", [notFound]))),
          };
          const acknowledged = decideReconcile(reconcileRequest("acknowledge", absent([notFound.receiptId, returned.receiptId])), reconcileDeps(run.entries, "failed", [notFound, returned]));
          if (acknowledged.decision !== "acknowledge" || acknowledged.entry.reconcile?.decision !== "acknowledge") throw new Error(`expected an acknowledgement, got ${acknowledged.decision}`);
          const record = acknowledged.entry.reconcile;
          const withAck = [...run.entries, acknowledged.entry];
          const override = (accept: boolean): JsonObject => {
            const decided = decideReconcile(
              reconcileRequest("override", {
                reason: "re-run the committing render once",
                acknowledgementId: record.acknowledgementId,
                confirmed: true,
                confirmPosition: 0,
                confirmCapabilityId: COMMIT_ID,
                ...(accept ? { acceptDuplicateRisk: true } : {}),
              }),
              reconcileDeps(withAck, "failed", [notFound, returned]),
            );
            return decided.decision === "override" && decided.entry.reconcile?.decision === "override"
              ? { decision: decided.decision, duplicateRisk: decided.entry.reconcile.duplicateRisk }
              : outcomeOf(decided);
          };
          const confirmedOnFailed = outcomeOf(
            decideReconcile(
              reconcileRequest("acknowledge", { reason: "assume it committed", determination: "effect-confirmed", receiptIds: [notFound.receiptId] }),
              reconcileDeps(run.entries, "failed", [notFound]),
            ),
          );
          const result = {
            inFlight,
            receipts: [notFound, returned].map((receipt) => ({ outcome: receipt.outcome, binding: receipt.binding })),
            settled: { determination: record.determination, evidenceClass: record.evidenceClass, settlement: record.settlement },
            override: { unaccepted: override(false), accepted: override(true) },
            confirmedOnFailed,
          };
          expect(result.settled.evidenceClass).toBe("operator-asserted");
          expect(result.override.unaccepted).toStrictEqual({ decision: "denied", policy: "duplicate-risk-unaccepted" });
          return result;
        },
      },
    ],
  },
  {
    id: "D",
    acceptance: 3,
    pins: [
      {
        id: "D1",
        clause: D0,
        run: async () => {
          const file = sourceOf(PROVIDER);
          const sites: JsonObject[] = [];
          visit(file, (node) => {
            if (!ts.isCallExpression(node) || calleeName(node) !== "register") return;
            const argument = node.arguments[0];
            if (argument === undefined || !ts.isObjectLiteralExpression(argument)) return;
            const descriptor = property(argument, "descriptor");
            if (descriptor === undefined || !ts.isObjectLiteralExpression(descriptor)) return;
            const text = descriptor.getText(file);
            sites.push({ fn: enclosingFunction(node), bytes: Buffer.byteLength(text), sha256_16: digest16(text) });
          });
          const served = (register: (registry: CapabilityRegistry) => void): string => {
            const registry = new CapabilityRegistry();
            register(registry);
            const snapshot = registry.catalogSnapshot();
            expect(snapshot).toHaveLength(1);
            expect(snapshot[0]?.descriptor.contractSource).toBe(REACTIVE_FIBER_CONTRACT_SOURCE);
            return digest16(JSON.stringify({ ...snapshot[0], descriptor: { ...snapshot[0]?.descriptor, contractSource: "REACTIVE_FIBER_CONTRACT_SOURCE" } }));
          };
          const native = served((registry) => registerNativeReactiveFiberRender(registry, ROOT));
          const injected = served((registry) => registerReactiveFiberRender(registry, () => Promise.reject(new Error("never invoked")), ROOT));
          expect(sites.map((site) => site.fn)).toStrictEqual(["registerReactiveFiberRender", "registerNativeReactiveFiberRender"]);
          return { sites, served: { native, injected } };
        },
      },
      {
        id: "D2",
        clause: D1,
        run: async () => {
          const custody: JsonObject[] = [];
          for (const path of srcFiles()) {
            const file = sourceOf(path);
            visit(file, (node) => {
              if (!ts.isCallExpression(node) || calleeName(node) !== "kill") return;
              const signal = node.arguments[0];
              if (signal === undefined || !ts.isStringLiteral(signal) || !["SIGTERM", "SIGKILL"].includes(signal.text)) return;
              let delayMs: number | null = null;
              for (let current = node.parent; current !== undefined; current = current.parent) {
                if (ts.isCallExpression(current) && calleeName(current) === "setTimeout") {
                  const delay = current.arguments[1];
                  delayMs = delay !== undefined && ts.isNumericLiteral(delay) ? Number(delay.text) : null;
                  break;
                }
              }
              custody.push({ file: path, fn: enclosingFunction(node), signal: signal.text, delayMs });
            });
          }
          const provider = sourceOf(PROVIDER);
          const spawns: JsonObject[] = [];
          const renderArgv: string[] = [];
          visit(provider, (node) => {
            if (ts.isCallExpression(node) && calleeName(node) === "spawn") {
              const binary = node.arguments[0];
              const argv = node.arguments[1];
              let source: string | null = null;
              if (argv !== undefined && ts.isIdentifier(argv)) {
                visit(provider, (inner) => {
                  if (
                    ts.isVariableDeclaration(inner) &&
                    ts.isIdentifier(inner.name) &&
                    inner.name.text === argv.text &&
                    enclosingFunction(inner) === enclosingFunction(node) &&
                    inner.initializer !== undefined &&
                    ts.isCallExpression(inner.initializer)
                  ) {
                    source = calleeName(inner.initializer) ?? null;
                  }
                });
              }
              spawns.push({ fn: enclosingFunction(node), binary: binary !== undefined && ts.isStringLiteral(binary) ? binary.text : null, argvFrom: source });
            }
            if (ts.isFunctionDeclaration(node) && node.name?.text === "renderArgv") {
              visit(node, (inner) => {
                if (ts.isReturnStatement(inner) && inner.expression !== undefined && ts.isArrayLiteralExpression(inner.expression)) {
                  for (const element of inner.expression.elements) if (ts.isStringLiteral(element)) renderArgv.push(element.text);
                }
              });
            }
          });
          const callers = new Set<string>();
          for (const path of srcFiles()) {
            visit(sourceOf(path), (node) => {
              if (ts.isCallExpression(node) && calleeName(node) === "nativeReactiveFiberRender") callers.add(`${path}#${enclosingFunction(node)}`);
            });
          }
          const log = standInRf("stubborn");
          const registry = new CapabilityRegistry();
          registerNativeReactiveFiberRender(registry, ROOT);
          const controller = new AbortController();
          const call = refusalFrom(registry.invoke(PREVIEW_ID, LEGACY_INPUT, contextOf([PREVIEW_GRANT], controller.signal)));
          await until(() => spawnsOf(log).length === 1, "the stand-in to start");
          controller.abort();
          const refusal = await call;
          const [child] = spawnsOf(log);
          await until(() => child !== undefined && !alive(child.pid), "the custody to reap the stand-in");
          const reaped = { category: refusal.category, spawns: spawnsOf(log).length, argv: tailOf(child), alive: child === undefined ? null : alive(child.pid) };
          expect(custody.map((site) => site.fn)).toStrictEqual(["nativeReactiveFiberRender", "nativeReactiveFiberRender"]);
          expect(reaped.argv).toContain("--no-commit");
          expect(reaped.argv).not.toContain("--idempotency-key");
          return { custody, spawns, renderArgv, callers: [...callers].sort(), reaped };
        },
      },
      {
        id: "D3",
        clause: D2,
        run: async () => {
          const grants = detachedMap("NATIVE_GRANTS");
          const capabilities = detachedMap("NATIVE_CAPABILITIES");
          const file = sourceOf(DETACHED);
          const reactivefiberCase: string[] = [];
          visit(file, (node) => {
            if (!ts.isFunctionDeclaration(node) || node.name?.text !== "registryFor") return;
            visit(node, (inner) => {
              if (!ts.isCaseClause(inner) || !ts.isStringLiteral(inner.expression) || inner.expression.text !== "reactivefiber") return;
              for (const statement of inner.statements) {
                visit(statement, (call) => {
                  if (ts.isCallExpression(call)) reactivefiberCase.push(calleeName(call) ?? "<computed>");
                });
              }
            });
          });
          const registry = new CapabilityRegistry();
          registerNativeReactiveFiberRender(registry, ROOT);
          const preview = registry.catalogSnapshot().map(({ descriptor }) => ({ id: descriptor.id, effectClass: descriptor.effectClass, permissions: [...descriptor.permissions] }));
          expect(preview).toStrictEqual([{ id: capabilities.reactivefiber, effectClass: "read", permissions: [grants.reactivefiber] }]);
          return { grants, capabilities, reactivefiberCase, preview };
        },
      },
      {
        id: "D4",
        clause: D3,
        run: async () => {
          const grants = readGrants();
          const rule = {
            none: judge(committing({ permissions: [] }), grants).findings,
            previewGrant: judge(committing({ permissions: [PREVIEW_GRANT] }), grants).findings,
            everyReadGrant: judge(committing({ permissions: grants }), grants).findings,
            previewAndOwn: judge(committing({ permissions: [PREVIEW_GRANT, COMMIT_PERMISSION] }), grants).findings,
            own: judge(committing({ permissions: [COMMIT_PERMISSION] }), grants).findings,
          };
          const log = standInRf("commit");
          const harness = commitHarness();
          const underPreviewGrant = await refusalFrom(harness.registry.invoke(COMMIT_ID, LEGACY_INPUT, contextOf([PREVIEW_GRANT])));
          const previewSpawns = spawnsOf(log).length;
          const reading = await harness.registry.invoke(COMMIT_ID, LEGACY_INPUT, contextOf([COMMIT_PERMISSION]));
          await Promise.all(harness.settled);
          expect(rule.previewGrant).toStrictEqual(["write-grant"]);
          expect(underPreviewGrant.category).toBe("authorization");
          expect(previewSpawns).toBe(0);
          return {
            rule,
            underPreviewGrant: { ...underPreviewGrant, spawns: previewSpawns },
            underOwnGrant: { committed: JSON.stringify(reading) === JSON.stringify(COMMITTED), spawns: spawnsOf(log).length },
          };
        },
      },
    ],
  },
];

/** Every pin's measured witness, frozen at base cd8927f and re-measured unchanged at bb96515. */
const WITNESS: Readonly<Record<string, JsonValue>> = {
  A1: {
    native: [{"id": "reactivefiber.render.preview", "effectClass": "read", "rf": true, "committing": false, "findings": []}],
    injected: [{"id": "reactivefiber.render.preview", "effectClass": "read", "rf": true, "committing": false, "findings": []}],
    rfLiterals: [{"file": "src/workbench/providers/reactivefiber.ts", "id": "reactivefiber.render.preview", "effectClass": "read", "rf": true, "committing": false, "findings": []}, {"file": "src/workbench/providers/reactivefiber.ts", "id": "reactivefiber.render.preview", "effectClass": "read", "rf": true, "committing": false, "findings": []}],
    planted: [["effectClass", "idempotency-key", "operation-show", "write-grant"]],
    constructed: {"read": ["effectClass"], "write": [], "external": [], "unknown": [], "noContract": ["contract"], "stand": []},
  },
  A2: {
    rule: {"withoutFlag": ["idempotency-key"], "proseKey": ["idempotency-key"], "withFlag": []},
    argv: {"legacy": ["context", "render", "--model", "m", "--task", "t", "--no-commit", "--no-input", "--json"], "view": ["context", "render", "--view", "orders.view", "--task-id", "t1", "--no-commit", "--no-input", "--json"]},
  },
  B1: {
    timeout: {"category": "uncertain-effect", "message": "Capability reactivefiber.render.commit has an uncertain external effect: Capability reactivefiber.render.commit exceeded its deadline of 250ms.. Reconcile with the producer before retrying.", "spawns": 1, "argv": ["context", "render", "--model", "m", "--task", "t", "--idempotency-key", "pi-census-cbaa2cbef0260cf9", "--no-input", "--json"]},
    kill: {"category": "uncertain-effect", "message": "Capability reactivefiber.render.commit has an uncertain external effect: rf ended by signal SIGKILL. Reconcile with the producer before retrying.", "spawns": 1, "argv": ["context", "render", "--model", "m", "--task", "t", "--idempotency-key", "pi-census-cbaa2cbef0260cf9", "--no-input", "--json"]},
    unknown: {"category": "uncertain-effect", "message": "Capability reactivefiber.render.commit has an uncertain external effect: rf exited 0 with no envelope on stdout. Reconcile with the producer before retrying.", "spawns": 1, "argv": ["context", "render", "--model", "m", "--task", "t", "--idempotency-key", "pi-census-cbaa2cbef0260cf9", "--no-input", "--json"]},
  },
  B2: {
    recorded: {"status": "failed", "category": "uncertain-effect", "retryWhileInFlight": false, "spawns": 1, "nodeRows": [{"index": 0, "dispatched": true, "effectClass": "write", "ok": false}, {"index": 0, "dispatched": false, "effectClass": "write", "ok": false}]},
    resumed: {"status": "failed", "category": "uncertain-effect", "namesProducer": true, "namesReconcile": true, "replayedNodeCount": 0, "reconciledNodeCount": 0, "spawns": 0},
  },
  C1: {
    evidenceReads: ["reactivefiber.render.preview"],
    roster: [{"position": 0, "capabilityId": "reactivefiber.render.commit", "effectClass": "write", "producer": "reactivefiber", "state": "pending", "evidenceReads": ["reactivefiber.render.preview"]}],
    evidence: {"operationShow": {"decision": "denied", "policy": "malformed-request"}, "preview": {"decision": "evidence"}},
    srcSpellings: [],
    control: 2,
    rule: {"withoutReader": ["operation-show"], "withReader": []},
  },
  C2: {
    inFlight: {"running": {"decision": "denied", "policy": "task-active"}, "paused": {"decision": "denied", "policy": "task-active"}},
    receipts: [{"outcome": "unavailable", "binding": "operator-asserted"}, {"outcome": "returned", "binding": "operator-asserted"}],
    settled: {"determination": "effect-absent", "evidenceClass": "operator-asserted", "settlement": "none"},
    override: {"unaccepted": {"decision": "denied", "policy": "duplicate-risk-unaccepted"}, "accepted": {"decision": "override", "duplicateRisk": "possible-duplicate"}},
    confirmedOnFailed: {"decision": "denied", "policy": "effect-confirmed-without-evidence"},
  },
  D1: {
    sites: [{"fn": "registerReactiveFiberRender", "bytes": 353, "sha256_16": "ee650e97701c3fd4"}, {"fn": "registerNativeReactiveFiberRender", "bytes": 358, "sha256_16": "de887b1d6381f563"}],
    served: {"native": "43a84a5710536d5e", "injected": "0a31595c97763f04"},
  },
  D2: {
    custody: [{"file": "src/workbench/providers/reactivefiber.ts", "fn": "nativeReactiveFiberRender", "signal": "SIGTERM", "delayMs": null}, {"file": "src/workbench/providers/reactivefiber.ts", "fn": "nativeReactiveFiberRender", "signal": "SIGKILL", "delayMs": 500}],
    spawns: [{"fn": "nativeReactiveFiberRender", "binary": "rf", "argvFrom": "renderArgv"}],
    renderArgv: ["--workspace", "context", "render", "--no-commit", "--no-input", "--json"],
    callers: ["src/workbench/providers/reactivefiber.ts#nativeReactiveFiberPreview", "src/workbench/providers/reactivefiber.ts#registerNativeReactiveFiberRender"],
    reaped: {"category": "transport", "spawns": 1, "argv": ["context", "render", "--model", "m", "--task", "t", "--no-commit", "--no-input", "--json"], "alive": false},
  },
  D3: {
    grants: {"forge": "forge:inspect", "hyperunix": "hyperunix:read", "reactivefiber": "reactivefiber:render", "furnace-observe": "furnace:inspect"},
    capabilities: {"forge": "forge.gate.status", "hyperunix": "hyperunix.find", "reactivefiber": "reactivefiber.render.preview", "furnace-observe": "furnace.run.inspect"},
    reactivefiberCase: ["registerNativeReactiveFiberRender"],
    preview: [{"id": "reactivefiber.render.preview", "effectClass": "read", "permissions": ["reactivefiber:render"]}],
  },
  D4: {
    rule: {"none": ["write-grant"], "previewGrant": ["write-grant"], "everyReadGrant": ["write-grant"], "previewAndOwn": [], "own": []},
    underPreviewGrant: {"category": "authorization", "message": "Permission denied for capability reactivefiber.render.commit (invoke).", "spawns": 0},
    underOwnGrant: {"committed": true, "spawns": 1},
  },
};

describe("wb-jwc.5: the committing rf render posture, pinned while Pi registers none", () => {
  for (const row of ROWS) {
    describe(`${row.id} (ACCEPTANCE[${row.acceptance}])`, () => {
      for (const pin of row.pins) {
        it(`${pin.id}: ${pin.clause}`, async () => {
          expect(await pin.run()).toStrictEqual(WITNESS[pin.id]);
        }, 60_000);
      }
    });
  }

  it("ANCHOR: the export row carries exactly the ACCEPTANCE quoted here, and each row's pins are exactly its item's clauses", () => {
    const row = exportRow();
    expect(row.title.startsWith("[RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R5] Any future committing rf capability shall register with a non-read effectClass, pass a stable --idempotency-key on the render argv")).toBe(true);
    expect(row.description).toContain(`ACCEPTANCE: [${ACCEPTANCE.map(listItem).join(", ")}]`);
    expect(ROWS.map((judged) => judged.acceptance)).toStrictEqual(ACCEPTANCE.map((_, index) => index));
    for (const judged of ROWS) expect(judged.pins.map((pin) => pin.clause)).toStrictEqual(clausesOf(ACCEPTANCE[judged.acceptance]));
  });

  it("FROZEN SHAPE (standing rule 16): ROWS' ids and pin counts, and WITNESS keyed by exactly the pins", () => {
    expect(ROWS.map((judged) => `${judged.id}:${judged.pins.length}`)).toStrictEqual(["A:2", "B:2", "C:2", "D:4"]);
    expect(Object.keys(WITNESS)).toStrictEqual(ROWS.flatMap((judged) => judged.pins.map((pin) => pin.id)));
  });
});
