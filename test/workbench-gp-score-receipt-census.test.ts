/**
 * wb-0lf.5 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R9, program-triage-2026-10-18 child of wb-0lf), cut #2: the respin after
 * refusal #1 (unmet U1 and U2; findings F1 and F2 ride). An ARMED, fixture-only contract for the first Pi consumer of
 * GraphPolicyCLI (GP) scores, judged over the real control core (decideControl, isCoreMintedDecision) and the real Furnace
 * control adapter (executeFurnaceControl, vetFurnaceControlDecision) with a counting fake client. No Pi GP consumer exists
 * today (row T), so rows A to E judge this census's own fixture host, never a shipped seam. No native action is issued: the
 * one call the genuine permit makes lands on the fake.
 *
 * ROWS. T is the title's trigger, "When Pi consumes GP scores". A to E are the owner filing's five Acceptance clauses (the
 * first "Citation: " line of the bead's tracker row, cut at "; "), verbatim. Each row's pins quote its clause in order: a
 * clause that ends in a parenthetical is pinned as two parts, the text before it and the parenthetical (A1/A2, E1/E2). Q holds
 * the residuals' pinned quiet rows.
 *  T1: no src module is read as a GP consumer. The reader is the union of three arms over every file git would commit under
 *    src/ (tracked and untracked, never ignored): (i) the landed call-site reader callSites of
 *    test/helpers/gp-control-loop-audit.ts (string text through the TypeScript parser: a gp launch, a graphpolicy or gp module
 *    specifier, and any text naming graph policy or gp's wire vocabulary, graphpolicy.cli.v1 and graphpolicy.rpc.v1 among it);
 *    (ii) the graph-policy name family (FAMILY: graph policy or graph data IR at a word start, any letter case, one separator
 *    or none) in any text; (iii) the sampled-decision receipt vocabulary (RECEIPT_TOKENS, whole case-sensitive tokens) in any
 *    text. The modules it reads are exactly SRC_BINDINGS (none). The listing holds at least SRC_FLOOR files and the control
 *    core's real text; arm (i) reads the ReactiveFiber provider's real rf launch respelled as gp at that launch's own lines;
 *    each planted control (PLANTS, the refusal's plant G3 among them: a gp eval keyed-score consumer on graphpolicy.cli.v1;
 *    the others plant graphpolicy.rpc.v1 and gp.rpc.reply/v1 strings, a graphpolicy and a gp/ module specifier, the name
 *    family in a comment and in identifiers, and receipt members in a comment and in code) is read by the arms its witness
 *    names, and the near tokens (gpu, chosen_ids, log_probability_value, Chosen_ID, a paragraph policy) are read by none.
 *  A1: the host keeps a stochastic reply's bytes verbatim as its producer receipt, both for the compact bytes the producer's
 *    validation read (its stdin: "the receipt below, JSON.stringify") and for an indented respelling of the same receipt, so
 *    the support order, the legal support and every probability word are byte-identical; a re-serializing host
 *    (M-RESERIALIZE) keeps the compact bytes by coincidence and loses the indented ones. The stochastic record also keeps
 *    the receipt's candidates keyed to its own score words.
 *  A2: every prohibition of the clause's parenthetical has a host mutant that clause A's reading refuses (PROHIBITIONS):
 *    renormalization (M-RENORMALIZE: the probability words divided by their float64 sum and re-encoded in binary32, so the
 *    kept bytes differ), re-sampling (M-RESAMPLE: a host draw over the receipt's probabilities with its own uniform, landing
 *    on another candidate) and host-side argmax over scores (M-ARGMAX, on a respelled reply whose chosen candidate is not the
 *    best-scored one).
 *  B1: a deterministic reply's keyed scores are recorded verbatim, keys and words in the reply's own order, for the reply and
 *    for its reversed respelling; a host that rewrites the words (M-SCORES) fails both, one that sorts the keys (M-SORTED)
 *    fails the reversed one.
 *  C1: the mapped host action is a separate field (proposal, host action, target) beside the symbolic proposal, and it exists
 *    only beside a permit decideControl minted for exactly that action and target under the exact control:furnace.stop grant;
 *    the same proposal under another control grant, or an observer grant only, records the core's deny policy and no mapped
 *    action and no permit, so the exact-grant rule is exercised, not only named (finding F1).
 *  D1: a proposal outside the exported support (the support the host offered, taken as the receipt's own candidates, and the
 *    legal support the receipt carries) is refused at the support with no mapped action, for an unknown id and five near misses (NEAR: letter case, a prefix, an extension, leading
 *    padding, and an unknown id the reply adds to its own support); a nearest-match host (M-NEAREST) maps every one, and a
 *    host that checks only the reply's support (M-REPLY-SUPPORT) maps exactly the widened one.
 *  E1: the host record written to the audit as one JSON line and read back never issues a verb: its decision in each audit
 *    replay form (LOOK_ALIKES) is refused by executeFurnaceControl with the typed unvetted-decision refusal, category
 *    validation, the core's provenance text CONTROL_UNMINTED_REASON, no policy and no native call, and isCoreMintedDecision
 *    answers false for it. Of the forms, exactly the deep-frozen replay passes the adapter's structural vetting (the unfrozen
 *    ones fail its frozen-shape check), so provenance alone refuses it (refusal #1, U1). The genuine permit, through the same
 *    counting fake, issues exactly one call (the drive's positive control, so a refusal is never a dead fake), and a host
 *    that trusts the deep-frozen replay of its own permit (M-REPLAY) is refused at the provenance check.
 *  E2: the replay forms are the landed wb-pjj suite's: test/workbench-control-provenance.test.ts, read through the TypeScript
 *    parser, names exactly LOOK_ALIKES as its audit-replay look-alikes (the lookAlikes entry for a decision replayed from the
 *    audit, and each look-alike of its case that refuses a JSON round-trip as the audit or the journal would hand it back),
 *    each built by the same call chain over the genuine permit.
 *  Q1, Q2: the RESIDUALS below.
 * RESIDUALS (named families, each member a pinned quiet row; a reader that starts reading a member reds its row):
 *  R-SYNTHETIC-DETERMINISTIC (Q1): B judges a synthetic deterministic reply, the vendored stochastic receipt's own candidates
 *    keyed to its own score words, because this census holds no gp eval reply; the vendored gp capability capture's help names
 *    gp eval, so the deterministic arm exists upstream, and a real eval reply's own shape is unread here. Its row pins the
 *    synthetic reply's provenance, the scores-only record with no producer receipt, and the captured eval help line.
 *  R-UNREAD-CONSUMER (Q2): a src GP-score consumer row T's reader cannot read: scores a caller hands in under no GP spelling
 *    (handed-scores), a launch whose program name is composed at run time (composed-launch) and an abbreviated client name
 *    (abbreviated-client). Its row pins each member quiet on all three arms and its twin, the same consumer with one read
 *    spelling, read.
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS and each residual family's member
 * count as literals, beside the mutants, the prohibitions, the replay forms, the near misses, the plants, the grant sets, the
 * receipt tokens and the bindings; the judged set (every row's id, label and pins, every pin's quote and witness, the residual
 * members, every registered test title) is held to the out-of-file roster test/fixtures/gp-score-receipt-roster.json.
 * OUTSIDE ANCHORS (their own registered case): the bead's own row in the tracker export (.beads/issues.jsonl): the title opens
 * with the requirement tag and row T's label before its artifact parenthetical; the first notes line opening "Citation: "
 * names the producer pins, says "Design-only; no Pi surface named" and holds the Acceptance sentence, whose five clauses are
 * exactly the labels of rows A to E; each of those rows' pins quote its clause's parts, so a pin merged into its neighbour reds
 * (refusal #1, F2 C6-mergeA); the prohibitions are the clause A parenthetical's items; a tracker note appended later binds
 * nothing. The control core at the bead's Pi pin carries the permit policy at control.ts:17, decideControl at :210 and
 * isCoreMintedDecision at :255, and the control core at HEAD still exports the pin's permit policy name. The vendored receipt
 * carries the receipt schema and kind, its graph_digest is the sha256 of the snapshot fixture's bytes, its generator is
 * sourceSha 3f7d52cd at its recorded take and records its candidates input by digest only (path, blob, sha256), and its
 * validation is valid over the compact bytes with the recorded log probability equal to the sample's.
 * NOT CLAIMED: qa/, test/, docs/ and any tree outside src/ (a test names the vocabulary as the text it judges, this census
 * included); a GP consumer the reader cannot read beyond row Q2's members; the reply's numbers and the vendored fixtures'
 * integrity (gp's own inspect, and test/workbench-gp-provenance-census.test.ts); a host computation that writes back the same
 * bytes (byte identity is the observable; M-RESERIALIZE over the compact bytes is that case); the other control adapters
 * (wb-pjj's own suite drives them); a replayed producer receipt handed to a host as a fresh reply (that is a new decision
 * decideControl judges anew; no permit is replayed); the title's typed executor request path (decideControl mints control
 * verbs only, so C1 judges the decideControl path); decideControl's other rules (scope, ownership, operator confirmation and
 * the rest: the control core's own suite, test/workbench-control.test.ts), since C1 exercises the exact-grant and
 * observer-only denials only; a mutant, a near miss, a plant, a grant set, a residual member or row Q
 * removed from its table, the frozen literal and the roster together (no source outside this cut names them); a pin's case
 * replaced by one that echoes its roster witness (the witness form, refusal #1 F3); and the armed host's own shape: the first
 * Pi consumer binds its module in SRC_BINDINGS and re-measures rows A to E against it.
 * OVER-READS: arms (ii) and (iii) read comments and identifiers, and arm (i) reads every string that names graph policy, so a
 * src comment or message that merely names a member reds T1 (disclosed: no src module spells one today).
 *
 * Display paths added: none. Test-only: no src change, no GraphPolicyCLI dependency, adapter, seam or fake binary.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  CONTROL_PERMIT_POLICY,
  CONTROL_UNMINTED_REASON,
  type ControlDecision,
  decideControl,
  isCoreMintedDecision,
  type NativeControlRequest,
} from "../src/workbench/control.js";
import { executeFurnaceControl, type FurnaceControlClient, FurnaceControlRefusal, vetFurnaceControlDecision } from "../src/workbench/furnace-control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { callSites } from "./helpers/gp-control-loop-audit.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-0lf.5";
const TAG = "FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R9";
const EXPORT = ".beads/issues.jsonl";
const RECEIPT_FILE = "test/fixtures/gp-sample-receipt.json";
const SNAPSHOT_FILE = "test/fixtures/gp-host-adapter-snapshot.json";
const CAPTURE_FILE = "test/fixtures/gp-capability-capture.json";
const ROSTER_FILE = "test/fixtures/gp-score-receipt-roster.json";
/** The landed wb-pjj suite whose look-alike test pattern clause E names. */
const PJJ_SUITE = "test/workbench-control-provenance.test.ts";
const CORE = "src/workbench/control.ts";
/** The ReactiveFiber provider's real child-process launch, which arm (i) must read once it is respelled as gp. */
const RF_PROVIDER = "src/workbench/providers/reactivefiber.ts";
const RF_SPAWN = /spawn\(\s*"rf"\s*,/g;
const PI_PIN = "758ec18187a5d66ba40b766caad38754b5313558";
const PROVIDER_PIN = "0f791db71b9d";
const GENERATOR_SHA = "3f7d52cd17397d8ed22e2c768714a057fe098b62";
/** src holds well over this many files; fewer means the listing read nothing. */
const SRC_FLOOR = 100;
const BUDGET_MS = 120_000;

const read = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const git = (...args: readonly string[]): string => execFileSync("git", [...args], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
const sha256 = (bytes: string): string => createHash("sha256").update(bytes).digest("hex");
/** An own data property; an accessor is never invoked and an inherited value never counts. */
const own = (value: unknown, key: string): unknown =>
  typeof value === "object" && value !== null ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
const writable = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const strings = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every((entry: unknown) => typeof entry === "string");
const listOf = (value: unknown): readonly string[] => (strings(value) ? value : []);
const parse = (bytes: string): unknown => {
  try {
    return JSON.parse(bytes);
  } catch {
    return undefined;
  }
};
/** Freezes every nested object, so the adapter's structural vetting cannot tell a copy from the original (the wb-pjj helper). */
function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    for (const key of Reflect.ownKeys(value)) deepFreeze(Reflect.get(value, key));
    Object.freeze(value);
  }
  return value;
}

