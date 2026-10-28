/**
 * wb-tz2.11 (HX-ORIGINAL-GOALS-CLOSURE-R11), STANDING LEG ONLY: the HyperUnix custody-claims census. Pi's dispose/close custody
 * tests for the HX SDK prove the CALLS, never the termination, and no Pi test or qa script hand-rolls a real-process kill
 * falsifier for the HX child in place of the SDK-owned conformance.
 *
 * Acceptance row pinned (bead wb-tz2.11): "Standing: the custody tests stay green and claim only call-custody, never real-child
 * termination." Statement halves pinned: Pi cites the receipt "beside its own dispose/close custody tests — which prove the
 * calls, not the termination — and shall not hand-roll a real-process kill falsifier in place of the SDK-owned conformance."
 * Rationale (the dossier's UNDETERMINED row child-process-cleanup-after-abort): "Pi calls dispose-on-abort and close-in-finally
 * ... proven against mocks only (... close-once :65, abort-dispose :83, close after abort :88)". This file judges the CLAIMS; the
 * "stay green" half is judged by its run pin, test/workbench-hyperunix-custody-claims.census.ts (report mode: the three custody
 * cases and every case of this file collected once, passed and asserting in the gate's own test report), which row C9 holds to
 * this file.
 * ON-LANDING LEG NOT IN SCOPE: a docs/workbench row citing the HX SDK cancellation/child-process-cleanup conformance receipt
 * (artifact id + hx sha), and the census that the citation names it, wait for that receipt. Re-measured read-only at
 * HyperUnix-CLI origin/main 6d0369d0 (2026-10-28): requirements.jsonl:12 HXGC-OPS-002 reads status DESIGN, implementation_evidence
 * null, graduated false, and sdk/conformance holds only evidence/native-resource-bindings and resource-contract.json. The bead
 * stays open for that leg.
 *
 * VOCABULARY OF RECORD (termination claims, five rows): W1 the terminate family (HXGC-OPS-002 "terminate owned child-process
 * trees", 03-requirements.md:24, and its oracle "terminate owned process group", requirements.jsonl:12; the SDK transport's own
 * "the owned process tree is terminated"); W2 the signal names (C6 derives the ones the installed SDK transport and Pi's RF
 * provider send and holds them inside W2); W3 the kill verb (the SDK transport's kill closure and its process.kill / child.kill
 * calls, which C6 also derives); W4 the reap family (the SDK client's "drain-and-reap boundary"; Pi's RF case "reaps a child that
 * ignores SIGTERM"); W5 the process objects (HXGC-OPS-002's child-process trees and process group, its oracle's "subprocess").
 * MATCH RULE (termPattern): case-insensitive; a separator inside a term (a space, "-" or "_") matches any of the three; a hit
 * never touches a letter or digit on either side, so "SIGKILL" carries no "kill", "terminal" no term and "skill" none.
 *
 * ROWS. C1 CASES: the "HyperUnix SDK custody" suite of test/workbench-provider-lifecycle.test.ts registers exactly the three cases
 * frozen in CASES, in order, through a bare describe and bare it calls (no skip, only, todo, fails, each or condition member),
 * each with exactly its frozen ordered assertion signatures (the expect subject and its chain); CUSTODY maps the rationale's three
 * claims onto them (close-once on K1; abort-dispose, asserted before and after the read settles, and close after abort on K3).
 * C2 CALL CUSTODY ONLY: every assertion in that suite is a mock-call assertion (a toHaveBeenCalled* matcher, negated or not) on a
 * stand-in the case builds from vi.fn / vi.spyOn, or an outcome assertion (toMatchObject / toEqual / toStrictEqual, through
 * rejects / resolves or not) on the provider's own result; the suite makes no assert call. C3 STAND-INS ONLY: every case stubs
 * HyperUnix.open with a mocked return before its first provider call, so no case holds a real SDK client or a real child.
 * C4 NO TERMINATION CLAIM: the suite's title, its case titles, every comment inside it and every string or template literal part
 * inside it carry no vocabulary term. C5 PI DELEGATES: src/workbench/providers/hyperunix.ts imports no child_process, carries no
 * falsifier shape (C7's F1-F4) and names no signal; nativeHyperUnixFind disposes its client from its abort listener and awaits
 * client.close() in its finally block, removing the listener there - the two lifecycle calls the custody cases assert, and the
 * only ones CUSTODY may claim. C6 SDK-OWNED TERMINATION: the installed SDK transport (node_modules/@hyperunix/sdk/dist/transport/
 * cli.js, from the vendored tarball) kills the owned process GROUP (process.kill on a negated child pid) inside functions that
 * listen for abort, and every signal literal it or Pi's RF provider passes to a kill call is a W2 term and every kill call's name
 * a W3 term. C7 NO HAND-ROLLED KILL FALSIFIER: no test/ or qa/ source that drives HX (imports @hyperunix/sdk or the hyperunix
 * provider or observer module, or names hyperunix.find or HYPERUNIX_HX) carries a falsifier shape: F1 a kill call, F2 a pid read,
 * F3 a process-table probe (a /proc/ path, or ps / pgrep / pkill / kill / killall as a literal or a command head), F4 ESRCH; this
 * file is the one exclusion (it spells the detector). C8 DOCS: no docs/workbench clause (a line split at ";", "|", an em dash and
 * sentence ends) names the HX side together with a vocabulary term unless it names the upstream artifact HXGC-OPS-002, the
 * on-landing citation's form. C9 RUN PIN: the run pin's literals name the suite, every CASES title, this file's suite and every
 * case of this file.
 *
 * OUTSIDE ANCHORS (standing rule 16, CT5 / CT6): C1 derives the suite's cases and assertion signatures from the lifecycle file's
 * own AST and compares them with CASES both ways, and derives the lifecycle-call assertions CUSTODY must claim from it and from
 * the provider's AST (C5), so a row or a pin removed from every literal of this file still reds; C6 derives the signal names and
 * the kill verb from the SDK's and the RF provider's kill calls; the C4 calibration requires the RF termination titles (the
 * cases whose stand-in child ignores SIGTERM) to name every signal the RF provider sends, and closes VOCABULARY over that outside
 * corpus: every word an instrument independent of VOCABULARY (STEM_WORDS) finds in those titles and in the SDK transport's own
 * termination JSDoc (measured: process tree, reaps, SIGKILL, SIGTERM, terminate, terminated) must be a vocabulary term; C8
 * calibrates on the frozen TRACEABILITY.md provider-custody row.
 * CALIBRATION (each collector and matcher shown live on a text that must hit): C4's collector and vocabulary hit every RF case
 * whose stand-in child ignores SIGTERM, and its comment reader reads the RF suite's comments; C7's detector finds F1, F2 and F4 in
 * the SDK transport, F1 in the RF provider and every shape in a planted control; C8's reader finds an RF termination clause in the
 * frozen TRACEABILITY.md and HX clauses across the docs. Measured on this branch at base cd8927f: C1 3 cases (4, 1 and 5
 * assertions); C4 35 suite texts (4 titles, 31 literals, 0 comments), 0 hits; C5 0 shapes; C6 2 group kills, signals SIGTERM
 * and SIGKILL (the RF provider's the same); C7 29 judged files of 610 sources, 0 shapes; C8 75 docs files, 0 hits. The
 * floors sit below these, so an emptied collector reds and an additive change does not.
 * FROZEN SHAPE (standing rule 16): one row pins VOCABULARY (ids and terms), CASES (ids and pin counts), CUSTODY (claims, cases and
 * pins), the falsifier shapes, the process-table words, the exclusions and the near misses.
 * RESIDUALS (named, not closed): R1 a termination claim worded outside the vocabulary ("stops the child", "the process is gone")
 * or split across a literal concatenation is not matched; R2 a coordinated hollow of a vocabulary word that C6 does not derive
 * and the outside corpus does not use (terminates, terminating, termination, SIGINT, SIGHUP, kills, killed, killing, reap,
 * reaped, reaping, child process(es), process group(s), process trees, subprocess(es)) stays green, and so does a hollow that
 * also edits STEM_WORDS, the instrument itself; R3 a falsifier written without the four shapes (a timing deadline, a poll of an SDK counter, a
 * ps-like tool named through a variable) or in a file that neither imports the HX modules nor names hyperunix.find /
 * HYPERUNIX_HX is not seen; R4 C1 freezes each assertion's subject and chain, not its arguments; R5 C8 splits clauses lexically
 * and trusts an HXGC-OPS-002 citation (the on-landing census judges it); R6 a run-time skip, or an exit before the first
 * assertion, is the run pin's to see, never this file's.
 *
 * Display paths added: none. Test-only: spawns nothing, writes nothing, reads sources.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-hyperunix-custody-claims.test.ts";
const RUN_PIN = "test/workbench-hyperunix-custody-claims.census.ts";
const LIFECYCLE = "test/workbench-provider-lifecycle.test.ts";
const HX_SUITE = "HyperUnix SDK custody";
const RF_SUITE = "RF CLI process custody";
const PROVIDER = "src/workbench/providers/hyperunix.ts";
const RF_PROVIDER = "src/workbench/providers/reactivefiber.ts";
const SDK_TRANSPORT = "node_modules/@hyperunix/sdk/dist/transport/cli.js";
const DOCS = "docs/workbench";
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const UPSTREAM = "HXGC-OPS-002";
const SUITE = "wb-tz2.11 HyperUnix custody-claims census (HX-ORIGINAL-GOALS-CLOSURE-R11, standing leg)";
/** The walks parse a few dozen sources: a loaded gate host needs far more than vitest's 5000 ms default. */
const CENSUS_TIMEOUT = 120_000;

