/**
 * wb-rdlh.1 (LIBRARY-COMPOSITIONAL-AUTONOMOUS-COMPUTATION-R1, program-triage-2026-10-22): the authorization-input posture census
 * for the Library design program's records, a standing until-then pin (no Pi reader of the records exists; they are design
 * proposals, unshipped). Statement: the owner filing's full statement (its first note paragraph), read from the tracked bead export
 * at run time with the filing's other six paragraphs and held to the roster's sha-256, never retyped here. Acceptance: the
 * filing's "Acceptance:" clause, whose four parts (a)-(d) are the labels of rows A-D verbatim and in order (ROWS); the labels tile
 * the clause (only white space, commas, semicolons and the list markers between them) and each row's pin quotes tile its label
 * (only white space, commas, semicolons and a hyphen before white space between them).
 *
 * THE SOURCE AT THE PIN (Library 72d79ed704d884e63c39c3d34e3ea9425b952140, read with read-only git show from a blob-filtered bare
 * clone by the cutting seat on 2026-10-29; this hermetic test never re-queries upstream). Every record line this census reads is
 * one the absence census already vendors (wb-zzb4's base lines and the wb-rdlh.2 extension's, test/fixtures/cac-absence-roster.json,
 * base64 beside its sha-256): this census reads those vendored lines, never copies of its own, so the records' names, members and
 * statuses are the absence census's bytes (row C2). Of its 50 record lines, three list their records' members as identifiers: ChoiceCertificateV2
 * (12-generalized-choice-temporal-v4.md:17), TemporalRelianceCertificateV1 (:19) and SourceBeliefSafetyCertificateV1
 * (14-belief-transport-approximation-v6.md:15), the record the fixtures are shaped as (its fourteen members, guardOrRelyReceipt
 * among them, and its three-valued status PASS/FAIL/UNKNOWN); 29 define their records in prose (25 bold definition lines and four
 * list-item definitions); and 18 are headings whose records are defined on lines the roster does not vendor (the
 * R-UNVENDORED-MEMBERS residual: 03-contracts-api.md:20, for one, lists ObservationCertificateV1's closureVerdict). The roster
 * vendors four further lines the same way: the filing's quote 13-hypergraph-transport-safety-v5.md:47 (held to the filing's quote
 * text verbatim), 18-proof-carrying-finite-protocol-v10.md:55 (UNKNOWN is a missing-evidence category, not an invitation to bypass a
 * source denial), 14-belief-transport-approximation-v6.md:29 (failed/expired source checks remain FAIL/UNKNOWN, not probabilistic
 * success) and :44 (the harnesses keep admission and denial).
 *
 * MEASURED AT 04123dc0d0f2 (trunk tip at claim time, landing 671) and holding at e8e13f82bfd0 (landing 672, merged into the branch:
 * three test files and .beads, no src or docs path), not pinned: src/workbench/control.ts:255 declares the filing's
 * cited predicate (export function isCoreMintedDecision); src holds 117 files, every one a .ts module, no symlink; the core and the
 * six modules with a value import of it (claude-control, control-reply, control-tool, detached-control, forge-control and
 * furnace-control under src/workbench; src/workflow/task.ts imports a type only) form the admission/decision set; the three record
 * lines name 40 distinct camel- or Pascal-case members, none spelled in src as a word (git grep -w over src), and two one-word
 * members, principal (spelled on 169 src lines: Pi's own principal, a member of NativeControlRequest and ObservationScope) and
 * status (492 lines), which src reads as properties of its own and its producers' shapes; no src module reads any of the 40 as a
 * property. The filing measured 0 identifiers of the program at Pi d75b68d; the absence census holds the program's names at zero
 * outside its holders today.
 *
 * READINGS.
 * - FIXTURES (row A): the roster's three negative records, one per condition the filing's clause (a) lists, in its order, each the
 *   source-safety record's fourteen members plus its name and its status slot (the line's three-valued vocabulary, which the line
 *   keys by no member name), each aimed at the provenance test's observed run, so a reader that took it as an authorization input
 *   would have a reason to permit: N1 a PASS record whose guardOrRelyReceipt is current at the roster's clock (the provenance
 *   request's instant), N2 the same record with status UNKNOWN, N3 the PASS record whose guardOrRelyReceipt expired before the
 *   clock; N2 and N3 each differ from N1 in their one condition member only.
 * - PERMITS (row A): the real decision core, no mock: isCoreMintedDecision over five forms of each record (the record itself and
 *   four permit-shaped wrappers); decideControl over the provenance test's request shape and projection (restated here), each
 *   record at five placements (three beside a request's own fields, two where the core reads a native value: the operator
 *   confirmation and a grant), over the permitted request and the eight requests the core denies, one per deny policy.
 * - DENIALS (row B): the landed rf reader (src/workbench/reactivefiber-observer.ts reactivefiberTopology, given the provider's output
 *   shape) over rf's refusal envelope (ok false, one primary RF_ error diagnostic): its snapshot and the projection's presentation of
 *   it, with the UNKNOWN record planted at five positions the reader accepts (beside the reading's own fields, in the primary
 *   diagnostic's metadata, as a second info diagnostic, as the primary's hint and as its message) and at three it refuses; and over
 *   two source checks rf reports on an ok render, a failed one (an observation row that observed no value: denied, degraded) and an
 *   expired one (a row replayed from an earlier render: freshness reused), each with the PASS and the expired records planted at
 *   four positions.
 * - FIELDS (row C): the property reads a src module spells, from its TypeScript AST, in these forms: a member access (optional
 *   chains included), an element access with a literal key, an object binding pattern's key, an `in` test with a literal key, and
 *   an own-key call with a literal key (Object.hasOwn, Object.getOwnPropertyDescriptor, Reflect.get, Reflect.has,
 *   Reflect.getOwnPropertyDescriptor, hasOwnProperty and propertyIsEnumerable, called directly or through .call). A record-shaped
 *   field is one of the 40 members (the identifier members of the three record lines that list them) or a schema name of the
 *   absence roster's two line sets. The admission/decision set is derived: the core plus every src module with a value import that
 *   resolves to it.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A. A1 the wb-pjj provenance test (its header names wb-pjj) reads this roster by path and registers one describe for clause (a)
 *    with four registrations that read the fixtures, and the cited core file exports the cited predicate: a binding, not a proof
 *    that those cases are strong (R-HOLLOW-BINDING; A3 drives the same fixtures through the core itself). A2 the three fixtures
 *    are the clause's three conditions, in order, each holding the source-safety record's members exactly, aimed at the
 *    provenance run and isolating its condition. A3 none yields a permit: no form of a record reads minted; beside a request's own
 *    fields a record changes no decision (the permitted request keeps its receipt, every denial stays the same denial); in place
 *    of a native value it denies, the permitted request included; and the only permits are the permitted request's own.
 *  B. B1 the refusal renders tone failure and the text 'refused · RF_RENDER_FAILED'; with the UNKNOWN record at each of the five
 *    accepted positions the snapshot and its projected presentation are unchanged, and at each of three refused positions the
 *    reading is refused as malformed (validation), with no snapshot and a message that echoes none of the record's name, status,
 *    epoch and proof tier. B2 both source checks render UNKNOWN (tone unknown, coverage partial) beside the refusal's FAIL (tone
 *    failure), unchanged by the PASS and the expired records at each of four positions; a clean render renders success (the
 *    reader's control). B3 no B reading surfaces a probability-shaped string or a success tone, and five probability texts planted
 *    in the refusal's text slots never surface (the matcher reads each).
 *  C. C1 the derived admission/decision set holds the core and its six readers, every member yields reads (the core's include
 *    principal), none reads a record-shaped field, and neither does any src module; the reader's controls flag each read form.
 *    C2 the tie to R2: the fixture record is the absence roster's own vendored line (held to the sha-256 this roster measured)
 *    and a schema name that census judges, as is each record line the members come from; its census names that roster; the
 *    three-valued status is the line's; the one-word members are exactly the shared names, each one src reads; the schema family
 *    of both line sets joins the field reading; and no src file spells one of the 40 members as a word.
 *  D. PARKED, never counted satisfied: clause (d) asks for a sentence on the W19 security-design page; standing rule 3 (the user's
 *    W19 INPUT HYGIENE order) keeps agents to product input-hygiene tests, so the sentence and its wb-gs2.3 census row are the
 *    owner's. D1 holds the parked state: the row carries that reason, and the page's 'Authorization design' section states no such
 *    sentence, so the cut that adds one reds this row and binds it in the same commit.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` and `${id}:${status}` as literals and equals the roster's copy
 * (beside each pin's witness). OUTSIDE ANCHORS: the owner filing in the tracked export (its seven paragraphs, each trimmed, held to
 * the roster's sha-256): its acceptance clause is tiled by the labels, its clause (a) yields the fixture conditions, the cited
 * predicate and file, its quote paragraph yields the first vendored line's text and site, and it cites the Library pin, so a pin or
 * a row removed from every census literal and from the roster still reds against the owner's text; the absence roster's vendored
 * lines yield the records, their members and the statuses; the src tree yields the admission/decision set.
 * SELF-READ: the judged set parses this file's IMPL and requires every pin to name one of READERS and not ROSTER (direct
 * identifiers only); each pin's witness carries the digest of its own quote; the records case requires every pin and every quiet
 * row to have run to its end.
 * RESIDUALS (named families, each with a pinned quiet row in QUIET): R-OTHER-PRODUCER row B reads rf's refusal only; R-SHARED-NAME
 * a one-word member (principal, status) is not judged by name; R-DYNAMIC-KEY a key the source does not spell as a literal escapes
 * the name reading; R-PROSE-RECORD a member the program names only in prose is not read; R-UNVENDORED-MEMBERS the members of the
 * 18 records whose vendored line is a heading are not read; R-HOLLOW-BINDING A1 binds the provenance cases by presence and reads,
 * so a case hollowed in place still reads bound.
 * Display paths added: none. Test-only: no scratch (every synthetic module is parsed in memory); src, the docs, both rosters, the
 * two test sources it binds and the bead export are only read.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { type ControlDecision, decideControl, isCoreMintedDecision, type NativeControlRequest } from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Presentation } from "../src/workbench/observation.js";
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { docsSection, sourceStructure } from "./helpers/census.js";
import { rfFixtureBlock, rfFixtureDecision } from "./helpers/rf-render-fixture.js";

type JsonRecord = { [key: string]: JsonValue };
interface Pin {
  readonly id: string;
  readonly quote: string;
}
type RowStatus = "pinned" | "parked";
interface Row {
  readonly id: string;
  readonly status: RowStatus;
  readonly label: string;
  /** A parked row: why its clause part is not delivered, never counted satisfied. */
  readonly reason?: string;
  readonly pins: readonly Pin[];
}
interface Span {
  readonly site: string;
  readonly textBase64: string;
  readonly sha256: string;
}
interface Fixture {
  readonly id: string;
  readonly condition: string;
  readonly record: JsonRecord;
}
interface Roster {
  readonly bead: string;
  readonly producer: string;
  readonly pin: string;
  readonly program: string;
  readonly filing: { readonly export: string; readonly paragraphs: number; readonly sha256: string };
  readonly record: { readonly roster: string; readonly site: string; readonly sha256: string };
  readonly citations: readonly Span[];
  readonly clock: string;
  readonly fixtures: readonly Fixture[];
  readonly rows: readonly (Omit<Row, "pins"> & { readonly pins: readonly (Pin & { readonly witness: JsonValue })[] })[];
  readonly residuals: readonly { readonly id: string; readonly family: string }[];
}
interface AbsenceRoster {
  readonly spans: readonly Span[];
  readonly extension: { readonly spans: readonly Span[] };
}
type ReadForm = "member" | "element" | "binding" | "in" | "own-key";
interface FieldRead {
  readonly file: string;
  readonly line: number;
  readonly name: string;
  readonly form: ReadForm;
}
type Permit = Extract<ControlDecision, { decision: "permitted" }>;
type Carried = "metadata" | "in-place";

