/**
 * wb-o4h0.7 (RF-FEDERATED-WORKSPACES-R9), the standing echo posture. Statement (bead notes, full form): "Pi shall preserve rf
 * federation typed status distinctions end-to-end — READY/UNKNOWN vs PENDING vs STALE, WITHHELD/denial/revocation vs empty, FAILED
 * vs READY-with-null-payload (shipped boundary spellings: PublicState ABSENT/VALUE/PENDING/SUPPRESSED/FAILED) — mapping no typed
 * denial, revocation or failure to null/empty, and converting no zero-row federated query without a valid producer coverage witness
 * into a claim of absence (unknown absence echoes UNKNOWN, never 'none')"
 * (docs/programs/federated-workspaces-2026-10-18/05-authority-consistency.md:34@6a251bf73af5). Acceptance: "(a)
 * suppressed/failed/pending/unknown/value-with-null-payload fixtures render distinctly; UNKNOWN and PENDING stay distinct tokens in
 * every view; (b) a guard fails if any typed failure, denial or revocation coalesces to empty/null; (c) zero rows without a coverage
 * witness renders UNKNOWN, never 'none'; with a valid producer witness the verdict echoes unchanged; (d) census: no Pi surface
 * asserts absence from an empty rf result without a producer coverage field." Gating: none (standing); the federated vocabulary
 * ships with the FW envelopes and the FW-18 query_view import (rfc-0txnl.22), unshipped.
 *
 * MEASURED AT THE INSTALLED rf (0.1.832 by `rf --json --version` result.version, 2026-10-22; read-only from its installed package):
 * domain/federation_boundary.py:29 PublicState ABSENT/VALUE/PENDING/SUPPRESSED/FAILED (the bead's operator R-015 caution cites
 * :28; the installed build spells it at :29), VALUE alone carrying bytes and FAILED alone a failure_code (:103-113);
 * domain/query_view.py:112 Verdict TRUE/FALSE/UNKNOWN, :118 Availability READY/PENDING/UNAVAILABLE (a READY view whose verdict is
 * UNKNOWN kept apart from PENDING) and :181 the coverage witness reference (witness_digest, manifest_digest); the one row vocabulary
 * Pi reads today, domain/observation.py:80-96 ObservationStatus observed/missing/null/suppressed/invalid/timeout/nonzero/truncated/
 * denied with :100 observed and null the value states (RF_OBSERVATION_NULL is an info row: "Value(null) is a value"),
 * integrations/lens_observations.py:155 STATUS_CODES, and schemas/cli/context.render.schema.json observations items (:1511
 * degraded exactly for missing/invalid/timeout/nonzero/truncated/denied, :1462 value_digest null for missing/timeout/denied). No
 * .py file of the package spells a revocation (revok|revocation: 0 files), and no rf CLI schema carries a publication state or a
 * query view (QueryViewRef is the workspace record schemas/workspace/query-view-ref.schema.json, pending its codec).
 *
 * Pi has no federation reader, and its one rf reader is the reactivefiber.render.preview pair: the provider
 * (providers/reactivefiber.ts) and its adapter (reactivefiber-observer.ts), whose one typed-status surface is the observation-row
 * leg. So the statement's trigger has not fired, and the census pins that absence and every view the obligation already reaches:
 * the registered reading (the injected-reader seam), the native reading (a stand-in rf first on PATH), the shared display form
 * every registered tool output routes through (sanitizeWorkbenchJson, src/workbench/redaction.ts) and the adapter's projection
 * (the snapshot node and its notes).
 *  A, the trigger, absent today. A1 a TypeScript AST scan of the code units of every src file - identifiers and private names,
 *    access chains, nested key paths and string, template, regular-expression and JSX text literal texts, escapes decoded;
 *    comments are never units (wb-d8io, the gate's F3) - each unit read as spelled, as its words (camel humps and separators
 *    split) and as its words singular, and each of its single words read against the matchers fused, for the federation boundary
 *    and query-view field and record names (FEDERATION_MATCHERS), with a floor, a units floor, an anchor, one positive control per
 *    matcher and the spelling, comment and composed controls (wb-d8io, the gate's F1(ii): QueryViewRef, OwnerBoundary,
 *    manifest_digest, escaped and dotted spellings). wb-yg70 widened that reading to the wb-d8io gate's F1 survivor families,
 *    each with its controls: a plural name reads singular (i: PUBLIC_STATES, witnessDigests, matched_counts, ownerBoundaries); a
 *    field fused inside one word reads through the fused matchers (ii: queryviewref, QUERYVIEWREF); an access chain reads
 *    through any head, wrapper or string-literal element key, and the key path of every object pattern, object literal and type
 *    literal nested under a member is a unit (iii: record["publication"]["state"], record!.publication!.state,
 *    (record as Rec).publication.state, load().publication.state, const { publication: { state } } = record); and every regular
 *    file below src is read, a module of any MODULE_EXTENSIONS member through its AST by its script kind and any other file whole
 *    as text, while an entry that is neither a file nor a directory reds (iv: a .mts module), the walk held to a planted scratch
 *    tree; A2 the rf roster, selected by id prefix, reactivefiber:
 *    permission or rf@ contractSource, stays the preview alone (native and injected registrations, RECONCILE_EVIDENCE_READS);
 *    A3 the native provider refuses a federation record printed by rf as an unrecognized envelope, in one spawn of the render argv;
 *    A4 the adapter refuses a reading carrying one.
 *  B, acceptance (a). B1 the fixture: the measured vocabularies and one row per status in the producer's row shape and rules;
 *    B2 the registered reading of the all-status render is byte for byte the serialization taken before the call (the reader is
 *    handed a fresh copy, so an in-place rewrite would show); B3 the native reading of it, the same, in one spawn; B4 the shared
 *    sanitizer's display of a reading carrying every row status and the federation words is byte for byte the reading; B5 each
 *    status projected alone: the two value states read complete and successful, each of the seven others partial, unknown-toned
 *    and named by its own word, no two of them alike and none like the null value; B6 the federation words PENDING, UNKNOWN,
 *    SUPPRESSED and FAILED on rows keep their own case and order, PENDING and UNKNOWN never share a note, and a reused (stale) row
 *    reads as reused, a third distinct token.
 *  C, acceptance (b). C1 the seven not-observed states in one render: seven rows counted, partial, never success; C2 each one
 *    beside the two value states, with and without the degraded flag (an rf that predates it): counted as the one not observed and
 *    named, while the values alone stay clean; C3 an rf refusal coded RF_OBSERVATION_DENIED stays a typed refusal naming the code
 *    (no reading, one spawn) and projects a failure carrying no value; C4 an unshipped word ('revoked') and an emptied one ('') are
 *    admitted, counted as not observed and echoed, never read as a value or dropped.
 *  D, acceptance (c) and (d). D1 an empty and an absent observation list add no note: the two projections are identical, the
 *    projection is held whole to the roster (every field, the workspace root normalized), so a word an empty or absent list adds
 *    anywhere in it reds whatever its wording (wb-d8io, the gate's F1(i): its G9 statusText and G10 note), and the reading carries
 *    [] verbatim (a render's own list is rf's record of that render, "[] when the render's layers carry no command binding" in the
 *    row schema, not a federated query: Pi states nothing about it, neither 'none' nor UNKNOWN, and the render keeps the coverage
 *    its other legs give it); D2 three constructed query views (READY UNKNOWN with no witness, READY FALSE with one, PENDING), the
 *    federated-query half of (c), ride the registered, native and sanitized readings byte for byte, the UNKNOWN verdict never
 *    rewritten and the witnessed verdict unchanged; D3 the absence census: across the whole battery, every surfaced string's
 *    absence wording (ABSENCE, built from ABSENCE_WORDS) is one of the producer-backed phrases (ABSENCE_ALLOWLIST), with ten
 *    controls and one per word; D4 the src string literals stating an absence of observations (OBSERVATION_ABSENCE, built from its
 *    word lists before and after the noun) are exactly two: the inspector's empty-page line, which reads Pi's own projection page
 *    (page.total===0), and the projection's thrown refusal of an empty text field, with seven controls and one per word; every
 *    battery reading projects exactly one snapshot, so no rf result empties that page. wb-d8io widened both word lists (the gate's
 *    G9, G10 and D4a wordings), measured quiet on the battery and on src at trunk 92e5ae2.
 *  Q, the residuals' quiet rows (below).
 * FIXTURES: the vocabularies are MEASURED; every envelope is CONSTRUCTED on the full-shape render fixture
 * (test/helpers/rf-render-fixture.ts): the rows follow the producer's row schema and cross-field rules, the federation words ride
 * the row status word (rf's row enum is closed; Pi reads it as open, so a word outside it reads as not observed), the query views
 * and the boundary record follow schemas/workspace/query-view-ref.schema.json and the OwnerBoundary dataclass fields and ride an
 * additive result key (the provider admits additive keys), and the refusal puts the registry's RF_OBSERVATION_DENIED (error,
 * exit 5) on a context.render failure envelope that keeps its workspace. Projections use the rf-cli seam label the native readings
 * come through: the fixture-seam label holds every render partial (wb-973.2 R2), which would hide the value/failure split.
 * FROZEN SHAPE (standing rule 16) AND OUTSIDE ANCHOR: ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set -
 * every row's id, label and pins, every pin's witness, the vocabularies, matchers, absence words, allowlist and residual map - is
 * held to the out-of-file roster test/fixtures/rf-typed-status-echo-roster.json, whose measured vocabularies drive the per-status
 * cases. The pins row by row, the residual map, the matchers and the absence words are also held to the four tables of the
 * append-only receipt docs/workbench/receipts/wb-d8io.md (wb-d8io, the gate's F2: a pin or a residual removed from every literal
 * of this file and from the roster together still stands there, and a receipt sheds no line, standing rule 15). The last case
 * holds every registered test title, its run mode and every pin's reached record to the roster, and records its own end; a
 * file-level hook reds a run in which every pin case reached its witness, or every registered test was selected to run as
 * written, while the judge neither finished nor failed (wb-d8io, the gate's F4: a skip modifier, a todo, an early return or a
 * deleted judge; wb-yg70, the wb-d8io gate's F3: an early return in a pin case beside one in the judge). The same hook first
 * reads this file's own registrations through the TypeScript AST (registrationModes) and reds on any skip mode one carries - a
 * SKIP_MODES member on a chain rooted at it, test, describe or suite (a call head, a conditional, an alias, a renamed or
 * namespace import), a computed member, an options-object mode that is not literally false, or a context skip - each form held
 * to a control (REGISTRATION_CONTROLS), so the F3 pair (the judge and one pin case skipped together, read green before) reds.
 * Non-claim: a registrar reached through any other value (an object holding it, a reflective read) is not read; its control
 * reads no mode. wb-yg70's two residuals are held to the receipt's cut-2 table, after the first entry's residual table.
 * RESIDUALS (named, each with a pinned quiet row): R-UNLISTED the note names at most four distinct not-observed words, so a fifth
 * one and beyond is the marker … and two renders differing only there share a note, while the count and every reading still
 * carry each row (Q1); R-TONE-CLASS the snapshot node's coverage, tone and statusText are Pi presentation classes, so PENDING and
 * UNKNOWN (or suppressed and denied) rows yield the same node and differ only in the note and the readings (Q2); R-NULL-AS-VALUE
 * rf's null status is a value, so a null-only and an observed-only render project identically (Q3), distinct from every failure
 * state (B5); R-ADDITIVE-UNREAD a federation record on an additive result key rides the readings verbatim but the adapter projects
 * none of it (Q4); R-COMPOSED-FIELD a field name assembled at runtime is invisible to A1's scan (A1's composed control stays 0);
 * R-ABSENCE-VOCABULARY an absence wording outside the enumerated words (ABSENCE_WORDS on a surfaced string, the OBSERVATION_ABSENCE
 * word lists on a src literal) reads quiet to D3 and D4, while D1 holds the empty and absent renders whole (Q5); R-UNENUMERATED-FIELD
 * a federation record read only through a field FEDERATION_MATCHERS does not enumerate - a generic word, or a name Pi already
 * spells for its own records (definition_digest, contract_digest, query_id, failure_code) - is invisible to A1; the constructed
 * records' fields are partitioned between the matchers and UNENUMERATED_FIELDS (Q6); R-FUSED-SPLIT (wb-yg70) a field fused
 * into a word that a case hump or a separator splits from its other words (queryViewref, QUERY_VIEWREF) reads quiet to A1, which
 * reads a fused field only inside one word: across a split it cannot be told from an English compound (publicStatement,
 * matched_counter) without a dictionary (A1's fused-split and compound controls stay 0); R-SPLIT-PATH (wb-yg70) a path whose
 * links are joined only through a local binding, a key bound elsewhere or a variable's own name
 * (const { publication: p } = record; p.state, record[KEY].state, const publication = { state }) reads quiet to A1, which joins a
 * path's links only within one access chain or one nested pattern, literal or type (A1's aliased, keyed and bound controls stay
 * 0).
 * SCOPE: the vocabularies are producer facts at the installed rf; Pi vendors no rf schema, so a producer change is seen only when a
 * re-measure re-reads them. The armed half (a federation reader echoing PublicState, availability, verdict and the coverage witness)
 * waits for the FW envelopes and FW-18 (rfc-0txnl.22): no reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src and the receipt are only read.
 */
