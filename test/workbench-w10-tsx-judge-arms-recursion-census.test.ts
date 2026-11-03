/**
 * wb-37o9 recursion census (the rule-19 structural-exit child of wb-5mco: ruling R-B290 deferred the recursive-flow cycle
 * figures here at wb-5mco's refusal #3, and ruling R-B297 folded refusal #4's members into its notes and parked the parent behind
 * it). SUBJECT: the two recursion checks of readJudgeArms() in test/helpers/w10-tsx-judge-arms.ts - enter()'s, which refuses a
 * call of a function already on the flow's chain, and held()'s, which refuses a holder whose callee already is - read through the
 * arm pattern sources and unread entries readJudgeArms() gives on the 32 probes below. The helper is wb-5mco's FINAL cut #4
 * reader (machine/flywheel/wb-5mco tip f0f84dbb), moved byte for byte below a header of its own. The parent's census at that tip
 * (test/workbench-w10-tsx-judge-arms-census.test.ts) is not on trunk and is neither added nor edited here; the parent stays parked
 * until this lands, and its later re-cut can import the helper.
 *
 * PINNED READER SET (this file, test/workbench-w10-tsx-judge-arms-recursion-census.test.ts; observed at the cut: every case passes
 * on the moved reader, and each of the 28 members the roster lists with probes, applied to a copy of the helper as the one-line
 * edit written beside it in the roster, reds the pin case named after it). A probe is one page: the W10 guard's source
 * (test/workbench-w10-stamped-claim-guard.test.ts, read from disk) with the probe's code written before judgeTsxRow's last
 * statement and its declaration, when it has one, before judgeTsxRow, the way wb-5mco's census's armProbe() writes a declaration
 * and a judge-body statement. A probe's reading is the part of readJudgeArms()'s output on its page this census compares, whole,
 * with toEqual (each arm's pieces and pattern flags are NOT CLAIMED by this census): the arm pattern sources, which are the
 * unplanted guard's live arms as the same reader reads them at run time followed by the probe's added arms written here, and
 * every unread entry in full as written here - its reason, ' (line <n>): ' and its statement text,
 * n counted from judgeTsxRow's first line for a declaration line and from its last statement's line for a code line (so an edit
 * of the guard above judgeTsxRow moves no entry). Each probe carries a source mark, the cutting seats' note of where it came from
 * (r3: refusal #3's gate witnesses, gate-prep-2, g10-gate-s179, archived tools/witnesses.json; r4: refusal #4's, gate-prep-4,
 * g10-gate-s181, archived tools/witnesses2.json; seat: a cutting seat's plant). SHAPE holds the marks to its literal and ANCHOR
 * R3 reads the controls' marks to find its r3 control; nothing else reads them, and a probe's provenance (that its text is its
 * mark's witness, verbatim, or why a seat wrote a plant) is NOT CLAIMED by this census.
 * - Case REAL: the unplanted guard reads judgeTsxRow's 26 live arms and no unread entry (the count and the empty list only).
 * - 28 pin cases, one per member the roster lists with probes, each asserting that every probe it lists reads exactly as written
 *   here. Row R3 holds refusal #3's two members and row R4 refusal #4's six, each pin holding its gate's own paired witnesses as
 *   the records name them; row R4G holds the eleven members refusal #4's gate held equivalent (its F3) or excluded as not
 *   biome-clean (its F4), and row R4S the ten E members of wb-5mco's cut #4 narrowing audit, each pin holding every probe of this
 *   census its member changes. A pin's edit is the condition its member writes into its site's check (the line
 *   `if (chain.includes(bound.callable)) {` in enter(), `if (chain.includes(callee.callable)) {` in held()), verbatim from its
 *   archived edit: refusal #3's two members from that gate's survivor helpers (gate-prep-2, g10-gate-s179, leg2/survivor-helpers,
 *   one changed line each), every other member from refusal #4's find-and-replace table (gate-prep-4, g10-gate-s181,
 *   tools/members.json, which carries the cut #4 seat's E members too; its E-GP2 rows equal refusal #3's two edits). A quote is
 *   a parenthesis its row's record (wb-37o9's 'Unmet items' for R3, R-B297's fold for R4, refusal #4's F3 and F4 for R4G, the
 *   narrowing audit for R4S) writes after a member id in QUOTE FORM: a space (U+0020), the member id, then either one space and
 *   '(' or ' and ' (one space each side), another member id of its row, one space and '(' - the quote being the text between
 *   that '(' and the ')' that balances it. A pin carries a quote exactly when its row's record writes one in QUOTE FORM after its
 *   member, and carries that text: R-B297's fold writes none (each member id there is dash-joined into its ledger slug, outside
 *   QUOTE FORM), and R4G's are F3's, that gate's reasons for holding a member equivalent within the parent census's claims, so a
 *   NOT CLAIMED inside one is the parent's, not this census's. The record forms NOT CLAIMED names below leave a member's quote
 *   unclaimed. The roster, which case HEADER holds to the pins byte for byte:
 * PIN ROSTER
 *   R3 (wb-5mco's refusal #3 members, which wb-37o9's description carries): 2 pins
 *     GP2-RECUR-LAST (U1; enter: chain[chain.length - 1] === bound.callable; quote: enter(): only a recursion into the chain's last function is refused): GW2-MR-LIST, GW2-MR-THREE, GW2-MR-ITEM, GW2-MR-MIX
 *     GP2-RECUR-HELD-LAST (U2; held: chain[chain.length - 1] === callee.callable; quote: the same change in held()): GW2-MR-HELD
 *   R4 (wb-5mco's refusal #4 members, which R-B297 folded into wb-37o9's notes): 6 pins
 *     GP4-ENTER-NOARGS (U1; enter: chain.includes(bound.callable) && call.arguments.length === 0): W-ARGS-CALL
 *     GP4-ENTER-NOPARAMS (U1; enter: chain.includes(bound.callable) && bound.callable.parameters.length === 0): W-ARGS-CALL, W-PARAM-NOARG-CALL
 *     GP4-HELD-NOARGS (U1; held: chain.includes(callee.callable) && ts.isCallExpression(value) && value.arguments.length === 0): W-ARGS-HELD
 *     GP4-HELD-NOPARAMS (U1; held: chain.includes(callee.callable) && callee.callable.parameters.length === 0): W-ARGS-HELD, W-PARAM-NOARG-HELD
 *     GP4-HELD-PLAINCALL (U2; held: chain.includes(callee.callable) && ts.isCallExpression(value) && value.questionDotToken === undefined): A-OPT-HOLDCALL
 *     GP4-ENTER-SPREADONLY (U3; enter: chain.includes(bound.callable) && ts.isSpreadElement(call.parent)): A-PAREN-CALL
 *   R4G (the green members wb-5mco's refusal #4 gate held equivalent (its F3) or excluded as not biome-clean (its F4)): 11 pins
 *     GP4-ENTER-PATH1 (F3; enter: chain.includes(bound.callable) && path.length === 1): GW2-MR-LIST, GW2-MR-THREE, GW2-MR-ITEM, GW2-MR-MIX, X-DEEPER-CALL
 *     GP4-HELD-PATH1 (F3; held: chain.includes(callee.callable) && path.length === 1): GW2-MR-HELD, X-DEEPER-HELD
 *     GP4-ENTER-CHAIN2 (F3; enter: chain.includes(bound.callable) && chain.length === 2): GW2-MR-LIST, GW2-MR-THREE, GW2-MR-ITEM, GW2-MR-MIX, X-DEEPER-CALL
 *     GP4-HELD-CHAIN2 (F3; held: chain.includes(callee.callable) && chain.length === 2): GW2-MR-HELD, X-DEEPER-HELD
 *     GP4-ENTER-NOTYPEARGS (F3; enter: chain.includes(bound.callable) && call.typeArguments === undefined; quote: type arguments need a generic function, which is TS2558 otherwise and NOT CLAIMED): X-TYPEARGS
 *     GP4-ENTER-MODULE (F3; enter: chain.includes(bound.callable) && ts.isSourceFile(bound.callable.parent); quote: the item names a module-level declaration): X-NESTED, X-UNTYPED-ARROW, X-CONST-ARROW
 *     GP4-ENTER-ANNOTATED (F3; enter: chain.includes(bound.callable) && bound.callable.type !== undefined; quote: an unannotated function is NOT CLAIMED): X-UNTYPED-ARROW
 *     GP4-HELD-ANNOTATED (F3; held: chain.includes(callee.callable) && callee.callable.type !== undefined; quote: an unannotated function is NOT CLAIMED): X-UNTYPED-HELD
 *     GP4-ENTER-NOTEXPORTED (F3; enter: chain.includes(bound.callable) && bound.callable.modifiers === undefined; quote: an exported function is NOT CLAIMED): X-EXPORTED
 *     GP4-ENTER-PLAINCALL (F4; enter: chain.includes(bound.callable) && call.questionDotToken === undefined): A-OPT-CALL
 *     GP4-HELD-PLAINREAD (F4; held: chain.includes(callee.callable) && access.questionDotToken === undefined): A-OPT-READ
 *   R4S (the E members of wb-5mco's cut #4 narrowing audit): 10 pins
 *     E-GP2-RECUR-LAST (E; enter: chain[chain.length - 1] === bound.callable; quote: refusal #3's members, byte-equal to the gate's archived survivor helpers): GW2-MR-LIST, GW2-MR-THREE, GW2-MR-ITEM, GW2-MR-MIX, X-INTO-JUDGE
 *     E-GP2-RECUR-HELD-LAST (E; held: chain[chain.length - 1] === callee.callable; quote: refusal #3's members, byte-equal to the gate's archived survivor helpers): GW2-MR-HELD
 *     E-ENTER-DEPTH2 (E; enter: chain.slice(0, 2).includes(bound.callable); quote: only the first two chain entries checked): X-DEEPER-CALL
 *     E-HELD-DEPTH2 (E; held: chain.slice(0, 2).includes(callee.callable); quote: only the first two chain entries checked): X-DEEPER-HELD
 *     E-ENTER-SKIPJUDGE (E; enter: chain.slice(1).includes(bound.callable); quote: judgeTsxRow never checked): X-INTO-JUDGE
 *     E-HELD-SKIPJUDGE (E; held: chain.slice(1).includes(callee.callable); quote: judgeTsxRow never checked): NOT CLAIMED - judgeTsxRow is declared to return string[], so a holder of its call reads no list property in tsc-clean guard code (again.findings on it is TS2339)
 *     E-ENTER-LISTONLY (E; enter: chain.includes(bound.callable) && next === list; quote: refused only in a list position): GW2-MR-ITEM
 *     E-ENTER-DECLONLY (E; enter: chain.includes(bound.callable) && ts.isFunctionDeclaration(bound.callable); quote: only a function declaration's recursion refused): X-UNTYPED-ARROW, X-CONST-ARROW
 *     E-HELD-DECLONLY (E; held: chain.includes(callee.callable) && ts.isFunctionDeclaration(callee.callable); quote: only a function declaration's recursion refused): X-UNTYPED-HELD, X-CONST-HELD
 *     E-HELD-FINDINGSONLY (E; held: chain.includes(callee.callable) && property === "findings"; quote: a holder recursion refused only through findings): X-HELD-OTHER
 *   CONTROLS (held as written; no pin holds them): GW2-SELF-CTL, C-SELF-CALL, C-SELF-HELD, W-SPREAD-SECOND, W-SPREAD-ALONE, W-PUSH-TWO, W-HELD-MORE, W-BODY-CONST
 *
 * - Case CONTROLS: the eight controls read exactly as written.
 * - Case SHAPE (the frozen shape, standing rule 16): the rows as `${id}:${pins.length}`, every pin with its record item, site, edit
 *   and probe ids (NOT CLAIMED for the one pin with none), the controls, and the probes in first-use order then the controls, with
 *   each probe's source mark and entry count, each held to a literal; a pin holds probes exactly when it states no NOT CLAIMED
 *   reason, and each pin's edit rewrites its own site's check.
 * - Case HEADER: the PIN ROSTER block above, read from this file, equals the lines the rows, pins and controls compose.
 * - Cases ANCHOR R3, ANCHOR R4, ANCHOR R4G, ANCHOR R4S and ANCHOR CONTROLS (the outside anchors, read at run time from the
 *   tracked tracker export .beads/issues.jsonl and never retyped as the expectation). Each finds every section it reads by the
 *   first occurrence of its opening (after an earlier marker of the same record where it has one) and compares exactly the values
 *   written below that it takes from those sections (each quote as recordQuote() reads it after the member, which for a member
 *   this census claims is its QUOTE FORM quote), an absent quote equal only to an absent one; so an export edit that changes one
 *   of those values reds the case comparing it, and a note appended to either row's notes changes none of them. wb-5mco's
 *   description and every other part of the export are NOT CLAIMED by this census. (R3) The GP2 ids the 'Unmet items' paragraph
 *   of wb-37o9's description names are exactly row R3's members, in order, each pin's quote the one there in QUOTE FORM after its
 *   member; in refusal #3's verdict in wb-5mco's notes each member's item is the first upper-case word the verdict writes as
 *   '<word> <member> ' (U1, U2), and the GW2 ids after the first 'the <member> reading differs on exactly', up to the next ', and
 *   the ' or '; ', are exactly its pin's probes. (R4) R-B297's fold in wb-37o9's notes holds one ledger slug per line, each
 *   slug's first word an item (U1 to U3), its GP4-ENTER- and GP4-HELD- ids exactly row R4's members of that item and its W and A
 *   ids between -WITNESS- or -WITNESSES- and -TSC- exactly the union of their probes, in order; the fold writes none of them a
 *   quote in QUOTE FORM; and the '- <member>: <witnesses>' lines of refusal #4's pinned twin in wb-5mco's notes are exactly row
 *   R4's members, in order, each with its pin's probes. (R4G) The GP4 ids refusal #4's F3 and F4 name are exactly row R4G's
 *   members, in order, under their items (F3, F4), each pin's quote the one there in QUOTE FORM after its member where the record
 *   writes one, and the A ids F4 names are its two members' probes, in order. (R4S) The E ids the narrowing audit of wb-5mco's
 *   cut #4 delivery names are exactly row R4S's members, in order, each item the word its opening gives them and each quote the
 *   one there in QUOTE FORM after its member, and the TWIN after that audit writes '<member> on none of the 17' for the NOT
 *   CLAIMED pin's member. (CONTROLS) The GW2 ids of refusal #3's control sentence, the C ids of the TWIN's claimed forms and the
 *   W ids of refusal #4's within-words sentence are exactly the controls, in order.
 *
 * CLAIMS AND THEIR FALSIFIERS. (1) On each probe, the arm pattern sources and unread entries readJudgeArms() gives are exactly
 * the reading written here: a reader edit that changes one probe's added arm pattern sources or unread entries reds the pin case
 * or CONTROLS holding it, and an edit that changes the number of the unplanted guard's live arms or gives it an unread entry reds
 * REAL. (2) Each of the 28 members the roster lists with probes changes the reading of every probe of its own pin: the cutting
 * seat applied each one's edit, verbatim, to a copy of the helper (its find line occurring exactly once there) and read the pin
 * case named after it red; some R3 and R4 members change other probes too (the delivery note lists them), while each R4G and R4S
 * pin holds every probe its member changes. (3) The rows, pins, items, sites, edits and probe ids are held to SHAPE's literals
 * (the frozen shape), and the roster above, edits and quotes included, is the pins' (HEADER): a pin removed, swapped or
 * relabelled in one literal, an edit changed in one or two of PINS, the SHAPE literal and the roster, or a row deleted, reds
 * SHAPE or HEADER (standing rule 16's CT1-CT4). (4) The members, items, quotes (QUOTE FORM), R3's and R4's probes and the
 * controls are the ones the tracker export records (ANCHOR): a pin or a control removed or relabelled, or a pin's item or quote
 * changed, in every literal together, or a row removed with its frozen-shape elements, reds ANCHOR (CT5, CT6).
 *
 * NOT CLAIMED. A reading on any page that is not one of these 32 probes is NOT CLAIMED by this census - among them a cycle of four
 * or more functions, a recursion that closes through a const reference or a traced list, and every parameter list, argument list,
 * wrapper, optional form, position, declaration form and modifier no probe writes. The live arms' own patterns are NOT CLAIMED by
 * this census beyond their count; nor is the rest of readJudgeArms()'s reading (the READ, REFUSED and RESIDUAL items of the
 * parent's census). Whether a probe is valid guard code is NOT CLAIMED by this census (measured at the cut and not claimed: the 32
 * probes' declarations and code, written together into scratch copies of the guard, give tsc --noEmit -p tsconfig.test.json no
 * error row, and biome flags only A-OPT-CALL and A-OPT-READ, with lint/correctness/noUnsafeOptionalChaining, and X-EXPORTED, with
 * lint/suspicious/noExportsInTest). E-HELD-SKIPJUDGE is NOT CLAIMED by this census: no probe reads differently under it, for the
 * reason the roster gives. A probe removed from, added to or swapped within an R4G or R4S pin in every literal together is NOT
 * CLAIMED by this census: the records ANCHOR reads for those rows name their members, never this census's seat plants. An edit
 * changed in PINS, the SHAPE literal and the roster together is NOT CLAIMED by this census: no case reads an edit against a record
 * or applies one to the reader (claim (2) is the cut's measurement). Which other edits a member is equivalent to is NOT CLAIMED,
 * and neither is a reader edit made together with the reading literal it changes. The helper's provenance (every line below its
 * header byte for byte the parent tip's line 12 onward, as its header states) is checkable against that blob and is NOT CLAIMED by
 * this census, which reads no parent commit. A member's quote is NOT CLAIMED by this census when its row's record writes, after
 * its id, a '(' parted from it by nothing or by white space other than one U+0020 space (no space, two or more spaces, a tab, a
 * line break or another space character: refusal #3's U2 forms); one space and '(', or ' and ', an id and ' (', where the id
 * follows anything but a U+0020 space (a dash, as each member id R-B297's fold dash-joins into its ledger slug does: refusal #3's
 * U1 forms); ' and ', an id not of its row and ' ('; a QUOTE FORM '(' the record never balances; or two or more QUOTE FORM
 * parentheses: recordQuote() reads such a record as its code below does, and the census claims nothing of that reading. A probe's
 * source mark beyond SHAPE's literal and ANCHOR R3's reading of the controls' marks, and a probe's provenance, are NOT CLAIMED by
 * this census: no case reads the gates' archives, so a mark changed in PROBES and the SHAPE literal together, or a probe's text
 * changed together with the reading written for it, is NOT CLAIMED (refusal #3's U3 forms). No residual is claimed.
 *
 * Display paths added: none (test-only). No scratch is allocated; the guard, the tracker export and this file are only read; no
 * src, docs or receipt is edited.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { SELF as GUARD, readJudgeArms } from "./helpers/w10-tsx-judge-arms.js";

const CENSUS = fileURLToPath(import.meta.url);
const REPO = join(dirname(CENSUS), "..");
const EXPORT = ".beads/issues.jsonl";

/** wb-37o9's description: its 'Unmet items: ' paragraph (refusal #3's members, R-B290's deferral). */
const R3_UNMET_OPEN = "\n\nUnmet items: ";
const R3_UNMET_CLOSE = "\n\nAcceptance: ";
/** wb-5mco's notes: the openings of refusal #3's and refusal #4's gate verdicts (append-only, first occurrence). */
const REFUSAL_3 = "GATE VERDICT wb-5mco: REFUSED (STRUCTURAL EXIT engaged: R-B278 pre-bound)";
const REFUSAL_4 = "GATE VERDICT wb-5mco: REFUSED (FINAL fail-closed-core cut #4";
/** Refusal #3's BIND reading names each member's witnesses after this, and its control before SAME_UNDER_BOTH. */
const differsOn = (id: string): string => `the ${id} reading differs on exactly `;
const SAME_UNDER_BOTH = " and the live guard read the same under both";
/** wb-37o9's notes: R-B297's fold of refusal #4's members (one ledger slug per unmet item). */
const FOLD_OPEN = "RULE19 DEPENDENCY INVERSION R-B297 (ruling M:46125, refusal O:1726): members folded into wb-37o9\n";
const FOLD_CLOSE = "\nrule19-invert idem rule19-inversion-M46125-wb-5mco-wb-37o9";
/** Refusal #4's RED: the pinned twin's member-to-witness list, one '- <member>: <witness>[ and <witness>]' line each. */
const TWIN_OPEN = "reds each member on exactly its own witnesses:\n";
const TWIN_CLOSE = "\nOn each of those witnesses";
/** Refusal #4's findings F3 (members held equivalent, and the within-words witnesses) and F4 (members excluded). */
const F3_OPEN = "\n- F3 INFO: ";
const F4_OPEN = "\n- F4 INFO: ";
const F5_OPEN = "\n- F5 INFO: ";
const WITHIN_OPEN = "The within-words witnesses ";
const WITHIN_CLOSE = " diverge under no green member";
/** wb-5mco's cut #4 delivery: its narrowing audit's E members and its TWIN's claimed forms and unwitnessed member. */
const AUDIT_OPEN = "10 E members 7 passed (7) each - ";
const AUDIT_CLOSE = "; 6 K members";
const CLAIMED_OPEN = "the two claimed forms, ";
const CLAIMED_CLOSE = ", read identically to the delivered reader";
const unwitnessed = (id: string): string => `${id} on none of the 17`;

