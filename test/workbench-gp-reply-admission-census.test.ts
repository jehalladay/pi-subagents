/**
 * wb-0lf.3 (FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R3, program-triage-2026-10-18, child of wb-0lf), the GP reply admission
 * census. Statement (bead title, verbatim): "When Pi admits a GraphPolicyCLI reply (artifact: released GP reply schema + a Pi
 * decision point), the host shall independently check schema and checkpoint identity, snapshot-digest freshness vs the pinned
 * basis, actor scope, action support and resource constraints before admission; a stale basis, unsupported action, worker
 * timeout or crash yields a typed refusal, never a decision or success."
 * Acceptance (owner filing, verbatim; rows A, B and C are its three '; '-separated clauses, the third without its trailing
 * carry note "(carries O11's GP case)"): "a reader-adapter test over a fixture reply asserts admission requires schema id and
 * checkpoint id in the pinned set, snapshotDigest === the digest Pi exported, actor in scope and proposed action inside the
 * exported support; each violation yields exactly one typed refusal naming only the field and no decision object; a GP worker
 * timeout, non-zero exit or malformed stdout yields typed unavailable and no receipt row claims success (carries O11's GP
 * case)". Row T's label is the title's trigger, verbatim: its parenthetical names the two gating artifacts.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-28, at base ade68d6534cc). Producer (the local Furnace checkout, git show;
 * the roster's producer block holds the three lines and the blob, and this census never re-reads the producer): at the bead's
 * pin 0f791db71b9d, docs/programs/graph-policy-decision-executor-2026-10-18/README.md (blob 73135c2df014) line 13 opens
 * "Furnace host checks schema, source freshness, actor scope, action support and resource constraints independently.", line
 * 11 lists the reply ("Reply: schema and checkpoint identity, snapshot digest, ..."), line 25 carries "no fabricated success on
 * worker timeout, model crash or retry", and line 3 opens "**2026-10-18, design-only.**". The reply schema half of the gate is
 * released: test/fixtures/gp-sample-receipt.json (vendored by wb-gxd7.5) holds gp sample's own result.decision at
 * GraphPolicyCLI 3f7d52cd17397d8e, a graphpolicy.receipt.decision.v1 sampled-decision receipt that gp inspect decision
 * accepted, and its graph_digest is the SHA-256 of test/fixtures/gp-host-adapter-snapshot.json's bytes (the producer's
 * host-adapter snapshot, vendored byte for byte; wb-gxd7.3 captured the same value as P-SAMPLE-FILE). The gp CLI frame is
 * measured in test/fixtures/gp-kind-label-roster.json's producer runs (wb-gxd7.4, the same build): exit 0 writes
 * {"schema":"graphpolicy.cli.v1","ok":true,"result":...} and the run "ready-work" exits 2 with an ok:false GP_CLI_ error
 * envelope; wb-gxd7.3 measured the receipt's path in gp sample's stdout as result.decision. The Pi decision point half is
 * unbuilt: at the base no src module (116 files) spells a GraphPolicyCLI name or a receipt identity field as a whole token
 * (the one near miss is src/workbench/reactivefiber-observer.ts's GRAPH_DIGEST, an rf constant), NATIVE_CONTROL_ACTIONS
 * registers no GraphPolicyCLI provider (so decideControl denies a gp target as unknown-action before it reads the
 * projection), and the decision point of wb-0lf.1 has not landed.
 *
 * Pi admits no GP reply today. The census pins that (row T) and an ARMED contract (rows A to C) that binds the first admitter
 * to come, as the wb-4ap.16 intent-host and wb-gxd7.3 snapshot-join censuses arm theirs:
 *  T, the trigger. T1 (Pi admits a reply): no src module spells the reply vocabulary (GraphPolicyCLI's names in any case,
 *    the receipt's identity fields graph_digest, checkpoint_digest and chosen_id and their camel-case spellings, each a whole
 *    case-sensitive token), and the src modules that do are exactly the bound admitters in GP_REPLY_ADMITTERS (empty both
 *    ways today), the reader shown reading its planted controls, quiet on the near miss's real text, holding at least
 *    SRC_FLOOR files and the control core's real text. T2 (the released reply schema): the vendored receipt is gp sample's
 *    accepted output, its schema the pinned reply schema, carrying every field the checks read. T3 (a Pi decision point): the
 *    control core has no GraphPolicyCLI provider.
 *  A, B, C, armed on landing. The armed contract reads an admitter as one function over the call: the snapshot bytes Pi
 *    presented, the pinned reply schemas and checkpoints, the actor scope, the exported support, and the worker's result
 *    (timed out, exit code, stdout). It yields typed results ({outcome: admitted, decision}, {outcome: refused, field},
 *    {outcome: unavailable, cause}) and records receipt rows ({outcome, tone}, tone a Pi statusTone). Fifteen fixtures, each
 *    built from the vendored receipt and snapshot, run every admitter: F-ADMIT (the reply as gp wrote it); one fixture per
 *    field, each violating that field alone (F-SCHEMA gp's shipped runtime receipt schema in place of the decision receipt's,
 *    F-CHECKPOINT a prefix-sharing checkpoint id outside the pinned set, F-DIGEST-COMPACT / -NEWLINE / -CRLF the snapshot
 *    presented under wb-gxd7.3's whitespace-only edits, F-DIGEST-MOVED a snapshot whose content moved, F-ACTOR a scope without
 *    the proposal's worker, F-SUPPORT a proposal the reply's own candidates claim and Pi never offered); and six worker
 *    fixtures (F-TIMEOUT and F-EXIT-CRASH with a complete valid reply on stdout, F-EXIT-ERROR the measured exit-2 envelope
 *    verbatim, F-MALFORMED-TRUNCATED / -EMPTY / -NO-DECISION). Eleven CHECKS judge each journal: admitted-<field> (a reply
 *    violating that field was admitted), refusal-count (a violating reply did not yield exactly one result, a refusal),
 *    refusal-field (a refusal names another field or anything beside the field), refusal-decision (a result of a violating
 *    reply carries a decision: an admitted result, a decision key, or the reply's proposal at any depth), unavailable (a worker
 *    fixture did not yield exactly one unavailable result of its cause), success-row (a non-admitted call recorded a row of
 *    tone success, or of an outcome other than refused and unavailable) and decision-kept (the valid reply was not admitted
 *    exactly once with its proposal and its receipt verbatim). The census's reference admitter (HONEST) passes every fixture;
 *    each of the 23 MUTANTS fails at least one check, and every check fires.
 *  A1 the bound admitters (none) and the synthetic ones over every fixture. A2 schema and checkpoint identity: exact members
 *    of the pinned sets, never a receipt family (any graphpolicy.receipt.* schema) or a shared checkpoint prefix. A3 the
 *    digest: the SHA-256 of exactly the bytes presented (wb-gxd7.3's presentedKey; its clause (c) names this check), so the
 *    whitespace-only presentations refuse and a host that re-serializes before hashing is caught. A4 the actor: the worker of
 *    the exported relation the proposal names, inside the scope. A5 the support: the exported support, never the reply's own
 *    candidates. B1 exactly one refusal; B2 the refusal's own keys are outcome and field (in any order); B3 no result of a
 *    violating reply carries a decision. C1 each worker fixture yields exactly one unavailable of its cause; C2 no row of a
 *    refused or unavailable call claims success.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): the frozen-shape case pins `${id}:${pins.length}` for ROWS and each residual family's member
 * count as literals, beside the fields, the causes, the checks, the mutants, the fixtures, the field tokens and the admitters;
 * the judged set (every row's id, label and pins, every pin's quote and witness, the residual members, every registered test
 * title) is held to the out-of-file roster test/fixtures/gp-reply-admission-roster.json. OUTSIDE ANCHORS (their own case): the
 * bead's own row in the tracker export (.beads/issues.jsonl): the title opens with the requirement tag and row T's label is
 * its trigger; each acceptance clause of the owner filing's citation line is exactly one row's label (C without its carry
 * note); each row's pin quotes tile its label; the five fields are clause (a)'s requirement list and the three causes are
 * clause (c)'s, member for member; the citation's two quoted producer lines sit in the roster's producer lines at the cited
 * pin; every reading is taken from the filing's own citation line, so a note appended later changes none. The vendored receipt
 * and the measured runs bind the pinned ids and the CLI frame, Pi's own source binds the words unavailable (capability
 * registry) and success (statusTone), and the wb-gxd7.3 census binds row A3's quote. So a field, a cause, a pin or a row removed
 * from every literal of this file and the roster together still reds. The last case reads the vitest task tree (every
 * registered test, in roster order, in run mode, ran before it) and REACHED (every pin reached its witness compare).
 * NOT CLAIMED: qa/, test/ and docs/ (a test names the vocabulary as the text it judges, this census included); the decision
 * point's actual shape (the armed contract is this census's reading of an unbuilt decision point, so an admitter whose cut
 * takes another shape re-measures rows A to C with it); the RPC transport (gp rpc --stdio replies are not modelled; the armed
 * call is the CLI's exit code and stdout); a deterministic, scores-only reply (gp eval's keyed scores carry no proposal:
 * wb-0lf.5's duty); which result a host yields for a reply violating two fields (R-MULTI-VIOLATION); a check removed from
 * CHECKS and from the judge together while every remaining mutant still fails one; a mutant or a fixture removed from its
 * table, the frozen literal and the roster together while every check still fires; a residual family removed from every
 * literal of this file and the roster together (no anchor outside the census holds the residual list); a pin's case replaced
 * by one that echoes its roster witness. An unavailable result may carry more than its outcome and cause (wb-1xvp.4's
 * fallback record echoes the producer's refusal code verbatim); only those two are judged.
 * RESIDUALS (named families, each member a pinned quiet row; an instrument that starts reading a member reds its row):
 * R-SPELLING (Q1, a receipt field the vocabulary reader does not read: composed from parts at run time, concatenated, or the
 * upper-case constant of another producer), R-MULTI-VIOLATION (Q2, a reply violating two fields: the judge accepts a refusal
 * naming either), R-RESOURCE (Q3, the statement's "resource constraints": no acceptance clause names one, the armed call
 * carries no exported budget and no check reads the reply's runtime_budget) and R-SIDE-PATH (Q4, an admitter that reports a
 * refused reply's proposal outside its journal: the armed check reads the returned results and rows only).
 * SCOPE: the vocabulary reader does not read negation or context, so a src comment that merely names a field reds T1 (OVER-READ,
 * disclosed: no src module spells one today).
 *
 * Display paths added: none. Test-only: no src change, no GraphPolicyCLI dependency, adapter, worker or fake binary.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { describe, expect, it } from "vitest";
import type { CapabilityErrorCategory } from "../src/workbench/capability-registry.js";
import { decideControl, NATIVE_CONTROL_ACTIONS, type NativeControlRequest } from "../src/workbench/control.js";
import { ObservationProjection, type ObservationScope, type Presentation } from "../src/workbench/observation.js";
import { CAPTURES, fixtureOf, materialize, type Presented, presentedBytes, presentedKey, type WhitespaceEdit } from "./helpers/gp-snapshot-join-census.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-0lf.3";
const REQUIREMENT = "FURNACE-GRAPH-POLICY-DECISION-EXECUTOR-R3";
const SUITE = `gp reply admission census (${BEAD}, ${REQUIREMENT})`;
const ROSTER_PATH = "test/fixtures/gp-reply-admission-roster.json";
const EXPORT = ".beads/issues.jsonl";
/** wb-gxd7.5's vendored gp sample receipt: result.decision of gp sample's stdout, unedited, accepted by gp inspect decision. */
const SAMPLE = "test/fixtures/gp-sample-receipt.json";
/** The producer's host-adapter snapshot, vendored byte for byte: the bytes the sample receipt's graph_digest hashes. */
const SNAPSHOT = "test/fixtures/gp-host-adapter-snapshot.json";
/** wb-gxd7.4's measured gp CLI runs (argv, rc, stdout) at the same build: the census's source for the CLI frame. */
const RUNS = "test/fixtures/gp-kind-label-roster.json";
/** The measured run whose stdout is the exit-2 error envelope F-EXIT-ERROR replays verbatim. */
const ERROR_RUN = "ready-work";
/** wb-gxd7.3's census: its acceptance (c) binds row A3's check to the byte-exact join key. */
const JOIN_CENSUS = "test/workbench-gp-snapshot-join-census.test.ts";
const CONTROL = "src/workbench/control.ts";
const REGISTRY = "src/workbench/capability-registry.ts";
const OBSERVATION = "src/workbench/observation.ts";
/** The one src module holding a near miss of the reply vocabulary (an rf digest pattern named GRAPH_DIGEST). */
const NEAR_MISS = "src/workbench/reactivefiber-observer.ts";
/** src holds well over this many files; fewer means the listing read nothing. */
const SRC_FLOOR = 100;
/** The live cases parse every src module or the tracker export; they carry this explicit budget. */
const LIVE_BUDGET_MS = 120_000;

