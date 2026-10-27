/**
 * wb-kku9.4 (MW-CAC-WORKFLOW-COMPOSITION-R4, program-triage-2026-10-22), a standing posture census. Statement (bead notes, full
 * form): "No Pi surface shall compose two or more individual success receipts (Forge, Furnace, Beads, Git) into a global
 * 'verified' or 'integrated' claim: each receipt is projected with its own producer-stated status and, absent an explicit
 * bridge invariant/certificate (none exists: 'no bridge checker exists at HEAD', 01-composition-contracts.md:4), Pi
 * synthesizes no cross-producer aggregated success tone, verdict word or composed PASS." The cited MechanicalWorkflows program
 * (01-composition-contracts.md:14@5ce2a07f891f) is design-only at its pin; this census echoes its words and claims nothing of it.
 * Acceptance (owner filing, verbatim; the labels of rows A, B and C): "(a) vitest: topology-slice / EvidenceLoader over two
 * success receipts from different producers yields two nodes with their own tones and no synthesized aggregate
 * node/edge/evidence ref of kind 'verified'/'integrated'; (b) census scoped to cross-producer composition: no src module
 * computes a tone or verdict word by reducing over receipts of more than one producer (all-success mutant fails); exempt
 * forge-observer.ts:125-129, which reduces per-package rows of ONE gate.status envelope to 'current gate passed' (wb-6hb.2),
 * else the census is red today; (c) docs/workbench gains one census-bound sentence that per-step receipts never compose into a
 * global verdict in Pi."
 *
 * READINGS
 * - (a) RECEIPTS: the two success receipts are produced by the producers' own readers, never hand-built: forgeGateTopology over
 *   a forge.gate.status/v1 reading (one current package, success, verdict null) and FurnaceObserver.projectionTopology over a
 *   completed Run with one succeeded Attempt (a fake SDK client). Both topologies enter one ObservationProjection. A ROOT is a
 *   node no relation points at; the two roots are the receipts, each with the tone and status text its producer stated (the
 *   package and Attempt nodes are each producer's own breakdown). selectLinkedTopology reads each root's slice, and the host
 *   EvidenceStore (createWorkbenchEvidenceStore with fake registry and Furnace client seams) requests each root's own evidence
 *   refs (the Forge reason-code ref forge:gate.status:<code> has no loader by design, docs/20 Producer mapping, and reads
 *   unavailable no-loader) and each producer's ref on the other producer's root.
 *   The A3 judge lists every node, edge and evidence ref the projection holds that no producer stated, every edge that joins two
 *   producers, and every node or ref that spells a SYNTHESIZED word (verified, integrated); a planted composed node is its
 *   positive control. The projection's one roll-up (aggregate) over a display parent that groups both receipts is read too.
 * - (b) SITE: a REDUCER call (every, some, reduce, reduceRight, filter, find, findLast, findIndex, findLastIndex) whose inline
 *   callback reads a STATUS field or spells a VERDICT word; a LOOP (for, for...of, for...in, while, do) whose body does so and
 *   writes a binding declared outside it; or COMPARISONS: one function's own body (nested functions excluded) comparing a status
 *   field of two or more distinct receivers with a verdict word, in one && or || chain or in separate conditions (nested if,
 *   ternary, switch arm). A site counts only when its innermost function YIELDS a verdict word: a string or template literal
 *   outside the site spells one, or the site's value is bound to a name whose camel-case words include one. The site's
 *   PRODUCERS are the producer names its function's literals spell (word tokens). A site is EXEMPT only when its key
 *   (module, function, form, receiver, fields) is on EXEMPT and it names exactly one producer; every other site is a FINDING.
 *   Judged: every src/**\/*.ts module git lists (tracked or untracked, never ignored), read with the TypeScript parser; a
 *   filesystem walk (symlinks refused) must list the same modules.
 * - (c) the docs/workbench page set at HEAD and at the filing revision d75b68d10a1a, split into sentences; docs/03 § Design
 *   constraints rendered through the shared helper docsSection (test/helpers/census.ts).
 *
 * OUTSIDE ANCHOR: the owner filing's row of wb-kku9.4 in the tracked bead export (.beads/issues.jsonl). Its acceptance holds
 * exactly the clauses (a)-(c), each equal to its row label, and each row's pin quotes tile its clause (only separators between
 * them). The statement's producers, the synthesized words (verified, integrated), the composed word (PASS), the exempt citation
 * (file and line range) and its qualifier ('current gate passed'), and clause (c)'s sentence are read from that text: every
 * producer the statement names is a producer of the vocabulary, every verdict word the filing spells makes an all-success
 * mutant a finding, the exempt site at the filing revision sits inside the cited lines, and the docs sentence carries the
 * clause verbatim. A word or producer removed from every literal of this file and the roster therefore still reds.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, vocabulary, exemptions, the docs
 * sentence and every pin's witness are held to the out-of-file roster (test/fixtures/receipt-composition-roster.json); the last
 * case reads that every pin ran to its witness.
 * RESIDUALS (named; each has a pinned quiet row in B3 or B1): R-HELPER-SPLIT a reduction in one function whose verdict word is
 *   spelled by another (a helper returning a boolean, or an enclosing function); R-NAMED-CALLBACK a reducer whose callback is
 *   a name or member rather than an inline function; R-COMPUTED-WORD a verdict word or status reached through a binding (a
 *   constant declared outside the function, a destructured parameter) or assembled at run time; R-FAILURE-SIDE a composed failure or other non-success tone (the statement
 *   names an aggregated success tone, verdict word or composed PASS); R-SET-SHAPE a composition by Set size, sort, min/max, join
 *   or a single comparison beside one indexed receipt; R-OUTSIDE-SRC a composition outside src/**\/*.ts (qa, examples, test,
 *   scripts) is not judged (the filing scopes src modules).
 *
 * FOLLOW-UP wb-0kfa (R694, the landing-341 gate cmd_3422feebe799 PASS-WITH-FINDING; F1 leads, F2 rides):
 *  F1 the residual family list's anchor outside this file and its roster: the wb-kku9.4 export row carries the landed
 *    delivery record, whose RESIDUALS line names every residual with its quiet pin and the witness key that pin holds it
 *    under (B3 residuals at 0 sites, B1 judgedOf). The residual anchor case holds the roster's residuals, RESIDUAL_SHAPES
 *    and the B3 witness keys to that line, so the gate's G15 (R-SET-SHAPE removed from every literal of this file and its
 *    roster at once, green 12/12 on the landed census) reds against text no census cut edits.
 *  F2 C2 reads the docs sentence's receipt list (a Forge gate status, a Furnace attempt, Beads readiness, a Git revision)
 *    and maps each receipt to the producer it names. Forge and Furnace are row A's receipts. Beads readiness is read
 *    through its producer's own reader (readBeadsWork over a fake bd show envelope of a closed task, then
 *    projectBeadsWork), projected beside them, keeps its own producer-stated status (closed reads unknown, never success)
 *    and composes nothing with them. A Git revision names a producer no src module spells as a provider (a provider
 *    property or signature, or a constant whose name says provider, through every string literal of its value and the
 *    module's string constants it names; one planted control per form), so the Git clause holds vacuously. Whatever the
 *    roster holds, C2 throws when the list's producers are not the statement's, when a root's presentation is not the one
 *    its producer stated, or when src spells a listed producer as a provider and no receipt of it is projected here (a
 *    src Git projector therefore reds C2 until this census reads its receipt). The reading follows spellings only and
 *    claims no more: a provider assembled at run time, or imported under a name that does not say provider, is outside it.
 *
 * Display paths added: none. Test-only plus one docs sentence: every fixture lives in memory (no scratch); src, docs and the
 * bead export are only read; git is only read (ls-files, show, ls-tree, cat-file).
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type BeadsReadClient, projectBeadsWork, readBeadsWork } from "../src/workbench/beads-observer.js";
import type { CapabilityRegistry, JsonValue } from "../src/workbench/capability-registry.js";
import { createWorkbenchEvidenceStore } from "../src/workbench/evidence-wiring.js";
import { forgeGateTopology } from "../src/workbench/forge-observer.js";
import { FurnaceObserver, type FurnaceObserverClient } from "../src/workbench/furnace-observer.js";
import { type NativeRef, type NativeSnapshot, ObservationProjection, type ObservationScope, type RelationKind } from "../src/workbench/observation.js";
import { selectLinkedTopology } from "../src/workbench/topology-slice.js";
import { docsSection } from "./helpers/census.js";

interface Pin { readonly id: string; readonly quote: string }
interface Row { readonly id: string; readonly label: string; readonly pins: readonly Pin[] }
interface Vocabulary {
  readonly reducers: readonly string[];
  readonly statusFields: readonly string[];
  readonly verdictWords: readonly string[];
  readonly synthesized: readonly string[];
  readonly producers: Readonly<Record<string, readonly string[]>>;
}
interface Constants {
  readonly filingRead: string;
  readonly moduleFloor: number;
  readonly doc: string;
  readonly docParent: string;
  readonly docHeading: string;
  readonly exempt: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly vocabulary: Vocabulary;
  readonly constants: Constants;
  readonly docSentence: string;
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly (Pin & { readonly witness: JsonValue })[] }[];
  readonly residuals: readonly { readonly id: string; readonly quietPin: string }[];
}
interface Site {
  readonly module: string;
  readonly fn: string;
  readonly form: "reducer" | "loop" | "comparisons";
  readonly op: string;
  readonly receiver: string;
  readonly fields: readonly string[];
  readonly words: readonly string[];
  readonly producers: readonly string[];
  readonly line: number;
}
interface StatedRelation {
  readonly scope: ObservationScope;
  readonly from: NativeRef;
  readonly to: NativeRef;
  readonly kind: RelationKind;
  readonly provenance: { readonly source: string; readonly observedAt?: string; readonly nativeConfirmationRef?: string };
}
interface Receipts { readonly snapshots: readonly NativeSnapshot[]; readonly relations: readonly StatedRelation[] }

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SELF = "test/workbench-receipt-composition-census.test.ts";
const ROSTER_FILE = "test/fixtures/receipt-composition-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-kku9.4";
const ROSTER = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")) as Roster;
const VOCABULARY: Vocabulary = {
  reducers: ["every", "some", "reduce", "reduceRight", "filter", "find", "findLast", "findIndex", "findLastIndex"],
  statusFields: ["statusTone", "tone", "status", "state", "lastResult", "last_result", "verdict", "result", "outcome", "conclusion", "domainStatus", "exitCode", "exit_code", "ok", "passed", "succeeded", "success"],
  verdictWords: ["success", "succeeded", "successful", "verified", "integrated", "pass", "passed", "green"],
  synthesized: ["verified", "integrated"],
  producers: { forge: ["forge"], furnace: ["furnace"], beads: ["beads", "bd"], git: ["git"], claude: ["claude"], hyperunix: ["hyperunix", "hx"], reactivefiber: ["reactivefiber", "rf"], graphpolicy: ["graphpolicy", "gp"] },
};
const CONSTANTS: Constants = {
  filingRead: "d75b68d10a1a",
  moduleFloor: 115,
  doc: "docs/workbench/03-architecture-and-ownership.md",
  docParent: "03 — High-level architecture, module ownership and dataflow",
  docHeading: "Design constraints",
  exempt: [
    "src/workbench/forge-observer.ts#forgeGateTopology#reducer:every#packages#lastResult",
    "src/workbench/forge-observer.ts#forgeGateTopology#reducer:some#packages#lastResult",
  ],
};
const DOC_SENTENCE =
  "Per-step receipts never compose into a global verdict in Pi: each receipt (a Forge gate status, a Furnace attempt, Beads readiness, a Git revision) is projected with its own producer-stated status, and no src module reduces receipts of more than one producer into a success tone or a verified, integrated or PASS word while no bridge invariant or certificate exists (wb-kku9.4, judged by test/workbench-receipt-composition-census.test.ts over every src module, which exempts only the Forge reader's reduction over the package rows of one gate.status envelope).";
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) vitest: topology-slice / EvidenceLoader over two success receipts from different producers yields two nodes with their own tones and no synthesized aggregate node/edge/evidence ref of kind 'verified'/'integrated'",
    pins: [
      { id: "A1", quote: "vitest: topology-slice / EvidenceLoader over two success receipts from different producers" },
      { id: "A2", quote: "yields two nodes with their own tones" },
      { id: "A3", quote: "and no synthesized aggregate node/edge/evidence ref of kind 'verified'/'integrated'" },
    ],
  },
  {
    id: "B",
    label: "(b) census scoped to cross-producer composition: no src module computes a tone or verdict word by reducing over receipts of more than one producer (all-success mutant fails); exempt forge-observer.ts:125-129, which reduces per-package rows of ONE gate.status envelope to 'current gate passed' (wb-6hb.2), else the census is red today",
    pins: [
      { id: "B1", quote: "census scoped to cross-producer composition" },
      { id: "B2", quote: "no src module computes a tone or verdict word by reducing over receipts of more than one producer" },
      { id: "B3", quote: "(all-success mutant fails)" },
      { id: "B4", quote: "exempt forge-observer.ts:125-129, which reduces per-package rows of ONE gate.status envelope to 'current gate passed' (wb-6hb.2)" },
      { id: "B5", quote: "else the census is red today" },
    ],
  },
  {
    id: "C",
    label: "(c) docs/workbench gains one census-bound sentence that per-step receipts never compose into a global verdict in Pi",
    pins: [
      { id: "C1", quote: "docs/workbench gains one census-bound sentence" },
      { id: "C2", quote: "that per-step receipts never compose into a global verdict in Pi" },
    ],
  },
];

// ---------------------------------------------------------------------------------------------------------------- the scanner
const byName = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
const tokens = (text: string): string[] => text.toLowerCase().split(/[^a-z0-9]+/).filter(token => token !== "");
const camelWords = (name: string): string[] => tokens(name.replace(/([a-z0-9])([A-Z])/g, "$1 $2"));
const FIELDS = new Set(VOCABULARY.statusFields);
const REDUCERS = new Set(VOCABULARY.reducers);
const WORDS = new Set(VOCABULARY.verdictWords);
const verdictTokens = (text: string): string[] => tokens(text).filter(token => WORDS.has(token));
const ASSIGNMENTS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.EqualsToken, ts.SyntaxKind.PlusEqualsToken, ts.SyntaxKind.MinusEqualsToken, ts.SyntaxKind.AsteriskEqualsToken, ts.SyntaxKind.BarEqualsToken,
  ts.SyntaxKind.AmpersandEqualsToken, ts.SyntaxKind.BarBarEqualsToken, ts.SyntaxKind.AmpersandAmpersandEqualsToken, ts.SyntaxKind.QuestionQuestionEqualsToken,
]);
const EQUALITIES: ReadonlySet<ts.SyntaxKind> = new Set([ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken]);
const LOGICAL: ReadonlySet<ts.SyntaxKind> = new Set([ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken]);

function literalText(node: ts.Node): string | undefined {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) return [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" ");
  return undefined;
}
function unparen(node: ts.Expression): ts.Expression {
  let at = node;
  while (ts.isParenthesizedExpression(at)) at = at.expression;
  return at;
}
function walk(node: ts.Node, visit: (node: ts.Node) => boolean | undefined): void {
  if (visit(node) === false) return;
  ts.forEachChild(node, child => { walk(child, visit); });
}
/** The status fields a callback or loop body reads and whether it spells a verdict word itself. */
function reads(node: ts.Node): { fields: string[]; word: boolean } {
  const fields = new Set<string>();
  let word = false;
  walk(node, inner => {
    if (ts.isPropertyAccessExpression(inner) && FIELDS.has(inner.name.text)) fields.add(inner.name.text);
    if (ts.isElementAccessExpression(inner)) {
      const key = literalText(inner.argumentExpression);
      if (key !== undefined && FIELDS.has(key)) fields.add(key);
    }
    const text = literalText(inner);
    if (text !== undefined && verdictTokens(text).length > 0) word = true;
    return true;
  });
  return { fields: [...fields].sort(byName), word };
}
/** Identifiers a loop declares itself (its initializer, its body's declarations and binding patterns). */
function declaredWithin(node: ts.Node): Set<string> {
  const names = new Set<string>();
  const bind = (name: ts.BindingName): void => {
    if (ts.isIdentifier(name)) names.add(name.text);
    else for (const element of name.elements) if (ts.isBindingElement(element)) bind(element.name);
  };
  walk(node, inner => {
    if (ts.isVariableDeclaration(inner) || ts.isParameter(inner)) bind(inner.name);
    return true;
  });
  return names;
}
function writesOuter(loop: ts.Node): boolean {
  const inner = declaredWithin(loop);
  let writes = false;
  walk(loop, node => {
    if (ts.isBinaryExpression(node) && ASSIGNMENTS.has(node.operatorToken.kind) && ts.isIdentifier(node.left) && !inner.has(node.left.text)) writes = true;
    if ((ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) && ts.isIdentifier(node.operand) && !inner.has(node.operand.text)) writes = true;
    return true;
  });
  return writes;
}
function statusComparison(node: ts.Expression, source: ts.SourceFile): { receiver: string; field: string } | undefined {
  const at = unparen(node);
  if (!ts.isBinaryExpression(at) || !EQUALITIES.has(at.operatorToken.kind)) return undefined;
  for (const [read, word] of [[at.left, at.right], [at.right, at.left]] as const) {
    const text = literalText(unparen(word));
    const access = unparen(read);
    if (text !== undefined && verdictTokens(text).length > 0 && ts.isPropertyAccessExpression(access) && FIELDS.has(access.name.text)) {
      return { receiver: access.expression.getText(source), field: access.name.text };
    }
  }
  return undefined;
}
/** The name the site's value is bound to, through parentheses, a condition, a logical chain, a negation or an assertion. */
function boundName(node: ts.Node): string | undefined {
  let child: ts.Node = node;
  let at = node.parent;
  while (at !== undefined && (ts.isParenthesizedExpression(at) || (ts.isConditionalExpression(at) && at.condition === child)
    || (ts.isBinaryExpression(at) && LOGICAL.has(at.operatorToken.kind)) || ts.isPrefixUnaryExpression(at) || ts.isAsExpression(at) || ts.isNonNullExpression(at))) {
    child = at;
    at = at.parent;
  }
  if (at === undefined) return undefined;
  if ((ts.isVariableDeclaration(at) || ts.isPropertyAssignment(at) || ts.isPropertyDeclaration(at)) && at.initializer === child && (ts.isIdentifier(at.name) || ts.isStringLiteral(at.name))) return at.name.text;
  if (ts.isBinaryExpression(at) && at.operatorToken.kind === ts.SyntaxKind.EqualsToken && at.right === child) {
    if (ts.isIdentifier(at.left)) return at.left.text;
    if (ts.isPropertyAccessExpression(at.left)) return at.left.name.text;
  }
  return undefined;
}
/** Every site of one module's text. */
function sitesOf(module: string, text: string): Site[] {
  const source = ts.createSourceFile(module, text, ts.ScriptTarget.Latest, true);
  const lineOf = (node: ts.Node): number => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
  const scopeOf = (node: ts.Node): ts.Node => {
    let at = node.parent;
    while (at !== undefined && !ts.isFunctionLike(at)) at = at.parent;
    return at ?? source;
  };
  const nameOf = (scope: ts.Node): string => {
    if (scope === source) return "<module>";
    const named = scope as ts.Node & { readonly name?: ts.Node };
    if (named.name !== undefined && (ts.isIdentifier(named.name) || ts.isStringLiteral(named.name))) return named.name.text;
    const parent = scope.parent;
    if (parent !== undefined && (ts.isVariableDeclaration(parent) || ts.isPropertyAssignment(parent) || ts.isPropertyDeclaration(parent)) && ts.isIdentifier(parent.name)) return parent.name.text;
    return `<anonymous:${lineOf(scope)}>`;
  };
  const yieldsOutside = (scope: ts.Node, site: ReadonlySet<ts.Node>): string[] => {
    const found = new Set<string>();
    walk(scope, node => {
      if (site.has(node)) return false;
      const value = literalText(node);
      if (value !== undefined) for (const word of verdictTokens(value)) found.add(word);
      return true;
    });
    return [...found];
  };
  const producersOf = (scope: ts.Node): string[] => {
    const seen = new Set<string>();
    walk(scope, node => {
      const value = literalText(node);
      if (value !== undefined) for (const token of tokens(value)) seen.add(token);
      return true;
    });
    return Object.entries(VOCABULARY.producers).filter(([, spellings]) => spellings.some(spelling => seen.has(spelling))).map(([name]) => name).sort(byName);
  };
  const found: Site[] = [];
  const record = (nodes: readonly ts.Node[], scope: ts.Node, form: Site["form"], op: string, receiver: string, fields: readonly string[]): void => {
    const first = nodes[0];
    if (first === undefined) return;
    const named = nodes.flatMap(node => { const bound = boundName(node); return bound === undefined ? [] : camelWords(bound).filter(word => WORDS.has(word)); });
    const words = [...new Set([...yieldsOutside(scope, new Set(nodes)), ...named])].sort(byName);
    if (words.length === 0) return;
    found.push({ module, fn: nameOf(scope), form, op, receiver: receiver.replace(/\s+/g, " "), fields, words, producers: producersOf(scope), line: lineOf(first) });
  };
  walk(source, node => {
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && REDUCERS.has(node.expression.name.text)) {
      const callback = node.arguments[0];
      if (callback !== undefined && (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback))) {
        const read = reads(callback);
        if (read.fields.length > 0 || read.word) record([node], scopeOf(node), "reducer", node.expression.name.text, node.expression.expression.getText(source), read.fields);
      }
    }
    if (ts.isForOfStatement(node) || ts.isForInStatement(node) || ts.isForStatement(node) || ts.isWhileStatement(node) || ts.isDoStatement(node)) {
      const read = reads(node.statement);
      const over = ts.isForOfStatement(node) || ts.isForInStatement(node) ? node.expression.getText(source) : "";
      if ((read.fields.length > 0 || read.word) && writesOuter(node)) record([node], scopeOf(node), "loop", ts.SyntaxKind[node.kind], over, read.fields);
    }
    return true;
  });
  // COMPARISONS: per function (and the module's top level), its own body only, so a callback's comparisons stay the callback's.
  const scopes: ts.Node[] = [source];
  walk(source, node => { if (node !== source && ts.isFunctionLike(node)) scopes.push(node); return true; });
  for (const scope of scopes) {
    const comparisons: { node: ts.Node; receiver: string; field: string }[] = [];
    const own = (node: ts.Node): void => {
      if (node !== scope && ts.isFunctionLike(node)) return;
      if (ts.isBinaryExpression(node)) {
        const comparison = statusComparison(node, source);
        if (comparison !== undefined) comparisons.push({ node, ...comparison });
      }
      ts.forEachChild(node, own);
    };
    ts.forEachChild(scope, own);
    const receivers = [...new Set(comparisons.map(comparison => comparison.receiver))].sort(byName);
    if (receivers.length >= 2) record(comparisons.map(comparison => comparison.node), scope, "comparisons", "==", receivers.join(","), [...new Set(comparisons.map(comparison => comparison.field))].sort(byName));
  }
  return found;
}
const keyOf = (site: Site): string => `${site.module}#${site.fn}#${site.form}:${site.op}#${site.receiver}#${site.fields.join("+")}`;
const exempt = (site: Site, exemptions: readonly string[]): boolean => exemptions.includes(keyOf(site)) && site.producers.length === 1;
/** A finding names its site without a line number, so an unrelated edit above it never moves a witness. */
const findingOf = (site: Site): string => `${keyOf(site)} yields ${site.words.join("+")} (producers: ${site.producers.join("+") || "none named"})`;
function judge(modules: readonly { readonly path: string; readonly text: string }[], exemptions: readonly string[]): { sites: Site[]; findings: string[] } {
  const sites = modules.flatMap(module => sitesOf(module.path, module.text));
  return { sites, findings: sites.filter(site => !exempt(site, exemptions)).map(findingOf) };
}
const inScope = (path: string): boolean => /^src\/.+\.ts$/.test(path);
/** What git would commit below src: tracked or untracked, never ignored. */
function gitModules(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(inScope))].sort(byName);
}
function walkModules(): { modules: string[]; links: string[] } {
  const modules: string[] = [];
  const links: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(join(REPO, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isSymbolicLink()) links.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && inScope(path)) modules.push(path);
    }
  };
  visit("src");
  return { modules: modules.sort(byName), links: links.sort(byName) };
}
const headModules = (): { path: string; text: string }[] => gitModules().map(path => ({ path, text: readFileSync(join(REPO, path), "utf8") }));
const gitShow = (revision: string, path: string): string => execFileSync("git", ["show", `${revision}:${path}`], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
/** One `git cat-file --batch` read of many blobs, keyed by object id. */
function readBlobs(ids: readonly string[]): Map<string, string> {
  const out: Buffer = execFileSync("git", ["cat-file", "--batch"], { cwd: REPO, input: Buffer.from(`${ids.join("\n")}\n`), maxBuffer: 1 << 28 });
  const texts = new Map<string, string>();
  let at = 0;
  while (at < out.length) {
    const eol = out.indexOf(0x0a, at);
    const [id, type, size] = out.subarray(at, eol).toString("utf8").split(" ");
    if (id === undefined || type !== "blob" || size === undefined) throw new Error(`unexpected cat-file record at ${at}`);
    const end = eol + 1 + Number(size);
    texts.set(id, out.subarray(eol + 1, end).toString("utf8"));
    at = end + 1;
  }
  return texts;
}
/** Every docs/workbench page at a revision (HEAD reads the working tree), as path and text. */
function docsPages(revision: string | undefined): { path: string; text: string }[] {
  if (revision === undefined) {
    const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "docs/workbench"], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
    return out.split("\0").filter(path => path.endsWith(".md")).sort(byName).map(path => ({ path, text: readFileSync(join(REPO, path), "utf8") }));
  }
  const listing = execFileSync("git", ["ls-tree", "-r", "-z", revision, "--", "docs/workbench"], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  const entries = listing.split("\0").filter(line => line !== "").map(line => { const [meta = "", path = ""] = line.split("\t"); const [, type = "", id = ""] = meta.split(" "); return { type, id, path }; });
  const blobs = entries.filter(entry => entry.type === "blob" && entry.path.endsWith(".md"));
  const texts = readBlobs([...new Set(blobs.map(entry => entry.id))]);
  return blobs.map(entry => ({ path: entry.path, text: texts.get(entry.id) ?? "" })).sort((a, b) => byName(a.path, b.path));
}
const TERMINATOR = /[.!?;](?=\s|$)/g;
const LIST_ITEM = /^\s*(?:[-+*]|\d+[.)])\s/;
/** A page cut into sentences: after ".", "!", "?" or ";" before white space or the line end, at a blank line, before a list item. */
function sentences(text: string): string[] {
  const out: string[] = [];
  let buffer = "";
  const flush = (): void => { if (buffer !== "") out.push(buffer); buffer = ""; };
  const append = (piece: string): void => { const trimmed = piece.trim(); if (trimmed !== "") buffer = buffer === "" ? trimmed : `${buffer} ${trimmed}`; };
  for (const raw of text.split(/\r?\n/)) {
    if (raw.trim() === "") { flush(); continue; }
    if (LIST_ITEM.test(raw) || /^\s*\|/.test(raw)) flush();
    let from = 0;
    for (const match of raw.matchAll(TERMINATOR)) { const at = (match.index ?? 0) + 1; append(raw.slice(from, at)); flush(); from = at; }
    append(raw.slice(from));
  }
  flush();
  return out;
}
const folded = (text: string): string => text.normalize("NFKC").toLowerCase().replace(/\s+/g, " ");