// ---- the vendored reply (gp sample's result.decision, wb-gxd7.5), the snapshot it was sampled over and gp's captured help ----

const VENDORED: unknown = JSON.parse(read(RECEIPT_FILE));
const REPLY: unknown = own(VENDORED, "receipt");
const CAPTURE: unknown = JSON.parse(read(CAPTURE_FILE));
const SNAPSHOT = read(SNAPSHOT_FILE);
const RECEIPT_SCHEMA = "graphpolicy.receipt.decision.v1";
const RECEIPT_KIND = "sampled-decision";
/** The compact bytes the producer's validation read, and an indented respelling of the same receipt. */
const RAW = JSON.stringify(REPLY);
const INDENTED = JSON.stringify(REPLY, null, 2);
const SUPPORT = listOf(own(REPLY, "candidates"));
const SCORE_WORDS = listOf(own(REPLY, "scores"));
const LOG_WORDS = listOf(own(REPLY, "log_probabilities"));
const CHOICE = String(own(own(REPLY, "sample"), "chosen_id"));
/** The support the host exported to GP: the receipt's own candidates (the generator records its candidates input by digest only). */
const OFFERED: readonly string[] = [...SUPPORT];
type Keyed = readonly (readonly [string, string])[];
/** R-SYNTHETIC-DETERMINISTIC: the vendored stochastic receipt's candidates keyed to its own score words; not gp eval output. */
const SCORE_KEYS: Keyed = SUPPORT.map((candidate, index) => [candidate, SCORE_WORDS[index] ?? ""] as const);

