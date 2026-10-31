/**
 * wb-b04.2 (FURNACE-WORLD-MODEL-TRACE-ADAPTER-R6, program-triage-2026-10-18, child of epic wb-b04), the Furnace world-model
 * preservation census: the until-then leg of a trigger-gated requirement whose records have not shipped. Statement (the bead's
 * tracker-export title, verbatim): "A Pi reader handling shipped world-model records shall preserve FRN-WM-003 end-to-end:
 * source_revision/version provenance, capture_completeness/missing-fields status, redaction (redaction_hash never stripped,
 * reversed or discarded; redacted log content never un-redacted), privacy/security properties and causal ordering survive every
 * projection and presentation." Owner filing (the export notes, quoted where this file binds them): the citation
 * "01-architecture.md:7@0f791db71b9d" (FRN-WM-003 'Preserve source/version and missing-fields status, log redaction,
 * privacy/security and causal ordering'); "Gating artifact: source_revision/capture_completeness/redaction_hash on a released
 * surface."; and the acceptance shape (ACCEPTANCE below, verbatim).
 *
 * MEASURED (read-only). By the cutting seat, 2026-10-28, at base 7a0ab7f and again at 1bb7b05; by the cut #2 respin seat,
 * 2026-10-28, at trunk 5fbe25e; by the cut #3 respin seat, 2026-10-29, at trunk b3d410f (no src file, vendored SDK or docs/12
 * changed from 5fbe25e to b3d410f); the wb-40zp seats, 2026-10-30, read the src tree, vendor/, package.json, package-lock.json
 * and docs/12 byte-identical from b3d410f to trunk ee48709 and, for the respin, to trunk 42ab54d, and the wb-40zp cut #3 seat,
 * 2026-10-31, read them so to trunk 89109cd (empty git diffs), so these readings carry over. Producer (Furnace's own tree, read
 * with git show at the filing pin 0f791db71b9d and at Furnace main
 * 0d41031, and re-read so by the cut #3 seat on 2026-10-29 with main still at 0d41031: the same three blobs at both; this
 * census never reads it): docs/programs/world-model-trace-adapter-2026-10-18/README.md (blob 8649ef6e) reads "DESIGN
 * ONLY, not a new executor, scheduler or live trace exporter." at :2 and "Redact secret-bearing logs" at :6; 01-architecture.md
 * (blob f2f3f1c6) holds FRN-WM-003 at :7 and the "Proposed records:" line at :11 (PROPOSED_RECORDS below, byte for byte);
 * 02-qualification.md is blob eeb98f37. The installed @furnace/sdk is 0.1.0 from vendor/furnace-sdk-0.1.0.tgz (sha256
 * aaa57dcfb1c205ec...; 128 regular files and no symlink: 28 .d.ts, 28 .js, 28 .map, 43 .json and the README, no .d.mts or
 * .d.cts file). Read as THE READERS below read it, its 28 declaration files hold 602 named declarations (237 interfaces, 101
 * type aliases, 51 classes, 130 functions, 83 variables) with 1715 members, besides 20 get and set accessors, which the member
 * reading does not read: no declaration is named for a proposed record, no member name reads as one of the three FRN-WM-003
 * fields, and no file spells a record, a field or the world-model words by path or content, as written or with the three hex
 * escape forms decoded (no file spells "redact" either). A one-off tolerant reading by the cut #3 seat, which also cooks
 * identity escapes, line continuations and legacy octal escapes as no reader of this file does, finds none either, and no
 * accessor name reads as a field. The release's nearest members are what Pi's Furnace observer reads today:
 * RunDto.furnace_version and RunDto.binary_revision (version provenance), LogsReadDto.complete and LogsReadDto.lossy (a log
 * read's missing-fields status) and AttemptDto.ordinal (order). Pi (117 regular src files at b3d410f, no symlink): no src file
 * spells a proposed record's identifier or an FRN-WM-003 wire name in any letter case, alone or inside a longer name, as
 * written or through the three hex escape forms, and the one-off tolerant reading finds none either. Two wider readings cannot
 * be used in src: Pi's own NativeSnapshot field is the camelCase sourceRevision, and the export files two other programs'
 * world-model requirement families (HX-PREDICTIVE-WORLD-MODEL-ADAPTERS, RF-PREDICTIVE-WORLD-MODEL-CONTEXT), the first of which
 * a Pi child cites in a src comment: landing 646 (wb-gwr.2) cites HX-PREDICTIVE-WORLD-MODEL-ADAPTERS-R2 at
 * src/workbench/hyperunix-observer.ts:291, the one src file that spells the world-model words (no src file cites the second).
 * So T3 reads neither wider form (R-SRC-NARROW), no world-model record has shipped and no Pi reader of one exists. No src, docs
 * or tracker text is edited by this cut.
 *
 * THE READERS (exactly what they read; a form they do not read escapes them). The release reader reads every regular file under
 * the installed package (a symlink is not followed) in two ways. (1) The member reading parses each declaration file (.d.ts,
 * .d.mts or .d.cts) into the TypeScript AST. It reads the name of every interface, type alias, class, enum and function
 * declaration and of every variable declared by an identifier against the record readings, and the name of every property
 * signature, method signature, property declaration, method declaration and enum member nested at any depth under one of those
 * declarations (a function's or a variable's type literal included, so a field declared under a named declaration is read
 * however deep it nests and whatever heritage, alias or generic wrapper carries it) against the field readings. A computed name
 * reads as its source text and every other name as TypeScript cooks it (an escape in an identifier or a quoted name decoded).
 * Nothing else is a declaration or a member of the reading: a get or set accessor, an index, call or construct signature, a
 * constructor, a parameter, a mapped-type key, a namespace's own name and any member under no named declaration are among what
 * it does not read (a type literal nested in one of them under a named declaration still holds members), and a comment declares
 * nothing. (2) The content reading reads every file's package-relative path and text against every reading, each as written and
 * with every \uXXXX, \xXX and \u{X} (up to 10FFFF) sequence decoded. It decodes no other escape (an identity escape such as \c,
 * a line continuation and a legacy octal escape stay as written) and evaluates nothing (no concatenation, join, template
 * placeholder or character code). The readings: a record by its capitalized words with the "Furnace" prefix dropped, a field by
 * its two snake-case words and the world-model pair by "world" and "model", each in order with any run of characters other than
 * ASCII letters and digits (or none) between consecutive words, in any letter case, anywhere in a name or text; those words
 * with what lies between them are the reading's run. The src reader reads every regular file under src/ as text, as written and
 * with the same three hex forms decoded, for each record's exact identifier and each field's exact snake-case wire name in any
 * letter case, alone or inside a longer name (a reader of the records reads their JSON keys; FurnaceObservedTransitionDto and
 * native_source_revision read); for it the run is the whole identifier or wire name. It decodes no other escape, evaluates
 * nothing, and reads neither camelCase nor the world-model words. RESIDUALS names the families of unread forms known at this
 * cut, each with a pinned quiet row; it claims no completeness, and a form outside THE READERS escapes them whether RESIDUALS
 * names it or not.
 *
 * CASES (each test title opens with its id and the ROWS it holds). T1 (ARMED) the installed release declares no record and no
 * field and spells none of RELEASE_WORDS in any form THE READERS read, while the same reader finds the observer's analog
 * members and, by content, the release's own binary_revision (liveness): when a re-vendor brings a record or a field in a form
 * THE READERS read, T1 reds naming the acceptance as owed, and in any other form it escapes T1, named in RESIDUALS or not. T2
 * the same readers find every record, field and word in a planted release (through a quoted member, a type alias, a class and a
 * comment), every field declared on a type-alias parent, behind a generic wrapper or nested under an unrelated member, each
 * hex-escaped spelling the cut #1 refusal planted (a computed key over an escaped literal, a variable's and a function's type
 * literal, a .d.mts declaration of an escaped record), a .d.cts declaration and each of the three hex forms in plain content;
 * and the edge of THE READERS that the cut #2 refusal measured, each beside the RESIDUALS family it bounds: a quoted member
 * name holding an identity escape is cooked and read as the member (content alone does not read it), an identity escape or a
 * line continuation between two words is read by content, a plain accessor name is read by content and never as a member, and
 * parts joined at value or type level between two words by a joint holding no letter or digit are read by content. T3 (ARMED)
 * no src file spells SRC_WORDS in any form THE READERS read, while the reader finds the schema literal in
 * src/workbench/identity.ts only and finds each planted identifier and wire name, the hex-escaped, affixed and re-cased ones
 * included: when a Pi reader spelling a record identifier or a wire name in such a form lands, T3 reds naming the acceptance as
 * owed, and in any other form it escapes T3, named in RESIDUALS or not. T3 reads neither the world-model words nor camelCase
 * (R-SRC-NARROW; A1 holds why). Q1 the six named residuals, each a pinned quiet row re-judged here (RESIDUALS);
 * R-UNDECODED-ESCAPE and R-ASSEMBLED also carry a witness, the names each probe file spells as TypeScript cooks its string
 * literals, joined where the file joins them (by +, a template placeholder or an array join, a same-file constant read as its
 * value). J1 the acceptance's per-field round-trip judge: an identity reader passes, and a reader that drops a judged field,
 * strips or reverses redaction_hash, retypes a field while keeping its text, or reorders the records reds with exactly its
 * findings. R1 FurnaceObservedTransition-shaped records (PROPOSED_RECORDS' fields, HYPOTHETICAL values) survive the
 * furnace_observe reply's sanitizer byte for byte, per field, key order and record order included; each CORPUS class planted in
 * each text field in turn is redacted there while every other field survives, and the same line as a producer that already
 * redacted it writes it (HELD: its value replaced by the marker) stays redacted. O1 in every RunState the installed release
 * declares (STATES), the observer's analogs survive its reading (its last reading and observe()'s first yield equal it, and
 * every yield and the last reading after close() keep its source and page), its Run snapshot, its topology, an
 * ObservationProjection fed that topology, and the reply: furnace_version as producer version on the reading and the reply, and
 * binary_revision as revision on every snapshot and every projected node (an absent binary_revision is stated nowhere, never
 * guessed), each INCOMPLETE fact as "partial" everywhere, and the Attempt page's order in the items, snapshots, edges, evidence
 * refs and projected nodes, with
 * ownership edges only; the reading itself is left unchanged by every call made after it is read (the Run snapshot, topology
 * and reply calls, observe() and close()); a doctored output set, one label changed per surface, proves the label reader reads
 * every surface and the reply's text. O2 log lines, FRN-WM-003-shaped members the release does not publish and secret-bearing
 * members, planted on the Run status, its failed and active rows, every Attempt row and the log read, in every RunState, on a
 * complete read and under each one INCOMPLETE fact, change none of the outputs O2 reads (the reading, the last reading before
 * and after close(), every observe() yield, the Run snapshot, the topology, the projection and the reply) and reach none of
 * them. E1 the log evidence presentation of either stream (STREAMS) keeps every HELD line redacted and redacts every CORPUS
 * class. S1 the furnace_observe tool's execute body, read through the AST of src/index.ts (S1 runs none of it), which names the
 * tool in one object literal, its registration. The body binds the reading as `const reading = await observer.snapshot()` and
 * holds the refresh `projection.refresh(observer.projectionSnapshot(reading))` and the data reply
 * `return textResult(sanitizeWorkbenchJsonText(reading))`. It names that reading exactly three times, its binding and the
 * arguments of observer.projectionSnapshot and of that sanitizer, so it hands the reading to no other call and binds, iterates,
 * writes or returns it nowhere else; its textResult calls and its return statements are exactly its two literal refusals, the
 * sanitized reading and its sanitized error text; its new expressions build the Furnace client and the FurnaceObserver; and it
 * writes nothing at all: no assignment (compound or destructuring included), increment or decrement (prefix or postfix),
 * delete, or for-of or for-in target that is an expression rather than a declared variable. S1 also reads the names its data
 * path calls through by binding, as the TypeScript checker binds src/index.ts alone: the callee of each textResult reply, the
 * plain callee of each call a reply is handed (the reading's sanitizer and the error text's), every identifier the body spells
 * reading, the reading's receiver (`reading = [await] <receiver>.<method>(...)`) and the class that receiver is built from
 * (`<receiver> = [await] new <Class>(...)`), each read from the one variable declaration its binding has (any other declaration
 * or initializer reads no receiver or class, so S1 reds). Each resolves to one declaration: textResult to the module's own
 * function, the two sanitizers to their redaction.ts imports, the reading and its receiver each to one const of the body, and
 * FurnaceObserver to its furnace-observer.ts import. Every reference the checker binds to textResult's binding or to either
 * sanitizer's, anywhere in the file, is that declaration or the callee of a call, so none of the three is written, handed on or
 * exported anywhere in the file (a write in any form is such a reference: the refusals' assignment, compound and logical
 * assignment, increment, decrement, for-of, for-in, array- and object-pattern, rest and default witnesses below); the reading's
 * binding is referenced only as its declaration and those two arguments, the receiver's only as its declaration and the object
 * its snapshot, projectionSnapshot and close methods are called on, and FurnaceObserver's only as its import and the class of
 * that one new expression (an export specifier is read as the local binding it exports, and a shorthand property's name as the
 * binding its value names); and textResult's declaration reads TEXT_RESULT (whitespace removed), so it returns the text it is
 * handed, unchanged, as its one content item. Each witness of the class (the refusals' G24 and GP15 witnesses and this census's
 * own members, planted on the furnace_observe slice of the file) changes exactly the readings it names. O1 holds that the two
 * calls leave the reading unchanged, so R1 and O1 read the text the data reply carries when the body reaches it: both call that
 * sanitizer and O1 builds its readings with that class, each imported from the module src/index.ts imports it from, with the
 * census's own client and options standing in for the tool's. S1 reads src/index.ts alone and runs none of it, so what another
 * module does (to the class, its prototype or the sanitizer's module) escapes it, as do the families inside src/index.ts that
 * S1 names, each with pinned quiet rows (a plant S1 reads exactly as the slice does, beside what the body's call reader or the
 * module's statements show of it, so a quiet row whose plant is silenced reds): CONTROL FLOW, whether the body reaches its
 * refresh and its data reply, which S1 does not read (a throw before the reading or between the refresh and the data reply,
 * conditional or not, which the catch turns into the error reply; a call that throws; an await that never settles; a loop that
 * never ends; a throw in the finally block); the class's prototype changed through another binding of the class or of its
 * module (an alias import or a namespace import); the projection the body refreshes, read by its name only (a body-local
 * projection standing in for the module's); a built-in the sanitizer or the observer uses changed (JSON.stringify replaced,
 * say); a reference the checker binds to no symbol (the import-equals alias import zzAlias = textResult); and code held only in
 * a string. A1 the outside
 * anchors: the export title's clauses, snake-case fields and requirement id; the export notes'
 * FRN-WM-003 phrases, per-field acceptance list, citation, gating artifact and ACCEPTANCE; docs/12's redaction-floor sentence,
 * read as one whole sentence of a paragraph that stands directly under its '## Current diagnostic protections' heading (before
 * any subsection heading) and spells the sentence the same in its source as in its rendered text (so no inline markup, a
 * strikethrough included, wraps or touches it), the section bound once under the page title and carrying no HTML (CORPUS); the
 * observer source's incompleteness operands (INCOMPLETE); the installed release's RunState and OutputStream unions (STATES,
 * STREAMS); every ROWS field among PROPOSED_RECORDS' fields; and the two reasons for R-SRC-NARROW: Pi's NativeSnapshot
 * declaring exactly one ROWS field in camelCase (src/workbench/observation.ts) and the export filing world-model requirement
 * families other than this bead's. F1 the frozen shape. J2 the judged set: each row's pins are exactly the cases whose titles
 * name it, and every case is registered once.
 *
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}`, and INCOMPLETE, CORPUS, STATES, STREAMS, RESIDUALS,
 * RECORDS and the transition fields are pinned as literals. ROWS, INCOMPLETE, CORPUS, STATES and STREAMS are each also held to
 * an anchor outside this file (A1); RECORDS and the transition fields are read from PROPOSED_RECORDS, the producer line quoted
 * verbatim, and only the three ROWS fields among them are anchored outside it (the export title and gating artifact); of
 * RESIDUALS, R-SRC-NARROW is anchored outside (observation.ts and the export); the presence of R-RENAMED, R-COMPUTED and
 * R-ENCODED is pinned by its quiet row and the literal only, so deleting one of them with its literal element survives
 * (disclosed); the presence of R-UNDECODED-ESCAPE and R-ASSEMBLED is also pinned by Q1's list of witnessed residuals, a second
 * literal of this file (deleting one of them from all three literals survives, disclosed), and their probe files are held to
 * what TypeScript cooks in them (their witnesses), so hollowing one of those files reds Q1 (a probe function that returns its
 * quiet verdict without reading its files is census-internal and not caught, and deleting one probe file together with its
 * witness row survives, the landing-668 quoted-member pair included, since both are literals of this file; disclosed). S1's
 * binding readings are read from src/index.ts and held to literals (its resolved names, its references and TEXT_RESULT), so
 * deleting an entry from one reds S1, killed through the src; its witness and quiet rows are literals of this file, so
 * deleting one row together with its expected reading survives (disclosed), while silencing a quiet row's plant reds it (its
 * liveness reading).
 *
 * RESIDUALS (named families of forms THE READERS do not read, each with its pinned quiet row in Q1; the families known at this
 * cut, not a complete list): R-RENAMED, a record shipped only under a name, with fields under names, that hold no reading's run
 * (here TraceStep {rev, cover, digest}), escapes T1; R-COMPUTED, a field name the release spells only at type level, through a
 * mapped type over a template-literal key whose placeholder falls inside a word or holds a letter or digit (here
 * sou${"rce"}_revision and capture${Sep}completeness), escapes T1, since the member reading reads no mapped-type key and the
 * placeholder breaks the run (one between two words holding neither is read by content, T2); R-ENCODED, a record, a field or
 * the world-model words spelled only through character codes (String.fromCharCode) or HTML character references, which no
 * reader decodes, escape T1 and T3 wherever a code or reference falls inside the run that reader reads, between two words
 * included, since each holds a digit or a letter; R-UNDECODED-ESCAPE, a name or the world-model words spelled only with an
 * escape no reader decodes standing between two of their characters, an identity escape (a backslash before a character with no
 * escape meaning, as in sour\ce_revision, capture\_completeness or Synthetic\AttemptState) or a line continuation (a backslash
 * and a line break): in a src file it escapes T3 wherever it stands inside a record identifier or wire name, and in the release
 * it escapes T1 where it stands inside a word of a reading's run, unless the name is the quoted name of a member the member
 * reading reads and spells a field (TypeScript cooks that name, T2; a quoted member name that spells a record or the
 * world-model words, as in "Synth\eticAttemptState" or "wor\ld model", is cooked too but read against the field readings only,
 * so it escapes T1, pinned in Q1), while one standing between two words is read by content (T2); R-ASSEMBLED, a record or field
 * name the release spells only by joining parts at value level (with +, a template
 * placeholder or an array join) escapes T1 where a joint falls inside a word or holds a letter or digit, while parts whose
 * every joint falls between two words and holds neither are read by content (T2); R-SRC-NARROW, a Pi reader spelling the fields
 * only in camelCase or kebab-case (sourceRevision, source-revision), a record or a field only as separate words (an observed
 * transition), or a name only through keys assembled from parts that split it (['capture', 'completeness'].join('_')), escapes
 * T3, which reads exact identifiers and wire names only, and so do the world-model words, which T3 does not read.
 *
 * PARKED (the external remainder, a Furnace release): the acceptance itself - a round-trip preservation test per field through
 * a real reader's projection and tool reply - needs the records in a released @furnace/sdk and a Pi reader of them. T1 or T3
 * reds when either arrives in a form THE READERS read; one that arrives only in another form escapes both, whether RESIDUALS
 * names its family or not. J1's judge is the one that test runs.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { AttemptDto, AttemptListDto, LogsReadDto, Response, ResponseKind, RunState, RunStatusDto } from "@furnace/sdk";
import ts from "typescript";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFurnaceAttemptLogEvidence } from "../src/workbench/furnace-evidence.js";
import { FurnaceObserver, type FurnaceObserverClient, type FurnaceProjectionTopology, type FurnaceReading } from "../src/workbench/furnace-observer.js";
import { type NativeSnapshot, ObservationProjection, type ObservedNode } from "../src/workbench/observation.js";
import { sanitizeWorkbenchJsonText } from "../src/workbench/redaction.js";
import { docsSection } from "./helpers/census.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-b04.2";
const REQUIREMENT = "FURNACE-WORLD-MODEL-TRACE-ADAPTER-R6";
const EXPORT = ".beads/issues.jsonl";
const DOCS12 = "docs/workbench/12-security.md";
const OBSERVER_SOURCE = "src/workbench/furnace-observer.ts";
const INDEX_SOURCE = "src/index.ts";
const SDK_ROOT = dirname(createRequire(import.meta.url).resolve("@furnace/sdk/package.json"));
/** The filing's producer pin, a commit of Furnace's repository: cited, never read here. */
const PRODUCER_PIN = "0f791db71b9d";
/** 01-architecture.md:11 at the producer pin (blob f2f3f1c6), verbatim: the records the program proposes. */
const PROPOSED_RECORDS =
  "Proposed records: FurnaceObservedTransition {source_revision, run_id, attempt_id, before_ref, event_ref, after_ref, exit_status, reason, native_receipt, capture_completeness, redaction_hash}; CounterfactualCandidate {base_snapshot, intervention, predicted_distribution, scenario_id, authority=none}; SyntheticAttemptState with explicit queue/resource/worker capacity rules for exact micro-gym only.";