// --------------------------------------------------------------------------------------------------------- the two receipts
const SCOPE: ObservationScope = { workspace: "/kku9-receipts-ws", principal: "local-operator:kku9" };
const NOW = "2026-10-22T06:22:31Z";
const OPERATION = "op_kku9a1";
const RUN = "frn-run-kku9";
const ATTEMPT = "frn-atm-kku9-1";
const FORGE_READING: JsonValue = {
  contract: "forge.gate.status/v1",
  protocolMethod: "gate.status",
  source: {
    status: "success", operation_id: OPERATION, envelope: { verdict: null, reason_code: "FORGE_OK" },
    data: { packages: [{ ref: "code:pi-subagents", last_result: "success", authoritative_current: true, verification_ref: "cmd_current" }] },
  },
};
const EXIT = { code: 0, signal: null };
const RUN_DTO = {
  run_id: RUN, beads_run_id: "bd-kku9", workspace: SCOPE.workspace, state: "completed", mode: "ephemeral_wisp", furnace_version: "0.1.0", binary_revision: "rev-kku9",
  created_at: "2026-10-22T06:00:00Z", updated_at: "2026-10-22T06:10:00Z", state_since: "2026-10-22T06:10:00Z", executor: "runner", max_parallel: 1,
  active: [], failed: [], failed_total: 0, attention: [], unreadable: [], corrupt_events: [], corrupt_events_total: 0, conflicts: [], completed: 1, total: 1,
};
const ATTEMPTS = [{
  attempt_id: ATTEMPT, run_id: RUN, work_id: "bd-work-kku9", ordinal: 1, executor: "runner", state: "succeeded", outcome: "success",
  created_at: "2026-10-22T06:00:01Z", started_at: "2026-10-22T06:00:02Z", finished_at: "2026-10-22T06:09:59Z", exit_code: 0,
}];
const FURNACE_CLIENT = {
  runs: { get: () => ({ status: async () => ({ kind: "run_status", requestId: "req-kku9-status", exit: EXIT, data: RUN_DTO }) }) },
  attempts: { list: async () => ({ kind: "attempt_list", requestId: "req-kku9-attempts", exit: EXIT, data: { run_id: RUN, beads_run_id: "bd-kku9", complete: true, limit: 5, returned: 1, next_cursor: null, attempts: ATTEMPTS, unreadable: [] } }) },
  logs: {
    read: async (runId: string, request?: { attempt?: string; stream?: string }) => ({
      kind: "logs_read", requestId: "req-kku9-logs", exit: EXIT,
      data: { run_id: runId, attempt_id: request?.attempt, stream: request?.stream ?? "stdout", complete: true, limit: 512, returned: 1, next_cursor: null, lossy: false, lines: ["attempt finished"] },
    }),
  },
} as unknown as FurnaceObserverClient;
const ref = (native: NativeRef): string => `${native.provider}:${native.type}:${native.id}`;

