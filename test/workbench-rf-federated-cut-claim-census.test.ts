/**
 * wb-a9l2.5 (RF-HARNESS2-FEDERATED-PEER-R5), the prohibition that pins today. Statement (bead title): "No Pi surface shall
 * label an rf federated snapshot or cut as <CLAIM-A>, or a <CLAIM-B> notification as current, absent rf's own witness; a
 * notification cursor gap renders as resync-required, never as <CLAIM-B> (notification surface gated on RFCLI-H2-04 / fw-b
 * FW-13 rfc-0txnl.12 / cfrr FW-CFRR-02c rfc-bak67.4, unshipped; the prohibition pins today)."
 * (harness2-federated-peer-2026-10-20/README.md:25@6a251bf73af5).
 *
 * The guarded claim phrases: <CLAIM-A> joins the words 'causally' and 'closed' (and the noun form, 'causal' and 'closure'),
 * <CLAIM-B> joins 'latest' and 'accepted' (the producer's notification-state constant included) and <CLAIM-C> joins
 * 'globally' and 'current'. This file never spells one: CLAIMS composes each from its words at runtime and every label
 * writes the placeholder, so row A's whole-tree scan holds over this file and its roster too (residual R-COMPOSED).
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read-only git show by the cutting seat): README.md:25 "Only after pinned
 * cut is correct, support <CLAIM-B> snapshot+cursor notifications with gap/epoch/restart/dropped event recovery. Do not claim
 * <CLAIM-A> cuts absent witness."; README.md:45 "Notification cursor gap => requires owner resync; cannot assume <CLAIM-B>.";
 * src/reactive_fiber_cli/domain/federation_boundary.py:9-10 "A stream cursor counts all owner events. A resource revision
 * counts changes to one exported resource. They must never be equated."; :61-67 OwnerStreamCursor(epoch, stream_id,
 * position); :85-87 OwnerBoundary carries resource_revision beside its cursor; :173-192 record_notification folds a
 * same-epoch position into the watermark with max() (:191), the shared gap BEADS-2026-10-21.md:36 names. Unshipped at the
 * pin: a git grep of resync-required, of the <CLAIM-B> constant and of <CLAIM-A> over the producer's src and tests is empty
 * (rc 1 each), and federation_boundary.py states no gap or delivered-fence field. Gating artifacts: RFCLI-H2-04 (README.md:36),
 * fw-b FW-13 rfc-0txnl.12 ("gap/epoch -> RESYNC_REQUIRED", federated-workspaces-2026-10-18/BEADS-2026-10-21.md:53) and cfrr
 * FW-CFRR-02c rfc-bak67.4 ("notify 1 then 3: state.delivered_fence == 1, state.notified_position == 3, state.gap is True;
 * notify 1, 2, 3: state.gap is False.", certified-federated-reactive-refinement-2026-10-18/BEADS-2026-10-21.md:21).
 * Pi at base 0b2a80f: no file outside .beads/ spells a guarded phrase, and no src module spells a word of either vocabulary.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1-A5 read every file of src, test, docs, qa and the front matter (the root *.md files and examples/)
 *    as UTF-8 for CLAIMS (each root has a floor on the files walked and one anchor file whose anchor token must be read, so
 *    an emptied or misdirected walk reds); A6 no registered native descriptor's JSON spells one (the served half).
 *    <CLAIM-C> rides from the duplicate merged onto this bead, RF-FEDERATED-WORKSPACES-R2 (D12 "never call exported latest
 *    <CLAIM-C>").
 *  B, acceptance (b). The fixture is the roster's notification streams (test/fixtures/rf-federated-cut-claim-roster.json):
 *    gapped is rfc-bak67.4's "notify 1 then 3" at one epoch and stream, contiguous its "notify 1, 2, 3", and accepted one
 *    owner boundary at the fence. B1 the fixture oracle: gapped is same-epoch with a hole (delivered fence 1 below notified
 *    position 3, so resync-required) and contiguous is not, while the pinned producer's max() watermark reads 3 for both,
 *    which is why a watermark never reads as <CLAIM-B>. B2 Pi's one rf reader, the reactivefiber.render.preview provider,
 *    carries a stand-in rf's envelope with the fixture byte for byte: no position inserted, no label minted, no value
 *    added. B3 the reader adapter projects none of it: its topology equals the one of the same envelope without the
 *    fixture, and no topology string carries a guarded phrase, a resync word or a fixture value. B4 the armed half: every
 *    src module that spells NOTIFICATION_WORDS must be bound in NOTIFICATION_READERS, and every bound reader must render
 *    gapped with a resync-required word and never a guarded phrase or the accepted value. No module spells one and the
 *    table is empty, so the real reading is empty; three synthetic readers exercise the checker.
 *  C, acceptance (c). C1 the provider carries accepted's resource_revision and cursor as two fields, verbatim; C2 the reader
 *    adapter takes neither as its sourceRevision or sourceVersion (those stay the graph and bundle digests) and its
 *    topology equals the one without the fixture; C3 every src module that spells CURSOR_WORDS must be bound in
 *    CURSOR_PROJECTIONS, and every bound projection must echo the fixture's resource revision and cursor position, never
 *    one in place of the other. Empty today; three synthetic projections exercise the checker.
 *  M, the matcher row A reads: M1-M11 the spellings CLAIMS must catch; Q1-Q5 the pinned quiet rows of the residuals.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id,
 * label and pins, every pin's witness, both vocabularies and the producer acceptance positions - is held to the out-of-file
 * roster, whose fixture is held back to PRODUCER_ACCEPTANCE here. A pin deleted, relabelled, swapped for another passing
 * case, or removed from every literal here at once still reds against the roster, and every pin's witness is measured by
 * its own case. Not claimed: an edit of this file and the roster together.
 * RESIDUALS (named, each with a pinned quiet row): R-INTERRUPTED a phrase split by a character outside the separator class,
 * a zero-width code point (Q1) or a homoglyph letter (Q2), is not caught; R-COMPOSED a phrase assembled at runtime, this
 * file's own mechanism, is invisible to any text scan (Q3); R-PARAPHRASE a reworded claim (a cut closed under causality,
 * the newest accepted value) is not caught (Q4); R-SCOPE a spelling outside the scanned roots is not read: the bead-store
 * export .beads/ spells the phrases (the owner filings quote the producer) and no scanned root reads it (Q5); new-feedback/,
 * vendor/, media/ and the other dot-directories are outside every root the same way.
 * SCOPE: the phrase guard does not judge negation: any spelling reds, a sentence stating the prohibition included. Both
 * vocabularies and the fixture shapes are producer facts at 6a251bf73af5; Pi vendors no rf schema, so a producer-side
 * change is seen only when an rf pin-bump re-reads them. The armed half (render resync-required) waits for the gating
 * artifacts: no reader is added or faked here, and a reader's cut binds itself in the table it needs.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; the scanned roots are only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { nativeReactiveFiberRender, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf, type Json, RF_FIXTURE_GRAPH_REVISION } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-federated-cut-claim-roster.json");
const ROOT = process.cwd();

/** The words the guarded phrases are composed from; no line of this file joins two of them. */
const WORDS = {
  causally: "causally", causal: "causal", closed: "closed", closure: "closure",
  latest: "latest", accepted: "accepted", globally: "globally", global: "global", current: "current",
} as const;
/** The separator class every matcher allows between two words: any run of whitespace, "_", "." or "-". */
const SEP = "[\\s_.-]*";

