/**
 * wb-a9l2.3 (RF-HARNESS2-FEDERATED-PEER-R3), the absent-today leg. Statement (bead notes; the refuted descriptor is written as
 * the placeholder): "If Pi ever surfaces an rf federation owner descriptor or multi-owner resources, it shall echo rf's seven
 * OwnerResource fields verbatim and in rf's order, never synthesize, rename or alias them to a FiberOptics <FO_DESCRIPTOR>
 * descriptor (h2fp-C020 REFUTED), and never alias rows sharing a local alias but differing in backend_instance_id (NEG-01);
 * consumer surface gated on fw-b rfc-0txnl.17/.25 + FW-06 ADR rfc-0txnl.3 (unshipped; dataclass ships at
 * federation_boundary.py:38-45)." (harness2-federated-peer-2026-10-20/BEADS-2026-10-21.md:30@6a251bf73af5). Acceptance,
 * quoted: "(a) a hermetic fixture pins the seven field names and order against federation_boundary.py:39-45 (rename/drop/add
 * fails); (b) 0 Pi strings label an rf federation row as a FiberOptics <FO_DESCRIPTOR> descriptor; (c) fixture rows with equal
 * local alias and distinct backend_instance_id project as two identities (NEG-01), a key on alias alone fails; (d) until the
 * surface ships, 0 hits for backend_instance_id in Pi src."
 *
 * <FO_DESCRIPTOR> is the three-word descriptor h2fp-C020 claimed and the program refuted. This file never spells it:
 * DESCRIPTOR_FAMILY composes its matcher from WORD_OWNER, WORD_INSTANCE and WORD_SCHEMA at runtime and every label writes the
 * placeholder, so row B's whole-tree scan holds over this file and its roster too (residual R-COMPOSED names what that costs).
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af57c3a703caf6892dfe3015e06a481, read-only git show by the cutting seat):
 * src/reactive_fiber_cli/domain/federation_boundary.py declares `class OwnerResource:` at :38, under
 * `@dataclass(frozen=True, slots=True, kw_only=True)` at :37, and its seven fields at :39-45, each a `str`: workspace_id,
 * backend_instance_id, resource_name, public_port, definition_digest, schema_digest, contract_digest. Lines 38-45 hash to
 * EXCERPT_SHA256. rf's owner identity is the whole record: prepare_acceptance refuses `incoming.resource != expected` as
 * "owner/resource/port/contract identity mismatch" (:210-212), :82 says "digest checks alone never establish owner identity",
 * and tests/unit/test_federation_boundary.py:124-127 refuses a record whose backend_instance_id alone was replaced. NEG-01 is
 * the program README.md:43 negative fixture: "A and B have same local resource alias but different owner-instance IDs => do
 * not alias." The field grammars are ids.py:114 (workspace_id), :134 (backend_instance_id), :160 bounded by :167
 * (resource_name and public_port, both require_declared_id "source_id") and versions.py:314-315 (the three digests).
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the roster's vendored excerpt (federation_boundary.py:38-45 verbatim) hashes to EXCERPT_SHA256 and
 *    reads as the class line and seven `<name>: str` lines; A2 SEVEN_FIELDS, the roster's fields and the excerpt's names agree
 *    in order; A3 the comparator A2 relies on refuses a renamed, dropped, added or reordered list and admits only the verbatim
 *    one; A4 every fixture record carries exactly the seven fields in rf's order, each value inside its rf grammar (GRAMMARS).
 *  B, acceptance (b). B1-B4 scan every file of src, test, docs and qa as UTF-8 for DESCRIPTOR_FAMILY (SCAN_ROOTS: a floor on
 *    the files walked and one anchor file whose anchor token must be read, so an emptied or misdirected walk reds); B5 no
 *    registered native descriptor's JSON spells it (the served half).
 *  C, acceptance (c). The roster's two fixture pairs: neg01 (one local alias, records differing in backend_instance_id alone)
 *    and sameRecord (two aliases, one record). C1 pins each pair's shape; C2 ownerIdentity, the reference projection (rf's
 *    whole record, every field verbatim in rf's order; the alias is never part of it), projects neg01 as two identities and
 *    sameRecord as one; C3 every other key in OTHER_KEYS fails that rule, the alias alone first.
 *  D, acceptance (d). D1 scans every file of src for BACKEND_FAMILY (B1's floor and anchor); D2 no registered native
 *    descriptor's JSON spells it. A hit names GATING_ARTIFACTS: the surface ships with them, and this census moves with it.
 *  MB and MD, the matchers rows B and D read: MB1-MB8 and MD1-MD6 the spellings each must catch; QB1-QB4 and QD1-QD4 the
 *    pinned quiet rows of their named residuals.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id,
 * label and pins, every pin's witness, SEVEN_FIELDS and GATING_ARTIFACTS - is held to the out-of-file roster
 * test/fixtures/rf-owner-resource-roster.json. A pin deleted, relabelled, swapped for another passing case, or removed from
 * every literal here at once still reds against the roster, and every pin's witness is measured by its own case.
 * RESIDUALS (named, each with a pinned quiet row): R-INTERRUPTED a spelling whose words are split by a character outside the
 * separator class, here a zero-width code point (QB1, QD1); R-HOMOGLYPH one letter swapped for a look-alike from another
 * script (QB2, QD2); R-REORDERED the descriptor's three words in another order (QB3); R-VALUE-ONLY an rf backend instance id
 * value (rfi_ plus 26 base32 letters) carries no field name, so the name scan never sees it (QD3); R-COMPOSED a spelling
 * assembled at runtime from parts, this file's own mechanism, is invisible to any text scan (QB4, QD4), and B5 and D2 are the
 * runtime backstop for served descriptor text only.
 * SCOPE: the excerpt, the fields and the grammars are producer facts at 6a251bf73af5; Pi vendors no rf source, so a
 * producer-side change is seen only when an rf pin-bump re-reads them. ownerIdentity is the rule a future surface must match;
 * the surface itself waits for GATING_ARTIFACTS, and no reader is added or faked here.
 *
 * Display paths added: none. Test-only: nothing is spawned or written; the four roots are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-owner-resource-roster.json");

/** rf's seven OwnerResource fields in rf's declaration order (federation_boundary.py:39-45 at the pin). */
const SEVEN_FIELDS: readonly string[] = [
  "workspace_id", "backend_instance_id", "resource_name", "public_port", "definition_digest", "schema_digest", "contract_digest",
];
/** sha256 of federation_boundary.py lines 38-45 at the pin, each line newline-terminated: `git show <pin>:<path> | sed -n '38,45p' | sha256sum`. */
const EXCERPT_SHA256 = "43f444702fe99a368b9daba185c4529dd61405b075366a1ad19fb0d1d862911c";
/** The line the excerpt opens with (federation_boundary.py:38). */
const CLASS_LINE = "class OwnerResource:";
/** The consumer surface's gating artifacts: fw-b rfc-0txnl.17 and rfc-0txnl.25, and the FW-06 ADR rfc-0txnl.3 (BEADS:30). */
const GATING_ARTIFACTS: readonly string[] = ["rfc-0txnl.17", "rfc-0txnl.25", "rfc-0txnl.3"];
const DECLARED_ID = "^[a-z][a-z0-9_-]*(\\.[a-z][a-z0-9_-]*)*$";
const DIGEST = "^sha256:[0-9a-f]{64}$";
/** rf's grammar of each field at the pin: ids.py:114 and :134 (the two minted ids), ids.py:160 (the two declared source_id
 * names, bounded by DECLARED_ID_MAX), versions.py:314-315 (the three digests). */