/** The proposed record names, in PROPOSED_RECORDS order. */
const RECORDS: readonly string[] = [...PROPOSED_RECORDS.matchAll(/\b([A-Z][A-Za-z]+) (?:\{|with )/g)].map(match => match[1]);
/** FurnaceObservedTransition's proposed fields, in PROPOSED_RECORDS order. */
const TRANSITION_FIELDS: readonly string[] = (/FurnaceObservedTransition \{([^}]*)\}/.exec(PROPOSED_RECORDS)?.[1] ?? "").split(", ");
/** The bead's acceptance shape, verbatim from its export notes (A1). */
const ACCEPTANCE =
  "Acceptance shape: round-trip preservation test per field (provenance, completeness, redaction_hash, ordering) through projection and tool reply; a reader that drops or reorders is red; redacted content stays redacted under the docs/12 credential corpus.";
const GATING = "Gating artifact: source_revision/capture_completeness/redaction_hash on a released surface.";
const CITATION = `01-architecture.md:7@${PRODUCER_PIN}`;
const OWED_RELEASE = `ARMED (${BEAD}): the installed @furnace/sdk now declares or spells a Furnace world-model record, an FRN-WM-003 field or the world-model words. If the records shipped, a Pi reader of them owes the acceptance: ${ACCEPTANCE} If they did not, re-measure against the new release and say so.`;
const OWED_READER = `ARMED (${BEAD}): a Pi src file now spells a proposed record's identifier or an FRN-WM-003 wire name (in any letter case, alone or inside a longer name, as written or through one of the three hex escape forms), so a Pi reader of the records may exist. If one does, it owes the acceptance: ${ACCEPTANCE} If none does, re-measure the src tree and say so.`;

interface Row {
  /** The clause's own name. */
  readonly id: string;
  /** The bead title's clause, an exact slice of the export title (A1). */
  readonly clause: string;
  /** The FRN-WM-003 phrase the owner filing quotes for the clause, when it names one (A1). */
  readonly producer?: string;
  /** The record field the clause names, the title's snake-case token, when it names one (A1). */
  readonly field?: string;
  /** The acceptance's per-field word for the clause, when the acceptance lists it (A1). */
  readonly acceptance?: string;
  /** The cases that hold the clause, in CASES order (J2 holds them to the cases' own row lists). */
  readonly pins: readonly string[];
}
/** The statement's clauses in title order. */
const ROWS: readonly Row[] = [
  { id: "trigger", clause: "A Pi reader handling shipped world-model records", pins: ["T1", "T2", "T3", "Q1"] },
  {
    id: "provenance",
    clause: "source_revision/version provenance",
    producer: "source/version",
    field: "source_revision",
    acceptance: "provenance",
    pins: ["T1", "J1", "R1", "O1"],
  },
  {
    id: "completeness",
    clause: "capture_completeness/missing-fields status",
    producer: "missing-fields status",
    field: "capture_completeness",
    acceptance: "completeness",
    pins: ["T1", "J1", "R1", "O1"],
  },
  {
    id: "redaction",
    clause: "redaction (redaction_hash never stripped, reversed or discarded; redacted log content never un-redacted)",
    producer: "log redaction",
    field: "redaction_hash",
    acceptance: "redaction_hash",
    pins: ["T1", "J1", "R1", "O2", "E1"],
  },
  { id: "privacy", clause: "privacy/security properties", producer: "privacy/security", pins: ["R1", "O2", "E1"] },
  { id: "ordering", clause: "causal ordering", producer: "causal ordering", acceptance: "ordering", pins: ["J1", "R1", "O1"] },
  { id: "surfaces", clause: "survive every projection and presentation", pins: ["R1", "O1", "S1"] },
];

interface Case {
  /** The ROWS this case holds (J2). */
  readonly rows: readonly string[];
  readonly title: string;
}
const CASES = {
  T1: {
    rows: ["trigger", "provenance", "completeness", "redaction"],
    title: "(ARMED) the installed release declares no world-model record or FRN-WM-003 field and spells none of them, nor the world-model words, in any form the readers read",
  },
  T2: {
    rows: ["trigger"],
    title: "the same readers find every record, field and word in a planted release, hex-escaped spellings included, and each edge form stated for R-COMPUTED, R-UNDECODED-ESCAPE and R-ASSEMBLED reads as stated",
  },
  T3: {
    rows: ["trigger"],
    title: "(ARMED) no Pi src file spells a proposed record's identifier or an FRN-WM-003 wire name in any letter case, alone or inside a longer name, as written or through one of the three hex escape forms",
  },
  Q1: { rows: ["trigger"], title: "each named residual is a pinned quiet row: its probe is read and found quiet, and a witnessed probe spells the names TypeScript cooks in it" },
  J1: {
    rows: ["provenance", "completeness", "redaction", "ordering"],
    title: "the per-field round-trip judge passes an identity reader and reds a reader that drops, strips, reverses, retypes or reorders",
  },
  R1: {
    rows: ["provenance", "completeness", "redaction", "privacy", "ordering", "surfaces"],
    title: "record-shaped values survive the tool reply's sanitizer per field and in order, and the docs/12 corpus in any text field stays redacted",
  },
  O1: {
    rows: ["provenance", "completeness", "ordering", "surfaces"],
    title: "in every RunState the observer's analogs survive its readings, topology, projection and reply: version provenance, each missing-fields fact, page order",
  },
  O2: {
    rows: ["redaction", "privacy"],
    title: "in every RunState no log line, unpublished FRN-WM-003-shaped member or secret-bearing member reaches an output O2 reads, on a complete read or under any one INCOMPLETE fact",
  },
  E1: { rows: ["redaction", "privacy"], title: "the log evidence presentation of either stream keeps a producer's redaction redacted and redacts every corpus class" },
  S1: {
    rows: ["surfaces"],
    title: "the furnace_observe body holds sanitizeWorkbenchJsonText(reading), untouched, as its only data reply, beside the refresh with that reading's Run snapshot (whether the body reaches them is not read)",
  },
  A1: { rows: [], title: "outside anchors: the export title and notes, docs/12's floor sentence, the observer's operands, NativeSnapshot, RunState and OutputStream" },
  F1: { rows: [], title: "FROZEN SHAPE (standing rule 16): the rows' pin counts and every table's ids" },
  J2: { rows: [], title: "the judged set: each row's pins are exactly the cases naming it, and every case is registered once" },
} as const satisfies Readonly<Record<string, Case>>;
type CaseId = keyof typeof CASES;
const CASE_IDS = Object.keys(CASES) as CaseId[];
const registered: CaseId[] = [];
/** Registers one case under its id and the rows it holds, under vitest's default timeout unless the case names its own (the
 * options are an object literal in vitest 4's options place, so the retry census reads them: they set no retry). */
function pinned(id: CaseId, body: () => void | Promise<void>, timeout?: number): void {
  registered.push(id);
  const rows: readonly string[] = CASES[id].rows;
  it(`${id} [${rows.join(", ")}]: ${CASES[id].title}`, { timeout }, body);
}
/** S1's own budget: it binds a source once per witness and quiet plant (about seventy) and reads every identifier of
 * src/index.ts twice; measured 1.9-3.8 s alone at load1 150-250, past vitest's 5 s default under load. A budget, not an
 * assertion. */
const S1_TIMEOUT_MS = 30_000;

/** A word run read with any run of non-alphanumeric characters (or none) between its words, in any case. */
const words = (...parts: readonly string[]): RegExp => new RegExp(parts.join("[^a-z0-9]*"), "i");
/** A record's reading: its camel-case words after the producer prefix. */
const recordReading = (name: string): RegExp => words(...(name.replace(/^Furnace/, "").match(/[A-Z][a-z]+/g) ?? [name]));
/** A field's reading: its snake-case words. */
const fieldReading = (field: string): RegExp => words(...field.split("_"));
const WORLD_MODEL = words("world", "model");
const FIELDS: readonly string[] = ROWS.flatMap(row => (row.field !== undefined ? [row.field] : []));
/** What the release reader spells for: the world-model pair, each record and each field. */
const RELEASE_WORDS: readonly RegExp[] = [WORLD_MODEL, ...RECORDS.map(recordReading), ...FIELDS.map(fieldReading)];
/** What the src reader spells for: each record's exact identifier and each field's exact snake-case wire name, in any letter
 * case and anywhere in the text, a longer name holding it included (the wider readings are R-SRC-NARROW's: Pi's own camelCase
 * sourceRevision and other programs' world-model ids, A1). */
const SRC_WORDS: readonly RegExp[] = [...RECORDS, ...FIELDS].map(name => new RegExp(name, "i"));
/** A text with exactly three JavaScript escape forms decoded, every \uXXXX, \xXX and \u{X} (up to 10FFFF) sequence, so a name
 * spelled through one of them reads as the name it spells; every other escape stays as written (R-UNDECODED-ESCAPE). */
function decoded(text: string): string {
  return text.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})|\\x([0-9a-fA-F]{2})/g, (sequence: string, braced?: string, four?: string, two?: string) => {
    const code = Number.parseInt(braced ?? four ?? two ?? "", 16);
    return code <= 0x10ffff ? String.fromCodePoint(code) : sequence;
  });
}
/** A text in both forms THE READERS read: as written and with the three hex escape forms decoded. */
const forms = (text: string): readonly string[] => [text, decoded(text)];
/** A name with one character written as a JavaScript escape of one form (the cut #1 refusal's U2 spellings, built, never typed). */
function escapeAt(name: string, at: number, form: "four" | "braced" | "two"): string {
  const hex = (name.codePointAt(at) ?? 0).toString(16);
  const sequence = form === "four" ? `\\u${hex.padStart(4, "0")}` : form === "braced" ? `\\u{${hex}}` : `\\x${hex.padStart(2, "0")}`;
  return `${name.slice(0, at)}${sequence}${name.slice(at + 1)}`;
}
/** A name with a backslash set before the character at `at`: an identity escape where that character has no escape meaning
 * (the cut #2 refusal's spellings, built, never typed; R-UNDECODED-ESCAPE). */
const identityAt = (name: string, at: number): string => `${name.slice(0, at)}\\${name.slice(at)}`;
/** A name with a line continuation (a backslash and a line break) set before the character at `at` (R-UNDECODED-ESCAPE). */
const continuedAt = (name: string, at: number): string => `${name.slice(0, at)}\\\n${name.slice(at)}`;
/** The members the observer reads for each analog today: the member reader's liveness anchor in the release it judges. */
const ANALOGS: readonly string[] = ["RunDto.furnace_version", "RunDto.binary_revision", "LogsReadDto.complete", "LogsReadDto.lossy", "AttemptDto.ordinal"];

interface Declared {
  readonly name: string;
  readonly members: readonly string[];
}
function memberName(name: ts.PropertyName, source: ts.SourceFile): string {
  return ts.isComputedPropertyName(name) ? name.getText(source) : name.text;
}
/** The name a declaration opens: an interface, type alias, class, enum or function by its name, a variable by its identifier. */
function declared(node: ts.Node): string | undefined {
  if (
    (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isClassDeclaration(node) || ts.isEnumDeclaration(node) || ts.isFunctionDeclaration(node)) &&
    node.name !== undefined
  ) {
    return node.name.text;
  }
  return ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) ? node.name.text : undefined;
}
/** Every named interface, type alias, class, enum and function declaration and every variable declared by an identifier in one
 * declaration file, with the property and method signatures, property and method declarations and enum members nested in it
 * (a function's or a variable's type literal included; AST only). A get or set accessor, like every other node kind, is no
 * member (THE READERS). */
function declarations(file: string, text: string): Declared[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const found: { name: string; members: string[] }[] = [];
  const visit = (node: ts.Node, owner: { name: string; members: string[] } | undefined): void => {
    let next = owner;
    const name = declared(node);
    if (name !== undefined) {
      next = { name, members: [] };
      found.push(next);
    } else if (
      owner !== undefined &&
      (ts.isPropertySignature(node) || ts.isMethodSignature(node) || ts.isPropertyDeclaration(node) || ts.isMethodDeclaration(node) || ts.isEnumMember(node))
    ) {
      owner.members.push(memberName(node.name, source));
    }
    ts.forEachChild(node, child => visit(child, next));
  };
  visit(source, undefined);
  return found;
}
const qualified = (found: readonly Declared[]): string[] => found.flatMap(item => item.members.map(member => `${item.name}.${member}`));
function regularFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? regularFiles(join(dir, entry.name)) : entry.isFile() ? [join(dir, entry.name)] : [],
  );
}
interface Release {
  readonly files: readonly { readonly path: string; readonly text: string }[];
  readonly found: readonly Declared[];
}
/** A TypeScript declaration file of any module kind. */
const DECLARATION_FILE = /\.d\.[cm]?ts$/;
/** A release as its files' package-relative paths and texts, with every declaration of its declaration files. */
function release(files: readonly { readonly path: string; readonly text: string }[]): Release {
  return { files, found: files.filter(file => DECLARATION_FILE.test(file.path)).flatMap(file => declarations(file.path, file.text)) };
}
function installedRelease(): Release {
  return release(regularFiles(SDK_ROOT).map(file => ({ path: relative(SDK_ROOT, file), text: readFileSync(file, "utf8") })));
}
/** Per name, the string members of each type alias of that name in the installed release's declaration files, in declared order
 * (AST only; each file parsed once). */
