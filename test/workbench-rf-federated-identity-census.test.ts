/**
 * wb-o4h0.2 (RF-FEDERATED-WORKSPACES-R3), the absent-today leg. Statement (bead notes): "No Pi adapter shall equate a workspace
 * alias or filesystem path with a federated resource identity: Pi keys imported records by (workspace_id, backend_instance_id,
 * resource kind/id, definition digest), treats the same workspace_id with a different backend_instance_id as a different
 * authority, and treats source revisions as opaque per owner/stream - never ordering, differencing or merging revision counters
 * across unrelated origins, backend instances or epochs" (docs/programs/federated-workspaces-2026-10-18/03-protocol-and-storage.md
 * :5@6a251bf73af5). Acceptance, quoted: "(a) Pi identity/cache keys for imported records use (W,I,kind,id,digest); an alias
 * rename leaves identity-keyed state untouched; no code path keys a resource by locator path; (b) same-W-different-I fixtures
 * never collide in any Pi index nor share a revision ordering; (c) property test: comparators over observations from distinct
 * (W,I) or epochs return typed non-comparable or refuse; no sort/merge key concatenates revision counters across origins."
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af57c3a703caf6892dfe3015e06a481, read-only git show by the cutting seat): the
 * roster vendors three producer lines verbatim, each hashed here (EXCERPT_SHA256, `git show <pin>:<path> | sed -n '<n>p' |
 * sha256sum`): 03-protocol-and-storage.md:5 (ResourceRef = {schema,workspace_id,backend_instance_id,resource_kind,resource_id,
 * definition_digest}; ObservationRef adds source_revision and source_epoch; "No implementation equates an alias or path with a
 * global resource ID"), :50 (I02 "No source revision counter compared across unrelated origin domains") and
 * 01-requirements-decisions.md:37 (D03, the stable identity; "Friendly aliases are local, mutable names"). 03:10 names the
 * A-side link record reactive-fiber.federation-link/v1 {alias,locator,...}: the alias and the locator this census holds out of
 * every key. Gating (bead notes): ResourceRef/ObservationRef ship with FW-02 (rfc-0txnl.2) and FW-04 (rfc-0txnl.10); no served
 * rf envelope carries them yet, so Pi imports no federated record today.
 *
 * THE REFERENCE RULE (the rule a future import surface must match; no reader is added or faked here): an imported record's key is
 * identityKey, the JSON tuple of IDENTITY_FIELDS in that order (the ResourceRef fields after its own schema tag, the identity D03
 * names), riding as the id of identityRef; its revision rides as streamRevision, the JSON tuple (workspace_id,
 * backend_instance_id, source_epoch, source_revision), opaque and qualified by its stream; its authority rides as authorityRef,
 * the evidence ref naming (workspace_id, backend_instance_id), never the workspace alone; Pi hands the projection no producer
 * counter as a sequence (the projection orders a sequence per node key, and one node outlives an epoch), so its only ordering of
 * an import is its own capture clock; compareRevisions is the typed comparator, non-comparable across origins or epochs. Only
 * the display title follows the alias.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the vendored producer lines hash to EXCERPT_SHA256, and IDENTITY_FIELDS is ResourceRef's field list
 *    after its schema tag; A2 each identity field moves identityKey, the alias and the locator never do; A3 Pi's real
 *    ObservationProjection keeps one node through an alias rename and a locator move, its identity-keyed state (key, definition
 *    digest, version, evidence refs) unchanged (an alias- or locator-keyed ref splits it); A4 the shipped rf reader
 *    (reactivefiberTopology) keys one envelope read under two locators identically and writes neither locator into a key-bearing
 *    field; A5 no rf-scope src file (inRfScope) keys an rf resource by a locator-named expression: an rf-tagged template
 *    interpolation, a key-like property, a Map or Set key or a "+" join to a quoted rf tag (SRC_FLOOR, RF_SCOPE_FLOOR,
 *    RF_TEMPLATE_FLOOR and the anchor make an emptied or misdirected walk red).
 *  B, acceptance (b). B1 the sameWorkspace pair differs in backend_instance_id alone and shares its alias, locator and raw
 *    revision; B2 identityKey separates it, every key in OTHER_KEYS merges it; B3 Pi's real projection holds it as two nodes in
 *    every identity-bearing index (the node index and a ref query, the version index, the evidence index), where the raw counter
 *    and a workspace-only evidence ref merge it (the kind, status, invocation and basis indexes group by attribute by design and
 *    carry no identity); B4 neither of the projection's orderings (the capture clock and a stated sequence) is shared across the
 *    pair (a workspace-keyed ref shares both).
 *  C, acceptance (c). C1 the property: over PROPERTY_CASES seeded pairs compareRevisions returns the typed non-comparable result
 *    for every cross-origin and cross-epoch pair (the raw-counter and epoch-blind comparators fail it); C2 streamRevision never
 *    merges two distinct stream points over the same pairs or two planted ones, while a concatenated key and a separator-joined
 *    key (opaque revisions may carry the separator) each merge a planted pair; C3 Pi's real projection admits a new epoch's
 *    lower revision under the reference rule and refuses it as out-of-order when the counter rides as a sequence; C4 the
 *    projection's own key is a tuple, never a concatenation; C5 no rf-scope src file joins a revision-named operand to another,
 *    by adjacent interpolations or by "+" (A5's floors and anchor).
 *  MA and MC, the matchers rows A5 and C5 read: MA1-MA8 and MC1-MC6 the spellings each must catch; QA1, QA2, QS1 and QC1-QC4 the
 *    pinned quiet rows of their named residuals.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id,
 * label and pins, every pin's witness, IDENTITY_FIELDS and GATING_ARTIFACTS - is held to the out-of-file roster
 * test/fixtures/rf-federated-identity-roster.json, whose producer excerpts are held to the pin by hash. A pin deleted,
 * relabelled, swapped for another passing case, or removed from every literal here at once still reds against the roster.
 * RESIDUALS (named, each with a pinned quiet row): R-INDIRECT a locator under a neutral name (QA1); R-CALL-BUILT an rf ref built
 * by a call such as Array.join (QA2); R-OUTSIDE-SCOPE a key built in a src file outside inRfScope is never scanned (QS1);
 * R-CALL-JOIN counters joined by a call, Array.join (QC1) or String.prototype.concat (QC4); R-SYNONYM a counter under a name
 * outside REVISION_WORDS (QC2); R-PROSE two interpolations separated by whitespace read as display text, not a key (QC3).
 * SCOPE: the excerpts are producer facts at 6a251bf73af5; Pi vendors no rf source, so a producer-side change is seen only when an
 * rf pin-bump re-reads them. The live legs are A4 (the shipped rf reader), A3, B3, B4, C3 and C4 (Pi's real projection) and A5
 * and C5 (the src tree); A2, B2, C1 and C2 hold the reference rule itself.
 *
 * Display paths added: none. Test-only: nothing is spawned or written; src and this roster are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  type NativeRef,
  type NativeSnapshot,
  type ObservationEvent,
  ObservationProjection,
  type ObservationScope,
} from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-federated-identity-roster.json");

/** sha256 of each vendored producer line at the pin, newline-terminated: `git show <pin>:<path> | sed -n '<n>p' | sha256sum`. */
const EXCERPT_SHA256: Readonly<Record<string, string>> = {
  "docs/programs/federated-workspaces-2026-10-18/03-protocol-and-storage.md:5": "a4e66608a5bd831bc5874d89d4b125cc6eeb52631cbb927047fc916bcb7cecaf",
  "docs/programs/federated-workspaces-2026-10-18/03-protocol-and-storage.md:50": "6220ea4778ec41a06a16b248add42957b38365c57c9fc8dba979670a563a84eb",
  "docs/programs/federated-workspaces-2026-10-18/01-requirements-decisions.md:37": "e0c069677edbe4696b2746e7fdaa3b009df529684940abd9f99ae818041a6737",
};
/** The identity of an imported record: ResourceRef's fields after its schema tag (03:5), the identity D03 names (01:37). */
const IDENTITY_FIELDS = ["workspace_id", "backend_instance_id", "resource_kind", "resource_id", "definition_digest"] as const;
type IdentityField = (typeof IDENTITY_FIELDS)[number];
/** FW-02 and FW-04, which ship ResourceRef and ObservationRef (bead notes). */
const GATING_ARTIFACTS: readonly string[] = ["rfc-0txnl.2", "rfc-0txnl.10"];

