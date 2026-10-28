/**
 * wb-ae7u (RF-CAC-CONTEXT-REFINEMENT-R5, program-triage-2026-10-18), the until-then leg: the rf joint-view boundary census.
 * Statement (bead title, verbatim): "When rf ships RFContextBoundaryV0, Pi (composer of multiple rf views) shall declare
 * disclosure/permission conditions over JOINT views: substitutability judged on joint output, public state and visible trace;
 * individually-permitted views that jointly reveal a hidden correlation violate the boundary; disclosure failures surfaced,
 * never swallowed; no equivalence verdict bypasses Pi read-admission gates."
 * Acceptance (owner filing; the labels of rows A, B and C are its three gated-falsifier clauses, read from the bead export):
 * "(a) two individually-permitted fixture views whose composition exposes a correlated hidden field read as a boundary
 * violation under the declared joint conditions; (b) a permission/disclosure failure in any composed view surfaces in the
 * projection (failureSnapshot precedent), never swallowed; (c) an equivalence/similarity verdict input never short-circuits
 * capability permission checks or observer workspace-scope checks (read admission independent of scoring)".
 *
 * SOURCE (read-only git show and git rev-parse on the local ReactiveFiberCLI checkout by the cut #1 seat, ws-01, 2026-10-28):
 * docs/programs/cac-context-refinement-2026-10-18/01-contracts-and-qa.md, blob 4a64d3b3f08b at the citation pin
 * 82bd879eee52 and byte-identical at origin/main 48f020fe625f (which descends from the pin): :4 names RFContextBoundaryV0 and its
 * fields, disclosure/permission conditions among them; :6 names RFContextRefinementV0 and closes "These are not shipped commands
 * or schema exports."; :9 items (5) and (6) (joint comparison; "enforce read admission independently of similarity scoring");
 * :12 "two views jointly reveal a hidden correlation"; :21 "no hidden permission failure". At 48f020fe625f the program's crosswalk
 * (evidence/crosswalk.md:15-19) still "exports neither contract" and its audit forbids a packaged schema or a registry leaf naming
 * either, and the installed rf (0.1.845) lists no boundary, refinement or cac leaf in `rf --json --version` result.leaves. The
 * registry src/reactive_fiber_cli/domain/diagnostics.py (blob 6ba8bb84db91 at 48f020fe625f) specs 20 codes at the trust-denied
 * exit (_EXIT_TRUST_DENIED = 5, :2036; 16 of them at the citation pin, the two broker and two scenario rows added since) and
 * RF_SOURCE_SECRET_WITHHELD as an info row (:4140). The roster vendors each cited doc line and each spec head verbatim with its
 * SHA256 (UTF-8, no trailing newline); this hermetic test never re-reads the producer (see ROSTER-HELD below).
 *
 * MEASURED AT BASE (cut #2: trunk 014d116, landing 651, seat ws-05, run g10-work-s130; cut #1: 7a0ab7f, seat ws-01, run
 * g10-work-s129): no tracked src module names a VOCABULARY fold (the A3 scan, 0 rows; a separator-tolerant git grep of the eight
 * needles over src, 0 rows). Pi's rf surface is the reactivefiber.render.preview pair (the native and the injected registration):
 * read class, one selector per call (the legacy {model, task} arm or the {view, taskId, model?} arm); reactivefiberTopology reads
 * one reading into one snapshot. So the trigger has not fired: Pi declares no joint conditions and reads no boundary record, and a
 * caller composes views only as separate values and separate snapshots.
 *
 * READINGS. A VOCABULARY fold is NFKC, lower case, every character outside a-z and 0-9 removed. The needles: the two contract
 * names the vendored :4 and :6 lines spell (RFContext...V0, the rf prefix and the V0 suffix dropped), the title's three
 * declaration words ("declare disclosure/permission conditions over JOINT views": each condition word joined to "conditions",
 * and the joint word joined to "view"), clause (a)'s two armed-half nouns ("read as a boundary violation under the declared
 * joint conditions") and the title's "hidden correlation", each pair of words joined. A VIEW is a {view, taskId} render answered
 * by a stand-in rf (the ONLY PATH entry, logging each argv) or by an injected host client; a COMPOSED pair is the two views read
 * by one caller, one value and one snapshot each.
 * The DENIAL family is every registry row the vendored excerpts spec at the trust-denied exit. A VERDICT key is a clause (c) word,
 * bare or as <word>_verdict; a VERDICT form is a VERDICT key valued one of the seven VERDICT_VALUES (true, false, 1, 0,
 * "equivalent", "divergent", "substitutable"): 4 keys, 28 forms, the one set C1, C2 and C3 read.
 *
 * ROWS (one test per pin, titled by the pin id under its row's label; each pin returns a measured witness held to the roster):
 *  A, clause (a), read where Pi composes today; the armed half is NOT DELIVERED (below).
 *    A1 both fixture views are individually permitted: through the native and the injected registration each view's call returns
 *    its value (one --view launch each, --no-commit --no-input --json), and each projects complete, success, its view contract
 *    satisfied.
 *    A2 the pair's correlated hidden field: each view's text states one half and neither states the field, which the pair derives.
 *    At three Pi surfaces the composed pair reads as the two solo views: the composed values equal the two solo values, the two
 *    composed topologies equal the two solo topologies, and the composed pair refreshed into one ObservationProjection queries
 *    (a scope query, every field of every node compared) exactly the nodes each solo value refreshed alone queries. So at those
 *    three surfaces, as read here, Pi adds no joint reading, and the exposure sits with the caller holding both values
 *    (R-CALLER-COMPOSITION); no topology and no queried node copies either text.
 *    A3 no declared joint conditions exist to read the pair under: no src script module (git ls-files held both ways to a
 *    filesystem walk) names a VOCABULARY fold in an identifier, a regular-expression text, a constant text piece (a string
 *    literal, a template head, middle or tail, a JSX text) or a constant string composition (controls read, quiet rows below);
 *    a boundary declaration stated on a view's result is carried opaque by the native preview and changes no projection; the
 *    pair reads complete and success twice; and the vendored :6 line states the contracts unshipped.
 *  B, clause (b).
 *    B1 every DENIAL code at either position of a composed pair: through the stand-in (exit 5) the refused view's call raises the
 *    typed refusal 'unavailable' naming the code and never returns a value, while the other view's call returns its value, equal
 *    to its solo value (the same input answered through a separate registration whose every call is clean); through the injected
 *    registration the refusal envelope is relayed as a value stating ok false and the code, and the other view's value equals its
 *    solo value (the same view relayed through a separate injected registration).
 *    B2 the projection: each refusal projects through the observer's failureSnapshot (the precedent the clause names, read as a
 *    declared function of src/workbench/reactivefiber-observer.ts): coverage unknown, tone failure, status text and first note
 *    naming the code; the composed pair refreshed into one ObservationProjection holds exactly one failure node (the refused
 *    view's) and one success node.
 *    B3 never swallowed: either order composes the same nodes, each composed node equals its solo projection, two refusals stay
 *    two failure nodes, and the R-NONFATAL-DENIAL quiet row.
 *  C, clause (c).
 *    C1 every VERDICT form beside either input arm is refused 'validation' on both registrations with the grant, before any
 *    launch or client call: the registered input schema's two arms are closed ({model, task} and {view, taskId, model},
 *    additionalProperties false); the verdict-free arms launch.
 *    C2 the descriptor's permissions (read from both registrations) are exactly reactivefiber:render, and without that grant
 *    every input, with no VERDICT form or with any one, under every grant set (none, a verdict-named grant, or a discover,
 *    inspect or invoke grant) is refused 'authorization' with no launch or client call; authorization precedes the schema refusal.
 *    C3 the observer: a reading whose root differs from the observer scope, or from the host's authorized rf root, is refused
 *    'authorization' with the same message whatever VERDICT form it carries (at the reading or on its result), and an in-scope
 *    reading projects identically with and without any VERDICT form.
 *
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the claims shape below. The judged set -
 * every row's id, label and pins, every pin's witness and claims, the vocabulary, the verdict words, the denial codes, the info
 * code, the residuals and the claims bound - is held to the out-of-file roster (test/fixtures/rf-joint-view-boundary-roster.json).
 * TERMS RULE (the claims). Each roster pin's claims are terms tiling its quote, each naming facts. A pin's case returns its
 * witness keyed by exactly those terms, in order, each entry holding exactly the facts its term names; so every word of a quote is
 * spelled by a key the pin's own case returns. A pin's live witness must show exactly its claims, and the claims bound case holds
 * every pin's claims against every other pin's live witness (none accepted), so a pin's case swapped for another's reds.
 * OUTSIDE ANCHORS (outside this file and its roster): the tracked bead export (.beads/issues.jsonl, the wb-ae7u row). Row A-C
 * labels equal the acceptance clauses in order and each row's pin quotes tile its clause with separator-only gaps; the citation is
 * the notes' own; VERDICT_WORDS are clause (c)'s words; B2's precedent is clause (b)'s name; the title's contract name must appear
 * in a vendored doc excerpt; the title's declaration words and hidden correlation and clause (a)'s two nouns give six VOCABULARY
 * needles. With the TERMS rule, a row or pin deleted from every census literal and the roster still reds: a row deleted, at the
 * labels; a pin deleted with its words dropped, at its clause's tiling; a pin merged into a neighbour (its words re-homed into the
 * neighbour's quote and the neighbour's claims re-tiled), at the neighbour's claims, since the neighbour's own case returns no
 * entry for the re-homed words.
 * ROSTER-HELD (literals of the roster, NOT outside anchors): the vendored producer excerpts and their SHA256 values (the hash
 * check binds each excerpt only to its own roster-held hash, and nothing re-reads the producer), the trust-denied exit,
 * trustDeniedCount and citationPinCount, the DENIAL family and the info code the excerpts spec, and the two contract needles the
 * doc excerpts spell.
 * NOT CLAIMED: an edit of a case or of a helper it calls (its body, or the term keys it returns), alone or together with its roster
 * witness and claims; an edit of a judge (tiled, claimMisses, constant, piece, scan, the derivations) together with the roster; a
 * coordinated edit of the
 * roster-held literals through the census and the roster together - for example a DENIAL code taken out of DENIAL_CODES, the
 * roster's denialCodes, its excerpt and every count that encodes it, or the info code re-spelled in INFO_CODE, the roster and its
 * excerpt with the hash recomputed - stays green.
 * RESIDUALS (named, each with its pinned quiet fact): R-CALLER-COMPOSITION (A2 composedEqualsSolo) the composition happens at the
 * caller, which holds both values whole, so a joint reveal there is judged by nothing in Pi until declared joint conditions
 * exist; R-COMPUTED (A3 quiet, two rows) a needle that only a run-time composition completes - a part read at run time (a
 * variable, a parameter, a call result) joined to constant text, or constant parts joined by a call such as Array.prototype.join
 * or String.prototype.concat - is not read: the src scan reads single pieces and folds only the compositions constant() names
 * (no single piece holds such a needle); R-PARAPHRASE (A3 quiet)
 * a boundary reader spelled with no VOCABULARY fold is not read (a src comment is no reader and is not scanned);
 * R-NONFATAL-DENIAL (B3 nonfatal) a withholding rf states on an ok render as an info row (RF_SOURCE_SECRET_WITHHELD, a secret
 * capture the producer withheld) or as a warning is no failure under the failureSnapshot precedent: the projection names no info
 * diagnostic and counts warnings only from result.diagnostics_summary, so the render reads complete and success.
 * NOT DELIVERED (the armed half): reading the composed pair as a boundary violation under declared joint conditions (substitutability
 * on joint output, public state and visible trace) needs RFContextBoundaryV0's disclosure/permission conditions, and rf exports no
 * such contract. A cut that adopts it names a needle in src, or reads the stated boundary, and reds A3 by design: it must bring the
 * joint-reveal falsifier with it, extending the one boundary declaration (the owner filing: never a second one).
 *
 * Display paths added: none. Test-only: the stand-in rf and its argv log live in makeScratch scratch, with its leak guard
 * installed; src, the fixtures and the bead export are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { type NativeSnapshot, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf, RF_FIXTURE_WORKSPACE_ID } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Obj = { [key: string]: JsonValue };
interface Pin { readonly id: string; readonly quote: string }
interface Row { readonly id: string; readonly label: string; readonly pins: readonly Pin[] }
interface Claim { readonly term: string; readonly facts: readonly string[] }
interface RosterPin extends Pin { readonly witness: JsonValue; readonly claims: readonly Claim[] }
interface RosterRow { readonly id: string; readonly label: string; readonly pins: readonly RosterPin[] }
interface Excerpt { readonly site: string; readonly textBase64: string; readonly sha256: string }
interface Roster {
  readonly bead: string;
  readonly citation: string;
  readonly producer: {
    readonly citationPin: string; readonly measuredPin: string; readonly docBlob: string; readonly registryBlob: string;
    readonly trustDeniedExit: number; readonly trustDeniedCount: number; readonly citationPinCount: number; readonly excerpts: readonly Excerpt[];
  };
  readonly rows: readonly RosterRow[];
  readonly vocabulary: readonly string[];
  readonly verdictWords: readonly string[];
  readonly denialCodes: readonly string[];
  readonly infoCode: string;
  readonly residuals: readonly { readonly id: string; readonly quietPin: string; readonly fact: string }[];
  readonly claimsBound: JsonValue;
}
interface Answer { readonly envelope: JsonValue; readonly exit: number }

const ROOT = process.cwd();
const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ID = "reactivefiber.render.preview";
const BEAD = "wb-ae7u";
const GRANT = "reactivefiber:render";
const ROSTER = JSON.parse(readFileSync(new URL("./fixtures/rf-joint-view-boundary-roster.json", import.meta.url), "utf8")) as Roster;
const VOCABULARY: readonly string[] = [
  "contextboundary", "contextrefinement", "disclosureconditions", "permissionconditions", "jointview", "boundaryviolation", "jointconditions", "hiddencorrelation",
];
const VERDICT_WORDS: readonly string[] = ["equivalence", "similarity"];
/** The values a VERDICT key is read at (C1, C2 and C3 read the same 28 forms). */
const VERDICT_VALUES: readonly JsonValue[] = [true, false, 1, 0, "equivalent", "divergent", "substitutable"];
const DENIAL_CODES: readonly string[] = [
  "RF_BROKER_DEMAND_NOT_OWNED", "RF_BROKER_RIGHTS_DENIED", "RF_CONFIG_LAYER_READONLY", "RF_GRAPH_OVERLAY_SCOPE_DENIED",
  "RF_GRAPH_OVERLAY_PROTECTED_TARGET", "RF_LENS_BINDING_DENIED", "RF_OBSERVATION_DENIED", "RF_OPTIC_EXECUTION_DENIED",
  "RF_POLICY_CAPABILITY_DEFAULT_MISSING", "RF_PUBLICATION_IMPACT_UNKNOWN", "RF_PUBLICATION_UNAUTHORIZED", "RF_REPLAY_TRUST_DENIED",
  "RF_SCENARIO_MODEL_AUDIENCE_REFUSED", "RF_SCENARIO_PUBLISH_REFUSED", "RF_SOURCE_PATH_OUTSIDE_ROOT", "RF_SOURCE_SYMLINK_ESCAPE",
  "RF_SOURCE_CAPABILITY_DENIED", "RF_STATE_NAMESPACE_PROTECTED", "RF_TRUST_DENIED", "RF_TSX_RESOURCE_DENIED",
];
const INFO_CODE = "RF_SOURCE_SECRET_WITHHELD";
const VIEWS: readonly string[] = ["fixture.alpha", "fixture.beta"];
/** Each view's operation-id fill, so the two snapshots are two nodes. */
const FILLS: readonly string[] = ["b", "c"];
/** The correlated hidden field: each view's text states one half, neither states the field, and the pair derives it. */
const HALVES: readonly number[] = [17, 25];
const HIDDEN = 42;
const TASK = "joint-fixture";
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) two individually-permitted fixture views whose composition exposes a correlated hidden field read as a boundary violation under the declared joint conditions",
    pins: [
      { id: "A1", quote: "two individually-permitted fixture views" },
      { id: "A2", quote: "whose composition exposes a correlated hidden field" },
      { id: "A3", quote: "read as a boundary violation under the declared joint conditions" },
    ],
  },
  {
    id: "B",
    label: "(b) a permission/disclosure failure in any composed view surfaces in the projection (failureSnapshot precedent), never swallowed",
    pins: [
      { id: "B1", quote: "a permission/disclosure failure in any composed view" },
      { id: "B2", quote: "surfaces in the projection (failureSnapshot precedent)" },
      { id: "B3", quote: "never swallowed" },
    ],
  },
  {
    id: "C",
    label: "(c) an equivalence/similarity verdict input never short-circuits capability permission checks or observer workspace-scope checks (read admission independent of scoring)",
    pins: [
      { id: "C1", quote: "an equivalence/similarity verdict input" },
      { id: "C2", quote: "never short-circuits capability permission checks" },
      { id: "C3", quote: "or observer workspace-scope checks (read admission independent of scoring)" },
    ],
  },
];

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