interface Reading {
  readonly arms: readonly string[];
  readonly unread: readonly string[];
}
/** One unread entry of a probe's reading: its reason, the line of the refused node counted from the start of the probe part it
 * sits in (1 = that part's first line), and the text of its enclosing statement as readJudgeArms() prints it. */
interface Entry {
  readonly reason: string;
  readonly part: "declaration" | "code";
  readonly line: number;
  readonly statement: string;
}
/** One probe: a page written into the guard (its declaration before judgeTsxRow, its code before judgeTsxRow's last statement)
 * and the reading readJudgeArms() gives it: the arm pattern sources after the guard's live arms, then every unread entry. */
interface Probe {
  readonly id: string;
  /** The source mark (r3, r4 or seat): the cutting seats' note of where the probe came from, NOT CLAIMED beyond SHAPE's literal
   * and ANCHOR R3's reading of the controls' marks. */
  readonly from: "r3" | "r4" | "seat";
  readonly label: string;
  readonly declaration: string;
  readonly code: string;
  readonly added: readonly string[];
  readonly unread: readonly Entry[];
}
/** One member of a recursion check: the condition its one-line edit gives that check (the site's
 * `if (chain.includes(bound.callable)) {` in enter() or `if (chain.includes(callee.callable)) {` in held()), the record item naming it,
 * its record quote where its row's record writes one in QUOTE FORM, and the probes its pin case holds, each of which it changes - or, for a member
 * no probe reads differently, why it is NOT CLAIMED. */