type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json };
type Tone = Presentation["statusTone"];

const textOf = (path: string): string => readFileSync(join(ROOT, path), "utf8");
const bytesOf = (path: string): Uint8Array => new Uint8Array(readFileSync(join(ROOT, path)));
const utf8 = (text: string): Uint8Array => new Uint8Array(Buffer.from(text, "utf8"));

function record(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** An own data property; an accessor is never invoked and an inherited value never counts. */
function own(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null ? Object.getOwnPropertyDescriptor(value, key)?.value : undefined;
}
const ownKeys = (value: unknown): string[] => (typeof value === "object" && value !== null ? Reflect.ownKeys(value).map(key => String(key)) : []);
const listOf = (value: unknown): readonly unknown[] => (Array.isArray(value) ? value : []);
function recordOf(value: unknown, what: string): Readonly<Record<string, unknown>> {
  if (!record(value)) throw new Error(`${what} is not an object`);
  return value;
}

// ---- the reply vocabulary (row T1): GraphPolicyCLI's names and the receipt's identity fields ----

/** The receipt's identity fields the admission compares, as gp writes them, and their camel-case spellings. */
const FIELD_TOKENS = ["graph_digest", "checkpoint_digest", "chosen_id", "graphDigest", "checkpointDigest", "chosenId"] as const;
/** GraphPolicyCLI's names in any case: graph and policy joined or split by a hyphen, underscore, dot or space; GraphDataIR. */
const NAMESPACE = /graph[-_. ]?policy|graphdatair/i;
const escaped = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tokenPattern = (word: string): RegExp => new RegExp(`(?<![A-Za-z0-9_$])${escaped(word)}(?![A-Za-z0-9_$])`);
/** What a text spells of the reply vocabulary: the first GraphPolicyCLI name, then each field token, in FIELD_TOKENS order. */
function replyVocabulary(text: string): string[] {
  const name = NAMESPACE.exec(text)?.[0];
  return [...(name === undefined ? [] : [`namespace:${name.toLowerCase()}`]), ...FIELD_TOKENS.filter(token => tokenPattern(token).test(text))];
}

interface Entry {
  readonly path: string;
  readonly text: string;
}
let srcCache: readonly Entry[] | undefined;
/** git's would-commit listing under src/ (tracked and untracked, never ignored, present in the tree), each with its text. */
function srcEntries(): readonly Entry[] {
  if (srcCache === undefined) {
    const listed = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: ROOT, encoding: "utf8" });
    const paths = [...new Set(listed.split("\0").filter(path => path !== "" && existsSync(join(ROOT, path))))].sort();
    srcCache = paths.map(path => ({ path, text: textOf(path) }));
  }
  return srcCache;
}

// ---- the released reply (the vendored receipt, the vendored snapshot and the measured CLI frame) ----

/** The reply schema and checkpoint Pi pins: the vendored receipt's own (the outside anchors hold both to it). */
const PINNED_SCHEMA = "graphpolicy.receipt.decision.v1";
const PINNED_CHECKPOINT = "graphpolicy.checkpoint.c1:c463f16949fe653b3b09eab84f2ef6f80a60f880d02e85a515a28f3f61ac080d";
/** The gp CLI envelope's schema (the measured runs) and the decision's path in gp sample's stdout (wb-gxd7.3's capture). */
const ENVELOPE_SCHEMA = "graphpolicy.cli.v1";
/** The provider spellings the census tries at the control core: none is registered. */
const GP_PROVIDERS = ["gp", "graphpolicy", "graph-policy-cli"] as const;
/** The typed unavailable outcome: the capability registry's own category word. */
const UNAVAILABLE: Extract<CapabilityErrorCategory, "unavailable"> = "unavailable";
/** The tone a receipt row must never carry for a refused or unavailable call. */
const SUCCESS: Extract<Tone, "success"> = "success";
/** The only outcomes a row of a refused or unavailable call may record: any other word (admitted, succeeded, ...) claims more. */
const NON_SUCCESS: readonly string[] = ["refused", UNAVAILABLE];

const SAMPLE_DOC: unknown = JSON.parse(textOf(SAMPLE));
const RECEIPT = recordOf(own(SAMPLE_DOC, "receipt"), "the vendored receipt");
const SAMPLED = recordOf(own(RECEIPT, "sample"), "the vendored receipt's sample");
const JOIN = fixtureOf(bytesOf(SNAPSHOT));
const SNAPSHOT_VALUE = recordOf(JOIN.value, "the vendored snapshot");
const proposalOf = (receipt: unknown): unknown => own(own(receipt, "sample"), "chosen_id");
/** The exported support: the candidates gp received, which are the candidates Pi offered. */
const SUPPORT: readonly string[] = listOf(own(RECEIPT, "candidates")).filter((entry): entry is string => typeof entry === "string");
/** The actor scope of every fixture but F-ACTOR: the snapshot's agents. */
const AGENTS: readonly string[] = listOf(own(SNAPSHOT_VALUE, "entities"))
  .filter(entry => own(entry, "kind") === "agent")
  .map(entry => own(entry, "id"))
  .filter((entry): entry is string => typeof entry === "string");
/** The relation F-SUPPORT proposes: a can_execute relation of the snapshot Pi never offered, whose worker is in scope. */
const UNOFFERED = "exec-a2-t3";

interface MeasuredRun {
  readonly rc: number;
  readonly stdout: string;
}
/** A measured gp run of wb-gxd7.4's roster, by id. */
function measuredRun(id: string): MeasuredRun {
  const run = listOf(own(own(JSON.parse(textOf(RUNS)), "producer"), "runs")).find(entry => own(entry, "id") === id);
  const rc = own(run, "rc");
  const stdout = own(run, "stdout");
  if (typeof rc !== "number" || typeof stdout !== "string") throw new Error(`no measured run ${id}`);
  return { rc, stdout };
}
const MEASURED_ERROR = measuredRun(ERROR_RUN);

// ---- the armed contract: the census's reading of a Pi admitter for a GP reply ----

const FIELDS = ["schema", "checkpoint", "snapshotDigest", "actor", "support"] as const;
type Field = (typeof FIELDS)[number];
const CAUSES = ["timeout", "exit", "malformed"] as const;
type Cause = (typeof CAUSES)[number];

