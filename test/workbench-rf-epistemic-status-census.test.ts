/**
 * wb-grmo.2 (RF-PREDICTIVE-WORLD-MODEL-CONTEXT-R2, program-triage-2026-10-18, child of epic wb-grmo), the until-then leg: a
 * freeze-and-flip census over the SCG-R11 fixture roster, and the docs/09 sentence it binds.
 *
 * Statement (the bead title, read from the tracked bead export .beads/issues.jsonl): "When RFCLI exposes epistemic_status
 * (RF-WM-001) or an uncertified scenario status on the envelope, the RF adapter shall carry the word verbatim and project every
 * value but an authoritative observation as coverage 'partial' with a non-'success' tone (a rendering is never verification,
 * never upgraded), absent keys byte-identical; until then Pi claims nothing. Artifact: RFCLI epistemic_status schema." The owner
 * filing's until-then clause, verbatim: "Until then: a default-gate test reads the SCG-R11 fixture roster and fails when a
 * captured envelope names epistemic_status or a scenario key before those cases exist (freeze-and-flip), and docs/workbench/09
 * § Reader adapters gains one census-bound sentence that an RF prediction renders as unverified context (fold into wb-973.17 if
 * it lands first)." Rows T and D are its two clauses, each pin quoting its part; row Z is the title's "until then Pi claims
 * nothing".
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-26, Pi trunk dc72a6d; read-only; the census is hermetic and never re-reads any of it):
 *  - ReactiveFiberCLI at the filing's pin 82bd879eee52 is DESIGN ONLY (docs/programs/predictive-world-model-context-2026-10-18/
 *    README.md:2). 02-architecture.md:7 names PredictionNode.epistemic_status, and 01-semantics.md:3 (RF-WM-001) names the five
 *    classes.
 *  - ReactiveFiberCLI origin/main 2a882f0358 SERVES a labeled what-if form of context render behind --scenario PATH (RF-WM-R3-e,
 *    commit 8bd35ecd4, 2026-10-24). The installed rf 0.1.845's help lists the flag. Its schemas/cli/context.render.schema.json
 *    declares three things. result.speculative carries scenario_id, certification (certified or uncertified) and coherence.
 *    result.notice is the rf.whatif_notice block. Each blocks[].metadata carries rf.scenario_id and rf.epistemic_status, a
 *    closed RF-WM-001 enum: observation, inferred_claim, hypothesis, predicted_distribution, published_context_block. An
 *    uncertified scenario is refused (exit 7, RF_SCENARIO_UNCERTIFIED), so a scenario envelope that is served reads certified.
 *    The route serves --audience cli or audit only, and it refuses --model and --task beside --scenario.
 *  - Pi's preview arms never select that route. renderArgv in src/workbench/providers/reactivefiber.ts spells --model/--task or
 *    --view/--task-id, then --no-commit --no-input --json, and no src module spells scenario (Z1). The seat also ran the installed
 *    rf 0.1.845 with the legacy arm's argv (model claude-opus-5) in an empty scratch workspace after rf init. It answered ok with
 *    27 result keys. No key at any depth spelled epistemic, scenario, uncertified, speculative or notice. blocks was [] there, so
 *    block metadata was NOT observed.
 *  - So the trigger has fired upstream, on a route Pi does not take, and not on the envelope Pi's adapter reads. This cut is the
 *    until-then leg the filing asks for, and the shipped shape sets the vocabulary below. The acceptance on landing (an it.each
 *    over epistemic_status in test/workbench-reactivefiber-observer.test.ts) is not owed by this cut.
 *
 * VOCABULARY. A roster key is a trigger when it spells epistemic (EPISTEMIC_KEY), spells scenario, uncertified or speculative
 * (SCENARIO_KEY: speculative is the shipped result key that carries scenario_id and certification), or is exactly notice (the
 * shipped what-if notice key). Z1 reads src code for SRC_WORD: epistemic, scenario, uncertified, speculative, what-if and the
 * three RF-WM-001 snake-case words that src does not use for anything else.
 *
 * ROWS (one test per pin, under a describe of its row id and label):
 *  T, the filing's first clause. T1: the census reads test/fixtures/rf-result-keys.json through the shared reader
 *    readRfResultRoster. The roster is the captured, exhaustive one (owner ruling R649 (3)), and each of its four key lists meets
 *    a floor and holds its anchors. T2 (ARMED): no key of the four lists is an epistemic trigger. The predicate fires on every
 *    spelling planted in either of two lists and stays quiet on near misses. The roster diff that both tiers use reports a
 *    result-level epistemic key as unexpected against the captured roster, so the rf-preview tier's live diff fails on the
 *    first capture from an rf that adds one, and the re-capture that follows reds T2. T3 (ARMED):
 *    the same holds for scenario triggers, the shipped speculative and notice keys among them. Since wb-grmo.1 landed its
 *    speculative tripwire in that diff (speculativeMarkers in test/helpers/rf-render-fixture.ts, landing 545), the diff also
 *    names those two members as speculative, and T3's live diff pins both readings. T4: the bead names the file the
 *    owed cases land in, test/workbench-reactivefiber-observer.test.ts, and today it spells no epistemic word, so "those cases"
 *    do not exist yet.
 *  D, the filing's second clause. D1: the docs/09 § Reader adapters section renders SENTENCE exactly once, with no HTML. The
 *    docs09 census quotes it as half RA6/f and freezes that half's pins as exactly this file's T2, Z1 and Z2, each by its
 *    describe path and title, so the sentence is census-bound (and those three pins are anchored there). D2: the sentence opens with
 *    the owner's words. D3: wb-973.17 landed first (its receipt is titled), so the sentence is folded into the RF bullet that
 *    carries wb-973.17's clauses, as that bullet's last sentence.
 *  Z, until then Pi claims nothing. Z1: no src module's code spells a SRC_WORD. The scanner reads identifiers, strings,
 *    templates and regular expressions and never reads comments. Positive controls show it is live, a floor and three anchor
 *    modules show the walk is real. Z2: Pi composes no epistemic claim. Eleven variants of the clean full-shape envelope are
 *    marked: each RF-WM-001 word as result.epistemic_status (the filing's shape) and as the shipped block markers, and the
 *    shipped scenario form (result.speculative and result.notice). Each projects through reactivefiberTopology (rf-cli seam)
 *    and reads through nativeEvidence byte for byte as the unmarked envelope does, coverage and tone included: the adapter
 *    reads no epistemic word, so it neither upgrades nor demotes. No surfaced string spells a trigger word. This is the frozen
 *    pre-acceptance baseline, never a claim that it is the landed behaviour: the acceptance on landing makes these variants
 *    partial and non-success with the word carried verbatim, and flips Z2.
 *  F, the owner filing (an anchor outside this file and its roster). F1: in the wb-grmo.2 row of the tracked bead export, the
 *    first until-then sentence of the notes is "Until then: <row T label>, and <row D label>.". Each of those labels is its
 *    pins' quotes in order, joined only by connectives. The title holds row Z's label exactly once.
 *  Q, the named residuals, each with a pinned quiet row. Q1 R-NESTED: a marker below the result level outside the speculative
 *    tripwire's names (a provenance key beyond the roster's three-key floor) passes the roster diff, so no re-capture brings it
 *    to the roster. The shipped block metadata markers (rf.epistemic_status, rf.scenario_id) left the family when wb-grmo.1's
 *    tripwire landed: the diff names them at any depth, and Q1 pins that reading beside the quiet one. Q2 R-VALUE: an
 *    uncertified word carried as the value of a roster key passes unseen, since the roster lists keys.
 *    Q3 R-VOCABULARY: a key outside the vocabulary that carries the same meaning reads quiet on T2 and T3. Q4 R-SHARED-WORD:
 *    Z1 does not take hypothesis, which src code spells for its own relation kind.
 *
 * FREEZE AND FLIP. This cut is the frozen form. A re-captured roster that names a trigger reds T2 or T3 with the owed
 * acceptance named. The owed cases reaching the observer suite red T4, and an adapter that reads the word reds Z1 and Z2. The
 * cut that lands the acceptance flips this census: it re-arms T2 and T3 at the shipped surface and moves T4, Z1 and Z2 to the
 * landed reading, in the same commit.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal. The out-of-file roster
 * test/fixtures/rf-epistemic-status-roster.json holds every row's id and label and every pin's title, quote and witness, plus
 * each pin's reached seam counts and every registered test title. A pin deleted, relabelled, swapped for another case or
 * removed from every literal of this file at once still reds against it. Rows T and D and their pins are also held to the
 * owner's text (F1), and half RA6/f of the docs09 census pins T2, Z1 and Z2 by file, describe path and title (D1). Measured on
 * throwaway copies with the roster regenerated alongside: T3 removed from both still reds F1, and Z1 removed from both still
 * reds D1. Not claimed: a Q pin removed from this file and its roster together. The residual rows have no owner text outside
 * both files to anchor them, and that hollow was measured green.
 * SCOPE: this file and its roster are test-only; the cut also adds one docs/09 sentence and the docs09 census half that binds
 * it. Nothing is spawned or written; the repository files read are only read.
 *
 * Display paths added: none.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { docsSection } from "./helpers/census.js";
import { srcFiles } from "./helpers/gp-fallback-census.js";
import { diffAgainstRoster, fullShapeRf, type Json, type RfResultRoster, readRfResultRoster } from "./helpers/rf-render-fixture.js";

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-epistemic-status-roster.json");
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-grmo.2";
const DOCS_09 = "docs/workbench/09-observation-and-provenance.md";
const DOCS_09_PARENT = "09 — Observation, telemetry, provenance and derived graph";
const READERS = "Reader adapters";
const DOCS09_CENSUS = "test/workbench-docs09-readers-relationships.census.ts";
const OBSERVER_SUITE = "test/workbench-reactivefiber-observer.test.ts";
const WB_973_17_RECEIPT = "docs/workbench/receipts/wb-973.17.md";
/** This file, as the docs09 census names it in its pins, and its outer describe (the record holds the literal to it). */
const SELF = "test/workbench-rf-epistemic-status-census.test.ts";
const SUITE = "wb-grmo.2 RF epistemic-status freeze-and-flip census (RF-PREDICTIVE-WORLD-MODEL-CONTEXT-R2)";
/** A frozen RA6 pin line of the docs09 census for half f: "f | <file> | <describe path> | <title>". */
const RA6F_PIN = /^ {2}"f \| ([^|"]+) \| ([^|"]*) \| ([^|"]+)",$/gmu;
/** The sentence clause (b) adds to the RF bullet of docs/09 § Reader adapters; the docs09 census quotes it as half RA6/f. */
const SENTENCE = "An RF prediction renders as unverified context, and Pi claims no epistemic status for a render.";
/** The RF bullet's label, and one of the clauses wb-973.17 folded into that bullet (docs09 census half RA6/b). */
const RF_BULLET = "RF: ";
const WB_973_17_CLAUSE = "An RF snapshot's definition basis is bundle_revision_id when the envelope carries it";

