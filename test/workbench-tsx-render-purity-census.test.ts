/**
 * wb-km7q.5 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R14, program-triage-2026-10-18 child of wb-km7q), the absent-today
 * leg. Statement (the bead title, held to the tracked bead export): "If Pi ever authors components on the proposed rf TSX
 * hooks/SpeculationBoundary (unshipped; gated T0-T6), no component may poll, call a model, revise global admission, mutate
 * controller state or run I/O in render; useSpeculation revise/withdraw/promote are invalid in render; promotion declares demand,
 * never guaranteeing scheduling or reuse; unmount withdraws only its own interest." Acceptance (owner filing, notes):
 * "adoption-time render-purity falsifiers (each forbidden act in render goes red) plus an unmount case proving only the
 * component's own interest is withdrawn, never another consumer's shared execution."
 *
 * THE PRODUCER, MEASURED (read-only git show, git grep -n -w, git ls-tree and git rev-parse on the local ReactiveFiberTSXSDK clone,
 * and the installed rf, by seat ws-03 of run g10-work-s125, 2026-10-28; this census is hermetic and reads only the roster's copy,
 * test/fixtures/tsx-render-purity-roster.json): the charter docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md
 * (blob 01970950 at the program pin e7e6616d3d08, the same blob at 5da03a7d49f4 and at origin/main 94ae52c14aef) proposes fourteen
 * hooks (:11) and five boundaries (:13), with "none of the new exports claimed shipped" (:3). Its :17 says a new hook "must never
 * directly poll, launch a model call, revise global admission, mutate controller state or perform I/O while rendering"; its :19
 * makes useSpeculation's revise, withdraw and promote "invalid in render", says promotion "does not guarantee scheduling or reuse"
 * and that "Component unmount withdraws only its interest, not another consumer's shared execution"; :48-54 stage T0-T6 and :58
 * publishes new exports "only when implementation and installed tests exist". At all three revisions (package 0.1.649 at the pin
 * and at 5da03a7d49f4, the distribution the installed rf 0.1.845 maps in its integrations/tsx import map and runtime lock; 0.1.668
 * at origin/main) no src/ or python/ file spells any of the nineteen names (211, 211 and 213 files), the package exports the same
 * six keys and publishes no file that spells one. The only site outside docs/ is tests/e2e/fiber/driver.mjs:139 and :183, a
 * test-local fixture function that shares the effect boundary's name, in a file the package does not publish. rf's own host
 * broker (runtime/resource_broker.py withdraw_interest: "the execution stays for its other owners") is the host side of the same
 * program and wb-km7q.9's trigger, not a component API: Pi can author components only on the TSX SDK's hooks and boundaries.
 *
 * Pi authors no TSX component today. The landed wb-o4h0.4 census pins that no walked file is a .tsx or .jsx module, that no module
 * holds JSX and that no module loads the TSX SDK, so this census pins only what this bead adds: the proposed family's names and
 * the duties the filing arms. The trigger has not fired; acceptance (a) and (b) are owed by the cut that adopts. Rows:
 *  A the trigger (the title's If-clause), absent today. A1 no walked module names one of the nineteen (read off the roster's copies
 *    of :11 and :13) where the TypeScript compiler reads a name: an identifier in any position (an import or export specifier, a
 *    declaration, a reference, a property access, a JSX tag or attribute, a binding pattern, a type reference, a private name;
 *    escapes decoded by the compiler) or a string-named member (an element access, a quoted or computed member name, a quoted
 *    import or export name, an indexed access type, a type argument). Planted leg: the same judge over the live readings plus one
 *    planted component reads exactly the plant's findings. A2 the walk read every module git lists (the listing is taken before
 *    the walk; a file or directory gone since is skipped) above its floor, the rf provider and this file among them, and met no
 *    symlink and no failed read. A3 the producer gate reads closed over the roster's measured facts: no src/ or python/ site, no site in a
 *    published file and no export key beyond the measured six at any revision; each opening fact, planted alone, reads open.
 *  B acceptance (a), armed at adoption. B1 the title's five forbidden acts in render, each traced to its :17 phrase; B2 the title's
 *    three useSpeculation callbacks, each traced to :19. Each reads disarmed over the live tree (A1's live reading names nothing)
 *    and, over a planted adoption, owes one falsifier per act.
 *  C acceptance (b), armed at adoption. C1 the title's unmount duty and the acceptance's unmount case, traced to :19; disarmed
 *    today, owed over a planted adoption.
 * NOT CLAIMED: the title's third duty (promotion declares demand, never guaranteeing scheduling or reuse): the acceptance owes no
 *   falsifier for it, so DUTIES maps it to no pin and the judged set holds only its :19 trace. Any reading of what a component does
 *   in render: until a Pi component exists there is nothing to run, and the cut that adds the first one reds A1 (and B1, B2, C1) by
 *   design and owes acceptance (a) and (b) with it. Name-level coverage beyond the four names the bead row spells (the hook range's
 *   two ends, the title's hook and boundary): a middle name removed from the roster's vendored line, its digest and every literal
 *   here together stays green, because the vendored copy is its only anchor.
 * OUTSIDE ANCHORS (the judged-set case): the owner filing's row in the tracked bead export (row wb-km7q.5: its title, and its first
 *   line opening "Citations: ", so appended notes are safe). The trigger is row A's label; the acceptance, split at " plus ", is row
 *   B's and row C's labels; the title's four duties (split at "; ") are DUTIES; the five acts and the three callbacks are parsed off
 *   the title and each must match its producer phrase; the notes' cited lines are the roster's vendored lines (plus the two name
 *   lines), its two quotes sit in them, its hook range opens and closes the name list, and the title's hook and boundary are in it.
 *   So a row, a label, a duty or an act removed from every literal of this file and of the roster together still reds.
 * POLARITY (asserted in code before the roster compare): a P- control reads true; a Q- control (a residual's quiet row) and an N-
 *   control (a closed or disarmed reading) read false.
 * RESIDUALS (named families, each with pinned quiet rows in the roster): R-NEEDLE a name in a string or template literal outside a
 *   member position, a regular expression or a comment; R-CASED another casing; R-AFFIXED a longer identifier holding a name;
 *   R-COMPOSED a name assembled at run time; R-EMBEDDED component source held in a literal (wb-o4h0.4's A3 collects the TSX module
 *   names censuses plant); R-SDK-LOAD a name reached through the SDK without spelling it, such as a re-export (wb-o4h0.4's A2
 *   refuses every SDK load); R-COMPOSITION the charter's convenience compositions (the two quoted names on :13); R-OTHER-FAMILY the
 *   shipped hooks and the 2026-10-17 amendment's adapter hooks and activity boundary (wb-km7q.3, wb-km7q.6); R-OWN-RENDER Pi's own
 *   render code, which is no rf component; R-OUTSIDE a file below a skipped root entry; R-NONMODULE a file that is no module (a page,
 *   a JSON fixture such as this census's roster, an extensionless script).
 * TITLES: each row's describe title carries its state (ROW_STATE: A absent today; B and C armed at adoption, owed by the adopting
 *   cut and not delivered here), so a report never reads a passing pin as a delivered falsifier; the pins are titled by their ids.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the rows, every pin's witness, the residual
 *   families with their quiet rows and the registered test titles are held to the roster.
 * Display paths added: none. Test-only: every plant is an in-memory text; the tree, the roster and the bead export are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { type Dirent, lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

type Json = null | boolean | number | string | Json[] | { readonly [key: string]: Json };
type Controls = Readonly<Record<string, boolean>>;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-km7q.5";
const BEAD_EXPORT = ".beads/issues.jsonl";
const ROSTER_FILE = "test/fixtures/tsx-render-purity-roster.json";
const SELF = "test/workbench-tsx-render-purity-census.test.ts";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
/** Root entries the walk never enters: git's data, the tracker export, installed dependencies, build, coverage and Forge outputs. */
const SKIPPED_ROOTS: readonly string[] = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
/** A module: every TypeScript and JavaScript script kind. */
const MODULE = /\.(?:[cm]?ts|tsx|[cm]?js|jsx)$/;
/** The walk's floor, below the 743 modules git lists at base 1f8117a. */
const MODULE_FLOOR = 700;
/** The producer grep's floor: src/ and python/ files at each measured revision (211, 211 and 213 measured). */
const SRC_PYTHON_FLOOR = 200;
/** The package's export keys, the same six at every measured revision; a key beyond them opens the gate. */
const MEASURED_EXPORTS: readonly string[] = [".", "./embedding", "./jsx-dev-runtime", "./jsx-runtime", "./package.json", "./testing"];
/** The measured revisions, in ancestry order (the pin is an ancestor of the mapped distribution, which is one of origin/main). */
const ROLES: readonly string[] = ["program-pin", "mapped", "origin-main"];
/** The vendored lines the notes do not cite: the hook list (:11) and the boundary list (:13), read for the name family. */
const NAME_LINES: readonly string[] = ["11", "13"];
/** The family's size: :11's backticked hooks and :13's backticked boundaries. */
const FAMILY_SIZE = { hooks: 14, boundaries: 5 } as const;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The frozen judged set (standing rule 16); each label is a clause of the owner filing, read back in the judged-set case. */
const ROWS: readonly Row[] = [
  { id: "A", label: "If Pi ever authors components on the proposed rf TSX hooks/SpeculationBoundary (unshipped; gated T0-T6)", pins: ["A1", "A2", "A3"] },
  { id: "B", label: "adoption-time render-purity falsifiers (each forbidden act in render goes red)", pins: ["B1", "B2"] },
  { id: "C", label: "an unmount case proving only the component's own interest is withdrawn, never another consumer's shared execution", pins: ["C1"] },
];
/** Each row's state, written into its describe title, so a report reads what the pins hold and never a delivered falsifier. */
const ROW_STATE: Readonly<Record<string, string>> = {
  A: "absent today, the trigger",
  B: "armed at adoption, owed by the adopting cut and not delivered here",
  C: "armed at adoption, owed by the adopting cut and not delivered here",
};
interface Duty {
  readonly duty: string;
  readonly pin: string | null;
}
/** The title's four duties after its trigger, each with the pin that owes its falsifiers at adoption (the third: none). */
const DUTIES: readonly Duty[] = [
  { duty: "no component may poll, call a model, revise global admission, mutate controller state or run I/O in render", pin: "B1" },
  { duty: "useSpeculation revise/withdraw/promote are invalid in render", pin: "B2" },
  { duty: "promotion declares demand, never guaranteeing scheduling or reuse", pin: null },
  { duty: "unmount withdraws only its own interest", pin: "C1" },
];
/** Each forbidden act the title names, beside the phrase :17 names it by. */
const PRODUCER_ACTS: readonly (readonly [string, string])[] = [
  ["poll", "poll"],
  ["call a model", "launch a model call"],
  ["revise global admission", "revise global admission"],
  ["mutate controller state", "mutate controller state"],
  ["run I/O", "perform I/O"],
];
/** The two phrases :19 states the unmount duty and the promotion duty by. */
const UNMOUNT_PHRASE = "Component unmount withdraws only its interest, not another consumer's shared execution.";
const PROMOTION_PHRASE = "promotion declares actual demand but does not guarantee scheduling or reuse";
/** The residual families, each with its quiet rows (held to the roster). */
const QUIET: Readonly<Record<string, readonly string[]>> = {
  "R-NEEDLE": ["Q-NEEDLE-ARG", "Q-NEEDLE-TEMPLATE", "Q-NEEDLE-REGEX", "Q-NEEDLE-COMMENT"],
  "R-CASED": ["Q-CASED"],
  "R-AFFIXED": ["Q-AFFIXED"],
  "R-COMPOSED": ["Q-COMPOSED"],
  "R-EMBEDDED": ["Q-EMBEDDED"],
  "R-SDK-LOAD": ["Q-REEXPORT"],
  "R-COMPOSITION": ["Q-COMPOSITION"],
  "R-OTHER-FAMILY": ["Q-SHIPPED-HOOKS", "Q-AMENDMENT"],
  "R-OWN-RENDER": ["Q-OWN-RENDER"],
  "R-OUTSIDE": ["Q-OUTSIDE"],
  "R-NONMODULE": ["Q-NONMODULE"],
};

