/**
 * wb-tz2.9 (HX-ORIGINAL-GOALS-CLOSURE-R9, program-triage-2026-10-17), the HX licensed-complete witness census: the STANDING leg.
 * Statement (bead description, verbatim): "When a Pi-runnable fixture exists where SDK find returns licenses_absence:true from a
 * fresh hx (HXGC-EPI-002 DESIGN requirements.jsonl:6@6ed14cab8d; GC-D10 14-decisions-and-migration.md:16), Pi shall add one live
 * licensed-complete/known-empty witness to the native tier, asserted through the R1 invariant predicate; until then the
 * licensed-complete branch remains explicitly fixture-labelled."
 * Acceptance (description, verbatim): "Standing: tier labels stay explicit - the docs/14 HX row
 * (docs/workbench/14-qa-and-benchmarks.md:25@9df9a03) is bound by the wb-cax.25 census; fixture passes are never counted as native
 * evidence (TRACEABILITY.md:76)." and "On landing: a native-tier test drives the fixture workspace through nativeHyperUnixFind and
 * asserts the R1 predicate holds AND coverage reads complete/known-empty with the runtime licence present; the run lands as a NEW
 * TRACEABILITY receipt row (R13 discipline)." (The description's dash after "explicit" is an em dash; this comment writes a hyphen.)
 *
 * GATE: ABSENT at the cut. Measured read-only by the cutting seat (2026-10-28, recorded in the roster's gate block; this census
 * never launches hx and never reads HyperUnix-CLI): the installed hx (0.1.0, unstamped, binary sha-256 451221852d24...) answers
 * every live hx.fs find with coverage opportunistic, cause other:No_change_exclusion and no licence - over this workspace's src,
 * an empty src and a one-file src alike, through the SDK exactly as nativeHyperUnixFind calls it - and the strict policy exits 3
 * (HX-COVERAGE-INCOMPLETE); a pinned view is refused (--view git:HEAD: HX-VIEW-013, "hx find binds no view in this build").
 * HyperUnix-CLI 166963a04c src/hx_cli/cmd_observer.ml:385-390 states it as a constant of the build: every live listing reads
 * opportunistic, nothing licenses absence, and a Strict listing exits 3, until the RB-013 change-exclusion probe (hu-xt1.1)
 * establishes a witness. No Pi-runnable fixture licenses absence, so the "On landing" leg is NOT delivered and NOT claimed here:
 * no live witness, no fixture workspace and no receipt row.
 *
 * ROWS (each label is one clause of the bead's own text, read back from the tracker export; each pin's quote tiles its label):
 *  W, the obligation, armed and pending. W1: the native-read tier (forge.toml native-read names vitest.native.config.ts) and its HX
 *    live set - the files that import an HX entry point (a function export of src/workbench/providers/hyperunix.ts, or the SDK's
 *    HyperUnix client) - with their HX cases and the cases among them that witness the licensed-complete branch: none today. W2: the
 *    R1 route: each live file asserts through hxLiveInvariant, and the predicate, fed through the registered provider path, licenses
 *    absence on a runtime-licensed complete-empty reading (whose projection reads complete coverage and the known-empty text) and
 *    not on an unlicensed incomplete one. The scanner's claim vocabulary is DERIVED there, from the predicate, the projection and
 *    the adapter's consumed-field list: the verdict field that flips, the licence field whose flip un-licenses, the kinds that
 *    license and the projection's coverage and first status word.
 *  S, until then. S1: no file of the native-read tier states a licensed-complete claim - a true verdict or licence as an
 *    object-literal property, a matcher pinning one true, a toHaveProperty path ending in one with true, a licensing kind as a kind
 *    property or matcher value, complete coverage as a coverage property, or any literal text carrying the known-empty word - and
 *    the scanner flags every falsifier and no benign statement. S2: the docs/14 evidence table carries every HX row of the positive
 *    half (the licensed-complete branch: "complete query and bounded result") on the default-gate tier, and the section keeps its
 *    sentence that no row of the table is read as a live, native or scale pass.
 *  T, tier labels. T1: every HX evidence row's tier names the config that selects its file and the default config agrees
 *    (default-gate: vitest.config.ts selects it and the native-read config does not; native-read: the reverse), and its case is
 *    registered there by its verbatim title. T2: the cited docs/14 line (git show 9df9a03, line 25) is the current HX row of the
 *    "Matrix by subsystem" table, cell for cell. T3: the complete gate runs a census step that resolves to vitest.census.config.ts,
 *    which selects test/workbench-subsystem-matrix.census.ts, the wb-cax.25 census, and that file binds the section by its heading.
 *  N, never counted. N1: TRACEABILITY.md:76 keeps "do not count it as native evidence", the default config selects no native-read
 *    file, and the native-read config selects no file of S2's fixture cases.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS, each residual family's member count,
 * the falsifier and benign rosters and the claim vocabulary as literals; the judged set (every row's id, label and pins, every pin's
 * quote, reading and witness, the residual members, the gate block and every registered test title) is held to the out-of-file
 * roster test/fixtures/hx-licensed-complete-roster.json. OUTSIDE ANCHORS (their own registered case): the bead's own row in the
 * tracker export (.beads/issues.jsonl, the description only - never the notes, so a later park, delivery or gate note binds
 * nothing): the statement's two clauses and the standing item's two clauses are rows W, S, T and N, in order; row N's citation is
 * the line N1 reads; the gate block's condition, citations and on-landing text are the description's. The claim vocabulary equals
 * the one W2 derives from src, and every vocabulary form has a falsifier spelling its derived value that the scanner flags. Every
 * witness is computed from the docs, the configs, forge.toml, package.json, the live sources and src, never from a literal here.
 * So a row, a pin, a kind or an HX row removed from every literal of this file and the roster together still reds. The last case
 * reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and REACHED (every pin reached
 * its witness compare, and each compare's own result).
 * FLIP: when the gate artifact exists, the cut that adds the live witness sets the roster's gate state to present, re-measures W1
 * and S1 with it (one case witnessing the branch, through hxLiveInvariant) and moves the docs/14 rows; until then a licensed-complete
 * claim in any native-read file reds S1 here, although the complete gate never runs the native tier.
 * NOT CLAIMED: the On-landing leg; any hx behaviour (the native tier's receipt owns that); that the native tier ran (this census
 * reads sources, configs and docs); a claim the scanner cannot read (RESIDUALS); a falsifier variant removed from FALSIFIERS, the
 * frozen literal and the roster together while another falsifier of its form still flags.
 * RESIDUALS (named families, each member a pinned quiet row; a scanner that starts reading a member reds its row): R-RUNTIME-VALUE
 * (Q1, a licence or verdict value computed at run time: a negated number, a variable, a computed key) and R-HELPER (Q2, a claim
 * delegated to a helper outside the native tier's files, which the scanner never follows).
 *
 * Display paths added: none. Test-only: no src change, no live case, no fixture workspace and no receipt.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, matchesGlob } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { HyperUnix, resultFromJson } from "@hyperunix/sdk";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { HYPERUNIX_CONSUMED_FIELDS, HYPERUNIX_EXECUTION_KINDS, hxLiveInvariant, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import * as hyperunixProvider from "../src/workbench/providers/hyperunix.js";
import censusConfig from "../vitest.census.config.js";
import defaultConfig from "../vitest.config.js";
import nativeConfig from "../vitest.native.config.js";
import { DEFAULT_GATE_TIER, docsSection, resolveTier, sectionTables } from "./helpers/census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-tz2.9";
const REQUIREMENT = "HX-ORIGINAL-GOALS-CLOSURE-R9";
const SUITE = `hx licensed-complete witness census (${BEAD}, ${REQUIREMENT})`;
const ROSTER_PATH = "test/fixtures/hx-licensed-complete-roster.json";
const EXPORT = ".beads/issues.jsonl";
const EM_DASH = String.fromCodePoint(0x2014);
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const DOCS_PARENT = `14 ${EM_DASH} Test strategy, conformance suite, benchmark and adversarial controls`;
const MATRIX = "Matrix by subsystem";
const EVIDENCE = "Matrix by subsystem evidence";
const NO_LIVE_PASS = "no row of this table is read as a live, native or scale pass";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const TRACE_LINE = 76;
const NOT_NATIVE = "do not count it as native evidence";
const BINDER = "test/workbench-subsystem-matrix.census.ts";
const BINDER_BEAD = "wb-cax.25";
const NATIVE_TIER = "native-read";
const CENSUS_STEP = "census";
const DEFAULT_CONFIG = "vitest.config.ts";
/** Every case parses sources or docs; the explicit budget keeps a loaded host's slowness from reading as a finding. */
const BUDGET_MS = 60_000;

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };
type JsonRecord = { [key: string]: JsonValue };
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

