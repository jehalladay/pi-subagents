/**
 * wb-a9l2.8 (RF-HARNESS2-FEDERATED-PEER-R8, program-triage-2026-10-22): no Pi surface mutates a published shared rf
 * workspace graph except through rf's existing candidate graph authorization/publication process, and Pi treats any
 * exported federation effect as a separately declared and authorized operation, never an implicit side effect of a read.
 * Source: "5. Do not mutate published shared workspace graphs without RF-CLI's existing candidate graph
 * authorization/publication process. Exported effects remain separately declared/authorized operations."
 * (ReactiveFiberCLI docs/programs/harness2-federated-peer-2026-10-20/README.md:26@6a251bf73af5). Gating: none for the
 * prohibition; the exported-effects surface RFCLI-H2-04 (README:36) is unshipped, so no exported-effect reader is added or
 * faked here.
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read-only git show by the cutting seat):
 * - src/reactive_fiber_cli/cli/registry.py:794-895 registers sixteen graph leaves, each through _read (mutates=False) or
 *   _write (mutates=True); RF_GRAPH_LEAVES below copies them in registry order with each row's line. The eight _write
 *   leaves are the forbidden set (MUTATING): the candidate leaves, patch and its three lowerings, publish and rollback.
 *   No leaf, option or help text at the pin spells a "candidate apply" verb (git grep over src, rc 1): applying an edit to a
 *   candidate is graph patch and its lowerings ("apply a typed patch document to an edit candidate", parser.py:3052).
 * - context.render, Pi's one rf verb, is itself registered mutates=True with dry_run_flag NO_COMMIT_FLAG
 *   (registry.py:961-967), and NO_COMMIT_FLAG is "--no-commit" (registry.py:192), so the flag is what keeps Pi's render a read.
 * - rf keeps its workspace in WORKSPACE_DIR_NAME ".reactive-fiber" (domain/workspace/locator.py:33) and the declared graph
 *   document at DEFAULT_GRAPH_PATH "graphs/context.toml" (domain/workspace/layout.py:83): GRAPH_DOCUMENT, the spelling a
 *   direct graph write would need.
 * - The render result's effects ledger holds only denied or not_executed rows in rf v1; "executed" is minted only by a
 *   post-commit executor rf does not ship (schemas/cli/context.render.schema.json, result.effects.items.status).
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 every child-process call in src whose binary is a string literal naming rf: exactly one site,
 *    the spawn in nativeReactiveFiberRender (providers/reactivefiber.ts), its argv the renderArgv result; A2 no src string
 *    or template literal and no argv array spells a MUTATING leaf (floors: the src walk and the live context render argv);
 *    A3 renderArgv's literal argv: verb context render, tail --no-commit --no-input --json, so every form carries the
 *    producer's dry-run flag; A4 the native and the injected registration each hold exactly one reactivefiber.*
 *    descriptor, the preview, effectClass read, contractSource the carrier naming the non-committing render, and
 *    RECONCILE_EVIDENCE_READS.reactivefiber is the preview only (src/workflow/reconcile.ts:67); A5 the descriptor
 *    literals in src: two reactivefiber.* registration sites, both the preview with effectClass "read".
 *  B, acceptance (b). committingFindings judges every reactivefiber.* descriptor: one whose contractSource names the
 *    non-committing render (context.render --no-commit) and no MUTATING leaf or GRAPH_DOCUMENT path is a read; any other is
 *    committing and must declare a non-read effectClass; one naming a MUTATING leaf must also cite rf's candidate
 *    authorization/publication receipt (RECEIPT_LEAVES: graph.candidate.authorize and graph.publish); one naming a
 *    GRAPH_DOCUMENT path is a direct graph write and always refused; one without a contractSource cannot be judged and is
 *    refused. A committing render (context.render without --no-commit) is judged on its effectClass only: its receipt rule
 *    (--idempotency-key, rf operation show) is wb-jwc.5's, owner-reserved. B1 today's two registrations draw no finding and
 *    no committing descriptor exists; B2 no src literal spells a GRAPH_DOCUMENT path; B3-B6 the checker on constructed
 *    descriptors: each refusal, then the admissions (write, external and unknown citing both receipt leaves; a committing
 *    render declaring write).
 *  C, acceptance (c). A stand-in rf, the ONLY PATH entry on tracked scratch with an absolute-node shebang, appends one argv
 *    line per spawn (the argv recorder). C1 the registry's descriptor calls (discover, catalogSnapshot, effectClassOf) over
 *    the native registration and C2 its inspect call spawn nothing; C3 the Claude descriptor and inspection tools
 *    (capability_discover, capability_contract in both modes) spawn nothing; C4-C6 each input form the registered
 *    descriptor admits spawns once, verb context render with --no-commit and no MUTATING leaf; C7 capability_invoke spawns
 *    the same; C8 a read whose producer reports a commit (ephemeral false, a render_id, a commit_seq, a storage write) is
 *    refused, never surfaced; C9 the src anchors of the C rows: the registered descriptor's input forms are exactly the C4-C6
 *    inputs and CLAUDE_CAPABILITY_TOOL_NAMES is exactly the set of tools C3 and C7 call.
 *  M, the matcher A2 and B read: M1-M4 every MUTATING leaf caught as an argv run, a dotted id, a shell or spaced spelling
 *    (any case, "_" or "-" joints) and a template literal; M5 the eight read leaves, the live render argv and the near
 *    misses stay clean.
 *  R, the named residuals, each a pinned quiet row (the escape stays uncaught; the row reds when that changes):
 *    Q1 R-COMPOSED a leaf spelled from runtime parts is invisible to A2 and B (C4-C8 are the runtime backstop for the one
 *    live spawn site only); Q2 R-INDIRECT-BINARY a spawn whose binary is not a string literal is no site to A1; Q3
 *    R-UNPINNED-LEAF a graph leaf rf adds after the pin is outside MUTATING until a re-pin; Q4 R-DECLARED-ROUTE B judges a
 *    descriptor's declared contract, not its provider's argv; Q5 R-COORDINATED an edit of the census and the receipt
 *    anchor listing together reads clean (a landed receipt is append-only under R539, so the gate's numstat check, never
 *    this census, refuses the receipt half); Q6 R-EFFECT-LEDGER the preview reads rf's effect ledger and dry-run plan as
 *    data: an executed ledger row or would_commit true on a --no-commit reading is admitted (rf v1 mints no executed row).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` and RF_GRAPH_LEAVES pins `${leaf}:${flag}` as literals.
 * Every pin's case returns a witness held to WITNESS under its own pin, so a case swapped for another passing one reds.
 * OUTSIDE ANCHORS: the owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-a9l2.8) states the
 * acceptance clauses (a), (b) and (c), and rows A, B and C hold their labels to them verbatim; the receipt
 * docs/workbench/receipts/wb-a9l2.8.md carries the anchor listing every row, pin, leaf and residual is held to, in order;
 * C9 reads the src registry and the src tool roster. A member removed from every literal of this file still reds there.
 * Not claimed: this file's judged-set case deleted together with a hollow (census-code self-hollowing); a re-pin, a
 * compaction of the export row, or a reworded owner filing re-states the anchors in the same cut.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, the receipt and the export are
 * only read.
 */
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { CLAUDE_CAPABILITY_TOOL_NAMES, createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVE_FIBER_CONTRACT_SOURCE,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-a9l2.8";
const RECEIPT_PATH = join(REPO, "docs", "workbench", "receipts", `${BEAD}.md`);
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const PREVIEW_ID = "reactivefiber.render.preview";
const RF_PREFIX = "reactivefiber.";

interface Leaf {
  readonly leaf: string;
  readonly mutates: boolean;
  /** The leaf's _read / _write row in src/reactive_fiber_cli/cli/registry.py at the pin. */
  readonly line: number;
}
/** rf's sixteen graph leaves at ReactiveFiberCLI 6a251bf73af5, in registry order, with the producer's own mutates flag. */
const RF_GRAPH_LEAVES: readonly Leaf[] = [
  { leaf: "graph.show", mutates: false, line: 794 },
  { leaf: "graph.validate", mutates: false, line: 795 },
  { leaf: "graph.preflight", mutates: false, line: 799 },
  { leaf: "graph.explain", mutates: false, line: 807 },
  { leaf: "graph.diff", mutates: false, line: 817 },
  { leaf: "graph.candidate.create", mutates: true, line: 843 },
  { leaf: "graph.candidate.authorize", mutates: true, line: 855 },
  { leaf: "graph.patch", mutates: true, line: 876 },
  { leaf: "graph.connect", mutates: true, line: 877 },
  { leaf: "graph.disconnect", mutates: true, line: 878 },
  { leaf: "graph.set-optic", mutates: true, line: 879 },
  { leaf: "graph.impact", mutates: false, line: 880 },
  { leaf: "graph.test", mutates: false, line: 892 },
  { leaf: "graph.publish", mutates: true, line: 893 },
  { leaf: "graph.history", mutates: false, line: 894 },
  { leaf: "graph.rollback", mutates: true, line: 895 },
];
const MUTATING = RF_GRAPH_LEAVES.filter(leaf => leaf.mutates).map(leaf => leaf.leaf);
const READING = RF_GRAPH_LEAVES.filter(leaf => !leaf.mutates).map(leaf => leaf.leaf);
/** context.render's dry_run_flag (registry.py:967, NO_COMMIT_FLAG at :192). */
const DRY_RUN_FLAG = "--no-commit";
/** The two halves of README:26's "candidate graph authorization/publication process" at the pin. */
const RECEIPT_LEAVES = ["graph.candidate.authorize", "graph.publish"];
/** rf's workspace directory (locator.py:33) and declared graph document (layout.py:83). */
const GRAPH_DOCUMENT = [".reactive-fiber", "graphs/context.toml"];
const NON_COMMITTING_RENDER = new RegExp(`(?<![A-Za-z0-9])context\\.render ${DRY_RUN_FLAG}(?![A-Za-z0-9-])`);

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned by the judged-set case and held to the two outside anchors. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a census asserts Pi's rf argv roster has no graph-publishing or candidate-apply verb and its only rf capability has effectClass read",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) a future committing rf capability registers a non-read effectClass and cites rf's candidate/publication receipt, never a direct graph write (wb-jwc.5)",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6"],
  },
  {
    id: "C",
    label: "(c) a fixture read-only descriptor/inspection call issues zero graph-mutating rf verbs (argv recorder)",
    pins: ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
  },
  {
    id: "M",
    label: "the matcher rows A and B read catches every spelling family of each mutating rf graph leaf and leaves the read leaves and the live render argv clean",
    pins: ["M1", "M2", "M3", "M4", "M5"],
  },
  {
    id: "R",
    label: "the named residuals, each a pinned quiet row that reds when its escape stops being quiet",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
  },
];
/** The acceptance rows, in the order the owner filing states its clauses. */
const ACCEPTANCE_ROWS = ["A", "B", "C"];
const RESIDUALS: Readonly<Record<string, string>> = {
  Q1: "R-COMPOSED",
  Q2: "R-INDIRECT-BINARY",
  Q3: "R-UNPINNED-LEAF",
  Q4: "R-DECLARED-ROUTE",
  Q5: "R-COORDINATED",
  Q6: "R-EFFECT-LEDGER",
};

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function objectOf(value: Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function stringsOf(value: unknown, field: string): string[] {
  if (!Array.isArray(value)) throw new Error(`${field} must be a list`);
  return value.map((item: unknown, index: number) => {
    if (typeof item !== "string") throw new Error(`${field}[${index}] must be a string`);
    return item;
  });
}

// ---------------------------------------------------------------- the outside anchors

/** The owner filing's acceptance clauses (a), (b) and (c), read from the wb-a9l2.8 row of the tracked bead export. */
function exportClauses(text: string): string[] {
  for (const line of text.split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (!isObject(row) || row.id !== BEAD || typeof row.notes !== "string") continue;
    const match = /Acceptance: \(a\) (.+?); \(b\) (.+?); \(c\) (.+?)\. Related: /s.exec(row.notes);
    if (match === null) throw new Error(`the ${BEAD} export row carries no (a)/(b)/(c) acceptance sentence`);
    return [`(a) ${match[1]}`, `(b) ${match[2]}`, `(c) ${match[3]}`];
  }
  throw new Error(`the tracked bead export holds no ${BEAD} row`);
}

const ROW_LINE = /^- Row ([A-Z]) \(pins ([A-Z0-9]+(?:, [A-Z0-9]+)*)\): (.+)$/;
const LEAF_LINE = /^- Leaf (graph\.[a-z.-]+): (mutates|reads) \(registry\.py:(\d+)\)$/;
const RESIDUAL_LINE = /^- Residual (Q\d+): (R-[A-Z-]+)$/;

/** Every disagreement between the census literals, the receipt's anchor listing and the export's acceptance clauses. */
function anchorFindings(rows: readonly Row[], leaves: readonly Leaf[], residuals: Readonly<Record<string, string>>, receipt: string, clauses: readonly string[]): string[] {
  const lines = receipt.split("\n");
  const listedRows = lines.flatMap(line => {
    const match = ROW_LINE.exec(line);
    return match === null ? [] : [{ id: match[1] ?? "", label: match[3] ?? "", pins: (match[2] ?? "").split(", ") }];
  });
  const listedLeaves = lines.flatMap(line => {
    const match = LEAF_LINE.exec(line);
    return match === null ? [] : [{ leaf: match[1] ?? "", mutates: match[2] === "mutates", line: Number(match[3]) }];
  });
  const listedResiduals = Object.fromEntries(lines.flatMap(line => {
    const match = RESIDUAL_LINE.exec(line);
    return match === null ? [] : [[match[1] ?? "", match[2] ?? ""] as const];
  }));
  const findings: string[] = [];
  if (JSON.stringify(listedRows) !== JSON.stringify(rows.map(({ id, label, pins }) => ({ id, label, pins: [...pins] })))) findings.push("receipt rows differ");
  if (JSON.stringify(listedLeaves) !== JSON.stringify(leaves)) findings.push("receipt leaves differ");
  if (JSON.stringify(listedResiduals) !== JSON.stringify(residuals)) findings.push("receipt residuals differ");
  const labels = ACCEPTANCE_ROWS.map(id => rows.find(row => row.id === id)?.label ?? "");
  if (JSON.stringify(labels) !== JSON.stringify(clauses)) findings.push("acceptance labels differ from the export");
  return findings;
}

// ---------------------------------------------------------------- the src readers

/** Every regular file below a directory (symlinks are not followed). */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return filesBelow(path);
    return entry.isFile() ? [path] : [];
  });
}
const SRC_FLOOR = 100;
function srcModules(): { readonly name: string; readonly text: string }[] {
  return filesBelow(join(REPO, "src"))
    .filter(file => file.endsWith(".ts"))
    .map(file => ({ name: relative(REPO, file), text: readFileSync(file, "utf8") }));
}
function parse(fileName: string, text: string): ts.SourceFile {
  return ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

/** One leaf's spelling family: its words in any case, joined directly or by any run of white space, ".", "_" or "-". */
function leafPattern(leaf: string): RegExp {
  return new RegExp(`(?<![A-Za-z0-9])${leaf.split(/[.-]/).join("[\\s._-]*")}(?![A-Za-z0-9])`, "i");
}
function leavesIn(text: string, leaves: readonly string[]): string[] {
  return leaves.filter(leaf => leafPattern(leaf).test(text));
}
function documentIn(text: string): boolean {
  const folded = text.toLowerCase();
  return GRAPH_DOCUMENT.some(part => folded.includes(part));
}

const EXPR = "<expr>";
interface LiteralScan {
  readonly leafHits: string[];
  readonly documentHits: string[];
  readonly renderArgv: number;
}
/** One module's string and template literals and argv arrays (non-literal elements read as EXPR) against MUTATING and
 * GRAPH_DOCUMENT; renderArgv counts the arrays holding "context" then "render". */
function scanLiterals(fileName: string, text: string): LiteralScan {
  const leafHits: string[] = [];
  const documentHits: string[] = [];
  let renderArgv = 0;
  const judge = (form: string, spelled: string): void => {
    for (const leaf of leavesIn(spelled, MUTATING)) leafHits.push(`${fileName} ${form} ${leaf}`);
    if (documentIn(spelled)) documentHits.push(`${fileName} ${form}`);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) judge("literal", node.text);
    else if (ts.isTemplateExpression(node)) judge("template", [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(EXPR));
    else if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : EXPR));
      judge("argv", words.join(" "));
      if (words.some((word, index) => word === "context" && words[index + 1] === "render")) renderArgv += 1;
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(fileName, text));
  return { leafHits, documentHits, renderArgv };
}