const SCOPE: ObservationScope = { workspace: "/workspace/pi", principal: "local-operator:tester" };
const IMPORT_TYPE = "federated-import";
const IMPORT_KIND = "reactivefiber.federated-import.snapshot";
const STAMPS = ["2026-10-22T06:00:00Z", "2026-10-22T06:00:01Z", "2026-10-22T06:00:02Z"] as const;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) Pi identity/cache keys for imported records use (W,I,kind,id,digest); an alias rename leaves identity-keyed state untouched; no code path keys a resource by locator path",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) same-W-different-I fixtures never collide in any Pi index nor share a revision ordering",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) property test: comparators over observations from distinct (W,I) or epochs return typed non-comparable or refuse; no sort/merge key concatenates revision counters across origins",
    pins: ["C1", "C2", "C3", "C4", "C5"],
  },
  {
    id: "MA",
    label: "row A5's locator matcher catches every locator-named rf ref interpolation, key-like property, Map key and rf-tag join, and its named residuals stay pinned quiet",
    pins: ["MA1", "MA2", "MA3", "MA4", "MA5", "MA6", "MA7", "MA8", "QA1", "QA2", "QS1"],
  },
  {
    id: "MC",
    label: "row C5's revision-join matcher catches every revision-named interpolation pair and plus-join, and its named residuals stay pinned quiet",
    pins: ["MC1", "MC2", "MC3", "MC4", "MC5", "MC6", "QC1", "QC2", "QC3", "QC4"],
  },
];

/** One imported record: the A-side alias and locator it is read under (federation-link/v1, 03:10), its ResourceRef identity and
 * the ObservationRef stream fields of the observation. */
