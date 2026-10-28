/**
 * wb-km7q.3 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R9, program-triage-2026-10-18 child of epic wb-km7q): the
 * adoption-time falsifiers of a gating carrier. Statement (the bead title, read from the tracked bead export): "If Pi ever
 * projects query evidence into context via RC's optional query-evidence adapter (2026-10-17 amendment; gated RC-RQ2 'unknown
 * not pass'), a missing QueryView resource reads as host-pending or an explicit unavailable-block policy, never as logical
 * UNKNOWN; unknown never renders as passing because an empty list rendered; and no DevTools/debugger surface computes query
 * truth." Acceptance (owner filing, verbatim; the labels of rows A-D joined as "A <em dash> B, C, and D." are this clause word
 * for word, read from the tracked bead export): "adoption-time falsifiers for the three arms - missing QueryView renders
 * host-pending/unavailable-block (never logical UNKNOWN), an empty rendered list never flips unknown to pass, and the
 * inspector/DevTools surface only consumes emitted evidence, never computes query truth."
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-28, read-only; this census is hermetic and never re-reads any of it):
 *  - The producer ships the adapter. ReactiveComponentsSDK at the bead pin 44b72145b175 and at origin/master 5c480c5712b4
 *    holds src/reactive_components/query_evidence.py (blob c8a2f154): QueryView, project_query_evidence, unavailable_block,
 *    query_evidence_of, the charter:44 verdict texts and the two missing-resource policies. The charter
 *    docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md is blob 45e62320 at both.
 *  - The installed rf 0.1.845 bundles reactive_components 0.1.1.20261024212618 with that module byte for byte, and no
 *    reactive_fiber_cli module calls it, so no rf render carries query evidence today.
 *  - Pi names neither the adapter nor RC in code and depends on no RC package (A1): the trigger has not fired.
 *  The roster vendors both producer files as base64 (so no Pi text census reads producer prose as Pi text) and the outputs the
 *  installed adapter returned, run read-only from rf's environment, for one view of each verdict and for each policy.
 *
 * WHERE ADOPTED EVIDENCE ARRIVES (SURFACES). RC's adapter renders context blocks, and Pi takes assembled context only through
 *  the rf render envelope, so adopted evidence rides result.output.text and the result.blocks rows of a render. The Pi modules
 *  that read that envelope are exactly the src modules whose code names REACTIVE_FIBER_CLI_SCHEMA (the source of truth, read
 *  by the TypeScript AST): the registered native provider (providers/reactivefiber.ts, the capability output a workflow
 *  receives), nativeEvidence (native-evidence.ts, the node evidence the runtime emits and the inspector shows) and the RF
 *  reader adapter (reactivefiber-observer.ts, the snapshot an ObservationProjection holds). The fourth surface is the
 *  DevTools surface the bead names: the four-view inspector (ui/workflow-inspector.ts layoutInspector, docs/workbench/10),
 *  drawn over a projection holding that snapshot. A new envelope reader reds A3 until it joins SURFACES.
 * CASES: the clean full-shape envelope (test/helpers/rf-render-fixture.ts) whose document is one producer output - the TRUE,
 *  FALSE and UNKNOWN (empty source list) evidence blocks and the unavailable block, each on two carriers (text: the block's
 *  text in output.text with a five-key row; row: that row also carrying the producer block's kind, content, metadata,
 *  provenance and visibility, an open-object carrier) - and the defer policy (no block: an empty rendered list), beside the
 *  neutral render. Every case reaches the provider through a stand-in rf on PATH in makeScratch scratch.
 *
 * READINGS (the falsifiers' vocabulary, read from the vendored producer bytes, never typed here): a verdict TOKEN is a
 *  VERDICTS member spelled exactly (case-sensitive, word-bounded); a verdict TEXT is a TEST_HEALTH_TEXTS value or the
 *  UNAVAILABLE_TEXT, matched as a substring; a PASS or FAIL word (the roster's words) is a case-insensitive word. Each
 *  verdict's class is read from its own text: the text naming a PASS word is the pass, the one naming a FAIL word the fail,
 *  the one naming neither the unknown.
 * THE FALSIFIERS (each armed on every surface; A3 plants each violation on each surface and the judge fires):
 *  F1 (arm 1), on a missing-resource case (unavailable, defer): any logical-UNKNOWN reading (the UNKNOWN token or text) on a
 *    surface. The producer emitted none, so any such reading is Pi's.
 *  F2 (arm 2), on an unknown-or-empty case (UNKNOWN with no sources, defer): any pass reading (the TRUE token or text, a PASS
 *    word) on a surface, and on the reader adapter a zero-block render reading complete or success.
 *  F3 (arm 3), on every case, on the inspector and its inputs (the node evidence and the snapshot): any verdict reading that
 *    the producer did not emit for that case (its evidence absent from the case envelope's strings). Consuming emitted
 *    evidence passes; computing truth does not.
 *
 * JUDGED ROWS (ROWS; one test per pin under its row's label; every witness carries its pin id and is held to the roster):
 *  A "adoption-time falsifiers for the three arms". A1 the trigger has not fired: no product module's code (every git-listed
 *    JS or TS module below src/, qa/ and examples/ and at the root, read as TypeScript AST lexemes with each template and + chain
 *    also read as spelled, comments excluded) names an
 *    adapter word sequence (every public name, kind or schema of the producer module that spells two words or more, and the
 *    producer's package, reduced to the minimal set) or holds a producer text; package.json depends on no RC package; and no
 *    surface reads the evidence (each one-block case projects as the neutral render does, the provider carrying the envelope
 *    verbatim for every case and the reader adapter referencing the text by digest only). A2 the producer artifact: the vendored bytes are
 *    the measured blobs, charter:44 holds the three arms and :46 names RC-RQ2 unknown not pass, the verdicts read three
 *    distinct classes, the outputs agree with the producer's texts, kinds, schema and policies, and the bead's citation pins
 *    are the roster's. A3 the falsifiers are armed: SURFACES are the envelope readers plus the inspector, CASES cover every
 *    output on both carriers, the matrix ran, and each judge fires on its planted violations on every surface.
 *  B "missing QueryView renders host-pending/unavailable-block (never logical UNKNOWN)". B1 the unavailable block on both
 *    carriers: F1 quiet on every surface, the provider carrying its text, kind and policy verbatim. B2 the defer policy: F1
 *    quiet on every surface, the reader adapter holding Pi's own pending marker (the zero-block inclusion note, partial).
 *  C "an empty rendered list never flips unknown to pass". C1 the empty rendered list (defer): F2 quiet on every surface,
 *    never complete or success. C2 the UNKNOWN view with an empty source list on both carriers: F2 quiet on every surface, the
 *    record's verdict and empty sources carried verbatim, beside the producer's own refusal of a TRUE without coverage.
 *  D "the inspector/DevTools surface only consumes emitted evidence, never computes query truth". D1 F3 quiet on the four
 *    inspector views of every case. D2 F3 quiet on the node evidence and the snapshot of every case; the node evidence holds
 *    no domainStatus and only the envelope's own values.
 * OUTSIDE ANCHORS: the owner filing's row of wb-km7q.3 in .beads/issues.jsonl (the acceptance clause is the labels joined; the
 *  title's arms are rows B-D; each pin's quote sits in its row's title part or label; the citation pins are the roster's);
 *  the vendored producer bytes (git blob ids; the vocabulary, the verdict classes and the policy coverage are read from them);
 *  src (the envelope readers). So a row, a pin, a case, a surface or a vocabulary member removed from every literal of this
 *  file and of the roster together still reds.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; rows, pins, quotes, witnesses, cases,
 *  surfaces, words, floors and residuals are held to test/fixtures/rc-query-evidence-roster.json; a last case reads that every
 *  pin ran to its witness.
 * RESIDUALS (named; each has a pinned quiet row): Q1 R-TONE-WORD Pi's own lowercase presentation word 'unknown' (a statusTone,
 *  coverage, freshness or connection value, the inspector's attention line) marks a partial or unobserved reading and is no
 *  verdict, so F1 stays quiet on it; Q2 R-RENDER-TONE the reader adapter's success tone and complete coverage judge the
 *  render's envelope, so a clean render carrying an UNKNOWN block reads success as a render and F2 reads it structurally only
 *  for a zero-block render; Q3 R-CASE a verdict re-spelled in another letter case ("true", "Unknown") is no token reading;
 *  Q4 R-SYNONYM a pass or an unknown said in other words ("succeeded", "green", "all clear"; "indeterminate") is not read;
 *  Q5 R-COMMENT a code comment naming the adapter is no trigger (A1 reads code lexemes); Q6 R-UNDRIVEN the surfaces this
 *  census does not drive (the workflow runtime's module-private resultPreview of a capability result, the dialog and card
 *  renderers, the inspector's evidence-store payload view and pane tiers, the reconcile decision core) carry the provider
 *  output, which is judged; Q7 R-OTHER-ROUTE an adoption that names no adapter sequence and no RC outside the envelope
 *  readers (a generic reader of rendered rows) is no trigger; Q8 R-NON-MODULE a file that is not a JS or TS module (a doc
 *  page, a Python or shell script under qa/, a configuration file) is not read by A1; Q9 R-COMPOSED a name assembled from a
 *  non-constant part (a variable holding the word) is read with that part as one space (constant + chains and templates fold
 *  as spelled); Q10 R-LOOKALIKE a look-alike letter (Cyrillic, Greek) or an inserted invisible inside a word is not folded
 *  (NFKC folds the fullwidth forms, which are read).
 * NOT CLAIMED: the producer's own conformance (RC's tests own RC-RQ2) and rf's; any Pi doc page (the trigger is code). An
 *  adopting cut owes its projection surface in SURFACES and a re-measured A1 baseline (A1 and A3 red until it does).
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch with the leak guard installed; Pi's code,
 * the bead export and package.json are only read; nothing is spawned but git and the stand-in rf.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { type InspectorModel, type InspectorView, initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { registerNativeReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberProjectionTopology, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf, type Json, rfFixtureDecision } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-km7q.3";
const CAPABILITY = "reactivefiber.render.preview";
/** One bound for the cases that share the code pass or the case matrix: each runs once, and a loaded gate host is slow. */
const SLOW = 180_000;

