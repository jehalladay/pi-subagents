/**
 * wb-4nut.9 (TSX-HARNESS2-REACTIVE-EVOLUTION-R9, program-triage-2026-10-22), the H2 identity-and-reuse census: a gating guard with
 * an until-then leg. Statement (the bead's full statement, its note, verbatim): "If Pi ever caches, de-dupes or imports H2 records
 * (gated RL/FO/RC/RI adapters, unshipped; 'public port' undefined until TSX-FED-01), Pi shall never key identity/reuse below the
 * producer's identity fields: a matching sequence counter across owner epochs never authorizes reuse; changed status/witness
 * invalidates equal bytes; equal text or prompts from another source share no cache receipt or inference demand; a local alias
 * never supersedes owner identity" (ReactiveLensesSDK docs/programs/harness2-reactive-evolution-2026-10-20/README.md:45@
 * bfe1f4ac7fa0, merged with RL :24, FiberOpticsSDK :45,:46,:25@e803f66c5fb9, ReactiveComponentsSDK :48@640a3b579a95,
 * ReactiveInferenceSDK :44@485f3615db1e and the ReactiveFiberCLI harness2-federated-peer README :43@978f6515c302). Acceptance (the
 * owner filing, verbatim; the labels of rows B to E quote it): "(a) same sequence + new owner epoch reads RESYNC_REQUIRED/refused,
 * never a cache hit; cache keys include owner instance + epoch + revision; (b) identical bytes with different status/provenance stay
 * distinct and invalidating (no payload-digest key); (c) same output.text, different bundle_revision_id = distinct cohorts
 * (wb-973.8), no receipt by text hash; equal prompts, different source digests = two request identities; (d) equal local alias,
 * different owner identity never merges; owner id shown verbatim." Row A's label carries the filing's trigger and its own reading
 * ("Not P0: Pi caches no H2 records today; gating guard.").
 *
 * So the trigger has not fired: Pi caches, de-dupes and imports no H2 record. What Pi does reuse today is measured here at each
 * site, because an H2 reader would land on one of them: the native observation cache (src/workbench/observation.ts, keyed by the
 * full native reference; events de-duplicated by their stated event id and ordered by their stated sequence), the evidence store
 * (src/workbench/evidence-loader.ts, a bounded LRU keyed by the scope, the full native reference and the evidence reference), the rf
 * reader (src/workbench/reactivefiber-observer.ts, which names a render by rf's operation id and keys its version cohort on the
 * stated bundle_revision_id, referencing the output text only by its sha256 digest) and the workflow journal (src/workflow/journal.ts
 * and runtime.ts, Pi's one prompt-keyed reuse: an agent call replays only at its own position, under its own payload hash and the
 * host's replay basis). The rows:
 *  A, the trigger, absent today. A1 Pi declares, installs and loads no H2 producer package (H2_PACKAGE, the program's four Python
 *    SDKs and the TSX SDK in any spelling), and no src literal names one; A2 a lexical scan of every src module (identifiers and
 *    private names, every string or template part, every static name chain - a property access, an element access by a literal
 *    key or a qualified name, read from its first named link - every nested key path of object keys, type members and binding
 *    patterns, and every regex literal's pattern with its escapes and syntax read as separators; camelCase split, separators
 *    folded; comments are no reader) finds no gating work package (WORK_PACKAGE_TERMS) and no H2 identity-record word
 *    (IDENTITY_TERMS) beyond its one measured known spelling (KNOWN_SPELLINGS), with floors, the six judged sites as anchors, the
 *    four derived caches scanned quiet and the detector's controls, one per term and one per reading (the chain, key-path and
 *    regex readings and the reading controls: wb-flt6, the landing-316 gate's F3); A3 the gating artifacts are measured
 *    unshipped: the bead row's gating sentence names RL-H2-01/02, FO-H2-01/02, RC-H2-02, RI-H2-02 and TSX-FED-01 and ends
 *    "Shipped: no.", and the roster's producer facts (read-only at the cited shas) hold each cited line verbatim and find no gating
 *    artifact name in producer src.
 *  B, acceptance (a). B1 at one native reference, a restarted owner's re-count (equal and lower sequences under fresh event ids)
 *    reads out-of-order and changes nothing, as do a sequence-less and a lower-sequence snapshot; a sequence-keyed cache fails the
 *    judge Pi's reading meets. B2 the observation cache's node key and event de-duplication and the evidence store's entry key
 *    separate every identity part (workspace, principal, provider, type, the native scope that carries owner instance and epoch,
 *    the id that carries the revision, and the evidence reference): each variant holds its own node or entry, and the store refuses
 *    an unbound scope before any cached entry; a key that drops the native scope fails the judge.
 *  C, acceptance (b). C1 the observation cache: one payload digest at two owners stays two nodes with their own status and
 *    provenance, a changed status at one owner replaces the old one although the payload digest is unchanged, no query key and no
 *    workflow_observe reply carries the payload digest (ObservationQuery's members, read by the TypeScript compiler); a payload-keyed
 *    cache fails the judge. C2 the evidence store: byte-identical previews under two evidence references (and at a second owner) stay
 *    distinct entries with their own freshness, basis and receipt, each loaded once; a content-keyed cache fails the judge. C3 the rf
 *    reader: identical result.output.text with a different status (a flagged render) and provenance (another graph digest) reads one
 *    payload digest and two statuses, two nodes in the cache, and a later render of one operation replaces its status.
 *  D, acceptance (c). D1 the rf reader: identical output text and graph digest at two bundles read two sourceVersion cohorts (the
 *    version query separates them), two rf-bundle references and one payload digest, which is never an evidence reference, a query
 *    key or a loader's reference kind (EVIDENCE_LOADER_ROWS has no rf row): no receipt by text hash; a cohort keyed on the text hash
 *    fails the judge. D2 the workflow journal: an equal prompt journaled under one replay basis runs live under another and replays
 *    under its own (the payload key is equal; the basis separates them), and Claude workflow hosts whose configuration differs in
 *    the workspace, the principal or the grants state distinct bases; a prompt-keyed replay fails the judge.
 *  E, acceptance (d). E1 three snapshots with one local alias (title, type and status) at three owner identities stay three nodes,
 *    a grouping edge between two keeps both ends, and the rf reader refuses an operation reference that aliases its own preview; an
 *    alias-keyed index fails the judge. E2 owner identity shown verbatim: the workflow_observe reply carries each admitted native
 *    reference field for field (mixed case and punctuation byte-identical), the rf preview's id and title carry rf's operation id
 *    verbatim through the cache and the reply, and an unsafe identity is refused as a typed row, never rewritten.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness, the scan constants, the residual families and their quiet rows, every registered test title and
 * the record below - is held to the out-of-file roster (test/fixtures/h2-identity-reuse-roster.json). OUTSIDE ANCHOR: the owner
 * filing's row in the tracked bead export (.beads/issues.jsonl, row wb-4nut.9): each acceptance clause sits verbatim in exactly one
 * row label and the trigger in row A's, its quote and citation equal the roster's, its gating sentence lists the work packages A3
 * reads, and its quote, authority quotes and merged citations are the roster's measured producer lines. Each pin's case is refused
 * if its source reads the roster's witnesses (rosterWitness or ROSTER.rows), so a case echoing the witness it is held to reds.
 * THE RECORD (wb-flt6, the landing-316 gate's F1 and F4: a deleted witness comparison, a deleted outside-anchor block or a deleted
 * records case left the file green): every case records its own end in REACHED as `${id}:${count}`, after its last assertion - the
 * judged set at its end, each pin right after its witness comparison, the records case at its end - where count is vitest's own
 * tally of the case's assertions (expect.getState().assertionCalls), so an early return, a dropped assertion or a deleted
 * comparison leaves its entry absent or its count short; each pin also keeps its witness in MEASURED. The judged set, which runs
 * first, holds the collected task tree to the roster's tests (every title once, in roster order, set to run and not inverted), so a
 * records case deleted, renamed, skipped or inverted reds there. The records case walks the task tree again (each roster title
 * once, in order, in run mode, not inverted, ran before it), holds REACHED to the roster's reached list and MEASURED to the
 * roster's witnesses a second time, then records its own end, and the file-end judge (afterAll) holds that end, so a records case
 * that returns early or skips itself at run time reds after it has run. The judge reads which cases were selected to run from the
 * collected tree before the first case runs (beforeEach, once): under a test-name filter that deselects the records case it holds
 * nothing.
 * Not claimed: a pin removed from ROWS, the literal, IMPL and the roster together (the filing anchors rows and clauses, not pins); a
 * term removed from IDENTITY_TERMS or WORK_PACKAGE_TERMS together with its controls, the roster's scan and A2's witness (the
 * filing anchors rows and clauses, not words, and no source outside this cut lists the vocabulary); an assertion removed from this
 * file together with its pinned count in the roster's record; a case that keeps its own assertions but returns its witness as a
 * literal, or reads the roster through an alias; the file-end judge or the selection it reads removed (no claim rides them alone:
 * the records case still holds the record); every case of the file skipped at once (no case runs to read the tree, and vitest runs
 * no hook for a file with nothing to run).
 * THE GATE-OPENING SIGNAL: A1 reds when an H2 producer package is declared, installed, loaded or named, and A2 when a src module
 * names a gating work package or an identity-record word: the H2 reader RL-H2-01/02, FO-H2-01/02, RC-H2-02 or RI-H2-02 calls for
 * reds this census first, and its cut re-pins (a) to (d) at that reader's own keys (B to E already pin the sites it would use).
 * RESIDUALS (named families, each with a pinned quiet row in RESIDUAL_ROWS' pin): R-EVENT-ID the cache de-duplicates on the event
 *   id an adapter states, so an id restated across a restart reads duplicate (B1); R-SNAPSHOT-RESYNC a read-current snapshot at an
 *   equal sequence is Pi's resync: applied in full, the node carrying only the snapshot's own fields (B1); R-ADAPTER-REF the keys
 *   hold whatever native reference an adapter states, so an epoch carried only in sourceVersion refreshes one node in place (B2);
 *   R-SAME-BASIS under one journal and one replay basis an equal prompt at an equal position after an intact prefix replays, which
 *   is Pi's own demand rule, not an inference demand (D2); R-COMPOSED a term assembled at runtime is invisible to A2 (its control
 *   reads 0); R-UNJUDGED-SITES the derived caches (the graph view's build cache, the inspector's relation cache, the workflow-name
 *   cache and the schedule store) are keyed by Pi's own keys or texts and are scanned by A2, quiet (A2); R-OWN-FIELD the chain
 *   reading reads Pi's own detached-host snapshot field (src/workbench/detached-observer.ts snapshot.observation, the local detached
 *   contract's observed state: unknown, observed-started or observed-terminal) as the words "snapshot observation": it is no H2
 *   record, so A2 holds it as its one known spelling, read (A2); R-SPLIT-NAMES a term split across two names that form no chain and
 *   no key path - a key and the value it holds, a name and its type, a key and a call's argument, a declaration and its member - is
 *   two names read one at a time, quiet (A2).
 * SCOPE: "Pi" is src/, the product modules; qa/ and test/ carry no Pi surface. Producer facts are measured at the cited shas
 * (read-only git rev-parse/show/grep on the local checkouts, no fetch; the checkouts' HEADs predate the pins): Pi vendors none of
 * them, so a producer ship is seen only when a cut re-measures the roster.
 *
 * Display paths added: none. Test-only: no scratch is allocated, no process is spawned (the workflow runs in the runtime's own
 * worker), and src, package.json, node_modules' directory names and the tracker export are only read.
 */
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, beforeEach, describe, expect, it, type RunnerTask } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { type EvidenceContent, type EvidenceLoader, EvidenceStore } from "../src/workbench/evidence-loader.js";
import { EVIDENCE_LOADER_ROWS } from "../src/workbench/evidence-producers.js";
import { type NativeRef, type NativeSnapshot, type ObservationEvent, ObservationProjection, type ObservationScope, type ObservedNode, type Presentation } from "../src/workbench/observation.js";
import { observeInvocation } from "../src/workbench/observe-query.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { journalKey, type WorkflowJournalEntry } from "../src/workflow/journal.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";