const ROWS: readonly Row[] = [
  { id: "W", label: "Pi shall add one live licensed-complete/known-empty witness to the native tier, asserted through the R1 invariant predicate", pins: ["W1", "W2"] },
  { id: "S", label: "until then the licensed-complete branch remains explicitly fixture-labelled", pins: ["S1", "S2"] },
  { id: "T", label: `tier labels stay explicit ${EM_DASH} the docs/14 HX row (docs/workbench/14-qa-and-benchmarks.md:25@9df9a03) is bound by the wb-cax.25 census`, pins: ["T1", "T2", "T3"] },
  { id: "N", label: "fixture passes are never counted as native evidence", pins: ["N1"] },
  { id: "Q", label: "the claim scanner's named residual families, each member a pinned quiet row", pins: ["Q1", "Q2"] },
];
const QUOTES: Readonly<Record<string, string>> = {
  W1: "Pi shall add one live licensed-complete/known-empty witness to the native tier",
  W2: "asserted through the R1 invariant predicate",
  S1: "until then the licensed-complete branch remains",
  S2: "explicitly fixture-labelled",
  T1: "tier labels stay explicit",
  T2: "the docs/14 HX row (docs/workbench/14-qa-and-benchmarks.md:25@9df9a03)",
  T3: "is bound by the wb-cax.25 census",
  N1: "fixture passes are never counted as native evidence",
  Q1: "R-RUNTIME-VALUE",
  Q2: "R-HELPER",
};
/** What each pin measures, stated in its test title. */
const READING: Readonly<Record<string, string>> = {
  W1: "pending: the native-read tier's HX live set is its two files that import an HX entry point, and no HX case there witnesses the licensed-complete branch",
  W2: "both live files assert through hxLiveInvariant, which licenses absence on the provider path's runtime-licensed complete-empty reading only",
  S1: "no native-read file states a licensed-complete claim, and the claim scanner flags every falsifier and no benign statement",
  S2: "every HX row of the positive half in the docs/14 evidence table carries the default-gate tier, beside the section's no-live-pass sentence",
  T1: "each HX evidence row's tier names the config that selects its file, and its case is registered there by its verbatim title",
  T2: "the cited line at 9df9a03 is the current HX row of the docs/14 matrix, cell for cell",
  T3: "the complete gate's census step selects the wb-cax.25 census, which binds the docs/14 matrix section",
  N1: "TRACEABILITY.md:76 keeps its sentence, the default config selects no native-read file and the native-read config selects no licensed-complete fixture file",
  Q1: "quiet: the scanner reads no licence or verdict value computed at run time",
  Q2: "quiet: the scanner follows no helper",
};

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
/** A witness as plain JSON: the registry and the predicate hand back null-prototype or frozen trees. */
const plain = (value: unknown): Json => JSON.parse(JSON.stringify(value)) as Json;
const parse = (file: string, text: string): ts.SourceFile => ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const parseRepo = (file: string): ts.SourceFile => parse(file, textOf(file));