const HERE = fileURLToPath(import.meta.url);
const REPO = join(dirname(HERE), "..");
const SELF = relative(REPO, HERE);
const ROSTER_FILE = "test/fixtures/cac-authorization-input-roster.json";
const ABSENCE_ROSTER_FILE = "test/fixtures/cac-absence-roster.json";
const ABSENCE_CENSUS = "test/workbench-cac-absence-census.test.ts";
const EXPORT_FILE = ".beads/issues.jsonl";
const BEAD = "wb-rdlh.1";
const PROVENANCE = "test/workbench-control-provenance.test.ts";
const PROVENANCE_SUITE = "wb-rdlh.1 (a): a Library design-program record never yields a permit";
const DOCS_FILE = "docs/workbench/12-security.md";
const DOCS_PARENT = "12 — Trust model, authorization, isolation and sensitive data";
const DOCS_HEADING = "Authorization design";
const readRepo = (file: string): string => readFileSync(join(REPO, file), "utf8");
const ROSTER = JSON.parse(readRepo(ROSTER_FILE)) as Roster;
const ABSENCE = JSON.parse(readRepo(ABSENCE_ROSTER_FILE)) as AbsenceRoster;
/** The functions that read the subject; every IMPL entry names one directly (SELF-READ). */
const READERS: readonly string[] = ["admissionSet", "definitionLines", "docsBinding", "fieldReads", "fixtureRead", "permitOutcomes", "provenanceBinding", "recordLine", "rfTopology"];

const ROWS: readonly Row[] = [
  {
    id: "A",
    status: "pinned",
    label:
      "the wb-pjj provenance test (isCoreMintedDecision, src/workbench/control.ts:255) gains CAC negative fixtures (PASS record, status UNKNOWN, expired guardOrRelyReceipt) - none yields a permit",
    pins: [
      { id: "A1", quote: "the wb-pjj provenance test (isCoreMintedDecision, src/workbench/control.ts:255) gains CAC negative fixtures" },
      { id: "A2", quote: "(PASS record, status UNKNOWN, expired guardOrRelyReceipt)" },
      { id: "A3", quote: "none yields a permit" },
    ],
  },
  {
    id: "B",
    status: "pinned",
    label:
      "a producer denial fixture (bd/furnace/forge/hx/rf) plus a CAC UNKNOWN row renders the denial unchanged in tone and text; a failed/expired source check renders FAIL/UNKNOWN, no success probability synthesized",
    pins: [
      { id: "B1", quote: "a producer denial fixture (bd/furnace/forge/hx/rf) plus a CAC UNKNOWN row renders the denial unchanged in tone and text" },
      { id: "B2", quote: "a failed/expired source check renders FAIL/UNKNOWN" },
      { id: "B3", quote: "no success probability synthesized" },
    ],
  },
  {
    id: "C",
    status: "pinned",
    label: "static census: no src admission/decision path reads a CAC-shaped field (ties to R2)",
    pins: [
      { id: "C1", quote: "static census: no src admission/decision path reads a CAC-shaped field" },
      { id: "C2", quote: "(ties to R2)" },
    ],
  },
  {
    id: "D",
    status: "parked",
    label:
      "docs/workbench/12-security.md 'Authorization design' gains one falsifiable sentence (CAC output never an authorization input; UNKNOWN never softens a denial) bound by the wb-gs2.3 census test",
    reason:
      "standing rule 3 (W19 INPUT HYGIENE, the user's order): agents write product input-hygiene tests only, never security design or security claims, and docs/workbench/12-security.md 'Authorization design' is the W19 security-design page (the wb-gs2.3 census, W19 / docs-12, binds it); the sentence and its wb-gs2.3 row are the owner's",
    pins: [
      {
        id: "D1",
        quote:
          "docs/workbench/12-security.md 'Authorization design' gains one falsifiable sentence (CAC output never an authorization input; UNKNOWN never softens a denial) bound by the wb-gs2.3 census test",
      },
    ],
  },
];
const pinIds = (): string[] => ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort();
const sha256 = (data: string | Buffer): string => createHash("sha256").update(data).digest("hex");
const claim = (id: string): string => sha256(ROWS.flatMap(row => row.pins).find(pin => pin.id === id)?.quote ?? "").slice(0, 16);

// --- the owner's text: the filing in the tracked export --------------------------------------------------------------------------------
/** The first paragraphs of the bead's notes in the tracked export, each trimmed (bd appends a later note after them, so trimming keeps
 * the hashed text identical before and after every append; the absence census's reading). */
function filing(bead: string, paragraphs: number): string {
  const rows = readRepo(EXPORT_FILE)
    .split("\n")
    .filter(line => line.includes(`"${bead}"`))
    .map(line => JSON.parse(line) as { readonly id?: unknown; readonly notes?: unknown })
    .filter(row => row.id === bead);
  const notes = rows.length === 1 ? rows[0]?.notes : undefined;
  if (typeof notes !== "string") throw new Error(`${EXPORT_FILE} carries ${rows.length} ${bead} rows; the census needs exactly one, with notes`);
  return notes
    .split(/\n\s*\n/)
    .slice(0, paragraphs)
    .map(paragraph => paragraph.trim())
    .join("\n\n");
}
interface Statement {
  readonly acceptance: string;
  readonly conditions: readonly string[];
  readonly predicate: string;
  readonly file: string;
  readonly quote: string;
  readonly quoteSite: string;
}
const ACCEPTANCE_CLAUSE = /^Acceptance: (\(a\) .+)\.$/m;
const CONDITIONS_CLAUSE = /negative fixtures \(([^)]+)\) - none yields a permit/;
const PREDICATE_CLAUSE = /^\(a\) the wb-pjj provenance test \((\w+), (src\/[\w./-]+\.ts):\d+\)/;
const QUOTE_CLAUSE = /^Quote: '(.+?)' docs\/programs\/[\w-]+\/([\w.-]+\.md:\d+)@[0-9a-f]{12}\./m;
function statement(text: string): Statement {
  const acceptance = ACCEPTANCE_CLAUSE.exec(text)?.[1];
  const conditions = acceptance === undefined ? undefined : CONDITIONS_CLAUSE.exec(acceptance)?.[1];
  const predicate = acceptance === undefined ? null : PREDICATE_CLAUSE.exec(acceptance);
  const quote = QUOTE_CLAUSE.exec(text);
  if (acceptance === undefined || conditions === undefined || predicate === null || quote === null) {
    throw new Error("the filing no longer carries its acceptance clause, its clause (a) conditions and citation, and its quote");
  }
  return { acceptance, conditions: conditions.split(", "), predicate: predicate[1] ?? "", file: predicate[2] ?? "", quote: quote[1] ?? "", quoteSite: quote[2] ?? "" };
}
const STATEMENT = statement(filing(BEAD, ROSTER.filing.paragraphs));