type JsonObject = { [key: string]: JsonValue };

const BEAD = "wb-4nut.9";
const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER_FILE = "test/fixtures/h2-identity-reuse-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
/** An H2 producer package name, as npm, an import specifier or a module argument spells it (the wb-4nut.7 spelling). */
const H2_PACKAGE = /reactive[-_./]?(?:components|inference|lenses)|fiber[-_./]?optics|reactive[-_./]?fiber[-_./]?tsx/i;
/** The gating work packages and the program, as word patterns over normalized text (a space is any folded separator run). */
const WORK_PACKAGE_TERMS: readonly string[] = ["(?:rl|fo|rc|ri|tsx) ?h2 ?0[0-9]", "tsx ?fed ?0[0-9]", "harness ?2"];
/** The H2 identity-record vocabulary of the cited contracts (RL L24, L34-35; FO L24, L34-35; RC L36, L48; RI L32, L44). */
const IDENTITY_TERMS: readonly string[] = [
  "owner epochs?", "source epochs?", "instance epochs?", "owner instances?", "owner identit(?:y|ies)", "snapshot observations?",
  "import bindings?", "public ports?", "cache receipts?", "resync required", "request identit(?:y|ies)", "inference demands?",
  "local alias(?:es)?",
];
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** Below the count measured at base 282caa0 (115 src files, every one a .ts module). */
const FLOORS = { srcFiles: 100, srcModules: 100 };
/** The judged sites: each must be scanned, and each must yield its named identifier (or literal) to the scan. */
const ANCHORS: Readonly<Record<string, string>> = {
  "src/workbench/observation.ts": "projectionEventId",
  "src/workbench/evidence-loader.ts": "cacheKey",
  "src/workbench/reactivefiber-observer.ts": "bundleRevision",
  "src/workbench/observe-query.ts": "observeInvocation",
  "src/workflow/journal.ts": "journalKey",
  "src/workbench/claude-host.ts": "replayBasis",
};
const LITERAL_ANCHORS: Readonly<Record<string, string>> = { "src/workbench/observation.ts": "out-of-order", "src/workbench/reactivefiber-observer.ts": "rf-bundle:" };
/** R-UNJUDGED-SITES: the derived caches, each scanned (its identifier read) and quiet. */
const QUIET_SITES: Readonly<Record<string, string>> = {
  "src/workbench/graph-view.ts": "cached",
  "src/ui/workflow-inspector.ts": "relationCache",
  "src/workflow/meta.ts": "workflowNames",
  "src/schedule-store.ts": "ScheduleStore",
};
/** The detector's controls: each flagged source reads its own term, each quiet one reads none. */
const FLAGGED_CONTROLS: readonly (readonly [string, string])[] = [
  ["const ownerEpoch = 1;", "owner epochs?"],
  ['const x = "source_epoch";', "source epochs?"],
  ["const instanceEpoch = 2;", "instance epochs?"],
  ['const ownerInstance = "a";', "owner instances?"],
  ['const ownerIdentity = "a";', "owner identit(?:y|ies)"],
  ["type SnapshotObservation = { id: string };", "snapshot observations?"],
  ["const importBinding = 1;", "import bindings?"],
  ['const publicPort = "p";', "public ports?"],
  ['const r = "cache-receipt";', "cache receipts?"],
  ['const s = "RESYNC_REQUIRED";', "resync required"],
  ["const requestIdentity = 1;", "request identit(?:y|ies)"],
  ["const inferenceDemand = 0;", "inference demands?"],
  ['const localAlias = "x";', "local alias(?:es)?"],
  ['const p = "RL-H2-01";', "(?:rl|fo|rc|ri|tsx) ?h2 ?0[0-9]"],
  ["const q = `TSX-FED-01`;", "tsx ?fed ?0[0-9]"],
  ['const h = "harness2";', "harness ?2"],
];
const QUIET_CONTROLS: readonly string[] = [
  'const epoch = 1; const owner = "a"; const alias = "b"; const sequence = 3; const resync = true; const port = 8080;',
  "// owner epoch, RESYNC_REQUIRED and RL-H2-01 in a comment are no reader\nconst value = 1;",
  'const cacheKey = "k"; const projectionEventId = "e"; const replayBasis = "b";',
  "const name = record.owner.name; const path = { owner: { name: 1 } }; const pattern = /owner[._]name/;",
];
/** R-COMPOSED's quiet row: a term assembled at runtime. */
const COMPOSED_CONTROL = 'const word = ["owner", "epoch"].join(" ");';
/** One control per reading of the scan (wb-flt6, the 316 gate's F3: G08 dropped the private-name reading and the file stayed green):
 * [label, the reading that must spell READING_TERM, the source], each source spelled by that reading alone, so a reading dropped
 * from scanModule reds its control. */
const READING_CONTROLS: readonly (readonly [string, string, string])[] = [
  ["identifier", "identifier", "let ownerEpoch = 0;"],
  ["private name", "identifier", "class Holder { #ownerEpoch = 0; }"],
  ["string", "literal", 'const s = "owner epoch";'],
  ["template part", "literal", `const t = \`\${a} owner epoch \${b}\`;`],
  ["property access", "chain", "const e = record.owner.epoch;"],
  ["computed root", "chain", "const e = load().owner.epoch;"],
  ["element access", "chain", 'const e = record["owner"]?.["epoch"];'],
  ["qualified name", "chain", "type E = Owner.Epoch;"],
  ["object keys", "key path", "const o = { owner: { epoch: 1 } };"],
  ["type members", "key path", "type T = { owner: { epoch: number } };"],
  ["binding pattern", "key path", "const { owner: { epoch } } = record;"],
  ["regex literal", "regex", "const r = /owner.epoch/;"],
  ["regex escape", "regex", "const r = /owner\\.epoch/;"],
  ["regex class", "regex", "const r = /owner[._-]epoch/i;"],
];
const READING_TERM = "owner epochs?";
/** R-OWN-FIELD: the one spelling A2 reads in src and holds as known (`${path} ${reading} ${value}`): the local detached contract's
 * snapshot field, read through the chain reading. */
const KNOWN_SPELLINGS: readonly string[] = ["src/workbench/detached-observer.ts chain snapshot.observation"];
/** R-SPLIT-NAMES' quiet row: a term split across two names that form no chain and no key path. */
const SPLIT_CONTROLS: readonly string[] = [
  "const o = { owner: epoch };", "function f(owner: Epoch) {}", "const o = { owner: wrap({ epoch: 1 }) };", "interface Owner { epoch: number }",
];
/** The H2 package spellings the pattern must read, and Pi's own rf provider module it must not. */
const PACKAGE_CONTROLS: readonly string[] = ["reactive-components", "reactive_inference", "@reactive/inference", "fiber-optics", "fiber_optics", "reactive-lenses", "reactive_lenses", "@reactive-fiber/tsx"];
const OWN_RF_SPECIFIER = "./providers/reactivefiber.js";
/** The SDK packages Pi does bundle: the specifier reader must find each, so an empty H2 list is not a blind reader. */
const OWN_SDKS: readonly string[] = ["@anthropic-ai/claude-agent-sdk", "@furnace/sdk", "@forge/sdk"];
const RESIDUAL_FAMILIES: readonly string[] = [
  "R-EVENT-ID", "R-SNAPSHOT-RESYNC", "R-ADAPTER-REF", "R-SAME-BASIS", "R-COMPOSED", "R-UNJUDGED-SITES", "R-OWN-FIELD", "R-SPLIT-NAMES",
];
/** The pin whose witness carries each residual's pinned quiet row (witness.quiet[family]). */
const RESIDUAL_ROWS: Readonly<Record<string, string>> = {
  "R-EVENT-ID": "B1", "R-SNAPSHOT-RESYNC": "B1", "R-ADAPTER-REF": "B2", "R-SAME-BASIS": "D2", "R-COMPOSED": "A2", "R-UNJUDGED-SITES": "A2",
  "R-OWN-FIELD": "A2", "R-SPLIT-NAMES": "A2",
};
const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster, the collected cases and the bead row agree";
const RECORDS_TITLE =
  "records: every case of this file is registered once, in roster order, in run mode, ran before this one and reached its end with its pinned assertion count";