// ---- tiers: a config module selects a file when an include entry matches and no exclude entry does ----

interface ConfigShape {
  readonly test?: { readonly include?: readonly string[]; readonly exclude?: readonly string[] };
}
function selects(config: ConfigShape, file: string): boolean {
  const include = config.test?.include ?? [];
  const exclude = config.test?.exclude ?? [];
  return include.some(glob => matchesGlob(file, glob)) && !exclude.some(glob => matchesGlob(file, glob));
}
/** Every repository-relative .ts file under test/, sorted. */
function testFiles(): string[] {
  return readdirSync(join(ROOT, "test"), { encoding: "utf8", recursive: true })
    .filter(name => name.endsWith(".ts"))
    .map(name => `test/${name.split("\\").join("/")}`)
    .sort();
}
/** The config a forge tier's vitest argv loads: its --config value, or vitest.config.ts when it names none. */
function configOf(tier: string): string {
  const resolved = resolveTier(ROOT, tier);
  if (!resolved.ok) return `unresolved: ${resolved.why}`;
  const at = resolved.argv.indexOf("--config");
  return at < 0 ? DEFAULT_CONFIG : (resolved.argv[at + 1] ?? "--config without a value");
}
/** The native-read tier: the config forge.toml names for it and the files that config selects. */
function nativeTier(): { readonly config: string; readonly files: readonly string[] } {
  return { config: configOf(NATIVE_TIER), files: testFiles().filter(file => selects(nativeConfig, file)) };
}

// ---- sources: imports, registered cases and the R1 route ----

/** The HX entry points a live case drives: every function export of the provider module, and the SDK's client class. */
const HX_ENTRIES: readonly string[] = [
  ...Object.entries(hyperunixProvider)
    .filter(([, value]) => typeof value === "function")
    .map(([name]) => name),
  HyperUnix.name,
].sort();
/** The local names a source imports, by name, of an HX entry point from the provider module or the SDK. */
function hxImports(sf: ts.SourceFile): string[] {
  const names: string[] = [];
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    const from = statement.moduleSpecifier.text;
    if (!from.endsWith("/providers/hyperunix.js") && from !== "@hyperunix/sdk") continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue;
    for (const element of bindings.elements) {
      if (HX_ENTRIES.includes((element.propertyName ?? element.name).text)) names.push(element.name.text);
    }
  }
  return names;
}
interface Case {
  readonly title: string;
  readonly body: ts.Node;
}
/** The it/test registrations of a source that carry a literal title, with their callbacks. */
function casesOf(sf: ts.SourceFile): Case[] {
  const out: Case[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && (node.expression.text === "it" || node.expression.text === "test")) {
      const [title, ...rest] = node.arguments;
      const body = rest.find(argument => ts.isArrowFunction(argument) || ts.isFunctionExpression(argument));
      if (title !== undefined && (ts.isStringLiteral(title) || ts.isNoSubstitutionTemplateLiteral(title)) && body !== undefined) out.push({ title: title.text, body });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}
function references(root: ts.Node, names: readonly string[]): boolean {
  let found = false;
  const visit = (node: ts.Node): void => {
    if (found) return;
    if (ts.isIdentifier(node) && names.includes(node.text)) found = true;
    else ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}
/** expect(hxLiveInvariant(...)) calls in a source: the R1 predicate route. */
function predicateExpectations(sf: ts.SourceFile): number {
  let count = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "expect") {
      const [subject] = node.arguments;
      if (subject !== undefined && ts.isCallExpression(subject) && ts.isIdentifier(subject.expression) && subject.expression.text === hxLiveInvariant.name) count++;
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return count;
}

// ---- the claim scanner: active code only (comments are trivia), literal spellings only (RESIDUALS) ----

interface ClaimVocabulary {
  readonly verdictField: string;
  readonly licenceField: string;
  readonly completeKinds: readonly string[];
  readonly coverage: string;
  readonly knownEmpty: string;
}
const CLAIM_VOCABULARY: ClaimVocabulary = { verdictField: "absenceLicensed", licenceField: "licenses_absence", completeKinds: ["complete", "complete-empty"], coverage: "complete", knownEmpty: "known-empty" };
const PINNING = ["toBe", "toEqual", "toStrictEqual"];

const keyOf = (name: ts.PropertyName): string | undefined =>
  ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name) || ts.isNumericLiteral(name) ? name.text : undefined;
const stringOf = (node: ts.Node | undefined): string | undefined =>
  node !== undefined && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
/** The last member of an access chain: result.source.coverage_summary.licenses_absence and x['licenses_absence'] name licenses_absence. */
function leafName(node: ts.Expression): string | undefined {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isNonNullExpression(current) || ts.isAsExpression(current)) current = current.expression;
  if (ts.isPropertyAccessExpression(current)) return current.name.text;
  if (ts.isElementAccessExpression(current)) return stringOf(current.argumentExpression);
  return ts.isIdentifier(current) ? current.text : undefined;
}
interface Matcher {
  readonly subject: ts.Expression;
  readonly negated: boolean;
  readonly name: string;
  readonly args: readonly ts.Expression[];
}
/** expect(subject)[.not].name(args). */
function matcherOf(call: ts.CallExpression): Matcher | undefined {
  if (!ts.isPropertyAccessExpression(call.expression)) return undefined;
  let target = call.expression.expression;
  let negated = false;
  if (ts.isPropertyAccessExpression(target) && target.name.text === "not") {
    negated = true;
    target = target.expression;
  }
  if (!ts.isCallExpression(target) || !ts.isIdentifier(target.expression) || target.expression.text !== "expect") return undefined;
  const subject = target.arguments[0];
  return subject === undefined ? undefined : { subject, negated, name: call.expression.name.text, args: call.arguments };
}
const isTrue = (node: ts.Node | undefined): boolean => node?.kind === ts.SyntaxKind.TrueKeyword;
const isFalse = (node: ts.Node | undefined): boolean => node?.kind === ts.SyntaxKind.FalseKeyword;
/** A matcher that pins its subject true: toBe/toEqual/toStrictEqual(true), toBeTruthy(), or their negations against false. */
const pinsTrue = (matcher: Matcher): boolean =>
  matcher.negated ? (PINNING.includes(matcher.name) && isFalse(matcher.args[0])) || matcher.name === "toBeFalsy" : (PINNING.includes(matcher.name) && isTrue(matcher.args[0])) || matcher.name === "toBeTruthy";