const GRAMMARS: Readonly<Record<string, string>> = {
  workspace_id: "^rfw_[a-z2-7]{26}$",
  backend_instance_id: "^rfi_[a-z2-7]{26}$",
  resource_name: DECLARED_ID,
  public_port: DECLARED_ID,
  definition_digest: DIGEST,
  schema_digest: DIGEST,
  contract_digest: DIGEST,
};
/** DECLARED_ID_MAX_LENGTH (ids.py:167). */
const DECLARED_ID_MAX = 128;

const WORD_OWNER = "owner";
const WORD_INSTANCE = "instance";
const WORD_SCHEMA = "schema";
const WORD_BACKEND = "backend";
const DESCRIPTOR_WORDS: readonly string[] = [WORD_OWNER, WORD_INSTANCE, WORD_SCHEMA];
/** Row B's matcher: DESCRIPTOR_WORDS in that order, in any case, joined directly or by any run of whitespace, "_", ".", "+",
 * "/", ",", "&", "-" or the word "and". */
const DESCRIPTOR_FAMILY = new RegExp(DESCRIPTOR_WORDS.join("(?:[\\s_.+/,&-]|\\band\\b)*"), "i");
/** Row D's matcher: WORD_BACKEND, WORD_INSTANCE and "id" in that order, in any case, joined directly or by any run of
 * whitespace, "_", "." or "-". */