interface WorkerResult {
  /** The worker's deadline elapsed before it exited; stdout is whatever it had written. */
  readonly timedOut: boolean;
  /** Its exit code; null when it never exited. */
  readonly exitCode: number | null;
  readonly stdout: string;
}
interface AdmissionCall {
  /** The snapshot bytes Pi handed the worker (the CLI --graph file). */
  readonly presented: Uint8Array;
  /** The reply schema ids and checkpoint ids Pi pins. */
  readonly schemas: readonly string[];
  readonly checkpoints: readonly string[];
  /** The actor scope: the agents whose actions the caller may admit. */
  readonly actors: readonly string[];
  /** The exported support: the candidate action ids Pi offered. */
  readonly support: readonly string[];
  readonly worker: WorkerResult;
}
interface AdmissionJournal {
  /** What the admitter yields for the call; the judge reads each element by its own data properties. */
  readonly results: readonly unknown[];
  /** The receipt rows the admitter records for the call. */
  readonly rows: readonly unknown[];
}
type Admitter = (call: AdmissionCall) => AdmissionJournal;

/** The census allowlist: every src module bound as a GP reply admitter, with its armed entry point. Empty today. */
const GP_REPLY_ADMITTERS: readonly { readonly path: string; readonly admit: Admitter }[] = [];

const keyOf = (bytes: Uint8Array): string => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
/** The presented snapshot parsed and pretty-printed again: what a host hashing its own re-serialization hashes. */
function reserialized(bytes: Uint8Array): Uint8Array {
  try {
    return utf8(`${JSON.stringify(JSON.parse(Buffer.from(bytes).toString("utf8")), null, 2)}\n`);
  } catch {
    return bytes;
  }
}
/** The decision receipt of a gp CLI stdout: the frame's schema, ok true, and an object at result.decision. */
function decisionOf(stdout: string): Readonly<Record<string, unknown>> | undefined {
  let envelope: unknown;
  try {
    envelope = JSON.parse(stdout);
  } catch {
    return undefined;
  }
  if (own(envelope, "schema") !== ENVELOPE_SCHEMA || own(envelope, "ok") !== true) return undefined;
  const decision = own(own(envelope, "result"), "decision");
  return record(decision) ? decision : undefined;
}
/** The worker of the exported can_execute relation a proposal names, read from the bytes Pi presented (never from the reply). */
function actorOf(presented: Uint8Array, proposal: unknown): string | undefined {
  let snapshot: unknown;
  try {
    snapshot = JSON.parse(Buffer.from(presented).toString("utf8"));
  } catch {
    return undefined;
  }
  const relation = listOf(own(snapshot, "relations")).find(entry => own(entry, "id") === proposal && own(entry, "kind") === "can_execute");
  const workers = listOf(own(relation, "incidences"))
    .filter(entry => own(entry, "role") === "worker")
    .map(entry => own(entry, "participant"));
  const [worker] = workers;
  return workers.length === 1 && typeof worker === "string" ? worker : undefined;
}
/** The pinned schema's receipt family (graphpolicy.receipt.) and the pinned checkpoint's form prefix: what a loose host accepts. */
const familyOf = (id: string): string => `${id.split(".").slice(0, 2).join(".")}.`;
const prefixOf = (id: string): string => id.slice(0, id.indexOf(":") + 1);

/** How a synthetic admitter departs from the honest one (an empty shape is the honest admitter). */
interface Shape {
  /** Skip one field's check. */
  readonly skip?: Field;
  /** Accept any gp receipt schema of the pinned id's family, or any checkpoint id sharing the pinned id's prefix. */
  readonly schemaFamily?: boolean;
  readonly checkpointPrefix?: boolean;
  /** Hash the presented snapshot re-serialized instead of the bytes presented. */
  readonly reserialize?: boolean;
  /** Read the support from the reply's own candidates instead of the exported support. */
  readonly supportFromReply?: boolean;
  /** How a failed check is reported. */
  readonly refusal?: "twice" | "none" | "echo" | "first-field" | "with-decision" | "last-field";
  /** Read stdout although the deadline elapsed, or although the worker exited nonzero. */
  readonly timeoutRead?: boolean;
  readonly exitIgnored?: boolean;
  /** Report every unavailable cause as exit. */
  readonly causeCollapsed?: boolean;
  /** Report stdout that holds no decision as a schema refusal. */
  readonly malformedAsRefusal?: boolean;
  /** Salvage a proposal from stdout that holds no decision, and admit it. */
  readonly salvage?: boolean;
  /** Record every row with this tone. */
  readonly rowTone?: Tone;
  /** Also record an admitted row for every call that admits nothing. */
  readonly rowAdmitted?: boolean;
  /** Refuse every reply that parses. */
  readonly alwaysRefuse?: boolean;
  /** Admit the reply's last candidate instead of its sampled proposal. */
  readonly resample?: boolean;
  /** A side path: each refused reply's proposal, reported outside the journal. */
  readonly side?: (proposal: unknown) => void;
}
function passes(shape: Shape, field: Field, receipt: Readonly<Record<string, unknown>>, call: AdmissionCall): boolean {
  const proposal = proposalOf(receipt);
  switch (field) {
    case "schema": {
      const id = own(receipt, "schema");
      return typeof id === "string" && (shape.schemaFamily === true ? id.startsWith(familyOf(PINNED_SCHEMA)) : call.schemas.includes(id));
    }
    case "checkpoint": {
      const id = own(receipt, "checkpoint_digest");
      return typeof id === "string" && (shape.checkpointPrefix === true ? id.startsWith(prefixOf(PINNED_CHECKPOINT)) : call.checkpoints.includes(id));
    }
    case "snapshotDigest":
      return own(receipt, "graph_digest") === keyOf(shape.reserialize === true ? reserialized(call.presented) : call.presented);
    case "actor": {
      const actor = actorOf(call.presented, proposal);
      return actor !== undefined && call.actors.includes(actor);
    }
    case "support": {
      const offered: readonly unknown[] = shape.supportFromReply === true ? listOf(own(receipt, "candidates")) : call.support;
      return typeof proposal === "string" && offered.includes(proposal);
    }
  }
}
/** What a field's check compared, as the reply or the presented bytes state it (what an echoing refusal carries). */
function comparedValue(field: Field, receipt: Readonly<Record<string, unknown>>, call: AdmissionCall): unknown {
  if (field === "schema") return own(receipt, "schema");
  if (field === "checkpoint") return own(receipt, "checkpoint_digest");
  if (field === "snapshotDigest") return own(receipt, "graph_digest");
  if (field === "actor") return actorOf(call.presented, proposalOf(receipt)) ?? null;
  return proposalOf(receipt);
}
function hostOf(shape: Shape): Admitter {
  return call => {
    const results: unknown[] = [];
    const rows: unknown[] = [];
    const row = (outcome: string, tone: Tone): void => {
      rows.push({ outcome, tone: shape.rowTone ?? tone });
      if (shape.rowAdmitted === true && outcome !== "admitted") rows.push({ outcome: "admitted", tone: "active" });
    };
    const unavailable = (cause: Cause): AdmissionJournal => {
      results.push({ outcome: UNAVAILABLE, cause: shape.causeCollapsed === true ? "exit" : cause });
      row(UNAVAILABLE, "unknown");
      return { results, rows };
    };
    const refuse = (field: Field, receipt: Readonly<Record<string, unknown>> | undefined): AdmissionJournal => {
      const refusal = { outcome: "refused", field };
      if (shape.refusal === "twice") results.push(refusal, { ...refusal });
      else if (shape.refusal === "echo") results.push({ ...refusal, value: receipt === undefined ? null : comparedValue(field, receipt, call) });
      else if (shape.refusal === "first-field") results.push({ outcome: "refused", field: FIELDS[0] });
      else if (shape.refusal === "with-decision") results.push({ ...refusal, decision: { proposal: proposalOf(receipt), receipt: receipt ?? null } });
      else if (shape.refusal !== "none") results.push(refusal);
      row("refused", "failure");
      return { results, rows };
    };
    const admit = (proposal: unknown, receipt: unknown): AdmissionJournal => {
      results.push({ outcome: "admitted", decision: { proposal, receipt } });
      row("admitted", "active");
      return { results, rows };
    };
    const { worker } = call;
    if (worker.timedOut && shape.timeoutRead !== true) return unavailable("timeout");
    const exitCode = worker.timedOut ? 0 : worker.exitCode;
    if (exitCode !== 0 && shape.exitIgnored !== true) return unavailable("exit");
    const receipt = decisionOf(worker.stdout);
    if (receipt === undefined) {
      const salvaged = shape.salvage === true ? /"chosen_id":"([^"]+)"/.exec(worker.stdout)?.[1] : undefined;
      if (salvaged !== undefined) return admit(salvaged, null);
      return shape.malformedAsRefusal === true ? refuse(FIELDS[0], undefined) : unavailable("malformed");
    }
    if (shape.alwaysRefuse === true) return refuse(FIELDS[0], receipt);
    const failing = FIELDS.filter(field => field !== shape.skip && !passes(shape, field, receipt, call));
    if (failing.length > 0) {
      shape.side?.(proposalOf(receipt));
      return refuse(shape.refusal === "last-field" ? failing[failing.length - 1] : failing[0], receipt);
    }
    const candidates = listOf(own(receipt, "candidates"));
    return admit(shape.resample === true ? candidates[candidates.length - 1] : proposalOf(receipt), receipt);
  };
}
const HONEST = hostOf({});