// ---- the roster ----

interface VendoredLine {
  readonly text: string;
  readonly sha256: string;
}
interface Revision {
  readonly role: string;
  readonly sha: string;
  readonly version: string;
  readonly exports: readonly string[];
  readonly files: readonly string[];
  readonly srcPythonFiles: number;
  readonly docBlob: string;
  readonly sites: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly requirement: string;
  readonly measured: string;
  readonly producer: {
    readonly repo: string;
    readonly doc: string;
    readonly lines: Readonly<Record<string, VendoredLine>>;
    readonly revisions: readonly Revision[];
    readonly rf: { readonly version: string; readonly mappedVersion: string; readonly lockSource: string; readonly hostBroker: readonly string[] };
  };
  readonly rows: readonly Row[];
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly witness: Readonly<Record<string, Json>>;
  readonly tests: readonly string[];
}
const ROSTER: Roster = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));

/** A vendored producer line's text (an absent line reads empty, so every reader of it reds). */
function line(number: string): string {
  return ROSTER.producer.lines[number]?.text ?? "";
}
function revision(role: string): Revision | undefined {
  return ROSTER.producer.revisions.find(entry => entry.role === role);
}
const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

interface Family {
  readonly hooks: readonly string[];
  readonly boundaries: readonly string[];
  readonly compositions: readonly string[];
}
/** The proposed family, read off the vendored :11 (backticked hooks) and :13 (backticked boundaries; quoted compositions). */
function familyOf(hooksLine: string, boundariesLine: string): Family {
  return {
    hooks: [...hooksLine.matchAll(/`(use[A-Za-z]+)`/g)].map(match => match[1] ?? ""),
    boundaries: [...boundariesLine.matchAll(/`([A-Za-z]+Boundary)`/g)].map(match => match[1] ?? ""),
    compositions: [...boundariesLine.matchAll(/'([A-Za-z]+Boundary)'/g)].map(match => match[1] ?? ""),
  };
}
const FAMILY = familyOf(line("11"), line("13"));
const NAMES: ReadonlySet<string> = new Set([...FAMILY.hooks, ...FAMILY.boundaries]);