/** The record's ids for the two cases that are not pins. */
const JUDGED_ID = "judged";
const RECORDS_ID = "records";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(trigger, absent today) If Pi ever caches, de-dupes or imports H2 records: Pi declares, installs, loads and names no H2 producer package, no src module names a gating work package or the H2 identity-record vocabulary, and the gating artifacts are measured unshipped at the cited shas",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label:
      "(a) same sequence + new owner epoch reads RESYNC_REQUIRED/refused, never a cache hit; cache keys include owner instance + epoch + revision: Pi's native observation cache refuses a restarted owner's re-count, and its keys and the evidence store's separate every identity part a native reference or an evidence reference states",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(b) identical bytes with different status/provenance stay distinct and invalidating (no payload-digest key): measured at the native observation cache, the evidence store and the rf reader, each against a judge a payload- or content-keyed cache fails",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label:
      "(c) same output.text, different bundle_revision_id = distinct cohorts (wb-973.8), no receipt by text hash; equal prompts, different source digests = two request identities: measured at the rf reader and the observation cache, and at the workflow journal, Pi's one prompt-keyed reuse",
    pins: ["D1", "D2"],
  },
  {
    id: "E",
    label:
      "(d) equal local alias, different owner identity never merges; owner id shown verbatim: measured at the native observation cache, the rf reader and the workflow_observe reply, against a judge an alias-keyed index fails",
    pins: ["E1", "E2"],
  },
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
interface ProducerLine {
  readonly line: number;
  readonly text: string;
}
interface ProducerSource {
  readonly label: string;
  readonly repo: string;
  readonly sha: string;
  readonly file: string;
  readonly blob: string;
  readonly lines: readonly ProducerLine[];
  readonly gating: readonly string[];
  readonly srcProbe?: { readonly pattern: string; readonly filesAtPin: readonly string[] };
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly scan: JsonObject;
  readonly producer: readonly ProducerSource[];
  readonly residuals: readonly string[];
  readonly residualRows: JsonObject;
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  /** The ends every case before the records case records, in run order (`${id}:${count}`). */
  readonly reached: readonly string[];
  /** The records case's own end, held by the file-end judge. */
  readonly recordsEnd: string;
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function producerOf(value: unknown, index: number): ProducerSource {
  const at = `producer[${index}]`;
  if (!isObject(value) || !Array.isArray(value.lines)) throw new Error(`roster ${at} needs lines`);
  const lines = value.lines.map((entry: unknown, line: number): ProducerLine => {
    if (!isObject(entry) || typeof entry.line !== "number" || typeof entry.text !== "string") throw new Error(`roster ${at}.lines[${line}] needs a line and a text`);
    return { line: entry.line, text: entry.text };
  });
  const probe = value.srcProbe;
  return {
    label: text(value.label, `${at}.label`), repo: text(value.repo, `${at}.repo`), sha: text(value.sha, `${at}.sha`), file: text(value.file, `${at}.file`),
    blob: text(value.blob, `${at}.blob`), lines, gating: strings(value.gating, `${at}.gating`),
    ...(isObject(probe) ? { srcProbe: { pattern: text(probe.pattern, `${at}.srcProbe.pattern`), filesAtPin: strings(probe.filesAtPin, `${at}.srcProbe.filesAtPin`) } } : {}),
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.producer) || !isObject(raw.scan) || !isObject(raw.residualRows)) {
    throw new Error("roster needs rows, producer, scan and residualRows");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    scan: json(raw.scan) as JsonObject,
    producer: raw.producer.map(producerOf),
    residuals: strings(raw.residuals, "residuals"),
    residualRows: json(raw.residualRows) as JsonObject,
    rows,
    tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"),
    recordsEnd: text(raw.recordsEnd, "recordsEnd"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function producerSource(label: string): ProducerSource {
  const found = ROSTER.producer.find(entry => entry.label === label);
  if (found === undefined) throw new Error(`the roster holds no producer source ${label}`);
  return found;
}
function producerLine(label: string, line: number): string {
  const found = producerSource(label).lines.find(entry => entry.line === line);
  if (found === undefined) throw new Error(`the roster holds no ${label} line ${line}`);
  return found.text;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The owner filing's row in the tracked bead export, found by id on a line that parses. */
function readBeadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
}
/** One line of the filing's notes, found by its opening words. */
function noteLine(notes: string, opening: string): string {
  const line = notes.split("\n").find(entry => entry.startsWith(opening));
  if (line === undefined) throw new Error(`${BEAD} notes carry no "${opening}" line`);
  return line;
}
/** The filing's acceptance clauses: its "Acceptance: " line, split before each "(x) ", the final period dropped. */
function acceptanceClauses(notes: string): string[] {
  return noteLine(notes, "Acceptance: ")
    .slice("Acceptance: ".length)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}
/** A producer line without its ordered-list marker. */
const unlisted = (line: string): string => line.replace(/^\d+\. /, "");

function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
/** Every regular file below src/, in name order, repository-relative; a symlink is recorded and never followed. */
function srcFiles(): { files: string[]; symlinks: string[] } {
  const files: string[] = [];
  const symlinks: string[] = [];
  const visit = (directory: string, relative: string): void => {
    const entries: Dirent[] = readdirSync(directory, { withFileTypes: true });
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = `${relative}/${entry.name}`;
      if (entry.isSymbolicLink()) symlinks.push(path);
      else if (entry.isDirectory()) visit(join(directory, entry.name), path);
      else if (entry.isFile()) files.push(path);
    }
  };
  visit(join(REPO, "src"), "src");
  return { files, symlinks };
}

/** Text as the vocabulary reads it: camelCase split, lower-cased, every run of space, underscore, hyphen, dot, colon or slash one space. */
function normalized(value: string): string {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase().replace(/[\s_\-.:/]+/g, " ");
}
const TERMS = [...IDENTITY_TERMS, ...WORK_PACKAGE_TERMS].map(term => ({ term, pattern: new RegExp(`(?<![a-z0-9])(?:${term})(?![a-z0-9])`) }));
const termsIn = (value: string): string[] => {
  const folded = normalized(value);
  return TERMS.filter(entry => entry.pattern.test(folded)).map(entry => entry.term);
};

function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}
/** One spelling of a vocabulary term: its module and line, the reading that read it, the term and the text it was read in. */
interface Hit {
  readonly path: string;
  readonly line: number;
  readonly reading: string;
  readonly term: string;
  readonly value: string;
}
const shownHit = (hit: Hit): string => `${hit.path}:${hit.line} ${hit.reading} ${hit.term}: ${hit.value}`;
/** A hit as KNOWN_SPELLINGS names it: its module, its reading and its text, never its line. */
const spellingOf = (hit: Hit): string => `${hit.path} ${hit.reading} ${hit.value}`;
interface ModuleScan {
  readonly identifiers: Set<string>;
  readonly literals: Set<string>;
  readonly specifiers: string[];
  readonly hits: Hit[];
  readonly packageLiterals: string[];
}
/** The literal text of a specifier-shaped argument, or undefined when it is computed. */
const literalOf = (node: ts.Node | undefined): string | undefined => (node !== undefined && ts.isStringLiteralLike(node) ? node.text : undefined);
/** One link of a static name chain: a property access, an element access by a literal key or a qualified name. */
function linkOf(node: ts.Node): { readonly inner: ts.Node; readonly name: string } | undefined {
  if (ts.isPropertyAccessExpression(node)) return { inner: node.expression, name: node.name.text };
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) return { inner: node.expression, name: node.argumentExpression.text };
  if (ts.isQualifiedName(node)) return { inner: node.left, name: node.right.text };
  return undefined;
}
/** A chain's static spelling, its links joined by dots, read from its first named link: a computed root (a call, an element access
 * by a computed key) is not part of it. */
function chainOf(node: ts.Node): string | undefined {
  const link = linkOf(node);
  if (link === undefined) {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) return node.text;
    return node.kind === ts.SyntaxKind.ThisKeyword ? "this" : undefined;
  }
  const inner = chainOf(link.inner);
  return inner === undefined ? link.name : `${inner}.${link.name}`;
}
/** A member that states a key: an object key, a class or type member, or an element of a binding pattern. */
type Keyed =
  | ts.PropertyAssignment
  | ts.ShorthandPropertyAssignment
  | ts.PropertySignature
  | ts.PropertyDeclaration
  | ts.MethodDeclaration
  | ts.MethodSignature
  | ts.GetAccessorDeclaration
  | ts.SetAccessorDeclaration
  | ts.BindingElement;
function isKeyed(node: ts.Node): node is Keyed {
  return ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node) || ts.isPropertySignature(node) || ts.isPropertyDeclaration(node) ||
    ts.isMethodDeclaration(node) || ts.isMethodSignature(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node) || ts.isBindingElement(node);
}
/** The key a member states when it is a name or a literal; a computed key states none. */
function keyOf(node: Keyed): string | undefined {
  const name = ts.isBindingElement(node) ? (node.propertyName ?? node.name) : node.name;
  return ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name) ? name.text : undefined;
}
/** Where a key path ends: a function, a call, a class, a block, a parameter, or a declaration that names a binding or a type. */
const pathEnds = (node: ts.Node): boolean =>
  ts.isSourceFile(node) || ts.isFunctionLike(node) || ts.isCallExpression(node) || ts.isNewExpression(node) || ts.isClassLike(node) || ts.isBlock(node) ||
  ts.isParameter(node) || ts.isVariableDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node);
/** A member's key path: the keys of the members it is nested in and its own, outermost first, up to where the path ends. */
function keyPathOf(node: Keyed): string[] {
  const keys: string[] = [];
  for (let at: ts.Node = node; at === node || !pathEnds(at); at = at.parent) {
    if (!isKeyed(at)) continue;
    const key = keyOf(at);
    if (key === undefined) break;
    keys.unshift(key);
  }
  return keys;
}
/** A regex literal as the vocabulary reads it: every letter escape (\s, \d) and every pattern-syntax character a separator, an
 * escaped character itself. */
const patternOf = (literal: string): string => literal.replace(/\\[a-zA-Z]/g, " ").replace(/\\(.)/g, "$1").replace(/[[\]()?*+|{}^$\\]/g, " ");
/** One module, parsed under its own script kind: its identifiers and private names, every string or template part, every static
 * name chain (read once, from its outermost link), every nested key path of two or more keys and every regex literal's pattern
 * (A2's terms; the literals are also A1's package literals), and its load specifiers - import, export, import-equals, import type,
 * dynamic import, require and import.meta.resolve (A1). Comments are never read: a comment is no reader. */
function scanModule(path: string, source: string): ModuleScan {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const identifiers = new Set<string>();
  const literals = new Set<string>();
  const specifiers: string[] = [];
  const hits: Hit[] = [];
  const packageLiterals: string[] = [];
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  const spelled = (node: ts.Node, reading: string, value: string, read: string = value): void => {
    for (const term of termsIn(read)) hits.push({ path, line: line(node), reading, term, value });
  };
  const load = (node: ts.Node | undefined): void => {
    const value = literalOf(node);
    if (value !== undefined) specifiers.push(value);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      identifiers.add(node.text);
      spelled(node, "identifier", node.text);
    } else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      literals.add(node.text);
      spelled(node, "literal", node.text);
      if (H2_PACKAGE.test(node.text)) packageLiterals.push(`${path}:${line(node)}: ${node.text}`);
    } else if (ts.isRegularExpressionLiteral(node)) {
      spelled(node, "regex", node.text, patternOf(node.text));
    }
    // A static name chain is read once, from its outermost link; a key path where it holds two or more keys.
    if (linkOf(node) !== undefined && linkOf(node.parent)?.inner !== node) {
      const chain = chainOf(node);
      if (chain !== undefined) spelled(node, "chain", chain);
    }
    if (isKeyed(node)) {
      const keys = keyPathOf(node);
      if (keys.length > 1) spelled(node, "key path", keys.join("."));
    }
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) load(node.moduleSpecifier);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) load(node.moduleReference.expression);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal);
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const dynamic = callee.kind === ts.SyntaxKind.ImportKeyword;
      const required = ts.isIdentifier(callee) && callee.text === "require";
      const resolved = ts.isPropertyAccessExpression(callee) && callee.name.text === "resolve" &&
        (ts.isMetaProperty(callee.expression) || (ts.isIdentifier(callee.expression) && callee.expression.text === "require"));
      if (dynamic || required || resolved) load(node.arguments[0]);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { identifiers, literals, specifiers, hits, packageLiterals };
}

