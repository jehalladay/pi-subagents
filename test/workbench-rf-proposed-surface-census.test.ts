/**
 * wb-a9l2.7 (RF-HARNESS2-FEDERATED-PEER-R7, program-triage-2026-10-22), the absent-today leg. Statement (bead title): "No Pi
 * surface shall advertise, script or document any command, method name or capability leaf proposed by harness2-federated-peer
 * (<GATED_KIND> rows, federation receipts, their `rf graph test --candidate` shadow rendering) as installed until installed
 * source tests verify it; Pi pins today's absence and keeps the program opt-in (gated RFCLI-H2-05 via rfc-lr9nu.1/.2/.3, none
 * shipped at the pin)." harness2-federated-peer-2026-10-20/DEVELOPER.md:3@6a251bf73af5.
 *
 * <GATED_KIND> is the federated source kind the program proposes. This file and its roster never spell it: GATED_KIND
 * composes it from its two words at runtime and every label writes the placeholder (the wb-a9l2.2 census scans src, test,
 * docs and qa for every spelling of it).
 *
 * SOURCE (the owner filing quotes it): "All method names and commands proposed by the program are illustrative until
 * installed source tests verify them." (DEVELOPER.md:3); "no CLI command advertised until actual conformance" (README.md:37);
 * "Preserve this program's opt-in status until the real source implementation is verified." (DEVELOPER.md:64);
 * BEADS-2026-10-21.md:3 reads the program documents "as the pinned copies at main `740c1a817`". The acceptance is the owner
 * filing's, verbatim but for the placeholder: the labels of rows A, B and C below.
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-22, read-only git cat-file and git rev-parse on the local ReactiveFiberCLI checkout):
 * none of the three gating artifacts exists at 6a251bf73af5 - tests/journeys/test_federation_disabled_parity.py
 * (rfc-lr9nu.1), tests/integration/test_graph_test_<GATED_KIND>.py (rfc-lr9nu.2) and the program's
 * 03-qualification-receipt.md (rfc-lr9nu.3) - nor at the installed rf (0.1.832, commit 2618c211be0d), whose
 * `rf --json --version` result.leaves lists 79 leaves, none on a federation path. The program's README.md and DEVELOPER.md
 * are byte-identical at 740c1a817, 6a251bf73af5 and 978f6515c302 (blobs 1be8d2d21b91 and 8493a7fb33a8), its
 * BEADS-2026-10-21.md at the last two (d2464ec8ceb6); 978f6515c302 descends from 6a251bf73af5.
 *
 * READINGS
 * - PROPOSED: the program's proposed surface as three families, matched in any case: P1 <GATED_KIND> (its two words joined
 *   directly or by any run of white space, "_", "." or "-"); P2 a federation command (an rf command line whose first four
 *   words reach a word beginning federat, a dotted leaf or capability id with such a segment, or a federation receipt); P3
 *   the candidate shadow render (the flag --candidate, or shadow and render joined directly or by white space, "_" or "-").
 * - (a) A1 RECONCILE_EVIDENCE_READS.reactivefiber (src/workflow/reconcile.ts:67) is the pinned roster; A2 the reactivefiber.*
 *   descriptors of the native and the injected registration are the pinned roster, each read-class; A3 both input arms spawn
 *   one rf whose argv names context render (stand-in rf on PATH); A4 no src string or template literal spells a PROPOSED
 *   family and no argv array holds a federation word as an element (a TypeScript AST scan with a floor and a context render
 *   argv it must see); A5 no native or injected descriptor's
 *   JSON spells one; A6 a docs mention of a PROPOSED family is admitted only when a line it spans carries a NOT-INSTALLED
 *   marker (MARKERS: closed, whole words, any case), else it is named-as-available.
 * - (b) RECEIPT RULE: a registered reactivefiber.* descriptor outside the pinned roster is admitted only when ONE file of
 *   docs/workbench/receipts names its id as a whole token, carries the version command (`rf --json --version`, or its two
 *   flags in the other order) and quotes a result.leaves entry - a flat JSON object - whose path is the id's leaf (the id
 *   without "reactivefiber.") and whose served is true; otherwise, first failing condition first, receipt-absent,
 *   receipt-no-version-command, receipt-no-served-leaf or receipt-leaf-not-served. Every rf leaf registration beyond the
 *   roster is held to it: a federation leaf is one, and the rule does not try to tell federation leaves from others. B1
 *   applies it to the real registrations and receipts, B2-B6 to constructed ones (FED_ID).
 * - (c) CITATION: a locator of one of the program's documents (README, DEVELOPER or BEADS-2026-10-21, ".md" optional, then a
 *   colon and line numbers) joined to the program's directory or name (harness2-federated-peer with its optional date,
 *   federated-peer or h2fp, in any case, with any white space, "_", "." or "-" between the words) by only a slash or white
 *   space. Its pin is the hex token "@" attaches to it; without one, the hex tokens on the lines the citation spans.
 *   ADMITTED: a token equal to or extending 740c1a817 (BEADS-2026-10-21.md:3) or 6a251bf73af5 (the owner triage's read sha).
 *   foreign-pin: an attached pin that is not admitted; unpinned: no attached pin and no admitted token on its lines. C1 judges
 *   every docs file; C2 every string value of every row of the tracked bead export (.beads/issues.jsonl), where a line that
 *   does not parse is a finding of its own.
 * - KNOWN FINDINGS (measured at base 0b2a80f; reported, never admitted): C2 reads exactly two foreign-pin rows, wb-4nut.2 and
 *   wb-4nut.9 (owner filings of the harness2-reactive-evolution triage), whose citations carry 978f6515c302. FOREIGN_PIN_ROWS
 *   pins that pair set exactly, so a further foreign-pin or any unpinned citation reds; whether 978f6515c302 is admitted is
 *   the owner's ruling, not this census's.
 * OUTSIDE ANCHORS. F1: the owner filing row of wb-a9l2.7 in the tracked bead export carries every pinned constant verbatim,
 * its acceptance sentence names exactly the clauses rows A-C cover, and each of rows A-C's labels equals its clause there
 * (the placeholder composed back), so a relabelled or shortened label reds against the owner's own text.
 * The out-of-file roster test/fixtures/rf-proposed-surface-roster.json holds every row's id, label and pins, every pin's
 * witness and the pinned constants, so a pin deleted, relabelled, swapped or removed from every literal of this file at once
 * still reds against it. FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal.
 * RESIDUALS (named; each has a pinned quiet row in row R): R1 a locator joined to no program directory or name (README:37
 * alone) is not attributed, since one paragraph can carry several programs' README locators (measured: wb-4nut.9); R2 a
 * locator parted from the program name by any other word or a possessive is not joined; R3 a mention with no document
 * locator (the epic title, a filing's draft key) cites no statement; R4 a marker anywhere on a mention's lines admits it,
 * whatever the marker qualifies; R5 a paraphrase of the proposed surface outside P1-P3 - prose naming federation with no rf
 * command form, dotted segment or receipt (rf's federation surface; the program names federated-peer and
 * federated-workspaces) - is not caught; R6 a src comment, or a literal
 * composed at runtime from parts, is invisible to A4 (A5 is the runtime backstop for descriptor text only); R7 the receipt
 * rule reads text, so a receipt quoting a leaf entry it never captured from rf passes; R8 an admitted token anywhere on an
 * unattached citation's lines admits it, whatever the token qualifies.
 * SCOPE: the families, the markers and the leaf convention are this cut's reading of the filing; the producer facts above
 * are measured at the shas named and are not re-read here (the census is hermetic). A later cut that registers an rf leaf
 * flips PINNED_ROSTER and brings its receipt.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, docs, the receipts directory and
 * the bead export are only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  nativeReactiveFiberRender,
  type ReactiveFiberRenderSelector,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-proposed-surface-roster.json");
const BEAD_EXPORT = join(REPO, ".beads", "issues.jsonl");
const RECEIPTS_DIR = join(REPO, "docs", "workbench", "receipts");
const ROOT = process.cwd();
const BEAD = "wb-a9l2.7";

const WORD_A = "workspace";
const WORD_B = "resource";
/** The proposed source kind, composed at runtime so that no file of the scanned roots spells it (this one included). */
const GATED_KIND = [WORD_A, WORD_B].join("_");
const PLACEHOLDER = "<GATED_KIND>";

