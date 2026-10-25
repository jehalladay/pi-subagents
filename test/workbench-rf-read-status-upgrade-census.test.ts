/**
 * wb-hs2j.8 (RF-REACTIVE-CONTEXT-ASSEMBLY-R9, program-triage-2026-10-22, epic wb-hs2j), the posture leg. Statement (the bead
 * note's full statement): "No Pi surface shall upgrade an rf read-side status: a replayability classification is presented as
 * claimed, never replay-verified - only an executed document_exact outcome is byte-exact (gated: five-label replay classifier,
 * rfc-kxtb5.17 + rfc-02alo open, unshipped) - and coverage-unknown stays distinct from no-results, an empty assembly coverage
 * output is never proof that no context was needed (gated: assembly coverage, README C7, design only)" - ReactiveFiberCLI
 * docs/programs/reactive-context-assembly-2026-10-18/02-swarm-usage-and-command-grammar.md:88@6a251bf73af5, merged with
 * README.md:76. Acceptance (the owner filing's, each clause verbatim in exactly one row label below): "(a) Pi projections of
 * show/history replay fields render the producer's label as claimed, never verified, absent an executed replay receipt (a
 * replayable_exact read then a failed replay is claimed true / verified false); (b) when the five labels ship, Pi carries the
 * label verbatim and treats only document_exact as byte-exact; (c) a Pi coverage consumer renders empty results as
 * no-results-observed-under-scope, never no-context-needed, absent a completeness certificate; (d) coverage unknown and no
 * results map to distinct Pi statuses." Trigger (the filing's Not P0 line, verbatim in row A's label): "Pi reads no replay or
 * coverage fields today".
 *
 * Pi's rf readers today: the reactivefiber.render.preview provider (src/workbench/providers/reactivefiber.ts) spawns only
 * `rf --workspace W context render ... --no-commit --no-input --json` and admits only context.render envelopes; its reader
 * adapter (reactivefiber-observer.ts) refuses every other command; the native evidence projection (native-evidence.ts) reads a
 * render's operation id, basis and release and states NO domainStatus for rf ("`ok` describes CLI transport success; it is not a
 * graph verification verdict"), so an rf node never reaches the workflow card's verified tick (domainStatus "verified",
 * src/ui/workflow-card.ts). The one rf field with "replay" in its name any Pi reader reads is the observation row's boolean
 * replayed, which can only demote. Pi has no show, history, replay or assembly reader, so the trigger has not fired; the census
 * pins that state, and every surface the obligation already reaches, over THE WALK (every file below WALK_ROOTS: a module parsed by
 * the TypeScript compiler, whose comments are not read; any other file, a shell script, a JSON receipt or a markdown page, read
 * whole as one text) and over the readings, projections and inspector lines the readers produce:
 *  A, the trigger, absent today. A1 no judged file spells an rf read-side replay field, a replayability class or a replay
 *    outcome (VOCABULARY: the measured snake_case names and their camelCase forms, case aside) as an identifier or a whole word of
 *    a literal (a regular expression's pattern words, and strings folded through the module's const bindings, included), nor an rf
 *    assembly verb (argv or literal, flags between the group and its subverb aside), with floors, a module and a text anchor, the
 *    tree anchor and twenty-two controls. A2 the producer's three status
 *    envelopes (a context.show and a context.history read stating replayable_exact, a context.replay outcome reproduced) are
 *    refused by the adapter, project no native evidence and are refused by the native provider in one spawn.
 *  B, acceptance (a). B1 a preview carrying a replayability claim (each measured class, with its reasons, on additive result keys)
 *    rides the registered reading and the shared display form byte for byte, label included, natively as through the injected
 *    seam. B2 never verified: for each class the claim-carrying preview projects exactly as the claim-free one, on a clean and on
 *    a demoted base (no upgrade), its native evidence is the claim-free evidence and no evidence states a domainStatus, no
 *    projected string carries a verification word, and the 02:60 sequence (a replayable_exact read, then the replay refused with
 *    RF_INTERNAL) projects the refusal as a failure of unknown coverage carrying no value. B3 no judged file states a verified
 *    replay (VERIFIED_REPLAY), with thirteen controls. B4 the observation row's replayed flag demotes: two reused rows hold the
 *    preview at partial with the reused note and no verification word, the same rows fresh read complete.
 *  C, acceptance (b), gated. C1 the five-label contract is unshipped: the roster's measured classes are the four render-time
 *    classes in both read schemas, the five labels the program offers (02:60) are disjoint from them and spelled by no file of the
 *    installed rf, the first is document_exact (the filing's authority restriction), the BEADS rows 61-62 hold rfc-kxtb5.17 and
 *    rfc-02alo open, and the filing's gating sentence and title agree; a re-measure that ships a label flips C1 red until (b)
 *    lands with it. C2 today: no judged file and no docs file spells a label (case aside), no judged file states byte-exactness
 *    (docs carry Pi-native byte-exact lines and are not judged for it), and a preview carrying each label rides the registered
 *    reading verbatim and projects and evidences exactly as the label-free one.
 *  D, acceptance (c), gated. D1 the assembly coverage verb is unshipped: the captured rf registry (test/fixtures/
 *    rf-version-leaves.json, the roster's build) serves no assembly or coverage leaf, README:76 states the filing's merged quote,
 *    README:99 and BEADS:94 state design only, and the gating sentence agrees. D2 no judged file states that no context was
 *    needed (NO_CONTEXT), with eleven controls, and neither the projection of an empty-results render nor any inspector line of it
 *    or of an empty invocation does; the empty invocation reads the inspector's scoped no-results line.
 *  E, acceptance (d). E1 Pi's snapshot coverage vocabulary is complete/partial/unknown (the NativeSnapshot type, read by the
 *    compiler); a refused render projects coverage unknown in a failure tone, an empty-results render projects neither, and the two
 *    differ in coverage, tone and status text. E2 the inspector: the refused render's details read "coverage unknown" without the
 *    no-results line, an empty invocation reads the no-results line without "coverage unknown", and the empty-results render reads
 *    neither.
 * MEASURED BY THE CUTTING SEAT (2026-10-23, read-only): rf 0.1.832 (`rf --json --version` result.version, commit 2618c211be0d, a
 * descendant of the program pin 6a251bf73af5 by git merge-base --is-ancestor) lists seven context leaves and no assembly leaf; its
 * packaged schemas/cli/context.show.schema.json and context.history.schema.json give the replayability property names and the
 * $defs.replayability_class enum, context.replay.schema.json the success outcome enum and storage.compact.schema.json its
 * replayability_changes key (each file's sha256 in the roster); no file of the installed package spells any of the five labels;
 * `git show 6a251bf73af5:` on the local ReactiveFiberCLI checkout reads 02:60 and :88, README.md:76 and :99 and
 * BEADS-2026-10-21.md:61, :62 and :94. The live replay output the landed wb-tnz5.4 census measured (test/fixtures/
 * rf-replay-history-roster.json; cited, never read by this census) carries result.replayability.classification
 * replayable_exact: the same replayability key A1's vocabulary covers. Pi vendors none of these; a producer change is seen only
 * when a cut re-measures.
 * OVERLAP (disclosed): the landed wb-tnz5.4 census (test/workbench-rf-replay-history-census.test.ts, landing 275) also pins the
 * refusal of a context.replay output by both readers (its C1/C2, over the measured output) and the replayed-row demotion (its C4,
 * one row, freshness labels); this census's A2 adds the show and history status envelopes and the native evidence leg, and B4
 * adds the verification-word and evidence legs over two reused rows. Neither census reads the other.
 * FIXTURES: every envelope is CONSTRUCTED. The claim-carrying previews are the full-shape render fixture (test/helpers/
 * rf-render-fixture.ts) with the measured result.replayability and result.replayability_reasons keys added (a render result states
 * neither today; the provider admits additive keys); the three status envelopes carry the measured field names and values in the
 * strict eight-key envelope; the refusal places RF_INTERNAL (the 02:60 replay failure) on a context.render failure envelope; the
 * empty-results render states an empty document, no block, no component and no decision. Projections use the rf-cli seam label,
 * as native readings do: the fixture-seam label holds every render partial, which would hide an upgrade.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness (each carries its pin id), the scan constants, the derived vocabularies, the residual families and the registered test
 * titles are held to the out-of-file roster (test/fixtures/rf-read-status-upgrade-roster.json). OUTSIDE ANCHOR: the owner
 * filing's row in the tracked bead export (.beads/issues.jsonl, row wb-hs2j.8): each acceptance clause and the trigger sit verbatim
 * in exactly one row label, every row carries one of them, and its statement, quotes, citations, authority restriction and gating
 * sentence equal the roster's, so a row removed from every literal of this file and the roster still reds. TREE ANCHOR: the
 * repository's top-level directories (dot directories aside) are read beside the walk, and each one holding a module must be a walk
 * root or one of OUTSIDE_ROOTS, so a root dropped from every literal of this file and the roster that names or reads below it
 * (WALK_ROOTS, FLOORS, TEXT_ANCHOR) still reds (A1, B3, C2, D2). Not claimed: a pin removed from ROWS, the literal, IMPL and the
 * roster together (the bead row anchors rows and clauses, not pins); a walk root moved into OUTSIDE_ROOTS, with those literals, in
 * this file and the roster together (the tree anchors that every directory holding a module is walked or named outside, not on
 * which side it is named).
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its end (REACHED). The judged set reads the same task tree at registration
 * (collection precedes every case), so the records case deleted, skipped or inverted still reds there.
 * BREADTH (disclosed, fail-closed): the families judge wording, not subsystem, so Pi-native text in their shapes (the workflow
 * journal's own replay, a packaging note, a wizard hint) reds as an rf claim would; B3 journalNative, C2 packagingNote and D2
 * wizardHint pin that breadth, so narrowing a family changes a witness and is never silent.
 * RESIDUALS (named families, each with a pinned quiet row): R-COMPOSED a field name or verb assembled at run time (from a
 * parameter, an import, a call or a computed member, or through a name the module binds to two values) is invisible to the walk (A1
 * composed, importedConstant); R-COMMENT a comment naming a field is not read in a module (A1 comment; a non-module file is read
 * whole); R-GENERIC-WORD the one-word replay outcome
 * "reproduced" (and the replay output's nested classification key) is a common word, so it is not scanned in modules, only in
 * projected strings (A1 genericOutcome); R-LABEL-UNRENDERED
 * the adapter renders no replayability label at all, neither claimed nor verified, so a claim reaches a reader only through the
 * registered reading (B2's identical projections); R-ROWS-SILENT the observation leg states nothing about an empty or an absent
 * observation list, so for the render's own rows Pi distinguishes neither (E1 rowsSilent; the render's own list is rf's record of
 * that render, not a coverage status); R-OUTSIDE a file outside WALK_ROOTS is not judged: test helpers and fixtures (they plant rf
 * envelopes), the dependency tree, the ignored build, plan and coverage outputs, dot directories and the repository root's own files;
 * R-SPELLING a member rendered with spaces or hyphens is not the member (A1 spelled, "Replayable exact"); R-PARAPHRASE a
 * verified-replay, byte-exactness or no-context claim worded outside its family is not matched (B3, C2 and D2 paraphrase).
 * FOLLOW-UP (wb-15hl, R694 from landing 291, gate cmd_325acc1f0c97): the gate's A1 trigger escapes are read (P01 a regular
 * expression literal, P02 an upper-case literal, P03 argv through named constants, P04 an interleaved flag, P05 an rf assembly call
 * in a qa shell script), the B3, C2 and D2 wording escapes are matched (P10a-d, P11a-b, P12a-b), the walk-root hollow reds through
 * the tree anchor (G03), the records case is read from the judged set (G10), the families' breadth is pinned (F5) and row C's
 * label states C2's scope (F6).
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, qa, examples, docs, the repository's
 * top-level directories, the captured registry and the bead export are only read.
 */
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type InspectorModel, initialInspectorState, layoutInspector } from "../src/ui/workflow-inspector.js";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { type NativeSnapshot, ObservationProjection } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { sanitizeWorkbenchJson } from "../src/workbench/redaction.js";
import { fullShapeRf, RF_FIXTURE_OPERATION_ID, RF_FIXTURE_WORKSPACE_ID } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER_FILE = "test/fixtures/rf-read-status-upgrade-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-hs2j.8";
const CAPTURE = "test/fixtures/rf-version-leaves.json";
/** The Pi code paths judged: product sources, QA scripts and shipped examples (every file below them, at any depth). */
const WALK_ROOTS = ["src", "qa", "examples"];
/** The top-level directories the walk leaves out (R-OUTSIDE): tests (their helpers and fixtures plant rf envelopes), the dependency
 * tree and the outputs .gitignore ignores (build, dist and plan, coverage). Every other top-level directory holding a module (dot
 * directories aside) must be a walk root: the repository tree, read beside the walk, is the anchor. */