const CHILD_PROCESS_CALLS = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"]);
interface SpawnSite {
  readonly file: string;
  readonly within: string;
  readonly callee: string;
  readonly argv: string;
}
interface SpawnScan {
  readonly sites: SpawnSite[];
  /** Calls whose binary is a string literal naming anything but rf (git, forge, ...): the scan's non-vacuity. */
  readonly otherBinaryCalls: number;
}
/** The enclosing named function of a node, for a site's location. */
function scopeName(node: ts.Node, within: string): string {
  if (ts.isFunctionDeclaration(node) && node.name !== undefined) return node.name.text;
  if (ts.isMethodDeclaration(node) && ts.isIdentifier(node.name)) return node.name.text;
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))) return node.name.text;
  return within;
}
/** Child-process calls whose first argument is a string literal: those naming rf (the bare name, a path ending in /rf, or
 * a shell line whose first word is one) are the module's rf spawn sites. */
function scanSpawns(fileName: string, text: string): SpawnScan {
  const source = parse(fileName, text);
  const sites: SpawnSite[] = [];
  let otherBinaryCalls = 0;
  const visit = (node: ts.Node, within: string): void => {
    const scope = scopeName(node, within);
    if (ts.isCallExpression(node)) {
      const callee = ts.isIdentifier(node.expression) ? node.expression.text : ts.isPropertyAccessExpression(node.expression) ? node.expression.name.text : "";
      const first = node.arguments[0];
      if (CHILD_PROCESS_CALLS.has(callee) && first !== undefined && ts.isStringLiteralLike(first)) {
        if (basename(first.text.trim().split(/\s+/)[0] ?? "") === "rf") sites.push({ file: fileName, within: scope, callee, argv: node.arguments[1]?.getText(source) ?? "" });
        else otherBinaryCalls += 1;
      }
    }
    ts.forEachChild(node, child => visit(child, scope));
  };
  visit(source, "<module>");
  return { sites, otherBinaryCalls };
}