const WORD = new DataView(new ArrayBuffer(4));
function binary32(hex: string): number {
  WORD.setUint32(0, Number.parseInt(hex, 16));
  return WORD.getFloat32(0);
}
function hex32(value: number): string {
  WORD.setFloat32(0, value);
  return WORD.getUint32(0).toString(16).padStart(8, "0");
}
/** The vendored reply changed by `edit`, as compact bytes, so a respelled reply's bytes and content never diverge. */
function respelled(edit: (reply: Record<string, unknown>, sample: Record<string, unknown>) => void): string {
  const copy: unknown = JSON.parse(RAW);
  const sample = own(copy, "sample");
  if (writable(copy) && writable(sample)) edit(copy, sample);
  return JSON.stringify(copy);
}
/** The reply naming another choice, with that candidate's own log probability word when it is a candidate. */
function rechosen(choice: string): string {
  return respelled((_reply, sample) => {
    sample.chosen_id = choice;
    const index = SUPPORT.indexOf(choice);
    if (index >= 0 && LOG_WORDS[index] !== undefined) sample.log_probability = LOG_WORDS[index];
  });
}
/** The reply adding `extra` to its own support (with a score word) and choosing it. */
function widened(extra: string): string {
  return respelled((reply, sample) => {
    reply.candidates = [...SUPPORT, extra];
    reply.scores = [...SCORE_WORDS, SCORE_WORDS[0] ?? ""];
    sample.chosen_id = extra;
  });
}
/** A reply whose chosen candidate is not the best-scored one, so a host-side argmax is observable. */
const ALT = rechosen(SUPPORT[1] ?? "");
const UNKNOWN = "exec-outside-export";

// ---- the armed host: the census's reading of a Pi GP consumer (fixture only; nothing registers or wires it) ----

const WS = "/work/gp-score-receipt";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
const RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-score-fixture", scope: WS };
const ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-score-fixture", scope: WS };
const AT = "2026-10-28T00:00:00Z";
const REQUESTED = "2026-10-28T00:00:01Z";
const DECIDED = "2026-10-28T00:00:02Z";
const EXACT_GRANTS: readonly string[] = ["observe:furnace.run.inspect", "control:furnace.stop"];
/** Grant sets decideControl must deny for the mapped stop: another control grant, and an observer grant only. */
const GRANT_SETS: Readonly<Record<string, readonly string[]>> = {
  "other-control-grant": ["observe:furnace.run.inspect", "control:furnace.pause"],
  "observer-only": ["observe:furnace.run.inspect"],
};
/** The host's uniform for a re-sampling mutant: over the receipt's probabilities it lands on the last candidate. */
const HOST_UNIFORM = 0.9;

type Reply = { readonly kind: "stochastic"; readonly bytes: string } | { readonly kind: "deterministic"; readonly scores: Keyed };
const stochastic = (bytes: string): Reply => ({ kind: "stochastic", bytes });
interface Mapping {
  readonly proposal: string;
  readonly hostAction: "stop";
  readonly target: NativeRef;
}
interface HostRecord {
  readonly outcome: "mapped" | "refused" | "scores-only";
  readonly field?: "receipt" | "support" | "authority" | "provenance";
  readonly policy?: string;
  readonly keyedScores: Keyed;
  readonly proposal?: string;
  /** The producer's bytes as the host was handed them, never re-serialized. */
  readonly producerReceipt?: string;
  readonly mappedAction?: Mapping;
  readonly permit?: ControlDecision;
}
/** A host mutant's departures from the honest host, one per named mutant. */
interface Shape {
  readonly reserialize?: boolean;
  readonly renormalize?: boolean;
  readonly resample?: boolean;
  readonly argmax?: boolean;
  readonly rewriteScores?: boolean;
  readonly sortScores?: boolean;
  readonly nearest?: boolean;
  readonly replySupportOnly?: boolean;
  readonly trustReplay?: boolean;
}
const MUTANTS: Readonly<Record<string, Shape>> = {
  "M-RESERIALIZE": { reserialize: true },
  "M-RENORMALIZE": { renormalize: true },
  "M-RESAMPLE": { resample: true },
  "M-ARGMAX": { argmax: true },
  "M-SCORES": { rewriteScores: true },
  "M-SORTED": { sortScores: true },
  "M-NEAREST": { nearest: true },
  "M-REPLY-SUPPORT": { replySupportOnly: true },
  "M-REPLAY": { trustReplay: true },
};
/** Clause A's parenthetical, item by item, and the host mutant each item forbids. */
const PROHIBITIONS: Readonly<Record<string, string>> = {
  "no renormalization": "M-RENORMALIZE",
  "no re-sampling": "M-RESAMPLE",
  "no host-side argmax over scores": "M-ARGMAX",
};
/** The reply each prohibition's mutant is judged on: argmax is observable only on a reply whose choice is not the best-scored. */
const PROHIBITION_REPLY: Readonly<Record<string, string>> = { "M-RENORMALIZE": RAW, "M-RESAMPLE": RAW, "M-ARGMAX": ALT };

function mutantShape(name: string): Shape {
  const shape = MUTANTS[name];
  if (shape === undefined) throw new Error(`no mutant named ${name}`);
  return shape;
}
function projection(): ObservationProjection {
  const view = new ObservationProjection();
  for (const ref of [RUN, ATTEMPT]) {
    view.refresh({ source: ref, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: "furnace.snapshot",
      node: { title: "synthetic run", type: "workflow", statusText: "active", statusTone: "active" } });
  }
  view.relate({ scope: SCOPE, from: RUN, to: ATTEMPT, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "frn-req-score-fixture" } });
  return view;
}
function stopRequest(candidate: string, grants: readonly string[]): NativeControlRequest {
  return { scope: SCOPE, principal: { id: SCOPE.principal, role: "local-operator" }, grants: [...grants], target: RUN, action: "stop",
    params: { confirmed: true }, invocationId: `inv-score-${candidate}`, requestedAt: REQUESTED };
}
/** M-RESAMPLE: a host draw over the receipt's binary32 probabilities with the host's own uniform. */
function redrawn(support: readonly string[], probabilities: readonly string[]): string {
  let cumulative = 0;
  for (const [index, word] of probabilities.entries()) {
    cumulative += binary32(word);
    if (HOST_UNIFORM < cumulative) return support[index] ?? "";
  }
  return support[support.length - 1] ?? "";
}
/** M-ARGMAX: the best-scored candidate. */
function bestScored(support: readonly string[], scores: readonly string[]): string {
  let best = 0;
  for (const [index, word] of scores.entries()) if (binary32(word) > binary32(scores[best] ?? "")) best = index;
  return support[best] ?? "";
}
/** M-NEAREST: the offered candidate nearest the proposal (letter case and padding folded, then a prefix either way, then the first). */
function nearest(proposal: string): string {
  const folded = proposal.trim().toLowerCase();
  return OFFERED.find(candidate => candidate.toLowerCase() === folded) ??
    OFFERED.find(candidate => candidate.startsWith(folded) || folded.startsWith(candidate)) ?? OFFERED[0] ?? "";
}
/** M-RENORMALIZE: the receipt with its probability words divided by their float64 sum and re-encoded in binary32. */
function renormalized(parsed: unknown): string {
  const values = listOf(own(parsed, "probabilities")).map(binary32);
  const total = values.reduce((sum, value) => sum + value, 0);
  return JSON.stringify({ ...(writable(parsed) ? parsed : {}), probabilities: values.map(value => hex32(value / total)) });
}
const byKey = (left: readonly [string, string], right: readonly [string, string]): number => (left[0] < right[0] ? -1 : left[0] > right[0] ? 1 : 0);

