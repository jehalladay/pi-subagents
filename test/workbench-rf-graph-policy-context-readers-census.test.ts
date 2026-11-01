/**
 * wb-v03p readers census (the rule-19 structural-exit child of wb-b4lg: ruling R-B176 filed it at refusal #3 to carry the reader
 * coverage of the three frozen classes, and ruling R-B221 executed the dependency inversion at refusal #4, folding that refusal's U1
 * members into it). SUBJECT: the record judge, the read log, the run-output and compare readers and the heading reader of the wb-e9dy
 * rf GraphPolicy-context census, whose code is moved byte for byte from wb-b4lg's FINAL cut #4 (tip a6d757fe; the parent's doc
 * comments are not copied) into test/helpers/rf-e9dy-census-readers.ts, beside Z2_CALL_SITE, which holds that census's Z2 compare
 * call verbatim. The
 * parent's cut #4 census and roster are not on trunk and are neither added nor edited here; trunk's
 * test/workbench-rf-graph-policy-context-census.test.ts (wb-r63c's) is not edited either. The parent stays parked until this lands,
 * and its later re-cut can import the helper.
 *
 * PINNED READER SET (this file, test/workbench-rf-graph-policy-context-readers-census.test.ts; observed at the cut: every case passes
 * on the moved readers, and each named member, its own edit applied to a copy of the helper, reds the pin case named after it). Each
 * pin case is named "<member id>: <quote>" and asserts, for every probe it holds, that the reader beside the probe returns exactly
 * the literal reading written here (toEqual over the reader's whole output). How each reader is driven: judgeRecord over a probe's
 * items, recordItems of its envelope under the real record's "fixture:" prefix and then rosterItems of its four key lists under the
 * real record's "roster:" prefix; logged over a probe envelope handed through a fresh read log at the path "envelope", the probe's one
 * read made on the handed workspace object, the reading being the log's noted positions, sorted; outputsOf over a probe's two runs;
 * Z2_CALL_SITE.compare over a probe's plain and planted outputs per render variant; renderedHeading over the first heading token
 * marked lexes from a probe's markdown.
 * - Row U1, record item forms (judgeRecord): G-U1-CASE (probes CASE-ROSTER and CASE-VALUES: the keys GpRank and GPRank in the result
 *   key list, and the same two words as string values, read as the abbreviation; output, gpuCount and gpu-runner stay quiet),
 *   G-U1-LIST (LIST-WORK: gp_layer in the work key list and gp_count in the work-metrics key list read; token_count quiet) and
 *   G-U1-LISTF (LISTF-LISTS: score_total, receipt_digest and rankings_seen in the result, provenance and work key lists and score_count
 *   in the work-metrics key list read as fields; token_count quiet).
 * - Row U2, planted-positions handoff and compare: G-U2-HASKEYS (logged; LOG-HAS-BOTH, LOG-HAS-WORKSPACE, LOG-OWNKEYS-BOTH and
 *   LOG-OWNKEYS-WORKSPACE: a key-presence read (the in operator) or a key-list read (Reflect.ownKeys) of the planted workspace object
 *   notes its position, and the read of the workspace member off a planted root notes the root; controls LOG-KEYS-WORKSPACE
 *   (Object.keys), LOG-GET-WORKSPACE (a member read) and LOG-GOPD-WORKSPACE (a descriptor read) note the workspace too;
 *   LOG-HAS-UNPLANTED and LOG-HAS-CLOSED note nothing), G-U2-OUTPUTSOF (outputsOf; RUNS-DISTINCT: each reader slot holds that reader's
 *   own run output and each control slot that reader's own control) and G-U2-CALLSITE (Z2_CALL_SITE.compare; COMPARE-AS-HANDED: per
 *   render variant, a planted evidence output that differs from the plain one - the gate's T-P2 shape, an evidence id gp-scored -
 *   reads false in its slot, and so does a planted topology output that differs; equal slots read true).
 * - Row U3, docs locates (renderedHeading): M-NORM-FULL (HEADING-PARENLINK: a link heading whose destination holds parentheses reads
 *   as its link text and the rest of the heading; HEADING-SNAKE: a snake_case word reads with its underscore), G-U3-WS4 (each Unicode
 *   space separator beyond the no-break space - U+1680, U+2000, U+2002, U+2003, U+2009, U+200A, U+202F, U+205F and U+3000 - in place of
 *   the posture heading's space, and an em space after the comma of docs/03's title, read as one space; controls: the tab and the
 *   no-break space read the same) and G-U3-ZS (U+000B, U+000C and U+FEFF in place of the heading's space read as one space; control:
 *   U+200B stays as written).
 * - Row V, the R-B221 fold (judgeRecord): G5-U1-GPSEP (GPSEP-ROSTER and GPSEP-VALUES: trace_GP and GP_NOTE read; GPU quiet),
 *   G5-U1-TAILSEP (TAILSEP-ROSTER and TAILSEP-VALUES: note_gp and rf_gp read; rf_gpu quiet) and G5-U1-HUMPSEP (HUMPSEP-ROSTER and
 *   HUMPSEP-VALUES: rf_gpTrace and rf_gpNote read; rf_gpuTrace quiet). In each pin the first word is refusal #4's own twin and the second
 *   is the twin refusal #4 measured beside the dead-run member it replicated (GP_NOTE for GL2-U1-UPWHOLE, rf_gp for GL2-U1-NOTAIL,
 *   rf_gpNote for GL2-U1-HUMPSTART), so each pin also reds under that replicated member.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, each row with its label and pins, every pin
 *   with its quote, and every pin with its probes (reader and id), each held to a literal.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped as the
 *   expectation): (1) wb-v03p's description: its numbered lines are exactly rows U1-U3, in order, each '<n>. <id>
 *   <label>: <member ids>' with the member ids equal to the row's pins in order; its count word ('all three classes') equals the
 *   number of those rows; and the U1 line's twins, one group per pin in pin order, are each a roster key of that pin's probes; (2)
 *   wb-b4lg's refusal #3 verdict (the one naming tip e1fa3207) names its surviving members, in order and with a count word equal to
 *   their number, as rows U1-U3's pins; (3) wb-v03p's notes hold the R-B221 fold block, whose member line names row V's pins in order
 *   as G5-U1-<suffix>-<suffix>-<suffix>, and wb-b4lg's notes hold the refusal #4 verdict (the one naming tip a6d757fe), whose member
 *   bullet for each row V pin names its twin, a roster key of that pin's probes (both exported from the landing-754 ledger hop on;
 *   this cut's base carries them).
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe the reader named beside it returns exactly the literal reading written here: a
 * reader edit that changes one reading reds that pin case. (2) Each named member changes a reading of its own pin's probes: the
 * cutting seat applies each member's own edit (the gate's edit records, retargeted to the helper, where each find string occurs
 * exactly once) and reads the pin case named after it red; a pin whose probes stopped holding its member's form would read green
 * there. (3) Rows U1-U3, their labels and pins are the ones wb-v03p's description and wb-b4lg's refusal #3 record, and U1's probes hold
 * the description's twins: a pin or a row removed, swapped or relabelled - in one literal or in every literal together - reds SHAPE
 * or ANCHOR (standing rule 16's CT1-CT6).
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them every other case
 * form, roster list or envelope position of the abbreviation and the field words, every other read kind or path of the read log,
 * every other run or output shape, and every other heading markup or character. The parent census's own cases, plants, header and
 * roster are NOT CLAIMED by this census, and so is whether the parent census calls these readers: this census holds the helper's
 * readers, and the parent's later re-cut decides what it imports. Z2_CALL_SITE is the parent's compare call moved, not the parent's
 * loop: the outputs the parent hands it (readersOn and outputsOf over its planted runs) are NOT CLAIMED by this census. Row V's label
 * and quotes have no outside anchor: an edit of one is NOT CLAIMED by this census. The GL2 association of each row V pin's second
 * word is this file's description, held by no outside anchor. A probe's input edited
 * together with its literal reading is NOT CLAIMED by this census (the member replay is what shows each probe still holds its form).
 * No residual is claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated; the tracker export is only read; no src, docs or receipt is edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import { describe, expect, it } from "vitest";
import {
  type JsonObject,
  judgeRecord,
  type KeyLists,
  logged,
  outputsOf,
  type PlantedRun,
  plantFields,
  type ReaderKind,
  type ReaderOutputs,
  type ReadLog,
  type RecordVerdict,
  recordItems,
  renderedHeading,
  rosterItems,
  type Variant,
  Z2_CALL_SITE,
} from "./helpers/rf-e9dy-census-readers.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT = ".beads/issues.jsonl";
/** The opening of wb-b4lg's refusal #3 verdict and of its refusal #4 verdict (bead notes, append-only). */
const REFUSAL_3 = "refusal #3 on the R-B136-frozen enumerate-the-resolvable cut #3 (tip e1fa320766a2cdfe784ab0142c5d092f2c6f2763";
const REFUSAL_4 = "substance refusal #4 on the R-B176 FINAL fail-closed-core cut #4 (a6d757fecf2070de00d3d4f587dff55d46c0f5af";
/** The R-B221 fold block's opening on wb-v03p's notes, its header's tail, and the prefix its member line names row V's members by. */
const FOLD = "RULE19 DEPENDENCY INVERSION R-B221";
const FOLD_MEMBERS = "members folded into wb-v03p";
const V_PREFIX = "G5-U1-";
const COUNT = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const cp = (point: number): string => String.fromCodePoint(point);

