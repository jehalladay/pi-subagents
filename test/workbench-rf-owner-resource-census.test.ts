/**
 * wb-a9l2.3 (RF-HARNESS2-FEDERATED-PEER-R3), the absent-today leg, hardened by wb-a09z (the PREP F1-F9 survivors of landing 256)
 * and by wb-4nvi (the landing-349 verdict's F1-F7: P2 and P1 read whole texts, A5's bound value, the walks held to git, the
 * matchers' classes read from their own source, the export read whatever its spacing, R-COORDINATED enumerated).
 * Statement (bead notes; the refuted descriptor is written as the placeholder): "If Pi ever surfaces an rf federation owner
 * descriptor or multi-owner resources, it shall echo rf's seven OwnerResource fields verbatim and in rf's order, never synthesize,
 * rename or alias them to a FiberOptics <FO_DESCRIPTOR> descriptor (h2fp-C020 REFUTED), and never alias rows sharing a local
 * alias but differing in backend_instance_id (NEG-01); consumer surface gated on fw-b rfc-0txnl.17/.25 + FW-06 ADR rfc-0txnl.3
 * (unshipped; dataclass ships at federation_boundary.py:38-45)." (harness2-federated-peer-2026-10-20/BEADS-2026-10-21.md:30@
 * 6a251bf73af5). Acceptance, quoted, and read back at run time from the tracked bead export .beads/issues.jsonl (ACCEPTANCE; the
 * record is found by its id whatever the export's JSON spacing, X3):
 * "(a) a hermetic fixture pins the seven field names and order against federation_boundary.py:39-45 (rename/drop/add fails);
 * (b) 0 Pi strings label an rf federation row as a FiberOptics <FO_DESCRIPTOR> descriptor; (c) fixture rows with equal local
 * alias and distinct backend_instance_id project as two identities (NEG-01), a key on alias alone fails; (d) until the surface
 * ships, 0 hits for backend_instance_id in Pi src."
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
 *  A, acceptance (a). A1 the roster's vendored excerpt hashes to EXCERPT_SHA256 and reads as the class line and seven
 *    `<name>: str` lines; A2 SEVEN_FIELDS, the roster's fields and the excerpt's names agree in order; A3 the comparator A2
 *    relies on refuses a renamed, dropped, added or reordered list; A4 every fixture record carries exactly the seven fields in
 *    rf's order, each value inside its rf grammar; A5 each grammar refuses its near misses (GRAMMAR_PROBES: prefix, length,
 *    case, alphabet, the DECLARED_ID_MAX bound at 128/129) and admits its boundary values; its witness carries each bound
 *    probe's length, so the roster holds the bound's value (128 admitted, 129 refused), not only this file's constant.
 *  B, acceptance (b). B1-B4 scan every file of src, test, docs and qa (SCAN_ROOTS: a file floor and an anchor file whose token
 *    must be read); B5 no registered native descriptor's JSON spells it; B6 scans every other top-level entry of the repo -
 *    the shipped root files, examples, vendor, media, the tracker's own config, every configuration file - except EXCLUDED and
 *    the local outputs .gitignore names (dist, .forge and the like: never committed; dist is tsc output judged at src).
 *    WALK HELD TO GIT (B1-B4, B6 and D1): each walk is held to git's own listing of its root (GIT_LISTING: the tracked files and
 *    the untracked ones git does not ignore, every .gitignore rule at every depth as git applies it). A listed regular file the
 *    walk never reached reds its pin, so a walk that skips a directory reds while its floor still holds; a scan reads only
 *    listed files, so a local output a .gitignore names at any depth (.beads/backup, .pi/readcache, test/perf/.results) is
 *    never read, and the floors and anchors count read files.
 *  C, acceptance (c). C1 pins the shapes of the fixture sets neg01 (one alias, records differing in backend_instance_id
 *    alone), sameRecord (two aliases, one record) and perField (one record per field, differing from neg01[0] in that field
 *    alone); C2 ownerIdentity, the reference projection (rf's whole record, every field verbatim in rf's order; the alias is
 *    never part of it), projects neg01 as two identities, sameRecord as one, and splits on each of the seven fields; C3 every
 *    other key in OTHER_KEYS fails that rule, the alias alone first.
 *  D, acceptance (d). D1 scans every file of src for BACKEND_FAMILY (B1's floor and anchor); D2 no registered native
 *    descriptor's JSON spells it. A hit names GATING_ARTIFACTS: the surface ships with them, and this census moves with it.
 *  MB and MD, the matchers rows B and D read: MB1-MB14 and MD1-MD8 one must-hit spelling per separator of each class and per
 *    case form; QB1-QB5 and QD1-QD5 the pinned quiet rows of their named residuals. A class's members are read from the
 *    matcher's own source, never from a list beside it (classOf: each member of its bracket, each word its alternation reads
 *    as a separator, "direct" when a run between two words may be empty, and the lower, upper and mixed case forms under its
 *    "i" flag), and the judged set refuses a member or case form that no must-hit spelling exercises (classGaps).
 *  P, the scan primitives' positive controls: P1 the content scan reports this file and its roster for BACKEND_FAMILY over
 *    test, and reads each whole (wholeTextOf: a family matching only a text of the file's exact length that opens and closes
 *    with its first and last 64 characters hits it, so a prefix, a suffix or any shortened read misses); P2 the served scan
 *    reads each descriptor's whole JSON text, never its id or a projection of it (every text is JSON.stringify of the
 *    descriptor an independent registration serves, and the description and inputSchema keys, which no id carries, hit every
 *    text); P3 the walk records a symbolic link (and every real scan refuses one); P4 the reader sees a spelling stored as
 *    UTF-16LE, UTF-16BE or UTF-32LE; P5 the walk is held to git's listing (heldToGit over a planted walk and listing: a file
 *    git does not list is never read, a listed file the walk never reached is reported, an unreadable listing reads nothing
 *    and reports itself), and the listing's argv is GIT_LISTING.
 *  X, the anchors outside the pin literals: X1 a pin removed with its roster entry is still caught when it alone judges an
 *    ACCEPTANCE part (C3); X2 the first pinned quiet row of R-COORDINATED (B3); X3 the export reader finds this bead's record
 *    whatever its JSON spacing (the record re-serialized with spaced separators reads the same Acceptance text); X4 every pin
 *    whose removal from every literal at once (rows, parts and spellings) an anchor reports, with the report - the export for
 *    a pin that alone judges an ACCEPTANCE part, the matcher's own class for a must-hit that alone exercises a member or case
 *    form; X5 every other pin, enumerated: R-COORDINATED's quiet set, with its member one level up (a narrowed matcher).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id,
 * label and pins, every pin's witness, SEVEN_FIELDS and GATING_ARTIFACTS - is held to the out-of-file roster
 * test/fixtures/rf-owner-resource-roster.json; no two pins carry the same witness, so swapping two cases reds. ACCEPTANCE is
 * held to the tracked bead export: each part has a pin and every pin of rows A-D judges a part. The closing case walks this
 * file's vitest task tree: every pin is registered once under its row, in run mode, not inverted, ran before it, and reached
 * its witness compare (REACHED, recorded after the compare and re-compared to the roster).
 * RESIDUALS (named, each with a pinned quiet row): R-INTERRUPTED a spelling whose words are split by a character outside the
 * separator class, here a zero-width code point (QB1, QD1); R-HOMOGLYPH one letter swapped for a look-alike from another
 * script (QB2, QD2); R-REORDERED the descriptor's three words in another order (QB3); R-VALUE-ONLY an rf backend instance id
 * value (rfi_ plus 26 base32 letters) carries no field name (QD3); R-COMPOSED a spelling assembled at runtime from parts, this
 * file's own mechanism, is invisible to any text scan (QB4, QD4), and B5 and D2 are the runtime backstop for served descriptor
 * text only; R-ENCODED a spelling held only in an encoded form (base64, an archive) carries no readable word (QB5, QD5);
 * R-COORDINATED a pin removed from this file and its roster at once is quiet unless an anchor outside the pin literals names it
 * (X4). X5 enumerates the quiet pins: each pin of rows A-D while another pin still judges its ACCEPTANCE part (B3 is X2's
 * row), each must-hit while other must-hits still exercise every member and case form it exercises, and every quiet,
 * control and anchor pin (QB, QD, P and X), which no anchor names. A matcher narrowed at once with its must-hit, the roster's
 * family ids and these literals is the same class one level up, pinned quiet in X5 too (row B's bracket without "." while MB9
 * goes with it reads no class gap).
 * SCOPE: the excerpt, the fields and the grammars are producer facts at 6a251bf73af5; Pi vendors no rf source, so a
 * producer-side change is seen only when an rf pin-bump re-reads them. ownerIdentity is the rule a future surface must match;
 * the surface itself waits for GATING_ARTIFACTS, and no reader is added or faked here. EXCLUDED, never read by row B: .git (the
 * object store), node_modules (installed third-party code) and the tracker's record files .beads/issues.jsonl and
 * .beads/interactions.jsonl (bead text and its change log, which quote the refuted descriptor - PREP F13).
 *
 * Display paths added: none. Test-only: nothing is written, and the one child process is git ls-files (GIT_LISTING), which only
 * reads the repo.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { type Dirent, lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-owner-resource-roster.json");
const CENSUS_FILE = "test/workbench-rf-owner-resource-census.test.ts";
const ROSTER_FILE = "test/fixtures/rf-owner-resource-roster.json";
/** The bead whose acceptance this census judges, and the tracked export that carries it. */
const BEAD = "wb-a9l2.3";
const BEADS_EXPORT = join(REPO, ".beads", "issues.jsonl");
const PLACEHOLDER = "<FO_DESCRIPTOR>";

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
const EN_DASH = String.fromCodePoint(0x2013);
const EM_DASH = String.fromCodePoint(0x2014);
/** Row B's matcher: DESCRIPTOR_WORDS in that order, in any case, joined directly or by any run of its separator class -
 * whitespace, "_", ".", "+", "/", ",", "&", ":", "|", "-", the en and em dashes - or the word "and". */