/** The pure fixture host. It is not a GP consumer; SRC_BINDINGS stays empty until a released seam exists. */
function host(reply: Reply, shape: Shape = {}, grants: readonly string[] = EXACT_GRANTS): HostRecord {
  if (reply.kind === "deterministic") {
    const words: Keyed = reply.scores.map(([key, value]) => [key, shape.rewriteScores ? value.toUpperCase() : value] as const);
    return { outcome: "scores-only", keyedScores: shape.sortScores ? [...words].sort(byKey) : words };
  }
  const parsed = parse(reply.bytes);
  const support = own(parsed, "candidates");
  const scores = own(parsed, "scores");
  const sample = own(parsed, "sample");
  const chosen = own(sample, "chosen_id");
  if (own(parsed, "schema") !== RECEIPT_SCHEMA || own(parsed, "kind") !== RECEIPT_KIND || !strings(support) || !strings(scores) ||
    typeof chosen !== "string" || typeof own(sample, "log_probability") !== "string") {
    return { outcome: "refused", field: "receipt", keyedScores: [] };
  }
  const keyedScores: Keyed = support.map((candidate, index) => [candidate, scores[index] ?? ""] as const);
  const proposal = shape.resample ? redrawn(support, listOf(own(parsed, "probabilities"))) : shape.argmax ? bestScored(support, scores) : chosen;
  const candidate = shape.nearest ? nearest(proposal) : proposal;
  const kept = { keyedScores, proposal, producerReceipt: reply.bytes };
  if (!support.includes(candidate) || (!shape.replySupportOnly && !OFFERED.includes(candidate))) return { outcome: "refused", field: "support", ...kept };
  const decision = decideControl(stopRequest(candidate, grants), { projection: projection(), now: () => DECIDED });
  if (decision.decision !== "permitted") return { outcome: "refused", field: "authority", policy: decision.policy, ...kept };
  const held: unknown = shape.trustReplay ? deepFreeze(JSON.parse(JSON.stringify(decision))) : decision;
  if (!isCoreMintedDecision(held)) return { outcome: "refused", field: "provenance", ...kept };
  const producerReceipt = shape.renormalize ? renormalized(parsed) : shape.reserialize ? JSON.stringify(parsed) : reply.bytes;
  return { outcome: "mapped", keyedScores, proposal, producerReceipt, mappedAction: { proposal: candidate, hostAction: "stop", target: RUN }, permit: decision };
}
/** Clause A's reading of a host record for the bytes it was handed: the bytes kept verbatim, and the reply's own choice proposed. */
function clauseA(result: HostRecord, bytes: string): { readonly bytes: boolean; readonly choice: boolean } {
  return { bytes: result.producerReceipt === bytes, choice: result.proposal === own(own(parse(bytes), "sample"), "chosen_id") };
}
/** One host record, as D1 reads it: refused with its field, or mapped with the candidate it mapped. */
function supportReading(result: HostRecord): string {
  return result.mappedAction === undefined ? `${result.outcome}:${result.field ?? ""}` : `mapped:${result.mappedAction.proposal}`;
}

/** D1's proposals outside the exported support: an unknown id and five near misses. */
const NEAR: Readonly<Record<string, string>> = {
  unknown: rechosen(UNKNOWN),
  "letter-case": rechosen(CHOICE.toUpperCase()),
  prefix: rechosen(CHOICE.slice(0, -1)),
  extension: rechosen(`${CHOICE}x`),
  padding: rechosen(` ${CHOICE}`),
  "widened-support": widened(UNKNOWN),
};

// ---- row E: the audit replay forms (the wb-pjj look-alike pattern) and the counting fake ----

type Step = "jsonRoundTrip" | "deepFreeze";
const STEPS: Readonly<Record<Step, (value: unknown) => unknown>> = {
  jsonRoundTrip: value => JSON.parse(JSON.stringify(value)),
  deepFreeze: value => deepFreeze(value),
};
/** Each replay form's call chain over the genuine permit, outermost first, as the landed wb-pjj suite builds it. */
const LOOK_ALIKES: Readonly<Record<string, readonly Step[]>> = {
  "deep-frozen JSON round-trip (a decision replayed from the audit or the journal)": ["deepFreeze", "jsonRoundTrip"],
  "JSON round-trip": ["jsonRoundTrip"],
  "double JSON round-trip": ["jsonRoundTrip", "jsonRoundTrip"],
};
/** A replay form applied to an audit line: its innermost round trip is the audit's own (the record written and read back). */
function replayOf(audited: string, chain: readonly Step[]): unknown {
  const steps = [...chain].reverse();
  if (steps[0] !== "jsonRoundTrip") throw new Error("an audit replay form starts from the audit's JSON round trip");
  let value: unknown = own(JSON.parse(audited), "permit");
  for (const step of steps.slice(1)) value = STEPS[step](value);
  return value;
}
const vets = (decision: unknown): boolean => {
  try {
    vetFurnaceControlDecision(decision);
    return true;
  } catch {
    return false;
  }
};
type Reading = Readonly<Record<string, string | number | boolean | null>>;
/** Executes a decision against a fresh counting fake; every call it is asked to issue counts, and each one rejects. */
async function attempt(decision: unknown): Promise<Reading> {
  let calls = 0;
  const answer = async (): Promise<never> => {
    calls += 1;
    throw new Error("fake effect was issued");
  };
  const client: FurnaceControlClient = { runs: { pause: answer, stop: answer, resume: answer }, attempts: { stop: answer } };
  try {
    const execution = await executeFurnaceControl(decision as ControlDecision, { client, workspaceRoot: WS, now: () => AT, timeoutMs: 1000 });
    return { outcome: "resolved", status: execution.status, reason: execution.uncertainty?.reason ?? null, calls };
  } catch (error) {
    if (!(error instanceof FurnaceControlRefusal)) throw error;
    return { outcome: "refused", refusal: error.refusal, category: error.category, message: error.message, policy: error.policy ?? null, calls };
  }
}
/** The landed wb-pjj suite's audit replay forms, label to call chain over `genuine` (outermost first), read through the parser. */
function landedAuditForms(): Record<string, string[]> {
  const source = ts.createSourceFile(PJJ_SUITE, read(PJJ_SUITE), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const forms: Record<string, string[]> = {};
  const chain = (node: ts.Expression | undefined): string[] | undefined => {
    if (node === undefined) return undefined;
    if (ts.isIdentifier(node)) return node.text === "genuine" ? [] : undefined;
    if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression) || node.arguments.length !== 1) return undefined;
    const inner = chain(node.arguments[0]);
    return inner === undefined ? undefined : [node.expression.text, ...inner];
  };
  const auditCase = (node: ts.Node): boolean => {
    if (!ts.isCallExpression(node) || !ts.isIdentifier(node.expression) || node.expression.text !== "it") return false;
    const title = node.arguments[0];
    return title !== undefined && ts.isStringLiteral(title) && title.text.includes("as the audit or the journal would hand it back");
  };
  const visit = (node: ts.Node, inAuditCase: boolean): void => {
    if (ts.isArrayLiteralExpression(node) && node.elements.length === 2) {
      const [label, value] = node.elements;
      const found = ts.isStringLiteral(label) && label.text.includes("replayed from the audit") ? chain(value) : undefined;
      if (found !== undefined && ts.isStringLiteral(label)) forms[label.text] = found;
    }
    if (inAuditCase && ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "expectUnminted" && node.arguments.length === 2) {
      const [awaited, label] = node.arguments;
      const call = ts.isAwaitExpression(awaited) ? awaited.expression : undefined;
      const found = call !== undefined && ts.isCallExpression(call) && call.arguments.length === 1 ? chain(call.arguments[0]) : undefined;
      if (found !== undefined && ts.isStringLiteral(label)) forms[label.text] = found;
    }
    const nested = inAuditCase || auditCase(node);
    ts.forEachChild(node, child => visit(child, nested));
  };
  visit(source, false);
  return forms;
}