type Read = "has" | "ownKeys" | "keys" | "get" | "getOwnPropertyDescriptor";
interface RecordProbe {
  readonly id: string;
  readonly reader: "judgeRecord";
  readonly lists: Partial<KeyLists>;
  readonly envelope: JsonObject;
  readonly reading: RecordVerdict;
}
interface LogProbe {
  readonly id: string;
  readonly reader: "logged";
  /** The probe envelope's positions that carry the four GraphPolicy plants ("envelope", "envelope.workspace"). */
  readonly planted: readonly string[];
  readonly live: boolean;
  readonly read: Read;
  readonly reading: readonly string[];
}
interface RunsProbe {
  readonly id: string;
  readonly reader: "outputsOf";
  readonly runs: Readonly<Record<ReaderKind, PlantedRun>>;
  readonly reading: ReaderOutputs;
}
interface CompareProbe {
  readonly id: string;
  readonly reader: "Z2_CALL_SITE.compare";
  readonly outputs: Readonly<Record<Variant, { readonly plain: ReaderOutputs; readonly planted: ReaderOutputs }>>;
  readonly reading: JsonObject;
}
interface HeadingProbe {
  readonly id: string;
  readonly reader: "renderedHeading";
  readonly markdown: string;
  readonly reading: string;
}
type Probe = RecordProbe | LogProbe | RunsProbe | CompareProbe | HeadingProbe;
interface Pin {
  readonly id: string;
  readonly quote: string;
  readonly probes: readonly Probe[];
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

const NO_KEYS: KeyLists = { resultKeys: [], provenanceKeys: [], workKeys: [], workMetricsKeys: [] };
/** Each read kind a probe makes on the handed workspace object. */
const READS: Readonly<Record<Read, (object: JsonObject) => unknown>> = {
  has: object => "score" in object,
  ownKeys: object => Reflect.ownKeys(object),
  keys: object => Object.keys(object),
  get: object => object.score,
  getOwnPropertyDescriptor: object => Object.getOwnPropertyDescriptor(object, "score"),
};
/** A probe envelope: a root and its workspace object, the four GraphPolicy plants (plantFields) on each listed position. */
function probeEnvelope(planted: readonly string[]): JsonObject {
  const workspace: JsonObject = { root: "/workspace/wb-v03p" };
  const envelope: JsonObject = { schema: "rf.context.render/v1", workspace };
  if (planted.includes("envelope")) plantFields(envelope, "envelope");
  if (planted.includes("envelope.workspace")) plantFields(workspace, "envelope.workspace");
  return envelope;
}
function isHeading(token: Token): token is Tokens.Heading {
  return token.type === "heading";
}
/** The reading of a probe by the reader it names. */
function readingOf(probe: Probe): unknown {
  switch (probe.reader) {
    case "judgeRecord":
      return judgeRecord([...recordItems("fixture:", probe.envelope, "", []), ...rosterItems("roster:", { ...NO_KEYS, ...probe.lists })]);
    case "logged": {
      const log: ReadLog = { live: probe.live, read: new Set(), wrapped: new WeakMap() };
      const handed = logged(probeEnvelope(probe.planted), "envelope", log) as JsonObject;
      READS[probe.read](handed.workspace as JsonObject);
      return [...log.read].sort();
    }
    case "outputsOf":
      return outputsOf(probe.runs);
    case "Z2_CALL_SITE.compare":
      return Z2_CALL_SITE.compare(variant => probe.outputs[variant]);
    case "renderedHeading": {
      const heading = marked.lexer(probe.markdown).find(isHeading);
      return heading === undefined ? "(no heading)" : renderedHeading(heading);
    }
  }
}
/** Every roster key a pin's record probes list, across the four key lists. */
function rosterKeysOf(pin: Pin): string[] {
  return pin.probes.flatMap(probe =>
    probe.reader === "judgeRecord" ? [...(probe.lists.resultKeys ?? []), ...(probe.lists.provenanceKeys ?? []), ...(probe.lists.workKeys ?? []), ...(probe.lists.workMetricsKeys ?? [])] : [],
  );
}

/** A record probe whose reading lists nothing but the vocabulary it names. */
function vocabulary(id: string, lists: Partial<KeyLists>, envelope: JsonObject, found: readonly string[]): RecordProbe {
  return { id, reader: "judgeRecord", lists, envelope, reading: { vocabulary: found, fields: [] } };
}
const POSTURE = "## GraphPolicyCLI";
const BOUND = "GraphPolicyCLI boundary";
/** The posture heading with `point` in place of its space. */
function spaced(id: string, point: number, reading: string): HeadingProbe {
  return { id, reader: "renderedHeading", markdown: `${POSTURE}${cp(point)}boundary`, reading };
}
const TITLE = (space: string): string => `03 ${cp(0x2014)} High-level architecture,${space}module ownership and dataflow`;
const QUIET = { score: null, receipt: null };
const PRESENCE = { topology: { score: 0.5, receipt: "receipt-topology" }, evidence: { score: 0.5, receipt: "receipt-evidence" } };
const PLAIN: ReaderOutputs = { topology: { projection: "plain" }, evidence: { id: "rfo_plain" }, presence: { topology: QUIET, evidence: QUIET } };
const PRESENCE_FALSE = { topology: false, evidence: false };

const ROWS: readonly Row[] = [
  { id: "U1", label: "record item forms", pins: ["G-U1-CASE", "G-U1-LIST", "G-U1-LISTF"] },
  { id: "U2", label: "planted-positions handoff and compare", pins: ["G-U2-HASKEYS", "G-U2-OUTPUTSOF", "G-U2-CALLSITE"] },
  { id: "U3", label: "docs locates", pins: ["M-NORM-FULL", "G-U3-WS4", "G-U3-ZS"] },
  { id: "V", label: "the R-B221 fold: the claimed case forms beside a separator", pins: ["G5-U1-GPSEP", "G5-U1-TAILSEP", "G5-U1-HUMPSEP"] },
];

const PINS: readonly Pin[] = [
  {
    id: "G-U1-CASE",
    quote: "a title-case Gp and an uppercase GP before a capitalized word read as the abbreviation",
    probes: [
      vocabulary("CASE-ROSTER", { resultKeys: ["GpRank", "GPRank", "output", "gpuCount"] }, {}, ["roster:result.GpRank", "roster:result.GPRank"]),
      vocabulary("CASE-VALUES", {}, { result: { notes: ["GpRank", "GPRank", "gpu-runner"] } }, ["fixture:result.notes[0]", "fixture:result.notes[1]"]),
    ],
  },
  {
    id: "G-U1-LIST",
    quote: "the abbreviation is read on the roster's work and work-metrics key lists",
    probes: [
      vocabulary("LIST-WORK", { workKeys: ["gp_layer"], workMetricsKeys: ["gp_count", "token_count"] }, {}, [
        "roster:result.work.gp_layer",
        "roster:result.work_metrics.gp_count",
      ]),
    ],
  },
  {
    id: "G-U1-LISTF",
    quote: "a field word is read on the roster's result, provenance and work key lists",
    probes: [
      {
        id: "LISTF-LISTS",
        reader: "judgeRecord",
        lists: { resultKeys: ["score_total"], provenanceKeys: ["receipt_digest"], workKeys: ["rankings_seen"], workMetricsKeys: ["score_count", "token_count"] },
        envelope: {},
        reading: {
          vocabulary: [],
          fields: ["roster:result.score_total", "roster:result.provenance.receipt_digest", "roster:result.work.rankings_seen", "roster:result.work_metrics.score_count"],
        },
      },
    ],
  },
  {
    id: "G-U2-HASKEYS",
    quote: "the read log notes a key-presence and a key-list read of a planted object",
    probes: [
      { id: "LOG-HAS-BOTH", reader: "logged", planted: ["envelope", "envelope.workspace"], live: true, read: "has", reading: ["envelope", "envelope.workspace"] },
      { id: "LOG-HAS-WORKSPACE", reader: "logged", planted: ["envelope.workspace"], live: true, read: "has", reading: ["envelope.workspace"] },
      { id: "LOG-OWNKEYS-BOTH", reader: "logged", planted: ["envelope", "envelope.workspace"], live: true, read: "ownKeys", reading: ["envelope", "envelope.workspace"] },
      { id: "LOG-OWNKEYS-WORKSPACE", reader: "logged", planted: ["envelope.workspace"], live: true, read: "ownKeys", reading: ["envelope.workspace"] },
      { id: "LOG-KEYS-WORKSPACE", reader: "logged", planted: ["envelope.workspace"], live: true, read: "keys", reading: ["envelope.workspace"] },
      { id: "LOG-GET-WORKSPACE", reader: "logged", planted: ["envelope.workspace"], live: true, read: "get", reading: ["envelope.workspace"] },
      { id: "LOG-GOPD-WORKSPACE", reader: "logged", planted: ["envelope.workspace"], live: true, read: "getOwnPropertyDescriptor", reading: ["envelope.workspace"] },
      { id: "LOG-HAS-UNPLANTED", reader: "logged", planted: [], live: true, read: "has", reading: [] },
      { id: "LOG-HAS-CLOSED", reader: "logged", planted: ["envelope", "envelope.workspace"], live: false, read: "has", reading: [] },
    ],
  },
  {
    id: "G-U2-OUTPUTSOF",
    quote: "outputsOf hands each reader's own run output and control to that reader's slots",
    probes: [
      {
        id: "RUNS-DISTINCT",
        reader: "outputsOf",
        runs: {
          topology: { output: { projection: "topology-run" }, planted: ["envelope.result"], read: ["envelope.result"], presence: QUIET },
          evidence: { output: { id: "gp-scored" }, planted: ["envelope", "envelope.result"], read: ["envelope"], presence: PRESENCE.evidence },
        },
        reading: { topology: { projection: "topology-run" }, evidence: { id: "gp-scored" }, presence: { topology: QUIET, evidence: PRESENCE.evidence } },
      },
    ],
  },
  {
    id: "G-U2-CALLSITE",
    quote: "Z2's call site compares each render variant's planted outputs, as handed, with its plain outputs",
    probes: [
      {
        id: "COMPARE-AS-HANDED",
        reader: "Z2_CALL_SITE.compare",
        outputs: {
          clean: { plain: PLAIN, planted: { ...PLAIN, evidence: { id: "gp-scored" }, presence: PRESENCE } },
          flagged: { plain: PLAIN, planted: { ...PLAIN, topology: { projection: "planted" }, presence: PRESENCE } },
          overBudget: { plain: PLAIN, planted: PLAIN },
          notObserved: { plain: PLAIN, planted: { topology: { projection: "planted" }, evidence: { id: "gp-scored" }, presence: PRESENCE } },
          fixtureSeam: { plain: PLAIN, planted: { ...PLAIN, presence: PRESENCE } },
        },
        reading: {
          clean: { topology: true, evidence: false, presence: PRESENCE_FALSE },
          flagged: { topology: false, evidence: true, presence: PRESENCE_FALSE },
          overBudget: { topology: true, evidence: true, presence: { topology: true, evidence: true } },
          notObserved: { topology: false, evidence: false, presence: PRESENCE_FALSE },
          fixtureSeam: { topology: true, evidence: true, presence: PRESENCE_FALSE },
        },
      },
    ],
  },
  {
    id: "M-NORM-FULL",
    quote: "a heading reads by the binding's rendered text, never by marked's token text through a markdown-stripping normalizer",
    probes: [
      { id: "HEADING-PARENLINK", reader: "renderedHeading", markdown: "## [GraphPolicyCLI](https://example.invalid/(wb-v03p)) boundary", reading: BOUND },
      { id: "HEADING-SNAKE", reader: "renderedHeading", markdown: "# Notes on snake_case names", reading: "Notes on snake_case names" },
    ],
  },
  {
    id: "G-U3-WS4",
    quote: "each Unicode space separator beyond the no-break space reads as one space",
    probes: [
      spaced("HEADING-U+1680", 0x1680, BOUND),
      spaced("HEADING-U+2000", 0x2000, BOUND),
      spaced("HEADING-U+2002", 0x2002, BOUND),
      spaced("HEADING-U+2003", 0x2003, BOUND),
      spaced("HEADING-U+2009", 0x2009, BOUND),
      spaced("HEADING-U+200A", 0x200a, BOUND),
      spaced("HEADING-U+202F", 0x202f, BOUND),
      spaced("HEADING-U+205F", 0x205f, BOUND),
      spaced("HEADING-U+3000", 0x3000, BOUND),
      { id: "HEADING-TITLE-EM", reader: "renderedHeading", markdown: `# ${TITLE(cp(0x2003))}`, reading: TITLE(" ") },
      spaced("HEADING-U+0009", 0x09, BOUND),
      spaced("HEADING-U+00A0", 0xa0, BOUND),
    ],
  },
  {
    id: "G-U3-ZS",
    quote: "a line tabulation, a form feed and U+FEFF read as one space",
    probes: [
      spaced("HEADING-U+000B", 0x0b, BOUND),
      spaced("HEADING-U+000C", 0x0c, BOUND),
      spaced("HEADING-U+FEFF", 0xfeff, BOUND),
      spaced("HEADING-U+200B", 0x200b, `GraphPolicyCLI${cp(0x200b)}boundary`),
    ],
  },
  {
    id: "G5-U1-GPSEP",
    quote: "an uppercase GP beside a separator reads as the abbreviation",
    probes: [
      vocabulary("GPSEP-ROSTER", { resultKeys: ["trace_GP", "GP_NOTE", "output"] }, {}, ["roster:result.trace_GP", "roster:result.GP_NOTE"]),
      vocabulary("GPSEP-VALUES", {}, { result: { labels: ["trace_GP", "GP_NOTE", "GPU"] } }, ["fixture:result.labels[0]", "fixture:result.labels[1]"]),
    ],
  },
  {
    id: "G5-U1-TAILSEP",
    quote: "a lowercase gp ending a term after a separator reads as the abbreviation",
    probes: [
      vocabulary("TAILSEP-ROSTER", { resultKeys: ["note_gp", "rf_gp", "output"] }, {}, ["roster:result.note_gp", "roster:result.rf_gp"]),
      vocabulary("TAILSEP-VALUES", {}, { result: { labels: ["note_gp", "rf_gp", "rf_gpu"] } }, ["fixture:result.labels[0]", "fixture:result.labels[1]"]),
    ],
  },
  {
    id: "G5-U1-HUMPSEP",
    quote: "a lowercase gp after a separator and before an uppercase letter reads as the abbreviation",
    probes: [
      vocabulary("HUMPSEP-ROSTER", { resultKeys: ["rf_gpTrace", "rf_gpNote", "output"] }, {}, ["roster:result.rf_gpTrace", "roster:result.rf_gpNote"]),
      vocabulary("HUMPSEP-VALUES", {}, { result: { labels: ["rf_gpTrace", "rf_gpNote", "rf_gpuTrace"] } }, ["fixture:result.labels[0]", "fixture:result.labels[1]"]),
    ],
  },
];

interface ExportRow {
  readonly description: string;
  readonly notes: string;
}
function isRecord(value: unknown): value is { readonly [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
/** The tracker export's rows for `ids` (one JSON object per line), read once. */
function exportRows(ids: readonly string[]): Map<string, ExportRow> {
  const rows = new Map<string, ExportRow>();
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    const id = ids.find(candidate => line.includes(`"id":${JSON.stringify(candidate)},`));
    if (id === undefined) continue;
    const parsed: unknown = JSON.parse(line);
    if (!isRecord(parsed) || parsed.id !== id) continue;
    rows.set(id, {
      description: typeof parsed.description === "string" ? parsed.description : "",
      notes: typeof parsed.notes === "string" ? parsed.notes : "",
    });
  }
  for (const id of ids) if (!rows.has(id)) throw new Error(`the tracker export holds no row ${id}`);
  return rows;
}
interface DescribedRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
  readonly twins: readonly (readonly string[])[];
}
/** wb-v03p's numbered deferred-scope lines: '<n>. <id> <label>: <ids>' and, on a line naming them, ' (twins <groups> in the key roster)'. */
function describedRows(description: string): DescribedRow[] {
  return [...description.matchAll(/^(\d+)\. (U\d+) ([^:\n]+): ([^\n(]+?)(?: \(twins ([^)\n]+) in the key roster\))?\.$/gm)].map((match, index) => {
    expect(match[1], `deferred-scope line ${index + 1} is numbered in order`).toBe(String(index + 1));
    return {
      id: match[2] ?? "",
      label: match[3] ?? "",
      pins: (match[4] ?? "").split(", "),
      twins: match[5] === undefined ? [] : match[5].split(", ").map(group => group.split("/")),
    };
  });
}

describe("wb-v03p rf GraphPolicy-context readers census (the reader coverage of wb-b4lg's three frozen classes and its R-B221 fold)", () => {
  it("SHAPE: the frozen rows, pins, quotes and probes", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["U1:3", "U2:3", "U3:3", "V:3"]);
    expect(ROWS.map(row => [row.id, row.label, ...row.pins])).toEqual([
      ["U1", "record item forms", "G-U1-CASE", "G-U1-LIST", "G-U1-LISTF"],
      ["U2", "planted-positions handoff and compare", "G-U2-HASKEYS", "G-U2-OUTPUTSOF", "G-U2-CALLSITE"],
      ["U3", "docs locates", "M-NORM-FULL", "G-U3-WS4", "G-U3-ZS"],
      ["V", "the R-B221 fold: the claimed case forms beside a separator", "G5-U1-GPSEP", "G5-U1-TAILSEP", "G5-U1-HUMPSEP"],
    ]);
    expect(PINS.map(pin => pin.id)).toEqual(ROWS.flatMap(row => row.pins));
    expect(PINS.map(pin => `${pin.id}: ${pin.quote}`)).toEqual([
      "G-U1-CASE: a title-case Gp and an uppercase GP before a capitalized word read as the abbreviation",
      "G-U1-LIST: the abbreviation is read on the roster's work and work-metrics key lists",
      "G-U1-LISTF: a field word is read on the roster's result, provenance and work key lists",
      "G-U2-HASKEYS: the read log notes a key-presence and a key-list read of a planted object",
      "G-U2-OUTPUTSOF: outputsOf hands each reader's own run output and control to that reader's slots",
      "G-U2-CALLSITE: Z2's call site compares each render variant's planted outputs, as handed, with its plain outputs",
      "M-NORM-FULL: a heading reads by the binding's rendered text, never by marked's token text through a markdown-stripping normalizer",
      "G-U3-WS4: each Unicode space separator beyond the no-break space reads as one space",
      "G-U3-ZS: a line tabulation, a form feed and U+FEFF read as one space",
      "G5-U1-GPSEP: an uppercase GP beside a separator reads as the abbreviation",
      "G5-U1-TAILSEP: a lowercase gp ending a term after a separator reads as the abbreviation",
      "G5-U1-HUMPSEP: a lowercase gp after a separator and before an uppercase letter reads as the abbreviation",
    ]);
    expect(PINS.map(pin => [pin.id, ...pin.probes.map(probe => `${probe.reader}:${probe.id}`)])).toEqual([
      ["G-U1-CASE", "judgeRecord:CASE-ROSTER", "judgeRecord:CASE-VALUES"],
      ["G-U1-LIST", "judgeRecord:LIST-WORK"],
      ["G-U1-LISTF", "judgeRecord:LISTF-LISTS"],
      [
        "G-U2-HASKEYS",
        "logged:LOG-HAS-BOTH",
        "logged:LOG-HAS-WORKSPACE",
        "logged:LOG-OWNKEYS-BOTH",
        "logged:LOG-OWNKEYS-WORKSPACE",
        "logged:LOG-KEYS-WORKSPACE",
        "logged:LOG-GET-WORKSPACE",
        "logged:LOG-GOPD-WORKSPACE",
        "logged:LOG-HAS-UNPLANTED",
        "logged:LOG-HAS-CLOSED",
      ],
      ["G-U2-OUTPUTSOF", "outputsOf:RUNS-DISTINCT"],
      ["G-U2-CALLSITE", "Z2_CALL_SITE.compare:COMPARE-AS-HANDED"],
      ["M-NORM-FULL", "renderedHeading:HEADING-PARENLINK", "renderedHeading:HEADING-SNAKE"],
      [
        "G-U3-WS4",
        "renderedHeading:HEADING-U+1680",
        "renderedHeading:HEADING-U+2000",
        "renderedHeading:HEADING-U+2002",
        "renderedHeading:HEADING-U+2003",
        "renderedHeading:HEADING-U+2009",
        "renderedHeading:HEADING-U+200A",
        "renderedHeading:HEADING-U+202F",
        "renderedHeading:HEADING-U+205F",
        "renderedHeading:HEADING-U+3000",
        "renderedHeading:HEADING-TITLE-EM",
        "renderedHeading:HEADING-U+0009",
        "renderedHeading:HEADING-U+00A0",
      ],
      ["G-U3-ZS", "renderedHeading:HEADING-U+000B", "renderedHeading:HEADING-U+000C", "renderedHeading:HEADING-U+FEFF", "renderedHeading:HEADING-U+200B"],
      ["G5-U1-GPSEP", "judgeRecord:GPSEP-ROSTER", "judgeRecord:GPSEP-VALUES"],
      ["G5-U1-TAILSEP", "judgeRecord:TAILSEP-ROSTER", "judgeRecord:TAILSEP-VALUES"],
      ["G5-U1-HUMPSEP", "judgeRecord:HUMPSEP-ROSTER", "judgeRecord:HUMPSEP-VALUES"],
    ]);
  });

