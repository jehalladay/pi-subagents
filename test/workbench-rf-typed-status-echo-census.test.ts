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
 *    tree. wb-rgov widened (iii) to the wb-yg70 gate's F2 survivors: the key path also runs through a readonly or other type
 *    operator, an optional, rest or named tuple member, a call or construction argument, a conditional branch, a ?? || && operand,
 *    an arrow body, a value returned from an arrow or function expression (a method or accessor names its own key), an await, a
 *    spread (its members join the object they are spread into) and a JSX attribute's value (the attribute names the key), each
 *    with its control; and it pinned the fused reading's over-read (the wb-yg70 gate's F3, OVER-READ below). wb-50dt widened
 *    (iii) to the wb-rgov gate's F2 survivors: the key path also runs through a function or construct type's return type, an
 *    arrow's or a function expression's return type, the last operand of a comma, a yielded value (it continues as a returned
 *    value does), a value returned or yielded from a function declaration nested in a function (it continues from the function
 *    that holds the declaration: the strict direction, whether that value is then returned is not read), an assignment's right
 *    side (a member target - a property or element access through the wrappers, written by =, ??=, ||= or &&= - names the keys
 *    itself, by its chain past the head), a template literal's or a tagged template's substitution and both branches of a
 *    conditional type, each with its control; wb-1709 widened (iii) to the wb-50dt gate's F1 survivors: the key path also runs
 *    through a call or construct signature's return type and a type literal's call and construct signatures (a function or
 *    construct type spelled by signature), a function declaration's own return type (it continues as the declaration's returned
 *    value does, from the function that holds a nested one, while a module-level one's own name ends the path), a thrown value
 *    (it continues as a returned value does), a call's or a construction's callee (it passes as the arguments do, so an
 *    immediately invoked function's result and a called call's result run on; a function invoked through a member, .call, .apply
 *    or .bind, is that member access's object, which nothing passes: R-SPLIT-PATH) and a tagged template's tag; a class
 *    expression's members, its constructors' parameter properties included, name their keys as an object literal's do, and a
 *    constructor's parameter property (a parameter with an accessibility, readonly or override modifier) names its own key; and
 *    a type-level indexed access chain is a unit as a value-level chain is (Rec["publication"]["state"]: its head a type name or
 *    a typeof query's name, through parenthesized types, then its string-literal index types), each with its control. CLAIM
 *    SCOPE (wb-1709's third cut, the enumerate-the-resolvable cut the orchestrator's ruling R-B138 binds after the gate's
 *    refusals #1 and #2, whose U1-U4 and U1-U6 found these readings stated in general words but held only in the contexts their
 *    controls spelled): each reading wb-1709 adds is claimed in exactly the contexts its controls spell - the 65
 *    KEY_PATH_ADDITIONS_CUT_5 controls, each enumerated by name, reading and text digest in the receipt's cut-5 table, among them
 *    at least one falsifier per reader mutant either refusal wrote (BM14, BM20, BM21, BM22, BM31, BM34, BM35, BM36, BM37, BM38;
 *    GM01-GM15) - and in no other: a context no control spells is outside the claim, and one found unread there is a
 *    residual-list addition (named in R-SPLIT-PATH with a quiet twin), never a claimed reading; likewise each quiet form
 *    R-SPLIT-PATH names for wb-1709 is pinned in exactly the contexts its SPLIT_PATH_ADDITIONS_CUT_5 twins spell;
 *    A2 the rf roster, selected by id prefix, reactivefiber:
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
 * wb-rgov (the wb-yg70 gate's F1) widened the read: an argument is read through wrappers (parentheses, as, satisfies, non-null,
 * angle-bracket), both branches of a conditional and both operands of ?? || &&; an argument after a registration's name, or any
 * argument of a hook call, that is neither an object literal, an inline function nor a plain literal (a name, a member read, a
 * call) reds as unread, so an options object or a callback held in a variable is never read as clean; every parameter of an
 * inline callback of a registration or of a hook (HOOKS as imported or as a member of a registrar chain, TEST_HOOKS by name) is
 * a test context, and so are its aliases (through wrappers, to a fixed point) and its rest bindings - a skip read on one (a
 * member, a literal element key or a destructured key) reds, as do a computed member and any other use (an argument, an
 * assignment, a return, a shorthand: a context escape); and an assignment to a task's mode or fails member anywhere in the
 * module reds. wb-50dt (the wb-rgov gate's F1) widened it again: a task write is any write of a mode or fails member (a
 * property or a literal element key, through the wrappers) - the target of an assignment of any operator or of a for-in or
 * for-of head, each target inside a destructuring pattern included (nested, wrapped, defaulted or rest), the operand of an
 * increment or a decrement, or the operand of a delete; a rest parameter, and a function's or method's own arguments object
 * read outside a nested function that has its own, is a context escape; a task bound from a context (a destructured task key,
 * a task member, an alias of either, the rest of a task pattern) carries the context back through its context member (a
 * property or a literal element key) and a context key destructured from it, each read as a context; a namespace's registrar
 * or hook member and a test hook are read through a literal element key too, a computed namespace member reds, a name bound to
 * a namespace or to the rest of a namespace pattern is a namespace, and a namespace's or a registrar chain's destructured
 * member binds as a registrar or a hook (a namespace's registrar members and either's hook members by key, every other member
 * of a chain as a chain), while a computed key there reds; a spread argument's array literal is read in place and any other
 * spread reads unread wherever it stands; and an extend call on a registrar chain has its fixtures read, each inline function
 * (or a fixture tuple's first element) a callback whose first parameter alone is the context, while a fixture or a fixture set
 * held elsewhere reads unread. Non-claims: a registrar or hook reached through any other value (an object holding it, a helper
 * it is handed to, a reflective read) and a reflective or computed-key write (Reflect.set, Object.assign, task[flag] = ...) are
 * not read; their controls read no mode. wb-50dt adds: a task's other uses (an argument, a comparison, a value held in another
 * value) are not followed, and nothing is bound through a nested pattern on a namespace, a registrar chain or a task; their
 * control reads no mode. wb-yg70's two residuals are held to the receipt's cut-2 table, after the first entry's residual
 * table. wb-rgov (the wb-yg70 gate's F4): A1 records every control it reads (group, name, reading and the sha256/16 of its text,
 * the walk's planted tree included) and the hook every registration-mode control (name, modes and text sha256/16); both
 * records are held to the receipt's cut-3 tables, so a control removed together with its reading, or rewritten, reds. wb-50dt:
 * the cut-4 controls join both records after the cut-3 ones, each record held to its cut-3 table followed by its cut-4
 * additions table. wb-1709: the cut-5 A1 controls join A1's record after the cut-4 ones, held to the cut-5 additions table
 * after the cut-4 one.
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
 * (const { publication: p } = record; p.state, record[KEY].state, const publication = { state }), or (wb-rgov, the wb-yg70
 * gate's F6) through an interface's or a type alias's own name or a mapped-type key, or (wb-50dt) through a module-level
 * function declaration's own name, a plain name written or a member written through a key bound elsewhere, or (wb-1709, the
 * wb-50dt gate's F1) through a function expression or an arrow held in a local (GA26), a parameter's own name (GA21's binding
 * form: a defaulted parameter, a constructor's plain parameter), a member target inside a destructuring assignment's pattern,
 * joined to its value only by position or key across the assignment (GA27), the own name of a module-level function
 * declaration carrying a return type, of an interface or a type alias carrying a call signature, of a class declaration or of a
 * variable holding a class expression, or a type-level index bound elsewhere, or (wb-1709's second cut, the gate's B01, B02, B13
 * and B03) through a member access's object (a function invoked through .call, .apply or .bind, a call whose result is read
 * through a member), or (wb-1709's third cut) through a tagged template's type arguments or a qualified name outside an indexed
 * access (let value: publication.state; typeof record.publication.state: the gate's refusal-#1 B26 and B25, whose parts A1 joins
 * only as a type-level chain's head), reads quiet to A1, which joins a path's links
 * only within one access chain (of values or of types), one member write or one nested pattern, literal, class expression or
 * type (A1's aliased, keyed, bound, interface-name, type-name and mapped-key controls, its declared-function, name-assignment
 * and keyed-assignment controls and its nineteen cut-5 twins stay 0). OVER-READ (named and pinned, the false-red direction; wb-rgov, the wb-yg70 gate's
 * F3): the fused reading takes a single word that holds a matcher's fused words anywhere inside it, so an English compound
 * written as one word (publicstatement, MATCHEDCOUNTER, a confederation, where the fused federat loses its word start) reads as
 * a federation field: A1's over-read controls read 1, a src word spelling one reds A1 by design, and narrowing the reading would
 * lose kills the landed census makes.
 * SCOPE: the vocabularies are producer facts at the installed rf; Pi vendors no rf schema, so a producer change is seen only when a
 * re-measure re-reads them. The armed half (a federation reader echoing PublicState, availability, verdict and the coverage witness)
 * waits for the FW envelopes and FW-18 (rfc-0txnl.22): no reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src and the receipt are only read.
 */
import { createHash } from "node:crypto";
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
/** wb-rgov (the wb-yg70 gate's F1-F4): the entry its cut appended, whose two tables hold every A1 control and every
 * registration-mode control by name, reading and text. */
const RECEIPT_CUT_3 =
  "2026-10-27 the typed-status echo census judged set, cut 3: the registration read through wrappers, branches, held values, aliases and hooks, A1's key paths through more nodes, the fused over-read pinned and every control anchored (wb-rgov, the wb-yg70 gate's F1-F4)";
/** wb-50dt (the wb-rgov gate's F1 and F2): the entry its cut appended, whose two tables add the cut-4 A1 controls and
 * registration-mode controls after the cut-3 tables' rows. */
const RECEIPT_CUT_4 =
  "2026-10-27 the typed-status echo census judged set, cut 4: every write of a task's run flags, the context's other ways in, the registration read through literal keys, destructures, spreads and fixtures, and A1's key paths through nine more nodes (wb-50dt, the wb-rgov gate's F1 and F2)";
/** wb-1709 (the wb-50dt gate's F1): the entry its cut appended, whose one table adds the cut-5 A1 controls after the cut-4
 * additions table's rows. */
const RECEIPT_CUT_5 =
  "2026-10-29 the typed-status echo census judged set, cut 5: A1's key paths through call and construct signatures, a declaration's own return type, a thrown value, a callee, a tag, a class expression's members and a parameter property, type-level indexed access chains, and R-SPLIT-PATH's cut-5 twins (wb-1709, the wb-50dt gate's F1)";
/** The table sections, the entry each sits under and the header row each must keep. */
const RECEIPT_TABLES = {
  pins: { entry: RECEIPT_ENTRY, heading: "Judged pins, wb-d8io cut 1", header: ["Row", "Pin"] },
  residuals: { entry: RECEIPT_ENTRY, heading: "Residuals, wb-d8io cut 1", header: ["Residual", "Quiet row"] },
  matchers: { entry: RECEIPT_ENTRY, heading: "Federation matchers, wb-d8io cut 1", header: ["Matcher"] },
  words: { entry: RECEIPT_ENTRY, heading: "Absence words, wb-d8io cut 1", header: ["Vocabulary", "Word"] },
  residualAdditions: { entry: RECEIPT_CUT_2, heading: "Residual additions, wb-d8io cut 2", header: ["Residual", "Quiet row"] },
  readingControls: { entry: RECEIPT_CUT_3, heading: "A1 controls, wb-d8io cut 3", header: ["Group", "Control", "Reads", "Text sha256/16"] },
  registrationControls: { entry: RECEIPT_CUT_3, heading: "Registration-mode controls, wb-d8io cut 3", header: ["Control", "Modes", "Text sha256/16"] },
  readingControlAdditions: { entry: RECEIPT_CUT_4, heading: "A1 control additions, wb-d8io cut 4", header: ["Group", "Control", "Reads", "Text sha256/16"] },
  registrationControlAdditions: { entry: RECEIPT_CUT_4, heading: "Registration-mode control additions, wb-d8io cut 4", header: ["Control", "Modes", "Text sha256/16"] },
  readingControlCut5: { entry: RECEIPT_CUT_5, heading: "A1 control additions, wb-d8io cut 5", header: ["Group", "Control", "Reads", "Text sha256/16"] },
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
/** The member an access reads (wb-50dt): a property's name or a literal element key's text; a computed key reads none. */
function accessName(node: ts.PropertyAccessExpression | ts.ElementAccessExpression): string | undefined {
  return ts.isPropertyAccessExpression(node) ? node.name.text : literalKey(node.argumentExpression);
}
/** The members a write target names (wb-50dt, the wb-rgov gate's F1): a property or literal element key through the wrappers
 * and, where `patterns` holds (an assignment's or a for-in or for-of head's target), every target inside an array or object
 * destructuring pattern, nested, wrapped or rest. A defaulted target is an assignment of its own and is read as one. */
function writtenMembers(target: ts.Expression, patterns: boolean): string[] {
  const at = unwrapped(target);
  if (ts.isPropertyAccessExpression(at) || ts.isElementAccessExpression(at)) {
    const member = accessName(at);
    return member === undefined ? [] : [member];
  }
  if (!patterns) return [];
  if (ts.isArrayLiteralExpression(at)) return at.elements.flatMap(element => writtenMembers(ts.isSpreadElement(element) ? element.expression : element, true));
  if (ts.isObjectLiteralExpression(at)) {
    return at.properties.flatMap(property =>
      ts.isPropertyAssignment(property) ? writtenMembers(property.initializer, true) : ts.isSpreadAssignment(property) ? writtenMembers(property.expression, true) : [],
    );
  }
  return [];
}
/** The key of a member of an object pattern, object literal, type literal, interface or class; a rest element has none. wb-1709
 * (the wb-50dt gate's F1, GA21): a constructor's parameter property (a parameter with an accessibility, readonly or override
 * modifier) is a member of its class and names its own key; any other parameter's name is a local binding (R-SPLIT-PATH). */
function memberKey(node: ts.Node): string | undefined {
  if (ts.isBindingElement(node)) return ts.isObjectBindingPattern(node.parent) && node.dotDotDotToken === undefined ? keyText(node.propertyName ?? node.name) : undefined;
  if (ts.isPropertyAssignment(node) || ts.isShorthandPropertyAssignment(node) || ts.isPropertySignature(node) || ts.isPropertyDeclaration(node)) return keyText(node.name);
  if (ts.isMethodDeclaration(node) || ts.isMethodSignature(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node)) return keyText(node.name);
  // wb-rgov (the wb-yg70 gate's F2): a JSX attribute names the key of the value it carries.
  if (ts.isJsxAttribute(node)) return ts.isIdentifier(node.name) ? node.name.text : undefined;
  if (ts.isParameter(node)) return ts.isParameterPropertyDeclaration(node, node.parent) ? keyText(node.name) : undefined;
  return undefined;
}
/** The logical operators whose either operand can be the expression's value: a key path runs through both (A1) and the
 * registration read takes both (wb-rgov). */
const LOGICAL_OPERATORS: readonly ts.SyntaxKind[] = [ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.BarBarToken, ts.SyntaxKind.AmpersandAmpersandToken];
/** The assignment operators whose value is their right side (wb-50dt, the wb-rgov gate's F2 o06/o07): =, ??=, ||= and &&=. */
const VALUE_ASSIGNMENTS: readonly ts.SyntaxKind[] = [
  ts.SyntaxKind.EqualsToken,
  ts.SyntaxKind.QuestionQuestionEqualsToken,
  ts.SyntaxKind.BarBarEqualsToken,
  ts.SyntaxKind.AmpersandAmpersandEqualsToken,
];
/** The member an assignment writes (wb-50dt): its target through the wrappers when that is a property or element access. */
function memberTarget(node: ts.BinaryExpression): ts.PropertyAccessExpression | ts.ElementAccessExpression | undefined {
  const target = unwrapped(node.left);
  return ts.isPropertyAccessExpression(target) || ts.isElementAccessExpression(target) ? target : undefined;
}
/** The nodes a nested object sits in without a key of its own, reached from `child`: array patterns and their elements, array
 * literals, the expression wrappers, and array, tuple, union, intersection, parenthesized and generic types; wb-rgov (the wb-yg70
 * gate's F2) adds type operators (readonly), optional, rest and named tuple members, a call's or construction's arguments, a
 * conditional's branches, a logical operand, an arrow function's body, an await, a spread and a JSX attribute's expression;
 * wb-50dt (the wb-rgov gate's F2) adds a comma's last operand (o02), an assignment's right side when its target is no member
 * (a member target names the keys itself, in enclosingKeys), an arrow's or a function expression's return type (o08), a
 * function or construct type's return type (o01), both branches of a conditional type (the o05 boundary), and a template
 * literal's or a tagged template's substitutions (o09, o10). wb-1709 (the wb-50dt gate's F1) adds a call's or a construction's
 * callee, which now passes as its arguments do (an immediately invoked function's result and a called call's result, GA24; a
 * member access's object passes nothing, so a function invoked through .call reads quiet, R-SPLIT-PATH), a
 * tagged template's tag (GA23), a call or construct signature's return type, and a type literal's call and construct
 * signatures (GA17-GA19: a function or construct type spelled by signature); each wb-1709 reading is claimed in the contexts its
 * cut-5 controls spell (the header's CLAIM SCOPE). */
function passesThrough(node: ts.Node, child: ts.Node): boolean {
  if (ts.isConditionalExpression(node)) return child !== node.condition;
  if (ts.isBinaryExpression(node)) {
    if (LOGICAL_OPERATORS.includes(node.operatorToken.kind)) return true;
    if (child !== node.right) return false;
    return node.operatorToken.kind === ts.SyntaxKind.CommaToken || (VALUE_ASSIGNMENTS.includes(node.operatorToken.kind) && memberTarget(node) === undefined);
  }
  if (ts.isCallExpression(node) || ts.isNewExpression(node)) return true;
  if (ts.isArrowFunction(node)) return child === node.body || child === node.type;
  if (ts.isFunctionExpression(node) || ts.isFunctionTypeNode(node) || ts.isConstructorTypeNode(node)) return child === node.type;
  if (ts.isCallSignatureDeclaration(node) || ts.isConstructSignatureDeclaration(node)) return child === node.type;
  if (ts.isTypeLiteralNode(node)) return ts.isCallSignatureDeclaration(child) || ts.isConstructSignatureDeclaration(child);
  if (ts.isConditionalTypeNode(node)) return child === node.trueType || child === node.falseType;
  if (ts.isTemplateSpan(node)) return child === node.expression;
  if (ts.isTaggedTemplateExpression(node)) return child === node.template || child === node.tag;
  return (
    ts.isTemplateExpression(node) ||
    ts.isTypeOperatorNode(node) ||
    ts.isOptionalTypeNode(node) ||
    ts.isRestTypeNode(node) ||
    ts.isNamedTupleMember(node) ||
    ts.isAwaitExpression(node) ||
    ts.isSpreadElement(node) ||
    ts.isSpreadAssignment(node) ||
    ts.isJsxExpression(node) ||
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
 * value or type of, that member's own enclosing keys, and so on, through the pass-through nodes. wb-rgov (the wb-yg70 gate's F2):
 * a spread's members join the object literal they are spread into, and a returned value continues from the arrow function or
 * function expression it returns from (a method or accessor is itself the member). A variable or parameter name is no key
 * (R-SPLIT-PATH). wb-50dt (the wb-rgov gate's F2): a yielded value continues as a returned one does (o03); a function
 * declaration nested in a function hands its returned or yielded value on to the function that holds it (o04, the strict
 * direction: whether the declaration's value is then returned is not read), while one at module level, whose own name is no
 * key, ends the path (R-SPLIT-PATH); and a member written by an assignment or a logical assignment (o06, o07) is named by its
 * target's chain past the head (chainNames), the head being a variable's own name. wb-1709 (the wb-50dt gate's F1): a thrown value
 * continues as a returned one does (GA25), and so does a function declaration's own return type (GA20): from the declaration
 * itself, so one nested in a function continues from the function that holds it, while one at module level ends the path
 * (R-SPLIT-PATH); each in the contexts its cut-5 controls spell (the header's CLAIM SCOPE). */
function enclosingKeys(container: ts.Node): string[] {
  let child: ts.Node = container;
  let at: ts.Node | undefined = container.parent;
  while (at !== undefined) {
    const leaves: boolean = ts.isReturnStatement(at) || ts.isYieldExpression(at) || ts.isThrowStatement(at);
    if (leaves || (ts.isFunctionDeclaration(at) && child === at.type)) {
      let returnedFrom: ts.Node | undefined = leaves ? ts.findAncestor(at.parent, ts.isFunctionLike) : at;
      while (returnedFrom !== undefined && ts.isFunctionDeclaration(returnedFrom)) {
        const holder: ts.Node | undefined = ts.findAncestor(returnedFrom.parent, ts.isFunctionLike);
        if (holder === undefined) break;
        returnedFrom = holder;
      }
      if (returnedFrom === undefined || !(ts.isArrowFunction(returnedFrom) || ts.isFunctionExpression(returnedFrom))) {
        at = returnedFrom;
        break;
      }
      child = returnedFrom;
      at = returnedFrom.parent;
      continue;
    }
    if (!(ts.isObjectLiteralExpression(at) && ts.isSpreadAssignment(child)) && !passesThrough(at, child)) break;
    child = at;
    at = at.parent;
  }
  if (at !== undefined && ts.isBinaryExpression(at) && child === at.right && VALUE_ASSIGNMENTS.includes(at.operatorToken.kind)) {
    const target = memberTarget(at);
    if (target !== undefined) return chainNames(target).slice(1);
  }
  const key = at === undefined ? undefined : memberKey(at);
  return at === undefined || key === undefined ? [] : [...enclosingKeys(at.parent), key];
}
/** An entity name's parts, in order: an identifier, or a qualified name's parts (api.Rec names api and Rec; the cut-5 controls
 * spell qualified names of two and three parts, the header's CLAIM SCOPE). */
function entityNames(name: ts.EntityName): string[] {
  return ts.isIdentifier(name) ? [name.text] : [...entityNames(name.left), name.right.text];
}
/** The names of a type-level access chain (wb-1709, the wb-50dt gate's F1, GA28): its head when a type name or a typeof query's
 * name (a qualified one by its parts), through parenthesized types, then each string-literal index type along it, so
 * Rec["publication"]["state"] names Rec, publication and state in order. wb-1709's second cut (the gate's B04): an index is read
 * through parenthesized types too, so Rec[("publication")]["state"] names the same three. Any other head names nothing, and an
 * index that is no string literal adds no name (R-SPLIT-PATH). Each reading is claimed in the contexts its cut-5 controls spell
 * (the header's CLAIM SCOPE). */
function typeChainNames(node: ts.TypeNode): string[] {
  if (ts.isParenthesizedTypeNode(node)) return typeChainNames(node.type);
  if (ts.isTypeReferenceNode(node)) return entityNames(node.typeName);
  if (ts.isTypeQueryNode(node)) return entityNames(node.exprName);
  if (ts.isIndexedAccessTypeNode(node)) {
    let index: ts.TypeNode = node.indexType;
    while (ts.isParenthesizedTypeNode(index)) index = index.type;
    return [...typeChainNames(node.objectType), ...(ts.isLiteralTypeNode(index) && ts.isStringLiteralLike(index.literal) ? [index.literal.text] : [])];
  }
  return [];
}
/** A container's members: an object pattern's elements, an object literal's properties, a type literal's members, and (wb-1709,
 * the wb-50dt gate's F1, GA22) a class expression's members with its constructors' parameters, of which memberKey keys the
 * parameter properties. */
function containerMembers(node: ts.ObjectBindingPattern | ts.ObjectLiteralExpression | ts.TypeLiteralNode | ts.ClassExpression): readonly ts.Node[] {
  if (ts.isObjectBindingPattern(node)) return node.elements;
  if (ts.isObjectLiteralExpression(node)) return node.properties;
  if (ts.isTypeLiteralNode(node)) return node.members;
  return [...node.members, ...node.members.filter(ts.isConstructorDeclaration).flatMap(member => member.parameters)];
}
/** The code units of one module by its TypeScript AST (A1): every identifier and private name, every string, template,
 * regular-expression and JSX text literal (escapes decoded by the parser), every access chain of two names or more joined by
 * dots (chainNames), and the key path of every member of an object pattern, object literal or type literal nested under a member
 * (wb-yg70: const { publication: { state } } = record reads publication.state). Comments are trivia, never units (wb-d8io, the
 * gate's F3: a comment reads no field). wb-1709 (the wb-50dt gate's F1): every type-level indexed access chain of two names or
 * more (typeChainNames, GA28) is a unit too, and a class expression is a container as an object literal is: the key path of each
 * of its members, its constructors' parameter properties included, is a unit when it is nested under a member (GA22); each in the
 * contexts its cut-5 controls spell (the header's CLAIM SCOPE). */
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
    if (ts.isIndexedAccessTypeNode(node)) {
      const chain = typeChainNames(node);
      if (chain.length > 1) units.push(chain.join("."));
    }
    if (ts.isObjectBindingPattern(node) || ts.isObjectLiteralExpression(node) || ts.isTypeLiteralNode(node) || ts.isClassExpression(node)) {
      const outer = enclosingKeys(node);
      const keys = outer.length === 0 ? [] : containerMembers(node).map(memberKey).filter((key): key is string => key !== undefined);
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

/** A text's sha256/16: how the receipt's cut-3 tables hold each control's text (wb-rgov, the wb-yg70 gate's F4). */
function shaOf(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex").slice(0, 16);
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

/** wb-50dt (the wb-rgov gate's F2): A1's cut-4 key-path controls, each caught by exactly one matcher once the key path runs
 * through its node: a function or construct type's return type (o01), the last operand of a comma (o02), a yielded value (o03),
 * a value returned from a function declaration nested in a member's function (o04), both branches of a conditional type (the
 * o05 boundary), a member written by an assignment (o06) or a logical assignment (o07), an arrow's or a function expression's
 * return type (o08), a tagged template's substitution (o09) and a template literal's (o10), with same-class siblings. */
const KEY_PATH_ADDITIONS: Readonly<Record<string, string>> = {
  functionType: "type Rec = { publication: () => { state: string } };",
  constructType: "type Rec = { publication: new () => { state: string } };",
  comma: 'const record = { publication: (0, { state: "FAILED" }) };',
  yielded: 'const record = { publication: function* () {\n  yield { state: "FAILED" };\n} };',
  yieldedMethod: 'const record = { *publication() {\n  yield { state: "FAILED" };\n} };',
  innerDeclaration: 'const record = { publication: () => {\n  function inner() {\n    return { state: "FAILED" };\n  }\n  return inner();\n} };',
  conditionalType: "type Rec<T> = { publication: T extends string ? { state: string } : never };",
  conditionalTypeElse: "type Rec<T> = { publication: T extends string ? never : { state: string } };",
  memberAssignment: 'record.publication = { state: "FAILED" };',
  logicalAssignment: 'record.publication ??= { state: "FAILED" };',
  elementAssignment: 'record["publication"] = { state: "FAILED" };',
  assignedValue: 'const record = { publication: (cache = { state: "FAILED" }) };',
  returnType: "const record = { publication: (): { state: string } => load() };",
  functionReturnType: "const record = { publication: function (): { state: string } {\n  return load();\n} };",
  taggedTemplate: `const record = { publication: tag\`\${{ state: "FAILED" }}\` };`,
  templateLiteral: `const record = { publication: \`\${{ state: "FAILED" }}\` };`,
};
/** wb-50dt: R-SPLIT-PATH's twins at the new readings' borders, each quiet: a function declaration's own name, a plain name
 * written, and a member written through a key bound elsewhere. */
const SPLIT_PATH_ADDITIONS: Readonly<Record<string, string>> = {
  declaredFunction: 'function publication() {\n  return { state: "FAILED" };\n}',
  nameAssignment: 'publication = { state: "FAILED" };',
  keyedAssignment: 'const KEY = "publication";\nrecord[KEY] = { state: "FAILED" };',
};
/** wb-1709 (the wb-50dt gate's F1): A1's cut-5 key-path controls, each caught by exactly one matcher once the key path runs
 * through its node: a call or construct signature in a type literal held by a type alias or an interface member (the gate's
 * GA17-GA19: the claim's function or construct type spelled by signature), a function declaration's own return type (GA20), a
 * thrown value (GA25), an invoked function's or a called call's result (GA24), a tagged template's tag (GA23), a class
 * expression's members (GA22), a constructor's parameter property (GA21's member form) and a type-level indexed access chain
 * (GA28), with same-class siblings. wb-1709's second cut (the gate's refusal #1, U1-U4) adds, after typeofHead, one control per
 * reader mutant the gate wrote and one per further context of the same reading: a call signature beside another member (BM31)
 * and a construct one, a signature-holding type literal in a union, a function declaration's return type held by a function
 * expression (BM38), two deep and by an accessor, a throw caught (BM36), guarded by an if (BM36), from a function expression and
 * from a nested declaration, a non-null callee (BM35), a parenthesized conditional tag (BM34) and a non-null one, a class
 * expression as an argument (BM37) and as an arrow's body, private and protected parameter properties (BM21) and an override
 * one (BM22), a qualified head of two parts (BM14) and of three, a typeof query of a qualified name (BM20), a parenthesized
 * chain part and a parenthesized string-literal index (the gate's B04, read now). wb-1709's third cut (the gate's refusal #2,
 * U1-U6, under R-B138: the header's CLAIM SCOPE) adds, after parenthesizedIndex, one control per reader mutant GM01-GM15 in its
 * witness's form: a call signature after another member (GM01), a signature-holding type literal as an array type's element
 * (GM02), a signature returning a union (GM03), a declaration's own return type as a union (GM04) and the declaration in an if
 * block (GM05) beside the landed o04 reading in the same block (the gate's F7), an object literal argument of a thrown call
 * (GM06), a construction called (GM07), a class expression constructed bare (GM08), a tagged template as a tag (GM09), a class
 * expression as a conditional's branch and as an array element (GM10), a class expression's get accessor (GM15) and its set
 * accessor, a qualified head of three parts led by another name (GM11), a type-name head with type arguments (GM12), a bare
 * typeof head (GM13) and an index parenthesized twice (GM14). */
const KEY_PATH_ADDITIONS_CUT_5: Readonly<Record<string, string>> = {
  callSignature: "type Rec = { publication: { (): { state: string } } };",
  constructSignature: "type Rec = { publication: { new (): { state: string } } };",
  interfaceCallSignature: "interface Rec { publication: { (): { state: string } } }",
  interfaceConstructSignature: "interface Rec { publication: { new (): { state: string } } }",
  genericCallSignature: "type Rec = { publication: { <T>(value: T): { state: T } } };",
  declarationReturnType: "const record = { publication: () => {\n  function inner(): { state: string } {\n    return load();\n  }\n  return inner();\n} };",
  methodDeclarationReturnType: "const record = { publication() {\n  function inner(): { state: string } {\n    return load();\n  }\n  return inner();\n} };",
  thrown: 'const record = { publication: () => {\n  throw { state: "FAILED" };\n} };',
  thrownFromMethod: 'const record = { publication() {\n  throw { state: "FAILED" };\n} };',
  invokedArrow: 'const record = { publication: (() => ({ state: "FAILED" }))() };',
  invokedFunction: 'const record = { publication: (function () {\n  return { state: "FAILED" };\n})() };',
  calledCall: 'const record = { publication: make({ state: "FAILED" })() };',
  tagCall: 'const record = { publication: tag({ state: "FAILED" })`text` };',
  classExpression: 'const record = { publication: class {\n  state = "FAILED";\n} };',
  classExpressionMethod: 'const record = { publication: class {\n  state() {\n    return "FAILED";\n  }\n} };',
  constructedClass: 'const record = { publication: new (class {\n  state = "FAILED";\n})() };',
  classExpressionParameterProperty: 'const record = { publication: class {\n  constructor(public state = "FAILED") {}\n} };',
  parameterProperty: 'class Rec {\n  constructor(public publication = { state: "FAILED" }) {}\n}',
  parameterPropertyType: "class Rec {\n  constructor(readonly publication: { state: string }) {}\n}",
  indexedAccessType: 'type State = Rec["publication"]["state"];',
  templateIndex: 'type State = Rec[`publication`]["state"];',
  typeHead: 'type State = publication["state"];',
  qualifiedTypeHead: 'type State = api.publication["state"];',
  typeofHead: 'type State = (typeof publication)["state"];',
  signatureBesideMember: "type Rec = { publication: { (): { state: string }; extra: number } };",
  constructSignatureBesideMember: "type Rec = { publication: { new (): { state: string }; extra: number } };",
  signatureInUnion: "type Rec = { publication: { (): { state: string } } | undefined };",
  functionDeclarationReturnType: "const record = { publication: function () {\n  function inner(): { state: string } {\n    return load();\n  }\n  return inner();\n} };",
  nestedDeclarationReturnType: "const record = { publication: () => {\n  function outer() {\n    function inner(): { state: string } {\n      return load();\n    }\n    return inner();\n  }\n  return outer();\n} };",
  accessorDeclarationReturnType: "const record = { get publication() {\n  function inner(): { state: string } {\n    return load();\n  }\n  return inner();\n} };",
  caughtThrow: 'const record = { publication() {\n  try {\n    throw { state: "FAILED" };\n  } catch {\n    return null;\n  }\n} };',
  guardedThrow: 'const record = { publication: (flag: boolean) => {\n  if (flag) throw { state: "FAILED" };\n  return null;\n} };',
  thrownFromFunction: 'const record = { publication: function () {\n  throw { state: "FAILED" };\n} };',
  thrownFromDeclaration: 'const record = { publication: () => {\n  function inner() {\n    throw { state: "FAILED" };\n  }\n  return inner();\n} };',
  nonNullCallee: 'const record = { publication: make({ state: "FAILED" })!() };',
  conditionalTag: 'const record = { publication: (flag ? tag({ state: "FAILED" }) : other)`text` };',
  nonNullTag: 'const record = { publication: tag({ state: "FAILED" })!`text` };',
  classArgument: 'const record = { publication: mixin(class {\n  state = "FAILED";\n}) };',
  classReturned: 'const record = { publication: () => class {\n  state = "FAILED";\n} };',
  privateParameterProperty: 'class Rec {\n  constructor(private publication = { state: "FAILED" }) {}\n}',
  protectedParameterProperty: 'class Rec {\n  constructor(protected publication = { state: "FAILED" }) {}\n}',
  overrideParameterProperty: 'class Rec extends Base {\n  constructor(override publication = { state: "FAILED" }) {\n    super();\n  }\n}',
  qualifiedHeadEachPart: 'type Code = publication.state["code"];',
  deepQualifiedHead: 'type Value = publication.state.code["value"];',
  typeofQualifiedHead: 'type State = (typeof api.publication)["state"];',
  parenthesizedChain: 'type State = (Rec["publication"])["state"];',
  parenthesizedIndex: 'type State = Rec[("publication")]["state"];',
  signatureAfterMember: "type Rec = { publication: { extra: number; (): { state: string } } };",
  signatureInArray: "type Rec = { publication: { (): { state: string } }[] };",
  signatureUnionReturn: "type Rec = { publication: { (): { state: string } | undefined } };",
  declarationUnionReturnType: "const record = { publication: () => {\n  function inner(): { state: string } | null {\n    return load();\n  }\n  return inner();\n} };",
  blockDeclarationReturnType:
    "const record = { publication: (flag: boolean) => {\n  if (flag) {\n    function inner(): { state: string } {\n      return load();\n    }\n    return inner();\n  }\n  return null;\n} };",
  blockInnerDeclaration:
    'const record = { publication: (flag: boolean) => {\n  if (flag) {\n    function inner() {\n      return { state: "FAILED" };\n    }\n    return inner();\n  }\n  return null;\n} };',
  thrownCallArgument: 'const record = { publication: () => {\n  throw Object.assign(new Error("refused"), { state: "FAILED" });\n} };',
  constructedCallee: 'const record = { publication: new Factory({ state: "FAILED" })() };',
  constructedClassCallee: 'const record = { publication: new class {\n  state = "FAILED";\n}() };',
  taggedTag: 'const record = { publication: tag({ state: "FAILED" })`a``b` };',
  classConditional: 'const record = { publication: (flag: boolean) => flag ? class {\n  state = "FAILED";\n} : null };',
  classInArray: 'const record = { publication: [class {\n  state = "FAILED";\n}] };',
  classExpressionAccessor: 'const record = { publication: class {\n  get state() {\n    return "FAILED";\n  }\n} };',
  classExpressionSetter: "const record = { publication: class {\n  set state(value: string) {}\n} };",
  qualifiedHeadThirdPart: 'type Code = api.publication.state["code"];',
  genericTypeHead: 'type State = publication<string>["state"];',
  bareTypeofHead: 'type State = typeof publication["state"];',
  doubleParenthesizedIndex: 'type State = Rec[(("publication"))]["state"];',
};
/** wb-1709: R-SPLIT-PATH's twins at the cut-5 readings' borders and the gate's local-binding members, each quiet: a function
 * expression or an arrow held in a local (GA26), a parameter's own name (GA21's binding form, defaulted, and a constructor's plain
 * parameter), a member target inside a destructuring assignment's pattern (GA27), a module-level function declaration's, an
 * interface's or a type alias's own name carrying a return type or a call signature, a class declaration's or a bound class
 * expression's own name, and a type-level index bound elsewhere. wb-1709's second cut adds R-SPLIT-PATH's member-access twins
 * (the gate's B01, B02, B13 and B03): a function expression invoked through .call and through .apply, an arrow invoked through
 * .bind, and a call read through a member, each quiet. wb-1709's third cut adds, after memberCallArgument, three more, each quiet: a
 * tagged template's type arguments (the first cut's non-claim, until now prose only) and a qualified name outside an indexed
 * access, a type reference's and a typeof query's (the gate's refusal-#1 B26 and B25). */
const SPLIT_PATH_ADDITIONS_CUT_5: Readonly<Record<string, string>> = {
  localFunction: 'const record = { publication: () => {\n  const inner = function () {\n    return { state: "FAILED" };\n  };\n  return inner();\n} };',
  localArrow: 'const record = { publication: () => {\n  const inner = () => ({ state: "FAILED" });\n  return inner();\n} };',
  parameterDefault: 'const record = { publication: (value = { state: "FAILED" }) => value };',
  constructorParameter: 'class Rec {\n  constructor(publication = { state: "FAILED" }) {}\n}',
  patternTarget: '[record.publication] = [{ state: "FAILED" }];',
  patternKeyTarget: '({ value: record.publication } = { value: { state: "FAILED" } });',
  declaredReturnType: "function publication(): { state: string } {\n  return load();\n}",
  interfaceSignature: "interface Publication {\n  (): { state: string };\n}",
  typeSignature: "type Publication = { (): { state: string } };",
  className: 'class Publication {\n  state = "FAILED";\n}',
  boundClass: 'const Publication = class {\n  state = "FAILED";\n};',
  keyedIndexType: 'type Key = "publication";\ntype State = Rec[Key]["state"];',
  memberInvokedFunction: 'const record = { publication: function () {\n  return { state: "FAILED" };\n}.call(this) };',
  memberAppliedFunction: 'const record = { publication: function () {\n  return { state: "FAILED" };\n}.apply(null) };',
  memberBoundArrow: 'const record = { publication: (() => ({ state: "FAILED" })).bind(this)() };',
  memberCallArgument: 'const record = { publication: make({ state: "FAILED" }).run() };',
  tagTypeArgument: "const record = { publication: tag<{ state: string }>`text` };",
  qualifiedTypeName: "let value: publication.state;",
  typeofChain: "type State = typeof record.publication.state;",
};

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
    const control = (text: string, fileName = "control.ts"): number => federationHits(fileName, text).length;
    // wb-rgov (the wb-yg70 gate's F4): every control below is read through `group`, which records its group, name, reading and
    // the sha256/16 of its text; that record stands in the receipt's A1 control table, outside this file and its roster, so a
    // control removed together with its reading, or rewritten to a text a narrowed reading still catches, reds A1.
    const ledger: string[][] = [];
    const group = <Name extends string>(name: string, texts: Readonly<Record<Name, string>>, fileName = "control.ts"): Record<Name, number> => {
      const counts: Partial<Record<Name, number>> = {};
      for (const key of Object.keys(texts) as Name[]) {
        const count = control(texts[key], fileName);
        ledger.push([name, key, String(count), shaOf(texts[key])]);
        counts[key] = count;
      }
      return counts as Record<Name, number>;
    };
    // Each matcher's own positive control: its spelling is caught by it alone.
    const members = Object.fromEntries(FEDERATION_SPELLINGS.map(spelling => [spelling, federationHits("control.ts", `const key = "${spelling}";`)]));
    expect(Object.values(members)).toStrictEqual(FEDERATION_MATCHERS.map(matcher => [matcher.source]));
    const controls = {
      members,
      ...group("controls", {
        snake: "const state = record.publication_state;",
        camel: "const state = record.publicationState;",
        quoted: 'const key = "matched_count";',
        destructured: "const { witness_digest: witness } = coverage;",
        recordName: "interface QueryViewRef { availability: string; verdict: string }",
        camelRecord: "const ref = queryViewRef;",
        boundaryName: "type Boundary = OwnerBoundary;",
        witnessField: 'const key = "manifest_digest";',
        escaped: 'const key = "publication\\u005fstate";',
        escapedName: "const publication\\u005fstate = 1;",
        dotted: 'const path = "publication.state";',
        chain: "const value = record.publication.state;",
        prefixed: "const value = readPublicationState(record);",
        pattern: "const reads = /witness_digest/;",
        prose: "// reads a federated query view",
        commentOnly: "/** the federated query view of an OwnerBoundary */\nexport const x = 1;",
        composed: 'const key = ["publication", "state"].join("_");',
      }),
    };
    // The gate's F3: a comment reads no field, so a comment-only mention is no hit. R-COMPOSED-FIELD's quiet row: a spelling
    // assembled from parts stays invisible to the scan.
    expect({ prose: controls.prose, commentOnly: controls.commentOnly, composed: controls.composed }).toStrictEqual({ prose: 0, commentOnly: 0, composed: 0 });
    // The measured coverage witness fields (query_view.py:181, the roster's vocabulary) are each caught.
    const measuredWitnessFields = Object.fromEntries(MEASURED.witnessFields.map(field => [field, control(`const key = "${field}";`)]));
    expect(Object.values(measuredWitnessFields).every(count => count === 1)).toBe(true);
    // wb-yg70 (the wb-d8io gate's F1): a plural name reads singular (i), a field fused inside one word reads through the fused
    // matchers (ii), and an access chain reads through any head, wrapper or literal key while a nested pattern, literal or type
    // spells its key path (iii): each control is caught, by exactly one matcher. wb-rgov (the wb-yg70 gate's F2): the key path
    // also reads through a readonly or other type operator, an optional, rest or named tuple member, a call or construction
    // argument, a conditional branch, a ?? || && operand, an arrow body, a returned value, an await, a spread and a JSX
    // attribute's value.
    const widened = {
      plural: group("widened.plural", {
        snake: "const PUBLIC_STATES = [];",
        camel: "const witnessDigests = [];",
        quoted: 'const key = "matched_counts";',
        ies: "const ownerBoundaries = [];",
        inner: "const backendInstanceIds = [];",
      }),
      fused: group("widened.fused", {
        lower: "const queryviewref = 1;",
        upper: "const QUERYVIEWREF = 1;",
        prefixed: "const readpublicationstate = 1;",
        plural: "const ownerboundariesref = 1;",
        prose: 'const note = "reads the queryviewref field";',
      }),
      chains: group("widened.chains", {
        element: 'const value = record["publication"]["state"];',
        mixed: 'const value = record.publication["state"];',
        nonNull: "const value = record!.publication!.state;",
        asserted: "const value = (record as Rec).publication.state;",
        satisfied: "const value = (record satisfies Rec).publication.state;",
        called: "const value = load().publication.state;",
        constructed: "const value = new Rec().publication.state;",
        optional: 'const value = record?.["publication"]?.state;',
        templateKey: "const value = record[`publication`].state;",
      }),
      nested: group("widened.nested", {
        binding: "const { publication: { state } } = record;",
        parameter: "function read({ publication: { state } }: Rec) { return state; }",
        assignment: "({ publication: { state } } = record);",
        literal: 'const record = { publication: { state: "FAILED" } };',
        type: "type Rec = { publication: { state: string } };",
        member: "interface Rec { publication: { state: string } }",
        classProperty: 'class Rec { publication = { state: "FAILED" }; }',
        deep: "const { backend: { instance: { id } } } = record;",
        array: "const { publication: [{ state }] } = record;",
        readonlyType: "type Rec = { publication: readonly { state: string }[] };",
        optionalType: "type Rec = { publication: [{ state: string }?] };",
        restType: "type Rec = { publication: [...{ state: string }[]] };",
        namedTuple: "type Rec = { publication: [first: { state: string }] };",
        callArgument: 'const record = { publication: make({ state: "FAILED" }) };',
        newArgument: 'const record = { publication: new Box({ state: "FAILED" }) };',
        conditional: 'const record = { publication: flag ? { state: "FAILED" } : null };',
        conditionalElse: 'const record = { publication: flag ? null : { state: "FAILED" } };',
        logical: 'const record = { publication: fallback ?? { state: "FAILED" } };',
        arrowBody: 'const record = { publication: () => ({ state: "FAILED" }) };',
        returned: 'const record = { publication: () => {\n  return { state: "FAILED" };\n} };',
        functionReturn: 'const record = { publication: function () {\n  return { state: "FAILED" };\n} };',
        methodReturn: 'const record = { publication() {\n  return { state: "FAILED" };\n} };',
        awaited: 'const read = async () => ({ publication: await load({ state: "FAILED" }) });',
        spread: 'const record = { publication: { ...{ state: "FAILED" } } };',
        spreadElement: 'const record = { publication: [...[{ state: "FAILED" }]] };',
      }),
      jsx: group("widened.jsx", { attribute: 'export const view = <Card publication={{ state: "FAILED" }} />;' }, "control.tsx"),
    };
    const missed = Object.entries(widened).flatMap(([name, counts]) =>
      Object.entries(counts)
        .filter(([, count]) => count !== 1)
        .map(([key]) => `${name}.${key}`),
    );
    expect(missed, "a widened reading's control is not caught by exactly one matcher").toEqual([]);
    // R-FUSED-SPLIT's and R-SPLIT-PATH's quiet rows: a field fused into a word that a case hump or a separator splits from its
    // other words, the English compounds that reading would otherwise take, and a path joined only through a local binding, a key
    // bound elsewhere or a variable's own name all read quiet; wb-rgov (the wb-yg70 gate's F6) adds R-SPLIT-PATH's type-level
    // twins: an interface's or a type alias's own name and a mapped-type key.
    const quiet = group("quiet", {
      fusedSplitCamel: "const queryViewref = 1;",
      fusedSplitSnake: "const QUERY_VIEWREF = 1;",
      compoundCamel: "const publicStatement = 1;",
      compoundSnake: "const matched_counter = 1;",
      aliasedPath: "const { publication: p } = record;\nconst value = p.state;",
      keyedPath: 'const KEY = "publication";\nconst value = record[KEY].state;',
      boundPath: 'const publication = { state: "FAILED" };',
      interfaceName: "interface Publication { state: string }",
      typeName: "type Publication = { state: string };",
      mappedKey: 'type Rec = { [K in "publication"]: { state: string } };',
    });
    expect(quiet).toStrictEqual({
      fusedSplitCamel: 0,
      fusedSplitSnake: 0,
      compoundCamel: 0,
      compoundSnake: 0,
      aliasedPath: 0,
      keyedPath: 0,
      boundPath: 0,
      interfaceName: 0,
      typeName: 0,
      mappedKey: 0,
    });
    // The fused over-read, pinned (wb-rgov, the wb-yg70 gate's F3): a single word holding a matcher's fused words anywhere inside it
    // is a hit, so an English compound written as one word reads as a federation field - the false-red direction, which only a
    // dictionary could tell apart; a src word spelling one reds A1 by design.
    const overread = group("overread", {
      fusedLower: "const publicstatement = 1;",
      fusedUpper: "const MATCHEDCOUNTER = 1;",
      fusedStem: 'const note = "a confederation of shards";',
    });
    expect(overread).toStrictEqual({ fusedLower: 1, fusedUpper: 1, fusedStem: 1 });
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
    // wb-rgov (F4): the walk's controls join the record - each planted file with its reading and the sha256/16 of its text, the
    // listed link and each extension's script kind.
    for (const [file, count] of Object.entries(walk.files)) ledger.push(["walk.files", file, String(count), shaOf(textOf(join(plantRoot, file)))]);
    for (const entry of walk.others) ledger.push(["walk.others", entry, "listed", "-"]);
    for (const [extension, kind] of Object.entries(walk.kinds)) ledger.push(["walk.kinds", extension, kind, "-"]);
    // wb-50dt (the wb-rgov gate's F2): the key path also runs through nine more nodes, each control caught by exactly one matcher,
    // and R-SPLIT-PATH's twins at those readings' borders stay quiet; both groups join the record after the walk, so the cut-3
    // table stays the record's head and the cut-4 additions table its tail.
    const keyPaths = group("widened.keyPaths", KEY_PATH_ADDITIONS);
    expect(
      Object.entries(keyPaths)
        .filter(([, count]) => count !== 1)
        .map(([key]) => key),
      "a cut-4 key-path control is not caught by exactly one matcher",
    ).toEqual([]);
    const splitPath = group("quiet.splitPath", SPLIT_PATH_ADDITIONS);
    expect(Object.values(splitPath).every(count => count === 0), "an R-SPLIT-PATH twin reads as a key path").toBe(true);
    // wb-1709 (the wb-50dt gate's F1): the key path also runs through call and construct signatures, a function declaration's own
    // return type, a thrown value, a callee, a tag, a class expression's members and a parameter property, and a type-level indexed
    // access chain is a unit; each control is caught by exactly one matcher and R-SPLIT-PATH's cut-5 twins stay quiet. Both groups
    // join the record after the cut-4 ones, held to the cut-5 additions table; the second and third cuts' controls join the same
    // two groups.
    const keyPathsCut5 = group("widened.keyPaths.cut5", KEY_PATH_ADDITIONS_CUT_5);
    expect(
      Object.entries(keyPathsCut5)
        .filter(([, count]) => count !== 1)
        .map(([key]) => key),
      "a cut-5 key-path control is not caught by exactly one matcher",
    ).toEqual([]);
    const splitPathCut5 = group("quiet.splitPath.cut5", SPLIT_PATH_ADDITIONS_CUT_5);
    expect(Object.values(splitPathCut5).every(count => count === 0), "a cut-5 R-SPLIT-PATH twin reads as a key path").toBe(true);
    expect(ledger, "A1's controls (group, name, reading, text) stand in the receipt's A1 control table, then in its cut-4 and cut-5 additions").toStrictEqual([
      ...receiptTable(RECEIPT_TABLES.readingControls),
      ...receiptTable(RECEIPT_TABLES.readingControlAdditions),
      ...receiptTable(RECEIPT_TABLES.readingControlCut5),
    ]);
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
      overread,
      walk,
      keyPaths,
      splitPath,
      keyPathsCut5,
      splitPathCut5,
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
  // wb-rgov (the wb-yg70 gate's F1): an options argument through a wrapper or a branch, an argument held elsewhere, a context
  // through an alias, a wrapper, a destructure or a rest binding, a hook's context, and a write to a task's run flags.
  ["a conditional options object", 'it(pin, pin === "Q6" ? { timeout: 60_000, skip: true } : { timeout: 60_000 }, async () => {});', ["options skip"]],
  ["a conditional options fallback", 'it(pin, pin === "Q6" ? { timeout: 60_000 } : { timeout: 60_000, todo: true }, async () => {});', ["options todo"]],
  ["an asserted options object", 'it("judge", { skip: true } as const, () => {});', ["options skip"]],
  ["a parenthesized options object", 'it("judge", ({ skip: true }), () => {});', ["options skip"]],
  ["a defaulted options object", "it(pin, options ?? { todo: true }, async () => {});", ["argument unread", "options todo"]],
  ["a held options object", "it(pin, GATE_OPTIONS[pin] ?? { timeout: 60_000 }, async () => {});", ["argument unread"]],
  ["a held options member", 'it("judge", GATE_OPTIONS.Q6, () => {});', ["argument unread"]],
  ["a held callback", 'it("judge", body);', ["argument unread"]],
  ["a context alias", `it("judge", (context) => {\n  const peer = context;\n  ${dot("peer", "skip")}();\n});`, ["context skip"]],
  ["a wrapped context", `it("judge", (context) => {\n  ${dot("(context as { skip: () => void })", "skip")}();\n});`, ["context skip"]],
  ["a body destructure", 'it("judge", (context) => {\n  const { skip } = context;\n  skip();\n});', ["context skip"]],
  ["a rest context", `it("judge", ({ task, ...rest }) => {\n  ${dot("rest", "skip")}(task.name);\n});`, ["context skip"]],
  ["a computed context member", 'it("judge", (context) => {\n  context[mode]();\n});', ["context computed member"]],
  ["a context escape", 'it("judge", (context) => {\n  hide(context);\n});', ["context escape"]],
  ["an array-pattern context", 'it("judge", ([first]) => {\n  first();\n});', ["context escape"]],
  ["a hook skip", `import { beforeEach } from "vitest";\nbeforeEach((context) => {\n  ${dot("context", "skip")}();\n});`, ["context skip"]],
  ["a hook on a registrar", `${dot("it", "beforeEach")}((context) => {\n  ${dot("context", "skip")}();\n});`, ["context skip"]],
  ["a renamed hook import", `import { beforeEach as setup } from "vitest";\nsetup((context) => {\n  ${dot("context", "skip")}();\n});`, ["context skip"]],
  ["a namespace hook", `import * as vitest from "vitest";\n${dot("vitest", "afterEach")}((context) => {\n  ${dot("context", "skip")}();\n});`, ["context skip"]],
  ["a hook alias", `import { beforeEach } from "vitest";\nconst setup = beforeEach;\nsetup((context) => {\n  ${dot("context", "skip")}();\n});`, ["context skip"]],
  ["a held hook callback", 'import { afterEach } from "vitest";\nafterEach(cleanup);', ["argument unread"]],
  ["a held hook callback on a registrar", `${dot("it", "afterEach")}(cleanup);`, ["argument unread"]],
  ["a failure-hook skip", `it("judge", ({ onTestFailed }) => {\n  onTestFailed((context) => ${dot("context", "skip")}());\n});`, ["context skip"]],
  ["a mode write", 'import { beforeAll } from "vitest";\nbeforeAll((context, suite) => {\n  suite.tasks[0].mode = "skip";\n});', ["task write"]],
  ["an inverting write", "const invert = (task) => {\n  task.fails = true;\n};", ["task write"]],
  [
    "the run forms",
    'it("judge", () => {});\nit(pin, { timeout: 60_000, skip: false }, async () => {});\ndescribe("row", () => {});\nconst inverted = child.fails === true;',
    [],
  ],
  ["the non-claim", `const api = { it };\n${dot(dot("api", "it"), "skip")}("judge", () => {});`, []],
  [
    "the inline run forms",
    'import { beforeEach } from "vitest";\nit("judge", () => {}, 60_000);\nit(pin, pin === "Q6" ? { timeout: 1 } : { timeout: 2 }, async () => {});\nit("judge", { skip: false } as const, () => {});\nbeforeEach(({ task }) => {\n  task.name;\n});',
    [],
  ],
  [
    "the non-claims through other values",
    'import { afterAll } from "vitest";\ninstallGuard(afterAll);\nReflect.set(task, "mode", "skip");\nObject.assign(task, { mode: "skip" });\ntask[flag] = "skip";',
    [],
  ],
  // wb-50dt (the wb-rgov gate's F1): every write of a task's run flags - a target of a destructuring assignment's array or object
  // pattern (nested, wrapped, defaulted or rest) or of a for-in or for-of head, an increment or decrement, a delete (K3-K6); a
  // rest parameter and a function's arguments object (K7, K8); the task's back-reference to its context (K9); a namespace's hook
  // and registrar through literal element keys (K10, K11), a computed namespace member, a namespace alias, rest and destructure, a
  // registrar chain's destructured member and hook, a test hook through a literal key; a spread argument (K19); and an extend
  // call's fixtures (K30). Then the run forms these readings must leave alone, and the cut's non-claims.
  ["an array-pattern write", '[t.mode] = ["skip"];', ["task write"]],
  ["an object-pattern write", '({ m: t.mode } = { m: "skip" });', ["task write"]],
  ["a for-of write", 'for (t.mode of ["skip"]);', ["task write"]],
  ["a for-in write", `for (${dot("t", "fails")} in { on: 1 });`, ["task write"]],
  ["a nested pattern write", `[{ m: [${dot("t", "fails")}] }] = [{ m: [true] }];`, ["task write"]],
  ["a defaulted pattern write", '({ m: t.mode = "skip" } = {});', ["task write"]],
  ["a rest pattern write", `[...${dot("t", "fails")}] = [true];`, ["task write"]],
  ["an object rest write", "({ ...t.mode } = {});", ["task write"]],
  ["a for-of pattern write", 'for ([t.mode] of [["skip"]]);', ["task write"]],
  ["a wrapped pattern write", '[(t.mode)] = ["skip"];', ["task write"]],
  ["an increment", `${dot("t", "fails")}++;`, ["task write"]],
  ["a prefix decrement", '--t["fails"];', ["task write"]],
  ["a delete", "delete t.mode;", ["task write"]],
  ["a rest parameter", `it("judge", (...args) => {\n  ${dot("args[0]", "skip")}();\n});`, ["context escape"]],
  ["the arguments object", `it("judge", function () {\n  ${dot("arguments[0]", "skip")}();\n});`, ["context escape"]],
  ["a nested function's own arguments", 'it("judge", function () {\n  const count = function () {\n    return arguments.length;\n  };\n  count();\n});', []],
  ["a task back-reference", `it("judge", ({ task }) => {\n  ${dot(dot("task", "context"), "skip")}();\n});`, ["context skip"]],
  ["a context's task back-reference", `it("judge", (context) => {\n  ${dot(dot(dot("context", "task"), "context"), "skip")}();\n});`, ["context skip"]],
  ["a destructured back-reference", `it("judge", ({ task }) => {\n  const { context } = task;\n  ${dot("context", "skip")}();\n});`, ["context skip"]],
  ["a held back-reference", `it("judge", ({ task }) => {\n  const current = task.context;\n  ${dot("current", "skip")}();\n});`, ["context skip"]],
  ["a task alias", `it("judge", (context) => {\n  const current = context.task;\n  ${dot(dot("current", "context"), "skip")}();\n});`, ["context skip"]],
  ["a bound task key", `it("judge", (context) => {\n  const { task } = context;\n  ${dot(dot("task", "context"), "skip")}();\n});`, ["context skip"]],
  ["a task pattern's rest", `it("judge", ({ task }) => {\n  const { ...copy } = task;\n  ${dot(dot("copy", "context"), "skip")}();\n});`, ["context skip"]],
  ["a back-reference by a literal key", `it("judge", ({ task }) => {\n  ${dot('task["context"]', "skip")}();\n});`, ["context skip"]],
  ["a task member by a literal key", `it("judge", (context) => {\n  ${dot('context["task"].context', "skip")}();\n});`, ["context skip"]],
  ["a back-reference escape", 'it("judge", ({ task }) => {\n  hide(task.context);\n});', ["context escape"]],
  ["a namespace hook by a literal key", 'import * as vitest from "vitest";\nvitest["beforeEach"](({ skip }) => {\n  skip();\n});', ["context skip"]],
  ["a namespace registrar by literal keys", 'import * as vitest from "vitest";\nvitest["it"]["skip"]("judge", () => {});', ["skip"]],
  ["a namespace registrar by a literal key", `import * as vitest from "vitest";\n${dot('vitest["test"]', "todo")}("judge");`, ["todo"]],
  ["a wrapped namespace", `import * as vitest from "vitest";\n${dot(dot("(vitest as typeof vitest)", "it"), "skip")}("judge", () => {});`, ["skip"]],
  ["a computed namespace member", 'import * as vitest from "vitest";\nvitest[member]("judge", () => {});', ["computed member"]],
  ["a namespace alias", `import * as vitest from "vitest";\nconst api = vitest;\n${dot(dot("api", "it"), "skip")}("judge", () => {});`, ["skip"]],
  ["a destructured namespace registrar", `import * as vitest from "vitest";\nconst { it: check } = vitest;\n${dot("check", "only")}("judge", () => {});`, ["only"]],
  ["a destructured namespace hook", `import * as vitest from "vitest";\nconst { afterEach: after } = vitest;\nafter((context) => {\n  ${dot("context", "skip")}();\n});`, ["context skip"]],
  ["a namespace rest", `import * as vitest from "vitest";\nconst { ...api } = vitest;\n${dot(dot("api", "it"), "skip")}("judge", () => {});`, ["skip"]],
  ["a namespace rest's other member", `import * as vitest from "vitest";\nconst { ...api } = vitest;\n${dot(dot("api", "vi"), "skip")}();`, []],
  ["a destructured chain member", `const { concurrent: parallel } = it;\n${dot("parallel", "skip")}("judge", () => {});`, ["skip"]],
  ["a destructured registrar hook", `const { beforeEach: setup } = it;\nsetup((context) => {\n  ${dot("context", "skip")}();\n});`, ["context skip"]],
  ["a computed destructure", "const { [mode]: run } = it;", ["computed member"]],
  ["a computed namespace destructure", 'import * as vitest from "vitest";\nconst { [name]: run } = vitest;', ["computed member"]],
  ["a test hook by a literal key", `it("judge", (context) => {\n  context["onTestFailed"]((failed) => ${dot("failed", "skip")}());\n});`, ["context skip"]],
  ["a spread argument", 'it(...["judge", { skip: true }], () => {});', ["options skip"]],
  ["a nested spread argument", 'it(...[...["judge", { todo: true }]], () => {});', ["options todo"]],
  ["a held spread argument", "it(...cases);", ["argument unread"]],
  ["an auto fixture", "const check = it.extend({\n  guard: [\n    async ({ skip }, use) => {\n      skip();\n      await use(1);\n    },\n    { auto: true },\n  ],\n});", ["context skip"]],
  ["a fixture function", `const check = test.extend({\n  guard: async (context, use) => {\n    ${dot("context", "skip")}();\n    await use(1);\n  },\n});`, ["context skip"]],
  ["a fixture method", "const check = it.extend({\n  async guard({ skip }, use) {\n    skip();\n    await use(1);\n  },\n});", ["context skip"]],
  ["a held fixture", "const check = it.extend({ guard: makeGuard });", ["argument unread"]],
  ["held fixtures", "const check = it.extend(FIXTURES);", ["argument unread"]],
  ["a fixture's rest parameter", "const check = it.extend({\n  guard: async (...args) => {\n    await args[1](1);\n  },\n});", ["context escape"]],
  [
    "the cut-4 run forms",
    'const { mode } = options;\n({ mode } = options);\nfor (const name of names) {}\nfor (name of names) {}\ndelete cache.entry;\ncount++;\nit("judge", ({ task }) => {\n  task.name;\n});\nit(...["judge"], () => {});\nconst check = it.extend({\n  port: 3000,\n  config: { retries: 2 },\n  guard: [\n    async ({ task }, use) => {\n      await use(task.name);\n    },\n    { auto: true },\n  ],\n});',
    [],
  ],
  [
    "the cut-4 non-claims",
    'import * as vitest from "vitest";\nit("judge", ({ task }) => {\n  hide(task);\n});\nconst { it: { skip: nested } } = vitest;\nnested("judge", () => {});',
    [],
  ],
];

/** vitest 4.1.10's hooks, as the module imports them or as a member of a registrar chain (wb-rgov, the wb-yg70 gate's F1): each
 * beforeEach, afterEach and aroundEach listener receives the test context, so a skip it reads skips the test. */
const HOOKS: readonly string[] = ["beforeEach", "afterEach", "aroundEach", "beforeAll", "afterAll", "aroundAll"];
/** The test context's own hooks, read by name wherever they are called (a skip in a failure handler turns the failure skipped). */
const TEST_HOOKS: readonly string[] = ["onTestFailed", "onTestFinished"];
/** The run flags of a task: a write to one reruns, skips or inverts a case without a registration member (wb-rgov). */
const TASK_FLAGS: readonly string[] = ["mode", "fails"];

/**
 * The skip modes a test module's registrations carry, in source order (wb-yg70, the wb-d8io gate's F3): a SKIP_MODES member on a
 * chain rooted at a registrar - it, test, describe or suite as the module imports them from vitest (a renamed import keeps its
 * local name, a namespace import its member), or a variable bound to such a chain, to a fixed point - anywhere in the module (a
 * call head, a conditional, an alias, a destructured member), or a computed member on one; an OPTION_MODES key of an
 * options-object argument of a registration call that is not literally false (a spread or a computed key read as one); and a
 * skip read on a parameter of a registration callback (a member of it, or a destructured skip). wb-rgov (the wb-yg70 gate's F1):
 * an argument is read through wrappers, both branches of a conditional and both operands of ?? || &&, and one after a
 * registration's name (or any argument of a hook call) that is neither an object literal, an inline function nor a plain literal
 * reads "argument unread"; every parameter of an inline callback of a registration or a hook (HOOKS as imported or on a registrar
 * chain, TEST_HOOKS by name) is a context, with its aliases and rest bindings to a fixed point, and a skip read on one is a
 * context skip, a computed member a "context computed member" and any other use a "context escape"; and an assignment to a
 * TASK_FLAGS member anywhere in the module is a "task write".
 */
function registrationModes(fileName: string, text: string): string[] {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, scriptKindOf(fileName));
  const registrars = new Set<string>();
  const hooks = new Set<string>();
  const namespaces = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== "vitest") continue;
    const named = statement.importClause?.namedBindings;
    if (named !== undefined && ts.isNamespaceImport(named)) namespaces.add(named.name.text);
    if (named !== undefined && ts.isNamedImports(named)) {
      for (const element of named.elements) {
        const imported = (element.propertyName ?? element.name).text;
        if (REGISTRARS.includes(imported)) registrars.add(element.name.text);
        if (HOOKS.includes(imported)) hooks.add(element.name.text);
      }
    }
  }
  /** A namespace import of vitest through the wrappers, or (wb-50dt) a name bound to one or to the rest of one. */
  const isNamespace = (node: ts.Expression): boolean => {
    const at = unwrapped(node);
    return ts.isIdentifier(at) && namespaces.has(at.text);
  };
  const rooted = (node: ts.Expression): boolean => {
    const at = unwrapped(node);
    if (ts.isIdentifier(at)) return registrars.has(at.text);
    // wb-50dt (the wb-rgov gate's F1 K11): a namespace's registrar member is read through a literal element key too.
    if (ts.isPropertyAccessExpression(at) || ts.isElementAccessExpression(at)) {
      const member = accessName(at);
      return (isNamespace(at.expression) && member !== undefined && REGISTRARS.includes(member)) || rooted(at.expression);
    }
    if (ts.isCallExpression(at)) return rooted(at.expression);
    if (ts.isConditionalExpression(at)) return rooted(at.whenTrue) || rooted(at.whenFalse);
    return false;
  };
  /** A hook: an imported hook or an alias of one, a namespace's hook member, or a hook member of a registrar chain; wb-50dt (the
   * wb-rgov gate's F1 K10): a member read through a literal element key too. */
  const isHook = (node: ts.Expression): boolean => {
    const at = unwrapped(node);
    if (ts.isIdentifier(at)) return hooks.has(at.text);
    if (ts.isPropertyAccessExpression(at) || ts.isElementAccessExpression(at)) {
      const member = accessName(at);
      return member !== undefined && HOOKS.includes(member) && (isNamespace(at.expression) || rooted(at.expression));
    }
    return false;
  };
  /** A test-context hook, by name: a bare onTestFailed or onTestFinished, or a member so named (wb-50dt: through a literal element
   * key too). */
  const isTestHook = (node: ts.Expression): boolean => {
    const at = unwrapped(node);
    if (ts.isIdentifier(at)) return TEST_HOOKS.includes(at.text);
    if (ts.isPropertyAccessExpression(at) || ts.isElementAccessExpression(at)) {
      const member = accessName(at);
      return member !== undefined && TEST_HOOKS.includes(member);
    }
    return false;
  };
  /** wb-50dt (the wb-rgov gate's F1 K30): an extend member of a registrar chain, whose call defines fixtures. */
  const isExtend = (node: ts.Expression): boolean => {
    const at = unwrapped(node);
    return (ts.isPropertyAccessExpression(at) || ts.isElementAccessExpression(at)) && accessName(at) === "extend" && rooted(at.expression);
  };
  const declarations: ts.VariableDeclaration[] = [];
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) declarations.push(node);
    ts.forEachChild(node, collect);
  };
  collect(source);
  // A variable bound to a registrar chain is a registrar too, and one bound to a hook a hook (an alias of an alias included):
  // read to a fixed point. wb-50dt (the wb-rgov gate's F1): one bound to a namespace is a namespace; an object pattern on a
  // namespace binds its registrar members as registrars, its hook members as hooks and its rest as a namespace, and one on a
  // registrar chain binds its hook members as hooks and every other member and its rest as registrar chains. A nested pattern
  // binds nothing here (a non-claim).
  const bind = (set: Set<string>, name: string): boolean => {
    if (set.has(name)) return false;
    set.add(name);
    return true;
  };
  for (let grew = true; grew; ) {
    grew = false;
    for (const declaration of declarations) {
      const name = declaration.name;
      const initializer = declaration.initializer;
      if (initializer === undefined) continue;
      if (ts.isIdentifier(name)) {
        if (rooted(initializer) && bind(registrars, name.text)) grew = true;
        if (isHook(initializer) && bind(hooks, name.text)) grew = true;
        if (isNamespace(initializer) && bind(namespaces, name.text)) grew = true;
        continue;
      }
      if (!ts.isObjectBindingPattern(name)) continue;
      const fromNamespace = isNamespace(initializer);
      if (!fromNamespace && !rooted(initializer)) continue;
      for (const element of name.elements) {
        if (!ts.isIdentifier(element.name)) continue;
        const key = element.dotDotDotToken === undefined ? keyText(element.propertyName ?? element.name) : undefined;
        const into =
          element.dotDotDotToken !== undefined
            ? fromNamespace
              ? namespaces
              : registrars
            : key !== undefined && HOOKS.includes(key)
              ? hooks
              : key !== undefined && (!fromNamespace || REGISTRARS.includes(key))
                ? registrars
                : undefined;
        if (into !== undefined && bind(into, element.name.text)) grew = true;
      }
    }
  }
  const modes: string[] = [];
  /** The values an argument can take: through the wrappers, both branches of a conditional and both logical operands. */
  const valuesOf = (node: ts.Expression): ts.Expression[] => {
    const at = unwrapped(node);
    if (ts.isConditionalExpression(at)) return [...valuesOf(at.whenTrue), ...valuesOf(at.whenFalse)];
    if (ts.isBinaryExpression(at) && LOGICAL_OPERATORS.includes(at.operatorToken.kind)) return [...valuesOf(at.left), ...valuesOf(at.right)];
    return [at];
  };
  /** A literal that carries no run mode: a number, a string, a boolean, null or undefined. */
  const isPlain = (node: ts.Expression): boolean =>
    ts.isNumericLiteral(node) ||
    ts.isStringLiteralLike(node) ||
    node.kind === ts.SyntaxKind.TrueKeyword ||
    node.kind === ts.SyntaxKind.FalseKeyword ||
    node.kind === ts.SyntaxKind.NullKeyword ||
    (ts.isIdentifier(node) && node.text === "undefined");
  const optionModes = (options: ts.ObjectLiteralExpression): void => {
    for (const property of options.properties) {
      if (ts.isSpreadAssignment(property)) modes.push("options spread");
      else if (property.name === undefined || ts.isComputedPropertyName(property.name)) modes.push("options computed key");
      else {
        const key = keyText(property.name);
        const literallyFalse = ts.isPropertyAssignment(property) && property.initializer.kind === ts.SyntaxKind.FalseKeyword;
        if (key !== undefined && OPTION_MODES.includes(key) && !literallyFalse) modes.push(`options ${key}`);
      }
    }
  };
  /** The context skips one inline callback reads: its parameters are contexts, and so is each name bound to one or to the rest of
   * one, to a fixed point; every use of a context but a member read or a binding of it is read. wb-50dt (the wb-rgov gate's F1):
   * only the first `count` parameters are contexts (a fixture's first one); a rest parameter (K7), and a use of a function's or a
   * method's own arguments object outside a nested function that has its own (K8), reads as a context escape; and a task bound
   * from a context - a destructured task key, a task member, an alias of either or the rest of a task pattern - carries the
   * context back (K9): its context member (a property or a literal element key), a context key destructured from it and their
   * aliases are contexts. A task's other uses are not followed (a non-claim). */
  const contextModes = (callback: ts.ArrowFunction | ts.FunctionExpression | ts.MethodDeclaration, count = callback.parameters.length): void => {
    const body = callback.body;
    if (body === undefined) return;
    const contexts = new Set<string>();
    const tasks = new Set<string>();
    const patterns: ts.ObjectBindingPattern[] = [];
    for (const parameter of callback.parameters.slice(0, count)) {
      if (parameter.dotDotDotToken !== undefined) modes.push("context escape");
      else if (ts.isIdentifier(parameter.name)) contexts.add(parameter.name.text);
      else if (ts.isObjectBindingPattern(parameter.name)) patterns.push(parameter.name);
      else modes.push("context escape");
    }
    const bound: ts.VariableDeclaration[] = [];
    const collectBound = (node: ts.Node): void => {
      if (ts.isVariableDeclaration(node) && node.initializer !== undefined) bound.push(node);
      ts.forEachChild(node, collectBound);
    };
    collectBound(body);
    /** A task: a name bound to one, or a task member of a context. */
    const isTask = (node: ts.Expression): boolean => {
      const at = unwrapped(node);
      if (ts.isIdentifier(at)) return tasks.has(at.text);
      return (ts.isPropertyAccessExpression(at) || ts.isElementAccessExpression(at)) && accessName(at) === "task" && isContext(at.expression);
    };
    /** A context: a name bound to one, or a task's context member. */
    const isContext = (node: ts.Expression): boolean => {
      const at = unwrapped(node);
      if (ts.isIdentifier(at)) return contexts.has(at.text);
      return (ts.isPropertyAccessExpression(at) || ts.isElementAccessExpression(at)) && accessName(at) === "context" && isTask(at.expression);
    };
    const restOf = (pattern: ts.ObjectBindingPattern): string[] =>
      pattern.elements.flatMap(element => (element.dotDotDotToken !== undefined && ts.isIdentifier(element.name) ? [element.name.text] : []));
    /** The names an object pattern binds to one key, each an identifier (a nested pattern binds none here). */
    const keyed = (pattern: ts.ObjectBindingPattern, key: string): string[] =>
      pattern.elements.flatMap(element =>
        element.dotDotDotToken === undefined && ts.isIdentifier(element.name) && keyText(element.propertyName ?? element.name) === key ? [element.name.text] : [],
      );
    for (const pattern of patterns) {
      for (const name of restOf(pattern)) contexts.add(name);
      for (const name of keyed(pattern, "task")) tasks.add(name);
    }
    const boundPatterns = new Set<ts.ObjectBindingPattern>();
    for (let grew = true; grew; ) {
      grew = false;
      for (const declaration of bound) {
        if (declaration.initializer === undefined) continue;
        const fromContext = isContext(declaration.initializer);
        if (!fromContext && !isTask(declaration.initializer)) continue;
        const name = declaration.name;
        let addedContexts: string[] = [];
        let addedTasks: string[] = [];
        if (ts.isIdentifier(name)) {
          if (fromContext) addedContexts = [name.text];
          else addedTasks = [name.text];
        } else if (ts.isObjectBindingPattern(name) && fromContext) {
          boundPatterns.add(name);
          addedContexts = restOf(name);
          addedTasks = keyed(name, "task");
        } else if (ts.isObjectBindingPattern(name)) {
          addedContexts = keyed(name, "context");
          addedTasks = restOf(name);
        }
        for (const alias of addedContexts.filter(alias => !contexts.has(alias))) {
          contexts.add(alias);
          grew = true;
        }
        for (const alias of addedTasks.filter(alias => !tasks.has(alias))) {
          tasks.add(alias);
          grew = true;
        }
      }
    }
    for (const pattern of [...patterns, ...boundPatterns]) {
      for (const element of pattern.elements) {
        if (element.dotDotDotToken !== undefined) continue;
        const key = element.propertyName ?? element.name;
        if (ts.isComputedPropertyName(key)) modes.push("context computed member");
        else if (keyText(key) === "skip") modes.push("context skip");
      }
    }
    /** A context name read as a value: not a declared name, a member or key name, or a type position. */
    const isUse = (id: ts.Identifier): boolean => {
      const parent = id.parent;
      if (ts.isPropertyAccessExpression(parent) && parent.name === id) return false;
      if ((ts.isPropertyAssignment(parent) || ts.isPropertySignature(parent) || ts.isPropertyDeclaration(parent) || ts.isMethodDeclaration(parent)) && parent.name === id) return false;
      if (ts.isBindingElement(parent) && (parent.name === id || parent.propertyName === id)) return false;
      if ((ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent)) && parent.name === id) return false;
      return ts.findAncestor(id, ts.isTypeNode) === undefined;
    };
    const scan = (node: ts.Node): void => {
      const reached =
        (ts.isIdentifier(node) && contexts.has(node.text) && isUse(node)) ||
        ((ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) && accessName(node) === "context" && isTask(node.expression));
      if (reached) {
        let use: ts.Node = node;
        while (
          (ts.isParenthesizedExpression(use.parent) || ts.isNonNullExpression(use.parent) || ts.isAsExpression(use.parent) || ts.isSatisfiesExpression(use.parent) || ts.isTypeAssertionExpression(use.parent)) &&
          use.parent.expression === use
        ) {
          use = use.parent;
        }
        const parent = use.parent;
        if (ts.isPropertyAccessExpression(parent) && parent.expression === use) {
          if (parent.name.text === "skip") modes.push("context skip");
        } else if (ts.isElementAccessExpression(parent) && parent.expression === use) {
          const member = literalKey(parent.argumentExpression);
          if (member === undefined) modes.push("context computed member");
          else if (member === "skip") modes.push("context skip");
        } else if (!(ts.isVariableDeclaration(parent) && parent.initializer === use && !ts.isArrayBindingPattern(parent.name))) {
          modes.push("context escape");
        }
      }
      ts.forEachChild(node, scan);
    };
    scan(body);
    /** Whether a node reads the callback's own arguments object: a use of the name outside a nested function that has its own. */
    const readsArguments = (node: ts.Node): boolean => {
      if (ts.isIdentifier(node)) return node.text === "arguments" && isUse(node);
      if (ts.isFunctionLike(node) && !ts.isArrowFunction(node)) return false;
      return ts.forEachChild(node, child => (readsArguments(child) ? true : undefined)) === true;
    };
    if (!ts.isArrowFunction(callback) && readsArguments(body)) modes.push("context escape");
  };
  /** A call's arguments in order, each spread of an array literal read in place as its elements (wb-50dt, the wb-rgov gate's F1
   * K19); a spread of anything else stays a spread. */
  const spreadArguments = (list: readonly ts.Expression[]): ts.Expression[] =>
    list.flatMap(argument => {
      if (!ts.isSpreadElement(argument)) return [argument];
      const spread = unwrapped(argument.expression);
      return ts.isArrayLiteralExpression(spread) ? spreadArguments(spread.elements) : [argument];
    });
  /** One registration or hook call's arguments, read from `from` on for a value held elsewhere (a registration's name aside);
   * wb-50dt: a spread left by spreadArguments can carry any argument, the name's place included, so it reads unread wherever it
   * stands. */
  const argumentModes = (call: ts.CallExpression, from: number): void => {
    spreadArguments(call.arguments).forEach((argument, index) => {
      if (ts.isSpreadElement(argument)) {
        modes.push("argument unread");
        return;
      }
      for (const value of valuesOf(argument)) {
        if (ts.isObjectLiteralExpression(value)) optionModes(value);
        else if (ts.isArrowFunction(value) || ts.isFunctionExpression(value)) contextModes(value);
        else if (index >= from && !isPlain(value)) modes.push("argument unread");
      }
    });
  };
  /** wb-50dt (the wb-rgov gate's F1 K30): an extend call's fixtures. Each member of an object-literal argument is a fixture: an
   * inline function (an arrow, a function expression or a method) is a callback whose first parameter is the test context, a
   * tuple (an array literal) is read by its first element the same way, and a plain literal or an object literal is a static
   * value; a fixture or a fixture set held elsewhere (a name, a member read, a call, a shorthand or spread member, an accessor, a
   * spread argument) reads unread. */
  const fixtureModes = (call: ts.CallExpression): void => {
    const fixtureValue = (initializer: ts.Expression): void => {
      for (const value of valuesOf(initializer)) {
        if (ts.isArrowFunction(value) || ts.isFunctionExpression(value)) contextModes(value, 1);
        else if (ts.isArrayLiteralExpression(value)) {
          const first = value.elements[0];
          if (first !== undefined) fixtureValue(first);
        } else if (!ts.isObjectLiteralExpression(value) && !isPlain(value)) modes.push("argument unread");
      }
    };
    for (const argument of spreadArguments(call.arguments)) {
      for (const value of valuesOf(argument)) {
        if (!ts.isObjectLiteralExpression(value)) {
          if (!isPlain(value)) modes.push("argument unread");
          continue;
        }
        for (const property of value.properties) {
          if (ts.isPropertyAssignment(property)) fixtureValue(property.initializer);
          else if (ts.isMethodDeclaration(property)) contextModes(property, 1);
          else modes.push("argument unread");
        }
      }
    }
  };
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node) && SKIP_MODES.includes(node.name.text) && rooted(node.expression)) modes.push(node.name.text);
    if (ts.isElementAccessExpression(node) && rooted(node.expression)) {
      const member = literalKey(node.argumentExpression);
      if (member === undefined) modes.push("computed member");
      else if (SKIP_MODES.includes(member)) modes.push(member);
    }
    // wb-50dt: a computed member of a namespace may be any of its registrars or hooks.
    if (ts.isElementAccessExpression(node) && isNamespace(node.expression) && literalKey(node.argumentExpression) === undefined) modes.push("computed member");
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && node.initializer !== undefined) {
      const fromChain = rooted(node.initializer);
      if (fromChain || isNamespace(node.initializer)) {
        for (const element of node.name.elements) {
          const member = keyText(element.propertyName ?? element.name);
          // wb-50dt: a computed key of a pattern on a registrar chain or a namespace may bind any member.
          if (member === undefined) modes.push("computed member");
          else if (fromChain && SKIP_MODES.includes(member)) modes.push(member);
        }
      }
    }
    if (ts.isCallExpression(node)) {
      if (isHook(node.expression) || isTestHook(node.expression)) argumentModes(node, 0);
      else if (isExtend(node.expression)) fixtureModes(node);
      else if (rooted(node.expression)) argumentModes(node, 1);
    }
    // wb-50dt (the wb-rgov gate's F1 K3-K6): a task write is any write of a TASK_FLAGS member - the target of an assignment of any
    // operator or of a for-in or for-of head (each target inside a destructuring pattern included), the operand of an increment or
    // a decrement, or the operand of a delete.
    const isAssignment = ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
    const isStep = (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken);
    const written = isAssignment
      ? writtenMembers(node.left, true)
      : (ts.isForOfStatement(node) || ts.isForInStatement(node)) && !ts.isVariableDeclarationList(node.initializer)
        ? writtenMembers(node.initializer, true)
        : isStep
          ? writtenMembers(node.operand, false)
          : ts.isDeleteExpression(node)
            ? writtenMembers(node.expression, false)
            : [];
    for (const member of written) if (TASK_FLAGS.includes(member)) modes.push("task write");
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
  // wb-rgov (the wb-yg70 gate's F4): every control, by name, modes and the sha256/16 of its text, stands in the receipt's
  // registration-control table, so a reading removed together with its control, or a control rewritten, reds here.
  const anchored = REGISTRATION_CONTROLS.map(([name, text, modes]) => [name, modes.length === 0 ? "none" : modes.join(", "), shaOf(text)]);
  // wb-50dt: the cut-4 controls follow the cut-3 ones, held to the cut-4 additions table after the cut-3 table.
  const tabled = [...receiptTable(RECEIPT_TABLES.registrationControls), ...receiptTable(RECEIPT_TABLES.registrationControlAdditions)];
  if (JSON.stringify(anchored) !== JSON.stringify(tabled)) {
    throw new Error("the registration-mode controls (name, modes, text) do not stand in the receipt's registration-control table, then in its cut-4 additions");
  }
  const modes = registrationModes(SELF, readFileSync(SELF, "utf8"));
  if (modes.length > 0) throw new Error(`this census registers a case with a skip mode, which no run of it vouches for: ${modes.join(", ")}`);
  const ran = ROWS.flatMap(row => row.pins).every(pin => REACHED.includes(pin));
  const selected = CAPTURED.file === undefined ? [] : selectedModes(CAPTURED.file.tasks);
  const unfiltered = selected.length > 0 && selected.every(mode => mode === "run");
  if ((ran || unfiltered) && !JUDGE.finished && !JUDGE.failed) {
    throw new Error("the roster judge did not run to its end while every pin case reached its witness or every test was selected to run: the registration judge is skipped, emptied or gone");
  }
});
