/**
 * wb-rdlh.3 (LIBRARY-COMPOSITIONAL-AUTONOMOUS-COMPUTATION-R1; the rule-19 structural-exit child of wb-rdlh.1, orchestrator rulings R-B137
 * and R-B169): the raw-source reader census for the 'Authorization design' section of docs/workbench/12-security.md. The reader
 * (test/helpers/docs-section-source.ts) and this census are test-only; no src path, no docs page and no other census changes.
 *
 * THE READER. sectionSource(page, heading) binds the section in marked 18.0.11's top-level tokens of the page (exactly one level-2 heading
 * whose TOKEN TEXT is the heading: the text marked's inline tokens carry, an HTML token none and markup its children's text, a character
 * reference as spelled and never decoded, every run of white space read as one space and the ends trimmed; the section runs to the next
 * top-level level-1 or level-2 heading or the page's end) and returns its SOURCE: the page's own text from the first character the lexer's
 * top-level step for the heading token consumed up to the first character the step for the next such heading consumed, or the page's end.
 * The steps' offsets come from a block extension that returns no token, on a Marked instance; they index the lexer's LF text and map back
 * through every CR and CRLF it rewrote. So the source carries the CR and CRLF line endings and the link reference definitions inside that
 * span as the page spells them, a definition whose label repeats an earlier one's included; bytes and sha256 are its UTF-8 encoding's
 * length and digest, crs its CR count. Beside it the reader returns what marked carries of the section: its top-level tokens (type and
 * raw length) and their raws re-joined (tokenText, the token-raw view wb-rdlh.1's docsBinding hashed, which the bead says is blind to
 * both), and whether the page's top-level raws re-joined are the page itself (tiled). termsStated(text, terms) returns the terms, in the
 * order given, that a text spells out in any letter case, every run of white space (what JavaScript's \s matches) read as one space.
 *
 * PINNED READER SET (this file; one case per pin, titled '<row id> <row label>' > '<pin>'; every result below is green at this cut):
 * - BASELINE (anchored, not a judged row): the page on disk binds; its source is 1121 bytes with the digest prefix refusal #3 records,
 *   byte for byte the file's own bytes over the span (the file's bytes are its UTF-8 text); the page is tiled; tokenText is the source; no
 *   parked term is stated; the edits outside the span named below leave the source the baseline; and marked's level-2 headings of the page
 *   hold the heading's line once and none of refusal #1's twin heading lines (so a twin planted on disk reds the census).
 * - CR (1 pin) LONE-CR, a lone CR in place of the second bullet's LF: the source carries that CR (1121 bytes, the CR before no LF) and is not
 *   the baseline; with an LF after its CR it has the bytes and sha-256/16 refusal #3's gate measured for L2G-CR-BULLET2 (one CR before the
 *   second bullet's LF); with the CR read as LF it is the baseline, and tokenText is the baseline (the CR blind spot, reproduced).
 * - CRLF (3 pins) refusal #3's gate plants L2G-CR-BULLET2, L2G-CR-BLANK and L2G-CRLF-BODY: each source has the bytes and the sha-256/16 the
 *   gate measured, one CR per added byte, each before an LF; with each CRLF read as LF it is the baseline; the page is untiled; tokenText is
 *   the baseline (the CRLF blind spot, reproduced).
 * - DUPDEF (1 pin) L2G-DUPDEF, built from the two definitions the gate's line quotes: the source has the gate's bytes and sha-256/16 and
 *   carries the repeated definition, not the outside one, and states both parked terms; the page is untiled; the section's tokens are the
 *   merged three raws refusal #3's M2 line names, and tokenText is the baseline (the duplicate-definition blind spot, reproduced).
 * - CONTROLS (5 pins) refusal #3's control lines, the row labelled as their block is: L2G-DUPDEF-NOOUT (the same definition, its label not
 *   defined before: L2G-DUPDEF's page without the outside definition, the same source as L2G-DUPDEF with the gate's digest, the page tiled,
 *   tokenText the source and not the baseline); L2G-SPACE-BULLET2 and L2G-SPACE-BLANK (each the paired CR plant with a space where its CR
 *   went: that plant's byte count, another digest, no CR, the page tiled, tokenText the source and not the baseline); CRLF-ANCHOR-LINES (a
 *   CRLF on the heading, first-bullet and eighth-bullet lines, the three L2G-CRLF-BODY leaves without one: its bytes and sha-256/16, three
 *   CRs, each before an LF, tokenText the baseline, and with its CRs toggled on every section line the bytes and sha-256/16 the gate
 *   measured for L2G-CRLF-BODY); OUTSIDE-DEFINITION (the outside definition alone, after the H1 line where L2G-DUPDEF's line puts it:
 *   L2G-DUPDEF's page without the inside definition, the source the baseline and the page tiled).
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
 * - READER CONTRACT (5 cases, not judged rows): BINDING-REFUSED (the heading and the parked sentence repeated after the page's last line:
 *   two top-level level-2 headings whose token text is the heading; the heading's space spelled as the reference '&nbsp;', which the token
 *   text carries undecoded: no such heading; each refused, with an empty source and a reason);
 *   BINDING-BOUND (a level-3 copy of the heading after the page's last line is not counted: the source is the baseline; an HTML comment in
 *   the heading is an HTML token, which carries no token text: it binds and its source is the span its heading line opens); SUBSECTION (a
 *   level-3 heading after the eighth bullet is inside the source, which ends at the next level-2 heading; a level-1 heading there instead
 *   ends the source before it, so the source is the baseline: LEVEL-1-END); NBSP-IN-SECTION (a no-break space in the second bullet: bytes
 *   is the UTF-8 count, one more than the code units); TERMS-CASE-AND-SPACE (termsStated reads a term in mixed case, across a CRLF and a
 *   tab, and across a no-break space; not across a zero-width space; two terms in the order given).
 * - RESIDUAL REFERENCE-TWIN (4 cases, not judged rows; the pinned quiet rows of RESIDUALS below): refusal #1's G2-ENTITY-TWIN, G2-NUMREF-TWIN
 *   and G2-HEXREF-TWIN, the page plus the level-2 heading line that refusal names for each (the heading spelled with '&nbsp;' or '&#32;' for
 *   its space, or '&#x41;' for its first letter): marked's top-level tokens hold the heading and the twin as level-2 headings, and the
 *   binding binds the heading's section, the baseline bytes and sha-256/16 that refusal measured; for the '&nbsp;' twin the shared view
 *   (test/helpers/census.ts docsSection) refuses the page with the reason that refusal quotes. G2-PLAIN-TWIN (the plain heading line, the
 *   control): refused, two headings.
 * Every pin of rows CR through b also reads, on its planted page, a source equal to the text between the line that starts with the section's heading
 * and the line that starts with the next section's heading, found by those two strings alone (an oracle that does not run marked), and
 * the same source once the planted page also carries two edits outside the span (a CR before the title line's LF; two definitions of one
 * new label after the page's last line, the second repeating the first). The records case reds when any pin, contract case or residual case
 * stops early.
 * INDEPENDENT FALSIFIERS: the outside anchors below, read at run time, name every judged row's label and every pin, so a label shortened
 * or changed, or a pin dropped, renamed or removed from every literal here, reds against text this file does not author. Where a gate
 * measured a page, a pin's planted page is bound to that measurement as well, so swapping it for another passing page with its witness
 * re-measured reds too: the four L2G plants by the bytes and sha-256/16 refusal #3's gate measured; LONE-CR (with an LF after its CR, the
 * L2G-CR-BULLET2 reading), CRLF-ANCHOR-LINES (its CRs toggled, the L2G-CRLF-BODY reading), L2G-SPACE-BULLET2 and L2G-SPACE-BLANK (the
 * paired plant's page with a space for its CR) and L2G-DUPDEF-NOOUT (L2G-DUPDEF's page without the outside definition) through those
 * readings; OUTSIDE-DEFINITION by the definition and the place ('after the H1 line') L2G-DUPDEF's line quotes; row c by the four raws
 * member (c) names. Rows a and b's pins are bound by id and order only (see NOT CLAIMED).
 * MEASURED AT THIS CUT (each a throwaway in-place edit, the census run alone, every file restored byte-exact): CT-BATTERY v2: CT1 red=2;
 * CT1b red=2; CT2 red=1; CT3 red=2; CT4 red=2; CT5 red=1; CT6 red=2 (CT1 drops L2G-CR-BLANK from row CRLF; CT1b G-T-QUOTE-TABLE from row
 * a; CT2 shortens row CONTROLS's label to 'CONTROL'; CT3 moves LONE-CR's CR to the third bullet's LF, its witness re-measured; CT4 deletes
 * row b and its judgement; CT5 also drops 'b:3' from the frozen literal, killed by member (b)'s anchor; CT6 removes OUTSIDE-DEFINITION from
 * ROWS, the frozen literal, PLANTS, CONTROL_PHRASES and its judgement, killed by refusal #3's control lines and refusal #1's names).
 * Refusal #1's U1 (a) falsifiers, which read 0 failed on cut #1, now red: G2-CT2-CONTROLS-LABEL 1, G2-RENAME-LONE-CR-EVERYWHERE 1,
 * G2-SWAP-LONE-CR-TO-BULLET3 2, G2-RENAME-CRLF-ANCHOR-EVERYWHERE 1, G2-RENAME-OUTSIDE-DEF-EVERYWHERE 1 (G2-RENAME-LONE-CR-ROWS-ONLY 3; the
 * paired G2-CT2-CR-LABEL 1). Swaps of the newly bound pages, witnesses re-measured: CRLF-ANCHOR-LINES 2, OUTSIDE-DEFINITION's place 2,
 * L2G-DUPDEF-NOOUT with an unrelated edit outside the span 2; a row a placement's edit swapped, its witness re-measured, 0 (NOT CLAIMED).
 * U1 (b) twins planted on disk: G2-ENTITY-TWIN, G2-NUMREF-TWIN and G2-HEXREF-TWIN 3 each (BASELINE, the residual case, records),
 * G2-PLAIN-TWIN 44; a binding that decodes '&nbsp;' and numeric references in the heading reds HEADING-ENTITY, the three quiet rows and
 * records (5). The red-first legs: the reader's source set to the token-raw view reads 9 failed | 41 passed (50) (the CR, CRLF, DUPDEF,
 * L2G-DUPDEF-NOOUT, CRLF-ANCHOR-LINES and C-TOP-DUPDEF pins and records); terms read from the shared rendered view instead of the source
 * read 10 failed | 40 passed (50) (member (a)'s nine placements without terms and records). Fourteen reader mutants red the census (the CR
 * offset map 31, the end bound's depth above and below level 2 2 and 2, the binding's depth 2, count 3 and HTML rule 2, termsStated's case
 * 2 and white space 2, the byte count 2, the tiling's page 6, the CR count 2, the nested steps 44, a slice of the LF text 6, a span to the
 * page's end 42); dropping the instrumented-tokens equality check survives (no page reaches that refusal; NOT CLAIMED below).
 *
 * OUTSIDE ANCHORS (.beads/issues.jsonl, read at run time; the first match of each): wb-rdlh.3's description (its blind spots 'CR, CRLF,
 * duplicate definition', the labels of rows CR, CRLF and DUPDEF in order, each holding a pin); wb-rdlh.1's notes: refusal #3's GATE PLANTS
 * lines (the four plant ids, CRLF's three and DUPDEF's one, the bytes and sha-256/16 the gate measured, and the two definitions L2G-DUPDEF
 * quotes, whose title is the parked sentence, with the outside one's place), the labelled block after that list (its label is row
 * CONTROLS's label; its control lines map to CONTROLS pins, in order), its M2 mechanism line (the merged three raws, 1121 bytes and the
 * digest prefix), and refusal #4's UNMET members (a), (b) and (c) (their headings are the labels of rows a, b and c; the plant ids they name
 * are rows a and b's pins in order; the four raws (c) names are row c's pins); wb-rdlh.3's notes: refusal #1's UNMET U1 (a) lines (the pin
 * they name for row CR; the two CONTROLS pins they name as phrase-mapped, CONTROL_PHRASES's ids in order) and U1 (b) lines (the twin ids
 * in order with the heading line each adds, the baseline bytes and sha-256/16 measured for the twins, and the shared view's refusal quoted).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal.
 *
 * NOT CLAIMED (scope sentences):
 * - The shared rendered view (test/helpers/census.ts docsSection, its text at nesting depth included: the wb-aalz family) is NOT CLAIMED by
 *   this census, beyond the one refusal RESIDUAL REFERENCE-TWIN pins.
 * - A heading's text with its character references decoded (the view marked's HTML leaves to the HTML reader, and the shared view takes for
 *   '&nbsp;') is NOT CLAIMED by this census's binding, which reads token text; the family that leaves is RESIDUAL REFERENCE-TWIN below.
 * - A term spelled otherwise in the source (a character reference, a backslash or percent escape, inline markup, a comment or an invisible
 *   character between its words, a paraphrase) is NOT CLAIMED by this census's terms reading.
 * - A page other than docs/workbench/12-security.md, a heading other than 'Authorization design', and a heading that marked's top-level
 *   tokens do not hold (one nested in a list item or a block quote) are NOT CLAIMED by this census.
 * - The reader's refusal when its instrumented lexer's tokens are not marked.lexer's own, or when its recorded steps miss a token or push
 *   more than one, is NOT CLAIMED by this census (no page here reaches either).
 * - A page string with a lone surrogate (which has no UTF-8 spelling) is NOT CLAIMED by this census's byte count.
 * - A row a or b placement's edit swapped for another passing edit, its witness re-measured, is NOT CLAIMED to red by this census: those
 *   rows' pins are bound by id and order only (no text this file reads spells the gate's PREP edits).
 * RESIDUALS (named family + pinned quiet rows):
 * - REFERENCE-TWIN: a second level-2 heading that spells the heading with a character reference (refusal #1's twins: '&nbsp;' or '&#32;'
 *   for its space, '&#x41;' for its first letter). The token-text binding does not count it, so a page carrying the heading and such a twin
 *   binds the heading's section, where the shared view refuses the '&nbsp;' twin's page; the converse page, the heading itself spelled with
 *   '&nbsp;' (BINDING-REFUSED's HEADING-ENTITY), is refused here. Pinned quiet rows: test/workbench-docs12-section-source-census.test.ts
 *   'RESIDUAL REFERENCE-TWIN (pinned quiet rows)' > 'G2-ENTITY-TWIN', 'G2-NUMREF-TWIN' and 'G2-HEXREF-TWIN', each red when the binding stops
 *   binding the baseline on its page (as a reference-decoding binding would); 'G2-PLAIN-TWIN' is the control.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import { describe, expect, it } from "vitest";
import { docsSection } from "./helpers/census.js";
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
const BEAD_NOTES = exportRow(BEAD).notes;
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
/** The first labelled quoted block after the marker line: its '> <LABEL>:' line's label and the '> - ' lines under it (prefix removed). */
function blockAfter(notes: string, marker: string): { readonly label: string; readonly lines: readonly string[] } | undefined {
  const lines = notes.split("\n");
  const at = lines.findIndex(line => line.startsWith(marker));
  const head = lines.findIndex((line, index) => at !== -1 && index > at && /^> [A-Z][A-Z ]*:$/.test(line));
  if (head === -1) return undefined;
  const out: string[] = [];
  for (const line of lines.slice(head + 1)) {
    if (!line.startsWith("> - ")) break;
    out.push(line.slice(4));
  }
  return { label: (lines[head] ?? "").slice(2, -1), lines: out };
}
/** Refusal #3's control block, the labelled block after its GATE PLANTS list: its label (row CONTROLS's label) and its control lines. */
const CONTROL_BLOCK = blockAfter(NOTES, "> GATE PLANTS.");
const CONTROLS_LABEL = anchored("labelled block after refusal #3's GATE PLANTS list", CONTROL_BLOCK?.label);
const GATE_CONTROLS: readonly string[] = CONTROL_BLOCK?.lines ?? [];
/** The two definitions refusal #3's L2G-DUPDEF line quotes: the outside one (after the H1 line) and the one in place of the blank line. */
const [OUTSIDE_DEFINITION, INSIDE_DEFINITION] = [...gatePlant("L2G-DUPDEF").text.matchAll(/'(\[gate-dup\]: [^']+)'/g)].map(match => match[1] ?? "");
/** Where refusal #3's L2G-DUPDEF line puts the outside definition ('after the H1 line'). */
const OUTSIDE_PLACE = anchored("the outside definition's place in refusal #3's L2G-DUPDEF line", /'\[gate-dup\]: [^']+' (after the H1 line) \(outside the section/.exec(gatePlant("L2G-DUPDEF").text)?.[1]);
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