// ---- the fixtures ----

type Expectation = { readonly kind: "admit" } | { readonly kind: "refuse"; readonly fields: readonly Field[] } | { readonly kind: "unavailable"; readonly cause: Cause };
interface Fixture {
  readonly id: string;
  readonly call: AdmissionCall;
  readonly expected: Expectation;
  /** The reply's decision receipt as the worker wrote it, when its stdout carries one. */
  readonly reply?: Readonly<Record<string, unknown>>;
}
const PRODUCER_SPEC = { field: "graph_digest", capture: "P-SAMPLE-FILE" } as const;
const presentation = (file: "fixture" | "compact", edit?: WhitespaceEdit): Presented =>
  materialize(JOIN, edit === undefined ? { transport: "cli", file } : { transport: "cli", file, edit }, PRODUCER_SPEC);
const FIXTURE_FILE = presentation("fixture");
/** The snapshot presented under each digest fixture: wb-gxd7.3's whitespace-only edits, and a snapshot whose content moved. */
const PRESENTATIONS: Readonly<Record<string, Presented>> = {
  "F-DIGEST-COMPACT": presentation("compact"),
  "F-DIGEST-NEWLINE": presentation("fixture", "strip-final-newline"),
  "F-DIGEST-CRLF": presentation("fixture", "crlf"),
  "F-DIGEST-MOVED": FIXTURE_FILE.transport === "cli" ? { ...FIXTURE_FILE, file: utf8(`${JSON.stringify(JOIN.variant, null, 2)}\n`) } : FIXTURE_FILE,
};
function presentationOf(id: string): Presented {
  const found = PRESENTATIONS[id];
  if (found === undefined) throw new Error(`no presentation ${id}`);
  return found;
}
const envelopeOf = (receipt: unknown): string => `${JSON.stringify({ schema: ENVELOPE_SCHEMA, ok: true, result: { decision: receipt } })}\n`;
const exited = (exitCode: number, stdout: string): WorkerResult => ({ timedOut: false, exitCode, stdout });
const VALID = envelopeOf(RECEIPT);
/** The valid stdout cut just after the proposal: the decision's tail and the frame never arrived. */
const TRUNCATED = VALID.slice(0, VALID.indexOf(`"chosen_id":${JSON.stringify(proposalOf(RECEIPT))}`) + `"chosen_id":${JSON.stringify(proposalOf(RECEIPT))}`.length);
function callOf(edit: Partial<AdmissionCall>): AdmissionCall {
  return { presented: presentedBytes(FIXTURE_FILE), schemas: [PINNED_SCHEMA], checkpoints: [PINNED_CHECKPOINT], actors: AGENTS, support: SUPPORT, worker: exited(0, VALID), ...edit };
}
const edited = (edits: Readonly<Record<string, unknown>>): Readonly<Record<string, unknown>> => ({ ...RECEIPT, ...edits });
/** A shipped gp receipt schema outside the pinned set: gp eval's runtime receipt in place of the sampled decision receipt. */
const R_SCHEMA = edited({ schema: "graphpolicy.receipt.runtime.v1" });
const R_CHECKPOINT = edited({ checkpoint_digest: `${prefixOf(PINNED_CHECKPOINT)}${"0".repeat(64)}` });
const R_SUPPORT = edited({ candidates: [...SUPPORT, UNOFFERED], sample: { ...SAMPLED, chosen_id: UNOFFERED } });
const R_OVER_BUDGET = edited({ runtime_budget: { max_candidates: 1, max_wall_ms: 1 } });
const refusing = (...fields: Field[]): Expectation => ({ kind: "refuse", fields });
const unavailableFor = (cause: Cause): Expectation => ({ kind: "unavailable", cause });
const OUT_OF_SCOPE = AGENTS.filter(agent => agent !== actorOf(presentedBytes(FIXTURE_FILE), proposalOf(RECEIPT)));
const digestFixture = (id: string): Fixture => ({
  id,
  call: callOf({ presented: presentedBytes(presentationOf(id)) }),
  expected: refusing("snapshotDigest"),
  reply: RECEIPT,
});
const FIXTURES: readonly Fixture[] = [
  { id: "F-ADMIT", call: callOf({}), expected: { kind: "admit" }, reply: RECEIPT },
  { id: "F-SCHEMA", call: callOf({ worker: exited(0, envelopeOf(R_SCHEMA)) }), expected: refusing("schema"), reply: R_SCHEMA },
  { id: "F-CHECKPOINT", call: callOf({ worker: exited(0, envelopeOf(R_CHECKPOINT)) }), expected: refusing("checkpoint"), reply: R_CHECKPOINT },
  digestFixture("F-DIGEST-COMPACT"),
  digestFixture("F-DIGEST-NEWLINE"),
  digestFixture("F-DIGEST-CRLF"),
  digestFixture("F-DIGEST-MOVED"),
  { id: "F-ACTOR", call: callOf({ actors: OUT_OF_SCOPE }), expected: refusing("actor"), reply: RECEIPT },
  { id: "F-SUPPORT", call: callOf({ worker: exited(0, envelopeOf(R_SUPPORT)) }), expected: refusing("support"), reply: R_SUPPORT },
  { id: "F-TIMEOUT", call: callOf({ worker: { timedOut: true, exitCode: null, stdout: VALID } }), expected: unavailableFor("timeout") },
  { id: "F-EXIT-ERROR", call: callOf({ worker: exited(MEASURED_ERROR.rc, MEASURED_ERROR.stdout) }), expected: unavailableFor("exit") },
  { id: "F-EXIT-CRASH", call: callOf({ worker: exited(134, VALID) }), expected: unavailableFor("exit") },
  { id: "F-MALFORMED-TRUNCATED", call: callOf({ worker: exited(0, TRUNCATED) }), expected: unavailableFor("malformed") },
  { id: "F-MALFORMED-EMPTY", call: callOf({ worker: exited(0, "") }), expected: unavailableFor("malformed") },
  { id: "F-MALFORMED-NO-DECISION", call: callOf({ worker: exited(0, `${JSON.stringify({ schema: ENVELOPE_SCHEMA, ok: true, result: {} })}\n`) }), expected: unavailableFor("malformed") },
];
/** The residual fixtures (never judged with FIXTURES): a reply violating two fields, and one over its own runtime budget. */
const F_TWO: Fixture = { id: "F-TWO", call: callOf({ worker: exited(0, envelopeOf(R_SCHEMA)), actors: OUT_OF_SCOPE }), expected: refusing("schema", "actor"), reply: R_SCHEMA };
const F_OVER_BUDGET: Fixture = { id: "F-OVER-BUDGET", call: callOf({ worker: exited(0, envelopeOf(R_OVER_BUDGET)) }), expected: { kind: "admit" }, reply: R_OVER_BUDGET };
function fixture(id: string): Fixture {
  const found = FIXTURES.find(entry => entry.id === id);
  if (found === undefined) throw new Error(`no fixture ${id}`);
  return found;
}

// ---- the judge ----

const CHECKS = [
  "admitted-schema",
  "admitted-checkpoint",
  "admitted-snapshotDigest",
  "admitted-actor",
  "admitted-support",
  "refusal-count",
  "refusal-field",
  "refusal-decision",
  "unavailable",
  "success-row",
  "decision-kept",
] as const;
type Check = (typeof CHECKS)[number];
const ADMITTED: Readonly<Record<Field, Check>> = {
  schema: "admitted-schema",
  checkpoint: "admitted-checkpoint",
  snapshotDigest: "admitted-snapshotDigest",
  actor: "admitted-actor",
  support: "admitted-support",
};
/** Whether a value holds the needle at any depth, by own properties (a cycle is walked once). */
function holds(value: unknown, needle: unknown, seen: Set<object> = new Set()): boolean {
  if (value === needle) return true;
  if (typeof value !== "object" || value === null || seen.has(value)) return false;
  seen.add(value);
  return Reflect.ownKeys(value).some(key => holds(Object.getOwnPropertyDescriptor(value, key)?.value, needle, seen));
}
/** A result carries a decision: it is admitted, has a decision key, or holds the reply's proposal anywhere. */
function carriesDecision(result: unknown, entry: Fixture): boolean {
  return own(result, "outcome") === "admitted" || ownKeys(result).includes("decision") || (entry.reply !== undefined && holds(result, proposalOf(entry.reply)));
}
/** The checks one driven fixture fails, in CHECKS order. */
function violations(entry: Fixture, journal: AdmissionJournal): Check[] {
  const found = new Set<Check>();
  const results = [...journal.results];
  const of = (outcome: string): unknown[] => results.filter(result => own(result, "outcome") === outcome);
  const { expected } = entry;
  if (expected.kind === "admit") {
    const [admitted] = of("admitted");
    const decision = own(admitted, "decision");
    const kept = own(decision, "proposal") === proposalOf(entry.reply) && isDeepStrictEqual(own(decision, "receipt"), entry.reply);
    if (results.length !== 1 || of("admitted").length !== 1 || !kept) found.add("decision-kept");
  } else if (journal.rows.some(row => own(row, "tone") === SUCCESS || !NON_SUCCESS.some(word => word === own(row, "outcome")))) {
    found.add("success-row");
  }
  if (expected.kind === "refuse") {
    if (of("admitted").length > 0) for (const field of expected.fields) found.add(ADMITTED[field]);
    const refused = of("refused");
    if (results.length !== 1 || refused.length !== 1) found.add("refusal-count");
    for (const result of refused) {
      const field = own(result, "field");
      if (!isDeepStrictEqual(ownKeys(result).sort(), ["field", "outcome"]) || !expected.fields.some(member => member === field)) found.add("refusal-field");
    }
    if (results.some(result => carriesDecision(result, entry))) found.add("refusal-decision");
  }
  if (expected.kind === "unavailable") {
    const unavailable = of(UNAVAILABLE);
    if (results.length !== 1 || unavailable.length !== 1 || own(unavailable[0], "cause") !== expected.cause) found.add("unavailable");
  }
  return CHECKS.filter(check => found.has(check));
}
const drive = (admit: Admitter, entry: Fixture): AdmissionJournal => admit(entry.call);
/** One admitter over every fixture: each fixture's failed checks. */
function violationsOf(admit: Admitter): Record<string, Check[]> {
  return Object.fromEntries(FIXTURES.map(entry => [entry.id, violations(entry, drive(admit, entry))]));
}
/** A one-word reading of a journal's results: outcome:field, outcome:cause or admitted:proposal, comma-joined. */
function outcomeOf(journal: AdmissionJournal): string {
  return journal.results
    .map(result => {
      const outcome = String(own(result, "outcome"));
      if (outcome === "refused") return `refused:${String(own(result, "field"))}`;
      if (outcome === UNAVAILABLE) return `${UNAVAILABLE}:${String(own(result, "cause"))}`;
      return `${outcome}:${String(own(own(result, "decision"), "proposal"))}`;
    })
    .join(",");
}
/** The fields a fixture's reply violates under the honest predicates (none when its stdout carries no decision). */
function failingOf(entry: Fixture): Field[] {
  const receipt = decisionOf(entry.call.worker.stdout);
  return receipt === undefined ? [] : FIELDS.filter(field => !passes({}, field, receipt, entry.call));
}