/** The package names a package.json declares, across every dependency list. */
function declaredPackages(): { lists: JsonObject; names: string[] } {
  const manifest: unknown = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
  if (!isObject(manifest)) throw new Error("package.json must be an object");
  const lists: JsonObject = {};
  const names: string[] = [];
  for (const list of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
    const entries = manifest[list];
    const keys = isObject(entries) ? Object.keys(entries) : [];
    lists[list] = keys.length;
    names.push(...keys);
  }
  const bundled = manifest.bundledDependencies;
  const bundledNames = Array.isArray(bundled) ? bundled.filter((name): name is string => typeof name === "string") : [];
  lists.bundledDependencies = bundledNames.length;
  names.push(...bundledNames);
  return { lists, names };
}
/** The package directories installed at the top of node_modules, scoped ones as @scope/name. */
function installedPackages(): string[] {
  const top = join(REPO, "node_modules");
  let entries: Dirent[];
  try {
    entries = readdirSync(top, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap(entry => {
    if (!entry.isDirectory() || entry.name.startsWith(".")) return [];
    if (!entry.name.startsWith("@")) return [entry.name];
    try {
      return readdirSync(join(top, entry.name), { withFileTypes: true }).filter(child => child.isDirectory()).map(child => `${entry.name}/${child.name}`);
    } catch {
      return [];
    }
  });
}

interface SrcScan {
  readonly files: string[];
  readonly symlinks: string[];
  readonly modules: Map<string, ModuleScan>;
}
let srcScanMemo: SrcScan | undefined;
/** Every src module, scanned once for the file. */
function srcScan(): SrcScan {
  if (srcScanMemo !== undefined) return srcScanMemo;
  const { files, symlinks } = srcFiles();
  const modules = new Map<string, ModuleScan>();
  for (const path of files) if (MODULE_EXTENSIONS.includes(extensionOf(path))) modules.set(path, scanModule(path, readFileSync(join(REPO, path), "utf8")));
  srcScanMemo = { files, symlinks, modules };
  return srcScanMemo;
}

const SCOPE: ObservationScope = { workspace: "/fixture/pi-workspace", principal: "census-principal" };
const INVOCATION = "census-invocation";
const at = (second: number): string => `2026-10-23T00:00:${String(second).padStart(2, "0")}Z`;
/** The owner a fixture record names: a provider, a record type, the id that carries the revision and the native scope that carries
 * owner instance and epoch, as an H2 adapter would have to state them. */
const OWNER: NativeRef = { provider: "h2-fixture", type: "public-port", id: "port.value#r7", scope: "owner-a:instance-1:epoch-1" };
const presentation = (statusText: string, statusTone: Presentation["statusTone"] = "success", title = "port.value"): Presentation => ({ title, type: "sdk-operation", statusText, statusTone });
interface SnapshotEdit {
  readonly scope?: ObservationScope;
  readonly sequence?: number;
  readonly capturedAt?: string;
  readonly node?: Presentation;
  readonly sourceVersion?: string;
  readonly sourceRevision?: string;
  readonly subjectBasis?: string;
  readonly nativePayloadRef?: string;
  readonly evidenceRefs?: readonly string[];
  readonly coverage?: NativeSnapshot["coverage"];
}
function snapshotOf(source: NativeRef, edit: SnapshotEdit = {}): NativeSnapshot {
  const capturedAt = edit.capturedAt ?? at(1);
  return {
    source: { ...source }, scope: { ...(edit.scope ?? SCOPE) }, capturedAt, observedAt: capturedAt, node: edit.node ?? presentation("VALUE"),
    kind: "h2.fixture.snapshot", trace: { invocationId: INVOCATION }, coverage: edit.coverage ?? "complete",
    ...(edit.sequence !== undefined ? { sequence: edit.sequence } : {}),
    ...(edit.sourceVersion !== undefined ? { sourceVersion: edit.sourceVersion } : {}),
    ...(edit.sourceRevision !== undefined ? { sourceRevision: edit.sourceRevision } : {}),
    ...(edit.subjectBasis !== undefined ? { subjectBasis: edit.subjectBasis } : {}),
    ...(edit.nativePayloadRef !== undefined ? { nativePayloadRef: edit.nativePayloadRef } : {}),
    ...(edit.evidenceRefs !== undefined ? { evidenceRefs: [...edit.evidenceRefs] } : {}),
  };
}
function eventOf(source: NativeRef, id: string, sequence: number, statusText: string, second: number): ObservationEvent {
  return {
    projectionEventId: id, source: { ...source }, scope: { ...SCOPE }, sourceSequence: sequence, observedAt: at(second), kind: "h2.fixture.publication",
    node: { presentation: presentation(statusText) }, trace: { invocationId: INVOCATION },
  };
}
/** What the cache holds for one native reference, as a judge reads it. */
function held(projection: ObservationProjection, ref: NativeRef, scope: ObservationScope = SCOPE): JsonObject | null {
  const nodes = projection.query({ scope, ref, limit: 5 }).nodes;
  const node: ObservedNode | undefined = nodes[0];
  if (node === undefined) return null;
  return json({
    nodes: nodes.length, statusText: node.presentation.statusText, statusTone: node.presentation.statusTone, freshness: node.freshness, completeness: node.completeness,
    sourceVersion: node.sourceVersion ?? null, subjectBasis: node.subjectBasis ?? null, payloadRef: node.payloadRef ?? null, evidenceRefs: [...node.evidenceRefs],
    title: node.presentation.title, observedAt: node.observedAt,
  }) as JsonObject;
}
const revisionOf = (projection: ObservationProjection): number => projection.window({ scope: SCOPE, invocationId: INVOCATION, offset: 0, limit: 100 }).revision;

/** A judge: each record names the status it should read; an implementation's readings that differ are its failures. */
function judged(expected: readonly string[], readings: readonly (string | null)[]): string[] {
  return expected.flatMap((want, index) => (readings[index] === want ? [] : [`record ${index}: read ${String(readings[index])}, owes ${want}`]));
}

/** The rf reading as the native provider hands it on, and the host context the observer reads it under. */
const RF_ROOT = "/fixture/rf-workspace";
const RF_CONTEXT: ReactiveFiberTopologyContext = { scope: { workspace: RF_ROOT, principal: "census-principal" }, seam: "rf-cli", capturedAt: at(1), observedAt: at(1), invocationId: INVOCATION };
const OPERATIONS = { clean: `rfo_${"b".repeat(22)}`, flagged: `rfo_${"c".repeat(22)}`, bundleOne: `rfo_${"d".repeat(22)}`, bundleTwo: `rfo_${"e".repeat(22)}` };
const digest = (fill: string): string => `sha256:${fill.repeat(64)}`;
const GRAPHS = { one: digest("a"), two: digest("9") };
const BUNDLES = { one: digest("3"), two: digest("4") };
interface RenderEdit {
  readonly operation: string;
  readonly graph?: string;
  readonly bundle?: string;
  readonly flagged?: boolean;
}
function objectAt(value: JsonValue | undefined, field: string): JsonObject {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
/** The full-shape rf render (test/helpers/rf-render-fixture.ts) with its operation, graph digest, bundle and error count edited; the
 * output text is the fixture's in every render. */
function renderOf(edit: RenderEdit): JsonObject {
  const envelope = json(fullShapeRf(RF_ROOT)) as JsonObject;
  envelope.operation_id = edit.operation;
  const result = objectAt(envelope.result, "result");
  objectAt(result.provenance, "result.provenance").graph_revision_id = edit.graph ?? GRAPHS.one;
  result.bundle_revision_id = edit.bundle ?? BUNDLES.one;
  if (edit.flagged === true) result.diagnostics_summary = { errors: 1, warnings: 0, has_errors: true, has_warnings: false };
  return envelope;
}
function previewOf(edit: RenderEdit, context: ReactiveFiberTopologyContext = RF_CONTEXT): NativeSnapshot {
  const topology = reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: RF_ROOT, source: renderOf(edit) }, context);
  const snapshot = topology.snapshots[0];
  if (snapshot === undefined) throw new Error("the rf reader projected no snapshot");
  return snapshot;
}
const rfScope = RF_CONTEXT.scope;
const rfRef = (operation: string): NativeRef => ({ provider: "reactivefiber", type: "context-preview", id: operation, scope: RF_ROOT });
/** A census digest by name, so a witness holds no fixture-owned literal: the rf output digest reads as its shape. */
function digestName(value: string | undefined): string {
  const names: Readonly<Record<string, string>> = { [GRAPHS.one]: "graph-one", [GRAPHS.two]: "graph-two", [BUNDLES.one]: "bundle-one", [BUNDLES.two]: "bundle-two" };
  if (value === undefined) return "absent";
  if (/^rf-output:sha256:[0-9a-f]{64}$/.test(value)) return "rf-output:sha256:<64 hex>";
  return names[value] ?? `other:${value}`;
}
/** The provenance references a clause reads (graph and bundle), each digest by name; the workspace and release references are the fixture's. */
const provenanceRefs = (refs: readonly string[] | undefined): string[] =>
  (refs ?? []).flatMap(ref => (/^rf-(?:graph|bundle):/.test(ref) ? [`${ref.slice(0, ref.indexOf(":"))}:${digestName(ref.slice(ref.indexOf(":") + 1))}`] : []));
/** What the cache holds for one rf preview, as a clause reads it. */
function rfHeld(projection: ObservationProjection, operation: string): JsonObject | null {
  const node = projection.query({ scope: rfScope, ref: rfRef(operation), limit: 5 }).nodes[0];
  if (node === undefined) return null;
  return json({
    statusTone: node.presentation.statusTone, completeness: node.completeness, sourceVersion: digestName(node.sourceVersion), payload: digestName(node.payloadRef),
    provenance: provenanceRefs(node.evidenceRefs), title: node.presentation.title, observedAt: node.observedAt,
  }) as JsonObject;
}

/** One evidence loader that counts its loads and serves byte-identical previews with per-reference freshness, basis and receipt. */
interface CountingLoader {
  readonly loader: EvidenceLoader;
  readonly loads: string[];
}
const SAME_PREVIEW: readonly string[] = ["VALUE r7", "witness ok"];
function countingLoader(provider: string, facts: Readonly<Record<string, { freshness: "current" | "stale"; basis: string; receipt: string }>>): CountingLoader {
  const loads: string[] = [];
  const loader: EvidenceLoader = {
    provider,
    requiredGrant: "h2-fixture:inspect",
    canLoad: ref => ref.startsWith("h2-evidence:"),
    load: async request => {
      loads.push(`${request.nativeRef.provider}/${request.nativeRef.type}/${request.nativeRef.scope ?? ""}/${request.nativeRef.id} ${request.evidenceRef}`);
      const fact = facts[request.evidenceRef] ?? { freshness: "current", basis: digest("0"), receipt: "receipt-default" };
      const content: EvidenceContent = {
        kind: "h2.fixture.record", provider, capturedAt: at(2), bytes: SAME_PREVIEW.join("\n").length, truncated: false, preview: [...SAME_PREVIEW],
        sourceBasis: fact.basis, freshness: fact.freshness, producerReceipt: fact.receipt,
      };
      return content;
    },
  };
  return { loader, loads };
}
function entryView(store: EvidenceStore, scope: ObservationScope, ref: NativeRef, evidenceRef: string): JsonObject {
  const entry = store.get(scope, ref, evidenceRef);
  if (entry.state !== "loaded") return json(entry) as JsonObject;
  return json({ state: entry.state, freshness: entry.freshness, sourceBasis: entry.sourceBasis ?? null, producerReceipt: entry.producerReceipt ?? null, preview: entry.preview }) as JsonObject;
}

/** The script D2 journals: one agent call whose prompt is equal in every run. */
const JOURNAL_SCRIPT = 'export const meta = { name: "census-probe", description: "an equal prompt under two sources" };\nreturn await agent("summarize the shared context");';
const PROMPT = "summarize the shared context";
interface JournalRun {
  readonly calls: number;
  readonly replayed: number;
  readonly value: string;
  readonly recorded: WorkflowJournalEntry[];
}
async function journalRun(basis: string, entries: readonly WorkflowJournalEntry[]): Promise<JournalRun> {
  const calls: string[] = [];
  const recorded: WorkflowJournalEntry[] = [];
  const host: WorkflowHost = {
    replayBasis: basis,
    spawnAgent: async request => {
      calls.push(request.prompt);
      return { ok: true, text: `answer under ${basis}` };
    },
    abortAgent: () => undefined,
  };
  const result = await runWorkflow({ script: JOURNAL_SCRIPT, host, journal: { entries, append: entry => recorded.push(entry) } });
  expect(result.status, `the journal probe under ${basis} completes`).toBe("completed");
  return { calls: calls.length, replayed: result.replayedCount, value: String(result.value), recorded };
}

const errorOf = (run: () => unknown): string => {
  try {
    run();
    return "none";
  } catch (error) {
    return error instanceof CapabilityError ? `${error.category}: ${error.message}` : error instanceof Error ? error.message : String(error);
  }
};

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue | Promise<JsonValue>>> = {
  A1: () => {
    const { lists, names } = declaredPackages();
    const installed = installedPackages();
    const scan = srcScan();
    const specifiers = [...scan.modules.values()].flatMap(scanned => scanned.specifiers);
    const declaredH2 = names.filter(name => H2_PACKAGE.test(name));
    const installedH2 = installed.filter(name => H2_PACKAGE.test(name));
    const loadedH2 = specifiers.filter(specifier => H2_PACKAGE.test(specifier));
    const namedH2 = [...scan.modules.values()].flatMap(scanned => scanned.packageLiterals);
    const ownSdksRead = OWN_SDKS.filter(sdk => specifiers.some(specifier => specifier === sdk || specifier.startsWith(`${sdk}/`)));
    const patternReads = PACKAGE_CONTROLS.filter(name => H2_PACKAGE.test(name));
    expect(declaredH2, "an H2 producer package in package.json").toEqual([]);
    expect(installedH2, "an H2 producer package in node_modules").toEqual([]);
    expect(loadedH2, "a src module loading an H2 producer package").toEqual([]);
    expect(namedH2, "a src literal naming an H2 producer package").toEqual([]);
    expect(ownSdksRead, "the specifier reader finds the SDKs Pi does bundle").toEqual([...OWN_SDKS]);
    expect(patternReads, "the pattern reads every H2 package spelling").toEqual([...PACKAGE_CONTROLS]);
    expect(H2_PACKAGE.test(OWN_RF_SPECIFIER), "Pi's own rf provider module is not an H2 package").toBe(false);
    expect(installed.length, "node_modules is installed, so an empty installed list is measured").toBeGreaterThan(50);
    expect(Number(lists.dependencies) + Number(lists.devDependencies), "package.json's dependency lists are read").toBeGreaterThanOrEqual(10);
    return json({ declaredH2, installedH2, loadedH2, namedH2, ownSdksRead, patternReads, ownRfRead: false, declaredFloorMet: names.length >= 10, installedFloorMet: installed.length > 50 });
  },
  A2: () => {
    const scan = srcScan();
    const read = [...scan.modules.values()].flatMap(scanned => scanned.hits);
    // R-OWN-FIELD: a hit KNOWN_SPELLINGS names (by module, reading and text) is held as known; every other hit is a finding.
    const hits = read.filter(hit => !KNOWN_SPELLINGS.includes(spellingOf(hit))).map(shownHit);
    const known = [...new Set(read.filter(hit => KNOWN_SPELLINGS.includes(spellingOf(hit))).map(spellingOf))].sort();
    const nonModules = scan.files.filter(path => !MODULE_EXTENSIONS.includes(extensionOf(path)));
    const anchors = Object.entries(ANCHORS).map(([path, identifier]) => `${path}:${scan.modules.get(path)?.identifiers.has(identifier) === true}`);
    const literalAnchors = Object.entries(LITERAL_ANCHORS).map(([path, literal]) => `${path}:${scan.modules.get(path)?.literals.has(literal) === true}`);
    const quietSites = Object.entries(QUIET_SITES).map(([path, identifier]) => {
      const scanned = scan.modules.get(path);
      return `${path}:${scanned?.identifiers.has(identifier) === true}:${scanned?.hits.length ?? -1}`;
    });
    const flagged = FLAGGED_CONTROLS.map(([source, term]) => `${term}:${scanModule("control.ts", source).hits.some(hit => hit.term === term)}`);
    const readings = READING_CONTROLS.map(([label, reading, source]) => `${label}:${scanModule("control.ts", source).hits.some(hit => hit.reading === reading && hit.term === READING_TERM)}`);
    const quietControls = QUIET_CONTROLS.map(source => scanModule("control.ts", source).hits.length);
    const composed = scanModule("control.ts", COMPOSED_CONTROL).hits.length;
    const split = SPLIT_CONTROLS.map(source => scanModule("control.ts", source).hits.length);
    expect(hits, "a src module names a gating work package or an H2 identity-record word").toEqual([]);
    expect(known, "the known spelling is read where it stands, so the chain reading is live on src").toEqual([...KNOWN_SPELLINGS]);
    expect(scan.files.length, "src files above the floor").toBeGreaterThanOrEqual(FLOORS.srcFiles);
    expect(scan.modules.size, "src modules above the floor").toBeGreaterThanOrEqual(FLOORS.srcModules);
    expect({ nonModules, symlinks: scan.symlinks }, "every src file is a module the compiler parses").toStrictEqual({ nonModules: [], symlinks: [] });
    expect(anchors.every(entry => entry.endsWith(":true")), "every judged site is scanned and yields its identifier").toBe(true);
    expect(literalAnchors.every(entry => entry.endsWith(":true")), "the scan reads literals at the judged sites").toBe(true);
    expect(quietSites.every(entry => entry.endsWith(":true:0")), "the derived caches are scanned and quiet").toBe(true);
    expect(flagged.every(entry => entry.endsWith(":true")), "each flagged control reads its own term").toBe(true);
    expect(readings.every(entry => entry.endsWith(":true")), "each reading control is spelled by its own reading").toBe(true);
    expect(quietControls, "the quiet controls read nothing").toEqual(QUIET_CONTROLS.map(() => 0));
    return json({
      hits, floorsMet: { srcFiles: scan.files.length >= FLOORS.srcFiles, srcModules: scan.modules.size >= FLOORS.srcModules }, nonModules, anchors, literalAnchors, flagged, readings,
      quietControls, quiet: { "R-COMPOSED": composed, "R-UNJUDGED-SITES": quietSites, "R-OWN-FIELD": known, "R-SPLIT-NAMES": split },
    });
  },
  A3: () => {
    const bead = readBeadRow();
    const gating = noteLine(bead.notes, "Gating artifact: ");
    const packages = [...gating.matchAll(/\b(RL|FO|RC|RI)-H2-(0\d)(?:\/(0\d))?/g)].flatMap(match => [`${match[1]}-H2-${match[2]}`, ...(match[3] !== undefined ? [`${match[1]}-H2-${match[3]}`] : [])]);
    const fed = [...gating.matchAll(/\bTSX-FED-0\d\b/g)].map(match => match[0]);
    const shipped = /Shipped: no\.$/.test(gating);
    const cited = [...gating.matchAll(/\((RL|FO|RC|RI) L(\d+)(?:-(\d+))?\)/g)].map(match => ({ label: match[1] ?? "", from: Number(match[2]), to: Number(match[3] ?? match[2]) }));
    // Each cited table row holds the work packages its program's gating clause names.
    const rowsHold = cited.map(({ label, from, to }) => {
      const want = packages.filter(name => name.startsWith(`${label}-`));
      const rows = Array.from({ length: to - from + 1 }, (_, index) => producerLine(label, from + index));
      return `${label}:${want.every(name => rows.some(row => row.startsWith(`| ${name} |`)))}`;
    });
    const gatingDeclared = ROSTER.producer.flatMap(source => source.gating);
    const probes = ROSTER.producer.filter(source => source.srcProbe !== undefined).map(source => `${source.label}:${source.srcProbe?.filesAtPin.length ?? -1}`);
    const fedRow = producerLine("TSX", 39).includes("| TSX-FED-01 |");
    const dp010 = producerLine("TSX-dp010", 75);
    const publicPortOwner = dp010.includes("'public port'") && dp010.includes("TSX-FED-01");
    expect({ packages, fed, shipped }, "the gating sentence names the H2 adapters and TSX-FED-01, unshipped").toStrictEqual({
      packages: ["RL-H2-01", "RL-H2-02", "FO-H2-01", "FO-H2-02", "RC-H2-02", "RI-H2-02"], fed: ["TSX-FED-01"], shipped: true,
    });
    expect([...gatingDeclared].sort(), "the roster's producer facts declare the same gating set").toEqual([...packages, ...fed].sort());
    expect(rowsHold.every(entry => entry.endsWith(":true")), "each cited producer row names its work package").toBe(true);
    expect(probes.every(entry => entry.endsWith(":0")), "no producer src names a gating artifact at the pin").toBe(true);
    expect({ fedRow, publicPortOwner }, "TSX-FED-01 owns the public-port vocabulary").toStrictEqual({ fedRow: true, publicPortOwner: true });
    return json({ packages, fed, shipped, cited, rowsHold, probes, fedRow, publicPortOwner });
  },
  B1: () => {
    const projection = new ObservationProjection();
    const first = [1, 2, 3].map(n => projection.ingest(eventOf(OWNER, `epoch-1/${n}`, n, `VALUE r${n}`, n)));
    const before = { node: held(projection, OWNER), stats: projection.stats(), revision: revisionOf(projection) };
    // The owner restarts: its new epoch re-counts from 1 under fresh event ids while the native reference stays the same.
    const restart = [1, 3].map(n => projection.ingest(eventOf(OWNER, `epoch-2/${n}`, n, `VALUE epoch-2 r${n}`, 10 + n)));
    const snapshots = [projection.refresh(snapshotOf(OWNER, { capturedAt: at(20), node: presentation("VALUE epoch-2 unsequenced") })), projection.refresh(snapshotOf(OWNER, { sequence: 2, capturedAt: at(21), node: presentation("VALUE epoch-2 r2") }))];
    const after = { node: held(projection, OWNER), stats: projection.stats(), revision: revisionOf(projection) };
    const unchanged = JSON.stringify(after) === JSON.stringify(before);
    // The judge: a restart record answered from the cache (a hit) or applied over it fails; a sequence-keyed cache is the control.
    const owed = restart.map(() => "out-of-order");
    const sequenceKeyed = (() => {
      const cache = new Map<string, string>();
      const readings: string[] = [];
      for (const [epoch, n] of [[1, 1], [1, 2], [1, 3], [2, 1], [2, 3]] as const) {
        const key = `${OWNER.provider}/${OWNER.type}/${OWNER.id}#${n}`;
        if (epoch === 2) readings.push(cache.has(key) ? "hit" : "stored");
        cache.set(key, `epoch-${epoch}`);
      }
      return readings;
    })();
    const piFailures = judged(owed, restart);
    const sequenceKeyedFailures = judged(owed, sequenceKeyed);
    // R-EVENT-ID's quiet row: an event id restated across the restart reads duplicate, the state unchanged.
    const restated = projection.ingest(eventOf(OWNER, "epoch-1/3", 4, "VALUE epoch-2 r4", 30));
    const restatedUnchanged = JSON.stringify(held(projection, OWNER)) === JSON.stringify(before.node);
    // R-SNAPSHOT-RESYNC's quiet row: a read-current snapshot at the equal sequence is applied in full, carrying only its own fields.
    const resync = projection.refresh(snapshotOf(OWNER, { sequence: 3, capturedAt: at(40), node: presentation("VALUE epoch-2 r3", "waiting"), sourceVersion: "epoch-2" }));
    const resynced = held(projection, OWNER);
    expect(first).toEqual(["applied", "applied", "applied"]);
    expect(restart, "a restarted owner's re-count").toEqual(owed);
    expect(snapshots, "a sequence-less and a lower-sequence snapshot after the re-count").toEqual(["out-of-order", "out-of-order"]);
    expect(unchanged, "the refused records change no node field, count or revision").toBe(true);
    expect(piFailures).toEqual([]);
    expect(sequenceKeyedFailures.length, "the sequence-keyed control fails the judge").toBe(2);
    expect([restated, restatedUnchanged]).toEqual(["duplicate", true]);
    expect(resync).toBe("applied");
    expect(resynced, "the resync snapshot's own fields, nothing kept from the cached node").toStrictEqual({
      nodes: 1, statusText: "VALUE epoch-2 r3", statusTone: "waiting", freshness: "current", completeness: "complete", sourceVersion: "epoch-2", subjectBasis: null,
      payloadRef: null, evidenceRefs: [], title: "port.value", observedAt: at(40),
    });
    return json({
      first, restart, snapshots, unchanged, before: before.node, piFailures, sequenceKeyed, sequenceKeyedFailures,
      quiet: { "R-EVENT-ID": restated, "R-SNAPSHOT-RESYNC": resynced },
    });
  },
  B2: async () => {
    const variants: readonly { name: string; scope: ObservationScope; ref: NativeRef; evidence: string }[] = [
      { name: "base", scope: SCOPE, ref: OWNER, evidence: "h2-evidence:r7" },
      { name: "workspace", scope: { ...SCOPE, workspace: "/fixture/other-workspace" }, ref: OWNER, evidence: "h2-evidence:r7" },
      { name: "principal", scope: { ...SCOPE, principal: "census-other-principal" }, ref: OWNER, evidence: "h2-evidence:r7" },
      { name: "provider", scope: SCOPE, ref: { ...OWNER, provider: "h2-fixture-b" }, evidence: "h2-evidence:r7" },
      { name: "type", scope: SCOPE, ref: { ...OWNER, type: "snapshot" }, evidence: "h2-evidence:r7" },
      { name: "owner-instance", scope: SCOPE, ref: { ...OWNER, scope: "owner-a:instance-2:epoch-1" }, evidence: "h2-evidence:r7" },
      { name: "epoch", scope: SCOPE, ref: { ...OWNER, scope: "owner-a:instance-1:epoch-2" }, evidence: "h2-evidence:r7" },
      { name: "revision", scope: SCOPE, ref: { ...OWNER, id: "port.value#r8" }, evidence: "h2-evidence:r7" },
      { name: "evidence-reference", scope: SCOPE, ref: OWNER, evidence: "h2-evidence:r8" },
    ];
    const nodeVariants = variants.filter(variant => variant.name !== "evidence-reference");
    const projection = new ObservationProjection();
    const refreshed = nodeVariants.map(variant => projection.refresh(snapshotOf(variant.ref, { scope: variant.scope, sequence: 1, node: presentation(`held by ${variant.name}`) })));
    const readings = nodeVariants.map(variant => {
      const node = held(projection, variant.ref, variant.scope);
      return node === null ? null : String(node.statusText);
    });
    const owed = nodeVariants.map(variant => `held by ${variant.name}`);
    // The control: a key that drops the native scope, where an adapter carries owner instance and epoch.
    const scopeless = (() => {
      const cache = new Map<string, string>();
      for (const variant of nodeVariants) cache.set(JSON.stringify([variant.scope.workspace, variant.scope.principal, variant.ref.provider, variant.ref.type, variant.ref.id]), `held by ${variant.name}`);
      return nodeVariants.map(variant => cache.get(JSON.stringify([variant.scope.workspace, variant.scope.principal, variant.ref.provider, variant.ref.type, variant.ref.id])) ?? null);
    })();
    // Event de-duplication is per native reference: one event id and one sequence at two epochs are two applied events.
    const events = new ObservationProjection();
    const eventVerdicts = [OWNER, { ...OWNER, scope: "owner-a:instance-1:epoch-2" }].map((ref, index) => events.ingest(eventOf(ref, "port/1", 1, `epoch ${index + 1}`, 1)));
    // R-ADAPTER-REF's quiet row: an epoch carried only in sourceVersion refreshes one node in place.
    const inPlace = new ObservationProjection();
    inPlace.refresh(snapshotOf(OWNER, { sourceVersion: "epoch-1", node: presentation("VALUE epoch-1") }));
    inPlace.refresh(snapshotOf(OWNER, { sourceVersion: "epoch-2", capturedAt: at(5), node: presentation("VALUE epoch-2") }));
    const adapterRef = { nodes: inPlace.stats().nodes, node: held(inPlace, OWNER) };
    // The evidence store: bound to SCOPE, one counting loader per provider; each identity part and the evidence reference key an entry.
    const first = countingLoader("h2-fixture", {});
    const second = countingLoader("h2-fixture-b", {});
    const store = new EvidenceStore({ loaders: [first.loader, second.loader], maxEntries: 32, maxBytes: 4096, timeoutMs: 5000, scope: SCOPE });
    for (const variant of variants) await store.request(variant.scope, variant.ref, variant.evidence);
    const loadsAfterFirst = first.loads.length + second.loads.length;
    for (const variant of variants) await store.request(variant.scope, variant.ref, variant.evidence);
    const loadsAfterSecond = first.loads.length + second.loads.length;
    const entries = variants.map(variant => {
      const view = entryView(store, variant.scope, variant.ref, variant.evidence);
      return `${variant.name}:${String(view.state)}${view.state === "unavailable" ? `:${String(view.reason)}` : ""}`;
    });
    expect(refreshed, "every variant's snapshot is admitted").toEqual(nodeVariants.map(() => "applied"));
    expect(projection.stats().nodes, "every identity part keys its own node").toBe(nodeVariants.length);
    expect(judged(owed, readings), "each variant reads its own status").toEqual([]);
    expect(judged(owed, scopeless).length, "the scope-dropping control fails the judge").toBe(2);
    expect(eventVerdicts).toEqual(["applied", "applied"]);
    expect(adapterRef.nodes).toBe(1);
    expect(loadsAfterSecond, "a loaded entry is reused only at its own key").toBe(loadsAfterFirst);
    return json({
      variants: variants.map(variant => variant.name), refreshed, readings, scopeless, scopelessFailures: judged(owed, scopeless), eventVerdicts,
      loads: [...first.loads, ...second.loads], loadsAfterFirst, loadsAfterSecond, entries, quiet: { "R-ADAPTER-REF": adapterRef },
    });
  },
  C1: () => {
    const payload = `h2-payload:sha256:${"5".repeat(64)}`;
    const ownerB: NativeRef = { ...OWNER, scope: "owner-b:instance-1:epoch-1" };
    const projection = new ObservationProjection();
    const admitted = [
      projection.refresh(snapshotOf(OWNER, { nativePayloadRef: payload, node: presentation("VALUE", "success"), sourceRevision: "rev:a", evidenceRefs: ["h2-evidence:a"] })),
      projection.refresh(snapshotOf(ownerB, { nativePayloadRef: payload, node: presentation("FAILED", "failure"), sourceRevision: "rev:b", evidenceRefs: ["h2-evidence:b"] })),
    ];
    const two = [held(projection, OWNER), held(projection, ownerB)];
    // The same bytes at owner a with a changed status and witness: the earlier status is invalidated, never kept.
    const changed = projection.refresh(snapshotOf(OWNER, { nativePayloadRef: payload, capturedAt: at(9), node: presentation("FAILED witness changed", "failure"), sourceRevision: "rev:a2", evidenceRefs: ["h2-evidence:a2"] }));
    const invalidated = held(projection, OWNER);
    const readings = [two[0]?.statusText ?? null, two[1]?.statusText ?? null, invalidated?.statusText ?? null].map(value => (value === null ? null : String(value)));
    const owed = ["VALUE", "FAILED", "FAILED witness changed"];
    // The control: a cache keyed on the payload digest, first write wins.
    const payloadKeyed = (() => {
      const cache = new Map<string, string>();
      return owed.map(status => {
        const cached = cache.get(payload);
        if (cached === undefined) cache.set(payload, status);
        return cached ?? status;
      });
    })();
    const byPayload = { evidence: projection.query({ scope: SCOPE, evidence: payload, limit: 5 }).nodes.length, basis: projection.query({ scope: SCOPE, basis: payload, limit: 5 }).nodes.length, version: projection.query({ scope: SCOPE, version: payload, limit: 5 }).nodes.length };
    const queryMembers = interfaceMembers("src/workbench/observation.ts", "ObservationQuery");
    const reply = observeInvocation(projection, { scope: SCOPE, invocationId: INVOCATION });
    const replyCarriesPayload = JSON.stringify(reply).includes(payload);
    expect(admitted).toEqual(["applied", "applied"]);
    expect(projection.stats().nodes, "one payload digest at two owners stays two nodes").toBe(2);
    expect(changed).toBe("applied");
    expect(judged(owed, readings), "each owner reads its own status, and the changed one replaces the old").toEqual([]);
    expect(judged(owed, payloadKeyed).length, "the payload-keyed control fails the judge").toBe(2);
    expect(byPayload, "no query selects by the payload digest").toStrictEqual({ evidence: 0, basis: 0, version: 0 });
    expect(queryMembers.some(member => /payload|digest|bytes|text/i.test(member)), "ObservationQuery has no payload member").toBe(false);
    expect(replyCarriesPayload, "the workflow_observe reply carries no payload digest").toBe(false);
    return json({ admitted, two, changed, invalidated, readings, payloadKeyed, payloadKeyedFailures: judged(owed, payloadKeyed), byPayload, queryMembers, replyNodes: reply.nodes.length, replyCarriesPayload });
  },
  C2: async () => {
    const counting = countingLoader("h2-fixture", {
      "h2-evidence:a": { freshness: "current", basis: digest("a"), receipt: "receipt-a" },
      "h2-evidence:b": { freshness: "stale", basis: digest("b"), receipt: "receipt-b" },
    });
    const ownerB: NativeRef = { ...OWNER, scope: "owner-b:instance-1:epoch-1" };
    const store = new EvidenceStore({ loaders: [counting.loader], maxEntries: 32, maxBytes: 4096, timeoutMs: 5000, scope: SCOPE });
    const keys: readonly (readonly [NativeRef, string])[] = [[OWNER, "h2-evidence:a"], [OWNER, "h2-evidence:b"], [ownerB, "h2-evidence:a"]];
    await store.request(SCOPE, OWNER, "h2-evidence:a");
    await store.request(SCOPE, OWNER, "h2-evidence:b");
    const afterTwo = counting.loads.length;
    await store.request(SCOPE, OWNER, "h2-evidence:a");
    await store.request(SCOPE, OWNER, "h2-evidence:b");
    const afterRepeat = counting.loads.length;
    await store.request(SCOPE, ownerB, "h2-evidence:a");
    const afterOwnerB = counting.loads.length;
    const views = keys.map(([ref, evidence]) => entryView(store, SCOPE, ref, evidence));
    const samePreview = views.every(view => JSON.stringify(view.preview) === JSON.stringify(views[0]?.preview));
    const readings = views.map(view => `${String(view.freshness)}/${String(view.producerReceipt)}`);
    const owed = ["current/receipt-a", "stale/receipt-b", "current/receipt-a"];
    // The control: a cache keyed on the preview's content, first write wins.
    const contentKeyed = (() => {
      const cache = new Map<string, string>();
      return owed.map(reading => {
        const key = SAME_PREVIEW.join("\n");
        const cached = cache.get(key);
        if (cached === undefined) cache.set(key, reading);
        return cached ?? reading;
      });
    })();
    expect([afterTwo, afterRepeat, afterOwnerB], "each key loads once, and only its own entry answers it").toEqual([2, 2, 3]);
    expect(samePreview, "the previews are byte-identical").toBe(true);
    expect(judged(owed, readings), "each entry keeps its own freshness and receipt").toEqual([]);
    expect(new Set(views.map(view => String(view.sourceBasis))).size, "each entry keeps its own basis").toBe(2);
    expect(judged(owed, contentKeyed).length, "the content-keyed control fails the judge").toBe(1);
    return json({ loads: counting.loads, counts: [afterTwo, afterRepeat, afterOwnerB], views, samePreview, readings, contentKeyed, contentKeyedFailures: judged(owed, contentKeyed) });
  },
  C3: () => {
    const clean = previewOf({ operation: OPERATIONS.clean });
    const flagged = previewOf({ operation: OPERATIONS.flagged, graph: GRAPHS.two, flagged: true });
    const shape = (snapshot: NativeSnapshot): JsonObject => json({
      id: snapshot.source.id, statusTone: snapshot.node.statusTone, coverage: snapshot.coverage ?? null, sourceRevision: digestName(snapshot.sourceRevision),
      payload: digestName(snapshot.nativePayloadRef), provenance: provenanceRefs(snapshot.evidenceRefs),
    }) as JsonObject;
    const projection = new ObservationProjection();
    const admitted = [projection.refresh(clean), projection.refresh(flagged)];
    const cleanHeld = rfHeld(projection, OPERATIONS.clean);
    const flaggedHeld = rfHeld(projection, OPERATIONS.flagged);
    // A later render of the clean operation, flagged, with the same text: its status replaces the clean one.
    const later = previewOf({ operation: OPERATIONS.clean, graph: GRAPHS.two, flagged: true }, { ...RF_CONTEXT, capturedAt: at(30), observedAt: at(30) });
    const replaced = projection.refresh(later);
    const replacedHeld = rfHeld(projection, OPERATIONS.clean);
    const payloadIsEvidence = [clean, flagged, later].some(snapshot => (snapshot.evidenceRefs ?? []).includes(snapshot.nativePayloadRef ?? ""));
    expect(clean.nativePayloadRef, "identical output text reads one payload digest").toBe(flagged.nativePayloadRef);
    expect([clean.node.statusTone, flagged.node.statusTone, clean.coverage, flagged.coverage]).toEqual(["success", "unknown", "complete", "partial"]);
    expect(clean.sourceRevision === flagged.sourceRevision, "the graph digests differ").toBe(false);
    expect(admitted).toEqual(["applied", "applied"]);
    expect(projection.stats().nodes).toBe(2);
    expect([cleanHeld?.statusTone, flaggedHeld?.statusTone]).toEqual(["success", "unknown"]);
    expect([replaced, replacedHeld?.statusTone, replacedHeld?.completeness]).toEqual(["applied", "unknown", "partial"]);
    expect(payloadIsEvidence, "the payload digest is never an evidence reference").toBe(false);
    return json({ clean: shape(clean), flagged: shape(flagged), payloadEqual: clean.nativePayloadRef === flagged.nativePayloadRef, admitted, cleanHeld, flaggedHeld, replaced, replacedHeld, payloadIsEvidence });
  },
  D1: () => {
    const one = previewOf({ operation: OPERATIONS.bundleOne, bundle: BUNDLES.one });
    const two = previewOf({ operation: OPERATIONS.bundleTwo, bundle: BUNDLES.two });
    const projection = new ObservationProjection();
    const admitted = [projection.refresh(one), projection.refresh(two)];
    const cohort = (version: string): string[] => projection.query({ scope: rfScope, version, limit: 10 }).nodes.map(node => node.nativeRef.id).sort();
    const byBundleRef = (bundle: string): string[] => projection.query({ scope: rfScope, evidence: `rf-bundle:${bundle}`, limit: 10 }).nodes.map(node => node.nativeRef.id).sort();
    const payload = one.nativePayloadRef ?? "";
    const cohorts = { one: cohort(BUNDLES.one), two: cohort(BUNDLES.two), payload: cohort(payload) };
    const bundleRefs = { one: byBundleRef(BUNDLES.one), two: byBundleRef(BUNDLES.two), payload: projection.query({ scope: rfScope, evidence: payload, limit: 10 }).nodes.length };
    // The same operation re-rendered at the second bundle moves to that cohort: the cohort follows the bundle, never the text.
    const moved = projection.refresh(previewOf({ operation: OPERATIONS.bundleOne, bundle: BUNDLES.two }, { ...RF_CONTEXT, capturedAt: at(30), observedAt: at(30) }));
    const afterMove = { one: cohort(BUNDLES.one), two: cohort(BUNDLES.two) };
    const loaderRows = EVIDENCE_LOADER_ROWS.map(row => `${row.provider}: ${row.refKind}`);
    const textHashLoader = EVIDENCE_LOADER_ROWS.some(row => row.provider === "reactivefiber" || /output|payload|text|sha256/i.test(row.refKind));
    // The control: a cohort keyed on the text hash.
    const textKeyed = [one, two].map(() => digestName(payload));
    const owed = ["bundle-one", "bundle-two"];
    const readings = [digestName(one.sourceVersion), digestName(two.sourceVersion)];
    expect(one.nativePayloadRef, "identical output text reads one payload digest").toBe(two.nativePayloadRef);
    expect(one.sourceRevision, "one graph digest").toBe(two.sourceRevision);
    expect(judged(owed, readings), "each render's cohort is its stated bundle").toEqual([]);
    expect(judged(owed, textKeyed).length, "the text-hash cohort control fails the judge").toBe(2);
    expect(admitted).toEqual(["applied", "applied"]);
    expect(cohorts).toStrictEqual({ one: [OPERATIONS.bundleOne], two: [OPERATIONS.bundleTwo], payload: [] });
    expect(bundleRefs).toStrictEqual({ one: [OPERATIONS.bundleOne], two: [OPERATIONS.bundleTwo], payload: 0 });
    expect([moved, afterMove]).toStrictEqual(["applied", { one: [], two: [OPERATIONS.bundleOne, OPERATIONS.bundleTwo] }]);
    expect(textHashLoader, "no registered evidence loader reads an rf reference or a text hash").toBe(false);
    return json({ readings, payloadEqual: one.nativePayloadRef === two.nativePayloadRef, admitted, cohorts, bundleRefs, moved, afterMove, loaderRows, textHashLoader, textKeyedFailures: judged(owed, textKeyed) });
  },
  D2: async () => {
    const recordedUnderA = await journalRun("source-a", []);
    const underB = await journalRun("source-b", recordedUnderA.recorded);
    const underA = await journalRun("source-a", recordedUnderA.recorded);
    const keys = [...recordedUnderA.recorded, ...underB.recorded].map(entry => entry.key);
    const promptKey = journalKey({ prompt: PROMPT });
    const bases = [...recordedUnderA.recorded, ...underB.recorded].map(entry => entry.basis ?? null);
    // The control: a replay keyed on the prompt alone answers source-b from source-a's journal.
    const promptKeyed = [recordedUnderA.recorded[0]?.text ?? null];
    const owed = ["answer under source-b"];
    const hosts = [
      createClaudeWorkflowHost({ cwd: "/fixture/source-a" }).replayBasis,
      createClaudeWorkflowHost({ cwd: "/fixture/source-a" }).replayBasis,
      createClaudeWorkflowHost({ cwd: "/fixture/source-b" }).replayBasis,
      createClaudeWorkflowHost({ cwd: "/fixture/source-a", principal: { id: "census-other-principal" } }).replayBasis,
      createClaudeWorkflowHost({ cwd: "/fixture/source-a", grants: ["h2-fixture:inspect"] }).replayBasis,
    ];
    const hostBases = { sameConfigEqual: hosts[0] === hosts[1], distinct: new Set(hosts.slice(1)).size };
    expect([recordedUnderA.calls, recordedUnderA.replayed], "the first run spawns its agent").toEqual([1, 0]);
    expect([underB.calls, underB.replayed, underB.value], "another source's basis runs the equal prompt live").toEqual([1, 0, "answer under source-b"]);
    expect([underA.calls, underA.replayed, underA.value], "the recording source's basis replays it").toEqual([0, 1, "answer under source-a"]);
    expect(keys, "the payload key is equal: the basis is what separates the two").toEqual([promptKey, promptKey]);
    expect(bases).toEqual(["source-a", "source-b"]);
    expect(judged(owed, [underB.value]), "the second source reads its own answer").toEqual([]);
    expect(judged(owed, promptKeyed).length, "the prompt-keyed control fails the judge").toBe(1);
    expect(hostBases, "Claude hosts separate the workspace, the principal and the grants").toStrictEqual({ sameConfigEqual: true, distinct: 4 });
    return json({
      first: [recordedUnderA.calls, recordedUnderA.replayed], otherSource: [underB.calls, underB.replayed, underB.value], keysArePromptKey: keys.map(key => key === promptKey), bases, promptKeyed,
      promptKeyedFailures: judged(owed, promptKeyed), hostBases, quiet: { "R-SAME-BASIS": [underA.calls, underA.replayed, underA.value] },
    });
  },
  E1: () => {
    const alias = presentation("VALUE", "success", "shared-port");
    const owners: readonly NativeRef[] = [OWNER, { ...OWNER, scope: "owner-b:instance-1:epoch-1" }, { ...OWNER, provider: "h2-fixture-b" }];
    const projection = new ObservationProjection();
    const admitted = owners.map(ref => projection.refresh(snapshotOf(ref, { node: alias })));
    const keys = owners.map(ref => projection.query({ scope: SCOPE, ref, limit: 5 }).nodes.map(node => node.key));
    const own = owners.map((ref, index) => JSON.stringify(projection.query({ scope: SCOPE, ref, limit: 5 }).nodes.map(node => node.nativeRef)) === JSON.stringify([owners[index]]));
    projection.relate({ scope: SCOPE, from: owners[0] ?? OWNER, to: owners[1] ?? OWNER, kind: "grouping", provenance: { source: "h2-fixture", observedAt: at(1) } });
    const edges = projection.relations({ scope: SCOPE, from: keys[0]?.[0] ?? "" }).map(relation => relation.from !== relation.to && relation.to === keys[1]?.[0]);
    // The control: an index keyed on the local alias.
    const aliasKeyed = (() => {
      const index = new Map<string, string>();
      for (const ref of owners) index.set(alias.title, JSON.stringify(ref));
      return owners.map(() => index.get(alias.title) ?? null);
    })();
    const owed = owners.map(ref => JSON.stringify(ref));
    const readings = owners.map(ref => {
      const node = projection.query({ scope: SCOPE, ref, limit: 5 }).nodes[0];
      return node === undefined ? null : JSON.stringify(node.nativeRef);
    });
    // The rf reader: an operation reference that aliases the preview itself is refused; one naming another owner is a distinct end.
    const selfAlias = errorOf(() => reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: RF_ROOT, source: renderOf({ operation: OPERATIONS.clean }) }, { ...RF_CONTEXT, operationRef: rfRef(OPERATIONS.clean) }));
    const otherOwner = reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: RF_ROOT, source: renderOf({ operation: OPERATIONS.clean }) }, { ...RF_CONTEXT, operationRef: { ...rfRef(OPERATIONS.clean), provider: "h2-fixture" } });
    const otherOwnerEdge = otherOwner.relations.map(relation => `${relation.from.provider}/${relation.from.id} -> ${relation.to.provider}/${relation.to.id}`);
    expect(admitted).toEqual(["applied", "applied", "applied"]);
    expect(projection.stats().nodes, "one alias at three owners stays three nodes").toBe(3);
    expect(new Set(keys.flat()).size).toBe(3);
    expect(own.every(Boolean), "each owner's query returns its own reference").toBe(true);
    expect(edges, "a grouping edge keeps both owners").toEqual([true]);
    expect(judged(owed, readings)).toEqual([]);
    expect(judged(owed, aliasKeyed).length, "the alias-keyed control fails the judge").toBe(2);
    expect(selfAlias).toBe("validation: ReactiveFiber topology refused: the operation reference aliases the preview node itself.");
    expect(otherOwnerEdge).toEqual([`h2-fixture/${OPERATIONS.clean} -> reactivefiber/${OPERATIONS.clean}`]);
    return json({ admitted, distinctKeys: new Set(keys.flat()).size, own, edges, readings, aliasKeyed, aliasKeyedFailures: judged(owed, aliasKeyed), selfAlias, otherOwnerEdge });
  },
  E2: () => {
    const spelled: NativeRef = { provider: "H2-Fixture.Owner", type: "Public-Port", id: "Owner-A.Port/value@r7#e1", scope: "Owner-A:Instance-1:Epoch-1" };
    const owners: readonly NativeRef[] = [OWNER, { ...OWNER, scope: "owner-b:instance-1:epoch-1" }, spelled];
    const projection = new ObservationProjection();
    for (const ref of owners) projection.refresh(snapshotOf(ref, { node: presentation("VALUE", "success", "shared-port") }));
    const reply = observeInvocation(projection, { scope: SCOPE, invocationId: INVOCATION });
    const shownRefs = reply.nodes.map(node => node.nativeRef);
    const verbatim = JSON.stringify(shownRefs) === JSON.stringify(owners);
    const titles = reply.nodes.map(node => node.presentation.title);
    // The rf preview: rf's operation id is the node's id and its title, through the cache and the reply.
    const preview = previewOf({ operation: OPERATIONS.clean });
    const rfProjection = new ObservationProjection();
    rfProjection.refresh(preview);
    const rfReply = observeInvocation(rfProjection, { scope: rfScope, invocationId: INVOCATION });
    const rfShown = { id: preview.source.id, title: preview.node.title, replyId: rfReply.nodes[0]?.nativeRef.id ?? null, replyTitle: rfReply.nodes[0]?.presentation.title ?? null };
    // An unsafe owner identity is refused as a typed row, never rewritten into a shown one.
    const unsafe: NativeRef = { ...OWNER, id: `port.value${String.fromCodePoint(0x202e)}r7` };
    const refused = projection.refresh(snapshotOf(unsafe));
    const refusals = projection.identityRefusals({ scope: SCOPE, limit: 5 }).refusals;
    const afterRefusal = projection.stats().nodes;
    expect(verbatim, "the reply carries each admitted native reference field for field").toBe(true);
    expect(titles, "the alias is carried beside the distinct identities").toEqual(["shared-port", "shared-port", "shared-port"]);
    expect(rfShown).toStrictEqual({ id: OPERATIONS.clean, title: `RF context preview ${OPERATIONS.clean}`, replyId: OPERATIONS.clean, replyTitle: `RF context preview ${OPERATIONS.clean}` });
    expect([refused, afterRefusal]).toEqual(["refused", 3]);
    expect(refusals).toEqual([{ path: "refresh", ref: "source", field: "id", codePoint: "U+202E", reason: "unsafe-identity" }]);
    return json({ shownRefs: json(shownRefs), verbatim, titles, rfShown, refused, refusals: json(refusals), afterRefusal });
  },
};