/** Refusal #1's UNMET U1 (a) lines (wb-rdlh.3's notes): the pin it names for row CR, and the two CONTROLS pins it names as phrase-mapped. */
const REFUSAL1_CR_PIN = anchored("refusal #1's U1 (a) line naming row CR's pin", /^- The pin ([A-Z][A-Z0-9-]*) is named by no outside anchor\./m.exec(BEAD_NOTES)?.[1]);
const REFUSAL1_PHRASE_PINS: readonly string[] = (/^- [A-Z]+ pins ([A-Z][A-Z0-9-]*) and ([A-Z][A-Z0-9-]*) are anchored only through the file's own [A-Z_]+ literal/m.exec(BEAD_NOTES) ?? []).slice(1);
/** Refusal #1's UNMET U1 (b) lines: each twin id, first naming, with the heading line it adds after the page's last line. */
function twinLines(notes: string): ReadonlyMap<string, string> {
  const twins = new Map<string, string>();
  for (const match of notes.matchAll(/\b(G2-[A-Z]+-TWIN) \((?:the real page plus |plus )?'(## [^']+)'\)/g)) {
    const [id, line] = [match[1], match[2]];
    if (id !== undefined && line !== undefined && !twins.has(id)) twins.set(id, line);
  }
  return twins;
}
const GATE_TWINS = twinLines(BEAD_NOTES);
/** The reading refusal #1 measured for the twins in memory ('to the baseline source 1121/481acac650cbfb49'), and the shared view's refusal it quotes. */
const TWIN_BASELINE = anchored("refusal #1's measured twin baseline", /to the baseline source (\d+\/[0-9a-f]{16})/.exec(BEAD_NOTES)?.[1]).split("/");
const TWIN_DOCS_WHY = anchored("refusal #1's quoted shared-view refusal of the '&nbsp;' twin", /docsSection refuses the &nbsp; twin \('([^']+)'\)/.exec(BEAD_NOTES)?.[1]);

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
/** A text's UTF-8 byte count and the first 16 hex digits of its sha-256 (the form refusal #3's gate lines record). */
const bytesAndSha16 = (text: string): readonly [number, string] => [Buffer.byteLength(text, "utf8"), createHash("sha256").update(text, "utf8").digest("hex").slice(0, 16)];
/** A section source with its CRs toggled on every line: a CR added before each LF that has none, each CR before an LF removed. */
const toggledCrs = (text: string): string =>
  text
    .split("\n")
    .map((line, index, lines) => (index === lines.length - 1 ? line : line.endsWith(CR) ? line.slice(0, -1) : `${line}${CR}`))
    .join("\n");
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
/** RESIDUAL REFERENCE-TWIN's cases, in refusal #1's order: the reference-spelled twins (the pinned quiet rows) and the plain twin (the control). */
const RESIDUAL: readonly string[] = ["G2-ENTITY-TWIN", "G2-NUMREF-TWIN", "G2-PLAIN-TWIN", "G2-HEXREF-TWIN"];
/** The page title's text (the parent heading path the shared view binds the section under). */
const TITLE_TEXT = PAGE_TITLE.replace(/^# /, "").trim();
const isLevel2Heading = (token: Token): boolean => token.type === "heading" && (token as Tokens.Heading).depth === 2;

// --- the cases ------------------------------------------------------------------------------------------------------------------------------
/** Each row's judgement of one pin's reading of its planted page. */
const JUDGES: Readonly<Record<string, (pin: string, reading: SectionSource, page: string) => void>> = {
  CR: (pin, reading) => {
    expect(measured(reading), `${pin}: the source's bytes, digest, tiling and terms`).toEqual(witness(pin));
    expect([reading.crs, crsBeforeLf(reading.source)], `${pin}: the source carries a CR that no LF follows`).toEqual([1, 0]);
    const paired = gatePlant("L2G-CR-BULLET2");
    expect(bytesAndSha16(reading.source.replace(CR, `${CR}\n`)), `${pin}: with an LF after its CR, the bytes and sha-256/16 refusal #3's gate measured for ${paired.id}`).toEqual([paired.bytes, paired.sha16]);
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
      expect([withOutside(page) === planted("L2G-DUPDEF"), page.includes(OUTSIDE_DEFINITION ?? "-")], `${pin}: L2G-DUPDEF's page without the outside definition (no earlier label)`).toEqual([true, false]);
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
      const body = gatePlant("L2G-CRLF-BODY");
      expect(bytesAndSha16(toggledCrs(reading.source)), `${pin}: its CRs toggled on every section line, the bytes and sha-256/16 refusal #3's gate measured for ${body.id} (the three lines that plant leaves without one)`).toEqual([body.bytes, body.sha16]);
      return;
    }
    if (pin === "OUTSIDE-DEFINITION") {
      expect([page.includes(OUTSIDE_DEFINITION ?? "-"), reading.source === BASE.source, reading.tiled], `${pin}: an edit outside the span leaves the source the baseline`).toEqual([true, true, true]);
      expect([PAGE_TITLE.startsWith("# "), page.startsWith(`${PAGE_TITLE}${OUTSIDE_DEFINITION}\n`), withInside(page) === planted("L2G-DUPDEF")], `${pin}: the outside definition alone, ${OUTSIDE_PLACE} (L2G-DUPDEF's page without the inside definition)`).toEqual([true, true, true]);
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

  it("judged set, outside anchors: CONTROLS is the labelled block after refusal #3's GATE PLANTS list, by its label and its control lines in order", () => {
    expect(ROWS[3]?.label, "the block's label, read from the notes").toBe(CONTROLS_LABEL);
    const expected = GATE_CONTROLS.flatMap(line => {
      const head = line.slice(0, line.indexOf(":"));
      const ids = head.match(/L2G-[A-Z0-9-]+/g);
      const phrase = CONTROL_PHRASES[head];
      return ids ?? (phrase === undefined ? [`unmapped: ${head}`] : [phrase]);
    });
    expect(expected, "refusal #3's control lines").toEqual(ROWS[3]?.pins);
  });

  it("judged set, outside anchors: refusal #1 names the pins no gate plant names (row CR's pin; CONTROLS's two phrase-mapped pins) and the residual's twins", () => {
    expect(ROWS[0]?.pins, "row CR's pin, as refusal #1's U1 (a) names it").toEqual([REFUSAL1_CR_PIN]);
    expect(Object.values(CONTROL_PHRASES), "CONTROL_PHRASES's ids, as refusal #1's U1 (a) names them, in order").toEqual(REFUSAL1_PHRASE_PINS);
    expect([...GATE_TWINS.keys()], "RESIDUAL REFERENCE-TWIN's cases, as refusal #1's U1 (b) names them, in order").toEqual(RESIDUAL);
  });

  it("judged set, outside anchors: rows a, b and c are refusal #4's UNMET members (a), (b) and (c)", () => {
    expect(ROWS.slice(4).map(row => row.label), "the members' headings").toEqual(["a", "b", "c"].map(letter => member(letter).label));
    expect([ROWS[4]?.pins, ROWS[5]?.pins], "the plant ids members (a) and (b) name, in order").toEqual([plantIds(member("a").text), plantIds(member("b").text)]);
    expect([ROWS[6]?.pins, ROWS[6]?.pins.reduce((sum, pin) => sum + Number(pin.split(":")[2]), 0)], "member (c)'s four raws and their sum").toEqual([rawPins(FOUR_RAWS?.[1] ?? "", ","), Number(FOUR_RAWS?.[2])]);
  });

  it("BASELINE: the real page's section is its own 1121 bytes, tiled, stating no parked term; the page holds none of refusal #1's twin heading lines", () => {
    const start = Buffer.byteLength(PAGE.slice(0, BASE.start), "utf8");
    expect([BASE.ok, BASE.why, BASE.crs, BASE.tiled, BASE.tokenText === BASE.source, termsStated(BASE.source, PARKED_TERMS)]).toEqual([true, "", 0, true, true, []]);
    expect(Buffer.from(PAGE, "utf8").equals(PAGE_BYTES), "the file's bytes are its UTF-8 text").toBe(true);
    expect(PAGE_BYTES.subarray(start, start + BASE.bytes).equals(Buffer.from(BASE.source, "utf8")), "the source is the file's own bytes over the span").toBe(true);
    expect([BASE.source, BASE.bytes], "the span is the heading line through the line before the next heading").toEqual([sectionSlice(PAGE), FROZEN_BYTES]);
    expect(sectionSource(outsideEdits(PAGE), HEADING).source, "edits outside the span leave the source the baseline").toBe(BASE.source);
    const twinHeadingLines = [...GATE_TWINS.values()];
    const read = marked.lexer(PAGE).flatMap(token => (isLevel2Heading(token) && twinHeadingLines.includes(token.raw.trim()) ? [token.raw.trim()] : []));
    expect(read, "marked's level-2 headings of the page: the heading's line once, none of refusal #1's twin lines").toEqual([`## ${HEADING}`]);
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
    it("BINDING-REFUSED: two top-level level-2 headings whose token text is the heading (DUP-HEADING), or none, the heading's space spelled '&nbsp;', which the token text carries undecoded (HEADING-ENTITY), refuse with an empty source and a reason", () => {
      const twice = sectionSource(`${PAGE}\n${HEADING_LINE}\n${PARKED_SENTENCE}\n`, HEADING);
      const none = sectionSource(PAGE.replace(HEADING_LINE, () => "## Authorization&nbsp;design\n"), HEADING);
      expect([twice.ok, twice.source, twice.why.includes("2 level-2 headings")], "DUP-HEADING").toEqual([false, "", true]);
      expect([none.ok, none.source, none.why.includes("0 level-2 headings")], "HEADING-ENTITY: no top-level level-2 heading's token text is the heading").toEqual([false, "", true]);
      REACHED.add("contract/BINDING-REFUSED");
    });
    it("BINDING-BOUND: a level-3 copy of the heading is not counted (LEVEL-3-COPY); a comment in the heading carries no token text (HEADING-COMMENT)", () => {
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

  describe("RESIDUAL REFERENCE-TWIN (pinned quiet rows)", () => {
    for (const id of RESIDUAL) {
      it(id, () => {
        const line = GATE_TWINS.get(id);
        if (line === undefined) throw new Error(`refusal #1 names no heading line for ${id}`);
        const page = `${PAGE}\n${line}\n`;
        const headings = marked.lexer(page).filter(token => isLevel2Heading(token) && [`## ${HEADING}`, line].includes(token.raw.trim()));
        expect(headings.length, `${id}: marked's top-level tokens hold the heading and the twin as level-2 headings`).toBe(2);
        const reading = sectionSource(page, HEADING);
        if (line === `## ${HEADING}`) {
          expect([reading.ok, reading.source, reading.why.includes("2 level-2 headings")], `${id}: the plain twin (the control) is refused, two headings`).toEqual([false, "", true]);
        } else {
          expect([reading.ok, reading.source === BASE.source, ...bytesAndSha16(reading.source)], `${id}: quiet - the binding binds the heading's section, the baseline refusal #1 measured`).toEqual([true, true, Number(TWIN_BASELINE[0]), TWIN_BASELINE[1]]);
          if (line.includes("&nbsp;")) {
            const shared = docsSection(page, HEADING, 2, [TITLE_TEXT]);
            expect([shared.ok, shared.why.startsWith(TWIN_DOCS_WHY)], `${id}: the shared view refuses the page, as refusal #1 quotes`).toEqual([false, true]);
          }
        }
        REACHED.add(`residual/${id}`);
      });
    }
  });

  it("records: every pin, every contract case and every residual case ran its own case to the end", () => {
    expect([...REACHED].sort()).toEqual([...ROWS.flatMap(row => row.pins.map(pin => `${row.id}/${pin}`)), ...CONTRACT.map(id => `contract/${id}`), ...RESIDUAL.map(id => `residual/${id}`)].sort());
  });
});