/** A roster key that spells epistemic: epistemic_status, rf.epistemic_status, epistemicStatus, any letter case. */
const EPISTEMIC_KEY = /epistemic/iu;
/** A roster key that spells scenario or uncertified, or speculative (the shipped result.speculative carries scenario_id). */
const SCENARIO_KEY = /scenario|uncertified|speculative/iu;
/** The shipped what-if notice's result key (result.notice, the rf.whatif_notice block), matched exactly. */
const SCENARIO_FORM_KEYS: readonly string[] = ["notice"];
/** The words Z1 reads in src code: the two trigger stems, speculative, what-if and the RF-WM-001 words src uses for nothing else. */
const SRC_WORD = /epistemic|scenario|uncertified|speculative|what.?if|inferred_claim|predicted_distribution|published_context_block/iu;
/** The five RF-WM-001 words of the shipped rf.epistemic_status enum, in the schema's order. */
const EPISTEMIC_WORDS: readonly string[] = ["observation", "inferred_claim", "hypothesis", "predicted_distribution", "published_context_block"];
const ROSTER_LISTS = ["resultKeys", "provenanceKeys", "workKeys", "workMetricsKeys"] as const;
type RosterList = (typeof ROSTER_LISTS)[number];
/** Each list's floor, below the count of the captured 0.1.784 roster (24, 3, 6, 14), and the keys each list must hold. */
const LIST_FLOORS: Readonly<Record<RosterList, number>> = { resultKeys: 20, provenanceKeys: 3, workKeys: 6, workMetricsKeys: 10 };
const LIST_ANCHORS: Readonly<Record<RosterList, readonly string[]>> = {
  resultKeys: ["output", "blocks", "provenance"],
  provenanceKeys: ["graph_revision_id", "cli_version"],
  workKeys: ["storage_write_count"],
  workMetricsKeys: ["blob_bytes_written"],
};
/** The src walk's floor (116 TypeScript modules at dc72a6d) and the three modules it must read, each holding its token in code. */
const SRC_FLOOR = 100;
const SRC_ANCHORS: Readonly<Record<string, string>> = {
  "src/workbench/providers/reactivefiber.ts": "--no-commit",
  "src/workbench/reactivefiber-observer.ts": "context.render",
  "src/workbench/native-evidence.ts": "reactivefiber.render.preview",
};
/** The workspace identity the readings and the host scope name: a string the observer compares, never a directory; it spells no trigger word. */
const WS = "/workspace/rf-until-then-census";
const HOST: ReactiveFiberTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:census" },
  seam: "rf-cli",
  capturedAt: "2026-10-26T00:00:00Z",
  observedAt: "2026-10-26T00:00:01Z",
};
const SCENARIO_ID = `sha256:${"c".repeat(64)}`;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; rows T and D are the filing's two until-then clauses verbatim, row Z the title's. */
const ROWS: readonly Row[] = [
  {
    id: "T",
    label:
      "a default-gate test reads the SCG-R11 fixture roster and fails when a captured envelope names epistemic_status or a scenario key before those cases exist (freeze-and-flip)",
    pins: ["T1", "T2", "T3", "T4"],
  },
  {
    id: "D",
    label: "docs/workbench/09 § Reader adapters gains one census-bound sentence that an RF prediction renders as unverified context (fold into wb-973.17 if it lands first)",
    pins: ["D1", "D2", "D3"],
  },
  { id: "Z", label: "until then Pi claims nothing", pins: ["Z1", "Z2"] },
  { id: "F", label: "the owner filing in the tracked bead export tiles rows T and D pin by pin and its title holds row Z", pins: ["F1"] },
  { id: "Q", label: "the named residuals, each with a pinned quiet row", pins: ["Q1", "Q2", "Q3", "Q4"] },
];
/** The part of its row's clause each pin of rows T and D evidences, verbatim; F1 holds them to the owner's text. */
const QUOTES: Readonly<Record<string, string>> = {
  T1: "a default-gate test reads the SCG-R11 fixture roster",
  T2: "fails when a captured envelope names epistemic_status",
  T3: "or a scenario key",
  T4: "before those cases exist (freeze-and-flip)",
  D1: "docs/workbench/09 § Reader adapters gains one census-bound sentence",
  D2: "that an RF prediction renders as unverified context",
  D3: "(fold into wb-973.17 if it lands first)",
};
/** The case title of each pin (its id, then what it pins); half RA6/f of the docs09 census binds T2, Z1 and Z2 by these titles. */
const PIN_TITLES: Readonly<Record<string, string>> = {
  T1: "T1 reads the SCG-R11 fixture roster: test/fixtures/rf-result-keys.json parses through readRfResultRoster as the captured, exhaustive roster, each key list at its floor",
  T2: "T2 fails when a captured envelope names epistemic_status (ARMED): no key of the roster's four lists spells an epistemic form, and the roster diff reds a result-level one",
  T3: "T3 or a scenario key (ARMED): no roster key spells scenario, uncertified or speculative or is the shipped notice key, and the roster diff reds a result-level one",
  T4: "T4 before those cases exist (freeze-and-flip): the observer suite the owed cases land in spells no epistemic word, so this census stands in its frozen form",
  D1: "D1 docs/workbench/09 § Reader adapters gains one census-bound sentence: it renders there exactly once and the docs09 census binds it as half RA6/f",
  D2: "D2 that an RF prediction renders as unverified context: the sentence opens with the owner's words verbatim",
  D3: "D3 (fold into wb-973.17 if it lands first): wb-973.17 landed first, and the sentence closes the RF bullet that carries its clauses",
  Z1: "Z1 Pi claims nothing in code: no src module's identifiers, strings, templates or regexes spell an epistemic, scenario, uncertified or speculative word",
  Z2: "Z2 Pi composes no epistemic claim: an envelope marked with each RF-WM-001 word, the shipped block markers or the scenario form projects and evidences byte for byte as its unmarked twin",
  F1: "F1 the owner filing's until-then sentence is rows T and D joined, each label its pins' quotes, and the title holds row Z's clause once",
  Q1: "Q1 R-NESTED: a marker below the result level outside the speculative tripwire's names (a provenance key) passes the roster diff, so no re-capture brings it to the roster",
  Q2: "Q2 R-VALUE: an uncertified word carried as the value of a roster key passes the roster diff unseen",
  Q3: "Q3 R-VOCABULARY: a key outside the vocabulary that carries the same meaning (belief_state, what_if_view) reads quiet on T2 and T3",
  Q4: "Q4 R-SHARED-WORD: Z1 does not take hypothesis, which src code spells for Pi's own relation kind",
};
const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster and the cases agree";
const RECORD_TITLE = "the record: every registered test is in run mode and ran, and every pin reached its seams as the roster pins";

