/**
 * wb-t8my readers census (the rule-19 dependency-inversion child of wb-pnn8: ruling R-B159 filed it, ruling R-B202 folded wb-pnn8's
 * refusal #4 members into it). SUBJECT: the four receipt-anchor readers anchorTables, anchorProse, anchorRules and headerOf, moved
 * from wb-pnn8's FINAL cut #4 (tip ad5195cd) into test/helpers/furnace-cac-citation-status-readers.ts with their code byte for byte
 * (the helper's header names the items it adds and the doc-comment words it narrows). wb-pnn8's cut #4 versions of the census,
 * roster and receipt are not on trunk, and no census, roster or receipt file is added or edited here; the parent stays parked until
 * this lands, and its later re-cut can import the helper.
 *
 * PINNED READER SET (this file, test/workbench-furnace-cac-citation-status-readers-census.test.ts; observed at the cut: every case
 * passes on the moved readers, and each named mutant, applied to a copy of the helper, reds the pin case named after it). Each pin
 * case is named "<mutant id>: <quote>" and asserts, for every probe it holds, that the reader beside the probe returns exactly the
 * literal reading written here (toEqual over the reader's whole output); a probe is a synthetic receipt page (or, for headerOf, a
 * synthetic source text), and a probe named GW12-*, GW19-* or WS-W-* carries the form of the fail-open witness of that name.
 * - Row U1, cell-markup (anchorTables): G12-T-CELL-HTML-STRIPPED (probes CELL-ELEMENT and GW12-01: the cells '<b>B1</b>' and '<b>A</b>'
 *   read with their tags), G12-T-CELL-ESCAPES-RESOLVED (CELL-ESCAPE and GW12-02: '\*B1\*' and 'A1\, A2, A3, A4' read with their
 *   backslashes), G12-T-CELL-STRIKE-STRIPPED (CELL-STRUCK and GW12-03: '~~B1~~' and '~~A~~' read with their tildes) and
 *   G12-T-CELL-LINK-TEXT (CELL-LINK and GW12-04: '[B1](https://example.invalid/b)' and '[A](https://example.invalid/a)' read as
 *   written).
 * - Row U2, prose forms: G12-P-NESTED-INDENTED-CODE-OFF (ITEM-INDENTED-CODE by anchorProse and GW12-09 by anchorRules: an item's
 *   nested indented code block read with its item), G12-P-SHORTCUT-REFLINK-HIDDEN (SHORTCUT-REF by anchorProse and GW12-08 by
 *   anchorRules: a shortcut reference link's text shown) and G12-P-NESTED-LIST-OPACITY-ISOLATED (NESTED-LIST-ELEMENT by anchorProse:
 *   an item whose nested item holds an element is dropped whole and the next item is read; GW12-06 by anchorRules: a rule item whose
 *   nested item holds an empty element is no rule).
 * - Row U3, NFKC lead (anchorRules): G12-R-NFKC-LEAD (FULLWIDTH-COLON-LEAD: a lead whose colon is U+FF1A is no lead, and the exact
 *   lead in the next item is; GW12-07: that lead alone, no rule; FULLWIDTH-CLAUSE: a clause in fullwidth letters closing with U+FF0E
 *   is read as written).
 * - Row V1 (anchorProse and anchorRules): GP19-O-OPENING-TAG-IGNORED and GP19-O-OPENING-TAG-IGNORED-ANCHOR, one probe set (OPEN-TAG-BLOCKS:
 *   a one-line paragraph and a list item, each holding a lone opening tag, are dropped and the next blocks read; GW19-01, GW19-02 and
 *   GW19-05: a rule item holding an unclosed '<i>', '<span>' or '<span hidden>' is no rule).
 * - Row V2 (anchorRules): GP19-R-RULES-DEDUPED (GW19-03 and GW19-04: two equal rule blocks - a list repeating its rule item, and a
 *   rule item, a table and an equal rule paragraph - are both read).
 * - Row S, the wb-pnn8 cut #4 seat-measured holes: T-STRONG-STRIPPED (CELL-STRONG and WS-W-STRONG-CELL: '**B1**' and '**A**' read with
 *   their stars), T-UNDERSCORE-EM-STRIPPED (CELL-UNDERSCORE-EM and WS-W-UNDERSCORE-CELL: '_B1_' and '_A_' read with their underscores),
 *   P-COLLAPSED-REFLINK-HIDDEN (COLLAPSED-REF by anchorProse and WS-W-COLLAPSED-REF by anchorRules: a collapsed reference link's text
 *   shown) and H-INDENT-ONE-CHAR (HEADER-TWO-SPACES and HEADER-TWO-TABS by headerOf: a comment prefix indented by two spaces or by two
 *   tabs is removed).
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its probe ids, and the rows'
 *   pins in pin order, each held to a literal, so that a one-literal edit of any of them reds SHAPE.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped as the
 *   expectation; each field below is read at fixed delimiters and compared whole, by equality, never as a prefix, a suffix or a
 *   substring): (1) wb-t8my's description enumerates exactly rows U1-U3, in order, and each clause, read as '- <id> (<severity>)
 *   <label>: <count> mutant(s) <claim>' with the claim its first word and the quoted or parenthesized span after it (through the
 *   closing quote or parenthesis), gives exactly the row's id, severity, label and claim and the count word of its pin count; (2)
 *   the member lines of the R-B202 fold in wb-t8my's notes (between 'members folded into wb-t8my' and its 'rule19-invert idem' line)
 *   are exactly rows V1 and V2, in order, each line read as '<lead><rulings>-<label>-<mutant ids>-0-47-WITNESSES-GW19-<witness
 *   numbers>' (the lead '<U id>-<severity>-<grade>-', the rulings a run of ruling ids R<n> or R-B<n> joined by '-', the label the
 *   hyphenated upper-case words before '-GP19-') and giving exactly the row's lead, rulings and label, the mutant ids built from its
 *   pins and the numbers of its pins' GW19 probes, in probe order; (3) in wb-pnn8's notes, each UNMET line of refusal #3 (the
 *   verdict naming tip f53aa719) for rows U1-U3 names exactly that row's G12 ids and exactly its pins' GW12 probe ids, each in
 *   order, and cites each of the row's pins first as '<id> (<quote>)' (to the balancing parenthesis) or '<id>, <quote>:' (to the
 *   next colon) with exactly the pin's quote; refusal #4's verdict (naming tip ad5195cd, up to its WHAT STANDS) cites each V pin
 *   first, read the same way, with exactly its quote; and refusal #4's F5 finding, found by its head '- F5 INFO: (<row S's label>,
 *   CONFIRMED)', names exactly row S's ids, in order, with its witness clause naming row S's WS-W probes in order.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe the reader named beside it returns exactly the literal reading written here: a
 * reader edit that changes one reading reds that pin case. (2) Each named mutant changes a reading of its own pin's probes: the
 * cutting seat applies each mutant's own edit (the gate's and the cut #4 seat's edits, executed over a copy of the helper) and reads
 * the pin case named after it red; a pin whose probes stopped holding its form would read green there. (3) Each field ANCHOR reads
 * is held whole: the U rows' ids, severities, labels, claims and count words; the V rows' leads, rulings, labels, pins and GW19
 * probe ids; the U rows' pins and their GW12 probe ids; the U and V pins' quotes; row S's label, pins and WS-W probe ids. So such a
 * field removed, swapped, relabelled or shortened at either end - in one literal or in every literal together - reds ANCHOR, and a
 * pin or a row removed or swapped in one literal reds SHAPE as well (standing rule 16's CT1-CT6).
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them the other cell
 * markup (an image, an autolink, a character reference, an escaped pipe), an element in a block of more than one line or with an
 * upper-case tag name, a near lead or an NFKC-folding character other than the ones probed, and every reading the parent census's
 * header lists beyond these probes. The parent census's own in-case controls and header are NOT CLAIMED by this census. A probe's
 * text edited - alone or together with its literal reading - in a way that keeps this census passing is NOT CLAIMED by this census
 * (the mutant replay is what shows that each probe still holds its form). Row S's pin quotes are this file's descriptions of the
 * seat's mutants and no outside anchor holds them: an edit of one is NOT CLAIMED by this census. The row ids V1, V2 and S are this
 * file's own names and no field ANCHOR reads holds them: one relabelled in every literal together is NOT CLAIMED by this census
 * (SHAPE reds a one-literal relabel). The control probes (every probe whose id opens neither GW12-, GW19- nor WS-W-) are this file's
 * own names and no field ANCHOR reads holds them: one removed or relabelled in every literal together is NOT CLAIMED by this census
 * (SHAPE reds a one-literal edit). The text of a description clause after its claim, and the text of an UNMET line, of refusal #4's
 * verdict and of its F5 finding beyond the ids, quotes and witness clause read above, are NOT CLAIMED by this census. Each block is
 * found by a fixed locator (the description clauses' opening '- U<digit> (', the fold's opening and idem lines, the two verdict
 * openings with their full tips, each UNMET line's opening '<id> <severity> CONFIRMED', refusal #4's WHAT STANDS end, the F5 head
 * and the next bullet head): a locator edited so that it still finds the same block reads the same fields and is NOT CLAIMED by
 * this census. The citation judges' use of shownText
 * (their carrier view) is NOT CLAIMED by this census. No residual is claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated; the tracker export is only read; no src, docs or receipt is edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { anchorProse, anchorRules, anchorTables, headerOf } from "./helpers/furnace-cac-citation-status-readers.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT = ".beads/issues.jsonl";
/** The opening of wb-pnn8's refusal #3 verdict line and of its refusal #4 verdict line (bead notes, append-only). */
const REFUSAL_3 = "refusal #3 on cut #3 (tip f53aa719b97e00479f4b19327aa787a9be3d56a9";
const REFUSAL_4 = "refusal #4 on the FINAL cut #4 (tip ad5195cdd19c0069dccec6d02dc09f1716613490";
/** The count words wb-t8my's description writes for the U rows' pin counts (one, three and four), each read by one U row. */
const COUNT: Readonly<Record<number, string>> = { 1: "one", 3: "three", 4: "four" };