// ---- the owner filing (the outside anchor) ----

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
let beadRow: BeadRow | undefined;
function readBeadRow(): BeadRow {
  if (beadRow !== undefined) return beadRow;
  for (const entry of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!entry.includes(`"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(entry);
    if (typeof row === "object" && row !== null && "id" in row && row.id === BEAD && "title" in row && "notes" in row) {
      const { title, notes } = row;
      if (typeof title === "string" && typeof notes === "string") {
        beadRow = { title, notes };
        return beadRow;
      }
    }
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
}
interface Filing {
  readonly requirement: string;
  readonly trigger: string;
  readonly duties: readonly string[];
  readonly acts: readonly string[];
  readonly hook: string;
  readonly callbacks: readonly string[];
  readonly boundary: string;
  readonly gateSteps: readonly string[];
  readonly gateLines: readonly string[];
  readonly acceptance: readonly string[];
  readonly doc: string;
  readonly pins: readonly string[];
  readonly cited: readonly string[];
  readonly quotes: readonly { readonly quote: string; readonly line: string }[];
  readonly hookRange: readonly string[];
  readonly rangeBoundary: string;
}
/** The filing's atoms: the title's trigger, duties, acts, callbacks and gate steps, and the citations line's acceptance, cited
 * lines, quotes and hook range. A shape that does not parse reads empty, so the judged set reds. */
function filingOf(row: BeadRow): Filing {
  const title = /^\[([A-Z0-9-]+)\] (If Pi ever .+?\)), (.+)\.$/.exec(row.title);
  const duties = title?.[3]?.split("; ") ?? [];
  const acts = /^no component may (.+) in render$/.exec(duties[0] ?? "")?.[1]?.split(/, | or /) ?? [];
  const callbacks = /^(\S+) (\S+) are invalid in render$/.exec(duties[1] ?? "");
  const boundary = /\bhooks\/([A-Za-z]+) \(/.exec(title?.[2] ?? "")?.[1] ?? "";
  const steps = /\bgated T(\d)-T(\d)\)$/.exec(title?.[2] ?? "");
  const first = Number(steps?.[1] ?? 1);
  const last = Number(steps?.[2] ?? 0);
  const gateSteps = Array.from({ length: Math.max(0, last - first + 1) }, (_, index) => `T${first + index}`);
  const citations = row.notes.split("\n").find(entry => entry.startsWith("Citations: ")) ?? "";
  const acceptance = /\bAcceptance: (.+)\.$/.exec(citations)?.[1]?.split(" plus ") ?? [];
  const spans = [...citations.matchAll(/:(\d+)(?:-(\d+))?@([0-9a-f]{12})\b/g)];
  const cited = spans.flatMap(span => {
    const from = Number(span[1]);
    const to = Number(span[2] ?? span[1]);
    return Array.from({ length: Math.max(0, to - from + 1) }, (_, index) => String(from + index));
  });
  const range = /\((use[A-Za-z]+)\.\.(use[A-Za-z]+)\) and ([A-Za-z]+Boundary)\b/.exec(citations);
  const gated = /\bgated T\d-T\d \(:(\d+)-(\d+)@/.exec(citations);
  const gateFrom = Number(gated?.[1] ?? 1);
  const gateLines = Array.from({ length: Math.max(0, Number(gated?.[2] ?? 0) - gateFrom + 1) }, (_, index) => String(gateFrom + index));
  return {
    requirement: title?.[1] ?? "",
    trigger: title?.[2] ?? "",
    duties,
    acts,
    hook: callbacks?.[1] ?? "",
    callbacks: callbacks?.[2]?.split("/") ?? [],
    boundary,
    gateSteps,
    gateLines,
    acceptance,
    doc: /^Citations: (\S+?):\d+@/.exec(citations)?.[1] ?? "",
    pins: [...new Set(spans.map(span => span[3] ?? ""))],
    cited,
    quotes: [...citations.matchAll(/'([^']+)' \(:(\d+)@/g)].map(match => ({ quote: match[1] ?? "", line: match[2] ?? "" })),
    hookRange: range === null ? [] : [range[1] ?? "", range[2] ?? ""],
    rangeBoundary: range?.[3] ?? "",
  };
}
/** :17's forbidden acts (the list after "must never directly", up to "while rendering"). */
function producerActsOf(text: string): string[] {
  return /\bmust never directly (.+?) while rendering\./.exec(text)?.[1]?.split(/, | or /) ?? [];
}
/** :19's callback methods, read only when the sentence after them makes them invalid in render. */
function producerCallbacksOf(text: string): string[] {
  const match = /callback methods `(\w+)`, `(\w+)`, `(\w+)`\. These callback methods are invalid in render;/.exec(text);
  return match === null ? [] : [match[1] ?? "", match[2] ?? "", match[3] ?? ""];
}

// ---- the readers ----

/** A path the walk reads: a module below no skipped root entry (skipped at the root only). */
function walkReads(path: string): boolean {
  return !SKIPPED_ROOTS.includes(path.split("/")[0] ?? "") && MODULE.test(path);
}
function scriptKindOf(path: string): ts.ScriptKind {
  if (path.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (/\.[cm]?ts$/.test(path)) return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}
/** The string-named member positions: where the compiler reads a literal as a name. */
function memberPosition(node: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral): string | undefined {
  const parent = node.parent;
  if (ts.isElementAccessExpression(parent) && parent.argumentExpression === node) return "element access";
  if (ts.isComputedPropertyName(parent)) return "computed name";
  if (
    (ts.isPropertyAssignment(parent) ||
      ts.isPropertySignature(parent) ||
      ts.isPropertyDeclaration(parent) ||
      ts.isMethodDeclaration(parent) ||
      ts.isMethodSignature(parent) ||
      ts.isGetAccessorDeclaration(parent) ||
      ts.isSetAccessorDeclaration(parent) ||
      ts.isEnumMember(parent)) &&
    parent.name === node
  )
    return "quoted member";
  if ((ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent)) && (parent.name === node || parent.propertyName === node)) return "quoted specifier";
  if (ts.isLiteralTypeNode(parent)) {
    const holder = parent.parent;
    if (ts.isIndexedAccessTypeNode(holder) && holder.indexType === parent) return "indexed access type";
    if (ts.isTypeReferenceNode(holder) && holder.typeArguments?.some(argument => argument === parent) === true) return "type argument";
  }
  return undefined;
}
interface ModuleReading {
  readonly path: string;
  readonly findings: readonly string[];
}
/** One module's findings: each family name the compiler reads as a name, as `<path>:<line> <position>: <name>`. */
function readModule(path: string, source: string, kind: ts.ScriptKind): ModuleReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, kind);
  const findings: string[] = [];
  const hit = (node: ts.Node, position: string, value: string): void => {
    if (NAMES.has(value)) findings.push(`${path}:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1} ${position}: ${value}`);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) hit(node, "identifier", ts.idText(node));
    else if (ts.isPrivateIdentifier(node)) hit(node, "private name", ts.idText(node).slice(1));
    else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const position = memberPosition(node);
      if (position !== undefined) hit(node, position, node.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { path, findings };
}
/** The trigger's judge, over the live readings or the live readings plus a plant. */
function judgeNames(readings: readonly ModuleReading[]): string[] {
  return readings.flatMap(reading => reading.findings);
}

interface Walk {
  readonly files: readonly string[];
  readonly symlinks: readonly string[];
  readonly failures: readonly string[];
}
/** Every regular file below the root, in name order; skipped roots are never entered, a symlink is recorded and never followed. */
function walkTree(root: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const failures: string[] = [];
  const visit = (directory: string): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(join(root, directory), { withFileTypes: true });
    } catch (error) {
      // A directory gone between its listing and its read holds nothing to judge; any other failed read is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) failures.push(`${directory === "" ? "." : directory}: ${String(error)}`);
      return;
    }
    for (const entry of [...entries].sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0))) {
      const path = directory === "" ? entry.name : `${directory}/${entry.name}`;
      if (directory === "" && SKIPPED_ROOTS.includes(entry.name)) continue;
      if (entry.isSymbolicLink()) symlinks.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(path);
    }
  };
  visit("");
  return { files, symlinks, failures };
}
/** git's listing (tracked, and untracked but not ignored) of the modules the walk reads: the walk's anchor outside this file. */
function gitListedModules(): string[] {
  const listing = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return [...new Set(listing.split("\0"))].filter(path => path !== "" && walkReads(path)).sort();
}
const isFile = (path: string): boolean => {
  try {
    return lstatSync(join(REPO, path)).isFile();
  } catch {
    return false;
  }
};
interface LiveTree {
  readonly listed: readonly string[];
  readonly walk: Walk;
  readonly modules: readonly string[];
  readonly readings: readonly ModuleReading[];
  readonly failures: readonly string[];
}
let liveTreeReading: LiveTree | undefined;
/** The live tree, read once: git's listing first, then the walk, then every walked module (a module gone since is skipped). */
function liveTree(): LiveTree {
  if (liveTreeReading !== undefined) return liveTreeReading;
  const listed = gitListedModules();
  const walk = walkTree(REPO);
  const modules = walk.files.filter(walkReads);
  const readings: ModuleReading[] = [];
  const failures = [...walk.failures];
  for (const path of modules) {
    let source: string;
    try {
      source = readFileSync(join(REPO, path), "utf8");
    } catch (error) {
      if (!isFile(path)) continue;
      failures.push(`${path}: ${String(error)}`);
      continue;
    }
    readings.push(readModule(path, source, scriptKindOf(path)));
  }
  liveTreeReading = { listed, walk, modules, readings, failures };
  return liveTreeReading;
}

// ---- the plants and controls ----

/** The title's hook and boundary (the adoption plant spells them), and one escape of the hook the compiler decodes. */
const HOOK = FAMILY.hooks.find(name => name === filingOf(readBeadRow()).hook) ?? "";
const BOUNDARY = FAMILY.boundaries.find(name => name === filingOf(readBeadRow()).boundary) ?? "";
const ESCAPED_HOOK = HOOK.length < 4 ? "" : `${HOOK.slice(0, 3)}\\u${HOOK.charCodeAt(3).toString(16).padStart(4, "0")}${HOOK.slice(4)}`;
/** A planted component on the family, in the shape :21-40 sketches (the SDK spelled by a placeholder specifier). */
function adoptionText(): string {
  return [
    `import { ${HOOK} } from "tsx-sdk-placeholder";`,
    "export function NextContext() {",
    `  const index = ${HOOK}({ key: "repo-index" });`,
    `  return <${BOUNDARY} maxConcurrent={2}>{index.status}</${BOUNDARY}>;`,
    "}",
  ].join("\n");
}
const ADOPTION = "planted/adoption";
const adoptionReading = (): ModuleReading => readModule(ADOPTION, adoptionText(), ts.ScriptKind.TSX);
const reads = (source: string, kind: ts.ScriptKind = ts.ScriptKind.TS): boolean => readModule("planted/control", source, kind).findings.length > 0;
/** A1's controls: one P- per read position (and one per family name), one Q- per residual quiet row. */
function nameControls(): Controls {
  const tsx = ts.ScriptKind.TSX;
  const controls: Record<string, boolean> = {
    "P-IMPORT": reads(`import { ${HOOK} } from "m";\n`),
    "P-IMPORT-ALIAS": reads(`import { ${HOOK} as spec } from "m";\n`),
    "P-EXPORT": reads(`export { ${HOOK} } from "m";\n`),
    "P-DECLARATION": reads(`export function ${BOUNDARY}() {\n  return null;\n}\n`),
    "P-REFERENCE": reads(`const view = ${HOOK}({});\n`),
    "P-PROPERTY": reads(`const view = sdk.${HOOK}({});\n`),
    "P-JSX-TAG": reads(`const view = <${BOUNDARY} maxConcurrent={2} />;\n`, tsx),
    "P-JSX-MEMBER": reads(`const view = <sdk.${BOUNDARY} />;\n`, tsx),
    "P-JSX-ATTRIBUTE": reads(`const view = <Box ${HOOK}={1} />;\n`, tsx),
    "P-BINDING": reads(`const { ${HOOK} } = load("m");\n`, ts.ScriptKind.JSX),
    "P-TYPE-REFERENCE": reads(`let boundary: ${BOUNDARY} | undefined;\n`),
    "P-QUALIFIED": reads(`let boundary: sdk.${BOUNDARY} | undefined;\n`),
    "P-PRIVATE": reads(`class Holder {\n  #${HOOK} = 1;\n}\n`),
    "P-ESCAPED": reads(`const view = ${ESCAPED_HOOK}({});\n`),
    "P-ELEMENT": reads(`const view = sdk["${HOOK}"]({});\n`),
    "P-ELEMENT-TEMPLATE": reads(`const view = sdk[${"`"}${HOOK}${"`"}]({});\n`),
    "P-QUOTED-MEMBER": reads(`const hooks = { "${HOOK}": 1 };\n`),
    "P-COMPUTED": reads(`const hooks = { ["${HOOK}"]: 1 };\n`),
    "P-QUOTED-SPECIFIER": reads(`import { "${HOOK}" as spec } from "m";\n`),
    "P-INDEXED-TYPE": reads(`type Spec = Sdk["${HOOK}"];\n`),
    "P-TYPE-ARGUMENT": reads(`type Spec = Pick<Sdk, "${HOOK}">;\n`),
    "Q-NEEDLE-ARG": reads(`expect(text).toContain("${HOOK}");\n`),
    "Q-NEEDLE-TEMPLATE": reads(`const text = ${"`"}<${BOUNDARY} />${"`"};\n`),
    "Q-NEEDLE-REGEX": reads(`const pattern = /${HOOK}/;\n`),
    "Q-NEEDLE-COMMENT": reads(`// ${HOOK}\n/** ${BOUNDARY} */\nconst value = 1;\n`),
    "Q-CASED": reads(`const view = ${HOOK.toLowerCase()};\nconst other = ${BOUNDARY.toUpperCase()};\n`),
    "Q-AFFIXED": reads(`const ${HOOK}Limits = 1;\nconst my${BOUNDARY} = 2;\n`),
    "Q-COMPOSED": reads(`const view = sdk["use" + "${HOOK.slice(3)}"];\nconst other = sdk[${"`"}use${"${"}part}${"`"}];\n`),
    "Q-EMBEDDED": reads(`const source = ${"`"}export function V() { const s = ${HOOK}({}); return <${BOUNDARY} />; }${"`"};\n`),
    "Q-REEXPORT": reads('export * from "m";\nimport * as sdk from "m";\nconst view = sdk[name];\n'),
    "Q-COMPOSITION": reads(FAMILY.compositions.map(name => `const ${name.toLowerCase()} = <${name} />;`).join("\n"), tsx),
    "Q-SHIPPED-HOOKS": reads("const [state] = useState(0);\nconst memo = useMemo(() => 1, []);\nconst lens = useLens(spec);\nuseEffect(() => undefined);\n"),
    "Q-AMENDMENT": reads('const query = useQuery(spec);\nconst absent = useAbsent(spec);\nconst all = useEvidenceAll(spec);\nconst view = <ActivityBoundary mode="WARM" />;\n', tsx),
    "Q-OWN-RENDER": reads("export function render(width: number) {\n  const frame = fetchFrame(width);\n  return frame.lines;\n}\n"),
  };
  for (const name of [...FAMILY.hooks, ...FAMILY.boundaries]) controls[`P-NAME-${name}`] = reads(`const view = ${name};\n`);
  return controls;
}
/** A2's controls: what the walk's path predicate reads. */
function walkControls(): Controls {
  return {
    "P-MODULE-KINDS": [".ts", ".tsx", ".mts", ".cts", ".d.ts", ".js", ".jsx", ".mjs", ".cjs"].every(extension => walkReads(`src/x${extension}`)),
    "P-NESTED-SKIPPED-NAME": walkReads("examples/app/node_modules/x.ts") && walkReads("test/fixtures/dist/x.js"),
    "P-ROOT-MODULE": walkReads("vitest.config.ts"),
    "Q-OUTSIDE": SKIPPED_ROOTS.some(root => walkReads(`${root}/x.ts`)),
    "Q-NONMODULE": ["docs/workbench/x.md", ROSTER_FILE, "bin/script", "notes.txt"].some(walkReads),
  };
}

interface Gate {
  readonly open: boolean;
  readonly codeSites: readonly string[];
  readonly publishedSites: readonly string[];
  readonly newExports: readonly string[];
}
/** The producer gate: open when a revision carries a family site below src/ or python/, a site in a file the package publishes
 * (a published path or a file below a published directory), or an export key beyond the measured six. */
function gateOf(revisions: readonly Revision[]): Gate {
  const codeSites = revisions.flatMap(entry => entry.sites.filter(site => site.startsWith("src/") || site.startsWith("python/")).map(site => `${entry.role} ${site}`));
  const publishedSites = revisions.flatMap(entry =>
    entry.sites.filter(site => entry.files.some(published => site.startsWith(`${published}:`) || site.startsWith(`${published}/`))).map(site => `${entry.role} ${site}`),
  );
  const newExports = revisions.flatMap(entry => entry.exports.filter(key => !MEASURED_EXPORTS.includes(key)).map(key => `${entry.role} ${key}`));
  return { open: codeSites.length + publishedSites.length + newExports.length > 0, codeSites, publishedSites, newExports };
}
/** A3's controls: the measured facts read closed; each opening fact planted alone reads open; docs and test sites stay closed. */
function gateControls(): Controls {
  const measured = ROSTER.producer.revisions;
  const opens = (role: string, change: Partial<Revision>): boolean => gateOf(measured.map(entry => (entry.role === role ? { ...entry, ...change } : entry))).open;
  const sites = (role: string, site: string): Partial<Revision> => ({ sites: [...(revision(role)?.sites ?? []), site] });
  const exports = (role: string, key: string): Partial<Revision> => ({ exports: [...(revision(role)?.exports ?? []), key] });
  return {
    "N-MEASURED": gateOf(measured).open,
    "P-SRC-SITE-PIN": opens("program-pin", sites("program-pin", "src/hooks/speculation.ts:12")),
    "P-PYTHON-SITE-MAPPED": opens("mapped", sites("mapped", "python/reactive_fiber_tsx/hooks.py:3")),
    "P-SRC-SITE-MAIN": opens("origin-main", sites("origin-main", "src/index.ts:40")),
    "P-PUBLISHED-FILE-SITE": opens("origin-main", sites("origin-main", "README.md:3")),
    "P-PUBLISHED-DIR-SITE": opens("mapped", sites("mapped", "dist/index.d.ts:9")),
    "P-EXPORT-PIN": opens("program-pin", exports("program-pin", "./hooks")),
    "P-EXPORT-MAIN": opens("origin-main", exports("origin-main", "./speculation")),
    "N-DOCS-SITE": opens("origin-main", sites("origin-main", "docs/programs/notes.md:3")),
    "N-TESTS-SITE": opens("origin-main", sites("origin-main", "tests/e2e/other.mjs:1")),
    "N-SRC-LIKE-SITE": opens("program-pin", sites("program-pin", "srcs/hooks.ts:1")),
  };
}

interface Armed {
  readonly armed: boolean;
  readonly owed: readonly string[];
}
/** An armed duty's reading: armed once the trigger reads a Pi component on the family; then it owes one falsifier per act. */
function armedReading(trigger: readonly string[], owedOnAdoption: readonly string[]): Armed {
  const armed = trigger.length > 0;
  return { armed, owed: armed ? [...owedOnAdoption] : [] };
}
function armedControls(owedOnAdoption: readonly string[]): Controls {
  const live = armedReading(judgeNames(liveTree().readings), owedOnAdoption);
  const planted = armedReading(adoptionReading().findings, owedOnAdoption);
  return {
    "N-LIVE": live.armed,
    "P-ADOPTION": planted.armed && planted.owed.length === owedOnAdoption.length && owedOnAdoption.length > 0,
    "N-NO-ADOPTION": armedReading([], owedOnAdoption).armed,
  };
}

// ---- the pins ----

const REACHED: string[] = [];
function done(pin: string, witness: { readonly [key: string]: Json }): Json {
  REACHED.push(pin);
  return witness;
}
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const tree = liveTree();
    const findings = judgeNames(tree.readings);
    expect(findings, "walked modules naming a proposed hook or boundary (the trigger: Pi authors a component on the family)").toEqual([]);
    const plant = adoptionReading();
    expect(plant.findings.length, "the planted adoption names the family").toBeGreaterThan(0);
    expect(judgeNames([...tree.readings, plant]), "the judge over the live readings plus the plant reads exactly the plant").toEqual(plant.findings);
    return done("A1", { findings, planted: [...plant.findings], controls: nameControls() });
  },
  A2: () => {
    const tree = liveTree();
    const walked = new Set(tree.modules);
    const missing = tree.listed.filter(path => !walked.has(path) && isFile(path));
    expect(missing, "modules git lists that the walk did not read").toEqual([]);
    expect(tree.walk.symlinks, "symlinks below the root (refused, never followed)").toEqual([]);
    expect(tree.failures, "failed reads").toEqual([]);
    const floorMet = tree.readings.length >= MODULE_FLOOR;
    expect(floorMet, `modules read: ${tree.readings.length}`).toBe(true);
    const anchors = { provider: walked.has(PROVIDER), self: walked.has(SELF) };
    expect(anchors).toStrictEqual({ provider: true, self: true });
    return done("A2", { missing, symlinks: [...tree.walk.symlinks], failures: [...tree.failures], floorMet, anchors, controls: walkControls() });
  },
  A3: () => {
    const revisions = ROSTER.producer.revisions;
    expect(revisions.map(entry => entry.role), "the measured revisions, in ancestry order").toEqual([...ROLES]);
    const gate = gateOf(revisions);
    expect(gate.open, `the producer gate is open: the trigger's '(unshipped; gated T0-T6)' no longer holds - re-cut ${BEAD} with this re-measure`).toBe(false);
    const readings = revisions.map(entry => ({
      role: entry.role,
      sha: entry.sha,
      version: entry.version,
      srcPythonFloorMet: entry.srcPythonFiles >= SRC_PYTHON_FLOOR,
      exportsMeasured: entry.exports.length === MEASURED_EXPORTS.length && entry.exports.every((key, index) => key === MEASURED_EXPORTS[index]),
      sitesOutsideDocs: entry.sites.filter(site => !site.startsWith("docs/")),
    }));
    expect(readings.every(entry => entry.srcPythonFloorMet && entry.exportsMeasured), "every revision's grep scope met its floor and exports the measured six").toBe(true);
    return done("A3", { gate: { ...gate, codeSites: [...gate.codeSites], publishedSites: [...gate.publishedSites], newExports: [...gate.newExports] }, readings, controls: gateControls() });
  },
  B1: () => {
    const filing = filingOf(readBeadRow());
    const producer = producerActsOf(line("17"));
    expect(filing.acts, "the title's acts, each beside its :17 phrase").toEqual(PRODUCER_ACTS.map(([act]) => act));
    expect(producer, ":17's acts, in the title's order").toEqual(PRODUCER_ACTS.map(([, phrase]) => phrase));
    const owedOnAdoption = filing.acts.map(act => `${act} in render goes red`);
    const live = armedReading(judgeNames(liveTree().readings), owedOnAdoption);
    expect(live, "acceptance (a)'s act falsifiers are owed: a Pi module names the family").toStrictEqual({ armed: false, owed: [] });
    return done("B1", { acts: [...filing.acts], producer, armed: live.armed, owed: [...live.owed], owedOnAdoption, controls: armedControls(owedOnAdoption) });
  },
  B2: () => {
    const filing = filingOf(readBeadRow());
    const producer = producerCallbacksOf(line("19"));
    expect(filing.callbacks, "the title's callbacks are :19's, in order").toEqual(producer);
    expect(line("19").startsWith(`${"`"}${filing.hook}${"`"} must be dynamically adjustable`), ":19 is the title's hook's sentence").toBe(true);
    const owedOnAdoption = filing.callbacks.map(method => `${filing.hook} ${method} in render goes red`);
    const live = armedReading(judgeNames(liveTree().readings), owedOnAdoption);
    expect(live, "acceptance (a)'s callback falsifiers are owed: a Pi module names the family").toStrictEqual({ armed: false, owed: [] });
    return done("B2", { hook: filing.hook, callbacks: [...filing.callbacks], producer, armed: live.armed, owed: [...live.owed], owedOnAdoption, controls: armedControls(owedOnAdoption) });
  },
  C1: () => {
    const filing = filingOf(readBeadRow());
    const duty = filing.duties[3] ?? "";
    const unmountCase = filing.acceptance[1] ?? "";
    expect(line("19").includes(UNMOUNT_PHRASE), ":19 states the unmount duty").toBe(true);
    expect({ duty: duty.startsWith("unmount withdraws only its own interest"), unmountCase: unmountCase.endsWith("never another consumer's shared execution") }).toStrictEqual({ duty: true, unmountCase: true });
    const owedOnAdoption = [unmountCase];
    const live = armedReading(judgeNames(liveTree().readings), owedOnAdoption);
    expect(live, "acceptance (b)'s unmount case is owed: a Pi module names the family").toStrictEqual({ armed: false, owed: [] });
    return done("C1", { duty, producer: UNMOUNT_PHRASE, armed: live.armed, owed: [...live.owed], owedOnAdoption, controls: armedControls(owedOnAdoption) });
  },
};