/** The last segment of a toHaveProperty path: a dotted string or an array literal of strings. */
function pathLeaf(node: ts.Expression | undefined): string | undefined {
  const dotted = stringOf(node);
  if (dotted !== undefined) return dotted.split(".").at(-1);
  return node !== undefined && ts.isArrayLiteralExpression(node) ? stringOf(node.elements.at(-1)) : undefined;
}
/** Every licensed-complete claim under a node, as `<line>: <form>`. */
function claimsIn(root: ts.Node, sf: ts.SourceFile, vocabulary: ClaimVocabulary): string[] {
  const out: string[] = [];
  const at = (node: ts.Node, form: string): void => {
    out.push(`${sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1}: ${form}`);
  };
  const licensing = [vocabulary.verdictField, vocabulary.licenceField];
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAssignment(node)) {
      const key = keyOf(node.name);
      const value = stringOf(node.initializer);
      if (key !== undefined && licensing.includes(key) && isTrue(node.initializer)) at(node, `${key}: true`);
      if (key === "kind" && value !== undefined && vocabulary.completeKinds.includes(value)) at(node, `kind: ${value}`);
      if (key === "coverage" && value === vocabulary.coverage) at(node, `coverage: ${value}`);
    }
    if (ts.isCallExpression(node)) {
      const matcher = matcherOf(node);
      const leaf = matcher === undefined ? undefined : leafName(matcher.subject);
      if (matcher !== undefined && leaf !== undefined && licensing.includes(leaf) && pinsTrue(matcher)) at(node, `expect(...${leaf}).${matcher.negated ? "not." : ""}${matcher.name}`);
      const kind = stringOf(matcher?.args[0]);
      if (matcher !== undefined && leaf === "kind" && !matcher.negated && PINNING.includes(matcher.name) && kind !== undefined && vocabulary.completeKinds.includes(kind)) at(node, `expect(...kind).${matcher.name}(${kind})`);
      const path = matcher?.name === "toHaveProperty" && !matcher.negated && isTrue(matcher.args[1]) ? pathLeaf(matcher.args[0]) : undefined;
      if (path !== undefined && licensing.includes(path)) at(node, `toHaveProperty(${path}, true)`);
    }
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && node.text.includes(vocabulary.knownEmpty)) {
      at(node, `text carrying ${vocabulary.knownEmpty}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(root);
  return out;
}
const claimsOfSource = (file: string, text: string): string[] => {
  const sf = parse(file, text);
  return claimsIn(sf, sf, CLAIM_VOCABULARY);
};

/** A synthetic live source shaped like the native tier's HX case: the preamble statements, then the probe's own. */
const LIVE_PREAMBLE: readonly string[] = [
  'import {describe,expect,it} from "vitest";',
  'import {hxLiveInvariant} from "../src/workbench/hyperunix-observer.js";',
  'import {nativeHyperUnixFind} from "../src/workbench/providers/hyperunix.js";',
  'describe("probe", () => {',
  '  it("HX probe", async () => {',
  '    const result = await nativeHyperUnixFind(process.cwd(), "hx.fs/regular-file", "src");',
  "    const verdict = hxLiveInvariant(result);",
  "    expect(verdict).toMatchObject({holds: true, violations: []});",
];
/** A template placeholder's opening character, so a probe statement can spell a template literal with a substitution. */
const DOLLAR = "$";
const liveSource = (statements: readonly string[]): string => [...LIVE_PREAMBLE, ...statements.map(statement => `    ${statement}`), "  });", "});", ""].join("\n");
/** Each falsifier spells one claim form; `form` names the vocabulary member whose derived value it spells. */
const FALSIFIERS: readonly { readonly id: string; readonly form: string; readonly statement: string }[] = [
  { id: "verdict-property", form: "verdictField", statement: "expect(verdict).toMatchObject({holds: true, absenceLicensed: true});" },
  { id: "verdict-tobe", form: "verdictField", statement: "expect(verdict.absenceLicensed).toBe(true);" },
  { id: "verdict-not-false", form: "verdictField", statement: "expect(verdict.absenceLicensed).not.toBe(false);" },
  { id: "verdict-truthy", form: "verdictField", statement: "expect(hxLiveInvariant(result).absenceLicensed).toBeTruthy();" },
  { id: "licence-property", form: "licenceField", statement: "expect(result).toMatchObject({source: {coverage_summary: {licenses_absence: true}}});" },
  { id: "licence-quoted-key", form: "licenceField", statement: 'expect(result).toMatchObject({source: {coverage_summary: {"licenses_absence": true}}});' },
  { id: "licence-element", form: "licenceField", statement: "expect(result.source.coverage_summary['licenses_absence']).toStrictEqual(true);" },
  { id: "licence-not-falsy", form: "licenceField", statement: "expect(result.source.coverage_summary.licenses_absence).not.toBeFalsy();" },
  { id: "licence-dotted-path", form: "licenceField", statement: "expect(result).toHaveProperty('source.coverage_summary.licenses_absence', true);" },
  { id: "licence-array-path", form: "licenceField", statement: "expect(result).toHaveProperty(['source', 'coverage_summary', 'licenses_absence'], true);" },
  { id: "kind-complete", form: "completeKinds:complete", statement: "expect(result).toMatchObject({source: {execution_status: {kind: 'complete'}}});" },
  { id: "kind-complete-empty", form: "completeKinds:complete-empty", statement: "expect(result).toMatchObject({source: {execution_status: {kind: 'complete-empty'}}});" },
  { id: "kind-matcher", form: "completeKinds:complete-empty", statement: "expect(result.source.execution_status.kind).toBe('complete-empty');" },
  { id: "coverage-complete", form: "coverage", statement: "expect(snapshot).toMatchObject({coverage: 'complete'});" },
  { id: "known-empty-text", form: "knownEmpty", statement: "expect(snapshot.node.statusText).toContain('known-empty');" },
  { id: "known-empty-template", form: "knownEmpty", statement: `expect(snapshot.node.statusText).toBe(\`known-empty (runtime-licensed) rows ${DOLLAR}{0}\`);` },
  { id: "known-empty-title", form: "knownEmpty", statement: "it('HX known-empty witness', () => {});" },
];
/** Today's live statements and a comment naming the branch: none is a claim. */
const BENIGN: readonly string[] = [
  "expect(result).toMatchObject({contract: 'hyperunix.find/v1', source: {representation: 'hyperunix.result/1'}, runtime: {binarySha256: expect.stringMatching(/^[0-9a-f]{64}$/)}});",
  "expect(JSON.stringify(result)).not.toContain('\"verified\":true');",
  `process.stdout.write(\`${DOLLAR}{hxLiveReceipt(result)}\\n\`);`,
  "expect(result).toMatchObject({source: {execution_status: {kind: expect.any(String)}}});",
  "// a licensed known-empty witness lands here once the gate opens: comments are trivia",
];
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  Q1: ["expect(verdict).toMatchObject({absenceLicensed: !0});", "const yes = true; expect(verdict).toMatchObject({absenceLicensed: yes});", "expect(verdict).toMatchObject({['absence' + 'Licensed']: true});"],
  Q2: ["assertLicensedComplete(result);"],
};