const OUTSIDE_ROOTS = ["build", "coverage", "dist", "node_modules", "plan", "test"];
/** The documentation tree C2 also reads as text: a docs table could map the five labels before any module reads one. */
const DOC_ROOT = "docs";
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** Each floor sits below the count measured at base bf06b20 (src 115, qa 62 and examples 6 modules; docs 70 files); texts below
 * the 6 non-module files of the walk roots measured at f8e3a48 (4 qa shell scripts, 1 qa receipt JSON, 1 examples markdown). */
const FLOORS: Readonly<Record<string, number>> = { src: 100, qa: 55, examples: 5, docs: 60, texts: 5 };
/** The module the walk must reach holding the render command literal: the one rf launch. */
const ANCHOR = { path: "src/workbench/providers/reactivefiber.ts", token: "context.render" };
/** The non-module file the walk must reach, read as text, holding its token: the shell script the gate's workbench-shell step runs. */
const TEXT_ANCHOR = { path: "qa/workbench/smoke.sh", token: "node qa/workbench/smoke.mjs" };
/** The vocabulary and the five labels are matched without regard to case: a SCREAMING_SNAKE or PascalCase spelling is the member. */
const VOCABULARY_FLAGS = "i";
/** The subverbs the program's command table names under `assembly` (02:72-80); the measured rf serves no assembly leaf. */
const ASSEMBLY_SUBVERBS = ["prepare", "inspect", "publish", "coverage"];
/** The group then a subverb, dotted or spaced, with any flags (and their values) between them: `assembly --json coverage`. */
const ASSEMBLY_VERB = /\bassembly(?:\s+--?[\w-]+(?:=\S+|\s+(?!-)\S+)?)*(?:\s+|\.)(?:prepare|inspect|publish|coverage)\b/i;
/** A literal claiming a replay was verified (acceptance (a)), and the identifier spellings of one: "replay verified", "replayed and
 * verified", "replay: verified", "verified by replay", isReplayVerified. */
const VERIFIED_REPLAY = /\breplay(?:ability|ed)?[\s_:-]*(?:is\s+|was\s+|and\s+)?verified\b|\bverified[\s_-]*(?:by[\s_-]+)?replay|\breplay[\s_-]*verification\b/i;
const VERIFIED_REPLAY_IDENTIFIER = /^(?:is|has|was)?_?(?:replay(?:ed)?_?(?:and_?)?verified|verified_?(?:by_?)?replay|replay_?verification)$/i;
/** A literal stating byte-exactness (acceptance (b): only document_exact may, once it ships): byte-exact, byte-for-byte, bit-exact. */
const BYTE_EXACT = /\bbyte[\s_-]*exact\b|\bbytewise[\s_-]+exact\b|\bbyte[\s_-]*for[\s_-]*byte\b|\bbit[\s_-]*(?:exact|for[\s_-]*bit)\b/i;
/** A literal stating that no context was needed (acceptance (c)'s forbidden reading), "no extra context needed" and "context: none
 * needed" among them. */
const NO_CONTEXT =
  /\bno\s+(?:more\s+|further\s+|additional\s+|extra\s+|other\s+)?context\s+(?:is\s+|was\s+)?(?:needed|required|necessary)\b|\bcontext\s+(?:is\s+|was\s+)?(?:not\s+|un)(?:needed|required|necessary)\b|\bcontext[\s:_-]+none[\s_-]+(?:needed|required|necessary)\b|\bneeds?\s+no\s+(?:more\s+)?context\b|\bnothing\s+(?:more\s+|else\s+)?(?:is\s+|was\s+)?(?:needed|required)\b|\bno[\s_-]+context[\s_-]+needed\b/i;