const PREVIEW_ID = "reactivefiber.render.preview";
const RF_PREFIX = "reactivefiber.";
/** Pi's rf capability roster at this cut: the reconcile evidence read (reconcile.ts:67) and both registrations. */
const PINNED_ROSTER: readonly string[] = [PREVIEW_ID];
const ROSTER_SITE = "src/workflow/reconcile.ts:67";
/** The version command a registering receipt carries; rf reads its two flags in either order. */
const VERSION_COMMANDS: readonly string[] = ["rf --json --version", "rf --version --json"];
/** BEADS-2026-10-21.md:3's pin and the owner triage's read sha. */
const ADMITTED_PINS: readonly string[] = ["740c1a817", "6a251bf73af5"];
/** The program's gating milestone and the beads that realise it (README.md:37; BEADS-2026-10-21.md:13, :14 and :20), as the
 * filing's title spells them. */
const GATING = "RFCLI-H2-05 via rfc-lr9nu.1/.2/.3";
/** The owner filing's children of epic wb-a9l2: each title carries an admitted citation. */
const FILING_ROWS: readonly string[] = [
  "wb-a9l2.1", "wb-a9l2.2", "wb-a9l2.3", "wb-a9l2.4", "wb-a9l2.5", "wb-a9l2.6", "wb-a9l2.7", "wb-a9l2.8",
];
/** Measured at base 0b2a80f: the only foreign-pin citations of the bead export, as row@pin (header, KNOWN FINDINGS). */
const FOREIGN_PIN_ROWS: readonly string[] = ["wb-4nut.2@978f6515c302", "wb-4nut.9@978f6515c302"];
/** A constructed federation leaf registration for the receipt rule's cases; no rf build serves it. */
const FED_LEAF = "federation.read";
const FED_ID = `${RF_PREFIX}${FED_LEAF}`;

