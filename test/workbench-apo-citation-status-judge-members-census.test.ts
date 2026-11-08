/**
 * wb-021.11 APO citation-status judge members census (the rule-19 dependency-inversion child of wb-021.9: ruling R-B289 filed
 * it carrying wb-021.9's refusal #3 members, ruling R-B293 folded refusal #4's members into its notes). SUBJECT: the judge of
 * test/helpers/apo-citation-status-judge.ts - judgeFiles() and bindingOf() - whose code lines are copied byte for byte from
 * wb-021.9's FINAL cut #4 (tip 4334fecdaddbce1494c859d7d312a00d27c66b74; the helper's header lists the lines). The parent's
 * census at that tip (test/workbench-apo-citation-status-judge-census.test.ts) is not on trunk and is neither added nor edited
 * here; the parent stays parked until this lands, and its later re-cut can import the judge.
 *
 * PINNED READER SET (this file, test/workbench-apo-citation-status-judge-members-census.test.ts; observed at the cut: every
 * case passes on the moved judge, and each named member, applied as its gate's own edit to the helper (restored byte for byte
 * after each run), reds its pin case and its REPLAY case). A probe is one in-memory file - a path and a text, and for a BOUND
 * probe a BOUND list - judged alone by one judgeFiles call; nothing is written. Its reading is a literal list of lines in the
 * Judgement's order: 'kind <file kind> <count>' for each file kind it counts, 'units <n> strings <n>', 'cite <position> <key>'
 * per citing unit, 'banner <path>' per banner module and 'finding <finding>' per finding, then for a BOUND probe 'bind <entry>'
 * per entry bindingOf returns for its citing units and BOUND list. The probes are the gates' paired pages for these members
 * under the gates' own ids (gate-prep-15's plants for refusal #3, gate-prep-10's for refusal #4); the cutting seat planted each
 * text as the gate's archived plant reads.
 * - 14 pin cases, one per named member: each probe the pin lists reads exactly the lines written for it here (toEqual over the
 *   whole list). A pin lists the member's WITNESSES (the pages its refusal record names for it before the record's twin marker)
 *   and then its HELD pages (every page the record names for it after that marker: the gates' twins, paired controls and pages
 *   measured but not counted).
 * - 14 REPLAY cases, one per named member: the member's edit (its gate's find and replace, as copied from gate-prep-15's and
 *   gate-prep-10's member tables) occurs exactly once in the helper's source, and that source with the one edit applied,
 *   compiled by TypeScript's transpileModule and run in a fresh vm context whose require hands it this file's own marked,
 *   typescript and roleReading, reads each witness of the member's pin apart from the lines written for it.
 * - Case REPLAY CONTROL: the helper's source with no edit, compiled and run the same way, reads every probe exactly as written.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its unmet item,
 *   witnesses and held pages, the rows' pins in pin order, the members in pin order and the probes in first-use order, each
 *   held to a literal.
 * - Case HEADER: the PIN ROSTER block below, read from this file, equals the lines the rows and pins compose.
 * - Case ANCHOR (the outside anchors, read at run time from the tracked tracker export .beads/issues.jsonl and never retyped as
 *   the expectation): (1) wb-021.11's description's 'Unmet items:' sentence gives row R3's unmet items with their member and
 *   witness counts; (2) wb-021.9's notes carry refusal #3's UNMET list (the 'UNMET (record.unmet = record.prep.unmet, verbatim;
 *   3 items' block), whose items carry row R3's items in order with the member and witness counts of their ledger slugs and
 *   their G15 member ids in first-mention order; in the text from each member id to the next (the last member's text runs to
 *   its item's end, so an item's closing twins are its last member's held pages), the member's quote - the whole text after its
 *   id and one space, up to the ': ' directly before the first GW15 id that text names - equals its pin's quote, its witness
 *   ids come before the twin marker ('Twins' or 'twin') and its held ids after it, and the GW15 ids an item names are exactly
 *   its pins' probes; (3) wb-021.11's notes carry R-B293's fold, whose ledger slugs carry row R4's items with their member and
 *   witness counts, and (4) wb-021.9's notes carry refusal #4's UNMET list (the 'UNMET (record.unmet verbatim; 4 items' block
 *   that the inversion folds), whose slugs are the fold's and whose items carry row R4's G10 members, quotes (the whole text
 *   inside the parenthesis that opens one space after each id, up to the parenthesis that balances it, equal to its pin's
 *   quote) and W10 witness and held ids the same way. Each quote is compared whole, by equality: a quote cut short at a ': ' or
 *   ') ' inside it, or run on past its close to a later one, is not the record's. Both records are in the export at trunk
 *   9fe6f325 (landing 840), the base this cut was written on.
 * PIN ROSTER
 *   R3 (wb-021.9's refusal #3 members (gate-prep-15, run g10-gate-s177), which wb-021.11's description carries): 10 pins
 *     G15-SPANS-block-html-only (U1; the member: only counts html BLOCK children ((child as { block?: boolean }).block === true)): witnesses GW15-OPQ-INLINE-LIST, GW15-OPQ-INLINE-QUOTE; held none
 *     G15-CHILDREN-first-item-only (U1; the member: reads only a list's first item (token.items.slice(0, 1))): witnesses GW15-OPQ-SECOND-ITEM, GW15-OPQ-SECOND-ITEM-TIGHT; held none
 *     G15-SPANS-last-child-only (U1; the member: reads only the container's last child (childrenOf(token).slice(-1))): witnesses GW15-OPQ-QUOTE-THEN-MORE, GW15-OPQ-LIST-THEN-MORE; held none
 *     G15-OPAQUE-first-line (U1; the member: makes a unit opaque only when its first line is (places[0] === 'opaque')): witnesses GW15-OPQ-UNIT-FIRST-OUTSIDE; held GW15-OPQ-TWIN-BLOCK-LIST, GW15-OPQ-TWIN-QUOTE
 *     G15-FD-indent-two (U2; the member: caps the leading white-space run at two): witnesses GW15-FD-INDENT-3; held none
 *     G15-FD-indent-spaces-only (U2; the member: allows spaces only): witnesses GW15-FD-INDENT-TAB; held none
 *     G15-FD-quote-once (U2; the member: allows at most one quote mark): witnesses GW15-FD-NESTED-QUOTE; held none
 *     G15-FD-label-word-only (U2; the member: allows only word characters and hyphens in the label): witnesses GW15-FD-LABEL-DOT, GW15-FD-LABEL-SPACE; held GW15-FD-TWIN-INDENT-2, GW15-FD-TWIN-COL0, GW15-FD-TWIN-QUOTE, GW15-FD-TWIN-LABEL-WORD
 *     G15-STALE-skip-first (U3; the member: never reads the first BOUND entry as stale (bound.slice(1))): witnesses GW15-BIND-STALE-FIRST; held GW15-BIND-TWIN-STALE-SECOND
 *     G15-UNBOUND-prefix (U3; the member: counts a unit as bound when a BOUND entry starts with its key): witnesses GW15-BIND-UNBOUND-LONGER-ENTRY; held GW15-BIND-TWIN-UNBOUND-EMPTY
 *   R4 (wb-021.9's refusal #4 members (gate-prep-10, run g10-gate-s179), which R-B293 folded into wb-021.11's notes): 4 pins
 *     G10-ST-link-text-raw (U1; the member: one edit at :138: 'return children.length > 0 && token.type !== "link" ? shownText(children, ...) : textField(token);', a link shown as its raw text): witnesses W10-LINK-STRUCK, W10-LINK-STRUCK-QUOTE, W10-LINK-EM-STRUCK, W10-LINK-COMMENT, W10-LINK-HIDDEN-ELEMENT; held W10-LINK-TWIN-STRUCK-OUTSIDE, W10-LINK-TWIN-PLAIN
 *     G10-ST-opaque-inline-only (U2; the member: one edit at :132: the opacity test also requires !(token as { block?: boolean }).block): witnesses W10-EL-BLOCK-UPPER-LIST, W10-EL-BLOCK-ONELETTER-QUOTE, W10-EL-BLOCK-CLOSE-QUOTE; held W10-EL-TWIN-INLINE-UPPER, W10-EL-TWIN-INLINE-CLOSE, W10-EL-BLOCK-LOWER-QUOTE, W10-EL-BLOCK-UPPER-QUOTE, W10-EL-TOP-UPPER-CONTROL
 *     G10-CV-def-filter-first (U3; the member: one edit at :148: '.filter((line, index) => index === 0 || !FOOTNOTE.definition.test(line))'): witnesses W10-FD-FIRST-QUOTE; held W10-FD-TWIN-SECOND-QUOTE, W10-FD-TWIN-SECOND-INDENTED, W10-FD-FIRST-INDENTED
 *     G10-SU-forEachChild (U4; the member: one edit at :232: 'ts.forEachChild(node, child => { visit(child); });', a traversal that skips tokens): witnesses W10-CM-LINE-EMPTY-BODY, W10-CM-TRAILING-COMMA; held W10-CM-TWIN-STATEMENT-TRAILING, W10-CM-TWIN-STATEMENT-LEADING, W10-CM-BLOCK-BEFORE-PAREN
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe judgeFiles (and for a BOUND probe bindingOf) returns exactly the lines written
 * here: a helper edit that changes one probe's reading reds the pin case holding it, and the REPLAY CONTROL. (2) Each named
 * member changes the reading of every witness of its own pin: its REPLAY case applies the member's own edit to the helper's
 * source and reads each witness apart from as written, so a witness that stopped holding its member's form, or a member edit
 * that no longer applies exactly once, reds that REPLAY case; the REPLAY CONTROL reds when the compile-and-run path reads any
 * probe otherwise than written here (with the pin cases green, otherwise than the imported judge reads it). (3) The rows, pins,
 * members, witnesses, held pages and probe ids are frozen (SHAPE) and the roster above, quotes included, is the pins' (HEADER):
 * a pin of either row removed, swapped or relabelled in one literal, or a row deleted, reds SHAPE or HEADER (standing rule 16's
 * CT1-CT4). (4) Row R3's unmet items, member and witness counts, member ids, quotes, witnesses and held pages are the ones
 * wb-021.11's description and refusal #3's UNMET list record, and row R4's the ones R-B293's fold and refusal #4's UNMET list
 * record (ANCHOR), each quote whole in the form the ANCHOR bullet above reads: a member removed or relabelled in every literal
 * together, a witness moved between pins, or a row removed with its frozen-shape elements, reds ANCHOR (CT5, CT6), and so does
 * a pin's quote cut short or run on in its literal and its roster line together, or a record whose quote of a member, read in
 * that form, is not its pin's quote.
 *
 * NOT CLAIMED. A reading on any input that is not one of these probes is NOT CLAIMED by this census - among them every form of
 * a reader that no probe plants; refusal #3's riders F1, F2(a) and F2(b) (a pipe-less table's later body row, eight or more
 * spaces of indentation and a footnote label holding a doubled space; the gate's GW15-TABLE-*, GW15-DEDENT-* and GW15-FOOTREF-*
 * plants) are NOT CLAIMED by this census. How a named member reads a held page, or a probe of another pin, is NOT CLAIMED by
 * this census. Whether a reading equals what marked, TypeScript or a rendered page shows is NOT CLAIMED by this census. The
 * helper's left-out doc comments, wb-021.9's census header, cases and claim words, and the judge's run-guard counter (READS)
 * are NOT CLAIMED by this census. That a member's find and replace text here is the one its gate archived, and that a probe's
 * bytes are its gate's plant's, are NOT CLAIMED by this census: the tracker records name each member, its quote and its pages'
 * ids, not those bytes, so a member's edit or a held page rewritten in every literal together is outside ANCHOR (a witness so
 * rewritten still reds its REPLAY case unless its member reads it apart). An edit of this file's own code (a case, a check or a
 * reader removed or rewritten) is NOT CLAIMED by this census. No residual is claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated; the helper's source, the tracker export and this file are
 * only read; no src, docs or receipt is edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import { Lexer, marked } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { bindingOf, type FileKind, judgeFiles } from "./helpers/apo-citation-status-judge.js";
import { roleReading } from "./helpers/apo-ui-publish-census.js";

const SELF = fileURLToPath(import.meta.url);
const REPO = join(dirname(SELF), "..");
const EXPORT = ".beads/issues.jsonl";
const HELPER = "test/helpers/apo-citation-status-judge.ts";
const EM_SPACE = String.fromCodePoint(0x2003);

/** The sentence of wb-021.11's description that counts refusal #3's members, and its close. */
const DESCRIPTION_OPEN = "Unmet items: ";
const DESCRIPTION_CLOSE = " - each member keeps";
/** The opening and close of R-B293's fold in wb-021.11's notes. */
const FOLD_OPEN = "RULE19 DEPENDENCY INVERSION R-B293 (ruling M:46004, refusal O:1720): members folded into wb-021.11\n";
const FOLD_CLOSE = "\nrule19-invert idem rule19-inversion-M46004-wb-021.9-wb-021.11";
/** The openings of refusal #3's and refusal #4's UNMET lists in wb-021.9's notes; each list closes at its first blank line. */
const UNMET_3 = "\nUNMET (record.unmet = record.prep.unmet, verbatim; 3 items, each led by its ledger slug):\n";
const UNMET_4 = "\nUNMET (record.unmet verbatim; 4 items, each led by its ledger slug; these are the members the inversion folds into wb-021.11's note):\n";
/** A record's twin marker: its pages named after it are a member's held pages (the ids themselves spell TWIN in capitals). */
const TWIN_MARKER = /\b(?:Twins?|twins?)\b/;