interface RosterPin {
  readonly id: string;
  readonly title: string;
  readonly quote: string | null;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly rows: readonly RosterRow[];
  readonly reached: Readonly<Record<string, Readonly<Record<string, number>>>>;
  readonly residuals: Readonly<Record<string, string>>;
  readonly tests: readonly string[];
}
const ROSTER = JSON.parse(readFileSync(ROSTER_PATH, "utf8")) as Roster;
const rosterWitness = (pin: string): Json => {
  for (const row of ROSTER.rows) for (const entry of row.pins) if (entry.id === pin) return entry.witness;
  throw new Error(`the roster holds no witness for ${pin}`);
};
/** The named residual families and the quiet row that pins each. */
const RESIDUALS: Readonly<Record<string, string>> = { "R-NESTED": "Q1", "R-VALUE": "Q2", "R-VOCABULARY": "Q3", "R-SHARED-WORD": "Q4" };

// ---- the reached record: each seam a case reads through counts one read for the running pin ----

let running = "";
const reached: Record<string, Record<string, number>> = {};
function touch(seam: string): void {
  const counts = reached[running] ?? {};
  counts[seam] = (counts[seam] ?? 0) + 1;
  reached[running] = counts;
}
const textOf = (path: string, seam: string): string => {
  touch(seam);
  return readFileSync(join(REPO, path), "utf8");
};
const roster = (): RfResultRoster => {
  touch("roster");
  return readRfResultRoster();
};
const diff = (rf: RfResultRoster, result: Readonly<Record<string, unknown>>): string[] => {
  touch("diff");
  return diffAgainstRoster(rf, result).failures;
};
const project = (reading: JsonValue): string => {
  touch("topology");
  return JSON.stringify(reactivefiberTopology(reading, HOST));
};
const evidence = (reading: JsonValue): string => {
  touch("evidence");
  return JSON.stringify(nativeEvidence("reactivefiber.render.preview", reading));
};

