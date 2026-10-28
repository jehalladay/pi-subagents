/**
 * wb-4nut.1 (TSX-HARNESS2-REACTIVE-EVOLUTION-R1, program-triage-2026-10-22), the Fiber debug identity census. Statement (bead
 * title, verbatim to its citation): "No Pi surface, including hosted Claude agents doing visual debugging, shall upgrade a UI/React
 * Fiber debug ID or screenshot into a FiberOptics component/port identity without an explicit, revisioned, traceable witness
 * (gated TSX-H2-03 UI-element-to-Fiber public ref witness: unshipped, itself gated on the TSX-H2-ADR ADOPT verdict; the
 * never-upgrade posture is pinnable today)" (ReactiveFiberTSXSDK docs/programs/harness2-reactive-evolution-2026-10-20/
 * README.md:26@76bbbffd9d4a). Acceptance (owner filing, verbatim; the labels of rows A to C quote it): "(a) fixture: evidence
 * carrying a React debug id and no witness yields a Pi relation of at most 'possibly-related', never a Fiber identity edge; (b) a
 * witness-less mapping claim in a Pi projection or hosted-agent report is refused; (c) docs census: no Pi doc describes
 * screenshot/debug-id to Fiber mapping as available."
 *
 * MEASURED (read-only git show by the cutting seat, 2026-10-23; every producer fact rides the roster with its blob id): the program
 * (README.md:26 and :47, DEVELOPER.md:50 H2-NEG-04) holds that a UI/React Fiber debugging ID is not FiberOptics identity and that a
 * screenshot or debug ID without an explicit witness cannot be upgraded to a direct Fiber mapping; the witness is TSX-H2-03's
 * "UI element->Fiber public ref witness, renderer revision and source-cut binding" (README.md:36), a gated work package not created
 * until TSX-H2-ADR (rftsx-rupqh) records ADOPT (BEADS-2026-10-21.md:48). At the pin the producer's src/ and python/ spell no debug
 * id, screenshot, UI element, public ref or mapping token (git grep, 0 rows each): no witness ships. FiberOptics names a component
 * a NodeRef ([*bundle, "nodes", name]) and a port a PortRef ([*bundle, "inputs"|"outputs", name]) (FiberOpticsSDK
 * src/fiber_optics/refs.py@e803f66c5fb9); FIBER_NODE and FIBER_PORT below are ids of those forms.
 *
 * Pi's relation vocabulary is ObservationProjection's: relate() states only dependency, causation, ownership, grouping and
 * hypothesis, and ownership only with a native confirmation from the owner's own provider. Pi's "possibly-related" is hypothesis:
 * the topology slice reads it as inferred-hypothesis, the one non-authoritative class, and a hypothesis-only neighbourhood as an
 * incomplete trace. No kind or class is an identity. The census pins that against the acceptance:
 *  A, the fixture, (a). A1 visual-debug evidence through every admission path a projection has - a React DevTools fiber id event
 *    whose correlation ids and evidence refs name the FiberOptics component and port, a screenshot snapshot, a React ref whose id
 *    equals the component's, and a hosted Claude agent's visual-debugging sample through the session adapter - beside the component
 *    and port snapshots: every input is applied, the equal-id ref stays a node of its own, no edge touches a visual or FiberOptics
 *    node, the projection's only edges are the agent adapter's, both FiberOptics slices read no observed relations, and the agent's
 *    read (workflow_observe) counts none for them while the evidence rides verbatim as evidence refs. A2 the ceiling: relate()
 *    accepts exactly the five kinds, the slice maps them one to one onto TOPOLOGY_RELATION_CLASSES with only inferred-hypothesis
 *    non-authoritative, the agent's read counts the same five, and a producer-stated hypothesis from the debug ref to the component
 *    reads inferred-hypothesis, non-authoritative, hypothesis-only. A3 the trigger: no src or qa file spells the mapping VOCABULARY
 *    (folded; ReactiveFiber's own spellings removed first), with floors, anchors and controls, and the files the scan judges are
 *    exactly the files Node's own recursive listing names below each root (whole, wb-52pt F1); a module spelling it must be bound in
 *    MAPPING_READERS and every binding must name such a module (empty both ways today). Its positive control is PLANTED (wb-u29w F1,
 *    nested and multi-line since wb-52pt F1): each flagged control in a scratch module of its own, 1 to 5 directories below the plant
 *    root (src and qa files reach 3) and alone, first, between quiet lines or last, the controls in code, a property read, an import,
 *    an export line, a double-quoted, a single-quoted and a template string, a whole-line and a trailing line comment, a whole-line
 *    and a trailing one-line block comment, a plain and a JSDoc block across three lines and lines indented by spaces and by a tab;
 *    three long plants whose control sits last, first or in the middle of filler runs each longer than the longest src or qa text in
 *    characters, in UTF-8 bytes and in lines; and a long-line plant whose control sits in the middle of one line, between filler runs
 *    each longer than the longest src or qa line in characters and in bytes (wb-52pt cut #2; bytes since wb-y4c9 F2, each run checked
 *    against both measures) - beside a quiet anchor module holding every quiet control, goes through the one scan src and qa go
 *    through (vocabularyScan), which spells for each plant exactly the tokens its control spells. What the listing and the plants
 *    prove, and no more (wb-52pt cut #2, answering the cut #1 refusal U1): a scan reds that walks less than the listed tree, or whose
 *    judge keeps of each file only a head window, a tail window or a head-and-tail pair of a fixed number of lines or of characters
 *    (or of bytes, wb-y4c9 F2), cuts each line to such a window of characters (or of bytes), or skips files or drops lines longer
 *    than a fixed length (in characters or in bytes), whenever the window (each window of the pair) or the length is shorter than the
 *    longest src or qa text or line in its measure - as it is whenever the read hides any part of one; and so does a judge that drops
 *    or blanks any one of these: whole-line or trailing line comments, block comments on one line (whole-line or trailing) or across
 *    lines (plain or JSDoc) or their continuation lines; double-quoted, single-quoted or template strings; import or export lines;
 *    lines indented by spaces or by a tab; every other line (either parity). Any other partial read is not claimed (Not claimed,
 *    below).
 *  B, the refusal, (b). B1 relate() refuses every identity spelling a mapping claim would state ("Unknown relationship kind.") and the
 *    ownership form without the owner's own confirmation, each with no effect. B2 a reader serving the claim as a stored row: the
 *    slice reads it as an unknown-relation-kind reference, never an edge, and the agent's read counts nothing and flags partial. B3 the
 *    hosted-agent report: the session adapter states only its fixed ownership, causation and grouping edges for a visual-debugging
 *    sample whose label and tool names carry the claim, a report member riding the sample is read nowhere, and src's relate() call
 *    sites are exactly the three ownership adapters (src/index.ts, which ingests the hosted agents' nodes, relates nothing). B4 the
 *    witness rule, armed (witnessViolations) for the first mapping reader: the honest reader passes every claim, and reading
 *    identity from a debug id, a screenshot, id equality, an agent report or a partial witness fails, as do synthesizing the
 *    revision, dropping or rewriting the witness, and ignoring a witness that names another target. B5 every bound reader meets B4
 *    (none bound; the same loop over synthetic bindings is the non-vacuity control).
 *  C, the docs census, (c). C1 every markdown file outside test/ (the root docs, .agents, .beads, .pi, docs, examples, new-feedback,
 *    vendor) read in block units (a paragraph, list item, table row, heading or fence line with its continuation lines): no unit
 *    couples the visual family (screenshot, React debug id, devtools, UI element) with a Fiber word (FiberOptics, Fiber ref or
 *    identity; rf's own ReactiveFiber spellings excluded), with floors, every named root and file read, and anchors on both families.
 *    Its positive control is PLANTED (wb-u29w F1, nested and multi-unit since wb-gy3t and wb-52pt F1): each C2 control in a scratch
 *    markdown file of its own - each flagged one at 1 to 6 path segments (Pi docs reach 4) and alone, first, between quiet units or
 *    last, the flagged ones units of every kind (paragraphs, one of them on two lines, a bullet and a numbered list item, a table row,
 *    a heading, a fence line with its continuation, a quote and an HTML unit); three long plants whose flagged unit sits last, first
 *    or in the middle of filler runs each longer than the longest Pi doc in characters, in UTF-8 bytes and in units; and a long-unit
 *    plant, one unit whose coupled sentence sits in its middle, between filler runs each longer than the longest Pi doc unit in
 *    characters and in bytes (wb-52pt cut #2; bytes since wb-y4c9 F2, each run checked against both measures) - and a flagged one
 *    below every DOC_SKIP root and two nested node_modules, go through the one scan the repository goes through (docScan, whose claim
 *    judge is claimUnitsOf, the one C2 controls through claimUnitsIn): it reads exactly the flagged and quiet plants, its claims are
 *    exactly the flagged controls' coupled units (one each, as C2 reads them), and the skip plants are on disk and unread (skipped,
 *    held to the roster: wb-52pt F2). What the plants prove, and no more (wb-52pt cut #2, answering the cut #1 refusal U1b): a
 *    docScan whose read or claim judge keeps of each file only a head window, a tail window or a head-and-tail pair of a fixed number
 *    of units or of characters (or of bytes, wb-y4c9 F2), cuts each unit to such a window of characters (or of bytes), or skips files
 *    or drops units longer than a fixed length (in characters or in bytes) reds, whenever the window (each window of the pair) or the
 *    length is shorter than the longest Pi doc or unit in its measure - as it is whenever the read hides any part of one; and so does
 *    one that drops paragraphs, headings, fence lines, quotes, HTML units, table rows, bullet or numbered list items or every other
 *    unit (either parity), or joins no continuation line. Any other partial read is not claimed (Not claimed, below). C2 the judge's
 *    controls.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the whole judged set - every row's id, label and
 * pins, every pin's witness, the constants, the vocabularies and the residual families and every registered test title - is held to
 * the out-of-file roster, whose producer facts anchor the constants outside this file, and the labels of rows A to C are held to the
 * bead's own acceptance text in its owner filing, the first paragraph of its notes in the tracker export (.beads/issues.jsonl). No
 * case reads the whole notes: the lane appends a note after every cut and every gate and a ledger hop exports each one, so every
 * reading of the export goes through the owner filing, which the append-only notes keep byte-stable (Q6 holds its own reading to an
 * appended note). The first case also reads the vitest task tree as collected (every registered test, the last case included, in
 * roster order, in run mode, not inverted); the last case reads it as run (each other test in run mode, ran before it), and the two
 * records every pin's case keeps (wb-u29w F2): COMPARED, each pin whose compare read the roster's witness (rosterWitness records
 * every read), once and in row order, and REACHED, each pin that passed its compare with the witness it compared, held again to a
 * fresh read of the roster - so a compare weakened to read no expected witness, or skipped behind a return with a forged record,
 * reds the last case. Not claimed: an edit of this file and the roster together - the bead text anchors only the labels of rows A to
 * C; a scan edited to tell the planted scratch from the repository (by its base or a plant's path) - the plants prove only the
 * partial reads rows A3 and C1 name, not that the scans read whole texts, nor that they read the repository the way they read the
 * plants; any partial read of another shape (wb-52pt cut #2, the cut #1 refusal U1 and U1b), among them a window sized as a share of
 * each file, line or unit (a head-and-tail pair of shares can reach a middle control), a sampling of lines or units other than every
 * other one, a judge that skips by path or by name a file the walk listed (no A3 plant path names a repository directory; C1's plants
 * sit under docs/, docs/workbench/ and docs/workbench/receipts/, so a C1 judge that skips a file below one of those by path reds:
 * wb-y4c9 F1), a read keyed on any syntax, word or text no plant holds, and a cut inside a reader the expectations share (tokensIn,
 * wordsOf, unitsOf, claimUnitsOf; there only the in-case control checks stand guard); a case dropping or filtering its own scan's
 * result after the scan ran; a read keeping only the lines or units the plants' controls sit on (the first, the second - the plain
 * block control's text line, wb-y4c9 F1 - the fourth, the fifth - the JSDoc control's text line - the last and the long middle
 * plants' middle one); a depth limit at or past every depth the plants and the repository reach (A3's plants 5 directories, src and
 * qa 3; C1's plants 6 segments, Pi docs 4), which hides nothing today; a file reached only through a symlinked directory (neither the
 * walks nor the listing follow one, and src, qa and the docs hold none today); a wb-52pt guard edited together with the cut it
 * guards - whole (or its listing) with a walk cut short that no plant shows, a long plant's, the long line's or the long unit's reach
 * (their sizing, together with the outreach check beside it since wb-y4c9 F2) with a read cut short past every other plant's control,
 * the skipped record taken from the plant list with the skip plants unplanted; the DOC_SKIP set itself (the skip plants follow it; Q6
 * holds it to the roster); a pin's compare weakened together with a REACHED record of the roster's own witness in place of the one
 * its case computed; a last case that skips itself at run time, is weakened in place, or is removed together with the first case's
 * collected-tree check.
 * RESIDUALS (named, each with its pinned quiet row): R-VOCABULARY a mapping reader reading only generic keys spells no vocabulary
 * token (Q1); R-PARAPHRASE a doc claim worded outside one family (no visual word, or no Fiber word) is not a coupled unit (Q2);
 * R-COMPOSED a token assembled from three or more parts at runtime is invisible to A3 (two-part joins are read: Q3); R-INTERRUPTED a
 * homoglyph letter, or two invisible splits, hides a token from A3 and C1 (Q4); R-UNIT a claim whose visual and Fiber words sit in
 * two block units (a heading and its paragraph, two list items) is not judged by C1 (Q5); R-SCOPE test/ and the tracker export lie
 * outside every scanned root, and both spell the vocabulary (Q6, reading the export through the owner filing alone); R-STATED-EDGE
 * relate() asks a witness only of ownership, so a producer-stated dependency, causation or grouping edge from a debug ref to a
 * FiberOptics ref is admitted on its source alone and read authoritative - not an identity edge (no identity class exists), and no
 * Pi producer states one (B3) (Q7); R-FOREIGN-READER graph-view validates no kind, so a reader other than the session projection
 * serving the claim row would draw an edge of class identity; src hands graph-view, the slice and the agent's read only the session
 * projection, whose one writer refuses the kind (B1) (Q8).
 * SCOPE: C1's judge reads no negation or tense: a unit stating the prohibition reds too (OVER-READ, disclosed: no Pi doc couples the
 * families today, and a page that must will re-measure this census). The producer facts are measured at the pin; Pi vendors no
 * producer file, so a producer change is seen only when the roster is re-measured. The FiberOptics, React DevTools and screenshot
 * refs are this census's stand-in producers (no Pi producer states them); the witness of B4 is constructed from TSX-H2-03's three
 * named parts, since the producer ships none. No mapping reader is added or faked here: a reader's own cut binds itself in
 * MAPPING_READERS and meets B4.
 *
 * Display paths added: none. Test-only: src, docs, qa and .beads are only read; the planted controls are written to makeScratch
 * scratch only.
 */
