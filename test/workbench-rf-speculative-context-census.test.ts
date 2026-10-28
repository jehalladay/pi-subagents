/**
 * wb-grmo.1 (RF-PREDICTIVE-WORLD-MODEL-CONTEXT-R1), the until-then leg. Statement (bead title): "When RFCLI ships speculative
 * rendering (RF-WM-007; rendered_speculative_view), Pi's preview arms shall refuse a speculative-marked result as 'validation'
 * (never to node(), capability_invoke or the projection), and speculative renders shall exist only behind a distinct capability
 * id under a new explicit grant, label kept verbatim; until then Pi claims nothing. Artifact: the RFCLI marker schema."
 * Until-then acceptance (bead notes): "until then a docs census asserts no docs/workbench sentence presents what-if or
 * speculative RF context as served, and the SCG-R11 roster diff gains a freeze-and-flip tripwire that fails when a captured
 * envelope names rendered_speculative_view, a scenario key or a speculative label before those cases exist." Sources
 * (ReactiveFiberCLI, read only): 01-semantics.md:9@82bd879eee52 (RF-WM-007), 02-architecture.md:3 and :9@82bd879eee52 (a distinctly
 * marked WhatIf view; ScenarioResult.rendered_speculative_view), README.md:2@82bd879eee52 (DESIGN ONLY at filing).
 *
 * MEASURED (seat ws-02, run g10-work-s110, 2026-10-26; every read read-only, none re-read by this census, the values live in the
 * roster test/fixtures/rf-speculative-context-roster.json): RFCLI first serves `rf context render --scenario PATH` at
 * 8bd35ecd4651 ("[RF-WM-R3-e] --scenario served on rf context render for cli", 2026-10-24, VERSION 0.1.844). Its
 * context.render.schema.json states nine result members "present exactly on a `rf context render --scenario PATH` render ... and
 * absent on a legacy or --view render" (speculative, notice, labels, exclusion_stages, counts_by_stage, suppressions,
 * lens_snapshots, rendered_output, effects_denied) and the block and notice metadata markers rf.scenario_id and
 * rf.epistemic_status; application/scenario_view.py names the notice block key rf.whatif_notice and the notice line that opens a
 * WhatIf document's output.text ("WHAT-IF VIEW of scenario <id>: ..."). The installed rf 0.1.845 states the same nine members
 * (RFCLI origin/main c83fbd59ec1c too). Two REAL captures in a disposable /tmp workspace at the installed rf 0.1.845 (the roster's
 * basis names the recipe): Pi's own legacy argv (--no-commit) renders a result naming none of the nine members and no marker,
 * while `context render --scenario` (audience cli) renders all nine, the two metadata markers on its one block and output.text
 * opening with the notice line; the roster's scenarioSample and scenarioBlock are that capture's nine members and block, and the
 * notice sits in result.notice only, never in result.blocks. At this cut's base dc72a6d Pi's pin (the SCG-R11 roster
 * test/fixtures/rf-result-keys.json and the contractSource carrier) is rf 0.1.784 (RFCLI 403389a94, 2026-10-21), whose schema
 * carries none of the nine members and no marker at any depth; the queued re-pin wb-jwc.4 moves it to 0.1.845, which serves
 * --scenario. The claim here holds at either pin: Pi's legacy and --view arms never request --scenario, rf states the nine
 * members absent on those renders, so no speculative render reaches Pi's projection, node() or capability_invoke today, and the
 * SCG-R11 tripwire fails any tier whose result names a marker. The armed acceptance (both readers refuse a speculative-marked
 * result as 'validation'; a speculative render behind its own capability id and grant) is the bead's other half, owed once the
 * marker ships at Pi's pin (wb-jwc.4's landing); this census claims only the until-then half and pins nothing that a re-pin moves.
 *
 * ROWS (each pin's witness is held to the roster):
 *  A, the trigger as it reaches Pi. A1 the contractSource carrier states the --no-commit render contract, names no --scenario and
 *    pins the SCG-R11 roster's own release, beside the roster's measured first --scenario release (whatever the pinned release);
 *    A2 no src module literal spells the scenario flag or a speculative marker (a walk anchored to git's listing).
 *  B, the SCG-R11 roster diff's freeze-and-flip tripwire (test/helpers/rf-render-fixture.ts diffAgainstRoster, the one diff the
 *    default fixture census and the live rf-preview row both use). B1 the helper's marker vocabulary equals the roster's measured
 *    one; B2 the clean full-shape fixture stays quiet under the captured and the constructed roster; B3 each of the nine members
 *    alone trips the diff under the captured roster, under a re-captured roster that lists it (the pin-bump path that would adopt
 *    it as a roster key) and under a constructed roster; B4 the whole --scenario result shape trips with every marker at its path;
 *    B5 the any-depth marker keys trip wherever they sit; B6 the labels trip (the exact notice key anywhere, the notice line
 *    opening output.text); B7 both tiers route through the tripwire (the live row holds its failures to [] and its tier config
 *    and forge command select it).
 *  C, the docs census. C1 no sentence of docs/workbench, raw or normalized, names a what-if or speculative term (SPECULATIVE_TERM)
 *    together with a served term (SERVED_TERM); C2 the forward guard: no sentence names a SPECULATIVE_TERM outside the roster's
 *    allowlist docsSpeculativeSentences, held to the frozen DOCS_SPECULATIVE_SENTENCES (the three sentences of docs/18's "RF
 *    speculation boundary:" paragraph, wb-km7q.9, on rf's passive speculation-policy default; C1 judges each quiet), so the first
 *    docs sentence about speculative RF context is added there and C1 judges it. C1 reads co-occurrence, not polarity: a refusal
 *    sentence names its refusal ('refuses'), never a served word.
 *  M, the matchers rows A to C read: M1-M4 the spellings each must catch and pass; Q1-Q8 the pinned quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the judged set - every row's id, label and
 * pins, every pin's witness and reached assertion count, the citations, the measured releases and the registered test titles - is
 * held to the out-of-file roster, whose measured vocabulary also anchors the helper's (B1). A pin deleted, relabelled, swapped for
 * another passing case, or removed from every literal here at once still reds against the roster. Not claimed: an edit of this
 * file and the roster together.
 * RESIDUALS (named, each with a pinned quiet row): R-EPISTEMIC the bare epistemic_status word on the envelope (RF-WM-001, outside
 * every scenario member) is wb-grmo.2's tripwire, not this one (Q1); R-PARAPHRASE a served claim worded without a
 * SPECULATIVE_TERM, a spaced "what if" included, is not read (Q2); R-SPLIT-SENTENCE a claim split across two sentences escapes C1
 * and is caught by C2 alone (Q3); R-COMPOSED-FLAG a scenario flag built from split or computed parts is invisible to A2 (Q4);
 * R-FREE-TEXT the tripwire reads keys anywhere and labels only where rf places them, so a marker word or the notice line inside
 * free text is not read (Q5); R-KEY-SPELLING-AND-PLACEMENT a respelled marker key, or one of the nine generic-named members below
 * the top level, is not read (Q6); R-SCOPE test/, .beads/, README.md, AGENTS.md, CHANGELOG.md and docs outside docs/workbench
 * (docs/rpc.md, docs/workflows.md) are outside every
 * scanned root, and this census's own roster spells every marker (Q7); R-HOMOGLYPH a SPECULATIVE_TERM spelled with a look-alike
 * letter NFKC does not fold escapes C1 and C2 (Q8).
 * SCOPE: the marker names are producer facts read off the installed rf and RFCLI; Pi vendors no rf schema, so a marker rf adds
 * later is seen only when a re-measure re-reads them into the roster. No speculative reader, refusal or capability is added or
 * faked here; the cut that adds them flips this census (the FLIP of the freeze-and-flip).
 *
 * Display paths added: none. Test-only: no scratch is allocated; src, docs and the two tier files are only read.
 */