// ---- the readers ----

/** Every roster key that is an epistemic (or, with `scenario`, a scenario) trigger, as `<list>:<key>`, in roster order. */
function triggers(rf: RfResultRoster, kind: "epistemic" | "scenario"): string[] {
  const test = (key: string): boolean => (kind === "epistemic" ? EPISTEMIC_KEY.test(key) : SCENARIO_KEY.test(key) || SCENARIO_FORM_KEYS.includes(key));
  return ROSTER_LISTS.flatMap(list => rf[list].filter(test).map(key => `${list}:${key}`));
}
/** A copy of the roster with `key` appended to `list`. */
const planted = (rf: RfResultRoster, list: RosterList, key: string): RfResultRoster => ({ ...rf, [list]: [...rf[list], key] });

/** The code text of one TypeScript module: identifiers, string and template literal parts, regular expressions, JSX text; never a comment. */
function codeTexts(file: string, text: string): string[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    if (
      ts.isIdentifier(node) ||
      ts.isPrivateIdentifier(node) ||
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node) ||
      ts.isRegularExpressionLiteral(node) ||
      ts.isJsxText(node)
    ) {
      out.push(node.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return out;
}
/** The src walk: every TypeScript module under src/ with its code text, read once. */
function srcCode(): { readonly file: string; readonly code: readonly string[] }[] {
  touch("src");
  return srcFiles(REPO)
    .filter(file => /\.[cm]?ts$/u.test(file))
    .map(file => ({ file, code: codeTexts(file, readFileSync(join(REPO, file), "utf8")) }));
}
const codeHits = (file: string, text: string, word: RegExp): string[] => codeTexts(file, text).filter(part => word.test(part));

/** The rendered RF bullet of docs/09 § Reader adapters and its sentences; the section must bind and carry no HTML. */
function rfBullet(): { readonly items: readonly string[]; readonly text: string; readonly hasHtml: boolean; readonly sentences: readonly string[] } {
  const section = docsSection(textOf(DOCS_09, "docs"), READERS, 2, [DOCS_09_PARENT]);
  expect(section.ok, section.why).toBe(true);
  const items = section.blocks.flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : []));
  const text = section.blocks.map(block => (block.kind === "list" ? block.items.map(item => item.text).join("\n") : block.kind === "paragraph" ? block.text : "")).join("\n");
  const rf = items.filter(item => item.startsWith(RF_BULLET));
  expect(rf, "the section holds exactly one RF bullet").toHaveLength(1);
  const sentences = (rf[0] ?? "").slice(RF_BULLET.length).split(/(?<=\.) /u);
  return { items, text, hasHtml: section.hasHtml, sentences };
}