// ---- the R1 predicate over the registered provider path, and the vocabulary it yields ----

const WS = "/census/hx-licensed-complete-ws";
const DIGEST = "0123456789abcdef".repeat(4);
const VERSION = "0.0.0-census";
/** One SDK hyperunix.result/1 document of the given kind and licence, in the SDK's own JSON representation. */
function sdkDocument(kind: string, licensed: boolean): JsonRecord {
  return {
    representation: "hyperunix.result/1",
    operation: "find",
    rows: [],
    rows_retained: true,
    coverage: [],
    status: { exit_code: 0, signal: null, streams: [{ name: "hx-fs", frames: 1, ended: true, mode: "observation" }], terminal_reached: true, frames_total: 1 },
    execution_status: { kind, diagnostic_code: null },
    diagnostics: [],
    view: null,
    cost: null,
    transport: { started_at: "2026-10-28T00:00:00.000Z", startup_latency_s: 0.01, process_duration_s: 0.1, stdout_bytes: 1, stderr_bytes: 0, stderr_bytes_retained: 0, frames: 1 },
    workspace_root: WS,
    terminal: "complete",
    truth: null,
    coverage_summary: {
      modes: [licensed ? "complete-within-scope" : "opportunistic"],
      completeness: licensed ? "complete" : "incomplete",
      licenses_absence: licensed,
      certificates_license_absence: licensed,
      incomplete_regions: [],
      result_coverage: null,
      answer_count: 0,
    },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {} },
    digest: null,
    digest_source: "absent",
    execution_id: null,
    budget_dimension: null,
    extensions: {},
  };
}
/** What the registered hyperunix.find provider returns for that document (registerHyperUnixFind over a reader stub). */
async function providerRead(document: JsonRecord): Promise<JsonValue> {
  const native = resultFromJson(document);
  const registry = new CapabilityRegistry();
  hyperunixProvider.registerHyperUnixFind(registry, { find: async () => native, runtime: async () => ({ version: VERSION, binarySha256: DIGEST }), close: async () => {} }, WS);
  return plain(await registry.invoke("hyperunix.find", { kind: "hx.fs/regular-file", root: "src" }, { grants: ["hyperunix:read"], signal: new AbortController().signal })) as JsonValue;
}
const getPath = (value: Json, path: string): Json | undefined =>
  path.split(".").reduce<Json | undefined>((at, key) => (at !== null && typeof at === "object" && !Array.isArray(at) ? (at as { readonly [key: string]: Json })[key] : undefined), value);
