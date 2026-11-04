/**
 * wb-gmj9 alt-read census, cut #2 (the rule-19 structural-exit child of wb-nnm7: ruling R-B229 filed it at wb-nnm7's refusal #3
 * carrying that refusal's two unmet items, and ruling R-B259, the dependency inversion at refusal #4, folded refusal #4's three unmet
 * items into it). Cut #2 answers wb-gmj9's own refusal #1 (its record in wb-gmj9's notes, from its verdict naming tip 330e6e06):
 * that refusal's two unmet items name twelve gate members of ANCHOR's own export readers, M01-M12, each paired with a witness,
 * W01-W12, that the cut #1 census read red while the member read it green. SUBJECT: inlineRendered() of
 * test/helpers/urr-alt-read.ts - the inline reader of the portable Fiber core gate census's rendered leg, THE ALT READ's image branch
 * among its lines - moved byte for byte from wb-nnm7's FINAL cut #4 (tip 7284444e); cut #2 leaves the helper unchanged. The parent's
 * census and roster at that tip are not on trunk and are neither added nor edited here; trunk's
 * test/workbench-urr-core-gate-census.test.ts keeps its own rendered leg and is not read by this census. The parent stays parked
 * until this lands, and its later re-cut can import the helper.
 *
 * wb-rlhi, the R694 follow-up of wb-gmj9's landing 835 (gate cmd_cfc21833081a PASS-WITH-FINDING), answers that gate's F1-F3 by the
 * pin route and narrows one doc: F1, each pin case first holds the probe ids it reads against its PINS entry's (G21-L2-47 TL2B);
 * F2 (a), the case IDS holds check (5) exact on four in-memory copies of wb-gmj9's row (G21-L2-38 C5-SET), and (b), ANCHOR holds
 * each row's id against the word its UNMET item opens with (G21-L2-50 SHAPE-ROWID-REFUSAL-ONLY); F3, sectionOf's reading of a text
 * lacking its open or its close is NOT CLAIMED (G21-L2-40 SECTION-NOCLOSE-EMPTY, G21-L2-41 SECTION-NOOPEN-WHOLE).
 *
 * wb-ceq3, the R694 follow-up of wb-rlhi's landing 885 (gate cmd_ee24857e0dae PASS-WITH-FINDING), answers that gate's F1 and F2 by
 * the pin route and narrows one NOT CLAIMED sentence: F1, each pin case next holds its loop entry to be the PINS entry its id names,
 * the one object (G12-A05 TL2B-ID-SWAP); F2, holdAnchor ends with REACH, which holds the pins and rows its two loops reached against
 * ROWS (G12-E01 CITE-FIRST-PIN-ONLY, G12-E04 ROWS-LOOP-FIRST-FOUR); and which of PINS's own objects the pin-case loop runs is NOT
 * CLAIMED (G12-A03 LOOP-DROP-GP23, G12-A04 LOOP-DROP-FIRST).
 *
 * wb-wzin, the R694 follow-up of wb-ceq3's landing 933 (gate cmd_dfd666a2bf80 PASS-WITH-FINDING) and the third hop of this carry
 * chain, is cut in owner ruling R739's terminal enumerate-the-resolvable form: it answers that gate's F1 and F2 by the pin route and
 * re-pins the two claim sentences they name, claim (3)'s REACH sentence and claim (1)'s lead sentence, to the forms ENUMERATED below.
 * F1, holdAnchor returns its loops' record, and ANCHOR and READERS hold the returned record against ROWS (RETURN), so a return from
 * holdAnchor before its loops have recorded the last row reds them (G11-C06, G11-C07, G11-C08, G11b-C11); F2, each pin case first
 * sets its assertion count to four and last holds READ, altRead's record of the case against the PINS entry its id names (G11-B01,
 * G11-B02, G11-B03), and PINS is frozen at load with everything it holds, which SHAPE holds (G11b-B04).
 *
 * PINNED READER SET (this file, test/workbench-urr-alt-read-census.test.ts; observed at the cut: 13 passed (13)):
 * - The nine pin cases, each named by its member's cite (the words with which the member's refusal record names it). Each first
 *   sets its assertion count to four (expect.assertions(4)), then holds the probe ids it reads against the probe ids of the PINS
 *   entry its id names (looked up in PINS by that id), then holds its loop entry to be that PINS entry itself, the one object (toBe),
 *   then holds, in one toEqual over the pin's probes in order, each probe's id with the reading inlineRendered() returns over the
 *   inline tokens of the probe's one paragraph (marked's lexer, 18.0.11 at the cut) - its pieces, the records it collects and the
 *   extras it collects - against the literal reading written here, and last (READ) holds altRead's record of the case - each text
 *   altRead was called with in the case and the reading it returned, in call order (the entries the case adds to READ_LOG) - against
 *   the texts and literal readings of that PINS entry's probes, in order. Observed: each passes. A probe's text is a witness that its
 *   row's UNMET item quotes, decoded from the record's notation (<backslash>, <line feed>, <two spaces>).
 *   - Row R3-U1 (wb-nnm7 refusal #3's U1): pin GP9-L2-12 SPACED-TRIM over trimBackslash, trimSpaces and trimDecision, each a hard
 *     break opening an image's alt (a backslash one, a two-space one, and the backslash one in a decision text), each read with the
 *     image piece "\nsm" in place and the one record image alt "sm".
 *   - Row R3-U2 (refusal #3's U2): pin GP9-L2-03 DEDUP-CHILDREN over dedupChildren (an alt whose text token holds &sopf; twice, read
 *     with the two records &sopf; and &sopf;); pin GP9-L2-06 ELEMENT-RECORDS-DROPPED over elementRecord (a marquee start tag in an
 *     alt, read with the records <marquee> and image alt "wa<marquee>sm"); pin GP9-L2-21 over rawBesideReference (an image inside a
 *     code element whose alt holds a code span's &sopf; and a raw-state text token, read with the records raw-state text "x" and
 *     &sopf;); pin GP9-L2-22 over nestedBesideReference (an image inside an image's alt beside a code span's &sopf;, read with the
 *     records image alt "wasm" and &sopf;).
 *   - Row R4-U1 (refusal #4's U1): pin GP23-L2-01 COMMENT-STRIPPED-COMPARE over commentAlt and commentDecision (an alt holding only
 *     an HTML comment, in a sentence and in a decision text), each read with the empty image piece and the one record image alt
 *     "<!-- wasm -->".
 *   - Row R4-U2 (refusal #4's U2): pin GP23-L2-06 HEX-WRITTEN-UNDECODED over hexCodeSpan (an alt holding only a code span whose
 *     reference is hexadecimal), read with the image piece "wa&#x73;m" and the one record image alt "wasm".
 *   - Row R4-U3 (refusal #4's U3): pin GP23-L2-02 BARE-TAG-STRIPPED-COMPARE over bareTag, boldReference and endTag, and pin
 *     GP23-L2-03 END-TAG-STRIPPED-COMPARE over endTag (an alt holding only the tag <wasm>; one holding a b element around a decimal
 *     reference; one holding an end tag between two letters), each read with its one image alt record.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its probe ids, the rows' pins
 *   against PINS's ids, each row's id against its refusal and its unmet item's first word, the plants' ids and the ids of IDS's
 *   copies, each held to a literal, and PINS frozen at load with every entry, probe list, probe and reading it holds (deepFrozen).
 *   Observed: passes.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped as the
 *   expectation). On the export as it stands, every check of holdAnchor holds over wb-gmj9's and wb-nnm7's rows: (1) LIST, the JSON
 *   list wb-gmj9's description holds after 'Unmet items verbatim: ' against the refusal #3 rows' unmet items, and FOLD, the member
 *   lines of the R-B259 fold in wb-gmj9's notes against the refusal #4 rows'; (2) each row's pins against the member ids memberIds
 *   reads from its unmet item; (3) in wb-nnm7's notes, each row's refusal record (refusal #3's from its verdict naming tip 2e5daa8f,
 *   refusal #4's from its verdict naming tip 7284444e, each read from that opening up to its BIND STEPS line) holds in its UNMET
 *   section one line opening "- U<n> (" (refusal #3, U<n> its unmet item's first word) or "- [<the row's unmet item>] " (refusal #4);
 *   the row's id is "R<refusal>-" and the word that item opens with (after "- " up to " (" for refusal #3, after "- [" up to its
 *   first "-" for refusal #4); and that item holds each of the row's pins' cites after a space and before ":", ",", " (" or ".", each
 *   cite opening with its pin's id; (4) the witnesses that item quotes (each single-quoted text holding "](x.png)"), decoded, against
 *   the row's probes' texts in the order the row's pins first hold them; and REACH, last: the pins and rows holdAnchor's two loops
 *   reached - each pin recorded once its cite check passes, each row once its witness check passes - against ROWS, each row's pins in
 *   order and then the row, row by row. holdAnchor returns that record, and the case holds the returned record against ROWS in the
 *   same form (RETURN, against reachedOf(ROWS)). And (5) the W ids that the two UNMET item lines of wb-gmj9's refusal #1 record name
 *   (each "-W<nn>" before "-" or ".") equal the plants' ids, in that order. Observed: passes.
 * - Case READERS (refusal #1's cure, by the pin route): twelve plants, each the two export rows ANCHOR reads with one edit applied in
 *   memory, never to a file - refusal #1's paired witnesses as its gate wrote them: W01 the description list's two items swapped; W02
 *   a third item appended to that list; W03 the fold's first two lines swapped; W04 a fourth fold line; W08 the first two witness
 *   quotes of refusal #3's U1 item swapped; W09 a fourth quote, 'Pi embeds wa![gp23](x.png) runtime.', appended to that item; W05 a
 *   second line opening "- U1 (" after that item; W06 the item's cite GP9-L2-12 SPACED-TRIM followed by ";"; W07 that cite joined to
 *   the word before it, "MEMBER:GP9-L2-12 SPACED-TRIM:"; W10 the item opened "- U9 (" in the first refusal #3 record and an intact
 *   copy of that record appended after the notes; W11 refusal #4's U1 item opened without the space after its "]"; W12 refusal #3's
 *   U1 item opened "- U1: (". For the unedited rows and for each plant the case runs holdAnchor and then RETURN over the record it
 *   returns, reads the message of the first of those checks that fails (empty when every check holds) and holds the thirteen to one
 *   literal list: the unedited rows hold; W01 and W02 fail LIST; W03 and W04 fail FOLD; W08 and W09 fail R3-U1's witness check; W05,
 *   W10 and W12 fail R3-U1's one-item check; W06 and W07 fail R3-U1's cite check for GP9-L2-12; W11 fails R4-U1's one-item check.
 *   Observed: passes.
 * - Case IDS (wb-rlhi; check (5) held exact): check (5) run on wb-gmj9's row as it stands holds, and run on four copies of that row,
 *   each with one edit applied in memory inside its refusal #1 record's UNMET section, it fails with its own message each time:
 *   C5-DROPPED (W06 dropped), C5-ADDED (W13 added after W12), C5-TWICE (W06 written twice) and C5-SWAPPED (W06 and W07 swapped).
 *   Observed: passes.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe the reader returns exactly the literal reading written here: a reader edit that
 * changes one probe's reading reds that pin case. A pin case left reading fewer probes than its PINS entry holds reds that case too,
 * in the forms enumerated here: its reading side cut alone (refusal #1's F1 rider TL2) at its reading assertion; the loop's entries
 * cut so that both of its sides read fewer (the landing-835 gate's G21-L2-47 TL2B) at its first assertion, which holds the probe ids
 * it reads against those of the PINS entry its id names; a loop entry so cut and given another pin's id as well (the landing-885
 * gate's G12-A05 TL2B-ID-SWAP) at its second assertion, which holds the case's loop entry to be the PINS entry its id names, the one
 * object; the reading assertion's two sides cut together (the landing-933 gate's G11-B01 TL2-BOTH-FIRST and G11-B02 TL2-BOTH-LAST) or
 * its reading side reading a later probe from the expected literal (G11-B03 READING-SIDE-ECHO-LATER) at READ, the case's last
 * assertion, which holds altRead's record of the case against the texts and literal readings of that PINS entry's probes - so,
 * whatever the reading assertion compares, the case reds there if not before when altRead read fewer of those probes, other texts or
 * another order, or returned another reading for one of them; an assignment, an Object.defineProperty call or a mutating array call a
 * case makes into PINS or anything PINS holds (the landing-933 gate's G11b-B04 IN-CASE-ENTRY-SHORTENED, its own entry's probe list
 * cut), which throws and reds that case, PINS being frozen at load with every entry, probe list, probe and reading it holds (SHAPE
 * holds it so), so that no case cuts or rewrites PINS at run time; and a return from a pin case before its last assertion, which reds
 * it through its assertion count of four or, when the return comes before that count is set, through the gate's
 * --expect.requireAssertions. So a loop entry that is not one of PINS's own objects reds its case whatever it keeps or changes of an
 * entry's id, cite or probes: at the first assertion when its id names no PINS entry or its probe ids differ from that entry's, at
 * the second otherwise. (2) Each named member of wb-nnm7's refusals changes the reading of every probe of its own pin: the cutting
 * seat applied each member's own edit (its refusal gate's archived find and replace, verbatim, over a copy of the helper), read the
 * pin case named after it red and read each of that pin's probes changed; a pin whose probes stopped holding its form would read
 * green there. (3) The rows with their ids and unmet items, each row's pins, each pin's cite, each row's probe texts and the plants'
 * ids are held to the tracker export: a row or a pin removed or added, a row renamed or its unmet item changed, a pin's cite
 * shortened, a probe removed, added, moved to another row or given another text, or a plant removed - in one literal or in every
 * literal together - reds SHAPE, ANCHOR or READERS (standing rule 16's CT1-CT6 among them). A row renamed in every literal together
 * reds ANCHOR's id check beside SHAPE's, so a SHAPE edit that reads the id against itself (the landing-835 gate's G21-L2-50) leaves
 * it red; a plant removed in every literal together reds ANCHOR's check (5), whose exactness claim (5) holds. Those checks run on
 * every row and on every pin of each row, in the forms enumerated here: REACH, holdAnchor's last check, holds the pins and rows its
 * loops reached against ROWS, so its row loop or its cite loop cut to fewer rows or pins (the landing-885 gate's G12-E04
 * ROWS-LOOP-FIRST-FOUR and G12-E01 CITE-FIRST-PIN-ONLY; the landing-933 gate's G11-C01 to G11-C05, a slice, a filter or a break) reds
 * ANCHOR and READERS, alone and with GP23-L2-03's or GP9-L2-21's cite shortened or GP23-L2-03 removed from every literal; and RETURN,
 * in ANCHOR and in each of READERS' runs, holds the record holdAnchor returns against ROWS once it returns, so a return from
 * holdAnchor before its loops have recorded the last row (the landing-933 gate's G11-C06 after R4-U2's row record, G11-C07 after
 * GP23-L2-02's pin record, G11-C08 after R4-U1's one-item check and G11b-C11 before GP23-L2-03's cite check, with G11-C09 before the
 * row loop and G11-C10 after GP9-L2-21's pin record; written 'return;' or 'return reached;') reds ANCHOR and READERS on the export as
 * it stands, and a bare 'return;' also fails the typing step (TS2322 against holdAnchor's declared string[] return), as removing
 * holdAnchor's last 'return reached;' does (TS2355). (4) On each plant the first holdAnchor check that fails is the one READERS holds
 * it to, and on the unedited rows none fails and RETURN holds: a holdAnchor edit that changes the check a plant fails first, or lets
 * a plant pass, reds READERS. The cutting seat applied each of refusal #1's twelve members M01-M12 (its gate's archived find and
 * replace, verbatim, over a copy of this census) and read READERS red under each on the real export, where the cut #1 census read
 * each at 0 failed. (5) Check (5) reads refusal #1's W ids exactly and in order: it fails on each of IDS's four copies, so check (5)
 * read as a superset, a subset, a set or order-free reds IDS (the landing-835 gate's G21-L2-38 C5-SET reads it as a superset).
 *
 * ENUMERATED (owner ruling R739's terminal form, this chain's third hop; claims (1) and (3) name these forms beside the forms they
 * named before): the landing-933 gate's F1, the early-return class of claim (3)'s REACH sentence - G11-C06, G11-C07, G11-C08 and
 * G11b-C11, each 0 failed | 13 passed on the trunk census and 2 | 11 here, failing ANCHOR and READERS at RETURN, and the typing step
 * as written - and its F2, the reading-assertion class of claim (1)'s lead sentence - G11-B01, G11-B02 and G11-B03, each 0 | 13 on
 * the trunk census and 3 | 10 here, failing READ in the three pin cases that hold more than one probe, and G11b-B04, 0 | 13 there and
 * 9 | 4 here, its write into the frozen PINS throwing in each pin case. Each is cured by the pin route; none is a residual.
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them a white space run at
 * an alt's close, a hard break opening an emphasis, a link or an image inside the alt, any other inline html markup in an alt (a
 * comment beside text, a processing instruction, a CDATA section, a tag with attributes), a reference a code span writes in decimal
 * or in uppercase hexadecimal, any reference an escape writes, three or more records in one alt, and every other arrangement of the
 * image's children's records. Whether a reading is what a reader is shown is NOT CLAIMED by this census: no renderer runs here beyond
 * the reader's own call to marked's Parser and TextRenderer. A pin's cite lengthened to words its record holds before one of the four
 * ends is NOT CLAIMED by this census. A probe's id is this file's own name: one renamed in every literal together is NOT CLAIMED by
 * this census, nor which pin of its row holds a probe, changed in every literal together (the member replay is what shows each pin's
 * probes red its member). A reader edit made together with the literal readings it changes is NOT CLAIMED by this census. Which of
 * PINS's own objects the loop runs, how often and in what order - an entry left out (the landing-885 gate's G12-A03 LOOP-DROP-GP23
 * and G12-A04 LOOP-DROP-FIRST), run twice, or run in another's place - is NOT CLAIMED by this census: claim (1) speaks of the cases
 * the loop runs. REACH holds which rows and pins holdAnchor's loops reached, not which checks run in a loop's body before its
 * records: a body edit that keeps the records is NOT CLAIMED by this census beyond claim (4)'s first failures. An edit that writes a
 * record of its own - pushes to holdAnchor's record or returns from holdAnchor rows or pins its loops did not reach (an early return
 * of reachedOf(ROWS) among them), writes into READ_LOG, or makes assertions of its own in a pin case - is NOT CLAIMED by this census;
 * nor is a return from holdAnchor after its loops have recorded the last row, which skips only REACH, whose record RETURN holds as
 * well. Run without vitest's --expect.requireAssertions, a pin case's return before its assertion count is set is NOT CLAIMED by this
 * census. altRead is this census's own reader of inlineRendered(): an edit of altRead is NOT CLAIMED by this census beyond the pin
 * cases' readings and READ. Two edits of this census's code made together are NOT CLAIMED by this census (a code edit paired with a
 * literal or helper edit is claimed where a claim names the pair) - among them READ or the assertion count removed together with a
 * reading-side cut, and the freeze removed together with a run-time write. The messages of REACH, RETURN and READ are held by no case
 * and claimed by none. Gate members of wb-nnm7's refusals #3 and #4 other than the nine pinned are no pin (the seat replayed
 * GP9-L2-01, -02, -04, -05, -10 and -18 and GP23-L2-04, -05, -07, -08, -09 and -10 from the gates' archived definitions), and whether
 * this census reds any of them is NOT CLAIMED. The parent census's own header, cases and roster are NOT CLAIMED by this census.
 * ANCHOR's readings (its checks (1)-(4) above) are claimed on two kinds of input only: the tracker export as it stands, and READERS'
 * twelve plants, each the one edit with the one text written here. On any other export they are NOT CLAIMED by this census: every
 * other order, position, count, spelling, bound or occurrence of the description's list, the fold's lines, the records, their UNMET
 * sections and items, the item openings, the cites and the witness quotes - among them an item, line or quote added at another
 * position or with another text, repeated, left empty, written with other white space, removed or changed; any row's item duplicated
 * or broken in another way, moved out of its UNMET section, or its opening written elsewhere in a line; a record's BIND STEPS bound
 * moved or removed; a witness quote written without its "]" or with another destination, and a list item holding "]"; another
 * near-miss of an opening; another character after a cite or joined to it; a record repeated elsewhere in the notes; and an export
 * holding two rows for one bead. Which edit a plant carries, changed to another edit that fails the same check first (W06's and
 * W07's; W05's, W10's and W12's), is NOT CLAIMED by this census (the member replay is what shows each plant red under its paired
 * member). The W ids of check (5) are read on the export as it stands and on IDS's four copies; that read on any other export is NOT
 * CLAIMED by this census, nor which edit an IDS copy carries, changed to another edit check (5) refuses, nor an IDS copy removed in
 * every literal together. sectionOf's reading of a text that lacks its open or its close is NOT CLAIMED by this census. memberIds is
 * claimed on the five rows' items, each naming one "GP<n>" family; an item naming two families is NOT CLAIMED by this census (refusal
 * #1's F1 rider M13). The order PINS lists the pins in, changed in every literal together, is NOT CLAIMED by this census (its F1
 * rider M14: a single literal edit that reorders the rows, a row's pins or PINS reds SHAPE, ANCHOR or READERS through their other
 * literals, with SHAPE's pin-order line read order-free). No residual is claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated; the tracker export is only read, and every plant, IDS copy and
 * READ_LOG entry is built in memory; no src, docs or receipt is edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Tokens } from "marked";
import { describe, expect, it } from "vitest";
import { inlineRendered, type Piece } from "./helpers/urr-alt-read.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const EXPORT = ".beads/issues.jsonl";
/** Where wb-gmj9's description lists its unmet items (a JSON list follows), and where the R-B259 fold in its notes opens and closes. */
const UNMET_LIST = "Unmet items verbatim: ";
const FOLD_OPEN = "members folded into wb-gmj9\n";
const FOLD_CLOSE = "\nrule19-invert idem";
/** The openings of wb-nnm7's refusal #3 and refusal #4 verdict lines (bead notes, append-only); each record runs to its BIND STEPS line. */
const RECORD_OPENS: Readonly<Record<3 | 4, string>> = {
  3: "refusal #3 on cut #3 (tip 2e5daa8f9b079ec6fd8e90361c71d8ece48b40ad",
  4: "refusal #4 on cut #4 (tip 7284444eba4cdf243c1a77bfd150b6a5c00004ba",
};
const RECORD_END = "\nBIND STEPS AFTER THIS NOTE";
/** A record's UNMET section opens and closes so; each of its items is one line opening "- ". */
const UNMET_OPEN = "\nUNMET (record.unmet";
const UNMET_CLOSE = "\nRED (record.red";
/** What follows a pin's cite where its record names it. */
const CITE_ENDS = [":", ",", " (", "."];
/** The records' notation for a witness's white space, and what each stands for. */
const NOTATION: readonly (readonly [string, string])[] = [
  ["<backslash>", "\\"],
  ["<line feed>", "\n"],
  ["<two spaces>", "  "],
];
/** A witness a record quotes: a single-quoted text holding an image whose destination is x.png. */
const WITNESS_QUOTE = /'([^']*\]\(x\.png\)[^']*)'/g;
/** A member id an unmet item names: "GP<n>-L2-<n>", or "L2-<n>" after it, which takes that "GP<n>" (each of the five rows' items
 * names one family; an item naming two is NOT CLAIMED). */
const MEMBER_ID = /(?:^|-)(?:(GP\d+)-)?L2-(\d+)(?=-|$)/g;
/** The opening of wb-gmj9's own refusal #1 verdict line (its notes, append-only); its record runs to its BIND STEPS line, and its two
 * UNMET items name the twelve witnesses W01-W12 the plants below carry. */
const PLANT_RECORD_OPEN = "refusal #1 on cut #1 (tip 330e6e065bbcb5d79c6d61c52b8ec7d0f9517901";
/** A refusal #1 UNMET item: a line opening "- U<n>-". */
const PLANT_ITEM = /^- U\d+-/;
/** A witness id a refusal #1 UNMET item names: "-W<nn>" before "-" or ".". */
const WITNESS_ID = /-(W\d\d)(?=[-.])/g;

/** What the reader returns for a probe: the pieces of its paragraph's run and the records and extras it collects beside them. */
interface Reading {
  readonly pieces: readonly Piece[];
  readonly records: readonly string[];
  readonly extras: readonly string[];
}
interface Probe {
  readonly id: string;
  /** The witness as its record quotes it, decoded from the record's notation. */
  readonly text: string;
  readonly reading: Reading;
}
interface Pin {
  /** The member's id, as its row's unmet item names it. */
  readonly id: string;
  /** The words with which the member's refusal record names it. */
  readonly cite: string;
  readonly probes: readonly Probe[];
}
interface Row {
  readonly id: string;
  /** The wb-nnm7 refusal whose UNMET section holds the row's item. */
  readonly refusal: 3 | 4;
  /** The row's unmet item, verbatim from wb-gmj9's description (refusal #3) or from the R-B259 fold in its notes (refusal #4). */
  readonly unmet: string;
  readonly pins: readonly string[];
}
/** The two fields of an export row the census reads. */
interface ExportRow {
  readonly description: string;
  readonly notes: string;
}
/** The two export rows ANCHOR reads: wb-gmj9's (the child) and wb-nnm7's (the parent). */
interface AnchorRows {
  readonly child: ExportRow;
  readonly parent: ExportRow;
}
interface Plant {
  /** The witness's id, as refusal #1's UNMET items name it. */
  readonly id: string;
  /** The two rows with the witness's one edit. */
  readonly plant: (rows: AnchorRows) => AnchorRows;
}

/** altRead's record, in call order: each text it was called with and the reading it returned (READ holds each pin case's part, wb-wzin). */
const READ_LOG: { readonly text: string; readonly reading: Reading }[] = [];
/** inlineRendered() over the inline tokens of a text's one paragraph; altRead records each call in READ_LOG. */
function altRead(text: string): Reading {
  const blocks = marked.lexer(text).filter(token => token.type !== "space");
  const paragraph = blocks[0];
  if (blocks.length !== 1 || paragraph === undefined || paragraph.type !== "paragraph") throw new Error(`${JSON.stringify(text)}: not one paragraph`);
  const records: string[] = [];
  const extras: string[] = [];
  const pieces = inlineRendered((paragraph as Tokens.Paragraph).tokens, records, extras);
  READ_LOG.push({ text, reading: { pieces, records, extras } });
  return { pieces, records, extras };
}
/** value frozen, with every object and array it holds at any depth (wb-wzin). */
function deepFreeze(value: unknown): void {
  if (typeof value !== "object" || value === null) return;
  for (const held of Object.values(value) as unknown[]) deepFreeze(held);
  Object.freeze(value);
}
/** Whether value, and every object and array it holds at any depth, is frozen (SHAPE holds PINS so). */
function deepFrozen(value: unknown): boolean {
  if (typeof value !== "object" || value === null) return true;
  return Object.isFrozen(value) && (Object.values(value) as unknown[]).every(held => deepFrozen(held));
}

const TRIM_BACKSLASH: Probe = {
  id: "trimBackslash",
  text: "Pi embeds wa![\\\nsm](x.png) runtime.",
  reading: { pieces: ["Pi embeds wa", { first: "\nsm", other: "" }, " runtime."], records: ['image alt "sm"'], extras: ["x.png"] },
};
const TRIM_SPACES: Probe = {
  id: "trimSpaces",
  text: "Pi embeds wa![  \nsm](x.png) runtime.",
  reading: { pieces: ["Pi embeds wa", { first: "\nsm", other: "" }, " runtime."], records: ['image alt "sm"'], extras: ["x.png"] },
};
const TRIM_DECISION: Probe = {
  id: "trimDecision",
  text: "OWNER DECISION (2026-10-29): Pi will embed the wa![\\\nsm](x.png) build behind the W10 provider.",
  reading: {
    pieces: ["OWNER DECISION (2026-10-29): Pi will embed the wa", { first: "\nsm", other: "" }, " build behind the W10 provider."],
    records: ['image alt "sm"'],
    extras: ["x.png"],
  },
};
const DEDUP_CHILDREN: Probe = {
  id: "dedupChildren",
  text: "Pi embeds a ![wa&sopf;m wa&sopf;m](x.png) runtime.",
  reading: { pieces: ["Pi embeds a ", { first: "wa&sopf;m wa&sopf;m", other: "" }, " runtime."], records: ["&sopf;", "&sopf;"], extras: ["x.png"] },
};
const ELEMENT_RECORD: Probe = {
  id: "elementRecord",
  text: "Pi embeds a ![wa<marquee>sm](x.png) runtime.",
  reading: { pieces: ["Pi embeds a ", { first: "wasm", other: "" }, " runtime."], records: ["<marquee>", 'image alt "wa<marquee>sm"'], extras: ["x.png"] },
};
const RAW_BESIDE_REFERENCE: Probe = {
  id: "rawBesideReference",
  text: "Pi embeds the <code>![`wa&sopf;m` x](x.png)</code>.",
  reading: { pieces: ["Pi embeds the ", { first: "wa&sopf;m x", other: "" }, "."], records: ['raw-state text "x"', "&sopf;"], extras: ["x.png"] },
};
const NESTED_BESIDE_REFERENCE: Probe = {
  id: "nestedBesideReference",
  text: "Pi embeds a ![![wa  \nsm](y.png) `&sopf;`](x.png) runtime.",
  reading: { pieces: ["Pi embeds a ", { first: "wa\nsm &sopf;", other: "" }, " runtime."], records: ['image alt "wasm"', "&sopf;"], extras: ["x.png", "y.png"] },
};
const COMMENT_ALT: Probe = {
  id: "commentAlt",
  text: "Pi embeds a ![<!-- wa&#115;m -->](x.png) runtime.",
  reading: { pieces: ["Pi embeds a ", { first: "", other: "" }, " runtime."], records: ['image alt "<!-- wasm -->"'], extras: ["x.png"] },
};
const COMMENT_DECISION: Probe = {
  id: "commentDecision",
  text: "OWNER DECISION (2026-10-29): Pi will embed the ![<!-- wa&#115;m -->](x.png) build behind the W10 provider.",
  reading: {
    pieces: ["OWNER DECISION (2026-10-29): Pi will embed the ", { first: "", other: "" }, " build behind the W10 provider."],
    records: ['image alt "<!-- wasm -->"'],
    extras: ["x.png"],
  },
};
const HEX_CODE_SPAN: Probe = {
  id: "hexCodeSpan",
  text: "Pi embeds a ![`wa&#x73;m`](x.png) runtime.",
  reading: { pieces: ["Pi embeds a ", { first: "wa&#x73;m", other: "" }, " runtime."], records: ['image alt "wasm"'], extras: ["x.png"] },
};
const BARE_TAG: Probe = {
  id: "bareTag",
  text: "Pi embeds a ![<wasm>](x.png) runtime.",
  reading: { pieces: ["Pi embeds a ", { first: "", other: "" }, " runtime."], records: ['image alt "<wasm>"'], extras: ["x.png"] },
};
const BOLD_REFERENCE: Probe = {
  id: "boldReference",
  text: "Pi embeds a ![<b>wa&#115;m</b>](x.png) runtime.",
  reading: { pieces: ["Pi embeds a ", { first: "wasm", other: "" }, " runtime."], records: ['image alt "<b>wasm</b>"'], extras: ["x.png"] },
};
const END_TAG: Probe = {
  id: "endTag",
  text: "Pi embeds a ![wa</b>sm](x.png) runtime.",
  reading: { pieces: ["Pi embeds a ", { first: "wasm", other: "" }, " runtime."], records: ['image alt "wa</b>sm"'], extras: ["x.png"] },
};

const PINS: readonly Pin[] = [
  { id: "GP9-L2-12", cite: "GP9-L2-12 SPACED-TRIM", probes: [TRIM_BACKSLASH, TRIM_SPACES, TRIM_DECISION] },
  { id: "GP9-L2-03", cite: "GP9-L2-03 DEDUP-CHILDREN", probes: [DEDUP_CHILDREN] },
  { id: "GP9-L2-06", cite: "GP9-L2-06 ELEMENT-RECORDS-DROPPED", probes: [ELEMENT_RECORD] },
  { id: "GP9-L2-21", cite: "GP9-L2-21: a raw-state record in an alt is dropped when the written alt holds a found reference", probes: [RAW_BESIDE_REFERENCE] },
  { id: "GP9-L2-22", cite: "GP9-L2-22: a nested image's alt record is dropped when the outer written alt holds a found reference", probes: [NESTED_BESIDE_REFERENCE] },
  { id: "GP23-L2-01", cite: "GP23-L2-01 COMMENT-STRIPPED-COMPARE", probes: [COMMENT_ALT, COMMENT_DECISION] },
  { id: "GP23-L2-06", cite: "GP23-L2-06 HEX-WRITTEN-UNDECODED", probes: [HEX_CODE_SPAN] },
  { id: "GP23-L2-02", cite: "GP23-L2-02 BARE-TAG-STRIPPED-COMPARE", probes: [BARE_TAG, BOLD_REFERENCE, END_TAG] },
  { id: "GP23-L2-03", cite: "GP23-L2-03 END-TAG-STRIPPED-COMPARE", probes: [END_TAG] },
];
/** PINS is frozen at load, with every entry, probe list, probe and reading it holds, so a write into any of them throws (wb-wzin). */
deepFreeze(PINS);

const ROWS: readonly Row[] = [
  {
    id: "R3-U1",
    refusal: 3,
    unmet: "U1-MEDIUM-RESPIN-RULE16-LEG2-R514-R515-R668-R739-RB93-THE-ALT-READ-COMPARISON-WIDER-THAN-PINS-END-OF-ALT-WHITE-SPACE-RUN-UNPINNED-GP9-L2-12-SPACED-TRIM-31-OF-31-FAIL-OPEN-REAL-TREE-WITNESS-D1-RED-2-QUIET-UNDER-MEMBER",
    pins: ["GP9-L2-12"],
  },
  {
    id: "R3-U2",
    refusal: 3,
    unmet: "U2-LOW-RESPIN-RULE16-LEG2-R514-R515-CHILDREN-READING-RECORDS-WIDER-THAN-PINS-GP9-L2-03-DEDUP-L2-06-ELEMENT-RECORDS-DROPPED-L2-21-L2-22-31-OF-31-RECORD-CONTENT-ONLY",
    pins: ["GP9-L2-03", "GP9-L2-06", "GP9-L2-21", "GP9-L2-22"],
  },
  {
    id: "R4-U1",
    refusal: 4,
    unmet: "U1-MEDIUM-FAIL-OPEN-RULE16-LEG2-R514-R515-R668-R739-RB93-THE-ALT-READ-COMPARISON-INLINE-HTML-MARKUP-CLASS-WORDS-NO-COMMENT-PIN-GP23-L2-01-COMMENT-STRIPPED-COMPARE-31-OF-31-REAL-TREE-WITNESS-ZZ-GP23-W-COMMENT-D1-RED-2-QUIET-UNDER-MEMBER",
    pins: ["GP23-L2-01"],
  },
  {
    id: "R4-U2",
    refusal: 4,
    unmet: "U2-MEDIUM-FAIL-OPEN-RULE16-LEG2-R514-R515-R668-R739-RB93-THE-ALT-READ-WRITTEN-ALT-REFERENCE-DECODE-HEX-FORM-UNPINNED-CODE-SPAN-REFERENCE-DECIMAL-PIN-ONLY-GP23-L2-06-HEX-WRITTEN-UNDECODED-31-OF-31-REAL-TREE-WITNESS-ZZ-GP23-W-HEX-D1-RED-2-QUIET-UNDER-MEMBER",
    pins: ["GP23-L2-06"],
  },
  {
    id: "R4-U3",
    refusal: 4,
    unmet: "U3-LOW-RECORD-CONTENT-ONLY-RULE16-LEG2-R514-R515-THE-ALT-READ-INLINE-HTML-MARKUP-RECORDS-GP23-L2-02-BARE-TAG-STRIPPED-L2-03-END-TAG-STRIPPED-31-OF-31-NO-FAIL-OPEN-RIDES-U1",
    pins: ["GP23-L2-02", "GP23-L2-03"],
  },
];

function pinOf(id: string): Pin {
  const pin = PINS.find(candidate => candidate.id === id);
  if (pin === undefined) throw new Error(`${id}: no such pin`);
  return pin;
}
function rowOf(id: string): Row {
  const row = ROWS.find(candidate => candidate.id === id);
  if (row === undefined) throw new Error(`${id}: no such row`);
  return row;
}
/** A row's probes, in the order its pins first hold them. */
function rowProbes(row: Row): Probe[] {
  const probes: Probe[] = [];
  for (const id of row.pins) for (const probe of pinOf(id).probes) if (!probes.includes(probe)) probes.push(probe);
  return probes;
}
/** The descriptions and notes of the named beads, read from their rows in the tracked tracker export. */
function exportRows(...beads: string[]): Map<string, ExportRow> {
  const rows = new Map<string, ExportRow>();
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (!beads.some(id => line.includes(`"id":"${id}"`))) continue;
    const value: unknown = JSON.parse(line);
    if (typeof value !== "object" || value === null || !("id" in value) || typeof value.id !== "string" || !beads.includes(value.id)) continue;
    const description = "description" in value && typeof value.description === "string" ? value.description : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    rows.set(value.id, { description, notes });
  }
  for (const bead of beads) if (!rows.has(bead)) throw new Error(`${bead}: no row in ${EXPORT}`);
  return rows;
}
/** The text from the first occurrence of open up to the first occurrence of close after it; its reading of a text that lacks
 * open or close is NOT CLAIMED by this census. */