// ---- row T: the reader ----

const RECEIPT_TOKENS = ["GraphPolicyCLI", "GraphDataIR", "graphpolicy.receipt.decision.v1", "sampled-decision", "log_probabilities", "log_probability", "chosen_id"] as const;
const escaped = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tokenPattern = (word: string): RegExp => new RegExp(`(?<![A-Za-z0-9_$])${escaped(word)}(?![A-Za-z0-9_$])`);
/** Arm (ii): graph policy or graph data IR at a word start, any letter case, one separator or none. */
const FAMILY = /(?<![A-Za-z0-9])graph[-_. ]?(?:policy|data[-_. ]?ir)/gi;
interface ReaderReading {
  readonly sites: readonly string[];
  readonly family: readonly string[];
  readonly tokens: readonly string[];
}
/** What row T's reader reads in one module: arm (i)'s call sites, arm (ii)'s spellings and arm (iii)'s receipt members. */
function readerOf(path: string, text: string): ReaderReading {
  return {
    sites: callSites(new Map([[path, text]])).map(site => `${site.line}:${site.shape}:${site.text}`),
    family: [...new Set([...text.matchAll(FAMILY)].map(match => match[0]))],
    tokens: RECEIPT_TOKENS.filter(word => tokenPattern(word).test(text)),
  };
}
const readsAny = (reading: ReaderReading): boolean => reading.sites.length + reading.family.length + reading.tokens.length > 0;
/** The src modules that host a GP consumer: none until a released seam exists (frozen in the rule-16 case). */
const SRC_BINDINGS: readonly string[] = [];
interface Entry {
  readonly path: string;
  readonly text: string;
}
let srcCache: readonly Entry[] | undefined;
/** git's would-commit listing under src/ (tracked and untracked, never ignored, present in the tree), each with its text. */
function srcEntries(): readonly Entry[] {
  if (srcCache === undefined) {
    const listed = git("ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src");
    const paths = [...new Set(listed.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
    srcCache = paths.map(path => ({ path, text: read(path) }));
  }
  return srcCache;
}
/** T1's planted controls: each arm reads its own, and the near tokens are read by none. */
const PLANTS: Readonly<Record<string, string>> = {
  "eval-consumer": [
    'const stdout = execFileSync("gp", ["eval", program, "--graph", graph, "--json"], { encoding: "utf8" });',
    "const envelope = JSON.parse(stdout);",
    'if (envelope.schema !== "graphpolicy.cli.v1") throw new Error("unexpected envelope");',
    "const proposal = [...Object.entries(envelope.result.scores)].sort((a, b) => b[1] - a[1])[0]?.[0];",
    "",
  ].join("\n"),
  "rpc-reply": 'if (hello.protocol === "graphpolicy.rpc.v1" && reply.schema === "gp.rpc.reply/v1" && reply.ok) return reply.result.scores;\n',
  "module-import": 'import { evaluate } from "graph-policy-cli";\nimport { sample } from "gp/sdk";\n',
  "client-name": "// the graph policy client\nconst scores = graphPolicyClient.evaluate(graph_data_ir);\n",
  "receipt-member": "// keeps log_probability verbatim\nconst proposal = receipt.sample.chosen_id;\n",
  "near-tokens": 'const gpu = "gpu";\nconst chosen_ids = [];\nconst log_probability_value = 0;\nconst Chosen_ID = 0;\n// a paragraph policy\n',
};
/** R-UNREAD-CONSUMER: GP-score consumers the reader cannot read, each beside its twin (the same consumer with one read spelling). */
const UNREAD: Readonly<Record<string, { readonly member: string; readonly twin: string }>> = {
  "handed-scores": {
    member: "export function propose(scores: ReadonlyMap<string, number>): string | undefined {\n  return [...scores].sort((a, b) => b[1] - a[1])[0]?.[0];\n}\n",
    twin: 'export function propose(reply: Reply): string | undefined {\n  if (reply.schema !== "graphpolicy.cli.v1") return undefined;\n  return [...reply.scores].sort((a, b) => b[1] - a[1])[0]?.[0];\n}\n',
  },
  "composed-launch": {
    member: 'const program = ["g", "p"].join("");\nconst stdout = execFileSync(program, ["eval", "--json"], { encoding: "utf8" });\n',
    twin: 'const stdout = execFileSync("gp", ["eval", "--json"], { encoding: "utf8" });\n',
  },
  "abbreviated-client": {
    member: "const best = gpClient.evaluate(graph).best;\n",
    twin: "const best = graphPolicyClient.evaluate(graph).best;\n",
  },
};

// ---- rows, quotes and cases ----

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  { id: "T", label: "When Pi consumes GP scores", pins: ["T1"] },
  {
    id: "A",
    label: "a fixture stochastic reply round-trips through the host with support order and log probability byte-identical in the receipt (no renormalization, no re-sampling, no host-side argmax over scores)",
    pins: ["A1", "A2"],
  },
  { id: "B", label: "a deterministic reply records keyed scores verbatim", pins: ["B1"] },
  { id: "C", label: "the mapped host action is recorded as a separate field beside the symbolic proposal", pins: ["C1"] },
  { id: "D", label: "a proposal naming an action outside the exported support is refused, never mapped by nearest match", pins: ["D1"] },
  { id: "E", label: "a receipt replayed from the audit never issues a verb (wb-pjj look-alike test pattern)", pins: ["E1", "E2"] },
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2"] },
];
/** The rows that are the owner filing's Acceptance clauses. */
const CLAUSE_ROWS: readonly string[] = ["A", "B", "C", "D", "E"];
const PINS: readonly string[] = ROWS.flatMap(row => row.pins);
const QUOTES: Readonly<Record<string, string>> = {
  T1: "When Pi consumes GP scores",
  A1: "a fixture stochastic reply round-trips through the host with support order and log probability byte-identical in the receipt",
  A2: "(no renormalization, no re-sampling, no host-side argmax over scores)",
  B1: "a deterministic reply records keyed scores verbatim",
  C1: "the mapped host action is recorded as a separate field beside the symbolic proposal",
  D1: "a proposal naming an action outside the exported support is refused, never mapped by nearest match",
  E1: "a receipt replayed from the audit never issues a verb",
  E2: "(wb-pjj look-alike test pattern)",
  Q1: "R-SYNTHETIC-DETERMINISTIC",
  Q2: "R-UNREAD-CONSUMER",
};
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  Q1: ["synthetic-keyed-scores"],
  Q2: Object.keys(UNREAD),
};
/** The refusal every audit replay form must read: provenance first, the core's fixed text, no echoed policy, no native call. */
const UNMINTED_READING: Reading = {
  minted: false, outcome: "refused", refusal: "unvetted-decision", category: "validation", message: CONTROL_UNMINTED_REASON, policy: null, calls: 0,
};
/** A clause's parts: the clause, or the text before its final parenthetical and the parenthetical itself. */
function parts(clause: string): string[] {
  const match = /^(.*\S) (\([^()]*\))$/.exec(clause);
  return match === null ? [clause] : [match[1] ?? "", match[2] ?? ""];
}
/** A parenthetical's items. */
const items = (parenthetical: string): string[] => parenthetical.replace(/^\(|\)$/g, "").split(", ");