/** The tracked bead export's row of this bead: its title and notes (the owner filing leads the notes). */
function exportRow(): { readonly title: string; readonly notes: string } {
  for (const line of textOf(BEAD_EXPORT, "export").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row = JSON.parse(line) as JsonObject;
    if (row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`the tracked bead export (${BEAD_EXPORT}) holds no ${BEAD} row with a title and notes`);
}
/** What remains of `text` once each part is removed once, in order; undefined when a part is absent from what remains. */
function remainder(text: string, parts: readonly string[]): string | undefined {
  let left = text;
  for (const part of parts) {
    const at = left.indexOf(part);
    if (at < 0) return undefined;
    left = `${left.slice(0, at)}${left.slice(at + part.length)}`;
  }
  return left;
}
/** Text that joins a row's quotes: whitespace, commas and one "and". */
const CONNECTIVES = /^[\s,]*(?:and)?[\s,]*$/u;

/** The provider reading of a clean full-shape envelope, its result edited by `mark`. */
function reading(mark: (result: JsonObject) => void): JsonValue {
  const envelope = fullShapeRf(WS) as JsonObject;
  const result = envelope.result as JsonObject;
  mark(result);
  return { contract: "reactivefiber.render.preview/v1", workspaceRoot: WS, source: envelope } as JsonValue;
}
/** The first block of a result, re-labelled with the shipped rf. markers (its content and the two metadata keys). */
function markBlock(result: JsonObject, word: string): void {
  const blocks = result.blocks as JsonObject[];
  blocks[0] = { ...blocks[0], content: "context", metadata: { "rf.scenario_id": SCENARIO_ID, "rf.epistemic_status": word } };
}
/** The shipped scenario form's two result keys, in the schema's shapes (a certified scenario: an uncertified one is refused). */
function markScenario(result: JsonObject): void {
  result.speculative = {
    scenario_id: SCENARIO_ID,
    base_view: `sha256:${"d".repeat(64)}`,
    certification: { status: "certified", rules: [] },
    coherence: "coherent",
  };
  result.notice = { kind: "notice", key: "rf.whatif_notice", host_written: true, content: "notice", metadata: { "rf.scenario_id": SCENARIO_ID, "rf.epistemic_status": "observation" } };
}
/** Every key and string a projection carries, so a composed word anywhere in it is found. */
function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) strings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      out.push(key);
      strings(item, out);
    }
  }
  return out;
}