const BACKEND_FAMILY = new RegExp([WORD_BACKEND, WORD_INSTANCE, "id"].join("[\\s_.-]*"), "i");

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a hermetic fixture pins rf's seven OwnerResource field names and order against federation_boundary.py:39-45 (rename/drop/add fails)",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(b) 0 Pi strings label an rf federation row as a FiberOptics <FO_DESCRIPTOR> descriptor (h2fp-C020 REFUTED): src, test, docs and qa text and every served native descriptor",
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label: "(c) fixture rows with equal local alias and distinct backend_instance_id project as two identities (NEG-01), a key on alias alone fails",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label: "(d) until the surface ships (rfc-0txnl.17, rfc-0txnl.25, FW-06 ADR rfc-0txnl.3), 0 hits for backend_instance_id in Pi src, served native descriptors included",
    pins: ["D1", "D2"],
  },
  {
    id: "MB",
    label: "row B's matcher catches every separator and case spelling of <FO_DESCRIPTOR>, and its named residuals stay pinned quiet",
    pins: ["MB1", "MB2", "MB3", "MB4", "MB5", "MB6", "MB7", "MB8", "QB1", "QB2", "QB3", "QB4"],
  },
  {
    id: "MD",
    label: "row D's matcher catches every separator and case spelling of backend_instance_id, and its named residuals stay pinned quiet",
    pins: ["MD1", "MD2", "MD3", "MD4", "MD5", "MD6", "QD1", "QD2", "QD3", "QD4"],
  },
];

/** One fixture row: the local alias a consumer reads it under and the rf record itself, key order as the roster writes it. */
interface FixtureRecord {
  readonly alias: string;
  readonly resource: Readonly<Record<string, string | undefined>>;
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
  readonly excerpt: readonly string[];
  readonly fields: readonly string[];
  readonly gatingArtifacts: readonly string[];
  readonly neg01: readonly FixtureRecord[];
  readonly sameRecord: readonly FixtureRecord[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function fixtureRecords(value: unknown, field: string): FixtureRecord[] {
  if (!Array.isArray(value)) throw new Error(`roster ${field} must be a list`);
  return value.map((entry: unknown, index: number): FixtureRecord => {
    if (!isObject(entry) || typeof entry.alias !== "string" || !isObject(entry.resource)) {
      throw new Error(`roster ${field}[${index}] needs an alias and a resource object`);
    }
    const resource: Record<string, string> = {};
    for (const [key, item] of Object.entries(entry.resource)) {
      if (typeof item !== "string") throw new Error(`roster ${field}[${index}].resource.${key} must be a string`);
      resource[key] = item;
    }
    return { alias: entry.alias, resource };
  });
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows)) throw new Error("roster must be an object with a rows list");
  const records = raw.records;
  if (!isObject(records)) throw new Error("roster records must be an object");
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
  return {
    excerpt: strings(raw.excerpt, "excerpt"),
    fields: strings(raw.fields, "fields"),
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    neg01: fixtureRecords(records.neg01, "records.neg01"),
    sameRecord: fixtureRecords(records.sameRecord, "records.sameRecord"),
    rows,
  };
}

const ROSTER = readRoster();

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

interface ScanRoot {
  readonly pin: string;
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}

/** The four roots acceptance (b) reads; each floor sits below the count measured at base 0b2a80f (src 115, test 453, docs 66,
 * qa 67 files), so an emptied walk reds and an additive change does not. */
const SCAN_ROOTS: readonly ScanRoot[] = [
  { pin: "B1", root: "src", floor: 100, anchorFile: "workflow/reconcile.ts", anchorToken: "RECONCILE_EVIDENCE_READS" },
  { pin: "B2", root: "test", floor: 400, anchorFile: "helpers/rf-render-fixture.ts", anchorToken: "RF_FIXTURE_RELEASE" },
  { pin: "B3", root: "docs", floor: 50, anchorFile: "workbench/13-contracts-and-config.md", anchorToken: "reactivefiber.render.preview" },
  { pin: "B4", root: "qa", floor: 50, anchorFile: "workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts" },
];
/** Acceptance (d) reads src alone, with B1's floor and anchor. */
const SRC_ROOT: ScanRoot = { pin: "D1", root: "src", floor: 100, anchorFile: "workflow/reconcile.ts", anchorToken: "RECONCILE_EVIDENCE_READS" };