/** The words a projected string would need to state a verified or an exact replay. */
const VERIFICATION = /\bverif(?:y|ied|ication)\b|\bbyte[\s_-]*exact\b|\breproduced\b|\bdocument_exact\b/i;
/** The inspector's one no-results line (src/ui/workflow-inspector.ts) and the coverage word of its details line. */
const EMPTY_PAGE_LINE = "No source observations for this invocation; no graph or timeline is inferred.";
const COVERAGE_UNKNOWN = "coverage unknown";
const RESIDUAL_FAMILIES = ["R-COMPOSED", "R-COMMENT", "R-GENERIC-WORD", "R-LABEL-UNRENDERED", "R-ROWS-SILENT", "R-OUTSIDE", "R-SPELLING", "R-PARAPHRASE"];
/** The fixture workspace every planted reading names, and the invocation the inspector pages. */
const ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const INVOCATION = "inv-hs2j8";
const HOST: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "user:fixture" },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
  invocationId: INVOCATION,
};
const RENDER_ID = `rfr_${"b".repeat(26)}`;
const EMPTY_DIGEST = "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(trigger, absent today) Pi reads no replay or coverage fields today: no file of src, qa or examples spells an rf read-side replay field, a replayability class, a replay outcome or an rf assembly verb, and every Pi rf reader refuses the producer's show, history and replay status envelopes",
    pins: ["A1", "A2"],
  },
  {
    id: "B",
    label: "(a) Pi projections of show/history replay fields render the producer's label as claimed, never verified, absent an executed replay receipt (a replayable_exact read then a failed replay is claimed true / verified false): a claim rides the readings verbatim, never changes a projection or states a domainStatus, no module states a verified replay, and the replayed observation flag only demotes",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(b) when the five labels ship, Pi carries the label verbatim and treats only document_exact as byte-exact: the five-label classifier is unshipped at the measured rf, no file of src, qa or examples and no doc spells a label, no file of src, qa or examples states byte-exactness (docs are not judged for it), and a label-carrying preview rides verbatim and projects as a label-free one",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label: "(c) a Pi coverage consumer renders empty results as no-results-observed-under-scope, never no-context-needed, absent a completeness certificate: assembly coverage is unshipped and design only, and no module, projection or inspector line states that no context was needed",
    pins: ["D1", "D2"],
  },
  {
    id: "E",
    label: "(d) coverage unknown and no results map to distinct Pi statuses: a refused render reads coverage unknown in a failure tone, an empty-results render reads neither, and the inspector keeps coverage unknown apart from its no-results line",
    pins: ["E1", "E2"],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Producer {
  readonly rfVersion: string;
  readonly rfCommit: string;
  readonly descendsFromPin: boolean;
  readonly programPin: { readonly repo: string; readonly sha: string };
  readonly contextLeaves: readonly string[];
  readonly assemblyLeaves: readonly string[];
  readonly fields: Readonly<Record<string, readonly string[]>>;
  readonly defsNames: readonly string[];
  readonly classesShow: readonly string[];
  readonly classesHistory: readonly string[];
  readonly replayOutcomes: readonly string[];
  readonly schemaDigests: Readonly<Record<string, string>>;
  readonly fiveLabelInstalledFiles: Readonly<Record<string, number>>;
  readonly program: Readonly<Record<string, Readonly<Record<string, string>>>>;
}
interface Roster {
  readonly bead: string;
  readonly statement: string;
  readonly quote: string;
  readonly citation: string;
  readonly mergedQuote: string;
  readonly mergedCitation: string;
  readonly authority: string;
  readonly gating: string;
  readonly producer: Producer;
  readonly scan: JsonValue;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function str(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function strs(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function rec(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return value;
}
function mapOf<T>(value: unknown, field: string, item: (entry: unknown, name: string) => T): Record<string, T> {
  return Object.fromEntries(Object.entries(rec(value, field)).map(([key, entry]) => [key, item(entry, `${field}.${key}`)]));
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw = rec(JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")), "root");
  const producer = rec(raw.producer, "producer");
  const pin = rec(producer.programPin, "producer.programPin");
  if (typeof producer.descendsFromPin !== "boolean") throw new Error("roster producer.descendsFromPin must be a boolean");
  if (!Array.isArray(raw.rows)) throw new Error("roster rows must be a list");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    const pins = row.pins.map((entry: unknown, at: number): RosterPin => {
      if (!isObject(entry) || typeof entry.id !== "string" || !Object.hasOwn(entry, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: entry.id, witness: json(entry.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    bead: str(raw.bead, "bead"),
    statement: str(raw.statement, "statement"),
    quote: str(raw.quote, "quote"),
    citation: str(raw.citation, "citation"),
    mergedQuote: str(raw.mergedQuote, "mergedQuote"),
    mergedCitation: str(raw.mergedCitation, "mergedCitation"),
    authority: str(raw.authority, "authority"),
    gating: str(raw.gating, "gating"),
    producer: {
      rfVersion: str(producer.rfVersion, "producer.rfVersion"),
      rfCommit: str(producer.rfCommit, "producer.rfCommit"),
      descendsFromPin: producer.descendsFromPin,
      programPin: { repo: str(pin.repo, "producer.programPin.repo"), sha: str(pin.sha, "producer.programPin.sha") },
      contextLeaves: strs(producer.contextLeaves, "producer.contextLeaves"),
      assemblyLeaves: strs(producer.assemblyLeaves, "producer.assemblyLeaves"),
      fields: mapOf(producer.fields, "producer.fields", strs),
      defsNames: strs(producer.defsNames, "producer.defsNames"),
      classesShow: strs(producer.classesShow, "producer.classesShow"),
      classesHistory: strs(producer.classesHistory, "producer.classesHistory"),
      replayOutcomes: strs(producer.replayOutcomes, "producer.replayOutcomes"),
      schemaDigests: mapOf(producer.schemaDigests, "producer.schemaDigests", str),
      fiveLabelInstalledFiles: mapOf(producer.fiveLabelInstalledFiles, "producer.fiveLabelInstalledFiles", (entry, name) => {
        if (typeof entry !== "number" || !Number.isSafeInteger(entry)) throw new Error(`roster ${name} must be an integer`);
        return entry;
      }),
      program: mapOf(producer.program, "producer.program", (entry, name) => mapOf(entry, name, str)),
    },
    scan: json(raw.scan),
    residuals: strs(raw.residuals, "residuals"),
    rows,
    tests: strs(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();
const PRODUCER = ROSTER.producer;
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

const camel = (word: string): string => word.replace(/_([a-z0-9])/g, (_match, next: string) => next.toUpperCase());
/** The five labeled outcomes the program offers (02:60): the backticked words before its byte-exact sentence. */
function labelsOf(line: string): string[] {
  const offered = /Offer multiple labeled outcomes: (.+?)\. Only the first is byte-exact\./.exec(line)?.[1] ?? "";
  return [...offered.matchAll(/`([a-z_]+)`/g)].map(match => match[1] ?? "");
}
/** The measured read-side names: every replayability property and $defs name of the measured schemas, the classes and the outcomes. */
const READ_FIELDS = [...new Set(Object.values(PRODUCER.fields).flat())].sort();
const CLASSES = [...PRODUCER.classesShow];
/** A one-word outcome is a common English word (R-GENERIC-WORD): it is read in projected strings only. */
const OUTCOMES = PRODUCER.replayOutcomes.filter(word => word.includes("_"));
const GENERIC_OUTCOMES = PRODUCER.replayOutcomes.filter(word => !word.includes("_"));
const SNAKE = [...READ_FIELDS, ...PRODUCER.defsNames, ...CLASSES, ...OUTCOMES];
const VOCABULARY = [...new Set([...SNAKE, ...SNAKE.map(camel)])];
const FIVE_LABELS = labelsOf(PRODUCER.program["02"]?.["60"] ?? "");
const FIVE_LABEL_SPELLINGS = [...new Set([...FIVE_LABELS, ...FIVE_LABELS.map(camel)])];

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The owner filing's row in the tracked bead export, found by id on a line that parses. */
function readBeadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
}
/** The filing's acceptance clauses: its first "Acceptance: " line, split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  const line = notes.split("\n").find(entry => entry.startsWith("Acceptance: "));
  if (line === undefined) throw new Error(`${BEAD} notes carry no Acceptance line`);
  return line
    .slice("Acceptance: ".length)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}
/** The captured rf registry: its build and every leaf path. */
function readCapture(): { rfVersion: string; leaves: string[] } {
  const raw = rec(JSON.parse(readFileSync(join(REPO, CAPTURE), "utf8")), "capture");
  const result = rec(rec(raw.envelope, "capture.envelope").result, "capture.envelope.result");
  if (!Array.isArray(result.leaves)) throw new Error("capture leaves must be a list");
  return { rfVersion: str(raw.rfVersion, "capture.rfVersion"), leaves: result.leaves.map((leaf: unknown) => str(rec(leaf, "capture leaf").path, "capture leaf path")) };
}

const posix = (path: string): string => path.split(sep).join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** Every regular file below a root, repository-relative with "/" separators, in name order; symlinks are never followed. */
function filesBelow(root: string): string[] {
  const files: string[] = [];
  const visit = (directory: string): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(posix(relative(REPO, path)));
    }
  };
  visit(join(REPO, root));
  return files;
}

function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  if (extension === ".jsx") return ts.ScriptKind.JSX;
  return ts.ScriptKind.JS;
}
/** A module's `const NAME = <initializer>` declarations, at any depth, by name. */
type Bindings = ReadonlyMap<string, readonly ts.Expression[]>;
function constBindings(source: ts.SourceFile): Bindings {
  const found = new Map<string, ts.Expression[]>();
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && ts.isVariableDeclarationList(node.parent) &&
      (node.parent.flags & ts.NodeFlags.Const) !== 0) found.set(node.name.text, [...(found.get(node.name.text) ?? []), node.initializer]);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** A string literal, a parenthesized, `as` or `satisfies` one, a `+` concatenation or a template of foldable parts, or an identifier
 * every const declaration of this module binds to one foldable value (a name bound to two values folds to none). */
function fold(node: ts.Node, bindings: Bindings, seen: ReadonlySet<string> = new Set()): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return fold(node.expression, bindings, seen);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = fold(node.left, bindings, seen);
    const right = fold(node.right, bindings, seen);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let text = node.head.text;
    for (const span of node.templateSpans) {
      const part = fold(span.expression, bindings, seen);
      if (part === undefined) return undefined;
      text += part + span.literal.text;
    }
    return text;
  }
  if (ts.isIdentifier(node) && !seen.has(node.text)) {
    const values = new Set((bindings.get(node.text) ?? []).map(initializer => fold(initializer, bindings, new Set([...seen, node.text]))));
    return values.size === 1 ? [...values][0] : undefined;
  }
  return undefined;
}
/** A regular expression literal's pattern with every escape sequence and syntax character blanked, so the words it names read as
 * whole words: /"replayability"\s*:/ reads `"replayability"  :`. */
const patternWords = (text: string): string => text.slice(1, text.lastIndexOf("/")).replace(/\\./g, " ").replace(/[\^$.|?*+()[\]{}]/g, " ");

interface Reading {
  readonly identifiers: readonly string[];
  readonly literals: readonly string[];
  readonly argvs: readonly (readonly (string | null)[])[];
}
/** One module as the compiler reads it: every identifier, every literal text (string, template parts joined, regular expression
 * pattern words, folded `+` chains and templates, through the module's const string bindings) and every array literal as its word
 * list (an element folded the same way, null when it does not fold). Comments are not nodes, so not read. */
function readSource(fileName: string, text: string): Reading {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, scriptKindOf(fileName));
  const bindings = constBindings(source);
  const identifiers: string[] = [];
  const literals: string[] = [];
  const argvs: (string | null)[][] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) identifiers.push(node.text);
    else if (ts.isPrivateIdentifier(node)) identifiers.push(node.text.slice(1));
    else if (ts.isStringLiteralLike(node)) literals.push(node.text);
    else if (ts.isRegularExpressionLiteral(node)) literals.push(patternWords(node.text));
    else if (ts.isTemplateExpression(node)) literals.push([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" "));
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) || ts.isTemplateExpression(node)) {
      const folded = fold(node, bindings);
      if (folded !== undefined) literals.push(folded);
    }
    if (ts.isArrayLiteralExpression(node)) argvs.push(node.elements.map(element => fold(element, bindings) ?? null));
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { identifiers, literals, argvs };
}

interface Tree {
  readonly modules: readonly (readonly [string, Reading])[];
  /** Every non-module file below WALK_ROOTS, each one text reading. */
  readonly texts: readonly (readonly [string, Reading])[];
  /** What every walking pin judges: the modules, then the texts. */
  readonly judged: readonly (readonly [string, Reading])[];
  readonly docs: readonly (readonly [string, string])[];
  readonly counts: Readonly<Record<string, number>>;
  readonly floorsMet: boolean;
  readonly anchorRead: boolean;
  readonly textAnchorRead: boolean;
  /** The top-level directories holding a module that are neither walked nor named outside: none, unless the walk lost a root. */
  readonly unjudged: readonly string[];
}
/** A non-module file as one text: its whole content is one literal, comments included (a shell script or a JSON file has no
 * compiler reading, so every word of it is read). */
const readText = (text: string): Reading => ({ identifiers: [], literals: [text], argvs: [] });
/** Every top-level directory of the repository (dot directories aside) that holds a module and is neither a walk root nor named in
 * OUTSIDE_ROOTS, by name: the repository tree, not a literal of this file or the roster, says which directories hold modules. */
function unjudgedRoots(): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(REPO, { withFileTypes: true });
  } catch {
    return ["<the repository root is unreadable>"];
  }
  return entries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith(".") && !WALK_ROOTS.includes(entry.name) && !OUTSIDE_ROOTS.includes(entry.name))
    .map(entry => entry.name)
    .filter(name => filesBelow(name).some(path => MODULE_EXTENSIONS.includes(extensionOf(path))))
    .sort();
}
let walked: Tree | undefined;
/** THE WALK, taken once: every module below WALK_ROOTS read by the compiler, and every docs file read as text. */
function liveTree(): Tree {
  if (walked !== undefined) return walked;
  const counts: Record<string, number> = {};
  const modules: (readonly [string, Reading])[] = [];
  const texts: (readonly [string, Reading])[] = [];
  for (const root of WALK_ROOTS) {
    const files = filesBelow(root);
    const paths = files.filter(path => MODULE_EXTENSIONS.includes(extensionOf(path)));
    counts[root] = paths.length;
    for (const path of paths) modules.push([path, readSource(path, textOf(join(REPO, path)))]);
    for (const path of files.filter(file => !MODULE_EXTENSIONS.includes(extensionOf(file)))) texts.push([path, readText(textOf(join(REPO, path)))]);
  }
  counts.texts = texts.length;
  const docs = filesBelow(DOC_ROOT).map(path => [path, textOf(join(REPO, path))] as const);
  counts[DOC_ROOT] = docs.length;
  const anchor = modules.find(([path]) => path === ANCHOR.path)?.[1];
  const textAnchor = texts.find(([path]) => path === TEXT_ANCHOR.path)?.[1];
  walked = {
    modules,
    texts,
    judged: [...modules, ...texts],
    docs,
    counts,
    floorsMet: Object.entries(FLOORS).every(([root, floor]) => (counts[root] ?? 0) >= floor),
    anchorRead: anchor?.literals.includes(ANCHOR.token) === true,
    textAnchorRead: textAnchor?.literals.some(text => text.includes(TEXT_ANCHOR.token)) === true,
    unjudged: unjudgedRoots(),
  };
  return walked;
}

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordOf = (members: readonly string[], flags = ""): RegExp => new RegExp(`(?<![A-Za-z0-9_])(?:${members.map(escapeRegExp).join("|")})(?![A-Za-z0-9_])`, flags);
const unique = (items: readonly string[]): string[] => [...new Set(items)];
/** Every identifier equal to a member and every literal holding one as a whole word, case aside (VOCABULARY_FLAGS). */
function vocabularyHits(path: string, reading: Reading, members: readonly string[]): string[] {
  const set = new Set(members.map(member => member.toLowerCase()));
  const word = wordOf(members, VOCABULARY_FLAGS);
  return unique([
    ...reading.identifiers.filter(name => set.has(name.toLowerCase())).map(name => `${path} identifier ${name}`),
    ...reading.literals.filter(text => word.test(text)).map(text => `${path} literal ${text.slice(0, 80)}`),
  ]);
}
/** Every literal a family matches, and every identifier its identifier form matches. */
function familyHits(path: string, reading: Reading, family: RegExp, identifierFamily?: RegExp): string[] {
  return unique([
    ...(identifierFamily === undefined ? [] : reading.identifiers.filter(name => identifierFamily.test(name)).map(name => `${path} identifier ${name}`)),
    ...reading.literals.filter(text => family.test(text)).map(text => `${path} literal ${text.slice(0, 80)}`),
  ]);
}
/** An rf assembly verb: an argv word list with "assembly" before one of its subverbs (flags and expressions between them aside), or
 * a literal spelling one. */
