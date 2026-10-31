/**
 * wb-hs2j.5 (RF-REACTIVE-CONTEXT-ASSEMBLY-R6): graph test valid:true is not structural graph validity. Statement (bead notes, full
 * form): "Until rf graph test carries or references the candidate validate structural verdict (gated: validation-consistent
 * candidate receipts, RFCLI rfc-s24ro.1 open, unshipped; today valid:true coexists with a candidate validate
 * RF_COMPONENT_INSTANCE_UNFED warning), no Pi surface shall accept graph test valid:true as structural graph validity without
 * reading graph validate on the same overlay" (ReactiveFiberCLI
 * docs/programs/reactive-context-assembly-2026-10-18/02-swarm-usage-and-command-grammar.md:56@6a251bf73af5). Acceptance (bead
 * notes): "(a) a Pi consumer of graph test output records it as a runtime shadow result distinct from structural validity, and
 * any Pi gate requiring structural validity reads graph validate on the same overlay; (b) a fixture pair (graph test valid:true,
 * graph validate RF_COMPONENT_INSTANCE_UNFED) projects not-structurally-valid, never valid; (c) when rfc-s24ro.1 ships, Pi carries
 * result.validation / result.diagnostics verbatim including RF_COMPONENT_INSTANCE_UNFED." Not P0, per the filing: Pi issues neither
 * verb today, so these pins land before any such gate does.
 *
 * MEASURED (read-only, 2026-10-23, by the cutting seat). At ReactiveFiberCLI 6a251bf73af5: graph.test.schema.json (blob 8e95edd2)
 * requires eight result keys - overlay, valid (const true), checks, shadow, comparisons, published_head_unchanged,
 * effects_authorized, validation_digest - and its validation_digest is "sha256: over the canonical JSON of this result without the
 * digest itself": a self-digest, not a reference to graph validate's verdict, and no result.validation or result.diagnostics
 * exists. graph.validate.schema.json (blob 1f7ac9bf) carries both; application/graph.py:941-997 (unfed_instance_warnings) puts one
 * RF_COMPONENT_INSTANCE_UNFED warning per [[component]] row no [[fiber]] row feeds into result.diagnostics and onto the envelope,
 * beside valid: true. On the installed rf 0.1.832, over a scratch workspace holding one hand-written unfed row: graph validate
 * exits 0 with valid true, runtime_compilable true and that one row in both places, byte-identical to graph.py's construction; the
 * unscoped context render --no-commit (Pi's one verb) exits 0 with the same row beside RF_RENDER_EMPTY_DOCUMENT and states no
 * valid, validation or diagnostics result key. The tracked capture test/fixtures/rf-version-leaves.json (rf 0.1.832) serves both
 * leaves, so Pi's absence is Pi's posture, not a producer gap.
 *
 * THE PAIR. GRAPH_TEST_MEMBER is the producer's valid fixture schemas/fixtures/graph.test/valid/ok_shadow.json (blob 7442508d),
 * byte for byte. GRAPH_VALIDATE_MEMBER is the rf 0.1.832 capture above, its operation id, workspace id and root normalized to that
 * fixture's. The roster holds the sha256 of each one's JSON.stringify, of the UNFED row, of the empty-document row the render printed
 * beside it, and of the validation receipt (result.validation of schemas/fixtures/graph.validate/valid/ok_candidate_validation.json,
 * blob 3ff2448f) that B3 and C2 carry.
 *
 * WHERE PI COULD ACCEPT IT. Pi reads rf output only in the src modules that gate on the context.render command literal, which the
 * records case enumerates from src (READERS today): the reactivefiber.render.preview provider (providers/reactivefiber.ts, Pi's
 * one rf spawn, which wb-a9l2.8 A1 pins), the observer adapter (reactivefiber-observer.ts) and the evidence projection
 * (native-evidence.ts nativeEvidence, whose rf leg reads "`ok` describes CLI transport success; it is not a graph verification
 * verdict" and states no domainStatus).
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, the statement and acceptance (a), absent today. A1 no judged file spells either verb: every regular file of every top-level
 *    directory outside OUTSIDE_ROOTS (today .agents, .codex, .github, .pi, examples, qa and src: agent definitions and skill
 *    copies, codex and CI configuration - the CI workflow is a gate -, QA scripts, shipped examples and product modules) and the
 *    root build, gate, lint and type configuration (ROOT_CONFIG), read as UTF-8 raw and with escapes decoded, plus each module's
 *    TypeScript AST (argv arrays holding the two words as adjacent elements, cooked string and template literals, constant-folded
 *    `+` concatenations); floors on src, qa and examples, anchor tokens that must be read, the live context render argv as the AST
 *    anchor, and planted controls in scratch. A2 no registered native descriptor's JSON spells either verb, and the native
 *    registration's one rf capability is the preview.
 *  B, acceptance (b). B1 the pair is the producer's: its digests, and the facts the bead row names for each member (graph test
 *    valid:true; graph validate RF_COMPONENT_INSTANCE_UNFED, here beside a valid true of its own). B2 every reader refuses each
 *    member before projecting anything: the provider in one spawn of the render argv (typed transport), the observer (typed
 *    validation), nativeEvidence (no field); an admitted render through the same three is the positive control. B3 the verdict
 *    fields the bead names (valid, validation, diagnostics) upgrade nothing: added to an admitted render, clean or reporting errors,
 *    the observer's projection and nativeEvidence stay byte-identical, no domainStatus is minted and no surfaced string claims
 *    validity.
 *  C, acceptance (c), gated. C1 graph test carries neither field at the pin (the roster's producer facts), its validation_digest
 *    is a self-digest, both leaves are served at rf 0.1.832 and the bead row says the gating artifact is unshipped; a re-measure
 *    that ships either field reds C1 until (c) lands with it. C2 the one envelope Pi admits already carries the producer's rows
 *    and those fields verbatim: a context render stating the measured UNFED and empty-document rows, plus result.validation and
 *    result.diagnostics, reaches the provider's output deep-equal and byte-identical.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness, the scan constants, the residual families and the registered test titles are held to the out-of-file roster
 * test/fixtures/rf-shadow-test-validity-roster.json.
 * OUTSIDE ANCHORS. Rows: the owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-hs2j.5) - each acceptance
 * clause equals a bounded claim of exactly one row label and the statement one of row A's, and the labels claim nothing else
 * (claimsOf: a label's text before its first ": ", split as the filing's clauses are; equality, never containment, since wb-ykl9;
 * and the reading after that ": ", which claimsOf never binds, holds no parenthesis, so no tagged claim sits there unbound, since
 * wb-2gzp: READING below), its quote and citation equal the roster's, and B1, B3, C1 and C2 read their facts from it - so a row removed from every literal of this file
 * and the roster still reds, and so does a clause or the statement truncated in the bead row. Pins: the records case
 * derives one obligation set from outside sources (the repository's top-level listing, a fresh native registration, the src
 * modules holding the context.render literal, and the bead row's pair, verdict fields, code and Shipped sentence) and requires each
 * pin's measured coverage to meet it exactly, so a pin removed from ROWS, the literal, IMPL and the roster together leaves its
 * obligations uncovered and reds.
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its end (REACHED); and no registered test or suite title spells either verb (the
 * row labels are titled with the verb replaced, and this file's name avoids it), so a run's report written into a judged
 * directory stays quiet.
 * RESIDUALS (named families, each with a pinned quiet row in A1's controls): R-COMPOSED a verb assembled at runtime from
 * variables or a call (A2 is the runtime backstop for served descriptor text only); R-ENCODED an encoding outside the decoded set
 * (base64); R-LOOKALIKE a non-ASCII look-alike letter or an inserted invisible code point; R-OUTSIDE a file below an OUTSIDE_ROOTS
 * entry or a root file ROOT_CONFIG does not name (docs and receipts quote provisioning commands, tests use the verbs as needles,
 * vendor is third-party, feedback is prose to upstream tools).
 * READING (wb-2gzp): a row label's reading, its text after the first ": ", is the measured reading, prose no clause binds, so the
 * judged set refuses every tag in it: READING_TAG reads a parenthesised run or a lone "(" or ")", since every tag the bounded
 * binding knows is parenthesised (the filing's clause tags "(a) " to "(c) ", which acceptanceClauses and claimsOf split on, and
 * STATEMENT_TAG), and so is any other tag of that shape: "(z) ", "(Z) ", "(ii) ", an unclosed "(z" or an unopened "z)". Its
 * controls, READING_PLANTS, each put one claim into one row's reading, past the first ": ", so the row's bounded claims stay its
 * bead-row text (asserted per control) and only this check can see it: the flagged ones are that escape, gate probe G6 first
 * (row B reading 'never valid: (z) Pi also mints a structural verdict; the pair is the producer's'), at the reading's start, at
 * its end and between its first and a second ": "; beside them, the controls anchored in the bead row: each acceptance clause
 * and the statement, tag included, put into every row's reading in the same three places, reads flagged. READING RESIDUALS
 * (named families, each with pinned quiet rows in READING_PLANTS): R-UNTAGGED an untagged claim in a reading (prose, which by
 * design reads as the measured reading); R-UNPARENTHESISED a tag written without an ASCII parenthesis (square brackets,
 * full-width parentheses, a bare "z. ").
 * CONTROL TEXT (wb-7rz9): a control is held out of file by its planted text, not only by its name: the roster holds the digest of
 * every A1 plant's text (plantDigests) and of every reading control's text before and after (readingPlantDigests) - a digest, so
 * no planted needle is copied into a file whole-tree readers judge - so a control whose text is swapped reds even while the judge
 * or READING_TAG still flags it. Each reading control is also judged from its own text: tagShapeOf reads its ASCII parentheses, never
 * READING_TAG, and the roster holds each control's shape (readingShapes); the flagged controls together show every shape
 * READING_TAG's alternatives read (TAG_SHAPES: parenthesised, unclosed, unopened) and no other, and no quiet control's text holds an
 * ASCII parenthesis. Beside the hand controls the two lone shapes are anchored in the bead row: each filed claim with its tag's ")"
 * removed ("(a a Pi ..."), and apart with its "(" removed ("a) a Pi ..."), put into every row's reading in the same three places,
 * passes the bounded binding and READING_TAG reads its lone parenthesis there (72 forms, counted), so dropping the lone "(" or the
 * lone ")" alternative reds on bead-row text even when the hand control, its roster entries and TAG_SHAPES are edited with it.
 * NOT CLAIMED: a control's text re-pinned together with its roster digest (for a reading control, with its roster shape too), the
 * roster-moves-with-census path visible in any diff - an A1 plant has no shape check of its own, so a plant re-pinned that way and
 * a judge narrowing only it exercised survive together; an edit of loneFormsOf together with the count beside it; and a narrowing
 * of READING_TAG, the roster's readingTag edited to match, that still reads a lone parenthesis where the controls write one (a
 * lower-case letter after the "(", one before the ")").
 * SCOPE: the observer's render coverage is a reading of a context render, not of graph validity; its handling of a warning row
 * (shape-checked and never surfaced: the counts it reports are the summary's) stays with its own pins. The producer facts are read at 6a251bf73af5 and rf 0.1.832; Pi vendors no
 * rf schema, so a producer change is seen only when a cut re-measures the roster.
 *
 * Display paths added: none. Test-only: the stand-in rf, its spawn log and every planted tree live in makeScratch scratch.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerNativeReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER_FILE = "test/fixtures/rf-shadow-test-validity-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const LEAVES_CAPTURE = "test/fixtures/rf-version-leaves.json";
const BEAD = "wb-hs2j.5";
const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_GRANT = "reactivefiber:render";
const RENDER_COMMAND = "context.render";
const UNFED = "RF_COMPONENT_INSTANCE_UNFED";
/** The reading root of every observer and evidence case (the producer fixtures' root); the provider cases spawn in scratch. */
const FIXTURE_ROOT = "/abs/project";
const RENDER_INPUT = { model: "m", task: "t" };