function object(value: JsonValue | undefined): Obj {
  if (value === null || value === undefined || typeof value !== "object" || Array.isArray(value)) throw new Error("expected an object");
  return value;
}
function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function copy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
const unique = (values: readonly JsonValue[]): JsonValue[] => [...new Set(values.map(value => JSON.stringify(value)))].map(text => JSON.parse(text) as JsonValue);
const operationId = (fill: string): string => `rfo_${fill.repeat(22)}`;
const fold = (text: string): string => text.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
const viewText = (index: number): string => `${VIEWS[index]} constructed half ${HALVES[index]}`;

/** A clean --view render of VIEWS[index]: the full-shape fixture with its own operation id and text and a satisfied contract. */
function cleanView(index: number): Obj {
  const envelope: Obj = fullShapeRf(ROOT);
  envelope.operation_id = operationId(FILLS[index] ?? "z");
  const result = object(envelope.result);
  object(result.output).text = viewText(index);
  result.view_id = VIEWS[index] ?? null;
  result.view_contract = { view_id: VIEWS[index] ?? null, satisfied: true, degraded: false, failures: [] };
  return envelope;
}
/** An rf refusal of VIEWS[index]'s render: one primary error diagnostic carrying the code, a null result, no transaction. */
function refusal(code: string, index: number): Obj {
  return {
    schema: "reactive-fiber.cli/v1", ok: false, command: "context.render", operation_id: operationId(FILLS[index] ?? "z"),
    workspace: { id: RF_FIXTURE_WORKSPACE_ID, root: ROOT }, transaction_id: null, result: null,
    diagnostics: [{ code, severity: "error", message: "constructed refusal", hint: null, source: null, metadata: {} }],
  };
}
const viewInput = (index: number, taskId = TASK): Obj => ({ view: VIEWS[index] ?? "", taskId });
const legacyInput = (task = TASK): Obj => ({ model: "fixture", task });
const answerKey = (input: Obj): string => (typeof input.view === "string" ? `${input.view}|${String(input.taskId)}` : `legacy|${String(input.task)}`);