import { chmodSync, type Dirent, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, beforeEach, describe, expect, it, type RunnerTestFile } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import {
  type ReactiveFiberProjectionTopology,
  type ReactiveFiberTopologyContext,
  reactivefiberTopology,
} from "../src/workbench/reactivefiber-observer.js";
import { sanitizeWorkbenchJson } from "../src/workbench/redaction.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { docsSection, sectionTables } from "./helpers/census.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

/** This census's own source: the file-level hook reads its registrations (wb-yg70, the wb-d8io gate's F3). */
const SELF = fileURLToPath(import.meta.url);
const HERE = dirname(SELF);
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-typed-status-echo-roster.json");
/** wb-d8io (the o4h0.7 gate's F2): the append-only receipt whose tables anchor this census's judged set from outside it. */
const RECEIPT_PATH = join(REPO, "docs", "workbench", "receipts", "wb-d8io.md");
/** The receipt's entry heading the four table sections sit under (the receipt's title, its first line, sits above it). */
const RECEIPT_ENTRY = "2026-10-24 the typed-status echo census judged set, anchored outside the census (wb-o4h0.7 gate F1-F4)";
/** wb-yg70 (the wb-d8io gate's F1 and F3): the entry its cut appended, whose one table adds residuals after the first entry's. */
const RECEIPT_CUT_2 = "2026-10-25 the typed-status echo census judged set, cut 2: A1's widened reading, two residuals and the skip-mode hook (wb-yg70, the wb-d8io gate's F1 and F3)";
/** The table sections, the entry each sits under and the header row each must keep. */
const RECEIPT_TABLES = {
  pins: { entry: RECEIPT_ENTRY, heading: "Judged pins, wb-d8io cut 1", header: ["Row", "Pin"] },
  residuals: { entry: RECEIPT_ENTRY, heading: "Residuals, wb-d8io cut 1", header: ["Residual", "Quiet row"] },
  matchers: { entry: RECEIPT_ENTRY, heading: "Federation matchers, wb-d8io cut 1", header: ["Matcher"] },
  words: { entry: RECEIPT_ENTRY, heading: "Absence words, wb-d8io cut 1", header: ["Vocabulary", "Word"] },
  residualAdditions: { entry: RECEIPT_CUT_2, heading: "Residual additions, wb-d8io cut 2", header: ["Residual", "Quiet row"] },
} as const;
const ROOT = process.cwd();
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];

/** rf's closed observation-row status vocabulary (domain/observation.py:80-96), in declaration order. */
const OBSERVATION_STATUSES: readonly string[] = ["observed", "missing", "null", "suppressed", "invalid", "timeout", "nonzero", "truncated", "denied"];
/** The value states (observation.py:100): a value was observed; null is the state of a null value. */
const VALUE_STATUSES: readonly string[] = ["observed", "null"];
/** degraded is true exactly for these (context.render.schema.json:1511). */
const DEGRADED_STATUSES: readonly string[] = ["missing", "invalid", "timeout", "nonzero", "truncated", "denied"];
/** value_digest is null for these (context.render.schema.json:1462). */
const NO_VALUE_STATUSES: readonly string[] = ["missing", "timeout", "denied"];
/** STATUS_CODES (integrations/lens_observations.py:155): observed mints no code. */
const STATUS_CODES: Readonly<Record<string, string | null>> = {
  observed: null,
  missing: "RF_OBSERVATION_MISSING",
  null: "RF_OBSERVATION_NULL",
  suppressed: "RF_OBSERVATION_SUPPRESSED",
  invalid: "RF_OBSERVATION_INVALID",
  timeout: "RF_OBSERVATION_TIMEOUT",
  nonzero: "RF_OBSERVATION_NONZERO",
  truncated: "RF_OBSERVATION_TRUNCATED",
  denied: "RF_OBSERVATION_DENIED",
};
/** PublicState (domain/federation_boundary.py:29). */
const PUBLIC_STATES: readonly string[] = ["ABSENT", "VALUE", "PENDING", "SUPPRESSED", "FAILED"];
/** Verdict (domain/query_view.py:112). */
const VERDICTS: readonly string[] = ["TRUE", "FALSE", "UNKNOWN"];
/** Availability (domain/query_view.py:118). */
const AVAILABILITIES: readonly string[] = ["READY", "PENDING", "UNAVAILABLE"];
/** The coverage witness reference (domain/query_view.py:181). */
const WITNESS_FIELDS: readonly string[] = ["witness_digest", "manifest_digest"];
/** The keys every row states (context.render.schema.json observations.items.required). */
const ROW_KEYS: readonly string[] = ["observation_id", "lens_key", "value_digest", "status", "code", "freshness", "replayed", "required", "degraded", "persisted"];
/** The federation spellings B6 places on rows: the shipped PENDING (PublicState and Availability), UNKNOWN (Verdict), SUPPRESSED
 * and FAILED (PublicState); four, the most a note names (R-UNLISTED). */
const FEDERATION_WORDS: readonly string[] = ["PENDING", "UNKNOWN", "SUPPRESSED", "FAILED"];
/** The federation boundary and query-view record field names and the two record names (QueryViewRef, OwnerBoundary) no src
 * module's code may spell today (A1), each read in a code unit as spelled and in its words (wordsOf). */
const FEDERATION_MATCHERS: readonly RegExp[] = [
  /\bpublication[\s_.-]?state\b/i,
  /\bpublic[\s_.-]?state\b/i,
  /\bwitness[\s_.-]?digest\b/i,
  /\bmanifest[\s_.-]?digest\b/i,
  /\bcompleteness[\s_.-]?reason\b/i,
  /\bmatched[\s_.-]?count\b/i,
  /\bspec[\s_.-]?digest\b/i,
  /\bresource[\s_.-]?revision\b/i,
  /\bevidence[\s_.-]?digest\b/i,
  /\bprovenance[\s_.-]?digest\b/i,
  /\bpublic[\s_.-]?port\b/i,
  /\bbackend[\s_.-]?instance[\s_.-]?id\b/i,
  /\bquery[\s_.-]?views?\b/i,
  /\bowner[\s_.-]?boundary\b/i,
  /\bfederat/i,
];
/** One spelling per matcher, in matcher order, that it alone catches: A1's positive control for each member. */
const FEDERATION_SPELLINGS: readonly string[] = [
  "publication_state",
  "PublicState",
  "witness_digest",
  "manifest_digest",
  "completeness_reason",
  "matched_count",
  "spec_digest",
  "resource_revision",
  "evidence_digest",
  "provenance_digest",
  "public_port",
  "backend_instance_id",
  "QueryViewRef",
  "OwnerBoundary",
  "federated",
];
/** wb-yg70 (the wb-d8io gate's F1(ii)): each matcher with its word boundaries and separators taken out, read inside one word of
 * a code unit (and that word with -ies read -y), so a field fused into a single word (queryviewref, QUERYVIEWREF) is caught. */
const FUSED_MATCHERS: readonly RegExp[] = FEDERATION_MATCHERS.map(matcher => new RegExp(matcher.source.split("\\b").join("").split("[\\s_.-]?").join(""), "i"));
/** wb-yg70 (F1(iv)): the module extensions A1 and D4 read through the TypeScript AST, each by its script kind (scriptKindOf); A1
 * reads any other regular file below src whole as text. */
const MODULE_EXTENSIONS: readonly string[] = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** wb-yg70 (the wb-d8io gate's F3): the registration members that leave a case unrun or inverted (vitest 4.1.10's flags and
 * methods, as test/workbench-tsx-worker-document-census.test.ts reads them), the options-object keys read as one unless
 * literally false, and the registration functions they ride on. */
const SKIP_MODES: readonly string[] = ["skip", "todo", "only", "fails", "skipIf", "runIf"];
const OPTION_MODES: readonly string[] = ["skip", "todo", "only", "fails"];
const REGISTRARS: readonly string[] = ["it", "test", "describe", "suite"];
/** The constructed federation records' fields no matcher catches (R-UNENUMERATED-FIELD, Q6): generic words, and names Pi already
 * spells for its own records (definition_digest, contract_digest, query_id, failure_code: measured in src at trunk 92e5ae2). */
const UNENUMERATED_FIELDS: readonly string[] = [
  "availability",
  "complete",
  "contract_digest",
  "coverage",
  "cursor",
  "definition_digest",
  "epoch",
  "failure_code",
  "generation",
  "position",
  "query_id",
  "resource",
  "resource_name",
  "schema",
  "schema_digest",
  "scope",
  "sensitivity",
  "sources",
  "stream_id",
  "value",
  "verdict",
  "view_revision",
  "workspace_id",
];
/** The absence words D3 reads in a surfaced string; wb-d8io added unavailable through unobserved (the gate's G9/G10 wording class),
 * measured quiet on the battery at trunk 92e5ae2. */
const ABSENCE_WORDS: readonly string[] = ["none", "no", "nothing", "absent", "empty", "zero", "unavailable", "lacking", "lacks", "without", "nil", "void", "blank", "unrecorded", "unobserved"];
/** Absence wording in a surfaced string (D3): an absence word, or a standalone 0 (never the 0 of a dotted release or a digit run). */
const ABSENCE = new RegExp(`\\b(?:${ABSENCE_WORDS.join("|")})\\b|(?<![\\w.])0(?![\\w.])`, "i");
/** The absence wording a surfaced string may carry, each backed by a producer field or naming the host's own input. */
const ABSENCE_ALLOWLIST: readonly string[] = [
  "0 authoritative storage writes (envelope storage_write_count)",
  "0 reused",
  "0 errors",
  "0 warnings",
  "necessity evals 0",
  "no native interval supplied",
];
/** The inspector's empty-page line (src/ui/workflow-inspector.ts), the one src literal displaying an absence of observations. */
const INSPECTOR_EMPTY = "No source observations for this invocation; no graph or timeline is inferred.";
/** The projection's refusal of an empty text field (src/workbench/observation.ts), the one other such literal: a thrown error. */
const PROJECTION_REFUSAL = "Observation <expr> is empty, unsafe or exceeds payload limit.";
/** The words D4 reads before and after the noun in a src literal; wb-d8io added zero, without and nothing before it and unavailable
 * through unobserved after it (the gate's D4a wording class), measured: still exactly the two literals at trunk 92e5ae2. */