const DESCRIPTOR_FAMILY = new RegExp(DESCRIPTOR_WORDS.join(`(?:[\\s_.+/,&:|${EN_DASH}${EM_DASH}-]|\\band\\b)*`), "i");
/** Row D's matcher: WORD_BACKEND, WORD_INSTANCE and "id" in that order, in any case, joined directly or by any run of its
 * separator class - whitespace, "_", ".", "/", ":" or "-". */
const BACKEND_FAMILY = new RegExp([WORD_BACKEND, WORD_INSTANCE, "id"].join("[\\s_./:-]*"), "i");
/** Row D's words in that order, as classOf reads them back out of BACKEND_FAMILY's source. */
const BACKEND_WORDS: readonly string[] = [WORD_BACKEND, WORD_INSTANCE, "id"];
/** A family's identity in a witness: the first 16 hex of sha256 over its source and flags (so a scan swapped to the other
 * family reds, PREP F2). */
const familyId = (family: RegExp): string => createHash("sha256").update(`${family.source}/${family.flags}`).digest("hex").slice(0, 16);

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a hermetic fixture pins rf's seven OwnerResource field names and order against federation_boundary.py:39-45 (rename/drop/add fails), and each field's grammar refuses its near misses",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) 0 Pi strings label an rf federation row as a FiberOptics <FO_DESCRIPTOR> descriptor (h2fp-C020 REFUTED): src, test, docs, qa, every other top-level entry of the repo and every served native descriptor",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6"],
  },
  {
    id: "C",
    label: "(c) fixture rows with equal local alias and distinct backend_instance_id project as two identities (NEG-01), a key on alias alone fails, and rf's whole record splits on each of its seven fields",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label: "(d) until the surface ships (rfc-0txnl.17, rfc-0txnl.25, FW-06 ADR rfc-0txnl.3), 0 hits for backend_instance_id in Pi src, served native descriptors included",
    pins: ["D1", "D2"],
  },
  {
    id: "MB",
    label: "row B's matcher catches each separator of its class and each case form of <FO_DESCRIPTOR>, and its named residuals stay pinned quiet",
    pins: ["MB1", "MB2", "MB3", "MB4", "MB5", "MB6", "MB7", "MB8", "MB9", "MB10", "MB11", "MB12", "MB13", "MB14", "QB1", "QB2", "QB3", "QB4", "QB5"],
  },
  {
    id: "MD",
    label: "row D's matcher catches each separator of its class and each case form of backend_instance_id, and its named residuals stay pinned quiet",
    pins: ["MD1", "MD2", "MD3", "MD4", "MD5", "MD6", "MD7", "MD8", "QD1", "QD2", "QD3", "QD4", "QD5"],
  },
  {
    id: "P",
    label: "the scan primitives rows B and D compose read whole file content and whole served JSON text, refuse symbolic links, read NUL-bearing files and hold each walk to git's listing, each shown by a must-hit control",
    pins: ["P1", "P2", "P3", "P4", "P5"],
  },
  {
    id: "X",
    label: "the anchors outside the pin literals (the bead export, read whatever its JSON spacing, and each matcher's own class) name every pin whose coordinated removal they see, and R-COORDINATED's quiet set stays enumerated",
    pins: ["X1", "X2", "X3", "X4", "X5"],
  },
];

interface Part {
  readonly clause: string;
  readonly part: string;
  readonly pins: readonly string[];
}
/** The bead's acceptance, clause by clause and part by part (the export's clauses split at ", "), with the pins that judge each
 * part; the judged set holds the text to the tracked bead export, the refuted descriptor written as PLACEHOLDER. */
const ACCEPTANCE: readonly Part[] = [
  { clause: "a", part: "a hermetic fixture pins the seven field names and order against federation_boundary.py:39-45 (rename/drop/add fails)", pins: ["A1", "A2", "A3", "A4", "A5"] },
  { clause: "b", part: `0 Pi strings label an rf federation row as a FiberOptics ${PLACEHOLDER} descriptor`, pins: ["B1", "B2", "B3", "B4", "B5", "B6"] },
  { clause: "c", part: "fixture rows with equal local alias and distinct backend_instance_id project as two identities (NEG-01)", pins: ["C1", "C2"] },
  { clause: "c", part: "a key on alias alone fails", pins: ["C3"] },
  { clause: "d", part: "until the surface ships", pins: ["D1"] },
  { clause: "d", part: "0 hits for backend_instance_id in Pi src", pins: ["D1", "D2"] },
];
/** The rows whose pins must each judge an ACCEPTANCE part. */
const ACCEPTANCE_ROWS: readonly string[] = ["A", "B", "C", "D"];

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
  readonly perField: readonly FixtureRecord[];
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
    perField: fixtureRecords(records.perField, "records.perField"),
    rows,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The Acceptance text of this bead's notes in the tracked bead export, from "(a)" through the period before "Related:". The
 * record is found by its id, never by one serialization of its key, so a spaced re-export reads the same (PREP F7, X3). */