interface RegistrationSite {
  readonly file: string;
  readonly within: string;
  readonly id: string;
  readonly effectClass: string;
}
function propertyOf(object: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  for (const property of object.properties) {
    if (ts.isPropertyAssignment(property) && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) && property.name.text === name) return property.initializer;
  }
  return undefined;
}
/** Object literals `descriptor: { id: "reactivefiber...", effectClass: ... }` in one module. */
function scanRegistrations(fileName: string, text: string): RegistrationSite[] {
  const sites: RegistrationSite[] = [];
  const visit = (node: ts.Node, within: string): void => {
    const scope = scopeName(node, within);
    if (ts.isObjectLiteralExpression(node)) {
      const descriptor = propertyOf(node, "descriptor");
      if (descriptor !== undefined && ts.isObjectLiteralExpression(descriptor)) {
        const id = propertyOf(descriptor, "id");
        const effectClass = propertyOf(descriptor, "effectClass");
        if (id !== undefined && ts.isStringLiteralLike(id) && id.text.startsWith(RF_PREFIX)) {
          sites.push({ file: fileName, within: scope, id: id.text, effectClass: effectClass !== undefined && ts.isStringLiteralLike(effectClass) ? effectClass.text : EXPR });
        }
      }
    }
    ts.forEachChild(node, child => visit(child, scope));
  };
  visit(parse(fileName, text), "<module>");
  return sites;
}