// ---------------------------------------------------------------------------------------- the judged rows (standing rule 16)
const ROWS = [
  { id: "A", label: "adoption-time falsifiers for the three arms", pins: ["A1", "A2", "A3"] },
  { id: "B", label: "missing QueryView renders host-pending/unavailable-block (never logical UNKNOWN)", pins: ["B1", "B2"] },
  { id: "C", label: "an empty rendered list never flips unknown to pass", pins: ["C1", "C2"] },
  { id: "D", label: "the inspector/DevTools surface only consumes emitted evidence, never computes query truth", pins: ["D1", "D2"] },
] as const;
const FROZEN_SHAPE = ["A:3", "B:2", "C:2", "D:2"];
type PinId = (typeof ROWS)[number]["pins"][number];
/** A row's label by its id (a describe title never indexes ROWS by position, so a deleted row is judged, not a crash). */
const labelOf = (id: string): string => ROWS.find(row => row.id === id)?.label ?? id;
/** The cases: the neutral render, each producer output on each carrier and the defer policy (an empty rendered list). */
const CASES = ["neutral", "true:text", "true:row", "false:text", "false:row", "unknown-empty:text", "unknown-empty:row", "unavailable:text", "unavailable:row", "defer"];
/** The Pi surfaces an rf render reaches, each with its src module. */
const SURFACES: Readonly<Record<string, string>> = {
  provider: "src/workbench/providers/reactivefiber.ts",
  "native-evidence": "src/workbench/native-evidence.ts",
  observer: "src/workbench/reactivefiber-observer.ts",
  inspector: "src/ui/workflow-inspector.ts",
};
const RESIDUALS = [
  { id: "R-TONE-WORD", quiet: "Q1" },
  { id: "R-RENDER-TONE", quiet: "Q2" },
  { id: "R-CASE", quiet: "Q3" },
  { id: "R-SYNONYM", quiet: "Q4" },
  { id: "R-COMMENT", quiet: "Q5" },
  { id: "R-UNDRIVEN", quiet: "Q6" },
  { id: "R-OTHER-ROUTE", quiet: "Q7" },
  { id: "R-NON-MODULE", quiet: "Q8" },
  { id: "R-COMPOSED", quiet: "Q9" },
  { id: "R-LOOKALIKE", quiet: "Q10" },
];

// ------------------------------------------------------------------------------------------------------------- the roster
interface RosterPin {
  readonly row: string;
  readonly quote: string;
  readonly witness: Json;
}
interface Roster {
  readonly bead: string;
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly string[] }[];
  readonly frozenShape: readonly string[];
  readonly pins: Readonly<Record<string, RosterPin>>;
  readonly producer: {
    readonly repository: string;
    readonly pin: string;
    readonly originMaster: string;
    readonly measuredUtc: string;
    readonly charter: { readonly path: string; readonly blob: string; readonly base64: string; readonly armLine: number; readonly gateLine: number };
    readonly adapter: { readonly path: string; readonly blob: string; readonly base64: string };
    readonly installed: { readonly rf: string; readonly reactiveComponents: string; readonly adapterBlob: string; readonly rfCallers: number };
    readonly outputs: Readonly<Record<string, Json>>;
    readonly refusals: Readonly<Record<string, string>>;
  };
  readonly armSentences: readonly string[];
  readonly gatePhrase: string;
  readonly cases: readonly string[];
  readonly surfaces: Readonly<Record<string, string>>;
  readonly words: { readonly pass: readonly string[]; readonly fail: readonly string[] };
  readonly floors: { readonly codeModules: number; readonly srcModules: number; readonly lexemes: number };
  readonly residuals: readonly { readonly id: string; readonly quiet: string; readonly family: string }[];
}
const isObject = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
function readRoster(): Roster {
  const value: unknown = JSON.parse(readFileSync(join(HERE, "fixtures", "rc-query-evidence-roster.json"), "utf8"));
  const keys = ["bead", "rows", "frozenShape", "pins", "producer", "armSentences", "gatePhrase", "cases", "surfaces", "words", "floors", "residuals"];
  if (!isObject(value) || !keys.every(key => Object.hasOwn(value, key))) throw new Error(`the roster needs ${keys.join(", ")}`);
  const producer = value.producer;
  const producerKeys = ["repository", "pin", "originMaster", "measuredUtc", "charter", "adapter", "installed", "outputs", "refusals"];
  if (!isObject(producer) || !producerKeys.every(key => Object.hasOwn(producer, key))) throw new Error(`the roster producer needs ${producerKeys.join(", ")}`);
  return value as unknown as Roster;
}
const ROSTER = readRoster();
const REACHED = new Set<string>();
/** A pin's measured witness must be the roster's; reaching it is recorded for the last case. */
function witnessed(pin: PinId, witness: Json): void {
  expect(witness, `${pin} witness`).toEqual(ROSTER.pins[pin]?.witness);
  REACHED.add(pin);
}