  it("ANCHOR: the rows, pins and twins are the ones the tracker export records", () => {
    const rows = exportRows(["wb-v03p", "wb-b4lg"]);
    const child = rows.get("wb-v03p") ?? { description: "", notes: "" };
    const parent = rows.get("wb-b4lg") ?? { description: "", notes: "" };
    const classes = ROWS.filter(row => /^U\d+$/.test(row.id));
    const pinOf = (id: string): Pin => PINS.find(pin => pin.id === id) ?? { id, quote: "", probes: [] };
    // (1) wb-v03p's description: the deferred-scope lines, their count word and U1's twins.
    const described = describedRows(child.description);
    expect(child.description.match(/^\d+\. /gm)?.length, "every numbered line of the description is a deferred-scope line read here").toBe(described.length);
    expect(described.map(row => [row.id, row.label, ...row.pins])).toEqual(classes.map(row => [row.id, row.label, ...row.pins]));
    expect(child.description.match(/\(all (\w+) classes re-failed/)?.[1]).toBe(COUNT[classes.length]);
    for (const row of described) {
      if (row.twins.length === 0) continue;
      expect(row.twins.length, `${row.id}: one twin group per pin`).toBe(row.pins.length);
      for (const [index, group] of row.twins.entries()) {
        const pin = row.pins[index] ?? "";
        for (const twin of group) expect(rosterKeysOf(pinOf(pin)), `${pin} holds the description's twin ${twin}`).toContain(twin);
      }
    }
    expect(described.filter(row => row.twins.length > 0).map(row => row.id)).toEqual(["U1"]);
    // (2) wb-b4lg's refusal #3 verdict: its surviving members, in order, with their count word.
    const verdict = parent.notes.indexOf(REFUSAL_3);
    expect(verdict, "wb-b4lg's notes hold the refusal #3 verdict").toBeGreaterThanOrEqual(0);
    const survivors = parent.notes.slice(verdict).match(/with (\w+) surviving non-equivalent gate-authored members \(([^)]*)\)/);
    expect(survivors?.[2]?.split(", ")).toEqual(classes.flatMap(row => row.pins));
    expect(survivors?.[1]).toBe(COUNT[classes.flatMap(row => row.pins).length]);
    // (3) the R-B221 fold on wb-v03p's notes and wb-b4lg's refusal #4 verdict (exported from the landing-754 ledger hop on).
    const fold = ROWS.find(row => row.id === "V") ?? { id: "V", label: "", pins: [] };
    const foldAt = child.notes.indexOf(FOLD);
    expect(foldAt, "wb-v03p's notes hold the R-B221 fold block").toBeGreaterThanOrEqual(0);
    const [header, members] = child.notes.slice(foldAt).split("\n");
    expect(header).toContain(FOLD_MEMBERS);
    expect(members).toContain(`-${V_PREFIX}${fold.pins.map(id => id.slice(V_PREFIX.length)).join("-")}-`);
    const refusal4 = parent.notes.indexOf(REFUSAL_4);
    expect(refusal4, "wb-b4lg's notes hold the refusal #4 verdict").toBeGreaterThanOrEqual(0);
    const unmet = parent.notes.slice(refusal4);
    for (const id of fold.pins) {
      const twin = unmet.match(new RegExp(`- ${id}: '[^\\n]*?'\\. Twin ([^\\s:]+):`))?.[1];
      expect(twin, `refusal #4 names ${id}'s twin`).toBeDefined();
      expect(rosterKeysOf(pinOf(id)), `${id} holds refusal #4's twin ${twin}`).toContain(twin);
    }
  });

  for (const pin of PINS) {
    it(`${pin.id}: ${pin.quote}`, () => {
      for (const probe of pin.probes) expect(readingOf(probe), `${pin.id} ${probe.id}`).toEqual(probe.reading);
    });
  }
});
