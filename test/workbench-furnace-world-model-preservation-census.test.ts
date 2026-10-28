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
 * MEASURED (read-only, by the cutting seat, 2026-10-28, at base 7a0ab7f, and again at 1bb7b05, whose landings 631-635 touched
 * no src file, vendored SDK or docs/12 and changed this bead's export row only in its claim fields). Producer (Furnace's own
 * tree, read with git show at the filing pin 0f791db71b9d and again at Furnace main 0d41031, 2026-10-26: the same three blobs;
 * this census never reads it): docs/programs/world-model-trace-adapter-2026-10-18/README.md (blob 8649ef6e) reads "DESIGN ONLY,
 * not a new executor, scheduler or live trace exporter." at :2 and "Redact secret-bearing logs" at :6; 01-architecture.md (blob
 * f2f3f1c6) holds FRN-WM-003 at :7 and the "Proposed records:" line at :11 (PROPOSED_RECORDS below, verbatim). The installed
 * @furnace/sdk is 0.1.0 from vendor/furnace-sdk-0.1.0.tgz (sha256 aaa57dcfb1c205ec...; 128 files, whose 28 .d.ts files hold 389
 * named declarations with 1425 members, read through the TypeScript AST as THE READERS below do): no declaration is named for a
 * proposed record, no member name reads as one of the three FRN-WM-003 fields, and no file spells a record, a field or the
 * world-model words by path or content (no file spells "redact" either). Its nearest members are what Pi's Furnace observer
 * reads today: RunDto.furnace_version and RunDto.binary_revision (version provenance), LogsReadDto.complete and
 * LogsReadDto.lossy (a log read's missing-fields status) and AttemptDto.ordinal (order). Pi: no src file spells a proposed
 * record's identifier or an FRN-WM-003 wire name (git grep rc 1 over 116 files). Two wider readings cannot be used in src: Pi's
 * own NativeSnapshot field is the camelCase sourceRevision, and the export files two other programs' world-model requirement
 * families (HX-PREDICTIVE-WORLD-MODEL-ADAPTERS, RF-PREDICTIVE-WORLD-MODEL-CONTEXT) whose Pi children cite their ids in src
 * comments (the queued wb-gwr.2 cut adds one to src/workbench/hyperunix-observer.ts). So no world-model record has shipped and
 * no Pi reader of one exists. No src, docs or tracker text is edited by this cut.
 *
 * THE READERS. The release reader reads every regular file under the installed package: each .d.ts file through the TypeScript
 * AST (every interface, type alias, class and enum declaration with every member signature, property, method and enum member
 * nested in it at any depth, so a field reaches the reading through any heritage, alias, generic wrapper or nesting; comments
 * never counting), and every file's package-relative path and raw content. A record is read by its words after the "Furnace"
 * prefix, a field by its two words and the world-model pair by "world" and "model", each pair with any run of non-alphanumeric
 * characters (or none) between its words, in any case. The src reader reads every regular file under src/ as raw text for each
 * record's exact identifier and each field's exact snake-case wire name, as whole words (a reader of the records reads their
 * JSON keys).
 *
 * CASES (each test title opens with its id and the ROWS it holds). T1 (ARMED) the installed release declares no record and no
 * field and spells none of RELEASE_WORDS, while the same reader finds the observer's analog members and, by content, the
 * release's own binary_revision (liveness): when a re-vendor brings a record, T1 reds naming the acceptance as owed. T2 the
 * same readers find every record, field and word in a planted release (through a quoted member, a type alias, a class and a
 * comment), and every field declared on a type-alias parent, behind a generic wrapper or nested under an unrelated member. T3
 * (ARMED) no src file spells SRC_WORDS while the reader finds the schema literal in src/workbench/identity.ts only and finds
 * each planted identifier and wire name: when a Pi reader of the records lands, T3 reds naming the acceptance as owed. Q1 the
 * three named residuals, each a pinned quiet row re-judged here (RESIDUALS). J1 the acceptance's per-field round-trip judge: an
 * identity reader passes, and a reader that drops a judged field, strips or reverses redaction_hash, or reorders the records
 * reds with exactly its findings. R1 FurnaceObservedTransition-shaped records (PROPOSED_RECORDS' fields, HYPOTHETICAL values)
 * survive the furnace_observe reply's sanitizer byte for byte, per field, key order and record order included; each CORPUS
 * class planted in a record's free text is redacted while every other field survives, and the same line as a producer that
 * already redacted it writes it (HELD: its value replaced by the marker) stays redacted. O1 the observer's analogs survive its
 * reading, its Run snapshot, its topology, an ObservationProjection fed that topology, and the reply: furnace_version and
 * binary_revision as producer version and revision on every snapshot and every projected node (an absent binary_revision is
 * stated nowhere, never guessed), each INCOMPLETE fact as "partial" everywhere, and the Attempt page's order in the items,
 * snapshots, edges, evidence refs and projected nodes, with ownership edges only; a doctored output set, one label changed per
 * surface, proves the label reader reads every surface and the reply's text. O2 log lines, FRN-WM-003-shaped members the
 * release does not publish and secret-bearing members, planted on the Run status, its failed rows, every Attempt row and the
 * log read, change no output and reach none. E1 the log evidence presentation keeps every HELD line redacted and redacts every
 * CORPUS class. S1 the furnace_observe tool body, read through the AST of src/index.ts, replies with
 * textResult(sanitizeWorkbenchJsonText(reading)) for the reading its FurnaceObserver returned and refreshes the projection with
 * that reading's Run snapshot, so R1 and O1 read the reply the tool returns. A1 the outside anchors: the export title's
 * clauses, snake-case fields and requirement id; the export notes' FRN-WM-003 phrases, per-field acceptance list, citation,
 * gating artifact and ACCEPTANCE; docs/12's redaction-floor sentence (CORPUS); the observer source's incompleteness operands
 * (INCOMPLETE); every ROWS field among PROPOSED_RECORDS' fields; and the two reasons for R-SRC-NARROW: Pi's NativeSnapshot
 * declaring exactly one ROWS field in camelCase (src/workbench/observation.ts) and the export filing world-model requirement
 * families other than this bead's. F1 the frozen shape. J2 the judged set: each row's pins are exactly the cases whose titles
 * name it, and every case is registered once.
 *
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}`, and INCOMPLETE, CORPUS, RESIDUALS, RECORDS and the
 * transition fields are pinned as literals. ROWS, INCOMPLETE and CORPUS are each also held to an anchor outside this file (A1);
 * RECORDS and the transition fields are read from PROPOSED_RECORDS, the producer line quoted verbatim, and only the three ROWS
 * fields among them are anchored outside it (the export title and gating artifact); of RESIDUALS, R-SRC-NARROW is anchored
 * outside (observation.ts and the export) and R-RENAMED and R-COMPUTED are pinned by their quiet rows and the literal only.
 *
 * RESIDUALS (named families, each with its pinned quiet row in Q1): R-RENAMED, a record shipped under names that spell no
 * reading escapes T1; R-COMPUTED, a field whose name the release assembles at type level (a mapped type over a template-literal
 * key that splits the field's words) escapes T1, since neither the member reading nor the content reading sees the words;
 * R-SRC-NARROW, a Pi reader spelling the records or fields only in camelCase, prose or keys assembled from parts escapes T3.
 *
 * PARKED (the external remainder, a Furnace release): the acceptance itself - a round-trip preservation test per field through
 * a real reader's projection and tool reply - needs the records in a released @furnace/sdk and a Pi reader of them. T1 or T3
 * reds when either arrives, and J1's judge is the one that test runs.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { AttemptDto, AttemptListDto, LogsReadDto, Response, ResponseKind, RunStatusDto } from "@furnace/sdk";
import ts from "typescript";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFurnaceAttemptLogEvidence } from "../src/workbench/furnace-evidence.js";
import { FurnaceObserver, type FurnaceObserverClient, type FurnaceProjectionTopology, type FurnaceReading } from "../src/workbench/furnace-observer.js";
import { type NativeSnapshot, ObservationProjection, type ObservedNode } from "../src/workbench/observation.js";
import { sanitizeWorkbenchJsonText } from "../src/workbench/redaction.js";

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
const OWED_READER = `ARMED (${BEAD}): a Pi src file now spells a world-model record, the world-model words or an FRN-WM-003 wire name, so a Pi reader of the records exists and owes the acceptance: ${ACCEPTANCE}`;

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
    title: "(ARMED) the installed release declares no world-model record or FRN-WM-003 field and spells none of them, nor the world-model words",
  },
  T2: { rows: ["trigger"], title: "the same readers find every record, field and word in a planted release" },
  T3: { rows: ["trigger"], title: "(ARMED) no Pi src file spells a world-model record, the world-model words or an FRN-WM-003 wire name" },
  Q1: { rows: ["trigger"], title: "each named residual is a pinned quiet row: its probe is read and found quiet" },
  J1: {
    rows: ["provenance", "completeness", "redaction", "ordering"],
    title: "the per-field round-trip judge passes an identity reader and reds a reader that drops, strips, reverses or reorders",
  },
  R1: {
    rows: ["provenance", "completeness", "redaction", "privacy", "ordering", "surfaces"],
    title: "record-shaped values survive the tool reply's sanitizer per field and in order, and the docs/12 corpus in them stays redacted",
  },
  O1: {
    rows: ["provenance", "completeness", "ordering", "surfaces"],
    title: "the observer's analogs survive reading, topology, projection and reply: version provenance, each missing-fields fact, page order",
  },
  O2: { rows: ["redaction", "privacy"], title: "no log line, unpublished FRN-WM-003-shaped member or secret-bearing member reaches any observer output" },
  E1: { rows: ["redaction", "privacy"], title: "the log evidence presentation keeps a producer's redaction redacted and redacts every corpus class" },
  S1: { rows: ["surfaces"], title: "the furnace_observe tool replies with sanitizeWorkbenchJsonText(reading) and projects that reading's Run snapshot" },
  A1: { rows: [], title: "outside anchors: the export title and notes, docs/12's floor sentence, the observer's operands and NativeSnapshot" },
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
/** What the src reader spells for: each record's exact identifier and each field's exact snake-case wire name, as whole words
 * (the wider readings are R-SRC-NARROW's: Pi's own camelCase sourceRevision and other programs' world-model ids, A1). */
const SRC_WORDS: readonly RegExp[] = [...RECORDS, ...FIELDS].map(name => new RegExp(`\\b${name}\\b`));
/** The members the observer reads for each analog today: the member reader's liveness anchor in the release it judges. */
const ANALOGS: readonly string[] = ["RunDto.furnace_version", "RunDto.binary_revision", "LogsReadDto.complete", "LogsReadDto.lossy", "AttemptDto.ordinal"];

interface Declared {
  readonly name: string;
  readonly members: readonly string[];
}
function memberName(name: ts.PropertyName, source: ts.SourceFile): string {
  return ts.isComputedPropertyName(name) ? name.getText(source) : name.text;
}
/** Every named interface, type alias, class and enum of one declaration file with the members nested in it (AST only). */
function declarations(file: string, text: string): Declared[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  const found: { name: string; members: string[] }[] = [];
  const visit = (node: ts.Node, owner: { name: string; members: string[] } | undefined): void => {
    let next = owner;
    if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isClassDeclaration(node) || ts.isEnumDeclaration(node)) && node.name !== undefined) {
      next = { name: node.name.text, members: [] };
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
/** A release as its files' package-relative paths and texts, with every declaration of its .d.ts files. */
function release(files: readonly { readonly path: string; readonly text: string }[]): Release {
  return { files, found: files.filter(file => file.path.endsWith(".d.ts")).flatMap(file => declarations(file.path, file.text)) };
}
function installedRelease(): Release {
  return release(regularFiles(SDK_ROOT).map(file => ({ path: relative(SDK_ROOT, file), text: readFileSync(file, "utf8") })));
}
interface Findings {
  readonly records: readonly string[];
  readonly fields: Readonly<Record<string, readonly string[]>>;
  readonly spellings: readonly string[];
}
/** What the release reader finds: declarations named for a record, members per field, and files spelling RELEASE_WORDS. */
function findings(read: Release): Findings {
  const members = qualified(read.found);
  return {
    records: read.found.map(item => item.name).filter(name => RECORDS.some(record => recordReading(record).test(name))),
    fields: Object.fromEntries(FIELDS.map(field => [field, members.filter(member => fieldReading(field).test(member.slice(member.indexOf(".") + 1)))])),
    spellings: read.files.filter(file => RELEASE_WORDS.some(reading => reading.test(file.path) || reading.test(file.text))).map(file => file.path),
  };
}
const QUIET: Findings = { records: [], fields: Object.fromEntries(FIELDS.map(field => [field, []])), spellings: [] };
/** Every src path (repository-relative) whose raw text spells one of the readings. */
function srcSpellings(files: readonly { readonly path: string; readonly text: string }[], readings: readonly RegExp[]): string[] {
  return files.filter(file => readings.some(reading => reading.test(file.text))).map(file => file.path);
}
function srcFiles(): { path: string; text: string }[] {
  return regularFiles(join(REPO, "src")).map(file => ({ path: relative(REPO, file), text: readFileSync(file, "utf8") }));
}

/** The bead's own export row: its title and notes (later notes are appended, so notes are read by inclusion only). */
function exportRow(): { title: string; notes: string } {
  const rows = readFileSync(join(REPO, EXPORT), "utf8")
    .split("\n")
    .filter(line => line.trim() !== "")
    .map((line): unknown => JSON.parse(line));
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
  return readFileSync(join(REPO, EXPORT), "utf8")
    .split("\n")
    .filter(line => line.trim() !== "")
    .flatMap(line => {
      const row: unknown = JSON.parse(line);
      return typeof row === "object" && row !== null && "title" in row && typeof row.title === "string" ? [row.title] : [];
    });
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
const UNREADABLE = { path: "attempts/frn-atm-wm-x.json", class: "unreadable", detail: "HYPOTHETICAL-unreadable" };
/** One missing-fields fact per operand of the observer's completeness reading (A1 holds `reads` to the source). */
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
  const snapshot = observer.projectionSnapshot(reading);
  const topology = observer.projectionTopology(reading);
  const projection = new ObservationProjection();
  expect(topology.snapshots.map(item => projection.refresh(item)), "every topology snapshot is applied").toStrictEqual(topology.snapshots.map(() => "applied"));
  for (const relation of topology.relations) projection.relate(relation);
  const nodes = projection.query({ scope: SCOPE, limit: 20 }).nodes;
  const order = projection.query({ scope: SCOPE, invocationId: RUN_ID, limit: 20 }).nodes.map(node => node.nativeRef.id);
  observer.close();
  return { reading, snapshot, topology, nodes, order, reply: sanitizeWorkbenchJsonText(reading) };
}
/** Every completeness label one output set states, reading first, then each snapshot, each node and the reply's own text. */
function completenessOf(out: Outputs): unknown[] {
  const reply: unknown = JSON.parse(out.reply);
  return [out.reading.completeness, out.snapshot.coverage, ...out.topology.snapshots.map(item => item.coverage), ...out.nodes.map(node => node.completeness), isRec(reply) ? reply.completeness : undefined];
}

/** One residual family and its quiet row: a probe the readers read, and the quiet verdict they return for it today. */
interface Residual {
  readonly id: string;
  readonly family: string;
  readonly probe: () => unknown;
  readonly quiet: unknown;
}
const RESIDUALS: readonly Residual[] = [
  {
    id: "R-RENAMED",
    family: "a record shipped under a name and fields that spell no reading (here TraceStep {rev, cover, digest}) escapes T1",
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
    family: "a field whose name the release assembles at type level (a mapped type over a template-literal key splitting its words) escapes T1",
    // The key is `sou${"rce"}_revision`, joined at "$" so no literal here holds a template placeholder.
    probe: () => findings(release([{ path: "dist/src/computed.d.ts", text: ["type Key = `sou", '{"rce"}_revision`; export type Computed = { [K in Key]: string };'].join("$") }])),
    quiet: QUIET,
  },
  {
    id: "R-SRC-NARROW",
    family: "a Pi reader spelling the records or fields only in camelCase, prose or assembled keys (sourceRevision, a world model) escapes T3",
    probe: () =>
      srcSpellings(
        [
          {
            path: "src/workbench/zz-world-model-probe.ts",
            text: "const sourceRevision = record.sourceRevision; record.captureCompleteness; record.redactionHash; const key = ['capture', 'completeness'].join('_'); // a world model's observed transitions (HX-PREDICTIVE-WORLD-MODEL-ADAPTERS-R2)",
          },
        ],
        SRC_WORDS,
      ),
    quiet: [],
  },
];