// ------------------------------------------------------------------------------------- the producer, from its own bytes
const gitBlobId = (bytes: Buffer): string => createHash("sha1").update(Buffer.concat([Buffer.from(`blob ${bytes.length}\0`), bytes])).digest("hex");
const sha256 = (text: string): string => createHash("sha256").update(text).digest("hex");
const CHARTER_BYTES = Buffer.from(ROSTER.producer.charter.base64, "base64");
const ADAPTER_BYTES = Buffer.from(ROSTER.producer.adapter.base64, "base64");
const CHARTER_LINES = CHARTER_BYTES.toString("utf8").split("\n");
const ADAPTER_LINES = ADAPTER_BYTES.toString("utf8").split("\n");
const charterLine = (line: number): string => CHARTER_LINES[line - 1] ?? "";
/** The double-quoted string literals of a Python text, in order (the producer's carry no escapes). */
const pyStrings = (text: string): string[] => [...text.matchAll(/"([^"\\]*)"/g)].map(match => match[1] ?? "");
/** The right-hand side of the producer module's top-level `NAME: Final... = <value>` line. */
function pyConstant(name: string): string {
  const line = ADAPTER_LINES.find(text => text.startsWith(`${name}: Final`));
  const at = line?.indexOf(" = ") ?? -1;
  if (line === undefined || at < 0) throw new Error(`the producer module declares no ${name}`);
  return line.slice(at + 3);
}
/** The `"KEY": "value"` entries of a producer table, read from its declaration line to its closing parenthesis. */
function pyTable(name: string): Record<string, string> {
  const start = ADAPTER_LINES.findIndex(text => text.startsWith(`${name}: Final`));
  const end = ADAPTER_LINES.findIndex((text, index) => index > start && text === ")");
  if (start < 0 || end < 0) throw new Error(`the producer module declares no ${name} table`);
  const entries = ADAPTER_LINES.slice(start + 1, end).flatMap(text => {
    const [key, value] = pyStrings(text);
    return key !== undefined && value !== undefined ? [[key, value] as const] : [];
  });
  return Object.fromEntries(entries);
}
/** Every top-level public name of the producer module: its classes, functions and Final constants, in file order. */
function pyPublicNames(): string[] {
  return ADAPTER_LINES.flatMap(text => {
    const match = /^(?:class ([A-Za-z]\w*)|def ([A-Za-z]\w*)\(|([A-Za-z]\w*): Final)/.exec(text);
    const name = match?.[1] ?? match?.[2] ?? match?.[3];
    return name === undefined ? [] : [name];
  });
}
const PRODUCER = {
  verdicts: pyStrings(pyConstant("VERDICTS")),
  policies: pyStrings(pyConstant("UNAVAILABLE_POLICIES")),
  kind: pyStrings(pyConstant("QUERY_EVIDENCE_KEY"))[0] ?? "",
  schema: pyStrings(pyConstant("QUERY_EVIDENCE_SCHEMA"))[0] ?? "",
  unavailableKind: pyStrings(pyConstant("UNAVAILABLE_KIND"))[0] ?? "",
  unavailableText: pyStrings(pyConstant("UNAVAILABLE_TEXT"))[0] ?? "",
  texts: pyTable("TEST_HEALTH_TEXTS"),
  publicNames: pyPublicNames(),
};

// --------------------------------------------------------------------------------------------------------- the readings
/** NFKC, a break at each lower-to-upper change and before the last capital of an acronym run, lower case, runs of a-z0-9. */
function words(text: string): string[] {
  const split = text.normalize("NFKC").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
  return split.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}
const containsRun = (haystack: readonly string[], needle: readonly string[]): boolean =>
  needle.length > 0 && haystack.some((_, index) => needle.every((word, offset) => haystack[index + offset] === word));
const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordPattern = (word: string, flags: string): RegExp => new RegExp(`(?<![A-Za-z0-9_])${escapeRegExp(word)}(?![A-Za-z0-9_])`, flags);
type VerdictClass = "pass" | "fail" | "unknown";
/** A verdict's class, read from its own TestHealth text: the one naming a PASS word, the one naming a FAIL word, or neither. */
function classOf(verdict: string): VerdictClass {
  const text = PRODUCER.texts[verdict] ?? "";
  if (ROSTER.words.pass.some(word => wordPattern(word, "i").test(text))) return "pass";
  if (ROSTER.words.fail.some(word => wordPattern(word, "i").test(text))) return "fail";
  return "unknown";
}
interface VerdictReading {
  readonly cls: VerdictClass | "unavailable";
  readonly evidence: string;
}
/** Every verdict reading of one surfaced string: tokens, texts and words, each with the evidence it was read by. */
function verdictReadings(text: string): VerdictReading[] {
  const out: VerdictReading[] = [];
  for (const verdict of PRODUCER.verdicts) {
    const cls = classOf(verdict);
    if (wordPattern(verdict, "").test(text)) out.push({ cls, evidence: verdict });
    const phrase = PRODUCER.texts[verdict];
    if (phrase !== undefined && phrase !== "" && text.includes(phrase)) out.push({ cls, evidence: phrase });
  }
  if (PRODUCER.unavailableText !== "" && text.includes(PRODUCER.unavailableText)) out.push({ cls: "unavailable", evidence: PRODUCER.unavailableText });
  const lists: readonly (readonly [VerdictClass, readonly string[]])[] = [["pass", ROSTER.words.pass], ["fail", ROSTER.words.fail]];
  for (const [cls, list] of lists) {
    for (const word of list) {
      const match = wordPattern(word, "i").exec(text);
      if (match) out.push({ cls, evidence: match[0].toLowerCase() });
    }
  }
  return out;
}
/** F1: the logical-UNKNOWN readings of a surface. */
const f1 = (strings: readonly string[]): string[] => strings.flatMap(text => verdictReadings(text).filter(reading => reading.cls === "unknown").map(reading => reading.evidence));
/** F2: the pass readings of a surface. */
const f2 = (strings: readonly string[]): string[] => strings.flatMap(text => verdictReadings(text).filter(reading => reading.cls === "pass").map(reading => reading.evidence));
/** F2 on the reader adapter: a zero-block render reading complete or success. */
function zeroBlockPass(topology: ReactiveFiberProjectionTopology): string[] {
  return topology.snapshots.flatMap(snapshot => [...(snapshot.coverage === "complete" ? ["coverage complete"] : []), ...(snapshot.node.statusTone === "success" ? ["tone success"] : [])]);
}
/** F3: the verdict readings of a surface that the producer did not emit for the case. */
function f3(strings: readonly string[], emitted: readonly string[]): string[] {
  const allowed = new Set(emitted.flatMap(text => verdictReadings(text).map(reading => reading.evidence)));
  return strings.flatMap(text => verdictReadings(text).filter(reading => !allowed.has(reading.evidence)).map(reading => reading.evidence));
}
/** Every string leaf of a value, in order. */
function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringsOf);
  if (isObject(value)) return Object.values(value).flatMap(stringsOf);
  return [];
}