function sectionOf(text: string, open: string, close: string): string {
  const start = text.indexOf(open);
  if (start < 0) return "";
  const end = text.indexOf(close, start + open.length);
  return end < 0 ? text.slice(start) : text.slice(start, end);
}
/** The member ids an unmet item names, in order (claimed on the five rows' items, each naming one "GP<n>" family). */
function memberIds(unmet: string): string[] {
  let family = "";
  return [...unmet.matchAll(MEMBER_ID)].map(match => {
    family = match[1] ?? family;
    return `${family}-L2-${match[2] ?? ""}`;
  });
}
/** A witness quote decoded from its record's notation. */
function decoded(quote: string): string {
  return NOTATION.reduce((text, [written, meant]) => text.split(written).join(meant), quote);
}

/** wb-gmj9's and wb-nnm7's rows from the tracked tracker export. */
function anchorRows(): AnchorRows {
  const rows = exportRows("wb-gmj9", "wb-nnm7");
  const child = rows.get("wb-gmj9");
  const parent = rows.get("wb-nnm7");
  if (child === undefined || parent === undefined) throw new Error("the export rows are read");
  return { child, parent };
}
/** The message of the first check run fails, up to vitest's ": expected ..." detail; empty when every check holds. */
function failureOf(run: () => void): string {
  try {
    run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const detail = message.indexOf(": expected ");
    return detail < 0 ? message : message.slice(0, detail);
  }
  return "";
}

