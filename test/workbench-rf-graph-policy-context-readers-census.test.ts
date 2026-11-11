/**
 * wb-v03p readers census, cut #2 (respin 1: the respin of refusal #1, gate run g10-gate-s174, gate-refused M:44600, outbox O:1667),
 * the rule-19 structural-exit child of wb-b4lg: ruling R-B176 filed it at refusal #3 to carry the reader coverage of the three frozen
 * classes, and ruling R-B221 executed the dependency inversion at refusal #4, folding that refusal's U1 members into it. SUBJECT: the
 * record judge, the read log, the run-output and compare readers and the heading reader of the wb-e9dy rf GraphPolicy-context census,
 * whose code is moved byte for byte from wb-b4lg's FINAL cut #4 (tip a6d757fe; the parent's doc comments are not copied) into
 * test/helpers/rf-e9dy-census-readers.ts, beside Z2_CALL_SITE, which holds that census's Z2 compare call verbatim; this cut leaves
 * that helper unchanged. The parent's cut #4 census and roster are not on trunk and are neither added nor edited here; trunk's
 * test/workbench-rf-graph-policy-context-census.test.ts (wb-r63c's) is not edited either. The parent stays parked until this lands,
 * and its later re-cut can import the helper.
 *
 * PINNED READER SET (this file, test/workbench-rf-graph-policy-context-readers-census.test.ts: 18 registered cases, each named here;
 * observed at the cut: 18 passed (18) on the moved readers):
 * - The 12 pin cases "<pin>: <quote>", one per entry of PROBES BY PIN below, in that order. Each asserts, for every probe of its pin,
 *   that the reader named beside the probe returns exactly the probe's literal reading (toEqual over the reader's whole output); its
 *   quote states readings of its own probes and of no other input. How each reader is driven: judgeRecord over a probe's items -
 *   recordItems of its envelope under the real record's "fixture:" prefix, then rosterItems of its four key lists under the real
 *   record's "roster:" prefix - its reading the whole verdict, the vocabulary positions and the fields positions; logged over a probe
 *   envelope handed through a fresh read log at the path "envelope", the probe's one read made on the handed workspace object (the
 *   four plants of plantFields on each position the probe names), its reading the log's noted positions, sorted; outputsOf over a
 *   probe's two runs; Z2_CALL_SITE.compare over a probe's plain and planted outputs per render variant; renderedHeading over the first
 *   heading token marked lexes from a probe's markdown.
 * - SHAPE: the rows as `${id}:${pins.length}`, each row with its label and pins, each pin with its quote, and each pin with its probe
 *   readers and ids, each held to a literal (standing rule 16's frozen shape).
 * - ANCHOR: the outside anchors read at run time from the tracked tracker export .beads/issues.jsonl, never retyped as the
 *   expectation: (1) wb-v03p's description: its numbered lines are exactly rows U1-U3, in order, each '<n>. <id> <label>: <member
 *   ids>' with the member ids equal to the row's pins in order; its count word ('all three classes') equals the number of those rows;
 *   and the U1 line's twins, one group per pin in pin order, are each a roster key of that pin's probes; (2) wb-b4lg's refusal #3
 *   verdict (the one naming tip e1fa3207) names its surviving members, in order and with a count word equal to their number, as rows
 *   U1-U3's pins; (3) wb-v03p's notes hold the R-B221 fold block, whose member line names row V's pins in order as
 *   G5-U1-<suffix>-<suffix>-<suffix>, and wb-b4lg's refusal #4 verdict (the one naming tip a6d757fe) names, in the member bullet of
 *   each row V pin, its twin, a roster key of that pin's probes.
 * - REFUSAL #1: wb-v03p's refusal #1 verdict in the same export (seat gate-prep-18, run g10-gate-s174), read in its UNMET block:
 *   (a) the one-edit helper members it lists as "(<letter>) G18-..." are G18's, in order; (b) the witness ids it names are
 *   WITNESSES_1, in order, and the W- probes here are exactly those ids but W-WS-U+2001; (c) every witness id a member's line names is
 *   a probe of the pin G18 pairs with that member (W-WS-U+2001 standing for the code points of (d)), and the only member whose line
 *   names none is G18-U3-WSPLANT; (d) the code points it names as not probed ("Six are not probed: ...", whose count word equals
 *   their number) are each a spaced probe of G-U3-WS4; (e) each roster key of each W- record probe is named, as a whole word, in that
 *   probe's witness sentence (a control holds that a key inside a longer word is not named); (f) the probe ids its U4 item names are
 *   U4_PROBES, in order, each a probe here.
 * - ROSTER: the out-of-file anchor test/fixtures/rf-graph-policy-context-readers-roster.json equals, exactly and in census order,
 *   every row (id, label, pins), every pin (id, quote) with every probe (id, reader and the SHA-256 of the probe as written: its input
 *   and its literal reading, a non-finite number or -0 spelled out; a control holds that W-CALLNAN's NaN and a null hash apart), the
 *   G18 table, WITNESSES_1 and U4_PROBES.
 * - WHITESPACE: the engine's own tables hold the spaced heading probes (each named HEADING-U+<its code point>): G-U3-WS4's are exactly
 *   the engine's \p{Zs} code points but U+0020, in code point order, then the tab; together with G-U3-ZS's one-space probes (U+000B,
 *   U+000C and U+FEFF) they are exactly the engine's JavaScript white space but U+0020 (\s without the four code points `.` refuses,
 *   which the engine's tables hold to be the line terminators U+000A, U+000D, U+2028 and U+2029); and G-U3-ZS's U+200B probe, which
 *   reads as written, is no white space.
 * - HEADER: the PROBES BY PIN entries below equal PINS, pin for pin and probe for probe, both ways.
 *
 * PROBES BY PIN (pin order; each entry is held to PINS both ways):
 * - G-U1-CASE: CASE-ROSTER, CASE-VALUES, W-CASEMID
 * - G-U1-LIST: LIST-WORK, W-LISTCAMEL
 * - G-U1-LISTF: LISTF-LISTS, W-LISTFEMB, W-LISTFTITLE
 * - G-U2-HASKEYS: LOG-HAS-BOTH, LOG-HAS-WORKSPACE, LOG-OWNKEYS-BOTH, LOG-OWNKEYS-WORKSPACE, LOG-KEYS-WORKSPACE, LOG-GET-WORKSPACE,
 *   LOG-GOPD-WORKSPACE, LOG-HAS-UNPLANTED, LOG-HAS-CLOSED, W-HASABSENT
 * - G-U2-OUTPUTSOF: RUNS-DISTINCT, W-OUTNULL
 * - G-U2-CALLSITE: COMPARE-AS-HANDED, W-CALLNAN
 * - M-NORM-FULL: HEADING-PARENLINK, HEADING-SNAKE, W-NORM-EMPH, W-NORM-CODE, W-NORM-AMP, W-NORM-HTML
 * - G-U3-WS4: HEADING-U+00A0, HEADING-U+1680, HEADING-U+2000, HEADING-U+2001, HEADING-U+2002, HEADING-U+2003, HEADING-U+2004,
 *   HEADING-U+2005, HEADING-U+2006, HEADING-U+2007, HEADING-U+2008, HEADING-U+2009, HEADING-U+200A, HEADING-U+202F, HEADING-U+205F,
 *   HEADING-U+3000, HEADING-U+0009, HEADING-TITLE-EM
 * - G-U3-ZS: HEADING-U+000B, HEADING-U+000C, HEADING-U+FEFF, HEADING-U+200B
 * - G5-U1-GPSEP: GPSEP-ROSTER, GPSEP-VALUES, W-GPSEP-HYPHEN
 * - G5-U1-TAILSEP: TAILSEP-ROSTER, TAILSEP-VALUES, W-TAILSEP-HYPHEN
 * - G5-U1-HUMPSEP: HUMPSEP-ROSTER, HUMPSEP-VALUES, W-HUMPSEP-HYPHEN
 *
 * CLAIMS AND THEIR FALSIFIERS.
 * (1) On each probe the reader named beside it returns exactly the probe's literal reading, and each pin's quote states readings of
 *     its own probes and of no other input: a reader edit that changes one probe's reading reds that pin case.
 * (2) Rows U1-U3, their labels and pins are the ones wb-v03p's description and wb-b4lg's refusal #3 record, row V's pins are the
 *     R-B221 fold's, and U1's and V's probes hold the description's and refusal #4's twins: a pin or a row removed, swapped or
 *     relabelled - in one literal or in every literal of this file together - reds SHAPE, ANCHOR, ROSTER or HEADER (standing rule
 *     16's CT1-CT6).
 * (3) Refusal #1's one-edit helper members, its witnesses, its unprobed Zs code points and its U4 probes are held as REFUSAL #1
 *     states: a W- probe, a U4 probe or one of those code points removed, or a witness moved to another pin, in every literal of this
 *     file together reds REFUSAL #1.
 * (4) Every row, pin, quote and probe - each probe's input and literal reading - is held to the out-of-file roster: a probe removed,
 *     added or edited, a label or a quote edited, or a pin or a row removed, in ROWS or PINS - alone or together with SHAPE and this
 *     header - reds ROSTER.
 * (5) The spaced heading probes of G-U3-WS4 and G-U3-ZS are the engine's white-space tables as WHITESPACE states: a spaced probe
 *     removed in every literal of this file and in the roster together reds WHITESPACE.
 * (6) A measurement of these bytes, recorded in the delivery note and not re-run here: each named member - the nine refusal #3
 *     survivors and the three R-B221-folded members of wb-b4lg's refusals, the three GL2 members refusal #4 replicated, and refusal
 *     #1's thirteen one-edit helper members (G18) - applied in place to the helper (restored byte-identical after each run) reds the
 *     pin case it is named for or paired with, and each hollow-reader floor reds.
 *
 * NOT CLAIMED (scope sentences: each bounds what this census proves; none is a residual or an unresolved failure):
 * - A reading on any input that is not one of these probes is NOT CLAIMED by this census - every other key, key list, string value or
 *   envelope position, every other read, path or envelope of the read log, every other run, output or render-variant shape, and
 *   every other heading, markup, code point or position: each quote names its own probes only.
 * - The line terminators U+000A, U+000D, U+2028 and U+2029 (the four white-space code points `.` refuses, as WHITESPACE holds) in
 *   place of the heading's space are NOT CLAIMED by this census.
 * - The parent census's own cases, plants, header and roster are NOT CLAIMED by this census, and so is whether the parent census
 *   calls these readers: this census holds the helper's readers, and the parent's later re-cut decides what it imports. Z2_CALL_SITE
 *   is the parent's compare call moved, not the parent's loop: the outputs the parent hands it are NOT CLAIMED by this census.
 * - Whether a later edit keeps each named member red is NOT CLAIMED by this census: it re-runs no member (claim (6) is a measurement
 *   of these bytes). G18-U3-WSPLANT's pairing with G-U3-WS4, the GL2 association of each row V pin's second word, and the wording of
 *   row V's label and of the quotes are this file's and the roster's, held by no outside anchor: an edit made in this file and the
 *   roster together is NOT CLAIMED by this census beyond the export and engine anchors of claims (2), (3) and (5).
 * - No residual is claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated; the tracker export, the roster and this file are only read; no src,
 * docs or receipt is edited.
 */