function setPath(value: Json, path: string, next: Json): JsonValue {
  const copy = JSON.parse(JSON.stringify(value)) as Record<string, unknown>;
  const keys = path.split(".");
  let at: Record<string, unknown> = copy;
  for (const key of keys.slice(0, -1)) {
    const child = at[key];
    if (!isRecord(child)) return copy as JsonValue;
    at = child;
  }
  at[keys.at(-1) ?? ""] = next;
  return copy as JsonValue;
}
/** The armed verdicts and the claim vocabulary they yield, read from src (the predicate, the projection, the consumed fields). */
async function armed(): Promise<{ readonly vocabulary: ClaimVocabulary; readonly witness: Json }> {
  const licensedKind = "complete-empty";
  const licensed = plain(await providerRead(sdkDocument(licensedKind, true)));
  const unlicensed = plain(await providerRead(sdkDocument("incomplete", false)));
  const licensedVerdict = plain(hxLiveInvariant(licensed as JsonValue));
  const unlicensedVerdict = plain(hxLiveInvariant(unlicensed as JsonValue));
  const observed = HYPERUNIX_CONSUMED_FIELDS.filter(field => field.use === "observed" && !field.path.includes("[]")).map(field => field.path);
  const kindPath = observed.find(path => getPath(licensed, path) === licensedKind) ?? "";
  const licencePath =
    observed.find(path => {
      if (getPath(licensed, path) !== true) return false;
      const flipped = hxLiveInvariant(setPath(licensed, path, false));
      return flipped.holds && !flipped.absenceLicensed;
    }) ?? "";
  const completeKinds = HYPERUNIX_EXECUTION_KINDS.filter(kind => hxLiveInvariant(setPath(licensed, kindPath, kind)).absenceLicensed);
  const flips = isRecord(licensedVerdict) && isRecord(unlicensedVerdict) ? Object.keys(licensedVerdict).filter(key => !isDeepStrictEqual(licensedVerdict[key], unlicensedVerdict[key])) : [];
  const context = { scope: { workspace: WS, principal: "local-operator:census" }, target: { kind: "hx.fs/regular-file", root: "src" }, capturedAt: "2026-10-28T00:00:00Z", observedAt: "2026-10-28T00:00:01Z" };
  const [snapshot] = hyperunixTopology(licensed as JsonValue, context).snapshots;
  const statusText = snapshot?.node.statusText ?? "";
  const vocabulary: ClaimVocabulary = {
    verdictField: flips.length === 1 ? (flips[0] ?? "") : `flips: ${flips.join(",")}`,
    licenceField: licencePath.split(".").at(-1) ?? "",
    completeKinds,
    coverage: snapshot?.coverage ?? "",
    knownEmpty: statusText.split(" ")[0] ?? "",
  };
  return {
    vocabulary,
    witness: plain({
      verdicts: { licensed: licensedVerdict, unlicensed: unlicensedVerdict },
      projection: { coverage: snapshot?.coverage, statusTone: snapshot?.node.statusTone, statusText },
      paths: { kind: kindPath, licence: licencePath },
      vocabulary,
    }),
  };
}

// ---- docs/14: the evidence table, its sentence and the matrix row ----

interface EvidenceRow {
  readonly subsystem: string;
  readonly half: string;
  readonly tier: string;
  readonly file: string;
  readonly title: string;
}
function evidenceRows(): { readonly ok: boolean; readonly why: string; readonly rows: readonly EvidenceRow[] } {
  const tables = sectionTables(textOf(DOCS_14), EVIDENCE, 2, [DOCS_PARENT]);
  const rows = (tables.grids[0] ?? []).slice(1).map(cells => {
    const pinned = /^(test\/[\w./-]+\.ts): "(.+)"$/.exec(cells[3] ?? "");
    return { subsystem: cells[0] ?? "", half: cells[1] ?? "", tier: cells[2] ?? "", file: pinned?.[1] ?? "", title: pinned?.[2] ?? "" };
  });
  return { ok: tables.ok && tables.grids.length === 1, why: tables.why, rows };
}
const hxRows = (): readonly EvidenceRow[] => evidenceRows().rows.filter(row => row.subsystem === "HX");
/** The licensed-complete branch is the HX cell's positive half ("complete query and bounded result"). */
const licensedHalf = (): readonly EvidenceRow[] => hxRows().filter(row => row.half.startsWith("positive"));
const cellsOf = (line: string): string[] =>
  line
    .split("|")
    .map(cell => cell.trim())
    .filter((cell, index, all) => !(cell === "" && (index === 0 || index === all.length - 1)));
/** The citation a label carries: (path:line@sha). */
const citationOf = (label: string): { readonly path: string; readonly line: number; readonly sha: string } | undefined => {
  const match = /\(([\w./-]+):(\d+)@([0-9a-f]{7,40})\)/.exec(label);
  return match ? { path: match[1] ?? "", line: Number(match[2]), sha: match[3] ?? "" } : undefined;
};
const labelOf = (id: string): string | undefined => ROWS.find(row => row.id === id)?.label;

// ---- the judged pins: each returns its witness ----