/** A stand-in rf, the ONLY PATH entry: it logs each argv as one JSON line and answers the view and task id (or the legacy task)
 * it is asked for from its answer map, exiting with the answer's code; an unanswered request exits 9 with no output. */
function standIn(answers: Readonly<Record<string, Answer>>): { registry: CapabilityRegistry; launches: () => string[][] } {
  const scratch = makeScratch("rf-joint-view-");
  scratches.push(scratch);
  const log = join(scratch, "argv.log");
  const map = join(scratch, "answers.json");
  writeFileSync(map, JSON.stringify(answers));
  writeFileSync(log, "");
  const executable = join(scratch, "rf");
  writeFileSync(executable, `#!${process.execPath}
const fs = require("node:fs");
const argv = process.argv.slice(2);
fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(argv) + "\\n");
const answers = JSON.parse(fs.readFileSync(${JSON.stringify(map)}, "utf8"));
const view = argv.indexOf("--view");
const key = view >= 0 ? argv[view + 1] + "|" + argv[argv.indexOf("--task-id") + 1] : "legacy|" + argv[argv.indexOf("--task") + 1];
const answer = answers[key];
if (answer === undefined) process.exit(9);
process.stdout.write(JSON.stringify(answer.envelope));
process.exitCode = answer.exit;
`);
  chmodSync(executable, 0o700);
  process.env.PATH = scratch;
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  const launches = (): string[][] => readFileSync(log, "utf8").split("\n").filter(line => line.length > 0).map(line => JSON.parse(line) as string[]);
  return { registry, launches };
}
/** The injected registration over a host client that answers its queue in order, counting its calls. */
function injected(queue: readonly JsonValue[]): { registry: CapabilityRegistry; calls: () => number } {
  let calls = 0;
  const registry = new CapabilityRegistry();
  type Envelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;
  registerReactiveFiberRender(registry, async () => {
    const next = queue[calls] ?? null;
    calls += 1;
    return copy(next) as unknown as Envelope;
  }, ROOT);
  return { registry, calls: () => calls };
}
async function call(registry: CapabilityRegistry, input: JsonValue, grants: readonly string[] = [GRANT]): Promise<JsonValue> {
  return registry.invoke(ID, input, { grants, signal: new AbortController().signal });
}
/** A call's outcome as data: its value, or the typed refusal's category and message (any other throw fails the case). */
async function settle(promise: Promise<JsonValue>): Promise<Obj> {
  try {
    return { kind: "value", value: await promise };
  } catch (error) {
    if (!(error instanceof CapabilityError)) throw error;
    return { kind: "refused", category: error.category, message: error.message };
  }
}
const SCOPE: ObservationScope = { workspace: ROOT, principal: "fixture" };
const HOST: ReactiveFiberTopologyContext = { scope: SCOPE, seam: "rf-cli", capturedAt: "2026-10-28T00:00:00Z", observedAt: "2026-10-28T00:00:01Z" };
function reading(envelope: JsonValue, extra: Obj = {}, workspaceRoot = ROOT): Obj {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot, source: envelope, ...extra };
}
function project(value: JsonValue, host: ReactiveFiberTopologyContext = HOST): ReactiveFiberProjectionTopology {
  return reactivefiberTopology(value, host);
}
function snapshotOf(value: JsonValue): NativeSnapshot {
  const snapshot = project(value).snapshots[0];
  if (snapshot === undefined) throw new Error("expected one snapshot");
  return snapshot;
}
/** The observer's refusal as data, or a marker when it projects. */
function observed(value: JsonValue, host: ReactiveFiberTopologyContext = HOST): Obj {
  try {
    return { kind: "projected", topology: copy(project(value, host)) as unknown as JsonValue };
  } catch (error) {
    if (!(error instanceof CapabilityError)) throw error;
    return { kind: "refused", category: error.category, message: error.message };
  }
}
/** Refreshes the snapshots into one projection; returns each refresh's outcome, the failure and success nodes' native ids, the
 * scope query's nodes as (id, presentation, completeness), and the same nodes whole (every field the query returns). */
