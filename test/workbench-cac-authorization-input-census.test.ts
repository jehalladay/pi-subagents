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
 * MEASURED AT 04123dc0d0f2 (trunk tip at the first cut's claim, landing 671), re-measured at 57cb1c0ca9a4 (landing 677) and
 * aa95f436d802 (landing 678) for the second cut, at c2695d76773c (landing 686), a9bfea3f49c4 (landing 688) and cdf5484d8d1b (landing
 * 689) for the third and at 3c9db90d55f3 (landing 717) for this one, each merged into the branch: no src path and no other path this
 * census reads changed among the seven but the bead export, of which it reads the wb-rdlh.1 row's first seven paragraphs, unchanged
 * (the row gained notes after them), and, at landing 691 (wb-ycue), the absence roster (a followUp block and two residual families;
 * its 50 vendored lines, all this census reads of it, unchanged) and the absence census (which still names that roster, all this
 * census reads of it); docs/workbench/18-decisions-and-risks.md, which it does not read, gained two lines at landing 673. Not pinned:
 * src/workbench/control.ts:255 declares the filing's cited predicate (export function isCoreMintedDecision); src holds 117 files,
 * every one a .ts module, no symlink; the core and the
 * six modules with a value import of it (claude-control, control-reply, control-tool, detached-control, forge-control and
 * furnace-control under src/workbench; src/workflow/task.ts imports a type only) form the admission/decision set; the three record
 * lines name 40 distinct camel- or Pascal-case members and the absence roster's lines 50 distinct schema names, none of the 90
 * spelled in src as a word (git grep -w over src), and two one-word
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
 * - FIELDS (row C): what a src module spells, from its TypeScript AST over decoded names (a unicode escape in an identifier or a
 *   string reads as the character it encodes): the name of a member access (optional chains included) and the last part of a
 *   qualified name (a type query such as typeof value.member); every object binding pattern's identifier key (a parameter, a
 *   declaration, a for-of head or a catch clause; renamed or shorthand); an object literal's identifier key when a destructuring
 *   assignment writes to the literal (the left of `=`, a default inside a pattern included, a for-of head, or a property value, an
 *   element or an array spread inside such a target; renamed or shorthand); and EVERY string literal and no-substitution template
 *   literal in the module's code (a comment, JSDoc included, is the WORDS reading's), wherever it sits, read through the parentheses
 *   and the as, satisfies, non-null and angle-bracket type assertions around it and attributed by where it stands: an element access
 *   key (element), an `in` test's left operand (in), a binding pattern's string or computed key (binding), an assignment pattern's
 *   string or computed key (assignment), and any other position (literal: the key of an own-key call, direct, through .call or
 *   .apply or through an alias, a comparison or case operand, a collection entry, a type). A record-shaped field is one of the 40
 *   members (the identifier members of the three record lines that list them) or one of the 50 schema names of the absence roster's
 *   two line sets. The admission/decision set is derived: the core plus every src module with a value import that resolves to it.
 * - WORDS (row C): each src file's raw text, for every record-shaped name spelled as a word (not preceded or followed by an
 *   identifier character), in code, strings, comments and patterns alike; it complements FIELDS, which reads decoded names that the
 *   raw text does not spell.
 * - DOCS (row D): the page's 'Authorization design' section, read through marked's own tokens of the page (marked 18.0.11, the lexer
 *   the shared rendered view runs) and only where those tokens carry the page. TILING: the page's top-level token raws, re-joined, are
 *   the page itself, or D1 reds (untiled), wherever on the page the departure sits; the lexer departs from the page in the two ways
 *   refusal #3 measured, and each reds D1 so: it rewrites every CR and CRLF to LF before it tokenizes, so no raw carries a CR, and it
 *   consumes a link reference definition whose label repeats an earlier definition's without a token, so no raw carries its text.
 *   BINDING, twice over one page: the shared view (test/helpers/census.ts docsSection) gives the section's blocks, and the token view
 *   gives the heading token and the section's tokens, the top-level tokens after the one top-level level-2 heading of that rendered
 *   text up to the next top-level level-1 or level-2 heading; D1 reds when the shared view refuses the section (by its own binding
 *   rules) and when the token view finds no such heading or more than one. TERMS: either of the parked sentence's two terms
 *   ('authorization input', 'never softens', spelled out, in any letter case, every run of white space in the text, what JavaScript's \s
 *   matches, read as one space) in what a block states (a heading, a paragraph, a code block, a block quote or a table by its rendered
 *   text, and each list item, its nested items included, by its rendered text; an HTML block renders none) or in an attribute the rendered text drops, read from the tokens of
 *   the heading and of every block (nested blocks, list items and table cells included): a link's destination and title, a reference
 *   link's as they resolve against the page's definitions wherever those sit, an image's source and title (its alt text is rendered
 *   text), a link reference definition's label, destination and title, a fenced code block's info string, and an HTML block's, tag's or
 *   comment's source, each as the lexer carries it, so a term spelled otherwise (an entity, a percent-escape, an invisible character between its
 *   words, a paraphrase) is no term and only the shape reads its edit. SHAPE: the section against its shape frozen at this cut's base:
 *   one list of the eight bullets and no other block, HTML-free (no HTML block, tag or comment in it), the bullets' rendered text held to
 *   a sha-256, and the section's source, the heading token's and the section's tokens' raws re-joined, held to a second sha-256; on a
 *   page those tokens tile, that source is the page's own text from the section's heading line up to the next top-level level-1 or
 *   level-2 heading. CHECKS: D1 names every check a reading fails, in this order (DOCS_CHECKS): view, tokens and untiled (the binding and
 *   the tiling), html, blocks, bullets, rendered and source (the shape) and terms; each holds on the page and fails on one docs plant at
 *   least.
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
 *    principal), none reads a record-shaped field, and neither does any src module; the reader's 53 controls (one synthetic module
 *    each) flag every form, position, wrapper and escape FIELDS names, each at its form; and the reader flags each of refusal #1's
 *    plants at its form (P1-P11 and O1-O4, the gate's modules verbatim) and both of its core plants inside the core's own text.
 *    C2 the tie to R2: the fixture record is the absence roster's own vendored line (held to the sha-256 this roster measured)
 *    and a schema name that census judges, as is each record line the members come from; its census names that roster; the
 *    three-valued status is the line's; the one-word members are exactly the shared names, each one src reads as a property (in a
 *    form other than a bare literal); the schema family of both line sets joins the field reading; and the word reading covers
 *    every record-shaped name (the 40 members and the 50 schema names), finds none spelled in src, and reads the name in each of
 *    refusal #1's plants.
 *  D. PARKED, never counted satisfied: clause (d) asks for a sentence on the W19 security-design page; standing rule 3 (the user's W19
 *    INPUT HYGIENE order) keeps agents to product input-hygiene tests, so the sentence and its wb-gs2.3 census row are the owner's. D1
 *    holds the parked state: the row carries that reason, the page's tokens tile it, the section binds in both views, no attribute the
 *    TERMS reading reads exists in the section or its heading, neither term sits in any block, and the page fails no check. So a cut
 *    that edits the section's source (a bullet added, removed, reworded or re-marked; a block added or the list removed; a link, an
 *    image, a definition or HTML added; white space changed; the heading line edited; the clause (d) sentence added in any form or
 *    wording) reds D1 and binds this row in the same commit: as untiled when the edit is one the tokens do not carry (a CR, a CRLF, a
 *    definition whose label repeats one), by source otherwise, and by each further check it fails; the sentence's terms spelled out in a
 *    block or an attribute red it by terms as well. Its controls (DOCS_PLANTS: each the page with one edit made in
 *    memory, and every check it fails) are refusal #1's docs plants (the sentence as a bullet, a nested item, a paragraph, a block quote
 *    and an HTML block, and the paraphrase as a bullet); refusal #2's (the sentence as a link title in the first bullet, L2-D1; as a
 *    reference link's title with its definition after the page's last line, L2-D1b; as an empty-alt image's title, L2-D3) with that
 *    gate's two controls (the sentence's first clause as an image's alt text, L2-D2; a definition inside the section, L2-D4); refusal
 *    #3's (the sentence as a repeated definition's title in place of the blank line after the heading, L2G-DUPDEF; a CR on the second
 *    bullet's line, on the blank line after the heading and on the eight section lines no anchor sits on, L2G-CR-BULLET2, L2G-CR-BLANK
 *    and L2G-CRLF-BODY), each untiled alone, as is a lone CR in place of the second bullet's LF (LONE-CR), with that gate's three controls (the same definition with no earlier label, L2G-DUPDEF-NOOUT;
 *    a space where the CR went, L2G-SPACE-BULLET2 and L2G-SPACE-BLANK) and the same two departures outside the section (a CR on the
 *    page's title line, CR-OUTSIDE; a repeated definition after the page's last line, DUPDEF-OUTSIDE), untiled alone too; the paraphrase
 *    inside the eighth bullet; the sentence, a clause or a term of it as a table cell, a code block, a subsection heading, an HTML comment
 *    and an HTML tag's title in a bullet, a link's and an image's destination, a definition's label and destination, a code block's info
 *    string, and a link title on the section's own heading, in a nested item, in a block quote and in a table cell; a term in mixed case,
 *    a term split by a line break, two spaces or a no-break space in a link title, by a tab in a definition's title (in a bullet the
 *    lexer carries a tab as spaces), and by a line break in an HTML tag's title and in a code block, each read as the term; eight edits no term reads: a term spelled with an entity, a term percent-escaped in a
 *    destination, a link title stating the paraphrase, a term split by a zero-width space in a link title, an emphasis added, a hard line
 *    break, a task box and the heading's closing hashes; a bullet removed and the list removed; and four binding edits: the heading's
 *    space spelled as an entity, which the shared view reads as the heading and the token view does not; the heading repeated after the
 *    page's last line, which both views refuse; a level-1 heading placed above the section, which re-homes it in the shared view; and
 *    the heading repeated inside a block quote after the page's last line, which the shared view counts and the token view, reading
 *    top-level headings only, does not.
 *    D1 reads that one section (R-OTHER-SECTION).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` and `${id}:${status}` as literals and equals the roster's copy
 * (beside each pin's witness). OUTSIDE ANCHORS: the owner filing in the tracked export (its seven paragraphs, each trimmed, held to
 * the roster's sha-256): its acceptance clause is tiled by the labels, its clause (a) yields the fixture conditions, the cited
 * predicate and file, its quote paragraph yields the first vendored line's text and site, and it cites the Library pin, so a pin or
 * a row removed from every census literal and from the roster still reds against the owner's text; the absence roster's vendored
 * lines yield the records, their members and the statuses; the src tree yields the admission/decision set; and the docs page's
 * section yields D1's frozen shape.
 * SELF-READ: the judged set parses this file's IMPL and requires every pin to name one of READERS and not ROSTER (direct
 * identifiers only, R-HOLLOW-IMPL); each pin's witness carries the digest of its own quote; the records case requires every pin and
 * every quiet row to have run to its end; and the residual ids this header's RESIDUALS paragraph names, in order, must equal QUIET's
 * keys and the roster's.
 * RESIDUALS (named families, each with a pinned quiet row in QUIET): R-OTHER-PRODUCER row B reads rf's refusal only; R-SHARED-NAME
 * a one-word member (principal, status) is not judged by name; R-DYNAMIC-KEY a key the source never spells whole, as a literal or
 * as a word (a variable, a concatenation, a template with a substitution, its head spelling the name whole included, a fragment
 * matched by a string method or a pattern, the whole name in a pattern before its end anchor, a constant imported from outside src),
 * escapes both the field and the word reading;
 * R-PROSE-RECORD a member the program names only in prose is not read;
 * R-UNVENDORED-MEMBERS the members of the 18 records whose vendored line is a heading are not read; R-HOLLOW-BINDING A1 binds the
 * provenance cases by presence and reads, so a case hollowed in place still reads bound; R-HOLLOW-IMPL SELF-READ judges an IMPL
 * entry by the identifiers it names, so an entry that names a reader beside a constant witness still reads bound; R-OTHER-SECTION
 * D1 reads the 'Authorization design' section only (a definition elsewhere only as a link of the section resolves to it, and the
 * tiling page-wide), so, on a page its tokens tile, the sentence placed outside the section's source, on another section of the page
 * (a level-1 or level-2 heading placed after the section's last block starts one, and the section's heading text set as a level-3
 * heading starts none; HTML wrapped around the section sits in its neighbours) or on another page, is not read. The list's anchors
 * are this paragraph, QUIET and the roster, which one coordinated edit changes together: the program states no residual list to
 * anchor it outside the cut.
 * Display paths added: none. Test-only: no scratch (every synthetic module is parsed in memory); src, the docs, both rosters, the
 * two test sources it binds and the bead export are only read.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { type ControlDecision, decideControl, isCoreMintedDecision, type NativeControlRequest } from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Presentation } from "../src/workbench/observation.js";
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { docsSection, type RenderedBlock, sourceStructure } from "./helpers/census.js";
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
type ReadForm = "member" | "element" | "binding" | "assignment" | "in" | "literal";
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
type Outer = ts.ParenthesizedExpression | ts.AsExpression | ts.SatisfiesExpression | ts.NonNullExpression | ts.TypeAssertion;
/** The wrappers a key is read through: parentheses and the as, satisfies, non-null and angle-bracket type assertions. */
const isOuter = (node: ts.Node): node is Outer =>
  ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node);
/** The outermost expression a node stands as, through every wrapper around it. */
function outermost(node: ts.Node): ts.Node {
  let current = node;
  while (isOuter(current.parent) && current.parent.expression === current) current = current.parent;
  return current;
}
/** An object or array literal a destructuring assignment writes to: the left of `=` (a default inside a pattern included), a for-of
 * head, or a property value, an element or a spread inside such a target. */
function assignmentTarget(node: ts.Node): boolean {
  const current = outermost(node);
  const parent = current.parent;
  if (ts.isBinaryExpression(parent)) return parent.operatorToken.kind === ts.SyntaxKind.EqualsToken && parent.left === current;
  if (ts.isForOfStatement(parent)) return parent.initializer === current;
  if (ts.isPropertyAssignment(parent)) return parent.initializer === current && assignmentTarget(parent.parent);
  if (ts.isSpreadAssignment(parent) || ts.isSpreadElement(parent)) return assignmentTarget(parent.parent);
  if (ts.isArrayLiteralExpression(parent)) return assignmentTarget(parent);
  return false;
}
/** Where a string literal stands, through its wrappers: an element access key, an `in` test's left operand, a binding or
 * assignment pattern's string or computed key, or any other position (literal). */
function literalForm(node: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral): ReadForm {
  const key = outermost(node);
  const parent = key.parent;
  if (ts.isElementAccessExpression(parent) && parent.argumentExpression === key) return "element";
  if (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.InKeyword && parent.left === key) return "in";
  const name = ts.isComputedPropertyName(parent) ? parent : key;
  const holder = name.parent;
  if (ts.isBindingElement(holder) && holder.propertyName === name && ts.isObjectBindingPattern(holder.parent)) return "binding";
  if (ts.isPropertyAssignment(holder) && holder.name === name && assignmentTarget(holder.parent)) return "assignment";
  return "literal";
}
/** Every property read and every string literal one module spells, read from its TypeScript AST over decoded names (the FIELDS
 * reading). */
function fieldReads(file: string, text: string): FieldRead[] {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const reads: FieldRead[] = [];
  const add = (node: ts.Node, name: string, form: ReadForm): void => {
    reads.push({ file, line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1, name, form });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAccessExpression(node)) add(node.name, node.name.text, "member");
    else if (ts.isQualifiedName(node)) add(node.right, node.right.text, "member");
    else if (ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent)) {
      const key = node.propertyName ?? node.name;
      if (ts.isIdentifier(key)) add(key, key.text, "binding");
    } else if (ts.isObjectLiteralExpression(node) && assignmentTarget(node)) {
      for (const property of node.properties) {
        if (ts.isShorthandPropertyAssignment(property)) add(property.name, property.name.text, "assignment");
        else if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name)) add(property.name, property.name.text, "assignment");
      }
    } else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) add(node, node.text, literalForm(node));
    ts.forEachChild(node, visit);
  };
  visit(source);
  return reads;
}
/** One synthetic module per read form and spelling, each reading one record-shaped name: the reader's positive controls. */
const PLANTED_READS: readonly (readonly [ReadForm, string, string])[] = [
  ["member", "guardOrRelyReceipt", "export const read = (value: Record<string, unknown>) => value.guardOrRelyReceipt;\n"],
  ["member", "proofTier", "export const read = (value?: Record<string, unknown>) => value?.proofTier;\n"],
  ["member", "selectorTVBound", "export const read = (value: Record<string, unknown>) => value.selectorTVBound;\n"],
  ["member", "admissionVerdict", "export const read = (value: Record<string, unknown>) => value.admissionVerdict;\n"],
  ["member", "SourceBeliefSafetyCertificateV1", "export const read = (value: Record<string, unknown>) => value.SourceBeliefSafetyCertificateV1;\n"],
  ["member", "worldScope", "declare const value: Record<string, unknown>;\nexport type Read = typeof value.worldScope;\n"],
  ["member", "branchEffects", "export const read = (value: Record<string, unknown>) => value.branchEffect\\u0073;\n"],
  ["element", "modelCoverage", 'export const read = (value: Record<string, unknown>) => value["modelCoverage"];\n'],
  ["element", "policyEpoch", "export const read = (value: Record<string, unknown>) => value[`policyEpoch`];\n"],
  ["element", "checkerPolicySnapshot", 'export const read = (value: Record<string, unknown>) => value[("checkerPolicySnapshot")];\n'],
  ["element", "clientBoundaryVersion", 'export const read = (value: Record<string, unknown>) => value["clientBoundaryVersion" as const];\n'],
  ["element", "currentUsePredicate", 'export const read = (value: Record<string, unknown>) => value["currentUsePredicate" satisfies string];\n'],
  ["element", "exactPredicateRef", 'export const read = (value: Record<string, unknown>) => value["exactPredicateRef"!];\n'],
  ["element", "inductiveInvariantRef", 'export const read = (value: Record<string, unknown>) => value[<const>"inductiveInvariantRef"];\n'],
  ["element", "validityHorizon", 'export const read = (value?: Record<string, unknown>) => value?.["validityHorizon"];\n'],
  ["element", "realizationRef", 'export const read = (value: Record<string, unknown>) => value["realizationR\\u0065f"];\n'],
  ["binding", "legalActionSets", "export const read = ({ legalActionSets }: Record<string, unknown>) => legalActionSets;\n"],
  ["binding", "originalEvidenceSnapshot", "export const read = ({ originalEvidenceSnapshot: snapshot }: Record<string, unknown>) => snapshot;\n"],
  ["binding", "observableEventSchema", 'export const read = ({ ["observableEventSchema"]: schema }: Record<string, unknown>) => schema;\n'],
  ["binding", "partialWriteDependencies", 'export const read = ({ "partialWriteDependencies": dependencies }: Record<string, unknown>) => dependencies;\n'],
  ["binding", "revocationHandling", 'export const read = ({ [("revocationHandling" as const)]: handling }: Record<string, unknown>) => handling;\n'],
  ["binding", "selectionKernelRef", "export const read = (list: Record<string, unknown>[]) => { for (const { selectionKernelRef } of list) return selectionKernelRef; };\n"],
  ["binding", "ObserverDependenceV2", "export const read = (value: Record<string, unknown>) => { const { ObserverDependenceV2: dependence } = value; return dependence; };\n"],
  ["binding", "ConcurrentSwapCertificateV1", "export const read = (run: () => void) => { try { run(); } catch ({ ConcurrentSwapCertificateV1 }) { return ConcurrentSwapCertificateV1; } };\n"],
  ["assignment", "selectorOperationalReads", "export const read = (value: Record<string, unknown>) => { let reads: unknown; ({ selectorOperationalReads: reads } = value); return reads; };\n"],
  ["assignment", "selectorSemanticDependencies", "export const read = (value: Record<string, unknown>) => { let selectorSemanticDependencies: unknown; ({ selectorSemanticDependencies } = value); return selectorSemanticDependencies; };\n"],
  ["assignment", "sourceAuthorityRefs", 'export const read = (value: Record<string, unknown>) => { let refs: unknown; ({ ["sourceAuthorityRefs" as const]: refs } = value); return refs; };\n'],
  ["assignment", "sourceGuardReceipt", 'export const read = (value: Record<string, unknown>) => { let receipt: unknown; ({ "sourceGuardReceipt": receipt } = value); return receipt; };\n'],
  ["assignment", "sourceRevisions", "export const read = (list: Record<string, unknown>[]) => { let revisions: unknown; for ({ sourceRevisions: revisions } of list) break; return revisions; };\n"],
  ["assignment", "unionWrites", "export const read = (list: Record<string, unknown>[]) => { let writes: unknown; [{ unionWrites: writes }] = list; return writes; };\n"],
  ["assignment", "winningSupportFixedPoint", "export const read = (value: Record<string, unknown>) => { let point: unknown; ({ outer: { winningSupportFixedPoint: point } } = { outer: value }); return point; };\n"],
  ["assignment", "ObserverQuotientCertificateV1", "export const read = (value: Record<string, unknown>) => { let quotient: unknown; ({ outer: { ObserverQuotientCertificateV1: quotient } = {} } = { outer: value }); return quotient; };\n"],
  ["assignment", "DistinguishabilityHypergraphCertificateV1", "export const read = (list: unknown[]) => { let certificate: unknown; [...[{ DistinguishabilityHypergraphCertificateV1: certificate }]] = [list]; return certificate; };\n"],
  ["in", "memorylessWitness", 'export const read = (value: object) => "memorylessWitness" in value;\n'],
  ["in", "observableChoiceTraceRef", 'export const read = (value: object) => ("observableChoiceTraceRef" as const) in value;\n'],
  ["literal", "supportUpdate", 'export const read = (value: object) => Object.hasOwn(value, "supportUpdate");\n'],
  ["literal", "sourceId", 'export const read = (value: object) => Reflect.get(value, "sourceId");\n'],
  ["literal", "initialBeliefSupport", 'export const read = (value: object) => value.hasOwnProperty("initialBeliefSupport");\n'],
  ["literal", "exactOrApproximateLocalityBound", 'export const read = (value: object) => Object.prototype.hasOwnProperty.call(value, "exactOrApproximateLocalityBound");\n'],
  ["literal", "completeTransitionSupportEvidence", 'export const read = (value: object) => Object.getOwnPropertyDescriptor(value, "completeTransitionSupportEvidence");\n'],
  ["literal", "activeSupportPolicy", 'export const read = (value: object) => Reflect.has(value, "activeSupportPolicy");\n'],
  ["literal", "HardOKProofRefs", 'export const read = (value: object) => Reflect.getOwnPropertyDescriptor(value, "HardOKProofRefs");\n'],
  ["literal", "branchRefs", 'export const read = (value: object) => value.propertyIsEnumerable("branchRefs");\n'],
  ["literal", "completenessProofRefOfEnvironmentTransitionRelation", 'export const read = (value: object) => Object.prototype.propertyIsEnumerable.call(value, "completenessProofRefOfEnvironmentTransitionRelation");\n'],
  ["literal", "ChoiceCertificateV2", 'export const read = (value: object) => Object.hasOwn.call(null, value, "ChoiceCertificateV2");\n'],
  ["literal", "TemporalRelianceCertificateV1", 'export const read = (value: object) => Reflect.get.apply(Reflect, [value, "TemporalRelianceCertificateV1"]);\n'],
  ["literal", "ObservationCertificateV1", 'const own = Object.hasOwn;\nexport const read = (value: object) => own(value, "ObservationCertificateV1");\n'],
  ["literal", "EvidenceCertificateV1", 'export const read = (value: object) => Object.keys(value).includes("EvidenceCertificateV1");\n'],
  ["literal", "CapabilityBoundaryV1", 'export const read = (key: string) => key === ("CapabilityBoundaryV1" as string);\n'],
  ["literal", "TypedEffectContractV2", 'export const read = (key: string) => { switch (key) { case "TypedEffectContractV2": return true; default: return false; } };\n'],
  ["literal", "EvidenceClaimV2", 'export type Read = Record<string, unknown>["EvidenceClaimV2"];\n'],
  ["literal", "ReplacementAssessmentV2", "export const read = (value: Record<string, unknown>) => value[String.raw`ReplacementAssessmentV2`];\n"],
  ["literal", "ChoiceTransportCertificateV1", 'export const read = () => new Map([["ChoiceTransportCertificateV1", true]]);\n'],
];
/** The refusal-#1 plants (gate s137 LEG 2: U1's P1-P11 and F3's O1-O4), each the gate's synthetic module verbatim, with the read the
 * field reading must flag in it. */
const GATE_HEAD = "export const read = (value: Record<string, unknown>): unknown => ";
const REFUSAL_PLANTS: readonly (readonly [string, string, string])[] = [
  ["P1", "element:guardOrRelyReceipt", `${GATE_HEAD}value[("guardOrRelyReceipt")];\n`],
  ["P2", "element:policyEpoch", `${GATE_HEAD}value["policyEpoch" as const];\n`],
  ["P3", "element:proofTier", `${GATE_HEAD}value["proofTier" as keyof typeof value];\n`],
  ["P4", "element:modelCoverage", `${GATE_HEAD}value["modelCoverage"!];\n`],
  ["P5", "in:memorylessWitness", 'export const read = (value: object): boolean => ("memorylessWitness") in value;\n'],
  ["P6", "binding:checkerTier", 'export const read = ({ [("checkerTier")]: tier }: Record<string, unknown>): unknown => tier;\n'],
  ["P7", "literal:supportUpdate", 'export const read = (value: object): unknown => Object.hasOwn.call(null, value, "supportUpdate");\n'],
  ["P8", "literal:sourceId", 'export const read = (value: object): unknown => Reflect.get.call(Reflect, value, "sourceId");\n'],
  ["P9", "element:SourceBeliefSafetyCertificateV1", `${GATE_HEAD}value[("SourceBeliefSafetyCertificateV1")];\n`],
  ["P10", "element:TemporalRelianceCertificateV1", `${GATE_HEAD}value["TemporalRelianceCertificateV1" as const];\n`],
  ["P11", "literal:ChoiceCertificateV2", 'export const read = (value: object): boolean => Object.hasOwn(value, "ChoiceCertificateV2" as const);\n'],
  ["O1", "assignment:guardOrRelyReceipt", "export const read = (value: Record<string, unknown>): unknown => { let g: unknown; ({ guardOrRelyReceipt: g } = value); return g; };\n"],
  ["O2", "assignment:SourceBeliefSafetyCertificateV1", "export const read = (value: Record<string, unknown>): unknown => { let s: unknown; ({ SourceBeliefSafetyCertificateV1: s } = value); return s; };\n"],
  ["O3", "literal:admissionVerdict", 'export const read = (value: object): boolean => Object.keys(value).includes("admissionVerdict");\n'],
  ["O4", "literal:ObservationCertificateV1", 'export const read = (value: object): unknown => Object.entries(value).find(([key]) => key === "ObservationCertificateV1");\n'],
];
/** The refusal-#1 core plants, each appended to the decision core's own text, where the gate measured both src-landable (tsc and
 * biome rc 0): the schema-name read through an as-const key and the member read through a keyof key. */
const CORE_PLANTS: readonly (readonly [string, string, string])[] = [
  ["CORE-SCHEMA", "element:TemporalRelianceCertificateV1", '\nexport const gateProbeRead = (request: NativeControlRequest): unknown => (request as unknown as Record<string, unknown>)["TemporalRelianceCertificateV1" as const];\n'],
  ["CORE-MEMBER", "element:guardOrRelyReceipt", '\nexport const gateProbeMember = (request: NativeControlRequest): unknown => request["guardOrRelyReceipt" as keyof NativeControlRequest];\n'],
];
/** The record-shaped reads one module makes, as form:name. */
const flagged = (file: string, text: string): string[] => shaped(fieldReads(file, text)).map(read => `${read.form}:${read.name}`);
const WORD = (name: string): RegExp => new RegExp(`(?<![A-Za-z0-9_$])${name}(?![A-Za-z0-9_$])`);
/** The names the word reading reads. */
const RECORD_WORDS: readonly string[] = [...SHAPED].sort();
const wordsIn = (text: string): string[] => RECORD_WORDS.filter(name => WORD(name).test(text));

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
/** The parked sentence's two terms, spelled out in any case: a block or an attribute stating either is the sentence clause (d) asks for. */
const PARKED_TERMS = /authorization input|never softens/i;
/** A text states a term when a term matches it with every run of white space in it read as one space (refusal #3's F2: a line break, a
 * tab, a no-break space or two spaces between a term's words, which an attribute can carry as written). */
const statesTerm = (text: string): boolean => PARKED_TERMS.test(text.replace(/\s+/g, " "));
/** What one block states: a heading, a paragraph, a code block, a block quote or a table by its rendered text, and each list item (its
 * nested items included) by its rendered text. An HTML block renders none; the attribute reading reads its source, at every depth. */
const blockTexts = (block: RenderedBlock): string[] => (block.kind === "list" ? block.items.map(item => item.text) : [block.text]);
/** The section's shape frozen on the page this cut reads (blob ff7a76a7, unchanged since b0a1892): one list of the eight bullets and no
 * other block, HTML-free, the bullets' rendered text (joined by newlines) held to sha256, and the section's source held to source (a text
 * length characters long): the raws of its heading token, its list and the space token after the list re-joined, which on this page,
 * one its token raws tile, are the page's own text from the section's heading line up to the next section's heading line. */
const FROZEN_SECTION = {
  kinds: ["list"],
  items: 8,
  sha256: "afc98664a6f9bb2d5ae8196d7745cbe41e90f7ea5de442c1515db6175b937ca5",
  source: "481acac650cbfb4957a6677ea590b04ca0a41562cebcbe5803bd2b40139756a7",
  length: 1121,
} as const;
interface DocsReading {
  /** The shared view binds the section. */
  readonly view: boolean;
  /** The token view finds exactly one top-level level-2 heading whose rendered text is the section's. */
  readonly bound: boolean;
  /** The page's top-level token raws, re-joined, are the page itself. */
  readonly tiled: boolean;
  /** The shared view finds HTML (a block, a tag or a comment) in the section. */
  readonly html: boolean;
  readonly kinds: readonly string[];
  readonly items: readonly string[];
  readonly attributes: readonly string[];
  /** The sha-256 of the heading token's and the section's tokens' raws re-joined, and that text's length. */
  readonly source: string;
  readonly length: number;
  readonly terms: readonly string[];
}
const isHeadingToken = (token: Token): token is Tokens.Heading => token.type === "heading";
const isListToken = (token: Token): token is Tokens.List => token.type === "list";
const isTableToken = (token: Token): token is Tokens.Table => token.type === "table";
const isLinkToken = (token: Token): token is Tokens.Link => token.type === "link";
const isImageToken = (token: Token): token is Tokens.Image => token.type === "image";
const isDefToken = (token: Token): token is Tokens.Def => token.type === "def";
const isCodeToken = (token: Token): token is Tokens.Code => token.type === "code";
const isHtmlToken = (token: Token): token is Tokens.HTML | Tokens.Tag => token.type === "html";
/** A token's children: its own tokens, a list's items and a table's cells' tokens (header first). */
function childTokens(token: Token): readonly Token[] {
  if (isListToken(token)) return token.items;
  if (isTableToken(token)) return [...token.header, ...token.rows.flat()].flatMap(cell => cell.tokens);
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
}
/** Inline tokens' text as the shared view renders it (markup renders its children's text, HTML none): only to find the section's
 * heading among the page's tokens, white space collapsed. */
function renderedInline(tokens: readonly Token[]): string {
  return tokens
    .map(token => {
      if (isHtmlToken(token)) return "";
      const children = childTokens(token);
      if (children.length > 0) return renderedInline(children);
      const value: unknown = (token as { text?: unknown }).text;
      return typeof value === "string" ? value : "";
    })
    .join("");
}
/** The section in marked's top-level tokens of a page: the heading token (the one top-level level-2 heading whose rendered text is the
 * section's) and the top-level tokens after it up to the next top-level level-1 or level-2 heading; undefined unless exactly one such
 * heading. */
function sectionTokens(tokens: readonly Token[]): { readonly heading: Token; readonly blocks: readonly Token[] } | undefined {
  const starts = tokens.flatMap((token, index) =>
    isHeadingToken(token) && token.depth === 2 && renderedInline(token.tokens).replace(/\s+/g, " ").trim() === DOCS_HEADING ? [index] : [],
  );
  const start = starts.length === 1 ? starts[0] : undefined;
  const heading = start === undefined ? undefined : tokens[start];
  if (start === undefined || heading === undefined) return undefined;
  const blocks: Token[] = [];
  for (const token of tokens.slice(start + 1)) {
    if (isHeadingToken(token) && token.depth <= 2) break;
    blocks.push(token);
  }
  return { heading, blocks };
}
/** What the rendered text drops, read from the tokens given and every token under them, in document order: a link's destination and
 * title (a reference link's as the lexer resolved them), an image's source and title, a definition's label, destination and title,
 * a fenced code block's info string, and an HTML block's, tag's or comment's source. */
function attributesOf(tokens: readonly Token[]): string[] {
  return tokens.flatMap(token => {
    const own: readonly unknown[] =
      isLinkToken(token) || isImageToken(token)
        ? [token.href, token.title]
        : isDefToken(token)
          ? [token.tag, token.href, token.title]
          : isCodeToken(token)
            ? [token.lang]
            : isHtmlToken(token)
              ? [token.text]
              : [];
    return [...own.filter((value): value is string => typeof value === "string" && value !== ""), ...attributesOf(childTokens(token))];
  });
}
/** D1's reading of a page: whether marked's top-level tokens of the page tile it (their raws, re-joined, are the page itself); its
 * 'Authorization design' section bound in both views; every block and every attribute of the heading and the blocks read for the parked
 * sentence's terms; and what the SHAPE checks hold the section to. */
function docsBinding(markdown: string = readRepo(DOCS_FILE)): DocsReading {
  const section = docsSection(markdown, DOCS_HEADING, 2, [DOCS_PARENT]);
  const page: readonly Token[] = marked.lexer(markdown);
  const bound = sectionTokens(page);
  const tokens = bound === undefined ? [] : [bound.heading, ...bound.blocks];
  const attributes = attributesOf(tokens);
  const text = tokens.map(token => token.raw).join("");
  return {
    view: section.ok,
    bound: bound !== undefined,
    tiled: page.map(token => token.raw).join("") === markdown,
    html: section.hasHtml,
    kinds: section.blocks.map(block => block.kind),
    items: section.blocks.flatMap(block => (block.kind === "list" ? block.items.map(item => item.text) : [])),
    attributes,
    source: sha256(text),
    length: text.length,
    terms: [...section.blocks.flatMap(blockTexts), ...attributes].filter(statesTerm),
  };
}
/** D1's checks, in the order a red names them: each holds on the real page and fails on at least one docs plant. BINDING: view (the
 * shared view refuses the section), tokens (the token view finds no such heading or more than one) and untiled (the page's top-level
 * token raws, re-joined, are not the page). SHAPE: html (the section carries an HTML block, tag or comment), blocks (its blocks are not
 * exactly the one list), bullets (the list does not hold eight bullets), rendered (the bullets' rendered text is not the frozen text) and
 * source (the re-joined raws of the heading token and the section's tokens are not the frozen source). TERMS: terms (a block or an
 * attribute states a term). */
const DOCS_CHECKS: Readonly<Record<string, (reading: DocsReading) => boolean>> = {
  view: reading => !reading.view,
  tokens: reading => !reading.bound,
  untiled: reading => !reading.tiled,
  html: reading => reading.html,
  blocks: reading => JSON.stringify(reading.kinds) !== JSON.stringify(FROZEN_SECTION.kinds),
  bullets: reading => reading.items.length !== FROZEN_SECTION.items,
  rendered: reading => sha256(reading.items.join("\n")) !== FROZEN_SECTION.sha256,
  source: reading => reading.source !== FROZEN_SECTION.source,
  terms: reading => reading.terms.length > 0,
};
/** Why a reading reds D1: every check it fails, in DOCS_CHECKS order. */
const docsCauses = (reading: DocsReading): string[] =>
  Object.entries(DOCS_CHECKS)
    .filter(([, fails]) => fails(reading))
    .map(([check]) => check);
/** The section's heading line, its first bullet and its eighth (the anchor): each docs plant edits one of them, or the page's end, in
 * memory, never on disk. */
const HEADING_LINE = "## Authorization design\n";
const FIRST_BULLET = "- Caller identity and scope bound at workbench entry point; impersonation from script payload prohibited.\n";
const DOCS_ANCHOR = "- Source/deployment pin must be checked before loading; malformed schema/unsupported contract fails closed.\n";
const ENTRY = "workbench entry point";
const PARKED_SENTENCE = "A design-program record is never an authorization input; UNKNOWN never softens a native denial.";
const PARAPHRASE = "A design-program certificate is metadata that never authorizes a control, and an UNKNOWN never weakens a native denial.";
/** The page's title line, the section's second bullet and the next section's heading line: further plant anchors. */
const PAGE_TITLE = `# ${DOCS_PARENT}\n`;
const SECOND_BULLET = "- Separate discover, inspect, observe, invoke and control grants.\n";
const NEXT_HEADING = "## Credential boundaries\n";
const CR = String.fromCodePoint(0x0d);
/** The page's text from the section's heading line up to the next section's heading line, found by the anchors (plant machinery only). */
const sectionSlice = (page: string): string => page.slice(page.indexOf(HEADING_LINE), page.indexOf(NEXT_HEADING));
/** A CR before the LF of every line of the slice that carries none of the three anchors (the heading line, the first and the eighth bullet). */
const crlfBody = (slice: string): string =>
  slice
    .split("\n")
    .map((line, index, lines) => (index === lines.length - 1 || [HEADING_LINE, FIRST_BULLET, DOCS_ANCHOR].includes(`${line}\n`) ? line : `${line}${CR}`))
    .join("\n");