async function receipts(): Promise<{ forge: Receipts; furnace: Receipts }> {
  const forge = forgeGateTopology(FORGE_READING, { scope: SCOPE, target: SCOPE.workspace, capturedAt: NOW, observedAt: NOW });
  const observer = new FurnaceObserver(FURNACE_CLIENT, { workspaceRoot: SCOPE.workspace, runId: RUN, scope: SCOPE, limits: { maxPolls: 1, intervalMs: 1, maxElapsedMs: 5000, attemptLimit: 5, logBytes: 512, callTimeoutMs: 2000 } });
  try {
    const furnace = observer.projectionTopology(await observer.snapshot());
    return { forge: { snapshots: forge.snapshots, relations: forge.relations }, furnace: { snapshots: furnace.snapshots, relations: furnace.relations } };
  } finally {
    observer.close();
  }
}
/** wb-0kfa F2: the Beads readiness receipt - a closed task read through the producer's own reader over a fake bd show envelope. */
const BEADS_WORK = "wb-kku9-receipt";
const BEADS_CLIENT: BeadsReadClient = {
  show: async (id: string) => ({ exit: 0, stdout: JSON.stringify([{ id, title: "Receipt composition probe", status: "closed", issue_type: "task", priority: 2, dependencies: [] }]), stderr: "" }),
};
async function beadsReceipt(): Promise<Receipts> {
  const reading = await readBeadsWork(BEADS_CLIENT, { workId: BEADS_WORK, workspaceRoot: SCOPE.workspace, scope: SCOPE, limits: { maxDependencies: 4, maxTitleChars: 80, timeoutMs: 2000 }, now: () => NOW });
  const projected = projectBeadsWork(reading, SCOPE);
  return { snapshots: [projected.snapshot], relations: projected.relations };
}
function project(all: readonly Receipts[]): { view: ObservationProjection; refreshed: string[] } {
  const view = new ObservationProjection({ maxQuery: 50 });
  const refreshed = all.flatMap(part => part.snapshots.map(snapshot => view.refresh(snapshot)));
  for (const part of all) for (const relation of part.relations) view.relate(relation);
  return { view, refreshed };
}
const nodesOf = (view: ObservationProjection) => view.query({ scope: SCOPE, limit: 50 }).nodes;
const rootsOf = (view: ObservationProjection) => nodesOf(view).filter(node => view.relations({ scope: SCOPE, to: node.key, limit: 10 }).length === 0);
interface KeyedRef { readonly provider: string; readonly type: string; readonly id: string }
function parseKey(key: string): KeyedRef | undefined {
  const parts: unknown = JSON.parse(key);
  if (!Array.isArray(parts) || parts.length !== 6) return undefined;
  const [, , provider, type, , id] = parts;
  return typeof provider === "string" && typeof type === "string" && typeof id === "string" ? { provider, type, id } : undefined;
}
const synthesizedIn = (texts: readonly string[]): boolean => texts.some(text => tokens(text).some(token => VOCABULARY.synthesized.includes(token)));
/** Everything the projection holds that no producer stated, or that joins two producers or spells a synthesized word. */
function composition(view: ObservationProjection, stated: readonly Receipts[]) {
  const snapshots = stated.flatMap(part => part.snapshots);
  const statedNodes = new Map(snapshots.map(snapshot => [ref(snapshot.source), snapshot]));
  const statedEdges = new Set(stated.flatMap(part => part.relations.map(relation => `${ref(relation.from)}>${ref(relation.to)}:${relation.kind}:${relation.provenance.source}`)));
  const nodes = nodesOf(view);
  const edges = view.relations({ scope: SCOPE, limit: 100 }).map(relation => {
    const from = parseKey(relation.from);
    const to = parseKey(relation.to);
    return { label: `${from ? ref(from) : "?"}>${to ? ref(to) : "?"}:${relation.kind}:${relation.provenance.source}`, cross: from === undefined || to === undefined || from.provider !== to.provider, texts: [relation.kind, relation.provenance.source] };
  });
  return {
    extraNodes: nodes.filter(node => !statedNodes.has(ref(node.nativeRef))).map(node => ref(node.nativeRef)),
    wordNodes: nodes.filter(node => synthesizedIn([node.kind, node.presentation.type, node.presentation.title, node.presentation.statusText])).map(node => ref(node.nativeRef)),
    extraEdges: edges.filter(edge => !statedEdges.has(edge.label)).map(edge => edge.label),
    crossEdges: edges.filter(edge => edge.cross).map(edge => edge.label),
    wordEdges: edges.filter(edge => synthesizedIn(edge.texts)).map(edge => edge.label),
    foreignRefs: nodes.flatMap(node => node.evidenceRefs.filter(evidence => !(statedNodes.get(ref(node.nativeRef))?.evidenceRefs ?? []).includes(evidence)).map(evidence => `${ref(node.nativeRef)} ${evidence}`)),
    wordRefs: nodes.flatMap(node => node.evidenceRefs.filter(evidence => synthesizedIn([evidence])).map(evidence => `${ref(node.nativeRef)} ${evidence}`)),
  };
}
const GRANTS = ["forge:inspect", "furnace:inspect"];
function evidenceStore(view: ObservationProjection) {
  const registry: Pick<CapabilityRegistry, "invoke"> = { invoke: async (): Promise<JsonValue> => FORGE_READING };
  return createWorkbenchEvidenceStore({
    grants: () => [...GRANTS], scope: () => SCOPE, projection: view, cwd: () => SCOPE.workspace, registry: () => registry,
    claudeRead: async () => [], furnaceClient: () => FURNACE_CLIENT, now: () => new Date(NOW),
  });
}