const IMPL: Readonly<Record<string, () => Json>> = {
  T1: () => {
    const rf = roster();
    const floorsMet = ROSTER_LISTS.filter(list => rf[list].length >= LIST_FLOORS[list]);
    const anchorsHeld = ROSTER_LISTS.flatMap(list => LIST_ANCHORS[list].filter(key => rf[list].includes(key)));
    const witness = { source: rf.source, receipt: rf.receipt === null ? "absent" : "stated", floorsMet, anchorsHeld: anchorsHeld.length };
    expect(witness).toStrictEqual({ source: "captured", receipt: "stated", floorsMet: [...ROSTER_LISTS], anchorsHeld: 7 });
    return witness;
  },
  T2: () => {
    const rf = roster();
    const hits = triggers(rf, "epistemic");
    expect(hits, `rf now states an epistemic key (${hits.join(", ")}): the RF-WM-001 acceptance of ${BEAD} is owed in ${OBSERVER_SUITE} before this census flips`).toEqual([]);
    const spellings = ["epistemic_status", "rf.epistemic_status", "epistemicStatus", "EPISTEMIC-STATUS"];
    const fired = (["resultKeys", "provenanceKeys"] as const).flatMap(list => spellings.filter(key => triggers(planted(rf, list, key), "epistemic").length === 1));
    const quiet = ["observations", "necessity", "components", "audience"].filter(key => triggers(planted(rf, "resultKeys", key), "epistemic").length === 0);
    const live = diff(rf, { ...((fullShapeRf(WS) as JsonObject).result as JsonObject), epistemic_status: "hypothesis" });
    const witness = { hits, fired: fired.length, quiet: quiet.length, liveDiff: live };
    expect(witness).toStrictEqual({ hits: [], fired: 8, quiet: 4, liveDiff: ["unexpected result.epistemic_status"] });
    return witness;
  },
  T3: () => {
    const rf = roster();
    const hits = triggers(rf, "scenario");
    expect(hits, `rf now states a scenario key (${hits.join(", ")}): the scenario cases of ${BEAD} are owed in ${OBSERVER_SUITE} before this census flips`).toEqual([]);
    const spellings = ["scenario_id", "rf.scenario_id", "scenarioStatus", "uncertified", "speculative", "notice"];
    const fired = ROSTER_LISTS.flatMap(list => spellings.filter(key => triggers(planted(rf, list, key), "scenario").length === 1));
    const quiet = ["observations", "notices", "judge_context", "plan"].filter(key => triggers(planted(rf, "resultKeys", key), "scenario").length === 0);
    const scenarioForm = reading(markScenario) as JsonObject;
    const live = diff(rf, (scenarioForm.source as JsonObject).result as JsonObject);
    const witness = { hits, fired: fired.length, quiet: quiet.length, liveDiff: live };
    expect(witness).toStrictEqual({
      hits: [],
      fired: 24,
      quiet: 4,
      liveDiff: ["unexpected result.notice", "unexpected result.speculative", "speculative result.notice", "speculative result.speculative"],
    });
    return witness;
  },
  T4: () => {
    const text = textOf(OBSERVER_SUITE, "suite");
    const witness = {
      suite: OBSERVER_SUITE,
      observerSuite: text.includes("reactivefiberTopology") && text.includes("R1: a clean noncommitted preview projects one snapshot"),
      epistemicMentions: text.split(/epistemic/iu).length - 1,
    };
    expect(witness.epistemicMentions, `the owed RF-WM-001 cases now reach ${OBSERVER_SUITE}: flip this census in the same commit`).toBe(0);
    expect(witness).toStrictEqual({ suite: OBSERVER_SUITE, observerSuite: true, epistemicMentions: 0 });
    return witness;
  },
  D1: () => {
    const bullet = rfBullet();
    const census = textOf(DOCS09_CENSUS, "census");
    const clause = SENTENCE.slice(0, -1);
    const witness = {
      occurrences: bullet.text.split(SENTENCE).length - 1,
      hasHtml: bullet.hasHtml,
      censusQuotesClause: census.split(`"${clause}"`).length - 1,
      censusFreezesClause: census.includes(`"f | clause | ${clause}"`),
      censusBindsThisFile: census.includes(`"${SELF}"`),
      ra6f: [...census.matchAll(RA6F_PIN)].map(([, file, path, title]) => {
        const pin = Object.keys(PIN_TITLES).find(id => PIN_TITLES[id] === title) ?? "unregistered";
        const row = ROWS.find(entry => entry.pins.includes(pin));
        return file === SELF && row !== undefined && path === `${SUITE} > ${row.id} ${row.label}` ? pin : `${pin}: ${file} | ${path} | ${title}`;
      }),
    };
    expect(witness).toStrictEqual({ occurrences: 1, hasHtml: false, censusQuotesClause: 1, censusFreezesClause: true, censusBindsThisFile: true, ra6f: ["T2", "Z1", "Z2"] });
    return witness;
  },
  D2: () => {
    const bullet = rfBullet();
    const words = (QUOTES.D2 ?? "").replace(/^that an /u, "An ");
    const opened = bullet.sentences.filter(sentence => sentence.startsWith(words));
    const witness = { opening: words, sentences: opened };
    expect(witness).toStrictEqual({ opening: "An RF prediction renders as unverified context", sentences: [SENTENCE] });
    return witness;
  },
  D3: () => {
    const receipt = textOf(WB_973_17_RECEIPT, "receipt").split("\n")[0] ?? "";
    const bullet = rfBullet();
    const witness = {
      receiptTitled: receipt.startsWith("# wb-973.17: "),
      bulletSentences: bullet.sentences.length,
      position: bullet.sentences.indexOf(SENTENCE),
      foldedBeside973_17: bullet.sentences.some(sentence => sentence.includes(WB_973_17_CLAUSE)),
      otherItems: bullet.items.filter(item => !item.startsWith(RF_BULLET) && item.includes(SENTENCE)).length,
    };
    expect(witness).toStrictEqual({ receiptTitled: true, bulletSentences: 4, position: 3, foldedBeside973_17: true, otherItems: 0 });
    return witness;
  },
  Z1: () => {
    const modules = srcCode();
    const read = modules.map(entry => entry.file);
    const anchorsRead = Object.entries(SRC_ANCHORS).filter(([file, token]) => modules.some(entry => entry.file === file && entry.code.some(part => part.includes(token))));
    const hits = modules.flatMap(entry => entry.code.filter(part => SRC_WORD.test(part)).map(part => `${entry.file}: ${part}`));
    const controls = {
      string: codeHits("c.ts", 'export const key = "epistemic_status";', SRC_WORD).length,
      identifier: codeHits("c.ts", "export const scenarioId = 1;", SRC_WORD).length,
      template: codeHits("c.ts", `export const label = \`rf \${1} speculative\`;`, SRC_WORD).length,
      regex: codeHits("c.ts", "export const word = /uncertified/;", SRC_WORD).length,
      comment: codeHits("c.ts", "// epistemic_status scenario speculative\nexport const plain = 1;", SRC_WORD).length,
    };
    const witness = { floorMet: read.length >= SRC_FLOOR, anchorsRead: anchorsRead.length, controls, hits };
    expect(witness).toStrictEqual({ floorMet: true, anchorsRead: 3, controls: { string: 1, identifier: 1, template: 1, regex: 1, comment: 0 }, hits: [] });
    return witness;
  },
  Z2: () => {
    const plain = reading(() => undefined);
    const plainProjection = project(plain);
    const plainEvidence = evidence(plain);
    const variants: JsonValue[] = [
      ...EPISTEMIC_WORDS.map(word =>
        reading(result => {
          result.epistemic_status = word;
        }),
      ),
      ...EPISTEMIC_WORDS.map(word => reading(result => markBlock(result, word))),
      reading(markScenario),
    ];
    const projections = variants.map(project);
    const evidences = variants.map(evidence);
    const composed = [plainProjection, plainEvidence].flatMap(text => strings(JSON.parse(text))).filter(text => SRC_WORD.test(text));
    const witness = {
      variants: variants.length,
      sameProjection: projections.filter(text => text === plainProjection).length,
      sameEvidence: evidences.filter(text => text === plainEvidence).length,
      snapshots: (JSON.parse(plainProjection) as { snapshots: unknown[] }).snapshots.length,
      composed,
    };
    expect(witness).toStrictEqual({ variants: 11, sameProjection: 11, sameEvidence: 11, snapshots: 1, composed: [] });
    return witness;
  },
  F1: () => {
    const { title, notes } = exportRow();
    const opener = "Until then: ";
    const at = notes.indexOf(opener);
    const sentence = at < 0 ? "" : notes.slice(at, notes.indexOf(". ", at) + 1);
    const label = (id: string): string => ROWS.find(row => row.id === id)?.label ?? "";
    const quotes = (id: string): string[] => (ROWS.find(row => row.id === id)?.pins ?? []).map(pin => QUOTES[pin] ?? "");
    const tiling = Object.fromEntries(["T", "D"].map(id => [id, remainder(label(id), quotes(id)) ?? null]));
    const witness = {
      filing: notes.startsWith("Owner filing (2026-10-19"),
      untilThen: sentence === `${opener}${label("T")}, and ${label("D")}.`,
      tiling,
      joined: Object.values(tiling).every(left => typeof left === "string" && CONNECTIVES.test(left)),
      titleHoldsZ: title.split(label("Z")).length - 1,
    };
    expect(witness).toStrictEqual({ filing: true, untilThen: true, tiling: { T: " and   ", D: "  " }, joined: true, titleHoldsZ: 1 });
    return witness;
  },
  Q1: () => {
    const rf = roster();
    const base = (fullShapeRf(WS) as JsonObject).result as JsonObject;
    const nestedBlock = (reading(result => markBlock(result, "predicted_distribution")) as JsonObject).source as JsonObject;
    const plants: Readonly<Record<string, JsonObject>> = {
      "blocks[0].metadata.rf.epistemic_status": nestedBlock.result as JsonObject,
      "provenance.epistemic_status": { ...base, provenance: { ...(base.provenance as JsonObject), epistemic_status: "hypothesis" } },
    };
    const witness = { plants: Object.keys(plants), failures: Object.values(plants).map(result => diff(rf, result)), triggers: triggers(rf, "epistemic").length };
    expect(witness).toStrictEqual({
      plants: ["blocks[0].metadata.rf.epistemic_status", "provenance.epistemic_status"],
      failures: [['speculative result.blocks[0].metadata["rf.epistemic_status"]', 'speculative result.blocks[0].metadata["rf.scenario_id"]'], []],
      triggers: 0,
    });
    return witness;
  },
  Q2: () => {
    const rf = roster();
    const base = (fullShapeRf(WS) as JsonObject).result as JsonObject;
    const witness = { plant: "result.audience = uncertified", failures: diff(rf, { ...base, audience: "uncertified" }) };
    expect(witness).toStrictEqual({ plant: "result.audience = uncertified", failures: [] });
    return witness;
  },
  Q3: () => {
    const rf = roster();
    const keys = ["belief_state", "what_if_view"];
    const hits = keys.flatMap(key => [...triggers(planted(rf, "resultKeys", key), "epistemic"), ...triggers(planted(rf, "resultKeys", key), "scenario")]);
    const witness = { keys, hits };
    expect(witness).toStrictEqual({ keys: ["belief_state", "what_if_view"], hits: [] });
    return witness;
  },
  Q4: () => {
    const modules = srcCode();
    const witness = {
      snippetHits: codeHits("c.ts", 'export const kind = "hypothesis";', SRC_WORD).length,
      srcSpellsHypothesis: modules.some(entry => entry.code.some(part => /hypothesis/iu.test(part))),
    };
    expect(witness).toStrictEqual({ snippetHits: 0, srcSpellsHypothesis: true });
    return witness;
  },
};