function exportedAcceptance(exported: string = readFileSync(BEADS_EXPORT, "utf8")): string {
  for (const line of exported.split("\n")) {
    if (!line.includes(BEAD)) continue;
    const parsed: unknown = JSON.parse(line);
    if (!isObject(parsed) || parsed.id !== BEAD || typeof parsed.notes !== "string") continue;
    const match = /Acceptance: (\(a\) .*?\.) Related:/.exec(parsed.notes);
    if (match?.[1] !== undefined) return match[1];
  }
  throw new Error(`the bead export holds no Acceptance text for ${BEAD}`);
}
/** An Acceptance text as clause/part pairs: "(x) part, part; (y) ...", the closing period dropped, the refuted descriptor
 * replaced by PLACEHOLDER. */
function exportedParts(acceptance: string): { clause: string; part: string }[] {
  const pieces = acceptance.replace(/\.$/, "").replace(DESCRIPTOR_FAMILY, PLACEHOLDER).split(/(?:^|; )\(([a-z])\) /);
  const parts: { clause: string; part: string }[] = [];
  for (let at = 1; at + 1 < pieces.length; at += 2) {
    for (const part of (pieces[at + 1] ?? "").split(", ")) parts.push({ clause: pieces[at] ?? "", part });
  }
  return parts;
}
/** What the export anchor reports for a judged set: each ACCEPTANCE part left with no pin of `rows`, and each pin of the
 * ACCEPTANCE_ROWS that judges no part. */
function exportGaps(rows: readonly Row[], acceptance: readonly Part[]): string[] {
  const present = new Set(rows.flatMap(row => row.pins));
  const cited = new Set(acceptance.flatMap(entry => entry.pins));
  return [
    ...acceptance.filter(entry => !entry.pins.some(pin => present.has(pin))).map(entry => `(${entry.clause}) ${entry.part}: no pin`),
    ...rows.filter(row => ACCEPTANCE_ROWS.includes(row.id)).flatMap(row => row.pins.filter(pin => !cited.has(pin)).map(pin => `${pin}: judges no part`)),
  ];
}
/** A judged set with one pin removed from every literal at once (the rows and the parts), as a coordinated hollow does. */
const withoutPin = (pin: string): { rows: Row[]; acceptance: Part[] } => ({
  rows: ROWS.map(row => ({ ...row, pins: row.pins.filter(entry => entry !== pin) })),
  acceptance: ACCEPTANCE.map(entry => ({ ...entry, pins: entry.pins.filter(item => item !== pin) })),
});

/** A directory entry as the walk reads it (fs.Dirent satisfies it; P3 hands the walk a planted listing). */
interface Entry {
  readonly name: string;
  isDirectory(): boolean;
  isFile(): boolean;
  isSymbolicLink(): boolean;
}
type Lister = (directory: string) => readonly Entry[];
const listDisk: Lister = directory => readdirSync(directory, { withFileTypes: true }) as Dirent[];
interface Walked {
  readonly files: string[];
  readonly links: string[];
}
/** Every regular file below a root, skipping the paths in `skip`; a symbolic link is recorded, never followed (every real scan
 * refuses one, PREP F7); a path that vanishes mid-walk holds nothing tracked. */
function walk(directory: string, skip: ReadonlySet<string>, list: Lister = listDisk): Walked {
  const out: Walked = { files: [], links: [] };
  let entries: readonly Entry[];
  try {
    entries = list(directory);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (skip.has(path)) continue;
    if (entry.isSymbolicLink()) out.links.push(path);
    else if (entry.isDirectory()) {
      const below = walk(path, skip, list);
      out.files.push(...below.files);
      out.links.push(...below.links);
    } else if (entry.isFile()) out.files.push(path);
  }
  return out;
}
/** The texts a scan reads from a file's bytes: the UTF-8 decoding, and for a file holding a NUL byte the same bytes with every
 * NUL dropped (so a UTF-16LE, UTF-16BE or UTF-32 spelling reads as its letters, PREP F7). */
function textsOf(bytes: Buffer): string[] {
  const texts = [bytes.toString("utf8")];
  if (bytes.includes(0)) texts.push(Buffer.from(bytes.filter(byte => byte !== 0)).toString("latin1"));
  return texts;
}
function bytesOf(path: string): Buffer {
  try {
    return readFileSync(path);
  } catch {
    return Buffer.alloc(0);
  }
}
/** The files whose content the family matches, repo-relative: the one hit predicate every file scan composes. */
const hitsIn = (files: readonly string[], family: RegExp): string[] =>
  files.filter(file => textsOf(bytesOf(file)).some(text => family.test(text))).map(file => relative(REPO, file));
const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** A family that matches one file's whole text and nothing shorter or longer (P1, PREP F2): its exact length, and its first and
 * last 64 characters in place (a literal of the whole text overruns the engine's pattern size limit). */
function wholeTextOf(path: string): RegExp {
  const text = readFileSync(path, "utf8");
  if (text.length <= 128) return new RegExp(`^${escapeRegExp(text)}$`);
  return new RegExp(`^(?=[\\s\\S]{${text.length}}$)${escapeRegExp(text.slice(0, 64))}[\\s\\S]*${escapeRegExp(text.slice(-64))}$`);
}

/** git's listing of a root: its tracked files and the untracked ones git does not ignore (every .gitignore rule at every
 * depth, as git applies it), NUL-separated. */
const GIT_LISTING: readonly string[] = ["ls-files", "-z", "--cached", "--others", "--exclude-standard"];
const listings = new Map<string, ReadonlySet<string> | undefined>();
const isRegularFile = (path: string): boolean => {
  try {
    return lstatSync(path).isFile();
  } catch {
    return false;
  }
};
/** The regular files git lists below a root, absolute, listed once per root; undefined when git cannot list it. */
function gitListed(root: string): ReadonlySet<string> | undefined {
  if (listings.has(root)) return listings.get(root);
  const listing = spawnSync("git", [...GIT_LISTING, "--", relative(REPO, root).split(sep).join("/") || "."], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 28 });
  const listed =
    listing.error === undefined && listing.status === 0
      ? new Set(listing.stdout.split("\0").filter(path => path !== "").map(path => join(REPO, path)).filter(isRegularFile))
      : undefined;
  listings.set(root, listed);
  return listed;
}
/** A walk held to git's listing of the same root (PREP F3, F6): the walked files git lists, the only files a scan reads, and the
 * listed files the walk never reached, relative to `base`; an unreadable listing reads nothing and reports itself. */