interface Pin {
  readonly id: string;
  readonly site: "enter" | "held";
  readonly item: string;
  readonly edit: string;
  readonly quote?: string;
  readonly probes: readonly string[];
  readonly notClaimed?: string;
}
interface Row {
  readonly id: "R3" | "R4" | "R4G" | "R4S";
  readonly label: string;
  readonly pins: readonly string[];
}

const PROBES: readonly Probe[] = [
  {
    id: "GW2-MR-LIST",
    from: "r3",
    label: "two helpers recursing into each other in list position (a cycle of two calls)",
    declaration: "function probe_GW2_MRL_a(): string[] {\n  return [...probe_GW2_MRL_b(), \"probe GW2-MRL a\"];\n}\nfunction probe_GW2_MRL_b(): string[] {\n  return [...probe_GW2_MRL_a(), \"probe GW2-MRL b\"];\n}",
    code: "findings.push(...probe_GW2_MRL_a());",
    added: ["^probe GW2-MRL b$", "^probe GW2-MRL a$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GW2_MRL_a", part: "declaration", line: 5, statement: "return [...probe_GW2_MRL_a(), \"probe GW2-MRL b\"];" }],
  },
  {
    id: "GW2-MR-THREE",
    from: "r3",
    label: "three helpers recursing in a cycle in list position (a cycle of three calls)",
    declaration: "function probe_GW2_MR3_a(): string[] {\n  return [...probe_GW2_MR3_b()];\n}\nfunction probe_GW2_MR3_b(): string[] {\n  return [...probe_GW2_MR3_c()];\n}\nfunction probe_GW2_MR3_c(): string[] {\n  return [...probe_GW2_MR3_a(), \"probe GW2-MR3 c\"];\n}",
    code: "findings.push(...probe_GW2_MR3_a());",
    added: ["^probe GW2-MR3 c$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GW2_MR3_a", part: "declaration", line: 8, statement: "return [...probe_GW2_MR3_a(), \"probe GW2-MR3 c\"];" }],
  },
  {
    id: "GW2-MR-ITEM",
    from: "r3",
    label: "two helpers recursing into each other in diagnosis position (a cycle of two calls)",
    declaration: "function probe_GW2_MRI_a(): string {\n  return probe_GW2_MRI_b();\n}\nfunction probe_GW2_MRI_b(): string {\n  return probe_GW2_MRI_a();\n}",
    code: "findings.push(probe_GW2_MRI_a());",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GW2_MRI_a", part: "declaration", line: 5, statement: "return probe_GW2_MRI_a();" }],
  },
  {
    id: "GW2-MR-MIX",
    from: "r3",
    label: "a helper and a holder callee recursing into each other (a cycle of one call and one holder call)",
    declaration: "function probe_GW2_MRX_a(): string[] {\n  const held = probe_GW2_MRX_b();\n  return [...held.findings];\n}\nfunction probe_GW2_MRX_b(): { findings: string[] } {\n  return { findings: [...probe_GW2_MRX_a()] };\n}",
    code: "findings.push(...probe_GW2_MRX_a());",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GW2_MRX_a", part: "declaration", line: 6, statement: "return { findings: [...probe_GW2_MRX_a()] };" }],
  },
  {
    id: "GW2-MR-HELD",
    from: "r3",
    label: "two holder callees recursing into each other through their holders (a cycle of two holder calls)",
    declaration: "function probe_GW2_MRH_a(): { findings: string[] } {\n  const again = probe_GW2_MRH_b();\n  return { findings: [...again.findings] };\n}\nfunction probe_GW2_MRH_b(): { findings: string[] } {\n  const again = probe_GW2_MRH_a();\n  return { findings: [...again.findings] };\n}",
    code: "const probe_GW2_MRH_read = probe_GW2_MRH_a();\n  findings.push(...probe_GW2_MRH_read.findings);",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GW2_MRH_a", part: "declaration", line: 7, statement: "return { findings: [...again.findings] };" }],
  },
  {
    id: "W-ARGS-CALL",
    from: "r4",
    label: "WITHIN (form 1; a call of the function and of its own name with an argument, the declaration with a parameter)",
    declaration: "function probe_GQ_AC(depth: number): string[] {\n  return [...probe_GQ_AC(depth + 1), \"probe GQ AC\"];\n}",
    code: "findings.push(...probe_GQ_AC(0));",
    added: ["^probe GQ AC$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_AC", part: "declaration", line: 2, statement: "return [...probe_GQ_AC(depth + 1), \"probe GQ AC\"];" }],
  },
  {
    id: "W-PARAM-NOARG-CALL",
    from: "r4",
    label: "WITHIN (form 1; the declaration with a defaulted parameter, every call of it passing no argument)",
    declaration: `function probe_GQ_PN(depth = 0): string[] {\n  return [...probe_GQ_PN(), \`probe GQ PN \${depth}\`];\n}`,
    code: "findings.push(...probe_GQ_PN());",
    added: ["^probe GQ PN [\\s\\S]*?$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_PN", part: "declaration", line: 2, statement: `return [...probe_GQ_PN(), \`probe GQ PN \${depth}\`];` }],
  },
  {
    id: "W-ARGS-HELD",
    from: "r4",
    label: "WITHIN (form 2; the holder calls with an argument, the declaration with a parameter)",
    declaration: "function probe_GQ_AH(depth: number): { findings: string[] } {\n  const again = probe_GQ_AH(depth + 1);\n  return { findings: [...again.findings] };\n}",
    code: "const probe_GQ_AH_read = probe_GQ_AH(0);\n  findings.push(...probe_GQ_AH_read.findings);",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_AH", part: "declaration", line: 3, statement: "return { findings: [...again.findings] };" }],
  },
  {
    id: "W-PARAM-NOARG-HELD",
    from: "r4",
    label: "WITHIN (form 2; the declaration with a defaulted parameter, every call of it passing no argument)",
    declaration: `function probe_GQ_HN(depth = 0): { findings: string[] } {\n  const again = probe_GQ_HN();\n  return { findings: [...again.findings, \`probe GQ HN \${depth}\`] };\n}`,
    code: "const probe_GQ_HN_read = probe_GQ_HN();\n  findings.push(...probe_GQ_HN_read.findings);",
    added: ["^probe GQ HN [\\s\\S]*?$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_HN", part: "declaration", line: 3, statement: `return { findings: [...again.findings, \`probe GQ HN \${depth}\`] };` }],
  },
  {
    id: "A-OPT-HOLDCALL",
    from: "r4",
    label: "CONVENTION (form 2 with the inner holder's call optional)",
    declaration: "function probe_GQ_OH(): { findings: string[] } {\n  const again = probe_GQ_OH?.();\n  return { findings: [...again.findings] };\n}",
    code: "const probe_GQ_OH_read = probe_GQ_OH();\n  findings.push(...probe_GQ_OH_read.findings);",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_OH", part: "declaration", line: 3, statement: "return { findings: [...again.findings] };" }],
  },
  {
    id: "A-PAREN-CALL",
    from: "r4",
    label: "CONVENTION (form 1 with the recursive call parenthesized inside the spread)",
    declaration: "function probe_GQ_PC(): string[] {\n  return [...(probe_GQ_PC()), \"probe GQ PC\"];\n}",
    code: "findings.push(...probe_GQ_PC());",
    added: ["^probe GQ PC$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_PC", part: "declaration", line: 2, statement: "return [...(probe_GQ_PC()), \"probe GQ PC\"];" }],
  },
  {
    id: "X-DEEPER-CALL",
    from: "seat",
    label: "a function recursing into itself in AU15's form, called by a second function that judgeTsxRow calls (one function deeper)",
    declaration: "function probe_GX_DB(): string[] {\n  return [...probe_GX_DB(), \"probe GX DB\"];\n}\nfunction probe_GX_DA(): string[] {\n  return [...probe_GX_DB(), \"probe GX DA\"];\n}",
    code: "findings.push(...probe_GX_DA());",
    added: ["^probe GX DB$", "^probe GX DA$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GX_DB", part: "declaration", line: 2, statement: "return [...probe_GX_DB(), \"probe GX DB\"];" }],
  },
  {
    id: "X-DEEPER-HELD",
    from: "seat",
    label: "a holder callee recursing into itself in AU63's form, held by a second holder callee that judgeTsxRow holds (one function deeper)",
    declaration: "function probe_GX_HB(): { findings: string[] } {\n  const again = probe_GX_HB();\n  return { findings: [...again.findings] };\n}\nfunction probe_GX_HA(): { findings: string[] } {\n  const inner = probe_GX_HB();\n  return { findings: [...inner.findings] };\n}",
    code: "const probe_GX_HA_read = probe_GX_HA();\n  findings.push(...probe_GX_HA_read.findings);",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GX_HB", part: "declaration", line: 3, statement: "return { findings: [...again.findings] };" }],
  },
  {
    id: "X-TYPEARGS",
    from: "seat",
    label: "a generic function recursing into itself through a call with a type argument (probe_GX_TA<T>()), called from judgeTsxRow with one (probe_GX_TA<string>())",
    declaration: "function probe_GX_TA<T>(): string[] {\n  return [...probe_GX_TA<T>(), \"probe GX TA\"];\n}",
    code: "findings.push(...probe_GX_TA<string>());",
    added: ["^probe GX TA$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GX_TA", part: "declaration", line: 2, statement: "return [...probe_GX_TA<T>(), \"probe GX TA\"];" }],
  },
  {
    id: "X-NESTED",
    from: "seat",
    label: "AU15's form declared inside judgeTsxRow's own body: a nested function declaration recursing into itself",
    declaration: "",
    code: "function probe_GX_NF(): string[] {\n    return [...probe_GX_NF(), \"probe GX NF\"];\n  }\n  findings.push(...probe_GX_NF());",
    added: ["^probe GX NF$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GX_NF", part: "code", line: 2, statement: "return [...probe_GX_NF(), \"probe GX NF\"];" }],
  },
  {
    id: "X-UNTYPED-ARROW",
    from: "seat",
    label: "a const typed () => string[] bound to an arrow with no return type annotation of its own, spreading a call of its own name",
    declaration: "const probe_GX_UA: () => string[] = () => [...probe_GX_UA(), \"probe GX UA\"];",
    code: "findings.push(...probe_GX_UA());",
    added: ["^probe GX UA$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GX_UA", part: "declaration", line: 1, statement: "const probe_GX_UA: () => string[] = () => [...probe_GX_UA(), \"probe GX UA\"];" }],
  },
  {
    id: "X-CONST-ARROW",
    from: "seat",
    label: "AU15's form as a const bound to an arrow annotated string[]",
    declaration: "const probe_GX_CA = (): string[] => [...probe_GX_CA(), \"probe GX CA\"];",
    code: "findings.push(...probe_GX_CA());",
    added: ["^probe GX CA$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GX_CA", part: "declaration", line: 1, statement: "const probe_GX_CA = (): string[] => [...probe_GX_CA(), \"probe GX CA\"];" }],
  },
  {
    id: "X-UNTYPED-HELD",
    from: "seat",
    label: "a const typed () => { findings: string[] } bound to a block-bodied arrow with no return type annotation of its own, binding a holder of its own to a call of its own name",
    declaration: "const probe_GX_UH: () => { findings: string[] } = () => {\n  const again = probe_GX_UH();\n  return { findings: [...again.findings] };\n};",
    code: "const probe_GX_UH_read = probe_GX_UH();\n  findings.push(...probe_GX_UH_read.findings);",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GX_UH", part: "declaration", line: 3, statement: "return { findings: [...again.findings] };" }],
  },
  {
    id: "X-EXPORTED",
    from: "seat",
    label: "AU15's form exported (export function); not biome-clean as guard code (lint/suspicious/noExportsInTest)",
    declaration: "export function probe_GX_EX(): string[] {\n  return [...probe_GX_EX(), \"probe GX EX\"];\n}",
    code: "findings.push(...probe_GX_EX());",
    added: ["^probe GX EX$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GX_EX", part: "declaration", line: 2, statement: "return [...probe_GX_EX(), \"probe GX EX\"];" }],
  },
  {
    id: "A-OPT-CALL",
    from: "r4",
    label: "CONVENTION (form 1 with the recursive call optional, f?.())",
    declaration: "function probe_GQ_OC(): string[] {\n  return [...probe_GQ_OC?.(), \"probe GQ OC\"];\n}",
    code: "findings.push(...probe_GQ_OC());",
    added: ["^probe GQ OC$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_OC", part: "declaration", line: 2, statement: "return [...probe_GQ_OC?.(), \"probe GQ OC\"];" }],
  },
  {
    id: "A-OPT-READ",
    from: "r4",
    label: "CONVENTION (form 2 with the holder's findings read optionally, again?.findings)",
    declaration: "function probe_GQ_OR(): { findings: string[] } {\n  const again = probe_GQ_OR();\n  return { findings: [...again?.findings] };\n}",
    code: "const probe_GQ_OR_read = probe_GQ_OR();\n  findings.push(...probe_GQ_OR_read.findings);",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_OR", part: "declaration", line: 3, statement: "return { findings: [...again?.findings] };" }],
  },
  {
    id: "X-INTO-JUDGE",
    from: "seat",
    label: "a function judgeTsxRow calls with its own two parameters, returning an array literal spreading a call of judgeTsxRow",
    declaration: "function probe_GX_IJ(page: string, readReceipt: ReadReceipt): string[] {\n  return [...judgeTsxRow(page, readReceipt), \"probe GX IJ\"];\n}",
    code: "findings.push(...probe_GX_IJ(page, readReceipt));",
    added: ["^probe GX IJ$"],
    unread: [{ reason: "a recursive diagnosis flow through judgeTsxRow", part: "declaration", line: 2, statement: "return [...judgeTsxRow(page, readReceipt), \"probe GX IJ\"];" }],
  },
  {
    id: "X-CONST-HELD",
    from: "seat",
    label: "AU63's form as a const bound to a block-bodied arrow annotated { findings: string[] }",
    declaration: "const probe_GX_CH = (): { findings: string[] } => {\n  const again = probe_GX_CH();\n  return { findings: [...again.findings] };\n};",
    code: "const probe_GX_CH_read = probe_GX_CH();\n  findings.push(...probe_GX_CH_read.findings);",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GX_CH", part: "declaration", line: 3, statement: "return { findings: [...again.findings] };" }],
  },
  {
    id: "X-HELD-OTHER",
    from: "seat",
    label: "AU63's form with the holder's list property named notes instead of findings",
    declaration: "function probe_GX_HO(): { notes: string[] } {\n  const again = probe_GX_HO();\n  return { notes: [...again.notes] };\n}",
    code: "const probe_GX_HO_read = probe_GX_HO();\n  findings.push(...probe_GX_HO_read.notes);",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GX_HO", part: "declaration", line: 3, statement: "return { notes: [...again.notes] };" }],
  },
  {
    id: "GW2-SELF-CTL",
    from: "r3",
    label: "control: a helper recursing into itself (AU15's form, a cycle of one call)",
    declaration: "function probe_GW2_SC(): string[] {\n  return [...probe_GW2_SC(), \"probe GW2-SC\"];\n}",
    code: "findings.push(...probe_GW2_SC());",
    added: ["^probe GW2-SC$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GW2_SC", part: "declaration", line: 2, statement: "return [...probe_GW2_SC(), \"probe GW2-SC\"];" }],
  },
  {
    id: "C-SELF-CALL",
    from: "r4",
    label: "CLAIMED (AU15's form)",
    declaration: "function probe_GQ_SC(): string[] {\n  return [...probe_GQ_SC(), \"probe GQ SC\"];\n}",
    code: "findings.push(...probe_GQ_SC());",
    added: ["^probe GQ SC$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_SC", part: "declaration", line: 2, statement: "return [...probe_GQ_SC(), \"probe GQ SC\"];" }],
  },
  {
    id: "C-SELF-HELD",
    from: "r4",
    label: "CLAIMED (AU63's form)",
    declaration: "function probe_GQ_SH(): { findings: string[] } {\n  const again = probe_GQ_SH();\n  return { findings: [...again.findings] };\n}",
    code: "const probe_GQ_SH_read = probe_GQ_SH();\n  findings.push(...probe_GQ_SH_read.findings);",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_SH", part: "declaration", line: 3, statement: "return { findings: [...again.findings] };" }],
  },
  {
    id: "W-SPREAD-SECOND",
    from: "r4",
    label: "WITHIN (form 1; the return's array literal spreading the self call as its second element)",
    declaration: "function probe_GQ_S2(): string[] {\n  return [\"probe GQ S2\", ...probe_GQ_S2()];\n}",
    code: "findings.push(...probe_GQ_S2());",
    added: ["^probe GQ S2$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_S2", part: "declaration", line: 2, statement: "return [\"probe GQ S2\", ...probe_GQ_S2()];" }],
  },
  {
    id: "W-SPREAD-ALONE",
    from: "r4",
    label: "WITHIN (form 1; the return's array literal is the self call's spread alone)",
    declaration: "function probe_GQ_SA(): string[] {\n  return [...probe_GQ_SA()];\n}",
    code: "findings.push(...probe_GQ_SA());",
    added: [],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_SA", part: "declaration", line: 2, statement: "return [...probe_GQ_SA()];" }],
  },
  {
    id: "W-PUSH-TWO",
    from: "r4",
    label: "WITHIN (form 1; the push spreads the call as its second argument)",
    declaration: "function probe_GQ_P2(): string[] {\n  return [...probe_GQ_P2(), \"probe GQ P2\"];\n}",
    code: "findings.push(\"probe GQ P2 first\", ...probe_GQ_P2());",
    added: ["^probe GQ P2 first$", "^probe GQ P2$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_P2", part: "declaration", line: 2, statement: "return [...probe_GQ_P2(), \"probe GQ P2\"];" }],
  },
  {
    id: "W-HELD-MORE",
    from: "r4",
    label: "WITHIN (form 2; findings' array literal holds a literal before the holder's spread)",
    declaration: "function probe_GQ_HM(): { findings: string[] } {\n  const again = probe_GQ_HM();\n  return { findings: [\"probe GQ HM\", ...again.findings] };\n}",
    code: "const probe_GQ_HM_read = probe_GQ_HM();\n  findings.push(...probe_GQ_HM_read.findings);",
    added: ["^probe GQ HM$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_HM", part: "declaration", line: 3, statement: "return { findings: [\"probe GQ HM\", ...again.findings] };" }],
  },
  {
    id: "W-BODY-CONST",
    from: "r4",
    label: "WITHIN (form 1; the body declares a const before the return)",
    declaration: "function probe_GQ_BC(): string[] {\n  const tag = \"probe GQ BC\";\n  return [...probe_GQ_BC(), tag];\n}",
    code: "findings.push(...probe_GQ_BC());",
    added: ["^probe GQ BC$"],
    unread: [{ reason: "a recursive diagnosis flow through probe_GQ_BC", part: "declaration", line: 3, statement: "return [...probe_GQ_BC(), tag];" }],
  },
];

