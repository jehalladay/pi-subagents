/**
 * wb-ts6.2 (HXFS-PI-R6, program-triage-2026-10-18), the until-then leg: the HX mutation 'Verified' census.
 * Statement (bead title, as the tracker export holds it): "Before any Pi hyperunix capability with a non-read effect class
 * registers (gating artifact: the same Pi HX WRITE surface wb-tz2.8 gates), its reconcile/receipt path shall read an HX
 * mutation 'Verified' postcondition as filesystem-only - never as import/build/semantic success - and shall require an
 * independent build/import recheck before any semantic-success claim; the read adapter's refusal of mutation outcomes stays
 * until then."
 * The owner filing (the bead's notes) grounds the until-then posture: "Today the class is unreachable: wb-6ze.7's landed
 * adapter refuses mutation outcomes and the wb-tz2.8 standing census pins every registered hyperunix descriptor to effectClass
 * read, so no Pi path can represent Verified at all", and closes its armed acceptance with "the wb-tz2.8 effect-class census
 * remains the until-then standing guard". Rows A, B and C quote those three until-then clauses verbatim (the title's last
 * clause, the armed acceptance's last clause and the unreachability sentence's conclusion), held both ways to the export.
 * SOURCE (HyperUnix-CLI 694570cd00c2, read-only git show by the cutting seat; not read by this file):
 * docs/programs/feedback-query-skill-factory-2026-10-16/08-epistemic-and-performance-contracts.md:68 'never use "Verified" as
 * an implicit semantic refactor certificate'; README.md:33 'a filesystem Verified mutation is not semantically safe';
 * 06-workflow-recipes.md:90-91 (W7 steps 5-6: the program does not authorize the apply; "Independently recheck every
 * relevant import/build relationship and distinguish filesystem postcondition `Verified` from semantic build success").
 * The vendored SDK states the same boundary (MutationReceipt.verified, protocol/mutation.d.ts): "True only on coherent runtime
 * evidence of successful re-observation/postcondition verification." (A3 holds that sentence to the shipped declaration.)
 *
 * NOT DELIVERED HERE (the armed acceptance's first two clauses, NOT_DELIVERED below, held verbatim to the export): "a
 * reconcile unit test where a mutation receipt carrying a filesystem Verified postcondition yields a typed filesystem-only
 * reading and no build/semantic-success claim until an independent Forge/import recheck result is cited" and "a falsifier
 * reddens any surfaced string mapping Verified to semantic or build success". Both wait for the gating artifact, a Pi
 * hyperunix capability with a non-read effect class, which does not exist (B2 reads the armed set empty); until it registers
 * no Pi value can carry an HX mutation receipt for a reconcile test to read. When B2 reads a descriptor armed, this census
 * reds by design: re-measure, and the armed acceptance applies.
 *
 * MEASURED (read-only, by the cutting seat ws-04, run g10-work-s125, 2026-10-28, on trunk 061c2ac, re-read on a423a25): the
 * vendored @hyperunix/sdk 0.1.0 declares 13 ExecutionStatusKind members, two of them mutation outcomes (mutation-rejected,
 * mutation-partial), and no Verified kind; the adapter (src/workbench/hyperunix-observer.ts) refuses both mutation outcomes
 * under either licence and every Verified spelling the SDK's mutation protocol carries. Every registered hyperunix descriptor
 * is the hyperunix.find read, and src registers only the native one (twice: src/workbench/native-modules.ts and
 * src/workbench/hosts/local-detached.ts), never the injected-reader registration. src's 116 modules name the SDK at three
 * literals (one named import in src/workbench/providers/hyperunix.ts, the identity runtime-artifact list in src/index.ts, one
 * import.meta.resolve in src/workbench/hosts/local-detached.ts) and reference ten SDK members, all in that provider module, none
 * of the mutation or argv class. nativeEvidence projects HX metadata for hyperunix.find only (domainStatus is the result's kind,
 * verbatim), and the two verified glyphs (src/ui/workflow-card.ts, src/ui/workflow-dialog.ts) light on domainStatus
 * "verified", which no declared kind spells. src launches forge, git and rf by literal command, never hx.
 *
 * REPRESENT, as the owner filing grounds it: a Pi path represents Verified when an HX mutation outcome - a receipt, its
 * verification evidence, a recovery classification or a raw hx run - can reach a Pi value. Pi's own wording about Verified is
 * the armed falsifier's subject (NOT DELIVERED), named here as the residual R-PI-TEXT.
 *
 * The census pins three judged rows and the residuals' quiet rows:
 *  A, the adapter's refusal. A1 every kind the shipped declaration (dist/result.d.ts, by the TypeScript AST) declares, in
 *    order, is the adapter's kind tuple; each kind under either licence, read by hyperunixTopology over a minimal provider
 *    reading, projects (coverage and tone) or is refused (category and message), and the SDK's mutation outcomes (the
 *    "mutation-" kinds) are exactly the refused ones; the declaration reader reads its control. A2 hxLiveInvariant over the same
 *    readings: only the mutation outcomes break the read-outcome clause, and none licenses absence. A3 the mutation protocol's
 *    Verified vocabulary, read from the shipped dist/protocol/mutation.d.ts (the VerificationEvidence outcome union, the
 *    receipt-state tokens the RecoveryClassification.journalStatus doc lists, the MutationReceipt.verified doc), each token as
 *    a find kind: declared or not, the adapter's answer and the invariant's; the vocabulary reader reads its control.
 *  B, the standing guard. B1 test/workbench-hyperunix-effect-class-census.test.ts is present, byte-identical to the measured
 *    guard (sha256), names wb-tz2.8 and registers its suite and six cases (titles by AST); the title reader reads its control.
 *    B2 the guard's condition, re-measured: the hyperunix descriptors (the reconcile core's producerOf) of the native and the
 *    injected-reader registrations each read hyperunix.find|read and the armed set (any other effect class) is empty, with the
 *    judge's controls (a write and an external hyperunix descriptor arm it; a read one and another producer's write do not);
 *    the provider module's exports and every src call of its registration exports (with the call reader's control).
 *  C, the paths that could represent Verified. C1 every src string literal naming the SDK (the package or a subpath), read for
 *    its context (import, export, dynamic import, require, import type, import.meta.resolve, other) and the names it brings; a
 *    loading site VIOLATES when it is opaque (namespace, default, side-effect, export *, dynamic, require, subpath) or names one
 *    of the 39 exports the SDK's index re-exports from its two mutation modules (read from dist/index.d.ts); the thirteen
 *    site controls and the surface reader's control read as pinned. C2 one type-checked program over src (the repo's
 *    tsconfig file list and options) plus virtual control modules: every reference to a vendored-SDK member (a property access,
 *    an element access whose key type is a string literal, a destructured name) with its declaration file; a reference VIOLATES
 *    when it is of the MUTATION class (declared in dist/mutation.d.ts or dist/protocol/mutation.d.ts, or a member whose declared
 *    type is one of their exports: the mutations getter) or the ARGV class (a callable whose signature takes a caller argv: the
 *    raw escape hatch); the src reference list is pinned exactly (FAIL-CLOSED: a new SDK reference reds C2 for re-measure) and
 *    the eight controls (a member, a destructured name, a literal key, a const key, a namespace member, raw, a value flowed
 *    through another module) read as pinned. C3 the evidence projection: the nativeEvidence switch labels (by AST), each
 *    declared kind's projected domainStatus, a receipt-shaped output under each SDK mutation verb (the MutationOperation union
 *    and each MutationPlan method answering a MutationReceipt) projecting nothing, every src domainStatus comparison with a
 *    literal (the verified glyphs) and the declared kinds that would light one (none); the case, verb and glyph readers read
 *    their controls. C4 every src launch by a literal command (the child_process family and Pi's exec): the floor commands are
 *    seen and none launches hx (the command's first word hx or a path ending /hx); the four launch controls are flagged.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's witness, the constants, the controls, the residual families and every registered test title - is held to
 * the out-of-file roster (test/fixtures/hx-mutation-verified-roster.json); the labels of rows A, B and C are held both ways to
 * the bead's title and notes in the tracker export (.beads/issues.jsonl), and NOT_DELIVERED to the armed acceptance's first two
 * clauses. The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and
 * the pins that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and the
 * roster (the bead text anchors rows, not pins); a control removed from its list and the roster; a pin's case replaced by one
 * that echoes its roster witness.
 * RESIDUALS (named, each with its pinned quiet row): R-COMPUTED-KEY an SDK member reached by a key the checker cannot narrow
 * to a literal (a composed string) or by reflection (Reflect.get) is not read by C2 (Q1); R-CAST-AWAY an SDK value whose type
 * a cast replaces before the member is read is not an SDK reference (Q2); R-INJECTED-READER registerHyperUnixFind accepts any
 * reader and nativeEvidence copies a hyperunix.find kind unchecked, so a non-SDK reader's kind "verified" would project
 * domainStatus "verified" (the glyphs' trigger) although the adapter refuses it - src never calls that registration (B2) (Q3);
 * R-COMPOSED-SPECIFIER an SDK load whose specifier is built at run time is no C1 site (Q4); R-BOUND-LAUNCH an hx launch whose
 * command arrives through a binding is not seen by C4 (Q5); R-OUTSIDE-SRC the census reads src only: an operator's local
 * provider module (DetachedLaunchRequest.localProvider, loaded at run time from outside src) is not read, and C3 shows a
 * receipt-shaped output under an unknown capability projects no domainStatus (Q6); R-PI-TEXT a src string mapping Verified to
 * build or semantic success is not read by rows A-C - judging it is the undelivered falsifier (Q7).
 * SCOPE: the clause judges this repo's src and the vendored SDK 0.1.0; the reconcile core's evidence-read table
 * (RECONCILE_EVIDENCE_READS, wb-gwr.1 row B) and the src-wide descriptor-literal scan (wb-gwr.1 A3) are pinned there and not
 * re-read; C4 overlaps wb-ts6.1's N3 on literal launches only.
 *
 * Display paths added: none. Test-only: no scratch is allocated and nothing is written (the virtual modules live in memory);
 * src, the SDK's shipped declarations, one landed test file and .beads are only read.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { HYPERUNIX_EXECUTION_KINDS, type HyperUnixTopologyContext, hxLiveInvariant, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import * as hyperunixProvider from "../src/workbench/providers/hyperunix.js";
import { producerOf } from "../src/workflow/reconcile.js";

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "hx-mutation-verified-roster.json");
const BEAD = "wb-ts6.2";
/** The vendored SDK's package name and the shipped declarations the census reads (read-only). */
const SDK = "@hyperunix/sdk";
const SDK_DIST = "node_modules/@hyperunix/sdk/dist";
const RESULT_DECLARATION = `${SDK_DIST}/result.d.ts`;
const INDEX_DECLARATION = `${SDK_DIST}/index.d.ts`;
const MUTATION_DECLARATION = `${SDK_DIST}/mutation.d.ts`;
const MUTATION_PROTOCOL_DECLARATION = `${SDK_DIST}/protocol/mutation.d.ts`;
/** The SDK's two mutation modules, as its index re-exports them and as their declaration files sit below dist. */
const MUTATION_MODULES = ["./mutation.ts", "./protocol/mutation.ts"] as const;
const MUTATION_FILES = ["mutation.d.ts", "protocol/mutation.d.ts"] as const;
/** The SDK ExecutionStatusKind members whose name opens with this prefix are its mutation outcomes. */
const MUTATION_PREFIX = "mutation-";
/** The standing guard the bead names (wb-tz2.8's effect-class census) and the bead id its header names. */
const GUARD = "test/workbench-hyperunix-effect-class-census.test.ts";
const GUARD_BEAD = "wb-tz2.8";
/** The producer the reconcile core derives for a hyperunix capability (src/workflow/reconcile.ts producerOf). */
const PRODUCER = "hyperunix";
/** The src walk reaches at least this many modules (116 measured at the cut); a floor, not an exact set. */
const SRC_FLOOR = 100;
/** The module whose nativeEvidence switch projects producer metadata (domainStatus included). */
const EVIDENCE_MODULE = "src/workbench/native-evidence.ts";
/** Launchers whose first argument names the command (the child_process family and Pi's own exec). */
const LAUNCH_NAMES = ["exec", "execFile", "execFileSync", "execSync", "fork", "spawn", "spawnSync"] as const;
/** Commands src launches by a literal: C4's floor, so its scan is shown to see launches at all. */
const LAUNCH_FLOOR = ["forge", "git", "rf"] as const;
/** The host-bound context and identity every synthetic find reading carries (no file, process or SDK access). */
const WS = "/hx-mutation-verified-census/workspace";
const BINARY = "5f".repeat(32);
const CONTEXT: HyperUnixTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:census" },
  target: { kind: "hx.fs/regular-file", root: "src" },
  capturedAt: "2026-10-28T00:00:00Z",
  observedAt: "2026-10-28T00:00:01Z",
};
/** A receipt-shaped producer output: every Verified spelling the SDK's mutation protocol carries, under one source. */
const RECEIPT_SOURCE: JsonObject = {
  representation: "hyperunix.result/1",
  state: "Verified",
  verified: true,
  verification: { outcome: "verified" },
  execution_status: { kind: "verified" },
  execution_id: "census-execution",
};
/** The bead's own text: the sentence markers the clauses are read from (the owner filing in the tracker export). */
const UNREACHABLE = "Today the class is unreachable: ";
const ARMED = "Acceptance shape when armed: ";
/** The armed acceptance's clauses this cut does not deliver (held both ways to the export). */
const NOT_DELIVERED: readonly string[] = [
  "a reconcile unit test where a mutation receipt carrying a filesystem Verified postcondition yields a typed filesystem-only reading and no build/semantic-success claim until an independent Forge/import recheck result is cited",
  "a falsifier reddens any surfaced string mapping Verified to semantic or build success",
];
/** The clause readers' controls: synthetic bead text each reader must read exactly as pinned. */
const CLAUSE_CONTROLS = {
  title: "[X] One clause; two clause; the last clause stays.",
  notes: `Filing.\n\nToday the class is unreachable: a holds and b holds, so nothing reaches it; the rest. Acceptance shape when armed: first; second; third.\nAppended later. ${UNREACHABLE}x, so appended; ${ARMED}late; later.\n`,
} as const;