/** Every control a witness carries against its polarity: a P- control reads true, a Q- or N- control reads false. */
function polarityMisses(witness: Json): string[] {
  if (typeof witness !== "object" || witness === null || Array.isArray(witness)) return ["(no witness)"];
  const controls = witness.controls;
  if (typeof controls !== "object" || controls === null || Array.isArray(controls)) return ["(no controls)"];
  return Object.entries(controls).flatMap(([id, value]) => {
    const expected = id.startsWith("P-") ? true : id.startsWith("Q-") || id.startsWith("N-") ? false : null;
    return expected === null || value !== expected ? [`${id}: ${String(value)}`] : [];
  });
}

describe("wb-km7q.5 TSX render-purity census (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R14, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead row and the vendored producer lines agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:2", "C:1"]);
    expect(ROWS).toStrictEqual(ROSTER.rows);
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: ROSTER.bead, residuals: ROSTER.residuals }).toStrictEqual({ bead: BEAD, residuals: QUIET });
    // The vendored producer lines are intact, and they are the notes' cited lines plus the two name lines.
    const lines = ROSTER.producer.lines;
    expect(Object.entries(lines).filter(([, entry]) => sha256(entry.text) !== entry.sha256).map(([number]) => number), "vendored lines whose digest differs").toEqual([]);
    const row = readBeadRow();
    const filing = filingOf(row);
    expect(filing.requirement, "the title's requirement id is the roster's").toBe(ROSTER.requirement);
    expect(filing.doc, "the notes cite the vendored charter").toBe(ROSTER.producer.doc);
    expect(filing.pins, "the notes cite one pin, the measured program pin").toEqual([revision("program-pin")?.sha.slice(0, 12) ?? ""]);
    expect([...new Set([...filing.cited, ...NAME_LINES])].sort((left, right) => Number(left) - Number(right)), "vendored lines = cited lines + name lines").toEqual(
      Object.keys(lines).sort((left, right) => Number(left) - Number(right)),
    );
    expect(filing.cited.filter(number => NAME_LINES.includes(number)), "the name lines are not cited").toEqual([]);
    expect(filing.quotes.length, "the notes quote two producer lines").toBe(2);
    expect(filing.quotes.filter(({ quote, line: number }) => !line(number).includes(quote)).map(({ quote }) => quote), "quotes absent from their lines").toEqual([]);
    expect(line("3").includes("none of the new exports claimed shipped"), ":3 states the family unshipped").toBe(true);
    expect({ steps: filing.gateSteps.length, lines: filing.gateLines.length }, "the title gates on seven steps, the notes cite seven lines").toStrictEqual({ steps: 7, lines: 7 });
    const gateReadings = filing.gateSteps.map((step, index) => ({ step, opens: line(filing.gateLines[index] ?? "").startsWith(`${step} `) }));
    expect(gateReadings.filter(entry => !entry.opens).map(entry => entry.step), "the title's gate steps that do not open the notes' cited lines in order").toEqual([]);
    // The outside anchor: the trigger, the acceptance and the duties are the rows' labels and DUTIES, verbatim.
    expect(filing.trigger, "row A's label is the title's trigger").toBe(ROWS[0]?.label);
    expect(filing.acceptance, "rows B's and C's labels are the acceptance, split at ' plus '").toEqual(ROWS.slice(1).map(entry => entry.label));
    const labels = [filing.trigger, ...filing.acceptance];
    expect(ROWS.map(entry => labels.filter(label => label === entry.label).length), "every row carries exactly one clause of the filing").toEqual(ROWS.map(() => 1));
    expect(filing.duties, "the title's four duties are DUTIES").toEqual(DUTIES.map(entry => entry.duty));
    const armedPins = ROWS.slice(1).flatMap(entry => entry.pins);
    expect(DUTIES.flatMap(entry => (entry.pin === null ? [] : [entry.pin])), "each armed pin owns exactly one duty, in order").toEqual(armedPins);
    expect(filing.acts, "the title's acts").toEqual(PRODUCER_ACTS.map(([act]) => act));
    expect(producerActsOf(line("17")), ":17's acts").toEqual(PRODUCER_ACTS.map(([, phrase]) => phrase));
    expect(filing.callbacks, "the title's callbacks are :19's").toEqual(producerCallbacksOf(line("19")));
    expect({ unmount: line("19").includes(UNMOUNT_PHRASE), promotion: line("19").includes(PROMOTION_PHRASE) }, ":19 states the unmount and promotion duties").toStrictEqual({ unmount: true, promotion: true });
    // The family: :11 and :13's names, anchored by the notes' hook range and the title's hook and boundary.
    expect({ hooks: FAMILY.hooks.length, boundaries: FAMILY.boundaries.length }).toStrictEqual(FAMILY_SIZE);
    expect(filing.hookRange, "the notes' hook range opens and closes :11's list").toEqual([FAMILY.hooks[0], FAMILY.hooks[FAMILY.hooks.length - 1]]);
    expect({ hook: FAMILY.hooks.includes(filing.hook), boundary: FAMILY.boundaries.includes(filing.boundary), rangeBoundary: filing.rangeBoundary === filing.boundary }).toStrictEqual({ hook: true, boundary: true, rangeBoundary: true });
    expect(FAMILY.compositions.length, ":13 names two convenience compositions (R-COMPOSITION)").toBe(2);
    // The installed rf maps the TSX SDK at the mapped revision's version and source.
    const mapped = revision("mapped");
    expect({ version: ROSTER.producer.rf.mappedVersion, source: ROSTER.producer.rf.lockSource }).toStrictEqual({ version: mapped?.version, source: `${ROSTER.producer.repo} ${mapped?.sha}` });
    expect(new Set(ROSTER.producer.revisions.map(entry => entry.docBlob)).size, "one charter blob at every revision").toBe(1);
    // Every residual's quiet rows are controls that read false.
    const controls: Controls = { ...nameControls(), ...walkControls() };
    expect(Object.values(QUIET).flatMap(ids => (ids.length === 0 ? ["(none)"] : ids.filter(id => controls[id] !== false))), "quiet rows that are missing or not false").toEqual([]);
    // Every row's describe title states what its pins hold (last, so no check above is masked by it).
    expect(Object.keys(ROW_STATE), "every row carries a state for its describe title").toEqual(ROWS.map(entry => entry.id));
  });

  for (const row of ROWS) {
    describe(`${row.id} (${ROW_STATE[row.id] ?? "no state"}): ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(polarityMisses(witness), `${pin}: every control against its polarity, in code`).toEqual([]);
          expect(witness).toStrictEqual(ROSTER.witness[pin] ?? null);
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order and every pin reached its end", { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name), "every other test is in run mode, not inverted, and ran").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(entry => entry.pins));
  });
});