// --------------------------------------------------------------------------------------------------------- the code pass
const CODE_ROOTS = ["src", "qa", "examples"];
const MODULE = /\.(?:[cm]?[jt]s|[jt]sx)$/;
/** What git would commit as a code module below the roots or at the root: tracked or untracked, never ignored. */
function codeModules(): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...CODE_ROOTS, ":(glob)*"], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && MODULE.test(path) && existsSync(join(REPO, path))))].sort();
}
interface Lexeme {
  readonly line: number;
  readonly text: string;
  readonly literal: boolean;
}
const isPlus = (node: ts.Node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken;
/** A template or a + chain as spelled: its literal parts in order, each non-constant part read as one space. */
function spelled(node: ts.Expression): string {
  if (ts.isParenthesizedExpression(node)) return spelled(node.expression);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) return node.head.text + node.templateSpans.map(span => ` ${span.literal.text}`).join("");
  if (isPlus(node)) return spelled(node.left) + spelled(node.right);
  return " ";
}
/** A module's identifiers and literal texts (string, template part, regular expression, JSX text), and each template and each
 * outermost + chain as spelled; comments are never read. */
function lexemes(path: string, text: string): Lexeme[] {
  const kind = /\.[jt]sx$/.test(path) ? (path.endsWith(".jsx") ? ts.ScriptKind.JSX : ts.ScriptKind.TSX) : /\.[cm]?js$/.test(path) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kind);
  const out: Lexeme[] = [];
  const visit = (node: ts.Node): void => {
    const named = ts.isIdentifier(node) || ts.isPrivateIdentifier(node);
    const literal = ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node) || ts.isRegularExpressionLiteral(node) || ts.isJsxText(node);
    const line = (): number => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
    if (named || literal) out.push({ line: line(), text: named ? node.text : (node as ts.LiteralLikeNode).text, literal });
    let outer: ts.Node = node.parent;
    while (outer !== undefined && ts.isParenthesizedExpression(outer)) outer = outer.parent;
    if (ts.isTemplateExpression(node) || (isPlus(node) && !(outer !== undefined && isPlus(outer)))) out.push({ line: line(), text: spelled(node as ts.Expression), literal: true });
    ts.forEachChild(node, visit);
  };
  visit(source);
  return out;
}
/** The adapter's word sequences: each public name, kind or schema of the producer module and the producer's package directory
 * that spells two words or more, reduced to the minimal set (a sequence holding another as a run is dropped). */
function triggerSequences(): string[][] {
  const packageDirectory = ROSTER.producer.adapter.path.split("/").at(-2) ?? "";
  const all = [...PRODUCER.publicNames, PRODUCER.kind, PRODUCER.unavailableKind, PRODUCER.schema, packageDirectory].map(words).filter(sequence => sequence.length >= 2);
  const unique = [...new Map(all.map(sequence => [sequence.join(" "), sequence])).values()];
  return unique.filter(sequence => !unique.some(other => other.length < sequence.length && containsRun(sequence, other))).sort((a, b) => a.join(" ").localeCompare(b.join(" ")));
}
const PRODUCER_TEXTS = [...Object.values(PRODUCER.texts), PRODUCER.unavailableText].filter(text => text !== "");
/** One module's trigger findings: a lexeme spelling an adapter sequence, or a literal holding a producer text. */
function triggerFindings(path: string, text: string, sequences: readonly (readonly string[])[]): string[] {
  return lexemes(path, text).flatMap(lexeme => {
    const spelled = words(lexeme.text);
    const hits = sequences.filter(sequence => containsRun(spelled, sequence)).map(sequence => sequence.join(" "));
    if (lexeme.literal) hits.push(...PRODUCER_TEXTS.filter(phrase => lexeme.text.includes(phrase)).map(() => "producer text"));
    return hits.map(hit => `${path}:${lexeme.line} ${hit}`);
  });
}
interface CodePass {
  readonly modules: readonly string[];
  readonly lexemes: number;
  readonly findings: readonly string[];
  readonly readers: readonly string[];
}
let codePass: CodePass | undefined;
/** The one pass over Pi's code: trigger findings, and the src modules whose code names the rf envelope's schema constant. */
function code(): CodePass {
  if (codePass !== undefined) return codePass;
  const sequences = triggerSequences();
  const modules = codeModules();
  let count = 0;
  const findings: string[] = [];
  const readers: string[] = [];
  for (const path of modules) {
    const text = readFileSync(join(REPO, path), "utf8");
    const read = lexemes(path, text);
    count += read.length;
    findings.push(...triggerFindings(path, text, sequences));
    if (path.startsWith("src/") && read.some(lexeme => !lexeme.literal && lexeme.text === "REACTIVE_FIBER_CLI_SCHEMA")) readers.push(path);
  }
  codePass = { modules, lexemes: count, findings, readers };
  return codePass;
}
/** The package.json dependency names (every dependency field) that spell an adapter sequence. */
function rcDependencies(): string[] {
  const manifest: unknown = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
  if (!isObject(manifest)) throw new Error("package.json is not an object");
  const names = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"].flatMap(fieldName => {
    const value = manifest[fieldName];
    return isObject(value) ? Object.keys(value) : [];
  });
  const sequences = triggerSequences();
  return names.filter(name => sequences.some(sequence => containsRun(words(name), sequence)));
}

// ------------------------------------------------------------------------------------------------------------ the cases
/** One case's rf render envelope: the clean full-shape render whose document is the producer output the case names. */
function caseEnvelope(id: string): JsonObject {
  const envelope: JsonObject = fullShapeRf(REPO);
  if (id === "neutral") return envelope;
  const [output = "", carrier] = id.split(":");
  const result = envelope.result;
  if (!isObject(result) || !Object.hasOwn(ROSTER.producer.outputs, output)) throw new Error(`no producer output for case ${id}`);
  const produced = ROSTER.producer.outputs[output] ?? null;
  if (!isObject(produced)) {
    // The defer policy: no block at all, so the rendered document is an empty list.
    result.output = { text: "", size_bytes: 0, digest: `sha256:${sha256("")}`, path: null };
    result.blocks = [];
    result.necessity = [];
    return envelope;
  }
  const content = String(produced.content);
  const text = `${content}\n`;
  const candidate = `fixture.query:main::${String(produced.key)}`;
  const row: JsonObject = { final_index: 0, candidate_key: candidate, component_id: "fixture.query", token_cost: { kind: "estimated", tokens: words(content).length }, token_cost_kind: "estimated", span: { start: 0, end: content.length } };
  if (carrier === "row") for (const key of ["kind", "content", "metadata", "provenance", "visibility"]) row[key] = produced[key] ?? null;
  result.output = { text, size_bytes: Buffer.byteLength(text), digest: `sha256:${sha256(text)}`, path: null };
  result.blocks = [row];
  result.necessity = [rfFixtureDecision(true, candidate)];
  return envelope;
}
const blockCount = (id: string): number => {
  const result = caseEnvelope(id).result;
  return isObject(result) && Array.isArray(result.blocks) ? result.blocks.length : -1;
};

