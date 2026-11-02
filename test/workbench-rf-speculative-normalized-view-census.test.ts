/**
 * wb-w4si normalized-view readers census (the rule-19 structural-exit child of wb-eu94: ruling R-B175 filed it carrying refusal #3's
 * four surviving reader-mutant families, and ruling R-B223, the dependency inversion at refusal #4, folded refusal #4's two unmet
 * members into it). SUBJECT: the normalized view of the wb-grmo.1 speculative-context docs census as wb-eu94's FINAL cut #4 wrote it
 * (tip 785870aa), moved byte for byte into test/helpers/rf-speculative-normalized-view.ts. The parent's census and roster are not on
 * trunk and are neither added nor edited here; the parent stays parked until this lands, and its later re-cut can import the helper.
 *
 * PINNED READER SET (this file, test/workbench-rf-speculative-normalized-view-census.test.ts; observed at the cut: every case passes on
 * the moved reader, and each named mutant, its edits applied to a copy of the helper, reds the pin case named after it). Each pin case
 * is named "<mutant id>: <quote>" and asserts, for every probe it holds, that normalized() returns exactly the probe's literal view and
 * docsVerdict() exactly its literal { c1, c2 } (one toEqual over both), and that this verdict is the probe's recorded page verdict. A
 * probe is a synthetic docs page; a probe the gates named keeps the gates' text, and a probe marked seat is this cut's addition.
 * - Row D1 (wb-w4si family 1, INLINE_MARKS beside modifier letters and letter numbers): G23-IM1 and G23-IM8 (the Nl probes
 *   D1-NL-STAR, D1-NL-TILDE, D1-NL-STAR-SHY and D1-NL-TILDE-SHY read hypothetical joined), G23-IM2 (the Lm probes D1-LM-STAR,
 *   D1-LM-TILDE, D1-LM-JOINT, D1-LM-STAR-SHY and D1-LM-TILDE-SHY, read speculative or what-if joined, and the Lo probe D1-LO-STAR-SHY)
 *   and G23-IM7 (the five Lm probes). A -SHY probe writes a soft-hyphen reference on each side of its marked letter, so each mark run
 *   borders that letter alone when INLINE_MARKS reads it (the reference is decoded after that step).
 * - Row D2 (family 2, a "</" before a letter outside ASCII): G23-BC9 (D2-LATIN-X, D2-LATIN, D2-GREEK and D2-FULLWIDTH: a "</" before
 *   U+00E9, U+03B1 or U+FF42 in a div block is read as a bogus comment through its ">", so speculative reads joined).
 * - Row D3 (family 3, a "<" before a letter outside ASCII): G23-ME4 (D3-LATIN-X, D3-GREEK, D3-JOINT, D3-FULLWIDTH and
 *   D3-FULLWIDTH-CAPITAL: a "<" before U+00E9, U+03B1, U+FF42 or U+FF22 in a div block opens no tag, so the term stays split) and
 *   G23-ME5 (the two fullwidth probes).
 * - Row D4 (family 4, a backslash escaping a line-start marker: before "#", ">", "|", "+", "*" or "-" at a line start, or between a
 *   line start's digit and "." or ")"): G23-NO2 (D4-HASH, D4-QUOTE, D4-PIPE, D4-PLUS, D4-STAR, D4-DOT, D4-PAREN, D4-HYPHEN and
 *   D4-QUOTE-DIV: the backslash is dropped, so SENTENCE_BREAK opens a unit at the marker and C1 reads quiet while C2 reads the term),
 *   G23-NO3 (D4-HASH), G23-NO5 (D4-QUOTE, D4-PIPE and D4-QUOTE-DIV), G23-NO6 (D4-PLUS and D4-STAR), G23-NO7 (D4-DOT and D4-PAREN),
 *   G23-ES02x (D4-QUOTE and D4-QUOTE-DIV) and G23-ES04x (D4-PIPE). D4-HYPHEN kills none of these seven (NO2 keeps the hyphen); it
 *   holds the eighth marker's reading in NO2's pin.
 * - Row U1 (refusal #4's U1, seven INLINE_MARKS cells): IM05, IM33, IM35, IM37, IM45, IM46 and IM47, each over the probes PINS names.
 * - Row U2 (refusal #4's U2, carriage returns): BC19 (U2-PI, U2-PI-TEXT, U2-DECLARATION, U2-END-TAG-DIGIT, U2-CDATA and U2-PI-CRLF: a
 *   bogus comment read through its first ">" across a carriage return) and HC08 (U2-COMMENT and U2-COMMENT-EMPTY: a comment holding a
 *   ">" after a carriage return read through its "-->").
 * - The residual cases R-BLOCK-MARKS, R-TILDES-AROUND-EMPHASIS and R-CR-QUOTE-BREAK (RESIDUALS below), each over its one probe.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its probe ids, the rows' pins in
 *   pin order, the pins that carry a witness literal, and the residual rows with their probes, each held to a literal; and every
 *   residual's row is one of the rows.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped as the
 *   expectation): (1) wb-w4si's description numbers exactly rows D1-D4: its numbered lines are, in order, "<n>. <label>" for row D<n>;
 *   (2) the member lines of the R-B223 fold in wb-w4si's notes are exactly rows U1 and U2, in order, each the line
 *   "<id>-MEDIUM-...-R668-<label>-<its pin ids joined by '-'><tail>"; (3) in wb-eu94's notes, refusal #3's record (from its verdict
 *   line naming tip f0fb7686 to its BIND STEPS line) states in each D row's family ground line exactly that row's mutant ids, in order,
 *   and every D pin's "<name> <quote>", and refusal #4's record (tip 785870aa) every U pin's; (4) the witnesses the two records quote
 *   (a span in single quotes, on one line and holding no single quote, that opens "Pi serves" or "<div>Pi serves" and closes "." or
 *   ".</div>", written in the record's notation - {U+XXXX}, {LF}, {backslash} and \r - and read decoded): for each U pin, the line of
 *   refusal #4's bullet that names it quotes one after its "<name> <quote>" (or says "Same witness." there, which repeats the first one
 *   the line above quotes), and that witness is exactly the pin's witness literal and, decoded, its first probe; for each D row,
 *   refusal #3's paragraph that names the row's pins (from the last line opening "  (" before its first "<name> <quote>" to the first
 *   line opening "  (" or "  Plants" after its last) quotes at least one witness, each is the witness literal and, decoded, the first
 *   probe of a pin of the row, and a pin of the row carries a witness literal exactly when one of its probes is, decoded, a witness
 *   that paragraph quotes - the literal then being one of them and, decoded, its first probe.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe the view returns exactly the literal reading written here: a reader edit that changes
 * one reading reds that pin case or residual case. (2) Each pin probe's literal verdict is the page's verdict (ORACLE below): an
 * independent page oracle that reads one pin probe otherwise falsifies it. (3) Each named mutant changes a reading of its own pin's
 * probes: the cutting seat applied each mutant's edits, verbatim from the gates' archived definitions, to a copy of the helper and read
 * the pin case named after it red; a pin whose probes stopped holding its form would read green there. (4) The rows, their ids and
 * labels, their pins, and the pins' ids, names and quotes are the ones the tracker export records: a row or a pin removed, or one of
 * these changed - in one literal or in every literal together - reds SHAPE or ANCHOR. The pins' witnesses are the ones ANCHOR (4)
 * reads: a witness literal deleted or added alone reds SHAPE and ANCHOR (4), and with its SHAPE entry changed to match it still reds
 * ANCHOR (4); a witness literal's text changed alone reds ANCHOR (4); a witness a record quotes, removed from every literal that holds
 * it (the witness literals, the pins' probe lists, their SHAPE entries and PROBES), reds ANCHOR (4); and a U pin's witness literal or
 * first probe changed, alone or in every literal together, reds ANCHOR (4). A pin's probe list changed reds SHAPE; changed in every
 * literal together it reds ANCHOR (4) where it moves a D pin's witness from first place, drops a D pin's witness probe while the pin
 * keeps its witness literal, or gives a D pin with no witness literal a probe that is a witness its paragraph quotes (standing rule
 * 16's CT1-CT6).
 *
 * RESIDUALS (named, each with a pinned row; seat-found among the gates' witness lists; each case holds the view's literal joined
 * reading of its probe and that this verdict is not the probe's page verdict, so a change of the view there reds it):
 * R-BLOCK-MARKS (row D1) - inside an HTML block marked shows a mark run as written (the page reads hypotheti*c*al in a p block),
 * while INLINE_MARKS removes it: the view joins what the page splits. R-TILDES-AROUND-EMPHASIS (row U1) - marked renders the emphasis
 * and shows the two "~" around it (the page reads spec~ul~ative), while INLINE_MARKS removes them. R-CR-QUOTE-BREAK (row U2) - outside
 * an HTML block the line a carriage return ends is followed by a line that opens a blockquote at its ">", so the page shows
 * "<!-- a" in the paragraph and the rest in the blockquote, while HTML_COMMENT reads the comment through its "-->".
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them a mark run beside any
 * letter or digit outside ASCII that no probe holds (titlecase letters, and decimal digits and other numbers outside ASCII, among
 * them), a "</" or a "<" before any other code point outside ASCII, a backslash escaping any other character or a marker anywhere but
 * at a line start, a mark run of four or more or of all three kinds, the backtick half of IM47's cell (a backtick pair the page renders
 * is a code span, which CODE_SPAN reads first, and a lone backtick the page shows as written), and every other step of the view. The
 * page verdicts are measured, not re-read: no page renderer runs here. A probe's text edited together with its literal readings is NOT
 * CLAIMED by this census, except the probes ANCHOR (4) holds to a witness (the first probe of each pin that carries a witness
 * literal). Any other change of a pin's probe list made in every literal together is NOT CLAIMED by this census: the mutant replay is
 * what shows each pin's probes still red its mutant. Refusal #3 quotes each family's witnesses for the whole family, not per member,
 * so which of a D row's pins carry which of its paragraph's witnesses is this census's choice: an every-literal change that only
 * moves those witnesses among the row's pins - a D pin's witness literal and first probe changed together to another witness its
 * paragraph quotes, a witness taken from a D pin (its literal, its probe and both its SHAPE entries together) while another pin of
 * the row keeps it as its literal and first probe, or a witness its paragraph quotes given to a D pin that carries none (literal,
 * first probe and both SHAPE entries together) - is NOT CLAIMED by this census. The residual rows and the probes marked seat are this
 * file's own and no outside anchor holds them:
 * removing one together with its shape entry, or moving a residual to another of the rows together with its shape entry, is NOT
 * CLAIMED by this census. Mutant BC29 (gate-prep-6's alternate spelling of BC19) is no pin; BC19's probes red it too. The parent
 * census's own claims, rows and residuals are NOT CLAIMED by this census.
 *
 * ORACLE: marked 18.0.11 (this repository's) renders a probe, parse5 7.1.2 (installed outside the repository) parses the HTML, and the
 * text a reader sees - the text outside the elements a browser hides, a blank line at each block element's edges and in place of an img
 * or an input, a line feed at br, invisible code points dropped, NFKC - is split by the helper's SENTENCE_BREAK and judged by its
 * SPECULATIVE_TERM and SERVED_TERM (gate-prep-6's oracle rules; the D4 page verdicts rest on that unit model).
 *
 * Display paths added: none (test-only). No scratch is allocated; the tracker export is only read; no src, docs or receipt is edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { docsVerdict, normalized } from "./helpers/rf-speculative-normalized-view.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT = ".beads/issues.jsonl";
/** The openings of wb-eu94's refusal #3 and refusal #4 verdict lines (bead notes, append-only); each record runs to its BIND STEPS line. */
const REFUSAL_3 = "refusal #3 on cut #3 (tip f0fb76866b46ae1b90f97cc739c5f182ea4c8888";
const REFUSAL_4 = "refusal #4 on the FINAL fail-closed-core cut #4 that R-B175 (M:40572) bound (tip 785870aaf640d64ae3885c5af5001d56c5d9cb22";
const RECORD_END = "\nBIND STEPS AFTER THIS NOTE";
/** The R-B223 fold opens its member lines after FOLD_OPEN and closes them before FOLD_CLOSE; each line opens "<row id>" FOLD_LEAD. */
const FOLD_OPEN = "members folded into wb-w4si\n";
const FOLD_CLOSE = "\nrule19-invert idem";
const FOLD_LEAD = "-MEDIUM-RESPIN-R-B175-FAIL-CLOSED-CORE-NO-READER-BEHAVIOUR-CLAIM-BEYOND-PINS-UNMET-RULE16-LEG2-R514-R515-R668-";
/** What follows "<name> <quote>" where a refusal record names a pin. */
const CITE_ENDS = [",", " and ", "."];
/** A witness as a refusal record quotes one: a probe sentence in single quotes, in the record's notation (decoded() reads it). */
const QUOTED_WITNESS = /'((?:<div>)?Pi serves [^'\n]*\.(?:<\/div>)?)'/g;
/** Refusal #3's family paragraphs each open on a line that opens PARAGRAPH_OPEN; the line after the last one opens PARAGRAPH_AFTER. */
const PARAGRAPH_OPEN = "\n  (";
const PARAGRAPH_AFTER = "\n  Plants";
/** What a refusal #4 member bullet says after its cite where it repeats the witness the bullet line above it quotes. */
const SAME_WITNESS = "Same witness.";