/** The two words of either verb. */
const GRAPH = "graph";
const VERBS = ["test", "validate"];
/** Either verb in any letter case: "graph", then any run of whitespace, ".", "_", "/" or "-", then "test" or "validat" (which also
 * reaches validation and validated); a longer word ending in graph ("subgraph") is not a spelling. */
const VERB_FAMILY = /\bgraph[\s._/-]*(?:test|validat)/i;
/** A validity verdict in a surfaced string: valid or validity as a word, or structural. */
const VALIDITY_WORDS = /\bvalid(?:ity)?\b|\bstructural/i;
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** Top-level entries never judged (R-OUTSIDE): VCS and tracker data, installed and build outputs, prose, tests, third-party code. */
const OUTSIDE_ROOTS = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge", "docs", "test", "vendor", "new-feedback", "media"];
/** Root-level files judged: the build, gate, lint and type configuration. Root prose (README.md and the like) is R-OUTSIDE. */
const ROOT_CONFIG = /^(?:forge\.toml|package(?:-lock)?\.json|biome\.json|tsconfig[\w.-]*\.json|vitest\.[\w.-]*\.ts|\.gitignore|\.npmignore)$/;
/** Each floor sits below the count measured at base 2a26385 (src 115, qa 67, examples 7 files; 22 root configuration files). */
const FLOORS = { src: 100, qa: 55, examples: 5, rootConfig: 20 };
/** Files the walk must reach, each with a token its text carries: the three readers' command literal, a qa script, an example and
 * the gate configuration. */
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["src/workbench/providers/reactivefiber.ts", RENDER_COMMAND],
  ["src/workbench/reactivefiber-observer.ts", RENDER_COMMAND],
  ["src/workbench/native-evidence.ts", RENDER_COMMAND],
  ["qa/workbench/receipts-index.mjs", "docs/workbench/receipts"],
  ["examples/workflows/compose.js", "export"],
  ["forge.toml", "[build.commands]"],
];
const PREVIEW_MODULE = "src/workbench/providers/reactivefiber.ts";
/** The rf readers B2 judges, by module. */
const READERS = ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts", "src/workbench/native-evidence.ts"];
const RESIDUAL_FAMILIES = ["R-COMPOSED", "R-ENCODED", "R-LOOKALIKE", "R-OUTSIDE"];
/** The tag row A's label opens its statement claim with. */
const STATEMENT_TAG = "(statement, absent today) ";
const CYRILLIC_A = String.fromCodePoint(0x0430);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
/** A tag in a row label's reading (wb-2gzp): a parenthesised run, or a lone "(" or ")". */
const READING_TAG = /\([^()]*\)|[()]/g;
/** The reading residual families (wb-2gzp), each with pinned quiet rows in READING_PLANTS. */
const READING_RESIDUALS = ["R-UNTAGGED", "R-UNPARENTHESISED"];
/** The tag shapes READING_TAG's alternatives read (wb-7rz9), as tagShapeOf names them: a parenthesised run, a lone "(" and a lone ")". */
const TAG_SHAPES = ["parenthesised", "unclosed", "unopened"];
const FULLWIDTH_OPEN = String.fromCodePoint(0xff08);
const FULLWIDTH_CLOSE = String.fromCodePoint(0xff09);

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(statement, absent today) no Pi surface shall accept graph test valid:true as structural graph validity without reading graph validate on the same overlay; (a) a Pi consumer of graph test output records it as a runtime shadow result distinct from structural validity, and any Pi gate requiring structural validity reads graph validate on the same overlay: no judged code or configuration file spells either verb and no registered descriptor names one, so no such consumer or gate exists today",
    pins: ["A1", "A2"],
  },
  {
    id: "B",
    label:
      "(b) a fixture pair (graph test valid:true, graph validate RF_COMPONENT_INSTANCE_UNFED) projects not-structurally-valid, never valid: the pair is the producer's, every Pi rf reader refuses each member before projecting anything, and the verdict fields upgrade nothing on an admitted render",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label:
      "(c) when rfc-s24ro.1 ships, Pi carries result.validation / result.diagnostics verbatim including RF_COMPONENT_INSTANCE_UNFED: gated, graph test carries neither field at the pin, while the one envelope Pi admits already carries the producer's rows and those fields verbatim",
    pins: ["C1", "C2"],
  },
];