type PageEdit = (page: string) => string;
/** The eighth bullet replaced by the edit given (which keeps it before what it adds, or rewrites it in place). */
const atAnchor =
  (edit: string): PageEdit =>
  page =>
    page.replace(DOCS_ANCHOR, () => edit);
/** The first bullet's 'workbench entry point' replaced by the markdown given. */
const atEntry =
  (markdown: string): PageEdit =>
  page =>
    page.replace(FIRST_BULLET, () => FIRST_BULLET.replace(ENTRY, () => markdown));
/** The first bullet with the markdown given appended before its line end. */
const afterFirst =
  (markdown: string): PageEdit =>
  page =>
    page.replace(FIRST_BULLET, () => `${FIRST_BULLET.slice(0, -1)}${markdown}\n`);
/** The heading line replaced by the line given. */
const atHeading =
  (line: string): PageEdit =>
  page =>
    page.replace(HEADING_LINE, () => line);
/** Further characters a plant spells with, each built from its code point: a tab, a no-break space and a zero-width space. */
const TAB = String.fromCodePoint(0x09);
const NBSP = String.fromCodePoint(0xa0);
const ZWSP = String.fromCodePoint(0x200b);
/** A link on the first bullet's 'workbench entry point' whose title is the text given. */
const titled = (title: string): PageEdit => atEntry(`[${ENTRY}](#authorization-design "${title}")`);
/** The docs plants, each with every check it fails, in DOCS_CHECKS order (docsCauses): refusal #1's (gate s137 LEG 2: D-CTRL, D-NESTED,
 * D-PARA, D-BLOCKQUOTE, D-HTML and the rider D-PARAPHRASE, each the gate's edit verbatim); refusal #2's (gate s144 LEG 2: L2-D1, L2-D1b
 * and L2-D3, the three placements of the parked sentence the cut #2 reader missed, and that gate's controls L2-D2 and L2-D4, each the
 * gate's described edit); refusal #3's (gate s154 LEG 2: L2G-DUPDEF, L2G-CR-BULLET2, L2G-CR-BLANK and L2G-CRLF-BODY, each the gate's
 * edit, its section slice re-measured to the gate's length and sha-256, and that gate's controls L2G-DUPDEF-NOOUT, L2G-SPACE-BULLET2 and
 * L2G-SPACE-BLANK) with the same two departures outside the section (CR-OUTSIDE, DUPDEF-OUTSIDE); and the reader's further controls,
 * one for each further channel the TERMS reading reads, each spelling of a term it reads or does not read, each part of the source that
 * no rendered text shows, each removal and each binding edit. */