function scanRoot(scan: ScanRoot, family: RegExp, spelled: string): Json {
  const base = join(REPO, scan.root);
  const files = filesBelow(base);
  const floorMet = files.length >= scan.floor;
  const hits = files.filter(file => family.test(textOf(file))).map(file => relative(REPO, file));
  const anchor = join(base, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  expect(floorMet, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  expect(hits, `files spelling ${spelled} under ${scan.root}`).toEqual([]);
  return { root: scan.root, floor: scan.floor, anchorFile: scan.anchorFile, anchorToken: scan.anchorToken, floorMet, anchorRead, hits };
}

interface Served {
  readonly id: string;
  readonly text: string;
}
let served: Promise<readonly Served[]> | undefined;
/** Every descriptor the native registration serves, with its JSON text, loaded once. */
function servedDescriptors(): Promise<readonly Served[]> {
  served ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, REPO);
    return registry.catalogSnapshot().map(entry => ({ id: entry.descriptor.id, text: JSON.stringify(entry.descriptor) }));
  });
  return served;
}
async function servedScan(family: RegExp, spelled: string): Promise<Json> {
  const descriptors = await servedDescriptors();
  const descriptorFloorMet = descriptors.length >= 4;
  const hits = descriptors.filter(descriptor => family.test(descriptor.text)).map(descriptor => descriptor.id);
  expect(descriptorFloorMet, `served native descriptors: ${descriptors.map(descriptor => descriptor.id).join(", ")}`).toBe(true);
  expect(hits, `served native descriptors spelling ${spelled}`).toEqual([]);
  return { descriptorFloorMet, hits };
}

/** The vendored excerpt read as rf declares it: the class line, then one `<name>: str` line per field. */
function readExcerpt(lines: readonly string[]): { readonly classLine: string; readonly names: string[] } {
  const [classLine = "", ...fieldLines] = lines;
  return { classLine, names: fieldLines.map(line => /^ {4}([a-z][a-z0-9_]*): str$/.exec(line)?.[1] ?? `<unread ${line}>`) };
}
const excerptSha256 = (lines: readonly string[]): string =>
  createHash("sha256").update(lines.map(line => `${line}\n`).join("")).digest("hex");
const sameList = (candidate: readonly string[], expected: readonly string[]): boolean =>
  candidate.length === expected.length && candidate.every((field, index) => field === expected[index]);
function withinGrammar(field: string, value: string | undefined): boolean {
  const pattern: string | undefined = GRAMMARS[field];
  if (pattern === undefined || value === undefined || !new RegExp(pattern).test(value)) return false;
  return pattern !== DECLARED_ID || value.length <= DECLARED_ID_MAX;
}

type Key = (record: FixtureRecord) => string;
/** One record's values for `fields`, each named, in the order given. */
const valuesOf = (record: FixtureRecord, fields: readonly string[]): string =>
  JSON.stringify(fields.map(field => [field, record.resource[field] ?? null]));
/** The reference projection: rf's whole OwnerResource record, every field verbatim in rf's order, as prepare_acceptance
 * compares it (federation_boundary.py:210-212). The local alias is never part of it: Pi mints no key of its own. */
const ownerIdentity: Key = record => valuesOf(record, SEVEN_FIELDS);
const identities = (records: readonly FixtureRecord[], key: Key): number => new Set(records.map(key)).size;
/** NEG-01 (README.md:43) and its converse: one alias over two backend instances projects as two identities, two aliases over
 * one record as one. */
const holdsNegOne = (key: Key): boolean => identities(ROSTER.neg01, key) === 2 && identities(ROSTER.sameRecord, key) === 1;
/** C3's keys, each short of rf's whole record or longer than it: every one must fail NEG-01. */
const OTHER_KEYS: Readonly<Record<string, Key>> = {
  alias: record => record.alias,
  resourceName: record => valuesOf(record, ["resource_name"]),
  withoutBackendInstanceId: record => valuesOf(record, SEVEN_FIELDS.filter(field => field !== "backend_instance_id")),
  digestsOnly: record => valuesOf(record, ["definition_digest", "schema_digest", "contract_digest"]),
  aliasAndRecord: record => `${record.alias} ${ownerIdentity(record)}`,
};
/** A fixture pair's shape: its size, its distinct aliases, and the fields whose values differ inside it. */
function pairShape(records: readonly FixtureRecord[]): { records: number; aliases: string[]; differingFields: string[] } {
  return {
    records: records.length,
    aliases: [...new Set(records.map(record => record.alias))],
    differingFields: SEVEN_FIELDS.filter(field => new Set(records.map(record => record.resource[field])).size > 1),
  };
}