interface Probe {
  readonly id: string;
  readonly path: string;
  readonly text: string;
  readonly bound?: readonly string[];
  readonly reading: readonly string[];
}
interface Pin {
  readonly id: string;
  readonly unmet: string;
  readonly quote: string;
  readonly witnesses: readonly string[];
  readonly held: readonly string[];
}
interface Row {
  readonly id: string;
  readonly label: string;
  /** The prefix of the gate's member ids and of its page ids in the row's records. */
  readonly memberPrefix: string;
  readonly probePrefix: string;
  /** How the record quotes a member: after its id and one space up to the ': ' directly before the first page id its text names
   * (colon), or inside the parenthesis that opens one space after its id, up to the parenthesis that balances it (parenthesis). */
  readonly quoteForm: "colon" | "parenthesis";
  readonly pins: readonly string[];
}
interface Member {
  readonly id: string;
  readonly find: string;
  readonly repl: string;
}

const PROBES: readonly Probe[] = [
  {
    id: "GW15-OPQ-INLINE-LIST",
    path: "docs/workbench/x.md",
    text: `- note <!-- open\n  ${EM_SPACE}\n  adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->\n`,
    reading: [
      "kind markdown 1",
      "units 2 strings 0",
      "cite docs/workbench/x.md:3 docs/workbench/x.md adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->",
      "finding docs/workbench/x.md:3 status",
      "finding docs/workbench/x.md:3 scope",
    ],
  },
  {
    id: "GW15-OPQ-INLINE-QUOTE",
    path: "docs/workbench/x.md",
    text: `> note <!-- open\n> ${EM_SPACE}\n> adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->\n`,
    reading: [
      "kind markdown 1",
      "units 2 strings 0",
      "cite docs/workbench/x.md:3 docs/workbench/x.md > adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->",
      "finding docs/workbench/x.md:3 status",
      "finding docs/workbench/x.md:3 scope",
    ],
  },
  {
    id: "GW15-OPQ-SECOND-ITEM",
    path: "docs/workbench/x.md",
    text: `- one\n- two\n\n  <!-- open\n  ${EM_SPACE}\n  adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->\n`,
    reading: [
      "kind markdown 1",
      "units 4 strings 0",
      "cite docs/workbench/x.md:6 docs/workbench/x.md adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->",
      "finding docs/workbench/x.md:6 status",
      "finding docs/workbench/x.md:6 scope",
    ],
  },
  {
    id: "GW15-OPQ-SECOND-ITEM-TIGHT",
    path: "docs/workbench/x.md",
    text: `- one\n- two\n  <!-- open\n  ${EM_SPACE}\n  adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->\n`,
    reading: [
      "kind markdown 1",
      "units 3 strings 0",
      "cite docs/workbench/x.md:5 docs/workbench/x.md adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->",
      "finding docs/workbench/x.md:5 status",
      "finding docs/workbench/x.md:5 scope",
    ],
  },
  {
    id: "GW15-OPQ-QUOTE-THEN-MORE",
    path: "docs/workbench/x.md",
    text: `> note\n>\n> <!-- open\n> ${EM_SPACE}\n> adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->\n>\n> more\n`,
    reading: [
      "kind markdown 1",
      "units 4 strings 0",
      "cite docs/workbench/x.md:5 docs/workbench/x.md > adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->",
      "finding docs/workbench/x.md:5 status",
      "finding docs/workbench/x.md:5 scope",
    ],
  },
  {
    id: "GW15-OPQ-LIST-THEN-MORE",
    path: "docs/workbench/x.md",
    text: `- note\n\n  <!-- open\n  ${EM_SPACE}\n  adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->\n\n  more\n`,
    reading: [
      "kind markdown 1",
      "units 4 strings 0",
      "cite docs/workbench/x.md:5 docs/workbench/x.md adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->",
      "finding docs/workbench/x.md:5 status",
      "finding docs/workbench/x.md:5 scope",
    ],
  },
  {
    id: "GW15-OPQ-UNIT-FIRST-OUTSIDE",
    path: "docs/workbench/x.md",
    text: `Pi reads the program (non-effectful).\n> <!-- open adaptive-policy-organizations-2026-10-18 design-stage\n> ${EM_SPACE}\n> -->\n`,
    reading: [
      "kind markdown 1",
      "units 2 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the program (non-effectful). > <!-- open adaptive-policy-organizations-2026-10-18 design-stage",
      "finding docs/workbench/x.md:1 status",
      "finding docs/workbench/x.md:1 scope",
    ],
  },
  {
    id: "GW15-OPQ-TWIN-BLOCK-LIST",
    path: "docs/workbench/x.md",
    text: `- note\n\n  <!-- open\n  ${EM_SPACE}\n  adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->\n`,
    reading: [
      "kind markdown 1",
      "units 3 strings 0",
      "cite docs/workbench/x.md:5 docs/workbench/x.md adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->",
      "finding docs/workbench/x.md:5 status",
      "finding docs/workbench/x.md:5 scope",
    ],
  },
  {
    id: "GW15-OPQ-TWIN-QUOTE",
    path: "docs/workbench/x.md",
    text: `> note\n>\n> <!-- open\n> ${EM_SPACE}\n> adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->\n`,
    reading: [
      "kind markdown 1",
      "units 3 strings 0",
      "cite docs/workbench/x.md:5 docs/workbench/x.md > adaptive-policy-organizations-2026-10-18 design-stage, non-effectful -->",
      "finding docs/workbench/x.md:5 status",
      "finding docs/workbench/x.md:5 scope",
    ],
  },
  {
    id: "GW15-FD-INDENT-3",
    path: "docs/workbench/x.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n   [^n]: design-stage\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). [^n]: design-stage",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "GW15-FD-INDENT-TAB",
    path: "docs/workbench/x.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n\t[^n]: design-stage\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). [^n]: design-stage",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "GW15-FD-NESTED-QUOTE",
    path: "docs/workbench/x.md",
    text: "> > Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n> > [^n]: design-stage\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md > > Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). > > [^n]: design-stage",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "GW15-FD-LABEL-DOT",
    path: "docs/workbench/x.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n  [^n.]: design-stage\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). [^n.]: design-stage",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "GW15-FD-LABEL-SPACE",
    path: "docs/workbench/x.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n  [^a note]: design-stage\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). [^a note]: design-stage",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "GW15-FD-TWIN-INDENT-2",
    path: "docs/workbench/x.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n  [^n]: design-stage\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). [^n]: design-stage",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "GW15-FD-TWIN-COL0",
    path: "docs/workbench/x.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n[^n]: design-stage\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). [^n]: design-stage",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "GW15-FD-TWIN-QUOTE",
    path: "docs/workbench/x.md",
    text: "> Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n> [^n]: design-stage\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md > Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). > [^n]: design-stage",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "GW15-FD-TWIN-LABEL-WORD",
    path: "docs/workbench/x.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n  [^n]: design-stage\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). [^n]: design-stage",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "GW15-BIND-STALE-FIRST",
    path: "docs/workbench/zz-wb-021.6-plant.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful).\n",
    bound: ["docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (retired).", "docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful)."],
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/zz-wb-021.6-plant.md:1 docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful).",
      "bind docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (retired). stale",
    ],
  },
  {
    id: "GW15-BIND-TWIN-STALE-SECOND",
    path: "docs/workbench/zz-wb-021.6-plant.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful).\n",
    bound: ["docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful).", "docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (retired)."],
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/zz-wb-021.6-plant.md:1 docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful).",
      "bind docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (retired). stale",
    ],
  },
  {
    id: "GW15-BIND-UNBOUND-LONGER-ENTRY",
    path: "docs/workbench/zz-wb-021.6-plant.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful).\n",
    bound: ["docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful). extra"],
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/zz-wb-021.6-plant.md:1 docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful).",
      "bind docs/workbench/zz-wb-021.6-plant.md:1 unbound",
      "bind docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful). extra stale",
    ],
  },
  {
    id: "GW15-BIND-TWIN-UNBOUND-EMPTY",
    path: "docs/workbench/zz-wb-021.6-plant.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful).\n",
    bound: [],
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/zz-wb-021.6-plant.md:1 docs/workbench/zz-wb-021.6-plant.md Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful).",
      "bind docs/workbench/zz-wb-021.6-plant.md:1 unbound",
    ],
  },
  {
    id: "W10-LINK-STRUCK",
    path: "docs/workbench/x.md",
    text: "Pi reads the [~~design-stage~~](https://example.invalid) adaptive-policy-organizations-2026-10-18 program (non-effectful).\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the [~~design-stage~~](https://example.invalid) adaptive-policy-organizations-2026-10-18 program (non-effectful).",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "W10-LINK-STRUCK-QUOTE",
    path: "docs/workbench/x.md",
    text: "> Pi reads the adaptive-policy-organizations-2026-10-18 program ([~~design-stage~~](https://example.invalid), non-effectful).\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md > Pi reads the adaptive-policy-organizations-2026-10-18 program ([~~design-stage~~](https://example.invalid), non-effectful).",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "W10-LINK-EM-STRUCK",
    path: "docs/workbench/x.md",
    text: "Pi reads the [*~~design-stage~~*](https://example.invalid) adaptive-policy-organizations-2026-10-18 program (non-effectful).\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the [*~~design-stage~~*](https://example.invalid) adaptive-policy-organizations-2026-10-18 program (non-effectful).",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "W10-LINK-COMMENT",
    path: "docs/workbench/x.md",
    text: "Pi reads the [x <!-- design-stage -->](https://example.invalid) adaptive-policy-organizations-2026-10-18 program (non-effectful).\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the [x <!-- design-stage -->](https://example.invalid) adaptive-policy-organizations-2026-10-18 program (non-effectful).",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "W10-LINK-HIDDEN-ELEMENT",
    path: "docs/workbench/x.md",
    text: "Pi reads the [<span hidden>design-stage</span>](https://example.invalid) adaptive-policy-organizations-2026-10-18 program (non-effectful).\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the [<span hidden>design-stage</span>](https://example.invalid) adaptive-policy-organizations-2026-10-18 program (non-effectful).",
      "finding docs/workbench/x.md:1 status",
      "finding docs/workbench/x.md:1 scope",
    ],
  },
  {
    id: "W10-LINK-TWIN-STRUCK-OUTSIDE",
    path: "docs/workbench/x.md",
    text: "> Pi reads the adaptive-policy-organizations-2026-10-18 program (~~design-stage~~, non-effectful).\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md > Pi reads the adaptive-policy-organizations-2026-10-18 program (~~design-stage~~, non-effectful).",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "W10-LINK-TWIN-PLAIN",
    path: "docs/workbench/x.md",
    text: "Pi reads the [design-stage](https://example.invalid) adaptive-policy-organizations-2026-10-18 program (non-effectful).\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the [design-stage](https://example.invalid) adaptive-policy-organizations-2026-10-18 program (non-effectful).",
    ],
  },
  {
    id: "W10-EL-BLOCK-UPPER-LIST",
    path: "docs/workbench/x.md",
    text: "- Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n  <DIV hidden>design-stage</DIV>\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md - Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). <DIV hidden>design-stage</DIV>",
      "finding docs/workbench/x.md:1 status",
      "finding docs/workbench/x.md:1 scope",
    ],
  },
  {
    id: "W10-EL-BLOCK-ONELETTER-QUOTE",
    path: "docs/workbench/x.md",
    text: "> Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n> <p hidden>design-stage</p>\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md > Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). > <p hidden>design-stage</p>",
      "finding docs/workbench/x.md:1 status",
      "finding docs/workbench/x.md:1 scope",
    ],
  },
  {
    id: "W10-EL-BLOCK-CLOSE-QUOTE",
    path: "docs/workbench/x.md",
    text: "> Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful).\n> </div>\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md > Pi reads the adaptive-policy-organizations-2026-10-18 program (design-stage, non-effectful). > </div>",
      "finding docs/workbench/x.md:1 status",
      "finding docs/workbench/x.md:1 scope",
    ],
  },
  {
    id: "W10-EL-TWIN-INLINE-UPPER",
    path: "docs/workbench/x.md",
    text: "> Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). <SPAN hidden>design-stage</SPAN>\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md > Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). <SPAN hidden>design-stage</SPAN>",
      "finding docs/workbench/x.md:1 status",
      "finding docs/workbench/x.md:1 scope",
    ],
  },
  {
    id: "W10-EL-TWIN-INLINE-CLOSE",
    path: "docs/workbench/x.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful) design-stage</span>.\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful) design-stage</span>.",
      "finding docs/workbench/x.md:1 status",
      "finding docs/workbench/x.md:1 scope",
    ],
  },
  {
    id: "W10-EL-BLOCK-LOWER-QUOTE",
    path: "docs/workbench/x.md",
    text: "> Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n> <div hidden>design-stage</div>\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md > Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). > <div hidden>design-stage</div>",
      "finding docs/workbench/x.md:1 status",
      "finding docs/workbench/x.md:1 scope",
    ],
  },
  {
    id: "W10-EL-BLOCK-UPPER-QUOTE",
    path: "docs/workbench/x.md",
    text: "> Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n> <DIV hidden>design-stage</DIV>\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md > Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). > <DIV hidden>design-stage</DIV>",
      "finding docs/workbench/x.md:1 status",
      "finding docs/workbench/x.md:1 scope",
    ],
  },
  {
    id: "W10-EL-TOP-UPPER-CONTROL",
    path: "docs/workbench/x.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n<DIV hidden>design-stage</DIV>\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). <DIV hidden>design-stage</DIV>",
      "finding docs/workbench/x.md:1 status",
      "finding docs/workbench/x.md:1 scope",
    ],
  },
  {
    id: "W10-FD-FIRST-QUOTE",
    path: "docs/workbench/x.md",
    text: "> [^n]: design-stage\n> Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md > [^n]: design-stage > Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "W10-FD-TWIN-SECOND-QUOTE",
    path: "docs/workbench/x.md",
    text: "> Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n> [^n]: design-stage\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md > Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). > [^n]: design-stage",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "W10-FD-TWIN-SECOND-INDENTED",
    path: "docs/workbench/x.md",
    text: "Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n  [^n]: design-stage\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful). [^n]: design-stage",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "W10-FD-FIRST-INDENTED",
    path: "docs/workbench/x.md",
    text: "  [^n]: design-stage\nPi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).\n",
    reading: [
      "kind markdown 1",
      "units 1 strings 0",
      "cite docs/workbench/x.md:1 docs/workbench/x.md [^n]: design-stage Pi reads the adaptive-policy-organizations-2026-10-18 program (non-effectful).",
      "finding docs/workbench/x.md:1 status",
    ],
  },
  {
    id: "W10-CM-LINE-EMPTY-BODY",
    path: "src/x.ts",
    text: "export function f(): void {\n  // Pi reads the adaptive-policy-organizations-2026-10-18 program\n}\nexport const V = { effectClass: \"write\" };\n",
    reading: [
      "kind script 1",
      "units 5 strings 1",
      "cite src/x.ts:2 src/x.ts // Pi reads the adaptive-policy-organizations-2026-10-18 program",
      "banner src/x.ts",
      "finding src/x.ts:4 effect-class:write",
    ],
  },
  {
    id: "W10-CM-TRAILING-COMMA",
    path: "src/x.ts",
    text: "export const o = { a: 1, // Pi reads the adaptive-policy-organizations-2026-10-18 program\n};\nexport const V = { effectClass: \"write\" };\n",
    reading: [
      "kind script 1",
      "units 6 strings 1",
      "cite src/x.ts:1 src/x.ts // Pi reads the adaptive-policy-organizations-2026-10-18 program",
      "banner src/x.ts",
      "finding src/x.ts:3 effect-class:write",
    ],
  },
  {
    id: "W10-CM-TWIN-STATEMENT-TRAILING",
    path: "src/x.ts",
    text: "export const x = 1; // Pi reads the adaptive-policy-organizations-2026-10-18 program\nexport const V = { effectClass: \"write\" };\n",
    reading: [
      "kind script 1",
      "units 5 strings 1",
      "cite src/x.ts:1 src/x.ts // Pi reads the adaptive-policy-organizations-2026-10-18 program",
      "banner src/x.ts",
      "finding src/x.ts:2 effect-class:write",
    ],
  },
  {
    id: "W10-CM-TWIN-STATEMENT-LEADING",
    path: "src/x.ts",
    text: "// Pi reads the adaptive-policy-organizations-2026-10-18 program\nexport const V = { effectClass: \"write\" };\n",
    reading: [
      "kind script 1",
      "units 4 strings 1",
      "cite src/x.ts:1 src/x.ts // Pi reads the adaptive-policy-organizations-2026-10-18 program",
      "banner src/x.ts",
      "finding src/x.ts:2 effect-class:write",
    ],
  },
  {
    id: "W10-CM-BLOCK-BEFORE-PAREN",
    path: "src/x.ts",
    text: "export const n = Number(1 /* Pi reads the adaptive-policy-organizations-2026-10-18 program */);\nexport const V = { effectClass: \"write\" };\n",
    reading: [
      "kind script 1",
      "units 6 strings 1",
      "cite src/x.ts:1 src/x.ts /* Pi reads the adaptive-policy-organizations-2026-10-18 program */",
      "banner src/x.ts",
      "finding src/x.ts:2 effect-class:write",
    ],
  },
];