import { type Dirent, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { type ClaudeProjectionTopology, projectClaudeTopology } from "../src/workbench/claude-topology.js";
import { buildGraphView } from "../src/workbench/graph-view.js";
import {
  type NativeRef,
  ObservationProjection,
  type ObservationScope,
  type Relation,
  type RelationKind,
  type RelationPage,
} from "../src/workbench/observation.js";
import { type ObserveReader, observeInvocation } from "../src/workbench/observe-query.js";
import { type LinkedTopology, selectLinkedTopology, TOPOLOGY_RELATION_CLASSES } from "../src/workbench/topology-slice.js";
import type { ClaudeNativeObservation } from "../src/workflow/progress.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

// The planted positive controls live in makeScratch scratch (wb-u29w F1); the guard registers through the helper's own afterAll.
installScratchLeakGuard();

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "fiber-debug-identity-roster.json");
const BEAD = "wb-4nut.1";
/** ReactiveFiberTSXSDK at the program-triage pin (the bead's citation). */
const PROGRAM_PIN = "76bbbffd9d4a419f972d6fefc8b7f9dc524df8df";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A to C, to the bead's acceptance text. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) fixture: evidence carrying a React debug id and no witness yields a Pi relation of at most 'possibly-related', never a Fiber identity edge",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: "(b) a witness-less mapping claim in a Pi projection or hosted-agent report is refused",
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label: "(c) docs census: no Pi doc describes screenshot/debug-id to Fiber mapping as available",
    pins: ["C1", "C2"],
  },
  {
    id: "Q",
    label: "residuals: each named family with its pinned quiet row",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
  },
];

const SCOPE: ObservationScope = { workspace: "/fixture/visual-debug", principal: "operator" };
const INVOCATION = "wf_visual_debug";
const AT = "2026-10-23T08:00:00.000Z";
/** A FiberOptics component (NodeRef form) and port (PortRef form, outputs direction); no Pi producer states either. */
const FIBER_NODE: NativeRef = { provider: "fiber-optics", type: "node", id: "app.checkout.nodes.Button" };
const FIBER_PORT: NativeRef = { provider: "fiber-optics", type: "port", id: "app.checkout.outputs.clicked" };
/** The visual-debug evidence: a React DevTools fiber id, a screenshot, and a React ref whose id equals the component's. */
const DEBUG_REF: NativeRef = { provider: "react-devtools", type: "fiber", id: "42" };
const SCREENSHOT_REF: NativeRef = { provider: "visual-debug", type: "screenshot", id: "checkout-button.png" };
const EQUAL_REF: NativeRef = { provider: "react-devtools", type: "fiber", id: FIBER_NODE.id };
/** The relation kinds relate() states (observation.ts RelationKind); A2 probes them, the roster holds them. */
const RELATION_KINDS: readonly RelationKind[] = ["dependency", "causation", "ownership", "grouping", "hypothesis"];
/** Kind spellings a mapping claim would state; the projection must refuse each (B1). */
const IDENTITY_CLAIMS: readonly string[] = ["identity", "same-as", "sameAs", "maps-to", "fiber-identity", "alias", "equivalent", "mapping"];
const UNKNOWN_KIND = "Unknown relationship kind.";
const UNCONFIRMED = "Ownership requires explicit native owner confirmation reference.";
/** A3's mapping vocabulary, folded: React debug identities and internals, screenshots and devtools, FiberOptics and its refs, and
 * TSX-H2-03's witness parts (UI element, public ref, mapping token). */
const VOCABULARY: readonly string[] = [
  "debugid", "debuggingid", "reactfiber", "reactinternalinstance", "debugsource", "debugowner", "devtools", "screenshot",
  "screencapture", "screengrab", "fiberoptics", "fiberref", "fiberidentity", "fibermapping", "uielement", "publicref", "mappingtoken",
];
/** C1's visual family, folded: a screenshot, a React debug identity or internal, devtools, a UI or DOM element. */
const VISUAL: readonly string[] = [
  "screenshot", "screencapture", "screengrab", "debugid", "debuggingid", "reactfiber", "reactinternalinstance", "debugsource",
  "debugowner", "devtools", "uielement", "domelement",
];
/** The markdown roots C1 must read, each by at least one file, and the root documents it must read by name. */
const DOC_ROOTS: readonly string[] = ["(root)", ".agents", ".beads", ".pi", "docs", "examples", "new-feedback", "vendor"];
const DOC_FILES: readonly string[] = [
  "AGENTS.md", "CHANGELOG.md", "CONTRIBUTING.md", "README.md", "SECURITY.md", ".agents/skills/beads/SKILL.md", ".beads/README.md",
  ".pi/agents/auditor.md", "examples/agent-tool-description.md", "vendor/README.md",
];
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-VOCABULARY": ["Q1"],
  "R-PARAPHRASE": ["Q2"],
  "R-COMPOSED": ["Q3"],
  "R-INTERRUPTED": ["Q4"],
  "R-UNIT": ["Q5"],
  "R-SCOPE": ["Q6"],
  "R-STATED-EDGE": ["Q7"],
  "R-FOREIGN-READER": ["Q8"],
};

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly programPin: string;
  readonly producer: { [key: string]: JsonValue };
  readonly constants: { [key: string]: JsonValue };
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return value;
}
function objectOf(value: unknown, field: string): { [key: string]: JsonValue } {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, json(item)]));
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || typeof raw.bead !== "string" || typeof raw.programPin !== "string") {
    throw new Error("roster must be an object with bead, programPin and rows");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    bead: raw.bead,
    programPin: raw.programPin,
    producer: objectOf(raw.producer, "roster producer"),
    constants: objectOf(raw.constants, "roster constants"),
    tests: strings(raw.tests, "roster tests"),
    rows,
  };
}