// ---- vocabulary -------------------------------------------------------------------------------------------------------

interface VocabularyRow {
  readonly id: string;
  readonly terms: readonly string[];
}
const VOCABULARY: readonly VocabularyRow[] = [
  { id: "W1", terms: ["terminate", "terminates", "terminated", "terminating", "termination"] },
  { id: "W2", terms: ["SIGTERM", "SIGKILL", "SIGINT", "SIGHUP"] },
  { id: "W3", terms: ["kill", "kills", "killed", "killing"] },
  { id: "W4", terms: ["reap", "reaps", "reaped", "reaping"] },
  {
    id: "W5",
    terms: ["child process", "child processes", "process group", "process groups", "process tree", "process trees", "subprocess", "subprocesses"],
  },
];
const TERMS: readonly string[] = VOCABULARY.flatMap(row => row.terms);
/** Letters only, joined by single separators: no term needs escaping inside a pattern. */
const TERM_SHAPE = /^[A-Za-z]+(?:[ _-][A-Za-z]+)*$/;

function termPattern(term: string): RegExp {
  return new RegExp(`(?<![\\p{L}\\p{N}])${term.split(/[ _-]/).join("[ _-]")}(?![\\p{L}\\p{N}])`, "iu");
}
const PATTERNS: ReadonlyArray<readonly [string, RegExp]> = TERMS.map(term => [term, termPattern(term)] as const);

/** The vocabulary terms a text carries, in VOCABULARY order. */
function termsIn(text: string): string[] {
  return PATTERNS.filter(([, pattern]) => pattern.test(text)).map(([term]) => term);
}
function termsOfRow(id: string): readonly string[] {
  return VOCABULARY.find(row => row.id === id)?.terms ?? [];
}