const OBSERVATION_ABSENCE_BEFORE: readonly string[] = ["no", "zero", "without", "nothing"];
const OBSERVATION_ABSENCE_AFTER: readonly string[] = ["none", "absent", "empty", "unavailable", "lacking", "nil", "zero", "unrecorded", "unobserved"];
/** A src literal stating an absence of observations (D4). */
const OBSERVATION_ABSENCE = new RegExp(
  `\\b(?:${OBSERVATION_ABSENCE_BEFORE.join("|")})\\b[^.;]{0,40}\\bobservations?\\b|\\bobservations?\\b[^.;]{0,20}\\b(?:${OBSERVATION_ABSENCE_AFTER.join("|")})\\b`,
  "i",
);
/** Each residual and its pinned quiet row; wb-yg70 added the last two, held to the receipt's cut-2 table. */
const RESIDUALS: Readonly<Record<string, string>> = {
  "R-UNLISTED": "Q1",
  "R-TONE-CLASS": "Q2",
  "R-NULL-AS-VALUE": "Q3",
  "R-ADDITIVE-UNREAD": "Q4",
  "R-COMPOSED-FIELD": "A1",
  "R-ABSENCE-VOCABULARY": "Q5",
  "R-UNENUMERATED-FIELD": "Q6",
  "R-FUSED-SPLIT": "A1",
  "R-SPLIT-PATH": "A1",
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(trigger, absent today) Pi reads no rf federation status record: no src file's code (identifiers, access chains, nested key paths and literals, each read as spelled, as its words, singular and fused within one word; a non-module file whole; comments are never read) spells a federation boundary or query-view field or record name FEDERATION_MATCHERS enumerates, the rf roster stays reactivefiber.render.preview alone, and both readers refuse a federation record as an envelope",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(a) suppressed, failed, pending, unknown and value-with-null-payload fixtures render distinctly: every shipped row status keeps its own word in the registered, native and shared-sanitizer readings and its own projection, and PENDING, UNKNOWN and a reused (stale) row stay distinct tokens",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6"],
  },
  {
    id: "C",
    label: "(b) no typed failure, denial or revocation coalesces to empty or null: every not-observed row is counted and demotes, value rows never absorb one, an rf refusal stays a typed refusal naming its code, and an unshipped or emptied word is echoed and counted, never dropped",
    pins: ["C1", "C2", "C3", "C4"],
  },
  {
    id: "D",
    label:
      "(c) and (d) zero rows without a coverage witness never render an absence claim: an empty or absent observation list adds no note and projects exactly its held projection, a constructed query view's UNKNOWN, witnessed FALSE and PENDING ride every reading verbatim, and no surfaced string or src literal asserts absence in the enumerated absence words beyond the producer-backed counts",
    pins: ["D1", "D2", "D3", "D4"],
  },
  {
    id: "Q",
    label:
      "residuals, each a pinned quiet row: R-UNLISTED (a fifth distinct word is unnamed), R-TONE-CLASS (demoting words share the node's partial class), R-NULL-AS-VALUE (a null value projects as a value), R-ADDITIVE-UNREAD (a federation record on an additive key projects nothing), R-ABSENCE-VOCABULARY (an absence wording outside the enumerated words reads quiet) and R-UNENUMERATED-FIELD (a record field no matcher enumerates is unseen by A1)",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
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
interface Vocabularies {
  readonly observationStatuses: readonly string[];
  readonly valueStatuses: readonly string[];
  readonly degradedStatuses: readonly string[];
  readonly noValueStatuses: readonly string[];
  readonly statusCodes: Readonly<Record<string, string | null>>;
  readonly publicStates: readonly string[];
  readonly verdicts: readonly string[];
  readonly availabilities: readonly string[];
  readonly witnessFields: readonly string[];
}
interface AbsenceWords {
  readonly surfaced: readonly string[];
  readonly literalBefore: readonly string[];
  readonly literalAfter: readonly string[];
}
interface Roster {
  readonly rfVersion: string;
  readonly vocabularies: Vocabularies;
  readonly federationMatchers: readonly string[];
  readonly absenceAllowlist: readonly string[];
  readonly absenceWords: AbsenceWords;
  readonly residuals: Readonly<Record<string, string>>;
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function stringMap(value: unknown, field: string, nullable: boolean): Record<string, string | null> {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  const entries = Object.entries(value).map(([key, item]): [string, string | null] => {
    if (typeof item === "string" || (nullable && item === null)) return [key, item];
    throw new Error(`roster ${field}.${key} must be a string${nullable ? " or null" : ""}`);
  });
  return Object.fromEntries(entries);
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.vocabularies)) throw new Error("roster must be an object with rows and vocabularies");
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
  const vocabulary = raw.vocabularies;
  if (typeof raw.rfVersion !== "string") throw new Error("roster needs rfVersion");
  const absence = raw.absenceWords;
  if (!isObject(absence)) throw new Error("roster needs absenceWords");
  return {
    rfVersion: raw.rfVersion,
    vocabularies: {
      observationStatuses: strings(vocabulary.observationStatuses, "vocabularies.observationStatuses"),
      valueStatuses: strings(vocabulary.valueStatuses, "vocabularies.valueStatuses"),
      degradedStatuses: strings(vocabulary.degradedStatuses, "vocabularies.degradedStatuses"),
      noValueStatuses: strings(vocabulary.noValueStatuses, "vocabularies.noValueStatuses"),
      statusCodes: stringMap(vocabulary.statusCodes, "vocabularies.statusCodes", true),
      publicStates: strings(vocabulary.publicStates, "vocabularies.publicStates"),
      verdicts: strings(vocabulary.verdicts, "vocabularies.verdicts"),
      availabilities: strings(vocabulary.availabilities, "vocabularies.availabilities"),
      witnessFields: strings(vocabulary.witnessFields, "vocabularies.witnessFields"),
    },
    federationMatchers: strings(raw.federationMatchers, "federationMatchers"),
    absenceAllowlist: strings(raw.absenceAllowlist, "absenceAllowlist"),
    absenceWords: {
      surfaced: strings(absence.surfaced, "absenceWords.surfaced"),
      literalBefore: strings(absence.literalBefore, "absenceWords.literalBefore"),
      literalAfter: strings(absence.literalAfter, "absenceWords.literalAfter"),
    },
    residuals: Object.fromEntries(Object.entries(stringMap(raw.residuals, "residuals", false)).map(([key, item]) => [key, String(item)])),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();
/** The per-status cases iterate the roster's measured vocabulary, an anchor outside this file's literals. */
const MEASURED = ROSTER.vocabularies;
const NOT_OBSERVED = MEASURED.observationStatuses.filter(status => !MEASURED.valueStatuses.includes(status));

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

const digest = (fill: string): string => `sha256:${fill.repeat(64)}`;
const VALUE_DIGEST = digest("c");

/** One observation row in the producer's row shape for `status`: its code, degraded flag and value digest by the measured rules
 * (a word outside the vocabulary gets no code and no degraded flag), fresh and captured at render unless `over` says otherwise. */
function rowOf(status: string, index = 0, over: JsonObject = {}): JsonObject {
  const known = MEASURED.observationStatuses.includes(status);
  return {
    observation_id: `rfl_${"0123456789abcdefghijk"}${index.toString(36)}`,
    lens_key: `peer.key${index}`,
    value_digest: MEASURED.noValueStatuses.includes(status) ? null : VALUE_DIGEST,
    status,
    code: known ? (MEASURED.statusCodes[status] ?? null) : null,
    freshness: "captured_at_render",
    replayed: false,
    required: false,
    degraded: MEASURED.degradedStatuses.includes(status),
    persisted: false,
    ...over,
  };
}
function rowsOf(statuses: readonly string[]): JsonObject[] {
  return statuses.map((status, index) => rowOf(status, index));
}

/** The full-shape render with `result` fields replaced or added. */
function renderWith(result: JsonObject): JsonObject {
  const base = json(fullShapeRf(ROOT));
  if (!isObject(base) || !isObject(base.result)) throw new Error("the full-shape fixture must carry an object result");
  return { ...(base as JsonObject), result: { ...(base.result as JsonObject), ...result } };
}
const rendered = (rows: readonly JsonValue[]): JsonObject => renderWith({ observations: [...rows] });
/** The full-shape render without result.observations (an rf that states none). */
function renderedWithout(): JsonObject {
  const envelope = renderWith({});
  const result = { ...(envelope.result as JsonObject) };
  delete result.observations;
  return { ...envelope, result };
}

const VIEW_BASE: JsonObject = {
  schema: "reactive-fiber.query-view-ref/v1",
  query_id: "peer.blocked",
  spec_digest: digest("5"),
  scope: "workspace",
  generation: 3,
  view_revision: 1,
};
/** READY, verdict UNKNOWN, zero rows and no coverage witness. */
const VIEW_UNWITNESSED: JsonObject = {
  ...VIEW_BASE,
  availability: "READY",
  verdict: "UNKNOWN",
  manifest_digest: digest("6"),
  sources: ["peer.beads"],
  matched_count: 0,
  complete: false,
  completeness_reason: "coverage-unwitnessed",
  coverage: null,
};
/** READY, verdict FALSE, zero rows and a producer coverage witness. */
const VIEW_WITNESSED: JsonObject = { ...VIEW_UNWITNESSED, verdict: "FALSE", complete: true, completeness_reason: "coverage-witnessed", coverage: digest("7") };
/** PENDING: every engine field null. */
const VIEW_PENDING: JsonObject = {
  ...VIEW_BASE,
  availability: "PENDING",
  verdict: null,
  manifest_digest: null,
  sources: null,
  matched_count: null,
  complete: null,
  completeness_reason: null,
  coverage: null,
};
const VIEWS: readonly JsonObject[] = [VIEW_UNWITNESSED, VIEW_WITNESSED, VIEW_PENDING];
/** An OwnerBoundary-shaped record (federation_boundary.py:78-94 fields) in the FAILED state: no value, a failure code. */
const BOUNDARY_FAILED: JsonObject = {
  resource: {
    workspace_id: `rfw_${"b".repeat(22)}`,
    backend_instance_id: `rfi_${"b".repeat(22)}`,
    resource_name: "peer.beads",
    public_port: "peer.port",
    definition_digest: digest("8"),
    schema_digest: digest("9"),
    contract_digest: digest("a"),
  },
  resource_revision: "r1",
  cursor: { epoch: "e1", stream_id: "peer.stream", position: 4 },
  publication_state: "FAILED",
  value: null,
  evidence_digest: digest("b"),
  provenance_digest: digest("d"),
  sensitivity: "internal",
  failure_code: "peer-unavailable",
};

/** The render refusal coded RF_OBSERVATION_DENIED (registry: error, exit 5), keeping the envelope's workspace. */
function deniedRefusal(): JsonObject {
  const envelope = renderWith({});
  return {
    ...envelope,
    ok: false,
    result: null,
    diagnostics: [
      {
        code: "RF_OBSERVATION_DENIED",
        severity: "error",
        message: "the host policy refused the observation before spawn",
        hint: "grant the capability or drop the binding",
        source: null,
        metadata: { reason: "policy", capability: "peer.read" },
      },
    ],
  };
}

const CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" },
  seam: "rf-cli",
  capturedAt: "2026-10-22T00:00:00Z",
  observedAt: "2026-10-22T00:00:01Z",
};
function readingOf(source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source };
}
function project(source: JsonValue): ReactiveFiberProjectionTopology {
  return reactivefiberTopology(readingOf(source), CONTEXT);
}
function observationNotes(topology: ReactiveFiberProjectionTopology): string[] {
  return topology.diagnostics.filter(note => note.startsWith("observations: "));
}
interface Shape {
  coverage: string | null;
  tone: string | null;
  notes: string[];
}
function shapeOf(topology: ReactiveFiberProjectionTopology): Shape {
  const snapshot = topology.snapshots[0];
  return { coverage: snapshot?.coverage ?? null, tone: snapshot?.node.statusTone ?? null, notes: observationNotes(topology) };
}
function shapeJson(shape: Shape): JsonValue {
  return { coverage: shape.coverage, tone: shape.tone, notes: [...shape.notes] };
}
/** Every key and every string value anywhere in a value: what any display of it can show. */
function surfacedStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(surfacedStrings);
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [key, ...surfacedStrings(item)]);
  return [];
}