interface ImportedRecord {
  readonly alias: string;
  readonly locator: string;
  readonly resource: Readonly<Record<IdentityField, string>>;
  readonly observation: { readonly source_epoch: string; readonly source_revision: string };
}
interface Excerpt {
  readonly at: string;
  readonly line: string;
}
interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly excerpts: readonly Excerpt[];
  readonly identityFields: readonly string[];
  readonly gatingArtifacts: readonly string[];
  readonly sameWorkspace: readonly ImportedRecord[];
  readonly aliasRename: readonly ImportedRecord[];
  readonly epochs: readonly ImportedRecord[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function importedRecords(value: unknown, field: string): ImportedRecord[] {
  if (!Array.isArray(value)) throw new Error(`roster ${field} must be a list`);
  return value.map((entry: unknown, index: number): ImportedRecord => {
    const at = `${field}[${index}]`;
    if (!isObject(entry) || !isObject(entry.resource) || !isObject(entry.observation)) throw new Error(`roster ${at} needs a resource and an observation`);
    const { resource, observation } = entry;
    return {
      alias: text(entry.alias, `${at}.alias`),
      locator: text(entry.locator, `${at}.locator`),
      resource: {
        workspace_id: text(resource.workspace_id, `${at}.resource.workspace_id`),
        backend_instance_id: text(resource.backend_instance_id, `${at}.resource.backend_instance_id`),
        resource_kind: text(resource.resource_kind, `${at}.resource.resource_kind`),
        resource_id: text(resource.resource_id, `${at}.resource.resource_id`),
        definition_digest: text(resource.definition_digest, `${at}.resource.definition_digest`),
      },
      observation: {
        source_epoch: text(observation.source_epoch, `${at}.observation.source_epoch`),
        source_revision: text(observation.source_revision, `${at}.observation.source_revision`),
      },
    };
  });
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.excerpts) || !isObject(raw.records)) {
    throw new Error("roster must be an object with rows, excerpts and records");
  }
  const excerpts = raw.excerpts.map((entry: unknown, index: number): Excerpt => {
    if (!isObject(entry)) throw new Error(`roster excerpts[${index}] must be an object`);
    return { at: text(entry.at, `excerpts[${index}].at`), line: text(entry.line, `excerpts[${index}].line`) };
  });
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: JSON.parse(JSON.stringify(pin.witness)) as Json };
    });
    return { id: row.id, label: row.label, pins };
  });
  const { records } = raw;
  return {
    excerpts,
    identityFields: strings(raw.identityFields, "identityFields"),
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    sameWorkspace: importedRecords(records.sameWorkspace, "records.sameWorkspace"),
    aliasRename: importedRecords(records.aliasRename, "records.aliasRename"),
    epochs: importedRecords(records.epochs, "records.epochs"),
    rows,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function excerpt(suffix: string): string {
  const found = ROSTER.excerpts.find(entry => entry.at.endsWith(suffix));
  if (found === undefined) throw new Error(`the roster vendors no ${suffix}`);
  return found.line;
}
const sha256 = (value: string): string => createHash("sha256").update(value).digest("hex");

// The reference rule.
type Key = (record: ImportedRecord) => string;
const identityKey: Key = record => JSON.stringify(IDENTITY_FIELDS.map(field => record.resource[field]));
const identityRef = (record: ImportedRecord): NativeRef => ({ provider: "reactivefiber", type: IMPORT_TYPE, id: identityKey(record) });
/** One observation's place in its stream: the origin (W, I), the epoch and the opaque revision. */
interface StreamPoint {
  readonly workspace_id: string;
  readonly backend_instance_id: string;
  readonly source_epoch: string;
  readonly source_revision: string;
}
const pointOf = (record: ImportedRecord): StreamPoint => ({
  workspace_id: record.resource.workspace_id,
  backend_instance_id: record.resource.backend_instance_id,
  source_epoch: record.observation.source_epoch,
  source_revision: record.observation.source_revision,
});
const streamKey = (point: StreamPoint): string =>
  JSON.stringify([point.workspace_id, point.backend_instance_id, point.source_epoch, point.source_revision]);
const streamRevision = (record: ImportedRecord): string => streamKey(pointOf(record));
/** The record's authority as an evidence ref: (workspace_id, backend_instance_id) as a JSON tuple, never the workspace alone. */
const authorityRef = (record: ImportedRecord): string =>
  `rf-authority:${JSON.stringify([record.resource.workspace_id, record.resource.backend_instance_id])}`;
type Comparison =
  | { readonly comparable: true; readonly sameRevision: boolean }
  | { readonly comparable: false; readonly reason: "distinct-origin" | "distinct-epoch" };
type Comparator = (a: StreamPoint, b: StreamPoint) => Comparison;
/** The typed comparator: a revision is opaque per owner/stream, so two points compare only inside one (W, I, epoch) stream. */
const compareRevisions: Comparator = (a, b) => {
  if (a.workspace_id !== b.workspace_id || a.backend_instance_id !== b.backend_instance_id) return { comparable: false, reason: "distinct-origin" };
  if (a.source_epoch !== b.source_epoch) return { comparable: false, reason: "distinct-epoch" };
  return { comparable: true, sameRevision: a.source_revision === b.source_revision };
};

function snapshotOf(
  record: ImportedRecord,
  capturedAt: string,
  source: NativeRef = identityRef(record),
  revision: string = streamRevision(record),
  evidence: string = authorityRef(record),
): NativeSnapshot {
  return {
    source,
    scope: { ...SCOPE },
    capturedAt,
    observedAt: capturedAt,
    node: { title: `rf import ${record.alias}`, type: "sdk-operation", statusText: "observed", statusTone: "success" },
    kind: IMPORT_KIND,
    definitionDigest: record.resource.definition_digest,
    sourceRevision: revision,
    evidenceRefs: [evidence],
  };
}
function eventOf(record: ImportedRecord, sequence: number, source: NativeRef): ObservationEvent {
  return {
    projectionEventId: `import-${record.resource.backend_instance_id}-${sequence}`,
    source,
    scope: { ...SCOPE },
    sourceSequence: sequence,
    observedAt: STAMPS[0],
    kind: "reactivefiber.federated-import.event",
  };
}
const nodesOf = (projection: ObservationProjection) => projection.query({ scope: SCOPE, limit: 20, kind: IMPORT_KIND }).nodes;
const identities = (records: readonly ImportedRecord[], key: Key): number => new Set(records.map(key)).size;
/** B2's keys, each short of the identity or beside it: every one must merge the sameWorkspace pair. */
const OTHER_KEYS: Readonly<Record<string, Key>> = {
  workspaceOnly: record => JSON.stringify([record.resource.workspace_id]),
  withoutInstance: record => JSON.stringify(IDENTITY_FIELDS.filter(field => field !== "backend_instance_id").map(field => record.resource[field])),
  alias: record => record.alias,
  locator: record => record.locator,
};
const workspaceRef = (record: ImportedRecord): NativeRef => ({ provider: "reactivefiber", type: IMPORT_TYPE, id: OTHER_KEYS.workspaceOnly?.(record) ?? "" });

// The seeded property generator (mulberry32): small pools, so every class and every naive collision is reached.
const PROPERTY_SEED = 20261022;
const PROPERTY_CASES = 600;
const WORKSPACE_POOL = [`rfw_peer${"a".repeat(22)}`, `rfw_alpha${"e".repeat(21)}`];
const INSTANCE_POOL = [`rfi_one${"b".repeat(23)}`, `rfi_two${"c".repeat(23)}`, `rfi_three${"g".repeat(21)}`];
const EPOCH_POOL = ["1", "12"];
const REVISION_POOL = ["3", "7", "23"];
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let mixed = state;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}
function propertyPairs(): [StreamPoint, StreamPoint][] {
  const random = mulberry32(PROPERTY_SEED);
  const pick = (pool: readonly string[]): string => pool[Math.floor(random() * pool.length)] ?? "";
  const point = (): StreamPoint => ({
    workspace_id: pick(WORKSPACE_POOL),
    backend_instance_id: pick(INSTANCE_POOL),
    source_epoch: pick(EPOCH_POOL),
    source_revision: pick(REVISION_POOL),
  });
  return Array.from({ length: PROPERTY_CASES }, (): [StreamPoint, StreamPoint] => [point(), point()]);
}
type PairClass = "distinct-origin" | "distinct-epoch" | "same-stream";
/** The class of a pair read from string keys, independently of any comparator's field tests. */
function classOf(a: StreamPoint, b: StreamPoint): PairClass {
  const origin = (point: StreamPoint): string => JSON.stringify([point.workspace_id, point.backend_instance_id]);
  if (origin(a) !== origin(b)) return "distinct-origin";
  return a.source_epoch === b.source_epoch ? "same-stream" : "distinct-epoch";
}
function violations(comparator: Comparator, pairs: readonly [StreamPoint, StreamPoint][]): number {
  return pairs.filter(([a, b]) => {
    const expected = classOf(a, b);
    const got = comparator(a, b);
    if (expected === "same-stream") return !got.comparable || got.sameRevision !== (a.source_revision === b.source_revision);
    return got.comparable || got.reason !== expected;
  }).length;
}
/** C1's failing comparators: one orders the raw counters of any two points, one checks the origin and forgets the epoch. */
const rawCounter: Comparator = (a, b) => ({ comparable: true, sameRevision: a.source_revision === b.source_revision });
const epochBlind: Comparator = (a, b) =>
  a.workspace_id !== b.workspace_id || a.backend_instance_id !== b.backend_instance_id
    ? { comparable: false, reason: "distinct-origin" }
    : { comparable: true, sameRevision: a.source_revision === b.source_revision };