const cp = (code: number): string => String.fromCodePoint(code);
const caps = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
interface Spelling {
  readonly pin: string;
  readonly family: RegExp;
  readonly text: string;
  readonly hit: boolean;
}
/** MB1-MB8 and MD1-MD6 must hit. Quiet rows: QB1 and QD1 R-INTERRUPTED, QB2 and QD2 R-HOMOGLYPH, QB3 R-REORDERED, QD3
 * R-VALUE-ONLY, QB4 and QD4 R-COMPOSED (the source text of this file's own compositions). */
const SPELLINGS: readonly Spelling[] = [
  { pin: "MB1", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("+"), hit: true },
  { pin: "MB2", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join(" + "), hit: true },
  { pin: "MB3", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("/"), hit: true },
  { pin: "MB4", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("-"), hit: true },
  { pin: "MB5", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("_"), hit: true },
  { pin: "MB6", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.map(caps).join(""), hit: true },
  { pin: "MB7", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("+").toUpperCase(), hit: true },
  { pin: "MB8", family: DESCRIPTOR_FAMILY, text: `a FiberOptics ${WORD_OWNER}, ${WORD_INSTANCE} and ${WORD_SCHEMA} descriptor`, hit: true },
  { pin: "QB1", family: DESCRIPTOR_FAMILY, text: `${WORD_OWNER}${cp(0x200b)}+${WORD_INSTANCE}+${WORD_SCHEMA}`, hit: false },
  { pin: "QB2", family: DESCRIPTOR_FAMILY, text: [WORD_OWNER.replace("o", cp(0x043e)), WORD_INSTANCE, WORD_SCHEMA].join("+"), hit: false },
  { pin: "QB3", family: DESCRIPTOR_FAMILY, text: [...DESCRIPTOR_WORDS].reverse().join("+"), hit: false },
  { pin: "QB4", family: DESCRIPTOR_FAMILY, text: "[WORD_OWNER, WORD_INSTANCE, WORD_SCHEMA]", hit: false },
  { pin: "MD1", family: BACKEND_FAMILY, text: "backend_instance_id", hit: true },
  { pin: "MD2", family: BACKEND_FAMILY, text: "backendInstanceId", hit: true },
  { pin: "MD3", family: BACKEND_FAMILY, text: "BACKEND_INSTANCE_ID", hit: true },
  { pin: "MD4", family: BACKEND_FAMILY, text: "backend-instance-id", hit: true },
  { pin: "MD5", family: BACKEND_FAMILY, text: "a backend instance id", hit: true },
  { pin: "MD6", family: BACKEND_FAMILY, text: "backend.instance.id", hit: true },
  { pin: "QD1", family: BACKEND_FAMILY, text: `${WORD_BACKEND}${cp(0x200b)}_${WORD_INSTANCE}_id`, hit: false },
  { pin: "QD2", family: BACKEND_FAMILY, text: `${WORD_BACKEND.replace("a", cp(0x0430))}_${WORD_INSTANCE}_id`, hit: false },
  { pin: "QD3", family: BACKEND_FAMILY, text: `rfi_${"b".repeat(26)}`, hit: false },
  { pin: "QD4", family: BACKEND_FAMILY, text: '[WORD_BACKEND, WORD_INSTANCE, "id"]', hit: false },
];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const sha256 = excerptSha256(ROSTER.excerpt);
    const { classLine, names } = readExcerpt(ROSTER.excerpt);
    expect(sha256, "the vendored excerpt is not federation_boundary.py:38-45 at the pin").toBe(EXCERPT_SHA256);
    expect(classLine).toBe(CLASS_LINE);
    expect(names).toHaveLength(7);
    return { lines: ROSTER.excerpt.length, classLine, sha256, names };
  },
  A2: async () => {
    const { names } = readExcerpt(ROSTER.excerpt);
    expect(SEVEN_FIELDS, "this file's field list against the vendored excerpt").toStrictEqual(names);
    expect([...ROSTER.fields], "the roster's field list against the vendored excerpt").toStrictEqual(names);
    return { fields: names };
  },
  A3: async () => {
    const verbatim = [...SEVEN_FIELDS];
    const witness = {
      verbatim: sameList(verbatim, ROSTER.fields),
      rename: sameList(verbatim.map(field => (field === "backend_instance_id" ? "instance_id" : field)), ROSTER.fields),
      drop: sameList(verbatim.filter(field => field !== "schema_digest"), ROSTER.fields),
      add: sameList([...verbatim, "alias"], ROSTER.fields),
      reorder: sameList([verbatim[1], verbatim[0], ...verbatim.slice(2)], ROSTER.fields),
    };
    expect(witness).toStrictEqual({ verbatim: true, rename: false, drop: false, add: false, reorder: false });
    return witness;
  },
  A4: async () => {
    const records = [...ROSTER.neg01, ...ROSTER.sameRecord];
    const keyOrder = records.every(record => sameList(Object.keys(record.resource), SEVEN_FIELDS));
    const outside = records.flatMap((record, index) =>
      SEVEN_FIELDS.filter(field => !withinGrammar(field, record.resource[field])).map(field => `${index}:${field}`),
    );
    expect(records).toHaveLength(4);
    expect(keyOrder, "a fixture record's keys are not rf's seven fields in rf's order").toBe(true);
    expect(outside, "fixture values outside rf's grammar for their field").toEqual([]);
    return { records: records.length, keyOrder, outside, grammars: { ...GRAMMARS } };
  },
  ...Object.fromEntries(SCAN_ROOTS.map(scan => [scan.pin, async () => scanRoot(scan, DESCRIPTOR_FAMILY, "the refuted <FO_DESCRIPTOR>")])),
  B5: async () => servedScan(DESCRIPTOR_FAMILY, "the refuted <FO_DESCRIPTOR>"),
  C1: async () => {
    const neg01 = pairShape(ROSTER.neg01);
    const sameRecord = pairShape(ROSTER.sameRecord);
    expect(neg01.aliases, "the NEG-01 pair shares one local alias").toHaveLength(1);
    expect(neg01.differingFields, "the NEG-01 records differ in backend_instance_id alone").toEqual(["backend_instance_id"]);
    expect(sameRecord.aliases, "the converse pair reads one record under two aliases").toHaveLength(2);
    expect(sameRecord.differingFields).toEqual([]);
    return { neg01, sameRecord };
  },
  C2: async () => {
    const witness = { neg01: identities(ROSTER.neg01, ownerIdentity), sameRecord: identities(ROSTER.sameRecord, ownerIdentity) };
    expect(holdsNegOne(ownerIdentity), "the reference projection aliases the NEG-01 pair or splits one record").toBe(true);
    return witness;
  },
  C3: async () => {
    const counts = Object.fromEntries(
      Object.entries(OTHER_KEYS).map(([name, key]) => [name, [identities(ROSTER.neg01, key), identities(ROSTER.sameRecord, key)]]),
    );
    const holding = Object.entries(OTHER_KEYS).filter(([, key]) => holdsNegOne(key)).map(([name]) => name);
    expect(holdsNegOne(OTHER_KEYS.alias ?? ownerIdentity), "a key on the alias alone satisfies NEG-01").toBe(false);
    expect(holding, "a key other than rf's whole record satisfies NEG-01").toEqual([]);
    return { counts, holding };
  },
  D1: async () =>
    scanRoot(SRC_ROOT, BACKEND_FAMILY, `backend_instance_id (the surface ships with ${GATING_ARTIFACTS.join(", ")}; this census moves with it)`),
  D2: async () => servedScan(BACKEND_FAMILY, "backend_instance_id"),
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      async () => {
        const hit = spelling.family.test(spelling.text);
        expect(hit).toBe(spelling.hit);
        return { digest: createHash("sha256").update(spelling.text).digest("hex").slice(0, 16), hit };
      },
    ]),
  ),
};

describe("wb-a9l2.3 OwnerResource seven-field census (RF-HARNESS2-FEDERATED-PEER-R3, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:5", "C:3", "D:2", "MB:12", "MD:10"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ fields: [...SEVEN_FIELDS], gatingArtifacts: [...GATING_ARTIFACTS] }).toStrictEqual({
      fields: [...ROSTER.fields],
      gatingArtifacts: [...ROSTER.gatingArtifacts],
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