function objectOf(value: JsonValue | null | undefined, field: string): JsonObject {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return value as JsonObject;
}
function sourceOf(reading: JsonValue | null): JsonObject {
  return objectOf(objectOf(reading, "reading").source, "reading source");
}
function resultRows(source: JsonObject): JsonObject[] {
  const result = objectOf(source.result, "source result");
  const rows = result.observations;
  if (!Array.isArray(rows)) throw new Error("source result.observations must be a list");
  return rows.map((row, index) => objectOf(row, `observations[${index}]`));
}
/** Each row's typed fields as a view carries them: status, code, degraded and whether a value digest is present. */
function rowFields(source: JsonObject): string[] {
  return resultRows(source).map(row => `${String(row.status)}|${String(row.code)}|${String(row.degraded)}|${row.value_digest === null ? "no-value" : "value"}`);
}
function viewFields(source: JsonObject): string[] {
  const result = objectOf(source.result, "source result");
  const views = result.query_views;
  if (!Array.isArray(views)) throw new Error("source result.query_views must be a list");
  return views.map((item, index) => {
    const view = objectOf(item, `query_views[${index}]`);
    return `${String(view.availability)}|${String(view.verdict)}|${String(view.matched_count)}|${view.coverage === null ? "no-witness" : "witness"}`;
  });
}

/** Every regular file below a root, and every entry that is neither a file nor a directory - a symbolic link (never followed) or
 * a socket, which no read vouches for (wb-yg70, the wb-d8io gate's F1(iv)); a path that vanishes mid-walk holds nothing. */
function entriesBelow(directory: string): { files: string[]; others: string[] } {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return { files: [], others: [] };
  }
  const files: string[] = [];
  const others: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      const below = entriesBelow(path);
      files.push(...below.files);
      others.push(...below.others);
    } else if (entry.isFile()) files.push(path);
    else others.push(path);
  }
  return { files, others };
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** Whether a file is a module A1 and D4 read through the TypeScript AST (MODULE_EXTENSIONS). */
function isModule(path: string): boolean {
  return MODULE_EXTENSIONS.some(extension => path.endsWith(extension));
}
/** The script kind a module parses as: TSX for .tsx, TS for .ts, .mts and .cts, and JSX (a superset of JS) for the rest. */
function scriptKindOf(path: string): ts.ScriptKind {
  if (path.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (path.endsWith(".ts") || path.endsWith(".mts") || path.endsWith(".cts")) return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}
/** The src modules D4 reads: every module below src, of any MODULE_EXTENSIONS member (wb-yg70; .ts alone before). */
function srcModules(): string[] {
  return entriesBelow(join(REPO, "src")).files.filter(isModule);
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `stdout` and exits `exit`. */
function standInRf(stdout: JsonValue, exit: number): string {
  const folder = makeScratch("rf-typed-status-echo-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(stdout))});`,
      `process.exit(${exit});`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log).trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as string[]);
}
/** The verb a spawn ran: the two argv words after `--workspace <root>`. */
function verbOf(spawns: readonly string[][]): string[] {
  return (spawns[0] ?? []).slice(2, 4);
}

function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}

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
interface NativeOutcome {
  readonly refusal: { category: string; message: string } | null;
  readonly reading: JsonValue | null;
  readonly spawns: string[][];
}
/** One registry invocation of the NATIVE preview against a stand-in rf printing `stdout`. */
async function nativeOutcome(stdout: JsonValue, exit: number): Promise<NativeOutcome> {
  const log = standInRf(stdout, exit);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  let reading: JsonValue | null = null;
  let refusal: { category: string; message: string } | null = null;
  try {
    reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { refusal, reading, spawns: spawnsOf(log) };
}
/** One registry invocation of the INJECTED preview whose reader answers a fresh copy of `envelope`, with the serialization taken
 * before the call: a reader or registry that rewrote the rows in place could not match it. */
async function injectedReading(envelope: JsonObject): Promise<{ reading: JsonValue; calls: number; before: string }> {
  const before = JSON.stringify(envelope);
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(
    registry,
    async () => {
      calls += 1;
      return JSON.parse(before) as Envelope;
    },
    ROOT,
  );
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  return { reading, calls, before };
}

let nativeCatalog: Promise<{ id: string; permissions: string[]; contractSource: string | null }[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<{ id: string; permissions: string[]; contractSource: string | null }[]> {
  nativeCatalog ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(({ descriptor }) => ({ id: descriptor.id, permissions: [...descriptor.permissions], contractSource: descriptor.contractSource ?? null }));
  });
  return nativeCatalog;
}
/** An rf descriptor by any route: the id prefix, a reactivefiber: permission or an rf@ contractSource. */
function isRfDescriptor(descriptor: { id: string; permissions: readonly string[]; contractSource: string | null }): boolean {
  return descriptor.id.startsWith("reactivefiber.") || descriptor.permissions.some(grant => grant.startsWith("reactivefiber:")) || (descriptor.contractSource ?? "").startsWith("rf@");
}

/** The string and template literal texts of one module (no comments). */
function literalTexts(fileName: string, text: string): string[] {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, scriptKindOf(fileName));
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) found.push(node.text);
    if (ts.isTemplateExpression(node)) found.push([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join("<expr>"));
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}

/** A code unit's words: camel humps and every non-alphanumeric run split to single spaces, lower-cased, so QueryViewRef,
 * readPublicationState, publication.state and PUBLICATION_STATE read as the field's own words. */
function wordsOf(unit: string): string {
  return unit
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[^A-Za-z\d]+/g, " ")
    .trim()
    .toLowerCase();
}
/** A word's singular (wb-yg70, the wb-d8io gate's F1(i)): a trailing -ies reads -y and a trailing -s, never -ss, is dropped. */
function singularOf(word: string): string {
  if (word.length > 3 && word.endsWith("ies")) return `${word.slice(0, -3)}y`;
  return word.length > 1 && word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word;
}
/** A code unit's words, each singular, so PUBLIC_STATES, witnessDigests, matched_counts and ownerBoundaries read as the field's
 * own words. */
function singularWords(unit: string): string {
  return wordsOf(unit).split(" ").map(singularOf).join(" ");
}
/** A code unit's single words, each also with -ies read -y, which the fused matchers read whole (wb-yg70, F1(ii)): a word no case
 * hump or separator splits can carry a field fused inside it (queryviewref, QUERYVIEWREF, readpublicationstate). */
function fusedWords(unit: string): string[] {
  return wordsOf(unit)
    .split(" ")
    .flatMap(word => [word, word.split("ies").join("y")]);
}
/** An expression with its wrappers taken off: parentheses, a non-null assertion and the as, satisfies and angle-bracket type
 * assertions, none of which changes the record a chain reads. */
function unwrapped(node: ts.Expression): ts.Expression {
  let at = node;
  while (ts.isParenthesizedExpression(at) || ts.isNonNullExpression(at) || ts.isAsExpression(at) || ts.isSatisfiesExpression(at) || ts.isTypeAssertionExpression(at)) at = at.expression;
  return at;
}
/** The names of an access chain (wb-yg70, the wb-d8io gate's F1(iii)): its head when an identifier or this, then each property
 * name and string-literal element key along it, through the wrappers above and the callee of a call, so
 * record["publication"]["state"], record!.publication!.state, (record as Rec).publication.state and load().publication.state
 * each name publication and state in order. Any other head names nothing, and a computed key that is not a literal adds no name
 * (R-SPLIT-PATH). */
function chainNames(node: ts.Expression): string[] {
  const at = unwrapped(node);
  if (ts.isIdentifier(at)) return [at.text];
  if (at.kind === ts.SyntaxKind.ThisKeyword) return ["this"];
  if (ts.isPropertyAccessExpression(at)) return [...chainNames(at.expression), at.name.text];
  if (ts.isElementAccessExpression(at)) {
    const key = unwrapped(at.argumentExpression);
    return [...chainNames(at.expression), ...(ts.isStringLiteralLike(key) ? [key.text] : [])];
  }
  if (ts.isCallExpression(at)) return chainNames(at.expression);
  return [];
}
/** A member key's text: an identifier, private name, string or numeric literal; a computed key has none. */
function keyText(name: ts.Node | undefined): string | undefined {
  if (name !== undefined && (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name))) return name.text;
  return undefined;
}
/** An element key's literal text: a string or numeric literal; any other key (an identifier, an expression) is computed. */
function literalKey(node: ts.Expression): string | undefined {
  const key = unwrapped(node);
  return ts.isStringLiteralLike(key) || ts.isNumericLiteral(key) ? key.text : undefined;
}
/** The key of a member of an object pattern, object literal, type literal, interface or class; a rest element has none. */
function memberKey(node: ts.Node): string | undefined {
  if (ts.isBindingElement(node)) return ts.isObjectBindingPattern(node.parent) && node.dotDotDotToken === undefined ? keyText(node.propertyName ?? node.name) : undefined;
  if (ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node) || ts.isPropertySignature(node) || ts.isPropertyDeclaration(node)) return keyText(node.name);
  if (ts.isMethodDeclaration(node) || ts.isMethodSignature(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node)) return keyText(node.name);
  return undefined;
}
/** The nodes a nested object sits in without a key of its own: array patterns and their elements, array literals, the
 * expression wrappers, and array, tuple, union, intersection, parenthesized and generic types. */
function passesThrough(node: ts.Node): boolean {
  return (
    ts.isArrayBindingPattern(node) ||
    (ts.isBindingElement(node) && ts.isArrayBindingPattern(node.parent)) ||
    ts.isArrayLiteralExpression(node) ||
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isTypeAssertionExpression(node) ||
    ts.isNonNullExpression(node) ||
    ts.isArrayTypeNode(node) ||
    ts.isTupleTypeNode(node) ||
    ts.isUnionTypeNode(node) ||
    ts.isIntersectionTypeNode(node) ||
    ts.isParenthesizedTypeNode(node) ||
    ts.isTypeReferenceNode(node)
  );
}
/** The keys enclosing an object pattern, object literal or type literal, outermost first (wb-yg70, F1(iii)): the member it is the
 * value or type of, that member's own enclosing keys, and so on, through the pass-through nodes. A variable or parameter name is
 * no key (R-SPLIT-PATH). */
function enclosingKeys(container: ts.Node): string[] {
  let at: ts.Node | undefined = container.parent;
  while (at !== undefined && passesThrough(at)) at = at.parent;
  const key = at === undefined ? undefined : memberKey(at);
  return at === undefined || key === undefined ? [] : [...enclosingKeys(at.parent), key];
}
/** The code units of one module by its TypeScript AST (A1): every identifier and private name, every string, template,
 * regular-expression and JSX text literal (escapes decoded by the parser), every access chain of two names or more joined by
 * dots (chainNames), and the key path of every member of an object pattern, object literal or type literal nested under a member
 * (wb-yg70: const { publication: { state } } = record reads publication.state). Comments are trivia, never units (wb-d8io, the
 * gate's F3: a comment reads no field). */
function codeUnits(fileName: string, text: string): string[] {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, scriptKindOf(fileName));
  const units: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node) || ts.isStringLiteralLike(node) || ts.isRegularExpressionLiteral(node) || ts.isJsxText(node)) units.push(node.text);
    else if (ts.isTemplateExpression(node)) units.push([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join("<expr>"));
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const chain = chainNames(node);
      if (chain.length > 1) units.push(chain.join("."));
    }
    if (ts.isObjectBindingPattern(node) || ts.isObjectLiteralExpression(node) || ts.isTypeLiteralNode(node)) {
      const outer = enclosingKeys(node);
      const members: readonly ts.Node[] = ts.isObjectBindingPattern(node) ? node.elements : ts.isObjectLiteralExpression(node) ? node.properties : node.members;
      const keys = outer.length === 0 ? [] : members.map(memberKey).filter((key): key is string => key !== undefined);
      for (const key of keys) units.push([...outer, key].join("."));
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return units;
}
/** A file's code units (A1): a module's through its AST, any other file's whole text as one unit (wb-yg70, F1(iv)). */
function fileUnits(file: string): string[] {
  const text = textOf(file);
  return isModule(file) ? codeUnits(relative(REPO, file), text) : [text];
}
/** The FEDERATION_MATCHERS a module's code units spell, by source in matcher order: in a unit as spelled, in its words or in its
 * words singular, or (that matcher fused) inside one of its single words. */
