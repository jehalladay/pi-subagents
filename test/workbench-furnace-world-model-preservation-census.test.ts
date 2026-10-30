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
 * changed from 5fbe25e to b3d410f); the wb-40zp seat, 2026-10-30, read the src tree, vendor/, package.json, package-lock.json
 * and docs/12 byte-identical from b3d410f to trunk ee48709 (an empty git diff), so these readings carry over. Producer
 * (Furnace's own tree, read with git show at the filing pin 0f791db71b9d and at
 * Furnace main 0d41031, and re-read so by the cut #3 seat on 2026-10-29 with main still at 0d41031: the same three blobs at
 * both; this census never reads it): docs/programs/world-model-trace-adapter-2026-10-18/README.md (blob 8649ef6e) reads "DESIGN
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
 * class. S1 the furnace_observe tool body, read through the AST of src/index.ts, replies with
 * textResult(sanitizeWorkbenchJsonText(reading)) for the reading its FurnaceObserver returned and refreshes the projection with
 * that reading's Run snapshot. It names that reading exactly three times, its binding and the arguments of
 * observer.projectionSnapshot and of that sanitizer, so it hands the reading to no other call and binds, iterates, writes or
 * returns it nowhere else; its textResult calls and its return statements are exactly its two literal refusals, the sanitized
 * reading and its sanitized error text. The names its data path calls through, read from the body (each textResult reply's
 * callee, the sanitizer handed the reading inside one and the class the reading's receiver is constructed from), resolve where
 * R1 and O1 read them: every binding and every write of sanitizeWorkbenchJsonText, textResult and FurnaceObserver anywhere in
 * src/index.ts (an import, a declaration or parameter of any kind, a destructuring name, and an assignment, increment, for-of
 * or destructuring-assignment target; in the body, at module scope or in another function) is exactly the redaction.ts import
 * of sanitizeWorkbenchJsonText, the module's own textResult function and the furnace-observer.ts import of FurnaceObserver, the
 * modules this file imports, so a body or module rebinding of one of them reds S1, as does a same-named binding that shadows
 * nothing (fail closed). O1 holds that the two calls leave the reading unchanged, so R1 and O1 read the reply the tool
 * returns. A1 the outside anchors: the export title's clauses, snake-case fields and requirement id; the export notes'
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
 * binding reader reads its names from the src body and holds them to one literal, so deleting a name's entry reds S1.
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
    title: "the furnace_observe tool replies with sanitizeWorkbenchJsonText(reading), untouched, as its only data reply and projects that reading's Run snapshot",
  },
  A1: { rows: [], title: "outside anchors: the export title and notes, docs/12's floor sentence, the observer's operands, NativeSnapshot, RunState and OutputStream" },
  F1: { rows: [], title: "FROZEN SHAPE (standing rule 16): the rows' pin counts and every table's ids" },
  J2: { rows: [], title: "the judged set: each row's pins are exactly the cases naming it, and every case is registered once" },
} as const satisfies Readonly<Record<string, Case>>;
type CaseId = keyof typeof CASES;
const CASE_IDS = Object.keys(CASES) as CaseId[];
const registered: CaseId[] = [];
/** Registers one case under its id and the rows it holds. */
function pinned(id: CaseId, body: () => void | Promise<void>): void {
  registered.push(id);
  const rows: readonly string[] = CASES[id].rows;
  it(`${id} [${rows.join(", ")}]: ${CASES[id].title}`, body);
}

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