// --- the record: the absence census's vendored line ------------------------------------------------------------------------------------
/** A vendored line's text, held to its measured sha-256. */
function vendored(span: Span): string {
  const bytes = Buffer.from(span.textBase64, "base64");
  if (sha256(bytes) !== span.sha256) throw new Error(`${span.site}: the vendored line is not the line measured at the pin`);
  return bytes.toString("utf8");
}
const SCHEMA_NAME = /\b[A-Z][A-Za-z]+V\d+\b/g;
const RECORD_LINE = /^\*\*([A-Z][A-Za-z]+V\d+):\*\* (.+)\.$/;
const MEMBER = /^[a-z][A-Za-z]+$/;
interface RecordLine {
  readonly site: string;
  readonly sha256: string;
  readonly schema: string;
  readonly members: readonly string[];
  readonly statuses: readonly string[];
}
/** The record's definition line as the absence roster vendors it: its schema name, its members (identifiers, in order) and its
 * three-valued status vocabulary, the line's last item. */
function recordLine(): RecordLine {
  const spans = [...ABSENCE.spans, ...ABSENCE.extension.spans].filter(span => span.site === ROSTER.record.site);
  const span = spans.length === 1 ? spans[0] : undefined;
  if (span === undefined) throw new Error(`the absence roster vendors ${spans.length} lines at ${ROSTER.record.site}`);
  if (span.sha256 !== ROSTER.record.sha256) throw new Error(`${span.site}: the absence roster's line is not the one this roster measured`);
  const parsed = RECORD_LINE.exec(vendored(span));
  if (parsed === null) throw new Error(`${span.site} is no record definition line`);
  const items = (parsed[2] ?? "").split(", ");
  const statuses = (items.at(-1) ?? "").split("/");
  const members = items.slice(0, -1);
  if (!members.every(member => MEMBER.test(member)) || !statuses.every(word => /^[A-Z]+$/.test(word))) {
    throw new Error(`${span.site}: the record line no longer lists identifier members and a status vocabulary`);
  }
  return { site: span.site, sha256: span.sha256, schema: parsed[1] ?? "", members, statuses };
}
/** The schema names of both of the absence roster's vendored line sets, one per line (its own reading). */
function schemaFamily(): string[] {
  return [...ABSENCE.spans, ...ABSENCE.extension.spans].map(span => {
    const found = vendored(span).match(SCHEMA_NAME) ?? [];
    if (found.length !== 1) throw new Error(`${span.site}: the vendored line names ${found.length} schemas, not one`);
    return found[0] ?? "";
  });
}
/** A record definition line of the absence roster: optionally numbered, the schema name in bold with its colon inside or after. */
const DEFINITION = /^(?:\d+\. )?\*\*([A-Z][A-Za-z]+V\d+)(?::\*\*|\*\*:) (.+)$/;
/** A member identifier: one camel- or Pascal-case token with an inner capital (a one-word item is R-SHARED-NAME). */
const IDENTIFIER = /^(?:[a-z]+|[A-Z][a-z]+)(?:[A-Z][A-Za-z0-9]*)+$/;
const ONE_WORD = /^[a-z]+$/;
interface DefinitionLine {
  readonly site: string;
  readonly schema: string;
  readonly members: readonly string[];
  readonly words: readonly string[];
}
/** Every record definition line of the absence roster's two line sets that lists member identifiers: the items of its first
 * sentence (separated by commas, " OR " and " and "), its identifiers and its one-word items. */
function definitionLines(): DefinitionLine[] {
  return [...ABSENCE.spans, ...ABSENCE.extension.spans].flatMap(span => {
    const parsed = DEFINITION.exec(vendored(span));
    if (parsed === null) return [];
    const sentence = (parsed[2] ?? "").split(/\.(?:\s|$)/)[0] ?? "";
    const items = sentence.split(/,\s*|\s+OR\s+|\s+and\s+/).map(item => item.trim());
    const members = items.filter(item => IDENTIFIER.test(item));
    return members.length === 0 ? [] : [{ site: span.site, schema: parsed[1] ?? "", members, words: items.filter(item => ONE_WORD.test(item)) }];
  });
}
/** A list-item record definition (16-decentralized-information-privacy-progress-v8.md's form): a dash, the schema name, a colon. */
const LIST_DEFINITION = /^- ([A-Z][A-Za-z]+V\d+): (.+)$/;
/** The absence roster's record lines by kind: the identifier lines above, prose definitions, and headings with no definition text. */
function lineKinds(): { readonly identifiers: number; readonly prose: number; readonly headings: readonly string[] } {
  const spans = [...ABSENCE.spans, ...ABSENCE.extension.spans];
  const identifiers = definitionLines().map(line => line.site);
  const defined = spans.filter(span => DEFINITION.test(vendored(span)) || LIST_DEFINITION.test(vendored(span))).map(span => span.site);
  return { identifiers: identifiers.length, prose: defined.filter(site => !identifiers.includes(site)).length, headings: spans.map(span => span.site).filter(site => !defined.includes(site)) };
}
/** The one-word members (R-SHARED-NAME): names src already reads as properties of its own and its producers' shapes. */
const SHARED: readonly string[] = ["principal", "status"];
const NATIVE_INTERFACES: readonly (readonly [string, string])[] = [
  ["src/workbench/control.ts", "NativeControlRequest"],
  ["src/workbench/observation.ts", "ObservationScope"],
];
/** The property members the Pi-native interfaces declare, read from their own source. */
function nativeMembers(): string[] {
  return NATIVE_INTERFACES.flatMap(([file, name]) => {
    const source = ts.createSourceFile(file, readRepo(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const found = source.statements.filter((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === name);
    if (found.length !== 1) throw new Error(`${file} declares ${found.length} ${name} interfaces`);
    return (found[0]?.members ?? []).flatMap(member => (ts.isPropertySignature(member) && ts.isIdentifier(member.name) ? [member.name.text] : []));
  });
}
const RECORD = recordLine();
/** The judged members: every member identifier of every record definition line, once each. */
const JUDGED_FIELDS: readonly string[] = [...new Set(definitionLines().flatMap(line => line.members))].sort();
/** A record-shaped field: a judged member or a schema name of the absence roster's two line sets. */
const SHAPED: ReadonlySet<string> = new Set([...JUDGED_FIELDS, ...schemaFamily()]);
const shaped = (reads: readonly FieldRead[]): FieldRead[] => reads.filter(read => SHAPED.has(read.name));

// --- the field reading ------------------------------------------------------------------------------------------------------------------
const OWN_KEY_CALLS: Readonly<Record<string, readonly string[]>> = { Object: ["hasOwn", "getOwnPropertyDescriptor"], Reflect: ["get", "has", "getOwnPropertyDescriptor"] };
const OWN_KEY_METHODS: readonly string[] = ["hasOwnProperty", "propertyIsEnumerable"];
function literalKey(node: ts.Node | undefined): string | undefined {
  return node !== undefined && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
}
/** Every property read one module makes, read from its TypeScript AST (the FIELDS reading). */
function fieldReads(file: string, text: string): FieldRead[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const reads: FieldRead[] = [];
  const add = (node: ts.Node, name: string | undefined, form: ReadForm): void => {
    if (name !== undefined) reads.push({ file, line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1, name, form });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node)) add(node.name, node.name.text, "member");
    else if (ts.isElementAccessExpression(node)) add(node.argumentExpression, literalKey(node.argumentExpression), "element");
    else if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const key: ts.Node = node.propertyName ?? node.name;
      add(key, ts.isIdentifier(key) ? key.text : ts.isComputedPropertyName(key) ? literalKey(key.expression) : literalKey(key), "binding");
    } else if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.InKeyword) add(node.left, literalKey(node.left), "in");
    else if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const { expression: owner, name } = node.expression;
      const calls = ts.isIdentifier(owner) && Object.hasOwn(OWN_KEY_CALLS, owner.text) ? OWN_KEY_CALLS[owner.text] : undefined;
      if (calls?.includes(name.text)) add(node, literalKey(node.arguments[1]), "own-key");
      else if (OWN_KEY_METHODS.includes(name.text)) add(node, literalKey(node.arguments[0]), "own-key");
      else if (name.text === "call" && ts.isPropertyAccessExpression(owner) && OWN_KEY_METHODS.includes(owner.name.text)) add(node, literalKey(node.arguments[1]), "own-key");
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return reads;
}
/** One synthetic module per read form, each reading one judged member: the reader's positive controls. */
const PLANTED_READS: readonly (readonly [ReadForm, string, string])[] = [
  ["member", "guardOrRelyReceipt", "export const read = (value: Record<string, unknown>) => value.guardOrRelyReceipt;\n"],
  ["member", "proofTier", "export const read = (value?: Record<string, unknown>) => value?.proofTier;\n"],
  ["element", "modelCoverage", "export const read = (value: Record<string, unknown>) => value[\"modelCoverage\"];\n"],
  ["element", "policyEpoch", "export const read = (value: Record<string, unknown>) => value[`policyEpoch`];\n"],
  ["binding", "legalActionSets", "export const read = ({ legalActionSets }: Record<string, unknown>) => legalActionSets;\n"],
  ["binding", "worldScope", "export const read = ({ worldScope: scope }: Record<string, unknown>) => scope;\n"],
  ["in", "memorylessWitness", "export const read = (value: object) => \"memorylessWitness\" in value;\n"],
  ["own-key", "supportUpdate", "export const read = (value: object) => Object.hasOwn(value, \"supportUpdate\");\n"],
  ["own-key", "sourceId", "export const read = (value: object) => Reflect.get(value, \"sourceId\");\n"],
  ["own-key", "initialBeliefSupport", "export const read = (value: object) => value.hasOwnProperty(\"initialBeliefSupport\");\n"],
  ["own-key", "exactPredicateRef", "export const read = (value: object) => Object.prototype.hasOwnProperty.call(value, \"exactPredicateRef\");\n"],
  ["own-key", "validityHorizon", "export const read = (value: object) => Object.getOwnPropertyDescriptor(value, \"validityHorizon\");\n"],
  ["own-key", "revocationHandling", "export const read = (value: object) => Reflect.has(value, \"revocationHandling\");\n"],
  ["own-key", "currentUsePredicate", "export const read = (value: object) => Reflect.getOwnPropertyDescriptor(value, \"currentUsePredicate\");\n"],
  ["own-key", "branchRefs", "export const read = (value: object) => value.propertyIsEnumerable(\"branchRefs\");\n"],
  ["own-key", "unionWrites", "export const read = (value: object) => Object.prototype.propertyIsEnumerable.call(value, \"unionWrites\");\n"],
  ["binding", "checkerTier", "export const read = ({ [\"checkerTier\"]: tier }: Record<string, unknown>) => tier;\n"],
  ["member", "selectorTVBound", "export const read = (value: Record<string, unknown>) => value.selectorTVBound;\n"],
  ["member", "admissionVerdict", "export const read = (value: Record<string, unknown>) => value.admissionVerdict;\n"],
  ["member", "SourceBeliefSafetyCertificateV1", "export const read = (value: Record<string, unknown>) => value.SourceBeliefSafetyCertificateV1;\n"],
];
const WORD = (name: string): RegExp => new RegExp(`(?<![A-Za-z0-9_$])${name}(?![A-Za-z0-9_$])`);