const PINS: readonly Pin[] = [
  { id: "GP2-RECUR-LAST", site: "enter", item: "U1", edit: "chain[chain.length - 1] === bound.callable", quote: "enter(): only a recursion into the chain's last function is refused", probes: ["GW2-MR-LIST", "GW2-MR-THREE", "GW2-MR-ITEM", "GW2-MR-MIX"] },
  { id: "GP2-RECUR-HELD-LAST", site: "held", item: "U2", edit: "chain[chain.length - 1] === callee.callable", quote: "the same change in held()", probes: ["GW2-MR-HELD"] },
  { id: "GP4-ENTER-NOARGS", site: "enter", item: "U1", edit: "chain.includes(bound.callable) && call.arguments.length === 0", probes: ["W-ARGS-CALL"] },
  { id: "GP4-ENTER-NOPARAMS", site: "enter", item: "U1", edit: "chain.includes(bound.callable) && bound.callable.parameters.length === 0", probes: ["W-ARGS-CALL", "W-PARAM-NOARG-CALL"] },
  { id: "GP4-HELD-NOARGS", site: "held", item: "U1", edit: "chain.includes(callee.callable) && ts.isCallExpression(value) && value.arguments.length === 0", probes: ["W-ARGS-HELD"] },
  { id: "GP4-HELD-NOPARAMS", site: "held", item: "U1", edit: "chain.includes(callee.callable) && callee.callable.parameters.length === 0", probes: ["W-ARGS-HELD", "W-PARAM-NOARG-HELD"] },
  { id: "GP4-HELD-PLAINCALL", site: "held", item: "U2", edit: "chain.includes(callee.callable) && ts.isCallExpression(value) && value.questionDotToken === undefined", probes: ["A-OPT-HOLDCALL"] },
  { id: "GP4-ENTER-SPREADONLY", site: "enter", item: "U3", edit: "chain.includes(bound.callable) && ts.isSpreadElement(call.parent)", probes: ["A-PAREN-CALL"] },
  { id: "GP4-ENTER-PATH1", site: "enter", item: "F3", edit: "chain.includes(bound.callable) && path.length === 1", probes: ["GW2-MR-LIST", "GW2-MR-THREE", "GW2-MR-ITEM", "GW2-MR-MIX", "X-DEEPER-CALL"] },
  { id: "GP4-HELD-PATH1", site: "held", item: "F3", edit: "chain.includes(callee.callable) && path.length === 1", probes: ["GW2-MR-HELD", "X-DEEPER-HELD"] },
  { id: "GP4-ENTER-CHAIN2", site: "enter", item: "F3", edit: "chain.includes(bound.callable) && chain.length === 2", probes: ["GW2-MR-LIST", "GW2-MR-THREE", "GW2-MR-ITEM", "GW2-MR-MIX", "X-DEEPER-CALL"] },
  { id: "GP4-HELD-CHAIN2", site: "held", item: "F3", edit: "chain.includes(callee.callable) && chain.length === 2", probes: ["GW2-MR-HELD", "X-DEEPER-HELD"] },
  { id: "GP4-ENTER-NOTYPEARGS", site: "enter", item: "F3", edit: "chain.includes(bound.callable) && call.typeArguments === undefined", quote: "type arguments need a generic function, which is TS2558 otherwise and NOT CLAIMED", probes: ["X-TYPEARGS"] },
  { id: "GP4-ENTER-MODULE", site: "enter", item: "F3", edit: "chain.includes(bound.callable) && ts.isSourceFile(bound.callable.parent)", quote: "the item names a module-level declaration", probes: ["X-NESTED", "X-UNTYPED-ARROW", "X-CONST-ARROW"] },
  { id: "GP4-ENTER-ANNOTATED", site: "enter", item: "F3", edit: "chain.includes(bound.callable) && bound.callable.type !== undefined", quote: "an unannotated function is NOT CLAIMED", probes: ["X-UNTYPED-ARROW"] },
  { id: "GP4-HELD-ANNOTATED", site: "held", item: "F3", edit: "chain.includes(callee.callable) && callee.callable.type !== undefined", quote: "an unannotated function is NOT CLAIMED", probes: ["X-UNTYPED-HELD"] },
  { id: "GP4-ENTER-NOTEXPORTED", site: "enter", item: "F3", edit: "chain.includes(bound.callable) && bound.callable.modifiers === undefined", quote: "an exported function is NOT CLAIMED", probes: ["X-EXPORTED"] },
  { id: "GP4-ENTER-PLAINCALL", site: "enter", item: "F4", edit: "chain.includes(bound.callable) && call.questionDotToken === undefined", probes: ["A-OPT-CALL"] },
  { id: "GP4-HELD-PLAINREAD", site: "held", item: "F4", edit: "chain.includes(callee.callable) && access.questionDotToken === undefined", probes: ["A-OPT-READ"] },
  {
    id: "E-GP2-RECUR-LAST",
    site: "enter",
    item: "E",
    edit: "chain[chain.length - 1] === bound.callable",
    quote: "refusal #3's members, byte-equal to the gate's archived survivor helpers",
    probes: ["GW2-MR-LIST", "GW2-MR-THREE", "GW2-MR-ITEM", "GW2-MR-MIX", "X-INTO-JUDGE"],
  },
  { id: "E-GP2-RECUR-HELD-LAST", site: "held", item: "E", edit: "chain[chain.length - 1] === callee.callable", quote: "refusal #3's members, byte-equal to the gate's archived survivor helpers", probes: ["GW2-MR-HELD"] },
  { id: "E-ENTER-DEPTH2", site: "enter", item: "E", edit: "chain.slice(0, 2).includes(bound.callable)", quote: "only the first two chain entries checked", probes: ["X-DEEPER-CALL"] },
  { id: "E-HELD-DEPTH2", site: "held", item: "E", edit: "chain.slice(0, 2).includes(callee.callable)", quote: "only the first two chain entries checked", probes: ["X-DEEPER-HELD"] },
  { id: "E-ENTER-SKIPJUDGE", site: "enter", item: "E", edit: "chain.slice(1).includes(bound.callable)", quote: "judgeTsxRow never checked", probes: ["X-INTO-JUDGE"] },
  {
    id: "E-HELD-SKIPJUDGE",
    site: "held",
    item: "E",
    edit: "chain.slice(1).includes(callee.callable)",
    quote: "judgeTsxRow never checked",
    probes: [],
    notClaimed: "judgeTsxRow is declared to return string[], so a holder of its call reads no list property in tsc-clean guard code (again.findings on it is TS2339)",
  },
  { id: "E-ENTER-LISTONLY", site: "enter", item: "E", edit: "chain.includes(bound.callable) && next === list", quote: "refused only in a list position", probes: ["GW2-MR-ITEM"] },
  { id: "E-ENTER-DECLONLY", site: "enter", item: "E", edit: "chain.includes(bound.callable) && ts.isFunctionDeclaration(bound.callable)", quote: "only a function declaration's recursion refused", probes: ["X-UNTYPED-ARROW", "X-CONST-ARROW"] },
  { id: "E-HELD-DECLONLY", site: "held", item: "E", edit: "chain.includes(callee.callable) && ts.isFunctionDeclaration(callee.callable)", quote: "only a function declaration's recursion refused", probes: ["X-UNTYPED-HELD", "X-CONST-HELD"] },
  { id: "E-HELD-FINDINGSONLY", site: "held", item: "E", edit: 'chain.includes(callee.callable) && property === "findings"', quote: "a holder recursion refused only through findings", probes: ["X-HELD-OTHER"] },
];

