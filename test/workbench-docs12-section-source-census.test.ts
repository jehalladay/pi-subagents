/**
 * wb-rdlh.3 (LIBRARY-COMPOSITIONAL-AUTONOMOUS-COMPUTATION-R1; the rule-19 structural-exit child of wb-rdlh.1, orchestrator rulings R-B137
 * and R-B169): the raw-source reader census for the 'Authorization design' section of docs/workbench/12-security.md. The reader
 * (test/helpers/docs-section-source.ts) and this census are test-only; no src path, no docs page and no other census changes.
 *
 * THE READER. sectionSource(page, heading) binds the section in marked 18.0.11's top-level tokens of the page (exactly one level-2 heading
 * whose rendered text, HTML rendering none and white space collapsed, is the heading; the section runs to the next top-level level-1 or
 * level-2 heading or the page's end) and returns its SOURCE: the page's own text from the first character the lexer's top-level step for
 * the heading token consumed up to the first character the step for the next such heading consumed, or the page's end. The steps' offsets
 * come from a block extension that returns no token, on a Marked instance; they index the lexer's LF text and map back through every CR
 * and CRLF it rewrote. So the source carries the CR and CRLF line endings and the link reference definitions inside that span as the page
 * spells them, a definition whose label repeats an earlier one's included; bytes and sha256 are its UTF-8 encoding's length and digest,
 * crs its CR count. Beside it the reader returns what marked carries of the section: its top-level tokens (type and raw length) and their
 * raws re-joined (tokenText, the token-raw view wb-rdlh.1's docsBinding hashed, which the bead says is blind to both), and whether the
 * page's top-level raws re-joined are the page itself (tiled). termsStated(text, terms) returns the terms, in the order given, that a text
 * spells out in any letter case, every run of white space (what JavaScript's \s matches) read as one space.
 *
 * PINNED READER SET (this file; one case per pin, titled '<row id> <row label>' > '<pin>'; every result below is green at this cut):
 * - BASELINE (anchored, not a judged row): the page on disk binds; its source is 1121 bytes with the digest prefix refusal #3 records,
 *   byte for byte the file's own bytes over the span (the file's bytes are its UTF-8 text); the page is tiled; tokenText is the source; no
 *   parked term is stated; the edits outside the span named below leave the source the baseline.
 * - CR (1 pin) LONE-CR, a lone CR in place of the second bullet's LF: the source carries that CR (1121 bytes, the CR before no LF) and is not
 *   the baseline; with the CR read as LF it is the baseline, and tokenText is the baseline (the CR blind spot, reproduced).
 * - CRLF (3 pins) refusal #3's gate plants L2G-CR-BULLET2, L2G-CR-BLANK and L2G-CRLF-BODY: each source has the bytes and the sha-256/16 the
 *   gate measured, one CR per added byte, each before an LF; with each CRLF read as LF it is the baseline; the page is untiled; tokenText is
 *   the baseline (the CRLF blind spot, reproduced).
 * - DUPDEF (1 pin) L2G-DUPDEF, built from the two definitions the gate's line quotes: the source has the gate's bytes and sha-256/16 and
 *   carries the repeated definition, not the outside one, and states both parked terms; the page is untiled; the section's tokens are the
 *   merged three raws refusal #3's M2 line names, and tokenText is the baseline (the duplicate-definition blind spot, reproduced).
 * - CONTROLS (5 pins) refusal #3's control lines: L2G-DUPDEF-NOOUT (the same definition, its label not defined before: the same source as
 *   L2G-DUPDEF with the gate's digest, the page tiled, tokenText the source and not the baseline); L2G-SPACE-BULLET2 and L2G-SPACE-BLANK
 *   (each the paired CR plant with a space where its CR went: that plant's byte count, another digest, no CR, the page tiled, tokenText the
 *   source and not the baseline); CRLF-ANCHOR-LINES (a CRLF on the heading, first-bullet and eighth-bullet lines: its bytes and sha-256/16,
 *   three CRs, each before an LF, tokenText the baseline); OUTSIDE-DEFINITION (the outside definition alone: the source is the baseline and
 *   the page tiled).
 * - a TERMS AT NESTING DEPTH (16 pins) refusal #4's member (a) placements, each the gate's PREP edit verbatim after the eighth bullet (a
 *   table in the eighth bullet, in a block quote or in a block quote in the eighth bullet; a list in a block quote in the eighth bullet or
 *   in a block quote; and the shallower and already-read placements the member names): the source carries the edit's text and states
 *   exactly the parked terms the edit spells; its bytes and sha-256/16 are pinned; the page stays tiled.
 * - b M2 AT NESTING DEPTH (3 pins) refusal #4's member (b): G-S-ITEM-DUPDEF and G-S-ITEM-DUPDEF-NOTITLE (the repeated definition nested in
 *   the eighth bullet, with and without its title: the page stays tiled, the source carries the definition, not the outside one, and states
 *   the parked terms only when the title is there) and C-TOP-DUPDEF (the same definition at top level: the page is untiled); bytes and
 *   sha-256/16 pinned.
 * - c FROZEN_SECTION ENUMERATION (4 pins) refusal #4's member (c): the real page's section is four top-level tokens whose types and raw
 *   lengths are, place by place, the four the member names, and their raws re-joined are the source.
 * - READER CONTRACT (5 cases, not judged rows): BINDING-REFUSED (the heading and the parked sentence repeated after the page's last line,
 *   two top-level level-2 headings, and the heading's space spelled as an entity, none: each refused, with an empty source and a reason);
 *   BINDING-BOUND (a level-3 copy of the heading after the page's last line is not counted: the source is the baseline; an HTML comment in
 *   the heading renders no text: it binds and its source is the span its heading line opens); SUBSECTION (a level-3 heading after the
 *   eighth bullet is inside the source, which ends at the next level-2 heading; a level-1 heading there instead ends the source before it,
 *   so the source is the baseline: LEVEL-1-END); NBSP-IN-SECTION (a no-break space in the second
 *   bullet: bytes is the UTF-8 count, one more than the code units); TERMS-CASE-AND-SPACE (termsStated reads a term in mixed case, across a
 *   CRLF and a tab, and across a no-break space; not across a zero-width space; two terms in the order given).
 * Every pin of rows CR through b also reads, on its planted page, a source equal to the text between the line that starts with the section's heading
 * and the line that starts with the next section's heading, found by those two strings alone (an oracle that does not run marked), and
 * the same source once the planted page also carries two edits outside the span (a CR before the title line's LF; two definitions of one
 * new label after the page's last line, the second repeating the first). The records case reds when any pin or contract case stops early.
 * INDEPENDENT FALSIFIERS: the outside anchors below, read at run time, name every judged label and pin, so a pin dropped, renamed, swapped or
 * removed from every literal here still reds against text this file does not author (CT-BATTERY v2 at this cut: CT1 red=2; CT1b red=2;
 * CT2 red=1; CT3 red=2; CT4 red=2; CT5 red=1; CT6 red=1); the red-first run, the reader with its source set to the token-raw view, read 9
 * failed | 36 passed (45) (the CR, CRLF, DUPDEF, L2G-DUPDEF-NOOUT, CRLF-ANCHOR-LINES and C-TOP-DUPDEF pins and records); terms read from the
 * shared rendered view instead of the source red member (a)'s nine placements without terms (10 failed | 35 passed (45) with records);
 * fourteen reader mutants (the CR offset map, the end bound's depth above and below level 2, the binding's depth, count and HTML rule,
 * termsStated's case and white space, the byte count, the tiling's page, the CR count, the nested steps, a slice of the LF text, a span to
 * the page's end) each red the census.
 *
 * OUTSIDE ANCHORS (.beads/issues.jsonl, read at run time; the first match of each): wb-rdlh.3's description (its blind spots 'CR, CRLF,
 * duplicate definition', the labels of rows CR, CRLF and DUPDEF in order, each holding a pin); wb-rdlh.1's notes: refusal #3's GATE PLANTS
 * lines (the four plant ids, CRLF's three and DUPDEF's one, the bytes and sha-256/16 the gate measured, and the two definitions L2G-DUPDEF
 * quotes, whose title is the parked sentence), its CONTROLS lines (each maps to CONTROLS pins, in order), its M2 mechanism line (the merged
 * three raws, 1121 bytes and the digest prefix), and refusal #4's UNMET members (a), (b) and (c) (their headings are the labels of rows a,
 * b and c; the plant ids they name are rows a and b's pins in order; the four raws (c) names are row c's pins).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal.
 *
 * NOT CLAIMED (scope sentences, no residual):
 * - The shared rendered view (test/helpers/census.ts docsSection, its text at nesting depth included: the wb-aalz family) is NOT CLAIMED by
 *   this census.
 * - A term spelled otherwise in the source (a character reference, a backslash or percent escape, inline markup, a comment or an invisible
 *   character between its words, a paraphrase) is NOT CLAIMED by this census's terms reading.
 * - A page other than docs/workbench/12-security.md, a heading other than 'Authorization design', and a heading that marked's top-level
 *   tokens do not hold (one nested in a list item or a block quote) are NOT CLAIMED by this census.
 * - The reader's refusal when its instrumented lexer's tokens are not marked.lexer's own, or when its recorded steps miss a token or push
 *   more than one, is NOT CLAIMED by this census (no page here reaches either).
 * - A page string with a lone surrogate (which has no UTF-8 spelling) is NOT CLAIMED by this census's byte count.
 * RESIDUALS: none named.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type SectionSource, sectionSource, termsStated } from "./helpers/docs-section-source.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_FILE = "docs/workbench/12-security.md";
const EXPORT_FILE = ".beads/issues.jsonl";
const BEAD = "wb-rdlh.3";
const PARENT = "wb-rdlh.1";
const HEADING = "Authorization design";
const PARKED_TERMS: readonly string[] = ["authorization input", "never softens"];
const CR = String.fromCodePoint(0x0d);
const PAGE = readFileSync(join(REPO, DOCS_FILE), "utf8");
const PAGE_BYTES = readFileSync(join(REPO, DOCS_FILE));

// --- the outside anchors: the tracked bead export ---------------------------------------------------------------------------------------
interface ExportRow {
  readonly description: string;
  readonly notes: string;
}
/** The export's row for each bead given (exactly one each), read once. */
function exportRows(beads: readonly string[]): ReadonlyMap<string, ExportRow> {
  const rows = new Map<string, ExportRow>();
  for (const line of readFileSync(join(REPO, EXPORT_FILE), "utf8").split("\n")) {
    if (!beads.some(bead => line.includes(`"${bead}"`))) continue;
    const row = JSON.parse(line) as { readonly id?: unknown; readonly description?: unknown; readonly notes?: unknown };
    if (typeof row.id !== "string" || !beads.includes(row.id)) continue;
    if (rows.has(row.id)) throw new Error(`${EXPORT_FILE} carries more than one ${row.id} row`);
    rows.set(row.id, { description: typeof row.description === "string" ? row.description : "", notes: typeof row.notes === "string" ? row.notes : "" });
  }
  return rows;
}
const ROWS_READ = exportRows([BEAD, PARENT]);
function exportRow(bead: string): ExportRow {
  const row = ROWS_READ.get(bead);
  if (row === undefined) throw new Error(`${EXPORT_FILE} carries no ${bead} row`);
  return row;
}
function anchored(what: string, value: string | undefined): string {
  if (value === undefined) throw new Error(`${EXPORT_FILE} carries no ${what}`);
  return value;
}
/** The '> - ' lines that follow the first notes line starting with the marker given, up to the first other line (prefix removed). */
function quotedBlock(notes: string, marker: string): string[] {
  const lines = notes.split("\n");
  const at = lines.findIndex(line => line.startsWith(marker));
  const out: string[] = [];
  if (at === -1) return out;
  for (const line of lines.slice(at + 1)) {
    if (!line.startsWith("> - ")) break;
    out.push(line.slice(4));
  }
  return out;
}
/** Plant ids in a text, each once, in the order the text first names them. */
const plantIds = (text: string): string[] => [...new Set(text.match(/\b(?:G-[TS]|C-TOP)-[A-Z]+(?:-[A-Z]+)*\b/g) ?? [])];
/** A raw list such as 'heading 23, space 2' or 'heading 25 + list 1094' as indexed pins ('0:heading:23'). */
const rawPins = (text: string, separator: string): string[] =>
  text.split(separator).map((part, index) => {
    const [type, length] = part.trim().split(" ");
    return `${index}:${type}:${length}`;
  });