/** The separator class P1 allows between its two words: any run of white space, "_", "." or "-". */
const SEP = "[\\s_.-]*";
interface Family {
  readonly id: string;
  readonly source: string;
}
/** The proposed surface (header, READINGS); each source is compiled case-insensitive. */
const PROPOSED: readonly Family[] = [
  { id: "P1", source: `${WORD_A}${SEP}${WORD_B}` },
  {
    id: "P2",
    source:
      "\\brf(?:\\s+[\\w.-]+){0,3}?\\s+-{0,2}federat\\w*|\\b[\\w-]+\\.federat\\w*|\\bfederat\\w*\\.[\\w-]+|\\bfederation[\\s_-]+receipts?\\b",
  },
  { id: "P3", source: "--candidate\\b|\\bshadow[\\s_-]*render" },
];
const familyHits = (text: string): string[] =>
  PROPOSED.filter(family => new RegExp(family.source, "i").test(text)).map(family => family.id);

/** The words that mark a docs mention as not installed. */
const MARKERS: readonly string[] = [
  "proposed", "illustrative", "unshipped", "not shipped", "not installed", "uninstalled", "unavailable", "not available",
  "not served", "gated",
];
const MARKER = new RegExp(`\\b(?:${MARKERS.map(marker => marker.split(" ").join("\\s+")).join("|")})\\b`, "i");

/** The program's name, with its optional date: harness2-federated-peer, federated-peer or h2fp. */
const NAME = "(?:\\bh2fp\\b|\\b(?:harness2[\\s_.-]*)?federated[\\s_.-]*peer(?:[\\s_.-]*2026-10-20)?)";
const LINK = "(?:\\s*/\\s*|\\s+)";
const DOC = "(?:README|DEVELOPER|BEADS(?:-2026-10-21)?)(?:\\.md)?";
const LINES = ":\\d+(?:-\\d+)?(?:\\s*,\\s*:?\\d+(?:-\\d+)?)*";
/** Group 1 is the locator, group 2 the attached pin. */
const CITATION = `${NAME}${LINK}(${DOC}${LINES})(?:@([0-9a-f]{7,40})(?![0-9a-z]))?`;
const HEX_TOKEN = "(?<![0-9a-z])[0-9a-f]{7,40}(?![0-9a-z])";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a guard asserts Pi's rf capability roster is reactivefiber.render.preview only (src/workflow/reconcile.ts:67) and Pi docs name no federation or <GATED_KIND> command as available",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6"],
  },
  {
    id: "B",
    label: "(b) a future federation leaf registration requires an `rf --json --version` capabilities receipt naming the served leaf",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6"],
  },
  {
    id: "C",
    label: "(c) Pi docs or bead notes citing harness2-federated-peer statements carry the 740c1a817 pin (BEADS:3) or the 6a251bf73af5 read sha, never an unpinned claim",
    pins: ["C1", "C2"],
  },
  {
    id: "F",
    label: "the owner filing row of wb-a9l2.7 in the tracked bead export carries every pinned constant, names exactly the clauses rows A-C cover and states each of their labels as its clause",
    pins: ["F1"],
  },
  {
    id: "M",
    label: "the citation matcher rows C1-C2 read, the export reader C2 reads and the mention matcher row A6 reads judge their pinned inputs in order",
    pins: ["MC1", "MC2", "MC3", "MC4", "MC5", "MC6", "MC7", "MC8", "MC9", "MC10", "MA1", "MA2", "MA3", "MA4", "MA5", "MA6", "MA7", "MA8", "ME1"],
  },
  {
    id: "R",
    label: "the named residuals R1-R8 stay pinned quiet",
    pins: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"],
  },
];

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
  readonly constants: Json;
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Object.hasOwn(raw, "constants")) {
    throw new Error("roster must be an object with constants and a rows list");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: JSON.parse(JSON.stringify(pin.witness)) as Json };
    });
    return { id: row.id, label: row.label, pins };
  });
  return { constants: JSON.parse(JSON.stringify(raw.constants)) as Json, rows };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The constants the roster pins beside the rows. */