const ROWS: readonly Row[] = [
  { id: "R3", label: "wb-5mco's refusal #3 members, which wb-37o9's description carries", pins: ["GP2-RECUR-LAST", "GP2-RECUR-HELD-LAST"] },
  {
    id: "R4",
    label: "wb-5mco's refusal #4 members, which R-B297 folded into wb-37o9's notes",
    pins: ["GP4-ENTER-NOARGS", "GP4-ENTER-NOPARAMS", "GP4-HELD-NOARGS", "GP4-HELD-NOPARAMS", "GP4-HELD-PLAINCALL", "GP4-ENTER-SPREADONLY"],
  },
  {
    id: "R4G",
    label: "the green members wb-5mco's refusal #4 gate held equivalent (its F3) or excluded as not biome-clean (its F4)",
    pins: [
      "GP4-ENTER-PATH1",
      "GP4-HELD-PATH1",
      "GP4-ENTER-CHAIN2",
      "GP4-HELD-CHAIN2",
      "GP4-ENTER-NOTYPEARGS",
      "GP4-ENTER-MODULE",
      "GP4-ENTER-ANNOTATED",
      "GP4-HELD-ANNOTATED",
      "GP4-ENTER-NOTEXPORTED",
      "GP4-ENTER-PLAINCALL",
      "GP4-HELD-PLAINREAD",
    ],
  },
  {
    id: "R4S",
    label: "the E members of wb-5mco's cut #4 narrowing audit",
    pins: [
      "E-GP2-RECUR-LAST",
      "E-GP2-RECUR-HELD-LAST",
      "E-ENTER-DEPTH2",
      "E-HELD-DEPTH2",
      "E-ENTER-SKIPJUDGE",
      "E-HELD-SKIPJUDGE",
      "E-ENTER-LISTONLY",
      "E-ENTER-DECLONLY",
      "E-HELD-DECLONLY",
      "E-HELD-FINDINGSONLY",
    ],
  },
];