function heldToGit(base: string, walked: readonly string[], listed: ReadonlySet<string> | undefined): { read: string[]; unwalked: string[] } {
  if (listed === undefined) return { read: [], unwalked: ["<git ls-files failed>"] };
  const seen = new Set(walked);
  return {
    read: walked.filter(path => listed.has(path)),
    unwalked: [...listed].filter(path => !seen.has(path)).map(path => relative(base, path)).sort(),
  };
}

interface ScanRoot {
  readonly pin: string;
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}

/** The four roots acceptance (b) names first; each floor sits below the count measured at base 0b2a80f (src 115, test 453,
 * docs 66, qa 67 files; re-measured at aa6d65d for wb-4nvi: src 116, test 654, docs 73, qa 67, every walked file git-listed),
 * so an emptied walk reds and an additive change does not; the walk itself is held to git's listing (heldToGit). */
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
  const { files, links } = walk(base, new Set());
  const { read, unwalked } = heldToGit(REPO, files, gitListed(base));
  const floorMet = read.length >= scan.floor;
  const hits = hitsIn(read, family);
  const anchor = join(base, scan.anchorFile);
  const anchorRead = read.includes(anchor) && bytesOf(anchor).toString("utf8").includes(scan.anchorToken);
  expect(floorMet, `${scan.root}: ${read.length} listed files read, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  expect(unwalked, `${scan.root}: files git lists that the walk never reached`).toEqual([]);
  expect(links.map(link => relative(REPO, link)), `symbolic links under ${scan.root} (refused, never followed)`).toEqual([]);
  expect(hits, `files spelling ${spelled} under ${scan.root}`).toEqual([]);
  return { pin: scan.pin, family: familyId(family), root: scan.root, floor: scan.floor, anchorFile: scan.anchorFile, anchorToken: scan.anchorToken, floorMet, anchorRead, unwalked, links: [], hits };
}

/** Never read by row B: the object store, installed third-party code, and the tracker's record files (bead text and its change
 * log quote the refuted descriptor, PREP F13). Every other top-level entry outside SCAN_ROOTS is B6's. */
const EXCLUDED: readonly string[] = [".git", "node_modules", ".beads/issues.jsonl", ".beads/interactions.jsonl"];
/** B6's floors (measured at base 893fe06: 36 entries and 71 files outside SCAN_ROOTS, EXCLUDED and the gitignored local
 * outputs; at aa6d65d for wb-4nvi, 36 entries and 72 git-listed files) and the files it must read. */
const REST_FLOOR = { entries: 25, files: 55 };
const REST_ANCHORS: readonly (readonly [string, string])[] = [
  ["README.md", "pi-subagents"],
  ["forge.toml", "[build.commands]"],
  ["examples/workflows/compose.js", "export"],
  ["vendor/README.md", "Native SDK artifacts"],
];
/** The top-level names a .gitignore line matches: a line naming one path segment (a trailing "/" allowed; "*" and "?" as
 * globs); lines with an inner "/", negations and comments name no top-level entry. */
function gitignoredTopLevel(names: readonly string[]): string[] {
  const patterns = bytesOf(join(REPO, ".gitignore")).toString("utf8").split("\n").map(line => line.trim()).filter(line => line !== "" && !line.startsWith("#") && !line.startsWith("!"));
  const matchers = patterns
    .map(line => line.replace(/\/$/, "").replace(/^\//, ""))
    .filter(line => !line.includes("/"))
    .map(line => new RegExp(`^${line.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]*").replace(/\?/g, "[^/]")}$`));
  return names.filter(name => matchers.some(matcher => matcher.test(name)));
}
function scanRest(family: RegExp, spelled: string): Json {
  const roots = new Set(SCAN_ROOTS.map(scan => scan.root));
  const top = listDisk(REPO).filter(entry => !roots.has(entry.name));
  const local = new Set(gitignoredTopLevel(top.map(entry => entry.name)));
  const kept = top.filter(entry => !local.has(entry.name) && !EXCLUDED.includes(entry.name));
  const skip = new Set(EXCLUDED.map(path => join(REPO, path)));
  const files: string[] = [];
  const links: string[] = [];
  for (const entry of kept) {
    const path = join(REPO, entry.name);
    if (entry.isSymbolicLink()) links.push(path);
    else if (entry.isDirectory()) {
      const below = walk(path, skip);
      files.push(...below.files);
      links.push(...below.links);
    } else if (entry.isFile()) files.push(path);
  }
  const listed = gitListed(REPO);
  const under = (path: string, entry: string): boolean => path === join(REPO, entry) || path.startsWith(`${join(REPO, entry)}${sep}`);
  const outside = [...roots, ...EXCLUDED];
  const rest = listed === undefined ? undefined : new Set([...listed].filter(path => !outside.some(entry => under(path, entry))));
  const { read, unwalked } = heldToGit(REPO, files, rest);
  const floorMet = kept.length >= REST_FLOOR.entries && read.length >= REST_FLOOR.files;
  const anchorsRead = REST_ANCHORS.every(([file, token]) => read.includes(join(REPO, file)) && bytesOf(join(REPO, file)).toString("utf8").includes(token));
  const hits = hitsIn(read, family);
  expect(floorMet, `${kept.length} top-level entries and ${read.length} listed files read, floors ${REST_FLOOR.entries} and ${REST_FLOOR.files}`).toBe(true);
  expect(anchorsRead, `the anchors ${REST_ANCHORS.map(([file]) => file).join(", ")} were not all read`).toBe(true);
  expect(unwalked, "files git lists outside SCAN_ROOTS and EXCLUDED that the walk never reached").toEqual([]);
  expect(links.map(link => relative(REPO, link)), "symbolic links outside SCAN_ROOTS (refused, never followed)").toEqual([]);
  expect(hits, `files spelling ${spelled} outside SCAN_ROOTS`).toEqual([]);
  return { pin: "B6", family: familyId(family), excluded: [...EXCLUDED], floor: { ...REST_FLOOR }, floorMet, anchorsRead, unwalked, links: [], hits };
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
/** The served descriptors whose JSON text the family matches: the one hit predicate every served scan composes. */
const servedHits = (descriptors: readonly Served[], family: RegExp): string[] =>
  descriptors.filter(descriptor => family.test(descriptor.text)).map(descriptor => descriptor.id);
async function servedScan(pin: string, family: RegExp, spelled: string): Promise<Json> {
  const descriptors = await servedDescriptors();
  const descriptorFloorMet = descriptors.length >= 4;
  const hits = servedHits(descriptors, family);
  expect(descriptorFloorMet, `served native descriptors: ${descriptors.map(descriptor => descriptor.id).join(", ")}`).toBe(true);
  expect(hits, `served native descriptors spelling ${spelled}`).toEqual([]);
  return { pin, family: familyId(family), descriptorFloorMet, hits };
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

interface GrammarProbe {
  readonly label: string;
  readonly field: string;
  readonly value: string;
  readonly admitted: boolean;
}
const base32 = (letter: string, length = 26): string => letter.repeat(length);
/** A5's probes: per field, the boundary values rf's grammar admits and the near misses it refuses (PREP F8 G09b, F9 G10). */
const GRAMMAR_PROBES: readonly GrammarProbe[] = [
  { label: "workspace/at-26", field: "workspace_id", value: `rfw_${base32("a")}`, admitted: true },
  { label: "workspace/short", field: "workspace_id", value: `rfw_${base32("a", 25)}`, admitted: false },
  { label: "workspace/long", field: "workspace_id", value: `rfw_${base32("a", 27)}`, admitted: false },
  { label: "workspace/prefix", field: "workspace_id", value: `rfi_${base32("a")}`, admitted: false },
  { label: "workspace/upper", field: "workspace_id", value: `rfw_${base32("A")}`, admitted: false },
  { label: "workspace/alphabet", field: "workspace_id", value: `rfw_${base32("1")}`, admitted: false },
  { label: "backend/at-26", field: "backend_instance_id", value: `rfi_${base32("b")}`, admitted: true },
  { label: "backend/short", field: "backend_instance_id", value: `rfi_${base32("b", 25)}`, admitted: false },
  { label: "backend/prefix", field: "backend_instance_id", value: `rfw_${base32("b")}`, admitted: false },
  { label: "backend/alphabet", field: "backend_instance_id", value: `rfi_${base32("8")}`, admitted: false },
  { label: "resource/at-max", field: "resource_name", value: "a".repeat(DECLARED_ID_MAX), admitted: true },
  { label: "resource/over-max", field: "resource_name", value: "a".repeat(DECLARED_ID_MAX + 1), admitted: false },
  { label: "resource/dotted", field: "resource_name", value: "public.notes-x_1", admitted: true },
  { label: "resource/digit-first", field: "resource_name", value: "1notes", admitted: false },
  { label: "resource/empty-segment", field: "resource_name", value: "public..notes", admitted: false },
  { label: "resource/upper", field: "resource_name", value: "Notes", admitted: false },
  { label: "port/at-max", field: "public_port", value: "v".repeat(DECLARED_ID_MAX), admitted: true },
  { label: "port/over-max", field: "public_port", value: "v".repeat(DECLARED_ID_MAX + 1), admitted: false },
  { label: "definition/at-64", field: "definition_digest", value: `sha256:${"0".repeat(64)}`, admitted: true },
  { label: "definition/short", field: "definition_digest", value: `sha256:${"0".repeat(63)}`, admitted: false },
  { label: "schema/algorithm", field: "schema_digest", value: `sha512:${"0".repeat(64)}`, admitted: false },
  { label: "contract/upper-hex", field: "contract_digest", value: `sha256:${"A".repeat(64)}`, admitted: false },
];

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
/** The fields a key splits on: each perField record set beside neg01[0] projects as two identities (PREP F5). */
function splitBy(key: Key): string[] {
  const [base] = ROSTER.neg01;
  if (base === undefined) return [];
  return ROSTER.perField.flatMap((record, index) => (identities([base, record], key) === 2 ? [SEVEN_FIELDS[index] ?? `<field ${index}>`] : []));
}
/** C3's keys, each short of rf's whole record or longer than it: every one must fail NEG-01. */
const OTHER_KEYS: Readonly<Record<string, Key>> = {
  alias: record => record.alias,
  resourceName: record => valuesOf(record, ["resource_name"]),
  withoutBackendInstanceId: record => valuesOf(record, SEVEN_FIELDS.filter(field => field !== "backend_instance_id")),
  digestsOnly: record => valuesOf(record, ["definition_digest", "schema_digest", "contract_digest"]),
  aliasAndRecord: record => `${record.alias} ${ownerIdentity(record)}`,
};
/** A fixture set's shape: its size, its distinct aliases, and the fields whose values differ inside it. */
function pairShape(records: readonly FixtureRecord[]): { records: number; aliases: string[]; differingFields: string[] } {
  return {
    records: records.length,
    aliases: [...new Set(records.map(record => record.alias))],
    differingFields: SEVEN_FIELDS.filter(field => new Set(records.map(record => record.resource[field])).size > 1),
  };
}

const cp = (code: number): string => String.fromCodePoint(code);
const caps = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
const base64 = (text: string): string => Buffer.from(text, "utf8").toString("base64");
interface Spelling {
  readonly pin: string;
  readonly family: RegExp;
  readonly text: string;
  readonly hit: boolean;
}
/** MB1-MB14 and MD1-MD8 must hit: one spelling per separator of each class and per case form. Quiet rows: QB1 and QD1
 * R-INTERRUPTED, QB2 and QD2 R-HOMOGLYPH, QB3 R-REORDERED, QD3 R-VALUE-ONLY, QB4 and QD4 R-COMPOSED (the source text of this
 * file's own compositions), QB5 and QD5 R-ENCODED. */
const SPELLINGS: readonly Spelling[] = [
  { pin: "MB1", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("+"), hit: true },
  { pin: "MB2", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join(" + "), hit: true },
  { pin: "MB3", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("/"), hit: true },
  { pin: "MB4", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("-"), hit: true },
  { pin: "MB5", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("_"), hit: true },
  { pin: "MB6", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.map(caps).join(""), hit: true },
  { pin: "MB7", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("+").toUpperCase(), hit: true },
  { pin: "MB8", family: DESCRIPTOR_FAMILY, text: `a FiberOptics ${WORD_OWNER}, ${WORD_INSTANCE} and ${WORD_SCHEMA} descriptor`, hit: true },
  { pin: "MB9", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("."), hit: true },
  { pin: "MB10", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join(" & "), hit: true },
  { pin: "MB11", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join(":"), hit: true },
  { pin: "MB12", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join("|"), hit: true },
  { pin: "MB13", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join(EN_DASH), hit: true },
  { pin: "MB14", family: DESCRIPTOR_FAMILY, text: DESCRIPTOR_WORDS.join(` ${EM_DASH} `), hit: true },
  { pin: "QB1", family: DESCRIPTOR_FAMILY, text: `${WORD_OWNER}${cp(0x200b)}+${WORD_INSTANCE}+${WORD_SCHEMA}`, hit: false },
  { pin: "QB2", family: DESCRIPTOR_FAMILY, text: [WORD_OWNER.replace("o", cp(0x043e)), WORD_INSTANCE, WORD_SCHEMA].join("+"), hit: false },
  { pin: "QB3", family: DESCRIPTOR_FAMILY, text: [...DESCRIPTOR_WORDS].reverse().join("+"), hit: false },
  { pin: "QB4", family: DESCRIPTOR_FAMILY, text: "[WORD_OWNER, WORD_INSTANCE, WORD_SCHEMA]", hit: false },
  { pin: "QB5", family: DESCRIPTOR_FAMILY, text: base64(DESCRIPTOR_WORDS.join("+")), hit: false },
  { pin: "MD1", family: BACKEND_FAMILY, text: "backend_instance_id", hit: true },
  { pin: "MD2", family: BACKEND_FAMILY, text: "backendInstanceId", hit: true },
  { pin: "MD3", family: BACKEND_FAMILY, text: "BACKEND_INSTANCE_ID", hit: true },
  { pin: "MD4", family: BACKEND_FAMILY, text: "backend-instance-id", hit: true },
  { pin: "MD5", family: BACKEND_FAMILY, text: "a backend instance id", hit: true },
  { pin: "MD6", family: BACKEND_FAMILY, text: "backend.instance.id", hit: true },
  { pin: "MD7", family: BACKEND_FAMILY, text: [WORD_BACKEND, WORD_INSTANCE, "id"].join("/"), hit: true },
  { pin: "MD8", family: BACKEND_FAMILY, text: [WORD_BACKEND, WORD_INSTANCE, "id"].join(":"), hit: true },
  { pin: "QD1", family: BACKEND_FAMILY, text: `${WORD_BACKEND}${cp(0x200b)}_${WORD_INSTANCE}_id`, hit: false },
  { pin: "QD2", family: BACKEND_FAMILY, text: `${WORD_BACKEND.replace("a", cp(0x0430))}_${WORD_INSTANCE}_id`, hit: false },
  { pin: "QD3", family: BACKEND_FAMILY, text: `rfi_${"b".repeat(26)}`, hit: false },
  { pin: "QD4", family: BACKEND_FAMILY, text: '[WORD_BACKEND, WORD_INSTANCE, "id"]', hit: false },
  { pin: "QD5", family: BACKEND_FAMILY, text: base64("backend_instance_id"), hit: false },
];

/** The two matchers whose classes the judged set reads (PREP F5), each under its row with its words in order. */
const MATCHERS: readonly { readonly row: string; readonly family: RegExp; readonly words: readonly string[] }[] = [
  { row: "MB", family: DESCRIPTOR_FAMILY, words: DESCRIPTOR_WORDS },
  { row: "MD", family: BACKEND_FAMILY, words: BACKEND_WORDS },
];
const CASE_FORMS: readonly string[] = ["lower", "upper", "mixed"];
/** The run a matcher's source reads between its words, or undefined when the source is not its words joined by one run. */
function runOf(family: RegExp, words: readonly string[]): string | undefined {
  const [first = "", second = ""] = words;
  const source = family.source;
  if (!source.startsWith(first)) return undefined;
  const run = source.slice(first.length, source.indexOf(second, first.length));
  return source === words.join(run) ? run : undefined;
}
/** A run's bracket members (regex fragments, one per member) and the words its alternation reads as separators. */
function runMembers(run: string): { readonly bracket: string[]; readonly words: string[] } {
  const bracket = /\[((?:\\.|[^\]\\])*)\]/.exec(run)?.[1] ?? "";
  return { bracket: bracket.match(/\\.|[^\\]/gu) ?? [], words: [...run.matchAll(/\\b([a-z]+)\\b/g)].map(match => match[1] ?? "") };
}
/** A bracket member's label: whitespace for \s, a printable ASCII character as itself, anything else by its code point. */
function memberLabel(member: string): string {
  if (member === "\\s") return "whitespace";
  const code = (member.startsWith("\\") ? member.slice(1) : member).codePointAt(0) ?? 0;
  return code > 0x7e ? `U+${code.toString(16).toUpperCase().padStart(4, "0")}` : String.fromCodePoint(code);
}
/** What a matcher reads between its words, read from its own source: each bracket member, each separator word, "direct" when a
 * run may be empty, and the case forms when it reads any case; "<unread source>" when the source is not its words joined by one
 * run, which no spelling can cover. */
function classOf(family: RegExp, words: readonly string[]): string[] {
  const run = runOf(family, words);
  if (run === undefined) return ["<unread source>"];
  const members = runMembers(run);
  return [
    ...members.bracket.map(memberLabel),
    ...members.words,
    ...(new RegExp(`^(?:${run})$`).test("") ? ["direct"] : []),
    ...(family.flags.includes("i") ? CASE_FORMS : []),
  ];
}
/** The members and the case form one spelling exercises: the runs between its words as the matcher reads them, and the case of
 * its words; nothing when the matcher does not read it. */
function exercised(family: RegExp, words: readonly string[], text: string): string[] {
  const run = runOf(family, words);
  const match = run === undefined ? null : new RegExp(words.join(`(${run})`), family.flags).exec(text);
  if (run === undefined || match === null) return [];
  const runs = match.slice(1).map(entry => entry ?? "");
  const members = runMembers(run);
  let at = 0;
  const letters = words
    .map((word, index) => {
      const read = match[0].slice(at, at + word.length);
      at += word.length + (runs[index]?.length ?? 0);
      return read;
    })
    .join("");
  const caseForm = letters === letters.toLowerCase() ? "lower" : letters === letters.toUpperCase() ? "upper" : "mixed";
  return [
    ...members.bracket.filter(member => runs.some(entry => new RegExp(`[${member}]`).test(entry))).map(memberLabel),
    ...members.words.filter(word => runs.some(entry => new RegExp(`\\b${word}\\b`, "i").test(entry))),
    ...(runs.includes("") ? ["direct"] : []),
    ...(family.flags.includes("i") ? [caseForm] : []),
  ];
}
/** Each member or case form of a matcher's class that no must-hit spelling exercises, labelled by its matcher's row. */
function classGaps(spellings: readonly Spelling[], matchers: typeof MATCHERS = MATCHERS): string[] {
  return matchers.flatMap(({ row, family, words }) => {
    const covered = new Set(spellings.filter(spelling => spelling.family === family && spelling.hit).flatMap(spelling => exercised(family, words, spelling.text)));
    return classOf(family, words)
      .filter(member => !covered.has(member))
      .map(member => `${row} ${member}`);
  });
}
/** What the anchors outside the pin literals report when one pin is removed from every literal at once - the rows, the
 * ACCEPTANCE parts and the spellings - as a coordinated hollow does: the export's gaps, then the classes'. */
function anchorsReport(pin: string): string[] {
  const hollow = withoutPin(pin);
  return [...exportGaps(hollow.rows, hollow.acceptance), ...classGaps(SPELLINGS.filter(spelling => spelling.pin !== pin))];
}
/** The tracked bead export with this bead's record re-serialized with spaced JSON separators (", " and ": "), still one line. */
function spacedExport(exported: string): string {
  return exported
    .split("\n")
    .map(line => {
      if (!line.includes(BEAD)) return line;
      const parsed: unknown = JSON.parse(line);
      return isObject(parsed) && parsed.id === BEAD ? JSON.stringify(parsed, null, 1).replace(/\n\s*/g, " ") : line;
    })
    .join("\n");
}
/** Keys every served descriptor's JSON carries that no id carries: P2 must-hits each in every served text (PREP F1). */
const NON_ID_KEYS: readonly string[] = ["description", "inputSchema"];

/** P3's planted listing: a file, a link, and a directory holding a second link. */
const PLANTED = "/planted";
const plantedEntry = (name: string, kind: "file" | "dir" | "link"): Entry => ({
  name,
  isDirectory: () => kind === "dir",
  isFile: () => kind === "file",
  isSymbolicLink: () => kind === "link",
});
const plantedLister: Lister = directory =>
  directory === PLANTED ? [plantedEntry("a.ts", "file"), plantedEntry("zz-link", "link"), plantedEntry("d", "dir")] : directory === join(PLANTED, "d") ? [plantedEntry("inner", "link")] : [];
/** A spelling stored as UTF-32LE: four bytes per code unit, three of them NUL for an ASCII letter. */
const utf32le = (text: string): Buffer => Buffer.from([...text].flatMap(char => [char.charCodeAt(0), 0, 0, 0]));

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
      reorder: sameList([verbatim[1] ?? "", verbatim[0] ?? "", ...verbatim.slice(2)], ROSTER.fields),
    };
    expect(witness).toStrictEqual({ verbatim: true, rename: false, drop: false, add: false, reorder: false });
    return witness;
  },
  A4: async () => {
    const records = [...ROSTER.neg01, ...ROSTER.sameRecord, ...ROSTER.perField];
    const keyOrder = records.every(record => sameList(Object.keys(record.resource), SEVEN_FIELDS));
    const outside = records.flatMap((record, index) =>
      SEVEN_FIELDS.filter(field => !withinGrammar(field, record.resource[field])).map(field => `${index}:${field}`),
    );
    expect(records).toHaveLength(11);
    expect(keyOrder, "a fixture record's keys are not rf's seven fields in rf's order").toBe(true);
    expect(outside, "fixture values outside rf's grammar for their field").toEqual([]);
    return { records: records.length, keyOrder, outside, grammars: { ...GRAMMARS } };
  },
  A5: async () => {
    const read = GRAMMAR_PROBES.map(probe => ({ label: probe.label, admitted: withinGrammar(probe.field, probe.value) }));
    expect(read, "a grammar admits a near miss or refuses a boundary value").toStrictEqual(GRAMMAR_PROBES.map(probe => ({ label: probe.label, admitted: probe.admitted })));
    const bounds = Object.fromEntries(GRAMMAR_PROBES.filter(probe => probe.label.endsWith("-max")).map(probe => [probe.label, probe.value.length]));
    return { admitted: read.filter(entry => entry.admitted).map(entry => entry.label), refused: read.filter(entry => !entry.admitted).map(entry => entry.label), bounds };
  },
  ...Object.fromEntries(SCAN_ROOTS.map(scan => [scan.pin, async () => scanRoot(scan, DESCRIPTOR_FAMILY, `the refuted ${PLACEHOLDER}`)])),
  B5: async () => servedScan("B5", DESCRIPTOR_FAMILY, `the refuted ${PLACEHOLDER}`),
  B6: async () => scanRest(DESCRIPTOR_FAMILY, `the refuted ${PLACEHOLDER}`),
  C1: async () => {
    const neg01 = pairShape(ROSTER.neg01);
    const sameRecord = pairShape(ROSTER.sameRecord);
    const [base] = ROSTER.neg01;
    const perField = ROSTER.perField.map(record => pairShape(base === undefined ? [record] : [base, record]));
    expect(neg01.aliases, "the NEG-01 pair shares one local alias").toHaveLength(1);
    expect(neg01.differingFields, "the NEG-01 records differ in backend_instance_id alone").toEqual(["backend_instance_id"]);
    expect(sameRecord.aliases, "the converse pair reads one record under two aliases").toHaveLength(2);
    expect(sameRecord.differingFields).toEqual([]);
    expect(perField.map(shape => shape.differingFields), "perField record n differs from neg01[0] in field n alone").toEqual(SEVEN_FIELDS.map(field => [field]));
    expect(perField.map(shape => shape.aliases.length), "perField records keep neg01[0]'s alias").toEqual(SEVEN_FIELDS.map(() => 1));
    return { neg01, sameRecord, perField: perField.map(shape => shape.differingFields.join(",")) };
  },
  C2: async () => {
    const witness = { neg01: identities(ROSTER.neg01, ownerIdentity), sameRecord: identities(ROSTER.sameRecord, ownerIdentity), splitBy: splitBy(ownerIdentity) };
    expect(holdsNegOne(ownerIdentity), "the reference projection aliases the NEG-01 pair or splits one record").toBe(true);
    expect(witness.splitBy, "the reference projection is rf's whole record: it splits on every one of the seven fields").toEqual([...SEVEN_FIELDS]);
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
  D2: async () => servedScan("D2", BACKEND_FAMILY, "backend_instance_id"),
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
  P1: async () => {
    const hits = hitsIn(walk(join(REPO, "test"), new Set()).files, BACKEND_FAMILY);
    const readWhole = [CENSUS_FILE, ROSTER_FILE].filter(file => hitsIn([join(REPO, file)], wholeTextOf(join(REPO, file))).length === 1);
    const witness = { family: familyId(BACKEND_FAMILY), reportsCensus: hits.includes(CENSUS_FILE), reportsRoster: hits.includes(ROSTER_FILE), readWhole };
    expect(witness, "the content scan does not report this file and its roster, which spell backend_instance_id, or reads either short of its end").toStrictEqual({
      family: familyId(BACKEND_FAMILY),
      reportsCensus: true,
      reportsRoster: true,
      readWhole: [CENSUS_FILE, ROSTER_FILE],
    });
    return witness;
  },
  P2: async () => {
    const descriptors = await servedDescriptors();
    const native = await loadWorkbenchNative();
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, REPO);
    const independent = registry.catalogSnapshot().map(entry => ({ id: entry.descriptor.id, text: JSON.stringify(entry.descriptor) }));
    const hits = servedHits(descriptors, /"id":"/);
    const witness = {
      descriptorFloorMet: descriptors.length >= 4,
      everyTextRead: hits.length === descriptors.length && descriptors.length > 0,
      wholeDescriptors: descriptors.length > 0 && JSON.stringify(descriptors) === JSON.stringify(independent),
      nonIdKeysRead: NON_ID_KEYS.filter(key => descriptors.length > 0 && servedHits(descriptors, new RegExp(`"${key}":`)).length === descriptors.length),
    };
    expect(witness, "the served scan does not read each descriptor's whole JSON text (an id, or a projection to it, carries neither the description nor the inputSchema key)").toStrictEqual({
      descriptorFloorMet: true,
      everyTextRead: true,
      wholeDescriptors: true,
      nonIdKeysRead: [...NON_ID_KEYS],
    });
    return witness;
  },
  P3: async () => {
    const planted = walk(PLANTED, new Set(), plantedLister);
    const witness = { files: planted.files.map(file => relative(PLANTED, file)), links: planted.links.map(link => relative(PLANTED, link)) };
    expect(witness, "the walk does not record a symbolic link").toStrictEqual({ files: ["a.ts"], links: ["zz-link", "d/inner"] });
    return witness;
  },
  P4: async () => {
    const spelled = [WORD_BACKEND, WORD_INSTANCE, "id"].join("_");
    const reads = (bytes: Buffer): boolean => textsOf(bytes).some(text => BACKEND_FAMILY.test(text));
    const witness = {
      utf16le: reads(Buffer.from(spelled, "utf16le")),
      utf16be: reads(Buffer.from(spelled, "utf16le").swap16()),
      utf32le: reads(utf32le(spelled)),
      utf8DecodingAlone: BACKEND_FAMILY.test(Buffer.from(spelled, "utf16le").toString("utf8")),
    };
    expect(witness, "the reader misses a NUL-bearing spelling").toStrictEqual({ utf16le: true, utf16be: true, utf32le: true, utf8DecodingAlone: false });
    return witness;
  },
  P5: async () => {
    const held = heldToGit(PLANTED, [join(PLANTED, "a.ts"), join(PLANTED, "local.log")], new Set([join(PLANTED, "a.ts"), join(PLANTED, "d", "b.ts")]));
    const witness = {
      argv: [...GIT_LISTING],
      read: held.read.map(path => relative(PLANTED, path)),
      unwalked: held.unwalked,
      failed: heldToGit(PLANTED, [join(PLANTED, "a.ts")], undefined),
      listsCensus: gitListed(join(REPO, "test"))?.has(join(REPO, CENSUS_FILE)) === true,
    };
    expect(witness, "the walk is not held to git's listing").toStrictEqual({
      argv: [...GIT_LISTING],
      read: ["a.ts"],
      unwalked: ["d/b.ts"],
      failed: { read: [], unwalked: ["<git ls-files failed>"] },
      listsCensus: true,
    });
    return witness;
  },
  X1: async () => {
    const hollow = withoutPin("C3");
    const gaps = exportGaps(hollow.rows, hollow.acceptance);
    expect(gaps, "the bead export no longer holds C3, the only pin judging '(c) a key on alias alone fails'").toEqual(["(c) a key on alias alone fails: no pin"]);
    return { pin: "C3", gaps };
  },
  X2: async () => {
    const hollow = withoutPin("B3");
    const gaps = exportGaps(hollow.rows, hollow.acceptance);
    expect(gaps, "R-COORDINATED: B3 removed from every literal at once is quiet while B1, B2, B4, B5 and B6 judge part (b)").toEqual([]);
    return { pin: "B3", gaps };
  },
  X3: async () => {
    const exported = readFileSync(BEADS_EXPORT, "utf8");
    const spaced = spacedExport(exported);
    const witness = { bead: BEAD, respaced: spaced !== exported && !spaced.includes(`"id":"${BEAD}"`), sameAcceptance: exportedAcceptance(spaced) === exportedAcceptance(exported) };
    expect(witness, "the export reader misses this bead's record once it is re-serialized with spaced separators").toStrictEqual({ bead: BEAD, respaced: true, sameAcceptance: true });
    return witness;
  },
  X4: async () => {
    const reported = Object.fromEntries(
      ROWS.flatMap(row => row.pins)
        .map(pin => [pin, anchorsReport(pin)] as const)
        .filter(([, report]) => report.length > 0),
    );
    expect(reported.MB9, "MB9, the one '.' must-hit, removed from every literal at once is unseen (the landing-349 S10 hollow)").toEqual(["MB ."]);
    expect(reported.C3, "C3, the one judge of '(c) a key on alias alone fails', removed from every literal at once is unseen").toEqual(["(c) a key on alias alone fails: no pin"]);
    return reported;
  },
  X5: async () => {
    const quiet = ROWS.flatMap(row => row.pins).filter(pin => anchorsReport(pin).length === 0);
    const mustHits = SPELLINGS.filter(spelling => spelling.hit).map(spelling => spelling.pin);
    expect(quiet, "R-COORDINATED: B3, X2's row, is not among the quiet pins").toContain("B3");
    expect(
      quiet.filter(pin => mustHits.includes(pin)),
      "R-COORDINATED: the must-hits whose every member and case form other must-hits still exercise",
    ).toEqual(["MB1", "MB2", "MD1"]);
    // One level up: row B's bracket without "." while MB9 goes with it reads no class gap (the roster's family ids and these
    // literals would move with it).
    const narrowed = new RegExp(DESCRIPTOR_FAMILY.source.split("_.+").join("_+"), DESCRIPTOR_FAMILY.flags);
    const dotted = SPELLINGS.find(spelling => spelling.pin === "MB9")?.text ?? "";
    const narrowedRead = {
      dropsDot: DESCRIPTOR_FAMILY.test(dotted) && !narrowed.test(dotted),
      gaps: classGaps(
        SPELLINGS.filter(spelling => spelling.pin !== "MB9").map(spelling => (spelling.family === DESCRIPTOR_FAMILY ? { ...spelling, family: narrowed } : spelling)),
        [{ row: "MB", family: narrowed, words: DESCRIPTOR_WORDS }],
      ),
    };
    expect(narrowedRead, "R-COORDINATED one level up: a matcher narrowed with its must-hit is not quiet to the class anchor").toStrictEqual({ dropsDot: true, gaps: [] });
    return { quiet, narrowed: narrowedRead };
  },
};