function composed(snapshots: readonly NativeSnapshot[]): { applied: string[]; failure: string[]; success: string[]; nodes: string[]; full: string[] } {
  const projection = new ObservationProjection();
  const applied = snapshots.map(snapshot => projection.refresh(snapshot));
  const ids = (tone: "failure" | "success"): string[] => projection.query({ scope: SCOPE, limit: 50, statusTone: tone }).nodes.map(node => node.nativeRef.id).sort();
  const queried = projection.query({ scope: SCOPE, limit: 50 }).nodes;
  const nodes = queried.map(node => JSON.stringify([node.nativeRef.id, node.presentation, node.completeness])).sort();
  return { applied, failure: ids("failure"), success: ids("success"), nodes, full: queried.map(node => JSON.stringify(node)).sort() };
}

/** A constant string composition: a string literal, a no-substitution template, a parenthesized part, a + concatenation or a
 * template whose every span is constant; anything else is not folded (R-COMPUTED). */
function constant(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return constant(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = constant(node.left);
    const right = constant(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let text = node.head.text;
    for (const span of node.templateSpans) {
      const value = constant(span.expression);
      if (value === undefined) return undefined;
      text += value + span.literal.text;
    }
    return text;
  }
  return undefined;
}
/** The parse kind a module's extension names (every tracked src module is .ts at this cut's base). */
const scriptKind = (path: string): ts.ScriptKind =>
  path.endsWith(".tsx") ? ts.ScriptKind.TSX : path.endsWith(".jsx") ? ts.ScriptKind.JSX : /\.[cm]?js$/.test(path) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
/** A constant text piece beside the string literals constant() reads: a template head, middle or tail, or a JSX text. */
const piece = (node: ts.Node): string | undefined =>
  ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isJsxText(node) ? node.text : undefined;
/** The VOCABULARY folds a module holds in an identifier, a regular-expression pattern text, a constant text piece or a constant
 * string composition. */
function scan(text: string, path = "fixture.ts"): string[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKind(path));
  const hits = new Set<string>();
  const visit = (node: ts.Node): void => {
    const value = ts.isIdentifier(node) || ts.isPrivateIdentifier(node) ? node.text
      : ts.isRegularExpressionLiteral(node) ? node.text.slice(1, node.text.lastIndexOf("/")) : piece(node) ?? constant(node);
    if (value !== undefined) for (const word of VOCABULARY) if (fold(value).includes(word)) hits.add(word);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return [...hits].sort();
}
const SCRIPT_MODULE = /\.(?:[cm]?ts|tsx|[cm]?js|jsx)$/;
function filesBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? filesBelow(join(directory, entry.name))
    : entry.isFile() && SCRIPT_MODULE.test(entry.name) ? [join(directory, entry.name)] : []);
}
/** The names of a module's function declarations, read from its TypeScript AST. */
function declaredFunctions(path: string): string[] {
  const source = ts.createSourceFile(path, readFileSync(join(REPO, path), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const names: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) names.push(node.name.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return names;
}
/** The registered descriptors' input arms (property names and additionalProperties) and permissions, read from the registry. */
function admission(registry: CapabilityRegistry): { arms: JsonValue[]; permissions: JsonValue[] } {
  const entry = registry.catalogSnapshot().find(item => item.descriptor.id === ID);
  if (entry === undefined) throw new Error("expected the rf preview descriptor");
  const oneOf = entry.descriptor.inputSchema.oneOf;
  const arms = Array.isArray(oneOf) ? oneOf.map((arm: unknown): JsonValue => {
    if (!isRecord(arm) || !isRecord(arm.properties)) return null;
    return { properties: Object.keys(arm.properties), additionalProperties: arm.additionalProperties === false ? false : String(arm.additionalProperties) };
  }) : [];
  return { arms, permissions: [...entry.descriptor.permissions] };
}

/** The wb-ae7u row of the tracked bead export, read once (the export is tens of megabytes). */
let beadRowRead: Record<string, unknown> | undefined;
function beadRow(): Record<string, unknown> {
  if (beadRowRead !== undefined) return beadRowRead;
  for (const line of readFileSync(join(REPO, ".beads/issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const value: unknown = JSON.parse(line);
    if (isRecord(value) && value.id === BEAD) {
      beadRowRead = value;
      return value;
    }
  }
  throw new Error("bead export lacks the owner filing");
}
function beadText(field: "title" | "notes"): string {
  const value = beadRow()[field];
  if (typeof value !== "string") throw new Error(`bead export ${field} is not a string`);
  return value;
}
/** The owner's gated-falsifier clauses, read from the bead export (the outside anchor every row label equals). */
function acceptanceClauses(): string[] {
  const marker = `Acceptance shape: gated falsifiers ${String.fromCodePoint(0x2014)} `;
  const notes = beadText("notes");
  const at = notes.indexOf(marker);
  if (at < 0) return [];
  return (notes.slice(at + marker.length).split("\n")[0] ?? "").replace(/\.$/, "").split(/; (?=\([a-z]\) )/);
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
const excerptText = (excerpt: Excerpt): string => Buffer.from(excerpt.textBase64, "base64").toString("utf8");
const excerptsAt = (file: string): string[] => ROSTER.producer.excerpts.filter(excerpt => excerpt.site.startsWith(`${file}:`)).map(excerptText);
const DOC = "docs/programs/cac-context-refinement-2026-10-18/01-contracts-and-qa.md";
const REGISTRY = "src/reactive_fiber_cli/domain/diagnostics.py";
/** The VOCABULARY the outside text gives: the vendored contract names, the title's three declaration words, clause (a)'s two
 * armed-half nouns ("read as a boundary violation under the declared joint conditions") and the title's hidden correlation. */
function derivedVocabulary(): string[] {
  const title = beadText("title");
  const contracts = excerptsAt(DOC).flatMap(text => [...text.matchAll(/RF(Context[A-Z][a-z]+)V0/g)].map(match => fold(match[1] ?? "")));
  const declared = /shall declare ([a-z]+)\/([a-z]+) conditions over ([A-Z]+) views/.exec(title);
  const words = declared === null ? [] : [fold(`${declared[1]} conditions`), fold(`${declared[2]} conditions`), fold(`${declared[3]} view`)];
  const armed = / read as a ([a-z]+ [a-z]+) under the declared ([a-z]+ [a-z]+)$/.exec(acceptanceClauses()[0] ?? "");
  const nouns = armed === null ? [] : [fold(armed[1] ?? ""), fold(armed[2] ?? "")];
  const reveal = /jointly reveal a ([a-z]+ [a-z]+) violate the boundary/.exec(title);
  return [...new Set(contracts), ...words, ...nouns, ...(reveal === null ? [] : [fold(reveal[1] ?? "")])];
}
/** Clause (c)'s verdict words: "an <word>/<word> verdict input". */
function derivedVerdictWords(): string[] {
  const match = /^\(c\) an ([a-z]+)\/([a-z]+) verdict input /.exec(acceptanceClauses()[2] ?? "");
  return match === null ? [] : [match[1] ?? "", match[2] ?? ""];
}
/** The trust-denied exit and every registry row the vendored excerpts spec at it, in excerpt order. */
function derivedDenial(): { exit: number; codes: string[] } {
  const exitText = excerptsAt(REGISTRY).map(text => /^_EXIT_TRUST_DENIED: Final = (\d+)$/.exec(text)?.[1]).find(value => value !== undefined);
  const exit = Number(exitText);
  const codes = excerptsAt(REGISTRY).flatMap(text => {
    const match = /^DiagnosticCode\.(RF_[A-Z0-9_]+):\s*_(?:error|tsx)_spec\(\s*(\d+|_EXIT_TRUST_DENIED),$/.exec(text);
    if (match === null) return [];
    return (match[2] === "_EXIT_TRUST_DENIED" ? exit : Number(match[2])) === exit ? [match[1] ?? ""] : [];
  });
  return { exit, codes };
}
const derivedInfoCodes = (): string[] => excerptsAt(REGISTRY).flatMap(text => {
  const match = /^DiagnosticCode\.(RF_[A-Z0-9_]+):\s*_info_spec\($/.exec(text);
  return match === null ? [] : [match[1] ?? ""];
});
/** The failureSnapshot precedent clause (b) names: "(<name> precedent)". */
const derivedPrecedent = (): string => /\((\w+) precedent\)/.exec(acceptanceClauses()[1] ?? "")?.[1] ?? "";
/** The VERDICT keys: each clause (c) word, bare or as <word>_verdict. */
const verdictKeys = (): string[] => VERDICT_WORDS.flatMap(word => [word, `${word}_verdict`]);
/** The VERDICT forms: each VERDICT key valued each of the VERDICT_VALUES (the one set C1, C2 and C3 read). */
const verdictForms = (): Obj[] => verdictKeys().flatMap(key => VERDICT_VALUES.map(value => ({ [key]: value })));

/** Why a witness fails to show a pin's claims (the TERMS rule): the terms must tile the quote and be the witness's own keys in
 * order, so every quote word is spelled by a key the pin's case returns; each term names facts, exactly its entry's keys. */
function claimMisses(quote: string, claims: readonly Claim[], witness: JsonValue): string[] {
  const misses = tiled(quote, claims.map(claim => claim.term)) ? [] : ["tiling"];
  const entries: Record<string, unknown> = isRecord(witness) ? witness : {};
  const terms = Object.keys(entries);
  if (JSON.stringify(terms) !== JSON.stringify(claims.map(claim => claim.term))) misses.push(`terms: ${terms.join(" | ")}`);
  for (const claim of claims) {
    if (claim.facts.length === 0) misses.push(`idle: ${claim.term}`);
    const entry = entries[claim.term];
    const keys = isRecord(entry) ? Object.keys(entry) : [];
    for (const [index, fact] of claim.facts.entries()) if (claim.facts.indexOf(fact) !== index) misses.push(`twice: ${claim.term}: ${fact}`);
    for (const fact of claim.facts) if (!keys.includes(fact)) misses.push(`absent: ${claim.term}: ${fact}`);
    for (const key of keys) if (!claim.facts.includes(key)) misses.push(`unclaimed: ${claim.term}: ${key}`);
  }
  return misses;
}

const REACHED = new Set<string>();
const LIVE = new Map<string, JsonValue>();
const CLAIMS_BOUND = "claims bound";
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const answers = Object.fromEntries(VIEWS.map((_, index) => [answerKey(viewInput(index)), { envelope: cleanView(index), exit: 0 }]));
    const native = standIn(answers);
    const values: JsonValue[] = [];
    for (const index of VIEWS.keys()) values.push(await call(native.registry, viewInput(index)));
    const launches = native.launches().map(argv => argv.slice(argv.indexOf("context")));
    expect(launches).toEqual(VIEWS.map(view => ["context", "render", "--view", view, "--task-id", TASK, "--no-commit", "--no-input", "--json"]));
    const client = injected(VIEWS.map((_, index) => cleanView(index)));
    const relayed: JsonValue[] = [];
    for (const index of VIEWS.keys()) relayed.push(await call(client.registry, viewInput(index)));
    expect(client.calls()).toBe(VIEWS.length);
    const projections = values.map(value => project(value));
    const snapshots = values.map(snapshotOf);
    expect(relayed.map(value => JSON.stringify(project(value)))).toEqual(projections.map(projection => JSON.stringify(projection)));
    return {
      "two individually-permitted": {
        admitted: { native: values.map(value => object(object(value).source).ok ?? null), injected: relayed.map(value => object(object(value).source).ok ?? null) },
        coverage: snapshots.map(snapshot => snapshot.coverage ?? null),
        tones: snapshots.map(snapshot => snapshot.node.statusTone),
      },
      "fixture views": {
        views: [...VIEWS],
        launches,
        contractNotes: projections.map(projection => projection.diagnostics.find(note => note.startsWith("view contract:")) ?? null),
      },
    };
  },
  A2: async () => {
    const answers = Object.fromEntries(VIEWS.map((_, index) => [answerKey(viewInput(index)), { envelope: cleanView(index), exit: 0 }]));
    const pair = standIn(answers);
    const composedValues: JsonValue[] = [];
    for (const index of VIEWS.keys()) composedValues.push(await call(pair.registry, viewInput(index)));
    const soloValues: JsonValue[] = [];
    for (const index of VIEWS.keys()) {
      const alone = standIn({ [answerKey(viewInput(index))]: { envelope: cleanView(index), exit: 0 } });
      soloValues.push(await call(alone.registry, viewInput(index)));
    }
    const texts = composedValues.map(value => String(object(object(object(object(value).source).result).output).text));
    const halves = texts.map(text => Number(/ half (\d+)$/.exec(text)?.[1]));
    const projections = composedValues.map(value => JSON.stringify(project(value)));
    // The composed pair refreshed into one ObservationProjection, against each solo value refreshed into a projection alone,
    // compared node by node with every field the scope query returns.
    const refreshed = composed(composedValues.map(snapshotOf));
    const soloNodes = soloValues.flatMap(value => composed([snapshotOf(value)]).full).sort();
    return {
      "whose composition": {
        composedEqualsSolo: JSON.stringify(composedValues) === JSON.stringify(soloValues),
        projectionsEqualSolo: JSON.stringify(projections) === JSON.stringify(soloValues.map(value => JSON.stringify(project(value)))),
        refreshedPair: { applied: refreshed.applied, nodes: refreshed.full.length, equalsSolo: JSON.stringify(refreshed.full) === JSON.stringify(soloNodes) },
      },
      "exposes a correlated hidden field": {
        valueTexts: texts,
        hiddenField: { inEither: texts.some(text => text.includes(String(HIDDEN))), derivedFromPair: halves.reduce((sum, half) => sum + half, 0) === HIDDEN },
        projectionCarriesText: [...projections, ...refreshed.full].some(text => texts.some(value => text.includes(value))),
      },
    };
  },
  A3: async () => {
    const walked = filesBelow(join(REPO, "src")).map(path => relative(REPO, path)).sort();
    const tracked = execFileSync("git", ["ls-files", "src"], { cwd: REPO, encoding: "utf8" }).trim().split("\n").filter(path => SCRIPT_MODULE.test(path)).sort();
    expect(walked).toEqual(tracked);
    expect(walked.length).toBeGreaterThanOrEqual(100);
    for (const anchor of ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts", "src/workbench/capability-registry.ts"]) expect(walked).toContain(anchor);
    const findings = walked.flatMap(path => scan(readFileSync(join(REPO, path), "utf8"), path).map(word => `${path}:${word}`));
    const controls = [
      "const boundary = result.context_boundary;", "const { disclosureConditions } = boundary;", 'return source["permission" + "_conditions"];',
      "type JointView = { readonly views: readonly string[] };", 'import refinement from "rf/RFContextRefinementV0";', "const pattern = /joint[-_]?view/i;",
      "const jointConditions = boundary.joint_conditions;", "function boundaryViolation(pair: readonly unknown[]): boolean { return pair.length > 1; }",
      'const reason = "hidden correlation";', `const key = (part: string): string => \`context_boundary.\${part}\`;`,
    ];
    const controlHits = [...controls.map(text => scan(text)), scan("export const Label = (): unknown => <b>joint view</b>;", "fixture.tsx")];
    // R-COMPUTED (a needle only a run-time composition completes: a run-time + part, constant parts joined by a call) and
    // R-PARAPHRASE (a boundary reader with no needle), quiet.
    const quiet = [
      scan('const key = "context_" + suffix; return result[key];'), scan('const key = ["context", "boundary"].join("_"); return result[key];'),
      scan("return result.view_policy.pair_rules;"),
    ];
    const declared = cleanView(0);
    object(declared.result).context_boundary = { disclosure_conditions: [{ views: [...VIEWS], hidden: "sum" }], permission_conditions: [] };
    const native = standIn({ [answerKey(viewInput(0))]: { envelope: declared, exit: 0 } });
    const value = await call(native.registry, viewInput(0));
    const pair = VIEWS.map((_, index) => snapshotOf(reading(cleanView(index))));
    const unshipped = excerptsAt(DOC).some(text => text.includes("These are not shipped commands or schema exports."));
    return {
      "read as a boundary violation": {
        boundaryRead: JSON.stringify(project(value)) !== JSON.stringify(project(reading(cleanView(0)))),
        pairTones: pair.map(snapshot => snapshot.node.statusTone),
        pairCoverage: pair.map(snapshot => snapshot.coverage ?? null),
      },
      "under the declared joint conditions": {
        srcFindings: findings,
        floorMet: true,
        controlHits,
        quiet,
        boundaryCarriedOpaque: JSON.stringify(object(value).source) === JSON.stringify(declared),
        producerShipped: !unshipped,
      },
    };
  },
  B1: async () => {
    const answers: Record<string, Answer> = {};
    for (const code of DENIAL_CODES) {
      for (const index of VIEWS.keys()) {
        answers[answerKey(viewInput(index, `${code}|refused`))] = { envelope: refusal(code, index), exit: 5 };
        answers[answerKey(viewInput(index, `${code}|clean`))] = { envelope: cleanView(index), exit: 0 };
      }
    }
    // Each clean input's solo value: the same input answered through a separate registration whose every call is clean.
    const soloNative = standIn(answers);
    const soloValue = new Map<string, string>();
    for (const code of DENIAL_CODES) {
      for (const index of VIEWS.keys()) {
        const input = viewInput(index, `${code}|clean`);
        soloValue.set(answerKey(input), JSON.stringify(await call(soloNative.registry, input)));
      }
    }
    expect(soloNative.launches().length).toBe(DENIAL_CODES.length * VIEWS.length);
    const soloClient = injected(VIEWS.map((_, index) => cleanView(index)));
    const soloRelayed: string[] = [];
    for (const index of VIEWS.keys()) soloRelayed.push(JSON.stringify(await call(soloClient.registry, viewInput(index))));
    const native = standIn(answers);
    const nativeRows: Obj[] = [];
    const queue: JsonValue[] = [];
    for (const code of DENIAL_CODES) {
      for (const position of VIEWS.keys()) {
        const inputs = VIEWS.map((_, index) => viewInput(index, `${code}|${index === position ? "refused" : "clean"}`));
        const outcomes = await Promise.all(inputs.map(input => settle(call(native.registry, input))));
        const refused = outcomes[position] ?? {};
        const other = outcomes[1 - position] ?? {};
        const otherInput = inputs[1 - position] ?? {};
        nativeRows.push({
          code, position, refused: refused.kind ?? null, category: refused.category ?? null, namesCode: refused.message === `RF render refused: ${code}`,
          other: other.kind ?? null, otherIsSolo: JSON.stringify(other.value) === soloValue.get(answerKey(otherInput)),
        });
        for (const index of VIEWS.keys()) queue.push(index === position ? refusal(code, index) : cleanView(index));
      }
    }
    expect(native.launches().length).toBe(DENIAL_CODES.length * VIEWS.length * VIEWS.length);
    const client = injected(queue);
    const relayedRows: Obj[] = [];
    for (const code of DENIAL_CODES) {
      for (const position of VIEWS.keys()) {
        const values: JsonValue[] = [];
        for (const index of VIEWS.keys()) values.push(await call(client.registry, viewInput(index)));
        const refused = object(object(values[position] ?? null).source);
        const primary = object((refused.diagnostics as JsonValue[] | undefined)?.[0] ?? null);
        const other = object(object(values[1 - position] ?? null).source);
        relayedRows.push({
          code, position, ok: refused.ok ?? null, primary: primary.code ?? null, otherOk: other.ok ?? null,
          otherIsSolo: JSON.stringify(values[1 - position] ?? null) === soloRelayed[1 - position],
        });
      }
    }
    const { exit } = derivedDenial();
    return {
      "a permission/disclosure failure": { codes: [...DENIAL_CODES], exitClass: exit },
      "in any composed view": {
        native: {
          pairs: nativeRows.length,
          refused: unique(nativeRows.map(row => row.refused ?? null)),
          categories: unique(nativeRows.map(row => row.category ?? null)),
          namingCode: nativeRows.filter(row => row.namesCode === true).length,
          others: unique(nativeRows.map(row => row.other ?? null)),
          othersAsSolo: nativeRows.filter(row => row.otherIsSolo === true).length,
          positions: unique(nativeRows.map(row => row.position ?? null)),
        },
        injected: {
          pairs: relayedRows.length,
          ok: unique(relayedRows.map(row => row.ok ?? null)),
          primaryIsCode: relayedRows.filter(row => row.primary === row.code).length,
          othersOk: unique(relayedRows.map(row => row.otherOk ?? null)),
          othersAsSolo: relayedRows.filter(row => row.otherIsSolo === true).length,
        },
      },
    };
  },
  B2: async () => {
    const precedent = derivedPrecedent();
    const rows: Obj[] = [];
    for (const code of DENIAL_CODES) {
      const projection = project(reading(refusal(code, 1)));
      const snapshot = snapshotOf(reading(refusal(code, 1)));
      const pair = composed([snapshotOf(reading(cleanView(0))), snapshot]);
      rows.push({
        coverage: snapshot.coverage ?? null, tone: snapshot.node.statusTone, statusNamesCode: snapshot.node.statusText === `refused · ${code}`,
        noteNamesCode: projection.diagnostics[0] === `render refused with ${code}`, applied: pair.applied,
        failure: pair.failure, success: pair.success,
      });
    }
    return {
      "surfaces in the projection": {
        refused: {
          coverage: unique(rows.map(row => row.coverage ?? null)), tones: unique(rows.map(row => row.tone ?? null)),
          statusNamingCode: rows.filter(row => row.statusNamesCode === true).length, notesNamingCode: rows.filter(row => row.noteNamesCode === true).length,
        },
        composed: {
          pairs: rows.length, applied: unique(rows.map(row => row.applied ?? null)),
          failureNodes: unique(rows.map(row => row.failure ?? null)), successNodes: unique(rows.map(row => row.success ?? null)),
        },
      },
      "(failureSnapshot precedent)": {
        precedent,
        precedentDeclared: declaredFunctions("src/workbench/reactivefiber-observer.ts").includes(precedent),
      },
    };
  },
  B3: async () => {
    const clean = snapshotOf(reading(cleanView(0)));
    let orderIndependent = 0;
    let soloEqual = 0;
    for (const code of DENIAL_CODES) {
      const refused = snapshotOf(reading(refusal(code, 1)));
      const forward = composed([clean, refused]);
      const backward = composed([refused, clean]);
      if (JSON.stringify(forward.nodes) === JSON.stringify(backward.nodes)) orderIndependent += 1;
      const solo = [...composed([clean]).nodes, ...composed([refused]).nodes].sort();
      if (JSON.stringify(forward.nodes) === JSON.stringify(solo)) soloEqual += 1;
    }
    const twoRefusals = DENIAL_CODES.map((code, index) => {
      const next = DENIAL_CODES[(index + 1) % DENIAL_CODES.length] ?? code;
      return composed([snapshotOf(reading(refusal(code, 0))), snapshotOf(reading(refusal(next, 1)))]).failure.length;
    });
    // R-NONFATAL-DENIAL, the quiet fact: an info withholding row (and a warning-severity one) on an ok render is no failure.
    const withheld = (severity: "info" | "warning"): Obj => {
      const envelope = cleanView(0);
      envelope.diagnostics = [{ code: INFO_CODE, severity, message: "constructed withholding", hint: null, source: null, metadata: {} }];
      if (severity === "warning") object(envelope.result).diagnostics_summary = { errors: 0, warnings: 1, has_errors: false, has_warnings: true };
      return envelope;
    };
    const nonfatal = (["info", "warning"] as const).map(severity => {
      const projection = project(reading(withheld(severity)));
      const snapshot = projection.snapshots[0];
      return {
        severity, coverage: snapshot?.coverage ?? null, tone: snapshot?.node.statusTone ?? null,
        named: JSON.stringify(projection).includes(INFO_CODE), equalsClean: JSON.stringify(projection) === JSON.stringify(project(reading(cleanView(0)))),
      };
    });
    return { "never swallowed": { orderIndependent, soloEqual, twoRefusals: unique(twoRefusals), nonfatal } };
  },
  C1: async () => {
    const forms = verdictForms();
    const arms = [legacyInput(), viewInput(0)];
    const answers = Object.fromEntries(arms.map(input => [answerKey(input), { envelope: cleanView(0), exit: 0 }]));
    const native = standIn(answers);
    const client = injected(arms.map(() => cleanView(0)));
    const nativeOutcomes: Obj[] = [];
    const injectedOutcomes: Obj[] = [];
    for (const arm of arms) {
      for (const form of forms) {
        nativeOutcomes.push(await settle(call(native.registry, { ...arm, ...form })));
        injectedOutcomes.push(await settle(call(client.registry, { ...arm, ...form })));
      }
    }
    const launchedByForms = native.launches().length;
    const calledByForms = client.calls();
    const controls: Obj[] = [];
    for (const arm of arms) controls.push(await settle(call(native.registry, arm)));
    const shape = (outcomes: readonly Obj[]): JsonValue => ({ kinds: unique(outcomes.map(outcome => outcome.kind ?? null)), categories: unique(outcomes.map(outcome => outcome.category ?? null)), messages: unique(outcomes.map(outcome => outcome.message ?? null)) });
    return {
      "an equivalence/similarity verdict": { words: [...VERDICT_WORDS], keys: verdictKeys(), values: [...VERDICT_VALUES], forms: forms.length },
      input: {
        arms: admission(native.registry).arms,
        nativeOutcomes: { ...object(shape(nativeOutcomes)), launches: launchedByForms },
        injectedOutcomes: { ...object(shape(injectedOutcomes)), calls: calledByForms },
        controlLaunches: { kinds: unique(controls.map(outcome => outcome.kind ?? null)), launches: native.launches().length },
      },
    };
  },
  C2: async () => {
    const forms = verdictForms();
    const arms = [legacyInput(), viewInput(0)];
    const native = standIn({});
    const client = injected([]);
    const grantSets: string[][] = [[], ...VERDICT_WORDS.flatMap(word => [[`reactivefiber:${word}`], [`${word}:verified`]]), [`discover:${ID}`], [`inspect:${ID}`], [`invoke:${ID}`]];
    const nativeRows: Obj[] = [];
    const injectedRows: Obj[] = [];
    for (const arm of arms) {
      for (const extra of [{}, ...forms]) {
        for (const grants of grantSets) {
          nativeRows.push(await settle(call(native.registry, { ...arm, ...extra }, grants)));
          injectedRows.push(await settle(call(client.registry, { ...arm, ...extra }, grants)));
        }
      }
    }
    const precedence = await settle(call(native.registry, { ...viewInput(0), ...(forms[0] ?? {}) }, []));
    const shape = (rows: readonly Obj[]): Obj => ({ calls: rows.length, categories: unique(rows.map(row => row.category ?? null)), messages: unique(rows.map(row => row.message ?? null)) });
    return {
      "never short-circuits": {
        nativeRefusals: { ...shape(nativeRows), launches: native.launches().length },
        injectedRefusals: { ...shape(injectedRows), clientCalls: client.calls() },
        precedesValidation: precedence.category === "authorization",
      },
      "capability permission checks": {
        permissions: unique([admission(native.registry).permissions, admission(client.registry).permissions]),
        grantSets: grantSets.length,
      },
    };
  },
  C3: async () => {
    const verdicts = verdictForms();
    const elsewhere = `${ROOT}-elsewhere`;
    const authorized: ReactiveFiberTopologyContext = { ...HOST, authorizedRfRoot: `${ROOT}-authorized` };
    const atResult = (verdict: Obj): Obj => {
      const envelope = cleanView(0);
      Object.assign(object(envelope.result), verdict);
      return envelope;
    };
    const variants = (root: string): Obj[] => [reading(cleanView(0), {}, root), ...verdicts.flatMap(verdict => [reading(cleanView(0), verdict, root), reading(atResult(verdict), {}, root)])];
    const refusals = (rows: readonly Obj[]): JsonValue => ({ readings: rows.length, kinds: unique(rows.map(row => row.kind ?? null)), categories: unique(rows.map(row => row.category ?? null)), messages: unique(rows.map(row => row.message ?? null)) });
    const baseline = JSON.stringify(observed(reading(cleanView(0))));
    const inScope = variants(ROOT).map(value => JSON.stringify(observed(value)));
    return {
      "or observer workspace-scope checks": {
        outOfScope: refusals(variants(elsewhere).map(value => observed(value))),
        authorizedRoot: refusals(variants(ROOT).map(value => observed(value, authorized))),
      },
      "(read admission independent of scoring)": {
        positions: ["reading", "result"],
        keys: verdictKeys(),
        forms: verdicts.length,
        inScopeEqual: { readings: inScope.length, equal: inScope.filter(text => text === baseline).length, projected: (JSON.parse(baseline) as Obj).kind ?? null },
      },
    };
  },
};

describe("wb-ae7u rf joint-view boundary census (RF-CAC-CONTEXT-REFINEMENT-R5, gated)", () => {
  it("judged set: frozen shape, roster, outside acceptance anchor and producer excerpts", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:3", "C:3"]);
    expect(ROWS).toEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(({ id: pinId, quote }) => ({ id: pinId, quote })) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort());
    expect(ROSTER.bead).toBe(BEAD);
    const clauses = acceptanceClauses();
    expect(ROWS.map(row => row.label)).toEqual(clauses);
    expect(clauses.map((clause, index) => tiled(clause.slice(4), ROWS[index]?.pins.map(pin => pin.quote) ?? []))).toEqual(clauses.map(() => true));
    expect(beadText("notes").includes(ROSTER.citation)).toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.citationPin.slice(0, 12)}`)).toBe(true);
    expect(ROSTER.producer.excerpts.map(excerpt => createHash("sha256").update(Buffer.from(excerpt.textBase64, "base64")).digest("hex"))).toEqual(ROSTER.producer.excerpts.map(excerpt => excerpt.sha256));
    const contract = /^\[[^\]]+\] When rf ships (RF[A-Za-z]+V0),/.exec(beadText("title"))?.[1] ?? "";
    expect(excerptsAt(DOC).some(text => text.includes(contract)) && contract.length > 0).toBe(true);
    expect(VOCABULARY).toEqual(derivedVocabulary());
    expect(ROSTER.vocabulary).toEqual(VOCABULARY);
    expect(VERDICT_WORDS).toEqual(derivedVerdictWords());
    expect(ROSTER.verdictWords).toEqual(VERDICT_WORDS);
    const denial = derivedDenial();
    expect({ exit: denial.exit, count: denial.codes.length }).toEqual({ exit: ROSTER.producer.trustDeniedExit, count: ROSTER.producer.trustDeniedCount });
    expect(DENIAL_CODES).toEqual(denial.codes);
    expect(ROSTER.denialCodes).toEqual(DENIAL_CODES);
    expect(derivedInfoCodes()).toEqual([INFO_CODE]);
    expect(ROSTER.infoCode).toBe(INFO_CODE);
    expect(ROSTER.producer.citationPinCount).toBeLessThanOrEqual(ROSTER.producer.trustDeniedCount);
    const pins = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(ROSTER.residuals.map(item => item.id)).toEqual(["R-CALLER-COMPOSITION", "R-COMPUTED", "R-PARAPHRASE", "R-NONFATAL-DENIAL"]);
    expect(ROSTER.residuals.every(item => pins.includes(item.quietPin))).toBe(true);
    const held = ROSTER.rows.flatMap(row => row.pins);
    expect(ROSTER.residuals.every(item => held.find(pin => pin.id === item.quietPin)?.claims.some(claim => claim.facts.includes(item.fact)) === true)).toBe(true);
    expect(held.map(pin => `${pin.id}:${pin.claims.map(claim => claim.facts.length).join("+")}`)).toEqual(["A1:3+3", "A2:3+3", "A3:3+6", "B1:2+2", "B2:2+2", "B3:4", "C1:4+4", "C2:3+2", "C3:2+4"]);
    expect(held.filter(pin => !tiled(pin.quote, pin.claims.map(claim => claim.term))).map(pin => pin.id)).toEqual([]);
  });
  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 240_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          LIVE.set(pin.id, witness);
          expect(witness).toEqual(held?.witness);
          expect(claimMisses(pin.quote, held?.claims ?? [], witness)).toEqual([]);
          REACHED.add(pin.id);
        });
      }
    });
  }
  it(`${CLAIMS_BOUND}: every pin's claims refuse every other pin's live witness`, () => {
    const pins = ROSTER.rows.flatMap(row => row.pins);
    expect([...LIVE.keys()].sort()).toEqual(pins.map(pin => pin.id).sort());
    const accepted = pins.flatMap(pin => pins.filter(other => other.id !== pin.id && claimMisses(pin.quote, pin.claims, LIVE.get(other.id) ?? null).length === 0).map(other => `${pin.id} accepts ${other.id}`));
    expect({ pairs: pins.length * (pins.length - 1), accepted }).toEqual(ROSTER.claimsBound);
    REACHED.add(CLAIMS_BOUND);
  });
  it("records: every registered pin ran and reached its witness, and the claims bound case ran", () => {
    expect([...REACHED].sort()).toEqual([...ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)), CLAIMS_BOUND].sort());
  });
});