/** The producer's valid graph.test fixture (schemas/fixtures/graph.test/valid/ok_shadow.json at 6a251bf73af5), byte for byte. */
const GRAPH_TEST_MEMBER: JsonObject = {
  schema: "reactive-fiber.cli/v1",
  ok: true,
  command: "graph.test",
  operation_id: "rfo_abcdefghijklmnopqrstuvwxyz",
  workspace: { id: "rfw_cccccccccccccccccccccccccc", root: FIXTURE_ROOT },
  transaction_id: null,
  result: {
    overlay: {
      overlay_id: "worker-a-1",
      overlay_revision: 3,
      overlay_digest: `sha256:${"1".repeat(64)}`,
      base_bundle_revision: `sha256:${"b".repeat(64)}`,
      scope: "shared",
      scope_key: null,
    },
    valid: true,
    checks: [
      { id: "budget_gate", status: "skipped", detail: "no latency budget declared" },
      { id: "compilability", status: "passed", detail: "runtime compiler accepted the throwaway graph" },
      { id: "component_revisions", status: "passed", detail: "2 pinned revisions resolved" },
      { id: "graph_schema", status: "passed", detail: "swarm-context.bundle/v1 materialized; graph/v1 admitted" },
      { id: "lens_declarations", status: "passed", detail: null },
      { id: "optic_registry", status: "passed", detail: "beads.current_projection pinned to its revision digest" },
      { id: "redaction_gate", status: "passed", detail: null },
      { id: "shadow_render", status: "passed", detail: "1 view rendered over 4 captured observations" },
      { id: "trust_gate", status: "passed", detail: "no capability beyond the policy's grants" },
      { id: "view_contracts", status: "passed", detail: "swarm.worker: required keys present, 1024 bytes <= budget" },
    ],
    shadow: {
      evidence: "captured",
      subprocesses_spawned: 0,
      observations_reused: 4,
      renders: [{ view_id: "swarm.worker", output_digest: `sha256:${"d".repeat(64)}` }],
    },
    comparisons: [
      { key: "beads.current", before: `sha256:${"e".repeat(64)}`, after: `sha256:${"e".repeat(64)}`, changed: false },
      { key: "swarm.worker", before: `sha256:${"c".repeat(64)}`, after: `sha256:${"d".repeat(64)}`, changed: true },
    ],
    published_head_unchanged: true,
    effects_authorized: false,
    validation_digest: `sha256:${"f".repeat(64)}`,
  },
  diagnostics: [],
};

/** The RF_COMPONENT_INSTANCE_UNFED row rf 0.1.832 printed for the hand-written unfed row (graph.py:983-997 at the pin). */
const UNFED_ROW: JsonObject = {
  code: UNFED,
  severity: "warning",
  message:
    "graph graphs/context.toml declares instance 'notes' of component 'demo.notes' that no [[fiber]] row feeds; a component instance executes only through the edges that target it, so this one never renders and no block of it can reach the document",
  hint: "Feed the instance with a [[fiber]] row in the graph document -- from = metadata.from, to = metadata.to, the default lane and the identity optic, the row `rf component add` writes for a component no row names -- or remove its [[component]] row; `rf graph validate` checks the document, then run `rf context render` again.",
  source: "host",
  metadata: {
    component_id: "demo.notes",
    instance: "notes",
    component_instance_id: "demo.notes:notes",
    graph_path: "graphs/context.toml",
    from: "source:task.value",
    to: "component:notes.task",
  },
};

/** The empty-document row the same rf printed beside it on the unscoped context render --no-commit. */
const EMPTY_DOCUMENT_ROW: JsonObject = {
  code: "RF_RENDER_EMPTY_DOCUMENT",
  severity: "warning",
  message: "the assembled document is empty: no active component rendered a candidate block (0 components rendered), so the final document is 0 bytes",
  hint: "No active component rendered, so nothing could reach the document: `rf component list --json` shows what the workspace knows, `rf component add PATH` registers a definition and `rf component activate ID` makes it render.",
  source: "host",
  metadata: { candidate_count: 0, withheld_by_stage: {}, withheld_by_reason: {}, policy_key: null, rendered_component_count: 0 },
};

/** rf 0.1.832's graph validate envelope over that workspace, ids and root normalized to the graph.test fixture's. */
const GRAPH_VALIDATE_MEMBER: JsonObject = {
  schema: "reactive-fiber.cli/v1",
  ok: true,
  command: "graph.validate",
  operation_id: "rfo_abcdefghijklmnopqrstuvwxyz",
  workspace: { id: "rfw_cccccccccccccccccccccccccc", root: FIXTURE_ROOT },
  transaction_id: null,
  result: {
    valid: true,
    graph_revision_id: "sha256:9e1838918591687a05701f9d404d8c06016dea1be87e6a98e9fca59d618a7ab3",
    graph_path: "graphs/context.toml",
    fibers: [],
    components: [{ component_instance_id: "demo.notes:notes", component_id: "demo.notes", instance: "notes", revision: null }],
    diagnostics: [UNFED_ROW],
    runtime_compilable: true,
    compile_diagnostics: [],
  },
  diagnostics: [UNFED_ROW],
};

/** The validation receipt of the producer's schemas/fixtures/graph.validate/valid/ok_candidate_validation.json (result.validation). */
const VALIDATION_RECEIPT: JsonObject = {
  schema: "swarm-context.validation-receipt/v1",
  overlay_id: "rfg_abcdefghijklmnopqrstuvwxyz",
  overlay_revision: 2,
  overlay_digest: `sha256:${"1".repeat(64)}`,
  outcome: "passed",
  checks: [
    { check: "composition", status: "passed", diagnostics: [] },
    { check: "trust_gate", status: "passed", diagnostics: [] },
    { check: "compilability", status: "passed", diagnostics: [] },
    { check: "optic_registry", status: "passed", diagnostics: [] },
    { check: "component_revisions", status: "passed", diagnostics: [] },
    { check: "lens_declarations", status: "passed", diagnostics: [] },
    { check: "view_contracts", status: "passed", diagnostics: [] },
  ],
  validation_digest: `sha256:${"2".repeat(64)}`,
};

const MEMBERS: readonly (readonly [string, JsonObject])[] = [
  ["graph.test", GRAPH_TEST_MEMBER],
  ["graph.validate", GRAPH_VALIDATE_MEMBER],
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
interface Producer {
  readonly programPin: string;
  readonly rfVersion: string;
  readonly graphTestResultKeys: readonly string[];
  readonly graphValidateResultKeys: readonly string[];
  readonly validationDigestDescription: string;
  readonly digests: { readonly [name: string]: string };
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly scan: JsonObject;
  readonly producer: Producer;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.producer) || !isObject(raw.scan)) throw new Error("roster needs rows, producer and scan objects");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const producer = raw.producer;
  const digests = producer.digests;
  if (!isObject(digests) || !Object.values(digests).every(value => typeof value === "string")) throw new Error("roster producer.digests must map names to digests");
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    scan: scan as JsonObject,
    producer: {
      programPin: text(producer.programPin, "producer.programPin"),
      rfVersion: text(producer.rfVersion, "producer.rfVersion"),
      graphTestResultKeys: strings(producer.graphTestResultKeys, "producer.graphTestResultKeys"),
      graphValidateResultKeys: strings(producer.graphValidateResultKeys, "producer.graphValidateResultKeys"),
      validationDigestDescription: text(producer.validationDigestDescription, "producer.validationDigestDescription"),
      digests: Object.fromEntries(Object.entries(digests).map(([key, value]) => [key, String(value)])),
    },
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

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
/** The prohibition of the filing's full statement: from "no Pi surface shall" to the " - pin" that cites the source. */
function statementOf(notes: string): string {
  return /, (no Pi surface shall .+?) - pin /.exec(notes)?.[1] ?? "";
}
/**
 * A row label's claims, bounded on both sides (wb-ykl9): the label's text before its first ": " (the measured reading follows
 * it), split where acceptanceClauses splits the filing (a "; " before a "(x) "), with STATEMENT_TAG dropped from the claim it
 * opens. A bead-row clause binds a row only by equalling one of these whole, so a clause or statement truncated in the bead row,
 * or a label claim extended, prefixed or added, no longer binds. The reading after the first ": " is never a claim, so a tagged
 * claim placed there would escape this binding: the judged set refuses every tag in it (readingTagsOf, wb-2gzp).
 */
function claimsOf(label: string): string[] {
  const reading = label.indexOf(": ");
  const head = reading < 0 ? label : label.slice(0, reading);
  return head.split(/; (?=\([a-z]\) )/).map(claim => (claim.startsWith(STATEMENT_TAG) ? claim.slice(STATEMENT_TAG.length) : claim));
}
/** A row label's reading: its text after the first ": ", where claimsOf ends the label's claims ("" when it has none). */
function labelReadingOf(label: string): string {
  const reading = label.indexOf(": ");
  return reading < 0 ? "" : label.slice(reading + 2);
}
/** The tags a row label's reading holds (READING_TAG), in order (wb-2gzp). */
function readingTagsOf(label: string): string[] {
  return [...labelReadingOf(label).matchAll(READING_TAG)].map(match => match[0]);
}
interface ReadingPlant {
  readonly id: string;
  /** The row whose label it edits. */
  readonly row: string;
  /** Text put at the start of the row's reading, and text put after its end. */
  readonly before: string;
  readonly after: string;
  readonly flagged: boolean;
  /** The reading residual family a quiet plant pins. */
  readonly residual?: string;
}
/** The judged set's reading controls (wb-2gzp): each puts one claim into one row label's reading, so the row's bounded claims stay
 * its bead-row text; the flagged ones are the tagged-claim escape of the bounded binding (G6 is the gate's probe), the quiet ones
 * pin the reading residuals. */