const ROSTER = readRoster();

/** A pin's witness in a roster read. */
function witnessIn(roster: Roster, pin: string): JsonValue {
  const found = roster.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
/** The pins whose witness compare read the roster's witness, in run order (wb-u29w F2): rosterWitness records every call, so a
 * compare that no longer reads the roster (weakened to toBeDefined) or is skipped behind a return leaves its pin out, and a second
 * read of the same pin doubles it. */
const COMPARED: string[] = [];
/** The roster's witness for a pin, as the pin's compare reads it; each read is recorded in COMPARED. */
function rosterWitness(pin: string): JsonValue {
  COMPARED.push(pin);
  return witnessIn(ROSTER, pin);
}
function producerPart(name: string): { [key: string]: JsonValue } {
  return objectOf(ROSTER.producer[name], `roster producer.${name}`);
}

/** Every string a JSON value holds, keys included. */
function keysAndStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(keysAndStrings);
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [key, ...keysAndStrings(item)]);
  return [];
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
const byName = (left: Dirent, right: Dirent): number => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0);
/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing tracked. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries.sort(byName)) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
/** Every regular file below a directory as Node's own recursive listing names it, relative to the directory and sorted: the
 * independent listing A3's walk is held to and C1's skip plants are read from (wb-52pt F1, F2). Node's listing descends into a
 * symlinked directory, so what it reached through one is dropped: like filesBelow, the listing follows no symlink. */
function listedBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { recursive: true, withFileTypes: true });
  } catch {
    return [];
  }
  const below = (entry: Dirent): string => relative(directory, join(entry.parentPath, entry.name));
  const links = entries.filter(entry => entry.isSymbolicLink()).map(entry => `${below(entry)}/`);
  return entries.filter(entry => entry.isFile()).map(below).filter(file => !links.some(link => file.startsWith(link))).sort();
}
/** The order filesBelow and markdownFiles walk in: each directory's entries by name, a directory's whole subtree at its own place,
 * so two paths compare at their first differing segment. */
function walkOrder(left: string, right: string): number {
  const a = left.split("/");
  const b = right.split("/");
  const at = a.findIndex((segment, index) => segment !== b[index]);
  if (at < 0) return a.length - b.length;
  const x = a[at] ?? "";
  const y = b[at] ?? "";
  return x < y ? -1 : x > y ? 1 : 0;
}
/** Top-level directories C1 never enters: dependencies, git, the test tree (R-SCOPE) and build or report output. */
const DOC_SKIP: ReadonlySet<string> = new Set(["node_modules", ".git", "test", "dist", ".forge", "coverage"]);
/** Every markdown file below `base` (the repository, or C1's planted scratch) outside DOC_SKIP, relative to `base` and sorted;
 * node_modules is skipped at every depth. */
function markdownFiles(base: string, directory: string = base): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries.sort(byName)) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || (directory === base && DOC_SKIP.has(entry.name))) continue;
      files.push(...markdownFiles(base, path));
    } else if (entry.isFile() && entry.name.endsWith(".md")) files.push(relative(base, path));
  }
  return files;
}
const rootOf = (file: string): string => (file.includes("/") ? file.slice(0, file.indexOf("/")) : "(root)");

/** The words a text spells, folded (lowercased; "_", "-" and "$" dropped, so snake, kebab, camel and constant forms agree). */
function wordsOf(text: string): string[] {
  return (text.match(/[A-Za-z0-9_$-]+/g) ?? []).map(word => word.toLowerCase().replace(/[_$-]/g, ""));
}
/** A folded word without ReactiveFiber's own spellings, so rf's name never reads as Fiber vocabulary. */
const unRf = (word: string): string => word.replace(/reactivefiber/g, "");
/** The tokens a text spells inside one folded word, or across two adjacent words ("debug id", "Fiber Optics"), sorted. */
function tokensIn(text: string, tokens: readonly string[]): string[] {
  const words = wordsOf(text).map(unRf);
  const found = new Set<string>();
  words.forEach((word, index) => {
    const pair = word + (words[index + 1] ?? "");
    for (const token of tokens) if (word.includes(token) || pair.startsWith(token)) found.add(token);
  });
  return [...found].sort();
}
const vocabularyIn = (text: string): string[] => tokensIn(text, VOCABULARY);
/** C1's Fiber family: a word spelling fiber once ReactiveFiber's spellings and React's own Fiber are removed, unless it is the
 * second word of "Reactive Fiber" (rf's name) or "React Fiber" (React's tree, the visual family). */
function fiberWordsIn(text: string): string[] {
  const words = wordsOf(text);
  return words.filter((word, index) => {
    const previous = words[index - 1] ?? "";
    if ((word === "fiber" || word === "fibers") && (previous === "reactive" || previous === "react")) return false;
    return unRf(word).replace(/reactfiber/g, "").includes("fiber");
  });
}
/** A block element starts a unit: a list item, heading, table row, quote, fence or HTML line; other lines continue the unit. */
const BLOCK_START = /^\s*(?:[-*+]\s|\d+[.)]\s|#{1,6}\s|\||>|```|<)/;
/** A text's units: each paragraph, list item, table row, heading or fence line with its continuation lines, joined. */
function unitsOf(text: string): string[] {
  const units: string[] = [];
  let current = "";
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.length === 0 || BLOCK_START.test(line) || current.length === 0) {
      if (current.length > 0) units.push(current);
      current = trimmed;
    } else current = `${current} ${trimmed}`;
  }
  if (current.length > 0) units.push(current);
  return units;
}
const isVisual = (unit: string): boolean => tokensIn(unit, VISUAL).length > 0;
const isFiber = (unit: string): boolean => fiberWordsIn(unit).length > 0;
/** The units that couple a visual-family word with a Fiber word: C1's claim judge, which C1's scan calls on every file's units and
 * C2 controls through claimUnitsIn (wb-u29w F1). */
function claimUnitsOf(units: readonly string[]): string[] {
  return units.filter(unit => isVisual(unit) && isFiber(unit));
}
/** A text's coupled units: C1's judge over the text's units. */
function claimUnitsIn(text: string): string[] {
  return claimUnitsOf(unitsOf(text));
}
/** Words joined at runtime, so a composed control never sits on one source line. */
function compose(...words: string[]): string {
  return words.join(" ");
}

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}
/** The surfaces A3 reads; each floor sits below the count measured at base 9357bf4 (src 115, qa 62 files). The anchors are the
 * nearest relation and rf readers: they spell ReactiveFiber, relation and witness words and none of the vocabulary. */
const SCAN_ROOTS: readonly ScanRoot[] = [
  { root: "src", floor: 100, anchorFile: "src/workbench/reactivefiber-observer.ts", anchorToken: "reactivefiberTopology" },
  { root: "qa", floor: 50, anchorFile: "qa/workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts" },
];

/** A scan root's reading: the floor, the quiet anchor and whether every file Node lists below the root was judged. */
interface ScanReading {
  readonly root: string;
  readonly floor: boolean;
  readonly anchor: boolean;
  readonly whole: boolean;
}
/** A3's scan of one root below `base` (the repository, or A3's planted scratch): the files below the root, held to its floor and its
 * quiet anchor file, each judged for the vocabulary tokens its text spells, as `<path below base>: <token>`, and the judged files
 * held to the independent listing (whole, wb-52pt F1), so a walk that skips a depth, a name or a count of files reds on the
 * repository itself. src, qa and the planted positive control go through this one scan, so a scan that reads no text or reads none
 * into a token reds on the plants (wb-u29w F1), and so does each partial read row A3 names (wb-52pt F1) - not every partial read. */