const DESCRIPTION = exportRow(BEAD).description;
const NOTES = exportRow(PARENT).notes;
/** wb-rdlh.3's blind spots: 'a falsifier per blind spot (CR, CRLF, duplicate definition)'. */
const BLIND_SPOTS: readonly string[] = anchored("blind-spot list in the wb-rdlh.3 description", /a falsifier per blind spot \(([^)]+)\)/.exec(DESCRIPTION)?.[1]).split(", ");
interface GatePlant {
  readonly id: string;
  readonly text: string;
  readonly bytes: number;
  readonly sha16: string;
}
const GATE_PLANT_LINE = /^(L2G-[A-Z0-9-]+): (.+) \((\d+) bytes, (?:sha256\/16 )?([0-9a-f]{16})\)\.$/;
/** Refusal #3's gate plants (wb-rdlh.1 notes, its '> GATE PLANTS.' block): each id, its description and the bytes and digest it measured. */
const GATE_PLANTS: readonly GatePlant[] = quotedBlock(NOTES, "> GATE PLANTS.").map(line => {
  const match = GATE_PLANT_LINE.exec(line);
  if (match === null) throw new Error(`refusal #3's gate plant line does not read as a measured plant: ${line.slice(0, 80)}`);
  return { id: match[1] ?? "", text: match[2] ?? "", bytes: Number(match[3]), sha16: match[4] ?? "" };
});
function gatePlant(id: string): GatePlant {
  const plant = GATE_PLANTS.find(candidate => candidate.id === id);
  if (plant === undefined) throw new Error(`refusal #3's GATE PLANTS block names no ${id}`);
  return plant;
}
/** Refusal #3's control lines (its '> CONTROLS:' block). */
const GATE_CONTROLS: readonly string[] = quotedBlock(NOTES, "> CONTROLS:");
/** The two definitions refusal #3's L2G-DUPDEF line quotes: the outside one (after the H1 line) and the one in place of the blank line. */
const [OUTSIDE_DEFINITION, INSIDE_DEFINITION] = [...gatePlant("L2G-DUPDEF").text.matchAll(/'(\[gate-dup\]: [^']+)'/g)].map(match => match[1] ?? "");
/** The parked clause (d) sentence: the inside definition's title. */
const PARKED_SENTENCE = anchored("titled gate-dup definition in refusal #3's L2G-DUPDEF line", /"([^"]+)"$/.exec(INSIDE_DEFINITION ?? "")?.[1]);
const M2_LINE = anchored("M2 mechanism line in refusal #3", /^> - M2: .*\(([a-z]+ \d+(?: \+ [a-z]+ \d+)+) = (\d+) bytes, digest ([0-9a-f]{8})\)\.$/m.exec(NOTES)?.[0]);
const M2_MATCH = /\(([a-z]+ \d+(?: \+ [a-z]+ \d+)+) = (\d+) bytes, digest ([0-9a-f]{8})\)\.$/.exec(M2_LINE);
/** The merged three raws the M2 line names (heading 25 + list 1094 + space 2), the frozen byte count and the frozen digest prefix. */
const MERGED_RAWS: readonly string[] = rawPins(M2_MATCH?.[1] ?? "", " + ");
const FROZEN_BYTES = Number(M2_MATCH?.[2]);
const FROZEN_DIGEST = M2_MATCH?.[3] ?? "";
interface Member {
  readonly label: string;
  readonly text: string;
}
/** Refusal #4's UNMET members (a), (b) and (c): each heading and its text, the first line of each in wb-rdlh.1's notes. */
const MEMBERS: Readonly<Record<string, Member>> = Object.fromEntries(
  ["a", "b", "c"].map(letter => {
    const match = new RegExp(`^> \\(${letter}\\) ([A-Z0-9_ ]+)\\. (.+)$`, "m").exec(NOTES);
    return [letter, { label: anchored(`refusal #4 UNMET member (${letter})`, match?.[1]), text: match?.[2] ?? "" }];
  }),
);
function member(letter: string): Member {
  const found = MEMBERS[letter];
  if (found === undefined) throw new Error(`no refusal #4 member (${letter})`);
  return found;
}
/** Member (c)'s four raws ('four tokens: heading 23, space 2, list 1094, space 2 = 1121'). */
const FOUR_RAWS = /four tokens: ([a-z]+ \d+(?:, [a-z]+ \d+)+) = (\d+)/.exec(member("c").text);