import { execFileSync } from "node:child_process";
import { type Dirent, lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { REACTIVE_FIBER_CONTRACT_SOURCE } from "../src/workbench/providers/reactivefiber.js";
import { recordedRfRelease } from "./helpers/rf-release-drift.js";
import * as rfFixture from "./helpers/rf-render-fixture.js";

type Json = rfFixture.Json;
type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-speculative-context-roster.json");
/** The full-shape fixture's workspace root, a label only: no file is read or written there. */
const WORKSPACE = "/fixture/rf-workspace";
/** The first rf release serving `context render --scenario` (RFCLI 8bd35ecd4651, VERSION 0.1.844), held to the roster. */
const FIRST_SERVING_RELEASE = "0.1.844";
/** The carrier's contract after its `rf@<release>:` prefix: the --no-commit render Pi's arms request, at any pinned release. */
const CONTRACT = "reactive-fiber.cli/v1 context.render --no-commit";
const CITATIONS = [
  "docs/programs/predictive-world-model-context-2026-10-18/01-semantics.md:9@82bd879eee52",
  "docs/programs/predictive-world-model-context-2026-10-18/02-architecture.md:3@82bd879eee52",
  "docs/programs/predictive-world-model-context-2026-10-18/02-architecture.md:9@82bd879eee52",
  "docs/programs/predictive-world-model-context-2026-10-18/README.md:2@82bd879eee52",
  "src/reactive_fiber_cli/schemas/cli/context.render.schema.json $defs/result@8bd35ecd4651",
  "src/reactive_fiber_cli/application/scenario_view.py NOTICE_BLOCK_KEY, WhatIfNotice.text@8bd35ecd4651",
  "src/reactive_fiber_cli/domain/scenario.py SCENARIO_ID_MARKER_KEY, EPISTEMIC_STATUS_MARKER_KEY@8bd35ecd4651",
];

/** The dash look-alikes of "-": U+2010-U+2015 hyphens and dashes, U+2212 minus sign, U+FE58 small em dash, U+FE63 small
 * hyphen-minus and U+FF0D fullwidth hyphen-minus, built from their code points so none sits raw in this file. */
const DASHES = [0x2010, 0x2011, 0x2012, 0x2013, 0x2014, 0x2015, 0x2212, 0xfe58, 0xfe63, 0xff0d].map(code => String.fromCodePoint(code)).join("");
/** The separator between two words of a spelling: whitespace, "_", ".", "-" or a dash look-alike, a backslash, emphasis or code. */
const SEP = `[\\s_.\\\\*\`~${DASHES}-]*`;
/** The joint inside "what-if": the same marks without whitespace, so the ordinary English "what if" is not read (R-PARAPHRASE). */
const JOINT = `[_.\\\\*\`~${DASHES}-]*`;
/** (C) a what-if or speculative term: speculative (speculatively, speculation), what-if joined or marked (whatif, WhatIf, what_if,
 * WHAT-IF), hypothetical, counterfactual, the rf --scenario flag, or a scenario overlay, result, render, view, branch or context. */
const SPECULATIVE_TERM = new RegExp(
  [
    "\\bspeculat\\w*",
    `\\bwhat${JOINT}if\\b`,
    "\\bhypothetical\\w*",
    "\\bcounterfactual\\w*",
    "(?<![\\w-])--scenario\\b",
    `\\bscenario${SEP}(?:overlays?|results?|renders?|rendering|views?|branch(?:es)?|context)\\b`,
  ].join("|"),
  "i",
);
/** (C) a served term: a context that is served, admitted, available, supported, enabled, exposed, offered, provided or
 * delivered. Render and return are left out: a refusal sentence names what is rendered or returned. */
const SERVED_TERM = /\b(?:serv(?:e|es|ed|ing)|admit(?:s|ted|ting)?|available|supported|enabled|expos(?:e|es|ed|ing)|offer(?:s|ed|ing)?|provid(?:e|es|ed|ing)|deliver(?:s|ed|ing)?)\b/i;
/** Sentence units: a sentence end before whitespace, a blank line, or a line opening a list item, heading, table row or quote. */
const SENTENCE_BREAK = /(?<=[.!?])\s+|\n\s*\n|\n(?=\s*(?:[-*+]\s|\d+[.)]\s|#|\||>))/;
/** The named character references the normalized view decodes beside every numeric one. */
const NAMED_REFERENCES: Readonly<Record<string, string>> = {
  lowbar: "_", UnderBar: "_", hyphen: "-", dash: "-", period: ".", colon: ":", nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
};
/** A2's needles: the scenario flag and the distinctive marker spellings, read inside any literal; the generic key words read only
 * as a whole literal (a src string is free to say "scenario" in a longer sentence). */
const SRC_CONTAINED = ["--scenario", "rendered_speculative_view", "rf.scenario_id", "rf.epistemic_status", "rf.whatif_notice", "WHAT-IF VIEW"];
const SRC_EXACT = ["speculative", "scenario_id", "scenario"];
/** The src walk A2 reads: 116 .ts modules at base dc72a6d (floor 100); its anchor is the carrier's contract literal. */
const SRC_ROOT = { root: "src", floor: 100, anchorFile: "src/workbench/providers/reactivefiber.ts", anchorToken: "context.render --no-commit" };
/** The docs walk C reads: 72 markdown pages and 5919 raw sentence units at base dc72a6d (floors 60 and 4000). Its anchor is the
 * frozen TRACEABILITY page (rule 13), whose "served-model journey" sentence keeps C1's served half live on today's docs. */
const DOCS_ROOT = { root: "docs/workbench", floor: 60, sentenceFloor: 4000, anchorFile: "docs/workbench/TRACEABILITY.md", anchorToken: "served-model journey" };
/** C2's allowlist, frozen (wb-km7q.9): the three sentences of docs/18's "RF speculation boundary:" paragraph that name rf's
 * speculation policy - its passive default, the RF_ADAPTIVE seat no Pi-launched rf receives, and the tighten-only rule for a
 * future Pi declaration. None names a SERVED_TERM, so C1 judges each quiet; none is about speculative RF context. */
const DOCS_SPECULATIVE_SENTENCES: readonly string[] = [
  "**RF speculation boundary:** rf's local default speculation policy stays passive/disabled and Pi documents no other default.",
  "rf 0.1.845 ships `ResourceBrokerLimits` and `SpeculationBoundary` as values its host resource broker reads, with no CLI surface, and the one way an rf process opts into its speculative policy is the process-scoped `RF_ADAPTIVE` seat, which no rf child Pi launches receives: that child's environment holds only the `RF_CHILD_ENV_ALLOWLIST` names of `src/workbench/process-env.ts`.",
  "Any Pi-declared SpeculationBoundary or broker-limit configuration may only tighten ResourceBrokerLimits and never overrides Pi host hard caps, the 60 s render deadline and the 256 KiB stdout and stderr bounds of `src/workbench/providers/reactivefiber.ts`.",
];
/** The two tiers that hold a result to the SCG-R11 roster through diffAgainstRoster. */
const LIVE_TIER = { file: "test/workbench-native-rf-preview.test.ts", config: "vitest.rf.config.ts", command: "rf-preview" };
const FIXTURE_TIER = "test/workbench-rf-result-fixture.test.ts";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(trigger, as it reaches Pi) Pi's preview arms never request a speculative render: the contractSource carrier states the context.render --no-commit contract, names no --scenario and pins the SCG-R11 roster's release, beside RFCLI's measured first --scenario release, and no src module literal spells the scenario flag or a speculative marker",
    pins: ["A1", "A2"],
  },
  {
    id: "B",
    label: "the SCG-R11 roster diff's freeze-and-flip tripwire: a result naming rendered_speculative_view, a scenario key or a speculative label fails diffAgainstRoster under the captured, a re-captured and the constructed roster alike, the clean fixture staying quiet and both tiers routing through it",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6", "B7"],
  },
  {
    id: "C",
    label: "docs census: no docs/workbench sentence presents what-if or speculative RF context as served",
    pins: ["C1", "C2"],
  },
  {
    id: "M",
    label: "the matchers rows A to C read: M1-M4 the spellings each must catch and pass, Q1-Q8 the pinned quiet rows of the named residuals",
    pins: ["M1", "M2", "M3", "M4", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
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
interface Measured {
  /** Pi's pin at this cut's base (provenance only; nothing asserts it, so a re-pin moves nothing here). */
  readonly pinAtCutRelease: string;
  readonly pinAtCutCommit: string;
  readonly firstServingRelease: string;
  readonly firstServingCommit: string;
  readonly installedRelease: string;
  readonly installedSchemaSha256: string;
}
interface Roster {
  readonly bead: string;
  readonly basis: string;
  readonly measured: Measured;
  readonly citations: readonly string[];
  readonly scenarioResultKeys: readonly string[];
  readonly markerKeys: readonly string[];
  readonly labelValues: readonly string[];
  readonly labelTextPrefix: string;
  readonly scenarioSample: JsonObject;
  /** The captured --scenario render's one block, its two metadata markers included. */
  readonly scenarioBlock: JsonObject;
  readonly docsSpeculativeSentences: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  /** Every pin's `${pin}:${assertionCalls}` at the end of its case, in row order. */
  readonly reached: readonly string[];
}
const ROSTER_FIELDS = [
  "bead", "basis", "measured", "citations", "scenarioResultKeys", "markerKeys", "labelValues", "labelTextPrefix", "scenarioSample",
  "scenarioBlock", "docsSpeculativeSentences", "rows", "tests", "reached",
];
const MEASURED_FIELDS = ["pinAtCutRelease", "pinAtCutCommit", "firstServingRelease", "firstServingCommit", "installedRelease", "installedSchemaSha256"];

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`roster ${field} must be a non-empty string`);
  return value;
}
function json(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}
function objectAt(value: Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
/** A list of strings, or nothing: how a vocabulary the helper does not export reads. */
function listOrNothing(value: unknown): string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string") ? [...value] : [];
}

/** Parses the roster file afresh, refusing a missing or extra field and any field of the wrong shape by name. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw)) throw new Error("roster must be an object");
  const extra = Object.keys(raw).filter(key => !ROSTER_FIELDS.includes(key));
  const missing = ROSTER_FIELDS.filter(key => !Object.hasOwn(raw, key));
  if (extra.length > 0 || missing.length > 0) throw new Error(`roster fields: missing ${missing.join(", ") || "none"}; extra ${extra.join(", ") || "none"}`);
  const measured = raw.measured;
  if (!isObject(measured) || Object.keys(measured).length !== MEASURED_FIELDS.length || !MEASURED_FIELDS.every(key => typeof measured[key] === "string")) {
    throw new Error(`roster measured must hold exactly the string fields ${MEASURED_FIELDS.join(", ")}`);
  }
  if (!Array.isArray(raw.rows)) throw new Error("roster rows must be a list");
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
  if (!isObject(raw.scenarioSample) || !isObject(raw.scenarioBlock)) throw new Error("roster scenarioSample and scenarioBlock must be objects");
  return {
    bead: text(raw.bead, "bead"),
    basis: text(raw.basis, "basis"),
    measured: {
      pinAtCutRelease: text(measured.pinAtCutRelease, "measured.pinAtCutRelease"), pinAtCutCommit: text(measured.pinAtCutCommit, "measured.pinAtCutCommit"),
      firstServingRelease: text(measured.firstServingRelease, "measured.firstServingRelease"), firstServingCommit: text(measured.firstServingCommit, "measured.firstServingCommit"),
      installedRelease: text(measured.installedRelease, "measured.installedRelease"), installedSchemaSha256: text(measured.installedSchemaSha256, "measured.installedSchemaSha256"),
    },
    citations: strings(raw.citations, "citations"),
    scenarioResultKeys: strings(raw.scenarioResultKeys, "scenarioResultKeys"),
    markerKeys: strings(raw.markerKeys, "markerKeys"),
    labelValues: strings(raw.labelValues, "labelValues"),
    labelTextPrefix: text(raw.labelTextPrefix, "labelTextPrefix"),
    scenarioSample: objectAt(json(raw.scenarioSample), "roster scenarioSample"),
    scenarioBlock: objectAt(json(raw.scenarioBlock), "roster scenarioBlock"),
    docsSpeculativeSentences: strings(raw.docsSpeculativeSentences, "docsSpeculativeSentences"),
    rows,
    tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The clean full-shape --no-commit result (test/helpers/rf-render-fixture.ts fullShapeRf), a fresh copy per call. */
function cleanResult(): JsonObject {
  return objectAt(json(objectAt(rfFixture.fullShapeRf(WORKSPACE), "fullShapeRf").result), "fullShapeRf result");
}
/** One of the nine members as the roster's measured sample states it, a fresh copy. */
function sampleMember(key: string): Json {
  const value = ROSTER.scenarioSample[key];
  if (value === undefined) throw new Error(`the roster's scenarioSample holds no ${key}`);
  return json(value);
}
/** The scenario id the sample's speculative member names. */
function sampleScenarioId(): string {
  const id = objectAt(sampleMember("speculative"), "scenarioSample.speculative").scenario_id;
  if (typeof id !== "string") throw new Error("the sample's speculative member names no scenario_id");
  return id;
}
/** The fixture block as rf stamps it under a scenario: the two host markers in its metadata. */
function labeledBlock(status: string): JsonObject {
  return { ...rfFixture.rfFixtureBlock(), metadata: { "rf.scenario_id": sampleScenarioId(), "rf.epistemic_status": status } };
}
/** The notice line of the sample's notice block. */
function noticeLine(): string {
  const content = objectAt(sampleMember("notice"), "scenarioSample.notice").content;
  if (typeof content !== "string") throw new Error("the sample's notice block carries no content line");
  return content;
}
/** The whole --scenario result shape as the capture places it: the clean result with the nine captured members, the captured
 * block (its two metadata markers) as result.blocks and output.text opening with the notice line; the notice block itself sits in
 * result.notice only. */
function scenarioResult(): JsonObject {
  const clean = cleanResult();
  const output = objectAt(clean.output, "result.output");
  const members: JsonObject = Object.fromEntries(ROSTER.scenarioResultKeys.map(key => [key, sampleMember(key)]));
  return { ...clean, output: { ...output, text: `${noticeLine()}\n${String(output.text)}` }, blocks: [json(ROSTER.scenarioBlock)], ...members };
}
function failuresOf(roster: rfFixture.RfResultRoster, result: JsonObject): string[] {
  return [...rfFixture.diffAgainstRoster(roster, result).failures];
}

/** The decoded value of a numeric character reference, or nothing for a code point no string can hold. */
function codePoint(code: number): string {
  return Number.isInteger(code) && code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
}
/** The normalized view: HTML comments and tags removed, character references decoded, backslash escapes resolved, format
 * characters (zero-width, bidi) removed and NFKC applied, so markup or an invisible code point inside a word cannot split it. */
function normalized(body: string): string {
  return body
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?[A-Za-z][^>]*>/g, "")
    .replace(/&#(\d+);/g, (_match, code: string) => codePoint(Number(code)))
    .replace(/&#[xX]([0-9A-Fa-f]+);/g, (_match, code: string) => codePoint(Number.parseInt(code, 16)))
    .replace(/&([A-Za-z]+);/g, (match, name: string) => NAMED_REFERENCES[name] ?? match)
    .replace(/\\([!-/:-@[-`{-~])/g, "$1")
    .replace(/\p{Cf}/gu, "")
    .normalize("NFKC");
}
/** The sentence units of a text in both views, each with the view it was read in. */
function sentencesOf(body: string): { view: string; sentence: string }[] {
  const split = (view: string, source: string): { view: string; sentence: string }[] =>
    source.split(SENTENCE_BREAK).map(sentence => sentence.replace(/\s+/g, " ").trim()).filter(sentence => sentence.length > 0).map(sentence => ({ view, sentence }));
  return [...split("raw", body), ...split("normalized", normalized(body))];
}
/** C1's judge: a sentence names a what-if or speculative term and a served term together. */
const presentsServed = (sentence: string): boolean => SPECULATIVE_TERM.test(sentence) && SERVED_TERM.test(sentence);
/** The two docs verdicts of a text: C1 (a served speculative sentence) and C2 (any speculative sentence). */
function docsVerdict(body: string): { c1: boolean; c2: boolean } {
  const units = sentencesOf(body);
  return { c1: units.some(entry => presentsServed(entry.sentence)), c2: units.some(entry => SPECULATIVE_TERM.test(entry.sentence)) };
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
  return files.sort();
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** Every regular file git sees below a root - tracked or untracked, ignored ones included, as a filesystem walk sees them - as
 * sorted repository-relative paths ending in `extension`: the walk anchor outside this census. */
function gitListed(root: string, extension: string): string[] {
  const listing = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--", root], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const isFile = (path: string): boolean => {
    try {
      return lstatSync(join(REPO, path)).isFile();
    } catch {
      return false;
    }
  };
  return [...new Set(listing.split("\0"))].filter(path => path !== "" && path.endsWith(extension) && isFile(path)).sort();
}
/** A walk's reading, sorted, holds exactly git's listing. */
function sameList(read: readonly string[], listed: readonly string[]): boolean {
  const sorted = [...read].sort();
  return sorted.length === listed.length && sorted.every((path, index) => path === listed[index]);
}

/** One module's string literals (cooked) and every template's literal parts joined by "<expr>", read through the TypeScript
 * parser so an escape is read as the value it cooks to. */
function literalsOf(fileName: string, source: string): string[] {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const literals: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) literals.push(node.text);
    if (ts.isTemplateExpression(node)) literals.push([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join("<expr>"));
    ts.forEachChild(node, visit);
  };
  visit(file);
  return literals;
}
/** A2's reading of one literal: the needles it spells. */
function srcNeedles(literal: string): string[] {
  return [...SRC_CONTAINED.filter(needle => literal.includes(needle)), ...SRC_EXACT.filter(needle => literal === needle)];
}
/** Calls of a named function in one module (an identifier callee). */
function callsOf(fileName: string, source: string, name: string): number {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let calls = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === name) calls += 1;
    ts.forEachChild(node, visit);
  };
  visit(file);
  return calls;
}

/** Every sentence of docs/workbench in both views, with its file, after the floors and the anchor are read. */
function docsSentences(): { floorMet: boolean; sentenceFloorMet: boolean; anchorRead: boolean; servedSentences: boolean; read: string[]; sentences: { file: string; view: string; sentence: string }[] } {
  const files = filesBelow(join(REPO, DOCS_ROOT.root)).filter(file => file.endsWith(".md"));
  const read: string[] = [];
  const sentences = files.flatMap(file => {
    const name = relative(REPO, file);
    read.push(name);
    return sentencesOf(textOf(file)).map(entry => ({ file: name, ...entry }));
  });
  const anchor = join(REPO, DOCS_ROOT.anchorFile);
  const raw = sentences.filter(entry => entry.view === "raw");
  return {
    floorMet: files.length >= DOCS_ROOT.floor,
    sentenceFloorMet: raw.length >= DOCS_ROOT.sentenceFloor,
    anchorRead: files.includes(anchor) && textOf(anchor).includes(DOCS_ROOT.anchorToken),
    servedSentences: sentences.some(entry => entry.file === DOCS_ROOT.anchorFile && SERVED_TERM.test(entry.sentence)),
    read,
    sentences,
  };
}

/** A matcher's verdict on each control, asserted against the expected verdict; the list is the witness. */
function verdicts(judge: (body: string) => boolean, cases: readonly { readonly text: string; readonly hit: boolean }[]): Json {
  const read = cases.map(entry => ({ text: entry.text, hit: judge(entry.text) }));
  expect(read).toStrictEqual(cases.map(entry => ({ text: entry.text, hit: entry.hit })));
  return read;
}
/** The diff failures of each named result under the captured roster; the record is the witness. */
function diffRecord(cases: Readonly<Record<string, JsonObject>>): JsonObject {
  const roster = rfFixture.readRfResultRoster();
  return Object.fromEntries(Object.entries(cases).map(([name, result]) => [name, failuresOf(roster, result)]));
}

/** Each pin's case: it asserts what it pins and returns its witness, which the runner holds to the roster. */
const IMPL: Record<string, () => Json | Promise<Json>> = {
  A1: () => {
    const release = recordedRfRelease();
    const contract = REACTIVE_FIBER_CONTRACT_SOURCE.slice(`rf@${release}:`.length);
    const namesScenario = REACTIVE_FIBER_CONTRACT_SOURCE.includes("--scenario");
    const sameRelease = release === rfFixture.readRfResultRoster().rfVersion;
    const firstServingDotted = /^\d+\.\d+\.\d+$/.test(ROSTER.measured.firstServingRelease);
    expect({ contract, namesScenario, sameRelease, firstServingDotted }, "the carrier states the --no-commit render contract, names no --scenario and pins the SCG-R11 roster's release").toStrictEqual({
      contract: CONTRACT, namesScenario: false, sameRelease: true, firstServingDotted: true,
    });
    return { contract, namesScenario, sameRelease, firstServing: ROSTER.measured.firstServingRelease };
  },
  A2: () => {
    const files = filesBelow(join(REPO, SRC_ROOT.root)).filter(file => file.endsWith(".ts"));
    const read = files.map(file => relative(REPO, file));
    const listed = gitListed(SRC_ROOT.root, ".ts");
    const hits = files.flatMap(file => {
      const name = relative(REPO, file);
      return literalsOf(name, textOf(file)).flatMap(literal => srcNeedles(literal).map(needle => `${name}: ${needle}`));
    });
    const anchor = join(REPO, SRC_ROOT.anchorFile);
    const anchorRead = files.includes(anchor) && literalsOf(SRC_ROOT.anchorFile, textOf(anchor)).some(literal => literal.includes(SRC_ROOT.anchorToken));
    const floorMet = files.length >= SRC_ROOT.floor;
    expect(floorMet && anchorRead, `src walk: ${files.length} modules, anchor read ${anchorRead}`).toBe(true);
    expect([...read].sort(), "the A2 walk read exactly git's own listing of src/**/*.ts").toStrictEqual(listed);
    expect(hits).toEqual([]);
    return { floorMet, anchorRead, walkAgreesWithGit: sameList(read, listed), hits };
  },
  B1: () => {
    const vocabulary = {
      resultKeys: listOrNothing(Reflect.get(rfFixture, "SPECULATIVE_RESULT_KEYS")),
      markerKeys: listOrNothing(Reflect.get(rfFixture, "SPECULATIVE_MARKER_KEYS")),
      labelValues: listOrNothing(Reflect.get(rfFixture, "SPECULATIVE_LABEL_VALUES")),
      textPrefix: String(Reflect.get(rfFixture, "SPECULATIVE_TEXT_PREFIX")),
    };
    expect(vocabulary, "the helper's tripwire vocabulary is the roster's measured one").toStrictEqual({
      resultKeys: [...ROSTER.scenarioResultKeys], markerKeys: [...ROSTER.markerKeys], labelValues: [...ROSTER.labelValues], textPrefix: ROSTER.labelTextPrefix,
    });
    expect(Object.keys(ROSTER.scenarioSample), "the measured sample holds exactly the nine members, in the schema's order").toStrictEqual([...ROSTER.scenarioResultKeys]);
    expect(noticeLine().startsWith(ROSTER.labelTextPrefix), "the sample's notice line opens with the measured prefix").toBe(true);
    expect(Object.keys(objectAt(ROSTER.scenarioBlock.metadata, "scenarioBlock.metadata")), "the captured block carries the two host markers").toStrictEqual(["rf.scenario_id", "rf.epistemic_status"]);
    return vocabulary;
  },
  B2: () => {
    const roster = rfFixture.readRfResultRoster();
    const constructed: rfFixture.RfResultRoster = { ...roster, source: "constructed" };
    const verdict = { captured: rfFixture.diffAgainstRoster(roster, cleanResult()), constructed: rfFixture.diffAgainstRoster(constructed, cleanResult()) };
    expect(verdict, "the clean full-shape fixture names no marker").toStrictEqual({ captured: { failures: [], extraResultKeys: [] }, constructed: { failures: [], extraResultKeys: [] } });
    return json(verdict);
  },
  B3: () => {
    const roster = rfFixture.readRfResultRoster();
    const rows = ROSTER.scenarioResultKeys.map(key => {
      const result = { ...cleanResult(), [key]: sampleMember(key) };
      const recaptured: rfFixture.RfResultRoster = { ...roster, resultKeys: [...roster.resultKeys, key] };
      const constructed: rfFixture.RfResultRoster = { ...roster, source: "constructed" };
      return { key, captured: failuresOf(roster, result), recaptured: failuresOf(recaptured, result), constructed: failuresOf(constructed, result) };
    });
    expect(rows.every(row => row.recaptured.length > 0 && row.constructed.length > 0), "a member trips the diff although a re-captured roster lists it or the roster is constructed").toBe(true);
    return rows;
  },
  B4: () => {
    const diff = rfFixture.diffAgainstRoster(rfFixture.readRfResultRoster(), scenarioResult());
    const speculative = diff.failures.filter(entry => entry.startsWith("speculative "));
    expect(speculative.length, "every marker of the --scenario shape is reported at its path").toBeGreaterThan(ROSTER.scenarioResultKeys.length);
    return { failures: [...diff.failures], extraResultKeys: [...diff.extraResultKeys] };
  },
  B5: () => {
    const clean = cleanResult();
    const record = diffRecord({
      designName: { ...clean, output: { ...objectAt(clean.output, "result.output"), rendered_speculative_view: "view" } },
      deep: { ...clean, plan: { operations: [{ step: { rendered_speculative_view: null } }], would_commit: false } },
      blockMarkers: { ...clean, blocks: [labeledBlock("observation")] },
      scenarioKeys: { ...clean, provenance: { ...objectAt(clean.provenance, "result.provenance"), scenario_id: sampleScenarioId() }, components: [{ scenario: {} }] },
    });
    expect(Object.values(record).every(failures => Array.isArray(failures) && failures.length > 0), "every any-depth marker key trips the diff").toBe(true);
    return record;
  },
  B6: () => {
    const clean = cleanResult();
    const record = diffRecord({
      noticeKey: { ...clean, blocks: [{ ...rfFixture.rfFixtureBlock(), key: ROSTER.labelValues[0] ?? "" }] },
      labelElsewhere: { ...clean, effects: [ROSTER.labelValues[0] ?? ""] },
      noticeLine: { ...clean, output: { ...objectAt(clean.output, "result.output"), text: noticeLine() } },
    });
    expect(Object.values(record).every(failures => Array.isArray(failures) && failures.length > 0), "every label trips the diff").toBe(true);
    return record;
  },
  B7: () => {
    const live = textOf(join(REPO, LIVE_TIER.file));
    const fixture = textOf(join(REPO, FIXTURE_TIER));
    const config = textOf(join(REPO, LIVE_TIER.config));
    const forge = textOf(join(REPO, "forge.toml"));
    const verdict = {
      live: {
        file: LIVE_TIER.file,
        calls: callsOf(LIVE_TIER.file, live, "diffAgainstRoster") >= 1,
        holdsFailuresEmpty: live.includes("expect(diff.failures).toStrictEqual([])"),
        tierSelects: literalsOf(LIVE_TIER.config, config).includes(LIVE_TIER.file) && forge.includes(`[build.commands.${LIVE_TIER.command}]\ncommand = "./node_modules/.bin/vitest run --config ${LIVE_TIER.config}"`),
      },
      fixture: { file: FIXTURE_TIER, calls: callsOf(FIXTURE_TIER, fixture, "diffAgainstRoster") >= 1 },
    };
    expect(verdict.live.calls && verdict.live.holdsFailuresEmpty && verdict.live.tierSelects && verdict.fixture.calls, "both tiers hold a result to the roster through diffAgainstRoster").toBe(true);
    return verdict;
  },
  C1: () => {
    const docs = docsSentences();
    const listed = gitListed(DOCS_ROOT.root, ".md");
    const hits = docs.sentences.filter(entry => presentsServed(entry.sentence)).map(entry => `${entry.file} (${entry.view}): ${entry.sentence.slice(0, 160)}`);
    expect(docs.floorMet && docs.sentenceFloorMet && docs.anchorRead && docs.servedSentences).toBe(true);
    expect([...docs.read].sort(), "the C walk read exactly git's own listing of docs/workbench/**/*.md").toStrictEqual(listed);
    expect(hits).toEqual([]);
    return {
      floorMet: docs.floorMet, sentenceFloorMet: docs.sentenceFloorMet, anchorRead: docs.anchorRead, servedSentences: docs.servedSentences, walkAgreesWithGit: sameList(docs.read, listed), hits,
    };
  },
  C2: () => {
    const docs = docsSentences();
    const listed = gitListed(DOCS_ROOT.root, ".md");
    const allowed = new Set(ROSTER.docsSpeculativeSentences);
    const named = docs.sentences.filter(entry => SPECULATIVE_TERM.test(entry.sentence));
    const hits = [...new Set(named.filter(entry => !allowed.has(entry.sentence)).map(entry => `${entry.file}: ${entry.sentence.slice(0, 160)}`))];
    expect(docs.floorMet && docs.sentenceFloorMet && docs.anchorRead).toBe(true);
    expect([...docs.read].sort(), "the C walk read exactly git's own listing of docs/workbench/**/*.md").toStrictEqual(listed);
    expect(ROSTER.docsSpeculativeSentences).toEqual(DOCS_SPECULATIVE_SENTENCES);
    expect(hits).toEqual([]);
    return { floorMet: docs.floorMet, walkAgreesWithGit: sameList(docs.read, listed), allowed: [...allowed], hits };
  },
  M1: () =>
    verdicts(body => docsVerdict(body).c2, [
      { text: "Pi serves speculative RF context.", hit: true },
      { text: "The what-if view is labeled.", hit: true },
      { text: "A WhatIf view opens the document.", hit: true },
      { text: "The WHAT-IF VIEW of scenario s opens the text.", hit: true },
      { text: "A what_if render.", hit: true },
      { text: "A hypothetical branch is read-only.", hit: true },
      { text: "A counterfactual render.", hit: true },
      { text: "rf context render --scenario plan.json", hit: true },
      { text: "The scenario overlay stays read-only.", hit: true },
      { text: "Speculatively rendered blocks.", hit: true },
      { text: "The uncertain-park scenario is not read.", hit: false },
      { text: "GraphPolicyCLI predictions and policy distributions.", hit: false },
      { text: "Component rendering, overlays, themes.", hit: false },
      { text: "What is served today?", hit: false },
      { text: "Whatever the reader admits.", hit: false },
      { text: "The scenarios list.", hit: false },
    ]),
  M2: () =>
    verdicts(body => SERVED_TERM.test(body), [
      { text: "Pi serves it.", hit: true },
      { text: "It is served.", hit: true },
      { text: "Serving it.", hit: true },
      { text: "The reader admits it.", hit: true },
      { text: "It was admitted.", hit: true },
      { text: "It is available.", hit: true },
      { text: "It is supported.", hit: true },
      { text: "It is enabled.", hit: true },
      { text: "It exposes it.", hit: true },
      { text: "It offers it.", hit: true },
      { text: "It provides it.", hit: true },
      { text: "It delivers it.", hit: true },
      { text: "It is reserved.", hit: false },
      { text: "It was observed.", hit: false },
      { text: "It is unavailable.", hit: false },
      { text: "It is preserved.", hit: false },
      { text: "rf renders it.", hit: false },
      { text: "It returns validation.", hit: false },
    ]),
  M3: () => {
    const clean = cleanResult();
    const record = diffRecord({
      topLevelMember: { ...clean, speculative: {} },
      nullMember: { ...clean, notice: null },
      topLevelMarkerKey: { ...clean, "rf.scenario_id": "id" },
      deepMarkerKey: { ...clean, components: [{ a: [{ b: { "rf.epistemic_status": "observation" } }] }] },
    });
    expect(Object.values(record).every(failures => Array.isArray(failures) && failures.some(entry => typeof entry === "string" && entry.startsWith("speculative "))), "each key placement trips").toBe(true);
    return record;
  },
  M4: () => {
    const clean = cleanResult();
    const output = objectAt(clean.output, "result.output");
    const record = diffRecord({
      exactValueDeep: { ...clean, components: [{ note: ROSTER.labelValues[0] ?? "" }] },
      noticeLineOpens: { ...clean, output: { ...output, text: `${ROSTER.labelTextPrefix}id: predictor versions none` } },
      nearValue: { ...clean, components: [{ note: `${ROSTER.labelValues[0] ?? ""}2` }] },
      nearPrefix: { ...clean, output: { ...output, text: "WHAT-IF VIEWER" } },
    });
    expect({ nearValue: record.nearValue, nearPrefix: record.nearPrefix }, "a label is read exactly: a near value or a near prefix trips nothing").toStrictEqual({ nearValue: [], nearPrefix: [] });
    return record;
  },
  Q1: () => {
    const clean = cleanResult();
    const record = diffRecord({
      topLevel: { ...clean, epistemic_status: "hypothesis" },
      nested: { ...clean, blocks: [{ ...rfFixture.rfFixtureBlock(), epistemic_status: "predicted_distribution" }] },
      wordValue: { ...clean, components: [{ status: "predicted_distribution" }] },
    });
    expect(record, "R-EPISTEMIC: the bare epistemic_status word trips nothing here (wb-grmo.2's tripwire); a tripwire that now reads it re-reads this residual").toStrictEqual({
      topLevel: ["unexpected result.epistemic_status"], nested: [], wordValue: [],
    });
    return record;
  },
  Q2: () => {
    const verdict = { reworded: docsVerdict("Pi serves rf's predicted context to the agent."), spaced: docsVerdict("Pi serves the what if context rf renders.") };
    expect(verdict, "R-PARAPHRASE: a served claim without a speculative term, a spaced what if included, is not read").toStrictEqual({
      reworded: { c1: false, c2: false }, spaced: { c1: false, c2: false },
    });
    return verdict;
  },
  Q3: () => {
    const split = "Pi serves rf context. That context can be speculative.";
    const verdict = { sentences: sentencesOf(split).filter(entry => entry.view === "raw").length, ...docsVerdict(split) };
    expect(verdict, "R-SPLIT-SENTENCE: C1 misses a claim split in two, C2 catches its speculative half").toStrictEqual({ sentences: 2, c1: false, c2: true });
    return verdict;
  },
  Q4: () => {
    const read = (source: string): number => literalsOf("control.ts", source).flatMap(srcNeedles).length;
    const verdict = {
      literal: read('spawn("rf", ["context", "render", "--scenario", path]);'),
      exactWord: read('spawn("rf", ["context", "render", "--" + "scenario", path]);'),
      split: read('spawn("rf", ["context", "render", "--sce" + "nario", path]);'),
      template: read(["const flag = `--$", "{name}`;"].join("")),
    };
    expect(verdict, "R-COMPOSED-FLAG: a flag split below a needle, or computed, is invisible to A2").toStrictEqual({ literal: 1, exactWord: 1, split: 0, template: 0 });
    return verdict;
  },
  Q5: () => {
    const clean = cleanResult();
    const output = objectAt(clean.output, "result.output");
    const record = diffRecord({
      wordInText: { ...clean, output: { ...output, text: `context about a speculative plan and ${ROSTER.labelValues[0] ?? ""}` } },
      noticeNotOpening: { ...clean, output: { ...output, text: `context\n${noticeLine()}` } },
      blockContent: { ...clean, blocks: [{ ...rfFixture.rfFixtureBlock(), content: noticeLine() }] },
    });
    expect(record, "R-FREE-TEXT: a marker word or the notice line inside free text is not read").toStrictEqual({ wordInText: [], noticeNotOpening: [], blockContent: [] });
    return record;
  },
  Q6: () => {
    const clean = cleanResult();
    const record = diffRecord({
      respelledTop: { ...clean, Speculative: {} },
      respelledMarker: { ...clean, blocks: [{ ...rfFixture.rfFixtureBlock(), metadata: { rf_scenario_id: "id", "rf.Scenario_Id": "id" } }] },
      nestedMember: {
        ...clean,
        engine_metrics: { ...objectAt(clean.engine_metrics, "result.engine_metrics"), speculative: 0 },
        output: { ...objectAt(clean.output, "result.output"), notice: "n" },
        components: [{ labels: {} }],
      },
    });
    expect(record, "R-KEY-SPELLING-AND-PLACEMENT: a respelled key, or a generic-named member below the top level, is not read").toStrictEqual({
      respelledTop: ["unexpected result.Speculative"], respelledMarker: [], nestedMember: [],
    });
    return record;
  },
  Q7: () => {
    const roster = textOf(ROSTER_PATH);
    const rosterSpells = [...ROSTER.scenarioResultKeys, ...ROSTER.markerKeys, ...ROSTER.labelValues, ROSTER.labelTextPrefix].every(word => roster.includes(word));
    const scanned = [SRC_ROOT.root, DOCS_ROOT.root];
    const outside = ["test", ".beads", "README.md", "AGENTS.md", "CHANGELOG.md", "docs/rpc.md", "docs/workflows.md"].every(path => !scanned.some(root => path === root || path.startsWith(`${root}/`)));
    expect({ rosterSpells, outside }, "R-SCOPE: the roster spells every marker and no scanned root reads it").toStrictEqual({ rosterSpells: true, outside: true });
    return { rosterSpells, scanned, outside };
  },
  Q8: () => {
    const cyrillicIe = String.fromCodePoint(0x0435);
    const fullwidthS = String.fromCodePoint(0xff53);
    const verdict = {
      lookAlike: docsVerdict(`Pi serves sp${cyrillicIe}culative RF context.`),
      fullwidth: docsVerdict(`Pi serves ${fullwidthS}peculative RF context.`),
    };
    expect(verdict, "R-HOMOGLYPH: a look-alike letter NFKC does not fold escapes; a compatibility form it folds is caught").toStrictEqual({
      lookAlike: { c1: false, c2: false }, fullwidth: { c1: true, c2: true },
    });
    return verdict;
  },
};

/** Each pin's witness as its case returned it; the registration case compares the whole set against the roster a second time. */
const MEASURED: Record<string, Json> = {};
/** Each pin's assertion count when its case reached its end (its witness comparison included), in run order. */
const REACHED: string[] = [];

describe("wb-grmo.1 rf speculative context census (RF-PREDICTIVE-WORLD-MODEL-CONTEXT-R1, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:7", "C:2", "M:12"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: "wb-grmo.1", citations: CITATIONS, firstServing: FIRST_SERVING_RELEASE }).toStrictEqual({
      bead: ROSTER.bead, citations: [...ROSTER.citations], firstServing: ROSTER.measured.firstServingRelease,
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          MEASURED[pin] = witness;
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it("registration: every test of this file is registered once, in roster order, in run mode, not inverted, and ran; every pin reached its end with its pinned assertion count", ({ task }) => {
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
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    const rosterWitnesses = Object.fromEntries(ROSTER.rows.flatMap(entry => entry.pins.map(pin => [pin.id, pin.witness])));
    expect(MEASURED, "every pin's witness, compared against the roster a second time").toStrictEqual(rosterWitnesses);
    expect(REACHED, "every pin reached its end, in row order, with its pinned assertion count").toEqual([...ROSTER.reached]);
  });
});