/** A docs verdict: c1, a served speculative sentence (C1); c2, any speculative sentence (C2). */
interface Verdict {
  readonly c1: boolean;
  readonly c2: boolean;
}
interface Probe {
  readonly id: string;
  readonly text: string;
  /** normalized(text), exactly. */
  readonly view: string;
  /** docsVerdict(text), exactly. */
  readonly verdict: Verdict;
  /** The page's verdict, measured by the oracle the header names. */
  readonly page: Verdict;
  /** This cut's addition (no gate named it). */
  readonly seat?: true;
}
interface Pin {
  readonly id: string;
  /** The pin's refusal record names it "<name> <quote>", then one of CITE_ENDS. */
  readonly name: string;
  readonly quote: string;
  /** The pin's first probe as its refusal record quotes it, in the record's notation (where the record quotes one). */
  readonly witness?: string;
  readonly probes: readonly string[];
}
/** A row wb-w4si's description numbers: "<n>. <label>"; its family ground line in refusal #3's REASON opens with ground. */
interface FamilyRow {
  readonly id: string;
  readonly label: string;
  readonly ground: string;
  readonly pins: readonly string[];
}
/** A row the R-B223 fold appended to wb-w4si's notes: the line "<id>" FOLD_LEAD "<label>-<pin ids joined by '-'><tail>". */
interface FoldedRow {
  readonly id: string;
  readonly label: string;
  readonly tail: string;
  readonly pins: readonly string[];
}
/** A named residual: the view's literal reading of its one probe, which the page does not share. */
interface Residual {
  readonly id: string;
  readonly row: string;
  readonly quote: string;
  readonly probe: string;
}