/** The synthetic admitters that must each fail the armed check: one or more per acceptance quote. */
const MUTANTS: Readonly<Record<string, Shape>> = {
  "M-NO-SCHEMA": { skip: "schema" },
  "M-SCHEMA-FAMILY": { schemaFamily: true },
  "M-NO-CHECKPOINT": { skip: "checkpoint" },
  "M-CHECKPOINT-PREFIX": { checkpointPrefix: true },
  "M-NO-DIGEST": { skip: "snapshotDigest" },
  "M-DIGEST-RESERIALIZED": { reserialize: true },
  "M-NO-ACTOR": { skip: "actor" },
  "M-NO-SUPPORT": { skip: "support" },
  "M-SUPPORT-FROM-REPLY": { supportFromReply: true },
  "M-REFUSAL-TWICE": { refusal: "twice" },
  "M-REFUSAL-NONE": { refusal: "none" },
  "M-REFUSAL-ECHO": { refusal: "echo" },
  "M-REFUSAL-FIRST-FIELD": { refusal: "first-field" },
  "M-REFUSAL-DECISION": { refusal: "with-decision" },
  "M-TIMEOUT-READ": { timeoutRead: true },
  "M-EXIT-IGNORED": { exitIgnored: true },
  "M-CAUSE-COLLAPSED": { causeCollapsed: true },
  "M-MALFORMED-REFUSED": { malformedAsRefusal: true },
  "M-SALVAGED": { salvage: true },
  "M-SUCCESS-ROW": { rowTone: "success" },
  "M-ADMITTED-ROW": { rowAdmitted: true },
  "M-ALWAYS-REFUSE": { alwaysRefuse: true },
  "M-PROPOSAL-RESAMPLED": { resample: true },
};
/** A mutant's failed checks, for the fixtures where it fails any. */
function mutant(name: string): Record<string, Check[]> {
  const shape = MUTANTS[name];
  if (shape === undefined) throw new Error(`no mutant ${name}`);
  return Object.fromEntries(Object.entries(violationsOf(hostOf(shape))).filter(([, found]) => found.length > 0));
}
const outcomesOf = (ids: readonly string[], admit: Admitter = HONEST): Record<string, string> =>
  Object.fromEntries(ids.map(id => [id, outcomeOf(drive(admit, fixture(id)))]));
const expectedFields = (entry: Fixture): Field[] => (entry.expected.kind === "refuse" ? [...entry.expected.fields] : []);
const expectedCause = (entry: Fixture): Cause | undefined => (entry.expected.kind === "unavailable" ? entry.expected.cause : undefined);
const REFUSE_IDS = FIXTURES.filter(entry => entry.expected.kind === "refuse").map(entry => entry.id);
const WORKER_IDS = FIXTURES.filter(entry => entry.expected.kind === "unavailable").map(entry => entry.id);
const DIGEST_IDS = Object.keys(PRESENTATIONS);

// ---- the judged rows (rule 16) ----

interface Row {
  readonly id: string;
  /** Row T: the title's trigger; rows A to C: an acceptance clause; row Q: the residual families. */
  readonly label: string;
  readonly pins: readonly string[];
}
/** Each pin's quote: the quotes of a row tile its label. Q's pins name their residual families. */
const QUOTES: Readonly<Record<string, string>> = {
  T1: "When Pi admits a GraphPolicyCLI reply",
  T2: "artifact: released GP reply schema",
  T3: "a Pi decision point",
  A1: "a reader-adapter test over a fixture reply asserts admission requires",
  A2: "schema id and checkpoint id in the pinned set",
  A3: "snapshotDigest === the digest Pi exported",
  A4: "actor in scope",
  A5: "and proposed action inside the exported support",
  B1: "each violation yields exactly one typed refusal",
  B2: "naming only the field",
  B3: "and no decision object",
  C1: "a GP worker timeout, non-zero exit or malformed stdout yields typed unavailable",
  C2: "and no receipt row claims success",
  Q1: "R-SPELLING",
  Q2: "R-MULTI-VIOLATION",
  Q3: "R-RESOURCE",
  Q4: "R-SIDE-PATH",
};
const ROWS: readonly Row[] = [
  { id: "T", label: "When Pi admits a GraphPolicyCLI reply (artifact: released GP reply schema + a Pi decision point)", pins: ["T1", "T2", "T3"] },
  {
    id: "A",
    label:
      "a reader-adapter test over a fixture reply asserts admission requires schema id and checkpoint id in the pinned set, snapshotDigest === the digest Pi exported, actor in scope and proposed action inside the exported support",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  { id: "B", label: "each violation yields exactly one typed refusal naming only the field and no decision object", pins: ["B1", "B2", "B3"] },
  { id: "C", label: "a GP worker timeout, non-zero exit or malformed stdout yields typed unavailable and no receipt row claims success", pins: ["C1", "C2"] },
  { id: "Q", label: "the residuals' pinned quiet rows", pins: ["Q1", "Q2", "Q3", "Q4"] },
];
/** The field each field-bearing pin of row A carries, in FIELDS order. */
const FIELD_PINS: Readonly<Record<Field, string>> = { schema: "A2", checkpoint: "A2", snapshotDigest: "A3", actor: "A4", support: "A5" };

/** The residual families' members: texts for the vocabulary reader (Q1), fixtures and synthetic admitters (Q2 to Q4). */
const SPELLINGS: Readonly<Record<string, string>> = {
  composed: 'const key = ["graph", "digest"].join("_");\nexport const digestOf = (reply: Record<string, string>) => reply[key];\n',
  concatenated: 'export const field = "checkpoint" + "_digest";\nexport const proposal = "chosen" + "_id";\n',
  "upper-snake": "const GRAPH_DIGEST = /^sha256:[0-9a-f]{64}$/;\nexport const CHOSEN_ID = 1;\n",
};
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  Q1: Object.keys(SPELLINGS),
  Q2: ["two-field-reply"],
  Q3: ["over-budget-reply"],
  Q4: ["side-path-admitter"],
};

// ---- the planted controls ----

const PLANTS: Readonly<Record<string, string>> = {
  field: "const digest = reply.graph_digest;\n",
  camel: "const { graphDigest, checkpointDigest, chosenId } = parsed;\n",
  namespace: 'if (envelope.schema === "graphpolicy.cli.v1") return envelope;\n',
  all: `GraphPolicyCLI ${FIELD_TOKENS.join(" ")}\n`,
  quiet: "const GRAPH_DIGEST = 1;\nconst graph_digests = 2;\nexport const xchosen_id = 3;\nconst digest = node.subjectBasis;\n",
};

// ---- the cases ----