/** renderArgv's array literals in source order, each element a literal, EXPR or a spread. */
function renderArgvArrays(): string[][] {
  const file = join(REPO, "src", "workbench", "providers", "reactivefiber.ts");
  const arrays: string[][] = [];
  let found = 0;
  const collect = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      arrays.push(node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ts.isSpreadElement(element) ? `...${EXPR}` : EXPR)));
    }
    ts.forEachChild(node, collect);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isFunctionDeclaration(node) && node.name?.text === "renderArgv") {
      found += 1;
      ts.forEachChild(node, collect);
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(file, readFileSync(file, "utf8")));
  expect(found, "renderArgv must be declared once in providers/reactivefiber.ts").toBe(1);
  return arrays;
}

// ---------------------------------------------------------------- the committing-capability rule (acceptance (b))

interface RfDescriptorShape {
  readonly id: string;
  readonly effectClass: string;
  readonly contractSource?: string;
}
function committingFindings(descriptors: readonly RfDescriptorShape[]): string[] {
  const findings: string[] = [];
  for (const descriptor of descriptors) {
    if (!descriptor.id.startsWith(RF_PREFIX)) continue;
    const source = descriptor.contractSource;
    if (source === undefined) {
      findings.push(`${descriptor.id}: undeclared contract`);
      continue;
    }
    const leaves = leavesIn(source, MUTATING);
    const direct = documentIn(source);
    if (NON_COMMITTING_RENDER.test(source) && leaves.length === 0 && !direct) continue;
    if (descriptor.effectClass === "read") findings.push(`${descriptor.id}: read effectClass on a committing capability`);
    if (direct) findings.push(`${descriptor.id}: direct graph write`);
    if (leaves.length > 0) for (const leaf of RECEIPT_LEAVES) if (!leaves.includes(leaf)) findings.push(`${descriptor.id}: no ${leaf} receipt`);
  }
  return findings;
}
function committingCount(descriptors: readonly RfDescriptorShape[]): number {
  return descriptors.filter(descriptor => descriptor.id.startsWith(RF_PREFIX) && !(descriptor.contractSource !== undefined && NON_COMMITTING_RENDER.test(descriptor.contractSource) && leavesIn(descriptor.contractSource, MUTATING).length === 0 && !documentIn(descriptor.contractSource))).length;
}
const CONTRACT = "rf@future:reactive-fiber.cli/v1";
const PUBLISHING_CONTRACT = `${CONTRACT} graph.candidate.authorize then graph.publish`;

// ---------------------------------------------------------------- the registries

function rfShapes(registry: CapabilityRegistry): RfDescriptorShape[] {
  return registry
    .catalogSnapshot()
    .map(entry => entry.descriptor)
    .filter(descriptor => descriptor.id.startsWith(RF_PREFIX))
    .map(descriptor => ({ id: descriptor.id, effectClass: descriptor.effectClass, ...(descriptor.contractSource === undefined ? {} : { contractSource: descriptor.contractSource }) }));
}
async function nativeRegistry(root: string): Promise<CapabilityRegistry> {
  const native = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  native.registerNativeProviders(registry, root);
  return registry;
}
function injectedRegistry(root: string): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    throw new Error("the injected reader is never invoked by this census");
  }, root);
  return registry;
}
function boundRegistry(root: string): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, root);
  return registry;
}
const invokeContext = () => ({ grants: ["reactivefiber:render"], signal: new AbortController().signal });

// ---------------------------------------------------------------- the argv recorder