interface Claim {
  readonly placeholder: string;
  readonly pattern: RegExp;
}
/** Row A's matchers, one per guarded phrase, each case-insensitive and joined by SEP. */
const CLAIMS: readonly Claim[] = [
  { placeholder: "<CLAIM-A>", pattern: new RegExp(`${WORDS.causal}(?:ly)?${SEP}clos(?:ed|ure)`, "i") },
  { placeholder: "<CLAIM-B>", pattern: new RegExp(`${WORDS.latest}${SEP}${WORDS.accepted}`, "i") },
  { placeholder: "<CLAIM-C>", pattern: new RegExp(`${WORDS.global}(?:ly)?${SEP}${WORDS.current}`, "i") },
];
const claimHit = (text: string): boolean => CLAIMS.some(claim => claim.pattern.test(text));

/** The notification-reader vocabulary (rf's watermark fold and the gating artifacts' gap state), no src module spells it today. */
const NOTIFICATION_WORDS = ["resync", "watermark", "notified position", "record notification", "delivered fence"];
/** The boundary vocabulary a cursor/revision projection reads (federation_boundary.py:62 and :86). */
const CURSOR_WORDS = ["resource revision", "stream cursor"];
const vocabulary = (words: readonly string[]): RegExp => new RegExp(words.map(word => word.split(" ").join(SEP)).join("|"), "i");
const NOTIFICATION_VOCABULARY = vocabulary(NOTIFICATION_WORDS);
const CURSOR_VOCABULARY = vocabulary(CURSOR_WORDS);
/** The positions of rfc-bak67.4's acceptance text ("notify 1 then 3" / "notify 1, 2, 3"); the roster's fixture is held to them. */
const PRODUCER_ACCEPTANCE = { gapped: [1, 3], contiguous: [1, 2, 3] };
const RESYNC_REQUIRED = new RegExp(`resync${SEP}required`, "i");
const PREVIEW_ID = "reactivefiber.render.preview";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a guard pins 0 Pi strings asserting <CLAIM-A> or <CLAIM-B> for rf federation data",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6"],
  },
  {
    id: "B",
    label: "(b) a fixture notification stream with a position gap at the same epoch renders resync-required in Pi's (future) reader, never <CLAIM-B> or a fresh value",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) no Pi projection equates a stream cursor position with a resource revision (two fields, echoed separately)",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "M",
    label: "row A's matchers catch every separator and case spelling of the guarded phrases, and their named residuals stay pinned quiet",
    pins: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "Q1", "Q2", "Q3", "Q4", "Q5"],
  },
];