const READING_PLANTS: readonly ReadingPlant[] = [
  { id: "G6", row: "B", before: "(z) Pi also mints a structural verdict; ", after: "", flagged: true },
  { id: "tail", row: "C", before: "", after: "; (d) Pi accepts a shadow result as structural validity", flagged: true },
  { id: "upper", row: "A", before: "", after: "; (Z) a Pi gate accepts a shadow result as structural validity", flagged: true },
  { id: "roman", row: "B", before: "", after: "; (ii) Pi mints a structural verdict", flagged: true },
  { id: "statement", row: "C", before: `${STATEMENT_TAG}Pi mints a structural verdict; `, after: "", flagged: true },
  { id: "unclosed", row: "A", before: "(z Pi mints a structural verdict; ", after: "", flagged: true },
  { id: "unopened", row: "B", before: "z) Pi mints a structural verdict; ", after: "", flagged: true },
  { id: "second-colon", row: "A", before: "(e) Pi mints a structural verdict: ", after: "", flagged: true },
  { id: "untagged", row: "B", before: "Pi also mints a structural verdict; ", after: "", flagged: false, residual: "R-UNTAGGED" },
  { id: "bracket", row: "C", before: "[z] Pi mints a structural verdict; ", after: "", flagged: false, residual: "R-UNPARENTHESISED" },
  { id: "fullwidth", row: "A", before: `${FULLWIDTH_OPEN}z${FULLWIDTH_CLOSE} Pi mints a structural verdict; `, after: "", flagged: false, residual: "R-UNPARENTHESISED" },
  { id: "numbered", row: "B", before: "z. Pi mints a structural verdict; ", after: "", flagged: false, residual: "R-UNPARENTHESISED" },
];
/** A judged row's label, by id. */
function rowLabel(id: string): string {
  const row = ROWS.find(entry => entry.id === id);
  if (row === undefined) throw new Error(`no judged row ${id}`);
  return row.label;
}
/** `label` with `before` put after its first ": " (at the start of its reading) and `after` put after its end. */
function plantInto(label: string, before: string, after: string): string {
  const reading = label.indexOf(": ") + 2;
  return `${label.slice(0, reading)}${before}${label.slice(reading)}${after}`;
}
/** The label a reading control plants into its row. */
const plantedLabel = (plant: ReadingPlant): string => plantInto(rowLabel(plant.row), plant.before, plant.after);
/** The tags in the readings of `rows`' labels, each as "<row id>: <tag>": the judged set reads ROWS through it, every control a
 * copy of ROWS with one label planted. */
function taggedReadings(rows: readonly Row[]): string[] {
  return rows.flatMap(row => readingTagsOf(row.label).map(tag => `${row.id}: ${tag}`));
}
/** ROWS with row `id`'s label replaced by `label`. */
const withLabel = (id: string, label: string): Row[] => ROWS.map(row => (row.id === id ? { ...row, label } : row));
/** The text a reading control plants: what it puts before the reading's start and after the label's end (wb-7rz9). */
const plantedText = (plant: ReadingPlant): string => `${plant.before}${plant.after}`;
/**
 * A planted text's tag shape (wb-7rz9), read from its own ASCII parentheses and never through READING_TAG, so a control's text and
 * the detector are judged apart: "parenthesised" when a "(" has a ")" after it, "unclosed" when it holds a "(" and no ")",
 * "unopened" when it holds a ")" and no "(", "none" when it holds neither, and "mixed" when every ")" comes before the first "(".
 */
function tagShapeOf(text: string): string {
  const open = text.indexOf("(");
  const close = text.lastIndexOf(")");
  if (open < 0) return close < 0 ? "none" : "unopened";
  if (close < 0) return "unclosed";
  return close > open ? "parenthesised" : "mixed";
}
interface LoneForm {
  /** The tag shape this form writes (TAG_SHAPES' "unclosed" or "unopened"). */
  readonly shape: string;
  /** The filed claim with its tag rewritten. */
  readonly claim: string;
  /** The lone parenthesis READING_TAG must read in it. */
  readonly lone: string;
}
/** A filed claim's opening tag "(x) " in its two lone shapes (wb-7rz9): its ")" removed ("(x ") and its "(" removed ("x) "); none
 * when the claim opens with no parenthesised tag, which the count beside the check reads. */
function loneFormsOf(claim: string): LoneForm[] {
  const tag = /^\(([^()]*)\) /.exec(claim);
  if (tag === null) return [];
  const inner = tag[1] ?? "";
  const rest = claim.slice(tag[0].length);
  return [
    { shape: "unclosed", claim: `(${inner} ${rest}`, lone: "(" },
    { shape: "unopened", claim: `${inner}) ${rest}`, lone: ")" },
  ];
}
/** The filing's "Shipped:" sentence on its Gating artifact line. */
function shippedOf(notes: string): string {
  return /^Gating artifact: .*?(Shipped: [^;]+);/m.exec(notes)?.[1] ?? "";
}
interface Member {
  readonly verb: string;
  readonly fact: string;
}
/** The fixture pair acceptance (b) names: each parenthesised member's verb (its first two words) and the fact after it. */
function pairOf(clause: string): Member[] {
  const inner = /fixture pair \(([^()]+)\)/.exec(clause)?.[1] ?? "";
  return inner.split(", ").map(member => {
    const words = member.split(" ");
    return { verb: words.slice(0, 2).join(" "), fact: words.slice(2).join(" ") };
  });
}
/** The result fields a clause names as result.<field>, in order. */
function resultFieldsOf(clause: string): string[] {
  return [...clause.matchAll(/\bresult\.([a-z_]+)/g)].map(match => match[1] ?? "");
}
/** The verdict fields a clause states as <field>:true, in order. */
function trueFieldsOf(clause: string): string[] {
  return [...clause.matchAll(/\b([a-z_]+):true\b/g)].map(match => match[1] ?? "");
}
/** The rf diagnostic codes a clause names, in order. */
function codesOf(clause: string): string[] {
  return [...clause.matchAll(/\bRF_[A-Z0-9_]+\b/g)].map(match => match[0]);
}

const posix = (path: string): string => path.split(sep).join("/");
const byName = (left: Dirent, right: Dirent): number => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0);
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
const sha256 = (value: unknown): string => `sha256:${createHash("sha256").update(JSON.stringify(value)).digest("hex")}`;

/** Replaces each JS escape, HTML numeric reference and percent escape by the character it encodes (an out-of-range one by nothing). */
function decodeEscapes(value: string): string {
  const char = (digits: string, radix: number): string => {
    const code = Number.parseInt(digits, radix);
    return code <= 0x10ffff ? String.fromCodePoint(code) : "";
  };
  return value
    .replace(/\\u\{([0-9a-f]{1,6})\}/gi, (_, hex: string) => char(hex, 16))
    .replace(/\\u([0-9a-f]{4})/gi, (_, hex: string) => char(hex, 16))
    .replace(/\\x([0-9a-f]{2})/gi, (_, hex: string) => char(hex, 16))
    .replace(/&#x([0-9a-f]{1,6});?/gi, (_, hex: string) => char(hex, 16))
    .replace(/&#([0-9]{1,7});?/g, (_, decimal: string) => char(decimal, 10))
    .replace(/%([0-9a-f]{2})/gi, (_, hex: string) => char(hex, 16));
}
const spellsVerb = (value: string): boolean => VERB_FAMILY.test(value) || VERB_FAMILY.test(decodeEscapes(value));

interface Tree {
  readonly files: readonly string[];
  /** The top-level directories walked. */
  readonly roots: readonly string[];
  readonly rootConfig: readonly string[];
}
/** The judged files below `root`, in name order with "/" separators: every regular file of every top-level directory outside
 * OUTSIDE_ROOTS, recursively, and the root-level files ROOT_CONFIG names. Symlinks are neither followed nor judged. */
function judgedTree(root: string): Tree {
  const files: string[] = [];
  const roots: string[] = [];
  const rootConfig: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort(byName)) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(posix(relative(root, path)));
    }
  };
  for (const entry of readdirSync(root, { withFileTypes: true }).sort(byName)) {
    if (entry.isDirectory() && !OUTSIDE_ROOTS.includes(entry.name)) {
      roots.push(entry.name);
      visit(join(root, entry.name));
    } else if (entry.isFile() && ROOT_CONFIG.test(entry.name)) {
      rootConfig.push(entry.name);
      files.push(entry.name);
    }
  }
  return { files, roots, rootConfig };
}