// --- the judged set ----------------------------------------------------------------------------------------------------------------------------
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  { id: "CR", label: "CR", pins: ["LONE-CR"] },
  { id: "CRLF", label: "CRLF", pins: ["L2G-CR-BULLET2", "L2G-CR-BLANK", "L2G-CRLF-BODY"] },
  { id: "DUPDEF", label: "duplicate definition", pins: ["L2G-DUPDEF"] },
  { id: "CONTROLS", label: "CONTROLS", pins: ["L2G-DUPDEF-NOOUT", "L2G-SPACE-BULLET2", "L2G-SPACE-BLANK", "CRLF-ANCHOR-LINES", "OUTSIDE-DEFINITION"] },
  {
    id: "a",
    label: "TERMS AT NESTING DEPTH",
    pins: [
      "G-T-NESTED-TABLE-BODY",
      "G-T-NESTED-TABLE-HEAD",
      "G-T-NESTED-TABLE-TERM-ONLY",
      "G-T-ITEM-QUOTE-LIST",
      "G-T-ITEM-QUOTE-TABLE",
      "G-T-NESTED-ITEM-TABLE",
      "G-T-QUOTE-TABLE",
      "G-T-QUOTE-TABLE-TERM-ONLY",
      "G-T-QUOTE-QUOTE-LIST",
      "C-TOP-TABLE",
      "C-TOP-QUOTE-LIST",
      "G-T-QUOTE-LIST",
      "G-T-QUOTE-QUOTE-PARA",
      "G-T-ITEM-QUOTE-PARA",
      "G-T-TABLE-HEAD-TOP",
      "G-T-QUOTE-INDENTED-CODE",
    ],
  },
  { id: "b", label: "M2 AT NESTING DEPTH", pins: ["G-S-ITEM-DUPDEF", "G-S-ITEM-DUPDEF-NOTITLE", "C-TOP-DUPDEF"] },
  { id: "c", label: "FROZEN_SECTION ENUMERATION", pins: ["0:heading:23", "1:space:2", "2:list:1094", "3:space:2"] },
];
/** The CONTROLS lines refusal #3 writes without a plant id, by their leading phrase. */
const CONTROL_PHRASES: Readonly<Record<string, string>> = {
  "A CRLF on the heading, first-bullet or anchor line": "CRLF-ANCHOR-LINES",
  "The outside definition alone": "OUTSIDE-DEFINITION",
};