const CASES: Readonly<Record<string, () => unknown>> = {
  T1: () => {
    const src = srcEntries();
    const readings = src.flatMap(entry => {
      const reading = readerOf(entry.path, entry.text);
      return readsAny(reading) ? [{ path: entry.path, reading }] : [];
    });
    expect(readings, "no src module is read as a GP consumer").toEqual([]);
    expect(readings.map(entry => entry.path), "the src modules read are exactly the bound consumers").toEqual(SRC_BINDINGS);
    const srcFloor = src.length >= SRC_FLOOR;
    expect(srcFloor, "the src floor").toBe(true);
    const readsCore = src.find(entry => entry.path === CORE)?.text.includes("export function isCoreMintedDecision(") === true;
    expect(readsCore, "the listing read the control core's real text").toBe(true);
    const rf = src.find(entry => entry.path === RF_PROVIDER)?.text ?? "";
    const launches = [...rf.matchAll(RF_SPAWN)].map(match => rf.slice(0, match.index).split("\n").length);
    expect(launches.length, `${RF_PROVIDER} no longer spawns "rf" by a literal; point this control at another real launch`).toBeGreaterThan(0);
    const respelledLaunches = readerOf(RF_PROVIDER, rf.replace(RF_SPAWN, 'spawn("gp",')).sites;
    expect(respelledLaunches, "arm (i) reads the real rf launch respelled as gp, at its own lines").toEqual(launches.map(line => `${line}:binary:gp`));
    const plants = Object.fromEntries(Object.entries(PLANTS).map(([name, text]) => [name, readerOf("src/plant.ts", text)]));
    const quiet = Object.entries(plants).filter(([, reading]) => !readsAny(reading)).map(([name]) => name);
    expect(quiet, "every plant but the near tokens is read").toEqual(["near-tokens"]);
    return { bound: SRC_BINDINGS, hits: readings.map(entry => entry.path), srcFloor, readsCore, rfLaunchRead: respelledLaunches.length === launches.length, plants };
  },
  A1: () => {
    const forms: Readonly<Record<string, string>> = { compact: RAW, indented: INDENTED };
    const honest = Object.fromEntries(Object.entries(forms).map(([name, bytes]) => [name, clauseA(host(stochastic(bytes)), bytes)]));
    const reserialized = Object.fromEntries(Object.entries(forms).map(([name, bytes]) => [name, clauseA(host(stochastic(bytes), mutantShape("M-RESERIALIZE")), bytes)]));
    for (const [name, reading] of Object.entries(honest)) expect(reading, `the ${name} bytes are kept and the reply's choice proposed`).toStrictEqual({ bytes: true, choice: true });
    expect(reserialized, "a re-serializing host keeps the compact bytes by coincidence and loses the indented ones").toStrictEqual({
      compact: { bytes: true, choice: true }, indented: { bytes: false, choice: true },
    });
    const record = host(stochastic(RAW));
    const kept: unknown = parse(record.producerReceipt ?? "");
    const fields = ["candidates", "support_order", "scores", "probabilities", "log_probabilities"];
    for (const field of fields) expect(own(kept, field), `${field} round-trips`).toStrictEqual(own(REPLY, field));
    expect(own(own(kept, "sample"), "log_probability"), "the sample's log probability round-trips").toBe(own(own(REPLY, "sample"), "log_probability"));
    expect(record.keyedScores, "the stochastic record keeps the receipt's candidates keyed to its own score words").toStrictEqual(SCORE_KEYS);
    return {
      honest, reserialized, support: own(kept, "candidates"), supportOrder: own(kept, "support_order"), logProbability: own(own(kept, "sample"), "log_probability"),
      keyedScores: record.keyedScores,
    };
  },
  A2: () => {
    const readings = Object.fromEntries(Object.entries(PROHIBITIONS).map(([prohibition, name]) => {
      const bytes = PROHIBITION_REPLY[name] ?? RAW;
      return [prohibition, { mutant: name, honest: clauseA(host(stochastic(bytes)), bytes), mutated: clauseA(host(stochastic(bytes), mutantShape(name)), bytes) }];
    }));
    for (const [prohibition, reading] of Object.entries(readings)) {
      expect(reading.honest, `the honest host meets clause A on the ${reading.mutant} reply`).toStrictEqual({ bytes: true, choice: true });
      expect(Object.values(reading.mutated), `${reading.mutant} (${prohibition}) fails clause A`).toContain(false);
    }
    return readings;
  },
  B1: () => {
    const replies: Readonly<Record<string, Keyed>> = { reply: SCORE_KEYS, reversed: [...SCORE_KEYS].reverse() };
    const honest = Object.fromEntries(Object.entries(replies).map(([name, scores]) => [name, host({ kind: "deterministic", scores })]));
    for (const [name, scores] of Object.entries(replies)) expect(honest[name], `the ${name} keyed scores are recorded verbatim`).toStrictEqual({ outcome: "scores-only", keyedScores: scores });
    const caught = Object.fromEntries(["M-SCORES", "M-SORTED"].map(name => [name, Object.entries(replies)
      .filter(([, scores]) => !isDeepStrictEqual(host({ kind: "deterministic", scores }, mutantShape(name)).keyedScores, scores)).map(([reply]) => reply)]));
    expect(caught, "a word rewrite fails both replies; a key sort fails the reversed one").toStrictEqual({ "M-SCORES": ["reply", "reversed"], "M-SORTED": ["reversed"] });
    return { honest, caught };
  },
  C1: () => {
    const mapped = host(stochastic(RAW));
    expect(mapped.outcome).toBe("mapped");
    expect(mapped.proposal, "the symbolic proposal is the reply's choice").toBe(CHOICE);
    expect(mapped.mappedAction, "the mapped host action is its own field").toStrictEqual({ proposal: CHOICE, hostAction: "stop", target: RUN });
    const permit = mapped.permit;
    expect(permit !== undefined && isCoreMintedDecision(permit), "the mapped action stands beside a core-minted permit").toBe(true);
    const receipt = permit?.decision === "permitted" ? permit.receipt : undefined;
    const permitted = { action: receipt?.action ?? null, target: receipt === undefined ? null : { ...receipt.target }, grant: receipt?.grant ?? null };
    expect(permitted, "the permit is for exactly the mapped action and target").toStrictEqual({ action: "stop", target: { ...RUN }, grant: "control:furnace.stop" });
    const denied = Object.fromEntries(Object.entries(GRANT_SETS).map(([name, grants]) => {
      const result = host(stochastic(RAW), {}, grants);
      return [name, { outcome: result.outcome, field: result.field ?? null, policy: result.policy ?? null, mapped: result.mappedAction !== undefined, permit: result.permit !== undefined }];
    }));
    expect(denied, "without the exact grant the same proposal maps to nothing").toStrictEqual({
      "other-control-grant": { outcome: "refused", field: "authority", policy: "missing-exact-grant", mapped: false, permit: false },
      "observer-only": { outcome: "refused", field: "authority", policy: "observer-only", mapped: false, permit: false },
    });
    return { proposal: mapped.proposal, mappedAction: mapped.mappedAction, permitted, denied };
  },
  D1: () => {
    const readingsOf = (shape: Shape): Record<string, string> =>
      Object.fromEntries(Object.entries(NEAR).map(([name, bytes]) => [name, supportReading(host(stochastic(bytes), shape))]));
    const honest = readingsOf({});
    for (const [name, reading] of Object.entries(honest)) expect(reading, `${name} is refused at the support`).toBe("refused:support");
    const nearestMatch = readingsOf(mutantShape("M-NEAREST"));
    const replySupport = readingsOf(mutantShape("M-REPLY-SUPPORT"));
    expect(Object.values(nearestMatch).filter(reading => !reading.startsWith("mapped:")), "a nearest-match host maps every one").toEqual([]);
    expect(Object.entries(replySupport).filter(([, reading]) => reading.startsWith("mapped:")).map(([name]) => name), "a reply-support host maps the widened one").toEqual(["widened-support"]);
    const proposals = Object.fromEntries(Object.entries(NEAR).map(([name, bytes]) => [name, own(own(parse(bytes), "sample"), "chosen_id")]));
    return { proposals, honest, nearestMatch, replySupport };
  },
  E1: async () => {
    const genuine = host(stochastic(RAW));
    const permit = genuine.permit;
    expect(permit !== undefined && isCoreMintedDecision(permit), "the genuine record holds a core-minted permit").toBe(true);
    const audited = JSON.stringify(genuine);
    const replays: Record<string, Reading> = {};
    const shapeExact: Record<string, boolean> = {};
    for (const [label, chain] of Object.entries(LOOK_ALIKES)) {
      const replayed = replayOf(audited, chain);
      shapeExact[label] = vets(replayed);
      replays[label] = { minted: isCoreMintedDecision(replayed), ...(await attempt(replayed)) };
    }
    for (const [label, reading] of Object.entries(replays)) expect(reading, `${label}: refused by provenance before any verb`).toStrictEqual(UNMINTED_READING);
    expect(Object.entries(shapeExact).filter(([, exact]) => exact).map(([label]) => label), "the deep-frozen replay passes structural vetting").toEqual([
      "deep-frozen JSON round-trip (a decision replayed from the audit or the journal)",
    ]);
    const live = await attempt(permit);
    expect(live, "the genuine permit issues exactly one call through the same counting fake").toStrictEqual({ outcome: "resolved", status: "uncertain", reason: "seam-failure", calls: 1 });
    const trusting = host(stochastic(RAW), mutantShape("M-REPLAY"));
    const trustReplay = { outcome: trusting.outcome, field: trusting.field ?? null, mapped: trusting.mappedAction !== undefined };
    expect(trustReplay, "a host trusting the deep-frozen replay of its own permit is refused at provenance").toStrictEqual({ outcome: "refused", field: "provenance", mapped: false });
    return { replays, shapeExact, genuine: live, trustReplay };
  },
  E2: () => {
    const landed = landedAuditForms();
    expect(landed, "the landed wb-pjj suite's audit replay forms are row E's").toEqual(LOOK_ALIKES);
    return { suite: PJJ_SUITE, forms: landed };
  },
  Q1: () => {
    const result = host({ kind: "deterministic", scores: SCORE_KEYS });
    const fromReceipt = isDeepStrictEqual(SCORE_KEYS.map(([key]) => key), [...SUPPORT]) && isDeepStrictEqual(SCORE_KEYS.map(([, value]) => value), [...SCORE_WORDS]);
    const evalHelp = listOf(own(own(CAPTURE, "help"), "commands")).filter(line => /^\s*gp eval\s/.test(line));
    expect(result, "R-SYNTHETIC-DETERMINISTIC: the B host records scores only, with no producer receipt").toStrictEqual({ outcome: "scores-only", keyedScores: SCORE_KEYS });
    expect(fromReceipt, "the synthetic reply is the vendored receipt's own candidates and score words").toBe(true);
    expect(evalHelp, "gp's captured help names gp eval, whose reply this census does not hold").toHaveLength(1);
    return { outcome: result.outcome, receipt: result.producerReceipt ?? null, fromReceipt, evalHelp };
  },
  Q2: () => {
    const readings = Object.fromEntries(Object.entries(UNREAD).map(([name, pair]) => [name, {
      member: readsAny(readerOf("src/unread.ts", pair.member)), twin: readsAny(readerOf("src/unread.ts", pair.twin)),
    }]));
    for (const [name, reading] of Object.entries(readings)) expect(reading, `R-UNREAD-CONSUMER ${name}: the member is quiet and its twin is read`).toStrictEqual({ member: false, twin: true });
    return readings;
  },
};