function matcherHits(units: readonly string[]): string[] {
  const unique = [...new Set(units)];
  const spelled = [...unique, ...unique.map(wordsOf), ...unique.map(singularWords)];
  const words = [...new Set(unique.flatMap(fusedWords))];
  return FEDERATION_MATCHERS.filter((matcher, index) => spelled.some(unit => matcher.test(unit)) || words.some(word => FUSED_MATCHERS[index]?.test(word) === true)).map(
    matcher => matcher.source,
  );
}
/** The FEDERATION_MATCHERS one module's code spells: A1's controls and Q6 read planted modules through it. */
function federationHits(fileName: string, text: string): string[] {
  return matcherHits(codeUnits(fileName, text));
}
/** Every key of a JSON object, nested objects included (Q6 reads the constructed federation records' fields). */
function fieldNames(value: unknown): string[] {
  return isObject(value) ? Object.entries(value).flatMap(([key, item]) => [key, ...fieldNames(item)]) : [];
}
/** A JSON value with the workspace root normalized to <root> in every string: the one host-dependent value a projection carries. */
function rootless(value: JsonValue): JsonValue {
  if (typeof value === "string") return value.split(ROOT).join("<root>");
  if (Array.isArray(value)) return value.map(rootless);
  if (value !== null && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, rootless(item)]));
  return value;
}

/**
 * The body rows of one table section of the receipt, read through the shared docs reader (test/helpers/census.ts): the section
 * must render exactly one table and nothing else, carry no HTML (a comment or a tag) and keep its header, so a line added to the
 * append-only receipt can neither hide a row (a comment, an HTML block, a code fence) nor split the table and restate it. A cell
 * is the table's source text. The title heading each table's entry sits under is the receipt's own first line.
 */