const concatenatedKey = (point: StreamPoint): string =>
  `${point.workspace_id}${point.backend_instance_id}${point.source_epoch}${point.source_revision}`;
/** The same parts joined by a separator: opaque epochs and revisions may carry it, so it merges distinct points too. */
const separatedKey = (point: StreamPoint): string =>
  [point.workspace_id, point.backend_instance_id, point.source_epoch, point.source_revision].join(":");
/** Two stream points differ when any of their four fields does, read field by field and never through a key under test. */
const distinctPoints = (a: StreamPoint, b: StreamPoint): boolean =>
  a.workspace_id !== b.workspace_id || a.backend_instance_id !== b.backend_instance_id || a.source_epoch !== b.source_epoch || a.source_revision !== b.source_revision;
/** Pairs of distinct stream points one key merges. */
function collisions(key: (point: StreamPoint) => string, pairs: readonly [StreamPoint, StreamPoint][]): number {
  return pairs.filter(([a, b]) => distinctPoints(a, b) && key(a) === key(b)).length;
}

// The src scans (rows A5 and C5) and their matchers.
const SRC = join(REPO, "src");
/** Floors below the counts measured at base 0b2a80f (src 115 files; rf scope 2 files; 8 rf-tagged templates), so an emptied or
 * misdirected walk reds and an additive change does not. */
const SRC_FLOOR = 100;
const RF_SCOPE_FLOOR = 2;
const RF_TEMPLATE_FLOOR = 6;
const ANCHOR_FILE = join(SRC, "workbench", "reactivefiber-observer.ts");
const ANCHOR_TOKEN = "context-preview";
/** The rf adapter files: a src script whose name names the rf provider or federation, or carries an "rf" name token. */
const RF_NAME = /reactivefiber|federat/;
const SCRIPT = /\.[cm]?[jt]s$/;
function inRfScope(path: string): boolean {
  const name = basename(path);
  if (!SCRIPT.test(name)) return false;
  const stem = name.replace(SCRIPT, "");
  return RF_NAME.test(stem) || stem.split(/[-_.]/).includes("rf");
}
const OPEN = "$" + "{";
const TICK = "`";
const interpolate = (expression: string): string => `${OPEN}${expression}}`;
const LOCATOR_WORDS: ReadonlySet<string> = new Set([
  "root", "roots", "path", "paths", "pathname", "filepath", "filename", "file", "files", "dir", "dirs", "dirname", "workdir", "cwd", "locator", "locators",
  "loc", "alias", "aliases", "location", "folder", "mount", "mountpoint", "url", "uri", "href", "endpoint", "address", "addr", "hostname", "socket", "realpath",
]);
const REVISION_WORDS: ReadonlySet<string> = new Set(["revision", "revisions", "rev", "sequence", "seq", "epoch", "cursor", "counter"]);
/** An expression's identifier words, camelCase and snake_case split, lowercased. */
const words = (expression: string): string[] =>
  expression.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase().split(/[^a-z0-9]+/).filter(word => word.length > 0);