const FOLDS: ReadonlyArray<(part: string) => string> = [
  part => part.toLowerCase(),
  part => part.toUpperCase(),
  part => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`,
];
/** Spellings every term must be found in: three case folds times each separator, inside a text and at both of its edges. */
function plantedSpellings(term: string): string[] {
  const parts = term.split(/[ _-]/);
  const separators = parts.length > 1 ? [" ", "-", "_"] : [""];
  const spellings = [...new Set(FOLDS.flatMap(fold => separators.map(separator => parts.map(fold).join(separator))))];
  return spellings.flatMap(spelling => [`x ${spelling} y`, spelling, `${spelling}.`, `(${spelling})`]);
}
/** Near misses that must stay quiet: each embeds a term's letters without being that term. */
const NEAR_MISSES = [
  "skill",
  "skilled",
  "pkill",
  "killall",
  "terminal",
  "terminalReached",
  "indeterminate",
  "reapply",
  "reaper",
  "subprocessor",
  "processes",
  "childish",
] as const;

/**
 * An instrument independent of VOCABULARY, used only to read the outside corpus (C4 calibration): the terminat- / kill- / reap-
 * stems with any lowercase ending (a camelCase identifier such as terminateGraceMs is no word), SIG names and the process-object
 * phrases. Each word it finds there must be a vocabulary term, so a word that corpus uses cannot be dropped from VOCABULARY alone.
 */
const STEM_WORDS = new RegExp(
  [
    "(?<![\\p{L}\\p{N}])(?:[Tt]erminat|[Kk]ill|[Rr]eap)[a-z]*(?![\\p{L}\\p{N}])",
    "(?<![\\p{L}\\p{N}])SIG[A-Z]{3,}(?![\\p{L}\\p{N}])",
    "(?<![\\p{L}\\p{N}])(?:[Cc]hild[ _-]process(?:es)?|[Pp]rocess[ _-](?:tree|group)s?|[Ss]ubprocess(?:es)?)(?![\\p{L}\\p{N}])",
  ].join("|"),
  "gu",
);
const normalized = (word: string): string => word.toLowerCase().replace(/[ _-]/g, " ");
function stemWordsIn(text: string): string[] {
  return [...text.matchAll(STEM_WORDS)].map(match => normalized(match[0]));
}

// ---- source reading ---------------------------------------------------------------------------------------------------

/** Each source is read and parsed once per run: the walks below revisit the same files, and a loaded gate host is slow. */
const TEXTS = new Map<string, string>();
const PARSED = new Map<string, ts.SourceFile>();
function read(path: string): string {
  const cached = TEXTS.get(path);
  if (cached !== undefined) return cached;
  const text = readFileSync(join(ROOT, path), "utf8");
  TEXTS.set(path, text);
  return text;
}
function parse(path: string): ts.SourceFile {
  const cached = PARSED.get(path);
  if (cached !== undefined) return cached;
  const source = ts.createSourceFile(path, read(path), ts.ScriptTarget.Latest, true, /\.[cm]?js$/.test(path) ? ts.ScriptKind.JS : ts.ScriptKind.TS);
  PARSED.set(path, source);
  return source;
}
/** The node and every node under it, in source order. */
function descendants(root: ts.Node): ts.Node[] {
  const out: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    out.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return out;
}
function lineOf(source: ts.SourceFile, node: ts.Node): number {
  return source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
}
/** The callee a call spells, whitespace and type arguments left out (vi.spyOn<A, "b">(...) reads vi.spyOn). */
function calleeText(call: ts.CallExpression): string {
  return call.expression.getText().replace(/\s+/g, "");
}
function callsIn(scope: ts.Node): ts.CallExpression[] {
  return descendants(scope).filter(ts.isCallExpression);
}
/** Every string literal, no-substitution template and template head / middle / tail text under a node. */
function literalTexts(scope: ts.Node): string[] {
  return descendants(scope).flatMap(node =>
    ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) ? [node.text] : [],
  );
}
/** Every comment inside a node's own span (leading and trailing trivia of each token under it), in source order. */
function commentsIn(source: ts.SourceFile, root: ts.Node): string[] {
  const start = root.getStart(source);
  const end = root.getEnd();
  const seen = new Map<number, string>();
  const visit = (node: ts.Node): void => {
    const ranges = [...(ts.getLeadingCommentRanges(source.text, node.getFullStart()) ?? []), ...(ts.getTrailingCommentRanges(source.text, node.getEnd()) ?? [])];
    for (const range of ranges) if (range.pos >= start && range.end <= end) seen.set(range.pos, source.text.slice(range.pos, range.end));
    for (const child of node.getChildren(source)) visit(child);
  };
  visit(root);
  return [...seen.entries()].sort(([a], [b]) => a - b).map(([, text]) => text);
}

// ---- vitest registrations and assertions ------------------------------------------------------------------------------

const REGISTRARS = new Set(["describe", "suite", "it", "test"]);
interface Registration {
  readonly call: ts.CallExpression;
  readonly root: string;
  /** The members chained between the root and the call (skip, only, todo, fails, each, skipIf ...); empty for a bare call. */
  readonly members: readonly string[];
  readonly title: string;
}
function registrationOf(call: ts.CallExpression): Registration | undefined {
  const members: string[] = [];
  let callee: ts.Expression = call.expression;
  while (ts.isPropertyAccessExpression(callee) || ts.isCallExpression(callee)) {
    if (ts.isPropertyAccessExpression(callee)) members.unshift(callee.name.text);
    callee = callee.expression;
  }
  const head = call.arguments[0];
  if (!ts.isIdentifier(callee) || !REGISTRARS.has(callee.text) || head === undefined || !ts.isStringLiteralLike(head)) return undefined;
  return { call, root: callee.text, members, title: head.text };
}
function registrationsIn(scope: ts.Node): Registration[] {
  return callsIn(scope).flatMap(call => {
    const found = registrationOf(call);
    return found === undefined ? [] : [found];
  });
}
function suitesNamed(scope: ts.Node, title: string): Registration[] {
  return registrationsIn(scope).filter(entry => (entry.root === "describe" || entry.root === "suite") && entry.title === title);
}
function casesOf(suite: Registration): Registration[] {
  return registrationsIn(suite.call).filter(entry => entry.root === "it" || entry.root === "test");
}

const CHAIN_FLAGS = new Set(["not", "rejects", "resolves"]);
interface Assertion {
  /** The expect subject (an identifier or property path as spelled, a call as its callee plus "()") and the chain after it. */
  readonly signature: string;
  readonly subject: ts.Expression | undefined;
  readonly matcher: string;
  readonly flags: readonly string[];
  readonly line: number;
}
function subjectText(node: ts.Expression | undefined): string {
  if (node === undefined) return "<none>";
  if (ts.isCallExpression(node)) return `${subjectText(node.expression)}()`;
  if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node)) return node.getText().replace(/\s+/g, "");
  return `<${ts.SyntaxKind[node.kind]}>`;
}
/** Every expect(...) / expect.<member>(...) chain under a node, in source order. */
function assertionsIn(source: ts.SourceFile, scope: ts.Node): Assertion[] {
  return callsIn(scope).flatMap(call => {
    if (!ts.isPropertyAccessExpression(call.expression)) return [];
    const chain: string[] = [];
    let link: ts.Expression = call.expression;
    while (ts.isPropertyAccessExpression(link)) {
      chain.unshift(link.name.text);
      link = link.expression;
    }
    if (!ts.isCallExpression(link)) return [];
    const head = link.expression;
    const root = ts.isIdentifier(head)
      ? head.text
      : ts.isPropertyAccessExpression(head) && ts.isIdentifier(head.expression)
        ? `${head.expression.text}.${head.name.text}`
        : "";
    if (root !== "expect" && !root.startsWith("expect.")) return [];
    const prefix = root === "expect" ? "" : `${root.slice("expect.".length)}:`;
    const subject = link.arguments[0];
    return [{ signature: `${prefix}${subjectText(subject)}.${chain.join(".")}`, subject, matcher: chain[chain.length - 1] ?? "<none>", flags: chain.slice(0, -1), line: lineOf(source, call) }];
  });
}
/** Calls through vitest's or node's assert (assert(...), assert.equal(...)). */
function assertCallsIn(scope: ts.Node): ts.CallExpression[] {
  return callsIn(scope).filter(call => {
    let link: ts.Expression = call.expression;
    while (ts.isPropertyAccessExpression(link)) link = link.expression;
    return ts.isIdentifier(link) && link.text === "assert";
  });
}
/** The signature list with each signature numbered by its occurrence ("x.toHaveBeenCalledOnce#2"). */
function numbered(signatures: readonly string[]): string[] {
  const seen = new Map<string, number>();
  return signatures.map(signature => {
    const count = (seen.get(signature) ?? 0) + 1;
    seen.set(signature, count);
    return `${signature}#${count}`;
  });
}

// ---- the judged custody suite -----------------------------------------------------------------------------------------