// ---------------------------------------------------------------------------------------------------------------- the plants
const MUTANTS: Readonly<Record<string, string>> = {
  "every-verified": 'export function composed(nodes) { return nodes.every(node => node.presentation.statusTone === "success") ? "verified" : "unknown"; }',
  "two-receipts-integrated": 'export function both(forge, furnace) { const receipts = [forge, furnace]; return receipts.every(r => r.statusTone === "success") ? "integrated" : "unknown"; }',
  "reduce-pass": 'export const verdict = (receipts) => receipts.reduce((all, r) => all && r.status === "success", true) ? "PASS" : "FAIL";',
  "filter-length": 'export function verdict(rs) { return rs.filter(r => r.tone === "success").length === rs.length ? "verified" : "partial"; }',
  loop: 'export function verdict(rs) { let ok = true; for (const r of rs) if (r.statusTone !== "success") ok = false; return ok ? "verified" : "unknown"; }',
  conjunction: 'export function verdict(forge, furnace) { return forge.statusTone === "success" && furnace.statusTone === "success" ? "integrated" : "unknown"; }',
  "nested-conditions": 'export function verdict(forge, furnace) { if (forge.statusTone === "success") { if (furnace.statusTone === "success") return "verified"; } return "unknown"; }',
  "bound-conjunction": 'export function verdict(forge, git) { const integrated = forge.state === "passed" && git.status === "pass"; return integrated; }',
  "aggregated-tone": 'export function tone(nodes) { const statusTone = nodes.some(n => n.presentation.statusTone !== "success") ? "unknown" : "success"; return statusTone; }',
  "boolean-field": 'export function verdict(rs) { return { verified: rs.every(r => r.outcome === "succeeded") }; }',
  "named-binding": 'export function verdict(rs) { const allPassed = rs.every(r => r.result === "ok"); return allPassed; }',
};
const QUIET: Readonly<Record<string, string>> = {
  "non-verdict-word": 'export function busy(nodes) { return nodes.every(n => n.presentation.statusTone === "active") ? "busy" : "idle"; }',
  "per-receipt-map": 'export function each(nodes) { return nodes.map(n => n.presentation.statusTone === "success" ? "verified" : "unknown"); }',
  "count-only": 'export function count(nodes) { return nodes.filter(n => n.presentation.statusTone === "success").length; }',
};
const RESIDUAL_SHAPES: Readonly<Record<string, string>> = {
  "R-HELPER-SPLIT": 'function allSucceeded(xs) { return xs.every(x => x.statusTone === "success"); } export function composed(xs) { return allSucceeded(xs) ? "verified" : "unknown"; }',
  "R-NAMED-CALLBACK": 'const ok = (x) => x.statusTone === "success"; export function composed(xs) { return xs.every(ok) ? "verified" : "unknown"; }',
  "R-COMPUTED-WORD": 'const VERIFIED = "verified"; const SUCCESS = "success"; export function composed(xs) { return xs.every(x => x.statusTone === SUCCESS) ? VERIFIED : "unknown"; } export function destructured(xs) { return xs.every(({ statusTone }) => statusTone === SUCCESS) ? VERIFIED : "unknown"; }',
  "R-FAILURE-SIDE": 'export function worst(xs) { return xs.some(x => x.statusTone === "failure") ? "failure" : "unknown"; }',
  "R-SET-SHAPE": 'export function composed(xs) { return new Set(xs.map(x => x.statusTone)).size === 1 && xs[0].statusTone === "success" ? "verified" : "unknown"; }',
};
const PLANT = "src/workbench/receipt-composition-plant.ts";
const plantedFindings = (text: string): string[] => judge([{ path: PLANT, text }], CONSTANTS.exempt).findings;