/** The messages of holdAnchor's checks (READERS holds each plant to one of them). */
const LIST_CHECK = "LIST: the JSON list wb-gmj9's description holds after 'Unmet items verbatim: ' against the refusal #3 rows' unmet items";
const FOLD_CHECK = "FOLD: the member lines of the R-B259 fold in wb-gmj9's notes against the refusal #4 rows' unmet items";
function pinsCheck(row: Row): string {
  return `${row.id}: its pins against the member ids its unmet item names`;
}
/** The one-item check's message, as holdAnchor writes it inline. */
function countCheck(row: Row): string {
  const opening = row.refusal === 3 ? `- ${row.unmet.split("-")[0] ?? ""} (` : `- [${row.unmet}] `;
  return `${row.id}: wb-nnm7's refusal #${row.refusal} record holds one UNMET item opening '${opening}'`;
}
/** The id check's message: the row's id against its refusal and the word the UNMET item ANCHOR found for it opens with. */
function idCheck(row: Row): string {
  return `${row.id}: its id against its refusal and the word its UNMET item opens with`;
}
function citeCheck(row: Row, pin: Pin): string {
  return `${row.id}: the item names ${pin.id} by its cite '${pin.cite}'`;
}
function witnessCheck(row: Row): string {
  return `${row.id}: the witnesses the item quotes against the row's probes' texts`;
}
/** REACH's message: the pins and rows holdAnchor's two loops reached, against ROWS (wb-ceq3). */
const REACH_CHECK = "REACH: holdAnchor's loops reach each row's pins in order and then the row, for every row of ROWS in order";
/** RETURN's message: the record holdAnchor returns, which ANCHOR and READERS hold against ROWS once it returns (wb-wzin). */
const RETURN_CHECK = "RETURN: holdAnchor returns its loops' record of each row's pins in order and then the row, for every row of ROWS in order";
/** The record holdAnchor's loops make on rows over which every check holds: each row's pins in order and then the row, row by row. */
function reachedOf(rows: readonly Row[]): string[] {
  return rows.flatMap(row => [...row.pins.map(id => `${row.id} ${id}`), row.id]);
}

