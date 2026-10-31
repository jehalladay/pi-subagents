/**
 * wb-0lf.1 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R1, program-triage-2026-10-18 child of wb-0lf), the GP decision executor
 * census. Statement (the bead title, verbatim): "When Pi hosts a GraphPolicyCLI decision point (artifact: released GP seam
 * \u2014 handshake, GraphDataIR and reply schemas \u2014 plus an owner-decided Pi decision point), the host shall convert the GP
 * reply into a typed formula decision/executor request, validate its basis (snapshot digest, source revision), and execute it
 * only through Furnace supervision via the core-minted decision path, never directly." (the title spells each dash as the six
 * characters backslash, u, 2, 0, 1, 4).
 * Acceptance (the owner filing's Acceptance sentence, verbatim, cut at "; " into rows A, B and C, the last without its final
 * period): "a host test drives a fixture GP reply through the Pi decision point and asserts no native verb or executor request
 * is issued unless the converted decision passed basis validation and decideControl returned permitted with a core-minted
 * receipt (isCoreMintedDecision, control.ts:255); a reply whose snapshot digest differs from the observed basis yields a
 * conflict/refusal receipt and no effect; the Furnace-hosted adapter's execute/interpret path stays byte-identical."
 * The filing's own status: "nothing is claimed today (no P0)" and "Tracked gate, related edges only, never a blocker
 * (wb-4ap.12-16 style)". Row T's label is the title's trigger, verbatim.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-28, at the trunk tip a816f2a21cbb and at the bead's Pi pin 758ec18187a5,
 * which the filing names as "core-minted decisions only @758ec18187a5"): no src module spells the vocabulary below; line 255 of
 * src/workbench/control.ts is "export function isCoreMintedDecision(decision: unknown): boolean {" at both; NATIVE_CONTROL_ACTIONS
 * keys furnace, claude-agent-sdk, forge and local-detached, so the core registers no GraphPolicyCLI provider and refuses a
 * GraphPolicyCLI target as unknown-action before it reads the projection; src/workbench/hosts/furnace-hosted.ts is one blob at
 * both (sha256 33b769b5b91a778413696031743e780a0bdc349e6e1f26c3c9841338d0225524). The fixture GP reply is the gp decision receipt
 * vendored by wb-gxd7.5 (test/fixtures/gp-sample-receipt.json, gp sample's result.decision, generator sourceSha 3f7d52cd), read
 * at its /receipt pointer and never respelled in this file; its graph_digest is "sha256:" plus the sha256 of the exact bytes of
 * the snapshot vendored by wb-gxd7.3 (test/fixtures/gp-host-adapter-snapshot.json), the value the generator's own inputs record
 * for that file; the snapshot's one source revision is observation.revisions[0]; the reply's candidates are three of the
 * snapshot's four can_execute relations (exec-a2-t3 is not one) and its sample's chosen_id is the first.
 *
 * Pi hosts no GraphPolicyCLI decision point today. The census pins that (row T) and an ARMED contract (rows A to C) that binds
 * the first decision point to come, as the wb-4ap.16 intent-host census and the wb-gxd7.3 snapshot-join census arm theirs:
 *  T, the trigger. T1: no src module spells the vocabulary (VOCABULARY: the title's two names GraphPolicyCLI and GraphDataIR,
 *    the reply's schema and kind values and its two members graph_digest and chosen_id, each a whole case-sensitive token of
 *    git's would-commit listing under src/), and the src modules that do are exactly the bound decision points in
 *    GP_DECISION_POINTS (empty both ways today: a module that starts hosting must be bound, and a bound path that names nothing
 *    is stale); the listing is shown holding at least SRC_FLOOR files and the real text of the control core and the adapter,
 *    and the reader is shown reading every member in planted text and no near token.
 *  A, B, C, armed on landing. The armed contract reads a decision point as one function over the GP reply as gp wrote it, the
 *    exact bytes Pi presented as its snapshot, the observation projection, a route from a candidate to the control request
 *    carrying its effect, and ONE injected effect seam, the only path to a native verb or an executor request. Five fixtures
 *    built from the vendored reply and snapshot run every decision point against the real control core: F1 current (the
 *    snapshot's own bytes, every observed run at its revision, an exact control grant), F2 the snapshot respelled compact
 *    (the same document, other bytes, so its digest differs from the reply's), F3 current with an observer grant only, F4
 *    current bytes with every observed run moved to the next revision, F5 the reply with its chosen_id set to exec-a2-t3,
 *    observed but no candidate. Each fixture's basis reading (valid, snapshot-mismatch, revision-mismatch or
 *    reply-unconverted) is computed by basisOf and held to the fixture's own field. Six CHECKS judge the record:
 *    effect-unvalidated (the seam was called for a reply whose converted decision fails basis validation), effect-unpermitted
 *    (handed a decision whose verdict is not 'permitted'), effect-unminted (handed a value isCoreMintedDecision refuses),
 *    effect-unrequested (handed a decision whose receipt answers no request this call issued, a call that issued none
 *    included: the drive records, in the order returned, a copy of each request its requestOf returned (pinned for a call
 *    issuing up to four), taken at the return, so an in-place edit of any member of a returned object afterwards edits no
 *    record; a receipt answers a request when its scope, principal, target, action, invocationId and requestedAt each equal
 *    that request's and its grant is one of that request's grants; every request a call issues carries that call's own serial
 *    in its invocationId), mismatch-receipt (a snapshot-mismatch reply lacks exactly one receipt of status conflict or
 *    refused naming snapshot-mismatch) and current-unexecuted (F1, the one reply every clause admits, did not reach the seam
 *    exactly once with a core-minted permit: the drive's positive control, without which a decision point that never issues
 *    anything would meet the clause's "unless" vacuously). A1 the bound decision points (none) and the synthetic bindings:
 *    the honest point meets every check on every fixture, every mutant fails one, every check fires, and each fixture's basis
 *    is the computed one. A2 a point skipping either basis member or the conversion's candidate check reaches the seam on F2,
 *    F4 or F5 (effect-unvalidated). A3 a denied decision executed anyway fails effect-unpermitted; today even an exact grant
 *    for a GraphPolicyCLI verb reads unknown-action; and a permit decideControl returned for a request this call did not
 *    issue fails effect-unrequested: on F3 (observer grant only) M-FORGED-GRANT appends the exact grant to the issued
 *    request's own grants array, in place, and asks the core on that object (A3 reads the forged request back: the issued
 *    object itself, holding its own grants array, the grant appended); M-REPLAYED-PERMIT hands the seam the first permit it
 *    minted (F1's); M-NO-REQUEST-REPLAY, once it holds that permit, asks requestOf nothing more and hands it over, so its
 *    later calls issue no request (A3 reads 0 issued on F3 and on the next F1); each replay hands F3 and the same point's
 *    next F1 call the very permit F1's call handed the seam, and fails both. A3's reader controls: the record (a planted
 *    point asking requestOf once per can_execute candidate of the snapshot, four requests, then editing every member of each
 *    returned object in place, reads a record equal to its own copies taken at the return, in order, and reads its own edits
 *    back: every member differs from its copy, and each object or array member still holds the object it held); the check
 *    over a record (a core-minted permit handed with no request issued fails it on every fixture, beside that fixture's other
 *    checks; with its own request issued first, last or second of the four it passes on F1; of two decisions handed in one F3
 *    call, either one answering no issued request fails it, and both answering an issued request pass); the echo (a minted
 *    receipt answers the request it was minted for, with that request's grants in either order, and answers it no longer with
 *    any one echoed field or its grant altered). A4 a hand-built look-alike permit and a spread copy of a minted one fail
 *    effect-unminted; isCoreMintedDecision is false for the reply, its typed conversion, a copy, a JSON round trip and a
 *    denial. B1 the mismatch condition: F2's presented bytes hash to a digest the reply does not carry, while F1's bytes hash
 *    to the reply's own. B2 the honest point records one conflict receipt naming snapshot-mismatch; a point dropping the
 *    reply silently or reporting it denied fails mismatch-receipt. B3 no effect: the honest point never reaches the seam on
 *    F2, and a point that records the conflict and executes anyway fails effect-unvalidated alone. C1 the execute/interpret
 *    path, derived from the adapter's own TypeScript AST: FurnaceHostedExecutor's execute method and everything it calls in
 *    that file, transitively (this-calls to class methods, and calls of same-file functions and const-bound functions), in
 *    breadth-first order of first call. C2 byte-identical: every path member's source text (the declaration's own text, its
 *    leading comment excluded) at HEAD equals its text in the adapter at the bead's Pi pin, read from git's objects, and a
 *    one-character plant inside each member is reported as that member's change, only.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS and each residual family's
 * member count as literals, beside the vocabulary, the checks, the echoed request fields, the mutants, the lead plants, the
 * fixtures, the bound points, the floor, the pin and the derived path; the judged set (every row's id, label and pins, every
 * pin's quote and witness, the residual members, every registered test title) is held to the out-of-file roster
 * test/fixtures/gp-decision-executor-roster.json. OUTSIDE ANCHORS (their own registered case): the bead's own row in the
 * tracker export (.beads/issues.jsonl): the title opens with the requirement id and carries row T's label before its artifact
 * parenthetical, and names exactly the two names; the first notes line opening "Citation: " holds the Acceptance sentence,
 * whose three clauses are exactly the labels of rows A, B and C, and the Pi pin; each row's pin quotes tile its label; clause
 * A's control.ts citation resolves at the pin to the isCoreMintedDecision export, and the notes' furnace-hosted.ts:9 citation
 * resolves at the pin to the adapter's "no scheduler" sentence, so the adapter path is the filing's; the vendored reply
 * carries the vocabulary's schema, kind and members, its digest is the generator's recorded input digest and the snapshot
 * fixture's own, and the snapshot's revision is F1's observed basis; and the vocabulary is derived outside every literal: the
 * title's Graph names, the vendored reply's schema and kind values, the reply member whose value is the snapshot fixture's
 * digest and the sample member whose value is a candidate; and the follow-up bead wb-5omz's own row: the lead reader takes
 * the first line of its notes that opens with "[leads] - F1 " (not a line holding that text further in, not a line opening
 * another finding's id such as "[leads] - F13 ", not a later such line) and reads the cure phrase "arm a request-binding
 * check (<check>) with <P-point> and <P-point> as its mutants" on that line only; the anchor holds when that check is one of
 * the checks and the two points are two distinct names whose M- twins (each name with P- read as M-) are mutants failing that
 * check on F3, among any other checks they fail. LEAD_PLANTS pin each reading clause on planted notes, and planted readings
 * pin each anchor condition. A tracker note appended later (a delivery, gate or park note) sits on a line of its own and
 * binds nothing. So a pin, a row, a clause, a vocabulary member, the request-binding check or one of the gate's two points
 * removed from every literal of this file and the roster together still reds. The last case reads the vitest task tree (every
 * registered test, in roster order, in run mode, ran before it), REACHED (every pin reached its witness compare, and each
 * compare's own result) and ANCHORED (the outside-anchors case ran to its end).
 * NOT CLAIMED: qa/, test/ and docs/ (a test names the vocabulary as the text it judges, this census included; the docs leg is
 * the wb-0lf.7 census's); the seam's actual shape (the armed contract is this census's reading of an unpublished seam: a
 * decision point whose own cut must take another shape re-measures rows A and B with it); an executor request outside the
 * core's verbs (decideControl mints control verbs only, so a GP decision whose effect is an Attempt start has no core-minted
 * path today and reads unknown-action, as A3 shows); Furnace supervision itself (the seam is injected; the checks observe the
 * seam, never Furnace); the reply's numbers (gp's own inspect, wb-gxd7.5); for effect-unrequested, how a permit whose receipt
 * answers a request this call issued was obtained (the check reads the receipt's echo of the request, so a permit decided on
 * a forged request that keeps every echoed field, when the grant the core records is one the issued request holds, as
 * M-FORGED-GRANT's on F1, or one minted before the call for the call's own request, answers it), what a point hands
 * decideControl besides the request (the projection and the clock), and the request's params, which no receipt echoes; a
 * record or a check that drops a request only past the fourth one a call issues (the reader controls issue four); the lead
 * reader's grammar outside the live lead line and LEAD_PLANTS (a check spelled outside [a-z-], a point outside P-[A-Z-],
 * another line separator); the leading comment of a path member and anything C1 does not derive (row Q4); a mutant, a
 * fixture, a planted control or a reader control removed from its table or case, the frozen literal and the roster together
 * while every check still fires; row Q or a residual member removed from every literal and the roster together (no source
 * outside this cut names the residual families before its delivery note lands); a pin's case replaced by one that echoes its
 * roster witness.
 * RESIDUALS (named families, each member a pinned quiet row; a reader that starts reading a member reds its row):
 * R-SPELLING (Q1, a vocabulary spelling the token reader does not read: camel case, a member composed at run time, a name
 * lower-cased), R-SIDE-PATH (Q2, a decision point that reaches an effect outside the injected seam: the checks observe the seam
 * only), R-CHOSEN-TARGET (Q3, a decision point that executes a candidate other than the reply's chosen one: no clause binds the
 * executed target to the choice) and R-ADAPTER-OUTSIDE-PATH (Q4, an adapter change C1 does not derive into the path: a method
 * execute never calls, a same-file constant the path reads, an import line the path's helpers resolve through; each member's
 * statement is derived from the adapter's AST, never spelled here, so an edit to the adapter outside the path reds no row).
 * SCOPE AND OVER-READS: the vocabulary reader does not read negation or context, so a src comment that merely names a member
 * reds T1 (OVER-READ, disclosed: no src module spells one today). C2 reds every change to a path member, a cut that is no GP
 * cut included: before a decision point is bound the census cannot tell the cuts apart, so such a cut re-reads C2 and states why
 * its change leaves the clause's adapter path in place. A conflict/refusal receipt is read as one receipt whose status is
 * conflict or refused and whose code names the failed basis member (snapshot-mismatch, the wb-gxd7.3 census's typed code); the
 * source revision is compared with the subjectBasis of the node the chosen candidate's control target names, the observation
 * model's own basis field.
 *
 * wb-5omz (R694 follow-up of wb-0lf.1 landing 648, gate cmd_0ea67120ff91: F1 leads): the five checks that cut armed read only
 * the handed decision's verdict and its mint identity, so the gate's P-FORGED-GRANT (decideControl asked with the fixture's
 * grants plus the exact control:furnace.stop grant) and P-REPLAYED-PERMIT (the seam handed the first permit the point minted,
 * F1's) executed F3's reply, which the core denies observer-only on F3's own request, and met every check on every fixture.
 * The request-binding check effect-unrequested reads each handed receipt against the requests the call issued. MUTANTS carry
 * the two as M-FORGED-GRANT, which appends the grant to the issued request's own grants array (so a record held by reference
 * or as a shallow copy would read the forged grant as issued), and M-REPLAYED-PERMIT; each fails it on F3, and so do M-DENIED
 * (a denial carries no receipt) and M-LOOKALIKE (its grant is none of F3's), beside the checks they already failed. Cut #2
 * (refusal #1 of cut #1, gate-prep-4 / g10-gate-s161: unmet U1-U4, claims wider than pins): U1 M-NO-REQUEST-REPLAY and the
 * check control over an empty record pin the zero-issued half; U2 M-FORGED-GRANT appends in place and the record control
 * edits every member of every returned request in place; U3 the record control's four requests and the check controls' first,
 * last and between positions pin each request a call issues; U4 LEAD_PLANTS, the planted readings and the distinct points
 * condition pin the lead reader's clauses and the anchor's conditions.
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
  CONTROL_CONTRACT_VERSION,
  CONTROL_PERMIT_POLICY,
  type ControlDecision,
  decideControl,
  isCoreMintedDecision,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlRequest,
} from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-0lf.1";
/** The bead carrying the wb-0lf.1 gate's F1 (landing 648): its lead line names the request-binding check and the gate's two points. */
const FOLLOW_UP = "wb-5omz";
const REQUIREMENT = "FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R1";
const SUITE = `gp decision executor census (${BEAD}, ${REQUIREMENT})`;
const ROSTER_PATH = "test/fixtures/gp-decision-executor-roster.json";
const EXPORT = ".beads/issues.jsonl";
/** The gp decision receipt wb-gxd7.5 vendored (gp sample's result.decision at /receipt) and the snapshot wb-gxd7.3 vendored. */
const REPLY_FIXTURE = "test/fixtures/gp-sample-receipt.json";
const SNAPSHOT_FIXTURE = "test/fixtures/gp-host-adapter-snapshot.json";
/** The producer path the generator recorded for the snapshot it sampled over. */
const SNAPSHOT_INPUT = "fixtures/conformance/host-adapter/snapshot.json";
const CORE = "src/workbench/control.ts";
const ADAPTER = "src/workbench/hosts/furnace-hosted.ts";
const ADAPTER_CLASS = "FurnaceHostedExecutor";
const PATH_ROOT = "execute";
/** The bead's Pi pin, full (the filing measures Pi's standing invariants at its 12-hex prefix). */
const PI_PIN = "758ec18187a5d66ba40b766caad38754b5313558";
/** src holds well over this many files; fewer means the listing read nothing. */
const SRC_FLOOR = 100;
/** The live cases list and read every src module; they carry this explicit budget. */
const LIVE_BUDGET_MS = 120_000;

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };

// ---- the vocabulary (the title's names; the reply's schema, kind and the two members a decision point reads) ----

const NAMES = ["GraphPolicyCLI", "GraphDataIR"] as const;
const REPLY_SCHEMA = "graphpolicy.receipt.decision.v1";
const REPLY_KIND = "sampled-decision";
/** The reply member naming the snapshot the decision was sampled over, and its sample's member naming the chosen candidate. */
const REPLY_DIGEST = "graph_digest";
const REPLY_CHOICE = "chosen_id";
const VOCABULARY: readonly string[] = [...NAMES, REPLY_SCHEMA, REPLY_KIND, REPLY_DIGEST, REPLY_CHOICE];

const escaped = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tokenPattern = (word: string): RegExp => new RegExp(`(?<![A-Za-z0-9_$])${escaped(word)}(?![A-Za-z0-9_$])`);
/** The vocabulary members a text spells, each as a whole case-sensitive token, in VOCABULARY order. */
function namedVocabulary(text: string): string[] {
  return VOCABULARY.filter(word => tokenPattern(word).test(text));
}

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const git = (args: readonly string[]): string => execFileSync("git", [...args], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
interface Entry {
  readonly path: string;
  readonly text: string;
}
let srcCache: readonly Entry[] | undefined;
/** git's would-commit listing under src/ (tracked and untracked, never ignored, present in the tree), each with its text. */
function srcEntries(): readonly Entry[] {
  if (srcCache === undefined) {
    const listed = git(["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"]);
    const paths = [...new Set(listed.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
    srcCache = paths.map(path => ({ path, text: textOf(path) }));
  }
  return srcCache;
}

function record(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** An own data property; an accessor is never invoked and an inherited value never counts. */
function own(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
}
const strings = (value: unknown): value is readonly string[] => Array.isArray(value) && value.every(item => typeof item === "string");
const sha256 = (bytes: Uint8Array | string): string => createHash("sha256").update(bytes).digest("hex");

// ---- the fixture reply and snapshot (vendored producer output, read and never respelled) ----

const VENDORED: unknown = JSON.parse(textOf(REPLY_FIXTURE));
const REPLY: unknown = own(VENDORED, "receipt");
const SNAPSHOT_BYTES: Uint8Array = readFileSync(join(ROOT, SNAPSHOT_FIXTURE));
/** The same document respelled compact: other bytes, so another digest. */
const COMPACT_BYTES: Uint8Array = Buffer.from(JSON.stringify(JSON.parse(Buffer.from(SNAPSHOT_BYTES).toString("utf8"))), "utf8");
/** The digest a decision point computes over the bytes it presented: the reply's own "sha256:<hex>" form. */
const digestOf = (presented: Uint8Array): string => `sha256:${sha256(presented)}`;
/** The one source revision a presented snapshot was extracted at (its observation.revisions), or undefined. */
function revisionOf(presented: Uint8Array): string | undefined {
  let document: unknown;
  try {
    document = JSON.parse(Buffer.from(presented).toString("utf8"));
  } catch {
    return undefined;
  }
  const revisions = own(own(document, "observation"), "revisions");
  return strings(revisions) && revisions.length === 1 ? revisions[0] : undefined;
}
/** The snapshot's can_execute relations: every candidate a route can name. */
function executable(presented: Uint8Array): string[] {
  const document: unknown = JSON.parse(Buffer.from(presented).toString("utf8"));
  const relations = own(document, "relations");
  const listed: readonly unknown[] = Array.isArray(relations) ? relations : [];
  return listed.filter(entry => own(entry, "kind") === "can_execute").map(entry => String(own(entry, "id")));
}
/** The reply with its sample's chosen_id replaced: a reply whose choice is no candidate. */
function rechosen(choice: string): unknown {
  const copy: unknown = JSON.parse(JSON.stringify(REPLY));
  const sample = own(copy, "sample");
  if (record(sample)) Object.defineProperty(sample, REPLY_CHOICE, { value: choice, enumerable: true, writable: true, configurable: true });
  return copy;
}
const CURRENT = revisionOf(SNAPSHOT_BYTES) ?? "";
const MOVED = "mw-synthetic-rev-0002";
const UNCHOSEN = "exec-a2-t3";

// ---- the armed contract: the census's reading of a Pi GraphPolicyCLI decision point ----

/** The census's typed conversion of a GP reply: the formula decision a decision point executes. */
interface TypedDecision {
  readonly replySchema: string;
  readonly replyKind: string;
  readonly snapshotDigest: string;
  readonly candidates: readonly string[];
  readonly chosenId: string;
}
/** The typed conversion: undefined for a reply that is no sampled decision of the pinned schema, or whose choice is no candidate. */
function convert(reply: unknown, candidateCheck = true): TypedDecision | undefined {
  const replySchema = own(reply, "schema");
  const replyKind = own(reply, "kind");
  const snapshotDigest = own(reply, REPLY_DIGEST);
  const candidates = own(reply, "candidates");
  const chosenId = own(own(reply, "sample"), REPLY_CHOICE);
  if (replySchema !== REPLY_SCHEMA || replyKind !== REPLY_KIND || typeof snapshotDigest !== "string" || !strings(candidates) || typeof chosenId !== "string") return undefined;
  if (candidateCheck && !candidates.includes(chosenId)) return undefined;
  return Object.freeze({ replySchema, replyKind, snapshotDigest, candidates: Object.freeze([...candidates]), chosenId });
}

interface DecisionCall {
  /** The GP reply as gp wrote it, read through own data properties only. */
  readonly reply: unknown;
  /** The exact bytes Pi presented to gp as this decision's snapshot. */
  readonly presented: Uint8Array;
  readonly projection: ObservationProjection;
  /** The control request that carries a candidate's effect to its native target. */
  readonly requestOf: (candidate: string) => NativeControlRequest;
  /** The one effect seam: the only path from a decision point to a native verb or an executor request. */
  readonly effect: (decision: ControlDecision) => string;
  readonly now: () => string;
}
interface DecisionReceipt {
  readonly status: "executed" | "conflict" | "refused" | "denied";
  readonly code?: string;
  readonly candidate?: string;
  readonly answer?: string;
}
type DecisionPoint = (call: DecisionCall) => readonly DecisionReceipt[];

/** The census allowlist: every src module bound as a GraphPolicyCLI decision point, with its armed entry point. Empty today. */
const GP_DECISION_POINTS: readonly { readonly path: string; readonly point: DecisionPoint }[] = [];

const WS = "/work/gp-decision-executor";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
const AT = "2026-10-28T05:00:00Z";
const REQUESTED_AT = "2026-10-28T05:00:01Z";
const DECIDED_AT = "2026-10-28T05:00:02Z";
const CONTROL_GRANTS: readonly string[] = ["observe:furnace.run.inspect", "control:furnace.stop"];
const OBSERVE_GRANTS: readonly string[] = ["observe:furnace.run.inspect"];

type Basis = "valid" | "snapshot-mismatch" | "revision-mismatch" | "reply-unconverted";
interface Fixture {
  readonly id: string;
  readonly reply: unknown;
  readonly presented: Uint8Array;
  /** The subjectBasis every observed run carries. */
  readonly observed: string;
  readonly grants: readonly string[];
  /** The fixture's basis reading, held to basisOf in A1. */
  readonly basis: Basis;
  /** The one fixture every clause admits: its reply must reach the seam once, with a core-minted permit. */
  readonly current: boolean;
}
const FIXTURES: readonly Fixture[] = [
  { id: "F1", reply: REPLY, presented: SNAPSHOT_BYTES, observed: CURRENT, grants: CONTROL_GRANTS, basis: "valid", current: true },
  { id: "F2", reply: REPLY, presented: COMPACT_BYTES, observed: CURRENT, grants: CONTROL_GRANTS, basis: "snapshot-mismatch", current: false },
  { id: "F3", reply: REPLY, presented: SNAPSHOT_BYTES, observed: CURRENT, grants: OBSERVE_GRANTS, basis: "valid", current: false },
  { id: "F4", reply: REPLY, presented: SNAPSHOT_BYTES, observed: MOVED, grants: CONTROL_GRANTS, basis: "revision-mismatch", current: false },
  { id: "F5", reply: rechosen(UNCHOSEN), presented: SNAPSHOT_BYTES, observed: CURRENT, grants: CONTROL_GRANTS, basis: "reply-unconverted", current: false },
];
/** The census's basis reading of one fixture: the conversion, then the snapshot digest, then the source revision. */
function basisOf(fixture: Fixture): Basis {
  const typed = convert(fixture.reply);
  if (typed === undefined) return "reply-unconverted";
  if (typed.snapshotDigest !== digestOf(fixture.presented)) return "snapshot-mismatch";
  if (revisionOf(fixture.presented) !== fixture.observed) return "revision-mismatch";
  return "valid";
}

const runRef = (candidate: string): NativeRef => ({ provider: "furnace", type: "run", id: `frn-run-${candidate}`, scope: WS });
const attemptRef = (candidate: string): NativeRef => ({ provider: "furnace", type: "attempt", id: `frn-atm-${candidate}`, scope: WS });
/** One observed Furnace run per can_execute relation of the snapshot, each at the fixture's basis and owning its attempt. */
function projectionOf(fixture: Fixture): ObservationProjection {
  const projection = new ObservationProjection();
  for (const candidate of executable(SNAPSHOT_BYTES)) {
    for (const source of [runRef(candidate), attemptRef(candidate)]) {
      projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`, subjectBasis: fixture.observed,
        node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
    }
    projection.relate({ scope: SCOPE, from: runRef(candidate), to: attemptRef(candidate), kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: `frn-req-${candidate}` } });
  }
  return projection;
}
/** The control request for one candidate; a drive passes its own serial, so no two calls issue one invocationId (0: no drive). */
function requestFor(fixture: Fixture, candidate: string, serial = 0): NativeControlRequest {
  return { scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: [...fixture.grants], target: runRef(candidate), action: "stop",
    params: { confirmed: true }, invocationId: `inv-${fixture.id}-${serial}-${candidate}`, requestedAt: REQUESTED_AT };
}
/** The subjectBasis of the node a request's target names, read through the projection. */
function observedBasis(projection: ObservationProjection, request: NativeControlRequest): string | undefined {
  return projection.query({ scope: { workspace: request.scope.workspace, principal: request.scope.principal }, ref: { ...request.target }, limit: 1 }).nodes[0]?.subjectBasis;
}
const targetIdOf = (decision: unknown): unknown => own(own(own(decision, "receipt"), "target"), "id");

interface Drive {
  readonly receipts: readonly DecisionReceipt[];
  readonly calls: readonly { readonly decision: unknown; readonly answer: string }[];
  /** Every request this call's requestOf returned, each a copy taken at the return: a later edit of the object edits no record. */
  readonly issued: readonly NativeControlRequest[];
}
/** The drives so far: each drive's serial is its own, so every call issues requests no other call issues. */
let driveSerial = 0;
function drive(point: DecisionPoint, fixture: Fixture): Drive {
  driveSerial += 1;
  const serial = driveSerial;
  const calls: { readonly decision: unknown; readonly answer: string }[] = [];
  const issued: NativeControlRequest[] = [];
  const effect = (decision: ControlDecision): string => {
    const answer = `frn-ack-${String(targetIdOf(decision))}`;
    calls.push({ decision, answer });
    return answer;
  };
  const requestOf = (candidate: string): NativeControlRequest => {
    const request = requestFor(fixture, candidate, serial);
    issued.push(structuredClone(request));
    return request;
  };
  const receipts = point({ reply: fixture.reply, presented: fixture.presented, projection: projectionOf(fixture), requestOf, effect, now: () => DECIDED_AT });
  return { receipts, calls, issued };
}
/** The request fields a minted receipt echoes (control.ts core(), held to the core's own receipt in A3). */
const ECHOED = ["scope", "principal", "target", "action", "invocationId", "requestedAt"] as const;
/** Whether a receipt answers a request: each echoed field equals the request's, and its grant is one of the request's grants. */
function answers(receipt: unknown, request: NativeControlRequest): boolean {
  const grant = own(receipt, "grant");
  return ECHOED.every(field => isDeepStrictEqual(own(receipt, field), request[field])) && typeof grant === "string" && strings(request.grants) && request.grants.includes(grant);
}
/** An in-place edit of every own member of a request: a nested array or object edited where it lives, a scalar member reassigned. */
function editEveryMember(request: NativeControlRequest): void {
  for (const key of Object.keys(request)) {
    const value = own(request, key);
    if (Array.isArray(value)) Object.defineProperty(value, value.length, { value: "edited", enumerable: true, writable: true, configurable: true });
    else if (record(value)) Object.defineProperty(value, "edited", { value: true, enumerable: true, writable: true, configurable: true });
    else Object.defineProperty(request, key, { value: `${String(value)}~`, enumerable: true, writable: true, configurable: true });
  }
}
/** A type alias, not an interface, so the reading is a Json witness as it stands. */
type RecordReading = {
  readonly requests: number;
  readonly copies: number;
  readonly inOrder: boolean;
  /** The members on which some record differs from the planted point's copy. */
  readonly changed: readonly string[];
  /** The members on which every returned object differs from its copy after the edit. */
  readonly edited: readonly string[];
  /** The members whose returned value is an object or array that still holds the same object after the edit. */
  readonly inPlace: readonly string[];
};
/**
 * The record control: a planted point asks requestOf once per can_execute candidate of the snapshot (four requests), keeps its
 * own copy of each at the return, then edits every member of each returned object in place and executes nothing; the drive's
 * record must equal those copies, in order. It also reads its own edits back (edited, inPlace).
 */
function recordReading(): RecordReading {
  const copies: NativeControlRequest[] = [];
  let edited: string[] = [];
  let inPlace: string[] = [];
  const probe: DecisionPoint = call => {
    const returned = executable(call.presented).map(candidate => call.requestOf(candidate));
    copies.push(...returned.map(request => structuredClone(request)));
    const before = returned.map(request => new Map(Object.keys(request).map(key => [key, own(request, key)] as const)));
    for (const request of returned) editEveryMember(request);
    const keys = Object.keys(copies[0] ?? {});
    edited = keys.filter(key => returned.every((request, index) => !isDeepStrictEqual(own(request, key), own(copies[index], key))));
    inPlace = keys.filter(key =>
      returned.every((request, index) => {
        const held = before[index]?.get(key);
        return typeof held === "object" && held !== null && own(request, key) === held;
      }),
    );
    return [];
  };
  const { issued } = drive(probe, fixture("F1"));
  const fields = Object.keys(copies[0] ?? {});
  const changed = fields.filter(field => issued.some((request, index) => !isDeepStrictEqual(own(request, field), own(copies[index], field))));
  return { requests: issued.length, copies: copies.length, inOrder: isDeepStrictEqual(issued, copies), changed, edited, inPlace };
}

const CHECKS = ["effect-unvalidated", "effect-unpermitted", "effect-unminted", "effect-unrequested", "mismatch-receipt", "current-unexecuted"] as const;
type Check = (typeof CHECKS)[number];
const MISMATCH = "snapshot-mismatch";
/** The checks one driven fixture fails, in CHECKS order. */
function violations(fixture: Fixture, { receipts, calls, issued }: Drive): Check[] {
  const found = new Set<Check>();
  for (const { decision } of calls) {
    if (fixture.basis !== "valid") found.add("effect-unvalidated");
    if (own(decision, "decision") !== "permitted") found.add("effect-unpermitted");
    if (!isCoreMintedDecision(decision)) found.add("effect-unminted");
    if (!issued.some(request => answers(own(decision, "receipt"), request))) found.add("effect-unrequested");
  }
  if (fixture.basis === MISMATCH) {
    const [only] = receipts;
    if (receipts.length !== 1 || only === undefined || (only.status !== "conflict" && only.status !== "refused") || only.code !== MISMATCH) found.add("mismatch-receipt");
  }
  if (fixture.current) {
    const minted = calls.filter(call => own(call.decision, "decision") === "permitted" && isCoreMintedDecision(call.decision));
    if (calls.length !== 1 || minted.length !== 1) found.add("current-unexecuted");
  }
  return CHECKS.filter(check => found.has(check));
}
/** One decision point over every fixture: each fixture's failed checks. */
function violationsOf(point: DecisionPoint): Record<string, Check[]> {
  return Object.fromEntries(FIXTURES.map(fixture => [fixture.id, violations(fixture, drive(point, fixture))]));
}

/** A hand-built permit shaped as the core mints one, never minted: what a point executing a decision directly would hand over. */
function lookalike(request: NativeControlRequest): ControlDecision {
  return {
    decision: "permitted",
    receipt: {
      contractVersion: CONTROL_CONTRACT_VERSION, requestId: `ctl_${"0".repeat(32)}`, scope: { ...request.scope }, principal: { ...request.principal },
      grant: `control:${request.target.provider}.${request.action}`, policy: CONTROL_PERMIT_POLICY, target: { ...request.target }, action: request.action,
      invocationId: request.invocationId, ownershipConfirmationRef: "frn-req-lookalike", requestedAt: request.requestedAt, decidedAt: DECIDED_AT, phase: "requested",
    },
  };
}
/** How a synthetic decision point departs from the honest one (an empty shape is the honest point). */
interface Shape {
  /** false: skip the snapshot digest comparison. */
  readonly digestCheck?: boolean;
  /** false: skip the source revision comparison. */
  readonly revisionCheck?: boolean;
  /** false: convert a reply whose choice is no candidate. */
  readonly candidateCheck?: boolean;
  /** How a snapshot-mismatch reply is reported: dropped silently, as denied, or as a conflict while still executing it. */
  readonly mismatchAs?: "silent" | "denied" | "conflict-and-effect";
  /** lookalike: never ask the core; copy: hand over a copy of the core's decision. Either skips the provenance check. */
  readonly decide?: "lookalike" | "copy";
  /** Hand the seam the core's decision whatever its verdict. */
  readonly executeDenied?: boolean;
  /** Ask the core on the issued request with the exact grant its action needs written onto the issued object itself. */
  readonly forgeGrant?: boolean;
  /** Hand the seam the first permit this point minted, in this call or an earlier one, in place of the core's answer. */
  readonly replay?: boolean;
  /** Once it holds a permit, ask requestOf nothing more: read the revision through the first request it was handed and hand the seam that first permit. */
  readonly unrequested?: boolean;
  /** Never reach the seam. */
  readonly inert?: boolean;
  /** An effect reached outside the injected seam, once per execution. */
  readonly side?: () => void;
  /** The candidate executed, when it is not the reply's choice. */
  readonly target?: (typed: TypedDecision) => string;
}
/** A forging point's request: the issued object itself, the exact grant its action needs appended to its own grants array in place (no new array). */
function forged(request: NativeControlRequest): NativeControlRequest {
  const grants = request.grants ?? [];
  Object.defineProperty(grants, grants.length, { value: `control:${request.target.provider}.${request.action}`, enumerable: true, writable: true, configurable: true });
  return request;
}
function pointOf(shape: Shape): DecisionPoint {
  let first: ControlDecision | undefined;
  let held: { readonly request: NativeControlRequest; readonly permit: ControlDecision } | undefined;
  return call => {
    const typed = convert(call.reply, shape.candidateCheck !== false);
    if (typed === undefined) return [{ status: "refused", code: "reply-unconverted" }];
    const candidate = shape.target === undefined ? typed.chosenId : shape.target(typed);
    const receipts: DecisionReceipt[] = [];
    let hidden = false;
    if (shape.digestCheck !== false && typed.snapshotDigest !== digestOf(call.presented)) {
      if (shape.mismatchAs === "silent") return [];
      if (shape.mismatchAs === "denied") return [{ status: "denied", candidate }];
      receipts.push({ status: "conflict", code: MISMATCH, candidate });
      if (shape.mismatchAs !== "conflict-and-effect") return receipts;
      hidden = true;
    }
    const reused = shape.unrequested === true ? held : undefined;
    const request = reused?.request ?? call.requestOf(candidate);
    if (shape.revisionCheck !== false && observedBasis(call.projection, request) !== revisionOf(call.presented)) {
      return [...receipts, { status: "conflict", code: "revision-mismatch", candidate }];
    }
    if (shape.inert === true) return [...receipts, { status: "denied", candidate }];
    let decision: ControlDecision;
    if (reused !== undefined) decision = reused.permit;
    else if (shape.decide === "lookalike") decision = lookalike(request);
    else {
      const asked = shape.forgeGrant === true ? forged(request) : request;
      const minted = decideControl(asked, { projection: call.projection, now: call.now });
      decision = shape.decide === "copy" ? { ...minted } : minted;
    }
    if (shape.unrequested === true && held === undefined && isCoreMintedDecision(decision)) held = { request, permit: decision };
    if (shape.replay === true) {
      if (first === undefined && isCoreMintedDecision(decision)) first = decision;
      decision = first ?? decision;
    }
    const executes = shape.executeDenied === true || (decision.decision === "permitted" && (shape.decide !== undefined || isCoreMintedDecision(decision)));
    if (!executes) return [...receipts, { status: "denied", candidate }];
    shape.side?.();
    const answer = call.effect(decision);
    return hidden ? receipts : [...receipts, { status: "executed", candidate, answer }];
  };
}
const HONEST = pointOf({});
/** The synthetic bindings that must each fail the armed check: one or more per acceptance quote. */
const MUTANTS: Readonly<Record<string, Shape>> = {
  "M-NO-BASIS": { digestCheck: false, revisionCheck: false },
  "M-DIGEST-ONLY": { revisionCheck: false },
  "M-REVISION-ONLY": { digestCheck: false },
  "M-UNCONVERTED": { candidateCheck: false },
  "M-DENIED": { executeDenied: true },
  "M-FORGED-GRANT": { forgeGrant: true },
  "M-REPLAYED-PERMIT": { replay: true },
  "M-NO-REQUEST-REPLAY": { unrequested: true },
  "M-LOOKALIKE": { decide: "lookalike" },
  "M-COPY": { decide: "copy" },
  "M-MISMATCH-SILENT": { mismatchAs: "silent" },
  "M-MISMATCH-DENIED": { mismatchAs: "denied" },
  "M-RECEIPT-AND-EFFECT": { mismatchAs: "conflict-and-effect" },
  "M-INERT": { inert: true },
};
const mutant = (name: string): Record<string, Check[]> => violationsOf(pointOf(MUTANTS[name] ?? {}));
const fixture = (id: string): Fixture => FIXTURES.find(entry => entry.id === id) ?? (FIXTURES[0] as Fixture);
const receiptsOf = (point: DecisionPoint, id: string): Json => drive(point, fixture(id)).receipts.map(receipt => ({ ...receipt }));
const callsOf = (point: DecisionPoint, id: string): number => drive(point, fixture(id)).calls.length;
interface Again {
  readonly table: Record<string, Check[]>;
  readonly reachedF3: number;
  /** The requests the later calls issued: F3's, then the next F1's. */
  readonly issuedLater: readonly number[];
  /** Whether F3 and the next F1 were each handed the very decision F1's call handed the seam. */
  readonly handedF1s: boolean;
  readonly nextF1: Check[];
}
/** One point instance driven over every fixture in order, then over F1 again. */
function againOf(name: string): Again {
  const point = pointOf(MUTANTS[name] ?? {});
  const driven = FIXTURES.map(entry => ({ entry, run: drive(point, entry) }));
  const next = drive(point, fixture("F1"));
  const at = (id: string): Drive | undefined => driven.find(({ entry }) => entry.id === id)?.run;
  const handedF1 = at("F1")?.calls[0]?.decision;
  return {
    table: Object.fromEntries(driven.map(({ entry, run }) => [entry.id, violations(entry, run)])),
    reachedF3: at("F3")?.calls.length ?? 0,
    issuedLater: [at("F3")?.issued.length ?? -1, next.issued.length],
    handedF1s: handedF1 !== undefined && at("F3")?.calls[0]?.decision === handedF1 && next.calls[0]?.decision === handedF1,
    nextF1: violations(fixture("F1"), next),
  };
}

// ---- the adapter's execute/interpret path (row C), derived from its own AST ----

interface PathMember {
  readonly name: string;
  readonly kind: "method" | "function" | "const";
  readonly text: string;
}
/** FurnaceHostedExecutor's execute method and every same-file callable it reaches, breadth first; null when the root is gone. */
function pathOf(text: string): readonly PathMember[] | null {
  const source = ts.createSourceFile(ADAPTER, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const methods = new Map<string, ts.Node>();
  const callables = new Map<string, { readonly kind: "function" | "const"; readonly node: ts.Node; readonly statement: ts.Node }>();
  for (const statement of source.statements) {
    if (ts.isClassDeclaration(statement) && statement.name?.text === ADAPTER_CLASS) {
      for (const member of statement.members) if (ts.isMethodDeclaration(member) && ts.isIdentifier(member.name)) methods.set(member.name.text, member);
    } else if (ts.isFunctionDeclaration(statement) && statement.name !== undefined) {
      callables.set(statement.name.text, { kind: "function", node: statement, statement });
    } else if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        const init = declaration.initializer;
        if (ts.isIdentifier(declaration.name) && init !== undefined && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))) {
          callables.set(declaration.name.text, { kind: "const", node: init, statement });
        }
      }
    }
  }
  if (!methods.has(PATH_ROOT)) return null;
  const members: PathMember[] = [];
  const seen = new Set<string>();
  const queue: { readonly kind: "method" | "function" | "const"; readonly name: string }[] = [{ kind: "method", name: PATH_ROOT }];
  for (let next = queue.shift(); next !== undefined; next = queue.shift()) {
    const key = `${next.kind}:${next.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const callable = next.kind === "method" ? undefined : callables.get(next.name);
    const node = next.kind === "method" ? methods.get(next.name) : callable?.node;
    const shown = next.kind === "method" ? node : callable?.statement;
    if (node === undefined || shown === undefined) continue;
    members.push({ name: next.name, kind: next.kind, text: shown.getText(source) });
    const visit = (child: ts.Node): void => {
      if (ts.isCallExpression(child)) {
        const callee = child.expression;
        if (ts.isPropertyAccessExpression(callee) && callee.expression.kind === ts.SyntaxKind.ThisKeyword && methods.has(callee.name.text)) {
          queue.push({ kind: "method", name: callee.name.text });
        } else if (ts.isIdentifier(callee)) {
          const target = callables.get(callee.text);
          if (target !== undefined) queue.push({ kind: target.kind, name: callee.text });
        }
      }
      ts.forEachChild(child, visit);
    };
    visit(node);
  }
  return members;
}
const pathKeys = (members: readonly PathMember[] | null): string[] => (members ?? []).map(member => `${member.kind}:${member.name}`);
/** The path members whose text differs between two adapter texts (a member present in one only counts as changed). */
function changedMembers(before: string, after: string): string[] {
  const left = new Map((pathOf(before) ?? []).map(member => [`${member.kind}:${member.name}`, member.text]));
  const right = new Map((pathOf(after) ?? []).map(member => [`${member.kind}:${member.name}`, member.text]));
  return [...new Set([...left.keys(), ...right.keys()])].filter(key => left.get(key) !== right.get(key));
}
/** A one-character plant inside a member's text: an empty comment before its last character. */
const plantedInside = (adapter: string, member: PathMember): string => adapter.replace(member.text, `${member.text.slice(0, -1)}/**/${member.text.slice(-1)}`);
const adapterAt = (sha: string): string => git(["show", `${sha}:${ADAPTER}`]);

// ---- the judged rows (rule 16) ----

interface Row {
  readonly id: string;
  /** Row T: the title's trigger; rows A to C: an acceptance clause; row Q: the residual families. */
  readonly label: string;
  readonly pins: readonly string[];
}
/** Each pin's quote: the quotes of a row tile its label. Q's pins name their residual families. */
const QUOTES: Readonly<Record<string, string>> = {
  T1: "When Pi hosts a GraphPolicyCLI decision point",
  A1: "a host test drives a fixture GP reply through the Pi decision point",
  A2: "and asserts no native verb or executor request is issued unless the converted decision passed basis validation",
  A3: "and decideControl returned permitted",
  A4: "with a core-minted receipt (isCoreMintedDecision, control.ts:255)",
  B1: "a reply whose snapshot digest differs from the observed basis",
  B2: "yields a conflict/refusal receipt",
  B3: "and no effect",
  C1: "the Furnace-hosted adapter's execute/interpret path",
  C2: "stays byte-identical",
  Q1: "R-SPELLING",
  Q2: "R-SIDE-PATH",
  Q3: "R-CHOSEN-TARGET",
  Q4: "R-ADAPTER-OUTSIDE-PATH",
};
const ROWS: readonly Row[] = [
  { id: "T", label: "When Pi hosts a GraphPolicyCLI decision point", pins: ["T1"] },
  {
    id: "A",
    label:
      "a host test drives a fixture GP reply through the Pi decision point and asserts no native verb or executor request is issued unless the converted decision passed basis validation and decideControl returned permitted with a core-minted receipt (isCoreMintedDecision, control.ts:255)",
    pins: ["A1", "A2", "A3", "A4"],
  },
  { id: "B", label: "a reply whose snapshot digest differs from the observed basis yields a conflict/refusal receipt and no effect", pins: ["B1", "B2", "B3"] },
  { id: "C", label: "the Furnace-hosted adapter's execute/interpret path stays byte-identical", pins: ["C1", "C2"] },
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2", "Q3", "Q4"] },
];

/** The residual families' members: texts for the token reader (Q1), synthetic points (Q2, Q3), adapter plants (Q4). */
const SPELLINGS: Readonly<Record<string, string>> = {
  "camel-case": "const digest = reply.graphDigest;\nconst chosen = reply.sample.chosenId;\nconst cli = \"graphPolicyCli\";\n",
  composed: "const member = [\"graph\", \"digest\"].join(\"_\");\nconst choice = \"chosen\" + \"_id\";\n",
  "lower-case-name": "// graphpolicycli answers over a graphdatair snapshot\n",
};
/** Whether a text names an identifier as a whole word. */
const namesIdentifier = (text: string, name: string): boolean => new RegExp(`(?<![A-Za-z0-9_$])${escaped(name)}(?![A-Za-z0-9_$])`).test(text);
/**
 * Row Q4's members, derived from the adapter's AST and never spelled here: the first class method off the path, the first
 * same-file constant (a non-function initializer) a path member names, and the first import whose binding a path member names.
 */
function outsideStatements(text: string): Readonly<Record<string, string | undefined>> {
  const source = ts.createSourceFile(ADAPTER, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const members = pathOf(text) ?? [];
  const onPath = new Set(members.filter(member => member.kind === "method").map(member => member.name));
  const named = (name: string): boolean => members.some(member => namesIdentifier(member.text, name));
  let method: string | undefined;
  let constant: string | undefined;
  let importLine: string | undefined;
  for (const statement of source.statements) {
    if (ts.isClassDeclaration(statement) && statement.name?.text === ADAPTER_CLASS) {
      method ??= statement.members.find(member => ts.isMethodDeclaration(member) && ts.isIdentifier(member.name) && !onPath.has(member.name.text))?.getText(source);
    } else if (ts.isVariableStatement(statement) && constant === undefined) {
      const declared = statement.declarationList.declarations.filter(declaration => {
        const init = declaration.initializer;
        return ts.isIdentifier(declaration.name) && init !== undefined && !ts.isArrowFunction(init) && !ts.isFunctionExpression(init) && named(declaration.name.text);
      });
      if (declared.length > 0) constant = statement.getText(source);
    } else if (ts.isImportDeclaration(statement) && importLine === undefined) {
      const bindings = statement.importClause?.namedBindings;
      const locals = bindings !== undefined && ts.isNamedImports(bindings) ? bindings.elements.map(element => element.name.text) : [];
      if (locals.some(named)) importLine = statement.getText(source);
    }
  }
  return { "method-outside-path": method, "same-file-constant": constant, "import-line": importLine };
}
const OUTSIDE_PATH: Readonly<Record<string, (adapter: string) => string>> = Object.fromEntries(
  ["method-outside-path", "same-file-constant", "import-line"].map(name => [name, (adapter: string): string => {
    const statement = outsideStatements(adapter)[name];
    return statement === undefined ? adapter : plantedInside(adapter, { name, kind: "const", text: statement });
  }]),
);
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  Q1: Object.keys(SPELLINGS),
  Q2: ["side-path-point"],
  Q3: ["unchosen-target-point"],
  Q4: Object.keys(OUTSIDE_PATH),
};

// ---- the planted controls ----

const VOCABULARY_PLANTS: Readonly<Record<string, string>> = {
  names: `// a ${NAMES[0]} decision point over a ${NAMES[1]} snapshot\n`,
  reply: `if (reply.schema === "${REPLY_SCHEMA}" && reply.kind === "${REPLY_KIND}") return reply.${REPLY_DIGEST};\n`,
  choice: `const chosen = reply.sample.${REPLY_CHOICE};\n`,
  all: `${VOCABULARY.join(" ")}\n`,
  quiet: `const ${REPLY_DIGEST}s = 1;\nconst x${REPLY_CHOICE} = 2;\nconst ${NAMES[0]}s = 3;\nconst id = "${REPLY_SCHEMA}0";\nconst kind = "re${REPLY_KIND}x";\n`,
};

// ---- the cases ----

const IMPL: Readonly<Record<string, () => Json>> = {
  T1: () => {
    const src = srcEntries();
    const hosting = src.filter(entry => namedVocabulary(entry.text).length > 0);
    const findings = hosting.map(entry => `${entry.path}: ${namedVocabulary(entry.text).join(", ")}`);
    const bound = GP_DECISION_POINTS.map(entry => entry.path);
    expect(findings, "no src module spells the GP decision vocabulary").toEqual([]);
    expect(hosting.map(entry => entry.path), "the src modules that spell it are exactly the bound decision points").toEqual(bound);
    const srcFloor = src.length >= SRC_FLOOR;
    expect(srcFloor, "the src floor").toBe(true);
    const readsCore = src.find(entry => entry.path === CORE)?.text.includes("export function isCoreMintedDecision(") === true;
    const readsAdapter = src.find(entry => entry.path === ADAPTER)?.text.includes(`export class ${ADAPTER_CLASS} `) === true;
    expect({ readsCore, readsAdapter }, "the src leg read the control core's and the adapter's real text").toEqual({ readsCore: true, readsAdapter: true });
    const controls = Object.fromEntries(Object.entries(VOCABULARY_PLANTS).map(([label, text]) => [label, namedVocabulary(text)]));
    expect(controls.all, "every member is read").toEqual([...VOCABULARY]);
    expect(controls.quiet, "near tokens are not the vocabulary").toEqual([]);
    return { findings, bound, srcFloor, readsCore, readsAdapter, controls };
  },
  A1: () => {
    const bound = GP_DECISION_POINTS.map(entry => ({ path: entry.path, violations: violationsOf(entry.point) }));
    for (const entry of bound) expect(Object.values(entry.violations).flat(), `${entry.path} meets every check`).toEqual([]);
    const bases = FIXTURES.map(entry => `${entry.id}:${basisOf(entry)}`);
    expect(bases, "each fixture's basis is the census's computed reading").toEqual(FIXTURES.map(entry => `${entry.id}:${entry.basis}`));
    const honest = violationsOf(HONEST);
    const honestCalls = Object.fromEntries(FIXTURES.map(entry => [entry.id, callsOf(HONEST, entry.id)]));
    const judged = Object.fromEntries(Object.keys(MUTANTS).map(name => [name, mutant(name)]));
    const fired = CHECKS.filter(check => Object.values(judged).some(table => Object.values(table).some(list => list.includes(check))));
    const quiet = Object.entries(judged).filter(([, table]) => Object.values(table).every(list => list.length === 0)).map(([name]) => name);
    expect(Object.values(honest).flat(), "the honest point meets every check on every fixture").toEqual([]);
    expect(honestCalls, "the honest point reaches the seam for the current reply only").toEqual({ F1: 1, F2: 0, F3: 0, F4: 0, F5: 0 });
    expect(fired, "every check fires on some mutant").toEqual([...CHECKS]);
    expect(quiet, "every mutant fails some check").toEqual([]);
    const fixtureReply = {
      replyDigest: String(own(REPLY, REPLY_DIGEST)),
      presentedDigest: digestOf(SNAPSHOT_BYTES),
      chosen: String(own(own(REPLY, "sample"), REPLY_CHOICE)),
      sourceSha: String(own(own(VENDORED, "generator"), "sourceSha")),
    };
    expect(fixtureReply.replyDigest, "the fixture reply was sampled over the snapshot fixture's exact bytes").toBe(fixtureReply.presentedDigest);
    return { bound: bound.map(entry => entry.path), bases, honest, honestCalls, fired, quiet, fixtureReply, "M-INERT": judged["M-INERT"] ?? null };
  },
  A2: () => {
    const honestCalls = { F2: callsOf(HONEST, "F2"), F4: callsOf(HONEST, "F4"), F5: callsOf(HONEST, "F5") };
    expect(honestCalls, "the honest point issues nothing for a reply that fails conversion or basis validation").toEqual({ F2: 0, F4: 0, F5: 0 });
    const reached = { "M-NO-BASIS": callsOf(pointOf(MUTANTS["M-NO-BASIS"] ?? {}), "F4"), "M-UNCONVERTED": callsOf(pointOf(MUTANTS["M-UNCONVERTED"] ?? {}), "F5") };
    expect(reached, "a point skipping validation reaches the seam").toEqual({ "M-NO-BASIS": 1, "M-UNCONVERTED": 1 });
    return {
      honestCalls,
      honestReceipts: { F4: receiptsOf(HONEST, "F4"), F5: receiptsOf(HONEST, "F5") },
      reached,
      "M-NO-BASIS": mutant("M-NO-BASIS"),
      "M-DIGEST-ONLY": mutant("M-DIGEST-ONLY"),
      "M-REVISION-ONLY": mutant("M-REVISION-ONLY"),
      "M-UNCONVERTED": mutant("M-UNCONVERTED"),
    };
  },
  A3: () => {
    const F3 = fixture("F3");
    const core = decideControl(requestFor(F3, String(own(own(REPLY, "sample"), REPLY_CHOICE))), { projection: projectionOf(F3), now: () => DECIDED_AT });
    const denial: Json = core.decision === "denied" ? { decision: core.decision, policy: core.policy, category: core.category } : { decision: core.decision };
    expect(denial, "an observer grant is denied before any verb").toEqual({ decision: "denied", policy: "observer-only", category: "authorization" });
    const providers = Object.keys(NATIVE_CONTROL_ACTIONS).filter(provider => /graph|policy|(?<![a-z])gp(?![a-z])/i.test(provider));
    const request: NativeControlRequest = {
      scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: ["control:graphpolicy.execute"],
      target: { provider: "graphpolicy", type: "decision", id: "exec-a1-t1", scope: WS }, action: "execute", params: { confirmed: true }, invocationId: "inv-gp", requestedAt: REQUESTED_AT,
    };
    const gp = decideControl(request, { projection: projectionOf(fixture("F1")), now: () => DECIDED_AT });
    const gpVerb: Json = gp.decision === "denied" ? { decision: gp.decision, policy: gp.policy, category: gp.category } : { decision: gp.decision };
    expect(providers, "the core registers no GraphPolicyCLI provider").toEqual([]);
    expect(gpVerb, "an exact grant for a GraphPolicyCLI verb reads unknown-action").toEqual({ decision: "denied", policy: "unknown-action", category: "validation" });
    const executed = mutant("M-DENIED");
    expect(executed.F3, "a denial handed to the seam is caught").toContain("effect-unpermitted");
    const forging = mutant("M-FORGED-GRANT");
    const replayed = againOf("M-REPLAYED-PERMIT");
    const unrequestedReplay = againOf("M-NO-REQUEST-REPLAY");
    const reachedF3 = {
      "M-FORGED-GRANT": callsOf(pointOf(MUTANTS["M-FORGED-GRANT"] ?? {}), "F3"),
      "M-REPLAYED-PERMIT": replayed.reachedF3,
      "M-NO-REQUEST-REPLAY": unrequestedReplay.reachedF3,
    };
    expect(reachedF3, "each executes F3's reply, which the core denies on F3's own request").toEqual({ "M-FORGED-GRANT": 1, "M-REPLAYED-PERMIT": 1, "M-NO-REQUEST-REPLAY": 1 });
    const nextF1 = { "M-REPLAYED-PERMIT": replayed.nextF1, "M-NO-REQUEST-REPLAY": unrequestedReplay.nextF1 };
    const issuedLater = { "M-REPLAYED-PERMIT": replayed.issuedLater, "M-NO-REQUEST-REPLAY": unrequestedReplay.issuedLater };
    const handedF1s = { "M-REPLAYED-PERMIT": replayed.handedF1s, "M-NO-REQUEST-REPLAY": unrequestedReplay.handedF1s };
    expect(handedF1s, "each replay hands F3 and the next F1 the very permit F1's call handed the seam").toEqual({ "M-REPLAYED-PERMIT": true, "M-NO-REQUEST-REPLAY": true });
    expect(issuedLater["M-NO-REQUEST-REPLAY"], "the no-request replay issues no request on F3 or the next F1").toEqual([0, 0]);
    const chosen = String(own(own(REPLY, "sample"), REPLY_CHOICE));
    const issuedObject = requestFor(F3, chosen);
    const grantsArray = issuedObject.grants;
    const asked = forged(issuedObject);
    const forgedInPlace = { sameObject: asked === issuedObject, sameGrantsArray: asked.grants === grantsArray, grants: [...(asked.grants ?? [])] };
    expect(forgedInPlace, "M-FORGED-GRANT asks on the issued object itself, the exact grant appended to its own grants array").toEqual({
      sameObject: true,
      sameGrantsArray: true,
      grants: [...F3.grants, ...CONTROL_GRANTS.filter(grant => !F3.grants.includes(grant))],
    });
    const unrequested = {
      "M-FORGED-GRANT": forging.F3,
      "M-REPLAYED-PERMIT": replayed.table.F3,
      "M-NO-REQUEST-REPLAY": unrequestedReplay.table.F3,
      "M-REPLAYED-PERMIT next F1": nextF1["M-REPLAYED-PERMIT"],
      "M-NO-REQUEST-REPLAY next F1": nextF1["M-NO-REQUEST-REPLAY"],
    };
    for (const [name, found] of Object.entries(unrequested)) expect(found, `${name}: a permit for a request this call did not issue is caught`).toContain("effect-unrequested");
    const recorded = recordReading();
    const candidates = executable(SNAPSHOT_BYTES);
    const F1 = fixture("F1");
    const mintedFor = requestFor(F1, chosen);
    const members = Object.keys(mintedFor);
    expect(recorded, "the drive records a copy of every request its requestOf returned, in order, taken at the return: an in-place edit of any member afterwards edits no record").toEqual({
      requests: candidates.length,
      copies: candidates.length,
      inOrder: true,
      changed: [],
      edited: members,
      inPlace: members.filter(key => typeof own(mintedFor, key) === "object"),
    });
    const permit = decideControl(mintedFor, { projection: projectionOf(F1), now: () => DECIDED_AT });
    const others = candidates.filter(candidate => candidate !== chosen).map(candidate => requestFor(F1, candidate));
    const [otherRequest = mintedFor] = others;
    const foreign = decideControl(otherRequest, { projection: projectionOf(F1), now: () => DECIDED_AT });
    const handed = (id: string, decisions: readonly ControlDecision[], issued: readonly NativeControlRequest[]): Check[] =>
      violations(fixture(id), { receipts: [], calls: decisions.map(decision => ({ decision, answer: "frn-ack-control" })), issued });
    const judged = (issued: readonly NativeControlRequest[]): Check[] => handed("F1", [permit], issued);
    const records = { first: [mintedFor, ...others], last: [...others, mintedFor], between: [...others.slice(0, 1), mintedFor, ...others.slice(1)] };
    const positions = Object.fromEntries(Object.entries(records).map(([label, issued]) => [label, [issued.indexOf(mintedFor), issued.length]]));
    expect(positions, "the permit's own request sits first, last and second of the four").toEqual({
      first: [0, candidates.length],
      last: [candidates.length - 1, candidates.length],
      between: [1, candidates.length],
    });
    const answered = {
      none: Object.fromEntries(FIXTURES.map(entry => [entry.id, handed(entry.id, [permit], [])])),
      first: judged(records.first),
      last: judged(records.last),
      between: judged(records.between),
      "a second decision answering none": handed("F3", [permit, foreign], [mintedFor]),
      "a first decision answering none": handed("F3", [foreign, permit], [mintedFor]),
      "both decisions answering": handed("F3", [permit, foreign], [mintedFor, otherRequest]),
    };
    expect(answered, "a permit handed with no request issued fails the check on every fixture; its own request issued anywhere in four passes; of two handed decisions, either one answering none fails").toEqual({
      none: {
        F1: ["effect-unrequested"],
        F2: ["effect-unvalidated", "effect-unrequested", "mismatch-receipt"],
        F3: ["effect-unrequested"],
        F4: ["effect-unvalidated", "effect-unrequested"],
        F5: ["effect-unvalidated", "effect-unrequested"],
      },
      first: [],
      last: [],
      between: [],
      "a second decision answering none": ["effect-unrequested"],
      "a first decision answering none": ["effect-unrequested"],
      "both decisions answering": [],
    });
    const receipt = own(permit, "receipt");
    const echoedByCore = record(receipt) ? Object.keys(receipt).filter(key => Object.hasOwn(mintedFor, key) && isDeepStrictEqual(own(receipt, key), own(mintedFor, key))) : [];
    expect(echoedByCore, "the request fields the core's own receipt echoes are the ones the check reads").toEqual([...ECHOED]);
    const altered = (value: unknown): unknown => (typeof value === "string" ? `${value}~` : record(value) ? { ...value, altered: true } : null);
    const read = [...ECHOED, "grant"];
    const echo = {
      minted: answers(receipt, mintedFor),
      grantsReversed: answers(receipt, { ...mintedFor, grants: [...(mintedFor.grants ?? [])].reverse() }),
      altered: Object.fromEntries(read.map(field => [field, answers(record(receipt) ? { ...receipt, [field]: altered(own(receipt, field)) } : null, mintedFor)])),
    };
    expect(echo, "a minted receipt answers its own request, with that request's grants in either order, and no longer with any one echoed field or its grant altered").toEqual({
      minted: true,
      grantsReversed: true,
      altered: Object.fromEntries(read.map(field => [field, false])),
    });
    return {
      providers,
      denial,
      gpVerb,
      "M-DENIED": executed,
      "M-FORGED-GRANT": forging,
      "M-REPLAYED-PERMIT": replayed.table,
      "M-NO-REQUEST-REPLAY": unrequestedReplay.table,
      reachedF3,
      nextF1,
      issuedLater,
      handedF1s,
      forgedInPlace,
      recorded,
      positions,
      answered,
      echoedByCore,
      echo,
    };
  },
  A4: () => {
    const F1 = fixture("F1");
    const chosen = String(own(own(REPLY, "sample"), REPLY_CHOICE));
    const minted = decideControl(requestFor(F1, chosen), { projection: projectionOf(F1), now: () => DECIDED_AT });
    const F3 = fixture("F3");
    const denied = decideControl(requestFor(F3, chosen), { projection: projectionOf(F3), now: () => DECIDED_AT });
    const truth = {
      minted: isCoreMintedDecision(minted),
      spread: isCoreMintedDecision({ ...minted }),
      json: isCoreMintedDecision(JSON.parse(JSON.stringify(minted))),
      denial: isCoreMintedDecision(denied),
      reply: isCoreMintedDecision(REPLY),
      typed: isCoreMintedDecision(convert(REPLY)),
    };
    expect(truth, "only the very permit the core minted is core-minted").toEqual({ minted: true, spread: false, json: false, denial: false, reply: false, typed: false });
    return { truth, "M-LOOKALIKE": mutant("M-LOOKALIKE"), "M-COPY": mutant("M-COPY") };
  },
  B1: () => {
    const F2 = fixture("F2");
    const replyDigest = String(own(F2.reply, REPLY_DIGEST));
    const presented = digestOf(F2.presented);
    const currentDigest = digestOf(fixture("F1").presented);
    expect(presented, "F2's presented bytes hash to a digest the reply does not carry").not.toBe(replyDigest);
    expect(currentDigest, "while F1's bytes hash to the reply's own").toBe(replyDigest);
    const sameDocument = isDeepStrictEqual(JSON.parse(Buffer.from(F2.presented).toString("utf8")), JSON.parse(Buffer.from(fixture("F1").presented).toString("utf8")));
    expect(sameDocument, "F2 is the same document in other bytes").toBe(true);
    return { replyDigest, presentedDigest: presented, currentDigest, sameDocument, basis: basisOf(F2), honestReceipts: receiptsOf(HONEST, "F2") };
  },
  B2: () => {
    const honest = receiptsOf(HONEST, "F2");
    expect(honest, "the honest point records one conflict receipt naming the mismatch").toEqual([{ status: "conflict", code: MISMATCH, candidate: "exec-a1-t1" }]);
    return { honest, "M-MISMATCH-SILENT": mutant("M-MISMATCH-SILENT"), "M-MISMATCH-DENIED": mutant("M-MISMATCH-DENIED") };
  },
  B3: () => {
    const honestCalls = callsOf(HONEST, "F2");
    expect(honestCalls, "the honest point issues no effect for a mismatched reply").toBe(0);
    const both = pointOf(MUTANTS["M-RECEIPT-AND-EFFECT"] ?? {});
    const judged = mutant("M-RECEIPT-AND-EFFECT");
    expect(judged.F2, "a receipt beside an effect still fails, on the effect alone").toEqual(["effect-unvalidated"]);
    return { honestCalls, bothCalls: callsOf(both, "F2"), bothReceipts: receiptsOf(both, "F2"), "M-RECEIPT-AND-EFFECT": judged };
  },
  C1: () => {
    const head = textOf(ADAPTER);
    const members = pathOf(head);
    expect(members, "the adapter holds the path's root").not.toBeNull();
    const keys = pathKeys(members);
    expect(keys.slice(0, 1), "the path opens at FurnaceHostedExecutor.execute").toEqual([`method:${PATH_ROOT}`]);
    expect(keys.filter(key => key === "method:interpret"), "and reaches interpret once").toEqual(["method:interpret"]);
    const digests = (members ?? []).map(member => `${member.kind}:${member.name}:${sha256(member.text).slice(0, 16)}`);
    return { keys, digests, pathDigest: sha256((members ?? []).map(member => member.text).join("\n")) };
  },
  C2: () => {
    const head = textOf(ADAPTER);
    const pinned = adapterAt(PI_PIN);
    const atHead = pathKeys(pathOf(head));
    const atPin = pathKeys(pathOf(pinned));
    expect(atHead, "the path at HEAD has the pin's members").toEqual(atPin);
    const changed = changedMembers(pinned, head);
    expect(changed, "every path member is byte-identical to its text at the bead's pin").toEqual([]);
    const planted = Object.fromEntries((pathOf(head) ?? []).map(member => [`${member.kind}:${member.name}`, changedMembers(head, plantedInside(head, member))]));
    for (const [key, found] of Object.entries(planted)) expect(found, `a plant inside ${key} is its change, only`).toEqual([key]);
    return { pin: PI_PIN, atPin, changed, planted };
  },
  Q1: () => {
    const findings = Object.fromEntries(Object.entries(SPELLINGS).map(([name, text]) => [name, namedVocabulary(text)]));
    expect(Object.values(findings).flat(), "R-SPELLING: every member is quiet").toEqual([]);
    return findings;
  },
  Q2: () => {
    let side = 0;
    const found = violationsOf(pointOf({ side: () => { side += 1; } }));
    expect(Object.values(found).flat(), "R-SIDE-PATH: the checks read the seam only").toEqual([]);
    expect(side, "the side path was taken").toBeGreaterThan(0);
    return { violations: found, side };
  },
  Q3: () => {
    const point = pointOf({ target: typed => typed.candidates[typed.candidates.length - 1] ?? typed.chosenId });
    const found = violationsOf(point);
    const executed = receiptsOf(point, "F1");
    expect(Object.values(found).flat(), "R-CHOSEN-TARGET: no check binds the executed candidate to the choice").toEqual([]);
    expect(executed, "the point executed another candidate than the reply's choice").not.toEqual(receiptsOf(HONEST, "F1"));
    return { violations: found, executed, chosen: String(own(own(REPLY, "sample"), REPLY_CHOICE)) };
  },
  Q4: () => {
    const head = textOf(ADAPTER);
    const findings = Object.fromEntries(Object.entries(OUTSIDE_PATH).map(([name, plant]) => {
      const planted = plant(head);
      return [name, { plantedHere: planted !== head, changed: changedMembers(head, planted) }];
    }));
    for (const [name, entry] of Object.entries(findings)) {
      expect(entry, `R-ADAPTER-OUTSIDE-PATH: the ${name} plant changes the adapter and no path member`).toEqual({ plantedHere: true, changed: [] });
    }
    return findings;
  },
};

interface Roster {
  readonly bead: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly witnesses: Readonly<Record<string, Json>>;
  readonly tests: readonly string[];
}
const ROSTER = JSON.parse(textOf(ROSTER_PATH)) as Roster;
const REACHED: { readonly pin: string; readonly same: boolean }[] = [];

/** The tracker export's row for a bead. */
function beadRow(bead: string): { readonly title: string; readonly notes: string } | undefined {
  for (const line of textOf(EXPORT).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (!record(row) || row.id !== bead) continue;
    const { title, notes } = row;
    if (typeof title === "string") return { title, notes: typeof notes === "string" ? notes : "" };
  }
  return undefined;
}
/** What the anchors read from the notes: the owner filing's first "Citation: " line only, so a later note binds nothing. */
function filingReading(notes: string): { readonly clauses: readonly string[]; readonly pin?: string; readonly coreLine?: number; readonly adapterLine?: number } {
  const citation = notes.split("\n").find(line => line.startsWith("Citation: ")) ?? "";
  const acceptance = /(?:^|\. )Acceptance: (.*?)\. Consolidation: /.exec(citation)?.[1] ?? "";
  return {
    clauses: acceptance === "" ? [] : acceptance.split("; "),
    pin: /core-minted decisions only @([0-9a-f]{12})\b/.exec(citation)?.[1],
    coreLine: Number(/\(isCoreMintedDecision, control\.ts:(\d+)\)/.exec(citation)?.[1] ?? Number.NaN),
    adapterLine: Number(/src\/workbench\/hosts\/furnace-hosted\.ts:(\d+) '/.exec(citation)?.[1] ?? Number.NaN),
  };
}
interface LeadReading {
  readonly check?: string;
  readonly points: readonly string[];
}
/** What the anchors read from a follow-up's notes: its first line opening "[leads] - F1 " only, so a later note binds nothing. */
function leadReading(notes: string): LeadReading {
  const lead = notes.split("\n").find(line => line.startsWith("[leads] - F1 ")) ?? "";
  const cure = /arm a request-binding check \(([a-z-]+)\) with (P-[A-Z-]+) and (P-[A-Z-]+) as its mutants/.exec(lead);
  return { check: cure?.[1], points: cure === null ? [] : [cure[2] ?? "", cure[3] ?? ""] };
}
/**
 * The anchor conditions a lead reading fails, in order: "check" (its check is none of CHECKS), "two points" (it names no two
 * distinct points) and "twin <i>" (point i's M- twin, its P- read as M-, is no mutant failing that check on F3).
 */
function leadFindings(lead: LeadReading): string[] {
  const findings: string[] = [];
  if (!CHECKS.some(check => check === lead.check)) findings.push("check");
  if (lead.points.length !== 2 || new Set(lead.points).size !== 2) findings.push("two points");
  for (const [index, point] of lead.points.entries()) {
    const twin = point.replace(/^P-/, "M-");
    if (!(Object.hasOwn(MUTANTS, twin) && (mutant(twin).F3 ?? []).some(check => check === lead.check))) findings.push(`twin ${index}`);
  }
  return findings;
}
const jsonReading = (lead: LeadReading): Json => ({ check: lead.check ?? null, points: [...lead.points] });
/** Planted follow-up notes (in memory), each with the reading the lead reader must give it: one per reading clause. */
const LEAD_PLANTS: Readonly<Record<string, { readonly notes: string; readonly reading: Json }>> = {
  "the lead line": {
    notes: "context\n[leads] - F1 cure: arm a request-binding check (c-one) with P-ONE and P-TWO as its mutants.\nlater",
    reading: { check: "c-one", points: ["P-ONE", "P-TWO"] },
  },
  "a lead line further in": {
    notes: "context\n [leads] - F1 cure: arm a request-binding check (c-one) with P-ONE and P-TWO as its mutants.",
    reading: { check: null, points: [] },
  },
  "a cure phrase off the lead line": {
    notes: "context: arm a request-binding check (c-one) with P-ONE and P-TWO as its mutants.\n[leads] - F1 no cure here.\nlater: arm a request-binding check (c-two) with P-THREE and P-FOUR as its mutants.",
    reading: { check: null, points: [] },
  },
  "another finding's lead line first": {
    notes: "[leads] - F13 cure: arm a request-binding check (c-thirteen) with P-ONE and P-TWO as its mutants.\n[leads] - F1 cure: arm a request-binding check (c-one) with P-THREE and P-FOUR as its mutants.",
    reading: { check: "c-one", points: ["P-THREE", "P-FOUR"] },
  },
  "a later lead line": {
    notes: "[leads] - F1 cure: arm a request-binding check (c-one) with P-ONE and P-TWO as its mutants.\n[leads] - F1 later: arm a request-binding check (c-two) with P-THREE and P-FOUR as its mutants.",
    reading: { check: "c-one", points: ["P-ONE", "P-TWO"] },
  },
};
/** The outside-anchors case pushes here as its last statement, so the roster case sees that it ran to its end. */
const ANCHORED: string[] = [];
/** The quotes tile the label in order, with nothing but separators (whitespace, comma, semicolon, colon) between. */
function tiles(label: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = label.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:]*$/.test(label.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:]*$/.test(label.slice(at));
}
const lineAt = (sha: string, path: string, line: number): string => git(["show", `${sha}:${path}`]).split("\n")[line - 1] ?? "";

describe(SUITE, () => {
  for (const row of ROWS) {
    for (const pin of row.pins) {
      it(`${pin}: ${QUOTES[pin] ?? ""}`, { timeout: LIVE_BUDGET_MS }, () => {
        const implementation = IMPL[pin];
        const witness = implementation === undefined ? null : implementation();
        expect(witness, `${pin} has a case`).not.toBeNull();
        const expected = ROSTER.witnesses[pin];
        REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
        expect(witness, `${pin}'s witness equals the roster's`).toStrictEqual(expected);
      });
    }
  }

  it("rule 16: the rows, the residual families, the vocabulary, the checks, the mutants, the fixtures, the bound points and the path are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:1", "A:4", "B:3", "C:2", "Q:4"]);
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:3", "Q2:1", "Q3:1", "Q4:3"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(VOCABULARY).toEqual(["GraphPolicyCLI", "GraphDataIR", "graphpolicy.receipt.decision.v1", "sampled-decision", "graph_digest", "chosen_id"]);
    expect(CHECKS).toEqual(["effect-unvalidated", "effect-unpermitted", "effect-unminted", "effect-unrequested", "mismatch-receipt", "current-unexecuted"]);
    expect(ECHOED).toEqual(["scope", "principal", "target", "action", "invocationId", "requestedAt"]);
    expect(Object.keys(MUTANTS)).toEqual([
      "M-NO-BASIS",
      "M-DIGEST-ONLY",
      "M-REVISION-ONLY",
      "M-UNCONVERTED",
      "M-DENIED",
      "M-FORGED-GRANT",
      "M-REPLAYED-PERMIT",
      "M-NO-REQUEST-REPLAY",
      "M-LOOKALIKE",
      "M-COPY",
      "M-MISMATCH-SILENT",
      "M-MISMATCH-DENIED",
      "M-RECEIPT-AND-EFFECT",
      "M-INERT",
    ]);
    expect(Object.keys(LEAD_PLANTS)).toEqual(["the lead line", "a lead line further in", "a cure phrase off the lead line", "another finding's lead line first", "a later lead line"]);
    expect(FIXTURES.map(entry => `${entry.id}:${entry.basis}:${entry.grants.length}:${entry.current}`)).toEqual([
      "F1:valid:2:true",
      "F2:snapshot-mismatch:2:false",
      "F3:valid:1:false",
      "F4:revision-mismatch:2:false",
      "F5:reply-unconverted:2:false",
    ]);
    expect(GP_DECISION_POINTS).toEqual([]);
    expect(SRC_FLOOR).toBe(100);
    expect(PI_PIN).toBe("758ec18187a5d66ba40b766caad38754b5313558");
    expect(pathKeys(pathOf(textOf(ADAPTER)))).toEqual([
      "method:execute",
      "method:record",
      "function:hasCancellation",
      "function:safeText",
      "method:interpret",
      "method:toResult",
      "const:isRecord",
    ]);
  });

  it("the outside anchors: the bead's own row binds the rows, the pin quotes, the names and the pin; the citations resolve at the pin; the vendored reply and snapshot bind the vocabulary and the fixtures; the follow-up's lead line binds the request-binding check and the gate's two points", { timeout: 60_000 }, () => {
    const row = beadRow(BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const title = row?.title ?? "";
    const prefix = `[${REQUIREMENT}] `;
    expect(title.startsWith(prefix), "the title opens with the requirement id").toBe(true);
    const trigger = ROWS.find(entry => entry.id === "T")?.label ?? "-";
    expect(title.slice(prefix.length).startsWith(`${trigger} (artifact: `), "row T's label is the title's trigger, before its artifact parenthetical").toBe(true);
    const titleNames = title.match(/(?<![A-Za-z])Graph[A-Z][A-Za-z]*/g) ?? [];
    expect(titleNames, "the title names exactly the vocabulary's two names").toEqual([...NAMES]);
    const filing = filingReading(row?.notes ?? "");
    expect(filing.clauses, "the Acceptance sentence holds three clauses, each exactly one row's label").toEqual(["A", "B", "C"].map(id => ROWS.find(entry => entry.id === id)?.label));
    for (const entry of ROWS.filter(candidate => candidate.id !== "Q")) {
      expect(tiles(entry.label, entry.pins.map(pin => QUOTES[pin] ?? "")), `row ${entry.id}'s pin quotes tile its label`).toBe(true);
    }
    const appended = `${row?.notes ?? ""}\nCitation: a later note. Acceptance: x; y. Consolidation: none. core-minted decisions only @000000000000.`;
    expect(filingReading(appended), "a note appended after the filing changes no reading").toEqual(filing);
    expect(PI_PIN.startsWith(filing.pin ?? "-"), "the Pi pin is the filing's").toBe(true);
    expect(lineAt(PI_PIN, CORE, filing.coreLine ?? 0), "clause A's control.ts citation resolves at the pin").toContain("export function isCoreMintedDecision(");
    expect(lineAt(PI_PIN, ADAPTER, filing.adapterLine ?? 0), "the filing's furnace-hosted.ts citation resolves at the pin").toContain("This module adds no scheduler, no retry and no checkpoint");
    expect(textOf(CORE), "the control core still exports the clause's two names").toContain("export function decideControl(");
    expect(own(REPLY, "schema"), "the vendored reply's schema").toBe(REPLY_SCHEMA);
    expect(own(REPLY, "kind"), "the vendored reply's kind").toBe(REPLY_KIND);
    expect(Object.hasOwn(record(REPLY) ? REPLY : {}, REPLY_DIGEST), "the vendored reply carries the digest member").toBe(true);
    const sample = own(REPLY, "sample");
    expect(Object.hasOwn(record(sample) ? sample : {}, REPLY_CHOICE), "its sample carries the choice member").toBe(true);
    const inputs = own(own(VENDORED, "generator"), "inputs");
    const listed: readonly unknown[] = Array.isArray(inputs) ? inputs : [];
    const recorded = listed.find(entry => own(entry, "path") === SNAPSHOT_INPUT);
    expect(`sha256:${String(own(recorded, "sha256"))}`, "the reply's digest is the generator's recorded input digest").toBe(own(REPLY, REPLY_DIGEST));
    expect(digestOf(SNAPSHOT_BYTES), "and the snapshot fixture's own").toBe(own(REPLY, REPLY_DIGEST));
    expect(revisionOf(SNAPSHOT_BYTES), "the snapshot's revision is F1's observed basis").toBe(fixture("F1").observed);
    const candidates = own(REPLY, "candidates");
    expect(strings(candidates) && candidates.every(candidate => executable(SNAPSHOT_BYTES).includes(candidate)), "every candidate is a can_execute relation of the snapshot").toBe(true);
    expect(strings(candidates) && !candidates.includes(UNCHOSEN) && executable(SNAPSHOT_BYTES).includes(UNCHOSEN), "F5's choice is observed but no candidate").toBe(true);
    const digestMembers = record(REPLY) ? Object.keys(REPLY).filter(key => own(REPLY, key) === digestOf(SNAPSHOT_BYTES)) : [];
    const choiceMembers = record(sample) && strings(candidates) ? Object.keys(sample).filter(key => candidates.includes(String(own(sample, key)))) : [];
    const derived = [...titleNames, String(own(REPLY, "schema")), String(own(REPLY, "kind")), ...digestMembers, ...choiceMembers];
    expect(derived, "the vocabulary is the title's names, the reply's own schema and kind, the member holding the snapshot digest and the sample member holding a candidate").toEqual([...VOCABULARY]);
    const lead = leadReading(beadRow(FOLLOW_UP)?.notes ?? "");
    expect(leadFindings(lead), `${FOLLOW_UP}'s lead line names one of the checks and two distinct points whose M- twins are mutants failing it on F3`).toEqual([]);
    const [point0 = "", point1 = ""] = lead.points;
    const anchorReadings = {
      "a check outside the checks": leadFindings({ check: "effect-elsewhere", points: lead.points }),
      "another check": leadFindings({ check: CHECKS.find(check => check !== lead.check), points: lead.points }),
      "one point twice": leadFindings({ check: lead.check, points: [point0, point0] }),
      "three points": leadFindings({ check: lead.check, points: [point0, point1, point1] }),
      "a point with no twin": leadFindings({ check: lead.check, points: [point0, "P-NO-SUCH-POINT"] }),
      "a twin failing that check among others": leadFindings({ check: lead.check, points: ["P-DENIED", point0] }),
      "no cure phrase": leadFindings({ points: [] }),
    };
    expect(anchorReadings, "each planted reading fails exactly the anchor conditions it breaks").toEqual({
      "a check outside the checks": ["check", "twin 0", "twin 1"],
      "another check": ["twin 0", "twin 1"],
      "one point twice": ["two points"],
      "three points": ["two points"],
      "a point with no twin": ["twin 1"],
      "a twin failing that check among others": [],
      "no cure phrase": ["check", "two points"],
    });
    const planted = Object.fromEntries(Object.entries(LEAD_PLANTS).map(([label, plant]) => [label, jsonReading(leadReading(plant.notes))]));
    expect(planted, "the lead reader gives each planted note its reading").toEqual(Object.fromEntries(Object.entries(LEAD_PLANTS).map(([label, plant]) => [label, plant.reading])));
    const appendedLead = `${beadRow(FOLLOW_UP)?.notes ?? ""}\n[leads] - F1 later: arm a request-binding check (x) with P-X and P-Y as its mutants.`;
    expect(leadReading(appendedLead), "a note appended after the lead line changes no reading").toEqual(lead);
    ANCHORED.push("outside anchors");
  });

  it("roster: the judged rows, the quotes, the residual members and the registered tests equal test/fixtures/gp-decision-executor-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
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
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED.map(entry => entry.pin), "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(REACHED.filter(entry => !entry.same).map(entry => entry.pin), "and each compare held").toEqual([]);
    expect(ANCHORED, "the outside-anchors case ran to its end").toEqual(["outside anchors"]);
  });
});