// --------------------------------------------------------------------------------------------------------- the surfaces
interface Surfaces {
  readonly provider: JsonValue;
  readonly native: Readonly<Record<string, unknown>>;
  readonly topology: ReactiveFiberProjectionTopology;
  readonly inspector: Readonly<Record<InspectorView, readonly string[]>>;
  readonly detailsSelected: boolean;
}
const SCOPE: ObservationScope = { workspace: REPO, principal: "reader" };
const INVOCATION = "workflow-1";
const VIEWS: readonly InspectorView[] = ["overview", "graph", "timeline", "details"];
/** The four inspector views over a projection holding the snapshot, the details view with the RF node selected. */
function inspectorViews(topology: ReactiveFiberProjectionTopology): { readonly views: Record<InspectorView, readonly string[]>; readonly detailsSelected: boolean } {
  const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 16, maxEdges: 16, maxQuery: 16 });
  for (const snapshot of topology.snapshots) projection.refresh(snapshot);
  for (const relation of topology.relations) projection.relate(relation);
  const model: InspectorModel = { projection, scope: SCOPE, invocationId: INVOCATION, title: "query evidence census", status: "observed" };
  const size = { width: 120, rows: 40, ascii: true };
  const base = initialInspectorState();
  const selected = reduceInspectorKey("j", base, model)?.state ?? base;
  const details = reduceInspectorKey("e", selected, model)?.state ?? selected;
  const views = {
    overview: layoutInspector(model, base, size),
    graph: layoutInspector(model, { ...base, view: "graph" }, size),
    timeline: layoutInspector(model, { ...base, view: "timeline" }, size),
    details: layoutInspector(model, details, size),
  };
  return { views, detailsSelected: details.view === "details" && details.selected !== null };
}
/** Every case through the registered native provider (a stand-in rf on PATH), nativeEvidence, the reader adapter and the inspector. */
async function surfacesOf(cases: readonly string[]): Promise<Map<string, Surfaces>> {
  const dir = makeScratch("km7q3-rf-");
  const oldPath = process.env.PATH;
  try {
    const envelopeFile = join(dir, "envelope.json");
    const module = join(dir, "stand-in.mjs");
    writeFileSync(module, `import { readFileSync } from "node:fs";\nprocess.stdout.write(readFileSync(${JSON.stringify(envelopeFile)}, "utf8"));\n`);
    const executable = join(dir, "rf");
    writeFileSync(executable, `#!/bin/sh\nexec node ${JSON.stringify(module)} "$@"\n`);
    chmodSync(executable, 0o700);
    process.env.PATH = `${dir}:${oldPath ?? ""}`;
    const registry = new CapabilityRegistry();
    registerNativeReactiveFiberRender(registry, REPO);
    const out = new Map<string, Surfaces>();
    for (const id of cases) {
      writeFileSync(envelopeFile, JSON.stringify(caseEnvelope(id)));
      const provider = await registry.invoke(CAPABILITY, { model: "model", task: "task" }, { grants: ["reactivefiber:render"], signal: new AbortController().signal });
      const native = { ...nativeEvidence(CAPABILITY, provider) };
      const topology = reactivefiberTopology(provider, { scope: SCOPE, seam: "rf-cli", capturedAt: "2026-10-28T00:00:00Z", observedAt: "2026-10-28T00:00:01Z", invocationId: INVOCATION });
      const { views, detailsSelected } = inspectorViews(topology);
      out.set(id, { provider, native, topology, inspector: views, detailsSelected });
    }
    return out;
  } finally {
    if (oldPath === undefined) delete process.env.PATH;
    else process.env.PATH = oldPath;
    removeScratch(dir);
  }
}
let matrix: Promise<Map<string, Surfaces>> | undefined;
/** The case matrix, computed once and shared. */
async function reading(id: string): Promise<Surfaces> {
  matrix ??= surfacesOf(ROSTER.cases);
  const found = (await matrix).get(id);
  if (found === undefined) throw new Error(`the matrix holds no case ${id}`);
  return found;
}
/** The strings one surface shows for one case. */
function surfaceStrings(surfaces: Surfaces, surface: string): string[] {
  if (surface === "provider") return stringsOf(surfaces.provider);
  if (surface === "native-evidence") return stringsOf(surfaces.native);
  if (surface === "observer") return stringsOf(surfaces.topology);
  if (surface === "inspector") return VIEWS.flatMap(view => surfaces.inspector[view]);
  throw new Error(`no surface ${surface}`);
}
const SURFACE_IDS = (): string[] => Object.keys(ROSTER.surfaces);
/** A falsifier over every surface of the named cases: the readings it found, by `<case> <surface>: <evidence>`. */
async function judged(cases: readonly string[], surfaces: readonly string[], falsifier: (strings: readonly string[], id: string) => string[]): Promise<{ readonly judged: number; readonly readings: string[] }> {
  const readings: string[] = [];
  let count = 0;
  for (const id of cases) {
    const surfacesRead = await reading(id);
    for (const surface of surfaces) {
      count += 1;
      readings.push(...falsifier(surfaceStrings(surfacesRead, surface), id).map(evidence => `${id} ${surface}: ${evidence}`));
    }
  }
  return { judged: count, readings };
}
const emittedBy = (id: string): string[] => stringsOf(caseEnvelope(id));
const withoutPayload = (topology: ReactiveFiberProjectionTopology): string => JSON.stringify(topology, (key, value: unknown) => (key === "nativePayloadRef" ? "<payload>" : value));
/** The owner filing's row of the tracked bead export: the title, the acceptance clause and the citation pins. */
function ownerRow(): { readonly title: string; readonly acceptance: string; readonly citations: string[] } {
  for (const line of readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (!isObject(row) || row.id !== BEAD) continue;
    const citation = String(row.notes ?? "").split("\n").find(text => text.startsWith("Citation: ")) ?? "";
    const marker = "Acceptance: ";
    const acceptance = citation.includes(marker) ? citation.slice(citation.indexOf(marker) + marker.length) : "";
    const citations = [...citation.matchAll(/:(\d+)@([0-9a-f]{12})\b/g)].map(match => `${match[1]}@${match[2]}`);
    return { title: String(row.title ?? ""), acceptance, citations };
  }
  throw new Error(`the bead export holds no ${BEAD} row`);
}
/** The owner title's parts: the trigger with its gate (to the parenthesis that closes it) and the three arms after it. */
function titleParts(title: string): { readonly trigger: string; readonly arms: string[] } {
  const statement = title.slice(title.indexOf("] ") + 2);
  const close = statement.indexOf("), ");
  return { trigger: statement.slice(0, close + 1), arms: statement.slice(close + 3).split("; ") };
}