interface Notification {
  readonly epoch: string;
  readonly stream_id: string;
  readonly position: number;
}
interface Cursor {
  readonly epoch: string;
  readonly stream_id: string;
  readonly position: number;
}
interface Boundary {
  readonly resource_revision: string;
  readonly cursor: Cursor;
  readonly publication_state: string;
  readonly value: string;
}
interface Fixture {
  readonly gapped: readonly Notification[];
  readonly contiguous: readonly Notification[];
  readonly accepted: Boundary;
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
  readonly notificationWords: readonly string[];
  readonly cursorWords: readonly string[];
  readonly producerAcceptance: { readonly gapped: readonly number[]; readonly contiguous: readonly number[] };
  readonly fixture: Fixture;
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function positions(value: unknown, field: string): number[] {
  if (!Array.isArray(value) || !value.every(item => Number.isSafeInteger(item) && item >= 0)) throw new Error(`roster ${field} must be a list of positions`);
  return value;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`roster ${field} must be a non-empty string`);
  return value;
}
function cursorOf(value: unknown, field: string): Cursor {
  if (!isObject(value) || Object.keys(value).length !== 3) throw new Error(`roster ${field} must be an epoch, stream_id and position`);
  const [position] = positions([value.position], `${field}.position`);
  return { epoch: text(value.epoch, `${field}.epoch`), stream_id: text(value.stream_id, `${field}.stream_id`), position: position ?? 0 };
}
function stream(value: unknown, field: string): Notification[] {
  if (!Array.isArray(value) || value.length === 0) throw new Error(`roster ${field} must be a non-empty notification list`);
  return value.map((item: unknown, index: number) => cursorOf(item, `${field}[${index}]`));
}
function boundaryOf(value: unknown): Boundary {
  if (!isObject(value) || Object.keys(value).length !== 4) throw new Error("roster fixture.accepted must hold exactly four fields");
  return {
    resource_revision: text(value.resource_revision, "fixture.accepted.resource_revision"),
    cursor: cursorOf(value.cursor, "fixture.accepted.cursor"),
    publication_state: text(value.publication_state, "fixture.accepted.publication_state"),
    value: text(value.value, "fixture.accepted.value"),
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.fixture) || !isObject(raw.producerAcceptance)) {
    throw new Error("roster must be an object with rows, a fixture and the producer acceptance positions");
  }
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
  const fixture = raw.fixture;
  return {
    notificationWords: strings(raw.notificationWords, "notificationWords"),
    cursorWords: strings(raw.cursorWords, "cursorWords"),
    producerAcceptance: {
      gapped: positions(raw.producerAcceptance.gapped, "producerAcceptance.gapped"),
      contiguous: positions(raw.producerAcceptance.contiguous, "producerAcceptance.contiguous"),
    },
    fixture: { gapped: stream(fixture.gapped, "fixture.gapped"), contiguous: stream(fixture.contiguous, "fixture.contiguous"), accepted: boundaryOf(fixture.accepted) },
    rows,
  };
}