/** Refusal #3's four plants as that gate measured them: each planted page's section slice, its length and sha-256/16. */
const GATE_SLICES: Readonly<Record<string, readonly [number, string]>> = {
  "L2G-DUPDEF": [1252, "dfb9c6d47070c7b6"],
  "L2G-CR-BULLET2": [1122, "4548bda88fe060b8"],
  "L2G-CR-BLANK": [1122, "94e33e1a7651bd6c"],
  "L2G-CRLF-BODY": [1129, "a40bd66646f66726"],
};
const DOCS_PLANTS: readonly (readonly [string, PageEdit, readonly string[]])[] = [
  ["D-CTRL", atAnchor(`${DOCS_ANCHOR}- ${PARKED_SENTENCE}\n`), ["bullets", "rendered", "source", "terms"]],
  ["D-NESTED", atAnchor(`${DOCS_ANCHOR}  - ${PARKED_SENTENCE}\n`), ["rendered", "source", "terms"]],
  ["D-PARA", atAnchor(`${DOCS_ANCHOR}\n${PARKED_SENTENCE}\n`), ["blocks", "source", "terms"]],
  ["D-BLOCKQUOTE", atAnchor(`${DOCS_ANCHOR}\n> ${PARKED_SENTENCE}\n`), ["blocks", "source", "terms"]],
  ["D-HTML", atAnchor(`${DOCS_ANCHOR}\n<p>${PARKED_SENTENCE}</p>\n`), ["html", "blocks", "source", "terms"]],
  ["D-PARAPHRASE", atAnchor(`${DOCS_ANCHOR}- ${PARAPHRASE}\n`), ["bullets", "rendered", "source"]],
  ["L2-D1", atEntry(`[${ENTRY}](#authorization-design "${PARKED_SENTENCE}")`), ["source", "terms"]],
  ["L2-D1b", page => `${atEntry(`[${ENTRY}][gate-d1]`)(page)}\n[gate-d1]: #authorization-design "${PARKED_SENTENCE}"\n`, ["source", "terms"]],
  ["L2-D3", afterFirst(` ![](#authorization-design "${PARKED_SENTENCE}")`), ["source", "terms"]],
  ["L2-D2", afterFirst(` ![${PARKED_SENTENCE.slice(0, PARKED_SENTENCE.indexOf(";"))}](#authorization-design)`), ["rendered", "source", "terms"]],
  ["L2-D4", atAnchor(`${DOCS_ANCHOR}\n[gate-d4]: #authorization-design "${PARKED_SENTENCE}"\n`), ["blocks", "source", "terms"]],
  ["L2G-DUPDEF", page => page.replace(PAGE_TITLE, () => `${PAGE_TITLE}[gate-dup]: #threat-categories\n`).replace(`${HEADING_LINE}\n`, () => `${HEADING_LINE}[gate-dup]: #authorization-design "${PARKED_SENTENCE}"\n`), ["untiled"]],
  ["L2G-CR-BULLET2", page => page.replace(SECOND_BULLET, () => `${SECOND_BULLET.slice(0, -1)}${CR}\n`), ["untiled"]],
  ["L2G-CR-BLANK", page => page.replace(`${HEADING_LINE}\n`, () => `${HEADING_LINE}${CR}\n`), ["untiled"]],
  ["L2G-CRLF-BODY", page => page.replace(sectionSlice(page), slice => crlfBody(slice)), ["untiled"]],
  ["LONE-CR", page => page.replace(SECOND_BULLET, () => `${SECOND_BULLET.slice(0, -1)}${CR}`), ["untiled"]],
  ["L2G-DUPDEF-NOOUT", page => page.replace(`${HEADING_LINE}\n`, () => `${HEADING_LINE}[gate-dup]: #authorization-design "${PARKED_SENTENCE}"\n`), ["blocks", "source", "terms"]],
  ["L2G-SPACE-BULLET2", page => page.replace(SECOND_BULLET, () => `${SECOND_BULLET.slice(0, -1)} \n`), ["source"]],
  ["L2G-SPACE-BLANK", page => page.replace(`${HEADING_LINE}\n`, () => `${HEADING_LINE} \n`), ["source"]],
  ["CR-OUTSIDE", page => page.replace(PAGE_TITLE, () => `${PAGE_TITLE.slice(0, -1)}${CR}\n`), ["untiled"]],
  ["DUPDEF-OUTSIDE", page => `${page}\n[gate-out]: #threat-categories\n[gate-out]: #auditability\n`, ["untiled"]],
  ["IN-PLACE", atAnchor(DOCS_ANCHOR.replace("fails closed.", `fails closed; ${PARAPHRASE.charAt(0).toLowerCase()}${PARAPHRASE.slice(1)}`)), ["rendered", "source"]],
  ["TABLE", atAnchor(`${DOCS_ANCHOR}\n| Record rule |\n| --- |\n| ${PARKED_SENTENCE} |\n`), ["blocks", "source", "terms"]],
  ["CODE", atAnchor(`${DOCS_ANCHOR}\n\`\`\`text\n${PARKED_SENTENCE}\n\`\`\`\n`), ["blocks", "source", "terms"]],
  ["SUBSECTION", atAnchor(`${DOCS_ANCHOR}\n### A design-program record is never an authorization input\n`), ["blocks", "source", "terms"]],
  ["COMMENT", atAnchor(DOCS_ANCHOR.replace("fails closed.", "fails closed. <!-- never softens a native denial -->")), ["html", "source", "terms"]],
  ["HTML-TITLE", atEntry(`<abbr title="${PARKED_SENTENCE}">${ENTRY}</abbr>`), ["html", "source", "terms"]],
  ["LINK-DESTINATION", atEntry(`[${ENTRY}](<#${PARKED_SENTENCE}>)`), ["source", "terms"]],
  ["IMAGE-SOURCE", afterFirst(` ![](<#${PARKED_SENTENCE}>)`), ["source", "terms"]],
  ["DEFINITION-LABEL", atAnchor(`${DOCS_ANCHOR}\n[authorization input]: #authorization-design\n`), ["blocks", "source", "terms"]],
  ["DEFINITION-DESTINATION", atAnchor(`${DOCS_ANCHOR}\n[gate-dd]: <#${PARKED_SENTENCE}>\n`), ["blocks", "source", "terms"]],
  ["CODE-INFO", atAnchor(`${DOCS_ANCHOR}\n\`\`\`${PARKED_SENTENCE}\nrecord\n\`\`\`\n`), ["blocks", "source", "terms"]],
  ["HEADING-TITLE", atHeading(`## [Authorization design](#authorization-design "${PARKED_SENTENCE}")\n`), ["source", "terms"]],
  ["NESTED-TITLE", atAnchor(`${DOCS_ANCHOR}  - [nested entry](#authorization-design "${PARKED_SENTENCE}")\n`), ["rendered", "source", "terms"]],
  ["QUOTE-TITLE", atAnchor(`${DOCS_ANCHOR}\n> [quoted entry](#authorization-design "${PARKED_SENTENCE}")\n`), ["blocks", "source", "terms"]],
  ["TABLE-TITLE", atAnchor(`${DOCS_ANCHOR}\n| Record rule |\n| --- |\n| [cell entry](#authorization-design "${PARKED_SENTENCE}") |\n`), ["blocks", "source", "terms"]],
  ["TERM-CASE", titled("A design-program record is never an Authorization INPUT"), ["source", "terms"]],
  ["TITLE-NEWLINE", titled("A design-program record is never an authorization\ninput"), ["source", "terms"]],
  ["TITLE-SPACES", titled("UNKNOWN never  softens a native denial"), ["source", "terms"]],
  ["DEFINITION-TITLE-TAB", atAnchor(`${DOCS_ANCHOR}\n[gate-tab]: #authorization-design "UNKNOWN never${TAB}softens a native denial"\n`), ["blocks", "source", "terms"]],
  ["TITLE-NBSP", titled(`A design-program record is never an authorization${NBSP}input`), ["source", "terms"]],
  ["HTML-ATTR-NEWLINE", atEntry(`<abbr title="UNKNOWN never\nsoftens a native denial">${ENTRY}</abbr>`), ["html", "source", "terms"]],
  ["CODE-NEWLINE", atAnchor(`${DOCS_ANCHOR}\n\`\`\`text\nnever\nsoftens\n\`\`\`\n`), ["blocks", "source", "terms"]],
  ["ENTITY", atAnchor(DOCS_ANCHOR.replace("fails closed.", "fails closed; a design-program record is never an authorization&#32;input.")), ["rendered", "source"]],
  ["ESCAPED-DESTINATION", atEntry(`[${ENTRY}](#authorization%20input)`), ["source"]],
  ["TITLE-PARAPHRASE", titled(PARAPHRASE), ["source"]],
  ["TITLE-INVISIBLE", titled(`UNKNOWN never${ZWSP}softens a native denial`), ["source"]],
  ["EMPHASIS", atEntry(`*${ENTRY}*`), ["source"]],
  ["HARD-BREAK", page => page.replace(FIRST_BULLET, () => FIRST_BULLET.replace("point; ", () => "point;  \n")), ["source"]],
  ["TASK-BOX", page => page.replace(FIRST_BULLET, () => `- [x] ${FIRST_BULLET.slice(2)}`), ["source"]],
  ["HEADING-CLOSE", atHeading("## Authorization design ##\n"), ["source"]],
  ["REMOVE-BULLET", page => page.replace(SECOND_BULLET, () => ""), ["bullets", "rendered", "source"]],
  ["REMOVE-LIST", page => page.replace(sectionSlice(page), () => `${HEADING_LINE}\n`), ["blocks", "bullets", "rendered", "source"]],
  ["HEADING-ENTITY", atHeading("## Authorization&nbsp;design\n"), ["tokens", "source"]],
  ["DUP-HEADING", page => `${page}\n${HEADING_LINE}\n${PARKED_SENTENCE}\n`, ["view", "tokens", "blocks", "bullets", "rendered", "source"]],
  ["RE-HOMED", page => page.replace(HEADING_LINE, () => `# Appendix\n\n${HEADING_LINE}`), ["view", "blocks", "bullets", "rendered"]],
  ["NESTED-HEADING", page => `${page}\n> ${HEADING_LINE}`, ["view", "blocks", "bullets", "rendered"]],
];


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
    expect(REFUSAL_PLANTS.map(([id, , text]) => [id, flagged("plant.ts", text)]), "each refusal-#1 plant is flagged at its form").toEqual(REFUSAL_PLANTS.map(([id, read]) => [id, [read]]));
    const core = readRepo(CORE);
    expect(CORE_PLANTS.map(([id, , line]) => [id, flagged(CORE, core + line)]), "each core plant is flagged inside the core's own text").toEqual(CORE_PLANTS.map(([id, read]) => [id, [read]]));
    expect(PLANTED_READS.map(([, , text]) => flagged("plant.ts", text)), "each planted read form is flagged once").toEqual(PLANTED_READS.map(([form, name]) => [`${form}:${name}`]));
    return {
      claim: claim("C1"),
      core: CORE,
      anchors: ADMISSION_ANCHORS.length,
      modules: modules.length >= ADMISSION_ANCHORS.length + 1,
      src: true,
      judged: SHAPED.size,
      forms: [...new Set(PLANTED_READS.map(([form]) => form))],
      controls: PLANTED_READS.length,
      plants: [...REFUSAL_PLANTS, ...CORE_PLANTS].map(([id]) => id),
    };
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
    const read = new Set(src.flatMap(file => fieldReads(file, readRepo(file)).filter(entry => entry.form !== "literal").map(entry => entry.name)));
    expect(SHARED.filter(name => !read.has(name)), "src reads each shared name as a property").toEqual([]);
    expect(SHARED.filter(name => nativeMembers().includes(name)), "principal is a Pi-native interface member").toEqual(["principal"]);
    expect(family.every(name => SHAPED.has(name)) && JUDGED_FIELDS.every(name => SHAPED.has(name)), "the schema family joins the field reading").toBe(true);
    const words = src.flatMap(file => wordsIn(readRepo(file)).map(name => `${file}:${name}`));
    expect(words, "no src file spells a record-shaped name as a word").toEqual([]);
    expect([...SHAPED].filter(name => !RECORD_WORDS.includes(name)), "the word reading reads every record-shaped name: the 40 members and the 50 schema names").toEqual([]);
    expect(RECORD_WORDS.filter(name => !WORD(name).test(`const x = value.${name};`)), "the word reading reads each name (control)").toEqual([]);
    expect([...REFUSAL_PLANTS, ...CORE_PLANTS].filter(([, , text]) => wordsIn(text).length === 0).map(([id]) => id), "and reads each refusal-#1 plant's name").toEqual([]);
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
      wordNames: RECORD_WORDS.length,
    };
  },
  D1: () => {
    const row = ROWS.find(entry => entry.id === "D");
    expect([row?.status, row?.reason?.startsWith("standing rule 3 ")], "clause (d) is parked under standing rule 3").toEqual(["parked", true]);
    const docs = docsBinding();
    expect([docs.tiled, docs.view, docs.bound], "the page's top-level token raws re-join to the page itself, and the section binds in both views").toEqual([true, true, true]);
    expect(docs.attributes, "no link, image, definition or HTML sits in the section or its heading").toEqual([]);
    expect(docs.terms, "no block or attribute of the section states either term of the parked sentence (this cut adds none)").toEqual([]);
    expect([docs.source, docs.length], "the section's source, the re-joined raws of its heading token and its tokens (the page's own text here, which they tile), is the frozen source").toEqual([FROZEN_SECTION.source, FROZEN_SECTION.length]);
    expect(docsCauses(docs), "the page fails no check: the section is its frozen shape, one list of eight bullets, HTML-free, its rendered text and its source held to the sha-256s").toEqual([]);
    const page = readRepo(DOCS_FILE);
    expect([HEADING_LINE, FIRST_BULLET, DOCS_ANCHOR, PAGE_TITLE, SECOND_BULLET, NEXT_HEADING].map(line => page.split(line).length), "each plant anchor occurs once on the page").toEqual([2, 2, 2, 2, 2, 2]);
    expect(sha256(sectionSlice(page)), "the page's own text from the section's heading line up to the next section's is that source").toBe(docs.source);
    expect(DOCS_PLANTS.filter(([, edit]) => edit(page) === page).map(([id]) => id), "every docs plant edits the page").toEqual([]);
    const slices = Object.keys(GATE_SLICES).map(id => {
      const slice = sectionSlice(DOCS_PLANTS.find(([plant]) => plant === id)?.[1](page) ?? "");
      return [id, slice.length, sha256(slice).slice(0, 16)];
    });
    expect(slices, "refusal #3's four plants are that gate's edits, slice for slice").toEqual(Object.entries(GATE_SLICES).map(([id, [length, digest]]) => [id, length, digest]));
    const verdicts = DOCS_PLANTS.map(([id, edit]) => [id, docsCauses(docsBinding(edit(page)))] as const);
    expect(verdicts.filter(([, causes]) => causes.length === 0).map(([id]) => id), "every docs plant reds D1").toEqual([]);
    expect(verdicts, "each by every check it fails").toEqual(DOCS_PLANTS.map(([id, , causes]) => [id, [...causes]]));
    expect(Object.keys(DOCS_CHECKS).filter(check => !verdicts.some(([, causes]) => causes.includes(check))), "every check fails at least one plant").toEqual([]);
    return {
      claim: claim("D1"),
      status: "parked",
      page: DOCS_FILE,
      section: DOCS_HEADING,
      sentence: "absent",
      tiled: docs.tiled,
      kinds: [...docs.kinds],
      items: docs.items.length,
      attributes: docs.attributes.length,
      sha256: FROZEN_SECTION.sha256.slice(0, 16),
      source: FROZEN_SECTION.source.slice(0, 16),
      length: docs.length,
      checks: Object.keys(DOCS_CHECKS),
      plants: DOCS_PLANTS.map(([id]) => id),
    };
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
      'import { RECEIPT_KEY } from "outside-package";',
      'const key = "guardOr" + "RelyReceipt";',
      `export const read = (value: Record<string, unknown>, name: string) => [value[key], value[name], value[\`${"$"}{"proof"}Tier\`], value[RECEIPT_KEY]];`,
      'export const find = (value: object) => Object.keys(value).find(name => name.endsWith("RelyReceipt") || /^admission/.test(name));',
      "",
    ].join("\n");
    expect(quiet).toContain("value[`$" + '{"proof"}Tier`]');
    expect(shaped(fieldReads("quiet.ts", quiet)), "a key the source never spells whole escapes the field reading").toEqual([]);
    expect(wordsIn(quiet), "and the word reading").toEqual([]);
    const literal = "export const read = (value: Record<string, unknown>) => [value[\"guardOrRelyReceipt\"], value[`proofTier`]];\n";
    expect(shaped(fieldReads("plant.ts", literal)).map(read => read.name), "the same keys spelled as literals are read").toEqual(["guardOrRelyReceipt", "proofTier"]);
    // Refusal #2's L2-C4 and L2-C10 (its F3): a template whose head spells the name whole before a substitution is neither a literal
    // nor a word (the word reading's boundary counts the substitution's $ as an identifier character), in a fresh module and
    // appended to the decision core's own text.
    const headWhole = (name: string): string => `export const read = (value: Record<string, unknown>) => value[\`${name}${"$"}{""}\`];\n`;
    expect(headWhole("guardOrRelyReceipt")).toContain("value[`guardOrRelyReceipt$" + '{""}`]');
    expect(shaped(fieldReads("quiet.ts", headWhole("guardOrRelyReceipt"))), "a template head spelling a member whole escapes the field reading").toEqual([]);
    expect(wordsIn(headWhole("guardOrRelyReceipt")), "and the word reading").toEqual([]);
    const core = `${readRepo(CORE)}\n${headWhole("TemporalRelianceCertificateV1")}`;
    expect(shaped(fieldReads(CORE, core)), "a template head spelling a schema name whole, appended to the core, escapes the field reading").toEqual([]);
    expect(wordsIn(core), "and the word reading").toEqual([]);
    // Refusal #3's GC-5a (its F4): the whole name in a pattern before its end anchor is neither a literal nor a word (the word reading's
    // boundary counts the anchor's $ as an identifier character); the same pattern without the anchor spells the name as a word.
    const anchored = "export const find = (value: object) => Object.keys(value).find(name => /^guardOrRelyReceipt$/.test(name));\n";
    expect(anchored).toContain("/^guardOrRelyReceipt$/");
    expect(shaped(fieldReads("quiet.ts", anchored)), "the whole name before a pattern's end anchor escapes the field reading").toEqual([]);
    expect(wordsIn(anchored), "and the word reading").toEqual([]);
    expect(wordsIn(anchored.replace("$/", "/")), "without the end anchor the word reading reads it").toEqual(["guardOrRelyReceipt"]);
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
  "R-HOLLOW-IMPL": () => {
    // An IMPL entry that names a reader without using it (a constant witness beside `void rfTopology`) still passes SELF-READ.
    const hollow = 'const IMPL = { B3: () => { void rfTopology; return { claim: "0000000000000000", readings: 47 }; } };\n';
    const reads = implReads(hollow);
    expect(reads.B3, "the hollow entry names a reader").toContain("rfTopology");
    expect(selfReadDefects(reads), "and the self-read reads it bound").toEqual([]);
  },
  "R-OTHER-SECTION": () => {
    // The sentence placed outside the section's source leaves D1's reading as it was: under another section; as a level-2 heading
    // placed after the section's last block (refusal #2's L2-D7, the setext form, and the ATX form) or a level-1 one, which starts
    // another section; as the summary of a details element wrapped around the section, which sits in the section before it; under the
    // section's heading text set as a level-3 heading, which the binding reads as no section heading; and as the title of a definition
    // that no link of the section names. Each such page is one its tokens tile.
    const page = readRepo(DOCS_FILE);
    const next = "\n## Credential boundaries\n";
    const elsewhere: readonly (readonly [string, string])[] = [
      ["a paragraph under Credential boundaries", page.replace(next, () => `${next}\n${PARKED_SENTENCE}\n`)],
      ["a setext level-2 heading after the list (L2-D7)", page.replace(next, () => `\n${PARKED_SENTENCE}\n---\n${next}`)],
      ["an ATX level-2 heading after the list", page.replace(next, () => `\n## ${PARKED_SENTENCE}\n${next}`)],
      ["an ATX level-1 heading after the list", page.replace(next, () => `\n# ${PARKED_SENTENCE}\n${next}`)],
      [
        "a details element's summary wrapped around the section",
        page.replace(HEADING_LINE, () => `<details><summary>${PARKED_SENTENCE}</summary>\n\n${HEADING_LINE}`).replace("\n## Input and output hardening\n", () => "\n</details>\n\n## Input and output hardening\n"),
      ],
      ["the section's heading text as a level-3 heading after the page's last line, which starts no section of its own", `${page}\n### ${DOCS_HEADING}\n\n${PARKED_SENTENCE}\n`],
      ["a definition after the page's last line that no link of the section names", `${page}\n[gate-free]: #auditability "${PARKED_SENTENCE}"\n`],
    ];
    for (const [form, planted] of elsewhere) {
      expect([planted === page, planted.includes(PARKED_SENTENCE)], `${form}: the plant is on the page`).toEqual([false, true]);
      expect(docsBinding(planted), `${form}: D1's reading of its section is the reading without it`).toEqual(docsBinding(page));
    }
  },
};