const namesLocator = (expression: string): boolean => words(expression).some(word => LOCATOR_WORDS.has(word));
const namesRevision = (expression: string): boolean => words(expression).some(word => REVISION_WORDS.has(word));
interface Interpolation {
  readonly start: number;
  readonly end: number;
  readonly expression: string;
}
/** The interpolation opening at `start`, braces balanced. */
function interpolationAt(source: string, start: number): Interpolation {
  let depth = 1;
  let end = start + OPEN.length;
  while (end < source.length && depth > 0) {
    const unit = source.charAt(end);
    if (unit === "{") depth++;
    else if (unit === "}") depth--;
    end++;
  }
  return { start, end, expression: source.slice(start + OPEN.length, end - 1) };
}
function interpolations(source: string): Interpolation[] {
  const found: Interpolation[] = [];
  for (let at = source.indexOf(OPEN); at !== -1; ) {
    const next = interpolationAt(source, at);
    found.push(next);
    at = source.indexOf(OPEN, next.end);
  }
  return found;
}
const RF_TAG = /`rf-[a-z0-9-]+:/g;
/** Each rf-tagged template literal's interpolated expressions, up to its closing backtick. */
function rfTemplates(source: string): string[][] {
  return [...source.matchAll(RF_TAG)].map(match => {
    const expressions: string[] = [];
    let at = (match.index ?? 0) + 1;
    while (at < source.length && source.charAt(at) !== TICK) {
      if (source.startsWith(OPEN, at)) {
        const next = interpolationAt(source, at);
        expressions.push(next.expression);
        at = next.end;
      } else at++;
    }
    return expressions;
  });
}
/** A key-like property: id, scope, key, ref, identity or any camelCase name ending Id, Key or Ref. */
const KEY_PROPERTY = /\b(?:id|scope|key|ref|identity|[a-z][A-Za-z0-9]*(?:Id|Key|Ref))\s*:\s*([^,;}\n]*)/g;
/** A Map or Set key: the first argument of set, get, has or delete. */
const MAP_KEY = /\.(?:set|get|has|delete)\(\s*([^,)\n]+)/g;
/** An rf-tagged ref built by "+": a quoted rf tag and the operand appended to it. */
const RF_TAG_PLUS = /(['"])rf-[a-z0-9-]+:[^'"\n]*\1\s*\+\s*([^;,)\n]+)/g;
/** Row A5's matcher: every locator-named expression an rf-tagged template interpolates, a key-like property reads, a Map or Set
 * is keyed by, or a quoted rf tag is joined to with "+". */
function locatorHits(source: string): string[] {
  const templated = rfTemplates(source).flatMap(expressions => expressions.filter(namesLocator)).map(expression => `template ${expression.trim()}`);
  const read = (pattern: RegExp, group: number, form: string): string[] =>
    [...source.matchAll(pattern)].map(match => match[group] ?? "").filter(namesLocator).map(expression => `${form} ${expression.trim()}`);
  return [...templated, ...read(KEY_PROPERTY, 1, "key"), ...read(MAP_KEY, 1, "map"), ...read(RF_TAG_PLUS, 2, "plus")];
}
/** Two operands joined by "+", directly or around one quoted separator: identifiers or member chains only, so arithmetic on a
 * literal never reads as a join. */
const PLUS_JOIN = /([A-Za-z_$][\w$]*(?:\??\.[A-Za-z_$][\w$]*)*)\s*\+\s*(?:(?:'[^'\n]*'|"[^"\n]*")\s*\+\s*)?([A-Za-z_$][\w$]*(?:\??\.[A-Za-z_$][\w$]*)*)/g;
/** Row C5's matcher: two interpolations a short, whitespace-free gap joins, or two operands joined by "+", at least one of them
 * revision-named. */
function revisionJoinHits(source: string): string[] {
  const found = interpolations(source);
  const templated = found.slice(1).flatMap((next, index) => {
    const previous = found[index];
    if (previous === undefined || !/^[^`\s]{0,8}$/.test(source.slice(previous.end, next.start))) return [];
    return namesRevision(previous.expression) || namesRevision(next.expression) ? [`${previous.expression.trim()} | ${next.expression.trim()}`] : [];
  });
  const joined = [...source.matchAll(PLUS_JOIN)]
    .filter(match => namesRevision(match[1] ?? "") || namesRevision(match[2] ?? ""))
    .map(match => `${match[1] ?? ""} + ${match[2] ?? ""}`);
  return [...templated, ...joined];
}

/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing tracked. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
interface ScopeScan {
  readonly witness: { [key: string]: Json };
  readonly scoped: readonly string[];
}
function scanRfScope(matcher: (source: string) => string[], spelled: string): ScopeScan {
  const files = filesBelow(SRC);
  const scoped = files.filter(inRfScope);
  const floorMet = files.length >= SRC_FLOOR;
  const scopedFloorMet = scoped.length >= RF_SCOPE_FLOOR;
  const anchorRead = scoped.includes(ANCHOR_FILE) && textOf(ANCHOR_FILE).includes(ANCHOR_TOKEN);
  const hits = scoped.flatMap(file => matcher(textOf(file)).map(hit => `${relative(REPO, file)}: ${hit}`));
  expect(floorMet, `src: ${files.length} files walked, floor ${SRC_FLOOR}`).toBe(true);
  expect(scopedFloorMet, `rf scope: ${scoped.length} files, floor ${RF_SCOPE_FLOOR}`).toBe(true);
  expect(anchorRead, `the anchor ${relative(REPO, ANCHOR_FILE)} was not read with ${ANCHOR_TOKEN}`).toBe(true);
  expect(hits, `rf-scope src ${spelled}`).toEqual([]);
  return { witness: { floorMet, scopedFloorMet, anchorRead, hits }, scoped };
}

const RF_HOST: ReactiveFiberTopologyContext = {
  scope: { ...SCOPE },
  seam: "rf-cli",
  capturedAt: "2026-10-22T06:00:00Z",
  observedAt: "2026-10-22T06:00:01Z",
};
/** Two locators one rf workspace is read under; the Pi scope is a third path, so neither is the consumer's own. */
const LOCATORS = ["/srv/rf/alpha", "/mnt/peer/rf-alpha"] as const;
/** The key-bearing fields of a snapshot: its source ref, evidence refs, revisions and payload reference. */
const keyBearing = (snapshot: NativeSnapshot): Json => ({
  source: { provider: snapshot.source.provider, type: snapshot.source.type, id: snapshot.source.id, scope: snapshot.source.scope ?? null },
  evidenceRefs: [...(snapshot.evidenceRefs ?? [])],
  sourceRevision: snapshot.sourceRevision ?? null,
  sourceVersion: snapshot.sourceVersion ?? null,
  nativePayloadRef: snapshot.nativePayloadRef ?? null,
});

interface Spelling {
  readonly pin: string;
  readonly matcher: (source: string) => string[];
  readonly source: string;
  readonly hit: boolean;
}
/** MA1-MA8 and MC1-MC6 must hit. Quiet rows: QA1 R-INDIRECT, QA2 R-CALL-BUILT, QC1 and QC4 R-CALL-JOIN, QC2 R-SYNONYM, QC3
 * R-PROSE. */