/** Every probe: its text, the view's literal readings and the page's measured verdict (the residual probes last). */
const PROBES: readonly Probe[] = [
  { id: "D1-LM-STAR", text: "Pi serves spec\u1d58*\u02e1*ative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "D1-LM-TILDE", text: "Pi serves spec\u1d58~~\u02e1~~ative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "D1-LM-JOINT", text: "Pi serves the w\u02b0*\u1d43*t-if view.", view: "Pi serves the what-if view.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "D1-LM-STAR-SHY", text: "Pi serves spec&shy;*\u1d58*&shy;lative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true }, seat: true },
  { id: "D1-LM-TILDE-SHY", text: "Pi serves spec&shy;~~\u1d58~~&shy;lative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true }, seat: true },
  { id: "D1-LO-STAR-SHY", text: "Pi serves specul&shy;*\u00aa*&shy;tive RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true }, seat: true },
  { id: "D1-NL-STAR", text: "Pi serves hypothet\u2170*\u217d*al RF context.", view: "Pi serves hypothetical RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "D1-NL-TILDE", text: "Pi serves hypothet\u2170~~\u217d~~al RF context.", view: "Pi serves hypothetical RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "D1-NL-STAR-SHY", text: "Pi serves hypothet&shy;*\u2170*&shy;cal RF context.", view: "Pi serves hypothetical RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true }, seat: true },
  { id: "D1-NL-TILDE-SHY", text: "Pi serves hypothet&shy;~~\u2170~~&shy;cal RF context.", view: "Pi serves hypothetical RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true }, seat: true },
  { id: "D2-LATIN-X", text: "<div>Pi serves spec</\u00e9x>ulative RF context.</div>", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "D2-LATIN", text: "<div>Pi serves spec</\u00e9>ulative RF context.</div>", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "D2-GREEK", text: "<div>Pi serves spec</\u03b1>ulative RF context.</div>", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true }, seat: true },
  { id: "D2-FULLWIDTH", text: "<div>Pi serves spec</\uff42>ulative RF context.</div>", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true }, seat: true },
  { id: "D3-LATIN-X", text: "<div>Pi serves spec<\u00e9x>ulative RF context.</div>", view: "Pi serves spec<\u00e9x>ulative RF context.", verdict: { c1: false, c2: false }, page: { c1: false, c2: false } },
  { id: "D3-GREEK", text: "<div>Pi serves spec<\u03b1>ulative RF context.</div>", view: "Pi serves spec<\u03b1>ulative RF context.", verdict: { c1: false, c2: false }, page: { c1: false, c2: false } },
  { id: "D3-JOINT", text: "<div>Pi serves the what<\u00e9>-if view.</div>", view: "Pi serves the what<\u00e9>-if view.", verdict: { c1: false, c2: false }, page: { c1: false, c2: false } },
  { id: "D3-FULLWIDTH", text: "<div>Pi serves spec<\uff42>ulative RF context.</div>", view: "Pi serves spec<b>ulative RF context.", verdict: { c1: false, c2: false }, page: { c1: false, c2: false } },
  { id: "D3-FULLWIDTH-CAPITAL", text: "<div>Pi serves spec<\uff22>ulative RF context.</div>", view: "Pi serves spec<B>ulative RF context.", verdict: { c1: false, c2: false }, page: { c1: false, c2: false }, seat: true },
  { id: "D4-HASH", text: "Pi serves x\n\\# spec&shy;ulative RF context.", view: "Pi serves x\n# speculative RF context.", verdict: { c1: false, c2: true }, page: { c1: false, c2: true } },
  { id: "D4-QUOTE", text: "Pi serves x\n\\> spec&shy;ulative RF context.", view: "Pi serves x\n> speculative RF context.", verdict: { c1: false, c2: true }, page: { c1: false, c2: true } },
  { id: "D4-PIPE", text: "Pi serves x\n\\| spec&shy;ulative RF context.", view: "Pi serves x\n| speculative RF context.", verdict: { c1: false, c2: true }, page: { c1: false, c2: true } },
  { id: "D4-PLUS", text: "Pi serves x\n\\+ spec&shy;ulative RF context.", view: "Pi serves x\n+ speculative RF context.", verdict: { c1: false, c2: true }, page: { c1: false, c2: true } },
  { id: "D4-STAR", text: "Pi serves x\n\\* spec&shy;ulative RF context.", view: "Pi serves x\n* speculative RF context.", verdict: { c1: false, c2: true }, page: { c1: false, c2: true } },
  { id: "D4-DOT", text: "Pi serves x\n1\\. spec&shy;ulative RF context.", view: "Pi serves x\n1. speculative RF context.", verdict: { c1: false, c2: true }, page: { c1: false, c2: true } },
  { id: "D4-PAREN", text: "Pi serves x\n1\\) spec&shy;ulative RF context.", view: "Pi serves x\n1) speculative RF context.", verdict: { c1: false, c2: true }, page: { c1: false, c2: true } },
  { id: "D4-HYPHEN", text: "Pi serves x\n\\- spec&shy;ulative RF context.", view: "Pi serves x\n- speculative RF context.", verdict: { c1: false, c2: true }, page: { c1: false, c2: true } },
  { id: "D4-QUOTE-DIV", text: "<div>\n\nPi serves x\n\\> spec&shy;ulative RF context.\n\n</div>", view: "\n\nPi serves x\n> speculative RF context.\n\n", verdict: { c1: false, c2: true }, page: { c1: false, c2: true } },
  { id: "U1-TILDE2", text: "Pi serves spec&shy;~~ul~~ative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U1-TILDE1", text: "Pi serves spec&shy;~ul~ative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U1-TILDE2-RAW-SHY", text: "Pi serves spec\u00ad~~ul~~ative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U1-TILDE2-JOINT", text: "Pi serves the what-~~if~~ view.", view: "Pi serves the what-if view.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U1-TILDE2-EDGE", text: "Pi serves x ~~speculative~~ RF context.", view: "Pi serves x speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U1-RUN3", text: "Pi serves spec&shy;***ul***ative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U1-RUN3-JOINT", text: "Pi serves the what-&shy;***if*** view.", view: "Pi serves the what-if view.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U1-TWO-KINDS", text: "Pi serves spec&shy;*~ul~*ative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U1-CAPITALS-TILDE2", text: "Pi serves SPEC&shy;~~UL~~ATIVE RF context.", view: "Pi serves SPECULATIVE RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U1-CAPITALS-TILDE1", text: "Pi serves SPEC&shy;~UL~ATIVE RF context.", view: "Pi serves SPECULATIVE RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U1-CAPITALS-BEHIND", text: "Pi serves SPEC~~UL~~&shy;ATIVE RF context.", view: "Pi serves SPECULATIVE RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U1-FULLWIDTH-BEHIND", text: "Pi serves spe~~c\uff55~~&shy;lative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U2-PI", text: "<div>Pi serves spec<?x\ry?>ulative RF context.</div>", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U2-PI-TEXT", text: "Pi serves spec<?x\ry?>ulative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U2-DECLARATION", text: "<div>Pi serves spec<!x\ry>ulative RF context.</div>", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U2-END-TAG-DIGIT", text: "<div>Pi serves spec</1\rx>ulative RF context.</div>", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U2-CDATA", text: "<div>Pi serves spec<![CDATA[\r]]>ulative RF context.</div>", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U2-PI-CRLF", text: "<div>Pi serves spec<?x\r\ny?>ulative RF context.</div>", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U2-COMMENT", text: "<div>Pi serves spec<!-- a\r> b -->ulative RF context.</div>", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "U2-COMMENT-EMPTY", text: "<div>Pi serves spec<!--\r>-->ulative RF context.</div>", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: true, c2: true } },
  { id: "R-BLOCK-MARKS", text: "<p>Pi serves hypothet\u2170*\u217d*al RF context.</p>", view: "Pi serves hypothetical RF context.", verdict: { c1: true, c2: true }, page: { c1: false, c2: false } },
  { id: "R-TILDES-AROUND-EMPHASIS", text: "Pi serves spec&shy;~*ul*~ative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: false, c2: false } },
  { id: "R-CR-QUOTE-BREAK", text: "Pi serves spec<!-- a\r> b -->ulative RF context.", view: "Pi serves speculative RF context.", verdict: { c1: true, c2: true }, page: { c1: false, c2: false } },
];

const PINS: readonly Pin[] = [
  {
    id: "G23-IM1",
    name: "G23-IM1",
    quote: "narrows N to Nd",
    witness: "Pi serves hypothet{U+2170}*{U+217D}*al RF context.",
    probes: ["D1-NL-STAR", "D1-NL-TILDE", "D1-NL-STAR-SHY", "D1-NL-TILDE-SHY"],
  },
  {
    id: "G23-IM2",
    name: "G23-IM2",
    quote: "narrows L to Lu/Ll",
    witness: "Pi serves spec{U+1D58}*{U+02E1}*ative RF context.",
    probes: ["D1-LM-STAR", "D1-LM-TILDE", "D1-LM-JOINT", "D1-LM-STAR-SHY", "D1-LM-TILDE-SHY", "D1-LO-STAR-SHY"],
  },
  {
    id: "G23-IM7",
    name: "G23-IM7",
    quote: "excludes Lm",
    witness: "Pi serves spec{U+1D58}*{U+02E1}*ative RF context.",
    probes: ["D1-LM-STAR", "D1-LM-TILDE", "D1-LM-JOINT", "D1-LM-STAR-SHY", "D1-LM-TILDE-SHY"],
  },
  {
    id: "G23-IM8",
    name: "G23-IM8",
    quote: "excludes Nl",
    witness: "Pi serves hypothet{U+2170}*{U+217D}*al RF context.",
    probes: ["D1-NL-STAR", "D1-NL-TILDE", "D1-NL-STAR-SHY", "D1-NL-TILDE-SHY"],
  },
  {
    id: "G23-BC9",
    name: "G23-BC9",
    quote: "excludes non-ASCII letters",
    witness: "<div>Pi serves spec</{U+00E9}x>ulative RF context.</div>",
    probes: ["D2-LATIN-X", "D2-LATIN", "D2-GREEK", "D2-FULLWIDTH"],
  },
  {
    id: "G23-ME4",
    name: "G23-ME4",
    quote: "lets any Unicode letter open a tag",
    witness: "<div>Pi serves spec<{U+00E9}x>ulative RF context.</div>",
    probes: ["D3-LATIN-X", "D3-GREEK", "D3-JOINT", "D3-FULLWIDTH", "D3-FULLWIDTH-CAPITAL"],
  },
  { id: "G23-ME5", name: "G23-ME5", quote: "a fullwidth one", probes: ["D3-FULLWIDTH", "D3-FULLWIDTH-CAPITAL"] },
  {
    id: "G23-NO2",
    name: "G23-NO2",
    quote: "(class narrowed to '-')",
    witness: "Pi serves x{LF}{backslash}# spec&shy;ulative RF context.",
    probes: ["D4-HASH", "D4-QUOTE", "D4-PIPE", "D4-PLUS", "D4-STAR", "D4-DOT", "D4-PAREN", "D4-HYPHEN", "D4-QUOTE-DIV"],
  },
  { id: "G23-NO3", name: "NO3", quote: "(no '#')", witness: "Pi serves x{LF}{backslash}# spec&shy;ulative RF context.", probes: ["D4-HASH"] },
  { id: "G23-NO5", name: "NO5", quote: "(no '>' or '|')", probes: ["D4-QUOTE", "D4-PIPE", "D4-QUOTE-DIV"] },
  { id: "G23-NO6", name: "NO6", quote: "(no '+' or '*')", probes: ["D4-PLUS", "D4-STAR"] },
  { id: "G23-NO7", name: "NO7", quote: "(no '.' or ')')", probes: ["D4-DOT", "D4-PAREN"] },
  { id: "G23-ES02x", name: "ES02", quote: "':-@'", probes: ["D4-QUOTE", "D4-QUOTE-DIV"] },
  { id: "G23-ES04x", name: "ES04", quote: "'{-~' range removals", probes: ["D4-PIPE"] },
  {
    id: "IM05",
    name: "IM05:",
    quote: "'~' dropped from the lookahead branch (a '~' run with a letter after it and none before it)",
    witness: "Pi serves spec&shy;~~ul~~ative RF context.",
    probes: ["U1-TILDE2", "U1-TILDE1", "U1-TILDE2-RAW-SHY", "U1-TILDE2-JOINT", "U1-TILDE2-EDGE", "U1-TWO-KINDS", "U1-CAPITALS-TILDE2", "U1-CAPITALS-TILDE1"],
  },
  {
    id: "IM33",
    name: "IM33:",
    quote: "lookahead-side runs capped at two marks",
    witness: "Pi serves spec&shy;***ul***ative RF context.",
    probes: ["U1-RUN3", "U1-RUN3-JOINT"],
  },
  { id: "IM35", name: "IM35:", quote: "lookahead-side runs of one kind only", witness: "Pi serves spec&shy;*~ul~*ative RF context.", probes: ["U1-TWO-KINDS"] },
  {
    id: "IM37",
    name: "IM37:",
    quote: "'~~' before a letter not read",
    witness: "Pi serves spec&shy;~~ul~~ative RF context.",
    probes: ["U1-TILDE2", "U1-TILDE2-RAW-SHY", "U1-TILDE2-JOINT", "U1-TILDE2-EDGE", "U1-TWO-KINDS", "U1-CAPITALS-TILDE2"],
  },
  {
    id: "IM45",
    name: "IM45:",
    quote: "'~' before an ASCII capital not read",
    witness: "Pi serves SPEC&shy;~~UL~~ATIVE RF context.",
    probes: ["U1-CAPITALS-TILDE2", "U1-CAPITALS-TILDE1"],
  },
  { id: "IM46", name: "IM46:", quote: "'~' after an ASCII capital not read", witness: "Pi serves SPEC~~UL~~&shy;ATIVE RF context.", probes: ["U1-CAPITALS-BEHIND"] },
  {
    id: "IM47",
    name: "IM47:",
    quote: "'~' and '`' after a fullwidth small letter not read",
    witness: "Pi serves spe~~c{U+FF55}~~&shy;lative RF context.",
    probes: ["U1-FULLWIDTH-BEHIND"],
  },
  {
    id: "BC19",
    name: "BC19,",
    quote: "BOGUS_COMMENT [^>]* to [^>\\r]* (:487)",
    witness: "<div>Pi serves spec<?x\\ry?>ulative RF context.</div>",
    probes: ["U2-PI", "U2-PI-TEXT", "U2-DECLARATION", "U2-END-TAG-DIGIT", "U2-CDATA", "U2-PI-CRLF"],
  },
  {
    id: "HC08",
    name: "HC08,",
    quote: "HTML_COMMENT [\\s\\S]*? to [^\\r]*? (:476)",
    witness: "<div>Pi serves spec<!-- a\\r> b -->ulative RF context.</div>",
    probes: ["U2-COMMENT", "U2-COMMENT-EMPTY"],
  },
];

const FAMILIES: readonly FamilyRow[] = [
  {
    id: "D1",
    label: "INLINE_MARKS Lm/Nl under-read (Unicode letter-modifier / letter-number inside marked words).",
    ground: "- INLINE_MARKS '",
    pins: ["G23-IM1", "G23-IM2", "G23-IM7", "G23-IM8"],
  },
  { id: "D2", label: "BOGUS_COMMENT under-read: non-ASCII letter after '</' not read as a bogus-comment opener.", ground: "- BOGUS_COMMENT '", pins: ["G23-BC9"] },
  { id: "D3", label: "markupEnd tag-opener over-read: non-ASCII fullwidth letter accepted as a tag opener.", ground: "- markupEnd '", pins: ["G23-ME4", "G23-ME5"] },
  {
    id: "D4",
    label:
      "normalized() backslash step over-read: escape set narrowed at line-start markers (includes the seat's ES02/ES04, declared equivalent but non-equivalent per the class-level guard).",
    ground: "- normalized()'s backslash step:",
    pins: ["G23-NO2", "G23-NO3", "G23-NO5", "G23-NO6", "G23-NO7", "G23-ES02x", "G23-ES04x"],
  },
];
const FOLDED: readonly FoldedRow[] = [
  {
    id: "U1",
    label: "INLINE-MARKS-CLAIMED-READINGS-WIDER-THAN-PINS-7-GATE-MUTANTS",
    tail: "-37-OF-37-TWO-RUNS-FAIL-OPEN-ON-PLANTS-UNMODIFIED-3-FAILED-34-PASSED",
    pins: ["IM05", "IM33", "IM35", "IM37", "IM45", "IM46", "IM47"],
  },
  {
    id: "U2",
    label: "LINE-ENDING-CLAIMS-WIDER-THAN-PINS-CARRIAGE-RETURN-UNPINNED-BOGUS-COMMENT-ACROSS-A-LINE-ENDING-AND-HEADER-OUTLINE-COMMENTS-HTML-COMMENT-READS",
    tail: "-37-OF-37-TWO-RUNS-FAIL-OPEN-ON-PLANTS",
    pins: ["BC19", "HC08"],
  },
];
const ROWS: readonly { readonly id: string; readonly pins: readonly string[] }[] = [...FAMILIES, ...FOLDED];
const RESIDUALS: readonly Residual[] = [
  { id: "R-BLOCK-MARKS", row: "D1", quote: "a mark run an HTML block holds, which marked shows as written, is removed", probe: "R-BLOCK-MARKS" },
  { id: "R-TILDES-AROUND-EMPHASIS", row: "U1", quote: "the two '~' marked shows around rendered emphasis are removed", probe: "R-TILDES-AROUND-EMPHASIS" },
  { id: "R-CR-QUOTE-BREAK", row: "U2", quote: "a comment read through its '-->' where a carriage return's next line opens a blockquote", probe: "R-CR-QUOTE-BREAK" },
];

function probeOf(id: string): Probe {
  const probe = PROBES.find(candidate => candidate.id === id);
  if (probe === undefined) throw new Error(`${id}: no such probe`);
  return probe;
}
function pinOf(id: string): Pin {
  const pin = PINS.find(candidate => candidate.id === id);
  if (pin === undefined) throw new Error(`${id}: no such pin`);
  return pin;
}
/** Where a record names the pin: the index of its first "<name> <quote>" that one of CITE_ENDS follows (-1 when none does). */
function citeAt(record: string, pin: Pin): number {
  const cite = `${pin.name} ${pin.quote}`;
  const starts = CITE_ENDS.map(end => record.indexOf(`${cite}${end}`)).filter(at => at >= 0);
  return starts.length === 0 ? -1 : Math.min(...starts);
}
/** The witnesses a stretch of record text quotes, in order and in the record's notation. */
function quotedWitnesses(text: string): string[] {
  return [...text.matchAll(QUOTED_WITNESS)].map(match => match[1] ?? "");
}
/**
 * Refusal #3's paragraph that names a D row's pins: from the last PARAGRAPH_OPEN before the first of their cites to the first
 * PARAGRAPH_OPEN or PARAGRAPH_AFTER after the last of them (empty when a pin is not named there or either bound is missing).
 */
function familyParagraph(record: string, pins: readonly Pin[]): string {
  const cites = pins.map(pin => citeAt(record, pin));
  if (cites.length === 0 || cites.some(at => at < 0)) return "";
  const start = record.lastIndexOf(PARAGRAPH_OPEN, Math.min(...cites));
  const last = Math.max(...cites);
  const ends = [record.indexOf(PARAGRAPH_OPEN, last), record.indexOf(PARAGRAPH_AFTER, last)].filter(at => at >= 0);
  return start < 0 || ends.length === 0 ? "" : record.slice(start, Math.min(...ends));
}
/**
 * The witness refusal #4 quotes for a U pin: the first one the line of the bullet that names it quotes after its cite or, where that
 * line says SAME_WITNESS there instead, the first one the line above quotes (undefined when the pin is not named or neither quotes one).
 */
function bulletWitness(record: string, pin: Pin): string | undefined {
  const at = citeAt(record, pin);
  const lineStart = record.lastIndexOf("\n", at);
  if (at < 0 || lineStart < 0) return undefined;
  const lineEnd = record.indexOf("\n", at);
  const rest = record.slice(at + `${pin.name} ${pin.quote}`.length, lineEnd < 0 ? record.length : lineEnd);
  const own = quotedWitnesses(rest)[0];
  if (own !== undefined || !rest.includes(SAME_WITNESS)) return own;
  return quotedWitnesses(record.slice(record.lastIndexOf("\n", lineStart - 1) + 1, lineStart))[0];
}
/** The view's readings of a probe's text: normalized() and docsVerdict(). */
function readingOf(text: string): { readonly view: string; readonly verdict: Verdict } {
  return { view: normalized(text), verdict: docsVerdict(text) };
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
/** The text from the first occurrence of open up to the first occurrence of close after it (empty when either is absent). */
function between(text: string, open: string, close: string): string {
  const start = text.indexOf(open);
  const end = start < 0 ? -1 : text.indexOf(close, start + open.length);
  return end < 0 ? "" : text.slice(start, end);
}
/** The first line of text that opens with lead (empty when none does). */
function lineOpening(text: string, lead: string): string {
  const start = text.indexOf(`\n${lead}`);
  if (start < 0) return "";
  const end = text.indexOf("\n", start + 1);
  return text.slice(start + 1, end < 0 ? text.length : end);
}
/** The gate mutant ids a refusal ground line names, in order, each with its G23- prefix (the line abbreviates the later ones). */
function mutantIds(line: string): string[] {
  const ids = (line.match(/(?<![\w-])(?:G23-)?(?:(?:IM|BC|ME|NO)\d+|ES\d+x)(?!\w)/g) ?? []).map(id => (id.startsWith("G23-") ? id : `G23-${id}`));
  return ids.filter((id, at) => ids.indexOf(id) === at);
}
/** A witness in a refusal record's notation, decoded: {U+XXXX} a code point, {LF} a line feed, \r a carriage return, {backslash} a backslash. */
function decoded(witness: string): string {
  return witness
    .replace(/\{U\+([0-9A-F]{4,6})\}/g, (_match, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/\{LF\}/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\{backslash\}/g, "\\");
}

describe("wb-w4si normalized-view readers census (test/helpers/rf-speculative-normalized-view.ts): 23 pin cases holding literal probe readings, the docs verdict the page's, that their named wb-eu94 reader mutants change, 3 residual cases, SHAPE and ANCHOR", () => {
  it("SHAPE: the rows, their pins, each pin's probe ids, the pins that carry a witness literal and the residual rows stay frozen", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["D1:4", "D2:1", "D3:2", "D4:7", "U1:7", "U2:2"]);
    expect(PINS.map(pin => `${pin.id}:${pin.probes.join(",")}`)).toEqual([
      "G23-IM1:D1-NL-STAR,D1-NL-TILDE,D1-NL-STAR-SHY,D1-NL-TILDE-SHY",
      "G23-IM2:D1-LM-STAR,D1-LM-TILDE,D1-LM-JOINT,D1-LM-STAR-SHY,D1-LM-TILDE-SHY,D1-LO-STAR-SHY",
      "G23-IM7:D1-LM-STAR,D1-LM-TILDE,D1-LM-JOINT,D1-LM-STAR-SHY,D1-LM-TILDE-SHY",
      "G23-IM8:D1-NL-STAR,D1-NL-TILDE,D1-NL-STAR-SHY,D1-NL-TILDE-SHY",
      "G23-BC9:D2-LATIN-X,D2-LATIN,D2-GREEK,D2-FULLWIDTH",
      "G23-ME4:D3-LATIN-X,D3-GREEK,D3-JOINT,D3-FULLWIDTH,D3-FULLWIDTH-CAPITAL",
      "G23-ME5:D3-FULLWIDTH,D3-FULLWIDTH-CAPITAL",
      "G23-NO2:D4-HASH,D4-QUOTE,D4-PIPE,D4-PLUS,D4-STAR,D4-DOT,D4-PAREN,D4-HYPHEN,D4-QUOTE-DIV",
      "G23-NO3:D4-HASH",
      "G23-NO5:D4-QUOTE,D4-PIPE,D4-QUOTE-DIV",
      "G23-NO6:D4-PLUS,D4-STAR",
      "G23-NO7:D4-DOT,D4-PAREN",
      "G23-ES02x:D4-QUOTE,D4-QUOTE-DIV",
      "G23-ES04x:D4-PIPE",
      "IM05:U1-TILDE2,U1-TILDE1,U1-TILDE2-RAW-SHY,U1-TILDE2-JOINT,U1-TILDE2-EDGE,U1-TWO-KINDS,U1-CAPITALS-TILDE2,U1-CAPITALS-TILDE1",
      "IM33:U1-RUN3,U1-RUN3-JOINT",
      "IM35:U1-TWO-KINDS",
      "IM37:U1-TILDE2,U1-TILDE2-RAW-SHY,U1-TILDE2-JOINT,U1-TILDE2-EDGE,U1-TWO-KINDS,U1-CAPITALS-TILDE2",
      "IM45:U1-CAPITALS-TILDE2,U1-CAPITALS-TILDE1",
      "IM46:U1-CAPITALS-BEHIND",
      "IM47:U1-FULLWIDTH-BEHIND",
      "BC19:U2-PI,U2-PI-TEXT,U2-DECLARATION,U2-END-TAG-DIGIT,U2-CDATA,U2-PI-CRLF",
      "HC08:U2-COMMENT,U2-COMMENT-EMPTY",
    ]);
    expect(ROWS.flatMap(row => row.pins), "the rows hold every pin once, in pin order").toEqual(PINS.map(pin => pin.id));
    expect(PINS.filter(pin => pin.witness !== undefined).map(pin => pin.id), "the pins that carry a witness literal").toEqual([
      "G23-IM1",
      "G23-IM2",
      "G23-IM7",
      "G23-IM8",
      "G23-BC9",
      "G23-ME4",
      "G23-NO2",
      "G23-NO3",
      "IM05",
      "IM33",
      "IM35",
      "IM37",
      "IM45",
      "IM46",
      "IM47",
      "BC19",
      "HC08",
    ]);
    expect(RESIDUALS.map(residual => `${residual.id}:${residual.row}:${residual.probe}`)).toEqual([
      "R-BLOCK-MARKS:D1:R-BLOCK-MARKS",
      "R-TILDES-AROUND-EMPHASIS:U1:R-TILDES-AROUND-EMPHASIS",
      "R-CR-QUOTE-BREAK:U2:R-CR-QUOTE-BREAK",
    ]);
    expect(
      RESIDUALS.filter(residual => !ROWS.some(row => row.id === residual.row)).map(residual => residual.id),
      "every residual's row is one of the rows",
    ).toEqual([]);
    const used = new Set([...PINS.flatMap(pin => pin.probes), ...RESIDUALS.map(residual => residual.probe)]);
    expect(PROBES.map(probe => probe.id).filter(id => !used.has(id)), "every probe is read by a pin or a residual").toEqual([]);
    expect(
      PROBES.filter(probe => probe.seat === true).map(probe => probe.id),
      "the probes this cut added",
    ).toEqual(["D1-LM-STAR-SHY", "D1-LM-TILDE-SHY", "D1-LO-STAR-SHY", "D1-NL-STAR-SHY", "D1-NL-TILDE-SHY", "D2-GREEK", "D2-FULLWIDTH", "D3-FULLWIDTH-CAPITAL"]);
  });

  it("ANCHOR: the rows' ids and labels, their pins, the pins' cites and the pins' witnesses are the ones wb-w4si's and wb-eu94's tracker-export rows record", () => {
    const child = exportRow("wb-w4si");
    const parent = exportRow("wb-eu94");
    expect(
      child.description.split("\n").filter(line => /^\d+\. /.test(line)),
      "wb-w4si's description numbers exactly rows D1-D4: its numbered lines are, in order, '<n>. <label>' for row D<n>",
    ).toEqual(FAMILIES.map(row => `${row.id.replace(/^D/, "")}. ${row.label}`));
    expect(
      between(child.notes, FOLD_OPEN, FOLD_CLOSE).split("\n").slice(1),
      "the R-B223 fold's member lines in wb-w4si's notes are exactly rows U1 and U2, in order",
    ).toEqual(FOLDED.map(row => `${row.id}${FOLD_LEAD}${row.label}-${row.pins.join("-")}${row.tail}`));
    const refusal3 = between(parent.notes, REFUSAL_3, RECORD_END);
    const refusal4 = between(parent.notes, REFUSAL_4, RECORD_END);
    expect([refusal3.length > 0, refusal4.length > 0], "wb-eu94's notes hold refusal #3's and refusal #4's records").toEqual([true, true]);
    for (const row of FAMILIES) {
      expect(mutantIds(lineOpening(refusal3, row.ground)), `refusal #3's ${row.id} ground line names exactly the row's mutant ids, in order`).toEqual([...row.pins]);
    }
    for (const row of ROWS) {
      const record = FAMILIES.some(family => family.id === row.id) ? refusal3 : refusal4;
      for (const id of row.pins) {
        const pin = PINS.find(candidate => candidate.id === id);
        expect(pin, `${id}: a pin`).toBeDefined();
        if (pin === undefined) continue;
        const cite = `${pin.name} ${pin.quote}`;
        expect(CITE_ENDS.some(end => record.includes(`${cite}${end}`)), `${row.id}'s refusal record names ${id} as '${cite}'`).toBe(true);
      }
    }
    for (const row of FAMILIES) {
      const pins = row.pins.map(pinOf);
      const witnesses = quotedWitnesses(familyParagraph(refusal3, pins));
      expect(witnesses.length > 0, `refusal #3's paragraph naming ${row.id}'s pins quotes a witness`).toBe(true);
      const texts = witnesses.map(decoded);
      for (const witness of witnesses) {
        expect(
          pins.some(pin => pin.witness === witness && decoded(witness) === probeOf(pin.probes[0] ?? "").text),
          `${row.id}: the witness '${witness}' its paragraph quotes is a pin's witness literal and, decoded, its first probe`,
        ).toBe(true);
      }
      for (const pin of pins) {
        expect(pin.witness !== undefined, `${pin.id} carries a witness literal exactly when one of its probes is a witness its paragraph quotes`).toBe(
          pin.probes.some(id => texts.includes(probeOf(id).text)),
        );
        if (pin.witness === undefined) continue;
        expect(witnesses, `${pin.id}'s witness literal is one its paragraph quotes`).toContain(pin.witness);
        expect(decoded(pin.witness), `${pin.id}'s witness, decoded, is its first probe`).toBe(probeOf(pin.probes[0] ?? "").text);
      }
    }
    for (const row of FOLDED) {
      for (const pin of row.pins.map(pinOf)) {
        const witness = bulletWitness(refusal4, pin);
        expect(witness, `refusal #4's bullet naming ${pin.id} quotes its witness`).toBeDefined();
        expect(pin.witness, `${pin.id}'s witness literal is the one its bullet quotes`).toBe(witness);
        expect(decoded(witness ?? ""), `${pin.id}'s witness, decoded, is its first probe`).toBe(probeOf(pin.probes[0] ?? "").text);
      }
    }
  });

  for (const pin of PINS) {
    it(`${pin.id}: ${pin.quote}`, () => {
      for (const id of pin.probes) {
        const probe = probeOf(id);
        expect(readingOf(probe.text), `${pin.id} / ${id}: the view reads the probe exactly as written here`).toEqual({ view: probe.view, verdict: probe.verdict });
        expect(probe.verdict, `${pin.id} / ${id}: the verdict written here is the page's`).toEqual(probe.page);
      }
    });
  }

  for (const residual of RESIDUALS) {
    it(`${residual.id} (row ${residual.row}, residual): ${residual.quote}`, () => {
      const probe = probeOf(residual.probe);
      expect(readingOf(probe.text), `${residual.id}: the view reads the probe exactly as written here`).toEqual({ view: probe.view, verdict: probe.verdict });
      expect(probe.verdict, `${residual.id}: the view's verdict is not the page's`).not.toEqual(probe.page);
    });
  }
});