function vocabularyScan(base: string, scan: ScanRoot): { reading: ScanReading; spelled: string[] } {
  const root = join(base, scan.root);
  const files = filesBelow(root);
  const anchor = join(base, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken) && vocabularyIn(textOf(anchor)).length === 0;
  expect(files.length >= scan.floor, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was read and is quiet`).toBe(true);
  const judged = files.map(file => ({ file, tokens: vocabularyIn(textOf(file)) }));
  const listed = listedBelow(root);
  const whole = JSON.stringify(judged.map(entry => relative(root, entry.file)).sort()) === JSON.stringify(listed);
  expect(whole, `${scan.root}: ${judged.length} files judged, ${listed.length} listed below the root`).toBe(true);
  const spelled = judged.flatMap(entry => entry.tokens.map(token => `${relative(base, entry.file)}: ${token}`));
  return { reading: { root: scan.root, floor: files.length >= scan.floor, anchor: anchorRead, whole }, spelled };
}
/** A3's controls: each flagged text spells at least one vocabulary token, each quiet text none. The flagged ones sit in the contexts a
 * judge could drop or blank: code, a property read, an import, a double-quoted string and a whole-line line comment since wb-4nut.1;
 * a trailing line comment, a whole-line and a trailing one-line block comment, a JSDoc and a plain block comment across three lines, a
 * single-quoted and a template string, an export line and lines indented by two spaces and by a tab since wb-52pt cut #2. */
const A3_FLAGGED: readonly string[] = [
  "const id = fiber.debugId;", 'node["__reactFiber$x9"]', 'import { NodeRef } from "fiber_optics/refs";', "// take a screenshot first",
  'const tool = "React DevTools";', "uiElement.publicRef", "const MAPPING_TOKEN = 1;", "fiberIdentity(ref)", "props._debugSource",
  "a debugging id", "screen capture", "FiberRef.parse(value)", "const ready = true; // React DevTools open", "/* the fiber identity */",
  "const shot = 0; /* a screen grab */", "/**\n * Reads the debug owner of each node.\n */", "const kind = 'fiber mapping';",
  "const hint = `take a screenshot`;", 'export const tool = "react-devtools";', "  return node._reactInternalInstance;", "\treturn node.debugSource;",
  "/*\n * Keeps the debug id.\n */",
];
const A3_QUIET: readonly string[] = ["ReactiveFiber", "reactivefiber-observer", "reactive_fiber_tsx", "reactiveFiberRef", "nodeRef", "witness", "a debug build", "devtool", "Fiber"];
/** The root the plants sit below in their scratch. */
const PLANT_ROOT = "plants";
/** Where a plant sets its flagged control among quiet filler (wb-52pt F1): alone, first, between quiet lines or units, or last. */
type Place = "alone" | "first" | "middle" | "last";
const PLACES: readonly Place[] = ["alone", "first", "middle", "last"];
/** A control at its place: three filler lines or units before it (past the first line and the first 96 characters) and two after. */
function placed(control: string, place: Place, filler: string, separator: string): string {
  const fill = (count: number): string[] => Array.from({ length: count }, () => filler);
  if (place === "alone") return control;
  if (place === "first") return [control, ...fill(2)].join(separator);
  if (place === "middle") return [...fill(3), control, ...fill(2)].join(separator);
  return [...fill(3), control].join(separator);
}
/** Where a long plant sets its control among its filler runs (wb-52pt F1): after one run, before one, or between two. */
type LongPlace = "first" | "middle" | "last";
const LONG_PLACES: readonly LongPlace[] = ["first", "middle", "last"];
/** A length in both measures a fixed-size read can count: UTF-16 characters (a string's length) and UTF-8 bytes (wb-y4c9 F2). */
interface Reach {
  readonly chars: number;
  readonly bytes: number;
}
/** The longest of some texts in each measure on its own: a text holding characters past ASCII is longer in bytes than in characters,
 * so it can be the longest in bytes and not in characters (wb-y4c9 F2). */
function longestOf(texts: Iterable<string>): Reach {
  let chars = 0;
  let bytes = 0;
  for (const text of texts) {
    chars = Math.max(chars, text.length);
    bytes = Math.max(bytes, Buffer.byteLength(text));
  }
  return { chars, bytes };
}
/** The filler runs beside a long plant's control: its text split at the control, without the empty side of a first or last one. */
function runsBeside(text: string, control: string): string[] {
  return text.split(control).filter(run => run.length > 0);
}
/** Whether every run outreaches `longest` in both measures, so a fixed window of either measure that hides any part of the longest
 * text (line, unit) hides the control beyond the run as well (wb-y4c9 F2). */
function outreaches(runs: readonly string[], longest: Reach): boolean {
  return runs.length > 0 && runs.every(run => run.length > longest.chars && Buffer.byteLength(run) > longest.bytes);
}
/** A long plant's text: its control after a run of filler (last), before one (first) or between two (middle), each run longer than
 * `longest` - the longest text the repository scan read - in each of the measures given (wb-52pt F1, cut #2): the count of lines or
 * units, the characters and, since wb-y4c9 F2, the UTF-8 bytes. So a judge keeping only a head window of fixed size misses a last
 * control, a tail window a first one, and a head-and-tail pair a middle one, whenever the window (each window of the pair) is shorter
 * than the longest repository text in its own measure - which it is whenever it would hide any part of one. */
function pastLongest(control: string, filler: string, separator: string, longest: Reach & { readonly count: number }, place: LongPlace): string {
  const step: Reach = { chars: filler.length + separator.length, bytes: Buffer.byteLength(filler + separator) };
  const count = Math.max(longest.count, Math.ceil(longest.chars / step.chars), Math.ceil(longest.bytes / step.bytes)) + 1;
  const run = Array.from({ length: count }, () => filler);
  return (place === "first" ? [control, ...run] : place === "middle" ? [...run, control, ...run] : [...run, control]).join(separator);
}
/** A3's quiet filler line: it spells no token, and beside a control it adds none across a line break (each plant is checked). */
const A3_FILLER = 'export const quiet = "witness";';
/** A3's plant directories below the plant root: depth 1 to 5, deeper than any src or qa file (both reach 3). */
const A3_DIRS: readonly string[] = ["", "a/", "a/b/", "a/b/c/", "a/b/c/d/"];
/** Scratch directories the cases planted; each is removed after its case. */
const scratches: string[] = [];
afterEach(() => {
  removeScratch(...scratches.splice(0));
});
function plantScratch(prefix: string): string {
  const folder = makeScratch(prefix);
  scratches.push(folder);
  return folder;
}
function plantFile(folder: string, path: string, text: string): void {
  mkdirSync(dirname(join(folder, path)), { recursive: true });
  writeFileSync(join(folder, path), `${text}\n`);
}
/** A3's planted positive control (wb-u29w F1, nested and multi-line since wb-52pt F1): in scratch, each flagged control in a module
 * of its own, 1 to 5 directories below the planted root and alone, first, between quiet lines or last; three long plants whose control
 * sits last (long.ts), first (long-first.ts) or in the middle (long-middle.ts) of filler runs each longer than `longest` (the longest
 * src or qa text, in characters, bytes and lines); and a long-line plant (long-line.ts) whose control sits in the middle of one line,
 * between filler runs each longer than the longest src or qa line in characters and in bytes (wb-52pt cut #2; bytes and the outreach
 * check since wb-y4c9 F2) - beside the quiet anchor module holding every quiet
 * control, read through vocabularyScan as src and qa are: the scan reads every plant and spells, for each flagged module, exactly the
 * tokens its control spells read alone, and nothing for the anchor. */
function plantedVocabulary(longest: { readonly text: Reach; readonly lines: number; readonly line: Reach }): { reading: ScanReading; spelled: string[] } {
  const folder = plantScratch("fiber-debug-identity-a3-");
  const flagged = A3_FLAGGED.map((control, index) => ({
    path: `${PLANT_ROOT}/${A3_DIRS[index % A3_DIRS.length] ?? ""}flagged-${String(index).padStart(2, "0")}.ts`,
    control,
    text: placed(control, PLACES[index % PLACES.length] ?? "alone", A3_FILLER, "\n"),
  }));
  const control = A3_FLAGGED[0] ?? "";
  const long = LONG_PLACES.map(place => ({
    path: `${PLANT_ROOT}/${place === "last" ? "long" : `long-${place}`}.ts`,
    control,
    text: pastLongest(control, A3_FILLER, "\n", { ...longest.text, count: longest.lines }, place),
  }));
  const longLine = { path: `${PLANT_ROOT}/long-line.ts`, control, text: pastLongest(control, A3_FILLER, " ", { ...longest.line, count: 0 }, "middle") };
  // wb-y4c9 F2: every filler run beside a long plant's control outreaches the longest src or qa text, and the long line's the longest
  // line, in characters and in bytes, so a fixed window of either measure that hides any part of one hides the control too.
  expect(long.map(plant => outreaches(runsBeside(plant.text, control), longest.text)), "each long plant's filler runs outreach the longest src or qa text in characters and in bytes").toEqual([true, true, true]);
  expect(outreaches(runsBeside(longLine.text, control), longest.line), "the long line's filler runs outreach the longest src or qa line in characters and in bytes").toBe(true);
  const plants = [...flagged, ...long, longLine].sort((left, right) => walkOrder(left.path, right.path));
  for (const plant of plants) plantFile(folder, plant.path, plant.text);
  plantFile(folder, `${PLANT_ROOT}/quiet.ts`, A3_QUIET.join("\n"));
  expect(plants.map(plant => vocabularyIn(plant.text)), "each plant's filler spells nothing beside its control").toEqual(plants.map(plant => vocabularyIn(plant.control)));
  const scan = vocabularyScan(folder, { root: PLANT_ROOT, floor: plants.length + 1, anchorFile: `${PLANT_ROOT}/quiet.ts`, anchorToken: A3_QUIET[0] ?? "" });
  expect(scan.spelled, "each flagged plant spells its own tokens through the scan, the quiet anchor none").toEqual(
    plants.flatMap(plant => vocabularyIn(plant.text).map(token => `${plant.path}: ${token}`)),
  );
  return scan;
}
/** C1's scan of every markdown file below `base` (the repository, or C1's planted scratch) outside DOC_SKIP: each file's block units,
 * and the units among them claimUnitsOf judges coupled, as `<path below base>: <unit>`. The repository and the planted positive control
 * go through this one scan, so a scan that reads no text, splits none into units or whose claim judge never matches reds on the plants
 * (wb-u29w F1). */
function docScan(base: string): { files: string[]; units: { file: string; units: string[] }[]; claims: string[] } {
  const files = markdownFiles(base);
  const units = files.map(file => ({ file, units: unitsOf(textOf(join(base, file))) }));
  const claims = units.flatMap(entry => claimUnitsOf(entry.units).map(unit => `${entry.file}: ${unit.slice(0, 160)}`));
  return { files, units, claims };
}
/** C1's quiet filler unit: it spells no visual and no Fiber word. */
const C1_FILLER = "This quiet paragraph names neither family.";
/** C1's plant directories below the plant base: 1 to 6 path segments, deeper than any Pi doc (they reach 4), so a claim filter shaped
 * on path depth reds (wb-gy3t); the first is the landed docs/ plant's. */
const C1_DIRS: readonly string[] = ["docs/", "docs/workbench/", "docs/workbench/receipts/", "docs/workbench/receipts/deep/", "docs/workbench/receipts/deep/er/", ""];
/** C1's planted positive control (wb-u29w F1, nested and multi-unit since wb-gy3t and wb-52pt F1): in scratch, each flagged C2 control
 * in a markdown file of its own at 1 to 6 path segments and alone, first, between quiet units or last; three long plants whose flagged
 * unit sits last (long.md), first (long-first.md) or in the middle (long-middle.md) of filler runs each longer than `longest` (the
 * longest Pi doc, in characters, bytes and units); a long-unit plant (long-unit.md), one unit whose coupled sentence sits in its
 * middle, between filler runs each longer than the longest Pi doc unit in characters and in bytes (wb-52pt cut #2; bytes and the
 * outreach check since wb-y4c9 F2); each quiet C2 control in one at the top; and a
 * flagged control below every DOC_SKIP root and below two nested node_modules - read through docScan as the repository is: the scan
 * reads exactly the flagged and quiet files, its claims are exactly the flagged controls' own coupled units (each control is one, as
 * C2 reads it), and the skip plants are on disk and unread - the skipped record, held to the roster (wb-52pt F2). */
function plantedDocs(longest: { readonly text: Reach; readonly units: number; readonly unit: Reach }): { files: string[]; claims: string[]; skipped: string[] } {
  const folder = plantScratch("fiber-debug-identity-c1-");
  const flagged = C2_FLAGGED.map((control, index) => ({
    path: `${C1_DIRS[index % C1_DIRS.length] ?? ""}flagged-${index}.md`,
    control,
    text: placed(control, PLACES[index % PLACES.length] ?? "alone", C1_FILLER, "\n\n"),
  }));
  const control = C2_FLAGGED[0] ?? "";
  const long = LONG_PLACES.map(place => ({
    path: `docs/${place === "last" ? "long" : `long-${place}`}.md`,
    control,
    text: pastLongest(control, C1_FILLER, "\n\n", { ...longest.text, count: longest.units }, place),
  }));
  // The long unit is one line, so one unit, and it is its own control: its coupled sentence sits in its middle (wb-52pt cut #2).
  const unit = pastLongest(control, C1_FILLER, " ", { ...longest.unit, count: 0 }, "middle");
  // wb-y4c9 F2: every filler run beside a long plant's flagged unit outreaches the longest Pi doc, and the long unit's runs beside its
  // coupled sentence the longest Pi doc unit, in characters and in bytes.
  expect(long.map(plant => outreaches(runsBeside(plant.text, control), longest.text)), "each long plant's filler runs outreach the longest Pi doc in characters and in bytes").toEqual([true, true, true]);
  expect(outreaches(runsBeside(unit, control), longest.unit), "the long unit's filler runs outreach the longest Pi doc unit in characters and in bytes").toBe(true);
  const coupled = [...flagged, ...long, { path: "docs/long-unit.md", control: unit, text: unit }].sort((left, right) => walkOrder(left.path, right.path));
  const quiet = C2_QUIET.map((text, index) => ({ path: `quiet-${index}.md`, text }));
  const skipped = [...[...DOC_SKIP].sort().map(root => `${root}/skipped.md`), "docs/node_modules/skipped.md", "docs/workbench/receipts/node_modules/skipped.md"];
  for (const plant of [...coupled, ...quiet]) plantFile(folder, plant.path, plant.text);
  for (const path of skipped) plantFile(folder, path, C2_FLAGGED[0] ?? "");
  const scan = docScan(folder);
  expect(scan.files, "the scan reads every flagged and quiet plant and no skipped one").toEqual([...coupled, ...quiet].map(plant => plant.path).sort(walkOrder));
  expect(coupled.map(plant => claimUnitsIn(plant.control).length), "each flagged plant's control is one coupled unit").toEqual(coupled.map(() => 1));
  expect(scan.claims, "each flagged plant is its control's coupled unit through the scan, each quiet plant none").toEqual(
    coupled.flatMap(plant => claimUnitsIn(plant.control).map(found => `${plant.path}: ${found.slice(0, 160)}`)),
  );
  const unread = listedBelow(folder).filter(path => path.endsWith(".md") && !scan.files.includes(path));
  expect(unread, "every skip plant is on disk and unread").toEqual([...skipped].sort());
  return { files: scan.files, claims: scan.claims, skipped: unread };
}

/** A mapping reader reads a claim that a UI/debug ref is a FiberOptics component or port. */
interface MappingWitness {
  readonly publicRef: string;
  readonly rendererRevision: string;
  readonly sourceCut: string;
}
interface MappingClaim {
  readonly name: string;
  readonly basis: "debug-id" | "screenshot" | "id-equality" | "agent-report" | "witness";
  readonly from: NativeRef;
  readonly to: NativeRef;
  readonly witness?: Partial<MappingWitness>;
}
type MappingReading = { readonly relation: "identity"; readonly witness?: MappingWitness } | { readonly relation: "possibly-related" | "none" };
type MappingReader = (claim: MappingClaim) => MappingReading;
interface MappingBinding {
  readonly module: string;
  readonly read: MappingReader;
}
/** The Pi mapping readers: a module A3 finds spelling the vocabulary must be bound here, every binding must name such a module,
 * and every bound reader meets B4's witness rule (B5). Empty today: Pi has no reader of UI or debug identities. */
const MAPPING_READERS: readonly MappingBinding[] = [];

const AGENT_TOOL: NativeRef = { provider: "claude-agent-sdk", type: "tool-use", id: "toolu_inspect_42" };
const FULL_WITNESS: MappingWitness = { publicRef: FIBER_NODE.id, rendererRevision: "renderer@r12", sourceCut: "cut-7f3a" };
const PORT_WITNESS: MappingWitness = { publicRef: FIBER_PORT.id, rendererRevision: "renderer@r12", sourceCut: "cut-7f3a" };
/** B4's claims: four witness-less bases, three partial witnesses, one naming another target and two complete witnesses. */
const CLAIMS: readonly MappingClaim[] = [
  { name: "debugId", basis: "debug-id", from: DEBUG_REF, to: FIBER_NODE },
  { name: "screenshot", basis: "screenshot", from: SCREENSHOT_REF, to: FIBER_NODE },
  { name: "idEquality", basis: "id-equality", from: EQUAL_REF, to: FIBER_NODE },
  { name: "agentReport", basis: "agent-report", from: AGENT_TOOL, to: FIBER_PORT },
  { name: "noRevision", basis: "witness", from: DEBUG_REF, to: FIBER_NODE, witness: { publicRef: FIBER_NODE.id, sourceCut: "cut-7f3a" } },
  { name: "noCut", basis: "witness", from: DEBUG_REF, to: FIBER_NODE, witness: { publicRef: FIBER_NODE.id, rendererRevision: "renderer@r12" } },
  { name: "noRef", basis: "witness", from: DEBUG_REF, to: FIBER_NODE, witness: { rendererRevision: "renderer@r12", sourceCut: "cut-7f3a" } },
  { name: "otherTarget", basis: "witness", from: DEBUG_REF, to: FIBER_NODE, witness: { ...FULL_WITNESS, publicRef: "app.checkout.nodes.Banner" } },
  { name: "witnessed", basis: "witness", from: DEBUG_REF, to: FIBER_NODE, witness: FULL_WITNESS },
  { name: "witnessedPort", basis: "witness", from: SCREENSHOT_REF, to: FIBER_PORT, witness: PORT_WITNESS },
];
/** A complete witness: all three parts stated by the producer, and the public ref naming the claim's own target. */
function completeWitness(claim: MappingClaim): MappingWitness | undefined {
  const witness = claim.witness;
  if (witness === undefined) return undefined;
  const { publicRef, rendererRevision, sourceCut } = witness;
  if (!publicRef || !rendererRevision || !sourceCut || publicRef !== claim.to.id) return undefined;
  return { publicRef, rendererRevision, sourceCut };
}
/** The armed witness rule: identity only on a complete witness, carried verbatim; anything less reads at most possibly-related. */
function witnessViolations(read: MappingReader): string[] {
  return CLAIMS.flatMap(claim => {
    const reading = read(claim);
    if (reading.relation !== "identity") return reading.relation === "possibly-related" || reading.relation === "none" ? [] : [`${claim.name}: unknown relation`];
    const complete = completeWitness(claim);
    if (complete === undefined) return [`${claim.name}: identity without a complete witness`];
    return JSON.stringify(reading.witness) === JSON.stringify(complete) ? [] : [`${claim.name}: witness not carried verbatim`];
  });
}
const possibly: MappingReading = { relation: "possibly-related" };
const honest: MappingReader = claim => {
  const complete = completeWitness(claim);
  return complete === undefined ? possibly : { relation: "identity", witness: complete };
};
const upgradeOn = (basis: MappingClaim["basis"]): MappingReader => claim => (claim.basis === basis ? { relation: "identity", witness: FULL_WITNESS } : honest(claim));
/** Each mutant names the upgrade the statement forbids; B4 holds every one to at least one violation. */
const MUTANTS: Readonly<Record<string, MappingReader>> = {
  upgradeOnDebugId: upgradeOn("debug-id"),
  upgradeOnScreenshot: upgradeOn("screenshot"),
  upgradeOnAgentReport: upgradeOn("agent-report"),
  upgradeOnIdEquality: claim => (claim.from.id === claim.to.id ? { relation: "identity", witness: FULL_WITNESS } : honest(claim)),
  acceptPartialWitness: claim => (claim.witness?.publicRef ? { relation: "identity", witness: { ...FULL_WITNESS, ...claim.witness } } : honest(claim)),
  synthesizeRevision: claim =>
    claim.witness?.publicRef === claim.to.id && claim.witness.sourceCut
      ? { relation: "identity", witness: { publicRef: claim.to.id, rendererRevision: claim.witness.rendererRevision ?? "pi-observed", sourceCut: claim.witness.sourceCut } }
      : honest(claim),
  dropWitness: claim => (completeWitness(claim) ? { relation: "identity" } : honest(claim)),
  rewriteCut: claim => {
    const complete = completeWitness(claim);
    return complete ? { relation: "identity", witness: { ...complete, sourceCut: complete.sourceCut.toUpperCase() } } : honest(claim);
  },
  ignoreTarget: claim => {
    const witness = claim.witness;
    return witness?.publicRef && witness.rendererRevision && witness.sourceCut
      ? { relation: "identity", witness: { publicRef: witness.publicRef, rendererRevision: witness.rendererRevision, sourceCut: witness.sourceCut } }
      : honest(claim);
  },
};

/** A hosted Claude agent's visual-debugging sample whose call label and tool names carry the witness-less mapping claim. */
const AGENT_LABEL = "visual debug: React debug id 42 is fiber-optics app.checkout.nodes.Button";
const AGENT_SAMPLE: ClaudeNativeObservation = {
  provider: "claude-agent-sdk",
  sessionId: "sess-visual",
  lastMessageId: "m-1",
  observedMessages: 3,
  assistantCharacters: 120,
  tools: [
    { toolUseId: "toolu_screenshot_1", name: "browser_take_screenshot", state: "completed" },
    { toolUseId: AGENT_TOOL.id, name: "react_devtools_inspect 42 maps to app.checkout.nodes.Button", state: "completed" },
  ],
  toolsTruncated: false,
  freshness: "current",
  terminal: "succeeded",
};
/** The report member a sample does not define, carrying the claim with a marker no Pi text spells. */
const REPORT_MARKER = "no-witness-claim-7d1e";
function agentTopology(sample: ClaudeNativeObservation = AGENT_SAMPLE): ClaudeProjectionTopology {
  return projectClaudeTopology({
    call: { agentId: "wf-agent-0", index: 0, label: AGENT_LABEL }, snapshot: sample, scope: SCOPE, invocationId: INVOCATION, observedAt: AT, sequence: 1,
  });
}

const refName = (ref: NativeRef): string => `${ref.provider}/${ref.type}`;
/** A projection key's provider/type: the key is the JSON of [workspace, principal, provider, type, native scope, id]. */
function keyName(key: string): string {
  const parts: unknown = JSON.parse(key);
  return Array.isArray(parts) && typeof parts[2] === "string" && typeof parts[3] === "string" ? `${parts[2]}/${parts[3]}` : "unparsed";
}
const describeRelation = (relation: Relation): string => `${relation.kind} ${keyName(relation.from)} -> ${keyName(relation.to)}`;
function snapshotOf(source: NativeRef, kind: string, title: string, evidenceRefs?: readonly string[]) {
  return {
    source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind, trace: { invocationId: INVOCATION },
    node: { title, type: "sdk-operation" as const, statusText: "observed", statusTone: "success" as const },
    ...(evidenceRefs === undefined ? {} : { evidenceRefs }),
  };
}
function keyIn(projection: ObservationProjection, ref: NativeRef): string {
  const node = projection.query({ scope: SCOPE, ref, limit: 1 }).nodes[0];
  if (node === undefined) throw new Error(`no node for ${refName(ref)} ${ref.id}`);
  return node.key;
}
function edgesAt(projection: ObservationProjection, ref: NativeRef): { from: number; to: number } {
  const key = keyIn(projection, ref);
  return { from: projection.relations({ scope: SCOPE, from: key }).length, to: projection.relations({ scope: SCOPE, to: key }).length };
}
function sliceSummary(slice: LinkedTopology): { edges: number; references: number; trace: string } {
  return {
    edges: slice.upstream.edges.length + slice.downstream.edges.length,
    references: slice.references.length,
    trace: `${slice.trace.label}:${slice.trace.reasons.join(",")}`,
  };
}
function apply(projection: ObservationProjection, topology: ClaudeProjectionTopology): string[] {
  const results = topology.snapshots.map(snapshot => projection.refresh(snapshot));
  for (const relation of topology.relations) projection.relate(relation);
  return results;
}
/** A1's fixture: the FiberOptics component and port, then every piece of visual-debug evidence through every admission path. */
function visualFixture(): { projection: ObservationProjection; admitted: string[] } {
  const projection = new ObservationProjection();
  const admitted = [
    projection.refresh(snapshotOf(FIBER_NODE, "fiberoptics.node", "Button")),
    projection.refresh(snapshotOf(FIBER_PORT, "fiberoptics.port", "clicked")),
    projection.ingest({
      projectionEventId: "react-inspect-42", source: DEBUG_REF, scope: SCOPE, observedAt: AT, sourceSequence: 1, kind: "react.fiber.inspected",
      node: { presentation: { title: "Button (React debug id 42)", type: "sdk-operation", statusText: "inspected", statusTone: "success" } },
      trace: { invocationId: INVOCATION, correlationIds: { reactDebugId: DEBUG_REF.id, fiberOpticsNode: FIBER_NODE.id, fiberOpticsPort: FIBER_PORT.id } },
      evidenceRefs: [`react-debug-id:${DEBUG_REF.id}`, `screenshot:${SCREENSHOT_REF.id}`, `fiber-optics:${FIBER_NODE.id}`],
    }),
    projection.refresh(snapshotOf(SCREENSHOT_REF, "visual.screenshot", "checkout screenshot", [`react-debug-id:${DEBUG_REF.id}`, `fiber-optics:${FIBER_PORT.id}`])),
    projection.refresh(snapshotOf(EQUAL_REF, "react.fiber", "Button")),
    ...apply(projection, agentTopology()),
  ];
  return { projection, admitted };
}
function observed(reader: ObserveReader): { counted: Record<string, number>; partial: boolean; perNode: Record<string, number> } {
  const reply = observeInvocation(reader, { scope: SCOPE, invocationId: INVOCATION, limit: 40, selectors: { relations: true } });
  const counted: Record<string, number> = {};
  const perNode: Record<string, number> = {};
  let partial = false;
  for (const row of reply.relations?.perNode ?? []) {
    for (const [kind, count] of Object.entries(row.outgoing)) counted[kind] = (counted[kind] ?? 0) + count;
    perNode[keyName(row.key)] = (perNode[keyName(row.key)] ?? 0) + Object.values(row.outgoing).reduce((sum, count) => sum + count, 0);
    partial = partial || row.partial;
  }
  return { counted, partial, perNode };
}
/** The mapping claim as a stored row a reader serves: a kind outside RelationKind, as no projection write can store one (B1). */
function servedRow(from: string, to: string, kind: string): Relation {
  const row: unknown = { from, to, kind, provenance: { source: DEBUG_REF.provider, observedAt: AT } };
  return row as Relation;
}
/** A real projection holding the debug ref and the component, whose relation reads serve `rows` instead of its own. */
function servingReaders(kinds: readonly string[]) {
  const projection = new ObservationProjection();
  projection.refresh(snapshotOf(FIBER_NODE, "fiberoptics.node", "Button"));
  projection.refresh(snapshotOf(DEBUG_REF, "react.fiber", "Button (React debug id 42)"));
  const rows = kinds.map(kind => servedRow(keyIn(projection, DEBUG_REF), keyIn(projection, FIBER_NODE), kind));
  const relations = (input: { scope: ObservationScope; from?: string; to?: string; limit?: number }): Relation[] =>
    rows.filter(row => (input.from === undefined || row.from === input.from) && (input.to === undefined || row.to === input.to));
  const relationsPage = (input: { scope: ObservationScope; from?: string; to?: string; limit?: number }): RelationPage => {
    const page = relations(input);
    return { relations: page, examined: page.length, truncated: false, limitApplied: input.limit ?? 100 };
  };
  const observeReader: ObserveReader = {
    window: filter => projection.window(filter), events: filter => projection.events(filter), relationRevision: () => projection.relationRevision(),
    stats: () => projection.stats(), relations,
  };
  return { projection, relations, relationsPage, observeReader, fiberKey: keyIn(projection, FIBER_NODE) };
}

/** The src call sites of the projection's readers, each with whether its reader argument is the session projection. */
const READER_CALL = /(?<!function )\b(createGraphViewBuilder|buildGraphView|selectLinkedTopology|observeInvocation)\(([^;]{0,120})/g;
function srcFiles(): string[] {
  return filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
}

/** The bead's own notes in the tracker export; every case reads them through ownerFiling, never whole. */
function beadNotes(): string {
  for (const line of textOf(join(REPO, ".beads", "issues.jsonl")).split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.notes === "string") return row.notes;
  }
  return "";
}
/** The bead's owner filing, the first paragraph of its notes and the acceptance text rows A to C quote. The lane appends every
 * later note (the collect step's delivery note, the gate's notes) after it behind bd's newline separator and never rewrites it, so
 * the append-only notes keep it byte-stable, while a reading of the whole notes changes at the first ledger hop that exports an
 * appended note (the cut #1 refusal, U1). */
function ownerFiling(notes: string): string {
  const end = notes.indexOf("\n\n");
  return (end < 0 ? notes : notes.slice(0, end)).trimEnd();
}
/** A row label's quoted acceptance text: the label without its leading clause tag. */
function quoteOf(label: string): string {
  return label.replace(/^\([^)]*\) /, "");
}

/** C2's controls: each flagged text is one coupled unit, each quiet text none. The flagged ones are units of every kind row C names:
 * paragraphs, a table row and a bullet list item since wb-4nut.1; a heading, a fence line with its continuation (its closing fence line
 * is a quiet unit of its own), a quote, an HTML unit, a numbered list item and a paragraph on two lines since wb-52pt cut #2. */
const C2_FLAGGED: readonly string[] = [
  "Workbench maps a React debug id to its FiberOptics component.",
  "A screenshot is enough to identify the Fiber node it shows.",
  "| Visual debugging | screenshot to FiberOptics port identity | available |",
  "- Hosted agents may upgrade a debugId into a FiberRef.",
  "The UI element resolves to the fiber_optics node behind it.",
  "React DevTools ids map onto Fiber Optics components.",
  "## Screenshot to FiberOptics mapping",
  "```text\nA screenshot maps to its FiberOptics node.\n```",
  "> A screenshot is enough to identify its FiberRef.",
  "<p>The UI element is its FiberOptics component.</p>",
  "1. Map the debug id to its FiberOptics node.",
  "A screenshot of the panel\nnames its FiberOptics node.",
];
const C2_QUIET: readonly string[] = [
  "Add sections a change needs; use fenced text blocks or screenshots for UI changes.",
  "ReactiveFiber renders the context; reactive-fiber, reactive_fiber_tsx and reactivefibercli are rf names.",
  "rf reports fiber_signal_count and fiber_transaction_refs in its work metrics.",
  "The React Fiber tree belongs to React, and a screenshot is a picture.",
  "Reactive Fiber is not shown in a screenshot.",
];

/** The pins that passed their witness compare, each with the witness it compared, in run order; the last case holds the pins to every
 * pin and each witness to a fresh read of the roster, so a compare weakened in a pin's case still reds there (wb-u29w F2). */
const REACHED: { readonly pin: string; readonly witness: JsonValue }[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const { projection, admitted } = visualFixture();
    const keys = { fiberNode: keyIn(projection, FIBER_NODE), equalId: keyIn(projection, EQUAL_REF) };
    const edges = {
      fiberNode: edgesAt(projection, FIBER_NODE), fiberPort: edgesAt(projection, FIBER_PORT), debugId: edgesAt(projection, DEBUG_REF),
      screenshot: edgesAt(projection, SCREENSHOT_REF), equalId: edgesAt(projection, EQUAL_REF),
    };
    const slices = {
      fiberNode: sliceSummary(selectLinkedTopology({ scope: SCOPE, relations: projection }, keys.fiberNode)),
      fiberPort: sliceSummary(selectLinkedTopology({ scope: SCOPE, relations: projection }, keyIn(projection, FIBER_PORT))),
    };
    const reply = observeInvocation(projection, { scope: SCOPE, invocationId: INVOCATION, limit: 40 });
    const debugNode = reply.nodes.find(node => node.nativeRef.provider === DEBUG_REF.provider && node.nativeRef.id === DEBUG_REF.id);
    expect(admitted.every(result => result === "applied"), "every visual-debug input is admitted").toBe(true);
    expect(keys.fiberNode === keys.equalId, "the equal-id React ref is a node of its own").toBe(false);
    expect(Object.values(edges).every(edge => edge.from === 0 && edge.to === 0), "no edge touches a visual or FiberOptics node").toBe(true);
    return json({
      admitted,
      nodes: projection.stats().nodes,
      equalIdDistinct: keys.fiberNode !== keys.equalId,
      edges,
      projectionEdges: projection.relations({ scope: SCOPE, limit: 100 }).map(describeRelation).sort(),
      slices,
      observe: observed(projection),
      debugEvidence: debugNode?.evidenceRefs ?? null,
    });
  },
  A2: async () => {
    const probe = new ObservationProjection();
    const focus: NativeRef = { provider: "probe", type: "focus", id: "f" };
    probe.refresh(snapshotOf(focus, "probe.focus", "focus"));
    const accepted = RELATION_KINDS.filter(kind => {
      const from: NativeRef = { provider: "probe", type: "from", id: kind };
      probe.refresh(snapshotOf(from, "probe.from", kind));
      try {
        probe.relate({ scope: SCOPE, from, to: focus, kind, provenance: { source: "probe", observedAt: AT, ...(kind === "ownership" ? { nativeConfirmationRef: `confirm-${kind}` } : {}) } });
        return true;
      } catch {
        return false;
      }
    });
    const slice = selectLinkedTopology({ scope: SCOPE, relations: probe }, keyIn(probe, focus));
    const read = slice.upstream.edges.map(edge => ({ kind: edge.nativeRef.id, relation: edge.relation, authoritative: edge.authoritative }));
    const { projection } = visualFixture();
    projection.relate({ scope: SCOPE, from: DEBUG_REF, to: FIBER_NODE, kind: "hypothesis", provenance: { source: DEBUG_REF.provider, observedAt: AT } });
    const ceiling = selectLinkedTopology({ scope: SCOPE, relations: projection }, keyIn(projection, FIBER_NODE));
    const stated = ceiling.upstream.edges.map(edge => ({ from: refName(edge.nativeRef), relation: edge.relation, authoritative: edge.authoritative }));
    const classes: readonly string[] = TOPOLOGY_RELATION_CLASSES;
    expect(accepted, "relate() states exactly the five kinds").toEqual([...RELATION_KINDS]);
    expect(stated, "a witness-less hypothesis is the non-authoritative ceiling").toEqual([{ from: refName(DEBUG_REF), relation: "inferred-hypothesis", authoritative: false }]);
    return json({
      accepted,
      classes,
      read,
      observeKinds: Object.keys(observed(probe).counted),
      identityNames: [...classes, ...accepted].filter(name => IDENTITY_CLAIMS.includes(name) || /identit|same|alias|equiv|map/i.test(name)),
      ceiling: { stated, trace: `${ceiling.trace.label}:${ceiling.trace.reasons.join(",")}` },
      observedDebug: observed(projection).perNode[refName(DEBUG_REF)] ?? null,
      observedHypothesis: observed(projection).counted.hypothesis ?? null,
    });
  },
  A3: async () => {
    const scans = SCAN_ROOTS.map(scan => vocabularyScan(REPO, scan));
    const spelled = scans.flatMap(scan => scan.spelled);
    const spellingModules = [...new Set(spelled.map(entry => entry.slice(0, entry.indexOf(":"))))];
    const bound = MAPPING_READERS.map(binding => binding.module);
    const controls = { flagged: A3_FLAGGED.map(vocabularyIn), quiet: A3_QUIET.map(vocabularyIn) };
    // wb-u29w F1: the planted positive control goes through the scan src and qa went through; wb-52pt F1: its long plants reach past
    // the longest text below either root, and its long line past the longest line (cut #2), by an independent read of every listed file,
    // in characters and in bytes (wb-y4c9 F2).
    const texts = SCAN_ROOTS.flatMap(scan => listedBelow(join(REPO, scan.root)).map(file => textOf(join(REPO, scan.root, file))));
    const planted = plantedVocabulary({
      text: longestOf(texts),
      lines: Math.max(0, ...texts.map(text => text.split("\n").length)),
      line: longestOf(texts.flatMap(text => text.split("\n"))),
    });
    expect(spelled, "a src or qa file spelling the mapping vocabulary").toEqual([]);
    expect(spellingModules.filter(module => !bound.includes(module)), "a spelling module not bound in MAPPING_READERS").toEqual([]);
    expect(bound.filter(module => !spellingModules.includes(module)), "a binding naming no spelling module").toEqual([]);
    expect(controls.flagged.every(found => found.length > 0) && controls.quiet.every(found => found.length === 0), "the scan's controls").toBe(true);
    return json({ roots: scans.map(scan => scan.reading), spelled, bound, controls, planted });
  },
  B1: async () => {
    const { projection } = visualFixture();
    const before = { stats: projection.stats(), revision: projection.relationRevision() };
    const refusal = (statement: () => void): string => {
      try {
        statement();
        return "accepted";
      } catch (error) {
        return error instanceof Error ? error.message : "unknown";
      }
    };
    const claimed = Object.fromEntries(IDENTITY_CLAIMS.map(kind => {
      const statement: unknown = { scope: SCOPE, from: DEBUG_REF, to: FIBER_NODE, kind, provenance: { source: DEBUG_REF.provider, observedAt: AT } };
      return [kind, refusal(() => projection.relate(statement as Parameters<ObservationProjection["relate"]>[0]))];
    }));
    const ownership = {
      unconfirmed: refusal(() => projection.relate({ scope: SCOPE, from: DEBUG_REF, to: FIBER_NODE, kind: "ownership", provenance: { source: DEBUG_REF.provider, observedAt: AT } })),
      agentConfirmed: refusal(() =>
        projection.relate({ scope: SCOPE, from: DEBUG_REF, to: FIBER_PORT, kind: "ownership", provenance: { source: AGENT_TOOL.provider, observedAt: AT, nativeConfirmationRef: AGENT_TOOL.id } }),
      ),
    };
    const after = { stats: projection.stats(), revision: projection.relationRevision() };
    expect(Object.values(claimed), "every identity spelling is refused").toEqual(IDENTITY_CLAIMS.map(() => UNKNOWN_KIND));
    expect(ownership, "the ownership form needs the owner's own confirmation").toEqual({ unconfirmed: UNCONFIRMED, agentConfirmed: UNCONFIRMED });
    expect(after, "a refused statement changes nothing").toEqual(before);
    return json({ claimed, ownership, unchanged: JSON.stringify(after) === JSON.stringify(before), edges: { fiberNode: edgesAt(projection, FIBER_NODE), fiberPort: edgesAt(projection, FIBER_PORT) } });
  },
  B2: async () => {
    const served = servingReaders(["identity", "same-as"]);
    const slice = selectLinkedTopology({ scope: SCOPE, relations: { relations: served.relations, relationsPage: served.relationsPage } }, served.fiberKey);
    const references = slice.references.map(reference => ({ direction: reference.direction, reason: reference.reason, ref: reference.nativeRef === undefined ? null : refName(reference.nativeRef), edgeCount: reference.edgeCount }));
    const read = observed(served.observeReader);
    expect(sliceSummary(slice).edges, "a served claim row is never an edge of the slice").toBe(0);
    expect(read.partial, "the agent's read flags the unknown row").toBe(true);
    return json({ slice: sliceSummary(slice), references, observe: read });
  },
  B3: async () => {
    const topology = agentTopology();
    const withReport: unknown = { ...AGENT_SAMPLE, report: `React debug id 42 is fiber-optics ${FIBER_NODE.id} (${REPORT_MARKER})` };
    const reported = agentTopology(withReport as ClaudeNativeObservation);
    const writeSites: Record<string, { calls: number; kinds: string[] }> = {};
    for (const file of srcFiles()) {
      const text = textOf(file);
      const calls = (text.match(/\.relate\(/g) ?? []).length;
      if (calls === 0) continue;
      const kinds = [...new Set([...text.matchAll(/kind: ?["'](dependency|causation|ownership|grouping|hypothesis)["']/g)].map(match => match[1] ?? ""))].sort();
      writeSites[relative(REPO, file)] = { calls, kinds };
    }
    const relations = topology.relations.map(relation => `${relation.kind} ${refName(relation.from)} -> ${refName(relation.to)}`).sort();
    expect(JSON.stringify(reported), "a report member riding the sample changes nothing").toBe(JSON.stringify(topology));
    expect(keysAndStrings(reported).some(text => text.includes(REPORT_MARKER)), "the report member is read nowhere").toBe(false);
    expect(Object.values(writeSites).every(site => site.kinds.length === 1 && site.kinds[0] === "ownership"), "every relate() call site states ownership only").toBe(true);
    return json({
      relations,
      refs: topology.snapshots.map(snapshot => refName(snapshot.source)).sort(),
      titles: topology.snapshots.map(snapshot => snapshot.node.title),
      reportRead: keysAndStrings(reported).some(text => text.includes(REPORT_MARKER)),
      writeSites,
      indexRelates: (textOf(join(REPO, "src", "index.ts")).match(/\.relate\(/g) ?? []).length,
    });
  },
  B4: async () => {
    const mutants = Object.fromEntries(Object.entries(MUTANTS).map(([name, read]) => [name, witnessViolations(read)]));
    expect(witnessViolations(honest), "the honest reader meets the rule").toEqual([]);
    expect(Object.entries(mutants).filter(([, found]) => found.length === 0).map(([name]) => name), "a mutant the rule misses").toEqual([]);
    return json({ claims: CLAIMS.map(claim => claim.name), honest: witnessViolations(honest), readings: CLAIMS.map(claim => honest(claim).relation), mutants });
  },
  B5: async () => {
    const meets = (bindings: readonly MappingBinding[]): Record<string, number> =>
      Object.fromEntries(bindings.map(binding => [binding.module, witnessViolations(binding.read).length]));
    const bound = meets(MAPPING_READERS);
    const synthetic = meets([{ module: "synthetic/honest", read: honest }, { module: "synthetic/upgradeOnDebugId", read: MUTANTS.upgradeOnDebugId ?? honest }]);
    expect(Object.values(bound).filter(count => count > 0), "a bound reader breaking the witness rule").toEqual([]);
    expect(synthetic, "the loop reads a breaking binding").toEqual({ "synthetic/honest": 0, "synthetic/upgradeOnDebugId": 1 });
    return json({ bound, synthetic });
  },
  C1: async () => {
    const { files, units, claims } = docScan(REPO);
    const all = units.flatMap(entry => entry.units);
    const anchor = (file: string, family: (unit: string) => boolean): boolean => (units.find(entry => entry.file === file)?.units ?? []).some(family);
    const floors = { files: files.length >= 90, units: all.length >= 4500, visual: all.filter(isVisual).length >= 4, fiber: all.filter(isFiber).length >= 10 };
    const roots = Object.fromEntries(DOC_ROOTS.map(root => [root, files.some(file => rootOf(file) === root)]));
    const named = Object.fromEntries(DOC_FILES.map(file => [file, files.includes(file) && textOf(join(REPO, file)).length > 0]));
    const anchors = {
      "AGENTS.md": anchor("AGENTS.md", isVisual), "README.md": anchor("README.md", isVisual), "CHANGELOG.md": anchor("CHANGELOG.md", isVisual),
      "docs/workbench/19-worked-examples.md": anchor("docs/workbench/19-worked-examples.md", isVisual),
      "docs/workbench/receipts/wb-2j3.7.md": anchor("docs/workbench/receipts/wb-2j3.7.md", isFiber),
    };
    expect(floors, `markdown files ${files.length}, units ${all.length}`).toStrictEqual({ files: true, units: true, visual: true, fiber: true });
    expect(Object.values(roots).every(Boolean) && Object.values(named).every(Boolean) && Object.values(anchors).every(Boolean), "every named root, file and anchor is read").toBe(true);
    expect(claims, "a Pi doc unit coupling a visual-family word with a Fiber word").toEqual([]);
    // wb-u29w F1: the planted positive control goes through the scan the repository went through; wb-52pt F1: its long plants reach
    // past the longest markdown file that scan read, in characters and in bytes (an independent read; bytes since wb-y4c9 F2) and in
    // units, and its long unit past the longest unit in both measures (cut #2, an independent read).
    const texts = files.map(file => textOf(join(REPO, file)));
    const planted = plantedDocs({
      text: longestOf(texts),
      units: Math.max(0, ...units.map(entry => entry.units.length)),
      unit: longestOf(texts.flatMap(text => unitsOf(text))),
    });
    return json({ floors, roots, named, anchors, claims, planted });
  },
  C2: async () => {
    const flagged = C2_FLAGGED.map(text => claimUnitsIn(text).length);
    const quiet = C2_QUIET.map(text => claimUnitsIn(text).length);
    const families = C2_QUIET.map(text => ({ visual: isVisual(text), fiber: isFiber(text) }));
    expect(flagged, "every flagged control is one coupled unit").toEqual(C2_FLAGGED.map(() => 1));
    expect(quiet, "every quiet control is none").toEqual(C2_QUIET.map(() => 0));
    return json({ flagged, quiet, families });
  },
  Q1: async () => {
    const generic = 'export function linkEvidence(evidence) { return { node: evidence.target, ref: evidence.ref, id: evidence.id, kind: "identity" }; }';
    return json({ words: vocabularyIn(generic) });
  },
  Q2: async () => {
    const fiberOnly = compose("Clicking", "an", "element", "on", "screen", "opens", "its", "FiberOptics", "node.");
    const visualOnly = compose("The", "screenshot", "shows", "the", "same", "component", "the", "graph", "holds.");
    return json({ fiberOnly: claimUnitsIn(fiberOnly).length, visualOnly: claimUnitsIn(visualOnly).length });
  },
  Q3: async () => {
    const threeParts = 'const key = ["fi", "ber", "op", "tics"].join(""); const id = ["de", "bug", "Id"].join("");';
    const twoParts = 'const key = ["fiber", "optics"].join(""); const id = "debug" + "Id";';
    return json({ threeParts: vocabularyIn(threeParts), twoParts: vocabularyIn(twoParts) });
  },
  Q4: async () => {
    const homoglyph = String.fromCodePoint(0x043e);
    const zeroWidth = String.fromCodePoint(0x200b);
    const lookalike = `const lib = "fiber${homoglyph}ptics"; const shot = "screensh${homoglyph}t";`;
    const doubleSplit = `const lib = "fi${zeroWidth}ber${zeroWidth}optics";`;
    const singleSplit = `const lib = "fiber${zeroWidth}optics";`;
    const docs = compose(`A screensh${homoglyph}t`, "maps", "to", "its", `Fiber${homoglyph}ptics`, "node.");
    return json({ lookalike: vocabularyIn(lookalike), doubleSplit: vocabularyIn(doubleSplit), singleSplit: vocabularyIn(singleSplit), docsUnits: claimUnitsIn(docs).length });
  },
  Q5: async () => {
    const heading = ["## Screenshots", "", compose("Each", "one", "maps", "to", "its", "FiberOptics", "node.")].join("\n");
    const items = ["- Take a screenshot.", "- Open its FiberOptics node."].join("\n");
    const paragraph = ["Take a screenshot", "and open its FiberOptics node."].join("\n");
    return json({ heading: claimUnitsIn(heading).length, items: claimUnitsIn(items).length, paragraph: claimUnitsIn(paragraph).length });
  },
  Q6: async () => {
    const census = textOf(fileURLToPath(import.meta.url));
    const notes = beadNotes();
    const filingSpells = vocabularyIn(ownerFiling(notes));
    // The lane appends to these notes after every cut and every gate (bd's newline separator) and a ledger hop exports them: the
    // reading after an appended note, here one spelling every vocabulary token, behind either separator, is the reading before it.
    const afterAppend = ["\n", "\n\n"].map(separator => vocabularyIn(ownerFiling(`${notes}${separator}${VOCABULARY.join(" ")}\n`)));
    expect(afterAppend, "an appended note leaves the reading unchanged").toEqual([filingSpells, filingSpells]);
    return json({
      scanned: [...SCAN_ROOTS.map(scan => scan.root), "markdown outside test/"],
      skipped: [...DOC_SKIP].sort(),
      testSpells: vocabularyIn(census).length > 0,
      filingSpells,
      afterAppend,
    });
  },
  Q7: async () => {
    const projection = new ObservationProjection();
    projection.refresh(snapshotOf(FIBER_NODE, "fiberoptics.node", "Button"));
    projection.refresh(snapshotOf(DEBUG_REF, "react.fiber", "Button (React debug id 42)"));
    const stated: RelationKind[] = ["dependency", "causation", "grouping"];
    for (const kind of stated) projection.relate({ scope: SCOPE, from: DEBUG_REF, to: FIBER_NODE, kind, provenance: { source: DEBUG_REF.provider, observedAt: AT } });
    const slice = selectLinkedTopology({ scope: SCOPE, relations: projection }, keyIn(projection, FIBER_NODE));
    return json({ admitted: projection.stats().edges, read: slice.upstream.edges.map(edge => ({ relation: edge.relation, authoritative: edge.authoritative })) });
  },
  Q8: async () => {
    const served = servingReaders(["identity"]);
    const graph = buildGraphView(
      { window: filter => served.projection.window(filter), relationRevision: () => served.projection.relationRevision(), relationsPage: served.relationsPage },
      { scope: SCOPE, invocationId: INVOCATION, viewport: { offset: 0, limit: 10 } },
    );
    const wiring = srcFiles().flatMap(file =>
      [...textOf(file).matchAll(READER_CALL)].map(match => `${relative(REPO, file)}: ${match[1]} reads ${/\bprojection\b/.test(match[2] ?? "") ? "the session projection" : "another reader"}`),
    );
    return json({ edges: graph.edges.map(edge => ({ class: edge.class, crossProvider: edge.crossProvider, confirmed: edge.confirmed })), complete: graph.complete, wiring: wiring.sort() });
  },
};

describe("wb-4nut.1 Fiber debug identity census (TSX-HARNESS2-REACTIVE-EVOLUTION-R1)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's acceptance text and the cases agree", ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:5", "C:2", "Q:8"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: BEAD, programPin: PROGRAM_PIN }).toStrictEqual({ bead: ROSTER.bead, programPin: ROSTER.programPin });
    expect({
      fiberNode: FIBER_NODE, fiberPort: FIBER_PORT, debugRef: DEBUG_REF, screenshotRef: SCREENSHOT_REF, relationKinds: RELATION_KINDS,
      identityClaims: IDENTITY_CLAIMS, vocabulary: VOCABULARY, visual: VISUAL, docRoots: DOC_ROOTS, docFiles: DOC_FILES, residuals: RESIDUALS,
    }).toStrictEqual(ROSTER.constants);
    // The producer's id forms: a component is [*bundle, "nodes", name], a port [*bundle, direction, name] (refs.py).
    const refs = producerPart("fiberOpticsRefs");
    const parts = (id: string): string[] => id.split(".");
    expect(parts(FIBER_NODE.id).length >= 3 && parts(FIBER_NODE.id).at(-2) === refs.nodeSeparator, "FIBER_NODE is a NodeRef id").toBe(true);
    expect(strings(refs.portDirections, "portDirections"), "FIBER_PORT is a PortRef id").toContain(parts(FIBER_PORT.id).at(-2));
    expect(strings(producerPart("statement").quotes, "quotes").join(" "), "the statement's two halves are the program's").toContain("is not FiberOptics identity");
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);
    const notes = beadNotes();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    const filing = ownerFiling(notes);
    expect(filing.startsWith("Owner filing ("), "the notes' first paragraph is the owner filing").toBe(true);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) expect(filing, `row ${row.id} quotes the owner filing's acceptance`).toContain(quoteOf(row.label));
    // wb-u29w F2: the records live in the last case, so this case, run first, holds the tree as collected to the roster's tests - a
    // test removed, renamed, added or skipped at collection (the last case included) reds here, before the last case could miss it.
    const collected: { readonly name: string; readonly mode: string; readonly fails: boolean }[] = [];
    const collect = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") collected.push({ name: child.name, mode: child.mode, fails: child.fails === true });
        else if (child.type === "suite") collect(child.tasks);
      }
    };
    collect(task.file.tasks);
    expect(collected.map(entry => entry.name), "the collected tests, exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(collected.filter(entry => entry.mode !== "run" || entry.fails).map(entry => `${entry.name} | ${entry.mode}`), "a collected test not in run mode, or inverted").toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push({ pin, witness });
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string =>
      `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    const pins = ROWS.flatMap(row => row.pins);
    expect(COMPARED, "every pin's compare read the roster's witness once, in row order").toEqual(pins);
    expect(REACHED.map(entry => entry.pin), "every pin reached its witness compare, in row order").toEqual(pins);
    const fresh = readRoster();
    expect(REACHED.map(entry => entry.witness), "every reached witness equals a fresh read of the roster").toStrictEqual(pins.map(pin => witnessIn(fresh, pin)));
  });
});