// --- the src tree -----------------------------------------------------------------------------------------------------------------------
function walkTree(dir: string, unread: string[]): string[] {
  return readdirSync(join(REPO, dir), { withFileTypes: true })
    .flatMap(entry => {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) return walkTree(path, unread);
      if (entry.isFile()) return [path];
      unread.push(path);
      return [];
    })
    .sort();
}
const CORE = "src/workbench/control.ts";
/** The core's readers at the measured base: the derived set must keep each (a reader that stops importing the core reds C1). */
const ADMISSION_ANCHORS: readonly string[] = [
  "src/workbench/claude-control.ts",
  "src/workbench/control-reply.ts",
  "src/workbench/control-tool.ts",
  "src/workbench/detached-control.ts",
  "src/workbench/forge-control.ts",
  "src/workbench/furnace-control.ts",
];
const SRC_FLOOR = 100;
const resolvedModule = (from: string, specifier: string): string => relative(REPO, resolve(REPO, dirname(from), specifier)).replace(/\.js$/, ".ts");
/** The admission/decision set: the core plus every src module with a value import resolving to it; and the whole src walk. */
function admissionSet(): { readonly modules: readonly string[]; readonly src: readonly string[]; readonly unread: readonly string[] } {
  const unread: string[] = [];
  const src = walkTree("src", unread);
  const readers = src.filter(file => {
    if (file === CORE) return false;
    const structure = sourceStructure(REPO, file);
    if (!structure.ok) throw new Error(structure.why);
    return structure.imports.some(entry => !entry.typeOnly && entry.module.startsWith(".") && resolvedModule(file, entry.module) === CORE);
  });
  return { modules: [CORE, ...readers], src, unread };
}

// --- the provenance test's binding ------------------------------------------------------------------------------------------------------
/** The block's own identifiers that show it drives the fixtures through the core and the adapters. */
const BLOCK_READS: readonly string[] = ["NEGATIVE_FIXTURES", "PLACEMENTS", "DENIED_REQUESTS", "SUBJECTS", "decideOver", "minted"];
/** What the wb-pjj provenance test's source says of clause (a): its header word, how often it names this roster, the describe
 * titled for the clause and the registrations and identifiers inside it, and whether the cited file exports the cited predicate. */