const oldPath = process.env.PATH;
const scratches: string[] = [];
const closers: Array<() => Promise<void>> = [];
afterEach(async () => {
  for (const close of closers.splice(0)) await close();
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
function scratchDir(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return realpathSync(dir);
}
interface Recorder {
  readonly root: string;
  readonly log: string;
}
/** Installs the stand-in rf as the ONLY PATH entry: it appends its argv to the log, then prints `reply(root)`. */
function recorder(reply: (root: string) => Json): Recorder {
  const root = scratchDir("rf-graph-mutation-root-");
  const bin = scratchDir("rf-graph-mutation-bin-");
  const log = join(bin, "spawns.jsonl");
  const script = join(bin, "rf");
  writeFileSync(
    script,
    [
      `#!${process.execPath}`,
      `require("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(reply(root)))});`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = bin;
  return { root, log };
}
function spawnsOf(record: Recorder): string[][] {
  if (!existsSync(record.log)) return [];
  return readFileSync(record.log, "utf8")
    .split("\n")
    .filter(line => line.length > 0)
    .map((line, index) => stringsOf(JSON.parse(line), `spawn ${index}`));
}
/** The recorded argv with the bound root written as <root>. */
function argvWitness(record: Recorder): Json {
  return spawnsOf(record).map(argv => argv.map(token => (token === record.root ? "<root>" : token)));
}
function mutatingWords(record: Recorder): string[] {
  return spawnsOf(record).flatMap(argv => leavesIn(argv.join(" "), MUTATING));
}
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}
async function caught(run: () => Promise<unknown>): Promise<unknown> {
  try {
    await run();
  } catch (error) {
    return error;
  }
  throw new Error("expected a refusal");
}

interface ToolReply {
  readonly isError: boolean;
  readonly payload: unknown;
}
/** The real curated MCP server behind a real MCP client, exposing only the preview. */
async function curated(registry: CapabilityRegistry, root: string): Promise<(name: string, args: Record<string, unknown>) => Promise<ToolReply>> {
  const server = createCuratedTools({
    registry,
    allowedCapabilities: [PREVIEW_ID],
    grants: [`discover:${PREVIEW_ID}`, `inspect:${PREVIEW_ID}`, `invoke:${PREVIEW_ID}`, "reactivefiber:render"],
    principal: { id: "census-user", role: "reviewer" },
    workspace: root,
    invocationId: "rf-graph-mutation-1",
    signal: new AbortController().signal,
  });
  const client = new Client({ name: "rf-graph-mutation-census", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  closers.push(async () => {
    await client.close();
    await server.instance.close();
  });
  return async (name, args) => {
    const result = await client.callTool({ name, arguments: args });
    const content: unknown = result.content;
    const first: unknown = Array.isArray(content) ? content[0] : undefined;
    if (!isObject(first) || first.type !== "text" || typeof first.text !== "string") throw new Error("expected one text content block");
    return { isError: result.isError === true, payload: JSON.parse(first.text) };
  };
}
function replyKind(reply: ToolReply): Json {
  const payload = reply.payload;
  if (!isObject(payload)) throw new Error("expected an object reply");
  const category = payload.category;
  return { isError: reply.isError, kind: String(payload.kind), ...(typeof category === "string" ? { category } : {}) };
}

/** The input each C4-C6 pin renders: one per form the registered descriptor admits (C9 holds them to it). */
const ARMS: ReadonlyArray<{ readonly pin: string; readonly input: Readonly<Record<string, string>> }> = [
  { pin: "C4", input: { model: "model-fixture", task: "task-fixture" } },
  { pin: "C5", input: { view: "swarm.worker", taskId: "bead-fixture-000" } },
  { pin: "C6", input: { view: "swarm.worker", taskId: "bead-fixture-000", model: "model-fixture" } },
];
/** The Claude tools C3 and C7 call (C9 holds them to CLAUDE_CAPABILITY_TOOL_NAMES). */
const TOOL_PINS: ReadonlyArray<{ readonly pin: string; readonly tools: readonly string[] }> = [
  { pin: "C3", tools: ["capability_discover", "capability_contract"] },
  { pin: "C7", tools: ["capability_invoke"] },
];
function armInput(pin: string): Readonly<Record<string, string>> {
  const arm = ARMS.find(entry => entry.pin === pin);
  if (arm === undefined) throw new Error(`no arm for ${pin}`);
  return arm.input;
}
async function renderArm(pin: string): Promise<Json> {
  const record = recorder(root => fullShapeRf(root));
  const reading = await boundRegistry(record.root).invoke(PREVIEW_ID, armInput(pin), invokeContext());
  expect(reading).toMatchObject({ workspaceRoot: record.root });
  expect(mutatingWords(record)).toEqual([]);
  return { spawns: spawnsOf(record).length, argv: argvWitness(record), mutating: mutatingWords(record) };
}
/** The key sets of every input a oneOf schema admits: each arm's required keys plus each subset of its optional ones. */
function inputForms(schema: Record<string, unknown>): string[][] {
  const arms = schema.oneOf;
  if (!Array.isArray(arms)) throw new Error("expected the oneOf input schema");
  return arms.flatMap((arm: unknown) => {
    if (!isObject(arm) || !isObject(arm.properties)) throw new Error("expected an object input arm");
    const required = stringsOf(arm.required, "arm.required");
    const optional = Object.keys(arm.properties).filter(key => !required.includes(key));
    let subsets: string[][] = [[]];
    for (const key of optional) subsets = subsets.concat(subsets.map(subset => [...subset, key]));
    return subsets.map(subset => [...required, ...subset].sort());
  });
}

/** A reading whose producer reports a commit: the preview's own refusals. */
const COMMIT_VARIANTS: ReadonlyArray<readonly [string, (result: JsonObject) => JsonObject]> = [
  ["ephemeral false", result => ({ ...result, ephemeral: false })],
  ["render_id set", result => ({ ...result, render_id: `rfr_${"c".repeat(22)}` })],
  ["commit_seq set", result => ({ ...result, commit_seq: 1 })],
  ["storage write", result => ({ ...result, work: { ...objectOf(result.work, "result.work"), storage_write_count: 1 } })],
];
function withResult(edit: (result: JsonObject) => JsonObject): (root: string) => Json {
  return root => {
    const envelope = fullShapeRf(root);
    return { ...envelope, result: edit(objectOf(envelope.result, "fullShapeRf result")) };
  };
}

// ---------------------------------------------------------------- the matcher samples

function hitsOf(text: string): number {
  return scanLiterals("sample.ts", text).leafHits.length;
}
const words = (leaf: string): string[] => leaf.split(".");
/** A tab joint, built rather than typed (standing rule 5). */
const TAB = String.fromCodePoint(9);
const quoted = (items: readonly string[]): string => items.map(item => JSON.stringify(item)).join(", ");

// ---------------------------------------------------------------- the cases

/** Each pin's case: it asserts its own outcome and returns the witness WITNESS holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const modules = srcModules();
    const scans = modules.map(module => scanSpawns(module.name, module.text));
    const sites = scans.flatMap(scan => scan.sites);
    const srcFloorMet = modules.length >= SRC_FLOOR;
    const otherBinariesSeen = scans.reduce((sum, scan) => sum + scan.otherBinaryCalls, 0) >= 1;
    expect(srcFloorMet, `src modules walked: ${modules.length}`).toBe(true);
    expect(otherBinariesSeen, "the scan read no literal child-process call at all").toBe(true);
    expect(sites).toHaveLength(1);
    return { srcFloorMet, otherBinariesSeen, sites: sites.map(site => ({ ...site })) };
  },
  A2: async () => {
    const modules = srcModules();
    const scans = modules.map(module => scanLiterals(module.name, module.text));
    const leafHits = scans.flatMap(scan => scan.leafHits);
    const renderArgvSeen = scans.reduce((sum, scan) => sum + scan.renderArgv, 0) >= 1;
    const srcFloorMet = modules.length >= SRC_FLOOR;
    expect(srcFloorMet, `src modules walked: ${modules.length}`).toBe(true);
    expect(renderArgvSeen, "the scan never read the live context render argv").toBe(true);
    expect(leafHits, "a mutating rf graph leaf spelled in src").toEqual([]);
    return { srcFloorMet, renderArgvSeen, leafHits, forbidden: [...MUTATING] };
  },
  A3: async () => {
    const arrays = renderArgvArrays();
    const returned = arrays.find(array => array.includes("context"));
    expect(returned, "renderArgv returns no context render argv").toBeDefined();
    const carriesDryRunFlag = returned?.includes(DRY_RUN_FLAG) === true;
    expect(carriesDryRunFlag).toBe(true);
    expect(arrays.flatMap(array => leavesIn(array.join(" "), MUTATING))).toEqual([]);
    return { arrays, carriesDryRunFlag };
  },
  A4: async () => {
    const root = scratchDir("rf-graph-mutation-registry-");
    const native = rfShapes(await nativeRegistry(root));
    const injected = rfShapes(injectedRegistry(root));
    const reading = (shapes: readonly RfDescriptorShape[]): Json =>
      shapes.map(shape => ({
        id: shape.id,
        effectClass: shape.effectClass,
        carrier: shape.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE,
        nonCommittingRender: shape.contractSource !== undefined && NON_COMMITTING_RENDER.test(shape.contractSource),
      }));
    for (const shapes of [native, injected]) {
      expect(shapes.map(shape => shape.id)).toEqual([PREVIEW_ID]);
      expect(shapes.map(shape => shape.effectClass)).toEqual(["read"]);
    }
    expect(RECONCILE_EVIDENCE_READS.reactivefiber).toStrictEqual([PREVIEW_ID]);
    return { native: reading(native), injected: reading(injected), reconcile: [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])] };
  },
  A5: async () => {
    const sites = srcModules().flatMap(module => scanRegistrations(module.name, module.text));
    expect(sites.map(site => site.effectClass)).toEqual(["read", "read"]);
    return { sites: sites.map(site => ({ ...site })) };
  },
  B1: async () => {
    const root = scratchDir("rf-graph-mutation-registry-");
    const shapes = [...rfShapes(await nativeRegistry(root)), ...rfShapes(injectedRegistry(root))];
    const findings = committingFindings(shapes);
    expect(shapes.length).toBeGreaterThanOrEqual(2);
    expect(findings).toEqual([]);
    return { judged: shapes.length, committing: committingCount(shapes), findings };
  },
  B2: async () => {
    const modules = srcModules();
    const documentHits = modules.flatMap(module => scanLiterals(module.name, module.text).documentHits);
    const srcFloorMet = modules.length >= SRC_FLOOR;
    expect(srcFloorMet).toBe(true);
    expect(documentHits, "a src literal spells rf's graph document location").toEqual([]);
    return { srcFloorMet, documentHits, document: [...GRAPH_DOCUMENT] };
  },
  B3: async () => {
    const findings = committingFindings([{ id: "reactivefiber.graph.publish", effectClass: "read", contractSource: PUBLISHING_CONTRACT }]);
    expect(findings).toHaveLength(1);
    return { findings };
  },
  B4: async () => {
    const cases: Json = [`${CONTRACT} graph.patch`, `${CONTRACT} graph.candidate.authorize`, `${CONTRACT} graph.publish`, `${CONTRACT} graph.rollback`].map(contractSource => ({
      contractSource,
      findings: committingFindings([{ id: "reactivefiber.graph.edit", effectClass: "write", contractSource }]),
    }));
    return { cases };
  },
  B5: async () => {
    const cases: Json = [
      { id: "reactivefiber.graph.document", effectClass: "write", contractSource: `${PUBLISHING_CONTRACT}; writes .reactive-fiber/graphs/context.toml` },
      { id: "reactivefiber.graph.direct", effectClass: "write", contractSource: `${CONTRACT} context.render ${DRY_RUN_FLAG} then GRAPHS/CONTEXT.TOML` },
      { id: "reactivefiber.render.unknown", effectClass: "read" },
    ].map(descriptor => ({ id: descriptor.id, findings: committingFindings([descriptor]) }));
    return { cases };
  },
  B6: async () => {
    const admitted = ["write", "external", "unknown"].map(effectClass => committingFindings([{ id: "reactivefiber.graph.publish", effectClass, contractSource: PUBLISHING_CONTRACT }]));
    const committingRender = ["read", "write"].map(effectClass => committingFindings([{ id: "reactivefiber.render.commit", effectClass, contractSource: `${CONTRACT} context.render --idempotency-key K` }]));
    expect(admitted).toEqual([[], [], []]);
    return { admitted, committingRender };
  },
  C1: async () => {
    const record = recorder(root => fullShapeRf(root));
    const registry = await nativeRegistry(record.root);
    const ids = registry.catalogSnapshot().map(entry => entry.descriptor.id);
    const discovered = registry.discover({ grants: ids.map(id => `discover:${id}`) }).map(descriptor => descriptor.id);
    const effectClass = registry.effectClassOf(PREVIEW_ID) ?? "unregistered";
    expect(spawnsOf(record)).toEqual([]);
    return { discovered: discovered.filter(id => id.startsWith(RF_PREFIX)), effectClass, nativeFloorMet: ids.length >= 4, spawns: spawnsOf(record).length };
  },
  C2: async () => {
    const record = recorder(root => fullShapeRf(root));
    const error = await caught(() => boundRegistry(record.root).inspect(PREVIEW_ID, { ref: "inspect-fixture" }, { grants: [`inspect:${PREVIEW_ID}`], signal: new AbortController().signal }));
    expect(spawnsOf(record)).toEqual([]);
    return { ...refusalOf(error), spawns: spawnsOf(record).length };
  },
  C3: async () => {
    const record = recorder(root => fullShapeRf(root));
    const call = await curated(boundRegistry(record.root), record.root);
    const replies = [
      replyKind(await call("capability_discover", {})),
      replyKind(await call("capability_contract", { capabilityId: PREVIEW_ID })),
      replyKind(await call("capability_contract", { capabilityId: PREVIEW_ID, mode: "inspect", capabilityVersion: "1.0.0", ref: "inspect-fixture" })),
    ];
    expect(spawnsOf(record)).toEqual([]);
    return { replies, spawns: spawnsOf(record).length };
  },
  C4: async () => renderArm("C4"),
  C5: async () => renderArm("C5"),
  C6: async () => renderArm("C6"),
  C7: async () => {
    const record = recorder(root => fullShapeRf(root));
    const call = await curated(boundRegistry(record.root), record.root);
    const reply = await call("capability_invoke", { capabilityId: PREVIEW_ID, capabilityVersion: "1.0.0", input: armInput("C4") });
    expect(mutatingWords(record)).toEqual([]);
    return { reply: replyKind(reply), spawns: spawnsOf(record).length, argv: argvWitness(record) };
  },
  C8: async () => {
    const outcomes: Json[] = [];
    for (const [variant, edit] of COMMIT_VARIANTS) {
      const record = recorder(withResult(edit));
      const error = await caught(() => boundRegistry(record.root).invoke(PREVIEW_ID, armInput("C4"), invokeContext()));
      outcomes.push({ variant, ...refusalOf(error), spawns: spawnsOf(record).length, mutating: mutatingWords(record) });
    }
    return { outcomes };
  },
  C9: async () => {
    const root = scratchDir("rf-graph-mutation-registry-");
    const schema = boundRegistry(root).catalogSnapshot()[0]?.descriptor.inputSchema ?? {};
    const forms = inputForms(schema);
    const armForms = ARMS.map(arm => Object.keys(arm.input).sort());
    const tools = [...CLAUDE_CAPABILITY_TOOL_NAMES].sort();
    const toolPins = TOOL_PINS.flatMap(entry => entry.tools).sort();
    expect(armForms).toEqual(forms);
    expect(toolPins).toEqual(tools);
    return { forms, armPins: ARMS.map(arm => arm.pin), tools, toolPins: TOOL_PINS.map(entry => entry.pin) };
  },
  M1: async () => {
    const caughtLeaves = MUTATING.map(leaf => hitsOf(`spawn("rf", ["--workspace", w, ${quoted(words(leaf))}, "--json"]);`) >= 1);
    expect(caughtLeaves.every(Boolean)).toBe(true);
    return { argv: caughtLeaves };
  },
  M2: async () => {
    const caughtLeaves = MUTATING.map(leaf => [`const id = "${leaf}";`, `const id = "reactivefiber.${leaf}";`].map(hitsOf));
    expect(caughtLeaves.flat().every(count => count >= 1)).toBe(true);
    return { dotted: caughtLeaves };
  },
  M3: async () => {
    const spellings = (leaf: string): string[] => [
      `rf ${words(leaf).join(" ")} --candidate c --json`,
      words(leaf).join("_").toUpperCase(),
      words(leaf).join("-"),
      `rf  ${words(leaf).join(TAB)}`,
    ];
    const caughtLeaves = MUTATING.map(leaf => spellings(leaf).map(spelled => hitsOf(`const cmd = ${JSON.stringify(spelled)};`)));
    expect(caughtLeaves.flat().every(count => count >= 1)).toBe(true);
    return { spaced: caughtLeaves };
  },
  M4: async () => {
    const caughtLeaves = MUTATING.map(leaf => hitsOf(["const cmd = `rf ", words(leaf).join(" "), " --candidate $", "{candidate}`;"].join("")) >= 1);
    expect(caughtLeaves.every(Boolean)).toBe(true);
    return { template: caughtLeaves };
  },
  M5: async () => {
    const readLeaves = READING.map(leaf => [`spawn("rf", [${quoted(words(leaf))}]);`, `const id = "${leaf}";`, `const cmd = "rf ${words(leaf).join(" ")} --json";`].map(hitsOf));
    const nearMisses = [
      'spawn("rf", ["--workspace", w, "context", "render", "--model", m, "--task", t, "--no-commit", "--no-input", "--json"]);',
      'const argv = ["graph", "show", "publish"];',
      'const text = "subgraph publish";',
      'const text = "graph publisher";',
      'const text = "graph disconnected";',
    ].map(hitsOf);
    expect([...readLeaves.flat(), ...nearMisses].every(count => count === 0)).toBe(true);
    return { readLeaves, nearMisses };
  },
  Q1: async () => {
    const composed = hitsOf('const leaf = ["pub", "lish"].join(""); spawn("rf", ["graph", leaf]);');
    const literal = hitsOf('spawn("rf", ["graph", "publish"]);');
    expect([composed, literal]).toEqual([0, 1]);
    return { residual: RESIDUALS.Q1 ?? "", composed, literal };
  },
  Q2: async () => {
    const indirect = scanSpawns("sample.ts", 'spawn(rfBinary, ["context", "render"]); execFile(process.env.RF_BIN ?? "", argv);').sites.length;
    const literal = scanSpawns("sample.ts", 'spawn("/opt/tools/rf", argv); exec("rf context render --no-commit");').sites.length;
    expect([indirect, literal]).toEqual([0, 2]);
    return { residual: RESIDUALS.Q2 ?? "", indirect, literal };
  },
  Q3: async () => {
    const unpinned = hitsOf('spawn("rf", ["graph", "merge", "--candidate", c, "--json"]);');
    expect(unpinned).toBe(0);
    return { residual: RESIDUALS.Q3 ?? "", unpinned };
  },
  Q4: async () => {
    const misdeclared = committingFindings([{ id: "reactivefiber.graph.quiet", effectClass: "read", contractSource: REACTIVE_FIBER_CONTRACT_SOURCE }]);
    expect(misdeclared).toEqual([]);
    return { residual: RESIDUALS.Q4 ?? "", misdeclared };
  },
  Q5: async () => {
    const receipt = readFileSync(RECEIPT_PATH, "utf8");
    const clauses = exportClauses(readFileSync(EXPORT_PATH, "utf8"));
    const lessRows = ROWS.filter(row => row.id !== "R");
    const lessReceipt = receipt
      .split("\n")
      .filter(line => !line.startsWith("- Row R "))
      .join("\n");
    const coordinated = anchorFindings(lessRows, RF_GRAPH_LEAVES, RESIDUALS, lessReceipt, clauses);
    const censusOnly = anchorFindings(lessRows, RF_GRAPH_LEAVES, RESIDUALS, receipt, clauses);
    expect(coordinated).toEqual([]);
    expect(censusOnly).toEqual(["receipt rows differ"]);
    return { residual: RESIDUALS.Q5 ?? "", coordinated, censusOnly };
  },
  Q6: async () => {
    const record = recorder(
      withResult(result => ({
        ...result,
        effects: [{ render_id: null, component_instance_id: "swarm.notes:main", effect_id: "notify-peer", effect_type: "notify", status: "executed", reason_codes: ["dry_run"], idempotency_key: `sha256:${"3".repeat(64)}`, dispatch_count: 1, fiber_status: "collected", result_digest: null }],
        plan: { operations: [], would_commit: true },
      })),
    );
    const reading = await boundRegistry(record.root).invoke(PREVIEW_ID, armInput("C4"), invokeContext());
    const source = objectOf(objectOf(reading, "reading").source, "reading source");
    const result = objectOf(source.result, "reading result");
    const effects = Array.isArray(result.effects) ? result.effects : [];
    const admitted = { effectStatus: objectOf(effects[0], "effects[0]").status ?? null, wouldCommit: objectOf(result.plan, "plan").would_commit ?? null };
    expect(admitted).toEqual({ effectStatus: "executed", wouldCommit: true });
    return { residual: RESIDUALS.Q6 ?? "", admitted, spawns: spawnsOf(record).length };
  },
};

/** Each pin's witness, measured at base 0b2a80f. */
const WITNESS: Readonly<Record<string, Json>> = {
  A1: {
    srcFloorMet: true,
    otherBinariesSeen: true,
    sites: [{ file: "src/workbench/providers/reactivefiber.ts", within: "nativeReactiveFiberRender", callee: "spawn", argv: "argv" }],
  },
  A2: {
    srcFloorMet: true,
    renderArgvSeen: true,
    leafHits: [],
    forbidden: [
      "graph.candidate.create",
      "graph.candidate.authorize",
      "graph.patch",
      "graph.connect",
      "graph.disconnect",
      "graph.set-optic",
      "graph.publish",
      "graph.rollback",
    ],
  },
  A3: {
    arrays: [
      ["--view", "<expr>", "--task-id", "<expr>", "...<expr>"],
      [],
      ["--model", "<expr>"],
      ["--model", "<expr>", "--task", "<expr>"],
      ["--workspace", "<expr>", "context", "render", "...<expr>", "--no-commit", "--no-input", "--json"],
    ],
    carriesDryRunFlag: true,
  },
  A4: {
    native: [{ id: "reactivefiber.render.preview", effectClass: "read", carrier: true, nonCommittingRender: true }],
    injected: [{ id: "reactivefiber.render.preview", effectClass: "read", carrier: true, nonCommittingRender: true }],
    reconcile: ["reactivefiber.render.preview"],
  },
  A5: {
    sites: [
      {
        file: "src/workbench/providers/reactivefiber.ts",
        within: "registerReactiveFiberRender",
        id: "reactivefiber.render.preview",
        effectClass: "read",
      },
      {
        file: "src/workbench/providers/reactivefiber.ts",
        within: "registerNativeReactiveFiberRender",
        id: "reactivefiber.render.preview",
        effectClass: "read",
      },
    ],
  },
  B1: { judged: 2, committing: 0, findings: [] },
  B2: { srcFloorMet: true, documentHits: [], document: [".reactive-fiber", "graphs/context.toml"] },
  B3: { findings: ["reactivefiber.graph.publish: read effectClass on a committing capability"] },
  B4: {
    cases: [
      {
        contractSource: "rf@future:reactive-fiber.cli/v1 graph.patch",
        findings: ["reactivefiber.graph.edit: no graph.candidate.authorize receipt", "reactivefiber.graph.edit: no graph.publish receipt"],
      },
      {
        contractSource: "rf@future:reactive-fiber.cli/v1 graph.candidate.authorize",
        findings: ["reactivefiber.graph.edit: no graph.publish receipt"],
      },
      {
        contractSource: "rf@future:reactive-fiber.cli/v1 graph.publish",
        findings: ["reactivefiber.graph.edit: no graph.candidate.authorize receipt"],
      },
      {
        contractSource: "rf@future:reactive-fiber.cli/v1 graph.rollback",
        findings: ["reactivefiber.graph.edit: no graph.candidate.authorize receipt", "reactivefiber.graph.edit: no graph.publish receipt"],
      },
    ],
  },
  B5: {
    cases: [
      { id: "reactivefiber.graph.document", findings: ["reactivefiber.graph.document: direct graph write"] },
      { id: "reactivefiber.graph.direct", findings: ["reactivefiber.graph.direct: direct graph write"] },
      { id: "reactivefiber.render.unknown", findings: ["reactivefiber.render.unknown: undeclared contract"] },
    ],
  },
  B6: { admitted: [[], [], []], committingRender: [["reactivefiber.render.commit: read effectClass on a committing capability"], []] },
  C1: { discovered: ["reactivefiber.render.preview"], effectClass: "read", nativeFloorMet: true, spawns: 0 },
  C2: { category: "unavailable", message: "Capability reactivefiber.render.preview does not support inspect.", spawns: 0 },
  C3: {
    replies: [
      { isError: false, kind: "discovered" },
      { isError: false, kind: "contract" },
      { isError: true, kind: "rejected", category: "unavailable" },
    ],
    spawns: 0,
  },
  C4: {
    spawns: 1,
    argv: [
      [
        "--workspace",
        "<root>",
        "context",
        "render",
        "--model",
        "model-fixture",
        "--task",
        "task-fixture",
        "--no-commit",
        "--no-input",
        "--json",
      ],
    ],
    mutating: [],
  },
  C5: {
    spawns: 1,
    argv: [
      [
        "--workspace",
        "<root>",
        "context",
        "render",
        "--view",
        "swarm.worker",
        "--task-id",
        "bead-fixture-000",
        "--no-commit",
        "--no-input",
        "--json",
      ],
    ],
    mutating: [],
  },
  C6: {
    spawns: 1,
    argv: [
      [
        "--workspace",
        "<root>",
        "context",
        "render",
        "--view",
        "swarm.worker",
        "--task-id",
        "bead-fixture-000",
        "--model",
        "model-fixture",
        "--no-commit",
        "--no-input",
        "--json",
      ],
    ],
    mutating: [],
  },
  C7: {
    reply: { isError: false, kind: "returned" },
    spawns: 1,
    argv: [
      [
        "--workspace",
        "<root>",
        "context",
        "render",
        "--model",
        "model-fixture",
        "--task",
        "task-fixture",
        "--no-commit",
        "--no-input",
        "--json",
      ],
    ],
  },
  C8: {
    outcomes: [
      {
        variant: "ephemeral false",
        category: "transport",
        message: "RF preview returned an unrecognized or contradictory envelope.",
        spawns: 1,
        mutating: [],
      },
      {
        variant: "render_id set",
        category: "transport",
        message: "RF preview returned an unrecognized or contradictory envelope.",
        spawns: 1,
        mutating: [],
      },
      {
        variant: "commit_seq set",
        category: "transport",
        message: "RF preview returned an unrecognized or contradictory envelope.",
        spawns: 1,
        mutating: [],
      },
      {
        variant: "storage write",
        category: "transport",
        message: "RF preview returned an unrecognized or contradictory envelope.",
        spawns: 1,
        mutating: [],
      },
    ],
  },
  C9: {
    forms: [["model", "task"], ["taskId", "view"], ["model", "taskId", "view"]],
    armPins: ["C4", "C5", "C6"],
    tools: ["capability_contract", "capability_discover", "capability_invoke"],
    toolPins: ["C3", "C7"],
  },
  M1: { argv: [true, true, true, true, true, true, true, true] },
  M2: { dotted: [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]] },
  M3: { spaced: [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]] },
  M4: { template: [true, true, true, true, true, true, true, true] },
  M5: { readLeaves: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]], nearMisses: [0, 0, 0, 0, 0] },
  Q1: { residual: "R-COMPOSED", composed: 0, literal: 1 },
  Q2: { residual: "R-INDIRECT-BINARY", indirect: 0, literal: 2 },
  Q3: { residual: "R-UNPINNED-LEAF", unpinned: 0 },
  Q4: { residual: "R-DECLARED-ROUTE", misdeclared: [] },
  Q5: { residual: "R-COORDINATED", coordinated: [], censusOnly: ["receipt rows differ"] },
  Q6: { residual: "R-EFFECT-LEDGER", admitted: { effectStatus: "executed", wouldCommit: true }, spawns: 1 },
};

describe("wb-a9l2.8 rf graph mutation census (RF-HARNESS2-FEDERATED-PEER-R8)", () => {
  it("the judged set: the frozen shape, the owner's acceptance in the tracked export, the receipt anchor listing and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:6", "C:9", "M:5", "R:6"]);
    expect(RF_GRAPH_LEAVES.map(leaf => `${leaf.leaf}:${leaf.mutates ? "mutates" : "reads"}`)).toEqual([
      "graph.show:reads",
      "graph.validate:reads",
      "graph.preflight:reads",
      "graph.explain:reads",
      "graph.diff:reads",
      "graph.candidate.create:mutates",
      "graph.candidate.authorize:mutates",
      "graph.patch:mutates",
      "graph.connect:mutates",
      "graph.disconnect:mutates",
      "graph.set-optic:mutates",
      "graph.impact:reads",
      "graph.test:reads",
      "graph.publish:mutates",
      "graph.history:reads",
      "graph.rollback:mutates",
    ]);
    const clauses = exportClauses(readFileSync(EXPORT_PATH, "utf8"));
    expect(anchorFindings(ROWS, RF_GRAPH_LEAVES, RESIDUALS, readFileSync(RECEIPT_PATH, "utf8"), clauses)).toEqual([]);
    const pins = ROWS.flatMap(row => row.pins).sort();
    expect(Object.keys(IMPL).sort()).toEqual(pins);
    expect(Object.keys(WITNESS).sort()).toEqual(pins);
    expect(Object.keys(RESIDUALS).sort()).toEqual([...(ROWS.find(row => row.id === "R")?.pins ?? [])].sort());
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(WITNESS[pin]);
        });
      }
    });
  }
});