describe("wb-grmo.2 RF epistemic-status freeze-and-flip census (RF-PREDICTIVE-WORLD-MODEL-CONTEXT-R2)", () => {
  it(JUDGED_TITLE, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:4", "D:3", "Z:2", "F:1", "Q:4"]);
    expect(ROSTER.bead).toBe(BEAD);
    expect(
      ROWS.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => ({ id: pin, title: PIN_TITLES[pin] ?? "", quote: QUOTES[pin] ?? null })) })),
    ).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => ({ id: pin.id, title: pin.title, quote: pin.quote })) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(Object.keys(PIN_TITLES).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(Object.keys(QUOTES)).toEqual(ROWS.filter(row => row.id === "T" || row.id === "D").flatMap(row => row.pins));
    expect(RESIDUALS).toStrictEqual(ROSTER.residuals);
    expect(Object.values(RESIDUALS)).toEqual(ROWS.find(row => row.id === "Q")?.pins);
    for (const row of ROWS) for (const pin of row.pins) expect(PIN_TITLES[pin]?.startsWith(`${pin} `), pin).toBe(true);
    for (const [family, pin] of Object.entries(RESIDUALS)) expect(PIN_TITLES[pin]?.startsWith(`${pin} ${family}: `), family).toBe(true);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(PIN_TITLES[pin] ?? pin, { timeout: 60_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          running = pin;
          const witness = impl === undefined ? null : impl();
          running = "";
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it(RECORD_TITLE, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(task.file.tasks.map(child => child.name), "one outer describe, named SUITE (the docs09 census binds its path)").toEqual([SUITE]);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => `${entry.name} | ${entry.mode} | ${entry.state ?? "no result"}`),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    const pins = ROWS.flatMap(row => row.pins);
    expect(pins.filter(pin => Object.keys(reached[pin] ?? {}).length === 0), "a pin that read nothing through its seams").toEqual([]);
    expect(reached, "each pin's seam reads equal the roster's").toStrictEqual(ROSTER.reached);
  });
});