/** The probes no pin holds: refusal #3's control, the two claimed forms of wb-5mco's cut #4 and refusal #4's within-words
 * witnesses, as ANCHOR CONTROLS reads them from those records. */
const CONTROLS: readonly string[] = ["GW2-SELF-CTL", "C-SELF-CALL", "C-SELF-HELD", "W-SPREAD-SECOND", "W-SPREAD-ALONE", "W-PUSH-TWO", "W-HELD-MORE", "W-BODY-CONST"];

function pinOf(id: string): Pin {
  const pin = PINS.find((candidate) => candidate.id === id);
  if (pin === undefined) throw new Error(`${id}: no such pin`);
  return pin;
}
function probeOf(id: string): Probe {
  const probe = PROBES.find((candidate) => candidate.id === id);
  if (probe === undefined) throw new Error(`${id}: no such probe`);
  return probe;
}
function rowOf(pin: Pin): Row {
  const row = ROWS.find((candidate) => candidate.pins.includes(pin.id));
  if (row === undefined) throw new Error(`${pin.id}: in no row`);
  return row;
}
function rowPins(id: Row["id"]): Pin[] {
  return (ROWS.find((row) => row.id === id)?.pins ?? []).map(pinOf);
}

/** The guard's source, read once, and its live reading (REAL's), read once. */
let guardText: string | undefined;
function guard(): string {
  guardText ??= readFileSync(join(REPO, GUARD), "utf8");
  return guardText;
}
let liveReading: Reading | undefined;
function live(): Reading {
  liveReading ??= readingOf(guard());
  return liveReading;
}
/** judgeTsxRow in the guard, parsed: its first line and its last statement's line (1-based), and the two insertion offsets. */
function host(source: string): { readonly first: number; readonly last: number; readonly start: number; readonly lastStart: number } {
  const file = ts.createSourceFile(GUARD, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const judge = file.statements.find((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement) && statement.name?.text === "judgeTsxRow");
  const last = judge?.body?.statements.at(-1);
  if (judge === undefined || last === undefined) throw new Error("the guard holds no top-level judgeTsxRow with a body");
  const lineOf = (position: number): number => file.getLineAndCharacterOfPosition(position).line + 1;
  return { first: lineOf(judge.getStart(file)), last: lineOf(last.getStart(file)), start: judge.getStart(file), lastStart: last.getStart(file) };
}
/** A probe's page: the guard with its code written before judgeTsxRow's last statement, then its declaration (when it has one)
 * before judgeTsxRow - the way wb-5mco's census's armProbe() writes a declaration and a judge-body statement. */
function planted(probe: Probe): string {
  const source = guard();
  const { start, lastStart } = host(source);
  const coded = `${source.slice(0, lastStart)}${probe.code}\n  ${source.slice(lastStart)}`;
  return probe.declaration === "" ? coded : `${coded.slice(0, start)}${probe.declaration}\n${coded.slice(start)}`;
}
const readingOf = (source: string): Reading => {
  const { arms, unread } = readJudgeArms(source);
  return { arms: arms.map((arm) => arm.pattern.source), unread };
};
/** The probe's reading as written here: the live arms, then its added arms; each entry with its line counted in the page. */
function writtenReading(probe: Probe): Reading {
  const { first, last } = host(guard());
  const declarationLines = probe.declaration === "" ? 0 : probe.declaration.split("\n").length;
  return {
    arms: [...live().arms, ...probe.added],
    unread: probe.unread.map((entry) => `${entry.reason} (line ${(entry.part === "declaration" ? first : last + declarationLines) + entry.line - 1}): ${entry.statement}`),
  };
}

/** The tracked tracker export's row of `bead`: its description and notes. */
const exportRows = new Map<string, { readonly description: string; readonly notes: string }>();
function exportRow(bead: string): { readonly description: string; readonly notes: string } {
  const known = exportRows.get(bead);
  if (known !== undefined) return known;
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const value: unknown = JSON.parse(line);
    if (typeof value !== "object" || value === null || !("id" in value) || value.id !== bead) continue;
    const description = "description" in value && typeof value.description === "string" ? value.description : "";
    const notes = "notes" in value && typeof value.notes === "string" ? value.notes : "";
    const row = { description, notes };
    exportRows.set(bead, row);
    return row;
  }
  throw new Error(`${bead}: no row in ${EXPORT}`);
}
/** The text from the first occurrence of open up to the first occurrence of close after it (to the end when close is absent;
 * empty when open is absent). */
function sectionOf(text: string, open: string, close: string): string {
  const start = text.indexOf(open);
  if (start < 0) return "";
  const end = close === "" ? -1 : text.indexOf(close, start + open.length);
  return end < 0 ? text.slice(start) : text.slice(start, end);
}
/** The ids of one kind a text names, in first-mention order (an id: the prefix, then dash-joined upper-case words). */
const idsOf = (text: string, prefix: string): string[] => [...new Set(text.match(new RegExp(`\\b${prefix}-[A-Z0-9]+(?:-[A-Z0-9]+)*`, "g")) ?? [])];
/** The quote ANCHOR R3, R4, R4G and R4S read after a member id in a record's text: at the first match of the opening below (the
 * id, not after an upper-case letter, a digit or a dash, then ' (', or ' and ', an id of upper-case letters and digits in two or
 * more dash-joined words and ' ('), the text between that '(' and the ')' that balances it; undefined when text holds no match
 * or never balances it. It reads every QUOTE FORM quote; the header claims no more of it than that. */
function recordQuote(text: string, id: string): string | undefined {
  const opening = new RegExp(`(?<![A-Z0-9-])${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?: and [A-Z0-9]+(?:-[A-Z0-9]+)+)? \\(`).exec(text);
  if (opening === null) return undefined;
  const start = opening.index + opening[0].length;
  let depth = 1;
  for (let at = start; at < text.length; at += 1) {
    if (text[at] === "(") depth += 1;
    else if (text[at] === ")") {
      depth -= 1;
      if (depth === 0) return text.slice(start, at);
    }
  }
  return undefined;
}
/** The record item a verdict names a member under: the first upper-case word text puts before the member ('<word> <member> '). */
const itemOf = (text: string, id: string): string | undefined => new RegExp(`(?<!\\S)([A-Z][A-Z0-9]*) ${id} `).exec(text)?.[1];
/** The member ids a ledger slug names: each GP4, its site word (ENTER or HELD) and one more word, dash-joined into the slug. */
const slugMembers = (slug: string): string[] => slug.match(/\bGP4-(?:ENTER|HELD)-[A-Z0-9]+/g) ?? [];
/** The witness ids a ledger slug lists after -WITNESS- or -WITNESSES- (each a W or A, then its words), up to -TSC-. */
function slugWitnesses(slug: string): string[] {
  const listed = /-WITNESS(?:ES)?-(.+?)-TSC-/.exec(slug)?.[1] ?? "";
  const ids: string[] = [];
  for (const word of listed.split("-")) {
    if (word === "W" || word === "A") ids.push(word);
    else if (ids.length > 0) ids.push(`${ids.pop() ?? ""}-${word}`);
  }
  return ids;
}
/** A row's pins grouped by record item, in order: '<item>:<member ids>:<the union of their probes, in first-use order>'. */
function itemLines(pins: readonly Pin[]): string[] {
  const items: { readonly item: string; readonly members: string[]; readonly probes: string[] }[] = [];
  for (const pin of pins) {
    const last = items.at(-1);
    const into = last?.item === pin.item ? last : undefined;
    if (into === undefined) items.push({ item: pin.item, members: [pin.id], probes: [...pin.probes] });
    else {
      into.members.push(pin.id);
      for (const probe of pin.probes) if (!into.probes.includes(probe)) into.probes.push(probe);
    }
  }
  return items.map((item) => `${item.item}:${item.members.join(",")}:${item.probes.join(",")}`);
}
const rosterLines = (): string[] => [
  ...ROWS.flatMap((row) => [
    ` *   ${row.id} (${row.label}): ${row.pins.length} pins`,
    ...row.pins.map((id) => {
      const pin = pinOf(id);
      const quote = pin.quote === undefined ? "" : `; quote: ${pin.quote}`;
      return ` *     ${pin.id} (${pin.item}; ${pin.site}: ${pin.edit}${quote}): ${pin.notClaimed === undefined ? pin.probes.join(", ") : `NOT CLAIMED - ${pin.notClaimed}`}`;
    }),
  ]),
  ` *   CONTROLS (held as written; no pin holds them): ${CONTROLS.join(", ")}`,
];