function releaseUnions(names: readonly string[]): ReadonlyMap<string, readonly string[][]> {
  const unions = new Map<string, string[][]>(names.map(name => [name, []]));
  for (const file of regularFiles(SDK_ROOT).filter(path => DECLARATION_FILE.test(path))) {
    const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
    const visit = (node: ts.Node): void => {
      const found = ts.isTypeAliasDeclaration(node) ? unions.get(node.name.text) : undefined;
      if (found !== undefined && ts.isTypeAliasDeclaration(node)) {
        const members: readonly ts.TypeNode[] = ts.isUnionTypeNode(node.type) ? node.type.types : [node.type];
        found.push(members.map(member => (ts.isLiteralTypeNode(member) && ts.isStringLiteral(member.literal) ? member.literal.text : `<${member.getText(source)}>`)));
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return unions;
}
interface Findings {
  readonly records: readonly string[];
  readonly fields: Readonly<Record<string, readonly string[]>>;
  readonly spellings: readonly string[];
}
/** What the release reader finds: declarations named for a record, members per field, and files whose path or content, as
 * written or with the three hex escape forms decoded, spells RELEASE_WORDS. */
function findings(read: Release): Findings {
  const members = qualified(read.found);
  return {
    records: read.found.map(item => item.name).filter(name => RECORDS.some(record => recordReading(record).test(name))),
    fields: Object.fromEntries(FIELDS.map(field => [field, members.filter(member => fieldReading(field).test(member.slice(member.indexOf(".") + 1)))])),
    spellings: read.files
      .filter(file => {
        const texts = [...forms(file.path), ...forms(file.text)];
        return RELEASE_WORDS.some(reading => texts.some(form => reading.test(form)));
      })
      .map(file => file.path),
  };
}
const QUIET: Findings = { records: [], fields: Object.fromEntries(FIELDS.map(field => [field, []])), spellings: [] };
/** Every src path (repository-relative) whose text, as written or with the three hex escape forms decoded, spells one of the
 * readings. */
function srcSpellings(files: readonly { readonly path: string; readonly text: string }[], readings: readonly RegExp[]): string[] {
  return files
    .filter(file => {
      const texts = forms(file.text);
      return readings.some(reading => texts.some(form => reading.test(form)));
    })
    .map(file => file.path);
}
function srcFiles(): { path: string; text: string }[] {
  return regularFiles(join(REPO, "src")).map(file => ({ path: relative(REPO, file), text: readFileSync(file, "utf8") }));
}

let exported: readonly unknown[] | undefined;
/** Every export row, parsed once per run (the export is large, and A1 reads it for its own row and for every title). */
function exportRows(): readonly unknown[] {
  exported ??= readFileSync(join(REPO, EXPORT), "utf8")
    .split("\n")
    .filter(line => line.trim() !== "")
    .map((line): unknown => JSON.parse(line));
  return exported;
}
/** The bead's own export row: its title and notes (later notes are appended, so notes are read by inclusion only). */
function exportRow(): { title: string; notes: string } {
  const rows = exportRows();
  const mine = rows.flatMap(row =>
    typeof row === "object" &&
    row !== null &&
    "id" in row &&
    row.id === BEAD &&
    "title" in row &&
    typeof row.title === "string" &&
    "notes" in row &&
    typeof row.notes === "string"
      ? [{ title: row.title, notes: row.notes }]
      : [],
  );
  expect(mine, "the export holds exactly one row for the bead").toHaveLength(1);
  return mine[0];
}
/** Every export row's title. */
function exportTitles(): string[] {
  return exportRows().flatMap(row => (typeof row === "object" && row !== null && "title" in row && typeof row.title === "string" ? [row.title] : []));
}
/** Splits a list at its separators outside parentheses. */
function topLevel(text: string, separators: readonly string[]): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < text.length; index++) {
    if (text[index] === "(") depth++;
    else if (text[index] === ")") depth--;
    else if (depth === 0) {
      const separator = separators.find(candidate => text.startsWith(candidate, index));
      if (separator !== undefined) {
        parts.push(text.slice(start, index));
        start = index + separator.length;
        index = start - 1;
      }
    }
  }
  parts.push(text.slice(start));
  return parts;
}
/** The export title's clauses: its trigger, its FRN-WM-003 list split at the list's own separators, and its last clause. */
function titleClauses(title: string): string[] {
  const parts = /^\[[A-Z0-9-]+\] (.+) shall preserve FRN-WM-003 end-to-end: (.+) (survive [^.]+)\.$/.exec(title);
  return parts === null ? [] : [parts[1], ...topLevel(parts[2], [", ", " and "]), parts[3]];
}

type Rec = Readonly<Record<string, unknown>>;
const isRec = (value: unknown): value is Rec => typeof value === "object" && value !== null && !Array.isArray(value);
/**
 * The acceptance's round trip, per field: every record handed to a reader comes back, in the order handed (read by its
 * identity field), with every judged field present and equal to what was handed (compared as JSON). Each departure is one
 * finding: "reordered", "dropped:<identity>.<field>" or "changed:<identity>.<field>".
 */
function roundTrip(handed: readonly Rec[], presented: readonly unknown[], identity: string, judged: readonly string[]): string[] {
  const records = presented.filter(isRec);
  const order = (rows: readonly Rec[]): string => JSON.stringify(rows.map(row => row[identity]));
  const found: string[] = order(records) === order(handed) && records.length === presented.length ? [] : ["reordered"];
  for (const before of handed) {
    const after = records.find(row => row[identity] === before[identity]);
    for (const field of judged) {
      if (after === undefined || !Object.hasOwn(after, field)) found.push(`dropped:${String(before[identity])}.${field}`);
      else if (JSON.stringify(after[field]) !== JSON.stringify(before[field])) found.push(`changed:${String(before[identity])}.${field}`);
    }
  }
  return found;
}
const omit = (row: Rec, field: string): Rec => Object.fromEntries(Object.entries(row).filter(([key]) => key !== field));
/** The furnace_observe reply of a value, parsed back (S1 binds the reply to this function). */
function replyOf(value: unknown): unknown {
  const parsed: unknown = JSON.parse(sanitizeWorkbenchJsonText(value));
  return parsed;
}
const listAt = (value: unknown, key: string): unknown[] => {
  const member = isRec(value) ? value[key] : undefined;
  return Array.isArray(member) ? member : [];
};

/** HYPOTHETICAL FurnaceObservedTransition rows: PROPOSED_RECORDS' fields, values of this file's own (no release publishes one). */
const hash = (text: string): string => `sha256:${createHash("sha256").update(text).digest("hex")}`;
function transition(index: number): Rec {
  const values: Readonly<Record<string, unknown>> = {
    source_revision: "HYPOTHETICAL-source-revision-7f3a",
    run_id: "frn-run-world-model",
    attempt_id: `frn-atm-wm-${"cab"[index]}`,
    before_ref: `HYPOTHETICAL-state-${index}`,
    event_ref: `HYPOTHETICAL-event-${index}`,
    after_ref: `HYPOTHETICAL-state-${index + 1}`,
    exit_status: index === 2 ? 0 : 1,
    reason: index === 2 ? "success" : "work_failure",
    native_receipt: `HYPOTHETICAL-receipt-${index}`,
    capture_completeness: index === 1 ? "HYPOTHETICAL-partial" : "HYPOTHETICAL-complete",
    redaction_hash: hash(`HYPOTHETICAL-redacted-log-${index}`),
  };
  return Object.fromEntries(TRANSITION_FIELDS.map(field => [field, values[field]]));
}
const TRANSITIONS: readonly Rec[] = [0, 1, 2].map(transition);
/** The fields J1 drops one at a time: each ROWS field and the record's ordering references. */
const ORDERING_REFS: readonly string[] = TRANSITION_FIELDS.filter(field => /^(?:before|event|after)_ref$/.test(field));

/** One class of the docs/12 redaction floor, planted with an obviously fake value, and how a presentation shows it. */
interface CorpusEntry {
  readonly id: string;
  /** The floor sentence's word for the class (A1). */
  readonly word: string;
  readonly line: string;
  readonly shown: string;
  /** How a presentation shows the line once the producer already redacted its value (HELD). */
  readonly held: string;
}
const FAKE = "census-fake-abc123";
const MARKER = "[REDACTED]";
/** An API-token prefix the floor redacts, assembled so no token-shaped literal is spelled here. */
const TOKEN_PREFIX = ["sk", "ant", ""].join("-");
const CORPUS: readonly CorpusEntry[] = [
  { id: "bearer", word: "bearer", line: `Authorization: Bearer ${FAKE}`, shown: "Authorization: [REDACTED]", held: "Authorization: [REDACTED]" },
  { id: "basic", word: "basic", line: `Authorization: Basic ${FAKE}`, shown: "Authorization: [REDACTED]", held: "Authorization: [REDACTED]" },
  { id: "token-prefix", word: "API-token", line: `deploy key ${TOKEN_PREFIX}${FAKE}`, shown: "deploy key [REDACTED]", held: `deploy key ${TOKEN_PREFIX}[REDACTED]` },
  { id: "plain-key-value", word: "plain", line: `password=${FAKE}`, shown: "password=[REDACTED]", held: "password=[REDACTED]" },
  { id: "json-key-value", word: "JSON-quoted", line: `{"api_key": "${FAKE}"}`, shown: '{"api_key": [REDACTED]}', held: '{"api_key": [REDACTED]}' },
];
/** Each CORPUS line as a producer that already redacted it writes it (its value replaced by the marker): it stays redacted. */
const HELD: readonly { readonly line: string; readonly shown: string }[] = CORPUS.map(entry => ({ line: entry.line.replace(FAKE, MARKER), shown: entry.held }));
/** docs/workbench/12-security.md's redaction-floor sentence, which names CORPUS's classes (A1). */
const FLOOR_SENTENCE =
  "Native exception previews are bounded and redact recognized bearer/basic credentials, common API-token prefixes and sensitive plain or JSON-quoted key/value fields before worker/UI display.";
/** docs/12's page title and the section holding its redaction floor (the title's em dash spelled by code point, so this file
 * stays ASCII). */
const DOCS12_TITLE = `12 ${String.fromCodePoint(0x2014)} Trust model, authorization, isolation and sensitive data`;
const DOCS12_SECTION = "Current diagnostic protections";
/**
 * The redaction-floor sentences a reader of docs/12 reads: the section binds through the landed docsSection reading
 * (test/helpers/census.ts: the heading exactly once in the rendered view, under the page title, bounded at the next level-1 or
 * level-2 heading or EOF, so a ### subsection belongs to it), carries no HTML (a comment can hide what its source says), and
 * only the paragraphs standing directly under the heading, before the section's first subsection heading, are read. Each is
 * split into whole sentences, and a sentence counts only when it is FLOOR_SENTENCE exactly in the paragraph's source and in its
 * rendered text alike (any inline mark, a strikethrough included, changes the source), so a hidden, relocated, prefixed,
 * merged, struck, emphasized or sub-sectioned copy reads as none.
 */
function floorSentences(markdown: string): string[] {
  const section = docsSection(markdown, DOCS12_SECTION, 2, [DOCS12_TITLE]);
  if (!section.ok || section.hasHtml) return [];
  const subsection = section.blocks.findIndex(block => block.kind === "heading");
  const direct = subsection === -1 ? section.blocks : section.blocks.slice(0, subsection);
  const sentences = (text: string): string[] => text.split(/(?<=\.) +(?=[A-Z])/);
  return direct
    .flatMap(block => (block.kind === "paragraph" && sentences(block.markdown).includes(FLOOR_SENTENCE) ? sentences(block.text) : []))
    .filter(sentence => sentence === FLOOR_SENTENCE);
}

const CLOCK = "2026-10-28T15:30:00.000Z";
const WORKSPACE = "/srv/furnace-world-model-ws";
const SCOPE = { workspace: WORKSPACE, principal: "world-model-tester" };
const LIMITS = { maxPolls: 1, intervalMs: 1, maxElapsedMs: 5000, attemptLimit: 5, logBytes: 512, callTimeoutMs: 2000 };
const RUN_ID = "frn-run-world-model";
const VERSION = "0.1.0";
const REVISION = "rev-world-model-7f3a";
function attempt(id: string, ordinal: number, state: AttemptDto["state"], outcome: AttemptDto["outcome"]): AttemptDto {
  const at = (second: number): string => `2026-10-28T14:00:${String(ordinal * 3 + second).padStart(2, "0")}Z`;
  return {
    attempt_id: id,
    run_id: RUN_ID,
    work_id: "bd-work-wm",
    ordinal,
    executor: "runner",
    controller_session_id: `ctl-wm-${ordinal}`,
    state,
    outcome,
    created_at: at(0),
    started_at: at(1),
    finished_at: at(2),
    exit_code: state === "succeeded" ? 0 : 1,
    termination_cause: "natural_exit",
  };
}
/** The Attempt page in its native order: the ordinals ascend while the ids do not sort, so any re-sort shows. */
const PAGE: readonly AttemptDto[] = [
  attempt("frn-atm-wm-c", 1, "failed", "work_failure"),
  attempt("frn-atm-wm-a", 2, "failed", "work_failure"),
  attempt("frn-atm-wm-b", 3, "succeeded", "success"),
];
const PAGE_IDS: readonly string[] = PAGE.map(item => item.attempt_id);
const STATUS: RunStatusDto = {
  run_id: RUN_ID,
  beads_run_id: "bd-run-world-model",
  workspace: WORKSPACE,
  state: "active",
  mode: "persistent_molecule",
  furnace_version: VERSION,
  binary_revision: REVISION,
  created_at: "2026-10-28T14:00:00Z",
  updated_at: "2026-10-28T14:00:11Z",
  state_since: "2026-10-28T14:00:00Z",
  executor: "runner",
  max_parallel: 1,
  attempt_timeout: "30m",
  active: [],
  failed: [PAGE[0], PAGE[1]],
  failed_total: 2,
  attention: [],
  unreadable: [],
  corrupt_events: [],
  corrupt_events_total: 0,
  conflicts: [],
  completed: 1,
  total: 3,
};
const LIST: AttemptListDto = {
  run_id: RUN_ID,
  beads_run_id: STATUS.beads_run_id,
  complete: true,
  limit: LIMITS.attemptLimit,
  returned: PAGE.length,
  next_cursor: null,
  attempts: [...PAGE],
  unreadable: [],
};
const LOG_LINES: readonly string[] = ["step 1 done", "step 2 done", "step 3 done"];
const LOG: LogsReadDto = {
  run_id: RUN_ID,
  attempt_id: PAGE_IDS[2],
  stream: "stdout",
  complete: true,
  limit: LIMITS.logBytes,
  returned: LOG_LINES.length,
  next_cursor: null,
  lossy: false,
  lines: [...LOG_LINES],
};
interface Fixture {
  readonly status: RunStatusDto;
  readonly list: AttemptListDto;
  readonly log: LogsReadDto;
}
const BASE: Fixture = { status: STATUS, list: LIST, log: LOG };
/** Every RunState the installed release declares, in its declared order (A1 holds it to the release's RunState union). */
const STATES: readonly RunState[] = ["created", "active", "paused", "needs_attention", "completed", "stopped", "failed"];
/** Both log streams the installed release declares (A1 holds it to the release's OutputStream union). */
const STREAMS: readonly LogsReadDto["stream"][] = ["stdout", "stderr"];
/** A fixture whose Run is in the given state, every other read unchanged. */
const inState = (fixture: Fixture, state: RunState): Fixture => ({ ...fixture, status: { ...fixture.status, state } });
const UNREADABLE = { path: "attempts/frn-atm-wm-x.json", class: "unreadable", detail: "HYPOTHETICAL-unreadable" };
/** One missing-fields fact per leaf operand of the observer's `incomplete` initializer (A1 holds `reads` to the source); O1
 * reads each in every RunState. */
interface IncompleteFact {
  readonly id: string;
  readonly reads: string;
  readonly plant: (fixture: Fixture) => Fixture;
}
const INCOMPLETE: readonly IncompleteFact[] = [
  { id: "page-incomplete", reads: "!history.complete", plant: f => ({ ...f, list: { ...f.list, complete: false } }) },
  { id: "page-unreadable", reads: "history.unreadable.length>0", plant: f => ({ ...f, list: { ...f.list, unreadable: [UNREADABLE] } }) },
  { id: "run-unreadable", reads: "run.unreadable.length>0", plant: f => ({ ...f, status: { ...f.status, unreadable: [UNREADABLE] } }) },
  {
    id: "failed-unreturned",
    reads: "run.failed_total>run.failed.length",
    plant: f => ({ ...f, status: { ...f.status, failed_total: f.status.failed.length + 1 } }),
  },
  {
    id: "corrupt-unreturned",
    reads: "run.corrupt_events_total>run.corrupt_events.length",
    plant: f => ({ ...f, status: { ...f.status, corrupt_events_total: f.status.corrupt_events.length + 1 } }),
  },
  {
    id: "progress-unavailable",
    reads: "run.progress_unavailable!==undefined",
    plant: f => ({ ...f, status: { ...f.status, progress_unavailable: "observation_failed" } }),
  },
  { id: "log-incomplete", reads: "!log.complete", plant: f => ({ ...f, log: { ...f.log, complete: false } }) },
  { id: "log-lossy", reads: "log.lossy", plant: f => ({ ...f, log: { ...f.log, lossy: true } }) },
];
/** Members the release does not publish, under the program's proposed spellings, and secret-bearing members (O2). */
const UNPUBLISHED: Rec = {
  source_revision: "HYPOTHETICAL-source-revision-7f3a",
  capture_completeness: "HYPOTHETICAL-partial",
  redaction_hash: hash("HYPOTHETICAL-redacted-log-0"),
  transitions: [...TRANSITIONS],
  api_key: FAKE,
  environment: `secret=${FAKE}`,
};
const plantRow = (item: AttemptDto): AttemptDto => ({ ...item, ...UNPUBLISHED });
const PLANTED: Fixture = {
  status: { ...STATUS, ...UNPUBLISHED, failed: STATUS.failed.map(plantRow), active: [plantRow(PAGE[2])] },
  list: { ...LIST, ...UNPUBLISHED, attempts: PAGE.map(plantRow) },
  log: { ...LOG, ...UNPUBLISHED, lines: [CORPUS[0].line, HELD[0].line, "HYPOTHETICAL-log-line"] },
};
/** Every planted value O2 looks for in an output. */
const PLANT_MARKS: readonly string[] = ["HYPOTHETICAL", FAKE, MARKER, ...PLANTED.log.lines];

function respond<T>(kind: ResponseKind, requestId: string, data: T): Response<T> {
  return { protocolVersion: 1, kind, requestId, data, exit: { code: 0, signal: null }, stderr: "" };
}
function client(fixture: Fixture): FurnaceObserverClient {
  return {
    runs: { get: () => ({ status: async () => respond("run_status", "req-status-wm", fixture.status) }) },
    attempts: { list: async () => respond("attempt_list", "req-attempts-wm", fixture.list) },
    logs: { read: async () => respond("logs_read", "req-logs-wm", fixture.log) },
  };
}
interface Outputs {
  readonly reading: FurnaceReading;
  /** The observer's last reading, read right after the snapshot (outputs() holds it equal to the reading). */
  readonly last: FurnaceReading | undefined;
  /** Every reading observe() yields at the census's one-poll budget (outputs() holds the first equal to the reading). */
  readonly observed: readonly FurnaceReading[];
  /** The observer's last reading after close() (outputs() holds it to the reading's source and page). */
  readonly closed: FurnaceReading | undefined;
  readonly snapshot: NativeSnapshot;
  readonly topology: FurnaceProjectionTopology;
  /** The projection's nodes after it refreshed every topology snapshot and related every edge. */
  readonly nodes: readonly ObservedNode[];
  /** The projection's Attempt nodes of the Run's invocation, in the order it returns them. */
  readonly order: readonly string[];
  readonly reply: string;
}
async function outputs(fixture: Fixture): Promise<Outputs> {
  const observer = new FurnaceObserver(client(fixture), { workspaceRoot: WORKSPACE, runId: RUN_ID, scope: SCOPE, limits: LIMITS });
  const reading = await observer.snapshot();
  const pristine = structuredClone(reading);
  const last = observer.last;
  expect(last, "the last reading is the reading").toStrictEqual(reading);
  const snapshot = observer.projectionSnapshot(reading);
  const topology = observer.projectionTopology(reading);
  const projection = new ObservationProjection();
  expect(topology.snapshots.map(item => projection.refresh(item)), "every topology snapshot is applied").toStrictEqual(topology.snapshots.map(() => "applied"));
  for (const relation of topology.relations) projection.relate(relation);
  const nodes = projection.query({ scope: SCOPE, limit: 20 }).nodes;
  const order = projection.query({ scope: SCOPE, invocationId: RUN_ID, limit: 20 }).nodes.map(node => node.nativeRef.id);
  const observed: FurnaceReading[] = [];
  for await (const item of observer.observe()) observed.push(item);
  expect(observed[0], "observe() first yields the reading").toStrictEqual(reading);
  expect(
    observed.map(item => [item.source, item.attempts.items]),
    "every yield keeps the reading's source and page",
  ).toStrictEqual(observed.map(() => [reading.source, reading.attempts.items]));
  observer.close();
  const closed = observer.last;
  expect([closed?.source, closed?.attempts.items], "the last reading after close() keeps the reading's source and page").toStrictEqual([
    reading.source,
    reading.attempts.items,
  ]);
  const reply = sanitizeWorkbenchJsonText(reading);
  expect(reading, "the Run snapshot, topology and reply calls, observe() and close() leave the reading unchanged").toStrictEqual(pristine);
  return { reading, last, observed, closed, snapshot, topology, nodes, order, reply };
}
/** Every completeness label one output set states, reading first, then each snapshot, each node and the reply's own text. */
function completenessOf(out: Outputs): unknown[] {
  const reply: unknown = JSON.parse(out.reply);
  return [out.reading.completeness, out.snapshot.coverage, ...out.topology.snapshots.map(item => item.coverage), ...out.nodes.map(node => node.completeness), isRec(reply) ? reply.completeness : undefined];
}

/** One planted file a probe hands to a reader: a release-relative or repository-relative path and its text. */
interface ProbeFile {
  readonly path: string;
  readonly text: string;
}
/** What the witness reads for: each record, each field and the world-model words. */
const WITNESSED: readonly string[] = [...RECORDS, ...FIELDS, "world model"];
/**
 * The witness, outside THE READERS: the names a probe file spells as TypeScript cooks its string literals (every string
 * literal and no-substitution template as the compiler reads it, a constant of the same file bound to one read as its value, a
 * + chain or a template of them joined, and an array of them joined by a literal separator), so a probe that spells nothing
 * would show.
 */
function cookedNames(file: ProbeFile): string[] {
  const source = ts.createSourceFile(file.path, file.text, ts.ScriptTarget.Latest, true);
  const constants = new Map<string, string>();
  const bind = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && ts.isStringLiteral(node.initializer)) {
      constants.set(node.name.text, node.initializer.text);
    }
    ts.forEachChild(node, bind);
  };
  bind(source);
  const values: string[] = [];
  const value = (node: ts.Node): string | undefined => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isIdentifier(node)) return constants.get(node.text);
    if (ts.isParenthesizedExpression(node)) return value(node.expression);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const left = value(node.left);
      const right = value(node.right);
      return left === undefined || right === undefined ? undefined : `${left}${right}`;
    }
    if (ts.isTemplateExpression(node)) {
      const parts = node.templateSpans.map(span => value(span.expression));
      return parts.some(part => part === undefined) ? undefined : node.head.text + node.templateSpans.map((span, index) => `${parts[index]}${span.literal.text}`).join("");
    }
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "join" && ts.isArrayLiteralExpression(node.expression.expression)) {
      const parts = node.expression.expression.elements.map(value);
      const separator = node.arguments.length === 0 ? "," : value(node.arguments[0]);
      return separator === undefined || parts.some(part => part === undefined) ? undefined : parts.join(separator);
    }
    return undefined;
  };
  const visit = (node: ts.Node): void => {
    const found = value(node);
    if (found !== undefined) values.push(found);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return WITNESSED.filter(name => values.some(text => text.includes(name)));
}
/** R-UNDECODED-ESCAPE's release plants: the cut #2 refusal's six T1 plants (L2C2-T1-IDESC-COMPUTED, -IDESC-VAR, -IDESC-VAR2,
 * -IDESC-JS, -IDESC-GETTER and -LINECONT-MID, rebuilt byte for byte), then a record and the world-model words, each broken
 * inside a word, in content and then as the quoted name of a member the member reading reads (the landing-668 gate's
 * G8-UE-QMEMBER-RECORD and G8-UE-QMEMBER-WM, rebuilt: TypeScript cooks each to the member it spells, SyntheticAttemptState and
 * "world model", but the member reading reads a member name against the field readings only, and the content reading keeps
 * the escape as written). */