interface CaseRow {
  readonly id: string;
  readonly title: string;
  /** The case's assertion signatures in source order. */
  readonly pins: readonly string[];
}
const CASES: readonly CaseRow[] = [
  {
    id: "K1",
    title: "delegates binary selection to SDK PATH discovery and enforces read grants",
    pins: ["registry.invoke().rejects.toMatchObject", "open.not.toHaveBeenCalled", "open.toHaveBeenCalledWith", "client.close.toHaveBeenCalledOnce"],
  },
  { id: "K2", title: "preserves incomplete native coverage instead of inventing absence", pins: ["result.toMatchObject"] },
  {
    id: "K3",
    title: "closes an SDK client when abort fires during asynchronous open, before find",
    pins: [
      "client.dispose.toHaveBeenCalledOnce",
      "result.rejects.toMatchObject",
      "client.find.not.toHaveBeenCalled",
      "client.dispose.toHaveBeenCalledOnce",
      "client.close.toHaveBeenCalledOnce",
    ],
  },
];
interface CustodyClaim {
  /** The rationale's own name for the claim. */
  readonly claim: string;
  readonly caseId: string;
  /** Numbered signatures of the case (numbered()) that prove the claim. */
  readonly pins: readonly string[];
}
const CUSTODY: readonly CustodyClaim[] = [
  { claim: "close-once", caseId: "K1", pins: ["client.close.toHaveBeenCalledOnce#1"] },
  { claim: "abort-dispose", caseId: "K3", pins: ["client.dispose.toHaveBeenCalledOnce#1", "client.dispose.toHaveBeenCalledOnce#2"] },
  { claim: "close after abort", caseId: "K3", pins: ["client.close.toHaveBeenCalledOnce#1"] },
];

const CALL_MATCHERS = new Set(["toHaveBeenCalled", "toHaveBeenCalledOnce", "toHaveBeenCalledTimes", "toHaveBeenCalledWith", "toHaveBeenLastCalledWith", "toHaveBeenNthCalledWith"]);
const OUTCOME_MATCHERS = new Set(["toMatchObject", "toEqual", "toStrictEqual"]);
const STAND_IN_FACTORIES = new Set(["vi.fn", "vi.spyOn"]);
const MOCKED_RETURNS = new Set(["mockReturnValue", "mockReturnValueOnce", "mockResolvedValue", "mockResolvedValueOnce", "mockImplementation", "mockImplementationOnce"]);
/** The provider entry points a custody case drives, and the calls whose value is the provider's own result. */
const PROVIDER_ENTRIES = new Set(["nativeHyperUnixFind", "registerNativeHyperUnixFind", "registerHyperUnixFind"]);
const PROVIDER_RESULTS = new Set(["nativeHyperUnixFind", "registry.invoke"]);

function bindingsIn(scope: ts.Node): Map<string, ts.Expression> {
  const out = new Map<string, ts.Expression>();
  for (const node of descendants(scope)) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) out.set(node.name.text, node.initializer);
  }
  return out;
}
function unwrapped(expression: ts.Expression): ts.Expression {
  return ts.isAwaitExpression(expression) || ts.isParenthesizedExpression(expression) ? unwrapped(expression.expression) : expression;
}
function rootIdentifier(expression: ts.Expression): string | undefined {
  let link: ts.Expression = expression;
  while (ts.isPropertyAccessExpression(link) || ts.isElementAccessExpression(link) || ts.isCallExpression(link)) link = link.expression;
  return ts.isIdentifier(link) ? link.text : undefined;
}
/** The bindings of a case built from vi.fn / vi.spyOn: its stand-ins. */
function standInsOf(bindings: ReadonlyMap<string, ts.Expression>): Set<string> {
  return new Set([...bindings].filter(([, init]) => callsIn(init).some(call => STAND_IN_FACTORIES.has(calleeText(call)))).map(([name]) => name));
}
function isProviderResult(expression: ts.Expression, bindings: ReadonlyMap<string, ts.Expression>): boolean {
  const inner = unwrapped(expression);
  if (ts.isCallExpression(inner)) return PROVIDER_RESULTS.has(calleeText(inner));
  if (!ts.isIdentifier(inner)) return false;
  const init = bindings.get(inner.text);
  return init !== undefined && ts.isCallExpression(unwrapped(init)) && isProviderResult(init, bindings);
}
/** Why an assertion is not call custody, or undefined when it is. */
function custodyViolation(assertion: Assertion, standIns: ReadonlySet<string>, bindings: ReadonlyMap<string, ts.Expression>): string | undefined {
  if (CALL_MATCHERS.has(assertion.matcher)) {
    if (assertion.flags.some(flag => flag !== "not")) return `${assertion.signature}: a call matcher behind ${assertion.flags.join(".")}`;
    const root = assertion.subject === undefined ? undefined : rootIdentifier(assertion.subject);
    return root !== undefined && standIns.has(root) ? undefined : `${assertion.signature}: a call assertion on ${root ?? "no binding"}, which no vi.fn / vi.spyOn builds`;
  }
  if (OUTCOME_MATCHERS.has(assertion.matcher)) {
    if (assertion.flags.some(flag => !CHAIN_FLAGS.has(flag))) return `${assertion.signature}: an outcome matcher behind ${assertion.flags.join(".")}`;
    return assertion.subject !== undefined && isProviderResult(assertion.subject, bindings) ? undefined : `${assertion.signature}: an outcome assertion on something other than the provider's own result`;
  }
  return `${assertion.signature}: matcher ${assertion.matcher} is neither a mock-call nor an outcome assertion`;
}
/** The HyperUnix.open stubs with a mocked return: vi.spyOn(HyperUnix, "open").mockReturnValue(...) and its kin. */
function openStubsIn(scope: ts.Node): ts.CallExpression[] {
  return callsIn(scope).filter(call => {
    if (!ts.isPropertyAccessExpression(call.expression) || !MOCKED_RETURNS.has(call.expression.name.text)) return false;
    const spy = call.expression.expression;
    if (!ts.isCallExpression(spy) || calleeText(spy) !== "vi.spyOn") return false;
    const [target, method] = spy.arguments;
    return target !== undefined && ts.isIdentifier(target) && target.text === "HyperUnix" && method !== undefined && ts.isStringLiteralLike(method) && method.text === "open";
  });
}

// ---- falsifier shapes -------------------------------------------------------------------------------------------------

interface ShapeHit {
  readonly shape: string;
  readonly line: number;
}
const SHAPES = ["F1", "F2", "F3", "F4"] as const;
/** Process-table tools: as a whole literal or as a command head, a probe of whether a process still runs. */
const PROCESS_TABLE = ["ps", "pgrep", "pkill", "kill", "killall"] as const;
const PROCESS_TABLE_SET: ReadonlySet<string> = new Set(PROCESS_TABLE);