function assemblyHits(path: string, reading: Reading): string[] {
  const argv = reading.argvs.filter(words => words.some((word, index) => word === "assembly" && words.slice(index + 1).some(later => later !== null && ASSEMBLY_SUBVERBS.includes(later))));
  return unique([
    ...argv.map(words => `${path} argv [${words.map(word => word ?? "<expr>").join(", ")}]`),
    ...reading.literals.filter(text => ASSEMBLY_VERB.test(text)).map(text => `${path} literal ${text.slice(0, 80)}`),
  ]);
}

/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
const equalJson = (left: unknown, right: unknown): boolean => JSON.stringify(left) === JSON.stringify(right);

interface Envelope {
  schema: string;
  ok: boolean;
  command: string;
  operation_id: string;
  workspace: { id: string; root: string };
  transaction_id: null;
  result: JsonValue;
  diagnostics: JsonValue[];
}
/** A constructed envelope in the strict shape the injected reader returns, refused by name when a field is off. */
function envelopeOf(value: JsonObject): Envelope {
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = value;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") throw new Error("an envelope needs a schema, ok, command and operation_id");
  const space = objectOf(workspace, "envelope workspace");
  if (typeof space.id !== "string" || typeof space.root !== "string") throw new Error("an envelope workspace needs an id and a root");
  if (transactionId !== null || result === undefined || !Array.isArray(diagnostics)) throw new Error("an envelope needs a null transaction, a result and diagnostics");
  return { schema, ok, command, operation_id: operationId, workspace: { id: space.id, root: space.root }, transaction_id: null, result, diagnostics };
}
/** A strict eight-key read envelope of another context leaf, carrying the producer's status fields. */
function readEnvelope(command: string, result: JsonObject): JsonObject {
  return {
    schema: "reactive-fiber.cli/v1", ok: true, command, operation_id: RF_FIXTURE_OPERATION_ID,
    workspace: { id: RF_FIXTURE_WORKSPACE_ID, root: ROOT }, transaction_id: null, result, diagnostics: [],
  };
}
const SHOW = readEnvelope("context.show", { render_id: RENDER_ID, replayability: "replayable_exact", replayability_reasons: [], replayability_overlay: null });
const HISTORY = readEnvelope("context.history", { items: [{ render_id: RENDER_ID, replayability: "replayable_exact", replayability_reasons: [] }] });
const REPLAY = readEnvelope("context.replay", { render_id: RENDER_ID, outcome: "reproduced" });
const READ_ENVELOPES: readonly (readonly [string, JsonObject])[] = [["show", SHOW], ["history", HISTORY], ["replay", REPLAY]];
/** The 02:60 replay failure, RF_INTERNAL, placed on a context.render failure envelope (the render plane never emits a replay). */
const REFUSAL: JsonObject = {
  schema: "reactive-fiber.cli/v1", ok: false, command: "context.render", operation_id: RF_FIXTURE_OPERATION_ID, workspace: null,
  transaction_id: null, result: null,
  diagnostics: [{ code: "RF_INTERNAL", severity: "error", message: "internal error", hint: null, source: null, metadata: {} }],
};

