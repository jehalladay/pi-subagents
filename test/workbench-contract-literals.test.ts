/**
 * W22-I (wb-cax.8): every contract/version literal in src has exactly one carrier.
 * Spec: docs/workbench/17-packaging-and-operations.md "Versioning / distribution":
 * "Version parser language and node-provider contract independently of bundle version.
 * Changed semantics require migration notes and fixture tests."
 *
 * wb-8l6 (cax.8 UD2 + O1): the census reads src through the TypeScript parser and counts string text only - a StringLiteral,
 * a NoSubstitutionTemplateLiteral and each literal part of a template with substitutions - so a backtick re-inline is an
 * occurrence (M2) and a comment never is (M4). Its embedded-id leg pins every contract id inside a larger string, per the owner's
 * UD2 ruling ("OUR contract ids compose the const ...; FOREIGN ... EXCLUDED as asserted FOREIGN rows"): our ids compose their
 * constant, and an id that stays literal is an asserted row - FOREIGN (another tool's id), EMBEDDED_PURITY (a guard forbids the
 * import) or OWNER_NAMED (the owner's carrier, named here and never composed).
 * Residuals, named and not pinned:
 * - M3: an id built at runtime or split over a concatenation is no string token, so neither leg sees it; src/workbench/
 *   native-evidence.ts matches `${capabilityId}/v1`, built from its argument.
 * - M4 class: doc-comment mentions of contract ids are never tokens and stay as written (line 3 of claude-control.ts,
 *   forge-control.ts, furnace-control.ts, detached-control.ts and reactivefiber-observer.ts; line 4 of forge-evidence.ts).
 */
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { ATTENTION_CONTRACT } from "../src/workbench/attention.js";
import { BEADS_WORK_CONTRACT } from "../src/workbench/beads-observer.js";
import { CLAUDE_EVIDENCE_CONTRACT } from "../src/workbench/claude-evidence.js";
import { CONTROL_CONTRACT_VERSION } from "../src/workbench/control.js";
import { CONTROL_REPLY_CONTRACT_VERSION } from "../src/workbench/control-reply.js";
import { EVIDENCE_CONTRACT } from "../src/workbench/evidence-loader.js";
import { EXECUTABLE_IDENTITY_CONTRACT } from "../src/workbench/executable-identity.js";
import { EXECUTE_CONTRACT_VERSION } from "../src/workbench/execute.js";
import { FURNACE_EVIDENCE_CONTRACT } from "../src/workbench/furnace-evidence.js";
import { FURNACE_EXTERNAL_OBSERVATION_CONTRACT } from "../src/workbench/furnace-observer.js";
import { GRAPH_VIEW_CONTRACT } from "../src/workbench/graph-view.js";
import { FURNACE_HOSTED_CONTRACT } from "../src/workbench/hosts/furnace-hosted.js";
import { DETACHED_CONTRACT } from "../src/workbench/hosts/local-detached.js";
import { HYPERUNIX_OBSERVATION_CONTRACT } from "../src/workbench/hyperunix-observer.js";
import { WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../src/workbench/identity.js";
import { LATENCY_CONTRACT } from "../src/workbench/latency.js";
import { OBSERVE_CONTRACT } from "../src/workbench/observe-query.js";
import { PATCH_PROPOSAL_CONTRACT } from "../src/workbench/patch-proposal.js";
import { FORGE_GATE_STATUS_CONTRACT } from "../src/workbench/providers/forge.js";
import { FURNACE_RUN_INSPECT_CONTRACT } from "../src/workbench/providers/furnace.js";
import { HYPERUNIX_FIND_CONTRACT } from "../src/workbench/providers/hyperunix.js";
import { REACTIVE_FIBER_CLI_SCHEMA, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { REACTIVEFIBER_OBSERVATION_CONTRACT } from "../src/workbench/reactivefiber-observer.js";
import { TELEMETRY_CONTRACT, TELEMETRY_EVENT_CONTRACT } from "../src/workbench/telemetry.js";
import { TIMELINE_CONTRACT } from "../src/workbench/timeline.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "../src/workbench/tool-replies.js";
import { TOPOLOGY_CONTRACT } from "../src/workbench/topology-slice.js";
import { VALIDATE_REPLY_CONTRACT_VERSION } from "../src/workbench/validate-reply.js";
import { ACKNOWLEDGEMENT_VALUE_CONTRACT, RECONCILE_CONTRACT_VERSION } from "../src/workflow/reconcile.js";

const SRC = join(process.cwd(), "src");
/** A contract id that is the whole text of a string token (a mixed quote pair is never one: the parser reads no such literal). */
const WHOLE_ID = /^[a-z][a-z0-9.-]*\/v[0-9]+$/;
/** A contract id anywhere inside string text; each maximal run is one embedded token. */
const EMBEDDED_ID = /[a-z][a-z0-9.-]*\/v[0-9]+/g;

/** Literal -> the one src file (relative to src/) that spells it. */
const CARRIERS: Readonly<Record<string, string>> = {
  "forge.gate.status/v1": "workbench/providers/forge.ts",
  "furnace.run.inspect/v1": "workbench/providers/furnace.ts",
  "hyperunix.find/v1": "workbench/providers/hyperunix.ts",
  "reactivefiber.render.preview/v1": "workbench/providers/reactivefiber.ts",
  "reactive-fiber.cli/v1": "workbench/providers/reactivefiber.ts",
  "workbench.control/v1": "workbench/control.ts",
  "workbench.local-detached/v1": "workbench/hosts/local-detached.ts",
  "pi-workbench/v1": "index.ts",
  "workflow-script/v1": "workbench/identity.ts",
  "workbench.attention/v1": "workbench/attention.ts",
  "workbench.timeline/v1": "workbench/timeline.ts",
  "workbench.topology-slice/v1": "workbench/topology-slice.ts",
  "workbench.evidence-loader/v1": "workbench/evidence-loader.ts",
  "workbench.furnace-evidence/v1": "workbench/furnace-evidence.ts",
  "workbench.tool-reply/v1": "workbench/tool-replies.ts",
  "workbench.reconcile/v1": "workflow/reconcile.ts",
  "workbench.reconcile.acknowledgement/v1": "workflow/reconcile.ts",
  "workbench.reconcile.entry/v1": "workflow/reconcile.ts",
  "beads.work.readiness/v1": "workbench/beads-observer.ts",
  "furnace.external-observation/v1": "workbench/furnace-observer.ts",
  "workbench.hyperunix-observation/v1": "workbench/hyperunix-observer.ts",
  "workbench.reactivefiber-observation/v1": "workbench/reactivefiber-observer.ts",
  "workbench.executable-identity/v1": "workbench/executable-identity.ts",
  "workbench.furnace-hosted/v1": "workbench/hosts/furnace-hosted.ts",
  "workbench.patch-proposal/v1": "workbench/patch-proposal.ts",
  "workbench.validate-reply/v1": "workbench/validate-reply.ts",
  // Absorbed at the b459773 re-cut under the 16:19Z R3 seat rule (trunk literals that landed while this census was unlanded):
  // wb-h8f.5 latency selector, wb-752.2 observe query, and the wb-cax.13 telemetry projection (one carrier, two literals).
  "workbench.latency-decomposition/v1": "workbench/latency.ts",
  "workbench.observe/v1": "workbench/observe-query.ts",
  "workbench.telemetry/v1": "workbench/telemetry.ts",
  "workbench.telemetry.event/v1": "workbench/telemetry.ts",
  // Absorbed at the d204be3 re-cut under the same rule: wb-6ze.10 claude evidence and wb-69g.5 execute contract.
  "workbench.claude-evidence/v1": "workbench/claude-evidence.ts",
  "workbench.execute/v1": "workbench/execute.ts",
  // Absorbed at the 06015e7 re-cut (F1 reader-scan: the census reads the whole src tree): wb-752.4 control reply (discharges the entry-12
  // CARRIERS duty, row + exported-value pin in this commit) and the graph-view contract that landed since the cut.
  "workbench.control-reply/v1": "workbench/control-reply.ts",
  "workbench.graph-view/v1": "workbench/graph-view.ts",
  // wb-4ap.2: Forge's own invalidation-basis kind, carried once by the one adapter that reads a package's derived_from under it.
  "invalidation-basis/v2": "workbench/forge-observer.ts",
  // wb-a3s: the forge_gate_run tool's reply contract, spelled once where the registered tool composes its reply.
  "workbench.forge-gate-run/v1": "index.ts",
};

/**
 * An excluded spelling: exact file, the reason, and the literal it still spells (so a stale exclusion goes red). An `embedded`
 * row (wb-8l6) excuses its literal inside a larger string of that file only and never a whole-literal spelling, so it can hide
 * neither a carrier's own constant nor a re-inline of it.
 */
interface Exclusion { readonly file: string; readonly reason: string; readonly embedded?: true }
type ExclusionTable = Readonly<Record<string, Exclusion>>;

/**
 * Asserted exclusions. Every row is listed by exact path with its reason and the census asserts the file STILL spells
 * the literal, so an exclusion goes red once the file moves to the constant. A silent allowlist is not acceptable.
 * RESERVED: duplicates inside reserved (HOT) files this bead may not edit (none: src/index.ts only spells its own
 * single-occurrence interfaceVersion). FOREIGN: another tool's contract id that must stay literal; the one row is
 * ReactiveFiberCLI's schema id inside the contractSource provenance string of both RF render descriptors (embedded; wb-8l6
 * reads providers/reactivefiber.ts and never edits it).
 */
const RESERVED_DUPLICATES: ExclusionTable = {};
const FOREIGN_CONTRACTS: ExclusionTable = {
  "reactive-fiber.cli/v1": {
    file: "workbench/providers/reactivefiber.ts",
    reason: "ReactiveFiberCLI's own schema id quoted in both render descriptors' contractSource (rf@<release>:<schema> context.render --no-commit): another tool's contract text, kept verbatim",
    embedded: true,
  },
};
/**
 * Observer-purity exclusions (owner ruling 16:19Z R1/R2 asks for const imports in all six consumers; three of them are
 * pinned by existing guards this bead may not weaken). forge-observer.ts is reachable from the extension boot path, and
 * a value import of providers/forge.ts loads @forge/sdk there (test/workbench-boot-isolation.test.ts: "disabled
 * Workbench boot must not load @forge/sdk"). hyperunix-observer.ts must import exactly four modules
 * (test/workbench-hyperunix-observer.test.ts "H7: ... imports only its four allowed modules") and detached-observer.ts
 * may import ./hosts/local-detached.js only with `import type` (test/workbench-detached-observer.test.ts "is
 * provider-free by construction"). A value import of the provider consts would break those guards and pull the SDK
 * and host runtime into the pure adapters. Each row is asserted, never silent; delete the row in the same commit that
 * relaxes the guard and moves the file to the constant.
 */
const OBSERVER_PURITY: ExclusionTable = {
  "forge.gate.status/v1": { file: "workbench/forge-observer.ts", reason: "boot-isolation guard: a value import of providers/forge.ts loads @forge/sdk at disabled boot" },
  "hyperunix.find/v1": { file: "workbench/hyperunix-observer.ts", reason: "H7 guard pins the observer to four allowed imports" },
  "workbench.local-detached/v1": { file: "workbench/detached-observer.ts", reason: "provider-free guard requires type-only host import" },
};
/**
 * Embedded ids our code keeps literal because a guard forbids the import (the OBSERVER_PURITY reasoning, for an id inside a
 * larger string). forge-evidence.ts is on the extension boot path (evidence-wiring.ts imports it) and does not import
 * providers/forge.ts, whose value import loads @forge/sdk (test/workbench-boot-isolation.test.ts: "disabled Workbench boot must
 * not load @forge/sdk"), so its transport error text keeps the id. Delete the row in the same commit that composes the text.
 */
const EMBEDDED_PURITY: ExclusionTable = {
  "forge.gate.status/v1": {
    file: "workbench/forge-evidence.ts",
    reason: "boot-isolation guard: a value import of providers/forge.ts loads @forge/sdk at disabled boot; the transport error text keeps the id",
    embedded: true,
  },
};
/** Embedded ids that are the owner's carrier (cax.8 U3 site list): named here, never composed or moved by this census. */
const OWNER_NAMED: ExclusionTable = {
  "workbench.identity/v1": {
    file: "workbench/identity.ts",
    reason: "identityDigest's hash domain tag, the template head before the NUL separator: the owner's carrier, out of this census's scope",
    embedded: true,
  },
};
/** The tables the embedded-id leg consults; only their embedded rows excuse an embedded token. */
const EMBEDDED_TABLES: readonly ExclusionTable[] = [FOREIGN_CONTRACTS, EMBEDDED_PURITY, OWNER_NAMED];
/**
 * UD2 OURS sites (cax.8 U3 site list): the UNVETTED refusal text of each control adapter composes CONTROL_CONTRACT_VERSION, the
 * constant control.ts carries, and renders byte-identically to the sentence it spelled before wb-8l6.
 */
const COMPOSED_UNVETTED: Readonly<Record<string, string>> = {
  "workbench/furnace-control.ts": "Furnace control executes only a permitted workbench.control/v1 decision minted by the control core.",
  "workbench/claude-control.ts": "Claude control executes only a permitted workbench.control/v1 decision minted by the control core.",
  "workbench/forge-control.ts": "Forge control executes only a permitted workbench.control/v1 decision minted by the control core.",
};

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap(name => { const path = join(dir, name); return statSync(path).isDirectory() ? sourceFiles(path) : path.endsWith(".ts") ? [path] : []; });
}
interface Occurrence { readonly literal: string; readonly where: string; readonly file: string }
/** A contract id in string text: the whole text of a string token, or one id embedded inside a larger string. */
interface Token extends Occurrence { readonly whole: boolean }
type StringText = ts.StringLiteral | ts.NoSubstitutionTemplateLiteral | ts.TemplateHead | ts.TemplateMiddle | ts.TemplateTail;

/** String text as the parser reads it: both quote forms, a no-substitution template, and each literal part of a template. */
function isStringText(node: ts.Node): node is StringText {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node);
}
const parsed = new Map<string, { readonly text: string; readonly tokens: readonly Token[] }>();
/** The contract-id tokens of one file's string text. A comment, a regular expression or an identifier is never string text. */
function fileTokens(file: string, text: string): readonly Token[] {
  const cached = parsed.get(file);
  if (cached?.text === text) return cached.tokens;
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const tokens: Token[] = [];
  const visit = (node: ts.Node): void => {
    if (isStringText(node)) {
      const where = `src/${file}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`;
      if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && WHOLE_ID.test(node.text)) tokens.push({ literal: node.text, where, file, whole: true });
      else for (const match of node.text.matchAll(EMBEDDED_ID)) tokens.push({ literal: match[0], where, file, whole: false });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  parsed.set(file, { text, tokens });
  return tokens;
}
function stringTokens(files: ReadonlyMap<string, string>): Token[] {
  return [...files].flatMap(([file, text]) => fileTokens(file, text));
}
/** Pure census over an injectable path -> text map (paths relative to src/), so fixtures can exercise it: whole-literal tokens. */
function census(files: ReadonlyMap<string, string>): Occurrence[] {
  return stringTokens(files).filter(token => token.whole).map(({ literal, where, file }) => ({ literal, where, file }));
}
/** Whether a whole-literal spelling in `file` is set aside by `row` (an embedded row never sets one aside). */
function wholeExcused(row: Exclusion | undefined, file: string): boolean {
  return row !== undefined && row.embedded !== true && row.file === file;
}
function realTree(): Map<string, string> {
  return new Map(sourceFiles(SRC).map(path => [relative(SRC, path), readFileSync(path, "utf8")]));
}
function groupByLiteral(items: readonly Occurrence[]): Map<string, Occurrence[]> {
  const byLiteral = new Map<string, Occurrence[]>();
  for (const item of items) byLiteral.set(item.literal, [...(byLiteral.get(item.literal) ?? []), item]);
  return byLiteral;
}
/** Offenders (literal occurring other than once once the asserted-excluded file's spelling is set aside) as `literal: path:line, ...`. */
function offenders(files: ReadonlyMap<string, string>, exclusions: ExclusionTable): string[] {
  const counted = census(files).filter(item => !wholeExcused(exclusions[item.literal], item.file));
  return [...groupByLiteral(counted).entries()]
    .filter(([, list]) => list.length !== 1)
    .map(([literal, list]) => `${literal}: ${list.map(item => item.where).join(", ")}`);
}
/**
 * Stale exclusions: rows whose file no longer spells the literal as string text in the form the row excuses (a whole literal,
 * or embedded for an embedded row). String-aware, so a comment quoting the literal never keeps a row alive.
 */
function staleExclusions(files: ReadonlyMap<string, string>, exclusions: ExclusionTable): string[] {
  const tokens = stringTokens(files);
  return Object.entries(exclusions)
    .filter(([literal, row]) => !tokens.some(token => token.literal === literal && token.file === row.file && token.whole === (row.embedded !== true)))
    .map(([literal, { file }]) => `${literal} in ${file}`);
}
/**
 * O2 (owner ruling 18:3xZ R1): every purity-excluded literal must be a CARRIERS key whose carrier is a DIFFERENT file than
 * the excluded observer, so a provider contract bump (re-keyed CARRIERS) cannot hide behind an exclusion row that keeps
 * spelling the old literal.
 */
function purityViolations(carriers: Readonly<Record<string, string>>, exclusions: ExclusionTable): string[] {
  return Object.entries(exclusions).flatMap(([literal, { file }]) => {
    const carrier = carriers[literal];
    if (carrier === undefined) return [`${literal}: not a CARRIERS key`];
    return carrier === file ? [`${literal}: carried by the excluded file ${file}`] : [];
  });
}
function carrierTable(files: ReadonlyMap<string, string>, exclusions: ExclusionTable): Record<string, string> {
  const actual: Record<string, string> = {};
  for (const item of census(files)) if (!wholeExcused(exclusions[item.literal], item.file)) actual[item.literal] ??= item.file;
  return actual;
}
/** Embedded ids no embedded row excuses (a row excuses its literal inside string text of exactly its file), as `literal: path:line, ...`. */
function embeddedOffenders(files: ReadonlyMap<string, string>, tables: readonly ExclusionTable[]): string[] {
  const excused = (token: Token): boolean => tables.some(table => table[token.literal]?.embedded === true && table[token.literal]?.file === token.file);
  return [...groupByLiteral(stringTokens(files).filter(token => !token.whole && !excused(token))).entries()]
    .map(([literal, list]) => `${literal}: ${list.map(item => item.where).join(", ")}`);
}
/** Rows of the given tables that are not embedded rows (the embedded-id leg consults embedded rows only). */
function notEmbedded(tables: readonly ExclusionTable[]): string[] {
  return tables.flatMap(table => Object.entries(table).filter(([, row]) => row.embedded !== true).map(([literal, { file }]) => `${literal} in ${file}`));
}
/**
 * How `const UNVETTED` is initialised in one adapter: `composed` only when it is a template whose every substitution is the
 * CONTROL_CONTRACT_VERSION binding the file value-imports from ./control.js (and declares nowhere itself); `rendered` is the
 * text it yields with the real constant substituted (or a plain string's own text).
 */
function unvettedInitializer(text: string): { readonly composed: boolean; readonly rendered: string | undefined } {
  const source = ts.createSourceFile("adapter.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const imported = source.statements.filter(ts.isImportDeclaration).some(declaration => ts.isStringLiteral(declaration.moduleSpecifier) &&
    declaration.moduleSpecifier.text === "./control.js" && declaration.importClause?.isTypeOnly !== true &&
    declaration.importClause?.namedBindings !== undefined && ts.isNamedImports(declaration.importClause.namedBindings) &&
    declaration.importClause.namedBindings.elements.some(element => !element.isTypeOnly && element.propertyName === undefined && element.name.text === "CONTROL_CONTRACT_VERSION"));
  const declared: string[] = [];
  const collect = (node: ts.Node): void => {
    if ((ts.isVariableDeclaration(node) || ts.isFunctionDeclaration(node) || ts.isParameter(node)) && node.name !== undefined && ts.isIdentifier(node.name)) declared.push(node.name.text);
    ts.forEachChild(node, collect);
  };
  collect(source);
  const initializers = source.statements.filter(ts.isVariableStatement).flatMap(statement => statement.declarationList.declarations)
    .filter(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === "UNVETTED").map(declaration => declaration.initializer);
  const [initializer] = initializers;
  if (initializers.length !== 1 || initializer === undefined) return { composed: false, rendered: undefined };
  if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) return { composed: false, rendered: initializer.text };
  if (!ts.isTemplateExpression(initializer)) return { composed: false, rendered: undefined };
  const constant = (span: ts.TemplateSpan): boolean => ts.isIdentifier(span.expression) && span.expression.text === "CONTROL_CONTRACT_VERSION";
  const composed = imported && !declared.includes("CONTROL_CONTRACT_VERSION") && initializer.templateSpans.every(constant);
  const rendered = initializer.templateSpans.every(constant)
    ? initializer.head.text + initializer.templateSpans.map(span => CONTROL_CONTRACT_VERSION + span.literal.text).join("")
    : undefined;
  return { composed, rendered };
}