/** text with its one occurrence of old replaced; a plant refuses a text holding old more than once or not at all. */
function replacedOnce(text: string, old: string, replacement: string): string {
  const at = text.indexOf(old);
  if (at < 0 || text.indexOf(old, at + 1) >= 0) throw new Error(`plant: ${JSON.stringify(old)} is not held exactly once`);
  return `${text.slice(0, at)}${replacement}${text.slice(at + old.length)}`;
}
/** items with the two at first and second swapped. */
function swapped(items: readonly string[], first: number, second: number): string[] {
  const one = items[first];
  const other = items[second];
  if (one === undefined || other === undefined) throw new Error("plant: nothing to swap");
  const copy = [...items];
  copy[first] = other;
  copy[second] = one;
  return copy;
}
function isStrings(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}
/** The rows with the JSON list after UNMET_LIST in the child's description rewritten. */
function listEdited(rows: AnchorRows, edit: (items: string[]) => string[]): AnchorRows {
  const text = rows.child.description;
  const start = text.indexOf(UNMET_LIST);
  const end = text.indexOf("]\n", start);
  if (start < 0 || end < 0) throw new Error("plant: no unmet list in the child's description");
  const items: unknown = JSON.parse(text.slice(start + UNMET_LIST.length, end + 1));
  if (!isStrings(items)) throw new Error("plant: the unmet list is not a list of texts");
  const description = `${text.slice(0, start + UNMET_LIST.length)}${JSON.stringify(edit(items))}${text.slice(end + 1)}`;
  return { ...rows, child: { ...rows.child, description } };
}
/** The rows with the member lines of the R-B259 fold in the child's notes rewritten. */
function foldEdited(rows: AnchorRows, edit: (lines: string[]) => string[]): AnchorRows {
  const text = rows.child.notes;
  const start = text.indexOf(FOLD_OPEN);
  const end = text.indexOf(FOLD_CLOSE, start);
  if (start < 0 || end < 0) throw new Error("plant: no R-B259 fold in the child's notes");
  const lines = text.slice(start + FOLD_OPEN.length, end).split("\n");
  const notes = `${text.slice(0, start + FOLD_OPEN.length)}${edit(lines).join("\n")}${text.slice(end)}`;
  return { ...rows, child: { ...rows.child, notes } };
}
/** The rows with the one line opening `opening` in the UNMET section of the parent's first refusal #<refusal> record rewritten. */
function itemEdited(rows: AnchorRows, refusal: 3 | 4, opening: string, edit: (line: string) => string): AnchorRows {
  const text = rows.parent.notes;
  const record = text.indexOf(RECORD_OPENS[refusal]);
  const end = text.indexOf(RECORD_END, record);
  const section = text.indexOf(UNMET_OPEN, record);
  const close = text.indexOf(UNMET_CLOSE, section);
  const start = text.indexOf(`\n${opening}`, section) + 1;
  const later = text.indexOf(`\n${opening}`, start);
  if (record < 0 || section < 0 || close < section || end < close || start < 1 || start > close || (later >= 0 && later < close)) {
    throw new Error(`plant: no one line opening '${opening}' in refusal #${refusal}'s UNMET section`);
  }
  const stop = text.indexOf("\n", start);
  const notes = `${text.slice(0, start)}${edit(text.slice(start, stop))}${text.slice(stop)}`;
  return { ...rows, parent: { ...rows.parent, notes } };
}
/** line with its first and second quotes, each held once and in that order, swapped. */
function quotesSwapped(line: string, first: string, second: string): string {
  const one = line.indexOf(first);
  const other = line.indexOf(second);
  if (one < 0 || other < one + first.length || line.indexOf(first, one + 1) >= 0 || line.indexOf(second, other + 1) >= 0) {
    throw new Error("plant: the two quotes are not held once each, in order");
  }
  return `${line.slice(0, one)}${second}${line.slice(one + first.length, other)}${first}${line.slice(other + second.length)}`;
}