function scriptKind(file: string): ts.ScriptKind {
  const extension = extensionOf(file);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".jsx") return ts.ScriptKind.JSX;
  return [".js", ".mjs", ".cjs"].includes(extension) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
}
/** A `+` chain of string literals, folded; undefined when any operand is not a literal. */
function foldLiterals(node: ts.Expression): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return foldLiterals(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = foldLiterals(node.left);
    const right = foldLiterals(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  return undefined;
}
interface ModuleScan {
  readonly findings: string[];
  readonly renderArgv: number;
}
/** One module's AST: argv arrays holding "graph" then a verb as adjacent string elements, cooked string and template literals,
 * and folded `+` concatenations of literals that spell a verb; renderArgv counts arrays holding "context" then "render". */
function scanModule(file: string, source: string): ModuleScan {
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, scriptKind(file));
  const findings: string[] = [];
  let renderArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ""));
      if (words.some((word, index) => word === GRAPH && VERBS.includes(words[index + 1] ?? ""))) findings.push(`${file}: argv [${words.filter(Boolean).join(", ")}]`);
      if (words.some((word, index) => word === "context" && words[index + 1] === "render")) renderArgv += 1;
    }
    if (ts.isStringLiteralLike(node) && VERB_FAMILY.test(node.text)) findings.push(`${file}: literal ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (VERB_FAMILY.test(parts.join(" "))) findings.push(`${file}: template ${parts.join("<expr>")}`);
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const folded = foldLiterals(node);
      if (folded !== undefined && VERB_FAMILY.test(folded)) findings.push(`${file}: folded ${folded}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return { findings, renderArgv };
}

interface Judgement {
  readonly findings: readonly string[];
  readonly renderArgv: { readonly [file: string]: number };
  readonly texts: { readonly [file: string]: string };
}
/** Judges every file of a tree: its UTF-8 text, raw and decoded, and a module's AST. */
function judge(root: string, tree: Tree): Judgement {
  const findings: string[] = [];
  const renderArgv: { [file: string]: number } = {};
  const texts: { [file: string]: string } = {};
  for (const file of tree.files) {
    const source = readFileSync(join(root, file), "utf8");
    texts[file] = source;
    if (spellsVerb(source)) findings.push(`${file}: text`);
    if (!isModule(file)) continue;
    const scan = scanModule(file, source);
    findings.push(...scan.findings);
    renderArgv[file] = scan.renderArgv;
  }
  return { findings, renderArgv, texts };
}

interface Plant {
  readonly path: string;
  readonly text: string;
  readonly flagged: boolean;
  /** The residual family a quiet plant pins. */
  readonly residual?: string;
}
/** A1's controls, planted in scratch: what the judge must flag, the residuals it must leave quiet, and two non-verbs. */
const PLANTS: readonly Plant[] = [
  { path: "src/argv-test.ts", text: 'spawn("rf", ["--workspace", w, "graph", "test", "--candidate", c, "--json"]);\n', flagged: true },
  { path: "src/argv-validate.mts", text: 'export const argv = ["graph", "validate", "--json"];\n', flagged: true },
  { path: "src/dotted.ts", text: 'export const leaf = "graph.test";\n', flagged: true },
  { path: "src/folded.ts", text: 'export const cmd = "graph " + "validate";\n', flagged: true },
  { path: "src/escaped.ts", text: 'export const leaf = "graph\\u002Evalidate";\n', flagged: true },
  { path: "src/identifier.ts", text: "export function graphTest(): void {}\n", flagged: true },
  { path: "src/comment.ts", text: "// shells out to rf graph test --json\nexport {};\n", flagged: true },
  { path: "src/template.ts", text: ["export const cmd = `rf graph validate $", "{overlay}`;\n"].join(""), flagged: true },
  { path: "qa/receipt.mjs", text: 'export const cmd = "rf graph test --candidate c";\n', flagged: true },
  { path: "examples/flow.js", text: "// rf graph validate, then render\n", flagged: true },
  { path: "forge.toml", text: '[build.commands.graph]\ncommand = "rf graph test"\n', flagged: true },
  { path: "scripts/check.ts", text: 'export const leaf = "graph.validate";\n', flagged: true },
  { path: "src/composed.ts", text: 'const a = "graph";\nconst b = "test";\nspawn("rf", [a, b]);\n', flagged: false, residual: "R-COMPOSED" },
  { path: "src/joined.ts", text: 'export const verb = ["gr", "aph"].join("") + " te" + "st";\n', flagged: false, residual: "R-COMPOSED" },
  { path: "src/encoded.ts", text: 'export const leaf = Buffer.from("Z3JhcGggdGVzdA==", "base64").toString();\n', flagged: false, residual: "R-ENCODED" },
  { path: "src/lookalike.ts", text: `export const leaf = "gr${CYRILLIC_A}ph test";\n`, flagged: false, residual: "R-LOOKALIKE" },
  { path: "src/invisible.ts", text: `export const leaf = "graph${ZERO_WIDTH_SPACE}validate";\n`, flagged: false, residual: "R-LOOKALIKE" },
  { path: "docs/provisioning.md", text: "`rf graph validate` (rc 0)\n", flagged: false, residual: "R-OUTSIDE" },
  { path: "test/needle.test.ts", text: 'const leaf = "graph.test";\n', flagged: false, residual: "R-OUTSIDE" },
  { path: "vendor/pkg/index.js", text: 'module.exports = "graph test";\n', flagged: false, residual: "R-OUTSIDE" },
  { path: "README.md", text: "Run rf graph test first.\n", flagged: false, residual: "R-OUTSIDE" },
  { path: "node_modules/pkg/index.js", text: 'module.exports = "graph.validate";\n', flagged: false, residual: "R-OUTSIDE" },
  { path: "src/subgraph.ts", text: 'export const label = "subgraph test";\n', flagged: false },
  { path: "src/apart.ts", text: 'export const label = "the graph under test";\n', flagged: false },
];

interface ProviderReading {
  readonly value: JsonValue | null;
  readonly error: { readonly category: string; readonly message: string } | null;
  readonly spawns: readonly (readonly string[])[];
  readonly root: string;
}
/** One invocation of the registered preview against a stand-in rf on PATH that logs its argv, prints `printed` (built for the
 * reading root it is handed) and exits 0. */
async function providerReading(printed: (root: string) => Json): Promise<ProviderReading> {
  const folder = makeScratch("rf-shadow-test-validity-");
  const oldPath = process.env.PATH;
  try {
    const log = join(folder, "spawns.jsonl");
    const envelope = join(folder, "envelope.json");
    const root = join(folder, "workspace");
    mkdirSync(root);
    writeFileSync(envelope, JSON.stringify(printed(root)));
    const script = join(folder, "rf");
    writeFileSync(
      script,
      `#!/usr/bin/env node\nconst fs = require("node:fs");\nfs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(fs.readFileSync(${JSON.stringify(envelope)}, "utf8"));\nprocess.exit(0);\n`,
    );
    chmodSync(script, 0o700);
    process.env.PATH = `${folder}:${oldPath ?? ""}`;
    const registry = new CapabilityRegistry();
    registerNativeReactiveFiberRender(registry, root);
    const spawns = (): string[][] =>
      readFileSync(log, "utf8")
        .trim()
        .split("\n")
        .filter(Boolean)
        .map(line => JSON.parse(line) as string[]);
    try {
      const value = await registry.invoke(PREVIEW_ID, RENDER_INPUT, { grants: [PREVIEW_GRANT], signal: new AbortController().signal });
      return { value, error: null, spawns: spawns(), root };
    } catch (error) {
      if (!(error instanceof CapabilityError)) throw error;
      return { value: null, error: { category: error.category, message: error.message }, spawns: spawns(), root };
    }
  } finally {
    if (oldPath === undefined) Reflect.deleteProperty(process.env, "PATH");
    else process.env.PATH = oldPath;
    removeScratch(folder);
  }
}
/** The argv the preview spawns for RENDER_INPUT at `root`. */
const renderArgv = (root: string): string[] => ["--workspace", root, "context", "render", "--model", "m", "--task", "t", "--no-commit", "--no-input", "--json"];

const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: FIXTURE_ROOT, principal: "census" },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
/** The provider's output shape around `source`, as an observer or nativeEvidence receives it. */
const readingOf = (source: Json): JsonValue => json({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source }) as JsonValue;
function observerOutcome(reading: JsonValue): Json {
  try {
    const topology = reactivefiberTopology(reading, OBSERVER_CONTEXT);
    const snapshot = topology.snapshots[0];
    return { coverage: snapshot?.coverage ?? null, statusTone: snapshot?.node.statusTone ?? null };
  } catch (error) {
    if (!(error instanceof CapabilityError)) throw error;
    return { refused: error.category, message: error.message };
  }
}
const evidenceOf = (reading: JsonValue): Json => json(nativeEvidence(PREVIEW_ID, reading));