// ------------------------------------------------------------------------------------------------------------ the cases
describe("the judged set", () => {
  it("the labels tile the owner's acceptance, the title's arms are rows B-D, each quote sits in its row, and the roster agrees", () => {
    const owner = ownerRow();
    const [a, b, c, d] = ROWS.map(row => row.label);
    expect(`${a} \u2014 ${b}, ${c}, and ${d}.`, "the acceptance clause, word for word").toBe(owner.acceptance);
    const { trigger, arms } = titleParts(owner.title);
    expect(arms.length, "the title's arms are the rows after A").toBe(ROWS.length - 1);
    const units: Record<string, readonly string[]> = Object.fromEntries(ROWS.map((row, index) => [row.id, [index === 0 ? trigger : (arms[index - 1] ?? ""), row.label]]));
    for (const row of ROWS) {
      for (const pin of row.pins) {
        const entry = ROSTER.pins[pin];
        expect(entry?.row, `${pin} row`).toBe(row.id);
        expect((units[row.id] ?? []).some(unit => entry !== undefined && entry.quote !== "" && unit.includes(entry.quote)), `${pin} quote sits in its row`).toBe(true);
      }
    }
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(FROZEN_SHAPE);
    expect(ROSTER.frozenShape).toEqual(FROZEN_SHAPE);
    expect(ROSTER.rows).toEqual(ROWS);
    expect(Object.keys(ROSTER.pins).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROSTER.cases).toEqual(CASES);
    expect(ROSTER.surfaces).toEqual(SURFACES);
    expect(ROSTER.residuals.map(residual => ({ id: residual.id, quiet: residual.quiet }))).toEqual(RESIDUALS);
  });
});

describe(`A ${labelOf("A")}`, () => {
  it("A1 the trigger has not fired: no Pi code names the adapter or RC, no RC dependency, and no surface reads the evidence", { timeout: SLOW }, async () => {
    const pass = code();
    expect(pass.modules.length, "code modules read").toBeGreaterThanOrEqual(ROSTER.floors.codeModules);
    expect(pass.modules.filter(path => path.startsWith("src/")).length, "src modules read").toBeGreaterThanOrEqual(ROSTER.floors.srcModules);
    expect(pass.lexemes, "lexemes read").toBeGreaterThanOrEqual(ROSTER.floors.lexemes);
    const neutral = await reading("neutral");
    const diffs: string[] = [];
    for (const id of ROSTER.cases) {
      const provider = (await reading(id)).provider;
      const source = isObject(provider) ? provider.source : undefined;
      if (JSON.stringify(source) !== JSON.stringify(caseEnvelope(id))) diffs.push(`${id} provider: not verbatim`);
    }
    const oneBlock = ROSTER.cases.filter(id => id !== "neutral" && blockCount(id) === 1);
    for (const id of oneBlock) {
      const surfaces = await reading(id);
      const envelope = caseEnvelope(id);
      if (JSON.stringify(surfaces.native) !== JSON.stringify(neutral.native)) diffs.push(`${id} native-evidence`);
      if (withoutPayload(surfaces.topology) !== withoutPayload(neutral.topology)) diffs.push(`${id} observer`);
      const result = envelope.result;
      const output = isObject(result) && isObject(result.output) ? String(result.output.text) : "";
      if (surfaces.topology.snapshots[0]?.nativePayloadRef !== `rf-output:sha256:${sha256(output)}`) diffs.push(`${id} observer: payload not by digest`);
      for (const view of VIEWS) if (surfaces.inspector[view].join("\n") !== neutral.inspector[view].join("\n")) diffs.push(`${id} inspector ${view}`);
    }
    witnessed("A1", { pin: "A1", sequences: triggerSequences().map(sequence => sequence.join(" ")), findings: [...pass.findings], dependencies: rcDependencies(), verbatimCases: ROSTER.cases.length, baselineCases: oneBlock.length, baselineDiffs: diffs });
  });

  it("A2 the producer artifact: the measured bytes, the arms at charter:44, RC-RQ2 at :46, and outputs that agree with the module", () => {
    const owner = ownerRow();
    const { charter, adapter, installed, outputs, refusals } = ROSTER.producer;
    expect(gitBlobId(CHARTER_BYTES), "charter bytes").toBe(charter.blob);
    expect(gitBlobId(ADAPTER_BYTES), "adapter bytes").toBe(adapter.blob);
    expect(installed.adapterBlob, "the installed copy is the pinned module").toBe(adapter.blob);
    expect(owner.citations, "the bead's citation pins").toEqual([`${charter.armLine}@${ROSTER.producer.pin.slice(0, 12)}`, `${charter.gateLine}@${ROSTER.producer.pin.slice(0, 12)}`]);
    expect(ROSTER.armSentences.length, "one charter sentence per arm row").toBe(ROWS.length - 1);
    for (const sentence of ROSTER.armSentences) expect(charterLine(charter.armLine), "charter:44 holds the arm").toContain(sentence);
    expect(charterLine(charter.gateLine), "charter:46 names the gate").toContain(ROSTER.gatePhrase);
    const [gateId = "", ...gateWords] = ROSTER.gatePhrase.split(" ");
    expect(owner.title, "the title quotes the gate").toContain(`${gateId} '${gateWords.join(" ")}'`);
    expect(new Set(PRODUCER.verdicts.map(classOf)).size, "three verdicts, three classes").toBe(PRODUCER.verdicts.length);
    const produced = Object.entries(outputs);
    const records: Record<string, string> = {};
    for (const [id, output] of produced) {
      if (!isObject(output)) continue;
      const metadata = isObject(output.metadata) ? output.metadata : {};
      const record = metadata[PRODUCER.kind];
      if (isObject(record)) {
        const verdict = String(record.verdict);
        records[verdict] = id;
        expect(output.kind, `${id} kind`).toBe(PRODUCER.kind);
        expect(record.schema, `${id} schema`).toBe(PRODUCER.schema);
        const text = PRODUCER.texts[verdict] ?? "";
        const expected = classOf(verdict) === "fail" ? `${text} (${String(record.matched_count)} matching)` : text;
        expect(output.content, `${id} content`).toBe(expected);
      } else {
        expect(output.kind, `${id} kind`).toBe(PRODUCER.unavailableKind);
        expect(output.content, `${id} content`).toBe(PRODUCER.unavailableText);
        expect(Object.keys(metadata), `${id} carries no verdict record`).toEqual([]);
      }
    }
    expect(Object.keys(records).sort(), "one output per verdict").toEqual([...PRODUCER.verdicts].sort());
    const named = produced.flatMap(([, output]) => (isObject(output) && isObject(output.provenance) && typeof output.provenance.policy === "string" ? [output.provenance.policy] : []));
    const unnamed = PRODUCER.policies.filter(policy => !named.includes(policy));
    expect(unnamed.length, "one policy renders no block").toBe(1);
    expect(produced.filter(([, output]) => output === null).length, "the defer output is null").toBe(1);
    witnessed("A2", {
      pin: "A2", charterBlob: charter.blob, adapterBlob: adapter.blob, verdicts: [...PRODUCER.verdicts], classes: PRODUCER.verdicts.map(classOf),
      policies: [...PRODUCER.policies], kinds: [PRODUCER.kind, PRODUCER.unavailableKind], texts: PRODUCER_TEXTS.length, outputs: produced.map(([id]) => id).sort(),
      records, deferPolicy: unnamed, citations: owner.citations, refusals: Object.keys(refusals).sort(),
    });
  });

  it("A3 the falsifiers are armed: the surfaces are the envelope readers and the inspector, the cases cover the outputs, and each judge fires", { timeout: SLOW }, async () => {
    const pass = code();
    const inspectorModule = ROSTER.surfaces.inspector ?? "";
    expect([...pass.readers].sort(), "the envelope readers are the surfaces").toEqual(Object.entries(ROSTER.surfaces).filter(([id]) => id !== "inspector").map(([, path]) => path).sort());
    expect(lexemes(inspectorModule, readFileSync(join(REPO, inspectorModule), "utf8")).some(lexeme => lexeme.text === "layoutInspector"), "the inspector module draws the views").toBe(true);
    const evidence = Object.entries(ROSTER.producer.outputs).filter(([, output]) => output !== null).map(([id]) => id);
    const deferred = Object.entries(ROSTER.producer.outputs).filter(([, output]) => output === null).map(([id]) => id);
    expect([...ROSTER.cases].sort(), "the cases cover every output on both carriers").toEqual(["neutral", ...deferred, ...evidence.flatMap(id => [`${id}:text`, `${id}:row`])].sort());
    for (const id of ROSTER.cases) {
      const surfaces = await reading(id);
      expect(surfaces.detailsSelected, `${id} details view selects the RF node`).toBe(true);
      for (const surface of SURFACE_IDS()) expect(surfaceStrings(surfaces, surface).length, `${id} ${surface} shows strings`).toBeGreaterThan(0);
    }
    const unknownVerdict = PRODUCER.verdicts.find(verdict => classOf(verdict) === "unknown") ?? "";
    const passVerdict = PRODUCER.verdicts.find(verdict => classOf(verdict) === "pass") ?? "";
    const f1Plants = [unknownVerdict, PRODUCER.texts[unknownVerdict] ?? ""];
    const f2Plants = [passVerdict, PRODUCER.texts[passVerdict] ?? "", ...ROSTER.words.pass];
    const f3Case = "unknown-empty:row";
    const emitted = new Set(emittedBy(f3Case).flatMap(text => verdictReadings(text).map(found => found.evidence)));
    const f3Pool = [...PRODUCER.verdicts, ...PRODUCER_TEXTS, ...ROSTER.words.pass, ...ROSTER.words.fail];
    const f3Plants = f3Pool.filter(plant => !emitted.has(plant));
    const f3Quiet = f3Pool.filter(plant => emitted.has(plant));
    const fired = { F1: 0, F2: 0, F3: 0, quiet: 0 };
    for (const surface of SURFACE_IDS()) {
      const missing = surfaceStrings(await reading("unavailable:row"), surface);
      for (const plant of f1Plants) {
        expect(f1([...missing, `query: ${plant}`]).length, `F1 fires on ${surface}: ${plant}`).toBeGreaterThan(f1(missing).length);
        fired.F1 += 1;
      }
      const unknown = surfaceStrings(await reading("unknown-empty:row"), surface);
      for (const plant of f2Plants) {
        expect(f2([...unknown, `query: ${plant}`]).length, `F2 fires on ${surface}: ${plant}`).toBeGreaterThan(f2(unknown).length);
        fired.F2 += 1;
      }
      if (surface === "provider") continue;
      const consumed = surfaceStrings(await reading(f3Case), surface);
      for (const plant of f3Plants) {
        expect(f3([...consumed, `query: ${plant}`], emittedBy(f3Case)).length, `F3 fires on ${surface}: ${plant}`).toBeGreaterThan(0);
        fired.F3 += 1;
      }
      for (const plant of f3Quiet) {
        expect(f3([...consumed, `query: ${plant}`], emittedBy(f3Case)), `F3 lets ${surface} consume ${plant}`).toEqual([]);
        fired.quiet += 1;
      }
    }
    const deferTopology = (await reading("defer")).topology;
    const forced = JSON.parse(JSON.stringify(deferTopology)) as ReactiveFiberProjectionTopology;
    const first = forced.snapshots[0];
    if (first !== undefined) Object.assign(first, { coverage: "complete" });
    expect(zeroBlockPass(forced), "F2 fires on a zero-block render read complete").toEqual(["coverage complete"]);
    witnessed("A3", { pin: "A3", surfaces: SURFACE_IDS(), readers: [...pass.readers].sort(), cases: ROSTER.cases.length, fired, f3Plants, f3Quiet });
  });
});