const IMPL: Readonly<Record<string, () => Json>> = {
  T1: () => {
    const src = srcEntries();
    const reading = src.map(entry => ({ path: entry.path, found: replyVocabulary(entry.text) })).filter(entry => entry.found.length > 0);
    const named = reading.map(entry => `${entry.path}: ${entry.found.join(", ")}`);
    const bound = GP_REPLY_ADMITTERS.map(entry => entry.path);
    expect(named, "no src module spells a GraphPolicyCLI name or a receipt identity field").toEqual([]);
    expect(
      reading.map(entry => entry.path),
      "the src modules that read a GP reply are exactly the bound admitters",
    ).toEqual(bound);
    expect(src.length, "the src floor").toBeGreaterThanOrEqual(SRC_FLOOR);
    const readsCore = src.find(entry => entry.path === CONTROL)?.text.includes("export function decideControl(") === true;
    expect(readsCore, "the src leg read the control core's real text").toBe(true);
    const near = src.find(entry => entry.path === NEAR_MISS)?.text ?? "";
    expect(near.includes("GRAPH_DIGEST"), "the near miss's real text holds its constant").toBe(true);
    const controls = Object.fromEntries(Object.entries(PLANTS).map(([label, text]) => [label, replyVocabulary(text)]));
    expect(controls.all, "every member is read").toEqual(["namespace:graphpolicy", ...FIELD_TOKENS]);
    expect(controls.quiet, "near tokens are not the vocabulary").toEqual([]);
    return { srcFloor: src.length >= SRC_FLOOR, named, bound, readsCore, nearMiss: replyVocabulary(near), controls };
  },
  T2: () => {
    const generator = own(SAMPLE_DOC, "generator");
    const validation = own(SAMPLE_DOC, "validation");
    const argv = listOf(own(generator, "argv"));
    const witness = {
      generatedBy: String(argv[2]),
      accepted: own(validation, "ok") === true && own(validation, "valid") === true,
      sourceSha: String(own(generator, "sourceSha")),
      receiptSchema: String(own(RECEIPT, "schema")),
      kind: String(own(RECEIPT, "kind")),
      reads: {
        checkpoint_digest: typeof own(RECEIPT, "checkpoint_digest"),
        graph_digest: typeof own(RECEIPT, "graph_digest"),
        candidates: SUPPORT.length,
        proposal: String(proposalOf(RECEIPT)),
      },
      graphDigestHashesSnapshot: own(RECEIPT, "graph_digest") === keyOf(bytesOf(SNAPSHOT)),
      checkpointIsGeneratorArgument: argv[argv.indexOf("--checkpoint") + 1] === own(RECEIPT, "checkpoint_digest"),
    };
    expect(witness.generatedBy, "gp sample wrote the vendored receipt").toBe("sample");
    expect(witness.accepted, "gp inspect decision accepted it").toBe(true);
    expect(witness.receiptSchema, "its schema is the pinned reply schema").toBe(PINNED_SCHEMA);
    expect(witness.graphDigestHashesSnapshot, "its graph_digest hashes the vendored snapshot's bytes").toBe(true);
    expect(witness.checkpointIsGeneratorArgument, "its checkpoint is the one gp sample was handed").toBe(true);
    return witness;
  },
  T3: () => {
    const registered = GP_PROVIDERS.filter(provider => Object.hasOwn(NATIVE_CONTROL_ACTIONS, provider));
    const scope: ObservationScope = { workspace: "/work/gp-reply-admission", principal: "operator" };
    const request: NativeControlRequest = {
      scope,
      principal: { id: scope.principal, role: "local-operator" },
      grants: ["control:gp.apply"],
      target: { provider: "gp", type: "decision", id: "gp-decision-1", scope: scope.workspace },
      action: "apply",
      params: { confirmed: true },
      invocationId: "inv-gp-reply",
      requestedAt: "2026-10-28T05:00:00Z",
    };
    const core = decideControl(request, { projection: new ObservationProjection(), now: () => "2026-10-28T05:00:01Z" });
    const denial: Json = core.decision === "denied" ? { decision: core.decision, policy: core.policy, category: core.category } : { decision: core.decision };
    expect(registered, "the control core registers no GraphPolicyCLI provider").toEqual([]);
    expect(denial, "a gp target is an unknown action").toEqual({ decision: "denied", policy: "unknown-action", category: "validation" });
    return { registered, providers: Object.keys(NATIVE_CONTROL_ACTIONS), denial };
  },
  A1: () => {
    const bound = GP_REPLY_ADMITTERS.map(entry => ({ path: entry.path, violations: violationsOf(entry.admit) }));
    for (const entry of bound) expect(Object.values(entry.violations).flat(), `${entry.path} meets every check`).toEqual([]);
    const honest = violationsOf(HONEST);
    const judged = Object.fromEntries(Object.keys(MUTANTS).map(name => [name, mutant(name)]));
    const fired = CHECKS.filter(check => Object.values(judged).some(table => Object.values(table).some(found => found.includes(check))));
    const quiet = Object.entries(judged)
      .filter(([, table]) => Object.keys(table).length === 0)
      .map(([name]) => name);
    expect(Object.values(honest).flat(), "the honest admitter meets every check on every fixture").toEqual([]);
    expect(fired, "every check fires on some mutant").toEqual([...CHECKS]);
    expect(quiet, "every mutant fails some check").toEqual([]);
    expect(outcomeOf(drive(HONEST, fixture("F-ADMIT"))), "the valid reply is admitted with its proposal").toBe(`admitted:${String(proposalOf(RECEIPT))}`);
    return {
      bound: bound.map(entry => entry.path),
      outcomes: outcomesOf(FIXTURES.map(entry => entry.id)),
      fired,
      quiet,
      "M-ALWAYS-REFUSE": mutant("M-ALWAYS-REFUSE"),
      "M-PROPOSAL-RESAMPLED": mutant("M-PROPOSAL-RESAMPLED"),
    };
  },
  A2: () => {
    const outcomes = outcomesOf(["F-SCHEMA", "F-CHECKPOINT"]);
    expect(outcomes, "a schema id or a checkpoint id outside the pinned set is refused, naming it").toEqual({ "F-SCHEMA": "refused:schema", "F-CHECKPOINT": "refused:checkpoint" });
    const family = mutant("M-SCHEMA-FAMILY");
    const prefix = mutant("M-CHECKPOINT-PREFIX");
    expect(family["F-SCHEMA"], "a schema family is not the pinned set").toContain("admitted-schema");
    expect(prefix["F-CHECKPOINT"], "a shared checkpoint prefix is not the pinned set").toContain("admitted-checkpoint");
    return {
      outcomes,
      sharesPrefix: String(own(R_CHECKPOINT, "checkpoint_digest")).startsWith(prefixOf(PINNED_CHECKPOINT)),
      sharesFamily: String(own(R_SCHEMA, "schema")).startsWith(familyOf(PINNED_SCHEMA)),
      "M-NO-SCHEMA": mutant("M-NO-SCHEMA"),
      "M-SCHEMA-FAMILY": family,
      "M-NO-CHECKPOINT": mutant("M-NO-CHECKPOINT"),
      "M-CHECKPOINT-PREFIX": prefix,
    };
  },
  A3: () => {
    const exported = keyOf(presentedBytes(FIXTURE_FILE));
    const joinKeys = [FIXTURE_FILE, ...Object.values(PRESENTATIONS)].every(entry => keyOf(presentedBytes(entry)) === presentedKey(entry));
    const capture = CAPTURES.find(row => row.id === PRODUCER_SPEC.capture)?.value;
    const whitespaceOnly = Object.fromEntries(
      DIGEST_IDS.map(id => [id, isDeepStrictEqual(JSON.parse(Buffer.from(presentedBytes(presentationOf(id))).toString("utf8")), JOIN.value)]),
    );
    const outcomes = outcomesOf(DIGEST_IDS);
    const reserialized = mutant("M-DIGEST-RESERIALIZED");
    expect(exported, "the digest Pi exported is the reply's graph_digest").toBe(own(RECEIPT, "graph_digest"));
    expect(capture, "and wb-gxd7.3's P-SAMPLE-FILE capture").toBe(exported);
    expect(joinKeys, "the census's key is wb-gxd7.3's presentedKey on every presentation").toBe(true);
    expect(outcomes, "a presentation the reply did not hash is refused, naming snapshotDigest").toEqual(Object.fromEntries(DIGEST_IDS.map(id => [id, "refused:snapshotDigest"])));
    expect(Object.keys(reserialized), "hashing a re-serialization admits exactly the whitespace-only presentations").toEqual(DIGEST_IDS.filter(id => whitespaceOnly[id] === true));
    return { exported, joinKeys, whitespaceOnly, outcomes, "M-NO-DIGEST": mutant("M-NO-DIGEST"), "M-DIGEST-RESERIALIZED": reserialized };
  },
  A4: () => {
    const proposal = proposalOf(RECEIPT);
    const actor = actorOf(presentedBytes(FIXTURE_FILE), proposal) ?? null;
    const outcomes = outcomesOf(["F-ACTOR"]);
    expect(actor, "the proposal's worker is read from the exported relation").toBe("agent-1");
    expect(OUT_OF_SCOPE, "F-ACTOR's scope holds the other agent only").not.toContain(actor);
    expect(outcomes, "a proposal whose worker is out of scope is refused, naming actor").toEqual({ "F-ACTOR": "refused:actor" });
    return { proposal: String(proposal), actor, agents: [...AGENTS], scope: [...OUT_OF_SCOPE], outcomes, "M-NO-ACTOR": mutant("M-NO-ACTOR") };
  },
  A5: () => {
    const witness = {
      proposal: UNOFFERED,
      actor: actorOf(presentedBytes(FIXTURE_FILE), UNOFFERED) ?? null,
      offered: SUPPORT.includes(UNOFFERED),
      replyClaims: listOf(own(R_SUPPORT, "candidates")).includes(UNOFFERED),
      outcomes: outcomesOf(["F-SUPPORT"]),
      "M-NO-SUPPORT": mutant("M-NO-SUPPORT"),
      "M-SUPPORT-FROM-REPLY": mutant("M-SUPPORT-FROM-REPLY"),
    };
    expect(witness.actor, "the unoffered proposal's worker is in scope").toBe("agent-2");
    expect(witness.offered, "Pi never offered it").toBe(false);
    expect(witness.replyClaims, "the reply's own candidates claim it").toBe(true);
    expect(witness.outcomes, "it is refused, naming support").toEqual({ "F-SUPPORT": "refused:support" });
    expect(witness["M-SUPPORT-FROM-REPLY"]["F-SUPPORT"], "the reply's own support is no check").toContain("admitted-support");
    return witness;
  },
  B1: () => {
    const violated = Object.fromEntries(REFUSE_IDS.map(id => [id, failingOf(fixture(id))]));
    const counts = Object.fromEntries(REFUSE_IDS.map(id => [id, drive(HONEST, fixture(id)).results.length]));
    for (const id of REFUSE_IDS) expect(violated[id], `${id} violates exactly its one field`).toEqual(expectedFields(fixture(id)));
    expect(Object.values(counts), "each violating reply yields exactly one result").toEqual(REFUSE_IDS.map(() => 1));
    return { violated, counts, "M-REFUSAL-TWICE": mutant("M-REFUSAL-TWICE"), "M-REFUSAL-NONE": mutant("M-REFUSAL-NONE") };
  },
  B2: () => {
    const keys = Object.fromEntries(REFUSE_IDS.map(id => [id, drive(HONEST, fixture(id)).results.map(ownKeys)]));
    for (const id of REFUSE_IDS) expect(keys[id], `${id}'s refusal names the field and nothing else`).toEqual([["outcome", "field"]]);
    expect(violations(fixture("F-SCHEMA"), { results: [{ field: "schema", outcome: "refused" }], rows: [] }), "own-key order is not judged").toEqual([]);
    return { keys, "M-REFUSAL-ECHO": mutant("M-REFUSAL-ECHO"), "M-REFUSAL-FIRST-FIELD": mutant("M-REFUSAL-FIRST-FIELD") };
  },
  B3: () => {
    const carries = Object.fromEntries(REFUSE_IDS.map(id => [id, drive(HONEST, fixture(id)).results.some(result => carriesDecision(result, fixture(id)))]));
    expect(Object.values(carries), "no refusal carries a decision").toEqual(REFUSE_IDS.map(() => false));
    const leaked = mutant("M-REFUSAL-DECISION");
    expect(Object.keys(leaked), "a refusal carrying the decision is caught on every violating reply").toEqual(REFUSE_IDS);
    return { carries, "M-REFUSAL-DECISION": leaked };
  },
  C1: () => {
    const outcomes = outcomesOf(WORKER_IDS);
    expect(outcomes, "each worker failure yields exactly one typed unavailable of its cause").toEqual(
      Object.fromEntries(WORKER_IDS.map(id => [id, `${UNAVAILABLE}:${expectedCause(fixture(id)) ?? "none"}`])),
    );
    const error = JSON.parse(MEASURED_ERROR.stdout) as unknown;
    const measured = { rc: MEASURED_ERROR.rc, schema: String(own(error, "schema")), ok: own(error, "ok") === true, code: String(own(own(error, "error"), "code")) };
    expect(measured.rc !== 0 && !measured.ok && measured.code.startsWith("GP_CLI_"), "F-EXIT-ERROR replays a measured GP_CLI_ refusal").toBe(true);
    const timedOut = decisionOf(fixture("F-TIMEOUT").call.worker.stdout) !== undefined && decisionOf(fixture("F-EXIT-CRASH").call.worker.stdout) !== undefined;
    expect(timedOut, "the timeout and crash fixtures hold a complete valid reply on stdout").toBe(true);
    return {
      outcomes,
      measured,
      completeStdout: timedOut,
      "M-TIMEOUT-READ": mutant("M-TIMEOUT-READ"),
      "M-EXIT-IGNORED": mutant("M-EXIT-IGNORED"),
      "M-CAUSE-COLLAPSED": mutant("M-CAUSE-COLLAPSED"),
      "M-MALFORMED-REFUSED": mutant("M-MALFORMED-REFUSED"),
      "M-SALVAGED": mutant("M-SALVAGED"),
    };
  },
  C2: () => {
    const ids = FIXTURES.filter(entry => entry.expected.kind !== "admit").map(entry => entry.id);
    const rows = Object.fromEntries(ids.map(id => [id, drive(HONEST, fixture(id)).rows.map(row => `${String(own(row, "outcome"))}:${String(own(row, "tone"))}`)]));
    for (const id of ids) {
      for (const row of rows[id] ?? []) expect(row.endsWith(`:${SUCCESS}`) || !NON_SUCCESS.some(word => row.startsWith(`${word}:`)), `${id} records no success row`).toBe(false);
    }
    return { rows, "M-SUCCESS-ROW": mutant("M-SUCCESS-ROW"), "M-ADMITTED-ROW": mutant("M-ADMITTED-ROW") };
  },
  Q1: () => {
    const findings = Object.fromEntries(Object.entries(SPELLINGS).map(([name, text]) => [name, replyVocabulary(text)]));
    expect(Object.values(findings).flat(), "R-SPELLING: every member is quiet").toEqual([]);
    expect(replyVocabulary("reply.graph_digest"), "the reader reads the whole token").toEqual(["graph_digest"]);
    return findings;
  },
  Q2: () => {
    const last = hostOf({ refusal: "last-field" });
    const witness = {
      violated: failingOf(F_TWO),
      honest: outcomeOf(drive(HONEST, F_TWO)),
      last: outcomeOf(drive(last, F_TWO)),
      violations: { honest: violations(F_TWO, drive(HONEST, F_TWO)), last: violations(F_TWO, drive(last, F_TWO)) },
    };
    expect(witness.violated, "the reply violates two fields").toEqual(["schema", "actor"]);
    expect(witness.honest === witness.last, "the two admitters name different fields").toBe(false);
    expect([...witness.violations.honest, ...witness.violations.last], "R-MULTI-VIOLATION: either refusal passes").toEqual([]);
    return witness;
  },
  Q3: () => {
    const budget = own(R_OVER_BUDGET, "runtime_budget");
    const witness = {
      maxCandidates: Number(own(budget, "max_candidates")),
      candidates: SUPPORT.length,
      honest: outcomeOf(drive(HONEST, F_OVER_BUDGET)),
      violations: violations(F_OVER_BUDGET, drive(HONEST, F_OVER_BUDGET)),
    };
    expect(witness.maxCandidates, "the reply's own budget is below its candidate count").toBeLessThan(witness.candidates);
    expect(witness.violations, "R-RESOURCE: no check reads the reply's runtime budget").toEqual([]);
    return witness;
  },
  Q4: () => {
    const leaked: unknown[] = [];
    const found = violationsOf(hostOf({ side: proposal => leaked.push(proposal) }));
    expect(Object.values(found).flat(), "R-SIDE-PATH: the armed check reads the journal only").toEqual([]);
    expect(leaked.length, "the side path was taken").toBeGreaterThan(0);
    return { violations: found, leaked: leaked.length };
  },
};