/** An admitted noncommitted render at `root`: the shared full-shape fixture, optionally reporting one error in its summary. */
function admittedRender(root: string, errors = 0): JsonObject {
  const envelope = fullShapeRf(root);
  const result = envelope.result;
  if (!isObject(result)) throw new Error("the full-shape fixture lost its result");
  return { ...envelope, result: { ...result, diagnostics_summary: { errors, warnings: 0, has_errors: errors > 0, has_warnings: false } } };
}
/** The same render with `fields` added to its result. */
function withResultFields(envelope: JsonObject, fields: JsonObject): JsonObject {
  const result = envelope.result;
  if (!isObject(result)) throw new Error("the render lost its result");
  return { ...envelope, result: { ...(result as JsonObject), ...fields } };
}

const REACHED: string[] = [];
const COVERED = new Map<string, readonly string[]>();
interface Outcome {
  readonly witness: Json;
}
/** Records that `pin`'s case reached its end and what it measured covering; returns its witness. */
function done(pin: string, witness: Json, covers: readonly string[]): Outcome {
  REACHED.push(pin);
  COVERED.set(pin, [...covers]);
  return { witness };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: { readonly [pin: string]: () => Promise<Outcome> } = {
  A1: async () => {
    const tree = judgedTree(REPO);
    const live = judge(REPO, tree);
    const count = (root: string): number => tree.files.filter(file => file.startsWith(`${root}/`)).length;
    const floorsMet =
      count("src") >= FLOORS.src && count("qa") >= FLOORS.qa && count("examples") >= FLOORS.examples && tree.rootConfig.length >= FLOORS.rootConfig;
    const anchorsRead = WALK_ANCHORS.filter(([file, token]) => (live.texts[file] ?? "").includes(token)).map(([file]) => file);
    const renderArgvReached = (live.renderArgv[PREVIEW_MODULE] ?? 0) >= 1;
    expect(floorsMet, `files walked: src ${count("src")}, qa ${count("qa")}, examples ${count("examples")}, root configuration ${tree.rootConfig.length}`).toBe(true);
    expect(anchorsRead, "every anchor file was walked and its token read").toEqual(WALK_ANCHORS.map(([file]) => file));
    expect(renderArgvReached, "the AST scan reached the preview's context render argv").toBe(true);
    expect(live.findings, "judged files spelling graph test or graph validate").toEqual([]);
    const scratch = makeScratch("rf-shadow-test-validity-plants-");
    try {
      for (const plant of PLANTS) {
        mkdirSync(dirname(join(scratch, plant.path)), { recursive: true });
        writeFileSync(join(scratch, plant.path), plant.text);
      }
      const planted = judge(scratch, judgedTree(scratch));
      const flagged = (path: string): boolean => planted.findings.some(finding => finding.startsWith(`${path}:`));
      const controls = Object.fromEntries(PLANTS.map(plant => [plant.path, flagged(plant.path)]));
      expect(controls, "each planted control reads as declared").toStrictEqual(Object.fromEntries(PLANTS.map(plant => [plant.path, plant.flagged])));
      const quietFamilies = [...new Set(PLANTS.flatMap(plant => (plant.residual === undefined || plant.flagged ? [] : [plant.residual])))];
      expect(quietFamilies, "every residual family has a pinned quiet row").toEqual(RESIDUAL_FAMILIES);
      return done("A1", { floorsMet, anchorsRead, renderArgvReached, findings: [...live.findings], controls }, [
        ...tree.roots.map(root => `walk:${root}`),
        ...(tree.rootConfig.length > 0 ? ["walk:root-config"] : []),
      ]);
    } finally {
      removeScratch(scratch);
    }
  },
  A2: async () => {
    const native = await loadWorkbenchNative();
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, REPO);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    const spelled = descriptors.filter(descriptor => spellsVerb(JSON.stringify(descriptor))).map(descriptor => descriptor.id);
    const rfDescriptors = descriptors.filter(descriptor => descriptor.id.startsWith("reactivefiber.")).map(descriptor => descriptor.id);
    expect(descriptors.length, "the native registration registers its four providers").toBeGreaterThanOrEqual(4);
    expect(spelled, "descriptors whose JSON spells graph test or graph validate").toEqual([]);
    expect(rfDescriptors, "the native registration's rf capabilities").toEqual([PREVIEW_ID]);
    return done(
      "A2",
      { descriptorFloorMet: true, rfDescriptors, spelled },
      descriptors.map(descriptor => `descriptor:${descriptor.id}`),
    );
  },
  B1: async () => {
    const [, clauseB] = acceptanceClauses(readBeadRow().notes);
    const pair = pairOf(clauseB ?? "");
    const testResult = GRAPH_TEST_MEMBER.result;
    const validateResult = GRAPH_VALIDATE_MEMBER.result;
    if (!isObject(testResult) || !isObject(validateResult)) throw new Error("a member lost its result");
    const codes = (rows: Json | undefined): string[] => (Array.isArray(rows) ? rows.map(row => (isObject(row) && typeof row.code === "string" ? row.code : "")) : []);
    // Each member the bead row names, read against its transcription: the verb is the command, the fact holds of the result.
    const facts = pair.map(member => {
      const envelope = MEMBERS.find(([command]) => command === member.verb.replace(" ", "."))?.[1];
      const result = envelope?.result;
      const fieldTrue = /^([a-z_]+):true$/.exec(member.fact)?.[1];
      const holds =
        envelope !== undefined &&
        isObject(result) &&
        (fieldTrue !== undefined ? result[fieldTrue] === true : codes(result.diagnostics).includes(member.fact) && codes(envelope.diagnostics).includes(member.fact));
      return { verb: member.verb, fact: member.fact, holds };
    });
    const digests = {
      graphTestEnvelope: sha256(GRAPH_TEST_MEMBER),
      graphValidateEnvelope: sha256(GRAPH_VALIDATE_MEMBER),
      unfedRow: sha256(UNFED_ROW),
      emptyDocumentRow: sha256(EMPTY_DOCUMENT_ROW),
      validationReceipt: sha256(VALIDATION_RECEIPT),
    };
    expect(pair.map(member => member.verb), "the bead row's pair").toEqual(["graph test", "graph validate"]);
    expect(facts.every(fact => fact.holds), "each member carries the fact the bead row names").toBe(true);
    expect(digests, "the transcriptions are the measured producer bytes").toStrictEqual(ROSTER.producer.digests);
    expect(Object.keys(testResult), "graph.test's result keys at the pin").toEqual(ROSTER.producer.graphTestResultKeys);
    expect(validateResult.valid, "graph validate states valid true beside the UNFED row").toBe(true);
    return done(
      "B1",
      {
        facts,
        validateValid: validateResult.valid,
        validateRuntimeCompilable: validateResult.runtime_compilable ?? null,
        validateResultCodes: codes(validateResult.diagnostics),
        validateEnvelopeCodes: codes(GRAPH_VALIDATE_MEMBER.diagnostics),
        testEnvelopeCodes: codes(GRAPH_TEST_MEMBER.diagnostics),
        digests,
      },
      pair.map(member => `member:${member.verb}`),
    );
  },
  B2: async () => {
    const members: JsonObject = {};
    for (const [command, member] of MEMBERS) {
      const provider = await providerReading(() => member);
      const reading = readingOf(member);
      members[command] = {
        provider: { error: provider.error, value: provider.value === null ? null : "projected", spawns: provider.spawns.length, argvIsRender: provider.spawns.every(argv => JSON.stringify(argv) === JSON.stringify(renderArgv(provider.root))) },
        observer: observerOutcome(reading),
        evidence: evidenceOf(reading),
      };
    }
    // The positive control: an admitted render through the same three readers is read, so each refusal is the command gate.
    const control = await providerReading(root => admittedRender(root));
    const controlReading = readingOf(admittedRender(FIXTURE_ROOT));
    const admitted = {
      provider: { error: control.error, spawns: control.spawns.length, sourceCommand: isObject(control.value) && isObject(control.value.source) ? (control.value.source.command ?? null) : null },
      observer: observerOutcome(controlReading),
      evidenceKeys: Object.keys(nativeEvidence(PREVIEW_ID, controlReading)),
    };
    for (const [command] of MEMBERS) {
      const outcome = members[command];
      expect(isObject(outcome) && isObject(outcome.provider) && outcome.provider.value, `${command}: the provider projects nothing`).toBeNull();
      expect(isObject(outcome) && isObject(outcome.observer) && outcome.observer.refused, `${command}: the observer refuses it`).toBe("validation");
      expect(isObject(outcome) && outcome.evidence, `${command}: nativeEvidence reads no field`).toStrictEqual({});
    }
    expect(admitted.provider.error, "the admitted render passes the provider").toBeNull();
    expect(admitted.provider.sourceCommand).toBe(RENDER_COMMAND);
    return done("B2", { members, admitted }, READERS.map(reader => `reader:${reader}`));
  },
  B3: async () => {
    const bead = readBeadRow();
    const [, clauseB, clauseC] = acceptanceClauses(bead.notes);
    const fields = [...trueFieldsOf(clauseB ?? ""), ...resultFieldsOf(clauseC ?? "")];
    // Each verdict field the bead names, stating validity: valid true, a passed validation receipt, an empty diagnostics list.
    const carriers: JsonObject = { valid: true, validation: VALIDATION_RECEIPT, diagnostics: [] };
    expect(Object.keys(carriers), "the carriers are exactly the verdict fields the bead row names").toEqual(fields);
    const bases: readonly (readonly [string, JsonObject])[] = [
      ["clean", admittedRender(FIXTURE_ROOT)],
      ["reportingErrors", admittedRender(FIXTURE_ROOT, 1)],
    ];
    const readings: JsonObject = {};
    for (const [name, base] of bases) {
      const plain = readingOf(base);
      const carried = readingOf(withResultFields(base, carriers));
      const plainTopology = JSON.stringify(reactivefiberTopology(plain, OBSERVER_CONTEXT));
      const carriedTopology = JSON.stringify(reactivefiberTopology(carried, OBSERVER_CONTEXT));
      const carriedEvidence = nativeEvidence(PREVIEW_ID, carried);
      readings[name] = {
        observer: observerOutcome(carried),
        projectionUnchanged: plainTopology === carriedTopology,
        evidenceUnchanged: JSON.stringify(nativeEvidence(PREVIEW_ID, plain)) === JSON.stringify(carriedEvidence),
        domainStatus: carriedEvidence.domainStatus ?? null,
        validityWords: VALIDITY_WORDS.test(carriedTopology),
      };
    }
    for (const [name] of bases) {
      const reading = readings[name];
      expect(isObject(reading) && reading.projectionUnchanged && reading.evidenceUnchanged, `${name}: the carriers change no projection`).toBe(true);
      expect(isObject(reading) && reading.validityWords, `${name}: no surfaced string claims validity`).toBe(false);
    }
    const errored = readings.reportingErrors;
    expect(isObject(errored) && isObject(errored.observer) && errored.observer.coverage, "a render reporting errors stays partial under valid true").toBe("partial");
    return done("B3", { fields, readings }, fields.map(field => `upgrade:${field}`));
  },
  C1: async () => {
    const bead = readBeadRow();
    const [, , clauseC] = acceptanceClauses(bead.notes);
    const gatedFields = resultFieldsOf(clauseC ?? "");
    const { producer } = ROSTER;
    const carried = gatedFields.filter(field => producer.graphTestResultKeys.includes(field));
    const selfDigest = producer.validationDigestDescription.startsWith("sha256: over the canonical JSON of this result without the digest itself");
    const capture: unknown = JSON.parse(readFileSync(join(REPO, LEAVES_CAPTURE), "utf8"));
    const envelope = isObject(capture) ? capture.envelope : undefined;
    const result = isObject(envelope) ? envelope.result : undefined;
    const rows = isObject(result) && Array.isArray(result.leaves) ? result.leaves : [];
    const leaves = Object.fromEntries(
      MEMBERS.map(([command]) => {
        const row = rows.find((entry: unknown) => isObject(entry) && entry.path === command);
        return [command, isObject(row) && typeof row.availability === "string" ? row.availability : null];
      }),
    );
    const captureVersion = isObject(capture) && typeof capture.rfVersion === "string" ? capture.rfVersion : null;
    const shipped = shippedOf(bead.notes);
    const contractShipped = carried.length > 0 || !selfDigest;
    expect(shipped, `the bead row ${BEAD} states the gating artifact unshipped`).toBe("Shipped: no (open bead)");
    expect(contractShipped, "graph test carries a gated field or references the validate verdict: (c) is owed with this re-measure").toBe(false);
    expect(gatedFields.filter(field => producer.graphValidateResultKeys.includes(field)), "graph validate carries both gated fields").toEqual(gatedFields);
    return done("C1", { gatedFields, carried, selfDigest, contractShipped, leaves, captureVersion, shipped }, [`gate:${shipped}`]);
  },
  C2: async () => {
    const [, , clauseC] = acceptanceClauses(readBeadRow().notes);
    const fields = resultFieldsOf(clauseC ?? "");
    const codes = codesOf(clauseC ?? "");
    // The measured rows on the envelope, as rf printed them, and the two gated fields as additive result keys.
    const printed = (root: string): JsonObject => {
      const base = withResultFields(fullShapeRf(root), { validation: VALIDATION_RECEIPT, diagnostics: [UNFED_ROW] });
      const result = base.result;
      if (!isObject(result)) throw new Error("the render lost its result");
      return {
        ...base,
        result: { ...(result as JsonObject), diagnostics_summary: { errors: 0, warnings: 2, has_errors: false, has_warnings: true } },
        diagnostics: [UNFED_ROW, EMPTY_DOCUMENT_ROW],
      };
    };
    const reading = await providerReading(printed);
    const source = isObject(reading.value) ? reading.value.source : undefined;
    const expected = printed(reading.root);
    const sourceResult = isObject(source) ? source.result : undefined;
    const envelopeRows = isObject(source) && Array.isArray(source.diagnostics) ? source.diagnostics : [];
    const carriedCodes = envelopeRows.map(row => (isObject(row) && typeof row.code === "string" ? row.code : ""));
    expect(reading.error, "the preview admits the render").toBeNull();
    expect(source, "the provider's output carries the printed envelope verbatim").toStrictEqual(expected);
    expect(JSON.stringify(envelopeRows[0]), "the UNFED row is byte-identical").toBe(JSON.stringify(UNFED_ROW));
    expect(codes.every(code => carriedCodes.includes(code)), "every code the bead row names rides the envelope").toBe(true);
    return done(
      "C2",
      {
        error: reading.error,
        spawns: reading.spawns.length,
        verbatim: JSON.stringify(source) === JSON.stringify(expected),
        carriedCodes,
        carriedFields: fields.filter(field => isObject(sourceResult) && Object.hasOwn(sourceResult, field)),
        unfedRow: sha256(envelopeRows[0]),
      },
      [...codes.map(code => `verbatim:${code}`), ...fields.map(field => `verbatim:result.${field}`)],
    );
  },
};