type ReaderId = "anchorTables" | "anchorProse" | "anchorRules" | "headerOf";
const READERS: Readonly<Record<ReaderId, (text: string) => unknown>> = { anchorTables, anchorProse, anchorRules, headerOf };

interface Probe {
  readonly id: string;
  readonly reader: ReaderId;
  readonly text: string;
  readonly reading: unknown;
}
interface Pin {
  readonly id: string;
  readonly quote: string;
  readonly probes: readonly Probe[];
}
/** A row wb-t8my's description enumerates: '- <id> (<severity>) <label>: <count> mutant(s) <claim> ...'. */
interface DescribedRow {
  readonly id: string;
  readonly severity: string;
  readonly label: string;
  readonly claim: string;
  readonly pins: readonly string[];
}
/** A row the R-B202 fold appended to wb-t8my's notes: the line '<lead><rulings>-<label>-<mutant ids>-0-47-WITNESSES-GW19-<witness numbers>'. */
interface FoldedRow {
  readonly id: string;
  readonly lead: string;
  readonly rulings: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The row of wb-pnn8's refusal #4 finding '- F5 INFO: (<label>, CONFIRMED)'. */
interface FindingRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** A synthetic receipt whose last entry holds the block (the readers read a receipt's last entry only). */
const entry = (block: string): string => `# wb-x: a receipt\n\n## 2026-10-28 second\n\n${block}\n`;
/** A pins table ('Pin | Quote sha-256') of one row whose pin cell is written as given. */
const pinsTable = (cell: string): string => entry(`| Pin | Quote sha-256 |\n| --- | --- |\n| ${cell} | 0 |`);
/** A rows table ('Row | Pins | Label sha-256') of one row whose row and pins cells are written as given. */
const rowsTable = (row: string, pins: string): string => entry(`| Row | Pins | Label sha-256 |\n| --- | --- | --- |\n| ${row} | ${pins} | 0 |`);
const FULLWIDTH_COLON = String.fromCodePoint(0xff1a);
const FULLWIDTH_STOP = String.fromCodePoint(0xff0e);
const FULLWIDTH_FULL = String.fromCodePoint(0xff46, 0xff55, 0xff4c, 0xff4c);

const OPEN_TAG: readonly Probe[] = [
  { id: "OPEN-TAG-BLOCKS", reader: "anchorProse", text: entry("an <i>open paragraph\n\na later paragraph\n\n- an <b>open item\n- a later item"), reading: ["a later paragraph", "a later item"] },
  { id: "GW19-01", reader: "anchorRules", text: entry("- Witness rule: <i>one"), reading: [] },
  { id: "GW19-02", reader: "anchorRules", text: entry("- Witness rule: one<span> (two)"), reading: [] },
  { id: "GW19-05", reader: "anchorRules", text: entry("- Witness rule: <span hidden>one"), reading: [] },
];

const PINS: readonly Pin[] = [
  {
    id: "G12-T-CELL-HTML-STRIPPED",
    quote: "HTML tags removed from cell.text",
    probes: [
      { id: "CELL-ELEMENT", reader: "anchorTables", text: pinsTable("<b>B1</b>"), reading: [[["Pin", "Quote sha-256"], ["<b>B1</b>", "0"]]] },
      { id: "GW12-01", reader: "anchorTables", text: rowsTable("<b>A</b>", "A1, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["<b>A</b>", "A1, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "G12-T-CELL-ESCAPES-RESOLVED",
    quote: "backslash escapes of ASCII punctuation resolved",
    probes: [
      { id: "CELL-ESCAPE", reader: "anchorTables", text: pinsTable("\\*B1\\*"), reading: [[["Pin", "Quote sha-256"], ["\\*B1\\*", "0"]]] },
      { id: "GW12-02", reader: "anchorTables", text: rowsTable("A", "A1\\, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["A", "A1\\, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "G12-T-CELL-STRIKE-STRIPPED",
    quote: "'~~' removed",
    probes: [
      { id: "CELL-STRUCK", reader: "anchorTables", text: pinsTable("~~B1~~"), reading: [[["Pin", "Quote sha-256"], ["~~B1~~", "0"]]] },
      { id: "GW12-03", reader: "anchorTables", text: rowsTable("~~A~~", "A1, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["~~A~~", "A1, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "G12-T-CELL-LINK-TEXT",
    quote: "an inline link read as its text",
    probes: [
      { id: "CELL-LINK", reader: "anchorTables", text: pinsTable("[B1](https://example.invalid/b)"), reading: [[["Pin", "Quote sha-256"], ["[B1](https://example.invalid/b)", "0"]]] },
      { id: "GW12-04", reader: "anchorTables", text: rowsTable("[A](https://example.invalid/a)", "A1, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["[A](https://example.invalid/a)", "A1, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "G12-P-NESTED-INDENTED-CODE-OFF",
    quote: "an item's nested indented code block dropped",
    probes: [
      { id: "ITEM-INDENTED-CODE", reader: "anchorProse", text: entry("- an item\n\n      its indented code"), reading: ["an item its indented code"] },
      { id: "GW12-09", reader: "anchorRules", text: entry("- Witness rule: one.\n\n      except two"), reading: ["one. except two"] },
    ],
  },
  {
    id: "G12-P-SHORTCUT-REFLINK-HIDDEN",
    quote: "a shortcut reference link's text hidden; CommonMark's third reference-link kind",
    probes: [
      { id: "SHORTCUT-REF", reader: "anchorProse", text: entry("a [shortcut] link\n\n[shortcut]: https://example.invalid/s"), reading: ["a shortcut link"] },
      { id: "GW12-08", reader: "anchorRules", text: entry("- Witness rule: one[ except two].\n\n[ except two]: https://example.invalid/x"), reading: ["one except two"] },
    ],
  },
  {
    id: "G12-P-NESTED-LIST-OPACITY-ISOLATED",
    quote: "shownText's list branch passes a fresh view, so an element in an item's nested list leaves the item unopaque; the shared carrier view does not pin it either",
    probes: [
      { id: "NESTED-LIST-ELEMENT", reader: "anchorProse", text: entry("- an item\n  - a <i>nested</i> item\n- a later item"), reading: ["a later item"] },
      { id: "GW12-06", reader: "anchorRules", text: entry("- Witness rule: one\n  - <b></b>"), reading: [] },
    ],
  },
  {
    id: "G12-R-NFKC-LEAD",
    quote: "prose blocks NFKC-normalized before the lead check",
    probes: [
      { id: "FULLWIDTH-COLON-LEAD", reader: "anchorRules", text: entry(`- Witness rule${FULLWIDTH_COLON} one\n- Witness rule: two`), reading: ["two"] },
      { id: "GW12-07", reader: "anchorRules", text: entry(`- Witness rule${FULLWIDTH_COLON} one`), reading: [] },
      { id: "FULLWIDTH-CLAUSE", reader: "anchorRules", text: entry(`- Witness rule: a ${FULLWIDTH_FULL} clause${FULLWIDTH_STOP}`), reading: [`a ${FULLWIDTH_FULL} clause${FULLWIDTH_STOP}`] },
    ],
  },
  { id: "GP19-O-OPENING-TAG-IGNORED", quote: "shownText's opacity test reads closing tags only", probes: OPEN_TAG },
  { id: "GP19-O-OPENING-TAG-IGNORED-ANCHOR", quote: "applied by anchorProse only", probes: OPEN_TAG },
  {
    id: "GP19-R-RULES-DEDUPED",
    quote: "anchorRules' result wrapped in [...new Set(...)]",
    probes: [
      { id: "GW19-03", reader: "anchorRules", text: entry("- Witness rule: one\n- Witness rule: one"), reading: ["one", "one"] },
      { id: "GW19-04", reader: "anchorRules", text: entry("- Witness rule: one.\n\n| Pin | Quote sha-256 |\n| --- | --- |\n| A1 | 0 |\n\nWitness rule: one."), reading: ["one", "one"] },
    ],
  },
  {
    id: "T-STRONG-STRIPPED",
    quote: "a cell's double-star strong text read as its text",
    probes: [
      { id: "CELL-STRONG", reader: "anchorTables", text: pinsTable("**B1**"), reading: [[["Pin", "Quote sha-256"], ["**B1**", "0"]]] },
      { id: "WS-W-STRONG-CELL", reader: "anchorTables", text: rowsTable("**A**", "A1, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["**A**", "A1, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "T-UNDERSCORE-EM-STRIPPED",
    quote: "a cell's underscore emphasis read as its text",
    probes: [
      { id: "CELL-UNDERSCORE-EM", reader: "anchorTables", text: pinsTable("_B1_"), reading: [[["Pin", "Quote sha-256"], ["_B1_", "0"]]] },
      { id: "WS-W-UNDERSCORE-CELL", reader: "anchorTables", text: rowsTable("_A_", "A1, A2, A3, A4"), reading: [[["Row", "Pins", "Label sha-256"], ["_A_", "A1, A2, A3, A4", "0"]]] },
    ],
  },
  {
    id: "P-COLLAPSED-REFLINK-HIDDEN",
    quote: "a collapsed reference link's text hidden",
    probes: [
      { id: "COLLAPSED-REF", reader: "anchorProse", text: entry("a [collapsed][] link\n\n[collapsed]: https://example.invalid/c"), reading: ["a collapsed link"] },
      { id: "WS-W-COLLAPSED-REF", reader: "anchorRules", text: entry("- Witness rule: one[ except two][].\n\n[ except two]: https://example.invalid/x"), reading: ["one except two"] },
    ],
  },
  {
    id: "H-INDENT-ONE-CHAR",
    quote: "headerOf's prefix regex [ \\t]* -> [ \\t]?",
    probes: [
      { id: "HEADER-TWO-SPACES", reader: "headerOf", text: "/**\n  * a two-space indent\n */\n", reading: "a two-space indent" },
      { id: "HEADER-TWO-TABS", reader: "headerOf", text: "/**\n\t\t* a two-tab indent\n */\n", reading: "a two-tab indent" },
    ],
  },
];

const DESCRIBED: readonly DescribedRow[] = [
  { id: "U1", severity: "MEDIUM", label: "cell-markup", claim: "against 'cell texts as written, their markup kept'", pins: ["G12-T-CELL-HTML-STRIPPED", "G12-T-CELL-ESCAPES-RESOLVED", "G12-T-CELL-STRIKE-STRIPPED", "G12-T-CELL-LINK-TEXT"] },
  { id: "U2", severity: "LOW", label: "prose forms", claim: "survive (a nested indented code block, a shortcut reference link, nested-list opacity)", pins: ["G12-P-NESTED-INDENTED-CODE-OFF", "G12-P-SHORTCUT-REFLINK-HIDDEN", "G12-P-NESTED-LIST-OPACITY-ISOLATED"] },
  { id: "U3", severity: "LOW", label: "NFKC lead", claim: "against 'opens with ANCHOR.rule exactly'", pins: ["G12-R-NFKC-LEAD"] },
];
const FOLDED: readonly FoldedRow[] = [
  { id: "V1", lead: "U1-MEDIUM-CONFIRMED-", rulings: "R514-R515-R668-R-B159", label: "PROSE-OPACITY-OPENING-TAG-READING-NO-FALSIFIER", pins: ["GP19-O-OPENING-TAG-IGNORED", "GP19-O-OPENING-TAG-IGNORED-ANCHOR"] },
  { id: "V2", lead: "U2-LOW-CONFIRMED-", rulings: "R515", label: "WITNESS-RULE-EQUAL-SECOND-RULE-BLOCK-NO-FALSIFIER", pins: ["GP19-R-RULES-DEDUPED"] },
];
const FINDING: FindingRow = { id: "S", label: "THE HOLES, seat-measured part", pins: ["T-STRONG-STRIPPED", "T-UNDERSCORE-EM-STRIPPED", "P-COLLAPSED-REFLINK-HIDDEN", "H-INDENT-ONE-CHAR"] };
const ROWS: readonly { readonly id: string; readonly pins: readonly string[] }[] = [...DESCRIBED, ...FOLDED, FINDING];

function pinOf(id: string): Pin {
  const pin = PINS.find(candidate => candidate.id === id);
  if (pin === undefined) throw new Error(`${id}: no such pin`);
  return pin;
}
/** A bead's description and notes, read from its row in the tracked tracker export. */
function exportRow(bead: string): { readonly description: string; readonly notes: string } {
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (line.trim() === "") continue;
    const value: unknown = JSON.parse(line);
    if (typeof value !== "object" || value === null || !("id" in value) || value.id !== bead) continue;
    const description = "description" in value && typeof value.description === "string" ? value.description : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    return { description, notes };
  }
  throw new Error(`${bead}: no row in ${EXPORT}`);
}
/** The first line of text after offset from that opens with lead (empty when none does). */
function lineAfter(text: string, from: number, lead: string): string {
  const start = text.indexOf(`\n${lead}`, from);
  if (from < 0 || start < 0) return "";
  const end = text.indexOf("\n", start + 1);
  return text.slice(start + 1, end < 0 ? text.length : end);
}
/** The text from the first occurrence of open after offset from up to the next occurrence of close (empty when either is absent). */
function between(text: string, from: number, open: string, close: string): string {
  const start = from < 0 ? -1 : text.indexOf(open, from);
  const end = start < 0 ? -1 : text.indexOf(close, start + open.length);
  return end < 0 ? "" : text.slice(start, end);
}
const unique = (values: readonly string[]): string[] => values.filter((value, at) => values.indexOf(value) === at);
/** The ids of the probes of these pins, in pin and probe order, each once, that match pattern. */
function probeIds(pins: readonly string[], pattern: RegExp): string[] {
  return unique(pins.flatMap(id => pinOf(id).probes.map(probe => probe.id)).filter(id => pattern.test(id)));
}
/** A description clause at its fixed delimiters: '- <id> (<severity>) <label>: <count> <noun> <claim>', then a space or the line's end, the claim being one word and the quoted or parenthesized span after it, through its closing quote or parenthesis. */
const CLAUSE = /^- (U\d) \(([A-Z]+)\) ([^:]+): ([a-z]+) (mutants?) ([a-z]+ (?:'[^']*'|\([^()]*\)))(?: |$)/;
/** The fields of a description clause (the whole line when it does not read as CLAUSE). */
function clauseFields(line: string): readonly string[] {
  const match = CLAUSE.exec(line);
  return match === null ? [line] : match.slice(1);
}
/** An R-B202 fold line at its fixed delimiters: the lead '<U id>-<severity>-<grade>-', the rulings (ruling ids R<n> or R-B<n> joined by '-'), the label (hyphenated upper-case words before '-GP19-'), the mutant ids, then '-0-47-WITNESSES-GW19-' and the witness numbers. */
const FOLD = /^(U\d-[A-Z]+-[A-Z]+-)(R(?:-B)?\d+(?:-R(?:-B)?\d+)*)-([A-Z]+(?:-[A-Z]+)*?)-(GP19-[A-Z0-9]+(?:-[A-Z0-9]+)*?)-0-47-WITNESSES-GW19-(\d\d(?:-\d\d)*)$/;
/** The fields of a fold line (the whole line when it does not read as FOLD). */
function foldFields(line: string): readonly string[] {
  const match = FOLD.exec(line);
  return match === null ? [line] : match.slice(1);
}
/** The fields a folded row's line must give: its lead, rulings and label, its mutant ids (the first pin, then 'AND-' and each later pin's suffix) and its pins' GW19 probe numbers. */
function foldedFields(row: FoldedRow): readonly string[] {
  const first = row.pins[0] ?? "";
  const mutants = [first, ...row.pins.slice(1).map(id => `AND-${id.slice(first.length + 1)}`)].join("-");
  const witnesses = probeIds(row.pins, /^GW19-\d\d$/).map(id => id.slice("GW19-".length));
  return [row.lead, row.rulings, row.label, mutants, witnesses.join("-")];
}
/** The quote text gives at its first citation of id: '<id> (<quote>)' up to the balancing parenthesis, or '<id>, <quote>:' up to the next colon; an occurrence inside a longer id, or followed by neither form, is passed over (empty when none cites id). */
function citation(text: string, id: string): string {
  for (let at = text.indexOf(id); at >= 0; at = text.indexOf(id, at + 1)) {
    if (/[A-Za-z0-9-]/.test(text.charAt(at - 1))) continue;
    const after = text.slice(at + id.length);
    if (after.startsWith(", ")) {
      const end = after.indexOf(":");
      if (end >= 0) return after.slice(2, end);
    }
    if (after.startsWith(" (")) {
      let depth = 0;
      for (let index = 1; index < after.length; index += 1) {
        if (after[index] === "(") depth += 1;
        if (after[index] === ")") depth -= 1;
        if (depth === 0) return after.slice(2, index);
      }
    }
  }
  return "";
}

describe("wb-t8my readers census (test/helpers/furnace-cac-citation-status-readers.ts): fifteen pin cases, each holding literal probe readings its named wb-pnn8 reader mutant changes, with SHAPE and ANCHOR", () => {
  it("SHAPE: the rows, their pins and each pin's probe ids are each held to a literal (a one-literal edit reds here)", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["U1:4", "U2:3", "U3:1", "V1:2", "V2:1", "S:4"]);
    expect(PINS.map(pin => `${pin.id}:${pin.probes.map(probe => probe.id).join(",")}`)).toEqual([
      "G12-T-CELL-HTML-STRIPPED:CELL-ELEMENT,GW12-01",
      "G12-T-CELL-ESCAPES-RESOLVED:CELL-ESCAPE,GW12-02",
      "G12-T-CELL-STRIKE-STRIPPED:CELL-STRUCK,GW12-03",
      "G12-T-CELL-LINK-TEXT:CELL-LINK,GW12-04",
      "G12-P-NESTED-INDENTED-CODE-OFF:ITEM-INDENTED-CODE,GW12-09",
      "G12-P-SHORTCUT-REFLINK-HIDDEN:SHORTCUT-REF,GW12-08",
      "G12-P-NESTED-LIST-OPACITY-ISOLATED:NESTED-LIST-ELEMENT,GW12-06",
      "G12-R-NFKC-LEAD:FULLWIDTH-COLON-LEAD,GW12-07,FULLWIDTH-CLAUSE",
      "GP19-O-OPENING-TAG-IGNORED:OPEN-TAG-BLOCKS,GW19-01,GW19-02,GW19-05",
      "GP19-O-OPENING-TAG-IGNORED-ANCHOR:OPEN-TAG-BLOCKS,GW19-01,GW19-02,GW19-05",
      "GP19-R-RULES-DEDUPED:GW19-03,GW19-04",
      "T-STRONG-STRIPPED:CELL-STRONG,WS-W-STRONG-CELL",
      "T-UNDERSCORE-EM-STRIPPED:CELL-UNDERSCORE-EM,WS-W-UNDERSCORE-CELL",
      "P-COLLAPSED-REFLINK-HIDDEN:COLLAPSED-REF,WS-W-COLLAPSED-REF",
      "H-INDENT-ONE-CHAR:HEADER-TWO-SPACES,HEADER-TWO-TABS",
    ]);
    expect(ROWS.flatMap(row => row.pins), "the rows hold every pin once, in pin order").toEqual(PINS.map(pin => pin.id));
  });

  it("ANCHOR: each field read at its delimiters from wb-t8my's and wb-pnn8's tracker-export rows equals its literal whole - the U clauses' ids, severities, labels, claims and count words; the V fold lines' leads, rulings, labels, pins and GW19 witnesses; the U pins and their GW12 witnesses; the U and V pins' quotes; row S's label, pins and WS-W witnesses", () => {
    const child = exportRow("wb-t8my");
    const parent = exportRow("wb-pnn8");
    const clauses = child.description.split("\n").filter(line => /^- U\d \(/.test(line));
    expect(
      clauses.map(clauseFields),
      "wb-t8my's description enumerates exactly rows U1-U3, in order, each clause giving the row's id, severity, label, count word, noun and claim whole",
    ).toEqual(DESCRIBED.map(row => [row.id, row.severity, row.label, COUNT[row.pins.length], row.pins.length === 1 ? "mutant" : "mutants", row.claim]));
    for (const row of FOLDED) {
      const first = row.pins[0] ?? "";
      expect(
        row.pins.slice(1).every(id => id.startsWith(`${first}-`)),
        `${row.id}: every later pin extends its first pin's id`,
      ).toBe(true);
    }
    const members = between(child.notes, 0, "members folded into wb-t8my\n", "\nrule19-invert idem").split("\n").slice(1);
    expect(
      members.map(foldFields),
      "the R-B202 fold's member lines in wb-t8my's notes are exactly rows V1 and V2, in order, each giving the row's lead, rulings, label, mutant ids and GW19 witness numbers whole",
    ).toEqual(FOLDED.map(foldedFields));
    const r3 = parent.notes.indexOf(REFUSAL_3);
    const r4 = parent.notes.indexOf(REFUSAL_4);
    expect([r3 >= 0, r4 > r3], "wb-pnn8's notes hold refusal #3's verdict and, after it, refusal #4's").toEqual([true, true]);
    for (const row of DESCRIBED) {
      const unmet = lineAfter(parent.notes, r3, `${row.id} ${row.severity} CONFIRMED`);
      expect(unique(unmet.match(/\bG12-[A-Z0-9]+(?:-[A-Z0-9]+)*\b/g) ?? []), `refusal #3's ${row.id} UNMET line names exactly the row's ids, in order`).toEqual([...row.pins]);
      expect(unique(unmet.match(/\bGW12-\d\d\b/g) ?? []), `refusal #3's ${row.id} UNMET line names exactly the row's GW12 witnesses, in order`).toEqual(probeIds(row.pins, /^GW12-\d\d$/));
      for (const id of row.pins) expect(citation(unmet, id), `refusal #3's ${row.id} UNMET line cites ${id} first with exactly its quote`).toBe(pinOf(id).quote);
    }
    const verdict4 = between(parent.notes, r4, REFUSAL_4, "\nWHAT STANDS");
    for (const id of FOLDED.flatMap(row => row.pins)) {
      expect(citation(verdict4, id), `refusal #4's verdict cites ${id} first with exactly its quote`).toBe(pinOf(id).quote);
    }
    const f5 = between(parent.notes, r4, `\n- F5 INFO: (${FINDING.label}, CONFIRMED)`, "\n- F6 ");
    expect(unique(f5.match(/(?<![A-Za-z0-9-])[A-Z]-[A-Z]+(?:-[A-Z]+)+(?![A-Za-z0-9-])/g) ?? []), "refusal #4's F5 finding names exactly row S's ids, in order").toEqual([...FINDING.pins]);
    const witnessList = /Their witnesses (\S+(?: \/ \S+)*) red/.exec(f5)?.[1] ?? "";
    expect(
      witnessList.split(" / "),
      "refusal #4's F5 witness clause 'Their witnesses <first> / -<suffix> ... red' names exactly row S's WS-W probes, in order",
    ).toEqual(probeIds(FINDING.pins, /^WS-W-/).map((id, at) => (at === 0 ? id : `-${id.slice("WS-W-".length)}`)));
  });

  for (const pin of PINS) {
    it(`${pin.id}: ${pin.quote}`, () => {
      for (const probe of pin.probes) {
        expect(READERS[probe.reader](probe.text), `${pin.id} / ${probe.id}: ${probe.reader} reads the probe exactly as written here`).toEqual(probe.reading);
      }
    });
  }
});