function provenanceBinding(text: string = readRepo(PROVENANCE)): {
  readonly header: string;
  readonly roster: number;
  readonly suites: number;
  readonly registrations: number;
  readonly reads: readonly string[];
  readonly predicate: boolean;
} {
  const source = ts.createSourceFile(PROVENANCE, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let roster = 0;
  const suites: ts.CallExpression[] = [];
  const visit = (node: ts.Node): void => {
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && node.text.replace(/^\.\//, "test/") === ROSTER_FILE) roster += 1;
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "describe") {
      const title = node.arguments[0];
      if (title !== undefined && ts.isStringLiteral(title) && title.text === PROVENANCE_SUITE) suites.push(node);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  let registrations = 0;
  const names = new Set<string>();
  const inner = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      if (ts.isIdentifier(callee) && callee.text === "it") registrations += 1;
      if (ts.isCallExpression(callee) && ts.isPropertyAccessExpression(callee.expression) && ts.isIdentifier(callee.expression.expression) &&
        callee.expression.expression.text === "it" && callee.expression.name.text === "each") registrations += 1;
    }
    if (ts.isIdentifier(node)) names.add(node.text);
    ts.forEachChild(node, inner);
  };
  for (const suite of suites) {
    const body = suite.arguments[1];
    if (body !== undefined) inner(body);
  }
  return {
    header: /^\/\*\*\s*\*\s*(\S+)/.exec(text)?.[1] ?? "",
    roster,
    suites: suites.length,
    registrations,
    reads: BLOCK_READS.filter(name => names.has(name)),
    predicate: new RegExp(`^export function ${STATEMENT.predicate}\\(`, "m").test(readRepo(STATEMENT.file)),
  };
}

// --- the fixtures and the decision core -----------------------------------------------------------------------------------------------
function fixtureRead(): { readonly fixtures: readonly Fixture[]; readonly conditions: readonly string[]; readonly clock: number; readonly instant: string } {
  return { fixtures: ROSTER.fixtures, conditions: STATEMENT.conditions, clock: Date.parse(ROSTER.clock), instant: ROSTER.clock };
}
function fixtureNamed(condition: string): Fixture {
  const found = fixtureRead().fixtures.filter(fixture => fixture.condition === condition);
  const fixture = found.length === 1 ? found[0] : undefined;
  if (fixture === undefined) throw new Error(`the roster holds ${found.length} fixtures for ${condition}`);
  return fixture;
}
const receiptWindow = (record: JsonRecord): { readonly issuedAt: number; readonly expiresAt: number } => {
  const receipt = record.guardOrRelyReceipt;
  const value = typeof receipt === "object" && receipt !== null && !Array.isArray(receipt) ? receipt : {};
  return { issuedAt: Date.parse(String(value.issuedAt)), expiresAt: Date.parse(String(value.expiresAt)) };
};
const differing = (left: JsonRecord, right: JsonRecord): string[] =>
  [...new Set([...Object.keys(left), ...Object.keys(right)])].filter(key => JSON.stringify(left[key]) !== JSON.stringify(right[key])).sort();

/** The provenance test's world, restated here so the core is driven without that file: its workspace, run, request and clock. */
const PWS = "/tmp/provenance-ws";
const PSCOPE: ObservationScope = { workspace: PWS, principal: "operator" };
const P_AT = "2026-10-15T06:00:00Z";
const P_REQUESTED = "2026-10-15T07:00:00Z";
const P_DECIDED = "2026-10-15T07:00:01Z";
const P_RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: PWS };
const P_ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: PWS };
function coreProjection(): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of [P_RUN, P_ATTEMPT]) {
    projection.refresh({ source, scope: PSCOPE, capturedAt: P_AT, observedAt: P_AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
  }
  projection.relate({ scope: PSCOPE, from: P_RUN, to: P_ATTEMPT, kind: "ownership", provenance: { source: "furnace", observedAt: P_AT, nativeConfirmationRef: "frn-req-attempts-1" } });
  return projection;
}
function coreRequest(overrides: Partial<NativeControlRequest> = {}): NativeControlRequest {
  return {
    scope: { ...PSCOPE }, principal: { id: PSCOPE.principal, role: "local-operator" }, grants: ["observe:furnace.run.inspect", "control:furnace.stop"],
    target: { ...P_RUN }, action: "stop", params: { confirmed: true }, invocationId: "inv-provenance-1", requestedAt: P_REQUESTED, ...overrides,
  };
}
/** The eight requests the core denies, one per deny policy. */
const DENIALS: readonly Partial<NativeControlRequest>[] = [
  { grants: undefined }, { grants: ["observe:furnace.run.inspect"] }, { invocationId: "" }, { action: "start", grants: ["control:furnace.start"] },
  { grants: ["control:furnace.pause"] }, { target: { ...P_RUN, id: "frn-run-unseen" } }, { target: { ...P_ATTEMPT } }, { params: {} },
];
function paramsOf(base: NativeControlRequest): JsonRecord {
  const { params } = base;
  return typeof params === "object" && params !== null && !Array.isArray(params) ? { ...params } : {};
}
const PLACEMENTS: readonly (readonly [string, Carried, (base: NativeControlRequest, record: JsonRecord) => NativeControlRequest])[] = [
  ["beside the params", "metadata", (base, record) => ({ ...base, params: { ...paramsOf(base), assessment: record } })],
  ["beside the request's own fields", "metadata", (base, record) => Object.assign({}, base, { assessment: record })],
  ["beside the principal's id and role", "metadata", (base, record) => ({ ...base, principal: Object.assign({}, base.principal, { certificate: record }) })],
  ["as the operator confirmation", "in-place", (base, record) => ({ ...base, params: { confirmed: record } })],
  ["as one more grant", "in-place", (base, record) => ({ ...base, grants: [...(base.grants ?? []), JSON.stringify(record)] })],
];
function wrapperForms(record: JsonRecord, genuine: Permit): readonly (readonly [string, unknown])[] {
  return [
    ["the record itself", record],
    ["the record as a permit's receipt", Object.freeze({ decision: "permitted", receipt: record })],
    ["the genuine receipt beside the record", Object.freeze({ decision: "permitted", receipt: genuine.receipt, assessment: record })],
    ["the genuine permit's own fields beside the record", Object.freeze({ ...genuine, certificate: record })],
    ["a receipt whose ownership confirmation is the record", Object.freeze({ decision: "permitted", receipt: Object.freeze({ ...genuine.receipt, ownershipConfirmationRef: JSON.stringify(record) }) })],
  ];
}
interface Outcome {
  readonly label: string;
  readonly carried: Carried;
  readonly permittedRequest: boolean;
  readonly plain: ControlDecision;
  readonly decided: ControlDecision;
}
/** The real core over every fixture: the identity check on each wrapper, and each placement over the permitted request and the denials. */
function permitOutcomes(): { readonly genuine: ControlDecision; readonly wrappers: readonly (readonly [string, boolean])[]; readonly outcomes: readonly Outcome[] } {
  const decide = (request: NativeControlRequest): ControlDecision => decideControl(request, { projection: coreProjection(), now: () => P_DECIDED });
  const genuine = decide(coreRequest());
  if (genuine.decision !== "permitted") throw new Error("the provenance request no longer reads permitted");
  const { fixtures } = fixtureRead();
  const wrappers = fixtures.flatMap(({ id, record }) => wrapperForms(record, genuine).map(([form, value]) => [`${id}: ${form}`, isCoreMintedDecision(value)] as const));
  const requests: readonly (readonly [string, Partial<NativeControlRequest>])[] = [["the permitted request", {}], ...DENIALS.map((overrides, index) => [`denial ${index + 1}`, overrides] as const)];
  const outcomes = fixtures.flatMap(({ id, record }) =>
    PLACEMENTS.flatMap(([where, carried, place]) =>
      requests.map(([name, overrides]) => ({
        label: `${id} ${where} over ${name}`, carried, permittedRequest: name === "the permitted request",
        plain: decide(coreRequest(overrides)), decided: decide(place(coreRequest(overrides), record)),
      })),
    ),
  );
  return { genuine, wrappers, outcomes };
}

// --- the rf reader ----------------------------------------------------------------------------------------------------------------------
const RF_WS = "/tmp/cac-authorization-input-rf-ws";
const RF_SCOPE: ObservationScope = { workspace: RF_WS, principal: "local-operator:census" };
const RF_CONTEXT: ReactiveFiberTopologyContext = { scope: RF_SCOPE, seam: "rf-cli", capturedAt: "2026-10-15T10:00:00Z", observedAt: "2026-10-15T10:00:01Z" };
const RF_OPERATION = "rfo_0123456789abcdefghijkl";
const RF_WORKSPACE = "rfw_0123456789abcdefghijkl";
const RF_DENIAL_CODE = "RF_RENDER_FAILED";
function rfResult(over: JsonRecord = {}): JsonRecord {
  return {
    ephemeral: true, render_id: null, output: { text: "context" }, provenance: { graph_revision_id: `sha256:${"a1".repeat(32)}` },
    budget: { formula_terms: { context_window: 8192, output_reserve: 1024, occupied_tokens: 900, overhead: 100, safety_margin: 200, available_context_tokens: 5968 } },
    diagnostics_summary: { errors: 0, warnings: 0, has_errors: false, has_warnings: false },
    work: { source_capture_count: 3, fiber_signal_count: 5, component_render_count: 2, lens_resolution_count: 1, necessity_eval_count: 4, storage_write_count: 0 },
    blocks: [rfFixtureBlock()], necessity: [rfFixtureDecision()], ...over,
  };
}
function rfEnvelope(over: JsonRecord = {}): JsonRecord {
  return { schema: "reactive-fiber.cli/v1", ok: true, command: "context.render", operation_id: RF_OPERATION, workspace: { id: RF_WORKSPACE, root: RF_WS },
    transaction_id: null, result: rfResult(), diagnostics: [], ...over };
}
const rfReading = (source: JsonRecord, top: JsonRecord = {}): JsonRecord => ({ contract: "reactivefiber.render.preview/v1", workspaceRoot: RF_WS, source, ...top });
const rfPrimary = (over: JsonRecord = {}): JsonRecord => ({ code: RF_DENIAL_CODE, severity: "error", message: "render failed", hint: null, source: null, metadata: {}, ...over });
const rfDenial = (over: JsonRecord = {}): JsonRecord => rfEnvelope({ ok: false, result: null, diagnostics: [rfPrimary()], ...over });
const rfInfo = (record: JsonRecord): JsonRecord => ({ code: "RF_SOURCE_ASSESSMENT", severity: "info", message: String(record.status), hint: null, source: null, metadata: { assessment: record } });
/** The rf reader over one provider output, under the census's host context. */
const rfTopology = (reading: JsonRecord): ReactiveFiberProjectionTopology => reactivefiberTopology(reading, RF_CONTEXT);
/** The presentation the projection holds for a topology's snapshot: what a view renders. */
function presentationOf(topology: ReactiveFiberProjectionTopology): Presentation | undefined {
  const snapshot = topology.snapshots[0];
  if (snapshot === undefined) return undefined;
  const projection = new ObservationProjection();
  if (projection.refresh(snapshot) !== "applied") return undefined;
  const node = projection.query({ scope: RF_SCOPE, ref: snapshot.source, limit: 1 }).nodes[0];
  return node === undefined ? undefined : { ...node.presentation };
}
function thrownBy(read: () => unknown): unknown {
  try {
    read();
  } catch (error) {
    return error;
  }
  return undefined;
}
/** Every string a topology carries: what any surface could show of it. */
function surfaced(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (typeof value !== "object" || value === null) return [];
  const children: unknown[] = Object.values(value);
  return children.flatMap(surfaced);
}
/** The UNKNOWN record planted beside the refusal at each position the rf reader accepts. */
const DENIAL_PLANTS: readonly (readonly [string, (record: JsonRecord) => JsonRecord])[] = [
  ["beside the reading's own fields", record => rfReading(rfDenial(), { assessment: record })],
  ["in the primary diagnostic's metadata", record => rfReading(rfDenial({ diagnostics: [rfPrimary({ metadata: { assessment: record } })] }))],
  ["as a second, info diagnostic", record => rfReading(rfDenial({ diagnostics: [rfPrimary(), rfInfo(record)] }))],
  ["as the primary diagnostic's hint", record => rfReading(rfDenial({ diagnostics: [rfPrimary({ hint: `source check ${String(record.status)}` })] }))],
  ["as the primary diagnostic's message", record => rfReading(rfDenial({ diagnostics: [rfPrimary({ message: `render failed; source check ${String(record.status)}` })] }))],
];
/** ...and at three positions it refuses: the envelope's and the diagnostic's closed key sets, and a failed envelope's null result. */
const DENIAL_REFUSED: readonly (readonly [string, (record: JsonRecord) => JsonRecord])[] = [
  ["beside the envelope's eight keys", record => rfReading({ ...rfDenial(), assessment: record })],
  ["beside the primary diagnostic's six keys", record => rfReading(rfDenial({ diagnostics: [{ ...rfPrimary(), assessment: record }] }))],
  ["as the failed envelope's result", record => rfReading(rfDenial({ result: record }))],
];
/** The two source checks rf reports on an ok render: a failed check and an expired one. */
const CHECKS: readonly (readonly [string, JsonRecord])[] = [
  ["failed", { status: "denied", freshness: "captured_at_render", replayed: false, degraded: true }],
  ["expired", { status: "observed", freshness: "reused", replayed: true }],
];
const checkReading = (row: JsonRecord, top: JsonRecord = {}, result: JsonRecord = {}, diagnostics: JsonValue[] = []): JsonRecord =>
  rfReading(rfEnvelope({ result: rfResult({ observations: [row], ...result }), diagnostics }), top);
const CHECK_PLANTS: readonly (readonly [string, (row: JsonRecord, record: JsonRecord) => JsonRecord])[] = [
  ["beside the reading's own fields", (row, record) => checkReading(row, { assessment: record })],
  ["beside the result's own fields", (row, record) => checkReading(row, {}, { assessment: record })],
  ["beside the observation row's own fields", (row, record) => checkReading({ ...row, assessment: record })],
  ["in an info diagnostic's metadata", (row, record) => checkReading(row, {}, {}, [rfInfo(record)])],
];
/** A probability, likelihood or confidence a reader could synthesize: a percentage, a word of the family, an assignment or a bare
 * fraction of one (a dotted version such as 0.1.845 is not one). */
const PROBABILITY = /\d\s*%|\bprobab|\blikel(?:y|ihood)\b|\bchance\b|\bconfidence\b|\bp\s*[=:]\s*\d|(?<![\d.])0?\.\d+(?![\d.])/i;
const PROBABILITY_TEXTS: readonly string[] = ["success probability 0.97", "97% likely to succeed", "p=0.97", "confidence 0.9", "chance of success: high"];

// --- the docs page --------------------------------------------------------------------------------------------------------------------
/** The page's 'Authorization design' section through the shared rendered view: whether it binds, and its list items' rendered text. */
function docsBinding(): { readonly ok: boolean; readonly items: readonly string[] } {
  const section = docsSection(readRepo(DOCS_FILE), DOCS_HEADING, 2, [DOCS_PARENT]);
  return { ok: section.ok, items: section.blocks.flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : [])) };
}
/** The parked sentence's two terms: a bullet stating either is the sentence clause (d) asks for. */
const PARKED_TERMS = /authorization input|never softens/i;