// --- the plants: the page with one edit, in memory ---------------------------------------------------------------------------------------------
type PageEdit = (page: string) => string;
const PAGE_TITLE = PAGE.slice(0, PAGE.indexOf("\n") + 1);
const HEADING_LINE = `## ${HEADING}\n`;
const NEXT_HEADING_LINE = "## Credential boundaries\n";
const FIRST_BULLET = "- Caller identity and scope bound at workbench entry point; impersonation from script payload prohibited.\n";
const SECOND_BULLET = "- Separate discover, inspect, observe, invoke and control grants.\n";
const EIGHTH_BULLET = "- Source/deployment pin must be checked before loading; malformed schema/unsupported contract fails closed.\n";
/** The page's text from the section's heading line up to the next section's heading line, found by the two lines (plant machinery). */
const sectionSlice = (page: string): string => page.slice(page.indexOf(HEADING_LINE), page.indexOf(NEXT_HEADING_LINE));
/** A CR before the LF of the line given. */
const crBefore =
  (line: string): PageEdit =>
  page =>
    page.replace(line, () => `${line.slice(0, -1)}${CR}\n`);
/** The block given after the eighth bullet (the gate's zzAfterEighth). */
const afterEighth =
  (block: string): PageEdit =>
  page =>
    page.replace(EIGHTH_BULLET, () => `${EIGHTH_BULLET}${block}`);