function receiptTable(table: { readonly entry: string; readonly heading: string; readonly header: readonly string[] }): string[][] {
  const markdown = readFileSync(RECEIPT_PATH, "utf8");
  const parents = [(markdown.split("\n")[0] ?? "").replace(/^# /, ""), table.entry];
  const where = `docs/workbench/receipts/wb-d8io.md section "${table.heading}"`;
  const section = docsSection(markdown, table.heading, 3, parents);
  if (!section.ok) throw new Error(`${where}: ${section.why}`);
  if (section.hasHtml) throw new Error(`${where} carries HTML, which can hide a row of its table`);
  const kinds = section.blocks.map(block => (block.kind === "other" ? `other:${block.type}` : block.kind));
  if (JSON.stringify(kinds) !== JSON.stringify(["other:table"])) throw new Error(`${where} must render exactly one table and nothing else; it renders [${kinds.join(", ")}]`);
  const [head, ...rows] = sectionTables(markdown, table.heading, 3, parents).grids[0] ?? [];
  if (JSON.stringify(head ?? null) !== JSON.stringify(table.header)) throw new Error(`${where}: its header row is ${JSON.stringify(head ?? null)}; the census binds ${JSON.stringify(table.header)}`);
  return rows.map(row => [...row]);
}

/** Every absence wording left in a string once the allowlisted phrases are cut out of it. */
function absenceResidue(texts: readonly string[]): { phrases: string[]; residue: string[] } {
  const phrases = new Set<string>();
  const residue: string[] = [];
  for (const text of texts) {
    let rest = text;
    for (const phrase of ABSENCE_ALLOWLIST) {
      if (!rest.includes(phrase)) continue;
      phrases.add(phrase);
      rest = rest.split(phrase).join(" | ");
    }
    if (ABSENCE.test(rest)) residue.push(text);
  }
  return { phrases: [...phrases].sort(), residue };
}

/** The battery D3 and D4 project: every render this census builds. */
function battery(): { name: string; source: JsonObject }[] {
  return [
    ...MEASURED.observationStatuses.map(status => ({ name: `alone:${status}`, source: rendered([rowOf(status)]) })),
    { name: "all-statuses", source: rendered(rowsOf(MEASURED.observationStatuses)) },
    { name: "federation-words", source: rendered(rowsOf(FEDERATION_WORDS)) },
    ...FEDERATION_WORDS.map(word => ({ name: `alone:${word}`, source: rendered([rowOf(word)]) })),
    { name: "not-observed", source: rendered(rowsOf(NOT_OBSERVED)) },
    ...NOT_OBSERVED.map(status => ({ name: `beside-values:${status}`, source: rendered(rowsOf(["observed", "null", status])) })),
    { name: "values", source: rendered(rowsOf(["observed", "null"])) },
    { name: "reused", source: rendered([rowOf("observed", 0, { freshness: "reused", replayed: true })]) },
    { name: "revoked", source: rendered([rowOf("revoked")]) },
    { name: "emptied", source: rendered([rowOf("")]) },
    { name: "empty-list", source: rendered([]) },
    { name: "absent-list", source: renderedWithout() },
    { name: "query-views", source: renderWith({ query_views: [...VIEWS] }) },
    { name: "boundary-record", source: renderWith({ federation_boundary: BOUNDARY_FAILED }) },
    { name: "refusal", source: deniedRefusal() },
  ];
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    // wb-yg70 (the wb-d8io gate's F1(iv)): every regular file below src, a module through its AST and any other file whole.
    const tree = entriesBelow(join(REPO, "src"));
    const files = tree.files;
    const anchor = join(REPO, "src", "workbench", "providers", "reactivefiber.ts");
    const anchorUnits = files.includes(anchor) ? codeUnits(relative(REPO, anchor), textOf(anchor)) : [];
    // The anchor is read twice over: its text carries the render argv and its code units carry both verb words.
    const anchorRead = textOf(anchor).includes('"context","render"') && anchorUnits.includes("context") && anchorUnits.includes("render");
    const floorMet = files.length >= 100;
    let units = 0;
    const hits: string[] = [];
    for (const file of files) {
      const read = fileUnits(file);
      units += read.length;
      for (const source of matcherHits(read)) hits.push(`${relative(REPO, file)}: ${source}`);
    }
    const unitsFloorMet = units >= 50_000;
    const others = tree.others.map(entry => relative(REPO, entry));
    expect(floorMet, `src files walked: ${files.length}`).toBe(true);
    expect(unitsFloorMet, `src code units read: ${units}`).toBe(true);
    expect(anchorRead, "the anchor providers/reactivefiber.ts was not read with its render argv").toBe(true);
    expect(others, "an src entry that is neither a file nor a directory, which no read vouches for").toEqual([]);
    expect(hits, "a federation field in src code needs the FW envelopes and FW-18 (rfc-0txnl.22)").toEqual([]);
    const control = (text: string): number => federationHits("control.ts", text).length;
    // Each matcher's own positive control: its spelling is caught by it alone.
    const members = Object.fromEntries(FEDERATION_SPELLINGS.map(spelling => [spelling, federationHits("control.ts", `const key = "${spelling}";`)]));
    expect(Object.values(members)).toStrictEqual(FEDERATION_MATCHERS.map(matcher => [matcher.source]));
    const controls = {
      members,
      snake: control("const state = record.publication_state;"),
      camel: control("const state = record.publicationState;"),
      quoted: control('const key = "matched_count";'),
      destructured: control("const { witness_digest: witness } = coverage;"),
      recordName: control("interface QueryViewRef { availability: string; verdict: string }"),
      camelRecord: control("const ref = queryViewRef;"),
      boundaryName: control("type Boundary = OwnerBoundary;"),
      witnessField: control('const key = "manifest_digest";'),
      escaped: control('const key = "publication\\u005fstate";'),
      escapedName: control("const publication\\u005fstate = 1;"),
      dotted: control('const path = "publication.state";'),
      chain: control("const value = record.publication.state;"),
      prefixed: control("const value = readPublicationState(record);"),
      pattern: control("const reads = /witness_digest/;"),
      prose: control("// reads a federated query view"),
      commentOnly: control("/** the federated query view of an OwnerBoundary */\nexport const x = 1;"),
      composed: control('const key = ["publication", "state"].join("_");'),
    };
    // The gate's F3: a comment reads no field, so a comment-only mention is no hit. R-COMPOSED-FIELD's quiet row: a spelling
    // assembled from parts stays invisible to the scan.
    expect({ prose: controls.prose, commentOnly: controls.commentOnly, composed: controls.composed }).toStrictEqual({ prose: 0, commentOnly: 0, composed: 0 });
    // The measured coverage witness fields (query_view.py:181, the roster's vocabulary) are each caught.
    const measuredWitnessFields = Object.fromEntries(MEASURED.witnessFields.map(field => [field, control(`const key = "${field}";`)]));
    expect(Object.values(measuredWitnessFields).every(count => count === 1)).toBe(true);
    // wb-yg70 (the wb-d8io gate's F1): a plural name reads singular (i), a field fused inside one word reads through the fused
    // matchers (ii), and an access chain reads through any head, wrapper or literal key while a nested pattern, literal or type
    // spells its key path (iii): each control is caught, by exactly one matcher.
    const widened = {
      plural: {
        snake: control("const PUBLIC_STATES = [];"),
        camel: control("const witnessDigests = [];"),
        quoted: control('const key = "matched_counts";'),
        ies: control("const ownerBoundaries = [];"),
        inner: control("const backendInstanceIds = [];"),
      },
      fused: {
        lower: control("const queryviewref = 1;"),
        upper: control("const QUERYVIEWREF = 1;"),
        prefixed: control("const readpublicationstate = 1;"),
        plural: control("const ownerboundariesref = 1;"),
        prose: control('const note = "reads the queryviewref field";'),
      },
      chains: {
        element: control('const value = record["publication"]["state"];'),
        mixed: control('const value = record.publication["state"];'),
        nonNull: control("const value = record!.publication!.state;"),
        asserted: control("const value = (record as Rec).publication.state;"),
        satisfied: control("const value = (record satisfies Rec).publication.state;"),
        called: control("const value = load().publication.state;"),
        constructed: control("const value = new Rec().publication.state;"),
        optional: control('const value = record?.["publication"]?.state;'),
        templateKey: control("const value = record[`publication`].state;"),
      },
      nested: {
        binding: control("const { publication: { state } } = record;"),
        parameter: control("function read({ publication: { state } }: Rec) { return state; }"),
        assignment: control("({ publication: { state } } = record);"),
        literal: control('const record = { publication: { state: "FAILED" } };'),
        type: control("type Rec = { publication: { state: string } };"),
        member: control("interface Rec { publication: { state: string } }"),
        classProperty: control('class Rec { publication = { state: "FAILED" }; }'),
        deep: control("const { backend: { instance: { id } } } = record;"),
        array: control("const { publication: [{ state }] } = record;"),
      },
    };
    const missed = Object.entries(widened).flatMap(([group, counts]) =>
      Object.entries(counts)
        .filter(([, count]) => count !== 1)
        .map(([name]) => `${group}.${name}`),
    );
    expect(missed, "a widened reading's control is not caught by exactly one matcher").toEqual([]);
    // R-FUSED-SPLIT's and R-SPLIT-PATH's quiet rows: a field fused into a word that a case hump or a separator splits from its
    // other words, the English compounds that reading would otherwise take, and a path joined only through a local binding, a key
    // bound elsewhere or a variable's own name all read quiet.
    const quiet = {
      fusedSplitCamel: control("const queryViewref = 1;"),
      fusedSplitSnake: control("const QUERY_VIEWREF = 1;"),
      compoundCamel: control("const publicStatement = 1;"),
      compoundSnake: control("const matched_counter = 1;"),
      aliasedPath: control("const { publication: p } = record;\nconst value = p.state;"),
      keyedPath: control('const KEY = "publication";\nconst value = record[KEY].state;'),
      boundPath: control('const publication = { state: "FAILED" };'),
    };
    expect(quiet).toStrictEqual({ fusedSplitCamel: 0, fusedSplitSnake: 0, compoundCamel: 0, compoundSnake: 0, aliasedPath: 0, keyedPath: 0, boundPath: 0 });
    // wb-yg70 (F1(iv)): the walk A1 takes of src, over a planted scratch tree - one module per extension in a nested directory, a
    // JSON file and a symbolic link: each file is read (each module by its script kind) and the link is listed, never followed.
    const plantRoot = makeScratch("rf-typed-status-echo-walk-");
    scratches.push(plantRoot);
    mkdirSync(join(plantRoot, "nested"));
    for (const extension of MODULE_EXTENSIONS) {
      const jsx = extension.endsWith("x");
      writeFileSync(join(plantRoot, "nested", `plant${extension}`), jsx ? "export const view = <b>publication state</b>;\n" : 'export const key = "publication_state";\n');
    }
    writeFileSync(join(plantRoot, "data.json"), '{ "publication_state": "FAILED" }\n');
    symlinkSync(join(plantRoot, "data.json"), join(plantRoot, "linked.json"));
    const walked = entriesBelow(plantRoot);
    const walk = {
      files: Object.fromEntries(
        walked.files
          .map(file => relative(plantRoot, file))
          .sort()
          .map(file => [file, matcherHits(fileUnits(join(plantRoot, file))).length]),
      ),
      others: walked.others.map(entry => relative(plantRoot, entry)),
      kinds: Object.fromEntries(MODULE_EXTENSIONS.map(extension => [extension, ts.ScriptKind[scriptKindOf(`plant${extension}`)]])),
    };
    expect(Object.keys(walk.files)).toHaveLength(MODULE_EXTENSIONS.length + 1);
    expect(Object.values(walk.files).every(count => count === 1)).toBe(true);
    expect(walk.others).toStrictEqual(["linked.json"]);
    return {
      floorMet,
      unitsFloorMet,
      anchorRead,
      hits,
      others,
      controls,
      measuredWitnessFields,
      fusedMatchers: FUSED_MATCHERS.map(matcher => matcher.source),
      widened,
      quiet,
      walk,
    };
  },
  A2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const native = (await nativeDescriptors()).filter(isRfDescriptor).map(descriptor => descriptor.id);
    const injectedIds = injected
      .catalogSnapshot()
      .map(({ descriptor }) => ({ id: descriptor.id, permissions: [...descriptor.permissions], contractSource: descriptor.contractSource ?? null }))
      .filter(isRfDescriptor)
      .map(descriptor => descriptor.id);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(injectedIds).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    const controls = {
      prefix: isRfDescriptor({ id: "reactivefiber.query.view", permissions: [], contractSource: null }),
      permission: isRfDescriptor({ id: "rf.federation.read", permissions: ["reactivefiber:render"], contractSource: null }),
      contract: isRfDescriptor({ id: "peer.status", permissions: [], contractSource: "rf@0.1.832:reactive-fiber.cli/v1 federation.read" }),
      foreign: isRfDescriptor({ id: "forge.gate.status", permissions: ["forge:read"], contractSource: "forge@1" }),
    };
    expect(controls).toStrictEqual({ prefix: true, permission: true, contract: true, foreign: false });
    return { native, injected: injectedIds, reconcile, controls };
  },
  A3: async () => {
    const outcomes: JsonObject = {};
    for (const [name, record] of [["queryView", VIEW_UNWITNESSED], ["boundary", BOUNDARY_FAILED]] as const) {
      const outcome = await nativeOutcome(record, 0);
      expect(outcome.refusal).toStrictEqual({ category: "transport", message: "RF preview returned an unrecognized native envelope." });
      expect(outcome.reading).toBeNull();
      expect(outcome.spawns).toHaveLength(1);
      outcomes[name] = { ...outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns) };
    }
    return outcomes;
  },
  A4: async () => {
    const refusals: JsonObject = {};
    for (const [name, record] of [["queryView", VIEW_UNWITNESSED], ["boundary", BOUNDARY_FAILED]] as const) {
      let caught: unknown;
      try {
        project(record);
      } catch (error) {
        caught = error;
      }
      expect(caught).toBeInstanceOf(CapabilityError);
      refusals[name] = refusalOf(caught);
    }
    return refusals;
  },
  B1: async () => {
    const rows = rowsOf(MEASURED.observationStatuses);
    const keysHeld = rows.every(row => ROW_KEYS.every(key => Object.hasOwn(row, key)));
    const valuesCarryDigest = rows.filter(row => MEASURED.valueStatuses.includes(String(row.status))).every(row => row.value_digest !== null);
    const missingCarriesNone = rows.filter(row => row.status === "missing").every(row => row.value_digest === null);
    const valuesNeverDegraded = rows.filter(row => MEASURED.valueStatuses.includes(String(row.status))).every(row => row.degraded === false);
    const codesPerTable = rows.every(row => row.code === MEASURED.statusCodes[String(row.status)]);
    expect({ keysHeld, valuesCarryDigest, missingCarriesNone, valuesNeverDegraded, codesPerTable }).toStrictEqual({
      keysHeld: true,
      valuesCarryDigest: true,
      missingCarriesNone: true,
      valuesNeverDegraded: true,
      codesPerTable: true,
    });
    return {
      rfVersion: ROSTER.rfVersion,
      statuses: rows.map(row => String(row.status)),
      rules: { keysHeld, valuesCarryDigest, missingCarriesNone, valuesNeverDegraded, codesPerTable },
      fields: rowFields(rendered(rows)),
    };
  },
  B2: async () => {
    const { reading, calls, before } = await injectedReading(rendered(rowsOf(MEASURED.observationStatuses)));
    const source = sourceOf(reading);
    expect(JSON.stringify(source)).toBe(before);
    expect(reading).toStrictEqual({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: JSON.parse(before) as JsonValue });
    expect(calls).toBe(1);
    return { readingKeys: Object.keys(objectOf(reading, "reading")).sort(), calls, verbatim: JSON.stringify(source) === before, fields: rowFields(source) };
  },
  B3: async () => {
    const before = JSON.stringify(rendered(rowsOf(MEASURED.observationStatuses)));
    const outcome = await nativeOutcome(JSON.parse(before) as JsonValue, 0);
    expect(outcome.refusal).toBeNull();
    const source = sourceOf(outcome.reading);
    expect(JSON.stringify(source)).toBe(before);
    expect(outcome.spawns).toHaveLength(1);
    expect(outcome.spawns[0]).toContain("--no-commit");
    return { spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), verbatim: JSON.stringify(source) === before, fields: rowFields(source) };
  },
  B4: async () => {
    const { reading } = await injectedReading(rendered(rowsOf([...MEASURED.observationStatuses, ...FEDERATION_WORDS])));
    const shown = sanitizeWorkbenchJson(reading);
    const identical = JSON.stringify(shown) === JSON.stringify(reading);
    expect(identical).toBe(true);
    expect(rowFields(sourceOf(shown))).toStrictEqual(rowFields(sourceOf(reading)));
    return { identical, fields: rowFields(sourceOf(shown)) };
  },
  B5: async () => {
    const shapes: { [status: string]: Shape } = {};
    for (const status of MEASURED.observationStatuses) shapes[status] = shapeOf(project(rendered([rowOf(status)])));
    for (const status of MEASURED.observationStatuses) {
      const expected = MEASURED.valueStatuses.includes(status)
        ? { coverage: "complete", tone: "success", notes: ["observations: 1 row, 0 reused"] }
        : { coverage: "partial", tone: "unknown", notes: [`observations: 1 row, 1 not observed (${status}): partial`] };
      expect(shapes[status], status).toStrictEqual(expected);
    }
    const failures = NOT_OBSERVED.map(status => JSON.stringify(shapes[status]));
    expect(new Set(failures).size).toBe(failures.length);
    expect(failures).not.toContain(JSON.stringify(shapes.null));
    return Object.fromEntries(MEASURED.observationStatuses.map(status => [status, shapeJson(shapes[status])]));
  },
  B6: async () => {
    const together = shapeOf(project(rendered(rowsOf(FEDERATION_WORDS))));
    expect(together).toStrictEqual({ coverage: "partial", tone: "unknown", notes: [`observations: 4 rows, 4 not observed (${FEDERATION_WORDS.join(", ")}): partial`] });
    const alone: { [word: string]: string[] } = {};
    for (const word of FEDERATION_WORDS) alone[word] = observationNotes(project(rendered([rowOf(word)])));
    const stale = observationNotes(project(rendered([rowOf("observed", 0, { freshness: "reused", replayed: true })])));
    expect(alone.PENDING).not.toStrictEqual(alone.UNKNOWN);
    expect(stale).toStrictEqual(["observations: 1 row, 1 reused: partial"]);
    expect([alone.PENDING, alone.UNKNOWN]).not.toContainEqual(stale);
    const { reading } = await injectedReading(rendered(rowsOf(FEDERATION_WORDS)));
    const readingStatuses = resultRows(sourceOf(reading)).map(row => String(row.status));
    expect(readingStatuses).toStrictEqual([...FEDERATION_WORDS]);
    return { together: shapeJson(together), alone, stale, readingStatuses };
  },
  C1: async () => {
    const shape = shapeOf(project(rendered(rowsOf(NOT_OBSERVED))));
    const listed = NOT_OBSERVED.slice(0, 4).join(", ");
    expect(shape).toStrictEqual({ coverage: "partial", tone: "unknown", notes: [`observations: ${NOT_OBSERVED.length} rows, ${NOT_OBSERVED.length} not observed (${listed}, …): partial`] });
    return { statuses: [...NOT_OBSERVED], shape: shapeJson(shape) };
  },
  C2: async () => {
    const notes: JsonObject = {};
    const unflagged: string[] = [];
    for (const status of NOT_OBSERVED) {
      const shape = shapeOf(project(rendered(rowsOf(["observed", "null", status]))));
      expect(shape, status).toStrictEqual({ coverage: "partial", tone: "unknown", notes: [`observations: 3 rows, 1 not observed (${status}): partial`] });
      notes[status] = shape.notes[0] ?? null;
      // The same row from an rf that predates the degraded flag: the word alone must keep it out of the value states.
      const legacy = rowOf(status, 2);
      delete legacy.degraded;
      const bare = shapeOf(project(rendered([rowOf("observed", 0), rowOf("null", 1), legacy])));
      expect(bare, `${status} without a degraded flag`).toStrictEqual(shape);
      unflagged.push(status);
    }
    const values = shapeOf(project(rendered(rowsOf(["observed", "null"]))));
    expect(values).toStrictEqual({ coverage: "complete", tone: "success", notes: ["observations: 2 rows, 0 reused"] });
    return { notes, unflagged, values: shapeJson(values) };
  },
  C3: async () => {
    const refusal = deniedRefusal();
    const outcome = await nativeOutcome(refusal, 5);
    expect(outcome.refusal).toStrictEqual({ category: "unavailable", message: "RF render refused: RF_OBSERVATION_DENIED" });
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    const topology = project(refusal);
    const snapshot = topology.snapshots[0];
    const carriesValue = snapshot === undefined || snapshot.nativePayloadRef !== undefined || snapshot.sourceRevision !== undefined || snapshot.sourceVersion !== undefined;
    expect(topology.snapshots).toHaveLength(1);
    expect(snapshot?.node.statusTone).toBe("failure");
    expect(snapshot?.coverage).toBe("unknown");
    expect(snapshot?.node.statusText).toBe("refused · RF_OBSERVATION_DENIED");
    expect(carriesValue).toBe(false);
    return {
      native: { ...outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length },
      projection: {
        coverage: snapshot?.coverage ?? null,
        tone: snapshot?.node.statusTone ?? null,
        statusText: snapshot?.node.statusText ?? null,
        evidenceRefs: [...(snapshot?.evidenceRefs ?? [])],
        carriesValue,
      },
    };
  },
  C4: async () => {
    const revoked = shapeOf(project(rendered([rowOf("revoked")])));
    const emptied = shapeOf(project(rendered([rowOf("")])));
    expect(revoked).toStrictEqual({ coverage: "partial", tone: "unknown", notes: ["observations: 1 row, 1 not observed (revoked): partial"] });
    expect(emptied).toStrictEqual({ coverage: "partial", tone: "unknown", notes: ["observations: 1 row, 1 not observed (…): partial"] });
    const outcome = await nativeOutcome(rendered(rowsOf(["revoked", ""])), 0);
    expect(outcome.refusal).toBeNull();
    const readingStatuses = resultRows(sourceOf(outcome.reading)).map(row => String(row.status));
    expect(readingStatuses).toStrictEqual(["revoked", ""]);
    return { revoked: shapeJson(revoked), emptied: shapeJson(emptied), readingStatuses, spawns: outcome.spawns.length };
  },
  D1: async () => {
    const empty = project(rendered([]));
    const absent = project(renderedWithout());
    expect(observationNotes(empty)).toEqual([]);
    expect(observationNotes(absent)).toEqual([]);
    expect(JSON.stringify(empty)).toBe(JSON.stringify(absent));
    const { residue } = absenceResidue(surfacedStrings(empty));
    expect(residue).toEqual([]);
    const { reading, before } = await injectedReading(rendered([]));
    expect(JSON.stringify(sourceOf(reading))).toBe(before);
    expect(resultRows(sourceOf(reading))).toEqual([]);
    // wb-d8io (the gate's F1(i)): the whole projection is the witness, so wording an empty or absent list adds anywhere in it - the
    // node, a note outside the observations family, an evidence reference - moves it, in any vocabulary.
    return { notes: observationNotes(empty), identical: JSON.stringify(empty) === JSON.stringify(absent), residue, readingRows: 0, projection: rootless(json(empty)) };
  },
  D2: async () => {
    const envelope = renderWith({ query_views: [...VIEWS] });
    const { reading, before } = await injectedReading(envelope);
    expect(JSON.stringify(sourceOf(reading))).toBe(before);
    const outcome = await nativeOutcome(JSON.parse(before) as JsonValue, 0);
    expect(outcome.refusal).toBeNull();
    expect(JSON.stringify(sourceOf(outcome.reading))).toBe(before);
    const shown = sanitizeWorkbenchJson(reading);
    expect(JSON.stringify(shown)).toBe(JSON.stringify(reading));
    const views = { injected: viewFields(sourceOf(reading)), native: viewFields(sourceOf(outcome.reading)), sanitized: viewFields(sourceOf(shown)) };
    expect(views.injected).toStrictEqual(["READY|UNKNOWN|0|no-witness", "READY|FALSE|0|witness", "PENDING|null|null|no-witness"]);
    expect(views.native).toStrictEqual(views.injected);
    expect(views.sanitized).toStrictEqual(views.injected);
    return views;
  },
  D3: async () => {
    const texts = [...new Set(battery().flatMap(({ source }) => surfacedStrings(json(project(source)))))].sort();
    const { phrases, residue } = absenceResidue(texts);
    expect(texts.length).toBeGreaterThanOrEqual(40);
    expect(residue).toEqual([]);
    const caught = (text: string): boolean => absenceResidue([text]).residue.length === 1;
    const controls = {
      none: caught("observations: none"),
      zeroRows: caught("observations: 0 rows"),
      noRows: caught("no rows matched"),
      nothing: caught("nothing observed"),
      empty: caught("empty result"),
      absent: caught("value absent"),
      unavailable: caught("observations unavailable"),
      without: caught("a render without observations"),
      lacking: caught("observations lacking"),
      unrecorded: caught("observations unrecorded"),
    };
    expect(Object.values(controls).every(Boolean)).toBe(true);
    // One control per word, read from the roster's list (an anchor outside this file's literals).
    const words = ROSTER.absenceWords.surfaced.filter(word => caught(`observations: ${word}`));
    expect(words).toStrictEqual([...ROSTER.absenceWords.surfaced]);
    return { strings: texts.length >= 40, phrases, residue, controls, words };
  },
  D4: async () => {
    const files = srcModules();
    const hits = files.flatMap(file => literalTexts(relative(REPO, file), textOf(file)).filter(text => OBSERVATION_ABSENCE.test(text)).map(text => `${relative(REPO, file)}: ${text}`));
    const inspector = join(REPO, "src", "ui", "workflow-inspector.ts");
    const keyedOnPage = textOf(inspector).includes(`if(page.total===0) add('${INSPECTOR_EMPTY}');`);
    const thrown = /throw new Error\(`Observation \$\{name\} is empty, unsafe or exceeds payload limit\.`\);/.test(textOf(join(REPO, "src", "workbench", "observation.ts")));
    expect(files.length).toBeGreaterThanOrEqual(100);
    expect(hits).toStrictEqual([`src/ui/workflow-inspector.ts: ${INSPECTOR_EMPTY}`, `src/workbench/observation.ts: ${PROJECTION_REFUSAL}`]);
    expect(keyedOnPage).toBe(true);
    expect(thrown).toBe(true);
    const snapshots = battery().map(({ name, source }) => `${name}:${project(source).snapshots.length}`);
    expect(snapshots.every(entry => entry.endsWith(":1"))).toBe(true);
    const control = (text: string): boolean => OBSERVATION_ABSENCE.test(text);
    const controls = {
      noObservations: control("no observations for this render"),
      none: control("observations: none"),
      empty: control("observations empty"),
      comment: literalTexts("c.ts", "// no observations here").length,
      zero: control("zero observations recorded"),
      unavailable: control("observations unavailable for this render"),
      without: control("a render without observations"),
    };
    expect(controls).toStrictEqual({ noObservations: true, none: true, empty: true, comment: 0, zero: true, unavailable: true, without: true });
    // One control per word on each side of the noun, read from the roster's lists.
    const words = {
      before: ROSTER.absenceWords.literalBefore.filter(word => control(`${word} observations recorded`)),
      after: ROSTER.absenceWords.literalAfter.filter(word => control(`observations ${word}`)),
    };
    expect(words).toStrictEqual({ before: [...ROSTER.absenceWords.literalBefore], after: [...ROSTER.absenceWords.literalAfter] });
    return { hits, keyedOnPage, thrown, snapshots, controls, words };
  },
  Q1: async () => {
    const first = ["missing", "suppressed", "invalid", "timeout", "denied"];
    const second = ["missing", "suppressed", "invalid", "timeout", "truncated"];
    const a = observationNotes(project(rendered(rowsOf(first))));
    const b = observationNotes(project(rendered(rowsOf(second))));
    expect(a).toStrictEqual(["observations: 5 rows, 5 not observed (missing, suppressed, invalid, timeout, …): partial"]);
    expect(b).toStrictEqual(a);
    const ra = resultRows(sourceOf((await injectedReading(rendered(rowsOf(first)))).reading)).map(row => String(row.status));
    const rb = resultRows(sourceOf((await injectedReading(rendered(rowsOf(second)))).reading)).map(row => String(row.status));
    expect(ra).not.toStrictEqual(rb);
    return { notes: a, readings: { first: ra, second: rb } };
  },
  Q2: async () => {
    const pairs = [["PENDING", "UNKNOWN"], ["suppressed", "denied"]] as const;
    const out: JsonObject = {};
    for (const [left, right] of pairs) {
      const a = project(rendered([rowOf(left)]));
      const b = project(rendered([rowOf(right)]));
      expect(a.snapshots).toStrictEqual(b.snapshots);
      expect(observationNotes(a)).not.toStrictEqual(observationNotes(b));
      const node = a.snapshots[0];
      out[`${left}/${right}`] = { coverage: node?.coverage ?? null, tone: node?.node.statusTone ?? null, statusText: node?.node.statusText ?? null, notes: [...observationNotes(a), ...observationNotes(b)] };
    }
    return out;
  },
  Q3: async () => {
    const nul = project(rendered([rowOf("null")]));
    const observed = project(rendered([rowOf("observed")]));
    const identical = JSON.stringify(nul) === JSON.stringify(observed);
    expect(identical).toBe(true);
    return { identical, shape: shapeJson(shapeOf(nul)) };
  },
  Q4: async () => {
    const bare = JSON.stringify(project(renderWith({})));
    const withViews = JSON.stringify(project(renderWith({ query_views: [...VIEWS] })));
    const withBoundary = JSON.stringify(project(renderWith({ federation_boundary: BOUNDARY_FAILED })));
    expect(withViews).toBe(bare);
    expect(withBoundary).toBe(bare);
    return { views: withViews === bare, boundary: withBoundary === bare };
  },
  Q5: async () => {
    // R-ABSENCE-VOCABULARY's quiet row: two absence wordings outside every enumerated word read quiet - to D3's residue on a
    // projection carrying one as a note, and to D4's literal matcher - so a claim worded so is seen only on the empty and absent
    // renders, which D1 holds whole.
    const wordings = ["observations: not recorded", "the observation list was not supplied"];
    const topology = project(rendered([rowOf("observed")]));
    const planted = wordings.map(text => absenceResidue(surfacedStrings(json({ ...topology, diagnostics: [...topology.diagnostics, text] }))).residue.length);
    const literal = wordings.map(text => OBSERVATION_ABSENCE.test(text));
    expect(planted).toStrictEqual([0, 0]);
    expect(literal).toStrictEqual([false, false]);
    return { wordings, planted, literal };
  },
  Q6: async () => {
    // R-UNENUMERATED-FIELD's quiet row: every field of the constructed federation records (the query views and the boundary
    // record, nested fields included) is caught by exactly one matcher or listed in UNENUMERATED_FIELDS, and a read of a listed
    // field in code is no A1 hit.
    const fields = [...new Set([...VIEWS, BOUNDARY_FAILED].flatMap(fieldNames))].sort();
    const reads = new Map<string, string[]>(fields.map(field => [field, federationHits("q6.ts", `const value = record.${field};`)]));
    const matched = Object.fromEntries([...reads].filter(([, hits]) => hits.length > 0));
    const unenumerated = [...reads].filter(([, hits]) => hits.length === 0).map(([field]) => field);
    expect(Object.values(matched).every(hits => hits.length === 1), "a field caught by two matchers").toBe(true);
    expect(unenumerated).toStrictEqual([...UNENUMERATED_FIELDS]);
    return { matched, unenumerated };
  },
};