// --- the cases ------------------------------------------------------------------------------------------------------------------------------
const IMPL: Readonly<Record<string, () => JsonValue>> = {
  A1: () => {
    const binding = provenanceBinding();
    expect(binding.header, "the file is the wb-pjj provenance test").toBe("wb-pjj");
    expect(binding.roster, "it reads this roster by path").toBeGreaterThanOrEqual(1);
    expect(binding.suites, "it registers one describe for clause (a)").toBe(1);
    expect(binding.registrations, "the describe registers its four cases").toBe(4);
    expect(binding.reads, "the cases read the fixtures and drive the core and the adapters").toEqual([...BLOCK_READS]);
    expect([STATEMENT.predicate, STATEMENT.file, binding.predicate], "the cited file exports the cited predicate").toEqual(["isCoreMintedDecision", CORE, true]);
    return { claim: claim("A1"), test: PROVENANCE, header: binding.header, roster: ROSTER_FILE, suite: PROVENANCE_SUITE, registrations: binding.registrations, reads: [...binding.reads], predicate: STATEMENT.predicate, core: STATEMENT.file };
  },
  A2: () => {
    const { fixtures, conditions, clock, instant } = fixtureRead();
    expect(fixtures.map(fixture => fixture.condition), "the fixtures are the clause's conditions, in order").toEqual([...conditions]);
    const members = ["record", ...RECORD.members, "status"].sort();
    for (const { id, record } of fixtures) {
      expect(Object.keys(record).sort(), `${id} holds the record's members exactly`).toEqual(members);
      expect(record.record, `${id} names the record`).toBe(RECORD.schema);
      expect(RECORD.statuses, `${id}'s status is one of the line's`).toContain(record.status);
      expect(record, `${id} is aimed at the provenance run`).toMatchObject({ sourceId: P_RUN.provider, principal: PSCOPE.principal, worldScope: PWS, memorylessWitness: { [`${P_RUN.id}:active`]: "stop" } });
    }
    expect(clock, "the roster's clock is the provenance request's instant").toBe(Date.parse(P_REQUESTED));
    const [pass, unknown, expired] = [fixtureNamed("PASS record").record, fixtureNamed("status UNKNOWN").record, fixtureNamed("expired guardOrRelyReceipt").record];
    const current = (record: JsonRecord): boolean => receiptWindow(record).issuedAt <= clock && clock < receiptWindow(record).expiresAt;
    expect([pass.status, current(pass)], "N1 is a PASS record with a current receipt").toEqual(["PASS", true]);
    expect([unknown.status, current(unknown)], "N2's status is UNKNOWN").toEqual(["UNKNOWN", true]);
    expect([expired.status, receiptWindow(expired).expiresAt <= clock], "N3's receipt expired before the clock").toEqual(["PASS", true]);
    expect([differing(pass, unknown), differing(pass, expired)], "each fixture isolates its condition").toEqual([["status"], ["guardOrRelyReceipt"]]);
    return { claim: claim("A2"), record: RECORD.schema, members: members.length, statuses: [...RECORD.statuses], conditions: [...conditions], clock: instant, isolated: ["status", "guardOrRelyReceipt"] };
  },
  A3: () => {
    const { genuine, wrappers, outcomes } = permitOutcomes();
    expect(isCoreMintedDecision(genuine), "the provenance request is permitted and minted (the core's control)").toBe(true);
    expect(wrappers.filter(([, minted]) => minted).map(([label]) => label), "no record or wrapper reads minted").toEqual([]);
    const permits = outcomes.filter(outcome => outcome.decided.decision === "permitted");
    expect(permits.filter(outcome => !(outcome.carried === "metadata" && outcome.permittedRequest)).map(outcome => outcome.label), "the only permits are the permitted request's own").toEqual([]);
    expect(outcomes.filter(outcome => outcome.carried === "metadata" && JSON.stringify(outcome.decided) !== JSON.stringify(outcome.plain)).map(outcome => outcome.label), "beside a request's fields a record changes no decision").toEqual([]);
    expect(outcomes.filter(outcome => outcome.carried === "in-place" && outcome.decided.decision !== "denied").map(outcome => outcome.label), "in place of a native value a record denies").toEqual([]);
    expect(permits.filter(outcome => !isCoreMintedDecision(outcome.decided)).map(outcome => outcome.label)).toEqual([]);
    const denied = outcomes.filter(outcome => outcome.decided.decision === "denied");
    return {
      claim: claim("A3"),
      fixtures: fixtureRead().fixtures.length,
      wrappers: wrappers.length,
      placements: PLACEMENTS.map(([where, carried]) => `${carried}:${where}`),
      requests: DENIALS.length + 1,
      permitted: permits.length,
      denied: denied.length,
      policies: [...new Set(denied.map(outcome => (outcome.decided.decision === "denied" ? outcome.decided.policy : "")))].sort(),
    };
  },
  B1: () => {
    const record = fixtureNamed("status UNKNOWN").record;
    const base = rfTopology(rfReading(rfDenial()));
    const shown = presentationOf(base);
    expect(base.snapshots[0]?.node, "the refusal renders failure with its code").toMatchObject({ statusTone: "failure", statusText: `refused · ${RF_DENIAL_CODE}` });
    expect(shown).toMatchObject({ statusTone: "failure", statusText: `refused · ${RF_DENIAL_CODE}` });
    const unchanged = DENIAL_PLANTS.map(([label, plant]) => {
      const topology = rfTopology(plant(record));
      expect(topology, `${label}: the snapshot is unchanged`).toStrictEqual(base);
      expect(presentationOf(topology), `${label}: the presentation is unchanged`).toStrictEqual(shown);
      return label;
    });
    const values = [record.record, record.status, record.policyEpoch, record.proofTier].map(String);
    const refused = DENIAL_REFUSED.map(([label, plant]) => {
      const error = thrownBy(() => rfTopology(plant(record)));
      expect(error, `${label}: refused`).toBeInstanceOf(CapabilityError);
      expect((error as CapabilityError).category, `${label}: refused as malformed`).toBe("validation");
      const message = (error as Error).message;
      expect(values.filter(text => message.includes(text)), `${label}: the refusal echoes nothing of the record`).toEqual([]);
      return label;
    });
    return { claim: claim("B1"), producer: base.snapshots[0]?.source.provider ?? "", status: String(record.status), tone: shown?.statusTone ?? "", text: shown?.statusText ?? "", unchanged, refused };
  },
  B2: () => {
    const clean = rfTopology(rfReading(rfEnvelope()));
    expect(clean.snapshots[0]?.node?.statusTone, "the reader renders success for a clean render (its control)").toBe("success");
    const fail = rfTopology(rfReading(rfDenial())).snapshots[0]?.node?.statusTone;
    expect(fail, "the refusal renders FAIL").toBe("failure");
    const records = [fixtureNamed("PASS record").record, fixtureNamed("expired guardOrRelyReceipt").record];
    const checks = CHECKS.map(([name, row]) => {
      const base = rfTopology(checkReading(row));
      expect(base.snapshots[0], `the ${name} check renders UNKNOWN`).toMatchObject({ coverage: "partial", node: { statusTone: "unknown" } });
      for (const record of records) {
        for (const [label, plant] of CHECK_PLANTS) expect(rfTopology(plant(row, record)), `${name} check, ${String(record.status)} record ${label}`).toStrictEqual(base);
      }
      return { check: name, tone: base.snapshots[0]?.node?.statusTone ?? "", coverage: base.snapshots[0]?.coverage ?? "" };
    });
    return { claim: claim("B2"), fail: fail ?? "", checks, clean: clean.snapshots[0]?.node?.statusTone ?? "", plants: CHECK_PLANTS.map(([label]) => label), records: records.length };
  },
  B3: () => {
    const records = fixtureRead().fixtures.map(fixture => fixture.record);
    const readings: ReactiveFiberProjectionTopology[] = [
      rfTopology(rfReading(rfDenial())),
      ...records.flatMap(record => DENIAL_PLANTS.map(([, plant]) => rfTopology(plant(record)))),
      ...CHECKS.flatMap(([, row]) => [rfTopology(checkReading(row)), ...records.flatMap(record => CHECK_PLANTS.map(([, plant]) => rfTopology(plant(row, record))))]),
      ...PROBABILITY_TEXTS.map(text => rfTopology(rfReading(rfDenial({ diagnostics: [rfPrimary({ message: text, hint: text, metadata: { estimate: text } })] })))),
    ];
    expect(PROBABILITY_TEXTS.filter(text => !PROBABILITY.test(text)), "the matcher reads each planted probability text").toEqual([]);
    const strings = readings.flatMap(surfaced);
    expect(strings.length, "the readings surface strings").toBeGreaterThan(readings.length);
    expect(strings.filter(text => PROBABILITY.test(text)), "no reading surfaces a probability").toEqual([]);
    expect(readings.filter(reading => reading.snapshots[0]?.node?.statusTone === "success").length, "no reading renders success").toBe(0);
    return {
      claim: claim("B3"),
      readings: readings.length,
      tones: [...new Set(readings.map(reading => reading.snapshots[0]?.node?.statusTone ?? ""))].sort(),
      planted: PROBABILITY_TEXTS.length,
      probability: strings.filter(text => PROBABILITY.test(text)).length,
    };
  },
  C1: () => {
    const { modules, src, unread } = admissionSet();
    expect(unread, "no symlink or special entry hides a src file").toEqual([]);
    expect(src.length, "the src walk meets its floor").toBeGreaterThanOrEqual(SRC_FLOOR);
    expect(src.filter(file => !file.endsWith(".ts")), "every src file is a module the reader parses").toEqual([]);
    expect([CORE, ...ADMISSION_ANCHORS].filter(file => !modules.includes(file)), "the derived set holds the core and its six readers").toEqual([]);
    const reads = modules.map(file => fieldReads(file, readRepo(file)));
    expect(reads.map(list => list.length >= 10), "every admission/decision module yields reads").toEqual(modules.map(() => true));
    expect(reads[0]?.map(read => read.name), "the core's reads include Pi's own principal (the reader's control on real code)").toContain("principal");
    expect(reads.flatMap(shaped), "no admission/decision path reads a record-shaped field").toEqual([]);
    expect(src.flatMap(file => shaped(fieldReads(file, readRepo(file)))), "no src module reads one").toEqual([]);
    const planted = PLANTED_READS.map(([, , text]) => shaped(fieldReads("plant.ts", text)).map(read => `${read.form}:${read.name}`));
    expect(planted, "each planted read form is flagged once").toEqual(PLANTED_READS.map(([form, name]) => [`${form}:${name}`]));
    return { claim: claim("C1"), core: CORE, anchors: ADMISSION_ANCHORS.length, modules: modules.length >= ADMISSION_ANCHORS.length + 1, src: true, judged: SHAPED.size, forms: [...new Set(PLANTED_READS.map(([form]) => form))] };
  },
  C2: () => {
    const line = recordLine();
    const family = schemaFamily();
    const definitions = definitionLines();
    expect(family, "the fixture record is one of the schema names the absence census judges").toContain(line.schema);
    expect(definitions.map(entry => entry.schema), "and one of the record lines the members come from").toContain(line.schema);
    expect(definitions.filter(entry => !family.includes(entry.schema)).map(entry => entry.site), "each such line's record is a judged schema name").toEqual([]);
    expect(readRepo(ABSENCE_CENSUS).includes(`"${ABSENCE_ROSTER_FILE}"`), "the absence census names that roster").toBe(true);
    expect(line.statuses, "the three-valued status is the line's").toEqual(["PASS", "FAIL", "UNKNOWN"]);
    expect([...new Set(definitions.flatMap(entry => entry.words))].sort(), "the one-word members are the shared names").toEqual([...SHARED]);
    const { src } = admissionSet();
    const read = new Set(src.flatMap(file => fieldReads(file, readRepo(file)).map(entry => entry.name)));
    expect(SHARED.filter(name => !read.has(name)), "src reads each shared name as a property").toEqual([]);
    expect(SHARED.filter(name => nativeMembers().includes(name)), "principal is a Pi-native interface member").toEqual(["principal"]);
    expect(family.every(name => SHAPED.has(name)) && JUDGED_FIELDS.every(name => SHAPED.has(name)), "the schema family joins the field reading").toBe(true);
    const words = src.flatMap(file => {
      const text = readRepo(file);
      return JUDGED_FIELDS.filter(name => WORD(name).test(text)).map(name => `${file}:${name}`);
    });
    expect(words, "no src file spells a judged member as a word").toEqual([]);
    expect(JUDGED_FIELDS.filter(name => !WORD(name).test(`const x = value.${name};`)), "the word reading reads each member (control)").toEqual([]);
    return {
      claim: claim("C2"),
      roster: ABSENCE_ROSTER_FILE,
      site: line.site,
      sha256: line.sha256,
      schema: line.schema,
      members: line.members.length,
      definitions: definitions.map(entry => `${entry.schema}:${entry.members.length}`),
      shared: [...SHARED],
      judged: JUDGED_FIELDS.length,
      family: family.length,
      words: words.length,
    };
  },
  D1: () => {
    const row = ROWS.find(entry => entry.id === "D");
    expect([row?.status, row?.reason?.startsWith("standing rule 3 ")], "clause (d) is parked under standing rule 3").toEqual(["parked", true]);
    const docs = docsBinding();
    expect(docs.ok, "the page's section binds in the rendered view").toBe(true);
    expect(docs.items.length, "the section's bullets are read").toBeGreaterThanOrEqual(8);
    expect(docs.items.filter(item => PARKED_TERMS.test(item)), "the parked sentence is not on the page (this cut adds none)").toEqual([]);
    return { claim: claim("D1"), status: "parked", page: DOCS_FILE, section: DOCS_HEADING, sentence: "absent" };
  },
};