/** The call texts (whitespace removed) and variable initializers of the named tool's execute body in src/index.ts. */
function toolBody(name: string): { calls: string[]; bindings: string[] } | undefined {
  const source = ts.createSourceFile(INDEX_SOURCE, readFileSync(join(REPO, INDEX_SOURCE), "utf8"), ts.ScriptTarget.Latest, true);
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
  const collect = (node: ts.Node): void => {
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) calls.push(squeeze(node));
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) bindings.push(`${squeeze(node.name)}=${squeeze(node.initializer)}`);
    ts.forEachChild(node, collect);
  };
  collect(body);
  return { calls, bindings };
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
  });

  pinned("T3", () => {
    const files = srcFiles();
    expect(files.length, "the src tree was read").toBeGreaterThan(0);
    expect(srcSpellings(files, [/workflow-script\/v1/]), "the src reader is live: the schema literal lives in identity.ts only").toStrictEqual(["src/workbench/identity.ts"]);
    expect(srcSpellings(files, SRC_WORDS), OWED_READER).toStrictEqual([]);
    const plants = ["const key = 'source_revision';", "row.capture_completeness", "{ redaction_hash: digest }", "type Row = FurnaceObservedTransition;", "new CounterfactualCandidate()", "SyntheticAttemptState[]"];
    expect(plants.map(text => srcSpellings([{ path: "src/zz-plant.ts", text }], SRC_WORDS).length), "each planted reader spelling is found").toStrictEqual(plants.map(() => 1));
  });

  pinned("Q1", () => {
    for (const residual of RESIDUALS) expect(residual.probe(), `${residual.id}: ${residual.family}`).toStrictEqual(residual.quiet);
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
    for (const entry of [...CORPUS, ...HELD]) {
      const handed = [{ ...TRANSITIONS[0], reason: entry.line }];
      const shown = listAt(replyOf({ transitions: handed }), "transitions");
      const others = TRANSITION_FIELDS.filter(field => field !== "reason");
      expect(roundTrip(handed, shown, "event_ref", others), `${entry.line}: every other field survives`).toStrictEqual([]);
      expect(shown.map(row => (isRec(row) ? row.reason : undefined)), `${entry.line}: the free text stays or becomes redacted`).toStrictEqual([entry.shown]);
      expect(JSON.stringify(shown).includes(FAKE), `${entry.line}: no fake value reaches the reply`).toBe(false);
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
      const out = await outputs(BASE);
      const every = <T>(value: T, count: number): T[] => Array.from({ length: count }, () => value);
      expect([out.reading.source.producerVersion, out.reading.source.producerRevision], "the reading names the producer version and revision").toStrictEqual([VERSION, REVISION]);
      expect([out.snapshot.sourceRevision, ...out.topology.snapshots.map(item => item.sourceRevision)], "every snapshot carries the revision").toStrictEqual(every(REVISION, 5));
      expect(out.nodes.map(node => node.sourceVersion), "every projected node carries it").toStrictEqual(every(REVISION, 4));
      expect(completenessOf(out), "a complete read is complete everywhere").toStrictEqual(every("complete", 11));
      // The label reader is live: one label changed on each surface shows at its own position, the reply's read from its text.
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
      expect(out.reading.attempts.items.map(item => [item.id, item.ordinal]), "the items keep the page order").toStrictEqual(PAGE.map(item => [item.attempt_id, item.ordinal]));
      expect(out.topology.snapshots.slice(1).map(item => item.source.id), "so do the Attempt snapshots").toStrictEqual(PAGE_IDS);
      expect(out.topology.relations.map(relation => [relation.kind, relation.to.id]), "and the edges, ownership only").toStrictEqual(PAGE_IDS.map(id => ["ownership", id]));
      expect([out.snapshot.evidenceRefs, out.order], "and the evidence refs and the projected Attempt nodes").toStrictEqual([PAGE_IDS, PAGE_IDS]);
      expect(out.reply, "the reply is the reading, byte for byte").toBe(JSON.stringify(out.reading));
      for (const fact of INCOMPLETE) {
        const partial = await outputs(fact.plant(BASE));
        expect(completenessOf(partial), `${fact.id}: partial everywhere`).toStrictEqual(every("partial", 11));
        expect(partial.reply, `${fact.id}: the reply is the reading`).toBe(JSON.stringify(partial.reading));
      }
      const { binary_revision, ...unrevised } = STATUS;
      expect(binary_revision, "the base carries the revision the unrevised fixture drops").toBe(REVISION);
      const bare = await outputs({ ...BASE, status: unrevised });
      const stated = [bare.reading.source.producerRevision, bare.snapshot.sourceRevision, ...bare.topology.snapshots.map(item => item.sourceRevision), ...bare.nodes.map(node => node.sourceVersion)];
      expect(stated, "an absent revision is stated nowhere").toStrictEqual(every(undefined, 10));
      expect(bare.reply.includes(REVISION), "nor in the reply").toBe(false);
    });

    pinned("O2", async () => {
      const base = await outputs(BASE);
      const planted = await outputs(PLANTED);
      expect(planted, "unpublished, secret-bearing and log-line plants change no output").toStrictEqual(base);
      const text = JSON.stringify(planted);
      expect(PLANT_MARKS.filter(mark => text.includes(mark)), "and reach none").toStrictEqual([]);
      expect(planted.reading.logs, "the reading keeps only the log read's counts and flags").toStrictEqual([
        { attemptId: PAGE_IDS[2], stream: "stdout", complete: true, lossy: false, returned: LOG_LINES.length, nextCursor: null },
      ]);
    });
  });

  pinned("E1", async () => {
    const lines = ["step 1 done", ...HELD.map(entry => entry.line), ...CORPUS.map(entry => entry.line)];
    const content = await readFurnaceAttemptLogEvidence({
      client: { logs: { read: async () => respond("logs_read", "req-evidence-wm", { ...LOG, lines, returned: lines.length }) } },
      runId: RUN_ID,
      workspaceRoot: WORKSPACE,
      owningRunNode: { nativeRef: { provider: "furnace", type: "run", id: RUN_ID, scope: WORKSPACE }, evidenceRefs: PAGE_IDS },
      attemptId: PAGE_IDS[2],
      stream: "stdout",
      maxBytes: 512,
      maxLines: 50,
      timeoutMs: 2000,
      signal: new AbortController().signal,
      capturedAt: () => CLOCK,
    });
    expect(content.preview).toStrictEqual(["step 1 done", ...HELD.map(entry => entry.shown), ...CORPUS.map(entry => entry.shown)]);
    expect(content.preview.filter(row => row !== "step 1 done" && !row.includes(MARKER)), "every corpus row shows the marker").toStrictEqual([]);
    expect([content.lineCount, content.truncated], "every line is shown and counted").toStrictEqual([lines.length, false]);
    expect(JSON.stringify(content).includes(FAKE), "no fake value reaches the evidence").toBe(false);
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
    expect(toolBody("zz-no-such-tool"), "the reader finds no body for an unregistered name").toBeUndefined();
    expect(toolBody("workflow_observe")?.calls.length ?? 0, "and finds another tool's body").toBeGreaterThan(0);
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
    expect(docs12.split("\n").some(line => line.includes(FLOOR_SENTENCE)), "docs/12 holds the redaction-floor sentence").toBe(true);
    const floor = /redact recognized (.+) credentials, common (.+) prefixes and sensitive (.+) key\/value fields/.exec(FLOOR_SENTENCE);
    expect(floor === null ? [] : [...floor[1].split("/"), floor[2], ...floor[3].split(" or ")], "its classes are CORPUS's words").toStrictEqual(CORPUS.map(entry => entry.word));
    expect(incompleteOperands(), "the observer's incompleteness operands are INCOMPLETE's").toStrictEqual(INCOMPLETE.map(fact => fact.reads));
    const snapshot = declarations("src/workbench/observation.ts", readFileSync(join(REPO, "src/workbench/observation.ts"), "utf8"))
      .filter(item => item.name === "NativeSnapshot")
      .flatMap(item => item.members);
    const camel = (field: string): string => field.replace(/_[a-z]/g, part => part.slice(1).toUpperCase());
    expect(FIELDS.filter(field => snapshot.includes(camel(field))), "Pi's NativeSnapshot declares one ROWS field in camelCase").toStrictEqual(["source_revision"]);
    const families = new Set(exportTitles().flatMap(title => /^\[([A-Z0-9-]*WORLD-MODEL[A-Z0-9-]*)-R\d+\]/.exec(title)?.slice(1) ?? []));
    families.delete(REQUIREMENT.replace(/-R\d+$/, ""));
    expect(families.size, "the export files other programs' world-model requirement families").toBeGreaterThan(0);
    expect(SRC_WORDS.filter(reading => reading.test("sourceRevision") || reading.test("a world model")), "so the src reader reads neither form").toStrictEqual([]);
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
    expect(RESIDUALS.map(residual => residual.id)).toStrictEqual(["R-RENAMED", "R-COMPUTED", "R-SRC-NARROW"]);
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