/** Each pin's witness, recorded after its compare (PREP F1; the reached-record class): the closing case reads it. */
const REACHED = new Map<string, Json>();
const JUDGED_SET = "the judged set: the frozen shape, the out-of-file roster, the tracked bead export and the cases agree";
const REGISTERED = "the registered tests: every pin registered once under its row, in run mode, not inverted, ran before this case and reached its witness compare";

describe("wb-a9l2.3 OwnerResource seven-field census (RF-HARNESS2-FEDERATED-PEER-R3, absent-today leg)", () => {
  it(JUDGED_SET, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:6", "C:3", "D:2", "MB:19", "MD:13", "P:5", "X:5"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ fields: [...SEVEN_FIELDS], gatingArtifacts: [...GATING_ARTIFACTS] }).toStrictEqual({
      fields: [...ROSTER.fields],
      gatingArtifacts: [...ROSTER.gatingArtifacts],
    });
    const witnesses = ROSTER.rows.flatMap(row => row.pins).map(pin => JSON.stringify(pin.witness));
    expect(witnesses.filter((witness, index) => witnesses.indexOf(witness) !== index), "two pins carry the same witness, so swapping their cases stays green").toEqual([]);
    expect(ACCEPTANCE.map(({ clause, part }) => ({ clause, part })), "ACCEPTANCE against the tracked bead export").toStrictEqual(exportedParts(exportedAcceptance()));
    const pins = ROWS.flatMap(row => row.pins);
    expect(ACCEPTANCE.flatMap(entry => entry.pins).filter(pin => !pins.includes(pin)), "ACCEPTANCE cites a pin no row holds").toEqual([]);
    expect(exportGaps(ROWS, ACCEPTANCE), "an ACCEPTANCE part with no pin, or a pin of rows A-D judging no part").toEqual([]);
    expect(classGaps(SPELLINGS), "a member or case form of a matcher's class, read from its own source, that no must-hit spelling exercises").toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.set(pin, witness);
        });
      }
    });
  }

  it(REGISTERED, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks, path: readonly string[]): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: [...path, child.name].join(" > "), mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks, [...path, child.name]);
      }
    };
    const [top] = task.file.tasks;
    if (top?.type === "suite") visit(top.tasks, []);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    const rosterPins = ROSTER.rows.flatMap(entry => entry.pins.map(pin => ({ row: entry, pin: pin.id })));
    const names = walked.map(entry => entry.name);
    expect(names, "every registered test of this file, in roster order (vitest task tree)").toEqual([
      JUDGED_SET,
      ...rosterPins.map(({ row, pin }) => `${row.id} ${row.label} > ${pin}`),
      REGISTERED,
    ]);
    expect(names.filter((name, index) => names.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "tests skipped, todo, inverted or not run before this case").toEqual([]);
    expect([...REACHED.keys()], "pins that reached their witness compare, in roster order").toEqual(rosterPins.map(({ pin }) => pin));
    for (const { pin } of rosterPins) expect(REACHED.get(pin), `${pin}'s recorded witness against the roster`).toStrictEqual(rosterWitness(pin));
  });
});