// --- the residuals' quiet rows ----------------------------------------------------------------------------------------------------------
const QUIET: Readonly<Record<string, () => void>> = {
  "R-OTHER-PRODUCER": () => {
    // Row B's reader is rf's: a reading of another producer is outside its reach, refused before any tone is judged.
    const foreign = { contract: "furnace.run.show/v1", workspaceRoot: RF_WS, source: { ok: false, error: { code: "run_not_found" } } };
    const error = thrownBy(() => rfTopology(foreign));
    expect(error).toBeInstanceOf(CapabilityError);
    expect(rfTopology(rfReading(rfDenial())).snapshots.map(snapshot => snapshot.source.provider)).toEqual(["reactivefiber"]);
  },
  "R-SHARED-NAME": () => {
    const reads = fieldReads("quiet.ts", "export const read = (value: Record<string, unknown>) => [value.principal, value.status, value[\"principal\"]];\n");
    expect(reads.map(read => read.name), "the reader sees the reads").toEqual(["principal", "status", "principal"]);
    expect(shaped(reads), "and judges neither one-word member").toEqual([]);
    expect(SHARED.filter(name => JUDGED_FIELDS.includes(name))).toEqual([]);
  },
  "R-DYNAMIC-KEY": () => {
    const quiet = [
      'const key = "guardOr" + "RelyReceipt";',
      `export const read = (value: Record<string, unknown>, name: string) => [value[key], value[name], value[\`${"$"}{"proof"}Tier\`]];`,
      "",
    ].join("\n");
    expect(quiet).toContain("value[`$" + '{"proof"}Tier`]');
    expect(shaped(fieldReads("quiet.ts", quiet)), "a key the source does not spell as a literal escapes").toEqual([]);
    const literal = "export const read = (value: Record<string, unknown>) => [value[\"guardOrRelyReceipt\"], value[`proofTier`]];\n";
    expect(shaped(fieldReads("plant.ts", literal)).map(read => read.name), "the same keys spelled as literals are read").toEqual(["guardOrRelyReceipt", "proofTier"]);
  },
  "R-PROSE-RECORD": () => {
    expect(lineKinds().prose, "29 record lines define their records in prose").toBe(29);
    const reads = fieldReads("quiet.ts", "export const read = (value: Record<string, unknown>) => value.expiryTriggers;\n");
    expect(reads.map(read => read.name)).toEqual(["expiryTriggers"]);
    expect(shaped(reads), "a member named only in another record's prose is not judged").toEqual([]);
  },
  "R-UNVENDORED-MEMBERS": () => {
    const { identifiers, prose, headings } = lineKinds();
    expect([identifiers, prose, headings.length], "3 identifier lines, 29 prose lines, 18 headings: the roster's 50").toEqual([3, 29, 18]);
    expect(headings, "a heading's record lists its members on a line the roster does not vendor").toContain("03-contracts-api.md:18");
    const reads = fieldReads("quiet.ts", "export const read = (value: Record<string, unknown>) => value.closureVerdict;\n");
    expect(reads.map(read => read.name)).toEqual(["closureVerdict"]);
    expect(shaped(reads), "ObservationCertificateV1's closureVerdict (03-contracts-api.md:20, unvendored) is not judged").toEqual([]);
  },
  "R-HOLLOW-BINDING": () => {
    // The provenance block with every case body emptied: the binding still reads it bound, so A1 is no strength proof.
    const hollow = [
      "/**",
      " * wb-pjj (hollowed copy)",
      " */",
      'const NEGATIVE_FIXTURES = JSON.parse(readFileSync(new URL("./fixtures/cac-authorization-input-roster.json", import.meta.url), "utf8"));',
      `describe(${JSON.stringify(PROVENANCE_SUITE)}, () => {`,
      '  it("a", () => { void NEGATIVE_FIXTURES; void PLACEMENTS; void DENIED_REQUESTS; void decideOver; void minted; });',
      '  it("b", () => {});',
      '  it("c", () => {});',
      '  it.each(SUBJECTS)("d", () => {});',
      "});",
      "",
    ].join("\n");
    const binding = provenanceBinding(hollow);
    expect([binding.header, binding.roster, binding.suites, binding.registrations, binding.reads], "a hollowed block still reads bound").toEqual(["wb-pjj", 1, 1, 4, [...BLOCK_READS]]);
  },
};