import { createHash } from "node:crypto";
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
/** The out-of-file anchor of this file's rows, pins, quotes and probes (claim (4)). */
const ROSTER_FILE = "test/fixtures/rf-graph-policy-context-readers-roster.json";
/** The opening of wb-b4lg's refusal #3 verdict and of its refusal #4 verdict (bead notes, append-only). */
const REFUSAL_3 = "refusal #3 on the R-B136-frozen enumerate-the-resolvable cut #3 (tip e1fa320766a2cdfe784ab0142c5d092f2c6f2763";
const REFUSAL_4 = "substance refusal #4 on the R-B176 FINAL fail-closed-core cut #4 (a6d757fecf2070de00d3d4f587dff55d46c0f5af";
/** The R-B221 fold block's opening on wb-v03p's notes, its header's tail, and the prefix its member line names row V's members by. */
const FOLD = "RULE19 DEPENDENCY INVERSION R-B221";
const FOLD_MEMBERS = "members folded into wb-v03p";
const V_PREFIX = "G5-U1-";
/** The opening of wb-v03p's refusal #1 verdict, of its UNMET block and of the record section after that block (bead notes, append-only). */
const REFUSAL_1 = "GATE VERDICT wb-v03p (BIND seat gate-prep-18, run g10-gate-s174";
const UNMET_1 = "UNMET (record.unmet verbatim";
const AFTER_UNMET_1 = "RED (record.red verbatim";
/** A witness id as refusal #1 writes it (W-WS-U+2001 heads its list of the code points it names as not probed). */
const WITNESS_ID = /\bW-(?:[A-Z0-9]+-)*[A-Z0-9]+(?:\+[0-9A-F]{4})?/g;
const COUNT = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const cp = (point: number): string => String.fromCodePoint(point);
const label = (point: number): string => `U+${point.toString(16).toUpperCase().padStart(4, "0")}`;