/** `${root}.${member}`, composed so that this file's own text spells no registration member a marker scan would read. */
const dot = (root: string, member: string): string => `${root}.${member}`;
/** The vitest import every registration control is read under. */
const PLANT_IMPORT = 'import { describe, it, test } from "vitest";\n';
/** One control per skip-mode form registrationModes reads (wb-yg70, the wb-d8io gate's F3), the run forms it must leave alone,
 * and the non-claim: a registrar reached through an object holding it is not read. */
const REGISTRATION_CONTROLS: readonly (readonly [string, string, readonly string[]])[] = [
  ["the F3 pair", `(pin === "Q6" ? ${dot("it", "skip")} : it)(pin, () => {});\n${dot("it", "skip")}("judge", () => {});`, ["skip", "skip"]],
  ["a todo", `${dot("it", "todo")}("judge");`, ["todo"]],
  ["an inverted case", `${dot("test", "fails")}("judge", () => {});`, ["fails"]],
  ["a focused case", `${dot("it", "only")}("judge", () => {});`, ["only"]],
  ["a conditional skip", `${dot("it", "skipIf")}(true)("judge", () => {});`, ["skipIf"]],
  ["a conditional run", `${dot("describe", "runIf")}(false)("row", () => {});`, ["runIf"]],
  ["a skipped row", `${dot("describe", "skip")}("row", () => {});`, ["skip"]],
  ["a flag after a flag", `${dot(dot("it", "concurrent"), "skip")}("judge", () => {});`, ["skip"]],
  ["a literal member", 'it["skip"]("judge", () => {});', ["skip"]],
  ["a computed member", 'it[mode]("judge", () => {});', ["computed member"]],
  ["an alias", `const run = it;\n${dot("run", "skip")}("judge", () => {});`, ["skip"]],
  ["a destructured member", 'const { skip: pass } = it;\npass("judge", () => {});', ["skip"]],
  ["a renamed import", `import { it as check } from "vitest";\n${dot("check", "skip")}("judge", () => {});`, ["skip"]],
  ["a namespace import", `import * as vitest from "vitest";\n${dot(dot("vitest", "it"), "skip")}("judge", () => {});`, ["skip"]],
  ["an options skip", 'it("judge", { skip: true }, () => {});', ["options skip"]],
  ["an options todo", 'test("judge", { todo: pin === "Q6" }, () => {});', ["options todo"]],
  ["an options spread", 'it("judge", { ...options }, () => {});', ["options spread"]],
  ["a context skip", `it("judge", (context) => {\n  ${dot("context", "skip")}();\n});`, ["context skip"]],
  ["a destructured skip", 'it("judge", ({ skip }) => {\n  skip();\n});', ["context skip"]],
  [
    "the run forms",
    'it("judge", () => {});\nit(pin, { timeout: 60_000, skip: false }, async () => {});\ndescribe("row", () => {});\nconst inverted = child.fails === true;',
    [],
  ],
  ["the non-claim", `const api = { it };\n${dot(dot("api", "it"), "skip")}("judge", () => {});`, []],
];