function isKillCall(call: ts.CallExpression): boolean {
  const callee = call.expression;
  return (ts.isIdentifier(callee) && callee.text === "kill") || (ts.isPropertyAccessExpression(callee) && callee.name.text === "kill");
}
/** F1 a kill call (kill(...), process.kill(...), child.kill(...)); F2 a pid read; F3 a process-table probe; F4 ESRCH. */
function falsifierShapes(source: ts.SourceFile): ShapeHit[] {
  return descendants(source).flatMap((node): ShapeHit[] => {
    const line = (): number => lineOf(source, node);
    if (ts.isCallExpression(node) && isKillCall(node)) return [{ shape: "F1", line: line() }];
    if (ts.isPropertyAccessExpression(node) && node.name.text === "pid") return [{ shape: "F2", line: line() }];
    if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression) && node.argumentExpression.text === "pid") return [{ shape: "F2", line: line() }];
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node)) {
      const text = node.text.trim();
      const head = text.split(/\s+/)[0] ?? "";
      if (node.text.includes("/proc/") || PROCESS_TABLE_SET.has(text) || (text !== head && PROCESS_TABLE_SET.has(head))) return [{ shape: "F3", line: line() }];
      if (node.text === "ESRCH") return [{ shape: "F4", line: line() }];
    }
    if (ts.isIdentifier(node) && node.text === "ESRCH") return [{ shape: "F4", line: line() }];
    return [];
  });
}
function shapeCounts(hits: readonly ShapeHit[]): Record<string, number> {
  return Object.fromEntries(SHAPES.map(shape => [shape, hits.filter(hit => hit.shape === shape).length]));
}

/** The files C7 never judges, each with its reason. */
const EXCLUDED = [SELF] as const;
const HX_MODULE = (specifier: string): boolean =>
  specifier === "@hyperunix/sdk" || specifier.startsWith("@hyperunix/sdk/") || /\/providers\/hyperunix(?:\.[cm]?[jt]s)?$/.test(specifier) || /\/hyperunix-observer(?:\.[cm]?[jt]s)?$/.test(specifier);
/** Text every HX driver carries (a superset of hxDrivers' reasons): only sources holding one are parsed. */
const DRIVER_TOKENS = ["@hyperunix/sdk", "providers/hyperunix", "hyperunix-observer", "hyperunix.find", "HYPERUNIX_HX"] as const;
/** How a source drives HX: an import or require of an HX module, the hyperunix.find capability id, or the HYPERUNIX_HX override. */
function hxDrivers(source: ts.SourceFile): string[] {
  const reasons = new Set<string>();
  for (const node of descendants(source)) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier) && HX_MODULE(node.moduleSpecifier.text)) reasons.add("import");
    if (ts.isCallExpression(node)) {
      const [first] = node.arguments;
      const dynamic = node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require");
      if (dynamic && first !== undefined && ts.isStringLiteralLike(first) && HX_MODULE(first.text)) reasons.add("import");
    }
    if (ts.isStringLiteralLike(node) && node.text === "hyperunix.find") reasons.add("capability");
    if ((ts.isStringLiteralLike(node) || ts.isIdentifier(node)) && node.text === "HYPERUNIX_HX") reasons.add("override");
  }
  return [...reasons].sort();
}
/** Every .ts / .mts / .cts / .js / .mjs / .cjs source under a repository directory, node_modules skipped, sorted. */
function sourcesUnder(directory: string): string[] {
  const out: string[] = [];
  const walk = (relativeDirectory: string): void => {
    for (const name of readdirSync(join(ROOT, relativeDirectory)).sort()) {
      if (name === "node_modules") continue;
      const path = `${relativeDirectory}/${name}`;
      if (statSync(join(ROOT, path)).isDirectory()) walk(path);
      else if (/\.[cm]?[jt]s$/.test(name)) out.push(path);
    }
  };
  walk(directory);
  return out;
}
function docsUnder(directory: string): string[] {
  const out: string[] = [];
  const walk = (relativeDirectory: string): void => {
    for (const name of readdirSync(join(ROOT, relativeDirectory)).sort()) {
      const path = `${relativeDirectory}/${name}`;
      if (statSync(join(ROOT, path)).isDirectory()) walk(path);
      else if (name.endsWith(".md")) out.push(path);
    }
  };
  walk(directory);
  return out;
}

// ---- docs clauses -----------------------------------------------------------------------------------------------------