const UNDECODED_RELEASE: readonly ProbeFile[] = [
  { path: "dist/src/protocol.d.ts", text: `declare const K2: "${identityAt("source_revision", 4)}";\nexport interface RunDto {\n    [K2]?: string;\n}\n` },
  { path: "dist/src/protocol.d.ts", text: `export declare const transitionKey: "${identityAt("redaction_hash", 6)}";\n` },
  { path: "dist/src/protocol.d.ts", text: `export declare const completenessKey: "${identityAt("capture_completeness", 2)}";\n` },
  { path: "dist/src/index.js", text: `\nexport const RECORD_KEY = "${identityAt("redaction_hash", 2)}";\n` },
  { path: "dist/src/protocol.d.ts", text: `export declare class TraceView {\n    get "${identityAt("source_revision", 4)}"(): string;\n}\n` },
  { path: "dist/src/protocol.d.ts", text: `declare const K3: "${continuedAt("source_revision", 4)}";\nexport interface RunDto {\n    [K3]?: string;\n}\n` },
  { path: "dist/src/index.js", text: `export const KIND = "${identityAt("SyntheticAttemptState", 5)}";\n` },
  { path: "dist/src/index.js", text: `export const NOTE = "a ${identityAt("world model", 3)}";\n` },
  { path: "dist/src/protocol.d.ts", text: `export interface ZzHolder {\n    "${identityAt("SyntheticAttemptState", 5)}": string;\n}\n` },
  { path: "dist/src/protocol.d.ts", text: `export interface ZzHolder {\n    "${identityAt("world model", 3)}": string;\n}\n` },
];
/** R-UNDECODED-ESCAPE's src plants: the cut #2 refusal's four T3 plants (L2C2-T3-IDESC, -IDESC-SEP, -IDESC-RECORD and
 * -LINECONT, rebuilt byte for byte). */
const UNDECODED_SRC: readonly ProbeFile[] = [
  { path: "src/workbench/zz-gate-plant.ts", text: `export const FIELD = "${identityAt("source_revision", 4)}";\n` },
  { path: "src/workbench/zz-gate-plant.ts", text: `export const FIELD = "${identityAt("capture_completeness", 7)}";\n` },
  { path: "src/workbench/zz-gate-plant.ts", text: `export const KIND = "${identityAt("SyntheticAttemptState", 9)}";\n` },
  { path: "src/workbench/zz-gate-plant.ts", text: `export const FIELD = "${continuedAt("redaction_hash", 10)}";\n` },
];
/** R-ASSEMBLED's release plants: the cut #2 refusal's L2C2-T1-JS-CONCAT (byte for byte), then a template placeholder, an array
 * join and a record, each joined inside a word, and a field joined between its words through a constant whose name holds
 * letters (the template's placeholder is joined at "$" so no literal here holds one). */
const ASSEMBLED_RELEASE: readonly ProbeFile[] = [
  { path: "dist/src/index.js", text: '\nexport const FIELD_KEY = "sou" + "rce_revision";\n' },
  { path: "dist/src/index.js", text: ["export const CAPTURE_KEY = `cap", '{"ture"}_completeness`;\n'].join("$") },
  { path: "dist/src/index.js", text: 'export const HASH_KEY = ["redac", "tion_hash"].join("");\n' },
  { path: "dist/src/index.js", text: 'export const KIND = "Counter" + "factualCandidate";\n' },
  { path: "dist/src/index.js", text: 'export const SEP = "_";\nexport const REVISION_KEY = "source" + SEP + "revision";\n' },
];
/** One residual family and its quiet row: a probe the readers read, and the quiet verdict they return for it today; a witnessed
 * family also holds, for each of its probe files, the names TypeScript cooks in it (cookedNames). */
interface Residual {
  readonly id: string;
  readonly family: string;
  readonly probe: () => unknown;
  readonly quiet: unknown;
  readonly witness?: { readonly files: readonly ProbeFile[]; readonly spells: readonly (readonly string[])[] };
}
const RESIDUALS: readonly Residual[] = [
  {
    id: "R-RENAMED",
    family: "a record shipped only under a name, with fields under names, that hold no reading's run (here TraceStep {rev, cover, digest}) escapes T1",
    probe: () =>
      findings(
        release([
          { path: "dist/src/trace.d.ts", text: "export interface TraceStep { rev: string; cover: string; digest: string; before: string; after: string }" },
        ]),
      ),
    quiet: QUIET,
  },
  {
    id: "R-COMPUTED",
    family:
      "a field name the release spells only at type level, through a mapped type over a template-literal key whose placeholder falls inside a word or holds a letter or digit (here one of each), escapes T1",
    // The keys are `sou${"rce"}_revision` and `capture${Sep}completeness`, joined at "$" so no literal here holds a template
    // placeholder.
    probe: () =>
      [
        ["type Key = `sou", '{"rce"}_revision`; export type Computed = { [K in Key]: string };'],
        ['type Sep = "_"; type Key = `capture', "{Sep}completeness`; export type Computed = { [K in Key]: string };"],
      ].map(parts => findings(release([{ path: "dist/src/computed.d.ts", text: parts.join("$") }]))),
    quiet: [QUIET, QUIET],
  },
  {
    id: "R-ENCODED",
    family:
      "a record, a field or the world-model words spelled only through character codes (String.fromCharCode) or HTML character references, which no reader decodes, escape T1 and T3 wherever a code or reference falls inside the run that reader reads, between two words included",
    probe: () => {
      const codes = (name: string): string => [...name].map(char => char.codePointAt(0)).join(", ");
      const text = [
        `export const RECORD = String.fromCharCode(${codes("FurnaceObservedTransition")});`,
        `export const FIELD = String.fromCharCode(${codes("source_revision")});`,
        "<p>capture&#95;completeness, redaction&#x5f;hash, a world&#32;model</p>",
      ].join("\n");
      return [findings(release([{ path: "dist/src/encoded.js", text }])), srcSpellings([{ path: "src/workbench/zz-encoded-probe.ts", text }], SRC_WORDS)];
    },
    quiet: [QUIET, []],
  },
  {
    id: "R-UNDECODED-ESCAPE",
    family:
      "a name or the world-model words spelled only with an identity escape or a line continuation between two of their characters, which no reader decodes, escapes T3 anywhere inside a record identifier or wire name, and T1 inside a word of a reading's run outside the quoted name of a member the member reading reads that spells a field (T2 holds both edges)",
    probe: () => ({ release: UNDECODED_RELEASE.map(file => findings(release([file]))), src: UNDECODED_SRC.map(file => srcSpellings([file], SRC_WORDS)) }),
    quiet: { release: UNDECODED_RELEASE.map(() => QUIET), src: UNDECODED_SRC.map(() => []) },
    witness: {
      files: [...UNDECODED_RELEASE, ...UNDECODED_SRC],
      spells: [
        ["source_revision"],
        ["redaction_hash"],
        ["capture_completeness"],
        ["redaction_hash"],
        ["source_revision"],
        ["source_revision"],
        ["SyntheticAttemptState"],
        ["world model"],
        ["SyntheticAttemptState"],
        ["world model"],
        ["source_revision"],
        ["capture_completeness"],
        ["SyntheticAttemptState"],
        ["redaction_hash"],
      ],
    },
  },
  {
    id: "R-ASSEMBLED",
    family:
      "a record or field name the release spells only by joining parts at value level (with +, a template placeholder or an array join) escapes T1 where a joint falls inside a word or holds a letter or digit (T2 holds the edge between two words)",
    probe: () => ASSEMBLED_RELEASE.map(file => findings(release([file]))),
    quiet: ASSEMBLED_RELEASE.map(() => QUIET),
    witness: { files: ASSEMBLED_RELEASE, spells: [["source_revision"], ["capture_completeness"], ["redaction_hash"], ["CounterfactualCandidate"], ["source_revision"]] },
  },
  {
    id: "R-SRC-NARROW",
    family:
      "a Pi reader spelling the fields only in camelCase or kebab-case (sourceRevision, source-revision), a record or a field only as separate words (an observed transition), or a name only through keys assembled from parts that split it (['capture', 'completeness'].join('_')), escapes T3, and so do the world-model words (a world model), which T3 does not read",
    probe: () =>
      srcSpellings(
        [
          {
            path: "src/workbench/zz-world-model-probe.ts",
            text: "const sourceRevision = record.sourceRevision; record['source-revision']; record.captureCompleteness; record.redactionHash; const key = ['capture', 'completeness'].join('_'); // a world model's observed transitions (HX-PREDICTIVE-WORLD-MODEL-ADAPTERS-R2)",
          },
        ],
        SRC_WORDS,
      ),
    quiet: [],
  },
];

/** One parse per source text: S1 reads src/index.ts for two tools and for its slice, so the file is parsed once. */
const PARSED = new Map<string, ts.SourceFile>();
function parsed(text: string): ts.SourceFile {
  const known = PARSED.get(text);
  if (known !== undefined) return known;
  const source = ts.createSourceFile(INDEX_SOURCE, text, ts.ScriptTarget.Latest, true);
  PARSED.set(text, source);
  return source;
}
/** One checker per parsed source, binding that one source alone (no other file and no lib is read). */
const CHECKERS = new WeakMap<ts.SourceFile, ts.TypeChecker>();
function checkerOf(source: ts.SourceFile): ts.TypeChecker {
  const known = CHECKERS.get(source);
  if (known !== undefined) return known;
  const host: ts.CompilerHost = {
    getSourceFile: fileName => (fileName === source.fileName ? source : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => undefined,
    getCurrentDirectory: () => "/",
    getCanonicalFileName: fileName => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: fileName => fileName === source.fileName,
    readFile: () => undefined,
  };
  const checker = ts.createProgram({ rootNames: [source.fileName], options: { noLib: true, noResolve: true, types: [] }, host }).getTypeChecker();
  CHECKERS.set(source, checker);
  return checker;
}
/** A tool body as the S1 reader reads it (whitespace removed). */
interface ToolBody {
  /** Every call and new expression. */
  readonly calls: string[];
  /** Every variable initializer, as `name=initializer`. */
  readonly bindings: string[];
  /** Every textResult reply's shape: a string-literal argument reads "<literal>", a call reads as its callee with each argument
   * read as "reading" when it is that identifier and "..." otherwise, and any other argument as written. */
  readonly replies: string[];
  /** The target of every assignment (a compound one included, and a destructuring assignment's whole pattern), increment and
   * decrement (prefix or postfix) and delete, and of every for-of or for-in statement that writes an expression rather than
   * declaring a variable. */
  readonly writes: string[];
  /** Every return statement's value, a nested function's included: a textResult call read in its reply shape, any other value
   * as written (whitespace removed), and a bare return as "<none>". */
  readonly returns: string[];
  /** Every place the identifier `reading` occurs: "binding" where it is declared, "argument of <callee>" where it is a call's
   * argument, and "in <parent>" anywhere else (whitespace removed). */
  readonly mentions: string[];
  /** The names the body's data path calls through, read from the body and resolved by binding, as the TypeScript checker binds
   * this one source (no other file and no lib): the callee of every textResult reply, the plain callee of every call a reply is
   * handed, every identifier the body spells `reading`, the reading's receiver (read from the one declaration a reading's
   * binding has, a variable declaration `reading = [await] <receiver>.<method>(...)`) and the class that receiver is built from
   * (read likewise from `<receiver> = [await] new <Class>(...)`); any other declaration or initializer reads no receiver or
   * class. For each binding, sorted: each of its declarations by its kind, an import specifier as `import <imported name> from
   * "<specifier>"` (`import type` when the import is type-only), a variable as its declaration's keyword as written (const,
   * let, var or await using, say), and any other declaration by its TypeScript syntax kind (FunctionDeclaration or
   * BindingElement, say); each where it stands, in the "body", at "module" scope, in an "enclosing" function or "nested" in
   * another. A name bound to nothing in the source reads as a global. */
  readonly resolved: string[];
  /** Every reference the checker binds anywhere in the source to the binding the reading, its receiver and the receiver's class
   * each resolve to, in that order and in source order within each; then, in source order, every reference to the binding a
   * reply's callee or a callee a reply is handed resolves to that is neither one of its declarations nor the callee of a call.
   * Each by what it does: "binding" where it is declared, "argument of <callee>" where it is a call's argument, "callee" where
   * it is called, "class of new" where it is the class of a new expression, "receiver of <method>" where it is the object a
   * method is called on, and "in <parent>" anywhere else (whitespace removed); each where it stands, as above. A shorthand
   * property's name reads as the binding its value names, and an export specifier's local name as the local binding it exports. */
  readonly references: string[];
  /** The text (whitespace removed) of each declaration of the binding each textResult reply's callee resolves to. */
  readonly replier: string[];
}
/** The named tool's execute body in src/index.ts (or in a planted source), read through the AST. */
function toolBody(name: string, text = readFileSync(join(REPO, INDEX_SOURCE), "utf8")): ToolBody | undefined {
  const source = parsed(text);
  const squeeze = (node: ts.Node): string => node.getText(source).replace(/\s+/g, "");
  let body: ts.Node | undefined;
  const visit = (node: ts.Node): void => {
    if (ts.isObjectLiteralExpression(node)) {
      const named = node.properties.some(
        property => ts.isPropertyAssignment(property) && property.name.getText(source) === "name" && ts.isStringLiteral(property.initializer) && property.initializer.text === name,
      );
      const execute = node.properties.find(property => ts.isPropertyAssignment(property) && property.name.getText(source) === "execute");
      if (named && execute !== undefined && ts.isPropertyAssignment(execute)) body = execute.initializer;
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (body === undefined) return undefined;
  const calls: string[] = [];
  const bindings: string[] = [];
  const replies: string[] = [];
  const writes: string[] = [];
  const shape = (argument: ts.Expression): string => {
    if (ts.isStringLiteralLike(argument)) return '"<literal>"';
    if (!ts.isCallExpression(argument)) return squeeze(argument);
    const inner = argument.arguments.map(item => (ts.isIdentifier(item) && item.text === "reading" ? "reading" : "..."));
    return `${squeeze(argument.expression)}(${inner.join(",")})`;
  };
  const updates: readonly ts.SyntaxKind[] = [ts.SyntaxKind.PlusPlusToken, ts.SyntaxKind.MinusMinusToken];
  const returns: string[] = [];
  const mentions: string[] = [];
  const isTextResult = (node: ts.Node): node is ts.CallExpression & { readonly expression: ts.Identifier } => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "textResult";
  const returned = (value: ts.Expression | undefined): string => {
    if (value === undefined) return "<none>";
    return isTextResult(value) ? `textResult(${value.arguments.map(shape).join(",")})` : squeeze(value);
  };
  const mention = (node: ts.Identifier): string => {
    const parent = node.parent;
    if (ts.isVariableDeclaration(parent) && parent.name === node) return "binding";
    if (ts.isCallExpression(parent) && parent.arguments.some(argument => argument === node)) return `argument of ${squeeze(parent.expression)}`;
    return `in ${squeeze(parent)}`;
  };
  const collect = (node: ts.Node): void => {
    if (ts.isReturnStatement(node)) returns.push(returned(node.expression));
    if (ts.isIdentifier(node) && node.text === "reading") mentions.push(mention(node));
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) calls.push(squeeze(node));
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "textResult") replies.push(`textResult(${node.arguments.map(shape).join(",")})`);
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) bindings.push(`${squeeze(node.name)}=${squeeze(node.initializer)}`);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment) writes.push(squeeze(node.left));
    if ((ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && updates.includes(node.operator)) writes.push(squeeze(node.operand));
    if (ts.isDeleteExpression(node)) writes.push(squeeze(node.expression));
    if ((ts.isForOfStatement(node) || ts.isForInStatement(node)) && !ts.isVariableDeclarationList(node.initializer)) writes.push(squeeze(node.initializer));
    ts.forEachChild(node, collect);
  };
  collect(body);
  // The binding reader (landing 668 F3; the wb-40zp refusals #1 and #2): the names the body's data path calls through, read from
  // the body, each resolved to its binding as the TypeScript checker binds this one source (no other file and no lib is read),
  // and every reference the checker binds to those bindings anywhere in the source. Its readings are read when first asked for,
  // so a caller that reads only the body's shape builds no checker.
  const root: ts.Node = body;
  const readBindings = (): { readonly resolved: string[]; readonly references: string[]; readonly replier: string[] } => {
    const checker = checkerOf(source);
    /** The binding a name resolves to: for a shorthand property's name, the binding its value names; for an export specifier's
     * local name, the local binding it exports; otherwise the checker's symbol at the name. */
    const symbolOf = (name: ts.Identifier): ts.Symbol | undefined => {
      const parent = name.parent;
      if (ts.isShorthandPropertyAssignment(parent) && parent.name === name) return checker.getShorthandAssignmentValueSymbol(parent);
      if (ts.isExportSpecifier(parent) && (parent.propertyName ?? parent.name) === name) return checker.getExportSpecifierLocalTargetSymbol(parent);
      return checker.getSymbolAtLocation(name);
    };
    const replySites: ts.Identifier[] = [];
    const handedSites: ts.Identifier[] = [];
    const readingSites: ts.Identifier[] = [];
    const sites = (node: ts.Node): void => {
      if (isTextResult(node)) {
        replySites.push(node.expression);
        for (const argument of node.arguments) if (ts.isCallExpression(argument) && ts.isIdentifier(argument.expression)) handedSites.push(argument.expression);
      }
      if (ts.isIdentifier(node) && node.text === "reading") readingSites.push(node);
      ts.forEachChild(node, sites);
    };
    sites(root);
    /** The initializer of a binding with exactly one declaration, a variable declaration with an initializer, read past one
     * await; otherwise nothing. */
    const initializerOf = (binding: ts.Symbol | undefined): ts.Expression | undefined => {
      const declarations = binding?.declarations ?? [];
      const only = declarations.length === 1 ? declarations[0] : undefined;
      if (only === undefined || !ts.isVariableDeclaration(only) || only.initializer === undefined) return undefined;
      return ts.isAwaitExpression(only.initializer) ? only.initializer.expression : only.initializer;
    };
    const receiverSites = [...new Set(readingSites.map(symbolOf))].flatMap(binding => {
      const read = initializerOf(binding);
      return read !== undefined && ts.isCallExpression(read) && ts.isPropertyAccessExpression(read.expression) && ts.isIdentifier(read.expression.expression) ? [read.expression.expression] : [];
    });
    const classSites = [...new Set(receiverSites.map(symbolOf))].flatMap(binding => {
      const built = initializerOf(binding);
      return built !== undefined && ts.isNewExpression(built) && ts.isIdentifier(built.expression) ? [built.expression] : [];
    });
    /** Where a node stands: in the body, at module scope, in a function that encloses the body, or nested in another function. */
    const where = (node: ts.Node): string => {
      if (node.pos >= root.pos && node.end <= root.end) return "body";
      for (let up: ts.Node | undefined = node.parent; up !== undefined; up = up.parent) if (ts.isFunctionLike(up)) return up.pos <= root.pos && root.end <= up.end ? "enclosing" : "nested";
      return "module";
    };
    /** A declaration by its kind: an import specifier by the name it imports and its module specifier ("import type" when the
     * import is type-only), a variable by its declaration's keyword as written, and any other declaration by its syntax kind. */
    const kindOf = (declaration: ts.Declaration): string => {
      if (ts.isImportSpecifier(declaration)) {
        const imported = (declaration.propertyName ?? declaration.name).text;
        return `import ${ts.isTypeOnlyImportDeclaration(declaration) ? "type " : ""}${imported} from ${declaration.parent.parent.parent.moduleSpecifier.getText(source)}`;
      }
      if (ts.isVariableDeclarationList(declaration.parent)) return source.text.slice(declaration.parent.getStart(source), declaration.parent.declarations[0].getStart(source)).trim();
      return ts.SyntaxKind[declaration.kind];
    };
    const allSites = [...replySites, ...handedSites, ...readingSites, ...receiverSites, ...classSites];
    const entries = new Map<ts.Symbol | string, string>();
    for (const site of allSites) entries.set(symbolOf(site) ?? `global ${site.text}`, site.text);
    const resolved: string[] = [];
    for (const [binding, name] of entries) {
      const declarations = typeof binding === "string" ? [] : (binding.declarations ?? []);
      if (declarations.length === 0) resolved.push(`${name}: global (no binding in the file)`);
      for (const declaration of declarations) resolved.push(`${name}: ${kindOf(declaration)} (${where(declaration)})`);
    }
    resolved.sort();
    /** What a reference does where it stands (an identifier a call holds as no argument is that call's callee). */
    const roleOf = (name: ts.Identifier, binding: ts.Symbol): string => {
      const parent = name.parent;
      if ((binding.declarations ?? []).some(declaration => ts.getNameOfDeclaration(declaration) === name)) return "binding";
      if (ts.isCallExpression(parent) && parent.arguments.some(argument => argument === name)) return `argument of ${squeeze(parent.expression)}`;
      if (ts.isCallExpression(parent)) return "callee";
      if (ts.isNewExpression(parent) && parent.expression === name) return "class of new";
      if (ts.isPropertyAccessExpression(parent) && ts.isCallExpression(parent.parent) && parent.parent.expression === parent) return `receiver of ${parent.name.text}`;
      return `in ${squeeze(parent)}`;
    };
    const group = (named: readonly ts.Identifier[]) => ({ bindings: new Set(named.flatMap(site => symbolOf(site) ?? [])), found: [] as string[] });
    /** The reading's, the receiver's and the class's references, each kept whatever it does. */
    const traced = [readingSites, receiverSites, classSites].map(group);
    /** The callables' references (a reply's callee and each callee a reply is handed), kept unless a declaration or a callee. */
    const callables = group([...replySites, ...handedSites]);
    const follow = (node: ts.Node): void => {
      const binding = ts.isIdentifier(node) ? symbolOf(node) : undefined;
      if (binding !== undefined && ts.isIdentifier(node)) {
        for (const held of [...traced, callables]) {
          if (!held.bindings.has(binding)) continue;
          const role = roleOf(node, binding);
          if (held !== callables || (role !== "binding" && role !== "callee")) held.found.push(`${node.text}: ${role} (${where(node)})`);
        }
      }
      ts.forEachChild(node, follow);
    };
    follow(source);
    const references = [...traced, callables].flatMap(held => held.found);
    const replier = [...new Set(replySites.map(symbolOf))].flatMap(binding => (binding?.declarations ?? []).map(squeeze));
    return { resolved, references, replier };
  };
  let read: { readonly resolved: string[]; readonly references: string[]; readonly replier: string[] } | undefined;
  const bound = () => {
    read ??= readBindings();
    return read;
  };
  return {
    calls,
    bindings,
    replies,
    writes,
    returns,
    mentions,
    get resolved() {
      return bound().resolved;
    },
    get references() {
      return bound().references;
    },
    get replier() {
      return bound().replier;
    },
  };
}
/** textResult's declaration in src/index.ts as S1 reads it (whitespace removed): it returns the text it is handed, unchanged, as
 * its one content item. */