// ------------------------------------------------------------------------------------------- the docs receipt list (wb-0kfa F2)
/** The receipts the docs sentence lists: "each receipt (<receipt>, <receipt>, ...) is projected". */
const receiptPhrases = (sentence: string): string[] => (/each receipt \(([^)]+)\) is projected/.exec(sentence)?.[1] ?? "").split(/,\s*/).filter(phrase => phrase !== "");
/** The vocabulary producers a phrase names by one of their spellings. */
const producersIn = (phrase: string): string[] => Object.entries(VOCABULARY.producers).filter(([, spellings]) => tokens(phrase).some(token => spellings.includes(token))).map(([name]) => name);
const nameText = (name: ts.PropertyName): string | undefined => (ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : undefined);
/** The string a constant's initializer can hold: a literal, either branch of a condition or either side of ?? and ||. */
function constantValues(node: ts.Expression): string[] {
  const at = unparen(node);
  if (ts.isAsExpression(at) || ts.isSatisfiesExpression(at)) return constantValues(at.expression);
  if (ts.isConditionalExpression(at)) return [...constantValues(at.whenTrue), ...constantValues(at.whenFalse)];
  if (ts.isBinaryExpression(at) && (at.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken || at.operatorToken.kind === ts.SyntaxKind.BarBarToken)) return [...constantValues(at.left), ...constantValues(at.right)];
  const text = literalText(at);
  return text === undefined ? [] : [text];
}
/**
 * The producers src modules spell as a provider: a property or signature named provider, or a constant whose camel-case
 * words include provider, read through every string literal of its value and the module's string constants an identifier
 * in it names (a member name is not a reference).
 */