const ROSTER = readRoster();
const FIXTURE = ROSTER.fixture;
/** The fixture's string values; none may reach a topology string or a bound reader's rendering of a gap. */
const FIXTURE_VALUES = [FIXTURE.accepted.cursor.epoch, FIXTURE.accepted.cursor.stream_id, FIXTURE.accepted.resource_revision, FIXTURE.accepted.value];

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
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
/** The repository's front matter: the regular *.md files at the root, then every file below examples/. */
function frontMatter(): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(REPO, { withFileTypes: true });
  } catch {
    entries = [];
  }
  const markdown = entries.filter(entry => entry.isFile() && entry.name.endsWith(".md")).map(entry => join(REPO, entry.name));
  return [...markdown, ...filesBelow(join(REPO, "examples"))];
}

interface ScanRoot {
  readonly pin: string;
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
  readonly files: () => string[];
}

/** The roots row A reads; each floor sits below the count measured at base 0b2a80f (src 115, test 453, docs 66, qa 67 files;
 * front matter 5 root *.md files and 7 under examples/), so an emptied walk reds and an additive change does not. */
const SCAN_ROOTS: readonly ScanRoot[] = [
  { pin: "A1", root: "src", floor: 100, anchorFile: "src/workflow/reconcile.ts", anchorToken: "RECONCILE_EVIDENCE_READS", files: () => filesBelow(join(REPO, "src")) },
  { pin: "A2", root: "test", floor: 400, anchorFile: "test/helpers/rf-render-fixture.ts", anchorToken: "RF_FIXTURE_RELEASE", files: () => filesBelow(join(REPO, "test")) },
  { pin: "A3", root: "docs", floor: 50, anchorFile: "docs/workbench/13-contracts-and-config.md", anchorToken: PREVIEW_ID, files: () => filesBelow(join(REPO, "docs")) },
  { pin: "A4", root: "qa", floor: 50, anchorFile: "qa/workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts", files: () => filesBelow(join(REPO, "qa")) },
  { pin: "A5", root: "front matter (root *.md, examples/)", floor: 10, anchorFile: "README.md", anchorToken: "@tintinweb/pi-subagents", files: frontMatter },
];