/** Synthetic declaration and module texts each reader must read exactly as pinned (none is compiled or run). */
const READER_CONTROLS: Readonly<Record<string, string>> = {
  result: `export type ExecutionStatus = (StatusBase & {\n    readonly kind: "complete";\n}) | (StatusBase & {\n    readonly kind: "mutation-verified";\n    readonly extra: "not-a-kind";\n});`,
  index: `export { a, type B } from "./mutation.ts";\nexport { c } from "./query.ts";\nexport { d as e } from "./protocol/mutation.ts";\nexport * from "./mutation.ts";`,
  protocol: `export interface VerificationEvidence {\n    readonly outcome: "verified" | "torn";\n}\nexport interface RecoveryClassification {\n    /** The token as printed (Verified, Torn, ...), or null. */\n    readonly journalStatus: string | null;\n}\nexport interface MutationReceipt {\n    /** Only on re-observation. */\n    readonly verified: boolean;\n}`,
  mutation: `export type MutationOperation = "create" | "touch";\nexport declare class MutationPlan {\n    preview(): Promise<MutationPreview>;\n    apply(options?: ApplyOptions): Promise<MutationReceipt>;\n    replay(): Promise<MutationReceipt>;\n}`,
  titles: "describe(\"suite one\", () => { it(\"case one\", () => {}); test(\"case two\", () => {}); it(`case three`, () => {}); it(TITLE, () => {}); });",
  evidence: `export function nativeEvidence(id: string) { switch (id) { case "a.read": break; case "hyperunix.apply": break; default: } }\nfunction other(id: string) { switch (id) { case "z.read": break; } }`,
  glyph: `const lit = node.domainStatus === "verified" || "complete" == entry.domainStatus || node.state === "done" || node.domainStatus !== "failed";`,
  registration: "registerHyperUnixFind(registry, reader, root);\nhyperunix.registerNativeHyperUnixFind(registry, root);\nregisterOther(registry);",
};
/** C1's controls: synthetic module bodies its SDK-site reader must read exactly as pinned (none is compiled or run). */
const SITE_CONTROLS: Readonly<Record<string, string>> = {
  "read-named": `import { Bounds, HyperUnix } from "@hyperunix/sdk";`,
  "named-mutation": `import { receiptFromJson } from "@hyperunix/sdk";`,
  "type-mutation": `import type { MutationReceipt } from "@hyperunix/sdk";`,
  "aliased-mutation": `import { Mutations as M } from "@hyperunix/sdk";`,
  namespace: `import * as sdk from "@hyperunix/sdk";`,
  "side-effect": `import "@hyperunix/sdk";`,
  subpath: `import { runHx } from "@hyperunix/sdk/raw";`,
  "export-star": `export * from "@hyperunix/sdk";`,
  "export-named": `export { MutationPlan } from "@hyperunix/sdk";`,
  dynamic: "export const load = () => import('@hyperunix/sdk');",
  require: `const sdk = require("@hyperunix/sdk");`,
  "import-type": `type R = import("@hyperunix/sdk").MutationReceipt;`,
  resolve: `const path = import.meta.resolve("@hyperunix/sdk");`,
};
/** C2's controls: virtual modules compiled with src (never on disk) whose SDK member references its reader must see. */
const MEMBER_CONTROLS: Readonly<Record<string, string>> = {
  member: `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = HyperUnix.open("/r").mutations;\n`,
  destructured: `import { HyperUnix } from "@hyperunix/sdk";\nconst { mutations } = HyperUnix.open("/r");\nexport { mutations };\n`,
  "element-literal": `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = HyperUnix.open("/r")["mutations"];\n`,
  "const-key": `import { HyperUnix } from "@hyperunix/sdk";\nconst KEY = "mutations";\nexport const read = HyperUnix.open("/r")[KEY];\n`,
  namespace: `import * as sdk from "@hyperunix/sdk";\nexport const decode = sdk.receiptFromJson;\n`,
  raw: `import { HyperUnix } from "@hyperunix/sdk";\nexport const run = HyperUnix.open("/r").raw(["apply", "plan"]);\n`,
  "flowed-open": `import { HyperUnix } from "@hyperunix/sdk";\nexport const open = () => HyperUnix.open("/r");\n`,
  flowed: `import { open } from "./flowed-open.js";\nexport const read = open().mutations;\n`,
};
/** R-COMPUTED-KEY's probes (Q1): a member reached by a composed key or by reflection. */
const COMPUTED_KEY_PROBES: Readonly<Record<string, string>> = {
  composed: `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = HyperUnix.open("/r")["mut" + "ations"];\n`,
  reflected: `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = Reflect.get(HyperUnix.open("/r"), "mutations");\n`,
};
/** R-CAST-AWAY's probe (Q2): an SDK value whose type a cast replaces before the member is read. */
const CAST_PROBE = `import { HyperUnix } from "@hyperunix/sdk";\nexport const read = (HyperUnix.open("/r") as unknown as { mutations: unknown }).mutations;\n`;
/** R-COMPOSED-SPECIFIER's probe (Q4): the SDK loaded through a specifier built at run time. */
const COMPOSED_SPECIFIER_PROBE = `const name = "@hyperunix/" + "sdk";\nexport const load = () => import(name);\nexport const loadTemplate = () => import(\`@hyperunix/\${"sdk"}\`);\n`;
/** C4's controls: literal launches of hx its reader must flag. */
const LAUNCH_CONTROLS: Readonly<Record<string, string>> = {
  literal: `spawn("hx", ["apply", "plan"]);`,
  shell: `exec("hx apply plan");`,
  path: `execFileSync("/usr/local/bin/hx", ["apply"]);`,
  member: `pi.exec("hx", ["mutation", "recover", "id"]);`,
};
/** R-BOUND-LAUNCH's probe (Q5): an hx launch whose command arrives through a binding. */
const BOUND_LAUNCH_PROBE = `const HX = "hx";\nspawn(HX, ["apply", "plan"]);\nexecFile(binaryPath, ["apply"]);\n`;
/** R-PI-TEXT's probe (Q7): Pi's own text mapping Verified to build and semantic success. */
const PI_TEXT_PROBE = `export const NOTE = "HX Verified: the build passed and the refactor is semantically safe";\n`;
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-COMPUTED-KEY": ["Q1"],
  "R-CAST-AWAY": ["Q2"],
  "R-INJECTED-READER": ["Q3"],
  "R-COMPOSED-SPECIFIER": ["Q4"],
  "R-BOUND-LAUNCH": ["Q5"],
  "R-OUTSIDE-SRC": ["Q6"],
  "R-PI-TEXT": ["Q7"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A, B and C, to the bead's own text. */
const ROWS: readonly Row[] = [
  { id: "A", label: "the read adapter's refusal of mutation outcomes stays until then", pins: ["A1", "A2", "A3"] },
  { id: "B", label: "the wb-tz2.8 effect-class census remains the until-then standing guard", pins: ["B1", "B2"] },
  { id: "C", label: "no Pi path can represent Verified at all", pins: ["C1", "C2", "C3", "C4"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly constants: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return [...value];
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.constants) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with constants and rows`);
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return { constants: json(raw.constants) as JsonObject, tests: strings(raw.tests, "roster tests"), rows };
}

const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// ---- source reading ----

function textOf(path: string): string {
  return readFileSync(join(REPO, path), "utf8");
}
function parse(name: string, text: string): ts.SourceFile {
  return ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function tsBelow(directory: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...tsBelow(path));
    else if (entry.isFile() && entry.name.endsWith(".ts")) found.push(path);
  }
  return found;
}
function repoPath(path: string): string {
  return relative(REPO, path).split(sep).join("/");
}
let modules: string[] | undefined;
/** Every src/**\/*.ts module, repo-relative and sorted. */
function srcModules(): string[] {
  modules ??= tsBelow(join(REPO, "src")).map(repoPath).sort();
  return modules;
}
const parsedSources = new Map<string, ts.SourceFile>();
function srcSource(module: string): ts.SourceFile {
  let source = parsedSources.get(module);
  if (source === undefined) {
    source = parse(module, textOf(module));
    parsedSources.set(module, source);
  }
  return source;
}
function each(node: ts.Node, visit: (node: ts.Node) => void): void {
  visit(node);
  ts.forEachChild(node, child => each(child, visit));
}
function literalText(node: ts.Node | undefined): string | undefined {
  return node !== undefined && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
}
/** A callee's own name: an identifier, or the name of the member a property access reads. */
function calleeName(callee: ts.Expression): string | undefined {
  if (ts.isIdentifier(callee)) return callee.text;
  return ts.isPropertyAccessExpression(callee) ? callee.name.text : undefined;
}

// ---- the SDK's own declarations (the anchors outside this census) ----

function typeAliasNamed(source: ts.SourceFile, name: string): ts.TypeAliasDeclaration | undefined {
  return source.statements.find((statement): statement is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(statement) && statement.name.text === name);
}
function interfaceNamed(source: ts.SourceFile, name: string): ts.InterfaceDeclaration | undefined {
  return source.statements.find((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === name);
}
function memberNamed(owner: ts.InterfaceDeclaration | ts.TypeLiteralNode, name: string): ts.PropertySignature | undefined {
  return owner.members.find(
    (member): member is ts.PropertySignature => ts.isPropertySignature(member) && ts.isIdentifier(member.name) && member.name.text === name,
  );
}
function unionLiterals(type: ts.TypeNode | undefined): string[] {
  if (type === undefined) return [];
  const members = ts.isUnionTypeNode(type) ? type.types : [type];
  return members.flatMap(member => (ts.isLiteralTypeNode(member) && ts.isStringLiteral(member.literal) ? [member.literal.text] : []));
}
/** A declaration's ExecutionStatusKind members, in declaration order (each ExecutionStatus variant's kind literal). */
function declaredKindsIn(text: string): string[] {
  const alias = typeAliasNamed(parse("result.d.ts", text), "ExecutionStatus");
  const kinds: string[] = [];
  if (alias !== undefined) {
    each(alias.type, node => {
      if (ts.isTypeLiteralNode(node)) kinds.push(...unionLiterals(memberNamed(node, "kind")?.type));
    });
  }
  return kinds;
}
function declaredKinds(): string[] {
  return declaredKindsIn(textOf(RESULT_DECLARATION));
}
/** The names an index re-exports from the two mutation modules, in declaration order. */
function mutationSurfaceIn(text: string): string[] {
  const names: string[] = [];
  for (const statement of parse("index.d.ts", text).statements) {
    const specifier = ts.isExportDeclaration(statement) ? literalText(statement.moduleSpecifier) : undefined;
    if (ts.isExportDeclaration(statement) && specifier !== undefined && (MUTATION_MODULES as readonly string[]).includes(specifier)) {
      if (statement.exportClause !== undefined && ts.isNamedExports(statement.exportClause)) names.push(...statement.exportClause.elements.map(element => element.name.text));
    }
  }
  return names;
}
function mutationSurface(): string[] {
  return mutationSurfaceIn(textOf(INDEX_DECLARATION));
}
/** The doc comment written directly above a node, as the declaration file spells it. */
function docOf(node: ts.Node, source: ts.SourceFile): string {
  const ranges = ts.getLeadingCommentRanges(source.text, node.getFullStart()) ?? [];
  return ranges.map(range => source.text.slice(range.pos, range.end)).join("\n");
}
interface Vocabulary {
  readonly outcomes: string[];
  readonly stateTokens: string[];
  readonly verifiedDoc: string;
}
/** A mutation protocol's Verified spellings: the verification outcome union and the receipt-state tokens its doc names. */
function verificationVocabularyIn(text: string): Vocabulary {
  const source = parse("mutation.d.ts", text);
  const evidence = interfaceNamed(source, "VerificationEvidence");
  const outcomes = evidence === undefined ? [] : unionLiterals(memberNamed(evidence, "outcome")?.type);
  const recovery = interfaceNamed(source, "RecoveryClassification");
  const status = recovery === undefined ? undefined : memberNamed(recovery, "journalStatus");
  const listed = status === undefined ? undefined : /\(([^)]*)\)/.exec(docOf(status, source))?.[1];
  const stateTokens = (listed ?? "")
    .split(",")
    .map(token => token.trim())
    .filter(token => /^[A-Za-z]+$/.test(token));
  const receipt = interfaceNamed(source, "MutationReceipt");
  const verified = receipt === undefined ? undefined : memberNamed(receipt, "verified");
  const verifiedDoc = verified === undefined ? "" : docOf(verified, source).replace(/^\/\*\*\s*|\s*\*\/$/g, "");
  return { outcomes, stateTokens, verifiedDoc };
}
/** A mutation module's verbs: its MutationOperation union, then each MutationPlan method that answers a MutationReceipt. */
function mutationVerbsIn(text: string): string[] {
  const source = parse("mutation.d.ts", text);
  const operations = unionLiterals(typeAliasNamed(source, "MutationOperation")?.type);
  const plan = source.statements.find((statement): statement is ts.ClassDeclaration => ts.isClassDeclaration(statement) && statement.name?.text === "MutationPlan");
  const writers = (plan?.members ?? []).flatMap(member =>
    ts.isMethodDeclaration(member) && ts.isIdentifier(member.name) && member.type !== undefined && member.type.getText(source) === "Promise<MutationReceipt>"
      ? [member.name.text]
      : [],
  );
  return [...operations, ...writers];
}

// ---- row A: the read adapter's refusal ----

function findReading(kind: string, licensed: boolean): JsonValue {
  return json({
    contract: "hyperunix.find/v1",
    source: {
      representation: "hyperunix.result/1",
      execution_status: { kind },
      coverage_summary: { licenses_absence: licensed },
      rows: [],
      rows_retained: true,
      operation: "find",
    },
    workspaceRoot: WS,
    runtime: { version: "0.1.0", binarySha256: BINARY },
  });
}
/** How the adapter answers one reading: the snapshot's coverage and tone, or the refusal's category and message. */
function topologyReading(reading: JsonValue): string {
  try {
    const [snapshot] = hyperunixTopology(reading, CONTEXT).snapshots;
    return `projected:${snapshot?.coverage ?? "none"}:${snapshot?.node.statusTone ?? "none"}`;
  } catch (error) {
    return error instanceof CapabilityError ? `refused:${error.category}:${error.message}` : `threw:${String(error)}`;
  }
}
function invariantReading(reading: JsonValue): string {
  const verdict = hxLiveInvariant(reading);
  return `${verdict.holds ? "holds" : "breaks"}:${verdict.violations.join("+") || "none"}:${verdict.absenceLicensed ? "absence-licensed" : "absence-not-licensed"}`;
}

// ---- row B: the standing guard ----

/** The suite and case titles a test module registers (describe/it/test calls with a literal title), in source order. */
function registeredTitles(text: string): { suites: string[]; cases: string[] } {
  const suites: string[] = [];
  const cases: string[] = [];
  each(parse("titles.ts", text), node => {
    if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression)) return;
    const title = literalText(node.arguments[0]);
    if (title === undefined) return;
    if (node.expression.text === "describe") suites.push(title);
    if (node.expression.text === "it" || node.expression.text === "test") cases.push(title);
  });
  return { suites, cases };
}
/** Clients and readers that are never invoked: registration only stores the descriptor. */
const NEVER = (): never => {
  throw new Error("census: a registered capability is never invoked");
};
const HX_READER: hyperunixProvider.HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
let native: Promise<CapabilityRegistry> | undefined;
/** The registry the native registration fills (loaded once per file). */
function nativeRegistry(): Promise<CapabilityRegistry> {
  native ??= loadWorkbenchNative().then(loaded => {
    const registry = new CapabilityRegistry();
    loaded.registerNativeProviders(registry, REPO);
    return registry;
  });
  return native;
}
function injectedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  hyperunixProvider.registerHyperUnixFind(registry, HX_READER, REPO);
  return registry;
}
function plantedRegistry(descriptor: Pick<CapabilityDescriptor, "id" | "effectClass">): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: {
      ...descriptor,
      version: "1.0.0",
      description: "census control",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      permissions: [`${producerOf(descriptor.id)}:control`],
      supportedModes: ["invoke"],
    },
    invoke: async () => NEVER(),
  });
  return registry;
}
/** The hyperunix descriptors a registry holds (the reconcile core's producer), each as id|effectClass. */
function hyperunixReadings(registry: CapabilityRegistry): string[] {
  return registry
    .catalogSnapshot()
    .map(entry => entry.descriptor)
    .filter(descriptor => producerOf(descriptor.id) === PRODUCER)
    .map(descriptor => `${descriptor.id}|${descriptor.effectClass}`);
}
/** The guard's condition: a hyperunix descriptor with any effect class but read arms the gate. */
function armed(readings: readonly string[]): string[] {
  return readings.filter(reading => !reading.endsWith("|read")).map(reading => reading.split("|")[0] ?? "");
}
/** The provider module's registration exports, read from the module itself. */
function registrationExports(): string[] {
  return Object.keys(hyperunixProvider)
    .filter(name => name.startsWith("register"))
    .sort();
}
/** One module's calls of the named registration functions, as module|callee. */
function registrationCallsIn(module: string, source: ts.SourceFile, names: ReadonlySet<string>): string[] {
  const calls: string[] = [];
  each(source, node => {
    if (ts.isCallExpression(node) && names.has(calleeName(node.expression) ?? "")) calls.push(`${module}|${node.expression.getText(source)}`);
  });
  return calls;
}
function registrationCalls(): string[] {
  const names = new Set(registrationExports());
  return srcModules().flatMap(module => registrationCallsIn(module, srcSource(module), names));
}

// ---- row C: the paths that could represent Verified ----

interface SdkSite {
  readonly reading: string;
  readonly violates: boolean;
}
const LOADING_CONTEXTS: ReadonlySet<string> = new Set(["import", "export", "dynamic-import", "require", "import-type"]);
/** One module's string literals that name the SDK (the package or a subpath), each read for its context and names. */
function sdkSites(module: string, source: ts.SourceFile, surface: ReadonlySet<string>): SdkSite[] {
  const sites: SdkSite[] = [];
  each(source, node => {
    const specifier = literalText(node);
    if (specifier === undefined || (specifier !== SDK && !specifier.startsWith(`${SDK}/`))) return;
    const parent = node.parent;
    let context = `literal:${ts.SyntaxKind[parent.kind]}`;
    let names: string[] = [];
    let opaque = false;
    if (ts.isImportDeclaration(parent) && parent.moduleSpecifier === node) {
      context = "import";
      const clause = parent.importClause;
      const bindings = clause?.namedBindings;
      if (clause === undefined || clause.name !== undefined || (bindings !== undefined && ts.isNamespaceImport(bindings))) opaque = true;
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        names = bindings.elements.map(element => `${clause?.isTypeOnly || element.isTypeOnly ? "type " : ""}${(element.propertyName ?? element.name).text}`);
      }
    } else if (ts.isExportDeclaration(parent) && parent.moduleSpecifier === node) {
      context = "export";
      const clause = parent.exportClause;
      if (clause === undefined || !ts.isNamedExports(clause)) opaque = true;
      else names = clause.elements.map(element => (element.propertyName ?? element.name).text);
    } else if (ts.isCallExpression(parent) && parent.expression.kind === ts.SyntaxKind.ImportKeyword) {
      context = "dynamic-import";
      opaque = true;
    } else if (ts.isCallExpression(parent) && ts.isIdentifier(parent.expression) && parent.expression.text === "require") {
      context = "require";
      opaque = true;
    } else if (
      ts.isCallExpression(parent) &&
      ts.isPropertyAccessExpression(parent.expression) &&
      ts.isMetaProperty(parent.expression.expression) &&
      parent.expression.name.text === "resolve"
    ) {
      context = "import-meta-resolve";
    } else if (ts.isLiteralTypeNode(parent) && ts.isImportTypeNode(parent.parent)) {
      context = "import-type";
      let first: ts.EntityName | undefined = parent.parent.qualifier;
      while (first !== undefined && ts.isQualifiedName(first)) first = first.left;
      if (first === undefined) opaque = true;
      else names = [first.text];
    }
    if (LOADING_CONTEXTS.has(context) && specifier !== SDK) opaque = true;
    const bare = names.map(name => name.replace(/^type /, ""));
    const violates = LOADING_CONTEXTS.has(context) && (opaque || bare.some(name => surface.has(name)));
    sites.push({ reading: `${module}|${context}|${specifier}|${names.join(",")}${opaque ? "|opaque" : ""}`, violates });
  });
  return sites;
}
function siteWitness(sites: readonly SdkSite[]): JsonValue {
  return json({ sites: sites.map(site => site.reading), violations: sites.filter(site => site.violates).map(site => site.reading) });
}

/** The census's virtual modules (never on disk): compiled beside src so the SDK and each other resolve. */
const VIRTUAL_DIR = join(REPO, "src", "__hx-mutation-verified-census__");
const VIRTUAL_SOURCES: Readonly<Record<string, string>> = {
  ...MEMBER_CONTROLS,
  ...Object.fromEntries(Object.entries(COMPUTED_KEY_PROBES).map(([name, text]) => [`q1-${name}`, text])),
  "q2-cast": CAST_PROBE,
  "q7-text": PI_TEXT_PROBE,
};
function virtualPath(name: string): string {
  return join(VIRTUAL_DIR, `${name}.ts`);
}
interface MemberProgram {
  readonly program: ts.Program;
  readonly checker: ts.TypeChecker;
  readonly srcFiles: readonly string[];
  readonly outsideSrc: number;
}
let memberProgram: MemberProgram | undefined;
/** One type-checked program over src (the repo's own tsconfig file list and options) plus the virtual modules. */
function compiled(): MemberProgram {
  if (memberProgram !== undefined) return memberProgram;
  const configPath = join(REPO, "tsconfig.json");
  const config = ts.readConfigFile(configPath, path => ts.sys.readFile(path));
  const parsedConfig = ts.parseJsonConfigFileContent(config.config, ts.sys, REPO, { noEmit: true }, configPath);
  const virtual = new Map(Object.entries(VIRTUAL_SOURCES).map(([name, text]) => [virtualPath(name), text]));
  const host = ts.createCompilerHost(parsedConfig.options, true);
  const getSourceFile = host.getSourceFile.bind(host);
  const fileExists = host.fileExists.bind(host);
  const readFile = host.readFile.bind(host);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreate) => {
    const text = virtual.get(fileName);
    return text !== undefined ? ts.createSourceFile(fileName, text, languageVersion, true, ts.ScriptKind.TS) : getSourceFile(fileName, languageVersion, onError, shouldCreate);
  };
  host.fileExists = fileName => virtual.has(fileName) || fileExists(fileName);
  host.readFile = fileName => virtual.get(fileName) ?? readFile(fileName);
  const directoryExists = host.directoryExists?.bind(host);
  host.directoryExists = directory => directory === VIRTUAL_DIR || (directoryExists === undefined ? ts.sys.directoryExists(directory) : directoryExists(directory));
  const realpath = host.realpath?.bind(host);
  host.realpath = path => (virtual.has(path) || realpath === undefined ? path : realpath(path));
  const srcFiles = parsedConfig.fileNames.map(path => repoPath(path)).sort();
  const program = ts.createProgram({ rootNames: [...parsedConfig.fileNames, ...virtual.keys()], options: parsedConfig.options, host });
  memberProgram = { program, checker: program.getTypeChecker(), srcFiles, outsideSrc: srcFiles.filter(path => !path.startsWith("src/")).length };
  return memberProgram;
}
/** Every identifier the SDK's declaration files spell: a prefilter only, since a member is read by its declared name. */
function sdkNames(): Set<string> {
  const names = new Set<string>();
  const below = (directory: string): void => {
    for (const entry of readdirSync(join(REPO, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) below(path);
      else if (entry.name.endsWith(".d.ts")) {
        each(parse(path, textOf(path)), node => {
          if (ts.isIdentifier(node)) names.add(node.text);
        });
      }
    }
  };
  below(SDK_DIST);
  return names;
}
/** The SDK declaration file (below dist) of a symbol, aliases followed, or undefined for anything declared elsewhere. */
function sdkFileOf(symbol: ts.Symbol | undefined, checker: ts.TypeChecker): { file: string; declaration: ts.Declaration } | undefined {
  if (symbol === undefined) return undefined;
  const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  const declaration = target.declarations?.[0];
  if (declaration === undefined) return undefined;
  const fileName = declaration.getSourceFile().fileName.split(sep).join("/");
  const marker = `/${SDK_DIST}/`;
  const at = fileName.indexOf(marker);
  return at === -1 ? undefined : { file: fileName.slice(at + marker.length), declaration };
}
/** The mutation class: declared in one of the SDK's two mutation modules, or a member whose declared type is one of their exports. */
function mutationClass(file: string, declaration: ts.Declaration, surface: ReadonlySet<string>): boolean {
  if ((MUTATION_FILES as readonly string[]).includes(file)) return true;
  const type =
    ts.isGetAccessorDeclaration(declaration) || ts.isPropertyDeclaration(declaration) || ts.isPropertySignature(declaration) ? declaration.type : undefined;
  return type !== undefined && ts.isTypeReferenceNode(type) && ts.isIdentifier(type.typeName) && surface.has(type.typeName.text);
}
/** The argv class: a callable member whose signature takes a caller-supplied argv (the SDK's raw escape hatch). */
function argvClass(symbol: ts.Symbol, at: ts.Node, checker: ts.TypeChecker): boolean {
  const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
  return checker
    .getTypeOfSymbolAtLocation(target, at)
    .getCallSignatures()
    .some(signature => signature.getParameters().some(parameter => parameter.name === "argv"));
}
interface MemberReference {
  readonly reading: string;
  readonly violates: boolean;
}
/** One source file's references to vendored-SDK members: property accesses, literal-typed element keys, destructured names. */
function memberReferences(
  file: ts.SourceFile,
  label: string,
  checker: ts.TypeChecker,
  universe: ReadonlySet<string>,
  surface: ReadonlySet<string>,
): MemberReference[] {
  const found: MemberReference[] = [];
  const record = (form: string, name: string, symbol: ts.Symbol | undefined, at: ts.Node): void => {
    const sdk = sdkFileOf(symbol, checker);
    if (symbol === undefined || sdk === undefined) return;
    const classes = [mutationClass(sdk.file, sdk.declaration, surface) ? "mutation" : "", argvClass(symbol, at, checker) ? "argv" : ""].filter(Boolean);
    found.push({ reading: [label, form, name, sdk.file, ...classes].join("|"), violates: classes.length > 0 });
  };
  each(file, node => {
    if (ts.isPropertyAccessExpression(node) && universe.has(node.name.text)) record("member", node.name.text, checker.getSymbolAtLocation(node.name), node);
    else if (ts.isElementAccessExpression(node)) {
      const keyType = checker.getTypeAtLocation(node.argumentExpression);
      const name = keyType.isStringLiteral() ? keyType.value : undefined;
      if (name !== undefined && universe.has(name)) record("element", name, checker.getTypeAtLocation(node.expression).getProperty(name), node);
    } else if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const key = node.propertyName ?? node.name;
      const name = ts.isIdentifier(key) || ts.isStringLiteralLike(key) ? key.text : undefined;
      if (name !== undefined && universe.has(name)) record("destructure", name, checker.getTypeAtLocation(node.parent).getProperty(name), node);
    }
  });
  return found;
}
function referenceWitness(references: readonly MemberReference[]): JsonValue {
  return json({ references: references.map(entry => entry.reading), violations: references.filter(entry => entry.violates).map(entry => entry.reading) });
}
let members: { src: MemberReference[]; virtual: Record<string, MemberReference[]> } | undefined;
/** C2's reading over src and the virtual modules (computed once per file). */
function memberReadings(): { src: MemberReference[]; virtual: Record<string, MemberReference[]> } {
  if (members !== undefined) return members;
  const { program, checker } = compiled();
  const universe = sdkNames();
  const surface = new Set(mutationSurface());
  const src: MemberReference[] = [];
  const virtual: Record<string, MemberReference[]> = {};
  const byPath = new Map(Object.keys(VIRTUAL_SOURCES).map(name => [virtualPath(name), name]));
  const byModule = new Map<string, ts.SourceFile>();
  for (const file of program.getSourceFiles()) {
    const name = byPath.get(file.fileName);
    if (name !== undefined) virtual[name] = memberReferences(file, `control:${name}`, checker, universe, surface);
    else byModule.set(repoPath(file.fileName), file);
  }
  // In src-walk order (sorted modules), never the program's import order.
  for (const module of srcModules()) {
    const file = byModule.get(module);
    if (file !== undefined) src.push(...memberReferences(file, module, checker, universe, surface));
  }
  members = { src, virtual };
  return members;
}

/** The literal labels of a module's nativeEvidence switch (the producer metadata projection), in source order. */
function evidenceCasesIn(source: ts.SourceFile): string[] {
  const labels: string[] = [];
  each(source, node => {
    if (ts.isFunctionDeclaration(node) && node.name?.text === "nativeEvidence") {
      each(node, inner => {
        const label = ts.isCaseClause(inner) ? literalText(inner.expression) : undefined;
        if (label !== undefined) labels.push(label);
      });
    }
  });
  return labels;
}
/** One module's comparisons of a domainStatus member with a string literal: the literal that lights a verified glyph. */
function glyphTriggersIn(module: string, source: ts.SourceFile): string[] {
  const triggers: string[] = [];
  each(source, node => {
    if (!ts.isBinaryExpression(node)) return;
    const operator = node.operatorToken.kind;
    if (operator !== ts.SyntaxKind.EqualsEqualsEqualsToken && operator !== ts.SyntaxKind.EqualsEqualsToken) return;
    const sides = [node.left, node.right];
    const member = sides.find(side => ts.isPropertyAccessExpression(side) && side.name.text === "domainStatus");
    const literal = sides.map(side => literalText(side)).find(text => text !== undefined);
    if (member !== undefined && literal !== undefined) triggers.push(`${module}|${literal}`);
  });
  return triggers;
}

interface Launch {
  readonly reading: string;
  /** The first word of the literal command. */
  readonly command: string;
}
/** One module's launches by a literal command, each read as module|launcher|command. */
function launches(module: string, source: ts.SourceFile): Launch[] {
  const found: Launch[] = [];
  each(source, node => {
    if (!ts.isCallExpression(node)) return;
    const name = calleeName(node.expression);
    const command = literalText(node.arguments[0]);
    if (name !== undefined && (LAUNCH_NAMES as readonly string[]).includes(name) && command !== undefined) {
      found.push({ reading: `${module}|${name}|${command}`, command: command.trim().split(/\s+/)[0] ?? "" });
    }
  });
  return found;
}
/** A launch names hx when its command's first word is hx or a path ending in /hx. */
function launchesHx(launch: Launch): boolean {
  return launch.command === "hx" || launch.command.endsWith("/hx");
}

// ---- the bead's own text ----

function exportRow(): { title: string; notes: string } {
  for (const line of textOf(".beads/issues.jsonl").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  return { title: "", notes: "" };
}
/** The title's until-then clause: its last "; " clause, the closing period removed. */
function titleClause(title: string): string {
  const at = title.lastIndexOf("; ");
  return at === -1 ? "" : title.slice(at + 2).replace(/\.$/, "");
}
/** The owner filing's unreachability conclusion: the ", so " clause of its first "Today the class is unreachable: " sentence. */
function unreachableClause(notes: string): string {
  const start = notes.indexOf(UNREACHABLE);
  const end = start === -1 ? -1 : notes.indexOf("; ", start);
  if (end === -1) return "";
  const sentence = notes.slice(start + UNREACHABLE.length, end);
  const at = sentence.lastIndexOf(", so ");
  return at === -1 ? "" : sentence.slice(at + ", so ".length);
}
/** The owner filing's armed acceptance: its first "Acceptance shape when armed: " sentence, split at "; ". */
function armedClauses(notes: string): string[] {
  const start = notes.indexOf(ARMED);
  if (start === -1) return [];
  const close = notes.indexOf(".\n", start);
  return notes
    .slice(start + ARMED.length, close === -1 ? notes.length : close)
    .replace(/\.$/, "")
    .split("; ");
}

// ---- the cases ----

const REACHED: string[] = [];

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const declared = declaredKinds();
    expect([...HYPERUNIX_EXECUTION_KINDS], "the adapter's kind tuple is the SDK's declared union, in order").toStrictEqual(declared);
    const mutationOutcomes = declared.filter(kind => kind.startsWith(MUTATION_PREFIX));
    const readings = declared.flatMap(kind => [false, true].map(licensed => `${kind}|${licensed}|${topologyReading(findReading(kind, licensed))}`));
    const refused = declared.filter(kind => readings.filter(reading => reading.startsWith(`${kind}|`)).every(reading => reading.includes("|refused:")));
    expect(refused, "the adapter refuses exactly the SDK's mutation outcomes, under either licence").toStrictEqual(mutationOutcomes);
    return json({ declared, mutationOutcomes, readings, control: declaredKindsIn(READER_CONTROLS.result ?? "") });
  },
  A2: async () => {
    const declared = declaredKinds();
    const readOutcomeBreaks = declared.filter(kind => hxLiveInvariant(findReading(kind, false)).violations.includes("read-outcome"));
    expect(readOutcomeBreaks, "only the SDK's mutation outcomes break the read-outcome clause").toStrictEqual(declared.filter(kind => kind.startsWith(MUTATION_PREFIX)));
    expect(
      readOutcomeBreaks.filter(kind => hxLiveInvariant(findReading(kind, true)).absenceLicensed),
      "no mutation outcome licenses absence",
    ).toStrictEqual([]);
    return json({
      readings: declared.flatMap(kind => [false, true].map(licensed => `${kind}|${licensed}|${invariantReading(findReading(kind, licensed))}`)),
      readOutcomeBreaks,
    });
  },
  A3: async () => {
    const { outcomes, stateTokens, verifiedDoc } = verificationVocabularyIn(textOf(MUTATION_PROTOCOL_DECLARATION));
    const declared = new Set(declaredKinds());
    const verifiedSpellings = [...outcomes, ...stateTokens].filter(token => token.toLowerCase() === "verified");
    expect(verifiedSpellings.length, "the protocol spells Verified").toBeGreaterThan(0);
    expect(
      verifiedSpellings.filter(token => declared.has(token) || !topologyReading(findReading(token, false)).startsWith("refused:")),
      "no Verified spelling is a find kind the adapter accepts",
    ).toStrictEqual([]);
    return json({
      outcomes,
      stateTokens,
      verifiedDoc,
      readings: [...outcomes, ...stateTokens].map(
        token => `${token}|${declared.has(token) ? "declared" : "undeclared"}|${topologyReading(findReading(token, false))}|${invariantReading(findReading(token, false))}`,
      ),
      control: verificationVocabularyIn(READER_CONTROLS.protocol ?? ""),
    });
  },
  B1: async () => {
    const text = textOf(GUARD);
    return json({
      path: GUARD,
      sha256: createHash("sha256").update(text).digest("hex"),
      namesBead: text.includes(GUARD_BEAD),
      ...registeredTitles(text),
      control: registeredTitles(READER_CONTROLS.titles ?? ""),
    });
  },
  B2: async () => {
    const nativeReadings = hyperunixReadings(await nativeRegistry());
    const injectedReadings = hyperunixReadings(injectedRegistry());
    expect(nativeReadings.length + injectedReadings.length, "both registrations hold a hyperunix descriptor").toBeGreaterThanOrEqual(2);
    expect(armed([...nativeReadings, ...injectedReadings]), "no hyperunix descriptor with a non-read effect class registers: the gate is not armed").toStrictEqual([]);
    return json({
      native: nativeReadings,
      injected: injectedReadings,
      armed: armed([...nativeReadings, ...injectedReadings]),
      controls: {
        "hyperunix-write": armed(hyperunixReadings(plantedRegistry({ id: "hyperunix.apply", effectClass: "write" }))),
        "hyperunix-external": armed(hyperunixReadings(plantedRegistry({ id: "hyperunix-mutation.apply", effectClass: "external" }))),
        "hyperunix-read": armed(hyperunixReadings(plantedRegistry({ id: "hyperunix.inspect", effectClass: "read" }))),
        "other-producer-write": armed(hyperunixReadings(plantedRegistry({ id: "forge.gate.run", effectClass: "write" }))),
      },
      providerExports: Object.keys(hyperunixProvider).sort(),
      registrationCalls: registrationCalls(),
      callControl: registrationCallsIn("control", parse("registration", READER_CONTROLS.registration ?? ""), new Set(registrationExports())),
    });
  },
  C1: async () => {
    const surface = new Set(mutationSurface());
    const all = srcModules();
    expect(all.length, "the src walk reached the modules").toBeGreaterThanOrEqual(SRC_FLOOR);
    const sites = all.flatMap(module => sdkSites(module, srcSource(module), surface));
    expect(sites.filter(site => site.violates).map(site => site.reading), "no src site loads the SDK's mutation surface or an opaque SDK surface").toStrictEqual([]);
    return json({
      mutationSurface: [...surface],
      surfaceControl: mutationSurfaceIn(READER_CONTROLS.index ?? ""),
      src: siteWitness(sites),
      controls: Object.fromEntries(
        Object.entries(SITE_CONTROLS).map(([name, text]) => [name, siteWitness(sdkSites(`control:${name}`, parse(name, text), surface))]),
      ),
    });
  },
  C2: async () => {
    const { src, virtual } = memberReadings();
    expect(compiled().srcFiles, "the program's src files are the src walk's modules").toStrictEqual(srcModules());
    expect(src.filter(entry => entry.violates).map(entry => entry.reading), "no src reference reaches the SDK's mutation or argv class").toStrictEqual([]);
    return json({
      src: referenceWitness(src),
      controls: Object.fromEntries(Object.keys(MEMBER_CONTROLS).map(name => [name, referenceWitness(virtual[name] ?? [])])),
    });
  },
  C3: async () => {
    const declared = declaredKinds();
    const triggers = srcModules().flatMap(module => glyphTriggersIn(module, srcSource(module)));
    const lit = new Set(triggers.map(trigger => trigger.split("|")[1] ?? ""));
    const cases = evidenceCasesIn(srcSource(EVIDENCE_MODULE));
    const verbs = mutationVerbsIn(textOf(MUTATION_DECLARATION));
    expect(declared.filter(kind => lit.has(kind)), "no declared kind lights a verified glyph").toStrictEqual([]);
    expect(
      verbs.filter(verb => Object.keys(nativeEvidence(`hyperunix.${verb}`, json({ contract: `hyperunix.${verb}/v1`, source: RECEIPT_SOURCE }))).length > 0),
      "a receipt-shaped output under a mutation verb projects nothing",
    ).toStrictEqual([]);
    return json({
      cases,
      hyperunixCases: cases.filter(label => producerOf(label) === PRODUCER),
      caseControl: evidenceCasesIn(parse("evidence", READER_CONTROLS.evidence ?? "")),
      findStatus: declared.map(kind => `${kind}|${nativeEvidence("hyperunix.find", findReading(kind, false)).domainStatus ?? "none"}`),
      verbs,
      verbControl: mutationVerbsIn(READER_CONTROLS.mutation ?? ""),
      receipts: verbs.map(verb => {
        const id = `hyperunix.${verb}`;
        return `${id}|${JSON.stringify(nativeEvidence(id, json({ contract: `${id}/v1`, source: RECEIPT_SOURCE })))}`;
      }),
      glyphTriggers: triggers,
      glyphControl: glyphTriggersIn("control", parse("glyph", READER_CONTROLS.glyph ?? "")),
      kindsLightingGlyph: declared.filter(kind => lit.has(kind)),
    });
  },
  C4: async () => {
    const found = srcModules().flatMap(module => launches(module, srcSource(module)));
    const commands = new Set(found.map(launch => launch.command));
    expect(LAUNCH_FLOOR.filter(command => !commands.has(command)), "the scan sees src's literal launches").toStrictEqual([]);
    expect(found.filter(launchesHx).map(launch => launch.reading), "no src module launches hx by a literal command").toStrictEqual([]);
    return json({
      floor: LAUNCH_FLOOR.filter(command => commands.has(command)),
      hx: found.filter(launchesHx).map(launch => launch.reading),
      controls: Object.fromEntries(
        Object.entries(LAUNCH_CONTROLS).map(([name, text]) => [
          name,
          launches(`control:${name}`, parse(name, text))
            .filter(launchesHx)
            .map(launch => launch.reading),
        ]),
      ),
    });
  },
  Q1: async () => {
    const { virtual } = memberReadings();
    return json(Object.fromEntries(Object.keys(COMPUTED_KEY_PROBES).map(name => [name, referenceWitness(virtual[`q1-${name}`] ?? [])])));
  },
  Q2: async () => json({ cast: referenceWitness(memberReadings().virtual["q2-cast"] ?? []) }),
  Q3: async () => {
    const reading = findReading("verified", false);
    return json({
      domainStatus: nativeEvidence("hyperunix.find", reading).domainStatus ?? "none",
      topology: topologyReading(reading),
      invariant: invariantReading(reading),
      injectedCalls: registrationCalls().filter(call => /(^|[|.])registerHyperUnixFind$/.test(call)),
    });
  },
  Q4: async () => siteWitness(sdkSites("probe:composed-specifier", parse("composed", COMPOSED_SPECIFIER_PROBE), new Set(mutationSurface()))),
  Q5: async () => {
    const found = launches("probe:bound-launch", parse("bound", BOUND_LAUNCH_PROBE));
    return json({ launches: found.map(launch => launch.reading), hx: found.filter(launchesHx).map(launch => launch.reading) });
  },
  Q6: async () =>
    json({
      walkOutsideSrc: srcModules().filter(module => !module.startsWith("src/")).length,
      programOutsideSrc: compiled().outsideSrc,
    }),
  Q7: async () => {
    const probe = parse("pi-text", PI_TEXT_PROBE);
    return json({
      sites: siteWitness(sdkSites("probe:pi-text", probe, new Set(mutationSurface()))),
      references: referenceWitness(memberReadings().virtual["q7-text"] ?? []),
      launches: launches("probe:pi-text", probe).map(launch => launch.reading),
    });
  },
};

describe("wb-ts6.2 HX mutation Verified census (HXFS-PI-R6, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's own text and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:2", "C:4", "Q:7"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(
      json({
        sdk: SDK,
        sdkDist: SDK_DIST,
        mutationModules: MUTATION_MODULES,
        mutationFiles: MUTATION_FILES,
        mutationPrefix: MUTATION_PREFIX,
        guard: GUARD,
        guardBead: GUARD_BEAD,
        producer: PRODUCER,
        srcFloor: SRC_FLOOR,
        evidenceModule: EVIDENCE_MODULE,
        launchNames: LAUNCH_NAMES,
        launchFloor: LAUNCH_FLOOR,
        workspace: WS,
        binary: BINARY,
        context: CONTEXT,
        receiptSource: RECEIPT_SOURCE,
        notDelivered: NOT_DELIVERED,
        clauseControls: CLAUSE_CONTROLS,
        readerControls: READER_CONTROLS,
        siteControls: SITE_CONTROLS,
        memberControls: MEMBER_CONTROLS,
        computedKeyProbes: COMPUTED_KEY_PROBES,
        castProbe: CAST_PROBE,
        composedSpecifierProbe: COMPOSED_SPECIFIER_PROBE,
        launchControls: LAUNCH_CONTROLS,
        boundLaunchProbe: BOUND_LAUNCH_PROBE,
        piTextProbe: PI_TEXT_PROBE,
        residuals: RESIDUALS,
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    expect(
      [titleClause(CLAUSE_CONTROLS.title), unreachableClause(CLAUSE_CONTROLS.notes), armedClauses(CLAUSE_CONTROLS.notes)],
      "the clause readers read their controls (the first sentence of each kind, never an appended one)",
    ).toStrictEqual(["the last clause stays", "nothing reaches it", ["first", "second", "third"]]);
    const { title, notes } = exportRow();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    const armedText = armedClauses(notes);
    expect(armedText, "the owner filing's armed acceptance states three clauses").toHaveLength(3);
    expect(armedText.slice(0, NOT_DELIVERED.length), "the undelivered clauses are the armed acceptance's first two, verbatim").toStrictEqual([...NOT_DELIVERED]);
    const clauses = [titleClause(title), armedText[armedText.length - 1] ?? "", unreachableClause(notes)];
    expect(clauses.filter(clause => clause.length === 0), "every quoted clause was found in the bead's own text").toStrictEqual([]);
    const judged = ROWS.filter(row => row.id !== "Q");
    for (const row of judged) expect(clauses.filter(clause => clause === row.label), `row ${row.id} quotes exactly one clause`).toHaveLength(1);
    for (const clause of clauses) expect(judged.filter(row => row.label === clause), `"${clause}" is quoted by exactly one row`).toHaveLength(1);
    expect(
      judged.filter(row => NOT_DELIVERED.includes(row.label)),
      "no judged row claims an undelivered clause",
    ).toStrictEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string =>
      `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