/** The outside definition after the page's title line. */
const withOutside: PageEdit = page => page.replace(PAGE_TITLE, () => `${PAGE_TITLE}${OUTSIDE_DEFINITION}\n`);
/** The inside definition in place of the blank line after the heading. */
const withInside: PageEdit = page => page.replace(`${HEADING_LINE}\n`, () => `${HEADING_LINE}${INSIDE_DEFINITION}\n`);
/** The inside definition without its title. */
const UNTITLED_DEFINITION = (INSIDE_DEFINITION ?? "").slice(0, (INSIDE_DEFINITION ?? "").indexOf(' "'));
const S = PARKED_SENTENCE;
const PLANTS: Readonly<Record<string, PageEdit>> = {
  "LONE-CR": page => page.replace(SECOND_BULLET, () => `${SECOND_BULLET.slice(0, -1)}${CR}`),
  "L2G-CR-BULLET2": crBefore(SECOND_BULLET),
  "L2G-CR-BLANK": page => page.replace(`${HEADING_LINE}\n`, () => `${HEADING_LINE}${CR}\n`),
  "L2G-CRLF-BODY": page =>
    page.replace(sectionSlice(page), slice =>
      slice
        .split("\n")
        .map((line, index, lines) => (index === lines.length - 1 || [HEADING_LINE, FIRST_BULLET, EIGHTH_BULLET].includes(`${line}\n`) ? line : `${line}${CR}`))
        .join("\n"),
    ),
  "L2G-DUPDEF": page => withInside(withOutside(page)),
  "L2G-DUPDEF-NOOUT": withInside,
  "L2G-SPACE-BULLET2": page => crBefore(SECOND_BULLET)(page).split(CR).join(" "),
  "L2G-SPACE-BLANK": page => page.replace(`${HEADING_LINE}\n`, () => `${HEADING_LINE}${CR}\n`).split(CR).join(" "),
  "CRLF-ANCHOR-LINES": page => crBefore(EIGHTH_BULLET)(crBefore(FIRST_BULLET)(crBefore(HEADING_LINE)(page))),
  "OUTSIDE-DEFINITION": withOutside,
  "G-T-NESTED-TABLE-BODY": afterEighth(`\n  | Record rule |\n  | --- |\n  | ${S} |\n`),
  "G-T-NESTED-TABLE-HEAD": afterEighth(`\n  | ${S} |\n  | --- |\n  | record |\n`),
  "G-T-NESTED-TABLE-TERM-ONLY": afterEighth("\n  | Record rule |\n  | --- |\n  | never softens |\n"),
  "G-T-ITEM-QUOTE-LIST": afterEighth(`\n  > - ${S}\n`),
  "G-T-ITEM-QUOTE-TABLE": afterEighth(`\n  > | Record rule |\n  > | --- |\n  > | ${S} |\n`),
  "G-T-NESTED-ITEM-TABLE": afterEighth(`  - nested entry\n\n    | Record rule |\n    | --- |\n    | ${S} |\n`),
  "G-T-QUOTE-TABLE": afterEighth(`\n> | Record rule |\n> | --- |\n> | ${S} |\n`),
  "G-T-QUOTE-TABLE-TERM-ONLY": afterEighth("\n> | Record rule |\n> | --- |\n> | authorization input |\n"),
  "G-T-QUOTE-QUOTE-LIST": afterEighth(`\n> > - ${S}\n`),
  "C-TOP-TABLE": afterEighth(`\n| Record rule |\n| --- |\n| ${S} |\n`),
  "C-TOP-QUOTE-LIST": afterEighth(`\n> - ${S}\n`),
  "G-T-QUOTE-LIST": afterEighth(`\n> - ${S}\n`),
  "G-T-QUOTE-QUOTE-PARA": afterEighth(`\n> > ${S}\n`),
  "G-T-ITEM-QUOTE-PARA": afterEighth(`\n  > ${S}\n`),
  "G-T-TABLE-HEAD-TOP": afterEighth(`\n| ${S} |\n| --- |\n| record |\n`),
  "G-T-QUOTE-INDENTED-CODE": afterEighth(`\n>     ${S}\n`),
  "G-S-ITEM-DUPDEF": page => afterEighth(`\n  ${INSIDE_DEFINITION}\n`)(withOutside(page)),
  "G-S-ITEM-DUPDEF-NOTITLE": page => afterEighth(`\n  ${UNTITLED_DEFINITION}\n`)(withOutside(page)),
  "C-TOP-DUPDEF": page => afterEighth(`\n${INSIDE_DEFINITION}\n`)(withOutside(page)),
};
/** Each measured pin's reading of its planted page: [bytes, sha-256/16, tiled, the parked terms its source states]. */
const WITNESS: Readonly<Record<string, readonly [number, string, boolean, readonly string[]]>> = {
  "LONE-CR": [1121, "d11c046d59f5b2e8", false, []],
  "CRLF-ANCHOR-LINES": [1124, "e8a4d45ab20b87f0", false, []],
  "G-T-NESTED-TABLE-BODY": [1252, "553f921e8d3a4ad1", true, ["authorization input", "never softens"]],
  "G-T-NESTED-TABLE-HEAD": [1247, "fe432748bdf87812", true, ["authorization input", "never softens"]],
  "G-T-NESTED-TABLE-TERM-ONLY": [1170, "8f1199b56b022306", true, ["never softens"]],
  "G-T-ITEM-QUOTE-LIST": [1224, "8230eb5452cdc6b2", true, ["authorization input", "never softens"]],
  "G-T-ITEM-QUOTE-TABLE": [1258, "abc93effa548b1a3", true, ["authorization input", "never softens"]],
  "G-T-NESTED-ITEM-TABLE": [1275, "59d9ef713e433b87", true, ["authorization input", "never softens"]],
  "G-T-QUOTE-TABLE": [1252, "1ad2258935844cef", true, ["authorization input", "never softens"]],
  "G-T-QUOTE-TABLE-TERM-ONLY": [1176, "2da4b0c3973f5502", true, ["authorization input"]],
  "G-T-QUOTE-QUOTE-LIST": [1224, "d5dabec081e28306", true, ["authorization input", "never softens"]],
  "C-TOP-TABLE": [1246, "38803a82f39b74b5", true, ["authorization input", "never softens"]],
  "C-TOP-QUOTE-LIST": [1222, "892a958ea88be426", true, ["authorization input", "never softens"]],
  "G-T-QUOTE-LIST": [1222, "892a958ea88be426", true, ["authorization input", "never softens"]],
  "G-T-QUOTE-QUOTE-PARA": [1222, "220079ab793cc6e4", true, ["authorization input", "never softens"]],
  "G-T-ITEM-QUOTE-PARA": [1222, "d6f4614740b6c4fe", true, ["authorization input", "never softens"]],
  "G-T-TABLE-HEAD-TOP": [1241, "c98bc012dfe37ae3", true, ["authorization input", "never softens"]],
  "G-T-QUOTE-INDENTED-CODE": [1224, "aeac87f5910801cd", true, ["authorization input", "never softens"]],
  "G-S-ITEM-DUPDEF": [1256, "c72cc8aa2cbc0173", true, ["authorization input", "never softens"]],
  "G-S-ITEM-DUPDEF-NOTITLE": [1158, "b3d0eeda4e2b1365", true, []],
  "C-TOP-DUPDEF": [1254, "58cf731f06ac6e6e", false, ["authorization input", "never softens"]],
};
function witness(pin: string): readonly [number, string, boolean, readonly string[]] {
  const found = WITNESS[pin];
  if (found === undefined) throw new Error(`no measured witness for ${pin}`);
  return found;
}
function planted(pin: string): string {
  const edit = PLANTS[pin];
  if (edit === undefined) throw new Error(`no plant ${pin}`);
  return edit(PAGE);
}
const BASE: SectionSource = sectionSource(PAGE, HEADING);
const normalized = (text: string): string => text.replace(/\r\n|\r/g, "\n");
const crsBeforeLf = (text: string): number => text.split(`${CR}\n`).length - 1;
const measured = (reading: SectionSource): readonly [number, string, boolean, readonly string[]] => [reading.bytes, reading.sha256.slice(0, 16), reading.tiled, termsStated(reading.source, PARKED_TERMS)];
/** The text between the line starting with the section's heading and the line starting with the next section's heading (no marked). */
function oracleSlice(page: string): string {
  const start = page.indexOf(`\n## ${HEADING}`);
  const end = page.indexOf("\n## Credential boundaries");
  return start === -1 || end === -1 ? "" : page.slice(start + 1, end + 1);
}
/** Two edits outside the section's span: a CR before the title line's LF, and two definitions of one new label after the page's last
 * line (the second repeats the first, so the lexer drops it). */