// --- the self-read ------------------------------------------------------------------------------------------------------------------------
/** The identifiers each IMPL entry names, read from this file's own source. */
function implReads(text: string = readFileSync(HERE, "utf8")): Record<string, string[]> {
  const source = ts.createSourceFile(SELF, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
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
/** The pins whose IMPL entry names no reader, or names the roster (the SELF-READ judgement). */
const selfReadDefects = (reads: Readonly<Record<string, readonly string[]>>): string[] =>
  Object.entries(reads)
    .filter(([, names]) => !names.some(name => READERS.includes(name)) || names.includes("ROSTER"))
    .map(([pin]) => pin);
/** The residual ids this file's header names, in order (its RESIDUALS paragraph): QUIET's and the roster's anchor outside both. */
function headerResiduals(text: string = readFileSync(HERE, "utf8")): string[] {
  const header = /^\/\*\*([\s\S]*?)\*\//.exec(text)?.[1] ?? "";
  const paragraph = /\n \* RESIDUALS \(([\s\S]*?)\n \* Display paths added:/.exec(header)?.[1] ?? "";
  return [...new Set(paragraph.match(/\bR-[A-Z]+(?:-[A-Z]+)*\b/g) ?? [])];
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
    expect(headerResiduals(), "the header's RESIDUALS paragraph names exactly the quiet rows, in order").toEqual(Object.keys(QUIET));
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
    expect(selfReadDefects(reads)).toEqual([]);
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