/** The src modules that hold the context.render command literal: every place Pi reads an rf envelope. */
function srcReaders(): string[] {
  const readers: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort(byName)) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else if (entry.isFile() && isModule(entry.name)) {
        const file = posix(relative(REPO, path));
        const tree = ts.createSourceFile(file, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, scriptKind(file));
        let holds = false;
        const find = (node: ts.Node): void => {
          if (ts.isStringLiteralLike(node) && node.text === RENDER_COMMAND) holds = true;
          if (!holds) ts.forEachChild(node, find);
        };
        find(tree);
        if (holds) readers.push(file);
      }
    }
  };
  visit(join(REPO, "src"));
  return readers;
}
/** The obligations every pin's coverage must meet together, each derived from a source outside this file and its roster. */
async function obligations(): Promise<string[]> {
  const bead = readBeadRow();
  const [, clauseB, clauseC] = acceptanceClauses(bead.notes);
  const listing = readdirSync(REPO, { withFileTypes: true });
  const walk = listing.filter(entry => entry.isDirectory() && !OUTSIDE_ROOTS.includes(entry.name)).map(entry => `walk:${entry.name}`);
  const rootConfig = listing.some(entry => entry.isFile() && ROOT_CONFIG.test(entry.name)) ? ["walk:root-config"] : [];
  const native = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  native.registerNativeProviders(registry, REPO);
  const descriptors = registry.catalogSnapshot().map(entry => `descriptor:${entry.descriptor.id}`);
  const readers = srcReaders().map(reader => `reader:${reader}`);
  const members = pairOf(clauseB ?? "").map(member => `member:${member.verb}`);
  const upgrades = [...trueFieldsOf(clauseB ?? ""), ...resultFieldsOf(clauseC ?? "")].map(field => `upgrade:${field}`);
  const gate = [`gate:${shippedOf(bead.notes)}`];
  const verbatim = [...codesOf(clauseC ?? "").map(code => `verbatim:${code}`), ...resultFieldsOf(clauseC ?? "").map(field => `verbatim:result.${field}`)];
  return [...walk, ...rootConfig, ...descriptors, ...readers, ...members, ...upgrades, ...gate, ...verbatim].sort();
}