const IMPL: Readonly<Record<string, () => Json | Promise<Json>>> = {
  W1: () => {
    const tier = nativeTier();
    const live = tier.files.flatMap(file => {
      const sf = parseRepo(file);
      const entries = hxImports(sf);
      if (entries.length === 0) return [];
      const cases = casesOf(sf).filter(entry => references(entry.body, entries));
      return [{ file, entries, cases: cases.map(entry => entry.title), witnessing: cases.filter(entry => claimsIn(entry.body, sf, CLAIM_VOCABULARY).length > 0).map(entry => entry.title) }];
    });
    return plain({ config: tier.config, files: tier.files, entryPoints: HX_ENTRIES, live });
  },
  W2: async () => {
    const live = nativeTier().files.filter(file => hxImports(parseRepo(file)).length > 0);
    return plain({ route: live.map(file => ({ file, predicateExpectations: predicateExpectations(parseRepo(file)) })), armed: (await armed()).witness });
  },
  S1: () =>
    plain({
      files: Object.fromEntries(nativeTier().files.map(file => [file, claimsOfSource(file, textOf(file))])),
      falsifiers: Object.fromEntries(FALSIFIERS.map(entry => [entry.id, claimsOfSource("probe.ts", liveSource([entry.statement])).length])),
      benign: claimsOfSource("probe.ts", liveSource(BENIGN)),
    }),
  S2: () => {
    const evidence = evidenceRows();
    const section = docsSection(textOf(DOCS_14), EVIDENCE, 2, [DOCS_PARENT]);
    return plain({
      table: evidence.ok ? "one table" : `refused: ${evidence.why}`,
      licensedHalf: licensedHalf().map(row => ({ half: row.half, tier: row.tier, file: row.file, title: row.title })),
      noLivePass: section.ok && section.blocks.some(block => block.kind === "paragraph" && block.text.includes(NO_LIVE_PASS)),
    });
  },
  T1: () => {
    const configs = { "default-gate": configOf(DEFAULT_GATE_TIER), [NATIVE_TIER]: configOf(NATIVE_TIER) };
    return plain({
      configs,
      rows: hxRows().map(row => ({
        half: row.half,
        tier: row.tier,
        file: row.file,
        selectedBy: { default: selects(defaultConfig, row.file), [NATIVE_TIER]: selects(nativeConfig, row.file) },
        registered: casesOf(parseRepo(row.file)).some(entry => entry.title === row.title),
      })),
    });
  },
  T2: () => {
    const cited = citationOf(labelOf("T") ?? "");
    const shown = cited === undefined ? "" : execFileSync("git", ["show", `${cited.sha}:${cited.path}`], { cwd: ROOT, encoding: "utf8" });
    const line = shown.split("\n")[(cited?.line ?? 0) - 1] ?? "";
    const matrix = sectionTables(textOf(DOCS_14), MATRIX, 2, [DOCS_PARENT]);
    const current = (matrix.grids[0] ?? []).filter(cells => cells[0] === "HX");
    return plain({ citation: cited ?? null, cited: cellsOf(line), current });
  },
  T3: () => {
    const gate = /^gate = \[([^\]]*)\]$/m.exec(textOf("forge.toml"))?.[1] ?? "";
    const steps = [...gate.matchAll(/"([^"]+)"/g)].map(match => match[1] ?? "");
    const binder = parseRepo(BINDER);
    const lead = binder.getFullText().slice(0, binder.statements[0]?.getStart(binder) ?? 0);
    let bindsSection = false;
    const visit = (node: ts.Node): void => {
      if (stringOf(node) === MATRIX) bindsSection = true;
      ts.forEachChild(node, visit);
    };
    visit(binder);
    return plain({ gateRunsCensus: steps.includes(CENSUS_STEP), config: configOf(CENSUS_STEP), selectsBinder: selects(censusConfig, BINDER), leadNamesBead: lead.includes(BINDER_BEAD), bindsSection });
  },
  N1: () => {
    const fixtures = [...new Set(licensedHalf().map(row => row.file))];
    return plain({
      cited: (textOf(TRACEABILITY).split("\n")[TRACE_LINE - 1] ?? "").includes(NOT_NATIVE),
      nativeSelectedByDefault: nativeTier().files.filter(file => selects(defaultConfig, file)),
      fixtures: fixtures.map(file => ({ file, default: selects(defaultConfig, file), [NATIVE_TIER]: selects(nativeConfig, file) })),
    });
  },
  Q1: () => plain((RESIDUALS.Q1 ?? []).map(member => claimsOfSource("probe.ts", liveSource([member])))),
  Q2: () => plain((RESIDUALS.Q2 ?? []).map(member => claimsOfSource("probe.ts", liveSource([member])))),
};

// ---- the outside anchors' readers: the bead's own description in the tracker export ----

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly readings: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly witnesses: Readonly<Record<string, Json>>;
  readonly tests: readonly string[];
  readonly gate: { readonly state: string; readonly condition: string; readonly citations: readonly string[]; readonly onLanding: string; readonly measured: Json };
}
const ROSTER = JSON.parse(textOf(ROSTER_PATH)) as Roster;
const REACHED: { readonly pin: string; readonly same: boolean }[] = [];