/** wb-gmj9's row with the one occurrence of old inside the UNMET section of its first refusal #1 record replaced; a copy refuses
 * a section holding old more than once or not at all. */
function plantItemsEdited(child: ExportRow, old: string, replacement: string): ExportRow {
  const text = child.notes;
  const record = text.indexOf(PLANT_RECORD_OPEN);
  const end = text.indexOf(RECORD_END, record);
  const section = text.indexOf(UNMET_OPEN, record);
  const close = text.indexOf(UNMET_CLOSE, section);
  const at = text.indexOf(old, section);
  const later = text.indexOf(old, at + 1);
  if (record < 0 || section < 0 || close < section || end < close || at < 0 || at + old.length > close || (later >= 0 && later < close)) {
    throw new Error(`copy: ${JSON.stringify(old)} is not held once in refusal #1's UNMET section`);
  }
  return { ...child, notes: `${text.slice(0, at)}${replacement}${text.slice(at + old.length)}` };
}

/** Refusal #3's U1 item's first two witness quotes, as its record writes them. */
const QUOTE_BACKSLASH = "'Pi embeds wa![<backslash><line feed>sm](x.png) runtime.'";
const QUOTE_SPACES = "'Pi embeds wa![<two spaces><line feed>sm](x.png) runtime.'";
const R3_U1_OPENING = "- U1 (";
/** Refusal #1's twelve paired witnesses, each as its gate's tool wrote the edit, in the order refusal #1's UNMET items name them. */
const PLANTS: readonly Plant[] = [
  { id: "W01", plant: rows => listEdited(rows, items => swapped(items, 0, 1)) },
  { id: "W02", plant: rows => listEdited(rows, items => [...items, "U3-LOW-GP23-GATE-WITNESS-EXTRA-UNMET-ITEM"]) },
  { id: "W03", plant: rows => foldEdited(rows, lines => swapped(lines, 0, 1)) },
  { id: "W04", plant: rows => foldEdited(rows, lines => [...lines, "U4-LOW-GP23-GATE-WITNESS-EXTRA-FOLD-MEMBER-LINE"]) },
  { id: "W08", plant: rows => itemEdited(rows, 3, R3_U1_OPENING, line => quotesSwapped(line, QUOTE_BACKSLASH, QUOTE_SPACES)) },
  { id: "W09", plant: rows => itemEdited(rows, 3, R3_U1_OPENING, line => `${line} GP23 gate witness 'Pi embeds wa![gp23](x.png) runtime.'`) },
  {
    id: "W05",
    plant: rows =>
      itemEdited(rows, 3, R3_U1_OPENING, line => `${line}\n- U1 (GP23 GATE WITNESS: a second UNMET line opening the U1 item's opening)`),
  },
  { id: "W06", plant: rows => itemEdited(rows, 3, R3_U1_OPENING, line => replacedOnce(line, " GP9-L2-12 SPACED-TRIM:", " GP9-L2-12 SPACED-TRIM;")) },
  {
    id: "W07",
    plant: rows => itemEdited(rows, 3, R3_U1_OPENING, line => replacedOnce(line, "MEMBER GP9-L2-12 SPACED-TRIM:", "MEMBER:GP9-L2-12 SPACED-TRIM:")),
  },
  {
    id: "W10",
    plant: rows => {
      const text = rows.parent.notes;
      const record = text.indexOf(RECORD_OPENS[3]);
      const end = text.indexOf(RECORD_END, record);
      if (record < 0 || end < 0) throw new Error("plant: no refusal #3 record");
      const broken = itemEdited(rows, 3, R3_U1_OPENING, line => `- U9 (${line.slice(R3_U1_OPENING.length)}`);
      return { ...broken, parent: { ...broken.parent, notes: `${broken.parent.notes}\n${text.slice(record, end + RECORD_END.length)}` } };
    },
  },
  {
    id: "W11",
    plant: rows => {
      const opening = `- [${rowOf("R4-U1").unmet}] `;
      return itemEdited(rows, 4, opening, line => `${opening.trimEnd()}${line.slice(opening.length)}`);
    },
  },
  { id: "W12", plant: rows => itemEdited(rows, 3, R3_U1_OPENING, line => `- U1: (${line.slice(R3_U1_OPENING.length)}`) },
];

