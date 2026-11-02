/**
 * wb-gmj9 alt-read census (the rule-19 structural-exit child of wb-nnm7: ruling R-B229 filed it at wb-nnm7's refusal #3 carrying
 * that refusal's two unmet items, and ruling R-B259, the dependency inversion at refusal #4, folded refusal #4's three unmet items
 * into it). SUBJECT: inlineRendered() of test/helpers/urr-alt-read.ts - the inline reader of the portable Fiber core gate census's
 * rendered leg, THE ALT READ's image branch among its lines - moved byte for byte from wb-nnm7's FINAL cut #4 (tip 7284444e). The
 * parent's census and roster at that tip are not on trunk and are neither added nor edited here; trunk's
 * test/workbench-urr-core-gate-census.test.ts keeps its own rendered leg and is not read by this census. The parent stays parked
 * until this lands, and its later re-cut can import the helper.
 *
 * PINNED READER SET (this file, test/workbench-urr-alt-read-census.test.ts; observed at the cut: every case passes on the moved
 * reader, and each named member, applied to a copy of the helper with its refusal gate's own edit, reds the pin case named after
 * it). Each pin case is named by its member's cite (the words with which the member's refusal record names it) and asserts, for
 * every probe it holds, that the reader returns exactly the literal reading written here: inlineRendered() over the inline tokens of
 * the probe's one paragraph (marked's lexer, 18.0.11 at the cut), as its pieces, the records it collects and the extras it collects,
 * in one toEqual. A probe's text is a witness that its row's UNMET item quotes, decoded from the record's notation (<backslash>,
 * <line feed>, <two spaces>).
 * - Row R3-U1 (wb-nnm7 refusal #3's U1): pin GP9-L2-12 SPACED-TRIM over trimBackslash, trimSpaces and trimDecision, each a hard
 *   break opening an image's alt (a backslash one, a two-space one, and the backslash one in a decision text), each read with the
 *   image piece "\nsm" in place and the one record image alt "sm".
 * - Row R3-U2 (refusal #3's U2): pin GP9-L2-03 DEDUP-CHILDREN over dedupChildren (an alt whose text token holds &sopf; twice, read
 *   with the two records &sopf; and &sopf;); pin GP9-L2-06 ELEMENT-RECORDS-DROPPED over elementRecord (a marquee start tag in an alt,
 *   read with the records <marquee> and image alt "wa<marquee>sm"); pin GP9-L2-21 over rawBesideReference (an image inside a code
 *   element whose alt holds a code span's &sopf; and a raw-state text token, read with the records raw-state text "x" and &sopf;);
 *   pin GP9-L2-22 over nestedBesideReference (an image inside an image's alt beside a code span's &sopf;, read with the records image
 *   alt "wasm" and &sopf;).
 * - Row R4-U1 (refusal #4's U1): pin GP23-L2-01 COMMENT-STRIPPED-COMPARE over commentAlt and commentDecision (an alt holding only an
 *   HTML comment, in a sentence and in a decision text), each read with the empty image piece and the one record image alt
 *   "<!-- wasm -->".
 * - Row R4-U2 (refusal #4's U2): pin GP23-L2-06 HEX-WRITTEN-UNDECODED over hexCodeSpan (an alt holding only a code span whose
 *   reference is hexadecimal), read with the image piece "wa&#x73;m" and the one record image alt "wasm".
 * - Row R4-U3 (refusal #4's U3): pin GP23-L2-02 BARE-TAG-STRIPPED-COMPARE over bareTag, boldReference and endTag, and pin
 *   GP23-L2-03 END-TAG-STRIPPED-COMPARE over endTag (an alt holding only the tag <wasm>; one holding a b element around a decimal
 *   reference; one holding an end tag between two letters), each read with its one image alt record.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its probe ids and the rows'
 *   pins in pin order, each held to a literal, and each row's id spelled from its refusal and its unmet item's first word.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped as the
 *   expectation): (1) the unmet items wb-gmj9's description lists ('Unmet items verbatim: ' and a JSON list) are exactly the refusal
 *   #3 rows' unmet items, in order, and the member lines of the R-B259 fold in wb-gmj9's notes exactly the refusal #4 rows'; (2) each
 *   row's pins are exactly the member ids its unmet item names, in order (an "L2-<n>" with no "GP<n>-" before it takes the last one
 *   the item named); (3) in wb-nnm7's notes, each row's UNMET item in its refusal record (refusal #3's record from its verdict naming
 *   tip 2e5daa8f, refusal #4's from its verdict naming tip 7284444e, each up to its BIND STEPS line; the item is the line that opens
 *   "- U<n> (" in refusal #3's UNMET section and "- [<the row's unmet item>] " in refusal #4's) names each of the row's pins by its
 *   cite, after a space and before ":", ",", " (" or ".", each cite opening with its pin's id; (4) the witnesses that item quotes
 *   (each single-quoted text holding "](x.png)"), decoded, are exactly the row's probes' texts, in the order the row's pins first
 *   hold them.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe the reader returns exactly the literal reading written here: a reader edit that
 * changes one reading reds that pin case. (2) Each named member changes the reading of every probe of its own pin: the cutting seat
 * applied each member's own edit (its refusal gate's archived find and replace, verbatim, over a copy of the helper), read the pin
 * case named after it red and read each of that pin's probes changed; a pin whose probes stopped holding its form would read green
 * there. (3) The rows with their unmet items, each row's pins, each pin's cite and each row's probe texts are held to the tracker
 * export: a row or a pin removed or added, a row's unmet item changed, a pin's cite shortened, or a probe removed, added, moved to
 * another row or given another text - in one literal or in every literal together - reds SHAPE or ANCHOR (standing rule 16's
 * CT1-CT6).
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them a white space run
 * at an alt's close, a hard break opening an emphasis, a link or an image inside the alt, any other inline html markup in an alt (a
 * comment beside text, a processing instruction, a CDATA section, a tag with attributes), a reference a code span writes in decimal
 * or in uppercase hexadecimal, any reference an escape writes, three or more records in one alt, and every other arrangement of the
 * image's children's records. Whether a reading is what a reader is shown is NOT CLAIMED by this census: no renderer runs here
 * beyond the reader's own call to marked's Parser and TextRenderer. A pin's cite lengthened to words its record holds before one of
 * the four ends is NOT CLAIMED by this census. A probe's id is this file's own name: one renamed in every literal together is NOT
 * CLAIMED by this census, nor which pin of its row holds a probe, changed in every literal together (the member replay is what shows
 * each pin's probes red its member). A reader edit made together with the literal readings it changes is NOT CLAIMED by this
 * census. Gate members of wb-nnm7's refusals #3 and #4 other than the nine pinned are no pin (the seat replayed GP9-L2-01, -02, -04,
 * -05, -10 and -18 and GP23-L2-04, -05, -07, -08, -09 and -10 from the gates' archived definitions), and whether this census reds any
 * of them is NOT CLAIMED. The parent census's own header, cases and roster are NOT CLAIMED by this census. No residual is claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated; the tracker export is only read; no src, docs or receipt is
 * edited.
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
/** A member id an unmet item names: "GP<n>-L2-<n>", or "L2-<n>" taking the last "GP<n>" named before it. */
const MEMBER_ID = /(?:^|-)(?:(GP\d+)-)?L2-(\d+)(?=-|$)/g;

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