function providersSpelled(modules: readonly { readonly path: string; readonly text: string }[]): Set<string> {
  const found = new Set<string>();
  for (const module of modules) {
    const source = ts.createSourceFile(module.path, module.text, ts.ScriptTarget.Latest, true);
    const constants = new Map<string, string[]>();
    walk(source, node => {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && (ts.getCombinedNodeFlags(node) & ts.NodeFlags.Const) !== 0) {
        const values = constantValues(node.initializer);
        if (values.length > 0) constants.set(node.name.text, values);
      }
      return true;
    });
    const valuesOf = (value: ts.Node): string[] => {
      const out: string[] = [];
      walk(value, inner => {
        const text = literalText(inner);
        if (text !== undefined) out.push(text);
        if (ts.isIdentifier(inner) && !(ts.isPropertyAccessExpression(inner.parent) && inner.parent.name === inner)) out.push(...(constants.get(inner.text) ?? []));
        return true;
      });
      return out;
    };
    const spelled: string[] = [];
    walk(source, node => {
      if (ts.isPropertyAssignment(node) && nameText(node.name) === "provider") spelled.push(...valuesOf(node.initializer));
      if (ts.isShorthandPropertyAssignment(node) && node.name.text === "provider") spelled.push(...(constants.get("provider") ?? []));
      if (ts.isPropertySignature(node) && nameText(node.name) === "provider" && node.type !== undefined) spelled.push(...valuesOf(node.type));
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && camelWords(node.name.text).includes("provider")) spelled.push(...(constants.get(node.name.text) ?? []));
      return true;
    });
    for (const value of spelled) for (const [name, spellings] of Object.entries(VOCABULARY.producers)) if (tokens(value).some(token => spellings.includes(token))) found.add(name);
  }
  return found;
}
/** One planted Git projector per form the provider reading follows; each must read as spelling git. */
const GIT_PLANTS: Readonly<Record<string, string>> = {
  literal: 'export const revision = { provider: "git", type: "revision", id: "4f2a9c1" };',
  constant: 'const SOURCE = "git"; export const revision = { provider: SOURCE, type: "revision", id: "4f2a9c1" };',
  typed: 'export interface GitRevisionRef { provider: "git"; type: "revision"; id: string }',
  named: 'export const GIT_PROVIDER = "git";',
  conditional: 'export const revision = (local: boolean) => ({ provider: local ? "git" : "forge", type: "revision", id: "4f2a9c1" });',
};

// ------------------------------------------------------------------------------------------------------------- the bead row
function beadNotes(): string {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const value: unknown = JSON.parse(line);
    if (value !== null && typeof value === "object" && "id" in value && value.id === BEAD && "notes" in value && typeof value.notes === "string") return value.notes;
  }
  throw new Error("bead export lacks the owner filing");
}
function tiled(body: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:]*$/.test(body.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:]*$/.test(body.slice(at));
}
const acceptanceOf = (notes: string): string => /Acceptance: (\(a\) .*?)\. Not P0\/P1:/s.exec(notes)?.[1] ?? "";
const clausesOf = (notes: string): string[] => acceptanceOf(notes).split(/; (?=\([a-z]\) )/);
/** The exempt citation the filing spells: file, first line, last line and the quoted qualifier. */
function citationOf(notes: string): { file: string; from: number; to: number; qualifier: string } {
  const match = /exempt (\S+?):(\d+)-(\d+), which reduces .*? to '([^']+)'/.exec(acceptanceOf(notes));
  return { file: match?.[1] ?? "", from: Number(match?.[2] ?? "0"), to: Number(match?.[3] ?? "0"), qualifier: match?.[4] ?? "" };
}