/**
 * The skip modes a test module's registrations carry, in source order (wb-yg70, the wb-d8io gate's F3): a SKIP_MODES member on a
 * chain rooted at a registrar - it, test, describe or suite as the module imports them from vitest (a renamed import keeps its
 * local name, a namespace import its member), or a variable bound to such a chain, to a fixed point - anywhere in the module (a
 * call head, a conditional, an alias, a destructured member), or a computed member on one; an OPTION_MODES key of an
 * options-object argument of a registration call that is not literally false (a spread or a computed key read as one); and a
 * skip read on a parameter of a registration callback (a member of it, or a destructured skip).
 */
function registrationModes(fileName: string, text: string): string[] {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, scriptKindOf(fileName));
  const registrars = new Set<string>();
  const namespaces = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== "vitest") continue;
    const named = statement.importClause?.namedBindings;
    if (named !== undefined && ts.isNamespaceImport(named)) namespaces.add(named.name.text);
    if (named !== undefined && ts.isNamedImports(named)) {
      for (const element of named.elements) if (REGISTRARS.includes((element.propertyName ?? element.name).text)) registrars.add(element.name.text);
    }
  }
  const rooted = (node: ts.Expression): boolean => {
    const at = unwrapped(node);
    if (ts.isIdentifier(at)) return registrars.has(at.text);
    if (ts.isPropertyAccessExpression(at)) return (ts.isIdentifier(at.expression) && namespaces.has(at.expression.text) && REGISTRARS.includes(at.name.text)) || rooted(at.expression);
    if (ts.isElementAccessExpression(at) || ts.isCallExpression(at)) return rooted(at.expression);
    if (ts.isConditionalExpression(at)) return rooted(at.whenTrue) || rooted(at.whenFalse);
    return false;
  };
  const declarations: ts.VariableDeclaration[] = [];
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) declarations.push(node);
    ts.forEachChild(node, collect);
  };
  collect(source);
  // A variable bound to a registrar chain is a registrar too (an alias of an alias included): read to a fixed point.
  for (let grew = true; grew; ) {
    grew = false;
    for (const declaration of declarations) {
      const name = declaration.name;
      if (ts.isIdentifier(name) && !registrars.has(name.text) && declaration.initializer !== undefined && rooted(declaration.initializer)) {
        registrars.add(name.text);
        grew = true;
      }
    }
  }
  const modes: string[] = [];
  const optionModes = (call: ts.CallExpression): void => {
    for (const options of call.arguments.filter(ts.isObjectLiteralExpression)) {
      for (const property of options.properties) {
        if (ts.isSpreadAssignment(property)) modes.push("options spread");
        else if (property.name === undefined || ts.isComputedPropertyName(property.name)) modes.push("options computed key");
        else {
          const key = keyText(property.name);
          const literallyFalse = ts.isPropertyAssignment(property) && property.initializer.kind === ts.SyntaxKind.FalseKeyword;
          if (key !== undefined && OPTION_MODES.includes(key) && !literallyFalse) modes.push(`options ${key}`);
        }
      }
    }
  };
  const contextModes = (call: ts.CallExpression): void => {
    for (const callback of call.arguments) {
      if (!ts.isArrowFunction(callback) && !ts.isFunctionExpression(callback)) continue;
      const contexts = new Set<string>();
      for (const parameter of callback.parameters) {
        if (ts.isIdentifier(parameter.name)) contexts.add(parameter.name.text);
        else if (ts.isObjectBindingPattern(parameter.name) && parameter.name.elements.some(element => keyText(element.propertyName ?? element.name) === "skip")) modes.push("context skip");
      }
      const scan = (node: ts.Node): void => {
        if ((ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) && ts.isIdentifier(node.expression) && contexts.has(node.expression.text)) {
          const member = ts.isPropertyAccessExpression(node) ? node.name.text : literalKey(node.argumentExpression);
          if (member === "skip") modes.push("context skip");
        }
        ts.forEachChild(node, scan);
      };
      scan(callback.body);
    }
  };
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node) && SKIP_MODES.includes(node.name.text) && rooted(node.expression)) modes.push(node.name.text);
    if (ts.isElementAccessExpression(node) && rooted(node.expression)) {
      const member = literalKey(node.argumentExpression);
      if (member === undefined) modes.push("computed member");
      else if (SKIP_MODES.includes(member)) modes.push(member);
    }
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && node.initializer !== undefined && rooted(node.initializer)) {
      for (const element of node.name.elements) {
        const member = keyText(element.propertyName ?? element.name);
        if (member !== undefined && SKIP_MODES.includes(member)) modes.push(member);
      }
    }
    if (ts.isCallExpression(node) && rooted(node.expression)) {
      optionModes(node);
      contextModes(node);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return modes;
}
/** Every registered test's run mode, read through the file task; an inverted case reads as such. */
function selectedModes(tasks: RunnerTestFile["tasks"]): string[] {
  const modes: string[] = [];
  for (const child of tasks) {
    if (child.type === "test") modes.push(child.fails === true ? `${child.mode}+fails` : child.mode);
    else if (child.type === "suite") modes.push(...selectedModes(child.tasks));
  }
  return modes;
}
/** The file task, captured by the first case to run: the file-level hook reads every registered test's run mode through it. */
const CAPTURED: { file: RunnerTestFile | undefined } = { file: undefined };
beforeEach(({ task }) => {
  CAPTURED.file ??= task.file;
});

/** The pins whose case ran to its witness comparison and past it, in run order (the reached record). */
const REACHED: string[] = [];
/** The roster judge's run record (wb-d8io, the gate's F4): failed by its onTestFailed hook, finished as its last statement. */
const JUDGE = { failed: false, finished: false };

describe("wb-o4h0.7 rf typed-status echo census (RF-FEDERATED-WORKSPACES-R9, standing echo posture)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the receipt's tables and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:6", "C:4", "D:4", "Q:6"]);
    // wb-d8io (the gate's F2): the pins row by row, the residual map, the matchers and the absence words stand in the append-only
    // receipt's tables, outside this file and its roster.
    expect(ROWS.flatMap(row => row.pins.map(pin => [row.id, pin])), "the pins stand in the receipt's judged-pin table").toStrictEqual(receiptTable(RECEIPT_TABLES.pins));
    expect(Object.entries(RESIDUALS), "the residual map stands in the receipt's residual table, then in its cut-2 additions").toStrictEqual([
      ...receiptTable(RECEIPT_TABLES.residuals),
      ...receiptTable(RECEIPT_TABLES.residualAdditions),
    ]);
    expect(FEDERATION_MATCHERS.map(matcher => [`\`${matcher.source}\``]), "the matchers stand in the receipt's matcher table").toStrictEqual(receiptTable(RECEIPT_TABLES.matchers));
    const words = [
      ...ABSENCE_WORDS.map(word => ["surfaced", word]),
      ...OBSERVATION_ABSENCE_BEFORE.map(word => ["literal-before", word]),
      ...OBSERVATION_ABSENCE_AFTER.map(word => ["literal-after", word]),
    ];
    expect(words, "the absence words stand in the receipt's word table").toStrictEqual(receiptTable(RECEIPT_TABLES.words));
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      observationStatuses: OBSERVATION_STATUSES,
      valueStatuses: VALUE_STATUSES,
      degradedStatuses: DEGRADED_STATUSES,
      noValueStatuses: NO_VALUE_STATUSES,
      statusCodes: STATUS_CODES,
      publicStates: PUBLIC_STATES,
      verdicts: VERDICTS,
      availabilities: AVAILABILITIES,
      witnessFields: WITNESS_FIELDS,
    }).toStrictEqual(ROSTER.vocabularies);
    expect(FEDERATION_MATCHERS.map(matcher => matcher.source)).toStrictEqual([...ROSTER.federationMatchers]);
    expect([...ABSENCE_ALLOWLIST]).toStrictEqual([...ROSTER.absenceAllowlist]);
    expect({ surfaced: [...ABSENCE_WORDS], literalBefore: [...OBSERVATION_ABSENCE_BEFORE], literalAfter: [...OBSERVATION_ABSENCE_AFTER] }).toStrictEqual(ROSTER.absenceWords);
    expect(RESIDUALS).toStrictEqual(ROSTER.residuals);
    for (const pin of Object.values(RESIDUALS)) expect(ROWS.some(row => row.pins.includes(pin)), `${pin} is a judged pin`).toBe(true);
    expect(PUBLIC_STATES.filter(state => FEDERATION_WORDS.includes(state))).toStrictEqual(["PENDING", "SUPPRESSED", "FAILED"]);
    expect(VERDICTS.includes("UNKNOWN") && AVAILABILITIES.includes("PENDING")).toBe(true);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it("roster: every registered test, its run mode and every pin's reached record equal the roster, in order", ({ task, onTestFailed }) => {
    onTestFailed(() => {
      JUDGE.failed = true;
    });
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file, exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran first").toEqual([]);
    expect(REACHED, "every pin's case reached past its witness comparison, in row order").toStrictEqual(ROWS.flatMap(row => row.pins));
    JUDGE.finished = true;
  });
});

// wb-d8io (the o4h0.7 gate's F4): a skip modifier, a todo, an early return or a deleted judge leaves the judge's run record
// unfinished; when every pin case reached past its witness comparison (an unfiltered run), that reds the file here, outside it.
// wb-yg70 (the wb-d8io gate's F3): so does a run in which every registered test was selected to run as written (an early return
// in a pin case beside one in the judge), and this file's own registrations are read for a skip mode first, each form held to
// its control: the judge and one pin case skipped together (the F3 pair) left neither run condition met and read green.
afterAll(() => {
  const misread = REGISTRATION_CONTROLS.filter(([, text, modes]) => JSON.stringify(registrationModes("plant.test.ts", `${PLANT_IMPORT}${text}`)) !== JSON.stringify(modes)).map(
    ([name]) => name,
  );
  if (misread.length > 0) throw new Error(`the registration-mode read misses its controls: ${misread.join("; ")}`);
  const modes = registrationModes(SELF, readFileSync(SELF, "utf8"));
  if (modes.length > 0) throw new Error(`this census registers a case with a skip mode, which no run of it vouches for: ${modes.join(", ")}`);
  const ran = ROWS.flatMap(row => row.pins).every(pin => REACHED.includes(pin));
  const selected = CAPTURED.file === undefined ? [] : selectedModes(CAPTURED.file.tasks);
  const unfiltered = selected.length > 0 && selected.every(mode => mode === "run");
  if ((ran || unfiltered) && !JUDGE.finished && !JUDGE.failed) {
    throw new Error("the roster judge did not run to its end while every pin case reached its witness or every test was selected to run: the registration judge is skipped, emptied or gone");
  }
});