describe("wb-37o9 recursion census (test/helpers/w10-tsx-judge-arms.ts): REAL, CONTROLS, SHAPE, HEADER and ANCHOR, and 28 pin cases, each pin case holding the readJudgeArms() reading (arm pattern sources and unread entries, compared whole) of the W10-guard pages it names, every one of which its named member of the enter() or held() recursion check changes", () => {
  it("REAL: the unplanted guard reads judgeTsxRow's 26 live arms and no unread entry", { timeout: 60_000 }, () => {
    const reading = live();
    expect(reading.unread, "the guard's own reading holds no unread entry").toEqual([]);
    expect(reading.arms).toHaveLength(26);
  });

  it("SHAPE: the rows, their pins, each pin's record item, site, edit and probe ids, the controls and each probe's id, source mark and entry count are each held to a literal", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual(["R3:2", "R4:6", "R4G:11", "R4S:10"]);
    expect(PINS.map((pin) => `${pin.id}:${pin.item}:${pin.site}:${pin.edit}:${pin.probes.join(",") || "NOT CLAIMED"}`)).toEqual([
      "GP2-RECUR-LAST:U1:enter:chain[chain.length - 1] === bound.callable:GW2-MR-LIST,GW2-MR-THREE,GW2-MR-ITEM,GW2-MR-MIX",
      "GP2-RECUR-HELD-LAST:U2:held:chain[chain.length - 1] === callee.callable:GW2-MR-HELD",
      "GP4-ENTER-NOARGS:U1:enter:chain.includes(bound.callable) && call.arguments.length === 0:W-ARGS-CALL",
      "GP4-ENTER-NOPARAMS:U1:enter:chain.includes(bound.callable) && bound.callable.parameters.length === 0:W-ARGS-CALL,W-PARAM-NOARG-CALL",
      "GP4-HELD-NOARGS:U1:held:chain.includes(callee.callable) && ts.isCallExpression(value) && value.arguments.length === 0:W-ARGS-HELD",
      "GP4-HELD-NOPARAMS:U1:held:chain.includes(callee.callable) && callee.callable.parameters.length === 0:W-ARGS-HELD,W-PARAM-NOARG-HELD",
      "GP4-HELD-PLAINCALL:U2:held:chain.includes(callee.callable) && ts.isCallExpression(value) && value.questionDotToken === undefined:A-OPT-HOLDCALL",
      "GP4-ENTER-SPREADONLY:U3:enter:chain.includes(bound.callable) && ts.isSpreadElement(call.parent):A-PAREN-CALL",
      "GP4-ENTER-PATH1:F3:enter:chain.includes(bound.callable) && path.length === 1:GW2-MR-LIST,GW2-MR-THREE,GW2-MR-ITEM,GW2-MR-MIX,X-DEEPER-CALL",
      "GP4-HELD-PATH1:F3:held:chain.includes(callee.callable) && path.length === 1:GW2-MR-HELD,X-DEEPER-HELD",
      "GP4-ENTER-CHAIN2:F3:enter:chain.includes(bound.callable) && chain.length === 2:GW2-MR-LIST,GW2-MR-THREE,GW2-MR-ITEM,GW2-MR-MIX,X-DEEPER-CALL",
      "GP4-HELD-CHAIN2:F3:held:chain.includes(callee.callable) && chain.length === 2:GW2-MR-HELD,X-DEEPER-HELD",
      "GP4-ENTER-NOTYPEARGS:F3:enter:chain.includes(bound.callable) && call.typeArguments === undefined:X-TYPEARGS",
      "GP4-ENTER-MODULE:F3:enter:chain.includes(bound.callable) && ts.isSourceFile(bound.callable.parent):X-NESTED,X-UNTYPED-ARROW,X-CONST-ARROW",
      "GP4-ENTER-ANNOTATED:F3:enter:chain.includes(bound.callable) && bound.callable.type !== undefined:X-UNTYPED-ARROW",
      "GP4-HELD-ANNOTATED:F3:held:chain.includes(callee.callable) && callee.callable.type !== undefined:X-UNTYPED-HELD",
      "GP4-ENTER-NOTEXPORTED:F3:enter:chain.includes(bound.callable) && bound.callable.modifiers === undefined:X-EXPORTED",
      "GP4-ENTER-PLAINCALL:F4:enter:chain.includes(bound.callable) && call.questionDotToken === undefined:A-OPT-CALL",
      "GP4-HELD-PLAINREAD:F4:held:chain.includes(callee.callable) && access.questionDotToken === undefined:A-OPT-READ",
      "E-GP2-RECUR-LAST:E:enter:chain[chain.length - 1] === bound.callable:GW2-MR-LIST,GW2-MR-THREE,GW2-MR-ITEM,GW2-MR-MIX,X-INTO-JUDGE",
      "E-GP2-RECUR-HELD-LAST:E:held:chain[chain.length - 1] === callee.callable:GW2-MR-HELD",
      "E-ENTER-DEPTH2:E:enter:chain.slice(0, 2).includes(bound.callable):X-DEEPER-CALL",
      "E-HELD-DEPTH2:E:held:chain.slice(0, 2).includes(callee.callable):X-DEEPER-HELD",
      "E-ENTER-SKIPJUDGE:E:enter:chain.slice(1).includes(bound.callable):X-INTO-JUDGE",
      "E-HELD-SKIPJUDGE:E:held:chain.slice(1).includes(callee.callable):NOT CLAIMED",
      "E-ENTER-LISTONLY:E:enter:chain.includes(bound.callable) && next === list:GW2-MR-ITEM",
      "E-ENTER-DECLONLY:E:enter:chain.includes(bound.callable) && ts.isFunctionDeclaration(bound.callable):X-UNTYPED-ARROW,X-CONST-ARROW",
      "E-HELD-DECLONLY:E:held:chain.includes(callee.callable) && ts.isFunctionDeclaration(callee.callable):X-UNTYPED-HELD,X-CONST-HELD",
      'E-HELD-FINDINGSONLY:E:held:chain.includes(callee.callable) && property === "findings":X-HELD-OTHER',
    ]);
    expect(
      ROWS.flatMap((row) => row.pins),
      "the rows hold every pin once, in pin order",
    ).toEqual(PINS.map((pin) => pin.id));
    expect(
      PINS.filter((pin) => (pin.probes.length === 0) !== (pin.notClaimed !== undefined)).map((pin) => pin.id),
      "a pin holds probes exactly when it states no NOT CLAIMED reason",
    ).toEqual([]);
    expect(
      PINS.filter((pin) => !pin.edit.includes(pin.site === "enter" ? "bound.callable" : "callee.callable")).map((pin) => pin.id),
      "each pin's edit rewrites its own site's check",
    ).toEqual([]);
    expect(CONTROLS).toEqual(["GW2-SELF-CTL", "C-SELF-CALL", "C-SELF-HELD", "W-SPREAD-SECOND", "W-SPREAD-ALONE", "W-PUSH-TWO", "W-HELD-MORE", "W-BODY-CONST"]);
    expect(
      PROBES.map((probe) => `${probe.id}:${probe.from}:${probe.unread.length}`),
      "the probes are the pins' probes, each once, in first-use order, then the controls",
    ).toEqual(
      [...new Set(PINS.flatMap((pin) => pin.probes)), ...CONTROLS].map((id) => {
        const probe = probeOf(id);
        return `${id}:${probe.from}:${probe.unread.length}`;
      }),
    );
    expect(PROBES.map((probe) => `${probe.id}:${probe.from}:${probe.unread.length}`)).toEqual([
      "GW2-MR-LIST:r3:1",
      "GW2-MR-THREE:r3:1",
      "GW2-MR-ITEM:r3:1",
      "GW2-MR-MIX:r3:1",
      "GW2-MR-HELD:r3:1",
      "W-ARGS-CALL:r4:1",
      "W-PARAM-NOARG-CALL:r4:1",
      "W-ARGS-HELD:r4:1",
      "W-PARAM-NOARG-HELD:r4:1",
      "A-OPT-HOLDCALL:r4:1",
      "A-PAREN-CALL:r4:1",
      "X-DEEPER-CALL:seat:1",
      "X-DEEPER-HELD:seat:1",
      "X-TYPEARGS:seat:1",
      "X-NESTED:seat:1",
      "X-UNTYPED-ARROW:seat:1",
      "X-CONST-ARROW:seat:1",
      "X-UNTYPED-HELD:seat:1",
      "X-EXPORTED:seat:1",
      "A-OPT-CALL:r4:1",
      "A-OPT-READ:r4:1",
      "X-INTO-JUDGE:seat:1",
      "X-CONST-HELD:seat:1",
      "X-HELD-OTHER:seat:1",
      "GW2-SELF-CTL:r3:1",
      "C-SELF-CALL:r4:1",
      "C-SELF-HELD:r4:1",
      "W-SPREAD-SECOND:r4:1",
      "W-SPREAD-ALONE:r4:1",
      "W-PUSH-TWO:r4:1",
      "W-HELD-MORE:r4:1",
      "W-BODY-CONST:r4:1",
    ]);
  });

  it("HEADER: this file's PIN ROSTER block is the rows', pins' and controls' roster, byte for byte", () => {
    const lines = readFileSync(CENSUS, "utf8").split("\n");
    const start = lines.indexOf(" * PIN ROSTER");
    const end = lines.indexOf(" *", start);
    expect(start > 0 && end > start, "the header holds a PIN ROSTER block closed by a blank comment line").toBe(true);
    expect(lines.slice(start + 1, end)).toEqual(rosterLines());
  });

  it("ANCHOR R3: row R3's members, items, quotes and witnesses are wb-37o9's description's and refusal #3's verdict's", { timeout: 60_000 }, () => {
    const unmet = sectionOf(exportRow("wb-37o9").description, R3_UNMET_OPEN, R3_UNMET_CLOSE);
    const verdict = sectionOf(exportRow("wb-5mco").notes, REFUSAL_3, REFUSAL_4);
    expect(unmet !== "" && verdict !== "", "wb-37o9's description and refusal #3's verdict are in the export").toBe(true);
    const pins = rowPins("R3");
    expect(idsOf(unmet, "GP2"), "the GP2 ids wb-37o9's 'Unmet items' names are exactly row R3's members, in order").toEqual(pins.map((pin) => pin.id));
    for (const pin of pins) {
      expect(recordQuote(unmet, pin.id), `${pin.id}: its quote is the one wb-37o9's 'Unmet items' writes after it in QUOTE FORM`).toBe(pin.quote);
      expect(itemOf(verdict, pin.id), `${pin.id}: its item is the first upper-case word refusal #3's verdict writes as '<word> ${pin.id} '`).toBe(pin.item);
      const from = verdict.indexOf(differsOn(pin.id));
      const named = from < 0 ? "" : verdict.slice(from + differsOn(pin.id).length).split(/, and the |; /)[0] ?? "";
      expect(idsOf(named, "GW2"), `${pin.id}: its probes are the GW2 ids after the first '${differsOn(pin.id)}' in refusal #3's verdict`).toEqual(pin.probes);
    }
    const last = pins.at(-1);
    const after = last === undefined ? "" : verdict.slice(verdict.indexOf(differsOn(last.id)));
    const control = sectionOf(after, "; ", SAME_UNDER_BOTH);
    expect(idsOf(control, "GW2"), "refusal #3's control is this census's r3 control").toEqual(CONTROLS.filter((id) => probeOf(id).from === "r3"));
  });

  it("ANCHOR R4: row R4's items, members, quotes and witnesses are R-B297's fold's (it writes no member a quote in QUOTE FORM), and each member's witnesses refusal #4's pinned twin's", { timeout: 60_000 }, () => {
    const fold = sectionOf(exportRow("wb-37o9").notes, FOLD_OPEN, FOLD_CLOSE);
    const twin = sectionOf(sectionOf(exportRow("wb-5mco").notes, REFUSAL_4, ""), TWIN_OPEN, TWIN_CLOSE);
    expect(fold !== "" && twin !== "", "R-B297's fold and refusal #4's twin list are in the export").toBe(true);
    const pins = rowPins("R4");
    const slugs = fold
      .slice(FOLD_OPEN.length)
      .split("\n")
      .filter((line) => line !== "");
    expect(
      slugs.map((slug) => `${slug.split("-")[0] ?? ""}:${slugMembers(slug).join(",")}:${slugWitnesses(slug).join(",")}`),
      "R-B297's fold's slugs read exactly row R4's items, their members and their witnesses, in order",
    ).toEqual(itemLines(pins));
    for (const pin of pins) {
      expect(recordQuote(fold, pin.id), `${pin.id}: its quote is the one R-B297's fold writes after it in QUOTE FORM, and the fold writes none`).toBe(pin.quote);
    }
    const listed = twin
      .slice(TWIN_OPEN.length)
      .split("\n")
      .filter((line) => line.startsWith("- "))
      .map((line) => {
        const [short = "", witnesses = ""] = line.slice(2).replace(/[;.]$/, "").split(": ");
        return `${short.startsWith("HELD-") ? `GP4-${short}` : `GP4-ENTER-${short}`}:${witnesses.split(" and ").join(",")}`;
      });
    expect(listed, "the '- <member>: <witnesses>' lines of refusal #4's pinned twin are exactly row R4's members, each with its pin's probes").toEqual(pins.map((pin) => `${pin.id}:${pin.probes.join(",")}`));
  });

  it("ANCHOR R4G: row R4G's members, under their items, are exactly the GP4 ids refusal #4's F3 and F4 name, in order, F4's with their witnesses, and each pin's quote the one F3 or F4 writes after its member in QUOTE FORM, where one does", { timeout: 60_000 }, () => {
    const verdict = sectionOf(exportRow("wb-5mco").notes, REFUSAL_4, "");
    const f3 = sectionOf(verdict, F3_OPEN, F4_OPEN);
    const f4 = sectionOf(verdict, F4_OPEN, F5_OPEN);
    expect(f3 !== "" && f4 !== "", "refusal #4's F3 and F4 are in the export").toBe(true);
    const pins = rowPins("R4G");
    expect([...idsOf(f3, "GP4").map((id) => `F3:${id}`), ...idsOf(f4, "GP4").map((id) => `F4:${id}`)]).toEqual(pins.map((pin) => `${pin.item}:${pin.id}`));
    expect(idsOf(f4, "A"), "the A ids F4 names are its members' probes, in order").toEqual(pins.filter((pin) => pin.item === "F4").flatMap((pin) => pin.probes));
    for (const pin of pins) {
      expect(recordQuote(`${f3}${f4}`, pin.id), `${pin.id}: its quote is the one refusal #4's F3 or F4 writes after it in QUOTE FORM, where one does`).toBe(pin.quote);
    }
  });

  it("ANCHOR R4S: row R4S's members, items and quotes are the E members of wb-5mco's cut #4 narrowing audit, the word its opening gives them and its QUOTE FORM quotes after them, and its NOT CLAIMED pin a member the TWIN after the audit writes as '<member> on none of the 17'", { timeout: 60_000 }, () => {
    const notes = exportRow("wb-5mco").notes;
    const audit = sectionOf(notes, AUDIT_OPEN, AUDIT_CLOSE);
    expect(audit !== "", "cut #4's narrowing audit is in the export").toBe(true);
    const pins = rowPins("R4S");
    expect(idsOf(audit, "E"), "the audit's E members are row R4S's pins, in order").toEqual(pins.map((pin) => pin.id));
    const word = /^\d+ ([A-Z][A-Z0-9]*) members /.exec(audit)?.[1];
    for (const pin of pins) {
      expect(pin.item, `${pin.id}: its item is the word the audit's opening gives its members`).toBe(word);
    }
    for (const pin of pins) {
      expect(recordQuote(audit, pin.id), `${pin.id}: its quote is the one the audit writes after it in QUOTE FORM`).toBe(pin.quote);
    }
    const twin = sectionOf(notes.slice(notes.indexOf(AUDIT_OPEN)), "TWIN (", ". So each ");
    expect(
      pins.filter((pin) => pin.notClaimed !== undefined).map((pin) => twin.includes(unwitnessed(pin.id))),
      "each NOT CLAIMED pin's member is one the TWIN after the audit writes as '<member> on none of the 17'",
    ).toEqual(pins.filter((pin) => pin.notClaimed !== undefined).map(() => true));
  });

  it("ANCHOR CONTROLS: the controls are refusal #3's control, cut #4's two claimed forms and refusal #4's within-words witnesses, as the records name them", { timeout: 60_000 }, () => {
    const notes = exportRow("wb-5mco").notes;
    const r3 = sectionOf(notes, REFUSAL_3, REFUSAL_4);
    const lastR3 = rowPins("R3").at(-1);
    const control = lastR3 === undefined ? "" : sectionOf(r3.slice(r3.indexOf(differsOn(lastR3.id))), "; ", SAME_UNDER_BOTH);
    const claimed = sectionOf(notes.slice(notes.indexOf(AUDIT_OPEN)), CLAIMED_OPEN, CLAIMED_CLOSE);
    const within = sectionOf(sectionOf(sectionOf(notes, REFUSAL_4, ""), F3_OPEN, F4_OPEN), WITHIN_OPEN, WITHIN_CLOSE);
    expect([...idsOf(control, "GW2"), ...idsOf(claimed, "C"), ...idsOf(within, "W")]).toEqual(CONTROLS);
  });

  it("CONTROLS: the eight controls read as written", { timeout: 120_000 }, () => {
    for (const id of CONTROLS) {
      const probe = probeOf(id);
      expect(readingOf(planted(probe)), `${probe.id}: readJudgeArms() reads the control exactly as written here`).toEqual(writtenReading(probe));
    }
  });

  for (const pin of PINS.filter((candidate) => candidate.notClaimed === undefined)) {
    it(`${pin.id} (${rowOf(pin).id} ${pin.item}; ${pin.site}: ${pin.edit}): probes ${pin.probes.join(", ")} read as written`, { timeout: 120_000 }, () => {
      for (const id of pin.probes) {
        const probe = probeOf(id);
        expect(readingOf(planted(probe)), `${pin.id} / ${probe.id}: readJudgeArms() reads the probe exactly as written here`).toEqual(writtenReading(probe));
      }
    });
  }
});