function scanRoot(scan: ScanRoot): Json {
  const files = scan.files();
  const floorMet = files.length >= scan.floor;
  const hits = files.filter(file => claimHit(textOf(file))).map(file => relative(REPO, file));
  const anchor = join(REPO, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  expect(floorMet, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  expect(hits, `files spelling a guarded phrase under ${scan.root}`).toEqual([]);
  return { root: scan.root, floor: scan.floor, anchorFile: scan.anchorFile, anchorToken: scan.anchorToken, floorMet, anchorRead, hits };
}

let nativeCatalog: Promise<{ ids: string[]; texts: string[] }> | undefined;
/** The native registration's descriptors, loaded once: the ids and each descriptor's JSON text. */
function nativeDescriptors(): Promise<{ ids: string[]; texts: string[] }> {
  nativeCatalog ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    return { ids: descriptors.map(descriptor => descriptor.id), texts: descriptors.map(descriptor => JSON.stringify(descriptor)) };
  });
  return nativeCatalog;
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `envelope` and exits 0. */
function standInRf(envelope: Json): string {
  const folder = makeScratch("rf-federated-cut-claim-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(JSON.stringify(${JSON.stringify(envelope)}));\nprocess.exit(0);\n`,
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): number {
  return textOf(log).trim().split("\n").filter(Boolean).length;
}
function objectOf(value: Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
function leaves(value: unknown): unknown[] {
  if (Array.isArray(value)) return value.flatMap(leaves);
  if (isObject(value)) return Object.values(value).flatMap(leaves);
  return [value];
}

/** The fixture as an additive result key: no shipped rf schema carries a notification stream, so the key is constructed (the
 * provider admits additive result keys), and it holds the gapped stream and the accepted boundary as rf's records spell them. */
const FEDERATION_KEY = "federation";
function fixtureJson(): JsonObject {
  return JSON.parse(JSON.stringify({ notifications: FIXTURE.gapped, accepted: FIXTURE.accepted })) as JsonObject;
}
function renderWithFixture(): JsonObject {
  const envelope = fullShapeRf(ROOT);
  return { ...envelope, result: { ...objectOf(envelope.result, "fullShapeRf result"), [FEDERATION_KEY]: fixtureJson() } };
}
const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z",
};
function topologyOf(source: JsonObject): ReturnType<typeof reactivefiberTopology> {
  const reading: JsonValue = { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source };
  return reactivefiberTopology(reading, OBSERVER_CONTEXT);
}
async function readingWithFixture(): Promise<{ envelope: JsonObject; reading: JsonObject; spawns: number }> {
  const envelope = renderWithFixture();
  const log = standInRf(envelope);
  const reading = objectOf((await nativeReactiveFiberRender({ model: "m", task: "t" }, ROOT)) as Json, "reading");
  // Every field verbatim, and nothing inside the envelope that the stand-in did not print.
  expect(reading).toStrictEqual({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: envelope });
  return { envelope, reading, spawns: spawnsOf(log) };
}
function federationOf(reading: JsonObject): JsonObject {
  return objectOf(objectOf(objectOf(reading.source, "reading source").result, "reading result")[FEDERATION_KEY], "reading federation");
}

interface Fold {
  readonly sameEpoch: boolean;
  readonly sameStream: boolean;
  readonly deliveredFence: number;
  readonly notifiedPosition: number;
  readonly gap: boolean;
  readonly verdict: string;
}
/** The fixture oracle, spelled as rfc-bak67.4's acceptance text: the delivered fence advances only through contiguous positions,
 * the notified position is the highest seen, and a hole between them is the gap that requires an owner resync. */
function fold(notifications: readonly Notification[]): Fold {
  const first = notifications[0];
  let deliveredFence = 0;
  let notifiedPosition = 0;
  for (const notification of notifications) {
    if (notification.position === deliveredFence + 1 && notifiedPosition === deliveredFence) deliveredFence = notification.position;
    notifiedPosition = Math.max(notifiedPosition, notification.position);
  }
  const gap = notifiedPosition > deliveredFence;
  return {
    sameEpoch: notifications.every(notification => notification.epoch === first?.epoch),
    sameStream: notifications.every(notification => notification.stream_id === first?.stream_id),
    deliveredFence, notifiedPosition, gap, verdict: gap ? "resync-required" : "contiguous",
  };
}
/** The pinned producer's own fold (federation_boundary.py:191, notified_position=max(previous.notified_position, position)). */
function producerWatermark(notifications: readonly Notification[]): number {
  return notifications.reduce((watermark, notification) => Math.max(watermark, notification.position), 0);
}

/** A src module bound to the strings its reader surfaces for the fixture. */
interface NotificationReaderBinding {
  readonly module: string;
  readonly render: (fixture: Fixture) => readonly string[];
}
/** Every src module that reads an rf federation notification stream. Empty until a gating artifact ships: a reader's cut adds
 * its module here, so the checker below runs against it. */
const NOTIFICATION_READERS: readonly NotificationReaderBinding[] = [];
/** What a reader's rendering of the gapped fixture violates: a same-epoch gap renders resync-required, never a guarded phrase,
 * and no value is shown while the stream reads resync-required (the strict reading of 'never a fresh value'). */
function readerViolations(render: (fixture: Fixture) => readonly string[]): string[] {
  const shown = render(FIXTURE);
  const violations: string[] = [];
  if (!shown.some(line => RESYNC_REQUIRED.test(line))) violations.push("no resync-required word for a same-epoch gap");
  for (const claim of CLAIMS) if (shown.some(line => claim.pattern.test(line))) violations.push(`spells ${claim.placeholder}`);
  if (shown.some(line => line.includes(FIXTURE.accepted.value))) violations.push("carries the accepted value while resync is required");
  return violations;
}

/** A src module bound to what its projection of the accepted boundary holds. */
interface CursorProjectionBinding {
  readonly module: string;
  readonly project: (boundary: Boundary) => Json;
}
/** Every src module that projects an rf federation boundary's cursor or revision. Empty until a gating artifact ships. */
const CURSOR_PROJECTIONS: readonly CursorProjectionBinding[] = [];
/** What a projection of the accepted boundary violates: the resource revision and the cursor position each reach it verbatim,
 * neither in place of the other. */
function projectionViolations(project: (boundary: Boundary) => Json): string[] {
  const held = leaves(project(FIXTURE.accepted));
  const violations: string[] = [];
  if (!held.includes(FIXTURE.accepted.resource_revision)) violations.push("the resource revision is not echoed verbatim");
  if (!held.includes(FIXTURE.accepted.cursor.position)) violations.push("the cursor position is not echoed verbatim");
  return violations;
}

/** The src modules a vocabulary finds, the bindings it needs and the bindings no module explains. */
function vocabularyCensus(pattern: RegExp, bound: readonly string[]): { srcFloorMet: boolean; sites: string[]; unbound: string[]; stale: string[] } {
  const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
  const sites = files.filter(file => pattern.test(textOf(file))).map(file => relative(REPO, file));
  return { srcFloorMet: files.length >= 100, sites, unbound: sites.filter(site => !bound.includes(site)), stale: bound.filter(module => !sites.includes(module)) };
}

const caps = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
interface Spelling {
  readonly pin: string;
  readonly text: string;
  readonly hit: boolean;
}
/** M1-M11 must hit; Q1 and Q2 are R-INTERRUPTED, Q3 is R-COMPOSED (the source text of this file's own composition), Q4 is
 * R-PARAPHRASE. */
const SPELLINGS: readonly Spelling[] = [
  { pin: "M1", text: `${WORDS.causally} ${WORDS.closed}`, hit: true },
  { pin: "M2", text: `${WORDS.causally}-${WORDS.closed}`, hit: true },
  { pin: "M3", text: `${WORDS.causally}_${WORDS.closed}`.toUpperCase(), hit: true },
  { pin: "M4", text: `${WORDS.causally}${caps(WORDS.closed)}`, hit: true },
  { pin: "M5", text: `a ${WORDS.causal} ${WORDS.closure} witness`, hit: true },
  { pin: "M6", text: `${WORDS.latest} ${WORDS.accepted}`, hit: true },
  { pin: "M7", text: `${WORDS.latest}_${WORDS.accepted}`.toUpperCase(), hit: true },
  { pin: "M8", text: `${WORDS.latest}${caps(WORDS.accepted)}`, hit: true },
  { pin: "M9", text: `${WORDS.latest}\n${WORDS.accepted}`, hit: true },
  { pin: "M10", text: `${WORDS.globally} ${WORDS.current}`, hit: true },
  { pin: "M11", text: `${WORDS.global}.${WORDS.current}`, hit: true },
  { pin: "Q1", text: `${WORDS.causally}${String.fromCodePoint(0x200b)} ${WORDS.closed}`, hit: false },
  { pin: "Q2", text: `${WORDS.latest} ${WORDS.accepted.replace("e", String.fromCodePoint(0x0435))}`, hit: false },
  { pin: "Q3", text: '[WORDS.latest, WORDS.accepted].join(" ")', hit: false },
  { pin: "Q4", text: "a cut closed under causality, the newest accepted value", hit: false },
];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  ...Object.fromEntries(SCAN_ROOTS.map(scan => [scan.pin, async () => scanRoot(scan)])),
  A6: async () => {
    const { ids, texts } = await nativeDescriptors();
    const hits = ids.filter((_, index) => claimHit(texts[index] ?? ""));
    const descriptorFloorMet = ids.length >= 4;
    expect(descriptorFloorMet, `native descriptors: ${ids.join(", ")}`).toBe(true);
    expect(hits).toEqual([]);
    return { rfIds: ids.filter(id => id.startsWith("reactivefiber.")), descriptorFloorMet, hits };
  },
  B1: async () => {
    expect(FIXTURE.gapped.map(notification => notification.position)).toEqual(PRODUCER_ACCEPTANCE.gapped);
    expect(FIXTURE.contiguous.map(notification => notification.position)).toEqual(PRODUCER_ACCEPTANCE.contiguous);
    const gapped = fold(FIXTURE.gapped);
    const contiguous = fold(FIXTURE.contiguous);
    expect(gapped).toMatchObject({ sameEpoch: true, sameStream: true, gap: true, verdict: "resync-required" });
    expect(contiguous).toMatchObject({ sameEpoch: true, sameStream: true, gap: false });
    const accepted = FIXTURE.accepted.cursor;
    const first = FIXTURE.gapped[0];
    const acceptedAtFence = accepted.position === gapped.deliveredFence && accepted.epoch === first?.epoch && accepted.stream_id === first?.stream_id;
    expect(acceptedAtFence).toBe(true);
    const watermark = { gapped: producerWatermark(FIXTURE.gapped), contiguous: producerWatermark(FIXTURE.contiguous) };
    // The producer's max() watermark cannot tell the two streams apart: the shared gap of BEADS-2026-10-21.md:36.
    expect(watermark.gapped).toBe(watermark.contiguous);
    return { gapped: { ...gapped }, contiguous: { ...contiguous }, producerWatermark: watermark, acceptedAtFence };
  },
  B2: async () => {
    const { reading, spawns } = await readingWithFixture();
    const federation = federationOf(reading);
    expect(federation.notifications).toStrictEqual(JSON.parse(JSON.stringify(FIXTURE.gapped)) as Json);
    const notifications = Array.isArray(federation.notifications) ? federation.notifications : [];
    expect(spawns).toBe(1);
    return {
      contract: String(reading.contract), readingKeys: Object.keys(reading).sort(),
      notificationKeys: [...new Set(notifications.flatMap(item => Object.keys(objectOf(item, "notification"))))].sort(),
      positions: notifications.map(item => objectOf(item, "notification").position ?? null), spawns,
    };
  },
  B3: async () => {
    const withFixture = topologyOf(renderWithFixture());
    const equalsWithout = isDeepStrictEqual(withFixture, topologyOf(fullShapeRf(ROOT)));
    const shown = stringLeaves(withFixture);
    const stringsRead = shown.length >= 5;
    const surfaced = shown.filter(line => claimHit(line) || /resync/i.test(line) || FIXTURE_VALUES.some(value => line.includes(value)));
    expect(equalsWithout).toBe(true);
    expect(stringsRead, `topology strings: ${shown.length}`).toBe(true);
    expect(surfaced).toEqual([]);
    return { snapshots: withFixture.snapshots.length, equalsWithout, stringsRead, surfaced };
  },
  B4: async () => {
    const census = vocabularyCensus(NOTIFICATION_VOCABULARY, NOTIFICATION_READERS.map(binding => binding.module));
    const bound = NOTIFICATION_READERS.map(binding => ({ module: binding.module, violations: readerViolations(binding.render) }));
    expect(census.srcFloorMet).toBe(true);
    expect(census.unbound, "a src module reading a notification stream must be bound in NOTIFICATION_READERS").toEqual([]);
    expect(census.stale).toEqual([]);
    expect(bound.filter(binding => binding.violations.length > 0)).toEqual([]);
    const synthetic = {
      compliant: readerViolations(fixture => [`resync-required: notification gap at epoch ${fixture.accepted.cursor.epoch}`]),
      watermark: readerViolations(fixture => [`${WORDS.latest} ${WORDS.accepted} at position ${producerWatermark(fixture.gapped)}`]),
      freshValue: readerViolations(fixture => ["resync-required", fixture.accepted.value]),
    };
    const controls = {
      snake: NOTIFICATION_VOCABULARY.test('const key = "notified_position";'),
      camel: NOTIFICATION_VOCABULARY.test("state.deliveredFence += 1;"),
      bareWord: NOTIFICATION_VOCABULARY.test('pi.events.emit("notification:shown", { cursor: 0, epoch: 1 });'),
    };
    return { srcFloorMet: census.srcFloorMet, sites: census.sites, bound, stale: census.stale, synthetic, controls };
  },
  C1: async () => {
    const { reading, spawns } = await readingWithFixture();
    const boundary = objectOf(federationOf(reading).accepted, "reading federation.accepted");
    expect(boundary.resource_revision).toBe(FIXTURE.accepted.resource_revision);
    expect(boundary.cursor).toStrictEqual({ ...FIXTURE.accepted.cursor });
    expect(spawns).toBe(1);
    return { boundaryKeys: Object.keys(boundary).sort(), revision: boundary.resource_revision ?? null, cursor: boundary.cursor ?? null, spawns };
  },
  C2: async () => {
    const withFixture = topologyOf(renderWithFixture());
    const snapshot = withFixture.snapshots[0];
    const bundle = objectOf(fullShapeRf(ROOT).result, "fullShapeRf result").bundle_revision_id;
    const fields = [snapshot?.sourceRevision, snapshot?.sourceVersion];
    const witness = {
      sourceRevisionIsGraph: snapshot?.sourceRevision === RF_FIXTURE_GRAPH_REVISION,
      sourceVersionIsBundle: snapshot?.sourceVersion === bundle,
      takesRevision: fields.includes(FIXTURE.accepted.resource_revision),
      takesPosition: fields.includes(String(FIXTURE.accepted.cursor.position)),
      equalsWithout: isDeepStrictEqual(withFixture, topologyOf(fullShapeRf(ROOT))),
    };
    expect(witness).toStrictEqual({ sourceRevisionIsGraph: true, sourceVersionIsBundle: true, takesRevision: false, takesPosition: false, equalsWithout: true });
    return witness;
  },
  C3: async () => {
    const census = vocabularyCensus(CURSOR_VOCABULARY, CURSOR_PROJECTIONS.map(binding => binding.module));
    const bound = CURSOR_PROJECTIONS.map(binding => ({ module: binding.module, violations: projectionViolations(binding.project) }));
    expect(census.srcFloorMet).toBe(true);
    expect(census.unbound, "a src module projecting a boundary cursor or revision must be bound in CURSOR_PROJECTIONS").toEqual([]);
    expect(census.stale).toEqual([]);
    expect(bound.filter(binding => binding.violations.length > 0)).toEqual([]);
    const synthetic = {
      separate: projectionViolations(boundary => ({ revision: boundary.resource_revision, cursor: { ...boundary.cursor } })),
      revisionFromPosition: projectionViolations(boundary => ({ revision: `${boundary.cursor.position}`, cursor: { ...boundary.cursor } })),
      positionFromRevision: projectionViolations(boundary => ({ revision: boundary.resource_revision, position: boundary.resource_revision })),
    };
    const controls = {
      snake: CURSOR_VOCABULARY.test("row.resource_revision"),
      camel: CURSOR_VOCABULARY.test("new OwnerStreamCursor()"),
      bareWords: CURSOR_VOCABULARY.test('const cursorRow = 0; const revision = "r";'),
    };
    return { srcFloorMet: census.srcFloorMet, sites: census.sites, bound, stale: census.stale, synthetic, controls };
  },
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      async () => {
        const hit = claimHit(spelling.text);
        expect(hit).toBe(spelling.hit);
        return { digest: createHash("sha256").update(spelling.text).digest("hex").slice(0, 16), hit };
      },
    ]),
  ),
  Q5: async () => {
    const spells = filesBelow(join(REPO, ".beads")).some(file => claimHit(textOf(file)));
    const outside = SCAN_ROOTS.every(scan => !scan.files().some(file => relative(REPO, file).startsWith(".beads")));
    expect(spells, "the bead-store export no longer spells a guarded phrase: re-read R-SCOPE").toBe(true);
    expect(outside).toBe(true);
    return { spells, outside };
  },
};

describe("wb-a9l2.5 federated cut claim census (RF-HARNESS2-FEDERATED-PEER-R5, prohibition leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:6", "B:4", "C:3", "M:16"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ notificationWords: NOTIFICATION_WORDS, cursorWords: CURSOR_WORDS, producerAcceptance: PRODUCER_ACCEPTANCE }).toStrictEqual({
      notificationWords: [...ROSTER.notificationWords], cursorWords: [...ROSTER.cursorWords],
      producerAcceptance: { gapped: [...ROSTER.producerAcceptance.gapped], contiguous: [...ROSTER.producerAcceptance.contiguous] },
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});