/** Fixture source text for templates, spelled without a placeholder inside a plain string. */
const TICK = "`";
const slot = (expression: string): string => "$" + "{" + expression + "}";

describe("contract literals have one carrier each", () => {
  it("every distinct contract literal, in either quote form, occurs exactly once in src (offenders reported as path:line)", () => {
    expect(offenders(realTree(), { ...RESERVED_DUPLICATES, ...FOREIGN_CONTRACTS, ...OBSERVER_PURITY })).toEqual([]);
  });

  it("the pinned table is exactly the set of literals in src, each in its one carrier file", () => {
    expect(carrierTable(realTree(), OBSERVER_PURITY)).toEqual(CARRIERS);
  });

  it("the exclusion tables are pinned exactly (RESERVED empty; FOREIGN the one UD2 row) and none is stale", () => {
    expect(RESERVED_DUPLICATES).toEqual({});
    expect(FOREIGN_CONTRACTS).toEqual({ "reactive-fiber.cli/v1": { file: "workbench/providers/reactivefiber.ts", reason: expect.stringMatching(/\S/), embedded: true } });
    expect(Object.keys(OBSERVER_PURITY).sort()).toEqual(["forge.gate.status/v1", "hyperunix.find/v1", "workbench.local-detached/v1"]);
    expect(staleExclusions(realTree(), { ...RESERVED_DUPLICATES, ...FOREIGN_CONTRACTS, ...OBSERVER_PURITY })).toEqual([]);
  });

  it("negative control: a fixture re-inlining a literal in either quote form is reported at exactly that path:line", () => {
    const base = new Map([["workbench/providers/hyperunix.ts", 'export const HYPERUNIX_FIND_CONTRACT = "hyperunix.find/v1";\n']]);
    expect(offenders(base, {})).toEqual([]);
    const doubled = new Map(base).set("workbench/hyperunix-observer.ts", 'import x from "y";\nconst CONTRACT = "hyperunix.find/v1";\n');
    expect(offenders(doubled, {})).toEqual(["hyperunix.find/v1: src/workbench/providers/hyperunix.ts:1, src/workbench/hyperunix-observer.ts:2"]);
    const single = new Map(base).set("workbench/other.ts", "const a = 1;\nconst b = 2;\nconst CONTRACT = 'hyperunix.find/v1';\n");
    expect(offenders(single, {})).toEqual(["hyperunix.find/v1: src/workbench/providers/hyperunix.ts:1, src/workbench/other.ts:3"]);
    const mixed = new Map([["a.ts", "const a = \"hyperunix.find/v1';\n"]]);
    expect(census(mixed)).toEqual([]);
  });

  it("an asserted exclusion suppresses exactly its literal, and goes stale when the file moves to the constant", () => {
    const files = new Map([["workbench/a.ts", 'export const A = "x.y/v1";\n'], ["workbench/reserved.ts", "const A = 'x.y/v1';\n"]]);
    const exclusions: ExclusionTable = { "x.y/v1": { file: "workbench/reserved.ts", reason: "reserved fixture file" } };
    expect(offenders(files, {})).toEqual(["x.y/v1: src/workbench/a.ts:1, src/workbench/reserved.ts:1"]);
    expect(offenders(files, exclusions)).toEqual([]);
    expect(staleExclusions(files, exclusions)).toEqual([]);
    const moved = new Map(files).set("workbench/reserved.ts", "import { A } from './a.js';\nconst B = A;\n");
    expect(staleExclusions(moved, exclusions)).toEqual(["x.y/v1 in workbench/reserved.ts"]);
  });

  it("O2: every purity-excluded literal is a CARRIERS key carried by a different file (the real tables satisfy it)", () => {
    expect(purityViolations(CARRIERS, OBSERVER_PURITY)).toEqual([]);
  });

  it("O2 red-first (gate mutant D1): a provider bumped to /v2 with CARRIERS re-keyed leaves the observer's /v1 row without a carrier and is reported by literal", () => {
    const bumped: Readonly<Record<string, string>> = { ...CARRIERS, "forge.gate.status/v2": "workbench/providers/forge.ts" };
    const { "forge.gate.status/v1": _dropped, ...rekeyed } = bumped;
    expect(purityViolations(rekeyed, OBSERVER_PURITY)).toEqual(["forge.gate.status/v1: not a CARRIERS key"]);
  });

  it("O2: an exclusion row whose carrier is the excluded file itself is reported (the carrier must be a different file)", () => {
    const selfCarried: Readonly<Record<string, string>> = { ...CARRIERS, "hyperunix.find/v1": "workbench/hyperunix-observer.ts" };
    expect(purityViolations(selfCarried, OBSERVER_PURITY)).toEqual(["hyperunix.find/v1: carried by the excluded file workbench/hyperunix-observer.ts"]);
  });

  it("exported constants carry the pinned values (the docs/17 fixture test)", () => {
    expect({
      FORGE_GATE_STATUS_CONTRACT, FURNACE_RUN_INSPECT_CONTRACT, HYPERUNIX_FIND_CONTRACT, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, REACTIVE_FIBER_CLI_SCHEMA,
      CONTROL_CONTRACT_VERSION, DETACHED_CONTRACT, WORKFLOW_SCRIPT_SCHEMA_VERSION, ATTENTION_CONTRACT, TIMELINE_CONTRACT, TOPOLOGY_CONTRACT,
      EVIDENCE_CONTRACT, FURNACE_EVIDENCE_CONTRACT, TOOL_REPLY_CONTRACT_VERSION, RECONCILE_CONTRACT_VERSION, ACKNOWLEDGEMENT_VALUE_CONTRACT,
      BEADS_WORK_CONTRACT, FURNACE_EXTERNAL_OBSERVATION_CONTRACT, HYPERUNIX_OBSERVATION_CONTRACT, REACTIVEFIBER_OBSERVATION_CONTRACT,
      EXECUTABLE_IDENTITY_CONTRACT, FURNACE_HOSTED_CONTRACT, PATCH_PROPOSAL_CONTRACT, VALIDATE_REPLY_CONTRACT_VERSION,
      LATENCY_CONTRACT, OBSERVE_CONTRACT, TELEMETRY_CONTRACT, TELEMETRY_EVENT_CONTRACT,
      CLAUDE_EVIDENCE_CONTRACT, EXECUTE_CONTRACT_VERSION, CONTROL_REPLY_CONTRACT_VERSION, GRAPH_VIEW_CONTRACT,
    }).toEqual({
      FORGE_GATE_STATUS_CONTRACT: "forge.gate.status/v1",
      FURNACE_RUN_INSPECT_CONTRACT: "furnace.run.inspect/v1",
      HYPERUNIX_FIND_CONTRACT: "hyperunix.find/v1",
      REACTIVEFIBER_RENDER_PREVIEW_CONTRACT: "reactivefiber.render.preview/v1",
      REACTIVE_FIBER_CLI_SCHEMA: "reactive-fiber.cli/v1",
      CONTROL_CONTRACT_VERSION: "workbench.control/v1",
      DETACHED_CONTRACT: "workbench.local-detached/v1",
      WORKFLOW_SCRIPT_SCHEMA_VERSION: "workflow-script/v1",
      ATTENTION_CONTRACT: "workbench.attention/v1",
      TIMELINE_CONTRACT: "workbench.timeline/v1",
      TOPOLOGY_CONTRACT: "workbench.topology-slice/v1",
      EVIDENCE_CONTRACT: "workbench.evidence-loader/v1",
      FURNACE_EVIDENCE_CONTRACT: "workbench.furnace-evidence/v1",
      TOOL_REPLY_CONTRACT_VERSION: "workbench.tool-reply/v1",
      RECONCILE_CONTRACT_VERSION: "workbench.reconcile/v1",
      ACKNOWLEDGEMENT_VALUE_CONTRACT: "workbench.reconcile.acknowledgement/v1",
      BEADS_WORK_CONTRACT: "beads.work.readiness/v1",
      FURNACE_EXTERNAL_OBSERVATION_CONTRACT: "furnace.external-observation/v1",
      HYPERUNIX_OBSERVATION_CONTRACT: "workbench.hyperunix-observation/v1",
      REACTIVEFIBER_OBSERVATION_CONTRACT: "workbench.reactivefiber-observation/v1",
      EXECUTABLE_IDENTITY_CONTRACT: "workbench.executable-identity/v1",
      FURNACE_HOSTED_CONTRACT: "workbench.furnace-hosted/v1",
      PATCH_PROPOSAL_CONTRACT: "workbench.patch-proposal/v1",
      VALIDATE_REPLY_CONTRACT_VERSION: "workbench.validate-reply/v1",
      LATENCY_CONTRACT: "workbench.latency-decomposition/v1",
      OBSERVE_CONTRACT: "workbench.observe/v1",
      TELEMETRY_CONTRACT: "workbench.telemetry/v1",
      TELEMETRY_EVENT_CONTRACT: "workbench.telemetry.event/v1",
      CLAUDE_EVIDENCE_CONTRACT: "workbench.claude-evidence/v1",
      EXECUTE_CONTRACT_VERSION: "workbench.execute/v1",
      CONTROL_REPLY_CONTRACT_VERSION: "workbench.control-reply/v1",
      GRAPH_VIEW_CONTRACT: "workbench.graph-view/v1",
    });
  });

  it("no contract literal embeds the bundle version, and the table is unchanged under a bumped temp package.json", () => {
    const version = (JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8")) as { version: string }).version;
    for (const item of census(realTree())) expect(item.literal, item.where).not.toContain(version);
    const scratch = mkdtempSync(join(tmpdir(), "contract-literals-"));
    try {
      const copy = join(scratch, "package.json");
      const bumped = `${version.split(".").map(Number).map((part, index) => (index === 0 ? part + 90 : part)).join(".")}-bumped`;
      writeFileSync(copy, JSON.stringify({ ...(JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8")) as object), version: bumped }));
      const bumpedVersion = (JSON.parse(readFileSync(copy, "utf8")) as { version: string }).version;
      expect(bumpedVersion).not.toBe(version);
      for (const item of census(realTree())) expect(item.literal, item.where).not.toContain(bumpedVersion);
      expect(carrierTable(realTree(), OBSERVER_PURITY)).toEqual(CARRIERS);
    } finally {
      rmSync(scratch, { recursive: true, force: true });
    }
  });

  it("M2 (wb-8l6): a backtick re-inline of a pinned literal is an occurrence, reported at exactly that path:line, and so is an escaped spelling", () => {
    const base = new Map([["workbench/providers/hyperunix.ts", 'export const HYPERUNIX_FIND_CONTRACT = "hyperunix.find/v1";\n']]);
    const backtick = new Map(base).set("workbench/hyperunix-observer.ts", `import x from "y";\nconst CONTRACT = ${TICK}hyperunix.find/v1${TICK};\n`);
    expect(offenders(backtick, {})).toEqual(["hyperunix.find/v1: src/workbench/providers/hyperunix.ts:1, src/workbench/hyperunix-observer.ts:2"]);
    // The parser reads a literal's cooked text, so an escape sequence spells the same literal.
    const escaped = new Map(base).set("workbench/other.ts", 'const CONTRACT = "hyperunix.find\\u002fv1";\n');
    expect(offenders(escaped, {})).toEqual(["hyperunix.find/v1: src/workbench/providers/hyperunix.ts:1, src/workbench/other.ts:1"]);
  });

  it("M4 (wb-8l6): a comment quoting a pinned literal is no occurrence and never keeps an exclusion alive", () => {
    const base = new Map([["workbench/providers/hyperunix.ts", 'export const HYPERUNIX_FIND_CONTRACT = "hyperunix.find/v1";\n']]);
    const commented = new Map(base).set("workbench/hyperunix-observer.ts", "// the carrier spells \"hyperunix.find/v1\"\n/* or 'hyperunix.find/v1' */\nconst a = 1;\n");
    expect(offenders(commented, {})).toEqual([]);
    expect(census(commented).map(item => item.where)).toEqual(["src/workbench/providers/hyperunix.ts:1"]);
    const exclusions: ExclusionTable = { "hyperunix.find/v1": { file: "workbench/hyperunix-observer.ts", reason: "fixture row" } };
    expect(staleExclusions(commented, exclusions)).toEqual(["hyperunix.find/v1 in workbench/hyperunix-observer.ts"]);
  });

  it("UD2 (wb-8l6): every contract id embedded inside a larger string in src is an asserted embedded row; ours compose the const (offenders as path:line)", () => {
    expect(embeddedOffenders(realTree(), EMBEDDED_TABLES)).toEqual([]);
  });

  it("UD2: the embedded-row tables are pinned exactly, hold embedded rows only, and none is stale", () => {
    const row = (file: string): unknown => ({ file, reason: expect.stringMatching(/\S/), embedded: true });
    expect(EMBEDDED_PURITY).toEqual({ "forge.gate.status/v1": row("workbench/forge-evidence.ts") });
    expect(OWNER_NAMED).toEqual({ "workbench.identity/v1": row("workbench/identity.ts") });
    expect(notEmbedded(EMBEDDED_TABLES)).toEqual([]);
    expect(EMBEDDED_TABLES.flatMap(table => staleExclusions(realTree(), table))).toEqual([]);
  });

  it("UD2 + O2: an embedded purity row names a CARRIERS key carried by a different file, a FOREIGN row quotes a carried contract, and a bump that re-keys CARRIERS is reported", () => {
    expect(purityViolations(CARRIERS, EMBEDDED_PURITY)).toEqual([]);
    expect(Object.keys(FOREIGN_CONTRACTS).filter(literal => CARRIERS[literal] === undefined)).toEqual([]);
    // D1 shape: both providers bumped to /v2 with CARRIERS re-keyed leave the embedded /v1 rows behind without a carrier.
    const { "forge.gate.status/v1": _forge, "reactive-fiber.cli/v1": _schema, ...rest } = CARRIERS;
    const bumped: Readonly<Record<string, string>> = { ...rest, "forge.gate.status/v2": "workbench/providers/forge.ts", "reactive-fiber.cli/v2": "workbench/providers/reactivefiber.ts" };
    expect(purityViolations(bumped, EMBEDDED_PURITY)).toEqual(["forge.gate.status/v1: not a CARRIERS key"]);
    expect(Object.keys(FOREIGN_CONTRACTS).filter(literal => bumped[literal] === undefined)).toEqual(["reactive-fiber.cli/v1"]);
  });

  it("UD2 negative control: an id embedded in every string form is reported at its path:line; a comment, a whole literal and a runtime-built id (M3) are not embedded tokens", () => {
    const files = new Map([
      ["workbench/a.ts", 'export const A = "x.y/v1";\n'],
      ["workbench/b.ts", [
        'const d = "uses x.y/v1 here";',
        "const s = 'uses x.y/v1 here';",
        `const t = ${TICK}uses x.y/v1 here${TICK};`,
        `const u = ${TICK}head x.y/v1 ${slot("d")} middle x.y/v1 ${slot("s")} tail x.y/v1${TICK};`,
        "// a comment naming x.y/v1 or \"x.y/v1\"",
        `const r = ${TICK}${slot('A.split("/")[0]')}/v1${TICK};`,
        'const c = "x.y" + "/v1";',
        "",
      ].join("\n")],
    ]);
    const b = (line: number): string => `src/workbench/b.ts:${line}`;
    expect(embeddedOffenders(files, [])).toEqual([`x.y/v1: ${[b(1), b(2), b(3), b(4), b(4), b(4)].join(", ")}`]);
    expect(offenders(files, {})).toEqual([]);
    expect(census(files).map(item => item.where)).toEqual(["src/workbench/a.ts:1"]);
  });

  it("UD2: an embedded row excuses its literal inside strings of exactly its file and never a whole literal; it goes stale once the file composes", () => {
    const files = new Map([
      ["workbench/p.ts", 'export const P = "x.y/v1";\nexport const D = "provenance x.y/v1 text";\n'],
      ["workbench/q.ts", 'const E = "error x.y/v1 text";\n'],
    ]);
    const row: ExclusionTable = { "x.y/v1": { file: "workbench/p.ts", reason: "fixture row", embedded: true } };
    expect(embeddedOffenders(files, [row])).toEqual(["x.y/v1: src/workbench/q.ts:1"]);
    expect(staleExclusions(files, row)).toEqual([]);
    // The whole-literal leg ignores an embedded row: the carrier's own spelling stays counted, so a re-inline elsewhere is reported.
    const reinlined = new Map(files).set("workbench/r.ts", 'const P = "x.y/v1";\n');
    expect(offenders(reinlined, row)).toEqual(["x.y/v1: src/workbench/p.ts:1, src/workbench/r.ts:1"]);
    expect(carrierTable(files, row)).toEqual({ "x.y/v1": "workbench/p.ts" });
    // A whole-literal row for the same file excuses no embedded token.
    const wholeRow: ExclusionTable = { "x.y/v1": { file: "workbench/p.ts", reason: "fixture row" } };
    expect(embeddedOffenders(files, [wholeRow])).toEqual(["x.y/v1: src/workbench/p.ts:2, src/workbench/q.ts:1"]);
    const composed = new Map(files).set("workbench/p.ts", `export const P = "x.y/v1";\nexport const D = ${TICK}provenance ${slot("P")} text${TICK};\n`);
    expect(staleExclusions(composed, row)).toEqual(["x.y/v1 in workbench/p.ts"]);
    expect(embeddedOffenders(composed, [row])).toEqual(["x.y/v1: src/workbench/q.ts:1"]);
  });

  it("UD2 OURS: each control adapter's UNVETTED text composes the imported CONTROL_CONTRACT_VERSION and renders the byte-identical sentence", () => {
    const tree = realTree();
    const actual = Object.fromEntries(Object.keys(COMPOSED_UNVETTED).map(file => [file, unvettedInitializer(tree.get(file) ?? "")]));
    expect(actual).toEqual(Object.fromEntries(Object.entries(COMPOSED_UNVETTED).map(([file, sentence]) => [file, { composed: true, rendered: sentence }])));
  });

  it("UD2 OURS negative control: a plain string, another slot expression, a local or type-only or aliased binding, or no import is not composed", () => {
    const header = 'import { CONTROL_CONTRACT_VERSION } from "./control.js";\n';
    const declare = (initializer: string): string => `const UNVETTED = ${initializer};\n`;
    const template = (expression: string): string => `${TICK}a ${slot(expression)} b${TICK}`;
    expect(unvettedInitializer(header + declare(template("CONTROL_CONTRACT_VERSION")))).toEqual({ composed: true, rendered: "a workbench.control/v1 b" });
    expect(unvettedInitializer(header + declare('"a workbench.control/v1 b"'))).toEqual({ composed: false, rendered: "a workbench.control/v1 b" });
    expect(unvettedInitializer(header + declare(template("OTHER")))).toEqual({ composed: false, rendered: undefined });
    for (const text of [
      `${header}const CONTROL_CONTRACT_VERSION = "workbench.control/v1";\n${declare(template("CONTROL_CONTRACT_VERSION"))}`,
      `import type { CONTROL_CONTRACT_VERSION } from "./control.js";\n${declare(template("CONTROL_CONTRACT_VERSION"))}`,
      `import { type CONTROL_CONTRACT_VERSION } from "./control.js";\n${declare(template("CONTROL_CONTRACT_VERSION"))}`,
      `import { OTHER as CONTROL_CONTRACT_VERSION } from "./control.js";\n${declare(template("CONTROL_CONTRACT_VERSION"))}`,
      `import { CONTROL_CONTRACT_VERSION } from "./other.js";\n${declare(template("CONTROL_CONTRACT_VERSION"))}`,
      declare(template("CONTROL_CONTRACT_VERSION")),
      `${header}${declare(template("CONTROL_CONTRACT_VERSION"))}${declare(template("CONTROL_CONTRACT_VERSION"))}`,
    ]) expect(unvettedInitializer(text).composed, text).toBe(false);
  });
});