const HX_SIDE = /(?<![\p{L}\p{N}])(?:hyperunix|hx)(?![\p{L}\p{N}])/iu;
const RF_SIDE = /(?<![\p{L}\p{N}])(?:rf|reactivefiber)(?![\p{L}\p{N}])/iu;
const CLAUSE_BREAK = /;|\||\u2014|(?<=[.!?])\s+(?=[A-Z`*(])/u;
interface Clause {
  readonly file: string;
  readonly line: number;
  readonly text: string;
}
let CLAUSES: Clause[] | undefined;
function docsClauses(): Clause[] {
  CLAUSES ??= docsUnder(DOCS).flatMap(file =>
    read(file)
      .split("\n")
      .flatMap((line, index) => line.split(CLAUSE_BREAK).map(text => ({ file, line: index + 1, text: text.trim() }))),
  );
  return CLAUSES;
}

// ---- provider and SDK structure ---------------------------------------------------------------------------------------

function functionNamed(source: ts.SourceFile, name: string): ts.FunctionDeclaration | undefined {
  return descendants(source).find((node): node is ts.FunctionDeclaration => ts.isFunctionDeclaration(node) && node.name?.text === name);
}
function stringArgument(call: ts.CallExpression, index: number): string | undefined {
  const argument = call.arguments[index];
  return argument !== undefined && ts.isStringLiteralLike(argument) ? argument.text : undefined;
}
/** The lifecycle calls (client.<method>) nativeHyperUnixFind makes from its abort listener and awaits in its finally block. */
interface ProviderLifecycle {
  readonly listener: string | undefined;
  readonly onAbort: readonly string[];
  readonly inFinally: readonly string[];
  readonly removesListener: boolean;
}
function providerLifecycle(source: ts.SourceFile): ProviderLifecycle {
  const fn = functionNamed(source, "nativeHyperUnixFind");
  if (fn === undefined) return { listener: undefined, onAbort: [], inFinally: [], removesListener: false };
  const bindings = bindingsIn(fn);
  const added = callsIn(fn).find(call => calleeText(call).endsWith(".addEventListener") && stringArgument(call, 0) === "abort");
  const listenerArgument = added?.arguments[1];
  const listener = listenerArgument === undefined ? undefined : listenerArgument.getText();
  const listenerBody = listenerArgument === undefined ? undefined : ts.isIdentifier(listenerArgument) ? bindings.get(listenerArgument.text) : listenerArgument;
  const clientCalls = (scope: ts.Node | undefined): string[] =>
    scope === undefined ? [] : callsIn(scope).flatMap(call => (calleeText(call).startsWith("client.") ? [calleeText(call).slice("client.".length)] : []));
  const finallyBlocks = descendants(fn).flatMap(node => (ts.isTryStatement(node) && node.finallyBlock !== undefined ? [node.finallyBlock] : []));
  const awaited = finallyBlocks.flatMap(block =>
    descendants(block).flatMap(node => (ts.isAwaitExpression(node) && ts.isCallExpression(node.expression) && calleeText(node.expression).startsWith("client.") ? [calleeText(node.expression).slice("client.".length)] : [])),
  );
  const removesListener = finallyBlocks.some(block =>
    callsIn(block).some(call => calleeText(call).endsWith(".removeEventListener") && stringArgument(call, 0) === "abort" && call.arguments[1]?.getText() === listener),
  );
  return { listener, onAbort: clientCalls(listenerBody), inFinally: awaited, removesListener };
}
function childProcessImports(source: ts.SourceFile): string[] {
  return descendants(source).flatMap(node =>
    (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier) && /^(?:node:)?child_process$/.test(node.moduleSpecifier.text)
      ? [node.moduleSpecifier.text]
      : [],
  );
}
/** Every signal name spelled as a literal (SIGTERM, SIGKILL ...). */
function signalLiterals(source: ts.SourceFile): string[] {
  return descendants(source).flatMap(node => (ts.isStringLiteralLike(node) && /^SIG[A-Z]+$/.test(node.text) ? [node.text] : []));
}
/** The signal literals passed to kill calls, and the names those calls go through. */
function killedWith(source: ts.SourceFile): { readonly signals: string[]; readonly names: string[] } {
  const kills = callsIn(source).filter(isKillCall);
  const signals = [...new Set(kills.flatMap(call => call.arguments.flatMap(argument => (ts.isStringLiteralLike(argument) ? [argument.text] : []))))].sort();
  const names = [...new Set(kills.map(call => (ts.isPropertyAccessExpression(call.expression) ? call.expression.name.text : call.expression.getText())))].sort();
  return { signals, names };
}
/** process.kill(-<x>.pid, ...): a kill of the owned process group. */
function groupKills(source: ts.SourceFile): ts.CallExpression[] {
  return callsIn(source).filter(call => {
    const [target] = call.arguments;
    return (
      calleeText(call) === "process.kill" &&
      target !== undefined &&
      ts.isPrefixUnaryExpression(target) &&
      target.operator === ts.SyntaxKind.MinusToken &&
      ts.isPropertyAccessExpression(target.operand) &&
      target.operand.name.text === "pid"
    );
  });
}
function enclosingFunction(node: ts.Node): ts.FunctionDeclaration | undefined {
  let link: ts.Node | undefined = node.parent;
  while (link !== undefined && !ts.isFunctionDeclaration(link)) link = link.parent;
  return link;
}
function leadingDoc(source: ts.SourceFile, node: ts.Node): string | undefined {
  const ranges = ts.getLeadingCommentRanges(source.text, node.getFullStart()) ?? [];
  const docs = ranges.map(range => source.text.slice(range.pos, range.end)).filter(text => text.startsWith("/**"));
  return docs[docs.length - 1];
}

// ---- the census -------------------------------------------------------------------------------------------------------

describe("wb-tz2.11 HyperUnix custody-claims census (HX-ORIGINAL-GOALS-CLOSURE-R11, standing leg)", () => {
  it("frozen shape: the vocabulary, the case table, the custody map, the falsifier shapes, the exclusions and the near misses are exactly the frozen literals", { timeout: CENSUS_TIMEOUT }, () => {
    expect({
      shaped: TERMS.every(term => TERM_SHAPE.test(term)),
      distinct: new Set(TERMS.map(term => term.toLowerCase())).size === TERMS.length,
      vocabulary: VOCABULARY.map(row => `${row.id}:${row.terms.join("|")}`),
      cases: CASES.map(row => `${row.id}:${row.pins.length}`),
      custody: CUSTODY.map(row => `${row.claim}:${row.caseId}:${row.pins.join("+")}`),
      shapes: [...SHAPES],
      processTable: [...PROCESS_TABLE],
      excluded: [...EXCLUDED],
      nearMisses: NEAR_MISSES.length,
    }).toStrictEqual({
      shaped: true,
      distinct: true,
      vocabulary: [
        "W1:terminate|terminates|terminated|terminating|termination",
        "W2:SIGTERM|SIGKILL|SIGINT|SIGHUP",
        "W3:kill|kills|killed|killing",
        "W4:reap|reaps|reaped|reaping",
        "W5:child process|child processes|process group|process groups|process tree|process trees|subprocess|subprocesses",
      ],
      cases: ["K1:4", "K2:1", "K3:5"],
      custody: [
        "close-once:K1:client.close.toHaveBeenCalledOnce#1",
        "abort-dispose:K3:client.dispose.toHaveBeenCalledOnce#1+client.dispose.toHaveBeenCalledOnce#2",
        "close after abort:K3:client.close.toHaveBeenCalledOnce#1",
      ],
      shapes: ["F1", "F2", "F3", "F4"],
      processTable: ["ps", "pgrep", "pkill", "kill", "killall"],
      excluded: [SELF],
      nearMisses: 12,
    });
  });

  it("matcher: every vocabulary term is found in each case fold and separator spelling, and every near miss stays quiet", { timeout: CENSUS_TIMEOUT }, () => {
    const missed = TERMS.flatMap(term => plantedSpellings(term).filter(text => !termsIn(text).includes(term)).map(text => `${term} <- ${JSON.stringify(text)}`));
    const quietBroken = NEAR_MISSES.filter(text => termsIn(text).length > 0);
    expect({ planted: TERMS.reduce((sum, term) => sum + plantedSpellings(term).length, 0) > TERMS.length * 4, missed, quietBroken }).toStrictEqual({ planted: true, missed: [], quietBroken: [] });
  });

  it("C1 cases: the HyperUnix SDK custody suite holds exactly the three frozen cases, in order, with their ordered assertion signatures and no skip, only, todo or fails member", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(LIFECYCLE);
    const suites = suitesNamed(source, HX_SUITE);
    const cases = suites[0] === undefined ? [] : casesOf(suites[0]);
    expect({
      suites: suites.map(suite => `${suite.root}${suite.members.map(member => `.${member}`).join("")}`),
      cases: cases.map(entry => ({ title: entry.title, call: `${entry.root}${entry.members.map(member => `.${member}`).join("")}`, pins: assertionsIn(source, entry.call).map(assertion => assertion.signature) })),
    }).toStrictEqual({
      suites: ["describe"],
      cases: CASES.map(row => ({ title: row.title, call: "it", pins: [...row.pins] })),
    });
  });

  it("C1 custody map: every lifecycle-call assertion of the suite is claimed by exactly one CUSTODY pin, and every claimed lifecycle call is one the provider makes", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(LIFECYCLE);
    const lifecycle = providerLifecycle(parse(PROVIDER));
    const calls = new Set([...lifecycle.onAbort, ...lifecycle.inFinally]);
    const suite = suitesNamed(source, HX_SUITE)[0];
    const derived = (suite === undefined ? [] : casesOf(suite)).flatMap(entry => {
      const caseId = CASES.find(row => row.title === entry.title)?.id ?? `<unframed case ${entry.title}>`;
      const bindings = bindingsIn(entry.call);
      const standIns = standInsOf(bindings);
      const assertions = assertionsIn(source, entry.call);
      const labels = numbered(assertions.map(assertion => assertion.signature));
      return assertions.flatMap((assertion, index) => {
        const subject = assertion.subject;
        const lifecycleCall = subject !== undefined && ts.isPropertyAccessExpression(subject) && calls.has(subject.name.text) && standIns.has(rootIdentifier(subject) ?? "") && CALL_MATCHERS.has(assertion.matcher);
        return lifecycleCall ? [`${caseId}:${labels[index]}`] : [];
      });
    });
    const claimed = CUSTODY.flatMap(row => row.pins.map(pin => `${row.caseId}:${pin}`));
    const claimedCalls = [...new Set(CUSTODY.flatMap(row => row.pins.map(pin => pin.split(".")[1] ?? "")))].sort();
    expect({ derived: [...derived].sort(), claimedCalls, providerCalls: [...calls].sort() }).toStrictEqual({ derived: [...claimed].sort(), claimedCalls: [...calls].sort(), providerCalls: ["close", "dispose"] });
  });

  it("C2 call custody only: every assertion in the suite is a mock-call assertion on a stand-in or an outcome assertion on the provider's own result", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(LIFECYCLE);
    const suite = suitesNamed(source, HX_SUITE)[0];
    const cases = suite === undefined ? [] : casesOf(suite);
    const violations = cases.flatMap(entry => {
      const bindings = bindingsIn(entry.call);
      const standIns = standInsOf(bindings);
      return assertionsIn(source, entry.call).flatMap(assertion => {
        const why = custodyViolation(assertion, standIns, bindings);
        return why === undefined ? [] : [`${entry.title} :${assertion.line}: ${why}`];
      });
    });
    const asserts = suite === undefined ? [] : assertCallsIn(suite.call).map(call => `:${lineOf(source, call)}`);
    const judged = cases.reduce((sum, entry) => sum + assertionsIn(source, entry.call).length, 0);
    expect({ cases: cases.length, judged: judged >= 6, violations, asserts }).toStrictEqual({ cases: 3, judged: true, violations: [], asserts: [] });
  });

  it("C3 stand-in clients only: every case stubs HyperUnix.open with a mocked return before it drives the provider", { timeout: CENSUS_TIMEOUT }, () => {
    const suite = suitesNamed(parse(LIFECYCLE), HX_SUITE)[0];
    const cases = suite === undefined ? [] : casesOf(suite);
    const rows = cases.map(entry => {
      const stubs = openStubsIn(entry.call).map(call => call.getStart());
      const drives = callsIn(entry.call).filter(call => ts.isIdentifier(call.expression) && PROVIDER_ENTRIES.has(call.expression.text)).map(call => call.getStart());
      return { title: entry.title, stubbed: stubs.length > 0, drives: drives.length > 0, stubFirst: stubs.length > 0 && drives.length > 0 && Math.min(...stubs) < Math.min(...drives) };
    });
    expect(rows).toStrictEqual(CASES.map(row => ({ title: row.title, stubbed: true, drives: true, stubFirst: true })));
  });

  it("C4 no termination claim: the suite's title, case titles, comments and literals carry no termination term", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(LIFECYCLE);
    const suite = suitesNamed(source, HX_SUITE)[0];
    const texts = suite === undefined ? [] : [suite.title, ...casesOf(suite).map(entry => entry.title), ...commentsIn(source, suite.call), ...literalTexts(suite.call)];
    const hits = texts.flatMap(text => {
      const terms = termsIn(text);
      return terms.length > 0 ? [`${JSON.stringify(text)} carries ${terms.join(", ")}`] : [];
    });
    expect({ floor: texts.length >= 30, anchored: [HX_SUITE, ...CASES.map(row => row.title)].every(title => texts.includes(title)), hits }).toStrictEqual({ floor: true, anchored: true, hits: [] });
  });

  it("C4 calibration: the same collector and vocabulary find the termination claim of every RF case whose stand-in child ignores SIGTERM, naming every signal the RF provider sends, and every termination word those titles and the SDK's own termination prose use is a vocabulary term", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(LIFECYCLE);
    const rfSuite = suitesNamed(source, RF_SUITE)[0];
    const noncooperative = (rfSuite === undefined ? [] : casesOf(rfSuite)).filter(entry => literalTexts(entry.call).some(text => text.includes('process.on("SIGTERM"')));
    const silent = noncooperative.filter(entry => termsIn(entry.title).length === 0).map(entry => entry.title);
    const named = new Set(noncooperative.flatMap(entry => termsIn(entry.title)));
    const rfSignals = killedWith(parse(RF_PROVIDER)).signals;
    const comments = rfSuite === undefined ? [] : commentsIn(source, rfSuite.call);
    const sdk = parse(SDK_TRANSPORT);
    const sdkProse = [...new Set(groupKills(sdk).map(call => enclosingFunction(call)))].flatMap(owner => {
      const doc = owner === undefined ? undefined : leadingDoc(sdk, owner);
      return doc === undefined ? [] : [doc];
    });
    const corpusWords = [...new Set([...noncooperative.map(entry => entry.title), ...sdkProse].flatMap(stemWordsIn))].sort();
    const vocabulary = new Set(TERMS.map(normalized));
    expect({
      selected: noncooperative.length >= 1,
      silent,
      rfSignals: rfSignals.length > 0,
      unnamed: rfSignals.filter(signal => !named.has(signal)),
      comments: comments.length >= 1 && comments.every(text => text.startsWith("//") || text.startsWith("/*")),
      corpus: sdkProse.length >= 1 && corpusWords.length >= 4,
      unlisted: corpusWords.filter(word => !vocabulary.has(word)),
    }).toStrictEqual({ selected: true, silent: [], rfSignals: true, unnamed: [], comments: true, corpus: true, unlisted: [] });
  });

  it("C5 Pi delegates: the HyperUnix provider disposes on abort and closes in finally, and never kills, reads a pid, names a signal or imports child_process", { timeout: CENSUS_TIMEOUT }, () => {
    const source = parse(PROVIDER);
    const lifecycle = providerLifecycle(source);
    expect({
      lifecycle: { onAbort: [...lifecycle.onAbort], inFinally: [...lifecycle.inFinally], removesListener: lifecycle.removesListener, listener: lifecycle.listener !== undefined },
      shapes: falsifierShapes(source).map(hit => `${hit.shape}:${hit.line}`),
      signals: signalLiterals(source),
      childProcess: childProcessImports(source),
    }).toStrictEqual({ lifecycle: { onAbort: ["dispose"], inFinally: ["close"], removesListener: true, listener: true }, shapes: [], signals: [], childProcess: [] });
  });

  it("C6 SDK-owned termination: the installed SDK transport kills the owned process group on abort, and every signal it or the RF provider sends is a vocabulary term", { timeout: CENSUS_TIMEOUT }, () => {
    const sdk = parse(SDK_TRANSPORT);
    const groups = groupKills(sdk);
    const owners = [...new Set(groups.map(call => enclosingFunction(call)))];
    const listensForAbort = owners.map(owner => owner !== undefined && callsIn(owner).some(call => calleeText(call).endsWith(".addEventListener") && stringArgument(call, 0) === "abort"));
    const sdkKills = killedWith(sdk);
    const rfKills = killedWith(parse(RF_PROVIDER));
    const docs = owners.flatMap(owner => {
      const doc = owner === undefined ? undefined : leadingDoc(sdk, owner);
      return doc === undefined ? [] : [doc];
    });
    expect({
      groupKills: groups.length >= 1,
      listensForAbort: listensForAbort.length > 0 && listensForAbort.every(Boolean),
      signalsSent: sdkKills.signals.length > 0 && rfKills.signals.length > 0,
      outsideW2: [...sdkKills.signals, ...rfKills.signals].filter(signal => !termsOfRow("W2").includes(signal)),
      outsideW3: [...sdkKills.names, ...rfKills.names].filter(name => !termsOfRow("W3").includes(name)),
      documented: docs.length >= 1 && docs.every(doc => termsIn(doc).length > 0),
    }).toStrictEqual({ groupKills: true, listensForAbort: true, signalsSent: true, outsideW2: [], outsideW3: [], documented: true });
  });

  it("C7 no hand-rolled kill falsifier: no test or qa file that drives HX carries a kill call, a pid read, a process-table probe or ESRCH", { timeout: CENSUS_TIMEOUT }, () => {
    const sources = [...sourcesUnder("test"), ...sourcesUnder("qa")];
    const excluded = new Set<string>(EXCLUDED);
    const judged = sources.filter(path => !excluded.has(path) && DRIVER_TOKENS.some(token => read(path).includes(token))).flatMap(path => {
      const source = parse(path);
      return hxDrivers(source).length > 0 ? [{ path, hits: falsifierShapes(source) }] : [];
    });
    const paths = judged.map(entry => entry.path);
    expect({
      floor: judged.length >= 20,
      anchored: [LIFECYCLE, "test/workbench-hyperunix-observer.test.ts", "test/workbench-hyperunix-graduation-vocabulary-census.test.ts"].every(path => paths.includes(path)),
      selfExcluded: !paths.includes(SELF) && sources.includes(SELF),
      hits: judged.flatMap(entry => entry.hits.map(hit => `${entry.path}:${hit.line} ${hit.shape}`)),
    }).toStrictEqual({ floor: true, anchored: true, selfExcluded: true, hits: [] });
  });

  it("C7 calibration: the falsifier detector finds the SDK transport's and the RF provider's own kill code and every shape in a planted control", { timeout: CENSUS_TIMEOUT }, () => {
    const control = ts.createSourceFile(
      "control.ts",
      ['child.kill("SIGTERM");', "process.kill(child.pid, 0);", 'readFileSync("/proc/" + pid + "/status");', 'spawnSync("pgrep", ["hx"]);', 'execSync("ps -p 1");', 'if (error.code === "ESRCH") {}'].join("\n"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    const sdk = shapeCounts(falsifierShapes(parse(SDK_TRANSPORT)));
    const rf = shapeCounts(falsifierShapes(parse(RF_PROVIDER)));
    expect({
      sdk: { F1: (sdk.F1 ?? 0) > 0, F2: (sdk.F2 ?? 0) > 0, F4: (sdk.F4 ?? 0) > 0 },
      rf: (rf.F1 ?? 0) > 0,
      control: shapeCounts(falsifierShapes(control)),
      drivers: hxDrivers(parse(LIFECYCLE)),
    }).toStrictEqual({ sdk: { F1: true, F2: true, F4: true }, rf: true, control: { F1: 2, F2: 1, F3: 3, F4: 1 }, drivers: ["capability", "import", "override"] });
  });

  it("C8 docs: no docs/workbench clause pairs the HX side with a termination term unless it names the upstream HXGC-OPS-002 artifact", { timeout: CENSUS_TIMEOUT }, () => {
    const clauses = docsClauses();
    const hits = clauses.filter(clause => HX_SIDE.test(clause.text) && termsIn(clause.text).length > 0 && !clause.text.includes(UPSTREAM)).map(clause => `${clause.file}:${clause.line} [${termsIn(clause.text).join(", ")}] ${clause.text}`);
    expect({ files: new Set(clauses.map(clause => clause.file)).size >= 50, hits }).toStrictEqual({ files: true, hits: [] });
  });

  it("C8 calibration: the clause reader finds an RF termination clause in the frozen TRACEABILITY.md and HX clauses across the docs", { timeout: CENSUS_TIMEOUT }, () => {
    const clauses = docsClauses();
    const rfTermination = clauses.filter(clause => clause.file === TRACEABILITY && RF_SIDE.test(clause.text) && termsIn(clause.text).length > 0);
    const hx = clauses.filter(clause => HX_SIDE.test(clause.text));
    expect({ rfTermination: rfTermination.length >= 1, hx: hx.length >= 50, hxInTraceability: hx.some(clause => clause.file === TRACEABILITY) }).toStrictEqual({ rfTermination: true, hx: true, hxInTraceability: true });
  });

  it("C9 run pin: the run pin's literals name the HX suite, every frozen case title, this file's suite and every case of this file", { timeout: CENSUS_TIMEOUT }, () => {
    const pinned = new Set(literalTexts(parse(RUN_PIN)));
    const self = parse(SELF);
    const suites = registrationsIn(self).filter(entry => entry.root === "describe");
    const own = registrationsIn(self).filter(entry => entry.root === "it");
    const needed = [HX_SUITE, ...CASES.map(row => row.title), ...suites.map(entry => entry.title), ...own.map(entry => entry.title)];
    expect({ suites: suites.map(entry => entry.title), cases: own.length, unpinned: needed.filter(title => !pinned.has(title)) }).toStrictEqual({ suites: [SUITE], cases: 15, unpinned: [] });
  });
});