function resultOf(envelope: JsonObject): JsonObject {
  return objectOf(envelope.result, "envelope result");
}
/** A preview carrying the producer's read-side claim on additive result keys, as a read schema states it. */
function claimed(label: string, base: JsonObject = fullShapeRf(ROOT)): JsonObject {
  return { ...base, result: { ...resultOf(base), replayability: label, replayability_reasons: [] } };
}
/** The full-shape preview demoted by a reported error: partial before any claim. */
function demoted(): JsonObject {
  const base = fullShapeRf(ROOT);
  return { ...base, result: { ...resultOf(base), diagnostics_summary: { errors: 1, warnings: 0, has_errors: true, has_warnings: false } } };
}
/** A render that ran and found nothing: an empty document, no block, no component and no decision. */
function emptyResults(): JsonObject {
  const base = fullShapeRf(ROOT);
  const result = resultOf(base);
  return { ...base, result: { ...result, output: { ...objectOf(result.output, "output"), text: "", size_bytes: 0, digest: EMPTY_DIGEST }, blocks: [], components: [], necessity: [] } };
}
function withObservations(rows: readonly JsonObject[]): JsonObject {
  const base = fullShapeRf(ROOT);
  return { ...base, result: { ...resultOf(base), observations: [...rows] } };
}
function withoutObservations(): JsonObject {
  const base = fullShapeRf(ROOT);
  const { observations: _dropped, ...result } = resultOf(base);
  return { ...base, result };
}
/** One observation row stating the four fields the readers read. */
const observationRow = (status: string, replayed: boolean): JsonObject => ({ status, freshness: replayed ? "reused" : "captured_at_render", replayed });