/** inlineRendered() over the inline tokens of a text's one paragraph. */
function altRead(text: string): Reading {
  const blocks = marked.lexer(text).filter(token => token.type !== "space");
  const paragraph = blocks[0];
  if (blocks.length !== 1 || paragraph === undefined || paragraph.type !== "paragraph") throw new Error(`${JSON.stringify(text)}: not one paragraph`);
  const records: string[] = [];
  const extras: string[] = [];
  const pieces = inlineRendered((paragraph as Tokens.Paragraph).tokens, records, extras);
  return { pieces, records, extras };
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
/** A row's probes, in the order its pins first hold them. */
function rowProbes(row: Row): Probe[] {
  const probes: Probe[] = [];
  for (const id of row.pins) for (const probe of pinOf(id).probes) if (!probes.includes(probe)) probes.push(probe);
  return probes;
}
/** The descriptions and notes of the named beads, read from their rows in the tracked tracker export. */
function exportRows(...beads: string[]): Map<string, { readonly description: string; readonly notes: string }> {
  const rows = new Map<string, { readonly description: string; readonly notes: string }>();
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
/** The text from the first occurrence of open up to the first occurrence of close after it (to the end when close is absent;
 * empty when open is absent). */
function sectionOf(text: string, open: string, close: string): string {
  const start = text.indexOf(open);
  if (start < 0) return "";
  const end = text.indexOf(close, start + open.length);
  return end < 0 ? text.slice(start) : text.slice(start, end);
}
/** The member ids an unmet item names, in order. */
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

describe("wb-gmj9 alt-read census (test/helpers/urr-alt-read.ts): nine pin cases, each holding literal inlineRendered() readings of the record-quoted witness probes its named wb-nnm7 gate member changes, with SHAPE and ANCHOR", () => {
  it("SHAPE: the rows, their pins and each pin's probe ids stay frozen", () => {
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
    expect(
      ROWS.map(row => row.id),
      "each row's id is its refusal and its unmet item's first word",
    ).toEqual(ROWS.map(row => `R${row.refusal}-${row.unmet.split("-")[0] ?? ""}`));
  });

  it("ANCHOR: the rows' unmet items, their pins, the pins' cites and the rows' probe texts are the ones wb-gmj9's and wb-nnm7's tracker-export rows record", () => {
    const rows = exportRows("wb-gmj9", "wb-nnm7");
    const child = rows.get("wb-gmj9");
    const parent = rows.get("wb-nnm7");
    if (child === undefined || parent === undefined) throw new Error("the export rows are read");
    const listed = sectionOf(child.description, UNMET_LIST, "]\n").slice(UNMET_LIST.length);
    const described: unknown = JSON.parse(`${listed}]`);
    expect(described, "wb-gmj9's description lists exactly the refusal #3 rows' unmet items, in order").toEqual(
      ROWS.filter(row => row.refusal === 3).map(row => row.unmet),
    );
    const folded = sectionOf(child.notes, FOLD_OPEN, FOLD_CLOSE).slice(FOLD_OPEN.length).split("\n");
    expect(folded, "the R-B259 fold in wb-gmj9's notes holds exactly the refusal #4 rows' unmet items, in order").toEqual(
      ROWS.filter(row => row.refusal === 4).map(row => row.unmet),
    );
    for (const row of ROWS) {
      expect(row.pins, `${row.id}: its pins are the member ids its unmet item names, in order`).toEqual(memberIds(row.unmet));
      const record = sectionOf(parent.notes, RECORD_OPENS[row.refusal], RECORD_END);
      const unmet = sectionOf(record, UNMET_OPEN, UNMET_CLOSE);
      const opening = row.refusal === 3 ? `- ${row.unmet.split("-")[0] ?? ""} (` : `- [${row.unmet}] `;
      const items = unmet.split("\n").filter(line => line.startsWith(opening));
      expect(items.length, `${row.id}: wb-nnm7's refusal #${row.refusal} record holds one UNMET item opening '${opening}'`).toBe(1);
      const item = items[0] ?? "";
      for (const id of row.pins) {
        const pin = pinOf(id);
        expect(pin.cite.startsWith(`${pin.id} `) || pin.cite.startsWith(`${pin.id}: `), `${pin.id}: its cite opens with its id`).toBe(true);
        expect(
          CITE_ENDS.some(end => item.includes(` ${pin.cite}${end}`)),
          `${row.id}: the item names ${pin.id} by its cite '${pin.cite}'`,
        ).toBe(true);
      }
      expect(
        [...item.matchAll(WITNESS_QUOTE)].map(match => decoded(match[1] ?? "")),
        `${row.id}: the witnesses the item quotes are the row's probes' texts, in order`,
      ).toEqual(rowProbes(row).map(probe => probe.text));
    }
  });

  for (const pin of PINS) {
    it(pin.cite, () => {
      for (const probe of pin.probes) {
        expect(altRead(probe.text), `${pin.id} / ${probe.id}: inlineRendered() reads the probe exactly as written here`).toEqual(probe.reading);
      }
    });
  }
});