const PINS: readonly Pin[] = [
  {
    id: "G15-SPANS-block-html-only",
    unmet: "U1",
    quote: "only counts html BLOCK children ((child as { block?: boolean }).block === true)",
    witnesses: ["GW15-OPQ-INLINE-LIST", "GW15-OPQ-INLINE-QUOTE"],
    held: [],
  },
  {
    id: "G15-CHILDREN-first-item-only",
    unmet: "U1",
    quote: "reads only a list's first item (token.items.slice(0, 1))",
    witnesses: ["GW15-OPQ-SECOND-ITEM", "GW15-OPQ-SECOND-ITEM-TIGHT"],
    held: [],
  },
  {
    id: "G15-SPANS-last-child-only",
    unmet: "U1",
    quote: "reads only the container's last child (childrenOf(token).slice(-1))",
    witnesses: ["GW15-OPQ-QUOTE-THEN-MORE", "GW15-OPQ-LIST-THEN-MORE"],
    held: [],
  },
  {
    id: "G15-OPAQUE-first-line",
    unmet: "U1",
    quote: "makes a unit opaque only when its first line is (places[0] === 'opaque')",
    witnesses: ["GW15-OPQ-UNIT-FIRST-OUTSIDE"],
    held: ["GW15-OPQ-TWIN-BLOCK-LIST", "GW15-OPQ-TWIN-QUOTE"],
  },
  {
    id: "G15-FD-indent-two",
    unmet: "U2",
    quote: "caps the leading white-space run at two",
    witnesses: ["GW15-FD-INDENT-3"],
    held: [],
  },
  {
    id: "G15-FD-indent-spaces-only",
    unmet: "U2",
    quote: "allows spaces only",
    witnesses: ["GW15-FD-INDENT-TAB"],
    held: [],
  },
  {
    id: "G15-FD-quote-once",
    unmet: "U2",
    quote: "allows at most one quote mark",
    witnesses: ["GW15-FD-NESTED-QUOTE"],
    held: [],
  },
  {
    id: "G15-FD-label-word-only",
    unmet: "U2",
    quote: "allows only word characters and hyphens in the label",
    witnesses: ["GW15-FD-LABEL-DOT", "GW15-FD-LABEL-SPACE"],
    held: ["GW15-FD-TWIN-INDENT-2", "GW15-FD-TWIN-COL0", "GW15-FD-TWIN-QUOTE", "GW15-FD-TWIN-LABEL-WORD"],
  },
  {
    id: "G15-STALE-skip-first",
    unmet: "U3",
    quote: "never reads the first BOUND entry as stale (bound.slice(1))",
    witnesses: ["GW15-BIND-STALE-FIRST"],
    held: ["GW15-BIND-TWIN-STALE-SECOND"],
  },
  {
    id: "G15-UNBOUND-prefix",
    unmet: "U3",
    quote: "counts a unit as bound when a BOUND entry starts with its key",
    witnesses: ["GW15-BIND-UNBOUND-LONGER-ENTRY"],
    held: ["GW15-BIND-TWIN-UNBOUND-EMPTY"],
  },
  {
    id: "G10-ST-link-text-raw",
    unmet: "U1",
    quote: "one edit at :138: 'return children.length > 0 && token.type !== \"link\" ? shownText(children, ...) : textField(token);', a link shown as its raw text",
    witnesses: ["W10-LINK-STRUCK", "W10-LINK-STRUCK-QUOTE", "W10-LINK-EM-STRUCK", "W10-LINK-COMMENT", "W10-LINK-HIDDEN-ELEMENT"],
    held: ["W10-LINK-TWIN-STRUCK-OUTSIDE", "W10-LINK-TWIN-PLAIN"],
  },
  {
    id: "G10-ST-opaque-inline-only",
    unmet: "U2",
    quote: "one edit at :132: the opacity test also requires !(token as { block?: boolean }).block",
    witnesses: ["W10-EL-BLOCK-UPPER-LIST", "W10-EL-BLOCK-ONELETTER-QUOTE", "W10-EL-BLOCK-CLOSE-QUOTE"],
    held: ["W10-EL-TWIN-INLINE-UPPER", "W10-EL-TWIN-INLINE-CLOSE", "W10-EL-BLOCK-LOWER-QUOTE", "W10-EL-BLOCK-UPPER-QUOTE", "W10-EL-TOP-UPPER-CONTROL"],
  },
  {
    id: "G10-CV-def-filter-first",
    unmet: "U3",
    quote: "one edit at :148: '.filter((line, index) => index === 0 || !FOOTNOTE.definition.test(line))'",
    witnesses: ["W10-FD-FIRST-QUOTE"],
    held: ["W10-FD-TWIN-SECOND-QUOTE", "W10-FD-TWIN-SECOND-INDENTED", "W10-FD-FIRST-INDENTED"],
  },
  {
    id: "G10-SU-forEachChild",
    unmet: "U4",
    quote: "one edit at :232: 'ts.forEachChild(node, child => { visit(child); });', a traversal that skips tokens",
    witnesses: ["W10-CM-LINE-EMPTY-BODY", "W10-CM-TRAILING-COMMA"],
    held: ["W10-CM-TWIN-STATEMENT-TRAILING", "W10-CM-TWIN-STATEMENT-LEADING", "W10-CM-BLOCK-BEFORE-PAREN"],
  },
];