// --- the self-read ------------------------------------------------------------------------------------------------------------------------
/** The identifiers each IMPL entry names, read from this file's own source. */
function implReads(): Record<string, string[]> {
  const source = ts.createSourceFile(SELF, readFileSync(HERE, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const reads: Record<string, string[]> = {};
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "IMPL" && node.initializer !== undefined && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) {
        if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) continue;
        const names = new Set<string>();
        const collect = (inner: ts.Node): void => {
          if (ts.isIdentifier(inner)) names.add(inner.text);
          ts.forEachChild(inner, collect);
        };
        collect(property.initializer);
        reads[property.name.text] = [...names].sort();
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return reads;
}
/** The labels tile the clause when each follows the last with only white space, commas, semicolons and list markers between. */
const LIST_SEPARATOR = /^(?:[\s,;]|\([a-z]\)(?=\s))*$/;
/** A row's pin quotes tile its label with the same separators and a spaced hyphen. */
const PIN_SEPARATOR = /^(?:[\s,;]|-(?=\s))*$/;
function tiled(text: string, parts: readonly string[], separator: RegExp): boolean {
  let cursor = 0;
  for (const part of parts) {
    const at = text.indexOf(part, cursor);
    if (at < 0 || !separator.test(text.slice(cursor, at))) return false;
    cursor = at + part.length;
  }
  return separator.test(text.slice(cursor));
}
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

const JUDGED = new Set<string>();
const REACHED = new Set<string>();
const QUIETED = new Set<string>();

describe("wb-rdlh.1 Library design-program authorization-input census (LIBRARY-COMPOSITIONAL-AUTONOMOUS-COMPUTATION-R1)", () => {
  it("judged set, frozen shape: ROWS pins its own row/pin-count and status literals", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:3", "C:2", "D:1"]);
    expect(ROWS.map(row => `${row.id}:${row.status}`)).toEqual(["A:pinned", "B:pinned", "C:pinned", "D:parked"]);
    expect(ROWS.filter(row => (row.status === "parked") !== (row.reason !== undefined)).map(row => row.id), "a reason exactly on a parked row").toEqual([]);
  });

  it("judged set, roster: ROWS, the IMPL keys and the residuals equal the roster's copy", () => {
    expect(ROWS).toEqual(ROSTER.rows.map(({ pins, ...row }) => ({ ...row, pins: pins.map(pin => ({ id: pin.id, quote: pin.quote })) })));
    expect(Object.keys(IMPL).sort()).toEqual(pinIds());
    expect([ROSTER.bead, ROSTER.producer, ROSTER.filing.export, ROSTER.record.roster]).toEqual([BEAD, "Library", EXPORT_FILE, ABSENCE_ROSTER_FILE]);
    expect(ROSTER.fixtures.map(fixture => fixture.id)).toEqual(["N1", "N2", "N3"]);
    expect(ROSTER.residuals.map(item => item.id)).toEqual(Object.keys(QUIET));
  });

  it("judged set, outside anchors: the owner filing tiles the labels and yields the quote the first vendored line holds", () => {
    const text = filing(BEAD, ROSTER.filing.paragraphs);
    expect(sha256(text), "the owner filing is the text the roster measured").toBe(ROSTER.filing.sha256);
    expect(text.includes(`@${ROSTER.pin.slice(0, 12)}`), "the filing cites the Library pin").toBe(true);
    expect(text.includes(`${ROSTER.program}/`), "the filing cites the roster's program directory").toBe(true);
    expect(tiled(STATEMENT.acceptance, ROWS.map(row => row.label), LIST_SEPARATOR), "the row labels tile the filing's acceptance clause").toBe(true);
    expect(ROWS.map(row => tiled(row.label, row.pins.map(pin => pin.quote), PIN_SEPARATOR)), "each row's quotes tile its label").toEqual(ROWS.map(() => true));
    expect(ROSTER.citations.map(span => [span.site, sha256(Buffer.from(span.textBase64, "base64")) === span.sha256]), "each vendored line is the line measured at the pin").toEqual(
      ROSTER.citations.map(span => [span.site, true]),
    );
    const [quote] = ROSTER.citations;
    expect([quote?.site, quote === undefined ? "" : vendored(quote)], "the first vendored line is the filing's quote, verbatim").toEqual([STATEMENT.quoteSite, STATEMENT.quote]);
  });

  it("judged set, self-read: every IMPL entry names a reader and not the roster", () => {
    const reads = implReads();
    expect(Object.keys(reads).sort()).toEqual(pinIds());
    expect(
      Object.entries(reads)
        .filter(([, names]) => !names.some(name => READERS.includes(name)) || names.includes("ROSTER"))
        .map(([pin]) => pin),
    ).toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 180_000 }, () => {
          JUDGED.add(pin.id);
          const impl = IMPL[pin.id];
          expect(impl).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(isRecord(witness) ? witness.claim : undefined).toBe(claim(pin.id));
          const held = ROSTER.rows.flatMap(entry => entry.pins).find(entry => entry.id === pin.id);
          expect(witness).toEqual(held?.witness);
          REACHED.add(pin.id);
        });
      }
    });
  }

  describe("residuals: each named family's quiet row", () => {
    for (const [id, quiet] of Object.entries(QUIET)) {
      it(id, () => {
        quiet();
        QUIETED.add(id);
      });
    }
  });

  it("records: every pin and every quiet row ran its own case to the end", () => {
    expect([...JUDGED].sort()).toEqual(pinIds());
    expect([...REACHED].sort()).toEqual(pinIds());
    expect([...QUIETED].sort()).toEqual(Object.keys(QUIET).sort());
  });
});