type Read = "has" | "hasAbsent" | "ownKeys" | "keys" | "get" | "getOwnPropertyDescriptor";
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
  /** A spaced probe's code point, written in place of the posture heading's space. */
  readonly point?: number;
}
type Probe = RecordProbe | LogProbe | RunsProbe | CompareProbe | HeadingProbe;
type SpacedProbe = HeadingProbe & { readonly point: number };
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
  hasAbsent: object => "absent" in object,
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
function isSpaced(probe: Probe): probe is SpacedProbe {
  return probe.reader === "renderedHeading" && probe.point !== undefined;
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
/** Every roster key a record probe lists, across its four key lists. */
function probeRosterKeys(probe: RecordProbe): string[] {
  return [...(probe.lists.resultKeys ?? []), ...(probe.lists.provenanceKeys ?? []), ...(probe.lists.workKeys ?? []), ...(probe.lists.workMetricsKeys ?? [])];
}
/** Every roster key a pin's record probes list, across the four key lists. */
function rosterKeysOf(pin: Pin): string[] {
  return pin.probes.flatMap(probe => (probe.reader === "judgeRecord" ? probeRosterKeys(probe) : []));
}

/** A record probe whose reading lists nothing but the vocabulary it names. */
function vocabulary(id: string, lists: Partial<KeyLists>, envelope: JsonObject, found: readonly string[]): RecordProbe {
  return { id, reader: "judgeRecord", lists, envelope, reading: { vocabulary: found, fields: [] } };
}
/** A record probe of roster key lists alone whose reading lists nothing but the fields it names. */
function fields(id: string, lists: Partial<KeyLists>, found: readonly string[]): RecordProbe {
  return { id, reader: "judgeRecord", lists, envelope: {}, reading: { vocabulary: [], fields: found } };
}
const POSTURE = "## GraphPolicyCLI";
const BOUND = "GraphPolicyCLI boundary";
/** The posture heading with `point` in place of its space, named for that code point. */
function spaced(point: number, reading: string = BOUND): SpacedProbe {
  return { id: `HEADING-${label(point)}`, reader: "renderedHeading", markdown: `${POSTURE}${cp(point)}boundary`, reading, point };
}
const TITLE = (space: string): string => `03 ${cp(0x2014)} High-level architecture,${space}module ownership and dataflow`;
const QUIET = { score: null, receipt: null };
const PRESENCE = { topology: { score: 0.5, receipt: "receipt-topology" }, evidence: { score: 0.5, receipt: "receipt-evidence" } };
const PLAIN: ReaderOutputs = { topology: { projection: "plain" }, evidence: { id: "rfo_plain" }, presence: { topology: QUIET, evidence: QUIET } };
const PRESENCE_FALSE = { topology: false, evidence: false };
/** W-CALLNAN's outputs, the same in every render variant: a planted evidence score NaN beside a plain evidence score null. */
const PLAIN_SCORED: ReaderOutputs = { topology: { projection: "plain" }, evidence: { id: "rfo", score: null }, presence: { topology: QUIET, evidence: QUIET } };
const NAN_PAIR = { plain: PLAIN_SCORED, planted: { ...PLAIN_SCORED, evidence: { id: "rfo", score: Number.NaN } } };
const NAN_READING = { topology: true, evidence: false, presence: { topology: true, evidence: true } };

const ROWS: readonly Row[] = [
  { id: "U1", label: "record item forms", pins: ["G-U1-CASE", "G-U1-LIST", "G-U1-LISTF"] },
  { id: "U2", label: "planted-positions handoff and compare", pins: ["G-U2-HASKEYS", "G-U2-OUTPUTSOF", "G-U2-CALLSITE"] },
  { id: "U3", label: "docs locates", pins: ["M-NORM-FULL", "G-U3-WS4", "G-U3-ZS"] },
  { id: "V", label: "the R-B221 fold (refusal #4's twins)", pins: ["G5-U1-GPSEP", "G5-U1-TAILSEP", "G5-U1-HUMPSEP"] },
];

const PINS: readonly Pin[] = [
  {
    id: "G-U1-CASE",
    quote:
      "vocabulary lists the roster's result keys GpRank, GPRank, rfGpRank and rfGPRank and the envelope's string values GpRank and GPRank at result.notes[0] and [1]; the roster's result keys output and gpuCount and the envelope's gpu-runner at result.notes[2] are listed nowhere",
    probes: [
      vocabulary("CASE-ROSTER", { resultKeys: ["GpRank", "GPRank", "output", "gpuCount"] }, {}, ["roster:result.GpRank", "roster:result.GPRank"]),
      vocabulary("CASE-VALUES", {}, { result: { notes: ["GpRank", "GPRank", "gpu-runner"] } }, ["fixture:result.notes[0]", "fixture:result.notes[1]"]),
      vocabulary("W-CASEMID", { resultKeys: ["rfGpRank", "rfGPRank"] }, {}, ["roster:result.rfGpRank", "roster:result.rfGPRank"]),
    ],
  },
  {
    id: "G-U1-LIST",
    quote: "vocabulary lists the roster's work keys gp_layer and gpLayer and its work-metrics keys gp_count and countGP; the roster's work-metrics key token_count is listed nowhere",
    probes: [
      vocabulary("LIST-WORK", { workKeys: ["gp_layer"], workMetricsKeys: ["gp_count", "token_count"] }, {}, ["roster:result.work.gp_layer", "roster:result.work_metrics.gp_count"]),
      vocabulary("W-LISTCAMEL", { workKeys: ["gpLayer"], workMetricsKeys: ["countGP"] }, {}, ["roster:result.work.gpLayer", "roster:result.work_metrics.countGP"]),
    ],
  },
  {
    id: "G-U1-LISTF",
    quote:
      "fields lists the roster's result keys score_total, embedding_dim and ScoreTotal, its provenance keys receipt_digest and embeddings_seen, its work keys rankings_seen, embedding and RankingsSeen and its work-metrics key score_count, and vocabulary lists none of them; the roster's work-metrics key token_count is listed nowhere",
    probes: [
      fields("LISTF-LISTS", { resultKeys: ["score_total"], provenanceKeys: ["receipt_digest"], workKeys: ["rankings_seen"], workMetricsKeys: ["score_count", "token_count"] }, [
        "roster:result.score_total",
        "roster:result.provenance.receipt_digest",
        "roster:result.work.rankings_seen",
        "roster:result.work_metrics.score_count",
      ]),
      fields("W-LISTFEMB", { resultKeys: ["embedding_dim"], provenanceKeys: ["embeddings_seen"], workKeys: ["embedding"] }, [
        "roster:result.embedding_dim",
        "roster:result.provenance.embeddings_seen",
        "roster:result.work.embedding",
      ]),
      fields("W-LISTFTITLE", { resultKeys: ["ScoreTotal"], workKeys: ["RankingsSeen"] }, ["roster:result.ScoreTotal", "roster:result.work.RankingsSeen"]),
    ],
  },
  {
    id: "G-U2-HASKEYS",
    quote:
      "on the planted workspace object the reads 'score' in, 'absent' in, Reflect.ownKeys, Object.keys, .score and Object.getOwnPropertyDescriptor of 'score' each note envelope.workspace, 'score' in and Reflect.ownKeys note envelope too when the root is planted, and 'score' in notes nothing on an unplanted envelope or with the log closed",
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
      { id: "W-HASABSENT", reader: "logged", planted: ["envelope.workspace"], live: true, read: "hasAbsent", reading: ["envelope.workspace"] },
    ],
  },
  {
    id: "G-U2-OUTPUTSOF",
    quote: "outputsOf puts RUNS-DISTINCT's topology and evidence run outputs and controls each in its own run's slots, and W-OUTNULL's null evidence output and null controls stay null beside its topology output",
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
      {
        id: "W-OUTNULL",
        reader: "outputsOf",
        runs: {
          topology: { output: { projection: "topology-run" }, planted: [], read: [], presence: null },
          evidence: { output: null, planted: [], read: [], presence: null },
        },
        reading: { topology: { projection: "topology-run" }, evidence: null, presence: { topology: null, evidence: null } },
      },
    ],
  },
  {
    id: "G-U2-CALLSITE",
    quote:
      "per render variant of COMPARE-AS-HANDED a planted output that differs from the plain one reads false in its slot and an equal one true, and every variant of W-CALLNAN reads evidence false for a planted evidence score NaN beside a plain score null",
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
      {
        id: "W-CALLNAN",
        reader: "Z2_CALL_SITE.compare",
        outputs: { clean: NAN_PAIR, flagged: NAN_PAIR, overBudget: NAN_PAIR, notObserved: NAN_PAIR, fixtureSeam: NAN_PAIR },
        reading: { clean: NAN_READING, flagged: NAN_READING, overBudget: NAN_READING, notObserved: NAN_READING, fixtureSeam: NAN_READING },
      },
    ],
  },
  {
    id: "M-NORM-FULL",
    quote:
      "'## [GraphPolicyCLI](https://example.invalid/(wb-v03p)) boundary', '## *GraphPolicyCLI* boundary', '## `GraphPolicyCLI` boundary' and '## <b>GraphPolicyCLI</b> boundary' read as 'GraphPolicyCLI boundary', '## GraphPolicyCLI &amp; boundary' as 'GraphPolicyCLI & boundary', and '# Notes on snake_case names' as 'Notes on snake_case names'",
    probes: [
      { id: "HEADING-PARENLINK", reader: "renderedHeading", markdown: "## [GraphPolicyCLI](https://example.invalid/(wb-v03p)) boundary", reading: BOUND },
      { id: "HEADING-SNAKE", reader: "renderedHeading", markdown: "# Notes on snake_case names", reading: "Notes on snake_case names" },
      { id: "W-NORM-EMPH", reader: "renderedHeading", markdown: "## *GraphPolicyCLI* boundary", reading: BOUND },
      { id: "W-NORM-CODE", reader: "renderedHeading", markdown: "## `GraphPolicyCLI` boundary", reading: BOUND },
      { id: "W-NORM-AMP", reader: "renderedHeading", markdown: "## GraphPolicyCLI &amp; boundary", reading: "GraphPolicyCLI & boundary" },
      { id: "W-NORM-HTML", reader: "renderedHeading", markdown: "## <b>GraphPolicyCLI</b> boundary", reading: BOUND },
    ],
  },
  {
    id: "G-U3-WS4",
    quote:
      "each \\p{Zs} code point but U+0020 (U+00A0, U+1680, U+2000 to U+200A, U+202F, U+205F and U+3000) and the tab, in place of the space of '## GraphPolicyCLI boundary', and an em space after the comma of docs/03's title read as one space",
    probes: [
      spaced(0xa0),
      spaced(0x1680),
      spaced(0x2000),
      spaced(0x2001),
      spaced(0x2002),
      spaced(0x2003),
      spaced(0x2004),
      spaced(0x2005),
      spaced(0x2006),
      spaced(0x2007),
      spaced(0x2008),
      spaced(0x2009),
      spaced(0x200a),
      spaced(0x202f),
      spaced(0x205f),
      spaced(0x3000),
      spaced(0x09),
      { id: "HEADING-TITLE-EM", reader: "renderedHeading", markdown: `# ${TITLE(cp(0x2003))}`, reading: TITLE(" ") },
    ],
  },
  {
    id: "G-U3-ZS",
    quote: "U+000B, U+000C and U+FEFF in place of the space of '## GraphPolicyCLI boundary' read as one space, and U+200B there stays as written",
    probes: [spaced(0x0b), spaced(0x0c), spaced(0xfeff), spaced(0x200b, `GraphPolicyCLI${cp(0x200b)}boundary`)],
  },
  {
    id: "G5-U1-GPSEP",
    quote:
      "vocabulary lists the roster's result keys trace_GP, GP_NOTE, trace-GP and GP-note and the envelope's string values trace_GP and GP_NOTE at result.labels[0] and [1]; the roster's result key output and the envelope's GPU at result.labels[2] are listed nowhere",
    probes: [
      vocabulary("GPSEP-ROSTER", { resultKeys: ["trace_GP", "GP_NOTE", "output"] }, {}, ["roster:result.trace_GP", "roster:result.GP_NOTE"]),
      vocabulary("GPSEP-VALUES", {}, { result: { labels: ["trace_GP", "GP_NOTE", "GPU"] } }, ["fixture:result.labels[0]", "fixture:result.labels[1]"]),
      vocabulary("W-GPSEP-HYPHEN", { resultKeys: ["trace-GP", "GP-note"] }, {}, ["roster:result.trace-GP", "roster:result.GP-note"]),
    ],
  },
  {
    id: "G5-U1-TAILSEP",
    quote:
      "vocabulary lists the roster's result keys note_gp, rf_gp and note-gp and the envelope's string values note_gp and rf_gp at result.labels[0] and [1]; the roster's result key output and the envelope's rf_gpu at result.labels[2] are listed nowhere",
    probes: [
      vocabulary("TAILSEP-ROSTER", { resultKeys: ["note_gp", "rf_gp", "output"] }, {}, ["roster:result.note_gp", "roster:result.rf_gp"]),
      vocabulary("TAILSEP-VALUES", {}, { result: { labels: ["note_gp", "rf_gp", "rf_gpu"] } }, ["fixture:result.labels[0]", "fixture:result.labels[1]"]),
      vocabulary("W-TAILSEP-HYPHEN", { resultKeys: ["note-gp"] }, {}, ["roster:result.note-gp"]),
    ],
  },
  {
    id: "G5-U1-HUMPSEP",
    quote:
      "vocabulary lists the roster's result keys rf_gpTrace, rf_gpNote and rf-gpTrace and the envelope's string values rf_gpTrace and rf_gpNote at result.labels[0] and [1]; the roster's result key output and the envelope's rf_gpuTrace at result.labels[2] are listed nowhere",
    probes: [
      vocabulary("HUMPSEP-ROSTER", { resultKeys: ["rf_gpTrace", "rf_gpNote", "output"] }, {}, ["roster:result.rf_gpTrace", "roster:result.rf_gpNote"]),
      vocabulary("HUMPSEP-VALUES", {}, { result: { labels: ["rf_gpTrace", "rf_gpNote", "rf_gpuTrace"] } }, ["fixture:result.labels[0]", "fixture:result.labels[1]"]),
      vocabulary("W-HUMPSEP-HYPHEN", { resultKeys: ["rf-gpTrace"] }, {}, ["roster:result.rf-gpTrace"]),
    ],
  },
];
function pinOf(id: string): Pin {
  return PINS.find(pin => pin.id === id) ?? { id, quote: "", probes: [] };
}