const SPELLINGS: readonly Spelling[] = [
  { pin: "MA1", matcher: locatorHits, source: `${TICK}rf-workspace:${interpolate("workspace.root")}${TICK}`, hit: true },
  { pin: "MA2", matcher: locatorHits, source: `${TICK}rf-link:${interpolate("link.locator")}${TICK}`, hit: true },
  { pin: "MA3", matcher: locatorHits, source: `${TICK}rf-resource:${interpolate("entry.alias")}${TICK}`, hit: true },
  { pin: "MA4", matcher: locatorHits, source: "const ref = { provider: 'reactivefiber', id: link.path, type: 'federated-import' };", hit: true },
  { pin: "MA5", matcher: locatorHits, source: "const ref = { provider: 'reactivefiber', scope: authorizedRfRoot };", hit: true },
  { pin: "MA6", matcher: locatorHits, source: "const ref = 'rf-workspace:' + workspace.root;", hit: true },
  { pin: "MA7", matcher: locatorHits, source: "imports.set(link.locator, record);", hit: true },
  { pin: "MA8", matcher: locatorHits, source: "const entry = { cacheKey: link.href, record };", hit: true },
  { pin: "QA1", matcher: locatorHits, source: `${TICK}rf-workspace:${interpolate("where")}${TICK}`, hit: false },
  { pin: "QA2", matcher: locatorHits, source: 'const ref = ["rf-workspace", workspace.root].join(":");', hit: false },
  { pin: "MC1", matcher: revisionJoinHits, source: `${TICK}${interpolate("epoch")}${interpolate("revision")}${TICK}`, hit: true },
  { pin: "MC2", matcher: revisionJoinHits, source: `${TICK}${interpolate("ref.source_epoch")}:${interpolate("ref.source_revision")}${TICK}`, hit: true },
  { pin: "MC3", matcher: revisionJoinHits, source: `${TICK}${interpolate("stream")}/${interpolate("sequence")}${TICK}`, hit: true },
  { pin: "MC4", matcher: revisionJoinHits, source: `${TICK}${interpolate("cursor")}-${interpolate("seq")}${TICK}`, hit: true },
  { pin: "MC5", matcher: revisionJoinHits, source: 'const key = epoch + ":" + revision;', hit: true },
  { pin: "MC6", matcher: revisionJoinHits, source: "const key = ref.source_epoch + ref.source_revision;", hit: true },
  { pin: "QC1", matcher: revisionJoinHits, source: 'const key = [epoch, revision].join(":");', hit: false },
  { pin: "QC2", matcher: revisionJoinHits, source: `${TICK}${interpolate("gen")}:${interpolate("n")}${TICK}`, hit: false },
  { pin: "QC3", matcher: revisionJoinHits, source: `${TICK}${interpolate("epoch")} ${interpolate("revision")}${TICK}`, hit: false },
  { pin: "QC4", matcher: revisionJoinHits, source: 'const key = String(epoch).concat(":", revision);', hit: false },
];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const hashes = ROSTER.excerpts.map(entry => ({ at: entry.at, sha256: sha256(`${entry.line}\n`) }));
    expect(hashes, "the vendored excerpts are not the producer lines at the pin").toStrictEqual(
      Object.entries(EXCERPT_SHA256).map(([at, digest]) => ({ at, sha256: digest })),
    );
    const resourceRef = /ResourceRef = \{([^}]*)\}/.exec(excerpt("03-protocol-and-storage.md:5"))?.[1]?.split(",") ?? [];
    expect(resourceRef[0], "ResourceRef opens with its schema tag").toBe("schema");
    expect(resourceRef.slice(1), "IDENTITY_FIELDS against ResourceRef after its schema tag").toStrictEqual([...IDENTITY_FIELDS]);
    const stream = /ObservationRef adds ([a-z_]+), ([a-z_]+),/.exec(excerpt("03-protocol-and-storage.md:5"))?.slice(1) ?? [];
    expect(stream).toStrictEqual(["source_revision", "source_epoch"]);
    const decision = excerpt("01-requirements-decisions.md:37");
    const named = ["(workspace_id, backend_instance_id)", "resource kind/id", "definition digest", "Friendly aliases are local, mutable names."];
    expect(named.filter(phrase => !decision.includes(phrase)), "D03 phrases missing from 01:37").toEqual([]);
    return { excerpts: hashes.length, resourceRef, identityFields: [...IDENTITY_FIELDS], stream, d03Phrases: named.length };
  },
  A2: () => {
    const [base] = ROSTER.aliasRename;
    if (base === undefined) throw new Error("the roster holds no aliasRename record");
    const moved = IDENTITY_FIELDS.filter(field => identityKey({ ...base, resource: { ...base.resource, [field]: `${base.resource[field]}x` } }) !== identityKey(base));
    const aliasMoves = identityKey({ ...base, alias: `${base.alias}-renamed` }) !== identityKey(base);
    const locatorMoves = identityKey({ ...base, locator: `/moved${base.locator}` }) !== identityKey(base);
    expect(moved, "an identity field that does not move identityKey").toStrictEqual([...IDENTITY_FIELDS]);
    expect({ aliasMoves, locatorMoves }).toStrictEqual({ aliasMoves: false, locatorMoves: false });
    return { moved, aliasMoves, locatorMoves };
  },
  A3: () => {
    const project = (ref: (record: ImportedRecord) => NativeRef): { outcomes: string[]; nodes: number; state: Json[] } => {
      const projection = new ObservationProjection();
      const state: Json[] = [];
      const outcomes = ROSTER.aliasRename.map((record, index) => {
        const outcome = projection.refresh(snapshotOf(record, STAMPS[index] ?? STAMPS[0], ref(record)));
        const node = nodesOf(projection).find(entry => entry.nativeRef.id === ref(record).id);
        state.push(
          node === undefined
            ? null
            : { key: node.key, definitionDigest: node.definitionDigest ?? null, sourceVersion: node.sourceVersion ?? null, evidenceRefs: [...node.evidenceRefs] },
        );
        return outcome;
      });
      return { outcomes, nodes: nodesOf(projection).length, state };
    };
    const reference = project(identityRef);
    const aliasKeyed = project(record => ({ ...identityRef(record), id: record.alias }));
    const locatorKeyed = project(record => ({ ...identityRef(record), id: record.locator }));
    expect(reference.outcomes).toStrictEqual(["applied", "applied", "applied"]);
    expect(reference.nodes, "an alias rename or a locator move split the identity-keyed node").toBe(1);
    const stateUnchanged = reference.state.length === ROSTER.aliasRename.length && new Set(reference.state.map(entry => JSON.stringify(entry))).size === 1;
    expect(stateUnchanged, "the identity-keyed state moved").toBe(true);
    expect([aliasKeyed.nodes, locatorKeyed.nodes], "an alias- or locator-keyed ref kept one node").toStrictEqual([2, 2]);
    return { outcomes: reference.outcomes, nodes: reference.nodes, stateUnchanged, aliasKeyedNodes: aliasKeyed.nodes, locatorKeyedNodes: locatorKeyed.nodes };
  },
  A4: () => {
    const snapshots = LOCATORS.map(root => {
      const topology = reactivefiberTopology(
        { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: root, source: fullShapeRf(root) },
        { ...RF_HOST, authorizedRfRoot: root },
      );
      const [snapshot] = topology.snapshots;
      if (snapshot === undefined) throw new Error(`no snapshot read under ${root}`);
      return snapshot;
    });
    const keys = snapshots.map(keyBearing);
    const leaked = LOCATORS.filter((root, index) => JSON.stringify(keys[index]).includes(root));
    const projection = new ObservationProjection();
    const outcomes = snapshots.map(snapshot => projection.refresh(snapshot));
    const sameKeys = keys.length === LOCATORS.length && JSON.stringify(keys[0]) === JSON.stringify(keys[1]);
    expect(keys[0], "one envelope read under two locators keyed differently").toStrictEqual(keys[1]);
    expect(leaked, "a locator written into a key-bearing field").toEqual([]);
    expect(projection.stats().nodes).toBe(1);
    const evidenceTags = (snapshots[0]?.evidenceRefs ?? []).map(ref => ref.slice(0, ref.indexOf(":")));
    return { sameKeys, leaked, outcomes, nodes: projection.stats().nodes, evidenceTags };
  },
  A5: () => {
    const { witness, scoped } = scanRfScope(locatorHits, "locator-named rf key expressions");
    const templates = scoped.reduce((total, file) => total + rfTemplates(textOf(file)).length, 0);
    const templateFloorMet = templates >= RF_TEMPLATE_FLOOR;
    expect(templateFloorMet, `rf scope: ${templates} rf-tagged templates, floor ${RF_TEMPLATE_FLOOR}`).toBe(true);
    return { ...witness, templateFloorMet };
  },
  B1: () => {
    const pair = ROSTER.sameWorkspace;
    const differing = IDENTITY_FIELDS.filter(field => new Set(pair.map(record => record.resource[field])).size > 1);
    const shared = (read: (record: ImportedRecord) => string): boolean => new Set(pair.map(read)).size === 1;
    const witness = {
      records: pair.length,
      differing,
      sharedAlias: shared(record => record.alias),
      sharedLocator: shared(record => record.locator),
      sharedRawRevision: shared(record => `${record.observation.source_epoch}/${record.observation.source_revision}`),
    };
    expect(witness).toStrictEqual({ records: 2, differing: ["backend_instance_id"], sharedAlias: true, sharedLocator: true, sharedRawRevision: true });
    return witness;
  },
  B2: () => {
    const pair = ROSTER.sameWorkspace;
    const others = Object.fromEntries(Object.entries(OTHER_KEYS).map(([name, key]) => [name, identities(pair, key)]));
    expect(identities(pair, identityKey), "identityKey merges two authorities of one workspace").toBe(2);
    expect(Object.entries(others).filter(([, count]) => count !== 1).map(([name]) => name), "a key short of the identity separates the pair").toEqual([]);
    return { identity: identities(pair, identityKey), others };
  },
  B3: () => {
    const pair = ROSTER.sameWorkspace;
    const reference = new ObservationProjection();
    const outcomes = pair.map(record => reference.refresh(snapshotOf(record, STAMPS[0])));
    const perRef = pair.map(record => reference.query({ scope: SCOPE, limit: 20, ref: identityRef(record) }).nodes.map(node => node.nativeRef.id === identityKey(record)));
    const perVersion = pair.map(record => reference.query({ scope: SCOPE, limit: 20, version: streamRevision(record) }).nodes.length);
    const perEvidence = pair.map(record => reference.query({ scope: SCOPE, limit: 20, evidence: authorityRef(record) }).nodes.length);
    const workspaceEvidence = (record: ImportedRecord): string => `rf-workspace:${record.resource.workspace_id}`;
    const raw = new ObservationProjection();
    for (const record of pair) raw.refresh(snapshotOf(record, STAMPS[0], identityRef(record), record.observation.source_revision, workspaceEvidence(record)));
    const [first] = pair;
    const rawBucket = raw.query({ scope: SCOPE, limit: 20, version: first?.observation.source_revision ?? "" }).nodes.length;
    const workspaceBucket = first === undefined ? 0 : raw.query({ scope: SCOPE, limit: 20, evidence: workspaceEvidence(first) }).nodes.length;
    expect(outcomes).toStrictEqual(["applied", "applied"]);
    expect(nodesOf(reference), "two authorities of one workspace share a node").toHaveLength(2);
    expect(perRef, "a ref query does not return exactly its own record").toStrictEqual([[true], [true]]);
    expect(perVersion, "the version index merges two streams").toStrictEqual([1, 1]);
    expect(perEvidence, "the evidence index merges two authorities").toStrictEqual([1, 1]);
    expect([rawBucket, workspaceBucket], "the raw counter or the workspace-only ref did not merge the pair").toStrictEqual([2, 2]);
    return { outcomes, nodes: nodesOf(reference).length, perRef, perVersion, perEvidence, rawCounterBucket: rawBucket, workspaceEvidenceBucket: workspaceBucket };
  },
  B4: () => {
    const [one, two] = ROSTER.sameWorkspace;
    if (one === undefined || two === undefined) throw new Error("the roster holds no sameWorkspace pair");
    const capture = (ref: (record: ImportedRecord) => NativeRef): string[] => {
      const projection = new ObservationProjection();
      return [projection.refresh(snapshotOf(one, STAMPS[1], ref(one))), projection.refresh(snapshotOf(two, STAMPS[0], ref(two)))];
    };
    const sequence = (ref: (record: ImportedRecord) => NativeRef): string[] => {
      const projection = new ObservationProjection();
      return [projection.ingest(eventOf(one, 9, ref(one))), projection.ingest(eventOf(two, 3, ref(two)))];
    };
    const witness = { captureOrder: capture(identityRef), sequenceOrder: sequence(identityRef), workspaceKeyedCapture: capture(workspaceRef), workspaceKeyedSequence: sequence(workspaceRef) };
    expect(witness, "an ordering shared across two authorities").toStrictEqual({
      captureOrder: ["applied", "applied"],
      sequenceOrder: ["applied", "applied"],
      workspaceKeyedCapture: ["applied", "out-of-order"],
      workspaceKeyedSequence: ["applied", "out-of-order"],
    });
    return witness;
  },
  C1: () => {
    const pairs = propertyPairs();
    const classes: Record<PairClass, number> = { "distinct-origin": 0, "distinct-epoch": 0, "same-stream": 0 };
    for (const [a, b] of pairs) classes[classOf(a, b)]++;
    const witness = { cases: pairs.length, classes, reference: violations(compareRevisions, pairs), rawCounter: violations(rawCounter, pairs), epochBlind: violations(epochBlind, pairs) };
    expect(Object.values(classes).every(count => count >= 25), "the generator under-reached a class").toBe(true);
    expect(witness.reference, "compareRevisions compared across an origin or an epoch").toBe(0);
    expect(witness.rawCounter, "the raw-counter comparator held the property").toBe(classes["distinct-origin"] + classes["distinct-epoch"]);
    expect(witness.epochBlind, "the epoch-blind comparator held the property").toBe(classes["distinct-epoch"]);
    return witness;
  },
  C2: () => {
    const pairs = propertyPairs();
    const planted: [StreamPoint, StreamPoint] = [
      { workspace_id: WORKSPACE_POOL[0] ?? "", backend_instance_id: INSTANCE_POOL[0] ?? "", source_epoch: "1", source_revision: "23" },
      { workspace_id: WORKSPACE_POOL[0] ?? "", backend_instance_id: INSTANCE_POOL[0] ?? "", source_epoch: "12", source_revision: "3" },
    ];
    const opaque: [StreamPoint, StreamPoint] = [
      { ...planted[0], source_epoch: "1", source_revision: "2:3" },
      { ...planted[0], source_epoch: "1:2", source_revision: "3" },
    ];
    const witness = {
      reference: collisions(streamKey, pairs),
      concatenated: collisions(concatenatedKey, pairs),
      plantedReference: collisions(streamKey, [planted, opaque]),
      plantedConcatenated: collisions(concatenatedKey, [planted]),
      plantedSeparated: collisions(separatedKey, [opaque]),
    };
    expect([witness.reference, witness.plantedReference], "streamRevision merged two distinct stream points").toStrictEqual([0, 0]);
    expect(witness.concatenated > 0 && witness.plantedConcatenated === 1, "the concatenated key never merged a pair").toBe(true);
    expect(witness.plantedSeparated, "the separator-joined key kept two opaque points apart").toBe(1);
    return witness;
  },
  C3: () => {
    const [first, second] = ROSTER.epochs;
    if (first === undefined || second === undefined) throw new Error("the roster holds no epochs pair");
    const reference = new ObservationProjection();
    const outcomes = [reference.refresh(snapshotOf(first, STAMPS[0])), reference.refresh(snapshotOf(second, STAMPS[1]))];
    const version = nodesOf(reference)[0]?.sourceVersion ?? null;
    const counterFed = new ObservationProjection();
    const counterOutcomes = [
      counterFed.refresh({ ...snapshotOf(first, STAMPS[0]), sequence: first.observation.source_revision }),
      counterFed.refresh({ ...snapshotOf(second, STAMPS[1]), sequence: second.observation.source_revision }),
    ];
    const comparison = compareRevisions(pointOf(first), pointOf(second));
    expect(outcomes, "a new epoch's revision was ordered against the old epoch's").toStrictEqual(["applied", "applied"]);
    expect(version).toBe(streamRevision(second));
    expect(counterOutcomes, "a counter riding as a sequence was not ordered across the epochs").toStrictEqual(["applied", "out-of-order"]);
    expect(comparison).toStrictEqual({ comparable: false, reason: "distinct-epoch" });
    return { outcomes, version, counterAsSequence: counterOutcomes, comparison };
  },
  C4: () => {
    const [record] = ROSTER.epochs;
    if (record === undefined) throw new Error("the roster holds no epochs record");
    const projection = new ObservationProjection();
    /** Two refs whose parts join to one string under a ":" concatenation: the type/id boundary moves, the joined text does not. */
    const refs: NativeRef[] = [
      { provider: "reactivefiber", type: `${IMPORT_TYPE}:1`, id: "23" },
      { provider: "reactivefiber", type: IMPORT_TYPE, id: "1:23" },
    ];
    const outcomes = refs.map(ref => projection.refresh(snapshotOf(record, STAMPS[0], ref)));
    const keys = nodesOf(projection).map(node => node.key);
    expect(outcomes).toStrictEqual(["applied", "applied"]);
    expect(new Set(keys).size, "the projection's key concatenates its parts").toBe(2);
    return { outcomes, nodes: keys.length, tupleKeys: keys.every(key => Array.isArray(JSON.parse(key))) };
  },
  C5: () => scanRfScope(revisionJoinHits, "revision-named interpolations joined into one key").witness,
  QS1: () => {
    const outside = "src/index.ts";
    const source = `${TICK}rf-workspace:${interpolate("workspace.root")}${TICK}`;
    const witness = {
      scannedOutside: inRfScope(outside),
      matcherWouldHit: locatorHits(source).length > 0,
      scannedNamed: inRfScope("src/workbench/federation-import.ts"),
      scannedRfToken: inRfScope("src/workbench/import-rf.ts"),
    };
    expect(witness).toStrictEqual({ scannedOutside: false, matcherWouldHit: true, scannedNamed: true, scannedRfToken: true });
    return witness;
  },
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      () => {
        const hit = spelling.matcher(spelling.source).length > 0;
        expect(hit).toBe(spelling.hit);
        return { digest: sha256(spelling.source).slice(0, 16), hit };
      },
    ]),
  ),
};

describe("wb-o4h0.2 federated identity census (RF-FEDERATED-WORKSPACES-R3, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:4", "C:5", "MA:11", "MC:10"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ identityFields: [...IDENTITY_FIELDS], gatingArtifacts: [...GATING_ARTIFACTS] }).toStrictEqual({
      identityFields: [...ROSTER.identityFields],
      gatingArtifacts: [...ROSTER.gatingArtifacts],
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});