/** A suite title: the row label with each verb spelling replaced, so a report holding this file's titles stays quiet. */
const titleOf = (row: Row): string => `${row.id} ${row.label.replace(new RegExp(`${VERB_FAMILY.source}\\w*`, "gi"), "<graph verb>")}`;

describe("wb-hs2j.5 rf shadow-test validity census (RF-REACTIVE-CONTEXT-ASSEMBLY-R6)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:3", "C:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD,
      scan: {
        verbFamily: `${VERB_FAMILY.source}/${VERB_FAMILY.flags}`,
        validityWords: `${VALIDITY_WORDS.source}/${VALIDITY_WORDS.flags}`,
        graph: GRAPH,
        verbs: VERBS,
        moduleExtensions: MODULE_EXTENSIONS,
        outsideRoots: OUTSIDE_ROOTS,
        rootConfig: `${ROOT_CONFIG.source}/${ROOT_CONFIG.flags}`,
        floors: FLOORS,
        walkAnchors: WALK_ANCHORS.map(([path, token]) => `${path}:${token}`),
        readers: READERS,
        plants: PLANTS.map(plant => `${plant.path}:${plant.flagged ? "flagged" : (plant.residual ?? "quiet")}`),
        readingTag: `${READING_TAG.source}/${READING_TAG.flags}`,
        readingPlants: READING_PLANTS.map(plant => `${plant.id}:${plant.row}:${plant.flagged ? "flagged" : (plant.residual ?? "quiet")}`),
        readingResiduals: READING_RESIDUALS,
        // Each control's planted text, held out of file by digest (wb-7rz9), so no planted needle is copied into the roster.
        plantDigests: PLANTS.map(plant => `${plant.path}:${sha256(plant.text)}`),
        readingPlantDigests: READING_PLANTS.map(plant => `${plant.id}:${sha256([plant.before, plant.after])}`),
        readingShapes: READING_PLANTS.map(plant => `${plant.id}:${tagShapeOf(plantedText(plant))}`),
        tagShapes: TAG_SHAPES,
      },
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    // The outside anchor of the rows: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const statement = statementOf(bead.notes);
    const quote = /^Source: ReactiveFiberCLI (\S+) '(.+?)' \(/m.exec(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b) and (c)").toEqual(["(a) ", "(b) ", "(c) "]);
    expect(statement.startsWith("no Pi surface shall accept graph test valid:true"), "the filing states the prohibition").toBe(true);
    const coverage = [...clauses, statement].map(clause => ROWS.filter(row => clause.length > 0 && claimsOf(row.label).includes(clause)).map(row => row.id));
    expect(coverage, "each acceptance clause equals a bounded claim of exactly one row label, and the statement one of row A's").toEqual([["A"], ["B"], ["C"], ["A"]]);
    expect(
      ROWS.map(row => claimsOf(row.label)),
      "every row label claims exactly its bead-row text, bounded on both sides: no claim truncated, extended, prefixed or added",
    ).toEqual([[statement, clauses[0]], [clauses[1]], [clauses[2]]]);
    // The reading past each label's first ": " is prose no clause binds (wb-2gzp): it holds no tag, so no tagged claim sits there unbound.
    expect(taggedReadings(ROWS), "tags in a row label's reading: a tagged claim past the first ': ' would claim beyond the label's bead-row text unbound").toEqual([]);
    expect(
      Object.fromEntries(READING_PLANTS.map(plant => [plant.id, taggedReadings(withLabel(plant.row, plantedLabel(plant))).length > 0])),
      "each reading control reads as declared",
    ).toStrictEqual(Object.fromEntries(READING_PLANTS.map(plant => [plant.id, plant.flagged])));
    expect(
      READING_PLANTS.filter(plant => JSON.stringify(claimsOf(plantedLabel(plant))) !== JSON.stringify(claimsOf(rowLabel(plant.row)))).map(plant => plant.id),
      "reading controls that change their row's bounded claims: each must pass the bounded binding, so only the reading check sees it",
    ).toEqual([]);
    // The controls anchored in the bead row: its clauses and statement, tag included, put into every row's reading at its start, at
    // its end and before a second ": ".
    const filed = ROWS.flatMap(row =>
      [...clauses, `${STATEMENT_TAG}${statement}`].flatMap(claim =>
        [plantInto(row.label, `${claim}; `, ""), plantInto(row.label, "", `; ${claim}`), plantInto(row.label, `${claim}: `, "")].map(label => ({ row, label })),
      ),
    );
    expect(filed.length, "every row reads each filed claim in three places").toBe(ROWS.length * (clauses.length + 1) * 3);
    expect(
      filed
        .filter(({ row, label }) => taggedReadings(withLabel(row.id, label)).length === 0 || JSON.stringify(claimsOf(label)) !== JSON.stringify(claimsOf(row.label)))
        .map(({ label }) => label),
      "the bead row's clauses and statement, tag included, in a row's reading: each passes the bounded binding and reads flagged",
    ).toEqual([]);
    // Each reading control is judged from its own text too (wb-7rz9): its tag shape is read off its own parentheses, never through
    // READING_TAG, so a control whose text is swapped to another shape reds even where READING_TAG still flags it.
    expect(
      [...new Set(READING_PLANTS.filter(plant => plant.flagged).map(plant => tagShapeOf(plantedText(plant))))].sort(),
      "the flagged reading controls' own tag shapes: every shape READING_TAG reads has a control of that shape, and no other shape occurs",
    ).toEqual([...TAG_SHAPES].sort());
    expect(
      READING_PLANTS.filter(plant => !plant.flagged && tagShapeOf(plantedText(plant)) !== "none").map(plant => plant.id),
      "quiet reading controls whose text holds an ASCII parenthesis: a quiet row pins a residual only while its text holds none",
    ).toEqual([]);
    // The lone shapes anchored in the bead row (wb-7rz9): each filed claim with its tag's ")" removed and, apart, with its "("
    // removed, put into every row's reading in the same three places, passes the bounded binding and READING_TAG reads its lone
    // parenthesis there, so the lone "(" and lone ")" alternatives each rest on the bead row's own clause tags, which no literal of
    // this file holds.
    const lone = ROWS.flatMap(row =>
      [...clauses, `${STATEMENT_TAG}${statement}`].flatMap(claim =>
        loneFormsOf(claim).flatMap(form =>
          [plantInto(row.label, `${form.claim}; `, ""), plantInto(row.label, "", `; ${form.claim}`), plantInto(row.label, `${form.claim}: `, "")].map(label => ({ row, label, form })),
        ),
      ),
    );
    expect(lone.length, "every row reads each filed claim's two lone-tag forms in three places").toBe(ROWS.length * (clauses.length + 1) * 2 * 3);
    expect(
      lone
        .filter(({ row, label, form }) => !taggedReadings(withLabel(row.id, label)).includes(`${row.id}: ${form.lone}`) || JSON.stringify(claimsOf(label)) !== JSON.stringify(claimsOf(row.label)))
        .map(({ form, label }) => `${form.shape}: ${label}`),
      "the bead row's claims with a lone tag in a row's reading: each passes the bounded binding and READING_TAG reads its lone parenthesis",
    ).toEqual([]);
    const quietReadings = [...new Set(READING_PLANTS.flatMap(plant => (plant.residual === undefined || plant.flagged ? [] : [plant.residual])))];
    expect(quietReadings, "every reading residual family has a pinned quiet row").toEqual(READING_RESIDUALS);
    expect({ quote: quote?.[2], citation: quote?.[1] }).toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.programPin.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const outcome = impl === undefined ? null : await impl();
          expect(outcome?.witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order, every pin reached its end, and the pins' coverage meets the outside obligations", { timeout: 60_000 }, async ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const suites: string[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") {
          suites.push(child.name);
          visit(child.tasks);
        }
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect([...suites, ...titles].filter(name => spellsVerb(name)), "registered titles spelling either verb").toEqual([]);
    expect(suites.length, "the file suite and one suite per row").toBe(ROWS.length + 1);
    const required = await obligations();
    const covered = [...COVERED.values()].flat();
    expect(
      ROWS.flatMap(row => row.pins).filter(pin => (COVERED.get(pin) ?? []).length === 0),
      "every pin measured some coverage",
    ).toEqual([]);
    expect(required.filter(obligation => !covered.includes(obligation)), "outside obligations no pin covers").toEqual([]);
    expect(covered.filter(entry => !required.includes(entry)), "coverage no outside obligation asks for").toEqual([]);
  });
});