const ROWS: readonly Row[] = [
  {
    id: "R3",
    label: "wb-021.9's refusal #3 members (gate-prep-15, run g10-gate-s177), which wb-021.11's description carries",
    memberPrefix: "G15",
    probePrefix: "GW15",
    quoteForm: "colon",
    pins: ["G15-SPANS-block-html-only", "G15-CHILDREN-first-item-only", "G15-SPANS-last-child-only", "G15-OPAQUE-first-line", "G15-FD-indent-two", "G15-FD-indent-spaces-only", "G15-FD-quote-once", "G15-FD-label-word-only", "G15-STALE-skip-first", "G15-UNBOUND-prefix"],
  },
  {
    id: "R4",
    label: "wb-021.9's refusal #4 members (gate-prep-10, run g10-gate-s179), which R-B293 folded into wb-021.11's notes",
    memberPrefix: "G10",
    probePrefix: "W10",
    quoteForm: "parenthesis",
    pins: ["G10-ST-link-text-raw", "G10-ST-opaque-inline-only", "G10-CV-def-filter-first", "G10-SU-forEachChild"],
  },
];

/** Each named member's one edit of the helper, find and replace as copied from its gate's member table. */
const MEMBERS: readonly Member[] = [
  {
    id: "G15-SPANS-block-html-only",
    find: "(child.type === \"html\" && /\\n[\\s>]*\\n/.test(child.raw))",
    repl: "(child.type === \"html\" && (child as { block?: boolean }).block === true && /\\n[\\s>]*\\n/.test(child.raw))",
  },
  {
    id: "G15-CHILDREN-first-item-only",
    find: "if (isList(token)) return token.items.flatMap(item => item.tokens);",
    repl: "if (isList(token)) return token.items.slice(0, 1).flatMap(item => item.tokens);",
  },
  {
    id: "G15-SPANS-last-child-only",
    find: "return childrenOf(token).some(child =>",
    repl: "return childrenOf(token).slice(-1).some(child =>",
  },
  {
    id: "G15-OPAQUE-first-line",
    find: "if (places.includes(\"opaque\")) return { text: \"\", opaque: true };",
    repl: "if (places[0] === \"opaque\") return { text: \"\", opaque: true };",
  },
  {
    id: "G15-FD-indent-two",
    find: "definition: /^\\s*(?:>\\s*)*\\[\\^[^\\]\\n]+\\]:/",
    repl: "definition: /^\\s{0,2}(?:>\\s*)*\\[\\^[^\\]\\n]+\\]:/",
  },
  {
    id: "G15-FD-indent-spaces-only",
    find: "definition: /^\\s*(?:>\\s*)*\\[\\^[^\\]\\n]+\\]:/",
    repl: "definition: /^ *(?:>\\s*)*\\[\\^[^\\]\\n]+\\]:/",
  },
  {
    id: "G15-FD-quote-once",
    find: "definition: /^\\s*(?:>\\s*)*\\[\\^[^\\]\\n]+\\]:/",
    repl: "definition: /^\\s*(?:>\\s*)?\\[\\^[^\\]\\n]+\\]:/",
  },
  {
    id: "G15-FD-label-word-only",
    find: "definition: /^\\s*(?:>\\s*)*\\[\\^[^\\]\\n]+\\]:/",
    repl: "definition: /^\\s*(?:>\\s*)*\\[\\^[\\w-]+\\]:/",
  },
  {
    id: "G15-STALE-skip-first",
    find: "...bound.filter(entry => !keys.includes(entry))",
    repl: "...bound.slice(1).filter(entry => !keys.includes(entry))",
  },
  {
    id: "G15-UNBOUND-prefix",
    find: "citing.filter(entry => !bound.includes(entry.key))",
    repl: "citing.filter(entry => !bound.some(item => item.startsWith(entry.key)))",
  },
  {
    id: "G10-ST-link-text-raw",
    find: "      return children.length > 0 ? shownText(children, token.type === \"blockquote\" ? \"\\n\" : \"\", view) : textField(token);",
    repl: "      return children.length > 0 && token.type !== \"link\" ? shownText(children, token.type === \"blockquote\" ? \"\\n\" : \"\", view) : textField(token);",
  },
  {
    id: "G10-ST-opaque-inline-only",
    find: "if (token.type === \"html\" && ELEMENT.test(token.raw.trim())) view.opaque = true;",
    repl: "if (token.type === \"html\" && !(token as { block?: boolean }).block && ELEMENT.test(token.raw.trim())) view.opaque = true;",
  },
  {
    id: "G10-CV-def-filter-first",
    find: "    .filter(line => !FOOTNOTE.definition.test(line))",
    repl: "    .filter((line, index) => index === 0 || !FOOTNOTE.definition.test(line))",
  },
  {
    id: "G10-SU-forEachChild",
    find: "    for (const child of node.getChildren(file)) visit(child);",
    repl: "    ts.forEachChild(node, child => { visit(child); });",
  },
];