/** The member names of one exported interface of a src module, read by the TypeScript compiler. */
function interfaceMembers(path: string, name: string): string[] {
  const file = ts.createSourceFile(path, readFileSync(join(REPO, path), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const statement of file.statements) {
    if (ts.isInterfaceDeclaration(statement) && statement.name.text === name) {
      return statement.members.flatMap(member => (member.name !== undefined && ts.isIdentifier(member.name) ? [member.name.text] : []));
    }
  }
  throw new Error(`${path} declares no interface ${name}`);
}

/** Every scan constant, as the roster holds it. */
const SCAN: JsonObject = json({
  h2Package: `${H2_PACKAGE.source}/${H2_PACKAGE.flags}`,
  workPackageTerms: WORK_PACKAGE_TERMS,
  identityTerms: IDENTITY_TERMS,
  moduleExtensions: MODULE_EXTENSIONS,
  floors: FLOORS,
  anchors: ANCHORS,
  literalAnchors: LITERAL_ANCHORS,
  quietSites: QUIET_SITES,
  flaggedControls: FLAGGED_CONTROLS,
  quietControls: QUIET_CONTROLS,
  composedControl: COMPOSED_CONTROL,
  readingControls: READING_CONTROLS,
  readingTerm: READING_TERM,
  knownSpellings: KNOWN_SPELLINGS,
  splitControls: SPLIT_CONTROLS,
  packageControls: PACKAGE_CONTROLS,
  ownRfSpecifier: OWN_RF_SPECIFIER,
  ownSdks: OWN_SDKS,
}) as JsonObject;

/** A describe title: the row id and its label. */
const titleOf = (row: Row): string => `${row.id} ${row.label}`;

/** THE RECORD: each case's end, in run order, as `${id}:${count}` (vitest's tally of the case's assertions), pushed only after the
 * case's last assertion; a pin's right after its witness comparison. */
const REACHED: string[] = [];
/** Each pin's witness as its case measured it; the records case compares it against the roster a second time. */
const MEASURED: Record<string, JsonValue> = {};
/** The titles selected to run, read from the collected task tree before any case runs (a test-name filter deselects the rest). */
const SELECTED: string[] = [];
/** A case's end as the record holds it. */
const endOf = (id: string): string => `${id}:${expect.getState().assertionCalls}`;

interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every test a collected task tree holds, in registration order; self marks the case doing the reading. */
function registered(tasks: readonly RunnerTask[], self?: RunnerTask): Registered[] {
  const walked: Registered[] = [];
  for (const child of tasks) {
    if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === self });
    else if (child.type === "suite") walked.push(...registered(child.tasks, self));
  }
  return walked;
}
/** A registered test's title with its collected mode, "+fails" marking an inverted one. */
const modeLine = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""}`;

// The selection, read once from the collected tree before the first case runs (no case has run, so every mode is the collected one).
beforeEach(({ task }) => {
  if (SELECTED.length === 0) SELECTED.push(...registered(task.file.tasks).filter(entry => entry.mode === "run").map(entry => entry.name));
});
// The file-end judge: a records case selected to run reached its own end, after every other case's, with its pinned count.
afterAll(() => {
  if (!SELECTED.includes(RECORDS_TITLE)) return;
  expect(REACHED, "every case of this file reached its end, the records case last").toEqual([...ROSTER.reached, ROSTER.recordsEnd]);
});

describe("wb-4nut.9 H2 identity and reuse census (TSX-HARNESS2-REACTIVE-EVOLUTION-R9, absent-today leg and armed guard)", () => {
  it(JUDGED_TITLE, { timeout: 60_000 }, ({ task }) => {
    // The collected cases, read before any other case runs: a records case deleted, renamed, skipped or inverted reds here.
    const collected = registered(task.file.tasks, task);
    expect(collected.map(entry => entry.name), "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(collected.findIndex(entry => entry.self), "this case finds itself by task identity, registered first").toBe(0);
    expect(collected.filter(entry => entry.mode !== "run" || entry.fails).map(modeLine), "every registered test is set to run and not inverted").toEqual([]);
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:2", "C:3", "D:2", "E:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: BEAD, scan: SCAN, residuals: RESIDUAL_FAMILIES, residualRows: RESIDUAL_ROWS }).toStrictEqual({
      bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals], residualRows: ROSTER.residualRows,
    });
    // Every residual names a pin of the judged set, and that pin's roster witness carries its pinned quiet row.
    const quietRows = RESIDUAL_FAMILIES.map(family => {
      const pin = RESIDUAL_ROWS[family] ?? "";
      const witness = ROWS.some(row => row.pins.includes(pin)) ? rosterWitness(pin) : null;
      const quiet = isObject(witness) && isObject(witness.quiet) ? witness.quiet : undefined;
      return `${family}:${quiet !== undefined && Object.hasOwn(quiet, family)}`;
    });
    expect(quietRows.every(entry => entry.endsWith(":true")), "every residual's quiet row is pinned in its pin's witness").toBe(true);
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^\[[^\]]+\] (If Pi ever .+?) \(gated /.exec(bead.title)?.[1] ?? "";
    const quote = /^Quote: '(.+)' (\S+ \S+)\. Merged: (.+)$/m.exec(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b), (c) and (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["C"], ["D"], ["E"], ["A"]]);
    expect({ quote: quote?.[1], citation: quote?.[2] }).toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation.slice(ROSTER.citation.indexOf(" ") + 1)), "the title cites the roster's citation").toBe(true);
    // The quote and the authority lines are the producer's lines at the cited shas, as the roster measured them.
    const authority = noteLine(bead.notes, "Authority: ");
    const held = {
      quote: unlisted(producerLine("RL", 45)) === ROSTER.quote,
      citationSha: ROSTER.citation.endsWith(`@${producerSource("RL").sha.slice(0, 12)}`),
      foL46: authority.includes(`FO L46 '${unlisted(producerLine("FO", 46))}'`),
      rcL48: authority.includes(`RC L48 '${unlisted(producerLine("RC", 48))}'`),
      rlL24: authority.includes(`RL L24 '${unlisted(producerLine("RL", 24)).slice(unlisted(producerLine("RL", 24)).lastIndexOf("A local alias"))}'`),
      riL44: authority.includes("RI L44 (prompts with different digests share no demand)") && producerLine("RI", 44).includes("source digests do not automatically share inference demand"),
      rfL43: producerLine("RF", 43).includes("same local resource alias but different owner-instance IDs => do not alias"),
    };
    expect(held, "the filing's quote and authority are the measured producer lines").toStrictEqual({ quote: true, citationSha: true, foL46: true, rcL48: true, rlL24: true, riL44: true, rfL43: true });
    // Every merged citation names a line the roster measured at its sha.
    const merged = (quote?.[3] ?? "").replace(/\.$/, "").split("; ").map(entry => {
      const found = /^(RL|FO|RC|RI|RF) (?:harness2-federated-peer )?README\.md:([\d,:]+)@([0-9a-f]{12})$/.exec(entry);
      if (found === null) return `${entry}:unparsed`;
      const source = producerSource(found[1] ?? "");
      const lines = (found[2] ?? "").split(",").map(part => Number(part.replace(/^:/, "")));
      return `${found[1]}:${source.sha.startsWith(found[3] ?? "-") && source.file.endsWith("README.md") && lines.every(line => source.lines.some(entry => entry.line === line))}`;
    });
    expect(merged).toEqual(["RL:true", "FO:true", "RC:true", "RI:true", "RF:true"]);
    REACHED.push(endOf(JUDGED_ID));
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          // A case measures its own witness: one reading the roster's rows would echo the witness it is held to.
          expect(String(impl), `${pin}'s case reads the roster's witnesses`).not.toMatch(/\brosterWitness\b|\bROSTER\.rows\b/);
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          MEASURED[pin] = witness;
          REACHED.push(endOf(pin));
        });
      }
    });
  }

  it(RECORDS_TITLE, { timeout: 60_000 }, ({ task }) => {
    const walked = registered(task.file.tasks, task);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: Registered): string => `${modeLine(entry)} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    // THE RECORD: every case before this one reached its end - the judged set first, then each pin right after its witness
    // comparison - with its pinned assertion count, and each pin's measured witness equals the roster's a second time.
    const pins = ROWS.flatMap(row => row.pins);
    expect(REACHED, "every case before this one reached its end, in run order, with its pinned assertion count").toEqual([...ROSTER.reached]);
    expect(REACHED.map(entry => entry.slice(0, entry.lastIndexOf(":"))), "the reached ids are the judged set, then the rows' pins").toEqual([JUDGED_ID, ...pins]);
    expect(MEASURED, "every pin's measured witness, compared against the roster a second time").toStrictEqual(Object.fromEntries(pins.map(pin => [pin, rosterWitness(pin)])));
    REACHED.push(endOf(RECORDS_ID));
  });
});