/** A tool body as the S1 reader reads it (whitespace removed). */
interface ToolBody {
  /** Every call and new expression. */
  readonly calls: string[];
  /** Every variable initializer, as `name=initializer`. */
  readonly bindings: string[];
  /** Every textResult reply's shape: a string-literal argument reads "<literal>", a call reads as its callee with each argument
   * read as "reading" when it is that identifier and "..." otherwise. */
  readonly replies: string[];
  /** The target of every assignment, increment, decrement and delete. */
  readonly writes: string[];
  /** Every return statement's value, a nested function's included: a textResult call read in its reply shape, any other value
   * as written (whitespace removed), and a bare return as "<none>". */
  readonly returns: string[];
  /** Every place the identifier `reading` occurs: "binding" where it is declared, "argument of <callee>" where it is a call's
   * argument, and "in <parent>" anywhere else (whitespace removed). */
  readonly mentions: string[];
  /** The names the body's data path calls through, read from the body: the callee of every textResult reply, the plain callee
   * of every call inside one that is handed the reading, and the class the reading's receiver is constructed from (`reading =
   * [await] <receiver>.<method>(...)`, `<receiver> = new <Class>(...)`). For each, every binding and every write of that name
   * anywhere in the source, sorted: an import as `import <imported name> from "<specifier>"` (`import type` when type-only,
   * `default` or `*` for a default or namespace import), a function, class, variable (const, let, var), catch, parameter,
   * destructuring, enum, namespace, interface, type or type-parameter name by its kind, and an assignment, increment, for-of or
   * for-in target or a destructuring-assignment name as "write"; each where it stands, in the "body", at "module" scope or
   * "nested" in another function (a property name binds nothing). A name the source never binds reads as a global. */
  readonly resolved: string[];
}
/** The named tool's execute body in src/index.ts (or in a planted source), read through the AST. */
function toolBody(name: string, text = readFileSync(join(REPO, INDEX_SOURCE), "utf8")): ToolBody | undefined {
  const source = ts.createSourceFile(INDEX_SOURCE, text, ts.ScriptTarget.Latest, true);
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
  const isTextResult = (node: ts.Expression): node is ts.CallExpression => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "textResult";
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
    ts.forEachChild(node, collect);
  };
  collect(body);
  // The binding reader (landing 668 F3): the data path's names, read from the body, then every binding and write of each name
  // anywhere in the source.
  const root: ts.Node = body;
  const through = new Set<string>();
  const locals = new Map<string, ts.Expression>();
  const trace = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && isTextResult(node)) {
      through.add("textResult");
      for (const argument of node.arguments) {
        if (ts.isCallExpression(argument) && ts.isIdentifier(argument.expression) && argument.arguments.some(item => ts.isIdentifier(item) && item.text === "reading")) {
          through.add(argument.expression.text);
        }
      }
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) locals.set(node.name.text, node.initializer);
    ts.forEachChild(node, trace);
  };
  trace(root);
  const unwrap = (node: ts.Expression): ts.Expression => (ts.isAwaitExpression(node) || ts.isParenthesizedExpression(node) ? unwrap(node.expression) : node);
  const initial = locals.get("reading");
  const read = initial === undefined ? undefined : unwrap(initial);
  const receiver = read !== undefined && ts.isCallExpression(read) && ts.isPropertyAccessExpression(read.expression) && ts.isIdentifier(read.expression.expression) ? locals.get(read.expression.expression.text) : undefined;
  const built = receiver === undefined ? undefined : unwrap(receiver);
  if (built !== undefined && ts.isNewExpression(built) && ts.isIdentifier(built.expression)) through.add(built.expression.text);
  /** The names an assignment target writes: a name, or each name of a destructuring-assignment pattern (defaults and rests
   * included). */
  const targets = (node: ts.Expression): ts.Identifier[] => {
    if (ts.isIdentifier(node)) return [node];
    if (ts.isParenthesizedExpression(node)) return targets(node.expression);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) return targets(node.left);
    if (ts.isArrayLiteralExpression(node)) return node.elements.flatMap(element => targets(ts.isSpreadElement(element) ? element.expression : element));
    if (ts.isObjectLiteralExpression(node)) {
      return node.properties.flatMap(property =>
        ts.isShorthandPropertyAssignment(property) ? [property.name] : ts.isPropertyAssignment(property) ? targets(property.initializer) : ts.isSpreadAssignment(property) ? targets(property.expression) : [],
      );
    }
    return [];
  };
  const written = new Set<ts.Node>();
  const scan = (node: ts.Node): void => {
    if (ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment) {
      for (const target of targets(node.left)) written.add(target);
    }
    if ((ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && updates.includes(node.operator)) {
      for (const target of targets(node.operand)) written.add(target);
    }
    if ((ts.isForOfStatement(node) || ts.isForInStatement(node)) && !ts.isVariableDeclarationList(node.initializer)) {
      for (const target of targets(node.initializer)) written.add(target);
    }
    ts.forEachChild(node, scan);
  };
  scan(source);
  const where = (node: ts.Node): string => {
    if (node.pos >= root.pos && node.end <= root.end) return "body";
    for (let up: ts.Node | undefined = node.parent; up !== undefined; up = up.parent) if (ts.isFunctionLike(up)) return "nested";
    return "module";
  };
  const named: readonly (readonly [string, (node: ts.Node) => boolean])[] = [
    ["function", node => ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node)],
    ["class", node => ts.isClassDeclaration(node) || ts.isClassExpression(node)],
    ["enum", ts.isEnumDeclaration],
    ["namespace", ts.isModuleDeclaration],
    ["interface", ts.isInterfaceDeclaration],
    ["type", ts.isTypeAliasDeclaration],
    ["type parameter", ts.isTypeParameterDeclaration],
  ];
  /** The binding a name declares, by kind, with the node that places it; undefined where the name is a reference or a property. */
  const declares = (name: ts.Identifier): { readonly kind: string; readonly at: ts.Node } | undefined => {
    const parent = name.parent;
    const imported = (clause: ts.ImportClause, what: string, typeOnly: boolean) => ({
      kind: `import ${typeOnly || clause.phaseModifier === ts.SyntaxKind.TypeKeyword ? "type " : ""}${what} from ${clause.parent.moduleSpecifier.getText(source)}`,
      at: clause.parent,
    });
    if (ts.isImportSpecifier(parent)) return parent.name === name ? imported(parent.parent.parent, (parent.propertyName ?? parent.name).text, parent.isTypeOnly) : undefined;
    if (ts.isImportClause(parent)) return parent.name === name ? imported(parent, "default", false) : undefined;
    if (ts.isNamespaceImport(parent)) return imported(parent.parent, "*", false);
    if (ts.isImportEqualsDeclaration(parent)) return parent.name === name ? { kind: `import = ${parent.moduleReference.getText(source)}`, at: parent } : undefined;
    let holder: ts.Node = parent;
    if (ts.isBindingElement(parent)) {
      // A destructured name: the property a binding element reads, and its default, bind nothing.
      if (parent.name !== name) return undefined;
      while (ts.isBindingElement(holder) || ts.isObjectBindingPattern(holder) || ts.isArrayBindingPattern(holder)) holder = holder.parent;
    }
    const direct = holder !== parent || ("name" in parent && parent.name === name);
    if (ts.isVariableDeclaration(holder) && direct) {
      if (ts.isCatchClause(holder.parent)) return { kind: "catch", at: holder };
      const flags = ts.getCombinedNodeFlags(holder);
      return { kind: flags & ts.NodeFlags.Const ? "const" : flags & ts.NodeFlags.Let ? "let" : "var", at: holder };
    }
    if (ts.isParameter(holder) && direct) return { kind: "parameter", at: holder };
    const kind = named.find(([, is]) => is(parent));
    return kind !== undefined && direct ? { kind: kind[0], at: parent } : undefined;
  };
  const resolved: string[] = [];
  const resolve = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && through.has(node.text)) {
      const found = written.has(node) ? { kind: "write", at: node } : declares(node);
      if (found !== undefined) resolved.push(`${node.text}: ${found.kind} (${where(found.at)})`);
    }
    ts.forEachChild(node, resolve);
  };
  resolve(source);
  for (const name of through) if (!resolved.some(entry => entry.startsWith(`${name}: `))) resolved.push(`${name}: global (no binding in the file)`);
  resolved.sort();
  return { calls, bindings, replies, writes, returns, mentions, resolved };
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
    // The binding reader (landing 668 F3): the names the body's data path calls through resolve to the modules this file imports
    // and to the module's own textResult, and nothing in src/index.ts binds or writes them again.
    expect(tool?.resolved, "the sanitizer, textResult and FurnaceObserver resolve to their imports and the module function, rebound nowhere").toStrictEqual([
      'FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
      'sanitizeWorkbenchJsonText: import sanitizeWorkbenchJsonText from "./workbench/redaction.js" (module)',
      "textResult: function (module)",
    ]);
    // It is live on the landing-668 gate's G8-S1-SANITIZER-SHADOW, rebuilt on the real source: a body-local sanitizer bound
    // before the reading.
    const index = readFileSync(join(REPO, INDEX_SOURCE), "utf8");
    const anchor = "const reading = await observer.snapshot();";
    expect(index.split(anchor).length, "the shadow plant's anchor stands once in src/index.ts").toBe(2);
    const shadowed = toolBody("furnace_observe", index.replace(anchor, `const sanitizeWorkbenchJsonText = (value: unknown): string => JSON.stringify(value);\n          ${anchor}`));
    expect(shadowed?.resolved, "a body-local sanitizer is a body rebinding").toStrictEqual([
      'FurnaceObserver: import FurnaceObserver from "./workbench/furnace-observer.js" (module)',
      "sanitizeWorkbenchJsonText: const (body)",
      'sanitizeWorkbenchJsonText: import sanitizeWorkbenchJsonText from "./workbench/redaction.js" (module)',
      "textResult: function (module)",
    ]);
    // And on every other binding form it reads: an alias import, a type-only import, a parameter and a var of another function,
    // a destructuring binding and a destructuring write (a destructured property name binds nothing), and a global.
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
        "  return textResult(sanitizeWorkbenchJsonText(reading));",
        "} });",
      ].join("\n"),
    );
    expect(rebound?.resolved, "an alias or type-only import, another function's parameter or var, a destructuring binding and a destructuring write").toStrictEqual([
      'FurnaceObserver: import type FurnaceObserver from "./workbench/furnace-observer.js" (module)',
      "FurnaceObserver: var (nested)",
      "FurnaceObserver: write (body)",
      'sanitizeWorkbenchJsonText: import sanitizeWorkbenchText from "./workbench/redaction.js" (module)',
      "textResult: const (body)",
      "textResult: parameter (nested)",
    ]);
    const unbound = toolBody("zz-global", 'function textResult(text) { return text; } tools.push({ name: "zz-global", execute: async () => { const reading = await probe(); return textResult(String(reading)); } });');
    expect(unbound?.resolved, "a data-path name the file never binds reads as a global").toStrictEqual(["String: global (no binding in the file)", "textResult: function (module)"]);
  });

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