/** Refusal #1's thirteen one-edit helper members, in its order, each with the pin whose case its edit reds at this cut (claim (6)). */
const G18: readonly (readonly [member: string, pin: string])[] = [
  ["G18-U1-CASEMID", "G-U1-CASE"],
  ["G18-U1-LISTCAMEL", "G-U1-LIST"],
  ["G18-U1-LISTFEMB", "G-U1-LISTF"],
  ["G18-U1-LISTFTITLE", "G-U1-LISTF"],
  ["G18-V-GPHYPHEN", "G5-U1-GPSEP"],
  ["G18-V-TAILHYPHEN", "G5-U1-TAILSEP"],
  ["G18-V-HUMPHYPHEN", "G5-U1-HUMPSEP"],
  ["G18-U2-HASABSENT", "G-U2-HASKEYS"],
  ["G18-U2-OUTNULL", "G-U2-OUTPUTSOF"],
  ["G18-U2-CALLJSON", "G-U2-CALLSITE"],
  ["G18-U3-NORMX", "M-NORM-FULL"],
  ["G18-U3-WSENUM", "G-U3-WS4"],
  ["G18-U3-WSPLANT", "G-U3-WS4"],
];
/** The witness ids refusal #1's UNMET block names, in its order (W-WS-U+2001 heads its list of the six code points it names as not probed). */
const WITNESSES_1: readonly string[] = [
  "W-CASEMID",
  "W-LISTCAMEL",
  "W-LISTFEMB",
  "W-LISTFTITLE",
  "W-GPSEP-HYPHEN",
  "W-TAILSEP-HYPHEN",
  "W-HUMPSEP-HYPHEN",
  "W-HASABSENT",
  "W-OUTNULL",
  "W-CALLNAN",
  "W-NORM-EMPH",
  "W-NORM-CODE",
  "W-NORM-AMP",
  "W-NORM-HTML",
  "W-WS-U+2001",
];
/** The probes refusal #1's U4 item names (its coordinated probe removals), in its order. */
const U4_PROBES: readonly string[] = ["LOG-HAS-BOTH", "LOG-HAS-WORKSPACE", "LOG-OWNKEYS-BOTH", "LOG-OWNKEYS-WORKSPACE", "HEADING-U+3000"];

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
  for (const line of trackerExportText(join(REPO, EXPORT)).split("\n")) {
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
/** A whole-word match of `word` (letters, digits, underscores and hyphens bound a word). */
function namesWord(text: string, word: string): boolean {
  return new RegExp(`(?<![\\w-])${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`).test(text);
}

/** The SHA-256 of a probe as written - its input and its literal reading - with a non-finite number or -0 spelled out, as JSON would not. */
function probeHash(probe: Probe): string {
  const text = JSON.stringify(probe, (_key: string, value: unknown) =>
    typeof value === "number" && (!Number.isFinite(value) || Object.is(value, -0)) ? `number:${Object.is(value, -0) ? "-0" : String(value)}` : value,
  );
  return createHash("sha256").update(text).digest("hex");
}
/** Every row, pin, quote and probe of this file, the G18 table, WITNESSES_1 and U4_PROBES, in census order, as the roster holds them. */
function liveRoster(): unknown {
  return {
    rows: ROWS.map(row => ({ id: row.id, label: row.label, pins: row.pins })),
    pins: PINS.map(pin => ({ id: pin.id, quote: pin.quote, probes: pin.probes.map(probe => ({ id: probe.id, reader: probe.reader, sha256: probeHash(probe) })) })),
    g18: G18.map(([member, pin]) => ({ member, pin })),
    witnesses: WITNESSES_1,
    u4Probes: U4_PROBES,
  };
}

/** This file's header comment, each line's " * " prefix removed. */
function headerLines(): string[] {
  const source = readFileSync(fileURLToPath(import.meta.url), "utf8");
  return source
    .slice(0, source.indexOf("*/"))
    .split("\n")
    .map(line => line.replace(/^ \* ?/, "").replace(/^ \*$/, ""));
}
/** A header section's entries: each "- " line joined with its indented continuation lines, up to the section's blank line. */
function headerEntries(title: string): string[] {
  const lines = headerLines();
  const start = lines.findIndex(line => line.startsWith(title));
  if (start < 0) throw new Error(`this header has no ${title} section`);
  const end = lines.findIndex((line, index) => index > start && line === "");
  const entries: string[] = [];
  for (const line of lines.slice(start + 1, end < 0 ? undefined : end)) {
    if (line.startsWith("- ")) entries.push(line.slice(2));
    else if (line.startsWith("  ") && entries.length > 0) entries[entries.length - 1] = `${entries[entries.length - 1] ?? ""} ${line.trim()}`;
    else throw new Error(`${title} line ${JSON.stringify(line)} is neither an entry nor an entry's continuation`);
  }
  return entries;
}

/** The engine's basic multilingual plane, the plane every white-space code point sits in. */
const PLANE: readonly number[] = Array.from({ length: 0x10000 }, (_unused, point) => point);

describe("wb-v03p rf GraphPolicy-context readers census: the moved readers' literal readings on the probes of rows U1, U2, U3 and V, with the rows, pins and probes held to the tracker export, the out-of-file roster and the engine's white-space tables", () => {
  it("SHAPE: the rows, labels, pins, quotes and probe ids, each held to a literal", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["U1:3", "U2:3", "U3:3", "V:3"]);
    expect(ROWS.map(row => [row.id, row.label, ...row.pins])).toEqual([
      ["U1", "record item forms", "G-U1-CASE", "G-U1-LIST", "G-U1-LISTF"],
      ["U2", "planted-positions handoff and compare", "G-U2-HASKEYS", "G-U2-OUTPUTSOF", "G-U2-CALLSITE"],
      ["U3", "docs locates", "M-NORM-FULL", "G-U3-WS4", "G-U3-ZS"],
      ["V", "the R-B221 fold (refusal #4's twins)", "G5-U1-GPSEP", "G5-U1-TAILSEP", "G5-U1-HUMPSEP"],
    ]);
    expect(PINS.map(pin => pin.id)).toEqual(ROWS.flatMap(row => row.pins));
    expect(PINS.map(pin => `${pin.id}: ${pin.quote}`)).toEqual([
      "G-U1-CASE: vocabulary lists the roster's result keys GpRank, GPRank, rfGpRank and rfGPRank and the envelope's string values GpRank and GPRank at result.notes[0] and [1]; the roster's result keys output and gpuCount and the envelope's gpu-runner at result.notes[2] are listed nowhere",
      "G-U1-LIST: vocabulary lists the roster's work keys gp_layer and gpLayer and its work-metrics keys gp_count and countGP; the roster's work-metrics key token_count is listed nowhere",
      "G-U1-LISTF: fields lists the roster's result keys score_total, embedding_dim and ScoreTotal, its provenance keys receipt_digest and embeddings_seen, its work keys rankings_seen, embedding and RankingsSeen and its work-metrics key score_count, and vocabulary lists none of them; the roster's work-metrics key token_count is listed nowhere",
      "G-U2-HASKEYS: on the planted workspace object the reads 'score' in, 'absent' in, Reflect.ownKeys, Object.keys, .score and Object.getOwnPropertyDescriptor of 'score' each note envelope.workspace, 'score' in and Reflect.ownKeys note envelope too when the root is planted, and 'score' in notes nothing on an unplanted envelope or with the log closed",
      "G-U2-OUTPUTSOF: outputsOf puts RUNS-DISTINCT's topology and evidence run outputs and controls each in its own run's slots, and W-OUTNULL's null evidence output and null controls stay null beside its topology output",
      "G-U2-CALLSITE: per render variant of COMPARE-AS-HANDED a planted output that differs from the plain one reads false in its slot and an equal one true, and every variant of W-CALLNAN reads evidence false for a planted evidence score NaN beside a plain score null",
      "M-NORM-FULL: '## [GraphPolicyCLI](https://example.invalid/(wb-v03p)) boundary', '## *GraphPolicyCLI* boundary', '## `GraphPolicyCLI` boundary' and '## <b>GraphPolicyCLI</b> boundary' read as 'GraphPolicyCLI boundary', '## GraphPolicyCLI &amp; boundary' as 'GraphPolicyCLI & boundary', and '# Notes on snake_case names' as 'Notes on snake_case names'",
      "G-U3-WS4: each \\p{Zs} code point but U+0020 (U+00A0, U+1680, U+2000 to U+200A, U+202F, U+205F and U+3000) and the tab, in place of the space of '## GraphPolicyCLI boundary', and an em space after the comma of docs/03's title read as one space",
      "G-U3-ZS: U+000B, U+000C and U+FEFF in place of the space of '## GraphPolicyCLI boundary' read as one space, and U+200B there stays as written",
      "G5-U1-GPSEP: vocabulary lists the roster's result keys trace_GP, GP_NOTE, trace-GP and GP-note and the envelope's string values trace_GP and GP_NOTE at result.labels[0] and [1]; the roster's result key output and the envelope's GPU at result.labels[2] are listed nowhere",
      "G5-U1-TAILSEP: vocabulary lists the roster's result keys note_gp, rf_gp and note-gp and the envelope's string values note_gp and rf_gp at result.labels[0] and [1]; the roster's result key output and the envelope's rf_gpu at result.labels[2] are listed nowhere",
      "G5-U1-HUMPSEP: vocabulary lists the roster's result keys rf_gpTrace, rf_gpNote and rf-gpTrace and the envelope's string values rf_gpTrace and rf_gpNote at result.labels[0] and [1]; the roster's result key output and the envelope's rf_gpuTrace at result.labels[2] are listed nowhere",
    ]);
    expect(PINS.map(pin => [pin.id, ...pin.probes.map(probe => `${probe.reader}:${probe.id}`)])).toEqual([
      ["G-U1-CASE", "judgeRecord:CASE-ROSTER", "judgeRecord:CASE-VALUES", "judgeRecord:W-CASEMID"],
      ["G-U1-LIST", "judgeRecord:LIST-WORK", "judgeRecord:W-LISTCAMEL"],
      ["G-U1-LISTF", "judgeRecord:LISTF-LISTS", "judgeRecord:W-LISTFEMB", "judgeRecord:W-LISTFTITLE"],
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
        "logged:W-HASABSENT",
      ],
      ["G-U2-OUTPUTSOF", "outputsOf:RUNS-DISTINCT", "outputsOf:W-OUTNULL"],
      ["G-U2-CALLSITE", "Z2_CALL_SITE.compare:COMPARE-AS-HANDED", "Z2_CALL_SITE.compare:W-CALLNAN"],
      [
        "M-NORM-FULL",
        "renderedHeading:HEADING-PARENLINK",
        "renderedHeading:HEADING-SNAKE",
        "renderedHeading:W-NORM-EMPH",
        "renderedHeading:W-NORM-CODE",
        "renderedHeading:W-NORM-AMP",
        "renderedHeading:W-NORM-HTML",
      ],
      [
        "G-U3-WS4",
        "renderedHeading:HEADING-U+00A0",
        "renderedHeading:HEADING-U+1680",
        "renderedHeading:HEADING-U+2000",
        "renderedHeading:HEADING-U+2001",
        "renderedHeading:HEADING-U+2002",
        "renderedHeading:HEADING-U+2003",
        "renderedHeading:HEADING-U+2004",
        "renderedHeading:HEADING-U+2005",
        "renderedHeading:HEADING-U+2006",
        "renderedHeading:HEADING-U+2007",
        "renderedHeading:HEADING-U+2008",
        "renderedHeading:HEADING-U+2009",
        "renderedHeading:HEADING-U+200A",
        "renderedHeading:HEADING-U+202F",
        "renderedHeading:HEADING-U+205F",
        "renderedHeading:HEADING-U+3000",
        "renderedHeading:HEADING-U+0009",
        "renderedHeading:HEADING-TITLE-EM",
      ],
      ["G-U3-ZS", "renderedHeading:HEADING-U+000B", "renderedHeading:HEADING-U+000C", "renderedHeading:HEADING-U+FEFF", "renderedHeading:HEADING-U+200B"],
      ["G5-U1-GPSEP", "judgeRecord:GPSEP-ROSTER", "judgeRecord:GPSEP-VALUES", "judgeRecord:W-GPSEP-HYPHEN"],
      ["G5-U1-TAILSEP", "judgeRecord:TAILSEP-ROSTER", "judgeRecord:TAILSEP-VALUES", "judgeRecord:W-TAILSEP-HYPHEN"],
      ["G5-U1-HUMPSEP", "judgeRecord:HUMPSEP-ROSTER", "judgeRecord:HUMPSEP-VALUES", "judgeRecord:W-HUMPSEP-HYPHEN"],
    ]);
  });

  it("ANCHOR: the rows, pins and twins are the ones the tracker export records", () => {
    const rows = exportRows(["wb-v03p", "wb-b4lg"]);
    const child = rows.get("wb-v03p") ?? { description: "", notes: "" };
    const parent = rows.get("wb-b4lg") ?? { description: "", notes: "" };
    const classes = ROWS.filter(row => /^U\d+$/.test(row.id));
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

  it("REFUSAL #1: wb-v03p's refusal #1 verdict names the G18 members, witnesses, unprobed code points and U4 probes this file pins", () => {
    const child = exportRows(["wb-v03p"]).get("wb-v03p") ?? { description: "", notes: "" };
    const verdict = child.notes.indexOf(REFUSAL_1);
    expect(verdict, "wb-v03p's notes hold the refusal #1 verdict").toBeGreaterThanOrEqual(0);
    const start = child.notes.indexOf(UNMET_1, verdict);
    const end = child.notes.indexOf(AFTER_UNMET_1, start);
    expect([start > verdict, end > start], "the verdict's UNMET block and the record section after it").toEqual([true, true]);
    const unmet = child.notes.slice(start, end);
    const probeIds = PINS.flatMap(pin => pin.probes.map(probe => probe.id));
    // (a) the one-edit helper members, in order.
    const members = [...unmet.matchAll(/\(([a-g])\) (G18-[A-Z0-9-]+)[. ]/g)];
    expect(
      members.map(match => match[2]),
      "the one-edit helper members refusal #1 lists, in order",
    ).toEqual(G18.map(([member]) => member));
    // (b) the witness ids, in order, and the W- probes here.
    expect([...new Set(unmet.match(WITNESS_ID) ?? [])], "the witness ids refusal #1 names, in order").toEqual(WITNESSES_1);
    expect(
      probeIds.filter(id => id.startsWith("W-")).sort(),
      "the W- probes here are refusal #1's witnesses but W-WS-U+2001",
    ).toEqual(WITNESSES_1.filter(id => id !== "W-WS-U+2001").sort());
    // (d) the code points refusal #1 names as not probed, with their count word.
    const listed = /Six are not probed: ([^.\n]+)\./.exec(unmet)?.[1] ?? "";
    const unprobed = listed.split(/, | and /);
    expect(unprobed.length, "the count word 'Six' numbers the code points refusal #1 names").toBe(COUNT.indexOf("six"));
    const spacedWs4 = pinOf("G-U3-WS4").probes.filter(isSpaced).map(probe => label(probe.point));
    for (const point of unprobed) expect(spacedWs4, `${point}, not probed at cut #1, is a spaced probe of G-U3-WS4`).toContain(point);
    // (c) each member's line: every witness it names is a probe of the pin G18 pairs with that member.
    const unnamed: string[] = [];
    for (const [index, match] of members.entries()) {
      const at = match.index ?? 0;
      const stop = unmet.indexOf("\n", at);
      const line = unmet.slice(at, stop < 0 ? undefined : stop);
      const member = G18[index]?.[0] ?? "";
      const pin = G18[index]?.[1] ?? "";
      const named = [...new Set(line.match(WITNESS_ID) ?? [])].flatMap(id => (id === "W-WS-U+2001" ? unprobed.map(point => `HEADING-${point}`) : [id]));
      if (named.length === 0) unnamed.push(member);
      for (const id of named) expect(pinOf(pin).probes.map(probe => probe.id), `${member}'s line names ${id}, a probe of ${pin}`).toContain(id);
    }
    expect(unnamed, "the members whose line names no witness").toEqual(["G18-U3-WSPLANT"]);
    // (e) each W- record probe's roster keys, named in its witness sentence (whole words only).
    expect(
      [namesWord("embedding_dim (result)", "embedding"), namesWord("and embedding (work)", "embedding"), namesWord("trace-GP and GP-note", "GP")],
      "a key inside a longer word is not named",
    ).toEqual([false, true, false]);
    const sentenced: string[] = [];
    for (const probe of PINS.flatMap(pin => pin.probes)) {
      if (probe.reader !== "judgeRecord" || !probe.id.startsWith("W-")) continue;
      const sentence = new RegExp(`Witness ${probe.id}: ([^\\n]*?)\\.(?: |\\n|$)`).exec(unmet)?.[1] ?? "";
      for (const key of probeRosterKeys(probe)) expect(namesWord(sentence, key), `${probe.id}'s witness sentence names ${key}`).toBe(true);
      sentenced.push(probe.id);
    }
    expect(sentenced, "the W- record probes whose keys refusal #1's witness sentences name").toEqual([
      "W-CASEMID",
      "W-LISTCAMEL",
      "W-LISTFEMB",
      "W-LISTFTITLE",
      "W-GPSEP-HYPHEN",
      "W-TAILSEP-HYPHEN",
      "W-HUMPSEP-HYPHEN",
    ]);
    // (f) the probes refusal #1's U4 item names.
    const u4 = unmet.indexOf("\nU4-");
    expect(u4, "refusal #1's UNMET block holds its U4 item").toBeGreaterThan(0);
    expect(unmet.slice(u4).match(/\b(?:LOG-[A-Z]+(?:-[A-Z]+)+|HEADING-U\+[0-9A-F]{4})\b/g), "the probes refusal #1's U4 item names, in order").toEqual(U4_PROBES);
    for (const id of U4_PROBES) expect(probeIds, `${id}, named by refusal #1's U4 item, is a probe here`).toContain(id);
  });

  it("ROSTER: every row, pin, quote and probe of this file, the G18 table, WITNESSES_1 and U4_PROBES equal the out-of-file roster", () => {
    const roster: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
    if (!isRecord(roster) || typeof roster.comment !== "string") throw new Error(`${ROSTER_FILE} holds no roster`);
    expect(Object.fromEntries(Object.entries(roster).filter(([key]) => key !== "comment"))).toEqual(liveRoster());
    const nan = pinOf("G-U2-CALLSITE").probes.find(probe => probe.id === "W-CALLNAN");
    if (nan?.reader !== "Z2_CALL_SITE.compare") throw new Error("G-U2-CALLSITE holds no W-CALLNAN compare probe");
    expect(probeHash(nan), "W-CALLNAN's NaN and a null hash apart").not.toBe(probeHash({ ...nan, outputs: JSON.parse(JSON.stringify(nan.outputs)) as CompareProbe["outputs"] }));
  });

  it("WHITESPACE: the spaced heading probes of G-U3-WS4 and G-U3-ZS are the engine's own white-space tables", () => {
    const ws4 = pinOf("G-U3-WS4").probes.filter(isSpaced);
    const zs = pinOf("G-U3-ZS").probes.filter(isSpaced);
    const separators = PLANE.filter(point => point !== 0x20 && /\p{Zs}/u.test(cp(point)));
    const whitespace = PLANE.filter(point => point !== 0x20 && /\s/.test(cp(point)) && /./.test(cp(point)));
    expect(
      PLANE.filter(point => /\s/.test(cp(point)) && !/./.test(cp(point))).map(label),
      "the four white-space code points `.` refuses: the line terminators",
    ).toEqual(["U+000A", "U+000D", "U+2028", "U+2029"]);
    expect(ws4.map(probe => probe.id), "each spaced probe is named for its code point").toEqual(ws4.map(probe => `HEADING-${label(probe.point)}`));
    expect(zs.map(probe => probe.id), "each spaced probe is named for its code point").toEqual(zs.map(probe => `HEADING-${label(probe.point)}`));
    expect(ws4.map(probe => label(probe.point)), "G-U3-WS4: the engine's \\p{Zs} code points but U+0020, then the tab").toEqual([...separators.map(label), "U+0009"]);
    expect(
      [...ws4, ...zs]
        .filter(probe => probe.reading === BOUND)
        .map(probe => probe.point)
        .sort((a, b) => a - b)
        .map(label),
      "the one-space spaced probes: the engine's JavaScript white space but U+0020",
    ).toEqual(whitespace.map(label));
    expect(
      zs.filter(probe => probe.reading !== BOUND).map(probe => [label(probe.point), /\s/.test(cp(probe.point))]),
      "G-U3-ZS: the one probe that reads as written is no white space",
    ).toEqual([["U+200B", false]]);
  });

  it("HEADER: the PROBES BY PIN entries of this header equal PINS both ways", () => {
    const entries = headerEntries("PROBES BY PIN").map(entry => {
      const match = /^([A-Z0-9-]+): (.+)$/.exec(entry);
      if (match === null) throw new Error(`PROBES BY PIN entry ${JSON.stringify(entry)} is not "<pin>: <probes>"`);
      return [match[1] ?? "", ...(match[2] ?? "").split(", ")];
    });
    expect(entries).toEqual(PINS.map(pin => [pin.id, ...pin.probes.map(probe => probe.id)]));
  });

  for (const pin of PINS) {
    it(`${pin.id}: ${pin.quote}`, () => {
      for (const probe of pin.probes) expect(readingOf(probe), `${pin.id} ${probe.id}`).toEqual(probe.reading);
    });
  }
});

import { trackerExportText } from "../qa/workbench/tracker-export.mjs";