const TEXT_RESULT = 'functiontextResult(msg:string,details?:AgentDetails){return{content:[{type:"text"asconst,text:msg}],details:detailsasany};}';
/** The furnace_observe slice of a src/index.ts text, each piece as written: its import declarations, the module's textResult
 * function, and the functions that enclose the tool's registration (their heads as written), each holding only the next, down to
 * the registration statement. S1's witnesses are planted on it, so each reads one small module rather than the whole file. */
function observeSlice(text: string): string {
  const source = parsed(text);
  const find = (node: ts.Node): ts.Node | undefined =>
    ts.isObjectLiteralExpression(node) &&
    node.properties.some(property => ts.isPropertyAssignment(property) && property.name.getText(source) === "name" && ts.isStringLiteral(property.initializer) && property.initializer.text === "furnace_observe")
      ? node
      : ts.forEachChild(node, find);
  let statement: ts.Node | undefined = find(source);
  while (statement !== undefined && !ts.isExpressionStatement(statement)) statement = statement.parent;
  if (statement === undefined) return "";
  let piece = statement.getText(source);
  for (let up: ts.Node | undefined = statement.parent; up !== undefined; up = up.parent) {
    if (ts.isFunctionDeclaration(up) && up.body !== undefined) piece = `${text.slice(up.getStart(source), up.body.getStart(source) + 1)}\n${piece}\n}`;
  }
  const kept = source.statements.filter(node => ts.isImportDeclaration(node) || (ts.isFunctionDeclaration(node) && node.name?.text === "textResult"));
  return [...kept.map(node => node.getText(source)), piece].join("\n");
}
/** How many object literals in a source name the tool (a `name` property whose value is that string literal), each a place
 * toolBody could read an execute body from. */
function registrations(name: string, text: string): number {
  const source = parsed(text);
  let found = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isObjectLiteralExpression(node) && node.properties.some(property => ts.isPropertyAssignment(property) && property.name.getText(source) === "name" && ts.isStringLiteral(property.initializer) && property.initializer.text === name)) found += 1;
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** A text with each find replaced once; a find that does not stand exactly once throws, so a plant never misses its place. */
function planted(text: string, edits: readonly (readonly [string, string])[]): string {
  let out = text;
  for (const [find, replace] of edits) {
    if (out.split(find).length !== 2) throw new Error(`a plant's anchor must stand exactly once: ${find}`);
    out = out.replace(find, () => replace);
  }
  return out;
}
/** S1's binding readings of a tool body, one line each: its writes, resolved names, followed references and textResult's text. */
function readings(tool: ToolBody | undefined): string[] {
  return [
    ...(tool?.writes ?? []).map(target => `write ${target}`),
    ...(tool?.resolved ?? []).map(entry => `resolved ${entry}`),
    ...(tool?.references ?? []).map(entry => `reference ${entry}`),
    ...(tool?.replier ?? []).map(text => `replier ${text}`),
  ];
}
/** What a planted body reads beyond (+) or no longer reads (-) of a base body's binding readings, line for line, sorted. */
function delta(base: ToolBody | undefined, plant: ToolBody | undefined): string[] {
  const left = readings(base);
  const added: string[] = [];
  for (const line of readings(plant)) {
    const at = left.indexOf(line);
    if (at === -1) added.push(`+${line}`);
    else left.splice(at, 1);
  }
  return [...added, ...left.map(line => `-${line}`)].sort();
}
/** The leaf operands of the `||` chains in the observer's `incomplete` initializer: an operand holding a chain is read through
 * to that chain only (the callback of logs.some contributes its two operands, its callee and parameter nothing). */
function incompleteOperands(): string[] {
  const source = ts.createSourceFile(OBSERVER_SOURCE, readFileSync(join(REPO, OBSERVER_SOURCE), "utf8"), ts.ScriptTarget.Latest, true);
  let initializer: ts.Expression | undefined;
  const find = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "incomplete") initializer = node.initializer;
    ts.forEachChild(node, find);
  };
  find(source);
  const isOr = (node: ts.Node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.BarBarToken;
  const holdsOr = (node: ts.Node): boolean => isOr(node) || (ts.forEachChild(node, child => (holdsOr(child) ? true : undefined)) ?? false);
  const leaves: string[] = [];
  const read = (node: ts.Node): void => {
    if (isOr(node)) {
      read(node.left);
      read(node.right);
    } else if (holdsOr(node)) {
      ts.forEachChild(node, child => {
        if (holdsOr(child)) read(child);
      });
    } else leaves.push(node.getText(source).replace(/\s+/g, ""));
  };
  if (initializer !== undefined) read(initializer);
  return leaves;
}