describe(`B ${labelOf("B")}`, () => {
  it("B1 the explicit unavailable-block policy: no logical UNKNOWN on any surface, and its text, kind and policy carried verbatim", { timeout: SLOW }, async () => {
    const cases = ["unavailable:text", "unavailable:row"];
    const { judged: count, readings } = await judged(cases, SURFACE_IDS(), strings => f1(strings));
    const carried: string[] = [];
    for (const id of cases) {
      const provider = (await reading(id)).provider;
      const source = isObject(provider) && isObject(provider.source) ? provider.source : {};
      const result = isObject(source.result) ? source.result : {};
      const output = isObject(result.output) ? result.output : {};
      const row = Array.isArray(result.blocks) && isObject(result.blocks[0]) ? result.blocks[0] : {};
      if (output.text === `${PRODUCER.unavailableText}\n`) carried.push(`${id} text`);
      if (row.kind === PRODUCER.unavailableKind) carried.push(`${id} kind`);
      if (isObject(row.provenance) && typeof row.provenance.policy === "string" && PRODUCER.policies.includes(row.provenance.policy)) carried.push(`${id} policy`);
    }
    witnessed("B1", { pin: "B1", judged: count, readings, carried });
  });

  it("B2 the defer policy: no logical UNKNOWN on any surface, and the reader adapter holds Pi's own pending marker", { timeout: SLOW }, async () => {
    const { judged: count, readings } = await judged(["defer"], SURFACE_IDS(), strings => f1(strings));
    const snapshot = (await reading("defer")).topology.snapshots[0];
    const marker = (await reading("defer")).topology.diagnostics.filter(note => note.startsWith("inclusion:"));
    witnessed("B2", { pin: "B2", judged: count, readings, blocks: blockCount("defer"), coverage: snapshot?.coverage ?? null, tone: snapshot?.node.statusTone ?? null, marker });
  });
});

describe(`C ${labelOf("C")}`, () => {
  it("C1 the empty rendered list: no pass reading on any surface, and never complete or success", { timeout: SLOW }, async () => {
    const { judged: count, readings } = await judged(["defer"], SURFACE_IDS(), strings => f2(strings));
    const structural = zeroBlockPass((await reading("defer")).topology);
    witnessed("C1", { pin: "C1", judged: count, readings, structural, blocks: blockCount("defer") });
  });

  it("C2 an UNKNOWN view with an empty source list: no pass reading on any surface, the record carried verbatim", { timeout: SLOW }, async () => {
    const cases = ["unknown-empty:text", "unknown-empty:row"];
    const { judged: count, readings } = await judged(cases, SURFACE_IDS(), strings => f2(strings));
    const provider = (await reading("unknown-empty:row")).provider;
    const source = isObject(provider) && isObject(provider.source) ? provider.source : {};
    const result = isObject(source.result) ? source.result : {};
    const row = Array.isArray(result.blocks) && isObject(result.blocks[0]) ? result.blocks[0] : {};
    const metadata = isObject(row.metadata) ? row.metadata : {};
    const record = isObject(metadata[PRODUCER.kind]) ? metadata[PRODUCER.kind] : {};
    const carried: JsonObject = isObject(record) ? { verdictClass: classOf(String(record.verdict)), sources: Array.isArray(record.sources) ? record.sources.length : -1, complete: typeof record.complete === "boolean" ? record.complete : null } : {};
    const refusal = ROSTER.producer.refusals["true-incomplete"] ?? "";
    expect(refusal, "the producer refuses a TRUE without complete coverage").toContain(`${PRODUCER.verdicts.find(verdict => classOf(verdict) === "pass") ?? ""} verdict`);
    witnessed("C2", { pin: "C2", judged: count, readings, carried, refusal });
  });
});