/** wb-0kfa F1: the landed delivery record's residual line in the wb-kku9.4 export row, the anchor outside this file and its roster. */
const DELIVERED_RESIDUALS = "RESIDUALS (named, each with a pinned quiet row): ";
interface ResidualGroup { readonly pin: string; readonly key: string; readonly sites: number | undefined; readonly ids: readonly string[] }
/** Each residual id the line names, grouped under the quiet pin parenthesis that follows it ("(B3 residuals, each 0 sites)"). */
function deliveredResiduals(notes: string): { lines: number; groups: ResidualGroup[]; unpinned: string[] } {
  const lines = notes.split("\n").filter(line => line.startsWith(DELIVERED_RESIDUALS));
  const groups: ResidualGroup[] = [];
  let pending: string[] = [];
  for (const match of (lines[0] ?? "").slice(DELIVERED_RESIDUALS.length).matchAll(/\b(R-[A-Z]+(?:-[A-Z]+)*)\b|\(([A-Z]\d) (\w+)(?:, each (\d+) sites)?/g)) {
    const [, id, pin, key, sites] = match;
    if (id !== undefined) pending.push(id);
    else if (pin !== undefined && key !== undefined) {
      groups.push({ pin, key, sites: sites === undefined ? undefined : Number(sites), ids: pending });
      pending = [];
    }
  }
  return { lines: lines.length, groups, unpinned: pending };
}
const fieldOf = (value: JsonValue | undefined, key: string): JsonValue | undefined => (value !== null && typeof value === "object" && !Array.isArray(value) ? value[key] : undefined);

// ----------------------------------------------------------------------------------------------------------- the pin bodies
/**
 * wb-0kfa F2: each receipt the docs sentence lists, mapped to the producer it names - its roots in one projection of the
 * Forge, Furnace and Beads receipts (each producer's own reader), and whether a src module spells that producer as a provider.
 */
async function receiptList(sentence: string, statementProducers: readonly string[]) {
  const { forge, furnace } = await receipts();
  const parts = [forge, furnace, await beadsReceipt()];
  const { view } = project(parts);
  const stated = new Map(parts.flatMap(part => part.snapshots).map(snapshot => [ref(snapshot.source), snapshot.node]));
  const roots = rootsOf(view);
  const spelled = providersSpelled(headModules());
  const listed = receiptPhrases(sentence).map(phrase => {
    const named = producersIn(phrase);
    const own = roots.filter(node => named.includes(node.nativeRef.provider));
    return {
      phrase,
      producers: named,
      roots: own.map(node => ({ ref: ref(node.nativeRef), tone: node.presentation.statusTone, text: node.presentation.statusText, own: JSON.stringify(node.presentation) === JSON.stringify(stated.get(ref(node.nativeRef))) })),
      spelled: named.some(name => spelled.has(name)),
    };
  });
  // Whatever the roster holds: the list names the statement's producers in order, every root keeps the presentation its
  // producer stated, and a listed producer src spells as a provider has a receipt projected here.
  const listedProducers = listed.flatMap(row => row.producers);
  const statement = statementProducers.map(name => name.toLowerCase());
  if (JSON.stringify(listedProducers) !== JSON.stringify(statement)) throw new Error(`the docs receipt list names ${listedProducers.join(", ") || "no producer"}, the statement ${statement.join(", ")}`);
  const disowned = listed.flatMap(row => row.roots.filter(root => !root.own).map(root => root.ref));
  if (disowned.length > 0) throw new Error(`receipts projected without their producer's own presentation: ${disowned.join(", ")}`);
  const unread = listed.filter(row => row.spelled && row.roots.length === 0).map(row => row.phrase);
  if (unread.length > 0) throw new Error(`src spells a provider for ${unread.join(", ")} but this census projects no such receipt`);
  const gitControls = Object.fromEntries(Object.entries(GIT_PLANTS).map(([name, text]) => [name, providersSpelled([{ path: PLANT, text }]).has("git")]));
  const quiet = Object.entries(gitControls).filter(([, found]) => !found).map(([name]) => name);
  if (quiet.length > 0) throw new Error(`the provider reading misses its planted Git projector forms: ${quiet.join(", ")}`);
  return { receipts: listed, composed: composition(view, parts), gitControls };
}
const REACHED = new Set<string>();
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const { forge, furnace } = await receipts();
    const { refreshed } = project([forge, furnace]);
    const stated = (part: Receipts) => part.snapshots.map(snapshot => ({ ref: ref(snapshot.source), kind: snapshot.kind ?? "", tone: snapshot.node.statusTone, text: snapshot.node.statusText }));
    const surfaces = [typeof selectLinkedTopology === "function", typeof createWorkbenchEvidenceStore === "function"];
    return { forge: stated(forge), furnace: stated(furnace), producers: [...new Set([...forge.snapshots, ...furnace.snapshots].map(snapshot => snapshot.source.provider))].sort(byName), refreshed, surfaces };
  },
  A2: async () => {
    const { forge, furnace } = await receipts();
    const { view } = project([forge, furnace]);
    const stated = new Map([...forge.snapshots, ...furnace.snapshots].map(snapshot => [ref(snapshot.source), snapshot.node]));
    const roots = rootsOf(view);
    const slice = (key: string) => {
      const linked = selectLinkedTopology({ scope: SCOPE, relations: view }, key);
      const edges = (side: typeof linked.upstream) => side.edges.map(edge => `${edge.relation}:${ref(edge.nativeRef)}:${edge.provenance.sourceLabel}`);
      return { upstream: edges(linked.upstream), downstream: edges(linked.downstream), references: linked.references.length, trace: linked.trace.label };
    };
    return {
      nodes: nodesOf(view).length,
      roots: roots.map(node => ({ ref: ref(node.nativeRef), tone: node.presentation.statusTone, text: node.presentation.statusText, ownTone: JSON.stringify(node.presentation) === JSON.stringify(stated.get(ref(node.nativeRef))) })),
      slices: Object.fromEntries(roots.map(node => [ref(node.nativeRef), slice(node.key)])),
    };
  },
  A3: async () => {
    const { forge, furnace } = await receipts();
    const { view } = project([forge, furnace]);
    const live = composition(view, [forge, furnace]);
    const store = evidenceStore(view);
    const roots = rootsOf(view);
    const loads: Record<string, JsonValue> = {};
    for (const root of roots) {
      for (const evidence of root.evidenceRefs) {
        await store.request(SCOPE, root.nativeRef, evidence);
        const entry = store.get(SCOPE, root.nativeRef, evidence);
        loads[`${ref(root.nativeRef)} ${evidence}`] = entry.state === "loaded" ? { state: entry.state, provider: entry.provider, kind: entry.kind, synthesized: synthesizedIn([entry.kind, ...entry.preview]) } : { state: entry.state, ...(entry.state === "unavailable" ? { reason: entry.reason } : {}) };
      }
    }
    // Each producer's ref asked on the other producer's root: provider-first routing finds no loader, so nothing crosses.
    const [one, two] = roots;
    const crossed: Record<string, JsonValue> = {};
    if (one !== undefined && two !== undefined) {
      for (const [node, evidence] of [[one, two.evidenceRefs[0] ?? ""], [two, one.evidenceRefs[0] ?? ""]] as const) {
        await store.request(SCOPE, node.nativeRef, evidence);
        const entry = store.get(SCOPE, node.nativeRef, evidence);
        crossed[`${ref(node.nativeRef)} ${evidence}`] = entry.state === "unavailable" ? `${entry.state}:${entry.reason}` : entry.state;
      }
    }
    // The projection's one roll-up over a display parent grouping both receipts: counts, never a tone or verdict word.
    const grouped = project([forge, furnace]).view;
    const parent: NativeRef = { provider: "workbench", type: "group", id: "kku9-display" };
    grouped.refresh({ source: parent, scope: SCOPE, capturedAt: NOW, observedAt: NOW, node: { title: "display group", type: "group", statusText: "waiting", statusTone: "waiting" } });
    for (const root of roots) grouped.relate({ scope: SCOPE, from: parent, to: root.nativeRef, kind: "grouping", provenance: { source: "kku9-display" } });
    const parentNode = grouped.query({ scope: SCOPE, ref: parent, limit: 1 }).nodes[0];
    const rollup = parentNode === undefined ? undefined : grouped.aggregate({ scope: SCOPE, key: parentNode.key });
    // Positive control: a composer that adds a verdict node over both receipts is what this judge reports.
    const control = project([forge, furnace]).view;
    const verdict: NativeRef = { provider: "workbench", type: "verdict", id: "kku9-composed" };
    control.refresh({ source: verdict, scope: SCOPE, capturedAt: NOW, observedAt: NOW, node: { title: "Integrated verdict", type: "group", statusText: "verified", statusTone: "success" }, evidenceRefs: ["integrated:forge+furnace"] });
    for (const root of roots) control.relate({ scope: SCOPE, from: verdict, to: root.nativeRef, kind: "grouping", provenance: { source: "verified-composer" } });
    return {
      live,
      loads,
      crossed,
      rollup: rollup === undefined ? null : { parentTone: parentNode?.presentation.statusTone ?? null, keys: Object.keys(rollup).sort(byName), direct: rollup.direct, basis: rollup.basis, criticalPath: rollup.criticalPath },
      control: composition(control, [forge, furnace]),
    };
  },
  B1: async () => {
    const listed = gitModules();
    const walked = walkModules();
    const paths = ["src/workbench/plant.ts", "qa/workbench/plant.mjs", "test/plant.ts", "examples/plant.ts", "src/workbench/plant.js", "scripts/plant.ts"];
    return {
      atLeastFloor: listed.length >= CONSTANTS.moduleFloor,
      gitEqualsWalk: JSON.stringify(listed) === JSON.stringify(walked.modules),
      links: walked.links,
      forms: [...new Set(Object.values(MUTANTS).flatMap(text => sitesOf(PLANT, text).map(site => site.form)))].sort(byName),
      // R-OUTSIDE-SRC quiet row: a composition outside src/**/*.ts is not judged.
      judgedOf: paths.filter(inScope),
    };
  },
  B2: async () => {
    const { sites, findings } = judge(headModules(), CONSTANTS.exempt);
    return { findings, sites: sites.map(keyOf).sort(byName), producers: [...new Set(sites.map(site => site.producers.join("+")))].sort(byName) };
  },
  B3: async () => ({
    mutants: Object.fromEntries(Object.entries(MUTANTS).map(([name, text]) => [name, plantedFindings(text)])),
    quiet: Object.fromEntries(Object.entries(QUIET).map(([name, text]) => [name, plantedFindings(text).length])),
    // Each named residual's quiet row: the shape stays silent, so a scanner that starts reading it reds here first.
    residuals: Object.fromEntries(Object.entries(RESIDUAL_SHAPES).map(([name, text]) => [name, sitesOf(PLANT, text).length])),
  }),
  B4: async () => {
    const notes = beadNotes();
    const citation = citationOf(notes);
    const module = CONSTANTS.exempt[0]?.split("#")[0] ?? "";
    const head = sitesOf(module, readFileSync(join(REPO, module), "utf8"));
    const filing = sitesOf(module, gitShow(CONSTANTS.filingRead, module));
    const fn = head[0]?.fn ?? "";
    const text = readFileSync(join(REPO, module), "utf8");
    // The function the exemption names spells the filing's qualifier; the same function moved to another module, or made to
    // name a second producer, is a finding.
    const declaration = new RegExp(`export function ${fn}\\(`).exec(text);
    const body = declaration === null ? "" : text.slice(declaration.index);
    const moved = judge([{ path: "src/workbench/receipt-composition-plant.ts", text }], CONSTANTS.exempt).findings.length;
    const twoProducers = judge([{ path: module, text: text.replace("'forge-observer'", "'forge-observer+furnace'") }], CONSTANTS.exempt).findings.length;
    return {
      citedFile: module.endsWith(`/${citation.file}`),
      head: head.map(site => ({ key: keyOf(site), words: [...site.words], producers: [...site.producers], exempt: exempt(site, CONSTANTS.exempt) })),
      filing: { keys: filing.map(keyOf), withinCitation: filing.every(site => site.line >= citation.from && site.line <= citation.to), lines: filing.map(site => site.line) },
      qualifier: body.includes(`'${citation.qualifier}'`),
      moved,
      twoProducers,
    };
  },
  B5: async () => ({ unexempted: judge(headModules(), []).findings }),
  C1: async () => {
    const clause = folded(/sentence that (.+)$/.exec(clausesOf(beadNotes())[2] ?? "")?.[1] ?? "");
    const holders = (pages: readonly { path: string; text: string }[]) => pages.flatMap(page => sentences(page.text).filter(sentence => folded(sentence).includes(clause)).map(() => page.path));
    const head = holders(docsPages(undefined));
    const items = (docsSection(readFileSync(join(REPO, CONSTANTS.doc), "utf8"), CONSTANTS.docHeading, 2, [CONSTANTS.docParent]).blocks)
      .flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : []))
      .filter(item => folded(item).includes(clause));
    return { clause: clause.length > 0, head, filing: holders(docsPages(CONSTANTS.filingRead)).length, bound: items.map(item => [item.includes(SELF), item.includes(BEAD)]) };
  },
  C2: async () => {
    const notes = beadNotes();
    const clause = /sentence that (.+)$/.exec(clausesOf(notes)[2] ?? "")?.[1] ?? "";
    const producers = (/success receipts \(([^)]+)\)/.exec(notes)?.[1] ?? "").split(/,\s*/);
    const section = docsSection(readFileSync(join(REPO, CONSTANTS.doc), "utf8"), CONSTANTS.docHeading, 2, [CONSTANTS.docParent]);
    const items = section.blocks.flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : []));
    const holder = items.filter(item => folded(item).includes(folded(clause)));
    return {
      section: section.ok && !section.hasHtml,
      holders: holder.length,
      exact: holder[0] === DOC_SENTENCE,
      startsWithClause: folded(holder[0] ?? "").startsWith(folded(clause)),
      producersNamed: producers.map(producer => (holder[0] ?? "").includes(producer)),
      ...(await receiptList(holder[0] ?? "", producers)),
    };
  },
};