describe("wb-b04.2 Furnace world-model preservation census (until the records ship)", () => {
  pinned("T1", () => {
    const read = installedRelease();
    expect(read.files.length, "the installed release was read").toBeGreaterThan(0);
    const members = qualified(read.found);
    expect(ANALOGS.filter(member => !members.includes(member)), "the member reader sees every analog the observer reads").toStrictEqual([]);
    expect(findings(read), OWED_RELEASE).toStrictEqual(QUIET);
    const live = read.files.filter(file => file.path.endsWith(".d.ts") && file.text.includes("binary_revision"));
    expect(live.length, "the content reading is live: it finds the release's own binary_revision").toBeGreaterThan(0);
  });

  pinned("T2", () => {
    const planted = release([
      {
        path: "dist/src/world-model.d.ts",
        text: [
          "/** traces for a world model */",
          "export interface FurnaceObservedTransition { source_revision: string; 'capture_completeness': string; redaction_hash?: string }",
          "export type CounterfactualCandidate = { authority: 'none' };",
          "export declare class SyntheticAttemptState { private readonly queue: number }",
        ].join("\n"),
      },
      { path: "README.md", text: "Observed transitions are exported." },
    ]);
    expect(findings(planted)).toStrictEqual({
      records: ["FurnaceObservedTransition", "CounterfactualCandidate", "SyntheticAttemptState"],
      fields: {
        source_revision: ["FurnaceObservedTransition.source_revision"],
        capture_completeness: ["FurnaceObservedTransition.capture_completeness"],
        redaction_hash: ["FurnaceObservedTransition.redaction_hash"],
      },
      spellings: ["dist/src/world-model.d.ts", "README.md"],
    });
    // A comment declares nothing: the same names spelled only in a comment are spellings, never declarations or members.
    const commented = release([{ path: "dist/src/note.d.ts", text: "/** FurnaceObservedTransition.source_revision */ export interface Quiet { id: string }" }]);
    expect(findings(commented)).toStrictEqual({ ...QUIET, spellings: ["dist/src/note.d.ts"] });
    // The heritage shapes a DTO-only reading misses (a type-alias parent, a generic-wrapped parent, a second alias parent with
    // the field nested under an unrelated member): the field is still a member of a named declaration, so it is read.
    const shapes = release([
      {
        path: "dist/src/shapes.d.ts",
        text: [
          "type AttemptRefs = { source_revision?: string };",
          "interface CaptureRefs { capture_completeness: string }",
          "export interface AttemptDto extends AttemptRefs, Partial<CaptureRefs> { attempt_id: string }",
          "type StatusExtra = { readonly detail?: { readonly redaction_hash: string } };",
          "export interface RunStatusDto extends StatusExtra { run_id: string }",
        ].join("\n"),
      },
    ]);
    expect(findings(shapes).fields, "a field behind an alias, a generic wrapper or a nesting is read").toStrictEqual({
      source_revision: ["AttemptRefs.source_revision"],
      capture_completeness: ["CaptureRefs.capture_completeness"],
      redaction_hash: ["StatusExtra.redaction_hash"],
    });
    // The cut #1 refusal's escaped spellings (U2), each read through the AST or the escape-decoded content and never raw.
    const one = (path: string, lines: readonly string[]): Findings => findings(release([{ path, text: lines.join("\n") }]));
    const fields = (field: string, members: readonly string[]): Findings["fields"] => ({ ...QUIET.fields, [field]: members });
    const computed = [`declare const K1: "${escapeAt("source_revision", 6, "four")}";`, "export interface RunDto {", "    [K1]?: string;", "}"];
    expect(one("dist/src/protocol.d.ts", computed), "a computed key over an escaped literal").toStrictEqual({ ...QUIET, spellings: ["dist/src/protocol.d.ts"] });
    const variable = ["export declare const transitionShape: {", `    ${escapeAt("capture_completeness", 7, "four")}: string;`, "};"];
    expect(one("dist/src/protocol.d.ts", variable), "a variable's type literal").toStrictEqual({
      ...QUIET,
      fields: fields("capture_completeness", ["transitionShape.capture_completeness"]),
      spellings: ["dist/src/protocol.d.ts"],
    });
    const fn = ["export declare function readTransition(): {", `    ${escapeAt("redaction_hash", 9, "four")}: string;`, "};"];
    expect(one("dist/src/protocol.d.ts", fn), "a function's type literal").toStrictEqual({
      ...QUIET,
      fields: fields("redaction_hash", ["readTransition.redaction_hash"]),
      spellings: ["dist/src/protocol.d.ts"],
    });
    const mts = [`export interface ${escapeAt("FurnaceObservedTransition", 7, "four")} {`, `    ${escapeAt("source_revision", 6, "four")}: string;`, "}"];
    expect(one("dist/src/trace.d.mts", mts), "a .d.mts declaration of an escaped record").toStrictEqual({
      records: ["FurnaceObservedTransition"],
      fields: fields("source_revision", ["FurnaceObservedTransition.source_revision"]),
      spellings: ["dist/src/trace.d.mts"],
    });
    expect(one("dist/src/trace.d.cts", ["export interface SyntheticAttemptState { readonly queue: number }"]), "a .d.cts declaration").toStrictEqual({
      ...QUIET,
      records: ["SyntheticAttemptState"],
      spellings: ["dist/src/trace.d.cts"],
    });
    const escapes = ["four", "braced", "two"] as const;
    expect(
      escapes.map(form => one("dist/src/index.js", [`export const KEY = "${escapeAt("capture_completeness", 7, form)}";`]).spellings),
      "each escape form in content the AST never declares",
    ).toStrictEqual(escapes.map(() => ["dist/src/index.js"]));
    expect(one("README.md", [`Exports ${escapeAt("world model", 5, "two")} traces.`]).spellings, "and the world-model words").toStrictEqual(["README.md"]);
    // The edge of THE READERS that the cut #2 refusal measured, beside the residual family each bounds. TypeScript cooks a quoted
    // member name, so an identity escape inside a word of it reads as the member while content alone misses it
    // (R-UNDECODED-ESCAPE); between two words an identity escape, a line continuation or a joint holding no letter or digit is
    // part of the run, at value level and at type level (R-UNDECODED-ESCAPE, R-ASSEMBLED, R-COMPUTED); and a plain accessor name
    // is content, never a member.
    expect(one("dist/src/protocol.d.ts", ["export interface TraceRow {", `    "${identityAt("source_revision", 4)}": string;`, "}"]), "a quoted member name holding an identity escape").toStrictEqual({
      ...QUIET,
      fields: fields("source_revision", ["TraceRow.source_revision"]),
    });
    const between: readonly ProbeFile[] = [
      { path: "dist/src/protocol.d.ts", text: `declare const K4: "${continuedAt("source_revision", 7)}";\nexport interface RunDto {\n    [K4]?: string;\n}` },
      { path: "dist/src/index.js", text: `export const KEY = "${identityAt("capture_completeness", 7)}";` },
      { path: "dist/src/index.js", text: `export const KIND = "${identityAt("SyntheticAttemptState", 9)}";` },
      { path: "dist/src/index.js", text: 'export const FIELD_KEY = "source_" + "revision";' },
      { path: "dist/src/computed.d.ts", text: ["type Key = `redaction", '{"_"}hash`; export type Computed = { [K in Key]: string };'].join("$") },
    ];
    expect(
      between.map(file => findings(release([file]))),
      "a line continuation, an identity escape or a joint between two words is read by content",
    ).toStrictEqual(between.map(file => ({ ...QUIET, spellings: [file.path] })));
    expect(one("dist/src/protocol.d.ts", ["export declare class TraceView {", "    get source_revision(): string;", "}"]), "a plain accessor name is content, never a member").toStrictEqual({
      ...QUIET,
      spellings: ["dist/src/protocol.d.ts"],
    });
  });

  pinned("T3", () => {
    const files = srcFiles();
    expect(files.length, "the src tree was read").toBeGreaterThan(0);
    expect(srcSpellings(files, [/workflow-script\/v1/]), "the src reader is live: the schema literal lives in identity.ts only").toStrictEqual(["src/workbench/identity.ts"]);
    expect(srcSpellings(files, SRC_WORDS), OWED_READER).toStrictEqual([]);
    const plants = [
      "const key = 'source_revision';",
      "row.capture_completeness",
      "{ redaction_hash: digest }",
      "type Row = FurnaceObservedTransition;",
      "new CounterfactualCandidate()",
      "SyntheticAttemptState[]",
      // The cut #1 refusal's src plants (U2): an escaped wire name and a *Dto-suffixed record identifier.
      `export const FIELD = "${escapeAt("source_revision", 6, "four")}";`,
      "export interface FurnaceObservedTransitionDto { readonly run_id: string }",
      // A longer snake-case name, a re-cased constant, a prefixed identifier and the other two escape forms.
      "const native_capture_completeness = row.native_capture_completeness;",
      "const REDACTION_HASH = 'x';",
      "interface ISyntheticAttemptState { queue: number }",
      `type Row = ${escapeAt("CounterfactualCandidate", 0, "braced")};`,
      `row["${escapeAt("redaction_hash", 9, "two")}"]`,
    ];
    expect(plants.map(text => srcSpellings([{ path: "src/zz-plant.ts", text }], SRC_WORDS).length), "each planted reader spelling is found").toStrictEqual(plants.map(() => 1));
  });

  pinned("Q1", () => {
    for (const residual of RESIDUALS) expect(residual.probe(), `${residual.id}: ${residual.family}`).toStrictEqual(residual.quiet);
    const witnessed = RESIDUALS.flatMap(residual => (residual.witness !== undefined ? [{ id: residual.id, ...residual.witness }] : []));
    expect(
      witnessed.map(item => item.id),
      "the witnessed residuals",
    ).toStrictEqual(["R-UNDECODED-ESCAPE", "R-ASSEMBLED"]);
    for (const item of witnessed) {
      expect(item.files.map(cookedNames), `${item.id}: TypeScript cooks each probe file to the names it spells`).toStrictEqual(item.spells);
    }
  });

  pinned("J1", () => {
    const identity = "event_ref";
    expect(roundTrip(TRANSITIONS, TRANSITIONS.map(row => ({ ...row })), identity, TRANSITION_FIELDS), "an identity reader passes").toStrictEqual([]);
    for (const field of [...FIELDS, ...ORDERING_REFS.filter(field => field !== identity)]) {
      expect(roundTrip(TRANSITIONS, TRANSITIONS.map(row => omit(row, field)), identity, TRANSITION_FIELDS), `a reader dropping ${field}`).toStrictEqual(
        TRANSITIONS.map(row => `dropped:${String(row[identity])}.${field}`),
      );
    }
    const rewrite = (change: (value: string) => string): Rec[] => TRANSITIONS.map(row => ({ ...row, redaction_hash: change(String(row.redaction_hash)) }));
    const changed = TRANSITIONS.map(row => `changed:${String(row[identity])}.redaction_hash`);
    expect(roundTrip(TRANSITIONS, rewrite(() => ""), identity, TRANSITION_FIELDS), "a reader stripping redaction_hash").toStrictEqual(changed);
    expect(roundTrip(TRANSITIONS, rewrite(value => [...value].reverse().join("")), identity, TRANSITION_FIELDS), "a reader reversing it").toStrictEqual(changed);
    expect(roundTrip(TRANSITIONS, [TRANSITIONS[1], TRANSITIONS[0], TRANSITIONS[2]], identity, TRANSITION_FIELDS), "a reader reordering").toStrictEqual(["reordered"]);
    const retyped = TRANSITIONS.map(row => ({ ...row, exit_status: String(row.exit_status) }));
    expect(roundTrip(TRANSITIONS, retyped, identity, TRANSITION_FIELDS), "a reader retyping exit_status, its text kept").toStrictEqual(
      TRANSITIONS.map(row => `changed:${String(row[identity])}.exit_status`),
    );
    expect(roundTrip(TRANSITIONS, TRANSITIONS.slice(0, 2), identity, ["redaction_hash"]), "a reader discarding a record").toStrictEqual([
      "reordered",
      `dropped:${String(TRANSITIONS[2][identity])}.redaction_hash`,
    ]);
  });

  pinned("R1", () => {
    const value = { transitions: TRANSITIONS };
    expect(sanitizeWorkbenchJsonText(value), "the reply is byte-identical to the records it presents").toBe(JSON.stringify(value));
    const presented = listAt(replyOf(value), "transitions");
    expect(roundTrip(TRANSITIONS, presented, "event_ref", TRANSITION_FIELDS), "every field of every record survives, in order").toStrictEqual([]);
    expect(presented.map(row => (isRec(row) ? Object.keys(row) : [])), "each record keeps its key order").toStrictEqual(TRANSITIONS.map(row => Object.keys(row)));
    const textFields = TRANSITION_FIELDS.filter(field => typeof TRANSITIONS[0][field] === "string");
    expect(TRANSITION_FIELDS.filter(field => !textFields.includes(field)), "every proposed field but exit_status carries text").toStrictEqual(["exit_status"]);
    for (const field of textFields) {
      const identity = field === "event_ref" ? "before_ref" : "event_ref";
      const others = TRANSITION_FIELDS.filter(other => other !== field);
      for (const entry of [...CORPUS, ...HELD]) {
        const handed = [{ ...TRANSITIONS[0], [field]: entry.line }];
        const shown = listAt(replyOf({ transitions: handed }), "transitions");
        expect(roundTrip(handed, shown, identity, others), `${field} <- ${entry.line}: every other field survives`).toStrictEqual([]);
        expect(shown.map(row => (isRec(row) ? row[field] : undefined)), `${field} <- ${entry.line}: the text stays or becomes redacted`).toStrictEqual([entry.shown]);
        expect(JSON.stringify(shown).includes(FAKE), `${field} <- ${entry.line}: no fake value reaches the reply`).toBe(false);
      }
    }
  });

  describe("the observer at a fixed clock", () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ["Date"] });
      vi.setSystemTime(new Date(CLOCK));
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    pinned("O1", async () => {
      const every = <T>(value: T, count: number): T[] => Array.from({ length: count }, () => value);
      // The label reader is live: one label changed on each surface shows at its own position, the reply's read from its text.
      const out = await outputs(BASE);
      const doctored: Outputs = {
        ...out,
        snapshot: { ...out.snapshot, coverage: "unknown" },
        topology: { ...out.topology, snapshots: out.topology.snapshots.map((item, index) => (index === 2 ? { ...item, coverage: "partial" } : item)) },
        nodes: out.nodes.map((node, index) => (index === 3 ? { ...node, completeness: "unknown" } : node)),
        reply: out.reply.replace('"completeness":"complete"', '"completeness":"partial"'),
      };
      expect(completenessOf(doctored), "the label reader reads every surface").toStrictEqual([
        "complete",
        "unknown",
        "complete",
        "complete",
        "partial",
        "complete",
        "complete",
        "complete",
        "complete",
        "unknown",
        "partial",
      ]);
      for (const state of STATES) {
        const at = await outputs(inState(BASE, state));
        expect([at.reading.run.state, at.reading.source.producerVersion, at.reading.source.producerRevision], `${state}: the reading names the producer version and revision`).toStrictEqual([
          state,
          VERSION,
          REVISION,
        ]);
        expect([at.snapshot.sourceRevision, ...at.topology.snapshots.map(item => item.sourceRevision)], `${state}: every snapshot carries the revision`).toStrictEqual(every(REVISION, 5));
        expect(at.nodes.map(node => node.sourceVersion), `${state}: every projected node carries it`).toStrictEqual(every(REVISION, 4));
        expect(completenessOf(at), `${state}: a complete read is complete everywhere`).toStrictEqual(every("complete", 11));
        expect(at.reading.attempts.items.map(item => [item.id, item.ordinal]), `${state}: the items keep the page order`).toStrictEqual(PAGE.map(item => [item.attempt_id, item.ordinal]));
        expect(at.topology.snapshots.slice(1).map(item => item.source.id), `${state}: so do the Attempt snapshots`).toStrictEqual(PAGE_IDS);
        expect(at.topology.relations.map(relation => [relation.kind, relation.to.id]), `${state}: and the edges, ownership only`).toStrictEqual(PAGE_IDS.map(id => ["ownership", id]));
        expect([at.snapshot.evidenceRefs, at.order], `${state}: and the evidence refs and the projected Attempt nodes`).toStrictEqual([PAGE_IDS, PAGE_IDS]);
        expect(at.reply, `${state}: the reply is the reading, byte for byte`).toBe(JSON.stringify(at.reading));
        for (const fact of INCOMPLETE) {
          const partial = await outputs(fact.plant(inState(BASE, state)));
          expect(completenessOf(partial), `${state} ${fact.id}: partial everywhere`).toStrictEqual(every("partial", 11));
          expect(partial.reply, `${state} ${fact.id}: the reply is the reading`).toBe(JSON.stringify(partial.reading));
        }
        const { binary_revision, ...unrevised } = inState(BASE, state).status;
        expect(binary_revision, `${state}: the base carries the revision the unrevised fixture drops`).toBe(REVISION);
        const bare = await outputs({ ...BASE, status: unrevised });
        const stated = [bare.reading.source.producerRevision, bare.snapshot.sourceRevision, ...bare.topology.snapshots.map(item => item.sourceRevision), ...bare.nodes.map(node => node.sourceVersion)];
        expect(stated, `${state}: an absent revision is stated nowhere`).toStrictEqual(every(undefined, 10));
        expect(bare.reply.includes(REVISION), `${state}: nor in the reply`).toBe(false);
      }
    });

    pinned("O2", async () => {
      for (const state of STATES) {
        for (const fact of [undefined, ...INCOMPLETE]) {
          // The complete read, then each one INCOMPLETE fact planted on the same RunState.
          const at = (fixture: Fixture): Fixture => (fact === undefined ? inState(fixture, state) : fact.plant(inState(fixture, state)));
          const label = fact === undefined ? `${state} complete` : `${state} ${fact.id}`;
          const base = await outputs(at(BASE));
          const planted = await outputs(at(PLANTED));
          expect(planted, `${label}: unpublished, secret-bearing and log-line plants change no output`).toStrictEqual(base);
          const text = JSON.stringify(planted);
          expect(PLANT_MARKS.filter(mark => text.includes(mark)), `${label}: and reach none`).toStrictEqual([]);
          const log = at(BASE).log;
          expect(planted.reading.logs, `${label}: the reading keeps only the log read's counts and flags`).toStrictEqual([
            { attemptId: PAGE_IDS[2], stream: "stdout", complete: log.complete, lossy: log.lossy, returned: LOG_LINES.length, nextCursor: null },
          ]);
        }
      }
    });
  });

  pinned("E1", async () => {
    const lines = ["step 1 done", ...HELD.map(entry => entry.line), ...CORPUS.map(entry => entry.line)];
    for (const stream of STREAMS) {
      const content = await readFurnaceAttemptLogEvidence({
        client: { logs: { read: async () => respond("logs_read", "req-evidence-wm", { ...LOG, stream, lines, returned: lines.length }) } },
        runId: RUN_ID,
        workspaceRoot: WORKSPACE,
        owningRunNode: { nativeRef: { provider: "furnace", type: "run", id: RUN_ID, scope: WORKSPACE }, evidenceRefs: PAGE_IDS },
        attemptId: PAGE_IDS[2],
        stream,
        maxBytes: 512,
        maxLines: 50,
        timeoutMs: 2000,
        signal: new AbortController().signal,
        capturedAt: () => CLOCK,
      });
      expect(content.preview, `${stream}: a HELD line stays redacted and a corpus line is redacted`).toStrictEqual([
        "step 1 done",
        ...HELD.map(entry => entry.shown),
        ...CORPUS.map(entry => entry.shown),
      ]);
      expect(content.preview.filter(row => row !== "step 1 done" && !row.includes(MARKER)), `${stream}: every corpus row shows the marker`).toStrictEqual([]);
      expect([content.lineCount, content.truncated], `${stream}: every line is shown and counted`).toStrictEqual([lines.length, false]);
      expect(JSON.stringify(content).includes(FAKE), `${stream}: no fake value reaches the evidence`).toBe(false);
    }
  });

  pinned("S1", () => {
    const tool = toolBody("furnace_observe");
    expect(tool, "src/index.ts registers furnace_observe with an execute body").toBeDefined();
    expect(tool?.bindings.filter(binding => binding.startsWith("reading=")), "the reading is the observer's snapshot").toStrictEqual(["reading=awaitobserver.snapshot()"]);
    expect(tool?.bindings.filter(binding => binding.startsWith("observer=")).map(binding => binding.slice(0, "observer=newFurnaceObserver(".length))).toStrictEqual([
      "observer=newFurnaceObserver(",
    ]);
    expect(tool?.calls.filter(call => call.startsWith("projection.refresh(")), "the projection gets that reading's Run snapshot").toStrictEqual([
      "projection.refresh(observer.projectionSnapshot(reading))",
    ]);
    expect(tool?.calls.filter(call => call.startsWith("textResult(") && call.includes("reading")), "the reply is that reading through the sanitizer").toStrictEqual([
      "textResult(sanitizeWorkbenchJsonText(reading))",
    ]);
    expect(tool?.replies, "its replies: two literal refusals, the sanitized reading and the sanitized error text").toStrictEqual([
      'textResult("<literal>")',
      'textResult("<literal>")',
      "textResult(sanitizeWorkbenchJsonText(reading))",
      "textResult(sanitizeWorkbenchText(...))",
    ]);
    expect(tool?.calls.filter(call => /\breading\b/.test(call)), "the reading reaches no call but its Run snapshot and its sanitized reply").toStrictEqual([
      "projection.refresh(observer.projectionSnapshot(reading))",
      "observer.projectionSnapshot(reading)",
      "textResult(sanitizeWorkbenchJsonText(reading))",
      "sanitizeWorkbenchJsonText(reading)",
    ]);
    expect(tool?.writes.filter(target => /^reading\b/.test(target)), "and nothing writes any of it").toStrictEqual([]);
    expect(tool?.mentions, "the body names the reading only where it binds it and as those two calls' argument").toStrictEqual([
      "binding",
      "argument of observer.projectionSnapshot",
      "argument of sanitizeWorkbenchJsonText",
    ]);
    expect(tool?.returns, "and every return is one of its four textResult replies").toStrictEqual([
      'textResult("<literal>")',
      'textResult("<literal>")',
      "textResult(sanitizeWorkbenchJsonText(reading))",
      "textResult(sanitizeWorkbenchText(...))",
    ]);
    expect(toolBody("zz-no-such-tool"), "the reader finds no body for an unregistered name").toBeUndefined();
    expect(toolBody("workflow_observe")?.calls.length ?? 0, "and finds another tool's body").toBeGreaterThan(0);
    // The reply, reading-call and write readers are live on a planted body.
    const plant = toolBody(
      "zz-plant",
      'tools.push({ name: "zz-plant", execute: async () => { reading.native = 1; delete reading.extra; reading.count++; Object.assign(reading, {}); return textResult(JSON.stringify(reading)); } });',
    );
    expect([plant?.replies, plant?.writes, plant?.calls.filter(call => /\breading\b/.test(call))], "a planted body's replies, writes and reading calls are read").toStrictEqual([
      ["textResult(JSON.stringify(reading))"],
      ["reading.native", "reading.extra", "reading.count"],
      ["Object.assign(reading,{})", "textResult(JSON.stringify(reading))", "JSON.stringify(reading)"],
    ]);
    // The mention and return readers are live on the cut #2 refusal's alias and loop-variable writes and two other returns.
    const aliased = toolBody(
      "zz-alias",
      'tools.push({ name: "zz-alias", execute: async () => { const view = reading; Object.assign(view, {}); for (const item of reading.attempts.items) item.ordinal = 0; if (view) return { content: view }; return; } });',
    );
    expect([aliased?.mentions, aliased?.returns], "an alias, a loop variable, a bare return and a non-textResult return are read").toStrictEqual([
      ["in view=reading", "in reading.attempts"],
      ["{content:view}", "<none>"],
    ]);
    // Each form the write, call, mention and reply readers' docs state, live on a planted body: a declared loop variable is no
    // write while its member assignment is one, and a called reading and a bare reply argument read as written.
    expect(aliased?.writes, "a declared loop variable is no write, and its member assignment is one").toStrictEqual(["item.ordinal"]);
    const called = toolBody("zz-called", 'tools.push({ name: "zz-called", execute: async () => { reading(); return textResult(reading); } });');
    expect([called?.mentions, called?.replies], "a called reading is in its call, and a bare reply argument reads as written").toStrictEqual([
      ["in reading()", "argument of textResult"],
      ["textResult(reading)"],
    ]);
    expect(tool?.calls.filter(call => call.startsWith("new")).map(call => call.slice(0, call.indexOf("(") + 1)), "its new expressions build the Furnace client and the FurnaceObserver").toStrictEqual([
      "newFurnace(",
      "newFurnaceObserver(",
    ]);
    expect(tool?.writes, "and the body writes nothing at all: no assignment, increment, decrement, delete, for-of or for-in target").toStrictEqual([]);
    // The binding reader (landing 668 F3; the wb-40zp refusals #1 and #2): every name the body's data path calls through, resolved
    // as the TypeScript checker binds src/index.ts alone, is one declaration; the reading, its receiver and the receiver's class are
    // referenced only where the data path uses them; textResult and the two sanitizers are referenced only as their declarations
    // and the callees of calls; and textResult hands its text on.
    expect(tool?.resolved, "the data path resolves to the module's textResult, its redaction.ts and furnace-observer.ts imports and two body consts").toStrictEqual([
      'FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
      "observer: const (body)",
      "reading: const (body)",
      'sanitizeWorkbenchJsonText: import sanitizeWorkbenchJsonText from "./workbench/redaction.js" (module)',
      'sanitizeWorkbenchText: import sanitizeWorkbenchText from "./workbench/redaction.js" (module)',
      "textResult: FunctionDeclaration (module)",
    ]);
    expect(tool?.references, "the reading, its receiver and its class are referenced nowhere else in src/index.ts, and the callables only as callees").toStrictEqual([
      "reading: binding (body)",
      "reading: argument of observer.projectionSnapshot (body)",
      "reading: argument of sanitizeWorkbenchJsonText (body)",
      "observer: binding (body)",
      "observer: receiver of snapshot (body)",
      "observer: receiver of projectionSnapshot (body)",
      "observer: receiver of close (body)",
      "FurnaceObserver: binding (module)",
      "FurnaceObserver: class of new (body)",
    ]);
    expect(tool?.replier, "textResult returns the text it is handed as its one content item, unchanged").toStrictEqual([TEXT_RESULT]);
    // Live on the landing-668 gate's G8-S1-SANITIZER-SHADOW, rebuilt on the real source: a body-local sanitizer bound before the
    // reading is the binding the reply's sanitizer resolves to.
    const index = readFileSync(join(REPO, INDEX_SOURCE), "utf8");
    const anchor = "const reading = await observer.snapshot();";
    expect(index.split(anchor).length, "the shadow plant's anchor stands once in src/index.ts").toBe(2);
    const shadowed = toolBody("furnace_observe", index.replace(anchor, `const sanitizeWorkbenchJsonText = (value: unknown): string => JSON.stringify(value);\n          ${anchor}`));
    expect(delta(tool, shadowed), "a body-local sanitizer is the binding the reply resolves to").toStrictEqual([
      "+resolved sanitizeWorkbenchJsonText: const (body)",
      '-resolved sanitizeWorkbenchJsonText: import sanitizeWorkbenchJsonText from "./workbench/redaction.js" (module)',
    ]);
    // The refusals' witnesses (G24-S1-* from refusal #1, GP15-* from refusal #2, as their PREPs planted them) and this census's
    // own members of the class, rebuilt on the furnace_observe slice of src/index.ts, which reads as the whole file does; each
    // with exactly what it changes in S1's binding readings (+ read beyond the slice, - no longer read).
    const slice = observeSlice(index);
    const base = toolBody("furnace_observe", slice);
    expect(readings(base), "the furnace_observe slice reads as src/index.ts does").toStrictEqual(readings(tool));
    const TRY = "        try {";
    const READING = "          const reading = await observer.snapshot();";
    const REFRESH = "          projection.refresh(observer.projectionSnapshot(reading));";
    const REPLY = "          return textResult(sanitizeWorkbenchJsonText(reading));";
    const CLOSE = "observer.close();";
    const SCOPE = "        const scope = observerScope(ctx);";
    const BUILT = "const observer = new FurnaceObserver(client, {";
    const RETURN = '  return { content: [{ type: "text" as const, text: msg }], details: details as any };';
    const HEAD = "function textResult(msg: string, details?: AgentDetails) {";
    const REGISTRATION = 'pi.registerTool(defineTool({\n      name: "furnace_observe",';
    const IMPORT = 'import { FurnaceObserver } from "./workbench/furnace-observer.js";';
    const FAKE = `(msg: string) => ({ content: [{ type: "text" as const, text: msg.replaceAll('"partial"', '"complete"') }], details: undefined })`;
    const STAND_IN = '{ snapshot: async () => ({ ...(await real.snapshot()), completeness: "complete" as const }), projectionSnapshot: real.projectionSnapshot.bind(real) }';
    const atModule = (code: string): readonly [string, string] => ["\nexport default function (", `\n${code}\nexport default function (`];
    const inBody = (code: string): readonly [string, string] => [TRY, `        ${code}\n${TRY}`];
    const beforeClient = (code: string): readonly [string, string] => [SCOPE, `        ${code}\n${SCOPE}`];
    expect(registrations("furnace_observe", index), "src/index.ts names furnace_observe in one object literal, the registration S1 reads").toBe(1);
    expect(registrations("furnace_observe", planted(slice, [["\nexport default function (", '\nexport const zzTools = [{ name: "furnace_observe", execute: async () => textResult("{}") }];\nexport default function (']])), "and a second literal naming it is counted").toBe(2);
    expect(() => planted(slice, [["zz-no-such-anchor", ""]]), "a plant whose anchor does not stand exactly once is refused").toThrow("a plant's anchor must stand exactly once: zz-no-such-anchor");
    const witnesses: readonly (readonly [string, readonly (readonly [string, string])[]])[] = [
      // Refusal #1 U1: a write of textResult or the sanitizer through an as, angle-bracket, satisfies, instantiation or non-null
      // wrapper, at module scope or in the body, as an assignment (compound and logical included), increment, decrement, for-of or
      // destructuring-assignment target: each is a reference that is no callee.
      ["G24-S1-WRITE-AS-MODULE", [atModule(`(textResult as unknown) = ${FAKE};`)]],
      ["G24-S1-WRITE-ANGLE-MODULE", [atModule(`(<unknown>textResult) = ${FAKE};`)]],
      ["G24-S1-WRITE-AS-BODY", [inBody(`(textResult as unknown) = ${FAKE};`)]],
      ["G24-S1-WRITE-FOROF-AS", [atModule(`for ((textResult as unknown) of [${FAKE}]) break;`)]],
      ["G24-S1-WRITE-DESTRUCT-AS", [atModule(`({ zz: (textResult as unknown) } = { zz: ${FAKE} });`)]],
      ["G24-S1-WRITE-NONNULL-MODULE", [atModule(`textResult! = ${FAKE} as typeof textResult;`)]],
      ["G24-S1-WRITE-AS-SANITIZER", [atModule("(sanitizeWorkbenchJsonText as unknown) = (value: unknown): string => JSON.stringify(value);")]],
      ["S1-WRITE-SATISFIES-MODULE", [atModule(`(textResult satisfies unknown) = ${FAKE};`)]],
      ["S1-WRITE-INSTANTIATION-MODULE", [atModule(`(textResult<never>) = ${FAKE};`)]],
      ["G24-S1-WRITE-LOGICAL-CTRL", [atModule(`(textResult as unknown) ??= 0;\ntextResult ||= ${FAKE} as typeof textResult;`)]],
      ["S1-WRITE-INCREMENT-AS", [atModule("(textResult as unknown as number)++;")]],
      ["S1-WRITE-DECREMENT-NONNULL", [atModule("--textResult!;")]],
      // Refusal #2 U2, the file's write forms: a for-in target, an array-pattern name, an array rest, an object rest, a default and
      // a shorthand default, each a reference that is no callee.
      ["GP15-W-FORIN-MODULE", [atModule("for ((textResult as any) in { zz: 0 }) break;")]],
      ["GP15-W-ARRAY-MODULE", [atModule(`[(textResult as unknown)] = [${FAKE}];`)]],
      ["GP15-W-ARRREST-MODULE", [atModule(`[...(textResult as unknown)] = [${FAKE}];`)]],
      ["GP15-W-OBJREST-ANY-MODULE", [atModule("({ ...(textResult as any) } = {});")]],
      ["GP15-W-DEFAULT-MODULE", [atModule(`({ zz: (textResult as unknown) = ${FAKE} } = {});`)]],
      ["GP15-W-SHORTHAND-DEFAULT-MODULE", [atModule(`({ textResult = ${FAKE} as typeof textResult } = {});`)]],
      // Refusal #2 U2, the body's write forms (the body's write reader): a for-in target, a decrement and a compound assignment, and
      // this census's prefix increment and destructuring assignment.
      ["GP15-W-FORIN-BODY", [beforeClient('for (params.runId in { "frn-run-zz": 0 }) break;')]],
      ["GP15-W-DECREMENT-BODY", [beforeClient("let zzBudget = 1;\n        zzBudget--;")]],
      ["GP15-W-COMPOUND-BODY-X", [beforeClient('params.runId += "-zz";')]],
      ["S1-W-PREFIX-INCREMENT-BODY", [beforeClient("let zzBudget = 1;\n        ++zzBudget;")]],
      ["S1-W-DESTRUCT-BODY", [beforeClient('({ runId: params.runId } = { runId: "frn-run-zz" });')]],
      // Refusal #2 U3: an export specifier is read as the local binding it exports (once, under a rename or none), for the class and
      // for textResult.
      ["GP15-EXPORT-SPEC", [atModule("export { FurnaceObserver };")]],
      ["GP15-EXPORT-SPEC-AS-CTRL", [atModule("export { FurnaceObserver as ZzObserver };")]],
      ["S1-EXPORT-SPEC-SELF-ALIAS", [atModule("export { FurnaceObserver as FurnaceObserver };")]],
      ["S1-EXPORT-SPEC-TEXTRESULT", [atModule("export { textResult };")]],
      // This census's members of the reference reader: a callable as a shorthand default's value and handed on as an argument, and
      // the receiver's property handed on and the receiver as a new expression's argument (none a callee or a method's receiver).
      ["S1-SHORTHAND-DEFAULT-VALUE", [atModule("let zzValue: unknown;\n({ zzValue = textResult } = {});")]],
      ["S1-HANDED-AS-ARGUMENT", [atModule("void Promise.resolve(textResult);")]],
      ["S1-RECV-PROPERTY-HANDED", [inBody("void String(observer.snapshot);")]],
      ["S1-RECV-NEW-ARGUMENT", [inBody("void new WeakRef(observer);")]],
      // Refusal #1 U2: the reading's receiver shadowed in the try block, destructured or declared and then assigned, and the plain
      // control.
      ["G24-S1-RECV-DESTRUCT-SHADOW", [[TRY, `        const real = observer;\n${TRY}\n          const { observer } = { observer: ${STAND_IN} };`]]],
      ["G24-S1-RECV-LET-SHADOW", [[TRY, `        const real = observer;\n${TRY}\n          let observer: Pick<FurnaceObserver, "snapshot" | "projectionSnapshot">;\n          observer = ${STAND_IN};`]]],
      ["G24-S1-RECV-CONST-SHADOW-CTRL", [[TRY, `        const real = observer;\n${TRY}\n          const observer = ${STAND_IN};`]]],
      // This census's members of the site reader: a reply handed a second call, a reply handed a member call, and readings and
      // receivers whose one declaration is no plain `[await] <receiver>.<method>(...)` or `new <Class>(...)` variable.
      ["S1-REPLY-SECOND-ARGUMENT", [[REPLY, "          return textResult(sanitizeWorkbenchJsonText(reading), zzDetails(reading));"]]],
      ["S1-REPLY-MEMBER-CALLEE", [[REPLY, "          return textResult(JSON.stringify(reading));"]]],
      ["S1-READING-AS-NONCALL", [[READING, "          const reading = observer.snapshot as never;"]]],
      ["S1-READING-PAREN-RECEIVER", [[READING, "          const reading = await (observer).snapshot();"]]],
      ["S1-READING-PAREN-INIT", [[READING, "          const reading = (await observer.snapshot());"]]],
      ["S1-READING-DESTRUCT-DEFAULT", [[READING, "          const { reading = await observer.snapshot() } = {};"]]],
      ["S1-READING-AWAIT-USING", [[READING, "          await using reading = await observer.snapshot();"]]],
      ["S1-RECV-FROM-CALL", [[BUILT, "const observer = zzBuild(client, {"]]],
      ["S1-RECV-NEW-PAREN-CLASS", [[BUILT, "const observer = new (FurnaceObserver)(client, {"]]],
      // Refusal #1 U3: textResult's own body edited, the receiver's method swapped in the body (also through a for-of target),
      // FurnaceObserver's prototype patched at module scope, and the body-write control.
      ["G24-S1-TEXTRESULT-BODY", [[RETURN, RETURN.replace("text: msg", `text: msg.replaceAll('"partial"', '"complete"')`)]]],
      ["G24-S1-METHOD-SWAP", [inBody('observer.snapshot = async () => ({ ...(await FurnaceObserver.prototype.snapshot.call(observer)), completeness: "complete" as const });')]],
      ["S1-METHOD-SWAP-FOROF", [inBody('for (observer.snapshot of [async () => ({ ...(await FurnaceObserver.prototype.snapshot.call(observer)), completeness: "complete" as const })]) break;')]],
      ["G24-S1-PROTO-PATCH", [atModule('const zzSnapshot = FurnaceObserver.prototype.snapshot;\nFurnaceObserver.prototype.snapshot = async function (this: FurnaceObserver) { return { ...(await zzSnapshot.call(this)), completeness: "complete" as const }; };')]],
      ["G24-S1-METHOD-SWAP-CTRL", [[REFRESH, `          reading.completeness = "complete";\n${REFRESH}`]]],
      // Cut #2's members: the reading's binding moved into an inner block while a module const of the same name is replied, the
      // reading declared twice (no receiver is read from a binding with two declarations), textResult shadowed in the function
      // that encloses the registration, and an overload of textResult.
      ["S1-READING-BLOCK-SHADOW", [atModule('const reading = { completeness: "complete" as const };'), [READING, `          {\n${READING}`], [REFRESH, `${REFRESH}\n          }`]]],
      ["S1-READING-REDECLARED", [[READING, `          var reading = await observer.snapshot();\n          var reading = await observer.snapshot();`]]],
      ["S1-ENCLOSING-SHADOW", [[REGISTRATION, `const textResult = (msg: string) => ({ content: [{ type: "text" as const, text: msg }], details: undefined });\n    ${REGISTRATION}`]]],
      ["G24-S1-DECL-OVERLOAD", [[HEAD, `function textResult(msg: string, details?: AgentDetails): { content: { type: "text"; text: string }[]; details: any };\n${HEAD}`]]],
      // A same-named binding that shadows nothing is no binding of the data path, so it reads nothing (each is equivalent).
      ["G24-S1-DECL-STATIC-BLOCK", [atModule("export class ZzStatic { static { const FurnaceObserver = 1; void FurnaceObserver; } }")]],
      ["G24-S1-DECL-GLOBAL", [atModule("declare global { var sanitizeWorkbenchJsonText: (value: unknown) => string; }")]],
    ];
    expect(
      witnesses.map(([id, edits]) => [id, delta(base, toolBody("furnace_observe", planted(slice, edits)))]),
      "each witness changes exactly the readings it names",
    ).toStrictEqual([
      ["G24-S1-WRITE-AS-MODULE", ["+reference textResult: in textResultasunknown (module)"]],
      ["G24-S1-WRITE-ANGLE-MODULE", ["+reference textResult: in <unknown>textResult (module)"]],
      [
        "G24-S1-WRITE-AS-BODY",
        [
          "+reference textResult: in textResultasunknown (body)",
          "+write (textResultasunknown)",
        ],
      ],
      ["G24-S1-WRITE-FOROF-AS", ["+reference textResult: in textResultasunknown (module)"]],
      ["G24-S1-WRITE-DESTRUCT-AS", ["+reference textResult: in textResultasunknown (module)"]],
      [
        "G24-S1-WRITE-NONNULL-MODULE",
        [
          "+reference textResult: in textResult! (module)",
          "+reference textResult: in typeoftextResult (nested)",
        ],
      ],
      ["G24-S1-WRITE-AS-SANITIZER", ["+reference sanitizeWorkbenchJsonText: in sanitizeWorkbenchJsonTextasunknown (module)"]],
      ["S1-WRITE-SATISFIES-MODULE", ["+reference textResult: in textResultsatisfiesunknown (module)"]],
      ["S1-WRITE-INSTANTIATION-MODULE", ["+reference textResult: in textResult<never> (module)"]],
      [
        "G24-S1-WRITE-LOGICAL-CTRL",
        [
          "+reference textResult: in textResultasunknown (module)",
          `+reference textResult: in textResult||=(msg:string)=>({content:[{type:"text"asconst,text:msg.replaceAll('"partial"','"complete"')}],details:undefined})astypeoftextResult (module)`,
          "+reference textResult: in typeoftextResult (nested)",
        ],
      ],
      ["S1-WRITE-INCREMENT-AS", ["+reference textResult: in textResultasunknown (module)"]],
      ["S1-WRITE-DECREMENT-NONNULL", ["+reference textResult: in textResult! (module)"]],
      ["GP15-W-FORIN-MODULE", ["+reference textResult: in textResultasany (module)"]],
      ["GP15-W-ARRAY-MODULE", ["+reference textResult: in textResultasunknown (module)"]],
      ["GP15-W-ARRREST-MODULE", ["+reference textResult: in textResultasunknown (module)"]],
      ["GP15-W-OBJREST-ANY-MODULE", ["+reference textResult: in textResultasany (module)"]],
      ["GP15-W-DEFAULT-MODULE", ["+reference textResult: in textResultasunknown (module)"]],
      [
        "GP15-W-SHORTHAND-DEFAULT-MODULE",
        [
          `+reference textResult: in textResult=(msg:string)=>({content:[{type:"text"asconst,text:msg.replaceAll('"partial"','"complete"')}],details:undefined})astypeoftextResult (module)`,
          "+reference textResult: in typeoftextResult (nested)",
        ],
      ],
      ["GP15-W-FORIN-BODY", ["+write params.runId"]],
      ["GP15-W-DECREMENT-BODY", ["+write zzBudget"]],
      ["GP15-W-COMPOUND-BODY-X", ["+write params.runId"]],
      ["S1-W-PREFIX-INCREMENT-BODY", ["+write zzBudget"]],
      ["S1-W-DESTRUCT-BODY", ["+write {runId:params.runId}"]],
      ["GP15-EXPORT-SPEC", ["+reference FurnaceObserver: in FurnaceObserver (module)"]],
      ["GP15-EXPORT-SPEC-AS-CTRL", ["+reference FurnaceObserver: in FurnaceObserverasZzObserver (module)"]],
      ["S1-EXPORT-SPEC-SELF-ALIAS", ["+reference FurnaceObserver: in FurnaceObserverasFurnaceObserver (module)"]],
      ["S1-EXPORT-SPEC-TEXTRESULT", ["+reference textResult: in textResult (module)"]],
      ["S1-SHORTHAND-DEFAULT-VALUE", ["+reference textResult: in zzValue=textResult (module)"]],
      ["S1-HANDED-AS-ARGUMENT", ["+reference textResult: argument of Promise.resolve (module)"]],
      ["S1-RECV-PROPERTY-HANDED", ["+reference observer: in observer.snapshot (body)"]],
      ["S1-RECV-NEW-ARGUMENT", ["+reference observer: in newWeakRef(observer) (body)"]],
      [
        "G24-S1-RECV-DESTRUCT-SHADOW",
        [
          "+resolved observer: BindingElement (body)",
          "-reference FurnaceObserver: binding (module)",
          "-reference FurnaceObserver: class of new (body)",
          "-reference observer: receiver of close (body)",
          '-resolved FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
          "-resolved observer: const (body)",
        ],
      ],
      [
        "G24-S1-RECV-LET-SHADOW",
        [
          '+reference observer: in observer={snapshot:async()=>({...(awaitreal.snapshot()),completeness:"complete"asconst}),projectionSnapshot:real.projectionSnapshot.bind(real)} (body)',
          "+resolved observer: let (body)",
          "+write observer",
          "-reference FurnaceObserver: binding (module)",
          "-reference FurnaceObserver: class of new (body)",
          "-reference observer: receiver of close (body)",
          '-resolved FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
          "-resolved observer: const (body)",
        ],
      ],
      [
        "G24-S1-RECV-CONST-SHADOW-CTRL",
        [
          "-reference FurnaceObserver: binding (module)",
          "-reference FurnaceObserver: class of new (body)",
          "-reference observer: receiver of close (body)",
          '-resolved FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
        ],
      ],
      [
        "S1-REPLY-SECOND-ARGUMENT",
        [
          "+reference reading: argument of zzDetails (body)",
          "+resolved zzDetails: global (no binding in the file)",
        ],
      ],
      [
        "S1-REPLY-MEMBER-CALLEE",
        [
          "+reference reading: argument of JSON.stringify (body)",
          "-reference reading: argument of sanitizeWorkbenchJsonText (body)",
          '-resolved sanitizeWorkbenchJsonText: import sanitizeWorkbenchJsonText from "./workbench/redaction.js" (module)',
        ],
      ],
      [
        "S1-READING-AS-NONCALL",
        [
          "-reference FurnaceObserver: binding (module)",
          "-reference FurnaceObserver: class of new (body)",
          "-reference observer: binding (body)",
          "-reference observer: receiver of close (body)",
          "-reference observer: receiver of projectionSnapshot (body)",
          "-reference observer: receiver of snapshot (body)",
          '-resolved FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
          "-resolved observer: const (body)",
        ],
      ],
      [
        "S1-READING-PAREN-RECEIVER",
        [
          "-reference FurnaceObserver: binding (module)",
          "-reference FurnaceObserver: class of new (body)",
          "-reference observer: binding (body)",
          "-reference observer: receiver of close (body)",
          "-reference observer: receiver of projectionSnapshot (body)",
          "-reference observer: receiver of snapshot (body)",
          '-resolved FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
          "-resolved observer: const (body)",
        ],
      ],
      [
        "S1-READING-PAREN-INIT",
        [
          "-reference FurnaceObserver: binding (module)",
          "-reference FurnaceObserver: class of new (body)",
          "-reference observer: binding (body)",
          "-reference observer: receiver of close (body)",
          "-reference observer: receiver of projectionSnapshot (body)",
          "-reference observer: receiver of snapshot (body)",
          '-resolved FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
          "-resolved observer: const (body)",
        ],
      ],
      [
        "S1-READING-DESTRUCT-DEFAULT",
        [
          "+resolved reading: BindingElement (body)",
          "-reference FurnaceObserver: binding (module)",
          "-reference FurnaceObserver: class of new (body)",
          "-reference observer: binding (body)",
          "-reference observer: receiver of close (body)",
          "-reference observer: receiver of projectionSnapshot (body)",
          "-reference observer: receiver of snapshot (body)",
          '-resolved FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
          "-resolved observer: const (body)",
          "-resolved reading: const (body)",
        ],
      ],
      [
        "S1-READING-AWAIT-USING",
        [
          "+resolved reading: await using (body)",
          "-resolved reading: const (body)",
        ],
      ],
      [
        "S1-RECV-FROM-CALL",
        [
          "-reference FurnaceObserver: binding (module)",
          "-reference FurnaceObserver: class of new (body)",
          '-resolved FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
        ],
      ],
      [
        "S1-RECV-NEW-PAREN-CLASS",
        [
          "-reference FurnaceObserver: binding (module)",
          "-reference FurnaceObserver: class of new (body)",
          '-resolved FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
        ],
      ],
      [
        "G24-S1-TEXTRESULT-BODY",
        [
          `+replier functiontextResult(msg:string,details?:AgentDetails){return{content:[{type:"text"asconst,text:msg.replaceAll('"partial"','"complete"')}],details:detailsasany};}`,
          '-replier functiontextResult(msg:string,details?:AgentDetails){return{content:[{type:"text"asconst,text:msg}],details:detailsasany};}',
        ],
      ],
      [
        "G24-S1-METHOD-SWAP",
        [
          "+reference FurnaceObserver: in FurnaceObserver.prototype (body)",
          "+reference observer: argument of FurnaceObserver.prototype.snapshot.call (body)",
          "+reference observer: in observer.snapshot (body)",
          "+write observer.snapshot",
        ],
      ],
      [
        "S1-METHOD-SWAP-FOROF",
        [
          "+reference FurnaceObserver: in FurnaceObserver.prototype (body)",
          "+reference observer: argument of FurnaceObserver.prototype.snapshot.call (body)",
          "+reference observer: in observer.snapshot (body)",
          "+write observer.snapshot",
        ],
      ],
      [
        "G24-S1-PROTO-PATCH",
        [
          "+reference FurnaceObserver: in FurnaceObserver (nested)",
          "+reference FurnaceObserver: in FurnaceObserver.prototype (module)",
          "+reference FurnaceObserver: in FurnaceObserver.prototype (module)",
        ],
      ],
      [
        "G24-S1-METHOD-SWAP-CTRL",
        [
          "+reference reading: in reading.completeness (body)",
          "+write reading.completeness",
        ],
      ],
      [
        "S1-READING-BLOCK-SHADOW",
        [
          "+reference reading: binding (module)",
          "+resolved reading: const (module)",
        ],
      ],
      [
        "S1-READING-REDECLARED",
        [
          "+reference reading: binding (body)",
          "+resolved reading: var (body)",
          "+resolved reading: var (body)",
          "-reference FurnaceObserver: binding (module)",
          "-reference FurnaceObserver: class of new (body)",
          "-reference observer: binding (body)",
          "-reference observer: receiver of close (body)",
          "-reference observer: receiver of projectionSnapshot (body)",
          "-reference observer: receiver of snapshot (body)",
          '-resolved FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
          "-resolved observer: const (body)",
          "-resolved reading: const (body)",
        ],
      ],
      [
        "S1-ENCLOSING-SHADOW",
        [
          '+replier textResult=(msg:string)=>({content:[{type:"text"asconst,text:msg}],details:undefined})',
          "+resolved textResult: const (enclosing)",
          '-replier functiontextResult(msg:string,details?:AgentDetails){return{content:[{type:"text"asconst,text:msg}],details:detailsasany};}',
          "-resolved textResult: FunctionDeclaration (module)",
        ],
      ],
      [
        "G24-S1-DECL-OVERLOAD",
        [
          '+replier functiontextResult(msg:string,details?:AgentDetails):{content:{type:"text";text:string}[];details:any};',
          "+resolved textResult: FunctionDeclaration (module)",
        ],
      ],
      ["G24-S1-DECL-STATIC-BLOCK", []],
      ["G24-S1-DECL-GLOBAL", []],
    ]);
    // S1's named unread families, each with pinned quiet rows: a plant S1 reads exactly as the slice does, beside what the body's
    // call reader and the module's statements show of it (so a quiet row whose plant is silenced reds). CONTROL FLOW: S1 does not
    // read whether the body reaches its refresh and its data reply. The class's prototype changed through another binding of the
    // class or of its module, the projection the body refreshes (read by its name only), a built-in the sanitizer or the observer
    // uses changed, a reference the checker binds to no symbol, and code held only in a string are not read either.
    const statementsOf = (text: string): string[] =>
      parsed(text)
        .statements.map(statement => statement.getText(parsed(text)))
        .filter(statement => !statement.includes('"furnace_observe"'))
        .map(statement => statement.replace(/\s+/g, ""));
    const beyond = (left: readonly string[], right: readonly string[]): string[] => {
      const rest = [...left];
      return right.filter(item => {
        const at = rest.indexOf(item);
        if (at !== -1) rest.splice(at, 1);
        return at === -1;
      });
    };
    const shown = (edits: readonly (readonly [string, string])[]): string[] => {
      const text = planted(slice, edits);
      return [
        ...beyond(base?.calls ?? [], toolBody("furnace_observe", text)?.calls ?? []).map(call => `call ${call}`),
        ...beyond(statementsOf(slice), statementsOf(text)).map(statement => `statement ${statement}`),
      ];
    };
    const THROWN = `throw new Error('{"completeness":"complete"}');`;
    const quiet: readonly (readonly [string, readonly (readonly [string, string])[]])[] = [
      ["control flow: a conditional throw between the refresh and the data reply", [[REPLY, `          if (params.runId.length > 0) ${THROWN}\n${REPLY}`]]],
      ["control flow: an unconditional throw before the data reply", [[REPLY, `          ${THROWN}\n${REPLY}`]]],
      ["control flow: a conditional throw before the reading", [[READING, `          if (params.runId.length > 0) ${THROWN}\n${READING}`]]],
      ["control flow: an unconditional throw before the reading", [[READING, `          ${THROWN}\n${READING}`]]],
      ["control flow: a call that throws before the data reply", [[REPLY, `          JSON.parse(params.runId);\n${REPLY}`]]],
      ["control flow: an await that never settles before the data reply", [[REPLY, `          await new Promise<never>(() => undefined);\n${REPLY}`]]],
      ["control flow: an await that never settles after the reading", [[REFRESH, `          await new Promise<never>(() => undefined);\n${REFRESH}`]]],
      ["control flow: a loop that never ends before the data reply", [[REPLY, `          while (params.runId.length > 0) await Promise.resolve();\n${REPLY}`]]],
      ["control flow: a throw in the finally block", [[CLOSE, `${CLOSE} if (params.runId.length > 0) ${THROWN}`]]],
      [
        "the class's prototype through another binding of the class",
        [
          [IMPORT, `${IMPORT}\nimport { FurnaceObserver as ZzPatched } from "./workbench/furnace-observer.js";`],
          atModule('const zzSnapshot = ZzPatched.prototype.snapshot;\nZzPatched.prototype.snapshot = async function (this: ZzPatched) { return { ...(await zzSnapshot.call(this)), completeness: "complete" as const }; };'),
        ],
      ],
      [
        "the class's prototype through a namespace import of its module",
        [
          [IMPORT, `${IMPORT}\nimport * as ZzObserverModule from "./workbench/furnace-observer.js";`],
          atModule(
            'const zzSnapshot = ZzObserverModule.FurnaceObserver.prototype.snapshot;\nZzObserverModule.FurnaceObserver.prototype.snapshot = async function (this: InstanceType<typeof ZzObserverModule.FurnaceObserver>) { return { ...(await zzSnapshot.call(this)), completeness: "complete" as const }; };',
          ),
        ],
      ],
      ["the projection the body refreshes, read by its name only", [inBody("const projection = zzProjection();")]],
      ["a built-in the sanitizer or the observer uses", [atModule(`JSON.stringify = ((value: unknown): string => '{"completeness":"complete"}') as typeof JSON.stringify;`)]],
      ["a reference the checker binds to no symbol", [atModule("import zzAlias = textResult;\nvoid zzAlias;")]],
      ["code held only in a string", [atModule('eval("textResult = (msg) => msg");')]],
    ];
    expect(
      quiet.map(([id, edits]) => [id, delta(base, toolBody("furnace_observe", planted(slice, edits))), shown(edits)]),
      "each named unread family is a quiet row: S1 reads none of it, while the plant stands",
    ).toStrictEqual([
      ["control flow: a conditional throw between the refresh and the data reply", [], [`call newError('{"completeness":"complete"}')`]],
      ["control flow: an unconditional throw before the data reply", [], [`call newError('{"completeness":"complete"}')`]],
      ["control flow: a conditional throw before the reading", [], [`call newError('{"completeness":"complete"}')`]],
      ["control flow: an unconditional throw before the reading", [], [`call newError('{"completeness":"complete"}')`]],
      ["control flow: a call that throws before the data reply", [], ["call JSON.parse(params.runId)"]],
      ["control flow: an await that never settles before the data reply", [], ["call newPromise<never>(()=>undefined)"]],
      ["control flow: an await that never settles after the reading", [], ["call newPromise<never>(()=>undefined)"]],
      ["control flow: a loop that never ends before the data reply", [], ["call Promise.resolve()"]],
      ["control flow: a throw in the finally block", [], [`call newError('{"completeness":"complete"}')`]],
      [
        "the class's prototype through another binding of the class",
        [],
        [
          'statement import{FurnaceObserverasZzPatched}from"./workbench/furnace-observer.js";',
          "statement constzzSnapshot=ZzPatched.prototype.snapshot;",
          'statement ZzPatched.prototype.snapshot=asyncfunction(this:ZzPatched){return{...(awaitzzSnapshot.call(this)),completeness:"complete"asconst};};',
        ],
      ],
      [
        "the class's prototype through a namespace import of its module",
        [],
        [
          'statement import*asZzObserverModulefrom"./workbench/furnace-observer.js";',
          "statement constzzSnapshot=ZzObserverModule.FurnaceObserver.prototype.snapshot;",
          'statement ZzObserverModule.FurnaceObserver.prototype.snapshot=asyncfunction(this:InstanceType<typeofZzObserverModule.FurnaceObserver>){return{...(awaitzzSnapshot.call(this)),completeness:"complete"asconst};};',
        ],
      ],
      ["the projection the body refreshes, read by its name only", [], ["call zzProjection()"]],
      ["a built-in the sanitizer or the observer uses", [], [`statement JSON.stringify=((value:unknown):string=>'{"completeness":"complete"}')astypeofJSON.stringify;`]],
      [
        "a reference the checker binds to no symbol",
        [],
        [
          "statement importzzAlias=textResult;",
          "statement voidzzAlias;",
        ],
      ],
      ["code held only in a string", [], ['statement eval("textResult=(msg)=>msg");']],
    ]);
    // Where a node stands, at the body's two edges: in a body that is one arrow, its parameter starts where the body starts
    // and its concise body ends where the body ends, and each reads as in the body.
    const edges = toolBody("zz-edges", 'tools.push({ name: "zz-edges", execute: reading => reading });');
    expect([edges?.resolved, edges?.references], "a parameter at the body's start and a name at its end stand in the body").toStrictEqual([
      ["reading: Parameter (body)"],
      ["reading: binding (body)", "reading: in reading=>reading (body)"],
    ]);
    // And on the binding forms themselves, in a synthetic module: an alias import, a type-only import written in the body, a
    // destructured callee and another function's parameter and var, which shadow nothing in the body and so are not read.
    const rebound = toolBody(
      "zz-resolve",
      [
        'import { sanitizeWorkbenchText as sanitizeWorkbenchJsonText } from "./workbench/redaction.js";',
        'import type { FurnaceObserver } from "./workbench/furnace-observer.js";',
        "function other(textResult: unknown) { var FurnaceObserver = textResult; }",
        'tools.push({ name: "zz-resolve", execute: async (_id, params) => {',
        "  const { sanitizeWorkbenchJsonText: kept, textResult } = params;",
        "  ({ FurnaceObserver } = params);",
        "  const observer = new FurnaceObserver(kept);",
        "  const reading = await observer.snapshot();",
        "  void sanitizeWorkbenchJsonText;",
        "  return textResult(sanitizeWorkbenchJsonText(reading));",
        "} });",
      ].join("\n"),
    );
    expect([rebound?.resolved, rebound?.references, rebound?.replier], "an alias or type-only import, a destructured callee, a destructuring write and a callable handed on, read by binding").toStrictEqual([
      [
        'FurnaceObserver: import type FurnaceObserver from "./workbench/furnace-observer.js" (module)',
        "observer: const (body)",
        "reading: const (body)",
        'sanitizeWorkbenchJsonText: import sanitizeWorkbenchText from "./workbench/redaction.js" (module)',
        "textResult: BindingElement (body)",
      ],
      [
        "reading: binding (body)",
        "reading: argument of sanitizeWorkbenchJsonText (body)",
        "observer: binding (body)",
        "observer: receiver of snapshot (body)",
        "FurnaceObserver: binding (module)",
        "FurnaceObserver: in FurnaceObserver (body)",
        "FurnaceObserver: class of new (body)",
        "sanitizeWorkbenchJsonText: in voidsanitizeWorkbenchJsonText (body)",
      ],
      ["textResult"],
    ]);
    const unbound = toolBody("zz-global", 'function textResult(text) { return text; } tools.push({ name: "zz-global", execute: async () => { const reading = await probe(); return textResult(String(reading)); } });');
    expect([unbound?.resolved, unbound?.replier], "a data-path name bound nowhere in the file reads as a global").toStrictEqual([
      ["String: global (no binding in the file)", "reading: const (body)", "textResult: FunctionDeclaration (module)"],
      ["functiontextResult(text){returntext;}"],
    ]);
  }, S1_TIMEOUT_MS);

  pinned("A1", () => {
    const row = exportRow();
    expect(row.title.startsWith(`[${REQUIREMENT}] `), "the title opens with the requirement id").toBe(true);
    expect(titleClauses(row.title), "the title's clauses are ROWS' clauses").toStrictEqual(ROWS.map(item => item.clause));
    expect(row.title.match(/\b[a-z]+(?:_[a-z]+)+\b/g), "its snake-case tokens are ROWS' fields").toStrictEqual([...FIELDS]);
    const quoted = /FRN-WM-003 '([^']+)'/.exec(row.notes)?.[1] ?? "";
    expect(quoted.startsWith("Preserve ") ? topLevel(quoted.slice("Preserve ".length), [", ", " and "]) : [], "the notes' FRN-WM-003 phrases").toStrictEqual(
      ROWS.flatMap(item => (item.producer !== undefined ? [item.producer] : [])),
    );
    expect(/round-trip preservation test per field \(([^)]+)\)/.exec(row.notes)?.[1]?.split(", "), "the acceptance's per-field list").toStrictEqual(
      ROWS.flatMap(item => (item.acceptance !== undefined ? [item.acceptance] : [])),
    );
    expect([CITATION, GATING, ACCEPTANCE].filter(text => !row.notes.includes(text)), "the notes carry the citation, gating artifact and acceptance").toStrictEqual([]);
    expect(/Gating artifact: ([a-z_/]+) on a released surface\./.exec(GATING)?.[1]?.split("/"), "the gating artifact names ROWS' fields").toStrictEqual([...FIELDS]);
    expect(FIELDS.filter(field => !TRANSITION_FIELDS.includes(field)), "every field is a proposed transition field").toStrictEqual([]);
    const docs12 = readFileSync(join(REPO, DOCS12), "utf8");
    expect(floorSentences(docs12), "docs/12 states the redaction-floor sentence once, whole and plain, directly under its section heading").toStrictEqual([FLOOR_SENTENCE]);
    const lowered = `${FLOOR_SENTENCE.charAt(0).toLowerCase()}${FLOOR_SENTENCE.slice(1)}`;
    const pages = [
      docs12.replace(FLOOR_SENTENCE, `<!-- ${FLOOR_SENTENCE} -->`),
      `${docs12.replace(FLOOR_SENTENCE, "")}\n## Withdrawn protections\n\n${FLOOR_SENTENCE}\n`,
      docs12.replace(FLOOR_SENTENCE, `It is not the case that ${lowered}`),
      docs12.replace(FLOOR_SENTENCE, `~~${FLOOR_SENTENCE}~~`),
      docs12.replace(FLOOR_SENTENCE, `### Withdrawn (no longer provided)\n\n${FLOOR_SENTENCE}`),
      docs12.replace(FLOOR_SENTENCE, `*${FLOOR_SENTENCE}*`),
    ];
    expect(pages.map(floorSentences), "the reading is live: a hidden, a relocated, a prefixed, a struck, a sub-sectioned and an emphasized copy each read as none").toStrictEqual([
      [],
      [],
      [],
      [],
      [],
      [],
    ]);
    const floor = /redact recognized (.+) credentials, common (.+) prefixes and sensitive (.+) key\/value fields/.exec(FLOOR_SENTENCE);
    expect(floor === null ? [] : [...floor[1].split("/"), floor[2], ...floor[3].split(" or ")], "its classes are CORPUS's words").toStrictEqual(CORPUS.map(entry => entry.word));
    expect(incompleteOperands(), "the observer's incompleteness operands are INCOMPLETE's").toStrictEqual(INCOMPLETE.map(fact => fact.reads));
    const unions = releaseUnions(["RunState", "OutputStream"]);
    expect(unions.get("RunState"), "the installed release declares RunState once, as exactly STATES").toStrictEqual([[...STATES]]);
    expect(unions.get("OutputStream"), "and OutputStream once, as exactly STREAMS").toStrictEqual([[...STREAMS]]);
    const snapshot = declarations("src/workbench/observation.ts", readFileSync(join(REPO, "src/workbench/observation.ts"), "utf8"))
      .filter(item => item.name === "NativeSnapshot")
      .flatMap(item => item.members);
    const camel = (field: string): string => field.replace(/_[a-z]/g, part => part.slice(1).toUpperCase());
    expect(FIELDS.filter(field => snapshot.includes(camel(field))), "Pi's NativeSnapshot declares one ROWS field in camelCase").toStrictEqual(["source_revision"]);
    const families = new Set(exportTitles().flatMap(title => /^\[([A-Z0-9-]*WORLD-MODEL[A-Z0-9-]*)-R\d+\]/.exec(title)?.slice(1) ?? []));
    families.delete(REQUIREMENT.replace(/-R\d+$/, ""));
    expect(families.size, "the export files other programs' world-model requirement families").toBeGreaterThan(0);
    const wider = ["sourceRevision", "a world model", "HX-PREDICTIVE-WORLD-MODEL-ADAPTERS-R2"];
    expect(
      SRC_WORDS.filter(reading => wider.some(form => forms(form).some(text => reading.test(text)))),
      "so the src reader reads none of those forms",
    ).toStrictEqual([]);
    expect(RESIDUALS.map(residual => residual.id).filter(id => id === "R-SRC-NARROW"), "and its narrowing is a named residual").toStrictEqual(["R-SRC-NARROW"]);
  });

  pinned("F1", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toStrictEqual([
      "trigger:4",
      "provenance:4",
      "completeness:4",
      "redaction:5",
      "privacy:3",
      "ordering:3",
      "surfaces:3",
    ]);
    expect(INCOMPLETE.map(fact => fact.id)).toStrictEqual([
      "page-incomplete",
      "page-unreadable",
      "run-unreadable",
      "failed-unreturned",
      "corrupt-unreturned",
      "progress-unavailable",
      "log-incomplete",
      "log-lossy",
    ]);
    expect(CORPUS.map(entry => entry.id)).toStrictEqual(["bearer", "basic", "token-prefix", "plain-key-value", "json-key-value"]);
    expect(STATES).toStrictEqual(["created", "active", "paused", "needs_attention", "completed", "stopped", "failed"]);
    expect(STREAMS).toStrictEqual(["stdout", "stderr"]);
    expect(RESIDUALS.map(residual => residual.id)).toStrictEqual(["R-RENAMED", "R-COMPUTED", "R-ENCODED", "R-UNDECODED-ESCAPE", "R-ASSEMBLED", "R-SRC-NARROW"]);
    expect(RECORDS).toStrictEqual(["FurnaceObservedTransition", "CounterfactualCandidate", "SyntheticAttemptState"]);
    expect(TRANSITION_FIELDS).toStrictEqual([
      "source_revision",
      "run_id",
      "attempt_id",
      "before_ref",
      "event_ref",
      "after_ref",
      "exit_status",
      "reason",
      "native_receipt",
      "capture_completeness",
      "redaction_hash",
    ]);
  });

  pinned("J2", () => {
    for (const row of ROWS) {
      expect(row.pins, `${row.id}: its pins are the cases naming it`).toStrictEqual(CASE_IDS.filter(id => (CASES[id].rows as readonly string[]).includes(row.id)));
    }
    const named = CASE_IDS.flatMap(id => [...CASES[id].rows]);
    expect(named.filter(id => !ROWS.some(row => row.id === id)), "every row a case names exists").toStrictEqual([]);
    expect([...registered].sort(), "every case is registered").toStrictEqual([...CASE_IDS].sort());
    expect(new Set(registered).size, "and once").toBe(registered.length);
  });
});