/** The tracker export's title and description for a bead (the notes are never read). */
function beadRow(bead: string): { readonly title: string; readonly description: string } | undefined {
  for (const line of textOf(EXPORT).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (!isRecord(row) || row.id !== bead) continue;
    const { title, description } = row;
    if (typeof title === "string" && typeof description === "string") return { title, description };
  }
  return undefined;
}
/** The STATEMENT line: its condition, the condition's citations, the obligation and the until-then clause. */
function statementOf(description: string): { readonly condition: string; readonly citations: string; readonly obligation: string; readonly until: string } | undefined {
  const match = /^STATEMENT: When (.+) \(([^()]+)\), (Pi shall .+?); (until then .+)\.$/m.exec(description);
  return match ? { condition: match[1] ?? "", citations: match[2] ?? "", obligation: match[3] ?? "", until: match[4] ?? "" } : undefined;
}
/** The description's ACCEPTANCE list: each element of its one-line bracket, single- or double-quoted. */
function acceptanceItems(description: string): string[] {
  const body = /^ACCEPTANCE: \[(.*)\]$/m.exec(description)?.[1] ?? "";
  return [...body.matchAll(/(["'])(.*?)\1(?=, |$)/g)].map(match => match[2] ?? "");
}
/** A clause without a trailing parenthetical citation (path:line, optionally @sha). */
function uncited(clause: string): { readonly label: string; readonly citation?: string } {
  const cited = /^(.*) \(([\w./-]+:\d+(?:@[0-9a-f]{7,40})?)\)$/.exec(clause);
  return cited ? { label: cited[1] ?? "", citation: cited[2] ?? "" } : { label: clause };
}
/** The quotes tile the label in order, with nothing but separators (whitespace, punctuation, an em dash) between. */
function tiles(label: string, quotes: readonly string[]): boolean {
  const separators = new RegExp(`^[\\s,;:()${EM_DASH}]*$`);
  let at = 0;
  for (const quote of quotes) {
    const found = label.indexOf(quote, at);
    if (found < 0 || !separators.test(label.slice(at, found))) return false;
    at = found + quote.length;
  }
  return separators.test(label.slice(at));
}

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""} - ${READING[pin] ?? ""}`, { timeout: BUDGET_MS }, async () => {
        const implementation = IMPL[pin];
        const witness = implementation === undefined ? null : await implementation();
        expect(witness, `${pin} has a case`).not.toBeNull();
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
      });
    }
  }

  it("rule 16: the rows, the residual families, the falsifier and benign rosters and the claim vocabulary are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["W:2", "S:2", "T:3", "N:1", "Q:2"]);
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:3", "Q2:1"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(READING), "one reading per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(FALSIFIERS.map(entry => `${entry.id}:${entry.form}`)).toEqual([
      "verdict-property:verdictField",
      "verdict-tobe:verdictField",
      "verdict-not-false:verdictField",
      "verdict-truthy:verdictField",
      "licence-property:licenceField",
      "licence-quoted-key:licenceField",
      "licence-element:licenceField",
      "licence-not-falsy:licenceField",
      "licence-dotted-path:licenceField",
      "licence-array-path:licenceField",
      "kind-complete:completeKinds:complete",
      "kind-complete-empty:completeKinds:complete-empty",
      "kind-matcher:completeKinds:complete-empty",
      "coverage-complete:coverage",
      "known-empty-text:knownEmpty",
      "known-empty-template:knownEmpty",
      "known-empty-title:knownEmpty",
    ]);
    expect(BENIGN).toHaveLength(5);
    expect(LIVE_PREAMBLE).toHaveLength(8);
    expect(CLAIM_VOCABULARY).toEqual({ verdictField: "absenceLicensed", licenceField: "licenses_absence", completeKinds: ["complete", "complete-empty"], coverage: "complete", knownEmpty: "known-empty" });
  });

  it("the outside anchors: the bead's own description binds the rows, row N's citation and the gate block; src binds the claim vocabulary and every falsifier form", { timeout: BUDGET_MS }, async () => {
    const row = beadRow(BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    expect(row?.title.startsWith(`[${REQUIREMENT}] `), "the title opens with the requirement id").toBe(true);
    const statement = statementOf(row?.description ?? "");
    expect(statement, "the description carries one STATEMENT line of the conditional form").toBeDefined();
    const items = acceptanceItems(row?.description ?? "");
    expect(items.map(item => item.split(": ")[0]), "the acceptance holds a standing item and an on-landing item").toEqual(["Standing", "On landing"]);
    const standing = (/^Standing: (.*)\.$/.exec(items[0] ?? "")?.[1] ?? "").split("; ").map(uncited);
    const clauses = [statement?.obligation, statement?.until, ...standing.map(clause => clause.label)];
    expect(clauses, "the statement's two clauses and the standing item's two clauses are rows W, S, T and N, in order").toEqual(["W", "S", "T", "N"].map(labelOf));
    for (const entry of ROWS.filter(candidate => candidate.id !== "Q")) {
      expect(tiles(entry.label, entry.pins.map(pin => QUOTES[pin] ?? "")), `row ${entry.id}'s pin quotes tile its label`).toBe(true);
    }
    expect(standing.map(clause => clause.citation), "row N's clause cites the TRACEABILITY line N1 reads; row T's citation stays in its label").toEqual([undefined, `${basename(TRACEABILITY)}:${TRACE_LINE}`]);
    expect(ROSTER.gate.state, "the gate artifact is absent: the on-landing leg is not delivered").toBe("absent");
    expect(ROSTER.gate.condition, "the gate block's condition is the statement's").toBe(statement?.condition);
    expect(ROSTER.gate.citations, "and its citations").toEqual(statement?.citations.split("; "));
    expect(ROSTER.gate.onLanding, "and the on-landing item, verbatim").toBe(/^On landing: (.*)\.$/.exec(items[1] ?? "")?.[1]);
    const derived = (await armed()).vocabulary;
    expect(CLAIM_VOCABULARY, "the scanner's vocabulary is the one the predicate, the projection and the consumed fields yield").toEqual(derived);
    const spelledValue = (form: string): string => (form.startsWith("completeKinds:") ? form.slice("completeKinds:".length) : String(derived[form as keyof ClaimVocabulary]));
    const forms = [
      "verdictField",
      "licenceField",
      ...derived.completeKinds.map(kind => `completeKinds:${kind}`),
      "coverage",
      "knownEmpty",
    ];
    for (const form of forms) {
      const spelled = FALSIFIERS.filter(entry => entry.form === form && entry.statement.includes(spelledValue(form)) && claimsOfSource("probe.ts", liveSource([entry.statement])).length > 0);
      expect(spelled.length, `the derived form ${form} has a falsifier spelling its value that the scanner flags`).toBeGreaterThan(0);
    }
    expect([...new Set(FALSIFIERS.map(entry => entry.form))], "and no falsifier names a form the derivation lacks").toEqual(forms);
  });

  it("roster: the judged rows, the quotes, the readings, the residual members and the registered tests equal test/fixtures/hx-licensed-complete-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(READING, "the pin readings equal the roster's").toEqual(ROSTER.readings);
    expect(RESIDUALS, "the residual members equal the roster's").toEqual(ROSTER.residuals);
    expect(Object.keys(ROSTER.witnesses), "one roster witness per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(
      REACHED.map(entry => entry.pin),
      "every pin reached its witness compare, in row order",
    ).toEqual(ROWS.flatMap(row => row.pins));
    expect(
      REACHED.filter(entry => !entry.same).map(entry => entry.pin),
      "and each compare held",
    ).toEqual([]);
  });
});