describe(`D ${labelOf("D")}`, () => {
  it("D1 the four inspector views of every case show no verdict the producer did not emit", { timeout: SLOW }, async () => {
    const readings: string[] = [];
    let count = 0;
    for (const id of ROSTER.cases) {
      const surfaces = await reading(id);
      for (const view of VIEWS) {
        count += 1;
        readings.push(...f3(surfaces.inspector[view], emittedBy(id)).map(evidence => `${id} ${view}: ${evidence}`));
      }
    }
    witnessed("D1", { pin: "D1", judged: count, readings });
  });

  it("D2 the node evidence and the snapshot of every case compute no verdict: no domainStatus, only the envelope's own values", { timeout: SLOW }, async () => {
    const { judged: count, readings } = await judged(ROSTER.cases, ["native-evidence", "observer"], (strings, id) => f3(strings, emittedBy(id)));
    const keys = new Set<string>();
    const foreign: string[] = [];
    for (const id of ROSTER.cases) {
      const { native } = await reading(id);
      const envelope = caseEnvelope(id);
      const result = isObject(envelope.result) ? envelope.result : {};
      const provenance = isObject(result.provenance) ? result.provenance : {};
      for (const key of Object.keys(native)) keys.add(key);
      if (native.nativeId !== envelope.operation_id) foreign.push(`${id} nativeId`);
      if (native.sourceBasis !== result.bundle_revision_id) foreign.push(`${id} sourceBasis`);
      if (native.producerRelease !== provenance.cli_version) foreign.push(`${id} producerRelease`);
    }
    witnessed("D2", { pin: "D2", judged: count, readings, nativeKeys: [...keys].sort(), foreign });
  });
});

describe("residuals (each named family has a pinned quiet row)", () => {
  it("Q1 R-TONE-WORD: Pi's own lowercase 'unknown' marks a partial reading and is no verdict", { timeout: SLOW }, async () => {
    const defer = await reading("defer");
    expect(defer.topology.snapshots[0]?.node.statusTone, "the residual is live").toBe("unknown");
    expect(f1(["unknown", "stale/unknown is last-known state", ...surfaceStrings(defer, "observer"), ...surfaceStrings(defer, "inspector")])).toEqual([]);
  });
  it("Q2 R-RENDER-TONE: a clean render carrying an UNKNOWN block reads success as a render, and F2 reads no pass in it", { timeout: SLOW }, async () => {
    const unknown = await reading("unknown-empty:row");
    const snapshot = unknown.topology.snapshots[0];
    expect([snapshot?.coverage, snapshot?.node.statusTone], "the residual is live").toEqual(["complete", "success"]);
    expect(f2(surfaceStrings(unknown, "observer"))).toEqual([]);
  });
  it("Q3 R-CASE: a verdict re-spelled in another letter case is no token reading", () => {
    expect([...f2(["verdict: true", "True"]), ...f1(["Unknown", "status unknown"])]).toEqual([]);
  });
  it("Q4 R-SYNONYM: a pass or an unknown in other words is not read", () => {
    expect([...f2(["succeeded", "green", "all clear", "ok"]), ...f1(["indeterminate", "not yet known"])]).toEqual([]);
  });
  it("Q5 R-COMMENT: a comment naming the adapter is no trigger, while the same words in a literal are", () => {
    const sequences = triggerSequences();
    expect(triggerFindings("src/plant.ts", "// projects query evidence through unavailable_block\nexport const x = 1;\n", sequences)).toEqual([]);
    expect(triggerFindings("src/plant.ts", 'export const x = "query evidence";\n', sequences)).toEqual(["src/plant.ts:1 query evidence"]);
  });
  it("Q6 R-UNDRIVEN: the runtime's resultPreview helper is module-private, so the census drives the provider output it previews", () => {
    const runtime = readFileSync(join(REPO, "src/workflow/runtime.ts"), "utf8");
    expect(runtime, "the residual is live").toContain("const preview = ");
    const source = ts.createSourceFile("runtime.ts", runtime, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const exported = source.statements.filter(statement => ts.canHaveModifiers(statement) && (ts.getModifiers(statement) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword));
    const names = exported.flatMap(statement => (ts.isVariableStatement(statement) ? statement.declarationList.declarations.map(declaration => declaration.name.getText(source)) : ts.isFunctionDeclaration(statement) && statement.name ? [statement.name.text] : []));
    expect(names).not.toContain("preview");
  });
  it("Q7 R-OTHER-ROUTE: a generic reader of rendered rows that names no adapter sequence and no RC is no trigger", () => {
    expect(triggerFindings("src/plant.ts", "export const read = (rows: { content: string }[]) => rows.map(row => row.content);\n", triggerSequences())).toEqual([]);
  });
});

describe("residuals, the read set", () => {
  it("Q8 R-NON-MODULE: a file that is not a JS or TS module (a doc page, a Python or shell script, a config) is not read", { timeout: SLOW }, () => {
    expect(["docs/workbench/07-native-integrations.md", "qa/workbench/rc-bridge.py", "scripts/rc.sh", "forge.toml", "package.json"].filter(path => MODULE.test(path))).toEqual([]);
    expect(code().modules.filter(path => !MODULE.test(path)), "the code pass reads modules only").toEqual([]);
  });
});

describe("residuals, the spellings", () => {
  it("Q9 R-COMPOSED: a name assembled from a non-constant part is read with that part as a space, while constant parts fold", () => {
    const sequences = triggerSequences();
    expect(triggerFindings("src/plant.ts", 'const w = "evidence";\nexport const key = "query_" + w;\n', sequences), "a variable part").toEqual([]);
    expect(triggerFindings("src/plant.ts", 'export const key = ("query" + "_") + "evidence";\n', sequences), "a constant chain folds").toEqual(["src/plant.ts:1 query evidence"]);
    expect(triggerFindings("src/plant.ts", "export const key = (x: string) => `query_$" + "{x}_evidence`;\n", sequences), "a template folds").toEqual(["src/plant.ts:1 query evidence"]);
  });
  it("Q10 R-LOOKALIKE: a look-alike letter inside a word is not folded, while NFKC folds the fullwidth forms", () => {
    const sequences = triggerSequences();
    const cyrillic = `qu${String.fromCodePoint(0x0435)}ry_evidence`;
    const fullwidth = [...("query")].map(letter => String.fromCodePoint(letter.charCodeAt(0) + 0xfee0)).join("");
    expect(triggerFindings("src/plant.ts", `export const key = ${JSON.stringify(cyrillic)};\n`, sequences), "a look-alike letter").toEqual([]);
    expect(triggerFindings("src/plant.ts", `export const key = ${JSON.stringify(`${fullwidth}_evidence`)};\n`, sequences), "a fullwidth word").toEqual(["src/plant.ts:1 query evidence"]);
  });
});

describe("records", () => {
  it("every pin of the roster ran to its witness", () => {
    expect([...REACHED].sort()).toEqual(Object.keys(ROSTER.pins).sort());
  });
});