const outsideEdits: PageEdit = page => `${page.replace(PAGE_TITLE, () => `${PAGE_TITLE.slice(0, -1)}${CR}\n`)}\n[gate-out]: #threat-categories\n[gate-out]: #auditability\n`;
const NBSP = String.fromCodePoint(0xa0);
const ZWSP = String.fromCodePoint(0x200b);
/** The reader-contract cases outside the judged set, each run to its end (records). */
const CONTRACT: readonly string[] = ["BINDING-REFUSED", "BINDING-BOUND", "SUBSECTION", "NBSP-IN-SECTION", "TERMS-CASE-AND-SPACE"];

// --- the cases ------------------------------------------------------------------------------------------------------------------------------
/** Each row's judgement of one pin's reading of its planted page. */
const JUDGES: Readonly<Record<string, (pin: string, reading: SectionSource, page: string) => void>> = {
  CR: (pin, reading) => {
    expect(measured(reading), `${pin}: the source's bytes, digest, tiling and terms`).toEqual(witness(pin));
    expect([reading.crs, crsBeforeLf(reading.source)], `${pin}: the source carries a CR that no LF follows`).toEqual([1, 0]);
    expect([normalized(reading.source) === BASE.source, reading.source === BASE.source], `${pin}: the baseline once its CR reads as LF, not before`).toEqual([true, false]);
    expect(reading.tokenText, `${pin}: what marked's tokens carry of the section is the baseline (the CR blind spot)`).toBe(BASE.source);
  },
  CRLF: (pin, reading) => {
    const gate = gatePlant(pin);
    expect([reading.bytes, reading.sha256.slice(0, 16)], `${pin}: the bytes and sha-256/16 refusal #3's gate measured`).toEqual([gate.bytes, gate.sha16]);
    expect([reading.crs, crsBeforeLf(reading.source)], `${pin}: one CR per added byte, each before an LF`).toEqual([gate.bytes - BASE.bytes, gate.bytes - BASE.bytes]);
    expect([normalized(reading.source) === BASE.source, reading.tiled], `${pin}: the baseline once each CRLF reads as LF; the page untiled`).toEqual([true, false]);
    expect(reading.tokenText, `${pin}: what marked's tokens carry of the section is the baseline (the CRLF blind spot)`).toBe(BASE.source);
  },
  DUPDEF: (pin, reading) => {
    const gate = gatePlant(pin);
    expect([reading.bytes, reading.sha256.slice(0, 16)], `${pin}: the bytes and sha-256/16 refusal #3's gate measured`).toEqual([gate.bytes, gate.sha16]);
    expect([reading.source.includes(`${HEADING_LINE}${INSIDE_DEFINITION}\n`), reading.source.includes(OUTSIDE_DEFINITION ?? "")], `${pin}: the repeated definition in the source, the outside one not`).toEqual([true, false]);
    expect([termsStated(reading.source, PARKED_TERMS), reading.tiled], `${pin}: both parked terms stated in its title; the page untiled`).toEqual([PARKED_TERMS, false]);
    expect(reading.tokens.map((token, index) => `${index}:${token.type}:${token.length}`), `${pin}: the merged three raws refusal #3's M2 line names`).toEqual(MERGED_RAWS);
    expect(reading.tokenText, `${pin}: what marked's tokens carry of the section is the baseline (the duplicate-definition blind spot)`).toBe(BASE.source);
  },
  CONTROLS: (pin, reading, page) => {
    if (pin === "L2G-DUPDEF-NOOUT") {
      const dupdef = sectionSource(planted("L2G-DUPDEF"), HEADING);
      expect([reading.source === dupdef.source, reading.sha256.slice(0, 16)], `${pin}: the source L2G-DUPDEF reads, the gate's digest`).toEqual([true, gatePlant("L2G-DUPDEF").sha16]);
      expect([reading.tiled, reading.tokenText === reading.source, reading.tokenText === BASE.source], `${pin}: tiled; a def token carries the definition`).toEqual([true, true, false]);
      return;
    }
    if (pin === "L2G-SPACE-BULLET2" || pin === "L2G-SPACE-BLANK") {
      const paired = gatePlant(pin.replace("SPACE", "CR"));
      expect(page, `${pin}: the paired CR plant with a space where its CR went`).toBe(planted(paired.id).split(CR).join(" "));
      expect([reading.bytes, reading.sha256.slice(0, 16) === paired.sha16, reading.crs], `${pin}: the plant's byte count, another digest, no CR`).toEqual([paired.bytes, false, 0]);
      expect([reading.tiled, reading.tokenText === reading.source, reading.tokenText === BASE.source], `${pin}: tiled; the tokens carry the space`).toEqual([true, true, false]);
      return;
    }
    if (pin === "CRLF-ANCHOR-LINES") {
      expect(measured(reading), `${pin}: the source's bytes, digest, tiling and terms`).toEqual(witness(pin));
      expect([reading.crs, crsBeforeLf(reading.source), reading.tokenText === BASE.source], `${pin}: three CRs, each before an LF; the tokens carry the baseline`).toEqual([3, 3, true]);
      return;
    }
    if (pin === "OUTSIDE-DEFINITION") {
      expect([page.includes(OUTSIDE_DEFINITION ?? "-"), reading.source === BASE.source, reading.tiled], `${pin}: an edit outside the span leaves the source the baseline`).toEqual([true, true, true]);
      return;
    }
    throw new Error(`CONTROLS has no judgement for ${pin}`);
  },
  a: (pin, reading, page) => {
    expect(measured(reading), `${pin}: the source's bytes, digest, tiling and the parked terms it states`).toEqual(witness(pin));
    const at = PAGE.indexOf(EIGHTH_BULLET) + EIGHTH_BULLET.length;
    const added = page.slice(at, at + page.length - PAGE.length);
    expect([added.length > 0, reading.source.includes(added)], `${pin}: the edit's text inside the source`).toEqual([true, true]);
    expect(termsStated(added, PARKED_TERMS), `${pin}: the terms read are the ones the edit spells`).toEqual(witness(pin)[3]);
  },
  b: (pin, reading) => {
    expect(measured(reading), `${pin}: the source's bytes, digest, tiling and the parked terms it states`).toEqual(witness(pin));
    const definition = pin === "G-S-ITEM-DUPDEF-NOTITLE" ? `  ${UNTITLED_DEFINITION}\n` : pin === "C-TOP-DUPDEF" ? `\n${INSIDE_DEFINITION}\n` : `  ${INSIDE_DEFINITION}\n`;
    expect([reading.source.includes(definition), reading.source.includes(OUTSIDE_DEFINITION ?? "-")], `${pin}: the repeated definition in the source, the outside one not`).toEqual([true, false]);
  },
  c: pin => {
    const [index, type, length] = pin.split(":");
    expect(BASE.tokens[Number(index)], `${pin}: the real page's section token at that place`).toEqual({ type, length: Number(length) });
    expect([BASE.tokens.length, BASE.tokenText === BASE.source], `${pin}: four tokens whose raws re-joined are the source`).toEqual([4, true]);
  },
};