function constants(): Json {
  return {
    pinnedRoster: [...PINNED_ROSTER],
    rosterSite: ROSTER_SITE,
    versionCommands: [...VERSION_COMMANDS],
    admittedPins: [...ADMITTED_PINS],
    gating: GATING,
    filingRows: [...FILING_ROWS],
    foreignPinRows: [...FOREIGN_PIN_ROWS],
    families: PROPOSED.map(family => family.id),
    markers: [...MARKERS],
    fedId: FED_ID,
  };
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
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
const digestOf = (texts: readonly string[]): string => createHash("sha256").update(JSON.stringify(texts)).digest("hex").slice(0, 16);

interface SourceFile {
  readonly path: string;
  readonly text: string;
}
/** The docs tree holds 66 files at base 0b2a80f; the floor sits below it, so an emptied walk reds and an additive one does not. */
const DOCS_FLOOR = 50;
const DOCS_ANCHOR = { file: "docs/workbench/13-contracts-and-config.md", token: PREVIEW_ID };
let docsCache: SourceFile[] | undefined;
function docsFiles(): SourceFile[] {
  docsCache ??= filesBelow(join(REPO, "docs")).map(file => ({ path: relative(REPO, file), text: textOf(file) }));
  return docsCache;
}
function docsWalk(): { floorMet: boolean; anchorRead: boolean } {
  const files = docsFiles();
  const anchor = files.find(file => file.path === DOCS_ANCHOR.file);
  const walk = { floorMet: files.length >= DOCS_FLOOR, anchorRead: anchor?.text.includes(DOCS_ANCHOR.token) === true };
  expect(walk, `docs: ${files.length} files walked, floor ${DOCS_FLOOR}, anchor ${DOCS_ANCHOR.file}`).toStrictEqual({ floorMet: true, anchorRead: true });
  return walk;
}

function lineStarts(text: string): number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index++) if (text[index] === "\n") starts.push(index + 1);
  return starts;
}
/** The 0-based line holding `offset`. */
function lineAt(starts: readonly number[], offset: number): number {
  let low = 0;
  let high = starts.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if ((starts[middle] ?? 0) <= offset) low = middle;
    else high = middle - 1;
  }
  return low;
}
/** The 1-based first line a match spans and the raw text of every line it spans. */
function spanOf(text: string, starts: readonly number[], at: number, length: number): { line: number; window: string } {
  const first = lineAt(starts, at);
  const last = lineAt(starts, at + Math.max(length, 1) - 1);
  const next = starts[last + 1];
  return { line: first + 1, window: text.slice(starts[first] ?? 0, next === undefined ? text.length : next - 1) };
}

interface Mention {
  readonly family: string;
  readonly line: number;
  readonly marked: boolean;
}
/** Every PROPOSED match of a text, family by family, with whether a line it spans carries a marker. */
function mentionsOf(text: string): Mention[] {
  const starts = lineStarts(text);
  return PROPOSED.flatMap(family =>
    [...text.matchAll(new RegExp(family.source, "gi"))].map(match => {
      const span = spanOf(text, starts, match.index ?? 0, match[0].length);
      return { family: family.id, line: span.line, marked: MARKER.test(span.window) };
    }),
  );
}
function docsMentionFindings(files: readonly SourceFile[]): string[] {
  return files.flatMap(file =>
    mentionsOf(file.text).filter(mention => !mention.marked).map(mention => `${file.path}:${mention.line} ${mention.family}: named-as-available`),
  );
}

type Diagnosis = "admitted" | "foreign-pin" | "unpinned";
interface Citation {
  readonly locator: string;
  readonly line: number;
  readonly pin: string | null;
  readonly diagnosis: Diagnosis;
}
const admitted = (token: string): boolean => ADMITTED_PINS.some(pin => token.toLowerCase().startsWith(pin));
function diagnose(attached: string | undefined, window: string): Diagnosis {
  if (attached !== undefined) return admitted(attached) ? "admitted" : "foreign-pin";
  return [...window.matchAll(new RegExp(HEX_TOKEN, "gi"))].some(token => admitted(token[0])) ? "admitted" : "unpinned";
}
/** Every program citation of a text with its pin and diagnosis (header, READINGS (c)). */
function citationsOf(text: string): Citation[] {
  const starts = lineStarts(text);
  return [...text.matchAll(new RegExp(CITATION, "gi"))].map(match => {
    const span = spanOf(text, starts, match.index ?? 0, match[0].length);
    const attached = match[2];
    return {
      locator: match[1] ?? "",
      line: span.line,
      pin: attached === undefined ? null : attached.toLowerCase(),
      diagnosis: diagnose(attached, span.window),
    };
  });
}
function docsCitationFindings(files: readonly SourceFile[]): string[] {
  return files.flatMap(file =>
    citationsOf(file.text).filter(citation => citation.diagnosis !== "admitted").map(citation => `${file.path}:${citation.line} ${citation.locator}: ${citation.diagnosis}`),
  );
}