describe("wb-kku9.4 receipt composition census (MW-CAC-WORKFLOW-COMPOSITION-R4, posture)", () => {
  it("judged set: frozen shape, roster, the owner filing's acceptance, statement words and exempt citation", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:5", "C:2"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id, quote }) => ({ id, quote })) })));
    expect(Object.keys(IMPL).sort(byName)).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.vocabulary).toEqual(VOCABULARY);
    expect(ROSTER.constants).toEqual(CONSTANTS);
    expect(ROSTER.docSentence).toBe(DOC_SENTENCE);
    const notes = beadNotes();
    const clauses = clausesOf(notes);
    expect(ROWS.map(row => row.label)).toEqual(clauses);
    expect(clauses.map((clause, index) => tiled(clause.slice(4), ROWS[index]?.pins.map(pin => pin.quote) ?? []))).toEqual(clauses.map(() => true));
    // Literal-free (the CT6 anchor): every producer the statement names is a vocabulary producer; every verdict word the
    // filing spells (the synthesized kinds, the composed PASS, the exempt qualifier's word) makes an all-success mutant a finding.
    const producers = (/success receipts \(([^)]+)\)/.exec(notes)?.[1] ?? "").split(/,\s*/).map(name => name.toLowerCase());
    expect(producers.map(name => Object.hasOwn(VOCABULARY.producers, name))).toEqual([true, true, true, true]);
    const kinds = /of kind '([^']+)'\/'([^']+)'/.exec(acceptanceOf(notes))?.slice(1) ?? [];
    const composed = /composed (\S+?)\./.exec(notes)?.[1] ?? "";
    const qualifierWord = citationOf(notes).qualifier.split(" ").at(-1) ?? "";
    const spelled = [...kinds, composed, qualifierWord];
    expect(spelled.length).toBe(4);
    expect(kinds.map(kind => VOCABULARY.synthesized.includes(kind))).toEqual([true, true]);
    const tone = /two or more individual (\S+) receipts/.exec(notes)?.[1] ?? "";
    expect(spelled.map(word => plantedFindings(`export function verdict(rs) { return rs.every(r => r.statusTone === "${tone}") ? "${word}" : "unknown"; }`).length)).toEqual([1, 1, 1, 1]);
    expect(CONSTANTS.exempt.every(key => key.split("#")[0]?.endsWith(`/${citationOf(notes).file}`))).toBe(true);
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(ROSTER.residuals.map(residual => residual.id)).toEqual(["R-HELPER-SPLIT", "R-NAMED-CALLBACK", "R-COMPUTED-WORD", "R-FAILURE-SIDE", "R-SET-SHAPE", "R-OUTSIDE-SRC"]);
    expect(ROSTER.residuals.every(residual => pins.includes(residual.quietPin))).toBe(true);
    expect(Object.keys(RESIDUAL_SHAPES)).toEqual(ROSTER.residuals.filter(residual => residual.quietPin === "B3").map(residual => residual.id));
  });
  it("residual anchor (wb-0kfa F1): the landed delivery record in the wb-kku9.4 export row names every residual with its quiet pin; the roster, RESIDUAL_SHAPES and the quiet pins' witnesses hold exactly that set", () => {
    const record = deliveredResiduals(beadNotes());
    expect(record.lines, "the export row carries one landed RESIDUALS line").toBe(1);
    expect(record.unpinned, "every residual the line names has a quiet pin").toEqual([]);
    expect(ROSTER.residuals.map(residual => `${residual.id}:${residual.quietPin}`)).toEqual(record.groups.flatMap(group => group.ids.map(id => `${id}:${group.pin}`)));
    expect(Object.keys(RESIDUAL_SHAPES)).toEqual(record.groups.filter(group => group.sites !== undefined).flatMap(group => group.ids));
    const witnessOf = (pin: string): JsonValue | undefined => ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin)?.witness;
    for (const group of record.groups) {
      const held = fieldOf(witnessOf(group.pin), group.key);
      expect(held, `${group.pin} holds ${group.key}`).toBeDefined();
      if (group.sites !== undefined) expect(held).toEqual(Object.fromEntries(group.ids.map(id => [id, group.sites])));
    }
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        });
      }
    });
  }
  it("records: every registered pin ran and reached its witness", () => {
    expect([...REACHED].sort(byName)).toEqual(ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).sort(byName));
  });
});