// ---- the judged set ----

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly witnesses: Readonly<Record<string, unknown>>;
  readonly tests: readonly string[];
}
const ROSTER = JSON.parse(read(ROSTER_FILE)) as Roster;
const REACHED: { readonly pin: string; readonly same: boolean }[] = [];
function trackerRow(): { readonly title: string; readonly notes: string } | undefined {
  for (const line of read(EXPORT).split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const parsed: unknown = JSON.parse(line);
    if (own(parsed, "id") === BEAD && typeof own(parsed, "title") === "string") {
      return { title: String(own(parsed, "title")), notes: String(own(parsed, "notes") ?? "") };
    }
  }
  return undefined;
}
/** Only the original filing line counts: later bead notes may not redefine the requirement. */
const filing = (notes: string): string => notes.split("\n").find(line => line.startsWith("Citation: ")) ?? "";
const clauses = (line: string): string[] => {
  const found = /(?:^|\. )Acceptance: (.*?)\. Consolidation candidate/.exec(line)?.[1] ?? "";
  return found === "" ? [] : found.split("; ");
};
const suite = `GP score receipt census (${BEAD})`;
describe(suite, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: BUDGET_MS }, async () => {
        const witness = await CASES[pin]?.();
        expect(witness, `${pin} has an executable case`).toBeDefined();
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: JSON.stringify(witness) === JSON.stringify(expected) });
        expect(witness, `${pin}'s witness matches the roster`).toStrictEqual(expected);
      });
    }
  }
  it("rule 16: rows, quotes, residuals, mutants, prohibitions, replay forms, near misses, plants, grant sets, tokens and bindings have the frozen measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:1", "A:2", "B:1", "C:1", "D:1", "E:2", "Q:2"]);
    expect(Object.keys(QUOTES)).toEqual(PINS);
    expect(Object.keys(CASES)).toEqual(PINS);
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:1", "Q2:3"]);
    expect(Object.keys(MUTANTS)).toEqual(["M-RESERIALIZE", "M-RENORMALIZE", "M-RESAMPLE", "M-ARGMAX", "M-SCORES", "M-SORTED", "M-NEAREST", "M-REPLY-SUPPORT", "M-REPLAY"]);
    expect(Object.entries(PROHIBITIONS)).toEqual([["no renormalization", "M-RENORMALIZE"], ["no re-sampling", "M-RESAMPLE"], ["no host-side argmax over scores", "M-ARGMAX"]]);
    expect(Object.keys(LOOK_ALIKES)).toEqual(["deep-frozen JSON round-trip (a decision replayed from the audit or the journal)", "JSON round-trip", "double JSON round-trip"]);
    expect(Object.keys(NEAR)).toEqual(["unknown", "letter-case", "prefix", "extension", "padding", "widened-support"]);
    expect(Object.keys(PLANTS)).toEqual(["eval-consumer", "rpc-reply", "module-import", "client-name", "receipt-member", "near-tokens"]);
    expect(Object.keys(GRANT_SETS)).toEqual(["other-control-grant", "observer-only"]);
    expect(RECEIPT_TOKENS).toEqual(["GraphPolicyCLI", "GraphDataIR", "graphpolicy.receipt.decision.v1", "sampled-decision", "log_probabilities", "log_probability", "chosen_id"]);
    expect(SRC_BINDINGS).toEqual([]);
  });
  it("outside anchors: the owner filing, the control core at the Pi pin and the vendored receipt bind every row the census reads", () => {
    const row = trackerRow();
    expect(row, "the bead's own row is in the tracker export").toBeDefined();
    const title = row?.title ?? "";
    expect(title.startsWith(`[${TAG}] ${ROWS[0]?.label ?? ""} (artifact:`), "the title carries row T's label before its artifact parenthetical").toBe(true);
    const citation = filing(row?.notes ?? "");
    const judged = ROWS.filter(entry => CLAUSE_ROWS.includes(entry.id));
    expect(clauses(citation), "the Acceptance sentence's clauses are rows A to E").toEqual(judged.map(entry => entry.label));
    expect(filing(`${row?.notes ?? ""}\nCitation: forgery. Acceptance: no.`), "a later note line binds nothing").toBe(citation);
    for (const entry of [ROWS[0], ...judged]) {
      if (entry === undefined) continue;
      expect(entry.pins.map(pin => QUOTES[pin]), `${entry.id}'s pins quote its clause's parts`).toEqual(parts(entry.label));
    }
    const clauseAParts = parts(judged.find(entry => entry.id === "A")?.label ?? "");
    expect(Object.keys(PROHIBITIONS), "the prohibitions are clause A's parenthetical items").toEqual(items(clauseAParts[1] ?? ""));
    expect(citation).toContain(`decisions:8@${PROVIDER_PIN}`);
    expect(citation).toContain(`README.md:11,:25@${PROVIDER_PIN}`);
    expect(citation).toContain("Design-only; no Pi surface named");
    const atPin = git("show", `${PI_PIN}:${CORE}`).split("\n");
    expect(atPin[16], "control.ts:17 at the Pi pin is the permit policy").toContain("exact-grant+confirmed-owner+operator-confirmed");
    expect(atPin[209], "control.ts:210 at the Pi pin is decideControl").toContain("export function decideControl(");
    expect(atPin[254], "control.ts:255 at the Pi pin is isCoreMintedDecision").toContain("export function isCoreMintedDecision(");
    const pinPolicy = atPin[16]?.split("\"")[1] ?? "";
    expect(CONTROL_PERMIT_POLICY, "the control core at HEAD still names the Pi pin's permit policy (its enforcement is C1's)").toBe(pinPolicy);
    expect(own(REPLY, "schema")).toBe(RECEIPT_SCHEMA);
    expect(own(REPLY, "kind")).toBe(RECEIPT_KIND);
    expect(sha256(SNAPSHOT), "the receipt's graph digest is the snapshot fixture's bytes").toBe(String(own(REPLY, "graph_digest")).replace(/^sha256:/, ""));
    const generator = own(VENDORED, "generator");
    expect(own(generator, "sourceSha")).toBe(GENERATOR_SHA);
    expect(own(generator, "take")).toBe("result.decision");
    const inputs = own(generator, "inputs");
    const listed: readonly unknown[] = Array.isArray(inputs) ? inputs : [];
    const candidatesInput = listed.find(input => String(own(input, "path")).endsWith("/candidates.json"));
    expect(Object.keys(candidatesInput ?? {}), "the generator records its candidates input by digest only, so OFFERED is the receipt's support").toEqual(["path", "blob", "sha256"]);
    const validation = own(VENDORED, "validation");
    expect(own(validation, "valid")).toBe(true);
    expect(own(validation, "stdin"), "the producer validated the compact bytes").toBe("the receipt below, JSON.stringify");
    expect(own(own(REPLY, "sample"), "log_probability"), "the sample's log probability is the producer's recorded word").toBe(own(own(validation, "recompute"), "recorded"));
    expect(SCORE_WORDS.length).toBe(SUPPORT.length);
    expect(SUPPORT.includes(CHOICE)).toBe(true);
  });
  it("roster: every judged pin and registered test ran, and every witness was compared", ({ task }) => {
    expect(ROSTER.bead).toBe(BEAD);
    expect(ROWS).toStrictEqual(ROSTER.rows);
    expect(QUOTES).toStrictEqual(ROSTER.quotes);
    expect(RESIDUALS).toStrictEqual(ROSTER.residuals);
    expect(Object.keys(ROSTER.witnesses)).toEqual(PINS);
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(walked.map(entry => entry.name)).toEqual(ROSTER.tests);
    expect(walked.findIndex(entry => entry.self)).toBe(walked.length - 1);
    expect(walked.filter(entry => !entry.self && (entry.mode !== "run" || entry.fails || !["pass", "fail"].includes(entry.state ?? "")))).toEqual([]);
    expect(REACHED.map(entry => entry.pin)).toEqual(PINS);
    expect(REACHED.filter(entry => !entry.same)).toEqual([]);
  });
});