interface ExportRow {
  readonly id: string;
  readonly strings: readonly string[];
}
interface BeadExport {
  readonly rows: ExportRow[];
  readonly unreadable: string[];
}
/** A bead export's rows (id and string values, nested ones included); an unparsable line is kept as a finding. */
function parseExport(text: string): BeadExport {
  const rows: ExportRow[] = [];
  const unreadable: string[] = [];
  const lines = text.split("\n");
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index] ?? "";
    if (line.trim() === "") continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(line);
    } catch {
      unreadable.push(`line ${index + 1} unreadable`);
      continue;
    }
    rows.push({ id: isObject(parsed) && typeof parsed.id === "string" ? parsed.id : `line ${index + 1}`, strings: stringLeaves(parsed) });
  }
  return { rows, unreadable };
}
let exportCache: BeadExport | undefined;
/** The tracked bead export, read once. */
function beadExport(): BeadExport {
  exportCache ??= parseExport(textOf(BEAD_EXPORT));
  return exportCache;
}
/** Row C2's reading of an export: unpinned citations, foreign row@pin pairs and the rows holding an admitted citation. */
function readExport(data: BeadExport): { unpinned: string[]; foreignPinPairs: string[]; citing: Set<string> } {
  const unpinned: string[] = [];
  const foreign = new Set<string>();
  const citing = new Set<string>();
  for (const row of data.rows) {
    for (const value of row.strings) {
      for (const citation of citationsOf(value)) {
        if (citation.diagnosis === "unpinned") unpinned.push(`${row.id} ${citation.locator}`);
        else if (citation.diagnosis === "foreign-pin") foreign.add(`${row.id}@${citation.pin ?? ""}`);
        else citing.add(row.id);
      }
    }
  }
  return { unpinned, foreignPinPairs: [...foreign].sort(), citing };
}
/** The export holds 672 rows at base 0b2a80f. */
const EXPORT_FLOOR = 500;

let nativeCache: Promise<{ id: string; effectClass: string; text: string }[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<{ id: string; effectClass: string; text: string }[]> {
  nativeCache ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => ({
      id: entry.descriptor.id,
      effectClass: entry.descriptor.effectClass,
      text: JSON.stringify(entry.descriptor),
    }));
  });
  return nativeCache;
}
/** The injected registration's descriptors; its reader is never invoked here. */
function injectedDescriptors(): { id: string; effectClass: string; text: string }[] {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    throw new Error("the injected reader is never invoked here");
  }, ROOT);
  return registry.catalogSnapshot().map(entry => ({
    id: entry.descriptor.id,
    effectClass: entry.descriptor.effectClass,
    text: JSON.stringify(entry.descriptor),
  }));
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `envelope` and exits 0. */
function standInRf(envelope: Json): string {
  const folder = makeScratch("rf-proposed-surface-");
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
async function spawnedArgv(selector: ReactiveFiberRenderSelector): Promise<string[][]> {
  const log = standInRf(fullShapeRf(ROOT));
  await nativeReactiveFiberRender(selector, ROOT);
  return textOf(log)
    .trim()
    .split("\n")
    .filter(Boolean)
    .map(line => (JSON.parse(line) as string[]).map(item => (item === ROOT ? "<root>" : item)));
}

/** An argv element that is a federation word ("federation", "--federated", ...). */
const ARGV_FEDERATION = /^-{0,2}federat\w*$/i;
interface ScriptScan {
  readonly hits: string[];
  readonly renderArgv: number;
}
/** One module's string and template literals spelling a PROPOSED family, and its context render argv arrays. */
function scanScripts(fileName: string, text: string): ScriptScan {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const hits: string[] = [];
  let renderArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const elements = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ""));
      if (elements.some((element, index) => element === "context" && elements[index + 1] === "render")) renderArgv += 1;
      if (elements.some(element => ARGV_FEDERATION.test(element))) hits.push(`${fileName}: argv federation`);
    }
    if (ts.isStringLiteralLike(node)) {
      const families = familyHits(node.text);
      if (families.length > 0) hits.push(`${fileName}: ${families.join("+")}`);
    }
    if (ts.isTemplateExpression(node)) {
      const families = familyHits([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" "));
      if (families.length > 0) hits.push(`${fileName}: ${families.join("+")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { hits, renderArgv };
}

/** Whether `text` names `token` as a whole token (a trailing full stop ends a sentence, not the token). */
function namesToken(text: string, token: string): boolean {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![\\w.])${escaped}(?![\\w]|\\.\\w)`).test(text);
}
/** Every flat JSON object of a text that reads as a result.leaves entry: a string path and a boolean served. */
function leafEntries(text: string): { path: string; served: boolean }[] {
  const entries: { path: string; served: boolean }[] = [];
  for (const match of text.matchAll(/\{[^{}]*\}/g)) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(match[0]);
    } catch {
      continue;
    }
    if (isObject(parsed) && typeof parsed.path === "string" && typeof parsed.served === "boolean") {
      entries.push({ path: parsed.path, served: parsed.served });
    }
  }
  return entries;
}
/** The receipt rule (header, READINGS (b)) over registered ids and receipt texts: one finding per unadmitted id. */
function registrationFindings(ids: readonly string[], receipts: readonly string[]): string[] {
  const findings: string[] = [];
  for (const id of ids.filter(entry => entry.startsWith(RF_PREFIX) && !PINNED_ROSTER.includes(entry))) {
    const naming = receipts.filter(text => namesToken(text, id));
    const versioned = naming.filter(text => VERSION_COMMANDS.some(command => text.includes(command)));
    const entries = versioned.flatMap(leafEntries).filter(entry => entry.path === id.slice(RF_PREFIX.length));
    if (naming.length === 0) findings.push(`${id}: receipt-absent`);
    else if (versioned.length === 0) findings.push(`${id}: receipt-no-version-command`);
    else if (entries.length === 0) findings.push(`${id}: receipt-no-served-leaf`);
    else if (!entries.some(entry => entry.served)) findings.push(`${id}: receipt-leaf-not-served`);
  }
  return findings;
}
/** One result.leaves entry in the shape the installed rf prints (measured at 0.1.832). */
function leafJson(path: string, served: boolean): string {
  return JSON.stringify({
    path, served, planned_slice: served ? null : 17, reachable: served, store_required: false,
    availability: served ? "served_reachable" : "refusing_slice", attach_required: false,
  });
}