const REACHED = new Set<string>();

describe("wb-rdlh.3 docs12 'Authorization design' raw-source reader census (LIBRARY-COMPOSITIONAL-AUTONOMOUS-COMPUTATION-R1)", () => {
  it("judged set, frozen shape: ROWS pins its own row/pin-count literal", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["CR:1", "CRLF:3", "DUPDEF:1", "CONTROLS:5", "a:16", "b:3", "c:4"]);
    expect(Object.keys(JUDGES).sort(), "one judgement per row").toEqual(ROWS.map(row => row.id).sort());
  });

  it("judged set, outside anchors: rows CR, CRLF and DUPDEF are wb-rdlh.3's blind spots, each holding a pin", () => {
    expect(ROWS.slice(0, 3).map(row => row.label), "the description's 'a falsifier per blind spot (...)' list, in order").toEqual(BLIND_SPOTS);
    expect(
      ROWS.slice(0, 3).map(row => row.pins.length > 0),
      "every blind spot holds a pin",
    ).toEqual(BLIND_SPOTS.map(() => true));
  });

  it("judged set, outside anchors: CRLF and DUPDEF hold refusal #3's gate plants and its M2 line's frozen bytes", () => {
    expect(GATE_PLANTS.map(plant => plant.id).sort(), "refusal #3's GATE PLANTS ids").toEqual([...(ROWS[1]?.pins ?? []), ...(ROWS[2]?.pins ?? [])].sort());
    expect(
      GATE_PLANTS.map(plant => [plant.id, plant.text.includes("[gate-dup]") ? "DUPDEF" : "CRLF"]),
      "a plant whose line quotes a definition is DUPDEF's, a CR plant CRLF's",
    ).toEqual(GATE_PLANTS.map(plant => [plant.id, ROWS.find(row => row.pins.includes(plant.id))?.id]));
    expect([BASE.bytes, BASE.sha256.slice(0, 8)], "the baseline is the frozen section refusal #3's M2 line measures").toEqual([FROZEN_BYTES, FROZEN_DIGEST]);
    expect([OUTSIDE_DEFINITION, PARKED_SENTENCE.length > 0], "the outside definition L2G-DUPDEF quotes").toEqual(["[gate-dup]: #threat-categories", true]);
  });

  it("judged set, outside anchors: CONTROLS maps refusal #3's control lines, in order", () => {
    const expected = GATE_CONTROLS.flatMap(line => {
      const head = line.slice(0, line.indexOf(":"));
      const ids = head.match(/L2G-[A-Z0-9-]+/g);
      const phrase = CONTROL_PHRASES[head];
      return ids ?? (phrase === undefined ? [`unmapped: ${head}`] : [phrase]);
    });
    expect(expected, "refusal #3's control lines").toEqual(ROWS[3]?.pins);
  });

  it("judged set, outside anchors: rows a, b and c are refusal #4's UNMET members (a), (b) and (c)", () => {
    expect(ROWS.slice(4).map(row => row.label), "the members' headings").toEqual(["a", "b", "c"].map(letter => member(letter).label));
    expect([ROWS[4]?.pins, ROWS[5]?.pins], "the plant ids members (a) and (b) name, in order").toEqual([plantIds(member("a").text), plantIds(member("b").text)]);
    expect([ROWS[6]?.pins, ROWS[6]?.pins.reduce((sum, pin) => sum + Number(pin.split(":")[2]), 0)], "member (c)'s four raws and their sum").toEqual([rawPins(FOUR_RAWS?.[1] ?? "", ","), Number(FOUR_RAWS?.[2])]);
  });

  it("BASELINE: the real page's section is its own 1121 bytes, tiled, stating no parked term", () => {
    const start = Buffer.byteLength(PAGE.slice(0, BASE.start), "utf8");
    expect([BASE.ok, BASE.why, BASE.crs, BASE.tiled, BASE.tokenText === BASE.source, termsStated(BASE.source, PARKED_TERMS)]).toEqual([true, "", 0, true, true, []]);
    expect(Buffer.from(PAGE, "utf8").equals(PAGE_BYTES), "the file's bytes are its UTF-8 text").toBe(true);
    expect(PAGE_BYTES.subarray(start, start + BASE.bytes).equals(Buffer.from(BASE.source, "utf8")), "the source is the file's own bytes over the span").toBe(true);
    expect([BASE.source, BASE.bytes], "the span is the heading line through the line before the next heading").toEqual([sectionSlice(PAGE), FROZEN_BYTES]);
    expect(sectionSource(outsideEdits(PAGE), HEADING).source, "edits outside the span leave the source the baseline").toBe(BASE.source);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, () => {
          const judge = JUDGES[row.id];
          if (judge === undefined) throw new Error(`no judgement for row ${row.id}`);
          if (row.id === "c") {
            judge(pin, BASE, PAGE);
          } else {
            const page = planted(pin);
            expect(page, `${pin} edits the page`).not.toBe(PAGE);
            const reading = sectionSource(page, HEADING);
            expect([reading.ok, reading.why], `${pin}: the section binds`).toEqual([true, ""]);
            expect(reading.source, `${pin}: the span the two heading lines bound, found without marked`).toBe(oracleSlice(page));
            expect(sectionSource(outsideEdits(page), HEADING).source, `${pin}: edits outside the span leave its source as it reads`).toBe(reading.source);
            judge(pin, reading, page);
          }
          REACHED.add(`${row.id}/${pin}`);
        });
      }
    });
  }

  describe("READER CONTRACT (not judged rows)", () => {
    it("BINDING-REFUSED: two top-level level-2 headings (DUP-HEADING) or none (HEADING-ENTITY) refuse, with an empty source and a reason", () => {
      const twice = sectionSource(`${PAGE}\n${HEADING_LINE}\n${PARKED_SENTENCE}\n`, HEADING);
      const none = sectionSource(PAGE.replace(HEADING_LINE, () => "## Authorization&nbsp;design\n"), HEADING);
      expect([twice.ok, twice.source, twice.why.includes("2 level-2 headings")], "DUP-HEADING").toEqual([false, "", true]);
      expect([none.ok, none.source, none.why.includes("0 level-2 headings")], "HEADING-ENTITY").toEqual([false, "", true]);
      REACHED.add("contract/BINDING-REFUSED");
    });
    it("BINDING-BOUND: a level-3 copy of the heading is not counted (LEVEL-3-COPY); a comment in the heading renders no text (HEADING-COMMENT)", () => {
      const copy = sectionSource(`${PAGE}\n### ${HEADING}\n`, HEADING);
      expect([copy.ok, copy.source === BASE.source], "LEVEL-3-COPY").toEqual([true, true]);
      const page = PAGE.replace(HEADING_LINE, () => "## Authorization <!-- note --> design\n");
      const commented = sectionSource(page, HEADING);
      const span = page.slice(page.indexOf("\n## Authorization <!--") + 1, page.indexOf("\n## Credential boundaries") + 1);
      expect([commented.ok, commented.source === span, commented.bytes, commented.sha256.slice(0, 16)], "HEADING-COMMENT").toEqual([true, true, 1135, "7caaf4dbf0a16f4f"]);
      REACHED.add("contract/BINDING-BOUND");
    });
    it("SUBSECTION: a level-3 heading inside the section is part of its source; a level-1 or level-2 heading ends it", () => {
      const page = afterEighth("\n### Record rule\n")(PAGE);
      const reading = sectionSource(page, HEADING);
      expect([reading.ok, reading.source === oracleSlice(page), reading.source.includes("\n### Record rule\n"), reading.bytes, reading.sha256.slice(0, 16)]).toEqual([true, true, true, 1138, "1dc1a52c9a732248"]);
      const appendix = afterEighth("\n# Appendix\n")(PAGE);
      const ended = sectionSource(appendix, HEADING);
      expect([ended.ok, ended.source === BASE.source, appendix.includes("\n# Appendix\n\n## Credential boundaries\n")], "LEVEL-1-END: a level-1 heading there ends the source before it").toEqual([true, true, true]);
      REACHED.add("contract/SUBSECTION");
    });
    it("NBSP-IN-SECTION: bytes counts the UTF-8 encoding (a no-break space is two bytes, one code unit)", () => {
      const page = PAGE.replace(SECOND_BULLET, () => `${SECOND_BULLET.slice(0, -1)}${NBSP}\n`);
      const reading = sectionSource(page, HEADING);
      expect([reading.ok, reading.source === oracleSlice(page), reading.source.length, reading.bytes, Buffer.from(reading.source, "utf8").length, reading.sha256.slice(0, 16)]).toEqual([true, true, 1122, 1123, 1123, "2a86464ee93a20a4"]);
      REACHED.add("contract/NBSP-IN-SECTION");
    });
    it("TERMS-CASE-AND-SPACE: termsStated reads a term in any letter case and across any run of white space, in the order the terms are given", () => {
      expect(termsStated("a record is never an Authorization INPUT", PARKED_TERMS), "letter case").toEqual(["authorization input"]);
      expect(termsStated(`UNKNOWN never${CR}\n\tsoftens it`, PARKED_TERMS), "a CRLF and a tab between the words").toEqual(["never softens"]);
      expect(termsStated(`authorization${NBSP}input`, PARKED_TERMS), "a no-break space (JavaScript's \\s matches it)").toEqual(["authorization input"]);
      expect(termsStated(`authorization${ZWSP}input`, PARKED_TERMS), "a zero-width space is no white space").toEqual([]);
      expect(termsStated("never  softens, then authorization input", PARKED_TERMS), "two terms, in the order given").toEqual(["authorization input", "never softens"]);
      REACHED.add("contract/TERMS-CASE-AND-SPACE");
    });
  });

  it("records: every pin and every contract case ran its own case to the end", () => {
    expect([...REACHED].sort()).toEqual([...ROWS.flatMap(row => row.pins.map(pin => `${row.id}/${pin}`)), ...CONTRACT.map(id => `contract/${id}`)].sort());
  });
});