interface Roster {
  readonly bead: string;
  readonly statement: string;
  readonly rows: readonly Row[];
  readonly quotes: Readonly<Record<string, string>>;
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly witnesses: Readonly<Record<string, Json>>;
  readonly tests: readonly string[];
  readonly producer: {
    readonly repo: string;
    readonly sha: string;
    readonly path: string;
    readonly blob: string;
    readonly lines: Readonly<Record<string, string>>;
  };
}
const ROSTER = JSON.parse(textOf(ROSTER_PATH)) as Roster;
const REACHED: { readonly pin: string; readonly same: boolean }[] = [];

/** The tracker export's row for a bead. */
function beadRow(bead: string): { readonly title: string; readonly notes: string } | undefined {
  for (const line of textOf(EXPORT).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (own(row, "id") !== bead) continue;
    const title = own(row, "title");
    const notes = own(row, "notes");
    if (typeof title === "string") return { title, notes: typeof notes === "string" ? notes : "" };
  }
  return undefined;
}
/** The owner filing's citation paragraph opens with this; the tracker appends every later note on a line of its own. */
const CITATION_LEAD = "Citation: ";
const ACCEPTANCE_LEAD = "Acceptance: ";
const ACCEPTANCE_END = ". Consolidation candidate with R1/R9.";
interface Cite {
  readonly line: number;
  readonly sha?: string;
  readonly quote: string;
}
/** What the anchors read from the notes: the filing's citation line only, so a note appended later binds nothing. */
function filingReading(notes: string): { readonly clauses: readonly string[]; readonly cites: readonly Cite[] } {
  const line = notes.split("\n").find(entry => entry.startsWith(CITATION_LEAD)) ?? "";
  const start = line.indexOf(ACCEPTANCE_LEAD);
  const end = line.indexOf(ACCEPTANCE_END);
  const acceptance = start >= 0 && end > start ? line.slice(start + ACCEPTANCE_LEAD.length, end) : "";
  const cites = [...line.matchAll(/README\.md:(\d+)(?:@([0-9a-f]{7,40}))? \('([^']+)'\)/g)].map(match =>
    match[2] === undefined ? { line: Number(match[1]), quote: match[3] ?? "" } : { line: Number(match[1]), sha: match[2], quote: match[3] ?? "" },
  );
  return { clauses: acceptance === "" ? [] : acceptance.split("; "), cites };
}
/** A clause without a trailing carry note ("(carries ...)"). */
function labelOf(clause: string): { readonly label: string; readonly carry?: string } {
  const carried = /^(.*) \((carries [^()]+)\)$/.exec(clause);
  return carried === null ? { label: clause } : { label: carried[1] ?? "", carry: carried[2] ?? "" };
}
/** The title's requirement tag and its trigger (the text before ", the host shall"). */
function titleReading(title: string): { readonly tag?: string; readonly trigger?: string } {
  const match = /^\[([A-Z0-9-]+)\] (.+?), the host shall /.exec(title);
  return match === null ? {} : { tag: match[1], trigger: match[2] };
}
/** The quotes tile the label in order, with nothing but separators (whitespace, comma, semicolon, colon, parentheses, plus) between. */
function tiles(label: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = label.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:()+]*$/.test(label.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:()+]*$/.test(label.slice(at));
}

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

  it("rule 16: the rows, the residual families, the fields, the causes, the checks, the mutants, the fixtures, the field tokens and the admitters are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:3", "A:5", "B:3", "C:2", "Q:4"]);
    expect(Object.entries(RESIDUALS).map(([id, members]) => `${id}:${members.length}`)).toEqual(["Q1:3", "Q2:1", "Q3:1", "Q4:1"]);
    expect(Object.keys(QUOTES), "one quote per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.keys(IMPL), "one case per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(FIELDS).toEqual(["schema", "checkpoint", "snapshotDigest", "actor", "support"]);
    expect(Object.entries(FIELD_PINS).map(([field, pin]) => `${field}:${pin}`)).toEqual(["schema:A2", "checkpoint:A2", "snapshotDigest:A3", "actor:A4", "support:A5"]);
    expect(CAUSES).toEqual(["timeout", "exit", "malformed"]);
    expect(CHECKS).toEqual([
      "admitted-schema",
      "admitted-checkpoint",
      "admitted-snapshotDigest",
      "admitted-actor",
      "admitted-support",
      "refusal-count",
      "refusal-field",
      "refusal-decision",
      "unavailable",
      "success-row",
      "decision-kept",
    ]);
    expect(Object.keys(MUTANTS)).toEqual([
      "M-NO-SCHEMA",
      "M-SCHEMA-FAMILY",
      "M-NO-CHECKPOINT",
      "M-CHECKPOINT-PREFIX",
      "M-NO-DIGEST",
      "M-DIGEST-RESERIALIZED",
      "M-NO-ACTOR",
      "M-NO-SUPPORT",
      "M-SUPPORT-FROM-REPLY",
      "M-REFUSAL-TWICE",
      "M-REFUSAL-NONE",
      "M-REFUSAL-ECHO",
      "M-REFUSAL-FIRST-FIELD",
      "M-REFUSAL-DECISION",
      "M-TIMEOUT-READ",
      "M-EXIT-IGNORED",
      "M-CAUSE-COLLAPSED",
      "M-MALFORMED-REFUSED",
      "M-SALVAGED",
      "M-SUCCESS-ROW",
      "M-ADMITTED-ROW",
      "M-ALWAYS-REFUSE",
      "M-PROPOSAL-RESAMPLED",
    ]);
    expect(FIXTURES.map(entry => `${entry.id}:${entry.expected.kind === "refuse" ? entry.expected.fields.join("+") : entry.expected.kind === "unavailable" ? entry.expected.cause : "admit"}`)).toEqual([
      "F-ADMIT:admit",
      "F-SCHEMA:schema",
      "F-CHECKPOINT:checkpoint",
      "F-DIGEST-COMPACT:snapshotDigest",
      "F-DIGEST-NEWLINE:snapshotDigest",
      "F-DIGEST-CRLF:snapshotDigest",
      "F-DIGEST-MOVED:snapshotDigest",
      "F-ACTOR:actor",
      "F-SUPPORT:support",
      "F-TIMEOUT:timeout",
      "F-EXIT-ERROR:exit",
      "F-EXIT-CRASH:exit",
      "F-MALFORMED-TRUNCATED:malformed",
      "F-MALFORMED-EMPTY:malformed",
      "F-MALFORMED-NO-DECISION:malformed",
    ]);
    expect(FIELD_TOKENS).toEqual(["graph_digest", "checkpoint_digest", "chosen_id", "graphDigest", "checkpointDigest", "chosenId"]);
    expect(GP_PROVIDERS).toEqual(["gp", "graphpolicy", "graph-policy-cli"]);
    expect(GP_REPLY_ADMITTERS).toEqual([]);
    expect(SRC_FLOOR).toBe(100);
  });

  it("the outside anchors: the bead's own row binds the trigger, the clauses, the pin quotes, the fields, the causes and the producer lines; the vendored receipt, the measured runs, Pi's own source and the wb-gxd7.3 census bind the rest", { timeout: LIVE_BUDGET_MS }, () => {
    const row = beadRow(BEAD);
    expect(row, `${BEAD}'s row was read from the tracker export`).toBeDefined();
    const title = row?.title ?? "";
    const notes = row?.notes ?? "";
    expect(ROSTER.statement, "the roster's statement is the bead's title").toBe(title);
    const heading = titleReading(title);
    expect(heading.tag, "the title opens with the requirement id").toBe(REQUIREMENT);
    expect(heading.trigger, "row T's label is the title's trigger").toBe(ROWS.find(entry => entry.id === "T")?.label);
    const filing = filingReading(notes);
    const clauses = filing.clauses.map(labelOf);
    expect(
      clauses.map(clause => clause.label),
      "the acceptance holds three clauses, each exactly one row's label",
    ).toEqual(["A", "B", "C"].map(id => ROWS.find(entry => entry.id === id)?.label));
    expect(
      clauses.map(clause => clause.carry ?? null),
      "clause (c) alone carries a note",
    ).toEqual([null, null, "carries O11's GP case"]);
    for (const entry of ROWS.filter(candidate => candidate.id !== "Q")) {
      expect(
        tiles(
          entry.label,
          entry.pins.map(pin => QUOTES[pin] ?? ""),
        ),
        `row ${entry.id}'s pin quotes tile its label`,
      ).toBe(true);
    }
    const requirements = (clauses[0]?.label.split("asserts admission requires ")[1] ?? "").split(/, | and /);
    expect(requirements.length, "clause (a) requires one check per field").toBe(FIELDS.length);
    for (const [index, field] of FIELDS.entries()) {
      expect(requirements[index], `clause (a)'s requirement ${index + 1} names ${field}`).toContain(field);
      expect(QUOTES[FIELD_PINS[field]], `${field}'s pin quotes it`).toContain(field);
    }
    const causes = (clauses[2]?.label.split(" yields typed unavailable")[0] ?? "").split(/, | or /);
    expect(causes.length, "clause (c) names one cause per worker failure").toBe(CAUSES.length);
    for (const [index, cause] of CAUSES.entries()) expect(causes[index], `clause (c)'s cause ${index + 1} names ${cause}`).toContain(cause);
    expect(clauses[2]?.label, "clause (c)'s outcome word").toContain(`typed ${UNAVAILABLE}`);
    expect(
      filing.cites.map(cite => cite.line),
      "the filing quotes README.md lines 13 and 25",
    ).toEqual([13, 25]);
    for (const cite of filing.cites) {
      expect(ROSTER.producer.lines[String(cite.line)] ?? "", `the producer's line ${cite.line} carries the filing's quote`).toContain(cite.quote);
      if (cite.sha !== undefined) expect(ROSTER.producer.sha.startsWith(cite.sha), "the producer sha is the filing's pin").toBe(true);
    }
    expect(ROSTER.producer.repo, "the producer is Furnace").toBe("Furnace");
    expect(ROSTER.producer.path.endsWith("/README.md"), "the producer path is the filing's README").toBe(true);
    const appended = `${notes}\n\nCitation: README.md:99@0123456789ab ('appended'). Acceptance: x; y; z. Consolidation candidate with R1/R9.\n`;
    expect(filingReading(appended), "a note appended after the filing changes no reading").toEqual(filing);
    expect(PINNED_SCHEMA, "the pinned schema is the vendored receipt's").toBe(own(RECEIPT, "schema"));
    expect(PINNED_CHECKPOINT, "the pinned checkpoint is the vendored receipt's").toBe(own(RECEIPT, "checkpoint_digest"));
    const runs = listOf(own(own(JSON.parse(textOf(RUNS)), "producer"), "runs"));
    const frames = runs
      .filter(run => own(run, "rc") === 0)
      .map(run => {
        try {
          return JSON.parse(String(own(run, "stdout"))) as unknown;
        } catch {
          return undefined;
        }
      });
    expect(
      frames.some(frame => own(frame, "schema") === ENVELOPE_SCHEMA && own(frame, "ok") === true && record(own(frame, "result"))),
      "a measured exit-0 gp run writes the frame the fixtures use",
    ).toBe(true);
    expect(own(JSON.parse(MEASURED_ERROR.stdout), "schema"), "the measured error envelope is the same frame").toBe(ENVELOPE_SCHEMA);
    expect(/export type CapabilityErrorCategory = ([^;]+);/.exec(textOf(REGISTRY))?.[1] ?? "", "the registry's categories name unavailable").toContain(`"${UNAVAILABLE}"`);
    expect(/statusTone: ([^;]+);/.exec(textOf(OBSERVATION))?.[1] ?? "", "Pi's statusTone names success").toContain(`"${SUCCESS}"`);
    expect(textOf(JOIN_CENSUS), "wb-gxd7.3's clause (c) names row A3's check").toContain(`wb-0lf.3's '${QUOTES.A3}' check is pinned to this byte-exact form`);
  });

  it("roster: the judged rows, the quotes, the residual members and the registered tests equal test/fixtures/gp-reply-admission-roster.json, in order and both ways; every pin reached its witness compare", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(ROSTER.bead, "the roster is this bead's").toBe(BEAD);
    expect(ROWS, "the judged rows equal the roster rows exactly and in order").toEqual(ROSTER.rows);
    expect(QUOTES, "the pin quotes equal the roster's").toEqual(ROSTER.quotes);
    expect(RESIDUALS, "the residual members equal the roster's").toEqual(ROSTER.residuals);
    expect(Object.keys(ROSTER.witnesses), "one roster witness per pin, in row order").toEqual(ROWS.flatMap(row => row.pins));
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