/** Check (5)'s message (IDS holds each copy to it). */
const PLANT_IDS_CHECK = "the W ids wb-gmj9's refusal #1 UNMET items name against the plants' ids";
interface PlantIdEdit {
  /** The copy's id. */
  readonly id: string;
  /** wb-gmj9's row with the copy's one edit inside its refusal #1 record's UNMET section. */
  readonly edit: (child: ExportRow) => ExportRow;
}
/** The W ids refusal #1's U2 item names around W06, as its record writes them (held once in its UNMET section). */
const W06_W07 = "-W06-W07-";
/** IDS's four copies of wb-gmj9's row, each one edit of the W ids refusal #1's UNMET items name. */
const PLANT_ID_EDITS: readonly PlantIdEdit[] = [
  { id: "C5-DROPPED", edit: child => plantItemsEdited(child, W06_W07, "-W07-") },
  { id: "C5-ADDED", edit: child => plantItemsEdited(child, "-W11-W12.", "-W11-W12-W13.") },
  { id: "C5-TWICE", edit: child => plantItemsEdited(child, W06_W07, "-W06-W06-W07-") },
  { id: "C5-SWAPPED", edit: child => plantItemsEdited(child, W06_W07, "-W07-W06-") },
];

describe("wb-gmj9 alt-read census (test/helpers/urr-alt-read.ts): nine pin cases holding their PINS entries' probe ids, the PINS entries themselves, literal inlineRendered() readings of the record-quoted witness probes their wb-nnm7 gate members change and altRead's record of each case (READ), SHAPE with PINS frozen at load, ANCHOR over the tracker export as it stands with REACH over every row and pin and RETURN over the record holdAnchor returns, READERS holding the first failed ANCHOR check on each of refusal #1's twelve witness plants, and IDS holding ANCHOR's W-id check exact on four in-memory copies of wb-gmj9's row", () => {
  /** ANCHOR's checks over the two export rows (claims (3)-(4) of its case in the header); a failed check throws its message. It
   * returns its loops' record, which ANCHOR and READERS hold against ROWS once it returns (RETURN, wb-wzin). */
  function holdAnchor(child: ExportRow, parent: ExportRow): string[] {
    const listed = sectionOf(child.description, UNMET_LIST, "]\n").slice(UNMET_LIST.length);
    const described: unknown = JSON.parse(`${listed}]`);
    expect(described, LIST_CHECK).toEqual(ROWS.filter(row => row.refusal === 3).map(row => row.unmet));
    const folded = sectionOf(child.notes, FOLD_OPEN, FOLD_CLOSE).slice(FOLD_OPEN.length).split("\n");
    expect(folded, FOLD_CHECK).toEqual(ROWS.filter(row => row.refusal === 4).map(row => row.unmet));
    /** Each pin as its cite check passes ("<row id> <pin id>"), then the row as its witness check passes. */
    const reached: string[] = [];
    for (const row of ROWS) {
      expect(row.pins, pinsCheck(row)).toEqual(memberIds(row.unmet));
      const record = sectionOf(parent.notes, RECORD_OPENS[row.refusal], RECORD_END);
      const unmet = sectionOf(record, UNMET_OPEN, UNMET_CLOSE);
      const opening = row.refusal === 3 ? `- ${row.unmet.split("-")[0] ?? ""} (` : `- [${row.unmet}] `;
      const items = unmet.split("\n").filter(line => line.startsWith(opening));
      expect(items.length, `${row.id}: wb-nnm7's refusal #${row.refusal} record holds one UNMET item opening '${opening}'`).toBe(1);
      const item = items[0] ?? "";
      const word = row.refusal === 3 ? item.slice(2, item.indexOf(" (")) : item.slice(3, item.indexOf("-", 3));
      expect(row.id, idCheck(row)).toBe(`R${row.refusal}-${word}`);
      for (const id of row.pins) {
        const pin = pinOf(id);
        expect(pin.cite.startsWith(`${pin.id} `) || pin.cite.startsWith(`${pin.id}: `), `${pin.id}: its cite opens with its id`).toBe(true);
        expect(
          CITE_ENDS.some(end => item.includes(` ${pin.cite}${end}`)),
          citeCheck(row, pin),
        ).toBe(true);
        reached.push(`${row.id} ${pin.id}`);
      }
      expect(
        [...item.matchAll(WITNESS_QUOTE)].map(match => decoded(match[1] ?? "")),
        witnessCheck(row),
      ).toEqual(rowProbes(row).map(probe => probe.text));
      reached.push(row.id);
    }
    expect(reached, REACH_CHECK).toEqual(ROWS.flatMap(row => [...row.pins.map(id => `${row.id} ${id}`), row.id]));
    return reached;
  }
  /** Check (5) of ANCHOR's case in the header, over wb-gmj9's row (IDS runs it on four copies too); a failed check throws its message. */
  function holdPlantIds(child: ExportRow): void {
    const plantRecord = sectionOf(child.notes, PLANT_RECORD_OPEN, RECORD_END);
    const plantItems = sectionOf(plantRecord, UNMET_OPEN, UNMET_CLOSE)
      .split("\n")
      .filter(line => PLANT_ITEM.test(line));
    expect(
      plantItems.flatMap(line => [...line.matchAll(WITNESS_ID)].map(match => match[1] ?? "")),
      "the W ids wb-gmj9's refusal #1 UNMET items name against the plants' ids",
    ).toEqual(PLANTS.map(plant => plant.id));
  }

  it("SHAPE: the rows, their pins, each pin's probe ids and the plants' ids stay frozen", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["R3-U1:1", "R3-U2:4", "R4-U1:1", "R4-U2:1", "R4-U3:2"]);
    expect(PINS.map(pin => `${pin.id}:${pin.probes.map(probe => probe.id).join(",")}`)).toEqual([
      "GP9-L2-12:trimBackslash,trimSpaces,trimDecision",
      "GP9-L2-03:dedupChildren",
      "GP9-L2-06:elementRecord",
      "GP9-L2-21:rawBesideReference",
      "GP9-L2-22:nestedBesideReference",
      "GP23-L2-01:commentAlt,commentDecision",
      "GP23-L2-06:hexCodeSpan",
      "GP23-L2-02:bareTag,boldReference,endTag",
      "GP23-L2-03:endTag",
    ]);
    expect(ROWS.flatMap(row => row.pins), "the rows hold every pin once, in pin order").toEqual(PINS.map(pin => pin.id));
    expect(deepFrozen(PINS), "PINS is frozen at load, with every entry, probe list, probe and reading it holds").toBe(true);
    expect(
      ROWS.map(row => row.id),
      "each row's id is its refusal and its unmet item's first word",
    ).toEqual(ROWS.map(row => `R${row.refusal}-${row.unmet.split("-")[0] ?? ""}`));
    expect(PLANTS.map(plant => plant.id), "the plants, in the order refusal #1's UNMET items name them").toEqual([
      "W01",
      "W02",
      "W03",
      "W04",
      "W08",
      "W09",
      "W05",
      "W06",
      "W07",
      "W10",
      "W11",
      "W12",
    ]);
    expect(
      PLANT_ID_EDITS.map(edit => edit.id),
      "IDS's copies of wb-gmj9's row",
    ).toEqual(["C5-DROPPED", "C5-ADDED", "C5-TWICE", "C5-SWAPPED"]);
  });

  it("ANCHOR: on the tracker export as it stands, holdAnchor's checks hold over wb-gmj9's and wb-nnm7's rows, and wb-gmj9's refusal #1 UNMET items name the plants' W ids", () => {
    const { child, parent } = anchorRows();
    expect(holdAnchor(child, parent), RETURN_CHECK).toEqual(reachedOf(ROWS));
    holdPlantIds(child);
  });

  it("READERS: on the unedited rows no ANCHOR check fails, and on each of refusal #1's twelve plants the first ANCHOR check that fails is the one pinned here", () => {
    const real = anchorRows();
    const firstFailure = (rows: () => AnchorRows): string =>
      failureOf(() => {
        const { child, parent } = rows();
        expect(holdAnchor(child, parent), RETURN_CHECK).toEqual(reachedOf(ROWS));
      });
    const r3u1 = rowOf("R3-U1");
    const spaced = pinOf("GP9-L2-12");
    expect(
      [["unedited", firstFailure(() => real)], ...PLANTS.map(plant => [plant.id, firstFailure(() => plant.plant(real))])],
      "each plant's first failed ANCHOR check",
    ).toEqual([
      ["unedited", ""],
      ["W01", LIST_CHECK],
      ["W02", LIST_CHECK],
      ["W03", FOLD_CHECK],
      ["W04", FOLD_CHECK],
      ["W08", witnessCheck(r3u1)],
      ["W09", witnessCheck(r3u1)],
      ["W05", countCheck(r3u1)],
      ["W06", citeCheck(r3u1, spaced)],
      ["W07", citeCheck(r3u1, spaced)],
      ["W10", countCheck(r3u1)],
      ["W11", countCheck(rowOf("R4-U1"))],
      ["W12", countCheck(r3u1)],
    ]);
  });

  it("IDS: check (5) holds on wb-gmj9's row as it stands and fails on each of four in-memory copies whose refusal #1 UNMET items name W06 dropped, W13 added, W06 twice, or W06 and W07 swapped", () => {
    const { child } = anchorRows();
    expect(
      [["unedited", failureOf(() => holdPlantIds(child))], ...PLANT_ID_EDITS.map(edit => [edit.id, failureOf(() => holdPlantIds(edit.edit(child)))])],
      "check (5)'s first failure on the unedited row and on each copy",
    ).toEqual([
      ["unedited", ""],
      ["C5-DROPPED", PLANT_IDS_CHECK],
      ["C5-ADDED", PLANT_IDS_CHECK],
      ["C5-TWICE", PLANT_IDS_CHECK],
      ["C5-SWAPPED", PLANT_IDS_CHECK],
    ]);
  });

  for (const pin of PINS) {
    it(pin.cite, () => {
      expect.assertions(4);
      const read = READ_LOG.length;
      expect(
        pin.probes.map(probe => probe.id),
        `${pin.id}: the case reads the probe ids of the PINS entry its id names`,
      ).toEqual(pinOf(pin.id).probes.map(probe => probe.id));
      expect(pin, `${pin.id}: the case's loop entry is the PINS entry its id names, the one object`).toBe(pinOf(pin.id));
      expect(
        pin.probes.map(probe => ({ id: probe.id, reading: altRead(probe.text) })),
        `${pin.id}: inlineRendered() reads each of its probes exactly as written here`,
      ).toEqual(pin.probes.map(probe => ({ id: probe.id, reading: probe.reading })));
      expect(
        READ_LOG.slice(read),
        `${pin.id}: altRead read the texts of the PINS entry its id names, in order, and returned their literal readings`,
      ).toEqual(pinOf(pin.id).probes.map(probe => ({ text: probe.text, reading: probe.reading })));
    });
  }
});