const FILE_KINDS: readonly FileKind[] = ["lock", "binary", "markdown", "script", "text"];
interface Judge {
  readonly judgeFiles: typeof judgeFiles;
  readonly bindingOf: typeof bindingOf;
}
const DELIVERED: Judge = { judgeFiles, bindingOf };

/** A probe's reading under a judge: its Judgement's lines, then for a BOUND probe its binding's. */
function readingWith(judge: Judge, probe: Probe): string[] {
  const judgement = judge.judgeFiles([{ path: probe.path, text: probe.text }]);
  return [
    ...FILE_KINDS.filter(kind => judgement.kinds[kind] > 0).map(kind => `kind ${kind} ${judgement.kinds[kind]}`),
    `units ${judgement.units} strings ${judgement.strings}`,
    ...judgement.citing.map(entry => `cite ${entry.at} ${entry.key}`),
    ...judgement.banner.map(path => `banner ${path}`),
    ...judgement.findings.map(finding => `finding ${finding}`),
    ...(probe.bound === undefined ? [] : judge.bindingOf(judgement.citing, probe.bound).map(entry => `bind ${entry}`)),
  ];
}
/** The judge a helper source compiles to: CommonJS from transpileModule, run in a fresh context whose require hands it this file's imports. */
function compiled(source: string): Judge {
  const output = ts.transpileModule(source, { fileName: HELPER, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const modules = new Map<string, unknown>([
    ["marked", { Lexer, marked }],
    ["typescript", { __esModule: true, default: ts }],
    ["./apo-ui-publish-census.js", { roleReading }],
  ]);
  const requireOf = (specifier: string): unknown => {
    if (!modules.has(specifier)) throw new Error(`the helper imports ${specifier}, which the replay does not hand it`);
    return modules.get(specifier);
  };
  const exported: Record<string, unknown> = {};
  runInNewContext(output, { exports: exported, require: requireOf, module: { exports: exported } }, { filename: `${HELPER}.replay.js`, timeout: 10_000 });
  const judge = exported.judgeFiles;
  const bind = exported.bindingOf;
  if (typeof judge !== "function" || typeof bind !== "function") throw new Error("the compiled helper exports no judgeFiles or no bindingOf");
  return { judgeFiles: judge as typeof judgeFiles, bindingOf: bind as typeof bindingOf };
}
const helperSource = (): string => readFileSync(join(REPO, HELPER), "utf8");
function occurrences(text: string, find: string): number {
  let count = 0;
  for (let at = text.indexOf(find); at >= 0; at = text.indexOf(find, at + 1)) count += 1;
  return count;
}
const applied = (source: string, member: Member): string => {
  const at = source.indexOf(member.find);
  return at < 0 ? source : source.slice(0, at) + member.repl + source.slice(at + member.find.length);
};

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
/** The id of the row holding a pin ('no row' when none does: SHAPE, HEADER and ANCHOR then read the census red). */
const rowIdOf = (pin: Pin): string => ROWS.find(candidate => candidate.pins.includes(pin.id))?.id ?? "no row";
function memberOf(pin: Pin): Member {
  const member = MEMBERS.find(candidate => candidate.id === pin.id);
  if (member === undefined) throw new Error(`${pin.id}: no member edit`);
  return member;
}
/** A row's pins grouped by unmet item, in order. */
function rowItems(row: Row): { readonly unmet: string; readonly pins: Pin[] }[] {
  const items: { readonly unmet: string; readonly pins: Pin[] }[] = [];
  for (const id of row.pins) {
    const pin = pinOf(id);
    const last = items.at(-1);
    if (last?.unmet === pin.unmet) last.pins.push(pin);
    else items.push({ unmet: pin.unmet, pins: [pin] });
  }
  return items;
}
const witnessesOf = (pins: readonly Pin[]): string[] => [...new Set(pins.flatMap(pin => pin.witnesses))];
/** '<unmet>:<member count>:<witness count>' for each of a row's items. */
const countLines = (row: Row): string[] => rowItems(row).map(item => `${item.unmet}:${item.pins.length}:${witnessesOf(item.pins).length}`);
const rosterLines = (): string[] =>
  ROWS.flatMap(row => [
    ` *   ${row.id} (${row.label}): ${row.pins.length} pins`,
    ...row.pins.map(id => {
      const pin = pinOf(id);
      return ` *     ${pin.id} (${pin.unmet}; the member: ${pin.quote}): witnesses ${pin.witnesses.join(", ")}; held ${pin.held.length === 0 ? "none" : pin.held.join(", ")}`;
    }),
  ]);

/** A bead's description and notes, read from its row in the tracked tracker export. */
function exportRow(bead: string): { readonly description: string; readonly notes: string } {
  for (const line of trackerExportText(join(REPO, EXPORT)).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (typeof value !== "object" || value === null || !("id" in value) || value.id !== bead) continue;
    const description = "description" in value && typeof value.description === "string" ? value.description : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    return { description, notes };
  }
  throw new Error(`${bead}: no row in ${EXPORT}`);
}
/** The text after the first occurrence of open, up to the first occurrence of close after it (to the end when close is absent;
 * empty when open is absent). */
function sectionOf(text: string, open: string, close: string): string {
  const start = text.indexOf(open);
  if (start < 0) return "";
  const end = text.indexOf(close, start + open.length);
  return end < 0 ? text.slice(start + open.length) : text.slice(start + open.length, end);
}
/** The ids of one prefix a text names, in first-mention order: member ids keep their lower-case words, page ids are capitals. */
const idsOf = (text: string, prefix: string, lower: boolean): string[] => [...new Set(text.match(new RegExp(`\\b${prefix}-${lower ? "[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*" : "[A-Z0-9]+(?:-[A-Z0-9]+)*"}`, "g")) ?? [])];
/** An unmet item of a UNMET list: its id (U<n>), its ledger slug and its text. */
interface UnmetItem {
  readonly unmet: string;
  readonly slug: string;
  readonly text: string;
}
const unmetItem = (text: string): UnmetItem => {
  const match = /^(U\d+): (U\d+-\S+?)\. /.exec(text);
  return { unmet: match?.[1] ?? "", slug: match?.[2] ?? "", text };
};
const listItems = (list: string): UnmetItem[] =>
  list
    .split("\n")
    .filter(line => line.startsWith("- "))
    .map(line => unmetItem(line.slice(2)));
/** The member and witness counts a ledger slug carries ('-' when it carries none). */
const memberCount = (slug: string): string => /-(\d+)-GATE-MUTANTS?-SURVIVES?-/.exec(slug)?.[1] ?? "-";
const witnessCount = (slug: string): string => /-(\d+)-WITNESS(?:ES)?$/.exec(slug)?.[1] ?? "-";
/** What a record says of each member an item names: the text from its id to the next member's, split at the twin marker. */
function recordPins(item: UnmetItem, row: Row): { readonly id: string; readonly segment: string; readonly witnesses: string[]; readonly held: string[] }[] {
  const members = idsOf(item.text, row.memberPrefix, true);
  return members.map((id, index) => {
    const next = members[index + 1];
    const segment = item.text.slice(item.text.indexOf(id), next === undefined ? item.text.length : item.text.indexOf(next));
    const marker = TWIN_MARKER.exec(segment);
    const before = marker === null ? segment : segment.slice(0, marker.index);
    const after = marker === null ? "" : segment.slice(marker.index);
    return { id, segment, witnesses: idsOf(before, row.probePrefix, false), held: idsOf(after, row.probePrefix, false) };
  });
}
/** The index of the first page id of a prefix a text names (-1 when it names none). */
const firstPageAt = (text: string, prefix: string): number => new RegExp(`\\b${prefix}-[A-Z0-9]+(?:-[A-Z0-9]+)*`).exec(text)?.index ?? -1;
/** The quote a record gives a member, read whole from the member's text (which opens with its id): in the colon form the text after
 * the id and one space up to the ': ' directly before the first page id the text names; in the parenthesis form the text inside the
 * parenthesis that opens one space after the id, up to the parenthesis that balances it. Undefined when the text holds no quote of
 * the row's form. */
function recordQuote(row: Row, id: string, segment: string): string | undefined {
  const lead = row.quoteForm === "colon" ? `${id} ` : `${id} (`;
  if (!segment.startsWith(lead)) return undefined;
  const rest = segment.slice(lead.length);
  if (row.quoteForm === "colon") {
    const page = firstPageAt(rest, row.probePrefix);
    return page >= 2 && rest.slice(page - 2, page) === ": " ? rest.slice(0, page - 2) : undefined;
  }
  let depth = 1;
  for (let at = 0; at < rest.length; at += 1) {
    if (rest[at] === "(") depth += 1;
    else if (rest[at] === ")") depth -= 1;
    if (depth === 0) return rest.slice(0, at);
  }
  return undefined;
}
/** A quote as a reading writes it: JSON-quoted, so no quote text can read as a missing quote. */
const quoteReading = (quote: string | undefined): string => (quote === undefined ? "missing" : JSON.stringify(quote));
/** The whole reading of one UNMET list against a row: each item's counts and members, then each member's quote, witnesses and held pages. */
function listReading(items: readonly UnmetItem[], row: Row): { readonly items: string[]; readonly pins: string[]; readonly pages: string[] } {
  return {
    items: items.map(item => `${item.unmet}:${memberCount(item.slug)}:${witnessCount(item.slug)}:${idsOf(item.text, row.memberPrefix, true).join(",")}`),
    pins: items.flatMap(item =>
      recordPins(item, row).map(entry => `${entry.id}:${item.unmet}:quote ${quoteReading(recordQuote(row, entry.id, entry.segment))}:${entry.witnesses.join(",")}:${entry.held.join(",")}`),
    ),
    pages: items.map(item => `${item.unmet}:${idsOf(item.text, row.probePrefix, false).join(",")}`),
  };
}
/** The same reading composed from the row's own literals. */
function rowReading(row: Row): { readonly items: string[]; readonly pins: string[]; readonly pages: string[] } {
  const items = rowItems(row);
  return {
    items: items.map(item => `${item.unmet}:${item.pins.length}:${witnessesOf(item.pins).length}:${item.pins.map(pin => pin.id).join(",")}`),
    pins: items.flatMap(item => item.pins.map(pin => `${pin.id}:${item.unmet}:quote ${quoteReading(pin.quote)}:${pin.witnesses.join(",")}:${pin.held.join(",")}`)),
    pages: items.map(item => `${item.unmet}:${[...new Set(item.pins.flatMap(pin => [...pin.witnesses, ...pin.held]))].join(",")}`),
  };
}

describe("wb-021.11 APO citation-status judge members census (test/helpers/apo-citation-status-judge.ts): 14 pin cases holding the literal judgeFiles and bindingOf readings of the witness and held pages of each named wb-021.9 refusal #3 or #4 gate member, 14 REPLAY cases reading each member's own edit apart on its witnesses, with REPLAY CONTROL, SHAPE, HEADER and ANCHOR", () => {
  it("SHAPE: the rows, their pins, each pin's unmet item, witnesses and held pages, the members and the probes stay frozen", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["R3:10", "R4:4"]);
    expect(PINS.map(pin => `${pin.id}:${pin.unmet}:${pin.witnesses.join(",")}:${pin.held.join(",")}`)).toEqual([
      "G15-SPANS-block-html-only:U1:GW15-OPQ-INLINE-LIST,GW15-OPQ-INLINE-QUOTE:",
      "G15-CHILDREN-first-item-only:U1:GW15-OPQ-SECOND-ITEM,GW15-OPQ-SECOND-ITEM-TIGHT:",
      "G15-SPANS-last-child-only:U1:GW15-OPQ-QUOTE-THEN-MORE,GW15-OPQ-LIST-THEN-MORE:",
      "G15-OPAQUE-first-line:U1:GW15-OPQ-UNIT-FIRST-OUTSIDE:GW15-OPQ-TWIN-BLOCK-LIST,GW15-OPQ-TWIN-QUOTE",
      "G15-FD-indent-two:U2:GW15-FD-INDENT-3:",
      "G15-FD-indent-spaces-only:U2:GW15-FD-INDENT-TAB:",
      "G15-FD-quote-once:U2:GW15-FD-NESTED-QUOTE:",
      "G15-FD-label-word-only:U2:GW15-FD-LABEL-DOT,GW15-FD-LABEL-SPACE:GW15-FD-TWIN-INDENT-2,GW15-FD-TWIN-COL0,GW15-FD-TWIN-QUOTE,GW15-FD-TWIN-LABEL-WORD",
      "G15-STALE-skip-first:U3:GW15-BIND-STALE-FIRST:GW15-BIND-TWIN-STALE-SECOND",
      "G15-UNBOUND-prefix:U3:GW15-BIND-UNBOUND-LONGER-ENTRY:GW15-BIND-TWIN-UNBOUND-EMPTY",
      "G10-ST-link-text-raw:U1:W10-LINK-STRUCK,W10-LINK-STRUCK-QUOTE,W10-LINK-EM-STRUCK,W10-LINK-COMMENT,W10-LINK-HIDDEN-ELEMENT:W10-LINK-TWIN-STRUCK-OUTSIDE,W10-LINK-TWIN-PLAIN",
      "G10-ST-opaque-inline-only:U2:W10-EL-BLOCK-UPPER-LIST,W10-EL-BLOCK-ONELETTER-QUOTE,W10-EL-BLOCK-CLOSE-QUOTE:W10-EL-TWIN-INLINE-UPPER,W10-EL-TWIN-INLINE-CLOSE,W10-EL-BLOCK-LOWER-QUOTE,W10-EL-BLOCK-UPPER-QUOTE,W10-EL-TOP-UPPER-CONTROL",
      "G10-CV-def-filter-first:U3:W10-FD-FIRST-QUOTE:W10-FD-TWIN-SECOND-QUOTE,W10-FD-TWIN-SECOND-INDENTED,W10-FD-FIRST-INDENTED",
      "G10-SU-forEachChild:U4:W10-CM-LINE-EMPTY-BODY,W10-CM-TRAILING-COMMA:W10-CM-TWIN-STATEMENT-TRAILING,W10-CM-TWIN-STATEMENT-LEADING,W10-CM-BLOCK-BEFORE-PAREN",
    ]);
    expect(
      ROWS.flatMap(row => row.pins),
      "the rows hold every pin once, in pin order",
    ).toEqual(PINS.map(pin => pin.id));
    expect(
      MEMBERS.map(member => member.id),
      "every pin has its member's edit, in pin order",
    ).toEqual(PINS.map(pin => pin.id));
    expect(
      PROBES.map(probe => probe.id),
      "the probes are the pins' witnesses and held pages, each once, in first-use order",
    ).toEqual([...new Set(PINS.flatMap(pin => [...pin.witnesses, ...pin.held]))]);
  });

  it("HEADER: this file's PIN ROSTER block is the rows' and pins' roster, byte for byte", () => {
    const lines = readFileSync(SELF, "utf8").split("\n");
    const start = lines.indexOf(" * PIN ROSTER");
    const end = lines.indexOf(" *", start);
    expect(start > 0 && end > start, "the header holds a PIN ROSTER block closed by a blank comment line").toBe(true);
    expect(lines.slice(start + 1, end)).toEqual(rosterLines());
  });

  it("ANCHOR: row R3's items, counts, members, quotes (each whole), witnesses and held pages are wb-021.11's description's and refusal #3's UNMET list's, and row R4's are R-B293's fold's and refusal #4's UNMET list's", () => {
    const child = exportRow("wb-021.11");
    const parent = exportRow("wb-021.9");
    const r3 = ROWS.find(row => row.id === "R3");
    const r4 = ROWS.find(row => row.id === "R4");
    expect(r3 !== undefined && r4 !== undefined, "the census holds rows R3 and R4").toBe(true);
    if (r3 === undefined || r4 === undefined) return;

    const counted = [...sectionOf(child.description, DESCRIPTION_OPEN, DESCRIPTION_CLOSE).matchAll(/\b(U\d+) [^;]*?\((\d+) members?, (\d+) witness(?:es)?\b/g)].map(match => `${match[1] ?? ""}:${match[2] ?? ""}:${match[3] ?? ""}`);
    expect(counted, "wb-021.11's description counts exactly row R3's items' members and witnesses, in order").toEqual(countLines(r3));
    const items3 = listItems(sectionOf(parent.notes, UNMET_3, "\n\n"));
    const record3 = listReading(items3, r3);
    const own3 = rowReading(r3);
    expect(record3.items, "refusal #3's UNMET list carries exactly row R3's items, counts and members, in order").toEqual(own3.items);
    expect(record3.pins, "refusal #3's UNMET list quotes each row R3 member whole, as its pin does, and names its witnesses and held pages").toEqual(own3.pins);
    expect(record3.pages, "the GW15 pages each refusal #3 item names are exactly its pins' probes").toEqual(own3.pages);

    const fold = sectionOf(child.notes, FOLD_OPEN, FOLD_CLOSE)
      .split("\n")
      .filter(line => line !== "");
    expect(
      fold.map(slug => `${slug.split("-")[0] ?? ""}:${memberCount(slug)}:${witnessCount(slug)}`),
      "R-B293's fold carries exactly row R4's items with their member and witness counts, in order",
    ).toEqual(countLines(r4));
    const items4 = listItems(sectionOf(parent.notes, UNMET_4, "\n\n"));
    expect(
      items4.map(item => item.slug),
      "refusal #4's UNMET list leads its items with the fold's slugs",
    ).toEqual(fold);
    const record4 = listReading(items4, r4);
    const own4 = rowReading(r4);
    expect(record4.items, "refusal #4's UNMET list carries exactly row R4's items, counts and members, in order").toEqual(own4.items);
    expect(record4.pins, "refusal #4's UNMET list quotes each row R4 member whole, as its pin does, and names its witnesses and held pages").toEqual(own4.pins);
    expect(record4.pages, "the W10 pages each refusal #4 item names are exactly its pins' probes").toEqual(own4.pages);
  });

  it("REPLAY CONTROL: the helper's own source, compiled and run the replay's way, reads every probe exactly as written", () => {
    const judge = compiled(helperSource());
    for (const probe of PROBES) expect(readingWith(judge, probe), `${probe.id}: the replayed helper reads the probe as written`).toEqual(probe.reading);
  });

  for (const pin of PINS) {
    it(`${pin.id} (${rowIdOf(pin)} ${pin.unmet}; the member: ${pin.quote}): witnesses ${pin.witnesses.join(", ")} and held ${pin.held.length === 0 ? "none" : pin.held.join(", ")} read as written`, () => {
      for (const id of [...pin.witnesses, ...pin.held]) {
        const probe = probeOf(id);
        expect(readingWith(DELIVERED, probe), `${pin.id} / ${probe.id}: the judge reads the probe exactly as written here`).toEqual(probe.reading);
      }
    });
  }

  for (const pin of PINS) {
    it(`${pin.id} REPLAY (${rowIdOf(pin)} ${pin.unmet}): the member's edit applies once to the helper's source and reads each witness (${pin.witnesses.join(", ")}) apart from as written`, () => {
      const member = memberOf(pin);
      const source = helperSource();
      expect(occurrences(source, member.find), `${pin.id}: its gate's find text occurs exactly once in the helper's source`).toBe(1);
      const judge = compiled(applied(source, member));
      for (const id of pin.witnesses) {
        const probe = probeOf(id);
        expect(readingWith(judge, probe), `${pin.id} / ${probe.id}: under the member the witness reads apart from as written`).not.toEqual(probe.reading);
      }
    });
  }
});

import { trackerExportText } from "../qa/workbench/tracker-export.mjs";