function readingOf(source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source };
}
function project(source: JsonValue): ReactiveFiberProjectionTopology {
  return reactivefiberTopology(readingOf(source), HOST);
}
function evidenceOf(source: JsonValue): JsonObject {
  return objectOf(json(nativeEvidence(PREVIEW_ID, readingOf(source))), "native evidence");
}
function refusalOf(run: () => unknown): { category: string; message: string } {
  try {
    run();
  } catch (error) {
    if (error instanceof CapabilityError) return { category: error.category, message: error.message };
    throw error;
  }
  throw new Error("expected a CapabilityError refusal");
}
/** The inspector's lines for one invocation holding `snapshots`, in one view, wide enough that no line is cut. */
function inspectorLines(snapshots: readonly NativeSnapshot[], view: "overview" | "details"): string[] {
  const projection = new ObservationProjection();
  for (const snapshot of snapshots) expect(projection.refresh(snapshot)).toBe("applied");
  const model: InspectorModel = { projection, scope: HOST.scope, invocationId: INVOCATION, title: "rf read status", status: "done" };
  return layoutInspector(model, { ...initialInspectorState(), view }, { width: 200, rows: 60, ascii: true });
}
/** NativeSnapshot's coverage members as src/workbench/observation.ts declares them, read by the compiler. */
function coverageVocabulary(): string[] {
  const path = "src/workbench/observation.ts";
  const source = ts.createSourceFile(path, textOf(join(REPO, path)), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const words: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === "NativeSnapshot") {
      for (const member of node.members) {
        if (!ts.isPropertySignature(member) || !ts.isIdentifier(member.name) || member.name.text !== "coverage" || member.type === undefined) continue;
        if (!ts.isUnionTypeNode(member.type)) continue;
        for (const part of member.type.types) if (ts.isLiteralTypeNode(part) && ts.isStringLiteral(part.literal)) words.push(part.literal.text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return words;
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  if (oldPath === undefined) delete process.env.PATH;
  else process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `answer` and exits `exit`. */
function standInRf(answer: JsonValue, exit: number): string {
  const folder = makeScratch("rf-read-status-upgrade-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(answer))});`,
      `process.exit(${exit});`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
const spawnsOf = (log: string): number => textOf(log).split("\n").filter(Boolean).length;
const invocationContext = (): { grants: string[]; signal: AbortSignal } => ({ grants: [...GRANTS], signal: new AbortController().signal });
interface NativeOutcome {
  readonly refusal: { category: string; message: string } | null;
  readonly reading: JsonValue | null;
  readonly spawns: number;
}
/** One registry invocation of the NATIVE preview against a stand-in rf answering `answer`. */
async function nativeOutcome(answer: JsonValue, exit: number): Promise<NativeOutcome> {
  const log = standInRf(answer, exit);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  try {
    const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
    return { refusal: null, reading, spawns: spawnsOf(log) };
  } catch (error) {
    if (!(error instanceof CapabilityError)) throw error;
    return { refusal: { category: error.category, message: error.message }, reading: null, spawns: spawnsOf(log) };
  }
}
/** One registry invocation of the INJECTED preview whose reader answers `envelope`. */
async function injectedReading(envelope: JsonObject): Promise<{ reading: JsonValue; calls: number }> {
  let calls = 0;
  const typed = envelopeOf(envelope);
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(
    registry,
    async () => {
      calls += 1;
      return typed;
    },
    ROOT,
  );
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  return { reading, calls };
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): JsonValue {
  REACHED.push(pin);
  return { pin, ...witness };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue | Promise<JsonValue>>> = {
  A1: () => {
    const live = liveTree();
    const vocabulary = live.judged.flatMap(([path, reading]) => vocabularyHits(path, reading, VOCABULARY));
    const assembly = live.judged.flatMap(([path, reading]) => assemblyHits(path, reading));
    expect(live.floorsMet, `files walked per root: ${JSON.stringify(live.counts)}`).toBe(true);
    expect(live.anchorRead, `${ANCHOR.path} was not read with ${ANCHOR.token}`).toBe(true);
    expect(live.textAnchorRead, `${TEXT_ANCHOR.path} was not read as text with ${TEXT_ANCHOR.token}`).toBe(true);
    expect(live.unjudged, "a top-level directory holding a module is neither a walk root nor named outside").toEqual([]);
    expect({ vocabulary, assembly }, "an rf read-side replay field, class or outcome, or an rf assembly verb, in a Pi file").toStrictEqual({ vocabulary: [], assembly: [] });
    const count = (reading: Reading): number => vocabularyHits("control.ts", reading, VOCABULARY).length + assemblyHits("control.ts", reading).length;
    const control = (text: string): number => count(readSource("control.ts", text));
    const controls = {
      property: control("const claim = result.replayability;"),
      binding: control("const { replayability_reasons: reasons } = row;"),
      camelCase: control("const replayabilityOverlay = null;"),
      classLiteral: control('const exact = "replayable_exact";'),
      elementAccess: control('const overlay = result["replayability_overlay"];'),
      outcome: control('const outcome = "reproduced_with_declared_variance";'),
      assemblyArgv: control('spawn("rf", ["--workspace", root, "assembly", "coverage", "--json"]);'),
      assemblyDotted: control('const verb = "assembly.coverage";'),
      journalWord: control('const note = "the replayable prefix ends here";'),
      genericOutcome: control(`const word = "${GENERIC_OUTCOMES[0] ?? ""}";`),
      composed: control('const key = "replay" + suffix;'),
      comment: control("// result.replayability is the producer's claim\nconst x = 1;"),
      regexLiteral: control('const pattern = /"replayability"\\s*:\\s*"([a-z_]+)"/;'),
      upperCase: control('const exact = "REPLAYABLE_EXACT";'),
      pascalType: control("type ReplayabilityClass = string;"),
      namedConstants: control('const GROUP = "assembly";\nconst VERB = "coverage";\nspawn("rf", ["--workspace", root, GROUP, VERB, "--json"]);'),
      constantTemplate: control(`const GROUP = "assembly";\nconst line = \`rf \${GROUP} coverage\`;`),
      interleavedFlag: control('spawn("rf", ["--workspace", root, "assembly", "--json", "coverage"]);'),
      interleavedLiteral: control('const command = "rf assembly --json coverage";'),
      shellScript: count(readText('rf --workspace "$PWD" assembly coverage --json >/dev/null || true\n')),
      importedConstant: control('import { VERB } from "./verbs.js";\nspawn("rf", ["assembly", VERB]);'),
      spelled: control('const label = "Replayable exact";'),
    };
    return done("A1", { floorsMet: live.floorsMet, anchorRead: live.anchorRead, textAnchorRead: live.textAnchorRead, unjudged: [...live.unjudged], hits: { vocabulary, assembly }, controls });
  },
  A2: async () => {
    const envelopes: JsonObject = {};
    for (const [name, envelope] of READ_ENVELOPES) {
      const adapter = refusalOf(() => project(envelope));
      const evidenceKeys = Object.keys(evidenceOf(envelope));
      const native = await nativeOutcome(envelope, 0);
      expect(adapter.category, `${name}: the adapter refuses the envelope`).toBe("validation");
      expect(evidenceKeys, `${name}: no native evidence`).toEqual([]);
      expect(native.reading, `${name}: no native reading`).toBeNull();
      expect(native.refusal?.category).toBe("transport");
      expect(native.spawns).toBe(1);
      envelopes[name] = { command: String(envelope.command), adapter, evidenceKeys, native: { refusal: native.refusal, spawns: native.spawns } };
    }
    return done("A2", { envelopes });
  },
  B1: async () => {
    const injected: JsonObject = {};
    for (const label of CLASSES) {
      const envelope = claimed(label);
      const { reading, calls } = await injectedReading(envelope);
      const source = objectOf(objectOf(reading, "reading").source, "reading source");
      const bytes = JSON.stringify(source) === JSON.stringify(envelope);
      const shown = JSON.stringify(sanitizeWorkbenchJson(reading)) === JSON.stringify(reading);
      const echoed = resultOf(source).replayability ?? null;
      expect(bytes, `${label}: the registered reading is the envelope byte for byte`).toBe(true);
      expect(shown, `${label}: the shared display form keeps the reading byte for byte`).toBe(true);
      expect(echoed).toBe(label);
      expect(calls).toBe(1);
      injected[label] = { bytes, shown, echoed, calls };
    }
    const label = CLASSES[0] ?? "";
    const envelope = claimed(label);
    const native = await nativeOutcome(envelope, 0);
    const nativeBytes = native.reading !== null && JSON.stringify(objectOf(native.reading, "native reading").source) === JSON.stringify(envelope);
    expect(native.refusal).toBeNull();
    expect(nativeBytes, `${label}: the native reading is the printed envelope byte for byte`).toBe(true);
    expect(native.spawns).toBe(1);
    return done("B1", { classes: [...CLASSES], injected, native: { label, bytes: nativeBytes, spawns: native.spawns } });
  },
  B2: () => {
    const bases: readonly (readonly [string, JsonObject])[] = [["clean", fullShapeRf(ROOT)], ["demoted", demoted()]];
    const projections: JsonObject = {};
    for (const [name, base] of bases) {
      const plain = project(base);
      const identical = CLASSES.map(label => equalJson(project(claimed(label, base)), plain));
      expect(identical, `${name}: a claim-carrying preview projects exactly as the claim-free one`).toEqual(CLASSES.map(() => true));
      projections[name] = { coverage: plain.snapshots[0]?.coverage ?? null, tone: plain.snapshots[0]?.node.statusTone ?? null, identical };
    }
    const plainEvidence = evidenceOf(fullShapeRf(ROOT));
    const claimEvidence = CLASSES.map(label => evidenceOf(claimed(label)));
    const evidenceIdentical = claimEvidence.map(evidence => equalJson(evidence, plainEvidence));
    const domainStatusStated = [plainEvidence, ...claimEvidence].some(evidence => Object.hasOwn(evidence, "domainStatus"));
    const verificationWords = CLASSES.flatMap(label => stringLeaves(json(project(claimed(label)))).filter(text => VERIFICATION.test(text)));
    expect(evidenceIdentical).toEqual(CLASSES.map(() => true));
    expect(domainStatusStated, "an rf reading states no domainStatus, so no rf node reaches a verified verdict").toBe(false);
    expect(verificationWords).toEqual([]);
    // The 02:60 sequence: the replayable_exact read above, then the replay refused with RF_INTERNAL (16/16 attempts).
    const refused = project(REFUSAL);
    const snapshot = refused.snapshots[0];
    const sequence = {
      coverage: snapshot?.coverage ?? null,
      tone: snapshot?.node.statusTone ?? null,
      carriesValue: snapshot === undefined || snapshot.nativePayloadRef !== undefined || snapshot.sourceRevision !== undefined,
      domainStatusStated: Object.hasOwn(evidenceOf(REFUSAL), "domainStatus"),
      verificationWords: stringLeaves(json(refused)).filter(text => VERIFICATION.test(text)),
    };
    expect(sequence).toStrictEqual({ coverage: "unknown", tone: "failure", carriesValue: false, domainStatusStated: false, verificationWords: [] });
    return done("B2", { projections, evidenceIdentical, domainStatusStated, verificationWords, sequence });
  },
  B3: () => {
    const live = liveTree();
    const hits = live.judged.flatMap(([path, reading]) => familyHits(path, reading, VERIFIED_REPLAY, VERIFIED_REPLAY_IDENTIFIER));
    expect(live.floorsMet).toBe(true);
    expect(live.unjudged).toEqual([]);
    expect(hits, "a Pi file stating a verified replay").toEqual([]);
    const control = (text: string): number => familyHits("control.ts", readSource("control.ts", text), VERIFIED_REPLAY, VERIFIED_REPLAY_IDENTIFIER).length;
    const controls = {
      spaced: control('const note = "replay verified";'),
      dashed: control('const note = "replay-verified render";'),
      reversed: control('const note = "a verified replay of the render";'),
      claimVerified: control('const note = "replayability is verified";'),
      identifier: control("const replayVerified = true;"),
      snakeKey: control("const row = { replay_verified: true };"),
      posture: control('const note = "producer-reported and observed, not verified by Workbench";'),
      replayedAndVerified: control('const note = "replayed and verified";'),
      verifiedByReplay: control('const note = "render verified by replay";'),
      colonVerified: control('const note = "replay: verified";'),
      isIdentifier: control("const isReplayVerified = false;"),
      journalNative: control('const note = "journal replay verified against its digest";'),
      paraphrase: control('const note = "the replay checked out";'),
    };
    return done("B3", { floorsMet: live.floorsMet, hits, controls });
  },
  B4: () => {
    const replayed = project(withObservations([observationRow("observed", true), observationRow("null", true)]));
    const fresh = project(withObservations([observationRow("observed", false), observationRow("null", false)]));
    const note = replayed.diagnostics.find(text => text.startsWith("observations: ")) ?? null;
    const outcome = {
      replayed: { coverage: replayed.snapshots[0]?.coverage ?? null, tone: replayed.snapshots[0]?.node.statusTone ?? null, note },
      fresh: { coverage: fresh.snapshots[0]?.coverage ?? null, tone: fresh.snapshots[0]?.node.statusTone ?? null },
      verificationWords: stringLeaves(json(replayed)).filter(text => VERIFICATION.test(text)),
      evidenceIdentical: equalJson(evidenceOf(withObservations([observationRow("observed", true)])), evidenceOf(fullShapeRf(ROOT))),
    };
    expect(outcome.replayed).toStrictEqual({ coverage: "partial", tone: "unknown", note: "observations: 2 rows, 2 reused: partial" });
    expect(outcome.fresh).toStrictEqual({ coverage: "complete", tone: "success" });
    expect(outcome.verificationWords).toEqual([]);
    expect(outcome.evidenceIdentical).toBe(true);
    return done("B4", outcome);
  },
  C1: () => {
    const capture = readCapture();
    const bead = readBeadRow();
    const line60 = PRODUCER.program["02"]?.["60"] ?? "";
    const disjoint = FIVE_LABELS.every(label => !PRODUCER.classesShow.includes(label));
    const installed = FIVE_LABELS.map(label => PRODUCER.fiveLabelInstalledFiles[label] ?? -1);
    const gating = ["61", "62"].map(line => {
      const cells = /^\| `([^`]+)` \| (\w+) \|/.exec(PRODUCER.program.BEADS?.[line] ?? "");
      return { line: Number(line), id: cells?.[1] ?? null, status: cells?.[2] ?? null };
    });
    expect(PRODUCER.classesHistory, "both read schemas carry one class vocabulary").toEqual(PRODUCER.classesShow);
    expect(FIVE_LABELS).toHaveLength(5);
    expect(disjoint, "no offered label is a shipped class").toBe(true);
    expect(installed, "no installed rf file spells an offered label").toEqual(FIVE_LABELS.map(() => 0));
    expect(line60, "02:60 carries the filing's authority restriction").toContain(ROSTER.authority);
    expect(FIVE_LABELS[0], "the first offered label, the one byte-exact outcome").toBe("document_exact");
    expect(gating).toEqual([
      { line: 61, id: "rfc-kxtb5.17", status: "open" },
      { line: 62, id: "rfc-02alo", status: "open" },
    ]);
    expect(bead.notes, "the filing states the roster's gating sentence").toContain(ROSTER.gating);
    expect(ROSTER.gating).toContain("rfc-kxtb5.17 and defect rfc-02alo, open at BEADS-2026-10-21.md:61-62");
    expect(ROSTER.gating.endsWith("Shipped: no for both.")).toBe(true);
    expect(bead.title).toContain("(gated: five-label replay classifier, rfc-kxtb5.17 + rfc-02alo open, unshipped)");
    expect(capture.rfVersion, "the roster and the captured registry measured one build").toBe(PRODUCER.rfVersion);
    return done("C1", {
      classes: [...PRODUCER.classesShow], fiveLabels: FIVE_LABELS, disjoint, installed, byteExact: FIVE_LABELS[0] ?? null, gating,
      shipped: "Shipped: no for both.", captureVersion: capture.rfVersion, descendsFromPin: PRODUCER.descendsFromPin,
    });
  },
  C2: async () => {
    const live = liveTree();
    const word = wordOf(FIVE_LABEL_SPELLINGS, VOCABULARY_FLAGS);
    const labelHits = [
      ...live.judged.flatMap(([path, reading]) => vocabularyHits(path, reading, FIVE_LABEL_SPELLINGS)),
      ...live.docs.filter(([, text]) => word.test(text)).map(([path]) => `${path} text`),
    ];
    const byteExactHits = live.judged.flatMap(([path, reading]) => familyHits(path, reading, BYTE_EXACT));
    expect(live.floorsMet).toBe(true);
    expect(live.unjudged).toEqual([]);
    expect({ labelHits, byteExactHits }, "an offered label or a byte-exactness claim in Pi").toStrictEqual({ labelHits: [], byteExactHits: [] });
    const plain = project(fullShapeRf(ROOT));
    const plainEvidence = evidenceOf(fullShapeRf(ROOT));
    const carried: JsonObject = {};
    for (const label of FIVE_LABELS) {
      const envelope = claimed(label);
      const { reading } = await injectedReading(envelope);
      const outcome = {
        verbatim: JSON.stringify(objectOf(reading, "reading").source) === JSON.stringify(envelope),
        projection: equalJson(project(envelope), plain),
        evidence: equalJson(evidenceOf(envelope), plainEvidence),
      };
      expect(outcome, `${label}: verbatim in the reading, no projection or evidence change`).toStrictEqual({ verbatim: true, projection: true, evidence: true });
      carried[label] = outcome;
    }
    const control = (text: string): number => {
      const reading = readSource("control.ts", text);
      return vocabularyHits("control.ts", reading, FIVE_LABEL_SPELLINGS).length + familyHits("control.ts", reading, BYTE_EXACT).length;
    };
    const controls = {
      labelLiteral: control('const label = "document_exact";'),
      labelCamel: control("const observerEquivalent = 1;"),
      byteExact: control('const note = "byte-exact replay";'),
      byteSpaced: control('const note = "byte exact";'),
      exactBytes: control('const note = "a digest beside it pins its exact bytes";'),
      byteForByte: control('const note = "replay reproduced the document byte-for-byte";'),
      bitExact: control('const note = "bit-exact replay";'),
      labelUpper: control('const label = "DOCUMENT_EXACT";'),
      packagingNote: control('const note = "the tarball is a byte-exact copy of the build";'),
      paraphrase: control('const note = "identical down to the last bit";'),
      docsText: word.test("| `missing_evidence` | a label row |") ? 1 : 0,
    };
    return done("C2", { floorsMet: live.floorsMet, labelHits, byteExactHits, carried, controls });
  },
  D1: () => {
    const capture = readCapture();
    const assemblyLeaves = capture.leaves.filter(path => path.split(".")[0] === "assembly");
    const coverageLeaves = capture.leaves.filter(path => path.includes("coverage"));
    const leafFloorMet = capture.leaves.length >= 70;
    const readme76 = PRODUCER.program.README?.["76"] ?? "";
    const readme99 = PRODUCER.program.README?.["99"] ?? "";
    const row94 = PRODUCER.program.BEADS?.["94"] ?? "";
    expect(capture.rfVersion).toBe(PRODUCER.rfVersion);
    expect(leafFloorMet, `captured leaves: ${capture.leaves.length}`).toBe(true);
    expect({ assemblyLeaves, coverageLeaves, roster: [...PRODUCER.assemblyLeaves] }).toStrictEqual({ assemblyLeaves: [], coverageLeaves: [], roster: [] });
    expect(readme76, "README:76 states the filing's merged quote").toContain(ROSTER.mergedQuote);
    expect(readme99.startsWith("Currently design only.")).toBe(true);
    expect(row94).toContain("`rca-C069` | ReactiveQuerySDK and ReactiveFiberDevTools are design only");
    expect(ROSTER.gating).toContain("'Currently design only' (README.md:99; rca-C069 BEADS:94)");
    return done("D1", { captureVersion: capture.rfVersion, leafFloorMet, assemblyLeaves, coverageLeaves, designOnly: true, mergedQuoteAt: ROSTER.mergedCitation });
  },
  D2: () => {
    const live = liveTree();
    const staticHits = live.judged.flatMap(([path, reading]) => familyHits(path, reading, NO_CONTEXT));
    expect(live.floorsMet).toBe(true);
    expect(live.unjudged).toEqual([]);
    expect(staticHits, "a Pi file stating that no context was needed").toEqual([]);
    const control = (text: string): number => familyHits("control.ts", readSource("control.ts", text), NO_CONTEXT).length;
    const controls = {
      spaced: control('const note = "no context needed";'),
      notRequired: control('const note = "Context not required for this task";'),
      needsNone: control('const note = "the task needs no context";'),
      nothing: control('const note = "nothing more is needed";'),
      snake: control('const status = "no_context_needed";'),
      scopedNoResults: control(`const note = ${JSON.stringify(EMPTY_PAGE_LINE)};`),
      window: control('const note = "no context window was reported";'),
      extraContext: control('const note = "no extra context needed";'),
      colonNone: control('const note = "context: none needed";'),
      wizardHint: control('const hint = "No additional context is required.";'),
      paraphrase: control('const note = "nothing further to fetch";'),
    };
    const empty = project(emptyResults());
    const projected = stringLeaves(json(empty)).filter(text => NO_CONTEXT.test(text));
    const noResults = inspectorLines([], "overview");
    const inspected = [...noResults, ...inspectorLines(empty.snapshots, "overview"), ...inspectorLines(empty.snapshots, "details")].filter(line => NO_CONTEXT.test(line));
    const emptyPage = noResults.some(line => line.includes(EMPTY_PAGE_LINE));
    expect(projected).toEqual([]);
    expect(inspected).toEqual([]);
    expect(emptyPage, "an empty invocation reads the scoped no-results line").toBe(true);
    return done("D2", { floorsMet: live.floorsMet, staticHits, controls, projected, inspected, emptyPageLine: emptyPage ? EMPTY_PAGE_LINE : null });
  },
  E1: () => {
    const vocabulary = coverageVocabulary();
    const refused = project(REFUSAL).snapshots[0];
    const empty = project(emptyResults()).snapshots[0];
    const outcome = {
      vocabulary,
      refused: { coverage: refused?.coverage ?? null, tone: refused?.node.statusTone ?? null },
      empty: { coverageUnknown: empty?.coverage === "unknown", toneFailure: empty?.node.statusTone === "failure" },
      distinct: {
        coverage: refused?.coverage !== empty?.coverage,
        tone: refused?.node.statusTone !== empty?.node.statusTone,
        statusText: refused?.node.statusText !== empty?.node.statusText,
      },
      rowsSilent: equalJson(project(fullShapeRf(ROOT)), project(withoutObservations())),
    };
    expect(outcome).toStrictEqual({
      vocabulary: ["complete", "partial", "unknown"],
      refused: { coverage: "unknown", tone: "failure" },
      empty: { coverageUnknown: false, toneFailure: false },
      distinct: { coverage: true, tone: true, statusText: true },
      rowsSilent: true,
    });
    return done("E1", outcome);
  },
  E2: () => {
    const read = (lines: readonly string[]): JsonObject => ({
      coverageUnknown: lines.some(line => line.includes(COVERAGE_UNKNOWN)),
      emptyPage: lines.some(line => line.includes(EMPTY_PAGE_LINE)),
    });
    const outcome = {
      refused: read(inspectorLines(project(REFUSAL).snapshots, "details")),
      noResults: read([...inspectorLines([], "overview"), ...inspectorLines([], "details")]),
      emptyRender: read(inspectorLines(project(emptyResults()).snapshots, "details")),
    };
    expect(outcome).toStrictEqual({
      refused: { coverageUnknown: true, emptyPage: false },
      noResults: { coverageUnknown: false, emptyPage: true },
      emptyRender: { coverageUnknown: false, emptyPage: false },
    });
    return done("E2", outcome);
  },
};

const pattern = (family: RegExp): string => `${family.source}/${family.flags}`;

describe("wb-hs2j.8 rf read-side status upgrade census (RF-REACTIVE-CONTEXT-ASSEMBLY-R9, posture leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:4", "C:2", "D:2", "E:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(entry => entry.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    // The registered set, read from vitest's task tree beside the records case: collection precedes every case, so a records case
    // deleted, skipped or inverted reds here although it can no longer red itself.
    const registered: { readonly name: string; readonly mode: string; readonly fails: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push({ name: child.name, mode: child.mode, fails: child.fails === true });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    expect(registered.map(entry => entry.name), "every registered test of this file, exactly and in roster order, the records case included").toEqual(ROSTER.tests);
    expect(registered.filter(entry => entry.mode !== "run" || entry.fails).map(entry => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""}`), "every registered test is in run mode and not inverted").toEqual([]);
    expect({
      bead: BEAD,
      scan: {
        walkRoots: WALK_ROOTS, outsideRoots: OUTSIDE_ROOTS, docRoot: DOC_ROOT, moduleExtensions: MODULE_EXTENSIONS, floors: FLOORS, anchor: ANCHOR,
        textAnchor: TEXT_ANCHOR, vocabularyFlags: VOCABULARY_FLAGS,
        assemblySubverbs: ASSEMBLY_SUBVERBS, emptyPageLine: EMPTY_PAGE_LINE, coverageUnknown: COVERAGE_UNKNOWN,
        families: {
          assemblyVerb: pattern(ASSEMBLY_VERB), verifiedReplay: pattern(VERIFIED_REPLAY), verifiedReplayIdentifier: pattern(VERIFIED_REPLAY_IDENTIFIER),
          byteExact: pattern(BYTE_EXACT), noContext: pattern(NO_CONTEXT), verification: pattern(VERIFICATION),
        },
        vocabulary: { readFields: READ_FIELDS, classes: CLASSES, outcomes: OUTCOMES, genericOutcomes: GENERIC_OUTCOMES, spellings: VOCABULARY, fiveLabels: FIVE_LABELS, fiveLabelSpellings: FIVE_LABEL_SPELLINGS },
      },
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^Not P0: (Pi reads no replay or coverage fields today) \(/m.exec(bead.notes)?.[1] ?? "";
    const source = /^Source: ReactiveFiberCLI (\S+) '([^']+)'/m.exec(bead.notes);
    const merged = /Merged \(rca-empty-coverage-never-proves-no-context\) (\S+) '([^']+)'/.exec(bead.notes);
    const authority = /^Authority restrictions: '([^']+)'/m.exec(bead.notes)?.[1] ?? "";
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b), (c) and (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["C"], ["D"], ["E"], ["A"]]);
    expect(bead.notes, "the filing states the roster's statement").toContain(`Full statement (title trimmed to bd's 500-character limit): ${ROSTER.statement}`);
    expect({ citation: source?.[1], quote: source?.[2], mergedCitation: merged?.[1], mergedQuote: merged?.[2], authority }).toStrictEqual({
      citation: ROSTER.citation,
      quote: ROSTER.quote,
      mergedCitation: ROSTER.mergedCitation,
      mergedQuote: ROSTER.mergedQuote,
      authority: ROSTER.authority,
    });
    expect(bead.notes.split("\n").find(line => line.startsWith("Gating artifacts: ")), "the filing's gating line (its first; later notes append below it) is the roster's").toBe(ROSTER.gating);
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${PRODUCER.programPin.sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
    expect(PRODUCER.program["02"]?.["88"] ?? "", "02:88 states the filing's quote").toContain(ROSTER.quote);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order and every pin reached its end", { timeout: 60_000 }, ({ task }) => {
    const walkedTests: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walkedTests.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const titles = walkedTests.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walkedTests.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walkedTests.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walkedTests)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walkedTests.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