type CaseKind = "citation" | "mention" | "script" | "receipt" | "export";
interface Case {
  readonly pin: string;
  readonly kind: CaseKind;
  readonly texts: readonly string[];
  readonly outcome: readonly string[];
}
const caps = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
const REGISTERS = `# wb-x: registers ${FED_ID}`;
/** B2-B6 judge constructed receipts, M the two matchers, R the residuals' quiet rows. */
const CASES: readonly Case[] = [
  { pin: "B2", kind: "receipt", texts: [], outcome: [`${FED_ID}: receipt-absent`] },
  { pin: "B3", kind: "receipt", texts: [REGISTERS, `\`rf --json --version\` -> ${leafJson(FED_LEAF, true)}`], outcome: [`${FED_ID}: receipt-no-version-command`] },
  { pin: "B4", kind: "receipt", texts: [`${REGISTERS}; \`rf --json --version\` -> ${leafJson("graph.test", true)}`], outcome: [`${FED_ID}: receipt-no-served-leaf`] },
  { pin: "B5", kind: "receipt", texts: [`${REGISTERS}; \`rf --json --version\` -> ${leafJson(FED_LEAF, false)}`], outcome: [`${FED_ID}: receipt-leaf-not-served`] },
  { pin: "B6", kind: "receipt", texts: [`${REGISTERS}.\n\`rf --version --json\` -> ${leafJson(FED_LEAF, true)}`], outcome: [] },
  { pin: "MC1", kind: "citation", texts: ["Quote. harness2-federated-peer-2026-10-20/DEVELOPER.md:3@6a251bf73af5. Authority follows."], outcome: ["admitted"] },
  { pin: "MC2", kind: "citation", texts: ["docs/programs/harness2-federated-peer-2026-10-20/README.md:37@740c1a817"], outcome: ["admitted"] },
  { pin: "MC3", kind: "citation", texts: ["harness2-federated-peer-2026-10-20/BEADS-2026-10-21.md:20@6a251bf73af57c3a703caf6892dfe3015e06a481"], outcome: ["admitted"] },
  { pin: "MC4", kind: "citation", texts: ["RF harness2-federated-peer README.md:43@978f6515c302."], outcome: ["foreign-pin"] },
  { pin: "MC5", kind: "citation", texts: ["(RF federated-peer README.md:33@6a251bf)"], outcome: ["foreign-pin"] },
  { pin: "MC6", kind: "citation", texts: ["HARNESS2 FEDERATED PEER readme.md:37 read at 6A251BF73AF5"], outcome: ["admitted"] },
  { pin: "MC7", kind: "citation", texts: ["harness2-federated-peer README:37 says so.\nRead at 6a251bf73af5."], outcome: ["unpinned"] },
  { pin: "MC8", kind: "citation", texts: ["per h2fp DEVELOPER.md:64 the program stays opt-in"], outcome: ["unpinned"] },
  { pin: "MC9", kind: "citation", texts: ["harness2-federated-peer\nREADME.md:37@6a251bf73af5"], outcome: ["admitted"] },
  { pin: "MC10", kind: "citation", texts: ["harness2_federated_peer BEADS:13, :14, :20 at 740c1a817;\nFederated-Peer DEVELOPER:52"], outcome: ["admitted", "unpinned"] },
  { pin: "MA1", kind: "mention", texts: ["Pi runs `rf federation import --json` to read a peer."], outcome: ["P2:available"] },
  { pin: "MA2", kind: "mention", texts: [`Pi reads ${WORD_A}_${WORD_B} rows.`], outcome: ["P1:available"] },
  { pin: "MA3", kind: "mention", texts: ["`rf graph test --candidate C --json` shadow-renders the row."], outcome: ["P3:available", "P3:available"] },
  { pin: "MA4", kind: "mention", texts: ["rf federation import is proposed: illustrative until installed source tests verify it."], outcome: ["P2:marked"] },
  { pin: "MA5", kind: "mention", texts: [`A ${caps(WORD_A)} ${caps(WORD_B)} row is not installed;\nrf graph federate stays gated.`], outcome: ["P1:marked", "P2:marked"] },
  { pin: "MA6", kind: "mention", texts: [`Pi registers ${FED_ID} for peers.`], outcome: ["P2:available"] },
  { pin: "MA7", kind: "mention", texts: ["Pi stores Federation Receipts beside the run."], outcome: ["P2:available"] },
  { pin: "MA8", kind: "mention", texts: ["Pi runs `rf federation import --json`.\nThat surface is proposed."], outcome: ["P2:available"] },
  {
    pin: "ME1",
    kind: "export",
    texts: [
      [
        JSON.stringify({ id: "wb-x.1", notes: "Authority: harness2-federated-peer README.md:37." }),
        JSON.stringify({ id: "wb-x.2", title: "harness2-federated-peer README.md:43@978f6515c302" }),
        "{not json",
      ].join("\n"),
    ],
    outcome: ["wb-x.1 README.md:37", "wb-x.2@978f6515c302", "line 3 unreadable"],
  },
  { pin: "R1", kind: "citation", texts: ["README:37 and BEADS:3 pin this; DEVELOPER.md:64 too."], outcome: [] },
  { pin: "R2", kind: "citation", texts: ["harness2-federated-peer's README.md:37 and the federated-peer program README.md:51"], outcome: [] },
  { pin: "R3", kind: "citation", texts: ["EPIC: rf-harness2-federated-peer obligations; source harness2-federated-peer-2026-10-20/h2fp-proposed-commands-illustrative"], outcome: [] },
  { pin: "R4", kind: "mention", texts: ["rf federation import is available today; it is no longer proposed."], outcome: ["P2:marked"] },
  { pin: "R5", kind: "mention", texts: ["Pi exchanges owner-published typed resources with a peer harness; rf's federation surface and the federated-peer program are prose here."], outcome: [] },
  { pin: "R6", kind: "script", texts: ['// rf federation import --candidate\nconst flag = "--" + "candi" + "date";\nspawn("rf", ["fede" + "ration", flag]);'], outcome: [] },
  { pin: "R7", kind: "receipt", texts: [`registers ${FED_ID}; rf --json --version would print {"path": "${FED_LEAF}", "served": true}`], outcome: [] },
  { pin: "R8", kind: "citation", texts: ["harness2-federated-peer README:37 (no pin of its own) beside harness2-federated-peer DEVELOPER.md:3@6a251bf73af5"], outcome: ["admitted", "admitted"] },
];
function outcomeOf(kind: CaseKind, texts: readonly string[]): string[] {
  const text = texts[0] ?? "";
  if (kind === "citation") return citationsOf(text).map(citation => citation.diagnosis);
  if (kind === "mention") return mentionsOf(text).map(mention => `${mention.family}:${mention.marked ? "marked" : "available"}`);
  if (kind === "script") return scanScripts("control.ts", text).hits;
  if (kind === "export") {
    const data = parseExport(text);
    const reading = readExport(data);
    return [...reading.unpinned, ...reading.foreignPinPairs, ...data.unreadable];
  }
  return registrationFindings([PREVIEW_ID, FED_ID], texts);
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const reactivefiber = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    expect(reactivefiber).toStrictEqual([...PINNED_ROSTER]);
    return { site: ROSTER_SITE, reactivefiber };
  },
  A2: async () => {
    const rf = (descriptors: { id: string; effectClass: string }[]): Json =>
      descriptors.filter(descriptor => descriptor.id.startsWith(RF_PREFIX)).map(({ id, effectClass }) => ({ id, effectClass }));
    const native = rf(await nativeDescriptors());
    const injected = rf(injectedDescriptors());
    const pinned = PINNED_ROSTER.map(id => ({ id, effectClass: "read" }));
    expect(native).toStrictEqual(pinned);
    expect(injected).toStrictEqual(pinned);
    return { native, injected };
  },
  A3: async () => {
    const legacy = await spawnedArgv({ model: "m", task: "t" });
    const view = await spawnedArgv({ view: "v", taskId: "t", model: "m" });
    const verbs = [...legacy, ...view].map(argv => argv.slice(2, 4).join(" "));
    expect({ spawns: [legacy.length, view.length], verbs }).toStrictEqual({ spawns: [1, 1], verbs: ["context render", "context render"] });
    return { legacy, view };
  },
  A4: async () => {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    const found = files.map(file => scanScripts(relative(REPO, file), textOf(file)));
    const hits = found.flatMap(result => result.hits);
    const srcFloorMet = files.length >= 100;
    const renderArgvSeen = found.reduce((sum, result) => sum + result.renderArgv, 0) >= 1;
    expect({ srcFloorMet, renderArgvSeen }, `src modules walked: ${files.length}`).toStrictEqual({ srcFloorMet: true, renderArgvSeen: true });
    expect(hits, "a src literal spelling the proposed surface").toEqual([]);
    const control = (text: string): number => scanScripts("control.ts", text).hits.length;
    const controls = {
      argvFlag: control('spawn("rf", ["graph", "test", "--candidate", c, "--json"]);'),
      literalFamily: control('const cmd = "rf federation import --json";'),
      template: control(["const cmd = `rf graph test $", "{c} shadow-render`;"].join("")),
      gatedLiteral: control(`const kind = "${WORD_A}_${WORD_B}";`),
      argvFederation: control('spawn("rf", ["--workspace", w, "federation", "import"]);'),
    };
    return { srcFloorMet, renderArgvSeen, hits, controls };
  },
  A5: async () => {
    const descriptors = [...(await nativeDescriptors()), ...injectedDescriptors()];
    const hits = descriptors.filter(descriptor => familyHits(descriptor.text).length > 0).map(descriptor => descriptor.id);
    const descriptorFloorMet = descriptors.length >= 5;
    expect(descriptorFloorMet, `descriptors: ${descriptors.map(descriptor => descriptor.id).join(", ")}`).toBe(true);
    expect(hits).toEqual([]);
    return { descriptorFloorMet, families: PROPOSED.map(family => family.id), hits };
  },
  A6: async () => {
    const walk = docsWalk();
    const findings = docsMentionFindings(docsFiles());
    expect(findings, "a docs mention naming the proposed surface as available").toEqual([]);
    return { ...walk, markers: MARKERS.length, findings };
  },
  B1: async () => {
    const ids = [...(await nativeDescriptors()), ...injectedDescriptors()].map(descriptor => descriptor.id);
    const receipts = filesBelow(RECEIPTS_DIR).filter(file => file.endsWith(".md")).map(textOf);
    const receiptsFloorMet = receipts.length >= 30;
    const beyondRoster = [...new Set(ids.filter(id => id.startsWith(RF_PREFIX) && !PINNED_ROSTER.includes(id)))];
    const findings = registrationFindings(ids, receipts);
    expect(receiptsFloorMet, `receipts read: ${receipts.length}`).toBe(true);
    expect({ beyondRoster, findings }).toStrictEqual({ beyondRoster: [], findings: [] });
    return { receiptsFloorMet, beyondRoster, findings };
  },
  C1: async () => {
    const walk = docsWalk();
    const findings = docsCitationFindings(docsFiles());
    expect(findings, "a docs citation of the program without an admitted pin").toEqual([]);
    return { ...walk, admittedPins: [...ADMITTED_PINS], findings };
  },
  C2: async () => {
    const data = beadExport();
    const { unpinned, foreignPinPairs, citing } = readExport(data);
    const reading = {
      rowsFloorMet: data.rows.length >= EXPORT_FLOOR,
      unreadable: data.unreadable,
      filingRowsCiting: FILING_ROWS.filter(id => citing.has(id)),
      unpinned,
      foreignPinPairs,
    };
    expect(reading).toStrictEqual({
      rowsFloorMet: true,
      unreadable: [],
      filingRowsCiting: [...FILING_ROWS],
      unpinned: [],
      foreignPinPairs: [...FOREIGN_PIN_ROWS],
    });
    return reading;
  },
  F1: async () => {
    const row = beadExport().rows.find(entry => entry.id === BEAD);
    expect(row, `${BEAD} is missing from the bead export`).toBeDefined();
    const text = (row?.strings ?? []).join("\n");
    // The filing's acceptance sentence, cut into its "(x) ..." clauses; each judged label must equal its clause.
    const acceptance = /Acceptance: ([\s\S]*?)\s*(?:Related:|$)/.exec(text)?.[1] ?? "";
    const clauseTexts = acceptance.split(/;\s+(?=\([a-z]\) )/).map(clause => clause.replace(/\.$/, ""));
    const clauses = clauseTexts.map(clause => /^\(([a-z])\) /.exec(clause)?.[1] ?? "");
    const judged = ROWS.filter(entry => /^\([a-z]\) /.test(entry.label));
    const labelsEqual = judged.filter((entry, index) => clauseTexts[index] === entry.label.replace(PLACEHOLDER, GATED_KIND)).map(entry => entry.id);
    const pinned = [...PINNED_ROSTER, ROSTER_SITE, VERSION_COMMANDS[0] ?? "", ...ADMITTED_PINS, GATING];
    const constantsQuoted = pinned.filter(constant => text.includes(constant));
    expect(clauses, "the filing's acceptance clauses against the judged rows").toEqual(judged.map(entry => entry.label.charAt(1)));
    expect(labelsEqual, "each judged label equals its acceptance clause").toEqual(judged.map(entry => entry.id));
    expect(constantsQuoted).toEqual(pinned);
    return { clauses, labelsEqual, constantsQuoted };
  },
  ...Object.fromEntries(
    CASES.map(entry => [
      entry.pin,
      async () => {
        const outcome = outcomeOf(entry.kind, entry.texts);
        expect(outcome).toStrictEqual([...entry.outcome]);
        return { digest: digestOf(entry.texts), outcome };
      },
    ]),
  ),
};

describe("wb-a9l2.7 proposed-surface census (RF-HARNESS2-FEDERATED-PEER-R7, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:6", "B:6", "C:2", "F:1", "M:19", "R:8"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(constants()).toStrictEqual(ROSTER.constants);
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
